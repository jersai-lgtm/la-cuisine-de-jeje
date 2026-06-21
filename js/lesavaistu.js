// =============================================================================
// 💡 lesavaistu.js — Astuce rotative « Le savais-tu ? » (découverte des fonctions)
// -----------------------------------------------------------------------------
// L'appli a beaucoup de fonctions cachées : ce petit bandeau discret en haut de
// l'accueil en met une en avant, façon « le savais-tu ? ». Rotatif (flèche),
// fermable (caché 7 jours). N'AJOUTE aucune fonctionnalité — il révèle l'existant.
// Bilingue + thème clair/sombre.
// =============================================================================

(function () {
  const EN = () => window.LANG === "en";
  const LS_OFF = "tip_off_until";
  const ASTUCES = [
    ["🍽️ Appuie sur « Qu'est-ce qu'on mange ? » pour trouver une idée en swipant.", "🍽️ Tap “What's for dinner?” to find an idea by swiping."],
    ["🗓️ Glisse une recette sur un jour pour planifier ta semaine.", "🗓️ Drag a recipe onto a day to plan your week."],
    ["🔔 Active les notifications pour recevoir la recette du jour.", "🔔 Turn on notifications to get the recipe of the day."],
    ["🌗 Le bouton en haut bascule le thème clair / sombre (ou auto).", "🌗 The top button switches light / dark theme (or auto)."],
    ["📦 Ton garde-manger te prévient avant que tes aliments périment.", "📦 Your pantry warns you before food expires."],
    ["🎙️ Le micro répond à tes questions : « par quoi remplacer le mascarpone ? »", "🎙️ The mic answers your questions: “what can replace mascarpone?”"],
    ["⚖️ Dans une recette, convertis les quantités en mesures américaines (oz, cups, °F).", "⚖️ In a recipe, convert amounts to US units (oz, cups, °F)."],
    ["🎯 Fixe un objectif nutritionnel : chaque recette te dit si elle te convient.", "🎯 Set a nutrition goal: each recipe tells you if it fits."],
    ["🥕 Le vide-frigo te propose des recettes avec ce que tu as déjà.", "🥕 The fridge-emptier suggests recipes from what you already have."],
    ["📸 Partage une recette en belle image, prête pour une story Instagram.", "📸 Share a recipe as a nice image, ready for an Instagram story."],
    ["👨‍🍳 Lance le mode pas-à-pas : minuteurs et lecture vocale, mains libres.", "👨‍🍳 Start step-by-step mode: timers and voice reading, hands-free."],
    ["⭐ Range tes favoris en collections (des dossiers) pour t'y retrouver.", "⭐ Organize your favorites into collections (folders)."],
  ];

  const off = () => { try { return Date.now() < parseInt(localStorage.getItem(LS_OFF) || "0", 10); } catch (e) { return false; } };
  const couper = () => { try { localStorage.setItem(LS_OFF, String(Date.now() + 7 * 864e5)); } catch (e) {} };

  function injecterStyle() {
    if (document.getElementById("tip-style")) return;
    const s = document.createElement("style");
    s.id = "tip-style";
    s.textContent = `
      #tip-bloc{display:flex;align-items:center;gap:8px;margin:0 0 16px;
        background:rgba(var(--accent-rgb),.10);border:1px solid rgba(var(--accent-rgb),.30);
        border-radius:14px;padding:10px 12px;font-family:system-ui,-apple-system,sans-serif}
      #tip-bloc .tip-txt{flex:1;min-width:0;color:var(--text);font-size:13.5px;line-height:1.35}
      #tip-bloc .tip-next,#tip-bloc .tip-close{flex:none;border:none;cursor:pointer;border-radius:8px;
        width:30px;height:30px;font-size:14px;background:rgba(var(--w),.10);color:var(--text)}
      #tip-bloc .tip-close{font-size:12px;color:var(--text-3)}
    `;
    document.head.appendChild(s);
  }

  let idx = 0;
  function texte() { const a = ASTUCES[idx % ASTUCES.length]; return EN() ? a[1] : a[0]; }

  function injecter() {
    if (off()) return;
    const sec = document.getElementById("section-accueil");
    if (!sec || document.getElementById("tip-bloc")) return;
    injecterStyle();
    // démarre sur une astuce "du jour" pour varier sans hasard pur
    const d = new Date();
    idx = (d.getFullYear() + d.getMonth() + d.getDate()) % ASTUCES.length;
    const bloc = document.createElement("div");
    bloc.id = "tip-bloc";
    bloc.innerHTML =
      '<span class="tip-txt"><b>' + (EN() ? "Did you know? " : "Le savais-tu ? ") + '</b><span id="tip-contenu"></span></span>' +
      '<button class="tip-next" title="' + (EN() ? "Next" : "Astuce suivante") + '">→</button>' +
      '<button class="tip-close" title="' + (EN() ? "Hide" : "Masquer") + '">✕</button>';
    sec.insertBefore(bloc, sec.firstChild);
    bloc.querySelector("#tip-contenu").textContent = texte();
    bloc.querySelector(".tip-next").addEventListener("click", () => { idx++; bloc.querySelector("#tip-contenu").textContent = texte(); });
    bloc.querySelector(".tip-close").addEventListener("click", () => { couper(); bloc.remove(); });
  }

  function brancher() {
    // Réinjecte à chaque affichage de l'accueil (placé en tête).
    if (typeof window.afficherAccueil === "function" && !window.afficherAccueil._tip) {
      const orig = window.afficherAccueil;
      window.afficherAccueil = function () { const r = orig.apply(this, arguments); try { injecter(); } catch (e) {} return r; };
      window.afficherAccueil._tip = true;
    }
    try { injecter(); } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(brancher, 0));
  else setTimeout(brancher, 0);
})();
