// =============================================================================
// 👋 ONBOARDING — petit accueil au tout premier lancement
// -----------------------------------------------------------------------------
// 3 slides qui présentent les fonctions clés, affichées UNE SEULE FOIS et
// SEULEMENT pour un nouvel utilisateur (on détecte les habitués via leurs
// données locales pour ne pas les embêter). Mémorisé en local.
// =============================================================================

(function () {
  const CLE = "cuisineJeje_onboarding_v1";

  const SLIDES = [
    {
      emoji: "🍳",
      titre: "Bienvenue dans La Cuisine de Jéjé",
      texte: "Plus de 1700 recettes maison, des menus de la semaine générés en un clic et ta liste de courses rangée automatiquement par rayon."
    },
    {
      emoji: "👨‍🍳",
      titre: "Cuisine les mains libres",
      texte: "Le mode cuisson affiche les étapes en grand, les lit à voix haute et lance plusieurs minuteurs en parallèle. Plus besoin de toucher l'écran avec les doigts pleins de farine."
    },
    {
      emoji: "🥕",
      titre: "Zéro gaspillage",
      texte: "Le vide-frigo te dit quoi cuisiner avec ce que tu as déjà, et ton garde-manger te prévient avant que les aliments ne périment."
    }
  ];

  let _idx = 0;

  function dejaVu() { try { return localStorage.getItem(CLE) === "1"; } catch (e) { return false; } }
  function marquerVu() { try { localStorage.setItem(CLE, "1"); } catch (e) {} }

  // Habitué = a déjà des données locales de l'app → on ne montre PAS l'accueil
  function estHabitue() {
    try {
      if (localStorage.getItem("qdn_vue") || localStorage.getItem("cuisineJeje_histMenus")) return true;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.indexOf("cuisineJeje_") === 0 && k !== CLE) return true;
      }
    } catch (e) {}
    return false;
  }

  function injecterStyle() {
    if (document.getElementById("onb-style")) return;
    const s = document.createElement("style");
    s.id = "onb-style";
    s.textContent = `
      #onb-overlay{position:fixed;inset:0;z-index:100002;background:rgba(10,8,14,.92);display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px)}
      .onb-card{background:#211e26;border:1px solid rgba(var(--w),.12);border-radius:22px;max-width:400px;width:100%;padding:28px 24px 22px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.5)}
      .onb-emoji{font-size:60px;line-height:1;margin-bottom:14px}
      .onb-titre{font-size:21px;font-weight:800;color:var(--text);margin:0 0 10px}
      .onb-texte{font-size:15px;line-height:1.6;color:var(--text-2);margin:0 0 22px;min-height:96px}
      .onb-dots{display:flex;gap:8px;justify-content:center;margin-bottom:20px}
      .onb-dot{width:8px;height:8px;border-radius:50%;background:rgba(var(--w),.25);transition:all .25s}
      .onb-dot.on{background:var(--accent,#ff4d88);width:22px;border-radius:5px}
      .onb-actions{display:flex;align-items:center;gap:12px}
      .onb-skip{background:none;border:none;color:var(--text-3);font-size:14px;cursor:pointer;padding:8px}
      .onb-next{flex:1;background:linear-gradient(90deg,#ff6ba1,#ff5b95);color:var(--text);border:none;border-radius:14px;padding:14px;font-size:16px;font-weight:700;cursor:pointer}
      .onb-next:focus-visible,.onb-skip:focus-visible{outline:3px solid #ff8fb3;outline-offset:2px}
    `;
    document.head.appendChild(s);
  }

  function rendre() {
    const s = SLIDES[_idx];
    const dernier = _idx === SLIDES.length - 1;
    const dots = SLIDES.map((_, i) => `<span class="onb-dot ${i === _idx ? "on" : ""}"></span>`).join("");
    const ov = document.getElementById("onb-overlay");
    ov.querySelector(".onb-card").innerHTML = `
      <div class="onb-emoji" aria-hidden="true">${s.emoji}</div>
      <h2 class="onb-titre">${s.titre}</h2>
      <p class="onb-texte">${s.texte}</p>
      <div class="onb-dots" aria-hidden="true">${dots}</div>
      <div class="onb-actions">
        ${dernier ? "" : '<button class="onb-skip" onclick="_onbFermer()">Passer</button>'}
        <button class="onb-next" onclick="_onbNext()">${dernier ? "C'est parti ! 🚀" : "Suivant →"}</button>
      </div>`;
  }

  window._onbNext = function () {
    if (_idx >= SLIDES.length - 1) { _onbFermer(); return; }
    _idx++;
    rendre();
  };
  window._onbFermer = function () {
    marquerVu();
    const ov = document.getElementById("onb-overlay");
    if (ov) ov.remove();
  };

  function ouvrir() {
    if (document.getElementById("onb-overlay")) return;
    injecterStyle();
    _idx = 0;
    const ov = document.createElement("div");
    ov.id = "onb-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Bienvenue");
    ov.innerHTML = '<div class="onb-card"></div>';
    document.body.appendChild(ov);
    rendre();
  }
  // Exposé pour rejouer l'accueil depuis un réglage si besoin
  window.ouvrirOnboarding = ouvrir;

  function demarrer() {
    if (dejaVu()) return;
    if (estHabitue()) { marquerVu(); return; } // habitué : on ne montre rien
    // petit délai pour laisser l'app se poser
    setTimeout(ouvrir, 800);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
