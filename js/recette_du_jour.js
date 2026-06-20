// =============================================================================
// 🗓️ recette_du_jour.js — « La recette du jour »
// -----------------------------------------------------------------------------
// Met en avant UNE recette par jour, identique pour tout le monde et qui change
// chaque jour (choix déterministe à partir de la date). Affichée en tête de
// l'accueil, dans une grande carte cliquable. But : donner une raison d'ouvrir
// l'appli tous les jours. Aucune dépendance serveur, aucun stockage. Bilingue.
// =============================================================================

(function () {
  const EN = () => window.LANG === "en";
  // Catégories peu inspirantes comme « plat du jour » (briques/bases).
  const EXCLURE_CAT = new Set(["sauces", "tartinables"]);

  // Hash simple et stable d'une chaîne → entier positif.
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }

  // Clé du jour : déterministe par date locale (même résultat toute la journée).
  function cleDuJour() {
    if (typeof recettes === "undefined") return null;
    const cles = Object.keys(recettes)
      .filter((k) => { const r = recettes[k]; return r && r.nom && !EXCLURE_CAT.has(r.cat); })
      .sort(); // tri = ordre stable indépendant de l'ordre de chargement
    if (!cles.length) return null;
    const d = new Date();
    const jour = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return cles[hash(jour) % cles.length];
  }

  function injecterStyle() {
    if (document.getElementById("dujour-style")) return;
    const s = document.createElement("style");
    s.id = "dujour-style";
    s.textContent = `
      #accueil-dujour-bloc .dujour-hero{cursor:pointer;position:relative;border-radius:16px;overflow:hidden;
        box-shadow:0 6px 22px rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.08)}
      #accueil-dujour-bloc .dujour-hero img{width:100%;height:200px;object-fit:cover;display:block;
        transition:transform .4s ease}
      #accueil-dujour-bloc .dujour-hero:hover img{transform:scale(1.04)}
      #accueil-dujour-bloc .dujour-grad{position:absolute;inset:0;
        background:linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.15) 55%,rgba(0,0,0,0) 100%)}
      #accueil-dujour-bloc .dujour-tag{position:absolute;top:12px;left:12px;background:rgba(255,255,255,.92);
        color:#1c1a22;font-weight:800;font-size:12px;letter-spacing:.3px;padding:5px 11px;border-radius:999px;
        box-shadow:0 2px 8px rgba(0,0,0,.25)}
      #accueil-dujour-bloc .dujour-cap{position:absolute;left:14px;right:14px;bottom:12px;color:#fff}
      #accueil-dujour-bloc .dujour-nom{font-size:21px;font-weight:800;line-height:1.2;
        text-shadow:0 2px 6px rgba(0,0,0,.6);display:block}
      #accueil-dujour-bloc .dujour-meta{font-size:13px;opacity:.95;margin-top:4px;
        text-shadow:0 1px 4px rgba(0,0,0,.6)}
      @media(min-width:560px){#accueil-dujour-bloc .dujour-hero img{height:260px}}
    `;
    document.head.appendChild(s);
  }

  function rendre() {
    const sec = document.getElementById("section-accueil");
    if (!sec || typeof recettes === "undefined") return;
    const key = cleDuJour();
    if (!key || !recettes[key]) return;
    const r = recettes[key];

    injecterStyle();
    let bloc = document.getElementById("accueil-dujour-bloc");
    if (!bloc) {
      bloc = document.createElement("div");
      bloc.className = "accueil-bloc";
      bloc.id = "accueil-dujour-bloc";
      sec.insertBefore(bloc, sec.firstChild); // tout en haut de l'accueil
    }

    const nom = (typeof getNomRecette === "function") ? getNomRecette(key) : (r.nom || key);
    const img = (typeof getImagePath === "function") ? getImagePath(key) : ("images/" + (key[0] || "_").toLowerCase() + "/" + key + ".webp");
    const onerr = (typeof imgCarteOnerror === "function") ? imgCarteOnerror(key) : "";
    const dra = (typeof drapeau === "function") ? drapeau(r.pays, 14) : "";
    const titre = EN() ? "🗓️ Recipe of the day" : "🗓️ La recette du jour";
    const tag = EN() ? "TODAY" : "DU JOUR";
    const temps = r.temps ? ("⏱ " + r.temps) : "";

    bloc.innerHTML =
      '<div class="accueil-bloc-header"><h2>' + titre + '</h2></div>' +
      '<div class="dujour-hero" onclick="ouvrirFiche(\'' + key + '\',\'\')">' +
        '<img loading="lazy" decoding="async" src="' + img + '" alt="' + nom + '" onerror="' + onerr + '">' +
        '<div class="dujour-grad"></div>' +
        '<span class="dujour-tag">' + tag + '</span>' +
        '<div class="dujour-cap">' +
          '<span class="dujour-nom">' + dra + (r.emoji || "🍽️") + ' ' + nom + '</span>' +
          '<span class="dujour-meta">' + temps + '</span>' +
        '</div>' +
      '</div>';
  }

  // Re-rendu à chaque affichage de l'accueil (et au changement de langue).
  function brancher() {
    if (typeof window.afficherAccueil === "function" && !window.afficherAccueil._dujour) {
      const orig = window.afficherAccueil;
      window.afficherAccueil = function () {
        const res = orig.apply(this, arguments);
        try { rendre(); } catch (e) {}
        return res;
      };
      window.afficherAccueil._dujour = true;
    }
    try { rendre(); } catch (e) {} // si l'accueil est déjà affiché au chargement
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(brancher, 0));
  } else {
    setTimeout(brancher, 0);
  }
  // Le sélecteur de langue déclenche un re-rendu si l'accueil est visible.
  window.addEventListener("languechange", () => { try { rendre(); } catch (e) {} });
})();
