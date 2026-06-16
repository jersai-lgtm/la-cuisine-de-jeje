// =============================================================================
// ♿ ACCESSIBILITÉ — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Améliore l'app au chargement (et sur le contenu injecté) sans toucher au HTML :
//   • les cartes recettes (<div onclick>) deviennent focusables et activables au
//     clavier (rôle bouton, Tab, Entrée/Espace)
//   • labels accessibles sur les boutons icône-seul qui en manquent
//     (✕ fermer/effacer, ★ notes, ❤️ favori) + champ de recherche
//   • lien d'évitement "Aller au contenu" + focus clavier bien visible
// =============================================================================

(function () {
  // --- Style : lien d'évitement + focus visible ----------------------------
  (function injecter() {
    if (document.getElementById("a11y-style")) return;
    const s = document.createElement("style");
    s.id = "a11y-style";
    s.textContent = `
      .a11y-skip{position:fixed;top:-60px;left:8px;z-index:100002;background:#ff5b95;color:#fff;
        padding:10px 16px;border-radius:0 0 10px 10px;font-weight:700;text-decoration:none;transition:top .15s}
      .a11y-skip:focus{top:0}
      :focus-visible{outline:3px solid #ff8fb3 !important;outline-offset:2px;border-radius:6px}
      .carte[tabindex]:focus-visible{outline:3px solid #ff8fb3 !important;outline-offset:3px}
    `;
    (document.head || document.documentElement).appendChild(s);
  })();

  function ajouterLienEvitement() {
    if (document.querySelector(".a11y-skip")) return;
    const cible = document.getElementById("section-cartes") || document.querySelector("main") || document.body;
    if (cible && !cible.id) cible.id = "a11y-contenu";
    const a = document.createElement("a");
    a.className = "a11y-skip";
    a.href = "#" + (cible ? cible.id : "");
    a.textContent = "Aller au contenu";
    document.body.insertBefore(a, document.body.firstChild);
  }

  // --- Rend un sous-arbre accessible ---------------------------------------
  const NATIFS = { BUTTON: 1, A: 1, INPUT: 1, TEXTAREA: 1, SELECT: 1, LABEL: 1, SUMMARY: 1 };

  function traiter(racine) {
    if (!racine || racine.nodeType !== 1) return;
    const lot = [];
    if (racine.matches && racine.matches("[onclick]")) lot.push(racine);
    if (racine.querySelectorAll) lot.push(...racine.querySelectorAll("[onclick]"));

    for (const el of lot) {
      const tag = el.tagName;
      if (NATIFS[tag]) {
        // Bouton icône-seul avec un title mais pas de label → recopie le title.
        if (tag === "BUTTON" && !el.getAttribute("aria-label")) {
          const txt = (el.textContent || "").trim();
          if (el.title && !/[a-zA-ZÀ-ÿ]/.test(txt)) el.setAttribute("aria-label", el.title);
        }
        continue;
      }
      // Élément cliquable non-natif (carte, tuile…) → focusable + activable clavier.
      if (!el.hasAttribute("role")) el.setAttribute("role", "button");
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
    }

    // Labels ciblés (idempotent)
    const label = (sel, valeur) => (racine.querySelectorAll ? racine.querySelectorAll(sel) : []).forEach((b) => {
      if (!b.getAttribute("aria-label")) b.setAttribute("aria-label", typeof valeur === "function" ? valeur(b) : valeur);
    });
    label(".modal-fermer", "Fermer");
    label(".search-clear", "Effacer la recherche");
    label('[id^="btn-favori"]', "Ajouter ou retirer des favoris");
    label(".avis-etoile", (b) => { const n = b.dataset.note || ""; return "Noter " + n + " étoile" + (n > "1" ? "s" : ""); });

    const search = (racine.id === "search-input") ? racine : (racine.querySelector && racine.querySelector("#search-input"));
    if (search && !search.getAttribute("aria-label")) {
      search.setAttribute("aria-label", search.getAttribute("placeholder") || "Rechercher une recette");
    }
  }

  // --- Activation clavier des éléments cliquables non-natifs ----------------
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " " && e.key !== "Spacebar") return;
    const el = document.activeElement;
    if (!el || !el.hasAttribute || !el.hasAttribute("onclick")) return;
    if (NATIFS[el.tagName]) return; // les natifs gèrent déjà Entrée/Espace
    e.preventDefault();             // évite le scroll sur Espace
    el.click();
  });

  // --- Lancement + observation du contenu injecté --------------------------
  function demarrer() {
    ajouterLienEvitement();
    traiter(document.body);
    try {
      new MutationObserver((muts) => {
        for (const m of muts) for (const n of m.addedNodes) traiter(n);
      }).observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
