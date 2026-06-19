// =============================================================================
// 🎙️ ASSISTANT VOCAL — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Bouton micro « appuyer-pour-parler » (FAB). On appuie, on dicte un ordre en
// langage naturel, l'assistant comprend l'intention et agit :
//   • Ouvrir / fermer une recette      « ouvre la recette de crêpes »
//   • Proposer une recette filtrée      « propose-moi une recette italienne sans miel »
//   • Piloter le mode cuisson           « suivant », « minuteur 10 minutes », « pause »…
//   • Répondre à une question simple    « combien de farine ? »
// Bilingue (suit window.LANG). Retour visuel (bandeau) + vocal (TTS).
// Dégradé gracieux : sans reconnaissance vocale (ex. iOS/Safari), pas de bouton.
// S'appuie sur les fonctions existantes : _searchIndex, scorerCartes,
// filtrer*, ouvrirFiche, ouvrirModeCuisson, _cm*, afficherToast…
// =============================================================================

(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return; // pas de reconnaissance vocale → on n'injecte rien
  const TTS_OK = ("speechSynthesis" in window) && ("SpeechSynthesisUtterance" in window);

  let reco = null, ecoute = false, continu = false;
  const EN = () => (window.LANG === "en");

  // --- Correspondances anglaises (les dicos de app_recherche.js sont en FR) ---
  const EN_PAYS = {
    "french": "france", "france": "france", "italian": "italie", "italy": "italie",
    "japanese": "japon", "japan": "japon", "thai": "thailande", "thailand": "thailande",
    "mexican": "mexique", "mexico": "mexique", "indian": "inde", "india": "inde",
    "lebanese": "liban", "lebanon": "liban", "greek": "grece", "greece": "grece",
    "chinese": "chine", "china": "chine", "american": "usa", "usa": "usa",
    "spanish": "espagne", "spain": "espagne", "moroccan": "maroc", "morocco": "maroc",
    "cuban": "cuba", "cuba": "cuba", "vietnamese": "vietnam", "vietnam": "vietnam",
    "senegalese": "senegal", "polish": "pologne", "poland": "pologne", "korean": "coree", "korea": "coree",
    "hungarian": "hongrie", "tibetan": "tibet", "brazilian": "bresil", "brazil": "bresil",
    "indonesian": "indonesie", "haitian": "haiti", "russian": "russie", "german": "allemagne",
    "portuguese": "portugal", "english": "angleterre", "british": "angleterre",
    "argentinian": "argentine", "peruvian": "perou", "colombian": "colombie",
    "belgian": "belgique", "hawaiian": "hawaii", "caribbean": "caraibes", "asian": "asie",
  };
  const EN_CAT = {
    "dessert": "desserts", "desserts": "desserts", "cake": "desserts", "pastry": "desserts",
    "starter": "entrees", "starters": "entrees", "appetizer": "entrees", "appetizers": "entrees",
    "soup": "soupes", "soups": "soupes", "salad": "salades", "salads": "salades",
    "pizza": "pizzas", "pizzas": "pizzas", "cocktail": "cocktails", "cocktails": "cocktails",
    "drink": "cocktails", "mocktail": "mocktails", "mocktails": "mocktails",
    "main": "plats", "mains": "plats", "main course": "plats", "main dish": "plats", "dish": "plats",
    "snack": "encas", "snacks": "encas", "bread": "boulangerie", "bakery": "boulangerie",
    "sauce": "sauces", "sauces": "sauces", "healthy": "healthy", "brunch": "brunch",
    "breakfast": "brunch", "spread": "tartinables", "ice cream": "glaces", "sorbet": "glaces",
    "aperitif": "aperitifs",
  };
  const EN_REGIME = {
    "vegan": "vegan", "vegetarian": "vegetarien", "veggie": "vegetarien",
    "gluten free": "sans-gluten", "gluten-free": "sans-gluten", "no gluten": "sans-gluten",
    "lactose free": "sans-lactose", "dairy free": "sans-lactose", "dairy-free": "sans-lactose",
    "pescatarian": "pesco-vegetarien",
  };
  // Ingrédients EN → terme FR (les données sont en français) pour « with/without X »
  const EN_ING = {
    honey: "miel", chocolate: "chocolat", milk: "lait", egg: "oeuf", eggs: "oeuf",
    butter: "beurre", sugar: "sucre", cream: "creme", flour: "farine", cheese: "fromage",
    fish: "poisson", salmon: "saumon", chicken: "poulet", beef: "boeuf", pork: "porc",
    meat: "viande", shrimp: "crevette", garlic: "ail", onion: "oignon", tomato: "tomate",
    nuts: "noix", nut: "noix", peanut: "cacahuete", almond: "amande", coconut: "coco",
    lemon: "citron", mushroom: "champignon", spinach: "epinard", vanilla: "vanille",
    cinnamon: "cannelle", banana: "banane", apple: "pomme", strawberry: "fraise",
    coffee: "cafe", mustard: "moutarde", soy: "soja", basil: "basilic", mint: "menthe", ginger: "gingembre",
  };

  // --- Nombres en lettres → chiffres (FR + EN), pour minuteurs/étapes/portions ---
  const NB_UNITS = {
    deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10,
    onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16,
    two: 2, three: 3, four: 4, five: 5, six_: 6, seven: 7, eight: 8, nine: 9, ten: 10,
    eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
  };
  const NB_TENS = { vingt: 20, trente: 30, quarante: 40, cinquante: 50, soixante: 60, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60 };
  const NB_UNIT9 = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9 };
  function motsEnChiffres(s) {
    const toks = s.split(/\s+/);
    const out = [];
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i], nx = toks[i + 1];
      // « dix-sept/huit/neuf », « seventeen »… déjà dans NB_UNITS
      if (t === "dix" && nx && NB_UNIT9[nx] >= 7 && NB_UNIT9[nx] <= 9) { out.push(String(10 + NB_UNIT9[nx])); i++; continue; }
      if (NB_TENS[t] != null) {
        let v = NB_TENS[t];
        if (nx && NB_UNIT9[nx] >= 1 && NB_UNIT9[nx] <= 9) { v += NB_UNIT9[nx]; i++; }
        out.push(String(v)); continue;
      }
      if (NB_UNITS[t] != null) { out.push(String(NB_UNITS[t])); continue; }
      out.push(t);
    }
    return out.join(" ");
  }
  const norm = (s) => (typeof normalizeText === "function") ? normalizeText(s)
    : String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

  // --- Synthèse vocale (réponse parlée) ------------------------------------
  function parler(txt) {
    if (!TTS_OK || !txt) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = EN() ? "en-US" : "fr-FR"; u.rate = 1; u.pitch = 1;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  // Retour combiné : toast visuel + voix
  function repondre(txt, type) {
    if (typeof afficherToast === "function") afficherToast(txt, type);
    parler(txt);
  }

  // --- Recherche de recette par nom prononcé -------------------------------
  function trouverRecette(nomParle) {
    const q = norm(nomParle);
    if (!q) return null;
    if (typeof scorerCartes === "function") {
      const res = scorerCartes(q);
      if (res && res.length && res[0].score >= 40) return res[0].entry;
    }
    // repli : inclusion directe dans le nom
    const idx = window._searchIndex && window._searchIndex.cartes;
    if (idx) { const e = idx.find(c => c.nomNorm.includes(q)); if (e) return e; }
    return null;
  }

  function nomLisible(cle) {
    if (typeof getNomRecette === "function") { const n = getNomRecette(cle); if (n) return n; }
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    return (r && r.nom) || cle;
  }

  // === EXTRACTION DE CRITÈRES (pays / catégorie / régime / avec / sans) =====
  function extraireCriteres(qNorm) {
    const mots = qNorm.split(/\s+/).filter(Boolean);
    const crit = { pays: null, paysLabel: "", cat: null, catLabel: "", regime: null, avec: [], sans: [], tempsMax: null, eco: false, healthy: false, facile: false, saison: false };
    // Dicos fusionnés FR + EN (fonctionnent quelle que soit la langue)
    const PAYS = Object.assign({}, (typeof SYNONYMES_PAYS !== "undefined" ? SYNONYMES_PAYS : {}), EN_PAYS);
    const CAT = Object.assign({}, (typeof SYNONYMES_CATEGORIE !== "undefined" ? SYNONYMES_CATEGORIE : {}), EN_CAT);
    const REG = Object.assign({}, (typeof SYNONYMES_REGIME !== "undefined" ? SYNONYMES_REGIME : {}), EN_REGIME);

    // Tokens + bigrammes (pour « main course », « ice cream »…)
    const cles = mots.slice();
    for (let i = 0; i < mots.length - 1; i++) cles.push(mots[i] + " " + mots[i + 1]);
    for (const m of cles) {
      if (!crit.pays && PAYS[m]) {
        crit.pays = PAYS[m];
        crit.paysLabel = (typeof LABELS_PAYS !== "undefined" && LABELS_PAYS[crit.pays]) ? LABELS_PAYS[crit.pays] : crit.pays;
      }
      if (!crit.cat && CAT[m]) {
        crit.cat = CAT[m];
        crit.catLabel = (typeof LABELS_CATEGORIE !== "undefined" && LABELS_CATEGORIE[crit.cat]) ? LABELS_CATEGORIE[crit.cat] : crit.cat;
      }
    }
    // Régimes (souvent multi-mots : « sans gluten », « gluten free »…)
    for (const syn in REG) { if (qNorm.includes(syn)) { crit.regime = REG[syn]; break; } }

    // formes EN/FR d'un mot d'ingrédient : on teste les deux
    const formes = (w) => { const f = [w]; if (EN_ING[w] && EN_ING[w] !== w) f.push(EN_ING[w]); return f; };

    // « sans X » / « without X » → exclusion (hors gluten/lactose gérés par régime)
    const reSans = EN() ? /\bwithout ([a-zà-ÿ]+)/g : /\bsans ([a-zà-ÿ]+)/g;
    let m;
    while ((m = reSans.exec(qNorm))) {
      const ing = m[1];
      if (["gluten", "lactose"].includes(ing)) continue;
      if (ing.length >= 3) crit.sans.push(formes(ing));
    }
    // « avec X » / « au/à la/aux X » / « with X » → inclusion
    const reAvec = EN() ? /\bwith ([a-zà-ÿ]+)/g : /\b(?:avec|au|aux|a la|a l)\s+(?:du |de la |des |d |le |la |les )?([a-zà-ÿ]+)/g;
    const stop = ["recette", "recettes", "plat", "midi", "soir", "moi", "place", "four", "frais", "maison", "recipe",
      "favoris", "favorites", "favori", "menu", "menus", "accueil", "stats", "statistiques",
      "courses", "liste", "garde", "manger", "pantry", "frigo", "cuisine", "section"];
    while ((m = reAvec.exec(qNorm))) {
      const ing = m[1];
      if (ing.length >= 3 && !stop.includes(ing)) crit.avec.push(formes(ing));
    }
    // Critères « pratiques »
    if (/\b(rapide|vite|express|quick|fast)\b/.test(qNorm)) crit.tempsMax = Math.min(crit.tempsMax || 999, 30);
    const tm = qNorm.match(/(?:moins de|en|max|maxi|under|less than|in)\s*(\d+)\s*(?:min|minute)/);
    if (tm) crit.tempsMax = Math.min(crit.tempsMax || 999, parseInt(tm[1], 10));
    if (/\b(pas cher|pas chere|eco|economique|economiques|cheap|budget|abordable)\b/.test(qNorm)) crit.eco = true;
    if (/\b(sain|saine|leger|legere|light|equilibre|equilibree|healthy)\b/.test(qNorm)) crit.healthy = true;
    if (/\b(facile|faciles|simple|simples|easy|debutant)\b/.test(qNorm)) crit.facile = true;
    if (/\b(de saison|saison|seasonal|in season)\b/.test(qNorm)) crit.saison = true;
    return crit;
  }

  // --- Helpers données recette (pour les critères pratiques) ---------------
  function tempsMinutes(str) {
    if (!str) return 0;
    const t = String(str).toLowerCase();
    let tot = 0;
    const h = t.match(/(\d+)\s*h(?:eures?)?\s*(\d+)?/);
    if (h) tot += parseInt(h[1], 10) * 60 + (h[2] ? parseInt(h[2], 10) : 0);
    const mm = t.match(/(\d+)\s*min/);
    if (mm && !h) tot += parseInt(mm[1], 10);
    return tot;
  }
  function ligneBase(cle) {
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    if (!r) return null;
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey) return null;
    const base = r.base || (r[tabKey][0] && r[tabKey][0].nb) || 1;
    return { r, ligne: r[tabKey].find(l => l.nb === base) || r[tabKey][0], base };
  }
  function critPratiquesOK(e, crit) {
    const r = (typeof recettes !== "undefined") ? recettes[e.cle] : null;
    if (crit.tempsMax) { const mn = tempsMinutes(r && r.temps); if (!mn || mn > crit.tempsMax) return false; }
    if (crit.facile && !/facile/i.test((r && r.niveau) || "")) return false;
    if (crit.saison && typeof scoreSaisonRecette === "function" && !(scoreSaisonRecette(e.cle) > 0)) return false;
    if (crit.eco) {
      const b = ligneBase(e.cle);
      if (!b || typeof calculerPrixCaloriesRecette !== "function") return false;
      const res = calculerPrixCaloriesRecette(b.ligne);
      const parPers = res && res.prix ? res.prix / (b.ligne.nb || b.base || 1) : 999;
      if (parPers > 2.5) return false;
    }
    if (crit.healthy) {
      const b = ligneBase(e.cle);
      if (!b || typeof calculerNutriScoreRecette !== "function") return false;
      const ns = calculerNutriScoreRecette(b.ligne);
      if (!ns || (ns.lettre !== "A" && ns.lettre !== "B")) return false;
    }
    return true;
  }
  function aDesCritPratiques(crit) { return !!(crit.tempsMax || crit.eco || crit.healthy || crit.facile || crit.saison); }
  function aDesCriteres(crit) {
    return !!(crit.pays || crit.cat || crit.regime || crit.avec.length || crit.sans.length || aDesCritPratiques(crit));
  }

  // Un groupe de formes est « présent » si l'une des formes apparaît dans la recette
  function groupePresent(e, formes) {
    return formes.some(w => e.ingredientsNorm.some(i => i.includes(w)) || e.nomNorm.includes(w));
  }

  // Applique les critères sur l'index → liste d'entrées (cartes)
  function cartesPourCriteres(crit) {
    const idx = window._searchIndex && window._searchIndex.cartes;
    if (!idx) return [];
    let set = idx;
    if (crit.regime && typeof getCartesPourRegime === "function") {
      const ok = new Set(getCartesPourRegime(crit.regime).map(e => e.cle));
      set = set.filter(e => ok.has(e.cle));
    }
    // Filtres « bon marché » d'abord
    set = set.filter(e => {
      if (crit.pays && e.pays !== crit.pays) return false;
      if (crit.cat && e.cat !== crit.cat) return false;
      if (!crit.avec.every(g => groupePresent(e, g))) return false;      // toutes les inclusions
      if (crit.sans.some(g => groupePresent(e, g))) return false;        // aucune exclusion
      return true;
    });
    // Filtres « coûteux » (prix / nutri / temps / saison) seulement sur les survivants
    if (aDesCritPratiques(crit)) set = set.filter(e => critPratiquesOK(e, crit));
    return set;
  }

  function criteresEnMots(crit) {
    // petite description pour le retour parlé (« italiennes sans miel »)
    const bouts = [];
    if (crit.cat) bouts.push(crit.catLabel.replace(/^[^\p{L}]+/u, "").trim());
    if (crit.pays) bouts.push(crit.paysLabel.replace(/^[^\p{L}]+/u, "").trim());
    if (crit.regime) bouts.push(crit.regime.replace("-", " "));
    crit.avec.forEach(g => bouts.push((EN() ? "with " : "avec ") + g[0]));
    crit.sans.forEach(g => bouts.push((EN() ? "without " : "sans ") + g[0]));
    if (crit.tempsMax) bouts.push((EN() ? "< " : "moins de ") + crit.tempsMax + " min");
    if (crit.eco) bouts.push(EN() ? "cheap" : "pas cher");
    if (crit.healthy) bouts.push(EN() ? "healthy" : "équilibré");
    if (crit.facile) bouts.push(EN() ? "easy" : "facile");
    if (crit.saison) bouts.push(EN() ? "in season" : "de saison");
    return bouts.join(" · ");
  }

  // === AFFICHAGE D'UNE SÉLECTION DANS LA GRILLE ============================
  function montrerSelection(cartes) {
    if (typeof afficherRecettes === "function") afficherRecettes();
    const garder = new Set(cartes.map(e => e.element));
    const idx = window._searchIndex && window._searchIndex.cartes;
    if (idx) idx.forEach(e => { if (e.element) e.element.style.display = garder.has(e.element) ? "" : "none"; });
    const sec = document.getElementById("section-cartes");
    if (sec && sec.scrollIntoView) try { sec.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
  }

  // =========================================================================
  // INTENTIONS — MODE CUISSON (overlay ouvert)
  // =========================================================================
  function enModeCuisson() { return !!document.getElementById("cookmode-overlay"); }

  function lireEtapeCourante() {
    const corps = document.getElementById("cookmode-corps");
    const prog = document.getElementById("cookmode-progress-txt");
    if (!corps) return;
    const titre = (corps.querySelector(".cm-etape-titre") || {}).textContent || "";
    const detail = (corps.querySelector(".cm-etape-detail") || {}).textContent || "";
    parler(((prog ? prog.textContent + ". " : "") + titre + ". " + detail).trim());
  }

  function gererCuisson(q) {
    const has = (...a) => a.some(x => q.includes(x));
    // Aller à une étape précise : « va à l'étape 3 »
    const me = q.match(/(?:etape|step)\s*(\d+)/);
    if (me && !has("suivant", "precedent", "minuteur", "timer")) {
      if (typeof window._cmAllerEtape === "function") {
        const ok = window._cmAllerEtape(parseInt(me[1], 10));
        if (ok) { lireEtapeCourante(); return true; }
        repondre(EN() ? `There's no step ${me[1]}.` : `Il n'y a pas d'étape ${me[1]}.`); return true;
      }
    }
    // Temps restant des minuteurs
    if (has("temps restant", "reste t il", "reste-t-il", "combien de temps", "time left", "how much time", "how long left", "time remaining")) {
      const ts = (typeof window._cmTempsRestant === "function") ? window._cmTempsRestant() : [];
      if (!ts.length) { repondre(EN() ? "No timer running." : "Aucun minuteur en cours."); return true; }
      const dire = ts.map(t => {
        const mn = Math.floor(t.restant / 60), s = t.restant % 60;
        const d = (mn ? mn + (EN() ? " min " : " min ") : "") + (s ? s + " s" : "");
        return (t.label ? t.label + " : " : "") + d.trim();
      }).join(", ");
      parler((EN() ? "Time left: " : "Temps restant : ") + dire);
      return true;
    }
    // +N minutes au minuteur en cours
    const ma = q.match(/(?:ajoute|rajoute|add|encore|plus de)\s+(\d+)\s*(?:min|minute)/);
    if (ma) {
      const n = (typeof window._cmAjouterMinutes === "function") ? window._cmAjouterMinutes(parseInt(ma[1], 10)) : null;
      if (n) { repondre((EN() ? `Added ${n} minutes.` : `+${n} minutes ajoutées.`), "success"); return true; }
      repondre(EN() ? "No timer to extend." : "Aucun minuteur à prolonger."); return true;
    }
    // Lire les ingrédients
    if (has("lis les ingredient", "les ingredients", "read the ingredient", "read ingredient")) { lireIngredients(); return true; }
    // Substitution
    if (has("remplace", "remplacer", "substitut", "replace", "substitute", "par quoi remplacer")) { return remplacer(q); }
    // Fermer
    if (has("ferme", "quitte", "quitter", "arrete la cuisson", "stop cuisson", "exit", "close", "quit")) {
      repondre(EN() ? "Closing cook mode." : "Je ferme le mode cuisson.");
      if (typeof fermerModeCuisson === "function") fermerModeCuisson();
      return true;
    }
    // Minuteur (avec ou sans nombre)
    if (has("minuteur", "minuterie", "timer", "minute")) {
      const mm = q.match(/(\d+)/);
      if (mm && typeof window._cmAddTimerMinutes === "function") {
        const n = window._cmAddTimerMinutes(parseInt(mm[1], 10), "");
        if (n) { repondre(EN() ? `Timer set for ${n} minutes.` : `Minuteur de ${n} minutes lancé.`, "success"); return true; }
      }
      if (typeof window._cmAddStepTimer === "function") { window._cmAddStepTimer(); repondre(EN() ? "Timer started." : "Minuteur lancé.", "success"); return true; }
    }
    // Pause / reprise des minuteurs
    if (has("pause", "stop", "arrete", "arreter", "reprend", "reprends", "relance", "resume")) {
      if (typeof window._cmPauseToggleAll === "function") {
        const enPause = window._cmPauseToggleAll();
        if (enPause === null) { repondre(EN() ? "No timer running." : "Aucun minuteur en cours."); return true; }
        repondre(enPause ? (EN() ? "Timers paused." : "Minuteurs en pause.") : (EN() ? "Timers resumed." : "Minuteurs relancés."), "success");
        return true;
      }
    }
    // Répéter l'étape
    if (has("repete", "repeter", "redis", "repeat", "again", "encore")) { lireEtapeCourante(); return true; }
    // Quelle étape ?
    if (has("quelle etape", "ou j en suis", "ou en suis", "which step", "what step", "where am i")) {
      const prog = document.getElementById("cookmode-progress-txt");
      if (prog) parler(prog.textContent);
      return true;
    }
    // Précédent
    if (has("precedent", "precedente", "retour", "reviens", "avant", "previous", "back", "go back")) {
      if (typeof window._cmPrec === "function") window._cmPrec(); lireEtapeCourante(); return true;
    }
    // Suivant (large : « suivant », « continue », « next », « après »…)
    if (has("suivant", "suivante", "apres", "continue", "next", "ensuite", "go", "avance")) {
      if (typeof window._cmSuiv === "function") window._cmSuiv();
      // si l'overlay est encore là (pas la dernière étape) on relit
      setTimeout(() => { if (enModeCuisson()) lireEtapeCourante(); }, 120);
      return true;
    }
    return false;
  }

  // =========================================================================
  // INTENTIONS — GLOBALES
  // =========================================================================
  function ouvrirRecetteParNom(reste) {
    reste = String(reste || "").replace(/^(le |la |les |l |un |une |des |du |the |a |an )+/i, "").trim();
    const qn = norm(reste);
    const res = (typeof scorerCartes === "function") ? scorerCartes(qn) : [];
    const e = res.length && res[0].score >= 40 ? res[0].entry : trouverRecette(reste);
    if (!e) { repondre(EN() ? `I couldn't find “${reste}”.` : `Je n'ai pas trouvé « ${reste} ».`, "error"); window._avDernier = null; return; }
    if (typeof ouvrirFiche === "function") ouvrirFiche(e.cle, "");
    window._assistantCle = e.cle;
    // Désambiguïsation : plusieurs candidats proches → on permet « une autre »
    const proches = res.filter(x => x.score >= (res[0] ? res[0].score : 0) * 0.9).map(x => x.entry);
    if (proches.length > 1) {
      window._avDernier = { crit: null, cartes: proches, idx: 0 };
      repondre((EN() ? `Opening ${e.nom}. Say “another one” for a different match.` : `J'ouvre ${nomLisible(e.cle)}. Dis « une autre » pour une autre.`), "success");
    } else {
      window._avDernier = null;
      repondre(EN() ? `Opening ${e.nom}.` : `J'ouvre ${nomLisible(e.cle)}.`, "success");
    }
  }

  function ficheOuverte() {
    const m = document.getElementById("modal-calc");
    return !!(m && m.classList.contains("visible"));
  }

  function fermerCourant() {
    if (enModeCuisson()) { repondre(EN() ? "Closing cook mode." : "Je ferme le mode cuisson."); if (typeof fermerModeCuisson === "function") fermerModeCuisson(); return; }
    if (ficheOuverte()) {
      repondre(EN() ? "Closed." : "C'est fermé.");
      if (typeof fermerModal === "function") fermerModal();
      else try { history.back(); } catch (e) {}
      return;
    }
    repondre(EN() ? "Nothing to close." : "Rien à fermer.");
  }

  // « combien de X ? » → lit la quantité de l'ingrédient X dans la recette ouverte
  function repondreQuantite(q) {
    const cle = window._assistantCle;
    const r = cle && typeof recettes !== "undefined" ? recettes[cle] : null;
    if (!r) { repondre(EN() ? "Open a recipe first." : "Ouvre d'abord une recette."); return true; }
    // extraire le nom de l'ingrédient demandé
    let cible = q.replace(/.*\b(combien de|combien d|how much|how many)\b/, "").replace(/\?/g, "").trim();
    cible = cible.replace(/\b(faut il|il faut|y a t il|de|d|du|des|la|le|les|of)\b/g, " ").trim();
    if (!cible) return false;
    const cibleN = norm(cible);
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey) { repondre(EN() ? "No quantities for this recipe." : "Pas de quantités pour cette recette."); return true; }
    const base = r.base || (r[tabKey][0] && r[tabKey][0].nb) || 1;
    const ligne = r[tabKey].find(l => l.nb === base) || r[tabKey][0];
    // trouver la colonne dont le code OU le libellé correspond
    for (const col in ligne) {
      if (col === "nb") continue;
      const lbl = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[col]) ? INGREDIENTS_LABELS[col] : col;
      if (norm(col).includes(cibleN) || norm(lbl).includes(cibleN)) {
        const lblTxt = String(lbl).replace(/^[^\p{L}]+/u, "").trim();
        repondre((EN() ? `${ligne[col]} of ${lblTxt}` : `${ligne[col]} de ${lblTxt}`) + (EN() ? ` for ${base} servings.` : ` pour ${base}.`), "success");
        return true;
      }
    }
    repondre(EN() ? `“${cible}” isn't in this recipe.` : `« ${cible} » n'est pas dans cette recette.`);
    return true;
  }

  function aide() {
    repondre(EN()
      ? "Try: open the crêpes recipe, suggest a quick Italian recipe without honey, add eggs to my list, go to favorites, start cooking mode, next, timer 10 minutes, what's left, replace butter."
      : "Essaie : ouvre la recette de crêpes, propose une recette italienne rapide sans miel, ajoute des œufs à ma liste, va aux favoris, lance le mode cuisson, suivant, minuteur 10 minutes, temps restant, remplace le beurre.");
  }

  // --- Navigation entre sections -------------------------------------------
  function allerSection(section) {
    const btn = document.querySelector(`.nav-bottom .nav-btn[onclick*="'${section}'"]`);
    if (typeof afficherSection === "function") afficherSection(section, btn || null);
  }
  function naviguer(q) {
    const has = (...a) => a.some(x => q.includes(x));
    if (has("accueil", "page d accueil", "home", "menu principal", "accueille")) { repondre(EN() ? "Home." : "Accueil.", "success"); allerSection("accueil"); return true; }
    if (has("favoris", "favorites", "mes favoris", "favourites")) { repondre(EN() ? "Your favorites." : "Tes favoris.", "success"); if (typeof afficherFavorisAvecChips === "function") afficherFavorisAvecChips(); return true; }
    if (has("liste de courses", "mes courses", "shopping list", "ma liste")) { repondre(EN() ? "Shopping list." : "Ta liste de courses.", "success"); allerSection("cuisine"); if (typeof switchCuisineTab === "function") switchCuisineTab("courses"); return true; }
    if (has("vide frigo", "vide-frigo", "videfrigo", "fridge")) { repondre(EN() ? "Fridge clearer." : "Le vide-frigo.", "success"); allerSection("cuisine"); if (typeof switchCuisineTab === "function") switchCuisineTab("videfrigo"); return true; }
    if (has("garde manger", "garde-manger", "pantry")) { repondre(EN() ? "Pantry." : "Garde-manger.", "success"); allerSection("cuisine"); if (typeof switchCuisineTab === "function") switchCuisineTab("pantry"); return true; }
    if (has("menus", "planning", "planificateur", "planner", "mes menus")) { repondre(EN() ? "Your menus." : "Tes menus.", "success"); allerSection("planificateur"); return true; }
    if (has("statistiques", "mes stats", "stats", "statistics")) { repondre(EN() ? "Your stats." : "Tes stats.", "success"); allerSection("stats"); return true; }
    if (has("toutes les recettes", "page recettes", "les recettes", "all recipes", "recipe list", "catalogue") && !aDesCriteres(extraireCriteres(q))) {
      repondre(EN() ? "Recipes." : "Les recettes.", "success"); if (typeof afficherRecettes === "function") afficherRecettes(); return true;
    }
    return false;
  }

  // --- Courses / favoris / menu --------------------------------------------
  function ajouterCoursePerso(label) {
    if (!window.currentUser) { repondre(EN() ? "Log in to use your list." : "Connecte-toi pour utiliser ta liste."); return; }
    label = label.charAt(0).toUpperCase() + label.slice(1);
    if (!window.userProfile.listeCoursesPerso) window.userProfile.listeCoursesPerso = [];
    if (!window.userProfile.listeCoursesPerso.some(x => x.toLowerCase() === label.toLowerCase())) window.userProfile.listeCoursesPerso.push(label);
    if (typeof sauvegarderProfil === "function") sauvegarderProfil({ listeCoursesPerso: window.userProfile.listeCoursesPerso });
    try { window.dispatchEvent(new Event("profilMisAJour")); } catch (e) {}
    repondre((EN() ? "Added to your list: " : "Ajouté à ta liste : ") + label, "success");
  }
  function ajouterRecetteCourante() {
    const cle = window._assistantCle;
    if (!cle) { repondre(EN() ? "Open a recipe first." : "Ouvre d'abord une recette."); return; }
    if (typeof ajouterRecetteAuxCourses === "function") ajouterRecetteAuxCourses(cle);
    repondre((EN() ? "Added to your shopping list: " : "Ajouté à ta liste de courses : ") + nomLisible(cle), "success");
  }
  function actionsApp(q) {
    const has = (...a) => a.some(x => q.includes(x));
    // Générer un menu
    if (has("menu") && has("genere", "génère", "generer", "fais moi un menu", "fais un menu", "generate", "make a menu", "create a menu")) {
      repondre(EN() ? "Generating a menu." : "Je génère un menu.", "success");
      allerSection("planificateur");
      setTimeout(() => { if (typeof genererMenus === "function") genererMenus(); }, 200);
      return true;
    }
    // Favori
    if (has("favori", "favorite", "favoris", "aux favoris", "en favori", "bookmark") && has("ajoute", "ajouter", "mets", "met", "add", "save", "enregistre", "marque")) {
      const cle = window._assistantCle;
      if (!cle) { repondre(EN() ? "Open a recipe first." : "Ouvre d'abord une recette."); return true; }
      if (typeof toggleFavori === "function") toggleFavori(cle);
      const fav = (typeof estFavori === "function") ? estFavori(cle) : true;
      repondre(fav ? (EN() ? "Added to favorites." : "Ajouté aux favoris.") : (EN() ? "Removed from favorites." : "Retiré des favoris."), "success");
      return true;
    }
    // Retirer un article de la liste de courses
    if (has("retire", "retirer", "enleve", "enlève", "supprime", "remove", "delete")) {
      let item = q.replace(/.*\b(retire|retirer|enleve|enlève|supprime|remove|delete)\b/, "")
        .replace(/\b(de|from|of)\s+(ma|mon|the|my)\s+(liste|list)\b.*/, "")
        .replace(/\b(de|from) la liste\b.*/, "")
        .replace(/\baux?\s+courses\b.*/, "")
        .replace(/\b(my |the )?shopping list\b.*/, "")
        .replace(/\b(moi|me|du|de la|des|de l|un|une|le|la|les|d)\b/g, " ").replace(/\s+/g, " ").trim();
      if (item) {
        const liste = (window.userProfile && window.userProfile.listeCoursesPerso) || [];
        const cible = liste.find(x => x.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(x.toLowerCase()));
        if (cible && typeof lcSupprimerArticlePerso === "function") { lcSupprimerArticlePerso(cible); repondre((EN() ? "Removed: " : "Retiré : ") + cible, "success"); return true; }
        repondre(EN() ? `“${item}” isn't in your list.` : `« ${item} » n'est pas dans ta liste.`); return true;
      }
    }
    // Ajouter aux courses (recette ou article perso)
    if (has("ajoute", "ajouter", "add", "mets ", "met ")) {
      const versListe = has("a ma liste", "à ma liste", "dans ma liste", "aux courses", "a la liste", "à la liste", "shopping list", "to my list", "to the list");
      const recetteCible = has("cette recette", "la recette", "this recipe", "the recipe");
      if (recetteCible || (has("aux courses", "to my shopping") && !versListe)) { ajouterRecetteCourante(); return true; }
      if (versListe) {
        let item = q.replace(/.*\b(ajoute|ajouter|add|mets|met)\b/, "")
          .replace(/\b(a|à|dans|sur|to)\s+(ma|mon|mes|the|my)\s+(shopping\s+)?(liste|list)\b.*/, "")
          .replace(/\baux?\s+courses\b.*/, "")
          .replace(/\b(a|à) la liste\b.*/, "")
          .replace(/\b(my |the )?shopping list\b.*/, "")
          .replace(/\b(moi|me|du|de la|des|de l|un|une|le|la|les|some|d)\b/g, " ")
          .replace(/\s+/g, " ").trim();
        if (item) { ajouterCoursePerso(item); return true; }
        ajouterRecetteCourante(); return true;
      }
    }
    return false;
  }

  // --- Lecture des ingrédients / substitution ------------------------------
  function lireIngredients() {
    const cle = window._assistantCle;
    const b = cle ? ligneBase(cle) : null;
    if (!b) { repondre(EN() ? "Open a recipe first." : "Ouvre d'abord une recette."); return; }
    const parts = [];
    for (const col in b.ligne) {
      if (col === "nb") continue;
      const lbl = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[col]) ? INGREDIENTS_LABELS[col] : col;
      const t = String(lbl).replace(/^[^\p{L}]+/u, "").trim();
      if (b.ligne[col]) parts.push(b.ligne[col] + (EN() ? " of " : " de ") + t);
    }
    if (!parts.length) { repondre(EN() ? "No ingredient list." : "Pas de liste d'ingrédients."); return; }
    if (typeof afficherToast === "function") afficherToast(EN() ? "Reading ingredients aloud." : "Lecture des ingrédients.");
    parler((EN() ? `Ingredients for ${b.base} servings: ` : `Ingrédients pour ${b.base} : `) + parts.join(", "));
  }
  function remplacer(q) {
    let cible = q.replace(/.*\b(remplace[rz]?|substitut\w*|replace|substitute)\b/, "")
      .replace(/\b(le|la|les|du|de la|des|l|the|by|par|avec|with|d)\b/g, " ").replace(/\?/g, " ").trim();
    cible = (cible.split(/\s+/).filter(Boolean)[0] || "");
    if (!cible) { repondre(EN() ? "Replace what?" : "Remplacer quoi ?"); return true; }
    let slug = cible; if (EN() && EN_ING[cible]) slug = EN_ING[cible];
    const sub = (typeof window.substitutionDe === "function") ? window.substitutionDe(slug) : null;
    if (sub) repondre((EN() ? `Instead of ${cible}: ` : `À la place — ${cible} : `) + sub, "success");
    else repondre(EN() ? `No known substitute for ${cible}.` : `Pas de substitut connu pour ${cible}.`);
    return true;
  }

  // --- Suggestion (mutualisée) + suivi de contexte -------------------------
  function proposer(crit, transcript) {
    const cartes = cartesPourCriteres(crit);
    const desc = criteresEnMots(crit);
    if (!cartes.length) { repondre((EN() ? "No recipe found" : "Aucune recette trouvée") + (desc ? ` ${desc}.` : "."), "error"); window._avDernier = null; return true; }
    if (cartes.length === 1) {
      repondre((EN() ? "Found one: " : "J'en ai une : ") + cartes[0].nom + ".", "success");
      if (typeof ouvrirFiche === "function") ouvrirFiche(cartes[0].cle, "");
      window._assistantCle = cartes[0].cle; window._avDernier = null; return true;
    }
    montrerSelection(cartes);
    const idx = (String(transcript || "").length + cartes.length) % cartes.length;
    window._avDernier = { crit, cartes, idx };
    const pick = cartes[idx];
    repondre((EN() ? `${cartes.length} recipes` : `${cartes.length} recettes`) + (desc ? ` ${desc}` : "") +
      (EN() ? `. How about ${pick.nom}?` : `. Et pourquoi pas ${nomLisible(pick.cle)} ?`), "success");
    return true;
  }
  function fusionCrit(a, b) {
    return {
      pays: b.pays || a.pays, paysLabel: b.pays ? b.paysLabel : a.paysLabel,
      cat: b.cat || a.cat, catLabel: b.cat ? b.catLabel : a.catLabel,
      regime: b.regime || a.regime,
      avec: a.avec.concat(b.avec), sans: a.sans.concat(b.sans),
      tempsMax: b.tempsMax || a.tempsMax, eco: a.eco || b.eco, healthy: a.healthy || b.healthy, facile: a.facile || b.facile, saison: a.saison || b.saison,
    };
  }
  function suivi(q) {
    const d = window._avDernier;
    if (!d) return false;
    const has = (...a) => a.some(x => q.includes(x));
    // Affiner : « et sans miel », « plutôt mexicaine », « et rapide »
    if (/^(et |plutot |plutôt |and |rather |aussi )/.test(q + " ")) {
      return proposer(fusionCrit(d.crit, extraireCriteres(q)), q);
    }
    // Ouvrir la suggestion mise en avant (phrase « terminale », pas « ouvre la pizza »)
    if (/^(ouvre|ouvrir|open)( (la|le|les|ca|ça|it|that|the first|first one))?$/.test(q) ||
        /^(la premiere|celle la|celle ci|celle-ci|vas y|vas-y|c est parti|ok|oui|yes|go|that one|the first one)$/.test(q)) {
      const e = d.cartes[d.idx] || d.cartes[0];
      if (e) { repondre((EN() ? `Opening ${e.nom}.` : `J'ouvre ${nomLisible(e.cle)}.`), "success"); if (typeof ouvrirFiche === "function") ouvrirFiche(e.cle, ""); window._assistantCle = e.cle; }
      return true;
    }
    // Suggestion suivante
    if (has("suivante", "une autre", "autre chose", "autre recette", "next one", "another", "other one", "change", "autre idee")) {
      d.idx = (d.idx + 1) % d.cartes.length;
      const e = d.cartes[d.idx];
      repondre((EN() ? `How about ${e.nom}?` : `Et pourquoi pas ${nomLisible(e.cle)} ?`), "success");
      return true;
    }
    return false;
  }

  // =========================================================================
  // ROUTEUR D'INTENTIONS
  // =========================================================================
  function executer(transcript) {
    const q = motsEnChiffres(norm(transcript));
    if (!q) return;

    // 1) Mode cuisson : priorité aux commandes de pilotage
    if (enModeCuisson() && gererCuisson(q)) return;

    // index de recherche prêt (sécurité si l'assistant est sollicité très tôt)
    if ((!window._searchIndex || !window._searchIndex.cartes || !window._searchIndex.cartes.length) && typeof construireIndexRecherche === "function") {
      try { construireIndexRecherche(); } catch (e) {}
    }

    const has = (...a) => a.some(x => q.includes(x));

    // 2) Aide
    if (has("aide", "peux tu faire", "tu peux faire", "peux faire", "sais tu faire", "tu sais faire",
            "que peux", "que sais", "comment ca marche", "commandes", "help", "what can you do", "what can i say")) { aide(); return; }

    // 3) Lancer le mode cuisson sur la recette ouverte
    if (has("mode cuisson", "lance la cuisson", "commence la cuisson", "cuisinons", "on cuisine", "start cooking", "cooking mode", "let s cook")) {
      const cle = window._assistantCle;
      if (cle && typeof ouvrirModeCuisson === "function") { repondre(EN() ? "Starting cook mode." : "Je lance le mode cuisson.", "success"); ouvrirModeCuisson(cle); }
      else repondre(EN() ? "Open a recipe first." : "Ouvre d'abord une recette.");
      return;
    }

    // 4) Fermer / retour
    if (has("ferme", "fermer", "quitte", "quitter", "retour", "reviens", "annule", "close", "go back", "cancel")) {
      // « ferme la recette », « retour », « ferme »
      if (!/\bouvr|\bopen/.test(q)) { fermerCourant(); return; }
    }

    // 5a) Régler les portions : « pour 6 personnes »
    const mp = q.match(/\bpour (\d+)\s*(personne|personnes|people|serving|servings|convive|convives|gens|part|parts)\b/);
    if (mp && !has("propose", "suggere", "suggest", "idee", "envie", "je veux", "i want", "trouve", "cherche", "find", "une recette", "a recipe")) {
      const n = parseInt(mp[1], 10);
      const cle = window._assistantCle;
      if (cle && ficheOuverte() && typeof rerendreFiche === "function" && n > 0 && n <= 50) {
        rerendreFiche(cle, n);
        repondre((EN() ? `Set to ${n} servings.` : `Réglé pour ${n} personnes.`), "success");
        return;
      }
    }

    // 5) Question quantité
    if (has("combien de", "combien d", "how much", "how many")) { if (repondreQuantite(q)) return; }

    // 5b) Lire les ingrédients / substitution (hors cuisson aussi)
    if (has("lis les ingredient", "read the ingredient", "read ingredient")) { lireIngredients(); return; }
    if (has("remplace", "remplacer", "par quoi remplacer", "substitut", "replace", "substitute")) { remplacer(q); return; }

    // 5c) Actions : courses / favoris / générer un menu
    if (actionsApp(q)) return;

    // 5d) Suivi de contexte après une suggestion (« la suivante », « ouvre la », « et sans miel »)
    if (suivi(q)) return;

    // 5e) Navigation entre sections
    if (naviguer(q)) return;

    // 6) Ouvrir une recette précise : « ouvre la recette de X », « ouvre X »
    let m = q.match(/\b(?:ouvre|ouvrir|montre|montre moi|affiche|open|show)\b(?:\s+(?:moi|me))?\s+(?:la\s+|the\s+)?(?:recette\s+(?:de\s+|du\s+|d\s+|des\s+)?|recipe\s+(?:for\s+)?)?(.+)/);
    if (m && m[1] && !has("propose", "suggere", "suggest", "idee") &&
        !/^(les |des |mes |the |all )?(recettes|recipes)\b/.test(m[1].trim())) {
      ouvrirRecetteParNom(m[1].trim());
      return;
    }

    // 7) Proposer / suggérer une recette filtrée
    if (has("propose", "suggere", "suggest", "idee", "envie", "je veux", "i want", "i d like", "trouve", "cherche", "find", "donne moi", "une recette", "a recipe", "des recettes") || aDesCriteres(extraireCriteres(q))) {
      return void proposer(extraireCriteres(q), transcript);
    }

    // 8) Repli : nom de recette fort → on ouvre ; sinon recherche dans la grille
    let fort = null;
    if (typeof scorerCartes === "function") { const r = scorerCartes(q); if (r && r.length && r[0].score >= 120) fort = r[0].entry; }
    if (fort) {
      repondre((EN() ? `Opening ${fort.nom}.` : `J'ouvre ${nomLisible(fort.cle)}.`), "success");
      if (typeof ouvrirFiche === "function") ouvrirFiche(fort.cle, "");
      window._assistantCle = fort.cle;
      return;
    }
    // sinon : si des résultats SOLIDES (pas du bruit fuzzy), on filtre la grille
    if (typeof scorerCartes === "function") {
      const r = scorerCartes(q).filter(x => x.score >= 40);
      if (r.length && r[0].score >= 50) {
        montrerSelection(r.map(x => x.entry));
        repondre((EN() ? `${r.length} results for “${transcript}”.` : `${r.length} résultats pour « ${transcript} ».`), "success");
        return;
      }
    }
    repondre(EN() ? "Sorry, I didn't get that. Say “help”." : "Désolé, je n'ai pas compris. Dis « aide ».");
  }

  // =========================================================================
  // UI : bouton FAB + bandeau d'écoute
  // =========================================================================
  function injecterStyle() {
    if (document.getElementById("assistant-vocal-style")) return;
    const s = document.createElement("style");
    s.id = "assistant-vocal-style";
    s.textContent = `
      #assistant-mic{background:rgba(255,255,255,.1);border:none;color:#cfccd4;border-radius:50%;width:30px;height:30px;
        font-size:15px;flex-shrink:0;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;
        transition:background .15s,color .15s,box-shadow .15s}
      #assistant-mic:hover{background:var(--accent,#ff4d88);color:#fff}
      #assistant-mic:focus-visible{outline:2px solid var(--accent-soft,#ff8fb3);outline-offset:2px}
      [data-av-mic].av-ecoute{background:var(--accent,#ff4d88) !important;color:#fff !important;animation:avPulse 1s ease-in-out infinite}
      @keyframes avPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,77,136,.5)}50%{box-shadow:0 0 0 8px rgba(255,77,136,0)}}
      #assistant-banner{position:fixed;left:50%;transform:translateX(-50%);bottom:90px;z-index:100061;max-width:90vw;
        background:#14121a;color:#fff;border:1px solid rgba(255,107,161,.5);border-radius:16px;padding:14px 20px;
        font-family:system-ui,-apple-system,sans-serif;font-size:16px;text-align:center;box-shadow:0 8px 28px rgba(0,0,0,.4);
        display:none;min-width:200px}
      #assistant-banner .av-pastille{display:inline-block;width:10px;height:10px;border-radius:50%;background:#ff4d88;margin-right:8px;animation:avBlink 1s infinite}
      #assistant-banner .av-txt{color:#e7e4ee;min-height:1.2em}
      @keyframes avBlink{50%{opacity:.3}}
      @media(max-width:480px){#assistant-banner{bottom:84px}}
    `;
    document.head.appendChild(s);
  }

  function banniere(html, montrer) {
    const b = document.getElementById("assistant-banner");
    if (!b) return;
    if (montrer === false) { b.style.display = "none"; return; }
    b.innerHTML = html;
    b.style.display = "block";
  }

  function arreter() { try { if (reco) reco.stop(); } catch (e) {} }

  const micsAll = () => document.querySelectorAll("[data-av-mic]");
  function etatMics(actif) {
    micsAll().forEach(b => { b.classList.toggle("av-ecoute", actif); b.textContent = actif ? "🔴" : "🎙️"; });
  }

  function demarrer() {
    if (ecoute) { arreter(); return; }
    try { if (TTS_OK) speechSynthesis.cancel(); } catch (e) {} // coupe une réponse en cours
    reco = new SR();
    reco.lang = EN() ? "en-US" : "fr-FR";
    reco.interimResults = true;
    reco.maxAlternatives = 1;
    reco.continuous = false;
    let dernier = "";
    reco.onstart = () => {
      ecoute = true;
      etatMics(true);
      banniere(`<span class="av-pastille"></span><span class="av-txt">${EN() ? "Listening…" : "Je t'écoute…"}</span>`, true);
    };
    reco.onresult = (e) => {
      let txt = "";
      for (const r of e.results) txt += r[0].transcript;
      dernier = txt.trim();
      const b = document.getElementById("assistant-banner");
      if (b) { const t = b.querySelector(".av-txt"); if (t) t.textContent = dernier || (EN() ? "Listening…" : "Je t'écoute…"); }
    };
    const fin = () => {
      ecoute = false;
      etatMics(false);
    };
    reco.onerror = (ev) => {
      fin();
      if (ev && ev.error === "not-allowed") repondre(EN() ? "Microphone access denied." : "Accès au micro refusé.", "error");
      else banniere("", false);
    };
    reco.onend = () => {
      fin();
      if (dernier) {
        banniere(`<span class="av-txt">“${(typeof escapeHTML === "function" ? escapeHTML(dernier) : dernier)}”</span>`, true);
        setTimeout(() => banniere("", false), 1600);
        try { executer(dernier); } catch (e) { repondre(EN() ? "Something went wrong." : "Une erreur est survenue.", "error"); }
      } else {
        banniere("", false);
      }
      // Écoute continue (mode cuisson) : on relance après la réponse vocale
      if (continu && !enModeCuisson()) majBoutonContinu(continu = false);
      if (continu && enModeCuisson()) {
        const relance = () => {
          if (!continu || !enModeCuisson() || ecoute) return;
          if (TTS_OK && speechSynthesis.speaking) { setTimeout(relance, 300); return; }
          demarrer();
        };
        setTimeout(relance, 500);
      }
    };
    try { reco.start(); } catch (e) { fin(); banniere("", false); }
  }
  window.demarrerAssistantVocal = demarrer;

  // Écoute continue mains-libres (mode cuisson) : on/off
  function majBoutonContinu(on) {
    const b = document.getElementById("cookmode-continu");
    if (b) { b.classList.toggle("cm-voix-on", !!on); b.setAttribute("aria-label", on ? "Écoute mains-libres activée — couper" : "Écoute mains-libres — activer"); }
  }
  window.assistantContinu = function () {
    continu = !continu;
    majBoutonContinu(continu);
    if (typeof afficherToast === "function") afficherToast(continu ? (EN() ? "Hands-free listening on." : "Écoute mains-libres activée 👂") : (EN() ? "Hands-free off." : "Écoute mains-libres coupée."));
    if (continu && !ecoute) demarrer();
    else if (!continu) { try { if (reco) reco.stop(); } catch (e) {} }
    return continu;
  };
  // Exécute une commande sous forme de texte (debug / tests / accessibilité clavier).
  window.assistantVocalCommande = function (txt) { try { executer(String(txt || "")); } catch (e) {} };

  // Suit la recette actuellement ouverte (clic carte OU voix) pour « lance le
  // mode cuisson » / « combien de X » sans avoir à la nommer.
  function suivreFicheOuverte() {
    if (typeof window.ouvrirFiche !== "function" || window.ouvrirFiche._avWrap) return;
    const orig = window.ouvrirFiche;
    const wrap = function (cle) { try { window._assistantCle = cle; } catch (e) {} return orig.apply(this, arguments); };
    wrap._avWrap = true;
    window.ouvrirFiche = wrap;
  }

  function injecter() {
    if (document.getElementById("assistant-mic")) return;
    suivreFicheOuverte();
    injecterStyle();
    // Micro dans la barre de recherche (remplace l'ancien micro de recherche)
    const bar = document.querySelector(".search-bar");
    if (bar) {
      const btn = document.createElement("button");
      btn.id = "assistant-mic";
      btn.type = "button";
      btn.setAttribute("data-av-mic", "");
      btn.textContent = "🎙️";
      btn.title = EN() ? "Voice assistant — tap and speak" : "Assistant vocal — appuie et parle";
      btn.setAttribute("aria-label", btn.title);
      btn.addEventListener("click", demarrer);
      const clr = document.getElementById("search-clear");
      bar.insertBefore(btn, clr || document.getElementById("search-suggestions") || null);
    }
    if (!document.getElementById("assistant-banner")) {
      const banner = document.createElement("div");
      banner.id = "assistant-banner";
      banner.setAttribute("role", "status");
      banner.setAttribute("aria-live", "polite");
      document.body.appendChild(banner);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injecter);
  else injecter();
})();
