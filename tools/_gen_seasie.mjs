// Vague 7 « Asie du Sud-Est » (Philippines + Malaisie + Singapour) : 15 recettes — 6 à 8 étapes.
// Idempotent. FR + EN nom/description. Étapes EN via pipeline. node tools/_gen_seasie.mjs
import fs from "fs";
const DATE = "2026-06-27T14:00:00";
const base = 4;

const DEFS = [
  // ---------- PHILIPPINES ----------
  { key:"lechonkawali", nom:"Lechon Kawali", nomEn:"Lechon Kawali", emoji:"🐷", cat:"plats", pays:"philippines", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Poitrine de porc bouillie puis frite jusqu'à une couenne ultra-croustillante, à tremper dans une sauce vinaigrée. Le croustillant philippin par excellence.",
    descEn:"Pork belly boiled then deep-fried to an ultra-crisp crackling, dipped in a vinegary sauce. The ultimate Filipino crunch.",
    ing:[["porc",180,"g"],["ail",8,"g"],["citron",10,"ml"],["saucesoja",10,"ml"],["huilefriture",25,"ml"]],
    etapes:[
      ["💧","Pocher","Pocher la poitrine de porc avec ail, laurier et poivre 40 min."],
      ["🌬️","Sécher","Égoutter et sécher parfaitement, idéalement une nuit au frais."],
      ["🔥","Chauffer","Chauffer l'huile à 180 °C (attention aux projections)."],
      ["🍳","Frire","Frire la poitrine jusqu'à ce que la couenne cloque et dore."],
      ["🔪","Trancher","Laisser reposer puis couper en cubes croustillants."],
      ["🥣","Sauce","Préparer une sauce vinaigre-soja-ail-piment."],
      ["🍽️","Servir","Servir avec du riz et la sauce à tremper."]
    ] },

  { key:"sisig", nom:"Sisig", nomEn:"Sisig", emoji:"🍳", cat:"plats", pays:"philippines", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Porc grillé puis sauté, haché menu, relevé d'oignon, de piment et de calamansi, servi grésillant avec un œuf cassé dessus. Punchy et addictif.",
    descEn:"Grilled-then-sautéed pork, finely chopped, sharpened with onion, chilli and calamansi, served sizzling with a cracked egg on top. Punchy and addictive.",
    ing:[["porc",150,"g"],["oignon",50,"g"],["piment",4,"g"],["oeuf",50,"g"],["citron",10,"ml"]],
    etapes:[
      ["💧","Pocher","Pocher puis griller le porc pour le parfumer."],
      ["🔪","Hacher","Hacher finement la viande au couteau."],
      ["🧅","Sauter","Faire sauter avec oignon et piment."],
      ["🥫","Assaisonner","Ajouter sauce soja, un peu de beurre et calamansi (citron vert)."],
      ["♨️","Grésiller","Servir sur une plaque brûlante."],
      ["🥚","Œuf","Casser un œuf cru sur le sisig et le mélanger à chaud."],
      ["🍽️","Servir","Déguster aussitôt avec du riz."]
    ] },

  { key:"tinola", nom:"Tinola", nomEn:"Tinola (Chicken Ginger Soup)", emoji:"🍲", cat:"soupes", pays:"philippines", temps:"45 min", niveau:"⭐ Facile",
    desc:"Bouillon de poulet au gingembre, légumes verts et chayote, clair et réconfortant. La soupe-maison du dimanche aux Philippines.",
    descEn:"A clear, comforting chicken broth with ginger, greens and chayote. The Filipino Sunday home-soup.",
    ing:[["poulet",150,"g"],["gingembre",10,"g"],["courgette",80,"g"],["epinard",40,"g"],["ail",5,"g"]],
    etapes:[
      ["🧄","Aromates","Faire revenir ail, oignon et gingembre."],
      ["🍗","Poulet","Ajouter le poulet en morceaux et le colorer."],
      ["🥫","Mouiller","Ajouter sauce de poisson et couvrir d'eau."],
      ["⏲️","Mijoter","Mijoter 25 min jusqu'à ce que le poulet soit tendre."],
      ["🥒","Légumes","Ajouter la chayote (ou courgette) et cuire 5 min."],
      ["🥬","Verdure","Incorporer les feuilles vertes en fin de cuisson."],
      ["🍽️","Servir","Servir bien chaud avec du riz."]
    ] },

  { key:"caldereta", nom:"Caldereta", nomEn:"Caldereta (Filipino Beef Stew)", emoji:"🥘", cat:"plats", pays:"philippines", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de bœuf à la tomate, poivrons et pommes de terre, enrichi de pâté de foie qui le rend onctueux. Riche, légèrement piquant, de fête.",
    descEn:"A tomato beef stew with peppers and potatoes, enriched with liver spread for silkiness. Rich, slightly spicy, festive.",
    ing:[["boeuf",150,"g"],["tomate",70,"g"],["poivron",50,"g"],["pommedeterre",80,"g"],["carotte",50,"g"]],
    etapes:[
      ["🥩","Saisir","Colorer le bœuf en cubes, réserver."],
      ["🧅","Sofrito","Faire revenir ail et oignon."],
      ["🍅","Tomate","Ajouter tomate et concentré, laisser réduire."],
      ["💧","Mijoter","Remettre la viande, couvrir d'eau, mijoter 1 h."],
      ["🥔","Légumes","Ajouter pommes de terre et carottes."],
      ["🫘","Lier","Incorporer le pâté de foie et les poivrons, cuire 20 min."],
      ["🌶️","Relever","Ajuster sel, piment et un peu de fromage."],
      ["🍽️","Servir","Servir bien nappé avec du riz."]
    ] },

  { key:"lecheflan", nom:"Leche Flan", nomEn:"Leche Flan", emoji:"🍮", cat:"desserts", pays:"philippines", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Flan philippin ultra-riche aux jaunes d'œufs et lait concentré, sur un caramel ambré. Dense, soyeux, la star de toutes les fêtes.",
    descEn:"An ultra-rich Filipino flan of egg yolks and condensed milk over amber caramel. Dense, silky, the star of every celebration.",
    ing:[["oeuf",80,"g"],["laitconcentre",80,"g"],["lait",50,"ml"],["sucre",40,"g"]],
    etapes:[
      ["🍯","Caramel","Faire un caramel ambré et en napper le moule (llanera)."],
      ["🥚","Jaunes","Mélanger doucement jaunes d'œufs, lait concentré et lait."],
      ["🥣","Filtrer","Passer l'appareil au tamis pour une texture lisse."],
      ["🫧","Verser","Verser sur le caramel en évitant les bulles."],
      ["♨️","Vapeur","Cuire à la vapeur (ou bain-marie) 45 min à feu doux."],
      ["❄️","Réfrigérer","Laisser refroidir puis réfrigérer 4 h."],
      ["🍽️","Démouler","Démouler sur une assiette pour libérer le caramel."]
    ] },

  // ---------- MALAISIE ----------
  { key:"ayampercik", nom:"Ayam Percik", nomEn:"Ayam Percik (Grilled Coconut Chicken)", emoji:"🍗", cat:"plats", pays:"malaisie", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Poulet grillé du Kelantan badigeonné d'une sauce épicée au lait de coco et à la citronnelle. Fumé, crémeux et parfumé.",
    descEn:"Kelantan grilled chicken basted with a spiced coconut-and-lemongrass sauce. Smoky, creamy and fragrant.",
    ing:[["poulet",160,"g"],["laitcoco",60,"ml"],["citronnelle",8,"g"],["piment",4,"g"],["ail",6,"g"]],
    etapes:[
      ["🌿","Pâte","Mixer citronnelle, ail, échalote, piment et gingembre en pâte."],
      ["🔥","Revenir","Faire revenir la pâte d'épices dans l'huile."],
      ["🥥","Sauce","Ajouter le lait de coco et laisser épaissir."],
      ["🍗","Mariner","Enrober le poulet d'une partie de la sauce, mariner 20 min."],
      ["♨️","Griller","Griller le poulet en l'arrosant régulièrement de sauce."],
      ["🥄","Napper","Faire réduire le reste de sauce pour le service."],
      ["🍽️","Servir","Servir nappé, avec du riz et des concombres."]
    ] },

  { key:"rojak", nom:"Rojak", nomEn:"Rojak (Fruit & Veg Salad)", emoji:"🥗", cat:"salades", pays:"malaisie", temps:"25 min", niveau:"⭐ Facile",
    desc:"Salade de fruits et légumes croquants nappée d'une sauce sombre tamarin-cacahuète sucrée-piquante. Le mélange détonnant des marchés malais.",
    descEn:"A crunchy fruit-and-vegetable salad coated in a dark, sweet-spicy tamarind-peanut sauce. The bold mix of Malay markets.",
    ing:[["concombre",80,"g"],["tomate",60,"g"],["tamarin",10,"g"],["arachide",15,"g"],["piment",3,"g"]],
    etapes:[
      ["🔪","Tailler","Couper concombre, ananas et tomate en bouchées."],
      ["🥜","Cacahuètes","Torréfier et concasser grossièrement les cacahuètes."],
      ["🥣","Sauce","Mélanger pâte de tamarin, sucre de palme, piment et pâte de crevette."],
      ["🌶️","Lisser","Délayer en une sauce épaisse et brillante."],
      ["🥗","Mélanger","Enrober les fruits et légumes de sauce."],
      ["🍽️","Servir","Parsemer de cacahuètes et servir aussitôt."]
    ] },

  { key:"mererebus", nom:"Mee Rebus", nomEn:"Mee Rebus", emoji:"🍜", cat:"plats", pays:"malaisie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Nouilles jaunes baignées dans une sauce épaisse, douce et épicée à base de patate douce et de cacahuète, garnies d'œuf et de germes. Réconfortant.",
    descEn:"Yellow noodles in a thick, sweet-spicy sweet-potato-and-peanut gravy, topped with egg and sprouts. Comforting.",
    ing:[["nouillesoeuf",90,"g"],["pommedeterre",80,"g"],["arachide",20,"g"],["tamarin",8,"g"],["germes",30,"g"]],
    etapes:[
      ["🥔","Purée","Cuire et écraser la patate douce (ou pomme de terre)."],
      ["🌿","Épices","Faire revenir une pâte d'épices (citronnelle, piment, ail)."],
      ["🥜","Gravy","Ajouter purée, cacahuète moulue, tamarin et eau, mijoter."],
      ["🥄","Lisser","Cuire jusqu'à une sauce épaisse et nappante."],
      ["🍜","Nouilles","Blanchir les nouilles et les germes de soja."],
      ["🥚","Dresser","Dresser les nouilles, napper de sauce."],
      ["🍽️","Garnir","Garnir d'œuf dur, citron vert et piment."]
    ] },

  { key:"nasikandar", nom:"Nasi Kandar", nomEn:"Nasi Kandar", emoji:"🍛", cat:"plats", pays:"malaisie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Riz vapeur arrosé d'un mélange de currys, avec du poulet et une sauce au lait de coco. Le plat-roi de Penang, généreux et parfumé.",
    descEn:"Steamed rice drenched in a mix of curries, with chicken and a coconut-milk sauce. Penang's king dish, generous and fragrant.",
    ing:[["riz",90,"g"],["poulet",120,"g"],["laitcoco",50,"ml"],["oignon",40,"g"],["piment",4,"g"]],
    etapes:[
      ["🍚","Riz","Cuire le riz vapeur bien aéré."],
      ["🌿","Pâte","Mixer oignon, ail, gingembre et piment."],
      ["🔥","Curry","Faire revenir la pâte avec les épices à curry."],
      ["🍗","Poulet","Ajouter le poulet et le colorer."],
      ["🥥","Mijoter","Verser le lait de coco et mijoter 25 min."],
      ["🥄","Sauces","Préparer 2-3 sauces de curry à mélanger sur le riz."],
      ["🍽️","Servir","Dresser le riz nappé d'un mélange de currys."]
    ] },

  { key:"cendol", nom:"Cendol", nomEn:"Cendol", emoji:"🍧", cat:"desserts", pays:"malaisie", temps:"30 min", niveau:"⭐ Facile",
    desc:"Dessert glacé au lait de coco et sirop de sucre de palme, avec des vermicelles verts à la farine de riz et des haricots rouges. Frais et exotique.",
    descEn:"An iced coconut-milk dessert with palm-sugar syrup, green rice-flour jelly noodles and red beans. Refreshing and exotic.",
    ing:[["laitcoco",100,"ml"],["sucreroux",30,"g"],["farineRiz",20,"g"],["haricotsrouges",20,"g"]],
    etapes:[
      ["🟢","Gelée","Cuire la farine de riz avec eau et colorant pandan en pâte épaisse."],
      ["💧","Vermicelles","Pousser la pâte à travers une passoire dans de l'eau glacée."],
      ["🍯","Sirop","Faire fondre le sucre de palme en sirop épais."],
      ["🫘","Haricots","Cuire les haricots rouges sucrés."],
      ["🧊","Monter","Dans un verre : glace pilée, vermicelles, haricots."],
      ["🥥","Servir","Arroser de lait de coco et de sirop de palme, servir glacé."]
    ] },

  // ---------- SINGAPOUR ----------
  { key:"bakkutteh", nom:"Bak Kut Teh", nomEn:"Bak Kut Teh (Pork Rib Soup)", emoji:"🍲", cat:"soupes", pays:"singapour", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Soupe de travers de porc longuement mijotée dans un bouillon poivré à l'ail et aux herbes. Réconfortant, parfumé, servi avec du riz et du thé.",
    descEn:"Pork ribs slow-simmered in a peppery garlic-and-herb broth. Comforting, fragrant, served with rice and tea.",
    ing:[["porc",180,"g"],["ail",10,"g"],["saucesoja",15,"ml"],["gingembre",8,"g"],["champignon",30,"g"]],
    etapes:[
      ["💧","Blanchir","Blanchir les travers de porc puis les rincer."],
      ["🧄","Bouillon","Mettre porc, têtes d'ail entières et gingembre dans l'eau."],
      ["🌶️","Poivre","Ajouter beaucoup de poivre blanc concassé et les épices."],
      ["⏲️","Mijoter","Mijoter à couvert 1h15 jusqu'à ce que la viande se détache."],
      ["🍄","Champignons","Ajouter les champignons et la sauce soja."],
      ["🧂","Ajuster","Rectifier le poivre et le sel."],
      ["🍽️","Servir","Servir le bouillon et les travers avec du riz."]
    ] },

  { key:"hokkienmee", nom:"Hokkien Mee", nomEn:"Hokkien Mee", emoji:"🍜", cat:"plats", pays:"singapour", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Nouilles sautées de Singapour aux crevettes et à l'œuf, mouillées d'un bouillon de crevette parfumé, relevées de sambal et de citron vert.",
    descEn:"Singapore stir-fried prawn-and-egg noodles, moistened with a fragrant prawn stock, lifted by sambal and lime.",
    ing:[["nouillesoeuf",80,"g"],["crevettes",60,"g"],["oeuf",50,"g"],["germes",30,"g"],["ail",6,"g"]],
    etapes:[
      ["🦐","Bouillon","Décortiquer les crevettes, faire un bouillon avec les carapaces."],
      ["🔥","Wok","Faire chauffer le wok très fort avec de l'huile et de l'ail."],
      ["🦐","Saisir","Saisir les crevettes, réserver."],
      ["🥚","Œuf","Brouiller l'œuf, ajouter les nouilles."],
      ["💧","Mouiller","Mouiller du bouillon de crevette et laisser absorber."],
      ["🌱","Germes","Ajouter germes de soja et crevettes, sauter."],
      ["🍽️","Servir","Servir avec sambal et un quartier de citron vert."]
    ] },

  { key:"chaitowkway", nom:"Chai Tow Kway", nomEn:"Chai Tow Kway (Fried Carrot Cake)", emoji:"🥘", cat:"plats", pays:"singapour", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"« Gâteau de radis » à la farine de riz, coupé en cubes et sauté à l'œuf, à l'ail et au radis salé. Le hawker classique, fondant-croustillant.",
    descEn:"A rice-flour \"radish cake\" cut into cubes and fried with egg, garlic and preserved radish. The classic hawker dish, soft-and-crisp.",
    ing:[["farineRiz",70,"g"],["oeuf",50,"g"],["germes",30,"g"],["ail",6,"g"],["saucesoja",10,"ml"]],
    etapes:[
      ["⬜","Gâteau","Cuire la farine de riz avec du radis râpé en pâte ferme, refroidir."],
      ["🔪","Couper","Démouler et couper en cubes."],
      ["🔥","Sauter","Faire dorer les cubes au wok avec ail et radis salé."],
      ["🥚","Œuf","Verser l'œuf battu et laisser prendre en omelette."],
      ["🥫","Assaisonner","Ajouter sauce soja noire (version « black ») ou claire."],
      ["🌱","Germes","Ajouter germes de soja et ciboule, sauter vivement."],
      ["🍽️","Servir","Servir bien chaud."]
    ] },

  { key:"popiah", nom:"Popiah", nomEn:"Popiah (Fresh Spring Rolls)", emoji:"🌯", cat:"aperitifs", pays:"singapour", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Rouleaux de printemps frais garnis de légumes mijotés (navet/jicama), œuf et cacahuètes, roulés dans une fine crêpe. Frais et croquant.",
    descEn:"Fresh spring rolls filled with stewed vegetables (turnip/jicama), egg and peanuts, wrapped in a thin crêpe. Fresh and crunchy.",
    ing:[["farine",40,"g"],["carotte",60,"g"],["germes",30,"g"],["oeuf",25,"g"],["arachide",15,"g"]],
    etapes:[
      ["🥣","Crêpes","Préparer des crêpes très fines (ou utiliser des galettes du commerce)."],
      ["🥕","Garniture","Mijoter jicama/navet et carotte râpés jusqu'à tendreté."],
      ["🥚","Œuf","Cuire un œuf en fine omelette, tailler en lanières."],
      ["🥜","Préparer","Préparer cacahuètes concassées, germes et sauce sucrée."],
      ["🌯","Garnir","Étaler sauce, salade, garniture, œuf et cacahuètes sur la crêpe."],
      ["🤏","Rouler","Rouler serré en repliant les côtés."],
      ["🍽️","Servir","Couper en tronçons et servir frais."]
    ] },

  { key:"meesiam", nom:"Mee Siam", nomEn:"Mee Siam", emoji:"🍜", cat:"plats", pays:"singapour", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Vermicelles de riz sautés dans une sauce aigre-douce et épicée au tamarin, garnis de crevettes, d'œuf et de germes. Acidulé et coloré.",
    descEn:"Rice vermicelli stir-fried in a sweet-sour, spicy tamarind sauce, topped with prawns, egg and sprouts. Tangy and colourful.",
    ing:[["vermicelles",80,"g"],["crevettes",40,"g"],["tamarin",10,"g"],["germes",30,"g"],["oeuf",50,"g"]],
    etapes:[
      ["💧","Tremper","Faire tremper les vermicelles de riz, égoutter."],
      ["🌿","Pâte","Mixer une pâte de piment, échalote et crevettes séchées."],
      ["🔥","Revenir","Faire revenir la pâte au wok."],
      ["🥫","Sauce","Ajouter jus de tamarin et un peu de sucre."],
      ["🍜","Sauter","Ajouter les vermicelles et bien les enrober, sauter vif."],
      ["🦐","Garnir","Incorporer crevettes et germes de soja."],
      ["🥚","Servir","Servir avec œuf dur, ciboule et citron vert."]
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
console.log("✅ " + DEFS.length + " recettes Asie du Sud-Est insérées (FR 6-8 étapes + EN nom/description).");
