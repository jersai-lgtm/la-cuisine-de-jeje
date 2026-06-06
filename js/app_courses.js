// =============================================================================
// 📦 MODULE : COURSES
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

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
    // Ajouter (nb personnes = foyer ; bébés exclus pour cocktails/mocktails, comme sur la fiche)
    const foyer = window.userProfile.foyer || {};
    const nb = (typeof calculerPersonnesPourRecette === "function")
      ? calculerPersonnesPourRecette(cle)
      : ((foyer.adultes || 0) + (foyer.ados || 0) + (foyer.enfants || 0) + (foyer.bebes || 0) || 4);
    window.userProfile.listeCourses.push({ cle, personnes: nb });
    btn.classList.add("lc-chip-active");
    btn.querySelector(".lc-chip-check").textContent = "✓";
  }
  
  // Sauvegarde Firebase silencieuse
  lcSauvegarder();
  if (typeof lcAfficherPanier === "function") lcAfficherPanier();
  if (typeof lcGenererListe === "function") lcGenererListe();
}

// v1.0.6 : ouvre directement la vue Liste de courses (section Cuisine > onglet Courses).
function ouvrirListeCourses() {
  if (typeof fermerModal === "function") fermerModal();           // ferme la fiche recette
  const btnCuisine = document.querySelectorAll(".nav-btn")[1];    // 2e bouton nav = Cuisine
  if (typeof afficherSection === "function" && btnCuisine) afficherSection("cuisine", btnCuisine);
  if (typeof switchCuisineTab === "function") switchCuisineTab("courses");
  try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {}
}

// v1.0.6 : toast CLIQUABLE (~4 s) qui redirige vers la liste de courses.
function afficherToastCourses(message) {
  const ancien = document.getElementById("toast-courses");
  if (ancien) ancien.remove();
  const t = document.createElement("div");
  t.id = "toast-courses";
  t.setAttribute("role", "button");
  t.innerHTML = message + ' <span style="font-weight:800;margin-left:6px;white-space:nowrap">— Voir la liste 👉</span>';
  t.style.cssText =
    "position:fixed;bottom:84px;left:50%;transform:translateX(-50%) translateY(60px);" +
    "background:linear-gradient(135deg,#ff5e9a,#ff8fb3);color:#fff;" +
    "padding:13px 22px;border-radius:24px;box-shadow:0 6px 26px rgba(255,77,136,.5);" +
    "z-index:100000;font-size:14px;font-weight:600;max-width:92%;text-align:center;" +
    "cursor:pointer;opacity:0;transition:opacity .3s ease,transform .3s ease;pointer-events:auto;" +
    "font-family:system-ui,-apple-system,sans-serif";
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = "1";
    t.style.transform = "translateX(-50%) translateY(0)";
  });
  let parti = false;
  const fermer = () => {
    if (parti) return; parti = true;
    t.style.opacity = "0";
    t.style.transform = "translateX(-50%) translateY(60px)";
    setTimeout(() => t.remove(), 350);
  };
  t.addEventListener("click", () => { fermer(); ouvrirListeCourses(); });
  setTimeout(fermer, 4000); // visible ~4 secondes pour avoir le temps de cliquer
}

// v258.14 : ajoute UNE recette (depuis sa fiche) à la liste de courses intelligente.
// Remplace l'ancien bouton « Liste de courses » qui ne faisait que ré-afficher les
// ingrédients déjà visibles sur la fiche.
function ajouterRecetteAuxCourses(cle) {
  if (!window.userProfile) {
    if (typeof afficherToast === "function") afficherToast("⚠️ Connecte-toi pour utiliser la liste de courses");
    return;
  }
  if (typeof recettes !== "undefined" && !recettes[cle]) return;
  if (!window.userProfile.listeCourses) window.userProfile.listeCourses = [];
  const liste = window.userProfile.listeCourses;
  // Nombre de personnes : valeur affichée sur la fiche, sinon foyer, sinon 4
  const foyer = window.userProfile.foyer || {};
  const totalFoyer = (foyer.adultes || 0) + (foyer.ados || 0) + (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0);
  const inputP = document.getElementById("personnes");
  const nb = (inputP && parseInt(inputP.value))
    || ((typeof calculerPersonnesPourRecette === "function") ? calculerPersonnesPourRecette(cle) : (totalFoyer || 4));
  const i = liste.findIndex(p => p.cle === cle);
  if (i >= 0) {
    liste[i].personnes = nb;
    if (typeof afficherToastCourses === "function") afficherToastCourses("🛒 Déjà dans ta liste — quantité mise à jour");
  } else {
    liste.push({ cle, personnes: nb });
    if (typeof afficherToastCourses === "function") afficherToastCourses("🛒 Ajouté à ta liste de courses");
  }
  if (typeof lcSauvegarder === "function") lcSauvegarder();
  if (typeof lcAfficherPanier === "function") lcAfficherPanier();
  if (typeof lcGenererListe === "function") lcGenererListe();
}

async function lcSauvegarder() {
  if (!window.currentUser || !window.userProfile) return;
  try {
    await _db.collection("utilisateurs").doc(window.currentUser.uid).set({
      listeCourses: window.userProfile.listeCourses || [],
      listeCoursesCoches: window.userProfile.listeCoursesCoches || [],
      planPrepCoches: window.userProfile.planPrepCoches || [],
    }, { merge: true });
  } catch (e) { console.warn("Sauvegarde liste courses échouée :", e); }
}

// Temps de prep ACTIF d'une recette : on ne garde que la partie avant le "+"
// (marinade, repos, frigo, "48h pâte"… = attente passive, exclue du total).
window.lcPrepMinutes = function (temps) {
  if (!temps) return 0;
  const s = String(temps).split("+")[0].replace("~", "").trim().toLowerCase();
  const mh = s.match(/(\d+)\s*h\s*(\d+)?/);
  if (mh) return (parseInt(mh[1]) || 0) * 60 + (parseInt(mh[2] || "0") || 0);
  const mm = s.match(/(\d+)\s*min/);
  if (mm) return parseInt(mm[1]) || 0;
  const mn = s.match(/(\d+)/);
  return mn ? parseInt(mn[1]) : 0;
};
window.lcFmtDuree = function (min) {
  min = Math.round(min);
  if (min <= 0) return "—";
  const h = Math.floor(min / 60), m = min % 60;
  if (h && m) return h + " h " + (m < 10 ? "0" + m : m);
  if (h) return h + " h";
  return m + " min";
};

// Temps de travail ACTIF d'une recette (manuel) : on somme les étapes prep + finition
// (on ignore cuisson & repos, qui sont passifs et tournent en parallèle).
// Si les étapes n'ont pas de durée exploitable, on retombe sur ~45 % du temps total (plafonné).
window.lcActiveMinutes = function (r) {
  if (!r) return 0;
  if (Array.isArray(r.etapes) && r.etapes.length) {
    let act = 0, aDesTemps = false;
    r.etapes.forEach(et => {
      const ph = (typeof lcClasserEtape === "function") ? lcClasserEtape(et) : "prep";
      if (ph === "cuisson" || ph === "repos") return; // passif
      const b = String(et.badge || "");
      const mh = b.match(/(\d+)\s*h\s*(\d+)?/);
      const mm = b.match(/(\d+)\s*min/);
      let mins = 0;
      if (mh) mins = (parseInt(mh[1]) || 0) * 60 + (parseInt(mh[2] || "0") || 0);
      else if (mm) mins = parseInt(mm[1]) || 0;
      if (mins > 0) { act += mins; aDesTemps = true; }
    });
    if (aDesTemps) return act;
  }
  return Math.min(Math.round(lcPrepMinutes(r.temps) * 0.45), 35);
};

// Temps actif TOTAL d'une session de batch : 1re recette à plein, les suivantes décotées
// (mutualisation : on lave/épluche/coupe en commun, le four cuit plusieurs choses à la fois).
window.lcBatchActif = function (liste) {
  const actives = (liste || [])
    .map(({ cle }) => { const r = recettes[cle]; return r ? lcActiveMinutes(r) : 0; })
    .filter(x => x > 0)
    .sort((a, b) => b - a);
  if (!actives.length) return 0;
  let total = 0;
  actives.forEach((a, i) => { total += (i === 0 ? a : a * 0.6); });
  return Math.round(total);
};

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

  const totalMin = lcBatchActif(liste);
  const totalTxt = lcFmtDuree(totalMin);

  panier.innerHTML = `<h3 class="lc-panier-titre">🍽️ ${liste.length} recette${liste.length > 1 ? "s" : ""} sélectionnée${liste.length > 1 ? "s" : ""}${totalMin > 0 ? ` <span style="font-size:13px;color:#9a97a0;font-weight:400">· ⏱ ≈ ${totalTxt} de prépa en batch</span>` : ""}</h3>
    <div class="lc-panier-recettes">${liste.map(({cle, personnes}) => {
      const nom = (typeof getNomRecette === "function") ? getNomRecette(cle) : cle;
      const r = recettes[cle];
      const tempsTxt = (r && r.temps) ? r.temps : "";
      return `<div class="lc-recette-card">
        <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
          <span class="lc-recette-nom" style="flex:none;width:100%">${nom}</span>
          ${tempsTxt ? `<span style="font-size:11px;color:#9a97a0;white-space:nowrap">⏱ ${tempsTxt}</span>` : ""}
        </div>
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

  const toggle = document.getElementById("lc-vue-toggle");
  if (toggle) toggle.style.display = liste.length ? "flex" : "none";

  if (liste.length === 0) {
    zone.style.display = "none";
    const prepZ = document.getElementById("lc-plan-prep");
    if (prepZ) prepZ.style.display = "none";
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
  // Respecter la vue active (Liste de courses / Plan de prep)
  if (window._lcVue === "prep") {
    zone.style.display = "none";
    lcGenererPlanPrep();
  } else {
    zone.style.display = "block";
    const prepZ = document.getElementById("lc-plan-prep");
    if (prepZ) prepZ.style.display = "none";
  }
}

window._lcVue = window._lcVue || "courses";

// Bascule entre la liste de courses et le plan de prep (batch cooking)
function lcAfficherVue(vue) {
  window._lcVue = vue;
  const showPrep = (vue === "prep");
  const courses = document.getElementById("lc-liste");
  const prep = document.getElementById("lc-plan-prep");
  const bC = document.getElementById("lc-vue-courses");
  const bP = document.getElementById("lc-vue-prep");
  const liste = window.userProfile?.listeCourses || [];
  if (bC) { bC.style.background = showPrep ? "transparent" : "#ff4d88"; bC.style.borderColor = showPrep ? "rgba(255,255,255,.18)" : "#ff4d88"; }
  if (bP) { bP.style.background = showPrep ? "#ff4d88" : "transparent"; bP.style.borderColor = showPrep ? "#ff4d88" : "rgba(255,255,255,.18)"; }
  if (showPrep) {
    if (courses) courses.style.display = "none";
    if (prep) prep.style.display = "block";
    lcGenererPlanPrep();
  } else {
    if (prep) prep.style.display = "none";
    if (courses) courses.style.display = liste.length ? "block" : "none";
  }
}

// Les phases du plan de prep (batch cooking)
const PREP_PHASES = [
  { id: "prep",     icone: "🔪", titre: "Mise en place",         note: "Épluche, coupe et prépare tout ça en une seule fois, pour toutes les recettes." },
  { id: "cuisson",  icone: "🔥", titre: "Cuissons",              note: "Lance ensemble ce qui peut cuire en même temps, et enchaîne pendant les temps de cuisson." },
  { id: "finition", icone: "🥄", titre: "Assemblage & finition", note: "On monte les plats, on assaisonne et on dresse." },
  { id: "repos",    icone: "❄️", titre: "Repos & conservation",  note: "Marinades, repos et refroidissement, puis on range au frais ou au congélateur." },
];

function _prepStrip(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Classe une étape dans une phase, d'après son titre/détail + son icône.
// Si l'étape a un champ "phase" explicite ("prep"|"cuisson"|"finition"|"repos"),
// il est prioritaire (classement 100 % maîtrisé).
function lcClasserEtape(et) {
  if (et.phase && ["prep", "cuisson", "finition", "repos"].includes(et.phase)) return et.phase;
  const t = _prepStrip((et.titre || "") + " " + (et.detail || ""));
  const ic = et.icone || "";
  const a = (...mots) => mots.some(m => t.includes(m));
  if (/❄️/.test(ic) || a("repos", "repose", "marin", "refroid", "au frais", "frigo", "pousse", "fermenter", "refriger", "congel", "raffermir", "tiedir", "figer", "prendre au frais")) return "repos";
  if (/[🔥♨🍳🍲🧇]/u.test(ic) || a("cuire", "cuisson", "enfourn", "au four", "mijot", "braiser", "rotir", "bouill", "ebullition", "pocher", "frire", "friture", "saisir", "dorer", "griller", "rissol", "compot", "infus", "chauffer", "blanchir", "revenir", "faire suer", "fondre", "poele", "sauter", "flamber", "gratiner")) return "cuisson";
  if (/[🥄🍽🧀🌿🍫🥗🍯🥥]/u.test(ic) || a("assembl", "dresser", "napper", "garnir", "lier", "monter", "incorpor", "servir", "service", "sauce", "deglac", "ajuster", "gouter", "parsem", "decorer", "emulsion", "presenter", "finir", "melange", "remuer", "filtrer", "frapper")) return "finition";
  return "prep";
}

// Une étape est-elle "minute" (au tout dernier moment) ? Priorité aux métadonnées
// batch (etapesBatch / etapesMinute, index 1-based). Fallback : la phase "finition".
function lcEstMinute(cle, idx1, et) {
  const meta = (window.RECETTES_BATCH || {})[cle];
  if (meta && (Array.isArray(meta.etapesMinute) || Array.isArray(meta.etapesBatch))) {
    if (Array.isArray(meta.etapesMinute) && meta.etapesMinute.includes(idx1)) return true;
    if (Array.isArray(meta.etapesBatch) && meta.etapesBatch.includes(idx1)) return false;
    return false; // index non classé par le modèle → batch par défaut
  }
  return lcClasserEtape(et) === "finition";
}

// Conseil de conservation par recette (heuristique : catégorie + mots-clés)
// Retourne { frigo: nbJours, congel: "oui"|"moyen"|"non", note: "" }
function lcConseilConservation(cle) {
  const meta = (window.RECETTES_BATCH || {})[cle];
  if (meta && meta.conservation && ["oui", "moyen", "non"].includes(meta.conservation.congel)) return meta.conservation;
  const r = recettes[cle] || {};
  const cat = r.cat || "";
  const t = _prepStrip((r.nom || cle) + " " + (r.description || ""));
  const a = (...m) => m.some(x => t.includes(x));
  if (cat === "cocktails" || cat === "mocktails") return { frigo: 0, congel: "non", note: "à préparer au moment, ne se conserve pas" };
  if (a("poisson", "saumon", "cabillaud", "crevette", "fruits de mer", "tartare", "carpaccio", "ceviche", "huitre", "moule", "saint-jacques")) return { frigo: 1, congel: "moyen", note: "à manger en premier ; congélation possible mais qualité moindre" };
  if (cat === "salades" || a("salade", "crudite")) return { frigo: 2, congel: "non", note: "légumes crus : ne se congèle pas, à manger en début de semaine" };
  if (cat === "sauces") return { frigo: 4, congel: "oui", note: "se congèle très bien, en portions" };
  if (cat === "soupes" || a("soupe", "veloute", "potage", "bisque")) return { frigo: 3, congel: "oui", note: "se congèle parfaitement" };
  if (cat === "boulangerie" || cat === "pizzas" || a("pain", "brioche", "pizza", "gaufre", "pate ")) return { frigo: 2, congel: "oui", note: "se congèle bien (bien emballé), réchauffe au four" };
  if (cat === "desserts") {
    if (a("creme", "mousse", "tiramisu", "panna", "bavarois", "cheesecake", "ile flottante", "meringue", "chantilly", "flan")) return { frigo: 2, congel: "non", note: "à base de crème/œufs : ne se congèle pas, à consommer vite" };
    return { frigo: 3, congel: "oui", note: "se congèle bien en parts" };
  }
  if (a("friture", "frite", "beignet", "pane", "croustill", "tempura", "nem", "pakora", "rosti")) return { frigo: 2, congel: "moyen", note: "perd son croustillant ; meilleur frais" };
  return { frigo: 3, congel: "oui", note: "se congèle bien, idéal pour faire du rab" };
}

// Interrupteur : passe à false pour masquer partout les temps de réchauffage (s'ils ne conviennent pas)
const LC_AFFICHER_RECHAUFFE = true;

// Temps de réchauffage ESTIMÉ (indicatif) en minutes. 0 = à servir frais (rien à réchauffer).
function lcTempsRechauffe(cle) {
  const meta = (window.RECETTES_BATCH || {})[cle];
  if (meta && Number.isFinite(meta.rechauffe)) return meta.rechauffe;
  const r = recettes[cle] || {};
  const cat = r.cat || "";
  const t = _prepStrip((r.nom || cle) + " " + (r.description || ""));
  const a = (...m) => m.some(x => t.includes(x));
  if (cat === "cocktails" || cat === "mocktails" || cat === "salades" || cat === "desserts") return 0;
  if (a("salade", "crudite", "tartare", "carpaccio", "ceviche", "gaspacho", "smoothie", "tiramisu", "mousse", "panna", "cheesecake", "glace", "sorbet")) return 0;
  if (cat === "soupes" || a("soupe", "veloute", "potage", "bisque")) return 5;
  if (a("gratin", "lasagne", "hachis", "tian", "tarte", "quiche", "roti", "enfourn", "au four")) return 15;
  if (cat === "pizzas" || cat === "boulangerie" || a("pizza", "pain", "feuillete")) return 10;
  return 8; // plat classique : poêle/casserole/micro-ondes
}

// Jours de la semaine (ordre pour les calculs d'écart prep -> conso)
const LC_JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

// Mappe chaque recette du menu courant daté à ses jours (index 0=Lundi).
// Gère semaine simple/complet et lunch box. Le menu thématique est ignoré (pas de jours).
function lcMenuParJour() {
  let m = window._derniersMenus;
  if ((!m || !Array.isArray(m.semaine)) && typeof chargerMenusSauvegardes === "function") {
    const saved = chargerMenusSauvegardes();
    if (saved && saved.menus) m = saved.menus;
  }
  const map = {};
  if (!m || !Array.isArray(m.semaine)) return map;
  const add = (cle, idx) => { if (!cle) return; (map[cle] = map[cle] || []); if (!map[cle].includes(idx)) map[cle].push(idx); };
  m.semaine.forEach(jour => {
    const idx = LC_JOURS.indexOf(jour.jour);
    if (idx < 0) return;
    ["midi", "soir"].forEach(cr => {
      const slot = jour[cr];
      if (!slot) return;
      if (slot.recette) { add(slot.recette, idx); return; }                  // simple / lunch box
      ["entree", "plat", "dessert"].forEach(role => { if (slot[role] && slot[role].recette) add(slot[role].recette, idx); }); // complet
    });
  });
  return map;
}

// Détail par jour : index -> [{ cle, creneau, role }] (pour la vue « Chaque soir »)
function lcMenuParJourDetail() {
  let m = window._derniersMenus;
  if ((!m || !Array.isArray(m.semaine)) && typeof chargerMenusSauvegardes === "function") {
    const saved = chargerMenusSauvegardes();
    if (saved && saved.menus) m = saved.menus;
  }
  const out = {};
  if (!m || !Array.isArray(m.semaine)) return out;
  m.semaine.forEach(jour => {
    const idx = LC_JOURS.indexOf(jour.jour);
    if (idx < 0) return;
    ["midi", "soir"].forEach(cr => {
      const slot = jour[cr];
      if (!slot) return;
      const push = (cle, role) => { if (!cle) return; (out[idx] = out[idx] || []).push({ cle, creneau: cr, role: role || null }); };
      if (slot.recette) { push(slot.recette, null); return; }
      ["entree", "plat", "dessert"].forEach(role => { if (slot[role] && slot[role].recette) push(slot[role].recette, role); });
    });
  });
  return out;
}

// Génère le plan de prep regroupé par phases (batch cooking)
function lcGenererPlanPrep() {
  const liste = window.userProfile?.listeCourses || [];
  const zone = document.getElementById("lc-plan-prep");
  if (!zone) return;
  if (liste.length === 0) { zone.innerHTML = ""; return; }

  const menuMap = lcMenuParJour();
  const aMenu = Object.keys(menuMap).length > 0;

  const buckets = { prep: [], cuisson: [], finition: [], repos: [] };
  liste.forEach(({ cle }) => {
    const r = recettes[cle];
    if (!r) return;
    if (!Array.isArray(r.etapes)) return;
    const nom = (typeof getNomRecette === "function") ? getNomRecette(cle) : cle;
    r.etapes.forEach((et, idx) => {
      const minute = lcEstMinute(cle, idx + 1, et);
      if (aMenu && minute) return;                 // étapes "minute" → vue « Chaque soir »
      buckets[minute ? "finition" : lcClasserEtape(et)].push({ nom, et });
    });
  });
  const actifMin = lcBatchActif(liste);

  const ech = s => String(s || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const ah = s => ech(s).replace(/"/g, "&quot;");

  const norm = s => _prepStrip(s).replace(/\s+/g, " ").trim();
  const coches = new Set(window.userProfile?.planPrepCoches || []);
  const joursMenu = Object.values(menuMap).reduce((a, b) => a.concat(b), []);
  if (!window._lcJourPrep) window._lcJourPrep = joursMenu.length ? LC_JOURS[Math.min.apply(null, joursMenu)] : "Dimanche";
  const jourPrepIdx = LC_JOURS.indexOf(window._lcJourPrep);

  const phasesAffichees = PREP_PHASES.filter(p => buckets[p.id].length);
  const phasesHTML = phasesAffichees.map((phase, i) => {
    const items = buckets[phase.id];
    // Déduplication : étapes identiques (même titre + même détail) → 1 ligne, recettes cumulées
    const groupes = new Map();
    items.forEach(({ nom, et }) => {
      const key = norm(et.titre) + "||" + norm(et.detail);
      if (!groupes.has(key)) groupes.set(key, { key: key, icone: et.icone || "", titre: et.titre || "", detail: et.detail || "", badge: et.badge || null, recettes: [] });
      const g = groupes.get(key);
      if (!g.recettes.includes(nom)) g.recettes.push(nom);
    });
    const groupesArr = [...groupes.values()];
    const steps = groupesArr.map(g => {
      const done = coches.has(g.key);
      const chips = g.recettes.map(n => `<span class="prep-rec">${ech(n)}</span>`).join("");
      return `<div class="prep-step${done ? " prep-done" : ""}">
        <input type="checkbox" class="prep-check" ${done ? "checked" : ""} onclick="event.stopPropagation();lcTogglePrep(this)" data-k="${ah(g.key)}">
        <div class="prep-step-body" onclick="this.closest('.prep-step').classList.toggle('prep-open')">
          <div class="prep-step-head">
            <span class="prep-chev">▸</span>
            <span class="prep-step-titre">${ech(g.icone)} ${ech(g.titre)}</span>
            ${g.badge ? `<span class="prep-tb">${ech(g.badge)}</span>` : ""}
          </div>
          <div class="prep-recs">${chips}</div>
          ${g.detail ? `<div class="prep-step-detail">${ech(g.detail)}</div>` : ""}
        </div>
      </div>`;
    }).join("");
    return `<details class="lc-acc" style="margin-bottom:10px">
      <summary>
        <span style="flex:none;width:24px;height:24px;border-radius:50%;background:#ff4d88;color:#fff;font-size:13px;font-weight:500;display:flex;align-items:center;justify-content:center">${i + 1}</span>
        <span style="font-size:15px;font-weight:500;color:#fff">${phase.icone} ${phase.titre}</span>
        <span class="lc-acc-count">${groupesArr.length} étape${groupesArr.length > 1 ? "s" : ""}</span>
        <span class="lc-acc-chev">▸</span>
      </summary>
      <div style="margin-top:8px">
        <div style="font-size:12px;color:#9a97a0;margin:0 0 9px 33px">${phase.note}</div>
        <div style="display:flex;flex-direction:column;gap:7px;margin-left:33px">${steps}</div>
      </div>
    </details>`;
  }).join("");

  // Conservation — datée si un menu courant existe (écart prep -> conso), sinon générique
  const consData = liste.map(({ cle, personnes }) => {
    const r = recettes[cle];
    if (!r) return null;
    const nom = (typeof getNomRecette === "function") ? getNomRecette(cle) : cle;
    const c = lcConseilConservation(cle);
    const jours = (menuMap[cle] || []).slice().sort((a, b) => a - b);
    let risque, dateInfo = null, joursTxt = "";
    if (jours.length && jourPrepIdx >= 0) {
      joursTxt = jours.map(i => LC_JOURS[i]).join(", ");
      const last = jours[jours.length - 1];
      const ecart = (last - jourPrepIdx + 7) % 7;
      if (ecart <= c.frigo) {
        risque = "bas";
        dateInfo = { type: "frigo", txt: `🟢 Prépare-le le ${window._lcJourPrep} : il tiendra au frigo jusqu'à ${LC_JOURS[last]}.` };
      } else if (c.congel !== "non") {
        risque = "moyen";
        dateInfo = { type: "congel", txt: `🔵 Mangé ${LC_JOURS[last]} (J+${ecart}) : congèle-le le ${window._lcJourPrep}, sors-le au frigo la veille.` };
      } else {
        risque = "haut";
        const dPrep = (last - c.frigo + 7) % 7;
        dateInfo = { type: "tard", txt: `🔴 Mangé ${LC_JOURS[last]} (J+${ecart}) mais il ne tient que ${c.frigo} j et ne se congèle pas → prépare-le plutôt le ${LC_JOURS[dPrep]}.` };
      }
    } else {
      risque = (c.congel === "non" && c.frigo <= 2) ? "haut" : (c.frigo <= 2 || c.congel !== "oui") ? "moyen" : "bas";
    }
    return { nom, personnes: personnes || null, frigo: c.frigo, congel: c.congel, note: c.note, risque, jours, joursTxt, dateInfo };
  }).filter(Boolean);
  const rang = { haut: 0, moyen: 1, bas: 2 };
  consData.sort((a, b) => (rang[a.risque] - rang[b.risque]) || (a.frigo - b.frigo));

  const fragiles = consData.filter(x => x.risque === "haut");
  const plur = fragiles.length > 1;
  const lesle = plur ? "les" : "le";
  const bannerAdvice = aMenu ? `Prépare-${lesle} au plus tard dans la semaine, ou mange-${lesle} en premier.` : `N'en prépare pas plus que ce que tu mangeras en 1-2 jours.`;
  const alerteHTML = fragiles.length ? `<div style="background:rgba(255,90,90,.1);border:1px solid rgba(255,90,90,.35);border-radius:11px;padding:9px 11px;margin:0 0 9px 33px">
      <div style="font-size:12px;color:#ff8f8f;font-weight:600;margin-bottom:2px">⚠️ Attention à ${plur ? "ces plats" : "ce plat"}</div>
      <div style="font-size:11px;color:#d7b3b3">${fragiles.map(x => ech(x.nom)).join(", ")} — se garde${plur ? "nt" : ""} peu et ne se congèle${plur ? "nt" : ""} pas. ${bannerAdvice}</div>
    </div>` : "";

  const consHTML = consData.map(x => {
    const pastille = x.risque === "haut" ? "🔴" : x.risque === "moyen" ? "🟠" : "🟢";
    const frigoTxt = x.frigo > 0 ? `🧊 Frigo ${x.frigo} j` : "🥤 à préparer minute";
    const congTxt = x.congel === "oui" ? "❄️ se congèle bien" : x.congel === "moyen" ? "❄️ congélation possible" : "⛔ ne se congèle pas";
    const congColor = x.congel === "oui" ? "#7fdca8" : x.congel === "moyen" ? "#ffb27a" : "#ff8f8f";
    const portionTxt = x.personnes ? ` · 🍽️ ${x.personnes} pers.` : "";
    const joursLigne = x.joursTxt ? `<div style="font-size:11px;color:#9a97a0;margin-top:3px">📅 mangé : ${ech(x.joursTxt)}</div>` : "";
    const conseilColor = x.dateInfo ? (x.dateInfo.type === "tard" ? "#ff8f8f" : x.dateInfo.type === "congel" ? "#8fb8ff" : "#9adcb0") : "#88858f";
    const conseil = x.dateInfo
      ? `<div style="font-size:11px;color:${conseilColor};margin-top:3px">${ech(x.dateInfo.txt)}</div>`
      : (x.note ? `<div style="font-size:11px;color:#88858f;margin-top:2px">${ech(x.note)}</div>` : "");
    const avert = (!x.dateInfo && x.risque === "haut" && x.personnes && x.personnes >= 4)
      ? `<div style="font-size:11px;color:#ff8f8f;margin-top:3px">⚠️ ${x.personnes} portions d'un plat qui ne tient que ${x.frigo} j et ne se congèle pas : mange-le vite ou réduis la quantité.</div>` : "";
    return `<div style="background:#1a1620;border:1px solid rgba(255,255,255,.07);border-radius:11px;padding:9px 11px">
        <div style="font-size:13px;color:#fff;font-weight:500;margin-bottom:3px">${pastille} ${ech(x.nom)}<span style="color:#88858f;font-weight:400">${portionTxt}</span></div>
        <div style="font-size:12px;color:#b3b0b8">${frigoTxt} · <span style="color:${congColor}">${congTxt}</span></div>
        ${joursLigne}
        ${conseil}
        ${avert}
      </div>`;
  }).join("");
  const consIntro = aMenu
    ? `Calculé pour une prép le <strong style="color:#fff">${window._lcJourPrep}</strong> · 🟢 frigo OK · 🔵 à congeler · 🔴 à préparer plus tard.`
    : `🔴 à manger en premier · 🟠 assez vite · 🟢 se garde bien / se congèle. Congèle ce que tu ne finiras pas à temps. 😊`;
  const conservationBloc = `<details class="lc-acc" style="margin-bottom:10px">
      <summary>
        <span style="flex:none;width:24px;height:24px;border-radius:50%;background:#3a6ea5;color:#fff;font-size:14px;display:flex;align-items:center;justify-content:center">🥶</span>
        <span style="font-size:15px;font-weight:500;color:#fff">Conservation & congélation</span>
        ${fragiles.length ? `<span style="font-size:11px;color:#ff8f8f;font-weight:600">⚠️ ${fragiles.length}</span>` : ""}
        <span class="lc-acc-count">${consData.length}</span>
        <span class="lc-acc-chev">▸</span>
      </summary>
      <div style="margin-top:8px">
        <div style="font-size:12px;color:#9a97a0;margin:0 0 9px 33px">${consIntro}</div>
        ${alerteHTML}
        <div style="display:flex;flex-direction:column;gap:7px;margin-left:33px">${consHTML}</div>
      </div>
    </details>`;

  const styleBloc = `<style>
    #lc-plan-prep .prep-step{background:#1a1620;border:1px solid rgba(255,255,255,.07);border-radius:11px;padding:9px 11px;display:flex;gap:9px;align-items:flex-start}
    #lc-plan-prep .prep-check{flex:none;width:18px;height:18px;margin:1px 0 0;accent-color:#ff4d88;cursor:pointer}
    #lc-plan-prep .prep-step-body{flex:1;min-width:0;cursor:pointer}
    #lc-plan-prep .prep-step.prep-done{opacity:.5}
    #lc-plan-prep .prep-step.prep-done .prep-step-titre{text-decoration:line-through}
    #lc-plan-prep .prep-step-head{display:flex;align-items:center;gap:7px}
    #lc-plan-prep .prep-chev{font-size:11px;color:#88858f;transition:transform .15s ease;flex:none}
    #lc-plan-prep .prep-step.prep-open .prep-chev{transform:rotate(90deg)}
    #lc-plan-prep .prep-step-titre{font-size:13px;color:#fff;font-weight:500;flex:1}
    #lc-plan-prep .prep-tb{font-size:11px;color:#d7d5db;background:rgba(255,255,255,.07);padding:2px 8px;border-radius:999px;white-space:nowrap}
    #lc-plan-prep .prep-recs{display:flex;flex-wrap:wrap;gap:4px;margin:5px 0 0 18px}
    #lc-plan-prep .prep-rec{font-size:10px;color:#ff8fb3;background:rgba(255,77,136,.13);padding:1px 7px;border-radius:999px}
    #lc-plan-prep .prep-step-detail{display:none;font-size:12px;color:#b3b0b8;line-height:1.5;margin:6px 0 0 18px}
    #lc-plan-prep .prep-step.prep-open .prep-step-detail{display:block}
    #lc-plan-prep .lc-acc>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:9px;padding:5px 0}
    #lc-plan-prep .lc-acc>summary::-webkit-details-marker{display:none}
    #lc-plan-prep .lc-acc-count{font-size:11px;color:#88858f;background:rgba(255,255,255,.06);padding:1px 8px;border-radius:999px;margin-left:auto}
    #lc-plan-prep .lc-acc-chev{color:#88858f;font-size:12px;transition:transform .15s ease;margin-left:8px}
    #lc-plan-prep .lc-acc[open]>summary .lc-acc-chev{transform:rotate(90deg)}
  </style>`;

  const selecteurHTML = aMenu ? `<div style="display:flex;align-items:center;gap:8px;margin:0 0 14px;flex-wrap:wrap">
      <span style="font-size:13px;color:#b3b0b8">🍳 Je cuisine le :</span>
      <select onchange="lcSetJourPrep(this.value)" style="background:#15121a;color:#fff;border:1px solid rgba(255,255,255,.18);border-radius:9px;padding:6px 10px;font-size:13px">
        ${LC_JOURS.map(j => `<option value="${j}"${j === window._lcJourPrep ? " selected" : ""}>${j}</option>`).join("")}
      </select>
    </div>` : "";

  // Vue « Chaque soir » (façon livre de batch cooking) — seulement si un menu daté existe
  let soirHTML = "";
  if (aMenu) {
    const nomDe = cle => (typeof getNomRecette === "function") ? getNomRecette(cle) : cle;
    const detail = lcMenuParJourDetail();
    const joursPresents = Object.keys(detail).map(Number).sort((a, b) => a - b);
    const estCongele = (cle, idx) => {
      const c = lcConseilConservation(cle);
      return (((idx - jourPrepIdx + 7) % 7) > c.frigo) && c.congel !== "non";
    };
    const cards = joursPresents.map(idx => {
      const demain = detail[idx + 1] || [];
      const aSortir = [...new Set(demain.filter(p => estCongele(p.cle, idx + 1)).map(p => nomDe(p.cle)))];
      const rappel = aSortir.length ? `<div style="background:rgba(143,184,255,.1);border:1px solid rgba(143,184,255,.3);border-radius:9px;padding:7px 10px;margin-bottom:7px;font-size:11px;color:#9ec1ff">🔔 Ce soir, sors du congélateur pour demain : ${aSortir.map(ech).join(", ")}</div>` : "";
      const plats = (detail[idx] || []).map(p => {
        const r = recettes[p.cle]; if (!r) return "";
        const emo = (typeof getEmoji === "function") ? getEmoji(p.cle) : "🍽️";
        const crLbl = p.creneau === "midi" ? "midi" : "soir";
        const rech = LC_AFFICHER_RECHAUFFE ? lcTempsRechauffe(p.cle) : null;
        const rechTxt = (rech && rech > 0) ? ` · ♨️ ≈ ${rech} min` : (rech === 0 ? " · 🧊 servir frais" : "");
        const meta = (window.RECETTES_BATCH || {})[p.cle];
        const sauceTag = (meta && meta.sauceAPart) ? ` · <span style="color:#ffb38f">🥄 sauce à part</span>` : "";
        let gestes;
        if (meta && meta.conseilSoir) {
          const mins = (Array.isArray(r.etapes) && Array.isArray(meta.etapesMinute))
            ? r.etapes.filter((et, idx) => meta.etapesMinute.includes(idx + 1)) : [];
          const minLis = mins.map(et => `<li>${ech(et.titre)}${et.detail ? ` — <span style="color:#9a97a0">${ech(et.detail)}</span>` : ""}</li>`).join("");
          gestes = minLis + `<li style="color:#ffd9a8">💡 ${ech(meta.conseilSoir)}</li>`;
        } else {
          const fins = Array.isArray(r.etapes) ? r.etapes.filter(et => lcClasserEtape(et) === "finition") : [];
          gestes = fins.length
            ? fins.map(et => `<li>${ech(et.titre)}${et.detail ? ` — <span style="color:#9a97a0">${ech(et.detail)}</span>` : ""}</li>`).join("")
            : `<li>Réchauffe et sers.</li>`;
        }
        return `<div style="margin-top:7px">
          <div style="font-size:13px;color:#fff;font-weight:500">${emo} ${ech(nomDe(p.cle))} <span style="color:#88858f;font-weight:400;font-size:11px">· ${crLbl}${rechTxt}${sauceTag}</span></div>
          <ul style="margin:4px 0 0;padding-left:18px;font-size:12px;color:#b3b0b8;line-height:1.5">${gestes}</ul>
        </div>`;
      }).join("");
      return `<div style="background:#1a1620;border:1px solid rgba(255,255,255,.07);border-left:3px solid #7a5cff;border-radius:11px;padding:10px 12px">
          <div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:2px">${LC_JOURS[idx]}</div>
          ${rappel}${plats}
        </div>`;
    }).join("");
    if (cards) soirHTML = `<details class="lc-acc" style="margin:4px 0 16px">
        <summary>
          <span style="flex:none;width:24px;height:24px;border-radius:50%;background:#7a5cff;color:#fff;font-size:13px;display:flex;align-items:center;justify-content:center">🍽️</span>
          <span style="font-size:15px;font-weight:500;color:#fff">Chaque soir</span>
          <span class="lc-acc-count">${joursPresents.length} j</span>
          <span class="lc-acc-chev">▸</span>
        </summary>
        <div style="margin-top:8px">
          <div style="font-size:12px;color:#9a97a0;margin:0 0 9px 33px">Le gros est déjà fait : chaque jour, il ne reste qu'à réchauffer et finir. 😊${LC_AFFICHER_RECHAUFFE ? " <span style=\"color:#6e6b75\">Temps de réchauffage indicatifs ⏱</span>" : ""}</div>
          <div style="display:flex;flex-direction:column;gap:7px;margin-left:33px">${cards}</div>
        </div>
      </details>`;
  }

  zone.innerHTML = `${styleBloc}
    <h3>📋 Ton plan de prep</h3>
    <p class="plan-subtitle" style="margin-top:-4px">Les étapes de tes ${liste.length} recette${liste.length > 1 ? "s" : ""} regroupées par phase — fais chaque phase d'un coup. ⏱ ≈ ${lcFmtDuree(actifMin)} de travail actif <span style="color:#88858f">(les cuissons tournent en parallèle).</span> <span style="color:#88858f">Coche les étapes au fur et à mesure ✓</span></p>
    ${selecteurHTML}
    ${phasesHTML}
    ${conservationBloc}
    ${soirHTML}`;
}

// Coche / décoche une étape du plan de prep (persiste comme la liste de courses)
function lcTogglePrep(cb) {
  if (!window.userProfile) return;
  if (!window.userProfile.planPrepCoches) window.userProfile.planPrepCoches = [];
  const k = cb.dataset.k || "";
  const step = cb.closest(".prep-step");
  if (cb.checked) {
    if (!window.userProfile.planPrepCoches.includes(k)) window.userProfile.planPrepCoches.push(k);
  } else {
    window.userProfile.planPrepCoches = window.userProfile.planPrepCoches.filter(x => x !== k);
  }
  if (step) step.classList.toggle("prep-done", cb.checked);
  if (typeof lcSauvegarder === "function") lcSauvegarder();
}

// Change le jour de prep et recalcule la conservation datée
function lcSetJourPrep(j) {
  window._lcJourPrep = j;
  if (typeof lcGenererPlanPrep === "function") lcGenererPlanPrep();
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
  
  // Option 1 : pas de dropdown — la grille filtrée ci-dessous montre directement les cartes
  cacherSuggestions();
  
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
  
  // Afficher la barre de chips Recettes et masquer celle des Favoris
  const chips = document.getElementById("filtres-chips");
  if (chips) chips.style.display = "block";
  const chipsFav = document.getElementById("filtres-favoris-chips");
  if (chipsFav) chipsFav.style.display = "none";
  
  // Réinitialiser les chips : "Tout" actif sur les lignes Catégorie + Pays uniquement
  document.querySelectorAll("#filtres-chips .chip").forEach(c => c.classList.remove("active"));
  document.querySelectorAll("#filtres-chips .chips-row").forEach(row => {
    if (row.querySelector("#chip-tri-note")) return; // ne pas réactiver la ligne de tri
    const premiereChip = row.querySelector(".chip");
    if (premiereChip) premiereChip.classList.add("active");
  });
  // "Mieux notées" : remis à zéro (état OFF + ordre d'origine restauré)
  if (typeof reinitTriNote === "function") reinitTriNote();
  
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
  if (typeof appliquerBadgeNotesCartes === "function") appliquerBadgeNotesCartes();
  if (typeof appliquerBadgeEtoilesCartes === "function") appliquerBadgeEtoilesCartes();
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
  document.getElementById("chip-fav-mesrecettes")?.classList.remove("active");
  document.getElementById("msg-no-mesrecettes")?.remove();
  // Tri "Mieux notées" : remis à zéro et visible (vue Recettes favorites par défaut)
  if (typeof reinitTriNote === "function") reinitTriNote();
  const triRow = document.getElementById("favoris-tri-row");
  if (triRow) triRow.style.display = "";
  
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
  document.getElementById("favoris-tri-row")?.style.removeProperty("display");
  document.getElementById('msg-no-mesrecettes')?.remove();
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
  document.getElementById("favoris-tri-row")?.style.setProperty("display", "none");
  document.getElementById('msg-no-mesrecettes')?.remove();
}

// === Chip "📝 Mes recettes" dans le mode Favoris ===
function chipFavorisMesRecettes(btn) {
  if (btn) {
    btn.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
  }
  if (typeof filtrerMesRecettes === "function") filtrerMesRecettes();
  const chipsFav = document.getElementById("filtres-favoris-chips");
  if (chipsFav) chipsFav.style.display = "block";
  document.getElementById("favoris-tri-row")?.style.removeProperty("display");
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

