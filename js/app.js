

// ==============================
// RECETTES NON-REPAS (boulangerie, desserts, cocktails, mocktails, brunch)
// Liste fiable issue des data-cat de index.html — NE dépend PAS du DOM.
// Utilisée pour exclure ces recettes de la génération de menus.
// ==============================
const RECETTES_NON_REPAS = new Set([
  "amarettoSour","aperolPamplemousse","aperolspritzrosa","baklava","bananabread","bellini",
  "blueLagoon","bowlacai","canelebordelais","cheesecake","cherryblossommocktail","chocolatChaud",
  "churros","citronadementhe","clafoutis","coktailcosmopolitan","cookies","cosmopolitan",
  "cremebrulee","crepes","crepesSucrées","croissant","crumblefruits","daiquiri",
  "darkStormyCocktail","dosakerdosai","eclair","eggsBenedict","espressoMartini","financiers",
  "flan","fondantchocolat","frenchMartini","galettetacos","gateaubasque","gaufres",
  "gingerlemondrop","gintoniqmaison","goumeau","granolaMaison","hugospritz","ileflottante",
  "jusPastequeMenuthe","limonademaison","madeleine","margarita","millefeuille","mimosa",
  "mocktailberrybliss","mocktailcoconananas","mocktailcoconorchidee","mocktailconcombrecitr","mocktailfraisesvanille","mocktailframboisementhe",
  "mocktailgingembre","mocktailmentheagume","mocktailpassionsoleil","moelleuxchocolat","mojito","mojitorose",
  "moscowmule","mousseauchocolat","muffins","negroni","oldFashioned","overnightoats",
  "painauchocolat","painbaguette","painburger","paindemie","pancakes","pancakesproteine",
  "pannaCotta","parisbrestreinterpretation","patebrisee","patefeuilletee","patesablee","pavlova",
  "pinacolada","pizza","pornstarmartini","profiteroles","punchfruitsrouges","sangria",
  "sconeBritish","shakshuka","shakshukaverte","shrubframboisebasilic","sidecarvintage","smoothiemangopassion",
  "smoothievert","spritz","tarteFragoles","tarteNormande","tarteaupommes","tartechocolatcaramel",
  "tartecitron","tartepistache","tartetatinpommes","tequilasunrise","tiramisu","tiramisufraise",
  "verrineframboisechocolat","verrinetiramisu","virginmojito","virginpinacolada","whiskysour",
  // bases supplémentaires
  "patepizza","patelasagne","lasagne","yaourt","smoothiebowl","energyballs","naan","painlevain","brioche",
  // 50 nouvelles recettes — non-repas (desserts/boulangerie/brunch/encas)
  "huevosrancheros","chilaquilesrojos","kayatoast","samossasagneau","empanadasargentines",
  "baoporccarmelise","pasteldenata","basquecheesecake","mochiglace","knafehlibanais",
  "alfajores","focacciaolives","khachapuri","painpita",
  // Lot 1 — desserts français
  "cremecaramel","farbreton","galettedesrois"
]);

// Desserts (pour le pool desserts du menu complet — liste fiable, ne dépend pas du DOM)
const RECETTES_DESSERTS = [
  "baklava","canelebordelais","cheesecake","churros","clafoutis","cookies",
  "cremebrulee","crumblefruits","eclair","flan","fondantchocolat","gateaubasque",
  "ileflottante","madeleine","millefeuille","moelleuxchocolat","mousseauchocolat",
  "pannaCotta","parisbrestreinterpretation","pavlova","profiteroles","tarteFragoles","tarteNormande",
  "tarteaupommes","tartechocolatcaramel","tartecitron","tartepistache","tartetatinpommes","tiramisu",
  "tiramisufraise","verrineframboisechocolat","verrinetiramisu",
  // Lot 1
  "cremecaramel","farbreton","galettedesrois"
];

// Catégorie d'une recette, lue depuis la DONNÉE (recettes.js), pas le DOM.
// Fiable même si les cartes ne sont pas (encore) rendues.
function categorieRecette(key) {
  return (typeof recettes !== "undefined" && recettes[key]) ? (recettes[key].cat || "") : "";
}

// ==============================
// HELPER : texte complet d'une recette (pour filtres allergènes/régimes)
// Lit clé + nom affiché + description + TOUTES les lignes des tableaux
// (clés de colonnes ET valeurs), pour ne jamais rater un ingrédient.
// ==============================
function texteRecette(key) {
  const r = (typeof recettes !== "undefined") ? recettes[key] : null;
  if (!r) return key.toLowerCase();
  const nom = (typeof getNomRecette === "function") ? getNomRecette(key) : "";
  let texte = [key, nom, r.description || ""].join(" ").toLowerCase();
  Object.keys(r).forEach(k => {
    if (k.startsWith("tableau") && Array.isArray(r[k])) {
      r[k].forEach(ligne => {
        if (ligne && typeof ligne === "object") {
          texte += " " + Object.keys(ligne).join(" ").toLowerCase();
          texte += " " + Object.values(ligne).join(" ").toLowerCase();
        }
      });
    }
  });
  // Format alternatif : ingredientsFixes = [[nom, qté], ...]
  if (Array.isArray(r.ingredientsFixes)) {
    r.ingredientsFixes.forEach(p => {
      if (Array.isArray(p)) texte += " " + p.join(" ").toLowerCase();
    });
  }
  // Format alternatif : ingredients = {nom: qté, ...} ou liste
  if (r.ingredients && typeof r.ingredients === "object") {
    texte += " " + Object.keys(r.ingredients).join(" ").toLowerCase();
    texte += " " + Object.values(r.ingredients).join(" ").toLowerCase();
  }
  // Neutraliser les faux allergènes : la noix/lait/crème DE COCO n'est ni un
  // fruit à coque ni un produit laitier ; le "beurre noisette" est une technique.
  // On gère aussi les formes collées issues des clés de tableau (laitcoco, cremecoco…).
  texte = texte
    .replace(/noix de coco/g, "coco")
    .replace(/lait de coco/g, "coco")
    .replace(/crème de coco/g, "coco")
    .replace(/creme de coco/g, "coco")
    .replace(/sucre de coco/g, "coco")
    .replace(/huile de coco/g, "coco")
    .replace(/eau de coco/g, "coco")
    .replace(/beurre de coco/g, "coco")
    .replace(/laitcoco/g, "coco")
    .replace(/cremecoco/g, "coco")
    .replace(/cremedecoco/g, "coco")
    .replace(/laitdecoco/g, "coco")
    .replace(/beurre noisette/g, "beurre-cuit");
  return texte;
}

// Mots à exclure selon le profil connecté (régimes + allergies + allergies custom)
function motsExclusProfil() {
  const set = new Set();
  const prefs = window.userProfile?.preferences;
  if (!prefs) return set;
  const ajoute = (mots) => mots.forEach(m => set.add(m.toLowerCase()));
  (prefs.regimes || []).forEach(r => ajoute((typeof ALLERGENES_MOTS !== "undefined" ? ALLERGENES_MOTS[r] : null) || []));
  (prefs.allergies || []).forEach(a => ajoute((typeof ALLERGENES_MOTS !== "undefined" ? ALLERGENES_MOTS[a] : null) || [a]));
  (prefs.allergiesCustom || []).forEach(a => set.add(a.toLowerCase()));
  return set;
}

// ==============================
// ACCUEIL PERSONNALISÉ
// ==============================
function afficherAccueil() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  fermerSousMenus();
  if (typeof masquerSectionMenusFavoris === "function") masquerSectionMenusFavoris();
  if (typeof majBoutonFamille === "function") majBoutonFamille();
  if (typeof majBoutonMonProfil === "function") majBoutonMonProfil();
  if (typeof cacherFiltresChips === "function") cacherFiltresChips();

  // Activer bouton
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById("btn-accueil");
  if (btn) btn.classList.add("active");

  // Afficher section accueil, masquer toutes les autres
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  const secCuisine    = document.getElementById("section-cuisine");
  const secPlan    = document.getElementById("section-planificateur");
  const secFestif  = document.getElementById("section-festif");
  if (secAccueil) secAccueil.style.display = "block";
  if (secCartes) { secCartes.classList.remove("visible"); secCartes.style.display = ""; }
  if (secCuisine)   secCuisine.style.display = "none";
  if (secPlan)   secPlan.style.display = "none";
  if (secFestif) secFestif.style.display = "none";

  chargerAccueil();
}

// === Section déplacée vers app_avis.js (v258) ===

// === Section déplacée vers app_admin.js (v258) ===

// =============================================================================
// FIN STATS ADMIN COMPLÈTES v257.1
// =============================================================================

function escapeHTML(s) {
  return String(s || "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

function formatDateAvis(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  } catch (e) { return ""; }
}

// Appel lors du chargement de Mes Stats
// =============================================================================
// =============================================================================
const INGREDIENTS_SAISON_FRANCE = {
  0:  ["chou","carotte","poireau","endive","navet","panais","salsifis","potiron","courge","butternut","betterave","topinambour","oignon","ail","echalote","celeri","mache","epinard","fenouil","pomme","poire","orange","mandarine","clementine","kiwi","citron","pamplemousse","ananas","chataigne","noix","noisette"],
  1:  ["chou","carotte","poireau","endive","navet","panais","salsifis","courge","butternut","betterave","topinambour","oignon","ail","echalote","celeri","mache","epinard","fenouil","radis","pomme","poire","orange","mandarine","clementine","kiwi","citron","pamplemousse","ananas"],
  2:  ["poireau","endive","carotte","chou","navet","panais","betterave","epinard","mache","oignon","ail","blette","asperge","salade","radis","pomme","poire","kiwi","orange","citron","pamplemousse"],
  3:  ["asperge","radis","salade","petitspois","feve","oignon","epinard","navet","betterave","carotte","blette","rhubarbe","fraise","pomme","poire","citron"],
  4:  ["asperge","petitspois","feve","radis","salade","courgette","tomate","concombre","oignon","ail","epinard","blette","fraise","cerise","rhubarbe","abricot","pomme"],
  5:  ["courgette","aubergine","tomate","poivron","concombre","haricot","salade","oignon","ail","fenouil","petitspois","blette","epinard","fraise","cerise","framboise","abricot","melon","peche","prune","groseille","myrtille"],
  6:  ["tomate","courgette","aubergine","poivron","concombre","haricot","mais","blette","salade","ail","oignon","fenouil","abricot","cerise","framboise","fraise","melon","pasteque","peche","prune","mirabelle","groseille","cassis","myrtille","figue","mure"],
  7:  ["tomate","aubergine","courgette","poivron","concombre","haricot","mais","blette","salade","abricot","mirabelle","melon","pasteque","raisin","peche","prune","figue","mure","myrtille","framboise","cassis","groseille","pomme"],
  8:  ["poireau","courge","potiron","butternut","chou","carotte","panais","betterave","brocoli","tomate","courgette","aubergine","poivron","blette","mache","haricot","fenouil","raisin","figue","mirabelle","pomme","poire","mure","myrtille","framboise","prune","melon","pasteque","noisette","noix"],
  9:  ["potiron","courge","butternut","chou","carotte","panais","navet","brocoli","topinambour","betterave","blette","mache","poireau","fenouil","salsifis","epinard","oignon","ail","raisin","pomme","poire","chataigne","figue","mure","coing","kaki","noix","noisette","mirabelle"],
  10: ["potiron","courge","butternut","chou","carotte","panais","navet","brocoli","topinambour","betterave","mache","poireau","fenouil","salsifis","endive","celeri","echalote","epinard","oignon","ail","pomme","poire","kiwi","coing","chataigne","noix","noisette","orange","mandarine","clementine"],
  11: ["chou","carotte","poireau","endive","navet","panais","salsifis","potiron","courge","butternut","betterave","topinambour","oignon","ail","echalote","celeri","mache","epinard","fenouil","pomme","poire","kiwi","orange","mandarine","clementine","citron","pamplemousse","chataigne","noix","noisette"],
};

const NOMS_MOIS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function getIngredientsDuMois() {
  return INGREDIENTS_SAISON_FRANCE[new Date().getMonth()] || [];
}

function normaliserPourSaison(s) {
  return (s || "").toString().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe").replace(/æ/g, "ae");
}

function scoreSaisonRecette(cle) {
  const r = recettes[cle];
  if (!r) return 0;
  if (r.cat === "cocktails" || r.cat === "mocktails") return 0;
  
  const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
  if (!tabKey) return 0;
  const base = r.base || 4;
  const ligne = r[tabKey].find(l => l.nb === base || l.patons === base) || r[tabKey][0];
  if (!ligne) return 0;
  
  const motsDuMois = getIngredientsDuMois();
  if (motsDuMois.length === 0) return 0;
  
  let score = 0;
  Object.keys(ligne).forEach(k => {
    if (k === "nb" || k === "patons" || k === "total" || k === "label") return;
    const label = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[k]) ? INGREDIENTS_LABELS[k] : k;
    const norm = normaliserPourSaison(label);
    if (motsDuMois.some(mot => norm.includes(mot))) score++;
  });
  return score;
}

function getRecettesDuMois(n = 10) {
  const candidats = [];
  Object.keys(recettes).forEach(cle => {
    const score = scoreSaisonRecette(cle);
    if (score > 0) candidats.push({ cle, score });
  });
  candidats.sort((a, b) => b.score - a.score);
  return candidats.slice(0, n);
}

function chargerAccueilTopMois() {
  const row = document.getElementById("accueil-mois-row");
  const titre = document.getElementById("accueil-mois-titre");
  if (!row) return;
  
  const mois = new Date().getMonth();
  if (titre) titre.textContent = `🌱 Le top de ${NOMS_MOIS_FR[mois]}`;
  
  const top = getRecettesDuMois(10);
  if (top.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Pas de suggestion saisonnière pour ce mois.</div>`;
    return;
  }
  
  // On utilise miniCarte() pour avoir image + Nutri + emoji + nom + temps (cohérent avec les autres blocs)
  row.innerHTML = top.map(({ cle, score }) => {
    const carte = (typeof miniCarte === "function") ? miniCarte(cle) : "";
    // On rajoute un overlay badge "X de saison" en haut à droite de la carte
    // (insertion via remplacement : on ajoute un span dans le DOM string)
    if (!carte) return "";
    return carte.replace(
      '<div class="mini-carte-info">',
      `<span class="mini-carte-badge-mois" title="${score} ingrédient${score>1?'s':''} de saison ce mois-ci">🌱 ${score}</span><div class="mini-carte-info">`
    );
  }).join("");
}

function chargerAccueil() {
  chargerAccueilFavoris();
  chargerAccueilMenus();
  // v249 : Retiré — accessible via ⭐ Favoris → ❤️ Menus favoris
  // chargerAccueilMenusFavoris();
  chargerAccueilFetiches();
  chargerAccueilRecents();
  chargerAccueilSuggestions();
  // v253 : Top du mois (ingrédients de saison)
  chargerAccueilTopMois();
  // S'assurer qu'aucun ancien bloc menus favoris ne traîne
  const ancien = document.getElementById("accueil-menus-favoris-bloc");
  if (ancien) ancien.remove();
}

// Favoris
function chargerAccueilFavoris() {
  const row = document.getElementById("accueil-favoris-row");
  if (!row) return;
  const favs = window.userProfile?.favoris || [];
  if (!window.currentUser) {
    row.innerHTML = `<div class="accueil-empty">👤 <a onclick="ouvrirModalAuth()" style="color:#ff8fb3;cursor:pointer">Connectez-vous</a> pour voir vos favoris</div>`;
    return;
  }
  if (favs.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Aucun favori — appuie sur 🤍 dans une recette !</div>`;
    return;
  }
  row.innerHTML = favs.slice(0, 10).map(key => miniCarte(key)).join("");
}

// Derniers menus générés
function chargerAccueilMenus() {
  const row = document.getElementById("accueil-menus-row");
  if (!row) return;
  let hist = window.userProfile?.historiqueMenus || [];
  if (hist.length === 0) {
    try { hist = JSON.parse(localStorage.getItem("cuisineJeje_histMenus") || "[]"); } catch(e) {}
  }
  if (hist.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Générez votre premier menu dans l'onglet Menus !</div>`;
    return;
  }
  const dernier = hist[0];
  // v258.6 : détecter le thématique AVANT le test "semaine vide". Un menu
  // thématique n'a pas de `semaine` (il a `menu.menu` + `menu.theme`) ; sans ça
  // il était écarté à tort de « Dernier menu généré ».
  const isTheme = dernier?.menu?.theme !== undefined;
  const semaine = dernier?.menu?.semaine || [];

  if (!isTheme && semaine.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Aucun menu récent</div>`;
    return;
  }

  const goMenus = () => afficherSection('planificateur', document.querySelector('.nav-btn[onclick*=planificateur]'));

  // Détecter le format : repas complet ou simple
  const isComplet = semaine[0]?.midi?.plat !== undefined;

  if (isTheme) {
    // Menu thématique — afficher les plats
    const plats = dernier.menu.menu || [];
    row.innerHTML = plats.map(p => {
      const key = p.recette || "";
      const nom = getNomRecette(key) || key || "—";
      const emoji = key ? (getEmoji(key) || "🍽️") : "🍽️";
      // Alerte famille
      const niv = typeof getNiveauFamille === "function" ? getNiveauFamille(key) : null;
      const lvl = niv?.niveau;
      const raison = niv?.raison || "";
      const tip = lvl === "bebe" ? `${raison} — déconseillé bébé` : lvl === "enfant" ? `${raison} — déconseillé enfant` : "";
      const style = lvl === "bebe"   ? "border-left:3px solid #ff4444;background:rgba(255,68,68,.08);padding-left:6px"
                  : lvl === "enfant" ? "border-left:3px solid #ff9900;background:rgba(255,153,0,.06);padding-left:6px" : "";
      const mini  = lvl === "bebe" ? `<span title="${tip}" style="margin-left:4px;font-size:11px">🍼</span>`
                  : lvl === "enfant" ? `<span title="${tip}" style="margin-left:4px;font-size:11px">🧒</span>` : "";
      // v258.6 : un item thématique = une recette → clic ouvre la fiche (et non le planificateur)
      const clickAttr = key ? `onclick="ouvrirFiche('${key}','')"` : `onclick="goMenus()"`;
      return `
      <div class="accueil-menu-card" ${clickAttr} style="cursor:pointer">
        <div class="accueil-menu-day">${p.categorie || "Plat"}</div>
        <div class="accueil-menu-item" style="${style}" title="${tip}">
          <span>${emoji}</span>
          <div>
            <div class="menu-item-nom">${nom}${mini}</div>
          </div>
        </div>
      </div>`;
    }).join("");
    return;
  }

  row.innerHTML = semaine.map(j => {
    if (isComplet) {
      // Format repas complet : entrée / plat / dessert
      const genSous = (r, icone) => {
        if (!r) return "";
        const key = r.recette || "";
        const nom = getNomRecette(key) || key || "—";
        const emoji = key ? (getEmoji(key) || "🍽️") : "🍽️";
        // Alerte famille (rouge bébé / orange enfant) + raison
        const niv = typeof getNiveauFamille === "function" ? getNiveauFamille(key) : null;
        const lvl = niv?.niveau;
        const raison = niv?.raison || "";
        const tip = lvl === "bebe" ? `${raison} — déconseillé bébé` : lvl === "enfant" ? `${raison} — déconseillé enfant` : "";
        const style = lvl === "bebe"   ? "border-left:3px solid #ff4444;background:rgba(255,68,68,.08);padding-left:6px"
                    : lvl === "enfant" ? "border-left:3px solid #ff9900;background:rgba(255,153,0,.06);padding-left:6px" : "";
        const mini  = lvl === "bebe" ? `<span title="${tip}" style="margin-left:4px;font-size:11px">🍼</span>`
                    : lvl === "enfant" ? `<span title="${tip}" style="margin-left:4px;font-size:11px">🧒</span>` : "";
        return `<div class="accueil-menu-item" style="${style}" title="${tip}">
          <span>${emoji}</span>
          <div>
            <div class="menu-moment">${icone}</div>
            <div class="menu-item-nom">${nom}${mini}</div>
          </div>
        </div>`;
      };
      return `
      <div class="accueil-menu-card" onclick="goMenus()">
        <div class="accueil-menu-day">${j.jour}</div>
        <div style="font-size:9px;color:#ff8fb3;font-weight:700;margin-bottom:4px">☀️ Midi</div>
        ${genSous(j.midi?.entree, "🥗 Entrée")}
        ${genSous(j.midi?.plat, "🍽️ Plat")}
        ${genSous(j.midi?.dessert, "🍰 Dessert")}
        <div style="font-size:9px;color:#ff8fb3;font-weight:700;margin:4px 0">🌙 Soir</div>
        ${genSous(j.soir?.entree, "🥗 Entrée")}
        ${genSous(j.soir?.plat, "🍽️ Plat")}
        ${genSous(j.soir?.dessert, "🍰 Dessert")}
      </div>`;
    }

    // Format simple midi/soir
    const midiKey = j.midi?.recette || j.midi || "";
    const soirKey = j.soir?.recette || j.soir || "";
    const midiNom = getNomRecette(midiKey) || midiKey || "—";
    const soirNom = getNomRecette(soirKey) || soirKey || "—";
    const emoji1 = midiKey ? (getEmoji(midiKey) || "🍽️") : "🍽️";
    const emoji2 = soirKey ? (getEmoji(soirKey) || "🍽️") : "🍽️";
    // Alertes famille
    const nM = typeof getNiveauFamille === "function" ? getNiveauFamille(midiKey) : null;
    const nS = typeof getNiveauFamille === "function" ? getNiveauFamille(soirKey) : null;
    const fmtAlerte = (n) => {
      if (!n) return { style: "", mini: "", tip: "" };
      const tip = n.niveau === "bebe" ? `${n.raison} — déconseillé bébé` : `${n.raison} — déconseillé enfant`;
      const style = n.niveau === "bebe"   ? "border-left:3px solid #ff4444;background:rgba(255,68,68,.08);padding-left:6px"
                                          : "border-left:3px solid #ff9900;background:rgba(255,153,0,.06);padding-left:6px";
      const mini = n.niveau === "bebe" ? `<span title="${tip}" style="margin-left:4px;font-size:11px">🍼</span>`
                                       : `<span title="${tip}" style="margin-left:4px;font-size:11px">🧒</span>`;
      return { style, mini, tip };
    };
    const aM = fmtAlerte(nM);
    const aS = fmtAlerte(nS);
    return `
    <div class="accueil-menu-card" onclick="goMenus()">
      <div class="accueil-menu-day">${j.jour}</div>
      <div class="accueil-menu-item" style="${aM.style}" title="${aM.tip}">
        <span>${emoji1}</span>
        <div>
          <div class="menu-moment">☀️ Midi</div>
          <div class="menu-item-nom">${midiNom}${aM.mini}</div>
        </div>
      </div>
      <div class="accueil-menu-item" style="${aS.style}" title="${aS.tip}">
        <span>${emoji2}</span>
        <div>
          <div class="menu-moment">🌙 Soir</div>
          <div class="menu-item-nom">${soirNom}${aS.mini}</div>
        </div>
      </div>
    </div>`;
  }).join("");
}

// Mes menus favoris (sur l'accueil) — bloc créé dynamiquement
function chargerAccueilMenusFavoris() {
  // v249 : Retiré de l'accueil — accessible via ⭐ Favoris → ❤️ Menus favoris
  // Suppression défensive du bloc s'il existe encore
  const ancien = document.getElementById("accueil-menus-favoris-bloc");
  if (ancien) ancien.remove();
  return;
  // --- Code historique conservé en cas de besoin futur ---
  const blocId = "accueil-menus-favoris-bloc";
  const menusBloc = document.getElementById("accueil-menus-bloc");
  if (!menusBloc) return;

  const favs = (typeof getMenusFavoris === "function" ? getMenusFavoris() : []) || [];
  // Si pas de favoris ET pas connecté, on ne crée pas le bloc
  if (favs.length === 0 && !window.currentUser) {
    const existant = document.getElementById(blocId);
    if (existant) existant.remove();
    return;
  }

  let bloc = document.getElementById(blocId);
  if (!bloc) {
    // Créer le bloc et l'insérer juste après "Derniers menus générés"
    bloc = document.createElement("div");
    bloc.id = blocId;
    bloc.className = "accueil-bloc";
    bloc.innerHTML = `
      <div class="accueil-bloc-header">
        <h2>❤️ Mes menus favoris</h2>
        <button class="accueil-voir-plus" onclick="ouvrirModalProfil()">Tout voir →</button>
      </div>
      <div class="accueil-scroll-row" id="accueil-menus-favoris-row"></div>`;
    menusBloc.parentNode.insertBefore(bloc, menusBloc.nextSibling);
  }

  const row = document.getElementById("accueil-menus-favoris-row");
  if (!row) return;

  if (favs.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Aucun menu favori — sauvegardez vos menus préférés depuis l'écran Menus !</div>`;
    return;
  }

  row.innerHTML = favs.slice(0, 10).map(f => {
    // Aperçu : 1er plat (ou apéro pour thématique)
    let apercu = "";
    let emoji = "🍽️";
    if (f.type === "thematique") {
      const items = f.menu?.menu || [];
      const plat = items.find(p => /plat/i.test(p.categorie || "")) || items[0];
      if (plat?.recette) {
        apercu = getNomRecette(plat.recette) || plat.recette;
        emoji = getEmoji(plat.recette) || "🎉";
      } else {
        emoji = "🎉";
      }
    } else {
      const j1 = f.menu?.semaine?.[0];
      const k = j1?.midi?.recette || j1?.midi?.plat?.recette || (typeof j1?.midi === "string" ? j1.midi : "");
      if (k) {
        apercu = getNomRecette(k) || k;
        emoji = getEmoji(k) || "🗓️";
      } else {
        emoji = "🗓️";
      }
    }
    const sousType = f.type === "thematique" ? "🎉 Thématique" : "🗓️ Semaine";
    return `<div class="accueil-menu-card" onclick="appliquerMenuFavori('${f.id}')" style="cursor:pointer;min-width:180px">
      <div class="accueil-menu-day" style="display:flex;justify-content:space-between;align-items:center;gap:4px">
        <span>${sousType}</span>
        <span style="display:flex;gap:6px">
          <button onclick="event.stopPropagation();demanderRenommageMenu('${f.id}')" style="background:transparent;border:none;color:#ff8fb3;cursor:pointer;font-size:13px;padding:0" title="Renommer">✏️</button>
          <button onclick="event.stopPropagation();confirmer('Supprimer ce menu favori ?',{titre:'❤️ Menu favori',boutonOui:'Supprimer'}).then(ok=>{if(ok)supprimerMenuFavori('${f.id}').then(()=>chargerAccueilMenusFavoris())})" style="background:transparent;border:none;color:#ff6b6b;cursor:pointer;font-size:14px;padding:0" title="Supprimer">✕</button>
        </span>
      </div>
      <div class="accueil-menu-item">
        <span>${emoji}</span>
        <div>
          <div class="menu-item-nom" style="font-weight:600">${f.nom}</div>
          <div style="font-size:11px;color:#aaa;margin-top:2px">${apercu || ""}</div>
        </div>
      </div>
    </div>`;
  }).join("");
}

// Dernières recettes vues
function chargerAccueilRecents() {
  const row = document.getElementById("accueil-recents-row");
  if (!row) return;
  const recents = window._recentsVus || [];
  if (recents.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Aucune recette vue récemment</div>`;
    return;
  }
  row.innerHTML = recents.slice(0, 20).map(key => miniCarte(key)).join("");
}

function effacerHistoriqueMenus() {
  try {
    localStorage.removeItem("cuisineJeje_histMenus");
    // Purger aussi Firebase
    if (window.currentUser && window.db && window.userProfile) {
      window.userProfile.historiqueMenus = [];
      window.db.collection("utilisateurs").doc(window.currentUser.uid)
        .update({ historiqueMenus: [] }).catch(() => {});
    }
  } catch(e) {}
  const row = document.getElementById("accueil-menus-row");
  if (row) row.innerHTML = `<div class="accueil-empty">Générez votre premier menu dans l'onglet Menus !</div>`;
}

function effacerRecents() {
  window._recentsVus = [];
  try { localStorage.removeItem("recentsVus"); } catch(e) {}
  
  // v254 : Purger aussi Firebase pour que ça persiste après refresh
  // Note : on garde "totalRecettesVues" intact pour ne pas perdre les badges curiosité
  if (window.currentUser && window.userProfile) {
    window.userProfile.recettesVues = [];
    try {
      _db.collection("utilisateurs").doc(window.currentUser.uid)
        .update({ recettesVues: [] }).catch(() => {});
    } catch(e) {}
  }
  
  chargerAccueilRecents();
  if (typeof afficherToast === "function") afficherToast("🗑️ Liste effacée");
}

// Suggestions selon profil
// ==============================
// SAISONS — printemps / été / automne / hiver
// ==============================
// Renvoie la saison du mois courant (basée sur l'hémisphère nord)
function getSaisonActuelle() {
  const mois = new Date().getMonth() + 1; // 1-12
  if (mois >= 3 && mois <= 5)  return "printemps";
  if (mois >= 6 && mois <= 8)  return "ete";
  if (mois >= 9 && mois <= 11) return "automne";
  return "hiver"; // déc, jan, fev
}

// Emoji et libellé associés à chaque saison
function getEmojiSaison(saison) {
  return ({
    printemps: { emoji: "🌸", label: "Printemps" },
    ete:       { emoji: "🌞", label: "Été" },
    automne:   { emoji: "🍂", label: "Automne" },
    hiver:     { emoji: "❄️", label: "Hiver" },
  })[saison] || { emoji: "", label: "" };
}

// Indique si une recette est "de saison maintenant"
function estDeSaison(key) {
  const s = recettes[key]?.saisons;
  if (!s || !Array.isArray(s)) return false; // pas de tag = toutes saisons (ni de saison ni hors-saison)
  return s.includes(getSaisonActuelle());
}

// ==============================
// HISTORIQUE — "Refait il y a X jours"
// ==============================
// Parcourt l'historique des menus et trouve la date la plus récente où cette recette a été utilisée.
// Retourne { jours: nombre, date: Date } ou null si jamais utilisée.
function dernierUsageRecette(key) {
  const hist = window.userProfile?.historiqueMenus || [];
  if (!key || hist.length === 0) return null;
  let dernier = null;
  hist.forEach(entry => {
    if (!entry?.date) return;
    const trouve = recetteDansMenu(entry.menu, key);
    if (trouve) {
      const d = new Date(entry.date);
      if (!isNaN(d) && (!dernier || d > dernier)) dernier = d;
    }
  });
  if (!dernier) return null;
  const diffMs = Date.now() - dernier.getTime();
  const jours = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return { jours, date: dernier };
}

// Vérifie si une clé recette apparaît quelque part dans un objet menu (semaine ou thématique)
function recetteDansMenu(menu, key) {
  if (!menu) return false;
  // Menu thématique : { menu: [{ recette: "..." }, ...] }
  if (Array.isArray(menu.menu)) {
    return menu.menu.some(item => item?.recette === key);
  }
  // Menu semaine : { semaine: [{ midi: ..., soir: ... }, ...] }
  if (Array.isArray(menu.semaine)) {
    return menu.semaine.some(jour => {
      return ["midi","soir"].some(m => {
        const v = jour[m];
        if (!v) return false;
        if (typeof v === "string") return v === key;
        if (v.recette === key) return true;
        // Format complet entrée/plat/dessert
        return ["entree","plat","dessert"].some(t => v[t]?.recette === key);
      });
    });
  }
  return false;
}

// Format lisible : "aujourd'hui" / "hier" / "il y a 5 jours" / "il y a 2 semaines"
function formatJoursDepuis(jours) {
  if (jours <= 0) return "aujourd'hui";
  if (jours === 1) return "hier";
  if (jours < 7)   return `il y a ${jours} jours`;
  if (jours < 14)  return "il y a 1 semaine";
  if (jours < 30)  return `il y a ${Math.floor(jours/7)} semaines`;
  if (jours < 60)  return "il y a 1 mois";
  return `il y a ${Math.floor(jours/30)} mois`;
}

// ==============================
// FAVORIS FRÉQUENCE — "Plats fétiches du foyer"
// ==============================
// Compte le nombre d'occurrences de chaque recette dans l'historique des menus.
// Retourne une Map { cle: { count, derniere } } triée par count décroissant.
function calculerFrequenceRecettes() {
  const hist = window.userProfile?.historiqueMenus || [];
  const compteur = new Map();
  hist.forEach(entry => {
    if (!entry?.menu) return;
    const date = entry.date ? new Date(entry.date) : null;
    // Collecter toutes les clés présentes dans ce menu
    const cles = collectClesMenu(entry.menu);
    cles.forEach(k => {
      const courant = compteur.get(k) || { count: 0, derniere: null };
      courant.count++;
      if (date && (!courant.derniere || date > courant.derniere)) courant.derniere = date;
      compteur.set(k, courant);
    });
  });
  return compteur;
}

// Extrait toutes les clés recettes d'un menu (semaine ou thématique, simple ou complet)
function collectClesMenu(menu) {
  const cles = new Set();
  if (!menu) return cles;
  if (Array.isArray(menu.menu)) {
    menu.menu.forEach(item => { if (item?.recette) cles.add(item.recette); });
  }
  if (Array.isArray(menu.semaine)) {
    menu.semaine.forEach(jour => {
      ["midi","soir"].forEach(m => {
        const v = jour[m];
        if (!v) return;
        if (typeof v === "string") cles.add(v);
        else if (v.recette) cles.add(v.recette);
        ["entree","plat","dessert"].forEach(t => { if (v[t]?.recette) cles.add(v[t].recette); });
      });
    });
  }
  return cles;
}

// Charge la mini-tuile "Plats fétiches du foyer" sur l'accueil
function chargerAccueilFetiches() {
  const row = document.getElementById("accueil-fetiches-row");
  const sec = document.getElementById("section-accueil-fetiches");
  if (!row || !sec) return;

  const freq = calculerFrequenceRecettes();
  // Seuil : recettes faites au moins 2 fois (vrais favoris, pas des essais)
  const fetiches = [...freq.entries()]
    .filter(([k, v]) => v.count >= 2 && recettes[k])
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  if (fetiches.length === 0) {
    sec.style.display = "none"; // masquer la section si rien
    return;
  }
  sec.style.display = "";

  row.innerHTML = fetiches.map(([key, info]) => {
    return miniCarteFetiche(key, info.count);
  }).join("");
}

// Variante de miniCarte avec un badge fréquence ("🔥 X fois")
// Mapping clé Firestore → nom de fichier image
// Pour les recettes dont la clé interne ne correspond pas au nom du fichier .webp
// (utilisé par miniCarte / miniCarteFetiche pour générer le bon chemin d'image)
const IMAGE_EXCEPTIONS = {
  pizza:   "patepizza",   // clé 'pizza' → images/patepizza.webp
  lasagne: "patelasagne", // clé 'lasagne' → images/patelasagne.webp
};
function getImagePath(key) {
  const nom = IMAGE_EXCEPTIONS[key] || key;
  return `images/${nom}.webp`;
}

function miniCarteFetiche(key, count) {
  if (!key || !recettes[key]) return "";
  const r    = recettes[key];
  const nom  = getNomRecette(key);
  // Badge famille
  const adapt = typeof getAdaptationFamille === "function" ? getAdaptationFamille(key) : null;
  const badgeFam = adapt ? `<span class="mini-carte-famille" title="${adapt.label}">${adapt.badge}</span>` : "";
  // Badge fréquence
  const emoji = count >= 4 ? "🔥" : "⭐";
  const label = count >= 4 ? "Plat fétiche" : "Favori du foyer";
  const badgeFreq = `<span class="mini-carte-saison" style="background:rgba(255,140,0,.75)" title="${label} — ${count} fois">${emoji}${count}</span>`;
  return `<div class="mini-carte" onclick="ajouterRecent('${key}');ouvrirFiche('${key}','')">
    <img src="${getImagePath(key)}" alt="${nom}" onerror="this.style.display='none'">
    ${badgeFam}
    ${badgeFreq}
    <div class="mini-carte-info">
      <span class="mini-carte-emoji">${r.emoji || "🍽️"}</span>
      <span class="mini-carte-nom">${nom}</span>
      <span class="mini-carte-temps">⏱ ${r.temps || ""}</span>
    </div>
  </div>`;
}

function chargerAccueilSuggestions() {
  const row = document.getElementById("accueil-suggestions-row");
  if (!row) return;

  const today = new Date().toLocaleDateString("fr-FR");
  const regimesKey = (window.userProfile?.preferences?.regimes || []).sort().join("-");
  const allergiesKey = (window.userProfile?.preferences?.allergies || []).sort().join("-");
  // v3 = version du mapping allergènes (incrémenter quand le mapping change)
  const storageKey = "suggestions_v3_" + today + "_" + (window.currentUser?.uid || "anon") + "_" + regimesKey + "_" + allergiesKey;

  // Nettoyer les anciens caches de suggestions
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("suggestions_") && !k.startsWith("suggestions_v3_")) {
        localStorage.removeItem(k);
      }
    });
  } catch(e) {}

  // Réutiliser les suggestions du jour si déjà générées
  try {
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      const pool = JSON.parse(cached);
      if (pool.length > 0) {
        row.innerHTML = pool.map(key => miniCarte(key)).join("");
        return;
      }
    }
  } catch(e) {}

  // Générer de nouvelles suggestions
  const toutes = Object.keys(recettes);
  const favs   = window.userProfile?.favoris || [];
  const vus    = window._recentsVus || [];
  const exclus = new Set([...favs, ...vus]);

  const prefs = window.userProfile?.preferences;
  const motsExclus = new Set();
  if (prefs) {
    [...(prefs.allergies||[]), ...(prefs.regimes||[]), ...(prefs.allergiesCustom||[])].forEach(a => {
      (ALLERGENES_MOTS[a] || [a]).forEach(m => motsExclus.add(m.toLowerCase()));
    });
  }

  const _catsExclues = new Set(["boulangerie","cocktails","mocktails"]);
  const _recExclues = new Set([
    // Boulangerie / bases
    "croissant","patepizza","patelasagne","patefeuilletee","patebrisee","patesablee",
    "painbaguette","paindemie","painburger","galettetacos","brioche","painauchocolat",
    // Petit-déjeuner / brunch sucré
    "financiers","overnightoats","granolaMaison","chocolatChaud","smoothiebowl",
    "bowlacai","pancakesproteine","smoothiemangopassion","energyballs","bananabread",
    "sconeBritish","yaourt","smoothievert","crepes","gaufres","pancakes",
    // Desserts
    "tartetatinpommes","tartepistache","tartechocolatcaramel","cookies","churros",
    // Cocktails / mocktails — tous exclus des repas
    "mojito","margarita","cosmopolitan","spritz","sangria","pinacolada","daiquiri",
    "whiskysour","virginmojito","limonademaison","citronadementhe","virginpinacolada",
    "mojitorose","negroni","moscowmule","pornstarmartini","hugospritz",
    "cherryblossommocktail","oldFashioned","gintoniqmaison","shrubframboisebasilic",
    "mocktailcoconananas","coktailcosmopolitan","mocktailmentheagume",
    "aperolspritzrosa","blueLagoon","espressoMartini","sidecarvintage",
    "gingerlemondrop","tequilasunrise","punchfruitsrouges","mocktailberrybliss",
    "mocktailcoconorchidee","bellini","frenchMartini","darkStormyCocktail",
    "amarettoSour","aperolPamplemousse","mocktailframboisementhe","mocktailpassionsoleil",
    "mocktailconcombrecitr","mocktailgingembre","mocktailfraisesvanille"
  ]);

  let pool = toutes.filter(key => {
    if (exclus.has(key)) return false;
    if (_recExclues.has(key) || RECETTES_NON_REPAS.has(key)) return false;
    if (_catsExclues.has(categorieRecette(key))) return false;
    if (motsExclus.size === 0) return true;
    const texte = texteRecette(key);
    return ![...motsExclus].some(m => texte.includes(m));
  });

  // Seed basé sur la date pour stabiliser le mélange du jour
  const seed = today.split("/").reduce((a, b) => parseInt(a) + parseInt(b), 0);
  // Filtre saison STRICT : on garde uniquement les recettes
  //   - taguées avec la saison actuelle
  //   - OU sans tag saison (= toute l'année)
  // Une recette taguée "hiver" ne sera donc PAS suggérée en été !
  const saisonActuelle = getSaisonActuelle();
  pool = pool.filter(key => {
    const saisons = recettes[key]?.saisons;
    if (!saisons || saisons.length === 0) return true; // toute l'année
    return saisons.includes(saisonActuelle);
  });
  // Pondération par niveau utilisateur : on favorise les recettes adaptées au niveau
  // Débutant → priorité Facile / Intermédiaire → priorité Facile+Moyen / Confirmé → équilibré
  const userNiv = typeof getNiveauUtilisateur === "function" ? getNiveauUtilisateur() : "intermédiaire";
  pool = pool.sort((a, b) => {
    // Score selon le niveau de la recette vs niveau utilisateur
    const scoreA = scoreNiveauPourUser(a, userNiv);
    const scoreB = scoreNiveauPourUser(b, userNiv);
    if (scoreA !== scoreB) return scoreB - scoreA; // score plus élevé = priorité
    // À score égal, mélange stable basé sur la date
    const ha = (a.charCodeAt(0) * seed) % 997;
    const hb = (b.charCodeAt(0) * seed) % 997;
    return ha - hb;
  }).slice(0, 6);  // 6 suggestions du jour

  if (pool.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Aucune suggestion disponible</div>`;
    return;
  }

  // Sauvegarder pour la journée
  try { localStorage.setItem(storageKey, JSON.stringify(pool)); } catch(e) {}
  row.innerHTML = pool.map(key => miniCarte(key)).join("");
}

// Mini carte pour les scrolls horizontaux
function miniCarte(key) {
  if (!key || !recettes[key]) return "";
  const r    = recettes[key];
  const nom  = getNomRecette(key);
  const img  = key.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Badge famille : alerte rouge/orange si recette présente une difficulté famille (cohérent avec planif menus)
  let badgeFam = "";
  let styleAlerte = "";
  let titleAlerte = "";
  let btnRegen = "";
  if (typeof getNiveauFamille === "function" && typeof getFoyerProfil === "function") {
    const profil = getFoyerProfil();
    if (profil && (profil.hasBebe || profil.hasEnfant)) {
      const niv = getNiveauFamille(key);
      if (niv) {
        // Recette inadaptée : alerte (bordure colorée + badge)
        const raison = niv.raison || "";
        const lvl = niv.niveau;
        titleAlerte = lvl === "bebe" ? `${raison} — déconseillé bébé` : `${raison} — déconseillé enfant`;
        styleAlerte = lvl === "bebe" ? "border:2px solid #ff4444;box-shadow:0 0 8px rgba(255,68,68,.3)"
                                     : "border:2px solid #ff9900;box-shadow:0 0 8px rgba(255,153,0,.3)";
        const emoji = lvl === "bebe" ? "🍼" : "🧒";
        badgeFam = `<span class="mini-carte-famille" title="${titleAlerte}">${emoji}</span>`;
        // Bouton régénérer
        btnRegen = `<button class="mini-carte-regen" onclick="event.stopPropagation();regenererSuggestion('${key}')" title="Régénérer cette suggestion">🔄</button>`;
      } else {
        // Recette 100% adaptée famille → badge positif
        badgeFam = `<span class="mini-carte-famille mini-carte-famille-ok" title="Adapté à toute la famille">🏠</span>`;
      }
    }
  }
  // Badge saison (uniquement si recette est de saison actuelle)
  const deSaison = typeof estDeSaison === "function" && estDeSaison(key);
  const infoSaison = deSaison ? getEmojiSaison(getSaisonActuelle()) : null;
  const badgeSaison = infoSaison ? `<span class="mini-carte-saison" title="De saison : ${infoSaison.label}">${infoSaison.emoji}</span>` : "";
  
  // Badge Nutri-Score (positionné en haut à gauche, à l'opposé du badge famille)
  let badgeNutri = "";
  if (typeof calculerNutriScoreRecette === "function") {
    // Exclure cocktails/mocktails (boissons alcoolisées/sucrées)
    const r2 = recettes[key];
    const isDrink = r2 && (r2.categorie === "cocktails" || r2.categorie === "mocktails");
    if (!isDrink) {
      const tabKey = Object.keys(r2 || {}).find(k => k.startsWith("tableau") && Array.isArray(r2[k]));
      if (tabKey) {
        const base = r2.base || 4;
        const ligne = r2[tabKey].find(l => l.nb === base || l.patons === base) || r2[tabKey][0];
        if (ligne) {
          const ns = calculerNutriScoreRecette(ligne);
          if (ns) {
            badgeNutri = `<span class="mini-carte-nutri nutri-${ns.lettre}" data-lettre="${ns.lettre}" title="Nutri-Score ${ns.lettre}"></span>`;
          }
        }
      }
    }
  }
  
  return `<div class="mini-carte" style="${styleAlerte}" title="${titleAlerte}" onclick="ajouterRecent('${key}');ouvrirFiche('${key}','')">
    <img src="${getImagePath(key)}" alt="${nom}" onerror="this.style.display='none'">
    ${badgeNutri}
    ${badgeFam}
    ${badgeSaison}
    ${btnRegen}
    <div class="mini-carte-info">
      <span class="mini-carte-emoji">${r.emoji || "🍽️"}</span>
      <span class="mini-carte-nom">${nom}</span>
      <span class="mini-carte-temps">⏱ ${r.temps || ""}</span>
    </div>
  </div>`;
}

// Régénère une recette dans les suggestions du jour
function regenererSuggestion(cleAremplacer) {
  const storageKey = Object.keys(localStorage).find(k => k.startsWith("suggestions_v3_"));
  if (!storageKey) return;
  try {
    const pool = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const idx = pool.indexOf(cleAremplacer);
    if (idx === -1) return;
    // Trouver une recette de remplacement adaptée
    const favs   = window.userProfile?.favoris || [];
    const vus    = window._recentsVus || [];
    const exclus = new Set([...favs, ...vus, ...pool]); // exclure aussi celles déjà dans le pool
    const prefs = window.userProfile?.preferences;
    const motsExclus = new Set();
    if (prefs && typeof ALLERGENES_MOTS !== "undefined") {
      [...(prefs.allergies||[]), ...(prefs.regimes||[]), ...(prefs.allergiesCustom||[])].forEach(a => {
        (ALLERGENES_MOTS[a] || [a]).forEach(m => motsExclus.add(m.toLowerCase()));
      });
    }
    const _catsExclues = new Set(["boulangerie","cocktails","mocktails"]);
    const candidats = Object.keys(recettes).filter(key => {
      if (exclus.has(key)) return false;
      if (RECETTES_NON_REPAS && RECETTES_NON_REPAS.has(key)) return false;
      if (_catsExclues.has(categorieRecette(key))) return false;
      // Préférer une recette ADAPTÉE famille
      if (typeof getNiveauFamille === "function" && getNiveauFamille(key)) return false;
      if (motsExclus.size > 0) {
        const texte = texteRecette(key);
        if ([...motsExclus].some(m => texte.includes(m))) return false;
      }
      return true;
    });
    if (candidats.length === 0) {
      if (typeof afficherToast === "function") afficherToast("Aucune recette adaptée trouvée pour remplacer", "info");
      return;
    }
    // Choisir aléatoirement
    const remplacement = candidats[Math.floor(Math.random() * candidats.length)];
    pool[idx] = remplacement;
    localStorage.setItem(storageKey, JSON.stringify(pool));
    // Re-rendre les suggestions
    if (typeof chargerAccueilSuggestions === "function") chargerAccueilSuggestions();
    if (typeof afficherToast === "function") afficherToast(`✨ Remplacé par ${getNomRecette(remplacement)}`, "success");
  } catch(e) { console.error(e); }
}

function afficherHistorique() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  fermerSousMenus();
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById("btn-historique");
  if (btn) btn.classList.add("active");

  if (typeof basculeVersGrille === "function") basculeVersGrille();

  const recents = window._recentsVus || [];
  const cartes  = document.querySelectorAll(".carte");
  cartes.forEach(c => {
    const m   = (c.getAttribute("onclick") || "").match(/ouvrirFiche\('([^']+)'/);
    const key = m ? m[1] : null;
    c.style.display = key && recents.includes(key) ? "" : "none";
  });
  if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
}

function filtrerFavoris() {
  if (typeof fermerSousMenus === "function") fermerSousMenus();
  // Cacher uniquement les chips Recettes (cat+pays), pas les chips Favoris
  const chipsRec = document.getElementById("filtres-chips");
  if (chipsRec) chipsRec.style.display = "none";
  if (typeof reinitialiserRecherche === "function") reinitialiserRecherche();
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('btn-favoris');
  if (btn) btn.classList.add('active');

  if (!window.currentUser) { ouvrirModalAuth(); return; }

  // Basculer vers la grille
  if (typeof basculeVersGrille === "function") basculeVersGrille();

  const favs = window.userProfile?.favoris || [];
  const cartes = document.querySelectorAll('.carte');
  let count = 0;
  cartes.forEach(c => {
    const onclick = c.getAttribute('onclick') || '';
    // Reconnaître les deux patterns : ouvrirFiche(...) OU choisirRecette(...)
    const match = onclick.match(/(?:ouvrirFiche|choisirRecette)\('([^']+)'/);
    const key = match ? match[1] : null;
    if (key && favs.includes(key)) {
      c.style.display = 'flex';
      count++;
    } else {
      c.style.display = 'none';
    }
  });

  // Message si aucun favori
  let msg = document.getElementById('msg-no-favoris');
  if (count === 0) {
    if (!msg) {
      msg = document.createElement('p');
      msg.id = 'msg-no-favoris';
      msg.style.cssText = 'text-align:center;color:#888;padding:40px;grid-column:1/-1;font-size:15px';
      msg.innerHTML = `❤️ Aucun favori pour l'instant.<br><small>Appuie sur 🤍 dans une recette pour l'ajouter !</small>`;
      document.getElementById('recettes-grid')?.appendChild(msg);
    }
  } else {
    if (msg) msg.remove();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Affiche la vue dédiée "Menus favoris" (déclenché par l'onglet ❤️ Menus favoris)
function filtrerMenusFavoris() {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  // Activer le bouton "Favoris" (qui contient l'option Menus)
  document.getElementById('btn-favoris')?.classList.add('active');
  // Cacher uniquement les chips Recettes (cat+pays), pas les chips Favoris
  const chipsRec = document.getElementById("filtres-chips");
  if (chipsRec) chipsRec.style.display = "none";

  if (!window.currentUser) { ouvrirModalAuth(); return; }

  // Masquer TOUTES les autres sections (accueil, grille, calculateur, planificateur)
  fermerSousMenus();
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  const secCuisine    = document.getElementById("section-cuisine");
  const secPlan    = document.getElementById("section-planificateur");
  const secFestif  = document.getElementById("section-festif");
  const menuCats   = document.querySelector(".menu-cats");
  const searchBar  = document.querySelector(".search-bar");
  if (secAccueil) secAccueil.style.display = "none";
  if (secCartes)  { secCartes.classList.remove("visible"); secCartes.style.display = "none"; }
  if (secCuisine)    secCuisine.style.display = "none";
  if (secPlan)    secPlan.style.display = "none";
  if (secFestif)  secFestif.style.display = "none";
  // On garde la barre de catégories et la search bar visibles (pour pouvoir naviguer)
  if (menuCats)  menuCats.style.display = "";
  if (searchBar) searchBar.style.display = "";

  // Créer (ou retrouver) la section dédiée
  let sec = document.getElementById("section-menus-favoris");
  if (!sec) {
    sec = document.createElement("section");
    sec.id = "section-menus-favoris";
    sec.style.cssText = "max-width:900px;margin:20px auto;padding:0 16px";
    // Insertion après section-cartes pour rester dans le flux normal
    if (secCartes && secCartes.parentNode) {
      secCartes.parentNode.insertBefore(sec, secCartes.nextSibling);
    } else {
      document.body.appendChild(sec);
    }
  }
  sec.style.display = "block";

  // Remplir avec la liste des menus favoris
  const menusFavs = window.userProfile?.menusFavoris || [];
  let html = `<h2 style="color:#ff8fb3;margin:16px 0 12px 0;font-size:22px">❤️ Mes Menus Favoris</h2>`;

  if (menusFavs.length === 0) {
    html += `<p style="text-align:center;color:#888;padding:40px;font-size:15px;background:rgba(255,255,255,.03);border-radius:12px">
      Aucun menu favori pour l'instant.<br>
      <small style="opacity:.7">Sauvegardez vos menus préférés depuis l'écran Menus avec 🤍 !</small>
    </p>`;
  } else {
    html += `<div style="display:grid;gap:10px">`;
    menusFavs.forEach(f => {
      const sousType = f.type === "thematique" ? "🎉 Thématique" : "🗓️ Semaine";
      // Aperçu
      let apercu = "";
      if (f.type === "thematique") {
        const plat = (f.menu?.menu || []).find(p => /plat/i.test(p.categorie || "")) || (f.menu?.menu || [])[0];
        if (plat?.recette) apercu = getNomRecette(plat.recette) || plat.recette;
      } else {
        const j1 = f.menu?.semaine?.[0];
        const k = j1?.midi?.recette || j1?.midi?.plat?.recette || (typeof j1?.midi === "string" ? j1.midi : "");
        if (k) apercu = getNomRecette(k) || k;
      }
      const date = f.date ? new Date(f.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "";
      html += `<div class="favori-item" style="padding:14px 16px;cursor:pointer" onclick="appliquerMenuFavori('${f.id}')" title="Cliquer pour appliquer ce menu">
        <span style="display:flex;flex-direction:column;gap:4px;flex:1;min-width:0">
          <span style="font-weight:700;color:#fff;font-size:15px">${f.nom}</span>
          <span style="font-size:12px;color:#aaa">${sousType} ${apercu ? "· " + apercu : ""} ${date ? "· " + date : ""}</span>
        </span>
        <span style="display:flex;gap:8px;align-items:center">
          <button onclick="event.stopPropagation();demanderRenommageMenu('${f.id}')" class="btn-retirer-favori" title="Renommer" style="color:#ff8fb3">✏️</button>
          <button onclick="event.stopPropagation();confirmer('Supprimer ce menu favori ?',{titre:'❤️ Menu favori',boutonOui:'Supprimer'}).then(ok=>{if(ok)supprimerMenuFavori('${f.id}')})" class="btn-retirer-favori" title="Supprimer">✕</button>
        </span>
      </div>`;
    });
    html += `</div>`;
  }
  sec.innerHTML = html;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Quand on revient sur Accueil ou autre onglet, on masque la section menus favoris
function masquerSectionMenusFavoris() {
  const sec = document.getElementById("section-menus-favoris");
  if (sec) sec.style.display = "none";
}

// ==============================
// ALLERGIES CUSTOM
// ==============================
// ⚠️ Les fonctions de gestion des allergies custom (ajouterAllergieCustom,
// renderAllergiesCustom, retirerAC) sont définies dans auth.js avec le stockage
// window._ac_p / _ac_pp, qui est celui lu par sauvegarderProfilComplet().
// Ne PAS les redéfinir ici : ça créait un conflit où l'allergie tapée n'était
// jamais sauvegardée (ex: "ananas" ignoré → pizza hawaïenne proposée).


// ==============================
// Compteur +/-
// ==============================
function changerCompteur(id, delta) {
  const el = document.getElementById(id);
  if (!el) return;
  const val = parseInt(el.value) + delta;
  const min = parseInt(el.min) || 0;
  const max = parseInt(el.max) || 99;
  el.value = Math.min(max, Math.max(min, val));
}

// v251 : Sélecteur +/- pour le planificateur (Semaine et Thématique)
function changerPersonnesPlan(inputId, delta) {
  const el = document.getElementById(inputId);
  if (!el) return;
  const val = (parseInt(el.value) || 4) + delta;
  const min = parseInt(el.min) || 1;
  const max = parseInt(el.max) || 15;
  el.value = Math.min(max, Math.max(min, val));
  // Déclencher l'événement de changement pour que le reste de la logique réagisse
  el.dispatchEvent(new Event("change"));
}

// Validation manuelle de l'input (saisie directe au clavier)
function onChangePersonnesPlan(inputId) {
  const el = document.getElementById(inputId);
  if (!el) return;
  let val = parseInt(el.value) || 4;
  const min = parseInt(el.min) || 1;
  const max = parseInt(el.max) || 15;
  el.value = Math.min(max, Math.max(min, val));
}

// Tabs profil
function switchProfilTab(tab, btn) {
  document.querySelectorAll('.profil-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.profil-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('profil-tab-' + tab).style.display = 'block';
  btn.classList.add('active');
  if (tab === 'favoris') afficherFavoris();
}

// Afficher favoris RECETTES (onglet "Recettes favorites" du profil)
function afficherFavoris() {
  const liste = document.getElementById('liste-favoris');
  if (!liste) return;
  const favs = window.userProfile?.favoris || [];

  if (favs.length === 0) {
    liste.innerHTML = `<p style="text-align:center;color:#888;padding:20px">Aucune recette favorite pour l'instant.<br>Appuie sur 🤍 dans une recette pour l'ajouter !</p>`;
    return;
  }

  liste.innerHTML = favs.map(key => {
    const nom = (typeof getNomRecette === 'function' ? getNomRecette(key) : key);
    const data = typeof recettes !== 'undefined' ? recettes[key] : null;
    const emoji = data?.emoji || '🍽️';
    return `<div class="favori-item" onclick="fermerModalProfil();choisirRecette('${key}')">
      <span>${emoji} ${nom}</span>
      <button onclick="event.stopPropagation();toggleFavori('${key}').then(()=>afficherFavoris())" class="btn-retirer-favori">✕</button>
    </div>`;
  }).join('');
}

// Afficher menus favoris (onglet "Menus favoris" du profil)
function afficherMenusFavoris() {
  const liste = document.getElementById('liste-menus-favoris');
  if (!liste) return;
  const menusFavs = window.userProfile?.menusFavoris || [];

  if (menusFavs.length === 0) {
    liste.innerHTML = `<p style="text-align:center;color:#888;padding:20px">Aucun menu favori pour l'instant.<br>Sauvegardez vos menus préférés depuis l'écran Menus avec 🤍 !</p>`;
    return;
  }

  liste.innerHTML = menusFavs.map(f => {
    const sousType = f.type === "thematique" ? "🎉" : "🗓️";
    // Aperçu : 1er plat
    let apercu = "";
    if (f.type === "thematique") {
      const plat = (f.menu?.menu || []).find(p => /plat/i.test(p.categorie || "")) || (f.menu?.menu || [])[0];
      if (plat?.recette) apercu = getNomRecette(plat.recette) || plat.recette;
    } else {
      const j1 = f.menu?.semaine?.[0];
      const k = j1?.midi?.recette || j1?.midi?.plat?.recette || (typeof j1?.midi === "string" ? j1.midi : "");
      if (k) apercu = getNomRecette(k) || k;
    }
    return `<div class="favori-item" onclick="fermerModalProfil();appliquerMenuFavori('${f.id}')" title="Cliquer pour appliquer ce menu">
      <span style="display:flex;flex-direction:column;gap:2px">
        <span>${sousType} ${f.nom}</span>
        ${apercu ? `<span style="font-size:11px;color:#888;font-weight:normal">→ ${apercu}</span>` : ""}
      </span>
      <span style="display:flex;gap:8px;align-items:center">
        <button onclick="event.stopPropagation();demanderRenommageMenu('${f.id}')" class="btn-retirer-favori" title="Renommer" style="color:#ff8fb3">✏️</button>
        <button onclick="event.stopPropagation();confirmer('Supprimer ce menu favori ?',{titre:'❤️ Menu favori',boutonOui:'Supprimer'}).then(ok=>{if(ok)supprimerMenuFavori('${f.id}').then(()=>{afficherMenusFavoris();chargerAccueilMenusFavoris();})})" class="btn-retirer-favori">✕</button>
      </span>
    </div>`;
  }).join('');
}

// Ajouter bouton favori dans la modale recette
const _origChoisirRecette = typeof choisirRecette !== 'undefined' ? choisirRecette : null;


// Mapping des clés de colonnes vers labels affichables
const INGREDIENTS_LABELS = {
  // == v257 — Muffins & Pâtisserie ==
  chocolatBlanc: "🤍 Chocolat blanc", chocolatLait: "🍫 Chocolat au lait",
  pepitesChoco: "🍫 Pépites de chocolat",
  cannelle: "🪵 Cannelle", pavot: "🌱 Graines de pavot",
  noix: "🌰 Noix", amandes: "🌰 Amandes",
  huileTournesol: "🌻 Huile de tournesol", vanilleExtrait: "🌿 Extrait de vanille",
  streusel: "🍪 Streusel", caramelSale: "🍯 Caramel beurre salé",
  // == v257 — Marques ==
  kinderBueno: "🍫 Kinder Bueno", mars: "🍫 Mars",
  kitkat: "🍫 Kit Kat", raffaello: "🥥 Raffaello",
  snickers: "🥜 Snickers", oreo: "🍪 Oreo",
  // == v257 — Asie & autres ==
  nouillesRiz: "🍜 Nouilles de riz", saucePoisson: "🐟 Sauce poisson (nuoc-mâm)",
  pousses_soja: "🌱 Pousses de soja",
  pateCurryVert: "🌶️ Pâte de curry vert", basilic_thai: "🌿 Basilic thaï",
  reblochon: "🧀 Reblochon", pousseBambou: "🎍 Pousses de bambou",
  biscuits: "🍪 Biscuits sablés", epaulePorc: "🐖 Épaule de porc",
  sauceBBQ: "🥫 Sauce barbecue", saumonFrais: "🐟 Saumon frais",
  ciboulette: "🌿 Ciboulette", cremeChantilly: "🍦 Crème chantilly",
  agneau: "🐑 Agneau", merguez: "🌭 Merguez",
  butternut: "🎃 Butternut", rizArborio: "🍚 Riz arborio",
  vinBlanc: "🍷 Vin blanc sec", champignons: "🍄 Champignons",
  boullionLeg: "🥣 Bouillon de légumes",
  // === v257.2 — Nouveaux ingrédients ===
  cabillaud: "🐟 Cabillaud", magret: "🦆 Magret de canard",
  // == Ignorés ==
  nb: null, label: null, total: null,
  // == Céréales & pâtes ==
  farine: "🌾 Farine", riz: "🍚 Riz", rizS: "🍚 Riz", semoule: "🌾 Semoule",
  nouilles: "🍜 Nouilles", spaghetti: "🍝 Spaghetti", pates: "🍝 Pâtes",
  lasagne: "🍝 Feuilles de lasagne", flocons: "🌾 Flocons d'avoine",
  quinoa: "🌾 Quinoa", maizena: "🌾 Maïzena", cacao: "🍫 Cacao en poudre",
  graines: "🌱 Graines", chia: "🌱 Graines de chia", granola: "🌾 Granola",
  chapelure: "🍞 Chapelure", pain: "🍞 Pain", buns: "🍞 Buns",
  pita: "🥙 Pains pita", crepesP: "🥙 Crêpes pékinoises",
  feuilletee: "🥐 Pâte feuilletée", pate: "🥙 Pâton(s)", patons: "🥙 Pâton(s)",
  // == Produits laitiers ==
  lait: "🥛 Lait", laitChoux: "🥛 Lait", laitCreme: "🥛 Lait",
  creme: "🍦 Crème fraîche", gCreme: "🍦 Crème fraîche", beurreCreme: "🍦 Crème fraîche",
  yaourt: "🥛 Yaourt grec",
  beurre: "🧈 Beurre", beurrChoux: "🧈 Beurre", beurrCreme: "🧈 Beurre", beurrePate: "🧈 Beurre",
  huile: "🫒 Huile", huileOlive: "🫒 Huile d'olive", huileTruffe: "🍄 Huile de truffe",
  mascarpone: "🧀 Mascarpone", parmesan: "🧀 Parmesan", gruyere: "🧀 Gruyère",
  feta: "🧀 Feta", fetaOpt: "🧀 Feta (optionnel)", gorgonzola: "🧀 Gorgonzola",
  ricotta: "🧀 Ricotta", pecorino: "🧀 Pecorino", philadelphia: "🧀 Philadelphia",
  cheddar: "🧀 Cheddar", mozza: "🧀 Mozzarella", fromage: "🧀 Fromage",
  laitCoco: "🥥 Lait de coco", cremeCoco: "🥥 Crème de coco", coco: "🥥 Lait de coco",
  confiture: "🍓 Confiture", moutarde: "🟡 Moutarde",
  // == Œufs ==
  oeufs: "🥚 Œufs", oeuf: "🥚 Œuf", oeufChoux: "🥚 Œufs", oeufCreme: "🥚 Œufs",
  oeufPate: "🥚 Œufs", jaunes: "🥚 Jaunes d'œufs", jaunesCreme: "🥚 Jaunes d'œufs",
  blancs: "🥚 Blancs d'œufs", blanc: "🥚 Blancs d'œufs",
  // == Sucre & levure ==
  sucre: "🍬 Sucre", sucreGlace: "🍬 Sucre glace", cassonade: "🍬 Cassonade",
  gSucre: "🍬 Sucre", sucreCreme: "🍬 Sucre", sucreCaramel: "🍬 Sucre",
  sucreMeringue: "🍬 Sucre", sucreIles: "🍬 Sucre de coco",
  miel: "🍯 Miel", sirop: "🍬 Sirop de sucre", selRebord: "🧂 Sucre/sel (rebord)",
  levure: "🟨 Levure fraîche", ferment: "🟨 Ferments lactiques",
  poudreAmande: "🌰 Poudre d'amande", glace: "🍦 Glace vanille",
  // == Viandes ==
  poulet: "🍗 Poulet", porc: "🐷 Porc", boeuf: "🥩 Bœuf", agneau: "🐑 Agneau",
  viande: "🥩 Viande", joues: "🥩 Joues de bœuf", jarret: "🦴 Jarret de veau",
  canard: "🦆 Canard", cotelets: "🐑 Côtelettes d'agneau", os: "🦴 Os",
  lardons: "🥓 Lardons", jambon: "🍖 Jambon", guanciale: "🥓 Guanciale",
  salami: "🌭 Salami", chorizo: "🌭 Chorizo", nduja: "🌶️ Nduja",
  prosciutto: "🍖 Prosciutto di Parma", foie: "🫀 Foies de volaille",
  proteine: "💪 Protéine en poudre",
  // == Poissons & fruits de mer ==
  saumon: "🐟 Saumon fumé", thon: "🐟 Thon", poisson: "🐟 Poisson",
  dorade: "🐟 Dorade", poulpe: "🐙 Poulpe", crevettes: "🦐 Crevettes",
  moules: "🦪 Moules", anchois: "🐟 Anchois", anchoix: "🐟 Anchois",
  // == Légumes ==
  tomates: "🍅 Tomates", tomate: "🍅 Tomates", tomateCerise: "🍅 Tomates cerises",
  oignon: "🧅 Oignon", oignons: "🧅 Oignons", echalote: "🧅 Échalote",
  ail: "🧄 Ail", carotte: "🥕 Carotte", carottes: "🥕 Carottes",
  courgette: "🥒 Courgette", aubergine: "🍆 Aubergine", aubergines: "🍆 Aubergines",
  poivron: "🫑 Poivron", champignons: "🍄 Champignons", shiitake: "🍄 Shiitake",
  epinards: "🌿 Épinards", salade: "🥬 Salade", laitue: "🥬 Laitue",
  pdterre: "🥔 Pommes de terre", patate: "🍠 Patate douce", patatedouce: "🍠 Patate douce",
  courge: "🎃 Courge butternut", manioc: "🌿 Manioc", navets: "🪨 Navets",
  chou: "🥬 Chou", poireaux: "🥬 Poireaux", asperges: "🌿 Asperges",
  mais: "🌽 Maïs", maïs: "🌽 Maïs", petitspois: "🟢 Petits pois",
  haricots: "🟢 Haricots verts", concombre: "🥒 Concombre", celeri: "🌿 Céleri",
  edamame: "🟢 Edamame", pois: "🥜 Pois",
  // == Légumineuses ==
  poischiches: "🥜 Pois chiches", lentilles: "🥜 Lentilles",
  // == Fruits ==
  citron: "🍋 Citron", citrons: "🍋 Citrons", orange: "🍊 Orange", orangeJus: "🍊 Jus d'orange",
  pommes: "🍎 Pommes", bananes: "🍌 Bananes", fraise: "🍓 Fraise", fraises: "🍓 Fraises",
  framboises: "🫐 Framboises", myrtilles: "🫐 Myrtilles", peche: "🍑 Pêche",
  pruneaux: "🫐 Pruneaux", fruits: "🍎 Fruits", passion: "🌺 Fruits de la passion",
  mangue: "🥭 Mangue", pasteque: "🍉 Pastèque", cerises: "🍒 Cerises", cerise: "🍒 Cerise",
  fraise: "🍓 Fraise", avocats: "🥑 Avocats", ananas: "🍍 Ananas",
  acai: "🫐 Açaï", coulis: "🍓 Coulis", sambar: "🍲 Sambar",
  // == Aromates & épices ==
  sel: "🧂 Sel", poivre: "🌶️ Poivre noir", piment: "🌶️ Piment",
  masala: "🌶️ Garam masala", curry: "🌶️ Curry", cumin: "🌿 Cumin",
  cannelle: "🪵 Cannelle", muscade: "🌰 Muscade", safran: "🌼 Safran", paprika: "🌶️ Paprika",
  // === Lot 1 — Ingrédients classiques français ===
  brochet: "🐟 Brochet", ecrevisses: "🦞 Écrevisses", lapin: "🐰 Lapin",
  reblochon: "🧀 Reblochon", tomme: "🧀 Tomme fraîche", andouillette: "🌭 Andouillette",
  cuissecanard: "🦆 Cuisse de canard", graissecanard: "🦆 Graisse de canard",
  haricotsblancs: "🥜 Haricots blancs", vinrouge: "🍷 Vin rouge",
  patefeuilletee: "🥧 Pâte feuilletée", poudreamandes: "🥥 Poudre d'amandes",
  cremepatissiere: "🍮 Crème pâtissière", sucrecaramel: "🍯 Sucre (caramel)",
  feve: "🪙 Fève",
  // === Lot 2 — Ingrédients cuisines du monde ===
  baguette: "🥖 Baguette", painpita: "🥙 Pain pita",
  haricotsverts: "🟢 Haricots verts", saucissefumee: "🌭 Saucisse fumée",
  pouletHache: "🍗 Poulet haché", rizGrillé: "🌾 Riz grillé concassé",
  oignonrouge: "🧅 Oignon rouge", nouillesoeuf: "🍜 Nouilles aux œufs",
  pateCurry: "🌶️ Pâte de curry", cacahuetespurée: "🥜 Purée de cacahuètes",
  lait_coco: "🥥 Lait de coco", tempeh: "🟨 Tempeh",
  piniots: "🌰 Pignons de pin", feuillesBrick: "📜 Feuilles de brick",
  feuillesFilo: "📜 Feuilles de filo", sucreglace: "❄️ Sucre glace",
  // === Mega-Lot — Italie / Pâtisserie / Healthy ===
  spaghetti: "🍝 Spaghetti", palourdes: "🦪 Palourdes",
  polenta: "🌽 Polenta", gorgonzola: "🧀 Gorgonzola",
  ragu: "🍝 Ragù (sauce bolognaise)", huilefriture: "🛢️ Huile de friture",
  marsala: "🍷 Marsala", caramel: "🍯 Caramel",
  amaretto: "🥃 Amaretto", glacevanille: "🍦 Glace vanille",
  fondant: "🍬 Fondant pâtissier", chocolatNoir: "🍫 Chocolat noir",
  kirsch: "🍷 Kirsch", cerises: "🍒 Cerises",
  biscuitscuillere: "🍪 Biscuits cuillère", fraisesframboises: "🍓 Fraises ou framboises",
  fromageblanc: "🥛 Fromage blanc", jusfruit: "🧃 Jus de fruits",
  farineT80: "🌾 Farine T80", farineble: "🌾 Farine de blé",
  farineseigle: "🌾 Farine de seigle", farinesarrasin: "🌾 Farine de sarrasin",
  levain: "🥖 Levain", graines: "🌻 Graines (tournesol, lin, sésame)",
  filetdeboeuf: "🥩 Filet de bœuf", saumonfume: "🐟 Saumon fumé",
  saumonfrais: "🐟 Filet de saumon frais", fromagefrais: "🧀 Fromage frais",
  fleurdesel: "🧂 Fleur de sel", crème: "🥛 Crème fraîche",
  patebrisee: "🥧 Pâte brisée", fromagerape: "🧀 Fromage râpé",
  emmental: "🧀 Emmental", huiledolive: "🫒 Huile d'olive",
  // === Sprint final — Allemagne, Espagne, Mexique, Inde, Japon, Chine, Russie, Portugal, Hongrie ===
  bratwurst: "🌭 Saucisses bratwurst", ketchup: "🍅 Ketchup",
  currypoudre: "🌶️ Curry en poudre", paprikaFume: "🌶️ Paprika fumé",
  paprikafume: "🌶️ Paprika fumé", bicarbonate: "🧂 Bicarbonate",
  grossel: "🧂 Gros sel", raisinssecs: "🍇 Raisins secs",
  pommeterre: "🥔 Pommes de terre", boeufbourguignon: "🥩 Bœuf à mijoter",
  betteraves: "🟣 Betteraves", chouvert: "🥬 Chou vert",
  cremefraiche: "🥛 Crème fraîche", boeufhache: "🥩 Bœuf haché",
  porchache: "🐷 Porc haché", moruedessale: "🐟 Morue dessalée",
  jalapeno: "🌶️ Jalapeños", crema: "🥛 Crema mexicaine",
  laitconcentre: "🥛 Lait concentré sucré", laitevapore: "🥛 Lait évaporé",
  fruitsrouges: "🫐 Fruits rouges", epicesmasala: "🌶️ Garam masala",
  pouletcuisses: "🍗 Cuisses de poulet", saucesoja: "🥢 Sauce soja",
  sauceaussoja: "🥢 Sauce soja", sake: "🍶 Sake",
  matcha: "🍵 Matcha (poudre)", laitamande: "🥛 Lait d'amande",
  eauchaude: "💧 Eau chaude", tofusoie: "🟩 Tofu soyeux",
  doubanjiang: "🌶️ Doubanjiang (pâte sichuanaise)", ailechalote: "🧅 Ail-échalote",
  poivresichuan: "🌶️ Poivre du Sichuan", huilepiment: "🌶️ Huile pimentée",
  huilesame: "🌰 Huile de sésame", feuilleswonton: "🥟 Feuilles de wonton",
  charcuterie: "🥩 Charcuterie", fromageraclette: "🧀 Fromage à raclette",
  oignonsblanc: "🧅 Petits oignons", saladeverte: "🥗 Salade verte",
  pain: "🥖 Pain", balsamique: "🍶 Vinaigre balsamique",
  acaipuree: "🫐 Purée d'açaí", cocoflocons: "🥥 Flocons de coco",
  grainepain: "🌾 Graines (chia, lin)", amande: "🥜 Amandes", beurredamande: "🥜 Beurre d'amande",
  huileolive: "🫒 Huile d'olive", sucreroux: "🍯 Sucre roux",
  sucrecasso: "🍯 Sucre cassonade", jaunesoeufs: "🥚 Jaunes d'œufs",
  zestecitron: "🍋 Zeste de citron", crudités: "🥕 Crudités",
  // === Incontournables ===
  fromagebeaufort: "🧀 Beaufort", fromagecomte: "🧀 Comté",
  fromageemmental: "🧀 Emmental français", painrassis: "🥖 Pain rassis",
  saintjacques: "🦪 Noix de Saint-Jacques", fleurdesel: "🧂 Fleur de sel",
  briocheoupain: "🍞 Brioche ou pain", sucresemoule: "🍬 Sucre semoule",
  poissonroche: "🐟 Poisson de roche", fenouil: "🌿 Fenouil",
  croutons: "🥖 Croûtons aillés", rouille: "🌶️ Rouille",
  bouquetgarni: "🌿 Bouquet garni",
  laitnon: "🥛 Lait", sauceokonomi: "🥢 Sauce okonomi",
  mayojaponaise: "🥚 Mayonnaise japonaise", bonite: "🐟 Bonite séchée",
  rizbasmati: "🌾 Riz basmati", epicesbiryani: "🌶️ Épices biryani (garam masala)",
  gingembreail: "🧄 Pâte gingembre-ail", pouletoupigeon: "🍗 Poulet ou pigeon",
  feuillesbrick: "📜 Feuilles de brick", epicesras: "🌶️ Ras-el-hanout",
  tagliatellesfraiches: "🍝 Tagliatelles fraîches", truffenoire: "🍄 Truffe noire",
  boeufpouramijoter: "🥩 Bœuf à mijoter", bierebrune: "🍺 Bière brune",
  painepicesmoutarde: "🥖 Pain d'épices moutardé", vergeoise: "🍯 Vergeoise (cassonade)",
  saindoux: "🥓 Saindoux",
  poudreamande: "🥜 Poudre d'amande", blancsoeufs: "🥚 Blancs d'œufs",
  ganacheoufruit: "🍫 Ganache ou confiture", arome: "✨ Arôme (vanille...)",
  levureboulanger: "🍞 Levure boulangère", cremechantilly: "🥛 Crème chantilly",
  jauneoeuf: "🥚 Jaune d'œuf", tabasco: "🌶️ Tabasco",
  farinetamisee: "🌾 Farine tamisée", chocolatnoir: "🍫 Chocolat noir", jusdecitron: "🍋 Jus de citron",
  levurechimique: "🍞 Levure chimique", pepiteschoco: "🍫 Pépites de chocolat",
  gingembre: "🌿 Gingembre", galanga: "🌿 Galanga", anis: "⭐ Anis étoilé",
  citronnelle: "🌿 Citronnelle", vanille: "🍦 Vanille", fumee: "💨 Paprika fumé",
  chermoula: "🌿 Chermoula", pesto: "🌿 Pesto",
  persil: "🌿 Persil", coriandre: "🌿 Coriandre", menthe: "🌿 Menthe fraîche",
  basilic: "🌿 Basilic", thym: "🌿 Thym", romarin: "🌿 Romarin", aneth: "🌿 Aneth",
  // == Condiments & sauces ==
  sojaS: "🍶 Sauce soja", mirin: "🍶 Mirin", saké: "🍶 Saké", hoisin: "🍶 Sauce hoisin",
  bbqSauce: "🍖 Sauce BBQ", rub: "🌶️ Rub BBQ", tahini: "🫒 Tahini",
  miso: "🌿 Miso", gochujang: "🌶️ Gochujang", vinaigre: "🍶 Vinaigre",
  // == Divers cuisine ==
  bouillon: "🍲 Bouillon", dashi: "💧 Dashi", cafe: "☕ Café expresso",
  nori: "🌿 Nori", tofu: "🧀 Tofu", wakame: "🌊 Wakamé",
  tortilla: "🌮 Tortillas", tortillas: "🌮 Tortillas", noix: "🌰 Noix",
  amandes: "🌰 Amandes", pignons: "🌰 Pignons de pin", olives: "🫒 Olives",
  palmier: "🌴 Cœurs de palmier", tahini: "🫒 Tahini",
  // == Alcools ==
  rhum: "🍶 Rhum blanc", tequila: "🥃 Tequila", vodka: "🍶 Vodka",
  gin: "🍶 Gin", bourbon: "🥃 Bourbon", cognac: "🥃 Cognac", brandy: "🥃 Brandy",
  aperol: "🍊 Aperol", campari: "🍊 Campari", vermouth: "🍷 Vermouth",
  prosecco: "🍾 Prosecco", champagne: "🍾 Champagne", tripleSec: "🍊 Triple sec",
  cointreau: "🍊 Cointreau", passoa: "🌺 Passoa", curacao: "🫐 Curaçao bleu",
  kahluaC: "☕ Kahlúa", gingerBeer: "💧 Ginger beer", limonade: "💧 Limonade",
  grenadine: "🍒 Grenadine", rose: "🍷 Rosé pétillant", sureau: "🌸 Sirop de sureau",
  espresso: "☕ Espresso", jusMixte: "🍹 Jus de fruits rouges",
  cranberry: "🍒 Jus de cranberry", bitters: "💧 Angostura bitters",
  fleurOranger: "🌸 Eau de fleur d'oranger", tonic: "💧 Tonic premium",
  eauGaz: "💧 Eau gazeuse", eau: "💧 Eau", eauChoux: "💧 Eau", eauRose: "🌹 Eau de rose",
  // == Chocolat & pâtisserie ==
  chocolat: "🍫 Chocolat noir", pepites: "🍫 Pépites de chocolat",
  cremeTruffe: "🍄 Crème de truffe", roquette: "🥬 Roquette",
  // == Ingrédients spéciaux ==
  pralin: "🌰 Pâte de pralin", proteine: "💪 Protéine", dattes: "🌴 Dattes",
  vermicelles: "🍜 Vermicelles", edamame: "🟢 Edamame",
  // == Ajouts audit complet (50 ingrédients) ==
  // Boissons / alcools
  vin: "🍷 Vin", cidre: "🍎 Cidre", saké: "🍶 Saké",
  // Légumes
  avocat: "🥑 Avocat", melon: "🍈 Melon",
  chouC: "🥬 Chou", choufleur: "🥦 Chou-fleur", betterave: "🟥 Betterave",
  bok_choy: "🥬 Bok choy", herbes: "🌿 Herbes de Provence",
  // Aromates / condiments
  ciboule: "🌿 Ciboule", ciboulette: "🌿 Ciboulette", sauge: "🌿 Sauge",
  capres: "🫒 Câpres", baies: "🫐 Baies de genièvre",
  // Sauces / pâtes
  bechamel: "🥛 Sauce béchamel", soja: "🥢 Sauce soja", chutney: "🍯 Chutney",
  pateC: "🌶️ Pâte de curry", curryVert: "🌶️ Pâte de curry vert",
  fecule: "🌾 Fécule de maïs",
  // Viandes / poissons / fruits de mer
  veau: "🥩 Veau", lard: "🥓 Lard fumé", saucisses: "🌭 Saucisses",
  merguez: "🌶️ Merguez", calamars: "🦑 Calamars", moule: "🦪 Moules",
  // Produits laitiers / œufs
  chevre: "🐐 Fromage de chèvre", camembert: "🧀 Camembert", gJaune: "🥚 Jaune d'œuf",
  // Fruits
  banane: "🍌 Banane", pomme: "🍎 Pomme", kiwi: "🥝 Kiwi", citronC: "🍋 Citron",
  // Fruits secs & graines
  pistaches: "🌰 Pistaches", arachide: "🥜 Arachide",
  sesame: "🥜 Graines de sésame", cacahetes: "🥜 Cacahuètes grillées",
  // Sucré / divers
  choco: "🍫 Chocolat", biscuits: "🍪 Biscuits", gelatine: "🟦 Gélatine",
  filo: "🥟 Pâte filo", pateSablee: "🥧 Pâte sablée",
  muffins: "🧁 Muffins anglais", tteok: "🍢 Gâteaux de riz tteok",
  soba: "🍜 Nouilles soba",
  // Spécifique brioche / patisserie
  beurrage: "🧈 Beurre de tourage",
  // == Ingrédients ajoutés (50 nouvelles recettes du monde) ==
  // Viandes
  agneauHache: "🐑 Agneau haché", boeufHache: "🐮 Bœuf haché",
  viandeHachee: "🥩 Viande hachée", queueboeuf: "🐮 Queue de bœuf",
  travers: "🥩 Travers de bœuf", saucisse: "🌭 Saucisse fumée",
  serrano: "🥓 Jambon Serrano",
  // Poissons / fruits de mer
  thonHuile: "🐟 Thon à l'huile",
  // Légumes & herbes
  bokchoy: "🥬 Bok choy", brocoli: "🥦 Brocoli",
  oignonNouveau: "🧅 Oignon nouveau", oignonRouge: "🧅 Oignon rouge",
  feves: "🟢 Fèves", figues: "🟣 Figues",
  pommedeterre: "🥔 Pommes de terre", maïs: "🌽 Maïs",
  haricotsnoirs: "🥜 Haricots noirs", haricotsrouges: "🥜 Haricots rouges",
  cornichons: "🥒 Cornichons", poire: "🍐 Poire asiatique",
  pousses: "🌱 Pousses de soja", feuilles: "🌿 Feuilles de vigne",
  feuillesBric: "📄 Feuilles de brick",
  // Fromages
  burrata: "🧀 Burrata", mozzarella: "🧀 Mozzarella",
  paneer: "🧀 Paneer", fromageFrais: "🧀 Fromage frais",
  // Épices & condiments
  curcuma: "🌶️ Curcuma", garamMasala: "🌶️ Garam masala",
  cardamome: "🌰 Cardamome", fenugrec: "🌾 Fenugrec",
  origan: "🌿 Origan", laurier: "🌿 Laurier",
  sumac: "🌶️ Sumac", tamarin: "🟤 Tamarin",
  ancho: "🌶️ Piment ancho", piment_ancho: "🌶️ Piment ancho",
  piment_guajillo: "🌶️ Piment guajillo", scotchBonnet: "🌶️ Piment scotch bonnet",
  guascas: "🌿 Guascas",
  // Sauces & pâtes
  sojaSauce: "🍶 Sauce soja", nuocmam: "🐟 Nuoc-mâm",
  pateMassaman: "🌶️ Pâte de curry Massaman", kecapManis: "🍶 Kecap manis",
  sambal: "🌶️ Sambal oelek", hoisin: "🍶 Sauce hoisin",
  mayonnaise: "🥫 Mayonnaise", concentre: "🥫 Concentré de tomate",
  cremeFraiche: "🥛 Crème fraîche",
  vinaigreBalsamique: "🍶 Vinaigre balsamique", vinaigreRiz: "🍶 Vinaigre de riz",
  // Vins / alcools cuisine
  vinblanc: "🍷 Vin blanc",
  // Pains & pâtes (boulangerie)
  paton: "🍞 Pâton (pizza)", pateFeuilletee: "🥧 Pâte feuilletée",
  baos: "🥟 Petits pains bao", ramen: "🍜 Nouilles ramen",
  rizCuit: "🍚 Riz cuit (froid)",
  // Liquides / matières grasses
  laitcoco: "🥥 Lait de coco", huilesesame: "🫒 Huile de sésame",
  // Fruits secs / noix
  cacahuetes: "🥜 Cacahuètes", noixCoco: "🥥 Noix de coco râpée",
  raisinsSecs: "🟤 Raisins secs", edamames: "🌱 Edamames",
  // Boulghour & céréales
  boulghour: "🌾 Boulghour", farineRiz: "🌾 Farine de riz gluant",
  lentillesCorail: "🌾 Lentilles corail",
  // Levures & ferments
  // Pâtisserie spécifique
  kataifi: "🌾 Cheveux d'ange (kataifi)", kaya: "🍯 Confiture de coco kaya",
  dulceDeLeche: "🍯 Dulce de leche",
  eauFleurOranger: "💧 Eau de fleur d'oranger",
  colorant: "🎨 Colorant alimentaire",
  // Aromates spécifiques
  kaffir: "🍃 Feuilles de combava (kaffir)",
  citronvert: "🍋 Citron vert",
  // Divers
  sucrebrun: "🟤 Sucre brun", sucrepalme: "🟤 Sucre de palme",
  selFleur: "🧂 Fleur de sel", sauce: "🥫 Sauce",
  wasabi: "🌿 Wasabi",
};



// ==============================
// FONCTIONS DEPUIS INDEX.HTML
// ==============================

// Calculer brioche depuis la carte
function calculerCarteBrioche(version) {
  // Mettre à jour le bouton actif
  document.querySelectorAll(".btn-brioche-carte").forEach((b, i) => {
    b.classList.toggle("btn-brioche-carte-actif", i + 1 === version);
  });
  document.getElementById("recette").value = "brioche";
  document.getElementById("personnes").value = version;
  calculer();
  setTimeout(() => {
    const res = document.getElementById("resultat").innerHTML;
    document.getElementById("modal-resultat").innerHTML = res;
    document.getElementById("modal-calc").classList.add("visible");
  }, 50);
}

// Nouvelle gestion des pills brioche (quantité + type)
// Stocke l'état localement, et OUVRE la fiche (popup) seulement si les 2 sont définis
window._briocheChoix = { qte: 1, type: "lait" };

function selectionnerBrioche(btn, groupe, valeur) {
  // Désactiver les autres boutons du même groupe (data-qte ou data-type)
  const selector = groupe === "qte" ? ".btn-brioche-qte" : ".btn-brioche-type";
  document.querySelectorAll(selector).forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  
  // Mettre à jour l'état
  window._briocheChoix[groupe] = valeur;
  
  // Calculer la version (1=1🥛, 2=2🥛, 3=1🚫, 4=2🚫)
  const { qte, type } = window._briocheChoix;
  let version;
  if (type === "lait") version = (qte === 1) ? 1 : 2;
  else version = (qte === 1) ? 3 : 4;
  
  // Ouvrir la fiche avec ce choix
  document.getElementById("recette").value = "brioche";
  document.getElementById("personnes").value = version;
  calculer();
  setTimeout(() => {
    const res = document.getElementById("resultat").innerHTML;
    document.getElementById("modal-resultat").innerHTML = res;
    document.getElementById("modal-calc").classList.add("visible");
  }, 50);
}

// === Section déplacée vers app_menu.js (v258) ===

// === Section déplacée vers app_courses_impr.js (v258) ===

// === Section déplacée vers app_recherche.js (v258) ===

// === Section déplacée vers app_garde_manger.js (v258) ===

// === Section déplacée vers app_modal_confirm.js (v258) ===

// === Section déplacée vers app_courses.js (v258) ===

// ============================================================
// ADAPTATION FAMILIALE — profil foyer
// ============================================================
// Mots bébé (rouge) et enfant (orange)
const MOTS_BEBE = [
  // Crus et dangereux
  "tartare","carpaccio","sashimi","ceviche","sushi","maki","nigiri","temaki",
  "poisson cru","thon cru","saumon cru",
  "huitre","huître","crevette crue","fruit de mer cru",
  // Allergènes majeurs bébé
  "miel","cacahuète","cacahuete","arachide","noix de","noisette","amande crue",
  // Charcuterie crue
  "jambon cru","prosciutto","nduja","saucisson","bresaola","coppa","salami cru",
  // Très épicé
  "harissa","piment fort","piment rouge","sauce piquante","tabasco",
  // Alcool — versions "au xxx" (description) ET versions sèches (ingrédient)
  "flambé","flambée","flamber","au rhum","au cognac","au whisky","alcool",
  "rhum","cognac","whisky","vodka","tequila","kirsch","amaretto","marsala",
  "vinblanc","vinrouge","vinrose","saké","sake",
  // Moules/coquillages (risque allergie) — "moules" au pluriel pour éviter "moule à tarte/gâteau"
  "moules","huitre","huître","palourde","coquillage"
];

const MOTS_ENFANT = ["harissa","piment fort","gochujang","wasabi","tartare","carpaccio",
  "sashimi","huitre","huître","bouillabaisse","très épicé","bien épicé","relevé","piquant"];

// Table mot trouvé → libellé lisible (ce qu'on montrera à l'utilisateur).
// Plusieurs mots peuvent partager le même libellé.
const RAISONS_FAMILLE = {
  // Poisson cru
  "sushi":"Poisson cru","maki":"Poisson cru","nigiri":"Poisson cru","temaki":"Poisson cru",
  "sashimi":"Poisson cru","ceviche":"Poisson cru","poisson cru":"Poisson cru",
  "thon cru":"Poisson cru","saumon cru":"Poisson cru","tartare":"Viande/poisson cru",
  "carpaccio":"Viande/poisson cru","gravlax":"Poisson cru",
  // Coquillages / fruits de mer
  "moules":"Coquillages","huitre":"Coquillages","huître":"Coquillages",
  "palourde":"Coquillages","coquillage":"Coquillages","fruit de mer cru":"Fruits de mer crus",
  "crevette crue":"Crevettes crues",
  // Charcuterie crue
  "jambon cru":"Charcuterie crue","prosciutto":"Charcuterie crue","nduja":"Charcuterie crue",
  "saucisson":"Charcuterie crue","bresaola":"Charcuterie crue","coppa":"Charcuterie crue",
  "salami cru":"Charcuterie crue",
  // Allergènes risqués bébé
  "miel":"Miel (déconseillé < 1 an)",
  "cacahuète":"Arachides","cacahuete":"Arachides","arachide":"Arachides",
  "noix de":"Fruits à coque","noisette":"Fruits à coque","amande crue":"Fruits à coque",
  // Épices fortes
  "harissa":"Épicé (harissa)","piment fort":"Épicé","piment rouge":"Épicé",
  "sauce piquante":"Épicé","tabasco":"Épicé","gochujang":"Sauce coréenne épicée",
  "wasabi":"Wasabi (très piquant)","très épicé":"Très épicé","bien épicé":"Très épicé",
  "relevé":"Plat relevé","piquant":"Plat piquant",
  // Alcool
  "flambé":"Plat flambé (alcool)","flambée":"Plat flambé (alcool)","flamber":"Plat flambé (alcool)",
  "au rhum":"Contient du rhum","au cognac":"Contient du cognac","au whisky":"Contient du whisky",
  "alcool":"Contient de l'alcool",
  // Soupe spéciale
  "bouillabaisse":"Bouillabaisse (poisson)",
};

// Étiquettes courtes affichées EN GROS sur les cartes (style "⛔ Miel interdit < 1 an")
// Format : { motDétecté: { bebe: "...", enfant: "..." } }
// "bebe" pour foyer avec bébé (rouge), "enfant" pour foyer avec enfant uniquement (orange)
const ETIQUETTES_FAMILLE = {
  // Poisson cru / Viande crue
  "sushi":            { bebe: "⛔ Poisson cru — pas avant 5 ans",        enfant: "⚠️ Poisson cru — déconseillé enfant" },
  "maki":             { bebe: "⛔ Poisson cru — pas avant 5 ans",        enfant: "⚠️ Poisson cru — déconseillé enfant" },
  "nigiri":           { bebe: "⛔ Poisson cru — pas avant 5 ans",        enfant: "⚠️ Poisson cru — déconseillé enfant" },
  "sashimi":          { bebe: "⛔ Poisson cru — pas avant 5 ans",        enfant: "⚠️ Poisson cru — déconseillé enfant" },
  "ceviche":          { bebe: "⛔ Poisson cru — pas avant 5 ans",        enfant: "⚠️ Poisson cru — déconseillé enfant" },
  "poisson cru":      { bebe: "⛔ Poisson cru — pas avant 5 ans",        enfant: "⚠️ Poisson cru — déconseillé enfant" },
  "thon cru":         { bebe: "⛔ Thon cru — pas avant 5 ans",           enfant: "⚠️ Thon cru — déconseillé enfant" },
  "saumon cru":       { bebe: "⛔ Saumon cru — pas avant 5 ans",         enfant: "⚠️ Saumon cru — déconseillé enfant" },
  "tartare":          { bebe: "⛔ Tartare cru — pas avant 5 ans",        enfant: "⚠️ Tartare cru — déconseillé enfant" },
  "carpaccio":        { bebe: "⛔ Carpaccio cru — pas avant 5 ans",      enfant: "⚠️ Carpaccio cru — déconseillé enfant" },
  "gravlax":          { bebe: "⛔ Saumon cru — pas avant 5 ans",         enfant: "⚠️ Saumon cru — déconseillé enfant" },
  // Coquillages
  "moules":           { bebe: "⛔ Coquillages — pas avant 3 ans",        enfant: "⚠️ Coquillages — risque allergie" },
  "huitre":           { bebe: "⛔ Huîtres — pas avant 3 ans",            enfant: "⚠️ Huîtres — risque allergie" },
  "huître":           { bebe: "⛔ Huîtres — pas avant 3 ans",            enfant: "⚠️ Huîtres — risque allergie" },
  "palourde":         { bebe: "⛔ Coquillages — pas avant 3 ans",        enfant: "⚠️ Coquillages — risque allergie" },
  "crevette crue":    { bebe: "⛔ Crevettes crues — pas avant 3 ans",    enfant: "⚠️ Crevettes crues" },
  // Charcuterie crue
  "jambon cru":       { bebe: "⛔ Charcuterie crue — pas avant 3 ans",   enfant: "⚠️ Charcuterie crue" },
  "prosciutto":       { bebe: "⛔ Prosciutto cru — pas avant 3 ans",     enfant: "⚠️ Charcuterie crue" },
  "nduja":            { bebe: "⛔ N'duja crue — pas avant 3 ans",        enfant: "⚠️ N'duja épicée crue" },
  "saucisson":        { bebe: "⛔ Saucisson cru — pas avant 3 ans",      enfant: null },
  "bresaola":         { bebe: "⛔ Bresaola crue — pas avant 3 ans",      enfant: "⚠️ Charcuterie crue" },
  "coppa":            { bebe: "⛔ Coppa crue — pas avant 3 ans",         enfant: "⚠️ Charcuterie crue" },
  "salami cru":       { bebe: "⛔ Salami cru — pas avant 3 ans",         enfant: "⚠️ Charcuterie crue" },
  // Allergènes risqués bébé
  "miel":             { bebe: "⛔ Miel interdit < 1 an",                 enfant: null },
  "cacahuète":        { bebe: "⛔ Arachides — risque allergie < 3 ans",  enfant: "⚠️ Arachides — risque allergie" },
  "cacahuete":        { bebe: "⛔ Arachides — risque allergie < 3 ans",  enfant: "⚠️ Arachides — risque allergie" },
  "arachide":         { bebe: "⛔ Arachides — risque allergie < 3 ans",  enfant: "⚠️ Arachides — risque allergie" },
  "noix de":          { bebe: "⛔ Fruits à coque — risque allergie",     enfant: "⚠️ Fruits à coque" },
  "noisette":         { bebe: "⛔ Fruits à coque — risque allergie",     enfant: "⚠️ Fruits à coque" },
  "amande crue":      { bebe: "⛔ Fruits à coque crus — pas avant 3 ans",enfant: null },
  // Épices fortes
  "harissa":          { bebe: "⛔ Harissa — trop épicé bébé",            enfant: "⚠️ Harissa — version douce pour enfant" },
  "piment fort":      { bebe: "⛔ Piment fort — trop épicé bébé",        enfant: "⚠️ Piment fort — version douce" },
  "piment rouge":     { bebe: "⛔ Piment — trop épicé bébé",             enfant: null },
  "sauce piquante":   { bebe: "⛔ Sauce piquante — trop épicé bébé",     enfant: "⚠️ Trop épicé pour enfant" },
  "tabasco":          { bebe: "⛔ Tabasco — trop épicé bébé",            enfant: "⚠️ Tabasco — réduire la dose" },
  "gochujang":        { bebe: "⛔ Gochujang — trop épicé bébé",          enfant: "⚠️ Gochujang — version douce" },
  "wasabi":           { bebe: "⛔ Wasabi — trop piquant bébé",           enfant: "⚠️ Wasabi — très piquant" },
  "très épicé":       { bebe: "⛔ Très épicé — pas pour bébé",           enfant: "⚠️ Très épicé — adapter dose" },
  "bien épicé":       { bebe: "⛔ Bien épicé — pas pour bébé",           enfant: "⚠️ Bien épicé — adapter" },
  "relevé":           { bebe: "⛔ Plat relevé — pas pour bébé",          enfant: "⚠️ Plat relevé — adapter pour enfant" },
  "piquant":          { bebe: "⛔ Plat piquant — pas pour bébé",         enfant: "⚠️ Plat piquant — adapter pour enfant" },
  // Alcool (subtil, peut piéger dans desserts/marinades)
  "flambé":           { bebe: "⛔ Plat flambé (alcool) — pas pour bébé", enfant: "⚠️ Plat flambé — alcool résiduel" },
  "flambée":          { bebe: "⛔ Plat flambé (alcool) — pas pour bébé", enfant: "⚠️ Plat flambé — alcool résiduel" },
  "flamber":          { bebe: "⛔ Plat flambé (alcool) — pas pour bébé", enfant: "⚠️ Plat flambé — alcool résiduel" },
  "au rhum":          { bebe: "⛔ Rhum — alcool, pas pour bébé",         enfant: "⚠️ Contient du rhum (cuit)" },
  "au cognac":        { bebe: "⛔ Cognac — alcool, pas pour bébé",       enfant: "⚠️ Contient du cognac (cuit)" },
  "au whisky":        { bebe: "⛔ Whisky — alcool, pas pour bébé",       enfant: "⚠️ Contient du whisky (cuit)" },
  "rhum":             { bebe: "⛔ Rhum — alcool, pas pour bébé",         enfant: "⚠️ Contient du rhum (cuit)" },
  "cognac":           { bebe: "⛔ Cognac — alcool, pas pour bébé",       enfant: "⚠️ Contient du cognac (cuit)" },
  "whisky":           { bebe: "⛔ Whisky — alcool, pas pour bébé",       enfant: "⚠️ Contient du whisky (cuit)" },
  "vodka":            { bebe: "⛔ Vodka — alcool, pas pour bébé",        enfant: "⚠️ Contient de la vodka" },
  "tequila":          { bebe: "⛔ Tequila — alcool, pas pour bébé",      enfant: "⚠️ Contient de la tequila" },
  "kirsch":           { bebe: "⛔ Kirsch — alcool, pas pour bébé",       enfant: "⚠️ Contient du kirsch (cuit)" },
  "amaretto":         { bebe: "⛔ Amaretto — alcool, pas pour bébé",     enfant: "⚠️ Contient de l'amaretto" },
  "marsala":          { bebe: "⛔ Marsala — alcool, pas pour bébé",      enfant: "⚠️ Contient du marsala (cuit)" },
  "vinblanc":         { bebe: "⛔ Vin blanc — alcool, pas pour bébé",    enfant: "⚠️ Contient du vin blanc (cuit)" },
  "vinrouge":         { bebe: "⛔ Vin rouge — alcool, pas pour bébé",    enfant: "⚠️ Contient du vin rouge (cuit)" },
  "vinrose":          { bebe: "⛔ Vin rosé — alcool, pas pour bébé",     enfant: "⚠️ Contient du vin rosé (cuit)" },
  "saké":             { bebe: "⛔ Saké — alcool, pas pour bébé",         enfant: "⚠️ Contient du saké (cuit)" },
  "sake":             { bebe: "⛔ Saké — alcool, pas pour bébé",         enfant: "⚠️ Contient du saké (cuit)" },
  "alcool":           { bebe: "⛔ Contient de l'alcool",                 enfant: "⚠️ Contient de l'alcool" },
  // Soupe spéciale
  "bouillabaisse":    { bebe: "⛔ Bouillabaisse — poisson, arêtes",      enfant: "⚠️ Bouillabaisse — gare aux arêtes" },
};

function getNiveauFamille(cle) {
  // Retourne: null = OK, sinon { niveau: "bebe"|"enfant", mot: "...", raison: "..." }
  const profil = getFoyerProfil();
  if (!profil) return null;
  if (!profil.hasBebe && !profil.hasEnfant) return null;
  const r = recettes?.[cle];
  // Texte = clé + description + INGRÉDIENTS du tableau
  // Sans ça, des recettes comme Smoothie Bowl (contient du miel) ne sont pas détectées
  let texte = (cle + " " + (r?.description || "")).toLowerCase();
  if (r) {
    Object.keys(r).forEach(k => {
      if (k.startsWith("tableau") && Array.isArray(r[k]) && r[k][0]) {
        // Ajouter les noms des colonnes (= ingrédients)
        texte += " " + Object.keys(r[k][0]).join(" ").toLowerCase();
      }
    });
  }
  // Garde : une boisson sans alcool (mocktail / virgin / "sans alcool") ne doit pas
  // être flaggée à cause du mot "alcool" présent dans sa description ("sans alcool")
  const estSansAlcool = /sans alcool|mocktail|virgin/.test(texte) || /mocktail|virgin/.test(cle.toLowerCase());
  if (estSansAlcool) texte = texte.replace(/alcool/g, "");

  if (profil.hasBebe) {
    const mot = MOTS_BEBE.find(m => texte.includes(m));
    if (mot) return { niveau: "bebe", mot, raison: RAISONS_FAMILLE[mot] || mot };
  }
  if (profil.hasEnfant || profil.hasBebe) {
    const mot = MOTS_ENFANT.find(m => texte.includes(m));
    if (mot) return { niveau: "enfant", mot, raison: RAISONS_FAMILLE[mot] || mot };
  }
  return null;
}

// Helper : juste le niveau (string ou null), pour compat avec l'ancien code
function getNiveauFamilleStr(cle) {
  const r = getNiveauFamille(cle);
  return r ? r.niveau : null;
}

// Helper : retourne l'étiquette explicite "⛔ Miel interdit < 1 an" ou "⚠️ Trop épicé enfant"
// Retourne null si pas d'étiquette nécessaire
function getEtiquetteFamille(cle) {
  const niv = getNiveauFamille(cle);
  if (!niv) return null;
  const mot = (niv.mot || "").toLowerCase();
  // Chercher l'étiquette correspondant au mot trouvé
  if (typeof ETIQUETTES_FAMILLE !== "undefined" && ETIQUETTES_FAMILLE[mot]) {
    const e = ETIQUETTES_FAMILLE[mot];
    return e[niv.niveau] || null;
  }
  // Fallback : générer une étiquette basique
  if (niv.niveau === "bebe") return `⛔ ${niv.raison || "Déconseillé bébé"}`;
  return `⚠️ ${niv.raison || "Déconseillé enfant"}`;
}

// ===== Niveau cuisine utilisateur =====
// Retourne le niveau numérique de la recette : 1 (facile), 2 (moyen), 3 (élevé)
function getNiveauRecette(cle) {
  const niv = recettes?.[cle]?.niveau || "";
  if (niv.includes("⭐⭐⭐") || /Élevé|Expert|Difficile/i.test(niv)) return 3;
  if (niv.includes("⭐⭐") || /Moyen|Intermédiaire/i.test(niv)) return 2;
  return 1; // ⭐ Facile par défaut
}

// Retourne le niveau MAX (numérique) que l'utilisateur accepte selon son profil
// débutant=1 (facile), intermédiaire=2 (facile+moyen), confirmé=3 (tout)
function getNiveauUtilisateurMax() {
  const niv = window.userProfile?.preferences?.niveauCuisine || "débutant";
  if (niv === "confirmé" || niv === "confirme") return 3;
  if (niv === "intermédiaire" || niv === "intermediaire") return 2;
  return 1; // débutant
}

// Une recette est-elle "au-dessus" du niveau utilisateur ?
function recetteAuDessusDuNiveau(cle) {
  return getNiveauRecette(cle) > getNiveauUtilisateurMax();
}

function getFoyerProfil() {
  const foyer = window.userProfile?.foyer;
  if (!foyer) return null;
  return {
    hasBebe:   (foyer.bebes || foyer.bébés || 0) > 0,
    hasEnfant: (foyer.enfants || 0) > 0,
    hasAdo:    (foyer.ados || 0) > 0,
    hasAdulte: (foyer.adultes || 0) > 0,
  };
}

// =============================================================================
// 👥 NOMBRE DE PERSONNES PAR DÉFAUT À L'OUVERTURE D'UNE FICHE (v258.1)
// =============================================================================
// Renvoie le nombre de personnes à pré-sélectionner quand on ouvre une recette.
// Par défaut → on suit la taille du foyer (profil). Exceptions :
//   - recettes "à l'unité" (brioche, pâtes) → gardent leur valeur de base
//   - cocktails  → adultes uniquement (alcool)
//   - mocktails  → tout le foyer SAUF les bébés
// La valeur est bornée par le min/max du tableau de la recette.
// Si pas de profil/foyer → on retombe sur data.base (comportement historique).
// =============================================================================
function calculerPersonnesPourRecette(nom) {
  const r = (typeof recettes !== "undefined") ? recettes[nom] : null;
  if (!r) return 4;

  // Bornes min/max d'après le tableau de la recette (si présent)
  let min = 1, max = 15;
  const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
  if (tabKey && r[tabKey].length > 0) {
    const lignes = r[tabKey];
    const cleNb = lignes[0].nb !== undefined ? "nb"
                : (lignes[0].patons !== undefined ? "patons" : null);
    if (cleNb) {
      min = lignes[0][cleNb] || 1;
      max = lignes[lignes.length - 1][cleNb] || 15;
      if (min < 1) min = 1;
    }
  }

  // Exceptions "à l'unité" → on garde la valeur de base (max 5)
  const unites = (window.EXCEPTIONS && window.EXCEPTIONS.unites) || [];
  if (unites.includes(nom)) {
    return Math.max(1, Math.min(5, r.base || 1));
  }

  const foyer = window.userProfile?.foyer;
  // Pas de profil/foyer → comportement historique
  if (!foyer) return r.base || 4;

  const adultes = foyer.adultes || 0;
  const ados    = foyer.ados || 0;
  const enfants = foyer.enfants || 0;
  const bebes   = foyer.bebes || foyer.bébés || 0;
  const total   = adultes + ados + enfants + bebes;

  let nb;
  if (r.cat === "cocktails") {
    nb = adultes || total;                       // alcool → adultes
  } else if (r.cat === "mocktails") {
    nb = (adultes + ados + enfants) || total;    // sans alcool → foyer sauf bébés
  } else {
    nb = total;                                  // tout le foyer
  }

  if (!nb || nb < 1) return r.base || 4;
  return Math.max(min, Math.min(max, nb));
}
window.calculerPersonnesPourRecette = calculerPersonnesPourRecette;

// === SYSTÈME NIVEAU CUISINE ===
// Détecte le niveau d'une recette : "facile" | "moyen" | "eleve"
function getNiveauRecette(cle) {
  const niv = (recettes?.[cle]?.niveau || "").toLowerCase();
  if (niv.includes("⭐⭐⭐") || niv.includes("élevé") || niv.includes("expert") || niv.includes("difficile")) return "eleve";
  if (niv.includes("⭐⭐") || niv.includes("intermédiaire") || niv.includes("moyen")) return "moyen";
  return "facile"; // ⭐ Facile ou défaut
}
// Récupère le niveau cuisine de l'utilisateur : "débutant" | "intermédiaire" | "confirmé"
function getNiveauUtilisateur() {
  return window.userProfile?.preferences?.niveauCuisine || "intermédiaire";
}
// Détermine si une recette est au-dessus du niveau utilisateur
// Retourne null si OK, sinon { niveauUser, niveauRecette, raison }
function niveauTropEleve(cle) {
  const userNiv = getNiveauUtilisateur();
  const recNiv = getNiveauRecette(cle);
  // Débutant ne devrait pas voir Moyen ou Élevé
  if (userNiv === "débutant" && (recNiv === "moyen" || recNiv === "eleve")) {
    return { niveauUser: userNiv, niveauRecette: recNiv, raison: recNiv === "eleve" ? "Recette technique (⭐⭐⭐)" : "Recette intermédiaire (⭐⭐)" };
  }
  // Intermédiaire ne devrait pas voir Élevé
  if (userNiv === "intermédiaire" && recNiv === "eleve") {
    return { niveauUser: userNiv, niveauRecette: recNiv, raison: "Recette technique (⭐⭐⭐)" };
  }
  return null; // OK
}
// Score de pondération pour la pertinence d'une recette selon le niveau utilisateur
// Plus le score est élevé, plus la recette est priorisée dans les suggestions
function scoreNiveauPourUser(cle, userNiv) {
  const recNiv = getNiveauRecette(cle);
  if (userNiv === "débutant") {
    if (recNiv === "facile") return 10;
    if (recNiv === "moyen")  return 3;
    return 0;  // eleve : très peu de chance
  }
  if (userNiv === "intermédiaire") {
    if (recNiv === "moyen")  return 10;
    if (recNiv === "facile") return 8;
    return 2;  // eleve : faible chance
  }
  // confirmé : équilibré, légèrement orienté vers les plus techniques
  if (recNiv === "eleve")  return 10;
  if (recNiv === "moyen")  return 8;
  return 6;  // facile : toujours présent mais moins prioritaire
}

// Mots-clés problématiques par profil
const FOYER_RESTRICTIONS = {
  bebe: {
    badge: "🍼",
    label: "À adapter pour bébé",
    mots: ["miel","harissa","piment","chorizo","merguez","saumon cru","thon cru",
           "tartare","carpaccio","huître","moule","crevette","fruit de mer",
           "noix","cacahuète","amande","pistache","alcool","vin","cidre",
           "charcuterie","jambon cru","saucisson","nduja","sel","épice"]
  },
  enfant: {
    badge: "🧒",
    label: "Épicé — version douce pour les enfants",
    mots: ["piment fort","harissa","curry fort","gochujang","wasabi",
           "tartare","carpaccio","sashimi","huître","bouillabaisse"]
  }
};

function getAdaptationFamille(cle) {
  const profil = getFoyerProfil();
  if (!profil) return null;

  // Récupérer le texte de la recette
  const carte = document.querySelector(`.carte[onclick*="'${cle}'"]`);
  const desc = recettes?.[cle]?.description?.toLowerCase() || "";
  const texte = (cle + " " + desc).toLowerCase();

  if (profil.hasBebe) {
    const match = FOYER_RESTRICTIONS.bebe.mots.some(m => texte.includes(m));
    if (match) return FOYER_RESTRICTIONS.bebe;
  }
  if (profil.hasEnfant) {
    const match = FOYER_RESTRICTIONS.enfant.mots.some(m => texte.includes(m));
    if (match) return FOYER_RESTRICTIONS.enfant;
  }
  return null;
}

function estCompatibleFamille(cle) {
  // STRICT : on utilise la même logique d'analyse que les cadres warning.
  // Une recette est "famille-OK" uniquement si elle n'a AUCUN warning
  // (ni rouge bébé, ni orange enfant, ni jaune à adapter).
  if (typeof getNiveauFamille === "function") {
    return getNiveauFamille(cle) === null;
  }
  // Fallback : ancienne logique si la fonction stricte n'est pas dispo
  return getAdaptationFamille(cle) === null;
}

// ===============================================================
// "MON PROFIL" — filtre strict qui combine TOUS les filtres profil :
//   - Restrictions famille (bébé/enfant)
//   - Régimes alimentaires (végétarien/vegan/pesco-végé/sans-gluten/sans-lactose)
//   - Allergies (arachides, fruits à coque, lait, œufs, gluten, ...)
//   - Allergies personnalisées
// Une recette n'apparaît que si elle passe TOUS les filtres.
// ===============================================================
function estCompatibleMonProfil(cle) {
  // 1) Filtre famille (si bébé ou enfant dans le foyer)
  if (typeof getNiveauFamille === "function" && getNiveauFamille(cle) !== null) {
    return false;
  }
  
  // 2) Filtre régimes + allergies depuis les préférences
  const prefs = window.userProfile?.preferences;
  if (prefs && typeof ALLERGENES_MOTS !== "undefined") {
    const motsExclus = new Set();
    [...(prefs.regimes||[]), ...(prefs.allergies||[]), ...(prefs.allergiesCustom||[])].forEach(a => {
      (ALLERGENES_MOTS[a] || [a]).forEach(m => motsExclus.add(m.toLowerCase()));
    });
    if (motsExclus.size > 0) {
      // Construire le texte de la recette (clé + description + ingrédients)
      const r = recettes?.[cle];
      if (!r) return true;
      let texte = (cle + " " + (r.description || "")).toLowerCase();
      Object.keys(r).forEach(k => {
        if (k.startsWith("tableau") && Array.isArray(r[k]) && r[k][0]) {
          texte += " " + Object.keys(r[k][0]).join(" ").toLowerCase();
        }
      });
      // Si un mot exclu est trouvé → refuser
      for (const m of motsExclus) {
        if (texte.includes(m)) return false;
      }
    }
  }
  
  return true;
}

// Filtre l'affichage des cartes selon le profil complet
function filtrerMonProfil() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  basculeVersGrille();
  reinitialiserRecherche();
  if (typeof cacherFiltresChips === "function") cacherFiltresChips();
  // Désactiver les autres filtres actifs
  document.querySelectorAll(".cat-btn, #menu-categories .pays-btn, #menu-pays .pays-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("btn-mon-profil")?.classList.add("active");
  document.querySelectorAll(".carte").forEach(c => {
    const cle = extraireCleRecetteCarte(c);
    const ok = !cle || estCompatibleMonProfil(cle);
    c.style.display = ok ? "" : "none";
  });
}

// Extrait la clé recette depuis l'attribut onclick d'une carte.
// Gère les 2 formats possibles :
//   - "ouvrirFiche('recette', 'calc-recette')"
//   - "document.getElementById('personnes').value=8;choisirRecette('recette')"
// Gère aussi les caractères spéciaux/accentués dans les clés (saladeniçoise, crepesSucrées...)
function extraireCleRecetteCarte(carte) {
  const onclick = carte.getAttribute("onclick") || "";
  // Chercher d'abord ouvrirFiche('xxx' ou choisirRecette('xxx')
  // [^']+ accepte tout sauf le quote, donc gère ç, é, à, etc.
  let m = onclick.match(/(?:ouvrirFiche|choisirRecette)\(\s*['"]([^'"]+)['"]/);
  if (m) return m[1];
  // Fallback : prendre la dernière capture entre quotes (souvent la clé recette)
  const tous = [...onclick.matchAll(/'([^']+)'/g)];
  if (tous.length > 0) return tous[tous.length - 1][1];
  return null;
}

// === NUTRI-SCORE : appliquer le mini badge sur toutes les cartes ===
// Calcule le Nutri-Score pour chaque recette qui a un tableau d'ingrédients
// et ajoute une pastille blanche avec lettre colorée sur l'image, en haut à droite.
function appliquerNutriScoreCartes() {
  if (typeof calculerNutriScoreRecette !== "function" || typeof recettes !== "object") return;
  
  const cartes = document.querySelectorAll(".carte");
  let nbAppliques = 0;
  
  cartes.forEach(carte => {
    // Ne pas réappliquer si déjà fait
    if (carte.querySelector(".carte-nutri")) return;
    
    // EXCLUSION : pas de Nutri-Score sur les boissons alcoolisées (cocktails)
    // ni sur les mocktails (boissons sucrées, hors-cadre Nutri-Score)
    const cat = carte.dataset.cat;
    if (cat === "cocktails" || cat === "mocktails") return;
    
    const cle = extraireCleRecetteCarte(carte);
    if (!cle) return;
    
    const r = recettes[cle];
    if (!r) return;
    
    // Trouver le tableau d'ingrédients
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey) return;
    
    // Prendre la ligne "base" (4 personnes par défaut, ou la première)
    const base = r.base || 4;
    const ligne = r[tabKey].find(l => l.nb === base || l.patons === base) || r[tabKey][0];
    if (!ligne) return;
    
    const ns = calculerNutriScoreRecette(ligne);
    if (!ns) return;
    
    // Créer le badge : pastille blanche avec lettre colorée via CSS ::before
    const badge = document.createElement("div");
    badge.className = "carte-nutri nutri-" + ns.lettre;
    badge.setAttribute("data-lettre", ns.lettre);
    badge.title = "Nutri-Score " + ns.lettre + " — Qualité nutritionnelle";
    // Insérer en PREMIER pour que le z-index fonctionne bien
    carte.insertBefore(badge, carte.firstChild);
    nbAppliques++;
  });
  
  console.log("✅ Nutri-Score appliqué sur " + nbAppliques + " cartes");
}

// v255 : Badge 📝 sur les cartes qui ont une note personnelle
// Appelée à la même fréquence que appliquerNutriScoreCartes
function appliquerBadgeNotesCartes() {
  const notes = window.userProfile?.notesRecettes || {};
  const cartes = document.querySelectorAll(".carte");
  let nbAppliques = 0;
  
  cartes.forEach(carte => {
    // Retirer un éventuel badge précédent (pour gérer le cas où la note a été supprimée)
    const ancien = carte.querySelector(".carte-note-badge");
    if (ancien) ancien.remove();
    
    const cle = extraireCleRecetteCarte(carte);
    if (!cle) return;
    
    const note = notes[cle];
    if (!note || !note.trim()) return;
    
    // Créer le badge — un aperçu de la note au survol/long-press
    const apercu = note.length > 80 ? note.slice(0, 77) + "..." : note;
    const badge = document.createElement("div");
    badge.className = "carte-note-badge";
    badge.title = "📝 " + apercu;
    badge.textContent = "📝";
    carte.appendChild(badge);
    nbAppliques++;
  });
  
  if (nbAppliques > 0) console.log("📝 Badge notes appliqué sur " + nbAppliques + " cartes");
}

// Le bouton "Mon Profil" n'apparaît que si l'utilisateur a au moins UNE restriction
// (foyer famille OU régime OU allergie)
function majBoutonMonProfil() {
  const btn = document.getElementById("btn-mon-profil");
  if (!btn) return;
  const profil = getFoyerProfil();
  const prefs = window.userProfile?.preferences;
  const aFamille = profil && (profil.hasBebe || profil.hasEnfant);
  const aRegimes = prefs && (prefs.regimes?.length > 0 || prefs.allergies?.length > 0 || prefs.allergiesCustom?.length > 0);
  btn.style.display = (aFamille || aRegimes) ? "" : "none";
}

function filtrerCategorieDrinks(souscat) {
  const menuC = document.getElementById("menu-cocktails");
  if (!menuC) return;

  if (!souscat) {
    // Clic sur "Cocktails ▾" → toggle sous-menu + afficher tous
    const visible = menuC.style.display !== "none";
    menuC.style.display = visible ? "none" : "flex";
    if (!visible) {
      // Réinitialiser les boutons du sous-menu
      menuC.querySelectorAll(".pays-btn").forEach(b => {
        b.style.background = "";
        b.style.color = "";
      });
      // Afficher tous cocktails + mocktails
      filtrerCategorieMulti(["cocktails", "mocktails"]);
      const close = (e) => {
        if (!menuC.contains(e.target) && !e.target.closest(".pays-btn")) {
          menuC.style.display = "none";
          document.removeEventListener("click", close);
        }
      };
      setTimeout(() => document.addEventListener("click", close), 150);
    }
  } else {
    // Réinitialiser les deux boutons du sous-menu
    menuC.querySelectorAll(".pays-btn").forEach(b => b.classList.remove("active"));
    // Activer uniquement le bouton cliqué
    const btnActif = menuC.querySelector(`[onclick*="${souscat}"]`);
    if (btnActif) btnActif.classList.add("active");

    // Filtrer les cartes directement (sans passer par filtrerCategorie pour éviter event.target)
    window.scrollTo({ top: 0, behavior: "smooth" });
    basculeVersGrille();
    // Désactiver les boutons de la barre principale
    document.querySelectorAll("#menu-categories .pays-btn").forEach(b => b.classList.remove("active"));
    // Filtrer
    document.querySelectorAll(".carte").forEach(c => {
      c.style.display = (c.dataset.cat === souscat) ? "" : "none";
    });
    if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
    // Garder le sous-menu visible
  }
}

function filtrerCategorieMulti(cats) {
  // Afficher toutes les cartes des catégories listées
  const cartes = document.querySelectorAll(".carte");
  cartes.forEach(c => {
    c.style.display = cats.includes(c.dataset.cat) ? "" : "none";
  });
  // Masquer section-accueil, afficher section-cartes
  const accueil = document.getElementById("section-accueil");
  const cartesSec = document.getElementById("section-cartes");
  if (accueil) accueil.style.display = "none";
  if (cartesSec) cartesSec.classList.add("visible");
}

function filtrerFamille() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  basculeVersGrille();
  document.querySelectorAll("#menu-categories .pays-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("btn-filtre-famille")?.classList.add("active");
  document.querySelectorAll(".carte").forEach(c => {
    const cle = typeof extraireCleRecetteCarte === "function" 
      ? extraireCleRecetteCarte(c)
      : c.getAttribute("onclick")?.match(/['"]([^'"]+)['"]/)?.[1];
    const ok = !cle || estCompatibleFamille(cle);
    c.style.display = ok ? "" : "none";
  });
}

function majBoutonFamille() {
  const btn = document.getElementById("btn-filtre-famille");
  if (!btn) return;
  const profil = getFoyerProfil();
  btn.style.display = (profil && (profil.hasBebe || profil.hasEnfant)) ? "" : "none";
}

// === Réinitialiser la recherche quand on change de contexte ===
// Vide la barre de recherche et oublie l'état précédent (la recherche
// repartira du nouveau contexte au prochain caractère tapé).
function reinitialiserRecherche() {
  window._etatAvantRecherche = null;
  const input = document.getElementById("search-input");
  if (input && input.value) {
    input.value = "";
    const clear = document.getElementById("search-clear");
    if (clear) clear.style.display = "none";
  }
}

function filtrerCategorie(cat) {
  // v236 : redirige vers le mode "Recettes" + active la chip catégorie correspondante
  if (typeof afficherRecettes === "function") afficherRecettes();
  // Trouver la chip catégorie correspondante et l'activer
  const chip = document.querySelector(`.filtres-chips .chip[onclick*="filtrerChipCategorie('${cat}'"]`);
  if (chip) filtrerChipCategorie(cat, chip);
}

// Filtre par pays
function filtrerPays(pays) {
  // v236 : redirige vers le mode "Recettes" + active la chip pays correspondante
  if (typeof afficherRecettes === "function") afficherRecettes();
  const chip = document.querySelector(`.filtres-chips .chip[onclick*="filtrerChipPays('${pays}'"]`);
  if (chip) filtrerChipPays(pays, chip);
}

// Calculer depuis une carte et afficher en modal
function calculer(recetteArg, personnesArg) {
  // Accepte des paramètres optionnels — sinon lit depuis le DOM (compatibilité ancien comportement)
  const recette   = recetteArg !== undefined ? recetteArg : document.getElementById("recette").value;
  const personnes = personnesArg !== undefined ? personnesArg : (parseInt(document.getElementById("personnes").value) || 1);
  const data      = recettes[recette];
  // Garde-fou : si la recette n'existe pas, on s'arrête proprement
  if (!data) {
    document.getElementById("resultat").innerHTML = `<p style="text-align:center;color:#ff8fb3;">Recette introuvable : ${recette}</p>`;
    return;
  }

  // Pizza : afficher uniquement la ligne sélectionnée en colonnes
  if (recette === "pizza" && data.tableauPatons) {
    const ligne = data.tableauPatons.find(l => l.patons === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} pâton${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauPizzaColonnes, ligne) + htmlPrixCalories("pizza", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (0–20).</p>`;
    return;
  }

  // Gaufres : tableau par nombre de gaufres
  if (recette === "gaufres" && data.tableauGaufres) {
    const ligne = data.tableauGaufres.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} gaufre${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauGaufresColonnes, ligne) + htmlPrixCalories("gaufres", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–20).</p>`;
    return;
  }

  // Cookies : tableau par nombre de cookies
  if (recette === "cookies" && data.tableauCookies) {
    const ligne = data.tableauCookies.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} cookie${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauCookiesColonnes, ligne) + htmlPrixCalories("cookies", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Goumeau
  if (recette === "goumeau" && data.tableauGoumeau) {
    const ligne = data.tableauGoumeau.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauGoumeauColonnes, ligne) + htmlPrixCalories("goumeau", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 10.</p>`;
    return;
  }

  // Galette tacos
  if (recette === "galettetacos" && data.tableauGaletteTacos) {
    const ligne = data.tableauGaletteTacos.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} galette${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauGaletteTacosColonnes, ligne) + htmlPrixCalories("galettetacos", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir 2, 4, 6, 8, 10, 12, 14 ou 16.</p>`;
    return;
  }

  // Pain burger
  if (recette === "painburger" && data.tableauPainBurger) {
    const ligne = data.tableauPainBurger.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} bun${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauPainBurgerColonnes, ligne) + htmlPrixCalories("painburger", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir 2, 4, 6, 8, 10 ou 12.</p>`;
    return;
  }

  // Pain de mie
  if (recette === "paindemie" && data.tableauPainDeMie) {
    const ligne = data.tableauPainDeMie.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} tranche${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauPainDeMieColonnes, ligne) + htmlPrixCalories("paindemie", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 20.</p>`;
    return;
  }

  // Overnight oats
  if (recette === "overnightoats" && data.tableauOvernightOats) {
    const ligne = data.tableauOvernightOats.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} pot${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauOvernightOatsColonnes, ligne) + htmlPrixCalories("overnightoats", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Buddha bowl
  if (recette === "buddhaBowl" && data.tableauBuddhaBowl) {
    const ligne = data.tableauBuddhaBowl.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} bol${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauBuddhaBowlColonnes, ligne) + htmlPrixCalories("buddhaBowl", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Soupe miso
  if (recette === "soupemiso" && data.tableauSoupeMiso) {
    const ligne = data.tableauSoupeMiso.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauSoupeMisoColonnes, ligne) + htmlPrixCalories("soupemiso", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Wrap poulet
  if (recette === "wrappoulet" && data.tableauWrapPoulet) {
    const ligne = data.tableauWrapPoulet.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} wrap${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauWrapPouletColonnes, ligne) + htmlPrixCalories("wrappoulet", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Energy balls
  if (recette === "energyballs" && data.tableauEnergyBalls) {
    const ligne = data.tableauEnergyBalls.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} ball${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauEnergyBallsColonnes, ligne) + htmlPrixCalories("energyballs", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir 4, 8, 12, 16, 20 ou 24.</p>`;
    return;
  }
  // Pancakes protéinés
  if (recette === "pancakesproteine" && data.tableauPancakesProteine) {
    const ligne = data.tableauPancakesProteine.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} pancake${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauPancakesProteineColonnes, ligne) + htmlPrixCalories("pancakesproteine", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir 2, 4, 6, 8, 10 ou 12.</p>`;
    return;
  }
  // Bowl açaï
  if (recette === "bowlacai" && data.tableauBowlAcai) {
    const ligne = data.tableauBowlAcai.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} bol${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauBowlAcaiColonnes, ligne) + htmlPrixCalories("bowlacai", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Salade pois chiches
  if (recette === "saladepoischiches" && data.tableauSaladePoisChiches) {
    const ligne = data.tableauSaladePoisChiches.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauSaladePoisChichesColonnes, ligne) + htmlPrixCalories("saladepoischiches", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }
  // Gaspacho
  if (recette === "gaspacho" && data.tableauGaspacho) {
    const ligne = data.tableauGaspacho.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauGaspachoColonnes, ligne) + htmlPrixCalories("gaspacho", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }

  // Curry de légumes
  if (recette === "curryledumes" && data.tableauCurryLegumes) {
    const ligne = data.tableauCurryLegumes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauCurryLegumesColonnes, ligne) + htmlPrixCalories("curryledumes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Smoothie bowl
  if (recette === "smoothiebowl" && data.tableauSmoothie) {
    const ligne = data.tableauSmoothie.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} bol${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauSmoothieColonnes, ligne) + htmlPrixCalories("smoothiebowl", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–6).</p>`;
    return;
  }
  // Yaourt maison
  if (recette === "yaourt" && data.tableauYaourt) {
    const ligne = data.tableauYaourt.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} yaourt${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauYaourtColonnes, ligne) + htmlPrixCalories("yaourt", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–6).</p>`;
    return;
  }

  // Pancakes
  if (recette === "pancakes" && data.tableauPancakes) {
    const ligne = data.tableauPancakes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} pancake${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauPancakesColonnes, ligne) + htmlPrixCalories("pancakes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–20).</p>`;
    return;
  }
  // Muffins
  if (recette === "muffins" && data.tableauMuffins) {
    const ligne = data.tableauMuffins.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} muffin${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauMuffinsColonnes, ligne) + htmlPrixCalories("muffins", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–24).</p>`;
    return;
  }
  // Croque-monsieur
  if (recette === "croquemonsieur" && data.tableauCroques) {
    const ligne = data.tableauCroques.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} croque${personnes > 1 ? "s" : ""}-monsieur</h3>` + renduComplet(htmlTableauCroquesColonnes, ligne) + htmlPrixCalories("croquemonsieur", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }
  // Salades d'été
  const saladesTables = {
    "saladeniçoise":       { table: "tableauSaladeNicoise",    fn: htmlTableauSaladeNicoiseColonnes,    label: "personne" },
    "saladecesar":         { table: "tableauSaladeCesar",      fn: htmlTableauSaladeCesarColonnes,      label: "personne" },
    "saladegreque":        { table: "tableauSaladeGreque",     fn: htmlTableauSaladeGrequeColonnes,     label: "personne" },
    "saladepatasthon":     { table: "tableauSaladePatas",      fn: htmlTableauSaladePatasColonnes,      label: "personne" },
    "saladerizmediterranee":{ table: "tableauSaladeRiz",       fn: htmlTableauSaladeRizColonnes,        label: "personne" },
    "tabulemaison":        { table: "tableauTabule",           fn: htmlTableauTabuleColonnes,           label: "personne" },
    "saladelentilles":     { table: "tableauSaladeLentilles",  fn: htmlTableauSaladeLentillesColonnes,  label: "personne" },
    "saladeavocatcrevettes":{ table: "tableauAvocatCrevettes", fn: htmlTableauAvocatCrevettesColonnes,  label: "personne" },
  };
  if (saladesTables[recette] && data[saladesTables[recette].table]) {
    const cfg  = saladesTables[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + renduComplet(cfg.fn, ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }

  // Tiramisu
  if (recette === "tiramisu" && data.tableauTiramisu) {
    const ligne = data.tableauTiramisu.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauTiramisuColonnes, ligne) + htmlPrixCalories("tiramisu", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }

  // Flan
  if (recette === "flan" && data.tableauFlan) {
    const ligne = data.tableauFlan.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauFlanColonnes, ligne) + htmlPrixCalories("flan", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }
  // Clafoutis
  if (recette === "clafoutis" && data.tableauClafoutis) {
    const ligne = data.tableauClafoutis.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauClafoutisColonnes, ligne) + htmlPrixCalories("clafoutis", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }
  // Tarte aux pommes
  if (recette === "tarteaupommes" && data.tableauTartePommes) {
    const ligne = data.tableauTartePommes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauTartePommesColonnes, ligne) + htmlPrixCalories("tarteaupommes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }

  // Nouvelles recettes monde et desserts
  const nRT = window._nouvellesRecettesTables || {};
  if (nRT[recette] && data[nRT[recette].table]) {
    const cfg = nRT[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + renduComplet(cfg.fn, ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Cocktails
  const cocktailsTables = {
    "mojito":             { table: "tableauMojito",       fn: htmlTableauMojitoColonnes,       label: "verre" },
    "margarita":          { table: "tableauMargarita",     fn: htmlTableauMargaritaColonnes,    label: "verre" },
    "cosmopolitan":       { table: "tableauCosmopolitan",  fn: htmlTableauCosmopolitanColonnes, label: "verre" },
    "spritz":             { table: "tableauSpritz",        fn: htmlTableauSpritzColonnes,       label: "verre" },
    "sangria":            { table: "tableauSangria",       fn: htmlTableauSangriaColonnes,      label: "verre" },
    "pinacolada":         { table: "tableauPinaColada",    fn: htmlTableauPinaColadaColonnes,   label: "verre" },
    "daiquiri":           { table: "tableauDaiquiri",      fn: htmlTableauDaiquiriColonnes,     label: "verre" },
    "whiskysour":         { table: "tableauWhiskySour",    fn: htmlTableauWhiskySourColonnes,   label: "verre" },
    "virginmojito":       { table: "tableauVirginMojito",  fn: htmlTableauVirginMojitoColonnes, label: "verre" },
    "limonademaison":     { table: "tableauLimonade",      fn: htmlTableauLimonadeColonnes,     label: "verre" },
    "smoothiemangopassion":{ table: "tableauSmoothieMango",fn: htmlTableauSmoothieMangoColonnes,label: "verre" },
    "citronadementhe":    { table: "tableauCitronade",     fn: htmlTableauCitronadeColonnes,    label: "verre" },
    "jusPastequeMenuthe": { table: "tableauJusPasteque",   fn: htmlTableauJusPastequeColonnes,  label: "verre" },
    "virginpinacolada":   { table: "tableauVirginPina",    fn: htmlTableauVirginPinaColonnes,   label: "verre" },
    "mojitorose":         { table: "tableauMojitoRose",    fn: htmlTableauMojitoRoseColonnes,   label: "verre" },
    "negroni":            { table: "tableauNegroni",        fn: htmlTableauNegroniColonnes,      label: "verre" },
    "moscowmule":         { table: "tableauMoscowMule",     fn: htmlTableauMoscowMuleColonnes,   label: "verre" },
    "pornstarmartini":    { table: "tableauPornstar",       fn: htmlTableauPornstarColonnes,     label: "verre" },
    "hugospritz":         { table: "tableauHugoSpritz",     fn: htmlTableauHugoSpritzColonnes,   label: "verre" },
    "cherryblossommocktail":{ table: "tableauCherryBlossom",fn: htmlTableauCherryBlossomColonnes,label: "verre" },
    "oldFashioned":       { table: "tableauOldFashioned",   fn: htmlTableauOldFashionedColonnes, label: "verre" },
    "gintoniqmaison":     { table: "tableauGinTonic",       fn: htmlTableauGinTonicColonnes,     label: "verre" },
    "shrubframboisebasilic":{ table: "tableauShrub",        fn: htmlTableauShrubColonnes,        label: "verre" },
    "mocktailcoconananas":{ table: "tableauCocoAnanas",     fn: htmlTableauCocoAnanasColonnes,   label: "verre" },
    "tequilasunrise":  { table: "tableauTequilaSunrise",  fn: htmlTableauTequilaSunriseColonnes, label: "verre" },
    "aperolspritzrosa":{ table: "tableauAperolRosa",      fn: htmlTableauAperolRosaColonnes,     label: "verre" },
    "espressoMartini": { table: "tableauEspressoMartini", fn: htmlTableauEspressoMartiniColonnes,label: "verre" },
    "punchfruitsrouges":{ table: "tableauPunchRouge",     fn: htmlTableauPunchRougeColonnes,     label: "verre" },
    "blueLagoon":      { table: "tableauBlueLagoon",      fn: htmlTableauBlueLagoonColonnes,     label: "verre" },
    "mimosa":          { table: "tableauMimosa",          fn: htmlTableauMimosaColonnes,         label: "verre" },
    "sidecarvintage":  { table: "tableauSidecar",         fn: htmlTableauSidecarColonnes,        label: "verre" },
    "mocktailberrybliss":{ table: "tableauBerryBliss",    fn: htmlTableauBerryBlissColonnes,     label: "verre" },
    "gingerlemondrop": { table: "tableauLemonDrop",       fn: htmlTableauLemonDropColonnes,      label: "verre" },
    "mocktailcoconorchidee":{ table: "tableauCocoOrchidee",fn: htmlTableauCocoOrchideeColonnes, label: "verre" },
  };
  if (cocktailsTables[recette] && data[cocktailsTables[recette].table]) {
    const cfg = cocktailsTables[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + renduComplet(cfg.fn, ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Paris-Brest
  if (recette === "parisbrestreinterpretation" && data.tableauParisBrest) {
    const ligne = data.tableauParisBrest.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauParisBrestColonnes, ligne) + htmlPrixCalories("parisbrestreinterpretation", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Saumon gravlax
  if (recette === "saumongravlax" && data.tableauGravlax) {
    const ligne = data.tableauGravlax.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauGravlaxColonnes, ligne) + htmlPrixCalories("saumongravlax", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }
  // Verrines tiramisu
  if (recette === "verrinetiramisu" && data.tableauVerrineTiramisu) {
    const ligne = data.tableauVerrineTiramisu.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} verrine${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauVerrineTiramisuColonnes, ligne) + htmlPrixCalories("verrinetiramisu", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }
  // Pot-au-feu
  if (recette === "potaufeu" && data.tableauPotAuFeu) {
    const ligne = data.tableauPotAuFeu.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauPotAuFeuColonnes, ligne) + htmlPrixCalories("potaufeu", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Recettes du monde + classiques
  const mondeClassiquesTables = mondeClassiquesTablesGlobal || {
    "couscous":       { table: "tableauCouscous",        fn: htmlTableauCouscousColonnes,       label: "personne" },
    "moussaka":       { table: "tableauMoussaka",         fn: htmlTableauMoussakaColonnes,       label: "personne" },
    "paella":         { table: "tableauPaella",           fn: htmlTableauPaellaColonnes,         label: "personne" },
    "butterchicken":  { table: "tableauButterChicken",    fn: htmlTableauButterChickenColonnes,  label: "personne" },
    "souvlakiagneau":       { table: "tableauSouvlaki",         fn: htmlTableauSouvlakiColonnes,       label: "personne" },
    "quichelorraine": { table: "tableauQuiche",           fn: htmlTableauQuicheColonnes,         label: "personne" },
    "soupeaoignon":   { table: "tableauSoupeOignon",      fn: htmlTableauSoupeOignonColonnes,    label: "personne" },
    "dahllentillescorail":      { table: "tableauDal",              fn: htmlTableauDalColonnes,            label: "personne" },
    "rizcantonnais":  { table: "tableauRizCantonnais",    fn: htmlTableauRizCantonnaisColonnes,  label: "personne" },
    "soupeharira":{ table: "tableauHarira",           fn: htmlTableauHariraColonnes,         label: "personne" },
    "naan":           { table: "tableauNaan",             fn: htmlTableauNaanColonnes,           label: "naan" },
    "churros":        { table: "tableauChurros",          fn: htmlTableauChurrosColonnes,        label: "personne" },
  };
  if (mondeClassiquesTables[recette] && data[mondeClassiquesTables[recette].table]) {
    const cfg = mondeClassiquesTables[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + renduComplet(cfg.fn, ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 2 et 12.</p>`;
    return;
  }

  // Recettes HelloFresh style
  const hellofreshTables = {
    "pouletcitronthym":  { table: "tableauPouletCitron",      fn: htmlTableauPouletCitronColonnes,    label: "personne" },
    "salmonteriyaki":    { table: "tableauSalmonTeriyaki",     fn: htmlTableauSalmonTeriyakiColonnes,  label: "personne" },
    "tacosmaison":       { table: "tableauTacos",              fn: htmlTableauTacosColonnes,           label: "taco" },
    "padthai":           { table: "tableauPadThai",            fn: htmlTableauPadThaiColonnes,         label: "personne" },
    "currypouletcoco":   { table: "tableauCurryPoulet",        fn: htmlTableauCurryPouletColonnes,     label: "personne" },
    "burgermaison":      { table: "tableauBurger",             fn: htmlTableauBurgerColonnes,          label: "burger" },
    "risottoprimavera":  { table: "tableauRisottoPrimavera",   fn: htmlTableauRisottoPrimaveraColonnes,label: "personne" },
    "shakshuka":         { table: "tableauShakshuka",          fn: htmlTableauShakshukaColonnes,       label: "personne" },
  };
  if (hellofreshTables[recette] && data[hellofreshTables[recette].table]) {
    const cfg = hellofreshTables[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + renduComplet(cfg.fn, ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }

  // Bœuf bourguignon
  if (recette === "boeufbourguignon" && data.tableauBoeuf) {
    const ligne = data.tableauBoeuf.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + renduComplet(htmlTableauBoeufColonnes, ligne) + htmlPrixCalories("boeufbourguignon", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }
  // Gratin dauphinois
  if (recette === "gratindauphinois" && data.tableauGratin) {
    const ligne = data.tableauGratin.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + renduComplet(htmlTableauGratinColonnes, ligne) + htmlPrixCalories("gratindauphinois", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }
  // Crème brûlée
  if (recette === "cremebrulee" && data.tableauCremebrulee) {
    const ligne = data.tableauCremebrulee.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} ramequin${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauCremeBruleeColonnes, ligne) + htmlPrixCalories("cremebrulee", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10.</p>`;
    return;
  }
  // Mousse au chocolat
  if (recette === "mousseauchocolat" && data.tableauMousse) {
    const ligne = data.tableauMousse.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + renduComplet(htmlTableauMousseColonnes, ligne) + htmlPrixCalories("mousseauchocolat", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }
  // Île flottante
  if (recette === "ileflottante" && data.tableauIleFlottante) {
    const ligne = data.tableauIleFlottante.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + renduComplet(htmlTableauIleFlottanteColonnes, ligne) + htmlPrixCalories("ileflottante", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }
  // Banana bread
  if (recette === "bananabread" && data.tableauBananaBread) {
    const ligne = data.tableauBananaBread.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauBananaBreadColonnes, ligne) + htmlPrixCalories("bananabread", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10.</p>`;
    return;
  }
  // Granola
  if (recette === "granola" && data.tableauGranola) {
    const ligne = data.tableauGranola.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} portions</h3>` + renduComplet(htmlTableauGranolaColonnes, ligne) + htmlPrixCalories("granola", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10.</p>`;
    return;
  }
  // Houmous
  if (recette === "houmous" && data.tableauHoumous) {
    const ligne = data.tableauHoumous.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + renduComplet(htmlTableauHoumousColonnes, ligne) + htmlPrixCalories("houmous", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }

  // Risotto
  if (recette === "risotto" && data.tableauRisotto) {
    const ligne = data.tableauRisotto.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauRisottoColonnes, ligne) + htmlPrixCalories("risotto", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–6).</p>`;
    return;
  }
  // Fondant au chocolat
  if (recette === "fondantchocolat" && data.tableauFondant) {
    const ligne = data.tableauFondant.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} fondant${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauFondantColonnes, ligne) + htmlPrixCalories("fondantchocolat", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }
  // Madeleine
  if (recette === "madeleine" && data.tableauMadeleine) {
    const ligne = data.tableauMadeleine.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} madeleine${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauMadeleineColonnes, ligne) + htmlPrixCalories("madeleine", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–20).</p>`;
    return;
  }
  // Velouté légumes
  if (recette === "veloutelegumes" && data.tableauVeloute) {
    const ligne = data.tableauVeloute.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauVelouteLegumesColonnes, ligne) + htmlPrixCalories("veloutelegumes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–6).</p>`;
    return;
  }

  // Tarte au citron
  if (recette === "tartecitron" && data.tableauTarteCitron) {
    const ligne = data.tableauTarteCitron.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} tartelette${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauTarteCitronColonnes, ligne) + htmlPrixCalories("tartecitron", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Salade quinoa
  if (recette === "saladequinoa" && data.tableauQuinoa) {
    const ligne = data.tableauQuinoa.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauQuinoaColonnes, ligne) + htmlPrixCalories("saladequinoa", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–8).</p>`;
    return;
  }

  // Lasagne : tableau pâte maison
  if (recette === "lasagne" && data.tableauLasagne) {
    const ligne = data.tableauLasagne.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauLasagneColonnes, ligne) + htmlPrixCalories("lasagne", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Brioche : afficher les 4 boutons de version
  if (recette === "brioche" && data.tableauBrioche) {
    const ligne = data.tableauBrioche.find(l => l.nb === personnes);
    const boutons = data.tableauBrioche.map(l => `
      <button class="btn-brioche${l.nb === personnes ? " btn-brioche-actif" : ""}"
        onclick="document.getElementById('personnes').value=${l.nb};calculer()">
        ${l.label}
      </button>`).join("");
    document.getElementById("resultat").innerHTML =
      `<div class="brioche-choix">${boutons}</div>` +
      (ligne ? `<h3>${ligne.label}</h3>` + renduComplet(htmlTableauBriocheColonnes, ligne) + htmlPrixCalories("brioche", personnes) : "");
    return;
  }

  // Crêpes : afficher uniquement la ligne sélectionnée en colonnes
  if (recette === "crepes" && data.tableauPersonnes) {
    const ligne = data.tableauPersonnes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + renduComplet(htmlTableauCrepesColonnes, ligne) + htmlPrixCalories("crepes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Recettes fixes (flan, clafoutis) : afficher les ingrédients tels quels
  if (data.fixe && data.ingredientsFixes) {
    let rows = data.ingredientsFixes.map(([k,v]) =>
      `<tr><th>${k}</th><td>${v}</td></tr>`).join("");
    document.getElementById("resultat").innerHTML =
      `<h3>Recette complète (~6 personnes)</h3>
       <table class="tableau-patons tableau-colonnes"><tbody>${rows}</tbody></table>` +
      htmlPrixCalories(recette, 6);
    return;
  }

  // Recettes avec tableau dynamique (50 nouvelles recettes du monde + autres)
  const tableauKey = Object.keys(data).find(k => k.startsWith("tableau") && Array.isArray(data[k]));
  if (tableauKey) {
    const tableau = data[tableauKey];
    const ligne = tableau.find(l => l.nb === personnes) || tableau[Math.min(personnes-1, tableau.length-1)];
    if (ligne) {
      document.getElementById("resultat").innerHTML =
        `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` +
        htmlTableauGenerique(ligne) +
        htmlPrixCalories(recette, personnes);
      return;
    }
  }

  // Autres recettes : calcul proportionnel classique
  const ratio = personnes / data.base;
  let html = `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>`;
  for (const [nom, qte] of Object.entries(data.ingredients)) {
    const qteCalculee = (qte * ratio).toFixed(1);
    html += `<div class="ingredient"><span>${nom}</span><b>${qteCalculee}</b></div>`;
  }
  document.getElementById("resultat").innerHTML = html;
}

// ========================================
// SÉLECTEUR DE PERSONNES DANS LA FICHE (en-tête)
// ========================================
// Boutons +/- intégrés dans le bandeau meta de la fiche
function changerPersonnesFiche(nom, delta) {
  const input = document.getElementById("fiche-personnes-input");
  if (!input) return;
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 15;
  let val = parseInt(input.value) || 1;
  val = Math.max(min, Math.min(max, val + delta));
  input.value = val;
  // Re-rendre toute la fiche avec la nouvelle valeur
  rerendreFiche(nom, val);
}

function onChangePersonnesFiche(nom) {
  const input = document.getElementById("fiche-personnes-input");
  if (!input) return;
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 15;
  let val = parseInt(input.value);
  if (isNaN(val) || val < min) val = min;
  if (val > max) val = max;
  input.value = val;
  rerendreFiche(nom, val);
}

// Re-affiche la fiche avec un nouveau nombre de personnes (sans rouvrir la modal)
function rerendreFiche(nom, personnes) {
  // Mettre à jour l'input #personnes si présent (utilisé par d'autres composants)
  const inputP = document.getElementById("personnes");
  if (inputP) {
    inputP.value = personnes;
    inputP.dataset.modified = "1";
  }
  // v258.3 : mémoriser la position de défilement pour que la fenêtre ne saute pas
  const scroller = document.getElementById("modal-resultat")?.parentElement;
  const y = scroller ? scroller.scrollTop : 0;
  // v257.5 : Passer la valeur en argument pour que choisirRecette l'utilise
  // (l'input #personnes n'existe pas toujours)
  choisirRecette(nom, personnes);
  // Restaurer la position exacte (recalcul synchrone → aucun saut visible)
  if (scroller) scroller.scrollTop = y;
}

// Spécial brioche : change la quantité ou le type (lait/sans lait) dans la fiche ouverte
function changerBriocheFiche(groupe, valeur) {
  // Récupérer l'état actuel depuis la version courante
  const inputP = document.getElementById("personnes");
  if (!inputP) return;
  const versionActuelle = parseInt(inputP.value) || 1;
  // version : 1=1×🥛, 2=2×🥛, 3=1×🚫, 4=2×🚫
  let qte = (versionActuelle === 1 || versionActuelle === 3) ? 1 : 2;
  let type = (versionActuelle === 1 || versionActuelle === 2) ? "lait" : "sanslait";
  
  // Appliquer le changement
  if (groupe === "qte") qte = valeur;
  else if (groupe === "type") type = valeur;
  
  // Calculer la nouvelle version
  let nouvelleVersion;
  if (type === "lait") nouvelleVersion = (qte === 1) ? 1 : 2;
  else nouvelleVersion = (qte === 1) ? 3 : 4;
  
  // Re-rendre la fiche
  rerendreFiche("brioche", nouvelleVersion);
}

// ========================================
// SÉLECTEUR DE PERSONNES DANS LA MODAL
// ========================================
// Stocke la recette actuellement affichée dans la modal pour les boutons +/-
let _recetteActuelleModal = null;

// Quand on ouvre la fiche d'une recette dans la modal,
// on stocke la clé de la recette et on configure le sélecteur
function configurerSelecteurModal(recetteCle, personnes) {
  _recetteActuelleModal = recetteCle;
  const selecteur = document.getElementById("modal-selecteur-personnes");
  const input = document.getElementById("modal-personnes-input");
  if (!selecteur || !input) return;
  
  // Trouver le tableau de la recette pour connaître min et max
  const r = recettes?.[recetteCle];
  if (!r) {
    selecteur.style.display = "none";
    return;
  }
  
  const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
  let min = 1, max = 15;
  if (tabKey && r[tabKey].length > 0) {
    const lignes = r[tabKey];
    const premier = lignes[0];
    const dernier = lignes[lignes.length - 1];
    // Champ clé : "nb" ou "patons" pour la pizza
    const cleNb = premier.nb !== undefined ? "nb" : (premier.patons !== undefined ? "patons" : null);
    if (cleNb) {
      min = premier[cleNb] || 1;
      max = dernier[cleNb] || 15;
    }
  }
  
  input.min = min;
  input.max = max;
  input.value = Math.max(min, Math.min(max, personnes));
  
  // Mettre à jour le libellé unité (galette / bun / personne / etc.)
  const unite = document.getElementById("selecteur-unite");
  if (unite) {
    const v = parseInt(input.value);
    const unites = {
      "galettetacos": ["galette", "galettes"],
      "painburger":   ["bun", "buns"],
      "pizza":        ["pâton", "pâtons"],
      "gaufres":      ["gaufre", "gaufres"],
      "cookies":      ["cookie", "cookies"],
      "madeleine":    ["madeleine", "madeleines"],
      "muffins":      ["muffin", "muffins"],
      "financiers":   ["financier", "financiers"],
      "macarons":     ["macaron", "macarons"],
      "gyoza":        ["gyoza", "gyozas"],
      "momos":        ["momo", "momos"],
      "falafel":      ["falafel", "falafels"],
      "canelebordelais": ["canelé", "canelés"],
      "sushimaison":  ["sushi", "sushis"],
      "pintxosbasques": ["pintxo", "pintxos"],
      "croissant":    ["croissant", "croissants"],
      "fondantchocolat": ["fondant", "fondants"],
      "paindemie":    ["tranche", "tranches"],
      "overnightoats": ["pot", "pots"],
      "buddhaBowl":   ["bol", "bols"],
      "smoothiebowl": ["bol", "bols"],
      "bowlacai":     ["bol", "bols"],
      "pancakes":     ["pancake", "pancakes"],
    };
    const [sing, plur] = unites[recetteCle] || ["personne", "personnes"];
    unite.textContent = v > 1 ? plur : sing;
  }
  
  // État des boutons aux bornes
  const minus = selecteur.querySelector(".calc-btn-minus");
  const plus  = selecteur.querySelector(".calc-btn-plus");
  if (minus) minus.disabled = (parseInt(input.value) <= min);
  if (plus)  plus.disabled  = (parseInt(input.value) >= max);
  
  selecteur.style.display = "flex";
}

// Bouton +/- de la modal : change la valeur et relance calculer()
function changerPersonnesModal(delta) {
  const input = document.getElementById("modal-personnes-input");
  if (!input || !_recetteActuelleModal) return;
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 15;
  let val = parseInt(input.value) || 1;
  val = Math.max(min, Math.min(max, val + delta));
  input.value = val;
  // Petite animation bump
  input.classList.remove("bump");
  void input.offsetWidth;
  input.classList.add("bump");
  // Désactiver boutons aux bornes
  const selecteur = document.getElementById("modal-selecteur-personnes");
  if (selecteur) {
    const minus = selecteur.querySelector(".calc-btn-minus");
    const plus  = selecteur.querySelector(".calc-btn-plus");
    if (minus) minus.disabled = (val <= min);
    if (plus)  plus.disabled  = (val >= max);
  }
  // Mettre à jour l'unité affichée
  const unite = document.getElementById("selecteur-unite");
  if (unite) {
    // On garde la même unité mais on ajuste singulier/pluriel
    const txt = unite.textContent;
    // Tente de retirer un éventuel "s" final pour partir de la base singulière
    const baseSing = txt.endsWith("s") ? txt.slice(0, -1) : txt;
    unite.textContent = val > 1 ? baseSing + "s" : baseSing;
  }
  // Recalculer et mettre à jour le contenu de modal-resultat
  recalculerDansModal();
}

// Quand on tape directement dans l'input
function onChangePersonnesModal() {
  const input = document.getElementById("modal-personnes-input");
  if (!input || !_recetteActuelleModal) return;
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 15;
  let val = parseInt(input.value);
  if (isNaN(val) || val < min) val = min;
  if (val > max) val = max;
  input.value = val;
  // Désactiver boutons aux bornes
  const selecteur = document.getElementById("modal-selecteur-personnes");
  if (selecteur) {
    const minus = selecteur.querySelector(".calc-btn-minus");
    const plus  = selecteur.querySelector(".calc-btn-plus");
    if (minus) minus.disabled = (val <= min);
    if (plus)  plus.disabled  = (val >= max);
  }
  recalculerDansModal();
}

// Relance calculer() pour la recette actuellement dans la modal
function recalculerDansModal() {
  if (!_recetteActuelleModal) return;
  const input = document.getElementById("modal-personnes-input");
  if (!input) return;
  const val = parseInt(input.value) || 1;
  // calculer() met à jour #resultat
  calculer(_recetteActuelleModal, val);
  // Recopier dans modal-resultat
  setTimeout(() => {
    const res = document.getElementById("resultat").innerHTML;
    document.getElementById("modal-resultat").innerHTML = res;
  }, 50);
}

function calculerCarte(recette, inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const val = parseInt(input.value) || 1;
  // Passer DIRECTEMENT à calculer() au lieu de transiter par le <select> (qui ne contient pas toutes les recettes)
  calculer(recette, val);
  setTimeout(() => {
    const res = document.getElementById("resultat").innerHTML;
    document.getElementById("modal-resultat").innerHTML = res;
    document.getElementById("modal-calc").classList.add("visible");
    // Le sélecteur +/- est maintenant intégré directement dans la fiche (en-tête meta)
    // via getSelecteurPersonnesHTML() — pas besoin d'un sélecteur séparé dans la modal
  }, 50);
}

// ========================================
// BOUTONS +/- SUR LES CARTES
// ========================================
// Change le nombre de personnes sur une carte (- 1 ou + 1)
// `delta` = +1 (bouton +) ou -1 (bouton -)
function changerPersonnes(inputId, delta, _recetteCle) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 15;
  let val = parseInt(input.value) || 1;
  val = Math.max(min, Math.min(max, val + delta));
  input.value = val;
  // Marquer comme modifié pour ne pas être écrasé par le foyer
  input.dataset.modifie = "1";
  // Petite animation visuelle "bump"
  input.classList.remove("bump");
  void input.offsetWidth; // force reflow pour relancer l'animation
  input.classList.add("bump");
  // Désactiver les boutons aux bornes (visual hint)
  const carteCalc = input.closest(".carte-calc");
  if (carteCalc) {
    const btnMinus = carteCalc.querySelector(".calc-btn-minus");
    const btnPlus  = carteCalc.querySelector(".calc-btn-plus");
    if (btnMinus) btnMinus.disabled = (val <= min);
    if (btnPlus)  btnPlus.disabled  = (val >= max);
  }
}

// Callback quand l'utilisateur tape directement dans l'input
function onInputCalcChange(inputId, _recetteCle) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const min = parseInt(input.min) || 1;
  const max = parseInt(input.max) || 15;
  let val = parseInt(input.value);
  // Si saisie invalide ou hors limites, on corrige
  if (isNaN(val) || val < min) val = min;
  if (val > max) val = max;
  input.value = val;
  input.dataset.modifie = "1";
  // Mettre à jour l'état des boutons
  const carteCalc = input.closest(".carte-calc");
  if (carteCalc) {
    const btnMinus = carteCalc.querySelector(".calc-btn-minus");
    const btnPlus  = carteCalc.querySelector(".calc-btn-plus");
    if (btnMinus) btnMinus.disabled = (val <= min);
    if (btnPlus)  btnPlus.disabled  = (val >= max);
  }
}

// La fonction appliquerPreferencesVisuelles est définie dans allergenes.js
// (elle gère allergies, régimes, famille et niveau cuisine dans une seule fonction)

// Ouvrir la fiche recette depuis une carte en lisant son input
function ouvrirFiche(recette, inputId) {
  // v241 : Tracker la vue de cette recette (persistant)
  if (typeof ajouterRecent === "function") ajouterRecent(recette);
  
  // v257.9 : Recettes "à l'unité" depuis exceptions.js (1 pâte/brioche)
  const exceptionsUnites = (window.EXCEPTIONS && window.EXCEPTIONS.unites) || [];
  
  const input = inputId ? document.getElementById(inputId) : null;
  // Si l'input existe ET n'a pas été modifié manuellement, le synchroniser avec le foyer
  if (input && !input.dataset.modifie && !exceptionsUnites.includes(recette)) {
    const foyer = window.userProfile?.foyer;
    if (foyer) {
      const r = (typeof recettes !== "undefined") ? recettes[recette] : null;
      const totalFoyer = (foyer.adultes || 0) + (foyer.ados || 0) +
                         (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0);
      let nb = totalFoyer;
      if (r) {
        if (r.cat === "cocktails") {
          nb = (foyer.adultes || 0) || totalFoyer;
        } else if (r.cat === "mocktails") {
          nb = ((foyer.adultes || 0) + (foyer.ados || 0) + (foyer.enfants || 0)) || totalFoyer;
        }
      }
      if (nb > 0) input.value = Math.min(15, Math.max(1, nb));
    }
  }
  const val = input ? (parseInt(input.value) || 1) : null;
  const inputP = document.getElementById("personnes");

  if (val !== null) {
    // Valeur venant de la carte calculateur
    if (inputP) { inputP.value = val; inputP.dataset.modified = "1"; }
  } else {
    // Pas d'inputId → initialiser depuis le foyer si non modifié manuellement
    if (inputP && !inputP.dataset.modified) {
      const foyer = window.userProfile?.foyer;
      if (foyer) {
        const nb = (foyer.adultes || 0) + (foyer.ados || 0) +
                   (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0);
        if (nb > 0) inputP.value = Math.min(15, Math.max(1, nb));
      }
    }
  }
  choisirRecette(recette);
  // v246 : Pousser un état tampon pour que le bouton retour ferme la fiche
  if (typeof window._backGuardPush === "function") window._backGuardPush();
}

// =============================================================================
// 📱 GESTION DU BOUTON RETOUR DU TÉLÉPHONE (v246 — refonte robuste)
// =============================================================================
// Approche : on push un "état tampon" dans l'historique au chargement, et au
// popstate on vérifie quelles modals sont visibles dans le DOM pour les fermer.
// =============================================================================

// Pousse un état tampon pour intercepter le prochain retour
window._backGuardPush = function() {
  try {
    history.pushState({ backGuard: Date.now() }, "");
  } catch (e) { /* PWA peut bloquer */ }
};

// Au chargement initial, on initialise le buffer
if (typeof window !== "undefined") {
  // Quand l'app démarre, on ajoute un état tampon à l'historique
  // De cette façon, le 1er bouton retour déclenche popstate au lieu de fermer
  setTimeout(() => {
    try {
      // Marquer l'état actuel comme racine
      history.replaceState({ appRoot: true }, "");
      // Pousser un état tampon (l'utilisateur est dessus)
      history.pushState({ tampon: true }, "");
    } catch (e) {}
  }, 100);
}

// Liste des modals à surveiller (id du DOM + fonction de fermeture)
const _MODALS_SURVEILLEES = [
  { id: "modal-calc",        close: () => typeof fermerModal === "function" && fermerModal() },
  { id: "modal-auth",        close: () => typeof fermerModalAuth === "function" && fermerModalAuth() },
  { id: "modal-profil",      close: () => typeof fermerModalProfil === "function" && fermerModalProfil() },
  { id: "modal-onboarding",  close: () => typeof fermerOnboarding === "function" && fermerOnboarding() },
];

// Vérifie si un élément est actuellement visible (modal ouverte)
function _modalEstVisible(el) {
  if (!el) return false;
  if (el.classList.contains("visible")) return true;
  const d = el.style.display;
  if (d === "block" || d === "flex") return true;
  // Vérifier le computed style si pas de style inline
  if (!d) {
    const cs = window.getComputedStyle(el);
    if (cs.display !== "none" && cs.visibility !== "hidden") return true;
  }
  return false;
}

// Quand le user appuie sur le bouton retour du téléphone
window.addEventListener("popstate", function(e) {
  // Trouver la modal du dessus actuellement visible
  let modalFermee = false;
  // On parcourt en ordre inverse (la dernière ouverte = la plus haute z-index)
  for (let i = _MODALS_SURVEILLEES.length - 1; i >= 0; i--) {
    const m = _MODALS_SURVEILLEES[i];
    const el = document.getElementById(m.id);
    if (_modalEstVisible(el)) {
      try { m.close(); } catch (err) { console.warn("Erreur fermeture modal:", err); }
      modalFermee = true;
      break;
    }
  }
  
  // Re-pousser un état tampon pour intercepter le PROCHAIN retour aussi
  // Sinon le user aurait besoin de 2 clics retour à chaque fois
  if (modalFermee) {
    window._backGuardPush();
  }
  // Si aucune modal n'était ouverte, on laisse le browser quitter naturellement
  // (l'historique se vide normalement)
});

// Compat : on garde modalPush/modalPop comme no-ops pour le code existant
window.modalPush = function() {};
window.modalPop = function() {};

function fermerModal() {
  const inputP = document.getElementById("personnes");
  if (inputP) delete inputP.dataset.modified;
  document.getElementById("modal-calc").classList.remove("visible");
  // Réinitialiser le sélecteur de personnes
  _recetteActuelleModal = null;
  const selecteur = document.getElementById("modal-selecteur-personnes");
  if (selecteur) selecteur.style.display = "none";
}

// Nav bottom
// === Section déplacée vers app_stats.js (v258) ===

// ============================================================
// ASSISTANT CLAUDE — Aide contextuelle par recette
// ============================================================

const CLAUDE_MAX_QUESTIONS = 5;
window._claudeHistoires = {}; // { nomRecette: { messages: [], count: 0 } }

function ouvrirChatClaude(nom) {
  const chatDiv = document.getElementById(`claude-chat-${nom}`);
  const btn = document.querySelector(`#fiche-claude-${nom} .fiche-claude-btn`);
  if (!chatDiv) return;

  const ouvert = chatDiv.style.display !== "none";
  chatDiv.style.display = ouvert ? "none" : "block";
  if (btn) btn.classList.toggle("actif", !ouvert);

  if (!ouvert) {
    // Initialiser si première ouverture
    if (!window._claudeHistoires[nom]) {
      window._claudeHistoires[nom] = { messages: [], count: 0 };
      // Message de bienvenue
      afficherMessageClaude(nom, "assistant",
        `Bonjour ! Je suis là pour vous aider avec **${getNomRecette(nom)}**. Vous pouvez me poser jusqu'à ${CLAUDE_MAX_QUESTIONS} questions — technique, substitution, timing, adaptation... Je suis là ! 👨‍🍳`
      );
    }
    majQuotaClaude(nom);
    // Focus sur l'input
    setTimeout(() => document.getElementById(`claude-input-${nom}`)?.focus(), 100);
  }
}

function majQuotaClaude(nom) {
  const quota = document.getElementById(`claude-quota-${nom}`);
  if (!quota) return;
  const hist = window._claudeHistoires[nom];
  const restant = CLAUDE_MAX_QUESTIONS - (hist?.count || 0);
  if (restant <= 0) {
    quota.textContent = "· limite atteinte";
    quota.style.color = "#ff6b6b";
  } else {
    quota.textContent = `· ${restant} question${restant > 1 ? "s" : ""} restante${restant > 1 ? "s" : ""}`;
    quota.style.color = "#aaa";
  }
}

function afficherMessageClaude(nom, role, texte) {
  const container = document.getElementById(`claude-messages-${nom}`);
  if (!container) return;
  const div = document.createElement("div");
  div.className = `claude-msg claude-msg-${role}`;
  // Markdown basique : **gras**, *italique*, \`code\`
  const html = texte
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");
  div.innerHTML = role === "assistant" ? `<span class="claude-avatar">🤖</span><div class="claude-bubble">${html}</div>`
                                       : `<div class="claude-bubble">${html}</div><span class="claude-avatar">👤</span>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

async function envoyerQuestionClaude(nom) {
  const input = document.getElementById(`claude-input-${nom}`);
  const question = input?.value?.trim();
  if (!question) return;

  // Vérifier quota
  const hist = window._claudeHistoires[nom] || { messages: [], count: 0 };
  if (hist.count >= CLAUDE_MAX_QUESTIONS) {
    afficherMessageClaude(nom, "assistant", "Vous avez atteint la limite de questions pour cette recette. Fermez et rouvrez la fiche pour recommencer ! 😊");
    return;
  }

  // Afficher la question
  afficherMessageClaude(nom, "user", question);
  input.value = "";

  // Construire le contexte de la recette
  const data = recettes?.[nom];
  const nomPropre = getNomRecette(nom);
  const desc = data?.description || "";
  const temps = data?.temps || "";

  // Construire le contexte système
  const systemPrompt = `Tu es un chef cuisinier expert et pédagogue intégré dans l'application "La Cuisine de Jéjé". 
Tu aides l'utilisateur avec la recette suivante :

**Recette : ${nomPropre}**
${desc}
Temps de préparation : ${temps}

Réponds de façon concise, pratique et bienveillante. Maximum 3-4 phrases. 
Si la question ne concerne pas cette recette ou la cuisine, redirige gentiment.
Réponds en français.`;

  // Ajouter au historique
  hist.messages.push({ role: "user", content: question });
  hist.count++;
  window._claudeHistoires[nom] = hist;
  majQuotaClaude(nom);

  // Afficher indicateur de chargement
  const loadingId = `claude-loading-${nom}-${Date.now()}`;
  const container = document.getElementById(`claude-messages-${nom}`);
  const loadingDiv = document.createElement("div");
  loadingDiv.id = loadingId;
  loadingDiv.className = "claude-msg claude-msg-assistant";
  loadingDiv.innerHTML = `<span class="claude-avatar">🤖</span><div class="claude-bubble claude-loading">...</div>`;
  container.appendChild(loadingDiv);
  container.scrollTop = container.scrollHeight;

  try {
    // Proxy Cloudflare Worker (évite le blocage CORS de GitHub Pages)
    const CLAUDE_PROXY = "https://la-cuisine-de-jeje.jerome-sainthot.workers.dev";
    const response = await fetch(CLAUDE_PROXY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 400,
        system: systemPrompt,
        messages: hist.messages
      })
    });

    const data2 = await response.json();
    // Vérifier si l'API a retourné une erreur
    if (data2.error) {
      console.error("Erreur API Claude:", data2.error);
      document.getElementById(loadingId)?.remove();
      afficherMessageClaude(nom, "assistant", `❌ Erreur : ${data2.error.message || "Problème avec l'API"}. Vérifiez votre clé API Anthropic.`);
      return;
    }
    const reponse = data2.content?.[0]?.text || "Désolé, je n'ai pas pu répondre. Réessayez !";

    // Supprimer le loading
    document.getElementById(loadingId)?.remove();

    // Afficher la réponse
    afficherMessageClaude(nom, "assistant", reponse);

    // Ajouter la réponse à l'historique
    hist.messages.push({ role: "assistant", content: reponse });

    // Limiter l'historique à 10 messages pour éviter les contextes trop longs
    if (hist.messages.length > 10) hist.messages = hist.messages.slice(-10);

  } catch(err) {
    document.getElementById(loadingId)?.remove();
    afficherMessageClaude(nom, "assistant", "Oups, une erreur s'est produite. Vérifiez votre connexion et réessayez ! 🙏");
  }
}
