// Vague 1 « Maghreb » (Algérie + Tunisie) : 13 recettes — 6 à 8 étapes chacune.
// Idempotent : retire toute version existante des mêmes clés avant de réinsérer.
// Insère dans js/recettes_plats.js (FR) + js/recettes_en.js (EN). Dosage PAR CONVIVE (base 4).
// Lancer : node tools/_gen_maghreb.mjs
import fs from "fs";

const DATE = "2026-06-26T13:00:00";
const base = 4;

const DEFS = [
  // ---------- ALGÉRIE ----------
  { key:"couscousalgerien", nom:"Couscous Algérien", nomEn:"Algerian Couscous", emoji:"🥘", cat:"plats", pays:"algerie", temps:"1h15", niveau:"⭐⭐ Moyen",
    desc:"Le couscous du vendredi : semoule vapeur, agneau fondant et légumes mijotés (courgette, carotte, pois chiches) dans un bouillon parfumé.",
    descEn:"The Friday couscous: steamed semolina, tender lamb and vegetables (courgette, carrot, chickpeas) simmered in a fragrant broth.",
    ing:[["semoule",80,"g"],["agneau",120,"g"],["courgette",80,"g"],["carotte",70,"g"],["poischiches",30,"g"],["oignon",50,"g"]],
    etapes:[
      ["🔪","Préparer","Couper l'agneau en morceaux, émincer l'oignon, tailler carottes et courgettes."],
      ["🥩","Saisir","Faire revenir l'agneau avec l'oignon dans un filet d'huile."],
      ["🌶️","Parfumer","Ajouter concentré de tomate et ras-el-hanout, mouiller à l'eau."],
      ["🥕","Légumes","Ajouter carottes et pois chiches, mijoter 30 min."],
      ["🥒","Compléter","Ajouter les courgettes en fin de cuisson pour qu'elles restent fermes."],
      ["🌾","Semoule","Rouler la semoule et la cuire à la vapeur en 2-3 passages."],
      ["🧈","Égrainer","Égrainer la semoule au beurre entre chaque cuisson vapeur."],
      ["🍲","Dresser","Dresser la semoule, napper de bouillon, viande et légumes."]
    ] },

  { key:"tajinezitoune", nom:"Tajine Zitoune", nomEn:"Tajine Zitoune (Olive Tagine)", emoji:"🫒", cat:"plats", pays:"algerie", temps:"55 min", niveau:"⭐⭐ Moyen",
    desc:"Tajine algérien de poulet aux olives vertes et citron, dans une sauce blanche onctueuse aux carottes. Élégant et acidulé.",
    descEn:"Algerian chicken tagine with green olives and lemon in a creamy white carrot sauce. Elegant and tangy.",
    ing:[["poulet",150,"g"],["olives",40,"g"],["carotte",60,"g"],["oignon",50,"g"],["citron",20,"g"],["huileOlive",10,"ml"]],
    etapes:[
      ["🔪","Préparer","Détailler le poulet, émincer l'oignon, tailler les carottes en bâtonnets."],
      ["🫒","Dessaler","Faire dégorger les olives vertes à l'eau bouillante pour ôter l'amertume."],
      ["🍗","Dorer","Faire revenir le poulet avec l'oignon dans l'huile d'olive."],
      ["💧","Mouiller","Couvrir d'eau, ajouter les carottes, laisser mijoter 25 min."],
      ["🍋","Aciduler","Ajouter olives et rondelles de citron, poursuivre 10 min."],
      ["🥣","Réduire","Laisser réduire jusqu'à une sauce blanche nappante."],
      ["🍽️","Servir","Servir bien chaud, parsemé de persil, avec du pain ou du riz."]
    ] },

  { key:"rechta", nom:"Rechta", nomEn:"Rechta", emoji:"🍜", cat:"plats", pays:"algerie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Nouilles plates faites main, servies dans une sauce blanche au poulet, pois chiches et navet, parfumée à la cannelle. Plat de fête algérois.",
    descEn:"Handmade flat noodles served in a white chicken sauce with chickpeas and turnip, scented with cinnamon. An Algiers celebration dish.",
    ing:[["farine",80,"g"],["poulet",130,"g"],["poischiches",30,"g"],["navet",60,"g"],["oignon",50,"g"],["cannelle",1,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir farine, eau et sel en une pâte souple, laisser reposer."],
      ["🍜","Étirer","Étirer finement et découper en lanières façon nouilles plates."],
      ["💨","Vapeur","Cuire les rechta à la vapeur en les huilant légèrement."],
      ["🍗","Sauce","Faire revenir le poulet avec l'oignon, couvrir d'eau."],
      ["🌰","Parfumer","Ajouter pois chiches, navet et cannelle, mijoter 25 min."],
      ["🥣","Assembler","Verser un peu de sauce sur les nouilles pour les détendre."],
      ["🍽️","Servir","Dresser les rechta, napper de sauce, poulet et légumes."]
    ] },

  { key:"mhadjeb", nom:"M'hadjeb", nomEn:"M'hadjeb (Stuffed Semolina Crêpes)", emoji:"🫓", cat:"plats", pays:"algerie", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Crêpes feuilletées de semoule farcies d'une fondue de tomate, oignon et poivron. Street-food algérienne dorée à la poêle.",
    descEn:"Flaky semolina crêpes filled with a tomato, onion and pepper compote. Algerian street food, pan-seared golden.",
    ing:[["semoule",100,"g"],["tomate",80,"g"],["oignon",60,"g"],["poivron",40,"g"],["huileOlive",10,"ml"]],
    etapes:[
      ["🥣","Pâte","Pétrir la semoule fine avec eau et sel jusqu'à une pâte lisse."],
      ["⏲️","Reposer","Diviser en boules huilées, laisser reposer 20 min."],
      ["🍅","Farce","Compoter oignon, poivron et tomate avec épices jusqu'à confit."],
      ["🫓","Étaler","Étaler chaque boule très finement sur un plan huilé."],
      ["📦","Farcir","Déposer la farce et replier la pâte en rectangle feuilleté."],
      ["🔥","Dorer","Cuire à la poêle chaude jusqu'à ce que les deux faces dorent."],
      ["🍽️","Servir","Servir tiède, coupé en parts, nature ou avec du petit-lait."]
    ] },

  { key:"berkoukes", nom:"Berkoukes", nomEn:"Berkoukes", emoji:"🍲", cat:"plats", pays:"algerie", temps:"50 min", niveau:"⭐ Facile",
    desc:"Gros plombs de semoule mijotés dans une sauce tomate à l'agneau et aux légumes. Soupe-plat rustique et réconfortante.",
    descEn:"Large semolina pearls simmered in a lamb and vegetable tomato sauce. A rustic, comforting soup-stew.",
    ing:[["semoule",70,"g"],["agneau",90,"g"],["tomate",70,"g"],["courgette",60,"g"],["poischiches",25,"g"],["oignon",50,"g"]],
    etapes:[
      ["🔪","Préparer","Couper l'agneau et les légumes, émincer l'oignon."],
      ["🥩","Revenir","Saisir l'agneau avec l'oignon dans l'huile."],
      ["🍅","Sauce","Ajouter tomate et épices, mouiller largement à l'eau."],
      ["🥕","Légumes","Ajouter pois chiches et légumes, mijoter 20 min."],
      ["🌾","Plombs","Verser les plombs de semoule dans la sauce frémissante."],
      ["⏲️","Cuire","Laisser gonfler les plombs 12-15 min en remuant."],
      ["🍲","Servir","Servir en assiette creuse, bien parfumé et nappé."]
    ] },

  { key:"kalbellouz", nom:"Kalb el Louz", nomEn:"Kalb el Louz (Almond Semolina Cake)", emoji:"🍯", cat:"desserts", pays:"algerie", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Gâteau de semoule à l'amande imbibé d'un sirop au miel et à la fleur d'oranger. « Cœur d'amande », douceur du Ramadan.",
    descEn:"Almond semolina cake soaked in a honey and orange-blossom syrup. \"Heart of almond\", a Ramadan sweet.",
    ing:[["semoule",70,"g"],["amande",30,"g"],["sucre",50,"g"],["miel",20,"g"],["eauFleurOranger",5,"ml"],["beurre",20,"g"]],
    etapes:[
      ["🥣","Mélange","Mélanger semoule, sucre et beurre fondu en sablant bien."],
      ["💧","Hydrater","Ajouter un peu d'eau de fleur d'oranger, laisser reposer 15 min."],
      ["🟫","Étaler","Tasser la moitié dans un plat, parsemer d'amandes, recouvrir."],
      ["🔪","Marquer","Marquer des losanges et poser une amande sur chacun."],
      ["🔥","Cuire","Cuire au four jusqu'à une belle dorure."],
      ["🍯","Sirop","Préparer un sirop miel, sucre et fleur d'oranger."],
      ["💦","Imbiber","Arroser le gâteau chaud de sirop, laisser absorber."],
      ["🍽️","Servir","Détailler les losanges une fois bien imbibés et refroidis."]
    ] },

  { key:"garantita", nom:"Garantita", nomEn:"Garantita (Chickpea Flan)", emoji:"🟡", cat:"aperitifs", pays:"algerie", temps:"50 min", niveau:"⭐ Facile",
    desc:"Flan de farine de pois chiche au cumin, cuit au four et servi en parts. Casse-croûte algérois iconique, doré et fondant.",
    descEn:"Cumin-spiced chickpea-flour flan baked and served in slices. An iconic Algiers snack, golden and soft.",
    ing:[["farinepoischiche",60,"g"],["oeuf",25,"g"],["huileOlive",10,"ml"],["cumin",1,"g"]],
    etapes:[
      ["🥣","Délayer","Délayer la farine de pois chiche dans l'eau sans grumeaux."],
      ["⏲️","Reposer","Laisser reposer 15 min pour hydrater la farine."],
      ["🥚","Lier","Battre l'œuf, l'incorporer avec huile, cumin, sel et poivre."],
      ["🟡","Verser","Verser l'appareil dans un plat huilé sur 2 cm d'épaisseur."],
      ["🔥","Cuire","Enfourner jusqu'à ce que le dessus dore et prenne."],
      ["🔪","Détailler","Laisser tiédir et découper en parts ou en sandwich."],
      ["🌶️","Servir","Servir saupoudré de cumin et de harissa, dans du pain."]
    ] },

  { key:"makrout", nom:"Makrout", nomEn:"Makrout (Date Semolina Pastry)", emoji:"🍯", cat:"desserts", pays:"algerie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Losanges de semoule fourrés à la pâte de dattes, frits puis trempés dans le miel. La pâtisserie reine du Maghreb.",
    descEn:"Semolina diamonds filled with date paste, fried then dipped in honey. The Maghreb's flagship pastry.",
    ing:[["semoule",60,"g"],["dattes",40,"g"],["miel",30,"g"],["beurre",20,"g"],["eauFleurOranger",5,"ml"]],
    etapes:[
      ["🌾","Sabler","Sabler la semoule avec le beurre fondu du bout des doigts."],
      ["💧","Lier","Hydrater à la fleur d'oranger jusqu'à une pâte souple."],
      ["🌴","Dattes","Dénoyauter et écraser les dattes en pâte lisse."],
      ["📏","Façonner","Étaler la semoule, déposer un boudin de dattes, refermer."],
      ["🔪","Découper","Découper en losanges striés à la fourchette."],
      ["🍳","Frire","Frire les makrouts jusqu'à doré (ou cuire au four)."],
      ["🍯","Tremper","Tremper aussitôt dans le miel chaud parfumé."],
      ["🍽️","Servir","Égoutter sur grille et servir avec un thé à la menthe."]
    ] },

  // ---------- TUNISIE ----------
  { key:"couscoustunisien", nom:"Couscous Tunisien au Poisson", nomEn:"Tunisian Fish Couscous", emoji:"🐟", cat:"plats", pays:"tunisie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Couscous de la côte : semoule vapeur, cabillaud et légumes dans un bouillon rouge relevé à l'harissa. Iode et chaleur.",
    descEn:"Coastal couscous: steamed semolina, cod and vegetables in a red harissa-spiced broth. Sea and heat.",
    ing:[["semoule",80,"g"],["cabillaud",130,"g"],["courgette",70,"g"],["poischiches",30,"g"],["harissa",5,"g"],["tomate",60,"g"]],
    etapes:[
      ["🔪","Préparer","Tailler les légumes, portionner le cabillaud."],
      ["🌶️","Base","Faire revenir oignon, tomate et harissa dans l'huile."],
      ["💧","Bouillon","Mouiller à l'eau, ajouter pois chiches, mijoter 20 min."],
      ["🥒","Légumes","Ajouter les courgettes, poursuivre la cuisson."],
      ["🌾","Semoule","Cuire la semoule à la vapeur et l'égrainer à l'huile."],
      ["🐟","Pocher","Pocher le cabillaud quelques minutes dans le bouillon."],
      ["🍲","Dresser","Dresser la semoule, légumes, poisson et bouillon."],
      ["🍋","Servir","Servir avec un trait de citron et de l'harissa à part."]
    ] },

  { key:"kafteji", nom:"Kafteji", nomEn:"Kafteji", emoji:"🍳", cat:"plats", pays:"tunisie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Mélange de légumes frits (poivron, tomate, courgette) hachés au couteau et liés à l'œuf, relevé à l'harissa. Comfort food tunisien.",
    descEn:"Fried vegetables (pepper, tomato, courgette) knife-chopped and bound with egg, spiced with harissa. Tunisian comfort food.",
    ing:[["poivron",80,"g"],["tomate",80,"g"],["courgette",60,"g"],["oeuf",50,"g"],["harissa",5,"g"],["huileOlive",10,"ml"]],
    etapes:[
      ["🔪","Préparer","Couper grossièrement poivron, tomate et courgette."],
      ["🍳","Frire","Frire chaque légume séparément jusqu'à tendreté."],
      ["🥚","Œufs","Frire aussi les œufs (ou les pocher dans la poêle)."],
      ["🔪","Hacher","Réunir le tout et hacher finement au couteau (ou ghalla)."],
      ["🌶️","Assaisonner","Ajouter harissa, ail, sel et un filet d'huile."],
      ["🥣","Mélanger","Mélanger jusqu'à une texture homogène et fondante."],
      ["🍽️","Servir","Servir tiède avec du pain et des câpres."]
    ] },

  { key:"mloukhia", nom:"Mloukhia Tunisienne", nomEn:"Tunisian Mloukhia", emoji:"🥘", cat:"plats", pays:"tunisie", temps:"2h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de bœuf mijoté très longuement dans une sauce vert sombre de poudre de corète, à l'huile d'olive et à l'ail. Profond et velouté.",
    descEn:"Beef stew slow-cooked in a dark-green jute-leaf-powder sauce with olive oil and garlic. Deep and velvety.",
    ing:[["boeuf",130,"g"],["mloukhia",25,"g"],["huileOlive",15,"ml"],["ail",5,"g"],["coriandre",3,"g"]],
    etapes:[
      ["🌿","Torréfier","Faire revenir doucement la poudre de mloukhia dans l'huile."],
      ["🥣","Délayer","Délayer petit à petit avec de l'eau pour éviter les grumeaux."],
      ["🧄","Parfumer","Ajouter l'ail écrasé, laurier et coriandre."],
      ["🥩","Viande","Ajouter le bœuf en morceaux dans la sauce."],
      ["⏲️","Mijoter","Mijoter à feu très doux 1h30 en remuant régulièrement."],
      ["🫒","Lier","La sauce doit foncer et épaissir, ajuster l'huile d'olive."],
      ["🍽️","Servir","Servir bien velouté avec du pain pour saucer."]
    ] },

  { key:"bambalouni", nom:"Bambalouni", nomEn:"Bambalouni", emoji:"🍩", cat:"desserts", pays:"tunisie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Beignet tunisien en anneau, frit minute et roulé dans le sucre. Croustillant dehors, moelleux dedans — souvenir de bord de mer.",
    descEn:"Tunisian ring doughnut, fried to order and rolled in sugar. Crisp outside, fluffy inside — a seaside memory.",
    ing:[["farine",70,"g"],["sucre",25,"g"],["huilefriture",30,"ml"]],
    etapes:[
      ["🥣","Pâte","Mélanger farine, levure, sel et eau en une pâte molle et collante."],
      ["⏲️","Pousser","Couvrir et laisser lever 1h jusqu'au doublement."],
      ["💧","Mains","Se mouiller les mains pour façonner sans que ça colle."],
      ["⭕","Former","Prélever une boule, percer un trou au centre, étirer en anneau."],
      ["🍩","Frire","Plonger dans l'huile chaude et frire jusqu'à doré des deux côtés."],
      ["🧻","Égoutter","Égoutter sur papier absorbant."],
      ["🍬","Sucrer","Rouler généreusement dans le sucre et déguster chaud."]
    ] },

  { key:"tajinmalsouka", nom:"Tajine Malsouka", nomEn:"Tajine Malsouka", emoji:"🥧", cat:"plats", pays:"tunisie", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Tajine tunisien (rien à voir avec le marocain) : sorte de gratin de viande hachée, œufs et feuilles de brick, cuit au four. Doré et nourrissant.",
    descEn:"Tunisian tajine (nothing like the Moroccan one): a baked gratin of minced meat, eggs and brick pastry. Golden and hearty.",
    ing:[["feuillebrick",30,"g"],["boeufHache",100,"g"],["oeuf",50,"g"],["oignon",40,"g"],["persil",5,"g"]],
    etapes:[
      ["🧅","Revenir","Faire revenir l'oignon, puis la viande hachée avec les épices."],
      ["🌿","Parfumer","Ajouter persil haché et un peu de fromage, laisser tiédir."],
      ["🥚","Œufs","Battre les œufs, y mélanger la farce refroidie."],
      ["🥧","Chemiser","Chemiser un plat de feuilles de brick huilées."],
      ["📦","Garnir","Verser l'appareil et replier les feuilles par-dessus."],
      ["🔥","Cuire","Enfourner jusqu'à ce que le tajine prenne et dore."],
      ["🔪","Servir","Laisser tiédir, démouler et couper en parts."]
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
// Idempotence : retire une propriété par sa clé (brace-matching) si elle existe déjà.
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
console.log("✅ " + DEFS.length + " recettes Maghreb (ré)insérées à 6-8 étapes (FR + EN).");
