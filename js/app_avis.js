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
  // Log de diagnostic — visible dans la console (F12)
  console.log("👑 [Admin check]", { 
    email: window.currentUser.email, 
    emailNorm: email,
    uid: window.currentUser.uid,
    adminEmails: ADMIN_EMAILS,
    adminUids: ADMIN_UIDS,
    estAdmin: isAdmin 
  });
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
    if (typeof afficherToast === "function") afficherToast("Connecte-toi pour donner ton avis 🙏");
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
      email: window.currentUser.email || "",
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

// Charge les stats globales + section admin si applicable
async function chargerStatsAvis() {
  const zoneStats = document.getElementById("avis-stats-globales");
  const zoneAdmin = document.getElementById("avis-admin-zone");
  const zoneMonAvis = document.getElementById("mon-avis-zone");
  
  if (!zoneStats) return;
  
  try {
    const snap = await _db.collection("avis").get();
    const tous = snap.docs.map(d => d.data());
    const nb = tous.length;
    
    if (nb === 0) {
      zoneStats.innerHTML = `<span class="avis-empty">🌟 Aucun avis pour l'instant — sois le premier à noter !</span>`;
    } else {
      const moy = tous.reduce((s, a) => s + (a.etoiles || 0), 0) / nb;
      const etoilesAffichage = "★".repeat(Math.round(moy)) + "☆".repeat(5 - Math.round(moy));
      zoneStats.innerHTML = `
        <div class="avis-moyenne-affichage">
          <div class="avis-moyenne-etoiles">${etoilesAffichage}</div>
          <div class="avis-moyenne-chiffre">${moy.toFixed(1)}/5</div>
          <div class="avis-moyenne-nb">(${nb} avis)</div>
        </div>
      `;
    }
    
    // Bouton selon état
    if (window.currentUser && zoneMonAvis) {
      const monAvis = tous.find(a => a.uid === window.currentUser.uid);
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
    if (zoneStats) zoneStats.innerHTML = `<span class="avis-empty">Impossible de charger les avis</span>`;
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

