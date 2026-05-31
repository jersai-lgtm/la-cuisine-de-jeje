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
  pommesdeterre: "Pommes de terre", raisinsec: "Raisins secs",
  olivenoire: "Olives noires", olivevert: "Olives vertes",
  tomatecerise: "Tomates cerises", paincomplet: "Pain complet",
  painmie: "Pain de mie", painpanini: "Pain à panini",
  yaourtgrec: "Yaourt grec", tortillachips: "Chips tortilla",
  feuillebrick: "Feuilles de brick", oignonrouge: "Oignon rouge"
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
