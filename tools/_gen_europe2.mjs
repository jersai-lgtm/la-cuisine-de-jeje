// Vague A « Europe gourmande » (Allemagne, Pologne, Hongrie, Belgique, Portugal, Suède, Russie) : 31 recettes.
// 6 à 8 étapes. Idempotent. FR + EN nom/description. Étapes EN via pipeline. node tools/_gen_europe2.mjs
import fs from "fs";
const DATE = "2026-06-29T12:00:00";
const base = 4;

const DEFS = [
  // ---------- ALLEMAGNE ----------
  { key:"leberkase", nom:"Leberkäse", nomEn:"Leberkäse", emoji:"🥩", cat:"plats", pays:"allemagne", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Pain de viande bavarois finement mixé, cuit au four en terrine puis tranché et poêlé. Servi en sandwich avec moutarde douce, c'est le déjeuner munichois.",
    descEn:"A finely blended Bavarian meatloaf, baked in a terrine then sliced and pan-fried. Served in a roll with sweet mustard, it's the Munich lunch.",
    ing:[["boeufHache",100,"g"],["porc",60,"g"],["oignon",30,"g"],["oeuf",25,"g"],["lait",20,"ml"]],
    etapes:[
      ["🔪","Préparer","Couper viandes et oignon en morceaux, bien froids."],
      ["🌀","Mixer","Mixer finement viandes, oignon, œuf, lait et épices en pâte lisse."],
      ["🧂","Assaisonner","Ajouter muscade, marjolaine, sel et poivre."],
      ["🟫","Mouler","Tasser dans une terrine, lisser le dessus en quadrillant."],
      ["🔥","Cuire","Cuire au four à 180 °C 45 min jusqu'à croûte dorée."],
      ["🔪","Trancher","Laisser tiédir et trancher épais."],
      ["🍳","Servir","Poêler les tranches et servir en sandwich avec moutarde."]
    ] },

  { key:"koenigsberger", nom:"Königsberger Klopse", nomEn:"Königsberger Klopse", emoji:"⚪", cat:"plats", pays:"allemagne", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Boulettes de viande pochées dans une sauce blanche crémeuse aux câpres et au citron. Délicat et acidulé, un grand classique d'Allemagne de l'Est.",
    descEn:"Meatballs poached in a creamy white sauce with capers and lemon. Delicate and tangy, a great East-German classic.",
    ing:[["boeufHache",120,"g"],["oeuf",25,"g"],["oignon",30,"g"],["creme",40,"ml"],["farine",15,"g"]],
    etapes:[
      ["🥩","Boulettes","Mélanger viande, oignon, œuf et pain trempé, façonner des boulettes."],
      ["💧","Pocher","Pocher les boulettes dans un bouillon frémissant, réserver."],
      ["🧈","Roux","Faire un roux beurre-farine."],
      ["🥛","Sauce","Mouiller du bouillon et de la crème, fouetter en sauce lisse."],
      ["🫒","Câpres","Ajouter câpres, jus de citron et une pointe de sucre."],
      ["♨️","Réunir","Remettre les boulettes et réchauffer sans bouillir."],
      ["🍽️","Servir","Servir avec du riz ou des pommes de terre vapeur."]
    ] },

  { key:"flammkuchen", nom:"Flammkuchen", nomEn:"Flammkuchen (Tarte Flambée)", emoji:"🔥", cat:"pizzas", pays:"allemagne", temps:"35 min", niveau:"⭐ Facile",
    desc:"Fine pâte croustillante garnie de crème, d'oignons et de lardons, cuite à four très chaud. La « tarte flambée » alsaco-allemande, légère et addictive.",
    descEn:"A thin, crisp dough topped with cream, onions and bacon, baked in a very hot oven. The Alsatian-German \"flame cake\", light and addictive.",
    ing:[["farine",70,"g"],["creme",60,"ml"],["lardons",40,"g"],["oignon",50,"g"],["huile",5,"ml"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte fine sans levure (farine, eau, huile, sel)."],
      ["⚪","Étaler","Étaler très finement sur une plaque."],
      ["🥛","Crème","Étaler la crème (mêlée de fromage blanc) jusqu'aux bords."],
      ["🧅","Garnir","Répartir oignons émincés et lardons."],
      ["🔥","Préchauffer","Préchauffer le four au maximum (250 °C)."],
      ["♨️","Cuire","Cuire 10-12 min jusqu'à ce que les bords brunissent."],
      ["🍽️","Servir","Couper en parts et servir aussitôt, bien croustillant."]
    ] },

  { key:"eintopf", nom:"Eintopf", nomEn:"Eintopf (German One-Pot Stew)", emoji:"🍲", cat:"soupes", pays:"allemagne", temps:"1h", niveau:"⭐ Facile",
    desc:"Potée allemande « tout-en-un » : viande, pommes de terre et légumes mijotés dans un seul pot. Économique, nourrissant, différent à chaque fois.",
    descEn:"A German all-in-one pot: meat, potatoes and vegetables simmered together. Cheap, hearty, different every time.",
    ing:[["porc",90,"g"],["pommedeterre",100,"g"],["carotte",60,"g"],["chou",60,"g"],["oignon",40,"g"]],
    etapes:[
      ["🥩","Saisir","Colorer le porc en cubes avec l'oignon."],
      ["💧","Mouiller","Couvrir d'eau ou de bouillon, écumer."],
      ["🥕","Légumes","Ajouter carottes et pommes de terre."],
      ["⏲️","Mijoter","Mijoter 30 min à feu doux."],
      ["🥬","Chou","Ajouter le chou émincé, poursuivre 15 min."],
      ["🌿","Assaisonner","Saler, poivrer, ajouter laurier et persil."],
      ["🍽️","Servir","Servir en bol bien chaud avec du pain."]
    ] },

  // ---------- POLOGNE ----------
  { key:"kotletschabowy", nom:"Kotlet Schabowy", nomEn:"Kotlet Schabowy (Breaded Pork Cutlet)", emoji:"🍖", cat:"plats", pays:"pologne", temps:"40 min", niveau:"⭐ Facile",
    desc:"Escalope de porc panée à la chapelure, frite dorée et croustillante. Le déjeuner dominical polonais, servi avec pommes de terre et chou.",
    descEn:"A breadcrumbed pork escalope, fried golden and crisp. The Polish Sunday lunch, served with potatoes and cabbage.",
    ing:[["porc",150,"g"],["chapelure",30,"g"],["oeuf",25,"g"],["farine",20,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🔨","Aplatir","Aplatir les escalopes de porc, saler et poivrer."],
      ["🍽️","Paner","Passer dans farine, œuf battu puis chapelure."],
      ["👋","Tapoter","Tapoter pour faire adhérer la panure."],
      ["🔥","Chauffer","Chauffer l'huile dans une poêle."],
      ["🍳","Frire","Frire 3-4 min par face jusqu'à doré croustillant."],
      ["🧻","Égoutter","Égoutter sur papier absorbant."],
      ["🍽️","Servir","Servir avec pommes de terre et chou braisé."]
    ] },

  { key:"sernik", nom:"Sernik", nomEn:"Sernik (Polish Cheesecake)", emoji:"🍰", cat:"desserts", pays:"pologne", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Le cheesecake polonais au fromage frais (twaróg), dense et peu sucré, parfumé au citron. Plus rustique et fondant que sa version américaine.",
    descEn:"The Polish cheesecake made with fresh curd (twaróg), dense and lightly sweet, lemon-scented. More rustic and tender than the American version.",
    ing:[["fromage",150,"g"],["oeuf",50,"g"],["sucre",40,"g"],["beurre",20,"g"],["farine",20,"g"]],
    etapes:[
      ["🧀","Mixer","Mixer le fromage frais jusqu'à parfaitement lisse."],
      ["🥚","Blanchir","Blanchir œufs et sucre, ajouter zeste de citron."],
      ["🥣","Mélanger","Incorporer le fromage, le beurre fondu et un peu de farine."],
      ["🟨","Verser","Verser sur un fond de pâte (ou directement dans le moule)."],
      ["🔥","Cuire","Cuire à 160 °C 1 h au bain-marie pour éviter les fissures."],
      ["❄️","Refroidir","Laisser refroidir dans le four éteint puis réfrigérer."],
      ["🍽️","Servir","Servir frais, éventuellement glacé."]
    ] },

  { key:"makowiec", nom:"Makowiec", nomEn:"Makowiec (Poppy Seed Roll)", emoji:"🥯", cat:"desserts", pays:"pologne", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Brioche roulée garnie d'une épaisse pâte de pavot sucrée. Le gâteau des fêtes polonais, en spirale noire et dorée.",
    descEn:"A rolled brioche filled with a thick sweet poppy-seed paste. The Polish holiday cake, in a black-and-gold spiral.",
    ing:[["farine",80,"g"],["pavot",40,"g"],["sucre",30,"g"],["beurre",20,"g"],["levure",3,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte levée briochée, laisser pousser."],
      ["⚫","Pavot","Ébouillanter et mixer le pavot avec sucre, miel et beurre."],
      ["⚪","Étaler","Étaler la pâte en rectangle."],
      ["🖌️","Garnir","Tartiner la pâte de pavot jusqu'aux bords."],
      ["🌀","Rouler","Rouler serré en boudin."],
      ["⏳","Apprêt","Laisser regonfler puis dorer à l'œuf."],
      ["🔥","Cuire","Cuire à 180 °C 35 min, glacer une fois tiède."]
    ] },

  { key:"paczki", nom:"Pączki", nomEn:"Pączki (Polish Donuts)", emoji:"🍩", cat:"desserts", pays:"pologne", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Beignets polonais moelleux fourrés à la confiture (rose ou prune), frits et roulés dans le sucre. La gourmandise de Mardi Gras.",
    descEn:"Soft Polish donuts filled with jam (rose or plum), fried and rolled in sugar. The Fat Thursday treat.",
    ing:[["farine",80,"g"],["oeuf",25,"g"],["sucre",20,"g"],["confiture",30,"g"],["huilefriture",25,"ml"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte levée riche (œufs, beurre, un peu d'alcool)."],
      ["⏲️","Pousser","Laisser doubler 1 h."],
      ["⚪","Former","Façonner des boules, laisser regonfler."],
      ["🔥","Frire","Frire à 175 °C jusqu'à doré, anneau clair sur le pourtour."],
      ["💉","Fourrer","Injecter la confiture à la poche."],
      ["🍬","Sucrer","Rouler dans le sucre ou glacer."],
      ["🍽️","Servir","Déguster le jour même."]
    ] },

  { key:"rosol", nom:"Rosół", nomEn:"Rosół (Polish Chicken Soup)", emoji:"🍲", cat:"soupes", pays:"pologne", temps:"1h30", niveau:"⭐ Facile",
    desc:"Bouillon de poule doré et limpide aux légumes et aux vermicelles. Le remontant du dimanche polonais, servi avant le plat principal.",
    descEn:"A golden, clear chicken broth with vegetables and fine noodles. The Polish Sunday pick-me-up, served before the main course.",
    ing:[["poulet",130,"g"],["carotte",60,"g"],["vermicelles",40,"g"],["oignon",40,"g"],["celeri",30,"g"]],
    etapes:[
      ["🍗","Démarrer","Mettre le poulet dans l'eau froide, porter à frémissement."],
      ["🥄","Écumer","Écumer soigneusement pour un bouillon limpide."],
      ["🧅","Aromates","Brûler un oignon à sec et l'ajouter avec carotte et céleri."],
      ["⏲️","Mijoter","Mijoter doucement 1 h sans bouillir."],
      ["🍜","Vermicelles","Cuire les vermicelles à part, les répartir dans les bols."],
      ["🫗","Filtrer","Filtrer le bouillon et le verser sur les nouilles."],
      ["🌿","Servir","Parsemer de persil et servir brûlant."]
    ] },

  // ---------- HONGRIE ----------
  { key:"porkolt", nom:"Pörkölt", nomEn:"Pörkölt (Paprika Meat Stew)", emoji:"🥘", cat:"plats", pays:"hongrie", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Ragoût hongrois de viande aux oignons fondus et au paprika, plus épais et plus charnu que le goulash. Rouge profond, à servir avec des nokedli.",
    descEn:"A Hungarian meat stew with melted onions and paprika, thicker and meatier than goulash. Deep red, served with nokedli dumplings.",
    ing:[["boeuf",150,"g"],["oignon",80,"g"],["paprika",5,"g"],["poivron",40,"g"],["tomate",50,"g"]],
    etapes:[
      ["🧅","Oignons","Faire fondre une grande quantité d'oignon dans le saindoux."],
      ["🌶️","Paprika","Hors du feu, ajouter le paprika (il ne doit pas brûler)."],
      ["🥩","Viande","Ajouter la viande en cubes et l'enrober."],
      ["🍅","Aromates","Ajouter poivron et tomate, un peu d'eau."],
      ["⏲️","Mijoter","Mijoter à couvert 1h15 jusqu'à fondant."],
      ["🥄","Réduire","Découvrir et réduire en sauce épaisse et brillante."],
      ["🍽️","Servir","Servir avec des nokedli ou des pommes de terre."]
    ] },

  { key:"dobostorta", nom:"Dobos Torta", nomEn:"Dobos Torta", emoji:"🍰", cat:"desserts", pays:"hongrie", temps:"2h", niveau:"⭐⭐⭐ Difficile",
    desc:"Gâteau hongrois à étages : fines génoises et crème au beurre chocolatée, couronné d'un disque de caramel craquant. Spectaculaire et raffiné.",
    descEn:"A Hungarian layer cake: thin sponges and chocolate buttercream, crowned with a crackling caramel disc. Spectacular and refined.",
    ing:[["farine",50,"g"],["oeuf",50,"g"],["sucre",50,"g"],["chocolat",40,"g"],["beurre",30,"g"]],
    etapes:[
      ["🥚","Génoises","Monter œufs et sucre, incorporer la farine."],
      ["🟤","Cuire","Cuire 5-6 fines génoises séparément."],
      ["🍫","Crème","Préparer une crème au beurre au chocolat."],
      ["🥞","Monter","Empiler les génoises en les tartinant de crème."],
      ["🍯","Caramel","Couler un caramel sur une génoise, marquer les parts."],
      ["👑","Décorer","Poser le disque caramélisé sur le dessus."],
      ["❄️","Reposer","Réfrigérer puis lisser les côtés à la crème."]
    ] },

  { key:"palacsinta", nom:"Palacsinta", nomEn:"Palacsinta (Hungarian Crêpes)", emoji:"🥞", cat:"desserts", pays:"hongrie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Crêpes fines hongroises roulées autour de confiture d'abricot ou de fromage sucré, parfois nappées de chocolat. Le dessert d'enfance.",
    descEn:"Thin Hungarian crêpes rolled around apricot jam or sweet cheese, sometimes topped with chocolate. The childhood dessert.",
    ing:[["farine",60,"g"],["oeuf",50,"g"],["lait",120,"ml"],["confiture",30,"g"],["sucre",15,"g"]],
    etapes:[
      ["🥣","Pâte","Battre farine, œufs, lait et eau gazeuse en pâte fluide."],
      ["⏲️","Reposer","Laisser reposer 20 min."],
      ["🥞","Cuire","Cuire de fines crêpes dorées."],
      ["🍑","Garnir","Tartiner de confiture d'abricot ou de fromage sucré."],
      ["🌯","Rouler","Rouler chaque crêpe serrée."],
      ["🍫","Napper","Napper de chocolat fondu (version Gundel)."],
      ["🍽️","Servir","Saupoudrer de sucre glace et servir tiède."]
    ] },

  { key:"fozelek", nom:"Főzelék", nomEn:"Főzelék (Hungarian Veg Stew)", emoji:"🥬", cat:"plats", pays:"hongrie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Purée-ragoût de légumes liée à la crème, entre soupe et plat. Réconfortant et économique, le déjeuner végétarien hongrois par excellence.",
    descEn:"A creamy vegetable purée-stew, between soup and main. Comforting and cheap, the quintessential Hungarian vegetarian lunch.",
    ing:[["petitspois",100,"g"],["creme",40,"ml"],["farine",15,"g"],["oignon",30,"g"],["paprika",2,"g"]],
    etapes:[
      ["🧅","Suer","Faire suer l'oignon dans un peu de beurre."],
      ["🟢","Légumes","Ajouter les petits pois (ou autre légume) et un peu d'eau."],
      ["⏲️","Cuire","Cuire jusqu'à tendreté."],
      ["🥛","Liaison","Mélanger crème, farine et paprika, verser dans la cocotte."],
      ["♨️","Lier","Cuire en remuant jusqu'à épaississement."],
      ["🧂","Assaisonner","Saler, poivrer, pointe de vinaigre ou sucre."],
      ["🍳","Servir","Servir avec un œuf au plat ou une saucisse."]
    ] },

  { key:"korozott", nom:"Körözött", nomEn:"Körözött (Paprika Cheese Spread)", emoji:"🧀", cat:"tartinables", pays:"hongrie", temps:"20 min", niveau:"⭐ Facile",
    desc:"Tartinade hongroise de fromage frais fouetté au beurre, au paprika et au cumin, parsemée d'oignon. À étaler sur du pain frais.",
    descEn:"A Hungarian spread of fresh cheese whipped with butter, paprika and caraway, dotted with onion. To spread on fresh bread.",
    ing:[["fromage",100,"g"],["beurre",30,"g"],["paprika",4,"g"],["oignon",20,"g"]],
    etapes:[
      ["🧀","Écraser","Écraser le fromage frais à la fourchette."],
      ["🧈","Crémer","Travailler le beurre mou en pommade."],
      ["🌶️","Épicer","Incorporer paprika, cumin et sel."],
      ["🥣","Mélanger","Mélanger fromage, beurre et oignon ciselé."],
      ["❄️","Reposer","Réserver 1 h au frais pour développer les arômes."],
      ["🍞","Servir","Servir à tartiner avec du pain et des radis."]
    ] },

  // ---------- BELGIQUE ----------
  { key:"stoemp", nom:"Stoemp", nomEn:"Stoemp", emoji:"🥔", cat:"plats", pays:"belgique", temps:"45 min", niveau:"⭐ Facile",
    desc:"Écrasée bruxelloise de pommes de terre et de légumes (carotte, poireau), relevée de lardons. Rustique, servie avec une saucisse.",
    descEn:"A Brussels mash of potatoes and vegetables (carrot, leek), studded with bacon. Rustic, served with a sausage.",
    ing:[["pommedeterre",180,"g"],["carotte",80,"g"],["oignon",40,"g"],["lardons",30,"g"],["beurre",15,"g"]],
    etapes:[
      ["🥔","Cuire","Cuire pommes de terre et carottes à l'eau salée."],
      ["🥓","Lardons","Faire rissoler lardons et oignon au beurre."],
      ["🥣","Écraser","Écraser les légumes grossièrement avec le beurre."],
      ["🔗","Mélanger","Incorporer lardons, oignon et un peu de lait."],
      ["🌿","Assaisonner","Muscade, sel, poivre et persil."],
      ["🌭","Servir","Servir avec une saucisse ou du boudin."]
    ] },

  { key:"moulesfrites", nom:"Moules-Frites", nomEn:"Moules-Frites", emoji:"🦪", cat:"plats", pays:"belgique", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Moules marinières au vin blanc et au céleri, accompagnées de frites maison croustillantes. Le plat national belge par excellence.",
    descEn:"Mussels steamed in white wine and celery, with crisp homemade fries. Belgium's quintessential national dish.",
    ing:[["moules",300,"g"],["pommedeterre",150,"g"],["oignon",40,"g"],["vinblanc",40,"ml"],["beurre",15,"g"]],
    etapes:[
      ["🦪","Nettoyer","Gratter et laver soigneusement les moules, jeter les ouvertes."],
      ["🍟","Frites","Tailler les pommes de terre et frire en deux bains."],
      ["🧅","Aromates","Faire suer oignon et céleri au beurre dans une grande marmite."],
      ["🍷","Vin","Déglacer au vin blanc."],
      ["💨","Cuire","Ajouter les moules, couvrir et secouer 5-6 min jusqu'à ouverture."],
      ["🌿","Finir","Parsemer de persil."],
      ["🍽️","Servir","Servir les moules dans leur jus avec les frites."]
    ] },

  { key:"voulauvent", nom:"Vol-au-Vent", nomEn:"Vol-au-Vent", emoji:"🥧", cat:"plats", pays:"belgique", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Bouchée feuilletée garnie d'un velouté de poulet, champignons et boulettes. Le grand classique du dimanche belge, crémeux et généreux.",
    descEn:"A puff-pastry case filled with a creamy chicken, mushroom and meatball stew. The grand Belgian Sunday classic.",
    ing:[["pateFeuilletee",50,"g"],["poulet",100,"g"],["champignon",40,"g"],["creme",40,"ml"],["farine",10,"g"]],
    etapes:[
      ["🥧","Bouchées","Cuire les bouchées feuilletées jusqu'à doré."],
      ["🍗","Pocher","Pocher le poulet dans un bouillon, l'effilocher."],
      ["🍄","Champignons","Faire suer les champignons."],
      ["🧈","Velouté","Faire un roux, mouiller du bouillon et de la crème."],
      ["⚪","Boulettes","Ajouter de petites boulettes de viande pochées."],
      ["🥣","Réunir","Incorporer poulet et champignons à la sauce, citronner."],
      ["🍽️","Servir","Garnir les bouchées et servir avec des frites."]
    ] },

  { key:"filetamericain", nom:"Filet Américain", nomEn:"Filet Américain (Belgian Steak Tartare)", emoji:"🥩", cat:"entrees", pays:"belgique", temps:"20 min", niveau:"⭐⭐ Moyen",
    desc:"Bœuf cru haché finement, lié à une sauce façon mayonnaise relevée de câpres, cornichons et oignon. Le tartare à la belge, servi avec frites.",
    descEn:"Finely minced raw beef bound with a mayo-style sauce sharpened with capers, pickles and onion. The Belgian tartare, served with fries.",
    ing:[["boeuf",120,"g"],["oeuf",25,"g"],["oignon",20,"g"],["moutarde",5,"g"],["huile",15,"ml"]],
    etapes:[
      ["🔪","Hacher","Hacher le bœuf très frais au couteau."],
      ["🥚","Sauce","Monter une mayonnaise avec jaune d'œuf, moutarde et huile."],
      ["🥒","Condiments","Hacher câpres, cornichons et oignon."],
      ["🥣","Mélanger","Lier la viande avec la sauce et les condiments."],
      ["🌶️","Assaisonner","Tabasco, Worcestershire, sel et poivre."],
      ["❄️","Tenir","Garder bien frais jusqu'au service."],
      ["🍟","Servir","Servir aussitôt avec des frites et de la salade."]
    ] },

  // ---------- PORTUGAL ----------
  { key:"arrozmarisco", nom:"Arroz de Marisco", nomEn:"Arroz de Marisco (Seafood Rice)", emoji:"🦐", cat:"plats", pays:"portugal", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Riz portugais aux fruits de mer, juteux et légèrement soupeux, parfumé à la tomate et à la coriandre. Le trésor de la côte atlantique.",
    descEn:"A Portuguese seafood rice, juicy and slightly soupy, scented with tomato and coriander. The treasure of the Atlantic coast.",
    ing:[["riz",80,"g"],["crevettes",80,"g"],["moules",80,"g"],["tomate",60,"g"],["oignon",40,"g"]],
    etapes:[
      ["🦐","Bouillon","Faire un bouillon avec les carapaces de crevettes."],
      ["🧅","Sofrito","Faire revenir oignon, ail et tomate (refogado)."],
      ["🍚","Riz","Nacrer le riz dans le sofrito."],
      ["💧","Mouiller","Mouiller du bouillon chaud, cuire en remuant peu."],
      ["🦪","Fruits de mer","Ajouter moules et crevettes en fin de cuisson."],
      ["🌿","Finir","Parsemer de coriandre, garder un riz « malandrinho » (juteux)."],
      ["🍽️","Servir","Servir aussitôt en cocotte."]
    ] },

  { key:"pasteisbacalhau", nom:"Pastéis de Bacalhau", nomEn:"Pastéis de Bacalhau (Cod Fritters)", emoji:"🐟", cat:"aperitifs", pays:"portugal", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Croquettes de morue et pomme de terre, frites en quenelles dorées. L'en-cas portugais incontournable, croustillant dehors, moelleux dedans.",
    descEn:"Cod-and-potato fritters, fried into golden quenelles. The essential Portuguese snack, crisp outside, fluffy inside.",
    ing:[["morue",100,"g"],["pommedeterre",120,"g"],["oeuf",25,"g"],["persil",5,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🐟","Dessaler","Dessaler la morue 24 h en changeant l'eau, puis l'effilocher."],
      ["🥔","Purée","Cuire et écraser les pommes de terre."],
      ["🥣","Mélanger","Mélanger morue, purée, œufs, oignon et persil."],
      ["🥄","Façonner","Former des quenelles à deux cuillères."],
      ["🔥","Chauffer","Chauffer l'huile à 180 °C."],
      ["🍳","Frire","Frire jusqu'à doré et gonflé."],
      ["🍽️","Servir","Servir chaud ou froid, avec un filet de citron."]
    ] },

  { key:"cataplana", nom:"Cataplana", nomEn:"Cataplana (Algarve Seafood Stew)", emoji:"🦐", cat:"plats", pays:"portugal", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de l'Algarve cuit dans sa marmite en cuivre, mêlant poisson, fruits de mer et porc dans une sauce tomate-poivron. Maritime et généreux.",
    descEn:"An Algarve stew cooked in its copper clam-pot, mixing fish, seafood and pork in a tomato-pepper sauce. Maritime and generous.",
    ing:[["poisson",120,"g"],["moules",80,"g"],["porc",50,"g"],["tomate",60,"g"],["oignon",40,"g"]],
    etapes:[
      ["🥓","Base","Faire revenir porc (ou chorizo), oignon et ail."],
      ["🍅","Sauce","Ajouter tomate, poivron et un peu de vin blanc."],
      ["🐟","Poisson","Déposer le poisson sur la sauce."],
      ["🦪","Coquillages","Ajouter moules et palourdes par-dessus."],
      ["🥘","Couvrir","Fermer la cataplana (ou la cocotte) hermétiquement."],
      ["💨","Cuire","Cuire à la vapeur 12-15 min jusqu'à ouverture des coquillages."],
      ["🌿","Servir","Parsemer de coriandre et servir directement dans la marmite."]
    ] },

  { key:"caldeirada", nom:"Caldeirada", nomEn:"Caldeirada (Portuguese Fish Stew)", emoji:"🐟", cat:"plats", pays:"portugal", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Bouillabaisse portugaise en couches : poissons, pommes de terre, tomate et oignon mijotés ensemble. Le plat des pêcheurs, simple et parfumé.",
    descEn:"A layered Portuguese fish stew: fish, potatoes, tomato and onion simmered together. The fishermen's dish, simple and fragrant.",
    ing:[["poisson",180,"g"],["pommedeterre",100,"g"],["tomate",60,"g"],["oignon",50,"g"],["poivron",40,"g"]],
    etapes:[
      ["🔪","Préparer","Couper poissons, pommes de terre, tomate, oignon et poivron."],
      ["🥘","Monter","Disposer en couches dans la cocotte (légumes puis poisson)."],
      ["🫒","Arroser","Arroser d'huile d'olive et d'un peu de vin blanc."],
      ["🌿","Aromates","Ajouter ail, laurier et coriandre."],
      ["⏲️","Mijoter","Cuire à couvert à feu doux 30 min sans remuer."],
      ["💧","Vérifier","Secouer la cocotte plutôt que mélanger."],
      ["🍽️","Servir","Servir avec du bon pain pour saucer."]
    ] },

  // ---------- SUÈDE ----------
  { key:"gravlax", nom:"Gravlax", nomEn:"Gravlax", emoji:"🐟", cat:"entrees", pays:"suede", temps:"30 min", niveau:"⭐⭐ Moyen",
    desc:"Saumon cru mariné au sel, sucre et aneth pendant 48 h, tranché finement et servi avec une sauce moutarde-aneth. L'entrée nordique chic.",
    descEn:"Raw salmon cured in salt, sugar and dill for 48 h, thinly sliced and served with a mustard-dill sauce. The chic Nordic starter.",
    ing:[["saumon",120,"g"],["sucre",15,"g"],["aneth",5,"g"],["citron",10,"ml"]],
    etapes:[
      ["🐟","Préparer","Choisir un pavé de saumon très frais, sans arêtes."],
      ["🧂","Mélange","Mélanger gros sel, sucre et poivre concassé."],
      ["🌿","Couvrir","Recouvrir le saumon de mélange et d'aneth ciselé."],
      ["⏳","Mariner","Filmer, poser un poids et réfrigérer 48 h en retournant."],
      ["💧","Rincer","Rincer, sécher et trancher finement en biais."],
      ["🥄","Sauce","Préparer une sauce moutarde-miel-aneth (hovmästarsås)."],
      ["🍽️","Servir","Servir avec pain de seigle et la sauce."]
    ] },

  { key:"pyttipanna", nom:"Pytt i Panna", nomEn:"Pytt i Panna (Swedish Hash)", emoji:"🥔", cat:"plats", pays:"suede", temps:"35 min", niveau:"⭐ Facile",
    desc:"Poêlée suédoise de pommes de terre, viande et oignon en petits dés, couronnée d'un œuf au plat et de betterave. Le roi de l'anti-gaspi.",
    descEn:"A Swedish pan-fry of diced potatoes, meat and onion, crowned with a fried egg and pickled beetroot. The king of leftovers.",
    ing:[["pommedeterre",150,"g"],["boeuf",100,"g"],["oignon",50,"g"],["oeuf",50,"g"],["beurre",15,"g"]],
    etapes:[
      ["🔪","Couper","Couper pommes de terre, viande et oignon en petits dés réguliers."],
      ["🥔","Pommes de terre","Faire dorer les pommes de terre au beurre, réserver."],
      ["🧅","Oignon","Faire blondir l'oignon."],
      ["🥩","Viande","Ajouter la viande et la colorer."],
      ["🔗","Réunir","Remettre les pommes de terre, sauter ensemble."],
      ["🍳","Œuf","Cuire un œuf au plat."],
      ["🍽️","Servir","Servir couronné de l'œuf, avec de la betterave."]
    ] },

  { key:"toastskagen", nom:"Toast Skagen", nomEn:"Toast Skagen", emoji:"🦐", cat:"entrees", pays:"suede", temps:"20 min", niveau:"⭐ Facile",
    desc:"Toast suédois garni d'une salade crémeuse de crevettes à l'aneth et au citron. Élégant, frais, l'entrée festive scandinave.",
    descEn:"A Swedish toast topped with a creamy dill-and-lemon shrimp salad. Elegant, fresh, the Scandinavian festive starter.",
    ing:[["crevettes",80,"g"],["pain",50,"g"],["aneth",4,"g"],["citron",10,"ml"],["creme",20,"ml"]],
    etapes:[
      ["🦐","Crevettes","Égoutter de petites crevettes nordiques."],
      ["🥣","Sauce","Mélanger mayonnaise, crème et aneth ciselé."],
      ["🍋","Aciduler","Ajouter zeste et jus de citron, sel et poivre."],
      ["🥄","Lier","Incorporer délicatement les crevettes."],
      ["🍞","Toast","Dorer des tranches de pain au beurre."],
      ["🥄","Dresser","Garnir généreusement les toasts de salade."],
      ["🌿","Servir","Décorer d'aneth, d'œufs de poisson et servir aussitôt."]
    ] },

  { key:"artsoppa", nom:"Ärtsoppa", nomEn:"Ärtsoppa (Swedish Pea Soup)", emoji:"🍲", cat:"soupes", pays:"suede", temps:"1h30", niveau:"⭐ Facile",
    desc:"Soupe de pois jaunes au porc, parfumée à la moutarde et à la marjolaine. La tradition du jeudi en Suède, suivie de crêpes.",
    descEn:"A yellow-pea soup with pork, flavoured with mustard and marjoram. The Thursday tradition in Sweden, followed by pancakes.",
    ing:[["poiscasses",80,"g"],["porc",70,"g"],["oignon",40,"g"],["carotte",40,"g"]],
    etapes:[
      ["🫘","Tremper","Rincer les pois jaunes (tremper si besoin)."],
      ["🥩","Bouillon","Cuire le porc dans l'eau pour parfumer le bouillon."],
      ["🫘","Pois","Ajouter les pois et cuire jusqu'à ce qu'ils fondent."],
      ["🥕","Légumes","Ajouter oignon, carotte, thym et marjolaine."],
      ["⏲️","Mijoter","Mijoter 1 h jusqu'à une soupe onctueuse."],
      ["🌭","Viande","Émincer le porc et le remettre dans la soupe."],
      ["🍽️","Servir","Servir avec moutarde forte, suivi de crêpes."]
    ] },

  { key:"prinsesstarta", nom:"Prinsesstårta", nomEn:"Prinsesstårta (Princess Cake)", emoji:"🍰", cat:"desserts", pays:"suede", temps:"2h", niveau:"⭐⭐⭐ Difficile",
    desc:"Gâteau suédois en dôme : génoise, crème pâtissière et chantilly, recouvert de pâte d'amande verte. Élégant, emblématique des grandes occasions.",
    descEn:"A domed Swedish cake: sponge, custard and whipped cream, covered in green marzipan. Elegant, iconic for grand occasions.",
    ing:[["farine",50,"g"],["oeuf",50,"g"],["creme",60,"ml"],["sucre",40,"g"],["poudreamande",40,"g"]],
    etapes:[
      ["🥚","Génoise","Monter une génoise légère, cuire et trancher en disques."],
      ["🍮","Crème","Préparer une crème pâtissière vanillée."],
      ["🥛","Chantilly","Monter la crème fouettée."],
      ["🟢","Massepain","Pétrir une pâte d'amande, colorer en vert."],
      ["🥞","Monter","Empiler génoise, confiture, crème pâtissière puis dôme de chantilly."],
      ["🟩","Couvrir","Étaler finement le massepain sur tout le dôme."],
      ["🌹","Décorer","Saupoudrer de sucre glace et poser une rose."]
    ] },

  // ---------- RUSSIE ----------
  { key:"pirojki", nom:"Pirojki", nomEn:"Pirozhki", emoji:"🥟", cat:"aperitifs", pays:"russie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Petits pains briochés russes fourrés à la viande et à l'oignon, dorés au four (ou frits). L'en-cas chaud des trajets en train transsibérien.",
    descEn:"Small Russian brioche buns stuffed with meat and onion, baked (or fried) golden. The warm snack of Trans-Siberian journeys.",
    ing:[["farine",80,"g"],["boeufHache",70,"g"],["oignon",30,"g"],["oeuf",20,"g"],["levure",3,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte levée moelleuse, laisser pousser."],
      ["🥩","Farce","Faire revenir viande hachée et oignon, assaisonner."],
      ["⚪","Diviser","Diviser la pâte et l'aplatir en disques."],
      ["🥟","Farcir","Déposer la farce et refermer en chausson soudé."],
      ["⏳","Apprêt","Laisser regonfler 20 min."],
      ["🥚","Dorer","Badigeonner d'œuf battu."],
      ["🔥","Cuire","Cuire au four à 190 °C jusqu'à doré (ou frire)."]
    ] },

  { key:"vatrouchka", nom:"Vatrouchka", nomEn:"Vatrushka", emoji:"🧀", cat:"desserts", pays:"russie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Brioche ronde russe à puits central garni de fromage frais sucré. Moelleuse et réconfortante, le goûter slave par excellence.",
    descEn:"A round Russian brioche with a central well filled with sweet fresh cheese. Soft and comforting, the quintessential Slavic teatime treat.",
    ing:[["farine",70,"g"],["fromage",60,"g"],["oeuf",30,"g"],["sucre",25,"g"],["beurre",15,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte levée briochée, laisser pousser."],
      ["⚪","Bouler","Façonner des boules et creuser un puits au centre."],
      ["🧀","Garniture","Mélanger fromage frais, œuf, sucre et vanille."],
      ["🥄","Garnir","Déposer la garniture dans chaque puits."],
      ["⏳","Apprêt","Laisser regonfler 20 min."],
      ["🥚","Dorer","Dorer les bords à l'œuf."],
      ["🔥","Cuire","Cuire à 180 °C 20 min jusqu'à doré."]
    ] },

  { key:"okrochka", nom:"Okrochka", nomEn:"Okroshka (Cold Soup)", emoji:"🥗", cat:"soupes", pays:"russie", temps:"25 min", niveau:"⭐ Facile",
    desc:"Soupe froide russe d'été : légumes croquants, œuf et pomme de terre dans un bouillon de kéfir (ou kvas) à l'aneth. Désaltérante et vive.",
    descEn:"A cold Russian summer soup: crunchy vegetables, egg and potato in a kefir (or kvass) broth with dill. Refreshing and lively.",
    ing:[["concombre",100,"g"],["oeuf",50,"g"],["pommedeterre",80,"g"],["yaourt",120,"g"],["aneth",4,"g"]],
    etapes:[
      ["🥔","Cuire","Cuire pommes de terre et œufs durs, refroidir."],
      ["🔪","Tailler","Couper concombre, pommes de terre, œufs et radis en dés."],
      ["🌿","Aromates","Ciseler aneth et oignon nouveau."],
      ["🥛","Base","Délayer le kéfir (ou yaourt) avec un peu d'eau froide."],
      ["🥣","Mélanger","Réunir légumes et base, saler."],
      ["❄️","Réfrigérer","Réserver bien au frais 1 h."],
      ["🍽️","Servir","Servir glacé, éventuellement avec du jambon."]
    ] },

  { key:"golubtsy", nom:"Golubtsy", nomEn:"Golubtsy (Stuffed Cabbage Rolls)", emoji:"🥬", cat:"plats", pays:"russie", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Feuilles de chou farcies de viande et de riz, mijotées dans une sauce tomate-crème. Le plat familial slave, fondant et réconfortant.",
    descEn:"Cabbage leaves stuffed with meat and rice, simmered in a tomato-cream sauce. The hearty, comforting Slavic family dish.",
    ing:[["chou",120,"g"],["boeufHache",80,"g"],["riz",40,"g"],["tomate",50,"g"],["oignon",40,"g"]],
    etapes:[
      ["🥬","Feuilles","Blanchir les feuilles de chou pour les assouplir."],
      ["🍚","Farce","Mélanger viande hachée, riz mi-cuit et oignon revenu."],
      ["🌯","Rouler","Garnir chaque feuille et rouler en repliant les côtés."],
      ["🥘","Ranger","Ranger les rouleaux serrés dans une cocotte."],
      ["🍅","Sauce","Couvrir d'une sauce tomate liée à la crème."],
      ["⏲️","Mijoter","Mijoter à couvert 1 h à feu doux."],
      ["🍽️","Servir","Servir nappé de sauce, avec de la crème fraîche."]
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
console.log("✅ " + DEFS.length + " recettes Europe gourmande insérées (FR 6-8 étapes + EN nom/description).");
