const ALLERGENES_MOTS = {
  "arachides":      ["arachide","cacahuète","cacahuete","peanut"],
  "fruits-à-coque": ["noix","amande","noisette","cajou","pistache","pécan","macadamia","noix de coco"],
  "lait":           ["lait","fromage","beurre","crème","yaourt","mascarpone","mozzarella","parmesan","gruyère","cheddar","ricotta","feta","gorgonzola","pecorino","camembert","béchamel"],
  "œufs":           ["œuf","oeuf","oeufs"],
  "gluten":         ["farine","blé","orge","seigle","avoine","semoule","pâte","pain","biscuit","gaufre","crêpe","pizza","lasagne","spätzle","couscous"],
  "poisson":        ["poisson","saumon","thon","dorade","anchois","cabillaud","truite","hareng","crevette","fruits de mer","tartare"],
  "crustacés":      ["crevette","crevettes","homard","langouste","crabe","écrevisse","langoustine","fruits de mer"],
  "soja":           ["soja","tofu","edamame","miso"],
  "céleri":         ["céleri","celeri"],
  "moutarde":       ["moutarde"],
  "sésame":         ["sésame","sesame","tahini"],
  "sulfites":       ["vin","vinaigre","champagne","prosecco","riesling"],
  "végétarien":     ["bœuf","boeuf","veau","porc","poulet","agneau","canard","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","guanciale","prosciutto","viande","salami","nduja","jarret","pork","bacon","pancetta","volaille","dinde","pintade","foie","rillettes","andouille","boudin","chipolata","pepperoni","coppa","bresaola","magret","confit","pulled","ribs","speck","ventreche","saumon","thon","crevette","crevettes","anchois","poisson","cabillaud","dorade","truite","hareng","sardine","lieu","merlan","bar","sole","turbot","langoustine","homard","crabe","moule","huitre","seiche","calmar","poulpe","fruits de mer","surimi"],
  "pesco-végétarien": ["bœuf","boeuf","veau","porc","poulet","agneau","canard","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","guanciale","prosciutto","viande","salami","nduja","pork","bacon","pancetta","volaille","dinde","pintade","foie","andouille","boudin","pepperoni","coppa","bresaola","magret","confit","pulled","ribs"],
  "vegan": ["lait","fromage","beurre","crème","creme","œuf","oeuf","oeufs","miel","mozzarella","parmesan","mascarpone","yaourt","ricotta","gruyère","gruyere","cheddar","feta","brie","camembert","roquefort","emmental","gouda","comté","reblochon","pecorino","manchego","halloumi","burrata","bœuf","boeuf","veau","porc","poulet","agneau","canard","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","saumon","thon","crevette","crevettes","anchois","viande","bacon","pancetta","prosciutto","guanciale","salami","volaille","dinde","foie","rillettes","andouille","boudin","pepperoni","crème fraîche","crème fraiche","chantilly","crémeux","lacté"],
  "sans-gluten":    ["farine","blé","semoule","pâte","pain","biscuit","gaufre","crêpe","lasagne","spätzle","couscous"],
  "sans-lactose": ["lait","fromage","beurre","crème","creme","mozzarella","parmesan","mascarpone","yaourt","ricotta","gruyère","gruyere","cheddar","feta","brie","camembert","roquefort","emmental","gouda","comté","reblochon","pecorino","manchego","halloumi","burrata","crème fraîche","chantilly","lacté","lactose","laitier"],
  "protéiné":       [],
  "moins-viande":   ["bœuf","veau","porc","poulet","agneau","canard","jambon","lardons","chorizo","saucisse","merguez"],
};

function appliquerPreferencesVisuelles() {
  const prefs = window.userProfile?.preferences;
  if (!prefs) {
    // Pas connecté : enlever tous les badges
    document.querySelectorAll('.carte').forEach(c => {
      c.classList.remove('carte-grisee');
      const badge = c.querySelector('.carte-badge-allergie');
      if (badge) badge.remove();
    });
    return;
  }

  const allergies     = prefs.allergies        || [];
  const allergiesCustom = prefs.allergiesCustom  || [];
  const regimes       = prefs.regimes          || [];
  const objectifs     = prefs.objectifs        || [];

  // Construire la liste de tous les mots à exclure
  const motsExclus = new Set();
  [...allergies, ...regimes].forEach(pref => {
    (ALLERGENES_MOTS[pref] || []).forEach(m => motsExclus.add(m.toLowerCase()));
  });
  allergiesCustom.forEach(m => motsExclus.add(m.toLowerCase()));

  if (motsExclus.size === 0) {
    // Rien à exclure - enlever badges
    document.querySelectorAll('.carte').forEach(c => {
      c.classList.remove('carte-grisee');
      const badge = c.querySelector('.carte-badge-allergie');
      if (badge) badge.remove();
    });
    return;
  }

  document.querySelectorAll('.carte').forEach(carte => {
    const onclick = carte.getAttribute('onclick') || '';
    const match   = onclick.match(/ouvrirFiche\('([^']+)'/);
    const key     = match ? match[1] : null;
    if (!key) return;

    const recette = typeof recettes !== 'undefined' ? recettes[key] : null;
    let texte = [
      key,
      recette?.description || '',
      carte.querySelector('h2')?.textContent || '',
    ].join(' ').toLowerCase();
    // Ajouter les noms des ingrédients depuis les tableaux (clés)
    Object.keys(recette || {}).forEach(k => {
      if (k.startsWith('tableau') && Array.isArray(recette[k]) && recette[k].length > 0) {
        texte += ' ' + Object.keys(recette[k][0]).join(' ').toLowerCase();
      }
    });

    // Trouver les mots problématiques
    const trouvés = [...motsExclus].filter(mot => texte.includes(mot));

    // Supprimer l'ancien badge
    const oldBadge = carte.querySelector('.carte-badge-allergie');
    if (oldBadge) oldBadge.remove();

    if (trouvés.length > 0) {
      carte.classList.add('carte-grisee');
      // Badge avec le premier allergène trouvé
      const badge = document.createElement('div');
      badge.className = 'carte-badge-allergie';
      const regime = [...regimes].find(r => (ALLERGENES_MOTS[r] || []).some(m => trouvés.includes(m)));
      const allergie = [...allergies, ...allergiesCustom].find(a => 
        trouvés.some(t => t.includes(a.toLowerCase()) || a.toLowerCase().includes(t))
      );
      if (regime) {
        const labels = { 'végétarien':'🥦 Végétarien', 'vegan':'🌱 Vegan', 'sans-gluten':'🌾 Sans gluten', 'sans-lactose':'🥛 Sans lactose', 'pesco-végétarien':'🐟 Pesco-végé', 'moins-viande':'🌱 Moins viande' };
        badge.textContent = labels[regime] || regime;
      } else if (allergie) {
        badge.textContent = '⚠️ ' + allergie;
      } else {
        badge.textContent = '⚠️ Exclut';
      }
      carte.appendChild(badge);
    } else {
      carte.classList.remove('carte-grisee');
    }
  });
}

// Appeler quand le profil change
window.addEventListener('profilMisAJour', appliquerPreferencesVisuelles);

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
