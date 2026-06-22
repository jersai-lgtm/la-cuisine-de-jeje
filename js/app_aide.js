// ============================================================
// app_aide.js — Aide & prise en main
//  • Tour guidé à la 1ère connexion (une seule fois, flag localStorage)
//  • Page d'aide complète rouvrable via le bouton ❓ de l'en-tête
//  Réutilise le thème (--accent, --accent-rgb). Non bloquant : « Passer » toujours visible.
// ============================================================

const AIDE_TOUR = [
  { emoji: "👋", titre: "Bienvenue chez Jéjé !",
    texte: "Plus de 1000 recettes du monde entier, des menus tout prêts et plein d'outils pour cuisiner sans prise de tête. On fait un tour rapide ? (Tu peux passer à tout moment.)" },
  { emoji: "🔍", titre: "Trouver & filtrer",
    texte: "Cherche par nom, ingrédient ou pays. Et affine d'un geste : filtres ⏱ rapide, 💰 éco, 🥗 Nutri A/B, ⭐ facile, 🌞 de saison, 🌱 végé/vegan — et tri par note, temps, coût ou calories. Tes filtres sont même mémorisés." },
  { emoji: "📐", titre: "Des quantités qui s'adaptent",
    texte: "Sur chaque fiche, choisis le nombre de personnes (1 à 15) : les ingrédients se recalculent tout seuls, en grammes et millilitres. Avec en prime le coût estimé, les calories et le Nutri-Score du plat." },
  { emoji: "👨‍🍳", titre: "Mode cuisson & partage",
    texte: "Lance le mode cuisson plein écran : les étapes défilent une à une, avec minuteur, et l'écran reste allumé pendant que tu cuisines. Une recette qui plaît ? Partage-la à tes proches en un clic." },
  { emoji: "📅", titre: "Tes menus de la semaine",
    texte: "Dans l'onglet Menus, génère un planning de la semaine (simple ou complet), un menu festif ou une lunch box, en un clic. Chaque repas qui ne te plaît pas est régénérable." },
  { emoji: "🛒", titre: "Garde-manger & courses",
    texte: "Le mode vide-frigo propose des recettes avec ce que tu as déjà. Ta liste de courses se génère par rayon (avec plan de prep pour le batch cooking) — et tu peux y ajouter tes propres articles (sopalin, couches…)." },
  { emoji: "👨‍👩‍👧‍👦", titre: "Ta famille, tes allergènes",
    texte: "Renseigne ton foyer (adultes, enfants, bébés) et tes allergènes dans le Profil : l'appli adapte les portions et affiche des alertes 🔴 bébé / 🟠 enfant sur les plats déconseillés." },
  { emoji: "🤖", titre: "Un coup de main ?",
    texte: "Un assistant IA t'aide sur chaque recette (adapter une recette, remplacer un ingrédient, conseils de cuisson). Tu peux revoir cette aide quand tu veux via le bouton ❓ en haut. Bonne cuisine ! 🍳" }
];

const AIDE_SECTIONS = [
  { emoji: "🏠", titre: "Accueil & recherche",
    texte: "L'accueil met en avant les dernières recettes, les suggestions du jour (de saison) et tes favoris. La barre de recherche trouve une recette par nom, par ingrédient (« courgette ») ou par pays. Les puces de catégories et de pays filtrent rapidement." },
  { emoji: "⚙️", titre: "Filtres & tri",
    texte: "Dans les recettes, affine avec les filtres ⏱ rapide (≤ 30 min), 💰 éco, 🥗 Nutri A/B, ⭐ facile, 🌞 de saison, 🌱 végé et 🌿 vegan — ils se combinent entre eux et avec les catégories. Le menu « Trier » classe par note, temps, coût ou calories. Tes filtres sont mémorisés d'une visite à l'autre." },
  { emoji: "📖", titre: "Les fiches recettes",
    texte: "Chaque fiche ajuste ses ingrédients au nombre de personnes (1 à 15), avec coût estimé, calories et Nutri-Score. Étapes détaillées avec astuces de chef, et un bloc « 💡 Pas d'un ingrédient ? » qui propose des substitutions. Tu peux noter, commenter, ajouter une photo, lancer le 👨‍🍳 mode cuisson ou 📤 partager la recette." },
  { emoji: "❤️", titre: "Favoris & collections",
    texte: "Le cœur ajoute une recette à tes favoris. Dans l'onglet Favoris, range-les en collections (Noël, Healthy, Rapide…) pour t'y retrouver : barre 📚 Collections, bouton ➕ pour en créer et ⚙️ pour gérer leur contenu." },
  { emoji: "📅", titre: "Menus de la semaine",
    texte: "L'onglet Menus génère un planning hebdo (repas simple = un plat, ou complet = entrée/plat/dessert), des menus festifs et thématiques, ou des lunch box. Chaque repas est régénérable individuellement, et tu peux envoyer un menu vers ta liste de courses." },
  { emoji: "🛒", titre: "Garde-manger & liste de courses",
    texte: "Le garde-manger te laisse cuisiner avec ce que tu as (vide-frigo). La liste de courses se construit à partir des recettes choisies, par rayon, avec le temps total et un « plan de prep » qui regroupe les étapes par phase pour le batch cooking. Tu peux aussi ajouter tes propres articles (🧺 Mes articles : sopalin, couches, lessive…)." },
  { emoji: "👨‍👩‍👧‍👦", titre: "Profil & famille",
    texte: "Dans le Profil, indique la composition de ton foyer et tes allergènes. L'appli adapte les portions par défaut et signale les plats déconseillés aux tout-petits avec des pastilles 🔴 (bébé) et 🟠 (enfant) — des repères visuels, jamais des blocages." },
  { emoji: "🤖", titre: "Assistant IA",
    texte: "Sur une recette, l'assistant culinaire répond à tes questions (substitution d'un ingrédient, adaptation, conseil de cuisson…) directement dans le contexte du plat." },
  { emoji: "📊", titre: "Mes stats",
    texte: "Retrouve un récap de ton activité : recettes vues, favoris, plats cuisinés, et des classements (les plus économiques, les plus légères, les mieux notées…)." },
  { emoji: "💡", titre: "Nouveautés & suggestions",
    texte: "Le bouton ⓘ de l'en-tête liste les nouveautés (une pastille rouge apparaît quand il y en a). Le bouton 💡 Amélioration te permet de proposer une idée — tes retours font évoluer l'appli !" }
];

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
  const s = AIDE_TOUR[_tourIdx];
  const dernier = _tourIdx === AIDE_TOUR.length - 1;
  const dots = AIDE_TOUR.map((_, i) =>
    '<span style="width:7px;height:7px;border-radius:50%;display:inline-block;background:' +
    (i === _tourIdx ? "var(--accent,#ff4d88)" : "rgba(255,255,255,.25)") + '"></span>'
  ).join("");
  m.innerHTML =
    '<div style="background:#1f1b25;border:1px solid rgba(255,255,255,.08);border-radius:18px;max-width:380px;width:100%;padding:24px 22px 18px;position:relative;box-shadow:0 18px 50px rgba(0,0,0,.5)">' +
      '<button onclick="_tourPasser()" aria-label="Fermer" style="position:absolute;top:12px;right:14px;background:transparent;border:none;color:#9b97a3;font-size:20px;cursor:pointer;line-height:1">✕</button>' +
      '<div style="text-align:center;font-size:46px;line-height:1;margin:6px 0 12px">' + s.emoji + '</div>' +
      '<h3 style="text-align:center;margin:0 0 10px;color:#fff;font-size:1.2rem">' + _aideEchap(s.titre) + '</h3>' +
      '<p style="text-align:center;color:var(--text-2);font-size:.95rem;line-height:1.5;margin:0 0 18px">' + _aideEchap(s.texte) + '</p>' +
      '<div style="display:flex;justify-content:center;gap:7px;margin-bottom:16px">' + dots + '</div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px">' +
        '<button onclick="_tourPasser()" style="background:transparent;border:none;color:#9b97a3;font-size:.86rem;cursor:pointer;padding:8px 4px">Passer</button>' +
        '<div style="display:flex;gap:8px">' +
          (_tourIdx > 0 ? '<button onclick="_tourPrev()" style="background:rgba(255,255,255,.08);border:none;color:#fff;border-radius:10px;padding:9px 14px;font-weight:600;cursor:pointer">Précédent</button>' : '') +
          '<button onclick="' + (dernier ? '_tourFin()' : '_tourNext()') + '" style="background:var(--accent,#ff4d88);border:none;color:#fff;border-radius:10px;padding:9px 18px;font-weight:700;cursor:pointer">' + (dernier ? "C'est parti !" : "Suivant") + '</button>' +
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
  const sections = AIDE_SECTIONS.map(s =>
    '<div style="background:rgba(255,255,255,.04);border-radius:12px;padding:13px 14px;margin-bottom:10px">' +
      '<div style="display:flex;align-items:center;gap:9px;margin-bottom:5px">' +
        '<span style="font-size:20px;line-height:1">' + s.emoji + '</span>' +
        '<span style="font-weight:700;color:#fff;font-size:.98rem">' + _aideEchap(s.titre) + '</span>' +
      '</div>' +
      '<p style="margin:0;color:var(--text-2);font-size:.88rem;line-height:1.5">' + _aideEchap(s.texte) + '</p>' +
    '</div>'
  ).join("");
  m.innerHTML =
    '<div style="background:#1f1b25;border:1px solid rgba(255,255,255,.08);border-radius:18px;max-width:460px;width:100%;max-height:86vh;display:flex;flex-direction:column;box-shadow:0 18px 50px rgba(0,0,0,.5)">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 18px 12px;border-bottom:1px solid rgba(255,255,255,.07)">' +
        '<h3 style="margin:0;color:#fff;font-size:1.12rem">❓ Besoin d\'aide</h3>' +
        '<button onclick="fermerAide()" aria-label="Fermer" style="background:transparent;border:none;color:#9b97a3;font-size:22px;cursor:pointer;line-height:1">✕</button>' +
      '</div>' +
      '<div style="overflow-y:auto;padding:14px 16px 4px">' +
        '<button onclick="fermerAide();lancerTour(true);" style="width:100%;background:rgba(var(--accent-rgb),.14);border:1px solid rgba(var(--accent-rgb),.35);color:var(--accent-soft,#ff8fb3);border-radius:12px;padding:11px;font-weight:600;cursor:pointer;margin-bottom:14px">▶️ Revoir le tour guidé</button>' +
        sections +
      '</div>' +
      '<div style="padding:12px 16px;border-top:1px solid rgba(255,255,255,.07);text-align:center">' +
        '<button onclick="fermerAide()" style="background:var(--accent,#ff4d88);border:none;color:#fff;border-radius:10px;padding:10px 22px;font-weight:700;cursor:pointer">J\'ai compris</button>' +
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
