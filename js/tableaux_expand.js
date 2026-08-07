// =============================================================================
// 📦 MODULE : TABLEAUX_EXPAND (v263) — décompression des tableaux d'ingrédients
// =============================================================================
// POURQUOI. Chaque recette embarque un tableau de 15 lignes (1 à 15 convives)
// où les mêmes clés d'ingrédient sont répétées quinze fois avec la quantité
// mise à l'échelle. À 3145 recettes, ces tableaux pèsent 6,1 Mo — 60 % de tout
// le JavaScript de l'application, alors qu'ils ne servent qu'une fois une
// recette ouverte. Le coût n'est pas tant le téléchargement que l'ANALYSE de
// 10 Mo de JS, qui bloque le thread principal plusieurs secondes sur mobile.
//
// COMMENT. tools/build.mjs remplace, dans la version livrée uniquement, chaque
// tableau par une forme compacte :
//   • dérivable  → { n, b:{clé: "30 g"} }        une seule ligne, les 14 autres
//                                                 se déduisent par produit ;
//   • littérale  → { n, c:[clés], v:[[valeurs]] } clés écrites une fois au lieu
//                                                 de quinze.
// Ce module redonne au tableau sa forme d'origine, à l'identique, via un getter
// posé sur la recette. Rien n'est calculé tant que personne ne lit le tableau,
// et aucun autre module n'a à changer : ils continuent de voir
// `recette.tableauMachin` comme un tableau de 15 objets.
//
// Les fichiers sources js/recettes_*.js gardent la forme lisible à 15 lignes :
// la compaction n'a lieu qu'au build. En développement, `_t` est absent et ce
// module ne fait rien.
// =============================================================================

(function () {
  "use strict";

  var FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾" };

  // Reproduit exactement q4() du générateur de recettes : partie entière + ¼½¾.
  function q4(v) {
    var ent = Math.floor(v);
    var frac = Math.round((v - ent) * 100) / 100;
    return (ent > 0 ? String(ent) : "") + (FRACTIONS[frac] || "");
  }

  // Une cellule de base est soit { v, u } (poids/volume), soit { v } (compté).
  function rendre(base, nb) {
    if (base.u) return (Math.round(base.v * nb * 100) / 100) + " " + base.u;
    return q4(base.v * nb);
  }

  function developper(t) {
    var lignes = [], i, j;
    if (t.b) {
      // Forme dérivable : on remonte les 15 lignes depuis la ligne d'une personne.
      var cles = Object.keys(t.b);
      for (i = 1; i <= 15; i++) {
        var ligne = { nb: i };
        for (j = 0; j < cles.length; j++) ligne[cles[j]] = rendre(t.b[cles[j]], i);
        lignes.push(ligne);
      }
      return lignes;
    }
    // Forme littérale : valeurs telles quelles, clés déclarées une fois. Aucune
    // colonne n'est traitée à part — certaines recettes n'ont pas de `nb` (la
    // pizza indexe par `patons` et compte 21 lignes).
    for (i = 0; i < t.v.length; i++) {
      var l = {};
      for (j = 0; j < t.c.length; j++) {
        var val = t.v[i][j];
        if (val !== null && val !== undefined) l[t.c[j]] = val;
      }
      lignes.push(l);
    }
    return lignes;
  }

  function installer(recette) {
    var t = recette._t;
    if (!t || !t.n) return;
    Object.defineProperty(recette, t.n, {
      configurable: true,
      enumerable: true,   // indispensable : plusieurs modules font
                          // Object.keys(r).find(k => k.startsWith("tableau"))
      get: function () {
        var lignes = developper(t);
        // On remplace le getter par la valeur : le calcul n'a lieu qu'une fois.
        Object.defineProperty(recette, t.n, {
          value: lignes, writable: true, enumerable: true, configurable: true
        });
        return lignes;
      }
    });
  }

  function expanserTout() {
    if (typeof recettes === "undefined" || !recettes) return 0;
    var n = 0;
    for (var cle in recettes) {
      if (!Object.prototype.hasOwnProperty.call(recettes, cle)) continue;
      var r = recettes[cle];
      if (r && r._t) { installer(r); n++; }
    }
    return n;
  }

  var n = expanserTout();
  if (n) console.log("📦 Tableaux compactés : " + n + " recettes prêtes (expansion à la demande)");

  // Exposé pour les tests et pour d'éventuels chargements différés.
  window.expanserTableaux = expanserTout;
})();
