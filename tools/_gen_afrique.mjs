// Vague 3 « Afrique de l'Ouest » (Ghana + Côte d'Ivoire + Cameroun) : 19 recettes.
// Insère dans js/recettes_plats.js (FR) + js/recettes_en.js (EN). Dosage PAR CONVIVE (base 4).
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
    etapes:[["🫘","Haricots","Cuire les haricots avec les feuilles de sorgho."],["🍚","Riz","Ajouter le riz et laisser cuire ensemble."],["🍽️","Servir","Servir avec sauce piment et accompagnements."]] },

  { key:"groundnutsoup", nom:"Soupe à l'Arachide", nomEn:"Groundnut Soup (Nkatenkwan)", emoji:"🥜", cat:"soupes", pays:"ghana", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Soupe onctueuse de pâte d'arachide au poulet, tomate et gingembre. Le réconfort velouté du dimanche ghanéen, servi avec du riz.",
    descEn:"A creamy peanut-butter soup with chicken, tomato and ginger. Ghana's velvety Sunday comfort, served with rice.",
    ing:[["poulet",130,"g"],["beurrecacahuete",40,"g"],["tomate",70,"g"],["oignon",40,"g"],["gingembre",5,"g"]],
    etapes:[["🍗","Mijoter","Mijoter le poulet avec oignon et tomate."],["🥜","Lier","Délayer la pâte d'arachide dans le bouillon."],["🍲","Réduire","Laisser épaissir en soupe onctueuse."]] },

  { key:"banku", nom:"Banku", nomEn:"Banku", emoji:"🍙", cat:"plats", pays:"ghana", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Pâte légèrement fermentée de maïs et de manioc, travaillée en boule lisse. L'accompagnement acidulé des soupes et sauces ghanéennes.",
    descEn:"A lightly fermented corn-and-cassava dough worked into a smooth ball. The tangy companion to Ghanaian soups and stews.",
    ing:[["farineMais",70,"g"],["manioc",50,"g"]],
    etapes:[["🥣","Mélanger","Mélanger pâtes de maïs et de manioc fermentées."],["🔥","Cuire","Travailler à feu doux jusqu'à une pâte lisse."],["🍙","Former","Façonner en boules régulières."]] },

  { key:"lightsoup", nom:"Light Soup Ghanéenne", nomEn:"Ghanaian Light Soup", emoji:"🍜", cat:"soupes", pays:"ghana", temps:"50 min", niveau:"⭐ Facile",
    desc:"Bouillon clair et relevé au poisson, tomate, gingembre et piment. Léger, parfumé et réputé revigorant quand on couve un rhume.",
    descEn:"A clear, spicy broth with fish, tomato, ginger and chilli. Light, fragrant and famously revitalising when a cold strikes.",
    ing:[["poisson",130,"g"],["tomate",80,"g"],["gingembre",5,"g"],["piment",3,"g"],["oignon",40,"g"]],
    etapes:[["🍅","Base","Mixer tomate, oignon, gingembre et piment."],["💧","Bouillon","Cuire dans l'eau jusqu'à parfumer."],["🐟","Poisson","Pocher le poisson dans le bouillon."]] },

  { key:"kontomire", nom:"Kontomire (Sauce Palabre)", nomEn:"Kontomire (Palaver Sauce)", emoji:"🥬", cat:"plats", pays:"ghana", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de feuilles vertes à l'huile de palme, poisson et oignon. La sauce aux épinards de cocoyam, riche et terreuse.",
    descEn:"A stew of greens in palm oil with fish and onion. The cocoyam-leaf spinach sauce, rich and earthy.",
    ing:[["epinard",120,"g"],["huilePalme",10,"ml"],["poisson",80,"g"],["oignon",40,"g"],["tomate",50,"g"]],
    etapes:[["🥬","Feuilles","Blanchir et hacher les feuilles vertes."],["🌴","Base","Faire revenir oignon et tomate à l'huile de palme."],["🐟","Mijoter","Ajouter feuilles et poisson, mijoter."]] },

  { key:"tatale", nom:"Tatalé", nomEn:"Tatale (Plantain Pancakes)", emoji:"🥞", cat:"encas", pays:"ghana", temps:"30 min", niveau:"⭐ Facile",
    desc:"Galettes de plantain bien mûr relevées au gingembre et au piment, frites dorées. Le goûter sucré-épicé du Ghana.",
    descEn:"Ripe-plantain fritters spiked with ginger and chilli, fried golden. Ghana's sweet-and-spicy snack.",
    ing:[["plantain",120,"g"],["farine",30,"g"],["oignon",20,"g"],["gingembre",3,"g"],["piment",2,"g"]],
    etapes:[["🍌","Écraser","Écraser le plantain mûr en purée."],["🥣","Pâte","Ajouter farine, oignon, gingembre et piment."],["🔥","Frire","Frire en petites galettes dorées."]] },

  { key:"shito", nom:"Shito", nomEn:"Shito (Black Pepper Sauce)", emoji:"🌶️", cat:"sauces", pays:"ghana", temps:"40 min", niveau:"⭐ Facile",
    desc:"Sauce piment noire ghanéenne, longuement mijotée à l'huile avec crevettes, oignon et gingembre. Se garde et relève absolument tout.",
    descEn:"Ghana's black chilli sauce, slow-cooked in oil with shrimp, onion and ginger. It keeps well and lifts absolutely everything.",
    ing:[["piment",20,"g"],["crevettes",20,"g"],["oignon",30,"g"],["tomate",30,"g"],["huile",30,"ml"],["gingembre",5,"g"]],
    etapes:[["🧅","Réduire","Réduire oignon, tomate, gingembre en purée."],["🌶️","Cuire","Cuire longuement à l'huile avec piment et crevettes."],["🫙","Conserver","Mettre en pot, la sauce fonce et se bonifie."]] },

  // ---------- CÔTE D'IVOIRE ----------
  { key:"garba", nom:"Garba", nomEn:"Garba", emoji:"🐟", cat:"plats", pays:"cotedivoire", temps:"30 min", niveau:"⭐ Facile",
    desc:"Le street-food ivoirien culte : attiéké et thon frit, oignon et piment. Simple, économique et terriblement addictif.",
    descEn:"The cult Ivorian street food: attiéké and fried tuna with onion and chilli. Simple, cheap and dangerously addictive.",
    ing:[["attieke",100,"g"],["poisson",100,"g"],["oignon",30,"g"],["piment",3,"g"],["huilefriture",15,"ml"]],
    etapes:[["🐟","Frire","Frire le thon en morceaux."],["🍚","Attiéké","Réchauffer l'attiéké à la vapeur."],["🧅","Servir","Servir avec oignon, tomate et piment frais."]] },

  { key:"saucegraine", nom:"Sauce Graine", nomEn:"Sauce Graine (Palm Nut Stew)", emoji:"🌴", cat:"plats", pays:"cotedivoire", temps:"1h15", niveau:"⭐⭐ Moyen",
    desc:"Ragoût onctueux à la pulpe de noix de palme, bœuf et piment. Rouge profond et puissant, servi avec du riz ou du foutou.",
    descEn:"A rich palm-nut-pulp stew with beef and chilli. Deep red and powerful, served with rice or foutou.",
    ing:[["boeuf",120,"g"],["huilePalme",15,"ml"],["tomate",60,"g"],["oignon",40,"g"],["piment",3,"g"]],
    etapes:[["🌴","Base","Délayer la pulpe de noix de palme."],["🥩","Viande","Ajouter le bœuf, oignon et tomate."],["🍲","Mijoter","Mijoter longuement jusqu'à onctuosité."]] },

  { key:"saucearachide", nom:"Sauce Arachide", nomEn:"Peanut Sauce", emoji:"🥜", cat:"plats", pays:"cotedivoire", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût crémeux de poulet à la pâte d'arachide, tomate et gingembre. Riche et nourrissant, le grand classique de toute l'Afrique de l'Ouest.",
    descEn:"A creamy chicken stew with peanut paste, tomato and ginger. Rich and hearty, a great West-African classic.",
    ing:[["poulet",130,"g"],["beurrecacahuete",40,"g"],["tomate",60,"g"],["oignon",40,"g"],["gingembre",5,"g"]],
    etapes:[["🍗","Saisir","Saisir le poulet avec oignon et tomate."],["🥜","Lier","Incorporer la pâte d'arachide."],["🍲","Mijoter","Mijoter jusqu'à une sauce crémeuse."]] },

  { key:"foutou", nom:"Foutou Banane", nomEn:"Foutou (Pounded Plantain)", emoji:"🍌", cat:"plats", pays:"cotedivoire", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Banane plantain et manioc pilés en une pâte lisse et élastique. L'accompagnement incontournable des sauces ivoiriennes.",
    descEn:"Plantain and cassava pounded into a smooth, elastic dough. The essential companion to Ivorian sauces.",
    ing:[["plantain",150,"g"],["manioc",80,"g"]],
    etapes:[["🍌","Cuire","Cuire plantain et manioc à l'eau."],["🪨","Piler","Piler ensemble jusqu'à une pâte lisse."],["🍡","Former","Former des boules à tremper dans la sauce."]] },

  { key:"poissonbraise", nom:"Poisson Braisé", nomEn:"Braised Fish", emoji:"🔥", cat:"plats", pays:"cotedivoire", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Poisson entier mariné au gingembre et citron, braisé au feu de bois. La star des maquis ivoiriens, servie avec attiéké et alloco.",
    descEn:"A whole fish marinated in ginger and lemon, braised over wood fire. The star of Ivorian maquis, served with attiéké and alloco.",
    ing:[["poisson",200,"g"],["oignon",40,"g"],["tomate",40,"g"],["gingembre",5,"g"],["citron",15,"ml"],["piment",3,"g"]],
    etapes:[["🐟","Mariner","Mariner le poisson au gingembre, citron et piment."],["🔥","Braiser","Braiser au gril en arrosant."],["🧅","Servir","Servir avec oignon mariné et attiéké."]] },

  { key:"sauceclaire", nom:"Sauce Claire", nomEn:"Sauce Claire (Okra & Fish)", emoji:"🌿", cat:"plats", pays:"cotedivoire", temps:"50 min", niveau:"⭐ Facile",
    desc:"Bouillon léger lié au gombo, avec poisson, tomate et piment. La sauce gluante et réconfortante du quotidien ivoirien.",
    descEn:"A light okra-thickened broth with fish, tomato and chilli. The slippery, comforting everyday Ivorian sauce.",
    ing:[["poisson",120,"g"],["gombo",40,"g"],["tomate",50,"g"],["oignon",40,"g"],["piment",3,"g"]],
    etapes:[["🍅","Bouillon","Cuire tomate, oignon et piment."],["🌿","Gombo","Ajouter le gombo émincé pour lier."],["🐟","Poisson","Pocher le poisson et servir."]] },

  // ---------- CAMEROUN ----------
  { key:"saucegombo", nom:"Sauce Gombo", nomEn:"Okra Stew", emoji:"🌿", cat:"plats", pays:"cameroun", temps:"50 min", niveau:"⭐ Facile",
    desc:"Ragoût filant de gombo à l'huile de palme et au bœuf, relevé au piment. Texture unique, servi avec un féculent pilé.",
    descEn:"A stringy okra stew in palm oil with beef, spiced with chilli. A unique texture, served with a pounded starch.",
    ing:[["gombo",100,"g"],["boeuf",100,"g"],["huilePalme",10,"ml"],["oignon",40,"g"],["piment",3,"g"]],
    etapes:[["🥩","Viande","Mijoter le bœuf avec oignon."],["🌿","Gombo","Ajouter le gombo émincé."],["🌴","Lier","Finir à l'huile de palme et piment."]] },

  { key:"koki", nom:"Koki", nomEn:"Koki (Black-Eyed Pea Cake)", emoji:"🫘", cat:"plats", pays:"cameroun", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Flan de niébé moulu à l'huile de palme et aux épinards, cuit vapeur en feuilles de bananier. Onctueux et nourrissant.",
    descEn:"A ground black-eyed-pea flan with palm oil and greens, steamed in banana leaves. Creamy and nourishing.",
    ing:[["haricots",100,"g"],["huilePalme",10,"ml"],["epinard",40,"g"],["piment",3,"g"]],
    etapes:[["🫘","Moudre","Moudre les niébés en pâte lisse."],["🌴","Mélanger","Incorporer huile de palme, épinards et piment."],["💨","Vapeur","Cuire vapeur en papillotes de feuilles."]] },

  { key:"kondre", nom:"Kondré", nomEn:"Kondré (Plantain & Beef Stew)", emoji:"🍌", cat:"plats", pays:"cameroun", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût de plantains et de bœuf aux épices, mijoté jusqu'au fondant. Plat de fête de l'Ouest camerounais.",
    descEn:"A spiced plantain-and-beef stew, simmered until meltingly tender. A celebration dish of western Cameroon.",
    ing:[["plantain",150,"g"],["boeuf",120,"g"],["tomate",50,"g"],["oignon",40,"g"],["gingembre",5,"g"]],
    etapes:[["🥩","Saisir","Saisir le bœuf avec oignon et tomate."],["🍌","Plantain","Ajouter les plantains en morceaux."],["🍲","Mijoter","Mijoter jusqu'à ce que tout soit fondant."]] },

  { key:"mbongotchobi", nom:"Mbongo Tchobi", nomEn:"Mbongo Tchobi (Black Stew)", emoji:"🖤", cat:"plats", pays:"cameroun", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Ragoût noir et puissant de poisson aux épices brûlées (mbongo). Spectaculaire, fumé et profondément parfumé.",
    descEn:"A black, powerful fish stew made with charred mbongo spices. Spectacular, smoky and deeply fragrant.",
    ing:[["poisson",150,"g"],["tomate",50,"g"],["oignon",40,"g"],["piment",3,"g"],["gingembre",5,"g"]],
    etapes:[["🔥","Épices","Torréfier les épices mbongo jusqu'au noir, moudre."],["🥣","Sauce","Mélanger aux aromates et délayer."],["🐟","Mijoter","Mijoter le poisson dans la sauce noire."]] },

  { key:"achu", nom:"Achu (Soupe Jaune)", nomEn:"Achu (Yellow Soup)", emoji:"🟡", cat:"plats", pays:"cameroun", temps:"1h30", niveau:"⭐⭐⭐ Difficile",
    desc:"Pâte d'igname pilée servie avec une soupe jaune à l'huile de palme et au bœuf. Plat cérémoniel des Grassfields.",
    descEn:"Pounded yam paste served with a yellow palm-oil-and-beef soup. A ceremonial dish of the Grassfields.",
    ing:[["igname",150,"g"],["huilePalme",15,"ml"],["boeuf",80,"g"],["oignon",30,"g"]],
    etapes:[["🍠","Piler","Cuire et piler l'igname en pâte lisse."],["🟡","Soupe","Émulsionner l'huile de palme en soupe jaune."],["🥩","Servir","Servir la pâte avec la soupe et le bœuf."]] },

  { key:"brochettescamerounaises", nom:"Brochettes Soya", nomEn:"Soya (Cameroonian Beef Skewers)", emoji:"🍢", cat:"aperitifs", pays:"cameroun", temps:"35 min", niveau:"⭐ Facile",
    desc:"Brochettes de bœuf grillées et enrobées d'un mélange épicé à l'arachide. Le « soya » des soirées camerounaises au charbon.",
    descEn:"Grilled beef skewers coated in a spiced peanut rub. The \"soya\" of Cameroonian charcoal-grill evenings.",
    ing:[["boeuf",150,"g"],["oignon",30,"g"],["gingembre",5,"g"],["piment",3,"g"],["arachide",10,"g"]],
    etapes:[["🔪","Mariner","Couper le bœuf, mariner au gingembre et piment."],["🍢","Embrocher","Embrocher et griller au charbon."],["🥜","Soya","Rouler dans la poudre d'arachide épicée."]] },
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
function inserer(file, marqueur, bloc) {
  let src = fs.readFileSync(file, "utf8");
  const idx = src.lastIndexOf(marqueur);
  if (idx < 0) throw new Error("Marqueur introuvable dans " + file);
  let head = src.slice(0, idx).replace(/\s+$/, "");
  if (!head.endsWith(",")) head += ",";
  src = head + "\n" + bloc + "\n" + src.slice(idx);
  fs.writeFileSync(file, src);
}
inserer("js/recettes_plats.js", "});", DEFS.map(recetteFR).join(",\n"));
inserer("js/recettes_en.js", "};", DEFS.map(recetteEN).join(",\n"));
console.log("✅ " + DEFS.length + " recettes Afrique de l'Ouest insérées (FR + EN).");
