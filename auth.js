// ==============================
// FIREBASE AUTH - La Cuisine de Jéjé
// ==============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBB8TPxDGdP-D2WGDOs6yIyVV0dFY0M9oM",
  authDomain: "cuisine-jeje.firebaseapp.com",
  projectId: "cuisine-jeje",
  storageBucket: "cuisine-jeje.firebasestorage.app",
  messagingSenderId: "23537454599",
  appId: "1:23537454599:web:1a4c9101a6bc47b93a64a2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// ==============================
// ÉTAT GLOBAL
// ==============================
window.currentUser = null;
window.userProfile = null;

// ==============================
// ÉCOUTE AUTH
// ==============================
onAuthStateChanged(auth, async (user) => {
  window.currentUser = user;
  if (user) {
    await chargerProfil(user);
    afficherUtilisateurConnecte(user);
    // Si profil incomplet → afficher onboarding
    if (!window.userProfile?.foyer) {
      afficherOnboarding();
    }
  } else {
    afficherBoutonConnexion();
  }
});

// ==============================
// CONNEXION GOOGLE
// ==============================
window.connexionGoogle = async function() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    fermerModalAuth();
  } catch (e) {
    afficherErreurAuth("Erreur de connexion Google : " + e.message);
  }
};

// ==============================
// INSCRIPTION EMAIL
// ==============================
window.inscrireEmail = async function() {
  const prenom = document.getElementById('auth-prenom')?.value.trim();
  const email = document.getElementById('auth-email')?.value.trim();
  const mdp = document.getElementById('auth-mdp')?.value;
  if (!prenom || !email || !mdp) { afficherErreurAuth("Remplis tous les champs."); return; }
  if (mdp.length < 6) { afficherErreurAuth("Mot de passe : 6 caractères minimum."); return; }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, mdp);
    await updateProfile(cred.user, { displayName: prenom });
    fermerModalAuth();
  } catch (e) {
    const msgs = { 'auth/email-already-in-use': 'Email déjà utilisé.', 'auth/invalid-email': 'Email invalide.' };
    afficherErreurAuth(msgs[e.code] || e.message);
  }
};

// ==============================
// CONNEXION EMAIL
// ==============================
window.connecterEmail = async function() {
  const email = document.getElementById('auth-email-login')?.value.trim();
  const mdp = document.getElementById('auth-mdp-login')?.value;
  if (!email || !mdp) { afficherErreurAuth("Remplis tous les champs."); return; }
  try {
    await signInWithEmailAndPassword(auth, email, mdp);
    fermerModalAuth();
  } catch (e) {
    const msgs = { 'auth/user-not-found': 'Compte introuvable.', 'auth/wrong-password': 'Mot de passe incorrect.', 'auth/invalid-credential': 'Email ou mot de passe incorrect.' };
    afficherErreurAuth(msgs[e.code] || e.message);
  }
};

// ==============================
// DÉCONNEXION
// ==============================
window.deconnexion = async function() {
  await signOut(auth);
  window.userProfile = null;
  afficherBoutonConnexion();
};

// ==============================
// PROFIL FIRESTORE
// ==============================
async function chargerProfil(user) {
  const ref = doc(db, "utilisateurs", user.uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    window.userProfile = snap.data();
  } else {
    // Créer profil vide
    const profil = {
      uid: user.uid,
      prenom: user.displayName || "",
      email: user.email,
      photoURL: user.photoURL || "",
      dateCreation: new Date().toISOString(),
      foyer: null,
      preferences: { regimes: [], allergies: [], cuisinesFavorites: [], niveauCuisine: "débutant" },
      favoris: [],
      historiqueMenus: []
    };
    await setDoc(ref, profil);
    window.userProfile = profil;
  }
}

window.sauvegarderProfil = async function(data) {
  if (!window.currentUser) return;
  const ref = doc(db, "utilisateurs", window.currentUser.uid);
  await updateDoc(ref, data);
  window.userProfile = { ...window.userProfile, ...data };
};

// Favoris
window.toggleFavori = async function(recetteKey) {
  if (!window.currentUser) { ouvrirModalAuth(); return; }
  const ref = doc(db, "utilisateurs", window.currentUser.uid);
  const isFavori = window.userProfile?.favoris?.includes(recetteKey);
  if (isFavori) {
    await updateDoc(ref, { favoris: arrayRemove(recetteKey) });
    window.userProfile.favoris = window.userProfile.favoris.filter(f => f !== recetteKey);
  } else {
    await updateDoc(ref, { favoris: arrayUnion(recetteKey) });
    window.userProfile.favoris = [...(window.userProfile.favoris || []), recetteKey];
  }
  // Mettre à jour l'icône cœur si visible
  const btn = document.getElementById('btn-favori-' + recetteKey);
  if (btn) btn.textContent = window.userProfile.favoris.includes(recetteKey) ? '❤️' : '🤍';
};

window.estFavori = function(recetteKey) {
  return window.userProfile?.favoris?.includes(recetteKey) || false;
};

// Historique menus
window.sauvegarderHistoriqueMenu = async function(menu, type) {
  if (!window.currentUser) return;
  const ref = doc(db, "utilisateurs", window.currentUser.uid);
  const entree = { date: new Date().toISOString(), type, menu };
  await updateDoc(ref, { historiqueMenus: arrayUnion(entree) });
};

// ==============================
// UI - BOUTON AVATAR / CONNEXION
// ==============================
function afficherBoutonConnexion() {
  const zone = document.getElementById('zone-utilisateur');
  if (!zone) return;
  zone.innerHTML = `<button class="btn-connexion" onclick="ouvrirModalAuth()">👤 Connexion</button>`;
}

function afficherUtilisateurConnecte(user) {
  const zone = document.getElementById('zone-utilisateur');
  if (!zone) return;
  const photo = user.photoURL
    ? `<img src="${user.photoURL}" class="avatar-photo" referrerpolicy="no-referrer">`
    : `<div class="avatar-initiales">${(user.displayName || user.email || 'U')[0].toUpperCase()}</div>`;
  zone.innerHTML = `
    <div class="avatar-btn" onclick="ouvrirModalProfil()">
      ${photo}
      <span class="avatar-prenom">${user.displayName?.split(' ')[0] || 'Mon compte'}</span>
    </div>`;
}

// ==============================
// MODAL AUTH (connexion/inscription)
// ==============================
window.ouvrirModalAuth = function(onglet = 'connexion') {
  document.getElementById('modal-auth').classList.add('visible');
  switchAuthTab(onglet);
};
window.fermerModalAuth = function() {
  document.getElementById('modal-auth').classList.remove('visible');
};
window.switchAuthTab = function(onglet) {
  document.getElementById('auth-tab-connexion').style.display = onglet === 'connexion' ? 'block' : 'none';
  document.getElementById('auth-tab-inscription').style.display = onglet === 'inscription' ? 'block' : 'none';
  document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-btn-' + onglet)?.classList.add('active');
};

function afficherErreurAuth(msg) {
  const el = document.getElementById('auth-erreur');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  setTimeout(() => { if (el) el.style.display = 'none'; }, 4000);
}

// ==============================
// MODAL PROFIL
// ==============================
window.ouvrirModalProfil = function() {
  const p = window.userProfile;
  if (!p) return;
  const modal = document.getElementById('modal-profil');
  modal.classList.add('visible');

  const foyer = p.foyer || {};
  document.getElementById('profil-prenom').textContent = window.currentUser?.displayName || p.email;
  document.getElementById('profil-email').textContent = p.email;

  // Charger valeurs foyer
  document.getElementById('p-adultes').value = foyer.adultes || 2;
  document.getElementById('p-ados').value = foyer.ados || 0;
  document.getElementById('p-enfants').value = foyer.enfants || 0;
  document.getElementById('p-bebe').value = foyer.bebes || 0;

  // Préférences
  const prefs = p.preferences || {};
  document.querySelectorAll('.pref-regime').forEach(cb => {
    cb.checked = (prefs.regimes || []).includes(cb.value);
  });
  document.querySelectorAll('.pref-allergie').forEach(cb => {
    cb.checked = (prefs.allergies || []).includes(cb.value);
  });
  document.querySelectorAll('.pref-cuisine').forEach(cb => {
    cb.checked = (prefs.cuisinesFavorites || []).includes(cb.value);
  });
  const niv = document.getElementById('p-niveau');
  if (niv) niv.value = prefs.niveauCuisine || 'débutant';
};

window.fermerModalProfil = function() {
  document.getElementById('modal-profil').classList.remove('visible');
};

window.sauvegarderProfilComplet = async function() {
  const foyer = {
    adultes: parseInt(document.getElementById('p-adultes').value) || 2,
    ados: parseInt(document.getElementById('p-ados').value) || 0,
    enfants: parseInt(document.getElementById('p-enfants').value) || 0,
    bebes: parseInt(document.getElementById('p-bebe').value) || 0,
  };
  const regimes = [...document.querySelectorAll('.pref-regime:checked')].map(c => c.value);
  const allergies = [...document.querySelectorAll('.pref-allergie:checked')].map(c => c.value);
  const cuisinesFavorites = [...document.querySelectorAll('.pref-cuisine:checked')].map(c => c.value);
  const niveauCuisine = document.getElementById('p-niveau')?.value || 'débutant';

  await window.sauvegarderProfil({ foyer, preferences: { regimes, allergies, cuisinesFavorites, niveauCuisine } });

  // Feedback
  const btn = document.getElementById('btn-sauvegarder-profil');
  if (btn) { btn.textContent = '✅ Sauvegardé !'; setTimeout(() => btn.textContent = '💾 Sauvegarder', 2000); }
};

// ==============================
// ONBOARDING (premier accès)
// ==============================
function afficherOnboarding() {
  document.getElementById('modal-onboarding').classList.add('visible');
}
window.fermerOnboarding = function() {
  document.getElementById('modal-onboarding').classList.remove('visible');
};
window.terminerOnboarding = async function() {
  await window.sauvegarderProfilComplet();
  fermerOnboarding();
};

// Pré-remplir personnes dans le planificateur depuis le profil
window.getPersonnesFoyer = function() {
  const f = window.userProfile?.foyer;
  if (!f) return 4;
  return (f.adultes || 0) + (f.ados || 0) + (f.enfants || 0);
};
