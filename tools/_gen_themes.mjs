// Vague C « Thèmes transverses » : 40 recettes (street food + desserts/glaces du monde + Asie).
// 6 à 8 étapes. Idempotent. FR + EN nom/description. node tools/_gen_themes.mjs
import fs from "fs";
const DATE = "2026-06-29T14:00:00";
const base = 4;

const D = (key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes) =>
  ({ key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes });

const DEFS = [
  // ===== CHINE =====
  D("wontonsoupe","Soupe Wonton","Wonton Soup","🥟","soupes","chine","45 min","⭐⭐ Moyen",
    "Bouillon clair garni de raviolis chinois fondants au porc et aux crevettes. Réconfortant, parfumé au gingembre et à la ciboule.",
    "A clear broth filled with tender pork-and-shrimp Chinese dumplings. Comforting, scented with ginger and spring onion.",
    [["farine",50,"g"],["porc",70,"g"],["crevettes",20,"g"],["gingembre",5,"g"],["oignon",20,"g"]],
    [["🥩","Farce","Hacher porc et crevettes, mélanger avec gingembre, soja et ciboule."],["⚪","Plier","Garnir des carrés de pâte et les plier en wontons."],["🍲","Bouillon","Préparer un bouillon de volaille parfumé au gingembre."],["💧","Pocher","Pocher les wontons jusqu'à ce qu'ils remontent."],["🌿","Assaisonner","Ajouter soja, huile de sésame et ciboule."],["🥣","Dresser","Répartir les wontons dans les bols."],["🍜","Servir","Verser le bouillon brûlant et servir aussitôt."]]),
  D("scallionpancake","Galette à la Ciboule","Scallion Pancake","🧅","aperitifs","chine","40 min","⭐⭐ Moyen",
    "Galette chinoise feuilletée à l'huile et à la ciboule, croustillante et dorée à la poêle. Le snack de rue par excellence.",
    "A Chinese flaky pan-bread layered with oil and spring onion, crisp and golden. The quintessential street snack.",
    [["farine",80,"g"],["huile",15,"ml"],["oignon",30,"g"],["oeuf",10,"g"]],
    [["🥣","Pâte","Pétrir une pâte à l'eau chaude, laisser reposer."],["🌀","Huiler","Étaler finement, badigeonner d'huile et parsemer de ciboule."],["🌯","Rouler","Rouler en boudin puis en escargot, aplatir."],["🔥","Chauffer","Chauffer une poêle huilée."],["🥞","Cuire","Dorer la galette des deux côtés jusqu'à feuilletée."],["✂️","Couper","Couper en quartiers."],["🍽️","Servir","Servir avec une sauce soja-vinaigre."]]),
  D("dandanmian","Dan Dan Mian","Dan Dan Noodles","🍜","plats","chine","35 min","⭐⭐ Moyen",
    "Nouilles du Sichuan dans une sauce piquante au sésame et à la cacahuète, avec porc croustillant. Engourdissant et addictif.",
    "Sichuan noodles in a spicy sesame-and-peanut sauce with crispy pork. Numbing and addictive.",
    [["nouillesoeuf",90,"g"],["porc",70,"g"],["arachide",15,"g"],["piment",4,"g"],["saucesoja",10,"ml"]],
    [["🥩","Porc","Faire sauter le porc haché jusqu'à croustillant."],["🌶️","Sauce","Mélanger pâte de sésame, soja, huile de piment et vinaigre."],["🥜","Cacahuète","Concasser les cacahuètes."],["🍜","Nouilles","Cuire les nouilles al dente."],["🥣","Monter","Verser la sauce au fond du bol."],["🍜","Dresser","Ajouter les nouilles et le porc."],["🌿","Servir","Parsemer de cacahuètes et de ciboule, mélanger avant de manger."]]),
  D("siomai","Siomai","Siomai (Pork Shumai)","🥟","aperitifs","chine","45 min","⭐⭐ Moyen",
    "Bouchées vapeur ouvertes au porc et aux crevettes, juteuses et parfumées. Le dim sum incontournable, à tremper dans la sauce soja.",
    "Open steamed pork-and-shrimp bites, juicy and fragrant. The essential dim sum, dipped in soy sauce.",
    [["porc",80,"g"],["crevettes",30,"g"],["farine",30,"g"],["gingembre",4,"g"],["oignon",20,"g"]],
    [["🥩","Farce","Hacher porc et crevettes, lier avec gingembre, soja et fécule."],["⚪","Garnir","Déposer la farce dans des carrés de pâte fine."],["🤏","Former","Resserrer en laissant le dessus ouvert."],["🥕","Décorer","Couronner d'un peu de carotte râpée."],["💨","Vapeur","Cuire à la vapeur 12-15 min."],[" 🥢","Sauce","Préparer une sauce soja-calamansi-piment."],["🍽️","Servir","Servir chaud avec la sauce à tremper."]]),
  D("eggtart","Egg Tart","Hong Kong Egg Tart","🥧","desserts","chine","50 min","⭐⭐ Moyen",
    "Tartelette feuilletée garnie d'un flan aux œufs doré et tremblotant. La douceur des salons de thé de Hong Kong.",
    "A flaky tartlet filled with a golden, wobbly egg custard. The sweet of Hong Kong tea houses.",
    [["pateFeuilletee",40,"g"],["oeuf",50,"g"],["lait",50,"ml"],["sucre",25,"g"]],
    [["🥧","Foncer","Foncer des moules à tartelette de pâte feuilletée."],["🍮","Appareil","Mélanger œufs, lait, sucre et eau chaude."],["🥣","Filtrer","Passer l'appareil au tamis pour la finesse."],["🫗","Remplir","Verser dans les fonds aux trois quarts."],["🔥","Cuire","Cuire à 200 °C puis baisser, jusqu'à flan juste pris."],["👀","Surveiller","Le flan doit trembloter, sans bouillonner."],["🍽️","Servir","Servir tiède, la pâte bien croustillante."]]),

  // ===== CORÉE =====
  D("bingsu","Bingsu","Bingsu (Shaved Ice)","🍧","glaces","coree","20 min","⭐ Facile",
    "Montagne de glace pilée au lait, nappée de haricots rouges sucrés, de fruits et de lait concentré. Le dessert glacé coréen ultra-rafraîchissant.",
    "A mountain of milk-shaved ice topped with sweet red beans, fruit and condensed milk. The ultra-refreshing Korean iced dessert.",
    [["lait",120,"ml"],["sucre",25,"g"],["haricotsrouges",40,"g"],["farineRiz",10,"g"]],
    [["🧊","Glace","Congeler du lait sucré, puis le râper en neige fine."],["🫘","Haricots","Cuire les haricots rouges avec du sucre (pat)."],["🍡","Mochi","Préparer de petits dés de mochi à la farine de riz."],["🥣","Monter","Empiler la glace pilée en dôme dans un bol."],["🫘","Garnir","Couronner de haricots rouges, fruits et mochi."],["🥛","Napper","Arroser de lait concentré."],["🍽️","Servir","Servir aussitôt, à partager."]]),

  // ===== INDE =====
  D("masaladosa","Masala Dosa","Masala Dosa","🥞","plats","inde","1h","⭐⭐⭐ Difficile",
    "Grande crêpe de riz et lentilles fermentées, croustillante, roulée autour d'une purée de pommes de terre épicée. L'icône du Sud de l'Inde.",
    "A large fermented rice-and-lentil crêpe, crisp, rolled around a spiced potato mash. The icon of South India.",
    [["farineRiz",60,"g"],["lentilles",30,"g"],["pommedeterre",100,"g"],["oignon",30,"g"],["curcuma",1,"g"]],
    [["🌾","Pâte","Mixer riz et lentilles trempés, laisser fermenter une nuit."],["🥔","Masala","Cuire pommes de terre, oignon, curcuma et graines de moutarde."],["🔥","Plaque","Chauffer une plaque huilée."],["🥞","Étaler","Verser la pâte et l'étaler très finement en spirale."],["✨","Croustiller","Cuire jusqu'à doré croustillant."],["🥔","Garnir","Déposer le masala de pommes de terre."],["🌯","Rouler","Replier la dosa sur la garniture."],["🍽️","Servir","Servir avec chutney de coco et sambar."]]),
  D("panipuri","Pani Puri","Pani Puri","💧","aperitifs","inde","45 min","⭐⭐ Moyen",
    "Petites sphères creuses croustillantes remplies de pommes de terre, pois chiches et d'une eau épicée à la menthe. L'explosion de saveurs de la rue indienne.",
    "Crisp hollow spheres filled with potato, chickpeas and a spiced mint water. The flavour explosion of Indian streets.",
    [["farine",40,"g"],["poischiches",30,"g"],["pommedeterre",60,"g"],["coriandre",5,"g"],["citronvert",5,"ml"]],
    [["⚪","Puri","Frire de petites boules de semoule jusqu'à creuses et croustillantes."],["🥔","Garniture","Mélanger pommes de terre, pois chiches et épices."],["🌿","Pani","Mixer menthe, coriandre, tamarin et eau glacée."],["🌶️","Relever","Assaisonner l'eau de cumin, piment et sel noir."],["🕳️","Percer","Percer un trou au sommet de chaque puri."],["🥄","Remplir","Garnir de pommes de terre puis d'eau épicée."],["🍽️","Servir","Manger aussitôt, d'une bouchée !"]]),
  D("pakora","Pakora","Pakora","🧅","aperitifs","inde","30 min","⭐ Facile",
    "Beignets de légumes enrobés d'une pâte épicée à la farine de pois chiche, frits croustillants. L'en-cas de la mousson, parfait avec un chai.",
    "Vegetable fritters coated in a spiced chickpea-flour batter, fried crisp. The monsoon snack, perfect with chai.",
    [["farinepoischiche",50,"g"],["oignon",60,"g"],["pommedeterre",40,"g"],["piment",3,"g"],["huilefriture",20,"ml"]],
    [["🥣","Pâte","Mélanger farine de pois chiche, épices et eau en pâte épaisse."],["🌶️","Épices","Ajouter curcuma, cumin, piment et coriandre."],["🔪","Légumes","Émincer oignon, pomme de terre et épinard."],["🥄","Enrober","Enrober les légumes de pâte."],["🔥","Chauffer","Chauffer l'huile à 180 °C."],["🍳","Frire","Frire en petits tas jusqu'à doré croustillant."],["🍽️","Servir","Servir avec un chutney à la menthe."]]),
  D("poha","Poha","Poha","🍚","brunch","inde","25 min","⭐ Facile",
    "Riz aplati sauté au curcuma, oignon, cacahuètes et citron vert. Le petit-déjeuner léger et parfumé du centre de l'Inde.",
    "Flattened rice sautéed with turmeric, onion, peanuts and lime. The light, fragrant breakfast of central India.",
    [["riz",80,"g"],["oignon",40,"g"],["arachide",15,"g"],["curcuma",1,"g"],["citronvert",5,"ml"]],
    [["💧","Rincer","Rincer le riz aplati (poha) et l'égoutter, il gonfle."],["🥜","Cacahuètes","Faire dorer les cacahuètes, réserver."],["🌿","Tempérer","Faire éclater graines de moutarde et curry dans l'huile."],["🧅","Oignon","Ajouter oignon, piment vert et curcuma."],["🍚","Poha","Incorporer le poha et réchauffer doucement."],["🍋","Aciduler","Ajouter citron vert, cacahuètes et coriandre."],["🍽️","Servir","Servir tiède au petit-déjeuner."]]),
  D("alooparatha","Aloo Paratha","Aloo Paratha","🫓","brunch","inde","45 min","⭐⭐ Moyen",
    "Galette de blé farcie d'une purée de pommes de terre épicée, dorée au ghee. Le petit-déjeuner roi du Pendjab, servi avec yaourt et pickles.",
    "A wheat flatbread stuffed with spiced potato mash, browned in ghee. Punjab's king breakfast, served with yogurt and pickles.",
    [["farine",70,"g"],["pommedeterre",80,"g"],["oignon",20,"g"],["coriandre",4,"g"],["beurre",10,"g"]],
    [["🥣","Pâte","Pétrir une pâte de blé souple, laisser reposer."],["🥔","Farce","Écraser les pommes de terre avec épices, oignon et coriandre."],["⚪","Garnir","Envelopper la farce dans une boule de pâte."],["🫓","Étaler","Étaler délicatement sans faire sortir la farce."],["🔥","Cuire","Cuire sur une plaque chaude, badigeonner de ghee."],["✨","Dorer","Dorer des deux côtés jusqu'à taches brunes."],["🍽️","Servir","Servir avec yaourt, beurre et pickles."]]),
  D("biryani","Biryani","Biryani","🍚","plats","inde","1h15","⭐⭐⭐ Difficile",
    "Riz basmati parfumé cuit en couches avec un poulet mariné au yaourt et aux épices, safran et oignons frits. Le plat de fête indien par excellence.",
    "Fragrant basmati rice layered with yogurt-and-spice-marinated chicken, saffron and fried onions. The ultimate Indian celebration dish.",
    [["riz",90,"g"],["poulet",130,"g"],["yaourt",40,"g"],["oignon",50,"g"],["curcuma",2,"g"]],
    [["🍗","Mariner","Mariner le poulet dans yaourt, gingembre-ail et épices."],["🧅","Oignons","Frire des oignons jusqu'à brun doré (birista)."],["🍚","Riz","Précuire le riz basmati avec cardamome et laurier (70 %)."],["🌼","Safran","Infuser le safran dans du lait chaud."],["🥘","Monter","Alterner poulet et riz en couches, parsemer d'oignons frits."],["💨","Dum","Couvrir hermétiquement et cuire à l'étouffée 25 min."],["🍴","Aérer","Aérer délicatement à la fourchette."],["🍽️","Servir","Servir avec un raïta au concombre."]]),
  D("chanamasala","Chana Masala","Chana Masala","🫘","plats","inde","45 min","⭐ Facile",
    "Curry de pois chiches mijotés dans une sauce tomate aux épices grillées. Végétarien, économique et profondément parfumé.",
    "Chickpeas simmered in a spiced toasted-tomato sauce. Vegetarian, cheap and deeply fragrant.",
    [["poischiches",100,"g"],["tomate",70,"g"],["oignon",40,"g"],["gingembre",5,"g"],["curcuma",2,"g"]],
    [["🧅","Base","Faire revenir oignon, ail et gingembre."],["🌶️","Épices","Ajouter cumin, coriandre, curcuma et garam masala."],["🍅","Tomate","Incorporer la tomate, cuire jusqu'à masala épais."],["🫘","Pois chiches","Ajouter les pois chiches et un peu d'eau."],["⏲️","Mijoter","Mijoter 20 min pour les imprégner."],["🍋","Finir","Ajouter amchoor (ou citron) et coriandre."],["🍽️","Servir","Servir avec du riz ou du naan."]]),

  // ===== THAÏLANDE =====
  D("padkrapow","Pad Krapow","Pad Krapow (Thai Basil Chicken)","🌶️","plats","thailande","25 min","⭐ Facile",
    "Poulet émincé sauté au basilic thaï, ail et piment, servi sur du riz avec un œuf au plat croustillant. Le déjeuner-minute roi de Bangkok.",
    "Minced chicken stir-fried with Thai basil, garlic and chilli, served over rice with a crispy fried egg. Bangkok's king of quick lunches.",
    [["poulet",130,"g"],["piment",4,"g"],["ail",6,"g"],["saucesoja",10,"ml"],["oignon",30,"g"]],
    [["🔪","Préparer","Hacher ail et piment au mortier."],["🔥","Wok","Faire chauffer le wok très fort avec de l'huile."],["🧄","Saisir","Faire sauter ail et piment quelques secondes."],["🍗","Poulet","Ajouter le poulet émincé et saisir vivement."],["🥫","Sauce","Assaisonner de sauce soja, sauce huître et un peu de sucre."],["🌿","Basilic","Jeter une grosse poignée de basilic thaï hors du feu."],["🍳","Œuf","Cuire un œuf au plat à l'huile, bords croustillants."],["🍽️","Servir","Servir sur du riz, l'œuf par-dessus."]]),

  // ===== MALAISIE =====
  D("murtabak","Murtabak","Murtabak","🫓","plats","malaisie","45 min","⭐⭐ Moyen",
    "Crêpe fine farcie de viande hachée épicée et d'œuf, pliée et grillée croustillante. Le street-food costaud des marchés nocturnes malais.",
    "A thin pancake stuffed with spiced minced meat and egg, folded and griddled crisp. The hearty street food of Malay night markets.",
    [["farine",70,"g"],["boeufHache",80,"g"],["oeuf",50,"g"],["oignon",40,"g"],["huile",15,"ml"]],
    [["🥣","Pâte","Pétrir une pâte très élastique, laisser reposer huilée."],["🥩","Farce","Faire revenir la viande hachée au curry avec oignon."],["🤲","Étirer","Étirer la pâte en feuille ultra-fine."],["🥚","Garnir","Étaler farce et œuf battu au centre."],["📦","Plier","Replier en carré pour enfermer la garniture."],["🔥","Cuire","Cuire sur une plaque huilée jusqu'à doré croustillant."],["🍽️","Servir","Couper et servir avec un curry léger ou des oignons au vinaigre."]]),

  // ===== MEXIQUE =====
  D("chilaquiles","Chilaquiles","Chilaquiles","🍳","brunch","mexique","30 min","⭐ Facile",
    "Tortillas frites mijotées dans une salsa, couronnées d'œuf, de crème et de fromage. Le petit-déjeuner mexicain anti-gaspi, piquant et réconfortant.",
    "Fried tortillas simmered in salsa, topped with egg, cream and cheese. The Mexican anti-waste breakfast, spicy and comforting.",
    [["mais",80,"g"],["tomate",80,"g"],["oeuf",50,"g"],["oignon",30,"g"],["piment",3,"g"]],
    [["🌽","Tortillas","Couper des tortillas en triangles et les frire (totopos)."],["🌶️","Salsa","Mixer tomate, piment et oignon, cuire en salsa."],["🥣","Mélanger","Jeter les totopos dans la salsa chaude juste avant de servir."],["🍳","Œuf","Cuire un œuf au plat ou brouillé."],["🧀","Garnir","Couronner de crème, fromage frais et oignon cru."],["🌿","Finir","Parsemer de coriandre."],["🍽️","Servir","Servir aussitôt pour garder le croquant."]]),
  D("gorditas","Gorditas","Gorditas","🫓","plats","mexique","45 min","⭐⭐ Moyen",
    "Galettes de maïs épaisses, fendues et farcies de viande effilochée et de fromage. Le sandwich de maïs des marchés mexicains.",
    "Thick corn cakes, split and stuffed with shredded meat and cheese. The corn sandwich of Mexican markets.",
    [["farineMais",80,"g"],["porc",70,"g"],["fromage",30,"g"],["oignon",30,"g"],["piment",3,"g"]],
    [["🌽","Pâte","Pétrir la masa (farine de maïs nixtamalisé) avec de l'eau."],["⚪","Former","Façonner des galettes épaisses."],["🔥","Cuire","Cuire sur une plaque puis frire légèrement."],["🥩","Garniture","Mijoter le porc effiloché épicé."],["✂️","Fendre","Ouvrir les gorditas comme des pochettes."],["🧀","Garnir","Garnir de viande, fromage et salsa."],["🍽️","Servir","Servir chaud, à la main."]]),
  D("sopes","Sopes","Sopes","🌽","aperitifs","mexique","40 min","⭐⭐ Moyen",
    "Petites galettes de maïs à bord relevé, garnies de haricots, viande, fromage et salsa. L'amuse-bouche coloré des cantinas.",
    "Small corn cakes with a pinched rim, topped with beans, meat, cheese and salsa. The colourful cantina bite.",
    [["farineMais",70,"g"],["haricots",40,"g"],["fromage",30,"g"],["tomate",40,"g"],["oignon",20,"g"]],
    [["🌽","Masa","Préparer la masa et façonner des petits disques épais."],["🔥","Cuire","Cuire sur la plaque puis pincer les bords chauds."],["🫘","Haricots","Étaler des haricots frits (frijoles refritos)."],["🥩","Garniture","Ajouter viande effilochée ou chorizo."],["🥗","Fraîcheur","Couronner de laitue, salsa et oignon."],["🧀","Fromage","Parsemer de fromage frais émietté."],["🍽️","Servir","Servir aussitôt, encore tièdes."]]),
  D("cochinitapibil","Cochinita Pibil","Cochinita Pibil","🐷","plats","mexique","2h30","⭐⭐ Moyen",
    "Porc mariné au rocou (achiote) et au jus d'agrumes, cuit très lentement jusqu'à s'effilocher. La merveille du Yucatán, servie en tacos.",
    "Pork marinated in annatto (achiote) and citrus juice, cooked very slowly until it shreds. The Yucatán marvel, served in tacos.",
    [["porc",160,"g"],["oignon",50,"g"],["citronvert",15,"ml"],["ail",6,"g"],["piment",3,"g"]],
    [["🌶️","Marinade","Délayer la pâte de rocou avec jus d'orange et de citron vert."],["💆","Mariner","Enrober le porc et mariner une nuit."],["🍃","Envelopper","Envelopper dans des feuilles de bananier."],["🔥","Cuire","Cuire couvert à 150 °C pendant 3 h."],["🍴","Effilocher","Effilocher la viande dans son jus."],["🧅","Oignons","Préparer des oignons rouges marinés au citron vert."],["🌮","Servir","Servir en tacos avec oignons et habanero."]]),
  D("birria","Birria","Birria","🍲","plats","mexique","2h30","⭐⭐ Moyen",
    "Ragoût de bœuf (ou chèvre) mijoté dans une sauce de piments séchés, servi avec son consommé pour y tremper les tacos. Riche, profond, viral.",
    "A beef (or goat) stew simmered in a dried-chilli sauce, served with its consommé for dipping tacos. Rich, deep, viral.",
    [["boeuf",150,"g"],["piment",6,"g"],["tomate",60,"g"],["oignon",50,"g"],["ail",6,"g"]],
    [["🌶️","Piments","Griller et réhydrater les piments séchés (guajillo, ancho)."],["🌀","Sauce","Mixer piments, tomate, ail et épices en adobo."],["🥩","Enrober","Enrober le bœuf de sauce et faire mariner."],["💧","Mijoter","Couvrir d'eau et mijoter 2 h jusqu'à fondant."],["🍴","Effilocher","Effilocher la viande, garder le consommé."],["🌮","Tacos","Tremper des tortillas dans le gras et les griller garnies."],["🍽️","Servir","Servir les tacos avec un bol de consommé."]]),
  D("aguachile","Aguachile","Aguachile","🦐","entrees","mexique","20 min","⭐ Facile",
    "Crevettes crues « cuites » au citron vert dans une eau piquante au piment vert et concombre. Le ceviche express et brûlant du Sinaloa.",
    "Raw shrimp \"cooked\" in lime in a spicy green-chilli and cucumber water. The fiery, express ceviche of Sinaloa.",
    [["crevettes",120,"g"],["citronvert",20,"ml"],["piment",4,"g"],["concombre",60,"g"],["oignon",30,"g"]],
    [["🦐","Préparer","Ouvrir les crevettes crues en papillon."],["🍋","Mariner","Les couvrir de jus de citron vert quelques minutes."],["🌶️","Aguachile","Mixer piment vert, coriandre, un peu d'eau et citron vert."],["🥒","Trancher","Tailler concombre et oignon rouge en fines lamelles."],["🥣","Dresser","Disposer les crevettes, verser l'aguachile."],["🧂","Assaisonner","Saler et ajouter l'oignon et le concombre."],["🍽️","Servir","Servir aussitôt, glacé, avec des tostadas."]]),
  D("tresleches","Tres Leches","Tres Leches Cake","🍰","desserts","mexique","1h","⭐⭐ Moyen",
    "Génoise imbibée de trois laits (concentré, évaporé, entier), couronnée de chantilly. Ultra-moelleux et fondant, le gâteau d'anniversaire latino.",
    "A sponge soaked in three milks (condensed, evaporated, whole), topped with whipped cream. Ultra-moist and melting, the Latino birthday cake.",
    [["farine",50,"g"],["oeuf",50,"g"],["lait",60,"ml"],["laitconcentre",40,"g"],["creme",40,"ml"]],
    [["🥚","Génoise","Monter une génoise légère, cuire et laisser tiédir."],["🥛","Trois laits","Mélanger lait concentré, évaporé et entier."],["🍴","Piquer","Piquer la génoise partout à la fourchette."],["💦","Imbiber","Verser le mélange de laits, laisser absorber."],["❄️","Réfrigérer","Réserver plusieurs heures au frais."],["🥛","Chantilly","Monter la crème en chantilly."],["🍰","Servir","Couvrir de chantilly et de cannelle, servir frais."]]),

  // ===== ITALIE =====
  D("cannoli","Cannoli","Cannoli","🧁","desserts","italie","1h","⭐⭐ Moyen",
    "Tubes de pâte croustillante frits, garnis d'une crème de ricotta sucrée et de pépites de chocolat. La merveille sicilienne.",
    "Crisp fried pastry tubes filled with a sweet ricotta cream and chocolate chips. The Sicilian marvel.",
    [["farine",50,"g"],["ricotta",80,"g"],["sucre",25,"g"],["chocolat",15,"g"],["huilefriture",15,"ml"]],
    [["🥣","Pâte","Pétrir une pâte au marsala, l'étaler très finement."],["⭕","Former","Découper des disques, les enrouler sur des tubes."],["🔥","Frire","Frire jusqu'à bullé et doré, laisser refroidir."],["🧀","Crème","Égoutter et fouetter la ricotta avec le sucre glace."],["🍫","Garnir","Ajouter pépites de chocolat et zeste d'orange."],["💉","Remplir","Garnir les tubes de crème aux deux extrémités."],["🍽️","Servir","Saupoudrer de sucre glace, servir aussitôt (sinon ça ramollit)."]]),
  D("sfogliatella","Sfogliatella","Sfogliatella","🥐","desserts","italie","1h30","⭐⭐⭐ Difficile",
    "Feuilleté napolitain en éventail, croustillant, fourré d'une crème de ricotta à la semoule et aux agrumes. Le défi des pâtissiers.",
    "A fan-shaped Neapolitan pastry, crisp, filled with a semolina-ricotta-citrus cream. The pastry chef's challenge.",
    [["pateFeuilletee",50,"g"],["ricotta",60,"g"],["semoule",20,"g"],["sucre",20,"g"],["oeuf",15,"g"]],
    [["🌀","Pâte","Étirer la pâte en très long ruban, beurrer et enrouler serré."],["❄️","Reposer","Réfrigérer le rouleau pour qu'il se tienne."],["🍮","Crème","Cuire la semoule au lait, mélanger ricotta, sucre, œuf et agrumes."],["🔪","Découper","Couper le rouleau en tranches, les creuser en cône."],["🥄","Garnir","Remplir chaque cône de crème."],["🔥","Cuire","Cuire à 200 °C jusqu'à feuilletage doré."],["🍽️","Servir","Saupoudrer de sucre glace et servir tiède."]]),
  D("zeppole","Zeppole","Zeppole","🍩","desserts","italie","40 min","⭐ Facile",
    "Beignets italiens moelleux, frits et roulés dans le sucre, parfois fourrés de crème. La gourmandise de la Saint-Joseph.",
    "Soft Italian fritters, fried and rolled in sugar, sometimes filled with cream. The treat of Saint Joseph's day.",
    [["farine",60,"g"],["oeuf",25,"g"],["sucre",20,"g"],["huilefriture",25,"ml"]],
    [["🥣","Pâte","Préparer une pâte à choux (ou levée) souple."],["🔥","Chauffer","Chauffer l'huile à 175 °C."],["🥄","Frire","Déposer des boules à la cuillère, frire jusqu'à doré gonflé."],["🧻","Égoutter","Égoutter sur papier absorbant."],["🍮","Garnir","Garnir éventuellement de crème pâtissière."],["🍒","Décorer","Poser une griotte au centre (version San Giuseppe)."],["🍬","Servir","Saupoudrer de sucre et servir tièdes."]]),
  D("pannacotta","Panna Cotta","Panna Cotta","🍮","desserts","italie","30 min","⭐ Facile",
    "Crème cuite vanillée prise à la gélatine, tremblotante et soyeuse, nappée d'un coulis de fruits rouges. L'élégance simple à l'italienne.",
    "A vanilla cooked cream set with gelatin, wobbly and silky, topped with a red-fruit coulis. Simple Italian elegance.",
    [["creme",120,"ml"],["lait",40,"ml"],["sucre",30,"g"],["gelatine",3,"g"]],
    [["🍦","Infuser","Chauffer crème, lait, sucre et vanille sans bouillir."],["💧","Gélatine","Faire ramollir la gélatine, la dissoudre dans la crème chaude."],["🥣","Verser","Répartir dans des ramequins ou des verrines."],["❄️","Prendre","Réfrigérer au moins 4 h jusqu'à prise tremblotante."],["🍓","Coulis","Mixer et passer des fruits rouges avec un peu de sucre."],["🫗","Napper","Napper de coulis au moment de servir."],["🍽️","Servir","Servir bien frais (ou démouler sur assiette)."]]),
  D("semifreddo","Semifreddo","Semifreddo","🍨","desserts","italie","30 min","⭐⭐ Moyen",
    "Mousse glacée italienne aux amandes, onctueuse et jamais dure, sans sorbetière. Entre la glace et la mousse, fondante en bouche.",
    "An Italian frozen almond mousse, creamy and never hard, without an ice-cream maker. Between ice cream and mousse, melting on the tongue.",
    [["creme",100,"ml"],["oeuf",50,"g"],["sucre",40,"g"],["amande",20,"g"]],
    [["🥚","Sabayon","Monter les jaunes avec le sucre au bain-marie."],["🥛","Chantilly","Monter la crème séparément."],["🍳","Meringue","Monter les blancs en meringue."],["🌰","Pralin","Caraméliser et concasser les amandes."],["🥣","Mélanger","Incorporer délicatement chantilly, meringue et pralin au sabayon."],["🧊","Congeler","Verser dans un moule à cake, congeler 6 h."],["🍽️","Servir","Démouler et trancher, servir tout juste sorti."]]),
  D("affogato","Affogato","Affogato","☕","desserts","italie","10 min","⭐ Facile",
    "Une boule de glace vanille « noyée » sous un espresso brûlant. Le dessert-café italien le plus simple et le plus chic, chaud-froid instantané.",
    "A scoop of vanilla ice cream \"drowned\" under a hot espresso. The simplest, chicest Italian coffee-dessert, instant hot-and-cold.",
    [["lait",60,"ml"],["creme",40,"ml"],["sucre",15,"g"]],
    [["🍦","Glace","Préparer (ou sortir) une bonne glace à la vanille."],["🥣","Coupe","Déposer une à deux boules dans une coupe glacée."],["☕","Espresso","Préparer un espresso bien serré et brûlant."],["💧","Noyer","Verser l'espresso sur la glace au moment de servir."],["🌰","Garnir","Parsemer d'amandes ou de copeaux de chocolat."],["🥄","Servir","Servir immédiatement, à déguster pendant que ça fond."]]),

  // ===== FRANCE =====
  D("parisbrest","Paris-Brest","Paris-Brest","🥐","desserts","france","1h30","⭐⭐⭐ Difficile",
    "Couronne de pâte à choux fourrée d'une crème mousseline au praliné, parsemée d'amandes. Le grand classique pâtissier inventé pour une course cycliste.",
    "A choux-pastry ring filled with a praline mousseline cream, scattered with almonds. The great pastry classic invented for a bicycle race.",
    [["farine",40,"g"],["oeuf",50,"g"],["beurre",30,"g"],["amande",20,"g"],["sucre",20,"g"]],
    [["🥣","Choux","Préparer une pâte à choux (eau, beurre, farine, œufs)."],["⭕","Pocher","Pocher une couronne sur la plaque, parsemer d'amandes."],["🔥","Cuire","Cuire sans ouvrir le four jusqu'à doré et sec."],["🌰","Praliné","Préparer un praliné amandes-noisettes."],["🍮","Mousseline","Monter une crème mousseline au praliné."],["✂️","Couper","Couper la couronne en deux dans l'épaisseur."],["💉","Garnir","Pocher généreusement la crème, refermer."],["🍽️","Servir","Saupoudrer de sucre glace et réserver au frais."]]),
  D("canele","Cannelé","Cannelé Bordelais","🍮","desserts","france","1h","⭐⭐ Moyen",
    "Petit gâteau bordelais à la croûte caramélisée et croustillante, au cœur moelleux parfumé au rhum et à la vanille. Le contraste parfait.",
    "A small Bordeaux cake with a caramelized, crunchy crust and a soft rum-and-vanilla heart. The perfect contrast.",
    [["farine",30,"g"],["lait",100,"ml"],["oeuf",30,"g"],["sucre",30,"g"],["beurre",10,"g"]],
    [["🥛","Infuser","Chauffer le lait avec la vanille et le beurre."],["🥣","Pâte","Mélanger farine, sucre, œufs puis le lait tiède."],["🥃","Parfumer","Ajouter le rhum, lisser la pâte (fluide comme une crêpe)."],["❄️","Reposer","Laisser reposer 24 h au frais (indispensable)."],["🧈","Moules","Beurrer (ou cirer) les moules à cannelé."],["🔥","Cuire","Cuire à four très chaud pour une croûte foncée."],["🍽️","Démouler","Démouler aussitôt : croûte croustillante, cœur moelleux."]]),

  // ===== ANGLETERRE =====
  D("banoffee","Banoffee Pie","Banoffee Pie","🍌","desserts","angleterre","40 min","⭐ Facile",
    "Tarte anglaise sans cuisson : base de biscuits, confiture de lait, bananes et chantilly. Décadente, régressive et imparable.",
    "A no-bake English pie: biscuit base, dulce de leche, bananas and whipped cream. Decadent, nostalgic and unbeatable.",
    [["biscuits",50,"g"],["banane",80,"g"],["laitconcentre",50,"g"],["creme",50,"ml"],["beurre",20,"g"]],
    [["🍪","Base","Mixer les biscuits et les lier au beurre fondu."],["🥧","Tasser","Tasser dans un moule et réfrigérer."],["🍯","Toffee","Cuire le lait concentré jusqu'à confiture de lait épaisse."],["🥄","Étaler","Étaler le toffee refroidi sur la base."],["🍌","Bananes","Disposer des rondelles de banane."],["🥛","Chantilly","Couvrir d'une généreuse chantilly."],["🍫","Servir","Râper un peu de chocolat dessus et servir frais."]]),

  // ===== ESPAGNE =====
  D("torrijas","Torrijas","Torrijas","🍞","desserts","espagne","30 min","⭐ Facile",
    "Pain perdu espagnol trempé dans le lait sucré à la cannelle, frit puis roulé dans le sucre. Le dessert de Semaine sainte, fondant et doré.",
    "Spanish French toast soaked in cinnamon-sweet milk, fried then rolled in sugar. The Holy Week dessert, soft and golden.",
    [["pain",60,"g"],["lait",100,"ml"],["oeuf",50,"g"],["sucre",20,"g"],["huilefriture",15,"ml"]],
    [["🥛","Lait","Chauffer le lait avec sucre, cannelle et zeste de citron."],["🍞","Tremper","Tremper des tranches de pain rassis dans le lait parfumé."],["🥚","Œuf","Passer les tranches dans l'œuf battu."],["🔥","Frire","Frire dans l'huile chaude jusqu'à doré."],["🧻","Égoutter","Égoutter sur papier absorbant."],["🍬","Sucrer","Rouler dans un mélange sucre-cannelle."],["🍽️","Servir","Servir tièdes ou froides, arrosées de miel."]]),
  D("bunuelos","Buñuelos","Buñuelos","🍩","desserts","espagne","40 min","⭐ Facile",
    "Petits beignets espagnols soufflés, frits et saupoudrés de sucre. Croustillants dehors, creux et moelleux dedans, parfaits avec un chocolat chaud.",
    "Puffed little Spanish fritters, fried and dusted with sugar. Crisp outside, hollow and soft inside, perfect with hot chocolate.",
    [["farine",60,"g"],["oeuf",25,"g"],["sucre",20,"g"],["huilefriture",25,"ml"]],
    [["🥣","Pâte","Préparer une pâte à choux souple."],["🔥","Chauffer","Chauffer l'huile à 175 °C."],["🥄","Frire","Déposer des petites boules, elles gonflent et se retournent."],["🟤","Dorer","Frire jusqu'à doré uniforme."],["🧻","Égoutter","Égoutter sur papier absorbant."],["🍬","Sucrer","Rouler dans le sucre (ou napper de sirop)."],["🍫","Servir","Servir tièdes avec un chocolat chaud épais."]]),
  D("natillas","Natillas","Natillas","🍮","desserts","espagne","30 min","⭐ Facile",
    "Crème dessert espagnole à la vanille et à la cannelle, surmontée d'un biscuit. Plus légère qu'un flan, douce et réconfortante.",
    "A Spanish vanilla-and-cinnamon custard topped with a biscuit. Lighter than a flan, soft and comforting.",
    [["lait",120,"ml"],["oeuf",50,"g"],["sucre",30,"g"],["cannelle",1,"g"]],
    [["🥛","Infuser","Chauffer le lait avec cannelle et zeste de citron."],["🥚","Jaunes","Blanchir les jaunes avec le sucre et un peu de maïzena."],["♨️","Cuire","Verser le lait chaud, cuire en remuant sans bouillir."],["🥣","Napper","La crème doit napper la cuillère."],["🥣","Verser","Répartir dans des coupelles."],["🍪","Garnir","Poser un biscuit (galleta) sur chaque crème."],["❄️","Servir","Saupoudrer de cannelle et servir frais."]]),

  // ===== JAPON =====
  D("mochi","Mochi","Mochi","🍡","desserts","japon","40 min","⭐⭐ Moyen",
    "Petites bouchées de pâte de riz gluant moelleuse et élastique, fourrées de pâte de haricot rouge sucrée. La douceur japonaise par excellence.",
    "Small soft, chewy glutinous-rice dough bites, filled with sweet red-bean paste. The quintessential Japanese sweet.",
    [["farineRiz",70,"g"],["sucre",30,"g"],["haricotsrouges",30,"g"]],
    [["🫘","Anko","Cuire les haricots rouges avec du sucre en pâte lisse (anko)."],["⚪","Bouler","Former de petites billes d'anko, réserver au frais."],["🥣","Pâte","Mélanger farine de riz gluant, sucre et eau."],["💨","Cuire","Cuire la pâte à la vapeur (ou au micro-ondes) en remuant."],["🌾","Travailler","Travailler la pâte sur de la fécule jusqu'à lisse."],["🤏","Garnir","Aplatir, déposer une bille d'anko et refermer."],["🍽️","Servir","Rouler dans la fécule et servir frais."]]),
  D("kakigori","Kakigori","Kakigori","🍧","glaces","japon","15 min","⭐ Facile",
    "Glace pilée japonaise ultra-fine nappée de sirop de fruit coloré et de lait concentré. Le rafraîchissement des festivals d'été nippons.",
    "Ultra-fine Japanese shaved ice topped with colourful fruit syrup and condensed milk. The refreshment of Japanese summer festivals.",
    [["sucre",40,"g"],["citronvert",10,"ml"],["lait",30,"ml"]],
    [["🧊","Glaçons","Préparer de gros glaçons (idéalement d'eau filtrée)."],["🍓","Sirop","Faire un sirop de fruit (fraise, melon, citron) au sucre."],["🧊","Râper","Râper la glace très finement en neige légère."],["⛰️","Monter","Monter la glace en dôme aérien dans une coupe."],["🫗","Napper","Arroser généreusement de sirop coloré."],["🥛","Lait","Ajouter un trait de lait concentré."],["🍽️","Servir","Servir immédiatement à la cuillère."]]),
  D("daifuku","Daifuku","Daifuku","🍡","desserts","japon","45 min","⭐⭐ Moyen",
    "Mochi tendre garni d'une généreuse boule de pâte de haricot rouge (parfois une fraise entière). Le wagashi roulé dans la fécule.",
    "A tender mochi filled with a generous ball of red-bean paste (sometimes a whole strawberry). The wagashi rolled in starch.",
    [["farineRiz",70,"g"],["haricotsrouges",40,"g"],["sucre",30,"g"]],
    [["🫘","Anko","Préparer une pâte de haricot rouge sucrée bien ferme."],["🍓","Garniture","Former des boules d'anko (option : enrober une fraise)."],["🥣","Pâte","Cuire la pâte de riz gluant sucrée à la vapeur."],["🌾","Étaler","Travailler la pâte sur de la fécule et l'aplatir."],["🤏","Garnir","Envelopper chaque boule d'anko dans la pâte."],["⚪","Fermer","Pincer pour bien sceller, rouler dans la fécule."],["🍽️","Servir","Servir frais, en une ou deux bouchées."]]),

  // ===== IRAN =====
  D("faloodeh","Faloodeh","Faloodeh","🍧","glaces","iran","30 min","⭐⭐ Moyen",
    "Sorbet persan de fins vermicelles glacés dans un sirop à l'eau de rose et au citron vert. Délicatement parfumé, l'un des plus vieux desserts glacés du monde.",
    "A Persian sorbet of fine frozen vermicelli in a rose-water and lime syrup. Delicately scented, one of the world's oldest frozen desserts.",
    [["vermicelles",50,"g"],["sucre",30,"g"],["citronvert",10,"ml"],["eauFleurOranger",5,"ml"]],
    [["🍜","Vermicelles","Cuire de fins vermicelles de riz, rincer à l'eau glacée."],["🧊","Congeler","Étaler les vermicelles et les congeler."],["🍯","Sirop","Préparer un sirop léger au sucre."],["🌹","Parfumer","Parfumer à l'eau de rose et au citron vert."],["🧊","Glace","Faire prendre le sirop en granité au congélateur."],["🥣","Mélanger","Mêler vermicelles glacés et granité parfumé."],["🍽️","Servir","Servir glacé, arrosé de sirop de griotte."]]),

  // ===== TURQUIE =====
  D("revani","Revani","Revani","🍰","desserts","turquie","50 min","⭐⭐ Moyen",
    "Gâteau de semoule turc imbibé de sirop, moelleux et parfumé au citron. Une douceur ottomane simple et terriblement réconfortante.",
    "A Turkish syrup-soaked semolina cake, moist and lemon-scented. A simple, deeply comforting Ottoman sweet.",
    [["semoule",60,"g"],["yaourt",40,"g"],["sucre",50,"g"],["oeuf",25,"g"]],
    [["🥣","Pâte","Mélanger semoule, farine, yaourt, œufs et levure."],["🍋","Parfumer","Ajouter zeste de citron."],["🟨","Verser","Verser dans un moule beurré."],["🔥","Cuire","Cuire à 180 °C jusqu'à doré."],["🍯","Sirop","Préparer un sirop sucre-eau-citron."],["💦","Imbiber","Arroser le gâteau chaud de sirop froid."],["🥥","Servir","Parsemer de coco et découper en losanges."]]),

  // ===== INDE (suite) =====
  D("khichdi","Khichdi","Khichdi","🍚","plats","inde","40 min","⭐ Facile",
    "Bouillie réconfortante de riz et lentilles au curcuma et au ghee. Le plat-doudou indien, digeste, nourrissant et servi aux petits comme aux malades.",
    "A comforting porridge of rice and lentils with turmeric and ghee. India's comfort dish — gentle, nourishing, served to children and the unwell alike.",
    [["riz",70,"g"],["lentilles",50,"g"],["oignon",30,"g"],["curcuma",1,"g"],["beurre",10,"g"]],
    [["💧","Rincer","Rincer riz et lentilles corail ensemble."],["🌿","Tempérer","Faire éclater cumin et graines de moutarde dans le ghee."],["🧅","Aromates","Ajouter oignon, gingembre et curcuma."],["🍚","Cuire","Ajouter riz et lentilles, couvrir largement d'eau."],["⏲️","Mijoter","Cuire jusqu'à texture de bouillie tendre."],["🧂","Assaisonner","Saler et ajuster en eau pour la consistance voulue."],["🍽️","Servir","Servir nappé de ghee, avec un yaourt."]]),
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
console.log("✅ " + DEFS.length + " recettes Thèmes transverses insérées (FR 6-8 étapes + EN nom/description).");
