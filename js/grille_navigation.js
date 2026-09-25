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

  // ---- v5.2.6 : rattrapage de la recherche par ingrédients ----
  // « courgette chèvre miel » : les trois ensemble n'existent pas, et l'écran
  // restait vide sans rien dire. On propose maintenant de lâcher un ingrédient,
  // avec le nombre de recettes derrière chaque piste.
  function requeteBarre() {
    const i = document.getElementById("search-input");
    return i ? i.value.trim() : "";
  }
  function normer(s) {
    return (typeof normalizeText === "function") ? normalizeText(s) : String(s || "").toLowerCase().trim();
  }
  // Les mots tapés, tels qu'ils ont été écrits (pour l'affichage) et normalisés
  // (pour la comparaison). Les mots de moins de trois lettres ne comptent pas :
  // la recherche elle-même les ignore, ils ne peuvent donc pas être en cause.
  function motsRequete(q) {
    const vus = new Set();
    return q.split(/[\s,;+]+/).filter(Boolean).map(brut => ({ brut, mot: normer(brut) }))
      .filter(m => {
        if (m.mot.length < 3 || vus.has(m.mot)) return false;
        vus.add(m.mot);
        return true;
      });
  }
  // Combien de cartes pour cette sous-requête, en tenant compte des filtres déjà
  // posés (catégorie, pays…) : le compte affiché doit être celui qu'on obtiendra.
  function compterPour(sousRequete) {
    try {
      if (typeof ensembleCartesPourRequete !== "function") return 0;
      const etat = window._etatAvantRecherche;
      let n = 0;
      ensembleCartesPourRequete(normer(sousRequete)).forEach(el => {
        if (!etat || etat.get(el) !== false) n++;
      });
      return n;
    } catch (e) { return 0; }
  }
  function contenuRechercheVide(q, mots, pistes) {
    const en = (window.LANG === "en");
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const plusieurs = mots.length >= 2;
    let html = '<div class="grille-vide-emoji">🥣</div>' +
      '<p class="grille-vide-titre">' +
        (plusieurs ? (en ? "Nothing with all of that" : "Rien avec tout ça")
                   : (en ? "Nothing found" : "Rien trouvé")) + "</p>" +
      '<p class="grille-vide-sous">' +
        (plusieurs ? esc(mots.map(m => m.brut).join(" + ")) : "« " + esc(mots[0].brut) + " »") + "</p>";
    if (mots.length >= 2) {
      html += '<div id="grille-vide-pistes" class="grille-vide-pistes">' +
        (pistes === null
          ? '<span class="grille-vide-note">' + (en ? "Looking for a way around…" : "Je cherche une porte de sortie…") + "</span>"
          : pistesHTML(pistes, en)) + "</div>";
    }
    html += '<div class="grille-vide-actions"><button class="grille-vide-btn" type="button" ' +
      "onclick=\"if(typeof viderRecherche==='function')viderRecherche()\">↺ " +
      (en ? "Clear the search" : "Vider la recherche") + "</button></div>";
    return html;
  }
  function pistesHTML(pistes, en) {
    if (!pistes.length) {
      return '<span class="grille-vide-note">' +
        (en ? "Not even two of them go together — try another pairing."
            : "Même deux d'entre eux ne se croisent nulle part : essaie une autre association.") + "</span>";
    }
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    return '<span class="grille-vide-note">' + (en ? "Drop one ingredient:" : "En laisser un de côté :") + "</span>" +
      pistes.map(p => '<button class="grille-vide-piste" type="button" onclick="rechercheSansMot(' +
        "'" + esc(p.mot) + "')\">" + (en ? "without " : "sans ") + esc(p.brut) +
        ' <b>' + p.n + "</b></button>").join("");
  }
  // Retire un ingrédient de la barre et relance : c'est la recherche normale qui
  // reprend la main, rien n'est court-circuité.
  window.rechercheSansMot = function (mot) {
    const i = document.getElementById("search-input");
    if (!i) return;
    const reste = i.value.split(/[\s,;+]+/).filter(Boolean).filter(t => normer(t) !== mot);
    i.value = reste.join(" ");
    if (typeof rechercherRecette === "function") rechercherRecette(i.value);
  };
  // Le calcul coûte une passe de recherche par ingrédient : on attend que la
  // frappe se pose, et on abandonne si la requête a changé entre-temps.
  let _timerPistes = null;
  function planifierPistes(mots, cle) {
    clearTimeout(_timerPistes);
    _timerPistes = setTimeout(() => {
      const ev = document.getElementById("grille-vide");
      if (!ev || ev.dataset.contexte !== cle) return;
      const pistes = mots.map(m => ({
        mot: m.mot, brut: m.brut,
        n: compterPour(mots.filter(x => x.mot !== m.mot).map(x => x.brut).join(" ")),
      })).filter(p => p.n > 0).sort((a, b) => b.n - a.n);
      const boite = document.getElementById("grille-vide-pistes");
      if (boite && ev.dataset.contexte === cle) boite.innerHTML = pistesHTML(pistes, window.LANG === "en");
    }, 320);
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
      // Une grille vide avec une recherche en cours, ce n'est pas un problème de
      // filtres : c'est la requête qui ne donne rien. Le message le dit, et
      // propose de relâcher un ingrédient quand il y en a plusieurs.
      const q = (n === 0 && !enVueFavoris()) ? requeteBarre() : "";
      const mots = q ? motsRequete(q) : [];
      if (mots.length) {
        const cle = "recherche:" + mots.map(m => m.mot).join("+");
        if (ev.dataset.contexte !== cle) {
          ev.dataset.contexte = cle;
          ev.innerHTML = contenuRechercheVide(q, mots, null);
          if (mots.length >= 2) planifierPistes(mots, cle);
        }
      } else {
        const cle = enVueFavoris() ? (window.currentUser ? "favoris" : "favoris-visiteur") : "filtres";
        // On ne réécrit que si le contexte change : l'observateur qui appelle maj()
        // surveille cette grille, une réécriture systématique tournerait en boucle.
        if (ev.dataset.contexte !== cle) { ev.dataset.contexte = cle; ev.innerHTML = contenuEtatVide(cle); }
      }
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
