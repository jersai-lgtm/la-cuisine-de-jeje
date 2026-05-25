// ==============================
// FIREBASE AUTH - La Cuisine de Jéjé
// Chargé via CDN compat (non-module)
// ==============================

// Attendre que Firebase soit prêt
window.addEventListener('load', function() {
  initFirebase();
});

function initFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBB8TPxDGdP-D2WGDOs6yIyVV0dFY0M9oM",
    authDomain: "cuisine-jeje.firebaseapp.com",
    projectId: "cuisine-jeje",
    storageBucket: "cuisine-jeje.firebasestorage.app",
    messagingSenderId: "23537454599",
    appId: "1:23537454599:web:1a4c9101a6bc47b93a64a2"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();

  // ==============================
  // ÉCOUTE AUTH
  // ==============================
  auth.onAuthStateChanged(async function(user) {
    window.currentUser = user;
    if (user) {
      await chargerProfil(user, db);
      afficherUtilisateurConnecte(user);
      if (!window.userProfile || !window.userProfile.foyer) {
        afficherOnboarding();
      }
    } else {
      window.userProfile = null;
      afficherBoutonConnexion();
    }
  });

  // ==============================
  // CONNEXION GOOGLE
  // ==============================
  window.connexionGoogle = async function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      fermerModalAuth();
    } catch(e) {
      afficherErreurAuth(e.message);
    }
  };

  // ==============================
  // INSCRIPTION EMAIL
  // ==============================
  window.inscrireEmail = async function() {
    const prenom = document.getElementById('auth-prenom')?.value.trim();
    const email  = document.getElementById('auth-email')?.value.trim();
    const mdp    = document.getElementById('auth-mdp')?.value;
    if (!prenom || !email || !mdp) { afficherErreurAuth("Remplis tous les champs."); return; }
    if (mdp.length < 6) { afficherErreurAuth("Mot de passe : 6 caractères minimum."); return; }
    try {
      const cred = await auth.createUserWithEmailAndPassword(email, mdp);
      await cred.user.updateProfile({ displayName: prenom });
      fermerModalAuth();
    } catch(e) {
      const msgs = {
        'auth/email-already-in-use': 'Email déjà utilisé.',
        'auth/invalid-email': 'Email invalide.',
        'auth/weak-password': 'Mot de passe trop faible.'
      };
      afficherErreurAuth(msgs[e.code] || e.message);
    }
  };

  // ==============================
  // CONNEXION EMAIL
  // ==============================
  window.connecterEmail = async function() {
    const email = document.getElementById('auth-email-login')?.value.trim();
    const mdp   = document.getElementById('auth-mdp-login')?.value;
    if (!email || !mdp) { afficherErreurAuth("Remplis tous les champs."); return; }
    try {
      await auth.signInWithEmailAndPassword(email, mdp);
      fermerModalAuth();
    } catch(e) {
      const msgs = {
        'auth/user-not-found': 'Compte introuvable.',
        'auth/wrong-password': 'Mot de passe incorrect.',
        'auth/invalid-credential': 'Email ou mot de passe incorrect.',
        'auth/invalid-email': 'Email invalide.'
      };
      afficherErreurAuth(msgs[e.code] || e.message);
    }
  };

  // ==============================
  // DÉCONNEXION
  // ==============================
  window.deconnexion = async function() {
    await auth.signOut();
    window.userProfile = null;
    fermerModalProfil();
    afficherBoutonConnexion();
  };

  // ==============================
  // PROFIL FIRESTORE
  // ==============================
  async function chargerProfil(user, db) {
    const ref = db.collection('utilisateurs').doc(user.uid);
    const snap = await ref.get();
    if (snap.exists) {
      window.userProfile = snap.data();
    } else {
      const profil = {
        uid: user.uid,
        prenom: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        dateCreation: new Date().toISOString(),
        foyer: null,
        preferences: { regimes: [], allergies: [], cuisinesFavorites: [], niveauCuisine: 'débutant' },
        favoris: [],
        historiqueMenus: []
      };
      await ref.set(profil);
      window.userProfile = profil;
    }
  }

  window.sauvegarderProfil = async function(data) {
    if (!window.currentUser) return;
    const ref = db.collection('utilisateurs').doc(window.currentUser.uid);
    await ref.update(data);
    window.userProfile = Object.assign({}, window.userProfile, data);
  };

  window.toggleFavori = async function(recetteKey) {
    if (!window.currentUser) { ouvrirModalAuth(); return; }
    const ref = db.collection('utilisateurs').doc(window.currentUser.uid);
    const favs = window.userProfile?.favoris || [];
    const isFav = favs.includes(recetteKey);
    const newFavs = isFav ? favs.filter(f => f !== recetteKey) : [...favs, recetteKey];
    await ref.update({ favoris: newFavs });
    window.userProfile.favoris = newFavs;
    const btn = document.getElementById('btn-favori-' + recetteKey);
    if (btn) btn.textContent = newFavs.includes(recetteKey) ? '❤️' : '🤍';
    const btnModal = document.getElementById('btn-favori-modal');
    if (btnModal) btnModal.textContent = newFavs.includes(recetteKey) ? '❤️' : '🤍';
  };

  window.estFavori = function(key) {
    return (window.userProfile?.favoris || []).includes(key);
  };

  window.sauvegarderHistoriqueMenu = async function(menu, type) {
    if (!window.currentUser) return;
    const ref = db.collection('utilisateurs').doc(window.currentUser.uid);
    const entree = { date: new Date().toISOString(), type, menu };
    const hist = [...(window.userProfile?.historiqueMenus || []), entree].slice(-20);
    await ref.update({ historiqueMenus: hist });
    window.userProfile.historiqueMenus = hist;
  };

  window.sauvegarderProfilComplet = async function() {
    // Détecter quelle modale est ouverte (onboarding ou profil)
    const isOnboarding = document.getElementById('modal-onboarding')?.classList.contains('visible');
    const prefix = isOnboarding ? 'p' : 'pp';
    const scope = isOnboarding
      ? document.getElementById('modal-onboarding')
      : document.getElementById('modal-profil');

    const foyer = {
      adultes: parseInt(document.getElementById(prefix + '-adultes')?.value) || 2,
      ados:    parseInt(document.getElementById(prefix + '-ados')?.value)    || 0,
      enfants: parseInt(document.getElementById(prefix + '-enfants')?.value) || 0,
      bebes:   parseInt(document.getElementById(prefix + '-bebe')?.value)    || 0,
    };
    const regimes       = scope ? [...scope.querySelectorAll('.pref-regime:checked')].map(c => c.value)   : [];
    const allergies     = scope ? [...scope.querySelectorAll('.pref-allergie:checked')].map(c => c.value) : [];
    const allergiesCustom = isOnboarding ? (window._allergiesCustom || []) : (window._allergiesCustomProfil || []);
    const objectifs     = scope ? [...scope.querySelectorAll('.pref-objectif:checked')].map(c => c.value) : [];
    const cuisinesFav   = scope ? [...scope.querySelectorAll('.pref-cuisine:checked')].map(c => c.value)  : [];
    const niveauCuisine = document.getElementById(prefix + '-niveau')?.value || 'débutant';
    await window.sauvegarderProfil({ foyer, preferences: { regimes, allergies, allergiesCustom, objectifs, cuisinesFavorites: cuisinesFav, niveauCuisine } });
    const btn = document.getElementById('btn-sauvegarder-profil');
    if (btn) { btn.textContent = '✅ Sauvegardé !'; setTimeout(() => btn.textContent = '💾 Sauvegarder', 2000); }
  };

  window.getPersonnesFoyer = function() {
    const f = window.userProfile?.foyer;
    if (!f) return 4;
    return (f.adultes || 0) + (f.ados || 0) + (f.enfants || 0);
  };
}

// ==============================
// UI
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
      <span class="avatar-prenom">${(user.displayName || 'Mon compte').split(' ')[0]}</span>
    </div>`;
}

function afficherOnboarding() {
  const m = document.getElementById('modal-onboarding');
  if (m) m.classList.add('visible');
}

function afficherErreurAuth(msg) {
  const el = document.getElementById('auth-erreur');
  if (el) { el.textContent = msg; el.style.display = 'block'; }
  setTimeout(() => { if (el) el.style.display = 'none'; }, 4000);
}

// ==============================
// MODALES
// ==============================
window.ouvrirModalAuth = function(onglet) {
  document.getElementById('modal-auth').classList.add('visible');
  switchAuthTab(onglet || 'connexion');
};
window.fermerModalAuth = function() {
  document.getElementById('modal-auth').classList.remove('visible');
};
window.switchAuthTab = function(onglet) {
  document.getElementById('auth-tab-connexion').style.display  = onglet === 'connexion'   ? 'block' : 'none';
  document.getElementById('auth-tab-inscription').style.display = onglet === 'inscription' ? 'block' : 'none';
  document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('tab-btn-' + onglet);
  if (btn) btn.classList.add('active');
};

window.ouvrirModalProfil = function() {
  const p = window.userProfile;
  if (!p) return;
  const modal = document.getElementById('modal-profil');
  if (!modal) return;
  modal.classList.add('visible');
  document.getElementById('profil-prenom').textContent = window.currentUser?.displayName || p.email || '';
  document.getElementById('profil-email').textContent  = p.email || '';
  const f = p.foyer || {};
  const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  setVal('pp-adultes', f.adultes || 2);
  setVal('pp-ados',    f.ados    || 0);
  setVal('pp-enfants', f.enfants || 0);
  setVal('pp-bebe',    f.bebes   || 0);
  const prefs = p.preferences || {};
  // Dans le profil : sélectionner uniquement les checkboxes dans modal-profil
  const modalProfil = document.getElementById('modal-profil');
  if (modalProfil) {
    modalProfil.querySelectorAll('.pref-regime').forEach(cb   => cb.checked = (prefs.regimes           || []).includes(cb.value));
    modalProfil.querySelectorAll('.pref-allergie').forEach(cb  => cb.checked = (prefs.allergies          || []).includes(cb.value));
    modalProfil.querySelectorAll('.pref-objectif').forEach(cb  => cb.checked = (prefs.objectifs           || []).includes(cb.value));
    modalProfil.querySelectorAll('.pref-cuisine').forEach(cb   => cb.checked = (prefs.cuisinesFavorites   || []).includes(cb.value));
  }
  // Restaurer allergies custom dans profil
  window._allergiesCustomProfil = prefs.allergiesCustom || [];
  if (typeof renderAllergiesCustom === 'function') renderAllergiesCustom('pp');
  const niv = document.getElementById('pp-niveau');
  if (niv) niv.value = prefs.niveauCuisine || 'débutant';
};
window.fermerModalProfil = function() {
  const m = document.getElementById('modal-profil');
  if (m) m.classList.remove('visible');
};
window.fermerOnboarding = function() {
  const m = document.getElementById('modal-onboarding');
  if (m) m.classList.remove('visible');
};
window.terminerOnboarding = async function() {
  await window.sauvegarderProfilComplet();
  window.fermerOnboarding();
};
