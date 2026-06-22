// =============================================================================
// 🍽️ RECETTES SIMILAIRES — suggestions automatiques sur la fiche
// -----------------------------------------------------------------------------
// En bas de chaque fiche, une section « Tu aimeras aussi » propose des recettes
// proches, calculées automatiquement : même catégorie (+3), même pays (+2) et
// ingrédients DISTINCTIFS communs (+1,5 chacun, hors bases sel/huile/œuf…).
// Exclut la recette elle-même et ses recettes liées manuelles (pas de doublon).
// Intégration NON invasive : enrobe ouvrirFiche et injecte après le rendu.
// =============================================================================

(function () {
  const esc = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);
  const cacheIngr = new Map();
  const cacheSim = new Map();

  // Ingrédients très courants : ignorés pour la similarité (sinon tout se ressemble)
  const BASES = new Set(["sel", "poivre", "huile", "huileolive", "huiledolive", "sucre", "farine",
    "beurre", "eau", "oeuf", "oeufs", "lait", "oignon", "ail", "echalote", "levure", "levurechimique",
    "vanille", "cannelle", "persil", "creme"]);

  function ingredientsDe(key) {
    if (cacheIngr.has(key)) return cacheIngr.get(key);
    const r = recettes[key];
    let set = new Set();
    if (r) {
      const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
      if (tabKey && r[tabKey][0]) {
        Object.keys(r[tabKey][0]).forEach(k => {
          if (k !== "nb" && k !== "patons" && k !== "total" && k !== "label" && !BASES.has(k)) set.add(k);
        });
      }
    }
    cacheIngr.set(key, set);
    return set;
  }

  function similaires(key, n) {
    if (cacheSim.has(key)) return cacheSim.get(key);
    const r = recettes[key];
    let res = [];
    if (r) {
      const exclus = new Set([key, ...(Array.isArray(r.liees) ? r.liees : [])]);
      const ingr = ingredientsDe(key);
      const scores = [];
      for (const k2 in recettes) {
        if (exclus.has(k2)) continue;
        const r2 = recettes[k2];
        if (!r2) continue;
        let score = 0;
        if (r2.cat && r2.cat === r.cat) score += 3;
        if (r2.pays && r.pays && r2.pays === r.pays) score += 2;
        const ingr2 = ingredientsDe(k2);
        let communs = 0;
        ingr2.forEach(i => { if (ingr.has(i)) communs++; });
        score += Math.min(communs, 4) * 1.5;
        if (score >= 4.5) scores.push({ k: k2, score, communs });
      }
      scores.sort((a, b) => b.score - a.score || b.communs - a.communs);
      res = scores.slice(0, n || 6).map(s => s.k);
    }
    cacheSim.set(key, res);
    return res;
  }

  function injecterStyle() {
    if (document.getElementById("similaires-style")) return;
    const st = document.createElement("style");
    st.id = "similaires-style";
    st.textContent =
      "#fiche-similaires{margin:16px 0 4px}" +
      "#fiche-similaires .sim-titre{font-weight:700;color:#fff;font-size:14px;margin-bottom:10px}" +
      "#fiche-similaires .sim-scroll{display:flex;gap:10px;overflow-x:auto;padding-bottom:6px;scroll-snap-type:x proximity}" +
      "#fiche-similaires .sim-carte{flex:0 0 122px;scroll-snap-align:start;background:rgba(255,255,255,.04);" +
      "border:1px solid rgba(255,255,255,.08);border-radius:13px;overflow:hidden;cursor:pointer;transition:transform .12s}" +
      "#fiche-similaires .sim-carte:hover{transform:translateY(-2px)}" +
      "#fiche-similaires .sim-img{width:100%;height:78px;object-fit:cover;display:block;background:var(--surface-1)}" +
      "#fiche-similaires .sim-nom{display:block;padding:7px 8px;font-size:12px;color:#e7e4ec;line-height:1.3}";
    document.head.appendChild(st);
  }

  function injecter(key) {
    const cont = document.getElementById("modal-resultat");
    if (!cont) return;
    cont.querySelector("#fiche-similaires")?.remove();
    const sim = similaires(key, 8);
    if (!sim.length) return;
    injecterStyle();
    const thumb = (k) => (typeof getThumbPath === "function") ? getThumbPath(k) : ((typeof getImagePath === "function") ? getImagePath(k) : "");
    const full = (k) => (typeof getImagePath === "function") ? getImagePath(k) : "";
    const cartes = sim.map(k => {
      const r = recettes[k];
      const nom = (typeof getNomRecette === "function") ? getNomRecette(k) : (r.nom || k);
      const emo = (r && r.emoji) || "🍽️";
      const onerr = "if(this.src.indexOf('thumbs/')>-1){this.src='" + full(k) + "'}else{this.style.visibility='hidden'}";
      return '<div class="sim-carte" onclick="ouvrirRecetteLiee(\'' + k + '\',\'' + key + '\')">' +
        '<img class="sim-img" loading="lazy" decoding="async" src="' + esc(thumb(k)) + '" alt="" onerror="' + esc(onerr) + '">' +
        '<span class="sim-nom">' + emo + ' ' + esc(nom) + '</span></div>';
    }).join("");
    const html = '<div id="fiche-similaires"><div class="sim-titre">🍽️ Tu aimeras aussi</div><div class="sim-scroll">' + cartes + '</div></div>';
    cont.insertAdjacentHTML("beforeend", html);
  }

  function installer() {
    const o = window.ouvrirFiche;
    if (typeof o !== "function" || o._wrapSim) return;
    const w = function (recette, inputId) {
      const r = o.apply(this, arguments);
      try { injecter(recette); } catch (e) {}
      return r;
    };
    w._wrapSim = true;
    window.ouvrirFiche = w;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installer);
  else installer();
})();
