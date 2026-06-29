// ============================================================
//  grille_navigation.js — Repères de navigation dans la grille
//  · Compteur dynamique dans l'en-tête (🍽️ 147 recettes quand on filtre)
//  · État vide clair quand aucun résultat
//  Robuste : un MutationObserver sur #section-cartes capte TOUS les
//  chemins (chips catégorie/pays, recherche, filtres avancés, tri)
//  sans modifier le moteur de filtrage existant.
// ============================================================
(function () {
  "use strict";
  const GRID_ID = "section-cartes";

  function totalRecettes() {
    try { return (typeof recettes !== "undefined") ? Object.keys(recettes).length : 0; }
    catch (e) { return 0; }
  }
  function grilleVisible() {
    const g = document.getElementById(GRID_ID);
    return !!(g && g.classList.contains("visible") && g.style.display !== "none");
  }
  function compterVisibles(g) {
    let n = 0;
    g.querySelectorAll(".carte").forEach(c => {
      if (c.style.display !== "none" && !c.classList.contains("carte--filtre-off")) n++;
    });
    return n;
  }
  function assurerEtatVide(g) {
    let ev = document.getElementById("grille-vide");
    if (!ev) {
      ev = document.createElement("div");
      ev.id = "grille-vide";
      ev.style.display = "none";
      ev.innerHTML =
        '<div class="grille-vide-emoji">🍳</div>' +
        '<p class="grille-vide-titre">Aucune recette avec ces filtres</p>' +
        '<p class="grille-vide-sous">Essaie d\'en retirer un, ou repars de zéro.</p>' +
        '<button class="grille-vide-btn" type="button" ' +
        'onclick="try{if(typeof reinitFiltresAvances===\'function\')reinitFiltresAvances()}catch(e){};' +
        'if(typeof afficherRecettes===\'function\')afficherRecettes()">↺ Réinitialiser les filtres</button>';
      g.appendChild(ev);
    }
    return ev;
  }

  function maj() {
    const g = document.getElementById(GRID_ID);
    if (!g) return;
    const enGrille = grilleVisible();
    const n = compterVisibles(g);
    const total = totalRecettes();
    const en = (window.LANG === "en");

    // ---- Compteur d'en-tête ----
    const elNb = document.getElementById("nb-recettes");
    if (elNb) {
      let txt;
      const filtre = enGrille && total > 0 && n < total;
      if (filtre) {
        txt = "🍽️ " + n + " " + (en ? (n > 1 ? "recipes" : "recipe") : (n > 1 ? "recettes" : "recette"));
      } else {
        txt = "🍽️ " + total + " " + (en ? "recipes" : "recettes");
      }
      if (elNb.textContent !== txt) elNb.textContent = txt;
      elNb.classList.toggle("nb-filtre", !!filtre);
    }

    // ---- État vide ----
    const ev = assurerEtatVide(g);
    const want = (enGrille && n === 0) ? "" : "none";
    if (ev.style.display !== want) ev.style.display = want; // garde anti-boucle
  }
  window.majCompteurGrille = maj;

  function demarrer() {
    const g = document.getElementById(GRID_ID);
    if (!g) { setTimeout(demarrer, 300); return; }
    let pending = false;
    const planifier = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; maj(); });
    };
    // childList : ajout de cartes (genererCartesManquantes) ou réordonnancement (tri)
    // attributes style/class en subtree : affichage/masquage des cartes par les filtres
    new MutationObserver(planifier).observe(g, {
      attributes: true, attributeFilter: ["style", "class"],
      subtree: true, childList: true,
    });
    maj();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();

  window.addEventListener("profilMisAJour", () => setTimeout(maj, 50));
  document.addEventListener("langChanged", () => setTimeout(maj, 50));
})();
