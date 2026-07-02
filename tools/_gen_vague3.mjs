// Vague 3 : 48 plats vraiment nouveaux (dédup clé + nom + synonymes + Levenshtein vérifiée).
// 6 à 8 étapes. Idempotent. FR + EN nom/description. node tools/_gen_vague3.mjs
import fs from "fs";
const DATE = "2026-07-03T10:00:00";
const base = 4;

const D = (key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes) =>
  ({ key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes });

const DEFS = [
  // ===== SRI LANKA =====
  D("kotturoti","Kottu Roti","Kottu Roti","🍳","plats","srilanka","40 min","⭐⭐ Moyen",
    "Roti sri-lankais tranché fin et sauté façon wok avec légumes, œuf et curry, à grand bruit de lames sur la plancha. Street-food iconique et bruyant.",
    "Sri Lankan flatbread finely sliced and wok-fried with vegetables, egg and curry, chopped noisily on the griddle. Iconic, clattering street food.",
    [["farine",70,"g"],["oeuf",50,"g"],["poulet",90,"g"],["poivron",40,"g"],["curry",3,"g"]],
    [["🫓","Roti","Préparer (ou réchauffer) des roti et les couper en fines lanières."],["🍗","Curry","Mijoter un curry de poulet épicé."],["🍳","Wok","Faire chauffer un wok ou une plancha bien chaude."],["🥚","Légumes","Sauter oignon, poivron et un œuf brouillé."],["🫓","Réunir","Ajouter les lanières de roti au wok."],["🔪","Hacher","Hacher et mélanger le tout avec deux spatules (façon kottu)."],["🍛","Sauce","Incorporer le curry, bien enrober."],["🍽️","Servir","Servir brûlant, directement du wok."]]),

  D("hoppers","Hoppers","Hoppers","🥞","brunch","srilanka","1h","⭐⭐ Moyen",
    "Petite crêpe sri-lankaise en forme de bol, à pâte fermentée de riz et lait de coco, bords fins et croustillants, centre moelleux. Souvent garnie d'un œuf.",
    "A small bowl-shaped Sri Lankan pancake, fermented rice-and-coconut batter, thin crisp edges and a soft center. Often topped with an egg.",
    [["farineRiz",70,"g"],["laitcoco",60,"ml"],["levure",2,"g"],["sucre",5,"g"],["oeuf",50,"g"]],
    [["🌾","Pâte","Mélanger farine de riz, lait de coco et levure."],["⏳","Fermenter","Laisser fermenter plusieurs heures jusqu'à bien aérée."],["🥣","Ajuster","Ajuster la consistance, fluide mais épaisse."],["🔥","Wok","Chauffer un petit wok (appachatti) huilé."],["🌀","Tourner","Verser la pâte et tourner pour étaler sur les bords."],["🥚","Garnir","Casser un œuf au centre (option)."],["🔥","Cuire","Couvrir et cuire jusqu'à bords dorés croustillants."],["🍽️","Servir","Démouler délicatement et servir chaud."]]),

  D("polsambol","Pol Sambol","Pol Sambol","🥥","sauces","srilanka","15 min","⭐ Facile",
    "Relish sri-lankais de noix de coco fraîche râpée, piment, oignon rouge et citron vert. Vif, piquant, sur tout ou presque à Sri Lanka.",
    "A Sri Lankan relish of freshly grated coconut, chilli, red onion and lime. Sharp, spicy, eaten on almost everything in Sri Lanka.",
    [["coco",100,"g"],["oignonrouge",30,"g"],["piment",5,"g"],["citronvert",15,"ml"],["sel",1,"g"]],
    [["🥥","Coco","Râper la noix de coco fraîche (ou réhydrater de la coco séchée)."],["🧅","Oignon","Émincer très finement l'oignon rouge."],["🌶️","Piment","Piler piment et paprika fumé au mortier."],["🥣","Mélanger","Mélanger coco, oignon et piment."],["🍋","Aciduler","Ajouter le jus de citron vert et le sel."],["🥄","Écraser","Bien piler pour libérer les jus et lier le mélange."],["🍽️","Servir","Servir en accompagnement du riz ou des hoppers."]]),

  // ===== BANGLADESH =====
  D("biryanidhaka","Kacchi Biryani","Kacchi Biryani","🍚","plats","bangladesh","2h","⭐⭐⭐ Difficile",
    "Biryani du Bangladesh à l'agneau mariné cru cuit à l'étouffée avec le riz, parfumé au ghee et aux épices douces. Le plat de fête de Dacca.",
    "Bangladeshi biryani with raw-marinated lamb dum-cooked with the rice, scented with ghee and warm spices. Dhaka's celebration dish.",
    [["agneau",150,"g"],["riz",90,"g"],["yaourt",50,"g"],["oignon",50,"g"],["safran",0.1,"g"]],
    [["🥩","Mariner","Mariner l'agneau cru dans le yaourt, épices et jus de papaye (attendrissant)."],["🧅","Oignons","Frire des oignons jusqu'à brun doré."],["🍚","Riz","Précuire le riz basmati parfumé (cannelle, cardamome)."],["📦","Monter","Disposer l'agneau mariné au fond de la marmite."],["🍚","Couches","Couvrir de riz, oignons frits, safran et ghee fondu."],["💨","Dum","Sceller et cuire à l'étouffée très longtemps à feu doux."],["🍴","Servir","Aérer délicatement et servir avec un raïta."]]),

  D("hilsacurry","Hilsa au Curry","Hilsa Fish Curry","🐟","plats","bangladesh","40 min","⭐⭐ Moyen",
    "Curry bangladais de poisson hilsa mijoté dans une sauce moutardée au curcuma. Le poisson national, préparé dans toutes les familles.",
    "A Bangladeshi hilsa fish curry simmered in a mustard-and-turmeric sauce. The national fish, cooked in every household.",
    [["poisson",160,"g"],["moutarde",15,"g"],["curcuma",3,"g"],["oignon",40,"g"],["piment",4,"g"]],
    [["🐟","Poisson","Découper le poisson en darnes, frotter de curcuma et sel."],["🌶️","Pâte","Mixer graines de moutarde trempées avec piment vert."],["🍳","Saisir","Saisir légèrement les darnes à l'huile de moutarde."],["🧅","Base","Faire revenir l'oignon dans la même huile."],["🥣","Sauce","Ajouter la pâte de moutarde et un peu d'eau."],["🐟","Mijoter","Remettre le poisson, mijoter doucement à couvert."],["🍚","Servir","Servir avec du riz blanc parfumé."]]),

  // ===== NÉPAL =====
  D("momosnepal","Momo Népalais","Nepali Momo","🥟","aperitifs","nepal","1h","⭐⭐ Moyen",
    "Raviolis vapeur népalais plissés à la main, farcis de viande épicée, servis avec une sauce tomate-sésame relevée. L'incontournable de Katmandou.",
    "Hand-pleated Nepali steamed dumplings filled with spiced meat, served with a tangy tomato-sesame dip. The must-have of Kathmandu.",
    [["farine",70,"g"],["porc",90,"g"],["oignon",30,"g"],["gingembre",5,"g"],["coriandre",4,"g"]],
    [["🥣","Pâte","Pétrir une pâte fine à base de farine et d'eau."],["🥩","Farce","Mélanger viande hachée, oignon, gingembre et coriandre."],["⚪","Abaisser","Étaler de petits disques de pâte fine."],["🤏","Plisser","Garnir et plisser à la main en forme de bourse."],["💨","Vapeur","Cuire à la vapeur 10-12 min."],["🍅","Sauce","Préparer une sauce tomate-sésame pimentée (achar)."],["🍽️","Servir","Servir brûlant avec la sauce à tremper."]]),

  D("dalbhat","Dal Bhat","Dal Bhat","🍛","plats","nepal","45 min","⭐ Facile",
    "Le repas quotidien népalais : lentilles mijotées, riz, légumes sautés et pickle, servis en plateau. Simple, complet, réconfortant.",
    "Nepal's everyday meal: simmered lentils, rice, sautéed vegetables and pickle, served on a platter. Simple, complete, comforting.",
    [["lentilles",90,"g"],["riz",90,"g"],["epinard",70,"g"],["oignon",30,"g"],["curcuma",2,"g"]],
    [["🫘","Lentilles","Cuire les lentilles avec curcuma jusqu'à tendres."],["🌿","Tempérer","Faire éclater cumin et ail dans le ghee, verser sur le dal."],["🍚","Riz","Cuire le riz à part."],["🥬","Légumes","Faire sauter des légumes de saison épicés (tarkari)."],["🥒","Pickle","Préparer un pickle simple (achar) au citron ou légumes."],["🍽️","Dresser","Dresser riz, dal, légumes et pickle sur un plateau."],["🥄","Servir","Servir et mélanger à volonté, à la népalaise."]]),

  // ===== CAMBODGE =====
  D("amoknombodge","Amok","Amok","🐟","plats","cambodge","1h","⭐⭐ Moyen",
    "Poisson cambodgien mariné à la pâte de curry kroeung et au lait de coco, cuit vapeur en feuille de bananier. Mousseux, parfumé, délicat.",
    "Cambodian fish marinated in kroeung curry paste and coconut milk, steamed in a banana leaf. Mousse-like, fragrant, delicate.",
    [["poisson",160,"g"],["laitcoco",80,"ml"],["citronnelle",10,"g"],["oeuf",30,"g"],["curry",4,"g"]],
    [["🌿","Kroeung","Piler citronnelle, galanga, ail et curcuma en pâte (kroeung)."],["🐟","Mariner","Enrober le poisson émincé de cette pâte."],["🥥","Mousse","Mélanger avec lait de coco et œuf pour une texture mousseuse."],["🍃","Envelopper","Verser dans des feuilles de bananier façonnées en coupelle."],["💨","Vapeur","Cuire à la vapeur jusqu'à pris, comme un flan."],["🥥","Napper","Napper d'un peu de lait de coco épais avant de servir."],["🍽️","Servir","Servir avec du riz jasmin."]]),

  D("lokialcambodge","Lok Lak","Lok Lak","🥩","plats","cambodge","30 min","⭐ Facile",
    "Sauté cambodgien de cubes de bœuf caramélisés à la sauce poivrée, servi sur salade avec un jaune d'œuf cru et une sauce citron-poivre.",
    "A Cambodian stir-fry of caramelized beef cubes in a peppery sauce, served on salad with a raw egg yolk and lime-pepper dip.",
    [["boeuf",160,"g"],["saucesoja",12,"ml"],["ail",6,"g"],["tomate",40,"g"],["oeuf",25,"g"]],
    [["🥩","Mariner","Mariner les cubes de bœuf à l'ail et à la sauce soja."],["🔥","Saisir","Saisir à feu très vif dans un wok bien chaud."],["🍯","Caraméliser","Ajouter sucre et sauce huître, laisser caraméliser."],["🥗","Lit","Disposer une salade de tomate et oignon rouge en lit."],["🥩","Dresser","Poser le bœuf caramélisé sur la salade."],["🥚","Garnir","Ajouter un jaune d'œuf cru au centre."],["🍋","Sauce","Servir avec une sauce citron vert-poivre-sel à tremper."]]),

  // ===== LAOS =====
  D("orlam","Or Lam","Or Lam","🍲","plats","laos","1h30","⭐⭐ Moyen",
    "Ragoût laotien épais de viande, aubergines et bois amer (sakhaan), légèrement piquant et terreux. Le plat emblématique de Luang Prabang.",
    "A thick Lao stew of meat, eggplant and bitter wood (sakhaan), lightly spicy and earthy. The emblematic dish of Luang Prabang.",
    [["porc",140,"g"],["aubergine",100,"g"],["haricots",60,"g"],["piment",5,"g"],["citronnelle",8,"g"]],
    [["🥩","Viande","Faire revenir le porc en morceaux avec citronnelle et galanga."],["🍆","Légumes","Ajouter aubergines et haricots longs coupés."],["💧","Mijoter","Mouiller d'un bouillon léger, laisser mijoter."],["🌶️","Relever","Ajouter piments entiers et pâte de piment grillé."],["🪵","Amertume","Ajouter un peu d'écorce amère (ou remplacer par des herbes amères)."],["♨️","Épaissir","Laisser réduire jusqu'à une texture épaisse."],["🍚","Servir","Servir avec du riz gluant en accompagnement."]]),

  // ===== MONGOLIE =====
  D("buuz","Buuz","Buuz","🥟","aperitifs","mongolie","1h","⭐⭐ Moyen",
    "Raviolis vapeur mongols plissés en dôme, farcis d'agneau et d'oignon, mangés à la main pendant le Nouvel An lunaire mongol.",
    "Mongolian steamed dumplings pleated into a dome, filled with lamb and onion, eaten by hand during the Mongolian Lunar New Year.",
    [["farine",70,"g"],["agneau",100,"g"],["oignon",40,"g"],["ail",4,"g"],["sel",1,"g"]],
    [["🥣","Pâte","Pétrir une pâte simple farine-eau, laisser reposer."],["🥩","Farce","Mélanger agneau haché, oignon finement émincé et ail."],["⚪","Abaisser","Étaler de petits disques de pâte."],["🤏","Plisser","Garnir et plisser en petite bourse ou dôme."],["💨","Vapeur","Cuire à la vapeur 15-18 min."],["👀","Vérifier","Vérifier que le jus est clair à cœur."],["🍽️","Servir","Servir chauds, à la main, avec une sauce simple."]]),

  D("khorkhog","Khorkhog","Khorkhog","🍖","plats","mongolie","2h","⭐⭐ Moyen",
    "Ragoût mongol d'agneau et légumes traditionnellement cuit avec des pierres brûlantes dans un bidon fermé. Ici adapté à la cocotte, tout aussi fondant.",
    "A Mongolian lamb-and-vegetable stew traditionally cooked with hot stones in a sealed drum. Adapted here to a Dutch oven, just as tender.",
    [["agneau",180,"g"],["pommedeterre",100,"g"],["carotte",60,"g"],["oignon",50,"g"],["sel",2,"g"]],
    [["🥩","Agneau","Couper l'agneau en gros morceaux avec l'os."],["🥔","Légumes","Couper pomme de terre, carotte et oignon en gros morceaux."],["📦","Couches","Alterner viande et légumes en couches dans une cocotte."],["🧂","Assaisonner","Saler généreusement entre les couches, peu d'eau."],["🔥","Cuire","Cuire à couvert, à feu très doux, longuement."],["♨️","Vérifier","La viande doit se détacher de l'os facilement."],["🍽️","Servir","Servir la viande et les légumes avec le jus de cuisson."]]),

  // ===== ARMÉNIE =====
  D("khorovatsarmenien","Khorovats","Khorovats","🍢","plats","armenie","1h","⭐⭐ Moyen",
    "Barbecue arménien de brochettes de porc marinées au vin et aux épices, grillées aux braises avec légumes fumés. Le rituel du dimanche arménien.",
    "Armenian barbecue of wine-and-spice-marinated pork skewers, grilled over embers with charred vegetables. Armenia's Sunday ritual.",
    [["porc",180,"g"],["vinblanc",30,"ml"],["oignon",40,"g"],["poivron",40,"g"],["tomate",40,"g"]],
    [["🥩","Mariner","Mariner le porc en cubes au vin, oignon et épices une nuit."],["🍢","Embrocher","Embrocher les cubes de viande."],["🔥","Braise","Préparer une braise vive."],["🔥","Griller","Griller en tournant jusqu'à bien doré."],["🫑","Légumes","Griller aussi poivrons et tomates entiers à côté."],["🥄","Écraser","Peler et écraser grossièrement les légumes grillés."],["🍽️","Servir","Servir la viande sur du lavash avec les légumes fumés."]]),

  D("dolmaarmenien","Dolma Arménien","Armenian Dolma","🫑","plats","armenie","1h15","⭐⭐ Moyen",
    "Légumes arméniens (poivrons, tomates) farcis de viande hachée et de riz aux herbes, mijotés dans leur jus. Version salée et copieuse du dolma.",
    "Armenian vegetables (peppers, tomatoes) stuffed with minced meat and herbed rice, simmered in their juices. A hearty, savory take on dolma.",
    [["poivron",120,"g"],["boeufHache",100,"g"],["riz",50,"g"],["tomate",60,"g"],["menthe",5,"g"]],
    [["🫑","Évider","Évider poivrons et tomates, réserver les chapeaux."],["🥩","Farce","Mélanger viande hachée, riz cru, oignon et herbes fraîches."],["🥄","Garnir","Farcir généreusement chaque légume."],["📦","Ranger","Ranger serrés debout dans une cocotte."],["💧","Mijoter","Mouiller d'eau tomatée, couvrir et cuire à feu doux."],["⏲️","Cuire","Mijoter jusqu'à riz et viande cuits, légumes fondants."],["🍽️","Servir","Servir tiède avec un yaourt à l'ail."]]),

  // ===== KENYA =====
  D("ugali","Ugali","Ugali","🌽","plats","kenya","20 min","⭐ Facile",
    "Polenta kényane ferme de farine de maïs, pilée et travaillée jusqu'à une pâte dense. L'accompagnement de base de toute l'Afrique de l'Est.",
    "A firm Kenyan cornmeal polenta, beaten and worked into a dense dough. East Africa's staple side.",
    [["farineMais",120,"g"],["eau",50,"ml"],["sel",1,"g"]],
    [["💧","Bouillir","Porter de l'eau salée à ébullition."],["🌽","Verser","Verser la farine de maïs en pluie en fouettant."],["🥄","Travailler","Travailler énergiquement à la cuillère en bois."],["🔥","Cuire","Cuire à feu doux en remuant jusqu'à masse dense."],["💪","Pétrir","Continuer à travailler jusqu'à texture lisse et compacte."],["🍚","Former","Façonner en boule ou pain lisse dans un plat humide."],["🍽️","Servir","Servir chaud avec un ragoût ou des légumes verts (sukuma)."]]),

  D("nyamachoma","Nyama Choma","Nyama Choma","🍖","plats","kenya","1h","⭐ Facile",
    "Viande de chèvre ou de bœuf kényane grillée simplement au sel, servie avec du kachumbari (salade tomate-oignon) et de l'ugali. Le roi des grillades.",
    "Kenyan goat or beef, simply salt-grilled, served with kachumbari (tomato-onion salad) and ugali. The king of grills.",
    [["boeuf",200,"g"],["tomate",50,"g"],["oignonrouge",30,"g"],["citronvert",10,"ml"],["sel",2,"g"]],
    [["🥩","Préparer","Couper la viande en gros morceaux, saler généreusement."],["🔥","Braise","Préparer une belle braise."],["🔥","Griller","Griller longuement en tournant, jusqu'à bien caramélisé."],["🥗","Kachumbari","Émincer tomate, oignon rouge et piment pour la salade."],["🍋","Assaisonner","Citronner et saler la salade fraîche."],["🔪","Trancher","Trancher la viande grillée en morceaux."],["🍽️","Servir","Servir avec kachumbari et ugali."]]),

  // ===== TANZANIE =====
  D("pilautanzanie","Pilau Tanzanien","Tanzanian Pilau","🍚","plats","tanzanie","1h","⭐⭐ Moyen",
    "Riz tanzanien parfumé aux épices entières (cumin, cannelle, clou de girofle) mijoté avec de la viande. Plat de fête de la côte swahilie.",
    "Tanzanian rice fragrant with whole spices (cumin, cinnamon, clove) simmered with meat. A festive dish of the Swahili coast.",
    [["riz",90,"g"],["boeuf",120,"g"],["oignon",50,"g"],["cannelle",1,"g"],["cumin",2,"g"]],
    [["🥩","Viande","Saisir la viande avec les épices entières torréfiées."],["🧅","Oignons","Ajouter et faire bien caraméliser les oignons."],["🍚","Riz","Nacrer le riz dans le mélange épicé."],["💧","Mouiller","Mouiller à hauteur de bouillon parfumé."],["⏲️","Cuire","Cuire à couvert jusqu'à absorption complète."],["🍴","Aérer","Aérer délicatement à la fourchette."],["🍽️","Servir","Servir avec une salade kachumbari."]]),

  D("sambusatanzanie","Sambusa Tanzanienne","Tanzanian Sambusa","🥟","aperitifs","tanzanie","1h","⭐⭐ Moyen",
    "Triangles tanzaniens croustillants farcis de viande hachée épicée, frits dorés. Le sambusa swahili, cousin du samossa indien.",
    "Crispy Tanzanian triangles filled with spiced minced meat, fried golden. The Swahili sambusa, cousin of the Indian samosa.",
    [["farine",60,"g"],["boeufHache",90,"g"],["oignon",30,"g"],["curry",3,"g"],["huilefriture",20,"ml"]],
    [["🥩","Farce","Faire revenir viande hachée, oignon et épices curry."],["🥣","Pâte","Préparer ou utiliser des feuilles de pâte fines."],["✂️","Bandes","Découper en longues bandes."],["📐","Plier","Plier en triangle en enfermant la farce à chaque pli."],["🔒","Sceller","Sceller le dernier bord à l'eau ou à la farine délayée."],["🔥","Frire","Frire jusqu'à doré croustillant."],["🍽️","Servir","Servir chaud avec une sauce piquante."]]),

  // ===== MADAGASCAR =====
  D("romazava","Romazava","Romazava","🍲","plats","madagascar","1h","⭐ Facile",
    "Ragoût malgache de bœuf et feuilles vertes (brèdes mafana) mijoté simplement, plat national de Madagascar servi avec du riz à chaque repas.",
    "A Malagasy beef and leafy-greens stew (brèdes mafana), simply simmered — Madagascar's national dish, served with rice at every meal.",
    [["boeuf",160,"g"],["epinard",120,"g"],["oignon",40,"g"],["tomate",40,"g"],["gingembre",5,"g"]],
    [["🥩","Viande","Faire revenir le bœuf en morceaux avec oignon et gingembre."],["💧","Mijoter","Couvrir d'eau, laisser mijoter jusqu'à viande tendre."],["🍅","Tomate","Ajouter la tomate concassée."],["🥬","Verdure","Ajouter les feuilles vertes finement émincées."],["♨️","Cuire","Laisser mijoter encore 10 min."],["🧂","Assaisonner","Saler et poivrer, goûter et ajuster."],["🍚","Servir","Servir avec un grand bol de riz blanc."]]),

  D("ravitoto","Ravitoto","Ravitoto","🍲","plats","madagascar","1h15","⭐⭐ Moyen",
    "Feuilles de manioc pilées malgaches mijotées avec du porc et du lait de coco. Texture unique, verte et fondante, plat du quotidien à Madagascar.",
    "Malagasy pounded cassava leaves simmered with pork and coconut milk. A unique green, melting texture, an everyday Madagascar dish.",
    [["epinard",150,"g"],["porc",130,"g"],["laitcoco",50,"ml"],["oignon",40,"g"],["ail",5,"g"]],
    [["🥬","Feuilles","Piler finement les feuilles vertes (manioc ou épinard)."],["🥩","Viande","Faire revenir le porc en morceaux avec ail et oignon."],["🥬","Réunir","Ajouter les feuilles pilées."],["💧","Mijoter","Couvrir et laisser mijoter longuement à feu doux."],["🥥","Coco","Ajouter le lait de coco en fin de cuisson."],["♨️","Réduire","Laisser réduire jusqu'à texture fondante."],["🍚","Servir","Servir avec du riz blanc, pimenté à volonté."]]),

  // ===== BOLIVIE =====
  D("saltenabolivie","Salteña","Salteña","🥟","aperitifs","bolivie","1h30","⭐⭐⭐ Difficile",
    "Chausson bolivien à la pâte légèrement sucrée, farci d'un ragoût juteux de viande, pomme de terre et petits pois. Se mange debout, avec précaution !",
    "A Bolivian pastry with a slightly sweet dough, filled with a juicy stew of meat, potato and peas. Eaten standing up, with great care!",
    [["farine",70,"g"],["boeuf",90,"g"],["pommedeterre",60,"g"],["petitspois",30,"g"],["sucre",8,"g"]],
    [["🥩","Ragoût","Mijoter la viande en petits dés avec pomme de terre et épices."],["❄️","Gélifier","Laisser le ragoût refroidir et gélifier (avec un peu de gélatine)."],["🥣","Pâte","Pétrir une pâte légèrement sucrée au saindoux."],["⚪","Abaisser","Étaler des disques de pâte."],["🥄","Garnir","Garnir généreusement du ragoût gélifié froid."],["🤏","Plisser","Refermer en chausson et plisser fermement le bord."],["🔥","Cuire","Cuire au four jusqu'à doré."],["🍽️","Servir","Servir tiède, en tenant bien la pointe pour ne pas se brûler."]]),

  D("chairo","Chairo","Chairo","🍲","soupes","bolivie","1h30","⭐⭐ Moyen",
    "Soupe bolivienne épaisse d'altitude à l'agneau, pomme de terre, blé et légumes, réconfort des hauteurs de La Paz.",
    "A thick Bolivian high-altitude soup with lamb, potato, wheat and vegetables, comfort food from the heights of La Paz.",
    [["agneau",130,"g"],["pommedeterre",90,"g"],["carotte",50,"g"],["orge",30,"g"],["oignon",40,"g"]],
    [["🥩","Bouillon","Cuire l'agneau en bouillon longuement pour l'attendrir."],["🧅","Base","Faire revenir oignon, ail et cumin."],["🥔","Légumes","Ajouter pomme de terre et carotte en dés."],["🌾","Céréale","Ajouter l'orge (ou blé concassé)."],["♨️","Mijoter","Mijoter jusqu'à tous les éléments tendres."],["🌶️","Relever","Relever d'une pointe de piment (ají)."],["🍽️","Servir","Servir bien chaud, en soupe épaisse."]]),

  // ===== PARAGUAY =====
  D("sopaparaguayenne","Sopa Paraguaya","Sopa Paraguaya","🍞","plats","paraguay","1h","⭐ Facile",
    "Malgré son nom (« soupe »), un gâteau salé paraguayen dense à la farine de maïs, fromage et oignon. La spécialité la plus déroutante et délicieuse du pays.",
    "Despite its name (\"soup\"), a dense Paraguayan savory cornbread with cheese and onion. The country's most confusing, delicious specialty.",
    [["farineMais",120,"g"],["fromage",80,"g"],["oeuf",100,"g"],["lait",80,"ml"],["oignon",50,"g"]],
    [["🧅","Oignons","Faire fondre longuement les oignons émincés au beurre."],["🥣","Pâte","Mélanger farine de maïs, lait et œufs."],["🧀","Fromage","Incorporer le fromage râpé et les oignons fondus."],["🥣","Lisser","Bien mélanger jusqu'à pâte homogène et coulante."],["📦","Verser","Verser dans un moule beurré."],["🔥","Cuire","Cuire au four jusqu'à doré et pris à cœur."],["🍽️","Servir","Servir tiède, en carrés, avec un asado ou seul."]]),

  D("chipaguarani","Chipa Guarani","Chipa Guarani","🧀","boulangerie","paraguay","45 min","⭐ Facile",
    "Petits pains paraguayens moelleux et élastiques au manioc et au fromage, sans gluten par nature. Se mangent au petit-déjeuner ou en encas.",
    "Soft, chewy Paraguayan cassava-and-cheese rolls, naturally gluten-free. Eaten for breakfast or as a snack.",
    [["manioc",150,"g"],["fromage",100,"g"],["oeuf",50,"g"],["beurre",30,"g"],["lait",20,"ml"]],
    [["🥔","Fécule","Utiliser de la fécule de manioc (ou manioc râpé bien égoutté)."],["🧈","Mélanger","Mélanger avec beurre fondu et lait tiède."],["🧀","Fromage","Incorporer généreusement le fromage râpé."],["🥚","Œufs","Ajouter les œufs, pétrir jusqu'à pâte élastique."],["⚪","Former","Façonner des petits pains ou anneaux."],["🔥","Cuire","Cuire au four jusqu'à dorés et gonflés."],["🍽️","Servir","Servir tièdes, filants à cœur."]]),

  // ===== RÉPUBLIQUE DOMINICAINE =====
  D("concondominicain","El Concón","El Concón","🍚","plats","dominicaine","45 min","⭐ Facile",
    "La croûte de riz caramélisée et croustillante qui se forme au fond du chaudron dominicain, servie comme un délice à part entière. Le trésor du fond de la marmite.",
    "The caramelized, crispy rice crust that forms at the bottom of the Dominican pot, served as a treat in its own right. The treasure at the bottom of the pan.",
    [["riz",100,"g"],["huile",15,"ml"],["ail",5,"g"],["oignon",30,"g"],["sel",2,"g"]],
    [["🍚","Riz","Cuire le riz à l'ail et à l'oignon dans une cocotte épaisse."],["🔥","Réduire","Réduire le feu au minimum en fin de cuisson."],["⏳","Patienter","Laisser reposer à couvert sans remuer 15-20 min."],["🔍","Vérifier","Vérifier que le fond forme une croûte dorée."],["🥄","Détacher","Détacher délicatement la croûte du fond."],["🔥","Croustiller","Repasser à la poêle pour croustiller davantage si besoin."],["🍽️","Servir","Servir en accompagnement croustillant, très prisé."]]),

  D("mangubandominicain","Mangú Dominicain","Mangú Dominicain","🍌","brunch","dominicaine","30 min","⭐ Facile",
    "Purée dominicaine de plantains verts bouillis, écrasée avec l'eau de cuisson, couronnée d'oignons vinaigrés rouges. Le petit-déjeuner national.",
    "A Dominican mash of boiled green plantains, crushed with the cooking water, topped with vinegared red onions. The national breakfast.",
    [["plantain",180,"g"],["beurre",20,"g"],["oignonrouge",40,"g"],["vinaigre",10,"ml"],["sel",2,"g"]],
    [["🍌","Éplucher","Éplucher les plantains verts et couper en tronçons."],["💧","Cuire","Cuire à l'eau salée jusqu'à très tendres."],["🥄","Écraser","Écraser à la fourchette avec un peu d'eau de cuisson et du beurre."],["🧅","Oignons","Émincer l'oignon rouge très finement."],["🍋","Mariner","Faire mariner l'oignon dans le vinaigre quelques minutes."],["🍽️","Dresser","Dresser la purée bien lisse."],["🧅","Servir","Couronner des oignons vinaigrés, servir avec œufs et fromage frit."]]),

  // ===== BAHAMAS =====
  D("johnnycake","Johnny Cake","Johnny Cake","🍞","boulangerie","bahamas","40 min","⭐ Facile",
    "Petit pain bahaméen dense et légèrement sucré, cuit au four ou à la poêle. L'accompagnement traditionnel du poisson frit du dimanche.",
    "A dense, slightly sweet Bahamian bread, baked or pan-fried. The traditional side to Sunday's fried fish.",
    [["farine",100,"g"],["beurre",30,"g"],["sucre",20,"g"],["lait",60,"ml"],["levure",4,"g"]],
    [["🥣","Pâte","Mélanger farine, sucre, levure et une pincée de sel."],["🧈","Incorporer","Incorporer le beurre du bout des doigts."],["🥛","Lier","Ajouter le lait progressivement pour une pâte souple."],["✋","Pétrir","Pétrir brièvement jusqu'à homogène."],["⚪","Former","Façonner en pain rond aplati."],["🔥","Cuire","Cuire au four jusqu'à doré, croûte ferme."],["🍽️","Servir","Servir tiède, tranché, avec du poisson frit."]]),

  D("conchsalad","Conch Salad","Conch Salad","🥗","salades","bahamas","20 min","⭐ Facile",
    "Salade fraîche bahaméenne de conque marinée au citron vert, tomate, poivron et piment scotch bonnet. Le ceviche des Caraïbes, vif et croquant.",
    "A fresh Bahamian salad of lime-marinated conch, tomato, pepper and scotch bonnet chilli. The Caribbean's ceviche, sharp and crunchy.",
    [["moules",160,"g"],["citronvert",25,"ml"],["tomate",50,"g"],["poivron",40,"g"],["piment",4,"g"]],
    [["🦪","Préparer","Attendrir et hacher finement les fruits de mer (conque ou moules)."],["🍋","Mariner","Mariner généreusement dans le jus de citron vert."],["🍅","Légumes","Couper tomate, poivron et oignon en petits dés."],["🌶️","Piment","Émincer très finement le piment scotch bonnet."],["🥣","Mélanger","Mélanger tous les ingrédients."],["🧂","Assaisonner","Assaisonner de sel et jus d'orange (option)."],["🍽️","Servir","Servir glacé, en amuse-bouche."]]),

  // ===== ISLANDE =====
  D("agneauislandais","Ragoût d'Agneau Islandais","Icelandic Lamb Stew","🍲","plats","islande","2h","⭐ Facile",
    "Ragoût islandais d'agneau et racines d'hiver (rutabaga, carotte, pomme de terre) mijoté longuement. Chaleur simple pour les longues nuits nordiques.",
    "An Icelandic lamb and winter-root stew (swede, carrot, potato) long-simmered. Simple warmth for long Nordic nights.",
    [["agneau",180,"g"],["pommedeterre",100,"g"],["carotte",70,"g"],["navet",60,"g"],["oignon",40,"g"]],
    [["🥩","Saisir","Saisir les morceaux d'agneau dans une cocotte."],["🧅","Aromates","Ajouter oignon et un peu de farine pour lier."],["💧","Mouiller","Mouiller à hauteur d'eau ou de bouillon."],["🥕","Légumes","Ajouter carotte, navet (rutabaga) et pomme de terre."],["♨️","Mijoter","Mijoter à couvert longuement à feu doux."],["🧂","Assaisonner","Assaisonner simplement de sel, poivre et thym."],["🍽️","Servir","Servir bien chaud avec du pain."]]),

  D("kjotsupa","Kjötsúpa","Kjötsúpa","🍲","soupes","islande","1h30","⭐ Facile",
    "Soupe islandaise traditionnelle d'agneau et légumes racines, claire et nourrissante. Le bol réconfortant de chaque foyer islandais en hiver.",
    "Traditional Icelandic lamb and root-vegetable soup, clear and hearty. The comforting bowl of every Icelandic home in winter.",
    [["agneau",150,"g"],["carotte",60,"g"],["pommedeterre",70,"g"],["navet",50,"g"],["riz",20,"g"]],
    [["🥩","Bouillon","Cuire l'agneau à l'eau pour un bouillon clair, écumer."],["🥕","Légumes","Ajouter carotte, navet et pomme de terre en morceaux."],["🍚","Céréale","Ajouter un peu de riz ou de flocons d'avoine pour épaissir légèrement."],["♨️","Mijoter","Mijoter à couvert jusqu'à viande et légumes tendres."],["🌿","Herbes","Ajouter du thym frais en fin de cuisson."],["🧂","Ajuster","Ajuster sel et poivre."],["🍽️","Servir","Servir chaud, en soupe complète."]]),

  // ===== FINLANDE =====
  D("karjalanpiirakka","Karjalanpiirakka","Karjalanpiirakka","🥧","boulangerie","finlande","1h","⭐⭐ Moyen",
    "Petites tourtes finlandaises de Carélie à la croûte de seigle fine, garnies de porridge de riz au lait, badigeonnées de beurre à l'œuf.",
    "Small Finnish Karelian pastries with a thin rye crust, filled with rice-milk porridge, brushed with egg butter.",
    [["farine",80,"g"],["riz",50,"g"],["lait",150,"ml"],["beurre",25,"g"],["oeuf",25,"g"]],
    [["🍚","Porridge","Cuire le riz longuement dans le lait jusqu'à porridge épais."],["🥣","Pâte","Pétrir une pâte fine à base de farine de seigle et d'eau."],["⚪","Abaisser","Étaler de fins ovales de pâte."],["🥄","Garnir","Étaler le porridge de riz au centre."],["🤲","Plisser","Replier et pincer les bords en accordéon (forme ovale ouverte)."],["🔥","Cuire","Cuire au four très chaud jusqu'à taches dorées."],["🧈","Badigeonner","Badigeonner chaud de beurre fondu mélangé à de l'œuf dur écrasé."]]),

  D("kalakukko","Kalakukko","Kalakukko","🐟","plats","finlande","3h","⭐⭐⭐ Difficile",
    "Pain finlandais de seigle massif farci de poisson et de lard, cuit très longuement à basse température jusqu'à ce que les arêtes fondent. Spécialité de Savonie.",
    "A hearty Finnish rye loaf stuffed with fish and pork fat, slow-baked until the bones melt away. A Savonia specialty.",
    [["farine",150,"g"],["poisson",150,"g"],["porc",60,"g"],["beurre",20,"g"],["sel",3,"g"]],
    [["🥣","Pâte","Pétrir une pâte épaisse de seigle et de blé."],["🍞","Foncer","Étaler en grand disque, former une poche."],["🐟","Garnir","Garnir de couches de poisson et de lard salé."],["🌯","Refermer","Refermer soigneusement en pain bombé, sceller les bords."],["🔥","Saisir","Cuire d'abord à four chaud pour dorer la croûte."],["🔥","Mijoter","Baisser à très basse température et cuire plusieurs heures."],["🍽️","Servir","Servir en tranches, croûte comprise, tartiné de beurre."]]),

  // ===== NORVÈGE =====
  D("farikal","Fårikål","Fårikål","🍲","plats","norvege","2h30","⭐ Facile",
    "Plat national norvégien : agneau et chou mijotés ensemble en couches avec juste du sel et du poivre en grains. La simplicité récompensée.",
    "Norway's national dish: lamb and cabbage layered and simmered together with just salt and whole peppercorns. Simplicity rewarded.",
    [["agneau",180,"g"],["chou",150,"g"],["farine",10,"g"],["sel",2,"g"]],
    [["🥩","Couper","Couper l'agneau (avec l'os) en gros morceaux."],["🥬","Chou","Couper le chou en grands quartiers."],["📦","Couches","Alterner couches d'agneau et de chou dans une cocotte."],["🧂","Assaisonner","Saler et poivrer en grains généreusement entre les couches."],["🌾","Fariner","Saupoudrer un peu de farine sur le dessus."],["💧","Mijoter","Ajouter un fond d'eau, cuire à couvert très longtemps."],["🍽️","Servir","Servir avec des pommes de terre vapeur."]]),

  D("raspeball","Raspeball","Raspeball","🥔","plats","norvege","1h","⭐⭐ Moyen",
    "Boulettes norvégiennes de pomme de terre râpée, pochées puis servies avec lard, saucisse et purée de rutabaga. Le comfort food du dimanche.",
    "Norwegian grated-potato dumplings, poached then served with bacon, sausage and swede mash. Sunday comfort food.",
    [["pommedeterre",250,"g"],["farine",50,"g"],["lardons",60,"g"],["saucisse",80,"g"],["sel",2,"g"]],
    [["🥔","Râper","Râper finement les pommes de terre crues, presser le jus."],["🥣","Pâte","Mélanger avec farine et sel pour une pâte ferme."],["⚪","Former","Former de grosses boulettes rondes."],["💧","Pocher","Pocher à l'eau frémissante 45-60 min."],["🥓","Garniture","Faire dorer lardons et tranches de saucisse."],["🥔","Servir","Servir les boulettes chaudes avec lardons et saucisse."],["🧈","Finir","Ajouter une noisette de beurre par-dessus."]]),

  // ===== LETTONIE =====
  D("peleklizirni","Pelēkie Zirņi","Pelēkie Zirņi (Grey Peas)","🫘","plats","lettonie","1h30","⭐ Facile",
    "Pois gris lettons mijotés longuement avec des lardons fumés et de l'oignon. Le plat traditionnel de Noël, terreux et réconfortant.",
    "Latvian grey peas long-simmered with smoky bacon and onion. The traditional Christmas dish, earthy and comforting.",
    [["haricots",150,"g"],["lardons",80,"g"],["oignon",50,"g"],["beurre",15,"g"],["sel",2,"g"]],
    [["🫘","Tremper","Faire tremper les pois (ou haricots gris) une nuit."],["💧","Cuire","Cuire à l'eau jusqu'à tendres, sans les casser."],["🥓","Lardons","Faire dorer les lardons fumés."],["🧅","Oignons","Ajouter l'oignon émincé, cuire jusqu'à fondant."],["🫘","Réunir","Mélanger les pois cuits aux lardons et oignons."],["🧈","Finir","Ajouter une noisette de beurre, assaisonner."],["🍽️","Servir","Servir chaud, en plat unique convivial."]]),

  D("sklandrausis","Sklandrausis","Sklandrausis","🥧","desserts","lettonie","1h","⭐⭐ Moyen",
    "Petites tartelettes lettonnes à la pâte de seigle, garnies de purée de pomme de terre et de carotte sucrée. Douces, rustiques, uniques.",
    "Small Latvian rye tartlets filled with a sweet potato-and-carrot mash. Gentle, rustic, one of a kind.",
    [["farine",80,"g"],["pommedeterre",100,"g"],["carotte",100,"g"],["beurre",20,"g"],["miel",15,"g"]],
    [["🥣","Pâte","Pétrir une pâte fine de seigle et de blé."],["🥔","Purée 1","Cuire et réduire la pomme de terre en purée."],["🥕","Purée 2","Cuire et réduire la carotte en purée sucrée au miel."],["⚪","Foncer","Foncer de petits moules ronds de pâte, bords pincés."],["🥄","Garnir","Garnir de purée de pomme de terre puis de carotte."],["🔥","Cuire","Cuire au four jusqu'à bords dorés."],["🍽️","Servir","Servir tiède ou froid, en encas sucré-salé."]]),

  // ===== MONTÉNÉGRO =====
  D("kacamak","Kačamak","Kačamak","🧀","plats","montenegro","40 min","⭐ Facile",
    "Bouillie monténégrine de farine de maïs et pomme de terre, longuement travaillée et enrichie de fromage et de crème. Réconfort montagnard.",
    "A Montenegrin cornmeal-and-potato mash, long-worked and enriched with cheese and cream. Mountain comfort food.",
    [["farineMais",100,"g"],["pommedeterre",100,"g"],["fromage",60,"g"],["creme",30,"ml"],["beurre",20,"g"]],
    [["🥔","Pommes de terre","Cuire les pommes de terre à l'eau, égoutter."],["💧","Bouillir","Porter de l'eau salée à ébullition."],["🌽","Verser","Verser la farine de maïs en pluie en fouettant."],["🥄","Travailler","Ajouter les pommes de terre, travailler énergiquement."],["🧀","Fromage","Incorporer fromage et crème hors du feu."],["🧈","Finir","Ajouter une bonne noisette de beurre fondu."],["🍽️","Servir","Servir bien chaud, fumant, en plat unique."]]),

  D("ripljacorba","Riblja Čorba","Riblja Čorba (Fish Soup)","🍲","soupes","montenegro","1h","⭐ Facile",
    "Soupe de poisson monténégrine du littoral adriatique, mijotée avec tomate et paprika, épaissie sans crème. Simple pêche du jour.",
    "A Montenegrin Adriatic-coast fish soup, simmered with tomato and paprika, thickened without cream. Simple catch of the day.",
    [["poisson",180,"g"],["tomate",60,"g"],["oignon",50,"g"],["paprika",3,"g"],["carotte",40,"g"]],
    [["🐟","Fumet","Préparer un fumet avec les parures de poisson."],["🧅","Base","Faire revenir oignon, carotte et céleri."],["🍅","Tomate","Ajouter tomate concassée et paprika."],["💧","Mouiller","Mouiller avec le fumet filtré."],["♨️","Mijoter","Laisser mijoter 20 min pour développer les saveurs."],["🐟","Poisson","Ajouter les morceaux de poisson, pocher doucement."],["🍽️","Servir","Servir chaud avec un trait de vinaigre."]]),

  // ===== ALBANIE =====
  D("tavekosi","Tavë Kosi","Tavë Kosi","🍚","plats","albanie","1h30","⭐⭐ Moyen",
    "Plat national albanais d'agneau au riz gratiné sous une sauce yaourt-œuf prise au four, façon flan salé. Réconfortant et unique.",
    "Albania's national dish of lamb and rice baked under an oven-set yogurt-and-egg sauce, like a savory flan. Comforting and unique.",
    [["agneau",150,"g"],["riz",60,"g"],["yaourt",150,"g"],["oeuf",50,"g"],["farine",15,"g"]],
    [["🥩","Agneau","Saisir l'agneau en morceaux, cuire jusqu'à presque tendre."],["🍚","Riz","Ajouter le riz et un peu de bouillon, précuire."],["📦","Verser","Verser viande et riz dans un plat à gratin."],["🥣","Sauce","Fouetter yaourt, œufs et farine en sauce lisse."],["🫗","Napper","Napper généreusement le plat de cette sauce."],["🔥","Cuire","Cuire au four jusqu'à la sauce dorée et prise comme un flan."],["🍽️","Servir","Laisser tiédir 10 min avant de découper en parts."]]),

  D("byrekalbanie","Byrek","Byrek","🥧","aperitifs","albanie","1h","⭐⭐ Moyen",
    "Tourte albanaise en spirale de fines feuilles de pâte, farcie d'épinards et de fromage. Se coupe en parts généreuses, star de chaque table albanaise.",
    "An Albanian spiral pie of thin pastry sheets, filled with spinach and cheese. Cut into generous slices, the star of every Albanian table.",
    [["feuillebrick",80,"g"],["epinard",150,"g"],["fromage",100,"g"],["oeuf",50,"g"],["huile",20,"ml"]],
    [["🥬","Farce","Cuire les épinards, essorer, mélanger au fromage émietté."],["🥚","Lier","Ajouter un œuf pour lier la farce."],["📄","Feuilles","Badigeonner chaque feuille de pâte d'huile."],["🌯","Rouler","Étaler la farce sur une feuille, rouler en long boudin."],["🌀","Spiraler","Enrouler le boudin en spirale dans un moule rond."],["🔥","Cuire","Cuire au four jusqu'à doré et croustillant."],["🍽️","Servir","Découper en parts triangulaires, servir tiède."]]),

  // ===== BULGARIE =====
  D("banitsa","Banitsa","Banitsa","🥧","brunch","bulgarie","1h","⭐⭐ Moyen",
    "Feuilleté bulgare en couches froissées, garni de fromage blanc et d'œuf battu. Le petit-déjeuner national, souvent avec un porte-bonheur caché dedans.",
    "A Bulgarian crumpled-layer pastry, filled with white cheese and beaten egg. The national breakfast, often with a lucky charm baked inside.",
    [["feuillebrick",90,"g"],["fromage",120,"g"],["oeuf",80,"g"],["beurre",30,"g"],["yaourt",30,"g"]],
    [["🥚","Appareil","Battre œufs, fromage émietté et yaourt en appareil."],["📄","Beurrer","Badigeonner chaque feuille de pâte de beurre fondu."],["🥄","Garnir","Étaler un peu d'appareil sur chaque feuille."],["🌀","Froisser","Froisser librement chaque feuille garnie en accordéon."],["📦","Disposer","Disposer les froissés serrés dans un moule rond."],["🥚","Napper","Napper le dessus avec le reste d'appareil."],["🔥","Cuire","Cuire au four jusqu'à bien doré et gonflé."]]),

  D("shopska","Salade Shopska","Shopska Salad","🥗","salades","bulgarie","15 min","⭐ Facile",
    "Salade bulgare emblématique de tomate, concombre et poivron, généreusement recouverte de fromage blanc râpé façon neige. Fraîche et acidulée.",
    "Bulgaria's iconic salad of tomato, cucumber and pepper, generously topped with grated white cheese like snow. Fresh and tangy.",
    [["tomate",120,"g"],["concombre",80,"g"],["poivron",50,"g"],["oignon",30,"g"],["feta",70,"g"]],
    [["🍅","Légumes","Couper tomate, concombre et poivron en dés."],["🧅","Oignon","Émincer finement l'oignon."],["🥣","Mélanger","Mélanger tous les légumes."],["🫒","Assaisonner","Arroser d'huile et de vinaigre léger."],["🧀","Râper","Râper généreusement le fromage blanc (sirene) par-dessus."],["🌿","Herbes","Parsemer de persil frais."],["🍽️","Servir","Servir frais, à mélanger à table."]]),

  // ===== PAYS DE GALLES =====
  D("welshrarebit","Welsh Rarebit","Welsh Rarebit","🧀","encas","paysdegalles","20 min","⭐ Facile",
    "Toast gallois nappé d'une sauce fondante au cheddar, bière et moutarde, gratinée jusqu'à bouillonnante. Le croque-monsieur gallois, en plus riche.",
    "Welsh toast topped with a molten cheddar, beer and mustard sauce, grilled until bubbling. Wales' answer to the croque-monsieur, richer.",
    [["fromage",120,"g"],["pain",80,"g"],["moutarde",10,"g"],["beurre",20,"g"],["lait",30,"ml"]],
    [["🧈","Roux","Faire un roux avec le beurre et un peu de farine."],["🥛","Sauce","Ajouter le lait (ou bière) pour une sauce lisse."],["🧀","Fromage","Incorporer le cheddar râpé jusqu'à fondu."],["🌭","Moutarde","Ajouter moutarde et une pointe de sauce Worcestershire."],["🍞","Toaster","Griller légèrement des tranches de pain."],["🫗","Napper","Napper généreusement de sauce au fromage."],["🔥","Gratiner","Passer sous le grill jusqu'à doré et bouillonnant."]]),

  D("cawl","Cawl","Cawl","🍲","soupes","paysdegalles","2h","⭐ Facile",
    "Soupe-ragoût galloise traditionnelle d'agneau, poireau et légumes racines, mijotée lentement. Le plat national gallois, simple et nourrissant.",
    "A traditional Welsh lamb, leek and root-vegetable soup-stew, slow-simmered. Wales' national dish, simple and hearty.",
    [["agneau",160,"g"],["poireau",80,"g"],["pommedeterre",90,"g"],["carotte",60,"g"],["navet",50,"g"]],
    [["🥩","Saisir","Saisir l'agneau en morceaux dans une cocotte."],["💧","Mouiller","Couvrir d'eau, porter à frémissement, écumer."],["🥕","Légumes","Ajouter carotte, navet et pomme de terre."],["♨️","Mijoter","Mijoter à couvert longuement à feu doux."],["🥬","Poireau","Ajouter le poireau émincé en fin de cuisson."],["🧂","Assaisonner","Assaisonner de sel, poivre et persil."],["🍽️","Servir","Servir chaud avec du pain de campagne."]]),

  // ===== ÉCOSSE =====
  D("haggisscotland","Haggis","Haggis","🍽️","plats","ecosse","2h30","⭐⭐⭐ Difficile",
    "Panse de brebis écossaise farcie d'abats, flocons d'avoine et épices, pochée longuement. Servi avec purée de pomme de terre et de rutabaga (neeps and tatties).",
    "Scottish sheep's stomach stuffed with offal, oats and spices, long-poached. Served with mashed potato and swede (neeps and tatties).",
    [["porc",150,"g"],["avoine",80,"g"],["oignon",50,"g"],["pommedeterre",120,"g"],["navet",80,"g"]],
    [["🥩","Viande","Hacher grossièrement la viande (traditionnellement des abats)."],["🌾","Avoine","Torréfier légèrement les flocons d'avoine."],["🥣","Mélanger","Mélanger viande, avoine, oignon et épices (poivre, muscade)."],["🌯","Envelopper","Envelopper serré dans un linge à pudding (ou boyau)."],["💧","Pocher","Pocher à frémissement 2h, en piquant pour laisser échapper l'air."],["🥔","Purée","Préparer une purée de pomme de terre et de rutabaga séparées."],["🍽️","Servir","Servir le haggis effrité avec les deux purées (neeps and tatties)."]]),

  D("cranachan","Cranachan","Cranachan","🍓","desserts","ecosse","20 min","⭐ Facile",
    "Dessert écossais en verrine de crème fouettée au whisky, flocons d'avoine grillés, miel et framboises fraîches. Léger, croquant, terriblement écossais.",
    "A Scottish layered dessert of whisky-whipped cream, toasted oats, honey and fresh raspberries. Light, crunchy, thoroughly Scottish.",
    [["creme",100,"ml"],["avoine",40,"g"],["miel",25,"g"],["sucre",10,"g"],["citron",5,"ml"]],
    [["🌾","Griller","Griller à sec les flocons d'avoine jusqu'à dorés et odorants."],["🥛","Fouetter","Fouetter la crème en chantilly souple."],["🥃","Parfumer","Incorporer un trait de whisky et de miel à la crème."],["🍓","Fruits","Écraser légèrement une partie des framboises avec du sucre."],["🥄","Monter","Alterner en verrine crème, avoine grillée et framboises."],["🍯","Finir","Terminer par un filet de miel sur le dessus."],["🍽️","Servir","Servir aussitôt monté, pour garder le croquant."]]),

  // ===== MALTE =====
  D("kapunata","Kapunata","Kapunata","🍆","plats","malte","45 min","⭐ Facile",
    "Ratatouille maltaise d'aubergine, poivron, tomate et câpres, mijotée à l'huile d'olive. Servie tiède ou froide, sur pain croustillant.",
    "A Maltese eggplant, pepper, tomato and caper ratatouille, simmered in olive oil. Served warm or cold, on crusty bread.",
    [["aubergine",120,"g"],["poivron",60,"g"],["tomate",90,"g"],["olives",30,"g"],["huileOlive",20,"ml"]],
    [["🍆","Aubergine","Couper l'aubergine en dés, saler pour dégorger."],["🍳","Saisir","Faire revenir l'aubergine à l'huile d'olive jusqu'à dorée."],["🫑","Légumes","Ajouter poivron et oignon, faire suer."],["🍅","Tomate","Ajouter la tomate concassée."],["♨️","Mijoter","Mijoter à couvert jusqu'à fondant."],["🫒","Olives","Ajouter olives et câpres en fin de cuisson."],["🍽️","Servir","Servir tiède ou froid, sur pain croustillant."]]),

  D("timpanamalte","Timpana","Timpana","🍝","plats","malte","1h30","⭐⭐ Moyen",
    "Gâteau maltais de pâtes en croûte : macaronis en sauce viande-tomate enveloppés de pâte feuilletée dorée, tranché comme une tourte. Plat de fête.",
    "A Maltese pasta pie: macaroni in a meat-tomato sauce wrapped in golden pastry, sliced like a savory cake. A celebration dish.",
    [["farine",70,"g"],["boeufHache",100,"g"],["tomate",70,"g"],["fromage",50,"g"],["oeuf",50,"g"]],
    [["🍝","Pâtes","Cuire des macaronis al dente."],["🥩","Sauce","Mijoter une sauce bolognaise épaisse à la viande hachée."],["🥚","Lier","Mélanger pâtes, sauce, fromage et œuf battu."],["🥧","Foncer","Foncer un moule de pâte feuilletée."],["📦","Garnir","Verser la préparation de pâtes dans le moule."],["📦","Couvrir","Couvrir d'un disque de pâte, souder les bords."],["🔥","Cuire","Cuire au four jusqu'à doré et croustillant."],["🔪","Servir","Laisser reposer puis découper en parts comme une tourte."]]),
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
console.log("✅ " + DEFS.length + " recettes (vague 3) insérées (FR 6-8 étapes + EN nom/description).");
