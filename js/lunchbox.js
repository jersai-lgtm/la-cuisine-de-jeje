// ============================================================
// lunchbox.js — Générateur "Lunch box" (v1.1.0)
// 1 plat par jour, rapide + pas cher + sain, transportable & réchauffable.
// Réutilise le formulaire du planificateur (#plan-jours-choix, #plan-personnes).
//
// Éligibilité d'une recette :
//   - tag `lunchbox: true`  -> toujours incluse (forçage)
//   - tag `lunchbox: false` -> toujours exclue (forçage)
//   - sinon critères AUTO : ≤ 45 min, pas "Difficile",
//     catégorie qui se transporte/réchauffe bien (plats/salades/healthy/soupes).
//
// 👉 Pour rendre une recette "lunch box" quoi qu'il arrive, ajoute  lunchbox: true
//    dans sa fiche (dans recettes_<categorie>.js). Pour l'exclure : lunchbox: false.
// ============================================================

const LB_CATS = new Set(["plats", "salades", "healthy", "soupes"]);

// "X min" / "Xh" / "XhYY" -> minutes (prend le 1er bloc de temps actif)
function lbMinutes(t) {
  if (!t) return null;
  t = String(t).toLowerCase();
  const h = t.match(/(\d+)\s*h\s*(\d+)?/);
  if (h) return parseInt(h[1], 10) * 60 + (h[2] ? parseInt(h[2], 10) : 0);
  const m = t.match(/(\d+)\s*min/);
  return m ? parseInt(m[1], 10) : null;
}

// Une recette est-elle une bonne "lunch box" ?
function lbEligible(key) {
  const r = (typeof recettes !== "undefined") ? recettes[key] : null;
  if (!r) return false;
  if (r.lunchbox === true) return true;
  if (r.lunchbox === false) return false;
  const cat = (typeof categorieRecette === "function") ? categorieRecette(key) : r.cat;
  if (!LB_CATS.has(cat)) return false;
  if (/difficile/i.test(r.niveau || "")) return false;
  const mn = lbMinutes(r.temps);
  return mn !== null && mn <= 45;
}

// Pool éligible + compatible profil (allergies/régimes) + sans alerte famille
function lbPool() {
  if (typeof recettes === "undefined") return [];
  const motsExclus = (typeof motsExclusProfil === "function") ? motsExclusProfil() : new Set();
  return Object.keys(recettes).filter(key => {
    if (typeof RECETTES_NON_REPAS !== "undefined" && RECETTES_NON_REPAS.has(key)) return false;
    if (!lbEligible(key)) return false;
    if (motsExclus && motsExclus.size > 0) {
      const texte = (typeof texteRecette === "function") ? texteRecette(key) : "";
      if ([...motsExclus].some(m => texte.includes(m))) return false;
    }
    const niveau = (typeof getNiveauFamille === "function") ? getNiveauFamille(key) : null;
    return niveau === null; // ni rouge (bébé) ni orange (enfant)
  });
}

function lbCout(key) {
  if (typeof coutParPersonneRecette === "function") {
    const c = coutParPersonneRecette(key);
    if (typeof c === "number" && isFinite(c) && c > 0) return c;
  }
  return null;
}

// Score (plus bas = meilleur) : favorise rapide -> pas cher -> healthy
function lbScore(key) {
  const r = (typeof recettes !== "undefined" ? recettes[key] : null) || {};
  const mn = lbMinutes(r.temps) || 45;
  const cout = lbCout(key);
  const coutVal = (cout === null) ? 6 : cout;
  const cat = (typeof categorieRecette === "function") ? categorieRecette(key) : r.cat;
  const healthyBonus = (cat === "healthy" || cat === "salades") ? 12 : 0;
  // minutes (~10-45) + coût (~1-6€ * 7 = 7-42) - bonus sain (12)
  return mn + coutVal * 7 - healthyBonus;
}

// Choisit n recettes en favorisant le bon score MAIS en gardant de la variété
function lbChoisir(pool, n) {
  if (!pool || !pool.length) return [];
  const tri = [...pool].sort((a, b) => lbScore(a) - lbScore(b));
  // On garde le meilleur sous-ensemble comme "bons candidats" (≥ n*3, ≥ 25)
  const taille = Math.min(Math.max(n * 3, 25), tri.length);
  const bons = tri.slice(0, taille);
  // Mélange (Fisher-Yates) puis on prend n distincts
  for (let i = bons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = bons[i]; bons[i] = bons[j]; bons[j] = tmp;
  }
  return bons.slice(0, Math.min(n, bons.length));
}

// Génère la lunch box pour les jours sélectionnés (1 plat / jour)
function genererLunchbox() {
  const jours = [...document.querySelectorAll("#plan-jours-choix .plan-tag-active")].map(b => b.dataset.val);
  if (jours.length === 0) { alert("Sélectionnez au moins un jour !"); return; }
  const personnes = parseInt(document.getElementById("plan-personnes")?.value, 10) || 4;
  const pool = lbPool();
  if (pool.length === 0) {
    if (typeof afficherToast === "function") afficherToast("Aucune recette lunch box compatible avec tes filtres 🤔");
    return;
  }
  const choix = lbChoisir(pool, jours.length);
  const semaine = jours.map((j, i) => ({ jour: j, midi: { recette: choix[i % choix.length] } }));
  const menus = { semaine, mode: "lunchbox", personnes: personnes };
  window._derniersMenus = menus;       // réutilise "Ajouter aux courses" (lit semaine[].midi)
  window._dernierMenuGenere = menus;   // pour le "dernier menu généré" de l'accueil
  window._lunchboxActif = true;
  afficherLunchbox(menus, personnes);
  if (typeof sauvegarderMenus === "function") {
    try { sauvegarderMenus(menus, personnes, jours); } catch (e) {}
  }
}

// Régénère UN jour (remplace la recette par une autre du pool, en gardant la variété)
function regenLunchbox(jourNom) {
  const menus = window._derniersMenus;
  if (!menus || !menus.semaine) return;
  const jour = menus.semaine.find(j => j.jour === jourNom);
  if (!jour) return;
  const pool = lbPool();
  if (!pool.length) return;
  const dejaDans = new Set(menus.semaine.map(j => j.midi && j.midi.recette).filter(Boolean));
  const actuelle = jour.midi && jour.midi.recette;
  let cand = pool.filter(k => !dejaDans.has(k));
  if (cand.length === 0) cand = pool.filter(k => k !== actuelle);
  if (cand.length === 0) return;
  const choix = lbChoisir(cand, 1);
  jour.midi = { recette: choix[0] || cand[Math.floor(Math.random() * cand.length)] };
  const personnes = parseInt(document.getElementById("plan-personnes")?.value, 10) || 4;
  afficherLunchbox(menus, personnes);
  if (typeof sauvegarderMenus === "function") {
    try { sauvegarderMenus(menus, personnes, menus.semaine.map(j => j.jour)); } catch (e) {}
  }
}

// Affiche la lunch box (1 plat / jour) dans #plan-jours
function afficherLunchbox(menus, personnes) {
  const container = document.getElementById("plan-jours");
  if (!container) return;
  container.innerHTML = "";

  // Nettoyer d'éventuels résidus laissés par le menu semaine
  const favStale = document.querySelector("#plan-result .plan-btn-favori-menu");
  if (favStale) favStale.remove();
  const noteStale = document.getElementById("plan-famille-note");
  if (noteStale) noteStale.remove();

  const COULEURS_JOURS = {
    "Lundi": "#e2574c", "Mardi": "#e58e26", "Mercredi": "#f0b429", "Jeudi": "#4caf50",
    "Vendredi": "#1aa6b3", "Samedi": "#5a6ee0", "Dimanche": "#c44cc4"
  };

  const intro = document.createElement("div");
  intro.className = "plan-legende-famille";
  intro.innerHTML = '<span class="leg-hint">🥡 <strong>Lunch box</strong> — 1 plat/jour, rapide &amp; à emporter · <strong>🔄</strong> pour remplacer un plat</span>';
  container.appendChild(intro);

  menus.semaine.forEach(jour => {
    const key = jour.midi && jour.midi.recette;
    if (!key) return;
    const r = (typeof recettes !== "undefined" ? recettes[key] : null) || {};
    const couleur = COULEURS_JOURS[jour.jour] || "#888";
    const drap = (typeof drapeau === "function") ? (drapeau(r.pays, 13) + " ") : "";
    const emoji = (typeof getEmoji === "function") ? getEmoji(key) : (r.emoji || "🍽️");
    const nom = (typeof getNomRecette === "function") ? getNomRecette(key) : key;
    const cout = lbCout(key);
    const infosCout = (cout !== null) ? (" • ≈ " + cout.toFixed(2) + " €/pers") : "";
    const note = (r.temps || "") + infosCout;
    const badgeNote = (typeof noteCommunauteBadgeHTML === "function") ? noteCommunauteBadgeHTML(key, "inline") : "";

    const div = document.createElement("div");
    div.className = "plan-jour";
    div.style.border = "2px solid " + couleur;
    div.style.boxShadow = "0 0 12px " + couleur + "44";
    div.style.background = "linear-gradient(180deg, " + couleur + "33, " + couleur + "0d 55%, #17151c)";
    div.innerHTML =
      '<h3 class="plan-jour-titre" style="color:' + couleur + '">' + jour.jour + '</h3>' +
      '<div class="plan-repas-row" style="grid-template-columns:1fr">' +
        '<div class="plan-repas" onclick="ouvrirRecettePlan(\'' + key + '\', ' + personnes + ')">' +
          '<div class="plan-repas-label">🥡 Lunch <button class="plan-regen-btn" onclick="event.stopPropagation();regenLunchbox(\'' + jour.jour + '\')" title="Remplacer ce plat">🔄</button><button class="plan-regen-btn" onclick="event.stopPropagation();maChoisir(\'' + jour.jour + '\',\'midi\')" title="Choisir une recette">🔍</button></div>' +
          '<div class="plan-repas-emoji">' + emoji + '</div>' +
          '<div class="plan-repas-nom">' + drap + nom + '</div>' +
          '<div class="plan-repas-note">' + note + '</div>' +
          badgeNote +
        '</div>' +
      '</div>';
    container.appendChild(div);
  });

  const form = document.getElementById("plan-form");
  const res = document.getElementById("plan-result");
  if (form) form.style.display = "none";
  if (res) res.style.display = "block";
}

// Exposer pour les onclick inline
if (typeof window !== "undefined") {
  window.genererLunchbox = genererLunchbox;
  window.regenLunchbox = regenLunchbox;
  window.afficherLunchbox = afficherLunchbox;
  window.lbEligible = lbEligible;
  window.lbPool = lbPool;
}
