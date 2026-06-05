// =============================================================================
// 📦 MODULE : COURSES_IMPR
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

// ==============================
// EXPORT PDF / IMPRESSION
// ==============================
// Ouvre une fenêtre dédiée avec la liste de courses bien formatée et lance l'impression.
// L'utilisateur peut alors "Enregistrer en PDF" depuis le dialogue d'impression du navigateur.
function imprimerCourses(sourceId) {
  const source = document.getElementById(sourceId);
  if (!source) return;
  const contentEl = source.querySelector("#plan-courses-content, #festif-courses-content");
  if (!contentEl) return;

  const titre = sourceId === "festif-courses" ? "Liste de courses — Menu Thématique" : "Liste de courses — Semaine";
  const dateStr = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  // Récupérer le contenu textuel des courses pour le formater
  const items = contentEl.querySelectorAll(".courses-item");
  let listeHtml = "";
  if (items.length > 0) {
    listeHtml = '<ul class="liste-print">';
    items.forEach(item => {
      const nom = item.querySelector(".courses-nom")?.textContent || "";
      const qte = item.querySelector(".courses-qte")?.textContent || "";
      listeHtml += `<li><span class="cb">☐</span> <span class="nom">${nom}</span> <span class="qte">${qte}</span></li>`;
    });
    listeHtml += "</ul>";
  } else {
    // Fallback : copier le HTML brut
    listeHtml = contentEl.innerHTML;
  }
  // Ligne d'info en haut (Pour X personnes...)
  const subtitle = contentEl.querySelector(".courses-subtitle")?.textContent || "";

  // Ouvrir une nouvelle fenêtre dédiée à l'impression
  const win = window.open("", "_blank", "width=800,height=900");
  if (!win) {
    alert("⚠️ Impossible d'ouvrir la fenêtre d'impression. Autorisez les popups dans votre navigateur.");
    return;
  }

  win.document.write(`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>${titre}</title>
  <style>
    @page { margin: 1.5cm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #222;
      max-width: 700px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.5;
    }
    h1 {
      color: #d63384;
      border-bottom: 3px solid #d63384;
      padding-bottom: 8px;
      margin-bottom: 4px;
    }
    .meta {
      color: #666;
      font-size: 14px;
      margin-bottom: 24px;
    }
    .meta strong { color: #333; }
    .liste-print {
      list-style: none;
      padding: 0;
      margin: 0;
      columns: 2;
      column-gap: 30px;
    }
    .liste-print li {
      padding: 6px 0;
      border-bottom: 1px dashed #ccc;
      break-inside: avoid;
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .cb { color: #999; font-size: 18px; flex-shrink: 0; }
    .nom { flex: 1; font-weight: 500; }
    .qte { color: #d63384; font-weight: 600; white-space: nowrap; }
    footer {
      margin-top: 30px;
      padding-top: 12px;
      border-top: 1px solid #ddd;
      color: #888;
      font-size: 12px;
      text-align: center;
    }
    @media print {
      body { padding: 0; }
      .liste-print { columns: 2; }
    }
  </style>
</head>
<body>
  <h1>🛒 ${titre}</h1>
  <div class="meta">
    <strong>📅 ${dateStr}</strong>${subtitle ? " &nbsp;·&nbsp; " + subtitle : ""}
  </div>
  ${listeHtml}
  <footer>La Cuisine de Jéjé — généré le ${dateStr}</footer>
  <script>
    window.onload = () => { setTimeout(() => window.print(), 200); };
  </script>
</body>
</html>`);
  win.document.close();
}

function afficherCourses() {
  if (!menusSemaine) return;
  const personnes = parseInt(document.getElementById("plan-personnes").value);
  const courses = {};

  menusSemaine.semaine.forEach(jour => {
    [jour.midi.recette, jour.soir.recette].forEach(key => {
      const ingrs = getIngredientsCourses(key, personnes);
      Object.entries(ingrs).forEach(([nom, data]) => {
        if (!courses[nom]) courses[nom] = { qte: 0, raw: null };
        if (typeof data.qte === "number" && data.qte > 0) {
          courses[nom].qte += data.qte;
        } else if (data.raw) {
          courses[nom].raw = data.raw;
        }
      });
    });
  });

  const container = document.getElementById("plan-courses-content");
  let html = `<p class="courses-subtitle">Pour ${personnes} personne${personnes > 1 ? "s" : ""} — ${menusSemaine.semaine.length * 2} repas</p>`;
  html += '<div class="courses-liste">';

  Object.entries(courses).sort((a,b) => a[0].localeCompare(b[0])).forEach(([nom, data]) => {
    let qteStr = "";
    if (data.qte > 0) {
      const v = data.qte;
      qteStr = v % 1 === 0 ? `${v}` : `${v.toFixed(0)}`;
    } else if (data.raw) {
      qteStr = data.raw;
    }
    html += `<div class="courses-item">
      <span class="courses-nom">${nom}</span>
      <span class="courses-qte">${qteStr}</span>
    </div>`;
  });

  html += "</div>";
  container.innerHTML = html;
  document.getElementById("plan-result").style.display = "none";
  document.getElementById("plan-courses").style.display = "block";
}

// Charger menus sauvegardés
// Vider le cache des menus
function viderCacheMenus(btn) {
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("cuisineJeje_menus") || k.startsWith("suggestions_")) {
        localStorage.removeItem(k);
      }
    });
    sessionStorage.removeItem("cuisineJeje_menus");
  } catch(e) {}
  // Réafficher le formulaire
  document.getElementById("plan-form").style.display = "block";
  document.getElementById("plan-result").style.display = "none";
  const planJours = document.getElementById("plan-jours");
  if (planJours) planJours.innerHTML = "";
  if (btn) { btn.textContent = "✅ Effacé !"; setTimeout(() => btn.textContent = "🗑️ Effacer le menu actuel", 2000); }
}

// Pré-cocher les tags du formulaire selon le profil utilisateur
function appliquerProfilSurFormulaire() {
  const prefs = window.userProfile?.preferences;
  if (!prefs) return;

  // Pré-cocher régimes dans les tags du formulaire semaine
  const regimes = prefs.regimes || [];
  document.querySelectorAll("#plan-form .plan-tag").forEach(btn => {
    const val = btn.dataset.val;
    if (regimes.includes(val)) {
      btn.classList.add("plan-tag-active");
    }
  });

  // Pré-remplir personnes depuis le foyer (formulaires Semaine ET Thématique)
  const foyer = window.userProfile?.foyer;
  if (foyer) {
    const nb = Math.min(15, Math.max(1,
      (foyer.adultes || 0) + (foyer.ados || 0) +
      (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0)
    ));
    if (nb > 0) {
      const inputP = document.getElementById("plan-personnes");
      if (inputP) inputP.value = nb;
      const inputF = document.getElementById("festif-personnes");
      if (inputF) inputF.value = nb;
    }
  }

  // Pré-remplir allergies dans le champ texte
  const allergies = [...(prefs.allergies||[]), ...(prefs.allergiesCustom||[])];
  const inputA = document.getElementById("plan-allergies");
  if (inputA && allergies.length > 0 && !inputA.value) {
    inputA.value = allergies.join(", ");
  }
}

// Nettoie un menu chargé : si un repas pointe vers une recette non-repas
// (boulangerie/dessert/cocktail issu d'un ancien menu sauvegardé), remplace
// par une recette compatible. Préserve la structure (simple ou complet).
function nettoyerMenusNonRepas(menus) {
  if (!menus?.semaine) return menus;
  // Pool de remplacement : vrais plats, hors non-repas
  const poolPlats = Object.keys(recettes).filter(k => {
    if (RECETTES_NON_REPAS.has(k)) return false;
    const c = categorieRecette(k);
    return c && !["boulangerie","desserts","cocktails","mocktails","brunch"].includes(c);
  });
  const dejaUtilise = new Set();
  // Index des recettes déjà présentes (pour éviter doublons)
  menus.semaine.forEach(j => {
    ["midi","soir"].forEach(m => {
      const r = j[m]?.recette || (typeof j[m] === "string" ? j[m] : null);
      if (r && !RECETTES_NON_REPAS.has(r)) dejaUtilise.add(r);
    });
  });
  const pickPlat = () => {
    const dispo = poolPlats.filter(k => !dejaUtilise.has(k));
    const choix = (dispo.length ? dispo : poolPlats)[Math.floor(Math.random() * (dispo.length || poolPlats.length))];
    dejaUtilise.add(choix);
    return choix;
  };
  const pickType = (type) => {
    // entree/plat/dessert : pick selon la catégorie cible
    const catsParType = {
      entree: ["entrees","soupes","salades"],
      plat: ["plats","pizzas","healthy"],
      dessert: ["desserts"],
    };
    const cats = catsParType[type] || catsParType.plat;
    const pool = Object.keys(recettes).filter(k => cats.includes(categorieRecette(k)));
    const dispo = pool.filter(k => !dejaUtilise.has(k));
    const choix = (dispo.length ? dispo : pool)[Math.floor(Math.random() * (dispo.length || pool.length))];
    if (choix) dejaUtilise.add(choix);
    return choix;
  };

  menus.semaine.forEach(j => {
    ["midi","soir"].forEach(m => {
      const v = j[m];
      if (!v) return;
      if (typeof v === "string") {
        if (RECETTES_NON_REPAS.has(v)) j[m] = pickPlat();
      } else if (typeof v === "object") {
        if (v.recette && RECETTES_NON_REPAS.has(v.recette)) {
          v.recette = pickPlat();
        }
        ["entree","plat","dessert"].forEach(type => {
          const sub = v[type];
          if (sub?.recette && RECETTES_NON_REPAS.has(sub.recette) && type !== "dessert") {
            // Pour entree/plat : remplacer si non-repas
            sub.recette = pickType(type);
          }
          // Pour dessert : on laisse, car un dessert EST une recette "non-repas"
        });
      }
    });
  });
  return menus;
}

function chargerMenusAuDemarrage() {
  // Si un menu favori est en cours d'application, ne PAS écraser menusSemaine
  if (window._chargementFavoriEnCours) return;
  // Vider TOUS les menus en cache (version mapping changée)
  try {
    const today = new Date().toLocaleDateString("fr-FR");
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("cuisineJeje_menus")) localStorage.removeItem(k);
      if (k.startsWith("suggestions_") && !k.startsWith("suggestions_v3_")) localStorage.removeItem(k);
    });
  } catch(e) {}

  const saved = chargerMenusSauvegardes();
  if (saved && saved.menus) {
    menusSemaine = saved.menus;
    // Mode Lunch box (1 plat/jour) : renderer dédié, surtout PAS le format Midi + Soir
    if (menusSemaine.mode === "lunchbox" && typeof afficherLunchbox === "function") {
      window._lunchboxActif = true;
      window._planMode = "lunchbox";
      window._planTabActif = "lunchbox";
      window._derniersMenus = menusSemaine;
      window._dernierMenuGenere = menusSemaine;
      const f = document.getElementById("plan-form"); if (f) f.style.display = "none";
      afficherLunchbox(menusSemaine, saved.personnes || 4);
      const ip = document.getElementById("plan-personnes"); if (ip) ip.value = saved.personnes || 4;
      return;
    }
    // Auto-nettoyage : remplacer toute recette non-repas par un vrai plat
    // (cas des menus sauvegardés AVANT les corrections de catégories)
    menusSemaine = nettoyerMenusNonRepas(menusSemaine);
    // Revalider avec les préférences actuelles du profil
    const regimesActuels = [...(window.userProfile?.preferences?.regimes||[]), ...(window.userProfile?.preferences?.objectifs||[])];
    const allergiesActuelles = [...(window.userProfile?.preferences?.allergies||[]), ...(window.userProfile?.preferences?.allergiesCustom||[])];
    if (regimesActuels.length > 0 || allergiesActuelles.length > 0) {
      menusSemaine = validerRegimeMenus(menusSemaine, regimesActuels, allergiesActuelles);
    }
    document.getElementById("plan-form").style.display = "none";
    afficherMenusSemaine(menusSemaine, saved.personnes || 4);
    document.getElementById("plan-personnes").value = saved.personnes || 4;
  }
}

// Retour au formulaire depuis les menus
function resetPlanificateur() {
  document.getElementById("plan-form").style.display = "block";
  document.getElementById("plan-result").style.display = "none";
  document.getElementById("plan-courses").style.display = "none";
  menusSemaine = null;
  sessionStorage.removeItem(STORAGE_KEY);
}

