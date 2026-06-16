// ============================================================
// recettes.js — CONTENEUR des recettes.
// Les 550+ recettes sont réparties par catégorie dans les fichiers
// recettes_<categorie>.js (plats, desserts, soupes, brunch, encas,
// aperitifs, healthy, entrees, sauces, boulangerie, salades, pizzas),
// + recettes_cocktails.js et recettes_mocktails.js.
// Chacun fait  Object.assign(recettes, { ... }).
// 👉 Pour AJOUTER une recette : ouvre le fichier de SA catégorie.
// ============================================================
var recettes = {}; // var (et non const) : évite la TDZ quand les scripts sont bundlés en un seul fichier (le code d'init qui fait `typeof recettes` doit obtenir 'undefined', pas une exception)
