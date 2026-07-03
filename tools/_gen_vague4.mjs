// Vague 4 : 52 plats (dédup clé + nom + Levenshtein vérifiée). 1598 -> 1650 recettes.
// 6 à 8 étapes. Idempotent. FR + EN nom/description. node tools/_gen_vague4.mjs
import fs from "fs";
const DATE = "2026-07-03T12:00:00";
const base = 4;

const D = (key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes) =>
  ({ key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes });

const DEFS = [
  // ===== CARAÏBES =====
  D("currygoat","Curry Goat","Curry Goat","🍛","plats","jamaique","2h","⭐⭐ Moyen",
    "Curry jamaïcain de chèvre mijotée longuement avec curcuma, thym et piment scotch bonnet. Le plat de fête incontournable de l'île.",
    "A Jamaican curried goat, slow-simmered with turmeric, thyme and scotch bonnet chilli. The island's essential celebration dish.",
    [["chevre",180,"g"],["curry",4,"g"],["oignon",50,"g"],["piment",4,"g"],["pommedeterre",100,"g"]],
    [["🥩","Mariner","Mariner la chèvre en morceaux avec curry, thym et ail plusieurs heures."],["🍳","Saisir","Saisir la viande marinée dans l'huile bien chaude."],["🧅","Aromates","Ajouter oignon, piment scotch bonnet entier et gingembre."],["💧","Mouiller","Couvrir d'eau, porter à frémissement."],["♨️","Mijoter","Laisser mijoter à couvert très longtemps jusqu'à viande fondante."],["🥔","Pommes de terre","Ajouter les pommes de terre en fin de cuisson."],["🧂","Ajuster","Ajuster sel et piment selon le goût."],["🍚","Servir","Servir avec du riz et des haricots rouges."]]),

  D("pelautrinite","Pelau","Pelau","🍚","plats","trinite","1h","⭐⭐ Moyen",
    "Riz trinidadien au poulet, pois d'Angole et lait de coco, caramélisé au sucre brun avant mijotage. Le plat national, tout-en-un et réconfortant.",
    "Trinidadian rice with chicken, pigeon peas and coconut milk, browned in caramelized sugar before simmering. The all-in-one national dish.",
    [["poulet",150,"g"],["riz",90,"g"],["pois",50,"g"],["laitcoco",70,"ml"],["sucrebrun",10,"g"]],
    [["🍯","Caraméliser","Faire fondre le sucre brun dans l'huile jusqu'à caramel foncé."],["🍗","Saisir","Ajouter le poulet et bien l'enrober du caramel."],["🧅","Aromates","Ajouter oignon, ail et piment, faire revenir."],["🫘","Pois","Ajouter les pois d'Angole (ou pois cassés)."],["🍚","Riz","Ajouter le riz, bien mélanger pour l'enrober."],["🥥","Mouiller","Verser le lait de coco et un peu d'eau."],["♨️","Cuire","Cuire à couvert jusqu'à absorption complète du liquide."],["🍽️","Servir","Aérer à la fourchette et servir chaud."]]),

  D("coucoubarbade","Cou-Cou","Cou-Cou","🌽","plats","barbade","40 min","⭐⭐ Moyen",
    "Purée barbadienne de farine de maïs et gombos, lisse et filante, plat national servi traditionnellement avec du poisson en sauce.",
    "A Barbadian cornmeal and okra mash, smooth and stringy, the national dish traditionally served with fish in a light sauce.",
    [["farineMais",100,"g"],["gombo",120,"g"],["beurre",20,"g"],["poisson",150,"g"],["oignon",40,"g"]],
    [["🥬","Gombos","Cuire les gombos tranchés dans l'eau jusqu'à tendres."],["💧","Bouillir","Réserver l'eau de cuisson des gombos."],["🌽","Verser","Verser la farine de maïs en pluie dans cette eau en fouettant."],["🥄","Travailler","Travailler énergiquement à la cuillère en bois jusqu'à masse lisse."],["🧈","Beurrer","Incorporer une bonne noisette de beurre."],["🐟","Poisson","Pocher le poisson dans une sauce tomate-oignon légère."],["🍽️","Dresser","Façonner le cou-cou en dôme lisse dans l'assiette."],["🐟","Servir","Napper de sauce et poisson, servir chaud."]]),

  D("ragoutpouletbelize","Ragoût de Poulet Bélizien","Belizean Stew Chicken","🍗","plats","belize","1h30","⭐⭐ Moyen",
    "Poulet bélizien mariné puis mijoté dans une sauce recado rouge (achiote), sucrée-épicée. Le plat du dimanche accompagné de riz et haricots rouges.",
    "Belizean chicken marinated then simmered in a red recado (achiote) sauce, sweet and spiced. The Sunday dish served with rice and red beans.",
    [["poulet",180,"g"],["paprika",4,"g"],["oignon",50,"g"],["tomate",60,"g"],["riz",80,"g"]],
    [["🍗","Mariner","Mariner le poulet avec paprika, ail et jus d'orange amère (ou citron)."],["🍳","Saisir","Saisir les morceaux de poulet mariné à la poêle."],["🧅","Base","Faire revenir oignon et poivron dans le même fond."],["🍅","Sauce","Ajouter la tomate concassée et un peu d'eau."],["♨️","Mijoter","Remettre le poulet, couvrir et mijoter jusqu'à tendre."],["🍚","Riz","Cuire le riz nature en accompagnement."],["🫘","Haricots","Réchauffer des haricots rouges en accompagnement."],["🍽️","Servir","Servir le poulet et sa sauce avec riz et haricots."]]),

  D("bouillondawara","Bouillon d'Awara","Awara Broth","🍲","soupes","guyane","2h","⭐⭐⭐ Difficile",
    "Soupe traditionnelle guyanaise à base de pulpe de palmier awara, riche et onctueuse, mijotée avec viandes fumées et poissons salés. Plat rituel de Pâques.",
    "A traditional Guianese soup made from awara palm pulp, rich and velvety, simmered with smoked meats and salted fish. A ritual Easter dish.",
    [["huilePalme",30,"ml"],["porc",120,"g"],["poisson",100,"g"],["choufleur",100,"g"],["oignon",50,"g"]],
    [["🌴","Base","Préparer une base épaisse à l'huile de palme rouge, couleur et goût caractéristiques."],["🥩","Viandes","Faire revenir les viandes fumées et salées à dessaler."],["💧","Mouiller","Couvrir d'eau et porter à frémissement longuement."],["🐟","Poisson","Ajouter le poisson salé dessalé."],["🥦","Légumes","Ajouter chou et légumes racines coupés."],["♨️","Mijoter","Laisser mijoter à petit feu plusieurs heures."],["🧂","Ajuster","Ajuster l'assaisonnement, le bouillon doit être riche."],["🍽️","Servir","Servir bien chaud en bol profond."]]),

  // ===== PACIFIQUE / OCÉANIE =====
  D("kokodafidji","Kokoda","Kokoda","🐟","entrees","fidji","30 min","⭐ Facile",
    "Ceviche fidjien de poisson cru mariné au citron vert puis lié au lait de coco, avec tomate, oignon rouge et piment. Frais et vif.",
    "A Fijian ceviche of raw fish marinated in lime then folded into coconut milk, with tomato, red onion and chilli. Fresh and vibrant.",
    [["poisson",180,"g"],["citronvert",40,"ml"],["laitcoco",60,"ml"],["tomate",50,"g"],["oignonrouge",30,"g"]],
    [["🐟","Découper","Découper le poisson cru très frais en petits dés."],["🍋","Mariner","Mariner dans le jus de citron vert jusqu'à ce que la chair blanchisse."],["🧅","Légumes","Couper tomate, oignon rouge et piment en petits dés."],["🥥","Lier","Égoutter le poisson et lier avec le lait de coco."],["🥗","Mélanger","Incorporer les légumes délicatement."],["🧂","Assaisonner","Saler et ajouter un trait de citron vert frais."],["❄️","Réfrigérer","Laisser reposer au frais 15 minutes."],["🍽️","Servir","Servir bien frais, dans des coupelles ou coquilles."]]),

  D("palusami","Palusami","Palusami","🥬","plats","samoa","1h","⭐⭐ Moyen",
    "Feuilles de taro samoanes farcies de crème de coco, oignon et parfois corned-beef, cuites en petits paquets vapeur. Le plat traditionnel des grandes occasions.",
    "Samoan taro leaves stuffed with coconut cream, onion and sometimes corned beef, steamed in little parcels. The traditional dish for special occasions.",
    [["epinard",200,"g"],["cremeCoco",100,"ml"],["oignon",50,"g"],["boeufHache",80,"g"],["sel",2,"g"]],
    [["🥬","Feuilles","Blanchir rapidement les grandes feuilles vertes (taro ou épinard)."],["🥩","Farce","Mélanger viande, oignon émincé et un peu de crème de coco."],["📦","Envelopper","Répartir la farce et envelopper en petits paquets serrés."],["🥥","Napper","Napper chaque paquet de crème de coco épaisse."],["🌯","Ficeler","Envelopper dans une feuille supplémentaire pour maintenir."],["💨","Vapeur","Cuire à la vapeur longuement jusqu'à fondant."],["🔍","Vérifier","Vérifier que les feuilles sont bien tendres à cœur."],["🍽️","Servir","Servir chaud, à déguster à la cuillère."]]),

  D("hangi","Hangi","Hangi","🍖","plats","nouvellezelande","3h","⭐⭐ Moyen",
    "Agneau, poulet et légumes racines néo-zélandais traditionnellement cuits à l'étouffée sur pierres chaudes enterrées. Ici adapté au four, tout aussi fondant et fumé.",
    "New Zealand lamb, chicken and root vegetables traditionally slow-cooked over buried hot stones. Adapted here to the oven, just as tender and smoky.",
    [["agneau",150,"g"],["poulet",100,"g"],["pommedeterre",100,"g"],["patatedouce",80,"g"],["chou",80,"g"]],
    [["🥩","Préparer","Couper l'agneau et le poulet en gros morceaux."],["🥔","Légumes","Couper pomme de terre, patate douce et chou en gros morceaux."],["📦","Couches","Disposer en couches dans un grand plat couvert, viande puis légumes."],["🧂","Assaisonner","Saler généreusement et arroser d'un peu d'eau."],["🔥","Sceller","Couvrir hermétiquement de papier alu pour un effet étouffée."],["🔥","Cuire","Cuire au four très bas très longtemps, sans ouvrir."],["🔍","Vérifier","Vérifier la tendreté de la viande avant de servir."],["🍽️","Servir","Servir directement dans le plat, viandes et légumes fondants."]]),

  D("lamingtons","Lamingtons","Lamingtons","🍰","desserts","australie","1h","⭐⭐ Moyen",
    "Petits carrés australiens de génoise moelleuse, trempés dans un glaçage au chocolat puis roulés dans la noix de coco râpée. Le goûter national.",
    "Australian squares of soft sponge cake, dipped in chocolate icing then rolled in desiccated coconut. The national teatime treat.",
    [["farine",120,"g"],["oeuf",100,"g"],["sucre",90,"g"],["chocolat",80,"g"],["noixCoco",100,"g"]],
    [["🥣","Génoise","Préparer une génoise légère et la cuire en carré."],["❄️","Refroidir","Laisser complètement refroidir puis découper en cubes."],["🍫","Glaçage","Préparer un glaçage fluide au chocolat et un peu de lait."],["🎯","Tremper","Tremper chaque cube de génoise dans le glaçage au chocolat."],["🥥","Rouler","Rouler immédiatement dans la noix de coco râpée."],["📦","Poser","Poser sur une grille pour laisser figer."],["⏳","Reposer","Laisser reposer 30 minutes avant de servir."],["🍽️","Servir","Servir à température ambiante, au goûter."]]),

  D("otaika","Ota Ika","Ota Ika","🐟","entrees","tonga","25 min","⭐ Facile",
    "Salade tongienne de poisson cru mariné au citron, lié au lait de coco avec concombre et tomate. Cousin polynésien du poisson cru tahitien.",
    "A Tongan salad of raw fish marinated in lime, folded into coconut milk with cucumber and tomato. The Polynesian cousin of Tahitian raw fish.",
    [["poisson",180,"g"],["citron",40,"ml"],["laitcoco",60,"ml"],["concombre",50,"g"],["tomate",40,"g"]],
    [["🐟","Découper","Découper le poisson cru très frais en petits dés."],["🍋","Mariner","Mariner généreusement dans le jus de citron 15 minutes."],["🥒","Légumes","Couper concombre et tomate en petits dés."],["🥥","Lier","Égoutter le poisson et lier avec le lait de coco."],["🥗","Mélanger","Incorporer les légumes délicatement."],["🧂","Assaisonner","Saler et poivrer légèrement."],["❄️","Réfrigérer","Réserver au frais avant de servir."],["🍽️","Servir","Servir bien frais en entrée."]]),

  D("laplap","Lap Lap","Lap Lap","🍲","plats","vanuatu","1h30","⭐⭐ Moyen",
    "Plat national vanuatais de racines (manioc, igname) râpées, cuites en pudding épais nappé de lait de coco, parfois garni de viande.",
    "Vanuatu's national dish of grated root vegetables (cassava, yam), baked into a thick pudding topped with coconut milk, sometimes with meat.",
    [["manioc",200,"g"],["igname",100,"g"],["laitcoco",100,"ml"],["poulet",100,"g"],["epinard",60,"g"]],
    [["🥔","Râper","Râper finement le manioc et l'igname crus."],["🥥","Lier","Mélanger avec une partie du lait de coco pour une pâte épaisse."],["🍃","Foncer","Foncer un plat de feuilles vertes (ou papier cuisson)."],["📦","Étaler","Étaler la pâte de racines râpées uniformément."],["🍗","Garnir","Ajouter des morceaux de poulet par-dessus."],["🥥","Napper","Napper généreusement du reste de lait de coco."],["🔥","Cuire","Cuire au four longuement jusqu'à pris et doré."],["🍽️","Servir","Découper en parts et servir chaud."]]),

  D("mumu","Mumu","Mumu","🍖","plats","papouasie","2h30","⭐⭐ Moyen",
    "Festin papou-néo-guinéen de porc et légumes traditionnellement cuit à l'étouffée sur pierres chauffées enterrées. Ici adapté au four, viande fondante et fumée.",
    "A Papua New Guinean feast of pork and vegetables traditionally cooked over buried heated stones. Adapted here to the oven, tender and smoky.",
    [["porc",180,"g"],["patatedouce",100,"g"],["chou",80,"g"],["epinard",60,"g"],["laitcoco",50,"ml"]],
    [["🥩","Préparer","Couper le porc en gros morceaux."],["🍠","Légumes","Couper patate douce et chou en gros morceaux."],["📦","Couches","Disposer en couches, viande puis légumes, dans un grand plat couvert."],["🥥","Napper","Arroser d'un peu de lait de coco."],["🧂","Assaisonner","Saler généreusement."],["🔥","Sceller","Couvrir hermétiquement pour un effet étouffée."],["🔥","Cuire","Cuire au four très bas très longtemps."],["🍽️","Servir","Servir directement, viande fondante et légumes parfumés."]]),

  // ===== ASIE CENTRALE / CAUCASE =====
  D("kuurdak","Kuurdak","Kuurdak","🍖","plats","kirghizistan","1h","⭐⭐ Moyen",
    "Sauté kirghize de viande et abats frits avec oignons et pommes de terre, plat copieux traditionnellement préparé pour les invités.",
    "A Kyrgyz stir-fry of fried meat and offal with onions and potatoes, a hearty dish traditionally prepared for guests.",
    [["agneau",180,"g"],["pommedeterre",120,"g"],["oignon",60,"g"],["ail",6,"g"],["cumin",2,"g"]],
    [["🥩","Découper","Découper l'agneau en petits morceaux."],["🍳","Saisir","Faire revenir la viande à feu vif dans sa propre graisse."],["🧅","Oignons","Ajouter les oignons émincés, cuire jusqu'à dorés."],["🥔","Pommes de terre","Ajouter les pommes de terre coupées en gros dés."],["♨️","Cuire","Couvrir et cuire à feu moyen jusqu'à tendre."],["🧄","Parfumer","Ajouter ail et cumin en fin de cuisson."],["🧂","Assaisonner","Saler et poivrer généreusement."],["🍽️","Servir","Servir chaud, accompagné de pain plat."]]),

  D("qurutob","Qurutob","Qurutob","🥗","plats","tadjikistan","30 min","⭐ Facile",
    "Plat national tadjik de pain plat émietté imbibé de yaourt fermenté, garni de tomate, oignon et herbes fraîches. Se mange à la main, en partage.",
    "Tajikistan's national dish of flatbread crumbled and soaked in fermented yogurt, topped with tomato, onion and fresh herbs. Eaten by hand, shared.",
    [["pain",150,"g"],["yaourt",200,"g"],["tomate",80,"g"],["oignonrouge",40,"g"],["coriandre",5,"g"]],
    [["🍞","Émietter","Émietter grossièrement le pain plat rassis dans un grand plat."],["🥣","Délayer","Délayer le yaourt avec un peu d'eau pour une texture fluide."],["💧","Imbiber","Verser le yaourt sur le pain émietté, bien imbiber."],["🍅","Légumes","Couper tomate et oignon rouge en fines lamelles."],["🥗","Garnir","Disposer les légumes sur le pain imbibé."],["🌿","Herbes","Parsemer généreusement de coriandre et aneth frais."],["🫒","Finir","Arroser d'un filet d'huile."],["🍽️","Servir","Servir aussitôt, à manger avec les doigts."]]),

  D("gutap","Gutap","Gutap","🥟","aperitifs","turkmenistan","1h","⭐⭐ Moyen",
    "Chaussons turkmènes de pâte fine frits, farcis de courge ou d'herbes vertes, dorés et croustillants. Le street-food turkmène par excellence.",
    "Turkmen thin-pastry pockets, fried, filled with pumpkin or green herbs, golden and crisp. Turkmenistan's essential street food.",
    [["farine",100,"g"],["courge",150,"g"],["oignon",40,"g"],["beurre",20,"g"],["huilefriture",30,"ml"]],
    [["🥣","Pâte","Pétrir une pâte fine à l'eau, laisser reposer."],["🎃","Farce","Râper finement la courge, mélanger avec oignon émincé."],["⚪","Abaisser","Étaler la pâte très finement, découper des cercles."],["🥄","Garnir","Garnir chaque cercle de farce de courge."],["🤏","Plier","Plier en demi-lune et bien sceller les bords."],["🔥","Frire","Frire dans l'huile chaude jusqu'à doré des deux côtés."],["🧈","Beurrer","Badigeonner de beurre fondu à la sortie de la poêle."],["🍽️","Servir","Servir chaud avec une sauce yaourt-ail."]]),

  D("dovga","Dovga","Dovga","🍲","soupes","azerbaidjan","45 min","⭐⭐ Moyen",
    "Soupe azerbaïdjanaise froide ou tiède au yaourt et au riz, parfumée d'un bouquet d'herbes fraîches (aneth, coriandre, épinard). Rafraîchissante et originale.",
    "An Azerbaijani cold or warm soup of yogurt and rice, fragrant with a bouquet of fresh herbs (dill, cilantro, spinach). Refreshing and unique.",
    [["yaourt",300,"g"],["riz",40,"g"],["epinard",80,"g"],["coriandre",8,"g"],["oeuf",25,"g"]],
    [["🥣","Base","Fouetter le yaourt avec un œuf et un peu d'eau."],["🍚","Riz","Ajouter le riz cru rincé."],["🔥","Chauffer","Chauffer très doucement en remuant sans cesse pour ne pas trancher."],["♨️","Cuire","Laisser cuire à feu doux jusqu'à riz tendre."],["🥬","Verdure","Ajouter épinards émincés et herbes fraîches hachées."],["♨️","Mijoter","Laisser mijoter encore 5 minutes."],["❄️","Refroidir","Laisser tiédir ou refroidir selon la saison."],["🍽️","Servir","Servir en soupe, tiède ou fraîche."]]),

  // ===== AFRIQUE =====
  D("tigadeguena","Tiga Dègue Na","Tiga Dègue Na","🥜","plats","mali","1h","⭐⭐ Moyen",
    "Ragoût malien de viande et légumes dans une riche sauce d'arachide, servi sur riz. Un des plats les plus populaires du Mali.",
    "A Malian meat and vegetable stew in a rich peanut sauce, served over rice. One of Mali's most popular dishes.",
    [["boeuf",150,"g"],["cacahuetes",60,"g"],["tomate",70,"g"],["oignon",50,"g"],["riz",90,"g"]],
    [["🥩","Saisir","Saisir le bœuf en morceaux dans l'huile chaude."],["🧅","Aromates","Ajouter oignon et ail, faire revenir."],["🥜","Pâte","Délayer la pâte d'arachide (cacahuètes mixées) dans un peu d'eau chaude."],["🍅","Sauce","Ajouter la tomate concassée et la pâte d'arachide."],["💧","Mouiller","Mouiller à hauteur, bien mélanger."],["♨️","Mijoter","Laisser mijoter à couvert jusqu'à sauce onctueuse et viande tendre."],["🍚","Riz","Cuire le riz en accompagnement."],["🍽️","Servir","Servir le ragoût sur le riz chaud."]]),

  D("matoke","Matoke","Matoke","🍌","plats","ouganda","1h","⭐ Facile",
    "Plantain vert ougandais cuit vapeur puis écrasé, servi en purée avec une sauce tomate-arachide. L'aliment de base quotidien du pays.",
    "Ugandan green plantain steamed then mashed, served with a tomato-groundnut sauce. The country's everyday staple food.",
    [["plantain",250,"g"],["tomate",60,"g"],["cacahuetes",30,"g"],["oignon",40,"g"],["huile",15,"ml"]],
    [["🍌","Éplucher","Éplucher les plantains verts."],["🍃","Envelopper","Envelopper dans des feuilles (ou papier cuisson)."],["💨","Vapeur","Cuire à la vapeur longuement jusqu'à très tendre."],["🥄","Écraser","Écraser grossièrement en purée grumeleuse."],["🍅","Sauce","Préparer une sauce tomate-oignon avec un peu de pâte d'arachide."],["♨️","Mijoter","Laisser mijoter la sauce jusqu'à onctueuse."],["🍽️","Dresser","Dresser la purée de plantain en dôme."],["🍅","Servir","Napper de sauce et servir chaud."]]),

  D("frangozambezia","Frango à Zambeziana","Frango à Zambeziana","🍗","plats","mozambique","1h","⭐⭐ Moyen",
    "Poulet mozambicain grillé mariné à l'ail, au citron et au piri-piri, badigeonné de sauce coco pimentée. Héritage portugais et africain mêlés.",
    "Mozambican grilled chicken marinated in garlic, lemon and piri-piri, basted with a spicy coconut sauce. Portuguese and African heritage combined.",
    [["poulet",200,"g"],["citron",30,"ml"],["ail",8,"g"],["piment",5,"g"],["laitcoco",50,"ml"]],
    [["🍗","Mariner","Mariner le poulet avec ail écrasé, citron et piment plusieurs heures."],["🔥","Braise","Préparer une belle braise ou un four très chaud."],["🔥","Griller","Griller le poulet en le retournant régulièrement."],["🌶️","Sauce","Préparer une sauce piri-piri au lait de coco et piment."],["🖌️","Badigeonner","Badigeonner le poulet de sauce à mi-cuisson."],["🔥","Finir","Terminer la cuisson jusqu'à peau bien dorée."],["🍋","Arroser","Arroser d'un filet de citron frais."],["🍽️","Servir","Servir chaud avec le reste de sauce à part."]]),

  D("nshima","Nshima","Nshima","🌽","plats","zambie","30 min","⭐ Facile",
    "Polenta zambienne ferme de farine de maïs, pilée et travaillée jusqu'à une pâte dense, servie avec un relish de légumes verts. La base de chaque repas zambien.",
    "A firm Zambian cornmeal polenta, beaten and worked into a dense dough, served with a leafy green relish. The base of every Zambian meal.",
    [["farineMais",120,"g"],["epinard",150,"g"],["oignon",40,"g"],["tomate",40,"g"],["huile",10,"ml"]],
    [["💧","Bouillir","Porter de l'eau salée à ébullition."],["🌽","Verser","Verser la farine de maïs en pluie en fouettant."],["🥄","Travailler","Travailler énergiquement à la cuillère jusqu'à masse dense."],["🍚","Former","Façonner en boule lisse et compacte."],["🥬","Relish","Faire revenir oignon et tomate, ajouter les épinards."],["♨️","Mijoter","Laisser mijoter le relish jusqu'à fondant."],["🧂","Assaisonner","Saler et poivrer le relish."],["🍽️","Servir","Servir le nshima avec le relish de légumes verts."]]),

  D("sadza","Sadza","Sadza","🌽","plats","zimbabwe","30 min","⭐ Facile",
    "Polenta zimbabwéenne de farine de maïs, ferme et lisse, accompagnée de légumes verts sautés (muriwo) et parfois de viande grillée.",
    "A Zimbabwean cornmeal polenta, firm and smooth, served with sautéed leafy greens (muriwo) and sometimes grilled meat.",
    [["farineMais",120,"g"],["chou",150,"g"],["oignon",40,"g"],["cacahuetes",20,"g"],["huile",10,"ml"]],
    [["💧","Bouillir","Porter de l'eau salée à ébullition."],["🌽","Verser","Verser la farine de maïs en pluie en fouettant."],["🥄","Travailler","Travailler énergiquement jusqu'à masse dense et lisse."],["🍚","Former","Façonner en boule compacte."],["🥬","Légumes","Faire sauter le chou émincé avec l'oignon."],["🥜","Parfumer","Ajouter un peu de pâte d'arachide au chou."],["🧂","Assaisonner","Saler et poivrer."],["🍽️","Servir","Servir le sadza avec les légumes sautés."]]),

  D("kapana","Kapana","Kapana","🍖","plats","namibie","40 min","⭐ Facile",
    "Viande de bœuf namibienne grillée sur braise, tranchée finement et servie avec un mélange épicé de sel, piment et tomate. Le street-food emblématique des marchés.",
    "Namibian beef grilled over open coals, thinly sliced and served with a spiced salt-chilli-tomato mix. The emblematic street food of open markets.",
    [["boeuf",200,"g"],["piment",4,"g"],["tomate",50,"g"],["oignon",40,"g"],["sel",3,"g"]],
    [["🥩","Découper","Découper le bœuf en fines lanières."],["🔥","Braise","Préparer une belle braise vive."],["🔥","Griller","Griller rapidement les lanières de bœuf, en les tournant."],["🧂","Mélange","Préparer un mélange sel-piment moulu grossièrement."],["🍅","Salade","Couper tomate et oignon en petits dés pour l'accompagnement."],["🔪","Trancher","Trancher la viande grillée en petits morceaux."],["🌶️","Assaisonner","Rouler la viande dans le mélange sel-piment."],["🍽️","Servir","Servir immédiatement avec la salade de tomate."]]),

  D("seswaa","Seswaa","Seswaa","🥩","plats","botswana","2h30","⭐ Facile",
    "Bœuf botswanais mijoté à l'eau salée jusqu'à fondant puis pilé à la main en filaments. Le plat de fête traditionnel du pays.",
    "Botswanan beef simmered in salted water until falling apart, then hand-pounded into fine shreds. The country's traditional celebration dish.",
    [["boeuf",250,"g"],["oignon",50,"g"],["sel",4,"g"],["pommedeterre",100,"g"],["chou",80,"g"]],
    [["🥩","Placer","Placer le bœuf en gros morceaux dans une grande marmite."],["🧅","Aromates","Ajouter oignon entier et sel généreusement."],["💧","Couvrir","Couvrir d'eau à hauteur."],["♨️","Mijoter","Laisser mijoter très longtemps à couvert jusqu'à extrêmement tendre."],["🥄","Piler","Égoutter et piler la viande à la fourchette ou au pilon jusqu'à effilochée."],["🍲","Réduire","Remettre un peu de jus de cuisson pour humidifier."],["🥔","Accompagner","Cuire pommes de terre et chou en accompagnement."],["🍽️","Servir","Servir le bœuf effiloché avec les légumes."]]),

  D("bariisiskukaris","Bariis Iskukaris","Bariis Iskukaris","🍚","plats","somalie","1h","⭐⭐ Moyen",
    "Riz somalien parfumé au mélange d'épices xawaash, agrémenté de raisins secs et de viande. Le riz de fête servi lors des grandes occasions.",
    "Somali rice fragrant with xawaash spice blend, studded with raisins and meat. The festive rice served on special occasions.",
    [["riz",100,"g"],["agneau",130,"g"],["raisinsSecs",20,"g"],["cumin",2,"g"],["cannelle",1,"g"]],
    [["🥩","Saisir","Saisir l'agneau en morceaux avec les épices (cumin, cannelle, cardamome)."],["🧅","Aromates","Ajouter oignon et ail, faire revenir."],["🍚","Riz","Nacrer le riz dans le mélange épicé."],["💧","Mouiller","Mouiller à hauteur de bouillon."],["🍇","Raisins","Ajouter les raisins secs."],["♨️","Cuire","Cuire à couvert jusqu'à absorption complète."],["🍴","Aérer","Aérer délicatement à la fourchette."],["🍽️","Servir","Servir chaud, en plat de fête."]]),

  D("isombe","Isombe","Isombe","🍲","plats","rwanda","1h15","⭐⭐ Moyen",
    "Feuilles de manioc pilées rwandaises mijotées à l'huile de palme avec aubergine et pâte d'arachide. Plat vert fondant du quotidien rwandais.",
    "Rwandan pounded cassava leaves simmered in palm oil with eggplant and peanut paste. A soft green dish from everyday Rwandan cooking.",
    [["epinard",180,"g"],["aubergine",80,"g"],["cacahuetes",30,"g"],["huilePalme",20,"ml"],["oignon",40,"g"]],
    [["🥬","Piler","Piler finement les feuilles vertes (manioc ou épinard)."],["🍆","Légumes","Couper l'aubergine en petits dés."],["🍳","Base","Faire revenir oignon et ail à l'huile de palme."],["🥬","Réunir","Ajouter les feuilles pilées et l'aubergine."],["🥜","Parfumer","Ajouter la pâte d'arachide délayée."],["♨️","Mijoter","Laisser mijoter longuement à couvert."],["🧂","Assaisonner","Saler et ajuster."],["🍽️","Servir","Servir avec riz ou banane plantain."]]),

  D("rizgrasburkina","Riz Gras Burkinabè","Burkinabè Riz Gras","🍚","plats","burkinafaso","1h","⭐ Facile",
    "Riz burkinabè cuit dans un bouillon de viande et tomate concentrée, riche et coloré. Le plat de rue le plus populaire de Ouagadougou.",
    "Burkinabè rice cooked in a meat and tomato-paste broth, rich and richly coloured. The most popular street dish in Ouagadougou.",
    [["riz",100,"g"],["boeuf",120,"g"],["tomate",80,"g"],["oignon",50,"g"],["huile",20,"ml"]],
    [["🥩","Saisir","Saisir le bœuf en morceaux dans l'huile chaude."],["🧅","Aromates","Ajouter oignon et ail, faire revenir."],["🍅","Sauce","Ajouter tomate concassée et un peu de concentré."],["💧","Mouiller","Mouiller d'eau, laisser mijoter la viande jusqu'à tendre."],["🍚","Riz","Ajouter le riz dans ce bouillon coloré."],["♨️","Cuire","Cuire à couvert jusqu'à absorption complète."],["🥕","Légumes","Ajouter quelques légumes (carotte, chou) en accompagnement."],["🍽️","Servir","Servir chaud, généreusement coloré."]]),

  D("amiwo","Amiwo","Amiwo","🌽","plats","benin","45 min","⭐⭐ Moyen",
    "Pâte béninoise de farine de maïs à la sauce tomate pimentée, servie avec du poisson grillé ou frit. Le plat de fête coloré du sud Bénin.",
    "Beninese cornmeal paste in a spicy tomato sauce, served with grilled or fried fish. The colourful festive dish of southern Benin.",
    [["farineMais",100,"g"],["tomate",100,"g"],["poisson",150,"g"],["piment",4,"g"],["oignon",50,"g"]],
    [["🍅","Sauce","Mixer tomate, oignon et piment en sauce épaisse."],["🍳","Cuire","Faire revenir cette sauce à l'huile jusqu'à réduite."],["💧","Bouillir","Porter de l'eau à ébullition avec un peu de cette sauce."],["🌽","Verser","Verser la farine de maïs en pluie en fouettant."],["🥄","Travailler","Travailler jusqu'à pâte lisse et rouge orangé."],["🐟","Poisson","Frire ou griller le poisson séparément."],["🍽️","Dresser","Dresser la pâte en dôme."],["🐟","Servir","Servir avec le poisson et le reste de sauce."]]),

  D("muambadegalinha","Muamba de Galinha","Muamba de Galinha","🍗","plats","angola","1h15","⭐⭐ Moyen",
    "Ragoût angolais de poulet à l'huile de palme rouge, gombo et piment, mijoté longuement. Le plat national, riche et parfumé.",
    "An Angolan chicken stew in red palm oil with okra and chilli, slow-simmered. The rich, fragrant national dish.",
    [["poulet",180,"g"],["huilePalme",30,"ml"],["gombo",80,"g"],["ail",6,"g"],["piment",4,"g"]],
    [["🍗","Saisir","Saisir les morceaux de poulet à l'huile de palme rouge."],["🧅","Aromates","Ajouter oignon, ail et piment."],["💧","Mouiller","Mouiller d'un peu d'eau, porter à frémissement."],["♨️","Mijoter","Laisser mijoter à couvert jusqu'à poulet tendre."],["🥒","Gombo","Ajouter les gombos coupés en fin de cuisson."],["♨️","Épaissir","Laisser réduire jusqu'à sauce onctueuse."],["🧂","Ajuster","Ajuster sel et piment."],["🍚","Servir","Servir avec du riz ou du foufou."]]),

  D("superkanja","Superkanja","Superkanja","🍲","soupes","gambie","1h","⭐⭐ Moyen",
    "Sauce gambienne de gombo et poisson fumé à l'huile de palme, épaisse et filante. Un classique de la cuisine ouest-africaine servi sur riz.",
    "A Gambian smoked fish and okra sauce in palm oil, thick and stringy. A West African classic served over rice.",
    [["gombo",150,"g"],["poisson",120,"g"],["huilePalme",25,"ml"],["oignon",50,"g"],["riz",90,"g"]],
    [["🐟","Préparer","Effeuiller le poisson fumé en morceaux."],["🍳","Base","Faire revenir oignon et ail à l'huile de palme."],["🥒","Gombo","Ajouter les gombos finement tranchés."],["💧","Mouiller","Mouiller d'un peu d'eau."],["♨️","Mijoter","Laisser mijoter jusqu'à texture filante caractéristique."],["🐟","Poisson","Incorporer le poisson fumé effeuillé."],["🌶️","Relever","Ajouter piment selon le goût."],["🍚","Servir","Servir sur un lit de riz blanc."]]),

  // ===== EUROPE (petites nations) =====
  D("struklji","Štruklji","Štruklji","🥟","desserts","slovenie","1h15","⭐⭐ Moyen",
    "Roulé slovène de pâte fine garnie de fromage frais, cuit à la vapeur puis parfois gratiné au four. Le dessert (ou plat) national aux mille variantes.",
    "A Slovenian rolled pastry filled with fresh cheese, steamed then sometimes baked. The national dessert (or dish) with countless variations.",
    [["farine",120,"g"],["fromage",150,"g"],["oeuf",50,"g"],["beurre",30,"g"],["chapelure",20,"g"]],
    [["🥣","Pâte","Pétrir une pâte souple à l'œuf, laisser reposer."],["🧀","Farce","Mélanger le fromage frais avec œuf et une pincée de sel."],["⚪","Abaisser","Étaler la pâte très finement en grand rectangle."],["🥄","Garnir","Étaler la farce de fromage sur toute la surface."],["🌯","Rouler","Rouler serré en boudin, envelopper dans un linge."],["💨","Vapeur","Cuire à la vapeur (ou pocher) jusqu'à ferme."],["🔪","Trancher","Découper en tranches épaisses."],["🧈","Servir","Servir nappé de beurre fondu et chapelure dorée."]]),

  D("bosanskilonac","Bosanski Lonac","Bosanski Lonac","🍲","plats","bosnie","3h","⭐ Facile",
    "Pot-au-feu bosnien de bœuf et légumes variés, mijoté très lentement en couches sans être remué. Le plat familial du dimanche.",
    "A Bosnian one-pot beef and mixed vegetable stew, slow-simmered in layers without stirring. The family's Sunday dish.",
    [["boeuf",200,"g"],["chou",80,"g"],["carotte",60,"g"],["pommedeterre",100,"g"],["oignon",50,"g"]],
    [["🥩","Couper","Couper le bœuf en gros morceaux."],["🥕","Légumes","Couper chou, carotte, pomme de terre et oignon en gros morceaux."],["📦","Couches","Alterner couches de viande et de légumes dans une cocotte en terre."],["🧂","Assaisonner","Saler et poivrer entre chaque couche."],["💧","Mouiller","Ajouter un peu d'eau, sans remuer."],["🔥","Sceller","Couvrir hermétiquement."],["♨️","Mijoter","Cuire à feu très doux plusieurs heures, sans jamais remuer."],["🍽️","Servir","Servir directement dans le plat de cuisson."]]),

  D("tavcegravce","Tavče Gravče","Tavče Gravče","🫘","plats","macedoinedunord","1h30","⭐ Facile",
    "Haricots macédoniens mijotés puis gratinés au four avec paprika fumé et oignon caramélisé. Le plat national, simple et réconfortant.",
    "Macedonian beans simmered then oven-baked with smoked paprika and caramelized onion. The simple, comforting national dish.",
    [["haricots",180,"g"],["oignon",60,"g"],["paprika",4,"g"],["tomate",50,"g"],["huile",20,"ml"]],
    [["🫘","Tremper","Faire tremper les haricots une nuit, puis précuire à l'eau."],["🧅","Caraméliser","Faire revenir longuement l'oignon jusqu'à bien doré."],["🌶️","Parfumer","Ajouter le paprika fumé hors du feu pour ne pas brûler."],["🍅","Sauce","Ajouter la tomate concassée."],["🫘","Réunir","Mélanger les haricots égouttés avec cette sauce."],["📦","Verser","Verser dans un plat à gratin."],["🔥","Cuire","Cuire au four jusqu'à croûte dorée en surface."],["🍽️","Servir","Servir chaud, directement du plat."]]),

  D("juddmatgaardebounen","Judd mat Gaardebounen","Judd mat Gaardebounen","🥓","plats","luxembourg","2h","⭐⭐ Moyen",
    "Collier de porc fumé luxembourgeois mijoté puis servi avec des fèves des marais en sauce crémeuse. Le plat national accompagné de pommes de terre.",
    "Luxembourgish smoked pork collar simmered then served with broad beans in a creamy sauce. The national dish, served with potatoes.",
    [["porc",200,"g"],["feves",150,"g"],["oignon",50,"g"],["creme",50,"ml"],["pommedeterre",120,"g"]],
    [["🥩","Dessaler","Faire tremper le porc fumé pour le dessaler si besoin."],["💧","Pocher","Pocher le porc à l'eau frémissante longuement."],["🫘","Fèves","Cuire les fèves à l'eau, puis les peler."],["🧅","Sauce","Faire un roux avec oignon, farine et un peu de bouillon."],["🥛","Lier","Ajouter la crème pour une sauce onctueuse."],["🫘","Réunir","Incorporer les fèves à la sauce."],["🥔","Accompagner","Cuire des pommes de terre vapeur."],["🍽️","Servir","Trancher le porc, servir avec fèves en sauce et pommes de terre."]]),

  D("flija","Flija","Flija","🥞","desserts","kosovo","2h","⭐⭐⭐ Difficile",
    "Gâteau kosovar en couches de crêpes fines superposées et badigeonnées de crème, cuit lentement sous une cloche. Plat de fête traditionnel.",
    "A Kosovar cake of thin layered crêpes brushed with cream, slow-cooked under a dome. A traditional festive dish.",
    [["farine",150,"g"],["lait",200,"ml"],["oeuf",100,"g"],["creme",80,"ml"],["beurre",30,"g"]],
    [["🥣","Pâte","Préparer une pâte à crêpe fine et fluide."],["🍳","Première couche","Cuire une première fine couche dans un plat rond beurré."],["🥛","Badigeonner","Badigeonner de crème avant chaque nouvelle couche."],["🔄","Répéter","Répéter l'opération couche par couche, en cuisant sous couvercle."],["🔥","Cuire","Cuire chaque couche à couvert pour un effet vapeur-four."],["📚","Empiler","Continuer jusqu'à obtenir un gâteau bien épais et feuilleté."],["⏳","Reposer","Laisser reposer avant de découper."],["🍽️","Servir","Découper en parts et servir tiède."]]),

  D("zeama","Zeamă","Zeamă","🍲","soupes","moldavie","1h30","⭐ Facile",
    "Soupe moldave acidulée de poulet et légumes, relevée au jus de citron ou de betterave fermentée (bors). Le remède réconfortant du pays.",
    "A tangy Moldovan chicken and vegetable soup, sharpened with lemon or fermented beet juice (bors). The country's comforting remedy.",
    [["poulet",150,"g"],["carotte",60,"g"],["pommedeterre",80,"g"],["citron",20,"ml"],["oeuf",50,"g"]],
    [["🍗","Bouillon","Cuire le poulet à l'eau pour un bouillon clair, écumer."],["🥕","Légumes","Ajouter carotte, céleri et pomme de terre coupés."],["♨️","Mijoter","Laisser mijoter jusqu'à poulet et légumes tendres."],["🍋","Acidifier","Ajouter du jus de citron pour l'acidité caractéristique."],["🥚","Lier","Battre un œuf avec un peu de bouillon chaud puis incorporer."],["🌿","Herbes","Ajouter de l'aneth et du persil frais."],["🧂","Ajuster","Ajuster sel et acidité selon le goût."],["🍽️","Servir","Servir chaud avec de la crème aigre à part."]]),

  D("mulgikapsad","Mulgikapsad","Mulgikapsad","🥬","plats","estonie","2h","⭐ Facile",
    "Choucroute estonienne mijotée avec du porc fumé et des grains d'orge, plat d'hiver copieux et réconfortant du sud du pays.",
    "Estonian sauerkraut simmered with smoked pork and barley grains, a hearty winter dish from the south of the country.",
    [["choucroute",250,"g"],["porc",150,"g"],["orge",50,"g"],["oignon",50,"g"],["laurier",1,"g"]],
    [["🥩","Saisir","Saisir le porc fumé en morceaux."],["🧅","Aromates","Ajouter l'oignon émincé, faire revenir."],["🥬","Choucroute","Ajouter la choucroute égouttée."],["🌾","Orge","Ajouter l'orge rincée et une feuille de laurier."],["💧","Mouiller","Mouiller à hauteur d'eau."],["♨️","Mijoter","Laisser mijoter à couvert longuement à feu doux."],["🔍","Vérifier","Vérifier que l'orge et le porc sont bien tendres."],["🍽️","Servir","Servir chaud, en plat unique consistant."]]),

  D("cepelinai","Cepelinai","Cepelinai","🥔","plats","lituanie","1h30","⭐⭐ Moyen",
    "Grosses quenelles lituaniennes de pomme de terre râpée farcies de viande, pochées puis nappées de sauce à la crème et lardons.",
    "Large Lithuanian dumplings of grated potato stuffed with meat, poached then topped with a bacon-cream sauce.",
    [["pommedeterre",300,"g"],["boeufHache",100,"g"],["oignon",40,"g"],["lardons",50,"g"],["creme",60,"ml"]],
    [["🥔","Râper","Râper finement une partie des pommes de terre crues, presser le jus."],["🥔","Cuire","Cuire l'autre partie à l'eau et réduire en purée."],["🥣","Mélanger","Mélanger râpé et purée pour une pâte homogène."],["🥩","Farce","Mélanger viande hachée et oignon émincé."],["🤏","Façonner","Façonner des boules de pâte, creuser et garnir de farce, refermer en quenelle."],["💧","Pocher","Pocher délicatement à l'eau frémissante 30-40 minutes."],["🥓","Sauce","Faire revenir les lardons et lier à la crème."],["🍽️","Servir","Servir les quenelles nappées de sauce lardons-crème."]]),

  // ===== MOYEN-ORIENT / ASIE =====
  D("saltah","Saltah","Saltah","🍲","plats","yemen","1h15","⭐⭐ Moyen",
    "Ragoût yéménite de viande épicée surmonté d'une mousse de fenugrec battu, servi bouillonnant dans un plat en pierre. Le plat national du Yémen.",
    "A Yemeni spiced meat stew topped with whipped fenugreek foam, served bubbling hot in a stone pot. Yemen's national dish.",
    [["agneau",150,"g"],["fenugrec",10,"g"],["tomate",60,"g"],["piment",4,"g"],["pommedeterre",80,"g"]],
    [["🥩","Mijoter","Mijoter l'agneau en morceaux avec épices et tomate jusqu'à tendre."],["🥔","Légumes","Ajouter pomme de terre en dés, cuire jusqu'à tendre."],["🌱","Tremper","Faire tremper les graines de fenugrec plusieurs heures."],["🥣","Battre","Battre le fenugrec trempé en mousse blanche épaisse."],["🌶️","Sauce","Préparer une sauce piquante (zhoug) à part."],["🔥","Chauffer","Verser le ragoût brûlant dans un plat en terre très chaud."],["🥣","Napper","Napper de la mousse de fenugrec sur le dessus."],["🍽️","Servir","Servir immédiatement, bouillonnant, avec pain plat."]]),

  D("alharees","Al Harees","Al Harees","🌾","plats","emiratsarabesunis","2h30","⭐⭐ Moyen",
    "Bouillie émiratie de blé et poulet longuement mijotée jusqu'à consistance crémeuse et lisse, parfumée au beurre. Plat de fête et du Ramadan.",
    "An Emirati wheat and chicken porridge slow-cooked until smooth and creamy, finished with butter. A festive and Ramadan dish.",
    [["orge",150,"g"],["poulet",180,"g"],["beurre",30,"g"],["cannelle",1,"g"],["sel",3,"g"]],
    [["🌾","Tremper","Faire tremper le blé (ou orge concassée) plusieurs heures."],["🍗","Cuire","Cuire le poulet à l'eau jusqu'à très tendre, réserver le bouillon."],["🌾","Mijoter","Cuire le blé trempé dans ce bouillon longuement."],["🥄","Effilocher","Effilocher le poulet cuit et l'incorporer."],["♨️","Battre","Battre énergiquement au fouet en cuisant jusqu'à texture lisse et crémeuse."],["🧈","Beurrer","Incorporer une généreuse noisette de beurre."],["🧂","Assaisonner","Saler et ajouter une pointe de cannelle."],["🍽️","Servir","Servir chaud, arrosé d'un filet de beurre fondu."]]),

  D("kabulipulao","Kabuli Pulao","Kabuli Pulao","🍚","plats","afghanistan","2h","⭐⭐ Moyen",
    "Riz afghan parfumé à l'agneau, surmonté de carottes confites et raisins secs caramélisés. Le plat national servi lors des grandes occasions.",
    "Afghan rice fragrant with lamb, topped with candied carrots and caramelized raisins. The national dish served on special occasions.",
    [["agneau",180,"g"],["riz",100,"g"],["carotte",80,"g"],["raisinsSecs",30,"g"],["cardamome",1,"g"]],
    [["🥩","Mijoter","Mijoter l'agneau en morceaux avec oignon jusqu'à tendre, réserver le bouillon."],["🍚","Riz","Précuire le riz basmati dans ce bouillon parfumé."],["🥕","Carottes","Tailler les carottes en fins bâtonnets."],["🍯","Confire","Faire revenir les carottes avec un peu de sucre jusqu'à caramélisées."],["🍇","Raisins","Ajouter les raisins secs, caraméliser légèrement ensemble."],["📦","Monter","Disposer l'agneau et le riz en couches dans la marmite."],["💨","Cuire","Cuire à l'étouffée à feu doux jusqu'à parfaitement parfumé."],["🍽️","Servir","Dresser le riz, couronner de carottes et raisins confits."]]),

  D("karahi","Karahi","Karahi","🍛","plats","pakistan","45 min","⭐⭐ Moyen",
    "Curry pakistanais de poulet ou mouton, saisi et mijoté rapidement dans un wok avec tomate, gingembre et piment vert. Servi bouillonnant dans son wok.",
    "A Pakistani chicken or mutton curry, seared and quickly simmered in a wok with tomato, ginger and green chilli. Served bubbling in its wok.",
    [["poulet",200,"g"],["tomate",100,"g"],["gingembre",10,"g"],["piment",5,"g"],["yaourt",40,"g"]],
    [["🍗","Saisir","Saisir le poulet en morceaux à feu très vif dans le wok (karahi)."],["🧄","Aromates","Ajouter ail et gingembre écrasés."],["🍅","Tomate","Ajouter la tomate fraîche coupée en quartiers."],["🌶️","Piment","Ajouter piments verts entiers fendus."],["♨️","Mijoter","Laisser mijoter à feu vif jusqu'à sauce réduite et épaisse."],["🥛","Lier","Incorporer une cuillère de yaourt pour lier."],["🌿","Finir","Parsemer de gingembre émincé et coriandre fraîche."],["🍽️","Servir","Servir directement dans le wok avec du pain naan."]]),

  D("ambuyat","Ambuyat","Ambuyat","🍲","plats","brunei","30 min","⭐⭐ Moyen",
    "Plat national brunéien de fécule de sagou (ici tapioca) formant une pâte gluante et translucide, trempée dans une sauce acidulée à l'aide de baguettes spéciales.",
    "Brunei's national dish of sago starch (here tapioca) forming a glutinous, translucent paste, dipped into a tangy sauce with special chopsticks.",
    [["tapioca",120,"g"],["citronvert",20,"ml"],["sauce",30,"ml"],["piment",3,"g"],["ail",4,"g"]],
    [["💧","Bouillir","Porter de l'eau à ébullition."],["🌾","Verser","Verser la fécule de tapioca en pluie en remuant vivement."],["🥄","Travailler","Travailler énergiquement jusqu'à masse translucide et gluante."],["🍋","Sauce","Préparer une sauce acidulée au tamarin, citron vert et piment."],["🧄","Parfumer","Ajouter ail et un peu de sauce de poisson à la sauce."],["🥢","Enrouler","Enrouler un peu de pâte autour de baguettes spéciales (ou fourchette)."],["🫗","Tremper","Tremper généreusement dans la sauce acidulée."],["🍽️","Servir","Déguster aussitôt, accompagné de légumes et poisson grillé."]]),

  D("batardaan","Batar Da'an","Batar Da'an","🌽","plats","timororiental","1h","⭐ Facile",
    "Ragoût est-timorais de maïs, haricots et courge mijotés ensemble, plat végétal simple et complet du quotidien.",
    "An East Timorese stew of corn, beans and squash simmered together, a simple and complete everyday plant-based dish.",
    [["mais",120,"g"],["haricots",100,"g"],["courge",100,"g"],["oignon",40,"g"],["huile",15,"ml"]],
    [["🌽","Préparer","Égrener le maïs frais (ou utiliser du maïs en grains)."],["🫘","Tremper","Si besoin, précuire les haricots."],["🍳","Base","Faire revenir l'oignon dans l'huile."],["🎃","Courge","Ajouter la courge coupée en dés."],["🌽","Réunir","Ajouter maïs et haricots précuits."],["💧","Mouiller","Mouiller à hauteur d'eau."],["♨️","Mijoter","Laisser mijoter jusqu'à tous les légumes tendres."],["🍽️","Servir","Servir chaud, en plat unique."]]),

  D("emadatshi","Ema Datshi","Ema Datshi","🌶️","plats","bhoutan","30 min","⭐ Facile",
    "Plat national bhoutanais de piments verts mijotés dans une sauce au fromage fondu. Extrêmement piquant, servi à chaque repas.",
    "Bhutan's national dish of green chillies simmered in a melted cheese sauce. Extremely spicy, eaten at nearly every meal.",
    [["piment",150,"g"],["fromage",120,"g"],["tomate",50,"g"],["oignon",40,"g"],["ail",4,"g"]],
    [["🌶️","Préparer","Couper les piments verts en larges morceaux (garder les graines pour le piquant)."],["🧅","Base","Faire revenir oignon et ail légèrement."],["🌶️","Réunir","Ajouter les piments et un peu d'eau."],["♨️","Mijoter","Laisser mijoter jusqu'à piments tendres."],["🧀","Fromage","Ajouter le fromage émietté ou en tranches."],["♨️","Fondre","Laisser fondre doucement en remuant jusqu'à sauce crémeuse."],["🍅","Finir","Ajouter la tomate en fin de cuisson."],["🍚","Servir","Servir très chaud avec du riz rouge."]]),

  D("ladob","Ladob","Ladob","🍌","desserts","seychelles","30 min","⭐ Facile",
    "Dessert seychellois de banane (ou patate douce) mijotée dans du lait de coco sucré et parfumé à la vanille et à la muscade. Simple et réconfortant.",
    "A Seychellois dessert of banana (or sweet potato) simmered in sweetened coconut milk, scented with vanilla and nutmeg. Simple and comforting.",
    [["banane",200,"g"],["laitcoco",120,"ml"],["sucre",20,"g"],["vanille",1,"g"],["muscade",0.5,"g"]],
    [["🍌","Préparer","Éplucher les bananes (ou patates douces) et les couper en tronçons."],["🥥","Mijoter","Mettre à cuire doucement dans le lait de coco."],["🍯","Sucrer","Ajouter le sucre et bien mélanger."],["🌿","Parfumer","Ajouter la vanille et une pincée de muscade râpée."],["♨️","Cuire","Laisser mijoter à feu doux jusqu'à fondant."],["🥄","Épaissir","Laisser réduire jusqu'à sauce onctueuse napante."],["❄️","Reposer","Laisser tiédir légèrement."],["🍽️","Servir","Servir tiède, en dessert ou en accompagnement sucré."]]),

  // ===== AMÉRIQUE LATINE =====
  D("encebollado","Encebollado","Encebollado","🐟","soupes","equateur","1h","⭐⭐ Moyen",
    "Soupe équatorienne de thon et yuca dans un bouillon citronné, généreusement couverte d'oignons rouges marinés. Le remède national contre la gueule de bois.",
    "An Ecuadorian tuna and cassava soup in a lime-spiked broth, generously topped with pickled red onions. The national hangover cure.",
    [["poisson",180,"g"],["manioc",150,"g"],["oignonrouge",60,"g"],["citronvert",30,"ml"],["tomate",50,"g"]],
    [["🐟","Bouillon","Cuire le poisson dans un bouillon avec oignon et cumin."],["🥔","Yuca","Cuire le manioc à part jusqu'à tendre."],["🐟","Effeuiller","Effeuiller le poisson cuit en morceaux."],["🍅","Sauce","Ajouter tomate et un peu de bouillon coloré au poisson."],["🧅","Mariner","Mariner l'oignon rouge émincé dans le citron vert."],["🥔","Réunir","Ajouter le manioc au bouillon de poisson."],["♨️","Mijoter","Laisser mijoter quelques minutes ensemble."],["🍽️","Servir","Servir couvert d'oignons marinés et de coriandre fraîche."]]),

  D("pepian","Pepián","Pepián","🍛","plats","guatemala","1h30","⭐⭐ Moyen",
    "Ragoût guatémaltèque de poulet dans une sauce épaisse de graines de courge et sésame grillées, tomate et piment. Le plat national, riche et complexe.",
    "A Guatemalan chicken stew in a thick sauce of toasted pumpkin and sesame seeds, tomato and chilli. The rich, complex national dish.",
    [["poulet",200,"g"],["grainesCourge",40,"g"],["sesame",15,"g"],["tomate",80,"g"],["piment",4,"g"]],
    [["🍗","Cuire","Cuire le poulet à l'eau jusqu'à tendre, réserver le bouillon."],["🎃","Griller","Griller à sec les graines de courge et de sésame jusqu'à dorées."],["🥣","Mixer","Mixer ces graines grillées avec tomate et piment en pâte."],["🍳","Cuire","Faire revenir cette pâte à l'huile quelques minutes."],["💧","Diluer","Diluer avec le bouillon de poulet jusqu'à consistance de sauce épaisse."],["🍗","Réunir","Ajouter le poulet cuit à la sauce."],["♨️","Mijoter","Laisser mijoter pour bien lier les saveurs."],["🍽️","Servir","Servir avec du riz et des tortillas."]]),

  D("vigoron","Vigorón","Vigorón","🥗","plats","nicaragua","1h","⭐⭐ Moyen",
    "Assiette nicaraguayenne de yuca bouillie, couenne de porc frite croustillante et salade de chou vinaigrée. Servi traditionnellement sur une feuille de bananier.",
    "A Nicaraguan plate of boiled yuca, crispy fried pork rind and vinegared cabbage slaw. Traditionally served on a banana leaf.",
    [["manioc",200,"g"],["lardons",100,"g"],["chou",100,"g"],["tomate",50,"g"],["vinaigre",15,"ml"]],
    [["🥔","Yuca","Éplucher et cuire le manioc à l'eau jusqu'à tendre."],["🥓","Frire","Frire les lardons (ou couenne de porc) jusqu'à bien croustillants."],["🥬","Salade","Émincer finement le chou."],["🍅","Assaisonner","Mélanger le chou avec tomate en dés et vinaigre."],["🧂","Reposer","Laisser reposer la salade quelques minutes pour qu'elle macère."],["🍃","Dresser","Dresser le manioc chaud sur une feuille (ou assiette)."],["🥓","Garnir","Ajouter les lardons croustillants par-dessus."],["🥗","Servir","Couronner de salade de chou vinaigrée et servir."]]),

  D("carimanolas","Carimañolas","Carimañolas","🥟","aperitifs","panama","1h","⭐⭐ Moyen",
    "Croquettes panaméennes de yuca façonnées en torpille, farcies de viande hachée épicée et frites jusqu'à bien dorées. Le en-cas de rue emblématique.",
    "Panamanian yuca croquettes shaped like torpedoes, filled with spiced ground meat and fried until golden. The emblematic street snack.",
    [["manioc",200,"g"],["boeufHache",100,"g"],["oignon",40,"g"],["oeuf",25,"g"],["huilefriture",30,"ml"]],
    [["🥔","Yuca","Cuire le manioc à l'eau jusqu'à très tendre."],["🥄","Écraser","Écraser en purée lisse encore chaude."],["🥩","Farce","Faire revenir viande hachée, oignon et épices."],["✋","Façonner","Façonner la purée de manioc en boule, creuser au centre."],["🥄","Garnir","Garnir de farce et refermer en forme de torpille."],["🥚","Passer","Passer chaque croquette dans l'œuf battu."],["🔥","Frire","Frire dans l'huile chaude jusqu'à doré et croustillant."],["🍽️","Servir","Servir chaud avec une sauce piquante."]]),

  // ===== AFRIQUE (suite) =====
  D("daraba","Daraba","Daraba","🍲","plats","tchad","1h","⭐⭐ Moyen",
    "Sauce tchadienne de gombo et aubergine pilés, mijotée avec pâte d'arachide et viande séchée. Plat vert épais du Sahel tchadien.",
    "A Chadian sauce of pounded okra and eggplant, simmered with peanut paste and dried meat. A thick green dish from the Chadian Sahel.",
    [["gombo",120,"g"],["aubergine",100,"g"],["cacahuetes",40,"g"],["boeuf",100,"g"],["huile",20,"ml"]],
    [["🍆","Piler","Piler ensemble gombo et aubergine cuits jusqu'à purée grossière."],["🥩","Saisir","Saisir la viande séchée (ou fraîche) réhydratée."],["🧅","Aromates","Ajouter oignon et ail."],["🥜","Parfumer","Ajouter la pâte d'arachide délayée."],["🍆","Réunir","Incorporer la purée de gombo-aubergine."],["💧","Mouiller","Mouiller légèrement, bien mélanger."],["♨️","Mijoter","Laisser mijoter jusqu'à sauce homogène et épaisse."],["🍽️","Servir","Servir sur boule de mil ou riz."]]),

  D("chambogrille","Chambo Grillé","Grilled Chambo","🐟","plats","malawi","30 min","⭐ Facile",
    "Tilapia malawite du lac Malawi grillé entier, mariné au citron et épices, servi avec un chutney de tomate. Le poisson emblématique du pays.",
    "Malawian tilapia from Lake Malawi grilled whole, marinated in lemon and spices, served with a tomato chutney. The country's emblematic fish.",
    [["poisson",250,"g"],["citron",30,"ml"],["tomate",60,"g"],["oignon",40,"g"],["piment",3,"g"]],
    [["🐟","Préparer","Vider et écailler le poisson entier, inciser la peau."],["🍋","Mariner","Mariner au citron, ail et épices 30 minutes."],["🔥","Braise","Préparer une belle braise."],["🔥","Griller","Griller le poisson entier des deux côtés jusqu'à doré."],["🍅","Chutney","Préparer un chutney de tomate, oignon et piment."],["♨️","Mijoter","Laisser mijoter le chutney jusqu'à épaissi."],["🔍","Vérifier","Vérifier que le poisson est cuit à cœur."],["🍽️","Servir","Servir le poisson grillé avec le chutney et du riz."]]),

  // ===== CARAÏBES (complément) =====
  D("cachupa","Cachupa","Cachupa","🌽","plats","caboverde","2h30","⭐⭐ Moyen",
    "Ragoût cap-verdien de maïs et haricots mijotés très longuement avec viande et patate douce. Le plat national, mijoté depuis des générations.",
    "A Cape Verdean corn and bean stew, slow-simmered for hours with meat and sweet potato. The national dish, cooked for generations.",
    [["mais",150,"g"],["haricots",120,"g"],["porc",120,"g"],["patatedouce",100,"g"],["chou",80,"g"]],
    [["🌽","Tremper","Faire tremper maïs et haricots secs une nuit."],["🥩","Saisir","Saisir la viande de porc en morceaux."],["🧅","Aromates","Ajouter oignon et ail."],["💧","Mouiller","Couvrir d'eau largement."],["♨️","Mijoter","Laisser mijoter très longuement à feu doux."],["🍠","Légumes","Ajouter patate douce et chou à mi-cuisson."],["🌽","Réunir","Ajouter maïs et haricots précuits."],["🍽️","Servir","Laisser réduire jusqu'à consistance de ragoût épais et servir."]]),
];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function rows(ing) {
  const out = [];
  for (let nb = 1; nb <= 15; nb++) {
    const parts = ing.map(([k, per, u]) => `${k}: "${Math.round(per * nb * 100) / 100} ${u}"`);
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
console.log("✅ " + DEFS.length + " recettes (vague 4) insérées (FR 6-8 étapes + EN nom/description).");
