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
    "brioche"           // 🍞 1 brioche (sélecteur spécial dédié)
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
