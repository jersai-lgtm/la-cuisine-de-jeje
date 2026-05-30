// =============================================================================
// 📦 MODULE : GARDE_MANGER
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

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

