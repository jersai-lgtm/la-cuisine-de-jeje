// Génère la vague 1 « Maghreb » (Algérie + Tunisie) : 13 recettes.
// Insère dans js/recettes_plats.js (FR) + js/recettes_en.js (EN nom+description).
// Dosage PAR CONVIVE (base 4), tableau 1→15 scalé linéairement. Lancer : node tools/_gen_maghreb.mjs
import fs from "fs";

const DATE = "2026-06-26T13:00:00";
const base = 4;

// [clé ingrédient, quantité PAR CONVIVE, unité]
const DEFS = [
  // ---------- ALGÉRIE ----------
  { key:"couscousalgerien", nom:"Couscous Algérien", nomEn:"Algerian Couscous", emoji:"🥘", cat:"plats", pays:"algerie", temps:"1h15", niveau:"⭐⭐ Moyen",
    desc:"Le couscous du vendredi : semoule vapeur, agneau fondant et légumes mijotés (courgette, carotte, pois chiches) dans un bouillon parfumé.",
    descEn:"The Friday couscous: steamed semolina, tender lamb and vegetables (courgette, carrot, chickpeas) simmered in a fragrant broth.",
    ing:[["semoule",80,"g"],["agneau",120,"g"],["courgette",80,"g"],["carotte",70,"g"],["poischiches",30,"g"],["oignon",50,"g"]],
    etapes:[["🌾","Semoule","Rouler et cuire la semoule à la vapeur, l'égrainer au beurre."],["🥩","Bouillon","Mijoter l'agneau avec oignon, légumes et pois chiches."],["🍲","Dresser","Napper la semoule de bouillon et de viande."]] },

  { key:"tajinezitoune", nom:"Tajine Zitoune", nomEn:"Tajine Zitoune (Olive Tagine)", emoji:"🫒", cat:"plats", pays:"algerie", temps:"55 min", niveau:"⭐⭐ Moyen",
    desc:"Tajine algérien de poulet aux olives vertes et citron, dans une sauce blanche onctueuse aux carottes. Élégant et acidulé.",
    descEn:"Algerian chicken tagine with green olives and lemon in a creamy white carrot sauce. Elegant and tangy.",
    ing:[["poulet",150,"g"],["olives",40,"g"],["carotte",60,"g"],["oignon",50,"g"],["citron",20,"g"],["huileOlive",10,"ml"]],
    etapes:[["🍗","Dorer","Faire revenir le poulet avec l'oignon."],["🫒","Mijoter","Ajouter olives, carottes et citron, couvrir d'eau."],["🥣","Réduire","Laisser réduire en sauce onctueuse."]] },

  { key:"rechta", nom:"Rechta", nomEn:"Rechta", emoji:"🍜", cat:"plats", pays:"algerie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Nouilles plates faites main, servies dans une sauce blanche au poulet, pois chiches et navet, parfumée à la cannelle. Plat de fête algérois.",
    descEn:"Handmade flat noodles served in a white chicken sauce with chickpeas and turnip, scented with cinnamon. An Algiers celebration dish.",
    ing:[["farine",80,"g"],["poulet",130,"g"],["poischiches",30,"g"],["navet",60,"g"],["oignon",50,"g"],["cannelle",1,"g"]],
    etapes:[["🍜","Nouilles","Étirer la pâte en fines lanières, cuire à la vapeur."],["🍲","Sauce blanche","Mijoter poulet, pois chiches, navet et cannelle."],["🥣","Assembler","Verser la sauce sur les nouilles."]] },

  { key:"mhadjeb", nom:"M'hadjeb", nomEn:"M'hadjeb (Stuffed Semolina Crêpes)", emoji:"🫓", cat:"plats", pays:"algerie", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Crêpes feuilletées de semoule farcies d'une fondue de tomate, oignon et poivron. Street-food algérienne dorée à la poêle.",
    descEn:"Flaky semolina crêpes filled with a tomato, onion and pepper compote. Algerian street food, pan-seared golden.",
    ing:[["semoule",100,"g"],["tomate",80,"g"],["oignon",60,"g"],["poivron",40,"g"],["huileOlive",10,"ml"]],
    etapes:[["🫓","Pâte","Pétrir une pâte de semoule souple, étaler finement."],["🍅","Farce","Compoter tomate, oignon et poivron."],["🔥","Cuire","Plier autour de la farce et dorer à la poêle."]] },

  { key:"berkoukes", nom:"Berkoukes", nomEn:"Berkoukes", emoji:"🍲", cat:"plats", pays:"algerie", temps:"50 min", niveau:"⭐ Facile",
    desc:"Gros plombs de semoule mijotés dans une sauce tomate à l'agneau et aux légumes. Soupe-plat rustique et réconfortante.",
    descEn:"Large semolina pearls simmered in a lamb and vegetable tomato sauce. A rustic, comforting soup-stew.",
    ing:[["semoule",70,"g"],["agneau",90,"g"],["tomate",70,"g"],["courgette",60,"g"],["poischiches",25,"g"],["oignon",50,"g"]],
    etapes:[["🥩","Revenir","Saisir l'agneau avec l'oignon."],["🍅","Sauce","Ajouter tomate, légumes et pois chiches."],["🍲","Cuire","Cuire les plombs de semoule dans la sauce."]] },

  { key:"kalbellouz", nom:"Kalb el Louz", nomEn:"Kalb el Louz (Almond Semolina Cake)", emoji:"🍯", cat:"desserts", pays:"algerie", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Gâteau de semoule à l'amande imbibé d'un sirop au miel et à la fleur d'oranger. « Cœur d'amande », douceur du Ramadan.",
    descEn:"Almond semolina cake soaked in a honey and orange-blossom syrup. \"Heart of almond\", a Ramadan sweet.",
    ing:[["semoule",70,"g"],["amande",30,"g"],["sucre",50,"g"],["miel",20,"g"],["eauFleurOranger",5,"ml"],["beurre",20,"g"]],
    etapes:[["🥣","Mélange","Mélanger semoule, amande, sucre et beurre."],["🔥","Cuire","Tasser et cuire au four jusqu'à dorure."],["🍯","Imbiber","Arroser du sirop miel + fleur d'oranger."]] },

  { key:"garantita", nom:"Garantita", nomEn:"Garantita (Chickpea Flan)", emoji:"🟡", cat:"aperitifs", pays:"algerie", temps:"50 min", niveau:"⭐ Facile",
    desc:"Flan de farine de pois chiche au cumin, cuit au four et servi en parts. Casse-croûte algérois iconique, doré et fondant.",
    descEn:"Cumin-spiced chickpea-flour flan baked and served in slices. An iconic Algiers snack, golden and soft.",
    ing:[["farinepoischiche",60,"g"],["oeuf",25,"g"],["huileOlive",10,"ml"],["cumin",1,"g"]],
    etapes:[["🥣","Délayer","Délayer la farine de pois chiche dans l'eau sans grumeaux."],["🥚","Mélanger","Ajouter œuf, huile et cumin."],["🔥","Cuire","Verser en plaque et cuire au four."]] },

  { key:"makrout", nom:"Makrout", nomEn:"Makrout (Date Semolina Pastry)", emoji:"🍯", cat:"desserts", pays:"algerie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Losanges de semoule fourrés à la pâte de dattes, frits puis trempés dans le miel. La pâtisserie reine du Maghreb.",
    descEn:"Semolina diamonds filled with date paste, fried then dipped in honey. The Maghreb's flagship pastry.",
    ing:[["semoule",60,"g"],["dattes",40,"g"],["miel",30,"g"],["beurre",20,"g"],["eauFleurOranger",5,"ml"]],
    etapes:[["🌾","Pâte","Sabler la semoule au beurre, hydrater à la fleur d'oranger."],["🌴","Garnir","Fourrer de pâte de dattes, découper en losanges."],["🍯","Finir","Frire puis tremper dans le miel chaud."]] },

  // ---------- TUNISIE ----------
  { key:"couscoustunisien", nom:"Couscous Tunisien au Poisson", nomEn:"Tunisian Fish Couscous", emoji:"🐟", cat:"plats", pays:"tunisie", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Couscous de la côte : semoule vapeur, cabillaud et légumes dans un bouillon rouge relevé à l'harissa. Iode et chaleur.",
    descEn:"Coastal couscous: steamed semolina, cod and vegetables in a red harissa-spiced broth. Sea and heat.",
    ing:[["semoule",80,"g"],["cabillaud",130,"g"],["courgette",70,"g"],["poischiches",30,"g"],["harissa",5,"g"],["tomate",60,"g"]],
    etapes:[["🌾","Semoule","Cuire la semoule à la vapeur en l'égrainant."],["🌶️","Bouillon","Mijoter tomate, harissa, légumes et pois chiches."],["🐟","Pocher","Pocher le cabillaud dans le bouillon, dresser."]] },

  { key:"kafteji", nom:"Kafteji", nomEn:"Kafteji", emoji:"🍳", cat:"plats", pays:"tunisie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Mélange de légumes frits (poivron, tomate, courgette) hachés au couteau et liés à l'œuf, relevé à l'harissa. Comfort food tunisien.",
    descEn:"Fried vegetables (pepper, tomato, courgette) knife-chopped and bound with egg, spiced with harissa. Tunisian comfort food.",
    ing:[["poivron",80,"g"],["tomate",80,"g"],["courgette",60,"g"],["oeuf",50,"g"],["harissa",5,"g"],["huileOlive",10,"ml"]],
    etapes:[["🍳","Frire","Frire poivron, tomate et courgette."],["🔪","Hacher","Hacher le tout au couteau."],["🥚","Lier","Ajouter œuf brouillé et harissa."]] },

  { key:"mloukhia", nom:"Mloukhia Tunisienne", nomEn:"Tunisian Mloukhia", emoji:"🥘", cat:"plats", pays:"tunisie", temps:"2h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de bœuf mijoté très longuement dans une sauce vert sombre de poudre de corète, à l'huile d'olive et à l'ail. Profond et velouté.",
    descEn:"Beef stew slow-cooked in a dark-green jute-leaf-powder sauce with olive oil and garlic. Deep and velvety.",
    ing:[["boeuf",130,"g"],["mloukhia",25,"g"],["huileOlive",15,"ml"],["ail",5,"g"],["coriandre",3,"g"]],
    etapes:[["🌿","Torréfier","Torréfier la poudre de mloukhia dans l'huile d'olive."],["🥣","Délayer","Délayer progressivement en sauce lisse."],["🥩","Mijoter","Mijoter le bœuf 1h30 jusqu'à fondant."]] },

  { key:"bambalouni", nom:"Bambalouni", nomEn:"Bambalouni", emoji:"🍩", cat:"desserts", pays:"tunisie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Beignet tunisien en anneau, frit minute et roulé dans le sucre. Croustillant dehors, moelleux dedans — souvenir de bord de mer.",
    descEn:"Tunisian ring doughnut, fried to order and rolled in sugar. Crisp outside, fluffy inside — a seaside memory.",
    ing:[["farine",70,"g"],["sucre",25,"g"],["huilefriture",30,"ml"]],
    etapes:[["🥣","Pâte","Préparer une pâte levée souple."],["⭕","Former","Façonner des anneaux à la main."],["🍩","Frire","Frire et rouler dans le sucre."]] },

  { key:"tajinmalsouka", nom:"Tajine Malsouka", nomEn:"Tajine Malsouka", emoji:"🥧", cat:"plats", pays:"tunisie", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Tajine tunisien (rien à voir avec le marocain) : sorte de gratin de viande hachée, œufs et feuilles de brick, cuit au four. Doré et nourrissant.",
    descEn:"Tunisian tajine (nothing like the Moroccan one): a baked gratin of minced meat, eggs and brick pastry. Golden and hearty.",
    ing:[["feuillebrick",30,"g"],["boeufHache",100,"g"],["oeuf",50,"g"],["oignon",40,"g"],["persil",5,"g"]],
    etapes:[["🥩","Revenir","Faire revenir la viande hachée avec l'oignon."],["🥚","Mélanger","Battre les œufs avec persil et feuilles déchirées."],["🔥","Cuire","Verser en plat et cuire au four en gratin."]] },
];

// ---- Génération ----
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

function inserer(file, marqueur, bloc) {
  let src = fs.readFileSync(file, "utf8");
  const idx = src.lastIndexOf(marqueur);
  if (idx < 0) throw new Error("Marqueur introuvable dans " + file);
  let head = src.slice(0, idx).replace(/\s+$/, "");
  if (!head.endsWith(",")) head += ",";
  const tail = src.slice(idx);
  src = head + "\n" + bloc + "\n" + tail;
  fs.writeFileSync(file, src);
}

inserer("js/recettes_plats.js", "});", DEFS.map(recetteFR).join(",\n"));
inserer("js/recettes_en.js", "};", DEFS.map(recetteEN).join(",\n"));
console.log("✅ " + DEFS.length + " recettes Maghreb insérées (FR + EN).");
