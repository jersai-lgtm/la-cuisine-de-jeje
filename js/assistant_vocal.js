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

  let reco = null, ecoute = false;
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
    const crit = { pays: null, paysLabel: "", cat: null, catLabel: "", regime: null, avec: [], sans: [] };
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
    const stop = ["recette", "recettes", "plat", "midi", "soir", "moi", "place", "four", "frais", "maison", "recipe"];
    while ((m = reAvec.exec(qNorm))) {
      const ing = m[1];
      if (ing.length >= 3 && !stop.includes(ing)) crit.avec.push(formes(ing));
    }
    return crit;
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
    return set.filter(e => {
      if (crit.pays && e.pays !== crit.pays) return false;
      if (crit.cat && e.cat !== crit.cat) return false;
      if (!crit.avec.every(g => groupePresent(e, g))) return false;      // toutes les inclusions
      if (crit.sans.some(g => groupePresent(e, g))) return false;        // aucune exclusion
      return true;
    });
  }

  function criteresEnMots(crit) {
    // petite description pour le retour parlé (« italiennes sans miel »)
    const bouts = [];
    if (crit.cat) bouts.push(crit.catLabel.replace(/^[^\p{L}]+/u, "").trim());
    if (crit.pays) bouts.push(crit.paysLabel.replace(/^[^\p{L}]+/u, "").trim());
    if (crit.regime) bouts.push(crit.regime.replace("-", " "));
    crit.avec.forEach(g => bouts.push((EN() ? "with " : "avec ") + g[0]));
    crit.sans.forEach(g => bouts.push((EN() ? "without " : "sans ") + g[0]));
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
    const e = trouverRecette(reste);
    if (!e) { repondre(EN() ? `I couldn't find “${reste}”.` : `Je n'ai pas trouvé « ${reste} ».`, "error"); return; }
    repondre(EN() ? `Opening ${e.nom}.` : `J'ouvre ${nomLisible(e.cle)}.`, "success");
    if (typeof ouvrirFiche === "function") ouvrirFiche(e.cle, "");
    window._assistantCle = e.cle;
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
      ? "Try: open the crêpes recipe, suggest an Italian recipe without honey, start cooking mode, next, timer 10 minutes, pause, close."
      : "Essaie : ouvre la recette de crêpes, propose une recette italienne sans miel, lance le mode cuisson, suivant, minuteur 10 minutes, pause, ferme.");
  }

  // =========================================================================
  // ROUTEUR D'INTENTIONS
  // =========================================================================
  function executer(transcript) {
    const q = norm(transcript);
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

    // 5) Question quantité
    if (has("combien de", "combien d", "how much", "how many")) { if (repondreQuantite(q)) return; }

    // 6) Ouvrir une recette précise : « ouvre la recette de X », « ouvre X »
    let m = q.match(/\b(?:ouvre|ouvrir|montre|montre moi|affiche|open|show)\b(?:\s+(?:moi|me))?\s+(?:la\s+|the\s+)?(?:recette\s+(?:de\s+|du\s+|d\s+|des\s+)?|recipe\s+(?:for\s+)?)?(.+)/);
    if (m && m[1] && !has("propose", "suggere", "suggest", "idee")) {
      ouvrirRecetteParNom(m[1].trim());
      return;
    }

    // 7) Proposer / suggérer une recette filtrée
    if (has("propose", "suggere", "suggest", "idee", "envie", "je veux", "i want", "i d like", "trouve", "cherche", "find", "donne moi", "une recette", "a recipe", "des recettes")) {
      const crit = extraireCriteres(q);
      const cartes = cartesPourCriteres(crit);
      const desc = criteresEnMots(crit);
      if (!cartes.length) {
        repondre((EN() ? "No recipe found" : "Aucune recette trouvée") + (desc ? (EN() ? ` ${desc}.` : ` ${desc}.`) : "."), "error");
        return;
      }
      if (cartes.length === 1) {
        repondre((EN() ? "Found one: " : "J'en ai une : ") + cartes[0].nom + ".", "success");
        if (typeof ouvrirFiche === "function") ouvrirFiche(cartes[0].cle, "");
        window._assistantCle = cartes[0].cle;
        return;
      }
      montrerSelection(cartes);
      // suggestion mise en avant (variée selon la longueur du transcript pour éviter Math.random)
      const pick = cartes[(transcript.length + cartes.length) % cartes.length];
      repondre((EN() ? `${cartes.length} recipes` : `${cartes.length} recettes`) + (desc ? ` ${desc}` : "") +
        (EN() ? `. How about ${pick.nom}?` : `. Et pourquoi pas ${nomLisible(pick.cle)} ?`), "success");
      return;
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
    };
    try { reco.start(); } catch (e) { fin(); banniere("", false); }
  }
  window.demarrerAssistantVocal = demarrer;
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
