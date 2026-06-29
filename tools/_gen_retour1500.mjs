// Retour à 1500 : 16 plats vraiment nouveaux (dédup vérifiée par nom).
// 6 à 8 étapes. Idempotent. FR + EN nom/description. node tools/_gen_retour1500.mjs
import fs from "fs";
const DATE = "2026-06-29T15:00:00";
const base = 4;

const D = (key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes) =>
  ({ key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes });

const DEFS = [
  // ===== CORÉE =====
  D("jjajangmyeon","Jjajangmyeon","Jjajangmyeon","🍜","plats","coree","45 min","⭐⭐ Moyen",
    "Nouilles coréennes nappées d'une sauce noire onctueuse à la pâte de soja fermentée, porc et légumes. Réconfortant, légèrement sucré, ultra-populaire.",
    "Korean noodles in a glossy black sauce of fermented bean paste, pork and vegetables. Comforting, lightly sweet, hugely popular.",
    [["nouillesoeuf",90,"g"],["porc",70,"g"],["oignon",50,"g"],["pommedeterre",60,"g"],["saucesoja",12,"ml"]],
    [["🍳","Sauce","Faire revenir la pâte de soja noire (chunjang) dans l'huile."],["🥩","Porc","Saisir le porc en petits dés."],["🥔","Légumes","Ajouter oignon, pomme de terre et courgette en dés."],["♨️","Mijoter","Incorporer la pâte, mouiller et épaissir à la fécule."],["🍜","Nouilles","Cuire les nouilles bien fermes, égoutter."],["🥣","Dresser","Disposer les nouilles, napper de sauce noire."],["🥒","Servir","Garnir de concombre en julienne."]]),
  D("budaejjigae","Budae Jjigae","Budae Jjigae (Army Stew)","🍲","plats","coree","40 min","⭐ Facile",
    "Ragoût coréen né de l'après-guerre : kimchi, saucisses, nouilles instantanées et bouillon piquant au gochujang. Généreux et réconfortant, à partager.",
    "A post-war Korean stew: kimchi, sausages, instant noodles and a spicy gochujang broth. Generous and comforting, made for sharing.",
    [["saucisse",60,"g"],["lardons",40,"g"],["nouillesoeuf",50,"g"],["oignon",40,"g"],["piment",5,"g"]],
    [["🥫","Base","Disposer kimchi, saucisses et lardons dans la marmite."],["🌶️","Bouillon","Mouiller d'un bouillon relevé au gochujang."],["🧅","Légumes","Ajouter oignon, ciboule et champignons."],["♨️","Mijoter","Cuire à feu vif quelques minutes."],["🍜","Nouilles","Plonger les nouilles instantanées en fin de cuisson."],["🧀","Fromage","Poser une tranche de fromage fondant (option)."],["🍽️","Servir","Servir bouillonnant, au centre de la table."]]),

  // ===== JAPON =====
  D("yakisoba","Yakisoba","Yakisoba","🍜","plats","japon","25 min","⭐ Facile",
    "Nouilles japonaises sautées au wok avec porc et chou, laquées d'une sauce sucrée-salée. Le plat de stand de festival, rapide et savoureux.",
    "Japanese noodles stir-fried with pork and cabbage, lacquered in a sweet-savory sauce. The festival-stall classic, quick and tasty.",
    [["nouillesoeuf",90,"g"],["porc",60,"g"],["chou",60,"g"],["carotte",40,"g"],["saucesoja",12,"ml"]],
    [["🍜","Nouilles","Détendre les nouilles à l'eau chaude, égoutter."],["🥩","Viande","Saisir le porc émincé au wok."],["🥬","Légumes","Ajouter chou, carotte et oignon."],["🔥","Sauter","Jeter les nouilles dans le wok brûlant."],["🥫","Sauce","Napper de sauce yakisoba (soja, worcester, sucre)."],["🥄","Mélanger","Faire sauter vif pour bien enrober."],["🍽️","Servir","Parsemer d'algue aonori et gingembre rouge."]]),
  D("omurice","Omurice","Omurice","🍳","plats","japon","30 min","⭐⭐ Moyen",
    "Riz sauté au ketchup et au poulet, enveloppé dans une omelette baveuse. Le comfort food japonais par excellence, joyeux et régressif.",
    "Ketchup-and-chicken fried rice wrapped in a soft omelette. The ultimate Japanese comfort food, cheerful and nostalgic.",
    [["riz",90,"g"],["oeuf",80,"g"],["poulet",60,"g"],["oignon",40,"g"],["petitspois",20,"g"]],
    [["🍚","Riz","Faire sauter le riz avec poulet et oignon."],["🍅","Ketchup","Assaisonner au ketchup, mouler en dôme."],["🥚","Omelette","Battre les œufs avec un peu de lait."],["🍳","Cuire","Cuire une omelette juste prise, baveuse au centre."],["🌯","Envelopper","Déposer le riz et replier l'omelette dessus."],["🥄","Former","Rouler en quenelle lisse sur l'assiette."],["🍽️","Servir","Tracer un trait de ketchup et servir."]]),
  D("hayashi","Hayashi Rice","Hayashi Rice","🍛","plats","japon","50 min","⭐⭐ Moyen",
    "Émincé de bœuf et oignons mijotés dans une sauce brune onctueuse au vin rouge et à la tomate, servi sur du riz. Le cousin doux du curry japonais.",
    "Thinly sliced beef and onions simmered in a silky brown red-wine-and-tomato sauce over rice. The mellow cousin of Japanese curry.",
    [["boeuf",110,"g"],["oignon",60,"g"],["champignon",50,"g"],["riz",90,"g"],["tomate",40,"g"]],
    [["🥩","Bœuf","Saisir les fines lamelles de bœuf."],["🧅","Oignons","Faire fondre les oignons jusqu'à dorés."],["🍄","Champignons","Ajouter les champignons émincés."],["🍷","Mouiller","Singer, mouiller au vin rouge, bouillon et tomate."],["♨️","Mijoter","Cuire jusqu'à une sauce nappante (demi-glace)."],["🍚","Riz","Dresser sur un riz blanc."],["🥛","Finir","Ajouter un filet de crème."]]),

  // ===== CHINE =====
  D("roujiamo","Roujiamo","Roujiamo","🥪","encas","chine","1h30","⭐⭐⭐ Difficile",
    "Le « hamburger chinois » : porc braisé fondant aux épices, glissé dans un petit pain maison croustillant. Street-food millénaire du Shaanxi.",
    "The \"Chinese hamburger\": melting spiced braised pork tucked into a crisp homemade bun. Millennia-old Shaanxi street food.",
    [["porc",120,"g"],["farine",70,"g"],["oignon",30,"g"],["ail",5,"g"],["saucesoja",12,"ml"]],
    [["♨️","Braiser","Mijoter longuement le porc (anis, cannelle, soja)."],["🍴","Effilocher","Hacher la viande fondante avec un peu de jus."],["🥣","Pâte","Pétrir une pâte, façonner des petits pains (mo)."],["🔥","Cuire","Dorer les pains à la poêle puis finir vapeur."],["✂️","Ouvrir","Fendre chaque pain en poche."],["🥢","Garnir","Fourrer de porc et de coriandre."],["🍽️","Servir","Servir bien chaud, jus à part."]]),
  D("hargow","Har Gow","Har Gow (Shrimp Dumplings)","🥟","aperitifs","chine","1h","⭐⭐⭐ Difficile",
    "Raviolis vapeur cantonais à la peau translucide, garnis de crevettes croquantes. Le joyau délicat du dim sum.",
    "Cantonese steamed dumplings with a translucent skin and crunchy shrimp filling. The delicate jewel of dim sum.",
    [["crevettes",90,"g"],["farine",40,"g"],["gingembre",4,"g"],["oignon",15,"g"],["huile",5,"ml"]],
    [["🦐","Farce","Hacher les crevettes, assaisonner (gingembre, sésame, fécule)."],["🥣","Pâte","Ébouillanter l'amidon de blé pour une pâte translucide."],["⚪","Abaisser","Étaler de très fins disques."],["🤏","Plier","Former des aumônières finement plissées."],["💨","Vapeur","Cuire 6-8 min à la vapeur."],["🥢","Sauce","Préparer une sauce soja-vinaigre."],["🍽️","Servir","Servir aussitôt, peau translucide."]]),

  // ===== VIETNAM =====
  D("caolau","Cao Lau","Cao Lau","🍜","plats","vietnam","45 min","⭐⭐ Moyen",
    "Spécialité de Hoi An : nouilles épaisses, porc laqué, herbes fraîches et croûtons croustillants, à peine mouillées de bouillon. Texture unique.",
    "A Hoi An specialty: thick noodles, char-siu pork, fresh herbs and crisp croutons, barely moistened with broth. A unique texture.",
    [["nouilles",90,"g"],["porc",80,"g"],["oignon",30,"g"],["ail",5,"g"],["arachide",12,"g"]],
    [["🥩","Porc","Mariner et rôtir le porc (char siu), puis trancher."],["🍲","Bouillon","Préparer un bouillon parfumé court."],["🍜","Nouilles","Cuire les nouilles épaisses de Hoi An."],["🥣","Dresser","Nouilles avec un fond de bouillon seulement."],["🌿","Garnir","Ajouter porc, herbes et pousses de soja."],["🍘","Croustillant","Parsemer de croûtons de nouilles frites."],["🥜","Servir","Cacahuètes et citron vert."]]),
  D("canhchua","Canh Chua","Canh Chua (Sweet & Sour Soup)","🍲","soupes","vietnam","40 min","⭐⭐ Moyen",
    "Soupe aigre-douce du Sud-Vietnam au poisson, ananas, tomate et gombo, parfumée au tamarin. Vive, fraîche et parfumée.",
    "A sweet-and-sour soup from southern Vietnam with fish, pineapple, tomato and okra, scented with tamarind. Bright, fresh and fragrant.",
    [["poisson",110,"g"],["ananas",50,"g"],["tomate",60,"g"],["gombo",40,"g"],["citronvert",10,"ml"]],
    [["🍲","Bouillon","Porter un bouillon léger à frémissement."],["🍋","Aigre","Ajouter le tamarin (ou citron vert) pour l'acidité."],["🍍","Aromates","Incorporer ananas, tomate et gombo."],["🐟","Poisson","Pocher délicatement le poisson."],["🥢","Assaisonner","Équilibrer nuoc-mâm, sucre et piment."],["🌿","Herbes","Ajouter coriandre longue et germes de soja."],["🍚","Servir","Servir bien chaud avec du riz."]]),
  D("miequang","Mi Quang","Mi Quang","🍜","plats","vietnam","45 min","⭐⭐ Moyen",
    "Nouilles jaunes au curcuma du centre du Vietnam, garnies de porc et crevettes, à peine mouillées, avec galette de riz grillée. Couleurs et croquant.",
    "Turmeric-yellow noodles from central Vietnam topped with pork and shrimp, barely brothy, with toasted rice cracker. Colour and crunch.",
    [["nouilles",90,"g"],["crevettes",50,"g"],["porc",50,"g"],["arachide",15,"g"],["curcuma",1,"g"]],
    [["💛","Marinade","Mariner porc et crevettes au curcuma."],["🍳","Saisir","Faire revenir avec ail et oignon."],["💧","Jus","Mouiller à peine (très peu de bouillon)."],["🍜","Nouilles","Cuire les nouilles jaunes."],["🥣","Dresser","Nouilles, garniture et un fond de jus."],["🍘","Croustillant","Émietter une galette de riz grillée dessus."],["🥜","Servir","Cacahuètes, herbes et citron vert."]]),

  // ===== INDE =====
  D("cholebhature","Chole Bhature","Chole Bhature","🫓","plats","inde","1h","⭐⭐ Moyen",
    "Curry de pois chiches épicé servi avec un grand pain frit gonflé. Le brunch festif du Pendjab, copieux et parfumé.",
    "A spiced chickpea curry served with a large puffed fried bread. Punjab's festive brunch, hearty and fragrant.",
    [["poischiches",100,"g"],["farine",60,"g"],["oignon",40,"g"],["tomate",60,"g"],["cumin",2,"g"]],
    [["🫘","Pois chiches","Mijoter les pois chiches en sauce épicée (chole)."],["🌶️","Épices","Ajouter cumin, coriandre, garam masala et amchoor."],["🍅","Tomate","Cuire jusqu'à un masala épais."],["🥣","Pâte","Pétrir une pâte levée (bhature)."],["⚪","Abaisser","Étaler des disques."],["🔥","Frire","Frire jusqu'à gonflé et doré."],["🍽️","Servir","Servir chole et bhature avec oignon cru."]]),
  D("bainganbharta","Baingan Bharta","Baingan Bharta","🍆","plats","inde","45 min","⭐ Facile",
    "Caviar d'aubergine indien : aubergine grillée au feu puis écrasée et mijotée aux épices, tomate et oignon. Fumé, fondant, végétarien.",
    "An Indian smoked-eggplant mash: aubergine charred over flame, then crushed and simmered with spices, tomato and onion. Smoky, melting, vegetarian.",
    [["aubergine",180,"g"],["oignon",50,"g"],["tomate",60,"g"],["ail",6,"g"],["piment",3,"g"]],
    [["🔥","Aubergine","Brûler l'aubergine entière jusqu'à la peau noire."],["🥄","Écraser","Peler et écraser la chair fumée."],["🧅","Base","Faire revenir oignon, ail et gingembre."],["🍅","Tomate","Ajouter tomate, cumin et curcuma."],["🍆","Mêler","Incorporer la chair d'aubergine."],["♨️","Mijoter","Cuire jusqu'à fondant."],["🌿","Servir","Parsemer de coriandre, avec naan ou roti."]]),
  D("nihari","Nihari","Nihari","🥘","plats","inde","2h30","⭐⭐ Moyen",
    "Ragoût de bœuf longuement mijoté dans une sauce épicée et onctueuse, traditionnellement dégusté au petit matin. Profond et réconfortant.",
    "A long-simmered beef stew in a rich, spiced gravy, traditionally eaten at dawn. Deep and comforting.",
    [["boeuf",150,"g"],["oignon",50,"g"],["gingembre",6,"g"],["farine",10,"g"],["piment",4,"g"]],
    [["🥩","Saisir","Colorer le bœuf (ou jarret) en morceaux."],["🌶️","Épices","Ajouter le mélange nihari (fenouil, gingembre sec, piment)."],["♨️","Mijoter","Couvrir d'eau et cuire très longtemps."],["🥣","Lier","Délayer la farine et lier la sauce."],["🔥","Réduire","Laisser une sauce onctueuse."],["🫚","Garnir","Gingembre en julienne, piment, citron."],["🍽️","Servir","Servir avec du naan."]]),

  // ===== CARAÏBES =====
  D("ackee","Ackee & Saltfish","Ackee & Saltfish","🟡","plats","caraibes","40 min","⭐⭐ Moyen",
    "Le plat national jamaïcain : morue dessalée et ackee (fruit fondant rappelant l'œuf brouillé) sautés aux oignons, poivrons et piment. Iodé et ensoleillé.",
    "Jamaica's national dish: desalted saltfish and ackee (a soft fruit like scrambled egg) sautéed with onions, peppers and chilli. Briny and sunny.",
    [["morue",120,"g"],["oignon",50,"g"],["tomate",50,"g"],["piment",3,"g"],["huile",10,"ml"]],
    [["🐟","Morue","Dessaler la morue, la pocher et l'effeuiller."],["🟡","Ackee","Égoutter l'ackee (ou le réchauffer à peine)."],["🧅","Base","Faire revenir oignon, poivron et tomate."],["🌶️","Piment","Ajouter piment scotch bonnet et thym."],["🐟","Réunir","Incorporer la morue effeuillée."],["🥄","Ackee","Ajouter l'ackee délicatement sans l'écraser."],["🍌","Servir","Servir avec dumplings frits ou banane plantain."]]),
  D("doubles","Doubles","Doubles","🫓","aperitifs","caraibes","1h","⭐⭐ Moyen",
    "Le street-food n°1 de Trinité : deux galettes moelleuses au curcuma garnies de pois chiches au curry et de chutneys. Épicé, généreux, à la main.",
    "Trinidad's number-one street food: two soft turmeric flatbreads filled with curried chickpeas and chutneys. Spicy, generous, eaten by hand.",
    [["poischiches",80,"g"],["farine",70,"g"],["curcuma",1,"g"],["oignon",20,"g"],["huile",15,"ml"]],
    [["🫘","Channa","Mijoter les pois chiches au curry (channa)."],["🌶️","Épices","Relever de cumin, curcuma et ail."],["🥣","Pâte","Pétrir une pâte au curcuma (bara)."],["⏳","Reposer","Laisser lever la pâte."],["🔥","Frire","Frire de petites galettes souples."],["🥄","Garnir","Garnir de channa, chutney et piment."],["🍽️","Servir","Plier en sandwich, à manger à la main."]]),

  // ===== GRÈCE =====
  D("stifado","Stifado","Stifado","🥘","plats","grece","2h30","⭐⭐ Moyen",
    "Ragoût grec de bœuf aux petits oignons grelots, mijoté au vin rouge, vinaigre et épices douces (cannelle, girofle). Sirupeux et parfumé.",
    "A Greek beef stew with pearl onions, simmered in red wine, vinegar and warm spices (cinnamon, clove). Syrupy and fragrant.",
    [["boeuf",140,"g"],["oignon",90,"g"],["tomate",50,"g"],["vinrouge",15,"ml"],["ail",6,"g"]],
    [["🥩","Bœuf","Saisir les morceaux de bœuf."],["🧅","Oignons","Ajouter une montagne de petits oignons grelots."],["🍷","Mouiller","Concentré de tomate, vin rouge et vinaigre."],["🌿","Épices","Cannelle, laurier, girofle et piment de la Jamaïque."],["♨️","Mijoter","Cuire à feu doux environ 2 h."],["🔥","Réduire","Laisser une sauce sirupeuse, oignons fondants."],["🍽️","Servir","Servir avec riz, pâtes ou purée."]]),
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
console.log("✅ " + DEFS.length + " recettes (retour 1500) insérées (FR 6-8 étapes + EN nom/description).");
