// =============================================================================
// 👤 menu_compte.js — le menu derrière l'avatar, et la barre du bas (v5.1.7)
// -----------------------------------------------------------------------------
// Avant : l'en-tête empilait le titre, la connexion et six petits boutons (thème,
// couleur, langue, amélioration, aide, quoi de neuf) — 191 px avant la première
// recette sur un téléphone. Tout ça vit maintenant derrière l'avatar, dans une
// feuille qui monte du bas.
//
// RÈGLE DU FICHIER : on ne réimplémente aucun comportement. Chaque ligne du menu
// clique le bouton d'origine, resté masqué dans #entete-outils-caches — c'est lui
// qui porte l'état que theme.js (emoji du thème), i18n.js (FR/EN) et whatsnew.js
// (pastille rouge) continuent d'écrire. On ne fait que recopier et déclencher.
// =============================================================================

(function () {
  const T = (fr, en) => (window.LANG === "en" ? en : fr);
  const $ = (id) => document.getElementById(id);
  // Un bouton masqué reste piloté par son propre style inline : c'est lui qui dit
  // si l'entrée a lieu d'être (Mon profil, Admin).
  const propose = (id) => { const e = $(id); return !!e && e.style.display !== "none"; };
  const cliquer = (id) => { const e = $(id); if (e) e.click(); };

  // ---------------------------------------------------------------- état recopié
  function libelleTheme() {
    const emoji = (($("btn-theme") || {}).textContent || "🌙").trim();
    if (emoji === "☀️") return T("Clair", "Light");
    if (emoji === "🌗") return T("Auto", "Auto");
    return T("Sombre", "Dark");
  }
  function duNeuf() {
    const p = $("qdn-dot");
    return !!p && p.style.display !== "none";
  }
  function badgeAdmin() {
    const b = $("nav-admin-badge");
    return b && b.style.display !== "none" ? (b.textContent || "").trim() : "";
  }

  // ------------------------------------------------------------------- l'avatar
  // Reflète l'état de connexion : photo, initiale, ou la silhouette par défaut.
  function majAvatar() {
    const ico = $("btn-compte-ico");
    const point = $("btn-compte-point");
    if (point) point.style.display = duNeuf() ? "" : "none";
    if (!ico) return;
    const zone = $("zone-utilisateur");
    const photo = zone && zone.querySelector(".avatar-photo");
    const initiales = zone && zone.querySelector(".avatar-initiales");
    if (photo) {
      ico.innerHTML = "";
      const img = document.createElement("img");
      img.src = photo.getAttribute("src");
      img.alt = "";
      img.referrerPolicy = "no-referrer";
      ico.appendChild(img);
      ico.classList.add("avec-photo");
    } else if (initiales) {
      ico.textContent = initiales.textContent.trim().slice(0, 1);
      ico.classList.remove("avec-photo");
      ico.classList.add("avec-initiale");
    } else {
      ico.textContent = "👤";
      ico.classList.remove("avec-photo", "avec-initiale");
    }
  }
  window.majAvatarCompte = majAvatar;

  // -------------------------------------------------------------- les lignes
  function ligne(ico, libelle, valeur, action, extra) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "ligne-compte";
    b.innerHTML =
      '<span class="ligne-ico" aria-hidden="true">' + ico + "</span>" +
      '<span class="ligne-lib"></span>' +
      (valeur ? '<span class="ligne-val"></span>' : "") +
      (extra || "");
    b.querySelector(".ligne-lib").textContent = libelle;
    if (valeur) b.querySelector(".ligne-val").textContent = valeur;
    b.addEventListener("click", action);
    return b;
  }
  function groupe(lignes) {
    const g = document.createElement("div");
    g.className = "groupe-compte";
    lignes.filter(Boolean).forEach((l) => g.appendChild(l));
    return g;
  }

  function rendreListe() {
    const liste = $("feuille-compte-liste");
    if (!liste) return;
    liste.innerHTML = "";

    // 1. Ce qu'on fait dans l'appli
    liste.appendChild(groupe([
      propose("btn-mon-profil")
        ? ligne("👤", T("Mon profil", "My profile"), "", () => { fermer(); cliquer("btn-mon-profil"); })
        : null,
      ligne("📊", T("Mes stats", "My stats"), "", () => { fermer(); allerStats(); }),
      ligne("➕", T("Ajouter une recette", "Add a recipe"), "", () => { fermer(); cliquer("btn-contribution"); }),
      propose("nav-admin")
        ? ligne("🛡️", T("Espace admin", "Admin area"), badgeAdmin(), () => { fermer(); cliquer("nav-admin"); })
        : null,
    ]));

    // 2. Les réglages d'apparence : on reste dans le menu pour voir l'effet
    liste.appendChild(groupe([
      ligne("🌙", T("Thème", "Theme"), libelleTheme(), () => { cliquer("btn-theme"); rendreListe(); }),
      ligne("🎨", T("Couleur de l'appli", "App colour"), "", () => { fermer(); cliquer("btn-couleurs"); }),
      ligne("🌐", T("Langue", "Language"), window.LANG === "en" ? "English" : "Français",
        () => { fermer(); cliquer("btn-lang"); }),
    ]));

    // 3. Aide et nouvelles
    liste.appendChild(groupe([
      ligne("💡", T("Suggérer une amélioration", "Suggest an improvement"), "", () => { fermer(); cliquer("btn-amelioration"); }),
      ligne("❓", T("Aide et tour guidé", "Help and guided tour"), "", () => { fermer(); cliquer("btn-aide"); }),
      ligne("ℹ️", T("Quoi de neuf", "What's new"), "", () => { fermer(); cliquer("btn-quoi-de-neuf"); },
        duNeuf() ? '<span class="ligne-point"></span>' : ""),
    ]));
  }

  // --------------------------------------------------------- ouvrir / fermer
  function ouvrir() {
    const f = $("feuille-compte"), v = $("voile-compte");
    if (!f || !v) return;
    rendreListe();
    v.style.display = "block";
    f.style.display = "block";
    // laisser le temps au display de s'appliquer avant l'animation
    requestAnimationFrame(() => f.classList.add("ouverte"));
    document.addEventListener("keydown", surEchap);
    if (typeof window._backGuardPush === "function") window._backGuardPush();
  }
  function fermer() {
    const f = $("feuille-compte"), v = $("voile-compte");
    if (f) { f.classList.remove("ouverte"); f.style.display = "none"; }
    if (v) v.style.display = "none";
    document.removeEventListener("keydown", surEchap);
  }
  function surEchap(e) { if (e.key === "Escape") fermer(); }

  window.ouvrirMenuCompte = ouvrir;
  window.fermerMenuCompte = fermer;

  // Bouton retour Android : la feuille se ferme comme une modale.
  try {
    if (typeof _MODALS_SURVEILLEES !== "undefined" && Array.isArray(_MODALS_SURVEILLEES)) {
      _MODALS_SURVEILLEES.push({ id: "feuille-compte", close: fermer });
    }
  } catch (e) {}

  // ------------------------------------------------------------ barre du bas
  // Recettes et Favoris sont maintenant atteignables depuis n'importe quel onglet.
  // Ces deux vues n'avaient jamais à rétablir la barre de recherche ni à masquer
  // Stats/Admin : on ne pouvait y arriver que depuis l'accueil.
  window.ongletGrille = function (btn) {
    document.querySelectorAll(".nav-bottom .nav-btn").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    const recherche = document.querySelector(".search-bar");
    if (recherche) recherche.style.display = "";
    ["section-stats", "section-admin", "section-cuisine", "section-planificateur", "section-festif"]
      .forEach((id) => { const e = $(id); if (e) e.style.display = "none"; });
  };

  function allerStats() {
    document.querySelectorAll(".nav-bottom .nav-btn").forEach((b) => b.classList.remove("active"));
    if (typeof afficherSection === "function") afficherSection("stats");
  }

  // --------------------------------------------------------------- démarrage
  function demarrer() {
    majAvatar();
    // La pastille « quoi de neuf » et l'état de connexion arrivent après coup :
    // on suit les deux éléments d'origine plutôt que de deviner le bon moment.
    try {
      const obs = new MutationObserver(() => { majAvatar(); });
      const point = $("qdn-dot");
      const zone = $("zone-utilisateur");
      if (point) obs.observe(point, { attributes: true, attributeFilter: ["style"] });
      if (zone) obs.observe(zone, { childList: true, subtree: true });
    } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
