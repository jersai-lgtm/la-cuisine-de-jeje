// Retour à 1500 (bis) : 8 plats vraiment nouveaux (dédup clé + nom + synonymes vérifiée).
// 6 à 8 étapes. Idempotent. FR + EN nom/description. node tools/_gen_retour1500b.mjs
import fs from "fs";
const DATE = "2026-06-29T16:00:00";
const base = 4;

const D = (key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes) =>
  ({ key, nom, nomEn, emoji, cat, pays, temps, niveau, desc, descEn, ing, etapes });

const DEFS = [
  D("jjamppong","Jjamppong","Jjamppong","🍜","soupes","coree","45 min","⭐⭐ Moyen",
    "Soupe de nouilles coréenne rouge feu aux fruits de mer, piquante et iodée. Le pendant épicé du jjajangmyeon, réconfortant et puissant.",
    "A fiery-red Korean seafood noodle soup, spicy and briny. The hot counterpart to jjajangmyeon, comforting and bold.",
    [["nouillesoeuf",90,"g"],["crevettes",40,"g"],["moules",40,"g"],["oignon",40,"g"],["piment",5,"g"]],
    [["🌶️","Base","Faire revenir oignon, ail et beaucoup de piment (gochugaru) à l'huile."],["🦐","Fruits de mer","Ajouter crevettes, moules et calamars."],["💧","Bouillon","Mouiller d'un bouillon et porter à ébullition."],["🥬","Légumes","Ajouter chou et courgette émincés."],["🍜","Nouilles","Cuire les nouilles bien fermes à part."],["🥣","Dresser","Répartir les nouilles, verser la soupe brûlante."],["🍽️","Servir","Servir aussitôt, très chaud."]]),

  D("yukgaejang","Yukgaejang","Yukgaejang","🍲","soupes","coree","1h30","⭐⭐ Moyen",
    "Soupe coréenne épicée de bœuf effiloché, longuement mijotée avec champignons et œuf filé. Profonde, pimentée et revigorante.",
    "A spicy Korean soup of shredded beef, long-simmered with mushrooms and egg ribbons. Deep, fiery and restorative.",
    [["boeuf",100,"g"],["oeuf",40,"g"],["champignon",40,"g"],["oignon",40,"g"],["piment",5,"g"]],
    [["🥩","Bœuf","Cuire le bœuf à l'eau puis l'effilocher, garder le bouillon."],["🌶️","Piment","Préparer une huile au piment (gochugaru) et ail."],["🍄","Légumes","Ajouter champignons, ciboule et germes de soja."],["♨️","Mijoter","Remettre bœuf et huile pimentée dans le bouillon."],["🥚","Œuf","Verser l'œuf battu en filet."],["⏲️","Cuire","Laisser mijoter pour développer les saveurs."],["🍚","Servir","Servir bien chaud avec du riz."]]),

  D("oden","Oden","Oden","🍢","plats","japon","1h","⭐ Facile",
    "Pot-au-feu japonais : œufs, radis blanc et garnitures mijotés doucement dans un bouillon dashi parfumé. Réconfort d'hiver tout en douceur.",
    "A Japanese simmered hot pot: eggs, white radish and assorted bites gently cooked in a fragrant dashi broth. Gentle winter comfort.",
    [["oeuf",50,"g"],["poisson",80,"g"],["navet",80,"g"],["pommedeterre",80,"g"],["saucesoja",12,"ml"]],
    [["🍲","Dashi","Préparer un bouillon dashi (algue kombu, bonite)."],["🥢","Assaisonner","Relever de sauce soja et mirin."],["🥚","Œufs","Ajouter les œufs durs écaillés."],["⚪","Radis","Ajouter le radis blanc (daikon) en gros tronçons."],["🐟","Garnitures","Incorporer les galettes de poisson et la pomme de terre."],["⏲️","Mijoter","Laisser frémir doucement 40 min."],["🍽️","Servir","Servir chaud avec de la moutarde karashi."]]),

  D("bunrieu","Bun Rieu","Bun Rieu","🍜","soupes","vietnam","1h","⭐⭐ Moyen",
    "Soupe de vermicelles vietnamienne au crabe et à la tomate, surmontée d'un flan de crabe moelleux. Acidulée, parfumée et colorée.",
    "A Vietnamese rice-vermicelli soup with crab and tomato, topped with a soft crab custard. Tangy, fragrant and colourful.",
    [["crabe",60,"g"],["crevettes",40,"g"],["tomate",70,"g"],["nouilles",80,"g"],["oeuf",30,"g"]],
    [["🦀","Flan","Mélanger chair de crabe, crevettes et œuf."],["🍅","Bouillon","Faire revenir la tomate, mouiller d'un bouillon."],["🍮","Pocher","Verser le mélange de crabe : il prend en flan dans le bouillon."],["🍋","Aigre","Aciduler au tamarin, assaisonner au nuoc-mâm."],["🍜","Nouilles","Cuire les vermicelles de riz."],["🥣","Dresser","Nouilles, flan de crabe, bouillon par-dessus."],["🌿","Servir","Herbes fraîches, germes de soja et citron vert."]]),

  D("cakhoto","Ca Kho To","Ca Kho To (Caramelized Fish)","🐟","plats","vietnam","45 min","⭐⭐ Moyen",
    "Poisson mijoté en cassolette dans un caramel salé au nuoc-mâm et au poivre. Sucré-salé profond, le plat familial du Sud-Vietnam.",
    "Fish simmered in a clay pot in a salty caramel of fish sauce and pepper. Deeply sweet-savory, the family dish of southern Vietnam.",
    [["poisson",130,"g"],["sucre",12,"g"],["saucesoja",12,"ml"],["oignon",30,"g"],["piment",4,"g"]],
    [["🍯","Caramel","Faire un caramel ambré avec le sucre."],["🥢","Sauce","Déglacer au nuoc-mâm (ou soja) et eau."],["🧅","Aromates","Ajouter échalote, ail et piment."],["🐟","Poisson","Déposer les darnes de poisson dans la cassolette."],["♨️","Mijoter","Cuire à couvert jusqu'à sauce sirupeuse."],["🌶️","Poivrer","Poivrer généreusement en fin de cuisson."],["🍚","Servir","Servir avec du riz blanc."]]),

  D("kadaipaneer","Kadai Paneer","Kadai Paneer","🧀","plats","inde","40 min","⭐⭐ Moyen",
    "Fromage frais indien et poivrons sautés dans une sauce tomate aux épices grillées au mortier. Parfumé, coloré et végétarien.",
    "Indian fresh cheese and peppers stir-fried in a tomato sauce of freshly ground roasted spices. Fragrant, colourful and vegetarian.",
    [["fromage",80,"g"],["poivron",70,"g"],["tomate",60,"g"],["oignon",40,"g"],["gingembre",5,"g"]],
    [["🌶️","Masala","Torréfier et concasser coriandre, cumin et piment (kadai masala)."],["🧅","Base","Faire revenir oignon, ail et gingembre."],["🍅","Tomate","Ajouter la tomate, cuire en sauce épaisse."],["🫑","Poivrons","Sauter les poivrons en gros morceaux (encore croquants)."],["🧀","Paneer","Ajouter le paneer en cubes."],["🥄","Enrober","Mêler au masala, laisser parfumer."],["🌿","Servir","Coriandre et gingembre julienne, avec naan."]]),

  D("haleem","Haleem","Haleem","🥣","plats","inde","2h30","⭐⭐⭐ Difficile",
    "Bouillie onctueuse de bœuf, lentilles et blé, longuement pilée jusqu'à une texture velours. Plat de fête nourrissant et profondément épicé.",
    "A silky porridge of beef, lentils and wheat, long-pounded to a velvet texture. A nourishing, deeply spiced festive dish.",
    [["boeuf",110,"g"],["lentilles",50,"g"],["riz",30,"g"],["oignon",40,"g"],["gingembre",6,"g"]],
    [["🧅","Oignons","Frire des oignons jusqu'à brun doré (birista)."],["🥩","Viande","Saisir le bœuf avec gingembre, ail et épices."],["🫘","Céréales","Ajouter lentilles, blé concassé et riz."],["💧","Mijoter","Couvrir largement d'eau, cuire très longtemps."],["🥄","Piler","Écraser le tout en une bouillie lisse."],["🧈","Lier","Monter au ghee, ajuster les épices (garam masala)."],["🍋","Servir","Garnir d'oignons frits, citron, menthe et gingembre."]]),

  D("callaloo","Callaloo","Callaloo","🥬","plats","caraibes","45 min","⭐ Facile",
    "Ragoût caribéen de feuilles vertes et gombo mijotés au lait de coco, relevé au piment. Onctueux, végétal et ensoleillé.",
    "A Caribbean stew of leafy greens and okra simmered in coconut milk, spiced with chilli. Silky, green and sunny.",
    [["epinard",120,"g"],["gombo",50,"g"],["laitcoco",60,"ml"],["oignon",40,"g"],["piment",4,"g"]],
    [["🧅","Base","Faire revenir oignon, ail, ciboule et thym."],["🥬","Feuilles","Ajouter les feuilles vertes (callaloo ou épinards)."],["🌿","Gombo","Incorporer le gombo en rondelles."],["🥥","Coco","Mouiller au lait de coco."],["🌶️","Piment","Ajouter un piment scotch bonnet entier (sans l'éclater)."],["♨️","Mijoter","Cuire jusqu'à tendreté, écraser grossièrement."],["🍽️","Servir","Servir en accompagnement ou avec du riz."]]),
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
console.log("✅ " + DEFS.length + " recettes (retour 1500 bis) insérées (FR 6-8 étapes + EN nom/description).");
