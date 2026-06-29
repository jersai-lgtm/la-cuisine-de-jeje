// Vague B « Afrique & Amériques » (Nigeria, Afrique du Sud, Sénégal, Cuba, Pérou, Brésil, Géorgie) : 25 recettes.
// 6 à 8 étapes. Idempotent. FR + EN nom/description. node tools/_gen_afriqueameriques.mjs
import fs from "fs";
const DATE = "2026-06-29T13:00:00";
const base = 4;

const DEFS = [
  // ---------- NIGERIA ----------
  { key:"efororiro", nom:"Efo Riro", nomEn:"Efo Riro (Nigerian Spinach Stew)", emoji:"🥬", cat:"plats", pays:"nigeria", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Ragoût d'épinards yoruba à l'huile de palme, garni de viande et de crevettes, relevé au piment. Riche, vert profond et profondément savoureux.",
    descEn:"A Yoruba spinach stew in palm oil, studded with meat and shrimp, spiced with chilli. Rich, deep green and deeply savoury.",
    ing:[["epinard",120,"g"],["huilePalme",15,"ml"],["boeuf",80,"g"],["crevettes",30,"g"],["oignon",40,"g"]],
    etapes:[
      ["🥩","Viande","Cuire le bœuf en bouillon, réserver le jus."],
      ["🌶️","Base","Mixer poivron, piment et oignon, faire revenir à l'huile de palme."],
      ["🦐","Protéines","Ajouter viande, crevettes et poisson fumé."],
      ["💧","Mijoter","Mouiller d'un peu de bouillon, laisser réduire."],
      ["🥬","Épinards","Incorporer les épinards (ou efo) ciselés."],
      ["⏲️","Lier","Cuire 10 min sans trop d'eau (le stew reste épais)."],
      ["🍽️","Servir","Servir avec du riz, de l'igname ou du fufu."]
    ] },

  { key:"moimoi", nom:"Moi Moi", nomEn:"Moi Moi (Steamed Bean Pudding)", emoji:"🫘", cat:"plats", pays:"nigeria", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Flan de haricots niébé moulus à l'huile de palme et au poivron, cuit vapeur. Moelleux et protéiné, souvent garni d'œuf ou de poisson.",
    descEn:"A steamed pudding of ground black-eyed peas with palm oil and pepper. Soft and protein-rich, often studded with egg or fish.",
    ing:[["haricots",100,"g"],["oignon",40,"g"],["huilePalme",10,"ml"],["oeuf",25,"g"],["piment",3,"g"]],
    etapes:[
      ["🫘","Peler","Tremper les niébés et les peler en les frottant."],
      ["🌀","Mixer","Mixer avec oignon, poivron et piment en pâte lisse."],
      ["🌴","Huile","Incorporer l'huile de palme et un peu de bouillon."],
      ["🥚","Garnir","Ajouter des morceaux d'œuf dur ou de poisson."],
      ["📦","Mouler","Répartir dans des ramequins (ou feuilles)."],
      ["💨","Vapeur","Cuire à la vapeur 45 min jusqu'à ce que le flan prenne."],
      ["🍽️","Servir","Démouler et servir chaud avec du pap ou du riz."]
    ] },

  { key:"ofadarice", nom:"Ofada Rice & Ayamase", nomEn:"Ofada Rice & Ayamase", emoji:"🍚", cat:"plats", pays:"nigeria", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Riz local nigérian servi avec l'ayamase, une sauce verte de piments à l'huile de palme et à la viande. Fumé, piquant, iconique.",
    descEn:"Local Nigerian rice served with ayamase, a green pepper sauce in palm oil with meat. Smoky, fiery, iconic.",
    ing:[["riz",90,"g"],["poivron",60,"g"],["huilePalme",15,"ml"],["boeuf",80,"g"],["oignon",40,"g"]],
    etapes:[
      ["🍚","Riz","Cuire le riz ofada (ou complet) à l'eau."],
      ["🌶️","Sauce","Mixer poivrons verts, piments et oignon."],
      ["🌴","Bleach","Chauffer fortement l'huile de palme jusqu'à blanchir (ayamase)."],
      ["🔥","Frire","Faire revenir la purée de poivrons dans l'huile."],
      ["🥩","Viande","Ajouter bœuf cuit et morceaux assortis."],
      ["⏲️","Mijoter","Mijoter jusqu'à une sauce épaisse et brillante."],
      ["🍽️","Servir","Servir le riz nappé de sauce, en feuille de bananier."]
    ] },

  { key:"asun", nom:"Asun", nomEn:"Asun (Spicy Grilled Goat)", emoji:"🍢", cat:"aperitifs", pays:"nigeria", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Viande grillée puis sautée avec oignons et piments, fumée et brûlante. L'apéro festif nigérian, à grignoter avec une bière fraîche.",
    descEn:"Meat grilled then sautéed with onions and chillies, smoky and fiery. The Nigerian party snack, nibbled with a cold beer.",
    ing:[["agneau",150,"g"],["piment",5,"g"],["oignon",40,"g"],["poivron",40,"g"],["huile",10,"ml"]],
    etapes:[
      ["🔪","Préparer","Couper la viande de chèvre (ou agneau) en cubes."],
      ["🔥","Griller","Griller les cubes jusqu'à coloration et fumée."],
      ["🌶️","Sauce","Émincer oignon, poivron et beaucoup de piment."],
      ["🍳","Sauter","Faire sauter les aromates dans un peu d'huile."],
      ["🥩","Réunir","Ajouter la viande grillée et bien enrober."],
      ["⏲️","Glacer","Sauter vif 5 min pour caraméliser les bords."],
      ["🍽️","Servir","Servir brûlant, à la fourchette ou en cure-dent."]
    ] },

  // ---------- AFRIQUE DU SUD ----------
  { key:"boerewors", nom:"Boerewors", nomEn:"Boerewors", emoji:"🌭", cat:"plats", pays:"afriquedusud", temps:"40 min", niveau:"⭐ Facile",
    desc:"Saucisse sud-africaine en spirale, parfumée à la coriandre et au clou de girofle, grillée au braai. L'âme du barbecue afrikaner.",
    descEn:"A South-African coiled sausage, scented with coriander and clove, grilled on the braai. The soul of the Afrikaner barbecue.",
    ing:[["boeufHache",150,"g"],["porc",50,"g"],["coriandre",4,"g"],["vinaigre",5,"ml"],["oignon",30,"g"]],
    etapes:[
      ["🌿","Épices","Torréfier et moudre coriandre, clou de girofle et poivre."],
      ["🥩","Mêler","Mélanger bœuf et porc hachés grossièrement."],
      ["🧂","Assaisonner","Ajouter épices, vinaigre, oignon et sel."],
      ["🌀","Embosser","Embosser dans un boyau et former une spirale."],
      ["🔥","Braai","Griller au barbecue à feu moyen sans percer."],
      ["🔄","Retourner","Retourner une fois, garder le jus à l'intérieur."],
      ["🍽️","Servir","Servir en pap & sous ou en hot-dog (boerie roll)."]
    ] },

  { key:"potjie", nom:"Potjiekos", nomEn:"Potjiekos", emoji:"🍲", cat:"plats", pays:"afriquedusud", temps:"2h30", niveau:"⭐⭐ Moyen",
    desc:"Ragoût mijoté en marmite en fonte sur les braises, en couches qu'on ne remue pas. Viande et légumes ultra-fondants, tradition conviviale d'Afrique du Sud.",
    descEn:"A stew slow-cooked in a cast-iron pot over coals, layered and never stirred. Meltingly tender meat and vegetables, a convivial South-African tradition.",
    ing:[["boeuf",140,"g"],["pommedeterre",100,"g"],["carotte",60,"g"],["oignon",50,"g"],["poivron",40,"g"]],
    etapes:[
      ["🥩","Saisir","Colorer la viande au fond de la marmite (potjie)."],
      ["🧅","Base","Ajouter l'oignon et un peu de bouillon."],
      ["🥕","Couches","Disposer les légumes en couches, sans mélanger."],
      ["🍷","Mouiller","Ajouter vin et épices, couvrir."],
      ["🔥","Mijoter","Cuire à feu très doux sur les braises 2 h."],
      ["🚫","Patienter","Ne pas remuer : laisser les saveurs se superposer."],
      ["🥄","Lier","En fin de cuisson, lier le jus et mélanger délicatement."],
      ["🍽️","Servir","Servir avec du riz ou du pap."]
    ] },

  { key:"biltong", nom:"Biltong", nomEn:"Biltong", emoji:"🥩", cat:"aperitifs", pays:"afriquedusud", temps:"30 min", niveau:"⭐⭐ Moyen",
    desc:"Lanières de bœuf marinées au vinaigre et à la coriandre, séchées à l'air plusieurs jours. La viande séchée sud-africaine, plus tendre que le jerky.",
    descEn:"Strips of beef marinated in vinegar and coriander, air-dried for several days. The South-African dried meat, more tender than jerky.",
    ing:[["boeuf",150,"g"],["vinaigre",10,"ml"],["coriandre",5,"g"],["oignon",10,"g"]],
    etapes:[
      ["🔪","Tailler","Couper le bœuf en lanières épaisses dans le sens de la fibre."],
      ["🌿","Épices","Torréfier et concasser coriandre et poivre."],
      ["🍶","Mariner","Arroser de vinaigre, frotter de sel et d'épices."],
      ["⏳","Reposer","Laisser mariner quelques heures au frais."],
      ["💨","Sécher","Suspendre dans un séchoir ventilé (ou boîte à biltong)."],
      ["📅","Patienter","Sécher 3 à 5 jours selon la texture voulue."],
      ["🍽️","Servir","Trancher finement et servir à l'apéro."]
    ] },

  // ---------- SÉNÉGAL ----------
  { key:"pastels", nom:"Pastels", nomEn:"Pastels (Senegalese Fish Fritters)", emoji:"🔺", cat:"aperitifs", pays:"senegal", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Petits chaussons frits farcis de poisson épicé, croustillants et dorés. L'incontournable de l'apéro sénégalais, servi avec une sauce tomate piquante.",
    descEn:"Crisp little fried turnovers filled with spiced fish. The essential Senegalese aperitif, served with a spicy tomato sauce.",
    ing:[["farine",50,"g"],["poisson",80,"g"],["oignon",30,"g"],["persil",5,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🐟","Farce","Faire revenir le poisson émietté avec oignon, persil et épices."],
      ["🥣","Pâte","Pétrir une pâte souple (farine, eau, huile, sel)."],
      ["⚪","Étaler","Étaler et découper des disques."],
      ["🥄","Garnir","Déposer la farce et replier en demi-lune."],
      ["🍴","Souder","Souder les bords à la fourchette."],
      ["🔥","Frire","Frire à 180 °C jusqu'à doré croustillant."],
      ["🍽️","Servir","Servir chaud avec une sauce kani (tomate-piment)."]
    ] },

  { key:"soupakandja", nom:"Soupou Kandia", nomEn:"Soupou Kandia (Okra Stew)", emoji:"🍲", cat:"plats", pays:"senegal", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût sénégalais de gombo à l'huile de palme, poisson et fruits de mer, sur du riz blanc. Onctueux, filant et puissamment iodé.",
    descEn:"A Senegalese okra stew in palm oil with fish and seafood, over white rice. Silky, slippery and powerfully briny.",
    ing:[["gombo",80,"g"],["poisson",100,"g"],["huilePalme",15,"ml"],["crevettes",40,"g"],["oignon",40,"g"]],
    etapes:[
      ["🌿","Gombo","Râper ou couper finement le gombo."],
      ["🐟","Poisson","Cuire poisson et fruits de mer dans un bouillon."],
      ["🌴","Huile","Ajouter l'huile de palme et l'oignon."],
      ["🥬","Lier","Incorporer le gombo qui va lier la sauce."],
      ["♨️","Mijoter","Cuire jusqu'à la texture filante caractéristique."],
      ["🌶️","Relever","Ajuster piment, sel et poisson fumé."],
      ["🍚","Servir","Servir sur un lit de riz blanc."]
    ] },

  { key:"fataya", nom:"Fataya", nomEn:"Fataya (Senegalese Meat Pastry)", emoji:"🥟", cat:"aperitifs", pays:"senegal", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Beignets sénégalais farcis de viande hachée épicée ou de poisson, frits dorés. Cousins des pastels, dévorés en street-food à Dakar.",
    descEn:"Senegalese fried pastries filled with spiced minced meat or fish, fried golden. Cousins of pastels, devoured as street food in Dakar.",
    ing:[["farine",50,"g"],["boeufHache",70,"g"],["oignon",30,"g"],["piment",3,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🥩","Farce","Faire revenir la viande hachée avec oignon et épices."],
      ["🌶️","Relever","Ajouter piment, persil et un trait de citron."],
      ["🥣","Pâte","Préparer une pâte souple et l'étaler."],
      ["⚪","Découper","Découper des disques de pâte."],
      ["🥟","Garnir","Garnir, replier en demi-lune et souder."],
      ["🔥","Frire","Frire jusqu'à doré croustillant."],
      ["🍽️","Servir","Servir chaud avec de l'oignon mariné."]
    ] },

  // ---------- CUBA ----------
  { key:"arrozconpollo", nom:"Arroz con Pollo", nomEn:"Arroz con Pollo", emoji:"🍗", cat:"plats", pays:"cuba", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Riz jaune cubain au poulet, poivrons et petits pois, parfumé au cumin et à la bière. Un plat unique convivial, doré et réconfortant.",
    descEn:"Cuban yellow rice with chicken, peppers and peas, scented with cumin and beer. A convivial one-pot, golden and comforting.",
    ing:[["riz",90,"g"],["poulet",130,"g"],["poivron",50,"g"],["tomate",50,"g"],["oignon",40,"g"]],
    etapes:[
      ["🍗","Dorer","Colorer le poulet assaisonné, réserver."],
      ["🧅","Sofrito","Faire revenir oignon, ail et poivron (sofrito)."],
      ["🍅","Tomate","Ajouter tomate, cumin et un peu de bière."],
      ["🍚","Riz","Nacrer le riz dans le sofrito."],
      ["💧","Mouiller","Mouiller du bouillon safrané (ou colorant), remettre le poulet."],
      ["⏲️","Cuire","Cuire à couvert jusqu'à absorption."],
      ["🟢","Finir","Ajouter petits pois et poivrons, laisser reposer."],
      ["🍽️","Servir","Servir avec des quartiers de citron vert."]
    ] },

  { key:"tostones", nom:"Tostones", nomEn:"Tostones", emoji:"🍌", cat:"aperitifs", pays:"cuba", temps:"25 min", niveau:"⭐ Facile",
    desc:"Rondelles de banane plantain verte frites, écrasées puis refrites, croustillantes et salées. L'accompagnement-snack des Caraïbes.",
    descEn:"Slices of green plantain fried, smashed then re-fried, crisp and salty. The snack-side of the Caribbean.",
    ing:[["plantain",150,"g"],["huilefriture",25,"ml"],["ail",5,"g"],["citron",5,"ml"]],
    etapes:[
      ["🍌","Couper","Éplucher le plantain vert et couper en tronçons épais."],
      ["🔥","Pré-frire","Frire une 1re fois à feu moyen jusqu'à tendre."],
      ["🥄","Écraser","Écraser chaque tronçon entre deux feuilles."],
      ["🧄","Tremper","Tremper dans une eau à l'ail (option)."],
      ["🍳","Re-frire","Re-frire à feu vif jusqu'à croustillant doré."],
      ["🧂","Saler","Égoutter et saler aussitôt."],
      ["🍽️","Servir","Servir avec une sauce mojo à l'ail."]
    ] },

  { key:"flancubain", nom:"Flan Cubain", nomEn:"Cuban Flan", emoji:"🍮", cat:"desserts", pays:"cuba", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Flan cubain au lait concentré, très onctueux, sur un caramel ambré. Le dessert de famille des Caraïbes, soyeux et nostalgique.",
    descEn:"A Cuban condensed-milk flan, ultra-silky, over amber caramel. The Caribbean family dessert, smooth and nostalgic.",
    ing:[["oeuf",80,"g"],["laitconcentre",80,"g"],["lait",50,"ml"],["sucre",40,"g"]],
    etapes:[
      ["🍯","Caramel","Faire un caramel ambré et en napper le moule."],
      ["🥚","Appareil","Mélanger œufs, lait concentré, lait et vanille."],
      ["🥣","Filtrer","Passer au tamis pour une texture parfaite."],
      ["🫧","Verser","Verser sur le caramel sans faire de bulles."],
      ["♨️","Bain-marie","Cuire au four à 160 °C au bain-marie 50 min."],
      ["❄️","Réfrigérer","Laisser refroidir puis réfrigérer 4 h."],
      ["🍽️","Démouler","Démouler sur une assiette pour libérer le caramel."]
    ] },

  { key:"yucamojo", nom:"Yuca con Mojo", nomEn:"Yuca con Mojo", emoji:"🥔", cat:"plats", pays:"cuba", temps:"40 min", niveau:"⭐ Facile",
    desc:"Manioc bouilli fondant arrosé d'un mojo à l'ail, à l'oignon et au citron vert. L'accompagnement acidulé et parfumé des tables cubaines.",
    descEn:"Tender boiled cassava drizzled with a garlic, onion and lime mojo. The tangy, fragrant side of Cuban tables.",
    ing:[["manioc",180,"g"],["ail",8,"g"],["citron",15,"ml"],["oignon",30,"g"],["huile",15,"ml"]],
    etapes:[
      ["🔪","Préparer","Éplucher le manioc et le couper en tronçons."],
      ["💧","Cuire","Cuire à l'eau salée jusqu'à tendreté, ôter le fil central."],
      ["🧄","Mojo","Faire chauffer l'huile avec ail et oignon émincés."],
      ["🍋","Aciduler","Hors du feu, ajouter le jus de citron vert et le cumin."],
      ["🥣","Arroser","Verser le mojo chaud sur le manioc."],
      ["🌿","Servir","Parsemer de coriandre et servir tiède."]
    ] },

  // ---------- PÉROU ----------
  { key:"papahuancaina", nom:"Papa a la Huancaína", nomEn:"Papa a la Huancaína", emoji:"🥔", cat:"entrees", pays:"perou", temps:"30 min", niveau:"⭐ Facile",
    desc:"Pommes de terre nappées d'une sauce crémeuse au fromage frais et au piment jaune (ají amarillo). L'entrée péruvienne jaune soleil.",
    descEn:"Potatoes napped with a creamy sauce of fresh cheese and yellow chilli (ají amarillo). Peru's sunshine-yellow starter.",
    ing:[["pommedeterre",150,"g"],["fromage",50,"g"],["lait",40,"ml"],["piment",4,"g"],["oeuf",50,"g"]],
    etapes:[
      ["🥔","Cuire","Cuire les pommes de terre, les peler et trancher."],
      ["🌶️","Piment","Faire revenir l'ají amarillo (ou piment jaune) avec un peu d'oignon."],
      ["🧀","Sauce","Mixer fromage frais, lait, biscuits salés et piment en sauce lisse."],
      ["🥣","Lisser","Ajuster en lait jusqu'à une crème nappante."],
      ["🍽️","Dresser","Disposer les rondelles de pomme de terre sur de la salade."],
      ["🫗","Napper","Napper généreusement de sauce huancaína."],
      ["🥚","Servir","Garnir d'œuf dur et d'olives noires."]
    ] },

  { key:"rocotorelleno", nom:"Rocoto Relleno", nomEn:"Rocoto Relleno", emoji:"🌶️", cat:"plats", pays:"perou", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Gros piments rouges farcis de viande épicée, raisins et fromage, gratinés. La spécialité brûlante et gourmande d'Arequipa.",
    descEn:"Large red chillies stuffed with spiced meat, raisins and cheese, then gratinated. The fiery, indulgent specialty of Arequipa.",
    ing:[["poivron",120,"g"],["boeufHache",90,"g"],["oignon",40,"g"],["fromage",30,"g"],["oeuf",25,"g"]],
    etapes:[
      ["🌶️","Préparer","Évider les rocotos (ou gros piments), les blanchir pour adoucir."],
      ["🧅","Farce","Faire revenir oignon, ail et viande hachée."],
      ["🍇","Garnir","Ajouter raisins secs, olives, cumin et œuf dur."],
      ["🥄","Remplir","Garnir les piments de farce."],
      ["🧀","Couvrir","Couronner d'une tranche de fromage."],
      ["🔥","Gratiner","Enfourner jusqu'à ce que le fromage dore."],
      ["🍽️","Servir","Servir avec un gratin de pomme de terre (pastel de papa)."]
    ] },

  { key:"pollobrasa", nom:"Pollo a la Brasa", nomEn:"Pollo a la Brasa", emoji:"🍗", cat:"plats", pays:"perou", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Poulet péruvien mariné à la sauce soja, vinaigre et épices, rôti jusqu'à une peau laquée. Servi avec frites et sauce verte (ají).",
    descEn:"Peruvian chicken marinated in soy, vinegar and spices, roasted to a lacquered skin. Served with fries and green ají sauce.",
    ing:[["poulet",160,"g"],["saucesoja",10,"ml"],["vinaigre",5,"ml"],["ail",6,"g"],["cumin",2,"g"]],
    etapes:[
      ["🧄","Marinade","Mixer ail, cumin, paprika, sauce soja et vinaigre."],
      ["💆","Mariner","Enrober le poulet et mariner plusieurs heures."],
      ["🔥","Préchauffer","Préchauffer le four à 200 °C."],
      ["🍗","Rôtir","Rôtir le poulet en l'arrosant de marinade."],
      ["✨","Laquer","Monter la température en fin pour laquer la peau."],
      ["🥗","Ají","Préparer une sauce verte au piment et à la coriandre."],
      ["🍟","Servir","Servir avec des frites et la sauce ají."]
    ] },

  { key:"secocordero", nom:"Seco de Cordero", nomEn:"Seco de Cordero (Lamb Cilantro Stew)", emoji:"🥘", cat:"plats", pays:"perou", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Ragoût d'agneau mijoté dans une sauce vert vif à la coriandre et à la bière. Tendre et parfumé, servi avec riz et haricots.",
    descEn:"A lamb stew simmered in a vivid green coriander-and-beer sauce. Tender and fragrant, served with rice and beans.",
    ing:[["agneau",150,"g"],["coriandre",8,"g"],["oignon",50,"g"],["petitspois",40,"g"],["citron",10,"ml"]],
    etapes:[
      ["🥩","Saisir","Colorer l'agneau en morceaux, réserver."],
      ["🌿","Sauce verte","Mixer une grosse botte de coriandre avec un peu d'eau."],
      ["🧅","Sofrito","Faire revenir oignon, ail et ají."],
      ["🥩","Mijoter","Remettre la viande, ajouter la sauce verte et la bière."],
      ["⏲️","Cuire","Mijoter à couvert 1 h jusqu'à fondant."],
      ["🟢","Finir","Ajouter petits pois et carotte, citronner."],
      ["🍚","Servir","Servir avec riz blanc et haricots."]
    ] },

  // ---------- BRÉSIL ----------
  { key:"acaraje", nom:"Acarajé", nomEn:"Acarajé", emoji:"🍤", cat:"aperitifs", pays:"bresil", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Beignets bahianais de niébé frits à l'huile de palme, fendus et garnis de crevettes et de vatapá. Le street-food afro-brésilien de Salvador.",
    descEn:"Bahian black-eyed-pea fritters fried in palm oil, split and filled with shrimp and vatapá. The Afro-Brazilian street food of Salvador.",
    ing:[["haricots",100,"g"],["crevettes",40,"g"],["huilePalme",20,"ml"],["oignon",30,"g"],["piment",3,"g"]],
    etapes:[
      ["🫘","Peler","Tremper et peler les niébés."],
      ["🌀","Mixer","Mixer avec oignon en pâte aérée, battre pour incorporer de l'air."],
      ["🌴","Frire","Frire des quenelles dans l'huile de palme (dendê) bien chaude."],
      ["🧻","Égoutter","Égoutter les beignets dorés."],
      ["🦐","Garniture","Préparer crevettes séchées, vatapá et caruru."],
      ["✂️","Fendre","Fendre chaque acarajé en deux."],
      ["🍽️","Servir","Garnir de vatapá, crevettes et sauce piment, servir aussitôt."]
    ] },

  { key:"farofa", nom:"Farofa", nomEn:"Farofa", emoji:"🌾", cat:"plats", pays:"bresil", temps:"20 min", niveau:"⭐ Facile",
    desc:"Farine de manioc torréfiée au beurre avec oignon et lardons, croustillante et dorée. L'accompagnement brésilien obligatoire de la feijoada.",
    descEn:"Cassava flour toasted in butter with onion and bacon, crunchy and golden. The obligatory Brazilian side for feijoada.",
    ing:[["manioc",100,"g"],["beurre",20,"g"],["oignon",40,"g"],["lardons",30,"g"],["oeuf",25,"g"]],
    etapes:[
      ["🥓","Lardons","Faire rissoler les lardons, réserver."],
      ["🧅","Oignon","Faire blondir l'oignon dans le beurre."],
      ["🥚","Œuf","Brouiller un œuf dans la poêle (option)."],
      ["🌾","Manioc","Verser la farine de manioc (farinha) en pluie."],
      ["🔥","Torréfier","Remuer à feu moyen jusqu'à doré et croustillant."],
      ["🧂","Assaisonner","Saler, ajouter les lardons et du persil."],
      ["🍽️","Servir","Servir en accompagnement de la feijoada ou d'un grill."]
    ] },

  { key:"picanha", nom:"Picanha", nomEn:"Picanha", emoji:"🥩", cat:"plats", pays:"bresil", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Le morceau roi du churrasco brésilien : aiguillette de rumsteck grillée avec sa couche de gras, simplement au gros sel. Juteuse et fondante.",
    descEn:"The king cut of Brazilian churrasco: rump cap grilled with its fat cap, simply with coarse salt. Juicy and tender.",
    ing:[["boeuf",200,"g"],["ail",6,"g"],["huile",5,"ml"]],
    etapes:[
      ["🔪","Préparer","Garder la couche de gras, inciser légèrement la pièce."],
      ["🧂","Saler","Frotter généreusement de gros sel."],
      ["🔥","Braise","Préparer une braise vive."],
      ["🥩","Saisir","Saisir côté gras d'abord pour le faire fondre."],
      ["🌡️","Cuire","Griller en gardant un cœur rosé (≈ 54 °C)."],
      ["😴","Reposer","Laisser reposer la viande 5 min."],
      ["🔪","Trancher","Trancher contre le grain et servir avec farofa et vinaigrette."]
    ] },

  { key:"vatapa", nom:"Vatapá", nomEn:"Vatapá", emoji:"🦐", cat:"plats", pays:"bresil", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Crème bahianaise de pain, lait de coco, cacahuète et huile de palme aux crevettes. Onctueuse, dorée et parfumée, l'âme de Bahia.",
    descEn:"A Bahian cream of bread, coconut milk, peanut and palm oil with shrimp. Silky, golden and fragrant — the soul of Bahia.",
    ing:[["crevettes",80,"g"],["pain",50,"g"],["laitcoco",60,"ml"],["arachide",20,"g"],["oignon",40,"g"]],
    etapes:[
      ["🍞","Tremper","Faire tremper le pain rassis dans le lait de coco."],
      ["🥜","Mixer","Mixer cacahuètes (et noix de cajou) en poudre."],
      ["🧅","Base","Faire revenir oignon, ail, gingembre et tomate."],
      ["🦐","Crevettes","Ajouter les crevettes séchées mixées."],
      ["🥣","Lier","Incorporer le pain mixé, la poudre de cacahuète et le lait de coco."],
      ["🌴","Cuire","Cuire en remuant avec l'huile de palme jusqu'à crème épaisse."],
      ["🍤","Finir","Ajouter les crevettes fraîches en fin de cuisson."],
      ["🍚","Servir","Servir avec du riz et de l'acarajé."]
    ] },

  // ---------- GÉORGIE ----------
  { key:"chakhokhbili", nom:"Chakhokhbili", nomEn:"Chakhokhbili", emoji:"🍗", cat:"plats", pays:"georgie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût géorgien de poulet aux tomates et à une avalanche d'herbes fraîches, sans matière grasse ajoutée. Vif, parfumé, ultra-frais.",
    descEn:"A Georgian chicken stew with tomatoes and an avalanche of fresh herbs, with no added fat. Bright, fragrant, ultra-fresh.",
    ing:[["poulet",150,"g"],["tomate",80,"g"],["oignon",50,"g"],["ail",6,"g"],["coriandre",5,"g"]],
    etapes:[
      ["🍗","Revenir","Faire revenir le poulet à sec jusqu'à libérer son jus."],
      ["🧅","Oignon","Ajouter beaucoup d'oignon, laisser fondre."],
      ["🍅","Tomate","Incorporer les tomates concassées."],
      ["⏲️","Mijoter","Mijoter 30 min jusqu'à une sauce épaisse."],
      ["🌿","Herbes","Ajouter ail, coriandre, basilic et estragon en fin de cuisson."],
      ["🌶️","Relever","Assaisonner d'épices géorgiennes (khmeli suneli)."],
      ["🍽️","Servir","Servir avec du pain géorgien pour saucer."]
    ] },

  { key:"ojakhuri", nom:"Ojakhuri", nomEn:"Ojakhuri", emoji:"🥔", cat:"plats", pays:"georgie", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Poêlée géorgienne « familiale » de porc et pommes de terre rissolés à l'ail et aux herbes. Rustique, dorée et conviviale.",
    descEn:"A Georgian \"family\" pan-fry of pork and potatoes browned with garlic and herbs. Rustic, golden and convivial.",
    ing:[["porc",140,"g"],["pommedeterre",150,"g"],["oignon",50,"g"],["ail",5,"g"],["coriandre",4,"g"]],
    etapes:[
      ["🥩","Mariner","Faire mariner le porc avec ail et épices."],
      ["🥔","Pommes de terre","Faire rissoler les pommes de terre, réserver."],
      ["🍳","Viande","Saisir le porc jusqu'à doré."],
      ["🧅","Oignon","Ajouter l'oignon et le faire colorer."],
      ["🔗","Réunir","Remettre les pommes de terre, sauter ensemble."],
      ["🌿","Finir","Parsemer de coriandre et d'ail frais."],
      ["🍽️","Servir","Servir avec des cornichons et du pain."]
    ] },

  { key:"mtsvadi", nom:"Mtsvadi", nomEn:"Mtsvadi (Georgian Skewers)", emoji:"🍢", cat:"plats", pays:"georgie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Brochettes géorgiennes de porc grillées sur sarments de vigne, simplement marinées à l'oignon. Fumées et juteuses, servies avec sauce tkemali.",
    descEn:"Georgian pork skewers grilled over grapevine cuttings, simply marinated with onion. Smoky and juicy, served with tkemali sauce.",
    ing:[["porc",180,"g"],["oignon",50,"g"],["vinaigre",5,"ml"],["coriandre",4,"g"]],
    etapes:[
      ["🔪","Couper","Couper le porc en gros cubes."],
      ["🧅","Mariner","Mariner avec oignon, vinaigre, sel et poivre quelques heures."],
      ["🍢","Embrocher","Embrocher les cubes en alternant avec l'oignon."],
      ["🔥","Braise","Préparer une braise vive (idéalement sarments de vigne)."],
      ["🍢","Griller","Griller en retournant jusqu'à doré et juteux."],
      ["🧅","Garnir","Servir sur un lit d'oignon cru au sumac."],
      ["🍽️","Servir","Accompagner de sauce tkemali (prune acidulée)."]
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
console.log("✅ " + DEFS.length + " recettes Afrique & Amériques insérées (FR 6-8 étapes + EN nom/description).");
