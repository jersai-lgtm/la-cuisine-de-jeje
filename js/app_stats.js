// =============================================================================
// 📦 MODULE : STATS
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

// ================================================================
// 📊 MES STATS — Dashboard utilisateur
// ================================================================

// Fonction principale qui calcule et affiche toutes les stats
function chargerMesStats() {
  const user = window.userProfile;
  const subtitle = document.getElementById("stats-subtitle");
  
  // Si pas connecté
  if (!user || !user.uid) {
    if (subtitle) subtitle.innerHTML = `👤 <a onclick="ouvrirModalAuth()" style="color:#ff8fb3;cursor:pointer;text-decoration:underline">Connectez-vous</a> pour voir vos statistiques personnelles`;
    document.getElementById("stats-overview").innerHTML = "";
    document.getElementById("stats-records").innerHTML = "";
    document.getElementById("stats-evolution").innerHTML = "";
    document.getElementById("stats-badges").innerHTML = "";
    return;
  }
  
  const prenom = user.prenom || user.email?.split("@")[0] || "vous";
  if (subtitle) subtitle.textContent = `Suivez votre aventure culinaire, ${prenom} !`;
  
  // Calculer les statistiques
  const stats = calculerToutesStats();
  
  // Remplir les sections
  remplirVueEnsemble(stats);
  remplirRecords(stats);
  remplirEvolution(stats);
  remplirBadges(stats);
  // v252 : Tops
  if (typeof top10Initialiser === "function") top10Initialiser();
  // v256 : Avis utilisateurs
  if (typeof chargerStatsAvis === "function") chargerStatsAvis();
}

// =============================================================================
// 🥇 TOP 10 DES RECETTES v252
// =============================================================================
// Classements multi-critères : économiques, légères, copieuses, Nutri, cuisinées, vues
// =============================================================================

// Cache des stats calculées (évite de recalculer 413 recettes à chaque switch)
window._top10Cache = null;
window._top10CritereActuel = "economiques";

// Calcule prix/cal/nutri pour TOUTES les recettes (une seule fois, mis en cache)
function top10CalculerCache() {
  if (window._top10Cache) return window._top10Cache;
  
  const cache = [];
  
  Object.entries(recettes).forEach(([cle, r]) => {
    // Exclure les cocktails / mocktails (pas pertinent pour ces stats)
    if (r.cat === "cocktails" || r.cat === "mocktails") return;
    
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey) return;
    
    const base = r.base || 4;
    const ligne = r[tabKey].find(l => l.nb === base || l.patons === base) || r[tabKey][0];
    if (!ligne) return;
    
    // Nb de portions pour calcul "par personne"
    const portions = ligne.nb || ligne.patons || base;
    
    // Calculs
    let prix = null, cal = null, nutri = null;
    
    try {
      const pc = (typeof calculerPrixCaloriesRecette === "function") 
        ? calculerPrixCaloriesRecette(ligne) 
        : null;
      if (pc && pc.prix > 0) {
        prix = pc.prix / portions;  // par personne
        cal = pc.cal / portions;
      }
    } catch (e) {}
    
    try {
      const ns = (typeof calculerNutriScoreRecette === "function") 
        ? calculerNutriScoreRecette(ligne) 
        : null;
      if (ns) nutri = ns.lettre;
    } catch (e) {}
    
    cache.push({
      cle,
      nom: (typeof getNomRecette === "function") ? getNomRecette(cle) : cle,
      emoji: r.emoji || "🍽️",
      pays: r.pays || "",
      cat: r.cat || "",
      image: r.image || "",
      prix, // par personne
      cal,  // par personne
      nutri // lettre A-E
    });
  });
  
  window._top10Cache = cache;
  return cache;
}

// Initialise l'affichage Top 10 quand on entre dans Mes Stats
function top10Initialiser() {
  // Reset à "économiques" par défaut
  window._top10CritereActuel = "economiques";
  // Marquer le bon bouton actif
  document.querySelectorAll(".top10-cat-btn").forEach(b => {
    b.classList.toggle("active", b.getAttribute("data-critere") === "economiques");
  });
  top10Afficher("economiques");
}

// Switche entre les catégories
function top10Switcher(critere, btn) {
  document.querySelectorAll(".top10-cat-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  window._top10CritereActuel = critere;
  top10Afficher(critere);
}

// Affiche le top 10 selon le critère
function top10Afficher(critere) {
  const cache = top10CalculerCache();
  const liste = document.getElementById("top10-liste");
  const titreEl = document.getElementById("top10-titre");
  if (!liste) return;
  
  // Filtrer et trier
  let recs = cache.slice();
  let titre = "";
  let formatStat = (r) => "";
  
  switch (critere) {
    case "economiques":
      recs = recs.filter(r => r.prix !== null && r.prix > 0)
                 .sort((a, b) => a.prix - b.prix);
      titre = "💰 Les 10 plus économiques";
      formatStat = r => `${r.prix.toFixed(2)} € / pers.`;
      break;
      
    case "legeres":
      recs = recs.filter(r => r.cal !== null && r.cal > 0)
                 .sort((a, b) => a.cal - b.cal);
      titre = "🌱 Les 10 plus légères";
      formatStat = r => `${Math.round(r.cal)} kcal / pers.`;
      break;
      
    case "copieuses":
      recs = recs.filter(r => r.cal !== null && r.cal > 0)
                 .sort((a, b) => b.cal - a.cal);
      titre = "💪 Les 10 plus copieuses";
      formatStat = r => `${Math.round(r.cal)} kcal / pers.`;
      break;
      
    case "nutri":
      // Order: A=5, B=4, C=3, D=2, E=1
      const nutriRank = { "A": 5, "B": 4, "C": 3, "D": 2, "E": 1 };
      recs = recs.filter(r => r.nutri)
                 .sort((a, b) => (nutriRank[b.nutri] || 0) - (nutriRank[a.nutri] || 0));
      titre = "🥗 Les 10 meilleurs Nutri-Score";
      formatStat = r => `Nutri-Score ${r.nutri}`;
      break;
      
    case "cuisinees":
      // Utiliser userProfile.recettesCuisinees
      const cuisinees = (window.userProfile?.recettesCuisinees || [])
        .map(c => ({ cle: c.cle, count: c.count || 0 }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      
      if (cuisinees.length === 0) {
        liste.innerHTML = `<div class="top10-empty">Tu n'as encore cuisiné aucune recette.<br><span style="font-size:13px;color:#888">Click sur 👨‍🍳 J'ai cuisiné pour commencer !</span></div>`;
        if (titreEl) titreEl.textContent = "👨‍🍳 Tes recettes les plus cuisinées";
        return;
      }
      
      titre = "👨‍🍳 Tes recettes les plus cuisinées";
      const cacheMap = new Map(cache.map(r => [r.cle, r]));
      recs = cuisinees
        .filter(c => cacheMap.has(c.cle))
        .map(c => ({ ...cacheMap.get(c.cle), _count: c.count }));
      formatStat = r => `${r._count} fois cuisiné${r._count > 1 ? "s" : ""}`;
      break;
      
    case "vues":
      // Utiliser _recentsVus (les 100 derniers) — on compte la position
      const vus = window._recentsVus || [];
      if (vus.length === 0) {
        liste.innerHTML = `<div class="top10-empty">Aucune recette consultée encore.<br><span style="font-size:13px;color:#888">Click sur une carte pour la voir !</span></div>`;
        if (titreEl) titreEl.textContent = "👁️ Tes recettes les plus consultées";
        return;
      }
      
      titre = "👁️ Tes recettes les plus récemment consultées";
      const cacheMap2 = new Map(cache.map(r => [r.cle, r]));
      recs = vus
        .filter(cle => cacheMap2.has(cle))
        .slice(0, 10)
        .map(cle => cacheMap2.get(cle));
      formatStat = (r, i) => i === 0 ? "Dernière vue 🆕" : `#${i + 1}`;
      break;
  }
  
  // Limiter à 10
  recs = recs.slice(0, 10);
  
  if (titreEl) titreEl.textContent = titre;
  
  if (recs.length === 0) {
    liste.innerHTML = `<div class="top10-empty">Aucune donnée disponible pour ce classement.</div>`;
    return;
  }
  
  // Rendu
  liste.innerHTML = recs.map((r, i) => `
    <div class="top10-item" onclick="ouvrirFiche('${r.cle}','calc-${r.cle}')">
      <div class="top10-rang ${i < 3 ? 'top10-rang-' + (i+1) : ''}">${i + 1}</div>
      <div class="top10-emoji">${r.emoji}</div>
      <div class="top10-infos">
        <div class="top10-nom">${r.nom}</div>
        <div class="top10-stat">${formatStat(r, i)}</div>
      </div>
      ${r.nutri ? `<div class="top10-nutri-badge nutri-${r.nutri}">${r.nutri}</div>` : ''}
    </div>
  `).join("");
}

// =============================================================================
// Calcule toutes les statistiques à partir des données utilisateur
function calculerToutesStats() {
  const user = window.userProfile || {};
  const favoris = user.favoris || [];
  const menusFavoris = user.menusFavoris || [];
  const historique = user.historiqueMenus || [];
  const recents = window._recentsVus || [];
  const cuisinees = user.recettesCuisinees || []; // v240 : nouveau tracking manuel
  
  // 1) Recettes "vues" (large) — utilisé pour les stats secondaires (top pays, top cat)
  const recettesVues = new Set([...recents, ...favoris]);
  historique.forEach(menu => {
    (menu.menus || menu.menu || []).forEach(plat => {
      if (typeof plat === "string") recettesVues.add(plat);
      else if (plat && plat.cle) recettesVues.add(plat.cle);
    });
  });
  
  // 1bis) Recettes RÉELLEMENT cuisinées (manuel) — base des stats principales
  const recettesCuisineesSet = new Set(cuisinees.map(c => c.cle));
  // Total de "cuissons" (recette comptée plusieurs fois si refaite)
  const totalCuissons = cuisinees.reduce((sum, c) => sum + (c.count || 1), 0);
  
  // 1ter) v242 : Calculer le STREAK (jours consécutifs à cuisiner)
  // On regarde les dernierDate des recettes cuisinées, on calcule la plus longue série de jours consécutifs
  let streakActuel = 0;
  let streakRecord = 0;
  if (cuisinees.length > 0) {
    // Récupérer les dates uniques de cuisson (sans l'heure)
    const datesUnique = new Set();
    cuisinees.forEach(c => {
      if (c.dernierDate) {
        const d = new Date(c.dernierDate);
        if (!isNaN(d.getTime())) {
          datesUnique.add(d.toISOString().slice(0, 10)); // "YYYY-MM-DD"
        }
      }
    });
    // Trier les dates
    const dates = Array.from(datesUnique).sort();
    
    // Calculer le streak record
    let courant = 1;
    for (let i = 1; i < dates.length; i++) {
      const d1 = new Date(dates[i - 1]);
      const d2 = new Date(dates[i]);
      const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        courant++;
        if (courant > streakRecord) streakRecord = courant;
      } else {
        courant = 1;
      }
    }
    if (dates.length === 1) streakRecord = 1;
    else if (courant > streakRecord) streakRecord = courant;
    
    // Calculer le streak actuel (en cours)
    const aujourdhui = new Date().toISOString().slice(0, 10);
    const hier = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (dates[dates.length - 1] === aujourdhui || dates[dates.length - 1] === hier) {
      // Streak en cours : remonter en arrière
      streakActuel = 1;
      for (let i = dates.length - 1; i > 0; i--) {
        const d1 = new Date(dates[i - 1]);
        const d2 = new Date(dates[i]);
        const diff = (d2 - d1) / (1000 * 60 * 60 * 24);
        if (diff === 1) streakActuel++;
        else break;
      }
    }
  }
  
  // 2) Compteur recettes refaites (depuis cuisinees, plus précis)
  const compteurRecettes = {};
  cuisinees.forEach(c => { compteurRecettes[c.cle] = c.count || 1; });
  
  // 3) Calculer prix et kcal — sur les recettes CUISINÉES uniquement
  let prixTotalCumule = 0, prixCount = 0;
  let calTotalCumule = 0, calCount = 0;
  let recettePlusChere = null, recettePlusKcal = null, recettePlusRapide = null;
  let prixMax = 0, calMax = 0, tempsMin = Infinity;
  
  // Si pas encore de recettes cuisinées, on calcule sur les favoris pour ne pas avoir 0 partout
  const baseCalcul = recettesCuisineesSet.size > 0 ? recettesCuisineesSet : new Set(favoris);
  
  baseCalcul.forEach(cle => {
    const r = recettes[cle];
    if (!r) return;
    
    // Prix et calories via la nouvelle fonction
    if (typeof calculerPrixCaloriesRecette === "function") {
      const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
      if (tabKey && r[tabKey].length) {
        const base = r.base || 4;
        const ligne = r[tabKey].find(l => l.nb === base || l.patons === base) || r[tabKey][0];
        const res = calculerPrixCaloriesRecette(ligne);
        if (res.prix > 0) {
          // Ramener par personne (base = nb personnes de la recette de référence)
          const prixParPers = res.prix / base;
          prixTotalCumule += prixParPers;
          prixCount++;
          if (res.prix > prixMax) { prixMax = res.prix; recettePlusChere = cle; }
        }
        if (res.cal > 0) {
          // Ramener par personne aussi
          const calParPers = res.cal / base;
          calTotalCumule += calParPers;
          calCount++;
          if (res.cal > calMax) { calMax = res.cal; recettePlusKcal = cle; }
        }
      }
    }
    
    // Temps de préparation (extraire les minutes)
    const temps = r.temps || "";
    const min = parseInt(temps.match(/(\d+)\s*min/)?.[1] || temps.match(/(\d+)\s*h/)?.[1]*60 || 0);
    if (min > 0 && min < tempsMin) { tempsMin = min; recettePlusRapide = cle; }
  });
  
  // 4) Recette la plus refaite
  let recettePlusRefaite = null, maxRefait = 0;
  Object.entries(compteurRecettes).forEach(([cle, n]) => {
    if (n > maxRefait) { maxRefait = n; recettePlusRefaite = cle; }
  });
  
  // 5) Compter par pays / catégorie sur favoris + historique
  const paysCount = {};
  const catCount = {};
  recettesVues.forEach(cle => {
    const r = recettes[cle];
    if (!r) return;
    if (r.pays) paysCount[r.pays] = (paysCount[r.pays] || 0) + 1;
    if (r.cat) catCount[r.cat] = (catCount[r.cat] || 0) + 1;
  });
  const topPays = Object.entries(paysCount).sort((a,b) => b[1] - a[1])[0];
  const topCat = Object.entries(catCount).sort((a,b) => b[1] - a[1])[0];
  
  // 6) Évolution mensuelle (nombre de menus générés par mois)
  const parMois = {};
  historique.forEach(menu => {
    const date = menu.date ? new Date(menu.date) : null;
    if (!date || isNaN(date.getTime())) return;
    const ym = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0");
    parMois[ym] = (parMois[ym] || 0) + 1;
  });
  
  return {
    nbRecettesEssayees: recettesVues.size,
    // v241 : compteur cumulatif (persiste entre sessions, jamais reset à 0)
    nbRecettesVues: Math.max(user.totalRecettesVues || 0, recettesVues.size),
    nbRecettesCuisinees: recettesCuisineesSet.size, // v240 : nouveau
    totalCuissons: totalCuissons, // v240 : total des fois où des recettes ont été cuisinées
    streakActuel: streakActuel, // v242 : jours consécutifs actuels
    streakRecord: streakRecord, // v242 : record historique
    nbFavoris: favoris.length,
    nbMenusFavoris: menusFavoris.length,
    nbMenusGeneres: historique.length,
    prixMoyen: prixCount > 0 ? prixTotalCumule / prixCount : 0, // v240 : par personne
    calMoyen: calCount > 0 ? calTotalCumule / calCount : 0,     // v240 : par personne
    recettePlusChere: recettePlusChere ? { cle: recettePlusChere, prix: prixMax } : null,
    recettePlusKcal: recettePlusKcal ? { cle: recettePlusKcal, cal: calMax } : null,
    recettePlusRapide: recettePlusRapide ? { cle: recettePlusRapide, temps: tempsMin } : null,
    recettePlusRefaite: recettePlusRefaite ? { cle: recettePlusRefaite, n: maxRefait } : null,
    topPays,
    topCat,
    parMois,
  };
}

// Remplit la section "Vue d'ensemble"
function remplirVueEnsemble(s) {
  const html = `
    <div class="stat-card stat-card-or">
      <div class="stat-emoji">👨‍🍳</div>
      <div class="stat-valeur">${s.totalCuissons}</div>
      <div class="stat-label">Recettes cuisinées</div>
    </div>
    <div class="stat-card stat-card-rose">
      <div class="stat-emoji">❤️</div>
      <div class="stat-valeur">${s.nbFavoris}</div>
      <div class="stat-label">Favoris</div>
    </div>
    <div class="stat-card stat-card-violet">
      <div class="stat-emoji">📅</div>
      <div class="stat-valeur">${s.nbMenusGeneres}</div>
      <div class="stat-label">Menus générés</div>
    </div>
    <div class="stat-card stat-card-vert">
      <div class="stat-emoji">💝</div>
      <div class="stat-valeur">${s.nbMenusFavoris}</div>
      <div class="stat-label">Menus favoris</div>
    </div>
    <div class="stat-card stat-card-orange">
      <div class="stat-emoji">💰</div>
      <div class="stat-valeur">${s.prixMoyen > 0 ? s.prixMoyen.toFixed(2) + " €" : "—"}</div>
      <div class="stat-label">Prix moyen / pers.</div>
    </div>
    <div class="stat-card stat-card-turquoise">
      <div class="stat-emoji">🔥</div>
      <div class="stat-valeur">${s.calMoyen > 0 ? Math.round(s.calMoyen) : "—"}</div>
      <div class="stat-label">Kcal moyennes / pers.</div>
    </div>
  `;
  document.getElementById("stats-overview").innerHTML = html;
}

// Remplit la section "Records"
function remplirRecords(s) {
  const nomRecette = (cle) => {
    if (!cle) return "—";
    if (typeof getNomRecette === "function") return getNomRecette(cle);
    return cle;
  };
  
  const records = [];
  
  if (s.recettePlusRefaite && s.recettePlusRefaite.n >= 2) {
    records.push({
      icon: "🥇",
      label: "Recette préférée",
      valeur: nomRecette(s.recettePlusRefaite.cle),
      detail: `Faite ${s.recettePlusRefaite.n} fois`,
      cle: s.recettePlusRefaite.cle,
    });
  }
  
  if (s.recettePlusChere) {
    records.push({
      icon: "💎",
      label: "Plus chère cuisinée",
      valeur: nomRecette(s.recettePlusChere.cle),
      detail: `${s.recettePlusChere.prix.toFixed(2)} €`,
      cle: s.recettePlusChere.cle,
    });
  }
  
  if (s.recettePlusKcal) {
    records.push({
      icon: "🔥",
      label: "Plus calorique",
      valeur: nomRecette(s.recettePlusKcal.cle),
      detail: `${s.recettePlusKcal.cal} kcal`,
      cle: s.recettePlusKcal.cle,
    });
  }
  
  if (s.recettePlusRapide && s.recettePlusRapide.temps < Infinity) {
    records.push({
      icon: "⚡",
      label: "La plus rapide",
      valeur: nomRecette(s.recettePlusRapide.cle),
      detail: `${s.recettePlusRapide.temps} min`,
      cle: s.recettePlusRapide.cle,
    });
  }
  
  if (s.topPays) {
    const flags = {
      france: "🇫🇷", italie: "🇮🇹", japon: "🇯🇵", usa: "🇺🇸", mexique: "🇲🇽",
      espagne: "🇪🇸", chine: "🇨🇳", inde: "🇮🇳", thailande: "🇹🇭", grece: "🇬🇷",
      maroc: "🇲🇦", liban: "🇱🇧", coree: "🇰🇷", vietnam: "🇻🇳", allemagne: "🇩🇪",
    };
    records.push({
      icon: flags[s.topPays[0]] || "🌍",
      label: "Cuisine favorite",
      valeur: s.topPays[0].charAt(0).toUpperCase() + s.topPays[0].slice(1),
      detail: `${s.topPays[1]} recette${s.topPays[1] > 1 ? "s" : ""}`,
    });
  }
  
  if (s.topCat) {
    const catEmojis = {
      plats: "🍽️", desserts: "🍰", salades: "🥗", healthy: "💚", brunch: "🍳",
      boulangerie: "🥖", pizzas: "🍕", soupes: "🍲", entrees: "🫕", encas: "🥪",
    };
    records.push({
      icon: catEmojis[s.topCat[0]] || "🍴",
      label: "Catégorie préférée",
      valeur: s.topCat[0].charAt(0).toUpperCase() + s.topCat[0].slice(1),
      detail: `${s.topCat[1]} recette${s.topCat[1] > 1 ? "s" : ""}`,
    });
  }
  
  // v240 : Record "Recettes vues" (curiosité)
  if (s.nbRecettesVues > 0) {
    records.push({
      icon: "👀",
      label: "Recettes explorées",
      valeur: s.nbRecettesVues + " recette" + (s.nbRecettesVues > 1 ? "s" : ""),
      detail: "Vues / consultées",
    });
  }
  
  // v242 : Streak cuisine
  if (s.streakActuel > 0) {
    records.push({
      icon: "🔥",
      label: "Streak en cours",
      valeur: s.streakActuel + " jour" + (s.streakActuel > 1 ? "s" : ""),
      detail: "À cuisiner aujourd'hui pour continuer !",
    });
  }
  if (s.streakRecord > 0) {
    records.push({
      icon: "🏅",
      label: "Record streak",
      valeur: s.streakRecord + " jour" + (s.streakRecord > 1 ? "s" : ""),
      detail: "Jours consécutifs à cuisiner",
    });
  }
  
  if (records.length === 0) {
    document.getElementById("stats-records").innerHTML = 
      `<p class="stats-vide">🍳 Commencez à cuisiner pour débloquer vos records !</p>`;
    return;
  }
  
  const html = records.map(r => `
    <div class="record-card" ${r.cle ? `onclick="ouvrirFiche('${r.cle}')" style="cursor:pointer"` : ""}>
      <div class="record-icon">${r.icon}</div>
      <div class="record-content">
        <div class="record-label">${r.label}</div>
        <div class="record-valeur">${r.valeur}</div>
        <div class="record-detail">${r.detail}</div>
      </div>
    </div>
  `).join("");
  document.getElementById("stats-records").innerHTML = html;
}

// Remplit la section "Évolution"
function remplirEvolution(s) {
  const mois = Object.entries(s.parMois).sort((a,b) => a[0].localeCompare(b[0]));
  const nomsMois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  
  // v254 : Bloc Évolution Nutri-Score
  const blocNutri = genererBlocEvolutionNutri();
  
  if (mois.length === 0 && !blocNutri) {
    document.getElementById("stats-evolution").innerHTML = 
      `<p class="stats-vide">📈 Générez des menus ou cuisinez des recettes pour voir votre évolution !</p>`;
    return;
  }
  
  // Bloc 1 : menus par mois (existant)
  let blocMenus = "";
  if (mois.length > 0) {
    const max = Math.max(...mois.map(m => m[1]));
    const bars = mois.map(([ym, n]) => {
      const [annee, m] = ym.split("-");
      const label = nomsMois[parseInt(m) - 1] + " " + annee.slice(-2);
      const pct = (n / max) * 100;
      return `
        <div class="stats-bar-wrap">
          <div class="stats-bar-label">${label}</div>
          <div class="stats-bar-track">
            <div class="stats-bar-fill" style="width:${pct}%">
              <span class="stats-bar-value">${n}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
    blocMenus = `
      <p class="stats-evolution-titre">Menus générés par mois</p>
      <div class="stats-bars">${bars}</div>
    `;
  }
  
  document.getElementById("stats-evolution").innerHTML = blocMenus + blocNutri;
}

// v254 : Génère le bloc "Évolution Nutri-Score" — courbe SVG des 12 derniers mois
function genererBlocEvolutionNutri() {
  const cuisinees = (window.userProfile?.recettesCuisinees || []);
  if (cuisinees.length === 0) return "";
  if (typeof calculerNutriScoreRecette !== "function") return "";
  
  const nutriRank = { A: 5, B: 4, C: 3, D: 2, E: 1 };
  const parMois = {}; // {ym: {sum, count}}
  let totalSum = 0, totalCount = 0;
  
  cuisinees.forEach(({ cle, count, dernierDate }) => {
    if (!cle || !count || !dernierDate) return;
    const r = recettes[cle];
    if (!r) return;
    if (r.cat === "cocktails" || r.cat === "mocktails") return; // exclus
    
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey) return;
    const base = r.base || 4;
    const ligne = r[tabKey].find(l => l.nb === base || l.patons === base) || r[tabKey][0];
    if (!ligne) return;
    
    const ns = calculerNutriScoreRecette(ligne);
    if (!ns) return;
    const score = nutriRank[ns.lettre];
    if (!score) return;
    
    const d = new Date(dernierDate);
    if (isNaN(d.getTime())) return;
    const ym = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    
    if (!parMois[ym]) parMois[ym] = { sum: 0, count: 0 };
    parMois[ym].sum += score * count;
    parMois[ym].count += count;
    
    totalSum += score * count;
    totalCount += count;
  });
  
  if (totalCount === 0) {
    return `
      <div class="nutri-evol-block">
        <p class="stats-evolution-titre">🥗 Évolution Nutri-Score</p>
        <p class="stats-vide">📊 Cuisine des recettes pour voir l'évolution !</p>
      </div>`;
  }
  
  // Moyenne globale
  const moyenneGlobale = totalSum / totalCount;
  const lettreGlobale = scoreNutriVersLettre(moyenneGlobale);
  
  // Limiter aux 12 derniers mois
  const moisOrdonnes = Object.entries(parMois)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-12);
  
  // Si un seul mois → afficher juste la moyenne, pas de graphique
  if (moisOrdonnes.length < 2) {
    return `
      <div class="nutri-evol-block">
        <p class="stats-evolution-titre">🥗 Évolution Nutri-Score</p>
        <div class="nutri-evol-moyenne-grande">
          <div class="nutri-evol-label">Moyenne globale</div>
          <div class="nutri-evol-lettre nutri-${lettreGlobale}">${lettreGlobale}</div>
          <div class="nutri-evol-stat">${moyenneGlobale.toFixed(2)}/5 · ${totalCount} recette${totalCount>1?'s':''} cuisinée${totalCount>1?'s':''}</div>
        </div>
        <p class="stats-vide" style="margin-top:12px">Cuisine plus pour voir une vraie courbe d'évolution !</p>
      </div>`;
  }
  
  // Graphique SVG
  const W = 600, H = 200, padX = 32, padY = 16;
  const usableW = W - 2 * padX;
  const usableH = H - 2 * padY - 18;
  
  const points = moisOrdonnes.map(([ym, { sum, count }]) => ({
    ym,
    moyenne: sum / count
  }));
  
  const xStep = points.length > 1 ? usableW / (points.length - 1) : 0;
  const yMap = (v) => padY + usableH - ((v - 1) / 4) * usableH;
  const xMap = (i) => padX + i * xStep;
  
  const nutriCouleurs = [
    { v: 5, label: "A", color: "#008944" },
    { v: 4, label: "B", color: "#85bb2f" },
    { v: 3, label: "C", color: "#f9b327" },
    { v: 2, label: "D", color: "#ef7c1d" },
    { v: 1, label: "E", color: "#e63312" },
  ];
  
  // Lignes de référence
  const reperes = nutriCouleurs.map(l => `
    <line x1="${padX}" y1="${yMap(l.v)}" x2="${W - padX}" y2="${yMap(l.v)}" 
          stroke="${l.color}" stroke-width="1" stroke-dasharray="2,3" opacity="0.3"/>
    <text x="${padX - 6}" y="${yMap(l.v) + 4}" fill="${l.color}" 
          font-size="12" font-weight="700" text-anchor="end">${l.label}</text>
  `).join("");
  
  // Courbe
  const path = points.map((p, i) => 
    `${i === 0 ? "M" : "L"} ${xMap(i)} ${yMap(p.moyenne)}`
  ).join(" ");
  
  // Points colorés
  const dots = points.map((p, i) => {
    const couleur = getCouleurPourScoreNutri(p.moyenne);
    return `<circle cx="${xMap(i)}" cy="${yMap(p.moyenne)}" r="5" fill="${couleur}" stroke="#1a1a2e" stroke-width="2"/>`;
  }).join("");
  
  // Labels X
  const moisAbbr = ["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
  const xLabels = points.map((p, i) => {
    const [annee, mois] = p.ym.split("-");
    const label = moisAbbr[parseInt(mois) - 1];
    return `<text x="${xMap(i)}" y="${H - 4}" fill="#aaa" font-size="11" text-anchor="middle">${label}</text>`;
  }).join("");
  
  // Stats : moyennes
  const dernierMois = points[points.length - 1];
  const lettreDernier = scoreNutriVersLettre(dernierMois.moyenne);
  
  return `
    <div class="nutri-evol-block">
      <p class="stats-evolution-titre">🥗 Évolution Nutri-Score</p>
      
      <div class="nutri-evol-resume">
        <div class="nutri-evol-resume-item">
          <div class="nutri-evol-resume-label">Moyenne globale</div>
          <div class="nutri-evol-resume-lettre nutri-${lettreGlobale}">${lettreGlobale}</div>
          <div class="nutri-evol-resume-stat">${moyenneGlobale.toFixed(1)}/5</div>
        </div>
        <div class="nutri-evol-resume-item">
          <div class="nutri-evol-resume-label">Ce mois</div>
          <div class="nutri-evol-resume-lettre nutri-${lettreDernier}">${lettreDernier}</div>
          <div class="nutri-evol-resume-stat">${dernierMois.moyenne.toFixed(1)}/5</div>
        </div>
        <div class="nutri-evol-resume-item">
          <div class="nutri-evol-resume-label">Recettes cuisinées</div>
          <div class="nutri-evol-resume-nb">${totalCount}</div>
        </div>
      </div>
      
      <div class="nutri-evol-graphique">
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" class="nutri-evol-svg">
          ${reperes}
          <path d="${path}" fill="none" stroke="#ff4d88" stroke-width="2.5" stroke-linejoin="round"/>
          ${dots}
          ${xLabels}
        </svg>
      </div>
    </div>
  `;
}

// Convertit un score numérique en lettre Nutri-Score
function scoreNutriVersLettre(score) {
  if (score >= 4.5) return "A";
  if (score >= 3.5) return "B";
  if (score >= 2.5) return "C";
  if (score >= 1.5) return "D";
  return "E";
}

// Couleur Nutri selon un score continu
function getCouleurPourScoreNutri(s) {
  if (s >= 4.5) return "#008944";
  if (s >= 3.5) return "#85bb2f";
  if (s >= 2.5) return "#f9b327";
  if (s >= 1.5) return "#ef7c1d";
  return "#e63312";
}

// Remplit la section "Badges"
function remplirBadges(s) {
  const badges = [
    // === Badges cuisson ===
    { id: "premier-pas", emoji: "👶", titre: "Premier pas", desc: "1 recette cuisinée", debloque: s.nbRecettesCuisinees >= 1 },
    { id: "explorer-cuisine", emoji: "🧭", titre: "Explorateur", desc: "10 recettes cuisinées", debloque: s.nbRecettesCuisinees >= 10 },
    { id: "chef", emoji: "👨‍🍳", titre: "Chef en herbe", desc: "25 recettes cuisinées", debloque: s.nbRecettesCuisinees >= 25 },
    { id: "master", emoji: "🏆", titre: "Master Chef", desc: "50 recettes cuisinées", debloque: s.nbRecettesCuisinees >= 50 },
    // === Badges curiosité (recettes vues/explorées) v240 ===
    { id: "curieux", emoji: "👀", titre: "Curieux", desc: "10 recettes vues", debloque: s.nbRecettesVues >= 10 },
    { id: "voyageur", emoji: "🗺️", titre: "Voyageur", desc: "50 recettes vues", debloque: s.nbRecettesVues >= 50 },
    { id: "centurion", emoji: "💯", titre: "Centurion", desc: "100 recettes vues", debloque: s.nbRecettesVues >= 100 },
    { id: "expert", emoji: "🎓", titre: "Expert", desc: "200 recettes vues", debloque: s.nbRecettesVues >= 200 },
    // === Badges streak (v242) ===
    { id: "enfeu", emoji: "🔥", titre: "En feu", desc: "7 jours d'affilée à cuisiner", debloque: s.streakRecord >= 7 },
    { id: "inarretable", emoji: "🌋", titre: "Inarrêtable", desc: "30 jours d'affilée à cuisiner", debloque: s.streakRecord >= 30 },
    // === Badges favoris ===
    { id: "fan", emoji: "❤️", titre: "Fan", desc: "5 favoris", debloque: s.nbFavoris >= 5 },
    { id: "collectionneur", emoji: "💎", titre: "Collectionneur", desc: "15 favoris", debloque: s.nbFavoris >= 15 },
    // === Badges menus ===
    { id: "planificateur", emoji: "📅", titre: "Planificateur", desc: "5 menus générés", debloque: s.nbMenusGeneres >= 5 },
    { id: "organisateur", emoji: "🗂️", titre: "Organisateur", desc: "20 menus générés", debloque: s.nbMenusGeneres >= 20 },
    // === Badges spéciaux ===
    { id: "fidele", emoji: "🥇", titre: "Fidèle", desc: "Une recette refaite 3 fois", debloque: s.recettePlusRefaite && s.recettePlusRefaite.n >= 3 },
    { id: "globetrotter", emoji: "🌍", titre: "Globe-trotter", desc: "5 pays différents", debloque: false }, // calculé ci-dessous
  ];
  
  // Calcul globetrotter à partir de userProfile
  const user = window.userProfile || {};
  const recettesVues = new Set([...(window._recentsVus || []), ...(user.favoris || [])]);
  (user.historiqueMenus || []).forEach(menu => {
    (menu.menus || menu.menu || []).forEach(plat => {
      const cle = typeof plat === "string" ? plat : plat?.cle;
      if (cle) recettesVues.add(cle);
    });
  });
  const paysSet = new Set();
  recettesVues.forEach(cle => {
    const r = recettes[cle];
    if (r?.pays) paysSet.add(r.pays);
  });
  const ggBadge = badges.find(b => b.id === "globetrotter");
  if (ggBadge) ggBadge.debloque = paysSet.size >= 5;
  
  const html = badges.map(b => `
    <div class="badge-card ${b.debloque ? 'badge-debloque' : 'badge-verrou'}">
      <div class="badge-emoji">${b.debloque ? b.emoji : "🔒"}</div>
      <div class="badge-titre">${b.titre}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>
  `).join("");
  
  const debloques = badges.filter(b => b.debloque).length;
  document.getElementById("stats-badges").innerHTML = `
    <p class="stats-badges-progress">${debloques} / ${badges.length} badges débloqués</p>
    <div class="badges-grid">${html}</div>
  `;
}

function afficherSection(section, btn) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  // Fermer les sous-menus catégories/monde
  fermerSousMenus();
  const cuisine    = document.getElementById("section-cuisine"); // v242 : remplace calculateur
  const cartes     = document.getElementById("section-cartes");   // grille complète
  const accueilSec = document.getElementById("section-accueil"); // page accueil
  const menuCats   = document.querySelector(".menu-cats");
  const planif     = document.getElementById("section-planificateur");
  const searchBar  = document.querySelector(".search-bar");
  const stats      = document.getElementById("section-stats");
  const festif     = document.getElementById("section-festif");

  // Toujours masquer la section stats par défaut (sauf si on y va)
  if (stats && section !== "stats") stats.style.display = "none";

  if (section === "stats") {
    if (cuisine)    cuisine.style.display = "none";
    if (cartes)     cartes.classList.remove("visible");
    if (accueilSec) accueilSec.style.display = "none";
    if (planif)     planif.style.display = "none";
    if (festif)     festif.style.display = "none";
    if (menuCats)   menuCats.style.display = "none";
    if (searchBar)  searchBar.style.display = "none";
    if (typeof cacherFiltresChips === "function") cacherFiltresChips();
    if (stats)      stats.style.display = "block";
    // Charger les stats
    if (typeof chargerMesStats === "function") chargerMesStats();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (section === "cuisine") {
    if (cuisine) cuisine.style.display = "block";
    if (cartes)     { cartes.classList.remove("visible"); }
    if (accueilSec) accueilSec.style.display = "none";
    if (planif)     planif.style.display = "none";
    if (festif)     festif.style.display = "none";
    if (menuCats)   menuCats.style.display = "none";
    if (searchBar)  searchBar.style.display = "none";
    if (typeof cacherFiltresChips === "function") cacherFiltresChips();
    // Charger les ingrédients du vide-frigo
    if (typeof vfChargerIngredients === "function") vfChargerIngredients();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (section === "planificateur") {
    if (cuisine) cuisine.style.display = "none";
    if (cartes)     { cartes.classList.remove("visible"); }
    if (accueilSec) accueilSec.style.display = "none";
    if (menuCats)   menuCats.style.display = "none";
    if (searchBar)  searchBar.style.display = "none";
    // Pré-remplir le formulaire avec le profil
    setTimeout(() => { if (typeof appliquerProfilSurFormulaire === "function") appliquerProfilSurFormulaire(); }, 200);
    if (typeof cacherFiltresChips === "function") cacherFiltresChips();

    // Restaurer l'onglet qui était actif avant de quitter
    const tabActif = window._planTabActif || "semaine";
    if (tabActif === "festif") {
      planif.style.display = "none";
      document.getElementById("section-festif").style.display = "block";
      chargerMenuFestifAuDemarrage();
      // Mettre à jour les onglets
      document.getElementById("tab-semaine") && document.getElementById("tab-semaine").classList.remove("active");
      document.getElementById("tab-semaine2") && document.getElementById("tab-semaine2").classList.remove("active");
      document.getElementById("tab-festif") && document.getElementById("tab-festif").classList.add("active");
      document.getElementById("tab-festif2") && document.getElementById("tab-festif2").classList.add("active");
    } else {
      planif.style.display = "block";
      document.getElementById("section-festif").style.display = "none";
      chargerMenusAuDemarrage();
      chargerMenuFestifAuDemarrage();
    }
  } else {
    if (cuisine) cuisine.style.display = "none";
    if (planif)  planif.style.display = "none";
    if (menuCats) menuCats.style.display = "flex";
    if (searchBar) searchBar.style.display = "flex";
    // Retour vers l'accueil personnalisé
    if (accueilSec) accueilSec.style.display = "block";
    if (cartes) { cartes.classList.remove("visible"); } // ← retirer visible !
    if (typeof chargerAccueil === "function") chargerAccueil();
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    const btnA = document.getElementById("btn-accueil");
    if (btnA) btnA.classList.add("active");
  }
}


// Alias pour compatibilité avec les boutons HTML
function genererMenusIA(btn) { return genererMenus(btn); }

// Format repas
window._formatRepas = "midi-soir"; // défaut

function setFormatRepas(format, btn) {
  window._formatRepas = format;
  document.querySelectorAll("#format-midi-soir, #format-complet").forEach(b => b.classList.remove("plan-tag-active"));
  btn.classList.add("plan-tag-active");
}

window.addEventListener('profilMisAJour', () => {
  majBoutonFamille();
  majBoutonMonProfil();
  // Ré-afficher les menus avec badges famille si un menu est actif
  if (window._derniersMenus) {
    const p = parseInt(document.getElementById("plan-personnes")?.value) || 4;
    if (typeof afficherMenusSemaine === "function") {
      afficherMenusSemaine(window._derniersMenus, p);
    }
  }
  // Rafraîchir les sections favoris (accueil + nouvelle vue dédiée si visible)
  if (typeof chargerAccueilFavoris === "function") chargerAccueilFavoris();
  if (typeof chargerAccueilMenusFavoris === "function") chargerAccueilMenusFavoris();
  if (typeof chargerAccueilFetiches === "function") chargerAccueilFetiches();
  // Si la vue dédiée "Menus favoris" est ouverte, la re-rendre
  const secMF = document.getElementById("section-menus-favoris");
  if (secMF && secMF.style.display !== "none" && typeof filtrerMenusFavoris === "function") {
    filtrerMenusFavoris();
  }
});
// Vérifier aussi après chargement initial
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    majBoutonFamille();
    majBoutonMonProfil();
    // v257.3 : compteur dynamique de recettes (plus de chiffre figé !)
    try {
      const nbR = (typeof recettes !== "undefined") ? Object.keys(recettes).length : 0;
      const el = document.getElementById("nb-recettes");
      if (el && nbR > 0) el.textContent = `🍽️ ${nbR} recettes`;
    } catch (e) {}
    // v257.9 : Init des inputs calc-* selon la catégorie de la recette
    //   - Cocktails (alcool) → adultes uniquement
    //   - Mocktails (sans alcool) → tout le foyer sauf bébés
    //   - Exceptions unités (brioche, pâtes) → reste à leur valeur initiale
    //   - Autres → tout le foyer
    // Les listes d'exceptions sont dans js/exceptions.js
    const exceptionsUnites = (window.EXCEPTIONS && window.EXCEPTIONS.unites) || [];
    const foyer = window.userProfile?.foyer;
    if (foyer) {
      const totalFoyer = (foyer.adultes || 0) + (foyer.ados || 0) +
                         (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0);
      const adultesOnly = (foyer.adultes || 0);
      const sansBebes = (foyer.adultes || 0) + (foyer.ados || 0) + (foyer.enfants || 0);
      
      if (totalFoyer > 0) {
        document.querySelectorAll(".calc-input").forEach(inp => {
          // Récupérer le nom de la recette depuis l'id calc-NOM
          const nomRecette = inp.id.replace(/^calc-/, "");
          
          // Exception unité → skip (garde valeur initiale)
          if (exceptionsUnites.includes(nomRecette)) return;
          
          // Récupérer la catégorie de la recette
          const recette = (typeof recettes !== "undefined") ? recettes[nomRecette] : null;
          let nb = totalFoyer;
          if (recette) {
            if (recette.cat === "cocktails") {
              nb = adultesOnly || totalFoyer;
            } else if (recette.cat === "mocktails") {
              nb = sansBebes || totalFoyer;
            }
          }
          inp.value = Math.min(15, Math.max(1, nb));
        });
      }
    }
    // Appliquer les préférences visuelles (badges niveau + famille)
    if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles();
    
    // Appliquer les badges Nutri-Score sur toutes les cartes
    if (typeof appliquerNutriScoreCartes === "function") appliquerNutriScoreCartes();
  if (typeof appliquerBadgeNotesCartes === "function") appliquerBadgeNotesCartes();
    
    // Construire l'index de recherche intelligente
    if (typeof construireIndexRecherche === "function") construireIndexRecherche();
    
    // Fermer le dropdown des suggestions quand on clique ailleurs
    document.addEventListener("click", (e) => {
      const searchBar = document.querySelector(".search-bar");
      if (searchBar && !searchBar.contains(e.target)) {
        cacherSuggestions();
      }
    });
    // Quand on focus l'input et qu'il y a déjà du texte, ré-afficher les suggestions
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("focus", () => {
        if (searchInput.value) afficherSuggestions(searchInput.value);
      });
      // Échap pour fermer
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          cacherSuggestions();
          searchInput.blur();
        }
        // Entrée : applique la TOP suggestion (catégorie/pays prioritaire)
        if (e.key === "Enter") {
          e.preventDefault();
          const dropdown = document.getElementById("search-suggestions");
          if (!dropdown || dropdown.style.display === "none") return;
          const firstItem = dropdown.querySelector(".suggestion-item");
          if (firstItem) firstItem.click();
        }
      });
    }

    // Marquer les calc-input comme "modifié" quand l'utilisateur change leur valeur
    // (pour ne pas que la maj depuis le foyer écrase un choix manuel)
    document.querySelectorAll(".calc-input").forEach(inp => {
      inp.addEventListener("input", () => { inp.dataset.modifie = "1"; });
    });
  }, 1500);
});

// Aussi mettre à jour quand le profil est chargé/modifié
window.addEventListener("profilMisAJour", () => {
  majBoutonFamille();
  majBoutonMonProfil();
  const foyer = window.userProfile?.foyer;
  if (foyer) {
    const nb = Math.min(15, Math.max(1,
      (foyer.adultes || 0) + (foyer.ados || 0) +
      (foyer.enfants || 0) + (foyer.bebes || foyer.bébés || 0)
    ));
    if (nb > 0) {
      // Ne pas écraser les valeurs modifiées manuellement par l'utilisateur
      document.querySelectorAll(".calc-input").forEach(inp => {
        if (!inp.dataset.modifie) inp.value = nb;
      });
    }
  }
});


