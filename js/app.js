

// ==============================
// ACCUEIL PERSONNALISÉ
// ==============================
function afficherAccueil() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  fermerSousMenus();

  // Activer bouton
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById("btn-accueil");
  if (btn) btn.classList.add("active");

  // Afficher section accueil, masquer grille
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  if (secAccueil) secAccueil.style.display = "block";
  if (secCartes) { secCartes.classList.remove("visible"); secCartes.style.display = ""; }

  chargerAccueil();
}

function chargerAccueil() {
  chargerAccueilFavoris();
  chargerAccueilMenus();
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
  // Lire depuis Firebase OU localStorage
  let hist = window.userProfile?.historiqueMenus || [];
  if (hist.length === 0) {
    try { hist = JSON.parse(localStorage.getItem("cuisineJeje_histMenus") || "[]"); } catch(e) {}
  }
  if (hist.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Génère ton premier menu dans l'onglet Menus !</div>`;
    return;
  }
  // Prendre le menu le plus récent (index 0)
  const dernier = hist[0];
  const semaine = dernier?.menu?.semaine || [];
  if (semaine.length === 0) {
    row.innerHTML = `<div class="accueil-empty">Aucun menu récent</div>`;
    return;
  }
  row.innerHTML = semaine.slice(0, 5).map(j => `
    <div class="accueil-menu-jour">
      <div class="accueil-menu-jour-label">${j.jour}</div>
      <div class="accueil-menu-repas" onclick="ouvrirFiche('${j.midi?.recette}','')">
        <span>🌞</span> ${getNomRecette(j.midi?.recette) || j.midi?.recette || "—"}
      </div>
      <div class="accueil-menu-repas" onclick="ouvrirFiche('${j.soir?.recette}','')">
        <span>🌙</span> ${getNomRecette(j.soir?.recette) || j.soir?.recette || "—"}
      </div>
    </div>
  `).join("");
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
    "croissant","patepizza","patelasagne","financiers","tartetatinpommes","tartepistache",
    "tartechocolatcaramel","overnightoats","granolaMaison","chocolatChaud","smoothiebowl",
    "bowlacai","pancakesproteine","smoothiemangopassion","energyballs","bananabread",
    "painbaguette","paindemie","patefeuilletee","patebrisee","patesablee",
    "painburger","galettetacos","brioche","painauchocolat","sconeBritish",
    "mojito","margarita","cosmopolitan","spritz","sangria","pinacolada","daiquiri",
    "whiskysour","virginmojito","limonademaison","citronadementhe","virginpinacolada",
    "mojitorose","negroni","moscowmule","pornstarmartini","hugospritz",
    "cherryblossommocktail","oldFashioned","gintoniqmaison","shrubframboisebasilic",
    "mocktailcoconananas","coktailcosmopolitan","mocktailmentheagume",
    "aperolspritzrosa","blueLagoon","espressoMartini","sidecarvintage",
    "gingerlemondrop","tequilasunrise","punchfruitsrouges","mocktailberrybliss",
    "mocktailcoconorchidee"
  ]);

  let pool = toutes.filter(key => {
    if (exclus.has(key)) return false;
    if (_recExclues.has(key)) return false;
    const carte = document.querySelector(`.carte[onclick*="'${key}'"]`);
    if (carte && _catsExclues.has(carte.dataset.cat)) return false;
    if (motsExclus.size === 0) return true;
    const r = recettes[key];
    let texte = [key, r?.description || ""].join(" ").toLowerCase();
    Object.keys(r || {}).forEach(k => {
      if (k.startsWith("tableau") && Array.isArray(r[k]) && r[k].length > 0) {
        texte += " " + Object.keys(r[k][0]).join(" ").toLowerCase();
      }
    });
    return ![...motsExclus].some(m => texte.includes(m));
  });

  // Seed basé sur la date pour stabiliser le mélange du jour
  const seed = today.split("/").reduce((a, b) => parseInt(a) + parseInt(b), 0);
  pool = pool.sort((a, b) => {
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
  return `<div class="mini-carte" onclick="ajouterRecent('${key}');ouvrirFiche('${key}','')">
    <img src="images/${key}.webp" alt="${nom}" onerror="this.style.display='none'">
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
    const match = onclick.match(/ouvrirFiche\('([^']+)'/);
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

// ==============================
// ALLERGIES CUSTOM
// ==============================
window._allergiesCustom = [];

function ajouterAllergieCustom(prefix) {
  prefix = prefix || 'p';
  const inputId = prefix === 'pp' ? 'pp-allergie-input' : 'allergie-custom-input';
  const input = document.getElementById(inputId);
  if (!input) return;
  const val = input.value.trim().toLowerCase();
  if (!val) return;
  const store = prefix === 'pp' ? '_allergiesCustomProfil' : '_allergiesCustom';
  if (!window[store]) window[store] = [];
  if (window[store].includes(val)) { input.value = ''; return; }
  window[store].push(val);
  input.value = '';
  renderAllergiesCustom(prefix);
}

function renderAllergiesCustom(prefix) {
  prefix = prefix || 'p';
  const listeId = prefix === 'pp' ? 'pp-allergies-liste' : 'allergies-custom-liste';
  const liste = document.getElementById(listeId);
  if (!liste) return;
  const store = prefix === 'pp' ? '_allergiesCustomProfil' : '_allergiesCustom';
  const items = window[store] || [];
  liste.innerHTML = items.map(a =>
    `<span class="allergie-tag">${a} <button onclick="retirerAC('${a}','${prefix}')">✕</button></span>`
  ).join('');
}

function retirerAC(val, prefix) {
  prefix = prefix || 'p';
  const store = prefix === 'pp' ? '_allergiesCustomProfil' : '_allergiesCustom';
  if (window[store]) window[store] = window[store].filter(a => a !== val);
  renderAllergiesCustom(prefix);
}

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

// Afficher favoris
function afficherFavoris() {
  const liste = document.getElementById('liste-favoris');
  if (!liste) return;
  const favs = window.userProfile?.favoris || [];
  if (favs.length === 0) {
    liste.innerHTML = `<p style="text-align:center;color:#888;padding:20px">Aucun favori pour l'instant.<br>Appuie sur 🤍 dans une recette pour l'ajouter !</p>`;
    return;
  }
  liste.innerHTML = favs.map(key => {
    const nom = (typeof getNomRecette === 'function' ? getNomRecette(key) : key);
    const data = typeof recettes !== 'undefined' ? recettes[key] : null;
    const emoji = data?.emoji || '🍽️';
    return `<div class="favori-item" onclick="fermerModalProfil();choisirRecette('${key}')">
      <span>${emoji} ${nom}</span>
      <button onclick="event.stopPropagation();toggleFavori('${key}');afficherFavoris()" class="btn-retirer-favori">✕</button>
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
  "lasagne","boeufbourguignon","gratindauphinois","quichelorraine","soupeaoignon",
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
  "buddhaBowl","smoothiebowl","smoothiemangopassion","overnightoats","saumongravlax"
];
const TOUS_LES_DESSERTS = [
  "tiramisu","cremebrulee","mousseauchocolat","fondantchocolat","tartecitron",
  "tarteaupommes","clafoutis","flan","madeleine","verrinetiramisu","goumeau",
  "ileflottante","bananabread","churros","parisbrestreinterpretation","muffins",
  "granola","smoothiebowl","bowlacai","yaourt"
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
    const r = recettes[key];
    let texte = [key, r?.description || ""].join(" ").toLowerCase();
    Object.keys(r || {}).forEach(k => {
      if (k.startsWith("tableau") && Array.isArray(r[k]) && r[k].length > 0) {
        texte += " " + Object.keys(r[k][0]).join(" ").toLowerCase();
        texte += " " + Object.values(r[k][0]).join(" ").toLowerCase();
      }
    });
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

  const prompt = `Tu es un chef cuisinier. Génère un menu thématique "${themeData.label}" pour ${personnes} personne(s).
${eviterFestif} ${instrRegimeFestifFinal}
Structure souhaitée : ${structure.join(", ")}.

Recettes disponibles : ${recettesDispos}

Suggestions par catégorie :
- Apéro/Cocktail : ${themeData.apero.join(", ")}
- Entrée : ${themeData.entree.join(", ")}
- Plat : ${themeData.plat.join(", ")}
- Dessert : ${themeData.dessert.join(", ")}

Choisis UNE recette par catégorie demandée parmi les recettes disponibles.
Réponds UNIQUEMENT en JSON :
{
  "theme": "${themeData.label}",
  "menu": [
    {"categorie": "🥂 Apéro", "recette": "nomRecette", "note": "courte note"},
    {"categorie": "🥗 Entrée", "recette": "nomRecette", "note": "courte note"},
    {"categorie": "🍽️ Plat",  "recette": "nomRecette", "note": "courte note"},
    {"categorie": "🍰 Dessert","recette": "nomRecette", "note": "courte note"}
  ]
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.content[0].text;
    const clean = text.replace(/```json|```/g, "").trim();
    menuFestifActuel = JSON.parse(clean);
  } catch(err) {
    // Fallback aléatoire avec pickUnique pour éviter les répétitions
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
    menuFestifActuel = {
      theme: themeData.label,
      menu: catMap
        .filter(c => structure.length === 0 || structure.some(s => c.key.includes(s) || s.includes(c.key)))
        .map(c => ({
          categorie: c.label,
          recette:   pickOne(c.pool),
          note:      pickOne(notesMap[c.key])
        }))
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

  menu.menu.forEach(item => {
    const div = document.createElement("div");
    div.className = "plan-jour";
    div.innerHTML = `
      <div class="plan-repas-row" style="grid-template-columns:1fr">
        <div class="plan-repas" onclick="ouvrirRecettePlan('${item.recette}', ${personnes})" style="text-align:left;display:flex;align-items:center;gap:14px">
          <div style="font-size:32px">${getEmoji(item.recette)}</div>
          <div>
            <div class="plan-repas-label">${item.categorie}</div>
            <div class="plan-repas-nom" style="font-size:16px">${getNomRecette(item.recette)}</div>
            <div class="plan-repas-note">${item.note}</div>
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
    const r = recettes[key];
    let texte = [key, r?.description || ""].join(" ").toLowerCase();
    // Lire les CLÉS des tableaux (noms des ingrédients : jambon, lardons, poulet...)
    Object.keys(r || {}).forEach(k => {
      if (k.startsWith("tableau") && Array.isArray(r[k]) && r[k].length > 0) {
        texte += " " + Object.keys(r[k][0]).join(" ").toLowerCase();   // ← CLÉS
        texte += " " + Object.values(r[k][0]).join(" ").toLowerCase(); // ← VALEURS aussi
      }
    });
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
  const pool = Object.keys(recettes).filter(key => {
    const carte = document.querySelector(`.carte[onclick*="'${key}'"]`);
    if (carte && catsExclues.has(carte.dataset.cat)) return false;
    if (motsInterdits.size === 0) return true;
    const r = recettes[key];
    let texte = (key + " " + (r?.description || "")).toLowerCase();
    Object.keys(r || {}).forEach(k => {
      if (k.startsWith("tableau") && Array.isArray(r[k]) && r[k].length > 0) {
        texte += " " + Object.keys(r[k][0]).join(" ").toLowerCase();
      }
    });
    return ![...motsInterdits].some(m => texte.includes(m));
  });

  // Grouper par cuisine pour varier
  const cuisines = {
    francaise: pool.filter(k => {
      const t = (k + " " + (recettes[k]?.description||"")).toLowerCase();
      return t.includes("français") || t.includes("france") || ["gratindauphinois","soupeaoignon","ratatouille","quichelorraine","poireauVinaigrette","veloutecourgette","veloutePoiron","camembertRoti"].includes(k);
    }),
    italienne: pool.filter(k => ["risotto","risottoprimavera","risottoMilanese","lasagneviande","gnocchismaison","pizzamargherita","pizzavegetarienne","pizzabresilienne","lemonPasta","spaetzle"].includes(k)),
    asiatique: pool.filter(k => {
      const t = (k + " " + (recettes[k]?.description||"")).toLowerCase();
      return t.includes("asiat") || t.includes("japonais") || t.includes("thaï") || t.includes("coréen") || t.includes("wok") || ["padthai","sushimaison","bibimbap","gyozas","tom_yam","sobejaponais","noodlesWok","tofusaute","soupemiso","pouletMisoGingembre","pouletteriyaki","curryverthai","koreanfriedchicken","soupeAziatique"].includes(k);
    }),
    mondiale: pool.filter(k => ["couscous","moussaka","paella","dalindien","hariramarocaine","soupeharira","maffeSenegal","souvlaki","taboule","tabulemaison","shakshuka","pierogi","falafel","humous","houmous","gyozas","bibimbap"].includes(k))
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
  const poolDesserts = Object.keys(recettes).filter(key => {
    const carte = document.querySelector(`.carte[onclick*="'${key}'"]`);
    return carte && ["desserts"].includes(carte.dataset.cat);
  });
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

function afficherMenusSemaine(menus, personnes) {
  const container = document.getElementById("plan-jours");
  container.innerHTML = "";
  const isComplet = window._formatRepas === "complet";

  menus.semaine.forEach(jour => {
    const div = document.createElement("div");
    div.className = "plan-jour";

    if (isComplet) {
      // Format entrée/plat/dessert
      const genMoment = (moment, emoji, label) => {
        const r = jour[moment];
        if (!r) return "";
        const genSous = (type, icone, data) => {
          if (!data?.recette) return "";
          return `<div class="plan-repas-sous" onclick="ouvrirRecettePlan('${data.recette}', ${personnes})">
            <span class="plan-sous-label">${icone} ${type}</span>
            <span style="font-size:22px">${getEmoji(data.recette)}</span>
            <span class="plan-repas-nom">${getNomRecette(data.recette)}</span>
            <span class="plan-repas-note">${data.note || ""}</span>
          </div>`;
        };
        return `<div class="plan-repas-col">
          <div class="plan-repas-label">${emoji} ${label}</div>
          ${genSous("Entrée", "🥗", r.entree)}
          ${genSous("Plat", "🍽️", r.plat)}
          ${genSous("Dessert", "🍰", r.dessert)}
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
      div.innerHTML = `
        <h3 class="plan-jour-titre">${jour.jour}</h3>
        <div class="plan-repas-row">
          <div class="plan-repas" onclick="ouvrirRecettePlan('${midi}', ${personnes})">
            <div class="plan-repas-label">☀️ Midi</div>
            <div class="plan-repas-emoji">${getEmoji(midi)}</div>
            <div class="plan-repas-nom">${getNomRecette(midi)}</div>
            <div class="plan-repas-note">${midiNote}</div>
          </div>
          <div class="plan-repas" onclick="ouvrirRecettePlan('${soir}', ${personnes})">
            <div class="plan-repas-label">🌙 Soir</div>
            <div class="plan-repas-emoji">${getEmoji(soir)}</div>
            <div class="plan-repas-nom">${getNomRecette(soir)}</div>
            <div class="plan-repas-note">${soirNote}</div>
          </div>
        </div>`;
    }
    container.appendChild(div);
  });

  document.getElementById("plan-form").style.display = "none";
  document.getElementById("plan-result").style.display = "block";
}


function ouvrirRecettePlan(recetteKey, personnes) {
  // Ouvrir directement la modale sans changer d'onglet
  document.getElementById("personnes").value = personnes;
  choisirRecette(recetteKey);
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

  // Pré-remplir personnes depuis le foyer
  const foyer = window.userProfile?.foyer;
  if (foyer) {
    const nb = (foyer.adultes||0) + (foyer.ados||0) + (foyer.enfants||0);
    const inputP = document.getElementById("plan-personnes");
    if (inputP && nb > 0) inputP.value = nb;
  }

  // Pré-remplir allergies dans le champ texte
  const allergies = [...(prefs.allergies||[]), ...(prefs.allergiesCustom||[])];
  const inputA = document.getElementById("plan-allergies");
  if (inputA && allergies.length > 0 && !inputA.value) {
    inputA.value = allergies.join(", ");
  }
}

function chargerMenusAuDemarrage() {
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
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  const btnTout = document.getElementById("btn-tout");
  if (btnTout) btnTout.classList.add("active");
  // Basculer vers la grille
  const secAccueil = document.getElementById("section-accueil");
  const secCartes  = document.getElementById("section-cartes");
  if (secAccueil) secAccueil.style.display = "none";
  if (secCartes)  secCartes.classList.add("visible");
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
    btn.classList.add("active");
    document.getElementById("btn-tout").classList.remove("active");
    document.querySelectorAll(`#${menuId} .pays-btn`).forEach(b => b.classList.remove("active"));
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
}
function filtrerCategorie(cat) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  basculeVersGrille();
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
  document.querySelectorAll("#menu-pays .pays-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  document.querySelectorAll(".carte").forEach(c => {
    c.style.display = (c.dataset.pays === pays) ? "" : "none";
  });
  if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
}

// Calculer depuis une carte et afficher en modal
function calculerCarte(recette, inputId) {
  const input = document.getElementById(inputId);
  const val = parseInt(input.value) || 1;
  document.getElementById("recette").value = recette;
  document.getElementById("personnes").value = val;
  calculer();
  setTimeout(() => {
    const res = document.getElementById("resultat").innerHTML;
    document.getElementById("modal-resultat").innerHTML = res;
    document.getElementById("modal-calc").classList.add("visible");
  }, 50);
}

// Ouvrir la fiche recette depuis une carte en lisant son input
function ouvrirFiche(recette, inputId) {
  const input = inputId ? document.getElementById(inputId) : null;
  const val = input ? (parseInt(input.value) || 1) : null;
  if (val !== null) {
    document.getElementById("personnes").value = val;
  }
  choisirRecette(recette);
}

function fermerModal() {
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
