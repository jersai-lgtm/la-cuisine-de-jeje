// Vague 2 « Alpin » (Suisse + Autriche) : 14 recettes.
// Insère dans js/recettes_plats.js (FR) + js/recettes_en.js (EN). Dosage PAR CONVIVE (base 4).
// Lancer : node tools/_gen_alpin.mjs
import fs from "fs";

const DATE = "2026-06-26T14:00:00";
const base = 4;

const DEFS = [
  // ---------- SUISSE ----------
  { key:"fondue", nom:"Fondue Moitié-Moitié", nomEn:"Moitié-Moitié Cheese Fondue", emoji:"🫕", cat:"plats", pays:"suisse", temps:"30 min", niveau:"⭐ Facile",
    desc:"La fondue suisse par excellence : moitié Gruyère, moitié Vacherin fribourgeois, fondus au vin blanc et liés au kirsch. À partager au caquelon.",
    descEn:"The quintessential Swiss fondue: half Gruyère, half Fribourg Vacherin, melted in white wine and bound with kirsch. Shared from the caquelon.",
    ing:[["gruyere",100,"g"],["vacherin",100,"g"],["vinblanc",50,"ml"],["pain",120,"g"],["kirsch",5,"ml"]],
    etapes:[["🧄","Caquelon","Frotter le caquelon à l'ail, verser le vin blanc."],["🧀","Fondre","Faire fondre Gruyère et Vacherin en remuant en 8."],["🍞","Servir","Lier au kirsch et tremper les dés de pain."]] },

  { key:"malakoff", nom:"Malakoffs Vaudois", nomEn:"Vaud Malakoffs (Cheese Fritters)", emoji:"🧀", cat:"aperitifs", pays:"suisse", temps:"30 min", niveau:"⭐⭐ Moyen",
    desc:"Beignets de Gruyère frits du canton de Vaud, croustillants dehors et coulants dedans. La gourmandise des fêtes de la Côte.",
    descEn:"Fried Gruyère fritters from canton Vaud, crisp outside and molten inside. A treat from the Côte region's festivities.",
    ing:[["gruyere",90,"g"],["oeuf",30,"g"],["farine",20,"g"],["vinblanc",10,"ml"],["pain",30,"g"]],
    etapes:[["🧀","Appareil","Mélanger gruyère râpé, œuf, farine et vin blanc."],["🥪","Monter","Étaler sur des tranches de pain."],["🔥","Frire","Frire jusqu'à doré et coulant."]] },

  { key:"papetvaudois", nom:"Papet Vaudois", nomEn:"Papet Vaudois", emoji:"🥬", cat:"plats", pays:"suisse", temps:"1h", niveau:"⭐ Facile",
    desc:"Fondue de poireaux et pommes de terre mijotée au vin blanc, couronnée d'une saucisse aux choux. Le plat d'hiver emblématique du canton de Vaud.",
    descEn:"Leeks and potatoes stewed in white wine, crowned with a cabbage sausage. Canton Vaud's emblematic winter dish.",
    ing:[["poireau",200,"g"],["pommedeterre",150,"g"],["saucisse",120,"g"],["vinblanc",20,"ml"],["creme",20,"ml"]],
    etapes:[["🥬","Fondre","Faire fondre les poireaux émincés au beurre."],["🥔","Mijoter","Ajouter pommes de terre, vin blanc et crème."],["🌭","Cuire","Pocher la saucisse sur le papet jusqu'à cuisson."]] },

  { key:"zopf", nom:"Zopf (Tresse au Beurre)", nomEn:"Zopf (Swiss Butter Braid)", emoji:"🍞", cat:"boulangerie", pays:"suisse", temps:"2h", niveau:"⭐⭐ Moyen",
    desc:"La tresse au beurre du dimanche suisse : mie moelleuse et filante, croûte dorée à l'œuf. Le pain du brunch dominical.",
    descEn:"The Swiss Sunday butter braid: soft, stretchy crumb with an egg-glazed golden crust. The bread of the Sunday brunch.",
    ing:[["farine",100,"g"],["beurre",15,"g"],["lait",60,"ml"],["levure",3,"g"],["oeuf",15,"g"]],
    etapes:[["🥣","Pâte","Pétrir une pâte levée souple, laisser pousser."],["🪢","Tresser","Façonner la tresse à 2 ou 3 brins."],["🔥","Cuire","Dorer à l'œuf et cuire jusqu'à brun doré."]] },

  { key:"fonduechocolat", nom:"Fondue au Chocolat", nomEn:"Chocolate Fondue", emoji:"🍫", cat:"desserts", pays:"suisse", temps:"20 min", niveau:"⭐ Facile",
    desc:"Chocolat suisse fondu à la crème, gardé chaud au caquelon pour y tremper fruits et biscuits. Le dessert convivial par excellence.",
    descEn:"Swiss chocolate melted with cream, kept warm in the caquelon for dipping fruit and biscuits. The ultimate sharing dessert.",
    ing:[["chocolat",70,"g"],["creme",50,"ml"],["sucre",10,"g"]],
    etapes:[["🍫","Fondre","Fondre le chocolat avec la crème au bain-marie."],["🥄","Lisser","Sucrer et lisser jusqu'à brillance."],["🍓","Tremper","Tremper fruits et morceaux de gâteau."]] },

  { key:"zurichgeschnetzeltes", nom:"Émincé Zurichois", nomEn:"Zürich-Style Veal", emoji:"🥘", cat:"plats", pays:"suisse", temps:"35 min", niveau:"⭐⭐ Moyen",
    desc:"Fines lamelles de veau et champignons dans une sauce crémeuse au vin blanc. Le grand classique de Zurich, servi avec des rösti.",
    descEn:"Thin strips of veal and mushrooms in a creamy white-wine sauce. Zürich's great classic, served with rösti.",
    ing:[["veau",150,"g"],["champignon",60,"g"],["creme",40,"ml"],["vinblanc",20,"ml"],["oignon",30,"g"]],
    etapes:[["🥩","Saisir","Saisir vivement les lamelles de veau, réserver."],["🍄","Suer","Faire suer oignon et champignons."],["🥛","Sauce","Déglacer au vin, ajouter la crème, remettre le veau."]] },

  { key:"capuns", nom:"Capuns", nomEn:"Capuns", emoji:"🌿", cat:"plats", pays:"suisse", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Spécialité des Grisons : une pâte à spätzle aux lardons enroulée dans des feuilles de bette, pochée puis gratinée. Rustique et réconfortant.",
    descEn:"A Grisons specialty: bacon spätzle batter wrapped in chard leaves, poached then gratinated. Rustic and comforting.",
    ing:[["blettes",80,"g"],["farine",60,"g"],["oeuf",25,"g"],["lardons",30,"g"],["lait",40,"ml"],["gruyere",20,"g"]],
    etapes:[["🥣","Pâte","Préparer une pâte à spätzle avec lardons."],["🌿","Rouler","Enrouler la pâte dans les feuilles de bette."],["🧀","Gratiner","Pocher au bouillon puis gratiner au gruyère."]] },

  // ---------- AUTRICHE ----------
  { key:"tafelspitz", nom:"Tafelspitz", nomEn:"Tafelspitz (Boiled Beef)", emoji:"🥩", cat:"plats", pays:"autriche", temps:"2h30", niveau:"⭐⭐ Moyen",
    desc:"Bœuf poché lentement dans un bouillon de légumes, tranché et servi avec sauce au raifort. Le plat préféré de l'empereur François-Joseph.",
    descEn:"Beef slowly poached in a vegetable broth, sliced and served with horseradish sauce. Emperor Franz Joseph's favourite dish.",
    ing:[["boeuf",180,"g"],["carotte",60,"g"],["poireau",50,"g"],["oignon",40,"g"]],
    etapes:[["🥩","Pocher","Pocher le bœuf dans un bouillon frémissant."],["🥕","Légumes","Ajouter carotte, poireau et oignon."],["🍽️","Servir","Trancher et servir avec sauce au raifort."]] },

  { key:"frittatensuppe", nom:"Frittatensuppe", nomEn:"Frittatensuppe (Pancake Soup)", emoji:"🍜", cat:"soupes", pays:"autriche", temps:"30 min", niveau:"⭐ Facile",
    desc:"Bouillon de bœuf clair garni de fines lanières de crêpe salée. La soupe viennoise réconfortante par excellence.",
    descEn:"Clear beef broth garnished with thin strips of savoury pancake. The ultimate comforting Viennese soup.",
    ing:[["farine",30,"g"],["oeuf",25,"g"],["lait",50,"ml"],["beurre",5,"g"]],
    etapes:[["🥞","Crêpes","Cuire de fines crêpes salées."],["🔪","Lanières","Les rouler et couper en fines lanières."],["🍜","Servir","Disposer dans un bouillon de bœuf chaud."]] },

  { key:"germknodel", nom:"Germknödel", nomEn:"Germknödel", emoji:"🥟", cat:"desserts", pays:"autriche", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Gros boulette de pâte levée fourrée de confiture de prunes, cuite vapeur, nappée de beurre fondu et de pavot sucré. Dessert des refuges autrichiens.",
    descEn:"A large yeast-dough dumpling filled with plum jam, steamed and topped with melted butter and sweet poppy seeds. A dessert of Austrian mountain huts.",
    ing:[["farine",80,"g"],["lait",50,"ml"],["levure",3,"g"],["confiture",30,"g"],["beurre",15,"g"],["sucre",10,"g"]],
    etapes:[["🥣","Pâte","Préparer une pâte levée moelleuse."],["🥄","Fourrer","Garnir de confiture de prunes, former une boule."],["💨","Vapeur","Cuire vapeur, napper de beurre et pavot sucré."]] },

  { key:"linzertorte", nom:"Linzertorte", nomEn:"Linzertorte", emoji:"🥧", cat:"desserts", pays:"autriche", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"La plus ancienne tarte du monde : pâte sablée aux amandes et à la cannelle, garnie de confiture de groseille et d'un croisillon. Spécialité de Linz.",
    descEn:"The world's oldest cake: an almond-cinnamon shortcrust filled with redcurrant jam under a lattice. A specialty of Linz.",
    ing:[["farine",50,"g"],["poudreamande",40,"g"],["beurre",50,"g"],["confiture",50,"g"],["sucre",30,"g"],["oeuf",15,"g"]],
    etapes:[["🥣","Pâte","Sabler farine, amande, beurre, sucre et cannelle."],["🍓","Garnir","Étaler la confiture, poser le croisillon de pâte."],["🔥","Cuire","Cuire au four jusqu'à doré."]] },

  { key:"kasespatzle", nom:"Käsespätzle", nomEn:"Käsespätzle (Cheese Spätzle)", emoji:"🧀", cat:"plats", pays:"autriche", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Petites pâtes fraîches gratinées au fromage de montagne et couronnées d'oignons frits. Le mac & cheese des Alpes tyroliennes.",
    descEn:"Fresh little noodles gratinated with mountain cheese and topped with fried onions. The Tyrolean Alps' mac & cheese.",
    ing:[["farine",90,"g"],["oeuf",50,"g"],["fromagerape",60,"g"],["oignon",40,"g"],["beurre",15,"g"]],
    etapes:[["🥣","Pâte","Mélanger farine et œufs en pâte à spätzle."],["💧","Pocher","Pousser la pâte dans l'eau bouillante."],["🧀","Gratiner","Alterner spätzle et fromage, garnir d'oignons frits."]] },

  { key:"grostl", nom:"Tiroler Gröstl", nomEn:"Tiroler Gröstl", emoji:"🥔", cat:"plats", pays:"autriche", temps:"35 min", niveau:"⭐ Facile",
    desc:"Poêlée tyrolienne de pommes de terre et bœuf rissolés à l'oignon, couronnée d'un œuf au plat. Le réconfort montagnard anti-gaspi.",
    descEn:"Tyrolean pan-fry of potatoes and beef sautéed with onion, crowned with a fried egg. Mountain comfort food that fights waste.",
    ing:[["pommedeterre",200,"g"],["boeuf",100,"g"],["oignon",50,"g"],["oeuf",50,"g"],["beurre",10,"g"]],
    etapes:[["🥔","Rissoler","Rissoler pommes de terre et oignon."],["🥩","Viande","Ajouter le bœuf en morceaux, dorer."],["🍳","Œuf","Couronner d'un œuf au plat."]] },

  { key:"backhendl", nom:"Backhendl", nomEn:"Backhendl (Viennese Fried Chicken)", emoji:"🍗", cat:"plats", pays:"autriche", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Poulet pané à la viennoise, frit doré et croustillant, servi avec du citron. L'ancêtre festif du poulet frit, cher à l'Autriche impériale.",
    descEn:"Viennese-breaded chicken, fried golden and crisp, served with lemon. The festive ancestor of fried chicken, dear to imperial Austria.",
    ing:[["poulet",150,"g"],["chapelure",30,"g"],["oeuf",30,"g"],["farine",20,"g"],["huilefriture",20,"ml"]],
    etapes:[["🍗","Paner","Passer le poulet dans farine, œuf puis chapelure."],["🔥","Frire","Frire à l'huile chaude jusqu'à doré et croustillant."],["🍋","Servir","Égoutter et servir avec un quartier de citron."]] },
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
console.log("✅ " + DEFS.length + " recettes Alpin (Suisse + Autriche) insérées (FR + EN).");
