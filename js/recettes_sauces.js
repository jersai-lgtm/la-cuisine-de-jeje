// ============================================================
// recettes_sauces.js — Recettes de catégorie "sauces" (Sauces) — 24 recettes
// 👉 Pour AJOUTER une recette Sauces : place-la juste avant le  });  final.
//    (le plus simple : copie une recette existante et change les valeurs)
// ============================================================
Object.assign(recettes, {
mayonnaise: {
    nom: "Mayonnaise maison",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🥚",
    description: "Mayonnaise maison — l'émulsion de base : jaune d'œuf, moutarde et huile montés au fouet. Sans additifs, mille fois meilleure que l'industrielle.",
    tableauMayonnaise: [
      { nb: 1, oeufs: "62 g", huile: "100 ml", moutarde: "10 g", vinaigre: "6 ml", sel: "1 g" },
      { nb: 2, oeufs: "124 g", huile: "200 ml", moutarde: "20 g", vinaigre: "12 ml", sel: "2 g" },
      { nb: 3, oeufs: "186 g", huile: "300 ml", moutarde: "30 g", vinaigre: "18 ml", sel: "3 g" },
      { nb: 4, oeufs: "248 g", huile: "400 ml", moutarde: "40 g", vinaigre: "24 ml", sel: "4 g" },
      { nb: 5, oeufs: "310 g", huile: "500 ml", moutarde: "50 g", vinaigre: "30 ml", sel: "5 g" },
      { nb: 6, oeufs: "372 g", huile: "600 ml", moutarde: "60 g", vinaigre: "36 ml", sel: "6 g" },
      { nb: 7, oeufs: "434 g", huile: "700 ml", moutarde: "70 g", vinaigre: "42 ml", sel: "7 g" },
      { nb: 8, oeufs: "496 g", huile: "800 ml", moutarde: "80 g", vinaigre: "48 ml", sel: "8 g" },
      { nb: 9, oeufs: "558 g", huile: "900 ml", moutarde: "90 g", vinaigre: "54 ml", sel: "9 g" },
      { nb: 10, oeufs: "620 g", huile: "1000 ml", moutarde: "100 g", vinaigre: "60 ml", sel: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥚", titre: "Base", detail: "Jaune d'œuf + moutarde + sel dans un bol. CLÉ : tous les ingrédients à TEMPÉRATURE AMBIANTE, sinon l'émulsion ne prend pas.", badge: "⏱ 2 min" },
      { icone: "🌀", titre: "Monter", detail: "Verser l'huile EN FILET très fin en fouettant sans arrêt. SECRET : commencer goutte à goutte, accélérer une fois l'émulsion prise.", badge: "⏱ 5 min" },
      { icone: "🍋", titre: "Assaisonner", detail: "Détendre avec un trait de vinaigre ou de citron, rectifier sel/poivre.", badge: "⏱ 1 min" },
      { icone: "🧊", titre: "Conserver", detail: "ASTUCE CHEF : si elle tranche, repartir d'un jaune neuf et y verser la mayo ratée en filet. Se garde 48h au frais.", badge: null }
    ]
  },
  ketchup: {
    nom: "Ketchup maison",
    cat: "sauces", pays: "usa",
    base: 1,
    temps: "35 min",
    niveau: "⭐ Facile",
    emoji: "🍅",
    description: "Ketchup maison — sauce tomate sucrée-acidulée mijotée et mixée. Moins sucré et plus parfumé que celui du commerce.",
    tableauKetchup: [
      { nb: 1, tomates: "480 g", sucre: "40 g", vinaigre: "40 ml", oignon: "48 g", sel: "2 g" },
      { nb: 2, tomates: "960 g", sucre: "80 g", vinaigre: "80 ml", oignon: "96 g", sel: "4 g" },
      { nb: 3, tomates: "1440 g", sucre: "120 g", vinaigre: "120 ml", oignon: "144 g", sel: "6 g" },
      { nb: 4, tomates: "1920 g", sucre: "160 g", vinaigre: "160 ml", oignon: "192 g", sel: "8 g" },
      { nb: 5, tomates: "2400 g", sucre: "200 g", vinaigre: "200 ml", oignon: "240 g", sel: "10 g" },
      { nb: 6, tomates: "2880 g", sucre: "240 g", vinaigre: "240 ml", oignon: "288 g", sel: "12 g" },
      { nb: 7, tomates: "3360 g", sucre: "280 g", vinaigre: "280 ml", oignon: "336 g", sel: "14 g" },
      { nb: 8, tomates: "3840 g", sucre: "320 g", vinaigre: "320 ml", oignon: "384 g", sel: "16 g" },
      { nb: 9, tomates: "4320 g", sucre: "360 g", vinaigre: "360 ml", oignon: "432 g", sel: "18 g" },
      { nb: 10, tomates: "4800 g", sucre: "400 g", vinaigre: "400 ml", oignon: "480 g", sel: "20 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Revenir", detail: "Faire suer l'oignon émincé. Ajouter les tomates (ou concentré + eau), sucre, vinaigre, sel, épices.", badge: "⏱ 5 min" },
      { icone: "🔥", titre: "Mijoter", detail: "CLÉ : laisser réduire à feu doux 20-25 min jusqu'à une texture épaisse et nappante.", badge: "⏱ 25 min" },
      { icone: "🌀", titre: "Mixer", detail: "Mixer finement et passer au tamis pour une texture lisse. SECRET : une pointe de clou de girofle ou de cannelle fait le 'goût ketchup'.", badge: "⏱ 3 min" },
      { icone: "🧊", titre: "Conserver", detail: "ASTUCE CHEF : mettre en pot chaud, se garde 2-3 semaines au frais. Laisser refroidir avant de fermer.", badge: null }
    ]
  },
  saucebarbecue: {
    nom: "Sauce barbecue",
    cat: "sauces", pays: "usa",
    base: 1,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🍖",
    description: "Sauce barbecue maison — fumée, sucrée et corsée. Parfaite pour les grillades, ribs, burgers et marinades.",
    tableauSauceBarbecue: [
      { nb: 1, ketchup: "160 g", sucre: "40 g", vinaigre: "40 ml", moutarde: "12 g", paprika: "12 g", saucesoja: "20 ml" },
      { nb: 2, ketchup: "320 g", sucre: "80 g", vinaigre: "80 ml", moutarde: "24 g", paprika: "24 g", saucesoja: "40 ml" },
      { nb: 3, ketchup: "480 g", sucre: "120 g", vinaigre: "120 ml", moutarde: "36 g", paprika: "36 g", saucesoja: "60 ml" },
      { nb: 4, ketchup: "640 g", sucre: "160 g", vinaigre: "160 ml", moutarde: "48 g", paprika: "48 g", saucesoja: "80 ml" },
      { nb: 5, ketchup: "800 g", sucre: "200 g", vinaigre: "200 ml", moutarde: "60 g", paprika: "60 g", saucesoja: "100 ml" },
      { nb: 6, ketchup: "960 g", sucre: "240 g", vinaigre: "240 ml", moutarde: "72 g", paprika: "72 g", saucesoja: "120 ml" },
      { nb: 7, ketchup: "1120 g", sucre: "280 g", vinaigre: "280 ml", moutarde: "84 g", paprika: "84 g", saucesoja: "140 ml" },
      { nb: 8, ketchup: "1280 g", sucre: "320 g", vinaigre: "320 ml", moutarde: "96 g", paprika: "96 g", saucesoja: "160 ml" },
      { nb: 9, ketchup: "1440 g", sucre: "360 g", vinaigre: "360 ml", moutarde: "108 g", paprika: "108 g", saucesoja: "180 ml" },
      { nb: 10, ketchup: "1600 g", sucre: "400 g", vinaigre: "400 ml", moutarde: "120 g", paprika: "120 g", saucesoja: "200 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥣", titre: "Mélanger", detail: "Réunir ketchup, cassonade, vinaigre, moutarde, paprika (fumé !), sauce soja.", badge: "⏱ 3 min" },
      { icone: "🔥", titre: "Mijoter", detail: "CLÉ : faire réduire 12-15 min à feu doux pour que les saveurs se concentrent et que la sauce nappe.", badge: "⏱ 15 min" },
      { icone: "🌶️", titre: "Ajuster", detail: "SECRET : équilibrer sucré/acide/fumé à ton goût. Un trait de Worcestershire ou de fumée liquide pour le vrai goût BBQ.", badge: "⏱ 2 min" },
      { icone: "🧊", titre: "Conserver", detail: "ASTUCE CHEF : meilleure le lendemain. Se garde 2 semaines au frais.", badge: null }
    ]
  },
  harissa: {
    nom: "Harissa maison",
    cat: "sauces", pays: "maroc",
    base: 1,
    temps: "20 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🌶️",
    description: "Harissa maison — la pâte de piment maghrébine, parfumée au cumin, à la coriandre et à l'ail. Relève couscous, tajines, sandwichs et soupes.",
    tableauHarissa: [
      { nb: 1, piment: "150 g", ail: "5 gousses", huiledolive: "50 g", coriandre: "15 g", cumin: "15 g", sel: "2 g" },
      { nb: 2, piment: "300 g", ail: "10 gousses", huiledolive: "100 g", coriandre: "30 g", cumin: "30 g", sel: "4 g" },
      { nb: 3, piment: "450 g", ail: "15 gousses", huiledolive: "150 g", coriandre: "45 g", cumin: "45 g", sel: "6 g" },
      { nb: 4, piment: "600 g", ail: "20 gousses", huiledolive: "200 g", coriandre: "60 g", cumin: "60 g", sel: "8 g" },
      { nb: 5, piment: "750 g", ail: "25 gousses", huiledolive: "250 g", coriandre: "75 g", cumin: "75 g", sel: "10 g" },
      { nb: 6, piment: "900 g", ail: "30 gousses", huiledolive: "300 g", coriandre: "90 g", cumin: "90 g", sel: "12 g" },
      { nb: 7, piment: "1050 g", ail: "35 gousses", huiledolive: "350 g", coriandre: "105 g", cumin: "105 g", sel: "14 g" },
      { nb: 8, piment: "1200 g", ail: "40 gousses", huiledolive: "400 g", coriandre: "120 g", cumin: "120 g", sel: "16 g" },
      { nb: 9, piment: "1350 g", ail: "45 gousses", huiledolive: "450 g", coriandre: "135 g", cumin: "135 g", sel: "18 g" },
      { nb: 10, piment: "1500 g", ail: "50 gousses", huiledolive: "500 g", coriandre: "150 g", cumin: "150 g", sel: "20 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🌶️", titre: "Réhydrater", detail: "Faire tremper les piments séchés dans l'eau chaude 15 min, puis les épépiner. ASTUCE : garder quelques graines pour plus de feu.", badge: "⏱ 15 min" },
      { icone: "🧄", titre: "Mixer", detail: "Mixer piments, ail, cumin, coriandre, sel en pâte. SECRET : torréfier les épices à sec avant, ça décuple l'arôme.", badge: "⏱ 3 min" },
      { icone: "🫒", titre: "Monter à l'huile", detail: "Ajouter l'huile d'olive jusqu'à une pâte souple et brillante.", badge: "⏱ 2 min" },
      { icone: "🧊", titre: "Conserver", detail: "CLÉ : couvrir d'un film d'huile dans un pot — se garde plusieurs semaines au frais.", badge: null }
    ]
  },
  saucetomate: {
    nom: "Sauce tomate maison",
    cat: "sauces", pays: "italie",
    base: 1,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🥫",
    description: "Sauce tomate maison — la base italienne : tomates mijotées avec ail, oignon et basilic. Pour pâtes, pizzas, gratins et bien plus.",
    tableauSauceTomate: [
      { nb: 1, tomates: "360 g", oignon: "40 g", ail: "2 gousses", huiledolive: "10 g", basilic: "8 feuilles", sucre: "4 g" },
      { nb: 2, tomates: "720 g", oignon: "80 g", ail: "4 gousses", huiledolive: "20 g", basilic: "16 feuilles", sucre: "8 g" },
      { nb: 3, tomates: "1080 g", oignon: "120 g", ail: "6 gousses", huiledolive: "30 g", basilic: "24 feuilles", sucre: "12 g" },
      { nb: 4, tomates: "1440 g", oignon: "160 g", ail: "8 gousses", huiledolive: "40 g", basilic: "32 feuilles", sucre: "16 g" },
      { nb: 5, tomates: "1800 g", oignon: "200 g", ail: "10 gousses", huiledolive: "50 g", basilic: "40 feuilles", sucre: "20 g" },
      { nb: 6, tomates: "2160 g", oignon: "240 g", ail: "12 gousses", huiledolive: "60 g", basilic: "48 feuilles", sucre: "24 g" },
      { nb: 7, tomates: "2520 g", oignon: "280 g", ail: "14 gousses", huiledolive: "70 g", basilic: "56 feuilles", sucre: "28 g" },
      { nb: 8, tomates: "2880 g", oignon: "320 g", ail: "16 gousses", huiledolive: "80 g", basilic: "64 feuilles", sucre: "32 g" },
      { nb: 9, tomates: "3240 g", oignon: "360 g", ail: "18 gousses", huiledolive: "90 g", basilic: "72 feuilles", sucre: "36 g" },
      { nb: 10, tomates: "3600 g", oignon: "400 g", ail: "20 gousses", huiledolive: "100 g", basilic: "80 feuilles", sucre: "40 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Suer", detail: "Faire revenir oignon et ail dans l'huile d'olive sans coloration.", badge: "⏱ 4 min" },
      { icone: "🍅", titre: "Mijoter", detail: "Ajouter les tomates concassées, sel. CLÉ : mijoter 20-25 min à feu doux pour réduire et concentrer.", badge: "⏱ 25 min" },
      { icone: "🌿", titre: "Équilibrer", detail: "SECRET ANTI-ACIDITÉ : une pincée de sucre coupe l'acidité des tomates. Basilic en fin de cuisson.", badge: "⏱ 2 min" },
      { icone: "🌀", titre: "Finir", detail: "ASTUCE CHEF : mixer pour une sauce lisse, ou laisser rustique. Un filet d'huile crue à la fin.", badge: null }
    ]
  },
  vinaigrette: {
    nom: "Vinaigrette classique",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🥗",
    description: "Vinaigrette classique — l'assaisonnement de base des salades : moutarde, vinaigre et huile émulsionnés. Le secret d'une bonne salade.",
    tableauVinaigrette: [
      { nb: 1, huile: "90 ml", vinaigre: "45 ml", moutarde: "9 g", sel: "1 g", poivre: "1 g" },
      { nb: 2, huile: "180 ml", vinaigre: "90 ml", moutarde: "18 g", sel: "2 g", poivre: "2 g" },
      { nb: 3, huile: "270 ml", vinaigre: "135 ml", moutarde: "27 g", sel: "3 g", poivre: "3 g" },
      { nb: 4, huile: "360 ml", vinaigre: "180 ml", moutarde: "36 g", sel: "4 g", poivre: "4 g" },
      { nb: 5, huile: "450 ml", vinaigre: "225 ml", moutarde: "45 g", sel: "5 g", poivre: "5 g" },
      { nb: 6, huile: "540 ml", vinaigre: "270 ml", moutarde: "54 g", sel: "6 g", poivre: "6 g" },
      { nb: 7, huile: "630 ml", vinaigre: "315 ml", moutarde: "63 g", sel: "7 g", poivre: "7 g" },
      { nb: 8, huile: "720 ml", vinaigre: "360 ml", moutarde: "72 g", sel: "8 g", poivre: "8 g" },
      { nb: 9, huile: "810 ml", vinaigre: "405 ml", moutarde: "81 g", sel: "9 g", poivre: "9 g" },
      { nb: 10, huile: "900 ml", vinaigre: "450 ml", moutarde: "90 g", sel: "10 g", poivre: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥄", titre: "Base", detail: "Dissoudre le sel dans le vinaigre, ajouter la moutarde. ASTUCE : le sel se dissout dans le vinaigre, pas dans l'huile.", badge: "⏱ 1 min" },
      { icone: "🌀", titre: "Émulsionner", detail: "Verser l'huile en fouettant pour émulsionner. SECRET : ratio 3 huiles pour 1 vinaigre = l'équilibre classique.", badge: "⏱ 2 min" },
      { icone: "🌿", titre: "Varier", detail: "ASTUCE CHEF : échalote, herbes, miel, balsamique… personnalise selon la salade. Émulsionner juste avant de servir.", badge: null }
    ]
  },
  bechamel: {
    nom: "Sauce béchamel",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🥛",
    description: "Sauce béchamel — la sauce blanche mère : roux beurre-farine lié au lait. Base des gratins, lasagnes, croque-monsieur et sauce Mornay.",
    tableauBechamel: [
      { nb: 1, beurre: "32 g", farine: "32 g", lait: "320 ml", muscade: "1 g", sel: "1 g" },
      { nb: 2, beurre: "64 g", farine: "64 g", lait: "640 ml", muscade: "2 g", sel: "2 g" },
      { nb: 3, beurre: "96 g", farine: "96 g", lait: "960 ml", muscade: "3 g", sel: "3 g" },
      { nb: 4, beurre: "128 g", farine: "128 g", lait: "1280 ml", muscade: "4 g", sel: "4 g" },
      { nb: 5, beurre: "160 g", farine: "160 g", lait: "1600 ml", muscade: "5 g", sel: "5 g" },
      { nb: 6, beurre: "192 g", farine: "192 g", lait: "1920 ml", muscade: "6 g", sel: "6 g" },
      { nb: 7, beurre: "224 g", farine: "224 g", lait: "2240 ml", muscade: "7 g", sel: "7 g" },
      { nb: 8, beurre: "256 g", farine: "256 g", lait: "2560 ml", muscade: "8 g", sel: "8 g" },
      { nb: 9, beurre: "288 g", farine: "288 g", lait: "2880 ml", muscade: "9 g", sel: "9 g" },
      { nb: 10, beurre: "320 g", farine: "320 g", lait: "3200 ml", muscade: "10 g", sel: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧈", titre: "Roux", detail: "Faire fondre le beurre, ajouter la farine et cuire 1-2 min en remuant (roux blanc, sans coloration).", badge: "⏱ 3 min" },
      { icone: "🥛", titre: "Lait", detail: "CLÉ : verser le lait CHAUD progressivement en fouettant SANS ARRÊT pour éviter les grumeaux.", badge: "⏱ 5 min" },
      { icone: "🔥", titre: "Épaissir", detail: "Cuire à feu doux jusqu'à ce que la sauce nappe la cuillère. Sel, poivre, muscade.", badge: "⏱ 5 min" },
      { icone: "🧀", titre: "Variante", detail: "ASTUCE CHEF : ajouter du gruyère râpé hors du feu = sauce Mornay pour les gratins.", badge: null }
    ]
  },
  pestomaison: {
    nom: "Pesto maison",
    cat: "sauces", pays: "italie",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🌿",
    description: "Pesto maison — la sauce génoise au basilic, pignons, parmesan et huile d'olive. Incomparable, à mixer en 5 minutes pour pâtes et tartines.",
    tableauPestoMaison: [
      { nb: 1, basilic: "72 g", pignon: "30 g", parmesan: "48 g", ail: "9 g", huiledolive: "45 g" },
      { nb: 2, basilic: "144 g", pignon: "60 g", parmesan: "96 g", ail: "18 g", huiledolive: "90 g" },
      { nb: 3, basilic: "216 g", pignon: "90 g", parmesan: "144 g", ail: "27 g", huiledolive: "135 g" },
      { nb: 4, basilic: "288 g", pignon: "120 g", parmesan: "192 g", ail: "36 g", huiledolive: "180 g" },
      { nb: 5, basilic: "360 g", pignon: "150 g", parmesan: "240 g", ail: "45 g", huiledolive: "225 g" },
      { nb: 6, basilic: "432 g", pignon: "180 g", parmesan: "288 g", ail: "54 g", huiledolive: "270 g" },
      { nb: 7, basilic: "504 g", pignon: "210 g", parmesan: "336 g", ail: "63 g", huiledolive: "315 g" },
      { nb: 8, basilic: "576 g", pignon: "240 g", parmesan: "384 g", ail: "72 g", huiledolive: "360 g" },
      { nb: 9, basilic: "648 g", pignon: "270 g", parmesan: "432 g", ail: "81 g", huiledolive: "405 g" },
      { nb: 10, basilic: "720 g", pignon: "300 g", parmesan: "480 g", ail: "90 g", huiledolive: "450 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🌰", titre: "Torréfier", detail: "Torréfier légèrement les pignons à sec. ASTUCE : ça décuple leur goût (mais surveiller, ça brûle vite).", badge: "⏱ 3 min" },
      { icone: "🌿", titre: "Mixer", detail: "Mixer basilic, pignons, ail, parmesan. SECRET : un mortier (ou mixeur par à-coups) garde la couleur vive ; ne pas chauffer.", badge: "⏱ 3 min" },
      { icone: "🫒", titre: "Monter", detail: "Ajouter l'huile d'olive en filet jusqu'à une pâte onctueuse.", badge: "⏱ 2 min" },
      { icone: "🧊", titre: "Conserver", detail: "ASTUCE CHEF : couvrir d'huile pour qu'il ne noircisse pas. Se garde 1 semaine au frais.", badge: null }
    ]
  },
  aioli: {
    nom: "Aïoli",
    cat: "sauces", pays: "espagne",
    base: 1,
    temps: "10 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🧄",
    description: "Aïoli — l'émulsion provençale et catalane à l'ail : une mayonnaise puissamment aillée. Pour poissons, légumes vapeur et tapas.",
    tableauAioli: [
      { nb: 1, oeufs: "75 g", ail: "21 g", huiledolive: "150 ml", citron: "9 g", sel: "1 g" },
      { nb: 2, oeufs: "150 g", ail: "42 g", huiledolive: "300 ml", citron: "18 g", sel: "2 g" },
      { nb: 3, oeufs: "225 g", ail: "63 g", huiledolive: "450 ml", citron: "27 g", sel: "3 g" },
      { nb: 4, oeufs: "300 g", ail: "84 g", huiledolive: "600 ml", citron: "36 g", sel: "4 g" },
      { nb: 5, oeufs: "375 g", ail: "105 g", huiledolive: "750 ml", citron: "45 g", sel: "5 g" },
      { nb: 6, oeufs: "450 g", ail: "126 g", huiledolive: "900 ml", citron: "54 g", sel: "6 g" },
      { nb: 7, oeufs: "525 g", ail: "147 g", huiledolive: "1050 ml", citron: "63 g", sel: "7 g" },
      { nb: 8, oeufs: "600 g", ail: "168 g", huiledolive: "1200 ml", citron: "72 g", sel: "8 g" },
      { nb: 9, oeufs: "675 g", ail: "189 g", huiledolive: "1350 ml", citron: "81 g", sel: "9 g" },
      { nb: 10, oeufs: "750 g", ail: "210 g", huiledolive: "1500 ml", citron: "90 g", sel: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧄", titre: "Ail", detail: "Écraser l'ail en purée avec le sel (au mortier, c'est l'idéal).", badge: "⏱ 3 min" },
      { icone: "🥚", titre: "Base", detail: "Ajouter le jaune d'œuf et la moutarde si tu veux une prise plus facile.", badge: "⏱ 1 min" },
      { icone: "🌀", titre: "Monter", detail: "CLÉ : verser l'huile d'olive EN FILET en fouettant, comme une mayonnaise. Tout à température ambiante.", badge: "⏱ 5 min" },
      { icone: "🍋", titre: "Finir", detail: "SECRET : un trait de citron allège l'ensemble. Bien aillé = bien aïoli !", badge: null }
    ]
  },
  saucecesar: {
    liees: ["mayonnaise"],
    nom: "Sauce César",
    cat: "sauces", pays: "usa",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🧀",
    description: "Sauce César — crémeuse, salée et umami : parmesan, anchois, ail et citron. L'âme de la salade César, parfaite aussi en dip.",
    tableauSauceCesar: [
      { nb: 1, mayonnaise: "90 g", parmesan: "36 g", anchois: "3 filets", ail: "6 g", citron: "9 g", moutarde: "6 g" },
      { nb: 2, mayonnaise: "180 g", parmesan: "72 g", anchois: "6 filets", ail: "12 g", citron: "18 g", moutarde: "12 g" },
      { nb: 3, mayonnaise: "270 g", parmesan: "108 g", anchois: "9 filets", ail: "18 g", citron: "27 g", moutarde: "18 g" },
      { nb: 4, mayonnaise: "360 g", parmesan: "144 g", anchois: "12 filets", ail: "24 g", citron: "36 g", moutarde: "24 g" },
      { nb: 5, mayonnaise: "450 g", parmesan: "180 g", anchois: "15 filets", ail: "30 g", citron: "45 g", moutarde: "30 g" },
      { nb: 6, mayonnaise: "540 g", parmesan: "216 g", anchois: "18 filets", ail: "36 g", citron: "54 g", moutarde: "36 g" },
      { nb: 7, mayonnaise: "630 g", parmesan: "252 g", anchois: "21 filets", ail: "42 g", citron: "63 g", moutarde: "42 g" },
      { nb: 8, mayonnaise: "720 g", parmesan: "288 g", anchois: "24 filets", ail: "48 g", citron: "72 g", moutarde: "48 g" },
      { nb: 9, mayonnaise: "810 g", parmesan: "324 g", anchois: "27 filets", ail: "54 g", citron: "81 g", moutarde: "54 g" },
      { nb: 10, mayonnaise: "900 g", parmesan: "360 g", anchois: "30 filets", ail: "60 g", citron: "90 g", moutarde: "60 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🐟", titre: "Base umami", detail: "Écraser les anchois et l'ail en pâte. SECRET : l'anchois fond et donne le goût, on ne le 'sent' pas.", badge: "⏱ 3 min" },
      { icone: "🥄", titre: "Mélanger", detail: "Ajouter mayonnaise, parmesan râpé, moutarde, jus de citron. Bien mélanger.", badge: "⏱ 3 min" },
      { icone: "💧", titre: "Texture", detail: "ASTUCE CHEF : détendre avec un peu d'eau ou d'huile pour une sauce nappante (ni trop épaisse, ni liquide).", badge: "⏱ 1 min" },
      { icone: "🧀", titre: "Servir", detail: "Poivre du moulin. Parfaite sur salade romaine, croûtons et copeaux de parmesan.", badge: null }
    ]
  },
  chimichurri: {
    nom: "Chimichurri",
    cat: "sauces", pays: "argentine",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🥩",
    description: "Chimichurri — la sauce argentine du barbecue : persil, ail, origan, vinaigre et huile, relevée de piment. Indispensable sur la viande grillée.",
    tableauChimichurri: [
      { nb: 1, persil: "48 g", ail: "12 g", huiledolive: "45 g", vinaigre: "15 ml", origan: "9 g", piment: "1 g" },
      { nb: 2, persil: "96 g", ail: "24 g", huiledolive: "90 g", vinaigre: "30 ml", origan: "18 g", piment: "2 g" },
      { nb: 3, persil: "144 g", ail: "36 g", huiledolive: "135 g", vinaigre: "45 ml", origan: "27 g", piment: "3 g" },
      { nb: 4, persil: "192 g", ail: "48 g", huiledolive: "180 g", vinaigre: "60 ml", origan: "36 g", piment: "4 g" },
      { nb: 5, persil: "240 g", ail: "60 g", huiledolive: "225 g", vinaigre: "75 ml", origan: "45 g", piment: "5 g" },
      { nb: 6, persil: "288 g", ail: "72 g", huiledolive: "270 g", vinaigre: "90 ml", origan: "54 g", piment: "6 g" },
      { nb: 7, persil: "336 g", ail: "84 g", huiledolive: "315 g", vinaigre: "105 ml", origan: "63 g", piment: "7 g" },
      { nb: 8, persil: "384 g", ail: "96 g", huiledolive: "360 g", vinaigre: "120 ml", origan: "72 g", piment: "8 g" },
      { nb: 9, persil: "432 g", ail: "108 g", huiledolive: "405 g", vinaigre: "135 ml", origan: "81 g", piment: "9 g" },
      { nb: 10, persil: "480 g", ail: "120 g", huiledolive: "450 g", vinaigre: "150 ml", origan: "90 g", piment: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Hacher", detail: "Hacher FINEMENT persil et ail au couteau. ASTUCE : au couteau plutôt qu'au mixeur, la texture est plus authentique.", badge: "⏱ 5 min" },
      { icone: "🥣", titre: "Mélanger", detail: "Mélanger avec origan, piment, vinaigre, sel.", badge: "⏱ 2 min" },
      { icone: "🫒", titre: "Huile", detail: "Ajouter l'huile d'olive, mélanger. SECRET : laisser reposer 30 min, les saveurs infusent dans l'huile.", badge: "⏱ 2 min" },
      { icone: "🥩", titre: "Servir", detail: "ASTUCE CHEF : nappe une viande grillée à la sortie. Se garde 1 semaine au frais.", badge: null }
    ]
  },
  saucecurrycoco: {
    nom: "Sauce curry-coco",
    cat: "sauces", pays: "inde",
    base: 1,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🍛",
    description: "Sauce curry-coco — douce et parfumée : lait de coco, curry, gingembre et ail. Pour napper poulet, poisson, légumes ou riz.",
    tableauSauceCurryCoco: [
      { nb: 1, laitcoco: "200 ml", curry: "14 g", oignon: "40 g", ail: "6 g", gingembre: "8 g", huile: "10 ml" },
      { nb: 2, laitcoco: "400 ml", curry: "28 g", oignon: "80 g", ail: "12 g", gingembre: "16 g", huile: "20 ml" },
      { nb: 3, laitcoco: "600 ml", curry: "42 g", oignon: "120 g", ail: "18 g", gingembre: "24 g", huile: "30 ml" },
      { nb: 4, laitcoco: "800 ml", curry: "56 g", oignon: "160 g", ail: "24 g", gingembre: "32 g", huile: "40 ml" },
      { nb: 5, laitcoco: "1000 ml", curry: "70 g", oignon: "200 g", ail: "30 g", gingembre: "40 g", huile: "50 ml" },
      { nb: 6, laitcoco: "1200 ml", curry: "84 g", oignon: "240 g", ail: "36 g", gingembre: "48 g", huile: "60 ml" },
      { nb: 7, laitcoco: "1400 ml", curry: "98 g", oignon: "280 g", ail: "42 g", gingembre: "56 g", huile: "70 ml" },
      { nb: 8, laitcoco: "1600 ml", curry: "112 g", oignon: "320 g", ail: "48 g", gingembre: "64 g", huile: "80 ml" },
      { nb: 9, laitcoco: "1800 ml", curry: "126 g", oignon: "360 g", ail: "54 g", gingembre: "72 g", huile: "90 ml" },
      { nb: 10, laitcoco: "2000 ml", curry: "140 g", oignon: "400 g", ail: "60 g", gingembre: "80 g", huile: "100 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Aromates", detail: "Faire revenir oignon, ail et gingembre. Ajouter le curry et torréfier 30 s. SECRET : torréfier les épices libère leurs arômes.", badge: "⏱ 5 min" },
      { icone: "🥥", titre: "Lait de coco", detail: "Verser le lait de coco, mélanger.", badge: "⏱ 2 min" },
      { icone: "🔥", titre: "Mijoter", detail: "CLÉ : laisser réduire 10-12 min à feu doux jusqu'à une sauce nappante.", badge: "⏱ 12 min" },
      { icone: "🍋", titre: "Finir", detail: "ASTUCE CHEF : un trait de citron vert et de la coriandre fraîche réveillent la sauce.", badge: null }
    ]
  },
  teriyaki: {
    nom: "Sauce teriyaki",
    cat: "sauces", pays: "japon",
    base: 1,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🍶",
    description: "Sauce teriyaki — la sauce japonaise laquée, sucrée-salée : soja, sucre et gingembre réduits en sirop brillant. Pour poulet, saumon, bœuf.",
    tableauTeriyaki: [
      { nb: 1, saucesoja: "90 ml", sucre: "30 g", miel: "30 g", gingembre: "12 g", ail: "6 g" },
      { nb: 2, saucesoja: "180 ml", sucre: "60 g", miel: "60 g", gingembre: "24 g", ail: "12 g" },
      { nb: 3, saucesoja: "270 ml", sucre: "90 g", miel: "90 g", gingembre: "36 g", ail: "18 g" },
      { nb: 4, saucesoja: "360 ml", sucre: "120 g", miel: "120 g", gingembre: "48 g", ail: "24 g" },
      { nb: 5, saucesoja: "450 ml", sucre: "150 g", miel: "150 g", gingembre: "60 g", ail: "30 g" },
      { nb: 6, saucesoja: "540 ml", sucre: "180 g", miel: "180 g", gingembre: "72 g", ail: "36 g" },
      { nb: 7, saucesoja: "630 ml", sucre: "210 g", miel: "210 g", gingembre: "84 g", ail: "42 g" },
      { nb: 8, saucesoja: "720 ml", sucre: "240 g", miel: "240 g", gingembre: "96 g", ail: "48 g" },
      { nb: 9, saucesoja: "810 ml", sucre: "270 g", miel: "270 g", gingembre: "108 g", ail: "54 g" },
      { nb: 10, saucesoja: "900 ml", sucre: "300 g", miel: "300 g", gingembre: "120 g", ail: "60 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥣", titre: "Mélanger", detail: "Réunir sauce soja, sucre (ou miel), gingembre et ail râpés, un peu d'eau.", badge: "⏱ 3 min" },
      { icone: "🔥", titre: "Réduire", detail: "CLÉ : faire réduire à feu moyen jusqu'à ce que ça nappe et devienne sirupeux et brillant.", badge: "⏱ 8 min" },
      { icone: "✨", titre: "Laquer", detail: "SECRET : un peu de maïzena diluée pour une sauce plus épaisse et laquée. ASTUCE CHEF : badigeonner la viande en fin de cuisson, elle caramélise.", badge: "⏱ 2 min" }
    ]
  },
  sauceblanche: {
    nom: "Sauce blanche (kebab)",
    cat: "sauces", pays: "monde",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🥙",
    description: "Sauce blanche kebab — crémeuse et fraîche : yaourt, mayonnaise, citron et ail. L'incontournable des sandwichs, kebabs et tacos.",
    tableauSauceBlanche: [
      { nb: 1, yaourtgrec: "180 g", mayonnaise: "60 g", citron: "9 g", ail: "1 gousse", persil: "1 g" },
      { nb: 2, yaourtgrec: "360 g", mayonnaise: "120 g", citron: "18 g", ail: "2 gousse", persil: "2 g" },
      { nb: 3, yaourtgrec: "540 g", mayonnaise: "180 g", citron: "27 g", ail: "3 gousse", persil: "3 g" },
      { nb: 4, yaourtgrec: "720 g", mayonnaise: "240 g", citron: "36 g", ail: "4 gousse", persil: "4 g" },
      { nb: 5, yaourtgrec: "900 g", mayonnaise: "300 g", citron: "45 g", ail: "5 gousse", persil: "5 g" },
      { nb: 6, yaourtgrec: "1080 g", mayonnaise: "360 g", citron: "54 g", ail: "6 gousse", persil: "6 g" },
      { nb: 7, yaourtgrec: "1260 g", mayonnaise: "420 g", citron: "63 g", ail: "7 gousse", persil: "7 g" },
      { nb: 8, yaourtgrec: "1440 g", mayonnaise: "480 g", citron: "72 g", ail: "8 gousse", persil: "8 g" },
      { nb: 9, yaourtgrec: "1620 g", mayonnaise: "540 g", citron: "81 g", ail: "9 gousse", persil: "9 g" },
      { nb: 10, yaourtgrec: "1800 g", mayonnaise: "600 g", citron: "90 g", ail: "10 gousse", persil: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥣", titre: "Mélanger", detail: "Mélanger yaourt, mayonnaise, jus de citron, ail écrasé.", badge: "⏱ 3 min" },
      { icone: "🌿", titre: "Assaisonner", detail: "Sel, poivre, persil ou ciboulette. ASTUCE : une pointe de cumin ou de menthe pour varier.", badge: "⏱ 1 min" },
      { icone: "🧊", titre: "Reposer", detail: "SECRET : 30 min au frais, les saveurs se lient. Ajuster la consistance avec un peu d'eau si trop épaisse.", badge: null }
    ]
  },
  saucesamourai: {
    liees: ["mayonnaise","ketchup"],
    nom: "Sauce samouraï",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🌶️",
    description: "Sauce samouraï — la sauce belge piquante : mayonnaise, ketchup et harissa. Parfaite avec les frites, burgers et viandes.",
    tableauSauceSamourai: [
      { nb: 1, mayonnaise: "108 g", ketchup: "48 g", harissa: "15 g", paprika: "6 g" },
      { nb: 2, mayonnaise: "216 g", ketchup: "96 g", harissa: "30 g", paprika: "12 g" },
      { nb: 3, mayonnaise: "324 g", ketchup: "144 g", harissa: "45 g", paprika: "18 g" },
      { nb: 4, mayonnaise: "432 g", ketchup: "192 g", harissa: "60 g", paprika: "24 g" },
      { nb: 5, mayonnaise: "540 g", ketchup: "240 g", harissa: "75 g", paprika: "30 g" },
      { nb: 6, mayonnaise: "648 g", ketchup: "288 g", harissa: "90 g", paprika: "36 g" },
      { nb: 7, mayonnaise: "756 g", ketchup: "336 g", harissa: "105 g", paprika: "42 g" },
      { nb: 8, mayonnaise: "864 g", ketchup: "384 g", harissa: "120 g", paprika: "48 g" },
      { nb: 9, mayonnaise: "972 g", ketchup: "432 g", harissa: "135 g", paprika: "54 g" },
      { nb: 10, mayonnaise: "1080 g", ketchup: "480 g", harissa: "150 g", paprika: "60 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥣", titre: "Mélanger", detail: "Mélanger mayonnaise, ketchup et harissa.", badge: "⏱ 2 min" },
      { icone: "🌶️", titre: "Doser le feu", detail: "CLÉ : ajouter la harissa progressivement en goûtant — c'est elle qui pique.", badge: "⏱ 1 min" },
      { icone: "🍟", titre: "Servir", detail: "ASTUCE CHEF : un peu de paprika fumé arrondit le tout. Idéale avec les frites maison.", badge: null }
    ]
  },
  saucetartare: {
    liees: ["mayonnaise"],
    nom: "Sauce tartare",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🥚",
    description: "Sauce tartare — mayonnaise relevée aux cornichons, câpres, échalote et herbes. L'accompagnement classique du poisson pané et frit.",
    tableauSauceTartare: [
      { nb: 1, mayonnaise: "120 g", cornichon: "48 g", capres: "24 g", echalote: "30 g", persil: "6 g", moutarde: "6 g" },
      { nb: 2, mayonnaise: "240 g", cornichon: "96 g", capres: "48 g", echalote: "60 g", persil: "12 g", moutarde: "12 g" },
      { nb: 3, mayonnaise: "360 g", cornichon: "144 g", capres: "72 g", echalote: "90 g", persil: "18 g", moutarde: "18 g" },
      { nb: 4, mayonnaise: "480 g", cornichon: "192 g", capres: "96 g", echalote: "120 g", persil: "24 g", moutarde: "24 g" },
      { nb: 5, mayonnaise: "600 g", cornichon: "240 g", capres: "120 g", echalote: "150 g", persil: "30 g", moutarde: "30 g" },
      { nb: 6, mayonnaise: "720 g", cornichon: "288 g", capres: "144 g", echalote: "180 g", persil: "36 g", moutarde: "36 g" },
      { nb: 7, mayonnaise: "840 g", cornichon: "336 g", capres: "168 g", echalote: "210 g", persil: "42 g", moutarde: "42 g" },
      { nb: 8, mayonnaise: "960 g", cornichon: "384 g", capres: "192 g", echalote: "240 g", persil: "48 g", moutarde: "48 g" },
      { nb: 9, mayonnaise: "1080 g", cornichon: "432 g", capres: "216 g", echalote: "270 g", persil: "54 g", moutarde: "54 g" },
      { nb: 10, mayonnaise: "1200 g", cornichon: "480 g", capres: "240 g", echalote: "300 g", persil: "60 g", moutarde: "60 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🔪", titre: "Hacher", detail: "Hacher finement cornichons, câpres, échalote et persil.", badge: "⏱ 4 min" },
      { icone: "🥄", titre: "Mélanger", detail: "Incorporer à la mayonnaise avec un peu de moutarde. SECRET : un jaune d'œuf dur écrasé pour la version traditionnelle.", badge: "⏱ 3 min" },
      { icone: "🍋", titre: "Assaisonner", detail: "Citron, poivre. ASTUCE CHEF : laisser reposer 30 min pour que les acidités se fondent. Top avec poisson pané.", badge: null }
    ]
  },
  saucehollandaise: {
    nom: "Sauce hollandaise",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "15 min",
    niveau: "⭐⭐⭐ Difficile",
    emoji: "🍳",
    description: "Sauce hollandaise — l'émulsion chaude au beurre et au jaune d'œuf, citronnée. Pour asperges, œufs Bénédicte et poissons. Technique mais inratable avec la méthode.",
    tableauSauceHollandaise: [
      { nb: 1, oeufs: "2", beurre: "100 g", citron: "10 g", sel: "1 g", poivre: "1 g" },
      { nb: 2, oeufs: "4", beurre: "200 g", citron: "20 g", sel: "2 g", poivre: "2 g" },
      { nb: 3, oeufs: "6", beurre: "300 g", citron: "30 g", sel: "3 g", poivre: "3 g" },
      { nb: 4, oeufs: "8", beurre: "400 g", citron: "40 g", sel: "4 g", poivre: "4 g" },
      { nb: 5, oeufs: "10", beurre: "500 g", citron: "50 g", sel: "5 g", poivre: "5 g" },
      { nb: 6, oeufs: "12", beurre: "600 g", citron: "60 g", sel: "6 g", poivre: "6 g" },
      { nb: 7, oeufs: "14", beurre: "700 g", citron: "70 g", sel: "7 g", poivre: "7 g" },
      { nb: 8, oeufs: "16", beurre: "800 g", citron: "80 g", sel: "8 g", poivre: "8 g" },
      { nb: 9, oeufs: "18", beurre: "900 g", citron: "90 g", sel: "9 g", poivre: "9 g" },
      { nb: 10, oeufs: "20", beurre: "1000 g", citron: "100 g", sel: "10 g", poivre: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧈", titre: "Beurre clarifié", detail: "Faire fondre doucement le beurre. ASTUCE : retirer l'écume, garder la partie claire (beurre clarifié).", badge: "⏱ 4 min" },
      { icone: "🥚", titre: "Sabayon", detail: "Fouetter les jaunes avec un peu d'eau et de citron AU BAIN-MARIE. CLÉ : feu très doux, fouetter sans cesse jusqu'à ce que ça épaississe (ne pas cuire l'œuf !).", badge: "⏱ 5 min" },
      { icone: "🌀", titre: "Monter", detail: "SECRET : hors du feu, incorporer le beurre clarifié EN FILET en fouettant, comme une mayonnaise chaude.", badge: "⏱ 4 min" },
      { icone: "🍋", titre: "Finir", detail: "Citron, sel, poivre. ASTUCE CHEF : si elle tranche, fouetter avec une c.à.s d'eau froide. Servir AUSSITÔT (elle n'attend pas).", badge: null }
    ]
  },
  saucesoja: {
    nom: "Sauce soja-sésame",
    cat: "sauces", pays: "japon",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🍶",
    description: "Sauce soja-sésame — sauce d'accompagnement asiatique : soja, sésame, gingembre et touche sucrée. Pour gyozas, sushis, bowls et marinades.",
    tableauSauceSoja: [
      { nb: 1, saucesoja: "90 ml", sesame: "12 g", gingembre: "12 g", sucre: "9 g", oignon: "18 g" },
      { nb: 2, saucesoja: "180 ml", sesame: "24 g", gingembre: "24 g", sucre: "18 g", oignon: "36 g" },
      { nb: 3, saucesoja: "270 ml", sesame: "36 g", gingembre: "36 g", sucre: "27 g", oignon: "54 g" },
      { nb: 4, saucesoja: "360 ml", sesame: "48 g", gingembre: "48 g", sucre: "36 g", oignon: "72 g" },
      { nb: 5, saucesoja: "450 ml", sesame: "60 g", gingembre: "60 g", sucre: "45 g", oignon: "90 g" },
      { nb: 6, saucesoja: "540 ml", sesame: "72 g", gingembre: "72 g", sucre: "54 g", oignon: "108 g" },
      { nb: 7, saucesoja: "630 ml", sesame: "84 g", gingembre: "84 g", sucre: "63 g", oignon: "126 g" },
      { nb: 8, saucesoja: "720 ml", sesame: "96 g", gingembre: "96 g", sucre: "72 g", oignon: "144 g" },
      { nb: 9, saucesoja: "810 ml", sesame: "108 g", gingembre: "108 g", sucre: "81 g", oignon: "162 g" },
      { nb: 10, saucesoja: "900 ml", sesame: "120 g", gingembre: "120 g", sucre: "90 g", oignon: "180 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥣", titre: "Mélanger", detail: "Mélanger sauce soja, sucre, gingembre râpé, oignon vert ciselé.", badge: "⏱ 3 min" },
      { icone: "🌰", titre: "Sésame", detail: "Ajouter les graines de sésame (torréfiées, c'est meilleur). ASTUCE : un trait d'huile de sésame pour le parfum.", badge: "⏱ 1 min" },
      { icone: "🥟", titre: "Servir", detail: "SECRET : un peu de vinaigre de riz pour la version dipping gyoza. Parfaite en sauce trempette.", badge: null }
    ]
  },
  saucecocktail: {
    liees: ["mayonnaise","ketchup"],
    nom: "Sauce cocktail",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🍤",
    description: "Sauce cocktail — la mayonnaise rosée légèrement relevée et citronnée. Pour crevettes, avocats et fruits de mer.",
    tableauSauceCocktail: [
      { nb: 1, mayonnaise: "108 g", ketchup: "48 g", citron: "9 g", paprika: "1 g" },
      { nb: 2, mayonnaise: "216 g", ketchup: "96 g", citron: "18 g", paprika: "2 g" },
      { nb: 3, mayonnaise: "324 g", ketchup: "144 g", citron: "27 g", paprika: "3 g" },
      { nb: 4, mayonnaise: "432 g", ketchup: "192 g", citron: "36 g", paprika: "4 g" },
      { nb: 5, mayonnaise: "540 g", ketchup: "240 g", citron: "45 g", paprika: "5 g" },
      { nb: 6, mayonnaise: "648 g", ketchup: "288 g", citron: "54 g", paprika: "6 g" },
      { nb: 7, mayonnaise: "756 g", ketchup: "336 g", citron: "63 g", paprika: "7 g" },
      { nb: 8, mayonnaise: "864 g", ketchup: "384 g", citron: "72 g", paprika: "8 g" },
      { nb: 9, mayonnaise: "972 g", ketchup: "432 g", citron: "81 g", paprika: "9 g" },
      { nb: 10, mayonnaise: "1080 g", ketchup: "480 g", citron: "90 g", paprika: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥣", titre: "Mélanger", detail: "Mélanger mayonnaise et ketchup jusqu'à une jolie couleur rosée.", badge: "⏱ 2 min" },
      { icone: "🍋", titre: "Relever", detail: "Citron, paprika, sel. SECRET : quelques gouttes de Worcestershire et un soupçon de cognac pour la version chic.", badge: "⏱ 1 min" },
      { icone: "🍤", titre: "Servir", detail: "ASTUCE CHEF : parfaite sur des crevettes ou en verrine avocat-crevette. Servir frais.", badge: null }
    ]
  },
  sauceaigredouce: {
    liees: ["ketchup"],
    nom: "Sauce aigre-douce",
    cat: "sauces", pays: "chine",
    base: 1,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🍍",
    description: "Sauce aigre-douce — l'équilibre sucré-acide chinois : vinaigre, sucre, ketchup et ananas, liée à la maïzena. Pour porc, poulet et nems.",
    tableauSauceAigreDouce: [
      { nb: 1, vinaigre: "30 ml", sucre: "30 g", ketchup: "36 g", ananas: "90 g", saucesoja: "9 ml", maizena: "9 g" },
      { nb: 2, vinaigre: "60 ml", sucre: "60 g", ketchup: "72 g", ananas: "180 g", saucesoja: "18 ml", maizena: "18 g" },
      { nb: 3, vinaigre: "90 ml", sucre: "90 g", ketchup: "108 g", ananas: "270 g", saucesoja: "27 ml", maizena: "27 g" },
      { nb: 4, vinaigre: "120 ml", sucre: "120 g", ketchup: "144 g", ananas: "360 g", saucesoja: "36 ml", maizena: "36 g" },
      { nb: 5, vinaigre: "150 ml", sucre: "150 g", ketchup: "180 g", ananas: "450 g", saucesoja: "45 ml", maizena: "45 g" },
      { nb: 6, vinaigre: "180 ml", sucre: "180 g", ketchup: "216 g", ananas: "540 g", saucesoja: "54 ml", maizena: "54 g" },
      { nb: 7, vinaigre: "210 ml", sucre: "210 g", ketchup: "252 g", ananas: "630 g", saucesoja: "63 ml", maizena: "63 g" },
      { nb: 8, vinaigre: "240 ml", sucre: "240 g", ketchup: "288 g", ananas: "720 g", saucesoja: "72 ml", maizena: "72 g" },
      { nb: 9, vinaigre: "270 ml", sucre: "270 g", ketchup: "324 g", ananas: "810 g", saucesoja: "81 ml", maizena: "81 g" },
      { nb: 10, vinaigre: "300 ml", sucre: "300 g", ketchup: "360 g", ananas: "900 g", saucesoja: "90 ml", maizena: "90 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥣", titre: "Base", detail: "Mélanger vinaigre, sucre, ketchup, sauce soja et jus d'ananas.", badge: "⏱ 3 min" },
      { icone: "🔥", titre: "Chauffer", detail: "Porter à frémissement. CLÉ : équilibrer le sucré et l'acide à ton goût.", badge: "⏱ 5 min" },
      { icone: "✨", titre: "Lier", detail: "SECRET : maïzena diluée dans un peu d'eau froide, verser en remuant jusqu'à épaississement brillant.", badge: "⏱ 3 min" },
      { icone: "🍍", titre: "Finir", detail: "ASTUCE CHEF : ajouter des dés d'ananas et de poivron pour la version 'plat'. Nappe porc ou poulet frit.", badge: null }
    ]
  },
  saucemoutardemiel: {
    nom: "Sauce moutarde-miel",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🍯",
    description: "Sauce moutarde-miel — l'équilibre parfait du piquant et du sucré. Pour salades, poulet, wraps et dips de légumes.",
    tableauSauceMoutardeMiel: [
      { nb: 1, moutarde: "30 g", miel: "30 g", huile: "45 ml", vinaigre: "9 ml" },
      { nb: 2, moutarde: "60 g", miel: "60 g", huile: "90 ml", vinaigre: "18 ml" },
      { nb: 3, moutarde: "90 g", miel: "90 g", huile: "135 ml", vinaigre: "27 ml" },
      { nb: 4, moutarde: "120 g", miel: "120 g", huile: "180 ml", vinaigre: "36 ml" },
      { nb: 5, moutarde: "150 g", miel: "150 g", huile: "225 ml", vinaigre: "45 ml" },
      { nb: 6, moutarde: "180 g", miel: "180 g", huile: "270 ml", vinaigre: "54 ml" },
      { nb: 7, moutarde: "210 g", miel: "210 g", huile: "315 ml", vinaigre: "63 ml" },
      { nb: 8, moutarde: "240 g", miel: "240 g", huile: "360 ml", vinaigre: "72 ml" },
      { nb: 9, moutarde: "270 g", miel: "270 g", huile: "405 ml", vinaigre: "81 ml" },
      { nb: 10, moutarde: "300 g", miel: "300 g", huile: "450 ml", vinaigre: "90 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥣", titre: "Mélanger", detail: "Fouetter moutarde et miel jusqu'à homogénéité.", badge: "⏱ 2 min" },
      { icone: "🌀", titre: "Émulsionner", detail: "Ajouter l'huile en filet et le vinaigre en fouettant. ASTUCE : un peu de moutarde à l'ancienne pour le croquant des grains.", badge: "⏱ 2 min" },
      { icone: "🥗", titre: "Servir", detail: "SECRET : un trait de jus de citron allège. Parfaite en vinaigrette tiède sur du poulet.", badge: null }
    ]
  },
  saucepoivre: {
    nom: "Sauce au poivre",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "15 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🥩",
    description: "Sauce au poivre — la sauce crémeuse des steaks : crème, poivre concassé et échalote, déglacée au cognac. Onctueuse et relevée.",
    tableauSaucePoivre: [
      { nb: 1, cremefraiche: "120 g", poivre: "10 g", echalote: "24 g", beurre: "12 g", vinblanc: "20 ml" },
      { nb: 2, cremefraiche: "240 g", poivre: "20 g", echalote: "48 g", beurre: "24 g", vinblanc: "40 ml" },
      { nb: 3, cremefraiche: "360 g", poivre: "30 g", echalote: "72 g", beurre: "36 g", vinblanc: "60 ml" },
      { nb: 4, cremefraiche: "480 g", poivre: "40 g", echalote: "96 g", beurre: "48 g", vinblanc: "80 ml" },
      { nb: 5, cremefraiche: "600 g", poivre: "50 g", echalote: "120 g", beurre: "60 g", vinblanc: "100 ml" },
      { nb: 6, cremefraiche: "720 g", poivre: "60 g", echalote: "144 g", beurre: "72 g", vinblanc: "120 ml" },
      { nb: 7, cremefraiche: "840 g", poivre: "70 g", echalote: "168 g", beurre: "84 g", vinblanc: "140 ml" },
      { nb: 8, cremefraiche: "960 g", poivre: "80 g", echalote: "192 g", beurre: "96 g", vinblanc: "160 ml" },
      { nb: 9, cremefraiche: "1080 g", poivre: "90 g", echalote: "216 g", beurre: "108 g", vinblanc: "180 ml" },
      { nb: 10, cremefraiche: "1200 g", poivre: "100 g", echalote: "240 g", beurre: "120 g", vinblanc: "200 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🌶️", titre: "Poivre", detail: "Concasser grossièrement le poivre (mignonnette). ASTUCE : poivre fraîchement concassé = sauce bien plus parfumée.", badge: "⏱ 2 min" },
      { icone: "🧅", titre: "Déglacer", detail: "Suer l'échalote au beurre, ajouter le poivre, déglacer au cognac/vin blanc et flamber (facultatif).", badge: "⏱ 5 min" },
      { icone: "🥛", titre: "Crème", detail: "Ajouter la crème, CLÉ : laisser réduire à feu doux jusqu'à ce que la sauce nappe la cuillère.", badge: "⏱ 6 min" },
      { icone: "🥩", titre: "Servir", detail: "ASTUCE CHEF : récupérer les sucs de cuisson de la viande dans la sauce = goût décuplé. Sel en fin.", badge: null }
    ]
  },
  sauceburger: {
    nom: "Sauce burger",
    cat: "sauces", pays: "usa",
    base: 1,
    temps: "5 min",
    niveau: "⭐ Facile",
    emoji: "🍔",
    description: "Sauce burger — la sauce 'spéciale' crémeuse et acidulée façon fast-food maison : mayo, ketchup, moutarde et cornichons. Indispensable dans un burger.",
    tableauSauceBurger: [
      { nb: 1, mayonnaise: "90 g", ketchup: "48 g", moutarde: "9 g", cornichon: "36 g", oignon: "24 g", paprika: "1 g" },
      { nb: 2, mayonnaise: "180 g", ketchup: "96 g", moutarde: "18 g", cornichon: "72 g", oignon: "48 g", paprika: "2 g" },
      { nb: 3, mayonnaise: "270 g", ketchup: "144 g", moutarde: "27 g", cornichon: "108 g", oignon: "72 g", paprika: "3 g" },
      { nb: 4, mayonnaise: "360 g", ketchup: "192 g", moutarde: "36 g", cornichon: "144 g", oignon: "96 g", paprika: "4 g" },
      { nb: 5, mayonnaise: "450 g", ketchup: "240 g", moutarde: "45 g", cornichon: "180 g", oignon: "120 g", paprika: "5 g" },
      { nb: 6, mayonnaise: "540 g", ketchup: "288 g", moutarde: "54 g", cornichon: "216 g", oignon: "144 g", paprika: "6 g" },
      { nb: 7, mayonnaise: "630 g", ketchup: "336 g", moutarde: "63 g", cornichon: "252 g", oignon: "168 g", paprika: "7 g" },
      { nb: 8, mayonnaise: "720 g", ketchup: "384 g", moutarde: "72 g", cornichon: "288 g", oignon: "192 g", paprika: "8 g" },
      { nb: 9, mayonnaise: "810 g", ketchup: "432 g", moutarde: "81 g", cornichon: "324 g", oignon: "216 g", paprika: "9 g" },
      { nb: 10, mayonnaise: "900 g", ketchup: "480 g", moutarde: "90 g", cornichon: "360 g", oignon: "240 g", paprika: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🔪", titre: "Hacher", detail: "Hacher TRÈS finement les cornichons et l'oignon.", badge: "⏱ 3 min" },
      { icone: "🥣", titre: "Mélanger", detail: "Mélanger mayonnaise, ketchup, moutarde, cornichons et oignon.", badge: "⏱ 2 min" },
      { icone: "🍔", titre: "Assaisonner", detail: "SECRET : une pointe de paprika fumé, de vinaigre de cornichon et de sucre = LE goût 'sauce spéciale'. ASTUCE CHEF : meilleure après 1h au frais.", badge: null }
    ]
  },
  saucechampignon: {
    nom: "Sauce aux champignons",
    cat: "sauces", pays: "france",
    base: 1,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🍄",
    description: "Sauce aux champignons — crémeuse et forestière : champignons poêlés, échalote et crème. Pour viandes, volailles, pâtes et escalopes.",
    tableauSauceChampignon: [
      { nb: 1, champignon: "160 g", cremefraiche: "100 g", echalote: "32 g", beurre: "16 g", vinblanc: "20 ml", persil: "4 g" },
      { nb: 2, champignon: "320 g", cremefraiche: "200 g", echalote: "64 g", beurre: "32 g", vinblanc: "40 ml", persil: "8 g" },
      { nb: 3, champignon: "480 g", cremefraiche: "300 g", echalote: "96 g", beurre: "48 g", vinblanc: "60 ml", persil: "12 g" },
      { nb: 4, champignon: "640 g", cremefraiche: "400 g", echalote: "128 g", beurre: "64 g", vinblanc: "80 ml", persil: "16 g" },
      { nb: 5, champignon: "800 g", cremefraiche: "500 g", echalote: "160 g", beurre: "80 g", vinblanc: "100 ml", persil: "20 g" },
      { nb: 6, champignon: "960 g", cremefraiche: "600 g", echalote: "192 g", beurre: "96 g", vinblanc: "120 ml", persil: "24 g" },
      { nb: 7, champignon: "1120 g", cremefraiche: "700 g", echalote: "224 g", beurre: "112 g", vinblanc: "140 ml", persil: "28 g" },
      { nb: 8, champignon: "1280 g", cremefraiche: "800 g", echalote: "256 g", beurre: "128 g", vinblanc: "160 ml", persil: "32 g" },
      { nb: 9, champignon: "1440 g", cremefraiche: "900 g", echalote: "288 g", beurre: "144 g", vinblanc: "180 ml", persil: "36 g" },
      { nb: 10, champignon: "1600 g", cremefraiche: "1000 g", echalote: "320 g", beurre: "160 g", vinblanc: "200 ml", persil: "40 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍄", titre: "Poêler", detail: "Poêler les champignons émincés à feu VIF. CLÉ : feu vif pour qu'ils dorent au lieu de bouillir dans leur eau.", badge: "⏱ 6 min" },
      { icone: "🧅", titre: "Échalote", detail: "Ajouter l'échalote, déglacer au vin blanc et laisser évaporer.", badge: "⏱ 4 min" },
      { icone: "🥛", titre: "Crème", detail: "Ajouter la crème, laisser réduire jusqu'à une sauce nappante. SECRET : un peu de fond de veau corse la sauce.", badge: "⏱ 6 min" },
      { icone: "🌿", titre: "Finir", detail: "Sel, poivre, persil. ASTUCE CHEF : parfaite sur une escalope ou des tagliatelles.", badge: null }
    ]
  },
  veloute: {
    nom: "Sauce velouté",
    cat: "sauces", pays: "france",
    dateAjout: "2026-06-03",
    base: 1,
    temps: "20 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🥄",
    description: "Le velouté — l'une des 5 sauces mères : un roux blond mouillé au bouillon, lié et velouté. La base de quantité de sauces blanches.",
    tableauVeloute: [
      { nb: 1, beurre: "40 g", farine: "40 g", bouillon: "400 g", creme: "60 g", citron: "20 g" },
      { nb: 2, beurre: "80 g", farine: "80 g", bouillon: "800 g", creme: "120 g", citron: "40 g" },
      { nb: 3, beurre: "120 g", farine: "120 g", bouillon: "1200 g", creme: "180 g", citron: "60 g" },
      { nb: 4, beurre: "160 g", farine: "160 g", bouillon: "1600 g", creme: "240 g", citron: "80 g" },
      { nb: 5, beurre: "200 g", farine: "200 g", bouillon: "2000 g", creme: "300 g", citron: "100 g" },
      { nb: 6, beurre: "240 g", farine: "240 g", bouillon: "2400 g", creme: "360 g", citron: "120 g" },
      { nb: 7, beurre: "280 g", farine: "280 g", bouillon: "2800 g", creme: "420 g", citron: "140 g" },
      { nb: 8, beurre: "320 g", farine: "320 g", bouillon: "3200 g", creme: "480 g", citron: "160 g" },
      { nb: 9, beurre: "360 g", farine: "360 g", bouillon: "3600 g", creme: "540 g", citron: "180 g" },
      { nb: 10, beurre: "400 g", farine: "400 g", bouillon: "4000 g", creme: "600 g", citron: "200 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧈", titre: "Faire le roux", detail: "Faire fondre le beurre, ajouter la farine et cuire en remuant sans laisser colorer (roux blond).", badge: "⏱ 3 min" },
      { icone: "🌡️", titre: "Tiédir le roux", detail: "Laisser tiédir le roux quelques instants pendant que le bouillon chauffe.", badge: null },
      { icone: "🍲", titre: "Mouiller", detail: "Verser le bouillon CHAUD sur le roux tiède en fouettant énergiquement. ASTUCE CHEF : chaud sur tiède (ou l'inverse), jamais chaud sur chaud — c'est le secret anti-grumeaux.", badge: null },
      { icone: "🔥", titre: "Lier", detail: "Porter à petite ébullition sans cesser de fouetter : la sauce épaissit et nappe.", badge: "⏱ 5 min" },
      { icone: "⏲️", titre: "Mijoter", detail: "Baisser le feu et laisser cuire doucement pour ôter le goût de farine.", badge: "⏱ 8 min" },
      { icone: "🥛", titre: "Finition", detail: "Hors du feu, incorporer la crème et quelques gouttes de citron.", badge: null },
      { icone: "🥄", titre: "Servir", detail: "Rectifier sel et poivre, passer au chinois si besoin, servir nappant.", badge: null }
    ]
  },
  sauceespagnole: {
    nom: "Sauce espagnole",
    cat: "sauces", pays: "france",
    dateAjout: "2026-06-03",
    base: 1,
    temps: "1h",
    niveau: "⭐⭐⭐ Difficile",
    emoji: "🟤",
    description: "La sauce espagnole — sauce mère brune à base de roux brun, mirepoix et fond. Réduite de moitié, elle devient la fameuse demi-glace.",
    tableauEspagnole: [
      { nb: 1, beurre: "32 g", farine: "32 g", bouillon: "480 g", carotte: "60 g", oignon: "60 g", tomates: "80 g", vin: "120 g" },
      { nb: 2, beurre: "64 g", farine: "64 g", bouillon: "960 g", carotte: "120 g", oignon: "120 g", tomates: "160 g", vin: "240 g" },
      { nb: 3, beurre: "96 g", farine: "96 g", bouillon: "1440 g", carotte: "180 g", oignon: "180 g", tomates: "240 g", vin: "360 g" },
      { nb: 4, beurre: "128 g", farine: "128 g", bouillon: "1920 g", carotte: "240 g", oignon: "240 g", tomates: "320 g", vin: "480 g" },
      { nb: 5, beurre: "160 g", farine: "160 g", bouillon: "2400 g", carotte: "300 g", oignon: "300 g", tomates: "400 g", vin: "600 g" },
      { nb: 6, beurre: "192 g", farine: "192 g", bouillon: "2880 g", carotte: "360 g", oignon: "360 g", tomates: "480 g", vin: "720 g" },
      { nb: 7, beurre: "224 g", farine: "224 g", bouillon: "3360 g", carotte: "420 g", oignon: "420 g", tomates: "560 g", vin: "840 g" },
      { nb: 8, beurre: "256 g", farine: "256 g", bouillon: "3840 g", carotte: "480 g", oignon: "480 g", tomates: "640 g", vin: "960 g" },
      { nb: 9, beurre: "288 g", farine: "288 g", bouillon: "4320 g", carotte: "540 g", oignon: "540 g", tomates: "720 g", vin: "1080 g" },
      { nb: 10, beurre: "320 g", farine: "320 g", bouillon: "4800 g", carotte: "600 g", oignon: "600 g", tomates: "800 g", vin: "1200 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥕", titre: "Mirepoix", detail: "Tailler carotte et oignon en petits dés et les faire revenir au beurre jusqu'à coloration.", badge: "⏱ 6 min" },
      { icone: "🟤", titre: "Roux brun", detail: "Singer avec la farine et cuire en remuant jusqu'à obtenir un roux bien brun. ASTUCE CHEF : c'est la couleur du roux qui donne goût et teinte — patiente sans brûler.", badge: "⏱ 5 min" },
      { icone: "🍅", titre: "Tomate", detail: "Ajouter la tomate et faire pincer une minute.", badge: null },
      { icone: "🍷", titre: "Déglacer", detail: "Verser le vin et gratter les sucs.", badge: null },
      { icone: "🍲", titre: "Mouiller", detail: "Ajouter le fond brun (bouillon) chaud en fouettant.", badge: null },
      { icone: "⏲️", titre: "Mijoter", detail: "Laisser réduire doucement, en écumant régulièrement.", badge: "⏱ 35 min" },
      { icone: "🥣", titre: "Passer", detail: "Filtrer au chinois en pressant bien la garniture.", badge: null },
      { icone: "✨", titre: "Demi-glace", detail: "Pour une demi-glace, remettre à réduire de moitié jusqu'à nappage brillant. Rectifier et servir.", badge: "⏱ 10 min" }
    ]
  },
  bearnaise: {
    nom: "Sauce béarnaise",
    cat: "sauces", pays: "france",
    dateAjout: "2026-06-03",
    base: 1,
    temps: "25 min",
    niveau: "⭐⭐⭐ Difficile",
    emoji: "🌿",
    description: "La sauce béarnaise — émulsion chaude de jaunes et beurre, parfumée à l'échalote et l'estragon. La reine des sauces à viande (steak-frites !).",
    tableauBearnaise: [
      { nb: 1, oeuf: "2", beurre: "160 g", echalote: "1", estragon: "12 g", vinaigre: "60 ml", poivre: "2 g" },
      { nb: 2, oeuf: "4", beurre: "320 g", echalote: "2", estragon: "24 g", vinaigre: "120 ml", poivre: "4 g" },
      { nb: 3, oeuf: "6", beurre: "480 g", echalote: "3", estragon: "36 g", vinaigre: "180 ml", poivre: "6 g" },
      { nb: 4, oeuf: "8", beurre: "640 g", echalote: "4", estragon: "48 g", vinaigre: "240 ml", poivre: "8 g" },
      { nb: 5, oeuf: "10", beurre: "800 g", echalote: "5", estragon: "60 g", vinaigre: "300 ml", poivre: "10 g" },
      { nb: 6, oeuf: "12", beurre: "960 g", echalote: "6", estragon: "72 g", vinaigre: "360 ml", poivre: "12 g" },
      { nb: 7, oeuf: "14", beurre: "1120 g", echalote: "7", estragon: "84 g", vinaigre: "420 ml", poivre: "14 g" },
      { nb: 8, oeuf: "16", beurre: "1280 g", echalote: "8", estragon: "96 g", vinaigre: "480 ml", poivre: "16 g" },
      { nb: 9, oeuf: "18", beurre: "1440 g", echalote: "9", estragon: "108 g", vinaigre: "540 ml", poivre: "18 g" },
      { nb: 10, oeuf: "20", beurre: "1600 g", echalote: "10", estragon: "120 g", vinaigre: "600 ml", poivre: "20 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Réduction", detail: "Réunir échalote ciselée, estragon, vinaigre et poivre concassé, réduire presque à sec.", badge: "⏱ 6 min" },
      { icone: "🫗", titre: "Filtrer", detail: "Filtrer la réduction et la laisser tiédir.", badge: null },
      { icone: "🧈", titre: "Clarifier", detail: "Faire fondre doucement le beurre et retirer le petit-lait (beurre clarifié).", badge: null },
      { icone: "🥚", titre: "Monter les jaunes", detail: "Au bain-marie doux, fouetter les jaunes avec la réduction jusqu'à ce qu'ils épaississent en sabayon. ASTUCE CHEF : bain-marie pas trop chaud, sinon les jaunes coagulent et tu fais une omelette.", badge: null },
      { icone: "💧", titre: "Émulsionner", detail: "Hors du feu, incorporer le beurre clarifié en mince filet sans cesser de fouetter.", badge: null },
      { icone: "🥄", titre: "Texture", detail: "La sauce doit être lisse, brillante et nappante. Détendre d'une goutte d'eau tiède si besoin.", badge: null },
      { icone: "🌿", titre: "Parfumer", detail: "Ajouter un peu d'estragon frais haché, rectifier le sel.", badge: null },
      { icone: "🍽️", titre: "Servir", detail: "Servir tiède, jamais brûlante (elle trancherait), sur une viande grillée.", badge: null }
    ]
  },
  beurreblanc: {
    nom: "Beurre blanc",
    cat: "sauces", pays: "france",
    dateAjout: "2026-06-03",
    base: 1,
    temps: "20 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🧈",
    description: "Le beurre blanc — émulsion d'échalote, vin blanc et beurre froid monté. L'accompagnement roi des poissons.",
    tableauBeurreBlanc: [
      { nb: 1, beurre: "200 g", echalote: "1", vin: "120 g", vinaigre: "30 ml", creme: "40 g" },
      { nb: 2, beurre: "400 g", echalote: "2", vin: "240 g", vinaigre: "60 ml", creme: "80 g" },
      { nb: 3, beurre: "600 g", echalote: "3", vin: "360 g", vinaigre: "90 ml", creme: "120 g" },
      { nb: 4, beurre: "800 g", echalote: "4", vin: "480 g", vinaigre: "120 ml", creme: "160 g" },
      { nb: 5, beurre: "1000 g", echalote: "5", vin: "600 g", vinaigre: "150 ml", creme: "200 g" },
      { nb: 6, beurre: "1200 g", echalote: "6", vin: "720 g", vinaigre: "180 ml", creme: "240 g" },
      { nb: 7, beurre: "1400 g", echalote: "7", vin: "840 g", vinaigre: "210 ml", creme: "280 g" },
      { nb: 8, beurre: "1600 g", echalote: "8", vin: "960 g", vinaigre: "240 ml", creme: "320 g" },
      { nb: 9, beurre: "1800 g", echalote: "9", vin: "1080 g", vinaigre: "270 ml", creme: "360 g" },
      { nb: 10, beurre: "2000 g", echalote: "10", vin: "1200 g", vinaigre: "300 ml", creme: "400 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Réduction", detail: "Faire suer l'échalote ciselée, ajouter vin blanc et vinaigre, réduire presque à sec.", badge: "⏱ 8 min" },
      { icone: "🥛", titre: "Stabiliser", detail: "Ajouter la crème et laisser réduire une minute (elle stabilise l'émulsion).", badge: null },
      { icone: "🧈", titre: "Monter au beurre", detail: "Sur feu TRÈS doux, incorporer le beurre bien froid en parcelles, en fouettant sans arrêt. ASTUCE CHEF : beurre glacé + feu doux = émulsion stable ; trop chaud, ça tranche.", badge: null },
      { icone: "🌀", titre: "Émulsionner", detail: "Continuer jusqu'à une sauce mousseuse et nappante.", badge: null },
      { icone: "🥄", titre: "Vérifier", detail: "La sauce doit napper la cuillère sans bouillir.", badge: null },
      { icone: "🧂", titre: "Assaisonner", detail: "Saler, poivrer, passer au chinois pour une texture lisse (facultatif).", badge: null },
      { icone: "🐟", titre: "Servir", detail: "Servir immédiatement — le beurre blanc ne se réchauffe pas.", badge: null }
    ]
  },
  saucebordelaise: {
    nom: "Sauce bordelaise",
    cat: "sauces", pays: "france",
    dateAjout: "2026-06-03",
    base: 1,
    temps: "40 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🍷",
    description: "La sauce bordelaise — vin rouge réduit, échalote et fond brun, montée au beurre. La grande sauce des viandes rouges.",
    tableauBordelaise: [
      { nb: 1, vin: "240 g", echalote: "2", beurre: "48 g", bouillon: "160 g", thym: "2 g" },
      { nb: 2, vin: "480 g", echalote: "4", beurre: "96 g", bouillon: "320 g", thym: "4 g" },
      { nb: 3, vin: "720 g", echalote: "6", beurre: "144 g", bouillon: "480 g", thym: "6 g" },
      { nb: 4, vin: "960 g", echalote: "8", beurre: "192 g", bouillon: "640 g", thym: "8 g" },
      { nb: 5, vin: "1200 g", echalote: "10", beurre: "240 g", bouillon: "800 g", thym: "10 g" },
      { nb: 6, vin: "1440 g", echalote: "12", beurre: "288 g", bouillon: "960 g", thym: "12 g" },
      { nb: 7, vin: "1680 g", echalote: "14", beurre: "336 g", bouillon: "1120 g", thym: "14 g" },
      { nb: 8, vin: "1920 g", echalote: "16", beurre: "384 g", bouillon: "1280 g", thym: "16 g" },
      { nb: 9, vin: "2160 g", echalote: "18", beurre: "432 g", bouillon: "1440 g", thym: "18 g" },
      { nb: 10, vin: "2400 g", echalote: "20", beurre: "480 g", bouillon: "1600 g", thym: "20 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Suer l'échalote", detail: "Faire fondre l'échalote ciselée dans un peu de beurre, sans coloration.", badge: "⏱ 4 min" },
      { icone: "🍷", titre: "Vin rouge", detail: "Verser le vin rouge avec le thym et gratter les sucs.", badge: null },
      { icone: "🔥", titre: "Réduire", detail: "Laisser réduire le vin de plus de moitié pour concentrer les arômes. ASTUCE CHEF : un vin rouge corsé que tu aimerais boire = une bonne sauce.", badge: "⏱ 12 min" },
      { icone: "🍲", titre: "Fond brun", detail: "Ajouter le fond brun (bouillon) et poursuivre la réduction.", badge: "⏱ 12 min" },
      { icone: "🥄", titre: "Napper", detail: "Réduire jusqu'à une sauce qui nappe la cuillère.", badge: null },
      { icone: "🧈", titre: "Monter au beurre", detail: "Hors du feu, incorporer le beurre froid en fouettant pour lustrer.", badge: null },
      { icone: "🍽️", titre: "Servir", detail: "Passer au chinois, rectifier l'assaisonnement, servir sur une viande rouge.", badge: null }
    ]
  },
  romesco: {
    nom: "Sauce Romesco",
    cat: "sauces",
    pays: "espagne",
    dateAjout: "2026-06-08T18:04:00",
    base: 1,
    temps: "20 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🥫",
    description: "La sauce catalane aux poivrons rôtis, amandes et paprika fumé — parfaite sur légumes grillés, poisson ou viande.",
    tableauRomesco: [
      { nb: 1, poivron: "160 g", tomate: "120 g", amandes: "72 g", ail: "2", painrassis: "40 g", huileOlive: "80 ml", vinaigre: "20 ml", paprikafume: "8 g" },
      { nb: 2, poivron: "320 g", tomate: "240 g", amandes: "144 g", ail: "4", painrassis: "80 g", huileOlive: "160 ml", vinaigre: "40 ml", paprikafume: "16 g" },
      { nb: 3, poivron: "480 g", tomate: "360 g", amandes: "216 g", ail: "6", painrassis: "120 g", huileOlive: "240 ml", vinaigre: "60 ml", paprikafume: "24 g" },
      { nb: 4, poivron: "640 g", tomate: "480 g", amandes: "288 g", ail: "8", painrassis: "160 g", huileOlive: "320 ml", vinaigre: "80 ml", paprikafume: "32 g" },
      { nb: 5, poivron: "800 g", tomate: "600 g", amandes: "360 g", ail: "10", painrassis: "200 g", huileOlive: "400 ml", vinaigre: "100 ml", paprikafume: "40 g" },
      { nb: 6, poivron: "960 g", tomate: "720 g", amandes: "432 g", ail: "12", painrassis: "240 g", huileOlive: "480 ml", vinaigre: "120 ml", paprikafume: "48 g" },
      { nb: 7, poivron: "1120 g", tomate: "840 g", amandes: "504 g", ail: "14", painrassis: "280 g", huileOlive: "560 ml", vinaigre: "140 ml", paprikafume: "56 g" },
      { nb: 8, poivron: "1280 g", tomate: "960 g", amandes: "576 g", ail: "16", painrassis: "320 g", huileOlive: "640 ml", vinaigre: "160 ml", paprikafume: "64 g" },
      { nb: 9, poivron: "1440 g", tomate: "1080 g", amandes: "648 g", ail: "18", painrassis: "360 g", huileOlive: "720 ml", vinaigre: "180 ml", paprikafume: "72 g" },
      { nb: 10, poivron: "1600 g", tomate: "1200 g", amandes: "720 g", ail: "20", painrassis: "400 g", huileOlive: "800 ml", vinaigre: "200 ml", paprikafume: "80 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Rôtir", detail: "Rôtir poivrons, tomate et ail au four jusqu'à ce que la peau noircisse.", badge: "⏱ 25 min" },
      { icone: "🥜", titre: "Torréfier", detail: "Torréfier les amandes et dorer le pain dans l'huile.", badge: "⏱ 5 min" },
      { icone: "🫙", titre: "Peler", detail: "Peler les poivrons rôtis. ASTUCE CHEF : enferme les poivrons chauds 10 min dans un saladier filmé : la peau se retire ensuite toute seule.", badge: "⏱ 10 min" },
      { icone: "🌀", titre: "Mixer", detail: "Mixer tous les ingrédients en une sauce épaisse et veloutée.", badge: null },
      { icone: "🫒", titre: "Monter", detail: "Ajouter l'huile d'olive en filet pour lisser.", badge: null },
      { icone: "🧂", titre: "Ajuster", detail: "Rectifier sel, vinaigre et paprika, servir.", badge: null }
    ]
  },
  gribiche: {
    nom: "Sauce Gribiche",
    cat: "sauces",
    pays: "france",
    dateAjout: "2026-06-08T18:05:00",
    base: 1,
    temps: "15 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🥫",
    description: "La sauce gribiche : une mayonnaise à l'œuf dur, relevée de cornichons, câpres et herbes. Idéale sur viandes froides et légumes.",
    tableauGribiche: [
      { nb: 1, oeuf: "4", moutarde: "20 g", huile: "120 ml", cornichon: "40 g", capres: "20 g", persil: "12 g", vinaigre: "20 ml" },
      { nb: 2, oeuf: "8", moutarde: "40 g", huile: "240 ml", cornichon: "80 g", capres: "40 g", persil: "24 g", vinaigre: "40 ml" },
      { nb: 3, oeuf: "12", moutarde: "60 g", huile: "360 ml", cornichon: "120 g", capres: "60 g", persil: "36 g", vinaigre: "60 ml" },
      { nb: 4, oeuf: "16", moutarde: "80 g", huile: "480 ml", cornichon: "160 g", capres: "80 g", persil: "48 g", vinaigre: "80 ml" },
      { nb: 5, oeuf: "20", moutarde: "100 g", huile: "600 ml", cornichon: "200 g", capres: "100 g", persil: "60 g", vinaigre: "100 ml" },
      { nb: 6, oeuf: "24", moutarde: "120 g", huile: "720 ml", cornichon: "240 g", capres: "120 g", persil: "72 g", vinaigre: "120 ml" },
      { nb: 7, oeuf: "28", moutarde: "140 g", huile: "840 ml", cornichon: "280 g", capres: "140 g", persil: "84 g", vinaigre: "140 ml" },
      { nb: 8, oeuf: "32", moutarde: "160 g", huile: "960 ml", cornichon: "320 g", capres: "160 g", persil: "96 g", vinaigre: "160 ml" },
      { nb: 9, oeuf: "36", moutarde: "180 g", huile: "1080 ml", cornichon: "360 g", capres: "180 g", persil: "108 g", vinaigre: "180 ml" },
      { nb: 10, oeuf: "40", moutarde: "200 g", huile: "1200 ml", cornichon: "400 g", capres: "200 g", persil: "120 g", vinaigre: "200 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥚", titre: "Œufs durs", detail: "Cuire les œufs durs, séparer jaunes et blancs.", badge: "⏱ 10 min" },
      { icone: "🥄", titre: "Base", detail: "Écraser les jaunes avec la moutarde et le vinaigre. ASTUCE CHEF : contrairement à la mayo classique, on part du jaune CUIT écrasé — la sauce ne tourne pas et tient bien.", badge: null },
      { icone: "🫗", titre: "Monter", detail: "Verser l'huile en filet en fouettant pour émulsionner.", badge: null },
      { icone: "🔪", titre: "Garniture", detail: "Hacher cornichons, câpres, blancs d'œufs et persil.", badge: "⏱ 3 min" },
      { icone: "🥣", titre: "Mélanger", detail: "Incorporer le tout à la base.", badge: null },
      { icone: "🧂", titre: "Servir", detail: "Rectifier l'assaisonnement et servir frais.", badge: null }
    ]
  },
  saucevierge: {
    nom: "Sauce Vierge",
    cat: "sauces",
    pays: "france",
    dateAjout: "2026-06-08T18:06:00",
    base: 1,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🥫",
    description: "La sauce vierge : tomates, huile d'olive et herbes fraîches, à peine tiédie. Légère et parfumée sur poisson ou légumes.",
    tableauSauceVierge: [
      { nb: 1, tomate: "200 g", huileOlive: "100 ml", citron: "40 ml", basilic: "12 g", coriandre: "8 g", echalote: "40 g" },
      { nb: 2, tomate: "400 g", huileOlive: "200 ml", citron: "80 ml", basilic: "24 g", coriandre: "16 g", echalote: "80 g" },
      { nb: 3, tomate: "600 g", huileOlive: "300 ml", citron: "120 ml", basilic: "36 g", coriandre: "24 g", echalote: "120 g" },
      { nb: 4, tomate: "800 g", huileOlive: "400 ml", citron: "160 ml", basilic: "48 g", coriandre: "32 g", echalote: "160 g" },
      { nb: 5, tomate: "1000 g", huileOlive: "500 ml", citron: "200 ml", basilic: "60 g", coriandre: "40 g", echalote: "200 g" },
      { nb: 6, tomate: "1200 g", huileOlive: "600 ml", citron: "240 ml", basilic: "72 g", coriandre: "48 g", echalote: "240 g" },
      { nb: 7, tomate: "1400 g", huileOlive: "700 ml", citron: "280 ml", basilic: "84 g", coriandre: "56 g", echalote: "280 g" },
      { nb: 8, tomate: "1600 g", huileOlive: "800 ml", citron: "320 ml", basilic: "96 g", coriandre: "64 g", echalote: "320 g" },
      { nb: 9, tomate: "1800 g", huileOlive: "900 ml", citron: "360 ml", basilic: "108 g", coriandre: "72 g", echalote: "360 g" },
      { nb: 10, tomate: "2000 g", huileOlive: "1000 ml", citron: "400 ml", basilic: "120 g", coriandre: "80 g", echalote: "400 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍅", titre: "Tomates", detail: "Monder les tomates, retirer les pépins et tailler en petits dés. ASTUCE CHEF : épépiner les tomates évite que la sauce rende trop d'eau et reste bien nappante.", badge: "⏱ 6 min" },
      { icone: "🧅", titre: "Échalote", detail: "Ciseler finement l'échalote.", badge: "⏱ 3 min" },
      { icone: "🌿", titre: "Herbes", detail: "Ciseler basilic et coriandre.", badge: null },
      { icone: "🫒", titre: "Mélanger", detail: "Réunir tout avec l'huile et le jus de citron.", badge: null },
      { icone: "🔥", titre: "Tiédir", detail: "Tiédir légèrement à feu très doux, sans cuire.", badge: "⏱ 3 min" },
      { icone: "🍽️", titre: "Servir", detail: "Napper aussitôt un poisson ou des légumes.", badge: null }
    ]
  },
  nuoccham: {
    nom: "Sauce Nuoc Cham",
    cat: "sauces",
    pays: "vietnam",
    dateAjout: "2026-06-08T18:07:00",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🥫",
    description: "La sauce vietnamienne nuoc cham : sucrée-salée-acidulée, indispensable avec rouleaux, bo bun et nems.",
    tableauNuocCham: [
      { nb: 1, saucePoisson: "60 ml", citronvert: "40 ml", sucre: "32 g", ail: "1", piment: "4 g", eau: "80 ml", carotte: "40 g" },
      { nb: 2, saucePoisson: "120 ml", citronvert: "80 ml", sucre: "64 g", ail: "2", piment: "8 g", eau: "160 ml", carotte: "80 g" },
      { nb: 3, saucePoisson: "180 ml", citronvert: "120 ml", sucre: "96 g", ail: "3", piment: "12 g", eau: "240 ml", carotte: "120 g" },
      { nb: 4, saucePoisson: "240 ml", citronvert: "160 ml", sucre: "128 g", ail: "4", piment: "16 g", eau: "320 ml", carotte: "160 g" },
      { nb: 5, saucePoisson: "300 ml", citronvert: "200 ml", sucre: "160 g", ail: "5", piment: "20 g", eau: "400 ml", carotte: "200 g" },
      { nb: 6, saucePoisson: "360 ml", citronvert: "240 ml", sucre: "192 g", ail: "6", piment: "24 g", eau: "480 ml", carotte: "240 g" },
      { nb: 7, saucePoisson: "420 ml", citronvert: "280 ml", sucre: "224 g", ail: "7", piment: "28 g", eau: "560 ml", carotte: "280 g" },
      { nb: 8, saucePoisson: "480 ml", citronvert: "320 ml", sucre: "256 g", ail: "8", piment: "32 g", eau: "640 ml", carotte: "320 g" },
      { nb: 9, saucePoisson: "540 ml", citronvert: "360 ml", sucre: "288 g", ail: "9", piment: "36 g", eau: "720 ml", carotte: "360 g" },
      { nb: 10, saucePoisson: "600 ml", citronvert: "400 ml", sucre: "320 g", ail: "10", piment: "40 g", eau: "800 ml", carotte: "400 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "💧", titre: "Sirop", detail: "Dissoudre le sucre dans l'eau tiède.", badge: null },
      { icone: "🐟", titre: "Mélanger", detail: "Ajouter sauce poisson et jus de citron vert. ASTUCE CHEF : goûte et ajuste l'équilibre sucre/citron/poisson — c'est une sauce qui se règle au palais, pas à la balance.", badge: null },
      { icone: "🧄", titre: "Aromates", detail: "Incorporer ail et piment hachés très fin.", badge: null },
      { icone: "🥕", titre: "Carotte", detail: "Ajouter la carotte râpée en fins filaments.", badge: "⏱ 3 min" },
      { icone: "⏳", titre: "Reposer", detail: "Laisser reposer 5 min pour que les saveurs se lient.", badge: "⏱ 5 min" },
      { icone: "🍽️", titre: "Servir", detail: "Servir en sauce à tremper ou à napper.", badge: null }
    ]
  },
  toum: {
    nom: "Toum",
    cat: "sauces",
    pays: "liban",
    dateAjout: "2026-06-08T18:08:00",
    base: 1,
    temps: "15 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🧄",
    description: "La sauce à l'ail libanaise : une émulsion blanche, aérienne et puissante, parfaite avec les grillades et le poulet.",
    tableauToum: [
      { nb: 1, ail: "100 g", huile: "320 ml", citron: "60 ml", sel: "1 g" },
      { nb: 2, ail: "200 g", huile: "640 ml", citron: "120 ml", sel: "2 g" },
      { nb: 3, ail: "300 g", huile: "960 ml", citron: "180 ml", sel: "3 g" },
      { nb: 4, ail: "400 g", huile: "1280 ml", citron: "240 ml", sel: "4 g" },
      { nb: 5, ail: "500 g", huile: "1600 ml", citron: "300 ml", sel: "5 g" },
      { nb: 6, ail: "600 g", huile: "1920 ml", citron: "360 ml", sel: "6 g" },
      { nb: 7, ail: "700 g", huile: "2240 ml", citron: "420 ml", sel: "7 g" },
      { nb: 8, ail: "800 g", huile: "2560 ml", citron: "480 ml", sel: "8 g" },
      { nb: 9, ail: "900 g", huile: "2880 ml", citron: "540 ml", sel: "9 g" },
      { nb: 10, ail: "1000 g", huile: "3200 ml", citron: "600 ml", sel: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧄", titre: "Ail", detail: "Éplucher l'ail et retirer les germes pour adoucir l'amertume.", badge: "⏱ 4 min" },
      { icone: "🌀", titre: "Réduire", detail: "Mixer l'ail avec le sel en une purée fine.", badge: null },
      { icone: "🫗", titre: "Émulsionner", detail: "Verser l'huile en TRÈS fin filet en alternant avec un peu de citron, mixeur en marche. ASTUCE CHEF : l'huile doit couler goutte à goutte au début, exactement comme une mayo — trop vite et l'émulsion tranche.", badge: "⏱ 8 min" },
      { icone: "🍋", titre: "Citron", detail: "Finir avec le reste de citron pour stabiliser et alléger.", badge: null },
      { icone: "🥣", titre: "Texture", detail: "On obtient une pâte blanche, montée et brillante.", badge: null },
      { icone: "❄️", titre: "Conserver", detail: "Réserver au frais ; la toum se garde plusieurs jours.", badge: null }
    ]
  },
  skordalia: {
    nom: "Skordalia",
    cat: "sauces",
    pays: "grece",
    dateAjout: "2026-06-08T18:09:00",
    base: 1,
    temps: "20 min",
    niveau: "⭐ Facile",
    emoji: "🥫",
    description: "La purée grecque à l'ail : pomme de terre, ail et huile d'olive, servie avec poisson frit ou légumes.",
    tableauSkordalia: [
      { nb: 1, pommedeterre: "240 g", ail: "32 g", huileOlive: "100 ml", citron: "40 ml", amandes: "40 g" },
      { nb: 2, pommedeterre: "480 g", ail: "64 g", huileOlive: "200 ml", citron: "80 ml", amandes: "80 g" },
      { nb: 3, pommedeterre: "720 g", ail: "96 g", huileOlive: "300 ml", citron: "120 ml", amandes: "120 g" },
      { nb: 4, pommedeterre: "960 g", ail: "128 g", huileOlive: "400 ml", citron: "160 ml", amandes: "160 g" },
      { nb: 5, pommedeterre: "1200 g", ail: "160 g", huileOlive: "500 ml", citron: "200 ml", amandes: "200 g" },
      { nb: 6, pommedeterre: "1440 g", ail: "192 g", huileOlive: "600 ml", citron: "240 ml", amandes: "240 g" },
      { nb: 7, pommedeterre: "1680 g", ail: "224 g", huileOlive: "700 ml", citron: "280 ml", amandes: "280 g" },
      { nb: 8, pommedeterre: "1920 g", ail: "256 g", huileOlive: "800 ml", citron: "320 ml", amandes: "320 g" },
      { nb: 9, pommedeterre: "2160 g", ail: "288 g", huileOlive: "900 ml", citron: "360 ml", amandes: "360 g" },
      { nb: 10, pommedeterre: "2400 g", ail: "320 g", huileOlive: "1000 ml", citron: "400 ml", amandes: "400 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥔", titre: "Cuire", detail: "Cuire les pommes de terre à l'eau, puis les écraser.", badge: "⏱ 20 min" },
      { icone: "🧄", titre: "Ail", detail: "Piler l'ail avec un peu de sel en pâte.", badge: null },
      { icone: "🫒", titre: "Monter", detail: "Incorporer l'huile d'olive en filet à la purée tiède. ASTUCE CHEF : travaille la purée encore tiède : froide, elle devient collante et l'huile s'incorpore mal.", badge: null },
      { icone: "🥜", titre: "Amandes", detail: "Ajouter quelques amandes pilées pour la rondeur.", badge: null },
      { icone: "🍋", titre: "Citron", detail: "Détendre avec le jus de citron jusqu'à la texture voulue.", badge: null },
      { icone: "🍽️", titre: "Servir", detail: "Servir tiède ou frais en accompagnement.", badge: null }
    ]
  },
  mojoverde: {
    nom: "Mojo Verde",
    cat: "sauces",
    pays: "espagne",
    dateAjout: "2026-06-08T19:00:00",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🥫",
    description: "La sauce verte des Canaries à la coriandre et à l'ail, traditionnellement servie avec les papas arrugadas.",
    tableauMojoVerde: [
      { nb: 1, coriandre: "60 g", ail: "4", huileOlive: "120 ml", vinaigre: "32 ml", cumin: "4 g", piment: "4 g", eau: "40 ml" },
      { nb: 2, coriandre: "120 g", ail: "8", huileOlive: "240 ml", vinaigre: "64 ml", cumin: "8 g", piment: "8 g", eau: "80 ml" },
      { nb: 3, coriandre: "180 g", ail: "12", huileOlive: "360 ml", vinaigre: "96 ml", cumin: "12 g", piment: "12 g", eau: "120 ml" },
      { nb: 4, coriandre: "240 g", ail: "16", huileOlive: "480 ml", vinaigre: "128 ml", cumin: "16 g", piment: "16 g", eau: "160 ml" },
      { nb: 5, coriandre: "300 g", ail: "20", huileOlive: "600 ml", vinaigre: "160 ml", cumin: "20 g", piment: "20 g", eau: "200 ml" },
      { nb: 6, coriandre: "360 g", ail: "24", huileOlive: "720 ml", vinaigre: "192 ml", cumin: "24 g", piment: "24 g", eau: "240 ml" },
      { nb: 7, coriandre: "420 g", ail: "28", huileOlive: "840 ml", vinaigre: "224 ml", cumin: "28 g", piment: "28 g", eau: "280 ml" },
      { nb: 8, coriandre: "480 g", ail: "32", huileOlive: "960 ml", vinaigre: "256 ml", cumin: "32 g", piment: "32 g", eau: "320 ml" },
      { nb: 9, coriandre: "540 g", ail: "36", huileOlive: "1080 ml", vinaigre: "288 ml", cumin: "36 g", piment: "36 g", eau: "360 ml" },
      { nb: 10, coriandre: "600 g", ail: "40", huileOlive: "1200 ml", vinaigre: "320 ml", cumin: "40 g", piment: "40 g", eau: "400 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Laver", detail: "Laver et effeuiller la coriandre.", badge: "⏱ 3 min" },
      { icone: "🧄", titre: "Piler", detail: "Piler l'ail avec le cumin et le sel en pâte.", badge: null },
      { icone: "🌀", titre: "Mixer", detail: "Ajouter la coriandre et le piment, mixer.", badge: null },
      { icone: "🫒", titre: "Monter", detail: "Verser l'huile d'olive en filet pour émulsionner. ASTUCE CHEF : ajoute l'huile petit à petit comme pour une vinaigrette — la sauce reste liée et bien verte.", badge: null },
      { icone: "🍷", titre: "Acidifier", detail: "Détendre avec le vinaigre et un peu d'eau.", badge: null },
      { icone: "🥔", titre: "Servir", detail: "Parfait avec des pommes de terre, du poisson ou des grillades.", badge: null }
    ]
  },
  raita: {
    nom: "Raïta",
    cat: "sauces",
    pays: "inde",
    dateAjout: "2026-06-08T19:01:00",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🥫",
    description: "La sauce indienne yaourt-concombre rafraîchissante, qui apaise les plats épicés.",
    tableauRaita: [
      { nb: 1, yaourt: "240 g", concombre: "160 g", menthe: "12 g", coriandre: "8 g", cumin: "4 g", sel: "1 g" },
      { nb: 2, yaourt: "480 g", concombre: "320 g", menthe: "24 g", coriandre: "16 g", cumin: "8 g", sel: "2 g" },
      { nb: 3, yaourt: "720 g", concombre: "480 g", menthe: "36 g", coriandre: "24 g", cumin: "12 g", sel: "3 g" },
      { nb: 4, yaourt: "960 g", concombre: "640 g", menthe: "48 g", coriandre: "32 g", cumin: "16 g", sel: "4 g" },
      { nb: 5, yaourt: "1200 g", concombre: "800 g", menthe: "60 g", coriandre: "40 g", cumin: "20 g", sel: "5 g" },
      { nb: 6, yaourt: "1440 g", concombre: "960 g", menthe: "72 g", coriandre: "48 g", cumin: "24 g", sel: "6 g" },
      { nb: 7, yaourt: "1680 g", concombre: "1120 g", menthe: "84 g", coriandre: "56 g", cumin: "28 g", sel: "7 g" },
      { nb: 8, yaourt: "1920 g", concombre: "1280 g", menthe: "96 g", coriandre: "64 g", cumin: "32 g", sel: "8 g" },
      { nb: 9, yaourt: "2160 g", concombre: "1440 g", menthe: "108 g", coriandre: "72 g", cumin: "36 g", sel: "9 g" },
      { nb: 10, yaourt: "2400 g", concombre: "1600 g", menthe: "120 g", coriandre: "80 g", cumin: "40 g", sel: "10 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🥒", titre: "Râper", detail: "Râper le concombre et le presser pour retirer l'eau. ASTUCE CHEF : bien essorer le concombre râpé (dans un torchon) évite une raïta trop liquide.", badge: "⏱ 4 min" },
      { icone: "🔥", titre: "Torréfier", detail: "Torréfier le cumin à sec pour révéler son arôme.", badge: "⏱ 2 min" },
      { icone: "🥣", titre: "Mélanger", detail: "Mélanger yaourt, concombre et cumin.", badge: null },
      { icone: "🌿", titre: "Herbes", detail: "Ajouter menthe et coriandre ciselées.", badge: null },
      { icone: "🧂", titre: "Assaisonner", detail: "Saler et mélanger.", badge: null },
      { icone: "❄️", titre: "Servir", detail: "Réserver au frais ; servir avec curry, biryani ou samoussas.", badge: null }
    ]
  },
  ponzu: {
    nom: "Sauce Ponzu",
    cat: "sauces",
    pays: "japon",
    dateAjout: "2026-06-08T19:02:00",
    base: 1,
    temps: "10 min",
    niveau: "⭐ Facile",
    emoji: "🥫",
    description: "La sauce japonaise ponzu, sauce soja acidulée aux agrumes, parfaite avec poissons, tofu et fondues.",
    tableauPonzu: [
      { nb: 1, saucesoja: "100 ml", citron: "60 ml", vinaigreRiz: "32 ml", mirin: "32 ml", sucre: "8 g", gingembre: "4 g" },
      { nb: 2, saucesoja: "200 ml", citron: "120 ml", vinaigreRiz: "64 ml", mirin: "64 ml", sucre: "16 g", gingembre: "8 g" },
      { nb: 3, saucesoja: "300 ml", citron: "180 ml", vinaigreRiz: "96 ml", mirin: "96 ml", sucre: "24 g", gingembre: "12 g" },
      { nb: 4, saucesoja: "400 ml", citron: "240 ml", vinaigreRiz: "128 ml", mirin: "128 ml", sucre: "32 g", gingembre: "16 g" },
      { nb: 5, saucesoja: "500 ml", citron: "300 ml", vinaigreRiz: "160 ml", mirin: "160 ml", sucre: "40 g", gingembre: "20 g" },
      { nb: 6, saucesoja: "600 ml", citron: "360 ml", vinaigreRiz: "192 ml", mirin: "192 ml", sucre: "48 g", gingembre: "24 g" },
      { nb: 7, saucesoja: "700 ml", citron: "420 ml", vinaigreRiz: "224 ml", mirin: "224 ml", sucre: "56 g", gingembre: "28 g" },
      { nb: 8, saucesoja: "800 ml", citron: "480 ml", vinaigreRiz: "256 ml", mirin: "256 ml", sucre: "64 g", gingembre: "32 g" },
      { nb: 9, saucesoja: "900 ml", citron: "540 ml", vinaigreRiz: "288 ml", mirin: "288 ml", sucre: "72 g", gingembre: "36 g" },
      { nb: 10, saucesoja: "1000 ml", citron: "600 ml", vinaigreRiz: "320 ml", mirin: "320 ml", sucre: "80 g", gingembre: "40 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🍶", titre: "Mirin", detail: "Chauffer brièvement le mirin pour évaporer l'alcool.", badge: "⏱ 2 min" },
      { icone: "🥣", titre: "Mélanger", detail: "Mélanger sauce soja, vinaigre de riz et mirin.", badge: null },
      { icone: "🍋", titre: "Agrumes", detail: "Ajouter le jus de citron (ou yuzu si tu en as). ASTUCE CHEF : ajoute les agrumes à froid, jamais chauffés — c'est leur fraîcheur acidulée qui fait le ponzu.", badge: null },
      { icone: "🫚", titre: "Gingembre", detail: "Râper un peu de gingembre dedans.", badge: null },
      { icone: "⏳", titre: "Reposer", detail: "Laisser infuser 10 min.", badge: "⏱ 10 min" },
      { icone: "🍽️", titre: "Servir", detail: "Servir en sauce à tremper ou en assaisonnement.", badge: null }
    ]
  },
  zhoug: {
    nom: "Zhoug",
    cat: "sauces",
    pays: "monde",
    dateAjout: "2026-06-08T19:03:00",
    base: 1,
    temps: "15 min",
    niveau: "⭐ Facile",
    emoji: "🌶️",
    description: "La sauce yéménite piquante aux herbes, ail et épices — une bombe de fraîcheur relevée à tartiner ou napper.",
    tableauZhoug: [
      { nb: 1, coriandre: "60 g", persil: "20 g", piment: "12 g", ail: "4", cumin: "4 g", cardamome: "4 g", huileOlive: "100 ml", citron: "32 ml" },
      { nb: 2, coriandre: "120 g", persil: "40 g", piment: "24 g", ail: "8", cumin: "8 g", cardamome: "8 g", huileOlive: "200 ml", citron: "64 ml" },
      { nb: 3, coriandre: "180 g", persil: "60 g", piment: "36 g", ail: "12", cumin: "12 g", cardamome: "12 g", huileOlive: "300 ml", citron: "96 ml" },
      { nb: 4, coriandre: "240 g", persil: "80 g", piment: "48 g", ail: "16", cumin: "16 g", cardamome: "16 g", huileOlive: "400 ml", citron: "128 ml" },
      { nb: 5, coriandre: "300 g", persil: "100 g", piment: "60 g", ail: "20", cumin: "20 g", cardamome: "20 g", huileOlive: "500 ml", citron: "160 ml" },
      { nb: 6, coriandre: "360 g", persil: "120 g", piment: "72 g", ail: "24", cumin: "24 g", cardamome: "24 g", huileOlive: "600 ml", citron: "192 ml" },
      { nb: 7, coriandre: "420 g", persil: "140 g", piment: "84 g", ail: "28", cumin: "28 g", cardamome: "28 g", huileOlive: "700 ml", citron: "224 ml" },
      { nb: 8, coriandre: "480 g", persil: "160 g", piment: "96 g", ail: "32", cumin: "32 g", cardamome: "32 g", huileOlive: "800 ml", citron: "256 ml" },
      { nb: 9, coriandre: "540 g", persil: "180 g", piment: "108 g", ail: "36", cumin: "36 g", cardamome: "36 g", huileOlive: "900 ml", citron: "288 ml" },
      { nb: 10, coriandre: "600 g", persil: "200 g", piment: "120 g", ail: "40", cumin: "40 g", cardamome: "40 g", huileOlive: "1000 ml", citron: "320 ml" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🌿", titre: "Herbes", detail: "Laver et effeuiller coriandre et persil.", badge: "⏱ 4 min" },
      { icone: "🌶️", titre: "Piment", detail: "Épépiner les piments pour doser la force. ASTUCE CHEF : garde quelques graines de piment si tu aimes très relevé, retire-les toutes pour une version douce.", badge: null },
      { icone: "🔥", titre: "Épices", detail: "Torréfier brièvement cumin et cardamome, puis piler.", badge: "⏱ 2 min" },
      { icone: "🌀", titre: "Mixer", detail: "Mixer herbes, ail, piment et épices.", badge: null },
      { icone: "🫒", titre: "Monter", detail: "Incorporer l'huile d'olive et le jus de citron.", badge: null },
      { icone: "🫙", titre: "Servir", detail: "Servir avec grillades, falafels, œufs ou en tartine.", badge: null }
    ]
  },
  chakalaka: {
    nom: "Chakalaka",
    cat: "sauces",
    pays: "afriquedusud",
    dateAjout: "2026-06-08T20:08:00",
    base: 1,
    temps: "30 min",
    niveau: "⭐ Facile",
    emoji: "🥫",
    description: "Le relish sud-africain épicé de légumes et haricots, qui accompagne braais et pap.",
    tableauChakalaka: [
      { nb: 1, carotte: "160 g", poivron: "120 g", oignon: "100 g", tomate: "160 g", haricotsrouges: "120 g", curry: "12 g", piment: "8 g" },
      { nb: 2, carotte: "320 g", poivron: "240 g", oignon: "200 g", tomate: "320 g", haricotsrouges: "240 g", curry: "24 g", piment: "16 g" },
      { nb: 3, carotte: "480 g", poivron: "360 g", oignon: "300 g", tomate: "480 g", haricotsrouges: "360 g", curry: "36 g", piment: "24 g" },
      { nb: 4, carotte: "640 g", poivron: "480 g", oignon: "400 g", tomate: "640 g", haricotsrouges: "480 g", curry: "48 g", piment: "32 g" },
      { nb: 5, carotte: "800 g", poivron: "600 g", oignon: "500 g", tomate: "800 g", haricotsrouges: "600 g", curry: "60 g", piment: "40 g" },
      { nb: 6, carotte: "960 g", poivron: "720 g", oignon: "600 g", tomate: "960 g", haricotsrouges: "720 g", curry: "72 g", piment: "48 g" },
      { nb: 7, carotte: "1120 g", poivron: "840 g", oignon: "700 g", tomate: "1120 g", haricotsrouges: "840 g", curry: "84 g", piment: "56 g" },
      { nb: 8, carotte: "1280 g", poivron: "960 g", oignon: "800 g", tomate: "1280 g", haricotsrouges: "960 g", curry: "96 g", piment: "64 g" },
      { nb: 9, carotte: "1440 g", poivron: "1080 g", oignon: "900 g", tomate: "1440 g", haricotsrouges: "1080 g", curry: "108 g", piment: "72 g" },
      { nb: 10, carotte: "1600 g", poivron: "1200 g", oignon: "1000 g", tomate: "1600 g", haricotsrouges: "1200 g", curry: "120 g", piment: "80 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🧅", titre: "Base", detail: "Faire revenir oignon, curry et piment.", badge: "⏱ 4 min" },
      { icone: "🥕", titre: "Carottes", detail: "Ajouter les carottes râpées et le poivron.", badge: "⏱ 5 min" },
      { icone: "🍅", titre: "Tomate", detail: "Ajouter les tomates et laisser compoter. ASTUCE CHEF : râpe les carottes finement pour qu'elles fondent dans la sauce et lui donnent son liant.", badge: "⏱ 10 min" },
      { icone: "🫘", titre: "Haricots", detail: "Incorporer les haricots rouges.", badge: "⏱ 5 min" },
      { icone: "♨️", titre: "Mijoter", detail: "Laisser mijoter pour lier les saveurs.", badge: "⏱ 5 min" },
      { icone: "🍽️", titre: "Servir", detail: "Servir tiède ou froid, en accompagnement.", badge: null }
    ]
  },
  ajvar: {
    nom: "Ajvar",
    cat: "sauces",
    pays: "serbie",
    dateAjout: "2026-06-08T20:14:00",
    base: 1,
    temps: "45 min",
    niveau: "⭐⭐ Moyen",
    emoji: "🥫",
    description: "Le caviar de poivrons rôtis des Balkans, doux et fumé, à tartiner ou en condiment.",
    tableauAjvar: [
      { nb: 1, poivron: "480 g", aubergine: "180 g", ail: "3", huileOlive: "90 ml", vinaigre: "30 ml", piment: "6 g" },
      { nb: 2, poivron: "960 g", aubergine: "360 g", ail: "6", huileOlive: "180 ml", vinaigre: "60 ml", piment: "12 g" },
      { nb: 3, poivron: "1440 g", aubergine: "540 g", ail: "9", huileOlive: "270 ml", vinaigre: "90 ml", piment: "18 g" },
      { nb: 4, poivron: "1920 g", aubergine: "720 g", ail: "12", huileOlive: "360 ml", vinaigre: "120 ml", piment: "24 g" },
      { nb: 5, poivron: "2400 g", aubergine: "900 g", ail: "15", huileOlive: "450 ml", vinaigre: "150 ml", piment: "30 g" },
      { nb: 6, poivron: "2880 g", aubergine: "1080 g", ail: "18", huileOlive: "540 ml", vinaigre: "180 ml", piment: "36 g" },
      { nb: 7, poivron: "3360 g", aubergine: "1260 g", ail: "21", huileOlive: "630 ml", vinaigre: "210 ml", piment: "42 g" },
      { nb: 8, poivron: "3840 g", aubergine: "1440 g", ail: "24", huileOlive: "720 ml", vinaigre: "240 ml", piment: "48 g" },
      { nb: 9, poivron: "4320 g", aubergine: "1620 g", ail: "27", huileOlive: "810 ml", vinaigre: "270 ml", piment: "54 g" },
      { nb: 10, poivron: "4800 g", aubergine: "1800 g", ail: "30", huileOlive: "900 ml", vinaigre: "300 ml", piment: "60 g" }
    ],
    ingredients: {},
    etapes: [
      { icone: "🔥", titre: "Rôtir", detail: "Rôtir les poivrons (et l'aubergine) jusqu'à ce que la peau noircisse.", badge: "⏱ 30 min" },
      { icone: "🫙", titre: "Peler", detail: "Enfermer les poivrons chauds puis les peler. ASTUCE CHEF : laisse-les suer 10 min couverts, la peau se retire alors sans effort.", badge: "⏱ 10 min" },
      { icone: "🌀", titre: "Mixer", detail: "Mixer la chair avec l'ail.", badge: null },
      { icone: "♨️", titre: "Réduire", detail: "Cuire à feu doux pour évaporer l'eau.", badge: "⏱ 15 min" },
      { icone: "🫒", titre: "Lier", detail: "Ajouter huile et vinaigre, mélanger.", badge: null },
      { icone: "🫙", titre: "Servir", detail: "Mettre en pot ; se tartine ou accompagne les grillades.", badge: null }
    ]
  },
});
