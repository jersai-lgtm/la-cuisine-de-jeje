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
    afficherBoutonConnexion();
  }
});

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
  const ref  = _db.collection("utilisateurs").doc(user.uid);
  const snap = await ref.get();
  if (snap.exists) {
    window.userProfile = snap.data();
  window.dispatchEvent(new Event('profilMisAJour'));
  } else {
    const profil = {
      uid: user.uid, prenom: user.displayName || "",
      email: user.email || "", photoURL: user.photoURL || "",
      dateCreation: new Date().toISOString(),
      foyer: null,
      preferences: { regimes:[], allergies:[], allergiesCustom:[], objectifs:[], cuisinesFavorites:[], niveauCuisine:"débutant" },
      favoris: [], historiqueMenus: []
    };
    await ref.set(profil);
    window.userProfile = profil;
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
};

window.estFavori = function(key) {
  return (window.userProfile?.favoris || []).includes(key);
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
    adultes: parseInt(g("adultes")) || 2,
    ados:    parseInt(g("ados"))    || 0,
    enfants: parseInt(g("enfants")) || 0,
    bebes:   parseInt(g("bebe"))    || 0,
  };

  const qsa = (sel) => scope ? [...scope.querySelectorAll(sel)].map(c => c.value) : [];
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

function afficherUtilisateurConnecte(user) {
  const z = document.getElementById("zone-utilisateur");
  if (!z) return;
  const photo = user.photoURL
    ? `<img src="${user.photoURL}" class="avatar-photo" referrerpolicy="no-referrer">`
    : `<div class="avatar-initiales">${(user.displayName || user.email || "U")[0].toUpperCase()}</div>`;
  z.innerHTML = `<div class="avatar-btn" onclick="ouvrirModalProfil()">${photo}<span class="avatar-prenom">${(user.displayName || "Mon compte").split(" ")[0]}</span></div>`;
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
  if (el("pp-adultes")) el("pp-adultes").value = f.adultes || 2;
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
