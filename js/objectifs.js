// =============================================================================
// 🎯 objectifs.js — Objectif nutritionnel personnel
// -----------------------------------------------------------------------------
// L'utilisateur fixe un objectif (calories/jour + un focus : léger, protéiné…).
// Chaque fiche montre alors comment la recette s'y situe (part de l'objectif du
// jour, et si elle colle au focus). Réutilise le moteur nutrition existant.
// Stocké en local. Bilingue + thème clair/sombre.
// =============================================================================

(function () {
  const LS = "objectif_nutri";
  const EN = () => window.LANG === "en";
  const T = (fr, en) => (EN() ? en : fr);

  const lire = () => { try { return JSON.parse(localStorage.getItem(LS) || "{}") || {}; } catch (e) { return {}; } };
  const ecrire = (o) => { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} };

  // Profils. protPct = part des calories venant des protéines (repli sans poids).
  // protKg = protéines en g par kg de poids (le standard muscu, prioritaire si poids connu).
  // kcalAdj = ajustement du maintien pour ce but (sèche = déficit, masse = surplus).
  // prot = priorise le protéiné ; cap = repas plus légers ; surplus = autorise plus calorique.
  const FOCUS = {
    equilibre: { fr: "Équilibré", en: "Balanced", e: "⚖️", protPct: 0.20, protKg: 1.8, kcalAdj: 1.00 },
    leger: { fr: "Léger", en: "Light", e: "🪶", protPct: 0.22, protKg: 1.8, kcalAdj: 0.90, cap: true },
    proteine: { fr: "Protéiné", en: "High-protein", e: "💪", protPct: 0.30, protKg: 2.0, kcalAdj: 1.00, prot: true },
    seche: { fr: "Sèche", en: "Cutting", e: "🔥", protPct: 0.40, protKg: 2.2, kcalAdj: 0.80, prot: true, cap: true },
    prisedemasse: { fr: "Prise de masse", en: "Bulking", e: "🏋️", protPct: 0.30, protKg: 2.0, kcalAdj: 1.12, prot: true, surplus: true },
    gourmand: { fr: "Plaisir", en: "Indulgent", e: "😋", protPct: 0.18, protKg: 1.6, kcalAdj: 1.00 },
  };
  window.OBJ_FOCUS = FOCUS;

  // Niveaux d'activité → dépense ≈ kcal par kg de poids et par jour.
  const ACTIVITES = {
    sedentaire: { fr: "Sédentaire", en: "Sedentary", e: "🛋️", kcalKg: 28 },
    actif: { fr: "Actif", en: "Active", e: "🚶", kcalKg: 33 },
    sportif: { fr: "Sportif", en: "Athletic", e: "🏃", kcalKg: 38 },
  };

  // Suggestion de calories/jour : poids × dépense(activité) × ajustement(but).
  function suggererKcal(poids, activiteK, focusK) {
    const a = ACTIVITES[activiteK];
    if (!poids || !a) return null;
    const f = focusK && FOCUS[focusK];
    return Math.round((poids * a.kcalKg * ((f && f.kcalAdj) || 1)) / 10) * 10;
  }

  // Cible protéines/jour (g) : depuis le poids (g/kg) si connu, sinon depuis les kcal.
  window.OBJ_protJour = function (o) {
    if (!o) return null;
    const f = o.focus && FOCUS[o.focus];
    if (o.poids) return Math.round(o.poids * ((f && f.protKg) || 1.8));
    if (o.kcal) return Math.round((o.kcal * ((f && f.protPct) || 0.20)) / 4);
    return null;
  };
  // g de protéines par kg (pour l'affichage « 2.2 g/kg »).
  window.OBJ_protKg = function (o) { const f = o && o.focus && FOCUS[o.focus]; return (f && f.protKg) || 1.8; };

  // Répartition d'une journée : l'objectif kcal se répartit sur les moments (le matin
  // et les collations comptent !). pct = part du budget du jour ; cats = catégories de
  // recettes adaptées à ce moment. Somme des pct = 1. Exposé pour envie.js (suggestions).
  const MOMENTS = [
    { k: "matin", e: "🌅", fr: "Matin", en: "Morning", pct: 0.25, cats: ["brunch", "boulangerie", "tartinables"] },
    { k: "midi", e: "☀️", fr: "Midi", en: "Lunch", pct: 0.35, cats: ["plats", "salades", "pizzas", "healthy", "soupes"] },
    { k: "collation", e: "🍎", fr: "Collation", en: "Snack", pct: 0.10, cats: ["encas", "tartinables", "boulangerie", "desserts"] },
    { k: "soir", e: "🌙", fr: "Soir", en: "Dinner", pct: 0.30, cats: ["plats", "salades", "soupes", "healthy"] },
  ];
  window.OBJ_MOMENTS = MOMENTS;

  // Nutrition par portion (réutilise calculerPrixCaloriesRecette).
  function nutriPortion(key) {
    const r = recettes[key];
    if (!r) return null;
    const tk = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tk) return null;
    const base = r.base || 4;
    const ligne = r[tk].find((l) => l.nb === base || l.patons === base) || r[tk][0];
    if (!ligne || typeof calculerPrixCaloriesRecette !== "function") return null;
    const pc = calculerPrixCaloriesRecette(ligne);
    if (!pc) return null;
    return { cal: pc.cal != null ? Math.round(pc.cal / base) : null, prot: pc.prot != null ? Math.round(pc.prot / base) : null };
  }

  function rerenderFiche() {
    // Re-rendre la fiche ouverte pour rafraîchir le badge objectif.
    try {
      const inp = document.getElementById("fiche-personnes-input");
      const titre = document.querySelector("#modal-resultat .fiche-titre");
      if (inp && typeof onChangePersonnesFiche === "function") {
        // on déduit la clé via le bouton partager présent dans la fiche
        const b = document.querySelector('#modal-resultat [onclick^="partagerRecette("]');
        const m = b && b.getAttribute("onclick").match(/partagerRecette\('([^']+)'/);
        if (m && typeof choisirRecette === "function") { choisirRecette(m[1], parseInt(inp.value) || undefined); }
      }
    } catch (e) {}
  }

  // ---- Badge dans la fiche ----
  window.objectifFicheHTML = function (key) {
    const o = lire();
    const n = nutriPortion(key);
    const wrap = (inner) =>
      '<div class="fiche-section objectif-nutri" style="background:rgba(var(--w),.05);border:1px solid rgba(var(--w),.1);border-radius:14px;padding:13px 16px;margin:0 0 14px">' + inner + "</div>";

    if (!o.kcal && !o.focus) {
      // Pas d'objectif → invitation discrète à en définir un.
      return wrap(
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">' +
        '<span style="color:var(--text-2);font-size:14px">' + T("🎯 Fixe ton objectif nutritionnel", "🎯 Set your nutrition goal") + "</span>" +
        '<button type="button" onclick="ouvrirObjectifs()" style="background:rgba(var(--accent-rgb),.15);color:var(--accent);border:1px solid rgba(var(--accent-rgb),.5);border-radius:10px;padding:7px 13px;font-size:13px;font-weight:700;cursor:pointer">' + T("Définir", "Set") + "</button></div>"
      );
    }

    let parts = '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px">' +
      '<h2 class="fiche-section-titre" style="margin:0">' + T("🎯 Ton objectif", "🎯 Your goal") + "</h2>" +
      '<button type="button" onclick="ouvrirObjectifs()" style="background:none;border:none;color:var(--text-3);font-size:13px;cursor:pointer;text-decoration:underline">' + T("modifier", "edit") + "</button></div>";

    // Part de l'objectif calorique du jour
    if (o.kcal && n && n.cal != null) {
      const pct = Math.round((n.cal / o.kcal) * 100);
      const col = pct <= 35 ? "#4caf50" : pct <= 55 ? "#ffb300" : "#ff6b6b";
      parts += '<div style="margin-top:8px;color:var(--text);font-size:14px">' +
        T("Cette portion = ", "This serving = ") + "<b>" + n.cal + " kcal</b> " +
        T("soit ~", "≈ ") + "<b style=\"color:" + col + "\">" + pct + "%</b> " + T("de ton objectif du jour", "of your daily goal") + " (" + o.kcal + " kcal/j).</div>" +
        '<div style="height:7px;border-radius:99px;background:rgba(var(--w),.12);margin-top:7px;overflow:hidden">' +
        '<div style="height:100%;width:' + Math.min(100, pct) + '%;background:' + col + '"></div></div>';
    }

    // Protéines de la portion (utile pour les profils muscu).
    if (n && n.prot != null) {
      parts += '<div style="margin-top:8px;color:var(--text);font-size:13.5px">💪 ' +
        T("Protéines : ", "Protein: ") + "<b>" + n.prot + " g</b>/" + T("portion", "serving") + "</div>";
    }
    // Adéquation au focus
    if (o.focus && n) {
      const richeProt = n.prot != null && n.prot >= 25;
      const legere = n.cal != null && n.cal <= 500;
      let msg = "";
      if (o.focus === "leger") msg = legere ? T("✅ Colle à ton objectif léger", "✅ Fits your light goal") : T("⚠️ Plutôt copieux pour un objectif léger", "⚠️ A bit rich for a light goal");
      else if (o.focus === "proteine") msg = richeProt ? T("💪 Riche en protéines, parfait", "💪 High in protein, perfect") : T("ℹ️ Peu protéiné pour ton objectif", "ℹ️ Low in protein for your goal");
      else if (o.focus === "seche") msg = (richeProt && (n.cal == null || n.cal <= 550)) ? T("🔥 Protéiné et raisonnable — idéal sèche", "🔥 High-protein and lean — great for cutting") : (richeProt ? T("💪 Bien protéiné, surveille les calories", "💪 Good protein, watch the calories") : T("⚠️ Peu protéiné pour une sèche", "⚠️ Low in protein for cutting"));
      else if (o.focus === "prisedemasse") msg = richeProt ? T("🏋️ Calorique et protéiné — parfait prise de masse", "🏋️ Calorie-dense and high-protein — great for bulking") : T("ℹ️ Ajoute une source de protéines", "ℹ️ Add a protein source");
      else if (o.focus === "gourmand") msg = T("😋 Profite, c'est permis !", "😋 Enjoy, you've earned it!");
      else msg = T("⚖️ À intégrer dans une journée équilibrée", "⚖️ Fits a balanced day");
      if (msg) parts += '<div style="margin-top:6px;color:var(--text-2);font-size:13.5px">' + msg + "</div>";
    }
    return wrap(parts);
  };

  // ---- Modale de réglage ----
  window.ouvrirObjectifs = function () {
    injecterStyleBloc();
    const o = lire();
    let modal = document.getElementById("modal-objectifs");
    if (modal) modal.remove();
    modal = document.createElement("div");
    modal.id = "modal-objectifs";
    modal.style.cssText = "position:fixed;inset:0;z-index:9100;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:18px";
    const kStart = o.kcal || 2000;
    const sansKcal = !!(o.focus && !o.kcal);
    const pStart = o.poids || 75;
    const aStart = o.activite || "actif";
    const poidsOn = !!o.poids;
    const btnF = Object.keys(FOCUS).map((f) => '<button type="button" data-focus="' + f + '" class="obj-f" style="' + chip(o.focus === f) + '">' + FOCUS[f].e + " " + T(FOCUS[f].fr, FOCUS[f].en) + "</button>").join("") +
      '<button type="button" data-focus="" class="obj-f" style="' + chip(!o.focus) + '">' + T("Aucun", "None") + "</button>";
    const btnA = Object.keys(ACTIVITES).map((a) => '<button type="button" data-act="' + a + '" class="obj-act" style="' + chip(aStart === a) + '">' + ACTIVITES[a].e + " " + T(ACTIVITES[a].fr, ACTIVITES[a].en) + "</button>").join("");
    modal.innerHTML =
      '<div style="background:var(--panel-solid,#1a1a2e);color:var(--text);border:1px solid rgba(var(--w),.12);border-radius:18px;max-width:430px;width:100%;padding:20px;font-family:system-ui,sans-serif;max-height:92vh;overflow:auto">' +
      '<div style="display:flex;align-items:center;justify-content:space-between"><h2 style="margin:0;font-size:19px">' + T("🎯 Mon objectif nutritionnel", "🎯 My nutrition goal") + "</h2>" +
      '<button type="button" id="obj-close" style="background:rgba(var(--w),.1);color:var(--text);border:none;border-radius:50%;width:34px;height:34px;font-size:15px;cursor:pointer">✕</button></div>' +
      // 1) But
      '<p style="color:var(--text-2);font-size:14px;margin:14px 0 6px">' + T("Mon but", "My goal") + "</p>" +
      '<div style="display:flex;flex-wrap:wrap;gap:8px">' + btnF + "</div>" +
      // 2) Poids / activité (optionnel) → calcul g/kg + suggestion calories
      '<label style="display:flex;align-items:center;gap:8px;margin:18px 0 0;font-size:13.5px;color:var(--text);cursor:pointer;font-weight:600"><input type="checkbox" id="obj-poids-on"' + (poidsOn ? " checked" : "") + ' style="accent-color:var(--accent);width:17px;height:17px"> 💪 ' + T("Calculer selon mon poids", "Calculate from my weight") + "</label>" +
      '<div id="obj-poids-box" style="margin-top:10px;' + (poidsOn ? "" : "display:none") + '">' +
        '<div style="text-align:center"><span class="obj-kval" id="obj-pval" style="font-size:30px">' + pStart + '</span><span style="font-size:14px;color:var(--text-2)"> kg</span></div>' +
        '<div style="display:flex;align-items:center;gap:10px;margin-top:6px">' +
          '<button type="button" id="obj-p-minus" class="obj-step">−</button>' +
          '<input type="range" id="obj-poids" min="40" max="150" step="1" value="' + pStart + '" style="flex:1;height:6px;accent-color:var(--accent);cursor:pointer">' +
          '<button type="button" id="obj-p-plus" class="obj-step">+</button></div>' +
        '<p style="color:var(--text-2);font-size:13px;margin:12px 0 6px">' + T("Mon activité", "My activity") + "</p>" +
        '<div style="display:flex;flex-wrap:wrap;gap:8px">' + btnA + "</div>" +
        '<div id="obj-suggestion" style="margin-top:12px;background:rgba(var(--accent-rgb),.1);border:1px solid rgba(var(--accent-rgb),.3);border-radius:12px;padding:11px 13px">' +
          '<div id="obj-sugg-text" style="font-size:13px;color:var(--text);line-height:1.5"></div>' +
          '<button type="button" id="obj-sugg-use" class="obj-cta" style="margin-top:9px;display:none">' + T("Utiliser ces calories", "Use these calories") + "</button></div>" +
      "</div>" +
      // 3) Calories par jour
      '<p style="color:var(--text-2);font-size:14px;margin:18px 0 6px">' + T("Calories par jour", "Calories per day") + "</p>" +
      '<div style="text-align:center"><span class="obj-kval" id="obj-kval">' + kStart + '</span><span style="font-size:14px;color:var(--text-2)"> kcal</span></div>' +
      '<div style="display:flex;align-items:center;gap:10px;margin-top:8px">' +
        '<button type="button" id="obj-k-minus" class="obj-step">−</button>' +
        '<input type="range" id="obj-k-range" min="500" max="3500" step="10" value="' + kStart + '">' +
        '<button type="button" id="obj-k-plus" class="obj-step">+</button></div>' +
      '<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-3);margin-top:3px"><span>500</span><span>3500</span></div>' +
      '<label style="display:flex;align-items:center;gap:8px;margin-top:11px;font-size:13px;color:var(--text-2);cursor:pointer"><input type="checkbox" id="obj-k-none"' + (sansKcal ? " checked" : "") + ' style="accent-color:var(--accent);width:17px;height:17px"> ' + T("Pas d'objectif calorique (focus seul)", "No calorie goal (focus only)") + "</label>" +
      '<button type="button" id="obj-save" style="width:100%;margin-top:18px;background:linear-gradient(90deg,var(--accent),#ff9330);color:#1a0e14;border:none;border-radius:12px;padding:12px;font-size:15px;font-weight:800;cursor:pointer">' + T("Enregistrer", "Save") + "</button></div>";
    document.body.appendChild(modal);
    if (typeof window._backGuardPush === "function") window._backGuardPush();

    let selK = kStart, selF = o.focus || "", selP = pStart, selA = aStart, suggKcal = null;
    const valEl = modal.querySelector("#obj-kval");
    const range = modal.querySelector("#obj-k-range");
    const none = modal.querySelector("#obj-k-none");
    const minus = modal.querySelector("#obj-k-minus");
    const plus = modal.querySelector("#obj-k-plus");
    const poidsOnEl = modal.querySelector("#obj-poids-on");
    const poidsBox = modal.querySelector("#obj-poids-box");
    const pRange = modal.querySelector("#obj-poids");
    const pVal = modal.querySelector("#obj-pval");
    const suggText = modal.querySelector("#obj-sugg-text");
    const suggUse = modal.querySelector("#obj-sugg-use");

    const setK = (v) => { selK = Math.max(500, Math.min(3500, Math.round(v))); range.value = selK; valEl.textContent = selK; };
    const majSansKcal = () => { const off = none.checked; range.disabled = off; minus.disabled = off; plus.disabled = off; valEl.style.opacity = off ? ".3" : "1"; };
    // Recalcule la suggestion (calories conseillées + protéines g/kg) selon poids/activité/but.
    const recompute = () => {
      if (!poidsOnEl.checked) return;
      const f = selF && FOCUS[selF];
      const sk = suggererKcal(selP, selA, selF);
      suggKcal = sk;
      const protKg = (f && f.protKg) || 1.8;
      const protG = Math.round(selP * protKg);
      let txt = "💪 " + T("Protéines conseillées : ", "Recommended protein: ") + "<b>~" + protG + " g/" + T("jour", "day") + "</b> (" + protKg + " g/kg)";
      if (sk) txt += "<br>🔥 " + T("Calories conseillées : ", "Recommended calories: ") + "<b>~" + sk + " kcal/" + T("jour", "day") + "</b>" + (selF ? " (" + T(FOCUS[selF].fr, FOCUS[selF].en) + ")" : "");
      else txt += "<br>" + T("Choisis ton but et ton activité pour les calories conseillées.", "Pick your goal and activity for recommended calories.");
      suggText.innerHTML = txt;
      suggUse.style.display = sk ? "block" : "none";
    };
    range.addEventListener("input", () => setK(parseInt(range.value) || 1));
    minus.addEventListener("click", () => setK(selK - 10));
    plus.addEventListener("click", () => setK(selK + 10));
    none.addEventListener("change", majSansKcal);
    majSansKcal();
    // But
    modal.querySelectorAll(".obj-f").forEach((b) => b.addEventListener("click", () => { selF = b.dataset.focus; modal.querySelectorAll(".obj-f").forEach((x) => x.style.cssText = chip(false)); b.style.cssText = chip(true); recompute(); }));
    // Activité
    modal.querySelectorAll(".obj-act").forEach((b) => b.addEventListener("click", () => { selA = b.dataset.act; modal.querySelectorAll(".obj-act").forEach((x) => x.style.cssText = chip(false)); b.style.cssText = chip(true); recompute(); }));
    // Poids
    const setP = (v) => { selP = Math.max(40, Math.min(150, Math.round(v))); pRange.value = selP; pVal.textContent = selP; recompute(); };
    pRange.addEventListener("input", () => setP(parseInt(pRange.value) || 40));
    modal.querySelector("#obj-p-minus").addEventListener("click", () => setP(selP - 1));
    modal.querySelector("#obj-p-plus").addEventListener("click", () => setP(selP + 1));
    poidsOnEl.addEventListener("change", () => { poidsBox.style.display = poidsOnEl.checked ? "" : "none"; recompute(); });
    suggUse.addEventListener("click", () => { if (suggKcal) { none.checked = false; majSansKcal(); setK(suggKcal); } });
    recompute();

    const fermer = () => modal.remove();
    window.fermerObjectifs = fermer;
    modal.querySelector("#obj-close").addEventListener("click", fermer);
    modal.addEventListener("click", (e) => { if (e.target === modal) fermer(); });
    modal.querySelector("#obj-save").addEventListener("click", () => {
      ecrire({ kcal: none.checked ? null : selK, focus: selF || null, poids: poidsOnEl.checked ? selP : null, activite: poidsOnEl.checked ? selA : null });
      fermer();
      if (typeof window._refreshObjectifBloc === "function") window._refreshObjectifBloc();
      if (typeof afficherToast === "function") afficherToast(T("🎯 Objectif enregistré !", "🎯 Goal saved!"));
      if (typeof window.proposerSelonObjectif === "function") window.proposerSelonObjectif();
    });
  };

  function chip(actif) {
    return "border-radius:999px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid " +
      (actif ? "var(--accent)" : "rgba(var(--w),.2)") + ";background:" + (actif ? "rgba(var(--accent-rgb),.18)" : "transparent") +
      ";color:" + (actif ? "var(--accent)" : "var(--text)") + ";font-family:system-ui,sans-serif";
  }

  // ===========================================================================
  // Bloc d'accueil « 🎯 Objectif kcal » — sa propre catégorie, entre le swipe
  // « Qu'est-ce qu'on mange ? » et « De quoi t'as envie ? ».
  // ===========================================================================
  function injecterStyleBloc() {
    if (document.getElementById("objectif-bloc-style")) return;
    const s = document.createElement("style");
    s.id = "objectif-bloc-style";
    s.textContent = `
      .obj-bloc{background:rgba(var(--w),.05);border:1px solid rgba(var(--w),.1);border-radius:16px;padding:12px 14px;margin:0 0 16px;font-family:system-ui,sans-serif}
      .obj-bloc-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:9px}
      .obj-bloc-head b{color:var(--text);font-size:15px}
      .obj-bloc .obj-edit{background:none;border:none;color:var(--text-3);font-size:13px;cursor:pointer;text-decoration:underline;padding:0}
      .obj-bloc .obj-intro{color:var(--text-2);font-size:13.5px;line-height:1.5;margin-bottom:11px}
      .obj-stats{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:11px}
      .obj-stat{background:rgba(var(--w),.07);border:1px solid rgba(var(--w),.12);border-radius:999px;padding:6px 12px;font-size:13px;color:var(--text)}
      .obj-stat b{color:var(--accent);font-weight:800}
      .obj-cta{width:100%;background:rgba(var(--accent-rgb),.15);color:var(--accent);border:1px solid rgba(var(--accent-rgb),.5);border-radius:12px;padding:10px;font-size:13.5px;font-weight:700;cursor:pointer}
      .obj-cta:hover{background:rgba(var(--accent-rgb),.22)}
      .obj-kval{font-size:36px;font-weight:800;color:var(--accent);line-height:1}
      .obj-step{width:40px;height:40px;border-radius:11px;border:1.5px solid rgba(var(--w),.2);background:rgba(var(--w),.06);color:var(--text);font-size:22px;font-weight:700;cursor:pointer;flex:none;line-height:1}
      .obj-step:active{transform:scale(.94)}
      .obj-step:disabled{opacity:.3;cursor:default}
      #obj-k-range{flex:1;height:6px;accent-color:var(--accent);cursor:pointer}
      .obj-jour-label{color:var(--text-2);font-size:12.5px;margin:2px 0 8px}
      .obj-moments{display:grid;grid-template-columns:1fr 1fr;gap:7px}
      .obj-moment{display:flex;align-items:center;justify-content:space-between;gap:6px;background:rgba(var(--w),.06);border:1px solid rgba(var(--w),.14);border-radius:11px;padding:9px 11px;font-size:12.5px;color:var(--text);cursor:pointer;text-align:left}
      .obj-moment b{color:var(--accent);font-weight:800;white-space:nowrap}
      .obj-moment:hover{border-color:rgba(var(--accent-rgb),.5);background:rgba(var(--accent-rgb),.1)}
    `;
    document.head.appendChild(s);
  }

  function blocHTML() {
    const o = lire();
    const aGoal = o.kcal || o.focus;
    let head = '<div class="obj-bloc-head"><b>' + T("🎯 Objectif kcal", "🎯 Calorie goal") + "</b>" +
      (aGoal ? '<button type="button" class="obj-edit" onclick="ouvrirObjectifs()">' + T("modifier", "edit") + "</button>" : "") + "</div>";
    if (!aGoal) {
      return head +
        '<div class="obj-intro">' + T("Fixe tes calories du jour : l'appli te propose direct des repas qui rentrent dans ton objectif (et chaque recette te dit la part qu'elle représente).", "Set your daily calories: the app suggests meals that fit your goal (and each recipe shows the share it represents).") + "</div>" +
        '<button type="button" class="obj-cta" onclick="ouvrirObjectifs()">' + T("🎯 Définir mon objectif", "🎯 Set my goal") + "</button>";
    }
    const focus = o.focus && FOCUS[o.focus];
    const protJour = window.OBJ_protJour ? window.OBJ_protJour(o) : null;
    let stats = '<div class="obj-stats">';
    if (o.kcal) stats += '<span class="obj-stat"><b>' + o.kcal + "</b> kcal/" + T("jour", "day") + "</span>";
    if (protJour) {
      const gkg = o.poids ? " (" + (window.OBJ_protKg ? window.OBJ_protKg(o) : 1.8) + " g/kg)" : "";
      stats += '<span class="obj-stat">💪 <b>~' + protJour + "</b> g " + T("protéines/jour", "protein/day") + gkg + "</span>";
    }
    if (focus) stats += '<span class="obj-stat">' + focus.e + " " + T(focus.fr, focus.en) + "</span>";
    stats += "</div>";

    // Avec objectif kcal → on répartit sur la journée (matin/midi/collation/soir),
    // chaque moment cliquable propose des recettes qui rentrent dans SA part.
    let corps;
    if (o.kcal) {
      corps = '<div class="obj-jour-label">' + T("Ta journée — touche un moment pour des idées :", "Your day — tap a moment for ideas:") + "</div>" +
        '<div class="obj-moments">' +
        MOMENTS.map((m) => '<button type="button" class="obj-moment" onclick="proposerSelonObjectif(\'' + m.k + '\')">' +
          "<span>" + m.e + " " + T(m.fr, m.en) + "</span><b>~" + Math.round(o.kcal * m.pct) + "</b></button>").join("") +
        "</div>";
    } else {
      // focus seul (sans kcal) → un seul bouton « voir des repas »
      corps = '<button type="button" class="obj-cta" onclick="proposerSelonObjectif()">' + T("🍽️ Voir des repas qui collent", "🍽️ See meals that fit") + "</button>";
    }
    return head + stats + corps;
  }

  function injecterBlocObjectif() {
    const sec = document.getElementById("section-accueil");
    if (!sec) return;
    injecterStyleBloc();
    let bloc = document.getElementById("objectif-bloc");
    if (!bloc) {
      bloc = document.createElement("div");
      bloc.id = "objectif-bloc";
      bloc.className = "obj-bloc";
      const cta = document.querySelector(".swipe-cta");
      if (cta && cta.parentNode) cta.parentNode.insertBefore(bloc, cta.nextSibling);
      else sec.insertBefore(bloc, sec.firstChild);
    }
    bloc.innerHTML = blocHTML();
  }
  // Exposé pour rafraîchir le bloc après enregistrement / changement de langue.
  window._refreshObjectifBloc = injecterBlocObjectif;

  function brancherBloc() {
    if (typeof window.afficherAccueil === "function" && !window.afficherAccueil._objbloc) {
      const orig = window.afficherAccueil;
      window.afficherAccueil = function () { const r = orig.apply(this, arguments); try { injecterBlocObjectif(); } catch (e) {} return r; };
      window.afficherAccueil._objbloc = true;
    }
    try { injecterBlocObjectif(); } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(brancherBloc, 0));
  else setTimeout(brancherBloc, 0);
  window.addEventListener("languechange", () => { try { injecterBlocObjectif(); } catch (e) {} });
})();
