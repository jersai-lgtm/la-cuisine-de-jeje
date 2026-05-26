const ALLERGENES_MOTS = {
  "végétarien":     ["bœuf","boeuf","veau","porc","poulet","agneau","canard","dinde","pintade","volaille","foie","rillettes","andouille","boudin","chipolata","pepperoni","coppa","bresaola","magret","confit","ribs","speck","ventreche","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","guanciale","prosciutto","salami","nduja","jarret","pork","bacon","pancetta","saumon","thon","crevette","crevettes","anchois","poisson","cabillaud","dorade","truite","hareng","sardine","lieu","merlan","bar","sole","turbot","langoustine","homard","crabe","moule","huitre","seiche","calmar","poulpe","surimi","viande","pulled","morcilla","lonza"],
  "pesco-végétarien": ["bœuf","boeuf","veau","porc","poulet","agneau","canard","dinde","pintade","volaille","foie","rillettes","andouille","boudin","pepperoni","coppa","bresaola","magret","confit","ribs","speck","ventreche","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","guanciale","prosciutto","salami","nduja","pork","bacon","pancetta","viande","pulled"],
  "vegan":          ["lait","fromage","beurre","crème","creme","œuf","oeuf","oeufs","miel","mozzarella","parmesan","mascarpone","yaourt","ricotta","gruyère","gruyere","cheddar","feta","brie","camembert","roquefort","emmental","gouda","comté","reblochon","pecorino","manchego","halloumi","burrata","chantilly","crémeux","lacté","bœuf","boeuf","veau","porc","poulet","agneau","canard","dinde","pintade","volaille","foie","jambon","lardons","lardon","lard","chorizo","saucisse","merguez","bacon","pancetta","prosciutto","guanciale","salami","viande","saumon","thon","crevette","crevettes","anchois","poisson","cabillaud","dorade","truite","moule","homard","crabe"],
  "sans-gluten":    ["farine","blé","ble","semoule","couscous","boulgour","épeautre","epeautre","seigle","orge","triticale","kamut","chapelure","panko","pâtes","pates","spaghetti","tagliatelle","lasagne","macaroni","penne","pain","baguette","brioche","biscuit","cracker","viennoiserie","pizza","quiche","flan","gaufre","crêpe","crepe","pancake","muffin","financier","clafoutis","tiramisu","cheesecake","millefeuille","naan","pita","tortilla","wrap","croissant"],
  "sans-lactose":   ["lait","fromage","beurre","crème","creme","mozzarella","parmesan","mascarpone","yaourt","ricotta","gruyère","gruyere","cheddar","feta","brie","camembert","roquefort","emmental","gouda","comté","reblochon","pecorino","manchego","halloumi","burrata","chantilly","lacté","lactose"],
  "protéiné":       ["sucre","caramel","chocolat","confiture","sirop","biscuit","tiramisu","churros","millefeuille","cheesecake","clafoutis","crumble","madeleine","muffin","financier","bananabread","croissant","cookie","brownie","crème brûlée","île flottante","mousse au chocolat","pannacotta","sorbet","verrine","smoothie","granola","açaï","limonade"],
  "moins-viande":   ["bœuf","boeuf","veau","porc","agneau","canard","dinde","pintade","lardons","lardon","lard","chorizo","saucisse","merguez","guanciale","prosciutto","salami","nduja","pork","bacon","pancetta","viande","rillettes","andouille","boudin","foie"],
  "healthy":        ["friture","chips","nugget","sucre","caramel","chocolat","confiture","biscuit","tiramisu","churros","millefeuille","cheesecake","clafoutis","madeleine","muffin","financier","bananabread","cookie","crumble","crème brûlée","mousse au chocolat","tarte tatin","croissant","brioche"],
  "économique":     [],
  "rapide":         []
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
