// Vague 2 « Alpin » (Suisse + Autriche) : 14 recettes — 6 à 8 étapes chacune.
// Idempotent : retire toute version existante des mêmes clés avant de réinsérer.
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
    etapes:[
      ["🧄","Caquelon","Frotter l'intérieur du caquelon avec une gousse d'ail coupée."],
      ["🍷","Vin","Verser le vin blanc et chauffer doucement."],
      ["🧀","Fromages","Ajouter Gruyère et Vacherin râpés en plusieurs fois."],
      ["🥄","Remuer","Remuer sans cesse en formant des 8 jusqu'à l'onctuosité."],
      ["🥃","Lier","Délayer la maïzena dans le kirsch et l'incorporer."],
      ["🍞","Couper","Couper le pain en dés avec un peu de croûte."],
      ["🔥","Servir","Maintenir à frémissement sur le réchaud et tremper le pain."]
    ] },

  { key:"malakoff", nom:"Malakoffs Vaudois", nomEn:"Vaud Malakoffs (Cheese Fritters)", emoji:"🧀", cat:"aperitifs", pays:"suisse", temps:"30 min", niveau:"⭐⭐ Moyen",
    desc:"Beignets de Gruyère frits du canton de Vaud, croustillants dehors et coulants dedans. La gourmandise des fêtes de la Côte.",
    descEn:"Fried Gruyère fritters from canton Vaud, crisp outside and molten inside. A treat from the Côte region's festivities.",
    ing:[["gruyere",90,"g"],["oeuf",30,"g"],["farine",20,"g"],["vinblanc",10,"ml"],["pain",30,"g"]],
    etapes:[
      ["🧀","Râper","Râper finement le Gruyère."],
      ["🥣","Appareil","Mélanger fromage, œuf, farine et vin blanc en pâte épaisse."],
      ["🧄","Parfumer","Ajouter une pointe d'ail et de muscade."],
      ["🥪","Monter","Tartiner l'appareil sur des tranches de pain."],
      ["🔥","Chauffer","Chauffer un bain d'huile à 170 °C."],
      ["🍳","Frire","Frire côté fromage vers le bas jusqu'à doré."],
      ["🧻","Servir","Égoutter et servir aussitôt, bien coulant."]
    ] },

  { key:"papetvaudois", nom:"Papet Vaudois", nomEn:"Papet Vaudois", emoji:"🥬", cat:"plats", pays:"suisse", temps:"1h", niveau:"⭐ Facile",
    desc:"Fondue de poireaux et pommes de terre mijotée au vin blanc, couronnée d'une saucisse aux choux. Le plat d'hiver emblématique du canton de Vaud.",
    descEn:"Leeks and potatoes stewed in white wine, crowned with a cabbage sausage. Canton Vaud's emblematic winter dish.",
    ing:[["poireau",200,"g"],["pommedeterre",150,"g"],["saucisse",120,"g"],["vinblanc",20,"ml"],["creme",20,"ml"]],
    etapes:[
      ["🔪","Préparer","Émincer les poireaux, couper les pommes de terre en cubes."],
      ["🧈","Fondre","Faire fondre les poireaux au beurre sans coloration."],
      ["🍷","Déglacer","Déglacer au vin blanc et laisser réduire."],
      ["🥔","Pommes de terre","Ajouter les pommes de terre, couvrir d'eau."],
      ["⏲️","Mijoter","Mijoter 30 min jusqu'à ce que tout confise."],
      ["🌭","Saucisse","Pocher la saucisse aux choux sur le papet 20 min."],
      ["🥛","Lier","Ajouter la crème, rectifier l'assaisonnement."],
      ["🍽️","Servir","Servir la saucisse tranchée sur le lit de papet."]
    ] },

  { key:"zopf", nom:"Zopf (Tresse au Beurre)", nomEn:"Zopf (Swiss Butter Braid)", emoji:"🍞", cat:"boulangerie", pays:"suisse", temps:"2h", niveau:"⭐⭐ Moyen",
    desc:"La tresse au beurre du dimanche suisse : mie moelleuse et filante, croûte dorée à l'œuf. Le pain du brunch dominical.",
    descEn:"The Swiss Sunday butter braid: soft, stretchy crumb with an egg-glazed golden crust. The bread of the Sunday brunch.",
    ing:[["farine",100,"g"],["beurre",15,"g"],["lait",60,"ml"],["levure",3,"g"],["oeuf",15,"g"]],
    etapes:[
      ["🥣","Pétrir","Pétrir farine, lait tiède, levure, beurre et sel 10 min."],
      ["⏲️","Pousser","Laisser lever 1h30 jusqu'au doublement de volume."],
      ["✋","Diviser","Dégazer et diviser la pâte en deux longs boudins."],
      ["🪢","Tresser","Tresser les deux brins en serrant bien les extrémités."],
      ["⏳","Apprêt","Laisser de nouveau gonfler 30 min sur la plaque."],
      ["🥚","Dorer","Badigeonner d'œuf battu pour une croûte brillante."],
      ["🔥","Cuire","Cuire à 200 °C jusqu'à une belle couleur brun doré."],
      ["🍽️","Servir","Laisser refroidir et trancher pour le brunch."]
    ] },

  { key:"fonduechocolat", nom:"Fondue au Chocolat", nomEn:"Chocolate Fondue", emoji:"🍫", cat:"desserts", pays:"suisse", temps:"20 min", niveau:"⭐ Facile",
    desc:"Chocolat suisse fondu à la crème, gardé chaud au caquelon pour y tremper fruits et biscuits. Le dessert convivial par excellence.",
    descEn:"Swiss chocolate melted with cream, kept warm in the caquelon for dipping fruit and biscuits. The ultimate sharing dessert.",
    ing:[["chocolat",70,"g"],["creme",50,"ml"],["sucre",10,"g"]],
    etapes:[
      ["🔪","Hacher","Hacher le chocolat en petits morceaux réguliers."],
      ["🥛","Chauffer","Chauffer la crème sans la faire bouillir."],
      ["🍫","Fondre","Verser sur le chocolat et laisser fondre 1 min."],
      ["🥄","Lisser","Mélanger jusqu'à une ganache lisse et brillante."],
      ["🍯","Sucrer","Ajuster avec un peu de sucre, voire un trait de kirsch."],
      ["🍓","Préparer","Couper fruits, biscuits et morceaux de gâteau."],
      ["🔥","Servir","Garder tiède au caquelon et tremper à volonté."]
    ] },

  { key:"zurichgeschnetzeltes", nom:"Émincé Zurichois", nomEn:"Zürich-Style Veal", emoji:"🥘", cat:"plats", pays:"suisse", temps:"35 min", niveau:"⭐⭐ Moyen",
    desc:"Fines lamelles de veau et champignons dans une sauce crémeuse au vin blanc. Le grand classique de Zurich, servi avec des rösti.",
    descEn:"Thin strips of veal and mushrooms in a creamy white-wine sauce. Zürich's great classic, served with rösti.",
    ing:[["veau",150,"g"],["champignon",60,"g"],["creme",40,"ml"],["vinblanc",20,"ml"],["oignon",30,"g"]],
    etapes:[
      ["🔪","Préparer","Tailler le veau en fines lamelles, émincer oignon et champignons."],
      ["🥩","Saisir","Saisir le veau vivement par petites quantités, réserver."],
      ["🧅","Suer","Faire suer l'oignon, ajouter les champignons."],
      ["🍷","Déglacer","Déglacer au vin blanc et laisser réduire de moitié."],
      ["🥛","Crème","Ajouter la crème et un peu de fond, laisser épaissir."],
      ["♨️","Remettre","Remettre le veau et son jus sans le faire bouillir."],
      ["🍋","Finir","Rectifier l'assaisonnement, pointe de citron."],
      ["🍽️","Servir","Servir aussitôt avec des rösti croustillants."]
    ] },

  { key:"capuns", nom:"Capuns", nomEn:"Capuns", emoji:"🌿", cat:"plats", pays:"suisse", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Spécialité des Grisons : une pâte à spätzle aux lardons enroulée dans des feuilles de bette, pochée puis gratinée. Rustique et réconfortant.",
    descEn:"A Grisons specialty: bacon spätzle batter wrapped in chard leaves, poached then gratinated. Rustic and comforting.",
    ing:[["blettes",80,"g"],["farine",60,"g"],["oeuf",25,"g"],["lardons",30,"g"],["lait",40,"ml"],["gruyere",20,"g"]],
    etapes:[
      ["🥣","Pâte","Mélanger farine, œuf et lait en pâte à spätzle épaisse."],
      ["🥓","Lardons","Incorporer lardons rissolés et herbes à la pâte."],
      ["🌿","Feuilles","Blanchir les feuilles de bette pour les assouplir."],
      ["📦","Rouler","Déposer une cuillère de pâte et rouler en petits paquets."],
      ["💧","Pocher","Pocher les capuns dans un bouillon frémissant 10 min."],
      ["🧀","Napper","Disposer dans un plat, napper de crème et gruyère."],
      ["🔥","Gratiner","Gratiner au four jusqu'à coloration."],
      ["🍽️","Servir","Servir chaud, bien fondant."]
    ] },

  // ---------- AUTRICHE ----------
  { key:"tafelspitz", nom:"Tafelspitz", nomEn:"Tafelspitz (Boiled Beef)", emoji:"🥩", cat:"plats", pays:"autriche", temps:"2h30", niveau:"⭐⭐ Moyen",
    desc:"Bœuf poché lentement dans un bouillon de légumes, tranché et servi avec sauce au raifort. Le plat préféré de l'empereur François-Joseph.",
    descEn:"Beef slowly poached in a vegetable broth, sliced and served with horseradish sauce. Emperor Franz Joseph's favourite dish.",
    ing:[["boeuf",180,"g"],["carotte",60,"g"],["poireau",50,"g"],["oignon",40,"g"]],
    etapes:[
      ["🧅","Oignon","Brûler un demi-oignon à sec pour colorer le bouillon."],
      ["💧","Démarrer","Plonger le bœuf dans l'eau frémissante, écumer."],
      ["🥕","Légumes","Ajouter carotte, poireau, oignon et aromates."],
      ["⏲️","Pocher","Pocher à frémissement 2h jusqu'à parfaite tendreté."],
      ["🔪","Trancher","Sortir la pièce et la trancher contre le grain."],
      ["🌶️","Raifort","Préparer une sauce pomme-raifort bien relevée."],
      ["🥔","Garnir","Servir avec pommes de terre rissolées et épinards."],
      ["🍽️","Servir","Napper d'un peu de bouillon chaud et servir."]
    ] },

  { key:"frittatensuppe", nom:"Frittatensuppe", nomEn:"Frittatensuppe (Pancake Soup)", emoji:"🍜", cat:"soupes", pays:"autriche", temps:"30 min", niveau:"⭐ Facile",
    desc:"Bouillon de bœuf clair garni de fines lanières de crêpe salée. La soupe viennoise réconfortante par excellence.",
    descEn:"Clear beef broth garnished with thin strips of savoury pancake. The ultimate comforting Viennese soup.",
    ing:[["farine",30,"g"],["oeuf",25,"g"],["lait",50,"ml"],["beurre",5,"g"]],
    etapes:[
      ["🥣","Pâte","Battre farine, œuf, lait et sel en pâte à crêpe lisse."],
      ["⏲️","Reposer","Laisser reposer la pâte 15 min."],
      ["🥞","Cuire","Cuire de fines crêpes dorées au beurre."],
      ["🌯","Rouler","Rouler les crêpes tièdes serrées."],
      ["🔪","Trancher","Couper en très fines lanières."],
      ["🍲","Bouillon","Chauffer un bon bouillon de bœuf clair."],
      ["🌿","Servir","Disposer les lanières dans le bol, parsemer de ciboulette."]
    ] },

  { key:"germknodel", nom:"Germknödel", nomEn:"Germknödel", emoji:"🥟", cat:"desserts", pays:"autriche", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Gros boulette de pâte levée fourrée de confiture de prunes, cuite vapeur, nappée de beurre fondu et de pavot sucré. Dessert des refuges autrichiens.",
    descEn:"A large yeast-dough dumpling filled with plum jam, steamed and topped with melted butter and sweet poppy seeds. A dessert of Austrian mountain huts.",
    ing:[["farine",80,"g"],["lait",50,"ml"],["levure",3,"g"],["confiture",30,"g"],["beurre",15,"g"],["sucre",10,"g"]],
    etapes:[
      ["🥣","Pâte","Pétrir farine, lait tiède, levure et sucre en pâte souple."],
      ["⏲️","Lever","Couvrir et laisser doubler 45 min."],
      ["✋","Diviser","Diviser et aplatir en disques dans la main."],
      ["🫐","Fourrer","Déposer la confiture de prunes (powidl) au centre, refermer."],
      ["⏳","Apprêt","Laisser regonfler les boules 15 min."],
      ["💨","Vapeur","Cuire à la vapeur 15 min sans ouvrir le couvercle."],
      ["🧈","Napper","Napper de beurre fondu."],
      ["🌑","Servir","Parsemer de pavot moulu sucré et servir aussitôt."]
    ] },

  { key:"linzertorte", nom:"Linzertorte", nomEn:"Linzertorte", emoji:"🥧", cat:"desserts", pays:"autriche", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"La plus ancienne tarte du monde : pâte sablée aux amandes et à la cannelle, garnie de confiture de groseille et d'un croisillon. Spécialité de Linz.",
    descEn:"The world's oldest cake: an almond-cinnamon shortcrust filled with redcurrant jam under a lattice. A specialty of Linz.",
    ing:[["farine",50,"g"],["poudreamande",40,"g"],["beurre",50,"g"],["confiture",50,"g"],["sucre",30,"g"],["oeuf",15,"g"]],
    etapes:[
      ["🥣","Sabler","Sabler farine, poudre d'amande, sucre, beurre et cannelle."],
      ["🥚","Lier","Lier avec l'œuf en une pâte homogène, ne pas trop travailler."],
      ["❄️","Reposer","Filmer et réserver 30 min au frais."],
      ["🥧","Foncer","Étaler les 3/4 de la pâte et foncer un moule."],
      ["🍓","Garnir","Étaler une couche généreuse de confiture de groseille."],
      ["#️⃣","Croisillon","Découper des bandes et former le croisillon caractéristique."],
      ["🔥","Cuire","Dorer les bords et cuire à 180 °C jusqu'à coloration."],
      ["🍽️","Servir","Laisser refroidir : la tarte est meilleure le lendemain."]
    ] },

  { key:"kasespatzle", nom:"Käsespätzle", nomEn:"Käsespätzle (Cheese Spätzle)", emoji:"🧀", cat:"plats", pays:"autriche", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Petites pâtes fraîches gratinées au fromage de montagne et couronnées d'oignons frits. Le mac & cheese des Alpes tyroliennes.",
    descEn:"Fresh little noodles gratinated with mountain cheese and topped with fried onions. The Tyrolean Alps' mac & cheese.",
    ing:[["farine",90,"g"],["oeuf",50,"g"],["fromagerape",60,"g"],["oignon",40,"g"],["beurre",15,"g"]],
    etapes:[
      ["🥣","Pâte","Battre farine, œufs, sel et un peu d'eau en pâte élastique."],
      ["🧅","Oignons","Faire dorer lentement les oignons émincés au beurre."],
      ["💧","Pocher","Pousser la pâte au travers d'une passoire dans l'eau bouillante."],
      ["🥄","Égoutter","Égoutter les spätzle dès qu'ils remontent."],
      ["🧀","Couches","Alterner spätzle et fromage râpé dans un plat chaud."],
      ["🔥","Gratiner","Passer au four pour faire filer le fromage."],
      ["🧅","Couronner","Couronner d'oignons frits croustillants."],
      ["🍽️","Servir","Servir brûlant, avec une salade verte."]
    ] },

  { key:"grostl", nom:"Tiroler Gröstl", nomEn:"Tiroler Gröstl", emoji:"🥔", cat:"plats", pays:"autriche", temps:"35 min", niveau:"⭐ Facile",
    desc:"Poêlée tyrolienne de pommes de terre et bœuf rissolés à l'oignon, couronnée d'un œuf au plat. Le réconfort montagnard anti-gaspi.",
    descEn:"Tyrolean pan-fry of potatoes and beef sautéed with onion, crowned with a fried egg. Mountain comfort food that fights waste.",
    ing:[["pommedeterre",200,"g"],["boeuf",100,"g"],["oignon",50,"g"],["oeuf",50,"g"],["beurre",10,"g"]],
    etapes:[
      ["🥔","Précuire","Cuire les pommes de terre à l'eau, les laisser tiédir."],
      ["🔪","Couper","Couper pommes de terre et bœuf cuit en cubes."],
      ["🧅","Oignon","Faire blondir l'oignon au beurre dans une grande poêle."],
      ["🥔","Rissoler","Ajouter les pommes de terre et bien les colorer."],
      ["🥩","Viande","Incorporer le bœuf, assaisonner au cumin et marjolaine."],
      ["🍳","Œuf","Cuire un œuf au plat à part."],
      ["🍽️","Servir","Servir la poêlée couronnée de l'œuf au plat."]
    ] },

  { key:"backhendl", nom:"Backhendl", nomEn:"Backhendl (Viennese Fried Chicken)", emoji:"🍗", cat:"plats", pays:"autriche", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Poulet pané à la viennoise, frit doré et croustillant, servi avec du citron. L'ancêtre festif du poulet frit, cher à l'Autriche impériale.",
    descEn:"Viennese-breaded chicken, fried golden and crisp, served with lemon. The festive ancestor of fried chicken, dear to imperial Austria.",
    ing:[["poulet",150,"g"],["chapelure",30,"g"],["oeuf",30,"g"],["farine",20,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🍗","Préparer","Détailler le poulet en morceaux, saler et poivrer."],
      ["🍽️","Dresser","Préparer trois assiettes : farine, œuf battu, chapelure."],
      ["✋","Paner","Passer chaque morceau dans la farine, l'œuf puis la chapelure."],
      ["👋","Tapoter","Tapoter pour faire adhérer la panure sans la tasser."],
      ["🔥","Chauffer","Chauffer l'huile à 170 °C."],
      ["🍳","Frire","Frire les morceaux jusqu'à doré et croustillant."],
      ["🧻","Égoutter","Égoutter sur grille pour garder le croustillant."],
      ["🍋","Servir","Servir avec un quartier de citron et de la salade."]
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
console.log("✅ " + DEFS.length + " recettes Alpin (ré)insérées à 6-8 étapes (FR + EN).");
