// =============================================================================
// 📦 MODULE : MENU
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

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
// Apéritifs (catégorie "aperitifs" : tapenade, gougères, verrines… — la nourriture d'apéro)
const TOUS_LES_APERITIFS = (typeof recettes !== "undefined")
  ? Object.keys(recettes).filter(k => {
      const c = (typeof categorieRecette === "function") ? categorieRecette(k) : (recettes[k] && recettes[k].cat);
      return c === "aperitifs";
    })
  : [];

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
      aperitifs: ["À picorer avant de passer à table 🥨","Parfait pour l'apéro dînatoire ✨","Quelques bouchées pour patienter 😋","L'amuse-bouche qui lance le repas 🎉"],
      entree:  ["Légère et savoureuse 🌿","Une entrée qui met en appétit 😋","Fraîche et colorée 🥗","Le parfait début de repas ✨"],
      plat:    ["Le plat star de la soirée ! 🌟","Un régal assuré 🍽️","Tout le monde va adorer ! 👌","La recette qui impressionne 🏆"],
      dessert: ["Une touche sucrée pour finir 🍰","Le point final parfait ✨","On termine en beauté ! 😋","Le dessert qui fait l'unanimité 🎉"],
    };
    const catMap = [
      { key: "apero",     emoji: "🥂", label: "🥂 Apéro",     pool: themeData.apero   },
      { key: "aperitifs", emoji: "🥨", label: "🥨 Apéritif",  pool: themeData.aperitifs || TOUS_LES_APERITIFS },
      { key: "entree",    emoji: "🥗", label: "🥗 Entrée",    pool: themeData.entree  },
      { key: "plat",      emoji: "🍽️", label: "🍽️ Plat",      pool: themeData.plat    },
      { key: "dessert",   emoji: "🍰", label: "🍰 Dessert",   pool: themeData.dessert },
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
        .filter(c => structure.length === 0 || structure.includes(c.key))
        .filter(c => Array.isArray(c.pool) && c.pool.length > 0)
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
  menuFestifActuel.personnes = parseInt(personnes);
  window._dernierMenuGenere = menuFestifActuel;
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
    // Couleur par type de plat (apéro / entrée / plat / dessert)
    const cat = (item.categorie || "").toLowerCase();
    const styleCat = (cat.includes("apéritif") || cat.includes("aperitif")) ? "border-left:3px solid #2FA6A0;background:rgba(47,166,160,.12)"
                   : (cat.includes("apéro") || cat.includes("apero")) ? "border-left:3px solid #E0A82E;background:rgba(224,168,46,.12)"
                   : (cat.includes("entrée") || cat.includes("entree")) ? "border-left:3px solid #4F91D9;background:rgba(79,145,217,.12)"
                   : cat.includes("plat")    ? "border-left:3px solid #E0654F;background:rgba(224,101,79,.12)"
                   : cat.includes("dessert") ? "border-left:3px solid #9B6FC9;background:rgba(155,111,201,.12)" : "";
    // L'alerte famille reste prioritaire ; sinon on applique la couleur du type
    const styleBloc = styleAlerte || styleCat;
    const badge = lvl === "bebe"   ? `<span title="${tip}" style="margin-left:6px">🍼</span>`
                : lvl === "enfant" ? `<span title="${tip}" style="margin-left:6px">🧒</span>` : "";
    const btn = lvl ? `<button class="plan-regen-btn" onclick="event.stopPropagation();regenItemFestif(${idx})" title="Regénérer">🔄</button>` : "";
    const motif = lvl ? `<div class="plan-motif-famille" title="${tip}" style="max-width:280px">${lvl === "bebe" ? "🍼" : "🌶️"} ${raison}</div>` : "";

    div.innerHTML = `
      <div class="plan-repas-row" style="grid-template-columns:1fr">
        <div class="plan-repas" onclick="ouvrirRecettePlan('${item.recette}', ${personnes})" style="${styleBloc};text-align:left;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
          <div style="font-size:32px">${getEmoji(item.recette)}</div>
          <div style="flex:1;min-width:0">
            <div class="plan-repas-label">${item.categorie} ${badge}${btn}</div>
            <div class="plan-repas-nom" style="font-size:16px">${getNomRecette(item.recette)}</div>
            <div class="plan-repas-note">${item.note}</div>
            ${typeof noteCommunauteBadgeHTML === "function" ? noteCommunauteBadgeHTML(item.recette, "inline") : ""}
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
  menusSemaine.personnes = parseInt(personnes);
  window._dernierMenuGenere = menusSemaine;
  // v259.34 : compteur cumulatif de menus générés (pour les stats/records/badges)
  if (typeof window.incrementerMenusGeneres === "function") window.incrementerMenusGeneres();

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
    "pizza":"Pâte à pizza",
    "bieraubeurre":"Bière au Beurre",
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
    "patepizza":         "Pâte à pizza",
    "pizza":             "Pâte à pizza",
    "bieraubeurre":      "Bière au Beurre",
  };
  if (nomsAffichage[key]) return nomsAffichage[key];
  // Fallback 1 : lire le nom depuis le <h2> de la carte (source complète des 499 recettes,
  // jamais désynchronisée — règle les clés "collées" type arancinissicilien, poissoncrutahitien…)
  try {
    const h2 = document.querySelector(`.carte[onclick*="ouvrirFiche('${key}'"] h2`);
    if (h2) {
      const txt = h2.textContent.trim();
      const i = txt.indexOf(" ");
      // Si le premier "mot" ne contient aucune lettre (= l'emoji), on l'enlève
      if (i > 0 && !/\p{L}/u.test(txt.slice(0, i))) return txt.slice(i + 1).trim();
      if (txt) return txt;
    }
  } catch (e) {}
  // Fallback 2 : découper camelCase/underscores en mots lisibles
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

  // Couleur par jour de la semaine
  const COULEURS_JOURS = {
    "Lundi":"#e2574c","Mardi":"#e58e26","Mercredi":"#f0b429","Jeudi":"#4caf50",
    "Vendredi":"#1aa6b3","Samedi":"#5a6ee0","Dimanche":"#c44cc4"
  };

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
    // Liseré coloré selon le jour
    const couleurJour = COULEURS_JOURS[jour.jour] || "#888";
    div.style.border = "2px solid " + couleurJour;
    div.style.boxShadow = "0 0 12px " + couleurJour + "44";
    // Teinte (Moyen) de la couleur du jour sur tout le bloc (adoucit le noir)
    div.style.background = "linear-gradient(0deg, " + couleurJour + "28, " + couleurJour + "28), #17151c";

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
            ${typeof noteCommunauteBadgeHTML === "function" ? noteCommunauteBadgeHTML(key, "inline") : ""}
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
        <h3 class="plan-jour-titre" style="color:${couleurJour}">${jour.jour}</h3>
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
        <h3 class="plan-jour-titre" style="color:${couleurJour}">${jour.jour}</h3>
        <div class="plan-repas-row">
          <div class="plan-repas" style="${sMidi}" onclick="ouvrirRecettePlan('${midi}', ${personnes})">
            <div class="plan-repas-label">☀️ Midi ${bMidi}${btnMidi}</div>
            <div class="plan-repas-emoji">${getEmoji(midi)}</div>
            <div class="plan-repas-nom">${getNomRecette(midi)}</div>
            <div class="plan-repas-note">${midiNote}</div>
            ${typeof noteCommunauteBadgeHTML === "function" ? noteCommunauteBadgeHTML(midi, "inline") : ""}
            ${motifM}
          </div>
          <div class="plan-repas" style="${sSoir}" onclick="ouvrirRecettePlan('${soir}', ${personnes})">
            <div class="plan-repas-label">🌙 Soir ${bSoir}${btnSoir}</div>
            <div class="plan-repas-emoji">${getEmoji(soir)}</div>
            <div class="plan-repas-nom">${getNomRecette(soir)}</div>
            <div class="plan-repas-note">${soirNote}</div>
            ${typeof noteCommunauteBadgeHTML === "function" ? noteCommunauteBadgeHTML(soir, "inline") : ""}
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
// Effacer / réinitialiser le menu courant (semaine OU thématique)
function effacerMenuCourant() {
  window._dernierMenuGenere = null;
  window._derniersMenus = null;
  menusSemaine = null;
  menuFestifActuel = null;
  try { localStorage.removeItem("cuisineJeje_histMenus"); } catch(e) {}
  try {
    Object.keys(sessionStorage).forEach(k => {
      if (k.indexOf(STORAGE_KEY) === 0 || k === "cuisineJeje_festif") sessionStorage.removeItem(k);
    });
  } catch(e) {}
  if (window.currentUser && window.db && window.userProfile) {
    window.userProfile.historiqueMenus = [];
    window.db.collection("utilisateurs").doc(window.currentUser.uid)
      .update({ historiqueMenus: [] }).catch(() => {});
  }
  // Revenir aux formulaires (cacher les résultats)
  ["festif-result", "plan-result", "festif-courses", "plan-courses"].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display = "none";
  });
  ["festif-form", "plan-form"].forEach(id => {
    const el = document.getElementById(id); if (el) el.style.display = "block";
  });
  if (typeof chargerAccueilMenus === "function") chargerAccueilMenus();
  if (typeof afficherToast === "function") afficherToast("🗑️ Menu effacé", "info");
}

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
    menusSemaine.personnes = fav.personnes || 4;
    window._dernierMenuGenere = menusSemaine;
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
  // Le champ #personnes est créé PAR choisirRecette (il n'existe pas avant).
  // On passe donc le nombre de personnes en paramètre (personnesOverride) au lieu
  // d'écrire dans un champ inexistant — corrige "Cannot set properties of null".
  choisirRecette(recetteKey, Number(personnes));
}

// Récupère récursivement toutes les clés de recettes présentes dans un objet menu
function _collecterClesMenu(source, acc) {
  if (!source) return;
  const okRec = k => k && typeof recettes !== "undefined" && recettes[k];
  // Menu thématique : { theme, menu: [ {recette}, ... ] }
  if (Array.isArray(source.menu)) {
    source.menu.forEach(it => { if (it && okRec(it.recette)) acc.add(it.recette); });
  }
  // Menu de la semaine : { semaine: [ {jour, midi, soir}, ... ] }
  if (Array.isArray(source.semaine)) {
    source.semaine.forEach(jour => {
      ["midi", "soir"].forEach(moment => {
        const repas = jour && jour[moment];
        if (!repas) return;
        if (typeof repas === "string") { if (okRec(repas)) acc.add(repas); return; }
        if (okRec(repas.recette)) acc.add(repas.recette);            // format simple
        ["entree", "plat", "dessert"].forEach(c => {                 // format complet
          if (repas[c] && okRec(repas[c].recette)) acc.add(repas[c].recette);
        });
      });
    });
  }
}

// Ajoute toutes les recettes du menu courant (type "semaine" ou "thematique") à la liste de courses
function ajouterMenuAuxCourses(type) {
  if (!window.currentUser) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); return; }

  let source = null, personnes = 4;
  if (type === "thematique") {
    source = (typeof menuFestifActuel !== "undefined") ? menuFestifActuel : null;
    personnes = parseInt(document.getElementById("festif-personnes")?.value) || 4;
  } else {
    source = (typeof window._derniersMenus !== "undefined" && window._derniersMenus)
      ? window._derniersMenus
      : ((typeof menusSemaine !== "undefined") ? menusSemaine : null);
    personnes = parseInt(document.getElementById("plan-personnes")?.value) || 4;
  }
  if (!source) { if (typeof afficherToast === "function") afficherToast("Aucun menu à ajouter."); return; }

  const cles = new Set();
  _collecterClesMenu(source, cles);
  if (cles.size === 0) { if (typeof afficherToast === "function") afficherToast("Aucune recette trouvée dans le menu."); return; }

  if (!window.userProfile.listeCourses) window.userProfile.listeCourses = [];
  let ajout = 0;
  cles.forEach(cle => {
    if (!window.userProfile.listeCourses.some(x => x.cle === cle)) {
      window.userProfile.listeCourses.push({ cle, personnes });
      ajout++;
    }
  });

  if (typeof sauvegarderProfil === "function") {
    sauvegarderProfil({ listeCourses: window.userProfile.listeCourses });
  }
  if (typeof afficherToast === "function") {
    afficherToast(ajout > 0
      ? `🛒 ${ajout} recette${ajout > 1 ? "s" : ""} ajoutée${ajout > 1 ? "s" : ""} aux courses`
      : "Ces recettes sont déjà dans vos courses ✓");
  }
}
window.ajouterMenuAuxCourses = ajouterMenuAuxCourses;

