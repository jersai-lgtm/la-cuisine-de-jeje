// =============================================================================
// 📦 MODULE : NOTE COMMUNAUTAIRE EN ÉTOILES PAR RECETTE (note_recettes.js, v259.42)
// =============================================================================
// Chaque utilisateur note une recette de 1 à 5 ⭐. TOUT LE MONDE voit la
// MOYENNE et le nombre d'avis → on sait quelles recettes ont du succès.
//
// Stockage :
//  - Ma note perso (ma sélection) : userProfile.notesEtoilesRecettes = { key: 1..5 }
//  - Notes partagées : collection Firebase "notesEtoiles"
//      doc id = "{uid}__{recetteKey}" ; champs { uid, recette, etoiles, prenom, dateMaj }
//  - Agrégat affiché = moyenne (sum/count) + nb d'avis, calculé côté client.
//
// ⚠️ Nécessite une règle Firestore pour la collection "notesEtoiles"
//    (lecture publique, écriture/suppression de SON propre document).
// =============================================================================

window._notesEtoilesCache = {}; // recetteKey -> { sum, count }

// Ma note perso pour une recette (0 = non notée)
window.getMaNoteEtoiles = function(key) {
  const n = (window.userProfile?.notesEtoilesRecettes || {})[key];
  return (typeof n === "number" && n >= 1 && n <= 5) ? n : 0;
};

// Note moyenne de la communauté pour une recette (null si aucune)
window.getNoteCommunaute = function(key) {
  const c = window._notesEtoilesCache[key];
  if (!c || !c.count) return null;
  return { moyenne: c.sum / c.count, nb: c.count };
};

// Re-render les menus actuellement affichés pour mettre à jour leurs notes ★ (elles sont figées dans le HTML)
window.rafraichirNotesMenus = function() {
  try { if (typeof chargerAccueilMenus === "function") chargerAccueilMenus(); } catch (e) {}
  // Planificateur (semaine) si affiché
  try {
    const pr = document.getElementById("plan-result");
    if (pr && pr.style.display !== "none" && window._derniersMenus && typeof afficherMenusSemaine === "function") {
      const pers = window._derniersMenus.personnes || parseInt(document.getElementById("plan-personnes")?.value) || 4;
      afficherMenusSemaine(window._derniersMenus, pers);
    }
  } catch (e) {}
  // Menu festif / thématique si affiché
  try {
    const fr = document.getElementById("festif-result");
    if (fr && fr.style.display !== "none" && typeof afficherMenuFestif === "function") {
      let data = null;
      try { data = JSON.parse(sessionStorage.getItem("cuisineJeje_festif") || "null"); } catch (e2) {}
      if ((!data || !data.menu) && window._dernierMenuGenere && Array.isArray(window._dernierMenuGenere.menu)) {
        data = { menu: window._dernierMenuGenere, personnes: window._dernierMenuGenere.personnes || 4 };
      }
      if (data && data.menu) afficherMenuFestif(data.menu, data.personnes || 4);
    }
  } catch (e) {}
};

// Écoute TEMPS RÉEL des notes partagées : toute note (mienne ou d'un autre compte)
// reconstruit l'agrégat puis rafraîchit cartes + mini-cartes + menus, sans recharger la page.
window.chargerNotesCommunaute = function() {
  if (typeof _db === "undefined" || !_db) return;
  if (window._notesEtoilesUnsub) return; // un seul écouteur
  const traiter = (snap) => {
    const cache = {};
    snap.forEach(doc => {
      const d = doc.data();
      if (!d || !d.recette || !(d.etoiles >= 1 && d.etoiles <= 5)) return;
      if (!cache[d.recette]) cache[d.recette] = { sum: 0, count: 0 };
      cache[d.recette].sum += d.etoiles;
      cache[d.recette].count += 1;
    });
    window._notesEtoilesCache = cache;
    if (typeof appliquerBadgeEtoilesCartes === "function") appliquerBadgeEtoilesCartes();
    if (typeof rafraichirNotesMenus === "function") rafraichirNotesMenus();
  };
  try {
    window._notesEtoilesUnsub = _db.collection("notesEtoiles").onSnapshot(
      traiter,
      (err) => console.warn("Écoute des notes communauté échouée:", err)
    );
  } catch (e) {
    console.warn("Chargement des notes communauté échoué:", e);
  }
};

// Enregistre (ou retire si n<=0) MA note pour une recette
window.setNoteEtoiles = async function(key, n) {
  if (!window.currentUser) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); return; }
  if (!window.userProfile) return;
  if (!window.userProfile.notesEtoilesRecettes) window.userProfile.notesEtoilesRecettes = {};

  n = parseInt(n) || 0;
  const ancienne = window.getMaNoteEtoiles(key); // ma note précédente (pour le delta)

  // 1) MAJ locale de MA note
  if (n <= 0) delete window.userProfile.notesEtoilesRecettes[key];
  else window.userProfile.notesEtoilesRecettes[key] = Math.min(5, Math.max(1, n));

  // 2) MAJ locale de l'agrégat (delta : on retire mon ancienne note, on ajoute la nouvelle)
  const c = window._notesEtoilesCache[key] || { sum: 0, count: 0 };
  if (ancienne > 0) { c.sum -= ancienne; c.count -= 1; }
  if (n > 0) { c.sum += n; c.count += 1; }
  if (c.count <= 0) delete window._notesEtoilesCache[key];
  else window._notesEtoilesCache[key] = c;

  // 3) Rafraîchir l'affichage immédiatement
  if (typeof injecterEtoilesRecette === "function") injecterEtoilesRecette(key);
  if (typeof appliquerBadgeEtoilesCartes === "function") appliquerBadgeEtoilesCartes();
  if (typeof rafraichirNotesMenus === "function") rafraichirNotesMenus();

  // 4) Sauvegardes Firebase
  const docId = window.currentUser.uid + "__" + key;
  try {
    // a) ma note perso dans mon profil
    _db.collection("utilisateurs").doc(window.currentUser.uid).update({
      notesEtoilesRecettes: window.userProfile.notesEtoilesRecettes
    }).catch(() => {});
    // b) note partagée (collection communautaire)
    if (n > 0) {
      await _db.collection("notesEtoiles").doc(docId).set({
        uid: window.currentUser.uid,
        recette: key,
        etoiles: n,
        prenom: window.userProfile?.prenom || "Anonyme",
        dateMaj: new Date().toISOString()
      });
    } else {
      await _db.collection("notesEtoiles").doc(docId).delete();
    }
    if (typeof afficherToast === "function") afficherToast(n > 0 ? ("⭐ Noté " + n + "/5 — merci !") : "🗑️ Note retirée");
  } catch (e) {
    console.warn("Sauvegarde note communauté échouée:", e);
    if (typeof afficherToast === "function") afficherToast("⚠️ Note non enregistrée — réessaie");
  }
  window.dispatchEvent(new Event("profilMisAJour"));
};

// Injecte dans la fiche : moyenne communauté + sélecteur "Ma note"
window.injecterEtoilesRecette = function(key) {
  const resultat = document.getElementById("modal-resultat");
  if (!resultat) return;
  const ancien = document.getElementById("etoiles-section");
  if (ancien) ancien.remove();

  const ma = window.getMaNoteEtoiles(key);
  const com = window.getNoteCommunaute(key);
  const labels = ["Pas encore notée", "😞 Bof", "🙂 Pas mal", "👍 Bien", "❤️ Très bonne", "🌟 Excellente !"];

  const etoiles = [1, 2, 3, 4, 5].map(i =>
    `<span class="fiche-etoile ${i <= ma ? 'active' : ''}" onclick="setNoteEtoiles('${key}', ${i})" title="${i}/5">${i <= ma ? '★' : '☆'}</span>`
  ).join("");

  let comHTML;
  if (com) {
    const arr = Math.round(com.moyenne);
    const etCom = "★".repeat(arr) + "☆".repeat(5 - arr);
    comHTML = `<div class="etoiles-com">
      <span class="etoiles-com-stars">${etCom}</span>
      <strong class="etoiles-com-moy">${com.moyenne.toFixed(1).replace(".", ",")}/5</strong>
      <span class="etoiles-com-nb">${com.nb} avis</span>
    </div>`;
  } else {
    comHTML = `<div class="etoiles-com etoiles-com-vide">Pas encore de note — sois le premier à noter cette recette !</div>`;
  }

  const section = document.createElement("div");
  section.id = "etoiles-section";
  section.className = "etoiles-section";
  section.innerHTML = `
    <div class="etoiles-com-titre">⭐ Note de la communauté</div>
    ${comHTML}
    <div class="etoiles-ma-ligne">
      <span class="etoiles-titre">Ma note&nbsp;:</span>
      <div class="fiche-etoiles">${etoiles}</div>
      <span class="etoiles-valeur">${labels[ma]}</span>
      ${ma > 0 ? `<button class="etoiles-clear" onclick="setNoteEtoiles('${key}', 0)" title="Retirer ma note">✕</button>` : ''}
    </div>
  `;

  const notesSec = document.getElementById("notes-section");
  if (notesSec) resultat.insertBefore(section, notesSec);
  else resultat.appendChild(section);
};

// Retourne un petit HTML de badge note (pour mini-cartes accueil + lignes de menus)
window.noteCommunauteBadgeHTML = function(key, variante) {
  const com = (typeof getNoteCommunaute === "function") ? getNoteCommunaute(key) : null;
  if (!com) return "";
  const val = com.moyenne.toFixed(1).replace(".", ",");
  const title = "Note moyenne : " + com.moyenne.toFixed(1) + "/5 (" + com.nb + " avis)";
  if (variante === "mini") return `<span class="mini-carte-note mini-note-sur-image" title="${title}">★ ${val}</span>`;
  return `<span class="note-inline" title="${title}">★ ${val}</span>`;
};

// Badge ★moyenne sur les cartes catalogue (.carte) ET les mini-cartes accueil (.mini-carte)
window.appliquerBadgeEtoilesCartes = function() {
  let nb = 0;
  document.querySelectorAll(".carte").forEach(carte => {
    const ancien = carte.querySelector(".carte-etoiles-badge");
    if (ancien) ancien.remove();
    const cle = (typeof extraireCleRecetteCarte === "function") ? extraireCleRecetteCarte(carte) : null;
    if (!cle) return;
    const com = window.getNoteCommunaute(cle);
    if (!com) return;
    const img = carte.querySelector("img");
    const aImage = !!(img && img.getAttribute("src") && img.style.display !== "none");
    const badge = document.createElement("div");
    badge.className = "carte-etoiles-badge " + (aImage ? "etoiles-sur-image" : "etoiles-sur-info");
    badge.textContent = "★ " + com.moyenne.toFixed(1).replace(".", ",");
    badge.title = "Note moyenne : " + com.moyenne.toFixed(1) + "/5 (" + com.nb + " avis)";
    (carte.querySelector(".carte-info") || carte).appendChild(badge);
    nb++;
  });
  // Mini-cartes de l'accueil (suggestions, récents, dernières ajoutées, favoris, fétiches)
  document.querySelectorAll(".mini-carte").forEach(mc => {
    const ancien = mc.querySelector(".mini-carte-note");
    if (ancien) ancien.remove();
    const cle = (typeof extraireCleRecetteCarte === "function") ? extraireCleRecetteCarte(mc) : null;
    if (!cle) return;
    const com = window.getNoteCommunaute(cle);
    if (!com) return;
    const img = mc.querySelector("img");
    const aImage = !!(img && img.getAttribute("src") && img.style.display !== "none");
    const b = document.createElement("span");
    b.className = "mini-carte-note " + (aImage ? "mini-note-sur-image" : "mini-note-sur-info");
    b.textContent = "★ " + com.moyenne.toFixed(1).replace(".", ",");
    b.title = "Note moyenne : " + com.moyenne.toFixed(1) + "/5 (" + com.nb + " avis)";
    (mc.querySelector(".mini-carte-info") || mc).appendChild(b);
  });
  if (nb > 0) console.log("⭐ Badge note communauté appliqué sur " + nb + " cartes");
};

// Tri du catalogue par note moyenne (toggle)
window._triNoteActif = false;
window.toggleTriNote = function(btn) {
  const grid = document.getElementById("section-cartes");
  if (!grid) return;
  const cartes = [...grid.querySelectorAll(".carte")];
  if (cartes.length === 0) return;
  cartes.forEach((c, i) => { if (c.dataset.ordre === undefined) c.dataset.ordre = String(i); });

  window._triNoteActif = !window._triNoteActif;
  if (btn) btn.classList.toggle("active", window._triNoteActif);

  const moyDe = c => {
    const cle = (typeof extraireCleRecetteCarte === "function") ? extraireCleRecetteCarte(c) : null;
    const com = cle ? window.getNoteCommunaute(cle) : null;
    return com ? com.moyenne : -1; // non notées en dernier
  };

  let tri;
  if (window._triNoteActif) {
    tri = cartes.sort((a, b) => {
      const d = moyDe(b) - moyDe(a);
      return d !== 0 ? d : (+a.dataset.ordre) - (+b.dataset.ordre);
    });
    if (typeof afficherToast === "function") afficherToast("⭐ Trié par note");
  } else {
    tri = cartes.sort((a, b) => (+a.dataset.ordre) - (+b.dataset.ordre));
  }
  tri.forEach(c => grid.appendChild(c));
};

// Applique le tri par note SANS changer l'état (utile après un changement de vue Favoris)
window.appliquerTriNoteSiActif = function () {
  if (!window._triNoteActif) return;
  const grid = document.getElementById("section-cartes");
  if (!grid) return;
  const cartes = [...grid.querySelectorAll(".carte")];
  if (cartes.length === 0) return;
  cartes.forEach((c, i) => { if (c.dataset.ordre === undefined) c.dataset.ordre = String(i); });
  const moyDe = c => {
    const cle = (typeof extraireCleRecetteCarte === "function") ? extraireCleRecetteCarte(c) : null;
    const com = cle ? window.getNoteCommunaute(cle) : null;
    return com ? com.moyenne : -1;
  };
  cartes.sort((a, b) => {
    const d = moyDe(b) - moyDe(a);
    return d !== 0 ? d : (+a.dataset.ordre) - (+b.dataset.ordre);
  }).forEach(c => grid.appendChild(c));
};

// Réinitialise le tri "Mieux notées" : état OFF, boutons éteints, ordre d'origine restauré
window.reinitTriNote = function () {
  window._triNoteActif = false;
  document.getElementById("chip-tri-note")?.classList.remove("active");
  document.getElementById("chip-fav-tri-note")?.classList.remove("active");
  const grid = document.getElementById("section-cartes");
  if (!grid) return;
  const cartes = [...grid.querySelectorAll(".carte")].filter(c => c.dataset.ordre !== undefined);
  cartes.sort((a, b) => (+a.dataset.ordre) - (+b.dataset.ordre)).forEach(c => grid.appendChild(c));
};
