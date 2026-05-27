

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
  "patepizza","patelasagne","lasagne","yaourt","smoothiebowl","energyballs","naan","painlevain","brioche"
]);

// Desserts (pour le pool desserts du menu complet — liste fiable, ne dépend pas du DOM)
const RECETTES_DESSERTS = [
  "baklava","canelebordelais","cheesecake","churros","clafoutis","cookies",
  "cremebrulee","crumblefruits","eclair","flan","fondantchocolat","gateaubasque",
  "ileflottante","madeleine","millefeuille","moelleuxchocolat","mousseauchocolat",
  "pannaCotta","parisbrestreinterpretation","pavlova","profiteroles","tarteFragoles","tarteNormande",
  "tarteaupommes","tartechocolatcaramel","tartecitron","tartepistache","tartetatinpommes","tiramisu",
  "tiramisufraise","verrineframboisechocolat","verrinetiramisu"
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

  // Activer bouton
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById("btn-accueil");
  if (btn) btn.classList.add("active");

  // Afficher section accueil, masquer toutes les autres
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  const secCalc    = document.getElementById("section-calculateur");
  const secPlan    = document.getElementById("section-planificateur");
  const secFestif  = document.getElementById("section-festif");
  if (secAccueil) secAccueil.style.display = "block";
  if (secCartes) { secCartes.classList.remove("visible"); secCartes.style.display = ""; }
  if (secCalc)   secCalc.style.display = "none";
  if (secPlan)   secPlan.style.display = "none";
  if (secFestif) secFestif.style.display = "none";

  chargerAccueil();
}

function chargerAccueil() {
  chargerAccueilFavoris();
  chargerAccueilMenus();
  chargerAccueilMenusFavoris();
  chargerAccueilFetiches();
  chargerAccueilRecents();
  chargerAccueilSuggestions();
}

// Favoris
function chargerAccueilFavoris() {
  const row = document.getElementById("accueil-favoris-row");
  if (!row) return;
  const favs = window.userProfile?.favoris || [];
  if (!window.currentUser) {
    row.innerHTML = `<div class="accueil-empty">👤 <a onclick="ouvrirModalAuth()" style="color:#ff8fb3;cursor:pointer">Connecte-toi</a> pour voir tes favoris</div>`;
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
    row.innerHTML = `<div class="accueil-empty">Génère ton premier menu dans l'onglet Menus !</div>`;
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
                  : lvl === "enfant" ? `<span title="${tip}" style="margin-left:4px;font-size:11px">🌶️</span>` : "";
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
                    : lvl === "enfant" ? `<span title="${tip}" style="margin-left:4px;font-size:11px">🌶️</span>` : "";
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
                                       : `<span title="${tip}" style="margin-left:4px;font-size:11px">🌶️</span>`;
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
    row.innerHTML = `<div class="accueil-empty">Aucun menu favori — sauvegarde tes menus préférés depuis l'écran Menus !</div>`;
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
          <button onclick="event.stopPropagation();if(confirm('Supprimer ce menu favori ?'))supprimerMenuFavori('${f.id}').then(()=>chargerAccueilMenusFavoris())" style="background:transparent;border:none;color:#ff6b6b;cursor:pointer;font-size:14px;padding:0" title="Supprimer">✕</button>
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
  if (row) row.innerHTML = `<div class="accueil-empty">Génère ton premier menu dans l'onglet Menus !</div>`;
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
    <img src="images/${key}.webp" alt="${nom}" onerror="this.style.display='none'">
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
  // Boost saisonnier : les recettes de la saison actuelle ont priorité
  const saisonActuelle = getSaisonActuelle();
  pool = pool.sort((a, b) => {
    const saisonA = recettes[a]?.saisons?.includes(saisonActuelle) ? 1 : 0;
    const saisonB = recettes[b]?.saisons?.includes(saisonActuelle) ? 1 : 0;
    if (saisonA !== saisonB) return saisonB - saisonA; // saison actuelle d'abord
    // À égalité, mélange stable basé sur la date
    const ha = (a.charCodeAt(0) * seed) % 997;
    const hb = (b.charCodeAt(0) * seed) % 997;
    return ha - hb;
  }).slice(0, 10);

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
  // Badge famille discret
  const adapt = typeof getAdaptationFamille === "function" ? getAdaptationFamille(key) : null;
  const badgeFam = adapt ? `<span class="mini-carte-famille" title="${adapt.label}">${adapt.badge}</span>` : "";
  // Badge saison (uniquement si recette est de saison actuelle)
  const deSaison = typeof estDeSaison === "function" && estDeSaison(key);
  const infoSaison = deSaison ? getEmojiSaison(getSaisonActuelle()) : null;
  const badgeSaison = infoSaison ? `<span class="mini-carte-saison" title="De saison : ${infoSaison.label}">${infoSaison.emoji}</span>` : "";
  return `<div class="mini-carte" onclick="ajouterRecent('${key}');ouvrirFiche('${key}','')">
    <img src="images/${key}.webp" alt="${nom}" onerror="this.style.display='none'">
    ${badgeFam}
    ${badgeSaison}
    <div class="mini-carte-info">
      <span class="mini-carte-emoji">${r.emoji || "🍽️"}</span>
      <span class="mini-carte-nom">${nom}</span>
      <span class="mini-carte-temps">⏱ ${r.temps || ""}</span>
    </div>
  </div>`;
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
  const btn = document.getElementById('btn-menus-favoris');
  if (btn) btn.classList.add('active');

  if (!window.currentUser) { ouvrirModalAuth(); return; }

  // Masquer TOUTES les autres sections (accueil, grille, calculateur, planificateur)
  fermerSousMenus();
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  const secCalc    = document.getElementById("section-calculateur");
  const secPlan    = document.getElementById("section-planificateur");
  const secFestif  = document.getElementById("section-festif");
  const menuCats   = document.querySelector(".menu-cats");
  const searchBar  = document.querySelector(".search-bar");
  if (secAccueil) secAccueil.style.display = "none";
  if (secCartes)  { secCartes.classList.remove("visible"); secCartes.style.display = "none"; }
  if (secCalc)    secCalc.style.display = "none";
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
      <small style="opacity:.7">Sauvegarde tes menus préférés depuis l'écran Menus avec 🤍 !</small>
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
          <button onclick="event.stopPropagation();if(confirm('Supprimer ce menu favori ?'))supprimerMenuFavori('${f.id}')" class="btn-retirer-favori" title="Supprimer">✕</button>
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
    liste.innerHTML = `<p style="text-align:center;color:#888;padding:20px">Aucun menu favori pour l'instant.<br>Sauvegarde tes menus préférés depuis l'écran Menus avec 🤍 !</p>`;
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
        <button onclick="event.stopPropagation();if(confirm('Supprimer ce menu favori ?'))supprimerMenuFavori('${f.id}').then(()=>{afficherMenusFavoris();chargerAccueilMenusFavoris();})" class="btn-retirer-favori">✕</button>
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
  cannelle: "🪵 Cannelle", safran: "🌼 Safran", paprika: "🌶️ Paprika",
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
const TOUS_LES_PLATS = [
  "boeufbourguignon","gratindauphinois","quichelorraine","soupeaoignon",
  "potaufeu","pouletcitronthym","risotto","risottoprimavera","couscous","moussaka",
  "paella","butterchicken","souvlaki","dalindien","rizcantonnais","hariramarocaine",
  "shakshuka","padthai","currypouletcoco","tacosmaison","bolognaisemaison",
  "burgermaison","salmonteriyaki","curryledumes","wrappoulet","soupemiso",
  "veloutelegumes","saumongravlax","croquemonsieur","naan",
  "souvlakiagneau","tom_yam","dorade_chermoula","pierogi","shakshukaverte",
  "porc_pulled","braiseboeuf_asiatique","paprikashpoulet","ossobuco","tajinemouton",
  "tikamasala","phovietnambien","carbonara","gnocchismaison","poulettandoori",
  "pekinduckeasy","ceebujen","mafewestafricain","dosakerdosai","tteokbokki"
];
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
    plat:    ["paella","salmonteriyaki","souvlaki","saladecesar","wrappoulet","padthai","shakshuka","burgermaison","tacosmaison","saladeniçoise","saumongravlax"],
    dessert: ["tartecitron","smoothiebowl","bowlacai","clafoutis","verrinetiramisu","granola","yaourt","bananabread"],
  },
  hivernal: {
    label: "❄️ Menu Hivernal",
    apero:   ["sangria","whiskysour","limonademaison","virginmojito","cosmopolitan"],
    entree:  ["soupeaoignon","veloutelegumes","saladelentilles","hariramarocaine","soupemiso","houmous"],
    plat:    ["boeufbourguignon","potaufeu","gratindauphinois","couscous","moussaka","butterchicken","dalindien","quichelorraine","lasagne","risotto"],
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
    plat:    ["buddhaBowl","wrappoulet","curryledumes","salmonteriyaki","padthai","dalindien","soupemiso","veloutelegumes","shakshuka","saladeniçoise"],
    dessert: ["smoothiebowl","bowlacai","yaourt","granola","bananabread","madeleine"],
  },
  romantique: {
    label: "💑 Dîner Romantique",
    apero:   ["cosmopolitan","spritz","daiquiri","mojito","pinacolada"],
    entree:  ["saumongravlax","saladeavocatcrevettes","saladeniçoise","saladegreque","houmous","verrinetiramisu"],
    plat:    ["salmonteriyaki","risottoprimavera","pouletcitronthym","boeufbourguignon","souvlaki","butterchicken","paella"],
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
    if (profilL.hasEnfant) parts.push(`<span class="leg-item"><span class="leg-pastille enfant"></span>🌶️ Déconseillé enfant</span>`);
    parts.push(`<span class="leg-hint">Tu peux <strong>🔄 régénérer</strong> chaque item concerné</span>`);
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
                : lvl === "enfant" ? `<span title="${tip}" style="margin-left:6px">🌶️</span>` : "";
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
    alert("Sélectionne au moins un jour !");
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
    ? ["curryledumes","wrappoulet","soupemiso","veloutelegumes","salmonteriyaki","dalindien","padthai","buddhaBowl"]
    : ["lasagne","boeufbourguignon","gratindauphinois","quichelorraine","soupeaoignon","potaufeu","pouletcitronthym","risotto","risottoprimavera","couscous","moussaka","paella","butterchicken","souvlaki","dalindien","rizcantonnais","hariramarocaine","shakshuka","padthai","currypouletcoco","tacosmaison","bolognaisemaison","burgermaison","salmonteriyaki","curryledumes","wrappoulet","soupemiso","veloutelegumes","naan","souvlakiagneau","tom_yam","dorade_chermoula","pierogi","shakshukaverte","porc_pulled","braiseboeuf_asiatique","paprikashpoulet","ossobuco","tajinemouton","tikamasala","phovietnambien","carbonara","gnocchismaison","poulettandoori","pekinduckeasy","ceebujen","mafewestafricain","pouletbasquaise","pouletrotiperfect","saumoncrouteherbes","bibimbap","moquecabresil","rendangboeuf"];
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
    mondiale: poolFinal.filter(k => ["couscous","moussaka","paella","dalindien","hariramarocaine","soupeharira","maffeSenegal","souvlaki","taboule","tabulemaison","shakshuka","pierogi","falafel","humous","houmous","gyozas","bibimbap"].includes(k))
  };

  // Mélanger chaque groupe
  Object.keys(cuisines).forEach(c => { cuisines[c] = shuffleArray(cuisines[c]); });
  
  // Pool global mélangé
  const melange = shuffleArray([...pool]);
  const utilises = new Set();
  
  // Alterner les cuisines
  let cuisineIdx = { francaise:0, italienne:0, asiatique:0, mondiale:0 };
  const cuisineOrder = shuffleArray(["francaise","italienne","asiatique","mondiale","francaise","italienne","asiatique","mondiale","francaise","italienne"]);
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
    "souvlaki":          "Souvlaki",
    "quichelorraine":    "Quiche Lorraine",
    "soupeaoignon":      "Soupe à l'Oignon",
    "dalindien":         "Dal Indien",
    "rizcantonnais":     "Riz Cantonnais",
    "hariramarocaine":   "Harira Marocaine",
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
    "souvlaki":          "Souvlaki",
    "butterchicken":     "Butter Chicken",
    "risottoprimavera":  "Risotto Primavera",
    "bolognaisemaison":  "Bolognaise Maison",
    "tacosmaison":       "Tacos Maison",
    "couscous":          "Couscous Royal",
    "moussaka":          "Moussaka",
    "paella":            "Paella",
    "quichelorraine":    "Quiche Lorraine",
    "dalindien":         "Dal Indien",
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
    "crepes":            "Crêpes Sucrées",
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
    if (profilL.hasEnfant) parts.push(`<span class="leg-item"><span class="leg-pastille enfant"></span>🌶️ Déconseillé enfant</span>`);
    parts.push(`<span class="leg-hint">Tu peux <strong>🔄 régénérer</strong> chaque repas concerné</span>`);
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
                      : lvl === "enfant" ? `<span title="${tip}" style="margin-left:4px">🌶️</span>` : "";
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
                  : lvlM === "enfant" ? `<span title="${tipM}" style="margin-left:4px">🌶️</span>` : "";
      const bSoir = lvlS === "bebe" ? `<span title="${tipS}" style="margin-left:4px">🍼</span>`
                  : lvlS === "enfant" ? `<span title="${tipS}" style="margin-left:4px">🌶️</span>` : "";
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
  btn.title = estFav ? "Ce menu est dans tes favoris" : "Sauvegarder ce menu en favori";
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
    alert("⚠️ Impossible d'ouvrir la fenêtre d'impression. Autorise les popups dans ton navigateur.");
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

// Recherche
function rechercherRecette(query) {
  const q = query.toLowerCase().trim();
  const clear = document.getElementById("search-clear");
  clear.style.display = q ? "flex" : "none";

  // Si recherche active, basculer vers la grille
  if (q) {
    const secAccueil = document.getElementById("section-accueil");
    const secCartes  = document.getElementById("section-cartes");
    if (secAccueil) secAccueil.style.display = "none";
    if (secCartes) { secCartes.classList.add("visible"); }
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  } else {
    // Si on efface la recherche → retour accueil
    if (typeof afficherAccueil === "function") afficherAccueil();
    return;
  }

  document.querySelectorAll(".carte").forEach(carte => {
    const nom = carte.querySelector("h2").textContent.toLowerCase();
    carte.style.display = (!q || nom.includes(q)) ? "flex" : "none";
  });
  if (typeof appliquerPreferencesVisuelles === 'function') appliquerPreferencesVisuelles();

  // Désactiver les filtres catégories si recherche active
  if (q) {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  } else {
    document.querySelectorAll(".cat-btn")[0].classList.add("active");
  }
}

function viderRecherche() {
  document.getElementById("search-input").value = "";
  document.getElementById("search-clear").style.display = "none";
  document.querySelectorAll(".carte").forEach(c => c.style.display = "");
  // Retour à l'accueil plutôt que tout afficher
  if (typeof afficherAccueil === "function") afficherAccueil();
  else afficherTout();
}

// Afficher tout
function afficherTout() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  fermerSousMenus();
  if (typeof masquerSectionMenusFavoris === "function") masquerSectionMenusFavoris();
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  const btnTout = document.getElementById("btn-tout");
  if (btnTout) btnTout.classList.add("active");
  // Basculer vers la grille, masquer toutes les autres sections
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  const secCalc    = document.getElementById("section-calculateur");
  const secPlan    = document.getElementById("section-planificateur");
  const secFestif  = document.getElementById("section-festif");
  if (secAccueil) secAccueil.style.display = "none";
  if (secCartes)  secCartes.classList.add("visible");
  if (secCalc)    secCalc.style.display = "none";
  if (secPlan)    secPlan.style.display = "none";
  if (secFestif)  secFestif.style.display = "none";
  document.querySelectorAll(".carte").forEach(c => c.style.display = "");
  if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
}

// Toggle sous-menu générique
function toggleSousMenu(menuId, btn) {
  // Remonter en haut de page
  window.scrollTo({ top: 0, behavior: "smooth" });
  const menu = document.getElementById(menuId);
  const autreMenu = menuId === "menu-categories" ? "menu-pays" : "menu-categories";
  const autreBtn  = menuId === "menu-categories" ? "btn-monde" : "btn-categories";
  const visible = menu.style.display !== "none";

  // Fermer l'autre sous-menu
  document.getElementById(autreMenu).style.display = "none";
  document.getElementById(autreBtn).classList.remove("active");

  if (visible) {
    menu.style.display = "none";
    btn.classList.remove("active");
  } else {
    menu.style.display = "flex";
    // Désélectionner tous les autres boutons principaux (Accueil, Recettes favorites, Menus favoris, Tout)
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(`#${menuId} .pays-btn`).forEach(b => b.classList.remove("active"));
    // Masquer la vue dédiée menus favoris si elle était affichée
    if (typeof masquerSectionMenusFavoris === "function") masquerSectionMenusFavoris();
    // Basculer vers la grille si on est sur l'accueil
    const secAccueil = document.getElementById("section-accueil");
    const secCartes  = document.getElementById("section-cartes");
    if (secAccueil) secAccueil.style.display = "none";
    if (secCartes) { secCartes.classList.add("visible"); }
    // Tout afficher dans la grille
    document.querySelectorAll(".carte").forEach(c => c.style.display = "");
    if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
  }
}

function fermerSousMenus() {
  ["menu-categories", "menu-pays"].forEach(id => {
    document.getElementById(id).style.display = "none";
  });
  document.getElementById("btn-categories").classList.remove("active");
  document.getElementById("btn-monde").classList.remove("active");
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
  // Alcool
  "flambé","flambée","flamber","au rhum","au cognac","au whisky","alcool",
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

function getNiveauFamille(cle) {
  // Retourne: null = OK, sinon { niveau: "bebe"|"enfant", mot: "...", raison: "..." }
  const profil = getFoyerProfil();
  if (!profil) return null;
  if (!profil.hasBebe && !profil.hasEnfant) return null;
  const r = recettes?.[cle];
  let texte = (cle + " " + (r?.description || "")).toLowerCase();
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
  return getAdaptationFamille(cle) === null;
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
    const cle = c.getAttribute("onclick")?.match(/'(\w+)'/)?.[1];
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

function filtrerCategorie(cat) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  basculeVersGrille();
  // Désactiver les boutons principaux (Accueil, Recettes favorites, etc.)
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  // Réactiver le bouton Catégories
  const btnCat = document.getElementById("btn-categories");
  if (btnCat) btnCat.classList.add("active");
  document.querySelectorAll("#menu-categories .pays-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  document.querySelectorAll(".carte").forEach(c => {
    c.style.display = (c.dataset.cat === cat) ? "" : "none";
  });
  if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
}

// Filtre par pays
function filtrerPays(pays) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  basculeVersGrille();
  // Désactiver les boutons principaux
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  // Réactiver le bouton Monde
  const btnMonde = document.getElementById("btn-monde");
  if (btnMonde) btnMonde.classList.add("active");
  document.querySelectorAll("#menu-pays .pays-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  document.querySelectorAll(".carte").forEach(c => {
    c.style.display = (c.dataset.pays === pays) ? "" : "none";
  });
  if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
}

// Calculer depuis une carte et afficher en modal
function calculer() {
  const recette = document.getElementById("recette")?.value;
  const personnes = parseInt(document.getElementById("personnes")?.value) || 4;
  if (!recette) return;
  // Mettre à jour l'input personnes pour que choisirRecette le lise
  const inputP = document.getElementById("personnes");
  if (inputP) inputP.dataset.modified = "1";
  choisirRecette(recette);
}

function calculerCarte(recette, inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const val = parseInt(input.value) || 1;
  // Passer la valeur à ouvrirFiche via l'input personnes
  const inputP = document.getElementById("personnes");
  if (inputP) { inputP.value = val; inputP.dataset.modified = "1"; }
  ouvrirFiche(recette, inputId);
}

// Ouvrir la fiche recette depuis une carte en lisant son input
function ouvrirFiche(recette, inputId) {
  const input = inputId ? document.getElementById(inputId) : null;
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
}

function fermerModal() {
  const inputP = document.getElementById("personnes");
  if (inputP) delete inputP.dataset.modified;
  document.getElementById("modal-calc").classList.remove("visible");
}

// Nav bottom
function afficherSection(section, btn) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  // Fermer les sous-menus catégories/monde
  fermerSousMenus();
  const calc       = document.getElementById("section-calculateur");
  const cartes     = document.getElementById("section-cartes");   // grille complète
  const accueilSec = document.getElementById("section-accueil"); // page accueil
  const menuCats   = document.querySelector(".menu-cats");
  const planif     = document.getElementById("section-planificateur");
  const searchBar  = document.querySelector(".search-bar");

  if (section === "calculateur") {
    calc.style.display = "block";
    if (cartes)     { cartes.classList.remove("visible"); }
    if (accueilSec) accueilSec.style.display = "none";
    menuCats.style.display = "none";
    planif.style.display = "none";
    searchBar.style.display = "none";
    document.getElementById("menu-categories").style.display = "none";
    document.getElementById("menu-pays").style.display = "none";
  } else if (section === "planificateur") {
    calc.style.display = "none";
    if (cartes)     { cartes.classList.remove("visible"); }
    if (accueilSec) accueilSec.style.display = "none";
    menuCats.style.display = "none";
    searchBar.style.display = "none";
    // Pré-remplir le formulaire avec le profil
    setTimeout(() => { if (typeof appliquerProfilSurFormulaire === "function") appliquerProfilSurFormulaire(); }, 200);
    document.getElementById("menu-categories").style.display = "none";
    document.getElementById("menu-pays").style.display = "none";

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
    calc.style.display = "none";
    planif.style.display = "none";
    menuCats.style.display = "flex";
    searchBar.style.display = "flex";
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
  }, 1500);
});

// Aussi mettre à jour quand le profil est chargé/modifié
window.addEventListener("profilMisAJour", () => {
  majBoutonFamille();
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
        `Bonjour ! Je suis là pour t'aider avec **${getNomRecette(nom)}**. Tu peux me poser jusqu'à ${CLAUDE_MAX_QUESTIONS} questions — technique, substitution, timing, adaptation... Je suis là ! 👨‍🍳`
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
    afficherMessageClaude(nom, "assistant", "Tu as atteint la limite de questions pour cette recette. Ferme et rouvre la fiche pour recommencer ! 😊");
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
      afficherMessageClaude(nom, "assistant", `❌ Erreur : ${data2.error.message || "Problème avec l'API"}. Vérifie ta clé API Anthropic.`);
      return;
    }
    const reponse = data2.content?.[0]?.text || "Désolé, je n'ai pas pu répondre. Réessaie !";

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
    afficherMessageClaude(nom, "assistant", "Oups, une erreur s'est produite. Vérifie ta connexion et réessaie ! 🙏");
  }
}
