// Vague 4 « Amérique latine » (Venezuela + Colombie + Argentine) : 15 recettes — 6 à 8 étapes.
// Idempotent. Insère FR (recettes_plats.js) + EN nom/description (recettes_en.js).
// Les ÉTAPES EN sont ajoutées ensuite par le pipeline de traduction. Lancer : node tools/_gen_latam.mjs
import fs from "fs";

const DATE = "2026-06-26T16:00:00";
const base = 4;

const DEFS = [
  // ---------- VENEZUELA ----------
  { key:"asadonegro", nom:"Asado Negro", nomEn:"Asado Negro (Venezuelan Black Roast)", emoji:"🥩", cat:"plats", pays:"venezuela", temps:"2h30", niveau:"⭐⭐ Moyen",
    desc:"Rôti de bœuf braisé longuement dans un caramel de sucre de canne qui le teinte de noir. Sucré-salé profond, la fierté de Caracas.",
    descEn:"Beef roast slow-braised in a cane-sugar caramel that turns it black. Deep sweet-and-savoury, the pride of Caracas.",
    ing:[["boeuf",180,"g"],["sucreroux",20,"g"],["oignon",50,"g"],["tomate",60,"g"],["ail",5,"g"]],
    etapes:[
      ["🧄","Mariner","Piquer le bœuf, le frotter d'ail, sel et poivre et laisser mariner 1 h."],
      ["🍯","Caramel","Faire fondre le sucre de canne dans l'huile jusqu'à un caramel brun foncé."],
      ["🥩","Saisir","Plonger la pièce dans le caramel et la colorer sur toutes les faces."],
      ["🧅","Aromates","Ajouter oignon, tomate et ail, faire revenir."],
      ["💧","Mouiller","Verser un bouillon à mi-hauteur, couvrir."],
      ["⏲️","Braiser","Braiser à feu doux 2 h en retournant, jusqu'à fondant."],
      ["🖤","Réduire","Retirer la viande, réduire la sauce jusqu'à ce qu'elle nappe et noircisse."],
      ["🍽️","Servir","Trancher finement et napper de sauce, avec riz et plantains."]
    ] },

  { key:"perico", nom:"Perico", nomEn:"Perico (Venezuelan Scrambled Eggs)", emoji:"🍳", cat:"brunch", pays:"venezuela", temps:"20 min", niveau:"⭐ Facile",
    desc:"Œufs brouillés à la vénézuélienne, fondus avec tomate, oignon et poivron. Le petit-déjeuner ensoleillé servi avec arepa.",
    descEn:"Venezuelan-style scrambled eggs folded with tomato, onion and pepper. A sunny breakfast served with arepa.",
    ing:[["oeuf",100,"g"],["tomate",60,"g"],["oignon",40,"g"],["poivron",40,"g"],["beurre",10,"g"]],
    etapes:[
      ["🔪","Préparer","Tailler oignon, poivron et tomate en petits dés."],
      ["🧈","Suer","Faire suer oignon et poivron au beurre 4 min."],
      ["🍅","Tomate","Ajouter la tomate et laisser compoter 3 min."],
      ["🥚","Battre","Battre les œufs avec sel et poivre."],
      ["🍳","Brouiller","Verser les œufs et brouiller doucement à feu moyen."],
      ["🌿","Servir","Servir crémeux, parsemé de coriandre, avec une arepa chaude."]
    ] },

  { key:"caraotas", nom:"Caraotas Negras", nomEn:"Caraotas Negras (Black Beans)", emoji:"🫘", cat:"plats", pays:"venezuela", temps:"1h", niveau:"⭐ Facile",
    desc:"Haricots noirs mijotés au cumin et au poivron, légèrement sucrés. L'incontournable du pabellón, à la fois doux et réconfortant.",
    descEn:"Black beans simmered with cumin and pepper, slightly sweet. The pabellón staple, both sweet and comforting.",
    ing:[["haricotsnoirs",100,"g"],["oignon",50,"g"],["poivron",40,"g"],["ail",5,"g"],["cumin",1,"g"]],
    etapes:[
      ["🫘","Tremper","Faire tremper les haricots noirs la veille."],
      ["💧","Cuire","Les cuire à l'eau jusqu'à tendreté, environ 45 min."],
      ["🧅","Sofrito","Faire revenir oignon, poivron et ail en sofrito."],
      ["🌶️","Épices","Ajouter cumin et un peu de sucre au sofrito."],
      ["🥣","Réunir","Incorporer le sofrito aux haricots avec un peu d'eau de cuisson."],
      ["⏲️","Mijoter","Mijoter 15 min pour lier et parfumer."],
      ["🍽️","Servir","Servir avec riz blanc, bœuf effiloché et plantain."]
    ] },

  { key:"quesillo", nom:"Quesillo", nomEn:"Quesillo (Venezuelan Flan)", emoji:"🍮", cat:"desserts", pays:"venezuela", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Flan vénézuélien au lait concentré, plus dense qu'une crème caramel, criblé de petites bulles caractéristiques. Onctueux et nostalgique.",
    descEn:"A condensed-milk Venezuelan flan, denser than crème caramel, dotted with its trademark little bubbles. Silky and nostalgic.",
    ing:[["oeuf",80,"g"],["laitconcentre",80,"g"],["lait",60,"ml"],["sucre",40,"g"]],
    etapes:[
      ["🍯","Caramel","Faire un caramel ambré avec le sucre et en napper le moule."],
      ["🥚","Appareil","Mixer œufs, lait concentré et lait avec une pointe de vanille."],
      ["🫧","Verser","Verser sur le caramel (les bulles feront les trous typiques)."],
      ["♨️","Bain-marie","Cuire au four à 160°C au bain-marie 45 min."],
      ["🔪","Vérifier","Vérifier la prise : la lame doit ressortir propre."],
      ["❄️","Réfrigérer","Laisser refroidir puis réfrigérer au moins 4 h."],
      ["🍽️","Démouler","Démouler sur une assiette pour libérer le caramel et servir frais."]
    ] },

  { key:"empanadasvenezolanas", nom:"Empanadas Vénézuéliennes", nomEn:"Venezuelan Empanadas", emoji:"🥟", cat:"encas", pays:"venezuela", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Chaussons de farine de maïs frits, fourrés de bœuf épicé. Croustillants et dorés, le casse-croûte des plages vénézuéliennes.",
    descEn:"Fried corn-flour turnovers filled with spiced beef. Crisp and golden, the snack of Venezuelan beaches.",
    ing:[["farineMais",80,"g"],["boeuf",80,"g"],["oignon",40,"g"],["poivron",30,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🥩","Farce","Mijoter le bœuf haché avec oignon, poivron et épices jusqu'à sec."],
      ["🌽","Pâte","Pétrir la farine de maïs avec de l'eau tiède et du sel en pâte souple."],
      ["⚪","Étaler","Étaler des disques de pâte entre deux feuilles plastique."],
      ["🥄","Garnir","Déposer la farce sur une moitié de chaque disque."],
      ["🌙","Fermer","Replier en demi-lune et souder les bords à la fourchette."],
      ["🔥","Chauffer","Chauffer l'huile de friture à 180°C."],
      ["🍳","Frire","Frire les empanadas jusqu'à doré et croustillant."],
      ["🍋","Servir","Égoutter et servir chaud avec une sauce guasacaca."]
    ] },

  { key:"mandoca", nom:"Mandoca", nomEn:"Mandoca", emoji:"🍩", cat:"brunch", pays:"venezuela", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Anneaux frits de farine de maïs et plantain mûr, sucrés à la panela et fourrés de fromage. Le petit-déjeuner gourmand du Zulia.",
    descEn:"Fried rings of corn flour and ripe plantain, sweetened with panela and filled with cheese. Zulia's indulgent breakfast.",
    ing:[["plantain",80,"g"],["farineMais",60,"g"],["sucreroux",15,"g"],["fromagerape",30,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🍌","Purée","Cuire le plantain mûr et l'écraser en purée."],
      ["🍯","Sucrer","Fondre la panela (sucre de canne) et l'ajouter à la purée tiède."],
      ["🌽","Pâte","Incorporer farine de maïs et fromage râpé jusqu'à une pâte malléable."],
      ["⭕","Former","Façonner des boudins et les fermer en anneaux."],
      ["🔥","Chauffer","Chauffer l'huile à 170°C."],
      ["🍩","Frire","Frire les anneaux jusqu'à doré uniforme."],
      ["🍽️","Servir","Égoutter et servir chaud, nature ou avec du fromage."]
    ] },

  // ---------- COLOMBIE ----------
  { key:"lechona", nom:"Lechona", nomEn:"Lechona (Stuffed Roast Pork)", emoji:"🐷", cat:"plats", pays:"colombie", temps:"3h", niveau:"⭐⭐⭐ Difficile",
    desc:"Porc rôti farci de riz, petits pois et épices, à la peau ultra-croustillante. Le plat de fête du Tolima, servi en grandes tablées.",
    descEn:"Roast pork stuffed with rice, peas and spices, with ultra-crisp skin. The festive dish of Tolima, served at big gatherings.",
    ing:[["porc",180,"g"],["riz",50,"g"],["petitspois",30,"g"],["oignon",40,"g"],["cumin",1,"g"]],
    etapes:[
      ["🔪","Préparer","Détailler le porc et l'assaisonner d'ail, cumin, oignon et sel."],
      ["⏳","Mariner","Laisser mariner plusieurs heures au frais."],
      ["🍚","Riz","Cuire le riz al dente avec les petits pois."],
      ["🥣","Farce","Mélanger la viande, le riz et les épices."],
      ["🌯","Garnir","Garnir et rouler en gardant la peau à l'extérieur."],
      ["🔥","Rôtir","Rôtir au four à 160°C pendant 2 à 3 h."],
      ["✨","Croustiller","Monter à 220°C en fin de cuisson pour rendre la peau croustillante."],
      ["🍽️","Servir","Découper et servir avec arepa et pommes de terre."]
    ] },

  { key:"changua", nom:"Changua", nomEn:"Changua (Milk & Egg Soup)", emoji:"🥚", cat:"brunch", pays:"colombie", temps:"20 min", niveau:"⭐ Facile",
    desc:"Soupe matinale de lait et d'eau où pochent des œufs entiers, parfumée à l'oignon nouveau et à la coriandre. Le réveil doux des Andes.",
    descEn:"A morning milk-and-water soup with whole poached eggs, scented with spring onion and coriander. The Andes' gentle wake-up.",
    ing:[["lait",150,"ml"],["oeuf",50,"g"],["oignonNouveau",20,"g"],["pain",40,"g"],["coriandre",2,"g"]],
    etapes:[
      ["🥛","Base","Porter à frémissement un mélange moitié lait, moitié eau salée."],
      ["🧅","Parfumer","Ajouter l'oignon nouveau émincé."],
      ["🥚","Pocher","Casser délicatement les œufs entiers et pocher 3 min."],
      ["🍞","Pain","Disposer du pain rassis au fond des bols."],
      ["🥣","Verser","Verser la soupe et les œufs sur le pain."],
      ["🌿","Servir","Parsemer de coriandre fraîche et servir aussitôt."]
    ] },

  { key:"aborrajado", nom:"Aborrajados", nomEn:"Aborrajados (Fried Stuffed Plantain)", emoji:"🍌", cat:"encas", pays:"colombie", temps:"30 min", niveau:"⭐ Facile",
    desc:"Plantain bien mûr fourré de fromage, enrobé de pâte et frit. Sucré-salé fondant, la gourmandise du Valle del Cauca.",
    descEn:"Ripe plantain stuffed with cheese, battered and fried. Melting sweet-and-savoury, the treat of Valle del Cauca.",
    ing:[["plantain",120,"g"],["mozzarella",40,"g"],["farine",20,"g"],["oeuf",25,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🍌","Précuire","Faire revenir des tranches épaisses de plantain mûr jusqu'à doré."],
      ["🫓","Aplatir","Les écraser légèrement et former une poche."],
      ["🧀","Farcir","Glisser un morceau de fromage au centre."],
      ["🥣","Pâte","Préparer une pâte fluide avec farine, œuf et un peu de lait."],
      ["🔥","Chauffer","Chauffer l'huile à 175°C."],
      ["🍳","Frire","Tremper dans la pâte et frire jusqu'à doré."],
      ["🍽️","Servir","Égoutter et servir tiède, le fromage encore coulant."]
    ] },

  { key:"pandebono", nom:"Pandebono", nomEn:"Pandebono (Cheese Bread)", emoji:"🧀", cat:"boulangerie", pays:"colombie", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Petits pains au fromage et à la farine de maïs, moelleux et élastiques, dorés au four. L'odeur des boulangeries colombiennes.",
    descEn:"Small cheese-and-corn-flour breads, soft and chewy, baked golden. The smell of Colombian bakeries.",
    ing:[["farineMais",50,"g"],["fromagerape",50,"g"],["oeuf",25,"g"],["beurre",10,"g"]],
    etapes:[
      ["🧀","Mélanger","Mélanger fromage râpé, farine de maïs et fécule."],
      ["🥚","Lier","Ajouter l'œuf et le beurre pour former une pâte homogène."],
      ["💪","Pétrir","Pétrir jusqu'à une pâte lisse et élastique."],
      ["⚪","Façonner","Façonner des boules ou des anneaux réguliers."],
      ["🔥","Préchauffer","Préchauffer le four à 200°C."],
      ["🍞","Cuire","Cuire 15 à 20 min jusqu'à ce qu'ils gonflent et dorent."],
      ["🍽️","Servir","Servir tièdes, c'est là qu'ils sont les meilleurs."]
    ] },

  { key:"arepadehuevo", nom:"Arepa de Huevo", nomEn:"Arepa de Huevo", emoji:"🥚", cat:"encas", pays:"colombie", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Arepa de maïs frite puis ouverte pour y glisser un œuf, et refrite. Spécialité croustillante de la côte caraïbe colombienne.",
    descEn:"A fried corn arepa opened to slip an egg inside, then fried again. A crisp specialty of Colombia's Caribbean coast.",
    ing:[["farineMais",70,"g"],["oeuf",50,"g"],["huilefriture",25,"ml"]],
    etapes:[
      ["🌽","Pâte","Pétrir la farine de maïs avec eau tiède et sel en pâte souple."],
      ["⚪","Former","Former des galettes fines et régulières."],
      ["🔥","Pré-frire","Frire brièvement à 180°C jusqu'à ce qu'elles gonflent."],
      ["✂️","Ouvrir","Ouvrir délicatement une fente sur le bord sans percer."],
      ["🥚","Garnir","Glisser un œuf cru à l'intérieur et refermer."],
      ["🍳","Re-frire","Replonger dans l'huile pour cuire l'œuf et dorer."],
      ["🍽️","Servir","Égoutter et déguster aussitôt, bien chaud."]
    ] },

  // ---------- ARGENTINE ----------
  { key:"asadoargentin", nom:"Asado Argentin", nomEn:"Argentine Asado", emoji:"🔥", cat:"plats", pays:"argentine", temps:"2h", niveau:"⭐⭐ Moyen", liees:["chimichurri"],
    desc:"Le rituel du bœuf grillé lentement sur les braises, juste salé, servi avec du chimichurri. Plus qu'un plat, une institution argentine.",
    descEn:"The ritual of beef grilled slowly over coals, simply salted, served with chimichurri. More than a dish, an Argentine institution.",
    ing:[["boeuf",250,"g"],["ail",5,"g"],["paprika",2,"g"],["huile",10,"ml"]],
    etapes:[
      ["🔥","Braise","Préparer une braise douce et régulière, sans flamme."],
      ["🧂","Saler","Saler généreusement la viande au gros sel juste avant."],
      ["🥩","Poser","Disposer les pièces côté gras vers le bas sur la grille."],
      ["⏲️","Cuire","Griller lentement 40 à 60 min selon l'épaisseur, sans presser."],
      ["🔄","Retourner","Ne retourner qu'une seule fois, à mi-cuisson."],
      ["🌡️","Surveiller","Viser un cœur rosé (≈ 55°C) pour une viande juteuse."],
      ["😴","Reposer","Laisser reposer la viande 5 à 10 min avant de trancher."],
      ["🌿","Servir","Trancher et servir nappé de chimichurri."]
    ] },

  { key:"provoleta", nom:"Provoleta", nomEn:"Provoleta (Grilled Provolone)", emoji:"🧀", cat:"aperitifs", pays:"argentine", temps:"20 min", niveau:"⭐ Facile",
    desc:"Disque de provolone grillé jusqu'à former une croûte dorée et un cœur coulant, parfumé à l'origan. L'entrée star de l'asado.",
    descEn:"A disc of provolone grilled to a golden crust with a molten centre, scented with oregano. The star starter of the asado.",
    ing:[["provolone",90,"g"],["huileOlive",5,"ml"],["pain",40,"g"]],
    etapes:[
      ["🧀","Préparer","Couper le provolone en disque épais et le sécher."],
      ["🌿","Assaisonner","Parsemer d'origan, de flocons de piment et d'un filet d'huile."],
      ["🔥","Chauffer","Chauffer une poêle en fonte ou la grille bien chaude."],
      ["♨️","Griller","Griller 2 à 3 min par face jusqu'à une croûte dorée."],
      ["🫠","Fondre","Le cœur doit devenir coulant sans que le fromage s'étale."],
      ["🍞","Servir","Servir aussitôt avec du pain grillé pour tremper."]
    ] },

  { key:"matambre", nom:"Matambre Arrollado", nomEn:"Matambre Arrollado (Rolled Stuffed Flank)", emoji:"🥩", cat:"entrees", pays:"argentine", temps:"2h", niveau:"⭐⭐⭐ Difficile",
    desc:"Fine bavette roulée autour d'œufs durs, carotte et poivron, pochée puis tranchée. L'entrée froide spectaculaire des fêtes argentines.",
    descEn:"Thin flank steak rolled around hard-boiled eggs, carrot and pepper, poached then sliced. The spectacular cold starter of Argentine celebrations.",
    ing:[["boeuf",150,"g"],["oeuf",50,"g"],["carotte",40,"g"],["poivron",30,"g"],["ail",5,"g"]],
    etapes:[
      ["🔪","Aplatir","Aplatir la bavette en une fine nappe régulière."],
      ["🧄","Assaisonner","Frotter d'ail, persil, sel et poivre."],
      ["🥚","Garnir","Disposer œufs durs, bâtonnets de carotte et lanières de poivron."],
      ["🌯","Rouler","Rouler bien serré dans le sens de la longueur."],
      ["🧵","Ficeler","Ficeler le rouleau pour qu'il garde sa forme."],
      ["💧","Pocher","Pocher dans un bouillon frémissant 1h30."],
      ["❄️","Presser","Laisser refroidir sous presse au réfrigérateur."],
      ["🍽️","Servir","Trancher froid en belles rondelles et servir."]
    ] },

  { key:"humita", nom:"Humita", nomEn:"Humita", emoji:"🌽", cat:"plats", pays:"argentine", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Maïs frais râpé et mijoté avec oignon et fromage, traditionnellement cuit en papillote de feuilles de maïs. Doux, crémeux et réconfortant.",
    descEn:"Fresh grated corn simmered with onion and cheese, traditionally steamed in corn husks. Sweet, creamy and comforting.",
    ing:[["mais",150,"g"],["oignon",40,"g"],["fromagerape",30,"g"],["lait",30,"ml"],["paprika",1,"g"]],
    etapes:[
      ["🌽","Râper","Râper le maïs frais pour obtenir une pulpe."],
      ["🧅","Sofrito","Faire revenir l'oignon avec le paprika."],
      ["🥣","Cuire","Ajouter la pulpe de maïs et le lait, cuire en remuant."],
      ["⏲️","Épaissir","Laisser épaissir 15 min jusqu'à une crème onctueuse."],
      ["🧀","Fromage","Hors du feu, incorporer le fromage."],
      ["🌿","Papillote","Garnir des feuilles de maïs et nouer (ou servir en cocotte)."],
      ["💨","Vapeur","Cuire à la vapeur 20 min si en papillotes."],
      ["🍽️","Servir","Servir chaud, crémeux et légèrement sucré."]
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
  const liees = d.liees ? `\n    liees: ${JSON.stringify(d.liees)},` : "";
  return `  ${d.key}: {
    nom: "${d.nom}",
    cat: "${d.cat}", pays: "${d.pays}",
    base: ${base},
    temps: "${d.temps}",
    niveau: "${d.niveau}",
    emoji: "${d.emoji}",${liees}
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
console.log("✅ " + DEFS.length + " recettes Amérique latine insérées (FR 6-8 étapes + EN nom/description).");
