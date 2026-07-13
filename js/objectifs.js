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
    equilibre: { fr: "Équilibré", en: "Balanced", e: "⚖️", protPct: 0.20, protKg: 1.8, lipPct: 0.3, kcalAdj: 1.00 },
    leger: { fr: "Léger", en: "Light", e: "🪶", protPct: 0.22, protKg: 1.8, lipPct: 0.28, kcalAdj: 0.90, cap: true },
    proteine: { fr: "Protéiné", en: "High-protein", e: "💪", protPct: 0.30, protKg: 2.0, lipPct: 0.25, kcalAdj: 1.00, prot: true },
    seche: { fr: "Sèche", en: "Cutting", e: "🔥", protPct: 0.40, protKg: 2.2, lipPct: 0.25, kcalAdj: 0.80, prot: true, cap: true },
    prisedemasse: { fr: "Prise de masse", en: "Bulking", e: "🏋️", protPct: 0.30, protKg: 2.0, lipPct: 0.25, kcalAdj: 1.12, prot: true, surplus: true },
    gourmand: { fr: "Plaisir", en: "Indulgent", e: "😋", protPct: 0.18, protKg: 1.6, lipPct: 0.35, kcalAdj: 1.00 },
  };
  window.OBJ_FOCUS = FOCUS;

  // Niveaux d'activité → multiplicateur du métabolisme de base (pour le TDEE).
  const ACTIVITES = {
    sedentaire: { fr: "Sédentaire", en: "Sedentary", e: "🛋️", pal: 1.2,
      desc: "Peu ou pas de sport, travail assis, peu de marche dans la journée.",
      descEn: "Little or no exercise, desk job, not much walking during the day." },
    actif: { fr: "Actif", en: "Active", e: "🚶", pal: 1.55,
      desc: "Exercice modéré : 1 à 3 séances par semaine, ou beaucoup de marche au quotidien.",
      descEn: "Moderate exercise: 1 to 3 sessions a week, or lots of daily walking." },
    sportif: { fr: "Sportif", en: "Athletic", e: "🏃", pal: 1.8,
      desc: "Sport intense : 4 à 6 séances ou plus par semaine, ou métier physique.",
      descEn: "Intense training: 4 to 6+ sessions a week, or a physical job." },
  };

  // Métabolisme de base (Mifflin-St Jeor) — kcal au repos.
  function calcMB(poids, taille, age, sexe) {
    if (!poids || !taille || !age) return null;
    return Math.round(10 * poids + 6.25 * taille - 5 * age + (sexe === "femme" ? -161 : 5));
  }
  // Suggestion calories : MB × activité (= TDEE) × ajustement du but.
  // Renvoie { mb, tdee, kcal }. Repli ~poids×33 si taille/âge manquent.
  function suggererKcal(p) {
    const a = ACTIVITES[p && p.activite];
    if (!p || !p.poids || !a) return null;
    const mb = calcMB(p.poids, p.taille, p.age, p.sexe);
    const tdee = mb ? Math.round(mb * a.pal) : Math.round(p.poids * 33 * (a.pal / 1.55));
    const f = p.focus && FOCUS[p.focus];
    return { mb: mb, tdee: tdee, kcal: Math.round((tdee * ((f && f.kcalAdj) || 1)) / 10) * 10 };
  }
  window.OBJ_calcMB = calcMB;

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
  // Lipides/jour (g) : part lipPct des calories. Glucides/jour (g) : le reste des
  // calories une fois protéines et lipides retirés → les 3 macros somment aux kcal.
  window.OBJ_lipJour = function (o) {
    if (!o || !o.kcal) return null;
    const f = o.focus && FOCUS[o.focus];
    return Math.round((o.kcal * ((f && f.lipPct) || 0.30)) / 9);
  };
  window.OBJ_glucJour = function (o) {
    if (!o || !o.kcal) return null;
    const prot = window.OBJ_protJour ? (window.OBJ_protJour(o) || 0) : 0;
    const lip = window.OBJ_lipJour ? (window.OBJ_lipJour(o) || 0) : 0;
    return Math.max(0, Math.round((o.kcal - 4 * prot - 9 * lip) / 4));
  };
  // Eau conseillée (litres/jour) : 35 ml/kg si poids connu, sinon ~1 ml/kcal.
  window.OBJ_eauJour = function (o) {
    if (!o) return null;
    const ml = o.poids ? o.poids * 35 : (o.kcal ? o.kcal : null);
    return ml ? Math.round(ml / 100) / 10 : null;
  };

  // Répartition d'une journée : l'objectif kcal se répartit sur les moments (le matin
  // et les collations comptent !). pct = part du budget du jour ; cats = catégories de
  // recettes adaptées à ce moment. Somme des pct = 1. Exposé pour envie.js (suggestions).
  const MOMENTS = [
    { k: "matin", e: "🌅", fr: "Matin", en: "Morning", pct: 0.25, cats: ["brunch"] },
    { k: "midi", e: "☀️", fr: "Midi", en: "Lunch", pct: 0.35, cats: ["plats", "salades", "pizzas", "healthy", "soupes"] },
    { k: "collation", e: "🍎", fr: "Collation", en: "Snack", pct: 0.10, cats: ["encas", "desserts"] },
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
    return { cal: pc.cal != null ? Math.round(pc.cal / base) : null, prot: pc.prot != null ? Math.round(pc.prot / base) : null, gluc: pc.gluc != null ? Math.round(pc.gluc / base) : null, lip: pc.lip != null ? Math.round(pc.lip / base) : null };
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

    // Macros de la portion (protéines / glucides / lipides).
    if (n && (n.prot != null || n.gluc != null || n.lip != null)) {
      const chips = [];
      if (n.prot != null) chips.push("💪 <b>" + n.prot + " g</b> " + T("prot.", "prot."));
      if (n.gluc != null) chips.push("🍚 <b>" + n.gluc + " g</b> " + T("gluc.", "carbs"));
      if (n.lip != null) chips.push("🥑 <b>" + n.lip + " g</b> " + T("lip.", "fat"));
      parts += '<div style="margin-top:8px;color:var(--text);font-size:13.5px;display:flex;gap:15px;flex-wrap:wrap">' +
        chips.map((c) => "<span>" + c + "</span>").join("") + "</div>" +
        '<div style="margin-top:2px;color:var(--text-3);font-size:11.5px">' + T("par portion", "per serving") + "</div>";
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
    const tStart = o.taille || 175;
    const ageStart = o.age || 30;
    const sexeStart = o.sexe || "homme";
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
        // Sexe
        '<p style="color:var(--text-2);font-size:13px;margin:12px 0 6px">' + T("Sexe", "Sex") + "</p>" +
        '<div style="display:flex;gap:8px">' +
          '<button type="button" data-sexe="homme" class="obj-sexe" style="' + chip(sexeStart === "homme") + '">♂ ' + T("Homme", "Male") + "</button>" +
          '<button type="button" data-sexe="femme" class="obj-sexe" style="' + chip(sexeStart === "femme") + '">♀ ' + T("Femme", "Female") + "</button></div>" +
        // Taille
        '<div style="display:flex;align-items:center;justify-content:space-between;margin:14px 0 4px;font-size:13px;color:var(--text-2)"><span>' + T("Taille", "Height") + '</span><span><b id="obj-tval" style="color:var(--accent)">' + tStart + "</b> cm</span></div>" +
        '<input type="range" id="obj-taille" min="140" max="210" step="1" value="' + tStart + '" style="width:100%;accent-color:var(--accent);height:6px;cursor:pointer">' +
        // Âge
        '<div style="display:flex;align-items:center;justify-content:space-between;margin:12px 0 4px;font-size:13px;color:var(--text-2)"><span>' + T("Âge", "Age") + '</span><span><b id="obj-aval" style="color:var(--accent)">' + ageStart + "</b> " + T("ans", "yrs") + "</span></div>" +
        '<input type="range" id="obj-age" min="14" max="90" step="1" value="' + ageStart + '" style="width:100%;accent-color:var(--accent);height:6px;cursor:pointer">' +
        '<p style="color:var(--text-2);font-size:13px;margin:14px 0 6px">' + T("Mon activité", "My activity") + "</p>" +
        '<div style="display:flex;flex-wrap:wrap;gap:8px">' + btnA + "</div>" +
        '<div id="obj-act-desc" style="margin-top:7px;font-size:12.5px;color:var(--text-2);line-height:1.45;background:rgba(var(--w),.05);border-radius:9px;padding:8px 11px"></div>' +
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

    let selK = kStart, selF = o.focus || "", selP = pStart, selA = aStart, selT = tStart, selAge = ageStart, selSexe = sexeStart, suggKcal = null;
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
    // Recalcule MB (Mifflin-St Jeor) → TDEE → calories conseillées + protéines g/kg.
    const recompute = () => {
      if (!poidsOnEl.checked) return;
      const f = selF && FOCUS[selF];
      const s = suggererKcal({ poids: selP, taille: selT, age: selAge, sexe: selSexe, activite: selA, focus: selF });
      suggKcal = s ? s.kcal : null;
      const protKg = (f && f.protKg) || 1.8;
      const protG = Math.round(selP * protKg);
      let txt = "";
      if (s && s.mb) txt += "🔥 " + T("Métabolisme de base : ", "Basal metabolism: ") + "<b>~" + s.mb + " kcal</b><br>";
      if (s) txt += "⚡ " + T("Dépense estimée : ", "Estimated burn: ") + "<b>~" + s.tdee + " kcal/" + T("jour", "day") + "</b> (" + T(ACTIVITES[selA].fr, ACTIVITES[selA].en) + ")<br>";
      if (s) txt += "🎯 " + T("Calories conseillées : ", "Recommended calories: ") + "<b>~" + s.kcal + " kcal/" + T("jour", "day") + "</b>" + (selF ? " (" + T(FOCUS[selF].fr, FOCUS[selF].en) + ")" : "") + "<br>";
      txt += "💪 " + T("Protéines : ", "Protein: ") + "<b>~" + protG + " g/" + T("jour", "day") + "</b> (" + protKg + " g/kg)";
      const eauL = (Math.round(selP * 35 / 100) / 10).toFixed(1).replace(".", ",");
      txt += "<br>💧 " + T("Eau : ", "Water: ") + "<b>~" + eauL + " L/" + T("jour", "day") + "</b>";
      suggText.innerHTML = txt;
      suggUse.style.display = (s && s.kcal) ? "block" : "none";
    };
    range.addEventListener("input", () => setK(parseInt(range.value) || 1));
    minus.addEventListener("click", () => setK(selK - 10));
    plus.addEventListener("click", () => setK(selK + 10));
    none.addEventListener("change", majSansKcal);
    majSansKcal();
    // But
    modal.querySelectorAll(".obj-f").forEach((b) => b.addEventListener("click", () => { selF = b.dataset.focus; modal.querySelectorAll(".obj-f").forEach((x) => x.style.cssText = chip(false)); b.style.cssText = chip(true); recompute(); }));
    // Activité
    const actDescEl = modal.querySelector("#obj-act-desc");
    const majActDesc = () => { const a = ACTIVITES[selA]; if (actDescEl && a) actDescEl.innerHTML = a.e + " <b>" + T(a.fr, a.en) + "</b> — " + T(a.desc, a.descEn); };
    majActDesc();
    modal.querySelectorAll(".obj-act").forEach((b) => b.addEventListener("click", () => { selA = b.dataset.act; modal.querySelectorAll(".obj-act").forEach((x) => x.style.cssText = chip(false)); b.style.cssText = chip(true); majActDesc(); recompute(); }));
    // Poids
    const setP = (v) => { selP = Math.max(40, Math.min(150, Math.round(v))); pRange.value = selP; pVal.textContent = selP; recompute(); };
    pRange.addEventListener("input", () => setP(parseInt(pRange.value) || 40));
    modal.querySelector("#obj-p-minus").addEventListener("click", () => setP(selP - 1));
    modal.querySelector("#obj-p-plus").addEventListener("click", () => setP(selP + 1));
    // Sexe / Taille / Âge
    modal.querySelectorAll(".obj-sexe").forEach((b) => b.addEventListener("click", () => { selSexe = b.dataset.sexe; modal.querySelectorAll(".obj-sexe").forEach((x) => x.style.cssText = chip(false)); b.style.cssText = chip(true); recompute(); }));
    const tRange = modal.querySelector("#obj-taille"), tVal = modal.querySelector("#obj-tval");
    tRange.addEventListener("input", () => { selT = parseInt(tRange.value) || 175; tVal.textContent = selT; recompute(); });
    const ageRange = modal.querySelector("#obj-age"), ageVal = modal.querySelector("#obj-aval");
    ageRange.addEventListener("input", () => { selAge = parseInt(ageRange.value) || 30; ageVal.textContent = selAge; recompute(); });
    poidsOnEl.addEventListener("change", () => { poidsBox.style.display = poidsOnEl.checked ? "" : "none"; recompute(); });
    suggUse.addEventListener("click", () => { if (suggKcal) { none.checked = false; majSansKcal(); setK(suggKcal); } });
    recompute();

    const fermer = () => modal.remove();
    window.fermerObjectifs = fermer;
    modal.querySelector("#obj-close").addEventListener("click", fermer);
    modal.addEventListener("click", (e) => { if (e.target === modal) fermer(); });
    modal.querySelector("#obj-save").addEventListener("click", () => {
      ecrire({ kcal: none.checked ? null : selK, focus: selF || null,
        poids: poidsOnEl.checked ? selP : null, activite: poidsOnEl.checked ? selA : null,
        taille: poidsOnEl.checked ? selT : null, age: poidsOnEl.checked ? selAge : null, sexe: poidsOnEl.checked ? selSexe : null });
      fermer();
      if (typeof window._refreshObjectifBloc === "function") window._refreshObjectifBloc();
      if (typeof afficherToast === "function") afficherToast(T("🎯 Objectif enregistré !", "🎯 Goal saved!"));
      // Pas d'ouverture auto : l'utilisateur clique ensuite « Composer ma journée » ou un moment.
    });
  };

  function chip(actif) {
    return "border-radius:999px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid " +
      (actif ? "var(--accent)" : "rgba(var(--w),.2)") + ";background:" + (actif ? "rgba(var(--accent-rgb),.18)" : "transparent") +
      ";color:" + (actif ? "var(--accent)" : "var(--text)") + ";font-family:system-ui,sans-serif";
  }

  // ===========================================================================
  // 🍽️ Calcul repas libre + journal du jour
  // Tape ce que tu as mangé (aliments + grammes, HORS recettes de l'appli),
  // vois les calories/macros, et cumule sur la journée face à ton budget.
  // Le journal est local et se remet à zéro chaque jour.
  // ===========================================================================
  const LSJ = "journal_repas";
  const jourCle = () => { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  function lireJournal() {
    let j; try { j = JSON.parse(localStorage.getItem(LSJ) || "null"); } catch (e) { j = null; }
    if (!j || j.date !== jourCle() || !Array.isArray(j.repas)) return { date: jourCle(), repas: [] };
    return j;
  }
  function ecrireJournal(j) { try { localStorage.setItem(LSJ, JSON.stringify(j)); } catch (e) {} }
  window.OBJ_journalTotaux = function () {
    const j = lireJournal(), t = { kcal: 0, prot: 0, gluc: 0, lip: 0, n: j.repas.length };
    j.repas.forEach((r) => { t.kcal += r.kcal || 0; t.prot += r.prot || 0; t.gluc += r.gluc || 0; t.lip += r.lip || 0; });
    return t;
  };

  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const PRIX = () => (typeof INGREDIENTS_PRIX !== "undefined") ? INGREDIENTS_PRIX : {};
  const LAB = () => (typeof INGREDIENTS_LABELS !== "undefined") ? INGREDIENTS_LABELS : {};
  const CC = (k) => (typeof cleCanonique === "function") ? (cleCanonique(k) || k) : k;
  const normed = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  // kcal + macros d'un aliment pour N grammes (depuis la base ingrédients, /100 g).
  function nutriAliment(key, grams) {
    const p = PRIX()[CC(key)] || PRIX()[key];
    const cal = p && (p.calPer100g != null ? p.calPer100g : p.cal);
    if (!p || cal == null || grams == null) return null;
    const f = grams / 100;
    return { cal: Math.round(cal * f), prot: Math.round((p.prot || 0) * f), gluc: Math.round((p.glucides || 0) * f), lip: Math.round((p.lipides || 0) * f) };
  }
  let _alimIndex = null;
  function alimIndex() {
    if (_alimIndex) return _alimIndex;
    const P = PRIX(), L = LAB();
    _alimIndex = Object.keys(P).filter((k) => P[k] && (P[k].calPer100g != null || P[k].cal != null))
      .map((k) => { const lab = L[k] || k; return { key: k, label: lab, nameNorm: normed(lab.replace(/^[^\p{L}0-9]+/u, "")), search: normed(lab + " " + k) }; });
    return _alimIndex;
  }

  function injecterStyleRepas() {
    if (document.getElementById("repas-style")) return;
    const s = document.createElement("style");
    s.id = "repas-style";
    s.textContent = `
      .repas-overlay{position:fixed;inset:0;z-index:9300;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .2s;font-family:system-ui,sans-serif}
      .repas-overlay.visible{opacity:1}
      .repas-box{background:var(--panel-solid,#1a1a2e);color:var(--text);width:100%;max-width:480px;max-height:92vh;border-radius:18px 18px 0 0;display:flex;flex-direction:column;overflow:hidden}
      @media(min-width:540px){.repas-overlay{align-items:center}.repas-box{border-radius:18px}}
      .repas-head{display:flex;align-items:center;justify-content:space-between;padding:15px 18px;border-bottom:1px solid rgba(var(--w),.1)}
      .repas-head h2{margin:0;font-size:18px}
      .repas-close{width:34px;height:34px;border-radius:50%;border:none;background:rgba(var(--w),.1);color:var(--text);font-size:15px;cursor:pointer}
      .repas-body{overflow-y:auto;padding:14px 16px 20px}
      .repas-sub{color:var(--text-2);font-size:13px;margin:0 0 12px;line-height:1.45}
      .repas-search-wrap{position:relative}
      .repas-search{width:100%;box-sizing:border-box;background:rgba(var(--w),.08);border:1.5px solid rgba(var(--w),.15);border-radius:12px;padding:11px 13px;color:var(--text);font-size:14px}
      .repas-search:focus{outline:none;border-color:var(--accent)}
      .repas-suggest{position:absolute;left:0;right:0;top:calc(100% + 4px);background:var(--panel-solid,#1a1a2e);border:1px solid rgba(var(--w),.15);border-radius:12px;max-height:230px;overflow-y:auto;z-index:5;box-shadow:0 10px 30px rgba(0,0,0,.4);display:none}
      .repas-suggest.on{display:block}
      .repas-sug-item{padding:10px 13px;font-size:14px;color:var(--text);cursor:pointer;border-bottom:1px solid rgba(var(--w),.06)}
      .repas-sug-item:hover,.repas-sug-item.sel{background:rgba(var(--accent-rgb),.15)}
      .repas-sug-item small{color:var(--text-3);font-size:11px}
      .repas-lignes{margin:12px 0 0;display:flex;flex-direction:column;gap:7px}
      .repas-ligne{display:flex;align-items:center;gap:9px;background:rgba(var(--w),.05);border:1px solid rgba(var(--w),.1);border-radius:11px;padding:8px 10px}
      .repas-ligne-nom{flex:1;font-size:13.5px;color:var(--text);line-height:1.2;min-width:0}
      .repas-ligne-g{width:62px;background:rgba(var(--w),.1);border:1px solid rgba(var(--w),.18);border-radius:8px;padding:6px 7px;color:var(--text);font-size:13px;text-align:right}
      .repas-ligne-g:focus{outline:none;border-color:var(--accent)}
      .repas-ligne-unit{color:var(--text-3);font-size:12px}
      .repas-ligne-kcal{font-size:12.5px;color:var(--accent);font-weight:800;white-space:nowrap;min-width:56px;text-align:right}
      .repas-ligne-del{background:none;border:none;color:var(--text-3);font-size:16px;cursor:pointer;padding:0 2px;flex:none}
      .repas-total{margin:12px 0 0;background:rgba(var(--accent-rgb),.1);border:1px solid rgba(var(--accent-rgb),.3);border-radius:12px;padding:11px 13px}
      .repas-total-kcal{font-size:22px;font-weight:800;color:var(--accent)}
      .repas-total-macros{font-size:12.5px;color:var(--text-2);margin-top:3px}
      .repas-total-pct{font-size:12.5px;color:var(--text);margin-top:6px}
      .repas-vide{color:var(--text-3);font-size:13px;text-align:center;padding:14px 0}
      .repas-nom{width:100%;box-sizing:border-box;margin-top:12px;background:rgba(var(--w),.08);border:1.5px solid rgba(var(--w),.15);border-radius:11px;padding:10px 12px;color:var(--text);font-size:13.5px}
      .repas-nom:focus{outline:none;border-color:var(--accent)}
      .repas-add-btn{width:100%;margin-top:10px;background:linear-gradient(90deg,var(--accent),#ff9330);color:#1a0e14;border:none;border-radius:12px;padding:12px;font-size:14.5px;font-weight:800;cursor:pointer}
      .repas-add-btn:disabled{opacity:.4;cursor:default}
      .repas-journal{margin-top:18px;border-top:1px solid rgba(var(--w),.1);padding-top:14px}
      .repas-journal h3{margin:0 0 4px;font-size:15px;color:var(--text)}
      .repas-jour-budget{font-size:13px;color:var(--text-2);margin-bottom:9px}
      .repas-jour-budget b{color:var(--accent);font-weight:800}
      .repas-jour-bar{height:8px;border-radius:99px;background:rgba(var(--w),.12);overflow:hidden;margin-bottom:11px}
      .repas-jour-bar span{display:block;height:100%}
      .repas-jour-repas{display:flex;align-items:center;gap:9px;background:rgba(var(--w),.05);border:1px solid rgba(var(--w),.1);border-radius:11px;padding:9px 11px;margin-bottom:7px}
      .repas-jour-repas .rj-nom{flex:1;font-size:13.5px;color:var(--text)}
      .repas-jour-repas .rj-kcal{font-size:13px;color:var(--accent);font-weight:800}
      .repas-jour-repas .rj-del{background:none;border:none;color:var(--text-3);font-size:15px;cursor:pointer}
      .repas-jour-vide{color:var(--text-3);font-size:13px;text-align:center;padding:10px 0}
      .repas-jour-macros{font-size:12px;color:var(--text-3);margin-top:2px}
    `;
    document.head.appendChild(s);
  }

  window.ouvrirCalculRepas = function () {
    injecterStyleRepas();
    let modal = document.getElementById("modal-repas");
    if (modal) modal.remove();
    modal = document.createElement("div");
    modal.id = "modal-repas";
    modal.className = "repas-overlay";
    modal.innerHTML =
      '<div class="repas-box">' +
        '<div class="repas-head"><h2>' + T("🍽️ J'ai mangé…", "🍽️ I ate…") + '</h2><button type="button" class="repas-close" id="repas-close">✕</button></div>' +
        '<div class="repas-body">' +
          '<p class="repas-sub">' + T("Ajoute tes aliments et leurs grammes (ton propre repas, hors recettes) — l'appli calcule les calories et cumule ta journée.", "Add your foods and their grams (your own meal, no recipes) — the app computes the calories and totals your day.") + "</p>" +
          '<div class="repas-search-wrap"><input type="text" class="repas-search" id="repas-search" autocomplete="off" placeholder="' + T("Cherche un aliment (riz, dinde, brocoli…)", "Search a food (rice, turkey, broccoli…)") + '"><div class="repas-suggest" id="repas-suggest"></div></div>' +
          '<div class="repas-lignes" id="repas-lignes"></div>' +
          '<div class="repas-total" id="repas-total"></div>' +
          '<input type="text" class="repas-nom" id="repas-nom" maxlength="40" placeholder="' + T("Nom du repas (optionnel : déjeuner…)", "Meal name (optional: lunch…)") + '">' +
          '<button type="button" class="repas-add-btn" id="repas-add" disabled>' + T("➕ Ajouter au journal du jour", "➕ Add to today's log") + "</button>" +
          '<div class="repas-journal" id="repas-journal"></div>' +
        "</div>" +
      "</div>";
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add("visible"));
    if (typeof window._backGuardPush === "function") window._backGuardPush();

    const meal = []; // {key,label,grams}
    const $ = (id) => modal.querySelector(id);
    const search = $("#repas-search"), suggest = $("#repas-suggest"), lignesEl = $("#repas-lignes"),
      totalEl = $("#repas-total"), addBtn = $("#repas-add"), nomEl = $("#repas-nom"), journalEl = $("#repas-journal");

    // --- Recherche / suggestions ---
    search.addEventListener("input", () => {
      const q = normed(search.value.trim());
      if (q.length < 2) { suggest.classList.remove("on"); suggest.innerHTML = ""; return; }
      const res = alimIndex().filter((a) => a.search.includes(q))
        .map((a) => { let r = 3; const kl = a.key.toLowerCase(); if (a.nameNorm === q || kl === q) r = 0; else if (a.nameNorm.startsWith(q)) r = 1; else if (kl.startsWith(q)) r = 2; return { a: a, r: r }; })
        .sort((x, y) => x.r - y.r || x.a.nameNorm.length - y.a.nameNorm.length).slice(0, 8).map((x) => x.a);
      if (!res.length) { suggest.innerHTML = '<div class="repas-sug-item" style="opacity:.6">' + T("Aucun aliment trouvé", "No food found") + "</div>"; suggest.classList.add("on"); return; }
      suggest.innerHTML = res.map((a) => {
        const n = nutriAliment(a.key, 100);
        return '<div class="repas-sug-item" data-key="' + esc(a.key) + '">' + esc(a.label) + (n ? ' <small>' + n.cal + " kcal/100g</small>" : "") + "</div>";
      }).join("");
      suggest.classList.add("on");
    });
    suggest.addEventListener("click", (e) => {
      const it = e.target.closest(".repas-sug-item[data-key]");
      if (!it) return;
      const key = it.getAttribute("data-key");
      meal.push({ key: key, label: (LAB()[key] || key), grams: 100 });
      search.value = ""; suggest.classList.remove("on"); suggest.innerHTML = "";
      renderMeal(); search.focus();
    });
    document.addEventListener("click", (e) => { if (!modal.contains(e.target)) return; if (!e.target.closest(".repas-search-wrap")) suggest.classList.remove("on"); });

    // --- Rendu du repas en cours ---
    function totalMeal() {
      return meal.reduce((t, ln) => { const n = nutriAliment(ln.key, ln.grams) || {}; t.cal += n.cal || 0; t.prot += n.prot || 0; t.gluc += n.gluc || 0; t.lip += n.lip || 0; return t; }, { cal: 0, prot: 0, gluc: 0, lip: 0 });
    }
    function renderMeal() {
      if (!meal.length) {
        lignesEl.innerHTML = '<div class="repas-vide">' + T("Cherche un aliment ci-dessus pour composer ton repas.", "Search a food above to build your meal.") + "</div>";
        totalEl.style.display = "none"; addBtn.disabled = true;
      } else {
        lignesEl.innerHTML = meal.map((ln, i) => {
          const n = nutriAliment(ln.key, ln.grams) || { cal: 0 };
          return '<div class="repas-ligne">' +
            '<span class="repas-ligne-nom">' + esc(ln.label) + "</span>" +
            '<input class="repas-ligne-g" type="number" inputmode="numeric" min="0" step="10" value="' + ln.grams + '" data-i="' + i + '">' +
            '<span class="repas-ligne-unit">g</span>' +
            '<span class="repas-ligne-kcal">' + n.cal + " kcal</span>" +
            '<button type="button" class="repas-ligne-del" data-i="' + i + '" aria-label="Retirer">✕</button></div>';
        }).join("");
        const t = totalMeal();
        const o = lire();
        let pct = "";
        if (o.kcal) { const p = Math.round((t.cal / o.kcal) * 100); pct = '<div class="repas-total-pct">' + T("≈ ", "≈ ") + "<b>" + p + "%</b> " + T("de ton objectif du jour", "of your daily goal") + " (" + o.kcal + " kcal).</div>"; }
        totalEl.innerHTML = '<div class="repas-total-kcal">' + t.cal + " kcal</div>" +
          '<div class="repas-total-macros">💪 ' + t.prot + " g · 🍚 " + t.gluc + " g · 🥑 " + t.lip + " g</div>" + pct;
        totalEl.style.display = "block"; addBtn.disabled = false;
      }
    }
    lignesEl.addEventListener("input", (e) => {
      const inp = e.target.closest(".repas-ligne-g"); if (!inp) return;
      const i = +inp.getAttribute("data-i"); if (meal[i]) { meal[i].grams = Math.max(0, parseInt(inp.value) || 0); renderMealTotalsOnly(); }
    });
    // recalcul léger du total sans re-render des inputs (garde le focus)
    function renderMealTotalsOnly() {
      const t = totalMeal(), o = lire();
      let pct = "";
      if (o.kcal) { const p = Math.round((t.cal / o.kcal) * 100); pct = '<div class="repas-total-pct">≈ <b>' + p + "%</b> " + T("de ton objectif du jour", "of your daily goal") + " (" + o.kcal + " kcal).</div>"; }
      totalEl.innerHTML = '<div class="repas-total-kcal">' + t.cal + " kcal</div><div class=\"repas-total-macros\">💪 " + t.prot + " g · 🍚 " + t.gluc + " g · 🥑 " + t.lip + " g</div>" + pct;
      // maj des kcal par ligne
      modal.querySelectorAll(".repas-ligne").forEach((el, i) => { const n = nutriAliment(meal[i].key, meal[i].grams) || { cal: 0 }; const kc = el.querySelector(".repas-ligne-kcal"); if (kc) kc.textContent = n.cal + " kcal"; });
    }
    lignesEl.addEventListener("click", (e) => {
      const del = e.target.closest(".repas-ligne-del"); if (!del) return;
      meal.splice(+del.getAttribute("data-i"), 1); renderMeal();
    });

    // --- Ajouter au journal ---
    addBtn.addEventListener("click", () => {
      if (!meal.length) return;
      const t = totalMeal();
      const j = lireJournal();
      j.repas.push({ nom: (nomEl.value || "").trim() || T("Repas", "Meal"), kcal: t.cal, prot: t.prot, gluc: t.gluc, lip: t.lip, items: meal.map((m) => ({ key: m.key, grams: m.grams })) });
      ecrireJournal(j);
      meal.length = 0; nomEl.value = "";
      renderMeal(); renderJournal();
      if (typeof window._refreshObjectifBloc === "function") window._refreshObjectifBloc();
      if (typeof afficherToast === "function") afficherToast(T("🍽️ Repas ajouté au journal !", "🍽️ Meal added to your log!"));
    });

    // --- Journal du jour ---
    function renderJournal() {
      const j = lireJournal(), o = lire(), t = window.OBJ_journalTotaux();
      let head = "<h3>" + T("📆 Aujourd'hui", "📆 Today") + "</h3>";
      if (o.kcal) {
        const reste = o.kcal - t.kcal, pct = Math.min(100, Math.round((t.kcal / o.kcal) * 100));
        const col = t.kcal <= o.kcal ? "var(--accent)" : "#ff6b6b";
        head += '<div class="repas-jour-budget">' + T("Mangé : ", "Eaten: ") + "<b>" + t.kcal + "</b> / " + o.kcal + " kcal · " +
          (reste >= 0 ? T("reste ", "left ") + "<b>" + reste + "</b>" : "<b style=\"color:#ff6b6b\">+" + (-reste) + "</b> " + T("au-dessus", "over")) + " kcal</div>" +
          '<div class="repas-jour-bar"><span style="width:' + pct + "%;background:" + col + '"></span></div>';
      } else {
        head += '<div class="repas-jour-budget">' + T("Mangé aujourd'hui : ", "Eaten today: ") + "<b>" + t.kcal + "</b> kcal · 💪 " + t.prot + " g · 🍚 " + t.gluc + " g · 🥑 " + t.lip + " g</div>";
      }
      let liste;
      if (!j.repas.length) liste = '<div class="repas-jour-vide">' + T("Aucun repas encore aujourd'hui.", "No meals yet today.") + "</div>";
      else liste = j.repas.map((r, i) =>
        '<div class="repas-jour-repas"><div style="flex:1;min-width:0"><div class="rj-nom">' + esc(r.nom) + '</div><div class="repas-jour-macros">💪 ' + (r.prot || 0) + " g · 🍚 " + (r.gluc || 0) + " g · 🥑 " + (r.lip || 0) + ' g</div></div><span class="rj-kcal">' + (r.kcal || 0) + ' kcal</span><button type="button" class="rj-del" data-i="' + i + '" aria-label="Retirer">🗑️</button></div>').join("");
      journalEl.innerHTML = head + liste;
    }
    journalEl.addEventListener("click", (e) => {
      const del = e.target.closest(".rj-del"); if (!del) return;
      const j = lireJournal(); j.repas.splice(+del.getAttribute("data-i"), 1); ecrireJournal(j);
      renderJournal();
      if (typeof window._refreshObjectifBloc === "function") window._refreshObjectifBloc();
    });

    const fermer = () => { modal.classList.remove("visible"); setTimeout(() => modal.remove(), 200); };
    window.fermerCalculRepas = fermer;
    $("#repas-close").addEventListener("click", fermer);
    modal.addEventListener("click", (e) => { if (e.target === modal) fermer(); });
    renderMeal(); renderJournal();
  };
  // Enregistrer dans le système de retour Android
  try {
    if (typeof _MODALS_SURVEILLEES !== "undefined" && Array.isArray(_MODALS_SURVEILLEES)) {
      _MODALS_SURVEILLEES.push({ id: "modal-repas", close: function () { if (typeof fermerCalculRepas === "function") fermerCalculRepas(); } });
    }
  } catch (e) {}

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
      .obj-bloc--banniere{background:linear-gradient(95deg,#3b8f5f,#7cc576);border:none}
      .obj-bloc--banniere .obj-bloc-head b,.obj-bloc--banniere .obj-intro,.obj-bloc--banniere .obj-kval{color:#0f2e18}
      .obj-bloc--banniere .obj-edit{color:#153d1f}
      .obj-bloc--banniere .obj-cta{background:#0f2e18;color:#a5d6a7;border:none}
      .obj-bloc--banniere .obj-cta:hover{background:#16401f}
      .obj-bloc--banniere .obj-stat{background:rgba(15,46,24,.14);border-color:rgba(15,46,24,.25);color:#0f2e18}
      .obj-bloc--banniere .obj-stat b{color:#0f2e18}
      .obj-bloc--banniere .obj-step{border-color:rgba(15,46,24,.3);background:rgba(15,46,24,.1);color:#0f2e18}
      .obj-bloc--banniere .obj-jour-label{color:#153d1f}
      .obj-bloc--banniere .obj-moment{background:rgba(15,46,24,.12);border-color:rgba(15,46,24,.22);color:#0f2e18}
      .obj-bloc--banniere .obj-moment b{color:#0f2e18}
      .obj-bloc--banniere .obj-moment:hover{border-color:rgba(15,46,24,.4);background:rgba(15,46,24,.18)}
      .obj-jour-sum{font-size:13px;color:var(--text);margin:11px 0 0;line-height:1.4}
      .obj-jour-sum b{font-weight:800}
      .obj-jour-bar{height:7px;border-radius:99px;background:rgba(var(--w),.14);overflow:hidden;margin-top:6px}
      .obj-jour-bar span{display:block;height:100%}
      .obj-cta-repas{margin-top:10px}
      .obj-bloc--banniere .obj-jour-sum{color:#0f2e18}
      .obj-bloc--banniere .obj-jour-bar{background:rgba(15,46,24,.18)}
    `;
    document.head.appendChild(s);
  }

  // Résumé « journal du jour » + bouton « J'ai mangé… » pour le bloc accueil.
  function mealBlockHTML() {
    const o = lire();
    const t = window.OBJ_journalTotaux ? window.OBJ_journalTotaux() : { kcal: 0, n: 0 };
    let sum = "";
    if (t.n > 0) {
      if (o.kcal) {
        const reste = o.kcal - t.kcal, pct = Math.min(100, Math.round((t.kcal / o.kcal) * 100));
        const col = t.kcal <= o.kcal ? "#12401f" : "#b3261e";
        sum = '<div class="obj-jour-sum">' + T("🍽️ Mangé aujourd'hui : ", "🍽️ Eaten today: ") + "<b>" + t.kcal + "</b> / " + o.kcal + " kcal · " +
          (reste >= 0 ? T("reste ", "left ") + "<b>" + reste + "</b>" : "<b>+" + (-reste) + "</b> " + T("au-dessus", "over")) + " kcal" +
          '<div class="obj-jour-bar"><span style="width:' + pct + "%;background:" + col + '"></span></div></div>';
      } else {
        sum = '<div class="obj-jour-sum">' + T("🍽️ Mangé aujourd'hui : ", "🍽️ Eaten today: ") + "<b>" + t.kcal + "</b> kcal (" + t.n + " " + T("repas", "meals") + ")</div>";
      }
    }
    return sum + '<button type="button" class="obj-cta obj-cta-repas" onclick="ouvrirCalculRepas()">' + T("🍽️ J'ai mangé…", "🍽️ I ate…") + "</button>";
  }

  function blocHTML() {
    const o = lire();
    const aGoal = o.kcal || o.focus;
    let head = '<div class="obj-bloc-head"><b>' + T("🎯 Objectif kcal", "🎯 Calorie goal") + "</b>" +
      (aGoal ? '<button type="button" class="obj-edit" onclick="ouvrirObjectifs()">' + T("modifier", "edit") + "</button>" : "") + "</div>";
    if (!aGoal) {
      return head +
        '<div class="obj-intro">' + T("Fixe tes calories du jour : l'appli te propose direct des repas qui rentrent dans ton objectif (et chaque recette te dit la part qu'elle représente).", "Set your daily calories: the app suggests meals that fit your goal (and each recipe shows the share it represents).") + "</div>" +
        '<button type="button" class="obj-cta" onclick="ouvrirObjectifs()">' + T("🎯 Définir mon objectif", "🎯 Set my goal") + "</button>" +
        mealBlockHTML();
    }
    const focus = o.focus && FOCUS[o.focus];
    const protJour = window.OBJ_protJour ? window.OBJ_protJour(o) : null;
    let stats = '<div class="obj-stats">';
    if (o.kcal) stats += '<span class="obj-stat"><b>' + o.kcal + "</b> kcal/" + T("jour", "day") + "</span>";
    if (protJour) {
      const gkg = o.poids ? " (" + (window.OBJ_protKg ? window.OBJ_protKg(o) : 1.8) + " g/kg)" : "";
      stats += '<span class="obj-stat">💪 <b>~' + protJour + "</b> g " + T("protéines/jour", "protein/day") + gkg + "</span>";
    }
    const glucJour = window.OBJ_glucJour ? window.OBJ_glucJour(o) : null;
    if (glucJour) stats += '<span class="obj-stat">🍚 <b>~' + glucJour + "</b> g " + T("glucides/jour", "carbs/day") + "</span>";
    const lipJour = window.OBJ_lipJour ? window.OBJ_lipJour(o) : null;
    if (lipJour) stats += '<span class="obj-stat">🥑 <b>~' + lipJour + "</b> g " + T("lipides/jour", "fat/day") + "</span>";
    const eau = window.OBJ_eauJour ? window.OBJ_eauJour(o) : null;
    if (eau) {
      stats += '<span class="obj-stat">💧 <b>~' + eau.toFixed(1).replace(".", ",") + "</b> L " + T("eau/jour", "water/day") + "</span>";
    }
    if (focus) stats += '<span class="obj-stat">' + focus.e + " " + T(focus.fr, focus.en) + "</span>";
    stats += "</div>";

    // Avec objectif kcal → on répartit sur la journée (matin/midi/collation/soir),
    // chaque moment cliquable propose des recettes qui rentrent dans SA part.
    let corps;
    if (o.kcal) {
      corps = '<button type="button" class="obj-cta" onclick="composerJournee()" style="margin-bottom:11px">' + T("🍽️ Composer ma journée", "🍽️ Plan my day") + "</button>" +
        '<div class="obj-jour-label">' + T("ou touche un moment :", "or tap a moment:") + "</div>" +
        '<div class="obj-moments">' +
        MOMENTS.map((m) => '<button type="button" class="obj-moment" onclick="proposerSelonObjectif(\'' + m.k + '\')">' +
          "<span>" + m.e + " " + T(m.fr, m.en) + "</span><b>~" + Math.round(o.kcal * m.pct) + "</b></button>").join("") +
        "</div>";
    } else {
      // focus seul (sans kcal) → un seul bouton « voir des repas »
      corps = '<button type="button" class="obj-cta" onclick="proposerSelonObjectif()">' + T("🍽️ Voir des repas qui collent", "🍽️ See meals that fit") + "</button>";
    }
    return head + stats + corps + mealBlockHTML();
  }

  function injecterBlocObjectif() {
    const sec = document.getElementById("section-accueil");
    if (!sec) return;
    injecterStyleBloc();
    let bloc = document.getElementById("objectif-bloc");
    if (!bloc) {
      bloc = document.createElement("div");
      bloc.id = "objectif-bloc";
      bloc.className = "obj-bloc obj-bloc--banniere";
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
