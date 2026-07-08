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
  // Nutrition par portion (calories + protéines) — pour l'objectif (profils muscu).
  function nutPortion(r) {
    try {
      const tk = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
      if (!tk || typeof calculerPrixCaloriesRecette !== "function") return null;
      const base = r.base || 4;
      const ligne = r[tk].find((l) => l.nb === base || l.patons === base) || r[tk][0];
      const pc = ligne && calculerPrixCaloriesRecette(ligne);
      if (!pc) return null;
      return { cal: pc.cal != null ? pc.cal / base : null, prot: pc.prot != null ? pc.prot / base : null };
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
      .envie-bloc--banniere{background:linear-gradient(95deg,#c94fd4,#7a6ff0);border:none}
      .envie-bloc--banniere .envie-head b{color:#fff}
      .envie-bloc--banniere .envie-act{background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.4)}
      .envie-bloc--banniere .envie-chip{background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.3)}
      .envie-bloc--banniere .envie-chip:hover{background:rgba(255,255,255,.28)}
      #envie-modal{position:fixed;inset:0;z-index:9050;background:rgba(0,0,0,.6);display:flex;align-items:flex-end;justify-content:center}
      #envie-modal .envie-sheet{background:var(--panel-solid,#1a1a2e);color:var(--text);border-top-left-radius:20px;border-top-right-radius:20px;
        width:100%;max-width:560px;max-height:86vh;display:flex;flex-direction:column;font-family:system-ui,sans-serif;overflow:hidden}
      #envie-modal #jr-root{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
      #envie-modal .envie-sheet-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 8px}
      #envie-modal .envie-sheet-head h2{margin:0;font-size:18px}
      #envie-modal .envie-x{background:rgba(var(--w),.1);color:var(--text);border:none;border-radius:50%;width:34px;height:34px;font-size:15px;cursor:pointer}
      #envie-modal .envie-grid{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;padding:6px 14px 20px;display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
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
      /* « Composer ma journée » : totaux + liste de repas du jour */
      #envie-modal .jr-totaux{background:rgba(var(--w),.06);border:1px solid rgba(var(--w),.12);border-radius:14px;padding:12px 14px;margin:0 14px 12px}
      #envie-modal .jr-tot-line{display:flex;justify-content:space-between;align-items:center;font-size:13.5px;color:var(--text)}
      #envie-modal .jr-tot-line b{font-size:15px}
      #envie-modal .jr-bar{height:7px;border-radius:99px;background:rgba(var(--w),.12);overflow:hidden;margin:4px 0 10px}
      #envie-modal .jr-bar i{display:block;height:100%;border-radius:99px}
      #envie-modal .jr-list{padding:0 14px 6px;display:flex;flex-direction:column;gap:9px}
      #envie-modal .jr-repas{display:flex;gap:11px;align-items:center;background:rgba(var(--w),.05);border:1px solid rgba(var(--w),.1);border-radius:14px;padding:9px;cursor:pointer}
      #envie-modal .jr-repas:hover{border-color:rgba(var(--accent-rgb),.45)}
      #envie-modal .jr-thumb{width:74px;height:74px;border-radius:11px;object-fit:cover;flex:none;background:rgba(var(--w),.1)}
      #envie-modal .jr-info{min-width:0;flex:1}
      #envie-modal .jr-moment{font-size:11.5px;color:var(--accent);font-weight:800;margin-bottom:1px}
      #envie-modal .jr-nom{font-size:14px;font-weight:700;color:var(--text);line-height:1.25;margin-bottom:3px}
      #envie-modal .jr-nut{font-size:12px;color:var(--text-2)}
      #envie-modal .jr-regen{margin:6px 14px 16px;width:calc(100% - 28px);background:rgba(var(--accent-rgb),.15);color:var(--accent);border:1px solid rgba(var(--accent-rgb),.5);border-radius:12px;padding:11px;font-size:13.5px;font-weight:700;cursor:pointer}
      #envie-modal .jr-actions{display:flex;flex-direction:column;gap:6px;flex:none}
      #envie-modal .jr-lock,#envie-modal .jr-reroll{width:34px;height:34px;border-radius:9px;border:1px solid rgba(var(--w),.16);background:rgba(var(--w),.07);color:var(--text);font-size:15px;cursor:pointer;line-height:1}
      #envie-modal .jr-lock:active,#envie-modal .jr-reroll:active{transform:scale(.92)}
      #envie-modal .jr-repas.locked{border-color:rgba(var(--accent-rgb),.55);background:rgba(var(--accent-rgb),.08)}
      #envie-modal .jr-eat{width:34px;height:34px;border-radius:9px;border:1px solid rgba(var(--w),.16);background:rgba(var(--w),.07);color:var(--text);font-size:15px;cursor:pointer;line-height:1}
      #envie-modal .jr-repas.eaten{opacity:.6}
      #envie-modal .jr-repas.eaten .jr-nom{text-decoration:line-through}
      #envie-modal .jr-repas.eaten .jr-eat{background:rgba(76,175,80,.2);border-color:rgba(76,175,80,.6)}
      #envie-modal .jr-reste{font-size:12.5px;color:var(--text-2);text-align:center;margin-top:8px}
      #envie-modal .jr-eau-ctrl{display:flex;align-items:center;gap:8px}
      #envie-modal .jr-eau-btn{width:26px;height:26px;border-radius:7px;border:1px solid rgba(var(--w),.2);background:rgba(var(--w),.08);color:var(--text);font-size:16px;font-weight:700;cursor:pointer;line-height:1}
      #envie-modal .jr-courses{margin:0 14px 16px;width:calc(100% - 28px);background:rgba(var(--w),.08);color:var(--text);border:1px solid rgba(var(--w),.16);border-radius:12px;padding:11px;font-size:13.5px;font-weight:700;cursor:pointer}
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
  function montrerResultats(titre, cles, raisonFn) {
    if (!cles.length) {
      ouvrirSheet(titre, '<div class="envie-q"><p style="font-weight:400;color:var(--text-2)">' + T("Aucune recette trouvée pour ça. Réessaie !", "No recipe found for that. Try again!") + "</p></div>");
      return;
    }
    const grid = '<div class="envie-grid">' + cles.map((k) => (typeof miniCarte === "function") ? miniCarte(k, raisonFn ? raisonFn(k) : null) : "").join("") + "</div>";
    ouvrirSheet(titre, grid);
    // On NE ferme PLUS la feuille à l'ouverture d'une fiche : la fiche (z-index
    // 9150) s'empile PAR-DESSUS la liste, et le retour la révèle intacte.
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
    bloc.className = "envie-bloc envie-bloc--banniere"; bloc.id = "envie-bloc";
    bloc.innerHTML =
      '<div class="envie-head"><b>' + T("🎭 De quoi t'as envie ?", "🎭 What are you craving?") + "</b>" +
      '<span class="envie-actions"><button class="envie-quiz envie-act">🧩 ' + T("Quiz", "Quiz") + "</button></span></div>" +
      '<div class="envie-chips">' + MOODS.map((m, i) => '<button class="envie-chip" data-i="' + i + '">' + m.e + " " + T(m.fr, m.en) + "</button>").join("") + "</div>";
    // Ordre voulu : swipe → 🎯 Objectif → 🎭 De quoi t'as envie. On se place après
    // le bloc Objectif s'il est déjà là, sinon juste après le bouton swipe (le bloc
    // Objectif viendra alors s'insérer entre les deux).
    const objBloc = document.getElementById("objectif-bloc");
    const ancre = objBloc || cta;
    if (ancre && ancre.parentNode) ancre.parentNode.insertBefore(bloc, ancre.nextSibling);
    else sec.insertBefore(bloc, sec.firstChild);
    bloc.querySelectorAll(".envie-chip").forEach((b) => b.addEventListener("click", () => {
      const m = MOODS[parseInt(b.dataset.i)];
      montrerResultats(m.e + " " + T(m.fr, m.en), collecter(m.test, 24));
    }));
    bloc.querySelector(".envie-quiz").addEventListener("click", () => window.ouvrirQuizGouts());
  }

  // Propose des recettes-repas qui collent à l'objectif calorique (≈ 1/3 de la
  // journée par repas) + au focus. Appelé après réglage de l'objectif.
  // Propose des recettes pour UN moment de la journée (matin/midi/collation/soir) :
  // chaque moment a sa part du budget kcal du jour (le matin et les collations comptent).
  // Sans momentKey : repli sur « midi » si objectif kcal, sinon focus seul.
  window.proposerSelonObjectif = function (momentKey) {
    let o = {};
    try { o = JSON.parse(localStorage.getItem("objectif_nutri") || "{}") || {}; } catch (e) {}
    if (!o.kcal && !o.focus) { if (typeof ouvrirObjectifs === "function") ouvrirObjectifs(); return; }
    const MOMENTS = window.OBJ_MOMENTS || [];
    const FOCUS = window.OBJ_FOCUS || {};
    const moment = MOMENTS.find((m) => m.k === momentKey) || (o.kcal ? MOMENTS.find((m) => m.k === "midi") : null);
    const f = o.focus && FOCUS[o.focus];
    const cats = moment ? new Set(moment.cats) : new Set(["plats", "salades", "soupes", "pizzas", "healthy", "encas"]);
    const calCible = (o.kcal && moment) ? Math.round(o.kcal * moment.pct) : (o.kcal ? Math.round(o.kcal / 3) : null);
    const protJour = window.OBJ_protJour ? window.OBJ_protJour(o) : null;
    const protCible = (protJour && moment) ? Math.round(protJour * moment.pct) : null;
    const exclus = motsExclus();
    const filtreNonRepas = moment && (moment.k === "midi" || moment.k === "soir") && typeof RECETTES_NON_REPAS !== "undefined";
    const cand = [];
    for (const k of Object.keys(recettes)) {
      const r = recettes[k];
      if (!r || !r.nom || !cats.has(r.cat)) continue;
      if (filtreNonRepas && RECETTES_NON_REPAS.has(k)) continue; // pas de non-repas en plat midi/soir
      if (!compatible(k, exclus)) continue;
      const nu = nutPortion(r);
      if (!nu || nu.cal == null) continue;
      if (calCible != null) {
        const bas = calCible * (f && f.cap ? 0.4 : 0.55);
        const haut = calCible * (f && f.surplus ? 1.7 : f && f.cap ? 1.15 : 1.4);
        if (nu.cal < bas || nu.cal > haut) continue;
      }
      // Profils protéinés (protéiné/sèche/prise de masse) : on écarte les plats vraiment pauvres en protéines.
      if (f && f.prot && protCible && nu.prot != null && nu.prot < protCible * 0.5) continue;
      cand.push({ k, cal: nu.cal, prot: nu.prot });
    }
    // Tri : profils protéinés → protéines décroissantes ; sinon proximité calorique.
    if (f && f.prot) cand.sort((a, b) => (b.prot || 0) - (a.prot || 0));
    else cand.sort((a, b) => calCible != null ? Math.abs(a.cal - calCible) - Math.abs(b.cal - calCible) : a.cal - b.cal);
    const cles = cand.slice(0, 18).map((x) => x.k);
    // Badge protéines sur chaque carte pour les profils muscu.
    const raisonFn = (f && f.prot) ? (k) => { const nu = nutPortion(recettes[k]); return (nu && nu.prot != null) ? '<span class="mini-carte-raison">💪 ' + Math.round(nu.prot) + " g</span>" : ""; } : null;
    let titre = moment ? (moment.e + " " + T(moment.fr, moment.en)) : ("🎯 " + T("Objectif", "Goal"));
    if (calCible) titre += " · ~" + calCible + " kcal";
    if (f && f.prot && protCible) titre += " · ~" + protCible + " g " + T("prot", "protein");
    montrerResultats(titre, cles, raisonFn);
  };

  // ---- « Composer ma journée » : un repas par moment qui atteint les cibles ----
  // Choisit, pour un moment, la meilleure recette (proche de la cible kcal, et bien
  // protéinée pour les profils muscu), avec un peu d'aléatoire pour varier.
  function choisirRepas(m, dayKcal, dayProt, focus, used, exclus) {
    const calCible = Math.round(dayKcal * m.pct);
    const protCible = dayProt ? Math.round(dayProt * m.pct) : null;
    const cats = new Set(m.cats);
    const cand = [];
    const filtreNonRepas = (m.k === "midi" || m.k === "soir") && typeof RECETTES_NON_REPAS !== "undefined";
    for (const k of Object.keys(recettes)) {
      if (used.has(k)) continue;
      const r = recettes[k];
      if (!r || !r.nom || !cats.has(r.cat)) continue;
      if (filtreNonRepas && RECETTES_NON_REPAS.has(k)) continue; // pas de non-repas (smoothie bowl…) en plat
      if (!compatible(k, exclus)) continue;
      const nu = nutPortion(r);
      if (!nu || nu.cal == null) continue;
      let score = Math.abs(nu.cal - calCible) / Math.max(1, calCible);          // écart calorique relatif
      if (focus && focus.prot && protCible && nu.prot != null) {
        score += Math.max(0, protCible - nu.prot) / Math.max(1, protCible) * 0.8; // pénalise le manque de protéines
      }
      cand.push({ k, cal: nu.cal, prot: nu.prot, score });
    }
    cand.sort((a, b) => a.score - b.score);
    const top = cand.slice(0, 6);
    return top.length ? top[Math.floor(Math.random() * top.length)] : null;
  }

  // État de la journée composée → permet de VERROUILLER un repas et de n'en
  // régénérer qu'une partie (on garde ce qu'on aime, on relance le reste).
  let _jrPlan = null, _jrO = null, _jrEau = 0;
  const VERRE = 0.25; // 1 verre = 25 cl
  function _jrUsed(m) {
    const s = new Set();
    (_jrPlan || []).forEach((it) => { if (it.p && it.m.k !== m.k) s.add(it.p.k); });
    const cur = (_jrPlan || []).find((x) => x.m.k === m.k);
    if (cur && cur.p) s.add(cur.p.k); // exclut le plat actuel → force un vrai changement
    return s;
  }
  function _jrPick(m) {
    const FOCUS = window.OBJ_FOCUS || {};
    const focus = _jrO.focus && FOCUS[_jrO.focus];
    const dayProt = window.OBJ_protJour ? window.OBJ_protJour(_jrO) : null;
    return choisirRepas(m, _jrO.kcal, dayProt, focus, _jrUsed(m), motsExclus());
  }
  // — Persistance : la journée (plats + repas mangés + eau) est mémorisée PAR JOUR —
  function _jrDate() { const d = new Date(); return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function _jrSave() {
    try {
      const plan = _jrPlan.map((it) => ({ mk: it.m.k, k: it.p ? it.p.k : null, lock: !!it.lock, eaten: !!it.eaten }));
      localStorage.setItem("obj_journee", JSON.stringify({ date: _jrDate(), plan: plan, eau: _jrEau || 0 }));
    } catch (e) {}
  }
  function _jrCharger() {
    try { const s = JSON.parse(localStorage.getItem("obj_journee") || "null"); if (s && s.date === _jrDate()) return s; } catch (e) {}
    return null;
  }
  function _jrItemDe(sv) {
    const m = (window.OBJ_MOMENTS || []).find((x) => x.k === sv.mk);
    if (!m) return null;
    let p = null;
    if (sv.k && recettes[sv.k]) { const nu = nutPortion(recettes[sv.k]); if (nu && nu.cal != null) p = { k: sv.k, cal: nu.cal, prot: nu.prot }; }
    return { m: m, p: p, lock: !!sv.lock, eaten: !!sv.eaten };
  }
  function _jrInner() {
    const o = _jrO;
    const dayProt = window.OBJ_protJour ? window.OBJ_protJour(o) : null;
    const eauCible = window.OBJ_eauJour ? window.OBJ_eauJour(o) : null;
    let eatK = 0, eatP = 0; // consommé (repas cochés "mangé")
    _jrPlan.forEach((it) => { if (it.p && it.eaten) { eatK += it.p.cal || 0; if (it.p.prot != null) eatP += it.p.prot; } });
    eatK = Math.round(eatK); eatP = Math.round(eatP);
    const couleur = (pct) => (pct >= 90 && pct <= 112) ? "#4caf50" : (pct >= 60) ? "#ffb300" : "#5aa0f5";
    const barre = (val, cible) => { if (!cible) return ""; const pct = Math.round((val / cible) * 100); return '<div class="jr-bar"><i style="width:' + Math.min(100, pct) + "%;background:" + couleur(pct) + '"></i></div>'; };
    let tot = '<div class="jr-totaux">';
    tot += '<div class="jr-tot-line"><span>🔥 ' + T("Mangé", "Eaten") + '</span><span><b>' + eatK + "</b> / " + o.kcal + " kcal</span></div>" + barre(eatK, o.kcal);
    if (dayProt) tot += '<div class="jr-tot-line"><span>💪 ' + T("Protéines", "Protein") + '</span><span><b>' + eatP + "</b> / " + dayProt + " g</span></div>" + barre(eatP, dayProt);
    if (eauCible) {
      const eauPct = Math.round((_jrEau / eauCible) * 100);
      tot += '<div class="jr-tot-line"><span>💧 ' + T("Eau", "Water") + '</span><span class="jr-eau-ctrl"><button type="button" class="jr-eau-btn jr-eau-minus">−</button><b>' + _jrEau.toFixed(2).replace(".", ",") + "</b> / " + eauCible.toFixed(1).replace(".", ",") + ' L<button type="button" class="jr-eau-btn jr-eau-plus">+</button></span></div>' +
        '<div class="jr-bar"><i style="width:' + Math.min(100, eauPct) + "%;background:#5aa0f5\"></i></div>";
    }
    const resteK = Math.max(0, o.kcal - eatK), resteP = dayProt ? Math.max(0, dayProt - eatP) : null;
    tot += '<div class="jr-reste">' + T("Reste : ~", "Left: ~") + resteK + " kcal" + (resteP != null ? " · " + resteP + " g " + T("prot", "protein") : "") + "</div>";
    tot += "</div>";
    const lignes = _jrPlan.filter((it) => it.p).map((it) => {
      const k = it.p.k, r = recettes[k];
      const img = (typeof getThumbPath === "function") ? getThumbPath(k) : ("images/" + (k[0] || "_").toLowerCase() + "/" + k + ".webp");
      const onerr = (typeof imgCarteOnerror === "function") ? imgCarteOnerror(k) : "";
      const dra = (typeof drapeau === "function") ? drapeau(r.pays, 13) : "";
      const nom = (typeof getNomRecette === "function") ? getNomRecette(k) : (r.nom || k);
      return '<div class="jr-repas' + (it.lock ? " locked" : "") + (it.eaten ? " eaten" : "") + '" data-mk="' + it.m.k + '">' +
        '<img class="jr-thumb" data-open="' + k + '" loading="lazy" decoding="async" src="' + img + '" alt="" onerror="' + onerr + '">' +
        '<div class="jr-info" data-open="' + k + '">' +
          '<div class="jr-moment">' + it.m.e + " " + T(it.m.fr, it.m.en) + "</div>" +
          '<div class="jr-nom">' + dra + (r.emoji || "🍽️") + " " + nom + "</div>" +
          '<div class="jr-nut">🔥 ' + Math.round(it.p.cal) + " kcal" + (it.p.prot != null ? " · 💪 " + Math.round(it.p.prot) + " g" : "") + (r.temps ? " · ⏱ " + r.temps : "") + "</div>" +
        "</div>" +
        '<div class="jr-actions">' +
          '<button type="button" class="jr-eat" title="' + (it.eaten ? T("Pas mangé", "Not eaten") : T("J\'ai mangé", "I ate this")) + '">' + (it.eaten ? "✅" : "⬜") + "</button>" +
          '<button type="button" class="jr-lock" title="' + (it.lock ? T("Déverrouiller", "Unlock") : T("Verrouiller", "Lock")) + '">' + (it.lock ? "🔒" : "🔓") + "</button>" +
          '<button type="button" class="jr-reroll" title="' + T("Changer ce repas", "Swap this meal") + '">🔄</button>' +
        "</div></div>";
    }).join("");
    return tot + '<div class="jr-list">' + lignes + "</div>" +
      '<button type="button" class="jr-courses">🛒 ' + T("Ajouter ma journée aux courses", "Add my day to the shopping list") + "</button>" +
      '<button type="button" class="jr-regen">🔄 ' + T("Régénérer (sauf 🔒 et ✅)", "Regenerate (except 🔒 and ✅)") + "</button>";
  }
  function _jrRefresh() { _jrSave(); const root = document.getElementById("jr-root"); if (root) { root.innerHTML = _jrInner(); _jrAttach(); } }
  function _jrAjouterCourses() {
    if (!window.userProfile) { if (typeof afficherToast === "function") afficherToast(T("🛒 Connecte-toi (gratuit) pour ta liste de courses", "🛒 Sign in (free) for your shopping list")); return; }
    window.userProfile.listeCourses = window.userProfile.listeCourses || [];
    const liste = window.userProfile.listeCourses;
    let n = 0;
    _jrPlan.forEach((it) => {
      if (!it.p || !recettes[it.p.k]) return;
      const nb = (typeof calculerPersonnesPourRecette === "function") ? calculerPersonnesPourRecette(it.p.k) : 1;
      const i = liste.findIndex((p) => p.cle === it.p.k);
      if (i >= 0) liste[i].personnes = nb; else { liste.push({ cle: it.p.k, personnes: nb }); n++; }
    });
    if (typeof lcSauvegarder === "function") lcSauvegarder();
    if (typeof lcGenererListe === "function") lcGenererListe();
    if (typeof lcAfficherPanier === "function") lcAfficherPanier();
    if (typeof afficherToast === "function") afficherToast("🛒 " + (n ? T("Journée ajoutée aux courses", "Day added to shopping list") : T("Déjà dans ta liste", "Already in your list")));
  }
  function _jrAttach() {
    const root = document.getElementById("jr-root");
    if (!root) return;
    const itDe = (b) => _jrPlan.find((x) => x.m.k === b.closest(".jr-repas").dataset.mk);
    root.querySelectorAll("[data-open]").forEach((el) => el.addEventListener("click", () => { const k = el.dataset.open; if (k && typeof ouvrirFiche === "function") { ouvrirFiche(k, ""); } }));
    root.querySelectorAll(".jr-eat").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); const it = itDe(b); if (it) { it.eaten = !it.eaten; _jrRefresh(); } }));
    root.querySelectorAll(".jr-lock").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); const it = itDe(b); if (it) { it.lock = !it.lock; _jrRefresh(); } }));
    root.querySelectorAll(".jr-reroll").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); const it = itDe(b); if (it) { it.p = _jrPick(it.m) || it.p; it.eaten = false; _jrRefresh(); } }));
    const minus = root.querySelector(".jr-eau-minus"); if (minus) minus.addEventListener("click", () => { _jrEau = Math.max(0, Math.round((_jrEau - VERRE) * 100) / 100); _jrRefresh(); });
    const plus = root.querySelector(".jr-eau-plus"); if (plus) plus.addEventListener("click", () => { _jrEau = Math.round((_jrEau + VERRE) * 100) / 100; _jrRefresh(); });
    const courses = root.querySelector(".jr-courses"); if (courses) courses.addEventListener("click", _jrAjouterCourses);
    const regen = root.querySelector(".jr-regen");
    if (regen) regen.addEventListener("click", () => { _jrPlan.forEach((it) => { if (!it.lock && !it.eaten) { it.p = _jrPick(it.m) || it.p; } }); _jrRefresh(); });
  }
  window.composerJournee = function () {
    let o = {};
    try { o = JSON.parse(localStorage.getItem("objectif_nutri") || "{}") || {}; } catch (e) {}
    if (!o.kcal) { if (typeof ouvrirObjectifs === "function") ouvrirObjectifs(); return; }
    _jrO = o;
    const saved = _jrCharger();
    if (saved && Array.isArray(saved.plan) && saved.plan.length) {
      // Reprendre la journée du jour (plats + repas cochés + eau)
      _jrPlan = saved.plan.map(_jrItemDe).filter(Boolean);
      _jrEau = saved.eau || 0;
      // Compléter un éventuel repas vide
      _jrPlan.forEach((it) => { if (!it.p) it.p = _jrPick(it.m); });
    } else {
      // Nouvelle journée
      _jrPlan = (window.OBJ_MOMENTS || []).map((m) => ({ m: m, p: null, lock: false, eaten: false }));
      _jrPlan.forEach((it) => { it.p = _jrPick(it.m); });
      _jrEau = 0;
      _jrSave();
    }
    const d = new Date();
    const titre = "🍽️ " + T("Ta journée", "Your day") + " — " + d.getDate() + "/" + (d.getMonth() + 1);
    ouvrirSheet(titre, '<div id="jr-root">' + _jrInner() + "</div>");
    _jrAttach();
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
