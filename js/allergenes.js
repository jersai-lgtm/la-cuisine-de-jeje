const ALLERGENES_MOTS = {
  "végétarien":     ["bœuf","boeuf","veau","porc","poulet","agneau","canard","dinde","pintade","volaille","foie","rillettes","andouille","boudin","chipolata","pepperoni","coppa","bresaola","magret","confit","ribs","speck","ventreche","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","guanciale","prosciutto","salami","nduja","jarret","pork","bacon","pancetta","saumon","thon","crevette","crevettes","anchois","poisson","cabillaud","dorade","truite","hareng","sardine","lieu","merlan","bar","sole","turbot","langoustine","homard","crabe","moule","huitre","seiche","calmar","calamar","calamars","poulpe","calamarsromaine","surimi","viande","pulled","morcilla","lonza"],
  "pesco-végétarien": ["bœuf","boeuf","veau","porc","poulet","agneau","canard","dinde","pintade","volaille","foie","rillettes","andouille","boudin","pepperoni","coppa","bresaola","magret","confit","ribs","speck","ventreche","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","guanciale","prosciutto","salami","nduja","pork","bacon","pancetta","viande","pulled"],
  "vegan":          ["lait","fromage","beurre","crème","creme","œuf","oeuf","oeufs","miel","mozzarella","parmesan","mascarpone","yaourt","ricotta","gruyère","gruyere","cheddar","feta","brie","camembert","roquefort","emmental","gouda","comté","reblochon","pecorino","manchego","halloumi","burrata","chantilly","crémeux","lacté","bœuf","boeuf","veau","porc","poulet","agneau","canard","dinde","pintade","volaille","foie","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","bacon","pancetta","prosciutto","guanciale","salami","viande","saumon","thon","crevette","crevettes","anchois","poisson","cabillaud","dorade","truite","moule","homard","crabe","calmar","calamar","calamars","poulpe","seiche","huitre","huître","langoustine","gambas","langouste"],
  "sans-gluten":    ["farine","blé","ble","semoule","couscous","boulgour","épeautre","epeautre","seigle","orge","triticale","kamut","chapelure","panko","pâtes","pates","spaghetti","tagliatelle","lasagne","macaroni","penne","pain","baguette","brioche","biscuit","cracker","viennoiserie","pizza","quiche","flan","gaufre","crêpe","crepe","pancake","muffin","financier","clafoutis","tiramisu","cheesecake","millefeuille","naan","pita","tortilla","wrap","croissant"],
  "sans-lactose":   ["lait","fromage","beurre","crème","creme","mozzarella","parmesan","mascarpone","yaourt","ricotta","gruyère","gruyere","cheddar","feta","brie","camembert","roquefort","emmental","gouda","comté","reblochon","pecorino","manchego","halloumi","burrata","chantilly","lacté","lactose"],
  "protéiné":       ["sucre","caramel","chocolat","confiture","sirop","biscuit","tiramisu","churros","millefeuille","cheesecake","clafoutis","crumble","madeleine","muffin","financier","bananabread","croissant","cookie","brownie","crème brûlée","île flottante","mousse au chocolat","pannacotta","sorbet","verrine","smoothie","granola","açaï","limonade"],
  "moins-viande":   ["bœuf","boeuf","veau","porc","agneau","canard","dinde","pintade","lardons","lardon","lard","chorizo","saucisse","merguez","guanciale","prosciutto","salami","nduja","pork","bacon","pancetta","viande","rillettes","andouille","boudin","foie"],
  "healthy":        ["friture","chips","nugget","sucre","caramel","chocolat","confiture","biscuit","tiramisu","churros","millefeuille","cheesecake","clafoutis","madeleine","muffin","financier","bananabread","cookie","crumble","crème brûlée","mousse au chocolat","tarte tatin","croissant","brioche"],
  "économique":     [],
  "rapide":         [],

  // ==============================
  // ALLERGÈNES MAJEURS (cochables dans le profil)
  // Les clés correspondent EXACTEMENT aux value="" des cases à cocher.
  // ==============================
  "arachides":      ["arachide","cacahuète","cacahuete","cacahouète","beurre de cacahuète","peanut"],
  "fruits-à-coque": ["noix","noisette","amande","pistache","cajou","noix de cajou","pécan","pecan","macadamia","praline","pralin","nutella","frangipane","massepain","beurre de noix","gianduja","noix de grenoble"],
  "lait":           ["lait","fromage","beurre","crème","creme","mozzarella","parmesan","mascarpone","yaourt","ricotta","gruyère","gruyere","cheddar","feta","brie","camembert","roquefort","emmental","gouda","comté","comte","reblochon","pecorino","manchego","halloumi","burrata","chantilly","crémeux","cremeux","lacté","lactose","gorgonzola","raclette","fromage blanc","ghee","fromage frais","petit-suisse","chèvre","chevre","cancoillotte","vacherin"],
  "œufs":           ["œuf","oeuf","oeufs","œufs","jaune d'œuf","jaune d'oeuf","blanc d'œuf","blanc d'oeuf","jaune d","blanc d","meringue","mayonnaise","aïoli","aioli","sabayon","omelette","frittata","brouillé"],
  "gluten":         ["farine","blé","ble","semoule","couscous","boulgour","épeautre","epeautre","seigle","orge","triticale","kamut","chapelure","panko","pâtes","pates","spaghetti","tagliatelle","lasagne","macaroni","penne","pain","baguette","brioche","biscuit","cracker","viennoiserie","pizza","quiche","flan","gaufre","crêpe","crepe","pancake","muffin","financier","clafoutis","tiramisu","cheesecake","millefeuille","naan","pita","tortilla","wrap","croissant","nouille","ramen","udon","soba","gyoza","raviole","raviol","gnocchi","gnocchis","spaetzle","spätzle","panure","panée","panee","pané","bière","biere","pâte feuilletée","pâte brisée","pâte sablée","dumpling","pierogi","momos","samosa","dosa","scone","strudel","fond de tarte"],
  "poisson":        ["saumon","thon","cabillaud","dorade","truite","colin","lieu","merlan","bar","sole","turbot","flétan","fletan","lotte","raie","maquereau","sardine","anchois","hareng","morue","poisson","filet de poisson","églefin","eglefin","haddock","espadon","rouget","daurade","brandade","tarama","surimi","ceebu","thiéboudienne","moqueca","bouillabaisse","gravlax","tartare de saumon","tartare de thon"],
  "crustacés":      ["crevette","crevettes","gambas","homard","langoustine","langoustines","crabe","écrevisse","ecrevisse","langouste","scampi","tourteau","crustacé","crustace","king prawn","gamberi"],
  "soja":           ["soja","tofu","edamame","miso","tamari","tempeh","sauce soja","sauce teriyaki","teriyaki","nuoc-mâm","lait de soja","yuba","natto"],
  "céleri":         ["céleri","celeri","céleri-rave","branche de céleri"],
  "moutarde":       ["moutarde","graines de moutarde","moutarde de dijon"],
  "sésame":         ["sésame","sesame","tahini","tahin","huile de sésame","gomasio","graines de sésame","houmous","hummus"],
  "sulfites":       ["vin","vinaigre","sulfite","abricot sec","raisin sec","sangria","fruits secs"]
};

// ==============================
// ALLERGÈNES MAJEURS (pour l'indicateur GÉNÉRAL affiché sur chaque carte)
// ==============================
const ALLERGENES_MAJEURS = {
  "gluten": "Gluten", "lait": "Lait", "œufs": "Œuf", "arachides": "Arachides",
  "fruits-à-coque": "Fruits à coque", "poisson": "Poisson", "crustacés": "Crustacés",
  "soja": "Soja", "céleri": "Céleri", "moutarde": "Moutarde", "sésame": "Sésame", "sulfites": "Sulfites"
};

function detecterAllergenesRecette(texte) {
  const presents = [];
  for (const cle in ALLERGENES_MAJEURS) {
    const mots = ALLERGENES_MOTS[cle] || [];
    if (mots.some(m => texte.includes(m.toLowerCase()))) presents.push(cle);
  }
  return presents;
}

function appliquerPreferencesVisuelles() {
  const prefs = window.userProfile?.preferences || null;

  // Mots à griser (régimes + allergies) et allergies PERSO (label -> mots) pour l'alerte rouge
  const motsExclus = new Set();
  const allergiesPerso = new Map(); // label affiché -> [mots à repérer]
  if (prefs) {
    const allergies = prefs.allergies || [];
    const regimes = prefs.regimes || [];
    const allergiesCustom = prefs.allergiesCustom || [];
    [...allergies, ...regimes].forEach(p => (ALLERGENES_MOTS[p] || []).forEach(m => motsExclus.add(m.toLowerCase())));
    allergiesCustom.forEach(m => motsExclus.add(m.toLowerCase()));
    // Allergies majeures cochées
    allergies.forEach(a => {
      const label = ALLERGENES_MAJEURS[a] || a;
      allergiesPerso.set(label, (ALLERGENES_MOTS[a] || [a]).map(m => m.toLowerCase()));
    });
    // Régimes sans-gluten / sans-lactose = allergie de fait
    if (regimes.includes('sans-gluten')) allergiesPerso.set('Gluten', (ALLERGENES_MOTS['gluten'] || []).map(m => m.toLowerCase()));
    if (regimes.includes('sans-lactose')) allergiesPerso.set('Lait', (ALLERGENES_MOTS['lait'] || []).map(m => m.toLowerCase()));
    // Allergies personnalisées (ex. "Ananas")
    allergiesCustom.forEach(c => allergiesPerso.set(c.charAt(0).toUpperCase() + c.slice(1), [c.toLowerCase()]));
  }

  document.querySelectorAll('.carte').forEach(carte => {
    const onclick = carte.getAttribute('onclick') || '';
    const match = onclick.match(/ouvrirFiche\('([^']+)'/);
    const key = match ? match[1] : null;
    if (!key) return;
    const recette = (typeof recettes !== 'undefined') ? recettes[key] : null;

    // Texte complet de la recette (lecture des tableaux + neutralisation coco)
    let texte;
    if (typeof texteRecette === 'function') {
      texte = (texteRecette(key) + ' ' + (carte.querySelector('h2')?.textContent || '')).toLowerCase();
    } else {
      texte = [key, recette?.description || '', carte.querySelector('h2')?.textContent || ''].join(' ').toLowerCase();
      Object.keys(recette || {}).forEach(k => {
        if (k.startsWith('tableau') && Array.isArray(recette[k]) && recette[k][0]) texte += ' ' + Object.keys(recette[k][0]).join(' ').toLowerCase();
      });
    }

    const info = carte.querySelector('.carte-info') || carte;

    // Nettoyage de TOUS les anciens éléments (y compris l'ancienne zone "Contient" générale)
    carte.querySelector('.carte-indicateurs')?.remove();
    carte.querySelector('.carte-allergie-perso')?.remove();
    carte.querySelector('.carte-etiquette-famille')?.remove();
    carte.querySelector('.carte-badge-famille')?.remove();
    carte.querySelector('.carte-badge-allergie')?.remove();
    carte.classList.remove('carte-alerte-bebe', 'carte-alerte-enfant');

    // 1) ALLERGÈNES — UNIQUEMENT ceux de l'utilisateur, en rouge
    const touches = [];
    allergiesPerso.forEach((mots, label) => {
      if (mots.some(m => m && texte.includes(m))) touches.push(label);
    });
    if (touches.length) {
      const ligne = document.createElement('div');
      ligne.className = 'carte-allergie-perso';
      ligne.textContent = '⚠️ Allergie — Contient : ' + touches.join(', ');
      info.appendChild(ligne);
    }

    // 2) FAMILLE — cadre rouge (bébé) / orange (enfant) + étiquette avec la raison (comme avant)
    if (typeof getNiveauFamille === 'function') {
      const niv = getNiveauFamille(key);
      if (niv) {
        carte.classList.add(niv.niveau === 'bebe' ? 'carte-alerte-bebe' : 'carte-alerte-enfant');
        const etiqText = (typeof getEtiquetteFamille === 'function') ? getEtiquetteFamille(key) : (niv.raison || '');
        if (etiqText) {
          const etiq = document.createElement('div');
          etiq.className = 'carte-etiquette-famille carte-etiquette-' + niv.niveau;
          etiq.textContent = etiqText;
          carte.appendChild(etiq);
        }
      }
    }

    // 3) Grisage des recettes exclues (régime/allergie) pour l'utilisateur connecté
    carte.classList.remove('carte-grisee');
    if (motsExclus.size && [...motsExclus].some(mot => texte.includes(mot))) {
      carte.classList.add('carte-grisee');
    }

    // 4) Badge niveau (recette au-dessus du niveau de l'utilisateur)
    carte.querySelector('.carte-badge-niveau')?.remove();
    carte.classList.remove('carte-alerte-niveau');
    if (prefs && typeof niveauTropEleve === 'function') {
      const trop = niveauTropEleve(key);
      if (trop) {
        const badgeNiv = document.createElement('span');
        badgeNiv.className = 'carte-badge-niveau';
        badgeNiv.title = `${trop.raison} — au-dessus de votre niveau (${trop.niveauUser})`;
        badgeNiv.textContent = trop.niveauRecette === 'eleve' ? '⭐⭐⭐' : '⭐⭐';
        carte.appendChild(badgeNiv);
        carte.classList.add('carte-alerte-niveau');
      }
    }
  });
}

// Appeler quand le profil change
window.addEventListener('profilMisAJour', appliquerPreferencesVisuelles);
// Appliquer aussi au chargement (indicateurs généraux visibles sans connexion)
if (document.readyState !== 'loading') { appliquerPreferencesVisuelles(); }
else { document.addEventListener('DOMContentLoaded', appliquerPreferencesVisuelles); }

// ==============================
// FAVORIS
// ==============================

// ==============================
// HISTORIQUE RECETTES VUES
// ==============================
window._recentsVus = JSON.parse(localStorage.getItem("recentsVus") || "[]");

function ajouterRecent(key) {
  window._recentsVus = [key, ...window._recentsVus.filter(k => k !== key)].slice(0, 20);
  try { localStorage.setItem("recentsVus", JSON.stringify(window._recentsVus)); } catch(e) {}
  // Mettre à jour l'accueil si visible
  if (document.getElementById("section-accueil")?.style.display !== "none") {
    chargerAccueilRecents();
  }
}
