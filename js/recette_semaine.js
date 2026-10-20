// =============================================================================
// 🗓️ recette_semaine.js — « Les recettes de la semaine »
// -----------------------------------------------------------------------------
// Une vitrine de ~15 recettes à piocher pour composer son menu de la semaine,
// choisie selon la MÉTÉO locale (window._meteo, cf. meteo.js) et la SAISON. La
// sélection est STABLE sur la semaine (tirage déterministe par n° de semaine) :
// on retrouve la même liste toute la semaine, seule la météo peut la nuancer.
//   • Bloc horizontal sur l'accueil (même patron que « Le top du mois »).
//   • « Tout voir → » ouvre une vue dédiée plein écran (overlay, pas une section
//     de la barre de nav → aucun risque de « deux sections visibles »).
//   • Chaque carte a un bouton « + Menu » qui réutilise le flux EXISTANT
//     ouvrirAjoutMenu() (menu_ajout.js) : jour/repas + ajout au planificateur.
// Aucune dépendance serveur. Bilingue (EN() inline, comme dujour/swipe). Best-effort :
// si la météo échoue, on retombe sur la saison seule.
// =============================================================================

(function () {
  const EN = () => window.LANG === "en";

  // Catégories « repas » retenues pour un menu de semaine (pas de desserts, apéros,
  // boissons, bases… — on veut des plats qu'on met au déjeuner/dîner).
  const INCL_CAT = new Set(["plats", "healthy", "salades", "soupes", "pizzas", "encas"]);
  const CAP_CAT = 4;   // variété : au plus 4 recettes d'une même catégorie dans les 15
  const CAP_PAYS = 3;  // … et au plus 3 d'un même pays

  // ---- Utilitaires déterministes --------------------------------------------
  function hash(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h;
  }
  // Numéro de semaine ISO (année-semaine) → clé stable toute la semaine.
  function cleSemaine() {
    const d = new Date();
    const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const jour = (t.getUTCDay() + 6) % 7;            // Lundi = 0
    t.setUTCDate(t.getUTCDate() - jour + 3);          // jeudi de la semaine
    const premierJeudi = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
    const pjJour = (premierJeudi.getUTCDay() + 6) % 7;
    premierJeudi.setUTCDate(premierJeudi.getUTCDate() - pjJour + 3);
    const sem = 1 + Math.round((t - premierJeudi) / (7 * 24 * 3600e3));
    return t.getUTCFullYear() + "-S" + sem;
  }
  function saison() {
    if (typeof getSaisonActuelle === "function") return getSaisonActuelle();
    const m = new Date().getMonth() + 1;
    if (m >= 3 && m <= 5) return "printemps";
    if (m >= 6 && m <= 8) return "ete";
    if (m >= 9 && m <= 11) return "automne";
    return "hiver";
  }

  // Emoji gradué selon la température (repris de swipe.js pour cohérence visuelle).
  function meteoEmoji(t) {
    if (t >= 30) return "🥵";
    if (t >= 24) return "☀️";
    if (t >= 17) return "🌤️";
    if (t >= 10) return "⛅";
    if (t >= 3) return "🧥";
    return "🥶";
  }
  // Score d'adéquation météo : frais quand il fait chaud, réconfortant quand il fait
  // froid (même logique que le swipe, dupliquée volontairement — la fonction y est privée).
  function scoreMeteo(key, M) {
    const r = recettes[key];
    if (!r) return 0;
    const nom = (r.nom || "").toLowerCase();
    const frais = r.cat === "salades" || /salade|gaspacho|gazpacho|ajoblanco|froid|taboul|ceviche|carpaccio|tartare|vitello|poke|melon|concombre|wrap|tzatziki|rouleau|nem|sushi|maki|smoothie/.test(nom);
    const lourd = r.cat === "soupes" || /gratin|mijot|raclette|fondue|tartiflette|pot.?au.?feu|veloute|ragout|blanquette|cassoulet|fondu|roti|braise|pot.?ee|chili|curry|tajine|hachis|lasagne/.test(nom);
    let s = 0;
    if (M.chaud) { if (frais) s += 2; if (lourd) s -= 2; }
    else if (M.froid) { if (lourd) s += 2; if (frais) s -= 1; }
    return s;
  }

  // ---- Construction du pool (profil + saison + hors-fêtes) -------------------
  function construirePool() {
    if (typeof recettes === "undefined") return [];
    const prefs = window.userProfile && window.userProfile.preferences;
    const motsExclus = new Set();
    if (prefs && typeof ALLERGENES_MOTS !== "undefined") {
      [].concat(prefs.allergies || [], prefs.regimes || [], prefs.allergiesCustom || []).forEach((a) => {
        (ALLERGENES_MOTS[a] || [a]).forEach((m) => motsExclus.add(String(m).toLowerCase()));
      });
    }
    const s = saison();
    const periodeFetes = (typeof moisFetes === "function") && moisFetes();
    return Object.keys(recettes).filter((k) => {
      const r = recettes[k];
      if (!r || !r.nom || !INCL_CAT.has(r.cat)) return false;
      if (typeof RECETTES_NON_REPAS !== "undefined" && RECETTES_NON_REPAS.has && RECETTES_NON_REPAS.has(k)) return false;
      // 🎄 Pas de plat de fêtes hors décembre.
      if (!periodeFetes && typeof estPlatFetes === "function" && estPlatFetes(k)) return false;
      // Saison : on écarte les recettes explicitement hors-saison (non taguées = neutres → on garde).
      if (typeof estHorsSaison === "function" ? estHorsSaison(k) : (Array.isArray(r.saisons) && r.saisons.length && r.saisons.indexOf(s) === -1)) return false;
      // Profil : allergènes / régimes.
      if (motsExclus.size) {
        const t = (typeof texteRecette === "function") ? texteRecette(k) : (r.nom || "").toLowerCase();
        if ([...motsExclus].some((m) => m && t.indexOf(m) > -1)) return false;
      }
      return true;
    });
  }

  // Tri : la météo domine (pas entier), le tirage de la semaine départage de façon
  // stable → même liste toute la semaine, nuancée par la météo du moment.
  function scoreTri(key, sem, M) {
    const bonus = (M && (M.chaud || M.froid)) ? scoreMeteo(key, M) : 0;
    return bonus + hash(sem + ":" + key) / 4294967296; // tirage ∈ [0,1)
  }

  // Les 15 recettes de la semaine (avec garde-fous de variété cat/pays).
  function choisir() {
    const M = window._meteo;
    const sem = cleSemaine();
    const pool = construirePool().sort((a, b) => scoreTri(b, sem, M) - scoreTri(a, sem, M));
    const out = [], parCat = {}, parPays = {};
    for (const k of pool) {
      if (out.length >= 15) break;
      const r = recettes[k], c = r.cat || "", p = r.pays || "";
      if ((parCat[c] || 0) >= CAP_CAT) continue;
      if (p && (parPays[p] || 0) >= CAP_PAYS) continue;
      out.push(k); parCat[c] = (parCat[c] || 0) + 1; if (p) parPays[p] = (parPays[p] || 0) + 1;
    }
    // Repli : si les plafonds laissent moins de 15 (petit pool), compléter sans plafond.
    if (out.length < 15) for (const k of pool) { if (out.length >= 15) break; if (out.indexOf(k) === -1) out.push(k); }
    return out;
  }

  // ---- Textes ----------------------------------------------------------------
  function titre() { return EN() ? "🗓️ This week's recipes" : "🗓️ Recettes de la semaine"; }
  function banniere() {
    const M = window._meteo;
    if (M && typeof M.temp === "number") {
      const t = Math.round(M.temp), e = meteoEmoji(M.temp);
      if (M.chaud) return EN() ? e + " It's hot (" + t + "°) — fresh dishes to pick from this week." : e + " Il fait chaud (" + t + "°) — on mise sur le frais cette semaine.";
      if (M.froid) return EN() ? e + " It's cold (" + t + "°) — comforting dishes this week." : e + " Il fait frais (" + t + "°) — place aux plats qui réconfortent.";
      return EN() ? e + " " + t + "° this week — a seasonal pick to build your menu." : e + " " + t + "° cette semaine — une sélection de saison pour ton menu.";
    }
    const info = (typeof getEmojiSaison === "function") ? getEmojiSaison(saison()) : null;
    const lbl = info ? info.label : "";
    return EN() ? (info ? info.emoji + " " : "") + "A seasonal pick (" + lbl + ") to build your weekly menu." : (info ? info.emoji + " " : "") + "Une sélection de saison (" + lbl + ") pour composer ton menu de la semaine.";
  }

  // ---- Styles ----------------------------------------------------------------
  function injecterStyle() {
    if (document.getElementById("rs-style")) return;
    const s = document.createElement("style");
    s.id = "rs-style";
    s.textContent =
      "#accueil-semaine-bloc .accueil-bloc-header{border-radius:14px;padding:12px 14px;margin-bottom:10px}" +
      "#accueil-semaine-bloc .rs-ban{font-size:12.5px;line-height:1.35;opacity:.95;margin:6px 2px 2px;display:block}" +
      ".rs-cartewrap{position:relative}" +
      ".rs-add{position:absolute;top:7px;right:7px;z-index:3;border:none;cursor:pointer;border-radius:50%;" +
        "width:30px;height:30px;font-size:15px;line-height:1;display:flex;align-items:center;justify-content:center;" +
        "background:var(--accent,#ff4d88);color:#fff;box-shadow:0 2px 8px rgba(0,0,0,.35)}" +
      ".rs-add:active{transform:scale(.92)}" +
      // Vue dédiée (overlay plein écran)
      "#rs-overlay{position:fixed;inset:0;z-index:9050;background:var(--bg,#120f17);display:flex;flex-direction:column}" +
      "#rs-overlay .rs-head{position:sticky;top:0;z-index:2;padding:14px 16px 12px;" +
        "background:linear-gradient(180deg,var(--panel-solid,#1a1a2e),rgba(0,0,0,0));backdrop-filter:blur(4px)}" +
      "#rs-overlay .rs-head-top{display:flex;align-items:center;gap:10px}" +
      "#rs-overlay .rs-back{border:none;background:rgba(255,255,255,.12);color:var(--text,#fff);cursor:pointer;" +
        "width:38px;height:38px;border-radius:50%;font-size:18px;flex:none}" +
      "#rs-overlay .rs-title{font-size:18px;font-weight:800;color:var(--text,#fff)}" +
      "#rs-overlay .rs-ban{display:block;margin:10px 2px 0;font-size:13px;line-height:1.4;color:var(--text,#fff);opacity:.9}" +
      "#rs-overlay .rs-grid{flex:1;overflow:auto;padding:6px 16px 90px;display:grid;" +
        "grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px;align-content:start}" +
      "#rs-overlay .rs-cell{display:flex;flex-direction:column;gap:7px;min-width:0}" +
      "#rs-overlay .rs-cell .mini-carte{width:100%!important;flex:none!important}" +
      "#rs-overlay .rs-add-full{border:none;cursor:pointer;border-radius:11px;padding:10px;font-size:13px;font-weight:700;" +
        "background:var(--accent,#ff4d88);color:#fff}" +
      "#rs-overlay .rs-add-full:active{transform:scale(.98)}";
    document.head.appendChild(s);
  }

  // Bandeau coloré de saison sur l'en-tête (harmonisé avec « Le top du mois »).
  function habillerHeader(el) {
    try {
      const b = (typeof BANNIERE_SAISON !== "undefined") ? BANNIERE_SAISON[saison()] : null;
      if (el && b) { el.style.background = "linear-gradient(95deg," + b.grad[0] + "," + b.grad[1] + ")"; el.style.color = b.texte; }
    } catch (e) {}
  }

  // ---- Carte + bouton « + Menu » ---------------------------------------------
  function carteAvecAjout(key) {
    const base = (typeof miniCarte === "function") ? miniCarte(key) : "";
    if (!base) return "";
    const titreBtn = EN() ? "Add to my menu" : "Ajouter à mon menu";
    const btn = '<button class="rs-add" title="' + titreBtn + '" aria-label="' + titreBtn + '" ' +
      'onclick="event.stopPropagation();if(typeof ouvrirAjoutMenu===\'function\')ouvrirAjoutMenu(\'' + key + '\')">📅</button>';
    return '<div class="rs-cartewrap">' + btn + base + '</div>';
  }

  // ---- Bloc accueil ----------------------------------------------------------
  function rendreBloc() {
    const sec = document.getElementById("section-accueil");
    if (!sec || typeof recettes === "undefined") return;
    injecterStyle();
    const cles = choisir();
    let bloc = document.getElementById("accueil-semaine-bloc");
    if (!cles.length) { if (bloc) bloc.style.display = "none"; return; }
    if (!bloc) {
      bloc = document.createElement("div");
      bloc.className = "accueil-bloc";
      bloc.id = "accueil-semaine-bloc";
      // Juste sous « La recette du jour » si elle existe, sinon en tête de l'accueil.
      const apres = document.getElementById("accueil-dujour-bloc");
      if (apres && apres.parentNode === sec) sec.insertBefore(bloc, apres.nextSibling);
      else sec.insertBefore(bloc, sec.firstChild);
    }
    bloc.style.display = "";
    const voir = EN() ? "See all →" : "Tout voir →";
    bloc.innerHTML =
      '<div class="accueil-bloc-header" id="rs-header">' +
        '<h2 style="margin:0">' + titre() + '</h2>' +
        '<button class="accueil-voir-plus" onclick="ouvrirSemaineComplet()">' + voir + '</button>' +
      '</div>' +
      '<span class="rs-ban">' + banniere() + '</span>' +
      '<div class="accueil-scroll-row">' + cles.map(carteAvecAjout).join("") + '</div>';
    habillerHeader(document.getElementById("rs-header"));
  }

  // ---- Vue dédiée (overlay plein écran) --------------------------------------
  function ouvrirComplet() {
    injecterStyle();
    const cles = choisir();
    fermerComplet();
    const o = document.createElement("div");
    o.id = "rs-overlay";
    const cells = cles.map((k) => {
      const titreBtn = EN() ? "+ Add to my menu" : "+ Ajouter à mon menu";
      return '<div class="rs-cell">' + ((typeof miniCarte === "function") ? miniCarte(k) : "") +
        '<button class="rs-add-full" onclick="if(typeof ouvrirAjoutMenu===\'function\')ouvrirAjoutMenu(\'' + k + '\')">' + titreBtn + '</button></div>';
    }).join("");
    o.innerHTML =
      '<div class="rs-head">' +
        '<div class="rs-head-top">' +
          '<button class="rs-back" aria-label="' + (EN() ? "Back" : "Retour") + '" onclick="fermerSemaineComplet()">←</button>' +
          '<span class="rs-title">' + titre() + '</span>' +
        '</div>' +
        '<span class="rs-ban">' + banniere() + '</span>' +
      '</div>' +
      '<div class="rs-grid">' + cells + '</div>';
    document.body.appendChild(o);
    if (typeof window._backGuardPush === "function") window._backGuardPush();
  }
  function fermerComplet() { const o = document.getElementById("rs-overlay"); if (o) o.remove(); }

  window.ouvrirSemaineComplet = ouvrirComplet;
  window.fermerSemaineComplet = fermerComplet;

  // ---- Branchement (re-rendu à chaque affichage de l'accueil + changement de langue) ----
  function brancher() {
    if (typeof window.afficherAccueil === "function" && !window.afficherAccueil._semaine) {
      const orig = window.afficherAccueil;
      window.afficherAccueil = function () {
        const res = orig.apply(this, arguments);
        try { rendreBloc(); } catch (e) {}
        return res;
      };
      window.afficherAccueil._semaine = true;
    }
    try { rendreBloc(); } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(brancher, 0));
  } else {
    setTimeout(brancher, 0);
  }
  // Re-rendu au changement de langue (et de la vue dédiée si ouverte).
  window.addEventListener("languechange", () => {
    try { rendreBloc(); } catch (e) {}
    try { if (document.getElementById("rs-overlay")) ouvrirComplet(); } catch (e) {}
  });
  // La météo arrive de façon asynchrone (geoloc + fetch) : re-rendre quand elle est prête.
  window.addEventListener("meteoprete", () => { try { rendreBloc(); } catch (e) {} });
})();
