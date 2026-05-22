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

  clafoutis: {
    base: 6,
    temps: "~50 min",
    niveau: "⭐ Facile",
    emoji: "🍒",
    description: "Un clafoutis aux cerises moelleux et parfumé, à déguster tiède ou froid. Recette pour environ 6 personnes.",
    fixe: true,
    ingredientsFixes: [
      ["🍒 Cerises", "500 g"],
      ["🥚 Œufs", "4"],
      ["🍬 Sucre en poudre", "100 g"],
      ["🌿 Sucre vanillé", "1 sachet"],
      ["🌾 Farine", "80 g"],
      ["🥛 Lait", "30 cl"],
      ["🍦 Crème fraîche", "20 cl"],
      ["🧂 Sel", "1 pincée"],
      ["🧈 Beurre", "pour le moule"],
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

  tarteaupommes: {
    base: 6,
    temps: "~1h",
    niveau: "⭐ Facile",
    emoji: "🍎",
    description: "La tarte aux pommes classique — pâte brisée croustillante, compote maison et fines lamelles de pommes dorées.",
    fixe: true,
    ingredientsFixes: [
      ["🥧 Pâte brisée", "1 (maison ou achetée)"],
      ["🍎 Pommes (Golden ou Reine des Reinettes)", "6 (3 pour la compote + 3 pour le dessus)"],
      ["🧈 Beurre", "50 g"],
      ["🍬 Sucre", "50 g + 2 c. à soupe"],
      ["🍋 Citron", "½ (jus)"],
      ["💧 Eau", "50 ml"],
      ["🌿 Cannelle (facultatif)", "1 pincée"],
      ["🍑 Confiture d'abricot (nappage)", "3 c. à soupe"],
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
    fixe: true,
    ingredientsFixes: [
      ["🍪 Biscuits à la cuillère", "1 paquet (~24 biscuits)"],
      ["🧀 Mascarpone", "500 g"],
      ["🥚 Œufs (extra-frais)", "4"],
      ["☕ Café expresso", "20 cl"],
      ["🍬 Sucre en poudre", "100 g"],
      ["🍫 Cacao en poudre amer", "2 c. à soupe"],
      ["🧂 Sel", "1 pincée"],
      ["🥃 Marsala ou amaretto (facultatif)", "2 c. à soupe"],
    ],
    ingredients: {
      "Mascarpone (g)": 500,
      "Oeufs": 4,
      "Sucre (g)": 100,
    },
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
    fixe: true,
    ingredientsFixes: [
      ["🥧 Pâte feuilletée", "1"],
      ["🥛 Lait entier", "700 ml"],
      ["🥚 Jaunes d'œufs", "110 g"],
      ["🍬 Sucre", "160 g"],
      ["🌿 Gousse de vanille", "1"],
      ["🌾 Maïzena", "70 g"],
      ["🍦 Crème liquide", "300 ml"],
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
