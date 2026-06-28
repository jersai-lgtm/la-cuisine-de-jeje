// Vague 5 « Moyen-Orient » (Iran + Égypte + Palestine + Israël) : 19 recettes — 6 à 8 étapes.
// Idempotent. FR (recettes_plats.js) + EN nom/description (recettes_en.js). Étapes EN via pipeline.
// Lancer : node tools/_gen_moyenorient.mjs
import fs from "fs";
const DATE = "2026-06-27T12:00:00";
const base = 4;

const DEFS = [
  // ---------- IRAN ----------
  { key:"ghormehsabzi", nom:"Ghormeh Sabzi", nomEn:"Ghormeh Sabzi (Persian Herb Stew)", emoji:"🥘", cat:"plats", pays:"iran", temps:"2h15", niveau:"⭐⭐ Moyen",
    desc:"Le ragoût national iranien : un océan d'herbes longuement fondues avec de l'agneau, des haricots rouges et du citron séché. Profond, acidulé, inoubliable.",
    descEn:"Iran's national stew: a sea of herbs slowly melted with lamb, kidney beans and dried lime. Deep, tangy, unforgettable.",
    ing:[["agneau",130,"g"],["epinard",60,"g"],["persil",20,"g"],["haricotsrouges",40,"g"],["oignon",50,"g"],["citron",10,"ml"]],
    etapes:[
      ["🔪","Préparer","Hacher finement persil, coriandre et épinards ; émincer l'oignon."],
      ["🌿","Fondre","Faire revenir longuement les herbes à feu moyen jusqu'à ce qu'elles foncent (15 min)."],
      ["🧅","Oignon","Dans une cocotte, blondir l'oignon puis ajouter l'agneau en morceaux."],
      ["🥩","Saisir","Colorer la viande, ajouter curcuma, sel et poivre."],
      ["💧","Mijoter","Couvrir d'eau, ajouter les haricots rouges, mijoter 1h30 à feu doux."],
      ["🌿","Réunir","Incorporer les herbes fondues et le citron séché percé."],
      ["⏲️","Réduire","Poursuivre 30 min : la sauce doit épaissir et l'huile perler."],
      ["🍚","Servir","Servir avec un riz basmati vapeur."]
    ] },

  { key:"mirzaghasemi", nom:"Mirza Ghasemi", nomEn:"Mirza Ghasemi (Smoky Eggplant)", emoji:"🍆", cat:"entrees", pays:"iran", temps:"40 min", niveau:"⭐ Facile",
    desc:"Caviar d'aubergine fumée de la Caspienne, fondu avec tomate, ail et œuf. Velouté, fumé et réconfortant, servi avec du pain.",
    descEn:"A Caspian smoky-eggplant dip melted with tomato, garlic and egg. Velvety, smoky and comforting, served with bread.",
    ing:[["aubergine",150,"g"],["tomate",70,"g"],["oeuf",50,"g"],["ail",8,"g"],["huile",10,"ml"]],
    etapes:[
      ["🔥","Brûler","Griller les aubergines à la flamme jusqu'à peau noire et chair fondante."],
      ["🥄","Peler","Les peler et écraser la chair fumée à la fourchette."],
      ["🧄","Ail","Faire blondir l'ail émincé dans l'huile avec le curcuma."],
      ["🍆","Réunir","Ajouter la pulpe d'aubergine et faire revenir 5 min."],
      ["🍅","Tomate","Incorporer la tomate concassée, cuire jusqu'à évaporation."],
      ["🥚","Œufs","Casser les œufs dans la poêle et brouiller doucement."],
      ["🍞","Servir","Servir tiède avec du pain plat et un peu d'huile."]
    ] },

  { key:"abgoosht", nom:"Abgoosht (Dizi)", nomEn:"Abgoosht (Dizi)", emoji:"🍲", cat:"plats", pays:"iran", temps:"2h30", niveau:"⭐⭐ Moyen",
    desc:"Pot-au-feu iranien d'agneau, pois chiches et haricots, servi en deux temps : le bouillon d'abord, puis la viande écrasée. Rustique et généreux.",
    descEn:"An Iranian lamb, chickpea and bean hotpot served in two parts: the broth first, then the mashed meat. Rustic and generous.",
    ing:[["agneau",130,"g"],["poischiches",40,"g"],["haricotsrouges",30,"g"],["pommedeterre",100,"g"],["tomate",50,"g"],["oignon",50,"g"]],
    etapes:[
      ["🫘","Tremper","Faire tremper pois chiches et haricots la veille."],
      ["🥩","Démarrer","Mettre l'agneau, les légumineuses et l'oignon dans une cocotte d'eau."],
      ["♨️","Écumer","Porter à frémissement et écumer soigneusement."],
      ["🌶️","Parfumer","Ajouter curcuma, citron séché et concentré de tomate."],
      ["⏲️","Mijoter","Cuire 2h à feu très doux jusqu'à fondant."],
      ["🥔","Pommes de terre","Ajouter les pommes de terre en fin de cuisson."],
      ["🥣","Séparer","Filtrer : servir le bouillon avec du pain en 1er service."],
      ["🥔","Écraser","Écraser viande, légumineuses et pommes de terre pour le 2e service."]
    ] },

  { key:"sholezard", nom:"Shole Zard", nomEn:"Shole Zard (Saffron Rice Pudding)", emoji:"🍮", cat:"desserts", pays:"iran", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Riz au lait safrané d'un jaune éclatant, parfumé à la fleur d'oranger et décoré d'amandes et de cannelle. La douceur des fêtes persanes.",
    descEn:"A vivid-yellow saffron rice pudding scented with orange blossom, topped with almonds and cinnamon. A Persian festive sweet.",
    ing:[["riz",60,"g"],["sucre",50,"g"],["safran",1,"g"],["amande",15,"g"],["eauFleurOranger",5,"ml"]],
    etapes:[
      ["🍚","Cuire","Cuire le riz dans beaucoup d'eau jusqu'à ce qu'il se défasse."],
      ["🌼","Safran","Infuser le safran dans un peu d'eau chaude."],
      ["🍯","Sucrer","Ajouter le sucre et l'infusion de safran au riz."],
      ["⏲️","Épaissir","Cuire à feu doux en remuant jusqu'à consistance crémeuse."],
      ["💧","Parfumer","Ajouter l'eau de fleur d'oranger en fin de cuisson."],
      ["🥣","Mouler","Verser dans des coupelles et laisser prendre au frais."],
      ["🌰","Décorer","Décorer de cannelle, amandes effilées et pistaches."]
    ] },

  { key:"adaspolo", nom:"Adas Polo", nomEn:"Adas Polo (Lentil Rice)", emoji:"🍚", cat:"plats", pays:"iran", temps:"50 min", niveau:"⭐ Facile",
    desc:"Riz aux lentilles persan, sucré-salé, parsemé de dattes et de raisins secs caramélisés. Un plat doux et parfumé, souvent servi avec un tahdig doré.",
    descEn:"Persian lentil rice, sweet-and-savoury, dotted with caramelized dates and raisins. A gentle, fragrant dish, often served with golden tahdig.",
    ing:[["riz",80,"g"],["lentilles",40,"g"],["dattes",25,"g"],["raisinssecs",15,"g"],["oignon",40,"g"]],
    etapes:[
      ["🫘","Lentilles","Cuire les lentilles jusqu'à tendreté sans les défaire."],
      ["🍚","Riz","Précuire le riz à l'eau bouillante salée puis l'égoutter."],
      ["🧅","Caraméliser","Faire dorer l'oignon, puis dattes et raisins secs."],
      ["🌼","Safran","Préparer une infusion de safran."],
      ["🥘","Monter","Alterner riz et lentilles en dôme dans la cocotte."],
      ["⏲️","Étuver","Cuire à couvert à feu doux pour former le tahdig au fond."],
      ["🍽️","Servir","Dresser, couronner de dattes-raisins et arroser de safran."]
    ] },

  // ---------- ÉGYPTE ----------
  { key:"tameya", nom:"Ta'ameya", nomEn:"Ta'ameya (Egyptian Fava Falafel)", emoji:"🧆", cat:"aperitifs", pays:"egypte", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Le falafel égyptien, à la fève au lieu du pois chiche : ultra-vert à cœur, herbacé, croustillant dehors. L'âme du petit-déjeuner du Caire.",
    descEn:"Egyptian falafel made with fava beans instead of chickpeas: vivid green inside, herby, crisp outside. The soul of a Cairo breakfast.",
    ing:[["feves",90,"g"],["persil",15,"g"],["oignon",30,"g"],["ail",5,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🫘","Tremper","Tremper les fèves sèches décortiquées 12 h, puis égoutter."],
      ["🌀","Mixer","Mixer fèves, persil, coriandre, oignon et ail en pâte verte."],
      ["🧂","Assaisonner","Ajouter cumin, coriandre moulue, sel et bicarbonate."],
      ["⏲️","Reposer","Laisser reposer 30 min pour que la pâte se tienne."],
      ["🟢","Former","Façonner des galettes et les rouler dans le sésame."],
      ["🔥","Chauffer","Chauffer l'huile à 170 °C."],
      ["🍳","Frire","Frire jusqu'à doré foncé et croustillant."],
      ["🍽️","Servir","Servir en sandwich pita avec tahini et salade."]
    ] },

  { key:"mahshi", nom:"Mahshi", nomEn:"Mahshi (Stuffed Vegetables)", emoji:"🫑", cat:"plats", pays:"egypte", temps:"1h15", niveau:"⭐⭐ Moyen",
    desc:"Légumes farcis d'un riz aux herbes parfumé, mijotés dans une sauce tomate. Le plat familial par excellence, patient et généreux.",
    descEn:"Vegetables stuffed with a fragrant herbed rice, simmered in tomato sauce. The ultimate family dish — patient and generous.",
    ing:[["riz",60,"g"],["courgette",100,"g"],["tomate",80,"g"],["oignon",40,"g"],["persil",10,"g"]],
    etapes:[
      ["🌿","Farce","Mélanger riz, herbes hachées, oignon, tomate et épices."],
      ["🔪","Évider","Évider courgettes et poivrons (ou préparer des feuilles)."],
      ["🥄","Farcir","Garnir les légumes de riz aux trois quarts (le riz gonfle)."],
      ["🥘","Ranger","Les ranger serrés dans une cocotte tapissée de tomate."],
      ["🍅","Sauce","Couvrir d'une sauce tomate légère et d'un filet d'huile."],
      ["⏲️","Mijoter","Cuire à couvert 45 min à feu doux."],
      ["💧","Vérifier","Vérifier que le riz est cuit et la sauce réduite."],
      ["🍽️","Servir","Servir tiède avec un yaourt nature."]
    ] },

  { key:"hawawshi", nom:"Hawawshi", nomEn:"Hawawshi (Egyptian Stuffed Bread)", emoji:"🥙", cat:"plats", pays:"egypte", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Pain pita garni d'une viande hachée épicée aux oignons et piment, croustillé au four. Le burger égyptien, juteux et parfumé.",
    descEn:"Pita bread stuffed with spiced minced meat, onions and chilli, crisped in the oven. Egypt's juicy, fragrant burger.",
    ing:[["boeufHache",120,"g"],["oignon",50,"g"],["poivron",40,"g"],["painpita",60,"g"],["persil",10,"g"]],
    etapes:[
      ["🥩","Farce","Mélanger viande hachée, oignon, poivron et persil très finement hachés."],
      ["🌶️","Épicer","Assaisonner de cumin, coriandre, piment, sel et poivre."],
      ["🥙","Garnir","Ouvrir les pains pita et les garnir généreusement de farce."],
      ["🫒","Huiler","Badigeonner l'extérieur des pains d'un peu d'huile."],
      ["🔥","Préchauffer","Préchauffer le four à 220 °C."],
      ["♨️","Cuire","Cuire 20 min en retournant à mi-cuisson."],
      ["🍽️","Servir","Couper en parts et servir avec tahini et citron."]
    ] },

  { key:"besara", nom:"Bessara", nomEn:"Bessara (Fava Bean Purée)", emoji:"🟢", cat:"entrees", pays:"egypte", temps:"40 min", niveau:"⭐ Facile",
    desc:"Velouté-purée de fèves sèches aux herbes, nappé d'huile d'olive et de cumin. Économique, nourrissant, vert vif — un classique populaire.",
    descEn:"A herby dried-fava purée drizzled with olive oil and cumin. Cheap, filling, vivid green — a beloved staple.",
    ing:[["feves",100,"g"],["persil",20,"g"],["ail",5,"g"],["coriandre",5,"g"],["huile",10,"ml"]],
    etapes:[
      ["🫘","Tremper","Tremper les fèves décortiquées une nuit."],
      ["💧","Cuire","Les cuire à l'eau avec l'ail jusqu'à ce qu'elles s'écrasent."],
      ["🌿","Herbes","Ajouter persil et coriandre, cuire encore 5 min."],
      ["🌀","Mixer","Mixer en purée lisse, ajuster en eau de cuisson."],
      ["🧂","Assaisonner","Saler, ajouter cumin et un peu de citron."],
      ["🫒","Servir","Verser en bol, arroser d'huile d'olive et de cumin, avec du pain."]
    ] },

  { key:"rozbellaban", nom:"Roz bel Laban", nomEn:"Roz bel Laban (Egyptian Rice Pudding)", emoji:"🍮", cat:"desserts", pays:"egypte", temps:"45 min", niveau:"⭐ Facile",
    desc:"Riz au lait égyptien tout doux, vanillé et crémeux, souvent gratiné au four. Le dessert maison réconfortant par excellence.",
    descEn:"A soft, creamy Egyptian rice pudding, vanilla-scented and often oven-gratinated. The ultimate homely comfort dessert.",
    ing:[["riz",50,"g"],["lait",150,"ml"],["sucre",30,"g"],["amande",10,"g"]],
    etapes:[
      ["🍚","Précuire","Cuire le riz dans un peu d'eau jusqu'à absorption."],
      ["🥛","Lait","Ajouter le lait et porter à frémissement."],
      ["⏲️","Mijoter","Cuire à feu doux en remuant souvent 25 min."],
      ["🍯","Sucrer","Ajouter le sucre et la vanille, cuire jusqu'à crémeux."],
      ["🥣","Mouler","Répartir dans des ramequins."],
      ["🔥","Gratiner","Passer brièvement sous le gril pour dorer le dessus."],
      ["🌰","Servir","Parsemer d'amandes et servir frais ou tiède."]
    ] },

  // ---------- PALESTINE ----------
  { key:"mujaddara", nom:"Mujaddara", nomEn:"Mujaddara (Lentils & Rice)", emoji:"🫘", cat:"plats", pays:"palestine", temps:"50 min", niveau:"⭐ Facile",
    desc:"Lentilles et riz mijotés, couronnés d'oignons frits fondants et croustillants. Humble, parfumé au cumin, et étonnamment addictif.",
    descEn:"Stewed lentils and rice crowned with meltingly crisp fried onions. Humble, cumin-scented and surprisingly addictive.",
    ing:[["lentilles",60,"g"],["riz",60,"g"],["oignon",80,"g"],["huileOlive",15,"ml"],["cumin",1,"g"]],
    etapes:[
      ["🫘","Lentilles","Cuire les lentilles à mi-tendreté dans l'eau."],
      ["🧅","Oignons","Émincer les oignons et les frire lentement jusqu'à brun foncé."],
      ["🍚","Riz","Ajouter le riz rincé aux lentilles."],
      ["🌶️","Épicer","Assaisonner de cumin, sel et poivre, ajouter un peu d'huile d'oignon."],
      ["💧","Cuire","Couvrir d'eau et cuire à couvert jusqu'à absorption."],
      ["😴","Reposer","Laisser reposer 10 min hors du feu."],
      ["🍽️","Servir","Couronner d'oignons frits, servir avec un yaourt."]
    ] },

  { key:"galayetbandora", nom:"Galayet Bandora", nomEn:"Galayet Bandora (Tomato Stew)", emoji:"🍅", cat:"plats", pays:"palestine", temps:"30 min", niveau:"⭐ Facile",
    desc:"Tomates mijotées à l'ail et au piment dans l'huile d'olive, fondues en une sauce rustique. Simple, ensoleillé, à saucer avec du pain.",
    descEn:"Tomatoes simmered with garlic and chilli in olive oil into a rustic sauce. Simple, sunny, made for scooping with bread.",
    ing:[["tomate",150,"g"],["poivron",50,"g"],["ail",8,"g"],["huileOlive",15,"ml"],["piment",2,"g"]],
    etapes:[
      ["🧄","Ail","Faire revenir l'ail émincé dans l'huile d'olive."],
      ["🌶️","Piment","Ajouter le piment vert et le poivron en lanières."],
      ["🍅","Tomates","Ajouter les tomates concassées."],
      ["⏲️","Mijoter","Mijoter 20 min jusqu'à ce que les tomates fondent."],
      ["🧂","Assaisonner","Saler et poivrer, écraser légèrement à la fourchette."],
      ["🍞","Servir","Servir bien chaud avec du pain plat pour saucer."]
    ] },

  { key:"shishbarak", nom:"Shish Barak", nomEn:"Shish Barak (Dumplings in Yogurt)", emoji:"🥟", cat:"plats", pays:"palestine", temps:"1h15", niveau:"⭐⭐⭐ Difficile",
    desc:"Petits raviolis de viande pochés dans une sauce de yaourt chaude à l'ail et à la menthe. Délicat, acidulé, réconfortant.",
    descEn:"Little meat dumplings poached in a warm garlic-and-mint yogurt sauce. Delicate, tangy, comforting.",
    ing:[["farine",70,"g"],["boeufHache",80,"g"],["yaourt",120,"g"],["ail",5,"g"],["menthe",3,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte souple farine-eau-sel, laisser reposer."],
      ["🥩","Farce","Revenir la viande hachée avec oignon et épices."],
      ["🥟","Façonner","Découper des disques, farcir et fermer en petits chaussons."],
      ["🔥","Précuire","Dorer légèrement les raviolis au four."],
      ["🥛","Sauce","Fouetter le yaourt avec un peu de fécule et chauffer doucement sans bouillir."],
      ["🫕","Pocher","Plonger les raviolis dans le yaourt et pocher 10 min."],
      ["🌿","Finir","Faire revenir ail et menthe séchée, verser sur le plat."],
      ["🍽️","Servir","Servir aussitôt sur un lit de riz."]
    ] },

  { key:"qidreh", nom:"Qidreh", nomEn:"Qidreh (Gazan Spiced Rice)", emoji:"🍚", cat:"plats", pays:"palestine", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Riz de Gaza cuit avec agneau, pois chiches et ail entier, parfumé à la cannelle et au cardamome. Cuit au four en marmite, fondant et odorant.",
    descEn:"Gazan rice cooked with lamb, chickpeas and whole garlic, scented with cinnamon and cardamom. Oven-baked in a pot, tender and fragrant.",
    ing:[["riz",80,"g"],["agneau",120,"g"],["poischiches",30,"g"],["ail",8,"g"],["cannelle",1,"g"]],
    etapes:[
      ["🥩","Bouillon","Cuire l'agneau dans l'eau avec les épices pour un bouillon parfumé."],
      ["🫘","Pois chiches","Ajouter les pois chiches trempés."],
      ["🍚","Riz","Disposer le riz, l'agneau, l'ail entier dans une marmite."],
      ["🌶️","Épices","Parsemer de cannelle, cardamome et un peu de bouillon."],
      ["💧","Mouiller","Verser le bouillon chaud à hauteur du riz."],
      ["🔥","Four","Couvrir et enfourner à 180 °C 40 min."],
      ["😴","Reposer","Laisser reposer 10 min avant d'ouvrir."],
      ["🍽️","Servir","Renverser la marmite sur un plat et servir."]
    ] },

  // ---------- ISRAËL ----------
  { key:"saladeisraelienne", nom:"Salade Israélienne", nomEn:"Israeli Salad", emoji:"🥗", cat:"salades", pays:"israel", temps:"15 min", niveau:"⭐ Facile",
    desc:"Tomates et concombres taillés en tout petits dés, citron, huile d'olive et herbes. Fraîche, croquante, servie à tous les repas.",
    descEn:"Tomatoes and cucumbers cut into tiny dice with lemon, olive oil and herbs. Fresh, crunchy, served at every meal.",
    ing:[["tomate",100,"g"],["concombre",100,"g"],["oignon",30,"g"],["persil",10,"g"],["citron",10,"ml"],["huileOlive",10,"ml"]],
    etapes:[
      ["🔪","Tailler","Couper tomates et concombres en très petits dés réguliers."],
      ["🧅","Oignon","Ciseler finement l'oignon."],
      ["🌿","Herbes","Hacher persil et menthe fraîche."],
      ["🥣","Mélanger","Réunir le tout dans un saladier."],
      ["🫗","Assaisonner","Arroser de jus de citron, d'huile d'olive, saler et poivrer."],
      ["🍽️","Servir","Mélanger et servir aussitôt, bien frais."]
    ] },

  { key:"malawach", nom:"Malawach", nomEn:"Malawach", emoji:"🫓", cat:"brunch", pays:"israel", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Galette feuilletée yéménite-israélienne, dorée et croustillante au beurre, servie avec tomate râpée et œuf dur. Le brunch du week-end.",
    descEn:"A Yemenite-Israeli flaky pan-bread, golden and crisp with butter, served with grated tomato and hard-boiled egg. The weekend brunch.",
    ing:[["farine",90,"g"],["beurre",30,"g"],["oeuf",25,"g"],["tomate",60,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte souple farine-eau-sel, laisser reposer 20 min."],
      ["🧈","Beurrer","Étaler très finement, badigeonner de beurre mou."],
      ["🌀","Rouler","Rouler en escargot puis aplatir en galette."],
      ["❄️","Reposer","Réserver au frais 20 min pour le feuilletage."],
      ["🔥","Cuire","Cuire à la poêle à sec ou beurrée jusqu'à doré croustillant."],
      ["🍅","Garniture","Râper une tomate fraîche assaisonnée."],
      ["🥚","Servir","Servir avec tomate râpée, œuf dur et zhoug (sauce piquante)."]
    ] },

  { key:"jachnun", nom:"Jachnun", nomEn:"Jachnun", emoji:"🥐", cat:"brunch", pays:"israel", temps:"3h", niveau:"⭐⭐⭐ Difficile",
    desc:"Rouleaux de pâte beurrée cuits toute la nuit à feu très doux, fondants et dorés. Tradition du shabbat yéménite-israélien, servie au petit matin.",
    descEn:"Buttered dough rolls slow-baked overnight on very low heat, soft and golden. A Yemenite-Israeli Shabbat tradition served at dawn.",
    ing:[["farine",90,"g"],["beurre",30,"g"],["sucre",5,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte lisse farine, eau, un peu de sucre et sel."],
      ["⏲️","Reposer","Diviser en boules huilées, reposer 30 min."],
      ["🧈","Étaler","Étaler chaque boule très finement, tartiner de beurre."],
      ["🌯","Rouler","Rouler serré en boudins."],
      ["🥖","Ranger","Ranger les rouleaux serrés dans un plat beurré couvert."],
      ["🔥","Cuire","Cuire à four très doux (90-100 °C) toute la nuit (8-10 h)."],
      ["🍽️","Servir","Servir chaud avec œuf, tomate râpée et zhoug."]
    ] },

  { key:"ptitim", nom:"Ptitim", nomEn:"Ptitim (Israeli Couscous)", emoji:"🍚", cat:"plats", pays:"israel", temps:"25 min", niveau:"⭐ Facile",
    desc:"Petites perles de pâte grillées, sautées avec oignon et tomate puis cuites comme un pilaf. Le « riz » réconfortant des enfants israéliens.",
    descEn:"Toasted pasta pearls sautéed with onion and tomato then cooked pilaf-style. The comforting \"rice\" of Israeli children.",
    ing:[["vermicelles",80,"g"],["oignon",40,"g"],["tomate",50,"g"],["poivron",30,"g"],["huile",10,"ml"]],
    etapes:[
      ["🧅","Suer","Faire revenir l'oignon dans l'huile."],
      ["🟡","Toaster","Ajouter les perles de pâte et les faire dorer en remuant."],
      ["🍅","Aromates","Incorporer tomate et poivron en petits dés."],
      ["💧","Cuire","Mouiller d'un bouillon (1,5 fois le volume), couvrir."],
      ["⏲️","Absorber","Cuire à feu doux jusqu'à absorption (12 min)."],
      ["😴","Reposer","Laisser reposer 5 min à couvert."],
      ["🍽️","Servir","Aérer à la fourchette et servir."]
    ] },

  { key:"meorav", nom:"Me'orav Yerushalmi", nomEn:"Me'orav Yerushalmi (Jerusalem Mixed Grill)", emoji:"🍖", cat:"plats", pays:"israel", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Le « mélange de Jérusalem » : poulet et abats sautés à feu vif avec oignon et un mélange d'épices, servi en pita. Intense et parfumé.",
    descEn:"The \"Jerusalem mix\": chicken and offal seared over high heat with onion and a spice blend, served in pita. Intense and fragrant.",
    ing:[["poulet",150,"g"],["oignon",60,"g"],["poivron",40,"g"],["ail",5,"g"],["cumin",1,"g"]],
    etapes:[
      ["🔪","Préparer","Couper le poulet (et abats) en lanières fines."],
      ["🔥","Saisir","Saisir la viande à feu très vif dans une poêle brûlante."],
      ["🧅","Oignon","Ajouter oignon et poivron émincés, faire colorer."],
      ["🌶️","Épices","Assaisonner de cumin, coriandre, curcuma, paprika et ail."],
      ["♨️","Sauter","Sauter vivement jusqu'à caramélisation des bords."],
      ["🥙","Garnir","Réchauffer des pains pita."],
      ["🍽️","Servir","Servir la viande en pita avec tahini et cornichons."]
    ] },
];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function rows(ing) {
  const out = [];
  for (let nb = 1; nb <= 15; nb++) {
    const parts = ing.map(([k, per, u]) => `${k}: "${Math.round(per * nb)} ${u}"`);
    out.push(`      { nb: ${nb}, ${parts.join(", ")} }`);
  }
  return out.join(",\n");
}
function recetteFR(d) {
  const tName = "tableau" + cap(d.key);
  const etapes = d.etapes.map(([i, t, det]) => `      { icone: "${i}", titre: "${t}", detail: "${det}", badge: null }`).join(",\n");
  return `  ${d.key}: {
    nom: "${d.nom}",
    cat: "${d.cat}", pays: "${d.pays}",
    base: ${base},
    temps: "${d.temps}",
    niveau: "${d.niveau}",
    emoji: "${d.emoji}",
    dateAjout: "${DATE}",
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
function recetteEN(d) { return `  ${d.key}: { nom: ${JSON.stringify(d.nomEn)}, description: ${JSON.stringify(d.descEn)} }`; }
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
  if (!head.endsWith(",")) head += ",";
  src = head + "\n" + bloc + "\n" + src.slice(idx);
  fs.writeFileSync(file, src);
}
const keys = DEFS.map(d => d.key);
majFichier("js/recettes_plats.js", "});", DEFS.map(recetteFR).join(",\n"), keys);
majFichier("js/recettes_en.js", "};", DEFS.map(recetteEN).join(",\n"), keys);
console.log("✅ " + DEFS.length + " recettes Moyen-Orient insérées (FR 6-8 étapes + EN nom/description).");
