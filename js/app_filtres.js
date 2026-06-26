// =============================================================================
// ⚙️ FILTRES & TRI AVANCÉS — barre de filtres dans la vue Recettes
// -----------------------------------------------------------------------------
// Ajoute une ligne de chips (⏱ Rapide, 💰 Éco, 🥗 Nutri A/B, ⭐ Facile,
// 🌞 De saison) + un tri (temps / coût / calories) sous les chips catégorie/pays.
// Exploite les données déjà calculées : temps, coût & calories
// (calculerPrixCaloriesRecette), Nutri-Score (calculerNutriScoreRecette),
// niveau, et saison (scoreSaisonRecette + champ saisons[]).
//
// Intégration NON invasive : on ne touche pas au pipeline catégorie/pays.
// Les cartes recalées reçoivent la classe .carte--filtre-off (display:none
// !important) qui se combine proprement avec le display posé par les autres
// filtres. Le tri réordonne les .carte de #section-cartes (ordre initial mémorisé).
// =============================================================================

(function () {
  const F = { rapide: false, eco: false, nutri: false, facile: false, saison: false, vege: false, vegan: false, sansgluten: false, leger: false, proteine: false };
  let tri = "";                 // critère de tri : "" | note | temps | cout | cal
  let sensTri = 1;              // +1 = croissant, -1 = décroissant (appliqué à val(a)-val(b))
  let occ = "";                 // occasion active (single-select) : "" = aucune

  // Tris en chips bidirectionnels : neutre → sens « primaire » (nat) → sens inverse → off.
  // nat = multiplicateur du comparateur pour l'étiquette primaire (note : décroissant).
  const TRIS = [
    { crit: "note",  e: "⭐", neutre: "Note",     prim: "Mieux notées",   sec: "Moins bien notées", nat: -1 },
    { crit: "temps", e: "⏱", neutre: "Temps",    prim: "Plus rapide",    sec: "Plus long",         nat: 1 },
    { crit: "cout",  e: "💰", neutre: "Prix",     prim: "Moins cher",     sec: "Plus cher",         nat: 1 },
    { crit: "cal",   e: "🔥", neutre: "Calories", prim: "Moins calorique",sec: "Plus calorique",    nat: 1 },
  ];
  function libTri(t) {
    if (tri !== t.crit) return t.e + " " + t.neutre;
    return t.e + " " + (sensTri === t.nat ? t.prim : t.sec) + (sensTri === 1 ? " ↑" : " ↓");
  }
  function majChipsTri() {
    TRIS.forEach((t) => {
      const b = document.querySelector('.chip-tri[data-crit="' + t.crit + '"]');
      if (!b) return;
      b.textContent = libTri(t);
      b.classList.toggle("active", tri === t.crit);
    });
  }
  window.trierChip = function (crit) {
    const t = TRIS.find((x) => x.crit === crit);
    if (!t) return;
    if (tri === crit) {
      if (sensTri === t.nat) sensTri = -t.nat;      // primaire → inverse
      else { tri = ""; sensTri = 1; }               // inverse → off
    } else { tri = crit; sensTri = t.nat; }          // activer (sens primaire)
    majChipsTri(); appliquerTri(); majCompteur(); persister();
  };

  // Occasions : dérivées de la catégorie + mots-clés (nom/description). Pas de
  // tag manuel sur 1050 recettes ; détection à la volée comme les régimes.
  // Détection sur le NOM (titre) + catégorie uniquement — pas la description,
  // qui contient trop de mots-clés incidents (« grillé », « purée »…) → bruit.
  const OCCASIONS = {
    apero:      { emoji: "🥂", lib: "Apéro",       cats: ["aperitifs", "tartinables", "cocktails", "mocktails"], re: /\b(apero|toast|dip|verrine|gougere|tapas|amuse|feuillete|tartinade|houmous|tapenade|guacamole|nacho|gressin|cake sale|bruschetta|crostini|rillette)\b/ },
    barbecue:   { emoji: "🔥", lib: "Barbecue",    cats: [], re: /\b(barbecue|grillade|grille|brochette|merguez|cotelette|travers|ribs|chipolata|saucisse|plancha|sate|yakitori|spareribs|kebab|chiche|chimichurri|marinade)\b/ },
    piquenique: { emoji: "🧺", lib: "Pique-nique", cats: ["salades"], re: /\b(sandwich|wrap|cake sale|quiche|taboule|pan bagnat|club|tarte salee|focaccia|frittata|muffin sale|roule|pin ?cho)\b/ },
    fetes:      { emoji: "🎄", lib: "Fêtes",       cats: [], re: /\b(buche|foie gras|dinde|chapon|marron|huitre|saumon fume|magret|saint ?jacques|pain d epice|champagne|truffe|tournedos)\b/ },
  };
  const _normTxt = (s) => (typeof normalizeText === "function") ? normalizeText(s) : String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function occasionMatch(cle) {
    if (!occ) return true;
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    if (!r) return false;
    const o = OCCASIONS[occ];
    if (!o) return true;
    if (o.cats.includes(r.cat)) return true;
    if (o.re.test(_normTxt(r._nomFr || r.nom || ""))) return true;  // nom FR (même en EN)
    return false;
  }
  const cache = new Map();      // cle -> métriques
  const regimeCache = {};       // regime -> Set(cles compatibles)
  let ordreInitial = null;      // [.carte] dans l'ordre d'origine (pour le tri "défaut")
  const LSKEY = "lcj_filtres_avances"; // mémorisation entre visites

  const SAISONS = ["hiver","hiver","printemps","printemps","printemps","ete","ete","ete","automne","automne","automne","hiver"];
  const SAISON_DECO = { printemps:["🌱","Printemps"], ete:["🌞","Été"], automne:["🍂","Automne"], hiver:["❄️","Hiver"] };
  function saisonCourante() { return SAISONS[new Date().getMonth()]; }

  function tempsMin(t) {
    if (!t) return null;
    const s = String(t).toLowerCase();
    const h = s.match(/(\d+)\s*h(?:\s*(\d+))?/);
    if (h) return parseInt(h[1], 10) * 60 + (h[2] ? parseInt(h[2], 10) : 0);
    const mn = s.match(/(\d+)\s*min/);
    return mn ? parseInt(mn[1], 10) : null;
  }

  function cleDe(carte) {
    return (typeof extraireCleRecetteCarte === "function") ? extraireCleRecetteCarte(carte) : null;
  }

  function metriques(cle) {
    if (cache.has(cle)) return cache.get(cle);
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    const m = { min: null, coutPers: null, cal: null, prot: null, nutri: null, facile: false, saison: false };
    if (r) {
      m.min = tempsMin(r.temps);
      m.facile = /facile/i.test(r.niveau || "");
      const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
      const base = r.base || 4;
      const ligne = tabKey ? (r[tabKey].find(l => l.nb === base || l.patons === base) || r[tabKey][0]) : null;
      if (ligne) {
        if (typeof calculerPrixCaloriesRecette === "function") {
          try {
            const pc = calculerPrixCaloriesRecette(ligne);
            if (pc) {
              if (pc.prix != null) m.coutPers = pc.prix / (base || 4);
              if (pc.cal != null) m.cal = pc.cal / (base || 4);
              if (pc.prot != null) m.prot = pc.prot / (base || 4);
            }
          } catch (e) {}
        }
        if (typeof calculerNutriScoreRecette === "function") {
          try { const ns = calculerNutriScoreRecette(ligne); if (ns && ns.lettre) m.nutri = ns.lettre; } catch (e) {}
        }
      }
      let s = false;
      if (typeof scoreSaisonRecette === "function") { try { s = scoreSaisonRecette(cle) > 0; } catch (e) {} }
      if (!s && Array.isArray(r.saisons)) s = r.saisons.includes(saisonCourante());
      m.saison = s;
    }
    cache.set(cle, m);
    return m;
  }

  function passe(cle) {
    const m = metriques(cle);
    if (F.rapide && !(m.min != null && m.min <= 30)) return false;
    if (F.eco && !(m.coutPers != null && m.coutPers <= 2)) return false;
    if (F.nutri && !(m.nutri === "A" || m.nutri === "B")) return false;
    if (F.facile && !m.facile) return false;
    if (F.saison && !m.saison) return false;
    if (F.vege) { const s = regimeSet("végétarien"); if (s && !s.has(cle)) return false; }
    if (F.vegan) { const s = regimeSet("vegan"); if (s && !s.has(cle)) return false; }
    if (F.sansgluten) { const s = regimeSet("sans-gluten"); if (s && !s.has(cle)) return false; }
    if (F.leger && !(m.cal != null && m.cal <= 500)) return false;
    if (F.proteine && !(m.prot != null && m.prot >= 20)) return false;
    if (occ && !occasionMatch(cle)) return false;
    return true;
  }
  // Réutilise la détection de régime de la recherche (exclusion par ingrédients)
  function regimeSet(regime) {
    if (regimeCache[regime]) return regimeCache[regime];
    if (typeof getCartesPourRegime !== "function") return null;
    if (!window._searchIndex && typeof construireIndexRecherche === "function") {
      try { construireIndexRecherche(); } catch (e) { return null; }
    }
    try { regimeCache[regime] = new Set(getCartesPourRegime(regime).map(e => e.cle)); }
    catch (e) { return null; }
    return regimeCache[regime];
  }
  const actif = () => Object.keys(F).some(k => F[k]) || !!occ;

  function appliquer() {
    const on = actif();
    const cartes = document.querySelectorAll(".carte");
    cartes.forEach(c => {
      const cle = cleDe(c);
      if (on && cle && !passe(cle)) c.classList.add("carte--filtre-off");
      else c.classList.remove("carte--filtre-off");
    });
    if (tri) appliquerTri();
    majCompteur();
  }

  function appliquerTri() {
    const cont = document.getElementById("section-cartes");
    if (!cont) return;
    if (!ordreInitial) ordreInitial = [...cont.querySelectorAll(".carte")];
    let liste;
    if (!tri) {
      liste = ordreInitial.filter(c => c.isConnected);
    } else {
      // Valeur du critère (null = non disponible → toujours rejeté en fin de liste).
      const val = (c) => {
        const cle = cleDe(c);
        if (tri === "note") {
          const com = (cle && typeof getNoteCommunaute === "function") ? getNoteCommunaute(cle) : null;
          return (com && com.moyenne != null) ? com.moyenne : null;
        }
        const m = metriques(cle);
        return tri === "temps" ? m.min : tri === "cout" ? m.coutPers : m.cal;
      };
      liste = [...cont.querySelectorAll(".carte")].sort((a, b) => {
        const va = val(a), vb = val(b);
        if (va == null && vb == null) return 0;
        if (va == null) return 1;   // manquant → en dernier (dans les deux sens)
        if (vb == null) return -1;
        return (va - vb) * sensTri;
      });
    }
    const frag = document.createDocumentFragment();
    liste.forEach(c => frag.appendChild(c));
    cont.appendChild(frag);
  }

  function majCompteur() {
    const el = document.getElementById("f-compteur");
    if (!el) return;
    if (!actif()) { el.textContent = ""; return; }
    let n = 0;
    document.querySelectorAll(".carte").forEach(c => {
      if (c.style.display !== "none" && !c.classList.contains("carte--filtre-off")) n++;
    });
    el.textContent = n + (n > 1 ? " recettes" : " recette");
  }

  // ---- Mémorisation entre visites ----
  function persister() { try { localStorage.setItem(LSKEY, JSON.stringify({ F, tri, sensTri, occ })); } catch (e) {} }
  function majUIetat() {
    document.querySelectorAll("#chips-row-filtres .chip").forEach(btn => {
      const m = (btn.getAttribute("onclick") || "").match(/toggleFiltreAvance\('(\w+)'/);
      if (m) btn.classList.toggle("active", !!F[m[1]]);
    });
    document.querySelectorAll("#chips-row-occasions .chip").forEach(btn => {
      const m = (btn.getAttribute("onclick") || "").match(/filtrerOccasion\('(\w+)'/);
      if (m) btn.classList.toggle("active", occ === m[1]);
    });
    majChipsTri();
  }
  function chargerEtat() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(LSKEY) || "null"); } catch (e) {}
    const fSaved = (data && data.F) || {};
    Object.keys(F).forEach(k => F[k] = !!fSaved[k]);
    tri = (data && data.tri) || "";
    sensTri = (data && data.sensTri === -1) ? -1 : 1;
    occ = (data && data.occ && OCCASIONS[data.occ]) ? data.occ : "";
  }
  function restaurer() { chargerEtat(); majUIetat(); appliquer(); } // appliqué quand la grille est prête

  // ---- API globale (onclick) ----
  window.toggleFiltreAvance = function (cle, btn) {
    F[cle] = !F[cle];
    if (btn) btn.classList.toggle("active", F[cle]);
    appliquer();
    persister();
  };
  window.trierRecettes = function (valeur) {
    tri = valeur || "";
    appliquerTri();
    majCompteur();
    persister();
  };
  // 🎲 Surprends-moi : ouvre une recette au hasard parmi celles VISIBLES
  // (donc en respectant filtres, occasion, catégorie/pays et recherche en cours).
  window.surprendsMoi = function () {
    const visibles = [...document.querySelectorAll("#section-cartes .carte")]
      .filter(c => c.offsetParent !== null && c.style.display !== "none" && !c.classList.contains("carte--filtre-off"));
    let cle = null;
    if (visibles.length) {
      const c = visibles[Math.floor(Math.random() * visibles.length)];
      cle = cleDe(c);
    } else if (window._searchIndex && window._searchIndex.cartes && window._searchIndex.cartes.length) {
      cle = window._searchIndex.cartes[Math.floor(Math.random() * window._searchIndex.cartes.length)].cle;
    }
    if (cle && typeof ouvrirFiche === "function") ouvrirFiche(cle, "");
  };

  // Occasions : single-select (re-clic = désactive)
  window.filtrerOccasion = function (key, btn) {
    occ = (occ === key) ? "" : key;
    document.querySelectorAll("#chips-row-occasions .chip").forEach(c => c.classList.remove("active"));
    if (occ && btn) btn.classList.add("active");
    appliquer();
    persister();
  };
  window.reinitFiltresAvances = function () {
    Object.keys(F).forEach(k => F[k] = false);
    tri = ""; sensTri = 1;
    occ = "";
    document.querySelectorAll("#chips-row-occasions .chip.active").forEach(c => c.classList.remove("active"));
    document.querySelectorAll("#chips-row-filtres .chip.active").forEach(c => c.classList.remove("active"));
    majChipsTri();
    document.querySelectorAll(".carte--filtre-off").forEach(c => c.classList.remove("carte--filtre-off"));
    appliquerTri();
    majCompteur();
    persister();
  };

  function injecter() {
    if (document.getElementById("chips-row-filtres")) return;
    const conteneur = document.getElementById("filtres-chips");
    if (!conteneur) return;

    if (!document.getElementById("filtres-avances-style")) {
      const st = document.createElement("style");
      st.id = "filtres-avances-style";
      st.textContent =
        ".carte.carte--filtre-off{display:none !important}" +
        "#chips-row-filtres .chips-label-tri{margin-left:10px;padding-left:10px;border-left:1px solid rgba(255,255,255,.18)}" +
        "#chips-row-filtres .chip-tri.active{background:var(--accent,#ff4d88);color:#fff;border-color:var(--accent,#ff4d88);font-weight:700}" +
        "#chips-row-filtres .filtre-compteur{color:#b3b0b8;font-size:12px;margin-left:8px;white-space:nowrap;align-self:center}";
      document.head.appendChild(st);
    }

    const [emo, lib] = SAISON_DECO[saisonCourante()] || ["🌿", "De saison"];
    const row = document.createElement("div");
    row.className = "chips-row";
    row.id = "chips-row-filtres";
    row.innerHTML =
      '<span class="chips-label">⚙️</span>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'rapide\',this)">⏱ Rapide</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'eco\',this)">💰 Éco</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'nutri\',this)">🥗 Nutri A/B</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'facile\',this)">⭐ Facile</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'saison\',this)" title="Ingrédients de saison (' + lib + ')">' + emo + ' De saison</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'vege\',this)" title="Sans viande ni poisson">🌱 Végé</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'vegan\',this)" title="Sans produit animal">🌿 Vegan</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'sansgluten\',this)" title="Sans blé ni gluten">🌾 Sans gluten</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'leger\',this)" title="Moins de 500 kcal par portion">🪶 Léger</button>' +
      '<button class="chip" onclick="toggleFiltreAvance(\'proteine\',this)" title="Au moins 20 g de protéines par portion">💪 Protéiné</button>' +
      '<span class="chips-label chips-label-tri" title="Trier (re-clic = inverse l\'ordre)">↕</span>' +
      TRIS.map((t) => '<button class="chip chip-tri" data-crit="' + t.crit + '" onclick="trierChip(\'' + t.crit + '\')" title="Trier par ' + t.neutre.toLowerCase() + ' — re-clic pour inverser">' + t.e + ' ' + t.neutre + '</button>').join("") +
      '<button class="chip" onclick="surprendsMoi()" title="Une recette au hasard (selon les filtres actifs)">🎲 Surprends-moi</button>' +
      '<span id="f-compteur" class="filtre-compteur"></span>';
    // Inséré juste après la 1ère ligne (catégories), avant la ligne pays
    const premiere = conteneur.querySelector(".chips-row");
    if (premiere && premiere.nextSibling) conteneur.insertBefore(row, premiere.nextSibling);
    else conteneur.appendChild(row);

    // Ligne « occasions » (juste après la ligne filtres)
    const rowOcc = document.createElement("div");
    rowOcc.className = "chips-row";
    rowOcc.id = "chips-row-occasions";
    rowOcc.innerHTML = '<span class="chips-label" title="Occasions">🎉</span>' +
      Object.entries(OCCASIONS).map(([k, o]) =>
        `<button class="chip" onclick="filtrerOccasion('${k}',this)">${o.emoji} ${o.lib}</button>`).join("");
    if (row.nextSibling) conteneur.insertBefore(rowOcc, row.nextSibling);
    else conteneur.appendChild(rowOcc);
  }

  // --- Cohérence inter-vues : le calque .carte--filtre-off ne doit valoir que
  // dans la vue Recettes (sinon il cacherait des favoris). On enrobe les points
  // d'entrée des vues (sans modifier leur code).
  function clearClasse() {
    document.querySelectorAll(".carte--filtre-off").forEach(c => c.classList.remove("carte--filtre-off"));
  }
  function enrober(nom, fabrique) {
    const o = window[nom];
    if (typeof o !== "function" || o._wrapFiltres) return;
    const w = fabrique(o);
    w._wrapFiltres = true;
    window[nom] = w;
  }
  function installerCoherence() {
    // Entrer dans Recettes = restaurer les filtres mémorisés. On le fait APRÈS
    // l'original : afficherRecettes active la 1ère chip de chaque ligne (logique
    // "Tout" cat/pays) — restaurer() remet l'état (chips + tri) correct par-dessus.
    enrober("afficherRecettes", (o) => function () { const r = o.apply(this, arguments); restaurer(); return r; });
    // Changer catégorie/pays dans Recettes = recalculer puis ré-appliquer les filtres actifs
    enrober("appliquerFiltresChips", (o) => function () { const r = o.apply(this, arguments); if (actif()) appliquer(); return r; });
    // Entrer dans Favoris = retirer le calque (les filtres avancés ne s'y appliquent pas)
    enrober("filtrerFavoris", (o) => function () { const r = o.apply(this, arguments); clearClasse(); return r; });
  }

  function demarrer() { injecter(); installerCoherence(); chargerEtat(); majUIetat(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
