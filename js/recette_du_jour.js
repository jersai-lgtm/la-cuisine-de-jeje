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

  // Saison courante (identique à getSaisonActuelle de l'app + au service worker).
  function saison() {
    if (typeof getSaisonActuelle === "function") return getSaisonActuelle();
    const m = new Date().getMonth() + 1;
    if (m >= 3 && m <= 5) return "printemps";
    if (m >= 6 && m <= 8) return "ete";
    if (m >= 9 && m <= 11) return "automne";
    return "hiver";
  }

  // Clé du jour : déterministe par date locale (même résultat toute la journée),
  // AU GOÛT DE SAISON (on écarte les recettes hors-saison, comme les suggestions).
  function cleDuJour() {
    if (typeof recettes === "undefined") return null;
    const s = saison();
    const periodeFetes = (typeof moisFetes === "function") && moisFetes();
    const eligible = (k) => {
      const r = recettes[k];
      if (!r || !r.nom || EXCLURE_CAT.has(r.cat)) return false;
      // 🎄 Pas de bûche / plat de Noël comme « recette du jour » hors décembre.
      if (!periodeFetes && typeof estPlatFetes === "function" && estPlatFetes(k)) return false;
      return true;
    };
    const deSaison = (k) => { const sa = recettes[k] && recettes[k].saisons; return !sa || !sa.length || sa.indexOf(s) > -1; };
    let cles = Object.keys(recettes).filter((k) => eligible(k) && deSaison(k));
    if (!cles.length) cles = Object.keys(recettes).filter(eligible); // repli : aucune de saison
    if (!cles.length) return null;
    const d = new Date();
    const jour = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    // Tirage INDÉPENDANT du nombre de recettes : on score chaque recette par
    // hash(date + clé) et on garde la plus haute. Ajouter des recettes ne change
    // donc le résultat que si une nouvelle « gagne » ce jour-là (rare) → la
    // recette du jour reste stable même quand le catalogue grandit (déploiements).
    let best = null, bestH = -1;
    for (const k of cles) { const h = hash(jour + ":" + k); if (h > bestH) { bestH = h; best = k; } }
    return best;
  }

  function injecterStyle() {
    if (document.getElementById("dujour-style")) return;
    const s = document.createElement("style");
    s.id = "dujour-style";
    s.textContent = `
      #accueil-dujour-bloc.dujour-vedette{background:linear-gradient(95deg,#f2b705,#ffd54f);
        border-radius:16px;padding:12px 14px 14px}
      #accueil-dujour-bloc.dujour-vedette .accueil-bloc-header{margin-bottom:8px}
      #accueil-dujour-bloc.dujour-vedette .accueil-bloc-header h2{color:#4a3300}
      #accueil-dujour-bloc .dujour-banniere{cursor:pointer;display:flex;align-items:center;gap:12px;
        background:rgba(0,0,0,.14);border:1px solid rgba(0,0,0,.1);border-radius:12px;padding:10px 12px}
      #accueil-dujour-bloc .dujour-banniere:hover{background:rgba(0,0,0,.2)}
      #accueil-dujour-bloc .dujour-thumb{width:56px;height:56px;border-radius:10px;object-fit:cover;
        flex:none;background:rgba(0,0,0,.15)}
      #accueil-dujour-bloc .dujour-info{min-width:0;flex:1}
      #accueil-dujour-bloc .dujour-nomc{font-size:15.5px;font-weight:700;color:#3a2600;
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
      #accueil-dujour-bloc .dujour-metac{font-size:12.5px;color:#5a4200}
      #accueil-dujour-bloc .dujour-chevron{font-size:18px;color:#3a2600;flex:none}

      #dujour-modal{position:fixed;inset:0;z-index:9050;background:rgba(0,0,0,.6);
        display:flex;align-items:flex-end;justify-content:center}
      #dujour-modal .dujour-sheet{position:relative;background:var(--panel-solid,#1a1a2e);color:var(--text);
        border-top-left-radius:20px;border-top-right-radius:20px;width:100%;max-width:560px;
        max-height:86vh;overflow:hidden;display:flex;flex-direction:column}
      #dujour-modal .dujour-x{position:absolute;top:12px;right:12px;z-index:2;background:rgba(0,0,0,.5);
        color:#fff;border:none;border-radius:50%;width:34px;height:34px;font-size:15px;cursor:pointer}
      #dujour-modal .dujour-hero-img{position:relative}
      #dujour-modal .dujour-hero-img img{width:100%;height:auto;max-height:50vh;object-fit:cover;display:block}
      #dujour-modal .dujour-grad{position:absolute;inset:0;
        background:linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.15) 55%,rgba(0,0,0,0) 100%)}
      #dujour-modal .dujour-cap{position:absolute;left:14px;right:14px;bottom:12px;color:#fff}
      #dujour-modal .dujour-nom{font-size:21px;font-weight:800;line-height:1.2;
        text-shadow:0 2px 6px rgba(0,0,0,.6);display:block}
      #dujour-modal .dujour-meta{font-size:13px;opacity:.95;margin-top:4px;
        text-shadow:0 1px 4px rgba(0,0,0,.6)}
      #dujour-modal .dujour-nutri{position:absolute;top:12px;left:12px;z-index:2;transform:scale(1.25);transform-origin:top left}
      #dujour-modal .dujour-cta{margin:14px;padding:13px;border-radius:12px;border:none;cursor:pointer;
        background:var(--accent);color:#1a0e14;font-weight:800;font-size:14.5px;text-align:center}
    `;
    document.head.appendChild(s);
  }

  function fermerModal() { const m = document.getElementById("dujour-modal"); if (m) m.remove(); }
  window.fermerDujourModal = fermerModal;

  function ouvrirModal(key, r, nom, img, onerr, dra, meta, nutriBadge) {
    const dejaOuvert = !!document.getElementById("dujour-modal");
    fermerModal();
    const m = document.createElement("div");
    m.id = "dujour-modal";
    m.innerHTML =
      '<div class="dujour-sheet">' +
        '<button class="dujour-x" aria-label="Fermer">✕</button>' +
        '<div class="dujour-hero-img">' +
          '<img src="' + img + '" alt="' + nom + '" onerror="' + onerr + '">' +
          nutriBadge +
          '<div class="dujour-grad"></div>' +
          '<div class="dujour-cap">' +
            '<span class="dujour-nom">' + dra + (r.emoji || "🍽️") + ' ' + nom + '</span>' +
            '<span class="dujour-meta">' + meta + '</span>' +
          '</div>' +
        '</div>' +
        '<button class="dujour-cta">' + (EN() ? "See full recipe →" : "Voir la recette complète →") + '</button>' +
      '</div>';
    document.body.appendChild(m);
    m.addEventListener("click", (e) => { if (e.target === m) fermerModal(); });
    m.querySelector(".dujour-x").addEventListener("click", fermerModal);
    m.querySelector(".dujour-cta").addEventListener("click", () => { fermerModal(); ouvrirFiche(key, ""); });
    if (!dejaOuvert && typeof window._backGuardPush === "function") window._backGuardPush();
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
      bloc.className = "accueil-bloc dujour-vedette";
      bloc.id = "accueil-dujour-bloc";
      sec.insertBefore(bloc, sec.firstChild); // tout en haut de l'accueil
    }

    const nom = (typeof getNomRecette === "function") ? getNomRecette(key) : (r.nom || key);
    const img = (typeof getImagePath === "function") ? getImagePath(key) : ("images/" + (key[0] || "_").toLowerCase() + "/" + key + ".webp");
    const onerr = (typeof imgCarteOnerror === "function") ? imgCarteOnerror(key) : "";
    const dra = (typeof drapeau === "function") ? drapeau(r.pays, 14) : "";
    const titre = EN() ? "🗓️ Recipe of the day" : "🗓️ La recette du jour";

    // Nutri-Score + prix/calories (par portion), comme sur les cartes de recette.
    let nutriBadge = "", prixCal = "";
    try {
      const tabKey = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
      const base = r.base || 4;
      const ligne = tabKey ? (r[tabKey].find((l) => l.nb === base || l.patons === base) || r[tabKey][0]) : null;
      if (ligne) {
        if (typeof calculerNutriScoreRecette === "function" && r.cat !== "cocktails" && r.cat !== "mocktails") {
          const ns = calculerNutriScoreRecette(ligne);
          if (ns && ns.lettre) nutriBadge = '<span class="dujour-nutri carte-nutri nutri-' + ns.lettre + '" data-lettre="' + ns.lettre + '" title="Nutri-Score ' + ns.lettre + '"></span>';
        }
        if (typeof calculerPrixCaloriesRecette === "function" && r.cat !== "cocktails" && r.cat !== "mocktails") {
          const pc = calculerPrixCaloriesRecette(ligne);
          if (pc) {
            const parts = [];
            if (pc.prix != null) parts.push("💰 " + (pc.prix / base).toFixed(2).replace(".", ",") + " €");
            if (pc.cal != null) parts.push("🔥 " + Math.round(pc.cal / base) + " kcal");
            prixCal = parts.join("  ·  ");
          }
        }
      }
    } catch (e) {}
    const meta = [r.temps ? ("⏱ " + r.temps) : "", prixCal].filter(Boolean).join("  ·  ");

    bloc.innerHTML =
      '<div class="accueil-bloc-header"><h2>' + titre + '</h2></div>' +
      '<div class="dujour-banniere">' +
        '<img class="dujour-thumb" loading="lazy" decoding="async" src="' + img + '" alt="' + nom + '" onerror="' + onerr + '">' +
        '<div class="dujour-info">' +
          '<span class="dujour-nomc">' + dra + (r.emoji || "🍽️") + ' ' + nom + '</span>' +
          '<div class="dujour-metac">' + meta + '</div>' +
        '</div>' +
        '<span class="dujour-chevron">→</span>' +
      '</div>';
    bloc.querySelector(".dujour-banniere").addEventListener("click", () => ouvrirModal(key, r, nom, img, onerr, dra, meta, nutriBadge));
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
