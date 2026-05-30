// =============================================================================
// 📦 MODULE : ADMIN
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

// =============================================================================
// 👑 STATS ADMIN COMPLÈTES v257.1
// =============================================================================
// Affiche : vue d'ensemble users, engagement global, préférences agrégées, liste users
// Nécessite règles Firestore : allow read /utilisateurs si admin
// =============================================================================

async function chargerStatsAdminComplet() {
  if (!estAdmin()) return;
  const zoneStats = document.getElementById("admin-stats-utilisateurs");
  if (!zoneStats) return;
  
  zoneStats.innerHTML = `<p class="avis-empty">Chargement des stats utilisateurs...</p>`;
  
  try {
    const snap = await _db.collection("utilisateurs").get();
    const users = snap.docs.map(d => d.data());
    console.log("👑 [Admin] Utilisateurs chargés :", users.length);

    // 🟢 v258.2 : Présence — qui est en ligne maintenant (connectés + anonymes)
    let enLigne = null;
    try {
      const presSnap = await _db.collection("presence").get();
      enLigne = _calculerEnLigne(presSnap.docs.map(d => d.data()));
      nettoyerPresence(presSnap); // 🧹 ménage best-effort (fire-and-forget)
    } catch (e) {
      console.warn("⚠️ Présence indisponible :", e?.message);
    }

    afficherAdminVueEnsemble(users, enLigne);
    afficherAdminEngagement(users);
    afficherAdminPreferences(users);
    afficherAdminListeUsers(users);

    // Rafraîchit le compteur "en ligne" toutes les 30 s tant que le panneau est ouvert
    demarrerRefreshEnLigne();
  } catch (e) {
    console.error("❌ Erreur stats admin complet:", e);
    if (e?.code === "permission-denied") {
      zoneStats.innerHTML = `
        <div class="admin-error">
          <h5>🔒 Permission refusée</h5>
          <p>Pour voir les stats utilisateurs, il faut ajouter une règle Firestore qui autorise ton UID admin à lire la collection utilisateurs.</p>
          <p style="margin-top:0.5rem;font-size:0.85rem;opacity:0.8">Voir l'aide dans le chat avec Claude.</p>
        </div>
      `;
    } else {
      zoneStats.innerHTML = `<p class="avis-empty">⚠️ Erreur : ${e?.message || "inconnue"}</p>`;
    }
  }
}

// === Section 1 : Vue d'ensemble utilisateurs ===
function afficherAdminVueEnsemble(users, enLigne) {
  const zone = document.getElementById("admin-stats-utilisateurs");
  if (!zone) return;
  
  const total = users.length;
  const maintenant = new Date();
  const il_y_a_30j = new Date(maintenant.getTime() - 30 * 24 * 3600 * 1000);
  const il_y_a_7j = new Date(maintenant.getTime() - 7 * 24 * 3600 * 1000);
  
  const nouveauxMois = users.filter(u => {
    if (!u.dateCreation) return false;
    try { return new Date(u.dateCreation) > il_y_a_30j; } catch { return false; }
  }).length;
  
  const nouveauxSemaine = users.filter(u => {
    if (!u.dateCreation) return false;
    try { return new Date(u.dateCreation) > il_y_a_7j; } catch { return false; }
  }).length;
  
  // Foyer moyen
  let totAdultes = 0, totAdos = 0, totEnfants = 0, totBebes = 0, nbAvecFoyer = 0;
  users.forEach(u => {
    if (u.foyer) {
      totAdultes += (u.foyer.adultes || 0);
      totAdos += (u.foyer.ados || 0);
      totEnfants += (u.foyer.enfants || 0);
      totBebes += (u.foyer.bebes || 0);
      nbAvecFoyer++;
    }
  });
  const moyA = nbAvecFoyer ? (totAdultes / nbAvecFoyer).toFixed(1) : "0";
  const moyAdo = nbAvecFoyer ? (totAdos / nbAvecFoyer).toFixed(1) : "0";
  const moyE = nbAvecFoyer ? (totEnfants / nbAvecFoyer).toFixed(1) : "0";
  const moyB = nbAvecFoyer ? (totBebes / nbAvecFoyer).toFixed(1) : "0";
  
  // Profils complets (avec prenom + foyer + préférences)
  const profilsComplets = users.filter(u => u.prenom && u.foyer && u.preferences).length;
  
  zone.innerHTML = `
    <h5 class="admin-section-titre">👥 Vue d'ensemble des utilisateurs</h5>
    <div class="admin-cartes-grille">
      <div class="admin-carte admin-carte-vert">
        <div class="admin-carte-val" id="admin-enligne-val">${enLigne ? enLigne.total : "—"}</div>
        <div class="admin-carte-lbl">🟢 En ligne maintenant</div>
        <div class="admin-carte-lbl" id="admin-enligne-sub" style="font-size:0.72rem;opacity:0.75;margin-top:0.15rem">${enLigne ? `${enLigne.connectes} connectés · ${enLigne.anonymes} anonymes` : ""}</div>
      </div>
      <div class="admin-carte">
        <div class="admin-carte-val">${total}</div>
        <div class="admin-carte-lbl">Utilisateurs au total</div>
      </div>
      <div class="admin-carte admin-carte-vert">
        <div class="admin-carte-val">+${nouveauxMois}</div>
        <div class="admin-carte-lbl">Nouveaux ce mois</div>
      </div>
      <div class="admin-carte admin-carte-bleu">
        <div class="admin-carte-val">+${nouveauxSemaine}</div>
        <div class="admin-carte-lbl">Cette semaine</div>
      </div>
      <div class="admin-carte admin-carte-rose">
        <div class="admin-carte-val">${profilsComplets}/${total}</div>
        <div class="admin-carte-lbl">Profils complets</div>
      </div>
    </div>
    <div class="admin-foyer-moy">
      <span class="admin-mini-titre">👨‍👩‍👧 Foyer moyen :</span>
      <span class="admin-foyer-detail">👤 ${moyA} adultes • 🧒 ${moyAdo} ados • 👶 ${moyE} enfants • 🍼 ${moyB} bébés</span>
    </div>
  `;
}

// === Section 2 : Engagement global ===
function afficherAdminEngagement(users) {
  const zone = document.getElementById("admin-engagement-global");
  if (!zone) return;
  
  let totVues = 0, totCuisinees = 0, totFavoris = 0, totNotes = 0, totListes = 0;
  const compteurCuisinees = {};
  const compteurFavoris = {};
  
  users.forEach(u => {
    totVues += (u.totalRecettesVues || 0);
    totFavoris += (u.favoris || []).length;
    totNotes += Object.keys(u.notesRecettes || {}).length;
    if ((u.listeCourses || []).length > 0) totListes++;
    (u.recettesCuisinees || []).forEach(r => {
      totCuisinees += (r.count || 1);
      compteurCuisinees[r.cle] = (compteurCuisinees[r.cle] || 0) + (r.count || 1);
    });
    (u.favoris || []).forEach(cle => {
      compteurFavoris[cle] = (compteurFavoris[cle] || 0) + 1;
    });
  });
  
  const top10Cuisinees = Object.entries(compteurCuisinees).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const top10Favoris = Object.entries(compteurFavoris).sort((a, b) => b[1] - a[1]).slice(0, 10);
  
  const getNom = (cle) => {
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    if (!r) return cle;
    return (r.emoji || "") + " " + (cle.charAt(0).toUpperCase() + cle.slice(1));
  };
  
  zone.innerHTML = `
    <h5 class="admin-section-titre">📊 Engagement global</h5>
    <div class="admin-cartes-grille">
      <div class="admin-carte">
        <div class="admin-carte-val">${totVues.toLocaleString("fr-FR")}</div>
        <div class="admin-carte-lbl">👁️ Recettes vues</div>
      </div>
      <div class="admin-carte admin-carte-orange">
        <div class="admin-carte-val">${totCuisinees}</div>
        <div class="admin-carte-lbl">👨‍🍳 Cuisinées</div>
      </div>
      <div class="admin-carte admin-carte-rose">
        <div class="admin-carte-val">${totFavoris}</div>
        <div class="admin-carte-lbl">❤️ Favoris</div>
      </div>
      <div class="admin-carte admin-carte-vert">
        <div class="admin-carte-val">${totNotes}</div>
        <div class="admin-carte-lbl">📝 Notes</div>
      </div>
      <div class="admin-carte admin-carte-bleu">
        <div class="admin-carte-val">${totListes}</div>
        <div class="admin-carte-lbl">🛒 Listes actives</div>
      </div>
    </div>
    <div class="admin-tops-grille">
      <div class="admin-top">
        <h6 class="admin-top-titre">🍳 Top 10 cuisinées</h6>
        ${top10Cuisinees.length === 0 ? '<p class="avis-empty">Aucune donnée</p>' : top10Cuisinees.map((r, i) => `
          <div class="admin-top-ligne">
            <span class="admin-top-rang">#${i+1}</span>
            <span class="admin-top-nom">${getNom(r[0])}</span>
            <span class="admin-top-val">${r[1]}×</span>
          </div>`).join("")}
      </div>
      <div class="admin-top">
        <h6 class="admin-top-titre">❤️ Top 10 favoris</h6>
        ${top10Favoris.length === 0 ? '<p class="avis-empty">Aucune donnée</p>' : top10Favoris.map((r, i) => `
          <div class="admin-top-ligne">
            <span class="admin-top-rang">#${i+1}</span>
            <span class="admin-top-nom">${getNom(r[0])}</span>
            <span class="admin-top-val">${r[1]}</span>
          </div>`).join("")}
      </div>
    </div>
  `;
}

// === Section 3 : Préférences agrégées ===
function afficherAdminPreferences(users) {
  const zone = document.getElementById("admin-preferences-agregees");
  if (!zone) return;
  
  const compteurs = (key, sub) => {
    const c = {};
    users.forEach(u => {
      const arr = u.preferences?.[key] || [];
      if (Array.isArray(arr)) {
        arr.forEach(item => { c[item] = (c[item] || 0) + 1; });
      } else if (typeof arr === "string" && arr) {
        c[arr] = (c[arr] || 0) + 1;
      }
    });
    return c;
  };
  
  const regimes = compteurs("regimes");
  const allergies = compteurs("allergies");
  const objectifs = compteurs("objectifs");
  const cuisines = compteurs("cuisinesFavorites");
  const niveaux = compteurs("niveauCuisine");
  
  // Allergies custom (texte libre)
  const allergiesCustom = {};
  users.forEach(u => {
    (u.preferences?.allergiesCustom || []).forEach(a => {
      const t = String(a).trim().toLowerCase();
      if (t) allergiesCustom[t] = (allergiesCustom[t] || 0) + 1;
    });
  });
  
  const tri = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 10);
  
  const renderListe = (obj, vide = "Aucune donnée") => {
    const tries = tri(obj);
    if (tries.length === 0) return `<p class="avis-empty">${vide}</p>`;
    const max = tries[0][1];
    return tries.map(([k, v]) => {
      const pct = max > 0 ? (v / max) * 100 : 0;
      return `<div class="admin-pref-ligne">
        <span class="admin-pref-label">${escapeHTML(k)}</span>
        <div class="admin-pref-bar"><div class="admin-pref-fill" style="width:${pct}%"></div></div>
        <span class="admin-pref-count">${v}</span>
      </div>`;
    }).join("");
  };
  
  zone.innerHTML = `
    <h5 class="admin-section-titre">🎯 Préférences agrégées</h5>
    <div class="admin-prefs-grille">
      <div class="admin-pref-bloc">
        <h6 class="admin-pref-titre">🥗 Régimes alimentaires</h6>
        ${renderListe(regimes, "Aucun régime spécifié")}
      </div>
      <div class="admin-pref-bloc">
        <h6 class="admin-pref-titre">⚠️ Allergies</h6>
        ${renderListe(allergies, "Aucune allergie déclarée")}
      </div>
      <div class="admin-pref-bloc">
        <h6 class="admin-pref-titre">🎯 Objectifs</h6>
        ${renderListe(objectifs, "Aucun objectif défini")}
      </div>
      <div class="admin-pref-bloc">
        <h6 class="admin-pref-titre">🌍 Cuisines favorites</h6>
        ${renderListe(cuisines, "Aucune cuisine favorite")}
      </div>
      <div class="admin-pref-bloc">
        <h6 class="admin-pref-titre">👨‍🍳 Niveaux de cuisine</h6>
        ${renderListe(niveaux, "Aucun niveau précisé")}
      </div>
      ${Object.keys(allergiesCustom).length > 0 ? `
      <div class="admin-pref-bloc">
        <h6 class="admin-pref-titre">📝 Autres allergies (texte libre)</h6>
        ${renderListe(allergiesCustom)}
      </div>` : ""}
    </div>
  `;
}

// === Section 4 : Liste des utilisateurs ===
function afficherAdminListeUsers(users) {
  const zone = document.getElementById("admin-liste-utilisateurs");
  if (!zone) return;
  
  // Trier par date d'inscription desc
  const tries = [...users].sort((a, b) => {
    const da = a.dateCreation || "";
    const db = b.dateCreation || "";
    return db.localeCompare(da);
  });
  
  const lignes = tries.map(u => {
    const prenom = u.prenom || u.email?.split("@")[0] || "—";
    const email = u.email || "—";
    const date = u.dateCreation ? formatDateAvis(u.dateCreation) : "—";
    const nbCuisinees = (u.recettesCuisinees || []).reduce((s, r) => s + (r.count || 1), 0);
    const nbVues = u.totalRecettesVues || 0;
    const nbFav = (u.favoris || []).length;
    return `<tr>
      <td>${escapeHTML(prenom)}</td>
      <td class="admin-tab-email">${escapeHTML(email)}</td>
      <td>${date}</td>
      <td>${nbCuisinees}</td>
      <td>${nbVues}</td>
      <td>${nbFav}</td>
    </tr>`;
  }).join("");
  
  zone.innerHTML = `
    <h5 class="admin-section-titre">👥 Liste des utilisateurs (${users.length})</h5>
    <div class="admin-tab-wrap">
      <table class="admin-tab">
        <thead><tr>
          <th>Prénom</th>
          <th>Email</th>
          <th>Inscrit</th>
          <th>🍳</th>
          <th>👁️</th>
          <th>❤️</th>
        </tr></thead>
        <tbody>${lignes || `<tr><td colspan="6" style="text-align:center;opacity:0.6">Aucun utilisateur</td></tr>`}</tbody>
      </table>
    </div>
  `;
}


// =============================================================================
// 🟢 UTILISATEURS EN LIGNE (v258.2)
// =============================================================================
// Compte les visiteurs présents (lastSeen < 2 min) à partir de la collection
// "presence" alimentée par le heartbeat (auth.js). Connectés + anonymes.
// =============================================================================

// Calcule { total, connectes, anonymes } à partir des docs de présence
function _calculerEnLigne(docs) {
  const SEUIL_MS = 2 * 60 * 1000; // 2 minutes
  const now = Date.now();
  let total = 0, connectes = 0, anonymes = 0;
  (docs || []).forEach(d => {
    let ts = null;
    if (d.lastSeen && typeof d.lastSeen.toMillis === "function") ts = d.lastSeen.toMillis();
    else if (typeof d.maj === "number") ts = d.maj;
    if (ts !== null && (now - ts) <= SEUIL_MS) {
      total++;
      if (d.connecte) connectes++; else anonymes++;
    }
  });
  return { total, connectes, anonymes };
}

// Met à jour uniquement le compteur "en ligne" sans tout re-rendre
async function majUtilisateursEnLigne() {
  const elVal = document.getElementById("admin-enligne-val");
  if (!elVal) return; // panneau fermé
  try {
    const presSnap = await _db.collection("presence").get();
    const e = _calculerEnLigne(presSnap.docs.map(d => d.data()));
    elVal.textContent = e.total;
    const elSub = document.getElementById("admin-enligne-sub");
    if (elSub) elSub.textContent = `${e.connectes} connectés · ${e.anonymes} anonymes`;
  } catch (err) {
    // silencieux
  }
}

// Rafraîchit le compteur toutes les 30 s ; s'arrête tout seul si le panneau est fermé
function demarrerRefreshEnLigne() {
  if (window._intervalEnLigne) clearInterval(window._intervalEnLigne);
  window._intervalEnLigne = setInterval(function () {
    if (!document.getElementById("admin-enligne-val")) {
      clearInterval(window._intervalEnLigne);
      window._intervalEnLigne = null;
      return;
    }
    majUtilisateursEnLigne();
  }, 30 * 1000);
}

// 🧹 Nettoyage des docs de présence obsolètes (> 1 jour) — best-effort.
// Le compteur "en ligne" reste juste même sans ménage, mais ça évite que la
// collection "presence" grossisse indéfiniment. Lancé au chargement de l'admin.
async function nettoyerPresence(docsSnap) {
  try {
    if (!docsSnap || typeof docsSnap.forEach !== "function") return;
    const SEUIL_MS = 24 * 60 * 60 * 1000; // 1 jour
    const now = Date.now();
    const aSupprimer = [];
    docsSnap.forEach(doc => {
      const d = doc.data() || {};
      let ts = (d.lastSeen && typeof d.lastSeen.toMillis === "function")
        ? d.lastSeen.toMillis()
        : (typeof d.maj === "number" ? d.maj : null);
      if (ts === null || (now - ts) > SEUIL_MS) aSupprimer.push(doc.ref);
    });
    if (aSupprimer.length === 0) return;
    // Suppression par lots (limite batch Firestore = 500)
    for (let i = 0; i < aSupprimer.length; i += 400) {
      const batch = _db.batch();
      aSupprimer.slice(i, i + 400).forEach(ref => batch.delete(ref));
      await batch.commit();
    }
    console.log(`🧹 [Présence] ${aSupprimer.length} doc(s) obsolète(s) supprimé(s)`);
  } catch (e) {
    console.warn("⚠️ Nettoyage présence :", e?.message);
  }
}
