// Vague 3 « Afrique de l'Ouest » (Ghana + Côte d'Ivoire + Cameroun) : 19 recettes — 6 à 8 étapes.
// Idempotent : retire toute version existante des mêmes clés avant de réinsérer.
// Lancer : node tools/_gen_afrique.mjs
import fs from "fs";

const DATE = "2026-06-26T15:00:00";
const base = 4;

const DEFS = [
  // ---------- GHANA ----------
  { key:"waakye", nom:"Waakye", nomEn:"Waakye", emoji:"🍚", cat:"plats", pays:"ghana", temps:"50 min", niveau:"⭐ Facile",
    desc:"Riz et haricots cuits ensemble avec des feuilles de sorgho qui les teintent de rouge. Le petit-déjeuner-roi des rues d'Accra.",
    descEn:"Rice and beans cooked together with sorghum leaves that dye them red. The king of Accra street breakfasts.",
    ing:[["riz",80,"g"],["haricotsrouges",40,"g"],["oignon",30,"g"],["huilePalme",5,"ml"]],
    etapes:[
      ["🫘","Tremper","Faire tremper les haricots la veille pour accélérer la cuisson."],
      ["🔴","Colorer","Cuire les haricots avec les feuilles de sorgho (ou bicarbonate)."],
      ["🍚","Riz","Ajouter le riz rincé une fois les haricots mi-cuits."],
      ["💧","Cuire","Mouiller à hauteur et cuire à couvert jusqu'à absorption."],
      ["🧅","Parfumer","Faire revenir l'oignon à l'huile de palme."],
      ["🥄","Mélanger","Incorporer l'oignon au waakye, saler."],
      ["🍽️","Servir","Servir avec sauce piment (shito), spaghetti et œuf dur."]
    ] },

  { key:"groundnutsoup", nom:"Soupe à l'Arachide", nomEn:"Groundnut Soup (Nkatenkwan)", emoji:"🥜", cat:"soupes", pays:"ghana", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Soupe onctueuse de pâte d'arachide au poulet, tomate et gingembre. Le réconfort velouté du dimanche ghanéen, servi avec du riz.",
    descEn:"A creamy peanut-butter soup with chicken, tomato and ginger. Ghana's velvety Sunday comfort, served with rice.",
    ing:[["poulet",130,"g"],["beurrecacahuete",40,"g"],["tomate",70,"g"],["oignon",40,"g"],["gingembre",5,"g"]],
    etapes:[
      ["🍗","Saisir","Faire colorer le poulet avec oignon et gingembre."],
      ["🍅","Base","Ajouter la tomate mixée, laisser réduire."],
      ["💧","Mouiller","Couvrir d'eau et porter à frémissement."],
      ["🥜","Délayer","Délayer la pâte d'arachide dans un peu de bouillon."],
      ["🥣","Incorporer","Reverser dans la soupe en fouettant pour lisser."],
      ["⏲️","Mijoter","Mijoter 30 min : l'huile d'arachide doit perler en surface."],
      ["🌶️","Relever","Ajuster sel et piment."],
      ["🍚","Servir","Servir avec du riz blanc ou des boules omotuo."]
    ] },

  { key:"banku", nom:"Banku", nomEn:"Banku", emoji:"🍙", cat:"plats", pays:"ghana", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Pâte légèrement fermentée de maïs et de manioc, travaillée en boule lisse. L'accompagnement acidulé des soupes et sauces ghanéennes.",
    descEn:"A lightly fermented corn-and-cassava dough worked into a smooth ball. The tangy companion to Ghanaian soups and stews.",
    ing:[["farineMais",70,"g"],["manioc",50,"g"]],
    etapes:[
      ["🥣","Mélanger","Délayer pâtes de maïs et de manioc fermentées dans l'eau."],
      ["🍯","Lisser","Filtrer pour obtenir une pâte sans grumeaux."],
      ["🔥","Chauffer","Verser dans une casserole et chauffer à feu moyen."],
      ["🥄","Travailler","Remuer énergiquement à la spatule en continu."],
      ["💪","Pétrir","Travailler jusqu'à une pâte lisse, brillante et élastique."],
      ["🍙","Former","Façonner des boules à l'aide d'un bol mouillé."],
      ["🍽️","Servir","Servir chaud avec une sauce gombo, tilapia ou shito."]
    ] },

  { key:"lightsoup", nom:"Light Soup Ghanéenne", nomEn:"Ghanaian Light Soup", emoji:"🍜", cat:"soupes", pays:"ghana", temps:"50 min", niveau:"⭐ Facile",
    desc:"Bouillon clair et relevé au poisson, tomate, gingembre et piment. Léger, parfumé et réputé revigorant quand on couve un rhume.",
    descEn:"A clear, spicy broth with fish, tomato, ginger and chilli. Light, fragrant and famously revitalising when a cold strikes.",
    ing:[["poisson",130,"g"],["tomate",80,"g"],["gingembre",5,"g"],["piment",3,"g"],["oignon",40,"g"]],
    etapes:[
      ["🔪","Préparer","Nettoyer le poisson, mixer tomate, oignon, gingembre et piment."],
      ["🍅","Base","Faire revenir la purée d'aromates quelques minutes."],
      ["💧","Bouillon","Mouiller largement à l'eau et porter à ébullition."],
      ["⏲️","Infuser","Laisser frémir 20 min pour développer les arômes."],
      ["🐟","Poisson","Plonger le poisson et pocher délicatement."],
      ["🌶️","Ajuster","Rectifier sel et piment, garder le bouillon bien clair."],
      ["🍽️","Servir","Servir brûlant avec du fufu, du riz ou des ignames."]
    ] },

  { key:"kontomire", nom:"Kontomire (Sauce Palabre)", nomEn:"Kontomire (Palaver Sauce)", emoji:"🥬", cat:"plats", pays:"ghana", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de feuilles vertes à l'huile de palme, poisson et oignon. La sauce aux épinards de cocoyam, riche et terreuse.",
    descEn:"A stew of greens in palm oil with fish and onion. The cocoyam-leaf spinach sauce, rich and earthy.",
    ing:[["epinard",120,"g"],["huilePalme",10,"ml"],["poisson",80,"g"],["oignon",40,"g"],["tomate",50,"g"]],
    etapes:[
      ["🥬","Blanchir","Blanchir et hacher grossièrement les feuilles vertes."],
      ["🌴","Chauffer","Chauffer l'huile de palme dans une cocotte."],
      ["🧅","Suer","Faire suer oignon et tomate jusqu'à fondre."],
      ["🐟","Poisson","Ajouter le poisson (fumé ou frais) émietté."],
      ["🥬","Feuilles","Incorporer les feuilles et un peu d'eau."],
      ["⏲️","Mijoter","Mijoter 15 min jusqu'à ce que la sauce épaississe."],
      ["🌶️","Relever","Ajouter piment et graines d'egusi si désiré."],
      ["🍽️","Servir","Servir avec du riz, des ignames ou du banku."]
    ] },

  { key:"tatale", nom:"Tatalé", nomEn:"Tatale (Plantain Pancakes)", emoji:"🥞", cat:"encas", pays:"ghana", temps:"30 min", niveau:"⭐ Facile",
    desc:"Galettes de plantain bien mûr relevées au gingembre et au piment, frites dorées. Le goûter sucré-épicé du Ghana.",
    descEn:"Ripe-plantain fritters spiked with ginger and chilli, fried golden. Ghana's sweet-and-spicy snack.",
    ing:[["plantain",120,"g"],["farine",30,"g"],["oignon",20,"g"],["gingembre",3,"g"],["piment",2,"g"]],
    etapes:[
      ["🍌","Choisir","Choisir des plantains très mûrs (peau noire) pour le sucré."],
      ["🥄","Écraser","Les écraser en purée à la fourchette."],
      ["🧅","Aromates","Ajouter oignon râpé, gingembre et piment finement hachés."],
      ["🥣","Pâte","Incorporer la farine pour lier en pâte épaisse."],
      ["⏲️","Reposer","Laisser reposer 10 min."],
      ["🔥","Frire","Déposer des cuillerées dans l'huile chaude, dorer des 2 côtés."],
      ["🍽️","Servir","Égoutter et servir chaud, en accompagnement ou en encas."]
    ] },

  { key:"shito", nom:"Shito", nomEn:"Shito (Black Pepper Sauce)", emoji:"🌶️", cat:"sauces", pays:"ghana", temps:"40 min", niveau:"⭐ Facile",
    desc:"Sauce piment noire ghanéenne, longuement mijotée à l'huile avec crevettes, oignon et gingembre. Se garde et relève absolument tout.",
    descEn:"Ghana's black chilli sauce, slow-cooked in oil with shrimp, onion and ginger. It keeps well and lifts absolutely everything.",
    ing:[["piment",20,"g"],["crevettes",20,"g"],["oignon",30,"g"],["tomate",30,"g"],["huile",30,"ml"],["gingembre",5,"g"]],
    etapes:[
      ["🧅","Mixer","Mixer oignon, tomate, gingembre et ail en purée."],
      ["🦐","Mixer 2","Réduire crevettes séchées et poisson fumé en poudre."],
      ["🔥","Chauffer","Chauffer généreusement l'huile dans une casserole."],
      ["🧅","Réduire","Cuire la purée d'aromates jusqu'à ce que l'eau s'évapore."],
      ["🌶️","Piment","Ajouter piment en poudre, crevettes et épices."],
      ["⏲️","Confire","Cuire à feu doux 20-30 min : la sauce doit foncer."],
      ["🫙","Conserver","Mettre en pot stérilisé, recouvert d'huile."],
      ["🍽️","Servir","Utiliser comme condiment sur riz, waakye, kenkey…"]
    ] },

  // ---------- CÔTE D'IVOIRE ----------
  { key:"garba", nom:"Garba", nomEn:"Garba", emoji:"🐟", cat:"plats", pays:"cotedivoire", temps:"30 min", niveau:"⭐ Facile",
    desc:"Le street-food ivoirien culte : attiéké et thon frit, oignon et piment. Simple, économique et terriblement addictif.",
    descEn:"The cult Ivorian street food: attiéké and fried tuna with onion and chilli. Simple, cheap and dangerously addictive.",
    ing:[["attieke",100,"g"],["poisson",100,"g"],["oignon",30,"g"],["piment",3,"g"],["huilefriture",15,"ml"]],
    etapes:[
      ["🔪","Préparer","Couper le thon en morceaux, émincer oignon et piment frais."],
      ["🧂","Assaisonner","Saler le poisson et le laisser prendre 5 min."],
      ["🔥","Chauffer","Chauffer l'huile de friture."],
      ["🐟","Frire","Frire le thon jusqu'à doré et bien cuit à cœur."],
      ["💨","Attiéké","Réchauffer l'attiéké à la vapeur pour le détendre."],
      ["🥗","Condiment","Mélanger oignon, tomate et piment avec un peu d'huile."],
      ["🍽️","Dresser","Servir l'attiéké, le poisson et le condiment ensemble."]
    ] },

  { key:"saucegraine", nom:"Sauce Graine", nomEn:"Sauce Graine (Palm Nut Stew)", emoji:"🌴", cat:"plats", pays:"cotedivoire", temps:"1h15", niveau:"⭐⭐ Moyen",
    desc:"Ragoût onctueux à la pulpe de noix de palme, bœuf et piment. Rouge profond et puissant, servi avec du riz ou du foutou.",
    descEn:"A rich palm-nut-pulp stew with beef and chilli. Deep red and powerful, served with rice or foutou.",
    ing:[["boeuf",120,"g"],["huilePalme",15,"ml"],["tomate",60,"g"],["oignon",40,"g"],["piment",3,"g"]],
    etapes:[
      ["🌴","Pulpe","Délayer la pulpe de noix de palme dans l'eau chaude."],
      ["🥩","Viande","Saisir le bœuf avec l'oignon."],
      ["🍅","Aromates","Ajouter tomate et piment, faire revenir."],
      ["💧","Mouiller","Verser la pulpe de palme et compléter d'eau."],
      ["⏲️","Mijoter","Mijoter à feu doux 45 min."],
      ["🫗","Dégraisser","Écumer l'excédent d'huile rouge en surface."],
      ["🧂","Ajuster","Saler, ajouter poisson fumé ou crabe si désiré."],
      ["🍚","Servir","Servir avec riz, foutou ou placali."]
    ] },

  { key:"saucearachide", nom:"Sauce Arachide", nomEn:"Peanut Sauce", emoji:"🥜", cat:"plats", pays:"cotedivoire", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût crémeux de poulet à la pâte d'arachide, tomate et gingembre. Riche et nourrissant, le grand classique de toute l'Afrique de l'Ouest.",
    descEn:"A creamy chicken stew with peanut paste, tomato and ginger. Rich and hearty, a great West-African classic.",
    ing:[["poulet",130,"g"],["beurrecacahuete",40,"g"],["tomate",60,"g"],["oignon",40,"g"],["gingembre",5,"g"]],
    etapes:[
      ["🍗","Saisir","Faire dorer le poulet assaisonné, réserver."],
      ["🧅","Base","Faire revenir oignon, gingembre et tomate."],
      ["🥜","Délayer","Délayer la pâte d'arachide dans de l'eau chaude."],
      ["🥣","Réunir","Reverser poulet et pâte d'arachide dans la cocotte."],
      ["💧","Mouiller","Ajouter de l'eau pour une sauce souple."],
      ["⏲️","Mijoter","Mijoter 30 min : l'huile doit affleurer."],
      ["🌶️","Relever","Ajuster sel et piment."],
      ["🍚","Servir","Servir avec du riz blanc."]
    ] },

  { key:"foutou", nom:"Foutou Banane", nomEn:"Foutou (Pounded Plantain)", emoji:"🍌", cat:"plats", pays:"cotedivoire", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Banane plantain et manioc pilés en une pâte lisse et élastique. L'accompagnement incontournable des sauces ivoiriennes.",
    descEn:"Plantain and cassava pounded into a smooth, elastic dough. The essential companion to Ivorian sauces.",
    ing:[["plantain",150,"g"],["manioc",80,"g"]],
    etapes:[
      ["🔪","Éplucher","Éplucher plantains et manioc, couper en tronçons."],
      ["💧","Cuire","Cuire à l'eau bouillante jusqu'à tendreté."],
      ["🫙","Égoutter","Égoutter en gardant un peu d'eau de cuisson."],
      ["🪨","Piler","Piler au mortier (ou robot) en ajoutant de l'eau chaude."],
      ["💪","Travailler","Travailler jusqu'à une pâte lisse, souple et élastique."],
      ["🍡","Former","Mouiller les mains et former de belles boules."],
      ["🍽️","Servir","Servir aussitôt avec sauce graine ou sauce claire."]
    ] },

  { key:"poissonbraise", nom:"Poisson Braisé", nomEn:"Braised Fish", emoji:"🔥", cat:"plats", pays:"cotedivoire", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Poisson entier mariné au gingembre et citron, braisé au feu de bois. La star des maquis ivoiriens, servie avec attiéké et alloco.",
    descEn:"A whole fish marinated in ginger and lemon, braised over wood fire. The star of Ivorian maquis, served with attiéké and alloco.",
    ing:[["poisson",200,"g"],["oignon",40,"g"],["tomate",40,"g"],["gingembre",5,"g"],["citron",15,"ml"],["piment",3,"g"]],
    etapes:[
      ["🔪","Préparer","Vider, écailler et inciser le poisson sur les flancs."],
      ["🧄","Marinade","Mixer ail, gingembre, piment, citron, sel et huile."],
      ["💆","Mariner","Masser le poisson de marinade, laisser 30 min."],
      ["🔥","Braise","Préparer une braise vive (ou un gril bien chaud)."],
      ["🐟","Braiser","Griller le poisson en l'arrosant de marinade, retourner."],
      ["🧅","Condiment","Préparer un oignon mariné citron-piment."],
      ["🍋","Finir","Vérifier la cuisson, la chair doit se détacher."],
      ["🍽️","Servir","Servir avec attiéké, alloco et le condiment."]
    ] },

  { key:"sauceclaire", nom:"Sauce Claire", nomEn:"Sauce Claire (Okra & Fish)", emoji:"🌿", cat:"plats", pays:"cotedivoire", temps:"50 min", niveau:"⭐ Facile",
    desc:"Bouillon léger lié au gombo, avec poisson, tomate et piment. La sauce gluante et réconfortante du quotidien ivoirien.",
    descEn:"A light okra-thickened broth with fish, tomato and chilli. The slippery, comforting everyday Ivorian sauce.",
    ing:[["poisson",120,"g"],["gombo",40,"g"],["tomate",50,"g"],["oignon",40,"g"],["piment",3,"g"]],
    etapes:[
      ["🔪","Préparer","Couper le gombo en rondelles, émincer oignon et tomate."],
      ["🍅","Base","Faire revenir oignon, tomate et piment."],
      ["💧","Bouillon","Mouiller à l'eau et porter à frémissement."],
      ["🐟","Poisson","Ajouter le poisson et un peu de poisson fumé."],
      ["🌿","Gombo","Incorporer le gombo qui va lier la sauce."],
      ["⏲️","Mijoter","Mijoter 15 min jusqu'à la texture filante typique."],
      ["🧂","Ajuster","Rectifier le sel et le piment."],
      ["🍚","Servir","Servir avec foutou, riz ou placali."]
    ] },

  // ---------- CAMEROUN ----------
  { key:"saucegombo", nom:"Sauce Gombo", nomEn:"Okra Stew", emoji:"🌿", cat:"plats", pays:"cameroun", temps:"50 min", niveau:"⭐ Facile",
    desc:"Ragoût filant de gombo à l'huile de palme et au bœuf, relevé au piment. Texture unique, servi avec un féculent pilé.",
    descEn:"A stringy okra stew in palm oil with beef, spiced with chilli. A unique texture, served with a pounded starch.",
    ing:[["gombo",100,"g"],["boeuf",100,"g"],["huilePalme",10,"ml"],["oignon",40,"g"],["piment",3,"g"]],
    etapes:[
      ["🥩","Viande","Mijoter le bœuf avec l'oignon jusqu'à tendreté."],
      ["🔪","Gombo","Râper ou couper finement le gombo."],
      ["🌴","Huile","Ajouter l'huile de palme au bouillon de viande."],
      ["🌿","Incorporer","Incorporer le gombo en remuant."],
      ["♨️","Lier","Cuire jusqu'à ce que la sauce devienne filante."],
      ["🌶️","Relever","Ajouter piment, crevettes séchées et épices."],
      ["🧂","Ajuster","Rectifier l'assaisonnement."],
      ["🍽️","Servir","Servir avec couscous de manioc, fufu ou riz."]
    ] },

  { key:"koki", nom:"Koki", nomEn:"Koki (Black-Eyed Pea Cake)", emoji:"🫘", cat:"plats", pays:"cameroun", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Flan de niébé moulu à l'huile de palme et aux épinards, cuit vapeur en feuilles de bananier. Onctueux et nourrissant.",
    descEn:"A ground black-eyed-pea flan with palm oil and greens, steamed in banana leaves. Creamy and nourishing.",
    ing:[["haricots",100,"g"],["huilePalme",10,"ml"],["epinard",40,"g"],["piment",3,"g"]],
    etapes:[
      ["🫘","Tremper","Tremper les niébés puis les peler en les frottant."],
      ["🌀","Moudre","Mixer en pâte lisse avec un peu d'eau."],
      ["🌴","Huile","Incorporer l'huile de palme chaude petit à petit."],
      ["🥬","Verdure","Ajouter épinards ciselés, piment et sel."],
      ["📦","Papillote","Répartir la pâte dans des feuilles (ou ramequins)."],
      ["💨","Vapeur","Cuire à la vapeur 1h jusqu'à ce que le flan prenne."],
      ["🔪","Démouler","Laisser tiédir avant de démouler."],
      ["🍽️","Servir","Servir avec du plantain bouilli ou du riz."]
    ] },

  { key:"kondre", nom:"Kondré", nomEn:"Kondré (Plantain & Beef Stew)", emoji:"🍌", cat:"plats", pays:"cameroun", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de plantains et de bœuf aux épices, mijoté jusqu'au fondant. Plat de fête de l'Ouest camerounais.",
    descEn:"A spiced plantain-and-beef stew, simmered until meltingly tender. A celebration dish of western Cameroon.",
    ing:[["plantain",150,"g"],["boeuf",120,"g"],["tomate",50,"g"],["oignon",40,"g"],["gingembre",5,"g"]],
    etapes:[
      ["🥩","Saisir","Faire dorer le bœuf assaisonné dans la cocotte."],
      ["🧅","Aromates","Ajouter oignon, ail et gingembre, faire revenir."],
      ["🍅","Sauce","Incorporer la tomate et les épices (njangsa, pèbè)."],
      ["💧","Mouiller","Couvrir d'eau et laisser mijoter 30 min."],
      ["🍌","Plantain","Ajouter les plantains pas trop mûrs en tronçons."],
      ["⏲️","Fondre","Poursuivre 20 min jusqu'à ce que tout soit fondant."],
      ["🌶️","Relever","Ajuster sel et piment."],
      ["🍽️","Servir","Servir bien nappé, en plat unique."]
    ] },

  { key:"mbongotchobi", nom:"Mbongo Tchobi", nomEn:"Mbongo Tchobi (Black Stew)", emoji:"🖤", cat:"plats", pays:"cameroun", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût noir et puissant de poisson aux épices brûlées (mbongo). Spectaculaire, fumé et profondément parfumé.",
    descEn:"A black, powerful fish stew made with charred mbongo spices. Spectacular, smoky and deeply fragrant.",
    ing:[["poisson",150,"g"],["tomate",50,"g"],["oignon",40,"g"],["piment",3,"g"],["gingembre",5,"g"]],
    etapes:[
      ["🔥","Brûler","Torréfier les épices mbongo jusqu'à ce qu'elles noircissent."],
      ["⚫","Moudre","Les réduire en poudre noire fine."],
      ["🐟","Mariner","Assaisonner le poisson d'ail, gingembre et citron."],
      ["🧅","Base","Faire revenir oignon et tomate."],
      ["🖤","Sauce","Délayer la poudre noire avec de l'eau, verser dans la cocotte."],
      ["🐟","Cuire","Déposer le poisson et mijoter doucement 20 min."],
      ["🌶️","Relever","Ajuster piment et sel."],
      ["🍌","Servir","Servir avec plantain, manioc ou bobolo."]
    ] },

  { key:"achu", nom:"Achu (Soupe Jaune)", nomEn:"Achu (Yellow Soup)", emoji:"🟡", cat:"plats", pays:"cameroun", temps:"1h30", niveau:"⭐⭐⭐ Difficile",
    desc:"Pâte d'igname pilée servie avec une soupe jaune à l'huile de palme et au bœuf. Plat cérémoniel des Grassfields.",
    descEn:"Pounded yam paste served with a yellow palm-oil-and-beef soup. A ceremonial dish of the Grassfields.",
    ing:[["igname",150,"g"],["huilePalme",15,"ml"],["boeuf",80,"g"],["oignon",30,"g"]],
    etapes:[
      ["🍠","Cuire","Cuire l'igname (et un peu de taro) à l'eau jusqu'à tendreté."],
      ["🪨","Piler","Piler en pâte très lisse, garder au chaud humide."],
      ["🥩","Bouillon","Mijoter le bœuf avec oignon pour un bouillon corsé."],
      ["🟡","Émulsion","Fouetter l'huile de palme avec de la pierre kanwa et de l'eau."],
      ["🌈","Jaunir","La soupe émulsionnée doit virer au jaune-orangé."],
      ["🌶️","Assaisonner","Ajouter piment jaune et épices."],
      ["🥣","Réunir","Verser la soupe chaude sur la viande."],
      ["🍽️","Servir","Servir la pâte d'igname à part, à tremper dans la soupe."]
    ] },

  { key:"brochettescamerounaises", nom:"Brochettes Soya", nomEn:"Soya (Cameroonian Beef Skewers)", emoji:"🍢", cat:"aperitifs", pays:"cameroun", temps:"35 min", niveau:"⭐ Facile",
    desc:"Brochettes de bœuf grillées et enrobées d'un mélange épicé à l'arachide. Le « soya » des soirées camerounaises au charbon.",
    descEn:"Grilled beef skewers coated in a spiced peanut rub. The \"soya\" of Cameroonian charcoal-grill evenings.",
    ing:[["boeuf",150,"g"],["oignon",30,"g"],["gingembre",5,"g"],["piment",3,"g"],["arachide",10,"g"]],
    etapes:[
      ["🔪","Couper","Couper le bœuf en fines lamelles."],
      ["🥜","Soya","Préparer la poudre soya : arachide grillée, piment, gingembre, épices."],
      ["💆","Mariner","Mélanger la viande avec un peu d'huile et de poudre soya."],
      ["🍢","Embrocher","Embrocher les lamelles en accordéon sur les pics."],
      ["🔥","Griller","Griller au charbon en retournant régulièrement."],
      ["🥜","Enrober","Saupoudrer généreusement de poudre soya en fin de cuisson."],
      ["🧅","Garnir","Servir avec oignon cru et tranches de plantain."],
      ["🍽️","Servir","Déguster brûlant, à la main."]
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
function recetteEN(d) {
  return `  ${d.key}: { nom: ${JSON.stringify(d.nomEn)}, description: ${JSON.stringify(d.descEn)} }`;
}
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
console.log("✅ " + DEFS.length + " recettes Afrique de l'Ouest (ré)insérées à 6-8 étapes (FR + EN).");
