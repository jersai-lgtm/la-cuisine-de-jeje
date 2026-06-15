// ==============================
// FIREBASE AUTH - La Cuisine de Jéjé
// SDK compat (non-module)
// ==============================

const firebaseConfig = {
  apiKey: "AIzaSyBB8TPxDGdP-D2WGDOs6yIyVV0dFY0M9oM",
  authDomain: "cuisine-jeje.firebaseapp.com",
  projectId: "cuisine-jeje",
  storageBucket: "cuisine-jeje.firebasestorage.app",
  messagingSenderId: "23537454599",
  appId: "1:23537454599:web:1a4c9101a6bc47b93a64a2"
};

// Init Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const _auth = firebase.auth();
const _db   = firebase.firestore();

// ==============================
// ÉCOUTE AUTH
// ==============================
_auth.onAuthStateChanged(async function(user) {
  window.currentUser = user;
  if (user) {
    await chargerProfil(user);
    afficherUtilisateurConnecte(user);
    demarrerPresence();
    // Purger le cache menus/suggestions pour appliquer le profil
    try {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith("cuisineJeje_menus") || k.startsWith("suggestions_")) {
          localStorage.removeItem(k);
        }
      });
      sessionStorage.removeItem("cuisineJeje_menus");
    } catch(e) {}
    // Charger l'accueil et appliquer les préférences
    setTimeout(() => {
      if (typeof chargerAccueil === 'function') chargerAccueil();
      if (typeof appliquerPreferencesVisuelles === 'function') appliquerPreferencesVisuelles();
    }, 500);
    if (!window.userProfile || !window.userProfile.foyer) {
      afficherOnboarding();
    }
  } else {
    window.userProfile = null;
    arreterPresence();
    afficherBoutonConnexion();
  }
});

// ==============================
// PRÉSENCE EN LIGNE (heartbeat)
// Écrit "lastSeen" dans le profil toutes les 60 s tant que l'onglet est visible.
// L'admin liste ceux dont lastSeen date de moins de 3 min comme "en ligne".
// ==============================
let _presenceTimer = null;
async function pingPresence() {
  if (!window.currentUser) return;
  if (document.visibilityState && document.visibilityState !== "visible") return;
  try {
    await _db.collection("utilisateurs").doc(window.currentUser.uid)
      .update({ lastSeen: new Date().toISOString() });
  } catch (e) {}
}
function _onVisiblePing() { if (document.visibilityState === "visible") pingPresence(); }
function demarrerPresence() {
  arreterPresence();
  pingPresence();
  _presenceTimer = setInterval(pingPresence, 60000);
  document.addEventListener("visibilitychange", _onVisiblePing);
}
function arreterPresence() {
  if (_presenceTimer) { clearInterval(_presenceTimer); _presenceTimer = null; }
  document.removeEventListener("visibilitychange", _onVisiblePing);
}

// ==============================
// CONNEXION / INSCRIPTION
// ==============================
window.connexionGoogle = async function() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await _auth.signInWithPopup(provider);
    fermerModalAuth();
  } catch(e) { afficherErreurAuth(e.message); }
};

window.inscrireEmail = async function() {
  const prenom = document.getElementById("auth-prenom")?.value.trim();
  const email  = document.getElementById("auth-email")?.value.trim();
  const mdp    = document.getElementById("auth-mdp")?.value;
  if (!prenom || !email || !mdp) { afficherErreurAuth("Remplis tous les champs."); return; }
  if (mdp.length < 6) { afficherErreurAuth("Mot de passe : 6 caractères minimum."); return; }
  try {
    const cred = await _auth.createUserWithEmailAndPassword(email, mdp);
    await cred.user.updateProfile({ displayName: prenom });
    fermerModalAuth();
  } catch(e) {
    const m = { "auth/email-already-in-use":"Email déjà utilisé.", "auth/invalid-email":"Email invalide.", "auth/weak-password":"Mot de passe trop faible." };
    afficherErreurAuth(m[e.code] || e.message);
  }
};

window.connecterEmail = async function() {
  const email = document.getElementById("auth-email-login")?.value.trim();
  const mdp   = document.getElementById("auth-mdp-login")?.value;
  if (!email || !mdp) { afficherErreurAuth("Remplis tous les champs."); return; }
  try {
    await _auth.signInWithEmailAndPassword(email, mdp);
    fermerModalAuth();
  } catch(e) {
    const m = { "auth/user-not-found":"Compte introuvable.", "auth/wrong-password":"Mot de passe incorrect.", "auth/invalid-credential":"Email ou mot de passe incorrect." };
    afficherErreurAuth(m[e.code] || e.message);
  }
};

window.deconnexion = async function() {
  await _auth.signOut();
  window.userProfile = null;
  fermerModalProfil();
  afficherBoutonConnexion();
};

// ==============================
// FIRESTORE - PROFIL
// ==============================
async function chargerProfil(user) {
  // 🗑️ Suppression en cours sur cette page : ne PAS (re)créer le profil.
  if (window._suppressionCompteEnCours) return;
  // Reprise après un reload : ce compte vient d'être supprimé → déconnexion, pas de recréation.
  try {
    if (sessionStorage.getItem("_uidSupprime") === user.uid) {
      sessionStorage.removeItem("_uidSupprime");
      await _auth.signOut();
      return;
    }
  } catch (e) {}
  const ref  = _db.collection("utilisateurs").doc(user.uid);
  const snap = await ref.get();
  if (snap.exists) {
    window.userProfile = snap.data();
    // v241 : Restaurer les recettes vues depuis Firebase
    window._recentsVus = window.userProfile.recettesVues || [];
    // v249 : Init liste de courses si pas définie
    if (!window.userProfile.listeCourses) window.userProfile.listeCourses = [];
    if (!window.userProfile.listeCoursesCoches) window.userProfile.listeCoursesCoches = [];
  window.dispatchEvent(new Event('profilMisAJour'));
  } else {
    const profil = {
      uid: user.uid, prenom: user.displayName || "",
      email: user.email || "", photoURL: user.photoURL || "",
      dateCreation: new Date().toISOString(),
      foyer: null,
      preferences: { regimes:[], allergies:[], allergiesCustom:[], objectifs:[], cuisinesFavorites:[], niveauCuisine:"débutant" },
      favoris: [], historiqueMenus: [], menusFavoris: [],
      recettesVues: [], totalRecettesVues: 0, totalMenusGeneres: 0, recettesCuisinees: [],
      listeCourses: [], listeCoursesCoches: [], notesEtoilesRecettes: {}, recettesPerso: {}
    };
    await ref.set(profil);
    window.userProfile = profil;
    window._recentsVus = [];
  window.dispatchEvent(new Event('profilMisAJour'));
  }
}

window.sauvegarderProfil = async function(data) {
  if (!window.currentUser) return;
  await _db.collection("utilisateurs").doc(window.currentUser.uid).update(data);
  window.userProfile = Object.assign({}, window.userProfile, data);
  window.dispatchEvent(new Event('profilMisAJour'));
};

window.toggleFavori = async function(key) {
  if (!window.currentUser) { ouvrirModalAuth(); return; }
  const favs   = window.userProfile?.favoris || [];
  const isFav  = favs.includes(key);
  const newFavs = isFav ? favs.filter(f => f !== key) : [...favs, key];
  await _db.collection("utilisateurs").doc(window.currentUser.uid).update({ favoris: newFavs });
  window.userProfile.favoris = newFavs;
  // Mettre à jour les boutons cœur visibles
  ["btn-favori-" + key, "btn-favori-modal"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = newFavs.includes(key) ? "❤️" : "🤍";
  });
  // Rafraîchir l'UI (accueil + onglets favoris si ouverts)
  window.dispatchEvent(new Event("profilMisAJour"));
};

window.estFavori = function(key) {
  return (window.userProfile?.favoris || []).includes(key);
};

// ==============================
// RECETTES CUISINÉES (v240) — tracking manuel
// ==============================
// Format : window.userProfile.recettesCuisinees = [{ cle, count, dernierDate }]

window.estCuisinee = function(key) {
  const arr = window.userProfile?.recettesCuisinees || [];
  return arr.some(r => r.cle === key);
};

window.getCompteurCuisine = function(key) {
  const arr = window.userProfile?.recettesCuisinees || [];
  const found = arr.find(r => r.cle === key);
  return found ? (found.count || 0) : 0;
};

window.toggleCuisine = async function(key) {
  if (!window.currentUser) { ouvrirModalAuth(); return; }
  let arr = window.userProfile?.recettesCuisinees || [];
  const existing = arr.find(r => r.cle === key);
  const now = new Date().toISOString();
  
  if (existing) {
    // Déjà cuisinée → incrémenter
    existing.count = (existing.count || 1) + 1;
    existing.dernierDate = now;
  } else {
    // Première fois
    arr = [...arr, { cle: key, count: 1, dernierDate: now }];
  }
  
  await _db.collection("utilisateurs").doc(window.currentUser.uid).update({ recettesCuisinees: arr });
  window.userProfile.recettesCuisinees = arr;
  
  // Mettre à jour le bouton visuel
  majBoutonCuisine(key);
  
  // Toast feedback
  if (typeof afficherToast === "function") {
    const newCount = arr.find(r => r.cle === key)?.count || 1;
    afficherToast(`👨‍🍳 Cuisinée ${newCount} fois !`);
  }
  
  window.dispatchEvent(new Event("profilMisAJour"));
};

// Retire une "cuisson" (en cas de clic accidentel)
window.retirerCuisine = async function(key) {
  if (!window.currentUser) return;
  let arr = window.userProfile?.recettesCuisinees || [];
  const existing = arr.find(r => r.cle === key);
  if (!existing) return;
  if (existing.count > 1) {
    existing.count--;
  } else {
    arr = arr.filter(r => r.cle !== key);
  }
  await _db.collection("utilisateurs").doc(window.currentUser.uid).update({ recettesCuisinees: arr });
  window.userProfile.recettesCuisinees = arr;
  majBoutonCuisine(key);
  window.dispatchEvent(new Event("profilMisAJour"));
};

// ==============================
// NOTES PERSONNELLES (v245) — par recette
// ==============================
// Format Firebase : userProfile.notesRecettes = { "cle_recette": "ma note", ... }

window.getNoteRecette = function(key) {
  const notes = window.userProfile?.notesRecettes || {};
  return notes[key] || "";
};

window.enregistrerNoteRecette = async function(key, note) {
  if (!window.currentUser) { ouvrirModalAuth(); return; }
  if (!window.userProfile) return;
  
  // Init si nécessaire
  if (!window.userProfile.notesRecettes) window.userProfile.notesRecettes = {};
  
  const noteTrim = (note || "").trim();
  if (noteTrim === "") {
    // Note vide → supprimer l'entrée
    delete window.userProfile.notesRecettes[key];
  } else {
    window.userProfile.notesRecettes[key] = noteTrim;
  }
  
  // Sauvegarde Firebase (silencieuse)
  try {
    await _db.collection("utilisateurs").doc(window.currentUser.uid).update({
      notesRecettes: window.userProfile.notesRecettes
    });
    if (typeof afficherToast === "function") afficherToast(noteTrim ? "📝 Note enregistrée" : "🗑️ Note supprimée");
  } catch (e) {
    console.warn("Erreur sauvegarde note:", e);
  }
  
  window.dispatchEvent(new Event("profilMisAJour"));
};

// Injecte la section "Mes notes" dans la fiche recette ouverte
window.injecterNotesRecette = function(key) {
  // Trouver la zone de la fiche
  const resultat = document.getElementById("modal-resultat");
  if (!resultat) return;
  
  // Supprimer une éventuelle section précédente
  const ancien = document.getElementById("notes-section");
  if (ancien) ancien.remove();
  
  const noteActuelle = window.getNoteRecette(key);
  const aUneNote = noteActuelle.length > 0;
  
  // Construire la section
  const section = document.createElement("div");
  section.id = "notes-section";
  section.className = "notes-section";
  section.innerHTML = `
    <div class="notes-header" onclick="toggleNotesSection()">
      <span class="notes-icon">📝</span>
      <span class="notes-titre">Mes notes personnelles</span>
      ${aUneNote ? '<span class="notes-badge">●</span>' : ''}
      <span class="notes-chevron" id="notes-chevron">▼</span>
    </div>
    <div class="notes-body" id="notes-body" style="display:${aUneNote ? 'block' : 'none'}">
      <textarea 
        id="notes-textarea" 
        class="notes-textarea"
        placeholder="Ex : « Ajouter +1 c.à.c de paprika », « Recette préférée de Mamie », « Pas assez salé la dernière fois »..."
        maxlength="500"
        oninput="onNoteInput()">${noteActuelle.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</textarea>
      <div class="notes-footer">
        <span class="notes-compteur" id="notes-compteur">${noteActuelle.length}/500</span>
        <button class="notes-btn-save" id="notes-btn-save" onclick="sauverNoteActuelle('${key}')" disabled>💾 Enregistrer</button>
      </div>
    </div>
  `;
  resultat.appendChild(section);
};

window.toggleNotesSection = function() {
  const body = document.getElementById("notes-body");
  const chevron = document.getElementById("notes-chevron");
  if (!body) return;
  const ouvert = body.style.display !== "none";
  body.style.display = ouvert ? "none" : "block";
  if (chevron) chevron.textContent = ouvert ? "▼" : "▲";
};

window.onNoteInput = function() {
  const ta = document.getElementById("notes-textarea");
  const compteur = document.getElementById("notes-compteur");
  const btnSave = document.getElementById("notes-btn-save");
  if (!ta || !compteur || !btnSave) return;
  compteur.textContent = ta.value.length + "/500";
  btnSave.disabled = false; // activer le bouton dès qu'on tape
};

window.sauverNoteActuelle = async function(key) {
  const ta = document.getElementById("notes-textarea");
  if (!ta) return;
  const btn = document.getElementById("notes-btn-save");
  if (btn) { btn.disabled = true; btn.textContent = "💾 ..."; }
  
  await window.enregistrerNoteRecette(key, ta.value);
  
  if (btn) {
    btn.textContent = "✅ Enregistré !";
    setTimeout(() => {
      if (btn) btn.textContent = "💾 Enregistrer";
    }, 1500);
  }
};
// _recentsVus : liste des 100 dernières recettes uniques (pour "Récents", suggestions)
// totalRecettesVues : compteur cumulatif (cap à 9999, ne descend jamais → garde les badges débloqués)

window.ajouterRecent = function(key) {
  if (!key) return;
  
  // 1. Liste des récentes (sans doublon, plus récente en premier, max 100)
  let vus = window._recentsVus || [];
  vus = vus.filter(k => k !== key);
  vus.unshift(key);
  if (vus.length > 100) vus = vus.slice(0, 100);
  window._recentsVus = vus;
  
  // Si pas connecté, on garde juste en mémoire pour la session
  if (!window.currentUser || !window.userProfile) return;
  
  // 2. Compteur cumulatif (cap à 9999 pour éviter l'overflow visuel)
  // Ne se reset jamais — préserve les badges débloqués
  const total = Math.min((window.userProfile.totalRecettesVues || 0) + 1, 9999);
  window.userProfile.totalRecettesVues = total;
  window.userProfile.recettesVues = vus;
  
  // 3. Sauvegarder en arrière-plan (sans bloquer l'UX)
  _db.collection("utilisateurs").doc(window.currentUser.uid).set({
    recettesVues: vus,
    totalRecettesVues: total
  }, { merge: true }).catch(e => console.warn("Sauvegarde recettes vues échouée :", e));
};

// totalMenusGeneres : compteur cumulatif de menus générés (cap à 9999, ne descend jamais
// → l'historique affiché est plafonné/dédoublonné, mais ce compteur garde le vrai total).
window.incrementerMenusGeneres = function() {
  if (!window.currentUser || !window.userProfile) return;
  const total = Math.min((window.userProfile.totalMenusGeneres || 0) + 1, 9999);
  window.userProfile.totalMenusGeneres = total;
  _db.collection("utilisateurs").doc(window.currentUser.uid).set({
    totalMenusGeneres: total
  }, { merge: true }).catch(e => console.warn("Sauvegarde menus générés échouée :", e));
};

// Met à jour visuellement le bouton "J'ai cuisiné"
window.majBoutonCuisine = function(key) {
  const btn = document.getElementById("btn-cuisine-modal");
  if (!btn) return;
  const count = window.getCompteurCuisine(key);
  if (count > 0) {
    btn.innerHTML = `👨‍🍳 <span class="cuisine-badge">${count}</span>`;
    btn.classList.add("cuisine-active");
    btn.title = `Cuisinée ${count} fois — clic pour ajouter, clic droit pour retirer`;
  } else {
    btn.textContent = "👨‍🍳";
    btn.classList.remove("cuisine-active");
    btn.title = "Marquer comme cuisinée";
  }
  // Listener double : clic = ajouter, clic droit = retirer
  btn.onclick = () => window.toggleCuisine(key);
  btn.oncontextmenu = (e) => { e.preventDefault(); window.retirerCuisine(key); return false; };
};

// ==============================
// MENUS FAVORIS (semaine + thématique)
// ==============================

// Génère un ID unique pour un menu favori
function _genIdMenu() {
  return "m_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
}

// Génère le nom auto "Menu du JJ mois — Premier plat"
window.genererNomMenuFavori = function(menu, type) {
  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
  let premier = "";
  if (type === "thematique") {
    // Menu thématique : 1er plat de la liste
    const items = menu?.menu || [];
    const platItem = items.find(p => /plat/i.test(p.categorie || "")) || items[0];
    premier = platItem?.recette || "";
  } else {
    // Menu semaine : 1er plat du 1er jour
    const jour1 = menu?.semaine?.[0];
    if (jour1) {
      premier = jour1.midi?.recette || jour1.midi?.plat?.recette || (typeof jour1.midi === "string" ? jour1.midi : "") || "";
    }
  }
  const nom = (typeof getNomRecette === "function" && premier) ? getNomRecette(premier) : premier;
  return nom ? `Menu du ${date} — ${nom}` : `Menu du ${date}`;
};

// Sauvegarder le menu courant comme favori
window.sauvegarderMenuFavori = async function(menu, type, personnes) {
  if (!window.currentUser) { ouvrirModalAuth(); return null; }
  if (!menu) return null;
  const liste = window.userProfile?.menusFavoris || [];
  const nouveau = {
    id: _genIdMenu(),
    type: type, // "semaine" ou "thematique"
    nom: window.genererNomMenuFavori(menu, type),
    date: new Date().toISOString(),
    personnes: personnes || 4,
    menu: JSON.parse(JSON.stringify(menu)) // copie profonde : isolée du menu courant
  };
  const nouvelle = [nouveau, ...liste].slice(0, 30); // max 30 menus favoris
  await _db.collection("utilisateurs").doc(window.currentUser.uid).update({ menusFavoris: nouvelle });
  window.userProfile.menusFavoris = nouvelle;
  window.dispatchEvent(new Event("profilMisAJour"));
  return nouveau.id;
};

// Supprimer un menu favori par son ID
window.supprimerMenuFavori = async function(id) {
  if (!window.currentUser) return;
  const liste = (window.userProfile?.menusFavoris || []).filter(m => m.id !== id);
  await _db.collection("utilisateurs").doc(window.currentUser.uid).update({ menusFavoris: liste });
  window.userProfile.menusFavoris = liste;
  window.dispatchEvent(new Event("profilMisAJour"));
};

// Renommer un menu favori (pour future personnalisation)
window.renommerMenuFavori = async function(id, nouveauNom) {
  if (!window.currentUser) return;
  const liste = (window.userProfile?.menusFavoris || []).map(m =>
    m.id === id ? { ...m, nom: nouveauNom } : m
  );
  await _db.collection("utilisateurs").doc(window.currentUser.uid).update({ menusFavoris: liste });
  window.userProfile.menusFavoris = liste;
  window.dispatchEvent(new Event("profilMisAJour"));
};

window.getMenusFavoris = function() {
  return window.userProfile?.menusFavoris || [];
};

window.estMenuFavori = function(menu, type) {
  // Compare la structure du menu pour détecter si déjà sauvegardé
  if (!menu) return false;
  const liste = window.userProfile?.menusFavoris || [];
  return liste.some(m => m.type === type && JSON.stringify(m.menu) === JSON.stringify(menu));
};

window.sauvegarderHistoriqueMenu = async function(menu, type) {
  if (!window.currentUser) return;
  const hist = [...(window.userProfile?.historiqueMenus || []), { date: new Date().toISOString(), type, menu }].slice(-20);
  await _db.collection("utilisateurs").doc(window.currentUser.uid).update({ historiqueMenus: hist });
  window.userProfile.historiqueMenus = hist;
};

window.getPersonnesFoyer = function() {
  const f = window.userProfile?.foyer;
  return f ? (f.adultes||0) + (f.ados||0) + (f.enfants||0) : 4;
};

// ==============================
// SAUVEGARDER PROFIL COMPLET
// ==============================
window.sauvegarderProfilComplet = async function() {
  // Détecter la modale active
  const isOnboarding = document.getElementById("modal-onboarding")?.classList.contains("visible");
  const pfx   = isOnboarding ? "p" : "pp";
  const scope = document.getElementById(isOnboarding ? "modal-onboarding" : "modal-profil");

  const g = (id) => document.getElementById(pfx + "-" + id)?.value;
  const foyer = {
    adultes: parseInt(g("adultes")) || 1,
    ados:    parseInt(g("ados"))    || 0,
    enfants: parseInt(g("enfants")) || 0,
    bebes:   parseInt(g("bebe"))    || 0,
  };

  const qsa = (sel) => scope ? [...scope.querySelectorAll(sel)].map(c => c.value) : [];

  // Filet de sécurité : récupérer une allergie tapée dans le champ mais pas
  // encore validée par "+ Ajouter" / Entrée, pour ne jamais l'oublier.
  const inputCustom = document.getElementById(pfx === "pp" ? "pp-allergie-input" : "allergie-custom-input");
  const valEnAttente = inputCustom?.value.trim().toLowerCase();
  if (valEnAttente) {
    if (!window["_ac_" + pfx]) window["_ac_" + pfx] = [];
    if (!window["_ac_" + pfx].includes(valEnAttente)) window["_ac_" + pfx].push(valEnAttente);
    inputCustom.value = "";
  }

  const preferences = {
    regimes:          qsa(".pref-regime:checked"),
    allergies:        qsa(".pref-allergie:checked"),
    allergiesCustom:  window["_ac_" + pfx] || [],
    objectifs:        qsa(".pref-objectif:checked"),
    cuisinesFavorites:qsa(".pref-cuisine:checked"),
    niveauCuisine:    g("niveau") || "débutant",
  };

  await window.sauvegarderProfil({ foyer, preferences });

  // Purger le cache des menus et suggestions (régimes ont changé)
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith("cuisineJeje_menus_") || k.startsWith("suggestions_")) {
        localStorage.removeItem(k);
      }
    });
  } catch(e) {}
  // Rafraîchir les badges sur les cartes
  if (typeof appliquerPreferencesVisuelles === 'function') appliquerPreferencesVisuelles();
  // Rafraîchir l'accueil (dont la section "Recommandé pour vous") avec les nouvelles préférences
  if (typeof chargerAccueil === 'function') chargerAccueil();
  const btn = document.getElementById("btn-sauvegarder-profil");
  if (btn) { btn.textContent = "✅ Sauvegardé !"; setTimeout(() => btn.textContent = "💾 Sauvegarder", 2000); }
};

window.terminerOnboarding = async function() {
  await window.sauvegarderProfilComplet();
  fermerOnboarding();
};

// ==============================
// UI - AVATAR / BOUTON
// ==============================
function afficherBoutonConnexion() {
  const z = document.getElementById("zone-utilisateur");
  if (z) z.innerHTML = `<button class="btn-connexion" onclick="ouvrirModalAuth()">👤 Connexion</button>`;
}

// Sécurité : displayName/email sont contrôlés par l'utilisateur (saisis à l'inscription).
// On échappe avant injection en innerHTML (anti-XSS). Repli local si escapeHTML (app.js) absent.
function _escAuth(s) {
  if (typeof escapeHTML === "function") return escapeHTML(s);
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}

function afficherUtilisateurConnecte(user) {
  const z = document.getElementById("zone-utilisateur");
  if (!z) return;
  const initiale = (user.displayName || user.email || "U")[0].toUpperCase();
  const photo = user.photoURL
    ? `<img src="${_escAuth(user.photoURL)}" class="avatar-photo" referrerpolicy="no-referrer">`
    : `<div class="avatar-initiales">${_escAuth(initiale)}</div>`;
  const prenom = (user.displayName || "Mon compte").split(" ")[0];
  z.innerHTML = `<div class="avatar-btn" onclick="ouvrirModalProfil()">${photo}<span class="avatar-prenom">${_escAuth(prenom)}</span></div>`;
}

function afficherOnboarding() {
  const m = document.getElementById("modal-onboarding");
  if (m) m.classList.add("visible");
}

function afficherErreurAuth(msg) {
  const el = document.getElementById("auth-erreur");
  if (el) { el.textContent = msg; el.style.display = "block"; }
  setTimeout(() => { if (el) el.style.display = "none"; }, 4000);
}

// ==============================
// MODALES AUTH
// ==============================
window.ouvrirModalAuth = function(onglet) {
  const m = document.getElementById("modal-auth");
  if (m) m.classList.add("visible");
  switchAuthTab(onglet || "connexion");
  if (typeof window._backGuardPush === "function") window._backGuardPush();
};
window.fermerModalAuth = function() {
  const m = document.getElementById("modal-auth");
  if (m) m.classList.remove("visible");
};
window.switchAuthTab = function(onglet) {
  const c = document.getElementById("auth-tab-connexion");
  const i = document.getElementById("auth-tab-inscription");
  if (c) c.style.display = onglet === "connexion"   ? "block" : "none";
  if (i) i.style.display = onglet === "inscription" ? "block" : "none";
  document.querySelectorAll(".auth-tab-btn").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById("tab-btn-" + onglet);
  if (btn) btn.classList.add("active");
};

// ==============================
// MODAL PROFIL
// ==============================
window.ouvrirModalProfil = function() {
  const p = window.userProfile;
  if (!p) return;
  const modal = document.getElementById("modal-profil");
  if (!modal) return;
  modal.classList.add("visible");

  // Infos
  const el = (id) => document.getElementById(id);
  if (el("profil-prenom")) el("profil-prenom").textContent = window.currentUser?.displayName || p.email || "";
  if (el("profil-email"))  el("profil-email").textContent  = p.email || "";

  // Foyer
  const f = p.foyer || {};
  ["adultes","ados","enfants"].forEach(k => { const e = el("pp-" + k); if (e) e.value = f[k] || 0; });
  if (el("pp-adultes")) el("pp-adultes").value = f.adultes || 1;
  if (el("pp-bebe"))    el("pp-bebe").value    = f.bebes   || 0;

  // Préférences — uniquement dans modal-profil
  const prefs = p.preferences || {};
  modal.querySelectorAll(".pref-regime").forEach(cb    => cb.checked = (prefs.regimes           || []).includes(cb.value));
  modal.querySelectorAll(".pref-allergie").forEach(cb   => cb.checked = (prefs.allergies          || []).includes(cb.value));
  modal.querySelectorAll(".pref-objectif").forEach(cb   => cb.checked = (prefs.objectifs           || []).includes(cb.value));
  modal.querySelectorAll(".pref-cuisine").forEach(cb    => cb.checked = (prefs.cuisinesFavorites   || []).includes(cb.value));
  if (el("pp-niveau")) el("pp-niveau").value = prefs.niveauCuisine || "débutant";

  // Allergies custom
  window._ac_pp = prefs.allergiesCustom || [];
  renderAC("pp");
  
  // v246 : retour téléphone
  if (typeof window._backGuardPush === "function") window._backGuardPush();
};

window.fermerModalProfil = function() {
  const m = document.getElementById("modal-profil");
  if (m) m.classList.remove("visible");
};
window.fermerOnboarding = function() {
  const m = document.getElementById("modal-onboarding");
  if (m) m.classList.remove("visible");
};

// ==============================
// ALLERGIES CUSTOM
// ==============================
window._ac_p  = []; // onboarding
window._ac_pp = []; // profil

window.ajouterAllergieCustom = function(pfx) {
  pfx = pfx || "p";
  const input = document.getElementById(pfx === "pp" ? "pp-allergie-input" : "allergie-custom-input");
  if (!input) return;
  const val = input.value.trim().toLowerCase();
  if (!val) return;
  if (!window["_ac_" + pfx]) window["_ac_" + pfx] = [];
  if (!window["_ac_" + pfx].includes(val)) window["_ac_" + pfx].push(val);
  input.value = "";
  renderAC(pfx);
};

function renderAC(pfx) {
  const listeId = pfx === "pp" ? "pp-allergies-liste" : "allergies-custom-liste";
  const liste = document.getElementById(listeId);
  if (!liste) return;
  liste.innerHTML = (window["_ac_" + pfx] || []).map(a =>
    `<span class="allergie-tag">${a} <button onclick="retirerAC('${a}','${pfx}')">✕</button></span>`
  ).join("");
}

window.retirerAC = function(val, pfx) {
  if (window["_ac_" + pfx]) window["_ac_" + pfx] = window["_ac_" + pfx].filter(a => a !== val);
  renderAC(pfx);
};

// =============================================================================
// 🗑️ SUPPRESSION DE COMPTE (exigence Google Play) — v259-69
// Supprime TOUTES les données utilisateur (notesEtoiles, recettesProposees,
// recettesCommunaute, avis/{uid}, utilisateurs/{uid}) puis le compte Firebase,
// et FORCE la déconnexion sans recréer le profil.
//
// Garde-fous anti-recréation :
//   • window._suppressionCompteEnCours : bloque chargerProfil pendant l'opération
//     (le rafraîchissement de jeton lors de la ré-auth déclenche sinon une recréation).
//   • sessionStorage "_uidSupprime" : au reload, si le compte supprimé réapparaît
//     (jeton en cache), on force la déconnexion au lieu de recréer le profil.
// =============================================================================

async function _supprimerDocsParUid(collectionName, uid) {
  const snap = await _db.collection(collectionName).where("uid", "==", uid).get();
  if (snap.empty) return 0;
  let batch = _db.batch();
  let n = 0;
  for (const d of snap.docs) {
    batch.delete(d.ref);
    n++;
    if (n % 450 === 0) { await batch.commit(); batch = _db.batch(); }
  }
  if (n % 450 !== 0) await batch.commit();
  return n;
}

// Cœur de la suppression : appelé UNIQUEMENT après une ré-authentification réussie.
async function _executerSuppression(user) {
  window._suppressionCompteEnCours = true;
  const uid = user.uid;
  try { sessionStorage.setItem("_uidSupprime", uid); } catch (e) {}

  try { await _supprimerDocsParUid("notesEtoiles", uid); }        catch (e) { console.warn("notesEtoiles:", e); }
  try { await _supprimerDocsParUid("recettesProposees", uid); }   catch (e) { console.warn("recettesProposees:", e); }
  try { await _supprimerDocsParUid("recettesCommunaute", uid); }  catch (e) { console.warn("recettesCommunaute:", e); }
  try { await _db.collection("avis").doc(uid).delete(); }          catch (e) { /* peut ne pas exister */ }
  try { await _db.collection("utilisateurs").doc(uid).delete(); }  catch (e) { console.warn("utilisateurs:", e); }

  await user.delete();                 // supprime le compte d'authentification
  try { await _auth.signOut(); } catch (e) {}  // s'assure qu'aucune session ne subsiste

  window.userProfile = null;
  window._recentsVus = [];
  try { localStorage.clear(); } catch (e) {}

  alert("✅ Ton compte et toutes tes données ont été supprimés.");
  location.reload();   // recharge dans un état propre, déconnecté
}

function _gererErreurSuppression(e) {
  console.error("Erreur suppression compte:", e);
  if (e && e.code === "auth/requires-recent-login") {
    alert("Pour des raisons de sécurité, reconnecte-toi puis relance la suppression.");
  } else if (e && e.code === "permission-denied") {
    alert("⚠️ Suppression partielle : une règle Firestore manque ('recettesProposees' / 'recettesCommunaute').");
  } else {
    alert("⚠️ Erreur lors de la suppression : " + ((e && e.message) || e));
  }
}

// Ouvre une modale de confirmation intégrée. Le bouton "Supprimer définitivement"
// déclenche la ré-auth (popup Google ou mot de passe) DIRECTEMENT dans son clic.
window.supprimerMonCompte = function() {
  const user = window.currentUser;
  if (!user) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); return; }
  if (document.getElementById("modal-suppression-overlay")) return;

  const providerId =
    (user.providerData && user.providerData[0] && user.providerData[0].providerId) || "";
  const estEmail = providerId !== "google.com";

  const overlay = document.createElement("div");
  overlay.id = "modal-suppression-overlay";
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.7);" +
    "display:flex;align-items:center;justify-content:center;padding:20px;";
  overlay.innerHTML =
    '<div style="background:#1b1b1f;color:#eee;max-width:420px;width:100%;border-radius:16px;padding:22px;box-shadow:0 10px 40px rgba(0,0,0,.5);font-family:system-ui,-apple-system,sans-serif;">' +
      '<h3 style="margin:0 0 10px;color:#ff6b6b;font-size:18px;">⚠️ Supprimer définitivement le compte</h3>' +
      '<p style="font-size:14px;line-height:1.5;color:#ccc;margin:0 0 14px;">' +
        'Toutes tes données seront effacées : profil, foyer, préférences, favoris, menus, historique, notes, ' +
        'recettes perso, ainsi que tes recettes et notes publiées dans la communauté. ' +
        '<strong>Cette action est irréversible.</strong></p>' +
      '<label style="font-size:13px;color:#bbb;display:block;margin-bottom:6px;">Tape <strong>SUPPRIMER</strong> pour confirmer :</label>' +
      '<input id="supp-confirm-input" type="text" autocomplete="off" autocapitalize="characters" ' +
        'style="width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid #444;background:#111;color:#fff;margin-bottom:12px;">' +
      (estEmail
        ? '<label style="font-size:13px;color:#bbb;display:block;margin-bottom:6px;">Confirme ton mot de passe :</label>' +
          '<input id="supp-pwd-input" type="password" autocomplete="current-password" ' +
            'style="width:100%;box-sizing:border-box;padding:10px;border-radius:8px;border:1px solid #444;background:#111;color:#fff;margin-bottom:12px;">'
        : '') +
      '<div id="supp-erreur" style="color:#ff6b6b;font-size:13px;min-height:18px;margin-bottom:8px;"></div>' +
      '<div style="display:flex;gap:10px;justify-content:flex-end;">' +
        '<button id="supp-annuler" type="button" style="background:#333;color:#eee;border:none;border-radius:8px;padding:10px 16px;cursor:pointer;">Annuler</button>' +
        '<button id="supp-confirmer" type="button" style="background:#ff5b5b;color:#fff;border:none;border-radius:8px;padding:10px 16px;cursor:pointer;font-weight:600;">Supprimer définitivement</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  const fermer = () => overlay.remove();
  overlay.querySelector("#supp-annuler").onclick = fermer;
  overlay.onclick = (e) => { if (e.target === overlay) fermer(); };

  const btn = overlay.querySelector("#supp-confirmer");
  btn.onclick = async function() {
    const err = overlay.querySelector("#supp-erreur");
    err.textContent = "";
    const val = (overlay.querySelector("#supp-confirm-input").value || "").trim();
    if (val !== "SUPPRIMER") { err.textContent = "Tape SUPPRIMER (en majuscules) pour confirmer."; return; }

    let mdp = "";
    if (estEmail) {
      mdp = overlay.querySelector("#supp-pwd-input").value || "";
      if (!mdp) { err.textContent = "Entre ton mot de passe."; return; }
    }

    btn.disabled = true; btn.textContent = "Suppression…";
    // Bloque toute recréation de profil dès maintenant (avant le rafraîchissement de jeton de la ré-auth)
    window._suppressionCompteEnCours = true;
    try {
      if (estEmail) {
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, mdp);
        await user.reauthenticateWithCredential(cred);
      } else {
        // ⚠️ Popup ouverte ICI, en 1er, dans le geste du clic → non bloquée par Chrome
        const provider = new firebase.auth.GoogleAuthProvider();
        try { provider.setCustomParameters({ login_hint: user.email || "" }); } catch (e) {}
        await user.reauthenticateWithPopup(provider);
      }
      fermer();
      await _executerSuppression(user);
    } catch (e) {
      window._suppressionCompteEnCours = false; // on annule le blocage si la ré-auth échoue
      try { sessionStorage.removeItem("_uidSupprime"); } catch (_) {}
      btn.disabled = false; btn.textContent = "Supprimer définitivement";
      if (e && e.code === "auth/wrong-password") {
        err.textContent = "Mot de passe incorrect.";
      } else if (e && (e.code === "auth/popup-closed-by-user" || e.code === "auth/cancelled-popup-request")) {
        err.textContent = "Ré-authentification annulée.";
      } else if (e && e.code === "auth/user-mismatch") {
        err.textContent = "Choisis bien le compte que tu es en train de supprimer.";
      } else if (e && e.code === "auth/popup-blocked") {
        err.textContent = "Popup bloquée — autorise les popups puis réessaie.";
      } else {
        fermer();
        _gererErreurSuppression(e);
      }
    }
  };

  const inp = overlay.querySelector("#supp-confirm-input");
  if (inp) inp.focus();
};

// Injecte le bouton "Supprimer mon compte" en bas de la modale profil (une fois).
function _injecterBoutonSuppression() {
  const modal = document.getElementById("modal-profil");
  if (!modal) return;
  if (document.getElementById("btn-supprimer-compte")) return;

  const zone = document.createElement("div");
  zone.style.cssText =
    "margin-top:20px;padding-top:16px;border-top:1px solid rgba(255,255,255,.12);text-align:center;";
  zone.innerHTML =
    '<button id="btn-supprimer-compte" type="button" onclick="supprimerMonCompte()" ' +
    'style="background:transparent;color:#ff6b6b;border:1px solid #ff6b6b;' +
    'border-radius:10px;padding:10px 18px;font-size:14px;cursor:pointer;">' +
    '🗑️ Supprimer mon compte</button>' +
    '<div style="margin-top:8px;font-size:12px;color:#999;line-height:1.4;">' +
    'Suppression définitive du compte et de toutes les données associées.</div>';

  const deco = modal.querySelector(".btn-deconnexion");
  const save = document.getElementById("btn-sauvegarder-profil");
  if (deco && deco.parentNode) deco.parentNode.insertBefore(zone, deco.nextSibling);
  else if (save && save.parentNode) save.parentNode.insertBefore(zone, save.nextSibling);
  else modal.appendChild(zone);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _injecterBoutonSuppression);
} else {
  _injecterBoutonSuppression();
}
