// =============================================================================
// 📦 MODULE : RECHERCHE
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

// =============================================================================
// 🔍 RECHERCHE INTELLIGENTE v239
// =============================================================================
// Capable de :
//   - Détecter une CATÉGORIE ("cocktail" → filtre cocktails)
//   - Détecter un PAYS ("italien" → filtre italie)
//   - Détecter un RÉGIME ("vegan" → filtre vegan)
//   - Chercher dans le NOM des recettes
//   - Chercher dans les INGRÉDIENTS ("poulet" → recettes au poulet)
//   - Auto-complétion (dropdown sous la barre)
//   - Tolérance aux fautes (fuzzy matching)
// =============================================================================

// Normalise un texte : minuscule, sans accent, sans emoji
function normalizeText(s) {
  if (!s) return "";
  return String(s).toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")  // accents
    .replace(/œ/g, "oe").replace(/æ/g, "ae")            // ligatures : œuf->oeuf, cœur->coeur
    .replace(/[^a-z0-9\s]/g, " ")                       // emojis/symboles
    .replace(/\s+/g, " ")
    .trim();
}

// === DICTIONNAIRES DE SYNONYMES ===
const SYNONYMES_CATEGORIE = {
  "cocktail": "cocktails", "cocktails": "cocktails", "alcool": "cocktails", "boisson alcoolisee": "cocktails", "drink": "cocktails",
  "mocktail": "mocktails", "mocktails": "mocktails", "sans alcool": "mocktails", "soft": "mocktails",
  "salade": "salades", "salades": "salades",
  "sauce": "sauces", "sauces": "sauces", "condiment": "sauces", "condiments": "sauces",
  "dessert": "desserts", "desserts": "desserts", "sucre": "desserts", "patisserie": "desserts", "patisseries": "desserts", "gateau": "desserts", "gateaux": "desserts",
  "soupe": "soupes", "soupes": "soupes", "veloute": "soupes", "veloutes": "soupes", "potage": "soupes",
  "entree": "entrees", "entrees": "entrees", "amuse-bouche": "entrees", "apero": "entrees", "tapas": "entrees",
  "healthy": "healthy", "sain": "healthy", "saine": "healthy", "leger": "healthy", "diet": "healthy",
  "brunch": "brunch", "petit dej": "brunch", "petit-dej": "brunch", "dejeuner": "brunch", "matin": "brunch", "breakfast": "brunch",
  "encas": "encas", "snack": "encas", "snacks": "encas", "casse-croute": "encas", "grignotage": "encas",
  "pizza": "pizzas", "pizzas": "pizzas",
  "boulangerie": "boulangerie", "pain": "boulangerie", "pains": "boulangerie", "viennoiserie": "boulangerie", "viennoiseries": "boulangerie", "brioche": "boulangerie",
  "plat": "plats", "plats": "plats", "principal": "plats", "main": "plats",
};

const SYNONYMES_PAYS = {
  "france": "france", "francais": "france", "francaise": "france", "francaises": "france", "francais": "france",
  "italie": "italie", "italien": "italie", "italienne": "italie", "italiens": "italie", "italiennes": "italie",
  "japon": "japon", "japonais": "japon", "japonaise": "japon", "asiatique": "japon",
  "thailande": "thailande", "thai": "thailande", "thailandais": "thailande", "thailandaise": "thailande",
  "mexique": "mexique", "mexicain": "mexique", "mexicaine": "mexique",
  "inde": "inde", "indien": "inde", "indienne": "inde",
  "liban": "liban", "libanais": "liban", "libanaise": "liban",
  "grece": "grece", "grec": "grece", "grecque": "grece",
  "chine": "chine", "chinois": "chine", "chinoise": "chine",
  "usa": "usa", "americain": "usa", "americaine": "usa", "etats-unis": "usa", "etatsunis": "usa",
  "espagne": "espagne", "espagnol": "espagne", "espagnole": "espagne",
  "maroc": "maroc", "marocain": "maroc", "marocaine": "maroc",
  "cuba": "cuba", "cubain": "cuba", "cubaine": "cuba",
  "vietnam": "vietnam", "vietnamien": "vietnam", "vietnamienne": "vietnam",
  "senegal": "senegal", "senegalais": "senegal", "senegalaise": "senegal",
  "pologne": "pologne", "polonais": "pologne", "polonaise": "pologne",
  "coree": "coree", "coreen": "coree", "coreenne": "coree",
  "hongrie": "hongrie", "hongrois": "hongrie", "hongroise": "hongrie",
  "tibet": "tibet", "tibetain": "tibet", "tibetaine": "tibet",
  "bresil": "bresil", "bresilien": "bresil", "bresilienne": "bresil",
  "indonesie": "indonesie", "indonesien": "indonesie", "indonesienne": "indonesie",
  "haiti": "haiti", "haitien": "haiti", "haitienne": "haiti",
};

// Régimes (clés correspondent à allergenes.js)
const SYNONYMES_REGIME = {
  "vegan": "vegan", "vegane": "vegan", "vegetalien": "vegan", "vegetalienne": "vegan",
  "vege": "vegetarien", "vegetarien": "vegetarien", "vegetarienne": "vegetarien",
  "sans gluten": "sans-gluten", "gluten free": "sans-gluten", "no gluten": "sans-gluten",
  "sans lactose": "sans-lactose", "lactose free": "sans-lactose", "no lactose": "sans-lactose",
  "pesco-vegetarien": "pesco-vegetarien", "pescovegetarien": "pesco-vegetarien", "pesco": "pesco-vegetarien",
};

const LABELS_CATEGORIE = {
  tartinables: "🍯 Pâtes à tartiner",
  glaces: "🍨 Glaces & Sorbets",
  cocktails: "🍸 Cocktails", mocktails: "🧃 Mocktails", salades: "🥗 Salades",
  desserts: "🍰 Desserts", soupes: "🍲 Soupes", entrees: "🫕 Entrées",
  healthy: "💚 Healthy", brunch: "🍳 Brunch", encas: "🥪 Encas",
  pizzas: "🍕 Pizzas", boulangerie: "🥖 Boulangerie", plats: "🍽️ Plats",
  aperitifs: "🥨 Apéritifs",
  sauces: "🥫 Sauces",
};
const LABELS_PAYS = {
  france: "🇫🇷 France", italie: "🇮🇹 Italie", japon: "🇯🇵 Japon",
  thailande: "🇹🇭 Thaïlande", mexique: "🇲🇽 Mexique", inde: "🇮🇳 Inde",
  liban: "🇱🇧 Liban", grece: "🇬🇷 Grèce", chine: "🇨🇳 Chine", usa: "🇺🇸 USA",
  espagne: "🇪🇸 Espagne", maroc: "🇲🇦 Maroc", cuba: "🇨🇺 Cuba",
  vietnam: "🇻🇳 Vietnam", senegal: "🇸🇳 Sénégal", pologne: "🇵🇱 Pologne",
  coree: "🇰🇷 Corée", hongrie: "🇭🇺 Hongrie", tibet: "🏔️ Tibet",
  bresil: "🇧🇷 Brésil", indonesie: "🇮🇩 Indonésie", haiti: "🇭🇹 Haïti",
  russie: "🇷🇺 Russie", allemagne: "🇩🇪 Allemagne", portugal: "🇵🇹 Portugal",
  angleterre: "🇬🇧 Angleterre", georgie: "🇬🇪 Géorgie", argentine: "🇦🇷 Argentine",
  nigeria: "🇳🇬 Nigeria", perou: "🇵🇪 Pérou", colombie: "🇨🇴 Colombie",
  singapour: "🇸🇬 Singapour", belgique: "🇧🇪 Belgique", polynesie: "🇵🇫 Polynésie",
  hawaii: "🌺 Hawaï", caraibes: "🏝️ Caraïbes", antilles: "🏝️ Antilles",
  asie: "🌏 Asie", monde: "🌍 Monde", international: "🌍 International",
};

// === GÉNÉRATION AUTOMATIQUE DES CARTES MANQUANTES ===
// Toute recette présente dans l'objet `recettes` mais sans carte dans #section-cartes
// se voit créer sa carte automatiquement. Plus besoin d'ajouter une carte à la main
// dans index.html : une nouvelle recette devient visible (grille + recherche) toute seule.
function genererCartesManquantes() {
  const section = document.getElementById("section-cartes");
  if (!section || typeof recettes === "undefined") return 0;

  const existantes = new Set();
  section.querySelectorAll(".carte").forEach(c => {
    const k = (typeof extraireCleRecetteCarte === "function") ? extraireCleRecetteCarte(c) : null;
    if (k) existantes.add(k);
  });

  const echap = (s) => String(s == null ? "" : s).replace(/"/g, "&quot;");
  let html = "", ajout = 0;
  Object.keys(recettes).forEach(key => {
    if (existantes.has(key)) return;
    const r = recettes[key];
    if (!r) return;
    const nom    = (typeof getNomRecette === "function") ? getNomRecette(key) : key;
    const emoji  = r.emoji || "🍽️";
    const img    = (typeof getImagePath === "function") ? getImagePath(key) : ("images/" + key + ".webp");
    const cat    = r.cat || "";
    const pays   = r.pays || "";
    const meta   = [r.temps ? ("⏱ " + r.temps) : "", r.niveau || ""].filter(Boolean).join(" • ");
    html += '<div class="carte" data-cat="' + echap(cat) + '" data-pays="' + echap(pays) + '" '
          + "onclick=\"ouvrirFiche('" + key + "', '')\">"
          + '<img loading="lazy" decoding="async" src="' + echap(img) + '" alt="' + echap(nom) + '" onerror="this.style.display=\'none\'">'
          + '<div class="carte-info"><h2>' + emoji + " " + echap(nom) + "</h2><p>" + echap(meta) + "</p></div></div>";
    ajout++;
  });
  if (html) {
    section.insertAdjacentHTML("beforeend", html);
    // Réappliquer les habillages dynamiques sur les nouvelles cartes (idempotents)
    try { if (typeof injecterDrapeauxCartes === "function") injecterDrapeauxCartes(); } catch (e) {}
    try { if (typeof appliquerNutriScoreCartes === "function") appliquerNutriScoreCartes(); } catch (e) {}
    try { if (typeof completerEmojisIngredients === "function") completerEmojisIngredients(); } catch (e) {}
  }
  if (ajout) console.log("🧩 Cartes générées automatiquement : " + ajout);
  return ajout;
}
// Génère les cartes manquantes dès que le DOM est prêt (avant toute recherche / navigation)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", genererCartesManquantes);
} else {
  genererCartesManquantes();
}

// === INDEXATION DES CARTES (faite une seule fois au chargement) ===
function construireIndexRecherche() {
  // Filet de sécurité : s'assurer que toutes les recettes ont leur carte avant d'indexer
  if (typeof genererCartesManquantes === "function") genererCartesManquantes();
  window._searchIndex = { cartes: [], parIngredient: {} };
  document.querySelectorAll(".carte").forEach(carte => {
    const cle = extraireCleRecetteCarte(carte);
    if (!cle) return;
    // v257.9 : Combiner emoji (span séparé) + h2 pour avoir le titre complet
    // Format 1 (ancien) : <h2>🫐 Nom</h2> → emoji déjà dans h2
    // Format 2 (nouveau) : <span class="carte-emoji">🍓</span><h2>Nom</h2>
    const emojiSpan = carte.querySelector(".carte-emoji");
    const h2 = carte.querySelector("h2");
    const emojiTxt = emojiSpan ? emojiSpan.textContent.trim() : "";
    const h2Txt = h2 ? h2.textContent.trim() : "";
    const nom = emojiTxt ? `${emojiTxt} ${h2Txt}` : h2Txt;
    const cat = carte.dataset.cat || "";
    const pays = carte.dataset.pays || "";
    
    // Extraire les ingrédients depuis le tableau de la recette
    const r = recettes?.[cle];
    let ingredients = [];
    if (r) {
      const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
      if (tabKey && r[tabKey][0]) {
        ingredients = Object.keys(r[tabKey][0]).filter(k => k !== "nb" && k !== "patons" && k !== "total" && k !== "label");
      }
    }
    // Noms lisibles des ingrédients (ex : code "brocoli" → "Brocoli") pour rendre la recherche par ingrédient automatique
    const ingredientsLabels = ingredients.map(code => {
      const lbl = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[code]) ? INGREDIENTS_LABELS[code] : code;
      return String(lbl).replace(/[^A-Za-zÀ-ÿ\s'’-]/g, "").trim(); // retire l'emoji/symboles
    }).filter(Boolean);
    const tousIngredients = ingredients.concat(ingredientsLabels);
    
    const entry = {
      element: carte,
      cle,
      nom,
      nomNorm: normalizeText(nom),
      cat,
      pays,
      ingredients,
      ingredientsNorm: tousIngredients.map(i => normalizeText(i)),
    };
    window._searchIndex.cartes.push(entry);
    
    // Index inversé : ingrédient → liste de clés
    tousIngredients.forEach(ing => {
      const k = normalizeText(ing);
      if (!window._searchIndex.parIngredient[k]) window._searchIndex.parIngredient[k] = [];
      window._searchIndex.parIngredient[k].push(entry);
    });
  });
  console.log("✅ Index recherche : " + window._searchIndex.cartes.length + " cartes, " + Object.keys(window._searchIndex.parIngredient).length + " ingrédients");
}

// === FUZZY MATCH : distance de Levenshtein (tolérance fautes) ===
function levenshtein(a, b) {
  if (!a || !b) return Math.max(a?.length || 0, b?.length || 0);
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) return 99; // optimisation : trop différent
  const dp = Array(n + 1).fill(0).map((_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]; dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      dp[j] = a[i-1] === b[j-1] ? prev : Math.min(prev, dp[j-1], dp[j]) + 1;
      prev = tmp;
    }
  }
  return dp[n];
}

// Match flou : retourne true si query est proche de target (≤2 erreurs)
// Plus strict : minimum 5 caractères pour éviter les faux positifs courts (cock/coco)
function fuzzyMatch(query, target) {
  if (!query || !target) return false;
  if (target.includes(query)) return true;
  if (query.length < 5) return false; // ÉVITER les matchs courts trop permissifs
  return levenshtein(query, target.substring(0, query.length + 2)) <= 2;
}

// === DÉTECTION D'INTENTION ===
// Retourne { type: "categorie"|"pays"|"regime"|null, value, label, fortMatch: bool }
function detecterIntention(qNorm) {
  // 1. Match exact catégorie
  if (SYNONYMES_CATEGORIE[qNorm]) {
    const cat = SYNONYMES_CATEGORIE[qNorm];
    return { type: "categorie", value: cat, label: LABELS_CATEGORIE[cat] || cat, fortMatch: true };
  }
  // 2. Match exact pays
  if (SYNONYMES_PAYS[qNorm]) {
    const pays = SYNONYMES_PAYS[qNorm];
    return { type: "pays", value: pays, label: LABELS_PAYS[pays] || pays, fortMatch: true };
  }
  // 3. Match exact régime
  if (SYNONYMES_REGIME[qNorm]) {
    const reg = SYNONYMES_REGIME[qNorm];
    return { type: "regime", value: reg, label: "🥦 " + reg, fortMatch: true };
  }
  // 4. Match préfixe catégorie (ex: "cock" → cocktails)
  for (const [syn, cat] of Object.entries(SYNONYMES_CATEGORIE)) {
    if (syn.startsWith(qNorm) && qNorm.length >= 3) {
      return { type: "categorie", value: cat, label: LABELS_CATEGORIE[cat] || cat, fortMatch: false };
    }
  }
  // 5. Match préfixe pays
  for (const [syn, pays] of Object.entries(SYNONYMES_PAYS)) {
    if (syn.startsWith(qNorm) && qNorm.length >= 3) {
      return { type: "pays", value: pays, label: LABELS_PAYS[pays] || pays, fortMatch: false };
    }
  }
  return null;
}

// === RÉCUPÉRER LES RECETTES D'UN RÉGIME (vegan, sans-gluten, etc.) ===
function getCartesPourRegime(regime) {
  if (typeof ALLERGENES_MOTS === "undefined" || !ALLERGENES_MOTS[regime]) return [];
  const motsExclus = ALLERGENES_MOTS[regime].map(m => normalizeText(m));
  return window._searchIndex.cartes.filter(entry => {
    // Une recette est OK si aucun de ses ingrédients ne contient un mot exclu
    const texteRecette = (entry.nomNorm + " " + entry.ingredientsNorm.join(" "));
    return !motsExclus.some(mot => mot && texteRecette.includes(mot));
  });
}

// === SCORING DES CARTES POUR UNE REQUÊTE LIBRE ===
function scorerCartes(qNorm) {
  if (!window._searchIndex) return [];
  const motsQuery = qNorm.split(/\s+/).filter(Boolean);
  
  return window._searchIndex.cartes.map(entry => {
    let score = 0;
    const motsNom = entry.nomNorm.split(/\s+/).filter(Boolean);
    
    // 1. Match exact du nom complet : énorme bonus
    if (entry.nomNorm === qNorm) score += 1000;
    // 2. Le nom contient toute la query : grand bonus
    else if (entry.nomNorm.includes(qNorm)) score += 200;
    
    // 3. Pour chaque mot de la query, on cherche dans le nom et les ingrédients
    motsQuery.forEach(mq => {
      // Match exact d'un mot du nom
      if (motsNom.includes(mq)) score += 100;
      // Match préfixe d'un mot du nom (au moins 3 chars pour éviter "co" = "coq", "coco", "cot"...)
      else if (mq.length >= 3 && motsNom.some(mn => mn.startsWith(mq))) score += 50;
      // Match dans les ingrédients (exact)
      else if (mq.length >= 3 && entry.ingredientsNorm.some(i => i === mq)) score += 40;
      // Match préfixe ingrédient (≥3 chars, cohérent avec le préfixe de nom)
      else if (mq.length >= 3 && entry.ingredientsNorm.some(i => i.startsWith(mq))) score += 25;
      // Fuzzy match SUR LE NOM uniquement (faute de frappe sur nom recette)
      else if (mq.length >= 5 && motsNom.some(mn => fuzzyMatch(mq, mn))) score += 30;
    });
    
    return { entry, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
}

// === AFFICHAGE DES SUGGESTIONS (dropdown) ===
function afficherSuggestions(query) {
  const dropdown = document.getElementById("search-suggestions");
  if (!dropdown) return;
  
  const qNorm = normalizeText(query);
  if (!qNorm || qNorm.length < 1) {
    dropdown.style.display = "none";
    return;
  }
  
  if (!window._searchIndex) construireIndexRecherche();
  
  const groupes = [];
  
  // 1. Catégories matchées
  const catsMatch = [];
  for (const [syn, cat] of Object.entries(SYNONYMES_CATEGORIE)) {
    if (syn.startsWith(qNorm) && !catsMatch.find(c => c.value === cat)) {
      catsMatch.push({ value: cat, label: LABELS_CATEGORIE[cat] || cat });
    }
  }
  if (catsMatch.length > 0) {
    groupes.push({
      label: "Catégorie",
      items: catsMatch.slice(0, 3).map(c => ({
        icon: "📂", text: c.label,
        action: `filtrerChipCategorieDepuisRecherche('${c.value}')`,
      })),
    });
  }
  
  // 2. Pays matchés
  const paysMatch = [];
  for (const [syn, pays] of Object.entries(SYNONYMES_PAYS)) {
    if (syn.startsWith(qNorm) && !paysMatch.find(p => p.value === pays)) {
      paysMatch.push({ value: pays, label: LABELS_PAYS[pays] || pays });
    }
  }
  if (paysMatch.length > 0) {
    groupes.push({
      label: "Pays",
      items: paysMatch.slice(0, 3).map(p => ({
        icon: "🌍", text: p.label,
        action: `filtrerChipPaysDepuisRecherche('${p.value}')`,
      })),
    });
  }
  
  // 3. Régimes
  const regimeMatch = [];
  for (const [syn, reg] of Object.entries(SYNONYMES_REGIME)) {
    if (syn.startsWith(qNorm) && !regimeMatch.find(r => r.value === reg)) {
      regimeMatch.push({ value: reg, label: reg });
    }
  }
  if (regimeMatch.length > 0) {
    groupes.push({
      label: "Régime",
      items: regimeMatch.slice(0, 2).map(r => ({
        icon: "🥦", text: r.label,
        action: `filtrerParRegime('${r.value}')`,
      })),
    });
  }
  
  // 4. Recettes (top 8 scoring) — avec indice de pertinence (catégorie ou ingrédient)
  const resultats = scorerCartes(qNorm).slice(0, 8);
  if (resultats.length > 0) {
    const motsQuery = qNorm.split(/\s+/).filter(Boolean);
    groupes.push({
      label: "Recettes",
      items: resultats.map(({ entry }) => {
        // La recette matche-t-elle par son NOM ?
        const motsNom = entry.nomNorm.split(/\s+/).filter(Boolean);
        const viaNom = entry.nomNorm.includes(qNorm) ||
          motsQuery.some(mq => mq.length >= 3 && motsNom.some(mn => mn.startsWith(mq)));
        let meta;
        if (viaNom) {
          // match par nom → drapeau (origine) + catégorie (repère)
          const flag = (LABELS_PAYS[entry.pays] || "").split(" ")[0];
          const catTxt = (LABELS_CATEGORIE[entry.cat] || "").replace(/^\S+\s/, "");
          meta = `${flag} ${catTxt}`.trim();
        } else {
          // match par ingrédient → on indique lequel ("contient …")
          const idx = entry.ingredientsNorm.findIndex(i =>
            motsQuery.some(mq => mq.length >= 3 && i.startsWith(mq)));
          const ingLabel = idx >= 0
            ? ((typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[entry.ingredients[idx]]) || entry.ingredients[idx])
            : query;
          meta = "🧂 " + ingLabel;
        }
        return {
          icon: "🍽️", text: entry.nom, meta,
          // Clic = ouvrir la fiche ET atterrir dans la catégorie (pour voir les recettes sœurs)
          action: `ouvrirRecetteEtCategorie('${entry.cle}', '${entry.cat}')`,
        };
      }),
    });
  }
  
  // Rendu
  if (groupes.length === 0) {
    dropdown.innerHTML = `<div class="suggestion-empty">Aucun résultat — essaye autre chose</div>`;
  } else {
    dropdown.innerHTML = groupes.map(g => `
      <div class="suggestion-group">
        <div class="suggestion-group-label">${g.label}</div>
        ${g.items.map(item => `
          <button type="button" class="suggestion-item" onclick="cacherSuggestions();${item.action}">
            <span class="suggestion-icon">${item.icon}</span>
            <span class="suggestion-text">${item.text}</span>
            ${item.meta ? `<span class="suggestion-meta">${item.meta}</span>` : ""}
          </button>
        `).join("")}
      </div>
    `).join("");
  }
  dropdown.style.display = "block";
}

function cacherSuggestions() {
  const dropdown = document.getElementById("search-suggestions");
  if (dropdown) dropdown.style.display = "none";
}

// === v260 : Valider la recherche (touche Entrée) ===
// Ferme le dropdown et laisse la GRILLE afficher toutes les recettes
// correspondantes (par nom OU ingrédient) — sans ouvrir une recette précise
// ni basculer dans une catégorie. Résout le cas "Entrée → 1er résultat".
function validerRecherche() {
  const input = document.getElementById("search-input");
  const q = input ? input.value.trim() : "";
  cacherSuggestions();
  if (!q) return;
  // Re-filtrer la grille sur TOUS les résultats (sécurité)
  const qNorm = normalizeText(q);
  const setMatch = new Set(scorerCartes(qNorm).map(r => r.entry.element));
  document.querySelectorAll(".carte").forEach(carte => {
    const etaitVisible = !window._etatAvantRecherche || window._etatAvantRecherche.get(carte) !== false;
    carte.style.display = (etaitVisible && setMatch.has(carte)) ? "" : "none";
  });
  if (input) input.blur(); // ferme le clavier mobile + enlève le focus
}

// === Toast de notification ===
function afficherToast(message) {
  const ancien = document.querySelector(".search-toast");
  if (ancien) ancien.remove();
  const t = document.createElement("div");
  t.className = "search-toast";
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// === Helpers pour les clics dans le dropdown ===
function filtrerChipCategorieDepuisRecherche(cat) {
  viderRechercheSilencieux();
  afficherRecettes(); // assure mode recettes
  const chip = document.querySelector(`.filtres-chips .chip[onclick*="filtrerChipCategorie('${cat}'"]`);
  if (chip) filtrerChipCategorie(cat, chip);
  afficherToast("📂 " + (LABELS_CATEGORIE[cat] || cat));
}

function filtrerChipPaysDepuisRecherche(pays) {
  viderRechercheSilencieux();
  afficherRecettes();
  const chip = document.querySelector(`.filtres-chips .chip[onclick*="filtrerChipPays('${pays}'"]`);
  if (chip) filtrerChipPays(pays, chip);
  afficherToast("🌍 " + (LABELS_PAYS[pays] || pays));
}

function filtrerParRegime(regime) {
  viderRechercheSilencieux();
  afficherRecettes();
  // Filtrer les cartes selon le régime
  const cartesOK = getCartesPourRegime(regime);
  const setOK = new Set(cartesOK.map(c => c.element));
  document.querySelectorAll(".carte").forEach(c => {
    c.style.display = setOK.has(c) ? "" : "none";
  });
  if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
  afficherToast("🥦 " + regime);
}

// v258.16 : clic sur une recette du dropdown → ouvre la fiche ET filtre la grille
// sur sa catégorie, pour qu'en refermant la fiche on voie les recettes sœurs.
function ouvrirRecetteEtCategorie(cle, cat) {
  viderRechercheSilencieux();
  if (typeof afficherRecettes === "function") afficherRecettes(); // mode grille + chips
  // Filtrer sur la catégorie de la recette cliquée
  if (cat) {
    const chip = document.querySelector(`.filtres-chips .chip[onclick*="filtrerChipCategorie('${cat}'"]`);
    if (chip && typeof filtrerChipCategorie === "function") filtrerChipCategorie(cat, chip);
  }
  // Ouvrir la fiche de la recette
  if (typeof ouvrirFiche === "function") ouvrirFiche(cle, null);
  // Positionner la grille sur la carte (visible quand on referme la fiche)
  setTimeout(() => {
    const carte = document.querySelector(`.carte[onclick*="ouvrirFiche('${cle}'"]`);
    if (carte) carte.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 150);
}

// Vide le champ de recherche sans déclencher la restauration d'état
function viderRechercheSilencieux() {
  const input = document.getElementById("search-input");
  if (input) input.value = "";
  const clear = document.getElementById("search-clear");
  if (clear) clear.style.display = "none";
  cacherSuggestions();
  window._etatAvantRecherche = null;
}

