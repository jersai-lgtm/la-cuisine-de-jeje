

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

function chargerAccueil() {
  chargerAccueilFavoris();
  chargerAccueilMenus();
  // v249 : Retiré — accessible via ⭐ Favoris → ❤️ Menus favoris
  // chargerAccueilMenusFavoris();
  chargerAccueilFetiches();
  chargerAccueilRecents();
  chargerAccueilSuggestions();
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
  const semaine = dernier?.menu?.semaine || [];
  if (semaine.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Aucun menu récent</div>`;
    return;
  }

  const goMenus = () => afficherSection('planificateur', document.querySelector('.nav-btn[onclick*=planificateur]'));

  // Détecter le format : repas complet ou simple
  const isComplet = semaine[0]?.midi?.plat !== undefined;
  // Détecter si c'est un menu thématique (a une propriété theme)
  const isTheme = dernier?.menu?.theme !== undefined;

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
      return `
      <div class="accueil-menu-card" onclick="goMenus()">
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
  chargerAccueilRecents();
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
  // == Ignorés ==
  nb: null, label: null, total: null,
  // == Céréales & pâtes ==
  farine: "🌾 Farine", riz: "🍚 Riz", rizS: "🍚 Riz", semoule: "🌾 Semoule",
  nouilles: "🍜 Nouilles", spaghetti: "🍝 Spaghetti", pates: "🍝 Pâtes",
  lasagne: "🍝 Feuilles de lasagne", flocons: "🌾 Flocons d'avoine",
  quinoa: "🌾 Quinoa", maizena: "🌾 Maïzena", cacao: "🍫 Cacao en poudre",
  graines: "🌱 Graines", chia: "🌱 Graines de chia", granola: "🌾 Granola",
  chapelure: "🍞 Chapelure", pain: "🍞 Pain", buns: "🍞 Buns",
  pita: "🫓 Pains pita", crepesP: "🫓 Crêpes pékinoises",
  feuilletee: "🥐 Pâte feuilletée", pate: "🫓 Pâton(s)", patons: "🫓 Pâton(s)",
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
  courge: "🎃 Courge butternut", manioc: "🫚 Manioc", navets: "🪨 Navets",
  chou: "🥬 Chou", poireaux: "🥬 Poireaux", asperges: "🌿 Asperges",
  mais: "🌽 Maïs", maïs: "🌽 Maïs", petitspois: "🫛 Petits pois",
  haricots: "🫛 Haricots verts", concombre: "🥒 Concombre", celeri: "🌿 Céleri",
  edamame: "🫛 Edamame", pois: "🫘 Pois",
  // == Légumineuses ==
  poischiches: "🫘 Pois chiches", lentilles: "🫘 Lentilles",
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
  haricotsblancs: "🫘 Haricots blancs", vinrouge: "🍷 Vin rouge",
  patefeuilletee: "🥧 Pâte feuilletée", poudreamandes: "🥥 Poudre d'amandes",
  cremepatissiere: "🍮 Crème pâtissière", sucrecaramel: "🍯 Sucre (caramel)",
  feve: "🪙 Fève",
  // === Lot 2 — Ingrédients cuisines du monde ===
  baguette: "🥖 Baguette", painpita: "🫓 Pain pita",
  haricotsverts: "🫛 Haricots verts", saucissefumee: "🌭 Saucisse fumée",
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
  gingembre: "🫚 Gingembre", galanga: "🫚 Galanga", anis: "⭐ Anis étoilé",
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
  vermicelles: "🍜 Vermicelles", edamame: "🫛 Edamame",
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
  bechamel: "🥛 Sauce béchamel", soja: "🥢 Sauce soja", chutney: "🫙 Chutney",
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
  sesame: "🫘 Graines de sésame", cacahetes: "🥜 Cacahuètes grillées",
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
  feves: "🫛 Fèves", figues: "🟣 Figues",
  pommedeterre: "🥔 Pommes de terre", maïs: "🌽 Maïs",
  haricotsnoirs: "🫘 Haricots noirs", haricotsrouges: "🫘 Haricots rouges",
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

// ==============================
// PLANIFICATEUR DE MENUS
// ==============================
// Mémorisation de l'onglet actif
window._planTabActif = "semaine";

// Switch entre onglets planificateur
function switchPlanTab(tab) {
  window._planTabActif = tab;
  const sectionSemaine = document.getElementById("section-planificateur");
  const sectionFestif  = document.getElementById("section-festif");

  // Mettre à jour tous les onglets
  ["tab-semaine","tab-semaine2"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("active", tab === "semaine");
  });
  ["tab-festif","tab-festif2"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("active", tab === "festif");
  });

  if (tab === "semaine") {
    sectionSemaine.style.display = "block";
    sectionFestif.style.display  = "none";
  } else {
    sectionSemaine.style.display = "none";
    sectionFestif.style.display  = "block";
  }
}

// Sélection thème festif (un seul à la fois)
function selectTheme(btn) {
  document.querySelectorAll("#festif-themes .plan-tag").forEach(b => b.classList.remove("plan-tag-active"));
  btn.classList.add("plan-tag-active");
}

// Menus thématiques prédéfinis
// Tous les plats disponibles par catégorie
const TOUS_LES_PLATS = ["boeufbourguignon","gratindauphinois","quichelorraine","soupeaoignon","potaufeu","pouletcitronthym","risotto","risottoprimavera","couscous","moussaka","paella","butterchicken","souvlakiagneau","dahllentillescorail","rizcantonnais","soupeharira","shakshuka","padthai","currypouletcoco","tacosmaison","bolognaisemaison","burgermaison","salmonteriyaki","curryledumes","wrappoulet","soupemiso","veloutelegumes","saumongravlax","croquemonsieur","naan","tom_yam","dorade_chermoula","pierogi","shakshukaverte","porc_pulled","braiseboeuf_asiatique","paprikashpoulet","ossobuco","tajinemouton","tikamasala","phovietnambien","carbonara","gnocchismaison","poulettandoori","pekinduckeasy","ceebujen","mafewestafricain","dosakerdosai","tteokbokki"];
const TOUTES_LES_PIZZAS = [
  "pizzamargherita","pizzareine","pizza4fromages","pizzadiavola",
  "pizzasaumonepinards","pizzavegetarienne"
];
const TOUTES_LES_ENTREES = [
  "saladeniçoise","saladecesar","saladegreque","saladepatasthon","tabulemaison",
  "saladequinoa","saladeavocatcrevettes","saladelentilles","saladepoischiches",
  "saladerizmediterranee","gaspacho","houmous","soupemiso","veloutelegumes",
  "buddhaBowl","saumongravlax"
];
const TOUS_LES_DESSERTS = [
  "tiramisu","cremebrulee","mousseauchocolat","fondantchocolat","tartecitron",
  "tarteaupommes","clafoutis","flan","madeleine","verrinetiramisu","goumeau",
  "ileflottante","bananabread","churros","parisbrestreinterpretation","muffins",
  "cookies","cheesecake","baklava","tartetatinpommes","crumblefruits","tartepistache"
];
const TOUS_LES_APEROS_ALCOOL = [
  "mojito","margarita","cosmopolitan","spritz","sangria","pinacolada","daiquiri","whiskysour",
  "mojitorose","negroni","moscowmule","pornstarmartini","hugospritz","oldFashioned","gintoniqmaison"
];
const TOUS_LES_APEROS_SANS = [
  "virginmojito","limonademaison","smoothiemangopassion","citronadementhe",
  "jusPastequeMenuthe","virginpinacolada","cherryblossommocktail","shrubframboisebasilic","mocktailcoconananas"
];
const TOUS_LES_APEROS = [...TOUS_LES_APEROS_ALCOOL, ...TOUS_LES_APEROS_SANS];

const menusFestifs = {
  festif: {
    label: "🎉 Soirée Festive",
    apero:   TOUS_LES_APEROS,
    entree:  TOUTES_LES_ENTREES,
    plat:    TOUS_LES_PLATS,
    dessert: TOUS_LES_DESSERTS,
  },
  estival: {
    label: "🌞 Menu Estival",
    apero:   [...TOUS_LES_APEROS_SANS, "spritz","mojito","daiquiri"],
    entree:  ["gaspacho","saladeniçoise","tabulemaison","saladeavocatcrevettes","saladegreque","saladecesar","saladepoischiches","saladepatasthon","smoothiebowl","houmous","saladerizmediterranee"],
    plat:    ["paella","salmonteriyaki","souvlakiagneau","saladecesar","wrappoulet","padthai","shakshuka","burgermaison","tacosmaison","saladeniçoise","saumongravlax"],
    dessert: ["tartecitron","smoothiebowl","bowlacai","clafoutis","verrinetiramisu","granola","yaourt","bananabread"],
  },
  hivernal: {
    label: "❄️ Menu Hivernal",
    apero:   ["sangria","whiskysour","limonademaison","virginmojito","cosmopolitan"],
    entree:  ["soupeaoignon","veloutelegumes","saladelentilles","soupeharira","soupemiso","houmous"],
    plat:    ["boeufbourguignon","potaufeu","gratindauphinois","couscous","moussaka","butterchicken","dahllentillescorail","quichelorraine","lasagne","risotto"],
    dessert: ["fondantchocolat","cremebrulee","ileflottante","tiramisu","mousseauchocolat","parisbrestreinterpretation","clafoutis","flan"],
  },
  mexicain: {
    label: "🇲🇽 Soirée Mexicaine",
    apero:   ["margarita","virginmojito","limonademaison","mojito","sangria"],
    entree:  ["houmous","gaspacho","saladepoischiches","tabulemaison","saladeniçoise"],
    plat:    ["tacosmaison","currypouletcoco","bolognaisemaison","padthai","burgermaison","shakshuka"],
    dessert: ["churros","mousseauchocolat","bananabread","muffins","madeleine"],
  },
  italien: {
    label: "🇮🇹 Soirée Italienne",
    apero:   ["spritz","sangria","cosmopolitan","daiquiri"],
    entree:  ["saladecesar","saladeniçoise","saladegreque","saladepatasthon","houmous"],
    plat:    ["risotto","bolognaisemaison","risottoprimavera","lasagne","paella","moussaka"],
    dessert: ["tiramisu","verrinetiramisu","mousseauchocolat","pannacotta","cremebrulee","parisbrestreinterpretation"],
  },
  healthy: {
    label: "🥗 Menu Healthy",
    apero:   [...TOUS_LES_APEROS_SANS],
    entree:  ["saladequinoa","houmous","gaspacho","smoothiebowl","bowlacai","overnightoats","buddhaBowl","saladepoischiches","tabulemaison"],
    plat:    ["buddhaBowl","wrappoulet","curryledumes","salmonteriyaki","padthai","dahllentillescorail","soupemiso","veloutelegumes","shakshuka","saladeniçoise"],
    dessert: ["smoothiebowl","bowlacai","yaourt","granola","bananabread","madeleine"],
  },
  romantique: {
    label: "💑 Dîner Romantique",
    apero:   ["cosmopolitan","spritz","daiquiri","mojito","pinacolada"],
    entree:  ["saumongravlax","saladeavocatcrevettes","saladeniçoise","saladegreque","houmous","verrinetiramisu"],
    plat:    ["salmonteriyaki","risottoprimavera","pouletcitronthym","boeufbourguignon","souvlakiagneau","butterchicken","paella"],
    dessert: ["cremebrulee","tiramisu","mousseauchocolat","fondantchocolat","tartecitron","parisbrestreinterpretation","ileflottante"],
  },
  brunch: {
    label: "☀️ Brunch Dominical",
    apero:   ["limonademaison","smoothiemangopassion","citronadementhe","jusPastequeMenuthe","virginmojito"],
    entree:  ["smoothiebowl","bowlacai","overnightoats","saladequinoa","smoothiemangopassion","yaourt","granola"],
    plat:    ["pancakes","pancakesproteine","shakshuka","croquemonsieur","muffins","overnightoats","bruschetta"],
    dessert: ["muffins","madeleine","bananabread","granola","verrinetiramisu","goumeau"],
  },
};

let menuFestifActuel = null;

async function genererMenuFestif() {
  // Vider le cache festif pour forcer un nouveau menu
  try { sessionStorage.removeItem("cuisineJeje_festif"); } catch(e) {}
  const btn = document.getElementById("btn-generer-festif");
  const personnes = document.getElementById("festif-personnes").value;
  const allergies = document.getElementById("festif-allergies").value;
  const themeBtn = document.querySelector("#festif-themes .plan-tag-active");
  const theme = themeBtn ? themeBtn.dataset.val : "festif";
  const structure = [...document.querySelectorAll(".plan-form:not(#plan-form) .plan-tag-active:not(#festif-themes .plan-tag-active)")].map(b => b.dataset.val);

  btn.textContent = "⏳ Génération en cours...";
  btn.disabled = true;

  const themeData = menusFestifs[theme];
  // Enrichir avec allergènes du profil
  let allergiesFinalesFestif = allergies ? allergies.split(",").map(a => a.trim()) : [];
  if (window.userProfile?.preferences) {
    const prefs = window.userProfile.preferences;
    if (prefs.allergies?.length) allergiesFinalesFestif = [...new Set([...allergiesFinalesFestif, ...prefs.allergies])];
    if (prefs.allergiesCustom?.length) allergiesFinalesFestif = [...new Set([...allergiesFinalesFestif, ...prefs.allergiesCustom])];
  }
  const motsExclusionFestif = new Set();
  allergiesFinalesFestif.forEach(a => {
    const mots = (typeof ALLERGENES_MOTS !== "undefined" ? ALLERGENES_MOTS[a] : null) || [a];
    mots.forEach(m => motsExclusionFestif.add(m.toLowerCase()));
  });
  const recettesDispos = Object.keys(recettes).filter(key => {
    if (motsExclusionFestif.size === 0) return true;
    const texte = texteRecette(key);
    return ![...motsExclusionFestif].some(mot => texte.includes(mot));
  }).join(", ");

  // Instructions régime pour festif
  const regimesFestif = (window.userProfile?.preferences?.regimes || []);
  let instrRegimeFestif = "";
  if (regimesFestif.includes("vegan")) instrRegimeFestif = "VEGAN STRICT : aucun produit animal.";
  else if (regimesFestif.includes("végétarien")) instrRegimeFestif = "VÉGÉTARIEN STRICT : aucune viande ni poisson.";
  else if (regimesFestif.includes("pesco-végétarien")) instrRegimeFestif = "PESCO-VÉGÉTARIEN : aucune viande (poisson autorisé).";
  if (regimesFestif.includes("sans-gluten")) instrRegimeFestif += " Sans gluten.";
  if (regimesFestif.includes("sans-lactose")) instrRegimeFestif += " Sans lactose.";

  const eviterFestif = allergiesFinalesFestif.length ? `ALLERGIES - NE JAMAIS PROPOSER : ${allergiesFinalesFestif.join(", ")}.` : "";
  const instrRegimeFestifFinal = instrRegimeFestif ? `⚠️ RÉGIME ALIMENTAIRE OBLIGATOIRE : ${instrRegimeFestif}` : "";

  // Génération locale (pas d'appel API externe, instantané et gratuit)
  {
    const pickOne = arr => shuffleArray(arr)[0];
    const notesMap = {
      apero:   ["Pour bien commencer la soirée ! 🥂","L'apéro qui met en appétit ✨","Parfait pour briser la glace 🎉","Le coup d'envoi de la soirée 🍹"],
      entree:  ["Légère et savoureuse 🌿","Une entrée qui met en appétit 😋","Fraîche et colorée 🥗","Le parfait début de repas ✨"],
      plat:    ["Le plat star de la soirée ! 🌟","Un régal assuré 🍽️","Tout le monde va adorer ! 👌","La recette qui impressionne 🏆"],
      dessert: ["Une touche sucrée pour finir 🍰","Le point final parfait ✨","On termine en beauté ! 😋","Le dessert qui fait l'unanimité 🎉"],
    };
    const catMap = [
      { key: "apero",   emoji: "🥂", label: "🥂 Apéro",  pool: themeData.apero   },
      { key: "entree",  emoji: "🥗", label: "🥗 Entrée", pool: themeData.entree  },
      { key: "plat",    emoji: "🍽️", label: "🍽️ Plat",   pool: themeData.plat    },
      { key: "dessert", emoji: "🍰", label: "🍰 Dessert", pool: themeData.dessert },
    ];
    // Filtre commun : retire les recettes incompatibles allergies/régimes/non-repas/famille
    const filtrerPool = (pool, autoriseNonRepas) => pool.filter(k => {
      if (!recettes[k]) return false;
      // Non-repas autorisés seulement pour apéro et dessert
      if (!autoriseNonRepas && RECETTES_NON_REPAS.has(k)) return false;
      // Allergies / régimes
      if (motsExclusionFestif.size > 0) {
        const texte = texteRecette(k);
        if ([...motsExclusionFestif].some(m => texte.includes(m))) return false;
      }
      // Famille : éviter rouge (bébé) — orange (enfant) reste autorisé, l'utilisateur verra l'alerte
      const niv = typeof getNiveauFamille === "function" ? getNiveauFamille(k) : null;
      if (niv?.niveau === "bebe") return false;
      return true;
    });
    menuFestifActuel = {
      theme: themeData.label,
      menu: catMap
        .filter(c => structure.length === 0 || structure.some(s => c.key.includes(s) || s.includes(c.key)))
        .map(c => {
          const autoriseNonRepas = (c.key === "apero" || c.key === "dessert");
          const poolOK = filtrerPool(c.pool, autoriseNonRepas);
          const choix = pickOne(poolOK.length ? poolOK : c.pool); // fallback ultime
          return {
            categorie: c.label,
            recette:   choix,
            note:      pickOne(notesMap[c.key])
          };
        })
    };
  }

  afficherMenuFestif(menuFestifActuel, parseInt(personnes));
  btn.textContent = "✨ Générer mon menu";
  btn.disabled = false;
}

function afficherMenuFestif(menu, personnes) {
  document.getElementById("festif-result-titre").textContent = menu.theme;
  const container = document.getElementById("festif-jours");
  container.innerHTML = "";

  // Légende famille (uniquement si le foyer a bébé/enfant)
  const profilL = typeof getFoyerProfil === "function" ? getFoyerProfil() : null;
  if (profilL && (profilL.hasBebe || profilL.hasEnfant)) {
    const legende = document.createElement("div");
    legende.className = "plan-legende-famille";
    const parts = [];
    if (profilL.hasBebe)   parts.push(`<span class="leg-item"><span class="leg-pastille bebe"></span>🍼 Déconseillé bébé</span>`);
    if (profilL.hasEnfant) parts.push(`<span class="leg-item"><span class="leg-pastille enfant"></span>🧒 Déconseillé enfant</span>`);
    parts.push(`<span class="leg-hint"><strong>🔄 Régénérer</strong> chaque item concerné</span>`);
    legende.innerHTML = parts.join("");
    container.appendChild(legende);
  }

  menu.menu.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "plan-jour";

    // Alerte famille + raison
    const niv = typeof getNiveauFamille === "function" ? getNiveauFamille(item.recette) : null;
    const lvl = niv?.niveau;
    const raison = niv?.raison || "";
    const tip = lvl === "bebe" ? `${raison} — déconseillé bébé` : lvl === "enfant" ? `${raison} — déconseillé enfant` : "";
    const styleAlerte = lvl === "bebe"   ? "border-left:3px solid #ff4444;background:rgba(255,68,68,.1)"
                      : lvl === "enfant" ? "border-left:3px solid #ff9900;background:rgba(255,153,0,.08)" : "";
    const badge = lvl === "bebe"   ? `<span title="${tip}" style="margin-left:6px">🍼</span>`
                : lvl === "enfant" ? `<span title="${tip}" style="margin-left:6px">🧒</span>` : "";
    const btn = lvl ? `<button class="plan-regen-btn" onclick="event.stopPropagation();regenItemFestif(${idx})" title="Regénérer">🔄</button>` : "";
    const motif = lvl ? `<div class="plan-motif-famille" title="${tip}" style="max-width:280px">${lvl === "bebe" ? "🍼" : "🌶️"} ${raison}</div>` : "";

    div.innerHTML = `
      <div class="plan-repas-row" style="grid-template-columns:1fr">
        <div class="plan-repas" onclick="ouvrirRecettePlan('${item.recette}', ${personnes})" style="${styleAlerte};text-align:left;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <div style="font-size:32px">${getEmoji(item.recette)}</div>
          <div style="flex:1;min-width:0">
            <div class="plan-repas-label">${item.categorie} ${badge}${btn}</div>
            <div class="plan-repas-nom" style="font-size:16px">${getNomRecette(item.recette)}</div>
            <div class="plan-repas-note">${item.note}</div>
            ${motif}
          </div>
        </div>
      </div>`;
    container.appendChild(div);
  });

  // Sauvegarder
  try { sessionStorage.setItem("cuisineJeje_festif", JSON.stringify({menu, personnes})); } catch(e) {}

  document.getElementById("festif-form").style.display = "none";
  document.getElementById("festif-result").style.display = "block";
  document.getElementById("festif-courses").style.display = "none";

  // Bouton "Sauvegarder en favori"
  injecterBoutonMenuFavori("festif-result", "thematique", menu, personnes);
}

// Régénère UN item du menu festif (apéro/entrée/plat/dessert)
function regenItemFestif(idx) {
  if (!menuFestifActuel?.menu?.[idx]) return;
  const item = menuFestifActuel.menu[idx];
  // Catégorie -> pool de candidats (selon le label)
  const cats = {
    "🥂 Apéro":   ["cocktails","mocktails"],
    "🥗 Entrée":  ["entrees","soupes","salades"],
    "🍽️ Plat":   ["plats","pizzas","healthy"],
    "🍰 Dessert": ["desserts"],
  };
  const allowedCats = cats[item.categorie] || ["plats"];

  // Mots à exclure (allergies + régimes du profil)
  const motsExclus = typeof motsExclusProfil === "function" ? motsExclusProfil() : new Set();

  // Pool : catégorie correcte + pas d'alerte famille + compatible profil
  const pool = Object.keys(recettes).filter(key => {
    if (!allowedCats.includes(categorieRecette(key))) return false;
    if (motsExclus.size > 0) {
      const texte = texteRecette(key);
      if ([...motsExclus].some(m => texte.includes(m))) return false;
    }
    const niv = typeof getNiveauFamille === "function" ? getNiveauFamille(key) : null;
    return !niv; // ni rouge ni orange
  });

  // Éviter de retomber sur l'actuelle et sur celles déjà dans le menu
  const dejaDans = new Set(menuFestifActuel.menu.map(x => x.recette));
  let candidates = pool.filter(k => !dejaDans.has(k));
  if (candidates.length === 0) candidates = pool.filter(k => k !== item.recette);
  if (candidates.length === 0) return;

  item.recette = candidates[Math.floor(Math.random() * candidates.length)];
  const personnes = parseInt(document.getElementById("festif-personnes")?.value) || 4;
  afficherMenuFestif(menuFestifActuel, personnes);
}

function afficherCoursesFestif() {
  if (!menuFestifActuel) return;
  const personnes = parseInt(document.getElementById("festif-personnes").value);
  const courses = {};

  menuFestifActuel.menu.forEach(item => {
    const ingrs = getIngredientsCourses(item.recette, personnes);
    Object.entries(ingrs).forEach(([nom, data]) => {
      if (!courses[nom]) courses[nom] = { qte: 0, raw: null };
      if (typeof data.qte === "number" && data.qte > 0) courses[nom].qte += data.qte;
      else if (data.raw) courses[nom].raw = data.raw;
    });
  });

  let html = `<p class="courses-subtitle">Pour ${personnes} personne${personnes > 1 ? "s" : ""} — ${menuFestifActuel.menu.length} plats</p>`;
  html += '<div class="courses-liste">';
  Object.entries(courses).sort((a,b) => a[0].localeCompare(b[0])).forEach(([nom, data]) => {
    const qteStr = data.qte > 0 ? (data.qte % 1 === 0 ? data.qte : data.qte.toFixed(0)) : (data.raw || "");
    html += `<div class="courses-item"><span class="courses-nom">${nom}</span><span class="courses-qte">${qteStr}</span></div>`;
  });
  html += "</div>";

  document.getElementById("festif-courses-content").innerHTML = html;
  document.getElementById("festif-result").style.display = "none";
  document.getElementById("festif-courses").style.display = "block";
}

// Charger menu festif sauvegardé
function chargerMenuFestifAuDemarrage() {
  // Si un menu favori thématique est en cours d'application, ne PAS écraser
  if (window._chargementFavoriEnCours) return;
  try {
    const raw = sessionStorage.getItem("cuisineJeje_festif");
    if (!raw) {
      document.getElementById("festif-form").style.display = "block";
      document.getElementById("festif-result").style.display = "none";
      document.getElementById("festif-courses").style.display = "none";
      return;
    }
    const saved = JSON.parse(raw);
    menuFestifActuel = saved.menu;
    document.getElementById("festif-form").style.display = "none";
    afficherMenuFestif(saved.menu, saved.personnes);
  } catch(e) {
    document.getElementById("festif-form").style.display = "block";
  }
}

let menusSemaine = null;
const STORAGE_KEY = "cuisineJeje_menus";

function toggleTag(btn) {
  btn.classList.toggle("plan-tag-active");
}

// Sauvegarde locale
function sauvegarderMenus(menus, personnes, jours) {
  try {
    const today = new Date().toLocaleDateString("fr-FR");
    const uid = window.currentUser?.uid || "anon";
    const regimes = (window.userProfile?.preferences?.regimes || []).sort().join("-");
    const key = STORAGE_KEY + "_" + today + "_" + uid + "_" + regimes;
    const data = { menus, personnes, jours, date: today };
    sessionStorage.setItem(key, JSON.stringify(data));
    // Purger les anciennes clés localStorage
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith(STORAGE_KEY)) localStorage.removeItem(k);
    });
    // Sauvegarder le menu complet en localStorage pour l'accueil
    try {
      const today2 = new Date().toLocaleDateString("fr-FR");
      const entry = { date: today2, jours: jours?.length || 5, menu: menus };
      const hist2 = JSON.parse(localStorage.getItem("cuisineJeje_histMenus") || "[]");
      const newHist2 = [entry, ...hist2.filter(h => h.date !== today2)].slice(0, 5);
      localStorage.setItem("cuisineJeje_histMenus", JSON.stringify(newHist2));
    } catch(e) {}
    // Sauvegarder aussi dans Firebase pour l'historique accueil
    if (window.currentUser && window.db) {
      const resume = menus.semaine?.slice(0, 3).map(j => ({
        jour: j.jour,
        midi: j.midi?.recette || j.midi,
        soir: j.soir?.recette || j.soir
      })) || [];
      const entry = { date: today, jours: jours?.length || 5, resume };
      const hist = window.userProfile?.historiqueMenus || [];
      const newHist = [entry, ...hist.filter(h => h.date !== today)].slice(0, 5);
      window.userProfile = window.userProfile || {};
      window.userProfile.historiqueMenus = newHist;
      window.db.collection("utilisateurs").doc(window.currentUser.uid)
        .update({ historiqueMenus: newHist })
        .catch(() => {});
    }
  } catch(e) {}
}

function chargerMenusSauvegardes() {
  try {
    const today = new Date().toLocaleDateString("fr-FR");
    const uid = window.currentUser?.uid || "anon";
    const regimes = (window.userProfile?.preferences?.regimes || []).sort().join("-");
    const key = STORAGE_KEY + "_" + today + "_" + uid + "_" + regimes;
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.date === today) return data;
    return null;
  } catch(e) { return null; }
}

function nettoyerVieuxMenus() {
  // Supprimer les menus de plus de 7 jours
  try {
    const today = new Date();
    Object.keys(localStorage).forEach(key => {
      if (!key.startsWith(STORAGE_KEY + "_")) return;
      const dateStr = key.replace(STORAGE_KEY + "_", "");
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const d = new Date(parts[2], parts[1]-1, parts[0]);
        if ((today - d) > 7 * 24 * 60 * 60 * 1000) localStorage.removeItem(key);
      }
    });
  } catch(e) {}
}

function voirFormulaire() {
  document.getElementById("plan-form").style.display = "block";
  document.getElementById("plan-result").style.display = "none";
  document.getElementById("plan-courses").style.display = "none";
}

async function genererMenus() {
  // Vider le cache pour forcer un nouveau menu
  try { sessionStorage.removeItem(STORAGE_KEY); } catch(e) {}
  const btn = document.getElementById("btn-generer");
  const personnes = document.getElementById("plan-personnes").value;
  const allergies = document.getElementById("plan-allergies").value;

  // Récupérer jours sélectionnés (dans #plan-jours-choix) ET préférences (autres tags)
  const joursSelectionnes = [...document.querySelectorAll("#plan-jours-choix .plan-tag-active")].map(b => b.dataset.val);
  const tags = [...document.querySelectorAll(".plan-tags:not(#plan-jours-choix) .plan-tag-active")].map(b => b.dataset.val);

  if (joursSelectionnes.length === 0) {
    alert("Sélectionnez au moins un jour !");
    return;
  }

  // Enrichir avec les allergènes et préférences du profil connecté
  let allergiesFinales = allergies ? allergies.split(",").map(a => a.trim()) : [];
  let tagsFinaux = [...tags];

  if (window.userProfile?.preferences) {
    const prefs = window.userProfile.preferences;
    // Ajouter régimes comme préférences
    if (prefs.regimes?.length)
      tagsFinaux = [...new Set([...tagsFinaux, ...prefs.regimes])];
    // Ajouter allergènes du profil
    if (prefs.allergies?.length)
      allergiesFinales = [...new Set([...allergiesFinales, ...prefs.allergies])];
    if (prefs.allergiesCustom?.length)
      allergiesFinales = [...new Set([...allergiesFinales, ...prefs.allergiesCustom])];
  }

  // Filtrer recettesDispos : exclure les recettes incompatibles avec les allergènes
  const motsExclusion = new Set();
  allergiesFinales.forEach(a => {
    const mots = (typeof ALLERGENES_MOTS !== "undefined" ? ALLERGENES_MOTS[a] : null) || [a];
    mots.forEach(m => motsExclusion.add(m.toLowerCase()));
  });
  tagsFinaux.forEach(tag => {
    const mots = (typeof ALLERGENES_MOTS !== "undefined" ? ALLERGENES_MOTS[tag] : null) || [];
    mots.forEach(m => motsExclusion.add(m.toLowerCase()));
  });

  const recettesFiltrees = Object.keys(recettes).filter(key => {
    if (motsExclusion.size === 0) return true;
    const texte = texteRecette(key);
    return ![...motsExclusion].some(mot => texte.includes(mot));
  });
  // Envoyer clé + nom pour aider l'IA à retourner la bonne clé
  const recettesDispos = recettesFiltrees.map(k => {
    const nom = (typeof getNomRecette === 'function') ? getNomRecette(k) : k;
    return nom !== k ? `${k} (${nom})` : k;
  }).join(", ");

  btn.textContent = "⏳ Génération en cours...";
  btn.disabled = true;
  document.getElementById("plan-result").style.display = "none";

  // Construire des instructions claires selon les régimes
  const regimesActifs = tagsFinaux.filter(t => ["végétarien","vegan","pesco-végétarien","sans-gluten","sans-lactose","protéiné","moins-viande"].includes(t));
  let instructionsRegime = "";
  if (regimesActifs.includes("vegan")) {
    instructionsRegime = "RÉGIME VEGAN STRICT : ZÉRO viande, ZÉRO poisson, ZÉRO produit animal (lait, œufs, fromage, beurre, miel). Uniquement recettes 100% végétales.";
    if (regimesActifs.includes("protéiné")) instructionsRegime += " PROTÉINÉ VEGAN : privilégier légumineuses (lentilles, pois chiches), tofu, tempeh, seitan, noix.";
  } else if (regimesActifs.includes("végétarien")) {
    instructionsRegime = "RÉGIME VÉGÉTARIEN STRICT : ZÉRO viande (bœuf, porc, poulet, agneau, canard, jambon, lardons, bacon, saucisse...), ZÉRO poisson, ZÉRO fruits de mer. Uniquement recettes sans viande ni poisson.";
    if (regimesActifs.includes("protéiné")) instructionsRegime += " PROTÉINÉ VÉGÉTARIEN : privilégier œufs, fromage, légumineuses (lentilles, pois chiches, haricots), tofu, tempeh — SANS viande ni poisson.";
  } else if (regimesActifs.includes("pesco-végétarien")) {
    instructionsRegime = "RÉGIME PESCO-VÉGÉTARIEN : ZÉRO viande (bœuf, porc, poulet, agneau, canard, jambon...). Poisson et fruits de mer autorisés.";
    if (regimesActifs.includes("protéiné")) instructionsRegime += " PROTÉINÉ : privilégier poissons, œufs, légumineuses.";
  } else if (regimesActifs.includes("protéiné")) {
    instructionsRegime = "RÉGIME PROTÉINÉ : privilégier viandes maigres (poulet, dinde, veau), poissons, œufs, légumineuses, tofu. Éviter les plats trop glucidiques.";
  } else if (regimesActifs.includes("moins-viande")) {
    instructionsRegime = "OBJECTIF MOINS DE VIANDE : maximum 2 repas avec viande sur toute la semaine. Privilégier légumes, légumineuses, poisson, œufs.";
  }
  if (regimesActifs.includes("sans-gluten")) {
    instructionsRegime += " SANS GLUTEN STRICT : aucun blé, farine de blé, pâtes, pain, semoule, couscous.";
  }
  if (regimesActifs.includes("sans-lactose")) {
    instructionsRegime += " SANS LACTOSE : aucun lait, fromage, beurre, crème fraîche, yaourt.";
  }

  const preferences = tagsFinaux.length ? `Préférences : ${tagsFinaux.join(", ")}.` : "";
  const eviter = allergiesFinales.length ? `ALLERGIES ET INTOLÉRANCES - NE JAMAIS PROPOSER ces ingrédients : ${allergiesFinales.join(", ")}.` : "";
  const instructionsRegimeFinal = instructionsRegime ? `\n⚠️ RÉGIME ALIMENTAIRE - RÈGLE ABSOLUE : ${instructionsRegime}` : "";
  const joursStr = joursSelectionnes.join(", ");
  const formatRepas = window._formatRepas || "midi-soir";

  // Ajouter un seed aléatoire pour forcer la variété
  const seed = Math.floor(Math.random() * 1000);
  const isComplet = formatRepas === "complet";
  const structureJSON = isComplet ? `{
  "semaine": [
    {
      "jour": "Lundi",
      "midi": {
        "entree": {"recette": "cleRecette", "note": "note"},
        "plat":   {"recette": "cleRecette", "note": "note"},
        "dessert":{"recette": "cleRecette", "note": "note"}
      },
      "soir": {
        "entree": {"recette": "cleRecette", "note": "note"},
        "plat":   {"recette": "cleRecette", "note": "note"},
        "dessert":{"recette": "cleRecette", "note": "note"}
      }
    }
  ]
}` : `{
  "semaine": [
    {
      "jour": "Lundi",
      "midi": {"recette": "cleRecette", "note": "courte note sympa"},
      "soir": {"recette": "cleRecette", "note": "courte note sympa"}
    }
  ]
}`;

  const reglesMidi = isComplet
    ? `- Midi et Soir : chaque repas a UNE entrée légère, UN plat principal, UN dessert
- Entrées : salades, soupes, verrines
- Plats : plats chauds consistants
- Desserts : uniquement recettes de type dessert`
    : `- Midi : plutôt salades, plats légers, healthy
- Soir : plats plus consistants et chauds`;

  const formatDesc = isComplet ? "midi et soir avec entrée/plat/dessert" : "midi et soir";
  const prompt = "Tu es un chef cuisinier créatif (seed: " + seed + "). Génère un plan de menus VARIÉ et ORIGINAL pour ces jours : " + joursStr + " (" + formatDesc + ") pour " + personnes + " personne(s).\n" +
    preferences + " " + eviter + instructionsRegimeFinal + "\n\n" +
    "Recettes disponibles : " + recettesDispos + "\n\n" +
    "RÈGLES STRICTES :\n" +
    "- Utilise UNIQUEMENT les recettes de la liste ci-dessus (déjà filtrées selon le régime)\n" +
    "- Dans le JSON, le champ \"recette\" doit contenir la CLÉ exacte (ex: \"wrappoulet\", pas \"Wrap au Poulet\")\n" +
    "- AUCUNE répétition sur toute la semaine\n" +
    "- RESPECTE ABSOLUMENT le régime alimentaire — c\'est non négociable\n" +
    "- NE JAMAIS inventer une recette qui n\'est pas dans la liste disponible\n" +
    "- Varie les cuisines (française, italienne, asiatique, mexicaine...)\n" +
    reglesMidi + "\n" +
    "- Sois CRÉATIF et VARIÉ\n\n" +
    "Réponds UNIQUEMENT en JSON valide :\n" + structureJSON;

  // Génération intelligente avec variété de cuisines
  menusSemaine = genererMenusAleatoires(joursSelectionnes, tagsFinaux, allergiesFinales);
  menusSemaine = validerRegimeMenus(menusSemaine, tagsFinaux, allergiesFinales);
  sauvegarderMenus(menusSemaine, personnes, joursSelectionnes);
  afficherMenusSemaine(menusSemaine, parseInt(personnes));

  btn.textContent = "✨ Générer mes menus";
  btn.disabled = false;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickUnique(pool, n) {
  // Pioche n éléments uniques dans pool
  const shuffled = shuffleArray(pool);
  const result = [];
  for (let i = 0; result.length < n && i < shuffled.length; i++) {
    result.push(shuffled[i]);
  }
  return result;
}


// Validation post-génération : remplacer les recettes incompatibles avec le régime
// Normaliser les clés retournées par l'IA (nom → clé)
function normaliserClesMenus(menus) {
  if (!menus?.semaine) return menus;
  // Construire index nom→clé
  const nomVersClé = {};
  if (typeof nomsAffichage !== "undefined") {
    Object.entries(nomsAffichage).forEach(([cle, nom]) => {
      nomVersClé[nom.toLowerCase()] = cle;
      nomVersClé[cle.toLowerCase()] = cle;
    });
  }
  menus.semaine.forEach(jour => {
    ["midi", "soir"].forEach(moment => {
      if (!jour[moment]?.recette) return;
      const val = jour[moment].recette;
      // Si la clé n'existe pas dans recettes{}, chercher par nom
      if (typeof recettes !== "undefined" && !recettes[val]) {
        const cle = nomVersClé[val.toLowerCase()];
        if (cle && recettes[cle]) {
          jour[moment].recette = cle;
        }
      }
    });
  });
  return menus;
}

function validerRegimeMenus(menus, regimes, allergies) {
  if (!menus?.semaine) return menus;

  // Construire mots interdits
  const motsInterdits = new Set();
  regimes.forEach(r => {
    (ALLERGENES_MOTS[r] || []).forEach(m => motsInterdits.add(m.toLowerCase()));
  });
  allergies.forEach(a => {
    (ALLERGENES_MOTS[a] || [a]).forEach(m => motsInterdits.add(m.toLowerCase()));
  });

  if (motsInterdits.size === 0) return menus;

  // Tester une recette
  function recetteCompatible(key) {
    if (!key) return false;
    const r = recettes[key];
    if (!r) return false; // clé inconnue = invalide
    let texte = (key + " " + (r.description || "")).toLowerCase();
    Object.keys(r).forEach(k => {
      if (k.startsWith("tableau") && Array.isArray(r[k]) && r[k].length > 0) {
        texte += " " + Object.keys(r[k][0]).join(" ").toLowerCase();
      }
    });
    return ![...motsInterdits].some(m => texte.includes(m));
  }

  // Pool de recettes valides non utilisées
  const utilisees = new Set();
  menus.semaine.forEach(j => {
    if (j.midi?.recette) utilisees.add(j.midi.recette);
    if (j.soir?.recette) utilisees.add(j.soir.recette);
  });

  const recettesValides = Object.keys(recettes).filter(k => recetteCompatible(k));

  // Remplacer toute recette incompatible OU inconnue
  menus.semaine.forEach(jour => {
    ["midi", "soir"].forEach(moment => {
      const repas = jour[moment];
      if (!repas) return;
      const key = repas.recette;

      if (!recetteCompatible(key)) {
        // Trouver alternative valide non encore utilisée
        const alt = recettesValides.find(k => !utilisees.has(k));
        if (alt) {
          console.log(`[Régime] ${key} → remplacé par ${alt}`);
          utilisees.delete(key);
          utilisees.add(alt);
          repas.recette = alt;
          repas.note = "✅ Adapté à votre régime";
        }
      }
    });
  });

  return menus;
}
function corrigerDoublons(menus, joursSelectionnes, tags, allergies) {
  // Collecter toutes les recettes utilisées
  const utilisees = new Set();
  menus.semaine.forEach(j => {
    utilisees.add(j.midi.recette);
    utilisees.add(j.soir.recette);
  });
  
  // Si doublon détecté (midi = soir ou recette déjà vue)
  const vus = new Set();
  menus.semaine.forEach(j => {
    // Doublon midi=soir
    if (j.midi.recette === j.soir.recette) {
      // Remplacer le soir par une recette non utilisée
      const nouveauPlat = shuffleArray(tousPlatsDispos(tags)).find(r => !vus.has(r) && r !== j.midi.recette);
      if (nouveauPlat) j.soir.recette = nouveauPlat;
    }
    // Doublon avec un jour précédent
    if (vus.has(j.midi.recette)) {
      const nouveau = shuffleArray(toutesSaladesDispos()).find(r => !vus.has(r));
      if (nouveau) j.midi.recette = nouveau;
    }
    if (vus.has(j.soir.recette)) {
      const nouveau = shuffleArray(tousPlatsDispos(tags)).find(r => !vus.has(r));
      if (nouveau) j.soir.recette = nouveau;
    }
    vus.add(j.midi.recette);
    vus.add(j.soir.recette);
  });
  return menus;
}

function tousPlatsDispos(tags) {
  const filtrerHealthy = tags && tags.includes("healthy");
  return filtrerHealthy
    ? ["curryledumes","wrappoulet","soupemiso","veloutelegumes","salmonteriyaki","dahllentillescorail","padthai","buddhaBowl"]
    : ["lasagne","boeufbourguignon","gratindauphinois","quichelorraine","soupeaoignon","potaufeu","pouletcitronthym","risotto","risottoprimavera","couscous","moussaka","paella","butterchicken","souvlakiagneau","dahllentillescorail","rizcantonnais","soupeharira","shakshuka","padthai","currypouletcoco","tacosmaison","bolognaisemaison","burgermaison","salmonteriyaki","curryledumes","wrappoulet","soupemiso","veloutelegumes","naan","tom_yam","dorade_chermoula","pierogi","shakshukaverte","porc_pulled","braiseboeuf_asiatique","paprikashpoulet","ossobuco","tajinemouton","tikamasala","phovietnambien","carbonara","gnocchismaison","poulettandoori","pekinduckeasy","ceebujen","mafewestafricain","pouletbasquaise","pouletrotiperfect","saumoncrouteherbes","bibimbap","moquecabresil","rendangboeuf"];
}

function toutesSaladesDispos() {
  return ["saladeniçoise","saladecesar","saladegreque","saladepatasthon","tabulemaison","saladequinoa","saladeavocatcrevettes","saladelentilles","saladepoischiches","saladerizmediterranee","gaspacho","buddhaBowl","smoothiebowl","houmous","overnightoats","wrappoulet","croquemonsieur","shakshuka","veloutelegumes","soupemiso","misoramenleger","semoulecourgette"];
}

function genererMenusAleatoires(joursSelectionnes, regimes, allergies) {
  // Construire mots interdits depuis régimes et allergies
  const motsInterdits = new Set();
  (regimes || []).forEach(r => {
    (ALLERGENES_MOTS[r] || []).forEach(m => motsInterdits.add(m.toLowerCase()));
  });
  (allergies || []).forEach(a => {
    (ALLERGENES_MOTS[a] || [a]).forEach(m => motsInterdits.add(m.toLowerCase()));
  });

  // Catégories à exclure des menus
  const catsExclues = new Set(["boulangerie","cocktails","mocktails","desserts"]);
  // Recettes à exclure spécifiquement des repas
  const _recExclues2 = new Set([
    // Boulangerie
    "croissant","patepizza","patelasagne","financiers","painbaguette","paindemie",
    "patefeuilletee","patebrisee","patesablee","painburger","galettetacos",
    "sconeBritish","naan","bananabread","brioche","painlevain",
    // Petit-déjeuner / pas repas principal
    "overnightoats","granolaMaison","chocolatChaud","smoothiebowl","bowlacai",
    "pancakesproteine","energyballs","smoothiemangopassion","jusPastequeMenuthe",
    "citronadementhe","limonademaison",
    // Desserts
    "tartetatinpommes","tartepistache","tartechocolatcaramel","madeleine","muffins",
    "crepes","baklava","churros","cremebrulee","mousseauchocolat","fondantchocolat",
    "ileflottante","verrinetiramisu","tiramisufraise","parisbrestreinterpretation",
    "tartecitron","tarteaupommes","verrineframboisechocolat","coulantchocolat",
    "tiramisufraise","mousseauchocolat","crepesbretonnes",
    // Cocktails/mocktails
    "mojito","margarita","cosmopolitan","spritz","sangria","pinacolada","daiquiri",
    "whiskysour","virginmojito","mojitorose","negroni","moscowmule","pornstarmartini",
    "hugospritz","cherryblossommocktail","oldFashioned","gintoniqmaison",
    "shrubframboisebasilic","mocktailcoconananas","coktailcosmopolitan",
    "mocktailmentheagume","virginpinacolada"
  ]);

  // Filtrer les recettes compatibles
  let pool = Object.keys(recettes).filter(key => {
    // Exclure les non-repas (boulangerie/desserts/cocktails/brunch) — liste fiable
    if (RECETTES_NON_REPAS.has(key)) return false;
    // Sécurité supplémentaire via la catégorie (depuis la donnée, pas le DOM)
    if (catsExclues.has(categorieRecette(key))) return false;
    if (motsInterdits.size === 0) return true;
    const texte = texteRecette(key);
    return ![...motsInterdits].some(m => texte.includes(m));
  });

  // Anti-répétition récente : exclure les recettes faites depuis moins de 7 jours
  // Soft : si après filtre il reste moins de 30 recettes, on relâche cette contrainte.
  if (typeof dernierUsageRecette === "function") {
    const poolFiltre = pool.filter(key => {
      const dern = dernierUsageRecette(key);
      return !dern || dern.jours >= 7;
    });
    if (poolFiltre.length >= 30) pool = poolFiltre;
  }

  // Filtre famille — pas d'exclusion, juste signalement visuel après génération
  const foyerProfil = typeof getFoyerProfil === "function" ? getFoyerProfil() : null;
  const poolFinal = pool;

  // Grouper par cuisine pour varier
  const cuisines = {
    francaise: poolFinal.filter(k => {
      const t = (k + " " + (recettes[k]?.description||"")).toLowerCase();
      return t.includes("français") || t.includes("france") || ["gratindauphinois","soupeaoignon","ratatouille","quichelorraine","poireauVinaigrette","veloutecourgette","veloutePoiron","camembertRoti"].includes(k);
    }),
    italienne: poolFinal.filter(k => ["risotto","risottoprimavera","risottoMilanese","lasagneviande","gnocchismaison","pizzamargherita","pizzavegetarienne","pizzabresilienne","lemonPasta","spaetzle"].includes(k)),
    asiatique: poolFinal.filter(k => {
      const t = (k + " " + (recettes[k]?.description||"")).toLowerCase();
      return t.includes("asiat") || t.includes("japonais") || t.includes("thaï") || t.includes("coréen") || t.includes("wok") || ["padthai","sushimaison","bibimbap","gyozas","tom_yam","sobejaponais","noodlesWok","tofusaute","soupemiso","pouletMisoGingembre","pouletteriyaki","curryverthai","koreanfriedchicken","soupeAziatique"].includes(k);
    }),
    mondiale: poolFinal.filter(k => ["couscous","moussaka","paella","dahllentillescorail","soupeharira","maffeSenegal","souvlakiagneau","taboule","tabulemaison","shakshuka","pierogi","falafel","humous","houmous","gyozas","bibimbap"].includes(k))
  };

  // Mélanger chaque groupe
  Object.keys(cuisines).forEach(c => { cuisines[c] = shuffleArray(cuisines[c]); });
  
  // Pool global mélangé
  const melange = shuffleArray([...pool]);
  const utilises = new Set();
  
  // Alterner les cuisines
  let cuisineIdx = { francaise:0, italienne:0, asiatique:0, mondiale:0 };
  const cuisineOrder = shuffleArray(["francaise","italienne","asiatique","mondiale"]);
  let cuisineCount = 0;
  
  const pick = () => {
    // Essayer d'alterner les cuisines
    if (cuisineCount < cuisineOrder.length) {
      const cuisine = cuisineOrder[cuisineCount];
      cuisineCount++;
      const arr = cuisines[cuisine];
      if (arr) {
        const r = arr.find(k => !utilises.has(k));
        if (r) { utilises.add(r); return r; }
      }
    }
    // Fallback : pool global
    const r = melange.find(k => !utilises.has(k));
    if (r) utilises.add(r);
    return r || melange[0] || "risotto";
  };

  const jours = joursSelectionnes;
  const isComplet = window._formatRepas === "complet";

  // Pool séparé pour desserts
  let poolDesserts = Object.keys(recettes).filter(key => categorieRecette(key) === "desserts");
  // Fallback ultime si jamais cat manquait
  if (poolDesserts.length === 0) {
    poolDesserts = RECETTES_DESSERTS.filter(k => recettes[k]);
  }
  const melangeD = shuffleArray([...poolDesserts]);
  const utilisesD = new Set();
  const pickDessert = () => {
    const r = melangeD.find(k => !utilisesD.has(k));
    if (r) utilisesD.add(r);
    return r || poolDesserts[0] || "mousseauchocolat";
  };

  // Pool entrées (salades, soupes)
  const poolEntrees = melange.filter(key => {
    const r = recettes[key];
    const texte = (key + " " + (r?.description||"")).toLowerCase();
    return texte.includes("salade") || texte.includes("soupe") || texte.includes("velouté") || texte.includes("gaspacho") || texte.includes("verrine");
  });
  const melangeE = shuffleArray([...poolEntrees]);
  const utilisesE = new Set();
  const pickEntree = () => {
    const r = melangeE.find(k => !utilisesE.has(k) && !utilises.has(k));
    if (r) { utilisesE.add(r); utilises.add(r); }
    return r ? { recette: r, note: "Pour bien commencer ! 🥗" } : null;
  };

  return {
    semaine: jours.map(jour => {
      if (isComplet) {
        return {
          jour,
          midi: {
            entree:  pickEntree() || { recette: pick(), note: "En entrée 🥗" },
            plat:    { recette: pick(), note: "Bon appétit ! 🍽️" },
            dessert: { recette: pickDessert(), note: "Pour finir ! 🍰" }
          },
          soir: {
            entree:  pickEntree() || { recette: pick(), note: "En entrée 🥗" },
            plat:    { recette: pick(), note: "Régal assuré ! ✨" },
            dessert: { recette: pickDessert(), note: "Bonne nuit ! 🍰" }
          }
        };
      }
      return {
        jour,
        midi: { recette: pick(), note: "Bon appétit ! 🍽️" },
        soir: { recette: pick(), note: "Régal assuré ! ✨" }
      };
    })
  };
}


function getNomRecette(key) {
  const nomsAffichage = {
    "croquemonsieur":"Croque-monsieur","cremebrulee":"Crème brûlée",
    "tarteaupommes":"Tarte aux pommes","tartecitron":"Tarte au citron",
    "boeufbourguignon":"Bœuf bourguignon","gratindauphinois":"Gratin dauphinois",
    "mousseauchocolat":"Mousse au chocolat","fondantchocolat":"Fondant au chocolat",
    "ileflottante":"Île flottante","bananabread":"Banana bread",
    "veloutelegumes":"Velouté de légumes","saladeniçoise":"Salade niçoise",
    "saladecesar":"Salade César","saladegreque":"Salade grecque",
    "saladepatasthon":"Salade pâtes thon","saladerizmediterranee":"Salade riz méditerranéenne",
    "tabulemaison":"Taboulé maison","saladelentilles":"Salade de lentilles",
    "saladeavocatcrevettes":"Salade avocat crevettes","smoothiebowl":"Smoothie Bowl",
    "saladequinoa":"Salade de quinoa","overnightoats":"Overnight Oats",
    "buddhaBowl":"Buddha Bowl","soupemiso":"Soupe Miso","wrappoulet":"Wrap au Poulet",
    "energyballs":"Energy Balls","pancakesproteine":"Pancakes Protéinés",
    "bowlacai":"Bowl Açaï","saladepoischiches":"Salade de Pois Chiches",
    "gaspacho":"Gaspacho","curryledumes":"Curry de Légumes",
    "painbaguette":"Pain — Baguette","paindemie":"Pain de mie",
    "patefeuilletee":"Pâte feuilletée","patebrisee":"Pâte brisée","patesablee":"Pâte sablée",
    "pizza":"Pâte à Pizza",
    "goumeau":           "Galette de Goumeau",
    "burgermaison":      "Burger Maison",
    "bolognaisemaison":  "Bolognaise Maison",
    "tacosmaison":       "Tacos Maison",
    "padthai":           "Pad Thaï",
    "currypouletcoco":   "Curry Poulet Coco",
    "pouletcitronthym":  "Poulet Citron & Thym",
    "salmonteriyaki":    "Saumon Teriyaki",
    "risottoprimavera":  "Risotto Primavera",
    "saumongravlax":     "Saumon Gravlax",
    "shakshuka":         "Shakshuka",
    "couscous":          "Couscous Royal",
    "moussaka":          "Moussaka",
    "paella":            "Paella",
    "butterchicken":     "Butter Chicken",
    "souvlakiagneau":          "Souvlaki",
    "quichelorraine":    "Quiche Lorraine",
    "soupeaoignon":      "Soupe à l'Oignon",
    "dahllentillescorail":         "Dal Indien",
    "rizcantonnais":     "Riz Cantonnais",
    "soupeharira":   "Harira Marocaine",
    "naan":              "Naans",
    "verrinetiramisu":   "Verrines Tiramisu",
    "churros":           "Churros",
    "potaufeu":          "Pot-au-Feu",
    "parisbrestreinterpretation": "Paris-Brest",
    "mojito":            "Mojito",
    "margarita":         "Margarita",
    "cosmopolitan":      "Cosmopolitan",
    "spritz":            "Spritz Aperol",
    "sangria":           "Sangria",
    "pinacolada":        "Piña Colada",
    "daiquiri":          "Daiquiri",
    "whiskysour":        "Whisky Sour",
    "virginmojito":      "Virgin Mojito",
    "limonademaison":    "Limonade Maison",
    "smoothiemangopassion": "Smoothie Mangue Passion",
    "citronadementhe":   "Citronnade à la Menthe",
    "jusPastequeMenuthe":"Jus Pastèque Menthe",
    "virginpinacolada":  "Virgin Piña Colada",
    "mojitorose":        "Mojito Rosé",
    "negroni":           "Negroni",
    "moscowmule":        "Moscow Mule",
    "pornstarmartini":   "Porn Star Martini",
    "hugospritz":        "Hugo Spritz",
    "cherryblossommocktail": "Cherry Blossom",
    "oldFashioned":      "Old Fashioned",
    "gintoniqmaison":    "Gin Tonic Maison",
    "shrubframboisebasilic": "Shrub Framboise Basilic",
    "mocktailcoconananas":   "Mocktail Coco Ananas",
    "painburger":        "Pain Burger (Buns)",
    "galettetacos":      "Galette à Tacos",
    "tartetatinpommes": "Tarte Tatin aux Pommes",
    "croissant": "Croissants au Beurre",
    "verrineframboisechocolat": "Verrines Framboise Chocolat",
    "sauteporc": "Sauté de Porc aux Légumes",
    "veloutecourgette": "Velouté de Courgettes",
    "ratatouille": "Ratatouille Provençale",
    "financiers": "Financiers aux Amandes",
    "choufleurgratin": "Gratin de Chou-fleur",
    "salmongrillee": "Saumon Grillé au Citron",
    "sobejaponais": "Soba Japonais Froids",
    "tartepistache": "Tarte à la Pistache",
    "agneluroti": "Gigot d'Agneau Rôti",
    "crepesbretonnes": "Galettes Bretonnes",
    "stroganov": "Bœuf Stroganoff",
    "pizzahawaienne": "Pizza Hawaïenne",
    "pouletescalopes": "Escalopes de Poulet Panées",
    "tofusaute": "Tofu Sauté Teriyaki",
    "saladecaprese": "Salade Caprese",
    "moulesmarinieres": "Moules Marinières",
    "coktailcosmopolitan": "Sex on the Beach",
    "mocktailmentheagume": "Mocktail Menthe Concombre",
    "tartechocolatcaramel": "Tarte Chocolat Caramel",
    "soupeharira": "Harira Marocaine",
    "blanquetteveau": "Blanquette de Veau",
    "navarin": "Navarin d'Agneau",
    "camembertRoti": "Camembert Rôti",
    "tarteFlambee": "Tarte Flambée",
    "pouletMisoGingembre": "Poulet Miso Gingembre",
    "noodlesWok": "Noodles Sautés Wok",
    "maffeSenegal": "Maafé Poulet",
    "gazpachoMelon": "Gaspacho de Melon",
    "wafflesSales": "Gaufres Salées",
    "choucroute": "Choucroute Garnie",
    "sconeBritish": "Scones",
    "calamarsRomaine": "Calamars à la Romaine",
    "baklava": "Baklava",
    "eggsBenedict": "Eggs Benedict",
    "porkBelly": "Pork Belly Caramélisé",
    "veloutePoiron": "Velouté de Potiron",
    "chocolatChaud": "Chocolat Chaud",
    "granolaMaison": "Granola Maison",
    "pizzachorizo": "Pizza Chorizo",
    "pouletteriyaki": "Poulet Teriyaki",
    "curryverthai": "Curry Vert Thaï",
    "chiliconcarneV": "Chili Con Carne",
    "koreanfriedchicken": "Korean Fried Chicken",
    "risottoMilanese": "Risotto Milanese",
    "soupeAziatique": "Soupe Asiatique",
    "tartareSaumon": "Tartare de Saumon",
    "tiramisufraise": "Tiramisu aux Fraises",
    "pouletCocoLemon": "Poulet Coco Citron",
    "crepesSucrées": "Crêpes Sucrées",
    "poireauVinaigrette": "Poireaux Vinaigrette",
    "spaetzle": "Spätzle",
    "wagyuBurger": "Burger Wagyu",
    "lemonPasta": "Lemon Pasta",
    "soupeMinestrone": "Minestrone",
    "lasagneviande":     "Lasagnes Bolognaise",
    "souvlakiagneau":          "Souvlaki",
    "butterchicken":     "Butter Chicken",
    "risottoprimavera":  "Risotto Primavera",
    "bolognaisemaison":  "Bolognaise Maison",
    "tacosmaison":       "Tacos Maison",
    "couscous":          "Couscous Royal",
    "moussaka":          "Moussaka",
    "paella":            "Paella",
    "quichelorraine":    "Quiche Lorraine",
    "dahllentillescorail":         "Dal Indien",
    "pizzabresilienne":  "Pizza Brésilienne",
    "veloutepatatepoireaux": "Velouté Patate Poireaux",
    "semoulecourgette":  "Semoule aux Courgettes",
    "shakshukaverte":    "Shakshuka Verte",
    "pizzafromages":     "Pizza 4 Fromages",
    "pizzachorizo":      "Pizza Chorizo",
    "pizzamargherita":   "Pizza Margherita",
    "tortillaespagnole": "Tortilla Espagnole",
    "ossobuco":          "Osso Buco",
    "blanquetteveau":    "Blanquette de Veau",
    "navarin":           "Navarin d\'Agneau",
    "chiliconcarneV":    "Chili Con Carne",
    "lemonPasta":        "Pâtes au Citron",
    "energyballs":       "Boules d\'Énergie",
    "noodlesWok":        "Nouilles Sautées Wok",
    // Nouvelles recettes batch 3
    "cassoulet":         "Cassoulet Toulousain",
    "hachisparmentier":  "Hachis Parmentier",
    "daubeProvencale":   "Daube Provençale",
    "pouletNormande":    "Poulet à la Normande",
    "tajinepoulet":      "Tajine Poulet Citron",
    "saltimbocca":       "Saltimbocca alla Romana",
    "bouillabaisse":     "Bouillabaisse",
    "gratinPates":       "Gratin de Pâtes",
    "volauVent":         "Vol-au-Vent",
    "jambonneauLentilles": "Jarret aux Lentilles",
    "boulettesViande":   "Boulettes Sauce Tomate",
    "saladeThai":        "Salade Thaï",
    "saladeHaricotsVerts": "Salade Haricots Verts",
    "saladeFruitsMer":   "Salade Fruits de Mer",
    "saladePoulpe":      "Salade de Poulpe",
    "soupeLentillesCorail": "Soupe Lentilles Corail",
    "bowlProteineVege":  "Bowl Protéiné Végétarien",
    "soupeDetox":        "Soupe Détox Verte",
    "saladeKale":        "Salade de Kale",
    "bruschetta":        "Bruschetta Tomate Basilic",
    "samosas":           "Samosas aux Légumes",
    "springRolls":       "Spring Rolls Frais",
    "oeufsCocotte":      "Œufs Cocotte",
    "tarteFragoles":     "Tarte aux Fraises",
    "pannaCotta":        "Panna Cotta Vanille",
    "eclair":            "Éclairs au Chocolat",
    "pavlova":           "Pavlova aux Fruits",
    "profiteroles":      "Profiteroles",
    "brandadeMorue":     "Brandade de Morue",
    // Batch 4
    "sobejaponais":           "Soba Japonais",
    "tartarethon":            "Tartare de Thon",
    "pouletcitroncitronelle": "Poulet Citron Citronnelle",
    "velouteAsperges":        "Velouté d'Asperges",
    "saladeLegsRoasted":      "Salade de Légumes Rôtis",
    "quinoalegumes":          "Quinoa aux Légumes",
    "patatesdoucesCurry":     "Patates Douces au Curry",
    "falafelbaked":           "Falafel au Four",
    "smoothievert":           "Smoothie Vert Détox",
    "assiettepouletpatate":   "Assiette Healthy Poulet",
    "gnocchisgorgonzola":     "Gnocchis au Gorgonzola",
    "risottocourgettechevre": "Risotto Courgette Chèvre",
    "currypoischiches":       "Curry de Pois Chiches",
    "pastapomodoro":          "Pasta Pomodoro",
    "omeletteprovencale":     "Omelette Provençale",
    "tarteepinardfeta":       "Tarte Épinards Feta",
    "veggieburger":           "Burger Végétarien",
    "soufflecheese":          "Soufflé au Fromage",
    "paellaVege":             "Paella Végétarienne",
    "bellini":                "Bellini Pêche",
    "frenchMartini":          "French Martini",
    "darkStormyCocktail":     "Dark & Stormy",
    "amarettoSour":           "Amaretto Sour",
    "aperolPamplemousse":     "Aperol Pamplemousse",
    "mocktailframboisementhe":"Mocktail Framboise Menthe",
    "mocktailpassionsoleil":  "Mocktail Passion Soleil",
    "mocktailconcombrecitr":  "Mocktail Concombre Citron",
    "mocktailgingembre":      "Ginger Mocktail",
    "mocktailfraisesvanille": "Mocktail Fraises Vanille",
    "tarteNormande":          "Tarte Normande",
    "wafflesSales":      "Gaufres Salées",
    "eggsBenedict":      "Œufs Bénédicte",
    "porkBelly":         "Poitrine de Porc Caramélisée",
    "wagyuBurger":       "Burger Wagyu",
    "butterchicken":     "Poulet Beurre",
    "koreanfriedchicken": "Poulet Frit Coréen",
    "smoothiebowl":      "Smoothie Bowl",
    "bowlacai":          "Bowl Açaï",
    "buddhaBowl":        "Buddha Bowl",
    "overnightoats":     "Porridge de Nuit",
    "pancakesproteine":  "Pancakes Protéinés",
    "bananabread":       "Cake à la Banane",
    "granolaMaison":     "Granola Maison",
    "chocolatChaud":     "Chocolat Chaud",
    "sconeBritish":      "Scones Britanniques",
    "camembertRoti":     "Camembert Rôti",
    "gazpachoMelon":     "Gaspacho de Melon",
    "choucroute":        "Choucroute Garnie",
    "spaetzle":          "Spätzle Alsaciens",
    "risottoMilanese":   "Risotto Milanese",
    "soupeAziatique":    "Soupe Asiatique",
    "pouletMisoGingembre": "Poulet Miso Gingembre",
    "pouletCocoLemon":   "Poulet Coco Citron",
    "maffeSenegal":      "Maafé Sénégalais",
    "chiliconcarneV":    "Chili Con Carne",
    "crepesSucrées":     "Crêpes Sucrées",
    "poireauVinaigrette": "Poireaux Vinaigrette",
    "soupeMinestrone":   "Minestrone",
    "veloutePoiron":     "Velouté de Potiron",
    "tom_yam":           "Soupe Tom Yam",
    "crevettespilpil":   "Crevettes Pil Pil",
    "calamarsRomaine":   "Calamars à la Romaine",
    "tiramisufraise":    "Tiramisu aux Fraises",
    "baklava":           "Baklava",
    "churros":           "Churros",
    "cremebrulee":       "Crème Brûlée",
    "mousseauchocolat":  "Mousse au Chocolat",
    "fondantchocolat":   "Fondant au Chocolat",
    "ileflottante":      "Île Flottante",
    "verrinetiramisu":   "Verrines Tiramisu",
    "tarteaupommes":     "Tarte aux Pommes",
    "tartecitron":       "Tarte au Citron",
    "oldFashioned":      "Old Fashioned",
    "gintoniqmaison":    "Gin Tonic Maison",
    "shrubframboisebasilic": "Shrub Framboise Basilic",
    "mocktailcoconananas":   "Mocktail Coco Ananas",
    "pizzavegetarienne":  "Pizza Végétarienne",
    "gnocchismaison":    "Gnocchis Maison",
    "noodlesWok":        "Nouilles Wok",
    // Noms collés corrigés
    "aperolspritzrosa":  "Spritz Aperol Rosé",
    "canelebordelais":   "Cannelés Bordelais",
    "carigrioantillais": "Cari Griot Antillais",
    "crumblefruits":     "Crumble aux Fruits",
    "dosakerdosai":      "Dosa / Dosai",
    "gateaubasque":      "Gâteau Basque",
    "gingerlemondrop":   "Ginger Lemon Drop",
    "grilladelamnocciole": "Grillades Agneau Nocciole",
    "lasagneverdure":    "Lasagnes aux Légumes",
    "mafewestafricain":  "Maafé Ouest-Africain",
    "misoramenleger":    "Miso Ramen Léger",
    "mocktailberrybliss": "Mocktail Berry Bliss",
    "mocktailcoconorchidee": "Mocktail Coco Orchidée",
    "moelleuxchocolat":  "Moelleux au Chocolat",
    "moquecabresil":     "Moqueca Brésilienne",
    "painauchocolat":    "Pain au Chocolat",
    "paprikashpoulet":   "Paprikash de Poulet",
    "pekinduckeasy":     "Canard Laqué Pékinois",
    "phovietnambien":    "Pho Vietnamien",
    "pintxosbasques":    "Pintxos Basques",
    "pizza4fromages":    "Pizza 4 Fromages",
    "pizzabiancoverdure": "Pizza Bianca aux Légumes",
    "pizzacalzone":      "Pizza Calzone",
    "pizzadiavola":      "Pizza Diavola",
    "pizzapatate":       "Pizza à la Patate",
    "pizzapoivrons":     "Pizza aux Poivrons",
    "pizzaprosciuttoroquette": "Pizza Prosciutto Roquette",
    "pizzatruffe":       "Pizza à la Truffe",
    "pizzareine":        "Pizza Reine",
    "pouletbasquaise":   "Poulet à la Basquaise",
    "pouletchicken65":   "Poulet Chicken 65",
    "pouletrotiperfect": "Poulet Rôti Parfait",
    "poulettandoori":    "Poulet Tandoori",
    "poulpegrillebresil": "Poulpe Grillé Brésilien",
    "punchfruitsrouges": "Punch aux Fruits Rouges",
    "ramenjaponais":     "Ramen Japonais",
    "rendangboeuf":      "Rendang de Bœuf",
    "saumoncrouteherbes": "Saumon en Croûte d\'Herbes",
    "souvlakiagneau":    "Souvlaki d\'Agneau",
    "tacoshijosepastor": "Tacos al Pastor",
    "tajinemouton":      "Tajine d\'Agneau",
    "tequilasunrise":    "Tequila Sunrise",
    "terrinecampagne":   "Terrine de Campagne",
    "millefeuille":      "Mille-feuille",
    "pouletCocoLemon":   "Poulet Coco Citron",
    "pouletMisoGingembre": "Poulet Miso Gingembre",
    "risottoMilanese":   "Risotto Milanese",
    "soupeAziatique":    "Soupe Asiatique",
    "poireauVinaigrette": "Poireaux Vinaigrette",
    "veloutePoiron":     "Velouté de Potiron",
    "camembertRoti":     "Camembert Rôti",
    "tarteFlambee":      "Tarte Flambée",
    "wafflesSales":      "Gaufres Salées",
    "calamarsRomaine":   "Calamars à la Romaine",
    "eggsBenedict":      "Œufs Bénédicte",
    "porkBelly":         "Poitrine de Porc Caramélisée",
    "wagyuBurger":       "Burger Wagyu",
    "granolaMaison":     "Granola Maison",
    "chocolatChaud":     "Chocolat Chaud",
    "sconeBritish":      "Scones Britanniques",
    "gazpachoMelon":     "Gaspacho de Melon",
    "maffeSenegal":      "Maafé Sénégalais",
    "choucroute":        "Choucroute Garnie",
    "koreanfriedchicken": "Poulet Frit Coréen",
    "soupeMinestrone":   "Minestrone",
    "lemonPasta":        "Pâtes au Citron",
    "crepesSucrées":     "Crêpes Sucrées",
    "noodlesWok":        "Nouilles Sautées Wok",
    // Nouvelles recettes batch 3
    "cassoulet":         "Cassoulet Toulousain",
    "hachisparmentier":  "Hachis Parmentier",
    "daubeProvencale":   "Daube Provençale",
    "pouletNormande":    "Poulet à la Normande",
    "tajinepoulet":      "Tajine Poulet Citron",
    "saltimbocca":       "Saltimbocca alla Romana",
    "bouillabaisse":     "Bouillabaisse",
    "gratinPates":       "Gratin de Pâtes",
    "volauVent":         "Vol-au-Vent",
    "jambonneauLentilles": "Jarret aux Lentilles",
    "boulettesViande":   "Boulettes Sauce Tomate",
    "saladeThai":        "Salade Thaï",
    "saladeHaricotsVerts": "Salade Haricots Verts",
    "saladeFruitsMer":   "Salade Fruits de Mer",
    "saladePoulpe":      "Salade de Poulpe",
    "soupeLentillesCorail": "Soupe Lentilles Corail",
    "bowlProteineVege":  "Bowl Protéiné Végétarien",
    "soupeDetox":        "Soupe Détox Verte",
    "saladeKale":        "Salade de Kale",
    "bruschetta":        "Bruschetta Tomate Basilic",
    "samosas":           "Samosas aux Légumes",
    "springRolls":       "Spring Rolls Frais",
    "oeufsCocotte":      "Œufs Cocotte",
    "tarteFragoles":     "Tarte aux Fraises",
    "pannaCotta":        "Panna Cotta Vanille",
    "eclair":            "Éclairs au Chocolat",
    "pavlova":           "Pavlova aux Fruits",
    "profiteroles":      "Profiteroles",
    "brandadeMorue":     "Brandade de Morue",
    // Batch 4
    "sobejaponais":           "Soba Japonais",
    "tartarethon":            "Tartare de Thon",
    "pouletcitroncitronelle": "Poulet Citron Citronnelle",
    "velouteAsperges":        "Velouté d'Asperges",
    "saladeLegsRoasted":      "Salade de Légumes Rôtis",
    "quinoalegumes":          "Quinoa aux Légumes",
    "patatesdoucesCurry":     "Patates Douces au Curry",
    "falafelbaked":           "Falafel au Four",
    "smoothievert":           "Smoothie Vert Détox",
    "assiettepouletpatate":   "Assiette Healthy Poulet",
    "gnocchisgorgonzola":     "Gnocchis au Gorgonzola",
    "risottocourgettechevre": "Risotto Courgette Chèvre",
    "currypoischiches":       "Curry de Pois Chiches",
    "pastapomodoro":          "Pasta Pomodoro",
    "omeletteprovencale":     "Omelette Provençale",
    "tarteepinardfeta":       "Tarte Épinards Feta",
    "veggieburger":           "Burger Végétarien",
    "soufflecheese":          "Soufflé au Fromage",
    "paellaVege":             "Paella Végétarienne",
    "bellini":                "Bellini Pêche",
    "frenchMartini":          "French Martini",
    "darkStormyCocktail":     "Dark & Stormy",
    "amarettoSour":           "Amaretto Sour",
    "aperolPamplemousse":     "Aperol Pamplemousse",
    "mocktailframboisementhe":"Mocktail Framboise Menthe",
    "mocktailpassionsoleil":  "Mocktail Passion Soleil",
    "mocktailconcombrecitr":  "Mocktail Concombre Citron",
    "mocktailgingembre":      "Ginger Mocktail",
    "mocktailfraisesvanille": "Mocktail Fraises Vanille",
    "tarteNormande":          "Tarte Normande",
    "bibimbap":          "Bibimbap",
    "gyozas":            "Gyozas",
    "sushimaison":       "Sushis Maison",
    "tom_yam":           "Tom Yam",
    "crevettespilpil":   "Crevettes Pil Pil",
    "pizzamargherita":   "Pizza Margherita",
    "pizzasaumonepinards": "Pizza Saumon Épinards",
    "tortillaespagnole": "Tortilla Espagnole",
    "pizzavegetarienne": "Pizza Végétarienne",
    "crepes":            "Crêpes",
    "lasagne":           "Pâte à Lasagne",
    "patepizza":         "Pâte à Pizza",
    "pizza":             "Pâte à Pizza",
  };
  if (nomsAffichage[key]) return nomsAffichage[key];
  // Fallback : découper camelCase/underscores en mots lisibles
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

function getEmoji(key) {
  const data = recettes[key];
  return data ? data.emoji : "🍽️";
}

function regenRepas(jourNom, moment) {
  // Remplacer un seul repas par une nouvelle recette compatible
  const menus = window._derniersMenus;
  if (!menus?.semaine) return;

  const jour = menus.semaine.find(j => j.jour === jourNom);
  if (!jour) return;

  // Construire pool compatible
  const catsExclues = new Set(["boulangerie","cocktails","mocktails","desserts","brunch"]);
  const motsExclus = motsExclusProfil();
  const pool = Object.keys(recettes).filter(key => {
    // Exclure les non-repas via la liste fiable (ne dépend pas du DOM)
    if (RECETTES_NON_REPAS.has(key)) return false;
    // Garder uniquement les vrais plats (catégorie depuis la donnée)
    if (catsExclues.has(categorieRecette(key))) return false;
    // Respecter allergies / régimes du profil
    if (motsExclus.size > 0) {
      const texte = texteRecette(key);
      if ([...motsExclus].some(m => texte.includes(m))) return false;
    }
    // Seulement les recettes sans alerte famille (ni rouge, ni orange)
    const niveau = typeof getNiveauFamille === "function" ? getNiveauFamille(key) : null;
    return niveau === null;
  });

  if (pool.length === 0) return;

  // Recette actuellement à cette place (pour éviter de retomber dessus)
  const actuelle = moment === "midi"
    ? (jour.midi?.recette || jour.midi)
    : (jour.soir?.recette || jour.soir);

  // Exclure les recettes déjà dans le menu
  const dejaDans = new Set(menus.semaine.flatMap(j => [
    j.midi?.recette || j.midi,
    j.soir?.recette || j.soir
  ]).filter(Boolean));

  // 1er choix : recettes pas encore dans le menu
  let candidates = pool.filter(k => !dejaDans.has(k));
  // Fallback : si tout est déjà utilisé, autoriser n'importe quelle recette compatible
  // sauf celle qu'on est en train de remplacer
  if (candidates.length === 0) candidates = pool.filter(k => k !== actuelle);
  if (candidates.length === 0) return;

  // Choisir aléatoirement
  const nouvelle = candidates[Math.floor(Math.random() * candidates.length)];

  // Remplacer dans le menu
  if (moment === "midi") {
    if (typeof jour.midi === "string") jour.midi = nouvelle;
    else jour.midi = { recette: nouvelle };
  } else {
    if (typeof jour.soir === "string") jour.soir = nouvelle;
    else jour.soir = { recette: nouvelle };
  }

  // Réafficher
  const personnes = parseInt(document.getElementById("plan-personnes")?.value) || 4;
  afficherMenusSemaine(menus, personnes);
  sauvegarderMenus(menus, personnes, menus.semaine.map(j => j.jour));
}

// Régénère UNE sous-recette (entrée/plat/dessert) en mode menu complet,
// en respectant son type et en évitant les recettes à risque famille.
function regenRepasSous(jourNom, moment, type) {
  const menus = window._derniersMenus;
  if (!menus?.semaine) return;
  const jour = menus.semaine.find(j => j.jour === jourNom);
  if (!jour || !jour[moment]) return;

  // Catégories autorisées selon le type de plat
  const catsParType = {
    entree:  new Set(["entrees","soupes","salades"]),
    plat:    new Set(["plats","pizzas","healthy"]),
    dessert: new Set(["desserts"]),
  };
  const catsOK = catsParType[type];
  if (!catsOK) return;

  // Pool de recettes du bon type, sans alerte famille, et compatibles profil
  const motsExclus = motsExclusProfil();
  const pool = Object.keys(recettes).filter(key => {
    if (!catsOK.has(categorieRecette(key))) return false;
    if (motsExclus.size > 0) {
      const texte = texteRecette(key);
      if ([...motsExclus].some(m => texte.includes(m))) return false;
    }
    const niveau = typeof getNiveauFamille === "function" ? getNiveauFamille(key) : null;
    return niveau === null;
  });
  if (pool.length === 0) return;

  // Recette actuellement à cette place
  const actuelle = jour[moment]?.[type]?.recette;

  // Éviter les recettes déjà présentes dans tout le menu (entrées/plats/desserts)
  const dejaDans = new Set();
  menus.semaine.forEach(j => {
    ["midi","soir"].forEach(m => {
      ["entree","plat","dessert"].forEach(t => {
        const k = j[m]?.[t]?.recette;
        if (k) dejaDans.add(k);
      });
    });
  });

  let candidates = pool.filter(k => !dejaDans.has(k));
  if (candidates.length === 0) candidates = pool.filter(k => k !== actuelle);
  if (candidates.length === 0) return;

  const nouvelle = candidates[Math.floor(Math.random() * candidates.length)];

  // Remplacer la sous-recette
  if (!jour[moment][type]) jour[moment][type] = {};
  jour[moment][type].recette = nouvelle;

  const personnes = parseInt(document.getElementById("plan-personnes")?.value) || 4;
  afficherMenusSemaine(menus, personnes);
  sauvegarderMenus(menus, personnes, menus.semaine.map(j => j.jour));
}

function afficherMenusSemaine(menus, personnes) {
  const container = document.getElementById("plan-jours");
  container.innerHTML = "";
  const isComplet = window._formatRepas === "complet";

  // Légende famille (uniquement si le foyer a bébé/enfant)
  const profilL = typeof getFoyerProfil === "function" ? getFoyerProfil() : null;
  if (profilL && (profilL.hasBebe || profilL.hasEnfant)) {
    const legende = document.createElement("div");
    legende.className = "plan-legende-famille";
    const parts = [];
    if (profilL.hasBebe)   parts.push(`<span class="leg-item"><span class="leg-pastille bebe"></span>🍼 Déconseillé bébé</span>`);
    if (profilL.hasEnfant) parts.push(`<span class="leg-item"><span class="leg-pastille enfant"></span>🧒 Déconseillé enfant</span>`);
    parts.push(`<span class="leg-hint"><strong>🔄 Régénérer</strong> chaque repas concerné</span>`);
    legende.innerHTML = parts.join("");
    container.appendChild(legende);
  }

  menus.semaine.forEach(jour => {
    const div = document.createElement("div");
    div.className = "plan-jour";

    if (isComplet) {
      // Format entrée/plat/dessert
      const genMoment = (moment, emoji, label) => {
        const r = jour[moment];
        if (!r) return "";
        const genSous = (type, icone, data, cleType) => {
          if (!data?.recette) return "";
          const key = data.recette;
          // Alerte famille (rouge bébé / orange enfant) + raison
          const niv = typeof getNiveauFamille === "function" ? getNiveauFamille(key) : null;
          const lvl = niv?.niveau;
          const raison = niv?.raison || "";
          const tip = lvl === "bebe" ? `${raison} — déconseillé bébé` : lvl === "enfant" ? `${raison} — déconseillé enfant` : "";
          const styleAlerte = lvl === "bebe"   ? "border-left:3px solid #ff4444;background:rgba(255,68,68,.1)"
                            : lvl === "enfant" ? "border-left:3px solid #ff9900;background:rgba(255,153,0,.08)" : "";
          const badge = lvl === "bebe"   ? `<span title="${tip}" style="margin-left:4px">🍼</span>`
                      : lvl === "enfant" ? `<span title="${tip}" style="margin-left:4px">🧒</span>` : "";
          const btn = lvl ? `<button class="plan-regen-btn" onclick="event.stopPropagation();regenRepasSous('${jour.jour}','${moment}','${cleType}')" title="Regénérer">🔄</button>` : "";
          const motif = lvl ? `<div class="plan-motif-famille" title="${tip}">${lvl === "bebe" ? "🍼" : "🌶️"} ${raison}</div>` : "";
          return `<div class="plan-repas-sous" style="${styleAlerte}" onclick="ouvrirRecettePlan('${key}', ${personnes})">
            <span class="plan-sous-label">${icone} ${type} ${badge}${btn}</span>
            <span style="font-size:22px">${getEmoji(key)}</span>
            <span class="plan-repas-nom">${getNomRecette(key)}</span>
            <span class="plan-repas-note">${data.note || ""}</span>
            ${motif}
          </div>`;
        };
        return `<div class="plan-repas-col">
          <div class="plan-repas-label">${emoji} ${label}</div>
          ${genSous("Entrée", "🥗", r.entree, "entree")}
          ${genSous("Plat", "🍽️", r.plat, "plat")}
          ${genSous("Dessert", "🍰", r.dessert, "dessert")}
        </div>`;
      };
      div.innerHTML = `
        <h3 class="plan-jour-titre">${jour.jour}</h3>
        <div class="plan-repas-row">
          ${genMoment("midi", "☀️", "Midi")}
          ${genMoment("soir", "🌙", "Soir")}
        </div>`;
    } else {
      // Format simple midi/soir
      const midi = jour.midi?.recette || jour.midi || "";
      const soir = jour.soir?.recette || jour.soir || "";
      const midiNote = jour.midi?.note || "";
      const soirNote = jour.soir?.note || "";

      // Couleur famille + raison
      const nMidi = typeof getNiveauFamille === "function" ? getNiveauFamille(midi) : null;
      const nSoir = typeof getNiveauFamille === "function" ? getNiveauFamille(soir) : null;
      const lvlM = nMidi?.niveau, lvlS = nSoir?.niveau;
      const raisonM = nMidi?.raison || "";
      const raisonS = nSoir?.raison || "";
      const tipM = lvlM === "bebe" ? `${raisonM} — déconseillé bébé` : lvlM === "enfant" ? `${raisonM} — déconseillé enfant` : "";
      const tipS = lvlS === "bebe" ? `${raisonS} — déconseillé bébé` : lvlS === "enfant" ? `${raisonS} — déconseillé enfant` : "";
      const sMidi = lvlM === "bebe" ? "border-left:3px solid #ff4444;background:rgba(255,68,68,.1)"
                  : lvlM === "enfant" ? "border-left:3px solid #ff9900;background:rgba(255,153,0,.08)" : "";
      const sSoir = lvlS === "bebe" ? "border-left:3px solid #ff4444;background:rgba(255,68,68,.1)"
                  : lvlS === "enfant" ? "border-left:3px solid #ff9900;background:rgba(255,153,0,.08)" : "";
      const bMidi = lvlM === "bebe" ? `<span title="${tipM}" style="margin-left:4px">🍼</span>`
                  : lvlM === "enfant" ? `<span title="${tipM}" style="margin-left:4px">🧒</span>` : "";
      const bSoir = lvlS === "bebe" ? `<span title="${tipS}" style="margin-left:4px">🍼</span>`
                  : lvlS === "enfant" ? `<span title="${tipS}" style="margin-left:4px">🧒</span>` : "";
      const btnMidi = lvlM ? `<button class="plan-regen-btn" onclick="event.stopPropagation();regenRepas('${jour.jour}','midi')" title="Regénérer">🔄</button>` : "";
      const btnSoir = lvlS ? `<button class="plan-regen-btn" onclick="event.stopPropagation();regenRepas('${jour.jour}','soir')" title="Regénérer">🔄</button>` : "";
      const motifM = lvlM ? `<div class="plan-motif-famille" title="${tipM}">${lvlM === "bebe" ? "🍼" : "🌶️"} ${raisonM}</div>` : "";
      const motifS = lvlS ? `<div class="plan-motif-famille" title="${tipS}">${lvlS === "bebe" ? "🍼" : "🌶️"} ${raisonS}</div>` : "";

      div.innerHTML = `
        <h3 class="plan-jour-titre">${jour.jour}</h3>
        <div class="plan-repas-row">
          <div class="plan-repas" style="${sMidi}" onclick="ouvrirRecettePlan('${midi}', ${personnes})">
            <div class="plan-repas-label">☀️ Midi ${bMidi}${btnMidi}</div>
            <div class="plan-repas-emoji">${getEmoji(midi)}</div>
            <div class="plan-repas-nom">${getNomRecette(midi)}</div>
            <div class="plan-repas-note">${midiNote}</div>
            ${motifM}
          </div>
          <div class="plan-repas" style="${sSoir}" onclick="ouvrirRecettePlan('${soir}', ${personnes})">
            <div class="plan-repas-label">🌙 Soir ${bSoir}${btnSoir}</div>
            <div class="plan-repas-emoji">${getEmoji(soir)}</div>
            <div class="plan-repas-nom">${getNomRecette(soir)}</div>
            <div class="plan-repas-note">${soirNote}</div>
            ${motifS}
          </div>
        </div>`;
    }
    container.appendChild(div);
  });

  window._derniersMenus = menus; // Pour regenRepas
  document.getElementById("plan-form").style.display = "none";
  document.getElementById("plan-result").style.display = "block";

  // Note discrète adaptation famille
  const profil = typeof getFoyerProfil === "function" ? getFoyerProfil() : null;
  const noteExistante = document.getElementById("plan-famille-note");
  if (noteExistante) noteExistante.remove();
  if (profil && (profil.hasBebe || profil.hasEnfant)) {
    const icone = profil.hasBebe ? "🍼" : "🧒";
    const texte = profil.hasBebe
      ? "Menu généré pour votre foyer — certains plats peuvent nécessiter une adaptation pour bébé"
      : "Menu généré pour votre foyer — vérifiez les plats épicés pour les enfants";
    const note = document.createElement("div");
    note.id = "plan-famille-note";
    note.style.cssText = "font-size:13px;color:#fff;text-align:center;padding:10px 20px;margin-top:12px;background:rgba(255,180,0,.15);border:1px solid rgba(255,180,0,.3);border-radius:10px;line-height:1.5";
    note.innerHTML = `<strong>${icone} Adaptation famille</strong><br><span style="opacity:.85">${texte}</span>`;
    document.getElementById("plan-result").appendChild(note);
  }

  // Bouton "Sauvegarder en favori"
  injecterBoutonMenuFavori("plan-result", "semaine", menus, personnes);
}

// Injecte un bouton ❤️ dans le header d'un écran menu (semaine ou thématique)
function injecterBoutonMenuFavori(containerId, type, menu, personnes) {
  if (!window.currentUser) return; // pas de favoris sans compte
  const container = document.getElementById(containerId);
  if (!container) return;
  const header = container.querySelector(".plan-result-header");
  if (!header) return;

  // Supprimer ancien bouton si présent
  const ancien = header.querySelector(".plan-btn-favori-menu");
  if (ancien) ancien.remove();

  const estFav = typeof estMenuFavori === "function" && estMenuFavori(menu, type);
  const btn = document.createElement("button");
  btn.className = "plan-btn-favori-menu";
  btn.innerHTML = estFav ? "❤️ Sauvegardé" : "🤍 Sauvegarder";
  btn.title = estFav ? "Ce menu est dans vos favoris" : "Sauvegarder ce menu en favori";
  btn.onclick = async (e) => {
    e.stopPropagation();
    if (estFav) {
      // Si déjà favori, on cherche son id pour le retirer
      const liste = window.userProfile?.menusFavoris || [];
      const f = liste.find(m => m.type === type && JSON.stringify(m.menu) === JSON.stringify(menu));
      if (f) await window.supprimerMenuFavori(f.id);
      btn.innerHTML = "🤍 Sauvegarder";
      if (typeof afficherToast === "function") afficherToast("💔 Menu retiré des favoris", "info");
    } else {
      const id = await window.sauvegarderMenuFavori(menu, type, personnes);
      if (id) {
        btn.innerHTML = "❤️ Sauvegardé";
        // Petit flash visuel
        btn.style.transform = "scale(1.1)";
        setTimeout(() => btn.style.transform = "", 200);
        // Confirmation toast avec le nom du menu sauvegardé
        const fav = (window.userProfile?.menusFavoris || []).find(m => m.id === id);
        const nomAffiche = fav?.nom || "Menu";
        if (typeof afficherToast === "function") afficherToast(`✅ Sauvegardé : ${nomAffiche}`, "success");
      }
    }
  };
  header.appendChild(btn);
}

// Affiche un toast de notification temporaire en bas de l'écran
// Demande à l'utilisateur un nouveau nom pour un menu favori et le sauvegarde.
// Rafraîchit toutes les vues concernées en cas de succès.
async function demanderRenommageMenu(id) {
  const liste = window.userProfile?.menusFavoris || [];
  const fav = liste.find(m => m.id === id);
  if (!fav) return;
  const nouveau = window.prompt("✏️ Renommer ce menu favori :", fav.nom);
  if (nouveau === null) return; // annulé
  const nom = nouveau.trim();
  if (!nom || nom === fav.nom) return; // vide ou identique
  if (nom.length > 80) {
    if (typeof afficherToast === "function") afficherToast("Nom trop long (80 caractères max)", "error");
    return;
  }
  await window.renommerMenuFavori(id, nom);
  if (typeof afficherToast === "function") afficherToast(`✏️ Renommé : ${nom}`, "success");
}

function afficherToast(message, type) {
  // Supprime l'ancien si présent
  const ancien = document.getElementById("app-toast");
  if (ancien) ancien.remove();

  const couleur = type === "success" ? "#22c55e"
                : type === "error"   ? "#ef4444"
                : "#ff8fb3";
  const toast = document.createElement("div");
  toast.id = "app-toast";
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(60px);
    background: rgba(20,20,30,.96);
    color: #fff;
    padding: 14px 22px;
    border-radius: 12px;
    border-left: 4px solid ${couleur};
    box-shadow: 0 6px 24px rgba(0,0,0,.4);
    z-index: 99999;
    font-size: 14px;
    font-weight: 600;
    max-width: 90%;
    text-align: center;
    opacity: 0;
    transition: all .3s ease;
    pointer-events: none;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  // Animer in
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  // Animer out après 2.8s
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(60px)";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Charge un menu favori (semaine) et l'affiche
window.appliquerMenuFavoriSemaine = function(id) {
  const liste = window.userProfile?.menusFavoris || [];
  const fav = liste.find(m => m.id === id);
  if (!fav || fav.type !== "semaine") return;
  // Masquer la vue dédiée des menus favoris avant de naviguer
  if (typeof masquerSectionMenusFavoris === "function") masquerSectionMenusFavoris();
  // Flag : empêche chargerMenusAuDemarrage d'écraser menusSemaine pendant la navigation
  window._chargementFavoriEnCours = true;
  // Copie profonde : on travaille sur une copie pour ne pas altérer le favori
  menusSemaine = JSON.parse(JSON.stringify(fav.menu));
  // Détecter le format du menu (simple ou complet) pour bien afficher
  const premier = menusSemaine?.semaine?.[0];
  const estComplet = premier && premier.midi && premier.midi.plat !== undefined;
  window._formatRepas = estComplet ? "complet" : "simple";
  // Forcer l'onglet semaine pour que afficherSection ne tente pas de basculer en festif
  window._planTabActif = "semaine";
  // Naviguer vers la section Menus
  const btnMenus = document.querySelector(".nav-btn[onclick*=planificateur]");
  if (btnMenus) afficherSection("planificateur", btnMenus);
  // Forcer l'onglet semaine
  if (typeof switchPlanTab === "function") switchPlanTab("semaine");
  setTimeout(() => {
    const inputP = document.getElementById("plan-personnes");
    if (inputP) inputP.value = fav.personnes || 4;
    // Restaurer menusSemaine au cas où il aurait été écrasé entre-temps
    menusSemaine = JSON.parse(JSON.stringify(fav.menu));
    afficherMenusSemaine(menusSemaine, fav.personnes || 4);
    window._chargementFavoriEnCours = false;
    // Toast de confirmation
    if (typeof afficherToast === "function") afficherToast(`📅 Menu chargé : ${fav.nom}`, "info");
  }, 150);
};

// Charge un menu favori (thématique) et l'affiche
window.appliquerMenuFavoriFestif = function(id) {
  const liste = window.userProfile?.menusFavoris || [];
  const fav = liste.find(m => m.id === id);
  if (!fav || fav.type !== "thematique") return;
  // Masquer la vue dédiée des menus favoris avant de naviguer
  if (typeof masquerSectionMenusFavoris === "function") masquerSectionMenusFavoris();
  window._chargementFavoriEnCours = true;
  // Copie profonde : on travaille sur une copie
  menuFestifActuel = JSON.parse(JSON.stringify(fav.menu));
  // Forcer l'onglet festif pour la navigation
  window._planTabActif = "festif";
  const btnMenus = document.querySelector(".nav-btn[onclick*=planificateur]");
  if (btnMenus) afficherSection("planificateur", btnMenus);
  if (typeof switchPlanTab === "function") switchPlanTab("festif");
  setTimeout(() => {
    const inputP = document.getElementById("festif-personnes");
    if (inputP) inputP.value = fav.personnes || 4;
    // Restaurer au cas où
    menuFestifActuel = JSON.parse(JSON.stringify(fav.menu));
    afficherMenuFestif(menuFestifActuel, fav.personnes || 4);
    window._chargementFavoriEnCours = false;
    if (typeof afficherToast === "function") afficherToast(`🎉 Menu chargé : ${fav.nom}`, "info");
  }, 150);
};

window.appliquerMenuFavori = function(id) {
  const liste = window.userProfile?.menusFavoris || [];
  const fav = liste.find(m => m.id === id);
  if (!fav) return;
  if (fav.type === "thematique") window.appliquerMenuFavoriFestif(id);
  else window.appliquerMenuFavoriSemaine(id);
};


function ouvrirRecettePlan(recetteKey, personnes) {
  // Ouvrir directement la modale sans changer d'onglet
  document.getElementById("personnes").value = personnes;
  choisirRecette(recetteKey);
}

// ==============================
// EXPORT PDF / IMPRESSION
// ==============================
// Ouvre une fenêtre dédiée avec la liste de courses bien formatée et lance l'impression.
// L'utilisateur peut alors "Enregistrer en PDF" depuis le dialogue d'impression du navigateur.
function imprimerCourses(sourceId) {
  const source = document.getElementById(sourceId);
  if (!source) return;
  const contentEl = source.querySelector("#plan-courses-content, #festif-courses-content");
  if (!contentEl) return;

  const titre = sourceId === "festif-courses" ? "Liste de courses — Menu Thématique" : "Liste de courses — Semaine";
  const dateStr = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  // Récupérer le contenu textuel des courses pour le formater
  const items = contentEl.querySelectorAll(".courses-item");
  let listeHtml = "";
  if (items.length > 0) {
    listeHtml = '<ul class="liste-print">';
    items.forEach(item => {
      const nom = item.querySelector(".courses-nom")?.textContent || "";
      const qte = item.querySelector(".courses-qte")?.textContent || "";
      listeHtml += `<li><span class="cb">☐</span> <span class="nom">${nom}</span> <span class="qte">${qte}</span></li>`;
    });
    listeHtml += "</ul>";
  } else {
    // Fallback : copier le HTML brut
    listeHtml = contentEl.innerHTML;
  }
  // Ligne d'info en haut (Pour X personnes...)
  const subtitle = contentEl.querySelector(".courses-subtitle")?.textContent || "";

  // Ouvrir une nouvelle fenêtre dédiée à l'impression
  const win = window.open("", "_blank", "width=800,height=900");
  if (!win) {
    alert("⚠️ Impossible d'ouvrir la fenêtre d'impression. Autorisez les popups dans votre navigateur.");
    return;
  }

  win.document.write(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${titre}</title>
  <style>
    @page { margin: 1.5cm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #222;
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.5;
    }
    h1 {
      color: #d63384;
      border-bottom: 3px solid #d63384;
      padding-bottom: 8px;
      margin-bottom: 4px;
    }
    .meta {
      color: #666;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .meta strong { color: #333; }
    .liste-print {
      list-style: none;
      padding: 0;
      margin: 0;
      columns: 2;
      column-gap: 30px;
    }
    .liste-print li {
      padding: 6px 0;
      border-bottom: 1px dashed #ccc;
      break-inside: avoid;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .cb { color: #999; font-size: 18px; flex-shrink: 0; }
    .nom { flex: 1; font-weight: 500; }
    .qte { color: #d63384; font-weight: 600; white-space: nowrap; }
    footer {
      margin-top: 30px;
      padding-top: 12px;
      border-top: 1px solid #ddd;
      color: #888;
      font-size: 12px;
      text-align: center;
    }
    @media print {
      body { padding: 0; }
      .liste-print { columns: 2; }
    }
  </style>
</head>
<body>
  <h1>🛒 ${titre}</h1>
  <div class="meta">
    <strong>📅 ${dateStr}</strong>${subtitle ? " &nbsp;·&nbsp; " + subtitle : ""}
  </div>
  ${listeHtml}
  <footer>La Cuisine de Jéjé — généré le ${dateStr}</footer>
  <script>
    window.onload = () => { setTimeout(() => window.print(), 200); };
  </script>
</body>
</html>`);
  win.document.close();
}

function afficherCourses() {
  if (!menusSemaine) return;
  const personnes = parseInt(document.getElementById("plan-personnes").value);
  const courses = {};

  menusSemaine.semaine.forEach(jour => {
    [jour.midi.recette, jour.soir.recette].forEach(key => {
      const ingrs = getIngredientsCourses(key, personnes);
      Object.entries(ingrs).forEach(([nom, data]) => {
        if (!courses[nom]) courses[nom] = { qte: 0, raw: null };
        if (typeof data.qte === "number" && data.qte > 0) {
          courses[nom].qte += data.qte;
        } else if (data.raw) {
          courses[nom].raw = data.raw;
        }
      });
    });
  });

  const container = document.getElementById("plan-courses-content");
  let html = `<p class="courses-subtitle">Pour ${personnes} personne${personnes > 1 ? "s" : ""} — ${menusSemaine.semaine.length * 2} repas</p>`;
  html += '<div class="courses-liste">';

  Object.entries(courses).sort((a,b) => a[0].localeCompare(b[0])).forEach(([nom, data]) => {
    let qteStr = "";
    if (data.qte > 0) {
      const v = data.qte;
      qteStr = v % 1 === 0 ? `${v}` : `${v.toFixed(0)}`;
    } else if (data.raw) {
      qteStr = data.raw;
    }
    html += `<div class="courses-item">
      <span class="courses-nom">${nom}</span>
      <span class="courses-qte">${qteStr}</span>
    </div>`;
  });

  html += "</div>";
  container.innerHTML = html;
  document.getElementById("plan-result").style.display = "none";
  document.getElementById("plan-courses").style.display = "block";
}

// Charger menus sauvegardés
// Vider le cache des menus
function viderCacheMenus(btn) {
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("cuisineJeje_menus") || k.startsWith("suggestions_")) {
        localStorage.removeItem(k);
      }
    });
    sessionStorage.removeItem("cuisineJeje_menus");
  } catch(e) {}
  // Réafficher le formulaire
  document.getElementById("plan-form").style.display = "block";
  document.getElementById("plan-result").style.display = "none";
  const planJours = document.getElementById("plan-jours");
  if (planJours) planJours.innerHTML = "";
  if (btn) { btn.textContent = "✅ Effacé !"; setTimeout(() => btn.textContent = "🗑️ Effacer le menu actuel", 2000); }
}

// Pré-cocher les tags du formulaire selon le profil utilisateur
function appliquerProfilSurFormulaire() {
  const prefs = window.userProfile?.preferences;
  if (!prefs) return;

  // Pré-cocher régimes dans les tags du formulaire semaine
  const regimes = prefs.regimes || [];
  document.querySelectorAll("#plan-form .plan-tag").forEach(btn => {
    const val = btn.dataset.val;
    if (regimes.includes(val)) {
      btn.classList.add("plan-tag-active");
    }
  });

  // Pré-remplir personnes depuis le foyer (formulaires Semaine ET Thématique)
  const foyer = window.userProfile?.foyer;
  if (foyer) {
    const nb = Math.min(15, Math.max(1,
      (foyer.adultes || 0) + (foyer.ados || 0) +
      (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0)
    ));
    if (nb > 0) {
      const inputP = document.getElementById("plan-personnes");
      if (inputP) inputP.value = nb;
      const inputF = document.getElementById("festif-personnes");
      if (inputF) inputF.value = nb;
    }
  }

  // Pré-remplir allergies dans le champ texte
  const allergies = [...(prefs.allergies||[]), ...(prefs.allergiesCustom||[])];
  const inputA = document.getElementById("plan-allergies");
  if (inputA && allergies.length > 0 && !inputA.value) {
    inputA.value = allergies.join(", ");
  }
}

// Nettoie un menu chargé : si un repas pointe vers une recette non-repas
// (boulangerie/dessert/cocktail issu d'un ancien menu sauvegardé), remplace
// par une recette compatible. Préserve la structure (simple ou complet).
function nettoyerMenusNonRepas(menus) {
  if (!menus?.semaine) return menus;
  // Pool de remplacement : vrais plats, hors non-repas
  const poolPlats = Object.keys(recettes).filter(k => {
    if (RECETTES_NON_REPAS.has(k)) return false;
    const c = categorieRecette(k);
    return c && !["boulangerie","desserts","cocktails","mocktails","brunch"].includes(c);
  });
  const dejaUtilise = new Set();
  // Index des recettes déjà présentes (pour éviter doublons)
  menus.semaine.forEach(j => {
    ["midi","soir"].forEach(m => {
      const r = j[m]?.recette || (typeof j[m] === "string" ? j[m] : null);
      if (r && !RECETTES_NON_REPAS.has(r)) dejaUtilise.add(r);
    });
  });
  const pickPlat = () => {
    const dispo = poolPlats.filter(k => !dejaUtilise.has(k));
    const choix = (dispo.length ? dispo : poolPlats)[Math.floor(Math.random() * (dispo.length || poolPlats.length))];
    dejaUtilise.add(choix);
    return choix;
  };
  const pickType = (type) => {
    // entree/plat/dessert : pick selon la catégorie cible
    const catsParType = {
      entree: ["entrees","soupes","salades"],
      plat: ["plats","pizzas","healthy"],
      dessert: ["desserts"],
    };
    const cats = catsParType[type] || catsParType.plat;
    const pool = Object.keys(recettes).filter(k => cats.includes(categorieRecette(k)));
    const dispo = pool.filter(k => !dejaUtilise.has(k));
    const choix = (dispo.length ? dispo : pool)[Math.floor(Math.random() * (dispo.length || pool.length))];
    if (choix) dejaUtilise.add(choix);
    return choix;
  };

  menus.semaine.forEach(j => {
    ["midi","soir"].forEach(m => {
      const v = j[m];
      if (!v) return;
      if (typeof v === "string") {
        if (RECETTES_NON_REPAS.has(v)) j[m] = pickPlat();
      } else if (typeof v === "object") {
        if (v.recette && RECETTES_NON_REPAS.has(v.recette)) {
          v.recette = pickPlat();
        }
        ["entree","plat","dessert"].forEach(type => {
          const sub = v[type];
          if (sub?.recette && RECETTES_NON_REPAS.has(sub.recette) && type !== "dessert") {
            // Pour entree/plat : remplacer si non-repas
            sub.recette = pickType(type);
          }
          // Pour dessert : on laisse, car un dessert EST une recette "non-repas"
        });
      }
    });
  });
  return menus;
}

function chargerMenusAuDemarrage() {
  // Si un menu favori est en cours d'application, ne PAS écraser menusSemaine
  if (window._chargementFavoriEnCours) return;
  // Vider TOUS les menus en cache (version mapping changée)
  try {
    const today = new Date().toLocaleDateString("fr-FR");
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("cuisineJeje_menus")) localStorage.removeItem(k);
      if (k.startsWith("suggestions_") && !k.startsWith("suggestions_v3_")) localStorage.removeItem(k);
    });
  } catch(e) {}

  const saved = chargerMenusSauvegardes();
  if (saved && saved.menus) {
    menusSemaine = saved.menus;
    // Auto-nettoyage : remplacer toute recette non-repas par un vrai plat
    // (cas des menus sauvegardés AVANT les corrections de catégories)
    menusSemaine = nettoyerMenusNonRepas(menusSemaine);
    // Revalider avec les préférences actuelles du profil
    const regimesActuels = [...(window.userProfile?.preferences?.regimes||[]), ...(window.userProfile?.preferences?.objectifs||[])];
    const allergiesActuelles = [...(window.userProfile?.preferences?.allergies||[]), ...(window.userProfile?.preferences?.allergiesCustom||[])];
    if (regimesActuels.length > 0 || allergiesActuelles.length > 0) {
      menusSemaine = validerRegimeMenus(menusSemaine, regimesActuels, allergiesActuelles);
    }
    document.getElementById("plan-form").style.display = "none";
    afficherMenusSemaine(menusSemaine, saved.personnes || 4);
    document.getElementById("plan-personnes").value = saved.personnes || 4;
  }
}

// Retour au formulaire depuis les menus
function resetPlanificateur() {
  document.getElementById("plan-form").style.display = "block";
  document.getElementById("plan-result").style.display = "none";
  document.getElementById("plan-courses").style.display = "none";
  menusSemaine = null;
  sessionStorage.removeItem(STORAGE_KEY);
}

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
    .replace(/[^a-z0-9\s]/g, " ")                       // emojis/symboles
    .replace(/\s+/g, " ")
    .trim();
}

// === DICTIONNAIRES DE SYNONYMES ===
const SYNONYMES_CATEGORIE = {
  "cocktail": "cocktails", "cocktails": "cocktails", "alcool": "cocktails", "boisson alcoolisee": "cocktails", "drink": "cocktails",
  "mocktail": "mocktails", "mocktails": "mocktails", "sans alcool": "mocktails", "soft": "mocktails",
  "salade": "salades", "salades": "salades",
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
  cocktails: "🍸 Cocktails", mocktails: "🧃 Mocktails", salades: "🥗 Salades",
  desserts: "🍰 Desserts", soupes: "🍲 Soupes", entrees: "🫕 Entrées",
  healthy: "💚 Healthy", brunch: "🍳 Brunch", encas: "🥪 Encas",
  pizzas: "🍕 Pizzas", boulangerie: "🥖 Boulangerie", plats: "🍽️ Plats",
};
const LABELS_PAYS = {
  france: "🇫🇷 France", italie: "🇮🇹 Italie", japon: "🇯🇵 Japon",
  thailande: "🇹🇭 Thaïlande", mexique: "🇲🇽 Mexique", inde: "🇮🇳 Inde",
  liban: "🇱🇧 Liban", grece: "🇬🇷 Grèce", chine: "🇨🇳 Chine", usa: "🇺🇸 USA",
  espagne: "🇪🇸 Espagne", maroc: "🇲🇦 Maroc", cuba: "🇨🇺 Cuba",
  vietnam: "🇻🇳 Vietnam", senegal: "🇸🇳 Sénégal", pologne: "🇵🇱 Pologne",
  coree: "🇰🇷 Corée", hongrie: "🇭🇺 Hongrie", tibet: "🏔️ Tibet",
  bresil: "🇧🇷 Brésil", indonesie: "🇮🇩 Indonésie", haiti: "🇭🇹 Haïti",
};

// === INDEXATION DES CARTES (faite une seule fois au chargement) ===
function construireIndexRecherche() {
  window._searchIndex = { cartes: [], parIngredient: {} };
  document.querySelectorAll(".carte").forEach(carte => {
    const cle = extraireCleRecetteCarte(carte);
    if (!cle) return;
    const nom = carte.querySelector("h2")?.textContent || "";
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
    
    const entry = {
      element: carte,
      cle,
      nom,
      nomNorm: normalizeText(nom),
      cat,
      pays,
      ingredients,
      ingredientsNorm: ingredients.map(i => normalizeText(i)),
    };
    window._searchIndex.cartes.push(entry);
    
    // Index inversé : ingrédient → liste de clés
    ingredients.forEach(ing => {
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
      // Match dans les ingrédients (exact uniquement, pas de fuzzy là)
      else if (mq.length >= 4 && entry.ingredientsNorm.some(i => i === mq)) score += 40;
      // Match préfixe ingrédient (≥4 chars pour ne pas matcher "cock"→"coco")
      else if (mq.length >= 4 && entry.ingredientsNorm.some(i => i.startsWith(mq))) score += 25;
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
  
  // 4. Recettes (top 5 scoring)
  const resultats = scorerCartes(qNorm).slice(0, 6);
  if (resultats.length > 0) {
    groupes.push({
      label: "Recettes",
      items: resultats.map(({ entry, score }) => ({
        icon: "🍽️", text: entry.nom,
        meta: entry.pays ? (LABELS_PAYS[entry.pays]?.split(" ")[0] || "") : "",
        action: `ouvrirFiche('${entry.cle}', null)`,
      })),
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
          <button class="suggestion-item" onclick="cacherSuggestions();${item.action}">
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

// Vide le champ de recherche sans déclencher la restauration d'état
function viderRechercheSilencieux() {
  const input = document.getElementById("search-input");
  if (input) input.value = "";
  const clear = document.getElementById("search-clear");
  if (clear) clear.style.display = "none";
  cacherSuggestions();
  window._etatAvantRecherche = null;
}

// =============================================================================
// 🥶 MODE VIDE-FRIGO v242
// =============================================================================
// Tu coches ce que tu as → on calcule les recettes possibles avec score de match
// =============================================================================

// Set des ingrédients sélectionnés (mémoire seulement, pas sauvé)
window._vfSelection = new Set();

// Labels pour catégoriser les ingrédients dans la liste affichée
const VF_CATEGORIES = {
  "🥩 Viandes & poissons": ["poulet","bœuf","boeuf","porc","agneau","veau","canard","dinde","lapin","jambon","lardons","bacon","saucisse","chorizo","merguez","steak","escalope","filet","saumon","thon","cabillaud","truite","crevette","crevettes","calmar","moules","huitres","sardine","anchois"],
  "🥛 Frais & laitages": ["lait","creme","crèmefraiche","yaourt","fromage","mozzarella","parmesan","feta","ricotta","mascarpone","cheddar","emmental","gruyere","chevre","beurre","margarine","oeuf","oeufs","jauneoeuf","blancsoeufs","tofu"],
  "🥬 Légumes": ["tomate","tomates","concombre","carotte","carottes","oignon","oignons","ail","echalote","poireau","celeri","fenouil","epinards","laitue","salade","mache","roquette","courgette","aubergine","poivron","poivrons","champignons","champignon","brocoli","choufleur","chou","haricots","petitspois","mais","navet","betterave","radis","asperges","artichaut","pdt","pommedeterre","patate","patatedouce","potiron","courge"],
  "🍎 Fruits": ["pomme","pommes","poire","banane","bananes","orange","oranges","citron","citrons","citronvert","fraise","fraises","framboise","myrtille","kiwi","mangue","ananas","peche","abricot","cerise","raisin","melon","pasteque","grenade","figue","datte","passion","coco"],
  "🌾 Féculents & pâtes": ["riz","pates","spaghetti","penne","tagliatelles","macaroni","lasagne","quinoa","semoule","couscous","boulgour","blé","farine","pain","baguette","tortilla","wrap","nouilles","ramen","udon"],
  "🥫 Conserves & secs": ["thon","sardine","haricotsblancs","haricotsrouges","poischiches","lentilles","poix","mais","olives","cornichons","cors","tomatespelees","tomatesconcassees","sauce","ketchup","mayonnaise","moutarde","vinaigre","vinaigrebalsamique"],
  "🧂 Épices & condiments": ["sel","poivre","sucre","huile","huiledolive","huiledetournesol","curry","paprika","cumin","curcuma","cannelle","muscade","gingembre","piment","tabasco","basilic","persil","thym","laurier","origan","romarin","menthe","coriandre","cerfeuil","ciboulette","aneth","estragon","safran","vanille","cacao","chocolat","levure","bicarbonate"],
};

// Charge la liste des ingrédients dans le DOM (appelé quand on entre dans la section)
function vfChargerIngredients() {
  const container = document.getElementById("vf-ingredients-container");
  if (!container) return;
  
  // Récupérer la liste de tous les ingrédients uniques utilisés dans les recettes
  // ET GROUPER PAR LABEL AFFICHÉ pour éviter les doublons (beurre/beurrPate/beurrCreme...)
  if (!window._vfIngredients) {
    const ingSet = new Set();
    Object.values(recettes).forEach(r => {
      const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
      if (!tabKey || !r[tabKey][0]) return;
      Object.keys(r[tabKey][0]).forEach(k => {
        if (k !== "nb" && k !== "patons" && k !== "total" && k !== "label") {
          ingSet.add(k);
        }
      });
    });
    
    // Construire le mapping label → [ingrédients_canoniques...]
    const labelToIngs = {};
    Array.from(ingSet).forEach(ing => {
      const label = (INGREDIENTS_LABELS && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
      if (!labelToIngs[label]) labelToIngs[label] = [];
      labelToIngs[label].push(ing);
    });
    
    // Une "entrée d'ingrédient" pour le vide-frigo = { label, ings: [variants] }
    window._vfIngredients = Object.entries(labelToIngs)
      .map(([label, ings]) => ({ label, ings, key: ings[0] })) // key = première variante pour stockage
      .sort((a, b) => a.label.localeCompare(b.label));
  }
  
  // Construire l'affichage par catégories
  let html = "";
  const labelsRanges = new Set();
  
  for (const [cat, mots] of Object.entries(VF_CATEGORIES)) {
    const entriesDeCetteCat = window._vfIngredients.filter(entry => {
      const labelLow = entry.label.toLowerCase();
      const ingsLow = entry.ings.map(i => i.toLowerCase());
      return mots.some(mot => {
        const m = mot.toLowerCase();
        return labelLow.includes(m) || ingsLow.some(i => i.includes(m));
      });
    });
    if (entriesDeCetteCat.length === 0) continue;
    
    html += `<div class="vf-cat-bloc">
      <h3 class="vf-cat-titre">${cat}</h3>
      <div class="vf-chips-row">`;
    entriesDeCetteCat.forEach(entry => {
      labelsRanges.add(entry.label);
      // On stocke le label comme clé du chip (uniqueness)
      const checked = window._vfSelection.has(entry.label) ? "vf-chip-active" : "";
      html += `<button class="vf-chip ${checked}" data-label="${entry.label}" onclick="vfToggleLabel('${entry.label.replace(/'/g, "\\'")}', this)">${entry.label}</button>`;
    });
    html += `</div></div>`;
  }
  
  // Catégorie "Autres" pour ce qui n'est pas rangé
  const autres = window._vfIngredients.filter(entry => !labelsRanges.has(entry.label));
  if (autres.length > 0) {
    html += `<div class="vf-cat-bloc">
      <h3 class="vf-cat-titre">📦 Autres</h3>
      <div class="vf-chips-row">`;
    autres.forEach(entry => {
      const checked = window._vfSelection.has(entry.label) ? "vf-chip-active" : "";
      html += `<button class="vf-chip ${checked}" data-label="${entry.label}" onclick="vfToggleLabel('${entry.label.replace(/'/g, "\\'")}', this)">${entry.label}</button>`;
    });
    html += `</div></div>`;
  }
  
  container.innerHTML = html;
  vfMettreAJourSelection();
}

// Toggle un label (qui regroupe potentiellement plusieurs variantes d'ingrédients)
function vfToggleLabel(label, btn) {
  if (window._vfSelection.has(label)) {
    window._vfSelection.delete(label);
    btn.classList.remove("vf-chip-active");
  } else {
    window._vfSelection.add(label);
    btn.classList.add("vf-chip-active");
  }
  vfMettreAJourSelection();
}

// Retourne l'ensemble des "ingrédients canoniques" actuellement sélectionnés
// (un label peut couvrir plusieurs variants : beurre, beurrPate, beurrCreme...)
function vfGetIngredientsCanoniques() {
  const result = new Set();
  if (!window._vfIngredients) return result;
  window._vfIngredients.forEach(entry => {
    if (window._vfSelection.has(entry.label)) {
      entry.ings.forEach(i => result.add(i));
    }
  });
  return result;
}

// Met à jour l'affichage du compteur et calcule les résultats
function vfMettreAJourSelection() {
  const info = document.getElementById("vf-selection-info");
  const n = window._vfSelection.size;
  if (info) {
    if (n === 0) {
      info.textContent = "Aucun ingrédient sélectionné — coche ce qui est dans ton frigo";
    } else {
      info.textContent = `✅ ${n} ingrédient${n > 1 ? "s" : ""} sélectionné${n > 1 ? "s" : ""}`;
    }
  }
  
  // Calculer et afficher les résultats
  const resultatsBox = document.getElementById("vf-resultats");
  const resultatsListe = document.getElementById("vf-resultats-liste");
  if (!resultatsBox || !resultatsListe) return;
  
  if (n === 0) {
    resultatsBox.style.display = "none";
    return;
  }
  
  // Récupérer TOUS les ingrédients canoniques sélectionnés (un label = potentiellement plusieurs variants)
  const ingredientsPossedes = vfGetIngredientsCanoniques();
  
  // Pour chaque recette, calculer le % de match (en regroupant aussi par label pour éviter double comptage)
  const resultats = [];
  Object.entries(recettes).forEach(([cle, r]) => {
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey || !r[tabKey][0]) return;
    
    const ingredients = Object.keys(r[tabKey][0]).filter(k => 
      k !== "nb" && k !== "patons" && k !== "total" && k !== "label"
    );
    if (ingredients.length === 0) return;
    
    // Convertir les ingrédients de la recette en LABELS uniques (pour ne pas compter beurre+beurrPate 2 fois)
    const labelsRecette = new Set();
    ingredients.forEach(ing => {
      const label = (INGREDIENTS_LABELS && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
      labelsRecette.add(label);
    });
    const labelsArr = Array.from(labelsRecette);
    
    // Combien de labels sont sélectionnés ?
    const labelsPossedes = labelsArr.filter(label => window._vfSelection.has(label));
    const labelsManquants = labelsArr.filter(label => !window._vfSelection.has(label));
    const pourcent = Math.round((labelsPossedes.length / labelsArr.length) * 100);
    
    // Ignorer les recettes trop incomplètes (<30%)
    if (pourcent < 30) return;
    
    resultats.push({ cle, recette: r, pourcent, manquants: labelsManquants, total: labelsArr.length });
  });
  
  // Trier par % décroissant
  resultats.sort((a, b) => b.pourcent - a.pourcent);
  
  if (resultats.length === 0) {
    resultatsListe.innerHTML = `<div class="vf-no-result">Aucune recette ne correspond — coche au moins quelques ingrédients de base !</div>`;
  } else {
    resultatsListe.innerHTML = resultats.slice(0, 30).map(({cle, recette, pourcent, manquants, total}) => {
      const nom = (typeof getNomRecette === "function" ? getNomRecette(cle) : cle);
      const couleur = pourcent === 100 ? "vf-100" : pourcent >= 80 ? "vf-80" : pourcent >= 60 ? "vf-60" : "vf-low";
      
      // Limiter à 5 ingrédients manquants affichés (déjà des labels propres)
      const manquantsAffichage = manquants.slice(0, 5);
      const manquantsTxt = manquants.length === 0 
        ? "✨ Tu as tout ce qu'il faut !" 
        : `Il te manque : ${manquantsAffichage.join(", ")}${manquants.length > 5 ? ` (+ ${manquants.length - 5} autres)` : ""}`;
      
      return `<div class="vf-result-card ${couleur}" onclick="ouvrirFiche('${cle}', null)">
        <div class="vf-result-pourcent">${pourcent}%</div>
        <div class="vf-result-info">
          <div class="vf-result-nom">${nom}</div>
          <div class="vf-result-manquants">${manquantsTxt}</div>
        </div>
      </div>`;
    }).join("");
  }
  
  resultatsBox.style.display = "block";
}

// Filtre les chips selon une recherche
// Normalise un texte pour recherche : minuscule, sans accent, sans ligature (œ→oe)
function vfNormalize(s) {
  if (!s) return "";
  return String(s).toLowerCase()
    .replace(/œ/g, "oe").replace(/æ/g, "ae")     // Ligatures FR
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");  // Accents
}

function vfFiltrerIngredients(query) {
  const q = vfNormalize(query.trim());
  document.querySelectorAll(".vf-chip").forEach(chip => {
    const txt = vfNormalize(chip.textContent);
    const label = vfNormalize(chip.getAttribute("data-label") || "");
    const match = !q || txt.includes(q) || label.includes(q);
    chip.style.display = match ? "" : "none";
  });
  // Cacher les catégories qui n'ont plus aucun chip visible
  document.querySelectorAll(".vf-cat-bloc").forEach(bloc => {
    const visibles = bloc.querySelectorAll('.vf-chip:not([style*="none"])').length;
    bloc.style.display = visibles === 0 ? "none" : "";
  });
}

// Tout décocher
function vfReset() {
  window._vfSelection.clear();
  document.querySelectorAll(".vf-chip-active").forEach(c => c.classList.remove("vf-chip-active"));
  vfMettreAJourSelection();
}

// =============================================================================
// ✋ MODAL DE CONFIRMATION CUSTOM v250
// =============================================================================
// Remplace le confirm() natif qui affichait obligatoirement "domaine.com indique"
// Usage : const ok = await confirmer("Tu es sûr ?");
// =============================================================================
window.confirmer = function(message, options = {}) {
  const {
    titre = "Confirmation",
    boutonOui = "Confirmer",
    boutonNon = "Annuler",
    dangereux = true, // si true, le bouton OUI est rouge
  } = options;
  
  return new Promise((resolve) => {
    // Créer la modal
    const overlay = document.createElement("div");
    overlay.className = "modal-confirm-overlay visible";
    overlay.innerHTML = `
      <div class="modal-confirm-box">
        <div class="modal-confirm-titre">${titre}</div>
        <div class="modal-confirm-message">${message}</div>
        <div class="modal-confirm-actions">
          <button class="modal-confirm-non">${boutonNon}</button>
          <button class="modal-confirm-oui ${dangereux ? "danger" : ""}">${boutonOui}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    
    // Animation d'entrée (force le reflow)
    void overlay.offsetWidth;
    overlay.classList.add("animate-in");
    
    const cleanup = (resultat) => {
      overlay.classList.remove("animate-in");
      setTimeout(() => overlay.remove(), 200);
      resolve(resultat);
    };
    
    overlay.querySelector(".modal-confirm-non").onclick = () => cleanup(false);
    overlay.querySelector(".modal-confirm-oui").onclick = () => cleanup(true);
    // Clic en dehors = annuler
    overlay.onclick = (e) => { if (e.target === overlay) cleanup(false); };
    // Touche Échap = annuler
    const escHandler = (e) => {
      if (e.key === "Escape") {
        cleanup(false);
        document.removeEventListener("keydown", escHandler);
      }
    };
    document.addEventListener("keydown", escHandler);
  });
};

// =============================================================================
// 🛒 LISTE DE COURSES INTELLIGENTE v249
// =============================================================================
// Sélection multi-recettes → consolidation des ingrédients → tri par rayon
// Storage : window.userProfile.listeCourses = [{cle, personnes}, ...]
// Storage : window.userProfile.listeCoursesCoches = ["label1", "label2", ...]
// =============================================================================

// Définition des RAYONS de supermarché (utilise les mots-clés de VF_CATEGORIES en partie)
const LC_RAYONS = {
  "🥩 Boucherie / Poissonnerie": ["poulet","bœuf","boeuf","porc","agneau","veau","canard","dinde","lapin","jambon","lardons","bacon","saucisse","chorizo","merguez","steak","escalope","filet","saumon","thon","cabillaud","truite","crevette","calmar","moule","huitre","sardine","anchois","viande","poisson","gambas","poulpe","seiche","langoustine","homard"],
  "🥬 Fruits & légumes": ["tomate","concombre","carotte","oignon","ail","echalote","poireau","celeri","fenouil","epinards","laitue","salade","mache","roquette","courgette","aubergine","poivron","champignon","brocoli","choufleur","chou","haricot","petitspois","mais","navet","betterave","radis","asperge","artichaut","pdt","pomme","patate","potiron","courge","banane","poire","orange","citron","fraise","framboise","myrtille","kiwi","mangue","ananas","peche","abricot","cerise","raisin","melon","pasteque","grenade","figue","datte","passion","avocat","coco","persil","basilic","menthe","coriandre","ciboulette","thym","romarin","laurier","gingembre"],
  "🥛 Frais & laitages": ["lait","creme","yaourt","fromage","mozzarella","parmesan","feta","ricotta","mascarpone","cheddar","emmental","gruyere","chevre","beurre","margarine","tofu","tempeh"],
  "🥚 Œufs & charcuterie": ["oeuf","jaune","blanc","jambon","lardons","bacon","chorizo","saucisson","serrano"],
  "🌾 Féculents & pâtes": ["riz","pates","spaghetti","penne","tagliatelle","macaroni","lasagne","quinoa","semoule","couscous","boulgour","blé","farine","pain","baguette","tortilla","wrap","nouilles","ramen","udon","gnocchi"],
  "🥫 Conserves & secs": ["haricotsblancs","haricotsrouges","poischiches","lentilles","olives","cornichons","tomatespelees","sauce","ketchup","mayonnaise","moutarde","vinaigre"],
  "🧂 Épices & condiments": ["sel","poivre","sucre","huile","curry","paprika","cumin","curcuma","cannelle","muscade","piment","tabasco","origan","estragon","aneth","cerfeuil","safran","vanille","cacao","chocolat","levure","bicarbonate","miel","confiture","sirop","sesame","tahini"],
  "🍷 Boissons & alcool": ["vin","biere","rhum","vodka","tequila","gin","cognac","whisky","champagne","liqueur","cointreau","jus","eau","soda","tonic","coca","perrier"],
  "🥖 Boulangerie": ["pain","baguette","brioche","croissant","viennoiserie"],
  "📦 Autres": [],
};

// Cherche le rayon d'un label
function lcTrouverRayon(label) {
  const labelLow = label.toLowerCase();
  for (const [rayon, mots] of Object.entries(LC_RAYONS)) {
    if (mots.some(m => labelLow.includes(m.toLowerCase()))) return rayon;
  }
  return "📦 Autres";
}

// === Ouvrir l'écran de sélection des recettes ===
function lcOuvrirSelectionRecettes() {
  const grille = document.getElementById("lc-grille-selection");
  if (!grille) return;
  
  // Récupérer toutes les recettes et trier par nom
  const listeRec = Object.entries(recettes)
    .map(([cle, r]) => ({ cle, nom: (typeof getNomRecette === "function") ? getNomRecette(cle) : cle }))
    .sort((a, b) => a.nom.localeCompare(b.nom));
  
  // Cles déjà dans le panier
  const dansPanier = new Set((window.userProfile?.listeCourses || []).map(p => p.cle));
  
  grille.innerHTML = listeRec.map(({cle, nom}) => {
    const dedans = dansPanier.has(cle);
    return `<button class="lc-recette-chip ${dedans ? "lc-chip-active" : ""}" data-cle="${cle}" data-nom="${nom.toLowerCase()}" onclick="lcToggleRecette('${cle}', this)">
      <span class="lc-chip-check">${dedans ? "✓" : ""}</span>
      <span class="lc-chip-nom">${nom}</span>
    </button>`;
  }).join("");
  
  document.getElementById("modal-lc-selection").classList.add("visible");
  // Vider la recherche
  const s = document.getElementById("lc-search");
  if (s) s.value = "";
  // Push état pour bouton retour
  if (typeof window._backGuardPush === "function") window._backGuardPush();
}

function fermerLCSelection() {
  document.getElementById("modal-lc-selection").classList.remove("visible");
  // Rafraîchir l'affichage après la sélection
  lcAfficherPanier();
  lcGenererListe();
}

function lcFiltrerRecettes(query) {
  const q = (typeof vfNormalize === "function" ? vfNormalize(query.trim()) : query.toLowerCase().trim());
  document.querySelectorAll(".lc-recette-chip").forEach(chip => {
    const nom = typeof vfNormalize === "function" ? vfNormalize(chip.getAttribute("data-nom") || "") : (chip.getAttribute("data-nom") || "");
    chip.style.display = (!q || nom.includes(q)) ? "" : "none";
  });
}

function lcToggleRecette(cle, btn) {
  if (!window.userProfile) {
    if (typeof afficherToast === "function") afficherToast("⚠️ Connecte-toi pour utiliser cette fonction");
    return;
  }
  if (!window.userProfile.listeCourses) window.userProfile.listeCourses = [];
  
  const existing = window.userProfile.listeCourses.findIndex(p => p.cle === cle);
  if (existing >= 0) {
    // Retirer
    window.userProfile.listeCourses.splice(existing, 1);
    btn.classList.remove("lc-chip-active");
    btn.querySelector(".lc-chip-check").textContent = "";
  } else {
    // Ajouter (nb personnes = foyer ou 4)
    const foyer = window.userProfile.foyer || {};
    const nb = (foyer.adultes || 0) + (foyer.ados || 0) + (foyer.enfants || 0) + (foyer.bebes || 0) || 4;
    window.userProfile.listeCourses.push({ cle, personnes: nb });
    btn.classList.add("lc-chip-active");
    btn.querySelector(".lc-chip-check").textContent = "✓";
  }
  
  // Sauvegarde Firebase silencieuse
  lcSauvegarder();
}

async function lcSauvegarder() {
  if (!window.currentUser || !window.userProfile) return;
  try {
    await _db.collection("utilisateurs").doc(window.currentUser.uid).set({
      listeCourses: window.userProfile.listeCourses || [],
      listeCoursesCoches: window.userProfile.listeCoursesCoches || [],
    }, { merge: true });
  } catch (e) { console.warn("Sauvegarde liste courses échouée :", e); }
}

// === Afficher le panier de recettes (zone du haut) ===
function lcAfficherPanier() {
  const panier = document.getElementById("lc-panier");
  const btnReset = document.getElementById("lc-btn-reset");
  if (!panier) return;
  
  const liste = window.userProfile?.listeCourses || [];
  if (liste.length === 0) {
    panier.innerHTML = `<div class="lc-panier-vide">Aucune recette sélectionnée<br><span style="font-size:13px;color:#888">Click sur "Ajouter des recettes" ci-dessus</span></div>`;
    if (btnReset) btnReset.style.display = "none";
    return;
  }
  if (btnReset) btnReset.style.display = "inline-flex";
  
  panier.innerHTML = `<h3 class="lc-panier-titre">🍽️ ${liste.length} recette${liste.length > 1 ? "s" : ""} sélectionnée${liste.length > 1 ? "s" : ""}</h3>
    <div class="lc-panier-recettes">${liste.map(({cle, personnes}) => {
      const nom = (typeof getNomRecette === "function") ? getNomRecette(cle) : cle;
      return `<div class="lc-recette-card">
        <span class="lc-recette-nom">${nom}</span>
        <div class="lc-recette-pers">
          <button onclick="lcChangerPersonnes('${cle}', -1)">−</button>
          <span>${personnes} pers.</span>
          <button onclick="lcChangerPersonnes('${cle}', 1)">+</button>
        </div>
        <button class="lc-recette-retirer" onclick="lcRetirerRecette('${cle}')" title="Retirer">✕</button>
      </div>`;
    }).join("")}</div>`;
}

function lcChangerPersonnes(cle, delta) {
  if (!window.userProfile?.listeCourses) return;
  const item = window.userProfile.listeCourses.find(p => p.cle === cle);
  if (!item) return;
  item.personnes = Math.max(1, Math.min(20, (item.personnes || 4) + delta));
  lcAfficherPanier();
  lcGenererListe();
  lcSauvegarder();
}

function lcRetirerRecette(cle) {
  if (!window.userProfile?.listeCourses) return;
  window.userProfile.listeCourses = window.userProfile.listeCourses.filter(p => p.cle !== cle);
  lcAfficherPanier();
  lcGenererListe();
  lcSauvegarder();
}

async function lcViderListe() {
  const ok = await confirmer("Vider toute la liste de courses ?", {
    titre: "🗑️ Vider la liste",
    boutonOui: "Tout vider",
    boutonNon: "Annuler",
  });
  if (!ok) return;
  if (window.userProfile) {
    window.userProfile.listeCourses = [];
    window.userProfile.listeCoursesCoches = [];
  }
  lcAfficherPanier();
  lcGenererListe();
  lcSauvegarder();
}

// === Consolider les ingrédients de toutes les recettes du panier ===
function lcGenererListe() {
  const liste = window.userProfile?.listeCourses || [];
  const zone = document.getElementById("lc-liste");
  if (!zone) return;
  
  if (liste.length === 0) {
    zone.style.display = "none";
    return;
  }
  
  // Map { label : { quantites: [{val, unite}], rayon } }
  const consolidation = {};
  
  liste.forEach(({cle, personnes}) => {
    const r = recettes[cle];
    if (!r) return;
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey || !r[tabKey][0]) return;
    
    const base = r.base || 4;
    // Trouver la ligne qui correspond à `personnes`
    let ligne = r[tabKey].find(l => l.nb === personnes || l.patons === personnes);
    let ratio = 1;
    if (!ligne) {
      // Pas de ligne exacte → prendre la ligne de base et appliquer un ratio
      ligne = r[tabKey].find(l => l.nb === base || l.patons === base) || r[tabKey][0];
      ratio = personnes / base;
    }
    
    Object.entries(ligne).forEach(([ing, val]) => {
      if (ing === "nb" || ing === "patons" || ing === "total" || ing === "label") return;
      if (val === "—" || val === "" || !val) return;
      
      // Label affiché (commun aux variantes)
      const label = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
      
      // Parser quantité
      const q = (typeof parserQuantite === "function") ? parserQuantite(val) : null;
      
      if (!consolidation[label]) {
        consolidation[label] = { rayon: lcTrouverRayon(label), parts: [] };
      }
      
      if (q && q.valeur > 0) {
        consolidation[label].parts.push({ valeur: q.valeur * ratio, unite: q.unite });
      } else {
        // Pas parsable → afficher la valeur brute multipliée si possible
        consolidation[label].parts.push({ valeur: val, unite: "brut" });
      }
    });
  });
  
  // Construire l'affichage : on regroupe par rayon
  const parRayon = {};
  Object.entries(consolidation).forEach(([label, info]) => {
    if (!parRayon[info.rayon]) parRayon[info.rayon] = [];
    
    // Sommer les parts par unité
    const parUnite = {};
    info.parts.forEach(p => {
      if (!parUnite[p.unite]) parUnite[p.unite] = 0;
      if (typeof p.valeur === "number") parUnite[p.unite] += p.valeur;
      else parUnite["brut"] = (parUnite["brut"] || 0); // ignorer les brut multiples
    });
    
    // Formater pour affichage
    const formatages = [];
    Object.entries(parUnite).forEach(([u, v]) => {
      if (u === "poids") {
        // Convertir en g/kg selon la valeur
        const val = Math.round(v * 10) / 10;
        formatages.push(val >= 1000 ? (val/1000).toFixed(1) + " kg" : val + " g");
      } else if (u === "unite") {
        formatages.push(Math.round(v * 10) / 10 + " unité" + (v > 1 ? "s" : ""));
      } else if (u === "brut") {
        formatages.push("(qté variable)");
      }
    });
    
    parRayon[info.rayon].push({ label, qte: formatages.join(" + ") || "(qté indéfinie)" });
  });
  
  // Rayons ordonnés (selon LC_RAYONS keys)
  const rayonsOrdonnes = Object.keys(LC_RAYONS).filter(r => parRayon[r] && parRayon[r].length > 0);
  
  // Récupérer les cochés
  const coches = new Set(window.userProfile?.listeCoursesCoches || []);
  let nbTotal = 0, nbCoches = 0;
  
  const html = rayonsOrdonnes.map(rayon => {
    const items = parRayon[rayon].sort((a, b) => a.label.localeCompare(b.label));
    return `<div class="lc-rayon">
      <h4 class="lc-rayon-titre">${rayon} <span class="lc-rayon-count">${items.length}</span></h4>
      <div class="lc-items">${items.map(({label, qte}) => {
        nbTotal++;
        const checked = coches.has(label);
        if (checked) nbCoches++;
        return `<label class="lc-item ${checked ? "lc-item-coche" : ""}">
          <input type="checkbox" ${checked ? "checked" : ""} onchange="lcToggleItem('${label.replace(/'/g, "\\'")}', this)">
          <span class="lc-item-label">${label}</span>
          <span class="lc-item-qte">${qte}</span>
        </label>`;
      }).join("")}</div>
    </div>`;
  }).join("");
  
  document.getElementById("lc-rayons").innerHTML = html;
  document.getElementById("lc-progress").textContent = `${nbCoches} / ${nbTotal} cochés`;
  zone.style.display = "block";
}

function lcToggleItem(label, checkbox) {
  if (!window.userProfile) return;
  if (!window.userProfile.listeCoursesCoches) window.userProfile.listeCoursesCoches = [];
  
  if (checkbox.checked) {
    if (!window.userProfile.listeCoursesCoches.includes(label)) {
      window.userProfile.listeCoursesCoches.push(label);
    }
  } else {
    window.userProfile.listeCoursesCoches = window.userProfile.listeCoursesCoches.filter(l => l !== label);
  }
  
  // MAJ visuelle immédiate
  checkbox.closest(".lc-item")?.classList.toggle("lc-item-coche", checkbox.checked);
  
  // MAJ compteur
  const total = document.querySelectorAll(".lc-item").length;
  const coches = document.querySelectorAll(".lc-item input:checked").length;
  const progress = document.getElementById("lc-progress");
  if (progress) progress.textContent = `${coches} / ${total} cochés`;
  
  lcSauvegarder();
}

// Switch entre les onglets Cuisine
function switchCuisineTab(tab) {
  document.getElementById("tab-videfrigo")?.classList.toggle("active", tab === "videfrigo");
  document.getElementById("tab-courses")?.classList.toggle("active", tab === "courses");
  const ongletVF = document.getElementById("cuisine-onglet-videfrigo");
  const ongletC  = document.getElementById("cuisine-onglet-courses");
  if (ongletVF) ongletVF.style.display = tab === "videfrigo" ? "block" : "none";
  if (ongletC)  ongletC.style.display  = tab === "courses"   ? "block" : "none";
  
  // Si on bascule sur Courses, rafraîchir l'affichage
  if (tab === "courses") {
    lcAfficherPanier();
    lcGenererListe();
  }
}

// === v247 : Génère un prompt + copie + affiche les options IA ===
async function vfDemanderIA() {
  // 1. Vérifier qu'il y a au moins un ingrédient
  if (window._vfSelection.size === 0) {
    if (typeof afficherToast === "function") afficherToast("⚠️ Coche d'abord quelques ingrédients !");
    return;
  }
  
  // 2. Récupérer les labels sélectionnés (lisibles, sans variantes techniques)
  const ingredients = Array.from(window._vfSelection)
    .map(label => label.replace(/^[^\s]+\s+/, "").trim()) // retirer l'emoji au début
    .filter(Boolean);
  
  // 3. Récupérer le contexte foyer + préférences pour personnaliser
  const user = window.userProfile || {};
  const foyer = user.foyer || {};
  const prefs = user.preferences || {};
  
  const nbPersonnes = (foyer.adultes || 0) + (foyer.ados || 0) + (foyer.enfants || 0) + (foyer.bebes || 0);
  const nb = nbPersonnes > 0 ? nbPersonnes : 4;
  
  // 4. Construire les contraintes
  const contraintes = [];
  if (foyer.bebes > 0) contraintes.push(`il y a ${foyer.bebes} bébé(s) de 0-2 ans (pas de miel, peu de sel, pas de fruits à coque entiers)`);
  if (foyer.enfants > 0) contraintes.push(`il y a ${foyer.enfants} enfant(s) (3-12 ans)`);
  
  const regimes = prefs.regimes || [];
  if (regimes.length > 0) contraintes.push(`régime alimentaire : ${regimes.join(", ")}`);
  
  const allergies = (prefs.allergies || []).concat(prefs.allergiesCustom || []);
  if (allergies.length > 0) contraintes.push(`allergies/intolérances à éviter ABSOLUMENT : ${allergies.join(", ")}`);
  
  const niveau = prefs.niveauCuisine || "débutant";
  
  // 5. Construire le prompt final
  const prompt = `Bonjour ! Voici les ingrédients que j'ai actuellement dans mon frigo / placards :

🛒 INGRÉDIENTS DISPONIBLES :
${ingredients.map(i => `- ${i}`).join("\n")}

👨‍👩‍👧 CONTEXTE :
- À cuisiner pour ${nb} personne${nb > 1 ? "s" : ""}
- Niveau cuisine : ${niveau}
${contraintes.length > 0 ? contraintes.map(c => `- ${c}`).join("\n") : ""}

📋 CE QUE JE VEUX :
Propose-moi UNE recette créative et délicieuse que je peux faire avec ces ingrédients (tu peux ajouter quelques basiques comme sel, poivre, huile, eau, mais idéalement pas trop d'ingrédients hors liste).

Format attendu :
1. **Nom de la recette** (avec un petit emoji)
2. ⏱ Temps de préparation et de cuisson
3. 📋 Liste des ingrédients (avec quantités précises pour ${nb} pers.)
4. 👨‍🍳 Étapes de préparation détaillées
5. 💡 Astuce ou variante si pertinent

Merci !`;
  
  // 6. Copier dans le presse-papier
  let copieOK = false;
  try {
    await navigator.clipboard.writeText(prompt);
    copieOK = true;
  } catch (e) {
    // Fallback : ancien navigateur ou permission refusée
    const textarea = document.createElement("textarea");
    textarea.value = prompt;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      copieOK = true;
    } catch (e2) {}
    document.body.removeChild(textarea);
  }
  
  // 7. Toast et affichage du menu de choix IA
  if (copieOK) {
    if (typeof afficherToast === "function") afficherToast("📋 Prompt copié — choisis ton IA !");
  } else {
    if (typeof afficherToast === "function") afficherToast("⚠️ Copie impossible — utilise un site IA et redemande");
  }
  
  // Afficher le menu de choix IA
  const choix = document.getElementById("vf-ia-choix");
  if (choix) {
    choix.style.display = "block";
    // Scroller pour voir les options
    setTimeout(() => choix.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  }
}

// Ouvre le site IA choisi dans un nouvel onglet
function vfOuvrirIA(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// === Recherche principale ===
function rechercherRecette(query) {
  const q = query.toLowerCase().trim();
  const clear = document.getElementById("search-clear");
  if (clear) clear.style.display = q ? "flex" : "none";
  
  // Capture état pour la recherche contextuelle (au premier caractère)
  if (q && !window._etatAvantRecherche) {
    window._etatAvantRecherche = new Map();
    document.querySelectorAll(".carte").forEach(c => {
      window._etatAvantRecherche.set(c, c.style.display !== "none");
    });
  }
  
  // Si vidée : restaurer
  if (!q) {
    cacherSuggestions();
    if (window._etatAvantRecherche) {
      window._etatAvantRecherche.forEach((etaitVisible, c) => {
        c.style.display = etaitVisible ? "" : "none";
      });
      window._etatAvantRecherche = null;
    } else if (typeof afficherAccueil === "function") {
      afficherAccueil();
    }
    return;
  }
  
  // Construire l'index si pas encore fait
  if (!window._searchIndex) construireIndexRecherche();
  
  // === v240 : AUTO-FILTRE sur match EXACT d'un mot-clé ===
  // Si l'utilisateur tape "cocktail" entier, on applique direct le filtre catégorie
  const qNorm = normalizeText(q);
  if (SYNONYMES_CATEGORIE[qNorm]) {
    const cat = SYNONYMES_CATEGORIE[qNorm];
    viderRechercheSilencieux();
    // Petit délai pour laisser le DOM respirer
    setTimeout(() => filtrerChipCategorieDepuisRecherche(cat), 50);
    return;
  }
  if (SYNONYMES_PAYS[qNorm]) {
    const pays = SYNONYMES_PAYS[qNorm];
    viderRechercheSilencieux();
    setTimeout(() => filtrerChipPaysDepuisRecherche(pays), 50);
    return;
  }
  if (SYNONYMES_REGIME[qNorm]) {
    const reg = SYNONYMES_REGIME[qNorm];
    viderRechercheSilencieux();
    setTimeout(() => filtrerParRegime(reg), 50);
    return;
  }
  
  // Sinon : afficher les suggestions + filtrer les cartes en mode recherche libre
  // Assurer que la grille est visible
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  if (secAccueil) secAccueil.style.display = "none";
  if (secCartes) secCartes.classList.add("visible");
  
  // Afficher les suggestions dropdown
  afficherSuggestions(q);
  
  // Faire le filtrage des cartes en arrière-plan
  const resultats = scorerCartes(qNorm);
  const setMatch = new Set(resultats.map(r => r.entry.element));
  
  document.querySelectorAll(".carte").forEach(carte => {
    const etaitVisible = window._etatAvantRecherche.get(carte) !== false;
    carte.style.display = (etaitVisible && setMatch.has(carte)) ? "" : "none";
  });
  
  if (typeof appliquerPreferencesVisuelles === 'function') appliquerPreferencesVisuelles();
}

function viderRecherche() {
  const input = document.getElementById("search-input");
  if (input) input.value = "";
  const clear = document.getElementById("search-clear");
  if (clear) clear.style.display = "none";
  
  // Restaurer l'état d'avant la recherche (préserver le filtre Mon Profil/catégorie/etc.)
  if (window._etatAvantRecherche) {
    window._etatAvantRecherche.forEach((etaitVisible, c) => {
      c.style.display = etaitVisible ? "" : "none";
    });
    window._etatAvantRecherche = null;
  } else {
    // Cas où il n'y avait pas d'état (rare) : retour accueil
    if (typeof afficherAccueil === "function") afficherAccueil();
    else afficherTout();
  }
}

// === v236 : Nouvelle fonction principale pour le mode "Recettes" ===
// Affiche la grille de cartes + la barre de chips filtres (catégorie + pays)
function afficherRecettes() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (typeof masquerSectionMenusFavoris === "function") masquerSectionMenusFavoris();
  reinitialiserRecherche();
  
  // Désactiver les autres boutons, activer "Recettes"
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("btn-recettes")?.classList.add("active");
  
  // Afficher la barre de chips
  const chips = document.getElementById("filtres-chips");
  if (chips) chips.style.display = "block";
  
  // Réinitialiser les chips : "Tout" actif sur chaque ligne
  document.querySelectorAll(".filtres-chips .chip").forEach(c => c.classList.remove("active"));
  document.querySelectorAll(".chips-row").forEach(row => {
    const premiereChip = row.querySelector(".chip");
    if (premiereChip) premiereChip.classList.add("active");
  });
  
  // Réinitialiser les filtres internes
  window._filtreCategorie = "all";
  window._filtrePays = "all";
  
  // Basculer vers la grille
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  const secCuisine    = document.getElementById("section-cuisine");
  const secPlan    = document.getElementById("section-planificateur");
  const secFestif  = document.getElementById("section-festif");
  if (secAccueil) secAccueil.style.display = "none";
  if (secCartes)  {
    secCartes.classList.add("visible");
    secCartes.style.display = "";
  }
  if (secCuisine)    secCuisine.style.display = "none";
  if (secPlan)    secPlan.style.display = "none";
  if (secFestif)  secFestif.style.display = "none";
  
  // Afficher toutes les cartes
  document.querySelectorAll(".carte").forEach(c => {
    c.style.display = "";
    c.style.removeProperty("display");
  });
  
  if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
  if (typeof appliquerNutriScoreCartes === "function") appliquerNutriScoreCartes();
}

// === Chip "Catégorie" : filtre combiné catégorie + pays ===
function filtrerChipCategorie(cat, btn) {
  window._filtreCategorie = cat;
  if (btn) {
    btn.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
  }
  appliquerFiltresChips();
}

// === Chip "Pays" : filtre combiné pays + catégorie ===
function filtrerChipPays(pays, btn) {
  window._filtrePays = pays;
  if (btn) {
    btn.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
  }
  appliquerFiltresChips();
}

// === Application combinée des 2 filtres (catégorie ET pays) ===
function appliquerFiltresChips() {
  const cat  = window._filtreCategorie || "all";
  const pays = window._filtrePays || "all";
  reinitialiserRecherche();
  document.querySelectorAll(".carte").forEach(c => {
    const okCat  = (cat === "all")  || (c.dataset.cat === cat);
    const okPays = (pays === "all") || (c.dataset.pays === pays);
    c.style.display = (okCat && okPays) ? "" : "none";
  });
  if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
}

// === Cacher la barre de chips (Accueil/Favoris/Mon Profil) ===
function cacherFiltresChips() {
  const chips = document.getElementById("filtres-chips");
  if (chips) chips.style.display = "none";
  const chipsFav = document.getElementById("filtres-favoris-chips");
  if (chipsFav) chipsFav.style.display = "none";
}

// === v236 : Mode "Favoris" avec chips Recettes/Menus ===
function afficherFavorisAvecChips() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  reinitialiserRecherche();
  
  // Activer le bouton Favoris
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("btn-favoris")?.classList.add("active");
  
  // Cacher la barre de chips Recettes (cat+pays) et afficher la barre Favoris
  const chipsRec = document.getElementById("filtres-chips");
  if (chipsRec) chipsRec.style.display = "none";
  const chipsFav = document.getElementById("filtres-favoris-chips");
  if (chipsFav) chipsFav.style.display = "block";
  
  // Activer la chip "Recettes favorites" par défaut
  document.getElementById("chip-fav-recettes")?.classList.add("active");
  document.getElementById("chip-fav-menus")?.classList.remove("active");
  
  // Afficher les recettes favorites par défaut
  filtrerFavoris();
}

// === Chip "Recettes favorites" dans le mode Favoris ===
function chipFavorisRecettes(btn) {
  if (btn) {
    btn.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
  }
  filtrerFavoris();
  // Re-afficher la barre de chips Favoris (filtrerFavoris la cache)
  const chipsFav = document.getElementById("filtres-favoris-chips");
  if (chipsFav) chipsFav.style.display = "block";
}

// === Chip "Menus favoris" dans le mode Favoris ===
function chipFavorisMenus(btn) {
  if (btn) {
    btn.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
  }
  filtrerMenusFavoris();
  // Re-afficher la barre de chips Favoris (filtrerMenusFavoris la cache)
  const chipsFav = document.getElementById("filtres-favoris-chips");
  if (chipsFav) chipsFav.style.display = "block";
}

// === Compatibilité : afficherTout() → afficherRecettes() ===
// Certains liens HTML (accueil "Voir tout →") appellent encore afficherTout
function afficherTout() {
  afficherRecettes();
}

// Toggle sous-menu générique
function toggleSousMenu(menuId, btn) {
  // v236 : les sous-menus dépliables ont été remplacés par des chips
  // Cette fonction redirige vers le mode "Recettes" (chips visibles)
  if (typeof afficherRecettes === "function") afficherRecettes();
}

function fermerSousMenus() {
  // v236 : les sous-menus dépliables ont été remplacés par des chips fixes
  // Cette fonction est gardée pour la compatibilité mais devient un no-op
  ["menu-categories", "menu-pays", "menu-cocktails"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
  document.getElementById("btn-categories")?.classList.remove("active");
  document.getElementById("btn-monde")?.classList.remove("active");
}

// Filtre catégories (depuis sous-menu)

// Utilitaire : basculer vers la grille des recettes
function basculeVersGrille() {
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  if (secAccueil) secAccueil.style.display = "none";
  if (secCartes) {
    secCartes.classList.add("visible");
    // S'assurer que le style inline ne bloque pas
    secCartes.style.display = "";
  }
  if (typeof masquerSectionMenusFavoris === "function") masquerSectionMenusFavoris();
}

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
  // Mettre à jour l'input #personnes (utilisé en interne par choisirRecette)
  const inputP = document.getElementById("personnes");
  if (inputP) {
    inputP.value = personnes;
    inputP.dataset.modified = "1";
  }
  // Re-appeler choisirRecette qui régénère tout le HTML de la fiche
  choisirRecette(nom);
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
  
  const input = inputId ? document.getElementById(inputId) : null;
  // Si l'input existe ET n'a pas été modifié manuellement, le synchroniser avec le foyer
  // (au cas où le profil aurait été chargé après l'init initial)
  if (input && !input.dataset.modifie) {
    const foyer = window.userProfile?.foyer;
    if (foyer) {
      const nb = (foyer.adultes || 0) + (foyer.ados || 0) +
                 (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0);
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
// ================================================================
// 📊 MES STATS — Dashboard utilisateur
// ================================================================

// Fonction principale qui calcule et affiche toutes les stats
function chargerMesStats() {
  const user = window.userProfile;
  const subtitle = document.getElementById("stats-subtitle");
  
  // Si pas connecté
  if (!user || !user.uid) {
    if (subtitle) subtitle.innerHTML = `👤 <a onclick="ouvrirModalAuth()" style="color:#ff8fb3;cursor:pointer;text-decoration:underline">Connectez-vous</a> pour voir vos statistiques personnelles`;
    document.getElementById("stats-overview").innerHTML = "";
    document.getElementById("stats-records").innerHTML = "";
    document.getElementById("stats-evolution").innerHTML = "";
    document.getElementById("stats-badges").innerHTML = "";
    return;
  }
  
  const prenom = user.prenom || user.email?.split("@")[0] || "vous";
  if (subtitle) subtitle.textContent = `Suivez votre aventure culinaire, ${prenom} !`;
  
  // Calculer les statistiques
  const stats = calculerToutesStats();
  
  // Remplir les sections
  remplirVueEnsemble(stats);
  remplirRecords(stats);
  remplirEvolution(stats);
  remplirBadges(stats);
}

// Calcule toutes les statistiques à partir des données utilisateur
function calculerToutesStats() {
  const user = window.userProfile || {};
  const favoris = user.favoris || [];
  const menusFavoris = user.menusFavoris || [];
  const historique = user.historiqueMenus || [];
  const recents = window._recentsVus || [];
  const cuisinees = user.recettesCuisinees || []; // v240 : nouveau tracking manuel
  
  // 1) Recettes "vues" (large) — utilisé pour les stats secondaires (top pays, top cat)
  const recettesVues = new Set([...recents, ...favoris]);
  historique.forEach(menu => {
    (menu.menus || menu.menu || []).forEach(plat => {
      if (typeof plat === "string") recettesVues.add(plat);
      else if (plat && plat.cle) recettesVues.add(plat.cle);
    });
  });
  
  // 1bis) Recettes RÉELLEMENT cuisinées (manuel) — base des stats principales
  const recettesCuisineesSet = new Set(cuisinees.map(c => c.cle));
  // Total de "cuissons" (recette comptée plusieurs fois si refaite)
  const totalCuissons = cuisinees.reduce((sum, c) => sum + (c.count || 1), 0);
  
  // 1ter) v242 : Calculer le STREAK (jours consécutifs à cuisiner)
  // On regarde les dernierDate des recettes cuisinées, on calcule la plus longue série de jours consécutifs
  let streakActuel = 0;
  let streakRecord = 0;
  if (cuisinees.length > 0) {
    // Récupérer les dates uniques de cuisson (sans l'heure)
    const datesUnique = new Set();
    cuisinees.forEach(c => {
      if (c.dernierDate) {
        const d = new Date(c.dernierDate);
        if (!isNaN(d.getTime())) {
          datesUnique.add(d.toISOString().slice(0, 10)); // "YYYY-MM-DD"
        }
      }
    });
    // Trier les dates
    const dates = Array.from(datesUnique).sort();
    
    // Calculer le streak record
    let courant = 1;
    for (let i = 1; i < dates.length; i++) {
      const d1 = new Date(dates[i - 1]);
      const d2 = new Date(dates[i]);
      const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        courant++;
        if (courant > streakRecord) streakRecord = courant;
      } else {
        courant = 1;
      }
    }
    if (dates.length === 1) streakRecord = 1;
    else if (courant > streakRecord) streakRecord = courant;
    
    // Calculer le streak actuel (en cours)
    const aujourdhui = new Date().toISOString().slice(0, 10);
    const hier = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (dates[dates.length - 1] === aujourdhui || dates[dates.length - 1] === hier) {
      // Streak en cours : remonter en arrière
      streakActuel = 1;
      for (let i = dates.length - 1; i > 0; i--) {
        const d1 = new Date(dates[i - 1]);
        const d2 = new Date(dates[i]);
        const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
        if (diff === 1) streakActuel++;
        else break;
      }
    }
  }
  
  // 2) Compteur recettes refaites (depuis cuisinees, plus précis)
  const compteurRecettes = {};
  cuisinees.forEach(c => { compteurRecettes[c.cle] = c.count || 1; });
  
  // 3) Calculer prix et kcal — sur les recettes CUISINÉES uniquement
  let prixTotalCumule = 0, prixCount = 0;
  let calTotalCumule = 0, calCount = 0;
  let recettePlusChere = null, recettePlusKcal = null, recettePlusRapide = null;
  let prixMax = 0, calMax = 0, tempsMin = Infinity;
  
  // Si pas encore de recettes cuisinées, on calcule sur les favoris pour ne pas avoir 0 partout
  const baseCalcul = recettesCuisineesSet.size > 0 ? recettesCuisineesSet : new Set(favoris);
  
  baseCalcul.forEach(cle => {
    const r = recettes[cle];
    if (!r) return;
    
    // Prix et calories via la nouvelle fonction
    if (typeof calculerPrixCaloriesRecette === "function") {
      const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
      if (tabKey && r[tabKey].length) {
        const base = r.base || 4;
        const ligne = r[tabKey].find(l => l.nb === base || l.patons === base) || r[tabKey][0];
        const res = calculerPrixCaloriesRecette(ligne);
        if (res.prix > 0) {
          // Ramener par personne (base = nb personnes de la recette de référence)
          const prixParPers = res.prix / base;
          prixTotalCumule += prixParPers;
          prixCount++;
          if (res.prix > prixMax) { prixMax = res.prix; recettePlusChere = cle; }
        }
        if (res.cal > 0) {
          // Ramener par personne aussi
          const calParPers = res.cal / base;
          calTotalCumule += calParPers;
          calCount++;
          if (res.cal > calMax) { calMax = res.cal; recettePlusKcal = cle; }
        }
      }
    }
    
    // Temps de préparation (extraire les minutes)
    const temps = r.temps || "";
    const min = parseInt(temps.match(/(\d+)\s*min/)?.[1] || temps.match(/(\d+)\s*h/)?.[1]*60 || 0);
    if (min > 0 && min < tempsMin) { tempsMin = min; recettePlusRapide = cle; }
  });
  
  // 4) Recette la plus refaite
  let recettePlusRefaite = null, maxRefait = 0;
  Object.entries(compteurRecettes).forEach(([cle, n]) => {
    if (n > maxRefait) { maxRefait = n; recettePlusRefaite = cle; }
  });
  
  // 5) Compter par pays / catégorie sur favoris + historique
  const paysCount = {};
  const catCount = {};
  recettesVues.forEach(cle => {
    const r = recettes[cle];
    if (!r) return;
    if (r.pays) paysCount[r.pays] = (paysCount[r.pays] || 0) + 1;
    if (r.cat) catCount[r.cat] = (catCount[r.cat] || 0) + 1;
  });
  const topPays = Object.entries(paysCount).sort((a,b) => b[1] - a[1])[0];
  const topCat = Object.entries(catCount).sort((a,b) => b[1] - a[1])[0];
  
  // 6) Évolution mensuelle (nombre de menus générés par mois)
  const parMois = {};
  historique.forEach(menu => {
    const date = menu.date ? new Date(menu.date) : null;
    if (!date || isNaN(date.getTime())) return;
    const ym = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
    parMois[ym] = (parMois[ym] || 0) + 1;
  });
  
  return {
    nbRecettesEssayees: recettesVues.size,
    // v241 : compteur cumulatif (persiste entre sessions, jamais reset à 0)
    nbRecettesVues: Math.max(user.totalRecettesVues || 0, recettesVues.size),
    nbRecettesCuisinees: recettesCuisineesSet.size, // v240 : nouveau
    totalCuissons: totalCuissons, // v240 : total des fois où des recettes ont été cuisinées
    streakActuel: streakActuel, // v242 : jours consécutifs actuels
    streakRecord: streakRecord, // v242 : record historique
    nbFavoris: favoris.length,
    nbMenusFavoris: menusFavoris.length,
    nbMenusGeneres: historique.length,
    prixMoyen: prixCount > 0 ? prixTotalCumule / prixCount : 0, // v240 : par personne
    calMoyen: calCount > 0 ? calTotalCumule / calCount : 0,     // v240 : par personne
    recettePlusChere: recettePlusChere ? { cle: recettePlusChere, prix: prixMax } : null,
    recettePlusKcal: recettePlusKcal ? { cle: recettePlusKcal, cal: calMax } : null,
    recettePlusRapide: recettePlusRapide ? { cle: recettePlusRapide, temps: tempsMin } : null,
    recettePlusRefaite: recettePlusRefaite ? { cle: recettePlusRefaite, n: maxRefait } : null,
    topPays,
    topCat,
    parMois,
  };
}

// Remplit la section "Vue d'ensemble"
function remplirVueEnsemble(s) {
  const html = `
    <div class="stat-card stat-card-or">
      <div class="stat-emoji">👨‍🍳</div>
      <div class="stat-valeur">${s.totalCuissons}</div>
      <div class="stat-label">Recettes cuisinées</div>
    </div>
    <div class="stat-card stat-card-rose">
      <div class="stat-emoji">❤️</div>
      <div class="stat-valeur">${s.nbFavoris}</div>
      <div class="stat-label">Favoris</div>
    </div>
    <div class="stat-card stat-card-violet">
      <div class="stat-emoji">📅</div>
      <div class="stat-valeur">${s.nbMenusGeneres}</div>
      <div class="stat-label">Menus générés</div>
    </div>
    <div class="stat-card stat-card-vert">
      <div class="stat-emoji">💝</div>
      <div class="stat-valeur">${s.nbMenusFavoris}</div>
      <div class="stat-label">Menus favoris</div>
    </div>
    <div class="stat-card stat-card-orange">
      <div class="stat-emoji">💰</div>
      <div class="stat-valeur">${s.prixMoyen > 0 ? s.prixMoyen.toFixed(2) + " €" : "—"}</div>
      <div class="stat-label">Prix moyen / pers.</div>
    </div>
    <div class="stat-card stat-card-turquoise">
      <div class="stat-emoji">🔥</div>
      <div class="stat-valeur">${s.calMoyen > 0 ? Math.round(s.calMoyen) : "—"}</div>
      <div class="stat-label">Kcal moyennes / pers.</div>
    </div>
  `;
  document.getElementById("stats-overview").innerHTML = html;
}

// Remplit la section "Records"
function remplirRecords(s) {
  const nomRecette = (cle) => {
    if (!cle) return "—";
    if (typeof getNomRecette === "function") return getNomRecette(cle);
    return cle;
  };
  
  const records = [];
  
  if (s.recettePlusRefaite && s.recettePlusRefaite.n >= 2) {
    records.push({
      icon: "🥇",
      label: "Recette préférée",
      valeur: nomRecette(s.recettePlusRefaite.cle),
      detail: `Faite ${s.recettePlusRefaite.n} fois`,
      cle: s.recettePlusRefaite.cle,
    });
  }
  
  if (s.recettePlusChere) {
    records.push({
      icon: "💎",
      label: "Plus chère cuisinée",
      valeur: nomRecette(s.recettePlusChere.cle),
      detail: `${s.recettePlusChere.prix.toFixed(2)} €`,
      cle: s.recettePlusChere.cle,
    });
  }
  
  if (s.recettePlusKcal) {
    records.push({
      icon: "🔥",
      label: "Plus calorique",
      valeur: nomRecette(s.recettePlusKcal.cle),
      detail: `${s.recettePlusKcal.cal} kcal`,
      cle: s.recettePlusKcal.cle,
    });
  }
  
  if (s.recettePlusRapide && s.recettePlusRapide.temps < Infinity) {
    records.push({
      icon: "⚡",
      label: "La plus rapide",
      valeur: nomRecette(s.recettePlusRapide.cle),
      detail: `${s.recettePlusRapide.temps} min`,
      cle: s.recettePlusRapide.cle,
    });
  }
  
  if (s.topPays) {
    const flags = {
      france: "🇫🇷", italie: "🇮🇹", japon: "🇯🇵", usa: "🇺🇸", mexique: "🇲🇽",
      espagne: "🇪🇸", chine: "🇨🇳", inde: "🇮🇳", thailande: "🇹🇭", grece: "🇬🇷",
      maroc: "🇲🇦", liban: "🇱🇧", coree: "🇰🇷", vietnam: "🇻🇳", allemagne: "🇩🇪",
    };
    records.push({
      icon: flags[s.topPays[0]] || "🌍",
      label: "Cuisine favorite",
      valeur: s.topPays[0].charAt(0).toUpperCase() + s.topPays[0].slice(1),
      detail: `${s.topPays[1]} recette${s.topPays[1] > 1 ? "s" : ""}`,
    });
  }
  
  if (s.topCat) {
    const catEmojis = {
      plats: "🍽️", desserts: "🍰", salades: "🥗", healthy: "💚", brunch: "🍳",
      boulangerie: "🥖", pizzas: "🍕", soupes: "🍲", entrees: "🫕", encas: "🥪",
    };
    records.push({
      icon: catEmojis[s.topCat[0]] || "🍴",
      label: "Catégorie préférée",
      valeur: s.topCat[0].charAt(0).toUpperCase() + s.topCat[0].slice(1),
      detail: `${s.topCat[1]} recette${s.topCat[1] > 1 ? "s" : ""}`,
    });
  }
  
  // v240 : Record "Recettes vues" (curiosité)
  if (s.nbRecettesVues > 0) {
    records.push({
      icon: "👀",
      label: "Recettes explorées",
      valeur: s.nbRecettesVues + " recette" + (s.nbRecettesVues > 1 ? "s" : ""),
      detail: "Vues / consultées",
    });
  }
  
  // v242 : Streak cuisine
  if (s.streakActuel > 0) {
    records.push({
      icon: "🔥",
      label: "Streak en cours",
      valeur: s.streakActuel + " jour" + (s.streakActuel > 1 ? "s" : ""),
      detail: "À cuisiner aujourd'hui pour continuer !",
    });
  }
  if (s.streakRecord > 0) {
    records.push({
      icon: "🏅",
      label: "Record streak",
      valeur: s.streakRecord + " jour" + (s.streakRecord > 1 ? "s" : ""),
      detail: "Jours consécutifs à cuisiner",
    });
  }
  
  if (records.length === 0) {
    document.getElementById("stats-records").innerHTML = 
      `<p class="stats-vide">🍳 Commencez à cuisiner pour débloquer vos records !</p>`;
    return;
  }
  
  const html = records.map(r => `
    <div class="record-card" ${r.cle ? `onclick="ouvrirFiche('${r.cle}')" style="cursor:pointer"` : ""}>
      <div class="record-icon">${r.icon}</div>
      <div class="record-content">
        <div class="record-label">${r.label}</div>
        <div class="record-valeur">${r.valeur}</div>
        <div class="record-detail">${r.detail}</div>
      </div>
    </div>
  `).join("");
  document.getElementById("stats-records").innerHTML = html;
}

// Remplit la section "Évolution"
function remplirEvolution(s) {
  const mois = Object.entries(s.parMois).sort((a,b) => a[0].localeCompare(b[0]));
  
  if (mois.length === 0) {
    document.getElementById("stats-evolution").innerHTML = 
      `<p class="stats-vide">📈 Générez des menus pour voir votre évolution !</p>`;
    return;
  }
  
  const max = Math.max(...mois.map(m => m[1]));
  const nomsMois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  
  const bars = mois.map(([ym, n]) => {
    const [annee, m] = ym.split("-");
    const label = nomsMois[parseInt(m) - 1] + " " + annee.slice(-2);
    const pct = (n / max) * 100;
    return `
      <div class="stats-bar-wrap">
        <div class="stats-bar-label">${label}</div>
        <div class="stats-bar-track">
          <div class="stats-bar-fill" style="width:${pct}%">
            <span class="stats-bar-value">${n}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");
  
  document.getElementById("stats-evolution").innerHTML = `
    <p class="stats-evolution-titre">Menus générés par mois</p>
    <div class="stats-bars">${bars}</div>
  `;
}

// Remplit la section "Badges"
function remplirBadges(s) {
  const badges = [
    // === Badges cuisson ===
    { id: "premier-pas", emoji: "👶", titre: "Premier pas", desc: "1 recette cuisinée", debloque: s.nbRecettesCuisinees >= 1 },
    { id: "explorer-cuisine", emoji: "🧭", titre: "Explorateur", desc: "10 recettes cuisinées", debloque: s.nbRecettesCuisinees >= 10 },
    { id: "chef", emoji: "👨‍🍳", titre: "Chef en herbe", desc: "25 recettes cuisinées", debloque: s.nbRecettesCuisinees >= 25 },
    { id: "master", emoji: "🏆", titre: "Master Chef", desc: "50 recettes cuisinées", debloque: s.nbRecettesCuisinees >= 50 },
    // === Badges curiosité (recettes vues/explorées) v240 ===
    { id: "curieux", emoji: "👀", titre: "Curieux", desc: "10 recettes vues", debloque: s.nbRecettesVues >= 10 },
    { id: "voyageur", emoji: "🗺️", titre: "Voyageur", desc: "50 recettes vues", debloque: s.nbRecettesVues >= 50 },
    { id: "centurion", emoji: "💯", titre: "Centurion", desc: "100 recettes vues", debloque: s.nbRecettesVues >= 100 },
    { id: "expert", emoji: "🎓", titre: "Expert", desc: "200 recettes vues", debloque: s.nbRecettesVues >= 200 },
    // === Badges streak (v242) ===
    { id: "enfeu", emoji: "🔥", titre: "En feu", desc: "7 jours d'affilée à cuisiner", debloque: s.streakRecord >= 7 },
    { id: "inarretable", emoji: "🌋", titre: "Inarrêtable", desc: "30 jours d'affilée à cuisiner", debloque: s.streakRecord >= 30 },
    // === Badges favoris ===
    { id: "fan", emoji: "❤️", titre: "Fan", desc: "5 favoris", debloque: s.nbFavoris >= 5 },
    { id: "collectionneur", emoji: "💎", titre: "Collectionneur", desc: "15 favoris", debloque: s.nbFavoris >= 15 },
    // === Badges menus ===
    { id: "planificateur", emoji: "📅", titre: "Planificateur", desc: "5 menus générés", debloque: s.nbMenusGeneres >= 5 },
    { id: "organisateur", emoji: "🗂️", titre: "Organisateur", desc: "20 menus générés", debloque: s.nbMenusGeneres >= 20 },
    // === Badges spéciaux ===
    { id: "fidele", emoji: "🥇", titre: "Fidèle", desc: "Une recette refaite 3 fois", debloque: s.recettePlusRefaite && s.recettePlusRefaite.n >= 3 },
    { id: "globetrotter", emoji: "🌍", titre: "Globe-trotter", desc: "5 pays différents", debloque: false }, // calculé ci-dessous
  ];
  
  // Calcul globetrotter à partir de userProfile
  const user = window.userProfile || {};
  const recettesVues = new Set([...(window._recentsVus || []), ...(user.favoris || [])]);
  (user.historiqueMenus || []).forEach(menu => {
    (menu.menus || menu.menu || []).forEach(plat => {
      const cle = typeof plat === "string" ? plat : plat?.cle;
      if (cle) recettesVues.add(cle);
    });
  });
  const paysSet = new Set();
  recettesVues.forEach(cle => {
    const r = recettes[cle];
    if (r?.pays) paysSet.add(r.pays);
  });
  const ggBadge = badges.find(b => b.id === "globetrotter");
  if (ggBadge) ggBadge.debloque = paysSet.size >= 5;
  
  const html = badges.map(b => `
    <div class="badge-card ${b.debloque ? 'badge-debloque' : 'badge-verrou'}">
      <div class="badge-emoji">${b.debloque ? b.emoji : "🔒"}</div>
      <div class="badge-titre">${b.titre}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>
  `).join("");
  
  const debloques = badges.filter(b => b.debloque).length;
  document.getElementById("stats-badges").innerHTML = `
    <p class="stats-badges-progress">${debloques} / ${badges.length} badges débloqués</p>
    <div class="badges-grid">${html}</div>
  `;
}

function afficherSection(section, btn) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  // Fermer les sous-menus catégories/monde
  fermerSousMenus();
  const cuisine    = document.getElementById("section-cuisine"); // v242 : remplace calculateur
  const cartes     = document.getElementById("section-cartes");   // grille complète
  const accueilSec = document.getElementById("section-accueil"); // page accueil
  const menuCats   = document.querySelector(".menu-cats");
  const planif     = document.getElementById("section-planificateur");
  const searchBar  = document.querySelector(".search-bar");
  const stats      = document.getElementById("section-stats");
  const festif     = document.getElementById("section-festif");

  // Toujours masquer la section stats par défaut (sauf si on y va)
  if (stats && section !== "stats") stats.style.display = "none";

  if (section === "stats") {
    if (cuisine)    cuisine.style.display = "none";
    if (cartes)     cartes.classList.remove("visible");
    if (accueilSec) accueilSec.style.display = "none";
    if (planif)     planif.style.display = "none";
    if (festif)     festif.style.display = "none";
    if (menuCats)   menuCats.style.display = "none";
    if (searchBar)  searchBar.style.display = "none";
    if (typeof cacherFiltresChips === "function") cacherFiltresChips();
    if (stats)      stats.style.display = "block";
    // Charger les stats
    if (typeof chargerMesStats === "function") chargerMesStats();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (section === "cuisine") {
    if (cuisine) cuisine.style.display = "block";
    if (cartes)     { cartes.classList.remove("visible"); }
    if (accueilSec) accueilSec.style.display = "none";
    if (planif)     planif.style.display = "none";
    if (festif)     festif.style.display = "none";
    if (menuCats)   menuCats.style.display = "none";
    if (searchBar)  searchBar.style.display = "none";
    if (typeof cacherFiltresChips === "function") cacherFiltresChips();
    // Charger les ingrédients du vide-frigo
    if (typeof vfChargerIngredients === "function") vfChargerIngredients();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (section === "planificateur") {
    if (cuisine) cuisine.style.display = "none";
    if (cartes)     { cartes.classList.remove("visible"); }
    if (accueilSec) accueilSec.style.display = "none";
    if (menuCats)   menuCats.style.display = "none";
    if (searchBar)  searchBar.style.display = "none";
    // Pré-remplir le formulaire avec le profil
    setTimeout(() => { if (typeof appliquerProfilSurFormulaire === "function") appliquerProfilSurFormulaire(); }, 200);
    if (typeof cacherFiltresChips === "function") cacherFiltresChips();

    // Restaurer l'onglet qui était actif avant de quitter
    const tabActif = window._planTabActif || "semaine";
    if (tabActif === "festif") {
      planif.style.display = "none";
      document.getElementById("section-festif").style.display = "block";
      chargerMenuFestifAuDemarrage();
      // Mettre à jour les onglets
      document.getElementById("tab-semaine") && document.getElementById("tab-semaine").classList.remove("active");
      document.getElementById("tab-semaine2") && document.getElementById("tab-semaine2").classList.remove("active");
      document.getElementById("tab-festif") && document.getElementById("tab-festif").classList.add("active");
      document.getElementById("tab-festif2") && document.getElementById("tab-festif2").classList.add("active");
    } else {
      planif.style.display = "block";
      document.getElementById("section-festif").style.display = "none";
      chargerMenusAuDemarrage();
      chargerMenuFestifAuDemarrage();
    }
  } else {
    if (cuisine) cuisine.style.display = "none";
    if (planif)  planif.style.display = "none";
    if (menuCats) menuCats.style.display = "flex";
    if (searchBar) searchBar.style.display = "flex";
    // Retour vers l'accueil personnalisé
    if (accueilSec) accueilSec.style.display = "block";
    if (cartes) { cartes.classList.remove("visible"); } // ← retirer visible !
    if (typeof chargerAccueil === "function") chargerAccueil();
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    const btnA = document.getElementById("btn-accueil");
    if (btnA) btnA.classList.add("active");
  }
}


// Alias pour compatibilité avec les boutons HTML
function genererMenusIA(btn) { return genererMenus(btn); }

// Format repas
window._formatRepas = "midi-soir"; // défaut

function setFormatRepas(format, btn) {
  window._formatRepas = format;
  document.querySelectorAll("#format-midi-soir, #format-complet").forEach(b => b.classList.remove("plan-tag-active"));
  btn.classList.add("plan-tag-active");
}

window.addEventListener('profilMisAJour', () => {
  majBoutonFamille();
  majBoutonMonProfil();
  // Ré-afficher les menus avec badges famille si un menu est actif
  if (window._derniersMenus) {
    const p = parseInt(document.getElementById("plan-personnes")?.value) || 4;
    if (typeof afficherMenusSemaine === "function") {
      afficherMenusSemaine(window._derniersMenus, p);
    }
  }
  // Rafraîchir les sections favoris (accueil + nouvelle vue dédiée si visible)
  if (typeof chargerAccueilFavoris === "function") chargerAccueilFavoris();
  if (typeof chargerAccueilMenusFavoris === "function") chargerAccueilMenusFavoris();
  if (typeof chargerAccueilFetiches === "function") chargerAccueilFetiches();
  // Si la vue dédiée "Menus favoris" est ouverte, la re-rendre
  const secMF = document.getElementById("section-menus-favoris");
  if (secMF && secMF.style.display !== "none" && typeof filtrerMenusFavoris === "function") {
    filtrerMenusFavoris();
  }
});
// Vérifier aussi après chargement initial
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    majBoutonFamille();
    majBoutonMonProfil();
    // Initialiser tous les inputs calc-* avec la taille du foyer
    const foyer = window.userProfile?.foyer;
    if (foyer) {
      const nb = Math.min(15, Math.max(1,
        (foyer.adultes || 0) + (foyer.ados || 0) +
        (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0)
      ));
      if (nb > 0) {
        document.querySelectorAll(".calc-input").forEach(inp => {
          inp.value = nb;
        });
      }
    }
    // Appliquer les préférences visuelles (badges niveau + famille)
    if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
    
    // Appliquer les badges Nutri-Score sur toutes les cartes
    if (typeof appliquerNutriScoreCartes === "function") appliquerNutriScoreCartes();
    
    // Construire l'index de recherche intelligente
    if (typeof construireIndexRecherche === "function") construireIndexRecherche();
    
    // Fermer le dropdown des suggestions quand on clique ailleurs
    document.addEventListener("click", (e) => {
      const searchBar = document.querySelector(".search-bar");
      if (searchBar && !searchBar.contains(e.target)) {
        cacherSuggestions();
      }
    });
    // Quand on focus l'input et qu'il y a déjà du texte, ré-afficher les suggestions
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("focus", () => {
        if (searchInput.value) afficherSuggestions(searchInput.value);
      });
      // Échap pour fermer
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          cacherSuggestions();
          searchInput.blur();
        }
        // Entrée : applique la TOP suggestion (catégorie/pays prioritaire)
        if (e.key === "Enter") {
          e.preventDefault();
          const dropdown = document.getElementById("search-suggestions");
          if (!dropdown || dropdown.style.display === "none") return;
          const firstItem = dropdown.querySelector(".suggestion-item");
          if (firstItem) firstItem.click();
        }
      });
    }

    // Marquer les calc-input comme "modifié" quand l'utilisateur change leur valeur
    // (pour ne pas que la maj depuis le foyer écrase un choix manuel)
    document.querySelectorAll(".calc-input").forEach(inp => {
      inp.addEventListener("input", () => { inp.dataset.modifie = "1"; });
    });
  }, 1500);
});

// Aussi mettre à jour quand le profil est chargé/modifié
window.addEventListener("profilMisAJour", () => {
  majBoutonFamille();
  majBoutonMonProfil();
  const foyer = window.userProfile?.foyer;
  if (foyer) {
    const nb = Math.min(15, Math.max(1,
      (foyer.adultes || 0) + (foyer.ados || 0) +
      (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0)
    ));
    if (nb > 0) {
      // Ne pas écraser les valeurs modifiées manuellement par l'utilisateur
      document.querySelectorAll(".calc-input").forEach(inp => {
        if (!inp.dataset.modifie) inp.value = nb;
      });
    }
  }
});


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
