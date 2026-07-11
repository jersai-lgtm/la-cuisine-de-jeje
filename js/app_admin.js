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
    const snap = await _db.collection("utilisateurs").get({ source: "server" });
    const users = snap.docs.map(d => d.data());
    console.log("👑 [Admin] Utilisateurs chargés :", users.length);
    
    afficherAdminVueEnsemble(users);
    afficherAdminEnLigne(users);
    afficherAdminEngagement(users);
    afficherAdminPreferences(users);
    afficherAdminListeUsers(users);
    const _horo = new Date().toLocaleTimeString("fr-FR");
    zoneStats.insertAdjacentHTML("afterbegin", `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 12px">
      <button onclick="chargerStatsAdminComplet()" style="background:var(--accent,#ff4d88);color:#fff;border:none;border-radius:8px;padding:7px 14px;font-weight:600;cursor:pointer">🔄 Rafraîchir</button>
      <span style="font-size:0.74rem;opacity:0.6">Mis à jour à ${_horo}</span>
    </div>`);
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

// === Section : Qui est en ligne maintenant ===
// "En ligne" = lastSeen (heartbeat auth.js) de moins de 3 minutes.
function afficherAdminEnLigne(users) {
  const zone = document.getElementById("admin-stats-utilisateurs");
  if (!zone) return;
  const SEUIL = 3 * 60 * 1000;
  const maintenant = Date.now();
  const enLigne = users
    .filter(u => {
      if (!u.lastSeen) return false;
      const t = new Date(u.lastSeen).getTime();
      return !isNaN(t) && (maintenant - t) < SEUIL;
    })
    .sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen));

  const chips = enLigne.map(u => {
    const prenom = u.prenom || u.email?.split("@")[0] || "Anonyme";
    return `<span style="display:inline-flex;align-items:center;gap:4px;background:rgba(46,204,113,.18);color:#6ee29a;border:1px solid rgba(46,204,113,.45);border-radius:14px;padding:3px 10px;font-size:0.85rem;font-weight:600;margin:3px 4px 3px 0">🟢 ${escapeHTML(prenom)}</span>`;
  }).join("");

  const html = `
    <div style="background:rgba(46,204,113,.06);border:1px solid rgba(46,204,113,.25);border-radius:10px;padding:10px 12px;margin-bottom:14px">
      <h5 class="admin-section-titre" style="margin-top:0">🟢 En ligne maintenant (${enLigne.length})</h5>
      ${enLigne.length
        ? `<div>${chips}</div>`
        : `<p class="avis-empty" style="margin:0">Personne en ligne en ce moment.</p>`}
      <p style="font-size:0.72rem;opacity:0.6;margin:6px 0 0">Actif il y a moins de 3 minutes • rafraîchir pour mettre à jour</p>
    </div>`;
  zone.insertAdjacentHTML("afterbegin", html);
}

// === Section 1 : Vue d'ensemble utilisateurs ===
function afficherAdminVueEnsemble(users) {
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
// ⭐ ADMIN — NOTES DES RECETTES (qui a noté) + détection d'abus
// =============================================================================
// Lit la collection communautaire "notesEtoiles" (docs {uid, recette, etoiles,
// prenom, dateMaj}) et affiche, RÉSERVÉ À L'ADMIN :
//  - un résumé (nb notes, nb noteurs, moyenne globale) ;
//  - les comptes suspects (que des 1★ ou que des 5★) pour repérer les abus ;
//  - le détail par noteur (qui a mis quelle note sur quelle recette).
// La vue est protégée par estAdmin() (UI) ; la vraie barrière côté données
// reste firestore.rules. Aucune écriture, lecture seule.
// =============================================================================
async function chargerNotesEtoilesAdmin() {
  if (!estAdmin()) return;
  const zone = document.getElementById("admin-notes-etoiles");
  if (!zone) return;
  zone.innerHTML = `<p class="avis-empty">Chargement des notes…</p>`;

  const nomRecette = (cle) => {
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    if (!r) return "❔ " + cle;
    return (r.emoji || "🍽️") + " " + (r.nom || (cle.charAt(0).toUpperCase() + cle.slice(1)));
  };
  const dateCourte = (d) => {
    if (!d) return "";
    try { return typeof formatDateAvis === "function" ? formatDateAvis(d) : new Date(d).toLocaleDateString("fr-FR"); }
    catch (e) { return ""; }
  };

  try {
    const snap = await _db.collection("notesEtoiles").get({ source: "server" });
    const notes = snap.docs.map(d => d.data())
      .filter(n => n && n.uid && n.recette && n.etoiles >= 1 && n.etoiles <= 5);

    if (!notes.length) {
      zone.innerHTML = `<p class="avis-empty">Aucune note pour l'instant.</p>`;
      const cnt = document.getElementById("cnt-notes-suspects");
      if (cnt) cnt.classList.remove("on");
      return;
    }

    // --- Agrégation par utilisateur ---
    const parUser = {};
    notes.forEach(n => {
      const u = parUser[n.uid] || (parUser[n.uid] = { uid: n.uid, prenom: n.prenom || "Anonyme", notes: [], dist: [0, 0, 0, 0, 0, 0], somme: 0 });
      if (n.prenom) u.prenom = n.prenom;
      u.notes.push({ recette: n.recette, etoiles: n.etoiles, date: n.dateMaj });
      u.dist[n.etoiles]++;
      u.somme += n.etoiles;
    });
    const users = Object.values(parUser);

    // --- Détection d'abus : au moins 4 notes ET ≥80% identiques en 1★ ou 5★ ---
    const MIN = 4;
    users.forEach(u => {
      const n = u.notes.length;
      u.moyenne = u.somme / n;
      const p1 = u.dist[1] / n, p5 = u.dist[5] / n;
      u.flag = null;
      if (n >= MIN) {
        if (u.dist[1] === n) u.flag = { txt: "🚩 QUE des 1★", grave: true };
        else if (u.dist[5] === n) u.flag = { txt: "🚩 QUE des 5★", grave: true };
        else if (p1 >= 0.8) u.flag = { txt: "⚠️ surtout des 1★", grave: false };
        else if (p5 >= 0.8) u.flag = { txt: "⚠️ surtout des 5★", grave: false };
      }
    });

    const suspects = users.filter(u => u.flag).sort((a, b) => (b.flag.grave - a.flag.grave) || (b.notes.length - a.notes.length));
    const tous = [...users].sort((a, b) => b.notes.length - a.notes.length);

    const moyGlobale = notes.reduce((s, n) => s + n.etoiles, 0) / notes.length;

    // Badge compteur sur le titre de l'accordéon
    const cnt = document.getElementById("cnt-notes-suspects");
    if (cnt) { cnt.textContent = suspects.length; cnt.classList.toggle("on", suspects.length > 0); }

    // Mini-barre de distribution 1★→5★ (rouge → vert)
    const COULEURS = ["", "#e74c3c", "#e88b2f", "#e8c62f", "#8bc34a", "#2ecc71"];
    const distBar = (dist, n) => {
      const seg = [1, 2, 3, 4, 5].map(i => {
        const w = n ? (dist[i] / n) * 100 : 0;
        return w > 0 ? `<span title="${dist[i]} × ${i}★" style="width:${w}%;background:${COULEURS[i]}"></span>` : "";
      }).join("");
      return `<span style="display:inline-flex;height:9px;width:120px;border-radius:5px;overflow:hidden;background:rgba(var(--w),.12);vertical-align:middle">${seg}</span>`;
    };
    const distLegende = (dist) => [5, 4, 3, 2, 1].filter(i => dist[i] > 0)
      .map(i => `<span style="color:${COULEURS[i]};font-weight:700">${dist[i]}×${i}★</span>`).join(" · ");

    // Bloc détaillé d'un noteur (dépliable)
    const blocUser = (u, suspect) => {
      const n = u.notes.length;
      const notesTri = [...u.notes].sort((a, b) => (b.etoiles - a.etoiles) || (a.recette < b.recette ? -1 : 1));
      const lignes = notesTri.map(nt =>
        `<div style="display:flex;align-items:center;gap:8px;padding:3px 0;font-size:0.84rem">
           <span style="color:${COULEURS[nt.etoiles]};font-weight:700;min-width:34px">${nt.etoiles}★</span>
           <span style="flex:1">${escapeHTML(nomRecette(nt.recette))}</span>
           <span style="opacity:0.55;font-size:0.75rem">${dateCourte(nt.date)}</span>
         </div>`).join("");
      const bord = suspect ? (u.flag.grave ? "#e74c3c" : "#e8a02f") : "rgba(var(--w),.14)";
      return `<details style="border:1px solid ${bord};border-radius:10px;margin-bottom:8px;background:rgba(var(--w),.03)">
        <summary style="list-style:none;cursor:pointer;padding:9px 12px;display:flex;align-items:center;gap:10px;flex-wrap:wrap">
          <strong>${escapeHTML(u.prenom)}</strong>
          ${u.flag ? `<span style="font-size:0.78rem;font-weight:700;color:${u.flag.grave ? '#e74c3c' : '#e8a02f'}">${u.flag.txt}</span>` : ""}
          <span style="margin-left:auto;font-size:0.8rem;opacity:0.75">${n} note${n > 1 ? "s" : ""} · moy. ${u.moyenne.toFixed(1).replace(".", ",")}/5</span>
          ${distBar(u.dist, n)}
        </summary>
        <div style="padding:2px 12px 10px">
          <div style="font-size:0.75rem;opacity:0.7;margin:0 0 6px">${distLegende(u.dist)}</div>
          ${lignes}
        </div>
      </details>`;
    };

    zone.innerHTML = `
      <div class="admin-cartes-grille" style="margin-bottom:12px">
        <div class="admin-carte"><div class="admin-carte-val">${notes.length}</div><div class="admin-carte-lbl">⭐ Notes au total</div></div>
        <div class="admin-carte admin-carte-bleu"><div class="admin-carte-val">${users.length}</div><div class="admin-carte-lbl">👤 Noteurs</div></div>
        <div class="admin-carte admin-carte-vert"><div class="admin-carte-val">${moyGlobale.toFixed(1).replace(".", ",")}/5</div><div class="admin-carte-lbl">Moyenne globale</div></div>
        <div class="admin-carte ${suspects.length ? 'admin-carte-rose' : ''}"><div class="admin-carte-val">${suspects.length}</div><div class="admin-carte-lbl">🚩 Comptes à surveiller</div></div>
      </div>
      ${suspects.length ? `
        <h5 class="admin-section-titre" style="color:#e88">🚩 Comptes à surveiller</h5>
        <p class="admin-acc-sous">Comptes avec au moins ${MIN} notes dont ≥80&nbsp;% sont des 1★ ou des 5★ (nuisance ou dopage possible). Déplie pour voir le détail.</p>
        ${suspects.map(u => blocUser(u, true)).join("")}
      ` : `<p class="avis-empty" style="margin:4px 0 14px">✅ Aucun comportement suspect détecté (personne ne met que des 1★ ou que des 5★).</p>`}
      <h5 class="admin-section-titre">👤 Tous les noteurs (${users.length})</h5>
      <p class="admin-acc-sous">Trié par nombre de notes. Déplie un noteur pour voir quelle note il a mise sur quelle recette.</p>
      ${tous.map(u => blocUser(u, false)).join("")}
    `;
  } catch (e) {
    console.error("❌ Erreur notes admin:", e);
    zone.innerHTML = `<p class="avis-empty">⚠️ Erreur de chargement des notes : ${escapeHTML(e?.message || "inconnue")}</p>`;
  }
}

