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

