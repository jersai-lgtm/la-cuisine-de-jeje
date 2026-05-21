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
      { icone: "🥣", titre: "Mélanger les secs",       detail: "Dans un grand bol, mélanger la farine, le sucre et le sel.", badge: null },
      { icone: "🥛", titre: "Incorporer les liquides", detail: "Ajouter l'œuf battu, le lait et le beurre fondu. Mélanger jusqu'à obtenir une pâte lisse sans grumeaux.", badge: null },
      { icone: "⏳", titre: "Laisser reposer",         detail: "Laisser reposer la pâte pendant que le gaufrier chauffe.", badge: "⏱ Repos : 10–15 min" },
      { icone: "🔌", titre: "Préchauffer le gaufrier", detail: "Brancher et laisser chauffer à fond. Graisser légèrement avec du beurre.", badge: null },
      { icone: "🧇", titre: "Cuire les gaufres",       detail: "Verser la pâte au centre, fermer et cuire jusqu'à ce qu'elles soient bien dorées et croustillantes.", badge: "⏱ Cuisson : 3–5 min" }
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
        nb: 1, label: "1 brioche (avec lait)",
        oeufs: "~200 g", vanille: "7,5 g", lait: "87,5 g", sucre: "65 g",
        levure: "15 g", sel: "9 g", farine: "500 g", beurre: "150 g"
      },
      {
        nb: 2, label: "2 brioches (avec lait)",
        oeufs: "~400 g", vanille: "15 g", lait: "175 g", sucre: "130 g",
        levure: "30 g", sel: "18 g", farine: "1000 g", beurre: "300 g"
      },
      {
        nb: 3, label: "1 brioche (sans lait)",
        oeufs: "~292 g", vanille: "7,5 g", lait: "—", sucre: "65 g",
        levure: "15 g", sel: "9 g", farine: "500 g", beurre: "150 g"
      },
      {
        nb: 4, label: "2 brioches (sans lait)",
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
      ? `<h3>Pour ${personnes} pâton${personnes > 1 ? "s" : ""}</h3>` + htmlTableauPizzaColonnes(ligne)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (0–20).</p>`;
    return;
  }

  // Gaufres : tableau par nombre de gaufres
  if (recette === "gaufres" && data.tableauGaufres) {
    const ligne = data.tableauGaufres.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} gaufre${personnes > 1 ? "s" : ""}</h3>` + htmlTableauGaufresColonnes(ligne)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–20).</p>`;
    return;
  }

  // Cookies : tableau par nombre de cookies
  if (recette === "cookies" && data.tableauCookies) {
    const ligne = data.tableauCookies.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>${personnes} cookie${personnes > 1 ? "s" : ""}</h3>` + htmlTableauCookiesColonnes(ligne)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Lasagne : tableau pâte maison
  if (recette === "lasagne" && data.tableauLasagne) {
    const ligne = data.tableauLasagne.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauLasagneColonnes(ligne)
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
      (ligne ? `<h3>${ligne.label}</h3>` + htmlTableauBriocheColonnes(ligne) : "");
    return;
  }

  // Crêpes : afficher uniquement la ligne sélectionnée en colonnes
  if (recette === "crepes" && data.tableauPersonnes) {
    const ligne = data.tableauPersonnes.find(l => l.nb === personnes);
    document.getElementById("resultat").innerHTML = ligne
      ? `<h3>Pour ${personnes} personne${personnes > 1 ? "s" : ""}</h3>` + htmlTableauCrepesColonnes(ligne)
      : `<p style="text-align:center;color:#ff8fb3;">Nombre hors tableau (1–10).</p>`;
    return;
  }

  // Recettes fixes (flan, clafoutis) : afficher les ingrédients tels quels
  if (data.fixe && data.ingredientsFixes) {
    let rows = data.ingredientsFixes.map(([k,v]) =>
      `<tr><th>${k}</th><td>${v}</td></tr>`).join("");
    document.getElementById("resultat").innerHTML =
      `<h3>Recette complète (~6 personnes)</h3>
       <table class="tableau-patons tableau-colonnes"><tbody>${rows}</tbody></table>`;
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


// =============================
// FICHE PLEINE PAGE
// =============================

function choisirRecette(nom) {
  const data = recettes[nom];
  if (!data) return;

  const inputPersonnes = document.getElementById("personnes");
  const personnes = inputPersonnes ? parseInt(inputPersonnes.value) || data.base : data.base;
  const ratio = personnes / data.base;

  document.body.innerHTML = "";

  const page = document.createElement("div");
  page.className = "fiche-pleine-page";

  // BOUTON RETOUR
  const retour = document.createElement("button");
  retour.className = "btn-retour";
  retour.innerHTML = "← Retour";
  retour.onclick = () => location.reload();

  // EN-TÊTE
  const header = document.createElement("div");
  header.className = "fiche-header";

  // Label pâtons ou personnes
  const briocheVersions = { 1: "1 brioche (avec lait)", 2: "2 brioches (avec lait)", 3: "1 brioche (sans lait)", 4: "2 brioches (sans lait)" };
  const labelQte = nom === "pizza"
    ? `🍕 ${personnes} pâton${personnes > 1 ? "s" : ""}`
    : nom === "brioche"
    ? `🍞 ${briocheVersions[personnes] || personnes}`
    : `👥 ${personnes} personne${personnes > 1 ? "s" : ""}`;

  header.innerHTML = `
    <div class="fiche-emoji">${data.emoji}</div>
    <h1 class="fiche-titre">${nom.charAt(0).toUpperCase() + nom.slice(1)}</h1>
    <p class="fiche-desc">${data.description}</p>
    <div class="fiche-meta">
      <span>⏱ ${data.temps}</span>
      <span>${data.niveau}</span>
      <span>${labelQte}</span>
    </div>`;

  // INGRÉDIENTS
  const secIngredients = document.createElement("div");
  secIngredients.className = "fiche-section";

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
  } else if (nom === "cookies" && data.tableauCookies) {
    const ligne = data.tableauCookies.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauCookiesColonnes(ligne);
  } else if (nom === "lasagne" && data.tableauLasagne) {
    const ligne = data.tableauLasagne.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauLasagneColonnes(ligne);
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

  secIngredients.innerHTML = `<h2 class="fiche-section-titre">🛒 Ingrédients</h2><div class="fiche-ingredients-liste">${listeIngredients}</div>`;

  // ÉTAPES
  const secEtapes = document.createElement("div");
  secEtapes.className = "fiche-section";
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
  secEtapes.innerHTML = `<h2 class="fiche-section-titre">📋 Étapes</h2><div class="fiche-etapes-liste">${listeEtapes}</div>`;

  page.appendChild(retour);
  page.appendChild(header);
  page.appendChild(secIngredients);
  page.appendChild(secEtapes);
  document.body.appendChild(page);
  window.scrollTo(0, 0);
}


// Init
calculer();
afficherFiche("pizza");
