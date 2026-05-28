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
    // Utiliser le helper centralisé (lecture complète des tableaux + neutralisation
    // coco/beurre noisette) si dispo, sinon fallback simple.
    let texte;
    if (typeof texteRecette === 'function') {
      texte = texteRecette(key) + ' ' + (carte.querySelector('h2')?.textContent || '').toLowerCase();
    } else {
      texte = [
        key,
        recette?.description || '',
        carte.querySelector('h2')?.textContent || '',
      ].join(' ').toLowerCase();
      Object.keys(recette || {}).forEach(k => {
        if (k.startsWith('tableau') && Array.isArray(recette[k]) && recette[k].length > 0) {
          texte += ' ' + Object.keys(recette[k][0]).join(' ').toLowerCase();
        }
      });
    }

    // Trouver les mots problématiques
    const trouvés = [...motsExclus].filter(mot => texte.includes(mot));

    // Supprimer l'ancien badge
    const oldBadge = carte.querySelector('.carte-badge-allergie');
    if (oldBadge) oldBadge.remove();

    if (trouvés.length > 0) {
      carte.classList.add('carte-grisee');
      // Badge avec le premier élément trouvé
      // PRIORITÉ : allergie (critique santé) > régime (choix alimentaire)
      const badge = document.createElement('div');
      badge.className = 'carte-badge-allergie';
      const allergie = [...allergies, ...allergiesCustom].find(a => 
        trouvés.some(t => t.includes(a.toLowerCase()) || a.toLowerCase().includes(t))
      );
      const regime = [...regimes].find(r => (ALLERGENES_MOTS[r] || []).some(m => trouvés.includes(m)));
      if (allergie) {
        badge.textContent = '⚠️ ' + allergie;
      } else if (regime) {
        const labels = { 'végétarien':'🥦 Végétarien', 'vegan':'🌱 Vegan', 'sans-gluten':'🌾 Sans gluten', 'sans-lactose':'🥛 Sans lactose', 'pesco-végétarien':'🐟 Pesco-végé', 'moins-viande':'🌱 Moins viande' };
        badge.textContent = labels[regime] || regime;
      } else {
        badge.textContent = '⚠️ Exclut';
      }
      carte.appendChild(badge);
    } else {
      carte.classList.remove('carte-grisee');
    }

    // Badge famille — bordure rouge (bébé) ou orange (enfant) + badge clair + étiquette explicite
    const existingFam = carte.querySelector('.carte-badge-famille');
    if (existingFam) existingFam.remove();
    const existingEtiq = carte.querySelector('.carte-etiquette-famille');
    if (existingEtiq) existingEtiq.remove();
    carte.classList.remove('carte-alerte-bebe', 'carte-alerte-enfant');

    if (typeof getNiveauFamille === 'function') {
      const cle = carte.getAttribute('onclick')?.match(/'(\w+)'/)?.[1];
      if (cle) {
        const niv = getNiveauFamille(cle);
        if (niv) {
          // 1) Badge emoji en haut à gauche (signal compact)
          const badgeFam = document.createElement('div');
          badgeFam.className = 'carte-badge-famille';
          const detailBebe = niv.niveau === 'bebe' ? ' — déconseillé bébé < 1 an' : ' — déconseillé enfant';
          badgeFam.title = (niv.raison || niv.mot || '') + detailBebe;
          badgeFam.textContent = niv.niveau === 'bebe' ? '🍼' : '🧒';
          carte.appendChild(badgeFam);

          // 2) Étiquette explicite sur l'image (style pastille blanche, texte coloré)
          const etiquetteText = typeof getEtiquetteFamille === 'function' ? getEtiquetteFamille(cle) : null;
          if (etiquetteText) {
            const etiq = document.createElement('div');
            etiq.className = 'carte-etiquette-famille carte-etiquette-' + niv.niveau;
            etiq.textContent = etiquetteText;
            carte.appendChild(etiq);
          }

          // 3) Bordure d'alerte rouge (bébé) ou orange (enfant)
          carte.classList.add(niv.niveau === 'bebe' ? 'carte-alerte-bebe' : 'carte-alerte-enfant');
        }
      }
    }

    // Badge niveau (si recette au-dessus du niveau utilisateur)
    const existingNiv = carte.querySelector('.carte-badge-niveau');
    if (existingNiv) existingNiv.remove();
    carte.classList.remove('carte-alerte-niveau');

    if (typeof niveauTropEleve === 'function') {
      const cle = carte.getAttribute('onclick')?.match(/'(\w+)'/)?.[1];
      if (cle) {
        const trop = niveauTropEleve(cle);
        if (trop) {
          const badgeNiv = document.createElement('span');
          badgeNiv.className = 'carte-badge-niveau';
          badgeNiv.title = `${trop.raison} — au-dessus de votre niveau (${trop.niveauUser})`;
          badgeNiv.textContent = trop.niveauRecette === 'eleve' ? '⭐⭐⭐' : '⭐⭐';
          carte.appendChild(badgeNiv);
          carte.classList.add('carte-alerte-niveau');
        }
      }
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
