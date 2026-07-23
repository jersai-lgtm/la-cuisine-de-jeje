// =============================================================================
// 📦 MODULE : AVIS
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

// =============================================================================
// 💌 SYSTÈME D'AVIS v256
// =============================================================================
// Stockage : collection Firebase "avis" — 1 document par user (uid = id du doc)
// Champs : {uid, prenom, email, etoiles (1-5), commentaire, dateMaj}
// =============================================================================

// 🔑 ADMIN : tu peux mettre ton UID Firebase OU ton email ici.
// Pour trouver ton UID : Firebase Console > Authentication > clic sur ton compte > copier "Identifiant utilisateur"
const ADMIN_UIDS = [
  "sQWjiKrOIsdzWr0nCspn3WSkY5D3", // 👑 Jérôme (UID Firebase)
];
const ADMIN_EMAILS = [
  "[email protected]", // 👑 Jérôme (créateur de l'app)
];

function estAdmin() {
  if (!window.currentUser) return false;
  if (ADMIN_UIDS.includes(window.currentUser.uid)) return true;
  // v256.1 : Comparaison tolérante (lowercase + trim) pour éviter les soucis d'espaces/majuscules
  const email = (window.currentUser.email || "").toLowerCase().trim();
  const isAdmin = ADMIN_EMAILS.some(e => e.toLowerCase().trim() === email);
  return isAdmin;
}

window._noteAvisSelectionnee = 0;

function setNoteAvis(n) {
  window._noteAvisSelectionnee = n;
  document.querySelectorAll(".avis-etoile").forEach((e, i) => {
    e.textContent = i < n ? "★" : "☆";
    e.classList.toggle("active", i < n);
  });
  const texts = ["", "😞 À améliorer", "🙂 Pas mal", "👍 Bien", "❤️ Très bien", "🌟 Génial !"];
  const txt = document.getElementById("avis-note-text");
  if (txt) txt.textContent = texts[n] || "Choisis une note";
}

function majCompteurAvis() {
  const ta = document.getElementById("avis-commentaire");
  const c = document.getElementById("avis-compteur");
  if (ta && c) c.textContent = ta.value.length + "/500";
}

async function ouvrirModalAvis() {
  if (!window.currentUser) {
    if (typeof afficherToast === "function") afficherToast("Connecte-toi (gratuit) pour partager ton avis avec la communauté 🙏");
    if (typeof ouvrirModalAuth === "function") ouvrirModalAuth();
    return;
  }
  
  // Reset
  window._noteAvisSelectionnee = 0;
  document.getElementById("avis-commentaire").value = "";
  document.querySelectorAll(".avis-etoile").forEach(e => {
    e.textContent = "☆";
    e.classList.remove("active");
  });
  document.getElementById("avis-note-text").textContent = "Choisis une note";
  majCompteurAvis();
  
  // Charger l'avis existant si déjà noté
  try {
    const doc = await _db.collection("avis").doc(window.currentUser.uid).get();
    if (doc.exists) {
      const data = doc.data();
      setNoteAvis(data.etoiles || 0);
      const ta = document.getElementById("avis-commentaire");
      if (ta) ta.value = data.commentaire || "";
      majCompteurAvis();
    }
  } catch (e) {
    console.warn("Erreur chargement avis existant:", e);
  }
  
  document.getElementById("modal-avis").classList.add("visible");
  if (typeof window._backGuardPush === "function") window._backGuardPush();
}

function fermerModalAvis() {
  document.getElementById("modal-avis").classList.remove("visible");
}

async function envoyerAvis() {
  if (!window.currentUser) { 
    if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); 
    return; 
  }
  const n = window._noteAvisSelectionnee;
  if (n === 0) {
    if (typeof afficherToast === "function") afficherToast("⚠️ Choisis une note (1 à 5 étoiles) !");
    return;
  }
  
  const commentaire = (document.getElementById("avis-commentaire")?.value || "").trim();
  const btn = document.getElementById("avis-btn-envoyer");
  if (btn) { btn.disabled = true; btn.textContent = "💌 Envoi..."; }
  
  try {
    await _db.collection("avis").doc(window.currentUser.uid).set({
      uid: window.currentUser.uid,
      prenom: window.userProfile?.prenom || window.currentUser.displayName || "Anonyme",
      // Pas d'email : inutile à l'affichage (vue admin = prénom/note/commentaire) → minimisation des données.
      etoiles: n,
      commentaire: commentaire,
      dateMaj: new Date().toISOString(),
    }, { merge: true });
    
    if (typeof afficherToast === "function") afficherToast("💌 Merci pour ton avis !");
    fermerModalAvis();
    // Rafraîchir l'affichage
    chargerStatsAvis();
  } catch (e) {
    console.error("Erreur envoi avis:", e);
    // Message d'erreur précis selon le code Firebase
    let msg = "⚠️ Erreur — réessaie plus tard";
    if (e?.code === "permission-denied") {
      msg = "🔒 Permission refusée — vérifie les règles Firestore !";
    } else if (e?.code === "unavailable") {
      msg = "📡 Pas de connexion internet";
    } else if (e?.message) {
      msg = "⚠️ " + e.message.slice(0, 80);
    }
    if (typeof afficherToast === "function") afficherToast(msg);
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = "💌 Envoyer mon avis"; }
  }
}

// Rend la note globale de l'appli dans la carte « en évidence » de l'accueil.
// (v261 — sortie de « Mes Stats » car c'est la stat de l'appli, pas une stat perso.)
function rendreNoteAppAccueil(tous) {
  const zone = document.getElementById("accueil-note-app");
  if (!zone) return;
  window._avisTousPublics = tous; // réutilisé par la modal « Tous les avis »
  const nb = tous.length;
  zone.style.display = "block";
  if (nb === 0) {
    zone.innerHTML = `
      <button class="note-app-bar note-app-bar-vide" onclick="ouvrirModalAvis()" aria-label="Avis général de l'application">
        <span class="note-app-bar-ico">⭐</span>
        <span class="note-app-bar-sub">Avis général de l'appli · aucun avis pour l'instant</span>
      </button>`;
    return;
  }
  const moy = tous.reduce((s, a) => s + (a.etoiles || 0), 0) / nb;
  const arr = Math.round(moy);
  const etoiles = "★".repeat(arr) + "☆".repeat(5 - arr);
  // Dernier avis avec commentaire (témoignage façon Jow), sous la barre.
  const avecComm = tous.filter(a => a.commentaire && a.commentaire.trim());
  avecComm.sort((a, b) => new Date(b.dateMaj || 0) - new Date(a.dateMaj || 0));
  const last = avecComm[0];
  let avisHTML = "";
  if (last) {
    const n = Math.max(0, Math.min(5, last.etoiles || 0));
    const st = "★".repeat(n) + "☆".repeat(5 - n);
    avisHTML = `
      <div class="note-app-avis" onclick="ouvrirTousLesAvis()" role="button" tabindex="0" aria-label="Voir tous les avis">
        <span class="note-app-avis-stars">${st}</span>
        <span class="note-app-avis-txt">« ${escapeHTML(last.commentaire.trim())} »</span>
      </div>`;
  }
  // v262 : toucher la barre ouvre la liste PUBLIQUE de tous les avis (anonymes)
  zone.innerHTML = `
    <button class="note-app-bar" onclick="ouvrirTousLesAvis()" aria-label="Voir tous les avis de l'application">
      <span class="note-app-bar-note">${moy.toFixed(1).replace(".", ",")}<span>/5</span></span>
      <span class="note-app-bar-stars">${etoiles}</span>
      <span class="note-app-bar-sub">Avis général de l'appli · ${nb} avis · appuie pour tout lire</span>
    </button>${avisHTML}`;
}

// Chargé à l'affichage de l'accueil : lit les avis et remplit la carte en évidence.
async function chargerNoteAppAccueil() {
  const zone = document.getElementById("accueil-note-app");
  if (!zone || typeof _db === "undefined" || !_db) return;
  try {
    const snap = await _db.collection("avis").get();
    rendreNoteAppAccueil(snap.docs.map(d => d.data()));
  } catch (e) {
    console.warn("Erreur note appli accueil:", e);
  }
}
window.chargerNoteAppAccueil = chargerNoteAppAccueil;

// =============================================================================
// 📖 TOUS LES AVIS — modal PUBLIQUE (v262)
// -----------------------------------------------------------------------------
// Tout le monde peut consulter tous les avis de l'appli : étoiles, commentaire
// et date, SANS jamais afficher le nom des personnes (anonyme). Les noms ne
// restent visibles que dans la vue admin privée.
// =============================================================================
function _avisDateCourte(d) {
  try {
    const dt = new Date(d);
    if (isNaN(dt)) return "";
    return dt.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  } catch (e) { return ""; }
}

function rendreListeTousAvis(tous) {
  const nb = tous.length;
  const moy = nb ? tous.reduce((s, a) => s + (a.etoiles || 0), 0) / nb : 0;
  const arr = Math.round(moy);
  const tries = tous.slice().sort((a, b) => new Date(b.dateMaj || 0) - new Date(a.dateMaj || 0));
  const items = tries.map(a => {
    const n = Math.max(0, Math.min(5, a.etoiles || 0));
    const st = "★".repeat(n) + "☆".repeat(5 - n);
    const comm = (a.commentaire || "").trim();
    return `<div class="avis-public-item">
      <div class="avis-public-tete"><span class="avis-public-stars">${st}</span><span class="avis-public-date">${_avisDateCourte(a.dateMaj)}</span></div>
      ${comm ? `<div class="avis-public-comm">« ${escapeHTML(comm)} »</div>` : `<div class="avis-public-comm avis-public-sans">Sans commentaire</div>`}
    </div>`;
  }).join("");
  return `
    <div class="avis-public-resume">
      <span class="avis-public-note">${moy.toFixed(1).replace(".", ",")}<span>/5</span></span>
      <span class="avis-public-resume-stars">${"★".repeat(arr)}${"☆".repeat(5 - arr)}</span>
      <span class="avis-public-nb">${nb} avis</span>
    </div>
    <div class="avis-public-liste">${items || '<p class="avis-public-sans" style="text-align:center">Aucun avis pour l\'instant.</p>'}</div>
    <button class="avis-btn-envoyer" onclick="fermerTousLesAvis();ouvrirModalAvis()">✏️ Donner mon avis</button>`;
}

async function ouvrirTousLesAvis() {
  // Créer la modal au premier appel (réutilise le style des modals existantes)
  let m = document.getElementById("modal-tous-avis");
  if (!m) {
    m = document.createElement("div");
    m.id = "modal-tous-avis";
    m.className = "modal-auth-overlay";
    m.onclick = (e) => { if (e.target === m) fermerTousLesAvis(); };
    m.innerHTML = `<div class="modal-auth-contenu modal-avis-contenu">
      <button class="modal-fermer" onclick="fermerTousLesAvis()">✕</button>
      <h2>⭐ Tous les avis</h2>
      <p class="avis-modal-subtitle">Les avis sont affichés anonymement.</p>
      <div id="tous-avis-corps"><p style="text-align:center;opacity:.7">Chargement…</p></div>
    </div>`;
    document.body.appendChild(m);
    if (typeof _MODALS_SURVEILLEES !== "undefined" && Array.isArray(_MODALS_SURVEILLEES)) {
      _MODALS_SURVEILLEES.push({ id: "modal-tous-avis", close: function () { fermerTousLesAvis(); } });
    }
  }
  m.classList.add("visible");
  // Données : réutilise le dernier chargement de l'accueil, sinon relit Firestore
  let tous = window._avisTousPublics;
  if (!Array.isArray(tous)) {
    try {
      const snap = await _db.collection("avis").get();
      tous = snap.docs.map(d => d.data());
      window._avisTousPublics = tous;
    } catch (e) { tous = []; }
  }
  const corps = document.getElementById("tous-avis-corps");
  if (corps) corps.innerHTML = rendreListeTousAvis(tous);
}
window.ouvrirTousLesAvis = ouvrirTousLesAvis;

function fermerTousLesAvis() {
  const m = document.getElementById("modal-tous-avis");
  if (m) m.classList.remove("visible");
}
window.fermerTousLesAvis = fermerTousLesAvis;

// Charge le bouton perso « Mon avis » (Mes Stats), la carte accueil et la section admin.
async function chargerStatsAvis() {
  const zoneAdmin = document.getElementById("avis-admin-zone");
  const zoneMonAvis = document.getElementById("mon-avis-zone");

  try {
    const snap = await _db.collection("avis").get();
    const tous = snap.docs.map(d => d.data());

    // Carte « note de l'appli » en évidence sur l'accueil.
    rendreNoteAppAccueil(tous);

    // Bouton perso dans « Mes Stats » (noter / modifier son propre avis).
    if (zoneMonAvis) {
      const monAvis = window.currentUser ? tous.find(a => a.uid === window.currentUser.uid) : null;
      if (monAvis) {
        zoneMonAvis.innerHTML = `
          <div class="mon-avis-deja">
            <span>Ta note actuelle : ${"⭐".repeat(monAvis.etoiles)}</span>
            <button class="avis-btn-modifier" onclick="ouvrirModalAvis()">✏️ Modifier mon avis</button>
          </div>
        `;
      } else {
        zoneMonAvis.innerHTML = `<button class="avis-btn-principal" onclick="ouvrirModalAvis()">⭐ Noter l'application</button>`;
      }
    }

    // Vue admin
    if (estAdmin() && zoneAdmin) {
      afficherAdminAvis(tous);
      // v257.1 — Stats admin complètes (utilisateurs, engagement, préférences)
      chargerStatsAdminComplet();
    } else if (zoneAdmin) {
      zoneAdmin.style.display = "none";
    }
  } catch (e) {
    console.warn("Erreur chargement stats avis:", e);
  }
}

function afficherAdminAvis(tous) {
  const zone = document.getElementById("avis-admin-zone");
  const liste = document.getElementById("avis-admin-liste");
  if (!zone || !liste) return;
  zone.style.display = "block";
  
  if (tous.length === 0) {
    liste.innerHTML = `<p class="avis-empty">Aucun avis pour l'instant.</p>`;
    return;
  }
  
  // Distribution des notes
  const distrib = [0, 0, 0, 0, 0]; // index 0 = 1 étoile, 4 = 5 étoiles
  tous.forEach(a => { if (a.etoiles >= 1 && a.etoiles <= 5) distrib[a.etoiles - 1]++; });
  
  // Trier les avis par date desc
  const tries = [...tous].sort((a, b) => (b.dateMaj || "").localeCompare(a.dateMaj || ""));
  
  const distribHTML = [5, 4, 3, 2, 1].map(n => {
    const count = distrib[n - 1];
    const pct = tous.length > 0 ? (count / tous.length) * 100 : 0;
    return `<div class="avis-distrib-ligne">
      <span class="avis-distrib-label">${n}⭐</span>
      <div class="avis-distrib-bar"><div class="avis-distrib-fill" style="width:${pct}%"></div></div>
      <span class="avis-distrib-count">${count}</span>
    </div>`;
  }).join("");
  
  const avisAvecCommentaires = tries.filter(a => a.commentaire);
  const listeAvis = tries.map(a => `
    <div class="avis-item">
      <div class="avis-item-header">
        <span class="avis-item-prenom">${escapeHTML(a.prenom || "Anonyme")}</span>
        <span class="avis-item-etoiles">${"⭐".repeat(a.etoiles || 0)}</span>
        <span class="avis-item-date">${formatDateAvis(a.dateMaj)}</span>
      </div>
      ${a.commentaire ? `<div class="avis-item-commentaire">"${escapeHTML(a.commentaire)}"</div>` : '<div class="avis-item-sans-commentaire">(Pas de commentaire)</div>'}
    </div>
  `).join("");
  
  liste.innerHTML = `
    <div class="avis-distrib-zone">${distribHTML}</div>
    <h5 class="avis-admin-sous-titre">📝 Tous les avis (${tries.length}) — ${avisAvecCommentaires.length} avec commentaire</h5>
    <div class="avis-admin-items">${listeAvis}</div>
  `;
}

