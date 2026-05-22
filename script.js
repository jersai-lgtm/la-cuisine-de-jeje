const recettes = {

  pizza: {
    base: 4,
    temps: "48h fermentation",
    niveau: "⭐ Moyen",
    emoji: "🍕",
    description: "Une pizza napolitaine authentique avec une pâte légère et croustillante grâce à une longue fermentation.",
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

  Crêpes: {
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

  Gaufres: {
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

  Brioche: {
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

  Lasagne: {
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

  Cookies: {
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



  Salade niçoise: {
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

  Salade césar: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🍞", titre: "Faire les croûtons",        detail: "Couper le pain en cubes. Les faire dorer à la poêle avec un filet d'huile d'olive et une gousse d'ail écrasée. Réserver.", badge: "⏱ 5 min" },
      { icone: "🍗", titre: "Griller le poulet",         detail: "Saler, poivrer et griller les escalopes de poulet à la poêle ou au four. Laisser reposer 5 min puis couper en tranches.", badge: "⏱ 10 min" },
      { icone: "🥚", titre: "Préparer la sauce César",   detail: "Mélanger : 2 jaunes d'œufs, 1 c.à.s de moutarde, jus de citron, ail pressé, 4 c.à.s d'huile d'olive, parmesan râpé, sel, poivre. Fouetter jusqu'à émulsion.", badge: null },
      { icone: "🥬", titre: "Dresser",                   detail: "Laver et déchirer la laitue romaine. La mélanger avec la sauce César. Disposer le poulet en tranches, les croûtons et des copeaux de parmesan.", badge: null },
    ]
  },

  Salade greque: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🍅", titre: "Couper les légumes",    detail: "Couper les tomates en quartiers, le concombre en demi-rondelles, l'oignon rouge en fines lamelles. Disposer dans un saladier.", badge: null },
      { icone: "🫒", titre: "Ajouter les olives",    detail: "Ajouter les olives noires de Kalamata. Émietter ou couper la feta en cubes et disposer par-dessus.", badge: null },
      { icone: "🌿", titre: "Assaisonner",           detail: "Arroser d'huile d'olive généreusement. Saupoudrer d'origan séché. Saler légèrement (la feta est déjà salée), poivrer. Servir immédiatement.", badge: null },
    ]
  },

  Salade pâtes thon: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🍝", titre: "Cuire les pâtes",       detail: "Cuire les pâtes courtes (fusilli, farfalle, penne) dans l'eau bouillante salée. Les égoutter et les rincer à l'eau froide pour stopper la cuisson. Laisser refroidir.", badge: "⏱ selon paquet" },
      { icone: "🐟", titre: "Préparer le thon",      detail: "Égoutter le thon et l'émietter. Couper les tomates cerises en deux, émincer l'oignon.", badge: null },
      { icone: "🥗", titre: "Assembler",             detail: "Mélanger les pâtes froides avec le thon, les tomates, le maïs et l'oignon. Ajouter des olives et du basilic si souhaité.", badge: null },
      { icone: "🫒", titre: "Assaisonner",           detail: "Assaisonner avec de l'huile d'olive, du vinaigre de cidre, du sel et du poivre. Bien mélanger. Réfrigérer 30 min avant de servir.", badge: "⏱ 30 min au frais" },
    ]
  },

  Salade riz méditerranéenne: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🍚", titre: "Cuire le riz",          detail: "Cuire le riz dans l'eau bouillante salée. Égoutter et rincer à l'eau froide. Laisser refroidir complètement.", badge: "⏱ 15 min" },
      { icone: "🔥", titre: "Griller les légumes",   detail: "Couper poivron et courgette en dés. Faire griller à la poêle avec un filet d'huile d'olive jusqu'à légère coloration. Laisser refroidir.", badge: "⏱ 8 min" },
      { icone: "🥗", titre: "Assembler",             detail: "Mélanger le riz froid avec les légumes grillés refroidis, les tomates cerises coupées en deux et les olives.", badge: null },
      { icone: "🌿", titre: "Assaisonner",           detail: "Arroser d'huile d'olive, jus de citron, sel, poivre. Ajouter du basilic et du persil frais ciselés. Réfrigérer avant de servir.", badge: "⏱ 30 min au frais" },
    ]
  },

  Taboulé maison: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🌾", titre: "Hydrater la semoule",   detail: "Verser la semoule dans un saladier. Ajouter la même quantité d'eau bouillante salée. Couvrir et laisser gonfler 5 min. Égrainer à la fourchette et laisser refroidir.", badge: "⏱ 5 min repos" },
      { icone: "🍅", titre: "Préparer les légumes",  detail: "Couper les tomates et le concombre épépiné en très petits dés. Ciseler finement le persil plat et la menthe.", badge: null },
      { icone: "🥗", titre: "Mélanger",              detail: "Ajouter les légumes et les herbes à la semoule refroidie. Bien mélanger.", badge: null },
      { icone: "🍋", titre: "Assaisonner et reposer",detail: "Arroser de jus de citron et d'huile d'olive. Saler, poivrer. Mélanger et réfrigérer. Plus le taboulé repose, plus il est savoureux !", badge: "⏱ 1h minimum au frais" },
    ]
  },

  Salad de lentilles: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🫘", titre: "Cuire les lentilles",   detail: "Rincer les lentilles vertes (du Puy de préférence). Les plonger dans l'eau froide avec un bouquet garni et les carottes coupées. Porter à ébullition puis cuire à feu moyen. Ne pas saler en début de cuisson.", badge: "⏱ 20–25 min" },
      { icone: "🥓", titre: "Faire revenir les lardons", detail: "Faire dorer les lardons à la poêle sans matière grasse. Égoutter sur du papier absorbant.", badge: "⏱ 5 min" },
      { icone: "🥣", titre: "Préparer la vinaigrette", detail: "Mélanger 1 c.à.s de moutarde, 2 c.à.s de vinaigre de vin, 4 c.à.s d'huile d'olive, sel et poivre. Bien fouetter.", badge: null },
      { icone: "🥗", titre: "Assembler",             detail: "Égoutter les lentilles encore chaudes et les mélanger immédiatement avec la vinaigrette. Ajouter les lardons et l'oignon émincé. Servir tiède ou froid.", badge: null },
    ]
  },

  Salade avocat crevettes: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🥑", titre: "Préparer les avocats",  detail: "Couper les avocats en deux, retirer le noyau. Les couper en tranches ou en dés. Arroser immédiatement de jus de citron pour éviter l'oxydation.", badge: null },
      { icone: "🦐", titre: "Préparer les crevettes",detail: "Si besoin, décortiquer les crevettes roses cuites. Les garder entières ou les couper en deux.", badge: null },
      { icone: "🍶", titre: "Préparer la sauce cocktail",detail: "Mélanger 3 c.à.s de mayonnaise, 1 c.à.s de ketchup, quelques gouttes de Tabasco, jus de citron, sel et poivre.", badge: null },
      { icone: "🥗", titre: "Dresser",               detail: "Disposer la salade dans les assiettes. Ajouter l'avocat et les crevettes. Napper de sauce cocktail. Garnir d'aneth ou de ciboulette.", badge: null },
    ]
  },
  Boeuf bourguignon: {
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

  Risotto: {
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

  Gratin dauphinois: {
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

  Crème brulée: {
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

  Mousse au chocolat: {
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

  Ile flottante: {
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

  Fondant chocolat: {
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

  Madeleine: {
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

  Banana bread: {
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

  Granola: {
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

  Veloute legumes: {
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

  Houmous: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🫘", titre: "Préparer les pois chiches",  detail: "Égoutter et rincer les pois chiches. Garder un peu d'eau de la boîte. Pour un houmous ultra-lisse, retirer la peau de chaque pois chiche (facultatif mais ça change tout !).", badge: null },
      { icone: "🌀", titre: "Mixer",                      detail: "Placer tous les ingrédients dans le mixeur : pois chiches, tahini, jus de citron, ail, huile d'olive, cumin et sel. Mixer 2 min à puissance maximale.", badge: "⏱ 2 min mixer" },
      { icone: "💧", titre: "Ajuster la texture",         detail: "Ajouter l'eau froide cuillère par cuillère tout en mixant jusqu'à obtenir la consistance souhaitée — lisse et crémeuse. Goûter et ajuster le sel et le citron.", badge: null },
      { icone: "🍽️", titre: "Dresser et servir",         detail: "Verser dans un bol. Creuser un puits au centre avec le dos d'une cuillère. Verser un filet d'huile d'olive, saupoudrer de paprika et de cumin. Servir avec du pain pita, des légumes crus ou des crackers.", badge: null },
    ]
  },
  Clafoutis: {
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

  Pancakes: {
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

  Muffins: {
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

  Croque-monsieur: {
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

  Smoothie bowl: {
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
    ],
    ingredients: {},
    etapes: [
      { icone: "🧊", titre: "Préparer les fruits",  detail: "Utiliser des fruits rouges et une banane congelés — ils donnent une texture épaisse et crémeuse, comme une glace.", badge: null },
      { icone: "🌀", titre: "Mixer la base",        detail: "Mixer les fruits congelés avec le yaourt grec, le lait végétal et le miel jusqu'à obtenir une texture lisse et épaisse. Ajouter le lait au fur et à mesure pour ajuster la consistance.", badge: null },
      { icone: "🥣", titre: "Verser dans un bol",  detail: "Verser le smoothie dans un bol. Il doit être assez épais pour que les toppings ne coulent pas.", badge: null },
      { icone: "🎨", titre: "Disposer les toppings",detail: "Disposer joliment les fruits frais, le granola, les graines de chia et la noix de coco sur le dessus. Déguster immédiatement !", badge: null },
    ]
  },

  Salade quinoa: {
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

  Yaourt: {
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

  Tarte citron: {
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

  Tarte aux pommes: {
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

  Tiramisu: {
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

  Flan: {
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
  brioche:  { base: 1,  baseLabel: "1 brioche",    prixTotal: 2.83,  calTotal: 3642, unite: "brioche" },
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
  boeufbourguignon:   { base: 6, baseLabel: "6 personnes",  prixTotal: 18.00, calTotal: 3600, unite: "personne" },
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
  houmous:          { base: 6,  baseLabel: "6 personnes",  prixTotal: 2.50,  calTotal: 900,  unite: "personne" },
};

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
  const labelQte = nom === "pizza"
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
  const nomPropre = nom.charAt(0).toUpperCase() + nom.slice(1).replace("aupommes", " aux pommes");
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
