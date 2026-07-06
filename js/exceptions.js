// =============================================================================
// ⚙️ EXCEPTIONS DE COMPORTEMENT — La Cuisine de Jéjé
// =============================================================================
// Ce fichier contient les listes d'exceptions pour le comportement
// de l'app par défaut (ouverture des fiches, init des cartes, etc.).
//
// Pour ajouter une exception, il suffit d'ajouter le nom de la recette
// dans la liste correspondante. Pas besoin de toucher au code.
// =============================================================================

window.EXCEPTIONS = {
  // -------------------------------------------------------------------------
  // 📦 Recettes "à l'unité" → restent à leur valeur initiale (ne suivent pas
  //                          le foyer). Limite max basse (5 max).
  // -------------------------------------------------------------------------
  unites: [
    "brioche",          // 🍞 1 brioche (sélecteur spécial dédié)
    // 🥖 Pains et pâtes de base (1 pièce par défaut, ne suivent pas le foyer)
    "painbaguette", "patefeuilletee", "patebrisee", "patesablee",
    // 🧀 Fromages maison (1 boule / 1 pièce)
    "mozzarellamaison", "fromagefraismaison",
    // 🫙 Les sauces sont désormais dosées PAR PERSONNE (nb = convives, 1→15) et
    //    suivent le foyer comme un plat normal → elles ne sont plus "à l'unité".
    // 🍨 Les glaces / sorbets « en bac » sont désormais dosés PAR BOULE (1→15) et
    //    suivent le foyer → ils ne sont plus "à l'unité" (cap 5 retiré).
    // 🥣 Dips apéritif en bol / pot
    "houmous", "babaganoush", "guacamole", "tzatziki", "muhammara", "dipfetapoivron",
    "obatzda", "tapenade", "rillettessaumonfume", "rillettesthon"
  ],

  // -------------------------------------------------------------------------
  // 🍸 Catégories qui ont un comportement spécial pour le calcul du foyer
  // -------------------------------------------------------------------------
  // NB : ces catégories sont détectées via `recette.cat` dans recettes.js
  //   - "cocktails" → adultes uniquement
  //   - "mocktails" → foyer sauf bébés
  //
  // Pour ajouter une catégorie avec règle spéciale, voir app.js → 
  // fonction `calculerPersonnesPourRecette(recette, foyer)`.

  // -------------------------------------------------------------------------
  // 🔧 Helpers
  // -------------------------------------------------------------------------
  
  /** Renvoie true si la recette est "à l'unité" (ne suit pas le foyer) */
  estUnite: function(nomRecette) {
    return this.unites.includes(nomRecette);
  }
};

// Raccourcis globaux pour compat avec ancien code
window.EXCEPTIONS_UNITES = window.EXCEPTIONS.unites;
