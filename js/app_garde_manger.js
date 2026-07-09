// =============================================================================
// 📦 MODULE : GARDE_MANGER
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

// =============================================================================
// 🥶 MODE VIDE-FRIGO v242 — refondu v259/v260
// =============================================================================
// Tu coches ce que tu as → on calcule les recettes possibles.
// v259 : sélection MÉMORISÉE (profil + localStorage), lien direct avec « Mon
//        placard » daté (auto-cochage + priorité anti-gaspi), tri « moins
//        d'achats » et photos dans les résultats.
// v260 : liste d'ingrédients allégée — variantes fusionnées (singulier/pluriel,
//        casse, accents), basiques masqués, groupe « ⭐ Courants » + catégories
//        repliées (compteur), recherche qui déplie tout.
// =============================================================================

// Set des ingrédients sélectionnés — désormais PERSISTÉ (voir vfLoadSelection)
window._vfSelection = new Set();
window._vfSort = "achats";            // "achats" (moins d'achats) | "match" (% décroissant)
const VF_LS_KEY = "vf_frigo_v1";      // clé localStorage (marche aussi hors connexion)

// Normalise un texte pour recherche : minuscule, sans accent, sans ligature (œ→oe)
function vfNormalize(s) {
  if (!s) return "";
  return String(s).toLowerCase()
    .replace(/œ/g, "oe").replace(/æ/g, "ae")            // Ligatures FR
    .normalize("NFD").replace(/[̀-ͯ]/g, "");  // Accents
}
// Réduit un libellé (« 🧈 Beurre », « Huile d'olive »…) à sa forme comparable « beurre »
function vfClean(s) { return vfNormalize(s).replace(/[^a-z0-9]/g, ""); }
// Clé de fusion : comme vfClean mais sans le « s »/« x » final (singulier ≈ pluriel)
function vfMergeKey(s) {
  const c = vfClean(s);
  const t = c.replace(/(s|x)$/, "");
  return t.length >= 3 ? t : c;
}

// --- Persistance de la sélection -------------------------------------------
function vfLoadSelection() {
  let arr = [];
  if (window.currentUser && window.userProfile && Array.isArray(window.userProfile.vfFrigo)) {
    arr = window.userProfile.vfFrigo;
  } else {
    try { arr = JSON.parse(localStorage.getItem(VF_LS_KEY) || "[]"); } catch (e) {}
  }
  if (!Array.isArray(arr)) arr = [];
  // Migration : remapper d'anciens libellés (ex. « 🍅 Tomates ») vers le libellé
  // fusionné actuel (« 🍅 Tomate ») pour que la sélection reste valide après v260.
  if (window._vfLabelToDisplay) arr = arr.map(l => vfDisplayLabel(l));
  window._vfSelection = new Set(arr);
}
function vfPersistSelection() {
  const arr = Array.from(window._vfSelection);
  try { localStorage.setItem(VF_LS_KEY, JSON.stringify(arr)); } catch (e) {}
  if (window.currentUser && typeof sauvegarderProfil === "function") {
    clearTimeout(window._vfSaveT);
    window._vfSaveT = setTimeout(() => { try { sauvegarderProfil({ vfFrigo: Array.from(window._vfSelection) }); } catch (e) {} }, 900);
  }
}
window.vfLoadSelection = vfLoadSelection;
window.vfPersistSelection = vfPersistSelection;

// Catégories d'affichage
const VF_CATEGORIES = {
  "🥩 Viandes & poissons": ["poulet","bœuf","boeuf","porc","agneau","veau","canard","dinde","lapin","jambon","lardons","bacon","saucisse","chorizo","merguez","steak","escalope","filet","saumon","thon","cabillaud","truite","crevette","crevettes","calmar","moules","huitres","sardine","anchois"],
  "🥛 Frais & laitages": ["lait","creme","crèmefraiche","yaourt","fromage","mozzarella","parmesan","feta","ricotta","mascarpone","cheddar","emmental","gruyere","chevre","beurre","margarine","oeuf","oeufs","jauneoeuf","blancsoeufs","tofu"],
  "🥬 Légumes": ["tomate","tomates","concombre","carotte","carottes","oignon","oignons","ail","echalote","poireau","celeri","fenouil","epinards","laitue","salade","mache","roquette","courgette","aubergine","poivron","poivrons","champignons","champignon","brocoli","choufleur","chou","haricots","petitspois","mais","navet","betterave","radis","asperges","artichaut","pdt","pommedeterre","patate","patatedouce","potiron","courge"],
  "🍎 Fruits": ["pomme","pommes","poire","banane","bananes","orange","oranges","citron","citrons","citronvert","fraise","fraises","framboise","myrtille","kiwi","mangue","ananas","peche","abricot","cerise","raisin","melon","pasteque","grenade","figue","datte","passion","coco"],
  "🌾 Féculents & pâtes": ["riz","pates","spaghetti","penne","tagliatelles","macaroni","lasagne","quinoa","semoule","couscous","boulgour","blé","farine","pain","baguette","tortilla","wrap","nouilles","ramen","udon"],
  "🥫 Conserves & secs": ["thon","sardine","haricotsblancs","haricotsrouges","poischiches","lentilles","poix","mais","olives","cornichons","cors","tomatespelees","tomatesconcassees","sauce","ketchup","mayonnaise","moutarde","vinaigre","vinaigrebalsamique"],
  "🧂 Épices & condiments": ["sel","poivre","sucre","huile","huiledolive","huiledetournesol","curry","paprika","cumin","curcuma","cannelle","muscade","gingembre","piment","tabasco","basilic","persil","thym","laurier","origan","romarin","menthe","coriandre","cerfeuil","ciboulette","aneth","estragon","safran","vanille","cacao","chocolat","levure","bicarbonate"],
};

// Basiques supposés TOUJOURS dispo → ni comptés dans le match, ni listés dans
// « il te manque », ni affichés comme chips (inutile de cocher « sel »).
// Test par clé canonique OU par clé de fusion du libellé (gère singulier/pluriel).
const VF_STAPLE_KEYS = new Set(["sel","poivre","huile","huileolive","huiledolive","eau","sucre","vinaigre","beurre","ail","oignon","farine"]);
const VF_STAPLE_MERGE = new Set(["sel","poivre","huile","huiledolive","eau","sucre","vinaigre","beurre","ail","oignon","farine"]);
function vfEstStaple(ing) {
  if (VF_STAPLE_KEYS.has(ing)) return true;
  const label = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
  return VF_STAPLE_MERGE.has(vfMergeKey(label));
}

// Ingrédients « courants » mis en avant (dépliés d'office). Clés de fusion.
const VF_COURANTS = new Set([
  "tomate","oeuf","lait","carotte","poulet","riz","fromage","cremefraiche","creme",
  "citron","courgette","poivron","champignon","jambon","lardon","yaourt","pain",
  "persil","basilic","echalote","concombre","salade","pomme","banane","chocolat",
  "saumon","thon","mozzarella","aubergine","epinard","pate","boeufhache",
  "pommedeterre","poireau","citronvert","crevette","petitspoi","mais",
]);

// Injecte les styles v259/v260
function vfInjecterStyle() {
  if (document.getElementById("vf2-style")) return;
  const st = document.createElement("style");
  st.id = "vf2-style";
  st.textContent = `
    .vf-placard-banner{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:linear-gradient(135deg,rgba(var(--accent-rgb),.12),rgba(var(--accent-rgb),.05));border:1px solid rgba(var(--accent-rgb),.3);border-radius:14px;padding:11px 14px;margin:0 0 14px;font-size:13.5px;color:var(--text)}
    .vf-placard-banner .vf-pb-txt{flex:1;min-width:140px;line-height:1.45}
    .vf-placard-banner b{color:var(--or,#ffcf6b)}
    .vf-pb-btn{background:var(--accent,#ff4d88);color:#fff;border:none;border-radius:10px;padding:8px 13px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
    .vf-pb-btn.vf-pb-ghost{background:transparent;color:var(--accent-soft,#ff8fb3);border:1px solid rgba(var(--accent-rgb),.45)}
    .vf-sort-bar{display:flex;gap:8px;margin:0 0 14px}
    .vf-sort-btn{flex:1;background:rgba(var(--w),.05);color:var(--text-3);border:1px solid rgba(var(--w),.12);border-radius:10px;padding:8px;font-size:12.5px;font-weight:600;cursor:pointer}
    .vf-sort-btn.vf-sort-on{background:rgba(var(--accent-rgb),.16);color:var(--text);border-color:rgba(var(--accent-rgb),.5)}
    .vf-result-thumb{position:relative;width:54px;height:54px;flex:0 0 auto;border-radius:11px;overflow:hidden;background:rgba(var(--w),.07);display:flex;align-items:center;justify-content:center}
    .vf-result-thumb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
    .vf-thumb-emoji{font-size:26px;line-height:1}
    .vf-result-badges{display:flex;gap:6px;flex-wrap:wrap;margin:3px 0}
    .vf-badge{font-size:11px;font-weight:700;border-radius:20px;padding:2px 9px;display:inline-block}
    .vf-badge-ready{background:rgba(76,175,80,.18);color:#7CFC9A;border:1px solid rgba(76,175,80,.45)}
    .vf-badge-urgent{background:rgba(255,160,0,.16);color:var(--or,#ffb300);border:1px solid rgba(255,160,0,.5)}
    .vf-result-card.vf-urgent{border-left:4px solid var(--or,#ffb300)}
    /* Liste d'ingrédients repliable (v260) */
    .vf-cat-bloc{margin-bottom:10px}
    .vf-cat-head{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;background:rgba(var(--w),.045);border:1px solid rgba(var(--w),.09);border-radius:12px;padding:11px 14px;cursor:pointer;color:var(--text);font-size:14.5px;font-weight:600;text-align:left}
    .vf-cat-head:hover{background:rgba(var(--accent-rgb),.10)}
    .vf-cat-head.vf-cat-static{cursor:default;background:transparent;border:none;padding:12px 2px 4px}
    .vf-cat-head.vf-cat-static:hover{background:transparent}
    .vf-cat-meta{display:flex;align-items:center;gap:8px;flex:0 0 auto}
    .vf-cat-count{font-size:12px;color:var(--text-3);background:rgba(var(--w),.08);border-radius:20px;padding:1px 9px;font-weight:600}
    .vf-cat-sel{font-size:11px;font-weight:700;color:#7CFC9A;background:rgba(76,175,80,.16);border-radius:20px;padding:1px 8px}
    .vf-cat-chev{font-size:11px;color:var(--text-3);transition:transform .2s;display:inline-block}
    .vf-cat-collapsed .vf-cat-chev{transform:rotate(-90deg)}
    .vf-cat-bloc .vf-chips-row{margin-top:8px}
    .vf-cat-collapsed .vf-chips-row{display:none}
  `;
  (document.head || document.documentElement).appendChild(st);
}

// (Re)construit la liste fusionnée des ingrédients + le mapping libellé→affiché
function vfBuildIngredients() {
  if (window._vfIngredients) return;
  const ingSet = new Set();
  Object.values(recettes).forEach(r => {
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey || !r[tabKey][0]) return;
    Object.keys(r[tabKey][0]).forEach(k => {
      if (k !== "nb" && k !== "patons" && k !== "total" && k !== "label") ingSet.add(k);
    });
  });

  // clé canonique → libellé
  const labelToIngs = {};
  Array.from(ingSet).forEach(ing => {
    const label = (INGREDIENTS_LABELS && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
    (labelToIngs[label] || (labelToIngs[label] = [])).push(ing);
  });

  // Fusionner les libellés quasi-identiques (singulier/pluriel, casse, accents…)
  const groups = {};   // mergeKey → { rawLabels:[], ings:[] }
  Object.entries(labelToIngs).forEach(([label, ings]) => {
    const mk = vfMergeKey(label);
    if (!groups[mk]) groups[mk] = { rawLabels: [], ings: [] };
    groups[mk].rawLabels.push(label);
    groups[mk].ings.push(...ings);
  });

  window._vfLabelToDisplay = {};
  window._vfIngredients = Object.entries(groups).map(([mk, g]) => {
    // libellé affiché = le plus court (souvent le singulier) ; égalité → alpha
    const display = g.rawLabels.slice().sort((a, b) => a.length - b.length || a.localeCompare(b))[0];
    g.rawLabels.forEach(rl => { window._vfLabelToDisplay[rl] = display; });
    return { label: display, ings: Array.from(new Set(g.ings)), mergeKey: mk };
  }).sort((a, b) => a.label.localeCompare(b.label));
}

// Charge la liste des ingrédients dans le DOM (appelé quand on entre dans la section)
function vfChargerIngredients() {
  vfInjecterStyle();
  const container = document.getElementById("vf-ingredients-container");
  if (!container) return;

  vfBuildIngredients();
  vfLoadSelection();     // restaurer la sélection mémorisée AVANT de dessiner

  const chip = (e) => `<button class="vf-chip${window._vfSelection.has(e.label) ? " vf-chip-active" : ""}" data-label="${e.label.replace(/"/g, "&quot;")}" onclick="vfToggleLabel('${e.label.replace(/'/g, "\\'")}', this)">${e.label}</button>`;
  const matchCat = (e, mots) => {
    const labelLow = e.label.toLowerCase();
    const ingsLow = e.ings.map(i => i.toLowerCase());
    return mots.some(mot => { const m = mot.toLowerCase(); return labelLow.includes(m) || ingsLow.some(i => i.includes(m)); });
  };
  const catBloc = (titre, entries, collapsible) => {
    const chips = entries.map(chip).join("");
    if (!collapsible) {
      return `<div class="vf-cat-bloc"><div class="vf-cat-head vf-cat-static"><span class="vf-cat-titre">${titre}</span></div><div class="vf-chips-row">${chips}</div></div>`;
    }
    return `<div class="vf-cat-bloc vf-cat-collapsible vf-cat-collapsed">
      <button class="vf-cat-head" onclick="vfToggleCat(this)">
        <span class="vf-cat-titre">${titre}</span>
        <span class="vf-cat-meta"><span class="vf-cat-sel" style="display:none"></span><span class="vf-cat-count">${entries.length}</span><span class="vf-cat-chev">▾</span></span>
      </button>
      <div class="vf-chips-row">${chips}</div></div>`;
  };

  // On écarte les basiques (masqués), puis on isole les « courants »
  const visibles = window._vfIngredients.filter(e => !VF_STAPLE_MERGE.has(e.mergeKey));
  const courants = visibles.filter(e => VF_COURANTS.has(e.mergeKey));
  const courantsMK = new Set(courants.map(e => e.mergeKey));
  const reste = visibles.filter(e => !courantsMK.has(e.mergeKey));

  let html = "";
  if (courants.length) html += catBloc("⭐ Courants", courants, false);

  const placed = new Set();
  for (const [cat, mots] of Object.entries(VF_CATEGORIES)) {
    const entries = reste.filter(e => !placed.has(e.mergeKey) && matchCat(e, mots));
    if (!entries.length) continue;
    entries.forEach(e => placed.add(e.mergeKey));
    html += catBloc(cat, entries, true);
  }
  const autres = reste.filter(e => !placed.has(e.mergeKey));
  if (autres.length) html += catBloc("📦 Autres", autres, true);

  container.innerHTML = html;
  vfRefreshChipStates();

  // Auto-cochage du placard : une seule fois par session, si le frigo est vierge.
  if (!window._vfAutoDone && window._vfSelection.size === 0 &&
      window.userProfile && ((window.userProfile.gardeManger || []).length > 0)) {
    window._vfAutoDone = true;
    vfCocherPlacard(true);
  }

  vfSyncPlacardBanner();
  vfMettreAJourSelection();
}

// Replie/déplie une catégorie
function vfToggleCat(head) {
  const b = head.closest(".vf-cat-bloc");
  if (b) b.classList.toggle("vf-cat-collapsed");
}
window.vfToggleCat = vfToggleCat;

// Synchronise l'état actif de TOUTES les chips depuis _vfSelection + compteurs
function vfRefreshChipStates() {
  document.querySelectorAll(".vf-chip").forEach(c => {
    c.classList.toggle("vf-chip-active", window._vfSelection.has(c.getAttribute("data-label")));
  });
  document.querySelectorAll(".vf-cat-bloc").forEach(bloc => {
    const badge = bloc.querySelector(".vf-cat-sel");
    if (!badge) return;
    const sel = bloc.querySelectorAll(".vf-chip-active").length;
    badge.textContent = sel ? `✅ ${sel}` : "";
    badge.style.display = sel ? "inline-block" : "none";
  });
}

// Toggle un label (qui regroupe potentiellement plusieurs variantes d'ingrédients)
function vfToggleLabel(label) {
  if (window._vfSelection.has(label)) window._vfSelection.delete(label);
  else window._vfSelection.add(label);
  vfRefreshChipStates();
  vfPersistSelection();
  vfMettreAJourSelection();
}

// Retourne l'ensemble des "ingrédients canoniques" actuellement sélectionnés
function vfGetIngredientsCanoniques() {
  const result = new Set();
  if (!window._vfIngredients) return result;
  window._vfIngredients.forEach(entry => {
    if (window._vfSelection.has(entry.label)) entry.ings.forEach(i => result.add(i));
  });
  return result;
}

// Traduit un libellé brut de recette vers son libellé affiché (fusionné)
function vfDisplayLabel(rawLabel) {
  return (window._vfLabelToDisplay && window._vfLabelToDisplay[rawLabel]) || rawLabel;
}

// ---------------------------------------------------------------------------
// 📦 LIEN AVEC « MON PLACARD » (aliments datés)
// ---------------------------------------------------------------------------
function vfPlacardMap() {
  const res = new Map();
  const liste = (window.userProfile && window.userProfile.gardeManger) || [];
  if (!liste.length || !window._vfIngredients) return res;
  liste.forEach(it => {
    const nomN = vfClean(it.nom);
    if (!nomN) return;
    let label = null, bestLen = Infinity;
    window._vfIngredients.forEach(en => {
      const l = vfClean(en.label);
      if (!l) return;
      if (l === nomN) { label = en.label; bestLen = -1; }
      else if (bestLen >= 0 && (l.includes(nomN) || nomN.includes(l)) && l.length < bestLen) { label = en.label; bestLen = l.length; }
    });
    if (!label) return;
    const j = (typeof window.gmJoursRestants === "function") ? window.gmJoursRestants(it.dlc) : null;
    const jj = (j == null ? Infinity : j);
    if (!res.has(label) || jj < res.get(label)) res.set(label, jj);
  });
  return res;
}
window.vfPlacardMap = vfPlacardMap;

function vfCocherPlacard(silencieux) {
  if (!window._vfIngredients && typeof vfChargerIngredients === "function") { try { vfChargerIngredients(); } catch (e) {} }
  const map = vfPlacardMap();
  let added = 0;
  map.forEach((j, label) => { if (!window._vfSelection.has(label)) { window._vfSelection.add(label); added++; } });
  vfRefreshChipStates();
  vfPersistSelection();
  vfSyncPlacardBanner();
  vfMettreAJourSelection();
  if (!silencieux && typeof afficherToast === "function") {
    afficherToast(added ? `${added} ingrédient${added > 1 ? "s" : ""} du placard coché${added > 1 ? "s" : ""} 📦` : "Ton placard est déjà coché 🙂");
  }
  return added;
}
window.vfCocherPlacard = vfCocherPlacard;

function vfSyncPlacardBanner() {
  const el = document.getElementById("vf-placard-banner");
  if (!el) return;
  const liste = (window.userProfile && window.userProfile.gardeManger) || [];
  const map = vfPlacardMap();
  let urgents = 0; map.forEach(j => { if (j <= 3) urgents++; });
  let aCocher = 0; map.forEach((j, label) => { if (!window._vfSelection.has(label)) aCocher++; });

  if (!liste.length) {
    el.innerHTML = `<span class="vf-pb-txt">📦 Astuce : ajoute tes aliments <b>avec leur date</b> dans « Mon placard », on les cochera ici et on te proposera d'écouler ce qui périme.</span>
      <button class="vf-pb-btn vf-pb-ghost" onclick="switchCuisineTab('pantry')">Mon placard →</button>`;
    el.style.display = "flex"; return;
  }
  if (map.size === 0) {
    el.innerHTML = `<span class="vf-pb-txt">📦 ${liste.length} aliment${liste.length > 1 ? "s" : ""} dans ton placard, mais aucun ne correspond aux ingrédients des recettes.</span>
      <button class="vf-pb-btn vf-pb-ghost" onclick="switchCuisineTab('pantry')">Gérer →</button>`;
    el.style.display = "flex"; return;
  }
  const urgTxt = urgents ? ` · <b>${urgents} à écouler ⏰</b>` : "";
  el.innerHTML = `<span class="vf-pb-txt">📦 Placard : <b style="color:var(--text)">${map.size}</b> ingrédient${map.size > 1 ? "s" : ""} reconnu${map.size > 1 ? "s" : ""}${urgTxt}</span>
    ${aCocher ? `<button class="vf-pb-btn" onclick="vfCocherPlacard()">Cocher (${aCocher}) 📦</button>` : `<span class="vf-pb-btn vf-pb-ghost" style="cursor:default">✓ Tout coché</span>`}`;
  el.style.display = "flex";
}
window.vfSyncPlacardBanner = vfSyncPlacardBanner;

function vfSetSort(mode) { window._vfSort = mode; vfMettreAJourSelection(); }
window.vfSetSort = vfSetSort;

// Met à jour l'affichage du compteur et calcule les résultats
function vfMettreAJourSelection() {
  const info = document.getElementById("vf-selection-info");
  const n = window._vfSelection.size;
  if (info) {
    info.textContent = n === 0
      ? "Aucun ingrédient sélectionné — coche ce qui est dans ton frigo"
      : `✅ ${n} ingrédient${n > 1 ? "s" : ""} sélectionné${n > 1 ? "s" : ""}`;
  }

  const resultatsBox = document.getElementById("vf-resultats");
  const resultatsListe = document.getElementById("vf-resultats-liste");
  if (!resultatsBox || !resultatsListe) return;
  if (n === 0) { resultatsBox.style.display = "none"; return; }

  const placard = vfPlacardMap();

  const resultats = [];
  Object.entries(recettes).forEach(([cle, r]) => {
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey || !r[tabKey][0]) return;

    const ingredients = Object.keys(r[tabKey][0]).filter(k =>
      k !== "nb" && k !== "patons" && k !== "total" && k !== "label");
    if (ingredients.length === 0) return;

    const labelsRecette = new Set();
    ingredients.forEach(ing => {
      if (vfEstStaple(ing)) return;
      const raw = (INGREDIENTS_LABELS && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
      labelsRecette.add(vfDisplayLabel(raw));
    });
    if (labelsRecette.size === 0) return;
    const labelsArr = Array.from(labelsRecette);

    const labelsPossedes = labelsArr.filter(label => window._vfSelection.has(label));
    const labelsManquants = labelsArr.filter(label => !window._vfSelection.has(label));
    const pourcent = Math.round((labelsPossedes.length / labelsArr.length) * 100);
    if (pourcent < 30) return;

    const urgents = labelsPossedes.filter(l => placard.has(l) && placard.get(l) <= 3);
    resultats.push({
      cle, pourcent, manquants: labelsManquants, total: labelsArr.length,
      possede: labelsPossedes.length, urgent: urgents.length > 0,
      urgentNoms: urgents.map(l => l.replace(/^[^\s]+\s+/, "").trim()),
    });
  });

  if (window._vfSort === "match") {
    resultats.sort((a, b) => (b.urgent - a.urgent) || (b.pourcent - a.pourcent) || (a.manquants.length - b.manquants.length));
  } else {
    resultats.sort((a, b) =>
      (b.urgent - a.urgent) || (a.manquants.length - b.manquants.length) ||
      (b.pourcent - a.pourcent) || (b.possede - a.possede));
  }

  const sortBar = document.getElementById("vf-sort-bar");
  if (sortBar) {
    sortBar.style.display = resultats.length ? "flex" : "none";
    sortBar.innerHTML = `
      <button class="vf-sort-btn ${window._vfSort === "achats" ? "vf-sort-on" : ""}" onclick="vfSetSort('achats')">🛒 Moins d'achats</button>
      <button class="vf-sort-btn ${window._vfSort === "match" ? "vf-sort-on" : ""}" onclick="vfSetSort('match')">🎯 Meilleur match</button>`;
  }

  if (resultats.length === 0) {
    resultatsListe.innerHTML = `<div class="vf-no-result">Aucune recette ne correspond — coche au moins quelques ingrédients de base !</div>`;
  } else {
    resultatsListe.innerHTML = resultats.slice(0, 30).map(({ cle, pourcent, manquants, urgent, urgentNoms }) => {
      const nom = (typeof getNomRecette === "function" ? getNomRecette(cle) : cle);
      const couleur = pourcent === 100 ? "vf-100" : pourcent >= 80 ? "vf-80" : pourcent >= 60 ? "vf-60" : "vf-low";
      const emoji = (typeof getEmoji === "function" ? getEmoji(cle) : "🍽️");
      const thumbSrc = (typeof getThumbPath === "function") ? getThumbPath(cle) : "";
      const onerr = (typeof imgCarteOnerror === "function") ? imgCarteOnerror(cle) : "this.style.display='none'";

      const manquantsAff = manquants.slice(0, 5);
      const manquantsTxt = manquants.length === 0
        ? "✨ Tu as tout ce qu'il faut !"
        : `Il te manque : ${manquantsAff.join(", ")}${manquants.length > 5 ? ` (+ ${manquants.length - 5} autres)` : ""}`;

      let badges = "";
      if (manquants.length === 0) badges += `<span class="vf-badge vf-badge-ready">✅ Prêt à cuisiner</span>`;
      if (urgent) badges += `<span class="vf-badge vf-badge-urgent">⏰ Écoule : ${urgentNoms.slice(0, 2).join(", ")}</span>`;

      return `<div class="vf-result-card ${couleur}${urgent ? " vf-urgent" : ""}" onclick="ouvrirFiche('${cle}', null)">
        <div class="vf-result-thumb"><span class="vf-thumb-emoji">${emoji}</span>${thumbSrc ? `<img src="${thumbSrc}" loading="lazy" alt="" onerror="${onerr}">` : ""}</div>
        <div class="vf-result-info">
          <div class="vf-result-nom">${nom}</div>
          ${badges ? `<div class="vf-result-badges">${badges}</div>` : ""}
          <div class="vf-result-manquants">${manquantsTxt}</div>
          ${manquants.length > 0 ? `<button onclick="event.stopPropagation();vfAjouterManquants('${cle}')" style="margin-top:8px;background:rgba(255,107,161,.16);color:var(--accent-soft);border:1px solid rgba(255,107,161,.5);border-radius:10px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer">➕ Manquants → liste de courses</button>` : ""}
        </div>
        <div class="vf-result-pourcent">${pourcent}%</div>
      </div>`;
    }).join("");
  }

  resultatsBox.style.display = "block";
}

// ➕ Ajoute les ingrédients manquants d'une recette à « Mes articles » (liste de courses)
async function vfAjouterManquants(cle) {
  if (!window.currentUser) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); return; }
  const r = recettes[cle];
  if (!r || !window.userProfile) return;
  const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
  if (!tabKey || !r[tabKey][0]) return;
  const ingredients = Object.keys(r[tabKey][0]).filter(k => k !== "nb" && k !== "patons" && k !== "total" && k !== "label");
  const manquants = [];
  const vus = new Set();
  ingredients.forEach(ing => {
    if (vfEstStaple(ing)) return;
    const raw = (INGREDIENTS_LABELS && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
    const label = vfDisplayLabel(raw);
    if (vus.has(label)) return; vus.add(label);
    if (!window._vfSelection.has(label)) manquants.push(label);
  });
  if (!manquants.length) { if (typeof afficherToast === "function") afficherToast("Tu as déjà tout 🙂"); return; }
  if (!window.userProfile.listeCoursesPerso) window.userProfile.listeCoursesPerso = [];
  let added = 0;
  manquants.forEach(lbl => {
    if (!window.userProfile.listeCoursesPerso.some(x => x.toLowerCase() === lbl.toLowerCase())) {
      window.userProfile.listeCoursesPerso.push(lbl); added++;
    }
  });
  if (typeof sauvegarderProfil === "function") await sauvegarderProfil({ listeCoursesPerso: window.userProfile.listeCoursesPerso });
  if (typeof afficherToast === "function") afficherToast(added ? `${added} ingrédient${added > 1 ? "s" : ""} ajouté${added > 1 ? "s" : ""} à ta liste 🛒` : "Déjà dans ta liste 🙂");
}
window.vfAjouterManquants = vfAjouterManquants;

// Filtre les chips selon une recherche — déplie tout pendant la recherche
function vfFiltrerIngredients(query) {
  const q = vfNormalize(query.trim());
  const searching = !!q;
  document.querySelectorAll(".vf-chip").forEach(chip => {
    const txt = vfNormalize(chip.textContent);
    const label = vfNormalize(chip.getAttribute("data-label") || "");
    chip.style.display = (!q || txt.includes(q) || label.includes(q)) ? "" : "none";
  });
  document.querySelectorAll(".vf-cat-bloc").forEach(bloc => {
    const collapsible = bloc.classList.contains("vf-cat-collapsible");
    if (searching) {
      bloc.classList.remove("vf-cat-collapsed");            // déplier pour révéler les matches
      const vis = bloc.querySelectorAll('.vf-chip:not([style*="none"])').length;
      bloc.style.display = vis === 0 ? "none" : "";
    } else {
      bloc.style.display = "";
      if (collapsible) bloc.classList.add("vf-cat-collapsed"); // rétablir l'état replié
    }
  });
}

// Tout décocher
function vfReset() {
  window._vfSelection.clear();
  window._vfAutoDone = true; // reset explicite : ne pas re-cocher le placard automatiquement
  vfRefreshChipStates();
  vfPersistSelection();
  vfSyncPlacardBanner();
  vfMettreAJourSelection();
}
