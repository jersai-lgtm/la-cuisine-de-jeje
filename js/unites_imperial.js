// =============================================================================
// ⚖️ unites_imperial.js — Bascule métrique ↔ impérial dans la fiche recette
// -----------------------------------------------------------------------------
// Surtout utile pour les visiteurs anglophones (oz, cups, °F). Un bouton dans
// la fiche convertit À LA VOLÉE les quantités du tableau et des étapes :
//   g→oz/lb, kg→lb, ml→fl oz/cups, cl/l→cups, °C→°F, cm→in.
// La conversion est purement côté affichage : on garde l'original métrique dans
// data-metric-orig et on peut rebasculer sans rien perdre. Préférence mémorisée.
// Aucune dépendance : un MutationObserver ré-applique après chaque re-rendu
// (changement de nombre de personnes, etc.). Bilingue.
// =============================================================================

(function () {
  const LS = "uniteSysteme";
  const EN = () => window.LANG === "en";
  const get = () => { try { return localStorage.getItem(LS) === "imperial" ? "imperial" : "metric"; } catch (e) { return "metric"; } };
  const set = (v) => { try { localStorage.setItem(LS, v); } catch (e) {} };

  // Arrondi « lisible » : entier au-dessus de 10, 1 décimale entre 1 et 10, 2 en dessous.
  function fmt(x) {
    if (x >= 10) return String(Math.round(x));
    if (x >= 1) return String(Math.round(x * 10) / 10);
    return String(Math.round(x * 100) / 100);
  }
  function tempF(n) { return (Math.round((n * 9 / 5 + 32) / 5) * 5) + "°F"; }

  function conv(numStr, unit) {
    const n = parseFloat(String(numStr).replace(",", "."));
    if (isNaN(n)) return null;
    switch (unit) {
      case "kg": return fmt(n * 2.20462) + " lb";
      case "g":  return n >= 454 ? fmt(n / 453.6) + " lb" : fmt(n * 0.035274) + " oz";
      case "l":  return fmt(n * 4.22675) + " cups";
      case "cl": return conv(n * 10, "ml");
      case "ml": {
        if (n >= 240) { const c = n / 236.6; return fmt(c) + (c >= 1.5 ? " cups" : " cup"); }
        return n >= 15 ? fmt(n * 0.033814) + " fl oz" : fmt(n / 14.79) + " tbsp";
      }
      case "cm": return fmt(n * 0.393701) + " in";
    }
    return null;
  }

  function convertString(s) {
    return String(s)
      .replace(/(\d+(?:[.,]\d+)?)\s*°\s*C\b/g, (m, n) => tempF(parseFloat(n.replace(",", "."))))
      .replace(/(\d+(?:[.,]\d+)?)\s*(kg|g|ml|cl|l|cm)\b/g, (m, n, u) => conv(n, u) || m);
  }

  // Éléments porteurs de quantités dans la fiche : quantités d'ingrédients (<b>),
  // texte des étapes (<p>) et badges d'étapes.
  function cibles(root) {
    return [...root.querySelectorAll(".fiche-ingredients-liste b, .fiche-etape-contenu p, .etape-badge")];
  }

  function appliquer(root) {
    const imp = get() === "imperial";
    cibles(root).forEach((el) => {
      if (el.children.length) return;              // élément texte simple uniquement
      if (imp) {
        if (el.dataset.metricOrig == null) el.dataset.metricOrig = el.textContent;
        const c = convertString(el.dataset.metricOrig);
        if (el.textContent !== c) el.textContent = c;     // n'écrit que si ça change (évite de réveiller d'autres observers)
      } else if (el.dataset.metricOrig != null && el.textContent !== el.dataset.metricOrig) {
        el.textContent = el.dataset.metricOrig;
      }
    });
  }

  function label(imp) {
    if (EN()) return imp ? "⚖️ Switch to metric (g, °C)" : "⚖️ Switch to imperial (oz, °F)";
    return imp ? "⚖️ Repasser en métrique (g, °C)" : "⚖️ Convertir en impérial (oz, °F)";
  }

  function injecterStyle() {
    if (document.getElementById("unit-toggle-style")) return;
    const s = document.createElement("style");
    s.id = "unit-toggle-style";
    s.textContent = `
      .unit-toggle-btn{display:inline-flex;align-items:center;gap:6px;margin:0 auto 10px;
        background:rgba(124,200,255,.12);color:var(--text,#eaeaea);border:1px solid rgba(124,200,255,.35);
        border-radius:999px;padding:6px 14px;font-size:13px;font-weight:600;cursor:pointer;
        font-family:system-ui,-apple-system,sans-serif;transition:background .15s}
      .unit-toggle-btn:hover{background:rgba(124,200,255,.22)}
      .unit-toggle-wrap{display:flex;justify-content:center}
    `;
    document.head.appendChild(s);
  }

  function ensureToggle(root) {
    const liste = root.querySelector(".fiche-ingredients-liste");
    if (!liste) return;
    if (root.querySelector("#unit-toggle-wrap")) return;
    const imp = get() === "imperial";
    const wrap = document.createElement("div");
    wrap.className = "unit-toggle-wrap";
    wrap.id = "unit-toggle-wrap";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "unit-toggle-btn";
    btn.textContent = label(imp);
    btn.addEventListener("click", () => {
      set(get() === "imperial" ? "metric" : "imperial");
      appliquer(root);
      btn.textContent = label(get() === "imperial");
    });
    wrap.appendChild(btn);
    liste.insertAdjacentElement("beforebegin", wrap);
  }

  // Applique la conversion sur la fiche actuellement rendue (appelé APRÈS chaque
  // rendu, pas via observer → aucun risque de boucle avec les observers de l'app).
  function refresh() {
    const root = document.getElementById("modal-resultat");
    if (!root || !root.querySelector(".fiche-ingredients-liste")) return;
    injecterStyle();
    ensureToggle(root);
    appliquer(root);
  }

  // Branche la conversion sur le rendu de fiche (choisirRecette : ouverture,
  // changement de nombre de personnes, navigation entre recettes liées).
  function brancher() {
    if (typeof window.choisirRecette !== "function") { setTimeout(brancher, 300); return; }
    if (!window.choisirRecette._imperial) {
      const orig = window.choisirRecette;
      window.choisirRecette = function () {
        const res = orig.apply(this, arguments);
        try { refresh(); } catch (e) {}
        return res;
      };
      window.choisirRecette._imperial = true;
    }
    try { refresh(); } catch (e) {} // si une fiche est déjà ouverte
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(brancher, 0));
  } else {
    setTimeout(brancher, 0);
  }
  window.addEventListener("languechange", () => { try { refresh(); } catch (e) {} });
})();
