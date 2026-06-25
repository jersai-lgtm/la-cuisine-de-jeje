// =============================================================================
// 🎭 envie.js — « De quoi t'as envie ? » (humeur) + Quiz de goûts
// -----------------------------------------------------------------------------
// A) Rangée d'humeurs sur l'accueil → recettes qui collent à l'envie du moment.
// B) Petit quiz (3-4 questions) → recettes recommandées (+ régime sauvé si choisi).
// Réutilise les données de recettes existantes (cat, pays, temps, nutrition) et
// miniCarte() pour l'affichage. Respecte le profil (allergènes/régime). Bilingue,
// thème clair/sombre. Aucune nouvelle infra.
// =============================================================================

(function () {
  const EN = () => window.LANG === "en";
  const T = (fr, en) => (EN() ? en : fr);

  function tempsMin(t) {
    t = String(t || "");
    const h = (t.match(/(\d+)\s*h/) || [])[1], mn = (t.match(/(\d+)\s*min/) || [])[1];
    let n = 0; if (h) n += parseInt(h) * 60; if (mn) n += parseInt(mn);
    if (!n) { const x = t.match(/(\d+)/); if (x) n = parseInt(x[1]); }
    return n || 999;
  }
  function calPortion(r) {
    try {
      const tk = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
      if (!tk || typeof calculerPrixCaloriesRecette !== "function") return null;
      const base = r.base || 4;
      const ligne = r[tk].find((l) => l.nb === base || l.patons === base) || r[tk][0];
      const pc = ligne && calculerPrixCaloriesRecette(ligne);
      return pc && pc.cal != null ? pc.cal / base : null;
    } catch (e) { return null; }
  }
  // Mots exclus selon le profil (allergènes + régime), comme les suggestions.
  function motsExclus() {
    const set = new Set();
    const prefs = window.userProfile && window.userProfile.preferences;
    if (prefs && typeof ALLERGENES_MOTS !== "undefined") {
      [].concat(prefs.allergies || [], prefs.regimes || [], prefs.allergiesCustom || []).forEach((a) => {
        (ALLERGENES_MOTS[a] || [a]).forEach((m) => set.add(String(m).toLowerCase()));
      });
    }
    return set;
  }
  function compatible(cle, exclus) {
    if (!exclus.size) return true;
    const t = (typeof texteRecette === "function") ? texteRecette(cle) : (recettes[cle].nom || "").toLowerCase();
    return ![...exclus].some((m) => m && t.indexOf(m) > -1);
  }

  const EXCL_CAT = new Set(["sauces", "tartinables", "cocktails", "mocktails"]);

  // Collecte jusqu'à `max` recettes vérifiant `test(r, infos)`.
  function collecter(test, max) {
    max = max || 24;
    const exclus = motsExclus();
    const cles = Object.keys(recettes);
    for (let i = cles.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = cles[i]; cles[i] = cles[j]; cles[j] = t; }
    const out = [];
    for (const k of cles) {
      const r = recettes[k];
      if (!r || !r.nom || EXCL_CAT.has(r.cat)) continue;
      if (!compatible(k, exclus)) continue;
      let infos = { min: tempsMin(r.temps), cal: null };
      try { if (test(r, infos, k)) out.push(k); } catch (e) {}
      if (out.length >= max) break;
    }
    return out;
  }

  // ---- Affichage des résultats (réutilisé par A et B) ----
  function injecterStyle() {
    if (document.getElementById("envie-style")) return;
    const s = document.createElement("style");
    s.id = "envie-style";
    s.textContent = `
      .envie-bloc{background:rgba(var(--w),.05);border:1px solid rgba(var(--w),.1);border-radius:16px;padding:12px 14px;margin:0 0 16px}
      .envie-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}
      .envie-head b{color:var(--text);font-size:15px}
      .envie-actions{display:flex;gap:6px;flex-wrap:wrap}
      .envie-act{background:rgba(var(--accent-rgb),.15);color:var(--accent);border:1px solid rgba(var(--accent-rgb),.5);
        border-radius:999px;padding:5px 11px;font-size:12.5px;font-weight:700;cursor:pointer}
      .envie-chips{display:flex;flex-wrap:wrap;gap:7px}
      .envie-chip{background:rgba(var(--w),.08);color:var(--text);border:1px solid rgba(var(--w),.14);
        border-radius:999px;padding:7px 12px;font-size:13px;cursor:pointer;font-weight:600}
      .envie-chip:hover{background:rgba(var(--accent-rgb),.15)}
      #envie-modal{position:fixed;inset:0;z-index:9050;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center}
      #envie-modal .envie-sheet{background:var(--panel-solid,#1a1a2e);color:var(--text);border-top-left-radius:20px;border-top-right-radius:20px;
        width:100%;max-width:560px;max-height:86vh;display:flex;flex-direction:column;font-family:system-ui,sans-serif}
      #envie-modal .envie-sheet-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 8px}
      #envie-modal .envie-sheet-head h2{margin:0;font-size:18px}
      #envie-modal .envie-x{background:rgba(var(--w),.1);color:var(--text);border:none;border-radius:50%;width:34px;height:34px;font-size:15px;cursor:pointer}
      #envie-modal .envie-grid{overflow:auto;padding:6px 14px 20px;display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
      /* Cartes en grille (et non en rangée scroll) → image plus haute, pas une bande fine.
         VRAIE cause de l'effet « écrasé » : .mini-carte a overflow:hidden, ce qui fait
         collapser la track auto de la grille à la hauteur du seul texte (~40px) → l'image
         (128px) débordait et était COUPÉE. Le min-height sur la carte force la track à
         s'ouvrir ; on garde overflow:hidden pour les coins arrondis. */
      #envie-modal .envie-grid .mini-carte{flex:initial;width:auto;min-height:176px}
      #envie-modal .envie-grid .mini-carte img{height:128px;aspect-ratio:auto;object-fit:cover}
      #envie-modal .envie-q{padding:8px 18px 4px}
      #envie-modal .envie-q p{font-size:16px;font-weight:700;margin:10px 0 10px}
      #envie-modal .envie-opts{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 8px}
      #envie-modal .envie-opt{background:rgba(var(--w),.08);color:var(--text);border:1.5px solid rgba(var(--w),.18);
        border-radius:12px;padding:11px 14px;font-size:14px;font-weight:600;cursor:pointer;flex:1 1 40%}
      #envie-modal .envie-opt:hover{border-color:var(--accent)}
      @media(min-width:520px){#envie-modal .envie-grid{grid-template-columns:repeat(3,1fr)}}
    `;
    document.head.appendChild(s);
  }

  function fermerModal() { const m = document.getElementById("envie-modal"); if (m) m.remove(); }
  window.fermerEnvieModal = fermerModal; // pour le bouton retour du téléphone
  function ouvrirSheet(titreHTML, contenuHTML) {
    injecterStyle();
    const dejaOuvert = !!document.getElementById("envie-modal");
    fermerModal();
    const m = document.createElement("div");
    m.id = "envie-modal";
    m.innerHTML = '<div class="envie-sheet"><div class="envie-sheet-head"><h2>' + titreHTML + '</h2>' +
      '<button class="envie-x" aria-label="Fermer">✕</button></div>' + contenuHTML + "</div>";
    document.body.appendChild(m);
    m.addEventListener("click", (e) => { if (e.target === m) fermerModal(); });
    m.querySelector(".envie-x").addEventListener("click", fermerModal);
    // Bouton retour ferme la feuille (guard posé uniquement à la 1re ouverture,
    // pas aux re-rendus internes du quiz).
    if (!dejaOuvert && typeof window._backGuardPush === "function") window._backGuardPush();
    return m;
  }
  function montrerResultats(titre, cles) {
    if (!cles.length) {
      ouvrirSheet(titre, '<div class="envie-q"><p style="font-weight:400;color:var(--text-2)">' + T("Aucune recette trouvée pour ça. Réessaie !", "No recipe found for that. Try again!") + "</p></div>");
      return;
    }
    const grid = '<div class="envie-grid">' + cles.map((k) => (typeof miniCarte === "function") ? miniCarte(k) : "").join("") + "</div>";
    const m = ouvrirSheet(titre, grid);
    // Fermer la feuille quand on ouvre une fiche
    m.querySelectorAll('.envie-grid [onclick*="ouvrirFiche"]').forEach((c) => c.addEventListener("click", () => setTimeout(fermerModal, 50)));
  }

  // ---- A) Humeurs ----
  const MOODS = [
    { e: "🍲", fr: "Réconfortant", en: "Comforting", test: (r) => /gratin|mijot|raclette|fondue|tartiflette|hachis|blanquette|boeuf bourg|pot.?au.?feu|risotto|lasagne|curry|chili|mac.*cheese|crumble|soupe|veloute|cassoulet/i.test(r.nom) || r.cat === "soupes" },
    { e: "🥗", fr: "Léger", en: "Light", test: (r, i) => { if (r.cat === "salades") return true; if (i.cal == null) i.cal = calPortion(r); return i.cal != null && i.cal <= 450; } },
    { e: "😋", fr: "Gourmand", en: "Indulgent", test: (r, i) => { if (r.cat === "desserts" || r.cat === "glaces") return true; if (/fromage|gratin|burger|frite|chocolat|caramel|cr[eè]me|nutella|raclette/i.test(r.nom)) return true; if (i.cal == null) i.cal = calPortion(r); return i.cal != null && i.cal >= 650; } },
    { e: "🌶️", fr: "Épicé", en: "Spicy", test: (r) => ["inde", "thailande", "mexique", "indonesie", "coree", "maroc", "tunisie"].includes(r.pays) || /curry|piment|harissa|[ée]pic|vindaloo|massaman|chili|tandoori|sriracha|wasabi/i.test(r.nom) },
    { e: "⚡", fr: "Rapide", en: "Quick", test: (r, i) => i.min <= 25 },
    { e: "🌍", fr: "Exotique", en: "Exotic", test: (r) => r.pays && r.pays !== "france" },
  ];

  function injecterBloc() {
    const cta = document.querySelector(".swipe-cta");
    const sec = document.getElementById("section-accueil");
    if (!sec || document.getElementById("envie-bloc")) return;
    injecterStyle();
    const bloc = document.createElement("div");
    bloc.className = "envie-bloc"; bloc.id = "envie-bloc";
    bloc.innerHTML =
      '<div class="envie-head"><b>' + T("🎭 De quoi t'as envie ?", "🎭 What are you craving?") + "</b>" +
      '<span class="envie-actions"><button class="envie-quiz envie-act">🧩 ' + T("Quiz", "Quiz") + "</button>" +
      '<button class="envie-obj envie-act">🎯 ' + T("Objectif kcal", "Calorie goal") + "</button></span></div>" +
      '<div class="envie-chips">' + MOODS.map((m, i) => '<button class="envie-chip" data-i="' + i + '">' + m.e + " " + T(m.fr, m.en) + "</button>").join("") + "</div>";
    // Placé juste après le bouton swipe (zone "découverte" groupée), sinon en tête.
    if (cta && cta.parentNode) cta.parentNode.insertBefore(bloc, cta.nextSibling);
    else sec.insertBefore(bloc, sec.firstChild);
    bloc.querySelectorAll(".envie-chip").forEach((b) => b.addEventListener("click", () => {
      const m = MOODS[parseInt(b.dataset.i)];
      montrerResultats(m.e + " " + T(m.fr, m.en), collecter(m.test, 24));
    }));
    bloc.querySelector(".envie-quiz").addEventListener("click", () => window.ouvrirQuizGouts());
    bloc.querySelector(".envie-obj").addEventListener("click", () => { if (typeof ouvrirObjectifs === "function") ouvrirObjectifs(); });
  }

  // Propose des recettes-repas qui collent à l'objectif calorique (≈ 1/3 de la
  // journée par repas) + au focus. Appelé après réglage de l'objectif.
  window.proposerSelonObjectif = function () {
    let o = {};
    try { o = JSON.parse(localStorage.getItem("objectif_nutri") || "{}") || {}; } catch (e) {}
    if (!o.kcal && !o.focus) { if (typeof ouvrirObjectifs === "function") ouvrirObjectifs(); return; }
    const cible = o.kcal ? o.kcal / 3 : null;             // un repas ≈ 1/3 de l'objectif du jour
    const MEAL = new Set(["plats", "salades", "soupes", "pizzas", "healthy", "encas"]);
    const exclus = motsExclus();
    const cand = [];
    for (const k of Object.keys(recettes)) {
      const r = recettes[k];
      if (!r || !r.nom || !MEAL.has(r.cat)) continue;
      if (!compatible(k, exclus)) continue;
      const cal = calPortion(r);
      if (cal == null) continue;
      if (o.focus === "leger" && cal > 500) continue;
      if (cible != null) { if (cal < cible * 0.5 || cal > cible * 1.35) continue; }
      cand.push({ k, cal });
    }
    // tri par proximité à la cible (ou par calories croissantes si pas de cible)
    cand.sort((a, b) => cible != null ? Math.abs(a.cal - cible) - Math.abs(b.cal - cible) : a.cal - b.cal);
    const cles = cand.slice(0, 18).map((x) => x.k);
    const titre = o.kcal ? ("🎯 " + T("Pour ~", "For ~") + o.kcal + " kcal/jour") : ("🎯 " + T("Pour ton objectif", "For your goal"));
    montrerResultats(titre, cles);
  };

  // ---- B) Quiz de goûts ----
  const QUIZ = [
    { q: ["Là tout de suite, tu es plutôt…", "Right now, you're more…"], opts: [
      { t: ["🍽️ Salé", "🍽️ Savory"], v: { type: "sale" } }, { t: ["🍰 Sucré", "🍰 Sweet"], v: { type: "sucre" } }] },
    { q: ["Tu manges…", "You eat…"], opts: [
      { t: ["🍗 De tout", "🍗 Everything"], v: { regime: null } }, { t: ["🌱 Végétarien", "🌱 Vegetarian"], v: { regime: "végétarien" } }, { t: ["🌿 Vegan", "🌿 Vegan"], v: { regime: "vegan" } }] },
    { q: ["Tu aimes épicé ?", "Do you like spicy?"], opts: [
      { t: ["🌶️ J'adore", "🌶️ Love it"], v: { epice: true } }, { t: ["🙂 Bof", "🙂 Not really"], v: { epice: false } }] },
    { q: ["Tu as…", "You have…"], opts: [
      { t: ["⚡ Moins de 30 min", "⚡ Under 30 min"], v: { rapide: true } }, { t: ["🕰️ Le temps", "🕰️ Plenty of time"], v: { rapide: false } }] },
  ];

  window.ouvrirQuizGouts = function () {
    const rep = {};
    let etape = 0;
    function rendre() {
      if (etape >= QUIZ.length) { resultatQuiz(rep); return; }
      const q = QUIZ[etape];
      const html = '<div class="envie-q"><p>' + T(q.q[0], q.q[1]) + ' <span style="color:var(--text-3);font-size:13px;font-weight:400">(' + (etape + 1) + "/" + QUIZ.length + ")</span></p></div>" +
        '<div class="envie-opts">' + q.opts.map((o, i) => '<button class="envie-opt" data-i="' + i + '">' + T(o.t[0], o.t[1]) + "</button>").join("") + "</div>";
      const m = ouvrirSheet("🎯 " + T("Quiz de goûts", "Taste quiz"), html);
      m.querySelectorAll(".envie-opt").forEach((b) => b.addEventListener("click", () => {
        Object.assign(rep, q.opts[parseInt(b.dataset.i)].v);
        etape++; rendre();
      }));
    }
    rendre();
  };

  function resultatQuiz(rep) {
    // Sauve le régime dans le profil si choisi (best-effort).
    if (rep.regime && window.userProfile) {
      try {
        const prefs = window.userProfile.preferences = window.userProfile.preferences || {};
        prefs.regimes = Array.from(new Set([].concat(prefs.regimes || [], [rep.regime])));
        if (typeof sauvegarderProfil === "function") sauvegarderProfil();
      } catch (e) {}
    }
    const test = (r, i) => {
      if (rep.type === "sucre") { if (!["desserts", "glaces", "boulangerie"].includes(r.cat)) return false; }
      else { if (["desserts", "glaces", "cocktails", "mocktails"].includes(r.cat)) return false; }
      if (rep.rapide && i.min > 30) return false;
      const epi = ["inde", "thailande", "mexique", "indonesie", "coree", "maroc", "tunisie"].includes(r.pays) || /curry|piment|harissa|[ée]pic|vindaloo/i.test(r.nom);
      if (rep.epice === true && !epi && Math.random() < 0.6) return false;   // favorise épicé
      if (rep.epice === false && epi) return false;                          // évite épicé
      return true;
    };
    const cles = collecter(test, 18);
    montrerResultats("🎯 " + T("Pour toi", "For you"), cles);
  }

  function brancher() {
    if (typeof window.afficherAccueil === "function" && !window.afficherAccueil._envie) {
      const orig = window.afficherAccueil;
      window.afficherAccueil = function () { const r = orig.apply(this, arguments); try { injecterBloc(); } catch (e) {} return r; };
      window.afficherAccueil._envie = true;
    }
    try { injecterBloc(); } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(brancher, 0));
  else setTimeout(brancher, 0);
})();
