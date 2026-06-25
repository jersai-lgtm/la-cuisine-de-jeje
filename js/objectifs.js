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

  const FOCUS = {
    equilibre: { fr: "Équilibré", en: "Balanced", e: "⚖️" },
    leger: { fr: "Léger", en: "Light", e: "🪶" },
    proteine: { fr: "Protéiné", en: "High-protein", e: "💪" },
    gourmand: { fr: "Gourmand", en: "Indulgent", e: "😋" },
  };

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

    // Adéquation au focus
    if (o.focus && n) {
      let msg = "";
      if (o.focus === "leger") msg = (n.cal != null && n.cal <= 500) ? T("✅ Colle à ton objectif léger", "✅ Fits your light goal") : T("⚠️ Plutôt copieux pour un objectif léger", "⚠️ A bit rich for a light goal");
      else if (o.focus === "proteine") msg = (n.prot != null && n.prot >= 20) ? T("💪 Riche en protéines, parfait", "💪 High in protein, perfect") : T("ℹ️ Peu protéiné", "ℹ️ Low in protein");
      else if (o.focus === "gourmand") msg = T("😋 Profite, c'est permis !", "😋 Enjoy, you've earned it!");
      else msg = T("⚖️ À intégrer dans une journée équilibrée", "⚖️ Fits a balanced day");
      if (msg) parts += '<div style="margin-top:8px;color:var(--text-2);font-size:13.5px">' + msg + "</div>";
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
    const kStart = o.kcal || 2000;          // valeur de départ du compteur
    // « focus seul » coché UNIQUEMENT si l'utilisateur avait déjà choisi un focus sans
    // kcal (sinon, nouvel utilisateur → case décochée pour qu'il puisse régler le compteur).
    const sansKcal = !!(o.focus && !o.kcal);
    const btnF = Object.keys(FOCUS).map((f) => '<button type="button" data-focus="' + f + '" class="obj-f" style="' + chip(o.focus === f) + '">' + FOCUS[f].e + " " + T(FOCUS[f].fr, FOCUS[f].en) + "</button>").join("") +
      '<button type="button" data-focus="" class="obj-f" style="' + chip(!o.focus) + '">' + T("Aucun", "None") + "</button>";
    modal.innerHTML =
      '<div style="background:var(--panel-solid,#1a1a2e);color:var(--text);border:1px solid rgba(var(--w),.12);border-radius:18px;max-width:420px;width:100%;padding:20px;font-family:system-ui,sans-serif;max-height:90vh;overflow:auto">' +
      '<div style="display:flex;align-items:center;justify-content:space-between"><h2 style="margin:0;font-size:19px">' + T("🎯 Mon objectif nutritionnel", "🎯 My nutrition goal") + "</h2>" +
      '<button type="button" id="obj-close" style="background:rgba(var(--w),.1);color:var(--text);border:none;border-radius:50%;width:34px;height:34px;font-size:15px;cursor:pointer">✕</button></div>' +
      '<p style="color:var(--text-2);font-size:14px;margin:14px 0 6px">' + T("Calories par jour", "Calories per day") + "</p>" +
      '<div style="text-align:center"><span class="obj-kval" id="obj-kval">' + kStart + '</span><span style="font-size:14px;color:var(--text-2)"> kcal</span></div>' +
      '<div style="display:flex;align-items:center;gap:10px;margin-top:8px">' +
        '<button type="button" id="obj-k-minus" class="obj-step">−</button>' +
        '<input type="range" id="obj-k-range" min="500" max="3500" step="10" value="' + kStart + '">' +
        '<button type="button" id="obj-k-plus" class="obj-step">+</button></div>' +
      '<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-3);margin-top:3px"><span>500</span><span>3500</span></div>' +
      '<label style="display:flex;align-items:center;gap:8px;margin-top:11px;font-size:13px;color:var(--text-2);cursor:pointer"><input type="checkbox" id="obj-k-none"' + (sansKcal ? " checked" : "") + ' style="accent-color:var(--accent);width:17px;height:17px"> ' + T("Pas d'objectif calorique (focus seul)", "No calorie goal (focus only)") + "</label>" +
      '<p style="color:var(--text-2);font-size:14px;margin:18px 0 6px">' + T("Mon focus", "My focus") + "</p>" +
      '<div style="display:flex;flex-wrap:wrap;gap:8px">' + btnF + "</div>" +
      '<button type="button" id="obj-save" style="width:100%;margin-top:18px;background:linear-gradient(90deg,var(--accent),#ff9330);color:#1a0e14;border:none;border-radius:12px;padding:12px;font-size:15px;font-weight:800;cursor:pointer">' + T("Enregistrer", "Save") + "</button></div>";
    document.body.appendChild(modal);
    if (typeof window._backGuardPush === "function") window._backGuardPush(); // bouton retour ferme la modale

    let selK = kStart, selF = o.focus || "";
    const valEl = modal.querySelector("#obj-kval");
    const range = modal.querySelector("#obj-k-range");
    const none = modal.querySelector("#obj-k-none");
    const minus = modal.querySelector("#obj-k-minus");
    const plus = modal.querySelector("#obj-k-plus");
    const setK = (v) => { selK = Math.max(500, Math.min(3500, Math.round(v))); range.value = selK; valEl.textContent = selK; };
    const majSansKcal = () => {
      const off = none.checked;
      range.disabled = off; minus.disabled = off; plus.disabled = off;
      valEl.style.opacity = off ? ".3" : "1";
    };
    range.addEventListener("input", () => setK(parseInt(range.value) || 1));
    minus.addEventListener("click", () => { setK(selK - 10); });
    plus.addEventListener("click", () => { setK(selK + 10); });
    none.addEventListener("change", majSansKcal);
    majSansKcal();
    modal.querySelectorAll(".obj-f").forEach((b) => b.addEventListener("click", () => { selF = b.dataset.focus; modal.querySelectorAll(".obj-f").forEach((x) => x.style.cssText = chip(false)); b.style.cssText = chip(true); }));
    const fermer = () => modal.remove();
    window.fermerObjectifs = fermer; // pour le bouton retour du téléphone
    modal.querySelector("#obj-close").addEventListener("click", fermer);
    modal.addEventListener("click", (e) => { if (e.target === modal) fermer(); });
    modal.querySelector("#obj-save").addEventListener("click", () => {
      ecrire({ kcal: none.checked ? null : selK, focus: selF || null });
      fermer();
      if (typeof window._refreshObjectifBloc === "function") window._refreshObjectifBloc(); // maj du bloc accueil
      if (typeof afficherToast === "function") afficherToast(T("🎯 Objectif enregistré !", "🎯 Goal saved!"));
      // Propose directement des recettes qui collent à l'objectif (zone « De quoi t'as envie »).
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
    const parRepas = o.kcal ? Math.round(o.kcal / 3) : null;
    let stats = '<div class="obj-stats">';
    if (o.kcal) stats += '<span class="obj-stat"><b>' + o.kcal + "</b> kcal/" + T("jour", "day") + "</span>";
    if (parRepas) stats += '<span class="obj-stat">≈ <b>' + parRepas + "</b> kcal/" + T("repas", "meal") + "</span>";
    if (focus) stats += '<span class="obj-stat">' + focus.e + " " + T(focus.fr, focus.en) + "</span>";
    stats += "</div>";
    return head + stats +
      '<button type="button" class="obj-cta" onclick="proposerSelonObjectif()">' + T("🍽️ Voir des repas qui rentrent", "🍽️ See meals that fit") + "</button>";
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
