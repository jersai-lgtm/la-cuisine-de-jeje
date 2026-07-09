// ============================================================
// app_aide.js — Aide & prise en main
//  • Tour guidé à la 1ère connexion (une seule fois, flag localStorage)
//  • Page d'aide complète rouvrable via le bouton ❓ de l'en-tête
//  Réutilise le thème (--accent, --accent-rgb). Non bloquant : « Passer » toujours visible.
// ============================================================

const AIDE_TOUR = [
  { emoji: "👋", titre: "Bienvenue chez Jéjé !",
    texte: "Plus de 1700 recettes du monde entier, des menus tout prêts et plein d'outils pour cuisiner sans prise de tête. On fait un tour rapide ? (Tu peux passer à tout moment.)",
    titreEn: "Welcome to Jéjé's Kitchen!",
    texteEn: "Over 1700 recipes from around the world, ready-made menus and loads of tools to cook without the fuss. Shall we take a quick tour? (You can skip anytime.)" },
  { emoji: "🔍", titre: "Trouver & filtrer",
    texte: "Cherche par nom, ingrédient ou pays. Et affine d'un geste : filtres ⏱ rapide, 💰 éco, 🥗 Nutri A/B, ⭐ facile, 🌞 de saison, 🌱 végé/vegan — et tri par note, temps, coût ou calories. Tes filtres sont même mémorisés.",
    titreEn: "Search & filter",
    texteEn: "Search by name, ingredient or country. And refine in one tap: ⏱ quick, 💰 cheap, 🥗 Nutri A/B, ⭐ easy, 🌞 in season, 🌱 veggie/vegan filters — and sort by rating, time, cost or calories. Your filters are even remembered." },
  { emoji: "📐", titre: "Des quantités qui s'adaptent",
    texte: "Sur chaque fiche, choisis le nombre de personnes (1 à 15) : les ingrédients se recalculent tout seuls, en grammes et millilitres. Avec en prime le coût estimé, les calories et le Nutri-Score du plat.",
    titreEn: "Quantities that adapt",
    texteEn: "On every recipe, pick the number of servings (1 to 15): the ingredients recalculate automatically, in grams and millilitres. Plus the estimated cost, calories and Nutri-Score of the dish." },
  { emoji: "👨‍🍳", titre: "Mode cuisson & partage",
    texte: "Lance le mode cuisson plein écran : les étapes défilent une à une, avec minuteur, et l'écran reste allumé pendant que tu cuisines. Une recette qui plaît ? Partage-la à tes proches en un clic.",
    titreEn: "Cooking mode & sharing",
    texteEn: "Launch full-screen cooking mode: the steps scroll one by one, with a timer, and the screen stays on while you cook. Love a recipe? Share it with friends in one tap." },
  { emoji: "📅", titre: "Tes menus de la semaine",
    texte: "Dans l'onglet Menus, génère un planning de la semaine (simple ou complet), un menu festif ou une lunch box, en un clic. Chaque repas qui ne te plaît pas est régénérable.",
    titreEn: "Your weekly menus",
    texteEn: "In the Menus tab, generate a weekly plan (simple or full), a festive menu or a lunch box in one tap. Any meal you don't like can be regenerated." },
  { emoji: "🛒", titre: "Garde-manger & courses",
    texte: "Le mode vide-frigo propose des recettes avec ce que tu as déjà. Ta liste de courses se génère par rayon (avec plan de prep pour le batch cooking) — et tu peux y ajouter tes propres articles (sopalin, couches…).",
    titreEn: "Pantry & shopping",
    texteEn: "Use-up-the-fridge mode suggests recipes from what you already have. Your shopping list builds itself by aisle (with a prep plan for batch cooking) — and you can add your own items (paper towels, diapers…)." },
  { emoji: "👨‍👩‍👧‍👦", titre: "Ta famille, tes allergènes",
    texte: "Renseigne ton foyer (adultes, enfants, bébés) et tes allergènes dans le Profil : l'appli adapte les portions et affiche des alertes 🔴 bébé / 🟠 enfant sur les plats déconseillés.",
    titreEn: "Your family, your allergens",
    texteEn: "Set up your household (adults, children, babies) and your allergens in the Profile: the app adapts portions and shows 🔴 baby / 🟠 child alerts on unsuitable dishes." },
  { emoji: "🤖", titre: "Un coup de main ?",
    texte: "Un assistant IA t'aide sur chaque recette (adapter une recette, remplacer un ingrédient, conseils de cuisson). Tu peux revoir cette aide quand tu veux via le bouton ❓ en haut. Bonne cuisine ! 🍳",
    titreEn: "Need a hand?",
    texteEn: "An AI assistant helps on every recipe (adapt a recipe, swap an ingredient, cooking tips). You can revisit this help anytime via the ❓ button at the top. Happy cooking! 🍳" }
];

const AIDE_SECTIONS = [
  { emoji: "🏠", titre: "Accueil & inspiration",
    texte: "L'accueil met en avant la 🗓️ recette du jour (elle change chaque jour), les dernières recettes, les suggestions de saison — qui s'adaptent même à la météo : du frais quand il fait chaud ! 🥵 — et tes favoris. Deux boutons pour trouver l'idée : « 🍽️ Qu'est-ce qu'on mange ? » (fais défiler les plats — 👈 suivant, 👉 précédent, tape pour ouvrir la fiche) et « 🍳 De quoi t'as envie ? » (propose selon ton humeur, un quiz ou ton objectif calories). La recherche trouve par nom, ingrédient (« courgette ») ou pays.",
    titreEn: "Home & inspiration",
    texteEn: "The home screen highlights the 🗓️ recipe of the day (it changes daily), the latest recipes, seasonal suggestions — which even adapt to the weather: something fresh when it's hot! 🥵 — and your favourites. Two buttons to find an idea: « 🍽️ What's for dinner? » (swipe through dishes — 👈 next, 👉 previous, tap to open the recipe) and « 🍳 What are you in the mood for? » (suggests by mood, a quiz or your calorie goal). Search finds by name, ingredient (« zucchini ») or country." },
  { emoji: "🎯", titre: "Objectif & nutrition sportive",
    texte: "Sur l'accueil, le bloc « 🎯 Objectif kcal » est un vrai coach. Règle tes calories du jour au compteur libre, ou laisse l'appli les calculer depuis ton poids, ta taille, ton âge et ton activité (métabolisme de base + dépense). Choisis ton but — ⚖️ équilibré, 🪶 léger, 💪 protéiné, 🔥 sèche, 🏋️ prise de masse — et l'appli en déduit ta cible protéines (en g/kg), ton hydratation, et répartit la journée (matin / midi / collation / soir). « 🍽️ Composer ma journée » génère un menu complet qui atteint tes calories ET tes protéines, avec verrouillage et changement repas par repas. Les recettes 💪 sport sont dosées à la personne (pas au foyer) et sans accord alcool.",
    titreEn: "Goal & sports nutrition",
    texteEn: "On the home screen, the « 🎯 Calorie goal » block is a real coach. Set your daily calories with the free counter, or let the app compute them from your weight, height, age and activity (basal metabolism + expenditure). Pick your goal — ⚖️ balanced, 🪶 light, 💪 high-protein, 🔥 cutting, 🏋️ bulking — and the app derives your protein target (g/kg), hydration, and splits the day (morning / lunch / snack / dinner). « 🍽️ Plan my day » builds a full menu that hits both your calories AND protein, with per-meal lock and swap. The 💪 sport recipes are portioned per person (not per household) and without an alcohol pairing." },
  { emoji: "⚙️", titre: "Filtres & tri",
    texte: "Dans les recettes, affine avec les filtres ⏱ rapide (≤ 30 min), 💰 éco, 🥗 Nutri A/B, ⭐ facile, 🌞 de saison, 🌱 végé et 🌿 vegan — ils se combinent entre eux et avec les catégories. Le menu « Trier » classe par note, temps, coût ou calories. Tes filtres sont mémorisés d'une visite à l'autre.",
    titreEn: "Filters & sorting",
    texteEn: "In the recipes, refine with the ⏱ quick (≤ 30 min), 💰 cheap, 🥗 Nutri A/B, ⭐ easy, 🌞 in season, 🌱 veggie and 🌿 vegan filters — they combine with each other and with the categories. The « Sort » menu orders by rating, time, cost or calories. Your filters are kept from one visit to the next." },
  { emoji: "📖", titre: "Les fiches recettes",
    texte: "Chaque fiche ajuste ses ingrédients au nombre de personnes (1 à 15), avec coût estimé, calories et Nutri-Score. Étapes détaillées avec astuces de chef, et un bloc « 💡 Pas d'un ingrédient ? » qui propose des substitutions. Tu peux noter, commenter, ajouter une photo, lancer le 👨‍🍳 mode cuisson ou 📤 partager la recette.",
    titreEn: "Recipe pages",
    texteEn: "Each recipe adjusts its ingredients to the number of servings (1 to 15), with estimated cost, calories and Nutri-Score. Detailed steps with chef's tips, and a « 💡 Out of an ingredient? » box that suggests substitutions. You can rate, comment, add a photo, launch 👨‍🍳 cooking mode or 📤 share the recipe." },
  { emoji: "❤️", titre: "Favoris & collections",
    texte: "Le cœur ajoute une recette à tes favoris. Dans l'onglet Favoris, range-les en collections (Noël, Healthy, Rapide…) pour t'y retrouver : barre 📚 Collections, bouton ➕ pour en créer et ⚙️ pour gérer leur contenu.",
    titreEn: "Favourites & collections",
    texteEn: "The heart adds a recipe to your favourites. In the Favourites tab, sort them into collections (Christmas, Healthy, Quick…) to find your way around: 📚 Collections bar, ➕ button to create one and ⚙️ to manage their contents." },
  { emoji: "📅", titre: "Menus de la semaine",
    texte: "L'onglet Menus compose ton planning : « 🎲 Générer » (instantané) ou « ✨ Menu intelligent » (composé par l'IA à partir d'une liste pré-filtrée — connexion requise). Au choix repas simple (un plat) ou complet (entrée/plat/dessert). Les menus tiennent compte de la saison, varient les protéines et n'affichent pas de plats de fêtes hors période. Tu peux aussi faire des menus festifs, thématiques ou des lunch box. Chaque repas est régénérable, et le menu s'envoie vers ta liste de courses.",
    titreEn: "Weekly menus",
    texteEn: "The Menus tab builds your plan: « 🎲 Generate » (instant) or « ✨ Smart menu » (composed by AI from a pre-filtered list — sign-in required). Choose a simple meal (one dish) or full (starter/main/dessert). Menus take the season into account, vary the proteins and never show festive dishes out of season. You can also make festive, themed menus or lunch boxes. Each meal can be regenerated, and the menu sends to your shopping list." },
  { emoji: "🛒", titre: "Garde-manger & liste de courses",
    texte: "Le garde-manger te laisse cuisiner avec ce que tu as (vide-frigo). La liste de courses se construit à partir des recettes choisies, par rayon, avec le temps total et un « plan de prep » qui regroupe les étapes par phase pour le batch cooking. Tu peux aussi ajouter tes propres articles (🧺 Mes articles : sopalin, couches, lessive…).",
    titreEn: "Pantry & shopping list",
    texteEn: "The pantry lets you cook with what you have (use-up-the-fridge). The shopping list builds from the chosen recipes, by aisle, with the total time and a « prep plan » that groups steps by phase for batch cooking. You can also add your own items (🧺 My items: paper towels, diapers, detergent…)." },
  { emoji: "👨‍👩‍👧‍👦", titre: "Profil & famille",
    texte: "Dans le Profil, indique la composition de ton foyer et tes allergènes : l'appli adapte les portions par défaut et signale les plats déconseillés aux tout-petits avec des pastilles 🔴 (bébé) et 🟠 (enfant) — des repères visuels, jamais des blocages. Tu y trouves aussi 🔔 Notifications (recevoir la recette du jour ; si le bouton indique « bloquées », réautorise-les dans les réglages du téléphone) et 🔄 Forcer la mise à jour (recharge la dernière version si l'appli semble figée).",
    titreEn: "Profile & family",
    texteEn: "In the Profile, set your household and your allergens: the app adapts default portions and flags dishes unsuitable for little ones with 🔴 (baby) and 🟠 (child) badges — visual cues, never blockers. You'll also find 🔔 Notifications (get the recipe of the day; if the button says « blocked », re-enable them in your phone settings) and 🔄 Force update (reloads the latest version if the app seems stuck)." },
  { emoji: "🎨", titre: "Thème & langue",
    texte: "En haut de l'écran, le bouton 🌙 bascule le thème : sombre, clair ou auto (qui suit ton téléphone). Le bouton EN/FR passe l'appli en anglais et inversement.",
    titreEn: "Theme & language",
    texteEn: "At the top of the screen, the 🌙 button switches the theme: dark, light or auto (following your phone). The EN/FR button switches the app between English and French." },
  { emoji: "🤖", titre: "Assistant IA",
    texte: "Sur une recette, l'assistant culinaire répond à tes questions (substitution d'un ingrédient, adaptation, conseil de cuisson…) directement dans le contexte du plat.",
    titreEn: "AI assistant",
    texteEn: "On a recipe, the cooking assistant answers your questions (swapping an ingredient, adapting, cooking advice…) right in the context of the dish." },
  { emoji: "📊", titre: "Mes stats",
    texte: "Retrouve un récap de ton activité : recettes vues, favoris, plats cuisinés, et des classements (les plus économiques, les plus légères, les mieux notées…).",
    titreEn: "My stats",
    texteEn: "Find a recap of your activity: recipes viewed, favourites, dishes cooked, and rankings (the cheapest, the lightest, the best rated…)." },
  { emoji: "💡", titre: "Nouveautés & suggestions",
    texte: "Le bouton ⓘ de l'en-tête liste les nouveautés (une pastille rouge apparaît quand il y en a). Le bouton 💡 Amélioration te permet de proposer une idée — tes retours font évoluer l'appli !",
    titreEn: "What's new & suggestions",
    texteEn: "The ⓘ button in the header lists what's new (a red dot appears when there is). The 💡 Improvement button lets you suggest an idea — your feedback shapes the app!" }
];

// Langue courante (aligné sur le reste de l'appli : window.LANG === "en").
function _aideEN() { try { return window.LANG === "en"; } catch (e) { return false; } }
// Choisit la bonne langue pour un libellé d'interface.
function _aideTxt(fr, en) { return _aideEN() ? en : fr; }
// Renvoie {titre, texte} d'une section selon la langue (repli FR si EN absent).
function _aideSec(s) {
  return _aideEN()
    ? { emoji: s.emoji, titre: s.titreEn || s.titre, texte: s.texteEn || s.texte }
    : { emoji: s.emoji, titre: s.titre, texte: s.texte };
}

function _aideEchap(s) {
  return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------- Tour guidé ---------------- */
let _tourIdx = 0;

function _tourVu() { try { return localStorage.getItem("lc_tour_vu") === "1"; } catch (e) { return false; } }
function _tourMarquerVu() { try { localStorage.setItem("lc_tour_vu", "1"); } catch (e) {} }

function lancerTour(reset) {
  _tourIdx = 0;
  let m = document.getElementById("modal-tour");
  if (!m) {
    m = document.createElement("div");
    m.id = "modal-tour";
    m.setAttribute("style", "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.62);display:flex;align-items:center;justify-content:center;padding:18px");
    document.body.appendChild(m);
  }
  m.style.display = "flex";
  _tourRender();
}

function _tourRender() {
  const m = document.getElementById("modal-tour");
  if (!m) return;
  const s = _aideSec(AIDE_TOUR[_tourIdx]);
  const dernier = _tourIdx === AIDE_TOUR.length - 1;
  const dots = AIDE_TOUR.map((_, i) =>
    '<span style="width:7px;height:7px;border-radius:50%;display:inline-block;background:' +
    (i === _tourIdx ? "var(--accent,#ff4d88)" : "rgba(255,255,255,.25)") + '"></span>'
  ).join("");
  m.innerHTML =
    '<div style="background:#1f1b25;border:1px solid rgba(255,255,255,.08);border-radius:18px;max-width:380px;width:100%;padding:24px 22px 18px;position:relative;box-shadow:0 18px 50px rgba(0,0,0,.5)">' +
      '<button onclick="_tourPasser()" aria-label="' + _aideTxt("Fermer", "Close") + '" style="position:absolute;top:12px;right:14px;background:transparent;border:none;color:#9b97a3;font-size:20px;cursor:pointer;line-height:1">✕</button>' +
      '<div style="text-align:center;font-size:46px;line-height:1;margin:6px 0 12px">' + s.emoji + '</div>' +
      '<h3 style="text-align:center;margin:0 0 10px;color:#fff;font-size:1.2rem">' + _aideEchap(s.titre) + '</h3>' +
      '<p style="text-align:center;color:var(--text-2);font-size:.95rem;line-height:1.5;margin:0 0 18px">' + _aideEchap(s.texte) + '</p>' +
      '<div style="display:flex;justify-content:center;gap:7px;margin-bottom:16px">' + dots + '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">' +
        '<button onclick="_tourPasser()" style="background:transparent;border:none;color:#9b97a3;font-size:.86rem;cursor:pointer;padding:8px 4px">' + _aideTxt("Passer", "Skip") + '</button>' +
        '<div style="display:flex;gap:8px">' +
          (_tourIdx > 0 ? '<button onclick="_tourPrev()" style="background:rgba(255,255,255,.08);border:none;color:#fff;border-radius:10px;padding:9px 14px;font-weight:600;cursor:pointer">' + _aideTxt("Précédent", "Back") + '</button>' : '') +
          '<button onclick="' + (dernier ? '_tourFin()' : '_tourNext()') + '" style="background:var(--accent,#ff4d88);border:none;color:#fff;border-radius:10px;padding:9px 18px;font-weight:700;cursor:pointer">' + (dernier ? _aideTxt("C'est parti !", "Let's go!") : _aideTxt("Suivant", "Next")) + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function _tourNext() { if (_tourIdx < AIDE_TOUR.length - 1) { _tourIdx++; _tourRender(); } }
function _tourPrev() { if (_tourIdx > 0) { _tourIdx--; _tourRender(); } }
function _tourFermer() { const m = document.getElementById("modal-tour"); if (m) m.style.display = "none"; }
function _tourPasser() { _tourMarquerVu(); _tourFermer(); }
function _tourFin() { _tourMarquerVu(); _tourFermer(); }

/* ---------------- Page d'aide complète ---------------- */
function ouvrirAide() {
  let m = document.getElementById("modal-aide");
  if (!m) {
    m = document.createElement("div");
    m.id = "modal-aide";
    m.setAttribute("style", "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:16px");
    m.onclick = (e) => { if (e.target === m) fermerAide(); };
    document.body.appendChild(m);
  }
  const sections = AIDE_SECTIONS.map(s0 => {
    const s = _aideSec(s0);
    return '<div style="background:rgba(255,255,255,.04);border-radius:12px;padding:13px 14px;margin-bottom:10px">' +
      '<div style="display:flex;align-items:center;gap:9px;margin-bottom:5px">' +
        '<span style="font-size:20px;line-height:1">' + s0.emoji + '</span>' +
        '<span style="font-weight:700;color:#fff;font-size:.98rem">' + _aideEchap(s.titre) + '</span>' +
      '</div>' +
      '<p style="margin:0;color:var(--text-2);font-size:.88rem;line-height:1.5">' + _aideEchap(s.texte) + '</p>' +
    '</div>';
  }).join("");
  m.innerHTML =
    '<div style="background:#1f1b25;border:1px solid rgba(255,255,255,.08);border-radius:18px;max-width:460px;width:100%;max-height:86vh;display:flex;flex-direction:column;box-shadow:0 18px 50px rgba(0,0,0,.5)">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid rgba(255,255,255,.07)">' +
        '<h3 style="margin:0;color:#fff;font-size:1.12rem">❓ ' + _aideTxt("Besoin d'aide", "Need help") + '</h3>' +
        '<button onclick="fermerAide()" aria-label="' + _aideTxt("Fermer", "Close") + '" style="background:transparent;border:none;color:#9b97a3;font-size:22px;cursor:pointer;line-height:1">✕</button>' +
      '</div>' +
      '<div style="overflow-y:auto;padding:14px 16px 4px">' +
        '<button onclick="fermerAide();lancerTour(true);" style="width:100%;background:rgba(var(--accent-rgb),.14);border:1px solid rgba(var(--accent-rgb),.35);color:var(--accent-soft,#ff8fb3);border-radius:12px;padding:11px;font-weight:600;cursor:pointer;margin-bottom:14px">▶️ ' + _aideTxt("Revoir le tour guidé", "Replay the guided tour") + '</button>' +
        sections +
      '</div>' +
      '<div style="padding:12px 16px;border-top:1px solid rgba(255,255,255,.07);text-align:center">' +
        '<button onclick="fermerAide()" style="background:var(--accent,#ff4d88);border:none;color:#fff;border-radius:10px;padding:10px 22px;font-weight:700;cursor:pointer">' + _aideTxt("J'ai compris", "Got it") + '</button>' +
      '</div>' +
    '</div>';
  m.style.display = "flex";
}
function fermerAide() { const m = document.getElementById("modal-aide"); if (m) m.style.display = "none"; }

/* ---------------- Intégration ---------------- */
// back-button Android : fermer les modales sur retour si le mécanisme existe
try {
  if (Array.isArray(window._MODALS_SURVEILLEES)) {
    ["modal-aide", "modal-tour"].forEach(id => { if (!window._MODALS_SURVEILLEES.includes(id)) window._MODALS_SURVEILLEES.push(id); });
  }
} catch (e) {}

// 1ère connexion : lancer le tour une seule fois, sans gêner un éventuel splash d'event
function _aidePeutAfficher() {
  try {
    return ![...document.querySelectorAll("div")].some(d => {
      const s = getComputedStyle(d);
      return s.position === "fixed" && (parseInt(s.zIndex) || 0) >= 9000 && s.display !== "none" && d.offsetParent !== null && d.id !== "modal-tour";
    });
  } catch (e) { return true; }
}
function _aideAutoTour(essais) {
  if (_tourVu()) return;
  if (_aidePeutAfficher()) { lancerTour(); return; }
  if ((essais || 0) < 5) setTimeout(() => _aideAutoTour((essais || 0) + 1), 2500);
  else lancerTour();
}
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => _aideAutoTour(0), 900);
});
