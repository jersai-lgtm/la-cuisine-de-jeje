// Vague 6 « Europe de l'Est » (Ukraine + Croatie + Serbie + Slovaquie) : 21 recettes — 6 à 8 étapes.
// Idempotent. FR (recettes_plats.js) + EN nom/description. Étapes EN via pipeline. node tools/_gen_esteurope.mjs
import fs from "fs";
const DATE = "2026-06-27T13:00:00";
const base = 4;

const DEFS = [
  // ---------- UKRAINE ----------
  { key:"deruny", nom:"Deruny", nomEn:"Deruny (Ukrainian Potato Pancakes)", emoji:"🥔", cat:"plats", pays:"ukraine", temps:"40 min", niveau:"⭐ Facile",
    desc:"Galettes de pomme de terre râpée, dorées et croustillantes, servies avec de la crème fraîche. Le réconfort paysan ukrainien par excellence.",
    descEn:"Grated-potato pancakes, golden and crisp, served with sour cream. The ultimate Ukrainian peasant comfort.",
    ing:[["pommedeterre",180,"g"],["oeuf",30,"g"],["oignon",40,"g"],["farine",20,"g"],["huile",15,"ml"]],
    etapes:[
      ["🥔","Râper","Râper finement les pommes de terre et l'oignon."],
      ["💧","Égoutter","Presser la râpée dans un linge pour ôter l'eau."],
      ["🥣","Pâte","Mélanger avec œuf, farine, sel et poivre."],
      ["🔥","Chauffer","Faire chauffer l'huile dans une poêle."],
      ["🥞","Cuire","Déposer des petits tas et aplatir, dorer 3-4 min par face."],
      ["🧻","Égoutter","Égoutter sur papier absorbant."],
      ["🍽️","Servir","Servir chaud avec de la crème fraîche et de l'aneth."]
    ] },

  { key:"kotletakiev", nom:"Kotleta po Kyivsky", nomEn:"Chicken Kyiv", emoji:"🍗", cat:"plats", pays:"ukraine", temps:"1h", niveau:"⭐⭐⭐ Difficile",
    desc:"Suprême de poulet roulé autour d'un beurre à l'ail et aux herbes, pané et frit : à la découpe, le beurre fondu jaillit. Spectaculaire.",
    descEn:"Chicken breast rolled around a garlic-herb butter, breaded and fried: at the cut, the melted butter bursts out. Spectacular.",
    ing:[["poulet",150,"g"],["beurre",30,"g"],["ail",6,"g"],["chapelure",30,"g"],["oeuf",25,"g"]],
    etapes:[
      ["🧈","Beurre","Mélanger beurre mou, ail écrasé et persil, former un boudin et le congeler."],
      ["🔪","Aplatir","Aplatir finement les suprêmes de poulet entre deux films."],
      ["🌯","Rouler","Poser le beurre glacé et rouler la viande bien serré."],
      ["❄️","Raffermir","Réserver au congélateur 15 min pour figer."],
      ["🍽️","Paner","Passer dans farine, œuf battu puis chapelure (double panure)."],
      ["🔥","Chauffer","Chauffer l'huile à 170 °C."],
      ["🍳","Frire","Frire jusqu'à doré, finir au four 8 min à 180 °C."],
      ["🍽️","Servir","Servir aussitôt : le beurre doit couler à la découpe."]
    ] },

  { key:"nalysnyky", nom:"Nalysnyky", nomEn:"Nalysnyky (Stuffed Crêpes)", emoji:"🥞", cat:"brunch", pays:"ukraine", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Fines crêpes ukrainiennes roulées autour d'une farce de fromage frais, dorées au beurre. Douces, fondantes, parfaites au petit-déjeuner.",
    descEn:"Thin Ukrainian crêpes rolled around a fresh-cheese filling, browned in butter. Soft, melting, perfect for breakfast.",
    ing:[["farine",60,"g"],["oeuf",50,"g"],["lait",120,"ml"],["fromage",60,"g"],["beurre",10,"g"]],
    etapes:[
      ["🥣","Pâte","Battre farine, œufs, lait et sel en pâte à crêpe fluide."],
      ["🥞","Crêpes","Cuire de fines crêpes d'un seul côté."],
      ["🧀","Farce","Mélanger le fromage frais avec œuf, sucre et vanille."],
      ["🌯","Garnir","Garnir chaque crêpe et rouler ou plier en paquet."],
      ["🧈","Beurrer","Disposer dans un plat beurré."],
      ["🔥","Dorer","Passer au four 15 min jusqu'à dorure."],
      ["🍽️","Servir","Servir tiède avec crème fraîche."]
    ] },

  { key:"pampushky", nom:"Pampushky", nomEn:"Pampushky (Garlic Rolls)", emoji:"🍞", cat:"boulangerie", pays:"ukraine", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Petits pains moelleux collés, badigeonnés d'huile à l'ail et au persil. L'accompagnement obligatoire du bortsch ukrainien.",
    descEn:"Soft pull-apart buns brushed with garlic-and-parsley oil. The compulsory companion to Ukrainian borscht.",
    ing:[["farine",100,"g"],["levure",3,"g"],["lait",50,"ml"],["ail",8,"g"],["huile",10,"ml"]],
    etapes:[
      ["🥣","Pâte","Pétrir farine, levure, lait tiède, sucre et sel."],
      ["⏲️","Pousser","Laisser lever 1 h jusqu'au doublement."],
      ["⚪","Bouler","Façonner des petites boules serrées dans un plat."],
      ["⏳","Apprêt","Laisser regonfler 20 min."],
      ["🔥","Cuire","Cuire à 190 °C 18 min jusqu'à doré."],
      ["🧄","Ail","Mixer ail, persil, huile et un peu d'eau salée."],
      ["🖌️","Badigeonner","Badigeonner les pains chauds de cette émulsion."],
      ["🍽️","Servir","Servir tièdes avec une soupe."]
    ] },

  { key:"kapusniak", nom:"Kapusniak", nomEn:"Kapusniak (Cabbage Soup)", emoji:"🍲", cat:"soupes", pays:"ukraine", temps:"1h", niveau:"⭐ Facile",
    desc:"Soupe de chou (souvent fermenté) au porc et aux pommes de terre, légèrement acidulée. Roborative, idéale par grand froid.",
    descEn:"A pork-and-potato cabbage soup (often fermented), pleasantly sour. Hearty, ideal in deep cold.",
    ing:[["chou",120,"g"],["pommedeterre",80,"g"],["carotte",50,"g"],["oignon",40,"g"],["porc",80,"g"]],
    etapes:[
      ["🥩","Bouillon","Cuire le porc dans l'eau pour un bouillon, écumer."],
      ["🔪","Tailler","Émincer chou, carotte et oignon, couper les pommes de terre."],
      ["🧅","Revenir","Faire revenir oignon et carotte."],
      ["🥬","Chou","Ajouter le chou et laisser fondre quelques minutes."],
      ["🥔","Mijoter","Verser le tout dans le bouillon avec les pommes de terre."],
      ["⏲️","Cuire","Mijoter 30 min, assaisonner (laurier, poivre)."],
      ["🍽️","Servir","Servir bien chaud avec de la crème et de l'aneth."]
    ] },

  { key:"banosh", nom:"Banosh", nomEn:"Banosh (Hutsul Corn Porridge)", emoji:"🌽", cat:"plats", pays:"ukraine", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Polenta de montagne des Carpates cuite à la crème, enrichie de fromage de brebis et d'oignons dorés. Crémeux et réconfortant.",
    descEn:"A Carpathian mountain polenta cooked in cream, enriched with sheep cheese and golden onions. Creamy and comforting.",
    ing:[["farineMais",80,"g"],["creme",70,"ml"],["fromagerape",40,"g"],["oignon",30,"g"]],
    etapes:[
      ["🥛","Chauffer","Porter la crème (et un peu d'eau salée) à frémissement."],
      ["🌽","Verser","Verser la semoule de maïs en pluie en fouettant."],
      ["🥄","Remuer","Remuer sans cesse à feu doux jusqu'à épaississement."],
      ["⏲️","Cuire","Cuire 20 min : le banosh doit se détacher des parois."],
      ["🧀","Fromage","Incorporer le fromage de brebis râpé."],
      ["🧅","Oignons","Faire dorer des oignons (ou lardons) à part."],
      ["🍽️","Servir","Servir couronné d'oignons croustillants."]
    ] },

  // ---------- CROATIE ----------
  { key:"pasticada", nom:"Pašticada", nomEn:"Pašticada (Dalmatian Braised Beef)", emoji:"🥩", cat:"plats", pays:"croatie", temps:"3h", niveau:"⭐⭐⭐ Difficile",
    desc:"Bœuf dalmate mariné puis braisé très longuement avec pruneaux et vin, en une sauce sombre douce-amère. Le plat de fête de la côte.",
    descEn:"Dalmatian beef marinated then braised for hours with prunes and wine into a dark, bittersweet sauce. The coast's celebration dish.",
    ing:[["boeuf",160,"g"],["pruneaux",30,"g"],["carotte",60,"g"],["oignon",50,"g"],["vinblanc",30,"ml"]],
    etapes:[
      ["🍷","Mariner","Mariner le bœuf piqué d'ail dans le vinaigre et les aromates une nuit."],
      ["🥩","Saisir","Égoutter, sécher et colorer la viande sur toutes les faces."],
      ["🥕","Légumes","Faire revenir oignon et carotte."],
      ["🍷","Déglacer","Déglacer au vin et à la marinade filtrée."],
      ["🍑","Pruneaux","Ajouter pruneaux et un peu de concentré de tomate."],
      ["⏲️","Braiser","Braiser à couvert 2h30 à feu très doux."],
      ["🥄","Sauce","Retirer la viande, mixer et réduire la sauce."],
      ["🍽️","Servir","Trancher et servir avec des gnocchis ou des pâtes."]
    ] },

  { key:"brudet", nom:"Brudet", nomEn:"Brudet (Adriatic Fish Stew)", emoji:"🐟", cat:"plats", pays:"croatie", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de poisson de l'Adriatique mijoté dans une sauce tomate au vin, servi avec de la polenta. Iodé, généreux, sans chichi.",
    descEn:"An Adriatic fish stew simmered in a tomato-and-wine sauce, served with polenta. Briny, generous, no-fuss.",
    ing:[["poisson",180,"g"],["tomate",80,"g"],["oignon",50,"g"],["ail",6,"g"],["vinblanc",20,"ml"]],
    etapes:[
      ["🐟","Préparer","Couper le poisson en gros morceaux, saler."],
      ["🧅","Sofrito","Faire fondre oignon et ail dans l'huile d'olive."],
      ["🍅","Tomate","Ajouter tomate et concentré, laisser réduire."],
      ["🍷","Vin","Déglacer au vin blanc et au vinaigre."],
      ["🐟","Poisson","Déposer le poisson sans remuer (secouer la cocotte)."],
      ["⏲️","Mijoter","Mijoter 25 min à découvert."],
      ["🌿","Finir","Parsemer de persil."],
      ["🍽️","Servir","Servir avec de la polenta crémeuse."]
    ] },

  { key:"fritule", nom:"Fritule", nomEn:"Fritule (Croatian Fritters)", emoji:"🍩", cat:"desserts", pays:"croatie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Petits beignets croates aux raisins et au zeste de citron, frits puis saupoudrés de sucre glace. La gourmandise des fêtes de fin d'année.",
    descEn:"Little Croatian fritters with raisins and lemon zest, fried then dusted with icing sugar. The treat of the year-end holidays.",
    ing:[["farine",70,"g"],["oeuf",25,"g"],["raisinssecs",15,"g"],["sucre",20,"g"],["huilefriture",25,"ml"]],
    etapes:[
      ["🍇","Raisins","Faire gonfler les raisins dans un peu de rhum."],
      ["🥣","Pâte","Mélanger farine, œuf, yaourt, levure, zeste de citron et raisins."],
      ["⏲️","Reposer","Laisser reposer la pâte 20 min."],
      ["🔥","Chauffer","Chauffer l'huile à 170 °C."],
      ["🥄","Frire","Déposer des petites quenelles à la cuillère, frire jusqu'à doré."],
      ["🧻","Égoutter","Égoutter sur papier absorbant."],
      ["🍬","Servir","Saupoudrer de sucre glace et servir tièdes."]
    ] },

  { key:"cobanac", nom:"Čobanac", nomEn:"Čobanac (Shepherd's Stew)", emoji:"🍲", cat:"plats", pays:"croatie", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Ragoût du berger de Slavonie, plusieurs viandes mijotées avec beaucoup de paprika et de poivron. Puissant, rouge et pimenté.",
    descEn:"A Slavonian shepherd's stew of several meats simmered with lots of paprika and pepper. Powerful, red and spicy.",
    ing:[["boeuf",100,"g"],["porc",80,"g"],["oignon",60,"g"],["paprika",5,"g"],["poivron",40,"g"]],
    etapes:[
      ["🔪","Préparer","Couper les viandes en cubes."],
      ["🧅","Oignon","Faire fondre beaucoup d'oignon doucement."],
      ["🌶️","Paprika","Hors du feu, ajouter le paprika pour qu'il ne brûle pas."],
      ["🥩","Viandes","Ajouter les viandes et les enrober."],
      ["💧","Mouiller","Couvrir d'eau, ajouter poivron et piment."],
      ["⏲️","Mijoter","Mijoter 1h15 à feu doux jusqu'à fondant."],
      ["🥄","Réduire","Laisser réduire en sauce épaisse."],
      ["🍽️","Servir","Servir avec du pain ou des pâtes fraîches."]
    ] },

  { key:"blitva", nom:"Blitva", nomEn:"Blitva (Chard & Potatoes)", emoji:"🥬", cat:"plats", pays:"croatie", temps:"25 min", niveau:"⭐ Facile",
    desc:"Blettes et pommes de terre fondues à l'huile d'olive et à l'ail. L'accompagnement dalmate immanquable du poisson grillé.",
    descEn:"Chard and potatoes melted in olive oil and garlic. The essential Dalmatian side for grilled fish.",
    ing:[["blettes",150,"g"],["pommedeterre",100,"g"],["ail",6,"g"],["huileOlive",15,"ml"]],
    etapes:[
      ["🥔","Cuire","Cuire les pommes de terre en cubes à l'eau salée."],
      ["🥬","Blettes","Ajouter les blettes ciselées en fin de cuisson."],
      ["💧","Égoutter","Égoutter en gardant un peu d'eau de cuisson."],
      ["🧄","Ail","Faire revenir l'ail dans l'huile d'olive."],
      ["🥣","Mélanger","Ajouter blettes et pommes de terre, écraser grossièrement."],
      ["🍽️","Servir","Saler, poivrer et servir tiède avec un filet d'huile."]
    ] },

  { key:"kremsnita", nom:"Kremšnita", nomEn:"Kremšnita (Custard Slice)", emoji:"🍰", cat:"desserts", pays:"croatie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Mille-feuille crémeux : une épaisse crème vanillée prise entre deux feuilletés, saupoudrée de sucre glace. Le gâteau-vedette de Samobor.",
    descEn:"A creamy custard slice: thick vanilla cream set between two puff layers, dusted with icing sugar. Samobor's star cake.",
    ing:[["pateFeuilletee",60,"g"],["lait",120,"ml"],["oeuf",50,"g"],["sucre",40,"g"]],
    etapes:[
      ["🔥","Feuilletés","Cuire deux plaques de pâte feuilletée jusqu'à doré, refroidir."],
      ["🥛","Lait","Chauffer le lait avec la vanille."],
      ["🥚","Crème","Blanchir œufs et sucre avec un peu de fécule."],
      ["♨️","Cuire","Verser le lait chaud, cuire jusqu'à crème épaisse."],
      ["🧊","Monter","Étaler la crème sur un feuilleté, couvrir du second."],
      ["❄️","Reposer","Réfrigérer plusieurs heures pour que la crème prenne."],
      ["🔪","Servir","Saupoudrer de sucre glace et découper en carrés."]
    ] },

  // ---------- SERBIE ----------
  { key:"karadjordjeva", nom:"Karađorđeva", nomEn:"Karađorđeva Šnicla", emoji:"🍖", cat:"plats", pays:"serbie", temps:"1h", niveau:"⭐⭐⭐ Difficile",
    desc:"Escalope de veau roulée autour de kajmak fondant, panée et frite, puis tranchée. Le « steak Karađorđe », riche et spectaculaire.",
    descEn:"A veal escalope rolled around melting kajmak, breaded and fried, then sliced. The \"Karađorđe steak\", rich and spectacular.",
    ing:[["veau",150,"g"],["fromage",40,"g"],["chapelure",30,"g"],["oeuf",25,"g"],["farine",15,"g"]],
    etapes:[
      ["🔪","Aplatir","Aplatir finement l'escalope de veau."],
      ["🧀","Garnir","Étaler le kajmak (ou fromage frais) au centre."],
      ["🌯","Rouler","Rouler bien serré et souder les bords."],
      ["❄️","Raffermir","Réserver au frais 20 min."],
      ["🍽️","Paner","Passer dans farine, œuf puis chapelure."],
      ["🔥","Chauffer","Chauffer l'huile à 170 °C."],
      ["🍳","Frire","Frire jusqu'à doré, finir au four si besoin."],
      ["🍽️","Servir","Trancher en biais : le fromage coule. Servir avec tartare."]
    ] },

  { key:"proja", nom:"Proja", nomEn:"Proja (Serbian Cornbread)", emoji:"🍞", cat:"boulangerie", pays:"serbie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Pain de maïs serbe moelleux au fromage et au yaourt, doré au four. Simple, rustique, parfait avec une soupe ou de l'ajvar.",
    descEn:"A moist Serbian cheese-and-yogurt cornbread, baked golden. Simple, rustic, perfect with soup or ajvar.",
    ing:[["farineMais",80,"g"],["oeuf",50,"g"],["yaourt",60,"g"],["fromagerape",40,"g"],["huile",15,"ml"]],
    etapes:[
      ["🥣","Mélanger","Mélanger semoule de maïs, farine et levure."],
      ["🥚","Liquides","Battre œufs, yaourt et huile."],
      ["🧀","Fromage","Incorporer le fromage râpé à la pâte."],
      ["🔥","Préchauffer","Préchauffer le four à 200 °C."],
      ["🟨","Verser","Verser dans un moule huilé."],
      ["♨️","Cuire","Cuire 25 min jusqu'à dorure."],
      ["🍽️","Servir","Couper en carrés et servir tiède."]
    ] },

  { key:"kajmak", nom:"Kajmak", nomEn:"Kajmak (Clotted Cream Spread)", emoji:"🧈", cat:"tartinables", pays:"serbie", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Crème de lait caillée des Balkans, onctueuse et légèrement salée, à tartiner sur le pain chaud ou à fondre sur les grillades.",
    descEn:"A Balkan clotted-milk cream, silky and lightly salted, to spread on warm bread or melt over grilled meats.",
    ing:[["creme",100,"ml"],["lait",80,"ml"],["beurre",10,"g"]],
    etapes:[
      ["🥛","Chauffer","Chauffer doucement lait et crème entiers sans bouillir."],
      ["⏳","Reposer","Laisser reposer plusieurs heures : une peau se forme."],
      ["🥄","Récolter","Récolter délicatement la couche crémeuse du dessus."],
      ["🧂","Saler","Saler légèrement et travailler en pommade."],
      ["❄️","Affiner","Laisser raffermir au frais."],
      ["🍞","Servir","Servir à tartiner sur du pain chaud ou avec des ćevapi."]
    ] },

  { key:"prebranac", nom:"Prebranac", nomEn:"Prebranac (Baked Beans)", emoji:"🫘", cat:"plats", pays:"serbie", temps:"1h30", niveau:"⭐ Facile",
    desc:"Haricots blancs cuits au four avec une montagne d'oignons fondants et du paprika. Végétarien, fondant et profondément savoureux.",
    descEn:"White beans baked with a mountain of melting onions and paprika. Vegetarian, meltingly soft and deeply savoury.",
    ing:[["haricotsblancs",100,"g"],["oignon",80,"g"],["paprika",4,"g"],["huile",15,"ml"]],
    etapes:[
      ["🫘","Cuire","Cuire les haricots blancs trempés jusqu'à tendreté."],
      ["🧅","Oignons","Faire fondre longuement beaucoup d'oignon."],
      ["🌶️","Paprika","Hors du feu, ajouter le paprika aux oignons."],
      ["🥘","Monter","Alterner haricots et oignons dans un plat à four."],
      ["💧","Mouiller","Ajouter un peu d'eau de cuisson et le laurier."],
      ["🔥","Cuire","Enfourner à 180 °C 45 min jusqu'à formation d'une croûte."],
      ["🍽️","Servir","Servir chaud, en plat ou en accompagnement."]
    ] },

  // ---------- SLOVAQUIE ----------
  { key:"pirohy", nom:"Pirohy", nomEn:"Pirohy (Slovak Dumplings)", emoji:"🥟", cat:"plats", pays:"slovaquie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Raviolis slovaques fourrés à la pomme de terre et au fromage, pochés puis nappés de beurre noisette. Simples et réconfortants.",
    descEn:"Slovak dumplings filled with potato and cheese, poached then dressed in brown butter. Simple and comforting.",
    ing:[["farine",80,"g"],["pommedeterre",80,"g"],["fromage",40,"g"],["oeuf",20,"g"],["beurre",10,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir une pâte souple farine, œuf, eau et sel ; reposer."],
      ["🥔","Farce","Écraser les pommes de terre cuites avec le fromage."],
      ["🔪","Découper","Étaler la pâte et découper des disques."],
      ["🥟","Farcir","Garnir, replier en demi-lune et souder les bords."],
      ["💧","Pocher","Pocher dans l'eau salée jusqu'à ce qu'ils remontent."],
      ["🧈","Beurre","Faire un beurre noisette."],
      ["🍽️","Servir","Napper de beurre et parsemer de fromage ou lardons."]
    ] },

  { key:"segedin", nom:"Segedínský Guláš", nomEn:"Segedin Goulash", emoji:"🍲", cat:"plats", pays:"slovaquie", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Goulash de porc à la choucroute et au paprika, lié à la crème. Doux-acidulé, fondant, servi avec des quenelles de pain.",
    descEn:"A pork goulash with sauerkraut and paprika, finished with cream. Mellow-tangy, tender, served with bread dumplings.",
    ing:[["porc",140,"g"],["choucroute",100,"g"],["oignon",50,"g"],["paprika",4,"g"],["creme",30,"ml"]],
    etapes:[
      ["🧅","Oignon","Faire fondre l'oignon dans le saindoux ou l'huile."],
      ["🌶️","Paprika","Hors du feu, ajouter le paprika."],
      ["🥩","Porc","Ajouter le porc en cubes et le colorer."],
      ["💧","Mijoter","Mouiller à l'eau et mijoter 45 min."],
      ["🥬","Choucroute","Ajouter la choucroute rincée, poursuivre 30 min."],
      ["🥛","Crème","Lier avec la crème et un peu de farine."],
      ["🍽️","Servir","Servir avec des knedlíky (quenelles de pain)."]
    ] },

  { key:"lokse", nom:"Lokše", nomEn:"Lokše (Potato Flatbread)", emoji:"🫓", cat:"brunch", pays:"slovaquie", temps:"45 min", niveau:"⭐ Facile",
    desc:"Galettes fines de pomme de terre cuites à sec, souples et dorées, beurrées ou garnies (sucrées ou salées). L'en-cas de fête slovaque.",
    descEn:"Thin potato flatbreads cooked dry, soft and golden, buttered or filled (sweet or savoury). A Slovak festive snack.",
    ing:[["pommedeterre",150,"g"],["farine",40,"g"],["beurre",15,"g"]],
    etapes:[
      ["🥔","Purée","Écraser des pommes de terre cuites encore chaudes."],
      ["🥣","Pâte","Incorporer la farine et le sel pour une pâte souple."],
      ["⚪","Diviser","Diviser en boules et étaler très finement."],
      ["🔥","Cuire","Cuire à sec dans une poêle chaude des deux côtés."],
      ["🧈","Beurrer","Badigeonner de beurre fondu."],
      ["🍽️","Servir","Servir nature, sucrées (sucre/pavot) ou salées (oie, choucroute)."]
    ] },

  { key:"vyprazanysyr", nom:"Vyprážaný Syr", nomEn:"Vyprážaný Syr (Fried Cheese)", emoji:"🧀", cat:"plats", pays:"slovaquie", temps:"30 min", niveau:"⭐ Facile",
    desc:"Pavé de fromage pané et frit, croustillant dehors et coulant dedans, servi avec frites et sauce tartare. Le plaisir coupable slovaque.",
    descEn:"A breaded, fried cheese slab, crisp outside and molten inside, served with fries and tartar sauce. The Slovak guilty pleasure.",
    ing:[["fromage",120,"g"],["chapelure",30,"g"],["oeuf",25,"g"],["farine",20,"g"],["huilefriture",25,"ml"]],
    etapes:[
      ["🧀","Découper","Couper le fromage (edam/gouda) en pavés épais."],
      ["🍽️","Paner","Passer dans farine, œuf battu puis chapelure."],
      ["🔁","Double","Répéter œuf + chapelure pour une croûte étanche."],
      ["❄️","Raffermir","Réserver au frais 10 min."],
      ["🔥","Chauffer","Chauffer l'huile à 175 °C."],
      ["🍳","Frire","Frire 2-3 min jusqu'à doré (le fromage ne doit pas fuir)."],
      ["🍽️","Servir","Servir aussitôt avec frites et sauce tartare."]
    ] },

  { key:"zemiakoveplacky", nom:"Zemiakové Placky", nomEn:"Zemiakové Placky (Garlic Potato Pancakes)", emoji:"🥔", cat:"encas", pays:"slovaquie", temps:"35 min", niveau:"⭐ Facile",
    desc:"Galettes de pomme de terre râpée à l'ail et à la marjolaine, frites bien croustillantes. La version slovaque, parfumée et dorée.",
    descEn:"Grated-potato pancakes with garlic and marjoram, fried until very crisp. The Slovak version, fragrant and golden.",
    ing:[["pommedeterre",180,"g"],["farine",25,"g"],["oeuf",25,"g"],["ail",6,"g"],["huile",15,"ml"]],
    etapes:[
      ["🥔","Râper","Râper finement les pommes de terre, presser l'eau."],
      ["🧄","Aromates","Ajouter ail écrasé, marjolaine, sel et poivre."],
      ["🥣","Lier","Incorporer œuf et farine en pâte épaisse."],
      ["🔥","Chauffer","Chauffer l'huile dans une poêle."],
      ["🥞","Frire","Étaler de fines galettes et frire jusqu'à très croustillant."],
      ["🧻","Égoutter","Égoutter sur papier absorbant."],
      ["🍽️","Servir","Servir chaud, nature ou frottées d'ail."]
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
console.log("✅ " + DEFS.length + " recettes Europe de l'Est insérées (FR 6-8 étapes + EN nom/description).");
