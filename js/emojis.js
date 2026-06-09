// ============================================================
// emojis.js — Garantit qu'AUCUN ingrédient ne reste sans émoji.
// 1) EMOJI_ALIMENTS : grande table mots-clés -> émoji (du + précis au + générique)
// 2) getEmojiAliment(nom) : renvoie TOUJOURS un émoji (jamais vide)
// 3) completerEmojisIngredients() : au chargement, parcourt toutes les recettes
//    et complète INGREDIENTS_LABELS pour chaque ingrédient manquant.
//    -> Doit être chargé APRÈS recettes.js ET app.js (qui définit INGREDIENTS_LABELS).
// ============================================================

const EMOJI_ALIMENTS = {
  // --- Viandes & charcuterie (précis d'abord) ---
  "boeuf": "🥩", "bœuf": "🥩", "steak": "🥩", "entrecote": "🥩", "rosbif": "🥩",
  "veau": "🥩", "agneau": "🐑", "mouton": "🐑", "gigot": "🐑",
  "porc": "🐷", "porchache": "🐷", "echine": "🐷", "filetmignon": "🐷",
  "poulet": "🍗", "poule": "🍗", "volaille": "🍗", "dinde": "🦃", "canard": "🦆", "magret": "🦆",
  "lapin": "🐰", "caille": "🐦", "pintade": "🐦",
  "jambon": "🍖", "lardon": "🥓", "lardons": "🥓", "bacon": "🥓", "pancetta": "🥓", "speck": "🥓",
  "chorizo": "🌭", "saucisse": "🌭", "merguez": "🌭", "bratwurst": "🌭", "francfort": "🌭",
  "saucisson": "🍖", "salami": "🍖", "prosciutto": "🍖", "coppa": "🍖", "bresaola": "🍖", "rillettes": "🍖",
  "foie": "🍖", "viande": "🥩", "hache": "🥩",
  // --- Poissons & fruits de mer ---
  "saumon": "🐟", "thon": "🐟", "cabillaud": "🐟", "colin": "🐟", "lieu": "🐟", "merlan": "🐟",
  "truite": "🐟", "dorade": "🐟", "daurade": "🐟", "bar": "🐟", "sole": "🐟", "maquereau": "🐟",
  "sardine": "🐟", "anchois": "🐟", "hareng": "🐟", "morue": "🐟", "haddock": "🐟", "espadon": "🐟",
  "poisson": "🐟", "surimi": "🦀",
  "crevette": "🦐", "gambas": "🦐", "scampi": "🦐", "langoustine": "🦐",
  "crabe": "🦀", "tourteau": "🦀", "homard": "🦞", "langouste": "🦞", "ecrevisse": "🦞",
  "moule": "🦪", "huitre": "🦪", "huître": "🦪", "palourde": "🦪", "coquille": "🦪", "stjacques": "🦪",
  "calmar": "🦑", "calamar": "🦑", "encornet": "🦑", "poulpe": "🐙", "seiche": "🦑",
  // --- Œufs & laitages ---
  "oeuf": "🥚", "œuf": "🥚", "jaune": "🥚", "blanc d": "🥚",
  "lait": "🥛", "creme": "🥛", "crème": "🥛", "chantilly": "🥛", "yaourt": "🥛", "fromageblanc": "🥛",
  "beurre": "🧈", "margarine": "🧈",
  "fromage": "🧀", "mozzarella": "🧀", "parmesan": "🧀", "feta": "🧀", "ricotta": "🧀", "mascarpone": "🧀",
  "cheddar": "🧀", "emmental": "🧀", "gruyere": "🧀", "comte": "🧀", "chevre": "🧀", "gorgonzola": "🧀",
  "raclette": "🧀", "roquefort": "🧀", "camembert": "🧀", "brie": "🧀", "burrata": "🧀", "halloumi": "🧀",
  // --- Légumes ---
  "tomate": "🍅", "tomates": "🍅", "concasse": "🍅", "coulis": "🍅", "ketchup": "🍅",
  "oignon": "🧅", "echalote": "🧅", "ail": "🧄",
  "carotte": "🥕", "pommedeterre": "🥔", "pommesdeterre": "🥔", "pommeterre": "🥔", "patate": "🥔", "pdt": "🥔",
  "patatedouce": "🍠", "courgette": "🥒", "concombre": "🥒", "cornichon": "🥒",
  "aubergine": "🍆", "poivron": "🫑", "piment": "🌶️", "jalapeno": "🌶️", "champignon": "🍄",
  "brocoli": "🥦", "choufleur": "🥦", "chou": "🥬", "epinard": "🥬", "salade": "🥬", "laitue": "🥬",
  "roquette": "🥬", "mache": "🥬", "blette": "🥬", "poireau": "🥬", "celeri": "🥬", "fenouil": "🥬",
  "mais": "🌽", "maïs": "🌽", "polenta": "🌽", "petitspois": "🫛", "petitpois": "🫛", "haricotvert": "🫛", "haricotsverts": "🫛",
  "avocat": "🥑", "olive": "🫒", "betterave": "🟣", "radis": "🔴", "navet": "🪨", "asperge": "🌿",
  "artichaut": "🌿", "potiron": "🎃", "courge": "🎃", "potimarron": "🎃", "gingembre": "🫚",
  // --- Fruits ---
  "pomme": "🍎", "poire": "🍐", "banane": "🍌", "orange": "🍊", "clementine": "🍊", "mandarine": "🍊",
  "citron": "🍋", "citronvert": "🍋", "lime": "🍋", "pamplemousse": "🍊",
  "fraise": "🍓", "framboise": "🍓", "myrtille": "🫐", "cassis": "🫐", "fruitsrouges": "🫐", "mure": "🫐",
  "cerise": "🍒", "raisin": "🍇", "raisinsec": "🍇", "peche": "🍑", "abricot": "🍑", "nectarine": "🍑",
  "prune": "🍑", "mangue": "🥭", "ananas": "🍍", "kiwi": "🥝", "melon": "🍈", "pasteque": "🍉",
  "coco": "🥥", "noixdecoco": "🥥", "figue": "🟤", "datte": "🟤", "grenade": "🔴", "passion": "🟡",
  // --- Féculents / pâtes / pains ---
  "riz": "🍚", "rizgrille": "🌾", "quinoa": "🌾", "boulgour": "🌾", "semoule": "🌾", "couscous": "🌾",
  "pates": "🍝", "pâtes": "🍝", "spaghetti": "🍝", "penne": "🍝", "tagliatelle": "🍝", "macaroni": "🍝",
  "lasagne": "🍝", "ravioli": "🍝", "gnocchi": "🍝", "ragu": "🍝",
  "nouille": "🍜", "ramen": "🍜", "udon": "🍜", "soba": "🍜", "vermicelle": "🍜",
  "farine": "🌾", "ble": "🌾", "blé": "🌾", "levure": "🌾", "levain": "🥖",
  "pain": "🍞", "baguette": "🥖", "brioche": "🍞", "pita": "🫓", "naan": "🫓", "tortilla": "🫓", "wrap": "🌯",
  "croissant": "🥐", "feuilletée": "🥐", "feuilletee": "🥐", "patebrisee": "🥧", "pate": "🥧",
  // --- Légumineuses & noix ---
  "lentille": "🫘", "poischiche": "🫘", "haricot": "🫘", "feve": "🫘", "edamame": "🫛",
  "noix": "🌰", "noisette": "🌰", "amande": "🌰", "pistache": "🌰", "cajou": "🌰", "pignon": "🌰",
  "cacahuete": "🥜", "cacahuète": "🥜", "arachide": "🥜", "graine": "🌻", "sesame": "🌰", "tahini": "🥜",
  // --- Sucré / pâtisserie ---
  "sucre": "🍬", "cassonade": "🍬", "vergeoise": "🍬", "miel": "🍯", "sirop": "🍯", "caramel": "🍯",
  "chocolat": "🍫", "cacao": "🍫", "praline": "🍫", "nutella": "🍫",
  "vanille": "🍦", "glace": "🍨", "sorbet": "🍧", "confiture": "🍓", "biscuit": "🍪", "cookie": "🍪",
  "speculoos": "🍪", "meringue": "🍥", "guimauve": "🍡", "bonbon": "🍬",
  // --- Condiments / sauces / épices ---
  "sel": "🧂", "grossel": "🧂", "poivre": "🧂", "bicarbonate": "🧂", "fleurdesel": "🧂",
  "huile": "🫗", "huiledolive": "🫒", "vinaigre": "🫗", "moutarde": "🟡", "mayonnaise": "🥚",
  "saucesoja": "🥢", "soja": "🥢", "teriyaki": "🥢", "miso": "🥢", "nuoc": "🥢", "tahin": "🥄",
  "curry": "🌶️", "paprika": "🌶️", "cumin": "🟤", "curcuma": "🟡", "cannelle": "🟤", "muscade": "🟤",
  "harissa": "🌶️", "tabasco": "🌶️", "gingembrepoudre": "🫚", "safran": "🟡", "masala": "🌶️",
  "bouillon": "🍲", "fond": "🍲", "concentre": "🥫", "passata": "🍅",
  "persil": "🌿", "basilic": "🌿", "menthe": "🌿", "coriandre": "🌿", "ciboulette": "🌿",
  "thym": "🌿", "romarin": "🌿", "laurier": "🌿", "origan": "🌿", "aneth": "🌿", "estragon": "🌿", "herbe": "🌿",
  // --- Boissons / alcool ---
  "vin": "🍷", "marsala": "🍷", "porto": "🍷", "champagne": "🍾", "biere": "🍺", "bière": "🍺",
  "rhum": "🥃", "whisky": "🥃", "cognac": "🥃", "vodka": "🥃", "tequila": "🥃", "gin": "🥃",
  "kirsch": "🍒", "amaretto": "🥃", "liqueur": "🥃", "cointreau": "🥃", "sake": "🍶", "saké": "🍶",
  "jus": "🧃", "eau": "💧", "cafe": "☕", "café": "☕", "the": "🍵", "thé": "🍵",
  "tofu": "🟨", "tempeh": "🟨", "seitan": "🟫", "crudites": "🥗",
  "bagel": "🥯", "escargot": "🐌", "mortadelle": "🍖", "houmous": "🫘", "hummus": "🫘",
  "brick": "🥟", "filo": "🥟", "samoussa": "🥟", "croqueta": "🧆", "accras": "🧆"
};

// Jolis noms pour quelques clés "collées" (sinon repli automatique)
const NOMS_PROPRES_INGR = {
  celeri: "Céleri",
  oeuf: "Œuf",
  pommesdeterre: "Pommes de terre",
  creme: "Crème",
  epinards: "Épinards",
  pommesdeterre: "Pommes de terre", raisinsec: "Raisins secs",
  olivenoire: "Olives noires", olivevert: "Olives vertes",
  tomatecerise: "Tomates cerises", paincomplet: "Pain complet",
  painmie: "Pain de mie", painpanini: "Pain à panini",
  yaourtgrec: "Yaourt grec", tortillachips: "Chips tortilla",
  feuillebrick: "Feuilles de brick", oignonrouge: "Oignon rouge",
  // === Ajouts : noms propres pour ingrédients de recettes récentes ===
  abricotsec: "Abricots secs",
  ajiAmarillo: "Ají amarillo",
  amandeeffilee: "Amandes effilées",
  amidon: "Amidon",
  angostura: "Angostura",
  anko: "Pâte de haricots rouges (anko)",
  artichautmarine: "Artichauts marinés",
  artichauts: "Artichauts",
  asperge: "Asperges",
  badiane: "Badiane",
  berbere: "Berbéré",
  biere: "Bière",
  biscuit: "Biscuits",
  blancoeuf: "Blancs d'œufs",
  blancpoulet: "Blanc de poulet",
  boeufOuPoulet: "Bœuf ou poulet",
  boeufrumsteck: "Rumsteck de bœuf",
  boulgour: "Boulgour",
  cacahuete: "Cacahuètes",
  cachaca: "Cachaça",
  calamar: "Calamars",
  cannellonipates: "Pâtes à cannelloni",
  carcassehomard: "Carcasse de homard",
  chairsaucisse: "Chair à saucisse",
  chapelurepanko: "Chapelure panko",
  chapon: "Chapon",
  chataignescuites: "Châtaignes cuites",
  chevrefrais: "Chèvre frais",
  chicharron: "Chicharrón",
  chouFrais: "Chou frais",
  choucroute: "Choucroute",
  chouxfleur: "Chou-fleur",
  cola: "Cola",
  colombo: "Poudre de colombo",
  concentretomate: "Concentré de tomate",
  confitcanard: "Confit de canard",
  coulistomate: "Coulis de tomate",
  cremeacide: "Crème aigre",
  cremecassis: "Crème de cassis",
  cremedemarrons: "Crème de marrons",
  cremefouettee: "Crème fouettée",
  cresson: "Cresson",
  crevette: "Crevettes",
  crevettesSechees: "Crevettes séchées",
  crozets: "Crozets",
  cuisseconfit: "Cuisses de canard confites",
  dinde: "Dinde",
  djondjon: "Champignons djon-djon",
  eaupetillante: "Eau pétillante",
  endive: "Endives",
  epices: "Épices",
  epicesJerk: "Épices jerk",
  epicesfajitas: "Épices à fajitas",
  epiceskebab: "Épices à kebab",
  epinard: "Épinards",
  escalope: "Escalopes",
  farineMais: "Farine de maïs",
  farineTeff: "Farine de teff",
  farinemais: "Farine de maïs",
  farinepoischiche: "Farine de pois chiches",
  foiegras: "Foie gras",
  framboise: "Framboises",
  frites: "Frites",
  fromagedoux: "Fromage doux",
  fromagegrec: "Fromage grec (féta)",
  fruitsfrais: "Fruits frais",
  fumet: "Fumet de poisson",
  galettederiz: "Galettes de riz",
  galettelumpia: "Galettes à lumpia",
  galetteriz: "Galettes de riz",
  gambas: "Gambas",
  garam: "Garam masala",
  gelee: "Gelée",
  germes: "Germes de soja",
  gesiers: "Gésiers",
  giraumon: "Giraumon",
  girofle: "Clous de girofle",
  glacons: "Glaçons",
  gochugaru: "Piment coréen (gochugaru)",
  grainesEgusi: "Graines d'egusi",
  grandmarnier: "Grand Marnier",
  gravy: "Sauce gravy",
  halloumi: "Halloumi",
  herbesprovence: "Herbes de Provence",
  hibiscusseche: "Hibiscus séché",
  houmous: "Houmous",
  huilePalme: "Huile de palme",
  huilenoix: "Huile de noix",
  huitres: "Huîtres",
  jamboncru: "Jambon cru",
  juscitron: "Jus de citron",
  juscitronvert: "Jus de citron vert",
  jusdetomate: "Jus de tomate",
  jusorange: "Jus d'orange",
  juspamplemousse: "Jus de pamplemousse",
  justomate: "Jus de tomate",
  kadayif: "Cheveux d'ange (kadaïf)",
  kimchi: "Kimchi",
  laitpoudre: "Lait en poudre",
  lardgras: "Lard gras",
  legumes: "Légumes",
  lentillesnoires: "Lentilles beluga",
  lentillesvertes: "Lentilles vertes",
  liqueurcafe: "Liqueur de café",
  macaroni: "Macaronis",
  magretfume: "Magret fumé",
  marronglace: "Marrons glacés",
  marrons: "Marrons",
  meringue: "Meringue",
  noisettepoudre: "Poudre de noisettes",
  olivemixte: "Olives mélangées",
  orgeat: "Sirop d'orgeat",
  oseille: "Oseille",
  painDeMie: "Pain de mie",
  painEpices: "Pain d'épices",
  painbaguette: "Baguette",
  painepices: "Pain d'épices",
  painseigle: "Pain de seigle",
  panais: "Panais",
  papaye: "Papaye",
  pateFilo: "Pâte filo",
  pateLaksa: "Pâte de laksa",
  patemandu: "Pâte à raviolis (mandu)",
  patepizza: "Pâte à pizza",
  pepperoni: "Pepperoni",
  pisco: "Pisco",
  pistache: "Pistaches",
  plantainvert: "Banane plantain verte",
  poitrine: "Poitrine de porc",
  porto: "Porto",
  praline: "Pralin",
  pralinesroses: "Pralines roses",
  rhumambre: "Rhum ambré",
  rhumblanc: "Rhum blanc",
  riesling: "Riesling",
  rizgluant: "Riz gluant",
  rizrond: "Riz rond",
  sauceaigredouce: "Sauce aigre-douce",
  sauceblanche: "Sauce blanche",
  saucecacahuete: "Sauce cacahuète",
  saucepiquante: "Sauce piquante",
  saucetomate: "Sauce tomate",
  saucissoncuire: "Saucisson à cuire",
  saumoncru: "Saumon cru",
  selepice: "Sel épicé",
  semoulemil: "Semoule de mil",
  siropagave: "Sirop d'agave",
  siropliege: "Sirop de Liège",
  siropsucre: "Sirop de sucre",
  soda: "Soda",
  sodaamer: "Soda amer",
  sodapamplemousse: "Soda au pamplemousse",
  sole: "Sole",
  souris: "Souris d'agneau",
  speculoos: "Spéculoos",
  sucrePerle: "Sucre perlé",
  sucrecanne: "Sucre de canne",
  sucreperle: "Sucre perlé",
  tapioca: "Tapioca",
  thenoir: "Thé noir",
  tomateconcassee: "Tomates concassées",
  tomateseche: "Tomates séchées",
  tortillamais: "Tortillas de maïs",
  tzatziki: "Tzatziki",
  vermicelle: "Vermicelles",
  vermouthrouge: "Vermouth rouge",
  vinaigrette: "Vinaigrette",
  volaille: "Volaille",
  whiskey: "Whiskey",
  worcestershire: "Sauce Worcestershire",
  // === Ajouts (recettes mix juin) ===
  attieke: "Attiéké", bacon: "Bacon", cinqepices: "Cinq-épices", fromagebleu: "Fromage bleu", pateArachide: "Pâte d\u0027arachide", radis: "Radis",
  melassegrenade: "Mélasse de grenade", zaatar: "Za\u0027atar",
  algue: "Feuille de nori", fleuroranger: "Eau de fleur d\u0027oranger",
  fruitpassion: "Fruit de la passion", fruitsconfits: "Fruits confits", jaunedoeuf: "Jaune d\u0027œuf",
  anisetoile: "Anis étoilé", grenade: "Grenade", jacque: "Jacque (fruit du jacquier)", noixcoco: "Noix de coco", painfeuillete: "Pâte feuilletée"
};

// Renvoie TOUJOURS un émoji pour un nom/clé d'ingrédient (jamais vide)
function getEmojiAliment(nom) {
  if (!nom) return "🍽️";
  const n = String(nom).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const mot in EMOJI_ALIMENTS) {
    const m = mot.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (n.includes(m)) return EMOJI_ALIMENTS[mot];
  }
  return "🥄"; // repli générique : jamais vide
}

// Transforme une clé (camelCase / collée) en libellé lisible (repli quand non mappé)
function joliNomIngredient(cle) {
  if (!cle) return "";
  let s = String(cle)
    .replace(/_/g, " ")
    .replace(/([a-zàâäéèêëîïôöùûüç])([A-Z])/g, "$1 $2") // camelCase -> espace
    .replace(/\s+/g, " ")
    .trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Complète INGREDIENTS_LABELS pour TOUS les ingrédients de toutes les recettes
function completerEmojisIngredients() {
  if (typeof recettes === "undefined" || typeof INGREDIENTS_LABELS === "undefined") return;
  let ajoutes = 0;
  for (const k in recettes) {
    const r = recettes[k];
    if (!r) continue;
    for (const prop in r) {
      if (prop.startsWith("tableau") && Array.isArray(r[prop]) && r[prop][0]) {
        for (const col in r[prop][0]) {
          if (col === "nb") continue;
          if (!(col in INGREDIENTS_LABELS)) {
            const nom = NOMS_PROPRES_INGR[col] || joliNomIngredient(col);
            INGREDIENTS_LABELS[col] = getEmojiAliment(col) + " " + nom;
            ajoutes++;
          }
        }
      }
    }
  }
  if (ajoutes > 0) console.log("[emojis.js] " + ajoutes + " ingrédient(s) complété(s) avec un émoji.");
}

// Exposer pour usage éventuel ailleurs
window.getEmojiAliment = getEmojiAliment;
window.joliNomIngredient = joliNomIngredient;

// Lancer dès que possible (recettes + INGREDIENTS_LABELS déjà chargés)
if (document.readyState !== "loading") { completerEmojisIngredients(); }
else { document.addEventListener("DOMContentLoaded", completerEmojisIngredients); }
