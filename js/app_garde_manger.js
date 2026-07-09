// =============================================================================
// 📦 MODULE : GARDE_MANGER
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

// =============================================================================
// 🥶 MODE VIDE-FRIGO v242 — refondu v259
// =============================================================================
// Tu coches ce que tu as → on calcule les recettes possibles.
// v259 : sélection MÉMORISÉE (profil + localStorage), lien direct avec « Mon
//        placard » daté (auto-cochage + priorité anti-gaspi sur ce qui périme),
//        tri « moins d'achats » et photos dans les résultats.
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

// --- Persistance de la sélection -------------------------------------------
// Connecté → profil (synchro multi-appareils) ; sinon → localStorage.
function vfLoadSelection() {
  let arr = [];
  if (window.currentUser && window.userProfile && Array.isArray(window.userProfile.vfFrigo)) {
    arr = window.userProfile.vfFrigo;
  } else {
    try { arr = JSON.parse(localStorage.getItem(VF_LS_KEY) || "[]"); } catch (e) {}
  }
  window._vfSelection = new Set(Array.isArray(arr) ? arr : []);
}
function vfPersistSelection() {
  const arr = Array.from(window._vfSelection);
  try { localStorage.setItem(VF_LS_KEY, JSON.stringify(arr)); } catch (e) {}
  if (window.currentUser && typeof sauvegarderProfil === "function") {
    clearTimeout(window._vfSaveT);   // debounce : évite de spammer Firestore à chaque clic
    window._vfSaveT = setTimeout(() => { try { sauvegarderProfil({ vfFrigo: Array.from(window._vfSelection) }); } catch (e) {} }, 900);
  }
}
window.vfLoadSelection = vfLoadSelection;
window.vfPersistSelection = vfPersistSelection;

// Labels pour catégoriser les ingrédients dans la liste affichée
const VF_CATEGORIES = {
  "🥩 Viandes & poissons": ["poulet","bœuf","boeuf","porc","agneau","veau","canard","dinde","lapin","jambon","lardons","bacon","saucisse","chorizo","merguez","steak","escalope","filet","saumon","thon","cabillaud","truite","crevette","crevettes","calmar","moules","huitres","sardine","anchois"],
  "🥛 Frais & laitages": ["lait","creme","crèmefraiche","yaourt","fromage","mozzarella","parmesan","feta","ricotta","mascarpone","cheddar","emmental","gruyere","chevre","beurre","margarine","oeuf","oeufs","jauneoeuf","blancsoeufs","tofu"],
  "🥬 Légumes": ["tomate","tomates","concombre","carotte","carottes","oignon","oignons","ail","echalote","poireau","celeri","fenouil","epinards","laitue","salade","mache","roquette","courgette","aubergine","poivron","poivrons","champignons","champignon","brocoli","choufleur","chou","haricots","petitspois","mais","navet","betterave","radis","asperges","artichaut","pdt","pommedeterre","patate","patatedouce","potiron","courge"],
  "🍎 Fruits": ["pomme","pommes","poire","banane","bananes","orange","oranges","citron","citrons","citronvert","fraise","fraises","framboise","myrtille","kiwi","mangue","ananas","peche","abricot","cerise","raisin","melon","pasteque","grenade","figue","datte","passion","coco"],
  "🌾 Féculents & pâtes": ["riz","pates","spaghetti","penne","tagliatelles","macaroni","lasagne","quinoa","semoule","couscous","boulgour","blé","farine","pain","baguette","tortilla","wrap","nouilles","ramen","udon"],
  "🥫 Conserves & secs": ["thon","sardine","haricotsblancs","haricotsrouges","poischiches","lentilles","poix","mais","olives","cornichons","cors","tomatespelees","tomatesconcassees","sauce","ketchup","mayonnaise","moutarde","vinaigre","vinaigrebalsamique"],
  "🧂 Épices & condiments": ["sel","poivre","sucre","huile","huiledolive","huiledetournesol","curry","paprika","cumin","curcuma","cannelle","muscade","gingembre","piment","tabasco","basilic","persil","thym","laurier","origan","romarin","menthe","coriandre","cerfeuil","ciboulette","aneth","estragon","safran","vanille","cacao","chocolat","levure","bicarbonate"],
};

// Basiques du placard : supposés toujours dispo → ni comptés dans le match ni
// listés dans « il te manque ». Élargi v259 (beurre, ail, oignon, farine) à la
// demande — pour « cocher plus vite ». Test par CLÉ canonique OU par LIBELLÉ
// (gère les variantes beurrePate/beurreCreme… qui ont toutes le label « Beurre »).
const VF_STAPLE_KEYS = new Set(["sel","poivre","huile","huileolive","huiledolive","eau","sucre","vinaigre","beurre","ail","oignon","farine"]);
const VF_STAPLE_LABELS = new Set(["sel","poivre","huile","huiledolive","eau","sucre","vinaigre","beurre","ail","oignon","farine"]);
function vfEstStaple(ing) {
  if (VF_STAPLE_KEYS.has(ing)) return true;
  const label = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
  return VF_STAPLE_LABELS.has(vfClean(label));
}

// Injecte les styles v259 (bannière placard, tri, vignettes, badges)
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
  `;
  (document.head || document.documentElement).appendChild(st);
}

// Charge la liste des ingrédients dans le DOM (appelé quand on entre dans la section)
function vfChargerIngredients() {
  vfInjecterStyle();
  const container = document.getElementById("vf-ingredients-container");
  if (!container) return;

  // Récupérer la liste de tous les ingrédients uniques utilisés dans les recettes
  // ET GROUPER PAR LABEL AFFICHÉ pour éviter les doublons (beurre/beurrPate/beurrCreme...)
  if (!window._vfIngredients) {
    const ingSet = new Set();
    Object.values(recettes).forEach(r => {
      const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
      if (!tabKey || !r[tabKey][0]) return;
      Object.keys(r[tabKey][0]).forEach(k => {
        if (k !== "nb" && k !== "patons" && k !== "total" && k !== "label") {
          ingSet.add(k);
        }
      });
    });

    // Construire le mapping label → [ingrédients_canoniques...]
    const labelToIngs = {};
    Array.from(ingSet).forEach(ing => {
      const label = (INGREDIENTS_LABELS && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
      if (!labelToIngs[label]) labelToIngs[label] = [];
      labelToIngs[label].push(ing);
    });

    // Une "entrée d'ingrédient" pour le vide-frigo = { label, ings: [variants] }
    window._vfIngredients = Object.entries(labelToIngs)
      .map(([label, ings]) => ({ label, ings, key: ings[0] })) // key = première variante pour stockage
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  // Restaurer la sélection mémorisée AVANT de dessiner les chips
  vfLoadSelection();

  // Construire l'affichage par catégories
  let html = "";
  const labelsRanges = new Set();

  for (const [cat, mots] of Object.entries(VF_CATEGORIES)) {
    const entriesDeCetteCat = window._vfIngredients.filter(entry => {
      const labelLow = entry.label.toLowerCase();
      const ingsLow = entry.ings.map(i => i.toLowerCase());
      return mots.some(mot => {
        const m = mot.toLowerCase();
        return labelLow.includes(m) || ingsLow.some(i => i.includes(m));
      });
    });
    if (entriesDeCetteCat.length === 0) continue;

    html += `<div class="vf-cat-bloc">
      <h3 class="vf-cat-titre">${cat}</h3>
      <div class="vf-chips-row">`;
    entriesDeCetteCat.forEach(entry => {
      labelsRanges.add(entry.label);
      const checked = window._vfSelection.has(entry.label) ? "vf-chip-active" : "";
      html += `<button class="vf-chip ${checked}" data-label="${entry.label}" onclick="vfToggleLabel('${entry.label.replace(/'/g, "\\'")}', this)">${entry.label}</button>`;
    });
    html += `</div></div>`;
  }

  // Catégorie "Autres" pour ce qui n'est pas rangé
  const autres = window._vfIngredients.filter(entry => !labelsRanges.has(entry.label));
  if (autres.length > 0) {
    html += `<div class="vf-cat-bloc">
      <h3 class="vf-cat-titre">📦 Autres</h3>
      <div class="vf-chips-row">`;
    autres.forEach(entry => {
      const checked = window._vfSelection.has(entry.label) ? "vf-chip-active" : "";
      html += `<button class="vf-chip ${checked}" data-label="${entry.label}" onclick="vfToggleLabel('${entry.label.replace(/'/g, "\\'")}', this)">${entry.label}</button>`;
    });
    html += `</div></div>`;
  }

  container.innerHTML = html;

  // Auto-cochage du placard : une seule fois par session, si le frigo est vierge.
  if (!window._vfAutoDone && window._vfSelection.size === 0 &&
      window.userProfile && ((window.userProfile.gardeManger || []).length > 0)) {
    window._vfAutoDone = true;
    vfCocherPlacard(true);   // silencieux : coche + persiste + met à jour
  }

  vfSyncPlacardBanner();
  vfMettreAJourSelection();
}

// Toggle un label (qui regroupe potentiellement plusieurs variantes d'ingrédients)
function vfToggleLabel(label, btn) {
  if (window._vfSelection.has(label)) {
    window._vfSelection.delete(label);
    if (btn) btn.classList.remove("vf-chip-active");
  } else {
    window._vfSelection.add(label);
    if (btn) btn.classList.add("vf-chip-active");
  }
  vfPersistSelection();
  vfMettreAJourSelection();
}

// Retourne l'ensemble des "ingrédients canoniques" actuellement sélectionnés
function vfGetIngredientsCanoniques() {
  const result = new Set();
  if (!window._vfIngredients) return result;
  window._vfIngredients.forEach(entry => {
    if (window._vfSelection.has(entry.label)) {
      entry.ings.forEach(i => result.add(i));
    }
  });
  return result;
}

// ---------------------------------------------------------------------------
// 📦 LIEN AVEC « MON PLACARD » (aliments datés)
// ---------------------------------------------------------------------------
// Associe chaque aliment daté du placard à un label du vide-frigo, en gardant
// l'échéance (jours restants) la plus urgente → Map(label → joursMin).
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

// Coche dans le frigo tous les aliments reconnus du placard
function vfCocherPlacard(silencieux) {
  if (!window._vfIngredients && typeof vfChargerIngredients === "function") { try { vfChargerIngredients(); } catch (e) {} }
  const map = vfPlacardMap();
  let added = 0;
  map.forEach((j, label) => { if (!window._vfSelection.has(label)) { window._vfSelection.add(label); added++; } });
  document.querySelectorAll(".vf-chip").forEach(chip => {
    const lbl = chip.getAttribute("data-label");
    if (lbl && window._vfSelection.has(lbl)) chip.classList.add("vf-chip-active");
  });
  vfPersistSelection();
  vfSyncPlacardBanner();
  vfMettreAJourSelection();
  if (!silencieux && typeof afficherToast === "function") {
    afficherToast(added ? `${added} ingrédient${added > 1 ? "s" : ""} du placard coché${added > 1 ? "s" : ""} 📦` : "Ton placard est déjà coché 🙂");
  }
  return added;
}
window.vfCocherPlacard = vfCocherPlacard;

// Bannière en haut du vide-frigo : état du placard + actions
function vfSyncPlacardBanner() {
  const el = document.getElementById("vf-placard-banner");
  if (!el) return;
  const liste = (window.userProfile && window.userProfile.gardeManger) || [];
  const map = vfPlacardMap();
  let urgents = 0; map.forEach(j => { if (j <= 3) urgents++; });
  // Combien de labels du placard restent à cocher ?
  let aCocher = 0; map.forEach((j, label) => { if (!window._vfSelection.has(label)) aCocher++; });

  if (!liste.length) {
    // Placard vide → invitation douce
    el.innerHTML = `<span class="vf-pb-txt">📦 Astuce : ajoute tes aliments <b>avec leur date</b> dans « Mon placard », on les cochera ici et on te proposera d'écouler ce qui périme.</span>
      <button class="vf-pb-btn vf-pb-ghost" onclick="switchCuisineTab('pantry')">Mon placard →</button>`;
    el.style.display = "flex";
    return;
  }
  if (map.size === 0) {
    el.innerHTML = `<span class="vf-pb-txt">📦 ${liste.length} aliment${liste.length > 1 ? "s" : ""} dans ton placard, mais aucun ne correspond aux ingrédients des recettes.</span>
      <button class="vf-pb-btn vf-pb-ghost" onclick="switchCuisineTab('pantry')">Gérer →</button>`;
    el.style.display = "flex";
    return;
  }
  const urgTxt = urgents ? ` · <b>${urgents} à écouler ⏰</b>` : "";
  el.innerHTML = `<span class="vf-pb-txt">📦 Placard : <b style="color:var(--text)">${map.size}</b> ingrédient${map.size > 1 ? "s" : ""} reconnu${map.size > 1 ? "s" : ""}${urgTxt}</span>
    ${aCocher ? `<button class="vf-pb-btn" onclick="vfCocherPlacard()">Cocher (${aCocher}) 📦</button>` : `<span class="vf-pb-btn vf-pb-ghost" style="cursor:default">✓ Tout coché</span>`}`;
  el.style.display = "flex";
}
window.vfSyncPlacardBanner = vfSyncPlacardBanner;

// Change le tri des résultats
function vfSetSort(mode) {
  window._vfSort = mode;
  vfMettreAJourSelection();
}
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

  // Carte des aliments du placard (label → jours restants) pour la priorité anti-gaspi
  const placard = vfPlacardMap();

  // Pour chaque recette, calculer le % de match (regroupé par label)
  const resultats = [];
  Object.entries(recettes).forEach(([cle, r]) => {
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey || !r[tabKey][0]) return;

    const ingredients = Object.keys(r[tabKey][0]).filter(k =>
      k !== "nb" && k !== "patons" && k !== "total" && k !== "label"
    );
    if (ingredients.length === 0) return;

    const labelsRecette = new Set();
    ingredients.forEach(ing => {
      if (vfEstStaple(ing)) return; // basique du placard : supposé dispo
      const label = (INGREDIENTS_LABELS && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
      labelsRecette.add(label);
    });
    if (labelsRecette.size === 0) return;
    const labelsArr = Array.from(labelsRecette);

    const labelsPossedes = labelsArr.filter(label => window._vfSelection.has(label));
    const labelsManquants = labelsArr.filter(label => !window._vfSelection.has(label));
    const pourcent = Math.round((labelsPossedes.length / labelsArr.length) * 100);
    if (pourcent < 30) return; // ignorer les recettes trop incomplètes

    // Anti-gaspi : la recette utilise-t-elle un ingrédient que j'ai ET qui périme (≤3 j) ?
    const urgents = labelsPossedes.filter(l => placard.has(l) && placard.get(l) <= 3);

    resultats.push({
      cle, recette: r, pourcent,
      manquants: labelsManquants, total: labelsArr.length,
      possede: labelsPossedes.length,
      urgent: urgents.length > 0,
      urgentNoms: urgents.map(l => l.replace(/^[^\s]+\s+/, "").trim()),
    });
  });

  // Tri
  if (window._vfSort === "match") {
    resultats.sort((a, b) => (b.urgent - a.urgent) || (b.pourcent - a.pourcent) || (a.manquants.length - b.manquants.length));
  } else { // "achats" (défaut) : d'abord ce qui périme, puis le moins d'achats
    resultats.sort((a, b) =>
      (b.urgent - a.urgent) ||
      (a.manquants.length - b.manquants.length) ||
      (b.pourcent - a.pourcent) ||
      (b.possede - a.possede)
    );
  }

  // Barre de tri
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
    const label = (INGREDIENTS_LABELS && INGREDIENTS_LABELS[ing]) ? INGREDIENTS_LABELS[ing] : ing;
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

// Filtre les chips selon une recherche
function vfFiltrerIngredients(query) {
  const q = vfNormalize(query.trim());
  document.querySelectorAll(".vf-chip").forEach(chip => {
    const txt = vfNormalize(chip.textContent);
    const label = vfNormalize(chip.getAttribute("data-label") || "");
    const match = !q || txt.includes(q) || label.includes(q);
    chip.style.display = match ? "" : "none";
  });
  document.querySelectorAll(".vf-cat-bloc").forEach(bloc => {
    const visibles = bloc.querySelectorAll('.vf-chip:not([style*="none"])').length;
    bloc.style.display = visibles === 0 ? "none" : "";
  });
}

// Tout décocher
function vfReset() {
  window._vfSelection.clear();
  window._vfAutoDone = true; // reset explicite : ne pas re-cocher le placard automatiquement
  document.querySelectorAll(".vf-chip-active").forEach(c => c.classList.remove("vf-chip-active"));
  vfPersistSelection();
  vfSyncPlacardBanner();
  vfMettreAJourSelection();
}
