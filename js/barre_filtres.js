// ============================================================
//  barre_filtres.js — Barre d'outils compacte pour les filtres
//  Avant : 5 lignes de puces empilées (Catégories, Pays, Filtrer, Trier, Occasions).
//  Après : 1 ligne Catégories + 3 boutons [🌍 Pays] [⚙️ Filtres (n)] [↕ Trier]
//          qui déplient leurs panneaux à la demande.
//  Principe : on NE TOUCHE PAS au moteur de filtrage. On déplace simplement les
//  lignes de puces existantes (avec leurs onclick) dans des panneaux dépliables.
// ============================================================
(function () {
  "use strict";

  function reorganiser() {
    const cont = document.getElementById("filtres-chips");
    if (!cont) return false;
    if (document.getElementById("barre-outils-filtres")) return true; // déjà fait

    const rowFiltres = document.getElementById("chips-row-filtres");
    const rowTri = document.getElementById("chips-row-tri");
    const rowOcc = document.getElementById("chips-row-occasions");
    if (!rowFiltres || !rowTri || !rowOcc) return false; // app_filtres pas encore injecté

    // Repérer les lignes statiques Catégories (🗂️) et Pays (🌍) par leur label.
    const rows = [...cont.querySelectorAll(":scope > .chips-row")];
    let rowCat = null, rowPays = null;
    rows.forEach(r => {
      const lbl = r.querySelector(".chips-label");
      const t = lbl ? lbl.textContent.trim() : "";
      if (t.charCodeAt(0) === 0x1F5C2 || t.indexOf("🗂") === 0) rowCat = r;       // 🗂️
      else if (t.charCodeAt(0) === 0x1F30D || t.indexOf("🌍") === 0) rowPays = r; // 🌍
    });
    if (!rowCat) rowCat = rows[0] || null;

    const mkPanneau = (id) => {
      const d = document.createElement("div");
      d.className = "filtre-panneau";
      d.id = id;
      d.hidden = true;
      return d;
    };
    const panCategorie = mkPanneau("panneau-categorie");
    const panPays = mkPanneau("panneau-pays");
    const panFiltres = mkPanneau("panneau-filtres");
    const panTri = mkPanneau("panneau-tri");

    if (rowCat) panCategorie.appendChild(rowCat);
    if (rowPays) panPays.appendChild(rowPays);
    panFiltres.appendChild(rowFiltres);
    panFiltres.appendChild(rowOcc);
    panTri.appendChild(rowTri);

    const barre = document.createElement("div");
    barre.id = "barre-outils-filtres";
    barre.className = "barre-outils";
    barre.innerHTML =
      '<button type="button" class="outil-btn" id="outil-categorie" aria-expanded="false">' +
        '<span class="outil-ico">🗂️</span><span class="outil-lib">Catégorie</span><span class="outil-fleche">▾</span></button>' +
      '<button type="button" class="outil-btn" id="outil-pays" aria-expanded="false">' +
        '<span class="outil-ico">🌍</span><span class="outil-lib">Pays</span><span class="outil-fleche">▾</span></button>' +
      '<button type="button" class="outil-btn" id="outil-filtres" aria-expanded="false">' +
        '<span class="outil-ico">⚙️</span><span class="outil-lib">Filtres</span>' +
        '<span class="outil-badge" hidden></span><span class="outil-fleche">▾</span></button>' +
      '<button type="button" class="outil-btn" id="outil-tri" aria-expanded="false">' +
        '<span class="outil-ico">↕</span><span class="outil-lib">Trier</span><span class="outil-fleche">▾</span></button>' +
      '<div class="vue-switch" role="group" aria-label="Affichage des recettes">' +
        '<button type="button" id="vue-grille" class="on" aria-label="Vue grille" title="Vue grille">⊞</button>' +
        '<button type="button" id="vue-liste" aria-label="Vue liste" title="Vue liste compacte">☰</button></div>';

    // Barre d'outils en tête, puis les panneaux dépliables.
    cont.insertBefore(barre, cont.firstChild);
    cont.insertBefore(panCategorie, barre.nextSibling);
    cont.insertBefore(panPays, panCategorie.nextSibling);
    cont.insertBefore(panFiltres, panPays.nextSibling);
    cont.insertBefore(panTri, panFiltres.nextSibling);

    const panneaux = { categorie: panCategorie, pays: panPays, filtres: panFiltres, tri: panTri };
    const boutons = {
      categorie: document.getElementById("outil-categorie"),
      pays: document.getElementById("outil-pays"),
      filtres: document.getElementById("outil-filtres"),
      tri: document.getElementById("outil-tri"),
    };
    function fermerTous(sauf) {
      Object.keys(panneaux).forEach(k => {
        if (k === sauf) return;
        panneaux[k].hidden = true;
        boutons[k].classList.remove("ouvert");
        boutons[k].setAttribute("aria-expanded", "false");
      });
    }
    function basculer(id) {
      const ouvrir = panneaux[id].hidden;
      fermerTous(id);
      panneaux[id].hidden = !ouvrir;
      boutons[id].classList.toggle("ouvert", ouvrir);
      boutons[id].setAttribute("aria-expanded", ouvrir ? "true" : "false");
    }
    boutons.categorie.addEventListener("click", () => basculer("categorie"));
    boutons.pays.addEventListener("click", () => basculer("pays"));
    boutons.filtres.addEventListener("click", () => basculer("filtres"));
    boutons.tri.addEventListener("click", () => basculer("tri"));

    // Catégorie / Pays / Tri (sélection unique) : on referme après un clic sur une puce.
    const fermerApres = (pan) => pan.addEventListener("click", (e) => {
      if (e.target.closest(".chip")) setTimeout(() => fermerTous(null), 120);
    });
    fermerApres(panCategorie);
    fermerApres(panPays);
    fermerApres(panTri);

    // --- Bascule vue grille ⊞ / liste compacte ☰ (mémorisée) ---
    const grille = document.getElementById("section-cartes");
    const KEY_VUE = "cuisineJeje_vueRecettes";
    const bGrille = document.getElementById("vue-grille");
    const bListe = document.getElementById("vue-liste");
    function setVue(v, persister) {
      const liste = (v === "liste");
      if (grille) grille.classList.toggle("vue-liste", liste);
      if (bListe) bListe.classList.toggle("on", liste);
      if (bGrille) bGrille.classList.toggle("on", !liste);
      if (persister) { try { localStorage.setItem(KEY_VUE, v); } catch (e) {} }
    }
    if (bGrille) bGrille.addEventListener("click", () => setVue("grille", true));
    if (bListe) bListe.addEventListener("click", () => setVue("liste", true));
    let vSaved = "grille";
    try { vSaved = localStorage.getItem(KEY_VUE) || "grille"; } catch (e) {}
    setVue(vSaved, false);

    // Clic en dehors de la barre = tout refermer.
    document.addEventListener("click", (e) => {
      if (!cont.contains(e.target)) fermerTous(null);
    });

    // Refermer les panneaux à chaque entrée dans « Recettes ».
    const origAR = window.afficherRecettes;
    if (typeof origAR === "function" && !origAR._barreWrap) {
      window.afficherRecettes = function () {
        const r = origAR.apply(this, arguments);
        fermerTous(null);
        majEtiquettes();
        return r;
      };
      window.afficherRecettes._barreWrap = true;
    }

    majEtiquettes();
    observer(cont);
    return true;
  }

  function majEtiquettes() {
    // --- Catégorie : afficher la catégorie choisie (sinon « Catégorie ») ---
    const btnC = document.getElementById("outil-categorie");
    const panC = document.getElementById("panneau-categorie");
    if (btnC && panC) {
      const a = panC.querySelector(".chip.active");
      const ico = btnC.querySelector(".outil-ico");
      const lib = btnC.querySelector(".outil-lib");
      if (a && !/^tout$/i.test(a.textContent.trim())) {
        ico.style.display = "none";
        lib.textContent = a.textContent.trim();
        btnC.classList.add("actif");
      } else {
        ico.style.display = "";
        lib.textContent = "Catégorie";
        btnC.classList.remove("actif");
      }
    }
    // --- Pays : afficher le pays choisi (sinon « Pays ») ---
    const btnP = document.getElementById("outil-pays");
    const panP = document.getElementById("panneau-pays");
    if (btnP && panP) {
      const a = panP.querySelector(".chip.active");
      const ico = btnP.querySelector(".outil-ico");
      const lib = btnP.querySelector(".outil-lib");
      if (a && !/^tout$/i.test(a.textContent.trim())) {
        ico.style.display = "none";
        lib.textContent = a.textContent.trim();
        btnP.classList.add("actif");
      } else {
        ico.style.display = "";
        lib.textContent = "Pays";
        btnP.classList.remove("actif");
      }
    }
    // --- Filtres : pastille du nombre de critères actifs (Filtrer + Occasions) ---
    const btnF = document.getElementById("outil-filtres");
    const panF = document.getElementById("panneau-filtres");
    if (btnF && panF) {
      const n = panF.querySelectorAll(".chip.active").length;
      const badge = btnF.querySelector(".outil-badge");
      if (n > 0) { badge.textContent = n; badge.hidden = false; btnF.classList.add("actif"); }
      else { badge.hidden = true; btnF.classList.remove("actif"); }
    }
    // --- Trier : afficher le critère actif (sinon « Trier ») ---
    const btnT = document.getElementById("outil-tri");
    const panT = document.getElementById("panneau-tri");
    if (btnT && panT) {
      const a = panT.querySelector(".chip-tri.active");
      const ico = btnT.querySelector(".outil-ico");
      const lib = btnT.querySelector(".outil-lib");
      if (a) {
        ico.style.display = "none";
        lib.textContent = a.textContent.trim();
        btnT.classList.add("actif");
      } else {
        ico.style.display = "";
        lib.textContent = "Trier";
        btnT.classList.remove("actif");
      }
    }
  }

  function observer(cont) {
    let pending = false;
    const obs = new MutationObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; majEtiquettes(); });
    });
    obs.observe(cont, { subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  function demarrer(tries) {
    if (reorganiser()) return;
    if ((tries || 0) > 60) return; // abandon après ~9 s
    setTimeout(() => demarrer((tries || 0) + 1), 150);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => demarrer(0));
  else demarrer(0);
})();
