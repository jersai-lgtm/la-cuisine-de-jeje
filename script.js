const recettes = {

  pizza: {
    base: 4,
    temps: "48h fermentation",
    niveau: "⭐ Moyen",
    emoji: "🫓",
    description: "La pâte à pizza napolitaine authentique — légère et croustillante grâce à une longue fermentation. Base pour toutes vos pizzas !",
    tableauPatons: [
      { patons:  0, total: "0 g",     farine: "0 g",    eau: "0 g",    sel: "0 g",    levure: "0 g"    },
      { patons:  1, total: "280 g",   farine: "168 g",  eau: "109 g",  sel: "5 g",    levure: "0,5 g"  },
      { patons:  2, total: "560 g",   farine: "335 g",  eau: "218 g",  sel: "10 g",   levure: "1 g"    },
      { patons:  3, total: "840 g",   farine: "503 g",  eau: "327 g",  sel: "15 g",   levure: "1,5 g"  },
      { patons:  4, total: "1120 g",  farine: "670 g",  eau: "436 g",  sel: "20 g",   levure: "2 g"    },
      { patons:  5, total: "1400 g",  farine: "838 g",  eau: "545 g",  sel: "25 g",   levure: "2,5 g"  },
      { patons:  6, total: "1680 g",  farine: "1005 g", eau: "653 g",  sel: "30 g",   levure: "3 g"    },
      { patons:  7, total: "1960 g",  farine: "1173 g", eau: "762 g",  sel: "35 g",   levure: "3,5 g"  },
      { patons:  8, total: "2240 g",  farine: "1340 g", eau: "871 g",  sel: "40 g",   levure: "4 g"    },
      { patons:  9, total: "2520 g",  farine: "1508 g", eau: "980 g",  sel: "45 g",   levure: "4,5 g"  },
      { patons: 10, total: "2800 g",  farine: "1675 g", eau: "1089 g", sel: "50 g",   levure: "5 g"    },
      { patons: 11, total: "3080 g",  farine: "1843 g", eau: "1198 g", sel: "55 g",   levure: "5,5 g"  },
      { patons: 12, total: "3360 g",  farine: "2010 g", eau: "1305 g", sel: "60 g",   levure: "6 g"    },
      { patons: 13, total: "3640 g",  farine: "2178 g", eau: "1415 g", sel: "65 g",   levure: "6,5 g"  },
      { patons: 14, total: "3920 g",  farine: "2345 g", eau: "1524 g", sel: "70 g",   levure: "7 g"    },
      { patons: 15, total: "4200 g",  farine: "2513 g", eau: "1633 g", sel: "75 g",   levure: "7,5 g"  },
      { patons: 16, total: "4480 g",  farine: "2680 g", eau: "1742 g", sel: "80 g",   levure: "8 g"    },
      { patons: 17, total: "4760 g",  farine: "2848 g", eau: "1851 g", sel: "85 g",   levure: "8,5 g"  },
      { patons: 18, total: "5040 g",  farine: "3015 g", eau: "1960 g", sel: "90 g",   levure: "9 g"    },
      { patons: 19, total: "5320 g",  farine: "3183 g", eau: "2069 g", sel: "95 g",   levure: "9,5 g"  },
      { patons: 20, total: "5600 g",  farine: "3350 g", eau: "2178 g", sel: "100 g",  levure: "10 g"   },
    ],
    ingredients: {
      "Farine (g)": 670,
      "Eau (ml)": 436,
      "Sel (g)": 20,
      "Levure fraîche (g)": 2
    },
    etapes: [
      {
        icone: "🌾",
        titre: "Farine seule",
        detail: "Mettre toute la farine dans le bol.",
        badge: "🤲 Pétrissage : 1 min vitesse faible"
      },
      {
        icone: "🟨",
        titre: "Ajouter levure fraîche",
        detail: "Ajouter directement la levure. Objectif : aérer farine + levure.",
        badge: "🤲 Pétrissage : 2 min"
      },
      {
        icone: "💧",
        titre: "Ajouter 90–95 % de l'eau",
        detail: "Verser progressivement l'eau froide.",
        badge: "🤲 Pétrissage : ≈ 15 min"
      },
      {
        icone: "🧂",
        titre: "Ajouter sel + reste eau",
        detail: "Finir l'hydratation. Surveiller la température de la pâte.",
        badge: "⚠️ Ne pas dépasser 25 °C"
      },
      {
        icone: "⏳",
        titre: "Repos masse",
        detail: "Laisser reposer la pâte en masse dans le bol.",
        badge: "⏱ Temps : 2 h"
      },
      {
        icone: "🍕",
        titre: "Former les pâtons",
        detail: "280 g par pâton. Faire des boules serrées en repliant la pâte sous elle-même.",
        badge: null
      },
      {
        icone: "❄️",
        titre: "Frigo",
        detail: "Placer les pâtons dans des boîtes hermétiques au réfrigérateur pour une fermentation lente.",
        badge: "⏱ Temps : 24 h minimum"
      },
      {
        icone: "🔥",
        titre: "Avant cuisson",
        detail: "Sortir les pâtons du frigo et les laisser revenir à température ambiante avant d'étaler.",
        badge: "⏱ Temps : 2–3 h"
      }
    ]
  },

  crepes: {
    base: 4,
    temps: "20 min + 1h repos",
    niveau: "⭐ Facile",
    emoji: "🥞",
    description: "Des crêpes légères et dorées, parfaites pour un goûter ou un dessert rapide.",
    tableauPersonnes: [
      { nb: 1,  farine: "60 g",  oeufs: 1,  lait: "125 ml",  eau: "25 ml",  beurre: "12 g",  sucre: "½ c.s. (facultatif)",  sel: "1 pincée" },
      { nb: 2,  farine: "125 g", oeufs: 2,  lait: "250 ml",  eau: "50 ml",  beurre: "25 g",  sucre: "1 c.s. (facultatif)",  sel: "1 pincée" },
      { nb: 3,  farine: "190 g", oeufs: 3,  lait: "375 ml",  eau: "75 ml",  beurre: "35 g",  sucre: "1½ c.s. (facultatif)", sel: "1 pincée" },
      { nb: 4,  farine: "250 g", oeufs: 4,  lait: "500 ml",  eau: "100 ml", beurre: "50 g",  sucre: "2 c.s. (facultatif)",  sel: "1 pincée" },
      { nb: 5,  farine: "310 g", oeufs: 5,  lait: "625 ml",  eau: "125 ml", beurre: "60 g",  sucre: "2½ c.s. (facultatif)", sel: "1 pincée" },
      { nb: 6,  farine: "375 g", oeufs: 6,  lait: "750 ml",  eau: "150 ml", beurre: "75 g",  sucre: "3 c.s. (facultatif)",  sel: "1 pincée" },
      { nb: 7,  farine: "440 g", oeufs: 7,  lait: "875 ml",  eau: "175 ml", beurre: "85 g",  sucre: "3½ c.s. (facultatif)", sel: "1 pincée" },
      { nb: 8,  farine: "500 g", oeufs: 8,  lait: "1000 ml", eau: "200 ml", beurre: "100 g", sucre: "4 c.s. (facultatif)",  sel: "1 pincée" },
      { nb: 9,  farine: "560 g", oeufs: 9,  lait: "1125 ml", eau: "225 ml", beurre: "110 g", sucre: "4½ c.s. (facultatif)", sel: "1 pincée" },
      { nb: 10, farine: "625 g", oeufs: 10, lait: "1250 ml", eau: "250 ml", beurre: "125 g", sucre: "5 c.s. (facultatif)",  sel: "1 pincée" },
      { nb: 11, farine: "688 g", lait: "1375 ml", eau: "275 ml", beurre: "138 g", sucre: "5.5 c.s. (facultatif)", sel: "2.8 pincée" },
      { nb: 12, farine: "750 g", lait: "1500 ml", eau: "300 ml", beurre: "150 g", sucre: "6 c.s. (facultatif)", sel: "3 pincée" },
      { nb: 13, farine: "812 g", lait: "1625 ml", eau: "325 ml", beurre: "162 g", sucre: "6.5 c.s. (facultatif)", sel: "3.2 pincée" },
      { nb: 14, farine: "875 g", lait: "1750 ml", eau: "350 ml", beurre: "175 g", sucre: "7 c.s. (facultatif)", sel: "3.5 pincée" },
      { nb: 15, farine: "938 g", lait: "1875 ml", eau: "375 ml", beurre: "188 g", sucre: "7.5 c.s. (facultatif)", sel: "3.8 pincée" },
    
    ],
    ingredients: { "Farine (g)": 250, "Oeufs": 4, "Lait (ml)": 500, "Eau (ml)": 100, "Beurre fondu (g)": 50 },
    etapes: [
      { icone: "🌾", titre: "Farine + sel",       detail: "Mélangez la farine et le sel dans un saladier.", badge: null },
      { icone: "🥚", titre: "Ajouter les œufs",   detail: "Ajoutez les œufs un à un en mélangeant bien après chaque ajout.", badge: null },
      { icone: "🥛", titre: "Lait + eau",         detail: "Versez progressivement le lait et l'eau (ou la bière) tout en remuant pour éviter les grumeaux.", badge: null },
      { icone: "🧈", titre: "Beurre + arôme",     detail: "Incorporez le beurre fondu et, si vous le souhaitez, le sucre et l'arôme (rhum, fleur d'oranger, etc.).", badge: null },
      { icone: "❄️", titre: "Repos au frigo",     detail: "Laissez reposer la pâte au moins 1 heure au réfrigérateur.", badge: "⏱ Repos : 1 h minimum" },
      { icone: "🍳", titre: "Cuire les crêpes",   detail: "Faites cuire les crêpes à feu moyen dans une poêle légèrement graissée.", badge: null },
    ]
  },

  gaufres: {
    base: 1,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🧇",
    description: "Des gaufres moelleuses à l'intérieur et croustillantes à l'extérieur.",
    tableauGaufres: [
      { nb:  1, farine: "14 g",  sucre: "2 g",  beurre: "2 g",  oeuf: "¼",  sel: "¼ pincée",  lait: "2 cl"  },
      { nb:  2, farine: "27 g",  sucre: "4 g",  beurre: "3 g",  oeuf: "⅓",  sel: "¼ pincée",  lait: "4 cl"  },
      { nb:  3, farine: "40 g",  sucre: "6 g",  beurre: "4 g",  oeuf: "⅔",  sel: "¼ pincée",  lait: "5 cl"  },
      { nb:  4, farine: "54 g",  sucre: "8 g",  beurre: "6 g",  oeuf: "¾",  sel: "¼ pincée",  lait: "7 cl"  },
      { nb:  5, farine: "68 g",  sucre: "10 g", beurre: "8 g",  oeuf: "1¼", sel: "½ pincée",  lait: "9 cl"  },
      { nb:  6, farine: "81 g",  sucre: "12 g", beurre: "9 g",  oeuf: "1½", sel: "½ pincée",  lait: "10 cl" },
      { nb:  7, farine: "94 g",  sucre: "14 g", beurre: "10 g", oeuf: "1¾", sel: "½ pincée",  lait: "12 cl" },
      { nb:  8, farine: "108 g", sucre: "16 g", beurre: "12 g", oeuf: "2",  sel: "½ pincée",  lait: "14 cl" },
      { nb:  9, farine: "122 g", sucre: "18 g", beurre: "14 g", oeuf: "2¼", sel: "¾ pincée",  lait: "16 cl" },
      { nb: 10, farine: "135 g", sucre: "20 g", beurre: "15 g", oeuf: "2½", sel: "¾ pincée",  lait: "18 cl" },
      { nb: 11, farine: "148 g", sucre: "22 g", beurre: "16 g", oeuf: "2¾", sel: "¾ pincée",  lait: "19 cl" },
      { nb: 12, farine: "162 g", sucre: "24 g", beurre: "18 g", oeuf: "3",  sel: "¾ pincée",  lait: "21 cl" },
      { nb: 13, farine: "176 g", sucre: "26 g", beurre: "20 g", oeuf: "3¼", sel: "1 pincée",  lait: "23 cl" },
      { nb: 14, farine: "189 g", sucre: "28 g", beurre: "21 g", oeuf: "3½", sel: "1 pincée",  lait: "24 cl" },
      { nb: 15, farine: "202 g", sucre: "30 g", beurre: "22 g", oeuf: "3¾", sel: "1 pincée",  lait: "26 cl" },
      { nb: 16, farine: "216 g", sucre: "32 g", beurre: "24 g", oeuf: "4",  sel: "1 pincée",  lait: "28 cl" },
      { nb: 17, farine: "230 g", sucre: "34 g", beurre: "26 g", oeuf: "4¼", sel: "1¼ pincée", lait: "30 cl" },
      { nb: 18, farine: "243 g", sucre: "36 g", beurre: "27 g", oeuf: "4½", sel: "1¼ pincée", lait: "32 cl" },
      { nb: 19, farine: "256 g", sucre: "38 g", beurre: "28 g", oeuf: "4¾", sel: "1¼ pincée", lait: "33 cl" },
      { nb: 20, farine: "270 g", sucre: "40 g", beurre: "30 g", oeuf: "5",  sel: "1¼ pincée", lait: "35 cl" },
    ],
    ingredients: { "Farine (g)": 54, "Sucre (g)": 8, "Beurre (g)": 6, "Lait (cl)": 7 },
    etapes: [
      { icone: "🥣", titre: "Base de la pâte",          detail: "Mettre la farine dans un saladier, y ajouter le sucre, les jaunes d'œufs et le beurre ramolli.", badge: null },
      { icone: "🥛", titre: "Délayer avec le lait",     detail: "Ajouter le lait peu à peu en mélangeant pour éviter les grumeaux. La pâte doit être lisse et homogène.", badge: null },
      { icone: "🌨️", titre: "Blancs en neige",          detail: "Battre les blancs en neige avec une pincée de sel. Les incorporer délicatement à la pâte en soulevant pour ne pas les casser.", badge: null },
      { icone: "🧇", titre: "Cuire au gaufrier",        detail: "Cuire dans un gaufrier légèrement beurré jusqu'à ce que les gaufres soient bien dorées et croustillantes.", badge: "⏱ Cuisson : 3–5 min" }
    ]
  },


  painbaguette: {
    base: 1,
    temps: "3h",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥖",
    description: "Une vraie baguette maison — croûte dorée et craquante, mie alvéolée. La base de la boulangerie française.",
    fixe: true,
    ingredientsFixes: [
      ["🌾 Farine T65", "250 g"],
      ["💧 Eau tiède", "160 ml"],
      ["🟨 Levure fraîche", "8 g"],
      ["🧂 Sel", "5 g"],
    ],
    ingredients: {},
    etapes: [
      { icone: "🟨", titre: "Diluer la levure",        detail: "Diluer la levure fraîche dans l'eau tiède (max 35°C). Laisser reposer 5 min.", badge: "⏱ 5 min" },
      { icone: "🌾", titre: "Former la pâte",          detail: "Dans un grand bol, mélanger la farine et le sel. Ajouter le mélange eau-levure. Mélanger jusqu'à formation d'une pâte homogène.", badge: null },
      { icone: "🤲", titre: "Pétrir",                  detail: "Pétrir énergiquement la pâte pendant 10 min jusqu'à ce qu'elle soit lisse et élastique.", badge: "⏱ 10 min" },
      { icone: "⏳", titre: "Première levée",          detail: "Couvrir d'un torchon et laisser lever dans un endroit chaud jusqu'à ce que la pâte double de volume.", badge: "⏱ 1h30" },
      { icone: "🥖", titre: "Façonner la baguette",    detail: "Dégazer la pâte. L'étirer en rectangle puis la rouler en forme de baguette en scellant bien les bords. Placer sur une plaque farinée.", badge: null },
      { icone: "⏳", titre: "Deuxième levée",          detail: "Couvrir et laisser lever à nouveau.", badge: "⏱ 45 min" },
      { icone: "✂️", titre: "Grigner et enfourner",    detail: "Préchauffer le four à 240°C avec un bol d'eau pour créer de la vapeur. Faire des entailles en diagonale sur la baguette avec une lame. Enfourner.", badge: "⏱ 20–25 min à 240°C" },
    ]
  },

  paindemie: {
    base: 20,
    temps: "2h30",
    niveau: "⭐ Facile",
    emoji: "🍞",
    description: "Un pain de mie maison moelleux — pour des toasts, sandwichs et croque-monsieur bien meilleurs que ceux du commerce.",
    tableauPainDeMie: [
      { nb:  1, farine: "18 g",  lait: "11 ml", beurre: "2 g",  sucre: "1 g",  levure: "0.5 g", sel: "0.3 g" },
      { nb:  2, farine: "35 g",  lait: "22 ml", beurre: "4 g",  sucre: "2 g",  levure: "1 g",   sel: "0.5 g" },
      { nb:  3, farine: "53 g",  lait: "33 ml", beurre: "6 g",  sucre: "3 g",  levure: "1.5 g", sel: "0.8 g" },
      { nb:  4, farine: "70 g",  lait: "44 ml", beurre: "8 g",  sucre: "4 g",  levure: "2 g",   sel: "1 g"   },
      { nb:  5, farine: "88 g",  lait: "55 ml", beurre: "10 g", sucre: "5 g",  levure: "2.5 g", sel: "1.3 g" },
      { nb:  6, farine: "105 g", lait: "66 ml", beurre: "12 g", sucre: "6 g",  levure: "3 g",   sel: "1.5 g" },
      { nb:  7, farine: "123 g", lait: "77 ml", beurre: "14 g", sucre: "7 g",  levure: "3.5 g", sel: "1.8 g" },
      { nb:  8, farine: "140 g", lait: "88 ml", beurre: "16 g", sucre: "8 g",  levure: "4 g",   sel: "2 g"   },
      { nb:  9, farine: "158 g", lait: "99 ml", beurre: "18 g", sucre: "9 g",  levure: "4.5 g", sel: "2.3 g" },
      { nb: 10, farine: "175 g", lait: "110 ml",beurre: "20 g", sucre: "10 g", levure: "5 g",   sel: "2.5 g" },
      { nb: 11, farine: "193 g", lait: "121 ml",beurre: "22 g", sucre: "11 g", levure: "5.5 g", sel: "2.8 g" },
      { nb: 12, farine: "210 g", lait: "132 ml",beurre: "24 g", sucre: "12 g", levure: "6 g",   sel: "3 g"   },
      { nb: 13, farine: "228 g", lait: "143 ml",beurre: "26 g", sucre: "13 g", levure: "6.5 g", sel: "3.3 g" },
      { nb: 14, farine: "245 g", lait: "154 ml",beurre: "28 g", sucre: "14 g", levure: "7 g",   sel: "3.5 g" },
      { nb: 15, farine: "263 g", lait: "165 ml",beurre: "30 g", sucre: "15 g", levure: "7.5 g", sel: "3.8 g" },
      { nb: 16, farine: "280 g", lait: "176 ml",beurre: "32 g", sucre: "16 g", levure: "8 g",   sel: "4 g"   },
      { nb: 17, farine: "298 g", lait: "187 ml",beurre: "34 g", sucre: "17 g", levure: "8.5 g", sel: "4.3 g" },
      { nb: 18, farine: "315 g", lait: "198 ml",beurre: "36 g", sucre: "18 g", levure: "9 g",   sel: "4.5 g" },
      { nb: 19, farine: "333 g", lait: "209 ml",beurre: "38 g", sucre: "19 g", levure: "9.5 g", sel: "4.8 g" },
      { nb: 20, farine: "350 g", lait: "220 ml",beurre: "40 g", sucre: "20 g", levure: "10 g",  sel: "5 g"   },
    ],
    ingredients: {},
    etapes: [
      { icone: "🟨", titre: "Activer la levure",       detail: "Diluer la levure dans le lait tiède avec le sucre. Laisser reposer 5 min.", badge: "⏱ 5 min" },
      { icone: "🌾", titre: "Former la pâte",          detail: "Mélanger farine et sel. Ajouter le mélange lait-levure. Pétrir jusqu'à obtenir une pâte homogène.", badge: "⏱ 8 min" },
      { icone: "🧈", titre: "Incorporer le beurre",    detail: "Ajouter le beurre mou en morceaux progressivement tout en continuant de pétrir. La pâte doit être lisse et souple.", badge: "⏱ 5 min" },
      { icone: "⏳", titre: "Première levée",          detail: "Couvrir et laisser lever dans un endroit chaud.", badge: "⏱ 1h" },
      { icone: "🍞", titre: "Façonner et mouler",      detail: "Dégazer, façonner en rectangle et placer dans un moule à cake beurré. Égaliser la surface.", badge: null },
      { icone: "⏳", titre: "Deuxième levée",          detail: "Couvrir et laisser lever jusqu'à ce que la pâte dépasse légèrement le moule.", badge: "⏱ 1h" },
      { icone: "🔥", titre: "Cuire",                   detail: "Enfourner à 180°C. Le pain est cuit quand il est bien doré et sonne creux quand on tape dessous.", badge: "⏱ 25–30 min à 180°C" },
    ]
  },

  patefeuilletee: {
    base: 1,
    temps: "2h + repos",
    niveau: "⭐⭐⭐ Difficile",
    emoji: "🥧",
    description: "La vraie pâte feuilletée maison — croustillante, beurrée et feuilletée. Pour un moule de 28 cm environ.",
    fixe: true,
    ingredientsFixes: [
      ["🌾 Farine T55", "250 g"],
      ["💧 Eau froide", "125 ml"],
      ["🧂 Sel", "5 g"],
      ["🧈 Beurre (pour la détrempe)", "30 g"],
      ["🧈 Beurre de tourage (sec/AOC)", "175 g"],
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "La détrempe",             detail: "Mélanger farine, sel et 30g de beurre fondu. Ajouter l'eau froide progressivement. Former une boule sans trop pétrir. Inciser en croix. Filmer et reposer au frigo.", badge: "⏱ 30 min au frigo" },
      { icone: "🧈", titre: "Préparer le beurre",      detail: "Aplatir le beurre de tourage froid en carré de 1cm d'épaisseur entre deux feuilles de papier. Il doit avoir la même consistance que la détrempe.", badge: null },
      { icone: "📏", titre: "Premier tourage",         detail: "Étaler la détrempe en croix. Envelopper le beurre dedans comme une enveloppe. Étaler en rectangle et faire 1 tour double. Filmer et reposer.", badge: "⏱ 30 min au frigo" },
      { icone: "📏", titre: "Tourages suivants",       detail: "Répéter l'opération 2 fois en faisant 2 tours doubles à chaque fois, en reposant 30 min au frigo entre chaque. Au total : 3 × 2 tours doubles.", badge: "⏱ 3 × 30 min repos" },
      { icone: "✅", titre: "Prête à utiliser",        detail: "Après le dernier repos, étaler la pâte à l'épaisseur souhaitée. Elle se conserve 3 jours au frigo ou 3 mois au congélateur.", badge: null },
    ]
  },

  patebrisee: {
    base: 1,
    temps: "15 min + repos",
    niveau: "⭐ Facile",
    emoji: "🥧",
    description: "La pâte brisée maison — croustillante et fondante. Pour un moule de 28 cm environ.",
    fixe: true,
    ingredientsFixes: [
      ["🌾 Farine T55", "200 g"],
      ["🧈 Beurre froid", "100 g"],
      ["💧 Eau froide", "50 ml"],
      ["🧂 Sel", "4 g"],
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Sabler",                  detail: "Couper le beurre froid en petits dés. L'incorporer à la farine et au sel du bout des doigts en frottant jusqu'à obtenir une texture sableuse. Ne pas trop travailler.", badge: null },
      { icone: "💧", titre: "Hydrater",                detail: "Ajouter l'eau froide cuillère par cuillère. Mélanger jusqu'à ce que la pâte s'amalgame. S'arrêter dès qu'elle forme une boule — ne pas trop pétrir.", badge: null },
      { icone: "❄️", titre: "Repos",                   detail: "Aplatir en disque, filmer et laisser reposer au réfrigérateur. Ce repos est indispensable pour une pâte non rétractable.", badge: "⏱ 30 min minimum" },
      { icone: "📏", titre: "Étaler et foncer",        detail: "Étaler sur un plan fariné et foncer le moule. Piquer le fond à la fourchette. Prête à garnir et cuire.", badge: null },
    ]
  },

  patesablee: {
    base: 1,
    temps: "15 min + repos",
    niveau: "⭐ Facile",
    emoji: "🍪",
    description: "La pâte sablée maison — plus sucrée et friable que la brisée. Pour un moule de 28 cm environ.",
    fixe: true,
    ingredientsFixes: [
      ["🌾 Farine T55", "200 g"],
      ["🧈 Beurre mou", "100 g"],
      ["🍬 Sucre glace", "80 g"],
      ["🥚 Œuf", "1"],
      ["🌰 Poudre d'amande", "20 g"],
      ["🧂 Sel", "1 pincée"],
    ],
    ingredients: {},
    etapes: [
      { icone: "🧈", titre: "Crémer beurre + sucre",   detail: "Travailler le beurre mou avec le sucre glace jusqu'à obtenir un mélange crémeux.", badge: null },
      { icone: "🥚", titre: "Ajouter l'œuf",          detail: "Incorporer l'œuf et mélanger.", badge: null },
      { icone: "🌾", titre: "Ajouter farine + amande", detail: "Ajouter la farine, la poudre d'amande et le sel. Mélanger sans trop travailler jusqu'à formation d'une boule.", badge: null },
      { icone: "❄️", titre: "Repos",                   detail: "Aplatir en disque, filmer et laisser reposer au réfrigérateur.", badge: "⏱ 1h minimum" },
      { icone: "📏", titre: "Étaler et foncer",        detail: "Étaler délicatement (pâte fragile) et foncer le moule. Cuire à blanc 15 min à 170°C avant de garnir.", badge: "⏱ 15 min à 170°C à blanc" },
    ]
  },

  goumeau: {
    base: 4,
    temps: "3h (dont 2h levée)",
    niveau: "⭐ Facile",
    emoji: "🫓",
    description: "La galette de goumeau franc-comtoise — une brioche moelleuse nappée d'une crème dorée. Spécialité traditionnelle de Franche-Comté.",
    tableauGoumeau: [
      { nb:  1, sucre: "9 g",  levure: "3 g",  farine: "34 g",  oeuf: "¼",  creme: "1 c.à.s",  lait: "¼ dl",  gCreme: "¾ c.à.s",  gSucre: "¾ c.à.s",  gJaune: "¼"  },
      { nb:  2, sucre: "17 g", levure: "5 g",  farine: "67 g",  oeuf: "⅓",  creme: "2 c.à.s",  lait: "⅓ dl",  gCreme: "1½ c.à.s", gSucre: "1½ c.à.s", gJaune: "⅓"  },
      { nb:  3, sucre: "25 g", levure: "8 g",  farine: "100 g", oeuf: "½",  creme: "3 c.à.s",  lait: "½ dl",  gCreme: "2½ c.à.s", gSucre: "2½ c.à.s", gJaune: "½"  },
      { nb:  4, sucre: "34 g", levure: "10 g", farine: "134 g", oeuf: "⅔",  creme: "4 c.à.s",  lait: "⅔ dl",  gCreme: "3½ c.à.s", gSucre: "3½ c.à.s", gJaune: "⅔"  },
      { nb:  5, sucre: "42 g", levure: "12 g", farine: "168 g", oeuf: "¾",  creme: "5 c.à.s",  lait: "¾ dl",  gCreme: "4½ c.à.s", gSucre: "4½ c.à.s", gJaune: "¾"  },
      { nb:  6, sucre: "51 g", levure: "15 g", farine: "201 g", oeuf: "1",   creme: "6 c.à.s",  lait: "1 dl",  gCreme: "5¼ c.à.s", gSucre: "5¼ c.à.s", gJaune: "1"  },
      { nb:  7, sucre: "60 g", levure: "18 g", farine: "234 g", oeuf: "1¼", creme: "7 c.à.s",  lait: "1¼ dl", gCreme: "6 c.à.s",  gSucre: "6 c.à.s",  gJaune: "1¼" },
      { nb:  8, sucre: "68 g", levure: "20 g", farine: "268 g", oeuf: "1⅓", creme: "8 c.à.s",  lait: "1⅓ dl", gCreme: "7 c.à.s",  gSucre: "7 c.à.s",  gJaune: "1⅓" },
      { nb:  9, sucre: "76 g", levure: "22 g", farine: "302 g", oeuf: "1½", creme: "9 c.à.s",  lait: "1½ dl", gCreme: "8 c.à.s",  gSucre: "8 c.à.s",  gJaune: "1½" },
      { nb: 10, sucre: "85 g", levure: "25 g", farine: "335 g", oeuf: "1⅔", creme: "10 c.à.s", lait: "1⅔ dl", gCreme: "8¾ c.à.s", gSucre: "8¾ c.à.s", gJaune: "1⅔" },
      { nb: 11, sucre: "94 g", levure: "28 g", farine: "368 g", oeuf: "⅔", creme: "11 c.à.s", lait: "⅔ dl", gCreme: "8.2 ½ c.à.s", gSucre: "8.2 ½ c.à.s", gJaune: "⅔" },
      { nb: 12, sucre: "102 g", levure: "30 g", farine: "402 g", oeuf: "⅔", creme: "12 c.à.s", lait: "⅔ dl", gCreme: "9 ½ c.à.s", gSucre: "9 ½ c.à.s", gJaune: "⅔" },
      { nb: 13, sucre: "110 g", levure: "32 g", farine: "436 g", oeuf: "⅔", creme: "13 c.à.s", lait: "⅔ dl", gCreme: "9.8 ½ c.à.s", gSucre: "9.8 ½ c.à.s", gJaune: "⅔" },
      { nb: 14, sucre: "119 g", levure: "35 g", farine: "469 g", oeuf: "⅔", creme: "14 c.à.s", lait: "⅔ dl", gCreme: "10 ½ c.à.s", gSucre: "10 ½ c.à.s", gJaune: "⅔" },
      { nb: 15, sucre: "128 g", levure: "38 g", farine: "502 g", oeuf: "⅔", creme: "15 c.à.s", lait: "⅔ dl", gCreme: "11 ½ c.à.s", gSucre: "11 ½ c.à.s", gJaune: "⅔" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🟨", titre: "Délayer la levure",        detail: "Délayer la levure de bière dans 3 cuillères à soupe de lait à peine tiède. Laisser reposer quelques minutes.", badge: null },
      { icone: "🥚", titre: "Mélanger les ingrédients", detail: "Dans une terrine, mélanger l'œuf entier avec le sucre. Ajouter le sel, la crème épaisse, l'eau de fleur d'oranger, le reste de lait tiède et enfin la farine pour obtenir une pâte assez molle.", badge: null },
      { icone: "🟨", titre: "Ajouter la levure",        detail: "Ajouter en dernier lieu la levure délayée dans le lait. Bien mélanger.", badge: null },
      { icone: "🤲", titre: "Pétrir",                   detail: "Pétrir à la main quelques minutes jusqu'à obtenir une pâte homogène et souple.", badge: "⏱ 3–5 min" },
      { icone: "🥧", titre: "Mettre en moule",          detail: "Beurrer et fariner un moule à tarte à fond plein. Étaler la pâte à la main dans ce moule (environ 1,5 cm d'épaisseur).", badge: null },
      { icone: "⏳", titre: "Laisser lever",            detail: "Laisser lever dans un endroit tiède jusqu'à ce que la pâte ait bien gonflé.", badge: "⏱ 2h à 3h" },
      { icone: "🍮", titre: "Préparer le goumeau",      detail: "Juste avant la cuisson, mélanger la crème fraîche épaisse, le jaune d'œuf et le sucre. Bien mélanger.", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Étendre la crème goumeau sur la pâte levée et faire cuire à four chaud jusqu'à ce que le dessus soit bien doré.", badge: "⏱ 20–25 min à 200°C" },
      { icone: "🍬", titre: "Sucrer à la sortie",       detail: "Immédiatement à la sortie du four, saupoudrer généreusement de sucre en poudre. Déguster tiède !", badge: null },
    ]
  },


  painburger: {
    base: 6,
    temps: "2h30 (dont 1h30 levée)",
    niveau: "⭐ Facile",
    emoji: "🍔",
    description: "Des buns briochés ultra moelleux à la mie aérienne — croûte fine et légèrement dorée. Une fois faits maison, impossible de revenir aux buns du commerce !",
    tableauPainBurger: [
      { nb:  2, farine: "130 g", lait: "70 ml",  beurre: "20 g", huile: "7 ml",  oeufs: "⅓", levure: "3 g",  sucre: "8 g",  miel: "3 g",  sel: "2 g"  },
      { nb:  4, farine: "260 g", lait: "140 ml", beurre: "40 g", huile: "14 ml", oeufs: "⅔", levure: "5 g",  sucre: "15 g", miel: "5 g",  sel: "4 g"  },
      { nb:  6, farine: "400 g", lait: "210 ml", beurre: "60 g", huile: "20 ml", oeufs: "1",  levure: "8 g",  sucre: "22 g", miel: "8 g",  sel: "6 g"  },
      { nb:  8, farine: "530 g", lait: "280 ml", beurre: "80 g", huile: "27 ml", oeufs: "1⅓", levure: "10 g", sucre: "30 g", miel: "10 g", sel: "8 g"  },
      { nb: 10, farine: "660 g", lait: "350 ml", beurre: "100 g",huile: "34 ml", oeufs: "1⅔", levure: "13 g", sucre: "37 g", miel: "13 g", sel: "10 g" },
      { nb: 12, farine: "800 g", lait: "420 ml", beurre: "120 g",huile: "40 ml", oeufs: "2",  levure: "16 g", sucre: "44 g", miel: "16 g", sel: "12 g" },
      { nb: 13, farine: "867 g", lait: "455 ml", beurre: "130 g", huile: "43 ml", oeufs: "2.2", levure: "17 g", sucre: "48 g", miel: "17 g", sel: "13 g" },
      { nb: 14, farine: "933 g", lait: "490 ml", beurre: "140 g", huile: "47 ml", oeufs: "2.3", levure: "19 g", sucre: "51 g", miel: "19 g", sel: "14 g" },
      { nb: 15, farine: "1000 g", lait: "525 ml", beurre: "150 g", huile: "50 ml", oeufs: "2.5", levure: "20 g", sucre: "55 g", miel: "20 g", sel: "15 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🟨", titre: "Activer la levure",         detail: "Diluer la levure fraîche dans le lait tiède (35°C max). Ajouter le miel et laisser reposer 10 min jusqu'à ce que ça mousse.", badge: "⏱ 10 min" },
      { icone: "🌾", titre: "Former la pâte",            detail: "Dans un grand bol, mélanger farine, sucre et sel. Creuser un puits, y verser le mélange lait-levure, l'œuf et l'huile. Mélanger jusqu'à pâte homogène.", badge: null },
      { icone: "🧈", titre: "Incorporer le beurre",      detail: "Ajouter le beurre mou en morceaux progressivement. Pétrir 10 min à la main ou au robot jusqu'à obtenir une pâte lisse, souple et légèrement collante.", badge: "⏱ 10 min pétrissage" },
      { icone: "⏳", titre: "Première levée",            detail: "Former une boule, couvrir d'un torchon humide et laisser lever dans un endroit chaud jusqu'à ce que la pâte double de volume.", badge: "⏱ 1h à 1h30" },
      { icone: "⚖️", titre: "Façonner les buns",         detail: "Dégazer délicatement la pâte. Diviser en portions égales de 90-100g. Former des boules lisses en repliant la pâte dessous. Disposer sur une plaque avec papier sulfurisé, bien espacés.", badge: null },
      { icone: "⏳", titre: "Deuxième levée",            detail: "Couvrir et laisser lever jusqu'à ce que les buns aient bien gonflé.", badge: "⏱ 30-45 min" },
      { icone: "🥚", titre: "Dorer et garnir",           detail: "Préchauffer le four à 180°C. Badigeonner délicatement les buns de lait (ou jaune d'œuf dilué). Parsemer de graines de sésame.", badge: null },
      { icone: "🔥", titre: "Cuire",                     detail: "Enfourner à 180°C. Les buns sont prêts quand ils sont bien dorés et sonnent creux. À la sortie du four, badigeonner de beurre fondu pour un aspect brillant.", badge: "⏱ 13-15 min à 180°C" },
    ]
  },


  galettetacos: {
    base: 8,
    temps: "45 min (dont 30 min repos)",
    niveau: "⭐ Facile",
    emoji: "🌮",
    description: "Les galettes à tacos maison souples et moelleuses — bien meilleures que celles du commerce et ultra simples à faire. Parfaites pour tacos, wraps et fajitas !",
    tableauGaletteTacos: [
      { nb:  2, farine: "60 g",  eau: "35 ml", huile: "5 ml",  sel: "1 g"  },
      { nb:  4, farine: "120 g", eau: "70 ml", huile: "10 ml", sel: "2 g"  },
      { nb:  6, farine: "180 g", eau: "105 ml",huile: "15 ml", sel: "3 g"  },
      { nb:  8, farine: "240 g", eau: "140 ml",huile: "20 ml", sel: "4 g"  },
      { nb: 10, farine: "300 g", eau: "175 ml",huile: "25 ml", sel: "5 g"  },
      { nb: 12, farine: "360 g", eau: "210 ml",huile: "30 ml", sel: "6 g"  },
      { nb: 14, farine: "420 g", eau: "245 ml",huile: "35 ml", sel: "7 g"  },
      { nb: 16, farine: "480 g", eau: "280 ml",huile: "40 ml", sel: "8 g"  },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Mélanger les ingrédients",  detail: "Dans un saladier, mélanger la farine et le sel. Ajouter l'huile et l'eau tiède progressivement. Mélanger à la fourchette puis pétrir à la main jusqu'à obtenir une pâte lisse et souple qui ne colle plus.", badge: "⏱ 5 min pétrissage" },
      { icone: "⏳", titre: "Repos de la pâte",          detail: "Former une boule, couvrir d'un torchon humide ou d'un film alimentaire. Laisser reposer à température ambiante. Ce repos est essentiel — la pâte bien reposée s'étale mieux et ne se rétracte pas.", badge: "⏱ 30 min" },
      { icone: "⚖️", titre: "Diviser et former",         detail: "Diviser la pâte en portions égales de 30g environ. Rouler en boules. Toujours garder les boules non étalées couvertes pour éviter qu'elles sèchent.", badge: null },
      { icone: "📏", titre: "Étaler finement",           detail: "Sur un plan de travail légèrement fariné, étaler chaque boule au rouleau en un disque fin de 20-22 cm. Plus la galette est fine, plus elle sera souple.", badge: null },
      { icone: "🍳", titre: "Cuire à sec",               detail: "Chauffer une poêle antiadhésive à feu moyen-vif sans matière grasse. Cuire chaque galette jusqu'à l'apparition de petites bulles et taches dorées, retourner et cuire l'autre côté.", badge: "⏱ 20-30 sec par face" },
      { icone: "🌯", titre: "Couvrir pour garder le moelleux", detail: "Empiler les galettes cuites dans un torchon propre en les couvrant immédiatement — c'est le secret du moelleux ! La vapeur emprisonnée les garde souples. Se conservent 3 jours dans un sac hermétique.", badge: null },
    ]
  },

  brioche: {
    base: 1,
    temps: "~2h + 35 min cuisson",
    niveau: "⭐ Moyen",
    emoji: "🍞",
    description: "Une brioche filante et dorée. Recette pour 1 ou 2 brioches de 400g, avec ou sans lait.",
    tableauBrioche: [
      {
        nb: 1, label: "1 brioche 🥛",
        oeufs: "~200 g", vanille: "7,5 g", lait: "87,5 g", sucre: "65 g",
        levure: "15 g", sel: "9 g", farine: "500 g", beurre: "150 g"
      },
      {
        nb: 2, label: "2 brioches 🥛",
        oeufs: "~400 g", vanille: "15 g", lait: "175 g", sucre: "130 g",
        levure: "30 g", sel: "18 g", farine: "1000 g", beurre: "300 g"
      },
      {
        nb: 3, label: "1 brioche 🥛🚫",
        oeufs: "~292 g", vanille: "7,5 g", lait: "—", sucre: "65 g",
        levure: "15 g", sel: "9 g", farine: "500 g", beurre: "150 g"
      },
      {
        nb: 4, label: "2 brioches 🥛🚫",
        oeufs: "~585 g", vanille: "15 g", lait: "—", sucre: "130 g",
        levure: "30 g", sel: "18 g", farine: "1000 g", beurre: "300 g"
      },
    ],
    ingredients: {
      "Œufs (g)": 200, "Extrait de vanille (g)": 7.5, "Lait (g)": 87.5,
      "Sucre (g)": 65, "Levure fraîche (g)": 15, "Sel (g)": 9,
      "Farine (g)": 500, "Beurre froid (g)": 150
    },
    etapes: [
      { icone: "🥚", titre: "Mettre tous les ingrédients sauf le beurre", detail: "Dans le bol du robot : œufs + levure fraîche + extrait de vanille + sucre + farine + sel (+ lait si version avec lait). Ne pas mettre le beurre.", badge: null },
      { icone: "🤲", titre: "Pétrissage petite vitesse", detail: "Mélanger à petite vitesse jusqu'à ce que la pâte soit homogène.", badge: "⏱ 5 min petite vitesse" },
      { icone: "⚡", titre: "Pétrissage grande vitesse", detail: "Passer en grande vitesse pour développer le réseau de gluten.", badge: "⏱ 6 min grande vitesse" },
      { icone: "🧈", titre: "Ajouter le beurre froid", detail: "Incorporer le beurre froid coupé en morceaux progressivement.", badge: "⏱ 5 min vitesse moyenne" },
      { icone: "⚡", titre: "Finition grande vitesse", detail: "Terminer le pétrissage en grande vitesse. La pâte doit être lisse et se décoller des parois.", badge: "⏱ 3 min grande vitesse" },
      { icone: "🌡️", titre: "Surveiller la température", detail: "La pâte ne doit pas dépasser 22–24 °C. Si elle chauffe trop, mettre le bol au frigo quelques minutes.", badge: "⚠️ Max 22–24 °C" },
      { icone: "🔥", titre: "Cuire au four", detail: "Façonner, laisser pousser selon votre méthode, puis enfourner. Cuisson à 150 °C.", badge: "⏱ ~35 min à 150 °C" }
    ]
  },

  lasagne: {
    base: 1,
    temps: "1h30",
    niveau: "⭐ Moyen",
    emoji: "🍝",
    description: "Pâte à lasagnes maison : 1 œuf pour 100 g de farine, 1 pincée de sel.",
    tableauLasagne: [
      { nb:  1, farine: "100 g",  oeufs: 1,  sel: "1 pincée" },
      { nb:  2, farine: "200 g",  oeufs: 2,  sel: "1 pincée" },
      { nb:  3, farine: "300 g",  oeufs: 3,  sel: "1 pincée" },
      { nb:  4, farine: "400 g",  oeufs: 4,  sel: "1 pincée" },
      { nb:  5, farine: "500 g",  oeufs: 5,  sel: "1 pincée" },
      { nb:  6, farine: "600 g",  oeufs: 6,  sel: "1 pincée" },
      { nb:  7, farine: "700 g",  oeufs: 7,  sel: "1 pincée" },
      { nb:  8, farine: "800 g",  oeufs: 8,  sel: "1 pincée" },
      { nb:  9, farine: "900 g",  oeufs: 9,  sel: "1 pincée" },
      { nb: 10, farine: "1000 g", oeufs: 10, sel: "1 pincée" },
      { nb: 11, farine: "1100 g", sel: "2.8 pincée" },
      { nb: 12, farine: "1200 g", sel: "3 pincée" },
      { nb: 13, farine: "1300 g", sel: "3.2 pincée" },
      { nb: 14, farine: "1400 g", sel: "3.5 pincée" },
      { nb: 15, farine: "1500 g", sel: "3.8 pincée" },
    
    ],
    ingredients: { "Farine (g)": 100, "Œufs": 1 },
    etapes: [
      { icone: "🌾", titre: "Mélanger farine + sel", detail: "Verser la farine en fontaine sur le plan de travail. Ajouter une pincée de sel.", badge: null },
      { icone: "🥚", titre: "Ajouter les œufs",      detail: "Casser les œufs au centre de la fontaine. Les incorporer progressivement à la farine en partant du centre.", badge: null },
      { icone: "🤲", titre: "Pétrir",                detail: "Pétrir énergiquement jusqu'à obtenir une pâte lisse, souple et homogène. Si la pâte colle, ajouter un peu de farine.", badge: "⏱ 10 min" },
      { icone: "⏳", titre: "Repos",                 detail: "Envelopper la pâte dans du film alimentaire et laisser reposer à température ambiante.", badge: "⏱ 30 min minimum" },
      { icone: "📏", titre: "Abaisser",              detail: "Diviser la pâte en portions. L'étaler au rouleau ou au laminoir le plus fin possible.", badge: null },
      { icone: "✂️", titre: "Découper",              detail: "Découper les feuilles à la taille de votre plat. Fariner légèrement pour éviter qu'elles ne collent.", badge: null },
    ]
  },

  cookies: {
    base: 1,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🍪",
    description: "Cookies au chocolat noir : 1 cookie par personne. Beurre tendre, chocolat noir, une touche de vanille.",
    tableauCookies: [
      { nb:  1, beurre: "22 g",  sucre: "22 g",  farine: "38 g",  choco: "25 g",  oeuf: "¼",  sel: "¼ pincée",  levure: "¼ c.à.c.",  vanille: "1 sachet" },
      { nb:  2, beurre: "43 g",  sucre: "43 g",  farine: "75 g",  choco: "50 g",  oeuf: "½",  sel: "½ pincée",  levure: "½ c.à.c.",  vanille: "1 sachet" },
      { nb:  3, beurre: "64 g",  sucre: "64 g",  farine: "113 g", choco: "75 g",  oeuf: "¾",  sel: "¾ pincée",  levure: "¾ c.à.c.",  vanille: "1 sachet" },
      { nb:  4, beurre: "88 g",  sucre: "88 g",  farine: "152 g", choco: "100 g", oeuf: "1",  sel: "1 pincée",  levure: "1 c.à.c.",  vanille: "1 sachet" },
      { nb:  5, beurre: "110 g", sucre: "110 g", farine: "190 g", choco: "125 g", oeuf: "1¼", sel: "1¼ pincée", levure: "1¼ c.à.c.", vanille: "1 sachet" },
      { nb:  6, beurre: "132 g", sucre: "132 g", farine: "228 g", choco: "150 g", oeuf: "1½", sel: "1½ pincée", levure: "1½ c.à.c.", vanille: "1 sachet" },
      { nb:  7, beurre: "154 g", sucre: "154 g", farine: "266 g", choco: "175 g", oeuf: "1¾", sel: "1¾ pincée", levure: "1¾ c.à.c.", vanille: "1 sachet" },
      { nb:  8, beurre: "176 g", sucre: "176 g", farine: "304 g", choco: "200 g", oeuf: "2",  sel: "2 pincées", levure: "2 c.à.c.",  vanille: "2 sachets" },
      { nb:  9, beurre: "198 g", sucre: "198 g", farine: "342 g", choco: "225 g", oeuf: "2¼", sel: "2¼ pincées",levure: "2¼ c.à.c.", vanille: "2 sachets" },
      { nb: 10, beurre: "220 g", sucre: "220 g", farine: "380 g", choco: "250 g", oeuf: "2½", sel: "2½ pincées",levure: "2½ c.à.c.", vanille: "2 sachets" },
      { nb: 11, beurre: "242 g", sucre: "242 g", farine: "418 g", choco: "275 g", oeuf: "2.8", sel: "2.8 pincée", levure: "2.8 c.à.c.", vanille: "2.8 sachet" },
      { nb: 12, beurre: "264 g", sucre: "264 g", farine: "456 g", choco: "300 g", oeuf: "3", sel: "3 pincée", levure: "3 c.à.c.", vanille: "3 sachet" },
      { nb: 13, beurre: "286 g", sucre: "286 g", farine: "494 g", choco: "325 g", oeuf: "3.2", sel: "3.2 pincée", levure: "3.2 c.à.c.", vanille: "3.2 sachet" },
      { nb: 14, beurre: "308 g", sucre: "308 g", farine: "532 g", choco: "350 g", oeuf: "3.5", sel: "3.5 pincée", levure: "3.5 c.à.c.", vanille: "3.5 sachet" },
      { nb: 15, beurre: "330 g", sucre: "330 g", farine: "570 g", choco: "375 g", oeuf: "3.8", sel: "3.8 pincée", levure: "3.8 c.à.c.", vanille: "3.8 sachet" },
    
    ],
    ingredients: { "Beurre tendre (g)": 22, "Sucre (g)": 22, "Farine (g)": 38, "Chocolat noir (g)": 25 },
    etapes: [
      { icone: "🧈", titre: "Beurre + sucre + vanille", detail: "Travailler le beurre tendre avec le sucre et le sucre vanillé jusqu'à obtenir un mélange crémeux et homogène.", badge: null },
      { icone: "🥚", titre: "Ajouter l'œuf",           detail: "Incorporer l'œuf (ou la fraction d'œuf) et mélanger jusqu'à ce que la pâte soit lisse.", badge: null },
      { icone: "🌾", titre: "Farine + sel + levure",    detail: "Ajouter la farine, la pincée de sel et la levure chimique. Mélanger sans trop travailler la pâte.", badge: null },
      { icone: "🍫", titre: "Ajouter le chocolat",      detail: "Incorporer le chocolat noir haché grossièrement ou en pépites.", badge: null },
      { icone: "🍪", titre: "Former le cookie",         detail: "Former une boule et la déposer sur une plaque recouverte de papier cuisson. Aplatir légèrement.", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Enfourner. Le cookie doit être encore mou à la sortie du four, il durcit en refroidissant. Laisser reposer 5 min sur la plaque.", badge: "⏱ 10–12 min" }
    ]
  },



  saladeniçoise: {
    base: 4,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🥗",
    description: "La salade niçoise authentique — tomates, thon, anchois, olives et œufs durs. Le soleil de la Méditerranée dans l'assiette.",
    tableauSaladeNicoise: [
      { nb:  1, tomates: "2",   thon: "40 g",  oeufs: "1",  olives: "30 g",  anchois: "3",  salade: "¼",   oignon: "¼" },
      { nb:  2, tomates: "3",   thon: "80 g",  oeufs: "1",  olives: "60 g",  anchois: "6",  salade: "½",   oignon: "½" },
      { nb:  3, tomates: "4",   thon: "120 g", oeufs: "2",  olives: "90 g",  anchois: "9",  salade: "¾",   oignon: "½" },
      { nb:  4, tomates: "6",   thon: "160 g", oeufs: "3",  olives: "120 g", anchois: "12", salade: "1",   oignon: "1" },
      { nb:  5, tomates: "7",   thon: "200 g", oeufs: "4",  olives: "150 g", anchois: "15", salade: "1",   oignon: "1" },
      { nb:  6, tomates: "9",   thon: "240 g", oeufs: "4",  olives: "180 g", anchois: "18", salade: "1½",  oignon: "1" },
      { nb:  7, tomates: "10",  thon: "280 g", oeufs: "5",  olives: "210 g", anchois: "21", salade: "1½",  oignon: "1" },
      { nb:  8, tomates: "12",  thon: "320 g", oeufs: "6",  olives: "240 g", anchois: "24", salade: "2",   oignon: "2" },
      { nb:  9, tomates: "13",  thon: "360 g", oeufs: "7",  olives: "270 g", anchois: "27", salade: "2",   oignon: "2" },
      { nb: 10, tomates: "15",  thon: "400 g", oeufs: "8",  olives: "300 g", anchois: "30", salade: "2",   oignon: "2" },
      { nb: 11, tomates: "16",  thon: "440 g", oeufs: "8",  olives: "330 g", anchois: "33", salade: "2½",  oignon: "2" },
      { nb: 12, tomates: "18",  thon: "480 g", oeufs: "9",  olives: "360 g", anchois: "36", salade: "2½",  oignon: "3" },
      { nb: 13, tomates: "20", thon: "520 g", oeufs: "9.8", olives: "390 g", anchois: "39", salade: "3.2", oignon: "3.2" },
      { nb: 14, tomates: "21", thon: "560 g", oeufs: "10", olives: "420 g", anchois: "42", salade: "3.5", oignon: "3.5" },
      { nb: 15, tomates: "22", thon: "600 g", oeufs: "11", olives: "450 g", anchois: "45", salade: "3.8", oignon: "3.8" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🥚", titre: "Cuire les œufs durs",      detail: "Plonger les œufs dans l'eau bouillante. Refroidir sous l'eau froide, écaler et couper en quartiers.", badge: "⏱ 10 min" },
      { icone: "🍅", titre: "Préparer les légumes",     detail: "Laver et couper les tomates en quartiers. Émincer l'oignon rouge en fines rondelles. Laver et essorer la salade.", badge: null },
      { icone: "🐟", titre: "Préparer le thon",         detail: "Égoutter le thon et l'émietter grossièrement. Rincer les filets d'anchois.", badge: null },
      { icone: "🥗", titre: "Dresser la salade",        detail: "Disposer la salade dans un plat. Ajouter les tomates, l'oignon, les olives, le thon, les anchois et les œufs en quartiers. Ne pas mélanger — présenter chaque ingrédient séparément.", badge: null },
      { icone: "🫒", titre: "Assaisonner",              detail: "Arroser d'un généreux filet d'huile d'olive, saler, poivrer. Parsemer de basilic frais ciselé. Servir immédiatement.", badge: null },
    ]
  },

  saladecesar: {
    base: 4,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🥬",
    description: "La salade César avec sa sauce crémeuse à l'ail, parmesan, croûtons dorés et poulet grillé.",
    tableauSaladeCesar: [
      { nb:  1, laitue: "¼",  poulet: "50 g",  parmesan: "15 g",  pain: "1 tr.", ail: "½ gousse", citron: "¼" },
      { nb:  2, laitue: "½",  poulet: "100 g", parmesan: "30 g",  pain: "2 tr.", ail: "½ gousse", citron: "¼" },
      { nb:  3, laitue: "¾",  poulet: "150 g", parmesan: "45 g",  pain: "3 tr.", ail: "1 gousse",  citron: "½" },
      { nb:  4, laitue: "1",  poulet: "200 g", parmesan: "60 g",  pain: "4 tr.", ail: "1 gousse",  citron: "½" },
      { nb:  5, laitue: "1",  poulet: "250 g", parmesan: "75 g",  pain: "5 tr.", ail: "1 gousse",  citron: "½" },
      { nb:  6, laitue: "1½", poulet: "300 g", parmesan: "90 g",  pain: "6 tr.", ail: "2 gousses", citron: "1" },
      { nb:  7, laitue: "1½", poulet: "350 g", parmesan: "105 g", pain: "7 tr.", ail: "2 gousses", citron: "1" },
      { nb:  8, laitue: "2",  poulet: "400 g", parmesan: "120 g", pain: "8 tr.", ail: "2 gousses", citron: "1" },
      { nb:  9, laitue: "2",  poulet: "450 g", parmesan: "135 g", pain: "9 tr.", ail: "2 gousses", citron: "1" },
      { nb: 10, laitue: "2½", poulet: "500 g", parmesan: "150 g", pain: "10 tr.",ail: "3 gousses", citron: "1½" },
      { nb: 11, laitue: "2½", poulet: "550 g", parmesan: "165 g", pain: "11 tr.",ail: "3 gousses", citron: "1½" },
      { nb: 12, laitue: "3",  poulet: "600 g", parmesan: "180 g", pain: "12 tr.",ail: "3 gousses", citron: "2" },
      { nb: 13, laitue: "3.2", poulet: "650 g", parmesan: "195 g", pain: "13 tr.", ail: "3.2 gousse", citron: "½" },
      { nb: 14, laitue: "3.5", poulet: "700 g", parmesan: "210 g", pain: "14 tr.", ail: "3.5 gousse", citron: "½" },
      { nb: 15, laitue: "3.8", poulet: "750 g", parmesan: "225 g", pain: "15 tr.", ail: "3.8 gousse", citron: "½" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍞", titre: "Faire les croûtons",        detail: "Couper le pain en cubes. Les faire dorer à la poêle avec un filet d'huile d'olive et une gousse d'ail écrasée. Réserver.", badge: "⏱ 5 min" },
      { icone: "🍗", titre: "Griller le poulet",         detail: "Saler, poivrer et griller les escalopes de poulet à la poêle ou au four. Laisser reposer 5 min puis couper en tranches.", badge: "⏱ 10 min" },
      { icone: "🥚", titre: "Préparer la sauce César",   detail: "Mélanger : 2 jaunes d'œufs, 1 c.à.s de moutarde, jus de citron, ail pressé, 4 c.à.s d'huile d'olive, parmesan râpé, sel, poivre. Fouetter jusqu'à émulsion.", badge: null },
      { icone: "🥬", titre: "Dresser",                   detail: "Laver et déchirer la laitue romaine. La mélanger avec la sauce César. Disposer le poulet en tranches, les croûtons et des copeaux de parmesan.", badge: null },
    ]
  },

  saladegreque: {
    base: 4,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🫒",
    description: "La salade grecque fraîche et colorée — tomates, concombre, feta, olives et oignon rouge. Idéale l'été.",
    tableauSaladeGreque: [
      { nb:  1, tomates: "1",  concombre: "¼",  feta: "40 g",  olives: "15 g",  oignon: "¼" },
      { nb:  2, tomates: "2",  concombre: "½",  feta: "80 g",  olives: "30 g",  oignon: "½" },
      { nb:  3, tomates: "3",  concombre: "¾",  feta: "120 g", olives: "45 g",  oignon: "½" },
      { nb:  4, tomates: "4",  concombre: "1",  feta: "160 g", olives: "60 g",  oignon: "1" },
      { nb:  5, tomates: "5",  concombre: "1",  feta: "200 g", olives: "75 g",  oignon: "1" },
      { nb:  6, tomates: "6",  concombre: "1½", feta: "240 g", olives: "90 g",  oignon: "1" },
      { nb:  7, tomates: "7",  concombre: "1½", feta: "280 g", olives: "105 g", oignon: "1" },
      { nb:  8, tomates: "8",  concombre: "2",  feta: "320 g", olives: "120 g", oignon: "2" },
      { nb:  9, tomates: "9",  concombre: "2",  feta: "360 g", olives: "135 g", oignon: "2" },
      { nb: 10, tomates: "10", concombre: "2½", feta: "400 g", olives: "150 g", oignon: "2" },
      { nb: 11, tomates: "11", concombre: "2½", feta: "440 g", olives: "165 g", oignon: "2" },
      { nb: 12, tomates: "12", concombre: "3",  feta: "480 g", olives: "180 g", oignon: "3" },
      { nb: 13, tomates: "13", concombre: "3.2", feta: "520 g", olives: "195 g", oignon: "3.2" },
      { nb: 14, tomates: "14", concombre: "3.5", feta: "560 g", olives: "210 g", oignon: "3.5" },
      { nb: 15, tomates: "15", concombre: "3.8", feta: "600 g", olives: "225 g", oignon: "3.8" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍅", titre: "Couper les légumes",    detail: "Couper les tomates en quartiers, le concombre en demi-rondelles, l'oignon rouge en fines lamelles. Disposer dans un saladier.", badge: null },
      { icone: "🫒", titre: "Ajouter les olives",    detail: "Ajouter les olives noires de Kalamata. Émietter ou couper la feta en cubes et disposer par-dessus.", badge: null },
      { icone: "🌿", titre: "Assaisonner",           detail: "Arroser d'huile d'olive généreusement. Saupoudrer d'origan séché. Saler légèrement (la feta est déjà salée), poivrer. Servir immédiatement.", badge: null },
    ]
  },

  saladepatasthon: {
    base: 4,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🍝",
    description: "Une salade de pâtes au thon fraîche et rassasiante — parfaite pour un déjeuner estival rapide.",
    tableauSaladePatas: [
      { nb:  1, pates: "60 g",   thon: "40 g",  tomates: "2",  mais: "30 g",  oignon: "¼" },
      { nb:  2, pates: "120 g",  thon: "80 g",  tomates: "3",  mais: "60 g",  oignon: "½" },
      { nb:  3, pates: "180 g",  thon: "120 g", tomates: "4",  mais: "90 g",  oignon: "½" },
      { nb:  4, pates: "250 g",  thon: "160 g", tomates: "6",  mais: "120 g", oignon: "1" },
      { nb:  5, pates: "310 g",  thon: "200 g", tomates: "7",  mais: "150 g", oignon: "1" },
      { nb:  6, pates: "370 g",  thon: "240 g", tomates: "9",  mais: "180 g", oignon: "1" },
      { nb:  7, pates: "430 g",  thon: "280 g", tomates: "10", mais: "210 g", oignon: "1" },
      { nb:  8, pates: "500 g",  thon: "320 g", tomates: "12", mais: "240 g", oignon: "2" },
      { nb:  9, pates: "560 g",  thon: "360 g", tomates: "13", mais: "270 g", oignon: "2" },
      { nb: 10, pates: "620 g",  thon: "400 g", tomates: "15", mais: "300 g", oignon: "2" },
      { nb: 11, pates: "680 g",  thon: "440 g", tomates: "16", mais: "330 g", oignon: "2" },
      { nb: 12, pates: "750 g",  thon: "480 g", tomates: "18", mais: "360 g", oignon: "3" },
      { nb: 13, pates: "812 g", thon: "520 g", tomates: "20", mais: "390 g", oignon: "3.2" },
      { nb: 14, pates: "875 g", thon: "560 g", tomates: "21", mais: "420 g", oignon: "3.5" },
      { nb: 15, pates: "938 g", thon: "600 g", tomates: "22", mais: "450 g", oignon: "3.8" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍝", titre: "Cuire les pâtes",       detail: "Cuire les pâtes courtes (fusilli, farfalle, penne) dans l'eau bouillante salée. Les égoutter et les rincer à l'eau froide pour stopper la cuisson. Laisser refroidir.", badge: "⏱ selon paquet" },
      { icone: "🐟", titre: "Préparer le thon",      detail: "Égoutter le thon et l'émietter. Couper les tomates cerises en deux, émincer l'oignon.", badge: null },
      { icone: "🥗", titre: "Assembler",             detail: "Mélanger les pâtes froides avec le thon, les tomates, le maïs et l'oignon. Ajouter des olives et du basilic si souhaité.", badge: null },
      { icone: "🫒", titre: "Assaisonner",           detail: "Assaisonner avec de l'huile d'olive, du vinaigre de cidre, du sel et du poivre. Bien mélanger. Réfrigérer 30 min avant de servir.", badge: "⏱ 30 min au frais" },
    ]
  },

  saladerizmediterranee: {
    base: 4,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🍚",
    description: "Une salade de riz méditerranéenne colorée aux légumes grillés, olives et herbes fraîches.",
    tableauSaladeRiz: [
      { nb:  1, riz: "60 g",   poivron: "¼",  courgette: "¼",  tomates: "2",  olives: "20 g" },
      { nb:  2, riz: "120 g",  poivron: "½",  courgette: "½",  tomates: "3",  olives: "40 g" },
      { nb:  3, riz: "180 g",  poivron: "¾",  courgette: "¾",  tomates: "4",  olives: "60 g" },
      { nb:  4, riz: "250 g",  poivron: "1",  courgette: "1",  tomates: "6",  olives: "80 g" },
      { nb:  5, riz: "310 g",  poivron: "1",  courgette: "1",  tomates: "7",  olives: "100 g"},
      { nb:  6, riz: "370 g",  poivron: "1½", courgette: "1½", tomates: "9",  olives: "120 g"},
      { nb:  7, riz: "430 g",  poivron: "1½", courgette: "1½", tomates: "10", olives: "140 g"},
      { nb:  8, riz: "500 g",  poivron: "2",  courgette: "2",  tomates: "12", olives: "160 g"},
      { nb:  9, riz: "560 g",  poivron: "2",  courgette: "2",  tomates: "13", olives: "180 g"},
      { nb: 10, riz: "620 g",  poivron: "2½", courgette: "2½", tomates: "15", olives: "200 g"},
      { nb: 11, riz: "680 g",  poivron: "2½", courgette: "2½", tomates: "16", olives: "220 g"},
      { nb: 12, riz: "750 g",  poivron: "3",  courgette: "3",  tomates: "18", olives: "240 g"},
      { nb: 13, riz: "812 g", poivron: "3.2", courgette: "3.2", tomates: "20", olives: "260 g" },
      { nb: 14, riz: "875 g", poivron: "3.5", courgette: "3.5", tomates: "21", olives: "280 g" },
      { nb: 15, riz: "938 g", poivron: "3.8", courgette: "3.8", tomates: "22", olives: "300 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍚", titre: "Cuire le riz",          detail: "Cuire le riz dans l'eau bouillante salée. Égoutter et rincer à l'eau froide. Laisser refroidir complètement.", badge: "⏱ 15 min" },
      { icone: "🔥", titre: "Griller les légumes",   detail: "Couper poivron et courgette en dés. Faire griller à la poêle avec un filet d'huile d'olive jusqu'à légère coloration. Laisser refroidir.", badge: "⏱ 8 min" },
      { icone: "🥗", titre: "Assembler",             detail: "Mélanger le riz froid avec les légumes grillés refroidis, les tomates cerises coupées en deux et les olives.", badge: null },
      { icone: "🌿", titre: "Assaisonner",           detail: "Arroser d'huile d'olive, jus de citron, sel, poivre. Ajouter du basilic et du persil frais ciselés. Réfrigérer avant de servir.", badge: "⏱ 30 min au frais" },
    ]
  },

  tabulemaison: {
    base: 4,
    temps: "20 min + repos",
    niveau: "⭐ Facile",
    emoji: "🌿",
    description: "Un taboulé maison frais et parfumé — semoule, tomates, concombre, menthe et citron. Le classique de l'été.",
    tableauTabule: [
      { nb:  1, semoule: "40 g",  tomates: "1",  concombre: "¼",  persil: "¼ botte",  menthe: "5 feuilles",  citron: "¼" },
      { nb:  2, semoule: "80 g",  tomates: "2",  concombre: "½",  persil: "½ botte",  menthe: "10 feuilles", citron: "½" },
      { nb:  3, semoule: "120 g", tomates: "3",  concombre: "½",  persil: "½ botte",  menthe: "15 feuilles", citron: "½" },
      { nb:  4, semoule: "160 g", tomates: "4",  concombre: "1",  persil: "1 botte",  menthe: "20 feuilles", citron: "1" },
      { nb:  5, semoule: "200 g", tomates: "5",  concombre: "1",  persil: "1 botte",  menthe: "25 feuilles", citron: "1" },
      { nb:  6, semoule: "240 g", tomates: "6",  concombre: "1½", persil: "1½ botte", menthe: "30 feuilles", citron: "1" },
      { nb:  7, semoule: "280 g", tomates: "7",  concombre: "1½", persil: "1½ botte", menthe: "35 feuilles", citron: "1½" },
      { nb:  8, semoule: "320 g", tomates: "8",  concombre: "2",  persil: "2 bottes", menthe: "40 feuilles", citron: "2" },
      { nb:  9, semoule: "360 g", tomates: "9",  concombre: "2",  persil: "2 bottes", menthe: "45 feuilles", citron: "2" },
      { nb: 10, semoule: "400 g", tomates: "10", concombre: "2½", persil: "2 bottes", menthe: "50 feuilles", citron: "2" },
      { nb: 11, semoule: "440 g", tomates: "11", concombre: "2½", persil: "2½ bottes",menthe: "55 feuilles", citron: "2½" },
      { nb: 12, semoule: "480 g", tomates: "12", concombre: "3",  persil: "3 bottes", menthe: "60 feuilles", citron: "3" },
      { nb: 13, semoule: "520 g", tomates: "13", concombre: "3.2", persil: "3.2 botte", menthe: "65 feuilles", citron: "3.2" },
      { nb: 14, semoule: "560 g", tomates: "14", concombre: "3.5", persil: "3.5 botte", menthe: "70 feuilles", citron: "3.5" },
      { nb: 15, semoule: "600 g", tomates: "15", concombre: "3.8", persil: "3.8 botte", menthe: "75 feuilles", citron: "3.8" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Hydrater la semoule",   detail: "Verser la semoule dans un saladier. Ajouter la même quantité d'eau bouillante salée. Couvrir et laisser gonfler 5 min. Égrainer à la fourchette et laisser refroidir.", badge: "⏱ 5 min repos" },
      { icone: "🍅", titre: "Préparer les légumes",  detail: "Couper les tomates et le concombre épépiné en très petits dés. Ciseler finement le persil plat et la menthe.", badge: null },
      { icone: "🥗", titre: "Mélanger",              detail: "Ajouter les légumes et les herbes à la semoule refroidie. Bien mélanger.", badge: null },
      { icone: "🍋", titre: "Assaisonner et reposer",detail: "Arroser de jus de citron et d'huile d'olive. Saler, poivrer. Mélanger et réfrigérer. Plus le taboulé repose, plus il est savoureux !", badge: "⏱ 1h minimum au frais" },
    ]
  },

  saladelentilles: {
    base: 4,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🫘",
    description: "Une salade de lentilles tiède ou froide — légumineuses, légumes croquants et vinaigrette moutardée.",
    tableauSaladeLentilles: [
      { nb:  1, lentilles: "60 g",  carottes: "½",  oignon: "¼", lardons: "25 g" },
      { nb:  2, lentilles: "120 g", carottes: "1",  oignon: "½", lardons: "50 g" },
      { nb:  3, lentilles: "180 g", carottes: "1",  oignon: "½", lardons: "75 g" },
      { nb:  4, lentilles: "250 g", carottes: "2",  oignon: "1", lardons: "100 g"},
      { nb:  5, lentilles: "310 g", carottes: "2",  oignon: "1", lardons: "125 g"},
      { nb:  6, lentilles: "370 g", carottes: "3",  oignon: "1", lardons: "150 g"},
      { nb:  7, lentilles: "430 g", carottes: "3",  oignon: "1", lardons: "175 g"},
      { nb:  8, lentilles: "500 g", carottes: "4",  oignon: "2", lardons: "200 g"},
      { nb:  9, lentilles: "560 g", carottes: "4",  oignon: "2", lardons: "225 g"},
      { nb: 10, lentilles: "620 g", carottes: "5",  oignon: "2", lardons: "250 g"},
      { nb: 11, lentilles: "680 g", carottes: "5",  oignon: "2", lardons: "275 g"},
      { nb: 12, lentilles: "750 g", carottes: "6",  oignon: "3", lardons: "300 g"},
      { nb: 13, lentilles: "812 g", carottes: "6.5", oignon: "3.2", lardons: "325 g" },
      { nb: 14, lentilles: "875 g", carottes: "7", oignon: "3.5", lardons: "350 g" },
      { nb: 15, lentilles: "938 g", carottes: "7.5", oignon: "3.8", lardons: "375 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🫘", titre: "Cuire les lentilles",   detail: "Rincer les lentilles vertes (du Puy de préférence). Les plonger dans l'eau froide avec un bouquet garni et les carottes coupées. Porter à ébullition puis cuire à feu moyen. Ne pas saler en début de cuisson.", badge: "⏱ 20–25 min" },
      { icone: "🥓", titre: "Faire revenir les lardons", detail: "Faire dorer les lardons à la poêle sans matière grasse. Égoutter sur du papier absorbant.", badge: "⏱ 5 min" },
      { icone: "🥣", titre: "Préparer la vinaigrette", detail: "Mélanger 1 c.à.s de moutarde, 2 c.à.s de vinaigre de vin, 4 c.à.s d'huile d'olive, sel et poivre. Bien fouetter.", badge: null },
      { icone: "🥗", titre: "Assembler",             detail: "Égoutter les lentilles encore chaudes et les mélanger immédiatement avec la vinaigrette. Ajouter les lardons et l'oignon émincé. Servir tiède ou froid.", badge: null },
    ]
  },

  saladeavocatcrevettes: {
    base: 4,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🥑",
    description: "Une salade fraîche et élégante — avocat crémeux, crevettes roses et sauce cocktail. Parfaite en entrée.",
    tableauAvocatCrevettes: [
      { nb:  1, avocats: "½",  crevettes: "60 g",  salade: "¼",  citron: "¼" },
      { nb:  2, avocats: "1",  crevettes: "120 g", salade: "½",  citron: "½" },
      { nb:  3, avocats: "1½", crevettes: "180 g", salade: "¾",  citron: "½" },
      { nb:  4, avocats: "2",  crevettes: "250 g", salade: "1",  citron: "1" },
      { nb:  5, avocats: "2½", crevettes: "300 g", salade: "1",  citron: "1" },
      { nb:  6, avocats: "3",  crevettes: "370 g", salade: "1½", citron: "1" },
      { nb:  7, avocats: "3½", crevettes: "430 g", salade: "1½", citron: "1½" },
      { nb:  8, avocats: "4",  crevettes: "500 g", salade: "2",  citron: "2" },
      { nb:  9, avocats: "4½", crevettes: "560 g", salade: "2",  citron: "2" },
      { nb: 10, avocats: "5",  crevettes: "620 g", salade: "2½", citron: "2" },
      { nb: 11, avocats: "5½", crevettes: "680 g", salade: "2½", citron: "2½" },
      { nb: 12, avocats: "6",  crevettes: "750 g", salade: "3",  citron: "3" },
      { nb: 13, avocats: "6.5", crevettes: "812 g", salade: "3.2", citron: "3.2" },
      { nb: 14, avocats: "7", crevettes: "875 g", salade: "3.5", citron: "3.5" },
      { nb: 15, avocats: "7.5", crevettes: "938 g", salade: "3.8", citron: "3.8" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🥑", titre: "Préparer les avocats",  detail: "Couper les avocats en deux, retirer le noyau. Les couper en tranches ou en dés. Arroser immédiatement de jus de citron pour éviter l'oxydation.", badge: null },
      { icone: "🦐", titre: "Préparer les crevettes",detail: "Si besoin, décortiquer les crevettes roses cuites. Les garder entières ou les couper en deux.", badge: null },
      { icone: "🍶", titre: "Préparer la sauce cocktail",detail: "Mélanger 3 c.à.s de mayonnaise, 1 c.à.s de ketchup, quelques gouttes de Tabasco, jus de citron, sel et poivre.", badge: null },
      { icone: "🥗", titre: "Dresser",               detail: "Disposer la salade dans les assiettes. Ajouter l'avocat et les crevettes. Napper de sauce cocktail. Garnir d'aneth ou de ciboulette.", badge: null },
    ]
  },

  pouletcitronthym: {
    base: 2,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🍋",
    description: "Filets de poulet dorés au citron et thym frais, accompagnés de pommes de terre rôties et haricots verts croquants.",
    tableauPouletCitron: [
      { nb:  1, poulet: "150 g", pdterre: "200 g", haricots: "100 g", citron: "½", creme: "50 ml" },
      { nb:  2, poulet: "300 g", pdterre: "400 g", haricots: "200 g", citron: "1",  creme: "100 ml"},
      { nb:  3, poulet: "450 g", pdterre: "600 g", haricots: "300 g", citron: "1",  creme: "150 ml"},
      { nb:  4, poulet: "600 g", pdterre: "800 g", haricots: "400 g", citron: "2",  creme: "200 ml"},
      { nb:  5, poulet: "750 g", pdterre: "1 kg",  haricots: "500 g", citron: "2",  creme: "250 ml"},
      { nb:  6, poulet: "900 g", pdterre: "1.2 kg",haricots: "600 g", citron: "3",  creme: "300 ml"},
      { nb:  7, poulet: "1050 g", pdterre: "1400 g", haricots: "700 g", citron: "3.5", creme: "350 ml" },
      { nb:  8, poulet: "1200 g", pdterre: "1600 g", haricots: "800 g", citron: "4", creme: "400 ml" },
      { nb:  9, poulet: "1350 g", pdterre: "1800 g", haricots: "900 g", citron: "4.5", creme: "450 ml" },
      { nb: 10, poulet: "1500 g", pdterre: "2000 g", haricots: "1000 g", citron: "5", creme: "500 ml" },
      { nb: 11, poulet: "1650 g", pdterre: "2200 g", haricots: "1100 g", citron: "5.5", creme: "550 ml" },
      { nb: 12, poulet: "1800 g", pdterre: "2400 g", haricots: "1200 g", citron: "6", creme: "600 ml" },
      { nb: 13, poulet: "1950 g", pdterre: "2600 g", haricots: "1300 g", citron: "6.5", creme: "650 ml" },
      { nb: 14, poulet: "2100 g", pdterre: "2800 g", haricots: "1400 g", citron: "7", creme: "700 ml" },
      { nb: 15, poulet: "2250 g", pdterre: "3000 g", haricots: "1500 g", citron: "7.5", creme: "750 ml" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Préchauffer le four",       detail: "Préchauffer à 200°C. Couper les pommes de terre en quartiers, les enrober d'huile d'olive, sel, poivre et thym. Enfourner.", badge: "⏱ 25 min" },
      { icone: "🍋", titre: "Préparer le poulet",        detail: "Aplatir légèrement les filets. Assaisonner avec sel, poivre, zeste de citron et thym frais.", badge: null },
      { icone: "🍳", titre: "Cuire le poulet",           detail: "Dans une poêle chaude avec huile d'olive, cuire les filets 4-5 min de chaque côté jusqu'à belle dorure. Déglacer avec le jus de citron.", badge: "⏱ 10 min" },
      { icone: "🥗", titre: "Cuire les haricots verts",  detail: "Blanchir les haricots verts 4 min dans l'eau bouillante salée. Égoutter et assaisonner avec beurre et sel.", badge: "⏱ 4 min" },
      { icone: "🍦", titre: "Sauce citronnée",           detail: "Dans la même poêle, ajouter la crème fraîche et le reste du jus de citron. Laisser réduire 2 min. Servir avec le poulet et les légumes.", badge: null },
    ]
  },

  salmonteriyaki: {
    base: 2,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🐟",
    description: "Pavés de saumon glacés à la sauce teriyaki maison, servis avec riz à sushi et edamame. Une recette japonaise accessible.",
    tableauSalmonTeriyaki: [
      { nb:  1, saumon: "150 g", riz: "80 g",  edamame: "60 g",  sojaS: "1 c.à.s", miel: "1 c.à.c", gingembre: "½ cm" },
      { nb:  2, saumon: "300 g", riz: "160 g", edamame: "120 g", sojaS: "2 c.à.s", miel: "2 c.à.c", gingembre: "1 cm" },
      { nb:  3, saumon: "450 g", riz: "240 g", edamame: "180 g", sojaS: "3 c.à.s", miel: "3 c.à.c", gingembre: "1 cm" },
      { nb:  4, saumon: "600 g", riz: "320 g", edamame: "240 g", sojaS: "4 c.à.s", miel: "4 c.à.c", gingembre: "2 cm" },
      { nb:  5, saumon: "750 g", riz: "400 g", edamame: "300 g", sojaS: "5 c.à.s", miel: "5 c.à.c", gingembre: "2 cm" },
      { nb:  6, saumon: "900 g", riz: "480 g", edamame: "360 g", sojaS: "6 c.à.s", miel: "6 c.à.c", gingembre: "3 cm" },
      { nb:  7, saumon: "1050 g", riz: "560 g", edamame: "420 g", sojaS: "7 c.à.s", miel: "7 c.à.c", gingembre: "3.5 cm" },
      { nb:  8, saumon: "1200 g", riz: "640 g", edamame: "480 g", sojaS: "8 c.à.s", miel: "8 c.à.c", gingembre: "4 cm" },
      { nb:  9, saumon: "1350 g", riz: "720 g", edamame: "540 g", sojaS: "9 c.à.s", miel: "9 c.à.c", gingembre: "4.5 cm" },
      { nb: 10, saumon: "1500 g", riz: "800 g", edamame: "600 g", sojaS: "10 c.à.s", miel: "10 c.à.c", gingembre: "5 cm" },
      { nb: 11, saumon: "1650 g", riz: "880 g", edamame: "660 g", sojaS: "11 c.à.s", miel: "11 c.à.c", gingembre: "5.5 cm" },
      { nb: 12, saumon: "1800 g", riz: "960 g", edamame: "720 g", sojaS: "12 c.à.s", miel: "12 c.à.c", gingembre: "6 cm" },
      { nb: 13, saumon: "1950 g", riz: "1040 g", edamame: "780 g", sojaS: "13 c.à.s", miel: "13 c.à.c", gingembre: "6.5 cm" },
      { nb: 14, saumon: "2100 g", riz: "1120 g", edamame: "840 g", sojaS: "14 c.à.s", miel: "14 c.à.c", gingembre: "7 cm" },
      { nb: 15, saumon: "2250 g", riz: "1200 g", edamame: "900 g", sojaS: "15 c.à.s", miel: "15 c.à.c", gingembre: "7.5 cm" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍚", titre: "Cuire le riz",              detail: "Rincer le riz. Cuire dans 1.5x son volume d'eau froide. Porter à ébullition, baisser à feu doux, couvrir et cuire jusqu'à absorption.", badge: "⏱ 15 min" },
      { icone: "🍶", titre: "Préparer la sauce teriyaki",detail: "Mélanger sauce soja, miel, gingembre râpé et 1 c.à.c de fécule de maïs. Réserver.", badge: null },
      { icone: "🐟", titre: "Cuire le saumon",          detail: "Chauffer une poêle à feu vif. Cuire les pavés côté peau 3 min, retourner et cuire 2 min. Le cœur doit rester légèrement rosé.", badge: "⏱ 5 min" },
      { icone: "🍯", titre: "Glacer le saumon",          detail: "Verser la sauce teriyaki sur le saumon. Laisser caraméliser 1-2 min en arrosant régulièrement.", badge: "⏱ 2 min" },
      { icone: "🥢", titre: "Dresser",                   detail: "Servir le saumon sur le riz avec les edamame. Parsemer de graines de sésame et ciboule émincée.", badge: null },
    ]
  },

  bolognaisemaison: {
    base: 4,
    temps: "45 min",
    niveau: "⭐ Facile",
    emoji: "🍝",
    description: "Une bolognaise maison mijotée lentement — viande hachée, tomates, vin rouge et herbes. La vraie recette italienne.",
    tableauBolognaise: [
      { nb:  1, viande: "125 g", pates: "80 g",  tomates: "100 g", vin: "25 ml",  oignon: "¼" },
      { nb:  2, viande: "250 g", pates: "160 g", tomates: "200 g", vin: "50 ml",  oignon: "½" },
      { nb:  3, viande: "375 g", pates: "240 g", tomates: "300 g", vin: "75 ml",  oignon: "¾" },
      { nb:  4, viande: "500 g", pates: "320 g", tomates: "400 g", vin: "100 ml", oignon: "1" },
      { nb:  5, viande: "625 g", pates: "400 g", tomates: "500 g", vin: "125 ml", oignon: "1" },
      { nb:  6, viande: "750 g", pates: "480 g", tomates: "600 g", vin: "150 ml", oignon: "1½"},
      { nb:  7, viande: "875 g", pates: "560 g", tomates: "700 g", vin: "175 ml", oignon: "1.8" },
      { nb:  8, viande: "1000 g", pates: "640 g", tomates: "800 g", vin: "200 ml", oignon: "2" },
      { nb:  9, viande: "1125 g", pates: "720 g", tomates: "900 g", vin: "225 ml", oignon: "2.2" },
      { nb: 10, viande: "1250 g", pates: "800 g", tomates: "1000 g", vin: "250 ml", oignon: "2.5" },
      { nb: 11, viande: "1375 g", pates: "880 g", tomates: "1100 g", vin: "275 ml", oignon: "2.8" },
      { nb: 12, viande: "1500 g", pates: "960 g", tomates: "1200 g", vin: "300 ml", oignon: "3" },
      { nb: 13, viande: "1625 g", pates: "1040 g", tomates: "1300 g", vin: "325 ml", oignon: "3.2" },
      { nb: 14, viande: "1750 g", pates: "1120 g", tomates: "1400 g", vin: "350 ml", oignon: "3.5" },
      { nb: 15, viande: "1875 g", pates: "1200 g", tomates: "1500 g", vin: "375 ml", oignon: "3.8" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Faire revenir les aromates", detail: "Émincer finement oignon, carotte et céleri. Faire revenir dans l'huile d'olive à feu moyen 5-6 min.", badge: null },
      { icone: "🥩", titre: "Dorer la viande",           detail: "Ajouter la viande hachée (bœuf ou mélange bœuf/porc). Bien la défaire à la spatule. Faire dorer 5 min à feu vif.", badge: null },
      { icone: "🍷", titre: "Déglacer au vin rouge",     detail: "Verser le vin rouge. Laisser évaporer presque complètement en grattant le fond de la casserole.", badge: "⏱ 3 min" },
      { icone: "🍅", titre: "Ajouter les tomates",       detail: "Ajouter les tomates concassées, une pincée de sucre, sel, poivre et herbes (thym, laurier, basilic). Bien mélanger.", badge: null },
      { icone: "⏳", titre: "Mijoter",                   detail: "Baisser le feu au minimum, couvrir partiellement et laisser mijoter en remuant de temps en temps. Plus ça mijote, meilleur c'est !", badge: "⏱ 30 min minimum" },
      { icone: "🍝", titre: "Cuire les pâtes et servir", detail: "Cuire les tagliatelles ou spaghetti al dente. Mélanger avec la sauce. Servir avec parmesan râpé.", badge: null },
    ]
  },

  tacosmaison: {
    base: 2,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🌮",
    description: "Tacos mexicains maison — bœuf épicé, guacamole frais, pico de gallo et crème sure. Un festin coloré et convivial.",
    tableauTacos: [
      { nb:  1, boeuf: "125 g", tortillas: "2",  avocat: "½",  tomate: "1",  fromage: "30 g"  },
      { nb:  2, boeuf: "250 g", tortillas: "4",  avocat: "1",  tomate: "2",  fromage: "60 g"  },
      { nb:  3, boeuf: "375 g", tortillas: "6",  avocat: "1",  tomate: "3",  fromage: "90 g"  },
      { nb:  4, boeuf: "500 g", tortillas: "8",  avocat: "2",  tomate: "4",  fromage: "120 g" },
      { nb:  5, boeuf: "625 g", tortillas: "10", avocat: "2",  tomate: "5",  fromage: "150 g" },
      { nb:  6, boeuf: "750 g", tortillas: "12", avocat: "3",  tomate: "6",  fromage: "180 g" },
      { nb:  7, boeuf: "875 g", tortillas: "14", avocat: "3.5", tomate: "7", fromage: "210 g" },
      { nb:  8, boeuf: "1000 g", tortillas: "16", avocat: "4", tomate: "8", fromage: "240 g" },
      { nb:  9, boeuf: "1125 g", tortillas: "18", avocat: "4.5", tomate: "9", fromage: "270 g" },
      { nb: 10, boeuf: "1250 g", tortillas: "20", avocat: "5", tomate: "10", fromage: "300 g" },
      { nb: 11, boeuf: "1375 g", tortillas: "22", avocat: "5.5", tomate: "11", fromage: "330 g" },
      { nb: 12, boeuf: "1500 g", tortillas: "24", avocat: "6", tomate: "12", fromage: "360 g" },
      { nb: 13, boeuf: "1625 g", tortillas: "26", avocat: "6.5", tomate: "13", fromage: "390 g" },
      { nb: 14, boeuf: "1750 g", tortillas: "28", avocat: "7", tomate: "14", fromage: "420 g" },
      { nb: 15, boeuf: "1875 g", tortillas: "30", avocat: "7.5", tomate: "15", fromage: "450 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌮", titre: "Épices pour le bœuf",       detail: "Mélanger : cumin, paprika fumé, origan, piment doux, ail en poudre, sel. Enrober la viande hachée de ce mélange.", badge: null },
      { icone: "🥩", titre: "Cuire la viande",           detail: "Faire revenir le bœuf épicé dans une poêle chaude jusqu'à belle coloration. Ajouter un filet de jus de citron vert en fin de cuisson.", badge: "⏱ 8 min" },
      { icone: "🥑", titre: "Guacamole rapide",          detail: "Écraser l'avocat à la fourchette avec jus de citron vert, sel, coriandre et piment (optionnel).", badge: null },
      { icone: "🍅", titre: "Pico de gallo",             detail: "Mélanger tomates en dés, oignon rouge émincé, coriandre, jus de citron vert et sel.", badge: null },
      { icone: "🌮", titre: "Assembler et servir",       detail: "Réchauffer les tortillas à sec dans une poêle. Garnir de bœuf, guacamole, pico de gallo, fromage râpé et crème sure. Déguster immédiatement !", badge: null },
    ]
  },

  padthai: {
    base: 2,
    temps: "20 min",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🍜",
    description: "Le pad thaï authentique — nouilles de riz sautées aux crevettes, tofu, œufs et sauce tamarin. La recette street food thaïlandaise.",
    tableauPadThai: [
      { nb:  1, nouilles: "80 g",  crevettes: "80 g",  tofu: "50 g",  oeufs: "1",  cacahetes: "20 g" },
      { nb:  2, nouilles: "160 g", crevettes: "160 g", tofu: "100 g", oeufs: "2",  cacahetes: "40 g" },
      { nb:  3, nouilles: "240 g", crevettes: "240 g", tofu: "150 g", oeufs: "3",  cacahetes: "60 g" },
      { nb:  4, nouilles: "320 g", crevettes: "320 g", tofu: "200 g", oeufs: "4",  cacahetes: "80 g" },
      { nb:  5, nouilles: "400 g", crevettes: "400 g", tofu: "250 g", oeufs: "5",  cacahetes: "100 g"},
      { nb:  6, nouilles: "480 g", crevettes: "480 g", tofu: "300 g", oeufs: "6",  cacahetes: "120 g"},
      { nb:  7, nouilles: "560 g", crevettes: "560 g", tofu: "350 g", oeufs: "7", cacahetes: "140 g" },
      { nb:  8, nouilles: "640 g", crevettes: "640 g", tofu: "400 g", oeufs: "8", cacahetes: "160 g" },
      { nb:  9, nouilles: "720 g", crevettes: "720 g", tofu: "450 g", oeufs: "9", cacahetes: "180 g" },
      { nb: 10, nouilles: "800 g", crevettes: "800 g", tofu: "500 g", oeufs: "10", cacahetes: "200 g" },
      { nb: 11, nouilles: "880 g", crevettes: "880 g", tofu: "550 g", oeufs: "11", cacahetes: "220 g" },
      { nb: 12, nouilles: "960 g", crevettes: "960 g", tofu: "600 g", oeufs: "12", cacahetes: "240 g" },
      { nb: 13, nouilles: "1040 g", crevettes: "1040 g", tofu: "650 g", oeufs: "13", cacahetes: "260 g" },
      { nb: 14, nouilles: "1120 g", crevettes: "1120 g", tofu: "700 g", oeufs: "14", cacahetes: "280 g" },
      { nb: 15, nouilles: "1200 g", crevettes: "1200 g", tofu: "750 g", oeufs: "15", cacahetes: "300 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍜", titre: "Tremper les nouilles",      detail: "Faire tremper les nouilles de riz dans l'eau froide 30 min, ou les cuire al dente selon le paquet. Égoutter.", badge: "⏱ 30 min trempage" },
      { icone: "🍶", titre: "Sauce pad thaï",            detail: "Mélanger : 3 c.à.s sauce poisson, 2 c.à.s tamarin, 1 c.à.s sucre de palme (ou sucre roux). Goûter et ajuster.", badge: null },
      { icone: "🔥", titre: "Sauter le tofu et crevettes", detail: "Dans un wok très chaud avec huile, faire dorer le tofu en cubes 3 min. Ajouter les crevettes, cuire 2 min.", badge: "⏱ 5 min" },
      { icone: "🥚", titre: "Ajouter les œufs",          detail: "Pousser le tout sur le côté. Casser les œufs dans le wok et les brouiller rapidement avant de les mélanger.", badge: null },
      { icone: "🍜", titre: "Finir le plat",             detail: "Ajouter les nouilles et la sauce. Sauter à feu vif 2-3 min en mélangeant bien. Servir avec cacahuètes, germes de soja, citron vert et coriandre.", badge: "⏱ 3 min" },
    ]
  },

  currypouletcoco: {
    base: 4,
    temps: "35 min",
    niveau: "⭐ Facile",
    emoji: "🍛",
    description: "Curry de poulet au lait de coco thaïlandais — onctueux, parfumé et légèrement épicé. Servir avec du riz jasmin.",
    tableauCurryPoulet: [
      { nb:  1, poulet: "150 g", coco: "100 ml", riz: "80 g",  pateC: "½ c.à.s", epinards: "30 g"  },
      { nb:  2, poulet: "300 g", coco: "200 ml", riz: "160 g", pateC: "1 c.à.s",  epinards: "60 g"  },
      { nb:  3, poulet: "450 g", coco: "300 ml", riz: "240 g", pateC: "1½ c.à.s", epinards: "90 g"  },
      { nb:  4, poulet: "600 g", coco: "400 ml", riz: "320 g", pateC: "2 c.à.s",  epinards: "120 g" },
      { nb:  5, poulet: "750 g", coco: "500 ml", riz: "400 g", pateC: "2½ c.à.s", epinards: "150 g" },
      { nb:  6, poulet: "900 g", coco: "600 ml", riz: "480 g", pateC: "3 c.à.s",  epinards: "180 g" },
      { nb:  7, poulet: "1050 g", coco: "700 ml", riz: "560 g", pateC: "3.5 c.à.s", epinards: "210 g" },
      { nb:  8, poulet: "1200 g", coco: "800 ml", riz: "640 g", pateC: "4 c.à.s", epinards: "240 g" },
      { nb:  9, poulet: "1350 g", coco: "900 ml", riz: "720 g", pateC: "4.5 c.à.s", epinards: "270 g" },
      { nb: 10, poulet: "1500 g", coco: "1000 ml", riz: "800 g", pateC: "5 c.à.s", epinards: "300 g" },
      { nb: 11, poulet: "1650 g", coco: "1100 ml", riz: "880 g", pateC: "5.5 c.à.s", epinards: "330 g" },
      { nb: 12, poulet: "1800 g", coco: "1200 ml", riz: "960 g", pateC: "6 c.à.s", epinards: "360 g" },
      { nb: 13, poulet: "1950 g", coco: "1300 ml", riz: "1040 g", pateC: "6.5 c.à.s", epinards: "390 g" },
      { nb: 14, poulet: "2100 g", coco: "1400 ml", riz: "1120 g", pateC: "7 c.à.s", epinards: "420 g" },
      { nb: 15, poulet: "2250 g", coco: "1500 ml", riz: "1200 g", pateC: "7.5 c.à.s", epinards: "450 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍚", titre: "Cuire le riz jasmin",       detail: "Rincer le riz et cuire dans 1.5x son volume d'eau. Porter à ébullition, couvrir et cuire à feu doux.", badge: "⏱ 15 min" },
      { icone: "🌶️", titre: "Faire revenir la pâte curry",detail: "Dans une casserole, faire revenir la pâte de curry vert (ou rouge) avec un filet d'huile 1 min pour libérer les arômes.", badge: null },
      { icone: "🥥", titre: "Ajouter le coco",           detail: "Verser le lait de coco. Mélanger avec la pâte. Laisser frémir 2 min.", badge: null },
      { icone: "🍗", titre: "Cuire le poulet",           detail: "Ajouter le poulet en morceaux. Laisser mijoter à feu moyen jusqu'à cuisson complète.", badge: "⏱ 15 min" },
      { icone: "🌿", titre: "Finir et servir",           detail: "Ajouter les épinards, laisser fondre 2 min. Assaisonner avec sauce poisson et jus de citron vert. Servir sur riz avec coriandre et piment.", badge: null },
    ]
  },

  burgermaison: {
    base: 2,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🍔",
    description: "Le burger maison parfait — steak haché juteux, sauce burger maison, cheddar fondu et légumes frais.",
    tableauBurger: [
      { nb:  1, viande: "150 g", buns: "1",  cheddar: "1 tr.", salade: "1 feuille", tomate: "½" },
      { nb:  2, viande: "300 g", buns: "2",  cheddar: "2 tr.", salade: "2 feuilles",tomate: "1"  },
      { nb:  3, viande: "450 g", buns: "3",  cheddar: "3 tr.", salade: "3 feuilles",tomate: "1½" },
      { nb:  4, viande: "600 g", buns: "4",  cheddar: "4 tr.", salade: "4 feuilles",tomate: "2"  },
      { nb:  5, viande: "750 g", buns: "5",  cheddar: "5 tr.", salade: "5 feuilles",tomate: "2½" },
      { nb:  6, viande: "900 g", buns: "6",  cheddar: "6 tr.", salade: "6 feuilles",tomate: "3"  },
      { nb:  7, viande: "1050 g", buns: "7", cheddar: "7 tr.", salade: "7 feuilles", tomate: "3.5" },
      { nb:  8, viande: "1200 g", buns: "8", cheddar: "8 tr.", salade: "8 feuilles", tomate: "4" },
      { nb:  9, viande: "1350 g", buns: "9", cheddar: "9 tr.", salade: "9 feuilles", tomate: "4.5" },
      { nb: 10, viande: "1500 g", buns: "10", cheddar: "10 tr.", salade: "10 feuilles", tomate: "5" },
      { nb: 11, viande: "1650 g", buns: "11", cheddar: "11 tr.", salade: "11 feuilles", tomate: "5.5" },
      { nb: 12, viande: "1800 g", buns: "12", cheddar: "12 tr.", salade: "12 feuilles", tomate: "6" },
      { nb: 13, viande: "1950 g", buns: "13", cheddar: "13 tr.", salade: "13 feuilles", tomate: "6.5" },
      { nb: 14, viande: "2100 g", buns: "14", cheddar: "14 tr.", salade: "14 feuilles", tomate: "7" },
      { nb: 15, viande: "2250 g", buns: "15", cheddar: "15 tr.", salade: "15 feuilles", tomate: "7.5" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍔", titre: "Former les steaks",         detail: "Mélanger la viande hachée avec sel, poivre et une pincée de paprika. Former des steaks de 150g en les aplatissant légèrement. Faire un creux au centre avec le pouce pour éviter qu'ils gonflent.", badge: null },
      { icone: "🍶", titre: "Sauce burger",              detail: "Mélanger mayonnaise, ketchup, moutarde, cornichons émincés et paprika. Réserver.", badge: null },
      { icone: "🔥", titre: "Cuire les steaks",          detail: "Poêle ou grill très chaud. Cuire 3 min sans toucher, retourner et cuire 2 min. Poser le cheddar sur le steak et couvrir 1 min pour le faire fondre.", badge: "⏱ 5-6 min" },
      { icone: "🍞", titre: "Toaster les buns",          detail: "Couper les buns en deux et les toaster côté mie dans la poêle avec un peu de beurre.", badge: null },
      { icone: "🥗", titre: "Assembler",                 detail: "Tartiner les buns de sauce. Ajouter salade, tomate, steak au cheddar, oignons caramélisés si souhaité. Servir avec frites maison.", badge: null },
    ]
  },

  risottoprimavera: {
    base: 4,
    temps: "35 min",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🍚",
    description: "Risotto primavera printanier — riz crémeux aux légumes de saison, parmesan et basilic frais. Un classique italien végétarien.",
    tableauRisottoPrimavera: [
      { nb:  1, riz: "80 g",  bouillon: "300 ml", courgette: "½",  petitspois: "50 g",  parmesan: "20 g" },
      { nb:  2, riz: "160 g", bouillon: "500 ml", courgette: "1",  petitspois: "100 g", parmesan: "40 g" },
      { nb:  3, riz: "240 g", bouillon: "750 ml", courgette: "1½", petitspois: "150 g", parmesan: "60 g" },
      { nb:  4, riz: "320 g", bouillon: "1000 ml",courgette: "2",  petitspois: "200 g", parmesan: "80 g" },
      { nb:  5, riz: "400 g", bouillon: "1250 ml",courgette: "2½", petitspois: "250 g", parmesan: "100 g"},
      { nb:  6, riz: "480 g", bouillon: "1500 ml",courgette: "3",  petitspois: "300 g", parmesan: "120 g"},
      { nb:  7, riz: "560 g", bouillon: "1750 ml", courgette: "3.5", petitspois: "350 g", parmesan: "140 g" },
      { nb:  8, riz: "640 g", bouillon: "2000 ml", courgette: "4", petitspois: "400 g", parmesan: "160 g" },
      { nb:  9, riz: "720 g", bouillon: "2250 ml", courgette: "4.5", petitspois: "450 g", parmesan: "180 g" },
      { nb: 10, riz: "800 g", bouillon: "2500 ml", courgette: "5", petitspois: "500 g", parmesan: "200 g" },
      { nb: 11, riz: "880 g", bouillon: "2750 ml", courgette: "5.5", petitspois: "550 g", parmesan: "220 g" },
      { nb: 12, riz: "960 g", bouillon: "3000 ml", courgette: "6", petitspois: "600 g", parmesan: "240 g" },
      { nb: 13, riz: "1040 g", bouillon: "3250 ml", courgette: "6.5", petitspois: "650 g", parmesan: "260 g" },
      { nb: 14, riz: "1120 g", bouillon: "3500 ml", courgette: "7", petitspois: "700 g", parmesan: "280 g" },
      { nb: 15, riz: "1200 g", bouillon: "3750 ml", courgette: "7.5", petitspois: "750 g", parmesan: "300 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Faire suer l'oignon",      detail: "Émincer finement l'oignon. Le faire suer dans beurre + huile d'olive 4 min sans coloration.", badge: null },
      { icone: "🍚", titre: "Nacrer le riz",             detail: "Ajouter le riz arborio et remuer 2 min jusqu'à ce qu'il devienne translucide.", badge: null },
      { icone: "🍷", titre: "Déglacer",                  detail: "Verser un verre de vin blanc sec. Remuer jusqu'à absorption.", badge: null },
      { icone: "🥄", titre: "Ajouter le bouillon",       detail: "Ajouter le bouillon chaud louche par louche en remuant. Attendre l'absorption avant d'en rajouter.", badge: "⏱ 18 min" },
      { icone: "🥒", titre: "Ajouter les légumes",       detail: "À mi-cuisson, ajouter la courgette en dés et les petits pois. Continuer à mouiller.", badge: null },
      { icone: "🧀", titre: "Mantecatura",               detail: "Hors du feu, ajouter beurre froid et parmesan. Mélanger vigoureusement. Couvrir 2 min. Servir avec basilic frais.", badge: null },
    ]
  },

  saumongravlax: {
    base: 4,
    temps: "15 min + 24h marinade",
    niveau: "⭐ Facile",
    emoji: "🐟",
    description: "Gravlax de saumon maison — saumon mariné au sel, sucre et aneth. Une entrée scandinave élégante et sans cuisson.",
    tableauGravlax: [
      { nb:  1, saumon: "150 g", sel: "15 g",  sucre: "10 g", aneth: "¼ botte", vodka: "½ c.à.s" },
      { nb:  2, saumon: "300 g", sel: "30 g",  sucre: "20 g", aneth: "½ botte", vodka: "1 c.à.s" },
      { nb:  3, saumon: "450 g", sel: "45 g",  sucre: "30 g", aneth: "¾ botte", vodka: "1½ c.à.s"},
      { nb:  4, saumon: "600 g", sel: "60 g",  sucre: "40 g", aneth: "1 botte",  vodka: "2 c.à.s" },
      { nb:  5, saumon: "750 g", sel: "75 g",  sucre: "50 g", aneth: "1 botte",  vodka: "2½ c.à.s"},
      { nb:  6, saumon: "900 g", sel: "90 g",  sucre: "60 g", aneth: "1½ botte", vodka: "3 c.à.s" },
      { nb:  7, saumon: "1050 g",sel: "105 g", sucre: "70 g", aneth: "1½ botte", vodka: "3½ c.à.s"},
      { nb:  8, saumon: "1200 g",sel: "120 g", sucre: "80 g", aneth: "2 bottes", vodka: "4 c.à.s" },
      { nb:  9, saumon: "1350 g",sel: "135 g", sucre: "90 g", aneth: "2 bottes", vodka: "4½ c.à.s"},
      { nb: 10, saumon: "1500 g",sel: "150 g", sucre: "100 g",aneth: "2 bottes", vodka: "5 c.à.s" },
      { nb: 11, saumon: "1650 g",sel: "165 g", sucre: "110 g",aneth: "2½ bottes",vodka: "5½ c.à.s"},
      { nb: 12, saumon: "1800 g",sel: "180 g", sucre: "120 g",aneth: "2½ bottes",vodka: "6 c.à.s" },
      { nb: 13, saumon: "1950 g",sel: "195 g", sucre: "130 g",aneth: "3 bottes", vodka: "6½ c.à.s"},
      { nb: 14, saumon: "2100 g",sel: "210 g", sucre: "140 g",aneth: "3 bottes", vodka: "7 c.à.s" },
      { nb: 15, saumon: "2250 g",sel: "225 g", sucre: "150 g",aneth: "3 bottes", vodka: "7½ c.à.s"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🧂", titre: "Préparer la marinade",      detail: "Mélanger sel, sucre, poivre blanc et aneth ciselé grossièrement.", badge: null },
      { icone: "🐟", titre: "Enrober le saumon",         detail: "Poser le filet côté peau sur un film alimentaire. Recouvrir généreusement du mélange sel-sucre-aneth. Ajouter la vodka si souhaité.", badge: null },
      { icone: "🌯", titre: "Filmer et presser",         detail: "Emballer hermétiquement dans le film. Poser un poids dessus (boîte de conserve). Placer au réfrigérateur.", badge: "⏱ 24h minimum" },
      { icone: "🔪", titre: "Trancher et servir",        detail: "Rincer le saumon sous l'eau froide et sécher. Trancher en fines lamelles à 45°. Servir avec sauce moutarde-aneth et pain de seigle.", badge: null },
    ]
  },

  shakshuka: {
    base: 2,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🍳",
    description: "Le shakshuka moyen-oriental — œufs pochés dans une sauce tomate épicée aux poivrons et cumin. Parfait pour le brunch.",
    tableauShakshuka: [
      { nb:  1, oeufs: "2",  tomates: "200 g", poivron: "½",  oignon: "¼", cumin: "½ c.à.c" },
      { nb:  2, oeufs: "4",  tomates: "400 g", poivron: "1",  oignon: "½", cumin: "1 c.à.c"  },
      { nb:  3, oeufs: "6",  tomates: "600 g", poivron: "1½", oignon: "1", cumin: "1½ c.à.c" },
      { nb:  4, oeufs: "8",  tomates: "800 g", poivron: "2",  oignon: "1", cumin: "2 c.à.c"  },
      { nb:  5, oeufs: "10", tomates: "1 kg",  poivron: "2½", oignon: "1", cumin: "2½ c.à.c" },
      { nb:  6, oeufs: "12", tomates: "1.2 kg",poivron: "3",  oignon: "2", cumin: "3 c.à.c"  },
      { nb:  7, oeufs: "14", tomates: "1400 g", poivron: "3.5", oignon: "½", cumin: "3.5 c.à.c" },
      { nb:  8, oeufs: "16", tomates: "1600 g", poivron: "4", oignon: "½", cumin: "4 c.à.c" },
      { nb:  9, oeufs: "18", tomates: "1800 g", poivron: "4.5", oignon: "½", cumin: "4.5 c.à.c" },
      { nb: 10, oeufs: "20", tomates: "2000 g", poivron: "5", oignon: "½", cumin: "5 c.à.c" },
      { nb: 11, oeufs: "22", tomates: "2200 g", poivron: "5.5", oignon: "½", cumin: "5.5 c.à.c" },
      { nb: 12, oeufs: "24", tomates: "2400 g", poivron: "6", oignon: "½", cumin: "6 c.à.c" },
      { nb: 13, oeufs: "26", tomates: "2600 g", poivron: "6.5", oignon: "½", cumin: "6.5 c.à.c" },
      { nb: 14, oeufs: "28", tomates: "2800 g", poivron: "7", oignon: "½", cumin: "7 c.à.c" },
      { nb: 15, oeufs: "30", tomates: "3000 g", poivron: "7.5", oignon: "½", cumin: "7.5 c.à.c" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Faire revenir les légumes", detail: "Dans une grande poêle, faire revenir l'oignon émincé et le poivron en dés dans l'huile d'olive jusqu'à tendreté.", badge: "⏱ 7 min" },
      { icone: "🌶️", titre: "Ajouter les épices",       detail: "Ajouter cumin, paprika fumé, curcuma et harissa selon goût. Faire revenir 1 min pour torréfier les épices.", badge: null },
      { icone: "🍅", titre: "Ajouter les tomates",       detail: "Verser les tomates concassées. Saler, poivrer et laisser mijoter à feu moyen jusqu'à réduction.", badge: "⏱ 10 min" },
      { icone: "🥚", titre: "Pocher les œufs",           detail: "Faire des petits puits dans la sauce avec une cuillère. Y casser les œufs délicatement. Couvrir et laisser cuire selon préférence.", badge: "⏱ 5 min (mollet)" },
      { icone: "🌿", titre: "Servir",                    detail: "Parsemer de feta émiettée, persil et coriandre. Servir directement dans la poêle avec pain pita ou pain de campagne.", badge: null },
    ]
  },

  couscous: {
    base: 6,
    temps: "1h30",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥘",
    description: "Le couscous royal marocain — semoule parfumée, légumes mijotés, merguez et poulet dans un bouillon épicé.",
    tableauCouscous: [
      { nb:  2, semoule: "200 g", poulet: "300 g", merguez: "2",   courgette: "1",  carotte: "2",  pois: "100 g" },
      { nb:  4, semoule: "400 g", poulet: "600 g", merguez: "4",   courgette: "2",  carotte: "4",  pois: "200 g" },
      { nb:  6, semoule: "600 g", poulet: "900 g", merguez: "6",   courgette: "3",  carotte: "6",  pois: "300 g" },
      { nb:  8, semoule: "800 g", poulet: "1.2 kg",merguez: "8",   courgette: "4",  carotte: "8",  pois: "400 g" },
      { nb: 10, semoule: "1 kg",  poulet: "1.5 kg",merguez: "10",  courgette: "5",  carotte: "10", pois: "500 g" },
      { nb: 12, semoule: "1.2 kg",poulet: "1.8 kg",merguez: "12",  courgette: "6",  carotte: "12", pois: "600 g" },
      { nb: 13, semoule: "1300 g", poulet: "1950 g", merguez: "13", courgette: "6.5", carotte: "13", pois: "650 g" },
      { nb: 14, semoule: "1400 g", poulet: "2100 g", merguez: "14", courgette: "7", carotte: "14", pois: "700 g" },
      { nb: 15, semoule: "1500 g", poulet: "2250 g", merguez: "15", courgette: "7.5", carotte: "15", pois: "750 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌶️", titre: "Préparer le bouillon",    detail: "Dans une couscoussière, faire revenir oignon, ail, gingembre et épices (cumin, curcuma, ras el hanout, cannelle). Ajouter le poulet découpé et faire dorer.", badge: null },
      { icone: "🥕", titre: "Ajouter les légumes",     detail: "Ajouter carottes, navets, courgettes et pois chiches. Couvrir d'eau ou de bouillon. Laisser mijoter.", badge: "⏱ 45 min" },
      { icone: "🥩", titre: "Cuire les merguez",       detail: "Faire griller les merguez à la poêle ou au grill jusqu'à belle coloration.", badge: "⏱ 10 min" },
      { icone: "🌾", titre: "Préparer la semoule",     detail: "Verser la semoule dans un plat. Ajouter 1.5x son volume d'eau bouillante salée et un filet d'huile d'olive. Couvrir 5 min puis égrainer à la fourchette avec du beurre.", badge: "⏱ 5 min" },
      { icone: "🍋", titre: "Harissa et service",      detail: "Prélever du bouillon, y délayer de la harissa. Servir semoule, viandes et légumes avec le bouillon épicé à part.", badge: null },
    ]
  },

  moussaka: {
    base: 6,
    temps: "1h30",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🍆",
    description: "La moussaka grecque authentique — aubergines dorées, viande hachée épicée à la cannelle et béchamel crémeuse gratinée.",
    tableauMoussaka: [
      { nb:  2, aubergines: "1",   viande: "200 g", tomates: "200 g", bechamel: "200 ml", parmesan: "30 g"  },
      { nb:  4, aubergines: "2",   viande: "400 g", tomates: "400 g", bechamel: "400 ml", parmesan: "60 g"  },
      { nb:  6, aubergines: "3",   viande: "600 g", tomates: "600 g", bechamel: "600 ml", parmesan: "90 g"  },
      { nb:  8, aubergines: "4",   viande: "800 g", tomates: "800 g", bechamel: "800 ml", parmesan: "120 g" },
      { nb: 10, aubergines: "5",   viande: "1 kg",  tomates: "1 kg",  bechamel: "1 L",    parmesan: "150 g" },
      { nb: 12, aubergines: "6",   viande: "1.2 kg",tomates: "1.2 kg",bechamel: "1.2 L",  parmesan: "180 g" },
      { nb: 13, aubergines: "6.5", viande: "1300 g", tomates: "1300 g", bechamel: "1300 ml", parmesan: "195 g" },
      { nb: 14, aubergines: "7", viande: "1400 g", tomates: "1400 g", bechamel: "1400 ml", parmesan: "210 g" },
      { nb: 15, aubergines: "7.5", viande: "1500 g", tomates: "1500 g", bechamel: "1500 ml", parmesan: "225 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍆", titre: "Préparer les aubergines", detail: "Couper les aubergines en tranches de 1 cm. Saler et laisser dégorger 20 min. Rincer, sécher et faire dorer à l'huile d'olive ou au four à 200°C.", badge: "⏱ 20 min" },
      { icone: "🥩", titre: "Sauce viande",            detail: "Faire revenir oignon et ail. Ajouter la viande hachée (agneau ou bœuf). Dorer, puis ajouter tomates concassées, cannelle, clous de girofle, sel. Mijoter.", badge: "⏱ 20 min" },
      { icone: "🥛", titre: "Béchamel",                detail: "Préparer une béchamel épaisse. Hors du feu, ajouter un jaune d'œuf et du parmesan râpé.", badge: null },
      { icone: "🏗️", titre: "Monter la moussaka",     detail: "Dans un plat beurré : couche d'aubergines, sauce viande, aubergines, béchamel. Parsemer de parmesan.", badge: null },
      { icone: "🔥", titre: "Cuire et gratiner",       detail: "Enfourner à 180°C jusqu'à ce que la béchamel soit bien dorée. Laisser reposer 15 min avant de servir.", badge: "⏱ 40 min à 180°C" },
    ]
  },

  paella: {
    base: 4,
    temps: "50 min",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥘",
    description: "La paella valenciana — riz safrané aux fruits de mer, poulet et chorizo. Le plat festif espagnol par excellence.",
    tableauPaella: [
      { nb:  2, riz: "150 g", poulet: "200 g", crevettes: "100 g", moules: "200 g", chorizo: "50 g",  safran: "1 pincée" },
      { nb:  4, riz: "300 g", poulet: "400 g", crevettes: "200 g", moules: "400 g", chorizo: "100 g", safran: "1 pincée" },
      { nb:  6, riz: "450 g", poulet: "600 g", crevettes: "300 g", moules: "600 g", chorizo: "150 g", safran: "2 pincées"},
      { nb:  8, riz: "600 g", poulet: "800 g", crevettes: "400 g", moules: "800 g", chorizo: "200 g", safran: "2 pincées"},
      { nb: 10, riz: "750 g", poulet: "1 kg",  crevettes: "500 g", moules: "1 kg",  chorizo: "250 g", safran: "3 pincées"},
      { nb: 12, riz: "900 g", poulet: "1.2 kg",crevettes: "600 g", moules: "1.2 kg",chorizo: "300 g", safran: "3 pincées"},
      { nb: 13, riz: "975 g", poulet: "1300 g", crevettes: "650 g", moules: "1300 g", chorizo: "325 g", safran: "4.3 pincées" },
      { nb: 14, riz: "1050 g", poulet: "1400 g", crevettes: "700 g", moules: "1400 g", chorizo: "350 g", safran: "4.7 pincées" },
      { nb: 15, riz: "1125 g", poulet: "1500 g", crevettes: "750 g", moules: "1500 g", chorizo: "375 g", safran: "5 pincées" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍗", titre: "Faire revenir viandes",   detail: "Dans la paellera ou grande poêle, faire dorer les morceaux de poulet et le chorizo en rondelles dans l'huile d'olive.", badge: "⏱ 8 min" },
      { icone: "🍅", titre: "Sofrito",                 detail: "Ajouter poivron rouge et vert émincés, tomates concassées, ail et paprika fumé. Cuire 5 min.", badge: null },
      { icone: "🌾", titre: "Nacrer le riz",           detail: "Ajouter le riz et remuer 2 min. Verser le bouillon chaud avec le safran (2x le volume du riz). Ne plus remuer !", badge: null },
      { icone: "🦐", titre: "Ajouter fruits de mer",  detail: "À mi-cuisson, disposer crevettes et moules sur le riz. Couvrir et cuire jusqu'à absorption du bouillon.", badge: "⏱ 20 min total" },
      { icone: "🔥", titre: "Le socarrat",             detail: "En fin de cuisson, monter le feu 1-2 min pour faire dorer le fond (le socarrat — croûte croustillante). Couvrir d'alu et laisser reposer 5 min.", badge: null },
    ]
  },

  butterchicken: {
    base: 4,
    temps: "40 min",
    niveau: "⭐ Facile",
    emoji: "🍗",
    description: "Le butter chicken indien — poulet tendre dans une sauce tomate crémeuse au beurre et épices douces. Servi avec naan.",
    tableauButterChicken: [
      { nb:  1, poulet: "150 g", tomates: "100 g", creme: "50 ml",  beurre: "15 g", masala: "1 c.à.c" },
      { nb:  2, poulet: "300 g", tomates: "200 g", creme: "100 ml", beurre: "30 g", masala: "2 c.à.c" },
      { nb:  3, poulet: "450 g", tomates: "300 g", creme: "150 ml", beurre: "45 g", masala: "3 c.à.c" },
      { nb:  4, poulet: "600 g", tomates: "400 g", creme: "200 ml", beurre: "60 g", masala: "4 c.à.c" },
      { nb:  6, poulet: "900 g", tomates: "600 g", creme: "300 ml", beurre: "90 g", masala: "6 c.à.c" },
      { nb:  8, poulet: "1.2 kg",tomates: "800 g", creme: "400 ml", beurre: "120 g",masala: "8 c.à.c" },
      { nb:  9, poulet: "1350 g", tomates: "900 g", creme: "450 ml", beurre: "135 g", masala: "9 c.à.c" },
      { nb: 10, poulet: "1500 g", tomates: "1000 g", creme: "500 ml", beurre: "150 g", masala: "10 c.à.c" },
      { nb: 11, poulet: "1650 g", tomates: "1100 g", creme: "550 ml", beurre: "165 g", masala: "11 c.à.c" },
      { nb: 12, poulet: "1800 g", tomates: "1200 g", creme: "600 ml", beurre: "180 g", masala: "12 c.à.c" },
      { nb: 13, poulet: "1950 g", tomates: "1300 g", creme: "650 ml", beurre: "195 g", masala: "13 c.à.c" },
      { nb: 14, poulet: "2100 g", tomates: "1400 g", creme: "700 ml", beurre: "210 g", masala: "14 c.à.c" },
      { nb: 15, poulet: "2250 g", tomates: "1500 g", creme: "750 ml", beurre: "225 g", masala: "15 c.à.c" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍗", titre: "Mariner le poulet",       detail: "Mélanger yaourt, jus de citron, garam masala, curcuma, cumin et gingembre râpé. Mariner le poulet en morceaux au moins 2h (idéalement une nuit).", badge: "⏱ 2h minimum" },
      { icone: "🔥", titre: "Griller le poulet",       detail: "Cuire le poulet mariné à la poêle à feu vif jusqu'à belle coloration. Réserver.", badge: "⏱ 8 min" },
      { icone: "🍅", titre: "Sauce makhani",           detail: "Dans la même poêle, faire fondre le beurre. Ajouter oignon, ail, gingembre. Puis tomates concassées et épices (garam masala, cumin, paprika, fenugrec). Cuire 10 min.", badge: null },
      { icone: "🌀", titre: "Mixer la sauce",          detail: "Mixer la sauce pour obtenir une texture lisse. Remettre dans la poêle.", badge: null },
      { icone: "🍦", titre: "Finir et servir",         detail: "Ajouter le poulet et la crème fraîche. Laisser mijoter 10 min. Servir avec du riz basmati ou des naans chauds.", badge: "⏱ 10 min" },
    ]
  },

  souvlaki: {
    base: 4,
    temps: "20 min + marinade",
    niveau: "⭐ Facile",
    emoji: "🍢",
    description: "Les souvlaki grecs — brochettes de porc marinées à l'origan et citron, servies avec tzatziki et pain pita.",
    tableauSouvlaki: [
      { nb:  2, porc: "300 g", pita: "2",  concombre: "¼",  yaourt: "100 g", citron: "½" },
      { nb:  4, porc: "600 g", pita: "4",  concombre: "½",  yaourt: "200 g", citron: "1" },
      { nb:  6, porc: "900 g", pita: "6",  concombre: "¾",  yaourt: "300 g", citron: "1" },
      { nb:  8, porc: "1.2 kg",pita: "8",  concombre: "1",  yaourt: "400 g", citron: "2" },
      { nb: 10, porc: "1.5 kg",pita: "10", concombre: "1½", yaourt: "500 g", citron: "2" },
      { nb: 12, porc: "1.8 kg",pita: "12", concombre: "2",  yaourt: "600 g", citron: "3" },
      { nb: 13, porc: "1950 g", pita: "13", concombre: "¾", yaourt: "650 g", citron: "2.2" },
      { nb: 14, porc: "2100 g", pita: "14", concombre: "¾", yaourt: "700 g", citron: "2.3" },
      { nb: 15, porc: "2250 g", pita: "15", concombre: "¾", yaourt: "750 g", citron: "2.5" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🫙", titre: "Marinade",                detail: "Couper le porc en cubes de 3cm. Mélanger avec huile d'olive, jus de citron, origan, ail écrasé, sel et poivre. Mariner au frais.", badge: "⏱ 2h minimum" },
      { icone: "🍢", titre: "Former les brochettes",  detail: "Enfiler la viande sur des brochettes. Cuire sur grill chaud ou barbecue en tournant régulièrement.", badge: "⏱ 10-12 min" },
      { icone: "🥒", titre: "Tzatziki",               detail: "Râper le concombre, presser pour extraire l'eau. Mélanger avec yaourt grec, ail pressé, aneth, jus de citron et huile d'olive.", badge: null },
      { icone: "🫓", titre: "Réchauffer les pitas",   detail: "Passer les pains pita quelques secondes à la flamme ou dans une poêle chaude.", badge: null },
      { icone: "🍢", titre: "Dresser",                detail: "Servir les brochettes avec pitas, tzatziki, tomates, oignons rouges et olives. Arroser d'huile d'olive et origan.", badge: null },
    ]
  },

  quichelorraine: {
    base: 6,
    temps: "1h",
    niveau: "⭐ Facile",
    emoji: "🥧",
    description: "La vraie quiche lorraine — pâte brisée croustillante, lardons fumés et appareil œufs-crème. La recette traditionnelle.",
    tableauQuiche: [
      { nb:  2, lardons: "75 g",  oeufs: "2",  creme: "100 ml", lait: "50 ml"  },
      { nb:  4, lardons: "150 g", oeufs: "3",  creme: "200 ml", lait: "100 ml" },
      { nb:  6, lardons: "200 g", oeufs: "4",  creme: "300 ml", lait: "150 ml" },
      { nb:  8, lardons: "275 g", oeufs: "5",  creme: "400 ml", lait: "200 ml" },
      { nb: 10, lardons: "350 g", oeufs: "6",  creme: "500 ml", lait: "250 ml" },
      { nb: 12, lardons: "400 g", oeufs: "7",  creme: "600 ml", lait: "300 ml" },
      { nb: 13, lardons: "433 g", oeufs: "8.7", creme: "650 ml", lait: "325 ml" },
      { nb: 14, lardons: "467 g", oeufs: "9.3", creme: "700 ml", lait: "350 ml" },
      { nb: 15, lardons: "500 g", oeufs: "10", creme: "750 ml", lait: "375 ml" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🥧", titre: "Foncer le moule",         detail: "Étaler la pâte brisée dans un moule à tarte. Piquer le fond. Cuire à blanc 10 min à 180°C avec billes de cuisson.", badge: "⏱ 10 min" },
      { icone: "🥓", titre: "Faire revenir les lardons",detail: "Faire sauter les lardons fumés à la poêle sans matière grasse jusqu'à légère coloration. Égoutter.", badge: "⏱ 5 min" },
      { icone: "🥚", titre: "Préparer l'appareil",    detail: "Fouetter les œufs avec la crème fraîche et le lait. Assaisonner avec sel, poivre et noix de muscade. Ne pas saler trop — les lardons le sont déjà.", badge: null },
      { icone: "🏗️", titre: "Garnir",                 detail: "Disposer les lardons sur le fond de tarte précuit. Verser l'appareil dessus.", badge: null },
      { icone: "🔥", titre: "Cuire",                   detail: "Enfourner à 180°C jusqu'à ce que l'appareil soit pris et légèrement doré. Laisser tiédir 5 min avant de couper.", badge: "⏱ 30-35 min" },
    ]
  },

  soupeaoignon: {
    base: 4,
    temps: "1h",
    niveau: "⭐ Facile",
    emoji: "🧅",
    description: "La soupe à l'oignon gratinée — oignons caramélisés dans un bouillon de bœuf, croûtons de pain et gruyère fondu.",
    tableauSoupeOignon: [
      { nb:  1, oignons: "200 g", bouillon: "250 ml", pain: "1 tr.", gruyere: "30 g",  beurre: "10 g" },
      { nb:  2, oignons: "400 g", bouillon: "500 ml", pain: "2 tr.", gruyere: "60 g",  beurre: "20 g" },
      { nb:  3, oignons: "600 g", bouillon: "750 ml", pain: "3 tr.", gruyere: "90 g",  beurre: "30 g" },
      { nb:  4, oignons: "800 g", bouillon: "1 L",    pain: "4 tr.", gruyere: "120 g", beurre: "40 g" },
      { nb:  6, oignons: "1.2 kg",bouillon: "1.5 L",  pain: "6 tr.", gruyere: "180 g", beurre: "60 g" },
      { nb:  8, oignons: "1.6 kg",bouillon: "2 L",    pain: "8 tr.", gruyere: "240 g", beurre: "80 g" },
      { nb:  9, oignons: "1800 g", bouillon: "2.2 L", pain: "9 tr.", gruyere: "270 g", beurre: "90 g" },
      { nb: 10, oignons: "2000 g", bouillon: "2.5 L", pain: "10 tr.", gruyere: "300 g", beurre: "100 g" },
      { nb: 11, oignons: "2200 g", bouillon: "2.8 L", pain: "11 tr.", gruyere: "330 g", beurre: "110 g" },
      { nb: 12, oignons: "2400 g", bouillon: "3 L", pain: "12 tr.", gruyere: "360 g", beurre: "120 g" },
      { nb: 13, oignons: "2600 g", bouillon: "3.2 L", pain: "13 tr.", gruyere: "390 g", beurre: "130 g" },
      { nb: 14, oignons: "2800 g", bouillon: "3.5 L", pain: "14 tr.", gruyere: "420 g", beurre: "140 g" },
      { nb: 15, oignons: "3000 g", bouillon: "3.8 L", pain: "15 tr.", gruyere: "450 g", beurre: "150 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Caraméliser les oignons", detail: "Émincer finement les oignons. Les faire fondre dans le beurre à feu doux en remuant souvent. Ils doivent devenir dorés et confits. C'est long mais essentiel !", badge: "⏱ 30-40 min à feu doux" },
      { icone: "🍷", titre: "Déglacer",                detail: "Ajouter un verre de vin blanc sec ou de cognac. Laisser évaporer 2 min.", badge: null },
      { icone: "🍲", titre: "Ajouter le bouillon",     detail: "Verser le bouillon de bœuf chaud. Laisser mijoter 15 min. Rectifier l'assaisonnement.", badge: "⏱ 15 min" },
      { icone: "🍞", titre: "Préparer les croûtons",   detail: "Toaster les tranches de pain au four ou à la poêle.", badge: null },
      { icone: "🧀", titre: "Gratiner",                detail: "Verser la soupe dans des bols allant au four. Poser un croûton sur chaque bol, couvrir généreusement de gruyère râpé. Passer sous le gril jusqu'à gratinage.", badge: "⏱ 5 min gril" },
    ]
  },

  dalindien: {
    base: 4,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🫘",
    description: "Le dal indien — lentilles corail mijotées au lait de coco et épices. Végétarien, protéiné et réconfortant.",
    tableauDal: [
      { nb:  1, lentilles: "60 g",  coco: "100 ml", tomates: "100 g", oignon: "¼", masala: "½ c.à.c" },
      { nb:  2, lentilles: "120 g", coco: "200 ml", tomates: "200 g", oignon: "½", masala: "1 c.à.c"  },
      { nb:  3, lentilles: "180 g", coco: "300 ml", tomates: "300 g", oignon: "¾", masala: "1½ c.à.c" },
      { nb:  4, lentilles: "250 g", coco: "400 ml", tomates: "400 g", oignon: "1", masala: "2 c.à.c"  },
      { nb:  6, lentilles: "370 g", coco: "600 ml", tomates: "600 g", oignon: "1", masala: "3 c.à.c"  },
      { nb:  8, lentilles: "500 g", coco: "800 ml", tomates: "800 g", oignon: "2", masala: "4 c.à.c"  },
      { nb:  9, lentilles: "562 g", coco: "900 ml", tomates: "900 g", oignon: "2.2", masala: "4.5 c.à.c" },
      { nb: 10, lentilles: "625 g", coco: "1000 ml", tomates: "1000 g", oignon: "2.5", masala: "5 c.à.c" },
      { nb: 11, lentilles: "688 g", coco: "1100 ml", tomates: "1100 g", oignon: "2.8", masala: "5.5 c.à.c" },
      { nb: 12, lentilles: "750 g", coco: "1200 ml", tomates: "1200 g", oignon: "3", masala: "6 c.à.c" },
      { nb: 13, lentilles: "812 g", coco: "1300 ml", tomates: "1300 g", oignon: "3.2", masala: "6.5 c.à.c" },
      { nb: 14, lentilles: "875 g", coco: "1400 ml", tomates: "1400 g", oignon: "3.5", masala: "7 c.à.c" },
      { nb: 15, lentilles: "938 g", coco: "1500 ml", tomates: "1500 g", oignon: "3.8", masala: "7.5 c.à.c" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Faire revenir les aromates",detail: "Faire suer l'oignon dans l'huile. Ajouter ail, gingembre râpé, garam masala, curcuma, cumin et coriandre. Torréfier 1 min.", badge: null },
      { icone: "🍅", titre: "Ajouter tomates",         detail: "Ajouter les tomates concassées. Cuire 5 min jusqu'à réduction.", badge: null },
      { icone: "🫘", titre: "Cuire les lentilles",     detail: "Rincer les lentilles corail. Les ajouter avec le lait de coco et 200ml d'eau. Mélanger et porter à ébullition.", badge: null },
      { icone: "⏳", titre: "Mijoter",                 detail: "Baisser le feu et laisser mijoter à découvert en remuant régulièrement. Les lentilles vont fondre et épaissir naturellement.", badge: "⏱ 20 min" },
      { icone: "🌿", titre: "Servir",                  detail: "Rectifier l'assaisonnement. Servir avec riz basmati ou pain naan. Garnir de coriandre fraîche et d'un filet de jus de citron.", badge: null },
    ]
  },

  rizcantonnais: {
    base: 4,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🍳",
    description: "Le riz cantonnais authentique — riz sauté aux œufs brouillés, jambon, petits pois et sauce soja. Le classique de la cuisine chinoise.",
    tableauRizCantonnais: [
      { nb:  1, riz: "80 g",  oeufs: "1",  jambon: "30 g",  petitspois: "30 g",  sojaS: "1 c.à.s" },
      { nb:  2, riz: "160 g", oeufs: "2",  jambon: "60 g",  petitspois: "60 g",  sojaS: "2 c.à.s" },
      { nb:  3, riz: "240 g", oeufs: "3",  jambon: "90 g",  petitspois: "90 g",  sojaS: "3 c.à.s" },
      { nb:  4, riz: "320 g", oeufs: "4",  jambon: "120 g", petitspois: "120 g", sojaS: "4 c.à.s" },
      { nb:  6, riz: "480 g", oeufs: "6",  jambon: "180 g", petitspois: "180 g", sojaS: "6 c.à.s" },
      { nb:  8, riz: "640 g", oeufs: "8",  jambon: "240 g", petitspois: "240 g", sojaS: "8 c.à.s" },
      { nb:  9, riz: "720 g", oeufs: "9", jambon: "270 g", petitspois: "270 g", sojaS: "9 c.à.s" },
      { nb: 10, riz: "800 g", oeufs: "10", jambon: "300 g", petitspois: "300 g", sojaS: "10 c.à.s" },
      { nb: 11, riz: "880 g", oeufs: "11", jambon: "330 g", petitspois: "330 g", sojaS: "11 c.à.s" },
      { nb: 12, riz: "960 g", oeufs: "12", jambon: "360 g", petitspois: "360 g", sojaS: "12 c.à.s" },
      { nb: 13, riz: "1040 g", oeufs: "13", jambon: "390 g", petitspois: "390 g", sojaS: "13 c.à.s" },
      { nb: 14, riz: "1120 g", oeufs: "14", jambon: "420 g", petitspois: "420 g", sojaS: "14 c.à.s" },
      { nb: 15, riz: "1200 g", oeufs: "15", jambon: "450 g", petitspois: "450 g", sojaS: "15 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍚", titre: "Riz de la veille",        detail: "Idéalement utiliser du riz cuit la veille et réfrigéré — il est plus sec et saute mieux. Sinon cuire le riz et laisser refroidir complètement.", badge: null },
      { icone: "🥚", titre: "Brouiller les œufs",      detail: "Dans un wok très chaud avec huile, verser les œufs battus. Les brouiller rapidement et réserver.", badge: null },
      { icone: "🍳", titre: "Sauter le riz",           detail: "Dans le même wok, ajouter huile et riz froid. Faire sauter à feu maximum en remuant constamment 3-4 min.", badge: "⏱ 4 min" },
      { icone: "🥓", titre: "Ajouter garnitures",      detail: "Ajouter le jambon en dés, les petits pois, les œufs brouillés. Mélanger à feu vif.", badge: null },
      { icone: "🍶", titre: "Assaisonner",             detail: "Ajouter la sauce soja et l'huile de sésame. Mélanger rapidement. Servir immédiatement.", badge: null },
    ]
  },

  hariramarocaine: {
    base: 6,
    temps: "1h",
    niveau: "⭐ Facile",
    emoji: "🍲",
    description: "La harira marocaine — soupe traditionnelle aux lentilles, pois chiches, tomates et épices. La soupe du Ramadan.",
    tableauHarira: [
      { nb:  2, lentilles: "50 g",  poischiches: "100 g", tomates: "200 g", viande: "100 g", vermicelles: "20 g"  },
      { nb:  4, lentilles: "100 g", poischiches: "200 g", tomates: "400 g", viande: "200 g", vermicelles: "40 g"  },
      { nb:  6, lentilles: "150 g", poischiches: "300 g", tomates: "600 g", viande: "300 g", vermicelles: "60 g"  },
      { nb:  8, lentilles: "200 g", poischiches: "400 g", tomates: "800 g", viande: "400 g", vermicelles: "80 g"  },
      { nb: 10, lentilles: "250 g", poischiches: "500 g", tomates: "1 kg",  viande: "500 g", vermicelles: "100 g" },
      { nb: 12, lentilles: "300 g", poischiches: "600 g", tomates: "1.2 kg",viande: "600 g", vermicelles: "120 g" },
      { nb: 13, lentilles: "325 g", poischiches: "650 g", tomates: "1300 g", viande: "650 g", vermicelles: "130 g" },
      { nb: 14, lentilles: "350 g", poischiches: "700 g", tomates: "1400 g", viande: "700 g", vermicelles: "140 g" },
      { nb: 15, lentilles: "375 g", poischiches: "750 g", tomates: "1500 g", viande: "750 g", vermicelles: "150 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🥩", titre: "Faire revenir la viande",  detail: "Dans une grande casserole, faire revenir l'agneau ou le bœuf en dés avec oignon, céleri et tomates. Ajouter curcuma, gingembre, cannelle et coriandre.", badge: null },
      { icone: "🫘", titre: "Ajouter les légumineuses", detail: "Ajouter lentilles et pois chiches (égouttés si en boîte). Couvrir d'eau (environ 1.5L). Porter à ébullition.", badge: null },
      { icone: "⏳", titre: "Mijoter",                  detail: "Baisser le feu et laisser mijoter. Ajouter les tomates concassées et la purée de tomates. Continuer à cuire.", badge: "⏱ 40 min" },
      { icone: "🌾", titre: "Ajouter les vermicelles",  detail: "10 min avant la fin, ajouter les vermicelles et la coriandre fraîche ciselée.", badge: "⏱ 10 min" },
      { icone: "🍋", titre: "Servir",                   detail: "Servir avec des dattes, des œufs durs et un filet de jus de citron. Traditionnellement accompagnée de chebakia.", badge: null },
    ]
  },

  naan: {
    base: 4,
    temps: "1h30",
    niveau: "⭐ Facile",
    emoji: "🫓",
    description: "Les naans indiens moelleux — pains plats au yaourt cuits à la poêle. Parfaits avec tous les currys.",
    tableauNaan: [
      { nb:  2, farine: "150 g", yaourt: "75 g",  levure: "3 g",  beurre: "15 g", lait: "30 ml" },
      { nb:  4, farine: "300 g", yaourt: "150 g", levure: "6 g",  beurre: "30 g", lait: "60 ml" },
      { nb:  6, farine: "450 g", yaourt: "225 g", levure: "9 g",  beurre: "45 g", lait: "90 ml" },
      { nb:  8, farine: "600 g", yaourt: "300 g", levure: "12 g", beurre: "60 g", lait: "120 ml"},
      { nb: 10, farine: "750 g", yaourt: "375 g", levure: "15 g", beurre: "75 g", lait: "150 ml"},
      { nb: 12, farine: "900 g", yaourt: "450 g", levure: "18 g", beurre: "90 g", lait: "180 ml"},
      { nb: 13, farine: "975 g", yaourt: "487 g", levure: "20 g", beurre: "98 g", lait: "195 ml" },
      { nb: 14, farine: "1050 g", yaourt: "525 g", levure: "21 g", beurre: "105 g", lait: "210 ml" },
      { nb: 15, farine: "1125 g", yaourt: "562 g", levure: "22 g", beurre: "112 g", lait: "225 ml" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Préparer la pâte",         detail: "Mélanger farine, levure, sel et sucre. Ajouter yaourt, lait tiède et huile. Pétrir 8-10 min jusqu'à pâte lisse et élastique.", badge: null },
      { icone: "⏳", titre: "Laisser lever",            detail: "Couvrir et laisser lever dans un endroit chaud.", badge: "⏱ 1h" },
      { icone: "📏", titre: "Former les naans",         detail: "Diviser en boules. Étaler chaque boule en ovale fin (3-4 mm). Parsemer de graines de nigelle ou sésame si souhaité.", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Cuire dans une poêle sèche très chaude ou sous le gril du four. Dès que des bulles apparaissent, retourner et cuire 1 min.", badge: "⏱ 2-3 min par face" },
      { icone: "🧈", titre: "Beurrer et servir",        detail: "Badigeonner immédiatement de beurre fondu et d'ail émincé. Parsemer de coriandre fraîche.", badge: null },
    ]
  },

  verrinetiramisu: {
    base: 6,
    temps: "20 min + 4h repos",
    niveau: "⭐ Facile",
    emoji: "🥂",
    description: "Les verrines tiramisu individuelles — élégantes, faciles à préparer et à servir. Parfaites pour les repas.",
    tableauVerrineTiramisu: [
      { nb:  1, biscuits: "33 g",  mascarpone: "83 g",  oeufs: "⅔",  sucre: "17 g",  coulis: "25 ml", sirop: "17 ml" },
      { nb:  2, biscuits: "67 g",  mascarpone: "167 g", oeufs: "1⅓", sucre: "33 g",  coulis: "50 ml", sirop: "33 ml" },
      { nb:  3, biscuits: "100 g", mascarpone: "250 g", oeufs: "2",   sucre: "50 g",  coulis: "75 ml", sirop: "50 ml" },
      { nb:  4, biscuits: "133 g", mascarpone: "333 g", oeufs: "2⅔", sucre: "67 g",  coulis: "100 ml",sirop: "67 ml" },
      { nb:  5, biscuits: "167 g", mascarpone: "417 g", oeufs: "3⅓", sucre: "83 g",  coulis: "125 ml",sirop: "83 ml" },
      { nb:  6, biscuits: "200 g", mascarpone: "500 g", oeufs: "4",   sucre: "100 g", coulis: "150 ml",sirop: "100 ml"},
      { nb:  7, biscuits: "233 g", mascarpone: "583 g", oeufs: "4⅔", sucre: "117 g", coulis: "175 ml",sirop: "117 ml"},
      { nb:  8, biscuits: "267 g", mascarpone: "667 g", oeufs: "5⅓", sucre: "133 g", coulis: "200 ml",sirop: "133 ml"},
      { nb:  9, biscuits: "300 g", mascarpone: "750 g", oeufs: "6",   sucre: "150 g", coulis: "225 ml",sirop: "150 ml"},
      { nb: 10, biscuits: "333 g", mascarpone: "833 g", oeufs: "6⅔", sucre: "167 g", coulis: "250 ml",sirop: "167 ml"},
      { nb: 11, biscuits: "367 g", mascarpone: "917 g", oeufs: "7⅓", sucre: "183 g", coulis: "275 ml",sirop: "183 ml"},
      { nb: 12, biscuits: "400 g", mascarpone: "1000 g",oeufs: "8",   sucre: "200 g", coulis: "300 ml",sirop: "200 ml"},
      { nb: 13, biscuits: "433 g", mascarpone: "1083 g",oeufs: "8⅔", sucre: "217 g", coulis: "325 ml",sirop: "217 ml"},
      { nb: 14, biscuits: "467 g", mascarpone: "1167 g",oeufs: "9⅓", sucre: "233 g", coulis: "350 ml",sirop: "233 ml"},
      { nb: 15, biscuits: "500 g", mascarpone: "1250 g",oeufs: "10",  sucre: "250 g", coulis: "375 ml",sirop: "250 ml"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🥚", titre: "Crème mascarpone",         detail: "Séparer les blancs des jaunes. Fouetter jaunes + sucre jusqu'à blanchiment. Incorporer le mascarpone. Monter les blancs en neige ferme et les incorporer délicatement.", badge: null },
      { icone: "🍓", titre: "Tremper les biscuits",     detail: "Diluer le sirop de fraise dans 100ml d'eau. Y tremper rapidement les biscuits roses.", badge: null },
      { icone: "🥂", titre: "Monter les verrines",      detail: "Dans chaque verrine : couche de biscuits, coulis de fraises, crème mascarpone. Répéter les couches.", badge: null },
      { icone: "❄️", titre: "Réfrigérer",              detail: "Couvrir et placer au réfrigérateur.", badge: "⏱ 4h minimum" },
      { icone: "🍓", titre: "Décorer et servir",        detail: "Au moment de servir, saupoudrer de cacao amer et décorer avec une fraise fraîche.", badge: null },
    ]
  },

  churros: {
    base: 4,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🍩",
    description: "Les churros espagnols croustillants — pâte à choux frite, roulée dans le sucre cannelle et trempée dans du chocolat chaud.",
    tableauChurros: [
      { nb:  2, farine: "100 g", eau: "150 ml", sucre: "20 g", huile: "500 ml", chocolat: "80 g"  },
      { nb:  4, farine: "200 g", eau: "300 ml", sucre: "40 g", huile: "500 ml", chocolat: "160 g" },
      { nb:  6, farine: "300 g", eau: "450 ml", sucre: "60 g", huile: "500 ml", chocolat: "240 g" },
      { nb:  8, farine: "400 g", eau: "600 ml", sucre: "80 g", huile: "1 L",    chocolat: "320 g" },
      { nb: 10, farine: "500 g", eau: "750 ml", sucre: "100 g",huile: "1 L",    chocolat: "400 g" },
      { nb: 12, farine: "600 g", eau: "900 ml", sucre: "120 g",huile: "1 L",    chocolat: "480 g" },
      { nb: 13, farine: "650 g", eau: "975 ml", sucre: "130 g", huile: "1083 ml", chocolat: "520 g" },
      { nb: 14, farine: "700 g", eau: "1050 ml", sucre: "140 g", huile: "1167 ml", chocolat: "560 g" },
      { nb: 15, farine: "750 g", eau: "1125 ml", sucre: "150 g", huile: "1250 ml", chocolat: "600 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "💧", titre: "Préparer la pâte",         detail: "Porter l'eau à ébullition avec une pincée de sel et 1 c.à.s d'huile. Hors du feu, verser la farine d'un coup et mélanger vigoureusement jusqu'à pâte lisse qui se décolle.", badge: null },
      { icone: "🌡️", titre: "Chauffer l'huile",       detail: "Chauffer l'huile à 180°C dans une casserole profonde. Vérifier avec un morceau de pâte — il doit remonter aussitôt.", badge: null },
      { icone: "🍩", titre: "Former et frire",          detail: "Mettre la pâte dans une poche avec douille étoilée. Dresser des bâtons de 15cm directement dans l'huile chaude. Frire jusqu'à dorure.", badge: "⏱ 3-4 min" },
      { icone: "🍬", titre: "Sucre cannelle",           detail: "Égoutter sur papier absorbant. Rouler immédiatement dans le mélange sucre + cannelle.", badge: null },
      { icone: "🍫", titre: "Chocolat chaud",           detail: "Faire fondre le chocolat noir avec 100ml de crème chaude. Servir les churros chauds avec le chocolat pour tremper.", badge: null },
    ]
  },

  potaufeu: {
    base: 6,
    temps: "3h",
    niveau: "⭐ Facile",
    emoji: "🍖",
    description: "Le pot-au-feu traditionnel français — viande de bœuf mijotée lentement avec légumes d'hiver dans un bouillon parfumé.",
    tableauPotAuFeu: [
      { nb:  1, viande: "250 g",  os: "1",  carottes: "1",  pdterre: "1",  poireaux: "½",  navets: "½",  ail: "1 gousse"  },
      { nb:  2, viande: "500 g",  os: "1",  carottes: "2",  pdterre: "2",  poireaux: "1",   navets: "1",   ail: "1 gousse"  },
      { nb:  3, viande: "750 g",  os: "2",  carottes: "3",  pdterre: "3",  poireaux: "1½",  navets: "1½",  ail: "2 gousses" },
      { nb:  4, viande: "1 kg",   os: "2",  carottes: "4",  pdterre: "4",  poireaux: "2",   navets: "2",   ail: "3 gousses" },
      { nb:  5, viande: "1.25 kg",os: "3",  carottes: "5",  pdterre: "5",  poireaux: "2½",  navets: "2½",  ail: "3 gousses" },
      { nb:  6, viande: "1.5 kg", os: "4",  carottes: "6",  pdterre: "6",  poireaux: "3",   navets: "3",   ail: "4 gousses" },
      { nb:  7, viande: "1.75 kg",os: "4",  carottes: "7",  pdterre: "7",  poireaux: "3½",  navets: "3½",  ail: "4 gousses" },
      { nb:  8, viande: "2 kg",   os: "5",  carottes: "8",  pdterre: "8",  poireaux: "4",   navets: "4",   ail: "5 gousses" },
      { nb:  9, viande: "2.25 kg",os: "6",  carottes: "9",  pdterre: "9",  poireaux: "4½",  navets: "4½",  ail: "6 gousses" },
      { nb: 10, viande: "2.5 kg", os: "6",  carottes: "10", pdterre: "10", poireaux: "5",   navets: "5",   ail: "6 gousses" },
      { nb: 11, viande: "2.75 kg",os: "7",  carottes: "11", pdterre: "11", poireaux: "5½",  navets: "5½",  ail: "7 gousses" },
      { nb: 12, viande: "3 kg",   os: "8",  carottes: "12", pdterre: "12", poireaux: "6",   navets: "6",   ail: "8 gousses" },
      { nb: 13, viande: "3.25 kg",os: "9",  carottes: "13", pdterre: "13", poireaux: "6½",  navets: "6½",  ail: "9 gousses" },
      { nb: 14, viande: "3.5 kg", os: "9",  carottes: "14", pdterre: "14", poireaux: "7",   navets: "7",   ail: "9 gousses" },
      { nb: 15, viande: "3.75 kg",os: "10", carottes: "15", pdterre: "15", poireaux: "7½",  navets: "7½",  ail: "10 gousses"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🥩", titre: "Démarrer à l'eau froide", detail: "Mettre la viande dans une grande marmite. Couvrir d'eau froide. Porter lentement à ébullition. Écumer soigneusement au fur et à mesure.", badge: "⏱ 20 min d'écumage" },
      { icone: "🌿", titre: "Ajouter aromates",         detail: "Ajouter bouquet garni, ail, oignon piqué de clous de girofle, sel et poivre en grains. Baisser le feu et laisser mijoter doucement.", badge: "⏱ 1h30" },
      { icone: "🥕", titre: "Ajouter les légumes",      detail: "Éplucher et ajouter carottes, poireaux, navets. Continuer la cuisson à feu doux.", badge: "⏱ 45 min" },
      { icone: "🥔", titre: "Pommes de terre",          detail: "Ajouter les pommes de terre 30 min avant la fin. Elles ne doivent pas se désintégrer.", badge: "⏱ 30 min" },
      { icone: "🍽️", titre: "Servir",                  detail: "Servir le bouillon en entrée avec vermicelles. Puis la viande et les légumes avec moutarde, cornichons, fleur de sel et os à moelle grillés.", badge: null },
    ]
  },

  parisbrestreinterpretation: {
    base: 8,
    temps: "1h30",
    niveau: "⭐⭐⭐ Difficile",
    emoji: "🍰",
    description: "Le Paris-Brest — pâte à choux en couronne, crème mousseline pralinée et éclats de pralin. Le grand dessert classique français.",
    tableauParisBrest: [
      { nb:  1, eauChoux: "16 ml",  laitChoux: "16 ml",  beurrChoux: "12 g",  farine: "19 g",  oeufChoux: "½",  laitCreme: "62 ml",  jaunesCreme: "½",  sucreCreme: "12 g",  maizena: "5 g",  beurrCreme: "25 g",  pralin: "19 g"  },
      { nb:  2, eauChoux: "31 ml",  laitChoux: "31 ml",  beurrChoux: "25 g",  farine: "38 g",  oeufChoux: "1",   laitCreme: "125 ml", jaunesCreme: "1",   sucreCreme: "25 g",  maizena: "10 g", beurrCreme: "50 g",  pralin: "38 g"  },
      { nb:  3, eauChoux: "47 ml",  laitChoux: "47 ml",  beurrChoux: "37 g",  farine: "56 g",  oeufChoux: "1½",  laitCreme: "187 ml", jaunesCreme: "1½",  sucreCreme: "37 g",  maizena: "15 g", beurrCreme: "75 g",  pralin: "56 g"  },
      { nb:  4, eauChoux: "62 ml",  laitChoux: "62 ml",  beurrChoux: "50 g",  farine: "75 g",  oeufChoux: "2",   laitCreme: "250 ml", jaunesCreme: "2",   sucreCreme: "50 g",  maizena: "20 g", beurrCreme: "100 g", pralin: "75 g"  },
      { nb:  5, eauChoux: "78 ml",  laitChoux: "78 ml",  beurrChoux: "62 g",  farine: "94 g",  oeufChoux: "2½",  laitCreme: "312 ml", jaunesCreme: "2½",  sucreCreme: "62 g",  maizena: "25 g", beurrCreme: "125 g", pralin: "94 g"  },
      { nb:  6, eauChoux: "94 ml",  laitChoux: "94 ml",  beurrChoux: "75 g",  farine: "112 g", oeufChoux: "3",   laitCreme: "375 ml", jaunesCreme: "3",   sucreCreme: "75 g",  maizena: "30 g", beurrCreme: "150 g", pralin: "112 g" },
      { nb:  7, eauChoux: "109 ml", laitChoux: "109 ml", beurrChoux: "87 g",  farine: "131 g", oeufChoux: "3½",  laitCreme: "437 ml", jaunesCreme: "3½",  sucreCreme: "87 g",  maizena: "35 g", beurrCreme: "175 g", pralin: "131 g" },
      { nb:  8, eauChoux: "125 ml", laitChoux: "125 ml", beurrChoux: "100 g", farine: "150 g", oeufChoux: "4",   laitCreme: "500 ml", jaunesCreme: "4",   sucreCreme: "100 g", maizena: "40 g", beurrCreme: "200 g", pralin: "150 g" },
      { nb:  9, eauChoux: "141 ml", laitChoux: "141 ml", beurrChoux: "112 g", farine: "169 g", oeufChoux: "4½",  laitCreme: "562 ml", jaunesCreme: "4½",  sucreCreme: "112 g", maizena: "45 g", beurrCreme: "225 g", pralin: "169 g" },
      { nb: 10, eauChoux: "156 ml", laitChoux: "156 ml", beurrChoux: "125 g", farine: "188 g", oeufChoux: "5",   laitCreme: "625 ml", jaunesCreme: "5",   sucreCreme: "125 g", maizena: "50 g", beurrCreme: "250 g", pralin: "188 g" },
      { nb: 11, eauChoux: "172 ml", laitChoux: "172 ml", beurrChoux: "137 g", farine: "206 g", oeufChoux: "5½",  laitCreme: "687 ml", jaunesCreme: "5½",  sucreCreme: "137 g", maizena: "55 g", beurrCreme: "275 g", pralin: "206 g" },
      { nb: 12, eauChoux: "187 ml", laitChoux: "187 ml", beurrChoux: "150 g", farine: "225 g", oeufChoux: "6",   laitCreme: "750 ml", jaunesCreme: "6",   sucreCreme: "150 g", maizena: "60 g", beurrCreme: "300 g", pralin: "225 g" },
      { nb: 13, eauChoux: "203 ml", laitChoux: "203 ml", beurrChoux: "162 g", farine: "244 g", oeufChoux: "6½",  laitCreme: "812 ml", jaunesCreme: "6½",  sucreCreme: "162 g", maizena: "65 g", beurrCreme: "325 g", pralin: "244 g" },
      { nb: 14, eauChoux: "219 ml", laitChoux: "219 ml", beurrChoux: "175 g", farine: "262 g", oeufChoux: "7",   laitCreme: "875 ml", jaunesCreme: "7",   sucreCreme: "175 g", maizena: "70 g", beurrCreme: "350 g", pralin: "262 g" },
      { nb: 15, eauChoux: "234 ml", laitChoux: "234 ml", beurrChoux: "187 g", farine: "281 g", oeufChoux: "7½",  laitCreme: "937 ml", jaunesCreme: "7½",  sucreCreme: "187 g", maizena: "75 g", beurrCreme: "375 g", pralin: "281 g" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Pâte à choux",            detail: "Porter eau, lait, beurre, sel et sucre à ébullition. Hors du feu, verser farine d'un coup. Remuer vigoureusement pour dessécher la pâte 2 min sur le feu. Incorporer les œufs un à un hors du feu.", badge: null },
      { icone: "⭕", titre: "Dresser la couronne",      detail: "Préchauffer le four à 180°C. Sur une plaque recouverte de papier, dresser deux couronnes superposées avec une poche à douille. Parsemer d'amandes effilées.", badge: null },
      { icone: "🔥", titre: "Cuire",                   detail: "Enfourner sans ouvrir le four les 20 premières minutes.", badge: "⏱ 30-35 min à 180°C" },
      { icone: "🌰", titre: "Crème mousseline pralinée",detail: "Préparer une crème pâtissière. Laisser refroidir. Fouetter le beurre mou, incorporer la crème pâtissière froide et le pralin. Fouetter jusqu'à texture légère.", badge: null },
      { icone: "🍰", titre: "Monter le Paris-Brest",   detail: "Couper la couronne en deux. Garnir généreusement de crème pralinée avec une poche à douille cannelée. Refermer et saupoudrer de sucre glace.", badge: null },
    ]
  },

  mojito: {
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🍹",
    description: "Le mojito cubain classique — rhum blanc, menthe fraîche, citron vert, sucre de canne et eau gazeuse. Frais et incontournable.",
    tableauMojito: [
      { nb:  1, rhum: "5 cl",   citron: "½",  menthe: "8 feuilles",  sucre: "2 c.à.c",  eauGaz: "10 cl" },
      { nb:  2, rhum: "10 cl",  citron: "1",  menthe: "16 feuilles", sucre: "4 c.à.c",  eauGaz: "20 cl" },
      { nb:  3, rhum: "15 cl",  citron: "1½", menthe: "24 feuilles", sucre: "6 c.à.c",  eauGaz: "30 cl" },
      { nb:  4, rhum: "20 cl",  citron: "2",  menthe: "32 feuilles", sucre: "8 c.à.c",  eauGaz: "40 cl" },
      { nb:  5, rhum: "25 cl",  citron: "2½", menthe: "40 feuilles", sucre: "10 c.à.c", eauGaz: "50 cl" },
      { nb:  6, rhum: "30 cl",  citron: "3",  menthe: "48 feuilles", sucre: "12 c.à.c", eauGaz: "60 cl" },
      { nb:  7, rhum: "35 cl",  citron: "3½", menthe: "56 feuilles", sucre: "14 c.à.c", eauGaz: "70 cl" },
      { nb:  8, rhum: "40 cl",  citron: "4",  menthe: "64 feuilles", sucre: "16 c.à.c", eauGaz: "80 cl" },
      { nb:  9, rhum: "45 cl",  citron: "4½", menthe: "72 feuilles", sucre: "18 c.à.c", eauGaz: "90 cl" },
      { nb: 10, rhum: "50 cl",  citron: "5",  menthe: "80 feuilles", sucre: "20 c.à.c", eauGaz: "1 L"   },
      { nb: 11, rhum: "55 cl",  citron: "5½", menthe: "88 feuilles", sucre: "22 c.à.c", eauGaz: "1.1 L" },
      { nb: 12, rhum: "60 cl",  citron: "6",  menthe: "96 feuilles", sucre: "24 c.à.c", eauGaz: "1.2 L" },
      { nb: 13, rhum: "65 cl",  citron: "6½", menthe: "104 feuilles",sucre: "26 c.à.c", eauGaz: "1.3 L" },
      { nb: 14, rhum: "70 cl",  citron: "7",  menthe: "112 feuilles",sucre: "28 c.à.c", eauGaz: "1.4 L" },
      { nb: 15, rhum: "75 cl",  citron: "7½", menthe: "120 feuilles",sucre: "30 c.à.c", eauGaz: "1.5 L" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍋", titre: "Préparer le verre",        detail: "Dans un grand verre, mettre les feuilles de menthe et le sucre de canne. Ajouter le jus du citron vert. Piler doucement (pas trop fort — juste pour libérer les arômes).", badge: null },
      { icone: "🧊", titre: "Ajouter la glace",         detail: "Remplir le verre de glace pilée ou de glaçons.", badge: null },
      { icone: "🍶", titre: "Verser le rhum",           detail: "Verser le rhum blanc sur la glace.", badge: null },
      { icone: "💧", titre: "Compléter et servir",      detail: "Compléter avec l'eau gazeuse. Mélanger délicatement avec une cuillère longue. Garnir d'une branche de menthe et d'une rondelle de citron vert.", badge: null },
    ]
  },

  margarita: {
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍸",
    description: "La margarita mexicaine classique — tequila, triple sec et jus de citron vert. Servie avec le rebord givré de sel.",
    tableauMargarita: [
      { nb:  1, tequila: "5 cl",  tripleSec: "2 cl",  citron: "3 cl",  sel: "pour le rebord" },
      { nb:  2, tequila: "10 cl", tripleSec: "4 cl",  citron: "6 cl",  sel: "pour le rebord" },
      { nb:  3, tequila: "15 cl", tripleSec: "6 cl",  citron: "9 cl",  sel: "pour le rebord" },
      { nb:  4, tequila: "20 cl", tripleSec: "8 cl",  citron: "12 cl", sel: "pour le rebord" },
      { nb:  5, tequila: "25 cl", tripleSec: "10 cl", citron: "15 cl", sel: "pour le rebord" },
      { nb:  6, tequila: "30 cl", tripleSec: "12 cl", citron: "18 cl", sel: "pour le rebord" },
      { nb:  7, tequila: "35 cl", tripleSec: "14 cl", citron: "21 cl", sel: "pour le rebord" },
      { nb:  8, tequila: "40 cl", tripleSec: "16 cl", citron: "24 cl", sel: "pour le rebord" },
      { nb:  9, tequila: "45 cl", tripleSec: "18 cl", citron: "27 cl", sel: "pour le rebord" },
      { nb: 10, tequila: "50 cl", tripleSec: "20 cl", citron: "30 cl", sel: "pour le rebord" },
      { nb: 11, tequila: "55 cl", tripleSec: "22 cl", citron: "33 cl", sel: "pour le rebord" },
      { nb: 12, tequila: "60 cl", tripleSec: "24 cl", citron: "36 cl", sel: "pour le rebord" },
      { nb: 13, tequila: "65 cl", tripleSec: "26 cl", citron: "39 cl", sel: "pour le rebord" },
      { nb: 14, tequila: "70 cl", tripleSec: "28 cl", citron: "42 cl", sel: "pour le rebord" },
      { nb: 15, tequila: "75 cl", tripleSec: "30 cl", citron: "45 cl", sel: "pour le rebord" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🧂", titre: "Givrer le verre",          detail: "Frotter le bord du verre avec un quartier de citron vert. Tremper dans du sel fin pour givrer.", badge: null },
      { icone: "🍹", titre: "Shaker",                   detail: "Dans un shaker avec de la glace, verser tequila, triple sec et jus de citron vert. Shaker vigoureusement 10-15 secondes.", badge: "⏱ 15 sec" },
      { icone: "🍸", titre: "Servir",                   detail: "Filtrer dans le verre givré. Garnir d'une rondelle de citron vert.", badge: null },
    ]
  },

  cosmopolitan: {
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍸",
    description: "Le Cosmopolitan — vodka citronnée, Cointreau, jus de cranberry et citron vert. Le cocktail glamour par excellence.",
    tableauCosmopolitan: [
      { nb:  1, vodka: "4 cl",  cointreau: "2 cl",  cranberry: "3 cl",  citron: "1 cl"  },
      { nb:  2, vodka: "8 cl",  cointreau: "4 cl",  cranberry: "6 cl",  citron: "2 cl"  },
      { nb:  3, vodka: "12 cl", cointreau: "6 cl",  cranberry: "9 cl",  citron: "3 cl"  },
      { nb:  4, vodka: "16 cl", cointreau: "8 cl",  cranberry: "12 cl", citron: "4 cl"  },
      { nb:  5, vodka: "20 cl", cointreau: "10 cl", cranberry: "15 cl", citron: "5 cl"  },
      { nb:  6, vodka: "24 cl", cointreau: "12 cl", cranberry: "18 cl", citron: "6 cl"  },
      { nb:  7, vodka: "28 cl", cointreau: "14 cl", cranberry: "21 cl", citron: "7 cl"  },
      { nb:  8, vodka: "32 cl", cointreau: "16 cl", cranberry: "24 cl", citron: "8 cl"  },
      { nb:  9, vodka: "36 cl", cointreau: "18 cl", cranberry: "27 cl", citron: "9 cl"  },
      { nb: 10, vodka: "40 cl", cointreau: "20 cl", cranberry: "30 cl", citron: "10 cl" },
      { nb: 11, vodka: "44 cl", cointreau: "22 cl", cranberry: "33 cl", citron: "11 cl" },
      { nb: 12, vodka: "48 cl", cointreau: "24 cl", cranberry: "36 cl", citron: "12 cl" },
      { nb: 13, vodka: "52 cl", cointreau: "26 cl", cranberry: "39 cl", citron: "13 cl" },
      { nb: 14, vodka: "56 cl", cointreau: "28 cl", cranberry: "42 cl", citron: "14 cl" },
      { nb: 15, vodka: "60 cl", cointreau: "30 cl", cranberry: "45 cl", citron: "15 cl" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍹", titre: "Shaker avec glace",        detail: "Mettre de la glace dans le shaker. Ajouter vodka citronnée, Cointreau, jus de cranberry et jus de citron vert.", badge: null },
      { icone: "🥶", titre: "Shaker",                   detail: "Shaker vigoureusement une quinzaine de secondes.", badge: "⏱ 15 sec" },
      { icone: "🍸", titre: "Filtrer et servir",        detail: "Filtrer dans un verre à cocktail refroidi. Garnir d'un zeste de citron vert.", badge: null },
    ]
  },

  spritz: {
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🥂",
    description: "Le Spritz vénitien — Aperol, prosecco et eau gazeuse. L'apéritif italien par excellence, orange et pétillant.",
    tableauSpritz: [
      { nb:  1, aperol: "6 cl",  prosecco: "9 cl",  eauGaz: "3 cl",  orange: "½ rondelle" },
      { nb:  2, aperol: "12 cl", prosecco: "18 cl", eauGaz: "6 cl",  orange: "1 rondelle" },
      { nb:  3, aperol: "18 cl", prosecco: "27 cl", eauGaz: "9 cl",  orange: "1½ rondelle"},
      { nb:  4, aperol: "24 cl", prosecco: "36 cl", eauGaz: "12 cl", orange: "2 rondelles" },
      { nb:  5, aperol: "30 cl", prosecco: "45 cl", eauGaz: "15 cl", orange: "2½ rondelles"},
      { nb:  6, aperol: "36 cl", prosecco: "54 cl", eauGaz: "18 cl", orange: "3 rondelles" },
      { nb:  7, aperol: "42 cl", prosecco: "63 cl", eauGaz: "21 cl", orange: "3½ rondelles"},
      { nb:  8, aperol: "48 cl", prosecco: "72 cl", eauGaz: "24 cl", orange: "4 rondelles" },
      { nb:  9, aperol: "54 cl", prosecco: "81 cl", eauGaz: "27 cl", orange: "4½ rondelles"},
      { nb: 10, aperol: "60 cl", prosecco: "90 cl", eauGaz: "30 cl", orange: "5 rondelles" },
      { nb: 11, aperol: "66 cl", prosecco: "99 cl", eauGaz: "33 cl", orange: "5½ rondelles"},
      { nb: 12, aperol: "72 cl", prosecco: "108 cl",eauGaz: "36 cl", orange: "6 rondelles" },
      { nb: 13, aperol: "78 cl", prosecco: "117 cl",eauGaz: "39 cl", orange: "6½ rondelles"},
      { nb: 14, aperol: "84 cl", prosecco: "126 cl",eauGaz: "42 cl", orange: "7 rondelles" },
      { nb: 15, aperol: "90 cl", prosecco: "135 cl",eauGaz: "45 cl", orange: "7½ rondelles"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Préparer le verre",        detail: "Remplir un grand verre à vin de glaçons.", badge: null },
      { icone: "🥂", titre: "Verser dans l'ordre",     detail: "Verser d'abord le prosecco, puis l'Aperol, puis l'eau gazeuse. Cet ordre préserve les bulles.", badge: null },
      { icone: "🍊", titre: "Garnir et servir",         detail: "Garnir d'une rondelle d'orange et d'une olive verte. Mélanger très délicatement.", badge: null },
    ]
  },

  sangria: {
    base: 6,
    temps: "15 min + 2h repos",
    niveau: "⭐ Facile",
    emoji: "🍷",
    description: "La sangria espagnole — vin rouge fruité, brandy, jus d'orange et fruits frais. Parfaite pour les grandes tablées.",
    tableauSangria: [
      { nb:  1, vin: "125 ml", brandy: "1 cl",   orangeJus: "3 cl",  sucre: "1 c.à.c", orange: "¼",  citron: "¼",  peche: "¼" },
      { nb:  2, vin: "250 ml", brandy: "2 cl",   orangeJus: "6 cl",  sucre: "2 c.à.c", orange: "½",  citron: "½",  peche: "½" },
      { nb:  3, vin: "375 ml", brandy: "3 cl",   orangeJus: "9 cl",  sucre: "3 c.à.c", orange: "¾",  citron: "¾",  peche: "¾" },
      { nb:  4, vin: "500 ml", brandy: "4 cl",   orangeJus: "12 cl", sucre: "4 c.à.c", orange: "1",  citron: "1",  peche: "1" },
      { nb:  5, vin: "625 ml", brandy: "5 cl",   orangeJus: "15 cl", sucre: "5 c.à.c", orange: "1",  citron: "1",  peche: "1" },
      { nb:  6, vin: "750 ml", brandy: "6 cl",   orangeJus: "18 cl", sucre: "6 c.à.c", orange: "1",  citron: "1",  peche: "2" },
      { nb:  7, vin: "875 ml", brandy: "7 cl",   orangeJus: "21 cl", sucre: "7 c.à.c", orange: "1½", citron: "1",  peche: "2" },
      { nb:  8, vin: "1 L",    brandy: "8 cl",   orangeJus: "24 cl", sucre: "8 c.à.c", orange: "1½", citron: "1½", peche: "2" },
      { nb:  9, vin: "1.1 L",  brandy: "9 cl",   orangeJus: "27 cl", sucre: "9 c.à.c", orange: "2",  citron: "1½", peche: "3" },
      { nb: 10, vin: "1.25 L", brandy: "10 cl",  orangeJus: "30 cl", sucre: "10 c.à.c",orange: "2",  citron: "2",  peche: "3" },
      { nb: 11, vin: "1.4 L",  brandy: "11 cl",  orangeJus: "33 cl", sucre: "11 c.à.c",orange: "2",  citron: "2",  peche: "3" },
      { nb: 12, vin: "1.5 L",  brandy: "12 cl",  orangeJus: "36 cl", sucre: "12 c.à.c",orange: "2",  citron: "2",  peche: "4" },
      { nb: 13, vin: "1.6 L",  brandy: "13 cl",  orangeJus: "39 cl", sucre: "13 c.à.c",orange: "2½", citron: "2",  peche: "4" },
      { nb: 14, vin: "1.75 L", brandy: "14 cl",  orangeJus: "42 cl", sucre: "14 c.à.c",orange: "2½", citron: "2½", peche: "4" },
      { nb: 15, vin: "1.9 L",  brandy: "15 cl",  orangeJus: "45 cl", sucre: "15 c.à.c",orange: "3",  citron: "2½", peche: "5" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍊", titre: "Préparer les fruits",      detail: "Couper orange, citron et pêche en tranches ou en dés.", badge: null },
      { icone: "🍷", titre: "Mélanger",                 detail: "Dans un grand pichet, verser le vin rouge, le brandy, le jus d'orange et le sucre. Bien mélanger pour dissoudre le sucre.", badge: null },
      { icone: "🍑", titre: "Ajouter les fruits",       detail: "Ajouter les fruits coupés. Mélanger.", badge: null },
      { icone: "❄️", titre: "Repos au frigo",           detail: "Réfrigérer au moins 2h pour que les saveurs se mélangent. Servir avec des glaçons et compléter avec du jus d'orange si trop fort.", badge: "⏱ 2h minimum" },
    ]
  },

  pinacolada: {
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🥥",
    description: "La Piña Colada portoricaine — rhum blanc, crème de coco et ananas. Le cocktail tropical par excellence.",
    tableauPinaColada: [
      { nb:  1, rhum: "5 cl",  cremeCoco: "3 cl",  ananas: "12 cl", glace: "1 poignée" },
      { nb:  2, rhum: "10 cl", cremeCoco: "6 cl",  ananas: "24 cl", glace: "2 poignées"},
      { nb:  3, rhum: "15 cl", cremeCoco: "9 cl",  ananas: "36 cl", glace: "3 poignées"},
      { nb:  4, rhum: "20 cl", cremeCoco: "12 cl", ananas: "48 cl", glace: "4 poignées"},
      { nb:  5, rhum: "25 cl", cremeCoco: "15 cl", ananas: "60 cl", glace: "5 poignées"},
      { nb:  6, rhum: "30 cl", cremeCoco: "18 cl", ananas: "72 cl", glace: "6 poignées"},
      { nb:  7, rhum: "35 cl", cremeCoco: "21 cl", ananas: "84 cl", glace: "7 poignées"},
      { nb:  8, rhum: "40 cl", cremeCoco: "24 cl", ananas: "96 cl", glace: "8 poignées"},
      { nb:  9, rhum: "45 cl", cremeCoco: "27 cl", ananas: "108 cl",glace: "9 poignées"},
      { nb: 10, rhum: "50 cl", cremeCoco: "30 cl", ananas: "120 cl",glace: "10 poignées"},
      { nb: 11, rhum: "55 cl", cremeCoco: "33 cl", ananas: "132 cl",glace: "11 poignées"},
      { nb: 12, rhum: "60 cl", cremeCoco: "36 cl", ananas: "144 cl",glace: "12 poignées"},
      { nb: 13, rhum: "65 cl", cremeCoco: "39 cl", ananas: "156 cl",glace: "13 poignées"},
      { nb: 14, rhum: "70 cl", cremeCoco: "42 cl", ananas: "168 cl",glace: "14 poignées"},
      { nb: 15, rhum: "75 cl", cremeCoco: "45 cl", ananas: "180 cl",glace: "15 poignées"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🌀", titre: "Mixer",                    detail: "Mettre tous les ingrédients dans un blender avec la glace pilée. Mixer jusqu'à obtenir une texture lisse et crémeuse.", badge: "⏱ 30 sec blender" },
      { icone: "🥥", titre: "Servir",                   detail: "Verser dans un grand verre. Garnir d'une tranche d'ananas et d'une cerise. Servir avec une paille.", badge: null },
    ]
  },

  daiquiri: {
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍸",
    description: "Le Daiquiri cubain — rhum blanc, jus de citron vert et sucre de canne. Simple, élégant et parfaitement équilibré.",
    tableauDaiquiri: [
      { nb:  1, rhum: "5 cl",  citron: "2.5 cl", sucre: "1.5 cl" },
      { nb:  2, rhum: "10 cl", citron: "5 cl",   sucre: "3 cl"   },
      { nb:  3, rhum: "15 cl", citron: "7.5 cl", sucre: "4.5 cl" },
      { nb:  4, rhum: "20 cl", citron: "10 cl",  sucre: "6 cl"   },
      { nb:  5, rhum: "25 cl", citron: "12.5 cl",sucre: "7.5 cl" },
      { nb:  6, rhum: "30 cl", citron: "15 cl",  sucre: "9 cl"   },
      { nb:  7, rhum: "35 cl", citron: "17.5 cl",sucre: "10.5 cl"},
      { nb:  8, rhum: "40 cl", citron: "20 cl",  sucre: "12 cl"  },
      { nb:  9, rhum: "45 cl", citron: "22.5 cl",sucre: "13.5 cl"},
      { nb: 10, rhum: "50 cl", citron: "25 cl",  sucre: "15 cl"  },
      { nb: 11, rhum: "55 cl", citron: "27.5 cl",sucre: "16.5 cl"},
      { nb: 12, rhum: "60 cl", citron: "30 cl",  sucre: "18 cl"  },
      { nb: 13, rhum: "65 cl", citron: "32.5 cl",sucre: "19.5 cl"},
      { nb: 14, rhum: "70 cl", citron: "35 cl",  sucre: "21 cl"  },
      { nb: 15, rhum: "75 cl", citron: "37.5 cl",sucre: "22.5 cl"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🍹", titre: "Shaker avec glace",        detail: "Mettre de la glace dans le shaker. Ajouter rhum blanc, jus de citron vert fraîchement pressé et sirop de sucre de canne.", badge: null },
      { icone: "🥶", titre: "Shaker vigoureusement",    detail: "Shaker fort pendant 15 secondes pour bien refroidir et diluer légèrement.", badge: "⏱ 15 sec" },
      { icone: "🍸", titre: "Filtrer et servir",        detail: "Filtrer dans un verre à cocktail refroidi. Garnir d'un zeste de citron vert.", badge: null },
    ]
  },

  whiskysour: {
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🥃",
    description: "Le Whisky Sour — bourbon, jus de citron, sirop de sucre et blanc d'œuf pour la mousse. Un classique américain.",
    tableauWhiskySour: [
      { nb:  1, bourbon: "5 cl",  citron: "2.5 cl", sirop: "2 cl",  blanc: "1"  },
      { nb:  2, bourbon: "10 cl", citron: "5 cl",   sirop: "4 cl",  blanc: "1"  },
      { nb:  3, bourbon: "15 cl", citron: "7.5 cl", sirop: "6 cl",  blanc: "2"  },
      { nb:  4, bourbon: "20 cl", citron: "10 cl",  sirop: "8 cl",  blanc: "2"  },
      { nb:  5, bourbon: "25 cl", citron: "12.5 cl",sirop: "10 cl", blanc: "3"  },
      { nb:  6, bourbon: "30 cl", citron: "15 cl",  sirop: "12 cl", blanc: "3"  },
      { nb:  7, bourbon: "35 cl", citron: "17.5 cl",sirop: "14 cl", blanc: "4"  },
      { nb:  8, bourbon: "40 cl", citron: "20 cl",  sirop: "16 cl", blanc: "4"  },
      { nb:  9, bourbon: "45 cl", citron: "22.5 cl",sirop: "18 cl", blanc: "5"  },
      { nb: 10, bourbon: "50 cl", citron: "25 cl",  sirop: "20 cl", blanc: "5"  },
      { nb: 11, bourbon: "55 cl", citron: "27.5 cl",sirop: "22 cl", blanc: "6"  },
      { nb: 12, bourbon: "60 cl", citron: "30 cl",  sirop: "24 cl", blanc: "6"  },
      { nb: 13, bourbon: "65 cl", citron: "32.5 cl",sirop: "26 cl", blanc: "7"  },
      { nb: 14, bourbon: "70 cl", citron: "35 cl",  sirop: "28 cl", blanc: "7"  },
      { nb: 15, bourbon: "75 cl", citron: "37.5 cl",sirop: "30 cl", blanc: "8"  },
    ],
    ingredients: {},
    etapes: [
      { icone: "🥚", titre: "Dry shake",                detail: "Mettre tous les ingrédients dans le shaker SANS glace. Shaker fort 10 sec pour émulsionner le blanc d'œuf.", badge: "⏱ 10 sec sans glace" },
      { icone: "🧊", titre: "Wet shake",                detail: "Ajouter de la glace et shaker à nouveau vigoureusement.", badge: "⏱ 15 sec avec glace" },
      { icone: "🥃", titre: "Servir",                   detail: "Filtrer dans un verre avec glaçons. Garnir d'une cerise et d'une rondelle de citron. La mousse de blanc d'œuf doit être belle et onctueuse.", badge: null },
    ]
  },

  virginmojito: {
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🥤",
    description: "Le Virgin Mojito — menthe fraîche, citron vert, sucre de canne et eau gazeuse. Toute la fraîcheur du mojito, sans alcool !",
    tableauVirginMojito: [
      { nb:  1, citron: "1",   menthe: "10 feuilles", sucre: "2 c.à.c",  eauGaz: "15 cl", sirop: "1 cl"  },
      { nb:  2, citron: "2",   menthe: "20 feuilles", sucre: "4 c.à.c",  eauGaz: "30 cl", sirop: "2 cl"  },
      { nb:  3, citron: "3",   menthe: "30 feuilles", sucre: "6 c.à.c",  eauGaz: "45 cl", sirop: "3 cl"  },
      { nb:  4, citron: "4",   menthe: "40 feuilles", sucre: "8 c.à.c",  eauGaz: "60 cl", sirop: "4 cl"  },
      { nb:  5, citron: "5",   menthe: "50 feuilles", sucre: "10 c.à.c", eauGaz: "75 cl", sirop: "5 cl"  },
      { nb:  6, citron: "6",   menthe: "60 feuilles", sucre: "12 c.à.c", eauGaz: "90 cl", sirop: "6 cl"  },
      { nb:  7, citron: "7",   menthe: "70 feuilles", sucre: "14 c.à.c", eauGaz: "1 L",   sirop: "7 cl"  },
      { nb:  8, citron: "8",   menthe: "80 feuilles", sucre: "16 c.à.c", eauGaz: "1.2 L", sirop: "8 cl"  },
      { nb:  9, citron: "9",   menthe: "90 feuilles", sucre: "18 c.à.c", eauGaz: "1.35 L",sirop: "9 cl"  },
      { nb: 10, citron: "10",  menthe: "100 feuilles",sucre: "20 c.à.c", eauGaz: "1.5 L", sirop: "10 cl" },
      { nb: 11, citron: "11",  menthe: "110 feuilles",sucre: "22 c.à.c", eauGaz: "1.65 L",sirop: "11 cl" },
      { nb: 12, citron: "12",  menthe: "120 feuilles",sucre: "24 c.à.c", eauGaz: "1.8 L", sirop: "12 cl" },
      { nb: 13, citron: "13",  menthe: "130 feuilles",sucre: "26 c.à.c", eauGaz: "1.95 L",sirop: "13 cl" },
      { nb: 14, citron: "14",  menthe: "140 feuilles",sucre: "28 c.à.c", eauGaz: "2.1 L", sirop: "14 cl" },
      { nb: 15, citron: "15",  menthe: "150 feuilles",sucre: "30 c.à.c", eauGaz: "2.25 L",sirop: "15 cl" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍋", titre: "Piler menthe + citron",    detail: "Dans un verre, mettre les feuilles de menthe et le sucre. Presser le citron vert par-dessus. Piler doucement.", badge: null },
      { icone: "🧊", titre: "Glace",                    detail: "Remplir de glace pilée.", badge: null },
      { icone: "💧", titre: "Compléter",                detail: "Ajouter le sirop de menthe et l'eau gazeuse. Mélanger délicatement. Garnir de menthe fraîche.", badge: null },
    ]
  },

  limonademaison: {
    base: 4,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🍋",
    description: "La limonade maison fraîche et naturelle — citrons pressés, sucre de canne et eau gazeuse. Bien meilleure que celle du commerce !",
    tableauLimonade: [
      { nb:  1, citrons: "1",   sucre: "2 c.à.s",  eauGaz: "20 cl", menthe: "3 feuilles"  },
      { nb:  2, citrons: "1",   sucre: "3 c.à.s",  eauGaz: "40 cl", menthe: "6 feuilles"  },
      { nb:  3, citrons: "2",   sucre: "5 c.à.s",  eauGaz: "60 cl", menthe: "9 feuilles"  },
      { nb:  4, citrons: "3",   sucre: "6 c.à.s",  eauGaz: "80 cl", menthe: "12 feuilles" },
      { nb:  5, citrons: "3",   sucre: "8 c.à.s",  eauGaz: "100 cl",menthe: "15 feuilles" },
      { nb:  6, citrons: "4",   sucre: "9 c.à.s",  eauGaz: "120 cl",menthe: "18 feuilles" },
      { nb:  7, citrons: "5",   sucre: "11 c.à.s", eauGaz: "140 cl",menthe: "21 feuilles" },
      { nb:  8, citrons: "5",   sucre: "12 c.à.s", eauGaz: "160 cl",menthe: "24 feuilles" },
      { nb:  9, citrons: "6",   sucre: "14 c.à.s", eauGaz: "180 cl",menthe: "27 feuilles" },
      { nb: 10, citrons: "7",   sucre: "15 c.à.s", eauGaz: "200 cl",menthe: "30 feuilles" },
      { nb: 11, citrons: "7",   sucre: "17 c.à.s", eauGaz: "220 cl",menthe: "33 feuilles" },
      { nb: 12, citrons: "8",   sucre: "18 c.à.s", eauGaz: "240 cl",menthe: "36 feuilles" },
      { nb: 13, citrons: "9",   sucre: "20 c.à.s", eauGaz: "260 cl",menthe: "39 feuilles" },
      { nb: 14, citrons: "9",   sucre: "21 c.à.s", eauGaz: "280 cl",menthe: "42 feuilles" },
      { nb: 15, citrons: "10",  sucre: "23 c.à.s", eauGaz: "300 cl",menthe: "45 feuilles" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍋", titre: "Préparer le sirop",        detail: "Faire chauffer 100ml d'eau avec le sucre jusqu'à dissolution complète. Laisser refroidir.", badge: null },
      { icone: "🍋", titre: "Presser les citrons",      detail: "Presser les citrons. Filtrer le jus.", badge: null },
      { icone: "🥤", titre: "Assembler",                detail: "Mélanger jus de citron et sirop refroidi. Ajouter l'eau gazeuse froide. Mélanger délicatement.", badge: null },
      { icone: "🌿", titre: "Servir",                   detail: "Servir dans des grands verres avec glaçons, rondelles de citron et feuilles de menthe.", badge: null },
    ]
  },

  smoothiemangopassion: {
    base: 2,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🥭",
    description: "Smoothie mangue passion tropical — onctueux, vitaminé et sans alcool. Un vrai voyage sous les tropiques !",
    tableauSmoothieMango: [
      { nb:  1, mangue: "100 g", passion: "1",   banane: "½",  lait: "80 ml",  miel: "1 c.à.c" },
      { nb:  2, mangue: "200 g", passion: "2",   banane: "1",  lait: "160 ml", miel: "2 c.à.c" },
      { nb:  3, mangue: "300 g", passion: "3",   banane: "1½", lait: "240 ml", miel: "3 c.à.c" },
      { nb:  4, mangue: "400 g", passion: "4",   banane: "2",  lait: "320 ml", miel: "4 c.à.c" },
      { nb:  5, mangue: "500 g", passion: "5",   banane: "2½", lait: "400 ml", miel: "5 c.à.c" },
      { nb:  6, mangue: "600 g", passion: "6",   banane: "3",  lait: "480 ml", miel: "6 c.à.c" },
      { nb:  7, mangue: "700 g", passion: "7",   banane: "3½", lait: "560 ml", miel: "7 c.à.c" },
      { nb:  8, mangue: "800 g", passion: "8",   banane: "4",  lait: "640 ml", miel: "8 c.à.c" },
      { nb:  9, mangue: "900 g", passion: "9",   banane: "4½", lait: "720 ml", miel: "9 c.à.c" },
      { nb: 10, mangue: "1 kg",  passion: "10",  banane: "5",  lait: "800 ml", miel: "10 c.à.c"},
      { nb: 11, mangue: "1.1 kg",passion: "11",  banane: "5½", lait: "880 ml", miel: "11 c.à.c"},
      { nb: 12, mangue: "1.2 kg",passion: "12",  banane: "6",  lait: "960 ml", miel: "12 c.à.c"},
      { nb: 13, mangue: "1.3 kg",passion: "13",  banane: "6½", lait: "1040 ml",miel: "13 c.à.c"},
      { nb: 14, mangue: "1.4 kg",passion: "14",  banane: "7",  lait: "1120 ml",miel: "14 c.à.c"},
      { nb: 15, mangue: "1.5 kg",passion: "15",  banane: "7½", lait: "1200 ml",miel: "15 c.à.c"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🥭", titre: "Préparer les fruits",      detail: "Éplucher et couper la mangue en morceaux. Couper les fruits de la passion en deux et récupérer la pulpe. Éplucher la banane.", badge: null },
      { icone: "🌀", titre: "Mixer",                    detail: "Mettre tous les ingrédients dans le blender avec quelques glaçons. Mixer jusqu'à texture lisse.", badge: "⏱ 30 sec" },
      { icone: "🥤", titre: "Servir",                   detail: "Verser dans des grands verres. Décorer d'une tranche de mangue et d'une paille. Déguster immédiatement !", badge: null },
    ]
  },

  citronadementhe: {
    base: 4,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🌿",
    description: "La citronnade à la menthe maison — fraîche, parfumée et naturelle. La boisson estivale incontournable sans alcool.",
    tableauCitronade: [
      { nb:  1, citrons: "1",  menthe: "5 feuilles",  sucre: "2 c.à.s", eau: "20 cl" },
      { nb:  2, citrons: "1",  menthe: "8 feuilles",  sucre: "3 c.à.s", eau: "40 cl" },
      { nb:  3, citrons: "2",  menthe: "10 feuilles", sucre: "5 c.à.s", eau: "60 cl" },
      { nb:  4, citrons: "2",  menthe: "15 feuilles", sucre: "6 c.à.s", eau: "80 cl" },
      { nb:  5, citrons: "3",  menthe: "18 feuilles", sucre: "8 c.à.s", eau: "100 cl"},
      { nb:  6, citrons: "3",  menthe: "20 feuilles", sucre: "9 c.à.s", eau: "120 cl"},
      { nb:  7, citrons: "4",  menthe: "25 feuilles", sucre: "11 c.à.s",eau: "140 cl"},
      { nb:  8, citrons: "4",  menthe: "28 feuilles", sucre: "12 c.à.s",eau: "160 cl"},
      { nb:  9, citrons: "5",  menthe: "30 feuilles", sucre: "14 c.à.s",eau: "180 cl"},
      { nb: 10, citrons: "5",  menthe: "35 feuilles", sucre: "15 c.à.s",eau: "200 cl"},
      { nb: 11, citrons: "6",  menthe: "38 feuilles", sucre: "17 c.à.s",eau: "220 cl"},
      { nb: 12, citrons: "6",  menthe: "40 feuilles", sucre: "18 c.à.s",eau: "240 cl"},
      { nb: 13, citrons: "7",  menthe: "45 feuilles", sucre: "20 c.à.s",eau: "260 cl"},
      { nb: 14, citrons: "7",  menthe: "48 feuilles", sucre: "21 c.à.s",eau: "280 cl"},
      { nb: 15, citrons: "8",  menthe: "50 feuilles", sucre: "23 c.à.s",eau: "300 cl"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Sirop menthe",             detail: "Chauffer 100ml d'eau avec le sucre et la menthe. Laisser infuser 10 min hors du feu. Filtrer et refroidir.", badge: "⏱ 10 min infusion" },
      { icone: "🍋", titre: "Presser les citrons",      detail: "Presser les citrons et filtrer le jus.", badge: null },
      { icone: "🥤", titre: "Assembler et servir",      detail: "Mélanger jus de citron, sirop à la menthe et eau fraîche. Servir avec glaçons et feuilles de menthe fraîches.", badge: null },
    ]
  },

  jusPastequeMenuthe: {
    base: 4,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🍉",
    description: "Jus de pastèque à la menthe — ultra rafraîchissant, naturellement sucré et plein de vitamines. Le mocktail de l'été !",
    tableauJusPasteque: [
      { nb:  1, pasteque: "250 g", menthe: "3 feuilles", citron: "¼",  gingembre: "½ cm" },
      { nb:  2, pasteque: "500 g", menthe: "5 feuilles", citron: "½",  gingembre: "1 cm" },
      { nb:  3, pasteque: "750 g", menthe: "8 feuilles", citron: "¾",  gingembre: "1 cm" },
      { nb:  4, pasteque: "1 kg",  menthe: "10 feuilles",citron: "1",  gingembre: "2 cm" },
      { nb:  5, pasteque: "1.25 kg",menthe: "12 feuilles",citron: "1", gingembre: "2 cm" },
      { nb:  6, pasteque: "1.5 kg", menthe: "15 feuilles",citron: "1½",gingembre: "2 cm" },
      { nb:  7, pasteque: "1.75 kg",menthe: "18 feuilles",citron: "1½",gingembre: "3 cm" },
      { nb:  8, pasteque: "2 kg",   menthe: "20 feuilles",citron: "2", gingembre: "3 cm" },
      { nb:  9, pasteque: "2.25 kg",menthe: "22 feuilles",citron: "2", gingembre: "3 cm" },
      { nb: 10, pasteque: "2.5 kg", menthe: "25 feuilles",citron: "2½",gingembre: "4 cm" },
      { nb: 11, pasteque: "2.75 kg",menthe: "28 feuilles",citron: "2½",gingembre: "4 cm" },
      { nb: 12, pasteque: "3 kg",   menthe: "30 feuilles",citron: "3", gingembre: "4 cm" },
      { nb: 13, pasteque: "3.25 kg",menthe: "32 feuilles",citron: "3", gingembre: "5 cm" },
      { nb: 14, pasteque: "3.5 kg", menthe: "35 feuilles",citron: "3½",gingembre: "5 cm" },
      { nb: 15, pasteque: "3.75 kg",menthe: "38 feuilles",citron: "3½",gingembre: "5 cm" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍉", titre: "Préparer la pastèque",     detail: "Couper la pastèque en morceaux, retirer les pépins et enlever la peau.", badge: null },
      { icone: "🌀", titre: "Mixer",                    detail: "Mixer la pastèque avec la menthe, le jus de citron et le gingembre râpé jusqu'à texture lisse.", badge: "⏱ 30 sec" },
      { icone: "🥤", titre: "Filtrer et servir",        detail: "Filtrer si souhaité. Servir très frais avec glaçons et feuilles de menthe. Ne pas sucrer — la pastèque est naturellement sucrée !", badge: null },
    ]
  },

  virginpinacolada: {
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🥥",
    description: "Virgin Piña Colada — lait de coco, jus d'ananas et glace pilée. Toute la magie tropicale, sans alcool !",
    tableauVirginPina: [
      { nb:  1, cremeCoco: "6 cl",  ananas: "12 cl", laitCoco: "4 cl",  glace: "1 poignée" },
      { nb:  2, cremeCoco: "12 cl", ananas: "24 cl", laitCoco: "8 cl",  glace: "2 poignées"},
      { nb:  3, cremeCoco: "18 cl", ananas: "36 cl", laitCoco: "12 cl", glace: "3 poignées"},
      { nb:  4, cremeCoco: "24 cl", ananas: "48 cl", laitCoco: "16 cl", glace: "4 poignées"},
      { nb:  5, cremeCoco: "30 cl", ananas: "60 cl", laitCoco: "20 cl", glace: "5 poignées"},
      { nb:  6, cremeCoco: "36 cl", ananas: "72 cl", laitCoco: "24 cl", glace: "6 poignées"},
      { nb:  7, cremeCoco: "42 cl", ananas: "84 cl", laitCoco: "28 cl", glace: "7 poignées"},
      { nb:  8, cremeCoco: "48 cl", ananas: "96 cl", laitCoco: "32 cl", glace: "8 poignées"},
      { nb:  9, cremeCoco: "54 cl", ananas: "108 cl",laitCoco: "36 cl", glace: "9 poignées"},
      { nb: 10, cremeCoco: "60 cl", ananas: "120 cl",laitCoco: "40 cl", glace: "10 poignées"},
      { nb: 11, cremeCoco: "66 cl", ananas: "132 cl",laitCoco: "44 cl", glace: "11 poignées"},
      { nb: 12, cremeCoco: "72 cl", ananas: "144 cl",laitCoco: "48 cl", glace: "12 poignées"},
      { nb: 13, cremeCoco: "78 cl", ananas: "156 cl",laitCoco: "52 cl", glace: "13 poignées"},
      { nb: 14, cremeCoco: "84 cl", ananas: "168 cl",laitCoco: "56 cl", glace: "14 poignées"},
      { nb: 15, cremeCoco: "90 cl", ananas: "180 cl",laitCoco: "60 cl", glace: "15 poignées"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🌀", titre: "Mixer",                    detail: "Mettre tous les ingrédients dans le blender avec la glace pilée. Mixer jusqu'à texture crémeuse et onctueuse.", badge: "⏱ 30 sec" },
      { icone: "🥥", titre: "Servir",                   detail: "Verser dans un grand verre. Décorer d'une tranche d'ananas, de noix de coco râpée et d'une paille. Servir immédiatement !", badge: null },
    ]
  },

  ramenjaponais: {
    base: 2,
    temps: "45 min",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🍜",
    description: "Le ramen japonais maison — bouillon riche et parfumé, nouilles élastiques, œuf mollet et garnitures généreuses.",
    tableauRamen: [
      { nb:  1, nouilles: "80 g",  bouillon: "400 ml", porc: "80 g",  oeuf: "1",  shiitake: "30 g" },
      { nb:  2, nouilles: "160 g", bouillon: "800 ml", porc: "160 g", oeuf: "2",  shiitake: "60 g" },
      { nb:  3, nouilles: "240 g", bouillon: "1.2 L",  porc: "240 g", oeuf: "3",  shiitake: "90 g" },
      { nb:  4, nouilles: "320 g", bouillon: "1.6 L",  porc: "320 g", oeuf: "4",  shiitake: "120 g"},
      { nb:  5, nouilles: "400 g", bouillon: "2 L",    porc: "400 g", oeuf: "5",  shiitake: "150 g"},
      { nb:  6, nouilles: "480 g", bouillon: "2.4 L",  porc: "480 g", oeuf: "6",  shiitake: "180 g"},
      { nb:  7, nouilles: "560 g", bouillon: "2.8 L",  porc: "560 g", oeuf: "7",  shiitake: "210 g"},
      { nb:  8, nouilles: "640 g", bouillon: "3.2 L",  porc: "640 g", oeuf: "8",  shiitake: "240 g"},
      { nb:  9, nouilles: "720 g", bouillon: "3.6 L",  porc: "720 g", oeuf: "9",  shiitake: "270 g"},
      { nb: 10, nouilles: "800 g", bouillon: "4 L",    porc: "800 g", oeuf: "10", shiitake: "300 g"},
      { nb: 11, nouilles: "880 g", bouillon: "4.4 L",  porc: "880 g", oeuf: "11", shiitake: "330 g"},
      { nb: 12, nouilles: "960 g", bouillon: "4.8 L",  porc: "960 g", oeuf: "12", shiitake: "360 g"},
      { nb: 13, nouilles: "1040 g",bouillon: "5.2 L",  porc: "1040 g",oeuf: "13", shiitake: "390 g"},
      { nb: 14, nouilles: "1120 g",bouillon: "5.6 L",  porc: "1120 g",oeuf: "14", shiitake: "420 g"},
      { nb: 15, nouilles: "1200 g",bouillon: "6 L",    porc: "1200 g",oeuf: "15", shiitake: "450 g"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🍖", titre: "Préparer le bouillon",     detail: "Faire bouillir os de porc 5 min, égoutter et rincer. Remettre dans l'eau froide avec gingembre, ail, ciboule. Cuire à petit feu 3h pour un bouillon riche. Assaisonner avec sauce soja, miso et mirin.", badge: "⏱ 3h bouillon" },
      { icone: "🥚", titre: "Œufs mollets marinés",    detail: "Cuire les œufs 6 min 30 dans l'eau bouillante. Refroidir, écaler. Mariner dans sauce soja + mirin + eau (1:1:1) au moins 2h.", badge: "⏱ 2h marinade" },
      { icone: "🥩", titre: "Chashu (porc rôti)",       detail: "Rouler le ventre de porc et le ficeler. Faire dorer dans une poêle. Braiser dans sauce soja, mirin, saké et sucre 1h30 à feu doux.", badge: "⏱ 1h30" },
      { icone: "🍜", titre: "Cuire les nouilles",       detail: "Cuire les nouilles ramen selon le paquet. Bien les égoutter.", badge: "⏱ 2-3 min" },
      { icone: "🥢", titre: "Dresser le bol",           detail: "Verser le bouillon chaud dans les bols. Ajouter les nouilles. Déposer tranches de chashu, œuf mollet coupé en deux, shiitake sautés, bambou, maïs. Finir avec huile de sésame et nori.", badge: null },
    ]
  },

  gyoza: {
    base: 20,
    temps: "45 min",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥟",
    description: "Les gyoza japonais — raviolis croustillants en dessous, cuits vapeur au-dessus. Farce porc-chou et sauce ponzu.",
    tableauGyoza: [
      { nb:  5, pate: "5 feuilles",  porc: "75 g",  chou: "50 g",  ail: "½ gousse", gingembre: "½ cm" },
      { nb: 10, pate: "10 feuilles", porc: "150 g", chou: "100 g", ail: "1 gousse",  gingembre: "1 cm" },
      { nb: 15, pate: "15 feuilles", porc: "225 g", chou: "150 g", ail: "1 gousse",  gingembre: "1 cm" },
      { nb: 20, pate: "20 feuilles", porc: "300 g", chou: "200 g", ail: "2 gousses", gingembre: "2 cm" },
      { nb: 25, pate: "25 feuilles", porc: "375 g", chou: "250 g", ail: "2 gousses", gingembre: "2 cm" },
      { nb: 30, pate: "30 feuilles", porc: "450 g", chou: "300 g", ail: "3 gousses", gingembre: "3 cm" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🥬", titre: "Préparer la farce",        detail: "Ciseler finement le chou. Saler et laisser dégorger 10 min. Presser pour enlever l'eau. Mélanger avec porc haché, ail et gingembre râpés, sauce soja, huile de sésame, sel.", badge: null },
      { icone: "🥟", titre: "Plier les gyoza",          detail: "Déposer une petite cuillerée de farce au centre de chaque feuille. Humidifier le bord avec de l'eau. Plier en demi-lune en faisant des petits plis sur le côté.", badge: null },
      { icone: "🍳", titre: "Cuire — yaki-gyoza",       detail: "Chauffer de l'huile dans une poêle. Dorer les gyoza côté plat 2-3 min. Verser 100ml d'eau, couvrir immédiatement. Cuire à la vapeur jusqu'à évaporation.", badge: "⏱ 6-8 min total" },
      { icone: "🍶", titre: "Sauce ponzu",              detail: "Mélanger sauce soja, vinaigre de riz et huile de sésame. Ajouter piment et gingembre selon goût.", badge: null },
    ]
  },

  tikamasala: {
    base: 4,
    temps: "50 min + marinade",
    niveau: "⭐ Facile",
    emoji: "🍗",
    description: "Le poulet tikka masala — poulet mariné au yaourt et épices, dans une sauce tomate crémeuse. Le curry britannique préféré !",
    tableauTikaMasala: [
      { nb:  1, poulet: "150 g", tomates: "100 g", creme: "50 ml",  yaourt: "50 g",  masala: "1 c.à.c" },
      { nb:  2, poulet: "300 g", tomates: "200 g", creme: "100 ml", yaourt: "100 g", masala: "2 c.à.c" },
      { nb:  3, poulet: "450 g", tomates: "300 g", creme: "150 ml", yaourt: "150 g", masala: "3 c.à.c" },
      { nb:  4, poulet: "600 g", tomates: "400 g", creme: "200 ml", yaourt: "200 g", masala: "4 c.à.c" },
      { nb:  5, poulet: "750 g", tomates: "500 g", creme: "250 ml", yaourt: "250 g", masala: "5 c.à.c" },
      { nb:  6, poulet: "900 g", tomates: "600 g", creme: "300 ml", yaourt: "300 g", masala: "6 c.à.c" },
      { nb:  7, poulet: "1050 g",tomates: "700 g", creme: "350 ml", yaourt: "350 g", masala: "7 c.à.c" },
      { nb:  8, poulet: "1200 g",tomates: "800 g", creme: "400 ml", yaourt: "400 g", masala: "8 c.à.c" },
      { nb:  9, poulet: "1350 g",tomates: "900 g", creme: "450 ml", yaourt: "450 g", masala: "9 c.à.c" },
      { nb: 10, poulet: "1500 g",tomates: "1 kg",  creme: "500 ml", yaourt: "500 g", masala: "10 c.à.c"},
      { nb: 11, poulet: "1650 g",tomates: "1.1 kg",creme: "550 ml", yaourt: "550 g", masala: "11 c.à.c"},
      { nb: 12, poulet: "1800 g",tomates: "1.2 kg",creme: "600 ml", yaourt: "600 g", masala: "12 c.à.c"},
      { nb: 13, poulet: "1950 g",tomates: "1.3 kg",creme: "650 ml", yaourt: "650 g", masala: "13 c.à.c"},
      { nb: 14, poulet: "2100 g",tomates: "1.4 kg",creme: "700 ml", yaourt: "700 g", masala: "14 c.à.c"},
      { nb: 15, poulet: "2250 g",tomates: "1.5 kg",creme: "750 ml", yaourt: "750 g", masala: "15 c.à.c"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🥛", titre: "Marinade tikka",           detail: "Mélanger yaourt, jus de citron, garam masala, curcuma, cumin, gingembre et ail. Y plonger le poulet en cubes. Mariner au frais.", badge: "⏱ 2h minimum" },
      { icone: "🔥", titre: "Griller le poulet",        detail: "Égoutter le poulet. Faire dorer à la poêle ou au gril à feu vif. Réserver.", badge: "⏱ 8 min" },
      { icone: "🍅", titre: "Sauce masala",             detail: "Faire revenir oignon, ail, gingembre dans le beurre. Ajouter épices (garam masala, paprika, cumin, coriandre). Puis tomates concassées. Mijoter 15 min.", badge: "⏱ 15 min" },
      { icone: "🌀", titre: "Mixer la sauce",           detail: "Mixer la sauce pour la rendre onctueuse. Remettre sur feu doux.", badge: null },
      { icone: "🍦", titre: "Finir",                    detail: "Ajouter crème fraîche et poulet grillé. Laisser mijoter 10 min. Servir avec riz basmati et naans.", badge: "⏱ 10 min" },
    ]
  },

  phovietnambien: {
    base: 2,
    temps: "4h (bouillon)",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🍲",
    description: "Le pho vietnamien authentique — bouillon de bœuf longuement mijoté aux épices, nouilles de riz et herbes fraîches.",
    tableauPho: [
      { nb:  1, nouilles: "80 g",  bouillon: "500 ml", boeuf: "80 g",  anis: "1",  cannelle: "½ bâton" },
      { nb:  2, nouilles: "160 g", bouillon: "1 L",    boeuf: "160 g", anis: "2",  cannelle: "1 bâton"  },
      { nb:  3, nouilles: "240 g", bouillon: "1.5 L",  boeuf: "240 g", anis: "3",  cannelle: "1 bâton"  },
      { nb:  4, nouilles: "320 g", bouillon: "2 L",    boeuf: "320 g", anis: "4",  cannelle: "2 bâtons" },
      { nb:  5, nouilles: "400 g", bouillon: "2.5 L",  boeuf: "400 g", anis: "5",  cannelle: "2 bâtons" },
      { nb:  6, nouilles: "480 g", bouillon: "3 L",    boeuf: "480 g", anis: "6",  cannelle: "3 bâtons" },
      { nb:  7, nouilles: "560 g", bouillon: "3.5 L",  boeuf: "560 g", anis: "7",  cannelle: "3 bâtons" },
      { nb:  8, nouilles: "640 g", bouillon: "4 L",    boeuf: "640 g", anis: "8",  cannelle: "4 bâtons" },
      { nb:  9, nouilles: "720 g", bouillon: "4.5 L",  boeuf: "720 g", anis: "9",  cannelle: "4 bâtons" },
      { nb: 10, nouilles: "800 g", bouillon: "5 L",    boeuf: "800 g", anis: "10", cannelle: "5 bâtons" },
      { nb: 11, nouilles: "880 g", bouillon: "5.5 L",  boeuf: "880 g", anis: "11", cannelle: "5 bâtons" },
      { nb: 12, nouilles: "960 g", bouillon: "6 L",    boeuf: "960 g", anis: "12", cannelle: "6 bâtons" },
      { nb: 13, nouilles: "1040 g",bouillon: "6.5 L",  boeuf: "1040 g",anis: "13", cannelle: "6 bâtons" },
      { nb: 14, nouilles: "1120 g",bouillon: "7 L",    boeuf: "1120 g",anis: "14", cannelle: "7 bâtons" },
      { nb: 15, nouilles: "1200 g",bouillon: "7.5 L",  boeuf: "1200 g",anis: "15", cannelle: "7 bâtons" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Torréfier les épices",     detail: "Faire griller à sec oignons coupés en deux et gingembre jusqu'à coloration. Ajouter anis étoilé, cannelle, clous de girofle, cardamome. Torréfier 2 min.", badge: null },
      { icone: "🍖", titre: "Préparer le bouillon",     detail: "Blanchir les os de bœuf 5 min, égoutter. Remettre avec eau froide, épices torréfiées, sauce poisson et sucre de palme. Écumer régulièrement.", badge: "⏱ 4h minimum" },
      { icone: "🍜", titre: "Préparer les nouilles",    detail: "Tremper les nouilles de riz dans l'eau froide 30 min. Les blanchir 1 min dans l'eau bouillante. Égoutter.", badge: null },
      { icone: "🥢", titre: "Dresser le pho",           detail: "Disposer les nouilles dans les bols. Ajouter le bœuf cru tranché très fin (il cuira dans le bouillon bouillant). Verser le bouillon brûlant. Accompagner de germes de soja, basilic thaï, citron vert, piment.", badge: null },
    ]
  },

  pizzamargherita: {
    base: 2,
    temps: "20 min + 48h pâte",
    niveau: "⭐ Facile",
    emoji: "🍕",
    description: "La pizza Margherita napolitaine — la vraie, avec sauce tomate San Marzano, mozzarella di bufala et basilic frais.",
    tableauPizzaMargherita: [
      { nb:  1, pate: "1 pâton",  tomates: "80 g",  mozza: "100 g", basilic: "5 feuilles"  },
      { nb:  2, pate: "2 pâtons", tomates: "160 g", mozza: "200 g", basilic: "10 feuilles" },
      { nb:  3, pate: "3 pâtons", tomates: "240 g", mozza: "300 g", basilic: "15 feuilles" },
      { nb:  4, pate: "4 pâtons", tomates: "320 g", mozza: "400 g", basilic: "20 feuilles" },
      { nb:  5, pate: "5 pâtons", tomates: "400 g", mozza: "500 g", basilic: "25 feuilles" },
      { nb:  6, pate: "6 pâtons", tomates: "480 g", mozza: "600 g", basilic: "30 feuilles" },
      { nb:  7, pate: "7 pâtons", tomates: "560 g", mozza: "700 g", basilic: "35 feuilles" },
      { nb:  8, pate: "8 pâtons", tomates: "640 g", mozza: "800 g", basilic: "40 feuilles" },
      { nb:  9, pate: "9 pâtons", tomates: "720 g", mozza: "900 g", basilic: "45 feuilles" },
      { nb: 10, pate: "10 pâtons",tomates: "800 g", mozza: "1 kg",  basilic: "50 feuilles" },
      { nb: 11, pate: "11 pâtons",tomates: "880 g", mozza: "1.1 kg",basilic: "55 feuilles" },
      { nb: 12, pate: "12 pâtons",tomates: "960 g", mozza: "1.2 kg",basilic: "60 feuilles" },
      { nb: 13, pate: "13 pâtons",tomates: "1040 g",mozza: "1.3 kg",basilic: "65 feuilles" },
      { nb: 14, pate: "14 pâtons",tomates: "1120 g",mozza: "1.4 kg",basilic: "70 feuilles" },
      { nb: 15, pate: "15 pâtons",tomates: "1200 g",mozza: "1.5 kg",basilic: "75 feuilles" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🫓", titre: "Préparer la pâte",         detail: "Utiliser la recette de pâte à pizza de l'appli (48h de fermentation). Sortir les pâtons 1h avant.", badge: null },
      { icone: "🍅", titre: "Sauce tomate",             detail: "Écraser les tomates San Marzano à la main avec sel, huile d'olive et basilic. Ne pas cuire — la sauce reste crue.", badge: null },
      { icone: "📏", titre: "Étaler la pâte",           detail: "Étaler chaque pâton à la main en partant du centre vers les bords. Ne jamais utiliser de rouleau — laisser les bords épais.", badge: null },
      { icone: "🧀", titre: "Garnir",                   detail: "Étaler la sauce en spirale. Déposer la mozzarella di bufala égouttée et déchirée. Arroser d'huile d'olive.", badge: null },
      { icone: "🔥", titre: "Cuire à très haute température",detail: "Cuire sur une pierre à pizza ou plaque préchauffée au maximum du four. La pizza est prête quand les bords sont bien gonflés et dorés.", badge: "⏱ 7-10 min à 280°C max" },
      { icone: "🌿", titre: "Finir",                    detail: "Sortir du four, ajouter le basilic frais et un filet d'huile d'olive extra vierge. Servir immédiatement.", badge: null },
    ]
  },

  carbonara: {
    base: 4,
    temps: "20 min",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🍝",
    description: "La vraie carbonara romaine — sans crème ! Seulement spaghetti, guanciale, pecorino, œufs et poivre. Un art de la simplicité.",
    tableauCarbonara: [
      { nb:  1, spaghetti: "80 g",  guanciale: "40 g",  oeufs: "1 jaune + ½ entier", pecorino: "30 g"  },
      { nb:  2, spaghetti: "160 g", guanciale: "80 g",  oeufs: "2 jaunes + 1 entier",pecorino: "60 g"  },
      { nb:  3, spaghetti: "240 g", guanciale: "120 g", oeufs: "3 jaunes + 1 entier",pecorino: "90 g"  },
      { nb:  4, spaghetti: "320 g", guanciale: "160 g", oeufs: "4 jaunes + 2 entiers",pecorino: "120 g" },
      { nb:  5, spaghetti: "400 g", guanciale: "200 g", oeufs: "5 jaunes + 2 entiers",pecorino: "150 g" },
      { nb:  6, spaghetti: "480 g", guanciale: "240 g", oeufs: "6 jaunes + 3 entiers",pecorino: "180 g" },
      { nb:  7, spaghetti: "560 g", guanciale: "280 g", oeufs: "7 jaunes + 3 entiers",pecorino: "210 g" },
      { nb:  8, spaghetti: "640 g", guanciale: "320 g", oeufs: "8 jaunes + 4 entiers",pecorino: "240 g" },
      { nb:  9, spaghetti: "720 g", guanciale: "360 g", oeufs: "9 jaunes + 4 entiers",pecorino: "270 g" },
      { nb: 10, spaghetti: "800 g", guanciale: "400 g", oeufs: "10 jaunes + 5 entiers",pecorino: "300 g"},
      { nb: 11, spaghetti: "880 g", guanciale: "440 g", oeufs: "11 jaunes + 5 entiers",pecorino: "330 g"},
      { nb: 12, spaghetti: "960 g", guanciale: "480 g", oeufs: "12 jaunes + 6 entiers",pecorino: "360 g"},
      { nb: 13, spaghetti: "1040 g",guanciale: "520 g", oeufs: "13 jaunes + 6 entiers",pecorino: "390 g"},
      { nb: 14, spaghetti: "1120 g",guanciale: "560 g", oeufs: "14 jaunes + 7 entiers",pecorino: "420 g"},
      { nb: 15, spaghetti: "1200 g",guanciale: "600 g", oeufs: "15 jaunes + 7 entiers",pecorino: "450 g"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🍝", titre: "Cuire les pâtes",          detail: "Cuire les spaghetti dans eau bouillante très salée. Les garder al dente. Garder 1 tasse d'eau de cuisson.", badge: null },
      { icone: "🥓", titre: "Cuire le guanciale",       detail: "À sec dans une poêle froide, faire fondre le guanciale à feu moyen-doux. Il doit être croustillant à l'extérieur. Éteindre le feu.", badge: "⏱ 8 min" },
      { icone: "🥚", titre: "Préparer la crème d'œufs",detail: "Fouetter vigoureusement jaunes + œufs entiers + pecorino râpé + poivre noir généreusement moulu. Le mélange doit être épais.", badge: null },
      { icone: "🌡️", titre: "L'étape cruciale",       detail: "Hors du feu, ajouter les pâtes égouttées dans la poêle avec le guanciale. Verser la crème d'œufs. Mélanger vigoureusement en ajoutant l'eau de cuisson cuillère par cuillère jusqu'à sauce onctueuse. NE PAS remettre sur le feu.", badge: null },
      { icone: "🧀", titre: "Servir immédiatement",     detail: "Dresser dans des assiettes chaudes. Finir avec pecorino et poivre noir. La carbonara ne supporte pas l'attente !", badge: null },
    ]
  },

  ceebujen: {
    base: 4,
    temps: "1h30",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🐟",
    description: "Le Thiéboudienne (Ceebu Jen) sénégalais — riz au poisson, le plat national du Sénégal. Riche, coloré et parfumé.",
    tableauCeebujen: [
      { nb:  2, poisson: "400 g", riz: "200 g", tomates: "200 g", manioc: "100 g", carottes: "1" },
      { nb:  4, poisson: "800 g", riz: "400 g", tomates: "400 g", manioc: "200 g", carottes: "2" },
      { nb:  6, poisson: "1.2 kg",riz: "600 g", tomates: "600 g", manioc: "300 g", carottes: "3" },
      { nb:  8, poisson: "1.6 kg",riz: "800 g", tomates: "800 g", manioc: "400 g", carottes: "4" },
      { nb: 10, poisson: "2 kg",  riz: "1 kg",  tomates: "1 kg",  manioc: "500 g", carottes: "5" },
      { nb: 12, poisson: "2.4 kg",riz: "1.2 kg",tomates: "1.2 kg",manioc: "600 g", carottes: "6" },
      { nb: 14, poisson: "2.8 kg",riz: "1.4 kg",tomates: "1.4 kg",manioc: "700 g", carottes: "7" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🐟", titre: "Farcir et mariner le poisson", detail: "Farcir le poisson d'un mélange persil, ail, piment, citron. Frire dans l'huile jusqu'à belle coloration. Réserver.", badge: "⏱ 10 min" },
      { icone: "🍅", titre: "Préparer la sauce",        detail: "Dans la même huile, faire revenir oignon, tomates concassées, pâte de tomate, ail. Ajouter bouillon de poisson et épices (cumin, poivre, laurier).", badge: "⏱ 20 min" },
      { icone: "🥕", titre: "Cuire les légumes",        detail: "Ajouter manioc, carottes, aubergine et choux dans la sauce. Cuire jusqu'à mi-tendreté.", badge: "⏱ 20 min" },
      { icone: "🍚", titre: "Cuire le riz",             detail: "Retirer les légumes. Verser le riz rincé dans la sauce. Ajouter eau si nécessaire. Cuire à feu doux couvert jusqu'à absorption complète.", badge: "⏱ 20 min" },
      { icone: "🍽️", titre: "Dresser",                 detail: "Dresser le riz sur un grand plat. Disposer les légumes et le poisson dessus. Servir avec sauce piquante.", badge: null },
    ]
  },

  mafewestafricain: {
    base: 4,
    temps: "1h",
    niveau: "⭐ Facile",
    emoji: "🥜",
    description: "Le maafé ouest-africain — ragoût de viande à la sauce d'arachide. Un plat réconfortant du Mali, Sénégal et Guinée.",
    tableauMafe: [
      { nb:  2, viande: "300 g", arachide: "100 g", tomates: "150 g", patate: "200 g", oignon: "1" },
      { nb:  4, viande: "600 g", arachide: "200 g", tomates: "300 g", patate: "400 g", oignon: "1" },
      { nb:  6, viande: "900 g", arachide: "300 g", tomates: "450 g", patate: "600 g", oignon: "2" },
      { nb:  8, viande: "1.2 kg",arachide: "400 g", tomates: "600 g", patate: "800 g", oignon: "2" },
      { nb: 10, viande: "1.5 kg",arachide: "500 g", tomates: "750 g", patate: "1 kg",  oignon: "3" },
      { nb: 12, viande: "1.8 kg",arachide: "600 g", tomates: "900 g", patate: "1.2 kg",oignon: "3" },
      { nb: 14, viande: "2.1 kg",arachide: "700 g", tomates: "1050 g",patate: "1.4 kg",oignon: "4" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🥩", titre: "Faire dorer la viande",    detail: "Couper l'agneau ou le bœuf en morceaux. Faire dorer à feu vif dans l'huile. Réserver.", badge: "⏱ 8 min" },
      { icone: "🧅", titre: "Faire revenir",            detail: "Dans la même casserole, faire revenir l'oignon. Ajouter tomates concassées et pâte de tomate. Cuire 5 min.", badge: null },
      { icone: "🥜", titre: "Ajouter la pâte d'arachide", detail: "Délayer la pâte d'arachide avec du bouillon chaud. L'ajouter à la sauce avec la viande. Bien mélanger.", badge: null },
      { icone: "🍠", titre: "Ajouter les légumes",      detail: "Ajouter patate douce en cubes, carottes, piment. Laisser mijoter à feu doux.", badge: "⏱ 35 min" },
      { icone: "🍚", titre: "Servir",                   detail: "Rectifier l'assaisonnement. Servir sur riz blanc. Le maafé doit être épais et onctueux.", badge: null },
    ]
  },

  gnocchismaison: {
    base: 4,
    temps: "1h",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥔",
    description: "Les gnocchis maison à la sauce gorgonzola — légers comme des nuages, fondants en bouche avec une sauce crémeuse au fromage.",
    tableauGnocchis: [
      { nb:  1, pdterre: "200 g", farine: "60 g",  oeuf: "¼",  gorgonzola: "40 g",  creme: "50 ml"  },
      { nb:  2, pdterre: "400 g", farine: "120 g", oeuf: "½",  gorgonzola: "80 g",  creme: "100 ml" },
      { nb:  3, pdterre: "600 g", farine: "180 g", oeuf: "¾",  gorgonzola: "120 g", creme: "150 ml" },
      { nb:  4, pdterre: "800 g", farine: "240 g", oeuf: "1",  gorgonzola: "160 g", creme: "200 ml" },
      { nb:  5, pdterre: "1 kg",  farine: "300 g", oeuf: "1¼", gorgonzola: "200 g", creme: "250 ml" },
      { nb:  6, pdterre: "1.2 kg",farine: "360 g", oeuf: "1½", gorgonzola: "240 g", creme: "300 ml" },
      { nb:  7, pdterre: "1.4 kg",farine: "420 g", oeuf: "1¾", gorgonzola: "280 g", creme: "350 ml" },
      { nb:  8, pdterre: "1.6 kg",farine: "480 g", oeuf: "2",  gorgonzola: "320 g", creme: "400 ml" },
      { nb:  9, pdterre: "1.8 kg",farine: "540 g", oeuf: "2¼", gorgonzola: "360 g", creme: "450 ml" },
      { nb: 10, pdterre: "2 kg",  farine: "600 g", oeuf: "2½", gorgonzola: "400 g", creme: "500 ml" },
      { nb: 11, pdterre: "2.2 kg",farine: "660 g", oeuf: "2¾", gorgonzola: "440 g", creme: "550 ml" },
      { nb: 12, pdterre: "2.4 kg",farine: "720 g", oeuf: "3",  gorgonzola: "480 g", creme: "600 ml" },
      { nb: 13, pdterre: "2.6 kg",farine: "780 g", oeuf: "3¼", gorgonzola: "520 g", creme: "650 ml" },
      { nb: 14, pdterre: "2.8 kg",farine: "840 g", oeuf: "3½", gorgonzola: "560 g", creme: "700 ml" },
      { nb: 15, pdterre: "3 kg",  farine: "900 g", oeuf: "3¾", gorgonzola: "600 g", creme: "750 ml" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🥔", titre: "Cuire les pommes de terre", detail: "Cuire les pommes de terre en robe des champs. Éplucher à chaud et écraser immédiatement en purée fine.", badge: "⏱ 30 min" },
      { icone: "🌾", titre: "Former la pâte",           detail: "Laisser la purée tiédir. Ajouter farine, œuf et sel. Mélanger sans trop travailler jusqu'à pâte homogène. Elle doit être souple mais non collante.", badge: null },
      { icone: "🥔", titre: "Façonner les gnocchis",    detail: "Rouler la pâte en boudins de 2cm. Couper en tronçons de 2cm. Passer chaque gnocchi sur une fourchette pour les strier.", badge: null },
      { icone: "💧", titre: "Cuire les gnocchis",       detail: "Plonger dans eau bouillante salée. Ils sont cuits quand ils remontent à la surface. Égoutter après 30 sec de flottaison.", badge: "⏱ 2-3 min" },
      { icone: "🧀", titre: "Sauce gorgonzola",         detail: "Faire fondre le gorgonzola dans la crème à feu doux. Ajouter les gnocchis, mélanger délicatement. Servir avec noix et roquette.", badge: null },
    ]
  },

  falafel: {
    base: 4,
    temps: "30 min + trempage",
    niveau: "⭐ Facile",
    emoji: "🧆",
    description: "Les falafels libanais croustillants — boulettes de pois chiches aux herbes et épices, frits et servis en pita avec tahini.",
    tableauFalafel: [
      { nb:  4, poischiches: "150 g", persil: "¼ botte", ail: "1 gousse",  cumin: "1 c.à.c", pita: "2"  },
      { nb:  8, poischiches: "300 g", persil: "½ botte", ail: "2 gousses", cumin: "2 c.à.c", pita: "4"  },
      { nb: 12, poischiches: "450 g", persil: "¾ botte", ail: "3 gousses", cumin: "3 c.à.c", pita: "6"  },
      { nb: 16, poischiches: "600 g", persil: "1 botte",  ail: "4 gousses", cumin: "4 c.à.c", pita: "8"  },
      { nb: 20, poischiches: "750 g", persil: "1 botte",  ail: "5 gousses", cumin: "5 c.à.c", pita: "10" },
      { nb: 24, poischiches: "900 g", persil: "1½ botte", ail: "6 gousses", cumin: "6 c.à.c", pita: "12" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🫘", titre: "Tremper les pois chiches", detail: "Faire tremper les pois chiches CRUS (pas en boîte !) dans eau froide. Égoutter et sécher.", badge: "⏱ 12h trempage" },
      { icone: "🌀", titre: "Mixer la farce",           detail: "Mixer pois chiches, persil, coriandre, ail, oignon, cumin, coriandre moulue, sel, poivre, bicarbonate. La texture doit être granuleuse — pas une purée.", badge: null },
      { icone: "⚽", titre: "Former les boulettes",     detail: "Former des boules de 3cm ou utiliser une cuillère à glace. Les réfrigérer 30 min pour qu'elles tiennent.", badge: "⏱ 30 min frigo" },
      { icone: "🔥", titre: "Frire",                    detail: "Frire dans huile chaude (180°C) jusqu'à belle couleur dorée et croustillante.", badge: "⏱ 3-4 min" },
      { icone: "🫓", titre: "Servir",                   detail: "Servir dans pita avec houmous, tahini, tomates, concombre, oignon rouge et herbes fraîches.", badge: null },
    ]
  },

  poulettandoori: {
    base: 4,
    temps: "30 min + marinade",
    niveau: "⭐ Facile",
    emoji: "🍗",
    description: "Le poulet tandoori indien — mariné au yaourt et aux épices, cuit à haute température. Rouge vif, fumé et irrésistible.",
    tableauTandoori: [
      { nb:  1, poulet: "200 g", yaourt: "60 g",  citron: "¼", masala: "1 c.à.c", paprika: "½ c.à.c" },
      { nb:  2, poulet: "400 g", yaourt: "120 g", citron: "½", masala: "2 c.à.c", paprika: "1 c.à.c"  },
      { nb:  3, poulet: "600 g", yaourt: "180 g", citron: "¾", masala: "3 c.à.c", paprika: "1½ c.à.c" },
      { nb:  4, poulet: "800 g", yaourt: "240 g", citron: "1", masala: "4 c.à.c", paprika: "2 c.à.c"  },
      { nb:  5, poulet: "1 kg",  yaourt: "300 g", citron: "1", masala: "5 c.à.c", paprika: "2½ c.à.c" },
      { nb:  6, poulet: "1.2 kg",yaourt: "360 g", citron: "1½",masala: "6 c.à.c", paprika: "3 c.à.c"  },
      { nb:  7, poulet: "1.4 kg",yaourt: "420 g", citron: "1½",masala: "7 c.à.c", paprika: "3½ c.à.c" },
      { nb:  8, poulet: "1.6 kg",yaourt: "480 g", citron: "2", masala: "8 c.à.c", paprika: "4 c.à.c"  },
      { nb:  9, poulet: "1.8 kg",yaourt: "540 g", citron: "2", masala: "9 c.à.c", paprika: "4½ c.à.c" },
      { nb: 10, poulet: "2 kg",  yaourt: "600 g", citron: "2½",masala: "10 c.à.c",paprika: "5 c.à.c"  },
      { nb: 11, poulet: "2.2 kg",yaourt: "660 g", citron: "2½",masala: "11 c.à.c",paprika: "5½ c.à.c" },
      { nb: 12, poulet: "2.4 kg",yaourt: "720 g", citron: "3", masala: "12 c.à.c",paprika: "6 c.à.c"  },
      { nb: 13, poulet: "2.6 kg",yaourt: "780 g", citron: "3", masala: "13 c.à.c",paprika: "6½ c.à.c" },
      { nb: 14, poulet: "2.8 kg",yaourt: "840 g", citron: "3½",masala: "14 c.à.c",paprika: "7 c.à.c"  },
      { nb: 15, poulet: "3 kg",  yaourt: "900 g", citron: "3½",masala: "15 c.à.c",paprika: "7½ c.à.c" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🔪", titre: "Entailler le poulet",      detail: "Faire des entailles profondes dans la chair du poulet pour que la marinade pénètre bien.", badge: null },
      { icone: "🌶️", titre: "Marinade tandoori",       detail: "Mélanger yaourt, jus de citron, gingembre et ail râpés, garam masala, cumin, coriandre, paprika (pour la couleur rouge), curcuma et sel. Enrober généreusement. Mariner au frais.", badge: "⏱ 4h minimum, 24h idéal" },
      { icone: "🔥", titre: "Cuire à haute température",detail: "Cuire au four préchauffé à 220°C sur grille (pour que l'air circule). Ou au barbecue pour le goût fumé authentique.", badge: "⏱ 25-30 min à 220°C" },
      { icone: "🍋", titre: "Servir",                   detail: "Servir avec rondelles de citron, oignon rouge en lamelles, coriandre fraîche, naans et sauce raïta (yaourt concombre menthe).", badge: null },
    ]
  },

  pekinduckeasy: {
    base: 4,
    temps: "2h30",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🦆",
    description: "Le canard laqué pékinois version maison — peau croustillante et laquée, servi en crêpes avec sauce hoisin et concombre.",
    tableauPekinDuck: [
      { nb:  2, canard: "½",    hoisin: "3 c.à.s", crepesP: "8",   concombre: "½",  ciboule: "3" },
      { nb:  4, canard: "1",    hoisin: "6 c.à.s", crepesP: "16",  concombre: "1",  ciboule: "6" },
      { nb:  6, canard: "1½",   hoisin: "9 c.à.s", crepesP: "24",  concombre: "1½", ciboule: "9" },
      { nb:  8, canard: "2",    hoisin: "12 c.à.s",crepesP: "32",  concombre: "2",  ciboule: "12"},
      { nb: 10, canard: "2½",   hoisin: "15 c.à.s",crepesP: "40",  concombre: "2½", ciboule: "15"},
      { nb: 12, canard: "3",    hoisin: "18 c.à.s",crepesP: "48",  concombre: "3",  ciboule: "18"},
      { nb: 14, canard: "3½",   hoisin: "21 c.à.s",crepesP: "56",  concombre: "3½", ciboule: "21"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🦆", titre: "Préparer le canard",       detail: "Sécher la peau du canard avec du papier absorbant. Mélanger miel, sauce soja, vinaigre de riz et cinq-épices. Badigeonner le canard généreusement. Laisser sécher à l'air 2h (ou 1 nuit au frigo).", badge: "⏱ 2h séchage" },
      { icone: "🔥", titre: "Rôtir",                    detail: "Préchauffer à 200°C. Poser le canard sur une grille au-dessus d'un plat. Rôtir en retournant et badigeonnant toutes les 30 min.", badge: "⏱ 1h30 à 200°C" },
      { icone: "🔪", titre: "Découper",                 detail: "Laisser reposer 10 min. Découper en tranches fines en séparant la peau croustillante de la chair.", badge: null },
      { icone: "🫓", titre: "Préparer les crêpes",      detail: "Réchauffer les crêpes pékinoises (ou crêpes fines maison) dans de la vapeur 2 min.", badge: null },
      { icone: "🥢", titre: "Dresser et servir",        detail: "Chaque convive garnit sa crêpe de sauce hoisin, concombre en julienne, ciboule émincée et tranches de canard laqué. Rouler et déguster !", badge: null },
    ]
  },

  ossobuco: {
    base: 4,
    temps: "2h",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🦴",
    description: "L'osso buco milanais — jarret de veau braisé lentement, gremolata citronnée et risotto au safran. Un grand classique lombard.",
    tableauOssobuco: [
      { nb:  2, jarret: "2 tranches",  vin: "100 ml", bouillon: "200 ml", tomates: "150 g" },
      { nb:  4, jarret: "4 tranches",  vin: "200 ml", bouillon: "400 ml", tomates: "300 g" },
      { nb:  6, jarret: "6 tranches",  vin: "300 ml", bouillon: "600 ml", tomates: "450 g" },
      { nb:  8, jarret: "8 tranches",  vin: "400 ml", bouillon: "800 ml", tomates: "600 g" },
      { nb: 10, jarret: "10 tranches", vin: "500 ml", bouillon: "1 L",    tomates: "750 g" },
      { nb: 12, jarret: "12 tranches", vin: "600 ml", bouillon: "1.2 L",  tomates: "900 g" },
      { nb: 14, jarret: "14 tranches", vin: "700 ml", bouillon: "1.4 L",  tomates: "1050 g"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🦴", titre: "Fariner et dorer",         detail: "Fariner les tranches de jarret. Les faire dorer à feu vif dans huile + beurre. Bien dorer toutes les faces. Réserver.", badge: "⏱ 8 min" },
      { icone: "🧅", titre: "Soffritto",                detail: "Dans la même casserole, faire fondre oignon, carotte et céleri finement émincés.", badge: "⏱ 8 min" },
      { icone: "🍷", titre: "Déglacer et braiser",      detail: "Déglacer au vin blanc. Ajouter tomates concassées, bouillon, zeste de citron et thym. Remettre le veau. Couvrir.", badge: "⏱ 1h30 à feu doux" },
      { icone: "🌿", titre: "Gremolata",                detail: "Mélanger finement zeste de citron, ail et persil plat ciselés. Parsemer sur l'osso buco en fin de cuisson.", badge: null },
      { icone: "🍚", titre: "Servir",                   detail: "Servir avec risotto milanese au safran. Ne pas oublier la moelle dans l'os — c'est le meilleur !", badge: null },
    ]
  },

  tajinemouton: {
    base: 4,
    temps: "2h",
    niveau: "⭐ Facile",
    emoji: "🏺",
    description: "Le tajine d'agneau aux pruneaux et amandes — viande fondante, fruits sucrés et épices orientales. La douceur du Maroc.",
    tableauTajine: [
      { nb:  2, agneau: "400 g", pruneaux: "80 g",  amandes: "40 g",  miel: "1 c.à.s", oignon: "1" },
      { nb:  4, agneau: "800 g", pruneaux: "160 g", amandes: "80 g",  miel: "2 c.à.s", oignon: "2" },
      { nb:  6, agneau: "1.2 kg",pruneaux: "240 g", amandes: "120 g", miel: "3 c.à.s", oignon: "2" },
      { nb:  8, agneau: "1.6 kg",pruneaux: "320 g", amandes: "160 g", miel: "4 c.à.s", oignon: "3" },
      { nb: 10, agneau: "2 kg",  pruneaux: "400 g", amandes: "200 g", miel: "5 c.à.s", oignon: "3" },
      { nb: 12, agneau: "2.4 kg",pruneaux: "480 g", amandes: "240 g", miel: "6 c.à.s", oignon: "4" },
      { nb: 14, agneau: "2.8 kg",pruneaux: "560 g", amandes: "280 g", miel: "7 c.à.s", oignon: "4" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🥩", titre: "Faire dorer l'agneau",    detail: "Couper l'agneau en morceaux. Faire dorer dans l'huile d'olive avec oignons émincés.", badge: "⏱ 10 min" },
      { icone: "🌶️", titre: "Ajouter les épices",      detail: "Ajouter cannelle, gingembre, curcuma, safran, sel et poivre. Bien enrober la viande. Couvrir d'eau ou de bouillon.", badge: null },
      { icone: "⏳", titre: "Cuisson lente",            detail: "Cuire à feu doux couvert jusqu'à ce que la viande soit très tendre.", badge: "⏱ 1h30" },
      { icone: "🫐", titre: "Ajouter pruneaux et miel", detail: "30 min avant la fin, ajouter les pruneaux et le miel. Laisser caraméliser légèrement.", badge: "⏱ 30 min" },
      { icone: "🌰", titre: "Finir et servir",          detail: "Faire dorer les amandes effilées au beurre. Parsemer sur le tajine. Servir avec semoule ou pain marocain.", badge: null },
    ]
  },

  moelleuxchocolat: {
    base: 6,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🍫",
    description: "Le moelleux au chocolat ultra fondant — plus coulant que le fondant, une texture entre gâteau et mousse. Irrésistible !",
    tableauMoelleux: [
      { nb:  1, chocolat: "50 g",  beurre: "40 g",  oeufs: "1",  sucre: "20 g",  farine: "15 g"  },
      { nb:  2, chocolat: "100 g", beurre: "80 g",  oeufs: "2",  sucre: "40 g",  farine: "30 g"  },
      { nb:  3, chocolat: "150 g", beurre: "120 g", oeufs: "3",  sucre: "60 g",  farine: "45 g"  },
      { nb:  4, chocolat: "200 g", beurre: "160 g", oeufs: "4",  sucre: "80 g",  farine: "60 g"  },
      { nb:  5, chocolat: "250 g", beurre: "200 g", oeufs: "5",  sucre: "100 g", farine: "75 g"  },
      { nb:  6, chocolat: "300 g", beurre: "240 g", oeufs: "6",  sucre: "120 g", farine: "90 g"  },
      { nb:  7, chocolat: "350 g", beurre: "280 g", oeufs: "7",  sucre: "140 g", farine: "105 g" },
      { nb:  8, chocolat: "400 g", beurre: "320 g", oeufs: "8",  sucre: "160 g", farine: "120 g" },
      { nb:  9, chocolat: "450 g", beurre: "360 g", oeufs: "9",  sucre: "180 g", farine: "135 g" },
      { nb: 10, chocolat: "500 g", beurre: "400 g", oeufs: "10", sucre: "200 g", farine: "150 g" },
      { nb: 11, chocolat: "550 g", beurre: "440 g", oeufs: "11", sucre: "220 g", farine: "165 g" },
      { nb: 12, chocolat: "600 g", beurre: "480 g", oeufs: "12", sucre: "240 g", farine: "180 g" },
      { nb: 13, chocolat: "650 g", beurre: "520 g", oeufs: "13", sucre: "260 g", farine: "195 g" },
      { nb: 14, chocolat: "700 g", beurre: "560 g", oeufs: "14", sucre: "280 g", farine: "210 g" },
      { nb: 15, chocolat: "750 g", beurre: "600 g", oeufs: "15", sucre: "300 g", farine: "225 g" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍫", titre: "Fondre chocolat + beurre", detail: "Faire fondre ensemble au bain-marie ou micro-ondes. Laisser tiédir.", badge: null },
      { icone: "🥚", titre: "Fouetter œufs + sucre",   detail: "Fouetter vigoureusement jusqu'à ce que le mélange blanchisse et double de volume.", badge: "⏱ 3 min" },
      { icone: "🌾", titre: "Incorporer farine",        detail: "Ajouter la farine tamisée. Puis le chocolat fondu tiédi. Mélanger délicatement.", badge: null },
      { icone: "🥧", titre: "Beurrer et remplir",       detail: "Beurrer et fariner des moules individuels. Remplir aux ¾. Mettre au congélateur 20 min.", badge: "⏱ 20 min congélateur" },
      { icone: "🔥", titre: "Cuire et servir immédiatement", detail: "Four préchauffé à 200°C. Sortir du congélateur direct. Le cœur doit rester liquide — surveiller ! Démouler et servir avec glace vanille.", badge: "⏱ 10-12 min à 200°C" },
    ]
  },

  cheesecake: {
    base: 8,
    temps: "1h + repos",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🍰",
    description: "Le cheesecake new-yorkais classique — base biscuitée croustillante, crème au Philadelphia onctueuse et coulis de fruits rouges.",
    tableauCheesecake: [
      { nb:  2, philadelphia: "200 g", biscuits: "80 g",  beurre: "40 g",  oeufs: "1",  sucre: "50 g",  creme: "50 ml"  },
      { nb:  4, philadelphia: "400 g", biscuits: "160 g", beurre: "80 g",  oeufs: "2",  sucre: "100 g", creme: "100 ml" },
      { nb:  6, philadelphia: "600 g", biscuits: "240 g", beurre: "120 g", oeufs: "3",  sucre: "150 g", creme: "150 ml" },
      { nb:  8, philadelphia: "800 g", biscuits: "320 g", beurre: "160 g", oeufs: "4",  sucre: "200 g", creme: "200 ml" },
      { nb: 10, philadelphia: "1 kg",  biscuits: "400 g", beurre: "200 g", oeufs: "5",  sucre: "250 g", creme: "250 ml" },
      { nb: 12, philadelphia: "1.2 kg",biscuits: "480 g", beurre: "240 g", oeufs: "6",  sucre: "300 g", creme: "300 ml" },
      { nb: 14, philadelphia: "1.4 kg",biscuits: "560 g", beurre: "280 g", oeufs: "7",  sucre: "350 g", creme: "350 ml" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍪", titre: "Base biscuitée",           detail: "Écraser les biscuits digestifs en miettes fines. Mélanger avec le beurre fondu. Tasser dans un moule à charnière. Réfrigérer 15 min.", badge: "⏱ 15 min frigo" },
      { icone: "🧀", titre: "Appareil cream cheese",    detail: "Fouetter le Philadelphia ramolli avec le sucre. Ajouter les œufs un à un. Incorporer la crème fraîche et la vanille. Ne pas trop fouetter.", badge: null },
      { icone: "🔥", titre: "Cuire au bain-marie",      detail: "Verser l'appareil sur la base. Cuire au bain-marie à 160°C. Le centre doit être encore légèrement tremblotant.", badge: "⏱ 55-65 min à 160°C" },
      { icone: "❄️", titre: "Refroidir lentement",      detail: "Éteindre le four, entrouvrir la porte. Laisser refroidir 1h dans le four puis 4h minimum au réfrigérateur.", badge: "⏱ 4h+ au frigo" },
      { icone: "🍓", titre: "Coulis et service",        detail: "Servir avec coulis de fruits rouges ou fraises fraîches.", badge: null },
    ]
  },

  painauchocolat: {
    base: 8,
    temps: "3h + repos",
    niveau: "⭐⭐⭐ Difficile",
    emoji: "🍫",
    description: "Les pains au chocolat maison — pâte feuilletée levée, beurre de tourage et barres de chocolat. Le vrai travail de boulanger !",
    tableauPainAuChocolat: [
      { nb:  2, farine: "63 g",  lait: "35 ml", beurre: "8 g",  sucre: "6 g",  levure: "2 g",  beurrage: "44 g",  chocolat: "20 g" },
      { nb:  4, farine: "125 g", lait: "70 ml", beurre: "15 g", sucre: "12 g", levure: "4 g",  beurrage: "88 g",  chocolat: "40 g" },
      { nb:  6, farine: "188 g", lait: "105 ml",beurre: "23 g", sucre: "18 g", levure: "6 g",  beurrage: "131 g", chocolat: "60 g" },
      { nb:  8, farine: "250 g", lait: "140 ml",beurre: "30 g", sucre: "25 g", levure: "8 g",  beurrage: "175 g", chocolat: "80 g" },
      { nb: 10, farine: "313 g", lait: "175 ml",beurre: "38 g", sucre: "31 g", levure: "10 g", beurrage: "219 g", chocolat: "100 g"},
      { nb: 12, farine: "375 g", lait: "210 ml",beurre: "45 g", sucre: "37 g", levure: "12 g", beurrage: "263 g", chocolat: "120 g"},
      { nb: 14, farine: "438 g", lait: "245 ml",beurre: "53 g", sucre: "43 g", levure: "14 g", beurrage: "306 g", chocolat: "140 g"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Détrempe",                 detail: "Mélanger farine, sel, sucre, levure et lait tiède. Pétrir 8 min. Ajouter beurre mou. Former un rectangle, filmer et réfrigérer.", badge: "⏱ 1h frigo" },
      { icone: "🧈", titre: "Beurrage",                 detail: "Aplatir le beurre de tourage froid en carré de 1cm. Il doit avoir la même consistance que la détrempe.", badge: null },
      { icone: "📏", titre: "Tourage (3 tours simples)", detail: "Envelopper le beurre dans la détrempe. Étaler en rectangle, plier en 3. Tourner 90°. Répéter 3 fois en laissant reposer 30 min au frigo entre chaque tour.", badge: "⏱ 3 × 30 min repos" },
      { icone: "🔪", titre: "Découper et façonner",     detail: "Étaler la pâte en rectangle de 3mm. Découper en rectangles. Poser 2 barres de chocolat. Rouler en serrant bien.", badge: null },
      { icone: "🔥", titre: "Lever et cuire",           detail: "Laisser lever 2h à température ambiante. Dorer au jaune d'œuf. Cuire jusqu'à belle coloration dorée.", badge: "⏱ 2h levée + 15-18 min à 180°C" },
    ]
  },

  gateaubasque: {
    base: 8,
    temps: "1h30",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🎂",
    description: "Le vrai gâteau basque — pâte sablée généreuse fourée de crème pâtissière à la vanille ou confiture de cerises noires d'Itxassou.",
    tableauGateauBasque: [
      { nb:  2, farine: "63 g",  beurre: "44 g",  sucre: "38 g",  oeufs: "½",  creme: "75 ml",  lait: "75 ml"  },
      { nb:  4, farine: "125 g", beurre: "88 g",  sucre: "75 g",  oeufs: "1",  creme: "150 ml", lait: "150 ml" },
      { nb:  6, farine: "188 g", beurre: "131 g", sucre: "113 g", oeufs: "1½", creme: "225 ml", lait: "225 ml" },
      { nb:  8, farine: "250 g", beurre: "175 g", sucre: "150 g", oeufs: "2",  creme: "300 ml", lait: "300 ml" },
      { nb: 10, farine: "313 g", beurre: "219 g", sucre: "188 g", oeufs: "2½", creme: "375 ml", lait: "375 ml" },
      { nb: 12, farine: "375 g", beurre: "263 g", sucre: "225 g", oeufs: "3",  creme: "450 ml", lait: "450 ml" },
      { nb: 14, farine: "438 g", beurre: "306 g", sucre: "263 g", oeufs: "3½", creme: "525 ml", lait: "525 ml" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Pâte sablée basque",       detail: "Travailler beurre pommade avec sucre. Ajouter œufs et vanille. Incorporer farine, levure et poudre d'amande. Former deux disques. Réfrigérer.", badge: "⏱ 1h frigo" },
      { icone: "🥛", titre: "Crème pâtissière",         detail: "Chauffer lait + crème + vanille. Fouetter jaunes + sucre + maïzena. Verser le lait chaud dessus. Recuire jusqu'à épaississement. Refroidir.", badge: null },
      { icone: "🏗️", titre: "Monter le gâteau",        detail: "Étaler un disque de pâte dans le moule beurré. Garnir de crème pâtissière. Couvrir du deuxième disque. Souder les bords.", badge: null },
      { icone: "🖌️", titre: "Décorer",                 detail: "Badigeonner de jaune d'œuf. Tracer le motif traditionnel basque avec une fourchette.", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Enfourner jusqu'à belle couleur dorée uniforme. Laisser refroidir avant de démouler.", badge: "⏱ 35-40 min à 180°C" },
    ]
  },

  canelebordelais: {
    base: 12,
    temps: "15 min + 24h repos",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🏺",
    description: "Les cannelés bordelais — croûte caramélisée croustillante et intérieur moelleux parfumé au rhum et vanille. La spécialité de Bordeaux.",
    tableauCanele: [
      { nb:  4, lait: "167 ml", beurre: "8 g",  sucre: "83 g",  farine: "42 g",  oeufs: "⅔",  rhum: "4 ml"  },
      { nb:  8, lait: "333 ml", beurre: "17 g", sucre: "167 g", farine: "83 g",  oeufs: "1⅓", rhum: "8 ml"  },
      { nb: 12, lait: "500 ml", beurre: "25 g", sucre: "250 g", farine: "125 g", oeufs: "2",  rhum: "12 ml" },
      { nb: 16, lait: "667 ml", beurre: "33 g", sucre: "333 g", farine: "167 g", oeufs: "2⅔", rhum: "16 ml" },
      { nb: 20, lait: "833 ml", beurre: "42 g", sucre: "417 g", farine: "208 g", oeufs: "3⅓", rhum: "20 ml" },
      { nb: 24, lait: "1 L",    beurre: "50 g", sucre: "500 g", farine: "250 g", oeufs: "4",  rhum: "24 ml" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🥛", titre: "Préparer l'appareil",    detail: "Chauffer lait + beurre + vanille jusqu'à ébullition. Dans un bol, mélanger sucre + farine. Verser le lait chaud progressivement en fouettant. Ajouter œufs et rhum. Passer au chinois.", badge: null },
      { icone: "❄️", titre: "Repos indispensable",     detail: "Filmer et réfrigérer la pâte. Ce repos développe les arômes et donne la texture caractéristique.", badge: "⏱ 24h au frigo" },
      { icone: "🫙", titre: "Préparer les moules",     detail: "Préchauffer le four à 250°C. Badigeonner les moules en cuivre (ou silicone) de beurre d'abeille ou beurre + cire d'abeille pour une croûte parfaite.", badge: null },
      { icone: "🔥", titre: "Cuisson en deux temps",   detail: "Remplir les moules aux ¾. Cuire 15 min à 250°C pour la croûte, puis baisser à 180°C pour le reste. Les cannelés doivent être très sombres (presque noirs) à l'extérieur.", badge: "⏱ 15 min à 250°C + 45 min à 180°C" },
      { icone: "⏳", titre: "Démouler tiède",          detail: "Démouler après 5 min. Déguster tiède pour le contraste croustillant/moelleux maximal. Se conservent 24h.", badge: null },
    ]
  },

  mojitorose: {
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🌹",
    description: "Le Mojito Rosé — rhum blanc, fraises fraîches, menthe, citron vert et eau gazeuse. Une version fruitée et colorée du classique.",
    tableauMojitoRose: [
      { nb:  1, rhum: "5 cl",  fraises: "4",  menthe: "6 feuilles",  citron: "½",  sucre: "2 c.à.c", eauGaz: "10 cl" },
      { nb:  2, rhum: "10 cl", fraises: "8",  menthe: "12 feuilles", citron: "1",  sucre: "4 c.à.c", eauGaz: "20 cl" },
      { nb:  3, rhum: "15 cl", fraises: "12", menthe: "18 feuilles", citron: "1½", sucre: "6 c.à.c", eauGaz: "30 cl" },
      { nb:  4, rhum: "20 cl", fraises: "16", menthe: "24 feuilles", citron: "2",  sucre: "8 c.à.c", eauGaz: "40 cl" },
      { nb:  5, rhum: "25 cl", fraises: "20", menthe: "30 feuilles", citron: "2½", sucre: "10 c.à.c",eauGaz: "50 cl" },
      { nb:  6, rhum: "30 cl", fraises: "24", menthe: "36 feuilles", citron: "3",  sucre: "12 c.à.c",eauGaz: "60 cl" },
      { nb:  7, rhum: "35 cl", fraises: "28", menthe: "42 feuilles", citron: "3½", sucre: "14 c.à.c",eauGaz: "70 cl" },
      { nb:  8, rhum: "40 cl", fraises: "32", menthe: "48 feuilles", citron: "4",  sucre: "16 c.à.c",eauGaz: "80 cl" },
      { nb:  9, rhum: "45 cl", fraises: "36", menthe: "54 feuilles", citron: "4½", sucre: "18 c.à.c",eauGaz: "90 cl" },
      { nb: 10, rhum: "50 cl", fraises: "40", menthe: "60 feuilles", citron: "5",  sucre: "20 c.à.c",eauGaz: "1 L"   },
      { nb: 11, rhum: "55 cl", fraises: "44", menthe: "66 feuilles", citron: "5½", sucre: "22 c.à.c",eauGaz: "1.1 L" },
      { nb: 12, rhum: "60 cl", fraises: "48", menthe: "72 feuilles", citron: "6",  sucre: "24 c.à.c",eauGaz: "1.2 L" },
      { nb: 13, rhum: "65 cl", fraises: "52", menthe: "78 feuilles", citron: "6½", sucre: "26 c.à.c",eauGaz: "1.3 L" },
      { nb: 14, rhum: "70 cl", fraises: "56", menthe: "84 feuilles", citron: "7",  sucre: "28 c.à.c",eauGaz: "1.4 L" },
      { nb: 15, rhum: "75 cl", fraises: "60", menthe: "90 feuilles", citron: "7½", sucre: "30 c.à.c",eauGaz: "1.5 L" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍓", titre: "Écraser les fraises",      detail: "Couper les fraises en deux et les placer dans le verre avec le sucre. Écraser doucement pour libérer le jus.", badge: null },
      { icone: "🌿", titre: "Ajouter menthe et citron", detail: "Ajouter les feuilles de menthe et le jus de citron vert. Piler légèrement.", badge: null },
      { icone: "🧊", titre: "Glace et rhum",            detail: "Remplir de glace pilée. Verser le rhum blanc.", badge: null },
      { icone: "💧", titre: "Compléter",                detail: "Compléter avec l'eau gazeuse. Mélanger délicatement. Décorer d'une fraise et de menthe fraîche.", badge: null },
    ]
  },

  negroni: {
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🍊",
    description: "Le Negroni — gin, Campari et vermouth rouge en proportions égales. L'apéritif italien au goût amer et complexe.",
    tableauNegroni: [
      { nb:  1, gin: "3 cl",  campari: "3 cl",  vermouth: "3 cl",  orange: "1 zeste" },
      { nb:  2, gin: "6 cl",  campari: "6 cl",  vermouth: "6 cl",  orange: "2 zestes"},
      { nb:  3, gin: "9 cl",  campari: "9 cl",  vermouth: "9 cl",  orange: "3 zestes"},
      { nb:  4, gin: "12 cl", campari: "12 cl", vermouth: "12 cl", orange: "4 zestes"},
      { nb:  5, gin: "15 cl", campari: "15 cl", vermouth: "15 cl", orange: "5 zestes"},
      { nb:  6, gin: "18 cl", campari: "18 cl", vermouth: "18 cl", orange: "6 zestes"},
      { nb:  7, gin: "21 cl", campari: "21 cl", vermouth: "21 cl", orange: "7 zestes"},
      { nb:  8, gin: "24 cl", campari: "24 cl", vermouth: "24 cl", orange: "8 zestes"},
      { nb:  9, gin: "27 cl", campari: "27 cl", vermouth: "27 cl", orange: "9 zestes"},
      { nb: 10, gin: "30 cl", campari: "30 cl", vermouth: "30 cl", orange: "10 zestes"},
      { nb: 11, gin: "33 cl", campari: "33 cl", vermouth: "33 cl", orange: "11 zestes"},
      { nb: 12, gin: "36 cl", campari: "36 cl", vermouth: "36 cl", orange: "12 zestes"},
      { nb: 13, gin: "39 cl", campari: "39 cl", vermouth: "39 cl", orange: "13 zestes"},
      { nb: 14, gin: "42 cl", campari: "42 cl", vermouth: "42 cl", orange: "14 zestes"},
      { nb: 15, gin: "45 cl", campari: "45 cl", vermouth: "45 cl", orange: "15 zestes"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Verre plein de glace",     detail: "Remplir un verre old-fashioned ou à vin de glaçons.", badge: null },
      { icone: "🍶", titre: "Verser les 3 spiritueux",  detail: "Verser gin, Campari et vermouth rouge en proportions égales. Mélanger doucement avec une cuillère longue pendant 30 secondes.", badge: "⏱ 30 sec mélange" },
      { icone: "🍊", titre: "Zeste d'orange",          detail: "Presser un zeste d'orange au-dessus du verre pour libérer les huiles essentielles. Frotter le rebord avec le zeste et déposer dans le verre.", badge: null },
    ]
  },

  moscowmule: {
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🫙",
    description: "Le Moscow Mule — vodka, ginger beer et citron vert. Servi dans sa célèbre tasse en cuivre, pétillant et rafraîchissant.",
    tableauMoscowMule: [
      { nb:  1, vodka: "5 cl",  gingerBeer: "12 cl", citron: "½",  menthe: "3 feuilles" },
      { nb:  2, vodka: "10 cl", gingerBeer: "24 cl", citron: "1",  menthe: "6 feuilles" },
      { nb:  3, vodka: "15 cl", gingerBeer: "36 cl", citron: "1½", menthe: "9 feuilles" },
      { nb:  4, vodka: "20 cl", gingerBeer: "48 cl", citron: "2",  menthe: "12 feuilles"},
      { nb:  5, vodka: "25 cl", gingerBeer: "60 cl", citron: "2½", menthe: "15 feuilles"},
      { nb:  6, vodka: "30 cl", gingerBeer: "72 cl", citron: "3",  menthe: "18 feuilles"},
      { nb:  7, vodka: "35 cl", gingerBeer: "84 cl", citron: "3½", menthe: "21 feuilles"},
      { nb:  8, vodka: "40 cl", gingerBeer: "96 cl", citron: "4",  menthe: "24 feuilles"},
      { nb:  9, vodka: "45 cl", gingerBeer: "108 cl",citron: "4½", menthe: "27 feuilles"},
      { nb: 10, vodka: "50 cl", gingerBeer: "120 cl",citron: "5",  menthe: "30 feuilles"},
      { nb: 11, vodka: "55 cl", gingerBeer: "132 cl",citron: "5½", menthe: "33 feuilles"},
      { nb: 12, vodka: "60 cl", gingerBeer: "144 cl",citron: "6",  menthe: "36 feuilles"},
      { nb: 13, vodka: "65 cl", gingerBeer: "156 cl",citron: "6½", menthe: "39 feuilles"},
      { nb: 14, vodka: "70 cl", gingerBeer: "168 cl",citron: "7",  menthe: "42 feuilles"},
      { nb: 15, vodka: "75 cl", gingerBeer: "180 cl",citron: "7½", menthe: "45 feuilles"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Tasse en cuivre et glace", detail: "Remplir une tasse en cuivre (ou grand verre) de glace pilée.", badge: null },
      { icone: "🍶", titre: "Vodka et citron",          detail: "Verser la vodka. Presser le jus du citron vert par-dessus.", badge: null },
      { icone: "💧", titre: "Ginger beer",              detail: "Compléter avec la ginger beer bien froide. Mélanger délicatement.", badge: null },
      { icone: "🌿", titre: "Garnir",                   detail: "Garnir de feuilles de menthe fraîche et d'une rondelle de citron vert.", badge: null },
    ]
  },

  pornstarmartini: {
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🍍",
    description: "Le Porn Star Martini — vodka à la vanille, Passoa, jus de passion et prosecco à part. Le cocktail le plus populaire d'Angleterre !",
    tableauPornstar: [
      { nb:  1, vodka: "4 cl",  passoa: "2 cl",  passion: "4 cl",  prosecco: "5 cl",  vanille: "½ c.à.c" },
      { nb:  2, vodka: "8 cl",  passoa: "4 cl",  passion: "8 cl",  prosecco: "10 cl", vanille: "1 c.à.c"  },
      { nb:  3, vodka: "12 cl", passoa: "6 cl",  passion: "12 cl", prosecco: "15 cl", vanille: "1½ c.à.c" },
      { nb:  4, vodka: "16 cl", passoa: "8 cl",  passion: "16 cl", prosecco: "20 cl", vanille: "2 c.à.c"  },
      { nb:  5, vodka: "20 cl", passoa: "10 cl", passion: "20 cl", prosecco: "25 cl", vanille: "2½ c.à.c" },
      { nb:  6, vodka: "24 cl", passoa: "12 cl", passion: "24 cl", prosecco: "30 cl", vanille: "3 c.à.c"  },
      { nb:  7, vodka: "28 cl", passoa: "14 cl", passion: "28 cl", prosecco: "35 cl", vanille: "3½ c.à.c" },
      { nb:  8, vodka: "32 cl", passoa: "16 cl", passion: "32 cl", prosecco: "40 cl", vanille: "4 c.à.c"  },
      { nb:  9, vodka: "36 cl", passoa: "18 cl", passion: "36 cl", prosecco: "45 cl", vanille: "4½ c.à.c" },
      { nb: 10, vodka: "40 cl", passoa: "20 cl", passion: "40 cl", prosecco: "50 cl", vanille: "5 c.à.c"  },
      { nb: 11, vodka: "44 cl", passoa: "22 cl", passion: "44 cl", prosecco: "55 cl", vanille: "5½ c.à.c" },
      { nb: 12, vodka: "48 cl", passoa: "24 cl", passion: "48 cl", prosecco: "60 cl", vanille: "6 c.à.c"  },
      { nb: 13, vodka: "52 cl", passoa: "26 cl", passion: "52 cl", prosecco: "65 cl", vanille: "6½ c.à.c" },
      { nb: 14, vodka: "56 cl", passoa: "28 cl", passion: "56 cl", prosecco: "70 cl", vanille: "7 c.à.c"  },
      { nb: 15, vodka: "60 cl", passoa: "30 cl", passion: "60 cl", prosecco: "75 cl", vanille: "7½ c.à.c" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🍹", titre: "Shaker avec glace",        detail: "Mettre de la glace dans le shaker. Ajouter vodka vanille, Passoa, jus de fruit de la passion et sirop de vanille.", badge: null },
      { icone: "🥶", titre: "Shaker",                   detail: "Shaker vigoureusement 15 secondes.", badge: "⏱ 15 sec" },
      { icone: "🍸", titre: "Filtrer",                  detail: "Filtrer dans un verre à martini. Déposer une demi-passion flottante sur le dessus.", badge: null },
      { icone: "🥂", titre: "Prosecco à part",          detail: "Servir le prosecco dans un shot verre à côté — on l'ajoute au cocktail ou on le boit en une gorgée entre deux sips !", badge: null },
    ]
  },

  hugospritz: {
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🌸",
    description: "Le Hugo Spritz — prosecco, sirop de sureau, menthe fraîche et eau gazeuse. Plus doux et floral que le Spritz classique.",
    tableauHugoSpritz: [
      { nb:  1, prosecco: "9 cl",  sureau: "2 cl",  eauGaz: "3 cl",  menthe: "4 feuilles", citron: "1 rondelle" },
      { nb:  2, prosecco: "18 cl", sureau: "4 cl",  eauGaz: "6 cl",  menthe: "8 feuilles", citron: "2 rondelles"},
      { nb:  3, prosecco: "27 cl", sureau: "6 cl",  eauGaz: "9 cl",  menthe: "12 feuilles",citron: "3 rondelles"},
      { nb:  4, prosecco: "36 cl", sureau: "8 cl",  eauGaz: "12 cl", menthe: "16 feuilles",citron: "4 rondelles"},
      { nb:  5, prosecco: "45 cl", sureau: "10 cl", eauGaz: "15 cl", menthe: "20 feuilles",citron: "5 rondelles"},
      { nb:  6, prosecco: "54 cl", sureau: "12 cl", eauGaz: "18 cl", menthe: "24 feuilles",citron: "6 rondelles"},
      { nb:  7, prosecco: "63 cl", sureau: "14 cl", eauGaz: "21 cl", menthe: "28 feuilles",citron: "7 rondelles"},
      { nb:  8, prosecco: "72 cl", sureau: "16 cl", eauGaz: "24 cl", menthe: "32 feuilles",citron: "8 rondelles"},
      { nb:  9, prosecco: "81 cl", sureau: "18 cl", eauGaz: "27 cl", menthe: "36 feuilles",citron: "9 rondelles"},
      { nb: 10, prosecco: "90 cl", sureau: "20 cl", eauGaz: "30 cl", menthe: "40 feuilles",citron: "10 rondelles"},
      { nb: 11, prosecco: "99 cl", sureau: "22 cl", eauGaz: "33 cl", menthe: "44 feuilles",citron: "11 rondelles"},
      { nb: 12, prosecco: "108 cl",sureau: "24 cl", eauGaz: "36 cl", menthe: "48 feuilles",citron: "12 rondelles"},
      { nb: 13, prosecco: "117 cl",sureau: "26 cl", eauGaz: "39 cl", menthe: "52 feuilles",citron: "13 rondelles"},
      { nb: 14, prosecco: "126 cl",sureau: "28 cl", eauGaz: "42 cl", menthe: "56 feuilles",citron: "14 rondelles"},
      { nb: 15, prosecco: "135 cl",sureau: "30 cl", eauGaz: "45 cl", menthe: "60 feuilles",citron: "15 rondelles"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Verre et glace",           detail: "Remplir un grand verre à vin de glaçons.", badge: null },
      { icone: "🌸", titre: "Sirop de sureau",          detail: "Verser le sirop de fleur de sureau (St. Germain ou autre).", badge: null },
      { icone: "🍾", titre: "Prosecco et eau gazeuse",  detail: "Verser le prosecco puis l'eau gazeuse. Mélanger très délicatement.", badge: null },
      { icone: "🌿", titre: "Garnir",                   detail: "Ajouter menthe fraîche et rondelle de citron vert. Servir immédiatement.", badge: null },
    ]
  },

  cherryblossommocktail: {
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🌸",
    description: "Le Cherry Blossom Mocktail — jus de cerise, eau de rose, citron et eau gazeuse. Un mocktail floral et élégant, sans alcool.",
    tableauCherryBlossom: [
      { nb:  1, cerise: "8 cl",  eauRose: "1 cl",  citron: "1 cl",  sirop: "1 cl",  eauGaz: "8 cl"  },
      { nb:  2, cerise: "16 cl", eauRose: "2 cl",  citron: "2 cl",  sirop: "2 cl",  eauGaz: "16 cl" },
      { nb:  3, cerise: "24 cl", eauRose: "3 cl",  citron: "3 cl",  sirop: "3 cl",  eauGaz: "24 cl" },
      { nb:  4, cerise: "32 cl", eauRose: "4 cl",  citron: "4 cl",  sirop: "4 cl",  eauGaz: "32 cl" },
      { nb:  5, cerise: "40 cl", eauRose: "5 cl",  citron: "5 cl",  sirop: "5 cl",  eauGaz: "40 cl" },
      { nb:  6, cerise: "48 cl", eauRose: "6 cl",  citron: "6 cl",  sirop: "6 cl",  eauGaz: "48 cl" },
      { nb:  7, cerise: "56 cl", eauRose: "7 cl",  citron: "7 cl",  sirop: "7 cl",  eauGaz: "56 cl" },
      { nb:  8, cerise: "64 cl", eauRose: "8 cl",  citron: "8 cl",  sirop: "8 cl",  eauGaz: "64 cl" },
      { nb:  9, cerise: "72 cl", eauRose: "9 cl",  citron: "9 cl",  sirop: "9 cl",  eauGaz: "72 cl" },
      { nb: 10, cerise: "80 cl", eauRose: "10 cl", citron: "10 cl", sirop: "10 cl", eauGaz: "80 cl" },
      { nb: 11, cerise: "88 cl", eauRose: "11 cl", citron: "11 cl", sirop: "11 cl", eauGaz: "88 cl" },
      { nb: 12, cerise: "96 cl", eauRose: "12 cl", citron: "12 cl", sirop: "12 cl", eauGaz: "96 cl" },
      { nb: 13, cerise: "104 cl",eauRose: "13 cl", citron: "13 cl", sirop: "13 cl", eauGaz: "104 cl"},
      { nb: 14, cerise: "112 cl",eauRose: "14 cl", citron: "14 cl", sirop: "14 cl", eauGaz: "112 cl"},
      { nb: 15, cerise: "120 cl",eauRose: "15 cl", citron: "15 cl", sirop: "15 cl", eauGaz: "120 cl"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🍒", titre: "Mélanger",                 detail: "Dans un shaker avec glace, mélanger jus de cerise, eau de rose, jus de citron et sirop de sucre.", badge: null },
      { icone: "🥶", titre: "Shaker",                   detail: "Shaker 10 secondes.", badge: "⏱ 10 sec" },
      { icone: "🌸", titre: "Filtrer et servir",        detail: "Filtrer dans un verre à champagne ou coupe. Compléter avec l'eau gazeuse. Décorer d'une fleur comestible ou cerise.", badge: null },
    ]
  },

  oldFashioned: {
    base: 1,
    temps: "3 min",
    niveau: "⭐ Facile",
    emoji: "🥃",
    description: "L'Old Fashioned — bourbon ou rye, sucre, Angostura bitters et zeste d'orange. Le cocktail classique par excellence depuis 1806.",
    tableauOldFashioned: [
      { nb:  1, bourbon: "6 cl",  sucre: "1 morceau", bitters: "2 traits", orange: "1 zeste" },
      { nb:  2, bourbon: "12 cl", sucre: "2 morceaux",bitters: "4 traits", orange: "2 zestes"},
      { nb:  3, bourbon: "18 cl", sucre: "3 morceaux",bitters: "6 traits", orange: "3 zestes"},
      { nb:  4, bourbon: "24 cl", sucre: "4 morceaux",bitters: "8 traits", orange: "4 zestes"},
      { nb:  5, bourbon: "30 cl", sucre: "5 morceaux",bitters: "10 traits",orange: "5 zestes"},
      { nb:  6, bourbon: "36 cl", sucre: "6 morceaux",bitters: "12 traits",orange: "6 zestes"},
      { nb:  7, bourbon: "42 cl", sucre: "7 morceaux",bitters: "14 traits",orange: "7 zestes"},
      { nb:  8, bourbon: "48 cl", sucre: "8 morceaux",bitters: "16 traits",orange: "8 zestes"},
      { nb:  9, bourbon: "54 cl", sucre: "9 morceaux",bitters: "18 traits",orange: "9 zestes"},
      { nb: 10, bourbon: "60 cl", sucre: "10 morceaux",bitters: "20 traits",orange: "10 zestes"},
      { nb: 11, bourbon: "66 cl", sucre: "11 morceaux",bitters: "22 traits",orange: "11 zestes"},
      { nb: 12, bourbon: "72 cl", sucre: "12 morceaux",bitters: "24 traits",orange: "12 zestes"},
      { nb: 13, bourbon: "78 cl", sucre: "13 morceaux",bitters: "26 traits",orange: "13 zestes"},
      { nb: 14, bourbon: "84 cl", sucre: "14 morceaux",bitters: "28 traits",orange: "14 zestes"},
      { nb: 15, bourbon: "90 cl", sucre: "15 morceaux",bitters: "30 traits",orange: "15 zestes"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🍬", titre: "Dissoudre le sucre",       detail: "Placer le morceau de sucre dans le verre. Ajouter les Angostura bitters et une cuillère à café d'eau. Écraser et dissoudre complètement.", badge: null },
      { icone: "🧊", titre: "Grande glace",             detail: "Ajouter un gros glaçon ou plusieurs glaçons. Le format gros glaçon est important — il fond moins vite.", badge: null },
      { icone: "🥃", titre: "Verser le bourbon",        detail: "Verser le bourbon. Mélanger lentement avec une cuillère longue pendant 30 secondes.", badge: "⏱ 30 sec mélange" },
      { icone: "🍊", titre: "Zeste d'orange",          detail: "Exprimer le zeste d'orange au-dessus du verre pour libérer les huiles. Frotter le bord et déposer ou suspendre sur le verre.", badge: null },
    ]
  },

  gintoniqmaison: {
    base: 1,
    temps: "2 min",
    niveau: "⭐ Facile",
    emoji: "🫧",
    description: "Le Gin Tonic maison — gin de qualité, tonic premium et garnitures soignées. Simple mais tellement bon quand c'est bien fait.",
    tableauGinTonic: [
      { nb:  1, gin: "5 cl",  tonic: "15 cl", citron: "1 rondelle", poivre: "3 grains" },
      { nb:  2, gin: "10 cl", tonic: "30 cl", citron: "2 rondelles",poivre: "6 grains" },
      { nb:  3, gin: "15 cl", tonic: "45 cl", citron: "3 rondelles",poivre: "9 grains" },
      { nb:  4, gin: "20 cl", tonic: "60 cl", citron: "4 rondelles",poivre: "12 grains"},
      { nb:  5, gin: "25 cl", tonic: "75 cl", citron: "5 rondelles",poivre: "15 grains"},
      { nb:  6, gin: "30 cl", tonic: "90 cl", citron: "6 rondelles",poivre: "18 grains"},
      { nb:  7, gin: "35 cl", tonic: "105 cl",citron: "7 rondelles",poivre: "21 grains"},
      { nb:  8, gin: "40 cl", tonic: "120 cl",citron: "8 rondelles",poivre: "24 grains"},
      { nb:  9, gin: "45 cl", tonic: "135 cl",citron: "9 rondelles",poivre: "27 grains"},
      { nb: 10, gin: "50 cl", tonic: "150 cl",citron: "10 rondelles",poivre: "30 grains"},
      { nb: 11, gin: "55 cl", tonic: "165 cl",citron: "11 rondelles",poivre: "33 grains"},
      { nb: 12, gin: "60 cl", tonic: "180 cl",citron: "12 rondelles",poivre: "36 grains"},
      { nb: 13, gin: "65 cl", tonic: "195 cl",citron: "13 rondelles",poivre: "39 grains"},
      { nb: 14, gin: "70 cl", tonic: "210 cl",citron: "14 rondelles",poivre: "42 grains"},
      { nb: 15, gin: "75 cl", tonic: "225 cl",citron: "15 rondelles",poivre: "45 grains"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🫙", titre: "Verre ballon et glace",    detail: "Utiliser un grand verre ballon (Copa glass). Remplir de glaçons jusqu'en haut.", badge: null },
      { icone: "🌿", titre: "Aromates d'abord",        detail: "Déposer les garnitures choisies sur la glace : rondelle de citron vert, grains de poivre rose, romarin, concombre... selon le style de gin.", badge: null },
      { icone: "🍶", titre: "Verser le gin",            detail: "Verser le gin sur la glace.", badge: null },
      { icone: "💧", titre: "Tonic premium",            detail: "Verser le tonic froid en filet contre le bord du verre pour préserver les bulles. Ne jamais remuer !", badge: null },
    ]
  },

  shrubframboisebasilic: {
    base: 4,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🫐",
    description: "Shrub Framboise Basilic — sirop vinaigré aux framboises et basilic, allongé d'eau gazeuse. Un mocktail sophistiqué et acidulé.",
    tableauShrub: [
      { nb:  1, framboises: "50 g",  basilic: "3 feuilles", vinaigre: "2 cl",  sucre: "2 c.à.s", eauGaz: "15 cl" },
      { nb:  2, framboises: "100 g", basilic: "6 feuilles", vinaigre: "4 cl",  sucre: "4 c.à.s", eauGaz: "30 cl" },
      { nb:  3, framboises: "150 g", basilic: "9 feuilles", vinaigre: "6 cl",  sucre: "6 c.à.s", eauGaz: "45 cl" },
      { nb:  4, framboises: "200 g", basilic: "12 feuilles",vinaigre: "8 cl",  sucre: "8 c.à.s", eauGaz: "60 cl" },
      { nb:  5, framboises: "250 g", basilic: "15 feuilles",vinaigre: "10 cl", sucre: "10 c.à.s",eauGaz: "75 cl" },
      { nb:  6, framboises: "300 g", basilic: "18 feuilles",vinaigre: "12 cl", sucre: "12 c.à.s",eauGaz: "90 cl" },
      { nb:  7, framboises: "350 g", basilic: "21 feuilles",vinaigre: "14 cl", sucre: "14 c.à.s",eauGaz: "105 cl"},
      { nb:  8, framboises: "400 g", basilic: "24 feuilles",vinaigre: "16 cl", sucre: "16 c.à.s",eauGaz: "120 cl"},
      { nb:  9, framboises: "450 g", basilic: "27 feuilles",vinaigre: "18 cl", sucre: "18 c.à.s",eauGaz: "135 cl"},
      { nb: 10, framboises: "500 g", basilic: "30 feuilles",vinaigre: "20 cl", sucre: "20 c.à.s",eauGaz: "150 cl"},
      { nb: 11, framboises: "550 g", basilic: "33 feuilles",vinaigre: "22 cl", sucre: "22 c.à.s",eauGaz: "165 cl"},
      { nb: 12, framboises: "600 g", basilic: "36 feuilles",vinaigre: "24 cl", sucre: "24 c.à.s",eauGaz: "180 cl"},
      { nb: 13, framboises: "650 g", basilic: "39 feuilles",vinaigre: "26 cl", sucre: "26 c.à.s",eauGaz: "195 cl"},
      { nb: 14, framboises: "700 g", basilic: "42 feuilles",vinaigre: "28 cl", sucre: "28 c.à.s",eauGaz: "210 cl"},
      { nb: 15, framboises: "750 g", basilic: "45 feuilles",vinaigre: "30 cl", sucre: "30 c.à.s",eauGaz: "225 cl"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🫐", titre: "Préparer le shrub",        detail: "Écraser les framboises avec le sucre et le vinaigre de cidre dans un bol. Ajouter le basilic froissé. Laisser macérer au frigo.", badge: "⏱ 2h macération" },
      { icone: "🌀", titre: "Filtrer",                  detail: "Filtrer le sirop obtenu en pressant bien les framboises. Conserver en bocal au frigo (se garde 2 semaines).", badge: null },
      { icone: "🥤", titre: "Assembler",                detail: "Dans un verre avec glace, verser le shrub. Compléter avec eau gazeuse. Décorer d'une framboise et feuille de basilic.", badge: null },
    ]
  },

  mocktailcoconananas: {
    base: 2,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🥥",
    description: "Mocktail Coco Ananas — lait de coco, jus d'ananas, citron vert et gingembre. Tropical, frais et sans alcool pour toute la famille.",
    tableauCocoAnanas: [
      { nb:  1, coco: "8 cl",   ananas: "10 cl", citron: "1 cl",  gingembre: "½ cm", miel: "1 c.à.c" },
      { nb:  2, coco: "16 cl",  ananas: "20 cl", citron: "2 cl",  gingembre: "1 cm",  miel: "2 c.à.c" },
      { nb:  3, coco: "24 cl",  ananas: "30 cl", citron: "3 cl",  gingembre: "1 cm",  miel: "3 c.à.c" },
      { nb:  4, coco: "32 cl",  ananas: "40 cl", citron: "4 cl",  gingembre: "2 cm",  miel: "4 c.à.c" },
      { nb:  5, coco: "40 cl",  ananas: "50 cl", citron: "5 cl",  gingembre: "2 cm",  miel: "5 c.à.c" },
      { nb:  6, coco: "48 cl",  ananas: "60 cl", citron: "6 cl",  gingembre: "2 cm",  miel: "6 c.à.c" },
      { nb:  7, coco: "56 cl",  ananas: "70 cl", citron: "7 cl",  gingembre: "3 cm",  miel: "7 c.à.c" },
      { nb:  8, coco: "64 cl",  ananas: "80 cl", citron: "8 cl",  gingembre: "3 cm",  miel: "8 c.à.c" },
      { nb:  9, coco: "72 cl",  ananas: "90 cl", citron: "9 cl",  gingembre: "3 cm",  miel: "9 c.à.c" },
      { nb: 10, coco: "80 cl",  ananas: "100 cl",citron: "10 cl", gingembre: "4 cm",  miel: "10 c.à.c"},
      { nb: 11, coco: "88 cl",  ananas: "110 cl",citron: "11 cl", gingembre: "4 cm",  miel: "11 c.à.c"},
      { nb: 12, coco: "96 cl",  ananas: "120 cl",citron: "12 cl", gingembre: "4 cm",  miel: "12 c.à.c"},
      { nb: 13, coco: "104 cl", ananas: "130 cl",citron: "13 cl", gingembre: "5 cm",  miel: "13 c.à.c"},
      { nb: 14, coco: "112 cl", ananas: "140 cl",citron: "14 cl", gingembre: "5 cm",  miel: "14 c.à.c"},
      { nb: 15, coco: "120 cl", ananas: "150 cl",citron: "15 cl", gingembre: "5 cm",  miel: "15 c.à.c"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🌀", titre: "Mixer",                    detail: "Mixer lait de coco, jus d'ananas, jus de citron vert, gingembre râpé et miel avec quelques glaçons jusqu'à texture lisse.", badge: "⏱ 30 sec" },
      { icone: "🥥", titre: "Servir",                   detail: "Verser dans des grands verres avec glaçons. Décorer d'une tranche d'ananas, noix de coco râpée et paille. Servir immédiatement !", badge: null },
    ]
  },

  pizzareine: {
    base: 2,
    temps: "20 min + 48h pâte",
    niveau: "⭐ Facile",
    emoji: "🍕",
    description: "La Pizza Reine — jambon, champignons, mozzarella et sauce tomate. La classique des pizzerias françaises, simple et gourmande.",
    tableauPizzaReine: [
      { nb:  1, pate: "1 pâton",  tomates: "80 g",  mozza: "80 g",  jambon: "50 g",  champignons: "60 g"  },
      { nb:  2, pate: "2 pâtons", tomates: "160 g", mozza: "160 g", jambon: "100 g", champignons: "120 g" },
      { nb:  3, pate: "3 pâtons", tomates: "240 g", mozza: "240 g", jambon: "150 g", champignons: "180 g" },
      { nb:  4, pate: "4 pâtons", tomates: "320 g", mozza: "320 g", jambon: "200 g", champignons: "240 g" },
      { nb:  5, pate: "5 pâtons", tomates: "400 g", mozza: "400 g", jambon: "250 g", champignons: "300 g" },
      { nb:  6, pate: "6 pâtons", tomates: "480 g", mozza: "480 g", jambon: "300 g", champignons: "360 g" },
      { nb:  7, pate: "7 pâtons", tomates: "560 g", mozza: "560 g", jambon: "350 g", champignons: "420 g" },
      { nb:  8, pate: "8 pâtons", tomates: "640 g", mozza: "640 g", jambon: "400 g", champignons: "480 g" },
      { nb:  9, pate: "9 pâtons", tomates: "720 g", mozza: "720 g", jambon: "450 g", champignons: "540 g" },
      { nb: 10, pate: "10 pâtons",tomates: "800 g", mozza: "800 g", jambon: "500 g", champignons: "600 g" },
      { nb: 11, pate: "11 pâtons",tomates: "880 g", mozza: "880 g", jambon: "550 g", champignons: "660 g" },
      { nb: 12, pate: "12 pâtons",tomates: "960 g", mozza: "960 g", jambon: "600 g", champignons: "720 g" },
      { nb: 13, pate: "13 pâtons",tomates: "1040 g",mozza: "1040 g",jambon: "650 g", champignons: "780 g" },
      { nb: 14, pate: "14 pâtons",tomates: "1120 g",mozza: "1120 g",jambon: "700 g", champignons: "840 g" },
      { nb: 15, pate: "15 pâtons",tomates: "1200 g",mozza: "1200 g",jambon: "750 g", champignons: "900 g" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🫓", titre: "Préparer la pâte",         detail: "Utiliser la recette de pâte à pizza de l'appli. Sortir les pâtons 1h avant. Étaler à la main.", badge: null },
      { icone: "🍅", titre: "Sauce tomate",             detail: "Étaler la sauce tomate assaisonnée en spirale sur la pâte.", badge: null },
      { icone: "🧀", titre: "Mozzarella",               detail: "Répartir la mozzarella déchirée ou râpée.", badge: null },
      { icone: "🍖", titre: "Garnitures",               detail: "Disposer le jambon en morceaux et les champignons émincés (crus ou poêlés).", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Four préchauffé au maximum sur pierre ou plaque. Cuire jusqu'à bords dorés et fromage bouillonnant.", badge: "⏱ 7-10 min à 280°C" },
    ]
  },

  pizzaquattroformaggi: {
    base: 2,
    temps: "20 min + 48h pâte",
    niveau: "⭐ Facile",
    emoji: "🧀",
    description: "La Pizza Quattro Formaggi — quatre fromages italiens fondus sur une base crème. Pour les amoureux du fromage !",
    tableauPizzaFormaggi: [
      { nb:  1, pate: "1 pâton",  mozza: "50 g",  gorgonzola: "30 g", parmesan: "20 g", ricotta: "40 g",  creme: "30 ml" },
      { nb:  2, pate: "2 pâtons", mozza: "100 g", gorgonzola: "60 g", parmesan: "40 g", ricotta: "80 g",  creme: "60 ml" },
      { nb:  3, pate: "3 pâtons", mozza: "150 g", gorgonzola: "90 g", parmesan: "60 g", ricotta: "120 g", creme: "90 ml" },
      { nb:  4, pate: "4 pâtons", mozza: "200 g", gorgonzola: "120 g",parmesan: "80 g", ricotta: "160 g", creme: "120 ml"},
      { nb:  5, pate: "5 pâtons", mozza: "250 g", gorgonzola: "150 g",parmesan: "100 g",ricotta: "200 g", creme: "150 ml"},
      { nb:  6, pate: "6 pâtons", mozza: "300 g", gorgonzola: "180 g",parmesan: "120 g",ricotta: "240 g", creme: "180 ml"},
      { nb:  7, pate: "7 pâtons", mozza: "350 g", gorgonzola: "210 g",parmesan: "140 g",ricotta: "280 g", creme: "210 ml"},
      { nb:  8, pate: "8 pâtons", mozza: "400 g", gorgonzola: "240 g",parmesan: "160 g",ricotta: "320 g", creme: "240 ml"},
      { nb:  9, pate: "9 pâtons", mozza: "450 g", gorgonzola: "270 g",parmesan: "180 g",ricotta: "360 g", creme: "270 ml"},
      { nb: 10, pate: "10 pâtons",mozza: "500 g", gorgonzola: "300 g",parmesan: "200 g",ricotta: "400 g", creme: "300 ml"},
      { nb: 11, pate: "11 pâtons",mozza: "550 g", gorgonzola: "330 g",parmesan: "220 g",ricotta: "440 g", creme: "330 ml"},
      { nb: 12, pate: "12 pâtons",mozza: "600 g", gorgonzola: "360 g",parmesan: "240 g",ricotta: "480 g", creme: "360 ml"},
      { nb: 13, pate: "13 pâtons",mozza: "650 g", gorgonzola: "390 g",parmesan: "260 g",ricotta: "520 g", creme: "390 ml"},
      { nb: 14, pate: "14 pâtons",mozza: "700 g", gorgonzola: "420 g",parmesan: "280 g",ricotta: "560 g", creme: "420 ml"},
      { nb: 15, pate: "15 pâtons",mozza: "750 g", gorgonzola: "450 g",parmesan: "300 g",ricotta: "600 g", creme: "450 ml"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🫓", titre: "Pâte et base crème",       detail: "Étaler la pâte. Napper d'une fine couche de crème fraîche à la place de la tomate.", badge: null },
      { icone: "🧀", titre: "Quatre fromages",          detail: "Disposer par zones mozzarella, gorgonzola en morceaux, ricotta en petites cuillerées et parmesan râpé. Un généreux filet d'huile d'olive.", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Four à maximum. Cuire jusqu'à ce que les fromages soient fondus et dorés. Finir avec un filet de miel si souhaité.", badge: "⏱ 7-10 min à 280°C" },
    ]
  },

  pizzadiavola: {
    base: 2,
    temps: "20 min + 48h pâte",
    niveau: "⭐ Facile",
    emoji: "🌶️",
    description: "La Pizza Diavola — salami piquant, nduja, mozzarella et piment. Pour les amateurs de sensations fortes !",
    tableauPizzaDiavola: [
      { nb:  1, pate: "1 pâton",  tomates: "80 g",  mozza: "80 g",  salami: "50 g",  nduja: "20 g",  piment: "½" },
      { nb:  2, pate: "2 pâtons", tomates: "160 g", mozza: "160 g", salami: "100 g", nduja: "40 g",  piment: "1" },
      { nb:  3, pate: "3 pâtons", tomates: "240 g", mozza: "240 g", salami: "150 g", nduja: "60 g",  piment: "1" },
      { nb:  4, pate: "4 pâtons", tomates: "320 g", mozza: "320 g", salami: "200 g", nduja: "80 g",  piment: "2" },
      { nb:  5, pate: "5 pâtons", tomates: "400 g", mozza: "400 g", salami: "250 g", nduja: "100 g", piment: "2" },
      { nb:  6, pate: "6 pâtons", tomates: "480 g", mozza: "480 g", salami: "300 g", nduja: "120 g", piment: "3" },
      { nb:  7, pate: "7 pâtons", tomates: "560 g", mozza: "560 g", salami: "350 g", nduja: "140 g", piment: "3" },
      { nb:  8, pate: "8 pâtons", tomates: "640 g", mozza: "640 g", salami: "400 g", nduja: "160 g", piment: "4" },
      { nb:  9, pate: "9 pâtons", tomates: "720 g", mozza: "720 g", salami: "450 g", nduja: "180 g", piment: "4" },
      { nb: 10, pate: "10 pâtons",tomates: "800 g", mozza: "800 g", salami: "500 g", nduja: "200 g", piment: "5" },
      { nb: 11, pate: "11 pâtons",tomates: "880 g", mozza: "880 g", salami: "550 g", nduja: "220 g", piment: "5" },
      { nb: 12, pate: "12 pâtons",tomates: "960 g", mozza: "960 g", salami: "600 g", nduja: "240 g", piment: "6" },
      { nb: 13, pate: "13 pâtons",tomates: "1040 g",mozza: "1040 g",salami: "650 g", nduja: "260 g", piment: "6" },
      { nb: 14, pate: "14 pâtons",tomates: "1120 g",mozza: "1120 g",salami: "700 g", nduja: "280 g", piment: "7" },
      { nb: 15, pate: "15 pâtons",tomates: "1200 g",mozza: "1200 g",salami: "750 g", nduja: "300 g", piment: "7" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🫓", titre: "Pâte et sauce",            detail: "Étaler la pâte. Napper de sauce tomate assaisonnée à l'ail et à l'origan.", badge: null },
      { icone: "🧀", titre: "Mozzarella",               detail: "Répartir la mozzarella déchirée.", badge: null },
      { icone: "🌶️", titre: "Garnitures piquantes",    detail: "Disposer les tranches de salami épicé, des petites cuillerées de nduja (saucisse calabraise) et les rondelles de piment frais.", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Four à maximum. Finir avec un filet d'huile d'olive pimentée à la sortie du four.", badge: "⏱ 7-10 min à 280°C" },
    ]
  },

  pizzasaumonepinards: {
    base: 2,
    temps: "20 min + 48h pâte",
    niveau: "⭐ Facile",
    emoji: "🐟",
    description: "Pizza saumon, épinards et crème fraîche — base blanche onctueuse, saumon fumé et épinards. Une pizza raffinée.",
    tableauPizzaSaumon: [
      { nb:  1, pate: "1 pâton",  creme: "50 ml", saumon: "60 g",  epinards: "40 g",  mozza: "60 g",  citron: "¼" },
      { nb:  2, pate: "2 pâtons", creme: "100 ml",saumon: "120 g", epinards: "80 g",  mozza: "120 g", citron: "½" },
      { nb:  3, pate: "3 pâtons", creme: "150 ml",saumon: "180 g", epinards: "120 g", mozza: "180 g", citron: "¾" },
      { nb:  4, pate: "4 pâtons", creme: "200 ml",saumon: "240 g", epinards: "160 g", mozza: "240 g", citron: "1" },
      { nb:  5, pate: "5 pâtons", creme: "250 ml",saumon: "300 g", epinards: "200 g", mozza: "300 g", citron: "1" },
      { nb:  6, pate: "6 pâtons", creme: "300 ml",saumon: "360 g", epinards: "240 g", mozza: "360 g", citron: "1½"},
      { nb:  7, pate: "7 pâtons", creme: "350 ml",saumon: "420 g", epinards: "280 g", mozza: "420 g", citron: "1½"},
      { nb:  8, pate: "8 pâtons", creme: "400 ml",saumon: "480 g", epinards: "320 g", mozza: "480 g", citron: "2" },
      { nb:  9, pate: "9 pâtons", creme: "450 ml",saumon: "540 g", epinards: "360 g", mozza: "540 g", citron: "2" },
      { nb: 10, pate: "10 pâtons",creme: "500 ml",saumon: "600 g", epinards: "400 g", mozza: "600 g", citron: "2½"},
      { nb: 11, pate: "11 pâtons",creme: "550 ml",saumon: "660 g", epinards: "440 g", mozza: "660 g", citron: "2½"},
      { nb: 12, pate: "12 pâtons",creme: "600 ml",saumon: "720 g", epinards: "480 g", mozza: "720 g", citron: "3" },
      { nb: 13, pate: "13 pâtons",creme: "650 ml",saumon: "780 g", epinards: "520 g", mozza: "780 g", citron: "3" },
      { nb: 14, pate: "14 pâtons",creme: "700 ml",saumon: "840 g", epinards: "560 g", mozza: "840 g", citron: "3½"},
      { nb: 15, pate: "15 pâtons",creme: "750 ml",saumon: "900 g", epinards: "600 g", mozza: "900 g", citron: "3½"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🫓", titre: "Base crème",               detail: "Étaler la pâte. Napper de crème fraîche assaisonnée sel, poivre et aneth.", badge: null },
      { icone: "🧀", titre: "Mozzarella + épinards",    detail: "Répartir la mozzarella. Parsemer les épinards frais (ils vont cuire sur la pizza).", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Cuire la pizza sans le saumon.", badge: "⏱ 7-10 min à 280°C" },
      { icone: "🐟", titre: "Saumon fumé à la sortie",  detail: "Sortir la pizza, disposer le saumon fumé en tranches. Presser le citron. Quelques câpres et aneth frais. Le saumon fumé ne se cuit jamais !", badge: null },
    ]
  },

  pizzavegetarienne: {
    base: 2,
    temps: "20 min + 48h pâte",
    niveau: "⭐ Facile",
    emoji: "🥗",
    description: "Pizza végétarienne colorée — poivrons, courgette, aubergine grillée, mozzarella et pesto. Pleine de saveurs méditerranéennes.",
    tableauPizzaVege: [
      { nb:  1, pate: "1 pâton",  tomates: "80 g",  mozza: "80 g",  poivron: "¼",  courgette: "¼",  aubergine: "¼",  pesto: "1 c.à.s" },
      { nb:  2, pate: "2 pâtons", tomates: "160 g", mozza: "160 g", poivron: "½",  courgette: "½",  aubergine: "½",  pesto: "2 c.à.s" },
      { nb:  3, pate: "3 pâtons", tomates: "240 g", mozza: "240 g", poivron: "¾",  courgette: "¾",  aubergine: "¾",  pesto: "3 c.à.s" },
      { nb:  4, pate: "4 pâtons", tomates: "320 g", mozza: "320 g", poivron: "1",  courgette: "1",  aubergine: "1",  pesto: "4 c.à.s" },
      { nb:  5, pate: "5 pâtons", tomates: "400 g", mozza: "400 g", poivron: "1",  courgette: "1",  aubergine: "1",  pesto: "5 c.à.s" },
      { nb:  6, pate: "6 pâtons", tomates: "480 g", mozza: "480 g", poivron: "1½", courgette: "1½", aubergine: "1½", pesto: "6 c.à.s" },
      { nb:  7, pate: "7 pâtons", tomates: "560 g", mozza: "560 g", poivron: "2",  courgette: "2",  aubergine: "2",  pesto: "7 c.à.s" },
      { nb:  8, pate: "8 pâtons", tomates: "640 g", mozza: "640 g", poivron: "2",  courgette: "2",  aubergine: "2",  pesto: "8 c.à.s" },
      { nb:  9, pate: "9 pâtons", tomates: "720 g", mozza: "720 g", poivron: "2½", courgette: "2½", aubergine: "2½", pesto: "9 c.à.s" },
      { nb: 10, pate: "10 pâtons",tomates: "800 g", mozza: "800 g", poivron: "3",  courgette: "3",  aubergine: "3",  pesto: "10 c.à.s"},
      { nb: 11, pate: "11 pâtons",tomates: "880 g", mozza: "880 g", poivron: "3",  courgette: "3",  aubergine: "3",  pesto: "11 c.à.s"},
      { nb: 12, pate: "12 pâtons",tomates: "960 g", mozza: "960 g", poivron: "3½", courgette: "3½", aubergine: "3½", pesto: "12 c.à.s"},
      { nb: 13, pate: "13 pâtons",tomates: "1040 g",mozza: "1040 g",poivron: "4",  courgette: "4",  aubergine: "4",  pesto: "13 c.à.s"},
      { nb: 14, pate: "14 pâtons",tomates: "1120 g",mozza: "1120 g",poivron: "4",  courgette: "4",  aubergine: "4",  pesto: "14 c.à.s"},
      { nb: 15, pate: "15 pâtons",tomates: "1200 g",mozza: "1200 g",poivron: "4½", courgette: "4½", aubergine: "4½", pesto: "15 c.à.s"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🥒", titre: "Griller les légumes",      detail: "Couper poivrons, courgette et aubergine en lamelles. Griller à la poêle ou au four avec huile d'olive. Saler.", badge: "⏱ 10 min" },
      { icone: "🫓", titre: "Pâte et sauce",            detail: "Étaler la pâte. Napper de sauce tomate et de pesto en alternance.", badge: null },
      { icone: "🧀", titre: "Mozzarella et légumes",    detail: "Répartir mozzarella puis les légumes grillés. Olives noires en option.", badge: null },
      { icone: "🔥", titre: "Cuire et finir",           detail: "Cuire au four à maximum. Finir avec roquette fraîche et copeaux de parmesan à la sortie.", badge: "⏱ 7-10 min à 280°C" },
    ]
  },

  souvlakiagneau: {
    base: 4,
    temps: "25 min + marinade",
    niveau: "⭐ Facile",
    emoji: "🍢",
    description: "Souvlaki d'agneau grec — brochettes tendres marinées au citron et origan, servies avec pain pita et tzatziki.",
    tableauSouvlakiAgneau: [
      { nb:  2, agneau: "300 g", pita: "2",  yaourt: "100 g", citron: "½", huileOlive: "2 c.à.s" },
      { nb:  4, agneau: "600 g", pita: "4",  yaourt: "200 g", citron: "1", huileOlive: "4 c.à.s" },
      { nb:  6, agneau: "900 g", pita: "6",  yaourt: "300 g", citron: "1", huileOlive: "6 c.à.s" },
      { nb:  8, agneau: "1.2 kg",pita: "8",  yaourt: "400 g", citron: "2", huileOlive: "8 c.à.s" },
      { nb: 10, agneau: "1.5 kg",pita: "10", yaourt: "500 g", citron: "2", huileOlive: "10 c.à.s"},
      { nb: 12, agneau: "1.8 kg",pita: "12", yaourt: "600 g", citron: "3", huileOlive: "12 c.à.s"},
      { nb: 14, agneau: "2.1 kg",pita: "14", yaourt: "700 g", citron: "3", huileOlive: "14 c.à.s"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🥩", titre: "Marinade",                 detail: "Couper l'agneau en cubes. Mariner avec huile d'olive, jus de citron, origan, ail, sel et poivre.", badge: "⏱ 2h minimum" },
      { icone: "🍢", titre: "Brochettes",               detail: "Enfiler sur brochettes. Cuire au grill ou barbecue en tournant.", badge: "⏱ 10-12 min" },
      { icone: "🥒", titre: "Tzatziki",                 detail: "Mélanger yaourt grec, concombre râpé essoré, ail, aneth, jus de citron.", badge: null },
      { icone: "🫓", titre: "Servir",                   detail: "Réchauffer les pitas. Garnir de tzatziki, tomate, oignon rouge et la viande. Arroser d'huile d'olive.", badge: null },
    ]
  },

  tom_yam: {
    base: 4,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🍲",
    description: "La soupe Tom Yam thaïlandaise — bouillon piquant au citron vert, galanga, citronnelle et crevettes. Un feu d'artifice d'arômes.",
    tableauTomYam: [
      { nb:  1, bouillon: "300 ml", crevettes: "80 g",  citron: "1",  citronnelle: "1 tige",  galanga: "3 tranches" },
      { nb:  2, bouillon: "600 ml", crevettes: "160 g", citron: "2",  citronnelle: "2 tiges", galanga: "6 tranches" },
      { nb:  3, bouillon: "900 ml", crevettes: "240 g", citron: "3",  citronnelle: "3 tiges", galanga: "9 tranches" },
      { nb:  4, bouillon: "1.2 L",  crevettes: "320 g", citron: "4",  citronnelle: "4 tiges", galanga: "12 tranches"},
      { nb:  5, bouillon: "1.5 L",  crevettes: "400 g", citron: "5",  citronnelle: "5 tiges", galanga: "15 tranches"},
      { nb:  6, bouillon: "1.8 L",  crevettes: "480 g", citron: "6",  citronnelle: "6 tiges", galanga: "18 tranches"},
      { nb:  7, bouillon: "2.1 L",  crevettes: "560 g", citron: "7",  citronnelle: "7 tiges", galanga: "21 tranches"},
      { nb:  8, bouillon: "2.4 L",  crevettes: "640 g", citron: "8",  citronnelle: "8 tiges", galanga: "24 tranches"},
      { nb:  9, bouillon: "2.7 L",  crevettes: "720 g", citron: "9",  citronnelle: "9 tiges", galanga: "27 tranches"},
      { nb: 10, bouillon: "3 L",    crevettes: "800 g", citron: "10", citronnelle: "10 tiges",galanga: "30 tranches"},
      { nb: 11, bouillon: "3.3 L",  crevettes: "880 g", citron: "11", citronnelle: "11 tiges",galanga: "33 tranches"},
      { nb: 12, bouillon: "3.6 L",  crevettes: "960 g", citron: "12", citronnelle: "12 tiges",galanga: "36 tranches"},
      { nb: 13, bouillon: "3.9 L",  crevettes: "1040 g",citron: "13", citronnelle: "13 tiges",galanga: "39 tranches"},
      { nb: 14, bouillon: "4.2 L",  crevettes: "1120 g",citron: "14", citronnelle: "14 tiges",galanga: "42 tranches"},
      { nb: 15, bouillon: "4.5 L",  crevettes: "1200 g",citron: "15", citronnelle: "15 tiges",galanga: "45 tranches"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Préparer le bouillon",     detail: "Porter le bouillon de poulet à ébullition. Ajouter citronnelle coupée, galanga, feuilles de kaffir lime, piment. Laisser infuser 10 min.", badge: "⏱ 10 min" },
      { icone: "🍄", titre: "Ajouter champignons",      detail: "Ajouter les champignons de paille ou shiitake. Cuire 3 min.", badge: null },
      { icone: "🦐", titre: "Ajouter les crevettes",    detail: "Ajouter les crevettes. Cuire jusqu'à ce qu'elles deviennent roses.", badge: "⏱ 3 min" },
      { icone: "🍋", titre: "Assaisonner",              detail: "Hors du feu, ajouter jus de citron vert, sauce poisson et pâte de piment (nam prik pao). Goûter et ajuster. Servir avec coriandre fraîche.", badge: null },
    ]
  },

  dorade_chermoula: {
    base: 4,
    temps: "40 min + marinade",
    niveau: "⭐ Facile",
    emoji: "🐟",
    description: "Dorade royale à la chermoula marocaine — marinade aux herbes et épices, cuite au four. Simple, parfumée et délicate.",
    tableauDorade: [
      { nb:  2, dorade: "1 (500g)",  chermoula: "3 c.à.s", citron: "1",  olives: "50 g"  },
      { nb:  4, dorade: "2 (500g)",  chermoula: "6 c.à.s", citron: "2",  olives: "100 g" },
      { nb:  6, dorade: "3 (500g)",  chermoula: "9 c.à.s", citron: "3",  olives: "150 g" },
      { nb:  8, dorade: "4 (500g)",  chermoula: "12 c.à.s",citron: "4",  olives: "200 g" },
      { nb: 10, dorade: "5 (500g)",  chermoula: "15 c.à.s",citron: "5",  olives: "250 g" },
      { nb: 12, dorade: "6 (500g)",  chermoula: "18 c.à.s",citron: "6",  olives: "300 g" },
      { nb: 14, dorade: "7 (500g)",  chermoula: "21 c.à.s",citron: "7",  olives: "350 g" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Préparer la chermoula",    detail: "Mixer coriandre, persil, ail, cumin, paprika, curcuma, jus de citron et huile d'olive. La chermoula doit être une pâte verte et parfumée.", badge: null },
      { icone: "🐟", titre: "Mariner la dorade",        detail: "Entailler le poisson. L'enduire généreusement de chermoula dedans et dehors. Mariner au frigo.", badge: "⏱ 1h minimum" },
      { icone: "🔥", titre: "Cuire au four",            detail: "Disposer dans un plat avec rondelles de citron, tomates, olives et poivrons. Couvrir de papier alu les 20 premières minutes.", badge: "⏱ 35 min à 190°C" },
      { icone: "🍋", titre: "Servir",                   detail: "Servir avec couscous ou pain marocain. Arroser du jus de cuisson.", badge: null },
    ]
  },

  pouletchicken65: {
    base: 4,
    temps: "30 min + marinade",
    niveau: "⭐ Facile",
    emoji: "🌶️",
    description: "Le Chicken 65 indien — poulet frit ultra épicé et croustillant, spécialité de Chennai. Un apéro indien explosif !",
    tableauChicken65: [
      { nb:  2, poulet: "250 g", yaourt: "50 g",  farine: "30 g",  piment: "1 c.à.c",  curry: "½ c.à.c" },
      { nb:  4, poulet: "500 g", yaourt: "100 g", farine: "60 g",  piment: "2 c.à.c",  curry: "1 c.à.c"  },
      { nb:  6, poulet: "750 g", yaourt: "150 g", farine: "90 g",  piment: "3 c.à.c",  curry: "1½ c.à.c" },
      { nb:  8, poulet: "1 kg",  yaourt: "200 g", farine: "120 g", piment: "4 c.à.c",  curry: "2 c.à.c"  },
      { nb: 10, poulet: "1.25 kg",yaourt: "250 g",farine: "150 g", piment: "5 c.à.c",  curry: "2½ c.à.c" },
      { nb: 12, poulet: "1.5 kg",yaourt: "300 g", farine: "180 g", piment: "6 c.à.c",  curry: "3 c.à.c"  },
      { nb: 14, poulet: "1.75 kg",yaourt: "350 g",farine: "210 g", piment: "7 c.à.c",  curry: "3½ c.à.c" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌶️", titre: "Marinade épicée",         detail: "Mélanger yaourt, farine de riz, fécule, gingembre-ail râpé, piment rouge, curry, curcuma, sel et colorant rouge (optionnel). Mariner le poulet en morceaux.", badge: "⏱ 2h minimum" },
      { icone: "🔥", titre: "Frire en deux fois",       detail: "Première friture à 160°C pour cuire. Deuxième friture à 190°C pour croustiller.", badge: "⏱ 5 min + 2 min" },
      { icone: "🌿", titre: "Finir à la poêle",         detail: "Sauter rapidement avec feuilles de curry, piment vert, ail et gingembre. Arroser de jus de citron.", badge: null },
      { icone: "🍋", titre: "Servir",                   detail: "Servir avec rondelles d'oignon et citron vert. Parsemer de coriandre fraîche.", badge: null },
    ]
  },

  pierogi: {
    base: 4,
    temps: "1h30",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥟",
    description: "Les Pierogi polonais — raviolis farcis pommes de terre-fromage, bouillis puis poêlés avec oignons caramélisés et crème sure.",
    tableauPierogi: [
      { nb:  2, farine: "150 g", pdterre: "200 g", fromage: "80 g",  oignon: "1",  creme: "50 ml"  },
      { nb:  4, farine: "300 g", pdterre: "400 g", fromage: "160 g", oignon: "2",  creme: "100 ml" },
      { nb:  6, farine: "450 g", pdterre: "600 g", fromage: "240 g", oignon: "3",  creme: "150 ml" },
      { nb:  8, farine: "600 g", pdterre: "800 g", fromage: "320 g", oignon: "4",  creme: "200 ml" },
      { nb: 10, farine: "750 g", pdterre: "1 kg",  fromage: "400 g", oignon: "5",  creme: "250 ml" },
      { nb: 12, farine: "900 g", pdterre: "1.2 kg",fromage: "480 g", oignon: "6",  creme: "300 ml" },
      { nb: 14, farine: "1050 g",pdterre: "1.4 kg",fromage: "560 g", oignon: "7",  creme: "350 ml" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Pâte à pierogi",           detail: "Mélanger farine, œuf, sel et eau tiède jusqu'à pâte souple. Laisser reposer 30 min sous film.", badge: "⏱ 30 min repos" },
      { icone: "🥔", titre: "Farce pomme de terre",     detail: "Cuire les pommes de terre, écraser. Mélanger avec fromage blanc ou fromage frais, oignon sauté, sel, poivre.", badge: null },
      { icone: "🥟", titre: "Former les pierogi",       detail: "Étaler la pâte finement. Découper en cercles de 8cm. Déposer une cuillerée de farce. Plier en demi-lune et souder les bords.", badge: null },
      { icone: "💧", titre: "Bouillir",                 detail: "Plonger dans eau bouillante salée jusqu'à ce qu'ils remontent. Égoutter.", badge: "⏱ 4-5 min" },
      { icone: "🍳", titre: "Poêler et servir",         detail: "Faire dorer au beurre avec oignons caramélisés. Servir avec crème sure et ciboulette.", badge: "⏱ 3 min" },
    ]
  },

  momos: {
    base: 4,
    temps: "1h",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥟",
    description: "Les Momos tibétains — raviolis vapeur à la viande et légumes, spécialité himalayenne servie avec sauce pimentée. Cousin du gyoza !",
    tableauMomos: [
      { nb:  4, farine: "100 g", viande: "150 g", chou: "80 g",  oignon: "½", gingembre: "1 cm" },
      { nb:  8, farine: "200 g", viande: "300 g", chou: "160 g", oignon: "1", gingembre: "2 cm" },
      { nb: 12, farine: "300 g", viande: "450 g", chou: "240 g", oignon: "1", gingembre: "3 cm" },
      { nb: 16, farine: "400 g", viande: "600 g", chou: "320 g", oignon: "2", gingembre: "4 cm" },
      { nb: 20, farine: "500 g", viande: "750 g", chou: "400 g", oignon: "2", gingembre: "5 cm" },
      { nb: 24, farine: "600 g", viande: "900 g", chou: "480 g", oignon: "3", gingembre: "6 cm" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Pâte simple",              detail: "Mélanger farine et eau chaude progressivement. Pétrir jusqu'à pâte souple et non collante. Reposer 20 min.", badge: "⏱ 20 min repos" },
      { icone: "🥩", titre: "Farce",                    detail: "Mélanger viande hachée, chou finement cisélé, oignon, gingembre et ail râpés, sauce soja, huile de sésame, sel.", badge: null },
      { icone: "🥟", titre: "Former les momos",         detail: "Étaler des petits disques de pâte fine. Déposer la farce au centre. Plier et plisser en une belle rosette.", badge: null },
      { icone: "♨️", titre: "Cuire vapeur",             detail: "Huiler le panier vapeur. Cuire à vapeur vive.", badge: "⏱ 15-18 min" },
      { icone: "🌶️", titre: "Sauce pimentée",          detail: "Servir avec sauce tomate-piment maison : tomates rôties, piment, ail et gingembre mixés.", badge: null },
    ]
  },

  shakshukaverte: {
    base: 2,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🥬",
    description: "Shakshuka verte — œufs pochés dans une sauce aux épinards, herbes fraîches et piment vert. La version printanière de la shakshuka.",
    tableauShakshukaVerte: [
      { nb:  1, oeufs: "2",  epinards: "100 g", poivron: "½",  oignon: "¼", fetaOpt: "30 g"  },
      { nb:  2, oeufs: "4",  epinards: "200 g", poivron: "1",  oignon: "½", fetaOpt: "60 g"  },
      { nb:  3, oeufs: "6",  epinards: "300 g", poivron: "1½", oignon: "1", fetaOpt: "90 g"  },
      { nb:  4, oeufs: "8",  epinards: "400 g", poivron: "2",  oignon: "1", fetaOpt: "120 g" },
      { nb:  5, oeufs: "10", epinards: "500 g", poivron: "2½", oignon: "1", fetaOpt: "150 g" },
      { nb:  6, oeufs: "12", epinards: "600 g", poivron: "3",  oignon: "2", fetaOpt: "180 g" },
      { nb:  7, oeufs: "14", epinards: "700 g", poivron: "3½", oignon: "2", fetaOpt: "210 g" },
      { nb:  8, oeufs: "16", epinards: "800 g", poivron: "4",  oignon: "2", fetaOpt: "240 g" },
      { nb:  9, oeufs: "18", epinards: "900 g", poivron: "4½", oignon: "2", fetaOpt: "270 g" },
      { nb: 10, oeufs: "20", epinards: "1 kg",  poivron: "5",  oignon: "3", fetaOpt: "300 g" },
      { nb: 11, oeufs: "22", epinards: "1.1 kg",poivron: "5½", oignon: "3", fetaOpt: "330 g" },
      { nb: 12, oeufs: "24", epinards: "1.2 kg",poivron: "6",  oignon: "3", fetaOpt: "360 g" },
      { nb: 13, oeufs: "26", epinards: "1.3 kg",poivron: "6½", oignon: "3", fetaOpt: "390 g" },
      { nb: 14, oeufs: "28", epinards: "1.4 kg",poivron: "7",  oignon: "4", fetaOpt: "420 g" },
      { nb: 15, oeufs: "30", epinards: "1.5 kg",poivron: "7½", oignon: "4", fetaOpt: "450 g" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Faire revenir",            detail: "Faire revenir oignon et poivron vert dans l'huile d'olive 5 min. Ajouter ail, cumin et piment.", badge: null },
      { icone: "🥬", titre: "Ajouter les épinards",     detail: "Ajouter les épinards frais, coriandre et persil. Cuire jusqu'à ce qu'ils réduisent. Assaisonner.", badge: "⏱ 5 min" },
      { icone: "🥚", titre: "Pocher les œufs",          detail: "Faire des puits dans la sauce verte. Casser les œufs délicatement. Couvrir et cuire selon la préférence.", badge: "⏱ 5 min (mollet)" },
      { icone: "🧀", titre: "Servir",                   detail: "Parsemer de feta émiettée, herbes fraîches et graines de sésame. Servir avec pain pita.", badge: null },
    ]
  },

  kebbeh: {
    base: 4,
    temps: "45 min",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥩",
    description: "Le Kebbeh libanais — boulettes de viande à la semoule de blé et épices, frites ou au four. La recette emblématique du Liban.",
    tableauKebbeh: [
      { nb:  4, agneau: "200 g", semoule: "100 g", oignon: "1",  pignons: "30 g",  cannelle: "½ c.à.c" },
      { nb:  8, agneau: "400 g", semoule: "200 g", oignon: "2",  pignons: "60 g",  cannelle: "1 c.à.c"  },
      { nb: 12, agneau: "600 g", semoule: "300 g", oignon: "3",  pignons: "90 g",  cannelle: "1½ c.à.c" },
      { nb: 16, agneau: "800 g", semoule: "400 g", oignon: "4",  pignons: "120 g", cannelle: "2 c.à.c"  },
      { nb: 20, agneau: "1 kg",  semoule: "500 g", oignon: "5",  pignons: "150 g", cannelle: "2½ c.à.c" },
      { nb: 24, agneau: "1.2 kg",semoule: "600 g", oignon: "6",  pignons: "180 g", cannelle: "3 c.à.c"  },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Tremper la semoule",       detail: "Tremper la semoule fine dans eau froide 20 min. Bien égoutter et essorer.", badge: "⏱ 20 min" },
      { icone: "🥩", titre: "Pâte de base",             detail: "Mixer agneau haché très fin + semoule + oignon + épices (cannelle, cumin, allspice) + sel. La pâte doit être homogène.", badge: null },
      { icone: "🥜", titre: "Farce",                    detail: "Faire revenir oignon, viande hachée, pignons, raisins secs et épices. Refroidir.", badge: null },
      { icone: "⚽", titre: "Former les kebbeh",        detail: "Former des boules avec la pâte, creuser pour farcir. Refermer en forme de football américain.", badge: null },
      { icone: "🔥", titre: "Cuire",                    detail: "Frire dans huile chaude ou cuire au four à 180°C. Servir avec labneh (yaourt égoutté) et salade.", badge: "⏱ 20 min à 180°C" },
    ]
  },

  tteokbokki: {
    base: 2,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🌶️",
    description: "Le Tteokbokki coréen — gâteaux de riz dans une sauce gochujang épicée et sucrée. Le street food coréen incontournable !",
    tableauTteokbokki: [
      { nb:  1, tteok: "150 g", gochujang: "1 c.à.s", sucre: "1 c.à.c",  sojaS: "1 c.à.c",  bouillon: "200 ml" },
      { nb:  2, tteok: "300 g", gochujang: "2 c.à.s", sucre: "2 c.à.c",  sojaS: "2 c.à.c",  bouillon: "400 ml" },
      { nb:  3, tteok: "450 g", gochujang: "3 c.à.s", sucre: "3 c.à.c",  sojaS: "3 c.à.c",  bouillon: "600 ml" },
      { nb:  4, tteok: "600 g", gochujang: "4 c.à.s", sucre: "4 c.à.c",  sojaS: "4 c.à.c",  bouillon: "800 ml" },
      { nb:  5, tteok: "750 g", gochujang: "5 c.à.s", sucre: "5 c.à.c",  sojaS: "5 c.à.c",  bouillon: "1 L"    },
      { nb:  6, tteok: "900 g", gochujang: "6 c.à.s", sucre: "6 c.à.c",  sojaS: "6 c.à.c",  bouillon: "1.2 L"  },
      { nb:  7, tteok: "1050 g",gochujang: "7 c.à.s", sucre: "7 c.à.c",  sojaS: "7 c.à.c",  bouillon: "1.4 L"  },
      { nb:  8, tteok: "1200 g",gochujang: "8 c.à.s", sucre: "8 c.à.c",  sojaS: "8 c.à.c",  bouillon: "1.6 L"  },
      { nb:  9, tteok: "1350 g",gochujang: "9 c.à.s", sucre: "9 c.à.c",  sojaS: "9 c.à.c",  bouillon: "1.8 L"  },
      { nb: 10, tteok: "1500 g",gochujang: "10 c.à.s",sucre: "10 c.à.c", sojaS: "10 c.à.c", bouillon: "2 L"    },
      { nb: 11, tteok: "1650 g",gochujang: "11 c.à.s",sucre: "11 c.à.c", sojaS: "11 c.à.c", bouillon: "2.2 L"  },
      { nb: 12, tteok: "1800 g",gochujang: "12 c.à.s",sucre: "12 c.à.c", sojaS: "12 c.à.c", bouillon: "2.4 L"  },
      { nb: 13, tteok: "1950 g",gochujang: "13 c.à.s",sucre: "13 c.à.c", sojaS: "13 c.à.c", bouillon: "2.6 L"  },
      { nb: 14, tteok: "2100 g",gochujang: "14 c.à.s",sucre: "14 c.à.c", sojaS: "14 c.à.c", bouillon: "2.8 L"  },
      { nb: 15, tteok: "2250 g",gochujang: "15 c.à.s",sucre: "15 c.à.c", sojaS: "15 c.à.c", bouillon: "3 L"    },
    ],
    ingredients: {},
    etapes: [
      { icone: "💧", titre: "Faire tremper les tteok",  detail: "Si les gâteaux de riz sont congelés ou secs, les faire tremper 20 min dans l'eau froide.", badge: null },
      { icone: "🌶️", titre: "Sauce gochujang",         detail: "Mélanger gochujang, sauce soja, sucre et ail dans le bouillon (anchois ou légumes). Porter à ébullition.", badge: null },
      { icone: "🍱", titre: "Cuire les tteok",          detail: "Ajouter les gâteaux de riz dans la sauce. Cuire en remuant jusqu'à sauce épaissie et tteok tendres.", badge: "⏱ 10-12 min" },
      { icone: "🥚", titre: "Garnitures",               detail: "Ajouter galettes de poisson (eomuk) si disponibles, oignons verts et un œuf dur. Servir chaud et bien pimenté !", badge: null },
    ]
  },

  porc_pulled: {
    base: 6,
    temps: "6h",
    niveau: "⭐ Facile",
    emoji: "🐷",
    description: "Le Pulled Pork américain — épaule de porc fumée et effilochée, marinée au rub BBQ et cuite lentement. La recette du Sud américain.",
    tableauPulledPork: [
      { nb:  2, porc: "500 g",  rub: "2 c.à.s",  bbqSauce: "50 ml",  fumee: "1 pincée" },
      { nb:  4, porc: "1 kg",   rub: "3 c.à.s",  bbqSauce: "100 ml", fumee: "1 c.à.c"  },
      { nb:  6, porc: "1.5 kg", rub: "4 c.à.s",  bbqSauce: "150 ml", fumee: "1½ c.à.c" },
      { nb:  8, porc: "2 kg",   rub: "5 c.à.s",  bbqSauce: "200 ml", fumee: "2 c.à.c"  },
      { nb: 10, porc: "2.5 kg", rub: "7 c.à.s",  bbqSauce: "250 ml", fumee: "2½ c.à.c" },
      { nb: 12, porc: "3 kg",   rub: "8 c.à.s",  bbqSauce: "300 ml", fumee: "3 c.à.c"  },
      { nb: 14, porc: "3.5 kg", rub: "9 c.à.s",  bbqSauce: "350 ml", fumee: "3½ c.à.c" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌶️", titre: "Préparer le rub",         detail: "Mélanger paprika fumé, cassonade, ail en poudre, oignon, cumin, sel, poivre, piment. Enrober généreusement le porc. Filmer.", badge: "⏱ 12h frigo idéal" },
      { icone: "🔥", titre: "Cuisson basse température",detail: "Cuire au four à 120°C couvert, ou dans une cocotte en fonte. La viande doit atteindre 90°C à cœur.", badge: "⏱ 5-6h à 120°C" },
      { icone: "🐷", titre: "Effilocher",               detail: "Sortir la viande, laisser reposer 30 min. Effilocher avec deux fourchettes. Arroser du jus de cuisson.", badge: "⏱ 30 min repos" },
      { icone: "🍖", titre: "Sauce BBQ",                detail: "Mélanger la viande avec la sauce BBQ. Servir dans des buns burger avec coleslaw.", badge: null },
    ]
  },

  dosakerdosai: {
    base: 4,
    temps: "30 min + 12h fermentation",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥞",
    description: "Les Dosa indiens — crêpes fermentées au riz et lentilles, croustillantes, servies avec sambar et chutneys. Le petit-déjeuner du Tamil Nadu.",
    tableauDosa: [
      { nb:  2, rizS: "75 g",   lentilles: "25 g", sel: "½ c.à.c", sambar: "100 ml", chutney: "2 c.à.s" },
      { nb:  4, rizS: "150 g",  lentilles: "50 g", sel: "1 c.à.c",  sambar: "200 ml", chutney: "4 c.à.s" },
      { nb:  6, rizS: "225 g",  lentilles: "75 g", sel: "1½ c.à.c", sambar: "300 ml", chutney: "6 c.à.s" },
      { nb:  8, rizS: "300 g",  lentilles: "100 g",sel: "2 c.à.c",  sambar: "400 ml", chutney: "8 c.à.s" },
      { nb: 10, rizS: "375 g",  lentilles: "125 g",sel: "2½ c.à.c", sambar: "500 ml", chutney: "10 c.à.s"},
      { nb: 12, rizS: "450 g",  lentilles: "150 g",sel: "3 c.à.c",  sambar: "600 ml", chutney: "12 c.à.s"},
      { nb: 14, rizS: "525 g",  lentilles: "175 g",sel: "3½ c.à.c", sambar: "700 ml", chutney: "14 c.à.s"},
    ],
    ingredients: {},
    etapes: [
      { icone: "💧", titre: "Tremper riz et lentilles", detail: "Faire tremper séparément riz et lentilles urad dal 8h. Égoutter.", badge: "⏱ 8h trempage" },
      { icone: "🌀", titre: "Mixer et fermenter",       detail: "Mixer séparément puis mélanger. Ajouter sel. Laisser fermenter à température ambiante. La pâte doit légèrement gonfler.", badge: "⏱ 8-12h fermentation" },
      { icone: "🍳", titre: "Cuire les dosa",           detail: "Chauffer une poêle antiadhésive à feu moyen. Verser une louche de pâte au centre et étaler en spirale très fine. Huiler les bords.", badge: "⏱ 2-3 min" },
      { icone: "🌿", titre: "Servir",                   detail: "Servir chaud avec sambar (soupe lentilles épicée), chutney de coco et chutney tomate.", badge: null },
    ]
  },

  braiseboeuf_asiatique: {
    base: 4,
    temps: "3h",
    niveau: "⭐ Facile",
    emoji: "🥢",
    description: "Joues de bœuf braisées à l'asiatique — sauce soja, gingembre, étoile de badiane et sucre de palme. Fondant absolu.",
    tableauBraiseBoeuf: [
      { nb:  2, joues: "400 g", sojaS: "3 c.à.s", mirin: "2 c.à.s", saké: "2 c.à.s", gingembre: "2 cm", anis: "1" },
      { nb:  4, joues: "800 g", sojaS: "6 c.à.s", mirin: "4 c.à.s", saké: "4 c.à.s", gingembre: "4 cm", anis: "2" },
      { nb:  6, joues: "1.2 kg",sojaS: "9 c.à.s", mirin: "6 c.à.s", saké: "6 c.à.s", gingembre: "5 cm", anis: "3" },
      { nb:  8, joues: "1.6 kg",sojaS: "12 c.à.s",mirin: "8 c.à.s", saké: "8 c.à.s", gingembre: "7 cm", anis: "4" },
      { nb: 10, joues: "2 kg",  sojaS: "15 c.à.s",mirin: "10 c.à.s",saké: "10 c.à.s",gingembre: "8 cm", anis: "5" },
      { nb: 12, joues: "2.4 kg",sojaS: "18 c.à.s",mirin: "12 c.à.s",saké: "12 c.à.s",gingembre: "10 cm",anis: "6" },
      { nb: 14, joues: "2.8 kg",sojaS: "21 c.à.s",mirin: "14 c.à.s",saké: "14 c.à.s",gingembre: "12 cm",anis: "7" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🥩", titre: "Saisir les joues",         detail: "Faire dorer les joues de bœuf sur toutes les faces dans huile à feu vif. Réserver.", badge: "⏱ 8 min" },
      { icone: "🫙", titre: "Préparer la braise",       detail: "Dans la même cocotte, faire revenir ail et gingembre. Ajouter sauce soja, mirin, saké, sucre de palme, anis étoilé et bouillon. Porter à ébullition.", badge: null },
      { icone: "⏳", titre: "Braiser longuement",       detail: "Remettre les joues. Couvrir et cuire à feu très doux. La viande doit se défaire à la fourchette.", badge: "⏱ 2h30 à feu doux" },
      { icone: "🍚", titre: "Réduire et servir",        detail: "Retirer la viande, réduire la sauce à feu vif 5 min. Napper les joues. Servir avec riz vapeur et bok choy sauté.", badge: null },
    ]
  },

  paprikashpoulet: {
    base: 4,
    temps: "45 min",
    niveau: "⭐ Facile",
    emoji: "🇭🇺",
    description: "Le Paprikash de poulet hongrois — poulet mijoté dans une sauce crémeuse au paprika fumé. Un plat réconfortant d'Europe centrale.",
    tableauPaprikash: [
      { nb:  2, poulet: "400 g", paprika: "1 c.à.s", creme: "100 ml", oignon: "1",  bouillon: "150 ml" },
      { nb:  4, poulet: "800 g", paprika: "2 c.à.s", creme: "200 ml", oignon: "2",  bouillon: "300 ml" },
      { nb:  6, poulet: "1.2 kg",paprika: "3 c.à.s", creme: "300 ml", oignon: "3",  bouillon: "450 ml" },
      { nb:  8, poulet: "1.6 kg",paprika: "4 c.à.s", creme: "400 ml", oignon: "4",  bouillon: "600 ml" },
      { nb: 10, poulet: "2 kg",  paprika: "5 c.à.s", creme: "500 ml", oignon: "5",  bouillon: "750 ml" },
      { nb: 12, poulet: "2.4 kg",paprika: "6 c.à.s", creme: "600 ml", oignon: "6",  bouillon: "900 ml" },
      { nb: 14, poulet: "2.8 kg",paprika: "7 c.à.s", creme: "700 ml", oignon: "7",  bouillon: "1050 ml"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Faire revenir l'oignon",  detail: "Faire fondre les oignons émincés dans le saindoux (ou beurre) jusqu'à dorure.", badge: "⏱ 8 min" },
      { icone: "🌶️", titre: "Paprika",                 detail: "Hors du feu, ajouter le paprika doux hongrois en grande quantité. Mélanger. Remettre sur feu doux (le paprika brûle facilement).", badge: null },
      { icone: "🍗", titre: "Ajouter le poulet",        detail: "Ajouter les morceaux de poulet. Couvrir de bouillon. Saler. Laisser mijoter couvert.", badge: "⏱ 30 min" },
      { icone: "🍦", titre: "Sauce à la crème",         detail: "Retirer le poulet. Mélanger crème fraîche + 1 c.à.s de farine. Incorporer dans la sauce chaude en fouettant. Remettre le poulet. Servir avec nouilles hongroises (csipetke) ou gnocchis.", badge: null },
    ]
  },
  boeufbourguignon: {
    base: 6,
    temps: "3h30 + marinade",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🥩",
    description: "Le grand classique français — bœuf mijoté au vin de Bourgogne, lardons, carottes et champignons. Meilleur préparé la veille.",
    tableauBoeuf: [
      { nb:  4, boeuf: "1 kg",    vin: "50 cl",  carottes: "2",  oignons: "1",  lardons: "130 g", champignons: "130 g", farine: "1,5 c.à.s" },
      { nb:  5, boeuf: "1,25 kg", vin: "60 cl",  carottes: "2",  oignons: "2",  lardons: "165 g", champignons: "165 g", farine: "2 c.à.s"   },
      { nb:  6, boeuf: "1,5 kg",  vin: "75 cl",  carottes: "3",  oignons: "2",  lardons: "200 g", champignons: "200 g", farine: "2 c.à.s"   },
      { nb:  7, boeuf: "1,75 kg", vin: "90 cl",  carottes: "3",  oignons: "2",  lardons: "230 g", champignons: "230 g", farine: "2,5 c.à.s" },
      { nb:  8, boeuf: "2 kg",    vin: "1 L",    carottes: "4",  oignons: "3",  lardons: "265 g", champignons: "265 g", farine: "3 c.à.s"   },
      { nb:  9, boeuf: "2,25 kg", vin: "1,1 L",  carottes: "4",  oignons: "3",  lardons: "300 g", champignons: "300 g", farine: "3 c.à.s"   },
      { nb: 10, boeuf: "2,5 kg",  vin: "1,25 L", carottes: "5",  oignons: "3",  lardons: "330 g", champignons: "330 g", farine: "3,5 c.à.s" },
      { nb: 11, boeuf: "1.8 ,5 kg", vin: "138 cl", carottes: "5.5", oignons: "3.7", lardons: "367 g", champignons: "367 g", farine: "3.7 c.à.s" },
      { nb: 12, boeuf: "2 ,5 kg", vin: "150 cl", carottes: "6", oignons: "4", lardons: "400 g", champignons: "400 g", farine: "4 c.à.s" },
      { nb: 13, boeuf: "2.2 ,5 kg", vin: "162 cl", carottes: "6.5", oignons: "4.3", lardons: "433 g", champignons: "433 g", farine: "4.3 c.à.s" },
      { nb: 14, boeuf: "2.3 ,5 kg", vin: "175 cl", carottes: "7", oignons: "4.7", lardons: "467 g", champignons: "467 g", farine: "4.7 c.à.s" },
      { nb: 15, boeuf: "2.5 ,5 kg", vin: "188 cl", carottes: "7.5", oignons: "5", lardons: "500 g", champignons: "500 g", farine: "5 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍷", titre: "Marinade (optionnel)",      detail: "Couper le bœuf en gros cubes. Placer dans un plat avec le vin, les carottes, les oignons, l'ail et le bouquet garni. Laisser mariner au frais idéalement une nuit.", badge: "⏱ 12h au frigo (optionnel)" },
      { icone: "🥩", titre: "Saisir la viande",          detail: "Sortir la viande de la marinade, égoutter et sécher avec du papier absorbant. Dans une cocotte, faire chauffer l'huile à feu vif et faire dorer les morceaux de viande sur toutes les faces par petites quantités.", badge: "⏱ 3–4 min par face" },
      { icone: "🥓", titre: "Faire revenir lardons/légumes", detail: "Dans la même cocotte, faire revenir les lardons, les oignons émincés et les carottes en rondelles jusqu'à légère coloration.", badge: null },
      { icone: "🌾", titre: "Singer",                    detail: "Remettre la viande dans la cocotte. Saupoudrer de farine et mélanger pour bien enrober. Cuire 2 min en remuant.", badge: null },
      { icone: "🍷", titre: "Mouiller et mijoter",       detail: "Verser le vin de la marinade (ou une bouteille entière). Ajouter l'ail écrasé et le bouquet garni. Porter à ébullition, écumer, puis baisser le feu. Laisser mijoter à couvert.", badge: "⏱ 3h à feu doux" },
      { icone: "🍄", titre: "Ajouter les champignons",   detail: "30 minutes avant la fin de la cuisson, ajouter les champignons émincés. Ajuster l'assaisonnement.", badge: "⏱ 30 min avant la fin" },
      { icone: "🍽️", titre: "Servir",                   detail: "Retirer le bouquet garni. Servir bien chaud avec des pommes de terre vapeur, des pâtes fraîches ou une purée maison.", badge: null },
    ]
  },

  risotto: {
    base: 4,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🍚",
    description: "Un risotto classique au parmesan — crémeux, onctueux et réconfortant. Le secret : ajouter le bouillon louche par louche.",
    tableauRisotto: [
      { nb: 1, riz: "80 g",   bouillon: "250 ml", vin: "38 ml", parmesan: "20 g", beurre: "13 g" },
      { nb: 2, riz: "160 g",  bouillon: "500 ml", vin: "75 ml", parmesan: "40 g", beurre: "25 g" },
      { nb: 3, riz: "240 g",  bouillon: "750 ml", vin: "112 ml",parmesan: "60 g", beurre: "38 g" },
      { nb: 4, riz: "320 g",  bouillon: "1000 ml",vin: "150 ml",parmesan: "80 g", beurre: "50 g" },
      { nb: 5, riz: "400 g",  bouillon: "1250 ml",vin: "188 ml",parmesan: "100 g",beurre: "63 g" },
      { nb: 6, riz: "480 g",  bouillon: "1500 ml",vin: "225 ml",parmesan: "120 g",beurre: "75 g" },
      { nb:  7, riz: "560 g", bouillon: "1750 ml", vin: "262 ml", parmesan: "140 g", beurre: "88 g" },
      { nb:  8, riz: "640 g", bouillon: "2000 ml", vin: "300 ml", parmesan: "160 g", beurre: "100 g" },
      { nb:  9, riz: "720 g", bouillon: "2250 ml", vin: "338 ml", parmesan: "180 g", beurre: "112 g" },
      { nb: 10, riz: "800 g", bouillon: "2500 ml", vin: "375 ml", parmesan: "200 g", beurre: "125 g" },
      { nb: 11, riz: "880 g", bouillon: "2750 ml", vin: "412 ml", parmesan: "220 g", beurre: "138 g" },
      { nb: 12, riz: "960 g", bouillon: "3000 ml", vin: "450 ml", parmesan: "240 g", beurre: "150 g" },
      { nb: 13, riz: "1040 g", bouillon: "3250 ml", vin: "488 ml", parmesan: "260 g", beurre: "162 g" },
      { nb: 14, riz: "1120 g", bouillon: "3500 ml", vin: "525 ml", parmesan: "280 g", beurre: "175 g" },
      { nb: 15, riz: "1200 g", bouillon: "3750 ml", vin: "562 ml", parmesan: "300 g", beurre: "188 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Faire suer l'oignon",      detail: "Émincer finement l'oignon. Dans une grande casserole, faire chauffer l'huile et 20g de beurre à feu moyen. Faire suer l'oignon 4–5 min sans coloration.", badge: null },
      { icone: "🍚", titre: "Nacrer le riz",             detail: "Ajouter le riz arborio et remuer 2 min à feu moyen jusqu'à ce qu'il devienne nacré et translucide.", badge: "⏱ 2 min" },
      { icone: "🍷", titre: "Déglacer au vin blanc",     detail: "Verser le vin blanc et remuer jusqu'à absorption complète.", badge: null },
      { icone: "🥄", titre: "Ajouter le bouillon",       detail: "Ajouter le bouillon chaud louche par louche en remuant constamment. Attendre que chaque louche soit absorbée avant d'en ajouter une autre.", badge: "⏱ 18–20 min" },
      { icone: "🧀", titre: "Mantecatura",               detail: "Hors du feu, ajouter le reste du beurre froid et le parmesan râpé. Mélanger vigoureusement pour obtenir un risotto crémeux et lié. Couvrir 2 min.", badge: "⏱ 2 min de repos" },
    ]
  },

  gratindauphinois: {
    base: 6,
    temps: "1h30",
    niveau: "⭐ Facile",
    emoji: "🥔",
    description: "Le vrai gratin dauphinois — pommes de terre fondantes dans une crème onctueuse à l'ail. Simple et irrésistible.",
    tableauGratin: [
      { nb:  4, pdterre: "1 kg",    creme: "27 cl", lait: "13 cl", ail: "1 gousse"  },
      { nb:  5, pdterre: "1,25 kg", creme: "33 cl", lait: "17 cl", ail: "2 gousses" },
      { nb:  6, pdterre: "1,5 kg",  creme: "40 cl", lait: "20 cl", ail: "2 gousses" },
      { nb:  7, pdterre: "1,75 kg", creme: "47 cl", lait: "23 cl", ail: "2 gousses" },
      { nb:  8, pdterre: "2 kg",    creme: "53 cl", lait: "27 cl", ail: "3 gousses" },
      { nb:  9, pdterre: "2,25 kg", creme: "60 cl", lait: "30 cl", ail: "3 gousses" },
      { nb: 10, pdterre: "2,5 kg",  creme: "67 cl", lait: "33 cl", ail: "3 gousses" },
      { nb: 11, pdterre: "1.8 ,5 kg", creme: "73 cl", lait: "37 cl", ail: "3.7 gousses" },
      { nb: 12, pdterre: "2 ,5 kg", creme: "80 cl", lait: "40 cl", ail: "4 gousses" },
      { nb: 13, pdterre: "2.2 ,5 kg", creme: "87 cl", lait: "43 cl", ail: "4.3 gousses" },
      { nb: 14, pdterre: "2.3 ,5 kg", creme: "93 cl", lait: "47 cl", ail: "4.7 gousses" },
      { nb: 15, pdterre: "2.5 ,5 kg", creme: "100 cl", lait: "50 cl", ail: "5 gousses" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Préchauffer le four",        detail: "Préchauffer à 160 °C. Frotter le plat à gratin avec une gousse d'ail coupée en deux, puis beurrer généreusement.", badge: null },
      { icone: "🥔", titre: "Préparer les pommes de terre", detail: "Éplucher et laver les pommes de terre. Les couper en fines rondelles régulières (2–3 mm) sans les rincer — l'amidon aide à la liaison. Ne pas les rincer !", badge: null },
      { icone: "🥛", titre: "Préparer la crème",          detail: "Dans une casserole, faire chauffer le lait et la crème avec l'ail écrasé, la muscade, le sel et le poivre. Porter à frémissement puis retirer du feu.", badge: null },
      { icone: "🏗️", titre: "Monter le gratin",          detail: "Disposer les rondelles de pommes de terre en couches régulières dans le plat. Verser la crème chaude par-dessus jusqu'à hauteur des pommes de terre.", badge: null },
      { icone: "🔥", titre: "Cuire au four",              detail: "Enfourner à 160 °C. Le gratin est prêt quand les pommes de terre sont fondantes (tester avec la pointe d'un couteau) et le dessus bien doré.", badge: "⏱ 1h15–1h30" },
    ]
  },

  cremebrulee: {
    base: 6,
    temps: "45 min + repos",
    niveau: "⭐ Facile",
    emoji: "🍮",
    description: "La crème brûlée classique — veloutée et vanillée, avec sa croûte de caramel craquante. Un grand classique de la pâtisserie française.",
    tableauCremebrulee: [
      { nb:  1, creme: "8 cl",  jaunes: "1",  sucre: "13 g",  cassonade: "1 c.à.s",  vanille: "1" },
      { nb:  2, creme: "17 cl", jaunes: "2",  sucre: "27 g",  cassonade: "2 c.à.s",  vanille: "1" },
      { nb:  3, creme: "25 cl", jaunes: "3",  sucre: "40 g",  cassonade: "3 c.à.s",  vanille: "1" },
      { nb:  4, creme: "33 cl", jaunes: "4",  sucre: "53 g",  cassonade: "4 c.à.s",  vanille: "1" },
      { nb:  5, creme: "42 cl", jaunes: "5",  sucre: "67 g",  cassonade: "5 c.à.s",  vanille: "1" },
      { nb:  6, creme: "50 cl", jaunes: "6",  sucre: "80 g",  cassonade: "6 c.à.s",  vanille: "1" },
      { nb:  7, creme: "58 cl", jaunes: "7",  sucre: "93 g",  cassonade: "7 c.à.s",  vanille: "1" },
      { nb:  8, creme: "67 cl", jaunes: "8",  sucre: "107 g", cassonade: "8 c.à.s",  vanille: "1" },
      { nb:  9, creme: "75 cl", jaunes: "9",  sucre: "120 g", cassonade: "9 c.à.s",  vanille: "1" },
      { nb: 10, creme: "83 cl", jaunes: "10", sucre: "133 g", cassonade: "10 c.à.s", vanille: "2" },
      { nb: 11, creme: "92 cl", jaunes: "11", sucre: "147 g", cassonade: "11 c.à.s", vanille: "2" },
      { nb: 12, creme: "100 cl",jaunes: "12", sucre: "160 g", cassonade: "12 c.à.s", vanille: "2" },
      { nb: 13, creme: "108 cl", jaunes: "13", sucre: "173 g", cassonade: "13 c.à.s", vanille: "2.2" },
      { nb: 14, creme: "117 cl", jaunes: "14", sucre: "187 g", cassonade: "14 c.à.s", vanille: "2.3" },
      { nb: 15, creme: "125 cl", jaunes: "15", sucre: "200 g", cassonade: "15 c.à.s", vanille: "2.5" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Infuser la vanille",         detail: "Fendre la gousse de vanille et gratter les graines. Chauffer la crème avec la vanille jusqu'à frémissement. Laisser infuser 10 min hors du feu.", badge: "⏱ 10 min infusion" },
      { icone: "🥚", titre: "Mélanger jaunes + sucre",    detail: "Fouetter les jaunes avec le sucre jusqu'à blanchiment léger. Ne pas faire mousser — fouetter doucement.", badge: null },
      { icone: "🥛", titre: "Incorporer la crème",        detail: "Retirer la gousse. Verser la crème chaude progressivement sur le mélange en fouettant doucement. Écumer si nécessaire.", badge: null },
      { icone: "🥧", titre: "Cuire au bain-marie",        detail: "Verser dans des ramequins. Cuire dans un bain-marie (eau chaude à mi-hauteur) à 150 °C. La crème doit être prise sur les bords mais légèrement tremblotante au centre.", badge: "⏱ 30–35 min à 150 °C" },
      { icone: "❄️", titre: "Refroidir",                  detail: "Laisser refroidir puis placer au réfrigérateur au minimum 3h (idéalement une nuit).", badge: "⏱ 3h au frigo minimum" },
      { icone: "🔥", titre: "Caraméliser",                detail: "Saupoudrer de cassonade et caraméliser au chalumeau jusqu'à obtenir une croûte dorée et craquante. Servir immédiatement.", badge: null },
    ]
  },

  mousseauchocolat: {
    base: 6,
    temps: "20 min + 2h repos",
    niveau: "⭐ Facile",
    emoji: "🍫",
    description: "Une mousse au chocolat aérienne et intense — seulement 3 ingrédients pour un résultat bluffant.",
    tableauMousse: [
      { nb:  1, chocolat: "33 g",  oeufs: "1",  sucre: "5 g"  },
      { nb:  2, chocolat: "67 g",  oeufs: "2",  sucre: "10 g" },
      { nb:  3, chocolat: "100 g", oeufs: "3",  sucre: "15 g" },
      { nb:  4, chocolat: "133 g", oeufs: "4",  sucre: "20 g" },
      { nb:  5, chocolat: "167 g", oeufs: "5",  sucre: "25 g" },
      { nb:  6, chocolat: "200 g", oeufs: "6",  sucre: "30 g" },
      { nb:  7, chocolat: "233 g", oeufs: "7",  sucre: "35 g" },
      { nb:  8, chocolat: "267 g", oeufs: "8",  sucre: "40 g" },
      { nb:  9, chocolat: "300 g", oeufs: "9",  sucre: "45 g" },
      { nb: 10, chocolat: "333 g", oeufs: "10", sucre: "50 g" },
      { nb: 11, chocolat: "367 g", oeufs: "11", sucre: "55 g" },
      { nb: 12, chocolat: "400 g", oeufs: "12", sucre: "60 g" },
      { nb: 13, chocolat: "433 g", oeufs: "13", sucre: "65 g" },
      { nb: 14, chocolat: "467 g", oeufs: "14", sucre: "70 g" },
      { nb: 15, chocolat: "500 g", oeufs: "15", sucre: "75 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍫", titre: "Faire fondre le chocolat",   detail: "Casser le chocolat en morceaux. Le faire fondre au bain-marie ou au micro-ondes par tranches de 30 secondes. Laisser tiédir.", badge: null },
      { icone: "🥚", titre: "Séparer les œufs",           detail: "Séparer les blancs des jaunes. Incorporer les jaunes un à un au chocolat fondu tiédi en mélangeant rapidement.", badge: null },
      { icone: "🌨️", titre: "Monter les blancs",          detail: "Battre les blancs en neige avec la pincée de sel. Quand ils commencent à être fermes, ajouter le sucre et continuer à battre jusqu'à obtenir des blancs bien fermes.", badge: null },
      { icone: "🥄", titre: "Incorporer délicatement",    detail: "Incorporer un tiers des blancs au chocolat et mélanger vigoureusement pour détendre. Puis ajouter le reste en soulevant délicatement pour ne pas casser les blancs.", badge: null },
      { icone: "❄️", titre: "Réfrigérer",                 detail: "Verser dans des verrines ou un grand plat. Placer au réfrigérateur jusqu'à ce que la mousse soit prise.", badge: "⏱ 2h minimum" },
    ]
  },

  ileflottante: {
    base: 6,
    temps: "40 min",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🏝️",
    description: "Des îles légères de meringue pochée flottant sur une crème anglaise vanillée — le dessert classique des bistrots.",
    tableauIleFlottante: [
      { nb:  1, lait: "8 cl",  jaunesCreme: "1", sucreCreme: "13 g",  blancs: "1", sucreIles: "13 g",  sucreCaramel: "17 g",  vanille: "1" },
      { nb:  2, lait: "17 cl", jaunesCreme: "1", sucreCreme: "27 g",  blancs: "1", sucreIles: "27 g",  sucreCaramel: "33 g",  vanille: "1" },
      { nb:  3, lait: "25 cl", jaunesCreme: "2", sucreCreme: "40 g",  blancs: "2", sucreIles: "40 g",  sucreCaramel: "50 g",  vanille: "1" },
      { nb:  4, lait: "33 cl", jaunesCreme: "3", sucreCreme: "53 g",  blancs: "3", sucreIles: "53 g",  sucreCaramel: "67 g",  vanille: "1" },
      { nb:  5, lait: "42 cl", jaunesCreme: "3", sucreCreme: "67 g",  blancs: "3", sucreIles: "67 g",  sucreCaramel: "83 g",  vanille: "1" },
      { nb:  6, lait: "50 cl", jaunesCreme: "4", sucreCreme: "80 g",  blancs: "4", sucreIles: "80 g",  sucreCaramel: "100 g", vanille: "1" },
      { nb:  7, lait: "58 cl", jaunesCreme: "5", sucreCreme: "93 g",  blancs: "5", sucreIles: "93 g",  sucreCaramel: "117 g", vanille: "1" },
      { nb:  8, lait: "67 cl", jaunesCreme: "5", sucreCreme: "107 g", blancs: "5", sucreIles: "107 g", sucreCaramel: "133 g", vanille: "1" },
      { nb:  9, lait: "75 cl", jaunesCreme: "6", sucreCreme: "120 g", blancs: "6", sucreIles: "120 g", sucreCaramel: "150 g", vanille: "2" },
      { nb: 10, lait: "83 cl", jaunesCreme: "7", sucreCreme: "133 g", blancs: "7", sucreIles: "133 g", sucreCaramel: "167 g", vanille: "2" },
      { nb: 11, lait: "92 cl", jaunesCreme: "7", sucreCreme: "147 g", blancs: "7", sucreIles: "147 g", sucreCaramel: "183 g", vanille: "2" },
      { nb: 12, lait: "100 cl",jaunesCreme: "8", sucreCreme: "160 g", blancs: "8", sucreIles: "160 g", sucreCaramel: "200 g", vanille: "2" },
      { nb: 13, lait: "108 cl", jaunesCreme: "8.7", sucreCreme: "173 g", blancs: "8.7", sucreIles: "173 g", sucreCaramel: "217 g", vanille: "2.2" },
      { nb: 14, lait: "117 cl", jaunesCreme: "9.3", sucreCreme: "187 g", blancs: "9.3", sucreIles: "187 g", sucreCaramel: "233 g", vanille: "2.3" },
      { nb: 15, lait: "125 cl", jaunesCreme: "10", sucreCreme: "200 g", blancs: "10", sucreIles: "200 g", sucreCaramel: "250 g", vanille: "2.5" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Préparer la crème anglaise", detail: "Infuser la vanille dans le lait chaud 10 min. Fouetter les jaunes avec le sucre. Verser le lait chaud progressivement sur les jaunes en fouettant. Remettre sur feu doux en remuant jusqu'à ce que la crème nappe la cuillère (82 °C). Ne pas faire bouillir.", badge: "⏱ 10 min sur feu doux" },
      { icone: "❄️", titre: "Refroidir la crème",         detail: "Passer la crème anglaise au chinois et laisser refroidir. Réfrigérer.", badge: null },
      { icone: "🌨️", titre: "Monter les blancs",          detail: "Battre les blancs en neige ferme. Ajouter le sucre progressivement et continuer à battre jusqu'à obtenir une meringue ferme et brillante.", badge: null },
      { icone: "💧", titre: "Pocher les îles",            detail: "Porter de l'eau à frémissement dans une grande casserole. Former des quenelles de meringue avec 2 cuillères à soupe et les pocher 2 min de chaque côté. Égoutter sur un torchon.", badge: "⏱ 2 min par face" },
      { icone: "🍯", titre: "Faire le caramel",           detail: "Dans une casserole, faire fondre le sucre avec l'eau à feu moyen sans remuer jusqu'à obtenir un caramel doré ambré.", badge: null },
      { icone: "🍽️", titre: "Dresser",                   detail: "Verser la crème anglaise froide dans les assiettes creuses. Déposer une île dessus. Napper de caramel au moment de servir.", badge: null },
    ]
  },

  fondantchocolat: {
    base: 6,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🍫",
    description: "Le fondant au chocolat avec son cœur coulant — moelleux à l'extérieur, liquide à l'intérieur. Prêt en 25 minutes !",
    tableauFondant: [
      { nb: 1,  chocolat: "33 g",  beurre: "20 g",  oeufs: "⅔",  sucre: "17 g",  farine: "7 g"  },
      { nb: 2,  chocolat: "67 g",  beurre: "40 g",  oeufs: "1⅓", sucre: "33 g",  farine: "13 g" },
      { nb: 3,  chocolat: "100 g", beurre: "60 g",  oeufs: "2",  sucre: "50 g",  farine: "20 g" },
      { nb: 4,  chocolat: "133 g", beurre: "80 g",  oeufs: "2⅔", sucre: "67 g",  farine: "27 g" },
      { nb: 5,  chocolat: "167 g", beurre: "100 g", oeufs: "3⅓", sucre: "83 g",  farine: "33 g" },
      { nb: 6,  chocolat: "200 g", beurre: "120 g", oeufs: "4",  sucre: "100 g", farine: "40 g" },
      { nb: 7,  chocolat: "233 g", beurre: "140 g", oeufs: "4⅔", sucre: "117 g", farine: "47 g" },
      { nb: 8,  chocolat: "267 g", beurre: "160 g", oeufs: "5⅓", sucre: "133 g", farine: "53 g" },
      { nb: 9,  chocolat: "300 g", beurre: "180 g", oeufs: "6",  sucre: "150 g", farine: "60 g" },
      { nb: 10, chocolat: "333 g", beurre: "200 g", oeufs: "6⅔", sucre: "167 g", farine: "67 g" },
      { nb: 11, chocolat: "367 g", beurre: "220 g", oeufs: "7.3", sucre: "183 g", farine: "73 g" },
      { nb: 12, chocolat: "400 g", beurre: "240 g", oeufs: "8", sucre: "200 g", farine: "80 g" },
      { nb: 13, chocolat: "433 g", beurre: "260 g", oeufs: "8.7", sucre: "217 g", farine: "87 g" },
      { nb: 14, chocolat: "467 g", beurre: "280 g", oeufs: "9.3", sucre: "233 g", farine: "93 g" },
      { nb: 15, chocolat: "500 g", beurre: "300 g", oeufs: "10", sucre: "250 g", farine: "100 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍫", titre: "Faire fondre chocolat + beurre", detail: "Faire fondre le chocolat et le beurre ensemble au bain-marie ou au micro-ondes. Mélanger jusqu'à obtenir une ganache lisse. Laisser tiédir.", badge: null },
      { icone: "🥚", titre: "Fouetter œufs + sucre",      detail: "Fouetter les œufs entiers avec le sucre jusqu'à ce que le mélange blanchisse et double de volume.", badge: "⏱ 3–4 min au batteur" },
      { icone: "🌾", titre: "Incorporer farine + chocolat",detail: "Ajouter la farine tamisée au mélange œufs-sucre. Puis incorporer le chocolat fondu tiédi. Mélanger délicatement.", badge: null },
      { icone: "🥧", titre: "Remplir et réfrigérer",      detail: "Beurrer et fariner des ramequins individuels. Remplir aux 3/4. Réfrigérer au moins 1h (ou toute une nuit — c'est le secret du cœur coulant !).", badge: "⏱ 1h au frigo minimum" },
      { icone: "🔥", titre: "Cuire et servir",            detail: "Enfourner les ramequins froids dans un four très chaud préchauffé. Sortir dès que les bords sont cuits mais que le centre est encore tremblotant. Démouler et servir immédiatement avec une boule de glace vanille.", badge: "⏱ 11–12 min à 220 °C" },
    ]
  },

  madeleine: {
    base: 12,
    temps: "30 min + repos",
    niveau: "⭐ Facile",
    emoji: "🫐",
    description: "Les vraies madeleines avec leur bosse — légères, moelleuses et parfumées au citron. Le secret : le choc thermique !",
    tableauMadeleine: [
      { nb:  1, farine: "12 g",  sucre: "10 g",  beurre: "12 g",  oeufs: "¼",  levure: "0.4 g" },
      { nb:  2, farine: "25 g",  sucre: "20 g",  beurre: "25 g",  oeufs: "½",  levure: "0.8 g" },
      { nb:  3, farine: "38 g",  sucre: "30 g",  beurre: "38 g",  oeufs: "¾",  levure: "1.3 g" },
      { nb:  4, farine: "50 g",  sucre: "40 g",  beurre: "50 g",  oeufs: "1",  levure: "1.7 g" },
      { nb:  5, farine: "62 g",  sucre: "50 g",  beurre: "62 g",  oeufs: "1¼", levure: "2.1 g" },
      { nb:  6, farine: "75 g",  sucre: "60 g",  beurre: "75 g",  oeufs: "1½", levure: "2.5 g" },
      { nb:  7, farine: "88 g",  sucre: "70 g",  beurre: "88 g",  oeufs: "1¾", levure: "2.9 g" },
      { nb:  8, farine: "100 g", sucre: "80 g",  beurre: "100 g", oeufs: "2",  levure: "3.3 g" },
      { nb:  9, farine: "112 g", sucre: "90 g",  beurre: "112 g", oeufs: "2¼", levure: "3.8 g" },
      { nb: 10, farine: "125 g", sucre: "100 g", beurre: "125 g", oeufs: "2½", levure: "4.2 g" },
      { nb: 11, farine: "138 g", sucre: "110 g", beurre: "138 g", oeufs: "2¾", levure: "4.6 g" },
      { nb: 12, farine: "150 g", sucre: "120 g", beurre: "150 g", oeufs: "3",  levure: "5 g"   },
      { nb: 13, farine: "162 g", sucre: "130 g", beurre: "162 g", oeufs: "3¼", levure: "5.4 g" },
      { nb: 14, farine: "175 g", sucre: "140 g", beurre: "175 g", oeufs: "3½", levure: "5.8 g" },
      { nb: 15, farine: "188 g", sucre: "150 g", beurre: "188 g", oeufs: "3¾", levure: "6.3 g" },
      { nb: 16, farine: "200 g", sucre: "160 g", beurre: "200 g", oeufs: "4",  levure: "6.7 g" },
      { nb: 17, farine: "212 g", sucre: "170 g", beurre: "212 g", oeufs: "4¼", levure: "7.1 g" },
      { nb: 18, farine: "225 g", sucre: "180 g", beurre: "225 g", oeufs: "4½", levure: "7.5 g" },
      { nb: 19, farine: "238 g", sucre: "190 g", beurre: "238 g", oeufs: "4¾", levure: "7.9 g" },
      { nb: 20, farine: "250 g", sucre: "200 g", beurre: "250 g", oeufs: "5",  levure: "8.3 g" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🧈", titre: "Faire fondre le beurre",     detail: "Faire fondre le beurre et le laisser refroidir. Il doit être fondu mais pas chaud.", badge: null },
      { icone: "🥚", titre: "Fouetter œufs + sucre",      detail: "Fouetter les œufs avec le sucre et le miel jusqu'à blanchiment. Ajouter le zeste de citron.", badge: "⏱ 3 min au batteur" },
      { icone: "🌾", titre: "Incorporer farine + levure", detail: "Ajouter la farine tamisée avec la levure. Mélanger. Incorporer le beurre fondu refroidi. La pâte doit être lisse.", badge: null },
      { icone: "❄️", titre: "Repos au frigo",             detail: "Couvrir la pâte et laisser reposer au réfrigérateur. Ce choc thermique est le secret de la bosse !", badge: "⏱ 1h minimum au frigo" },
      { icone: "🔥", titre: "Cuire",                      detail: "Préchauffer le four à 220 °C. Beurrer les moules à madeleines. Remplir aux 3/4. Enfourner et baisser immédiatement à 180 °C. Les madeleines sont prêtes quand la bosse est formée et les bords dorés.", badge: "⏱ 11–13 min" },
    ]
  },

  bananabread: {
    base: 8,
    temps: "15 min + 1h four",
    niveau: "⭐ Facile",
    emoji: "🍌",
    description: "Le banana bread moelleux et parfumé — idéal pour recycler les bananes trop mûres. Un classique américain.",
    tableauBananaBread: [
      { nb:  1, bananes: "0,5", farine: "25 g",  sucre: "12 g",  beurre: "10 g",  oeufs: "¼",  levure: "1 g"  },
      { nb:  2, bananes: "0,5", farine: "50 g",  sucre: "25 g",  beurre: "20 g",  oeufs: "½",  levure: "2 g"  },
      { nb:  3, bananes: "1",   farine: "75 g",  sucre: "37 g",  beurre: "30 g",  oeufs: "¾",  levure: "3 g"  },
      { nb:  4, bananes: "1,5", farine: "100 g", sucre: "50 g",  beurre: "40 g",  oeufs: "1",  levure: "4 g"  },
      { nb:  5, bananes: "2",   farine: "125 g", sucre: "62 g",  beurre: "50 g",  oeufs: "1¼", levure: "5 g"  },
      { nb:  6, bananes: "2",   farine: "150 g", sucre: "75 g",  beurre: "60 g",  oeufs: "1½", levure: "6 g"  },
      { nb:  7, bananes: "2,5", farine: "175 g", sucre: "87 g",  beurre: "70 g",  oeufs: "1¾", levure: "7 g"  },
      { nb:  8, bananes: "3",   farine: "200 g", sucre: "100 g", beurre: "80 g",  oeufs: "2",  levure: "8 g"  },
      { nb:  9, bananes: "3",   farine: "225 g", sucre: "112 g", beurre: "90 g",  oeufs: "2¼", levure: "9 g"  },
      { nb: 10, bananes: "3,5", farine: "250 g", sucre: "125 g", beurre: "100 g", oeufs: "2½", levure: "10 g" },
      { nb: 11, bananes: "4",   farine: "275 g", sucre: "137 g", beurre: "110 g", oeufs: "2¾", levure: "11 g" },
      { nb: 12, bananes: "4,5", farine: "300 g", sucre: "150 g", beurre: "120 g", oeufs: "3",  levure: "12 g" },
      { nb: 13, bananes: "4.9", farine: "325 g", sucre: "162 g", beurre: "130 g", oeufs: "3.2", levure: "13 g" },
      { nb: 14, bananes: "5.2", farine: "350 g", sucre: "175 g", beurre: "140 g", oeufs: "3.5", levure: "14 g" },
      { nb: 15, bananes: "5.6", farine: "375 g", sucre: "188 g", beurre: "150 g", oeufs: "3.8", levure: "15 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍌", titre: "Écraser les bananes",        detail: "Préchauffer le four à 180 °C. Écraser les bananes à la fourchette jusqu'à obtenir une purée. Plus elles sont mûres, plus le gâteau sera sucré et parfumé.", badge: null },
      { icone: "🥚", titre: "Mélanger les liquides",      detail: "Ajouter aux bananes : les œufs battus, le beurre fondu, le lait (ou yaourt) et la vanille. Bien mélanger.", badge: null },
      { icone: "🌾", titre: "Incorporer les secs",        detail: "Ajouter la farine, le sucre, la levure et le sel. Mélanger jusqu'à incorporation. Ne pas trop travailler la pâte. Ajouter les pépites de chocolat si souhaité.", badge: null },
      { icone: "🥧", titre: "Verser dans le moule",       detail: "Verser dans un moule à cake beurré et fariné. Lisser la surface. Décorer éventuellement avec une banane coupée en deux dans le sens de la longueur.", badge: null },
      { icone: "🔥", titre: "Cuire",                      detail: "Enfourner à 180 °C. Le cake est prêt quand un couteau planté au centre ressort propre. Laisser refroidir 10 min avant de démouler.", badge: "⏱ 55–65 min à 180 °C" },
    ]
  },

  granola: {
    base: 8,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🌾",
    description: "Un granola maison croustillant et doré — bien meilleur que celui du commerce et personnalisable à l'infini !",
    tableauGranola: [
      { nb:  1, flocons: "38 g",  miel: "8 ml",   huile: "5 ml",  noix: "13 g",  graines: "6 g"  },
      { nb:  2, flocons: "75 g",  miel: "15 ml",  huile: "10 ml", noix: "25 g",  graines: "13 g" },
      { nb:  3, flocons: "113 g", miel: "23 ml",  huile: "15 ml", noix: "38 g",  graines: "19 g" },
      { nb:  4, flocons: "150 g", miel: "30 ml",  huile: "20 ml", noix: "50 g",  graines: "25 g" },
      { nb:  5, flocons: "188 g", miel: "38 ml",  huile: "25 ml", noix: "63 g",  graines: "31 g" },
      { nb:  6, flocons: "225 g", miel: "45 ml",  huile: "30 ml", noix: "75 g",  graines: "38 g" },
      { nb:  7, flocons: "263 g", miel: "53 ml",  huile: "35 ml", noix: "88 g",  graines: "44 g" },
      { nb:  8, flocons: "300 g", miel: "60 ml",  huile: "40 ml", noix: "100 g", graines: "50 g" },
      { nb:  9, flocons: "338 g", miel: "68 ml",  huile: "45 ml", noix: "113 g", graines: "56 g" },
      { nb: 10, flocons: "375 g", miel: "75 ml",  huile: "50 ml", noix: "125 g", graines: "63 g" },
      { nb: 11, flocons: "413 g", miel: "83 ml",  huile: "55 ml", noix: "138 g", graines: "69 g" },
      { nb: 12, flocons: "450 g", miel: "90 ml",  huile: "60 ml", noix: "150 g", graines: "75 g" },
      { nb: 13, flocons: "488 g", miel: "98 ml", huile: "65 ml", noix: "162 g", graines: "81 g" },
      { nb: 14, flocons: "525 g", miel: "105 ml", huile: "70 ml", noix: "175 g", graines: "88 g" },
      { nb: 15, flocons: "562 g", miel: "112 ml", huile: "75 ml", noix: "188 g", graines: "94 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Préchauffer le four",        detail: "Préchauffer à 160 °C. Recouvrir une plaque de cuisson de papier sulfurisé.", badge: null },
      { icone: "🥣", titre: "Mélanger le tout",           detail: "Dans un grand bol, mélanger les flocons d'avoine, les noix concassées, les graines, la cannelle et le sel. Verser le miel et l'huile de coco fondue. Bien mélanger pour enrober uniformément.", badge: null },
      { icone: "📏", titre: "Étaler sur la plaque",       detail: "Étaler en couche uniforme sur la plaque. Ne pas trop éparpiller pour avoir de beaux clusters.", badge: null },
      { icone: "🌡️", titre: "Cuire en surveillant",      detail: "Enfourner et remuer toutes les 10 min pour une cuisson homogène. Le granola est prêt quand il est doré. Attention, il croquille en refroidissant !", badge: "⏱ 25–30 min à 160 °C" },
      { icone: "🍇", titre: "Ajouter les fruits secs",    detail: "Laisser refroidir complètement sur la plaque SANS remuer (pour former les clusters). Ajouter ensuite les fruits secs et les pépites de chocolat. Conserver dans un bocal hermétique.", badge: "⏱ Conserve 3 semaines" },
    ]
  },

  veloutelegumes: {
    base: 4,
    temps: "35 min",
    niveau: "⭐ Facile",
    emoji: "🥕",
    description: "Un velouté de légumes doux et onctueux — réconfortant en toutes saisons. Ici avec carottes et courge butternut.",
    tableauVeloute: [
      { nb: 1, carottes: "100 g", courge: "100 g", bouillon: "200 ml", creme: "25 ml" },
      { nb: 2, carottes: "200 g", courge: "200 g", bouillon: "400 ml", creme: "50 ml" },
      { nb: 3, carottes: "300 g", courge: "300 g", bouillon: "600 ml", creme: "75 ml" },
      { nb: 4, carottes: "400 g", courge: "400 g", bouillon: "800 ml", creme: "100 ml" },
      { nb: 5, carottes: "500 g", courge: "500 g", bouillon: "1000 ml",creme: "125 ml" },
      { nb: 6, carottes: "600 g", courge: "600 g", bouillon: "1200 ml",creme: "150 ml" },
      { nb:  7, carottes: "700 g", courge: "700 g", bouillon: "1400 ml", creme: "175 ml" },
      { nb:  8, carottes: "800 g", courge: "800 g", bouillon: "1600 ml", creme: "200 ml" },
      { nb:  9, carottes: "900 g", courge: "900 g", bouillon: "1800 ml", creme: "225 ml" },
      { nb: 10, carottes: "1000 g", courge: "1000 g", bouillon: "2000 ml", creme: "250 ml" },
      { nb: 11, carottes: "1100 g", courge: "1100 g", bouillon: "2200 ml", creme: "275 ml" },
      { nb: 12, carottes: "1200 g", courge: "1200 g", bouillon: "2400 ml", creme: "300 ml" },
      { nb: 13, carottes: "1300 g", courge: "1300 g", bouillon: "2600 ml", creme: "325 ml" },
      { nb: 14, carottes: "1400 g", courge: "1400 g", bouillon: "2800 ml", creme: "350 ml" },
      { nb: 15, carottes: "1500 g", courge: "1500 g", bouillon: "3000 ml", creme: "375 ml" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🥕", titre: "Préparer les légumes",       detail: "Éplucher et couper les carottes en rondelles, la courge butternut en cubes, l'oignon en quartiers. Râper le gingembre.", badge: null },
      { icone: "🧈", titre: "Faire revenir",              detail: "Dans une grande casserole, faire fondre le beurre à feu moyen. Faire revenir l'oignon 3–4 min. Ajouter les légumes et le gingembre, faire revenir encore 2 min.", badge: null },
      { icone: "💧", titre: "Cuire",                      detail: "Verser le bouillon chaud. Porter à ébullition puis baisser le feu. Laisser cuire jusqu'à ce que les légumes soient bien tendres.", badge: "⏱ 20 min à feu moyen" },
      { icone: "🌀", titre: "Mixer",                      detail: "Mixer le tout avec un mixeur plongeant jusqu'à obtenir une texture lisse et veloutée. Ajuster la consistance avec un peu de bouillon si nécessaire.", badge: null },
      { icone: "🍦", titre: "Ajouter la crème",           detail: "Incorporer la crème fraîche. Rectifier l'assaisonnement en sel et poivre. Servir chaud avec des croûtons et une touche de crème.", badge: null },
    ]
  },


  overnightoats: {
    base: 1,
    temps: "5 min + nuit repos",
    niveau: "⭐ Facile",
    emoji: "🌾",
    description: "Le petit-déjeuner sain et rapide — flocons d'avoine préparés la veille, à personnaliser avec vos toppings préférés.",
    tableauOvernightOats: [
      { nb:  1, flocons: "45 g",  lait: "180 ml",  yaourt: "50 g",  chia: "1 c.à.c",  miel: "1 c.à.c"  },
      { nb:  2, flocons: "90 g",  lait: "360 ml",  yaourt: "100 g", chia: "2 c.à.c",  miel: "2 c.à.c"  },
      { nb:  3, flocons: "135 g", lait: "540 ml",  yaourt: "150 g", chia: "3 c.à.c",  miel: "3 c.à.c"  },
      { nb:  4, flocons: "180 g", lait: "720 ml",  yaourt: "200 g", chia: "4 c.à.c",  miel: "4 c.à.c"  },
      { nb:  5, flocons: "225 g", lait: "900 ml",  yaourt: "250 g", chia: "5 c.à.c",  miel: "5 c.à.c"  },
      { nb:  6, flocons: "270 g", lait: "1080 ml", yaourt: "300 g", chia: "6 c.à.c",  miel: "6 c.à.c"  },
      { nb:  7, flocons: "315 g", lait: "1260 ml", yaourt: "350 g", chia: "7 c.à.c",  miel: "7 c.à.c"  },
      { nb:  8, flocons: "360 g", lait: "1440 ml", yaourt: "400 g", chia: "8 c.à.c",  miel: "8 c.à.c"  },
      { nb:  9, flocons: "405 g", lait: "1620 ml", yaourt: "450 g", chia: "9 c.à.c",  miel: "9 c.à.c"  },
      { nb: 10, flocons: "450 g", lait: "1800 ml", yaourt: "500 g", chia: "10 c.à.c", miel: "10 c.à.c" },
      { nb: 11, flocons: "495 g", lait: "1980 ml", yaourt: "550 g", chia: "11 c.à.c", miel: "11 c.à.c" },
      { nb: 12, flocons: "540 g", lait: "2160 ml", yaourt: "600 g", chia: "12 c.à.c", miel: "12 c.à.c" },
      { nb: 13, flocons: "585 g", lait: "2340 ml", yaourt: "650 g", chia: "13 c.à.c", miel: "13 c.à.c" },
      { nb: 14, flocons: "630 g", lait: "2520 ml", yaourt: "700 g", chia: "14 c.à.c", miel: "14 c.à.c" },
      { nb: 15, flocons: "675 g", lait: "2700 ml", yaourt: "750 g", chia: "15 c.à.c", miel: "15 c.à.c" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Mélanger dans un pot",    detail: "Dans un pot ou bol, mélanger les flocons d'avoine, les graines de chia, le lait végétal (ou lait normal), le yaourt grec et le miel.", badge: null },
      { icone: "🥄", titre: "Bien mélanger",           detail: "Mélanger jusqu'à ce que tout soit bien incorporé. Les graines de chia vont gonfler et épaissir la préparation.", badge: null },
      { icone: "❄️", titre: "Repos au frigo",          detail: "Couvrir et placer au réfrigérateur. Le lendemain matin, les oats sont prêts !", badge: "⏱ Toute la nuit (min 6h)" },
      { icone: "🎨", titre: "Ajouter les toppings",    detail: "Au moment de servir, ajouter les toppings : fruits frais, fruits secs, granola, beurre d'amande, cacao... Personnaliser selon l'envie !", badge: null },
    ]
  },

  buddhaBowl: {
    base: 2,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🥙",
    description: "Un buddha bowl coloré et équilibré — céréales, légumes rôtis, protéines et sauce tahini. Un repas complet en un bol.",
    tableauBuddhaBowl: [
      { nb:  1, quinoa: "75 g",  patatedouce: "½",  poischiches: "100 g", epinards: "30 g",  avocat: "½",  tahini: "1 c.à.s"  },
      { nb:  2, quinoa: "150 g", patatedouce: "1",  poischiches: "200 g", epinards: "60 g",  avocat: "1",  tahini: "2 c.à.s"  },
      { nb:  3, quinoa: "225 g", patatedouce: "1½", poischiches: "300 g", epinards: "90 g",  avocat: "1½", tahini: "3 c.à.s"  },
      { nb:  4, quinoa: "300 g", patatedouce: "2",  poischiches: "400 g", epinards: "120 g", avocat: "2",  tahini: "4 c.à.s"  },
      { nb:  5, quinoa: "375 g", patatedouce: "2½", poischiches: "500 g", epinards: "150 g", avocat: "2½", tahini: "5 c.à.s"  },
      { nb:  6, quinoa: "450 g", patatedouce: "3",  poischiches: "600 g", epinards: "180 g", avocat: "3",  tahini: "6 c.à.s"  },
      { nb:  7, quinoa: "525 g", patatedouce: "3½", poischiches: "700 g", epinards: "210 g", avocat: "3½", tahini: "7 c.à.s"  },
      { nb:  8, quinoa: "600 g", patatedouce: "4",  poischiches: "800 g", epinards: "240 g", avocat: "4",  tahini: "8 c.à.s"  },
      { nb:  9, quinoa: "675 g", patatedouce: "4½", poischiches: "900 g", epinards: "270 g", avocat: "4½", tahini: "9 c.à.s"  },
      { nb: 10, quinoa: "750 g", patatedouce: "5",  poischiches: "1000 g",epinards: "300 g", avocat: "5",  tahini: "10 c.à.s" },
      { nb: 11, quinoa: "825 g", patatedouce: "5½", poischiches: "1100 g",epinards: "330 g", avocat: "5½", tahini: "11 c.à.s" },
      { nb: 12, quinoa: "900 g", patatedouce: "6",  poischiches: "1200 g",epinards: "360 g", avocat: "6",  tahini: "12 c.à.s" },
      { nb: 13, quinoa: "975 g", patatedouce: "6.5", poischiches: "1300 g", epinards: "390 g", avocat: "6.5", tahini: "13 c.à.s" },
      { nb: 14, quinoa: "1050 g", patatedouce: "7", poischiches: "1400 g", epinards: "420 g", avocat: "7", tahini: "14 c.à.s" },
      { nb: 15, quinoa: "1125 g", patatedouce: "7.5", poischiches: "1500 g", epinards: "450 g", avocat: "7.5", tahini: "15 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Cuire le quinoa",          detail: "Rincer le quinoa. Cuire dans 2x son volume d'eau salée à feu moyen jusqu'à absorption. Égrainer à la fourchette.", badge: "⏱ 15 min" },
      { icone: "🍠", titre: "Rôtir la patate douce",    detail: "Couper la patate douce en cubes. Assaisonner d'huile d'olive, cumin, paprika, sel. Rôtir au four.", badge: "⏱ 20 min à 200°C" },
      { icone: "🫘", titre: "Griller les pois chiches", detail: "Égoutter et sécher les pois chiches. Les faire dorer à la poêle avec huile d'olive et épices jusqu'à ce qu'ils soient croustillants.", badge: "⏱ 8 min" },
      { icone: "🥄", titre: "Préparer la sauce tahini", detail: "Mélanger tahini, jus de citron, ail pressé, eau froide, sel. Fouetter jusqu'à obtenir une sauce crémeuse.", badge: null },
      { icone: "🎨", titre: "Dresser le bowl",          detail: "Disposer quinoa, patate douce, pois chiches, épinards et avocat en tranches dans le bol. Napper de sauce tahini. Ajouter graines de sésame et herbes.", badge: null },
    ]
  },

  soupemiso: {
    base: 2,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🍜",
    description: "La soupe miso japonaise authentique — bouillon umami, tofu soyeux, wakamé et ciboule. Réconfortante et très légère.",
    tableauSoupeMiso: [
      { nb:  1, eau: "500 ml",  miso: "1 c.à.s",  tofu: "75 g",  wakame: "½ c.à.s",  ciboule: "1"  },
      { nb:  2, eau: "1 L",     miso: "2 c.à.s",  tofu: "150 g", wakame: "1 c.à.s",  ciboule: "2"  },
      { nb:  3, eau: "1.5 L",   miso: "3 c.à.s",  tofu: "225 g", wakame: "1½ c.à.s", ciboule: "3"  },
      { nb:  4, eau: "2 L",     miso: "4 c.à.s",  tofu: "300 g", wakame: "2 c.à.s",  ciboule: "4"  },
      { nb:  5, eau: "2.5 L",   miso: "5 c.à.s",  tofu: "375 g", wakame: "2½ c.à.s", ciboule: "5"  },
      { nb:  6, eau: "3 L",     miso: "6 c.à.s",  tofu: "450 g", wakame: "3 c.à.s",  ciboule: "6"  },
      { nb:  7, eau: "3.5 L",   miso: "7 c.à.s",  tofu: "525 g", wakame: "3½ c.à.s", ciboule: "7"  },
      { nb:  8, eau: "4 L",     miso: "8 c.à.s",  tofu: "600 g", wakame: "4 c.à.s",  ciboule: "8"  },
      { nb:  9, eau: "4.5 L",   miso: "9 c.à.s",  tofu: "675 g", wakame: "4½ c.à.s", ciboule: "9"  },
      { nb: 10, eau: "5 L",     miso: "10 c.à.s", tofu: "750 g", wakame: "5 c.à.s",  ciboule: "10" },
      { nb: 11, eau: "5.5 L",   miso: "11 c.à.s", tofu: "825 g", wakame: "5½ c.à.s", ciboule: "11" },
      { nb: 12, eau: "6 L",     miso: "12 c.à.s", tofu: "900 g", wakame: "6 c.à.s",  ciboule: "12" },
      { nb: 13, eau: "6.5 L", miso: "13 c.à.s", tofu: "975 g", wakame: "6.5 c.à.s", ciboule: "13" },
      { nb: 14, eau: "7 L", miso: "14 c.à.s", tofu: "1050 g", wakame: "7 c.à.s", ciboule: "14" },
      { nb: 15, eau: "7.5 L", miso: "15 c.à.s", tofu: "1125 g", wakame: "7.5 c.à.s", ciboule: "15" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "💧", titre: "Préparer le dashi",        detail: "Porter l'eau à frémissement. Ajouter le dashi en poudre (1 c.à.c pour 500ml). Laisser infuser 2 min.", badge: null },
      { icone: "🧊", titre: "Réhydrater le wakamé",     detail: "Plonger le wakamé séché dans un bol d'eau froide 5 min. Il va gonfler. Égoutter.", badge: "⏱ 5 min" },
      { icone: "🧀", titre: "Ajouter le tofu",          detail: "Couper le tofu soyeux en petits cubes. L'ajouter délicatement au bouillon chaud (pas bouillant).", badge: null },
      { icone: "🌿", titre: "Dissoudre le miso",        detail: "Hors du feu ou à feu très doux, prélever une louche de bouillon, y dissoudre la pâte miso. Reverser dans la casserole. Ne jamais faire bouillir le miso — ça détruit les probiotiques !", badge: null },
      { icone: "🍜", titre: "Servir",                   detail: "Ajouter le wakamé et la ciboule émincée. Servir immédiatement dans des bols.", badge: null },
    ]
  },

  wrappoulet: {
    base: 2,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🌯",
    description: "Un wrap au poulet grillé sain et rassasiant — légumes croquants, sauce yaourt et herbes fraîches.",
    tableauWrapPoulet: [
      { nb:  1, poulet: "100 g",  tortilla: "1",  laitue: "¼",  tomate: "½",  yaourt: "2 c.à.s"  },
      { nb:  2, poulet: "200 g",  tortilla: "2",  laitue: "½",  tomate: "1",  yaourt: "4 c.à.s"  },
      { nb:  3, poulet: "300 g",  tortilla: "3",  laitue: "¾",  tomate: "1½", yaourt: "6 c.à.s"  },
      { nb:  4, poulet: "400 g",  tortilla: "4",  laitue: "1",  tomate: "2",  yaourt: "8 c.à.s"  },
      { nb:  5, poulet: "500 g",  tortilla: "5",  laitue: "1",  tomate: "2½", yaourt: "10 c.à.s" },
      { nb:  6, poulet: "600 g",  tortilla: "6",  laitue: "1½", tomate: "3",  yaourt: "12 c.à.s" },
      { nb:  7, poulet: "700 g",  tortilla: "7",  laitue: "1½", tomate: "3½", yaourt: "14 c.à.s" },
      { nb:  8, poulet: "800 g",  tortilla: "8",  laitue: "2",  tomate: "4",  yaourt: "16 c.à.s" },
      { nb:  9, poulet: "900 g",  tortilla: "9",  laitue: "2",  tomate: "4½", yaourt: "18 c.à.s" },
      { nb: 10, poulet: "1000 g", tortilla: "10", laitue: "2½", tomate: "5",  yaourt: "20 c.à.s" },
      { nb: 11, poulet: "1100 g", tortilla: "11", laitue: "2½", tomate: "5½", yaourt: "22 c.à.s" },
      { nb: 12, poulet: "1200 g", tortilla: "12", laitue: "3",  tomate: "6",  yaourt: "24 c.à.s" },
      { nb: 13, poulet: "1300 g", tortilla: "13", laitue: "½", tomate: "6.5", yaourt: "26 c.à.s" },
      { nb: 14, poulet: "1400 g", tortilla: "14", laitue: "½", tomate: "7", yaourt: "28 c.à.s" },
      { nb: 15, poulet: "1500 g", tortilla: "15", laitue: "½", tomate: "7.5", yaourt: "30 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍗", titre: "Mariner et griller le poulet", detail: "Couper le poulet en lanières. Mariner 10 min avec huile d'olive, cumin, paprika, ail, sel. Faire griller à la poêle jusqu'à cuisson complète.", badge: "⏱ 8 min" },
      { icone: "🥣", titre: "Préparer la sauce",        detail: "Mélanger le yaourt grec avec jus de citron, ail pressé, herbes fraîches (coriandre, menthe), sel et poivre.", badge: null },
      { icone: "🥬", titre: "Préparer les légumes",     detail: "Laver et émincer la laitue. Couper la tomate en dés. Préparer avocat ou concombre selon envie.", badge: null },
      { icone: "🌯", titre: "Assembler le wrap",        detail: "Étaler la sauce sur la tortilla. Ajouter laitue, tomate, poulet chaud. Rouler serré en repliant les côtés. Couper en deux en diagonale.", badge: null },
    ]
  },

  energyballs: {
    base: 12,
    temps: "15 min + 30 min frigo",
    niveau: "⭐ Facile",
    emoji: "⚡",
    description: "Des energy balls aux dattes et amandes — sans cuisson, riches en énergie naturelle. Parfaites pour le sport ou le goûter.",
    tableauEnergyBalls: [
      { nb:  1, dattes: "10 g",  amandes: "7 g",   flocons: "5 g",  cacao: "¼ c.à.c", coco: "¼ c.à.s" },
      { nb:  2, dattes: "20 g",  amandes: "15 g",  flocons: "10 g", cacao: "½ c.à.c", coco: "½ c.à.s" },
      { nb:  3, dattes: "30 g",  amandes: "22 g",  flocons: "15 g", cacao: "¾ c.à.c", coco: "¾ c.à.s" },
      { nb:  4, dattes: "40 g",  amandes: "30 g",  flocons: "20 g", cacao: "1 c.à.c",  coco: "1 c.à.s" },
      { nb:  5, dattes: "50 g",  amandes: "37 g",  flocons: "25 g", cacao: "1¼ c.à.c", coco: "1¼ c.à.s"},
      { nb:  6, dattes: "60 g",  amandes: "45 g",  flocons: "30 g", cacao: "1½ c.à.c", coco: "1½ c.à.s"},
      { nb:  7, dattes: "70 g",  amandes: "52 g",  flocons: "35 g", cacao: "1¾ c.à.c", coco: "1¾ c.à.s"},
      { nb:  8, dattes: "80 g",  amandes: "60 g",  flocons: "40 g", cacao: "2 c.à.c",  coco: "2 c.à.s" },
      { nb:  9, dattes: "90 g",  amandes: "67 g",  flocons: "45 g", cacao: "2¼ c.à.c", coco: "2¼ c.à.s"},
      { nb: 10, dattes: "100 g", amandes: "75 g",  flocons: "50 g", cacao: "2½ c.à.c", coco: "2½ c.à.s"},
      { nb: 11, dattes: "110 g", amandes: "82 g",  flocons: "55 g", cacao: "2¾ c.à.c", coco: "2¾ c.à.s"},
      { nb: 12, dattes: "120 g", amandes: "90 g",  flocons: "60 g", cacao: "3 c.à.c",  coco: "3 c.à.s" },
      { nb: 13, dattes: "130 g", amandes: "98 g", flocons: "65 g", cacao: "3.2 c.à.c", coco: "3.2 c.à.s" },
      { nb: 14, dattes: "140 g", amandes: "105 g", flocons: "70 g", cacao: "3.5 c.à.c", coco: "3.5 c.à.s" },
      { nb: 15, dattes: "150 g", amandes: "112 g", flocons: "75 g", cacao: "3.8 c.à.c", coco: "3.8 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌴", titre: "Dénoyauter les dattes",    detail: "Dénoyauter les dattes Medjool. Si elles sont trop sèches, les tremper 10 min dans l'eau chaude puis bien égoutter.", badge: null },
      { icone: "🌀", titre: "Mixer",                    detail: "Placer dattes, amandes, flocons d'avoine et cacao dans un robot. Mixer jusqu'à obtenir une pâte qui se tient. Si trop sèche, ajouter 1 c.à.s d'eau.", badge: null },
      { icone: "⚡", titre: "Former les boules",        detail: "Prendre une petite quantité de pâte (environ 20g) et rouler entre les paumes pour former une boule. Rouler dans la noix de coco râpée, le cacao ou les graines de sésame.", badge: null },
      { icone: "❄️", titre: "Réfrigérer",              detail: "Placer sur une assiette et mettre au réfrigérateur. Se conservent 2 semaines au frigo ou 3 mois au congélateur.", badge: "⏱ 30 min au frigo" },
    ]
  },

  pancakesproteine: {
    base: 2,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "💪",
    description: "Des pancakes protéinés à la banane et à l'œuf — sans farine, sans sucre ajouté. Riches en protéines et très moelleux.",
    tableauPancakesProteine: [
      { nb:  1, banane: "½",  oeufs: "1",  proteine: "10 g", lait: "15 ml" },
      { nb:  2, banane: "1",  oeufs: "2",  proteine: "20 g", lait: "30 ml" },
      { nb:  3, banane: "1½", oeufs: "3",  proteine: "30 g", lait: "45 ml" },
      { nb:  4, banane: "2",  oeufs: "4",  proteine: "40 g", lait: "60 ml" },
      { nb:  5, banane: "2½", oeufs: "5",  proteine: "50 g", lait: "75 ml" },
      { nb:  6, banane: "3",  oeufs: "6",  proteine: "60 g", lait: "90 ml" },
      { nb:  7, banane: "3½", oeufs: "7",  proteine: "70 g", lait: "105 ml"},
      { nb:  8, banane: "4",  oeufs: "8",  proteine: "80 g", lait: "120 ml"},
      { nb:  9, banane: "4½", oeufs: "9",  proteine: "90 g", lait: "135 ml"},
      { nb: 10, banane: "5",  oeufs: "10", proteine: "100 g",lait: "150 ml"},
      { nb: 11, banane: "5½", oeufs: "11", proteine: "110 g",lait: "165 ml"},
      { nb: 12, banane: "6",  oeufs: "12", proteine: "120 g",lait: "180 ml"},
      { nb: 13, banane: "6.5", oeufs: "13", proteine: "130 g", lait: "195 ml" },
      { nb: 14, banane: "7", oeufs: "14", proteine: "140 g", lait: "210 ml" },
      { nb: 15, banane: "7.5", oeufs: "15", proteine: "150 g", lait: "225 ml" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍌", titre: "Écraser les bananes",      detail: "Écraser les bananes très mûres à la fourchette jusqu'à obtenir une purée lisse.", badge: null },
      { icone: "🥚", titre: "Ajouter les œufs",         detail: "Ajouter les œufs battus et la poudre de protéines (optionnelle). Mélanger jusqu'à obtenir une pâte homogène. Ajouter le lait si la pâte est trop épaisse.", badge: null },
      { icone: "🍳", titre: "Cuire",                    detail: "Faire chauffer une poêle antiadhésive à feu moyen-doux sans matière grasse. Verser une petite louche de pâte. Cuire jusqu'à ce que des bulles apparaissent, retourner et cuire 1 min.", badge: "⏱ 2–3 min par face" },
      { icone: "🍓", titre: "Servir",                   detail: "Servir avec fruits frais, miel, beurre d'amande ou yaourt grec.", badge: null },
    ]
  },

  bowlacai: {
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🫐",
    description: "Un bowl açaï épais et onctueux — la base violette aux superfoods brésiliens, garnie de toppings croquants.",
    tableauBowlAcai: [
      { nb:  1, acai: "100 g",  banane: "1",   lait: "50 ml",  granola: "3 c.à.s",  fruits: "1 poignée"  },
      { nb:  2, acai: "200 g",  banane: "2",   lait: "100 ml", granola: "6 c.à.s",  fruits: "2 poignées" },
      { nb:  3, acai: "300 g",  banane: "3",   lait: "150 ml", granola: "9 c.à.s",  fruits: "3 poignées" },
      { nb:  4, acai: "400 g",  banane: "4",   lait: "200 ml", granola: "12 c.à.s", fruits: "4 poignées" },
      { nb:  5, acai: "500 g",  banane: "5",   lait: "250 ml", granola: "15 c.à.s", fruits: "5 poignées" },
      { nb:  6, acai: "600 g",  banane: "6",   lait: "300 ml", granola: "18 c.à.s", fruits: "6 poignées" },
      { nb:  7, acai: "700 g",  banane: "7",   lait: "350 ml", granola: "21 c.à.s", fruits: "7 poignées" },
      { nb:  8, acai: "800 g",  banane: "8",   lait: "400 ml", granola: "24 c.à.s", fruits: "8 poignées" },
      { nb:  9, acai: "900 g",  banane: "9",   lait: "450 ml", granola: "27 c.à.s", fruits: "9 poignées" },
      { nb: 10, acai: "1000 g", banane: "10",  lait: "500 ml", granola: "30 c.à.s", fruits: "10 poignées"},
      { nb: 11, acai: "1100 g", banane: "11",  lait: "550 ml", granola: "33 c.à.s", fruits: "11 poignées"},
      { nb: 12, acai: "1200 g", banane: "12",  lait: "600 ml", granola: "36 c.à.s", fruits: "12 poignées"},
      { nb: 13, acai: "1300 g", banane: "13", lait: "650 ml", granola: "39 c.à.s", fruits: "13 poignée" },
      { nb: 14, acai: "1400 g", banane: "14", lait: "700 ml", granola: "42 c.à.s", fruits: "14 poignée" },
      { nb: 15, acai: "1500 g", banane: "15", lait: "750 ml", granola: "45 c.à.s", fruits: "15 poignée" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🫐", titre: "Préparer la base",         detail: "Sortir la purée d'açaï surgelée 5 min avant. La casser en morceaux et mixer avec la banane congelée et le lait végétal jusqu'à obtenir une texture épaisse comme une glace.", badge: null },
      { icone: "🥄", titre: "Verser dans le bol",       detail: "Verser la base dans un bol. Elle doit être très épaisse — si trop liquide, remettre au congélateur 10 min.", badge: null },
      { icone: "🎨", titre: "Ajouter les toppings",     detail: "Disposer harmonieusement : granola, fruits frais (myrtilles, fraises, banane), noix de coco râpée, graines de chia, filet de miel ou beurre d'amande.", badge: null },
    ]
  },

  saladepoischiches: {
    base: 4,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🫘",
    description: "Une salade de pois chiches fraîche et protéinée — légumes croquants, herbes et vinaigrette citronnée. Parfaite l'été.",
    tableauSaladePoisChiches: [
      { nb:  1, poischiches: "100 g", tomates: "1",  concombre: "¼",  oignon: "¼",  persil: "¼ botte",  citron: "¼" },
      { nb:  2, poischiches: "200 g", tomates: "2",  concombre: "½",  oignon: "½",  persil: "½ botte",  citron: "½" },
      { nb:  3, poischiches: "300 g", tomates: "3",  concombre: "¾",  oignon: "½",  persil: "½ botte",  citron: "1" },
      { nb:  4, poischiches: "400 g", tomates: "4",  concombre: "1",  oignon: "1",  persil: "1 botte",  citron: "1" },
      { nb:  5, poischiches: "500 g", tomates: "5",  concombre: "1",  oignon: "1",  persil: "1 botte",  citron: "1" },
      { nb:  6, poischiches: "600 g", tomates: "6",  concombre: "1½", oignon: "1",  persil: "1 botte",  citron: "2" },
      { nb:  7, poischiches: "700 g", tomates: "7",  concombre: "1½", oignon: "1",  persil: "1½ botte", citron: "2" },
      { nb:  8, poischiches: "800 g", tomates: "8",  concombre: "2",  oignon: "2",  persil: "2 bottes", citron: "2" },
      { nb:  9, poischiches: "900 g", tomates: "9",  concombre: "2",  oignon: "2",  persil: "2 bottes", citron: "2" },
      { nb: 10, poischiches: "1000 g",tomates: "10", concombre: "2½", oignon: "2",  persil: "2 bottes", citron: "3" },
      { nb: 11, poischiches: "1100 g",tomates: "11", concombre: "2½", oignon: "2",  persil: "2½ bottes",citron: "3" },
      { nb: 12, poischiches: "1200 g",tomates: "12", concombre: "3",  oignon: "3",  persil: "3 bottes", citron: "3" },
      { nb: 13, poischiches: "1300 g", tomates: "13", concombre: "3.2", oignon: "3.2", persil: "3.2 botte", citron: "3.2" },
      { nb: 14, poischiches: "1400 g", tomates: "14", concombre: "3.5", oignon: "3.5", persil: "3.5 botte", citron: "3.5" },
      { nb: 15, poischiches: "1500 g", tomates: "15", concombre: "3.8", oignon: "3.8", persil: "3.8 botte", citron: "3.8" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🫘", titre: "Préparer les pois chiches",detail: "Égoutter et rincer les pois chiches en boîte. Les sécher avec du papier absorbant.", badge: null },
      { icone: "🔪", titre: "Couper les légumes",       detail: "Couper les tomates en dés, le concombre épépiné en petits cubes, émincer finement l'oignon rouge. Ciseler le persil.", badge: null },
      { icone: "🥗", titre: "Assembler",                detail: "Mélanger pois chiches, légumes et persil dans un grand saladier.", badge: null },
      { icone: "🍋", titre: "Assaisonner",              detail: "Arroser de jus de citron et d'huile d'olive généreuse. Saler, poivrer. Ajouter cumin et paprika selon goût. Bien mélanger et réfrigérer 15 min avant de servir.", badge: "⏱ 15 min au frais" },
    ]
  },

  gaspacho: {
    base: 4,
    temps: "15 min + 2h frigo",
    niveau: "⭐ Facile",
    emoji: "🍅",
    description: "Le gaspacho andalou glacé — soupe froide de tomates crue, concombre et poivron. Fraîcheur absolue en été.",
    tableauGaspacho: [
      { nb:  1, tomates: "150 g", concombre: "¼",  poivron: "¼",  pain: "1 tr.", ail: "¼ gousse" },
      { nb:  2, tomates: "300 g", concombre: "½",  poivron: "½",  pain: "2 tr.", ail: "½ gousse" },
      { nb:  3, tomates: "450 g", concombre: "¾",  poivron: "½",  pain: "3 tr.", ail: "½ gousse" },
      { nb:  4, tomates: "600 g", concombre: "1",  poivron: "1",  pain: "4 tr.", ail: "1 gousse" },
      { nb:  5, tomates: "750 g", concombre: "1",  poivron: "1",  pain: "5 tr.", ail: "1 gousse" },
      { nb:  6, tomates: "900 g", concombre: "1½", poivron: "1",  pain: "6 tr.", ail: "1 gousse" },
      { nb:  7, tomates: "1050 g",concombre: "1½", poivron: "1½", pain: "7 tr.", ail: "2 gousses" },
      { nb:  8, tomates: "1200 g",concombre: "2",  poivron: "2",  pain: "8 tr.", ail: "2 gousses" },
      { nb:  9, tomates: "1350 g",concombre: "2",  poivron: "2",  pain: "9 tr.", ail: "2 gousses" },
      { nb: 10, tomates: "1500 g",concombre: "2½", poivron: "2",  pain: "10 tr.",ail: "2 gousses" },
      { nb: 11, tomates: "1650 g",concombre: "2½", poivron: "2½", pain: "11 tr.",ail: "3 gousses" },
      { nb: 12, tomates: "1800 g",concombre: "3",  poivron: "3",  pain: "12 tr.",ail: "3 gousses" },
      { nb: 13, tomates: "1950 g", concombre: "3.2", poivron: "3.2", pain: "13 tr.", ail: "3.2 gousse" },
      { nb: 14, tomates: "2100 g", concombre: "3.5", poivron: "3.5", pain: "14 tr.", ail: "3.5 gousse" },
      { nb: 15, tomates: "2250 g", concombre: "3.8", poivron: "3.8", pain: "15 tr.", ail: "3.8 gousse" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🍅", titre: "Préparer les légumes",     detail: "Laver les tomates et les couper en quartiers. Éplucher et épépiner le concombre. Épépiner le poivron rouge. Faire tremper le pain rassis dans l'eau 5 min, essorer.", badge: null },
      { icone: "🌀", titre: "Mixer",                    detail: "Mixer ensemble tomates, concombre, poivron, pain, ail et un filet d'huile d'olive jusqu'à obtenir une soupe lisse.", badge: "⏱ 2 min mixer" },
      { icone: "🧂", titre: "Assaisonner",              detail: "Ajouter vinaigre de Xérès (ou de vin), sel, poivre. Mixer encore. Goûter et ajuster l'assaisonnement.", badge: null },
      { icone: "❄️", titre: "Réfrigérer",              detail: "Placer au réfrigérateur jusqu'à ce que le gaspacho soit bien froid. Servir avec une garniture de dés de légumes et un filet d'huile d'olive.", badge: "⏱ 2h minimum" },
    ]
  },

  curryledumes: {
    base: 4,
    temps: "35 min",
    niveau: "⭐ Facile",
    emoji: "🍛",
    description: "Un curry de légumes crémeux au lait de coco — épicé, parfumé et 100% végétarien. Réconfortant et nourrissant.",
    tableauCurryLegumes: [
      { nb:  1, coco: "100 ml", poischiches: "100 g", tomates: "100 g", epinards: "25 g",  oignon: "¼", ail: "1 gousse",  gingembre: "1 cm", curry: "½ c.à.s" },
      { nb:  2, coco: "200 ml", poischiches: "200 g", tomates: "200 g", epinards: "50 g",  oignon: "½", ail: "1 gousse",  gingembre: "1 cm", curry: "1 c.à.s" },
      { nb:  3, coco: "300 ml", poischiches: "300 g", tomates: "300 g", epinards: "75 g",  oignon: "¾", ail: "2 gousses", gingembre: "2 cm", curry: "1½ c.à.s"},
      { nb:  4, coco: "400 ml", poischiches: "400 g", tomates: "400 g", epinards: "100 g", oignon: "1", ail: "3 gousses", gingembre: "3 cm", curry: "2 c.à.s" },
      { nb:  5, coco: "500 ml", poischiches: "500 g", tomates: "500 g", epinards: "125 g", oignon: "1", ail: "3 gousses", gingembre: "3 cm", curry: "2½ c.à.s"},
      { nb:  6, coco: "600 ml", poischiches: "600 g", tomates: "600 g", epinards: "150 g", oignon: "1", ail: "4 gousses", gingembre: "4 cm", curry: "3 c.à.s" },
      { nb:  7, coco: "700 ml", poischiches: "700 g", tomates: "700 g", epinards: "175 g", oignon: "2", ail: "4 gousses", gingembre: "4 cm", curry: "3½ c.à.s"},
      { nb:  8, coco: "800 ml", poischiches: "800 g", tomates: "800 g", epinards: "200 g", oignon: "2", ail: "5 gousses", gingembre: "5 cm", curry: "4 c.à.s" },
      { nb:  9, coco: "900 ml", poischiches: "900 g", tomates: "900 g", epinards: "225 g", oignon: "2", ail: "5 gousses", gingembre: "5 cm", curry: "4½ c.à.s"},
      { nb: 10, coco: "1 L",    poischiches: "1 kg",  tomates: "1 kg",  epinards: "250 g", oignon: "2", ail: "6 gousses", gingembre: "6 cm", curry: "5 c.à.s" },
      { nb: 11, coco: "1.1 L",  poischiches: "1.1 kg",tomates: "1.1 kg",epinards: "275 g", oignon: "3", ail: "6 gousses", gingembre: "6 cm", curry: "5½ c.à.s"},
      { nb: 12, coco: "1.2 L",  poischiches: "1.2 kg",tomates: "1.2 kg",epinards: "300 g", oignon: "3", ail: "7 gousses", gingembre: "7 cm", curry: "6 c.à.s" },
      { nb: 13, coco: "1.3 L",  poischiches: "1.3 kg",tomates: "1.3 kg",epinards: "325 g", oignon: "3", ail: "7 gousses", gingembre: "7 cm", curry: "6½ c.à.s"},
      { nb: 14, coco: "1.4 L",  poischiches: "1.4 kg",tomates: "1.4 kg",epinards: "350 g", oignon: "3", ail: "8 gousses", gingembre: "8 cm", curry: "7 c.à.s" },
      { nb: 15, coco: "1.5 L",  poischiches: "1.5 kg",tomates: "1.5 kg",epinards: "375 g", oignon: "4", ail: "8 gousses", gingembre: "8 cm", curry: "7½ c.à.s"},
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Faire revenir les aromates",detail: "Faire chauffer un filet d'huile dans une grande poêle. Faire revenir l'oignon émincé 5 min. Ajouter l'ail et le gingembre râpé. Cuire 2 min.", badge: null },
      { icone: "🌶️", titre: "Ajouter les épices",      detail: "Ajouter le curry, le cumin et le curcuma. Torréfier 1 min en remuant pour libérer les arômes.", badge: null },
      { icone: "🍅", titre: "Ajouter les tomates",      detail: "Verser les tomates concassées. Laisser réduire 5 min.", badge: null },
      { icone: "🥥", titre: "Ajouter lait de coco + pois chiches", detail: "Verser le lait de coco et les pois chiches égouttés. Bien mélanger. Laisser mijoter à feu moyen.", badge: "⏱ 15 min" },
      { icone: "🌿", titre: "Ajouter les épinards",     detail: "Ajouter les épinards frais. Laisser 2 min pour les faire fondre. Rectifier l'assaisonnement. Servir avec du riz basmati ou du pain naan.", badge: null },
    ]
  },
  houmous: {
    base: 6,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🫘",
    description: "Un houmous maison crémeux et savoureux — bien meilleur que celui du commerce et prêt en 10 minutes !",
    tableauHoumous: [
      { nb:  1, poischiches: "67 g",  tahini: "½ c.à.s",  citron: "¼", ail: "½ gousse",  huile: "½ c.à.s"  },
      { nb:  2, poischiches: "133 g", tahini: "1 c.à.s",  citron: "½", ail: "1 gousse",  huile: "1 c.à.s"  },
      { nb:  3, poischiches: "200 g", tahini: "1,5 c.à.s",citron: "½", ail: "1 gousse",  huile: "1,5 c.à.s"},
      { nb:  4, poischiches: "267 g", tahini: "2 c.à.s",  citron: "½", ail: "1 gousse",  huile: "2 c.à.s"  },
      { nb:  5, poischiches: "333 g", tahini: "2,5 c.à.s",citron: "1", ail: "1 gousse",  huile: "2,5 c.à.s"},
      { nb:  6, poischiches: "400 g", tahini: "3 c.à.s",  citron: "1", ail: "2 gousses", huile: "3 c.à.s"  },
      { nb:  7, poischiches: "467 g", tahini: "3,5 c.à.s",citron: "1", ail: "2 gousses", huile: "3,5 c.à.s"},
      { nb:  8, poischiches: "533 g", tahini: "4 c.à.s",  citron: "2", ail: "2 gousses", huile: "4 c.à.s"  },
      { nb:  9, poischiches: "600 g", tahini: "4,5 c.à.s",citron: "2", ail: "3 gousses", huile: "4,5 c.à.s"},
      { nb: 10, poischiches: "667 g", tahini: "5 c.à.s",  citron: "2", ail: "3 gousses", huile: "5 c.à.s"  },
      { nb: 11, poischiches: "733 g", tahini: "5,5 c.à.s",citron: "2", ail: "3 gousses", huile: "5,5 c.à.s"},
      { nb: 12, poischiches: "800 g", tahini: "6 c.à.s",  citron: "3", ail: "4 gousses", huile: "6 c.à.s"  },
      { nb: 13, poischiches: "867 g", tahini: "6.5 c.à.s", citron: "2.2", ail: "4.3 gousses", huile: "6.5 c.à.s" },
      { nb: 14, poischiches: "933 g", tahini: "7 c.à.s", citron: "2.3", ail: "4.7 gousses", huile: "7 c.à.s" },
      { nb: 15, poischiches: "1000 g", tahini: "7.5 c.à.s", citron: "2.5", ail: "5 gousses", huile: "7.5 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🫘", titre: "Préparer les pois chiches",  detail: "Égoutter et rincer les pois chiches. Garder un peu d'eau de la boîte. Pour un houmous ultra-lisse, retirer la peau de chaque pois chiche (facultatif mais ça change tout !).", badge: null },
      { icone: "🌀", titre: "Mixer",                      detail: "Placer tous les ingrédients dans le mixeur : pois chiches, tahini, jus de citron, ail, huile d'olive, cumin et sel. Mixer 2 min à puissance maximale.", badge: "⏱ 2 min mixer" },
      { icone: "💧", titre: "Ajuster la texture",         detail: "Ajouter l'eau froide cuillère par cuillère tout en mixant jusqu'à obtenir la consistance souhaitée — lisse et crémeuse. Goûter et ajuster le sel et le citron.", badge: null },
      { icone: "🍽️", titre: "Dresser et servir",         detail: "Verser dans un bol. Creuser un puits au centre avec le dos d'une cuillère. Verser un filet d'huile d'olive, saupoudrer de paprika et de cumin. Servir avec du pain pita, des légumes crus ou des crackers.", badge: null },
    ]
  },
  clafoutis: {
    base: 6,
    temps: "~50 min",
    niveau: "⭐ Facile",
    emoji: "🍒",
    description: "Un clafoutis aux cerises moelleux et parfumé, à déguster tiède ou froid. Recette pour environ 6 personnes.",
    tableauClafoutis: [
      { nb:  1, cerises: "83 g",  oeufs: "⅔",  sucre: "17 g",  farine: "13 g",  lait: "50 ml",  creme: "33 ml"  },
      { nb:  2, cerises: "167 g", oeufs: "1⅓", sucre: "33 g",  farine: "27 g",  lait: "100 ml", creme: "67 ml"  },
      { nb:  3, cerises: "250 g", oeufs: "2",   sucre: "50 g",  farine: "40 g",  lait: "150 ml", creme: "100 ml" },
      { nb:  4, cerises: "333 g", oeufs: "2⅔", sucre: "67 g",  farine: "53 g",  lait: "200 ml", creme: "133 ml" },
      { nb:  5, cerises: "417 g", oeufs: "3⅓", sucre: "83 g",  farine: "67 g",  lait: "250 ml", creme: "167 ml" },
      { nb:  6, cerises: "500 g", oeufs: "4",   sucre: "100 g", farine: "80 g",  lait: "300 ml", creme: "200 ml" },
      { nb:  7, cerises: "583 g", oeufs: "4⅔", sucre: "117 g", farine: "93 g",  lait: "350 ml", creme: "233 ml" },
      { nb:  8, cerises: "667 g", oeufs: "5⅓", sucre: "133 g", farine: "107 g", lait: "400 ml", creme: "267 ml" },
      { nb:  9, cerises: "750 g", oeufs: "6",   sucre: "150 g", farine: "120 g", lait: "450 ml", creme: "300 ml" },
      { nb: 10, cerises: "833 g", oeufs: "6⅔", sucre: "167 g", farine: "133 g", lait: "500 ml", creme: "333 ml" },
      { nb: 11, cerises: "917 g", oeufs: "7⅓", sucre: "183 g", farine: "147 g", lait: "550 ml", creme: "367 ml" },
      { nb: 12, cerises: "1000 g",oeufs: "8",   sucre: "200 g", farine: "160 g", lait: "600 ml", creme: "400 ml" },
      { nb: 13, cerises: "1083 g", oeufs: "8.7", sucre: "217 g", farine: "173 g", lait: "650 ml", creme: "433 ml" },
      { nb: 14, cerises: "1167 g", oeufs: "9.3", sucre: "233 g", farine: "187 g", lait: "700 ml", creme: "467 ml" },
      { nb: 15, cerises: "1250 g", oeufs: "10", sucre: "250 g", farine: "200 g", lait: "750 ml", creme: "500 ml" },
    
    ],
    ingredients: {
      "Cerises (g)": 500,
      "Œufs": 4,
      "Sucre en poudre (g)": 100,
      "Sucre vanillé (sachet)": 1,
      "Farine (g)": 80,
      "Lait (ml)": 300,
      "Crème fraîche (ml)": 200,
      "Sel": 1
    },
    etapes: [
      { icone: "🔥", titre: "Préchauffer le four",        detail: "Préchauffer le four à 180 °C (thermostat 6).", badge: null },
      { icone: "🍒", titre: "Préparer les cerises",       detail: "Laver et équeuter les cerises. Vous pouvez les dénoyauter ou les laisser entières selon votre préférence.", badge: null },
      { icone: "🥧", titre: "Beurrer le moule",           detail: "Beurrer un moule à gratin et disposer les cerises en une seule couche.", badge: null },
      { icone: "🥚", titre: "Préparer la pâte",           detail: "Dans un saladier, fouetter les œufs avec le sucre et le sucre vanillé jusqu'à ce que le mélange blanchisse. Ajouter la farine et la pincée de sel, puis mélanger bien.", badge: null },
      { icone: "🥛", titre: "Incorporer lait + crème",    detail: "Incorporer le lait et la crème fraîche petit à petit en continuant de fouetter pour obtenir une pâte lisse et homogène.", badge: null },
      { icone: "🍮", titre: "Verser la pâte",             detail: "Verser la pâte sur les cerises dans le moule.", badge: null },
      { icone: "🌡️", titre: "Enfourner",                  detail: "Enfourner jusqu'à ce que le clafoutis soit bien doré et ferme au toucher.", badge: "⏱ 35–40 min à 180 °C" },
      { icone: "❄️", titre: "Laisser tiédir",             detail: "Laisser tiédir avant de servir. Le clafoutis peut être dégusté tiède ou froid.", badge: null }
    ]
  },

  pancakes: {
    base: 4,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🥞",
    description: "Des pancakes américains moelleux et gonflés — parfaits pour un petit-déj ou un brunch en famille.",
    tableauPancakes: [
      { nb:  1, farine: "50 g",   sucre: "8 g",   levure: "2 g",  oeufs: "½",  lait: "50 ml",   beurre: "8 g"  },
      { nb:  2, farine: "100 g",  sucre: "15 g",  levure: "4 g",  oeufs: "1",  lait: "100 ml",  beurre: "15 g" },
      { nb:  3, farine: "150 g",  sucre: "22 g",  levure: "6 g",  oeufs: "1½", lait: "150 ml",  beurre: "22 g" },
      { nb:  4, farine: "200 g",  sucre: "30 g",  levure: "8 g",  oeufs: "2",  lait: "200 ml",  beurre: "30 g" },
      { nb:  5, farine: "250 g",  sucre: "38 g",  levure: "10 g", oeufs: "2½", lait: "250 ml",  beurre: "38 g" },
      { nb:  6, farine: "300 g",  sucre: "45 g",  levure: "12 g", oeufs: "3",  lait: "300 ml",  beurre: "45 g" },
      { nb:  7, farine: "350 g",  sucre: "52 g",  levure: "14 g", oeufs: "3½", lait: "350 ml",  beurre: "52 g" },
      { nb:  8, farine: "400 g",  sucre: "60 g",  levure: "16 g", oeufs: "4",  lait: "400 ml",  beurre: "60 g" },
      { nb:  9, farine: "450 g",  sucre: "68 g",  levure: "18 g", oeufs: "4½", lait: "450 ml",  beurre: "68 g" },
      { nb: 10, farine: "500 g",  sucre: "75 g",  levure: "20 g", oeufs: "5",  lait: "500 ml",  beurre: "75 g" },
      { nb: 11, farine: "550 g",  sucre: "82 g",  levure: "22 g", oeufs: "5½", lait: "550 ml",  beurre: "82 g" },
      { nb: 12, farine: "600 g",  sucre: "90 g",  levure: "24 g", oeufs: "6",  lait: "600 ml",  beurre: "90 g" },
      { nb: 13, farine: "650 g",  sucre: "98 g",  levure: "26 g", oeufs: "6½", lait: "650 ml",  beurre: "98 g" },
      { nb: 14, farine: "700 g",  sucre: "105 g", levure: "28 g", oeufs: "7",  lait: "700 ml",  beurre: "105 g" },
      { nb: 15, farine: "750 g",  sucre: "112 g", levure: "30 g", oeufs: "7½", lait: "750 ml",  beurre: "112 g" },
      { nb: 16, farine: "800 g",  sucre: "120 g", levure: "32 g", oeufs: "8",  lait: "800 ml",  beurre: "120 g" },
      { nb: 17, farine: "850 g",  sucre: "128 g", levure: "34 g", oeufs: "8½", lait: "850 ml",  beurre: "128 g" },
      { nb: 18, farine: "900 g",  sucre: "135 g", levure: "36 g", oeufs: "9",  lait: "900 ml",  beurre: "135 g" },
      { nb: 19, farine: "950 g",  sucre: "142 g", levure: "38 g", oeufs: "9½", lait: "950 ml",  beurre: "142 g" },
      { nb: 20, farine: "1000 g", sucre: "150 g", levure: "40 g", oeufs: "10", lait: "1000 ml", beurre: "150 g" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Mélanger les secs",     detail: "Dans un grand bol, mélanger la farine, le sucre, la levure chimique et le sel.", badge: null },
      { icone: "🥛", titre: "Mélanger les liquides", detail: "Dans un autre bol, battre les œufs, ajouter le lait et le beurre fondu. Fouetter jusqu'à ce que ce soit homogène.", badge: null },
      { icone: "🥣", titre: "Incorporer",            detail: "Verser les liquides dans les secs et mélanger juste assez pour incorporer. La pâte doit rester légèrement grumeleuse — ne pas trop mélanger !", badge: null },
      { icone: "🍳", titre: "Cuire",                 detail: "Chauffer une poêle antiadhésive à feu moyen-doux, graisser légèrement. Verser une louche de pâte. Quand des bulles apparaissent en surface, retourner et cuire 1 min de l'autre côté.", badge: "⏱ 2–3 min par face" },
      { icone: "🍁", titre: "Servir",                detail: "Servir chauds avec du sirop d'érable, des fruits frais ou de la chantilly.", badge: null },
    ]
  },

  muffins: {
    base: 12,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🧁",
    description: "Des muffins au chocolat moelleux avec un cœur fondant — prêts en moins de 30 minutes.",
    tableauMuffins: [
      { nb:  1, farine: "21 g",  cacao: "2 g",  sucre: "11 g",  levure: "0.8 g", oeufs: "¼",  lait: "10 ml",  huile: "7 ml",   pepites: "8 g"   },
      { nb:  2, farine: "42 g",  cacao: "5 g",  sucre: "22 g",  levure: "1.7 g", oeufs: "⅓",  lait: "20 ml",  huile: "13 ml",  pepites: "17 g"  },
      { nb:  3, farine: "62 g",  cacao: "8 g",  sucre: "32 g",  levure: "2.5 g", oeufs: "½",  lait: "30 ml",  huile: "20 ml",  pepites: "25 g"  },
      { nb:  4, farine: "83 g",  cacao: "10 g", sucre: "43 g",  levure: "3.3 g", oeufs: "⅔",  lait: "40 ml",  huile: "27 ml",  pepites: "33 g"  },
      { nb:  5, farine: "104 g", cacao: "12 g", sucre: "54 g",  levure: "4.2 g", oeufs: "¾",  lait: "50 ml",  huile: "33 ml",  pepites: "42 g"  },
      { nb:  6, farine: "125 g", cacao: "15 g", sucre: "65 g",  levure: "5 g",   oeufs: "1",  lait: "60 ml",  huile: "40 ml",  pepites: "50 g"  },
      { nb:  7, farine: "146 g", cacao: "18 g", sucre: "76 g",  levure: "5.8 g", oeufs: "1¼", lait: "70 ml",  huile: "47 ml",  pepites: "58 g"  },
      { nb:  8, farine: "167 g", cacao: "20 g", sucre: "87 g",  levure: "6.7 g", oeufs: "1⅓", lait: "80 ml",  huile: "53 ml",  pepites: "67 g"  },
      { nb:  9, farine: "188 g", cacao: "22 g", sucre: "98 g",  levure: "7.5 g", oeufs: "1½", lait: "90 ml",  huile: "60 ml",  pepites: "75 g"  },
      { nb: 10, farine: "208 g", cacao: "25 g", sucre: "108 g", levure: "8.3 g", oeufs: "1⅔", lait: "100 ml", huile: "67 ml",  pepites: "83 g"  },
      { nb: 11, farine: "229 g", cacao: "28 g", sucre: "119 g", levure: "9.2 g", oeufs: "1¾", lait: "110 ml", huile: "73 ml",  pepites: "92 g"  },
      { nb: 12, farine: "250 g", cacao: "30 g", sucre: "130 g", levure: "10 g",  oeufs: "2",  lait: "120 ml", huile: "80 ml",  pepites: "100 g" },
      { nb: 13, farine: "271 g", cacao: "32 g", sucre: "141 g", levure: "10.8 g",oeufs: "2¼", lait: "130 ml", huile: "87 ml",  pepites: "108 g" },
      { nb: 14, farine: "292 g", cacao: "35 g", sucre: "152 g", levure: "11.7 g",oeufs: "2⅓", lait: "140 ml", huile: "93 ml",  pepites: "117 g" },
      { nb: 15, farine: "312 g", cacao: "38 g", sucre: "162 g", levure: "12.5 g",oeufs: "2½", lait: "150 ml", huile: "100 ml", pepites: "125 g" },
      { nb: 16, farine: "333 g", cacao: "40 g", sucre: "173 g", levure: "13.3 g",oeufs: "2⅔", lait: "160 ml", huile: "107 ml", pepites: "133 g" },
      { nb: 17, farine: "354 g", cacao: "42 g", sucre: "184 g", levure: "14.2 g",oeufs: "2¾", lait: "170 ml", huile: "113 ml", pepites: "142 g" },
      { nb: 18, farine: "375 g", cacao: "45 g", sucre: "195 g", levure: "15 g",  oeufs: "3",  lait: "180 ml", huile: "120 ml", pepites: "150 g" },
      { nb: 19, farine: "396 g", cacao: "48 g", sucre: "206 g", levure: "15.8 g",oeufs: "3¼", lait: "190 ml", huile: "127 ml", pepites: "158 g" },
      { nb: 20, farine: "417 g", cacao: "50 g", sucre: "217 g", levure: "16.7 g",oeufs: "3⅓", lait: "200 ml", huile: "133 ml", pepites: "167 g" },
      { nb: 21, farine: "438 g", cacao: "52 g", sucre: "228 g", levure: "17.5 g",oeufs: "3½", lait: "210 ml", huile: "140 ml", pepites: "175 g" },
      { nb: 22, farine: "458 g", cacao: "55 g", sucre: "238 g", levure: "18.3 g",oeufs: "3⅔", lait: "220 ml", huile: "147 ml", pepites: "183 g" },
      { nb: 23, farine: "479 g", cacao: "58 g", sucre: "249 g", levure: "19.2 g",oeufs: "3¾", lait: "230 ml", huile: "153 ml", pepites: "192 g" },
      { nb: 24, farine: "500 g", cacao: "60 g", sucre: "260 g", levure: "20 g",  oeufs: "4",  lait: "240 ml", huile: "160 ml", pepites: "200 g" },
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Préchauffer le four",  detail: "Préchauffer à 180 °C. Préparer un moule à 12 muffins avec des caissettes en papier.", badge: null },
      { icone: "🌾", titre: "Mélanger les secs",   detail: "Dans un grand bol, tamiser la farine, le cacao, le sucre, la levure et le sel. Bien mélanger.", badge: null },
      { icone: "🥚", titre: "Mélanger les liquides",detail: "Dans un autre bol, battre les œufs, ajouter le lait et l'huile. Mélanger.", badge: null },
      { icone: "🥣", titre: "Incorporer",           detail: "Verser les liquides dans les secs. Mélanger juste assez — la pâte doit rester grumeleuse. Ajouter les pépites de chocolat et mélanger délicatement.", badge: null },
      { icone: "🧁", titre: "Remplir et cuire",     detail: "Remplir les caissettes aux 2/3. Enfourner jusqu'à ce que les muffins soient gonflés et qu'un couteau en ressorte propre. Laisser tiédir 5 min avant de démouler.", badge: "⏱ 15–18 min à 180 °C" },
    ]
  },

  croquemonsieur: {
    base: 4,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🥪",
    description: "Le classique des bistrots parisiens — pain de mie gratiné, jambon, gruyère et béchamel onctueuse.",
    tableauCroques: [
      { nb:  1, pain: "2 tr.",  jambon: "1 tr.",  gruyere: "38 g",  beurre: "10 g",  farine: "5 g",  lait: "62 ml",  moutarde: "½ c.à.s" },
      { nb:  2, pain: "4 tr.",  jambon: "2 tr.",  gruyere: "75 g",  beurre: "20 g",  farine: "10 g", lait: "125 ml", moutarde: "1 c.à.s" },
      { nb:  3, pain: "6 tr.",  jambon: "3 tr.",  gruyere: "112 g", beurre: "30 g",  farine: "15 g", lait: "188 ml", moutarde: "1.5 c.à.s" },
      { nb:  4, pain: "8 tr.",  jambon: "4 tr.",  gruyere: "150 g", beurre: "40 g",  farine: "20 g", lait: "250 ml", moutarde: "2 c.à.s" },
      { nb:  5, pain: "10 tr.", jambon: "5 tr.",  gruyere: "188 g", beurre: "50 g",  farine: "25 g", lait: "312 ml", moutarde: "2.5 c.à.s" },
      { nb:  6, pain: "12 tr.", jambon: "6 tr.",  gruyere: "225 g", beurre: "60 g",  farine: "30 g", lait: "375 ml", moutarde: "3 c.à.s" },
      { nb:  7, pain: "14 tr.", jambon: "7 tr.",  gruyere: "262 g", beurre: "70 g",  farine: "35 g", lait: "438 ml", moutarde: "3.5 c.à.s" },
      { nb:  8, pain: "16 tr.", jambon: "8 tr.",  gruyere: "300 g", beurre: "80 g",  farine: "40 g", lait: "500 ml", moutarde: "4 c.à.s" },
      { nb:  9, pain: "18 tr.", jambon: "9 tr.",  gruyere: "338 g", beurre: "90 g",  farine: "45 g", lait: "562 ml", moutarde: "4.5 c.à.s" },
      { nb: 10, pain: "20 tr.", jambon: "10 tr.", gruyere: "375 g", beurre: "100 g", farine: "50 g", lait: "625 ml", moutarde: "5 c.à.s" },
      { nb: 11, pain: "22 tr.", jambon: "11 tr.", gruyere: "412 g", beurre: "110 g", farine: "55 g", lait: "688 ml", moutarde: "5.5 c.à.s" },
      { nb: 12, pain: "24 tr.", jambon: "12 tr.", gruyere: "450 g", beurre: "120 g", farine: "60 g", lait: "750 ml", moutarde: "6 c.à.s" },
      { nb: 13, pain: "26 tr.", jambon: "13 tr.", gruyere: "488 g", beurre: "130 g", farine: "65 g", lait: "812 ml", moutarde: "6.5 c.à.s" },
      { nb: 14, pain: "28 tr.", jambon: "14 tr.", gruyere: "525 g", beurre: "140 g", farine: "70 g", lait: "875 ml", moutarde: "7 c.à.s" },
      { nb: 15, pain: "30 tr.", jambon: "15 tr.", gruyere: "562 g", beurre: "150 g", farine: "75 g", lait: "938 ml", moutarde: "7.5 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Préchauffer le four",    detail: "Préchauffer le four à 200 °C en mode grill.", badge: null },
      { icone: "🥛", titre: "Préparer la béchamel",  detail: "Faire fondre le beurre dans une casserole. Ajouter la farine et remuer 1 min. Verser le lait progressivement en fouettant jusqu'à épaississement. Saler, poivrer, ajouter la muscade.", badge: "⏱ 5 min" },
      { icone: "🍞", titre: "Tartiner le pain",       detail: "Tartiner une face de chaque tranche de pain avec un peu de moutarde et une couche de béchamel.", badge: null },
      { icone: "🥪", titre: "Monter les sandwichs",  detail: "Poser le jambon sur une tranche, ajouter du gruyère râpé, refermer avec l'autre tranche. Étaler de la béchamel sur le dessus et parsemer du gruyère restant.", badge: null },
      { icone: "🌡️", titre: "Gratiner",              detail: "Disposer dans un plat allant au four. Gratiner jusqu'à ce que le fromage soit fondu et doré.", badge: "⏱ 10–12 min" },
    ]
  },

  smoothiebowl: {
    base: 2,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🍓",
    description: "Un bol coloré et énergisant pour bien démarrer la journée — fruits, yaourt et toppings croquants.",
    tableauSmoothie: [
      { nb: 1, fruits: "100 g", banane: "½",  yaourt: "50 g",  lait: "25 ml", miel: "½ c.à.s" },
      { nb: 2, fruits: "200 g", banane: "1",   yaourt: "100 g", lait: "50 ml", miel: "1 c.à.s" },
      { nb: 3, fruits: "300 g", banane: "1½",  yaourt: "150 g", lait: "75 ml", miel: "1.5 c.à.s" },
      { nb: 4, fruits: "400 g", banane: "2",   yaourt: "200 g", lait: "100 ml",miel: "2 c.à.s" },
      { nb: 5, fruits: "500 g", banane: "2½",  yaourt: "250 g", lait: "125 ml",miel: "2.5 c.à.s" },
      { nb: 6, fruits: "600 g", banane: "3",   yaourt: "300 g", lait: "150 ml",miel: "3 c.à.s" },
      { nb:  7, fruits: "700 g", banane: "3.5", yaourt: "350 g", lait: "175 ml", miel: "3.5 c.à.s" },
      { nb:  8, fruits: "800 g", banane: "4", yaourt: "400 g", lait: "200 ml", miel: "4 c.à.s" },
      { nb:  9, fruits: "900 g", banane: "4.5", yaourt: "450 g", lait: "225 ml", miel: "4.5 c.à.s" },
      { nb: 10, fruits: "1000 g", banane: "5", yaourt: "500 g", lait: "250 ml", miel: "5 c.à.s" },
      { nb: 11, fruits: "1100 g", banane: "5.5", yaourt: "550 g", lait: "275 ml", miel: "5.5 c.à.s" },
      { nb: 12, fruits: "1200 g", banane: "6", yaourt: "600 g", lait: "300 ml", miel: "6 c.à.s" },
      { nb: 13, fruits: "1300 g", banane: "6.5", yaourt: "650 g", lait: "325 ml", miel: "6.5 c.à.s" },
      { nb: 14, fruits: "1400 g", banane: "7", yaourt: "700 g", lait: "350 ml", miel: "7 c.à.s" },
      { nb: 15, fruits: "1500 g", banane: "7.5", yaourt: "750 g", lait: "375 ml", miel: "7.5 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Préparer les fruits",  detail: "Utiliser des fruits rouges et une banane congelés — ils donnent une texture épaisse et crémeuse, comme une glace.", badge: null },
      { icone: "🌀", titre: "Mixer la base",        detail: "Mixer les fruits congelés avec le yaourt grec, le lait végétal et le miel jusqu'à obtenir une texture lisse et épaisse. Ajouter le lait au fur et à mesure pour ajuster la consistance.", badge: null },
      { icone: "🥣", titre: "Verser dans un bol",  detail: "Verser le smoothie dans un bol. Il doit être assez épais pour que les toppings ne coulent pas.", badge: null },
      { icone: "🎨", titre: "Disposer les toppings",detail: "Disposer joliment les fruits frais, le granola, les graines de chia et la noix de coco sur le dessus. Déguster immédiatement !", badge: null },
    ]
  },

  saladequinoa: {
    base: 4,
    temps: "25 min",
    niveau: "⭐ Facile",
    emoji: "🥗",
    description: "Une salade de quinoa fraîche et complète — protéines végétales, légumes croquants et vinaigrette citronnée.",
    tableauQuinoa: [
      { nb: 1, quinoa: "50 g",  tomates: "3",  feta: "25 g",  concombre: "¼",  poivron: "½", huile: "1 c.à.s",   citron: "½" },
      { nb: 2, quinoa: "100 g", tomates: "6",  feta: "50 g",  concombre: "½",  poivron: "½", huile: "1.5 c.à.s", citron: "½" },
      { nb: 3, quinoa: "150 g", tomates: "9",  feta: "75 g",  concombre: "½",  poivron: "1", huile: "2 c.à.s",   citron: "1" },
      { nb: 4, quinoa: "200 g", tomates: "12", feta: "100 g", concombre: "½",  poivron: "1", huile: "3 c.à.s",   citron: "1" },
      { nb: 5, quinoa: "250 g", tomates: "15", feta: "125 g", concombre: "1",  poivron: "1", huile: "4 c.à.s",   citron: "1" },
      { nb: 6, quinoa: "300 g", tomates: "18", feta: "150 g", concombre: "1",  poivron: "2", huile: "4.5 c.à.s", citron: "2" },
      { nb: 7, quinoa: "350 g", tomates: "21", feta: "175 g", concombre: "1",  poivron: "2", huile: "5 c.à.s",   citron: "2" },
      { nb: 8, quinoa: "400 g", tomates: "24", feta: "200 g", concombre: "1",  poivron: "2", huile: "6 c.à.s",   citron: "2" },
      { nb:  9, quinoa: "450 g", tomates: "27", feta: "225 g", concombre: "½", poivron: "2.2", huile: "6.8 c.à.s", citron: "2.2" },
      { nb: 10, quinoa: "500 g", tomates: "30", feta: "250 g", concombre: "½", poivron: "2.5", huile: "7.5 c.à.s", citron: "2.5" },
      { nb: 11, quinoa: "550 g", tomates: "33", feta: "275 g", concombre: "½", poivron: "2.8", huile: "8.2 c.à.s", citron: "2.8" },
      { nb: 12, quinoa: "600 g", tomates: "36", feta: "300 g", concombre: "½", poivron: "3", huile: "9 c.à.s", citron: "3" },
      { nb: 13, quinoa: "650 g", tomates: "39", feta: "325 g", concombre: "½", poivron: "3.2", huile: "9.8 c.à.s", citron: "3.2" },
      { nb: 14, quinoa: "700 g", tomates: "42", feta: "350 g", concombre: "½", poivron: "3.5", huile: "10 c.à.s", citron: "3.5" },
      { nb: 15, quinoa: "750 g", tomates: "45", feta: "375 g", concombre: "½", poivron: "3.8", huile: "11 c.à.s", citron: "3.8" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Cuire le quinoa",       detail: "Rincer le quinoa à l'eau froide. Le cuire dans 2 fois son volume d'eau salée à feu moyen jusqu'à absorption complète. Laisser reposer 5 min, puis égrainer à la fourchette.", badge: "⏱ 15 min" },
      { icone: "❄️", titre: "Refroidir",             detail: "Laisser le quinoa refroidir complètement — il ne doit pas être chaud pour ne pas faire fondre la feta.", badge: "⏱ 10 min" },
      { icone: "🔪", titre: "Préparer les légumes",  detail: "Couper les tomates cerises en deux, le concombre en dés, le poivron en petits morceaux. Ciseler la menthe et le persil.", badge: null },
      { icone: "🍋", titre: "Préparer la vinaigrette",detail: "Mélanger le jus du citron avec l'huile d'olive, du sel et du poivre. Bien fouetter.", badge: null },
      { icone: "🥗", titre: "Assembler",             detail: "Mélanger le quinoa refroidi avec les légumes. Verser la vinaigrette et mélanger. Émietter la feta par-dessus. Servir frais.", badge: null },
    ]
  },

  yaourt: {
    base: 8,
    temps: "10 min + 8h repos",
    niveau: "⭐ Facile",
    emoji: "🥛",
    description: "Des yaourts maison crémeux et naturels — seulement 2 ingrédients, sans yaourtière !",
    tableauYaourt: [
      { nb: 1, lait: "125 ml", ferment: "1 c. à soupe de yaourt" },
      { nb: 2, lait: "250 ml", ferment: "1 c. à soupe de yaourt" },
      { nb: 3, lait: "375 ml", ferment: "1 c. à soupe de yaourt" },
      { nb: 4, lait: "500 ml", ferment: "1 c. à soupe de yaourt" },
      { nb: 5, lait: "625 ml", ferment: "1 c. à soupe de yaourt" },
      { nb: 6, lait: "750 ml", ferment: "1 c. à soupe de yaourt" },
      { nb:  7, lait: "875 ml", ferment: "1.2 c. à soupe de yaourt" },
      { nb:  8, lait: "1000 ml", ferment: "1.3 c. à soupe de yaourt" },
      { nb:  9, lait: "1125 ml", ferment: "1.5 c. à soupe de yaourt" },
      { nb: 10, lait: "1250 ml", ferment: "1.7 c. à soupe de yaourt" },
      { nb: 11, lait: "1375 ml", ferment: "1.8 c. à soupe de yaourt" },
      { nb: 12, lait: "1500 ml", ferment: "2 c. à soupe de yaourt" },
      { nb: 13, lait: "1625 ml", ferment: "2.2 c. à soupe de yaourt" },
      { nb: 14, lait: "1750 ml", ferment: "2.3 c. à soupe de yaourt" },
      { nb: 15, lait: "1875 ml", ferment: "2.5 c. à soupe de yaourt" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌡️", titre: "Chauffer le lait",       detail: "Faire chauffer le lait à 45 °C (tiède, pas bouillant — supporter le doigt dedans 10 secondes). Si vous utilisez du lait UHT il n'est pas nécessaire de le chauffer.", badge: null },
      { icone: "🥣", titre: "Ajouter le ferment",     detail: "Délayer le yaourt (ou les ferments) dans un peu de lait tiède, puis mélanger avec le reste du lait. Fouetter doucement.", badge: null },
      { icone: "🫙", titre: "Remplir les pots",       detail: "Verser dans des pots en verre propres. Ne pas remuer une fois les pots remplis.", badge: null },
      { icone: "⏳", titre: "Laisser fermenter",      detail: "Placer les pots dans un four éteint avec la lumière allumée (ou dans une yaourtière) pour maintenir une température de 40–45 °C.", badge: "⏱ 8h minimum" },
      { icone: "❄️", titre: "Réfrigérer",             detail: "Une fois la texture prise, placer au réfrigérateur au moins 2h avant de déguster. Se conservent 1 semaine.", badge: "⏱ 2h au frigo" },
    ]
  },

  tartecitron: {
    base: 6,
    temps: "1h30 + repos",
    niveau: "⭐⭐ Intermédiaire",
    emoji: "🍋",
    description: "La tarte au citron meringuée classique — pâte sablée croustillante, crème citron onctueuse et meringue dorée.",
    tableauTarteCitron: [
      { nb:  1, farine: "33 g",  beurrePate: "17 g",  sucreGlace: "13 g",  poudreAmande: "5 g",  oeufPate: "⅙",  citrons: "½",  oeufCreme: "½",  sucreCreme: "25 g",  beurreCreme: "17 g",  maizena: "3 g",  blancs: "½",  sucreMeringue: "20 g"  },
      { nb:  2, farine: "67 g",  beurrePate: "33 g",  sucreGlace: "27 g",  poudreAmande: "10 g", oeufPate: "⅓",  citrons: "1",  oeufCreme: "1",  sucreCreme: "50 g",  beurreCreme: "33 g",  maizena: "7 g",  blancs: "1",  sucreMeringue: "40 g"  },
      { nb:  3, farine: "100 g", beurrePate: "50 g",  sucreGlace: "40 g",  poudreAmande: "15 g", oeufPate: "½",  citrons: "1½", oeufCreme: "1½", sucreCreme: "75 g",  beurreCreme: "50 g",  maizena: "10 g", blancs: "1½", sucreMeringue: "60 g"  },
      { nb:  4, farine: "133 g", beurrePate: "67 g",  sucreGlace: "53 g",  poudreAmande: "20 g", oeufPate: "⅔",  citrons: "2",  oeufCreme: "2",  sucreCreme: "100 g", beurreCreme: "67 g",  maizena: "13 g", blancs: "2",  sucreMeringue: "80 g"  },
      { nb:  5, farine: "167 g", beurrePate: "83 g",  sucreGlace: "67 g",  poudreAmande: "25 g", oeufPate: "¾",  citrons: "2½", oeufCreme: "2½", sucreCreme: "125 g", beurreCreme: "83 g",  maizena: "17 g", blancs: "2½", sucreMeringue: "100 g" },
      { nb:  6, farine: "200 g", beurrePate: "100 g", sucreGlace: "80 g",  poudreAmande: "30 g", oeufPate: "1",  citrons: "3",  oeufCreme: "3",  sucreCreme: "150 g", beurreCreme: "100 g", maizena: "20 g", blancs: "3",  sucreMeringue: "120 g" },
      { nb:  7, farine: "233 g", beurrePate: "117 g", sucreGlace: "93 g",  poudreAmande: "35 g", oeufPate: "1⅙", citrons: "3½", oeufCreme: "3½", sucreCreme: "175 g", beurreCreme: "117 g", maizena: "23 g", blancs: "3½", sucreMeringue: "140 g" },
      { nb:  8, farine: "267 g", beurrePate: "133 g", sucreGlace: "107 g", poudreAmande: "40 g", oeufPate: "1⅓", citrons: "4",  oeufCreme: "4",  sucreCreme: "200 g", beurreCreme: "133 g", maizena: "27 g", blancs: "4",  sucreMeringue: "160 g" },
      { nb:  9, farine: "300 g", beurrePate: "150 g", sucreGlace: "120 g", poudreAmande: "45 g", oeufPate: "1½", citrons: "4½", oeufCreme: "4½", sucreCreme: "225 g", beurreCreme: "150 g", maizena: "30 g", blancs: "4½", sucreMeringue: "180 g" },
      { nb: 10, farine: "333 g", beurrePate: "167 g", sucreGlace: "133 g", poudreAmande: "50 g", oeufPate: "1⅔", citrons: "5",  oeufCreme: "5",  sucreCreme: "250 g", beurreCreme: "167 g", maizena: "33 g", blancs: "5",  sucreMeringue: "200 g" },
      { nb: 11, farine: "367 g", beurrePate: "183 g", sucreGlace: "147 g", poudreAmande: "55 g", oeufPate: "1.8", citrons: "5.5", oeufCreme: "5.5", sucreCreme: "275 g", beurreCreme: "183 g", maizena: "37 g", blancs: "5.5", sucreMeringue: "220 g" },
      { nb: 12, farine: "400 g", beurrePate: "200 g", sucreGlace: "160 g", poudreAmande: "60 g", oeufPate: "2", citrons: "6", oeufCreme: "6", sucreCreme: "300 g", beurreCreme: "200 g", maizena: "40 g", blancs: "6", sucreMeringue: "240 g" },
      { nb: 13, farine: "433 g", beurrePate: "217 g", sucreGlace: "173 g", poudreAmande: "65 g", oeufPate: "2.2", citrons: "6.5", oeufCreme: "6.5", sucreCreme: "325 g", beurreCreme: "217 g", maizena: "43 g", blancs: "6.5", sucreMeringue: "260 g" },
      { nb: 14, farine: "467 g", beurrePate: "233 g", sucreGlace: "187 g", poudreAmande: "70 g", oeufPate: "2.3", citrons: "7", oeufCreme: "7", sucreCreme: "350 g", beurreCreme: "233 g", maizena: "47 g", blancs: "7", sucreMeringue: "280 g" },
      { nb: 15, farine: "500 g", beurrePate: "250 g", sucreGlace: "200 g", poudreAmande: "75 g", oeufPate: "2.5", citrons: "7.5", oeufCreme: "7.5", sucreCreme: "375 g", beurreCreme: "250 g", maizena: "50 g", blancs: "7.5", sucreMeringue: "300 g" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Préparer la pâte sablée",   detail: "Mélanger farine, sucre glace, poudre d'amande et sel. Ajouter le beurre froid en morceaux et sabler du bout des doigts. Incorporer l'œuf et pétrir sans trop travailler. Former une boule, filmer et réfrigérer.", badge: "⏱ 1h au frais" },
      { icone: "🥧", titre: "Foncer et cuire à blanc",   detail: "Étaler la pâte et foncer les moules à tartelettes. Piquer le fond avec une fourchette. Couvrir de papier cuisson et de billes de cuisson. Enfourner à 180 °C. Retirer les billes et cuire encore 5 min jusqu'à dorure.", badge: "⏱ 15–20 min à 180 °C" },
      { icone: "🍋", titre: "Préparer la crème citron",  detail: "Zester et presser les citrons. Dans une casserole, fouetter les œufs avec le sucre et la maïzena. Ajouter le jus et les zestes. Cuire à feu moyen en remuant constamment jusqu'à épaississement.", badge: "⏱ 8–10 min" },
      { icone: "🧈", titre: "Ajouter le beurre",         detail: "Hors du feu, incorporer le beurre froid en morceaux en fouettant. La crème doit être lisse et brillante. Verser sur les fonds de tarte cuits. Laisser refroidir.", badge: "⏱ 1h au frais minimum" },
      { icone: "🌨️", titre: "Préparer la meringue",     detail: "Battre les blancs en neige ferme. Ajouter le sucre progressivement tout en continuant de battre jusqu'à obtenir une meringue brillante et ferme.", badge: null },
      { icone: "🔥", titre: "Dorer la meringue",         detail: "Pocher ou étaler la meringue sur les tartelettes. Dorer au chalumeau ou 2–3 min sous le gril du four en surveillant. Servir frais.", badge: "⏱ 2–3 min gril ou chalumeau" },
    ]
  },

  tarteaupommes: {
    base: 6,
    temps: "~1h",
    niveau: "⭐ Facile",
    emoji: "🍎",
    description: "La tarte aux pommes classique — pâte brisée croustillante, compote maison et fines lamelles de pommes dorées.",
    tableauTartePommes: [
      { nb:  1, pommes: "1",  beurre: "8 g",  sucre: "8 g",  eau: "8 ml",  confiture: "½ c.à.s" },
      { nb:  2, pommes: "2",  beurre: "17 g", sucre: "17 g", eau: "17 ml", confiture: "1 c.à.s"  },
      { nb:  3, pommes: "3",  beurre: "25 g", sucre: "25 g", eau: "25 ml", confiture: "1,5 c.à.s"},
      { nb:  4, pommes: "4",  beurre: "33 g", sucre: "33 g", eau: "33 ml", confiture: "2 c.à.s"  },
      { nb:  5, pommes: "5",  beurre: "42 g", sucre: "42 g", eau: "42 ml", confiture: "2,5 c.à.s"},
      { nb:  6, pommes: "6",  beurre: "50 g", sucre: "50 g", eau: "50 ml", confiture: "3 c.à.s"  },
      { nb:  7, pommes: "7",  beurre: "58 g", sucre: "58 g", eau: "58 ml", confiture: "3,5 c.à.s"},
      { nb:  8, pommes: "8",  beurre: "67 g", sucre: "67 g", eau: "67 ml", confiture: "4 c.à.s"  },
      { nb:  9, pommes: "9",  beurre: "75 g", sucre: "75 g", eau: "75 ml", confiture: "4,5 c.à.s"},
      { nb: 10, pommes: "10", beurre: "83 g", sucre: "83 g", eau: "83 ml", confiture: "5 c.à.s"  },
      { nb: 11, pommes: "11", beurre: "92 g", sucre: "92 g", eau: "92 ml", confiture: "5,5 c.à.s"},
      { nb: 12, pommes: "12", beurre: "100 g",sucre: "100 g",eau: "100 ml",confiture: "6 c.à.s"  },
      { nb: 13, pommes: "13", beurre: "108 g", sucre: "108 g", eau: "108 ml", confiture: "6.5 c.à.s" },
      { nb: 14, pommes: "14", beurre: "117 g", sucre: "117 g", eau: "117 ml", confiture: "7 c.à.s" },
      { nb: 15, pommes: "15", beurre: "125 g", sucre: "125 g", eau: "125 ml", confiture: "7.5 c.à.s" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Préchauffer le four",         detail: "Préchauffer le four à 200 °C. Beurrer un moule à tarte.", badge: null },
      { icone: "🥧", titre: "Foncer le moule",             detail: "Étaler la pâte brisée dans le moule. Piquer le fond avec une fourchette. Mettre au réfrigérateur le temps de préparer les pommes.", badge: "⏱ 20 min au frais" },
      { icone: "🍎", titre: "Préparer la compote",         detail: "Éplucher et couper 3 pommes en morceaux. Les cuire à feu doux avec le beurre, 50 g de sucre, le jus de citron et l'eau jusqu'à obtenir une compote. Écraser grossièrement.", badge: "⏱ 10–15 min" },
      { icone: "🔪", titre: "Préparer les pommes du dessus", detail: "Éplucher les 3 pommes restantes, les couper en fines lamelles régulières d'environ 3 mm. Arroser d'un peu de jus de citron pour éviter l'oxydation.", badge: null },
      { icone: "🏗️", titre: "Monter la tarte",            detail: "Étaler la compote sur le fond de tarte. Disposer les lamelles de pommes en rosace ou en éventail par-dessus, en les faisant se chevaucher légèrement.", badge: null },
      { icone: "🍬", titre: "Sucrer et enfourner",         detail: "Saupoudrer de 2 c. à soupe de sucre (et éventuellement de cannelle). Enfourner à 200 °C.", badge: "⏱ 30–35 min" },
      { icone: "🍑", titre: "Nappage abricot",             detail: "Sortir la tarte du four. Faire chauffer la confiture d'abricot avec un peu d'eau et badigeonner la tarte encore chaude pour la faire briller.", badge: null },
      { icone: "❄️", titre: "Servir",                      detail: "Laisser tiédir avant de servir. Délicieuse tiède avec une boule de glace vanille ou de la crème fraîche !", badge: null },
    ]
  },

  tiramisu: {
    base: 6,
    temps: "25 min + 12h repos",
    niveau: "⭐ Facile",
    emoji: "☕",
    description: "Le vrai tiramisu italien — mascarpone crémeux, café, biscuits. À préparer la veille pour un résultat parfait.",
    tableauTiramisu: [
      { nb:  1, biscuits: "4",  mascarpone: "83 g",   oeufs: "⅔",  sucre: "17 g",  cafe: "3 cl"  },
      { nb:  2, biscuits: "8",  mascarpone: "167 g",  oeufs: "1⅓", sucre: "33 g",  cafe: "7 cl"  },
      { nb:  3, biscuits: "12", mascarpone: "250 g",  oeufs: "2",   sucre: "50 g",  cafe: "10 cl" },
      { nb:  4, biscuits: "16", mascarpone: "333 g",  oeufs: "2⅔", sucre: "67 g",  cafe: "13 cl" },
      { nb:  5, biscuits: "20", mascarpone: "417 g",  oeufs: "3⅓", sucre: "83 g",  cafe: "17 cl" },
      { nb:  6, biscuits: "24", mascarpone: "500 g",  oeufs: "4",   sucre: "100 g", cafe: "20 cl" },
      { nb:  7, biscuits: "28", mascarpone: "583 g",  oeufs: "4⅔", sucre: "117 g", cafe: "23 cl" },
      { nb:  8, biscuits: "32", mascarpone: "667 g",  oeufs: "5⅓", sucre: "133 g", cafe: "27 cl" },
      { nb:  9, biscuits: "36", mascarpone: "750 g",  oeufs: "6",   sucre: "150 g", cafe: "30 cl" },
      { nb: 10, biscuits: "40", mascarpone: "833 g",  oeufs: "6⅔", sucre: "167 g", cafe: "33 cl" },
      { nb: 11, biscuits: "44", mascarpone: "917 g",  oeufs: "7⅓", sucre: "183 g", cafe: "37 cl" },
      { nb: 12, biscuits: "48", mascarpone: "1000 g", oeufs: "8",   sucre: "200 g", cafe: "40 cl" },
      { nb: 13, biscuits: "52", mascarpone: "1083 g", oeufs: "8.7", sucre: "217 g", cafe: "43 cl" },
      { nb: 14, biscuits: "56", mascarpone: "1167 g", oeufs: "9.3", sucre: "233 g", cafe: "47 cl" },
      { nb: 15, biscuits: "60", mascarpone: "1250 g", oeufs: "10", sucre: "250 g", cafe: "50 cl" },
    
    ],
    ingredients: {},
    etapes: [
      { icone: "☕", titre: "Préparer le café",           detail: "Faire le café expresso et le laisser refroidir dans une assiette creuse. Ajouter le Marsala ou l'amaretto si souhaité.", badge: null },
      { icone: "🥚", titre: "Séparer les oeufs",          detail: "Séparer les blancs des jaunes. Sortir le mascarpone du frigo 15 min avant pour le ramollir.", badge: null },
      { icone: "🌟", titre: "Fouetter jaunes + sucre",    detail: "Fouetter vivement les jaunes avec le sucre au batteur pendant 5 min. Le mélange doit blanchir, mousser et doubler de volume.", badge: "⏱ 5 min au batteur" },
      { icone: "🧀", titre: "Incorporer le mascarpone",   detail: "Ajouter le mascarpone en plusieurs fois en fouettant délicatement pour obtenir une crème lisse et homogène.", badge: null },
      { icone: "🌨️", titre: "Monter les blancs en neige", detail: "Battre les blancs en neige ferme avec une pincée de sel. Les incorporer délicatement à la crème mascarpone en soulevant pour ne pas les casser.", badge: null },
      { icone: "🍪", titre: "Tremper les biscuits",       detail: "Tremper rapidement les biscuits à la cuillère dans le café froid (aller-retour rapide, pas trop longtemps). Les disposer en couche au fond du plat.", badge: null },
      { icone: "🏗️", titre: "Monter le tiramisu",        detail: "Verser la moitié de la crème mascarpone sur les biscuits. Ajouter une deuxième couche de biscuits imbibés, puis le reste de la crème. Lisser la surface.", badge: null },
      { icone: "🍫", titre: "Cacao + repos",              detail: "Saupoudrer généreusement de cacao en poudre amer. Filmer et placer au réfrigérateur.", badge: "⏱ Minimum 6h — idéalement une nuit" },
    ]
  },

  flan: {
    base: 6,
    temps: "~1h + refroidissement",
    niveau: "⭐ Facile",
    emoji: "🍮",
    description: "Flan pâtissier crémeux sur pâte feuilletée. Recette pour environ 6 personnes.",
    tableauFlan: [
      { nb:  1, lait: "117 ml", jaunes: "18 g",  sucre: "27 g",  maizena: "12 g", creme: "50 ml"  },
      { nb:  2, lait: "233 ml", jaunes: "37 g",  sucre: "53 g",  maizena: "23 g", creme: "100 ml" },
      { nb:  3, lait: "350 ml", jaunes: "55 g",  sucre: "80 g",  maizena: "35 g", creme: "150 ml" },
      { nb:  4, lait: "467 ml", jaunes: "73 g",  sucre: "107 g", maizena: "47 g", creme: "200 ml" },
      { nb:  5, lait: "583 ml", jaunes: "92 g",  sucre: "133 g", maizena: "58 g", creme: "250 ml" },
      { nb:  6, lait: "700 ml", jaunes: "110 g", sucre: "160 g", maizena: "70 g", creme: "300 ml" },
      { nb:  7, lait: "817 ml", jaunes: "128 g", sucre: "187 g", maizena: "82 g", creme: "350 ml" },
      { nb:  8, lait: "933 ml", jaunes: "147 g", sucre: "213 g", maizena: "93 g", creme: "400 ml" },
      { nb:  9, lait: "1050 ml",jaunes: "165 g", sucre: "240 g", maizena: "105 g",creme: "450 ml" },
      { nb: 10, lait: "1167 ml",jaunes: "183 g", sucre: "267 g", maizena: "117 g",creme: "500 ml" },
      { nb: 11, lait: "1283 ml",jaunes: "202 g", sucre: "293 g", maizena: "128 g",creme: "550 ml" },
      { nb: 12, lait: "1400 ml",jaunes: "220 g", sucre: "320 g", maizena: "140 g",creme: "600 ml" },
      { nb: 13, lait: "1517 ml", jaunes: "238 g", sucre: "347 g", maizena: "152 g", creme: "650 ml" },
      { nb: 14, lait: "1633 ml", jaunes: "257 g", sucre: "373 g", maizena: "163 g", creme: "700 ml" },
      { nb: 15, lait: "1750 ml", jaunes: "275 g", sucre: "400 g", maizena: "175 g", creme: "750 ml" },
    
    ],
    ingredients: {
      "Lait entier (ml)": 700,
      "Jaunes d'œufs (g)": 110,
      "Sucre (g)": 160,
      "Maïzena (g)": 70,
      "Crème liquide (ml)": 300,
      "Gousse de vanille": 1,
      "Pâte feuilletée": 1
    },
    etapes: [
      { icone: "🌿", titre: "Bouillir le lait + vanille",   detail: "Faire bouillir le lait entier avec la gousse de vanille fendue dans le sens de la longueur.", badge: null },
      { icone: "🌾", titre: "Maïzena + sucre",              detail: "Pendant ce temps, mélanger la maïzena tamisée avec le sucre.", badge: null },
      { icone: "🥚", titre: "Ajouter les jaunes d'œufs",  detail: "Ajouter les jaunes d'œufs bien battus au mélange maïzena-sucre.", badge: null },
      { icone: "🥛", titre: "Ajouter la crème",             detail: "Incorporer la crème liquide et mélanger jusqu'à obtenir un appareil bien homogène.", badge: null },
      { icone: "♨️", titre: "Incorporer le lait bouillant", detail: "Retirer la gousse de vanille. Verser le lait bouillant sur la préparation en mélangeant.", badge: null },
      { icone: "🔥", titre: "Cuire à feu doux",             detail: "Cuire à feu doux sans cesser de remuer jusqu'à épaississement.", badge: "⏱ 1–2 min" },
      { icone: "🥧", titre: "Foncer le moule",              detail: "Préchauffer le four à 200 °C (th. 6-7). Foncer un plat beurré avec la pâte feuilletée.", badge: null },
      { icone: "🍴", titre: "Piquer le fond",               detail: "Piquer le fond de la pâte avec une fourchette pour éviter qu'elle ne gonfle à la cuisson.", badge: null },
      { icone: "🍮", titre: "Verser + lisser",              detail: "Verser la préparation dans le moule et lisser la surface.", badge: null },
      { icone: "🔥", titre: "Cuire au four",                detail: "Enfourner à 200 °C jusqu'à ce que le dessus soit bien doré.", badge: "⏱ 30–40 min" },
      { icone: "❄️", titre: "Laisser refroidir",            detail: "Sortir du four et laisser refroidir complètement avant de démouler et déguster.", badge: null }
    ]
  }

};


// =============================
// CALCULATEUR
// =============================

// ==============================
// HELPER : tableau en colonnes
// ==============================

function col(lignes) {
  return `<table class="tableau-patons tableau-colonnes"><tbody>${lignes}</tbody></table>`;
}

function htmlTableauPizzaColonnes(l) {
  return col(`
    <tr><th>🍕 Pâtons</th><td><b>${l.patons}</b></td></tr>
    <tr><th>⚖️ Poids total pâte</th><td><b style="color:#ff8fb3">${l.total}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>💧 Eau (65% hydratation)</th><td>${l.eau}</td></tr>
    <tr><th>🧂 Sel (~3%)</th><td>${l.sel}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>`);
}

function htmlTableauCrepesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>💧 Eau</th><td>${l.eau}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>`);
}

function htmlTableauGaufresColonnes(l) {
  return col(`
    <tr><th>🧇 Gaufres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeuf}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>`);
}

function htmlTableauCookiesColonnes(l) {
  return col(`
    <tr><th>🍪 Cookies</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🧈 Beurre tendre</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌿 Vanille</th><td>${l.vanille}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍫 Chocolat noir</th><td>${l.choco}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th>🧪 Levure chimique</th><td>${l.levure}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeuf}</td></tr>`);
}

function htmlTableauSmoothieColonnes(l) {
  return col(`
    <tr><th>🍓 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍓 Fruits rouges surgelés</th><td>${l.fruits}</td></tr>
    <tr><th>🍌 Banane congelée</th><td>${l.banane}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🥥 Lait végétal</th><td>${l.lait}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;padding-top:12px">🎨 Toppings (selon goût)</th></tr>
    <tr><th>🫐 Fruits frais</th><td>1 poignée / bol</td></tr>
    <tr><th>🌾 Granola / flocons avoine</th><td>2 c.à.s / bol</td></tr>
    <tr><th>🌱 Graines de chia</th><td>1 c.à.c / bol</td></tr>
    <tr><th>🥥 Noix de coco râpée</th><td>1 c.à.s / bol</td></tr>`);
}

function htmlTableauYaourtColonnes(l) {
  return col(`
    <tr><th>🥛 Yaourts</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🧫 Ferment (yaourt nature)</th><td>${l.ferment}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;padding-top:12px">🍯 Pour servir (optionnel)</th></tr>
    <tr><th>🍯 Miel / confiture</th><td>selon goût</td></tr>
    <tr><th>🍓 Fruits frais</th><td>selon goût</td></tr>`);
}

function htmlTableauPancakesColonnes(l) {
  return col(`
    <tr><th>🥞 Pancakes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧪 Levure chimique</th><td>${l.levure}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauMuffinsColonnes(l) {
  return col(`
    <tr><th>🧁 Muffins</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍫 Cacao</th><td>${l.cacao}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧪 Levure</th><td>${l.levure}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🫒 Huile</th><td>${l.huile}</td></tr>
    <tr><th>🍫 Pépites chocolat</th><td>${l.pepites}</td></tr>`);
}

function htmlTableauCroquesColonnes(l) {
  return col(`
    <tr><th>🥪 Croques</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍞 Pain de mie</th><td>${l.pain}</td></tr>
    <tr><th>🥩 Jambon blanc</th><td>${l.jambon}</td></tr>
    <tr><th>🧀 Gruyère râpé</th><td>${l.gruyere}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🌾 Farine (béchamel)</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait (béchamel)</th><td>${l.lait}</td></tr>
    <tr><th>🌿 Moutarde Dijon</th><td>${l.moutarde}</td></tr>`);
}

function htmlTableauSaladeNicoiseColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🐟 Thon (boîte)</th><td>${l.thon}</td></tr>
    <tr><th>🥚 Œufs durs</th><td>${l.oeufs}</td></tr>
    <tr><th>🫒 Olives noires</th><td>${l.olives}</td></tr>
    <tr><th>🐟 Anchois</th><td>${l.anchois} filets</td></tr>
    <tr><th>🥬 Salade (batavia)</th><td>${l.salade}</td></tr>
    <tr><th>🧅 Oignon rouge</th><td>${l.oignon}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}
function htmlTableauSaladeCesarColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥬 Laitue romaine</th><td>${l.laitue}</td></tr>
    <tr><th>🍗 Poulet grillé</th><td>${l.poulet}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>
    <tr><th>🍞 Pain (croûtons)</th><td>${l.pain}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🥚 Jaunes d'œufs (sauce)</th><td>1 / 4 pers.</td></tr>`);
}
function htmlTableauSaladeGrequeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🧀 Feta</th><td>${l.feta}</td></tr>
    <tr><th>🫒 Olives Kalamata</th><td>${l.olives}</td></tr>
    <tr><th>🧅 Oignon rouge</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Origan séché</th><td>selon goût</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}
function htmlTableauSaladePatasColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍝 Pâtes courtes</th><td>${l.pates}</td></tr>
    <tr><th>🐟 Thon (boîte)</th><td>${l.thon}</td></tr>
    <tr><th>🍅 Tomates cerises</th><td>${l.tomates}</td></tr>
    <tr><th>🌽 Maïs</th><td>${l.mais}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}
function htmlTableauSaladeRizColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz</th><td>${l.riz}</td></tr>
    <tr><th>🫑 Poivron rouge</th><td>${l.poivron}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🍅 Tomates cerises</th><td>${l.tomates}</td></tr>
    <tr><th>🫒 Olives</th><td>${l.olives}</td></tr>
    <tr><th>🌿 Basilic / persil</th><td>1 bouquet</td></tr>`);
}
function htmlTableauTabuleColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Semoule fine</th><td>${l.semoule}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🌿 Persil plat</th><td>${l.persil}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}
function htmlTableauSaladeLentillesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫘 Lentilles vertes</th><td>${l.lentilles}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🥓 Lardons (optionnel)</th><td>${l.lardons}</td></tr>
    <tr><th>🌿 Bouquet garni</th><td>1</td></tr>
    <tr><th>🥣 Moutarde (vinaigrette)</th><td>1 c.à.s / 4 pers.</td></tr>`);
}
function htmlTableauAvocatCrevettesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥑 Avocats</th><td>${l.avocats}</td></tr>
    <tr><th>🦐 Crevettes roses cuites</th><td>${l.crevettes}</td></tr>
    <tr><th>🥬 Salade verte</th><td>${l.salade}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🍶 Mayonnaise (sauce cocktail)</th><td>3 c.à.s / 4 pers.</td></tr>`);
}

function htmlTableauGoumeauColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🫓 Pâte</th></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🟨 Levure de bière</th><td>${l.levure}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œuf entier</th><td>${l.oeuf}</td></tr>
    <tr><th>🍦 Crème épaisse</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>
    <tr><th>🌸 Eau de fleur d'oranger</th><td>selon quantité</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🍮 Goumeau (nappage)</th></tr>
    <tr><th>🍦 Crème fraîche épaisse</th><td>${l.gCreme}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.gSucre}</td></tr>
    <tr><th>🥚 Jaune d'œuf</th><td>${l.gJaune}</td></tr>`);
}

function htmlTableauGaletteTacosColonnes(l) {
  return col(`
    <tr><th>🌮 Galettes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine T55</th><td>${l.farine}</td></tr>
    <tr><th>💧 Eau tiède</th><td>${l.eau}</td></tr>
    <tr><th>🫒 Huile neutre</th><td>${l.huile}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>`);
}

function htmlTableauPainBurgerColonnes(l) {
  return col(`
    <tr><th>🍔 Buns</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine T55</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre mou</th><td>${l.beurre}</td></tr>
    <tr><th>🫒 Huile neutre</th><td>${l.huile}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeufs}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">✨ Finition</th></tr>
    <tr><th>🥛 Lait (dorure)</th><td>pour badigeonner</td></tr>
    <tr><th>⚪ Graines de sésame</th><td>selon goût</td></tr>`);
}

function htmlTableauPainDeMieColonnes(l) {
  return col(`
    <tr><th>🍞 Tranches</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre mou</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>`);
}

function htmlTableauOvernightOatsColonnes(l) {
  return col(`
    <tr><th>🌾 Pots</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Flocons d'avoine</th><td>${l.flocons}</td></tr>
    <tr><th>🥛 Lait végétal</th><td>${l.lait}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🌱 Graines de chia</th><td>${l.chia}</td></tr>
    <tr><th>🍯 Miel / sirop d'érable</th><td>${l.miel}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🎨 Toppings (selon goût)</th></tr>
    <tr><th>🍓 Fruits frais</th><td>1 poignée / pot</td></tr>
    <tr><th>🌰 Noix / amandes</th><td>selon goût</td></tr>`);
}
function htmlTableauBuddhaBowlColonnes(l) {
  return col(`
    <tr><th>🥙 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Quinoa</th><td>${l.quinoa}</td></tr>
    <tr><th>🍠 Patate douce</th><td>${l.patatedouce}</td></tr>
    <tr><th>🫘 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🥬 Épinards frais</th><td>${l.epinards}</td></tr>
    <tr><th>🥑 Avocat</th><td>${l.avocat}</td></tr>
    <tr><th>🫒 Tahini (sauce)</th><td>${l.tahini}</td></tr>
    <tr><th>🍋 Citron + ail</th><td>selon goût</td></tr>`);
}
function htmlTableauSoupeMisoColonnes(l) {
  return col(`
    <tr><th>🍜 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>💧 Eau (+ dashi)</th><td>${l.eau}</td></tr>
    <tr><th>🌿 Pâte miso</th><td>${l.miso}</td></tr>
    <tr><th>🧀 Tofu soyeux</th><td>${l.tofu}</td></tr>
    <tr><th>🌊 Wakamé séché</th><td>${l.wakame}</td></tr>
    <tr><th>🌿 Ciboule</th><td>${l.ciboule} tige(s)</td></tr>`);
}
function htmlTableauWrapPouletColonnes(l) {
  return col(`
    <tr><th>🌯 Wraps</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🫓 Tortillas</th><td>${l.tortilla}</td></tr>
    <tr><th>🥬 Laitue</th><td>${l.laitue}</td></tr>
    <tr><th>🍅 Tomate</th><td>${l.tomate}</td></tr>
    <tr><th>🥛 Yaourt grec (sauce)</th><td>${l.yaourt}</td></tr>
    <tr><th>🍋 Citron + herbes</th><td>selon goût</td></tr>`);
}
function htmlTableauEnergyBallsColonnes(l) {
  return col(`
    <tr><th>⚡ Balls</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌴 Dattes Medjool</th><td>${l.dattes}</td></tr>
    <tr><th>🌰 Amandes</th><td>${l.amandes}</td></tr>
    <tr><th>🌾 Flocons d'avoine</th><td>${l.flocons}</td></tr>
    <tr><th>🍫 Cacao en poudre</th><td>${l.cacao}</td></tr>
    <tr><th>🥥 Noix de coco râpée</th><td>${l.coco}</td></tr>`);
}
function htmlTableauPancakesProteineColonnes(l) {
  return col(`
    <tr><th>💪 Pancakes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍌 Banane mûre</th><td>${l.banane}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>💪 Poudre de protéines (opt.)</th><td>${l.proteine}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>`);
}
function htmlTableauBowlAcaiColonnes(l) {
  return col(`
    <tr><th>🫐 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫐 Purée açaï surgelée</th><td>${l.acai}</td></tr>
    <tr><th>🍌 Banane congelée</th><td>${l.banane}</td></tr>
    <tr><th>🥥 Lait végétal</th><td>${l.lait}</td></tr>
    <tr><th>🌾 Granola</th><td>${l.granola}</td></tr>
    <tr><th>🍓 Fruits frais</th><td>${l.fruits}</td></tr>`);
}
function htmlTableauSaladePoisChichesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫘 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🧅 Oignon rouge</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Persil</th><td>${l.persil}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}
function htmlTableauGaspachoColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🫑 Poivron rouge</th><td>${l.poivron}</td></tr>
    <tr><th>🍞 Pain rassis</th><td>${l.pain}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}

function htmlTableauTiramisuColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍪 Biscuits à la cuillère</th><td>${l.biscuits}</td></tr>
    <tr><th>🧀 Mascarpone</th><td>${l.mascarpone}</td></tr>
    <tr><th>🥚 Œufs (extra-frais)</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre en poudre</th><td>${l.sucre}</td></tr>
    <tr><th>☕ Café expresso</th><td>${l.cafe}</td></tr>
    <tr><th>🍫 Cacao amer</th><td>selon goût</td></tr>
    <tr><th>🥃 Marsala (facultatif)</th><td>selon goût</td></tr>`);
}

function htmlTableauFlanColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥧 Pâte feuilletée</th><td>1</td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunes}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Maïzena</th><td>${l.maizena}</td></tr>
    <tr><th>🍦 Crème liquide</th><td>${l.creme}</td></tr>
    <tr><th>🌿 Gousse de vanille</th><td>1</td></tr>`);
}

function htmlTableauClafoutisColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍒 Cerises</th><td>${l.cerises}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre en poudre</th><td>${l.sucre}</td></tr>
    <tr><th>🌿 Sucre vanillé</th><td>1 sachet</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧈 Beurre</th><td>pour le moule</td></tr>`);
}

function htmlTableauTartePommesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥧 Pâte brisée</th><td>1</td></tr>
    <tr><th>🍎 Pommes</th><td>${l.pommes}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau</th><td>${l.eau}</td></tr>
    <tr><th>🍋 Citron (jus)</th><td>½</td></tr>
    <tr><th>🍑 Confiture abricot</th><td>${l.confiture}</td></tr>`);
}


// ==============================
// TABLES GLOBALES DE RECETTES
// ==============================
let mondeClassiquesTablesGlobal = null;
let hellofreshTablesGlobal = null;
let cocktailsTablesGlobal = null;

function initTablesGlobales() {
  mondeClassiquesTablesGlobal = {
    "couscous":       { table: "tableauCouscous",        fn: htmlTableauCouscousColonnes,       label: "personne" },
    "moussaka":       { table: "tableauMoussaka",         fn: htmlTableauMoussakaColonnes,       label: "personne" },
    "paella":         { table: "tableauPaella",           fn: htmlTableauPaellaColonnes,         label: "personne" },
    "butterchicken":  { table: "tableauButterChicken",    fn: htmlTableauButterChickenColonnes,  label: "personne" },
    "souvlaki":       { table: "tableauSouvlaki",         fn: htmlTableauSouvlakiColonnes,       label: "personne" },
    "quichelorraine": { table: "tableauQuiche",           fn: htmlTableauQuicheColonnes,         label: "personne" },
    "soupeaoignon":   { table: "tableauSoupeOignon",      fn: htmlTableauSoupeOignonColonnes,    label: "personne" },
    "dalindien":      { table: "tableauDal",              fn: htmlTableauDalColonnes,            label: "personne" },
    "rizcantonnais":  { table: "tableauRizCantonnais",    fn: htmlTableauRizCantonnaisColonnes,  label: "personne" },
    "hariramarocaine":{ table: "tableauHarira",           fn: htmlTableauHariraColonnes,         label: "personne" },
    "naan":           { table: "tableauNaan",             fn: htmlTableauNaanColonnes,           label: "naan" },
    "churros":        { table: "tableauChurros",          fn: htmlTableauChurrosColonnes,        label: "personne" },
  };
  hellofreshTablesGlobal = {
    "pouletcitronthym":  { table: "tableauPouletCitron",      fn: htmlTableauPouletCitronColonnes,    label: "personne" },
    "salmonteriyaki":    { table: "tableauSalmonTeriyaki",     fn: htmlTableauSalmonTeriyakiColonnes,  label: "personne" },
    "bolognaisemaison":  { table: "tableauBolognaise",         fn: htmlTableauBolognaiseColonnes,      label: "personne" },
    "tacosmaison":       { table: "tableauTacos",              fn: htmlTableauTacosColonnes,           label: "taco" },
    "padthai":           { table: "tableauPadThai",            fn: htmlTableauPadThaiColonnes,         label: "personne" },
    "currypouletcoco":   { table: "tableauCurryPoulet",        fn: htmlTableauCurryPouletColonnes,     label: "personne" },
    "burgermaison":      { table: "tableauBurger",             fn: htmlTableauBurgerColonnes,          label: "burger" },
    "risottoprimavera":  { table: "tableauRisottoPrimavera",   fn: htmlTableauRisottoPrimaveraColonnes,label: "personne" },
    "shakshuka":         { table: "tableauShakshuka",          fn: htmlTableauShakshukaColonnes,       label: "personne" },
  };
  // Nouvelles recettes monde
  const nouvellesRecettesTables = {
    "ramenjaponais":   { table: "tableauRamen",          fn: htmlTableauRamenColonnes,          label: "bol" },
    "gyoza":           { table: "tableauGyoza",           fn: htmlTableauGyozaColonnes,          label: "gyoza" },
    "tikamasala":      { table: "tableauTikaMasala",      fn: htmlTableauTikaMasalaColonnes,     label: "personne" },
    "phovietnambien":  { table: "tableauPho",             fn: htmlTableauPhoColonnes,            label: "bol" },
    "pizzamargherita": { table: "tableauPizzaMargherita", fn: htmlTableauPizzaMargheritaColonnes,label: "pizza" },
    "carbonara":       { table: "tableauCarbonara",       fn: htmlTableauCarbonaraColonnes,      label: "personne" },
    "ceebujen":        { table: "tableauCeebujen",        fn: htmlTableauCeebujennColonnes,      label: "personne" },
    "mafewestafricain":{ table: "tableauMafe",            fn: htmlTableauMafeColonnes,           label: "personne" },
    "gnocchismaison":  { table: "tableauGnocchis",        fn: htmlTableauGnocchisColonnes,       label: "personne" },
    "falafel":         { table: "tableauFalafel",         fn: htmlTableauFalafelColonnes,        label: "falafel" },
    "poulettandoori":  { table: "tableauTandoori",        fn: htmlTableauTandooriColonnes,       label: "personne" },
    "pekinduckeasy":   { table: "tableauPekinDuck",       fn: htmlTableauPekinDuckColonnes,      label: "personne" },
    "ossobuco":        { table: "tableauOssobuco",        fn: htmlTableauOssobucoColonnes,       label: "personne" },
    "tajinemouton":    { table: "tableauTajine",          fn: htmlTableauTajineColonnes,         label: "personne" },
    "moelleuxchocolat":{ table: "tableauMoelleux",        fn: htmlTableauMoelleuxColonnes,       label: "moelleux" },
    "cheesecake":      { table: "tableauCheesecake",      fn: htmlTableauCheesecakeColonnes,     label: "personne" },
    "painauchocolat":  { table: "tableauPainAuChocolat",  fn: htmlTableauPainAuChocolatColonnes, label: "pain" },
    "gateaubasque":    { table: "tableauGateauBasque",    fn: htmlTableauGateauBasqueColonnes,   label: "personne" },
    "canelebordelais": { table: "tableauCanele",          fn: htmlTableauCaneleColonnes,         label: "cannelé" },
    "pizzareine":      { table: "tableauPizzaReine",      fn: htmlTableauPizzaReineColonnes,     label: "pizza" },
    "pizzaquattroformaggi":{ table: "tableauPizzaFormaggi",fn: htmlTableauPizzaFormaggiColonnes, label: "pizza" },
    "pizzadiavola":    { table: "tableauPizzaDiavola",    fn: htmlTableauPizzaDiavolaColonnes,   label: "pizza" },
    "pizzasaumonepinards":{ table: "tableauPizzaSaumon",  fn: htmlTableauPizzaSaumonColonnes,    label: "pizza" },
    "pizzavegetarienne":{ table: "tableauPizzaVege",      fn: htmlTableauPizzaVegeColonnes,      label: "pizza" },
    "souvlakiagneau":  { table: "tableauSouvlakiAgneau",  fn: htmlTableauSouvlakiAgneauColonnes, label: "personne" },
    "tom_yam":         { table: "tableauTomYam",          fn: htmlTableauTomYamColonnes,         label: "personne" },
    "dorade_chermoula":{ table: "tableauDorade",          fn: htmlTableauDoradeColonnes,         label: "personne" },
    "pouletchicken65": { table: "tableauChicken65",       fn: htmlTableauChicken65Colonnes,      label: "personne" },
    "pierogi":         { table: "tableauPierogi",         fn: htmlTableauPierogiColonnes,        label: "personne" },
    "momos":           { table: "tableauMomos",           fn: htmlTableauMomosColonnes,          label: "momo" },
    "shakshukaverte":  { table: "tableauShakshukaVerte",  fn: htmlTableauShakshukaVerteColonnes, label: "personne" },
    "kebbeh":          { table: "tableauKebbeh",          fn: htmlTableauKebbehColonnes,         label: "kebbeh" },
    "tteokbokki":      { table: "tableauTteokbokki",      fn: htmlTableauTteokbokkiColonnes,     label: "personne" },
    "porc_pulled":     { table: "tableauPulledPork",      fn: htmlTableauPulledPorkColonnes,     label: "personne" },
    "dosakerdosai":    { table: "tableauDosa",            fn: htmlTableauDosaColonnes,           label: "dosa" },
    "braiseboeuf_asiatique":{ table: "tableauBraiseBoeuf",fn: htmlTableauBraiseBoeufColonnes,   label: "personne" },
    "paprikashpoulet": { table: "tableauPaprikash",       fn: htmlTableauPaprikashColonnes,      label: "personne" },
  };
  // Ajouter dans la fonction calculer() accessible globalement
  window._nouvellesRecettesTables = nouvellesRecettesTables;

  cocktailsTablesGlobal = {
    "mojito":             { table: "tableauMojito",       fn: htmlTableauMojitoColonnes,       label: "verre" },
    "margarita":          { table: "tableauMargarita",     fn: htmlTableauMargaritaColonnes,    label: "verre" },
    "cosmopolitan":       { table: "tableauCosmopolitan",  fn: htmlTableauCosmopolitanColonnes, label: "verre" },
    "spritz":             { table: "tableauSpritz",        fn: htmlTableauSpritzColonnes,       label: "verre" },
    "sangria":            { table: "tableauSangria",       fn: htmlTableauSangriaColonnes,      label: "verre" },
    "pinacolada":         { table: "tableauPinaColada",    fn: htmlTableauPinaColadaColonnes,   label: "verre" },
    "daiquiri":           { table: "tableauDaiquiri",      fn: htmlTableauDaiquiriColonnes,     label: "verre" },
    "whiskysour":         { table: "tableauWhiskySour",    fn: htmlTableauWhiskySourColonnes,   label: "verre" },
    "virginmojito":       { table: "tableauVirginMojito",  fn: htmlTableauVirginMojitoColonnes, label: "verre" },
    "limonademaison":     { table: "tableauLimonade",      fn: htmlTableauLimonadeColonnes,     label: "verre" },
    "smoothiemangopassion":{ table: "tableauSmoothieMango",fn: htmlTableauSmoothieMangoColonnes,label: "verre" },
    "citronadementhe":    { table: "tableauCitronade",     fn: htmlTableauCitronadeColonnes,    label: "verre" },
    "jusPastequeMenuthe": { table: "tableauJusPasteque",   fn: htmlTableauJusPastequeColonnes,  label: "verre" },
    "virginpinacolada":   { table: "tableauVirginPina",    fn: htmlTableauVirginPinaColonnes,   label: "verre" },
    "mojitorose":         { table: "tableauMojitoRose",    fn: htmlTableauMojitoRoseColonnes,   label: "verre" },
    "negroni":            { table: "tableauNegroni",        fn: htmlTableauNegroniColonnes,      label: "verre" },
    "moscowmule":         { table: "tableauMoscowMule",     fn: htmlTableauMoscowMuleColonnes,   label: "verre" },
    "pornstarmartini":    { table: "tableauPornstar",       fn: htmlTableauPornstarColonnes,     label: "verre" },
    "hugospritz":         { table: "tableauHugoSpritz",     fn: htmlTableauHugoSpritzColonnes,   label: "verre" },
    "cherryblossommocktail":{ table: "tableauCherryBlossom",fn: htmlTableauCherryBlossomColonnes,label: "verre" },
    "oldFashioned":       { table: "tableauOldFashioned",   fn: htmlTableauOldFashionedColonnes, label: "verre" },
    "gintoniqmaison":     { table: "tableauGinTonic",       fn: htmlTableauGinTonicColonnes,     label: "verre" },
    "shrubframboisebasilic":{ table: "tableauShrub",        fn: htmlTableauShrubColonnes,        label: "verre" },
    "mocktailcoconananas":{ table: "tableauCocoAnanas",     fn: htmlTableauCocoAnanasColonnes,   label: "verre" },
  };
}

function htmlTableauMojitoRoseColonnes(l) {
  return col(`
    <tr><th>🌹 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr>
    <tr><th>🍓 Fraises fraîches</th><td>${l.fraises}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🍬 Sucre de canne</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>selon besoin</td></tr>`);
}
function htmlTableauNegroniColonnes(l) {
  return col(`
    <tr><th>🍊 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Gin</th><td>${l.gin}</td></tr>
    <tr><th>🍊 Campari</th><td>${l.campari}</td></tr>
    <tr><th>🍷 Vermouth rouge</th><td>${l.vermouth}</td></tr>
    <tr><th>🍊 Zeste d'orange</th><td>${l.orange}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}
function htmlTableauMoscowMuleColonnes(l) {
  return col(`
    <tr><th>🫙 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Vodka</th><td>${l.vodka}</td></tr>
    <tr><th>💧 Ginger beer</th><td>${l.gingerBeer}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>selon besoin</td></tr>`);
}
function htmlTableauPornstarColonnes(l) {
  return col(`
    <tr><th>🍍 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Vodka vanille</th><td>${l.vodka}</td></tr>
    <tr><th>🌺 Passoa</th><td>${l.passoa}</td></tr>
    <tr><th>🌺 Jus de passion</th><td>${l.passion}</td></tr>
    <tr><th>🍾 Prosecco (à part)</th><td>${l.prosecco}</td></tr>
    <tr><th>🍦 Sirop vanille</th><td>${l.vanille}</td></tr>`);
}
function htmlTableauHugoSpritzColonnes(l) {
  return col(`
    <tr><th>🌸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍾 Prosecco</th><td>${l.prosecco}</td></tr>
    <tr><th>🌸 Sirop de sureau</th><td>${l.sureau}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>`);
}
function htmlTableauCherryBlossomColonnes(l) {
  return col(`
    <tr><th>🌸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍒 Jus de cerise</th><td>${l.cerise}</td></tr>
    <tr><th>🌹 Eau de rose</th><td>${l.eauRose}</td></tr>
    <tr><th>🍋 Jus de citron</th><td>${l.citron}</td></tr>
    <tr><th>🍬 Sirop de sucre</th><td>${l.sirop}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>`);
}
function htmlTableauOldFashionedColonnes(l) {
  return col(`
    <tr><th>🥃 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥃 Bourbon / Rye whisky</th><td>${l.bourbon}</td></tr>
    <tr><th>🍬 Sucre (morceau)</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Angostura bitters</th><td>${l.bitters}</td></tr>
    <tr><th>🍊 Zeste d'orange</th><td>${l.orange}</td></tr>
    <tr><th>🧊 Gros glaçon</th><td>1 par verre</td></tr>`);
}
function htmlTableauGinTonicColonnes(l) {
  return col(`
    <tr><th>🫧 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Gin</th><td>${l.gin}</td></tr>
    <tr><th>💧 Tonic premium</th><td>${l.tonic}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌶️ Poivre rose</th><td>${l.poivre}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}
function htmlTableauShrubColonnes(l) {
  return col(`
    <tr><th>🫐 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍓 Framboises</th><td>${l.framboises}</td></tr>
    <tr><th>🌿 Basilic frais</th><td>${l.basilic}</td></tr>
    <tr><th>🍶 Vinaigre de cidre</th><td>${l.vinaigre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>`);
}
function htmlTableauCocoAnanasColonnes(l) {
  return col(`
    <tr><th>🥥 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🍍 Jus d'ananas</th><td>${l.ananas}</td></tr>
    <tr><th>🍋 Jus de citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🫚 Gingembre frais</th><td>${l.gingembre}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>`);
}

function htmlTableauMojitoColonnes(l) {
  return col(`
    <tr><th>🍹 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍬 Sucre de canne</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>selon besoin</td></tr>`);
}
function htmlTableauMargaritaColonnes(l) {
  return col(`
    <tr><th>🍸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥃 Tequila</th><td>${l.tequila}</td></tr>
    <tr><th>🍊 Triple sec</th><td>${l.tripleSec}</td></tr>
    <tr><th>🍋 Jus de citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🧂 Sel (rebord)</th><td>${l.sel}</td></tr>
    <tr><th>🧊 Glace</th><td>selon besoin</td></tr>`);
}
function htmlTableauCosmopolitanColonnes(l) {
  return col(`
    <tr><th>🍸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Vodka citronnée</th><td>${l.vodka}</td></tr>
    <tr><th>🍊 Cointreau</th><td>${l.cointreau}</td></tr>
    <tr><th>🍒 Jus de cranberry</th><td>${l.cranberry}</td></tr>
    <tr><th>🍋 Jus de citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🧊 Glace</th><td>selon besoin</td></tr>`);
}
function htmlTableauSpritzColonnes(l) {
  return col(`
    <tr><th>🥂 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍊 Aperol</th><td>${l.aperol}</td></tr>
    <tr><th>🍾 Prosecco</th><td>${l.prosecco}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🍊 Orange (déco)</th><td>${l.orange}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}
function htmlTableauSangriaColonnes(l) {
  return col(`
    <tr><th>🍷 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍷 Vin rouge</th><td>${l.vin}</td></tr>
    <tr><th>🥃 Brandy / Cognac</th><td>${l.brandy}</td></tr>
    <tr><th>🍊 Jus d'orange</th><td>${l.orangeJus}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🍊 Orange</th><td>${l.orange}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🍑 Pêche</th><td>${l.peche}</td></tr>`);
}
function htmlTableauPinaColadaColonnes(l) {
  return col(`
    <tr><th>🥥 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr>
    <tr><th>🥥 Crème de coco</th><td>${l.cremeCoco}</td></tr>
    <tr><th>🍍 Jus d'ananas</th><td>${l.ananas}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>${l.glace}</td></tr>`);
}
function htmlTableauDaiquiriColonnes(l) {
  return col(`
    <tr><th>🍸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr>
    <tr><th>🍋 Jus de citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🍬 Sirop de sucre de canne</th><td>${l.sucre}</td></tr>
    <tr><th>🧊 Glace</th><td>selon besoin</td></tr>`);
}
function htmlTableauWhiskySourColonnes(l) {
  return col(`
    <tr><th>🥃 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥃 Bourbon</th><td>${l.bourbon}</td></tr>
    <tr><th>🍋 Jus de citron</th><td>${l.citron}</td></tr>
    <tr><th>🍬 Sirop de sucre</th><td>${l.sirop}</td></tr>
    <tr><th>🥚 Blanc d'œuf</th><td>${l.blanc}</td></tr>
    <tr><th>🧊 Glace</th><td>selon besoin</td></tr>`);
}
function htmlTableauVirginMojitoColonnes(l) {
  return col(`
    <tr><th>🥤 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍬 Sucre de canne</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🌿 Sirop de menthe</th><td>${l.sirop}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>selon besoin</td></tr>`);
}
function htmlTableauLimonadeColonnes(l) {
  return col(`
    <tr><th>🍋 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍋 Citrons</th><td>${l.citrons}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🌿 Menthe</th><td>${l.menthe}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}
function htmlTableauSmoothieMangoColonnes(l) {
  return col(`
    <tr><th>🥭 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥭 Mangue</th><td>${l.mangue}</td></tr>
    <tr><th>🌺 Fruits de la passion</th><td>${l.passion}</td></tr>
    <tr><th>🍌 Banane</th><td>${l.banane}</td></tr>
    <tr><th>🥥 Lait de coco / végétal</th><td>${l.lait}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>`);
}
function htmlTableauCitronadeColonnes(l) {
  return col(`
    <tr><th>🌿 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍋 Citrons</th><td>${l.citrons}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau fraîche</th><td>${l.eau}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}
function htmlTableauJusPastequeColonnes(l) {
  return col(`
    <tr><th>🍉 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍉 Pastèque</th><td>${l.pasteque}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🫚 Gingembre frais</th><td>${l.gingembre}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}
function htmlTableauVirginPinaColonnes(l) {
  return col(`
    <tr><th>🥥 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥥 Crème de coco</th><td>${l.cremeCoco}</td></tr>
    <tr><th>🍍 Jus d'ananas</th><td>${l.ananas}</td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.laitCoco}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>${l.glace}</td></tr>`);
}

function htmlTableauParisBrestColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🥧 Pâte à choux</th></tr>
    <tr><th>💧 Eau</th><td>${l.eauChoux}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.laitChoux}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurrChoux}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufChoux}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🌰 Crème mousseline pralinée</th></tr>
    <tr><th>🥛 Lait entier</th><td>${l.laitCreme}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunesCreme}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreCreme}</td></tr>
    <tr><th>🌾 Maïzena</th><td>${l.maizena}</td></tr>
    <tr><th>🧈 Beurre mou</th><td>${l.beurrCreme}</td></tr>
    <tr><th>🌰 Pâte de pralin</th><td>${l.pralin}</td></tr>`);
}

function htmlTableauPizzaReineColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫓 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🍖 Jambon</th><td>${l.jambon}</td></tr>
    <tr><th>🍄 Champignons</th><td>${l.champignons}</td></tr>`);
}
function htmlTableauPizzaFormaggiColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫓 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🧀 Gorgonzola</th><td>${l.gorgonzola}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>
    <tr><th>🧀 Ricotta</th><td>${l.ricotta}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>`);
}
function htmlTableauPizzaDiavolaColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫓 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🌭 Salami épicé</th><td>${l.salami}</td></tr>
    <tr><th>🌶️ Nduja</th><td>${l.nduja}</td></tr>
    <tr><th>🌶️ Piment frais</th><td>${l.piment}</td></tr>`);
}
function htmlTableauPizzaSaumonColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫓 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🐟 Saumon fumé</th><td>${l.saumon}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}
function htmlTableauPizzaVegeColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫓 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🫑 Poivron</th><td>${l.poivron}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🍆 Aubergine</th><td>${l.aubergine}</td></tr>
    <tr><th>🌿 Pesto</th><td>${l.pesto}</td></tr>`);
}
function htmlTableauSouvlakiAgneauColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Agneau</th><td>${l.agneau}</td></tr>
    <tr><th>🫓 Pains pita</th><td>${l.pita}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr>`);
}
function htmlTableauTomYamColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🦐 Crevettes</th><td>${l.crevettes}</td></tr>
    <tr><th>🍋 Citrons verts</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Citronnelle</th><td>${l.citronnelle}</td></tr>
    <tr><th>🫚 Galanga</th><td>${l.galanga}</td></tr>`);
}
function htmlTableauDoradeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Dorade royale</th><td>${l.dorade}</td></tr>
    <tr><th>🌿 Chermoula</th><td>${l.chermoula}</td></tr>
    <tr><th>🍋 Citrons</th><td>${l.citron}</td></tr>
    <tr><th>🫒 Olives</th><td>${l.olives}</td></tr>`);
}
function htmlTableauChicken65Colonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🥛 Yaourt</th><td>${l.yaourt}</td></tr>
    <tr><th>🌾 Farine de riz</th><td>${l.farine}</td></tr>
    <tr><th>🌶️ Piment rouge</th><td>${l.piment}</td></tr>
    <tr><th>🌶️ Feuilles de curry</th><td>${l.curry}</td></tr>`);
}
function htmlTableauPierogiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🧀 Fromage frais</th><td>${l.fromage}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🍦 Crème sure</th><td>${l.creme}</td></tr>`);
}
function htmlTableauMomosColonnes(l) {
  return col(`
    <tr><th>🥟 Momos</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr>
    <tr><th>🥬 Chou</th><td>${l.chou}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🫚 Gingembre</th><td>${l.gingembre}</td></tr>`);
}
function htmlTableauShakshukaVerteColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>
    <tr><th>🫑 Poivron vert</th><td>${l.poivron}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🧀 Feta (optionnel)</th><td>${l.fetaOpt}</td></tr>`);
}
function htmlTableauKebbehColonnes(l) {
  return col(`
    <tr><th>🥩 Kebbeh</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Agneau haché</th><td>${l.agneau}</td></tr>
    <tr><th>🌾 Semoule fine</th><td>${l.semoule}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🌰 Pignons de pin</th><td>${l.pignons}</td></tr>
    <tr><th>🪵 Cannelle</th><td>${l.cannelle}</td></tr>`);
}
function htmlTableauTteokbokkiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍱 Tteok (gâteaux de riz)</th><td>${l.tteok}</td></tr>
    <tr><th>🌶️ Gochujang</th><td>${l.gochujang}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>`);
}
function htmlTableauPulledPorkColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐷 Épaule de porc</th><td>${l.porc}</td></tr>
    <tr><th>🌶️ Rub BBQ</th><td>${l.rub}</td></tr>
    <tr><th>🍖 Sauce BBQ</th><td>${l.bbqSauce}</td></tr>
    <tr><th>💨 Paprika fumé</th><td>${l.fumee}</td></tr>`);
}
function htmlTableauDosaColonnes(l) {
  return col(`
    <tr><th>🥞 Dosas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz</th><td>${l.rizS}</td></tr>
    <tr><th>🫘 Lentilles urad dal</th><td>${l.lentilles}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th>🍲 Sambar</th><td>${l.sambar}</td></tr>
    <tr><th>🌿 Chutney</th><td>${l.chutney}</td></tr>`);
}
function htmlTableauBraiseBoeufColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Joues de bœuf</th><td>${l.joues}</td></tr>
    <tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>
    <tr><th>🍶 Mirin</th><td>${l.mirin}</td></tr>
    <tr><th>🍶 Saké</th><td>${l.saké}</td></tr>
    <tr><th>🫚 Gingembre</th><td>${l.gingembre}</td></tr>
    <tr><th>⭐ Anis étoilé</th><td>${l.anis}</td></tr>`);
}
function htmlTableauPaprikashColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🌶️ Paprika hongrois</th><td>${l.paprika}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>`);
}

function htmlTableauRamenColonnes(l) {
  return col(`
    <tr><th>🍜 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍜 Nouilles ramen</th><td>${l.nouilles}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🥩 Porc (chashu)</th><td>${l.porc}</td></tr>
    <tr><th>🥚 Œufs mollets</th><td>${l.oeuf}</td></tr>
    <tr><th>🍄 Shiitake</th><td>${l.shiitake}</td></tr>`);
}
function htmlTableauGyozaColonnes(l) {
  return col(`
    <tr><th>🥟 Gyoza</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫓 Feuilles à gyoza</th><td>${l.pate}</td></tr>
    <tr><th>🥩 Porc haché</th><td>${l.porc}</td></tr>
    <tr><th>🥬 Chou chinois</th><td>${l.chou}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🫚 Gingembre</th><td>${l.gingembre}</td></tr>`);
}
function htmlTableauTikaMasalaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Yaourt (marinade)</th><td>${l.yaourt}</td></tr>
    <tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr>`);
}
function htmlTableauPhoColonnes(l) {
  return col(`
    <tr><th>🍲 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍜 Nouilles de riz</th><td>${l.nouilles}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🥩 Bœuf (tranché fin)</th><td>${l.boeuf}</td></tr>
    <tr><th>⭐ Anis étoilé</th><td>${l.anis}</td></tr>
    <tr><th>🪵 Cannelle</th><td>${l.cannelle}</td></tr>`);
}
function htmlTableauPizzaMargheritaColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫓 Pâtons (recette pâte à pizza)</th><td>${l.pate}</td></tr>
    <tr><th>🍅 Tomates San Marzano</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Mozzarella di bufala</th><td>${l.mozza}</td></tr>
    <tr><th>🌿 Basilic frais</th><td>${l.basilic}</td></tr>`);
}
function htmlTableauCarbonaraColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍝 Spaghetti</th><td>${l.spaghetti}</td></tr>
    <tr><th>🥓 Guanciale</th><td>${l.guanciale}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🧀 Pecorino romano</th><td>${l.pecorino}</td></tr>
    <tr><th>🌶️ Poivre noir</th><td>généreusement</td></tr>`);
}
function htmlTableauCeebujennColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Poisson</th><td>${l.poisson}</td></tr>
    <tr><th>🍚 Riz</th><td>${l.riz}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🫚 Manioc</th><td>${l.manioc}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>`);
}
function htmlTableauMafeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Viande (agneau/bœuf)</th><td>${l.viande}</td></tr>
    <tr><th>🥜 Pâte d'arachide</th><td>${l.arachide}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🍠 Patate douce</th><td>${l.patate}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}
function htmlTableauGnocchisColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeuf}</td></tr>
    <tr><th>🧀 Gorgonzola</th><td>${l.gorgonzola}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>`);
}
function htmlTableauFalafelColonnes(l) {
  return col(`
    <tr><th>🧆 Falafels</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫘 Pois chiches crus</th><td>${l.poischiches}</td></tr>
    <tr><th>🌿 Persil / coriandre</th><td>${l.persil}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌿 Cumin</th><td>${l.cumin}</td></tr>
    <tr><th>🫓 Pains pita</th><td>${l.pita}</td></tr>`);
}
function htmlTableauTandooriColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr>
    <tr><th>🌶️ Paprika</th><td>${l.paprika}</td></tr>`);
}
function htmlTableauPekinDuckColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🦆 Canard</th><td>${l.canard}</td></tr>
    <tr><th>🍶 Sauce hoisin</th><td>${l.hoisin}</td></tr>
    <tr><th>🫓 Crêpes pékinoises</th><td>${l.crepesP}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🌿 Ciboule</th><td>${l.ciboule} tiges</td></tr>`);
}
function htmlTableauOssobucoColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🦴 Jarret de veau</th><td>${l.jarret}</td></tr>
    <tr><th>🍷 Vin blanc</th><td>${l.vin}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🌿 Gremolata (citron, ail, persil)</th><td>1 portion</td></tr>`);
}
function htmlTableauTajineColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Agneau</th><td>${l.agneau}</td></tr>
    <tr><th>🫐 Pruneaux</th><td>${l.pruneaux}</td></tr>
    <tr><th>🌰 Amandes effilées</th><td>${l.amandes}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}
function htmlTableauMoelleuxColonnes(l) {
  return col(`
    <tr><th>🍫 Moelleux</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍫 Chocolat noir</th><td>${l.chocolat}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>`);
}
function htmlTableauCheesecakeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🧀 Philadelphia</th><td>${l.philadelphia}</td></tr>
    <tr><th>🍪 Biscuits digestifs</th><td>${l.biscuits}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>`);
}
function htmlTableauPainAuChocolatColonnes(l) {
  return col(`
    <tr><th>🍫 Pains</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine T45</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre (détrempe)</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🧈 Beurre de tourage</th><td>${l.beurrage}</td></tr>
    <tr><th>🍫 Chocolat (barres)</th><td>${l.chocolat}</td></tr>`);
}
function htmlTableauGateauBasqueColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍦 Crème (crème pâtissière)</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>`);
}
function htmlTableauCaneleColonnes(l) {
  return col(`
    <tr><th>🏺 Cannelés</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥃 Rhum</th><td>${l.rhum}</td></tr>`);
}

function htmlTableauGravlaxColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Saumon (filet)</th><td>${l.saumon}</td></tr>
    <tr><th>🧂 Gros sel</th><td>${l.sel}</td></tr>
    <tr><th>🍬 Sucre en poudre</th><td>${l.sucre}</td></tr>
    <tr><th>🌿 Aneth frais</th><td>${l.aneth}</td></tr>
    <tr><th>🥃 Vodka (optionnel)</th><td>${l.vodka}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🌿 Sauce moutarde aneth</th></tr>
    <tr><th>🌿 Moutarde douce</th><td>3 c.à.s / 4 pers.</td></tr>
    <tr><th>🫒 Huile neutre</th><td>3 c.à.s / 4 pers.</td></tr>`);
}

function htmlTableauVerrineTiramisuColonnes(l) {
  return col(`
    <tr><th>🥂 Verrines</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍪 Biscuits roses de Reims</th><td>${l.biscuits}</td></tr>
    <tr><th>🧀 Mascarpone</th><td>${l.mascarpone}</td></tr>
    <tr><th>🥚 Œufs extra-frais</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre en poudre</th><td>${l.sucre}</td></tr>
    <tr><th>🍓 Coulis de fraises</th><td>${l.coulis}</td></tr>
    <tr><th>🌸 Sirop de fraise</th><td>${l.sirop}</td></tr>
    <tr><th>🍫 Cacao amer</th><td>pour la finition</td></tr>`);
}

function htmlTableauPotAuFeuColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Viande de bœuf</th><td>${l.viande}</td></tr>
    <tr><th>🦴 Os à moelle</th><td>${l.os}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🧅 Poireaux</th><td>${l.poireaux}</td></tr>
    <tr><th>🫚 Navets</th><td>${l.navets}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌿 Bouquet garni</th><td>1</td></tr>`);
}

function htmlTableauCouscousColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Semoule</th><td>${l.semoule}</td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🥩 Merguez</th><td>${l.merguez}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carotte}</td></tr>
    <tr><th>🫘 Pois chiches</th><td>${l.pois}</td></tr>`);
}
function htmlTableauMoussakaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍆 Aubergines</th><td>${l.aubergines}</td></tr>
    <tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🥛 Béchamel</th><td>${l.bechamel}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>`);
}
function htmlTableauPaellaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz paella</th><td>${l.riz}</td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🦐 Crevettes</th><td>${l.crevettes}</td></tr>
    <tr><th>🦪 Moules</th><td>${l.moules}</td></tr>
    <tr><th>🌭 Chorizo</th><td>${l.chorizo}</td></tr>
    <tr><th>🌼 Safran</th><td>${l.safran}</td></tr>`);
}
function htmlTableauButterChickenColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr>`);
}
function htmlTableauSouvlakiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Porc</th><td>${l.porc}</td></tr>
    <tr><th>🫓 Pains pita</th><td>${l.pita}</td></tr>
    <tr><th>🥒 Concombre (tzatziki)</th><td>${l.concombre}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}
function htmlTableauQuicheColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥓 Lardons fumés</th><td>${l.lardons}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🥧 Pâte brisée</th><td>1</td></tr>`);
}
function htmlTableauSoupeOignonColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🧅 Oignons</th><td>${l.oignons}</td></tr>
    <tr><th>🍲 Bouillon de bœuf</th><td>${l.bouillon}</td></tr>
    <tr><th>🍞 Pain</th><td>${l.pain}</td></tr>
    <tr><th>🧀 Gruyère râpé</th><td>${l.gruyere}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>`);
}
function htmlTableauDalColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫘 Lentilles corail</th><td>${l.lentilles}</td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr>`);
}
function htmlTableauRizCantonnaisColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz (cuit froid)</th><td>${l.riz}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥓 Jambon</th><td>${l.jambon}</td></tr>
    <tr><th>🫛 Petits pois</th><td>${l.petitspois}</td></tr>
    <tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>`);
}
function htmlTableauHariraColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫘 Lentilles</th><td>${l.lentilles}</td></tr>
    <tr><th>🫘 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥩 Viande</th><td>${l.viande}</td></tr>
    <tr><th>🌾 Vermicelles</th><td>${l.vermicelles}</td></tr>`);
}
function htmlTableauNaanColonnes(l) {
  return col(`
    <tr><th>🫓 Naans</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>`);
}
function htmlTableauChurrosColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>💧 Eau</th><td>${l.eau}</td></tr>
    <tr><th>🍬 Sucre cannelle</th><td>${l.sucre}</td></tr>
    <tr><th>🫒 Huile de friture</th><td>${l.huile}</td></tr>
    <tr><th>🍫 Chocolat noir</th><td>${l.chocolat}</td></tr>`);
}

function htmlTableauPouletCitronColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet (filets)</th><td>${l.poulet}</td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🫛 Haricots verts</th><td>${l.haricots}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🌿 Thym frais</th><td>selon goût</td></tr>`);
}
function htmlTableauSalmonTeriyakiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Pavés de saumon</th><td>${l.saumon}</td></tr>
    <tr><th>🍚 Riz à sushi</th><td>${l.riz}</td></tr>
    <tr><th>🫘 Edamame</th><td>${l.edamame}</td></tr>
    <tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>
    <tr><th>🫚 Gingembre frais</th><td>${l.gingembre}</td></tr>`);
}
function htmlTableauBolognaiseColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr>
    <tr><th>🍝 Pâtes (tagliatelles)</th><td>${l.pates}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🍷 Vin rouge</th><td>${l.vin}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}
function htmlTableauTacosColonnes(l) {
  return col(`
    <tr><th>🌮 Tacos</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Bœuf haché</th><td>${l.boeuf}</td></tr>
    <tr><th>🫓 Tortillas</th><td>${l.tortillas}</td></tr>
    <tr><th>🥑 Avocat</th><td>${l.avocat}</td></tr>
    <tr><th>🍅 Tomate</th><td>${l.tomate}</td></tr>
    <tr><th>🧀 Fromage râpé</th><td>${l.fromage}</td></tr>`);
}
function htmlTableauPadThaiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍜 Nouilles de riz</th><td>${l.nouilles}</td></tr>
    <tr><th>🦐 Crevettes</th><td>${l.crevettes}</td></tr>
    <tr><th>🧀 Tofu ferme</th><td>${l.tofu}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🌰 Cacahuètes</th><td>${l.cacahetes}</td></tr>`);
}
function htmlTableauCurryPouletColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🍚 Riz jasmin</th><td>${l.riz}</td></tr>
    <tr><th>🌶️ Pâte de curry</th><td>${l.pateC}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>`);
}
function htmlTableauBurgerColonnes(l) {
  return col(`
    <tr><th>🍔 Burgers</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr>
    <tr><th>🍞 Buns</th><td>${l.buns}</td></tr>
    <tr><th>🧀 Cheddar</th><td>${l.cheddar}</td></tr>
    <tr><th>🥬 Salade</th><td>${l.salade}</td></tr>
    <tr><th>🍅 Tomate</th><td>${l.tomate}</td></tr>`);
}
function htmlTableauRisottoPrimaveraColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz arborio</th><td>${l.riz}</td></tr>
    <tr><th>🍲 Bouillon légumes</th><td>${l.bouillon}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🫛 Petits pois</th><td>${l.petitspois}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>`);
}
function htmlTableauShakshukaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🫑 Poivron rouge</th><td>${l.poivron}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Cumin</th><td>${l.cumin}</td></tr>`);
}

function htmlTableauBoeufColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Bœuf</th><td>${l.boeuf}</td></tr>
    <tr><th>🍷 Vin rouge</th><td>${l.vin}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>
    <tr><th>🧅 Oignons</th><td>${l.oignons}</td></tr>
    <tr><th>🥓 Lardons</th><td>${l.lardons}</td></tr>
    <tr><th>🍄 Champignons</th><td>${l.champignons}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🧄 Ail</th><td>2 gousses</td></tr>
    <tr><th>🌿 Bouquet garni</th><td>1</td></tr>`);
}

function htmlTableauGratinColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🍦 Crème liquide</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🫙 Noix de muscade</th><td>1 pincée</td></tr>`);
}

function htmlTableauCremeBruleeColonnes(l) {
  return col(`
    <tr><th>🍮 Ramequins</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍦 Crème liquide entière</th><td>${l.creme}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunes}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌿 Gousse de vanille</th><td>${l.vanille}</td></tr>
    <tr><th>🍬 Cassonade (caramel)</th><td>${l.cassonade}</td></tr>`);
}

function htmlTableauMousseColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍫 Chocolat noir (70%)</th><td>${l.chocolat}</td></tr>
    <tr><th>🥚 Œufs entiers</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧂 Sel</th><td>1 pincée</td></tr>`);
}

function htmlTableauIleFlottanteColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🥛 Crème anglaise</th></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunesCreme}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreCreme}</td></tr>
    <tr><th>🌿 Vanille</th><td>${l.vanille} gousse</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🌨️ Îles (meringue)</th></tr>
    <tr><th>🥚 Blancs d'œufs</th><td>${l.blancs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreIles}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:12px;padding:8px 14px 4px">🍯 Caramel</th></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreCaramel}</td></tr>`);
}

function htmlTableauBananaBreadColonnes(l) {
  return col(`
    <tr><th>🍰 Tranches</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍌 Bananes mûres</th><td>${l.bananes}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍬 Sucre roux</th><td>${l.sucre}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🧪 Levure chimique</th><td>${l.levure}</td></tr>`);
}

function htmlTableauGranolaColonnes(l) {
  return col(`
    <tr><th>🥣 Portions</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Flocons d'avoine</th><td>${l.flocons}</td></tr>
    <tr><th>🍯 Miel / sirop d'érable</th><td>${l.miel}</td></tr>
    <tr><th>🫒 Huile de coco</th><td>${l.huile}</td></tr>
    <tr><th>🌰 Noix mélangées</th><td>${l.noix}</td></tr>
    <tr><th>🌱 Graines</th><td>${l.graines}</td></tr>
    <tr><th>🍇 Fruits secs</th><td>selon goût</td></tr>`);
}

function htmlTableauHoumousColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫘 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🫒 Tahini</th><td>${l.tahini}</td></tr>
    <tr><th>🍋 Citron (jus)</th><td>${l.citron}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huile}</td></tr>
    <tr><th>💧 Eau froide</th><td>3–4 c.à.s</td></tr>`);
}

function htmlTableauRisottoColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz arborio</th><td>${l.riz}</td></tr>
    <tr><th>🍲 Bouillon chaud</th><td>${l.bouillon}</td></tr>
    <tr><th>🍷 Vin blanc</th><td>${l.vin}</td></tr>
    <tr><th>🧀 Parmesan râpé</th><td>${l.parmesan}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🧅 Oignon</th><td>1</td></tr>`);
}

function htmlTableauFondantColonnes(l) {
  return col(`
    <tr><th>🍫 Fondants</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍫 Chocolat noir</th><td>${l.chocolat}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>`);
}

function htmlTableauMadeleineColonnes(l) {
  return col(`
    <tr><th>🫐 Madeleines</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🧪 Levure chimique</th><td>${l.levure}</td></tr>
    <tr><th>🍯 Miel</th><td>1 c.à.s / 12</td></tr>
    <tr><th>🍋 Zeste citron</th><td>1 / 12</td></tr>`);
}

function htmlTableauCurryLegumesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🫘 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🫚 Gingembre frais</th><td>${l.gingembre}</td></tr>
    <tr><th>🌶️ Curry en poudre</th><td>${l.curry}</td></tr>`);
}

function htmlTableauVelouteLegumesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>
    <tr><th>🎃 Courge butternut</th><td>${l.courge}</td></tr>
    <tr><th>🍲 Bouillon de légumes</th><td>${l.bouillon}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧅 Oignon</th><td>1</td></tr>
    <tr><th>🌿 Gingembre frais</th><td>2 cm</td></tr>`);
}

function htmlTableauTarteCitronColonnes(l) {
  return col(`
    <tr><th colspan="2" style="color:#ffb3cc;font-size:13px;padding:10px 14px 6px">🥧 Pâte sablée</th></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🧈 Beurre froid</th><td>${l.beurrePate}</td></tr>
    <tr><th>🍬 Sucre glace</th><td>${l.sucreGlace}</td></tr>
    <tr><th>🌰 Poudre d'amande</th><td>${l.poudreAmande}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeufPate}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:13px;padding:10px 14px 6px">🍋 Crème citron</th></tr>
    <tr><th>🍋 Citrons</th><td>${l.citrons}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufCreme}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreCreme}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurreCreme}</td></tr>
    <tr><th>🌾 Maïzena</th><td>${l.maizena}</td></tr>
    <tr><th colspan="2" style="color:#ffb3cc;font-size:13px;padding:10px 14px 6px">🌨️ Meringue</th></tr>
    <tr><th>🥚 Blancs d'œufs</th><td>${l.blancs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreMeringue}</td></tr>`);
}

function htmlTableauQuinoaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Quinoa</th><td>${l.quinoa}</td></tr>
    <tr><th>🍅 Tomates cerises</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Feta</th><td>${l.feta}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🫑 Poivron rouge</th><td>${l.poivron}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huile}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauLasagneColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>`);
}

function htmlTableauBriocheColonnes(l) {
  const laitRow = l.lait !== "—"
    ? `<tr><th>🥛 Lait</th><td>${l.lait}</td></tr>`
    : `<tr><th>🥛 Lait</th><td style="color:#888;">— (version sans lait)</td></tr>`;
  return col(`
    <tr><th>📋 Version</th><td><b>${l.label}</b></td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🌿 Extrait de vanille</th><td>${l.vanille}</td></tr>
    ${laitRow}
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🧈 Beurre froid</th><td>${l.beurre}</td></tr>`);
}

// ==============================
// CALCULATEUR
// ==============================

function calculer() {
  const recette   = document.getElementById("recette").value;
  const personnes = parseInt(document.getElementById("personnes").value) || 1;
  const data      = recettes[recette];

  // Pizza : afficher uniquement la ligne sélectionnée en colonnes
  if (recette === "pizza" && data.tableauPatons) {
    const ligne = data.tableauPatons.find(l => l.patons === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} pâton${personnes > 1 ? "s" : ""}</h3>` + htmlTableauPizzaColonnes(ligne) + htmlPrixCalories("pizza", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (0–20).</p>`;
    return;
  }

  // Gaufres : tableau par nombre de gaufres
  if (recette === "gaufres" && data.tableauGaufres) {
    const ligne = data.tableauGaufres.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} gaufre${personnes > 1 ? "s" : ""}</h3>` + htmlTableauGaufresColonnes(ligne) + htmlPrixCalories("gaufres", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–20).</p>`;
    return;
  }

  // Cookies : tableau par nombre de cookies
  if (recette === "cookies" && data.tableauCookies) {
    const ligne = data.tableauCookies.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} cookie${personnes > 1 ? "s" : ""}</h3>` + htmlTableauCookiesColonnes(ligne) + htmlPrixCalories("cookies", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Goumeau
  if (recette === "goumeau" && data.tableauGoumeau) {
    const ligne = data.tableauGoumeau.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauGoumeauColonnes(ligne) + htmlPrixCalories("goumeau", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 10.</p>`;
    return;
  }

  // Galette tacos
  if (recette === "galettetacos" && data.tableauGaletteTacos) {
    const ligne = data.tableauGaletteTacos.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} galette${personnes > 1 ? "s" : ""}</h3>` + htmlTableauGaletteTacosColonnes(ligne) + htmlPrixCalories("galettetacos", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir 2, 4, 6, 8, 10, 12, 14 ou 16.</p>`;
    return;
  }

  // Pain burger
  if (recette === "painburger" && data.tableauPainBurger) {
    const ligne = data.tableauPainBurger.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} bun${personnes > 1 ? "s" : ""}</h3>` + htmlTableauPainBurgerColonnes(ligne) + htmlPrixCalories("painburger", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir 2, 4, 6, 8, 10 ou 12.</p>`;
    return;
  }

  // Pain de mie
  if (recette === "paindemie" && data.tableauPainDeMie) {
    const ligne = data.tableauPainDeMie.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} tranche${personnes > 1 ? "s" : ""}</h3>` + htmlTableauPainDeMieColonnes(ligne) + htmlPrixCalories("paindemie", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 20.</p>`;
    return;
  }

  // Overnight oats
  if (recette === "overnightoats" && data.tableauOvernightOats) {
    const ligne = data.tableauOvernightOats.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} pot${personnes > 1 ? "s" : ""}</h3>` + htmlTableauOvernightOatsColonnes(ligne) + htmlPrixCalories("overnightoats", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Buddha bowl
  if (recette === "buddhaBowl" && data.tableauBuddhaBowl) {
    const ligne = data.tableauBuddhaBowl.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} bol${personnes > 1 ? "s" : ""}</h3>` + htmlTableauBuddhaBowlColonnes(ligne) + htmlPrixCalories("buddhaBowl", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Soupe miso
  if (recette === "soupemiso" && data.tableauSoupeMiso) {
    const ligne = data.tableauSoupeMiso.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauSoupeMisoColonnes(ligne) + htmlPrixCalories("soupemiso", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Wrap poulet
  if (recette === "wrappoulet" && data.tableauWrapPoulet) {
    const ligne = data.tableauWrapPoulet.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} wrap${personnes > 1 ? "s" : ""}</h3>` + htmlTableauWrapPouletColonnes(ligne) + htmlPrixCalories("wrappoulet", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Energy balls
  if (recette === "energyballs" && data.tableauEnergyBalls) {
    const ligne = data.tableauEnergyBalls.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} ball${personnes > 1 ? "s" : ""}</h3>` + htmlTableauEnergyBallsColonnes(ligne) + htmlPrixCalories("energyballs", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir 4, 8, 12, 16, 20 ou 24.</p>`;
    return;
  }
  // Pancakes protéinés
  if (recette === "pancakesproteine" && data.tableauPancakesProteine) {
    const ligne = data.tableauPancakesProteine.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} pancake${personnes > 1 ? "s" : ""}</h3>` + htmlTableauPancakesProteineColonnes(ligne) + htmlPrixCalories("pancakesproteine", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir 2, 4, 6, 8, 10 ou 12.</p>`;
    return;
  }
  // Bowl açaï
  if (recette === "bowlacai" && data.tableauBowlAcai) {
    const ligne = data.tableauBowlAcai.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} bol${personnes > 1 ? "s" : ""}</h3>` + htmlTableauBowlAcaiColonnes(ligne) + htmlPrixCalories("bowlacai", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }
  // Salade pois chiches
  if (recette === "saladepoischiches" && data.tableauSaladePoisChiches) {
    const ligne = data.tableauSaladePoisChiches.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauSaladePoisChichesColonnes(ligne) + htmlPrixCalories("saladepoischiches", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }
  // Gaspacho
  if (recette === "gaspacho" && data.tableauGaspacho) {
    const ligne = data.tableauGaspacho.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauGaspachoColonnes(ligne) + htmlPrixCalories("gaspacho", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }

  // Curry de légumes
  if (recette === "curryledumes" && data.tableauCurryLegumes) {
    const ligne = data.tableauCurryLegumes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauCurryLegumesColonnes(ligne) + htmlPrixCalories("curryledumes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Smoothie bowl
  if (recette === "smoothiebowl" && data.tableauSmoothie) {
    const ligne = data.tableauSmoothie.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} bol${personnes > 1 ? "s" : ""}</h3>` + htmlTableauSmoothieColonnes(ligne) + htmlPrixCalories("smoothiebowl", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–6).</p>`;
    return;
  }
  // Yaourt maison
  if (recette === "yaourt" && data.tableauYaourt) {
    const ligne = data.tableauYaourt.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} yaourt${personnes > 1 ? "s" : ""}</h3>` + htmlTableauYaourtColonnes(ligne) + htmlPrixCalories("yaourt", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–6).</p>`;
    return;
  }

  // Pancakes
  if (recette === "pancakes" && data.tableauPancakes) {
    const ligne = data.tableauPancakes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} pancake${personnes > 1 ? "s" : ""}</h3>` + htmlTableauPancakesColonnes(ligne) + htmlPrixCalories("pancakes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–20).</p>`;
    return;
  }
  // Muffins
  if (recette === "muffins" && data.tableauMuffins) {
    const ligne = data.tableauMuffins.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} muffin${personnes > 1 ? "s" : ""}</h3>` + htmlTableauMuffinsColonnes(ligne) + htmlPrixCalories("muffins", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–24).</p>`;
    return;
  }
  // Croque-monsieur
  if (recette === "croquemonsieur" && data.tableauCroques) {
    const ligne = data.tableauCroques.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} croque${personnes > 1 ? "s" : ""}-monsieur</h3>` + htmlTableauCroquesColonnes(ligne) + htmlPrixCalories("croquemonsieur", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }
  // Salades d'été
  const saladesTables = {
    "saladeniçoise":       { table: "tableauSaladeNicoise",    fn: htmlTableauSaladeNicoiseColonnes,    label: "personne" },
    "saladecesar":         { table: "tableauSaladeCesar",      fn: htmlTableauSaladeCesarColonnes,      label: "personne" },
    "saladegreque":        { table: "tableauSaladeGreque",     fn: htmlTableauSaladeGrequeColonnes,     label: "personne" },
    "saladepatasthon":     { table: "tableauSaladePatas",      fn: htmlTableauSaladePatasColonnes,      label: "personne" },
    "saladerizmediterranee":{ table: "tableauSaladeRiz",       fn: htmlTableauSaladeRizColonnes,        label: "personne" },
    "tabulemaison":        { table: "tableauTabule",           fn: htmlTableauTabuleColonnes,           label: "personne" },
    "saladelentilles":     { table: "tableauSaladeLentilles",  fn: htmlTableauSaladeLentillesColonnes,  label: "personne" },
    "saladeavocatcrevettes":{ table: "tableauAvocatCrevettes", fn: htmlTableauAvocatCrevettesColonnes,  label: "personne" },
  };
  if (saladesTables[recette] && data[saladesTables[recette].table]) {
    const cfg  = saladesTables[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + cfg.fn(ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }

  // Tiramisu
  if (recette === "tiramisu" && data.tableauTiramisu) {
    const ligne = data.tableauTiramisu.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauTiramisuColonnes(ligne) + htmlPrixCalories("tiramisu", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }

  // Flan
  if (recette === "flan" && data.tableauFlan) {
    const ligne = data.tableauFlan.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauFlanColonnes(ligne) + htmlPrixCalories("flan", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }
  // Clafoutis
  if (recette === "clafoutis" && data.tableauClafoutis) {
    const ligne = data.tableauClafoutis.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauClafoutisColonnes(ligne) + htmlPrixCalories("clafoutis", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }
  // Tarte aux pommes
  if (recette === "tarteaupommes" && data.tableauTartePommes) {
    const ligne = data.tableauTartePommes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauTartePommesColonnes(ligne) + htmlPrixCalories("tarteaupommes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 12.</p>`;
    return;
  }

  // Nouvelles recettes monde et desserts
  const nRT = window._nouvellesRecettesTables || {};
  if (nRT[recette] && data[nRT[recette].table]) {
    const cfg = nRT[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + cfg.fn(ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Cocktails
  const cocktailsTables = {
    "mojito":             { table: "tableauMojito",       fn: htmlTableauMojitoColonnes,       label: "verre" },
    "margarita":          { table: "tableauMargarita",     fn: htmlTableauMargaritaColonnes,    label: "verre" },
    "cosmopolitan":       { table: "tableauCosmopolitan",  fn: htmlTableauCosmopolitanColonnes, label: "verre" },
    "spritz":             { table: "tableauSpritz",        fn: htmlTableauSpritzColonnes,       label: "verre" },
    "sangria":            { table: "tableauSangria",       fn: htmlTableauSangriaColonnes,      label: "verre" },
    "pinacolada":         { table: "tableauPinaColada",    fn: htmlTableauPinaColadaColonnes,   label: "verre" },
    "daiquiri":           { table: "tableauDaiquiri",      fn: htmlTableauDaiquiriColonnes,     label: "verre" },
    "whiskysour":         { table: "tableauWhiskySour",    fn: htmlTableauWhiskySourColonnes,   label: "verre" },
    "virginmojito":       { table: "tableauVirginMojito",  fn: htmlTableauVirginMojitoColonnes, label: "verre" },
    "limonademaison":     { table: "tableauLimonade",      fn: htmlTableauLimonadeColonnes,     label: "verre" },
    "smoothiemangopassion":{ table: "tableauSmoothieMango",fn: htmlTableauSmoothieMangoColonnes,label: "verre" },
    "citronadementhe":    { table: "tableauCitronade",     fn: htmlTableauCitronadeColonnes,    label: "verre" },
    "jusPastequeMenuthe": { table: "tableauJusPasteque",   fn: htmlTableauJusPastequeColonnes,  label: "verre" },
    "virginpinacolada":   { table: "tableauVirginPina",    fn: htmlTableauVirginPinaColonnes,   label: "verre" },
    "mojitorose":         { table: "tableauMojitoRose",    fn: htmlTableauMojitoRoseColonnes,   label: "verre" },
    "negroni":            { table: "tableauNegroni",        fn: htmlTableauNegroniColonnes,      label: "verre" },
    "moscowmule":         { table: "tableauMoscowMule",     fn: htmlTableauMoscowMuleColonnes,   label: "verre" },
    "pornstarmartini":    { table: "tableauPornstar",       fn: htmlTableauPornstarColonnes,     label: "verre" },
    "hugospritz":         { table: "tableauHugoSpritz",     fn: htmlTableauHugoSpritzColonnes,   label: "verre" },
    "cherryblossommocktail":{ table: "tableauCherryBlossom",fn: htmlTableauCherryBlossomColonnes,label: "verre" },
    "oldFashioned":       { table: "tableauOldFashioned",   fn: htmlTableauOldFashionedColonnes, label: "verre" },
    "gintoniqmaison":     { table: "tableauGinTonic",       fn: htmlTableauGinTonicColonnes,     label: "verre" },
    "shrubframboisebasilic":{ table: "tableauShrub",        fn: htmlTableauShrubColonnes,        label: "verre" },
    "mocktailcoconananas":{ table: "tableauCocoAnanas",     fn: htmlTableauCocoAnanasColonnes,   label: "verre" },
  };
  if (cocktailsTables[recette] && data[cocktailsTables[recette].table]) {
    const cfg = cocktailsTables[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + cfg.fn(ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Paris-Brest
  if (recette === "parisbrestreinterpretation" && data.tableauParisBrest) {
    const ligne = data.tableauParisBrest.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauParisBrestColonnes(ligne) + htmlPrixCalories("parisbrestreinterpretation", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Saumon gravlax
  if (recette === "saumongravlax" && data.tableauGravlax) {
    const ligne = data.tableauGravlax.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauGravlaxColonnes(ligne) + htmlPrixCalories("saumongravlax", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }
  // Verrines tiramisu
  if (recette === "verrinetiramisu" && data.tableauVerrineTiramisu) {
    const ligne = data.tableauVerrineTiramisu.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} verrine${personnes > 1 ? "s" : ""}</h3>` + htmlTableauVerrineTiramisuColonnes(ligne) + htmlPrixCalories("verrinetiramisu", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }
  // Pot-au-feu
  if (recette === "potaufeu" && data.tableauPotAuFeu) {
    const ligne = data.tableauPotAuFeu.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauPotAuFeuColonnes(ligne) + htmlPrixCalories("potaufeu", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 15.</p>`;
    return;
  }

  // Recettes du monde + classiques
  const mondeClassiquesTables = mondeClassiquesTablesGlobal || {
    "couscous":       { table: "tableauCouscous",        fn: htmlTableauCouscousColonnes,       label: "personne" },
    "moussaka":       { table: "tableauMoussaka",         fn: htmlTableauMoussakaColonnes,       label: "personne" },
    "paella":         { table: "tableauPaella",           fn: htmlTableauPaellaColonnes,         label: "personne" },
    "butterchicken":  { table: "tableauButterChicken",    fn: htmlTableauButterChickenColonnes,  label: "personne" },
    "souvlaki":       { table: "tableauSouvlaki",         fn: htmlTableauSouvlakiColonnes,       label: "personne" },
    "quichelorraine": { table: "tableauQuiche",           fn: htmlTableauQuicheColonnes,         label: "personne" },
    "soupeaoignon":   { table: "tableauSoupeOignon",      fn: htmlTableauSoupeOignonColonnes,    label: "personne" },
    "dalindien":      { table: "tableauDal",              fn: htmlTableauDalColonnes,            label: "personne" },
    "rizcantonnais":  { table: "tableauRizCantonnais",    fn: htmlTableauRizCantonnaisColonnes,  label: "personne" },
    "hariramarocaine":{ table: "tableauHarira",           fn: htmlTableauHariraColonnes,         label: "personne" },
    "naan":           { table: "tableauNaan",             fn: htmlTableauNaanColonnes,           label: "naan" },
    "churros":        { table: "tableauChurros",          fn: htmlTableauChurrosColonnes,        label: "personne" },
  };
  if (mondeClassiquesTables[recette] && data[mondeClassiquesTables[recette].table]) {
    const cfg = mondeClassiquesTables[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + cfg.fn(ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 2 et 12.</p>`;
    return;
  }

  // Recettes HelloFresh style
  const hellofreshTables = {
    "pouletcitronthym":  { table: "tableauPouletCitron",      fn: htmlTableauPouletCitronColonnes,    label: "personne" },
    "salmonteriyaki":    { table: "tableauSalmonTeriyaki",     fn: htmlTableauSalmonTeriyakiColonnes,  label: "personne" },
    "bolognaisemaison":  { table: "tableauBolognaise",         fn: htmlTableauBolognaiseColonnes,      label: "personne" },
    "tacosmaison":       { table: "tableauTacos",              fn: htmlTableauTacosColonnes,           label: "taco" },
    "padthai":           { table: "tableauPadThai",            fn: htmlTableauPadThaiColonnes,         label: "personne" },
    "currypouletcoco":   { table: "tableauCurryPoulet",        fn: htmlTableauCurryPouletColonnes,     label: "personne" },
    "burgermaison":      { table: "tableauBurger",             fn: htmlTableauBurgerColonnes,          label: "burger" },
    "risottoprimavera":  { table: "tableauRisottoPrimavera",   fn: htmlTableauRisottoPrimaveraColonnes,label: "personne" },
    "shakshuka":         { table: "tableauShakshuka",          fn: htmlTableauShakshukaColonnes,       label: "personne" },
  };
  if (hellofreshTables[recette] && data[hellofreshTables[recette].table]) {
    const cfg = hellofreshTables[recette];
    const ligne = data[cfg.table].find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} ${cfg.label}${personnes > 1 ? "s" : ""}</h3>` + cfg.fn(ligne) + htmlPrixCalories(recette, personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 1 et 6.</p>`;
    return;
  }

  // Bœuf bourguignon
  if (recette === "boeufbourguignon" && data.tableauBoeuf) {
    const ligne = data.tableauBoeuf.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + htmlTableauBoeufColonnes(ligne) + htmlPrixCalories("boeufbourguignon", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }
  // Gratin dauphinois
  if (recette === "gratindauphinois" && data.tableauGratin) {
    const ligne = data.tableauGratin.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + htmlTableauGratinColonnes(ligne) + htmlPrixCalories("gratindauphinois", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }
  // Crème brûlée
  if (recette === "cremebrulee" && data.tableauCremebrulee) {
    const ligne = data.tableauCremebrulee.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} ramequin${personnes > 1 ? "s" : ""}</h3>` + htmlTableauCremeBruleeColonnes(ligne) + htmlPrixCalories("cremebrulee", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10.</p>`;
    return;
  }
  // Mousse au chocolat
  if (recette === "mousseauchocolat" && data.tableauMousse) {
    const ligne = data.tableauMousse.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + htmlTableauMousseColonnes(ligne) + htmlPrixCalories("mousseauchocolat", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }
  // Île flottante
  if (recette === "ileflottante" && data.tableauIleFlottante) {
    const ligne = data.tableauIleFlottante.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + htmlTableauIleFlottanteColonnes(ligne) + htmlPrixCalories("ileflottante", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }
  // Banana bread
  if (recette === "bananabread" && data.tableauBananaBread) {
    const ligne = data.tableauBananaBread.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} tranches</h3>` + htmlTableauBananaBreadColonnes(ligne) + htmlPrixCalories("bananabread", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10.</p>`;
    return;
  }
  // Granola
  if (recette === "granola" && data.tableauGranola) {
    const ligne = data.tableauGranola.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} portions</h3>` + htmlTableauGranolaColonnes(ligne) + htmlPrixCalories("granola", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10.</p>`;
    return;
  }
  // Houmous
  if (recette === "houmous" && data.tableauHoumous) {
    const ligne = data.tableauHoumous.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personnes</h3>` + htmlTableauHoumousColonnes(ligne) + htmlPrixCalories("houmous", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Choisir entre 4 et 10 personnes.</p>`;
    return;
  }

  // Risotto
  if (recette === "risotto" && data.tableauRisotto) {
    const ligne = data.tableauRisotto.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauRisottoColonnes(ligne) + htmlPrixCalories("risotto", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–6).</p>`;
    return;
  }
  // Fondant au chocolat
  if (recette === "fondantchocolat" && data.tableauFondant) {
    const ligne = data.tableauFondant.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} fondant${personnes > 1 ? "s" : ""}</h3>` + htmlTableauFondantColonnes(ligne) + htmlPrixCalories("fondantchocolat", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }
  // Madeleine
  if (recette === "madeleine" && data.tableauMadeleine) {
    const ligne = data.tableauMadeleine.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} madeleine${personnes > 1 ? "s" : ""}</h3>` + htmlTableauMadeleineColonnes(ligne) + htmlPrixCalories("madeleine", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–20).</p>`;
    return;
  }
  // Velouté légumes
  if (recette === "veloutelegumes" && data.tableauVeloute) {
    const ligne = data.tableauVeloute.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauVelouteLegumesColonnes(ligne) + htmlPrixCalories("veloutelegumes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–6).</p>`;
    return;
  }

  // Tarte au citron
  if (recette === "tartecitron" && data.tableauTarteCitron) {
    const ligne = data.tableauTarteCitron.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} tartelette${personnes > 1 ? "s" : ""}</h3>` + htmlTableauTarteCitronColonnes(ligne) + htmlPrixCalories("tartecitron", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Salade quinoa
  if (recette === "saladequinoa" && data.tableauQuinoa) {
    const ligne = data.tableauQuinoa.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauQuinoaColonnes(ligne) + htmlPrixCalories("saladequinoa", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–8).</p>`;
    return;
  }

  // Lasagne : tableau pâte maison
  if (recette === "lasagne" && data.tableauLasagne) {
    const ligne = data.tableauLasagne.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauLasagneColonnes(ligne) + htmlPrixCalories("lasagne", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Brioche : afficher les 4 boutons de version
  if (recette === "brioche" && data.tableauBrioche) {
    const ligne = data.tableauBrioche.find(l => l.nb === personnes);
    const boutons = data.tableauBrioche.map(l => `
      <button class="btn-brioche${l.nb === personnes ? " btn-brioche-actif" : ""}"
        onclick="document.getElementById('personnes').value=${l.nb};calculer()">
        ${l.label}
      </button>`).join("");
    document.getElementById("resultat").innerHTML =
      `<div class="brioche-choix">${boutons}</div>` +
      (ligne ? `<h3>${ligne.label}</h3>` + htmlTableauBriocheColonnes(ligne) + htmlPrixCalories("brioche", personnes) : "");
    return;
  }

  // Crêpes : afficher uniquement la ligne sélectionnée en colonnes
  if (recette === "crepes" && data.tableauPersonnes) {
    const ligne = data.tableauPersonnes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauCrepesColonnes(ligne) + htmlPrixCalories("crepes", personnes)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Recettes fixes (flan, clafoutis) : afficher les ingrédients tels quels
  if (data.fixe && data.ingredientsFixes) {
    let rows = data.ingredientsFixes.map(([k,v]) =>
      `<tr><th>${k}</th><td>${v}</td></tr>`).join("");
    document.getElementById("resultat").innerHTML =
      `<h3>Recette complète (~6 personnes)</h3>
       <table class="tableau-patons tableau-colonnes"><tbody>${rows}</tbody></table>` +
      htmlPrixCalories(recette, 6);
    return;
  }

  // Autres recettes : calcul proportionnel classique
  const ratio = personnes / data.base;
  let html = `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>`;
  for (const [nom, qte] of Object.entries(data.ingredients)) {
    const qteCalculee = (qte * ratio).toFixed(1);
    html += `<div class="ingredient"><span>${nom}</span><b>${qteCalculee}</b></div>`;
  }
  document.getElementById("resultat").innerHTML = html;
}

function afficherFiche(recette) {
  const data = recettes[recette];
  let html = `<div class="fiche"><h2>📖 ${recette}</h2><p>⏱ ${data.temps}</p><p>${data.niveau}</p><h3>Étapes :</h3><ol>`;
  data.etapes.forEach(e => { html += `<li>${e.titre}</li>`; });
  html += `</ol></div>`;
  document.getElementById("ficheRecette").innerHTML = html;
}



// ==============================
// PRIX & CALORIES PAR RECETTE
// Prix moyens supermarché France 2025
// ==============================
const prixCalories = {
  pizza:    { base: 4,  baseLabel: "4 pâtons",    prixTotal: 0.64,  calTotal: 2346, unite: "pâton" },
  crepes:   { base: 4,  baseLabel: "4 personnes",  prixTotal: 2.17,  calTotal: 1898, unite: "personne" },
  gaufres:  { base: 4,  baseLabel: "4 gaufres",    prixTotal: 0.37,  calTotal: 386,  unite: "gaufre" },
  brioche:       { base: 1,  baseLabel: "1 brioche",    prixTotal: 2.83,  calTotal: 3642, unite: "brioche" },
  goumeau:       { base: 4,  baseLabel: "4 personnes",  prixTotal: 2.50, calTotal: 1200, unite: "personne" },
  galettetacos:  { base: 8,  baseLabel: "8 galettes",      prixTotal: 0.50,  calTotal: 800,  unite: "galette" },
  painburger:    { base: 6,  baseLabel: "6 buns",           prixTotal: 1.50,  calTotal: 1800, unite: "bun" },
  painbaguette:  { base: 1,  baseLabel: "1 baguette (~250g)", prixTotal: 0.40, calTotal: 680, unite: "baguette" },
  paindemie:     { base: 20, baseLabel: "20 tranches",  prixTotal: 1.20,  calTotal: 1400, unite: "tranche" },
  patefeuilletee:{ base: 1,  baseLabel: "1 pâte (~28cm)",prixTotal: 1.80,  calTotal: 1200, unite: "pâte" },
  patebrisee:    { base: 1,  baseLabel: "1 pâte (~28cm)",prixTotal: 0.80,  calTotal: 900,  unite: "pâte" },
  patesablee:    { base: 1,  baseLabel: "1 pâte (~28cm)",prixTotal: 1.00,  calTotal: 1100, unite: "pâte" },
  lasagne:  { base: 4,  baseLabel: "4 personnes",  prixTotal: 1.36,  calTotal: 2020, unite: "personne" },
  cookies:  { base: 4,  baseLabel: "4 cookies",    prixTotal: 2.20,  calTotal: 2220, unite: "cookie" },
  flan:     { base: 6,  baseLabel: "6 personnes",  prixTotal: 4.00,  calTotal: 2363, unite: "personne" },
  clafoutis:{ base: 6,  baseLabel: "6 personnes",  prixTotal: 4.68,  calTotal: 2234, unite: "personne" },
  tiramisu:      { base: 6, baseLabel: "6 personnes", prixTotal: 5.20, calTotal: 3200, unite: "personne" },
  tarteaupommes:  { base: 6,  baseLabel: "6 personnes",  prixTotal: 3.50, calTotal: 1800, unite: "personne" },
  pancakes:       { base: 4,  baseLabel: "4 personnes",  prixTotal: 1.20, calTotal: 1200, unite: "personne" },
  muffins:        { base: 12, baseLabel: "12 muffins",   prixTotal: 2.80, calTotal: 2520, unite: "muffin" },
  croquemonsieur: { base: 4,  baseLabel: "4 croques",    prixTotal: 4.50, calTotal: 2000, unite: "croque" },
  smoothiebowl:   { base: 2,  baseLabel: "2 bols",       prixTotal: 3.00, calTotal: 500,  unite: "bol" },
  saladequinoa:   { base: 4,  baseLabel: "4 personnes",  prixTotal: 5.00, calTotal: 1200, unite: "personne" },
  yaourt:         { base: 8,  baseLabel: "8 yaourts",    prixTotal: 1.80, calTotal: 640,  unite: "yaourt" },
  tartecitron:      { base: 6,  baseLabel: "6 tartelettes", prixTotal: 4.20,  calTotal: 2400, unite: "tartelette" },
  mojitorose:         { base: 1,  baseLabel: "1 verre", prixTotal: 1.80, calTotal: 140, unite: "verre" },
  negroni:            { base: 1,  baseLabel: "1 verre", prixTotal: 2.00, calTotal: 200, unite: "verre" },
  moscowmule:         { base: 1,  baseLabel: "1 verre", prixTotal: 1.80, calTotal: 140, unite: "verre" },
  pornstarmartini:    { base: 1,  baseLabel: "1 verre", prixTotal: 2.50, calTotal: 180, unite: "verre" },
  hugospritz:         { base: 1,  baseLabel: "1 verre", prixTotal: 1.50, calTotal: 120, unite: "verre" },
  cherryblossommocktail:{ base: 1,baseLabel: "1 verre", prixTotal: 0.80, calTotal: 80,  unite: "verre" },
  oldFashioned:       { base: 1,  baseLabel: "1 verre", prixTotal: 2.00, calTotal: 180, unite: "verre" },
  gintoniqmaison:     { base: 1,  baseLabel: "1 verre", prixTotal: 1.80, calTotal: 140, unite: "verre" },
  shrubframboisebasilic:{ base: 4,baseLabel: "4 verres",prixTotal: 2.00, calTotal: 240, unite: "verre" },
  mocktailcoconananas:{ base: 2,  baseLabel: "2 verres",prixTotal: 1.20, calTotal: 160, unite: "verre" },
  mojito:             { base: 1,  baseLabel: "1 verre",       prixTotal: 1.50, calTotal: 150,  unite: "verre" },
  margarita:          { base: 1,  baseLabel: "1 verre",       prixTotal: 1.80, calTotal: 180,  unite: "verre" },
  cosmopolitan:       { base: 1,  baseLabel: "1 verre",       prixTotal: 1.80, calTotal: 160,  unite: "verre" },
  spritz:             { base: 1,  baseLabel: "1 verre",       prixTotal: 1.50, calTotal: 120,  unite: "verre" },
  sangria:            { base: 6,  baseLabel: "6 verres",      prixTotal: 4.00, calTotal: 900,  unite: "verre" },
  pinacolada:         { base: 1,  baseLabel: "1 verre",       prixTotal: 2.00, calTotal: 220,  unite: "verre" },
  daiquiri:           { base: 1,  baseLabel: "1 verre",       prixTotal: 1.50, calTotal: 160,  unite: "verre" },
  whiskysour:         { base: 1,  baseLabel: "1 verre",       prixTotal: 2.00, calTotal: 180,  unite: "verre" },
  virginmojito:       { base: 1,  baseLabel: "1 verre",       prixTotal: 0.50, calTotal: 60,   unite: "verre" },
  limonademaison:     { base: 4,  baseLabel: "4 verres",      prixTotal: 1.00, calTotal: 280,  unite: "verre" },
  smoothiemangopassion:{ base: 2, baseLabel: "2 verres",      prixTotal: 2.00, calTotal: 300,  unite: "verre" },
  citronadementhe:    { base: 4,  baseLabel: "4 verres",      prixTotal: 0.80, calTotal: 200,  unite: "verre" },
  jusPastequeMenuthe: { base: 4,  baseLabel: "4 verres",      prixTotal: 1.50, calTotal: 160,  unite: "verre" },
  virginpinacolada:   { base: 1,  baseLabel: "1 verre",       prixTotal: 1.00, calTotal: 150,  unite: "verre" },
  pizzareine:         { base: 2, baseLabel: "2 pizzas",    prixTotal: 4.50,  calTotal: 1400, unite: "pizza"    },
  pizzaquattroformaggi:{ base: 2,baseLabel: "2 pizzas",    prixTotal: 5.00,  calTotal: 1600, unite: "pizza"    },
  pizzadiavola:       { base: 2, baseLabel: "2 pizzas",    prixTotal: 4.50,  calTotal: 1400, unite: "pizza"    },
  pizzasaumonepinards:{ base: 2, baseLabel: "2 pizzas",    prixTotal: 6.00,  calTotal: 1200, unite: "pizza"    },
  pizzavegetarienne:  { base: 2, baseLabel: "2 pizzas",    prixTotal: 4.00,  calTotal: 1200, unite: "pizza"    },
  souvlakiagneau:     { base: 4, baseLabel: "4 personnes", prixTotal: 8.00,  calTotal: 1200, unite: "personne" },
  tom_yam:            { base: 4, baseLabel: "4 personnes", prixTotal: 6.00,  calTotal: 600,  unite: "personne" },
  dorade_chermoula:   { base: 4, baseLabel: "4 personnes", prixTotal: 10.00, calTotal: 800,  unite: "personne" },
  pouletchicken65:    { base: 4, baseLabel: "4 personnes", prixTotal: 6.00,  calTotal: 1000, unite: "personne" },
  pierogi:            { base: 4, baseLabel: "4 personnes", prixTotal: 4.00,  calTotal: 1600, unite: "personne" },
  momos:              { base: 4, baseLabel: "4 personnes", prixTotal: 4.00,  calTotal: 800,  unite: "personne" },
  shakshukaverte:     { base: 2, baseLabel: "2 personnes", prixTotal: 3.00,  calTotal: 400,  unite: "personne" },
  kebbeh:             { base: 4, baseLabel: "4 personnes", prixTotal: 6.00,  calTotal: 1200, unite: "personne" },
  tteokbokki:         { base: 2, baseLabel: "2 personnes", prixTotal: 4.00,  calTotal: 800,  unite: "personne" },
  porc_pulled:        { base: 6, baseLabel: "6 personnes", prixTotal: 12.00, calTotal: 2400, unite: "personne" },
  dosakerdosai:       { base: 4, baseLabel: "4 dosas",     prixTotal: 2.00,  calTotal: 800,  unite: "dosa"     },
  braiseboeuf_asiatique:{ base: 4,baseLabel: "4 personnes",prixTotal: 12.00, calTotal: 1600, unite: "personne" },
  paprikashpoulet:    { base: 4, baseLabel: "4 personnes", prixTotal: 7.00,  calTotal: 1600, unite: "personne" },
  ramenjaponais:      { base: 2,  baseLabel: "2 bols",        prixTotal: 8.00,  calTotal: 900,  unite: "bol" },
  gyoza:              { base: 20, baseLabel: "20 gyoza",      prixTotal: 5.00,  calTotal: 1000, unite: "gyoza" },
  tikamasala:         { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.00,  calTotal: 1600, unite: "personne" },
  phovietnambien:     { base: 2,  baseLabel: "2 bols",        prixTotal: 6.00,  calTotal: 700,  unite: "bol" },
  pizzamargherita:    { base: 2,  baseLabel: "2 pizzas",      prixTotal: 4.00,  calTotal: 1400, unite: "pizza" },
  carbonara:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 2000, unite: "personne" },
  ceebujen:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 10.00, calTotal: 2000, unite: "personne" },
  mafewestafricain:   { base: 4,  baseLabel: "4 personnes",   prixTotal: 8.00,  calTotal: 1800, unite: "personne" },
  gnocchismaison:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 1800, unite: "personne" },
  falafel:            { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.00,  calTotal: 800,  unite: "personne" },
  poulettandoori:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.00,  calTotal: 1200, unite: "personne" },
  pekinduckeasy:      { base: 4,  baseLabel: "4 personnes",   prixTotal: 15.00, calTotal: 1600, unite: "personne" },
  ossobuco:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 14.00, calTotal: 1600, unite: "personne" },
  tajinemouton:       { base: 4,  baseLabel: "4 personnes",   prixTotal: 12.00, calTotal: 1600, unite: "personne" },
  moelleuxchocolat:   { base: 6,  baseLabel: "6 moelleux",    prixTotal: 4.00,  calTotal: 2400, unite: "moelleux" },
  cheesecake:         { base: 8,  baseLabel: "8 personnes",   prixTotal: 7.00,  calTotal: 2400, unite: "personne" },
  painauchocolat:     { base: 8,  baseLabel: "8 pains",       prixTotal: 4.00,  calTotal: 2000, unite: "pain" },
  gateaubasque:       { base: 8,  baseLabel: "8 personnes",   prixTotal: 5.00,  calTotal: 2400, unite: "personne" },
  canelebordelais:    { base: 12, baseLabel: "12 cannelés",   prixTotal: 3.00,  calTotal: 1200, unite: "cannelé" },
  boeufbourguignon:   { base: 6, baseLabel: "6 personnes",  prixTotal: 18.00, calTotal: 3600, unite: "personne" },
  couscous:           { base: 6,  baseLabel: "6 personnes",  prixTotal: 12.00, calTotal: 2400, unite: "personne" },
  moussaka:           { base: 6,  baseLabel: "6 personnes",  prixTotal: 8.00,  calTotal: 2400, unite: "personne" },
  paella:             { base: 4,  baseLabel: "4 personnes",  prixTotal: 14.00, calTotal: 2000, unite: "personne" },
  butterchicken:      { base: 4,  baseLabel: "4 personnes",  prixTotal: 8.00,  calTotal: 1600, unite: "personne" },
  souvlaki:           { base: 4,  baseLabel: "4 personnes",  prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  quichelorraine:     { base: 6,  baseLabel: "6 personnes",  prixTotal: 4.50,  calTotal: 2400, unite: "personne" },
  soupeaoignon:       { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.50,  calTotal: 800,  unite: "personne" },
  dalindien:          { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.00,  calTotal: 1200, unite: "personne" },
  rizcantonnais:      { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.50,  calTotal: 1200, unite: "personne" },
  hariramarocaine:    { base: 6,  baseLabel: "6 personnes",  prixTotal: 5.00,  calTotal: 1200, unite: "personne" },
  naan:               { base: 4,  baseLabel: "4 naans",      prixTotal: 1.50,  calTotal: 800,  unite: "naan" },
  verrinetiramisu:    { base: 6,  baseLabel: "6 verrines",   prixTotal: 6.00,  calTotal: 1800, unite: "verrine" },
  churros:            { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.00,  calTotal: 1600, unite: "personne" },
  potaufeu:           { base: 6,  baseLabel: "6 personnes",  prixTotal: 15.00, calTotal: 2400, unite: "personne" },
  parisbrestreinterpretation: { base: 8, baseLabel: "8 personnes", prixTotal: 8.00, calTotal: 3200, unite: "personne" },
  pouletcitronthym:   { base: 2, baseLabel: "2 personnes",  prixTotal: 5.50,  calTotal: 900,  unite: "personne" },
  salmonteriyaki:     { base: 2, baseLabel: "2 personnes",  prixTotal: 8.00,  calTotal: 1000, unite: "personne" },
  bolognaisemaison:   { base: 4, baseLabel: "4 personnes",  prixTotal: 6.00,  calTotal: 2400, unite: "personne" },
  tacosmaison:        { base: 2, baseLabel: "2 personnes",  prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  padthai:            { base: 2, baseLabel: "2 personnes",  prixTotal: 6.50,  calTotal: 1000, unite: "personne" },
  currypouletcoco:    { base: 4, baseLabel: "4 personnes",  prixTotal: 7.00,  calTotal: 1600, unite: "personne" },
  burgermaison:       { base: 2, baseLabel: "2 burgers",    prixTotal: 6.00,  calTotal: 1400, unite: "burger" },
  risottoprimavera:   { base: 4, baseLabel: "4 personnes",  prixTotal: 5.00,  calTotal: 1600, unite: "personne" },
  saumongravlax:      { base: 4, baseLabel: "4 personnes",  prixTotal: 12.00, calTotal: 800,  unite: "personne" },
  shakshuka:          { base: 2, baseLabel: "2 personnes",  prixTotal: 3.50,  calTotal: 600,  unite: "personne" },
  saladeniçoise:      { base: 4, baseLabel: "4 personnes",  prixTotal: 6.00,  calTotal: 800,  unite: "personne" },
  saladecesar:        { base: 4, baseLabel: "4 personnes",  prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  saladegreque:       { base: 4, baseLabel: "4 personnes",  prixTotal: 5.00,  calTotal: 600,  unite: "personne" },
  saladepatasthon:    { base: 4, baseLabel: "4 personnes",  prixTotal: 4.50,  calTotal: 1400, unite: "personne" },
  saladerizmediterranee: { base: 4, baseLabel: "4 personnes", prixTotal: 4.00, calTotal: 1200, unite: "personne" },
  tabulemaison:       { base: 4, baseLabel: "4 personnes",  prixTotal: 3.00,  calTotal: 800,  unite: "personne" },
  saladelentilles:    { base: 4, baseLabel: "4 personnes",  prixTotal: 4.00,  calTotal: 1000, unite: "personne" },
  saladeavocatcrevettes: { base: 4, baseLabel: "4 personnes", prixTotal: 8.00, calTotal: 800,  unite: "personne" },
  risotto:          { base: 4,  baseLabel: "4 personnes",  prixTotal: 5.00,  calTotal: 2000, unite: "personne" },
  gratindauphinois: { base: 6,  baseLabel: "6 personnes",  prixTotal: 4.50,  calTotal: 2400, unite: "personne" },
  cremebrulee:      { base: 6,  baseLabel: "6 ramequins",  prixTotal: 4.00,  calTotal: 2100, unite: "ramequin" },
  mousseauchocolat: { base: 6,  baseLabel: "6 personnes",  prixTotal: 3.50,  calTotal: 2400, unite: "personne" },
  ileflottante:     { base: 6,  baseLabel: "6 personnes",  prixTotal: 3.00,  calTotal: 1800, unite: "personne" },
  fondantchocolat:  { base: 6,  baseLabel: "6 fondants",   prixTotal: 3.80,  calTotal: 3000, unite: "fondant" },
  madeleine:        { base: 12, baseLabel: "12 madeleines",prixTotal: 2.50,  calTotal: 1800, unite: "madeleine" },
  bananabread:      { base: 8,  baseLabel: "8 tranches",   prixTotal: 2.80,  calTotal: 2400, unite: "tranche" },
  granola:          { base: 8,  baseLabel: "8 portions",   prixTotal: 4.00,  calTotal: 3200, unite: "portion" },
  veloutelegumes:   { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.50,  calTotal: 600,  unite: "personne" },
  houmous:          { base: 6,  baseLabel: "6 personnes",  prixTotal: 2.50,  calTotal: 900,   unite: "personne" },
  overnightoats:    { base: 1,  baseLabel: "1 pot",         prixTotal: 1.20,  calTotal: 350,   unite: "pot" },
  buddhaBowl:       { base: 2,  baseLabel: "2 bols",        prixTotal: 5.00,  calTotal: 900,   unite: "bol" },
  soupemiso:        { base: 2,  baseLabel: "2 personnes",   prixTotal: 2.50,  calTotal: 200,   unite: "personne" },
  wrappoulet:       { base: 2,  baseLabel: "2 wraps",       prixTotal: 4.00,  calTotal: 700,   unite: "wrap" },
  energyballs:      { base: 12, baseLabel: "12 balls",      prixTotal: 3.00,  calTotal: 1200,  unite: "ball" },
  pancakesproteine: { base: 2,  baseLabel: "2 pancakes",    prixTotal: 1.50,  calTotal: 300,   unite: "pancake" },
  bowlacai:         { base: 1,  baseLabel: "1 bol",         prixTotal: 4.00,  calTotal: 400,   unite: "bol" },
  saladepoischiches:{ base: 4,  baseLabel: "4 personnes",   prixTotal: 3.00,  calTotal: 800,   unite: "personne" },
  gaspacho:         { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.50,  calTotal: 400,   unite: "personne" },
  curryledumes:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.00,  calTotal: 1200,  unite: "personne" },
};

// ==============================
// INGRÉDIENTS POUR LES COURSES
// Extrait les ingrédients depuis n'importe quel type de recette
// ==============================
function getIngredientsCourses(nom, personnes) {
  const data = recettes[nom];
  if (!data) return {};
  const result = {};

  const ajout = (label, qte) => {
    if (!label || label.startsWith("---")) return;
    if (!result[label]) result[label] = { qte: 0, raw: null };
    if (typeof qte === "number") result[label].qte += qte;
    else result[label].raw = qte;
  };

  // Recettes avec ingredientsFixes
  if (data.fixe && data.ingredientsFixes) {
    data.ingredientsFixes.forEach(([k, v]) => {
      if (!k.startsWith("---")) ajout(k, v);
    });
    return result;
  }

  // Recettes avec tableau (trouver le bon tableau et la bonne ligne)
  const tableaux = {
    pizza:            { tbl: "tableauPatons",        key: "patons",   ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["💧 Eau", parseFloat(l.eau)],
      ["🧂 Sel", parseFloat(l.sel)], ["🟨 Levure fraîche", parseFloat(l.levure)]
    ]},
    crepes:           { tbl: "tableauPersonnes",     key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🥚 Œufs", parseFloat(l.oeufs)],
      ["🥛 Lait", parseFloat(l.lait)], ["🧈 Beurre", parseFloat(l.beurre)]
    ]},
    gaufres:          { tbl: "tableauGaufres",       key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🍬 Sucre", parseFloat(l.sucre)],
      ["🧈 Beurre", parseFloat(l.beurre)], ["🥛 Lait", parseFloat(l.lait.replace(" cl",""))]
    ]},
    brioche:          { tbl: "tableauBrioche",       key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🧈 Beurre froid", parseFloat(l.beurre)],
      ["🍬 Sucre", parseFloat(l.sucre)], ["🟨 Levure fraîche", parseFloat(l.levure)],
      ["🥛 Lait", l.lait !== "—" ? parseFloat(l.lait) : 0]
    ]},
    lasagne:          { tbl: "tableauLasagne",       key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🥚 Œufs", parseFloat(l.oeufs)]
    ]},
    cookies:          { tbl: "tableauCookies",       key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🧈 Beurre", parseFloat(l.beurre)],
      ["🍬 Sucre", parseFloat(l.sucre)], ["🍫 Chocolat noir", parseFloat(l.choco)], ["🥚 Œufs", l.oeuf]
    ]},
    muffins:          { tbl: "tableauMuffins",       key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🍫 Cacao", parseFloat(l.cacao)],
      ["🍬 Sucre", parseFloat(l.sucre)], ["🥛 Lait", parseFloat(l.lait)],
      ["🫒 Huile", parseFloat(l.huile)], ["🍫 Pépites chocolat", parseFloat(l.pepites)]
    ]},
    pancakes:         { tbl: "tableauPancakes",      key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🍬 Sucre", parseFloat(l.sucre)],
      ["🥛 Lait", parseFloat(l.lait)], ["🧈 Beurre", parseFloat(l.beurre)]
    ]},
    croquemonsieur:   { tbl: "tableauCroques",       key: "nb",       ingredients: (l) => [
      ["🍞 Pain de mie", l.pain], ["🥩 Jambon", l.jambon],
      ["🧀 Gruyère", parseFloat(l.gruyere)], ["🧈 Beurre", parseFloat(l.beurre)],
      ["🥛 Lait", parseFloat(l.lait)]
    ]},
    saladequinoa:     { tbl: "tableauQuinoa",        key: "nb",       ingredients: (l) => [
      ["🌾 Quinoa", parseFloat(l.quinoa)], ["🧀 Feta", parseFloat(l.feta)],
      ["🍅 Tomates cerises", l.tomates]
    ]},
    tartecitron:      { tbl: "tableauTarteCitron",   key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🧈 Beurre", parseFloat(l.beurrePate) + parseFloat(l.beurreCreme)],
      ["🍬 Sucre", parseFloat(l.sucreGlace) + parseFloat(l.sucreCreme)],
      ["🍋 Citrons", l.citrons]
    ]},
    tiramisu:         { tbl: "tableauTiramisu",      key: "nb",       ingredients: (l) => [
      ["🍪 Biscuits à la cuillère", l.biscuits],
      ["🧀 Mascarpone", parseFloat(l.mascarpone)], ["☕ Café expresso", l.cafe]
    ]},
    flan:             { tbl: "tableauFlan",          key: "nb",       ingredients: (l) => [
      ["🥛 Lait entier", parseFloat(l.lait)], ["🍬 Sucre", parseFloat(l.sucre)],
      ["🌾 Maïzena", parseFloat(l.maizena)], ["🍦 Crème liquide", parseFloat(l.creme)]
    ]},
    clafoutis:        { tbl: "tableauClafoutis",     key: "nb",       ingredients: (l) => [
      ["🍒 Cerises", parseFloat(l.cerises)], ["🍬 Sucre", parseFloat(l.sucre)],
      ["🌾 Farine", parseFloat(l.farine)], ["🥛 Lait", parseFloat(l.lait)]
    ]},
    tarteaupommes:    { tbl: "tableauTartePommes",   key: "nb",       ingredients: (l) => [
      ["🍎 Pommes", l.pommes], ["🧈 Beurre", parseFloat(l.beurre)], ["🍬 Sucre", parseFloat(l.sucre)]
    ]},
    cremebrulee:      { tbl: "tableauCremebrulee",   key: "nb",       ingredients: (l) => [
      ["🍦 Crème liquide", l.creme], ["🍬 Sucre", parseFloat(l.sucre)]
    ]},
    mousseauchocolat: { tbl: "tableauMousse",        key: "nb",       ingredients: (l) => [
      ["🍫 Chocolat noir", parseFloat(l.chocolat)], ["🍬 Sucre", parseFloat(l.sucre)]
    ]},
    fondantchocolat:  { tbl: "tableauFondant",       key: "nb",       ingredients: (l) => [
      ["🍫 Chocolat noir", parseFloat(l.chocolat)], ["🧈 Beurre", parseFloat(l.beurre)],
      ["🍬 Sucre", parseFloat(l.sucre)], ["🌾 Farine", parseFloat(l.farine)]
    ]},
    madeleine:        { tbl: "tableauMadeleine",     key: "nb",       ingredients: (l) => [
      ["🌾 Farine", parseFloat(l.farine)], ["🍬 Sucre", parseFloat(l.sucre)], ["🧈 Beurre", parseFloat(l.beurre)]
    ]},
    boeufbourguignon: { tbl: "tableauBoeuf",         key: "nb",       ingredients: (l) => [
      ["🥩 Bœuf", l.boeuf], ["🥕 Carottes", l.carottes],
      ["🥓 Lardons", l.lardons], ["🍄 Champignons", l.champignons]
    ]},
    gratindauphinois: { tbl: "tableauGratin",        key: "nb",       ingredients: (l) => [
      ["🥔 Pommes de terre", l.pdterre], ["🍦 Crème", l.creme], ["🥛 Lait", l.lait]
    ]},
    ileflottante:     { tbl: "tableauIleFlottante",  key: "nb",       ingredients: (l) => [
      ["🥛 Lait", l.lait], ["🍬 Sucre crème", l.sucreCreme], ["🍬 Sucre îles", l.sucreIles]
    ]},
    veloutelegumes:   { tbl: "tableauVeloute",       key: "nb",       ingredients: (l) => [
      ["🥕 Carottes", l.carottes], ["🎃 Courge butternut", l.courge], ["🍲 Bouillon", l.bouillon]
    ]},
    saladeniçoise:    { tbl: "tableauSaladeNicoise", key: "nb",       ingredients: (l) => [
      ["🐟 Thon", l.thon], ["🥚 Œufs durs", l.oeufs], ["🍅 Tomates", l.tomates], ["🫒 Olives", l.olives]
    ]},
    saladecesar:      { tbl: "tableauSaladeCesar",   key: "nb",       ingredients: (l) => [
      ["🍗 Poulet", l.poulet], ["🧀 Parmesan", l.parmesan]
    ]},
    saladegreque:     { tbl: "tableauSaladeGreque",  key: "nb",       ingredients: (l) => [
      ["🍅 Tomates", l.tomates], ["🥒 Concombre", l.concombre], ["🧀 Feta", l.feta], ["🫒 Olives", l.olives]
    ]},
    saladepatasthon:  { tbl: "tableauSaladePatas",   key: "nb",       ingredients: (l) => [
      ["🍝 Pâtes", l.pates], ["🐟 Thon", l.thon], ["🌽 Maïs", l.mais]
    ]},
    tabulemaison:     { tbl: "tableauTabule",         key: "nb",       ingredients: (l) => [
      ["🌾 Semoule", l.semoule], ["🍅 Tomates", l.tomates], ["🥒 Concombre", l.concombre]
    ]},
    saladelentilles:  { tbl: "tableauSaladeLentilles",key: "nb",       ingredients: (l) => [
      ["🫘 Lentilles", l.lentilles], ["🥕 Carottes", l.carottes], ["🥓 Lardons", l.lardons]
    ]},
    saladeavocatcrevettes:{ tbl: "tableauAvocatCrevettes", key: "nb", ingredients: (l) => [
      ["🥑 Avocats", l.avocats], ["🦐 Crevettes", l.crevettes]
    ]},
    gaspacho:         { tbl: "tableauGaspacho",      key: "nb",       ingredients: (l) => [
      ["🍅 Tomates", l.tomates], ["🥒 Concombre", l.concombre], ["🫑 Poivron rouge", l.poivron]
    ]},
    overnightoats:    { tbl: "tableauOvernightOats", key: "nb",       ingredients: (l) => [
      ["🌾 Flocons d'avoine", l.flocons], ["🥛 Lait végétal", l.lait], ["🥛 Yaourt grec", l.yaourt]
    ]},
    buddhaBowl:       { tbl: "tableauBuddhaBowl",    key: "nb",       ingredients: (l) => [
      ["🌾 Quinoa", l.quinoa], ["🍠 Patate douce", l.patatedouce],
      ["🫘 Pois chiches", l.poischiches], ["🥑 Avocat", l.avocat]
    ]},
    soupemiso:        { tbl: "tableauSoupeMiso",     key: "nb",       ingredients: (l) => [
      ["🧀 Tofu soyeux", l.tofu], ["🌿 Pâte miso", l.miso]
    ]},
    wrappoulet:       { tbl: "tableauWrapPoulet",    key: "nb",       ingredients: (l) => [
      ["🍗 Poulet", l.poulet], ["🫓 Tortillas", l.tortilla], ["🍅 Tomate", l.tomate]
    ]},
    pancakesproteine: { tbl: "tableauPancakesProteine", key: "nb",    ingredients: (l) => [
      ["🍌 Banane", l.banane], ["🥚 Œufs", l.oeufs]
    ]},
    bowlacai:         { tbl: "tableauBowlAcai",      key: "nb",       ingredients: (l) => [
      ["🫐 Purée açaï", l.acai], ["🍌 Banane", l.banane], ["🌾 Granola", l.granola]
    ]},
    saladepoischiches:{ tbl: "tableauSaladePoisChiches", key: "nb",   ingredients: (l) => [
      ["🫘 Pois chiches", l.poischiches], ["🍅 Tomates", l.tomates]
    ]},
    risotto:          { tbl: "tableauRisotto",       key: "nb",       ingredients: (l) => [
      ["🍚 Riz arborio", l.riz], ["🍷 Vin blanc", l.vin], ["🧀 Parmesan", l.parmesan]
    ]},
    goumeau:          { tbl: "tableauGoumeau",       key: "nb",       ingredients: (l) => [
      ["🌾 Farine", l.farine], ["🍬 Sucre", l.sucre], ["🟨 Levure", l.levure],
      ["🍦 Crème", l.creme]
    ]},
    paindemie:        { tbl: "tableauPainDeMie",     key: "nb",       ingredients: (l) => [
      ["🌾 Farine", l.farine], ["🥛 Lait", l.lait], ["🧈 Beurre", l.beurre]
    ]},
    bananabread:      { tbl: "tableauBananaBread",   key: "nb",       ingredients: (l) => [
      ["🍌 Bananes", l.bananes], ["🌾 Farine", l.farine], ["🍬 Sucre", l.sucre], ["🧈 Beurre", l.beurre]
    ]},
    granola:          { tbl: "tableauGranola",       key: "nb",       ingredients: (l) => [
      ["🌾 Flocons d'avoine", l.flocons], ["🍯 Miel", l.miel], ["🌰 Noix", l.noix]
    ]},
    houmous:          { tbl: "tableauHoumous",       key: "nb",       ingredients: (l) => [
      ["🫘 Pois chiches", l.poischiches], ["🫒 Tahini", l.tahini]
    ]},
    smoothiebowl:     { tbl: "tableauSmoothie",      key: "nb",       ingredients: (l) => [
      ["🍓 Fruits rouges", l.fruits], ["🍌 Banane", l.banane], ["🥛 Yaourt grec", l.yaourt]
    ]},
    yaourt:           { tbl: "tableauYaourt",        key: "nb",       ingredients: (l) => [
      ["🥛 Lait entier", l.lait]
    ]},
    energyballs:      { tbl: "tableauEnergyBalls",   key: "nb",       ingredients: (l) => [
      ["🌴 Dattes", l.dattes], ["🌰 Amandes", l.amandes], ["🌾 Flocons d'avoine", l.flocons]
    ]},
    saladequinoa:     { tbl: "tableauQuinoa",        key: "nb",       ingredients: (l) => [
      ["🌾 Quinoa", l.quinoa], ["🧀 Feta", l.feta]
    ]},
    saladerizmediterranee: { tbl: "tableauSaladeRiz", key: "nb",      ingredients: (l) => [
      ["🍚 Riz", l.riz], ["🫑 Poivron", l.poivron], ["🫒 Olives", l.olives]
    ]},
  };

  // Chercher aussi dans les recettes avec tableauXxx en cherchant dynamiquement
  if (!tableaux[nom]) {
    // Chercher le premier tableau disponible dans la recette
    const cleTbl = Object.keys(data).find(k => k.startsWith("tableau") && Array.isArray(data[k]));
    if (cleTbl && data[cleTbl].length > 0) {
      const ligne = data[cleTbl].find(l => l.nb === personnes) || data[cleTbl][Math.floor(data[cleTbl].length/2)];
      if (ligne) {
        Object.entries(ligne).forEach(([k, v]) => {
          if (k === "nb") return;
          // Convertir camelCase en label lisible
          const label = k.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase()).trim();
          ajout(label, v);
        });
        return result;
      }
    }
  }

  const cfg = tableaux[nom];
  if (cfg && data[cfg.tbl]) {
    const ligne = data[cfg.tbl].find(l => l[cfg.key] === personnes)
      || data[cfg.tbl][Math.min(3, data[cfg.tbl].length-1)];
    if (ligne) {
      cfg.ingredients(ligne).forEach(([k, v]) => ajout(k, v));
    }
    return result;
  }

  // Fallback : ingredients standard
  if (data.ingredients && Object.keys(data.ingredients).length > 0) {
    const ratio = personnes / (data.base || 4);
    Object.entries(data.ingredients).forEach(([k, v]) => {
      ajout(k, typeof v === "number" ? Math.round(v * ratio * 10) / 10 : v);
    });
    return result;
  }

  // Fallback universel : chercher dans toutes les tables globales
  // et extraire les ingrédients depuis le tableau de la recette
  const toutesLesTables = [
    window._nouvellesRecettesTables,
    window.mondeClassiquesTablesGlobal,
    window.hellofreshTablesGlobal,
    window.cocktailsTablesGlobal,
  ].filter(Boolean);

  for (const tables of toutesLesTables) {
    if (tables[nom] && data[tables[nom].table]) {
      const tbl = data[tables[nom].table];
      const ligne = tbl.find(l => l.nb === personnes) || tbl[Math.floor(tbl.length / 2)];
      if (ligne) {
        // Extraire toutes les clés non-nb comme ingrédients
        Object.entries(ligne).forEach(([k, v]) => {
          if (k === "nb") return;
          const label = k.charAt(0).toUpperCase() + k.slice(1);
          ajout(label, v);
        });
      }
      return result;
    }
  }

  // Dernier recours : ingredientsFixes
  if (data.ingredientsFixes) {
    data.ingredientsFixes.forEach(([k, v]) => {
      if (!k.startsWith("---")) ajout(k, v);
    });
  }

  return result;
}

function afficherCoursesRecette(nom, personnes) {
  const id = "courses-recette-" + nom;
  const bloc = document.getElementById(id);
  if (!bloc) return;

  // Toggle
  if (bloc.style.display !== "none") {
    bloc.style.display = "none";
    return;
  }

  const ingrs = getIngredientsCourses(nom, personnes);
  const entries = Object.entries(ingrs).filter(([k]) => !k.startsWith("---"));

  if (entries.length === 0) {
    bloc.innerHTML = '<p style="color:#aaa;font-size:13px;text-align:center;padding:10px">Liste non disponible pour cette recette.</p>';
    bloc.style.display = "block";
    return;
  }

  let html = `<div class="courses-recette-liste">`;
  entries.sort((a,b) => a[0].localeCompare(b[0])).forEach(([nom, data]) => {
    let qteStr = "";
    if (typeof data.qte === "number" && data.qte > 0) {
      qteStr = data.qte % 1 === 0 ? `${data.qte}` : `${data.qte.toFixed(1)}`;
    } else if (data.raw) {
      qteStr = data.raw;
    }
    html += `<div class="courses-recette-item">
      <span class="courses-recette-nom">${nom}</span>
      <span class="courses-recette-qte">${qteStr}</span>
    </div>`;
  });
  html += "</div>";

  bloc.innerHTML = html;
  bloc.style.display = "block";
}

function htmlPrixCalories(nom, quantite) {
  const pc = prixCalories[nom];
  if (!pc) return "";
  const data = recettes[nom];
  let ratio = 1;
  if (data && data.fixe) {
    ratio = 1;
  } else if (nom === "brioche") {
    // 1=1 avec lait, 2=2 avec lait, 3=1 sans lait, 4=2 sans lait
    ratio = (quantite === 2 || quantite === 4) ? 2 : 1;
  } else {
    ratio = quantite / pc.base;
  }
  const prix  = (pc.prixTotal * ratio).toFixed(2);
  const cal   = Math.round(pc.calTotal * ratio);
  const calPar = Math.round(pc.calTotal / pc.base);
  return `
    <div class="prix-cal-bloc">
      <div class="prix-cal-item">
        <span class="pc-icone">💰</span>
        <div class="pc-valeur">${prix} €</div>
        <div class="pc-label">Coût estimé</div>
      </div>
      <div class="prix-cal-item">
        <span class="pc-icone">🔥</span>
        <div class="pc-valeur">${cal} kcal</div>
        <div class="pc-label">Total recette</div>
      </div>
      <div class="prix-cal-item">
        <span class="pc-icone">👤</span>
        <div class="pc-valeur">${calPar} kcal</div>
        <div class="pc-label">Par ${pc.unite}</div>
      </div>
    </div>
    <p class="prix-cal-note">* Prix moyens supermarché France 2025</p>
    <button class="btn-courses-recette" onclick="afficherCoursesRecette('${nom}', ${quantite})">
      🛒 Liste de courses
    </button>
    <div class="courses-recette-bloc" id="courses-recette-${nom}" style="display:none"></div>
  `;
}

// =============================
// FICHE PLEINE PAGE
// =============================

function choisirRecette(nom) {
  const data = recettes[nom];
  if (!data) return;

  const inputPersonnes = document.getElementById("personnes");
  const personnes = inputPersonnes ? parseInt(inputPersonnes.value) || data.base : data.base;
  const ratio = personnes / data.base;

  // Label quantité
  const briocheVersions = { 1: "1 brioche 🥛", 2: "2 brioches 🥛", 3: "1 brioche 🥛🚫", 4: "2 brioches 🥛🚫" };
  const labelQte = (nom === "patefeuilletee" || nom === "patebrisee")
    ? "🥧 1 pâte (~28 cm)"
    : nom === "patesablee"
    ? "🍪 1 pâte (~28 cm)"
    : nom === "painbaguette"
    ? "🥖 1 baguette (~250g)"
    : nom === "pizza"
    ? `🍕 ${personnes} pâton${personnes > 1 ? "s" : ""}`
    : nom === "brioche"
    ? `🍞 ${briocheVersions[personnes] || personnes}`
    : `👥 ${personnes} personne${personnes > 1 ? "s" : ""}`;

  // Ingrédients
  let listeIngredients = "";
  if (nom === "pizza" && data.tableauPatons) {
    const ligne = data.tableauPatons.find(l => l.patons === personnes);
    if (ligne) listeIngredients = htmlTableauPizzaColonnes(ligne);
  } else if (nom === "crepes" && data.tableauPersonnes) {
    const ligne = data.tableauPersonnes.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauCrepesColonnes(ligne);
  } else if (nom === "gaufres" && data.tableauGaufres) {
    const ligne = data.tableauGaufres.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauGaufresColonnes(ligne);
  } else if (nom === "overnightoats" && data.tableauOvernightOats) {
    const ligne = data.tableauOvernightOats.find(l => l.nb === personnes) || data.tableauOvernightOats[0];
    listeIngredients = htmlTableauOvernightOatsColonnes(ligne);
  } else if (nom === "buddhaBowl" && data.tableauBuddhaBowl) {
    const ligne = data.tableauBuddhaBowl.find(l => l.nb === personnes) || data.tableauBuddhaBowl[1];
    listeIngredients = htmlTableauBuddhaBowlColonnes(ligne);
  } else if (nom === "soupemiso" && data.tableauSoupeMiso) {
    const ligne = data.tableauSoupeMiso.find(l => l.nb === personnes) || data.tableauSoupeMiso[1];
    listeIngredients = htmlTableauSoupeMisoColonnes(ligne);
  } else if (nom === "wrappoulet" && data.tableauWrapPoulet) {
    const ligne = data.tableauWrapPoulet.find(l => l.nb === personnes) || data.tableauWrapPoulet[1];
    listeIngredients = htmlTableauWrapPouletColonnes(ligne);
  } else if (nom === "energyballs" && data.tableauEnergyBalls) {
    const ligne = data.tableauEnergyBalls.find(l => l.nb === personnes) || data.tableauEnergyBalls[2];
    listeIngredients = htmlTableauEnergyBallsColonnes(ligne);
  } else if (nom === "pancakesproteine" && data.tableauPancakesProteine) {
    const ligne = data.tableauPancakesProteine.find(l => l.nb === personnes) || data.tableauPancakesProteine[1];
    listeIngredients = htmlTableauPancakesProteineColonnes(ligne);
  } else if (nom === "bowlacai" && data.tableauBowlAcai) {
    const ligne = data.tableauBowlAcai.find(l => l.nb === personnes) || data.tableauBowlAcai[0];
    listeIngredients = htmlTableauBowlAcaiColonnes(ligne);
  } else if (nom === "saladepoischiches" && data.tableauSaladePoisChiches) {
    const ligne = data.tableauSaladePoisChiches.find(l => l.nb === personnes) || data.tableauSaladePoisChiches[3];
    listeIngredients = htmlTableauSaladePoisChichesColonnes(ligne);
  } else if (nom === "gaspacho" && data.tableauGaspacho) {
    const ligne = data.tableauGaspacho.find(l => l.nb === personnes) || data.tableauGaspacho[3];
    listeIngredients = htmlTableauGaspachoColonnes(ligne);
  } else if (nom === "curryledumes" && data.tableauCurryLegumes) {
    const ligne = data.tableauCurryLegumes.find(l => l.nb === personnes) || data.tableauCurryLegumes[3];
    listeIngredients = htmlTableauCurryLegumesColonnes(ligne);
  } else if (nom === "smoothiebowl" && data.tableauSmoothie) {
    const ligne = data.tableauSmoothie.find(l => l.nb === personnes) || data.tableauSmoothie[1];
    listeIngredients = htmlTableauSmoothieColonnes(ligne);
  } else if (nom === "yaourt" && data.tableauYaourt) {
    const ligne = data.tableauYaourt.find(l => l.nb === personnes) || data.tableauYaourt[3];
    listeIngredients = htmlTableauYaourtColonnes(ligne);
  } else if (nom === "pancakes" && data.tableauPancakes) {
    const ligne = data.tableauPancakes.find(l => l.nb === personnes) || data.tableauPancakes[3];
    listeIngredients = htmlTableauPancakesColonnes(ligne);
  } else if (nom === "muffins" && data.tableauMuffins) {
    const ligne = data.tableauMuffins.find(l => l.nb === personnes) || data.tableauMuffins[11];
    listeIngredients = htmlTableauMuffinsColonnes(ligne);
  } else if (nom === "croquemonsieur" && data.tableauCroques) {
    const ligne = data.tableauCroques.find(l => l.nb === personnes) || data.tableauCroques[3];
    listeIngredients = htmlTableauCroquesColonnes(ligne);
  } else if (nom === "saladeniçoise" && data.tableauSaladeNicoise) {
    const ligne = data.tableauSaladeNicoise.find(l => l.nb === personnes) || data.tableauSaladeNicoise[3];
    listeIngredients = htmlTableauSaladeNicoiseColonnes(ligne);
  } else if (nom === "saladecesar" && data.tableauSaladeCesar) {
    const ligne = data.tableauSaladeCesar.find(l => l.nb === personnes) || data.tableauSaladeCesar[3];
    listeIngredients = htmlTableauSaladeCesarColonnes(ligne);
  } else if (nom === "saladegreque" && data.tableauSaladeGreque) {
    const ligne = data.tableauSaladeGreque.find(l => l.nb === personnes) || data.tableauSaladeGreque[3];
    listeIngredients = htmlTableauSaladeGrequeColonnes(ligne);
  } else if (nom === "saladepatasthon" && data.tableauSaladePatas) {
    const ligne = data.tableauSaladePatas.find(l => l.nb === personnes) || data.tableauSaladePatas[3];
    listeIngredients = htmlTableauSaladePatasColonnes(ligne);
  } else if (nom === "saladerizmediterranee" && data.tableauSaladeRiz) {
    const ligne = data.tableauSaladeRiz.find(l => l.nb === personnes) || data.tableauSaladeRiz[3];
    listeIngredients = htmlTableauSaladeRizColonnes(ligne);
  } else if (nom === "tabulemaison" && data.tableauTabule) {
    const ligne = data.tableauTabule.find(l => l.nb === personnes) || data.tableauTabule[3];
    listeIngredients = htmlTableauTabuleColonnes(ligne);
  } else if (nom === "saladelentilles" && data.tableauSaladeLentilles) {
    const ligne = data.tableauSaladeLentilles.find(l => l.nb === personnes) || data.tableauSaladeLentilles[3];
    listeIngredients = htmlTableauSaladeLentillesColonnes(ligne);
  } else if (nom === "saladeavocatcrevettes" && data.tableauAvocatCrevettes) {
    const ligne = data.tableauAvocatCrevettes.find(l => l.nb === personnes) || data.tableauAvocatCrevettes[3];
    listeIngredients = htmlTableauAvocatCrevettesColonnes(ligne);
  } else if (nom === "goumeau" && data.tableauGoumeau) {
    const ligne = data.tableauGoumeau.find(l => l.nb === personnes) || data.tableauGoumeau[3];
    listeIngredients = htmlTableauGoumeauColonnes(ligne);
  } else if (nom === "galettetacos" && data.tableauGaletteTacos) {
    const ligne = data.tableauGaletteTacos.find(l => l.nb === personnes) || data.tableauGaletteTacos[3];
    listeIngredients = htmlTableauGaletteTacosColonnes(ligne);
  } else if (nom === "painburger" && data.tableauPainBurger) {
    const ligne = data.tableauPainBurger.find(l => l.nb === personnes) || data.tableauPainBurger[2];
    listeIngredients = htmlTableauPainBurgerColonnes(ligne);
  } else if (nom === "paindemie" && data.tableauPainDeMie) {
    const ligne = data.tableauPainDeMie.find(l => l.nb === personnes) || data.tableauPainDeMie[19];
    listeIngredients = htmlTableauPainDeMieColonnes(ligne);
  } else if (nom === "tiramisu" && data.tableauTiramisu) {
    const ligne = data.tableauTiramisu.find(l => l.nb === personnes) || data.tableauTiramisu[5];
    listeIngredients = htmlTableauTiramisuColonnes(ligne);
  } else if (nom === "flan" && data.tableauFlan) {
    const ligne = data.tableauFlan.find(l => l.nb === personnes) || data.tableauFlan[5];
    listeIngredients = htmlTableauFlanColonnes(ligne);
  } else if (nom === "clafoutis" && data.tableauClafoutis) {
    const ligne = data.tableauClafoutis.find(l => l.nb === personnes) || data.tableauClafoutis[5];
    listeIngredients = htmlTableauClafoutisColonnes(ligne);
  } else if (nom === "tarteaupommes" && data.tableauTartePommes) {
    const ligne = data.tableauTartePommes.find(l => l.nb === personnes) || data.tableauTartePommes[5];
    listeIngredients = htmlTableauTartePommesColonnes(ligne);
  } else if (window._nouvellesRecettesTables && window._nouvellesRecettesTables[nom] && data[window._nouvellesRecettesTables[nom].table]) {
    const cfgN = window._nouvellesRecettesTables[nom];
    const ligneN = data[cfgN.table].find(l => l.nb === personnes) || data[cfgN.table][Math.floor(data[cfgN.table].length/2)];
    listeIngredients = cfgN.fn(ligneN);
  } else if (cocktailsTablesGlobal && cocktailsTablesGlobal[nom] && data[cocktailsTablesGlobal[nom].table]) {
    const cfgC = cocktailsTablesGlobal[nom];
    const ligneC = data[cfgC.table].find(l => l.nb === personnes) || data[cfgC.table][0];
    listeIngredients = cfgC.fn(ligneC);
  } else if (nom === "parisbrestreinterpretation" && data.tableauParisBrest) {
    const ligne = data.tableauParisBrest.find(l => l.nb === personnes) || data.tableauParisBrest[7];
    listeIngredients = htmlTableauParisBrestColonnes(ligne);
  } else if (nom === "saumongravlax" && data.tableauGravlax) {
    const ligne = data.tableauGravlax.find(l => l.nb === personnes) || data.tableauGravlax[3];
    listeIngredients = htmlTableauGravlaxColonnes(ligne);
  } else if (nom === "verrinetiramisu" && data.tableauVerrineTiramisu) {
    const ligne = data.tableauVerrineTiramisu.find(l => l.nb === personnes) || data.tableauVerrineTiramisu[5];
    listeIngredients = htmlTableauVerrineTiramisuColonnes(ligne);
  } else if (nom === "potaufeu" && data.tableauPotAuFeu) {
    const ligne = data.tableauPotAuFeu.find(l => l.nb === personnes) || data.tableauPotAuFeu[5];
    listeIngredients = htmlTableauPotAuFeuColonnes(ligne);
  } else if (mondeClassiquesTablesGlobal && mondeClassiquesTablesGlobal[nom] && data[mondeClassiquesTablesGlobal[nom].table]) {
    const cfg2 = mondeClassiquesTablesGlobal[nom];
    const ligne2 = data[cfg2.table].find(l => l.nb === personnes) || data[cfg2.table][1];
    listeIngredients = cfg2.fn(ligne2);
  } else if (hellofreshTablesGlobal && hellofreshTablesGlobal[nom] && data[hellofreshTablesGlobal[nom].table]) {
    const cfg = hellofreshTablesGlobal[nom];
    const ligne = data[cfg.table].find(l => l.nb === personnes) || data[cfg.table][1];
    listeIngredients = cfg.fn(ligne);
  } else if (nom === "boeufbourguignon" && data.tableauBoeuf) {
    const ligne = data.tableauBoeuf.find(l => l.nb === personnes) || data.tableauBoeuf[2];
    listeIngredients = htmlTableauBoeufColonnes(ligne);
  } else if (nom === "gratindauphinois" && data.tableauGratin) {
    const ligne = data.tableauGratin.find(l => l.nb === personnes) || data.tableauGratin[2];
    listeIngredients = htmlTableauGratinColonnes(ligne);
  } else if (nom === "cremebrulee" && data.tableauCremebrulee) {
    const ligne = data.tableauCremebrulee.find(l => l.nb === personnes) || data.tableauCremebrulee[2];
    listeIngredients = htmlTableauCremeBruleeColonnes(ligne);
  } else if (nom === "mousseauchocolat" && data.tableauMousse) {
    const ligne = data.tableauMousse.find(l => l.nb === personnes) || data.tableauMousse[2];
    listeIngredients = htmlTableauMousseColonnes(ligne);
  } else if (nom === "ileflottante" && data.tableauIleFlottante) {
    const ligne = data.tableauIleFlottante.find(l => l.nb === personnes) || data.tableauIleFlottante[2];
    listeIngredients = htmlTableauIleFlottanteColonnes(ligne);
  } else if (nom === "bananabread" && data.tableauBananaBread) {
    const ligne = data.tableauBananaBread.find(l => l.nb === personnes) || data.tableauBananaBread[4];
    listeIngredients = htmlTableauBananaBreadColonnes(ligne);
  } else if (nom === "granola" && data.tableauGranola) {
    const ligne = data.tableauGranola.find(l => l.nb === personnes) || data.tableauGranola[4];
    listeIngredients = htmlTableauGranolaColonnes(ligne);
  } else if (nom === "houmous" && data.tableauHoumous) {
    const ligne = data.tableauHoumous.find(l => l.nb === personnes) || data.tableauHoumous[2];
    listeIngredients = htmlTableauHoumousColonnes(ligne);
  } else if (nom === "risotto" && data.tableauRisotto) {
    const ligne = data.tableauRisotto.find(l => l.nb === personnes) || data.tableauRisotto[3];
    listeIngredients = htmlTableauRisottoColonnes(ligne);
  } else if (nom === "fondantchocolat" && data.tableauFondant) {
    const ligne = data.tableauFondant.find(l => l.nb === personnes) || data.tableauFondant[5];
    listeIngredients = htmlTableauFondantColonnes(ligne);
  } else if (nom === "madeleine" && data.tableauMadeleine) {
    const ligne = data.tableauMadeleine.find(l => l.nb === personnes) || data.tableauMadeleine[11];
    listeIngredients = htmlTableauMadeleineColonnes(ligne);
  } else if (nom === "veloutelegumes" && data.tableauVeloute) {
    const ligne = data.tableauVeloute.find(l => l.nb === personnes) || data.tableauVeloute[3];
    listeIngredients = htmlTableauVelouteLegumesColonnes(ligne);
  } else if (nom === "tartecitron" && data.tableauTarteCitron) {
    const ligne = data.tableauTarteCitron.find(l => l.nb === personnes) || data.tableauTarteCitron[5];
    listeIngredients = htmlTableauTarteCitronColonnes(ligne);
  } else if (nom === "saladequinoa" && data.tableauQuinoa) {
    const ligne = data.tableauQuinoa.find(l => l.nb === personnes) || data.tableauQuinoa[3];
    listeIngredients = htmlTableauQuinoaColonnes(ligne);
  } else if (nom === "lasagne" && data.tableauLasagne) {
    const ligne = data.tableauLasagne.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauLasagneColonnes(ligne);
  } else if (nom === "cookies" && data.tableauCookies) {
    const ligne = data.tableauCookies.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauCookiesColonnes(ligne);
  } else if (nom === "brioche" && data.tableauBrioche) {
    const ligne = data.tableauBrioche.find(l => l.nb === personnes) || data.tableauBrioche[0];
    const boutons = data.tableauBrioche.map(l => `
      <button class="btn-brioche${l.nb === ligne.nb ? " btn-brioche-actif" : ""}"
        onclick="document.getElementById('personnes').value=${l.nb};calculer()">
        ${l.label}
      </button>`).join("");
    listeIngredients = `<div class="brioche-choix">${boutons}</div>` + htmlTableauBriocheColonnes(ligne);
  } else if (nom === "patefeuilletee" || nom === "patebrisee" || nom === "patesablee" || nom === "painbaguette") {
    // Recettes fixes sans calcul — afficher ingredientsFixes directement
    if (data.ingredientsFixes) {
      let rows = data.ingredientsFixes.map(([k,v]) =>
        `<tr><th>${k}</th><td>${v}</td></tr>`).join("");
      listeIngredients = `<table class="tableau-patons tableau-colonnes"><tbody>${rows}</tbody></table>`;
    }
  } else if (data.fixe && data.ingredientsFixes) {
    let rows = data.ingredientsFixes.map(([k,v]) =>
      `<tr><th>${k}</th><td>${v}</td></tr>`).join("");
    listeIngredients = `<table class="tableau-patons tableau-colonnes"><tbody>${rows}</tbody></table>`;
  } else {
    for (const [nom_i, qte] of Object.entries(data.ingredients)) {
      const qteCalculee = (qte * ratio).toFixed(1);
      listeIngredients += `<div class="fiche-ingredient"><span>${nom_i}</span><b>${qteCalculee}</b></div>`;
    }
  }

  // Étapes
  let listeEtapes = "";
  data.etapes.forEach((etape, i) => {
    listeEtapes += `
      <div class="fiche-etape">
        <div class="fiche-etape-num">${etape.icone || (i + 1)}</div>
        <div class="fiche-etape-contenu">
          <h3>${etape.titre}</h3>
          <p>${etape.detail}</p>
          ${etape.badge ? `<span class="etape-badge">${etape.badge}</span>` : ""}
        </div>
      </div>`;
  });

  // Afficher dans la modal
  const nomsAffichage = {
    "croquemonsieur":    "Croque-monsieur",
    "cremebrulee":       "Crème brûlée",
    "tarteaupommes":     "Tarte aux pommes",
    "tartecitron":       "Tarte au citron",
    "boeufbourguignon":  "Bœuf bourguignon",
    "gratindauphinois":  "Gratin dauphinois",
    "mousseauchocolat":  "Mousse au chocolat",
    "fondantchocolat":   "Fondant au chocolat",
    "ileflottante":      "Île flottante",
    "bananabread":       "Banana bread",
    "veloutelegumes":    "Velouté de légumes",
    "saladeniçoise":     "Salade niçoise",
    "saladecesar":       "Salade César",
    "saladegreque":      "Salade grecque",
    "saladepatasthon":   "Salade pâtes thon",
    "saladerizmediterranee": "Salade de riz méditerranéenne",
    "tabulemaison":      "Taboulé maison",
    "saladelentilles":   "Salade de lentilles",
    "saladeavocatcrevettes": "Salade avocat crevettes",
    "smoothiebowl":      "Smoothie Bowl",
    "goumeau":           "Galette de Goumeau",
    "painbaguette":      "Pain — Baguette",
    "painburger":        "Pain Burger (Buns)",
    "galettetacos":      "Galette à Tacos",
    "overnightoats":     "Overnight Oats",
    "buddhaBowl":        "Buddha Bowl",
    "soupemiso":         "Soupe Miso",
    "wrappoulet":        "Wrap au Poulet",
    "energyballs":       "Energy Balls",
    "pancakesproteine":  "Pancakes Protéinés",
    "bowlacai":          "Bowl Açaï",
    "saladepoischiches": "Salade de Pois Chiches",
    "gaspacho":          "Gaspacho",
    "curryledumes":      "Curry de Légumes",
    "pouletcitronthym":  "Poulet Citron & Thym",
    "salmonteriyaki":    "Saumon Teriyaki",
    "bolognaisemaison":  "Bolognaise Maison",
    "tacosmaison":       "Tacos Maison",
    "padthai":           "Pad Thaï",
    "currypouletcoco":   "Curry Poulet Coco",
    "burgermaison":      "Burger Maison",
    "risottoprimavera":  "Risotto Primavera",
    "saumongravlax":     "Saumon Gravlax",
    "shakshuka":         "Shakshuka",
    "couscous":          "Couscous Royal",
    "mojito":            "Mojito",
    "mojitorose":        "Mojito Rosé",
    "negroni":           "Negroni",
    "moscowmule":        "Moscow Mule",
    "pornstarmartini":   "Porn Star Martini",
    "hugospritz":        "Hugo Spritz",
    "cherryblossommocktail": "Cherry Blossom",
    "oldFashioned":      "Old Fashioned",
    "gintoniqmaison":    "Gin Tonic Maison",
    "shrubframboisebasilic": "Shrub Framboise Basilic",
    "mocktailcoconananas":   "Mocktail Coco Ananas",
    "margarita":         "Margarita",
    "cosmopolitan":      "Cosmopolitan",
    "spritz":            "Spritz Aperol",
    "sangria":           "Sangria",
    "pinacolada":        "Piña Colada",
    "daiquiri":          "Daiquiri",
    "whiskysour":        "Whisky Sour",
    "virginmojito":      "Virgin Mojito",
    "limonademaison":    "Limonade Maison",
    "smoothiemangopassion": "Smoothie Mangue Passion",
    "citronadementhe":   "Citronnade à la Menthe",
    "jusPastequeMenuthe":"Jus Pastèque Menthe",
    "virginpinacolada":  "Virgin Piña Colada",
    "moussaka":          "Moussaka",
    "paella":            "Paella",
    "butterchicken":     "Butter Chicken",
    "souvlaki":          "Souvlaki",
    "quichelorraine":    "Quiche Lorraine",
    "soupeaoignon":      "Soupe à l'Oignon",
    "dalindien":         "Dal Indien",
    "rizcantonnais":     "Riz Cantonnais",
    "hariramarocaine":   "Harira Marocaine",
    "naan":              "Naans",
    "verrinetiramisu":   "Verrines Tiramisu",
    "churros":           "Churros",
    "potaufeu":          "Pot-au-Feu",
    "parisbrestreinterpretation": "Paris-Brest",
    "ramenjaponais":     "Ramen Japonais",
    "pizzareine":        "Pizza Reine",
    "pizzaquattroformaggi": "Pizza Quattro Formaggi",
    "pizzadiavola":      "Pizza Diavola",
    "pizzasaumonepinards":"Pizza Saumon Épinards",
    "pizzavegetarienne": "Pizza Végétarienne",
    "souvlakiagneau":    "Souvlaki d'Agneau",
    "tom_yam":           "Soupe Tom Yam",
    "dorade_chermoula":  "Dorade à la Chermoula",
    "pouletchicken65":   "Chicken 65",
    "pierogi":           "Pierogi",
    "momos":             "Momos Tibétains",
    "shakshukaverte":    "Shakshuka Verte",
    "kebbeh":            "Kebbeh Libanais",
    "tteokbokki":        "Tteokbokki",
    "porc_pulled":       "Pulled Pork",
    "dosakerdosai":      "Dosa",
    "braiseboeuf_asiatique": "Joues de Bœuf Braisées",
    "paprikashpoulet":   "Paprikash de Poulet",
    "gyoza":             "Gyoza",
    "tikamasala":        "Poulet Tikka Masala",
    "phovietnambien":    "Pho Vietnamien",
    "pizzamargherita":   "Pizza Margherita",
    "carbonara":         "Carbonara",
    "ceebujen":          "Thiéboudienne (Ceebu Jen)",
    "mafewestafricain":  "Maafé",
    "gnocchismaison":    "Gnocchis Maison",
    "falafel":           "Falafel",
    "poulettandoori":    "Poulet Tandoori",
    "pekinduckeasy":     "Canard Laqué Pékinois",
    "ossobuco":          "Osso Buco",
    "tajinemouton":      "Tajine d'Agneau",
    "moelleuxchocolat":  "Moelleux au Chocolat",
    "cheesecake":        "Cheesecake New-Yorkais",
    "painauchocolat":    "Pain au Chocolat",
    "gateaubasque":      "Gâteau Basque",
    "canelebordelais":   "Cannelés Bordelais",
    "paindemie":         "Pain de mie",
    "patefeuilletee":    "Pâte feuilletée",
    "patebrisee":        "Pâte brisée",
    "patesablee":        "Pâte sablée",
    "saladequinoa":      "Salade de quinoa",
  };
  const nomPropre = nomsAffichage[nom] || (nom.charAt(0).toUpperCase() + nom.slice(1));
  document.getElementById("modal-resultat").innerHTML = `
    <div class="fiche-modal-header">
      <div class="fiche-emoji">${data.emoji}</div>
      <h2 class="fiche-titre">${nomPropre}</h2>
      <p class="fiche-desc">${data.description}</p>
      <div class="fiche-meta">
        <span>⏱ ${data.temps}</span>
        <span>${data.niveau}</span>
        <span>${labelQte}</span>
      </div>
    </div>
    ${htmlPrixCalories(nom, personnes)}
    <div class="fiche-section">
      <h2 class="fiche-section-titre">🛒 Ingrédients</h2>
      <div class="fiche-ingredients-liste">${listeIngredients}</div>
    </div>
    <div class="fiche-section">
      <h2 class="fiche-section-titre">📋 Étapes</h2>
      <div class="fiche-etapes-liste">${listeEtapes}</div>
    </div>`;

  document.getElementById("modal-calc").classList.add("visible");
  document.getElementById("modal-resultat").parentElement.scrollTop = 0;
}

// initTablesGlobales() déplacé en fin de fichier

// Initialiser les tables globales — après toutes les définitions de fonctions
initTablesGlobales();
