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
  // La grille vide sert à deux endroits : les filtres sans résultat et l'onglet Favoris.
  // On reconnaît Favoris à sa barre de chips (pas de variable globale à tenir à jour).
  function enVueFavoris() {
    const chips = document.getElementById("filtres-favoris-chips");
    const chipRec = document.getElementById("chip-fav-recettes");
    return !!(chips && chips.style.display !== "none" && chipRec && chipRec.classList.contains("active"));
  }

  // v5.2.3 : le message dépend de l'endroit. Sans compte, Favoris ouvrait la fenêtre de
  // connexion en pleine figure sans rien expliquer — maintenant l'onglet se présente.
  function contenuEtatVide(cle) {
    const en = (window.LANG === "en");
    const versRecettes = '<button class="grille-vide-btn" type="button" ' +
      "onclick=\"document.querySelectorAll('.nav-bottom .nav-btn')[1].click()\">🍳 " +
      (en ? "Browse the recipes" : "Parcourir les recettes") + "</button>";
    if (cle === "favoris-visiteur") {
      return '<div class="grille-vide-emoji">⭐</div>' +
        '<p class="grille-vide-titre">' + (en ? "Your favourite recipes land here" : "Tes recettes préférées atterrissent ici") + "</p>" +
        '<p class="grille-vide-sous">' + (en ? "Tap the 🤍 on a recipe — no account needed." : "Touche le 🤍 d'une recette : pas besoin de compte.") + "</p>" +
        '<div class="grille-vide-actions">' + versRecettes +
          '<button class="grille-vide-btn" type="button" onclick="ouvrirModalAuth()">👤 ' + (en ? "Sign in" : "Me connecter") + "</button></div>" +
        '<p class="grille-vide-note">' +
          (en ? "With a free account, you find them on all your devices."
              : "Avec un compte (gratuit), tu les retrouves sur tous tes appareils.") + "</p>";
    }
    if (cle === "favoris") {
      return '<div class="grille-vide-emoji">❤️</div>' +
        '<p class="grille-vide-titre">' + (en ? "No favourites yet" : "Aucun favori pour l'instant") + "</p>" +
        '<p class="grille-vide-sous">' + (en ? "Tap the 🤍 on a recipe to keep it here." : "Touche le 🤍 d'une recette pour la garder ici.") + "</p>" +
        '<div class="grille-vide-actions">' + versRecettes + "</div>";
    }
    return '<div class="grille-vide-emoji">🍳</div>' +
      '<p class="grille-vide-titre">' + (en ? "No recipe with these filters" : "Aucune recette avec ces filtres") + "</p>" +
      '<p class="grille-vide-sous">' + (en ? "Try removing one, or start over." : "Essaie d'en retirer un, ou repars de zéro.") + "</p>" +
      '<div class="grille-vide-actions"><button class="grille-vide-btn" type="button" ' +
      'onclick="try{if(typeof reinitFiltresAvances===\'function\')reinitFiltresAvances()}catch(e){};' +
      "if(typeof afficherRecettes==='function')afficherRecettes()\">↺ " +
      (en ? "Reset the filters" : "Réinitialiser les filtres") + "</button></div>";
  }

  function assurerEtatVide(g) {
    let ev = document.getElementById("grille-vide");
    if (!ev) {
      ev = document.createElement("div");
      ev.id = "grille-vide";
      ev.style.display = "none";
      ev.dataset.contexte = "filtres";
      ev.innerHTML = contenuEtatVide("filtres");
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
    if (enGrille) {
      const cle = enVueFavoris() ? (window.currentUser ? "favoris" : "favoris-visiteur") : "filtres";
      // On ne réécrit que si le contexte change : l'observateur qui appelle maj()
      // surveille cette grille, une réécriture systématique tournerait en boucle.
      if (ev.dataset.contexte !== cle) { ev.dataset.contexte = cle; ev.innerHTML = contenuEtatVide(cle); }
    }
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
