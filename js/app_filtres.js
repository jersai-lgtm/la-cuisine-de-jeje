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
  const F = { rapide: false, eco: false, nutri: false, facile: false, saison: false, vege: false, vegan: false };
  let tri = "";
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
    const m = { min: null, coutPers: null, cal: null, nutri: null, facile: false, saison: false };
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
  const actif = () => Object.keys(F).some(k => F[k]);

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
    } else if (tri === "note") {
      // Tri par note de la communauté (décroissant, non notées en dernier)
      const moy = (c) => {
        const cle = cleDe(c);
        const com = (cle && typeof getNoteCommunaute === "function") ? getNoteCommunaute(cle) : null;
        return com ? com.moyenne : -1;
      };
      liste = [...cont.querySelectorAll(".carte")].sort((a, b) => moy(b) - moy(a));
    } else {
      const val = (c) => {
        const m = metriques(cleDe(c));
        const v = tri === "temps" ? m.min : tri === "cout" ? m.coutPers : m.cal;
        return v == null ? Infinity : v;
      };
      liste = [...cont.querySelectorAll(".carte")].sort((a, b) => val(a) - val(b));
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
  function persister() { try { localStorage.setItem(LSKEY, JSON.stringify({ F, tri })); } catch (e) {} }
  function majUIetat() {
    document.querySelectorAll("#chips-row-filtres .chip").forEach(btn => {
      const m = (btn.getAttribute("onclick") || "").match(/toggleFiltreAvance\('(\w+)'/);
      if (m) btn.classList.toggle("active", !!F[m[1]]);
    });
    const sel = document.getElementById("f-tri"); if (sel) sel.value = tri || "";
  }
  function chargerEtat() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(LSKEY) || "null"); } catch (e) {}
    const fSaved = (data && data.F) || {};
    Object.keys(F).forEach(k => F[k] = !!fSaved[k]);
    tri = (data && data.tri) || "";
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
  window.reinitFiltresAvances = function () {
    Object.keys(F).forEach(k => F[k] = false);
    tri = "";
    document.querySelectorAll("#chips-row-filtres .chip.active").forEach(c => c.classList.remove("active"));
    const sel = document.getElementById("f-tri"); if (sel) sel.value = "";
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
        "#chips-row-filtres .filtre-tri{background:#17151c;color:#fff;border:1px solid rgba(255,255,255,.15);" +
        "border-radius:20px;padding:6px 12px;font-size:13px;cursor:pointer;margin-left:4px}" +
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
      '<select id="f-tri" class="filtre-tri" onchange="trierRecettes(this.value)" aria-label="Trier les recettes">' +
        '<option value="">↕ Trier…</option>' +
        '<option value="note">⭐ Mieux notées</option>' +
        '<option value="temps">⏱ Plus rapide</option>' +
        '<option value="cout">💰 Moins cher</option>' +
        '<option value="cal">🔥 Moins calorique</option>' +
      '</select>' +
      '<span id="f-compteur" class="filtre-compteur"></span>';
    // Inséré juste après la 1ère ligne (catégories), avant la ligne pays
    const premiere = conteneur.querySelector(".chips-row");
    if (premiere && premiere.nextSibling) conteneur.insertBefore(row, premiere.nextSibling);
    else conteneur.appendChild(row);
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
