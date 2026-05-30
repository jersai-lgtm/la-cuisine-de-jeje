// =============================================================================
// 🍸 COCKTAILS (alcoolisés)
// =============================================================================
// Ces recettes sont fusionnées dans l'objet `recettes` global.
// Init par défaut : adultes uniquement (pas les enfants/bébés/ados).
// =============================================================================

Object.assign(recettes, {
  mojito: {
    cat: "cocktails", pays: "cuba",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🍹",
    description: "Le mojito cubain classique — rhum blanc, menthe fraîche, citron vert, sucre de canne et eau gazeuse. Frais et incontournable.",
    tableauMojito: [
      { nb: 1, rhum: "5 cl", citron: "½", menthe: "8 feuilles", sucre: "2 c.à.c", eauGaz: "10 cl" },
      { nb: 2, rhum: "10 cl", citron: "1", menthe: "16 feuilles", sucre: "4 c.à.c", eauGaz: "20 cl" },
      { nb: 3, rhum: "15 cl", citron: "1½", menthe: "24 feuilles", sucre: "6 c.à.c", eauGaz: "30 cl" },
      { nb: 4, rhum: "20 cl", citron: "2", menthe: "32 feuilles", sucre: "8 c.à.c", eauGaz: "40 cl" },
      { nb: 5, rhum: "25 cl", citron: "2½", menthe: "40 feuilles", sucre: "10 c.à.c", eauGaz: "50 cl" },
      { nb: 6, rhum: "30 cl", citron: "3", menthe: "48 feuilles", sucre: "12 c.à.c", eauGaz: "60 cl" },
      { nb: 7, rhum: "35 cl", citron: "3½", menthe: "56 feuilles", sucre: "14 c.à.c", eauGaz: "70 cl" },
      { nb: 8, rhum: "40 cl", citron: "4", menthe: "64 feuilles", sucre: "16 c.à.c", eauGaz: "80 cl" },
      { nb: 9, rhum: "45 cl", citron: "4½", menthe: "72 feuilles", sucre: "18 c.à.c", eauGaz: "90 cl" },
      { nb: 10, rhum: "50 cl", citron: "5", menthe: "80 feuilles", sucre: "20 c.à.c", eauGaz: "1 L" },
      { nb: 11, rhum: "55 cl", citron: "5½", menthe: "88 feuilles", sucre: "22 c.à.c", eauGaz: "1.1 L" },
      { nb: 12, rhum: "60 cl", citron: "6", menthe: "96 feuilles", sucre: "24 c.à.c", eauGaz: "1.2 L" },
      { nb: 13, rhum: "65 cl", citron: "6½", menthe: "104 feuilles", sucre: "26 c.à.c", eauGaz: "1.3 L" },
      { nb: 14, rhum: "70 cl", citron: "7", menthe: "112 feuilles", sucre: "28 c.à.c", eauGaz: "1.4 L" },
      { nb: 15, rhum: "75 cl", citron: "7½", menthe: "120 feuilles", sucre: "30 c.à.c", eauGaz: "1.5 L" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍋", titre: "Préparer le verre", detail: "Dans un grand verre, mettre les feuilles de menthe et le sucre de canne. Ajouter le jus du citron vert. Piler doucement (pas trop fort — juste pour libérer les arômes).", badge: null },
      { icone: "🧊", titre: "Ajouter la glace", detail: "Remplir le verre de glace pilée ou de glaçons.", badge: null },
      { icone: "🍶", titre: "Verser le rhum", detail: "Verser le rhum blanc sur la glace.", badge: null },
      { icone: "💧", titre: "Compléter et servir", detail: "Compléter avec l'eau gazeuse. Mélanger délicatement avec une cuillère longue. Garnir d'une branche de menthe et d'une rondelle de citron vert.", badge: null }
    ]
  },
  margarita: {
    cat: "cocktails", pays: "mexique",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍸",
    description: "La margarita mexicaine classique — tequila, triple sec et jus de citron vert. Servie avec le rebord givré de sel.",
    tableauMargarita: [
      { nb: 1, tequila: "5 cl", tripleSec: "2 cl", citron: "3 cl", sel: "pour le rebord" },
      { nb: 2, tequila: "10 cl", tripleSec: "4 cl", citron: "6 cl", sel: "pour le rebord" },
      { nb: 3, tequila: "15 cl", tripleSec: "6 cl", citron: "9 cl", sel: "pour le rebord" },
      { nb: 4, tequila: "20 cl", tripleSec: "8 cl", citron: "12 cl", sel: "pour le rebord" },
      { nb: 5, tequila: "25 cl", tripleSec: "10 cl", citron: "15 cl", sel: "pour le rebord" },
      { nb: 6, tequila: "30 cl", tripleSec: "12 cl", citron: "18 cl", sel: "pour le rebord" },
      { nb: 7, tequila: "35 cl", tripleSec: "14 cl", citron: "21 cl", sel: "pour le rebord" },
      { nb: 8, tequila: "40 cl", tripleSec: "16 cl", citron: "24 cl", sel: "pour le rebord" },
      { nb: 9, tequila: "45 cl", tripleSec: "18 cl", citron: "27 cl", sel: "pour le rebord" },
      { nb: 10, tequila: "50 cl", tripleSec: "20 cl", citron: "30 cl", sel: "pour le rebord" },
      { nb: 11, tequila: "55 cl", tripleSec: "22 cl", citron: "33 cl", sel: "pour le rebord" },
      { nb: 12, tequila: "60 cl", tripleSec: "24 cl", citron: "36 cl", sel: "pour le rebord" },
      { nb: 13, tequila: "65 cl", tripleSec: "26 cl", citron: "39 cl", sel: "pour le rebord" },
      { nb: 14, tequila: "70 cl", tripleSec: "28 cl", citron: "42 cl", sel: "pour le rebord" },
      { nb: 15, tequila: "75 cl", tripleSec: "30 cl", citron: "45 cl", sel: "pour le rebord" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧂", titre: "Givrer le verre", detail: "Frotter le bord du verre avec un quartier de citron vert. Tremper dans du sel fin pour givrer.", badge: null },
      { icone: "🍹", titre: "Shaker", detail: "Dans un shaker avec de la glace, verser tequila, triple sec et jus de citron vert. Shaker vigoureusement 10-15 secondes.", badge: "⏱ 15 sec" },
      { icone: "🍸", titre: "Servir", detail: "Filtrer dans le verre givré. Garnir d'une rondelle de citron vert.", badge: null }
    ]
  },
  cosmopolitan: {
    cat: "cocktails", pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍸",
    description: "Le Cosmopolitan — vodka citronnée, Cointreau, jus de cranberry et citron vert. Le cocktail glamour par excellence.",
    tableauCosmopolitan: [
      { nb: 1, vodka: "4 cl", cointreau: "2 cl", cranberry: "3 cl", citron: "1 cl" },
      { nb: 2, vodka: "8 cl", cointreau: "4 cl", cranberry: "6 cl", citron: "2 cl" },
      { nb: 3, vodka: "12 cl", cointreau: "6 cl", cranberry: "9 cl", citron: "3 cl" },
      { nb: 4, vodka: "16 cl", cointreau: "8 cl", cranberry: "12 cl", citron: "4 cl" },
      { nb: 5, vodka: "20 cl", cointreau: "10 cl", cranberry: "15 cl", citron: "5 cl" },
      { nb: 6, vodka: "24 cl", cointreau: "12 cl", cranberry: "18 cl", citron: "6 cl" },
      { nb: 7, vodka: "28 cl", cointreau: "14 cl", cranberry: "21 cl", citron: "7 cl" },
      { nb: 8, vodka: "32 cl", cointreau: "16 cl", cranberry: "24 cl", citron: "8 cl" },
      { nb: 9, vodka: "36 cl", cointreau: "18 cl", cranberry: "27 cl", citron: "9 cl" },
      { nb: 10, vodka: "40 cl", cointreau: "20 cl", cranberry: "30 cl", citron: "10 cl" },
      { nb: 11, vodka: "44 cl", cointreau: "22 cl", cranberry: "33 cl", citron: "11 cl" },
      { nb: 12, vodka: "48 cl", cointreau: "24 cl", cranberry: "36 cl", citron: "12 cl" },
      { nb: 13, vodka: "52 cl", cointreau: "26 cl", cranberry: "39 cl", citron: "13 cl" },
      { nb: 14, vodka: "56 cl", cointreau: "28 cl", cranberry: "42 cl", citron: "14 cl" },
      { nb: 15, vodka: "60 cl", cointreau: "30 cl", cranberry: "45 cl", citron: "15 cl" }
    ],
    ingredients: {},
    etapes: [
      { icone: "❄️", titre: "Préparer le verre", detail: "Mettre le verre au congélateur 10 min avant. ASTUCE BARTENDER : un verre froid garde le cocktail à bonne température plus longtemps et sublime l'expérience.", badge: "⏱ 10 min" },
      { icone: "🍹", titre: "Shaker avec glace", detail: "Mettre de la glace dans le shaker. Ajouter vodka citronnée, Cointreau, jus de cranberry et jus de citron vert.", badge: null },
      { icone: "🥶", titre: "Shaker", detail: "Shaker vigoureusement une quinzaine de secondes.", badge: "⏱ 15 sec" },
      { icone: "🍸", titre: "Filtrer et servir", detail: "Filtrer dans un verre à cocktail refroidi. Garnir d'un zeste de citron vert.", badge: null }
    ]
  },
  spritz: {
    cat: "cocktails", saisons: ["hiver"], pays: "italie",
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🥂",
    description: "Le Spritz vénitien — Aperol, prosecco et eau gazeuse. L'apéritif italien par excellence, orange et pétillant.",
    tableauSpritz: [
      { nb: 1, aperol: "6 cl", prosecco: "9 cl", eauGaz: "3 cl", orange: "½ rondelle", vin: "50 ml" },
      { nb: 2, aperol: "12 cl", prosecco: "18 cl", eauGaz: "6 cl", orange: "1 rondelle", vin: "100 ml" },
      { nb: 3, aperol: "18 cl", prosecco: "27 cl", eauGaz: "9 cl", orange: "1½ rondelle", vin: "150 ml" },
      { nb: 4, aperol: "24 cl", prosecco: "36 cl", eauGaz: "12 cl", orange: "2 rondelles", vin: "200 ml" },
      { nb: 5, aperol: "30 cl", prosecco: "45 cl", eauGaz: "15 cl", orange: "2½ rondelles", vin: "250 ml" },
      { nb: 6, aperol: "36 cl", prosecco: "54 cl", eauGaz: "18 cl", orange: "3 rondelles", vin: "300 ml" },
      { nb: 7, aperol: "42 cl", prosecco: "63 cl", eauGaz: "21 cl", orange: "3½ rondelles", vin: "350 ml" },
      { nb: 8, aperol: "48 cl", prosecco: "72 cl", eauGaz: "24 cl", orange: "4 rondelles", vin: "400 ml" },
      { nb: 9, aperol: "54 cl", prosecco: "81 cl", eauGaz: "27 cl", orange: "4½ rondelles", vin: "450 ml" },
      { nb: 10, aperol: "60 cl", prosecco: "90 cl", eauGaz: "30 cl", orange: "5 rondelles", vin: "500 ml" },
      { nb: 11, aperol: "66 cl", prosecco: "99 cl", eauGaz: "33 cl", orange: "5½ rondelles", vin: "550 ml" },
      { nb: 12, aperol: "72 cl", prosecco: "108 cl", eauGaz: "36 cl", orange: "6 rondelles", vin: "600 ml" },
      { nb: 13, aperol: "78 cl", prosecco: "117 cl", eauGaz: "39 cl", orange: "6½ rondelles", vin: "650 ml" },
      { nb: 14, aperol: "84 cl", prosecco: "126 cl", eauGaz: "42 cl", orange: "7 rondelles", vin: "700 ml" },
      { nb: 15, aperol: "90 cl", prosecco: "135 cl", eauGaz: "45 cl", orange: "7½ rondelles", vin: "750 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Préparer le verre", detail: "Remplir un grand verre à vin de glaçons.", badge: null },
      { icone: "🥂", titre: "Verser dans l'ordre", detail: "Verser d'abord le prosecco, puis l'Aperol, puis l'eau gazeuse. Cet ordre préserve les bulles.", badge: null },
      { icone: "🍊", titre: "Garnir et servir", detail: "Garnir d'une rondelle d'orange et d'une olive verte. Mélanger très délicatement.", badge: null }
    ]
  },
  sangria: {
    cat: "cocktails", saisons: ["ete","hiver"], pays: "espagne",
    base: 6,
    temps: "15 min + 2h repos",
    niveau: "⭐ Facile",
    emoji: "🍷",
    description: "La sangria espagnole — vin rouge fruité, brandy, jus d'orange et fruits frais. Parfaite pour les grandes tablées.",
    tableauSangria: [
      { nb: 1, vin: "125 ml", brandy: "1 cl", orangeJus: "3 cl", sucre: "1 c.à.c", orange: "¼", citron: "¼", peche: "¼" },
      { nb: 2, vin: "250 ml", brandy: "2 cl", orangeJus: "6 cl", sucre: "2 c.à.c", orange: "½", citron: "½", peche: "½" },
      { nb: 3, vin: "375 ml", brandy: "3 cl", orangeJus: "9 cl", sucre: "3 c.à.c", orange: "¾", citron: "¾", peche: "¾" },
      { nb: 4, vin: "500 ml", brandy: "4 cl", orangeJus: "12 cl", sucre: "4 c.à.c", orange: "1", citron: "1", peche: "1" },
      { nb: 5, vin: "625 ml", brandy: "5 cl", orangeJus: "15 cl", sucre: "5 c.à.c", orange: "1", citron: "1", peche: "1" },
      { nb: 6, vin: "750 ml", brandy: "6 cl", orangeJus: "18 cl", sucre: "6 c.à.c", orange: "1", citron: "1", peche: "2" },
      { nb: 7, vin: "875 ml", brandy: "7 cl", orangeJus: "21 cl", sucre: "7 c.à.c", orange: "1½", citron: "1", peche: "2" },
      { nb: 8, vin: "1 L", brandy: "8 cl", orangeJus: "24 cl", sucre: "8 c.à.c", orange: "1½", citron: "1½", peche: "2" },
      { nb: 9, vin: "1.1 L", brandy: "9 cl", orangeJus: "27 cl", sucre: "9 c.à.c", orange: "2", citron: "1½", peche: "3" },
      { nb: 10, vin: "1.25 L", brandy: "10 cl", orangeJus: "30 cl", sucre: "10 c.à.c", orange: "2", citron: "2", peche: "3" },
      { nb: 11, vin: "1.4 L", brandy: "11 cl", orangeJus: "33 cl", sucre: "11 c.à.c", orange: "2", citron: "2", peche: "3" },
      { nb: 12, vin: "1.5 L", brandy: "12 cl", orangeJus: "36 cl", sucre: "12 c.à.c", orange: "2", citron: "2", peche: "4" },
      { nb: 13, vin: "1.6 L", brandy: "13 cl", orangeJus: "39 cl", sucre: "13 c.à.c", orange: "2½", citron: "2", peche: "4" },
      { nb: 14, vin: "1.75 L", brandy: "14 cl", orangeJus: "42 cl", sucre: "14 c.à.c", orange: "2½", citron: "2½", peche: "4" },
      { nb: 15, vin: "1.9 L", brandy: "15 cl", orangeJus: "45 cl", sucre: "15 c.à.c", orange: "3", citron: "2½", peche: "5" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍊", titre: "Préparer les fruits", detail: "Couper orange, citron et pêche en tranches ou en dés. ASTUCE CHEF : couteau bien aiguisé pour des coupes nettes.", badge: null },
      { icone: "🍷", titre: "Mélanger", detail: "Dans un grand pichet, verser le vin rouge, le brandy, le jus d'orange et le sucre. Bien mélanger pour dissoudre le sucre.", badge: null },
      { icone: "🍑", titre: "Ajouter les fruits", detail: "Ajouter les fruits coupés. Mélanger.", badge: null },
      { icone: "❄️", titre: "Repos au frigo", detail: "Réfrigérer au moins 2h pour que les saveurs se mélangent. Servir avec des glaçons et compléter avec du jus d'orange si trop fort.", badge: "⏱ 2h minimum" }
    ]
  },
  pinacolada: {
    cat: "cocktails", pays: "usa",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🥥",
    description: "La Piña Colada portoricaine — rhum blanc, crème de coco et ananas. Le cocktail tropical par excellence.",
    tableauPinaColada: [
      { nb: 1, rhum: "5 cl", cremeCoco: "3 cl", ananas: "12 cl", glace: "1 poignée" },
      { nb: 2, rhum: "10 cl", cremeCoco: "6 cl", ananas: "24 cl", glace: "2 poignées" },
      { nb: 3, rhum: "15 cl", cremeCoco: "9 cl", ananas: "36 cl", glace: "3 poignées" },
      { nb: 4, rhum: "20 cl", cremeCoco: "12 cl", ananas: "48 cl", glace: "4 poignées" },
      { nb: 5, rhum: "25 cl", cremeCoco: "15 cl", ananas: "60 cl", glace: "5 poignées" },
      { nb: 6, rhum: "30 cl", cremeCoco: "18 cl", ananas: "72 cl", glace: "6 poignées" },
      { nb: 7, rhum: "35 cl", cremeCoco: "21 cl", ananas: "84 cl", glace: "7 poignées" },
      { nb: 8, rhum: "40 cl", cremeCoco: "24 cl", ananas: "96 cl", glace: "8 poignées" },
      { nb: 9, rhum: "45 cl", cremeCoco: "27 cl", ananas: "108 cl", glace: "9 poignées" },
      { nb: 10, rhum: "50 cl", cremeCoco: "30 cl", ananas: "120 cl", glace: "10 poignées" },
      { nb: 11, rhum: "55 cl", cremeCoco: "33 cl", ananas: "132 cl", glace: "11 poignées" },
      { nb: 12, rhum: "60 cl", cremeCoco: "36 cl", ananas: "144 cl", glace: "12 poignées" },
      { nb: 13, rhum: "65 cl", cremeCoco: "39 cl", ananas: "156 cl", glace: "13 poignées" },
      { nb: 14, rhum: "70 cl", cremeCoco: "42 cl", ananas: "168 cl", glace: "14 poignées" },
      { nb: 15, rhum: "75 cl", cremeCoco: "45 cl", ananas: "180 cl", glace: "15 poignées" }
    ],
    ingredients: {},
    etapes: [
      { icone: "❄️", titre: "Préparer le verre", detail: "Mettre le verre au congélateur 10 min avant. ASTUCE BARTENDER : un verre froid garde le cocktail à bonne température plus longtemps et sublime l'expérience.", badge: "⏱ 10 min" },
      { icone: "🌀", titre: "Mixer", detail: "Mettre tous les ingrédients dans un blender avec la glace pilée. Mixer jusqu'à obtenir une texture lisse et crémeuse.", badge: "⏱ 30 sec blender" },
      { icone: "🥥", titre: "Servir", detail: "Verser dans un grand verre. Garnir d'une tranche d'ananas et d'une cerise. Servir avec une paille.", badge: null }
    ]
  },
  daiquiri: {
    cat: "cocktails", pays: "cuba",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍸",
    description: "Le Daiquiri cubain — rhum blanc, jus de citron vert et sucre de canne. Simple, élégant et parfaitement équilibré.",
    tableauDaiquiri: [
      { nb: 1, rhum: "5 cl", citron: "2.5 cl", sucre: "1.5 cl" },
      { nb: 2, rhum: "10 cl", citron: "5 cl", sucre: "3 cl" },
      { nb: 3, rhum: "15 cl", citron: "7.5 cl", sucre: "4.5 cl" },
      { nb: 4, rhum: "20 cl", citron: "10 cl", sucre: "6 cl" },
      { nb: 5, rhum: "25 cl", citron: "12.5 cl", sucre: "7.5 cl" },
      { nb: 6, rhum: "30 cl", citron: "15 cl", sucre: "9 cl" },
      { nb: 7, rhum: "35 cl", citron: "17.5 cl", sucre: "10.5 cl" },
      { nb: 8, rhum: "40 cl", citron: "20 cl", sucre: "12 cl" },
      { nb: 9, rhum: "45 cl", citron: "22.5 cl", sucre: "13.5 cl" },
      { nb: 10, rhum: "50 cl", citron: "25 cl", sucre: "15 cl" },
      { nb: 11, rhum: "55 cl", citron: "27.5 cl", sucre: "16.5 cl" },
      { nb: 12, rhum: "60 cl", citron: "30 cl", sucre: "18 cl" },
      { nb: 13, rhum: "65 cl", citron: "32.5 cl", sucre: "19.5 cl" },
      { nb: 14, rhum: "70 cl", citron: "35 cl", sucre: "21 cl" },
      { nb: 15, rhum: "75 cl", citron: "37.5 cl", sucre: "22.5 cl" }
    ],
    ingredients: {},
    etapes: [
      { icone: "❄️", titre: "Préparer le verre", detail: "Mettre le verre au congélateur 10 min avant. ASTUCE BARTENDER : un verre froid garde le cocktail à bonne température plus longtemps et sublime l'expérience.", badge: "⏱ 10 min" },
      { icone: "🍹", titre: "Shaker avec glace", detail: "Mettre de la glace dans le shaker. Ajouter rhum blanc, jus de citron vert fraîchement pressé et sirop de sucre de canne.", badge: null },
      { icone: "🥶", titre: "Shaker vigoureusement", detail: "Shaker fort pendant 15 secondes pour bien refroidir et diluer légèrement.", badge: "⏱ 15 sec" },
      { icone: "🍸", titre: "Filtrer et servir", detail: "Filtrer dans un verre à cocktail refroidi. Garnir d'un zeste de citron vert.", badge: null }
    ]
  },
  whiskysour: {
    cat: "cocktails", pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🥃",
    description: "Le Whisky Sour — bourbon, jus de citron, sirop de sucre et blanc d'œuf pour la mousse. Un classique américain.",
    tableauWhiskySour: [
      { nb: 1, bourbon: "5 cl", citron: "2.5 cl", sirop: "2 cl", blanc: "1" },
      { nb: 2, bourbon: "10 cl", citron: "5 cl", sirop: "4 cl", blanc: "1" },
      { nb: 3, bourbon: "15 cl", citron: "7.5 cl", sirop: "6 cl", blanc: "2" },
      { nb: 4, bourbon: "20 cl", citron: "10 cl", sirop: "8 cl", blanc: "2" },
      { nb: 5, bourbon: "25 cl", citron: "12.5 cl", sirop: "10 cl", blanc: "3" },
      { nb: 6, bourbon: "30 cl", citron: "15 cl", sirop: "12 cl", blanc: "3" },
      { nb: 7, bourbon: "35 cl", citron: "17.5 cl", sirop: "14 cl", blanc: "4" },
      { nb: 8, bourbon: "40 cl", citron: "20 cl", sirop: "16 cl", blanc: "4" },
      { nb: 9, bourbon: "45 cl", citron: "22.5 cl", sirop: "18 cl", blanc: "5" },
      { nb: 10, bourbon: "50 cl", citron: "25 cl", sirop: "20 cl", blanc: "5" },
      { nb: 11, bourbon: "55 cl", citron: "27.5 cl", sirop: "22 cl", blanc: "6" },
      { nb: 12, bourbon: "60 cl", citron: "30 cl", sirop: "24 cl", blanc: "6" },
      { nb: 13, bourbon: "65 cl", citron: "32.5 cl", sirop: "26 cl", blanc: "7" },
      { nb: 14, bourbon: "70 cl", citron: "35 cl", sirop: "28 cl", blanc: "7" },
      { nb: 15, bourbon: "75 cl", citron: "37.5 cl", sirop: "30 cl", blanc: "8" }
    ],
    ingredients: {},
    etapes: [
      { icone: "❄️", titre: "Préparer le verre", detail: "Mettre le verre au congélateur 10 min avant. ASTUCE BARTENDER : un verre froid garde le cocktail à bonne température plus longtemps et sublime l'expérience.", badge: "⏱ 10 min" },
      { icone: "🥚", titre: "Dry shake", detail: "Mettre tous les ingrédients dans le shaker SANS glace. Shaker fort 10 sec pour émulsionner le blanc d'œuf.", badge: "⏱ 10 sec sans glace" },
      { icone: "🧊", titre: "Wet shake", detail: "Ajouter de la glace et shaker à nouveau vigoureusement.", badge: "⏱ 15 sec avec glace" },
      { icone: "🥃", titre: "Servir", detail: "Filtrer dans un verre avec glaçons. Garnir d'une cerise et d'une rondelle de citron. La mousse de blanc d'œuf doit être belle et onctueuse.", badge: null }
    ]
  },
  mojitorose: {
    cat: "cocktails", saisons: ["ete","printemps"], pays: "cuba",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🌹",
    description: "Le Mojito Rosé — rhum blanc, fraises fraîches, menthe, citron vert et eau gazeuse. Une version fruitée et colorée du classique.",
    tableauMojitoRose: [
      { nb: 1, rhum: "5 cl", fraises: "4", menthe: "6 feuilles", citron: "½", sucre: "2 c.à.c", eauGaz: "10 cl" },
      { nb: 2, rhum: "10 cl", fraises: "8", menthe: "12 feuilles", citron: "1", sucre: "4 c.à.c", eauGaz: "20 cl" },
      { nb: 3, rhum: "15 cl", fraises: "12", menthe: "18 feuilles", citron: "1½", sucre: "6 c.à.c", eauGaz: "30 cl" },
      { nb: 4, rhum: "20 cl", fraises: "16", menthe: "24 feuilles", citron: "2", sucre: "8 c.à.c", eauGaz: "40 cl" },
      { nb: 5, rhum: "25 cl", fraises: "20", menthe: "30 feuilles", citron: "2½", sucre: "10 c.à.c", eauGaz: "50 cl" },
      { nb: 6, rhum: "30 cl", fraises: "24", menthe: "36 feuilles", citron: "3", sucre: "12 c.à.c", eauGaz: "60 cl" },
      { nb: 7, rhum: "35 cl", fraises: "28", menthe: "42 feuilles", citron: "3½", sucre: "14 c.à.c", eauGaz: "70 cl" },
      { nb: 8, rhum: "40 cl", fraises: "32", menthe: "48 feuilles", citron: "4", sucre: "16 c.à.c", eauGaz: "80 cl" },
      { nb: 9, rhum: "45 cl", fraises: "36", menthe: "54 feuilles", citron: "4½", sucre: "18 c.à.c", eauGaz: "90 cl" },
      { nb: 10, rhum: "50 cl", fraises: "40", menthe: "60 feuilles", citron: "5", sucre: "20 c.à.c", eauGaz: "1 L" },
      { nb: 11, rhum: "55 cl", fraises: "44", menthe: "66 feuilles", citron: "5½", sucre: "22 c.à.c", eauGaz: "1.1 L" },
      { nb: 12, rhum: "60 cl", fraises: "48", menthe: "72 feuilles", citron: "6", sucre: "24 c.à.c", eauGaz: "1.2 L" },
      { nb: 13, rhum: "65 cl", fraises: "52", menthe: "78 feuilles", citron: "6½", sucre: "26 c.à.c", eauGaz: "1.3 L" },
      { nb: 14, rhum: "70 cl", fraises: "56", menthe: "84 feuilles", citron: "7", sucre: "28 c.à.c", eauGaz: "1.4 L" },
      { nb: 15, rhum: "75 cl", fraises: "60", menthe: "90 feuilles", citron: "7½", sucre: "30 c.à.c", eauGaz: "1.5 L" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍓", titre: "Écraser les fraises", detail: "Couper les fraises en deux et les placer dans le verre avec le sucre. Écraser doucement pour libérer le jus. ASTUCE CHEF : couteau bien aiguisé pour des coupes nettes.", badge: null },
      { icone: "🌿", titre: "Ajouter menthe et citron", detail: "Ajouter les feuilles de menthe et le jus de citron vert. Piler légèrement.", badge: null },
      { icone: "🧊", titre: "Glace et rhum", detail: "Remplir de glace pilée. Verser le rhum blanc.", badge: null },
      { icone: "💧", titre: "Compléter", detail: "Compléter avec l'eau gazeuse. Mélanger délicatement. Décorer d'une fraise et de menthe fraîche.", badge: null }
    ]
  },
  negroni: {
    cat: "cocktails", saisons: ["hiver"], pays: "italie",
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🍊",
    description: "Le Negroni — gin, Campari et vermouth rouge en proportions égales. L'apéritif italien au goût amer et complexe.",
    tableauNegroni: [
      { nb: 1, gin: "3 cl", campari: "3 cl", vermouth: "3 cl", orange: "1 zeste", vin: "50 ml" },
      { nb: 2, gin: "6 cl", campari: "6 cl", vermouth: "6 cl", orange: "2 zestes", vin: "100 ml" },
      { nb: 3, gin: "9 cl", campari: "9 cl", vermouth: "9 cl", orange: "3 zestes", vin: "150 ml" },
      { nb: 4, gin: "12 cl", campari: "12 cl", vermouth: "12 cl", orange: "4 zestes", vin: "200 ml" },
      { nb: 5, gin: "15 cl", campari: "15 cl", vermouth: "15 cl", orange: "5 zestes", vin: "250 ml" },
      { nb: 6, gin: "18 cl", campari: "18 cl", vermouth: "18 cl", orange: "6 zestes", vin: "300 ml" },
      { nb: 7, gin: "21 cl", campari: "21 cl", vermouth: "21 cl", orange: "7 zestes", vin: "350 ml" },
      { nb: 8, gin: "24 cl", campari: "24 cl", vermouth: "24 cl", orange: "8 zestes", vin: "400 ml" },
      { nb: 9, gin: "27 cl", campari: "27 cl", vermouth: "27 cl", orange: "9 zestes", vin: "450 ml" },
      { nb: 10, gin: "30 cl", campari: "30 cl", vermouth: "30 cl", orange: "10 zestes", vin: "500 ml" },
      { nb: 11, gin: "33 cl", campari: "33 cl", vermouth: "33 cl", orange: "11 zestes", vin: "550 ml" },
      { nb: 12, gin: "36 cl", campari: "36 cl", vermouth: "36 cl", orange: "12 zestes", vin: "600 ml" },
      { nb: 13, gin: "39 cl", campari: "39 cl", vermouth: "39 cl", orange: "13 zestes", vin: "650 ml" },
      { nb: 14, gin: "42 cl", campari: "42 cl", vermouth: "42 cl", orange: "14 zestes", vin: "700 ml" },
      { nb: 15, gin: "45 cl", campari: "45 cl", vermouth: "45 cl", orange: "15 zestes", vin: "750 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Verre plein de glace", detail: "Remplir un verre old-fashioned ou à vin de glaçons.", badge: null },
      { icone: "🍶", titre: "Verser les 3 spiritueux", detail: "Verser gin, Campari et vermouth rouge en proportions égales. Mélanger doucement avec une cuillère longue pendant 30 secondes.", badge: "⏱ 30 sec mélange" },
      { icone: "🍊", titre: "Zeste d'orange", detail: "Presser un zeste d'orange au-dessus du verre pour libérer les huiles essentielles. Frotter le rebord avec le zeste et déposer dans le verre.", badge: null },
      { icone: "🍹", titre: "Service final", detail: "Servir IMMÉDIATEMENT bien frais. À déguster lentement. Variante : adapter les proportions selon vos goûts. À votre santé !", badge: null }
    ]
  },
  moscowmule: {
    cat: "cocktails", pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍯",
    description: "Le Moscow Mule — vodka, ginger beer et citron vert. Servi dans sa célèbre tasse en cuivre, pétillant et rafraîchissant.",
    tableauMoscowMule: [
      { nb: 1, vodka: "5 cl", gingerBeer: "12 cl", citron: "½", menthe: "3 feuilles" },
      { nb: 2, vodka: "10 cl", gingerBeer: "24 cl", citron: "1", menthe: "6 feuilles" },
      { nb: 3, vodka: "15 cl", gingerBeer: "36 cl", citron: "1½", menthe: "9 feuilles" },
      { nb: 4, vodka: "20 cl", gingerBeer: "48 cl", citron: "2", menthe: "12 feuilles" },
      { nb: 5, vodka: "25 cl", gingerBeer: "60 cl", citron: "2½", menthe: "15 feuilles" },
      { nb: 6, vodka: "30 cl", gingerBeer: "72 cl", citron: "3", menthe: "18 feuilles" },
      { nb: 7, vodka: "35 cl", gingerBeer: "84 cl", citron: "3½", menthe: "21 feuilles" },
      { nb: 8, vodka: "40 cl", gingerBeer: "96 cl", citron: "4", menthe: "24 feuilles" },
      { nb: 9, vodka: "45 cl", gingerBeer: "108 cl", citron: "4½", menthe: "27 feuilles" },
      { nb: 10, vodka: "50 cl", gingerBeer: "120 cl", citron: "5", menthe: "30 feuilles" },
      { nb: 11, vodka: "55 cl", gingerBeer: "132 cl", citron: "5½", menthe: "33 feuilles" },
      { nb: 12, vodka: "60 cl", gingerBeer: "144 cl", citron: "6", menthe: "36 feuilles" },
      { nb: 13, vodka: "65 cl", gingerBeer: "156 cl", citron: "6½", menthe: "39 feuilles" },
      { nb: 14, vodka: "70 cl", gingerBeer: "168 cl", citron: "7", menthe: "42 feuilles" },
      { nb: 15, vodka: "75 cl", gingerBeer: "180 cl", citron: "7½", menthe: "45 feuilles" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Tasse en cuivre et glace", detail: "Remplir une tasse en cuivre (ou grand verre) de glace pilée.", badge: null },
      { icone: "🍶", titre: "Vodka et citron", detail: "Verser la vodka. Presser le jus du citron vert par-dessus.", badge: null },
      { icone: "💧", titre: "Ginger beer", detail: "Compléter avec la ginger beer bien froide. Mélanger délicatement.", badge: null },
      { icone: "🌿", titre: "Garnir", detail: "Garnir de feuilles de menthe fraîche et d'une rondelle de citron vert.", badge: null }
    ]
  },
  pornstarmartini: {
    cat: "cocktails", pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍍",
    description: "Le Porn Star Martini — vodka à la vanille, Passoa, jus de passion et prosecco à part. Le cocktail le plus populaire d'Angleterre !",
    tableauPornstar: [
      { nb: 1, vodka: "4 cl", passoa: "2 cl", passion: "4 cl", prosecco: "5 cl", vanille: "½ c.à.c" },
      { nb: 2, vodka: "8 cl", passoa: "4 cl", passion: "8 cl", prosecco: "10 cl", vanille: "1 c.à.c" },
      { nb: 3, vodka: "12 cl", passoa: "6 cl", passion: "12 cl", prosecco: "15 cl", vanille: "1½ c.à.c" },
      { nb: 4, vodka: "16 cl", passoa: "8 cl", passion: "16 cl", prosecco: "20 cl", vanille: "2 c.à.c" },
      { nb: 5, vodka: "20 cl", passoa: "10 cl", passion: "20 cl", prosecco: "25 cl", vanille: "2½ c.à.c" },
      { nb: 6, vodka: "24 cl", passoa: "12 cl", passion: "24 cl", prosecco: "30 cl", vanille: "3 c.à.c" },
      { nb: 7, vodka: "28 cl", passoa: "14 cl", passion: "28 cl", prosecco: "35 cl", vanille: "3½ c.à.c" },
      { nb: 8, vodka: "32 cl", passoa: "16 cl", passion: "32 cl", prosecco: "40 cl", vanille: "4 c.à.c" },
      { nb: 9, vodka: "36 cl", passoa: "18 cl", passion: "36 cl", prosecco: "45 cl", vanille: "4½ c.à.c" },
      { nb: 10, vodka: "40 cl", passoa: "20 cl", passion: "40 cl", prosecco: "50 cl", vanille: "5 c.à.c" },
      { nb: 11, vodka: "44 cl", passoa: "22 cl", passion: "44 cl", prosecco: "55 cl", vanille: "5½ c.à.c" },
      { nb: 12, vodka: "48 cl", passoa: "24 cl", passion: "48 cl", prosecco: "60 cl", vanille: "6 c.à.c" },
      { nb: 13, vodka: "52 cl", passoa: "26 cl", passion: "52 cl", prosecco: "65 cl", vanille: "6½ c.à.c" },
      { nb: 14, vodka: "56 cl", passoa: "28 cl", passion: "56 cl", prosecco: "70 cl", vanille: "7 c.à.c" },
      { nb: 15, vodka: "60 cl", passoa: "30 cl", passion: "60 cl", prosecco: "75 cl", vanille: "7½ c.à.c" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍹", titre: "Shaker avec glace", detail: "Mettre de la glace dans le shaker. Ajouter vodka vanille, Passoa, jus de fruit de la passion et sirop de vanille.", badge: null },
      { icone: "🥶", titre: "Shaker", detail: "Shaker vigoureusement 15 secondes.", badge: "⏱ 15 sec" },
      { icone: "🍸", titre: "Filtrer", detail: "Filtrer dans un verre à martini. Déposer une demi-passion flottante sur le dessus.", badge: null },
      { icone: "🥂", titre: "Prosecco à part", detail: "Servir le prosecco dans un shot verre à côté — on l'ajoute au cocktail ou on le boit en une gorgée entre deux sips !", badge: null }
    ]
  },
  hugospritz: {
    cat: "cocktails", pays: "italie",
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🌸",
    description: "Le Hugo Spritz — prosecco, sirop de sureau, menthe fraîche et eau gazeuse. Plus doux et floral que le Spritz classique.",
    tableauHugoSpritz: [
      { nb: 1, prosecco: "9 cl", sureau: "2 cl", eauGaz: "3 cl", menthe: "4 feuilles", citron: "1 rondelle", vin: "50 ml" },
      { nb: 2, prosecco: "18 cl", sureau: "4 cl", eauGaz: "6 cl", menthe: "8 feuilles", citron: "2 rondelles", vin: "100 ml" },
      { nb: 3, prosecco: "27 cl", sureau: "6 cl", eauGaz: "9 cl", menthe: "12 feuilles", citron: "3 rondelles", vin: "150 ml" },
      { nb: 4, prosecco: "36 cl", sureau: "8 cl", eauGaz: "12 cl", menthe: "16 feuilles", citron: "4 rondelles", vin: "200 ml" },
      { nb: 5, prosecco: "45 cl", sureau: "10 cl", eauGaz: "15 cl", menthe: "20 feuilles", citron: "5 rondelles", vin: "250 ml" },
      { nb: 6, prosecco: "54 cl", sureau: "12 cl", eauGaz: "18 cl", menthe: "24 feuilles", citron: "6 rondelles", vin: "300 ml" },
      { nb: 7, prosecco: "63 cl", sureau: "14 cl", eauGaz: "21 cl", menthe: "28 feuilles", citron: "7 rondelles", vin: "350 ml" },
      { nb: 8, prosecco: "72 cl", sureau: "16 cl", eauGaz: "24 cl", menthe: "32 feuilles", citron: "8 rondelles", vin: "400 ml" },
      { nb: 9, prosecco: "81 cl", sureau: "18 cl", eauGaz: "27 cl", menthe: "36 feuilles", citron: "9 rondelles", vin: "450 ml" },
      { nb: 10, prosecco: "90 cl", sureau: "20 cl", eauGaz: "30 cl", menthe: "40 feuilles", citron: "10 rondelles", vin: "500 ml" },
      { nb: 11, prosecco: "99 cl", sureau: "22 cl", eauGaz: "33 cl", menthe: "44 feuilles", citron: "11 rondelles", vin: "550 ml" },
      { nb: 12, prosecco: "108 cl", sureau: "24 cl", eauGaz: "36 cl", menthe: "48 feuilles", citron: "12 rondelles", vin: "600 ml" },
      { nb: 13, prosecco: "117 cl", sureau: "26 cl", eauGaz: "39 cl", menthe: "52 feuilles", citron: "13 rondelles", vin: "650 ml" },
      { nb: 14, prosecco: "126 cl", sureau: "28 cl", eauGaz: "42 cl", menthe: "56 feuilles", citron: "14 rondelles", vin: "700 ml" },
      { nb: 15, prosecco: "135 cl", sureau: "30 cl", eauGaz: "45 cl", menthe: "60 feuilles", citron: "15 rondelles", vin: "750 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Verre et glace", detail: "Remplir un grand verre à vin de glaçons.", badge: null },
      { icone: "🌸", titre: "Sirop de sureau", detail: "Verser le sirop de fleur de sureau (St. Germain ou autre).", badge: null },
      { icone: "🍾", titre: "Prosecco et eau gazeuse", detail: "Verser le prosecco puis l'eau gazeuse. Mélanger très délicatement.", badge: null },
      { icone: "🌿", titre: "Garnir", detail: "Ajouter menthe fraîche et rondelle de citron vert. Servir immédiatement.", badge: null }
    ]
  },
  oldFashioned: {
    cat: "cocktails", saisons: ["hiver"], pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🥃",
    description: "L'Old Fashioned — bourbon ou rye, sucre, Angostura bitters et zeste d'orange. Le cocktail classique par excellence depuis 1806.",
    tableauOldFashioned: [
      { nb: 1, bourbon: "6 cl", sucre: "1 morceau", bitters: "2 traits", orange: "1 zeste" },
      { nb: 2, bourbon: "12 cl", sucre: "2 morceaux", bitters: "4 traits", orange: "2 zestes" },
      { nb: 3, bourbon: "18 cl", sucre: "3 morceaux", bitters: "6 traits", orange: "3 zestes" },
      { nb: 4, bourbon: "24 cl", sucre: "4 morceaux", bitters: "8 traits", orange: "4 zestes" },
      { nb: 5, bourbon: "30 cl", sucre: "5 morceaux", bitters: "10 traits", orange: "5 zestes" },
      { nb: 6, bourbon: "36 cl", sucre: "6 morceaux", bitters: "12 traits", orange: "6 zestes" },
      { nb: 7, bourbon: "42 cl", sucre: "7 morceaux", bitters: "14 traits", orange: "7 zestes" },
      { nb: 8, bourbon: "48 cl", sucre: "8 morceaux", bitters: "16 traits", orange: "8 zestes" },
      { nb: 9, bourbon: "54 cl", sucre: "9 morceaux", bitters: "18 traits", orange: "9 zestes" },
      { nb: 10, bourbon: "60 cl", sucre: "10 morceaux", bitters: "20 traits", orange: "10 zestes" },
      { nb: 11, bourbon: "66 cl", sucre: "11 morceaux", bitters: "22 traits", orange: "11 zestes" },
      { nb: 12, bourbon: "72 cl", sucre: "12 morceaux", bitters: "24 traits", orange: "12 zestes" },
      { nb: 13, bourbon: "78 cl", sucre: "13 morceaux", bitters: "26 traits", orange: "13 zestes" },
      { nb: 14, bourbon: "84 cl", sucre: "14 morceaux", bitters: "28 traits", orange: "14 zestes" },
      { nb: 15, bourbon: "90 cl", sucre: "15 morceaux", bitters: "30 traits", orange: "15 zestes" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍬", titre: "Dissoudre le sucre", detail: "Placer le morceau de sucre dans le verre. Ajouter les Angostura bitters et une cuillère à café d'eau. Écraser et dissoudre complètement.", badge: null },
      { icone: "🧊", titre: "Grande glace", detail: "Ajouter un gros glaçon ou plusieurs glaçons. Le format gros glaçon est important — il fond moins vite.", badge: null },
      { icone: "🥃", titre: "Verser le bourbon", detail: "Verser le bourbon. Mélanger lentement avec une cuillère longue pendant 30 secondes.", badge: "⏱ 30 sec mélange" },
      { icone: "🍊", titre: "Zeste d'orange", detail: "Exprimer le zeste d'orange au-dessus du verre pour libérer les huiles. Frotter le bord et déposer ou suspendre sur le verre.", badge: null }
    ]
  },
  gintoniqmaison: {
    cat: "cocktails", pays: "france",
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "💧",
    description: "Le Gin Tonic maison — gin de qualité, tonic premium et garnitures soignées. Simple mais tellement bon quand c'est bien fait.",
    tableauGinTonic: [
      { nb: 1, gin: "5 cl", tonic: "15 cl", citron: "1 rondelle", poivre: "3 grains" },
      { nb: 2, gin: "10 cl", tonic: "30 cl", citron: "2 rondelles", poivre: "6 grains" },
      { nb: 3, gin: "15 cl", tonic: "45 cl", citron: "3 rondelles", poivre: "9 grains" },
      { nb: 4, gin: "20 cl", tonic: "60 cl", citron: "4 rondelles", poivre: "12 grains" },
      { nb: 5, gin: "25 cl", tonic: "75 cl", citron: "5 rondelles", poivre: "15 grains" },
      { nb: 6, gin: "30 cl", tonic: "90 cl", citron: "6 rondelles", poivre: "18 grains" },
      { nb: 7, gin: "35 cl", tonic: "105 cl", citron: "7 rondelles", poivre: "21 grains" },
      { nb: 8, gin: "40 cl", tonic: "120 cl", citron: "8 rondelles", poivre: "24 grains" },
      { nb: 9, gin: "45 cl", tonic: "135 cl", citron: "9 rondelles", poivre: "27 grains" },
      { nb: 10, gin: "50 cl", tonic: "150 cl", citron: "10 rondelles", poivre: "30 grains" },
      { nb: 11, gin: "55 cl", tonic: "165 cl", citron: "11 rondelles", poivre: "33 grains" },
      { nb: 12, gin: "60 cl", tonic: "180 cl", citron: "12 rondelles", poivre: "36 grains" },
      { nb: 13, gin: "65 cl", tonic: "195 cl", citron: "13 rondelles", poivre: "39 grains" },
      { nb: 14, gin: "70 cl", tonic: "210 cl", citron: "14 rondelles", poivre: "42 grains" },
      { nb: 15, gin: "75 cl", tonic: "225 cl", citron: "15 rondelles", poivre: "45 grains" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍯", titre: "Verre ballon et glace", detail: "Utiliser un grand verre ballon (Copa glass). Remplir de glaçons jusqu'en haut.", badge: null },
      { icone: "🌿", titre: "Aromates d'abord", detail: "Déposer les garnitures choisies sur la glace : rondelle de citron vert, grains de poivre rose, romarin, concombre... selon le style de gin.", badge: null },
      { icone: "🍶", titre: "Verser le gin", detail: "Verser le gin sur la glace.", badge: null },
      { icone: "💧", titre: "Tonic premium", detail: "Verser le tonic froid en filet contre le bord du verre pour préserver les bulles. Ne jamais remuer !", badge: null }
    ]
  },
  tequilasunrise: {
    cat: "cocktails", saisons: ["hiver"], pays: "mexique",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🌅",
    description: "Le Tequila Sunrise — tequila, jus d'orange et grenadine qui forme un magnifique dégradé. Le cocktail coucher de soleil !",
    tableauTequilaSunrise: [
      { nb: 1, tequila: "5 cl", orange: "10 cl", grenadine: "1 cl" },
      { nb: 2, tequila: "10 cl", orange: "20 cl", grenadine: "2 cl" },
      { nb: 3, tequila: "15 cl", orange: "30 cl", grenadine: "3 cl" },
      { nb: 4, tequila: "20 cl", orange: "40 cl", grenadine: "4 cl" },
      { nb: 5, tequila: "25 cl", orange: "50 cl", grenadine: "5 cl" },
      { nb: 6, tequila: "30 cl", orange: "60 cl", grenadine: "6 cl" },
      { nb: 7, tequila: "35 cl", orange: "70 cl", grenadine: "7 cl" },
      { nb: 8, tequila: "40 cl", orange: "80 cl", grenadine: "8 cl" },
      { nb: 9, tequila: "45 cl", orange: "90 cl", grenadine: "9 cl" },
      { nb: 10, tequila: "50 cl", orange: "100 cl", grenadine: "10 cl" },
      { nb: 11, tequila: "55 cl", orange: "110 cl", grenadine: "11 cl" },
      { nb: 12, tequila: "60 cl", orange: "120 cl", grenadine: "12 cl" },
      { nb: 13, tequila: "65 cl", orange: "130 cl", grenadine: "13 cl" },
      { nb: 14, tequila: "70 cl", orange: "140 cl", grenadine: "14 cl" },
      { nb: 15, tequila: "75 cl", orange: "150 cl", grenadine: "15 cl" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Verre et glace", detail: "Remplir un grand verre de glaçons.", badge: null },
      { icone: "🍊", titre: "Verser tequila et orange", detail: "Verser la tequila puis le jus d'orange. Mélanger légèrement.", badge: null },
      { icone: "🌅", titre: "Grenadine", detail: "Verser doucement la grenadine le long du verre — elle va couler au fond et créer le dégradé. NE PAS mélanger ! Garnir d'une tranche d'orange.", badge: null },
      { icone: "🍹", titre: "Service final", detail: "Servir IMMÉDIATEMENT bien frais. À déguster lentement. Variante : adapter les proportions selon vos goûts. À votre santé !", badge: null }
    ]
  },
  aperolspritzrosa: {
    cat: "cocktails", saisons: ["ete","printemps"], pays: "italie",
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🌸",
    description: "Spritz Rosé — Aperol, rosé pétillant et eau gazeuse. La version plus douce et fruitée du Spritz classique.",
    tableauAperolRosa: [
      { nb: 1, aperol: "6 cl", rose: "9 cl", eauGaz: "3 cl", fraise: "1", vin: "50 ml" },
      { nb: 2, aperol: "12 cl", rose: "18 cl", eauGaz: "6 cl", fraise: "2", vin: "100 ml" },
      { nb: 3, aperol: "18 cl", rose: "27 cl", eauGaz: "9 cl", fraise: "3", vin: "150 ml" },
      { nb: 4, aperol: "24 cl", rose: "36 cl", eauGaz: "12 cl", fraise: "4", vin: "200 ml" },
      { nb: 5, aperol: "30 cl", rose: "45 cl", eauGaz: "15 cl", fraise: "5", vin: "250 ml" },
      { nb: 6, aperol: "36 cl", rose: "54 cl", eauGaz: "18 cl", fraise: "6", vin: "300 ml" },
      { nb: 7, aperol: "42 cl", rose: "63 cl", eauGaz: "21 cl", fraise: "7", vin: "350 ml" },
      { nb: 8, aperol: "48 cl", rose: "72 cl", eauGaz: "24 cl", fraise: "8", vin: "400 ml" },
      { nb: 9, aperol: "54 cl", rose: "81 cl", eauGaz: "27 cl", fraise: "9", vin: "450 ml" },
      { nb: 10, aperol: "60 cl", rose: "90 cl", eauGaz: "30 cl", fraise: "10", vin: "500 ml" },
      { nb: 11, aperol: "66 cl", rose: "99 cl", eauGaz: "33 cl", fraise: "11", vin: "550 ml" },
      { nb: 12, aperol: "72 cl", rose: "108 cl", eauGaz: "36 cl", fraise: "12", vin: "600 ml" },
      { nb: 13, aperol: "78 cl", rose: "117 cl", eauGaz: "39 cl", fraise: "13", vin: "650 ml" },
      { nb: 14, aperol: "84 cl", rose: "126 cl", eauGaz: "42 cl", fraise: "14", vin: "700 ml" },
      { nb: 15, aperol: "90 cl", rose: "135 cl", eauGaz: "45 cl", fraise: "15", vin: "750 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Verre et glace", detail: "Remplir un grand verre à vin de glaçons.", badge: null },
      { icone: "🌸", titre: "Aperol et rosé", detail: "Verser l'Aperol puis le rosé pétillant. Compléter avec l'eau gazeuse.", badge: null },
      { icone: "🍓", titre: "Garnir", detail: "Garnir d'une fraise et mélanger très délicatement.", badge: null },
      { icone: "🍹", titre: "Service final", detail: "Servir IMMÉDIATEMENT bien frais. À déguster lentement. Variante : adapter les proportions selon vos goûts. À votre santé !", badge: null }
    ]
  },
  espressoMartini: {
    cat: "cocktails", pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "☕",
    description: "L'Espresso Martini — vodka, liqueur de café et espresso frais. Le cocktail après-dîner qui réveille et plaît à tout le monde.",
    tableauEspressoMartini: [
      { nb: 1, vodka: "4 cl", kahluaC: "2 cl", espresso: "3 cl", sucre: "1 c.à.c" },
      { nb: 2, vodka: "8 cl", kahluaC: "4 cl", espresso: "6 cl", sucre: "2 c.à.c" },
      { nb: 3, vodka: "12 cl", kahluaC: "6 cl", espresso: "9 cl", sucre: "3 c.à.c" },
      { nb: 4, vodka: "16 cl", kahluaC: "8 cl", espresso: "12 cl", sucre: "4 c.à.c" },
      { nb: 5, vodka: "20 cl", kahluaC: "10 cl", espresso: "15 cl", sucre: "5 c.à.c" },
      { nb: 6, vodka: "24 cl", kahluaC: "12 cl", espresso: "18 cl", sucre: "6 c.à.c" },
      { nb: 7, vodka: "28 cl", kahluaC: "14 cl", espresso: "21 cl", sucre: "7 c.à.c" },
      { nb: 8, vodka: "32 cl", kahluaC: "16 cl", espresso: "24 cl", sucre: "8 c.à.c" },
      { nb: 9, vodka: "36 cl", kahluaC: "18 cl", espresso: "27 cl", sucre: "9 c.à.c" },
      { nb: 10, vodka: "40 cl", kahluaC: "20 cl", espresso: "30 cl", sucre: "10 c.à.c" },
      { nb: 11, vodka: "44 cl", kahluaC: "22 cl", espresso: "33 cl", sucre: "11 c.à.c" },
      { nb: 12, vodka: "48 cl", kahluaC: "24 cl", espresso: "36 cl", sucre: "12 c.à.c" },
      { nb: 13, vodka: "52 cl", kahluaC: "26 cl", espresso: "39 cl", sucre: "13 c.à.c" },
      { nb: 14, vodka: "56 cl", kahluaC: "28 cl", espresso: "42 cl", sucre: "14 c.à.c" },
      { nb: 15, vodka: "60 cl", kahluaC: "30 cl", espresso: "45 cl", sucre: "15 c.à.c" }
    ],
    ingredients: {},
    etapes: [
      { icone: "☕", titre: "Préparer l'espresso", detail: "Faire un espresso serré et le laisser refroidir légèrement.", badge: null },
      { icone: "🍹", titre: "Shaker avec glace", detail: "Dans un shaker avec beaucoup de glace, verser vodka, Kahlúa, espresso et sirop de sucre.", badge: null },
      { icone: "🥶", titre: "Shaker fort", detail: "Shaker très vigoureusement 15-20 secondes — plus c'est fort, plus la mousse est belle.", badge: "⏱ 20 sec" },
      { icone: "☕", titre: "Filtrer", detail: "Filtrer dans un verre à martini. La belle mousse crémeuse doit se former en surface. Décorer de 3 grains de café.", badge: null }
    ]
  },
  punchfruitsrouges: {
    cat: "cocktails", saisons: ["ete","printemps"], pays: "france",
    base: 8,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🍓",
    description: "Punch aux fruits rouges — rhum, fruits frais, jus de fruits et ginger beer. Le cocktail de fête qui régale tout le monde.",
    tableauPunchRouge: [
      { nb: 1, rhum: "5 cl", fraises: "50 g", framboises: "25 g", jusMixte: "10 cl", gingerBeer: "5 cl", citron: "⅓ citron", sucre: "10 g" },
      { nb: 2, rhum: "10 cl", fraises: "100 g", framboises: "50 g", jusMixte: "20 cl", gingerBeer: "10 cl", citron: "⅔ citron", sucre: "20 g" },
      { nb: 3, rhum: "15 cl", fraises: "150 g", framboises: "75 g", jusMixte: "30 cl", gingerBeer: "15 cl", citron: "1 citron", sucre: "30 g" },
      { nb: 4, rhum: "20 cl", fraises: "200 g", framboises: "100 g", jusMixte: "40 cl", gingerBeer: "20 cl", citron: "2 citrons", sucre: "40 g" },
      { nb: 5, rhum: "25 cl", fraises: "250 g", framboises: "125 g", jusMixte: "50 cl", gingerBeer: "25 cl", citron: "2 citrons", sucre: "50 g" },
      { nb: 6, rhum: "30 cl", fraises: "300 g", framboises: "150 g", jusMixte: "60 cl", gingerBeer: "30 cl", citron: "2 citrons", sucre: "60 g" },
      { nb: 7, rhum: "35 cl", fraises: "350 g", framboises: "175 g", jusMixte: "70 cl", gingerBeer: "35 cl", citron: "3 citrons", sucre: "70 g" },
      { nb: 8, rhum: "40 cl", fraises: "400 g", framboises: "200 g", jusMixte: "80 cl", gingerBeer: "40 cl", citron: "3 citrons", sucre: "80 g" },
      { nb: 9, rhum: "45 cl", fraises: "450 g", framboises: "225 g", jusMixte: "90 cl", gingerBeer: "45 cl", citron: "3 citrons", sucre: "90 g" },
      { nb: 10, rhum: "50 cl", fraises: "500 g", framboises: "250 g", jusMixte: "100 cl", gingerBeer: "50 cl", citron: "4 citrons", sucre: "100 g" },
      { nb: 11, rhum: "55 cl", fraises: "550 g", framboises: "275 g", jusMixte: "110 cl", gingerBeer: "55 cl", citron: "4 citrons", sucre: "110 g" },
      { nb: 12, rhum: "60 cl", fraises: "600 g", framboises: "300 g", jusMixte: "120 cl", gingerBeer: "60 cl", citron: "4 citrons", sucre: "120 g" },
      { nb: 13, rhum: "65 cl", fraises: "650 g", framboises: "325 g", jusMixte: "130 cl", gingerBeer: "65 cl", citron: "5 citrons", sucre: "130 g" },
      { nb: 14, rhum: "70 cl", fraises: "700 g", framboises: "350 g", jusMixte: "140 cl", gingerBeer: "70 cl", citron: "5 citrons", sucre: "140 g" },
      { nb: 15, rhum: "75 cl", fraises: "750 g", framboises: "375 g", jusMixte: "150 cl", gingerBeer: "75 cl", citron: "5 citrons", sucre: "150 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍓", titre: "Écraser les fruits", detail: "Écraser légèrement fraises et framboises dans le pichet. Ajouter sucre et jus de citron vert.", badge: null },
      { icone: "🍶", titre: "Ajouter les liquides", detail: "Verser rhum, jus de fruits rouges et jus d'orange. Mélanger.", badge: null },
      { icone: "❄️", titre: "Réfrigérer", detail: "Mettre au frigo 1h pour que les saveurs se mélangent.", badge: "⏱ 1h frigo" },
      { icone: "🥂", titre: "Servir", detail: "Au moment de servir, ajouter ginger beer et glaçons. Garnir de fruits frais.", badge: null }
    ]
  },
  blueLagoon: {
    cat: "cocktails", pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🫐",
    description: "Le Blue Lagoon — vodka, curaçao bleu et limonade. Un cocktail visuellement spectaculaire et légèrement sucré.",
    tableauBlueLagoon: [
      { nb: 1, vodka: "4 cl", curacao: "2 cl", limonade: "12 cl", citron: "1 cl" },
      { nb: 2, vodka: "8 cl", curacao: "4 cl", limonade: "24 cl", citron: "2 cl" },
      { nb: 3, vodka: "12 cl", curacao: "6 cl", limonade: "36 cl", citron: "3 cl" },
      { nb: 4, vodka: "16 cl", curacao: "8 cl", limonade: "48 cl", citron: "4 cl" },
      { nb: 5, vodka: "20 cl", curacao: "10 cl", limonade: "60 cl", citron: "5 cl" },
      { nb: 6, vodka: "24 cl", curacao: "12 cl", limonade: "72 cl", citron: "6 cl" },
      { nb: 7, vodka: "28 cl", curacao: "14 cl", limonade: "84 cl", citron: "7 cl" },
      { nb: 8, vodka: "32 cl", curacao: "16 cl", limonade: "96 cl", citron: "8 cl" },
      { nb: 9, vodka: "36 cl", curacao: "18 cl", limonade: "108 cl", citron: "9 cl" },
      { nb: 10, vodka: "40 cl", curacao: "20 cl", limonade: "120 cl", citron: "10 cl" },
      { nb: 11, vodka: "44 cl", curacao: "22 cl", limonade: "132 cl", citron: "11 cl" },
      { nb: 12, vodka: "48 cl", curacao: "24 cl", limonade: "144 cl", citron: "12 cl" },
      { nb: 13, vodka: "52 cl", curacao: "26 cl", limonade: "156 cl", citron: "13 cl" },
      { nb: 14, vodka: "56 cl", curacao: "28 cl", limonade: "168 cl", citron: "14 cl" },
      { nb: 15, vodka: "60 cl", curacao: "30 cl", limonade: "180 cl", citron: "15 cl" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Verre et glace", detail: "Remplir un grand verre de glaçons.", badge: null },
      { icone: "🫐", titre: "Vodka et curaçao", detail: "Verser la vodka et le curaçao bleu.", badge: null },
      { icone: "💧", titre: "Limonade", detail: "Compléter avec la limonade et le jus de citron. Mélanger délicatement. Garnir d'une rondelle de citron.", badge: null },
      { icone: "🍹", titre: "Service final", detail: "Servir IMMÉDIATEMENT bien frais. À déguster lentement. Variante : adapter les proportions selon vos goûts. À votre santé !", badge: null }
    ]
  },
  mimosa: {
    cat: "cocktails", saisons: ["hiver"], pays: "france",
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🍾",
    description: "Le Mimosa — champagne et jus d'orange frais en parts égales. Le cocktail du brunch par excellence, élégant et léger.",
    tableauMimosa: [
      { nb: 1, champagne: "7.5 cl", orangeJus: "7.5 cl" },
      { nb: 2, champagne: "15 cl", orangeJus: "15 cl" },
      { nb: 3, champagne: "22 cl", orangeJus: "22 cl" },
      { nb: 4, champagne: "30 cl", orangeJus: "30 cl" },
      { nb: 5, champagne: "37 cl", orangeJus: "37 cl" },
      { nb: 6, champagne: "45 cl", orangeJus: "45 cl" },
      { nb: 7, champagne: "52 cl", orangeJus: "52 cl" },
      { nb: 8, champagne: "60 cl", orangeJus: "60 cl" },
      { nb: 9, champagne: "67 cl", orangeJus: "67 cl" },
      { nb: 10, champagne: "75 cl", orangeJus: "75 cl" },
      { nb: 11, champagne: "82 cl", orangeJus: "82 cl" },
      { nb: 12, champagne: "90 cl", orangeJus: "90 cl" },
      { nb: 13, champagne: "97 cl", orangeJus: "97 cl" },
      { nb: 14, champagne: "105 cl", orangeJus: "105 cl" },
      { nb: 15, champagne: "112 cl", orangeJus: "112 cl" }
    ],
    ingredients: {},
    etapes: [
      { icone: "❄️", titre: "Préparer le verre", detail: "Mettre le verre au congélateur 10 min avant. ASTUCE BARTENDER : un verre froid garde le cocktail à bonne température plus longtemps et sublime l'expérience.", badge: "⏱ 10 min" },
      { icone: "🍊", titre: "Presser les oranges", detail: "Presser des oranges fraîches. Filtrer le jus.", badge: null },
      { icone: "🍾", titre: "Champagne d'abord", detail: "Verser d'abord le champagne bien froid dans la flûte.", badge: null },
      { icone: "🍊", titre: "Jus d'orange", detail: "Compléter doucement avec le jus d'orange. Ne pas mélanger — laisser les couches naturelles. Garnir d'un zeste d'orange.", badge: null },
      { icone: "🍹", titre: "Service final", detail: "Servir IMMÉDIATEMENT bien frais. À déguster lentement. Variante : adapter les proportions selon vos goûts. À votre santé !", badge: null }
    ]
  },
  sidecarvintage: {
    cat: "cocktails", pays: "france",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🥃",
    description: "Le Sidecar — cognac, Cointreau et jus de citron. Un cocktail des années 1920, sec et élégant, avec le rebord sucré.",
    tableauSidecar: [
      { nb: 1, cognac: "5 cl", cointreau: "2 cl", citron: "2 cl", sucre: "rebord" },
      { nb: 2, cognac: "10 cl", cointreau: "4 cl", citron: "4 cl", sucre: "rebord" },
      { nb: 3, cognac: "15 cl", cointreau: "6 cl", citron: "6 cl", sucre: "rebord" },
      { nb: 4, cognac: "20 cl", cointreau: "8 cl", citron: "8 cl", sucre: "rebord" },
      { nb: 5, cognac: "25 cl", cointreau: "10 cl", citron: "10 cl", sucre: "rebord" },
      { nb: 6, cognac: "30 cl", cointreau: "12 cl", citron: "12 cl", sucre: "rebord" },
      { nb: 7, cognac: "35 cl", cointreau: "14 cl", citron: "14 cl", sucre: "rebord" },
      { nb: 8, cognac: "40 cl", cointreau: "16 cl", citron: "16 cl", sucre: "rebord" },
      { nb: 9, cognac: "45 cl", cointreau: "18 cl", citron: "18 cl", sucre: "rebord" },
      { nb: 10, cognac: "50 cl", cointreau: "20 cl", citron: "20 cl", sucre: "rebord" },
      { nb: 11, cognac: "55 cl", cointreau: "22 cl", citron: "22 cl", sucre: "rebord" },
      { nb: 12, cognac: "60 cl", cointreau: "24 cl", citron: "24 cl", sucre: "rebord" },
      { nb: 13, cognac: "65 cl", cointreau: "26 cl", citron: "26 cl", sucre: "rebord" },
      { nb: 14, cognac: "70 cl", cointreau: "28 cl", citron: "28 cl", sucre: "rebord" },
      { nb: 15, cognac: "75 cl", cointreau: "30 cl", citron: "30 cl", sucre: "rebord" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍬", titre: "Givrer au sucre", detail: "Frotter le rebord du verre avec un quartier de citron. Tremper dans le sucre fin.", badge: null },
      { icone: "🍹", titre: "Shaker avec glace", detail: "Dans un shaker avec glace, verser cognac, Cointreau et jus de citron frais.", badge: null },
      { icone: "🥶", titre: "Shaker", detail: "Shaker vigoureusement 15 secondes.", badge: "⏱ 15 sec" },
      { icone: "🥃", titre: "Filtrer et servir", detail: "Filtrer dans le verre givré. Garnir d'un zeste de citron.", badge: null }
    ]
  },
  gingerlemondrop: {
    cat: "cocktails", pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍋",
    description: "Lemon Drop Gingembre — vodka citronnée, jus de citron frais et gingembre. Sec, pétillant et revigorant !",
    tableauLemonDrop: [
      { nb: 1, vodka: "5 cl", citron: "3 cl", gingembre: "1 cl", sucre: "1 c.à.c", selRebord: "pour le rebord" },
      { nb: 2, vodka: "10 cl", citron: "6 cl", gingembre: "2 cl", sucre: "2 c.à.c", selRebord: "pour le rebord" },
      { nb: 3, vodka: "15 cl", citron: "9 cl", gingembre: "3 cl", sucre: "3 c.à.c", selRebord: "pour le rebord" },
      { nb: 4, vodka: "20 cl", citron: "12 cl", gingembre: "4 cl", sucre: "4 c.à.c", selRebord: "pour le rebord" },
      { nb: 5, vodka: "25 cl", citron: "15 cl", gingembre: "5 cl", sucre: "5 c.à.c", selRebord: "pour le rebord" },
      { nb: 6, vodka: "30 cl", citron: "18 cl", gingembre: "6 cl", sucre: "6 c.à.c", selRebord: "pour le rebord" },
      { nb: 7, vodka: "35 cl", citron: "21 cl", gingembre: "7 cl", sucre: "7 c.à.c", selRebord: "pour le rebord" },
      { nb: 8, vodka: "40 cl", citron: "24 cl", gingembre: "8 cl", sucre: "8 c.à.c", selRebord: "pour le rebord" },
      { nb: 9, vodka: "45 cl", citron: "27 cl", gingembre: "9 cl", sucre: "9 c.à.c", selRebord: "pour le rebord" },
      { nb: 10, vodka: "50 cl", citron: "30 cl", gingembre: "10 cl", sucre: "10 c.à.c", selRebord: "pour le rebord" },
      { nb: 11, vodka: "55 cl", citron: "33 cl", gingembre: "11 cl", sucre: "11 c.à.c", selRebord: "pour le rebord" },
      { nb: 12, vodka: "60 cl", citron: "36 cl", gingembre: "12 cl", sucre: "12 c.à.c", selRebord: "pour le rebord" },
      { nb: 13, vodka: "65 cl", citron: "39 cl", gingembre: "13 cl", sucre: "13 c.à.c", selRebord: "pour le rebord" },
      { nb: 14, vodka: "70 cl", citron: "42 cl", gingembre: "14 cl", sucre: "14 c.à.c", selRebord: "pour le rebord" },
      { nb: 15, vodka: "75 cl", citron: "45 cl", gingembre: "15 cl", sucre: "15 c.à.c", selRebord: "pour le rebord" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍋", titre: "Givrer au sucre", detail: "Frotter le rebord d'un verre avec citron. Tremper dans le sucre fin.", badge: null },
      { icone: "🍹", titre: "Shaker", detail: "Dans un shaker avec glace, verser vodka citronnée, jus de citron frais, sirop de gingembre et sirop de sucre.", badge: null },
      { icone: "🥶", titre: "Shaker fort", detail: "Shaker 15 secondes.", badge: "⏱ 15 sec" },
      { icone: "🍋", titre: "Filtrer et servir", detail: "Filtrer dans le verre givré. Garnir d'un zeste de citron et d'une tranche de gingembre confit.", badge: null }
    ]
  },
  coktailcosmopolitan: {
    cat: "cocktails", saisons: ["ete","hiver"], pays: "usa",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍸",
    description: "Sex on the Beach — vodka, pêche, jus d'orange et cranberry. Le cocktail tropical fruité et coloré des soirées d'été.",
    tableauSexBeach: [
      { nb: 1, vodka: "4 cl", peche: "2 cl", orange: "6 cl", cranberry: "4 cl" },
      { nb: 2, vodka: "8 cl", peche: "4 cl", orange: "12 cl", cranberry: "8 cl" },
      { nb: 3, vodka: "12 cl", peche: "6 cl", orange: "18 cl", cranberry: "12 cl" },
      { nb: 4, vodka: "16 cl", peche: "8 cl", orange: "24 cl", cranberry: "16 cl" },
      { nb: 5, vodka: "20 cl", peche: "10 cl", orange: "30 cl", cranberry: "20 cl" },
      { nb: 6, vodka: "24 cl", peche: "12 cl", orange: "36 cl", cranberry: "24 cl" },
      { nb: 7, vodka: "28 cl", peche: "14 cl", orange: "42 cl", cranberry: "28 cl" },
      { nb: 8, vodka: "32 cl", peche: "16 cl", orange: "48 cl", cranberry: "32 cl" },
      { nb: 9, vodka: "36 cl", peche: "18 cl", orange: "54 cl", cranberry: "36 cl" },
      { nb: 10, vodka: "40 cl", peche: "20 cl", orange: "60 cl", cranberry: "40 cl" },
      { nb: 11, vodka: "44 cl", peche: "22 cl", orange: "66 cl", cranberry: "44 cl" },
      { nb: 12, vodka: "48 cl", peche: "24 cl", orange: "72 cl", cranberry: "48 cl" },
      { nb: 13, vodka: "52 cl", peche: "26 cl", orange: "78 cl", cranberry: "52 cl" },
      { nb: 14, vodka: "56 cl", peche: "28 cl", orange: "84 cl", cranberry: "56 cl" },
      { nb: 15, vodka: "60 cl", peche: "30 cl", orange: "90 cl", cranberry: "60 cl" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Verre et glace", detail: "Remplir un grand verre de glaçons.", badge: null },
      { icone: "🍸", titre: "Verser", detail: "Verser vodka, liqueur de pêche et jus d'orange. Mélanger.", badge: null },
      { icone: "🍒", titre: "Cranberry", detail: "Verser doucement le jus de cranberry. Il va couler au fond. Garnir d'une tranche d'orange.", badge: null },
      { icone: "🍹", titre: "Service final", detail: "Servir IMMÉDIATEMENT bien frais. À déguster lentement. Variante : adapter les proportions selon vos goûts. À votre santé !", badge: null }
    ]
  },
  bellini: {
    cat: "cocktails", saisons: ["ete"], pays: "italie",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍑",
    description: "Bellini — le cocktail emblématique de l'Harry's Bar de Venise. Purée de pêche blanche et prosecco pétillant. Élégant, fruité et irrésistiblement festif.",
    fixe: true,
    ingredientsFixes: [["prosecco","100 ml"],["peche","1 pêche"],["sucre","½ c.à.c"]],
    etapes: [
      { icone: "🍑", titre: "Préparer la purée", detail: "Mixer la pêche blanche pelée avec le sucre et quelques gouttes de jus de citron jusqu'à consistance lisse.", badge: null },
      { icone: "🍾", titre: "Verser le prosecco", detail: "Verser 2 cuillères à soupe de purée dans une flûte bien froide. Verser délicatement le prosecco froid.", badge: null },
      { icone: "🥂", titre: "Mélanger et servir", detail: "Mélanger délicatement avec une cuillère longue. Décorer avec un quartier de pêche.", badge: null }
    ]
  },
  frenchMartini: {
    cat: "cocktails", pays: "monde",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍸",
    description: "French Martini — vodka, Chambord et jus d'ananas. Un cocktail fruité, soyeux et légèrement exotique avec sa mousse caractéristique.",
    fixe: true,
    ingredientsFixes: [["vodka","45 ml"],["ananas","45 ml"],["sirop","15 ml (Chambord)"],["glace","glaçons"]],
    etapes: [
      { icone: "❄️", titre: "Préparer le verre", detail: "Mettre le verre au congélateur 10 min avant. ASTUCE BARTENDER : un verre froid garde le cocktail à bonne température plus longtemps et sublime l'expérience.", badge: "⏱ 10 min" },
      { icone: "🧊", titre: "Remplir le shaker", detail: "Remplir le shaker de glaçons. Verser vodka, jus d'ananas et Chambord.", badge: null },
      { icone: "🍸", titre: "Shaker vigoureusement", detail: "Shaker 15 secondes vigoureusement pour créer la mousse caractéristique.", badge: "⏱ 15 sec" },
      { icone: "🍷", titre: "Servir", detail: "Double filtration dans une coupe Martini froide. La mousse se forme en surface.", badge: null }
    ]
  },
  darkStormyCocktail: {
    cat: "cocktails", pays: "monde",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "⛈️",
    description: "Dark & Stormy — rhum brun épicé et ginger beer avec une rondelle de citron vert. Un cocktail des Bermudes intense, rafraîchissant et très facile.",
    fixe: true,
    ingredientsFixes: [["rhum","60 ml (rhum brun)"],["gingerBeer","120 ml"],["citrons","1 rondelle"],["glace","glaçons"]],
    etapes: [
      { icone: "🧊", titre: "Remplir le verre", detail: "Remplir un verre highball de glaçons. Verser le ginger beer.", badge: null },
      { icone: "⛈️", titre: "Ajouter le rhum", detail: "Verser délicatement le rhum brun par-dessus sans mélanger pour créer l'effet nuage.", badge: null },
      { icone: "🍋", titre: "Garnir", detail: "Presser et déposer la rondelle de citron vert. Servir avec une paille.", badge: null },
      { icone: "🍹", titre: "Service final", detail: "Servir IMMÉDIATEMENT bien frais. À déguster lentement. Variante : adapter les proportions selon vos goûts. À votre santé !", badge: null }
    ]
  },
  amarettoSour: {
    cat: "cocktails", pays: "italie",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍊",
    description: "Amaretto Sour — amaretto doux, citron frais et blanc d'œuf pour une mousse veloutée. Un sour parfaitement équilibré entre douceur amandée et acidité.",
    fixe: true,
    ingredientsFixes: [["cognac","50 ml (amaretto)"],["citrons","25 ml jus"],["sucre","10 ml sirop"],["blanc","15 ml"],["glace","glaçons"]],
    etapes: [
      { icone: "❄️", titre: "Préparer le verre", detail: "Mettre le verre au congélateur 10 min avant. ASTUCE BARTENDER : un verre froid garde le cocktail à bonne température plus longtemps et sublime l'expérience.", badge: "⏱ 10 min" },
      { icone: "🥚", titre: "Dry shake", detail: "Mettre amaretto, jus de citron, sirop et blanc d'œuf dans le shaker SANS glaçons. Shaker 10 sec.", badge: "⏱ 10 sec" },
      { icone: "🧊", titre: "Wet shake", detail: "Ajouter les glaçons. Shaker à nouveau vigoureusement 15 secondes.", badge: "⏱ 15 sec" },
      { icone: "🍊", titre: "Servir", detail: "Filtrer dans un verre rocks sur glaçons. Décorer avec une cerise et un twist d'orange.", badge: null }
    ]
  },
  aperolPamplemousse: {
    cat: "cocktails", saisons: ["hiver"], pays: "italie",
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍊",
    description: "Aperol Pamplemousse Spritz — une variation fruitée du spritz classique avec du jus de pamplemousse rose pour plus d'amertume et de fraîcheur.",
    fixe: true,
    ingredientsFixes: [["campari","40 ml (Aperol)"],["orange","60 ml jus pamplemousse"],["tonic","60 ml prosecco"],["glace","glaçons"],["citrons","1 rondelle"]],
    etapes: [
      { icone: "❄️", titre: "Préparer le verre", detail: "Mettre le verre au congélateur 10 min avant. ASTUCE BARTENDER : un verre froid garde le cocktail à bonne température plus longtemps et sublime l'expérience.", badge: "⏱ 10 min" },
      { icone: "🧊", titre: "Remplir", detail: "Remplir un grand verre de glaçons.", badge: null },
      { icone: "🍊", titre: "Verser", detail: "Verser l'Aperol, le jus de pamplemousse rose puis le prosecco.", badge: null },
      { icone: "🌿", titre: "Garnir", detail: "Remuer délicatement. Décorer avec une rondelle de pamplemousse et un brin de romarin.", badge: null },
      { icone: "🍹", titre: "Service final", detail: "Servir IMMÉDIATEMENT bien frais. À déguster lentement. Variante : adapter les proportions selon vos goûts. À votre santé !", badge: null }
    ]
  }
});
