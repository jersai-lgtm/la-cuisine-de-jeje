// Vague 8 « Petits pays variés » (Réunion, Chypre, Danemark, Irlande, Pays-Bas, Canada, Éthiopie) : 16 recettes.
// 6 à 8 étapes. Idempotent. FR + EN nom/description. Étapes EN via pipeline. node tools/_gen_petitspays.mjs
import fs from "fs";
const DATE = "2026-06-27T15:00:00";
const base = 4;

const DEFS = [
  // ---------- RÉUNION ----------
  { key:"bouchons", nom:"Bouchons Réunionnais", nomEn:"Réunion Bouchons (Steamed Pork Dumplings)", emoji:"🥟", cat:"aperitifs", pays:"reunion", temps:"50 min", niveau:"⭐⭐ Moyen",
    desc:"Bouchées vapeur de porc à la chinoise, made in Réunion : ail, gingembre et soja dans une fine pâte. L'en-cas de rue incontournable de l'île.",
    descEn:"Chinese-style steamed pork bites, made in Réunion: garlic, ginger and soy in a thin wrapper. The island's essential street snack.",
    ing:[["porc",120,"g"],["farine",60,"g"],["ail",5,"g"],["gingembre",5,"g"],["saucesoja",10,"ml"]],
    etapes:[
      ["🥩","Farce","Hacher le porc, mélanger avec ail, gingembre, ciboule et soja."],
      ["🥣","Pâte","Préparer une pâte fine (ou utiliser des carrés à raviolis)."],
      ["⚪","Découper","Découper des disques de pâte."],
      ["🥟","Garnir","Déposer la farce et refermer en petits paquets ouverts."],
      ["💨","Vapeur","Cuire à la vapeur 15-20 min."],
      ["🥢","Sauce","Préparer une sauce soja-piment pour tremper."],
      ["🍽️","Servir","Servir chaud avec la sauce et du piment."]
    ] },

  { key:"gratinchouchou", nom:"Gratin de Chouchou", nomEn:"Chayote Gratin", emoji:"🥘", cat:"plats", pays:"reunion", temps:"1h", niveau:"⭐ Facile",
    desc:"Chouchou (chayote) fondant nappé d'une béchamel gratinée au fromage. L'accompagnement doux et réconfortant des tables réunionnaises.",
    descEn:"Tender chayote napped with a cheese-gratinated béchamel. The gentle, comforting side of Réunion tables.",
    ing:[["courgette",180,"g"],["lait",100,"ml"],["fromagerape",40,"g"],["beurre",15,"g"],["farine",15,"g"]],
    etapes:[
      ["🔪","Préparer","Éplucher et couper les chouchous (chayotes) en morceaux."],
      ["💧","Cuire","Les cuire à l'eau ou vapeur jusqu'à tendreté."],
      ["🧈","Roux","Faire un roux beurre-farine."],
      ["🥛","Béchamel","Ajouter le lait en fouettant jusqu'à une béchamel."],
      ["🧀","Mélanger","Incorporer une partie du fromage, saler, muscade."],
      ["🥘","Monter","Mêler chouchous et béchamel dans un plat, couvrir de fromage."],
      ["🔥","Gratiner","Enfourner à 200 °C jusqu'à dorure."],
      ["🍽️","Servir","Servir chaud, en accompagnement d'un cari."]
    ] },

  { key:"samoussareunion", nom:"Samoussas Réunionnais", nomEn:"Réunion Samosas", emoji:"🔺", cat:"aperitifs", pays:"reunion", temps:"45 min", niveau:"⭐⭐ Moyen",
    desc:"Petits triangles croustillants farcis de viande épicée (ou thon), frits dorés. L'apéro-roi de la Réunion, à grignoter sans fin.",
    descEn:"Crisp little triangles filled with spiced meat (or tuna), fried golden. Réunion's king of aperitifs, endlessly snackable.",
    ing:[["feuillebrick",30,"g"],["boeufHache",80,"g"],["oignon",30,"g"],["piment",3,"g"],["huilefriture",20,"ml"]],
    etapes:[
      ["🥩","Farce","Faire revenir la viande hachée avec oignon, ail et épices (curcuma, piment)."],
      ["🌿","Parfumer","Ajouter de la ciboule et laisser refroidir."],
      ["✂️","Bandes","Couper les feuilles de brick en bandes."],
      ["🔺","Plier","Déposer la farce et plier en triangles successifs."],
      ["🔥","Chauffer","Chauffer l'huile à 170 °C."],
      ["🍳","Frire","Frire les samoussas jusqu'à doré et croustillant."],
      ["🍽️","Servir","Égoutter et servir chaud avec du piment."]
    ] },

  // ---------- CHYPRE ----------
  { key:"afelia", nom:"Afelia", nomEn:"Afelia (Pork in Red Wine)", emoji:"🍷", cat:"plats", pays:"chypre", temps:"1h15", niveau:"⭐⭐ Moyen",
    desc:"Porc chypriote mariné puis mijoté au vin rouge et aux graines de coriandre concassées. Tendre, parfumé, profondément méditerranéen.",
    descEn:"Cypriot pork marinated then braised in red wine and crushed coriander seeds. Tender, fragrant, deeply Mediterranean.",
    ing:[["porc",150,"g"],["vinrouge",40,"ml"],["coriandre",5,"g"],["oignon",40,"g"],["huileOlive",10,"ml"]],
    etapes:[
      ["🍷","Mariner","Mariner le porc en cubes dans le vin rouge et la coriandre concassée une nuit."],
      ["🩹","Égoutter","Égoutter la viande (réserver la marinade) et la sécher."],
      ["🥩","Saisir","Colorer le porc dans l'huile d'olive."],
      ["🧅","Oignon","Ajouter l'oignon et faire revenir."],
      ["🍷","Mouiller","Verser la marinade et un peu d'eau."],
      ["⏲️","Mijoter","Mijoter à couvert 45 min jusqu'à fondant."],
      ["🥄","Réduire","Découvrir et réduire la sauce."],
      ["🍽️","Servir","Servir avec du boulgour ou des pommes de terre."]
    ] },

  { key:"ttavas", nom:"Ttavas", nomEn:"Ttavas (Cypriot Lamb Bake)", emoji:"🥘", cat:"plats", pays:"chypre", temps:"1h30", niveau:"⭐⭐ Moyen",
    desc:"Agneau et pommes de terre cuits lentement au four avec tomate, oignon et beaucoup de cumin. Le plat de marmite chypriote, fondant et parfumé.",
    descEn:"Lamb and potatoes slow-baked with tomato, onion and lots of cumin. The Cypriot pot dish, tender and fragrant.",
    ing:[["agneau",140,"g"],["pommedeterre",120,"g"],["tomate",60,"g"],["oignon",40,"g"],["cumin",2,"g"]],
    etapes:[
      ["🔪","Préparer","Couper l'agneau, les pommes de terre et les oignons en gros morceaux."],
      ["🥣","Mélanger","Mélanger le tout avec tomate, cumin, huile, sel et poivre."],
      ["🥘","Disposer","Répartir dans un plat à four (le « ttavas »)."],
      ["💧","Mouiller","Ajouter un peu d'eau ou de bouillon."],
      ["🔥","Cuire","Couvrir et cuire à 170 °C pendant 1 h."],
      ["✨","Dorer","Découvrir et poursuivre 20 min pour colorer."],
      ["🍽️","Servir","Servir bien chaud, nappé du jus."]
    ] },

  { key:"koupepia", nom:"Koupepia", nomEn:"Koupepia (Cypriot Stuffed Vine Leaves)", emoji:"🍃", cat:"entrees", pays:"chypre", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Feuilles de vigne farcies de riz, viande et herbes, mijotées au citron. Les dolmades version chypriote, fondantes et acidulées.",
    descEn:"Vine leaves stuffed with rice, meat and herbs, simmered with lemon. The Cypriot take on dolmades, tender and tangy.",
    ing:[["feuillevigne",30,"g"],["riz",50,"g"],["boeufHache",60,"g"],["tomate",40,"g"],["menthe",3,"g"]],
    etapes:[
      ["🍃","Blanchir","Blanchir les feuilles de vigne pour les assouplir."],
      ["🍚","Farce","Mélanger riz, viande, tomate, menthe, persil et épices."],
      ["🤏","Garnir","Déposer un peu de farce sur chaque feuille."],
      ["🌯","Rouler","Rouler serré en repliant les côtés."],
      ["🥘","Ranger","Ranger les rouleaux serrés dans une cocotte."],
      ["🍋","Mouiller","Couvrir d'eau citronnée et d'un filet d'huile, poser une assiette dessus."],
      ["⏲️","Mijoter","Mijoter 45 min à feu doux."],
      ["🍽️","Servir","Servir tiède avec un yaourt."]
    ] },

  // ---------- DANEMARK ----------
  { key:"flaeskesteg", nom:"Flæskesteg", nomEn:"Flæskesteg (Danish Roast Pork)", emoji:"🐷", cat:"plats", pays:"danemark", temps:"2h", niveau:"⭐⭐ Moyen",
    desc:"Rôti de porc danois à la couenne ultra-croustillante, frottée de sel et de laurier. Le plat de Noël danois, servi avec pommes de terre.",
    descEn:"Danish pork roast with ultra-crisp crackling, rubbed with salt and bay. The Danish Christmas dish, served with potatoes.",
    ing:[["porc",180,"g"],["pommedeterre",120,"g"],["oignon",40,"g"],["beurre",10,"g"]],
    etapes:[
      ["🔪","Inciser","Inciser finement la couenne en bandes régulières."],
      ["🧂","Saler","Frotter de gros sel et glisser des feuilles de laurier dans les fentes."],
      ["💧","Eau","Poser le rôti couenne vers le haut dans un plat avec un fond d'eau."],
      ["🔥","Rôtir","Cuire à 200 °C 1h30 jusqu'à cuisson à cœur."],
      ["✨","Croustiller","Monter le four (grill) pour faire cloquer la couenne."],
      ["🥔","Garniture","Rôtir les pommes de terre dans le jus."],
      ["😴","Reposer","Laisser reposer la viande avant de trancher."],
      ["🍽️","Servir","Servir avec chou rouge et sauce brune."]
    ] },

  { key:"risalamande", nom:"Risalamande", nomEn:"Risalamande (Danish Rice Pudding)", emoji:"🍮", cat:"desserts", pays:"danemark", temps:"1h", niveau:"⭐⭐ Moyen",
    desc:"Riz au lait froid monté à la crème fouettée et aux amandes, nappé de coulis de cerises. Le dessert de Noël danois, où une amande entière porte chance.",
    descEn:"A cold rice pudding folded with whipped cream and almonds, topped with cherry sauce. The Danish Christmas dessert, where one whole almond brings luck.",
    ing:[["riz",50,"g"],["lait",150,"ml"],["amande",20,"g"],["creme",40,"ml"],["sucre",30,"g"]],
    etapes:[
      ["🍚","Riz au lait","Cuire le riz dans le lait vanillé jusqu'à crémeux."],
      ["❄️","Refroidir","Laisser refroidir complètement."],
      ["🌰","Amandes","Hacher les amandes (en garder une entière)."],
      ["🥛","Crème","Monter la crème en chantilly."],
      ["🥄","Incorporer","Mélanger délicatement crème, amandes et sucre au riz froid."],
      ["🍒","Coulis","Préparer un coulis de cerises."],
      ["🍽️","Servir","Servir bien frais, nappé de coulis."]
    ] },

  // ---------- IRLANDE ----------
  { key:"boxty", nom:"Boxty", nomEn:"Boxty (Irish Potato Pancake)", emoji:"🥔", cat:"brunch", pays:"irlande", temps:"35 min", niveau:"⭐ Facile",
    desc:"Galette irlandaise mêlant pomme de terre râpée crue et purée, dorée au beurre. Moelleuse dedans, croustillante dehors — le brunch de l'île d'Émeraude.",
    descEn:"An Irish pancake mixing raw grated potato and mash, browned in butter. Soft inside, crisp outside — the Emerald Isle's brunch.",
    ing:[["pommedeterre",160,"g"],["farine",30,"g"],["lait",40,"ml"],["beurre",10,"g"]],
    etapes:[
      ["🥔","Râper","Râper une moitié des pommes de terre crues, presser l'eau."],
      ["🥣","Purée","Écraser l'autre moitié cuite en purée."],
      ["🌾","Pâte","Mélanger râpé, purée, farine, lait et sel."],
      ["🔥","Chauffer","Beurrer une poêle chaude."],
      ["🥞","Cuire","Cuire des galettes 3-4 min par face jusqu'à doré."],
      ["🍽️","Servir","Servir chaud avec du beurre, au petit-déjeuner ou avec du bacon."]
    ] },

  { key:"coddle", nom:"Dublin Coddle", nomEn:"Dublin Coddle", emoji:"🍲", cat:"plats", pays:"irlande", temps:"1h15", niveau:"⭐ Facile",
    desc:"Ragoût de Dublin tout en douceur : saucisses, bacon, oignons et pommes de terre mijotés. Le plat anti-gaspi réconfortant des soirées pluvieuses.",
    descEn:"A gentle Dublin stew: sausages, bacon, onions and potatoes simmered together. The comforting, waste-not dish of rainy nights.",
    ing:[["saucisse",100,"g"],["lardons",40,"g"],["pommedeterre",150,"g"],["oignon",50,"g"]],
    etapes:[
      ["🌭","Dorer","Faire colorer légèrement saucisses et lardons."],
      ["🔪","Couper","Couper les saucisses en tronçons, les pommes de terre en rondelles."],
      ["🥘","Monter","Disposer en couches pommes de terre, oignons, saucisses, lardons."],
      ["💧","Mouiller","Couvrir de bouillon, ajouter persil et poivre."],
      ["⏲️","Mijoter","Mijoter à couvert 1 h à feu doux."],
      ["🥔","Vérifier","Les pommes de terre doivent être fondantes."],
      ["🍽️","Servir","Servir bien chaud avec du pain de soda."]
    ] },

  // ---------- PAYS-BAS ----------
  { key:"erwtensoep", nom:"Erwtensoep", nomEn:"Erwtensoep (Dutch Split Pea Soup)", emoji:"🍲", cat:"soupes", pays:"paysbas", temps:"1h30", niveau:"⭐ Facile",
    desc:"Soupe de pois cassés si épaisse que la cuillère y tient debout, avec porc, céleri et carotte. Le réconfort hivernal des Pays-Bas (snert).",
    descEn:"A Dutch split-pea soup so thick the spoon stands up, with pork, celery and carrot. The Netherlands' winter comfort (snert).",
    ing:[["poiscasses",80,"g"],["porc",80,"g"],["carotte",50,"g"],["celeri",40,"g"],["oignon",40,"g"]],
    etapes:[
      ["🫘","Tremper","Rincer les pois cassés (tremper si besoin)."],
      ["🥩","Bouillon","Cuire le porc dans l'eau pour un bouillon, écumer."],
      ["🫘","Pois","Ajouter les pois cassés et cuire jusqu'à ce qu'ils se défassent."],
      ["🥕","Légumes","Ajouter carotte, céleri et oignon en dés."],
      ["⏲️","Épaissir","Mijoter 1 h jusqu'à une soupe très épaisse."],
      ["🌭","Saucisse","Ajouter de la saucisse fumée en rondelles."],
      ["🍽️","Servir","Servir brûlant avec du pain de seigle."]
    ] },

  { key:"hutspot", nom:"Hutspot", nomEn:"Hutspot", emoji:"🥔", cat:"plats", pays:"paysbas", temps:"50 min", niveau:"⭐ Facile",
    desc:"Écrasée de pommes de terre, carottes et oignons, servie avec un bœuf braisé fondant. Le plat-mémoire de la libération de Leyde, simple et nourrissant.",
    descEn:"A mash of potatoes, carrots and onions served with tender braised beef. The memory-dish of Leiden's relief, simple and filling.",
    ing:[["pommedeterre",120,"g"],["carotte",120,"g"],["oignon",50,"g"],["boeuf",120,"g"],["beurre",15,"g"]],
    etapes:[
      ["🥩","Braiser","Braiser le bœuf lentement jusqu'à fondant (à part)."],
      ["🔪","Couper","Couper pommes de terre, carottes et oignons."],
      ["💧","Cuire","Les cuire ensemble à l'eau salée jusqu'à tendreté."],
      ["🥣","Écraser","Égoutter et écraser grossièrement avec le beurre."],
      ["🧂","Assaisonner","Saler, poivrer, ajouter un peu de lait si besoin."],
      ["🍖","Dresser","Servir l'écrasée avec le bœuf braisé et son jus."],
      ["🍽️","Servir","Servir bien chaud."]
    ] },

  // ---------- CANADA ----------
  { key:"patechinois", nom:"Pâté Chinois", nomEn:"Pâté Chinois (Quebec Shepherd's Pie)", emoji:"🌽", cat:"plats", pays:"canada", temps:"50 min", niveau:"⭐ Facile",
    desc:"Le hachis parmentier québécois en trois étages : bœuf haché, maïs en crème, purée dorée. Le réconfort familial par excellence.",
    descEn:"Quebec's three-layer shepherd's pie: minced beef, creamed corn, golden mash. The ultimate family comfort.",
    ing:[["boeufHache",130,"g"],["mais",80,"g"],["pommedeterre",150,"g"],["oignon",40,"g"],["beurre",10,"g"]],
    etapes:[
      ["🥔","Purée","Cuire les pommes de terre et les écraser en purée au beurre."],
      ["🧅","Viande","Faire revenir l'oignon puis le bœuf haché, assaisonner."],
      ["🥘","Étage 1","Étaler la viande au fond d'un plat."],
      ["🌽","Étage 2","Recouvrir d'une couche de maïs (en grains et en crème)."],
      ["🥔","Étage 3","Couvrir de purée, strier à la fourchette."],
      ["🔥","Gratiner","Enfourner à 200 °C jusqu'à dorure de la purée."],
      ["🍽️","Servir","Servir chaud, avec du ketchup pour les puristes."]
    ] },

  { key:"nanaimo", nom:"Nanaimo Bars", nomEn:"Nanaimo Bars", emoji:"🍫", cat:"desserts", pays:"canada", temps:"40 min", niveau:"⭐⭐ Moyen",
    desc:"Barres canadiennes sans cuisson en 3 couches : base biscuit-noix-coco, crème vanillée, ganache au chocolat. Décadent et culte.",
    descEn:"A no-bake three-layer Canadian bar: biscuit-nut-coconut base, vanilla custard cream, chocolate ganache. Decadent and iconic.",
    ing:[["biscuits",50,"g"],["chocolat",50,"g"],["beurre",40,"g"],["noix",20,"g"],["sucre",20,"g"]],
    etapes:[
      ["🍪","Base","Mélanger biscuits émiettés, noix, coco et beurre fondu cacaoté."],
      ["🟫","Tasser","Tasser cette base dans un moule, réfrigérer."],
      ["🥛","Crème","Fouetter beurre, sucre glace et poudre à crème (custard) en crème."],
      ["🧈","Étaler","Étaler la crème sur la base, réfrigérer."],
      ["🍫","Ganache","Faire fondre chocolat et beurre."],
      ["🪙","Napper","Couler la ganache sur la crème et lisser."],
      ["❄️","Prendre","Réfrigérer puis couper en barres nettes."]
    ] },

  // ---------- ÉTHIOPIE ----------
  { key:"shiro", nom:"Shiro", nomEn:"Shiro (Ethiopian Chickpea Stew)", emoji:"🥘", cat:"plats", pays:"ethiopie", temps:"40 min", niveau:"⭐ Facile",
    desc:"Velouté de farine de pois chiche aux épices berbéré, onctueux et réconfortant, à saucer avec de l'injera. Le plat de tous les jours en Éthiopie.",
    descEn:"A spiced chickpea-flour stew with berbere, silky and comforting, scooped up with injera. Ethiopia's everyday dish.",
    ing:[["farinepoischiche",50,"g"],["oignon",50,"g"],["ail",6,"g"],["tomate",50,"g"],["huile",15,"ml"]],
    etapes:[
      ["🧅","Sofrito","Faire fondre longuement l'oignon dans l'huile."],
      ["🧄","Aromates","Ajouter ail, gingembre et épices berbéré."],
      ["🍅","Tomate","Incorporer la tomate concassée, laisser réduire."],
      ["💧","Délayer","Délayer la farine de pois chiche dans de l'eau."],
      ["🥣","Lier","Verser en fouettant pour éviter les grumeaux."],
      ["⏲️","Mijoter","Mijoter 15 min jusqu'à consistance crémeuse."],
      ["🍽️","Servir","Servir avec de l'injera ou du riz."]
    ] },

  { key:"kitfo", nom:"Kitfo", nomEn:"Kitfo (Ethiopian Spiced Beef Tartare)", emoji:"🥩", cat:"plats", pays:"ethiopie", temps:"30 min", niveau:"⭐⭐ Moyen",
    desc:"Bœuf haché finement, lié au beurre épicé (niter kibbeh) et au mitmita, servi tiède. Le mets de fête éthiopien, intense et fondant.",
    descEn:"Finely minced beef bound with spiced butter (niter kibbeh) and mitmita, served warm. The Ethiopian feast dish, intense and melting.",
    ing:[["boeuf",150,"g"],["beurre",20,"g"],["piment",4,"g"],["gingembre",5,"g"]],
    etapes:[
      ["🧈","Beurre épicé","Préparer un beurre clarifié infusé d'épices (niter kibbeh)."],
      ["🔪","Hacher","Hacher le bœuf très finement au couteau."],
      ["🌶️","Mitmita","Mélanger les épices mitmita (piment, cardamome, clou)."],
      ["♨️","Tiédir","Faire à peine tiédir le beurre épicé."],
      ["🥣","Lier","Mélanger le bœuf avec le beurre tiède et les épices."],
      ["🍽️","Servir","Servir aussitôt avec injera et fromage frais (ayib)."]
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
console.log("✅ " + DEFS.length + " recettes Petits pays insérées (FR 6-8 étapes + EN nom/description).");
