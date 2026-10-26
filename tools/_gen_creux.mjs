// Vague « Creux par pays » (26/10/2026) : 9 recettes pour 3 pays sous-dotés —
// Maurice, Cap-Vert, Mozambique. Plats AUTHENTIQUES mais moins connus, vérifiés
// absents du catalogue (les icônes type Dholl Puri / Cachupa / Matapa y sont déjà).
// FR complet (6-7 étapes) + EN (nom/description/étapes) + batch, tout à la main.
// Idempotent. Lancer :  node tools/_gen_creux.mjs
import fs from "node:fs";

const DATE = "2026-10-26T10:00:00";
const BASE = 6;

const DEFS = [
  // ========================= 🇲🇺 MAURICE =========================
  { key: "gateaupimentmaurice", nom: "Gâteau Piment", nomEn: "Gâteau Piment (Mauritian Split-Pea Fritters)",
    emoji: "🧆", cat: "aperitifs", pays: "maurice", temps: "30 min + 4h trempage", niveau: "⭐⭐ Moyen",
    desc: "Gâteau piment — les beignets de pois cassés de l'île Maurice : une pâte de pois jaunes trempés et mixés, relevée de piment, cumin et coriandre, frite en petites boules croustillantes. Le roi du street-food mauricien, à glisser dans un pain-maison au petit matin.",
    descEn: "Gâteau piment — Mauritius's split-pea fritters: a batter of soaked yellow peas blended with chilli, cumin and coriander, fried into crisp little balls. Mauritius's king of street food, tucked into a bread roll at dawn.",
    ing: [["poiscasses", 50, "g"], ["oignon", 20, "g"], ["ciboule", 10, "g"], ["piment", 2, "g"], ["coriandre", 4, "g"], ["huilefriture", 20, "ml"]],
    etapes: [
      ["🫘", "Tremper", "Faire tremper les pois cassés 4 h (ou une nuit) dans l'eau froide, puis les égoutter soigneusement.", "Soak", "Soak the split peas for 4 h (or overnight) in cold water, then drain thoroughly.", "⏱ 4 h"],
      ["🌀", "Mixer", "Mixer les pois en une pâte épaisse et granuleuse, SANS ajouter d'eau sinon les beignets se délitent.", "Blend", "Blend the peas to a thick, grainy paste WITHOUT adding water, or the fritters fall apart."],
      ["🌶️", "Assaisonner", "Incorporer oignon et ciboule finement hachés, piment, cumin, coriandre et sel.", "Season", "Fold in finely chopped onion and spring onion, chilli, cumin, coriander and salt."],
      ["🤏", "Façonner", "Former de petites boules aplaties à l'aide de deux cuillères.", "Shape", "Shape small flattened balls using two spoons."],
      ["🔥", "Chauffer", "Chauffer l'huile de friture à 170 °C.", "Heat", "Heat the frying oil to 170 °C."],
      ["🍳", "Frire", "Frire les gâteaux piment par petites fournées jusqu'à doré et croustillant.", "Fry", "Fry the fritters in small batches until golden and crisp."],
      ["🍞", "Servir", "Égoutter sur papier et servir chauds, nature ou dans un pain avec du chutney.", "Serve", "Drain on paper and serve hot, plain or in a bread roll with chutney."]
    ],
    batch: { prepAvance: "ok", sauceAPart: false, etapesBatch: [1, 2, 3, 4], etapesMinute: [5, 6, 7], mutualise: ["mixer-legumineuses"], conservation: { frigo: 1, congel: "moyen", note: "La pâte se garde 1 j au frigo. Les beignets frits perdent vite leur croustillant : à frire minute." }, rechauffe: 5, conseilSoir: "Prépare la pâte et façonne à l'avance ; fris à la dernière minute, quand les invités arrivent, pour le croustillant." } },

  { key: "minefritemaurice", nom: "Mine Frite", nomEn: "Mine Frite (Mauritian Fried Noodles)",
    emoji: "🍜", cat: "plats", pays: "maurice", temps: "35 min", niveau: "⭐ Facile",
    desc: "Mine frite — les nouilles sautées sino-mauriciennes : des nouilles aux œufs saisies au wok avec poulet, chou et carotte, parfumées à l'ail et à la sauce soja. Le plat du quotidien de Maurice, rapide et réconfortant, hérité des migrants chinois.",
    descEn: "Mine frite — Mauritius's Sino-Mauritian stir-fried noodles: egg noodles seared in the wok with chicken, cabbage and carrot, scented with garlic and soy sauce. The island's everyday dish, quick and comforting, inherited from Chinese migrants.",
    ing: [["nouillesoeuf", 80, "g"], ["blancpoulet", 60, "g"], ["chou", 60, "g"], ["carotte", 40, "g"], ["ciboule", 10, "g"], ["saucesoja", 15, "ml"], ["ail", 4, "g"], ["huile", 10, "ml"]],
    etapes: [
      ["💧", "Cuire les nouilles", "Précuire les nouilles aux œufs, les rincer à l'eau froide et les huiler légèrement pour qu'elles ne collent pas.", "Cook the noodles", "Par-cook the egg noodles, rinse under cold water and oil lightly so they don't stick."],
      ["🔪", "Tailler", "Émincer le poulet en lanières, le chou en fines lanières et la carotte en julienne.", "Cut", "Slice the chicken into strips, the cabbage into thin ribbons and the carrot into julienne."],
      ["🔥", "Wok brûlant", "Chauffer l'huile très fort, saisir l'ail puis le poulet jusqu'à coloration.", "Hot wok", "Heat the oil until nearly smoking, sear the garlic then the chicken until coloured."],
      ["🥬", "Légumes", "Ajouter chou et carotte, sauter 2 min en gardant du croquant.", "Vegetables", "Add cabbage and carrot, stir-fry 2 min keeping them crunchy."],
      ["🍜", "Sauter", "Jeter les nouilles, verser la sauce soja et sauter vivement pour tout enrober.", "Toss", "Throw in the noodles, pour the soy sauce and toss briskly to coat."],
      ["🌿", "Finir", "Parsemer de ciboule et poivrer généreusement.", "Finish", "Scatter spring onion and pepper generously."],
      ["🍽️", "Servir", "Servir aussitôt, bien chaud, directement du wok.", "Serve", "Serve at once, piping hot, straight from the wok."]
    ],
    batch: { prepAvance: "ok", sauceAPart: false, etapesBatch: [1, 2], etapesMinute: [3, 4, 5, 6, 7], mutualise: [], conservation: { frigo: 1, congel: "non", note: "Nouilles précuites et légumes taillés se gardent 1 j. Le sauté se fait minute, sinon les nouilles collent." }, rechauffe: 0, conseilSoir: "Précuis les nouilles et taille tout à l'avance ; le wok se fait en 5 min au dernier moment, à feu vif." } },

  { key: "rougaillesaucisses", nom: "Rougaille Saucisses", nomEn: "Rougaille Saucisses (Creole Sausage & Tomato Stew)",
    emoji: "🌶️", cat: "plats", pays: "maurice", temps: "45 min", niveau: "⭐ Facile",
    desc: "Rougaille saucisses — le mijoté créole de l'île Maurice : des saucisses pochées puis revenues dans une sauce tomate vive relevée de gingembre, d'ail, de thym et de piment. Servi avec du riz blanc, c'est LE repas-maison du dimanche mauricien.",
    descEn: "Rougaille saucisses — Mauritius's Creole stew: sausages poached then simmered in a bright tomato sauce lifted with ginger, garlic, thyme and chilli. Served with white rice, it's THE Mauritian Sunday home meal.",
    ing: [["saucisse", 120, "g"], ["tomate", 150, "g"], ["oignon", 50, "g"], ["ail", 5, "g"], ["gingembre", 5, "g"], ["thym", 1, "g"], ["piment", 2, "g"], ["huile", 10, "ml"]],
    etapes: [
      ["💧", "Pocher", "Pocher les saucisses 5 min à l'eau frémissante pour les dégraisser, puis les trancher en biais.", "Poach", "Poach the sausages 5 min in simmering water to degrease, then slice on the bias."],
      ["🔪", "Hacher", "Hacher oignon, ail et gingembre ; concasser les tomates.", "Chop", "Chop onion, garlic and ginger; crush the tomatoes."],
      ["🍳", "Saisir", "Colorer les tranches de saucisse dans l'huile, puis les réserver.", "Sear", "Brown the sausage slices in the oil, then set aside."],
      ["🧅", "Fondre", "Faire fondre oignon, ail et gingembre dans la même poêle.", "Soften", "Soften onion, garlic and ginger in the same pan."],
      ["🍅", "Tomate", "Ajouter la tomate, le thym et le piment, laisser compoter 10 min.", "Tomato", "Add tomato, thyme and chilli, let it stew down 10 min."],
      ["⏲️", "Mijoter", "Remettre les saucisses et mijoter 15 min jusqu'à une sauce bien liée.", "Simmer", "Return the sausages and simmer 15 min to a thick sauce."],
      ["🍚", "Servir", "Parsemer de ciboule et servir avec du riz blanc.", "Serve", "Scatter spring onion and serve with white rice."]
    ],
    batch: { prepAvance: "ideal", sauceAPart: false, etapesBatch: [1, 2, 3, 4, 5, 6], etapesMinute: [7], mutualise: ["mijote", "emincer-oignon"], conservation: { frigo: 3, congel: "oui", note: "Se bonifie 24 h. Congèle très bien 2 mois, la sauce s'intensifie." }, rechauffe: 12, conseilSoir: "Réchauffe à feu doux 12 min à couvert ; cuis le riz blanc à la dernière minute et parsème de ciboule fraîche." } },

  // ========================= 🇨🇻 CAP-VERT =========================
  { key: "caldopeixe", nom: "Caldo de Peixe", nomEn: "Caldo de Peixe (Cape Verdean Fish Soup)",
    emoji: "🐟", cat: "soupes", pays: "caboverde", temps: "50 min", niveau: "⭐ Facile",
    desc: "Caldo de peixe — la soupe de poisson du Cap-Vert : des darnes de poisson pochées dans un bouillon de tomate et d'oignon avec manioc et pomme de terre. Le réconfort iodé des îles, simple, nourrissant et parfumé au citron vert.",
    descEn: "Caldo de peixe — Cape Verde's fish soup: fish steaks poached in a tomato-and-onion broth with cassava and potato. The islands' briny comfort, simple, filling and scented with lime.",
    ing: [["poisson", 150, "g"], ["manioc", 70, "g"], ["pommedeterre", 80, "g"], ["tomate", 60, "g"], ["oignon", 40, "g"], ["ail", 5, "g"]],
    etapes: [
      ["🔪", "Préparer", "Éplucher et couper le manioc et la pomme de terre en gros morceaux.", "Prepare", "Peel and cut the cassava and potato into large chunks."],
      ["🧅", "Base", "Faire revenir oignon et ail, ajouter la tomate concassée et laisser compoter.", "Base", "Soften onion and garlic, add crushed tomato and let it stew."],
      ["💧", "Bouillon", "Mouiller d'eau, saler, porter à frémissement.", "Broth", "Cover with water, salt, bring to a gentle simmer."],
      ["🥔", "Légumes", "Cuire le manioc et la pomme de terre 15 min jusqu'à presque tendres.", "Vegetables", "Cook the cassava and potato 15 min until almost tender."],
      ["🐟", "Poisson", "Déposer les darnes de poisson et pocher 8-10 min sans jamais bouillir.", "Fish", "Lay in the fish steaks and poach 8-10 min without ever boiling."],
      ["🍋", "Relever", "Ajouter un filet de citron vert et de la coriandre ciselée.", "Lift", "Add a squeeze of lime and chopped coriander."],
      ["🍽️", "Servir", "Servir brûlant, le poisson et les légumes dans le bouillon.", "Serve", "Serve piping hot, fish and vegetables in the broth."]
    ],
    batch: { prepAvance: "ok", sauceAPart: false, etapesBatch: [1, 2, 3, 4], etapesMinute: [5, 6, 7], mutualise: ["mijote"], conservation: { frigo: 2, congel: "non", note: "Le bouillon et les légumes se préparent la veille ; le poisson se poche minute pour rester moelleux." }, rechauffe: 8, conseilSoir: "Prépare bouillon et racines à l'avance ; réchauffe, puis poche le poisson 8-10 min juste avant de servir." } },

  { key: "djagacida", nom: "Djagacida", nomEn: "Djagacida (Cape Verdean Rice & Beans)",
    emoji: "🍚", cat: "plats", pays: "caboverde", temps: "45 min + trempage", niveau: "⭐ Facile",
    desc: "Djagacida (ou « jag ») — le riz-haricots du Cap-Vert : des haricots mijotés puis le riz cuit dedans, parfumé à l'oignon, l'ail et le laurier, relevé d'un peu de saucisse fumée. Le plat-maison par excellence, roboratif et économique.",
    descEn: "Djagacida (or «jag») — Cape Verde's rice and beans: beans simmered, then rice cooked right in, scented with onion, garlic and bay, lifted with a little smoked sausage. The ultimate home dish, hearty and thrifty.",
    ing: [["riz", 70, "g"], ["haricotsrouges", 50, "g"], ["chorizo", 25, "g"], ["oignon", 40, "g"], ["ail", 5, "g"], ["huile", 8, "ml"]],
    etapes: [
      ["🫘", "Tremper", "Faire tremper les haricots une nuit, puis les cuire à l'eau jusqu'à tendres (garder l'eau de cuisson).", "Soak", "Soak the beans overnight, then boil until tender (keep the cooking water).", "⏱ 1 nuit"],
      ["🌭", "Revenir", "Faire revenir la saucisse fumée émincée, retirer une partie du gras rendu.", "Render", "Fry the sliced smoked sausage, remove some of the rendered fat."],
      ["🧅", "Base", "Faire fondre oignon et ail dans le même fait-tout.", "Base", "Soften onion and garlic in the same pot."],
      ["🍚", "Nacrer", "Ajouter le riz et l'enrober du gras parfumé 1 min.", "Coat", "Add the rice and coat it in the scented fat for 1 min."],
      ["💧", "Mouiller", "Verser les haricots et leur eau, le laurier, saler.", "Moisten", "Pour in the beans and their water, the bay leaf, season."],
      ["⏲️", "Cuire", "Couvrir et cuire à feu doux 18 min jusqu'à absorption complète.", "Cook", "Cover and cook on low 18 min until fully absorbed."],
      ["🍽️", "Servir", "Laisser reposer 5 min, aérer à la fourchette et servir.", "Serve", "Rest 5 min, fluff with a fork and serve."]
    ],
    batch: { prepAvance: "ideal", sauceAPart: false, etapesBatch: [1, 2, 3], etapesMinute: [4, 5, 6, 7], mutualise: ["tremper-legumineuses"], conservation: { frigo: 3, congel: "oui", note: "Les haricots cuits se préparent la veille. Le plat complet se garde 3 j et se réchauffe bien." }, rechauffe: 10, conseilSoir: "Cuis les haricots à l'avance ; monte le riz le soir en 20 min, un filet d'eau au réchauffage s'il a séché." } },

  { key: "xeremcamarao", nom: "Xerém de Camarão", nomEn: "Xerém de Camarão (Cape Verdean Corn & Shrimp)",
    emoji: "🌽", cat: "plats", pays: "caboverde", temps: "45 min", niveau: "⭐⭐ Moyen",
    desc: "Xerém de camarão — la bouillie de maïs concassé du Cap-Vert aux crevettes : une polenta rustique mijotée longuement, enrichie d'un sofrito tomate-oignon et de crevettes. Cousine de la cachupa, c'est le plat réconfortant des îles, crémeux et iodé.",
    descEn: "Xerém de camarão — Cape Verde's cracked-corn porridge with shrimp: a rustic polenta simmered long, enriched with a tomato-onion sofrito and shrimp. A cousin of cachupa, it's the islands' creamy, briny comfort dish.",
    ing: [["farinemais", 70, "g"], ["crevettes", 60, "g"], ["tomate", 50, "g"], ["oignon", 40, "g"], ["ail", 5, "g"], ["huile", 10, "ml"]],
    etapes: [
      ["🧅", "Sofrito", "Faire fondre oignon et ail dans l'huile, ajouter la tomate et laisser compoter.", "Sofrito", "Soften onion and garlic in the oil, add the tomato and let it stew."],
      ["🦐", "Crevettes", "Faire sauter les crevettes 2 min, puis les réserver.", "Shrimp", "Sauté the shrimp 2 min, then set aside."],
      ["💧", "Bouillon", "Mouiller le sofrito d'eau (ou de fumet) et porter à frémissement.", "Broth", "Loosen the sofrito with water (or stock) and bring to a simmer."],
      ["🌽", "Maïs", "Verser la farine de maïs EN PLUIE en fouettant pour éviter les grumeaux.", "Corn", "Rain in the cornmeal while whisking to avoid lumps."],
      ["🥄", "Remuer", "Cuire à feu doux 20 min en remuant : le xerém épaissit et devient crémeux.", "Stir", "Cook on low 20 min, stirring: the xerém thickens to a cream."],
      ["🦐", "Réunir", "Remettre les crevettes, rectifier le sel, ajouter de la coriandre.", "Combine", "Return the shrimp, adjust salt, add coriander."],
      ["🍽️", "Servir", "Servir chaud, nappé d'un filet d'huile.", "Serve", "Serve hot, with a drizzle of oil."]
    ],
    batch: { prepAvance: "ok", sauceAPart: false, etapesBatch: [1, 2, 3], etapesMinute: [4, 5, 6, 7], mutualise: ["sofrito"], conservation: { frigo: 2, congel: "non", note: "Le sofrito se prépare la veille ; la bouillie de maïs épaissit en refroidissant, à cuire minute." }, rechauffe: 8, conseilSoir: "Prépare le sofrito et saute les crevettes à l'avance ; monte le xerém au maïs au dernier moment, il se tient mal réchauffé." } },

  // ========================= 🇲🇿 MOZAMBIQUE =========================
  { key: "bolopolana", nom: "Bolo Polana", nomEn: "Bolo Polana (Mozambican Cashew & Potato Cake)",
    emoji: "🍰", cat: "desserts", pays: "mozambique", temps: "1h", niveau: "⭐⭐ Moyen",
    desc: "Bolo Polana — le gâteau emblématique de Maputo : une base fondante de pomme de terre et de noix de cajou moulues, parfumée au citron, dorée au four. Héritage portugais revisité à la cajou locale, c'est le dessert de fête mozambicain, dense et moelleux.",
    descEn: "Bolo Polana — Maputo's signature cake: a tender base of potato and ground cashews, scented with lemon and baked golden. A Portuguese legacy reworked with local cashew, it's Mozambique's celebration dessert, dense and moist.",
    ing: [["pommedeterre", 80, "g"], ["cajou", 50, "g"], ["sucre", 45, "g"], ["beurre", 25, "g"], ["oeufs", 0.3, ""], ["zestecitron", 0.3, ""]],
    etapes: [
      ["🥔", "Purée", "Cuire les pommes de terre, les écraser en purée lisse et laisser tiédir.", "Mash", "Boil the potatoes, mash smooth and let cool slightly."],
      ["🥜", "Cajou", "Mixer les noix de cajou en poudre fine.", "Cashews", "Grind the cashews to a fine powder."],
      ["🧈", "Crémer", "Battre le beurre et le sucre jusqu'à blanchiment.", "Cream", "Beat the butter and sugar until pale."],
      ["🥚", "Appareil", "Incorporer les jaunes, le zeste de citron, la purée et la poudre de cajou.", "Batter", "Fold in the yolks, lemon zest, the mash and the cashew powder."],
      ["☁️", "Monter", "Monter les blancs en neige et les incorporer délicatement.", "Whip", "Whip the whites to peaks and fold in gently."],
      ["🔥", "Cuire", "Verser dans un moule beurré et cuire à 170 °C environ 40 min.", "Bake", "Pour into a buttered tin and bake at 170 °C for about 40 min.", "⏱ 40 min"],
      ["🍰", "Démouler", "Laisser refroidir, démouler et saupoudrer de sucre glace.", "Turn out", "Let cool, turn out and dust with icing sugar."]
    ],
    batch: { prepAvance: "ok", sauceAPart: false, etapesBatch: [1, 2], etapesMinute: [3, 4, 5, 6, 7], mutualise: [], conservation: { frigo: 4, congel: "oui", note: "Se garde 4 j au frais, moelleux ; congèle bien 2 mois. La purée et la poudre de cajou se préparent la veille." }, rechauffe: 0, conseilSoir: "Prépare purée et cajou moulu à l'avance ; le gâteau se fait le jour même ou la veille, il est meilleur reposé." } },

  { key: "rissoiscamarao", nom: "Rissóis de Camarão", nomEn: "Rissóis de Camarão (Mozambican Shrimp Rissoles)",
    emoji: "🥟", cat: "aperitifs", pays: "mozambique", temps: "1h", niveau: "⭐⭐ Moyen",
    desc: "Rissóis de camarão — les chaussons de crevettes du Mozambique : une pâte cuite à l'eau bouillante, farcie d'une béchamel aux crevettes, panée puis frite dorée. Héritage portugais des tables côtières, croustillant dehors, crémeux dedans.",
    descEn: "Rissóis de camarão — Mozambique's shrimp turnovers: a dough cooked in boiling water, filled with a shrimp béchamel, breaded then fried golden. A Portuguese legacy of the coastal tables, crisp outside, creamy within.",
    ing: [["crevettes", 60, "g"], ["farine", 50, "g"], ["lait", 90, "ml"], ["beurre", 15, "g"], ["oignon", 20, "g"], ["oeufs", 0.2, ""], ["chapelure", 20, "g"], ["huilefriture", 20, "ml"]],
    etapes: [
      ["🦐", "Farce", "Faire revenir oignon et crevettes hachées, puis lier avec une béchamel épaisse.", "Filling", "Sauté onion and chopped shrimp, then bind with a thick béchamel."],
      ["❄️", "Refroidir", "Étaler la farce et la faire prendre au frais.", "Chill", "Spread the filling and let it set in the fridge."],
      ["🥣", "Pâte", "Porter lait, eau et beurre à ébullition, verser la farine d'un coup et travailler en boule.", "Dough", "Bring milk, water and butter to a boil, add the flour at once and work to a ball."],
      ["⚪", "Abaisser", "Abaisser finement la pâte et découper des disques.", "Roll", "Roll the dough thin and cut discs."],
      ["🥟", "Garnir", "Déposer la farce, replier en demi-lune et bien souder les bords.", "Fill", "Spoon in the filling, fold into half-moons and seal the edges well."],
      ["🥖", "Paner", "Passer dans l'œuf battu puis la chapelure.", "Bread", "Dip in beaten egg then breadcrumbs."],
      ["🍳", "Frire", "Frire à 175 °C jusqu'à doré, égoutter et servir chaud.", "Fry", "Fry at 175 °C until golden, drain and serve hot."]
    ],
    batch: { prepAvance: "ideal", sauceAPart: false, etapesBatch: [1, 2, 3, 4, 5, 6], etapesMinute: [7], mutualise: [], conservation: { frigo: 2, congel: "oui", note: "Les rissóis panés crus se congèlent très bien ; friture minute pour le croustillant." }, rechauffe: 4, conseilSoir: "Monte et pane les rissóis à l'avance (ou congèle-les) ; fris-les à la minute, ils doivent être servis chauds et croustillants." } },

  { key: "carilcaranguejo", nom: "Caril de Caranguejo", nomEn: "Caril de Caranguejo (Mozambican Crab Curry)",
    emoji: "🦀", cat: "plats", pays: "mozambique", temps: "50 min", niveau: "⭐⭐ Moyen",
    desc: "Caril de caranguejo — le curry de crabe du Mozambique : des morceaux de crabe mijotés dans une sauce au lait de coco, tomate et curry, relevée de piment et d'ail. L'empreinte indo-portugaise de la côte swahilie, riche, épicée et parfumée.",
    descEn: "Caril de caranguejo — Mozambique's crab curry: crab pieces simmered in a coconut-milk, tomato and curry sauce, lifted with chilli and garlic. The Indo-Portuguese mark of the Swahili coast, rich, spiced and fragrant.",
    ing: [["crabe", 150, "g"], ["laitcoco", 80, "ml"], ["tomate", 60, "g"], ["oignon", 40, "g"], ["ail", 5, "g"], ["curry", 3, "g"], ["piment", 2, "g"], ["huile", 10, "ml"]],
    etapes: [
      ["🦀", "Préparer", "Rincer les morceaux de crabe et les casser légèrement pour qu'ils prennent la sauce.", "Prepare", "Rinse the crab pieces and crack them lightly so they soak up the sauce."],
      ["🧅", "Base", "Faire fondre oignon et ail dans l'huile.", "Base", "Soften onion and garlic in the oil."],
      ["🍛", "Épices", "Ajouter le curry et le piment, torréfier 1 min pour libérer les arômes.", "Spices", "Add the curry and chilli, toast 1 min to release the aromas."],
      ["🍅", "Tomate", "Incorporer la tomate et laisser réduire.", "Tomato", "Stir in the tomato and reduce."],
      ["🥥", "Coco", "Verser le lait de coco et porter à frémissement.", "Coconut", "Pour the coconut milk and bring to a gentle simmer."],
      ["⏲️", "Mijoter", "Ajouter le crabe et mijoter 15 min à couvert.", "Simmer", "Add the crab and simmer 15 min, covered."],
      ["🍚", "Servir", "Parsemer de coriandre et servir avec du riz.", "Serve", "Scatter coriander and serve with rice."]
    ],
    batch: { prepAvance: "ok", sauceAPart: false, etapesBatch: [1, 2, 3, 4, 5], etapesMinute: [6, 7], mutualise: ["mijote"], conservation: { frigo: 2, congel: "non", note: "La sauce au coco se prépare la veille ; le crabe s'ajoute au réchauffage pour ne pas le surcuire." }, rechauffe: 10, conseilSoir: "Prépare la sauce coco-curry à l'avance ; ajoute le crabe et laisse mijoter 15 min juste avant de servir, avec du riz chaud." } }
];

// ---------- Expansion ----------
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function rows(ing) {
  const out = [];
  for (let nb = 1; nb <= 15; nb++) {
    const parts = ing.map(([k, per, u]) => {
      const v = per * nb;
      if (u === "") { // œufs, zestes… : sans unité, on garde une décimale au besoin
        const s = Number.isInteger(v) ? String(v) : (Math.round(v * 10) / 10).toFixed(1);
        return `${k}: "${s}"`;
      }
      return `${k}: "${Math.round(v)} ${u}"`;
    });
    out.push(`      { nb: ${nb}, ${parts.join(", ")} }`);
  }
  return out.join(",\n");
}

function recetteFR(d) {
  const tName = "tableau" + cap(d.key);
  const etapes = d.etapes.map(([i, t, det, , , badge]) =>
    `      { icone: "${i}", titre: "${t}", detail: "${det}", badge: ${badge ? `"${badge}"` : "null"} }`
  ).join(",\n");
  return `  ${d.key}: {
    nom: "${d.nom}",
    cat: "${d.cat}", pays: "${d.pays}",
    dateAjout: "${DATE}",
    base: ${BASE},
    temps: "${d.temps}",
    niveau: "${d.niveau}",
    emoji: "${d.emoji}",
    description: "${d.desc}",
    ${tName}: [
${rows(d.ing)}
    ],
    ingredients: {},
    etapes: [
${etapes}
    ]
  }`;
}

function enEntry(d) {
  const obj = { nom: d.nomEn, description: d.descEn, etapes: d.etapes.map(([, , , te, de]) => ({ titre: te, detail: de })) };
  return `  ${JSON.stringify(d.key)}: ${JSON.stringify(obj)}`;
}

function batchEntry(d) {
  return `  ${JSON.stringify(d.key)}: ${JSON.stringify(d.batch)}`;
}

// ---------- Écriture idempotente ----------
function retirerCle(src, key) {
  const re = new RegExp("\\n[ \\t]*\"?" + key + "\"?:[ \\t]*\\{");
  const m = re.exec(src);
  if (!m) return src;
  let i = src.indexOf("{", m.index), depth = 0, end = -1;
  for (; i < src.length; i++) { const c = src[i]; if (c === "{") depth++; else if (c === "}") { depth--; if (depth === 0) { end = i; break; } } }
  let after = end + 1; if (src[after] === ",") after++;
  return src.slice(0, m.index) + src.slice(after);
}
function majFichier(file, marqueur, bloc, keys) {
  let src = fs.readFileSync(file, "utf8");
  for (const k of keys) src = retirerCle(src, k);
  const idx = src.lastIndexOf(marqueur);
  let head = src.slice(0, idx).replace(/\s+$/, "");
  if (!head.endsWith(",") && !head.endsWith("{")) head += ",";
  src = head + "\n" + bloc + "\n" + src.slice(idx);
  fs.writeFileSync(file, src);
}

const keys = DEFS.map((d) => d.key);
majFichier("js/recettes_plats.js", "});", DEFS.map(recetteFR).join(",\n"), keys);
majFichier("js/recettes_en.js", "};", DEFS.map(enEntry).join(",\n"), keys);
majFichier("js/recettes_batch.js", "};", DEFS.map(batchEntry).join(",\n"), keys);
console.log("✅ " + DEFS.length + " recettes « creux par pays » insérées (FR 6-7 étapes + EN complet + batch).");
console.log("   Pays : " + [...new Set(DEFS.map((d) => d.pays))].join(", "));
