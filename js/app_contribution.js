/* ============================================================
   CONTRIBUTION — Phase 1 : recettes PERSONNELLES (privées)
   - Stockées dans userProfile.recettesPerso = { key: {...recette...} }
   - Fusionnées dans le catalogue `recettes` au chargement (cet utilisateur uniquement)
   - Cartes injectées dynamiquement dans #section-cartes
   La structure utilise fixe:true + ingredientsFixes (format simple, pas d'échelle/coût).
   ============================================================ */

// --- Fusionne les recettes perso dans le catalogue global + injecte les cartes ---
window.fusionnerRecettesPerso = function () {
  if (typeof recettes === "undefined") return;
  const perso = (window.userProfile && window.userProfile.recettesPerso) || {};
  Object.keys(perso).forEach(k => { recettes[k] = perso[k]; });
  injecterCartesPerso();
};

// --- Injecte (ou ré-injecte) les cartes des recettes perso dans le catalogue ---
window.injecterCartesPerso = function () {
  const section = document.getElementById("section-cartes");
  if (!section) return;
  // Retirer les anciennes cartes perso (évite les doublons à chaque maj)
  section.querySelectorAll(".carte[data-perso='1']").forEach(c => c.remove());

  const perso = (window.userProfile && window.userProfile.recettesPerso) || {};
  Object.entries(perso).forEach(([key, r]) => {
    const carte = document.createElement("div");
    carte.className = "carte";
    carte.setAttribute("data-perso", "1");
    carte.setAttribute("data-cat", r.cat || "plats");
    carte.setAttribute("data-pays", r.pays || "france");
    carte.setAttribute("onclick", `ouvrirFiche('${key}', null)`);
    carte.innerHTML =
      `<img src="${r.image || "images/" + key + ".webp"}" alt="${r.nom || key}" onerror="this.style.display='none'">
      <span class="carte-badge-perso" title="Ta recette perso">👤 Perso</span>
      <div class="carte-info">
        <h2>${r.emoji || "🍽️"} ${r.nom || key}</h2>
        <p>⏱ ${r.temps || ""}${r.niveau ? " • " + r.niveau : ""}</p>
      </div>`;
    section.appendChild(carte);
  });

  // Réappliquer les badges visuels (nutri, saison, note communauté…)
  try { if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles(); } catch (e) {}
  try { if (typeof appliquerBadgeEtoilesCartes === "function") appliquerBadgeEtoilesCartes(); } catch (e) {}
};

// --- Ouvrir / fermer le modal de contribution ---
window.ouvrirContribution = function () {
  if (!window.userProfile) {
    if (typeof afficherToast === "function") afficherToast("⚠️ Connecte-toi pour ajouter une recette");
    return;
  }
  const m = document.getElementById("modal-contribution");
  if (!m) return;
  m.style.display = "flex";
  contribReset();
  contribSetMode("perso", document.querySelector(".contrib-mode-btn"));
  contribAfficherMesRecettes();
  contribAfficherMesPropositions();
  chargerModeration();
};
window.fermerContribution = function () {
  const m = document.getElementById("modal-contribution");
  if (m) m.style.display = "none";
};

function contribReset() {
  ["c-nom", "c-emoji", "c-temps", "c-pays", "c-desc", "c-ingredients", "c-etapes"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const cat = document.getElementById("c-cat"); if (cat) cat.value = "plats";
  const pays = document.getElementById("c-pays"); if (pays) pays.value = "france";
  const niv = document.getElementById("c-niveau"); if (niv) niv.value = "⭐ Facile";
}

// --- Soumettre une recette perso ---
window.soumettreContribution = async function () {
  if (!window.userProfile) { if (typeof afficherToast === "function") afficherToast("⚠️ Connecte-toi d'abord"); return; }

  const val = id => (document.getElementById(id)?.value || "").trim();
  const nom = val("c-nom");
  if (!nom) { afficherToast("⚠️ Donne un nom à ta recette"); return; }

  const ingrTxt = val("c-ingredients");
  const etapesTxt = val("c-etapes");
  if (!ingrTxt) { afficherToast("⚠️ Ajoute au moins un ingrédient"); return; }
  if (!etapesTxt) { afficherToast("⚠️ Ajoute au moins une étape"); return; }

  // Ingrédients : 1 ligne = "Nom : quantité" (ou "Nom - quantité", ou juste "Nom")
  const ingredientsFixes = ingrTxt.split("\n").map(l => l.trim()).filter(Boolean).map(l => {
    // Firestore n'accepte pas les tableaux imbriqués -> on stocke des objets {k, v}
    let i = l.indexOf(":");
    if (i < 0) { const j = l.indexOf(" - "); if (j >= 0) { return { k: l.slice(0, j).trim(), v: l.slice(j + 3).trim() }; } }
    if (i >= 0) return { k: l.slice(0, i).trim(), v: l.slice(i + 1).trim() };
    return { k: l, v: "" };
  });

  // Étapes : 1 ligne = 1 étape
  const etapes = etapesTxt.split("\n").map(l => l.trim()).filter(Boolean).map((l, i) => ({
    icone: (i + 1) + "️⃣", titre: "", detail: l, badge: null
  }));

  const key = "perso_" + Date.now();
  const recetteBase = {
    cat: val("c-cat") || "plats",
    pays: val("c-pays") || "france",
    base: 4,
    temps: val("c-temps") || "—",
    niveau: document.getElementById("c-niveau")?.value || "⭐ Facile",
    emoji: val("c-emoji") || "🍽️",
    description: val("c-desc"),
    nom,
    fixe: true,
    ingredients: {},
    ingredientsFixes,
    etapes,
    dateAjout: new Date().toISOString().slice(0, 10)
  };

  // === Mode COMMUNAUTÉ : envoyer en file de validation (admin) ===
  if (window._contribMode === "communaute") {
    if (!window.currentUser || typeof _db === "undefined" || !_db) { afficherToast("⚠️ Connecte-toi d'abord"); return; }
    const ckey = "com_" + Date.now();
    const prop = Object.assign({}, recetteBase, {
      uid: window.currentUser.uid,
      prenom: (window.userProfile && window.userProfile.prenom) || "Anonyme",
      statut: "en_attente",
      dateProposition: new Date().toISOString()
    });
    try {
      await _db.collection("recettesProposees").doc(ckey).set(prop);
    } catch (e) { console.warn("Envoi proposition échoué :", e); afficherToast("⚠️ Échec de l'envoi"); return; }
    if (typeof afficherToast === "function") afficherToast("🌍 Recette envoyée ! En attente de validation 🙌");
    contribReset();
    contribAfficherMesPropositions();
    if (contribEstAdmin()) chargerModeration();
    return;
  }

  // === Mode PERSO : recette privée (Phase 1) ===
  const recette = Object.assign({}, recetteBase, { perso: true });

  if (!window.userProfile.recettesPerso) window.userProfile.recettesPerso = {};
  window.userProfile.recettesPerso[key] = recette;

  // Sauvegarde Firebase (on réécrit tout l'objet recettesPerso)
  try {
    if (window.currentUser && typeof _db !== "undefined" && _db) {
      await _db.collection("utilisateurs").doc(window.currentUser.uid)
        .set({ recettesPerso: window.userProfile.recettesPerso }, { merge: true });
    }
  } catch (e) { console.warn("Sauvegarde recette perso échouée :", e); }

  fusionnerRecettesPerso();
  if (typeof afficherToast === "function") afficherToast("✅ Recette ajoutée à tes recettes perso !");
  contribReset();
  contribAfficherMesRecettes();
};

// --- Liste "Mes recettes perso" dans le modal ---
window.contribAfficherMesRecettes = function () {
  const box = document.getElementById("c-mes-recettes");
  if (!box) return;
  const perso = (window.userProfile && window.userProfile.recettesPerso) || {};
  const cles = Object.keys(perso);
  if (cles.length === 0) {
    box.innerHTML = `<p class="contrib-vide">Aucune recette perso pour l'instant. Crée la première ! 👆</p>`;
    return;
  }
  box.innerHTML = cles.map(k => {
    const r = perso[k];
    return `<div class="contrib-item">
      <span class="contrib-item-nom">${r.emoji || "🍽️"} ${r.nom || k}</span>
      <span class="contrib-item-actions">
        <button onclick="fermerContribution();ouvrirFiche('${k}', null)" title="Voir la fiche">👁️</button>
        <button onclick="supprimerRecettePerso('${k}')" title="Supprimer">🗑️</button>
      </span>
    </div>`;
  }).join("");
};

// --- Supprimer une recette perso ---
window.supprimerRecettePerso = async function (key) {
  if (!window.userProfile || !window.userProfile.recettesPerso) return;
  let ok = true;
  if (typeof confirmer === "function") ok = await confirmer("Supprimer définitivement cette recette perso ?", { titre: "🗑️ Supprimer" });
  else ok = window.confirm("Supprimer cette recette perso ?");
  if (!ok) return;

  delete window.userProfile.recettesPerso[key];
  if (typeof recettes !== "undefined") delete recettes[key];

  try {
    if (window.currentUser && typeof _db !== "undefined" && _db) {
      await _db.collection("utilisateurs").doc(window.currentUser.uid)
        .set({ recettesPerso: window.userProfile.recettesPerso }, { merge: true });
    }
  } catch (e) { console.warn("Suppression recette perso échouée :", e); }

  injecterCartesPerso();
  contribAfficherMesRecettes();
  if (typeof afficherToast === "function") afficherToast("🗑️ Recette supprimée");
};

// Fusion automatique au chargement / à chaque mise à jour du profil
window.addEventListener("profilMisAJour", function () {
  try { fusionnerRecettesPerso(); } catch (e) {}
  try { verifierModeration(); rafraichirBadgeModo(); } catch (e) {}
});

/* ============================================================
   PHASE 2 — Propositions communauté + validation admin
   - recettesProposees  : file d'attente (statut en_attente)
   - recettesCommunaute : recettes validées, publiques (lues par tous)
   ============================================================ */

const CONTRIB_ADMIN_UID = "sQWjiKrOIsdzWr0nCspn3WSkY5D3"; // Jérôme
function contribEstAdmin() {
  if (typeof estAdmin === "function") { try { return estAdmin(); } catch (e) {} }
  return !!(window.currentUser && window.currentUser.uid === CONTRIB_ADMIN_UID);
}

// Mode du formulaire : "perso" ou "communaute"
window._contribMode = "perso";
window.contribSetMode = function (mode, btn) {
  window._contribMode = mode;
  document.querySelectorAll(".contrib-mode-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  const sub = document.getElementById("contrib-submit-btn");
  if (sub) sub.textContent = (mode === "communaute") ? "🌍 Proposer à la communauté" : "✅ Enregistrer ma recette";
  const note = document.getElementById("contrib-mode-note");
  if (note) note.textContent = (mode === "communaute")
    ? "Ta recette sera envoyée à l'admin pour validation avant d'être visible par tous."
    : "Ta recette restera privée, visible par toi seul.";
};

// --- Charger les recettes validées (publiques) et les fusionner pour TOUS ---
window.chargerRecettesCommunaute = async function () {
  if (typeof _db === "undefined" || !_db) return;
  try {
    const snap = await _db.collection("recettesCommunaute").get();
    const map = {};
    snap.forEach(doc => { const d = doc.data(); if (d) map[doc.id] = d; });
    window._recettesCommunaute = map;
    if (typeof recettes !== "undefined") Object.keys(map).forEach(k => { recettes[k] = map[k]; });
    injecterCartesCommunaute();
  } catch (e) { console.warn("Chargement recettes communauté échoué :", e); }
};

window.injecterCartesCommunaute = function () {
  const section = document.getElementById("section-cartes");
  if (!section) return;
  section.querySelectorAll(".carte[data-com='1']").forEach(c => c.remove());
  const map = window._recettesCommunaute || {};
  Object.entries(map).forEach(([key, r]) => {
    const carte = document.createElement("div");
    carte.className = "carte";
    carte.setAttribute("data-com", "1");
    carte.setAttribute("data-cat", r.cat || "plats");
    carte.setAttribute("data-pays", r.pays || "france");
    carte.setAttribute("onclick", `ouvrirFiche('${key}', null)`);
    carte.innerHTML =
      `<img src="${r.image || "images/" + key + ".webp"}" alt="${r.nom || key}" onerror="this.style.display='none'">
      <span class="carte-badge-com" title="Recette de la communauté — par ${r.prenom || "un membre"}">🌍 ${r.prenom || "Communauté"}</span>
      <div class="carte-info">
        <h2>${r.emoji || "🍽️"} ${r.nom || key}</h2>
        <p>⏱ ${r.temps || ""}${r.niveau ? " • " + r.niveau : ""}</p>
      </div>`;
    section.appendChild(carte);
  });
  try { if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles(); } catch (e) {}
  try { if (typeof appliquerBadgeEtoilesCartes === "function") appliquerBadgeEtoilesCartes(); } catch (e) {}
};

// --- Liste "Mes propositions communauté" (côté utilisateur) ---
window.contribAfficherMesPropositions = async function () {
  const box = document.getElementById("c-mes-propositions");
  if (!box) return;
  if (!window.currentUser || typeof _db === "undefined" || !_db) { box.innerHTML = ""; return; }
  try {
    const snap = await _db.collection("recettesProposees").where("uid", "==", window.currentUser.uid).get();
    if (snap.empty) { box.innerHTML = `<p class="contrib-vide">Aucune proposition en attente.</p>`; return; }
    let html = "";
    snap.forEach(doc => {
      const r = doc.data(); const k = doc.id;
      const precision = r.statut === "precision" && r.questionAdmin;
      html += `<div class="contrib-item">
        <span class="contrib-item-nom">${r.emoji || "🍽️"} ${r.nom || k}</span>
        <span class="contrib-statut ${precision ? "statut-precision" : "statut-attente"}">${precision ? "💬 Précision demandée" : "⏳ En attente"}</span>
      </div>`;
      if (precision) {
        html += `<div class="contrib-precision">
          <div class="contrib-question">💬 <b>Question de l'admin :</b> ${r.questionAdmin}</div>
          <textarea id="c-rep-${k}" class="contrib-rep-input" rows="2" placeholder="Ta réponse (ex : c'est pour 4 personnes)…"></textarea>
          <button class="contrib-rep-btn" onclick="repondrePrecision('${k}')">↩️ Répondre</button>
        </div>`;
      }
    });
    box.innerHTML = html;
  } catch (e) { console.warn(e); box.innerHTML = `<p class="contrib-vide">—</p>`; }
};

// --- L'auteur répond à une demande de précision -> repasse en file de validation ---
window.repondrePrecision = async function (key) {
  if (!window.currentUser || typeof _db === "undefined" || !_db) return;
  const ta = document.getElementById("c-rep-" + key);
  const txt = ((ta && ta.value) || "").trim();
  if (!txt) { if (typeof afficherToast === "function") afficherToast("⚠️ Écris une réponse d'abord"); return; }
  try {
    await _db.collection("recettesProposees").doc(key).update({
      reponseAuteur: txt, statut: "en_attente", dateReponse: new Date().toISOString()
    });
    if (typeof afficherToast === "function") afficherToast("↩️ Réponse envoyée à l'admin !");
    contribAfficherMesPropositions();
  } catch (e) { console.warn("Réponse échouée :", e); if (typeof afficherToast === "function") afficherToast("⚠️ Échec de l'envoi"); }
};

// --- Panneau de modération (admin uniquement) ---
window.chargerModeration = async function () {
  const bloc = document.getElementById("c-moderation");
  const liste = document.getElementById("c-moderation-liste");
  if (!bloc || !liste) return;
  if (!contribEstAdmin()) { bloc.style.display = "none"; return; }
  bloc.style.display = "block";
  if (typeof _db === "undefined" || !_db) return;
  try {
    const snap = await _db.collection("recettesProposees").get();
    if (snap.empty) { liste.innerHTML = `<p class="contrib-vide">Aucune recette à valider 🎉</p>`; return; }
    let html = "";
    snap.forEach(doc => {
      const r = doc.data(); const k = doc.id;
      // Fusionner pour permettre l'aperçu via la fiche (admin uniquement)
      if (typeof recettes !== "undefined") recettes[k] = r;
      const ingr = (r.ingredientsFixes || []).map(p => { const a = Array.isArray(p), n = a ? p[0] : (p && p.k), q = a ? p[1] : (p && p.v); return (n || "") + (q ? " (" + q + ")" : ""); }).join(", ");
      const conv = `${r.questionAdmin ? `<div class="contrib-modo-q">💬 Tu as demandé : <i>${r.questionAdmin}</i></div>` : ""}${r.reponseAuteur ? `<div class="contrib-modo-r">↩️ Réponse de l'auteur : <b>${r.reponseAuteur}</b></div>` : ""}`;
      const badge = r.reponseAuteur ? ` <span class="contrib-statut statut-attente">↩️ a répondu</span>` : (r.statut === "precision" ? ` <span class="contrib-statut statut-precision">💬 en attente de l'auteur</span>` : "");
      html += `<div class="contrib-modo-item">
        <div class="contrib-modo-head">${r.emoji || "🍽️"} <b>${r.nom || k}</b> <span class="contrib-modo-auteur">par ${r.prenom || "?"}</span>${badge}</div>
        ${r.description ? `<div class="contrib-modo-desc">${r.description}</div>` : ""}
        <div class="contrib-modo-ingr">🛒 ${ingr || "—"}</div>
        ${conv}
        <div class="contrib-modo-actions">
          <button onclick="fermerContribution();ouvrirFiche('${k}', null)">👁️ Aperçu</button>
          <button class="modo-ok" onclick="validerProposition('${k}')">✅ Valider</button>
          <button class="modo-no" onclick="refuserProposition('${k}')">❌ Refuser</button>
        </div>
        <div class="contrib-modo-qbox">
          <textarea id="c-q-${k}" class="contrib-rep-input" rows="2" placeholder="Demander une précision à l'auteur (nb de personnes, champ manquant…)"></textarea>
          <button class="contrib-rep-btn" onclick="demanderPrecision('${k}')">💬 Demander une précision</button>
        </div>
      </div>`;
    });
    liste.innerHTML = html;
  } catch (e) { console.warn("Chargement modération échoué :", e); liste.innerHTML = `<p class="contrib-vide">Erreur de chargement</p>`; }
};

// --- Valider une proposition → la publier dans recettesCommunaute ---
window.validerProposition = async function (key) {
  if (!contribEstAdmin() || typeof _db === "undefined" || !_db) return;
  try {
    const ref = _db.collection("recettesProposees").doc(key);
    const snap = await ref.get();
    if (!snap.exists) return;
    const r = snap.data();
    const valid = Object.assign({}, r);
    delete valid.statut; delete valid.dateProposition;
    valid.com = true;
    valid.dateValidation = new Date().toISOString();
    await _db.collection("recettesCommunaute").doc(key).set(valid);
    await ref.delete();
    if (typeof afficherToast === "function") afficherToast("✅ Recette validée et publiée !");
    chargerRecettesCommunaute();
    chargerModeration();
  } catch (e) { console.warn("Validation échouée :", e); if (typeof afficherToast === "function") afficherToast("⚠️ Échec de la validation"); }
};

// --- Refuser une proposition (la supprimer de la file) ---
window.refuserProposition = async function (key) {
  if (!contribEstAdmin() || typeof _db === "undefined" || !_db) return;
  let ok = true;
  if (typeof confirmer === "function") ok = await confirmer("Refuser et supprimer cette proposition ?", { titre: "❌ Refuser" });
  else ok = window.confirm("Refuser cette proposition ?");
  if (!ok) return;
  try {
    await _db.collection("recettesProposees").doc(key).delete();
    if (typeof afficherToast === "function") afficherToast("❌ Proposition refusée");
    chargerModeration();
  } catch (e) { console.warn("Refus échoué :", e); }
};

// --- Admin : demander une précision à l'auteur ---
window.demanderPrecision = async function (key) {
  if (!contribEstAdmin() || typeof _db === "undefined" || !_db) return;
  const ta = document.getElementById("c-q-" + key);
  const txt = ((ta && ta.value) || "").trim();
  if (!txt) { if (typeof afficherToast === "function") afficherToast("⚠️ Écris ta question d'abord"); return; }
  try {
    await _db.collection("recettesProposees").doc(key).update({
      questionAdmin: txt, statut: "precision", reponseAuteur: "", dateQuestion: new Date().toISOString()
    });
    if (typeof afficherToast === "function") afficherToast("💬 Question envoyée à l'auteur");
    chargerModeration();
  } catch (e) { console.warn("Demande de précision échouée :", e); if (typeof afficherToast === "function") afficherToast("⚠️ Échec de l'envoi"); }
};

/* ============================================================
   VOYANT ADMIN — recettes communautaires en attente de modération
   Bouton bleu sous la connexion + toast quand une nouvelle arrive.
   ============================================================ */
let _modoUnsub = null;
let _modoAtt = -1;   // recettes en attente de validation admin
let _modoPrec = 0;   // recettes en "précision demandée" (attente de l'auteur)

function ensureBadgeModo() {
  let b = document.getElementById("badge-modo");
  if (!b) {
    const z = document.getElementById("zone-utilisateur");
    if (!z) return null;
    b = document.createElement("button");
    b.id = "badge-modo";
    b.className = "badge-modo";
    b.style.display = "none";
    z.appendChild(b);
  }
  b.onclick = window.ouvrirModeration;
  return b;
}

window.rafraichirBadgeModo = function () {
  const b = ensureBadgeModo();
  if (!b) return;
  const att = Math.max(_modoAtt, 0);
  if (contribEstAdmin() && (att + _modoPrec) > 0) {
    b.style.display = "";
    const parts = [];
    if (att > 0) parts.push("🔔 " + att + " à valider");
    if (_modoPrec > 0) parts.push("💬 " + _modoPrec + " précision" + (_modoPrec > 1 ? "s" : ""));
    b.textContent = parts.join(" · ");
  } else {
    b.style.display = "none";
  }
};

window.verifierModeration = function () {
  // Non-admin : pas de voyant, on coupe l'écoute éventuelle
  if (!contribEstAdmin() || typeof _db === "undefined" || !_db) {
    if (_modoUnsub) { try { _modoUnsub(); } catch (e) {} _modoUnsub = null; }
    _modoAtt = -1; _modoPrec = 0;
    const b = document.getElementById("badge-modo"); if (b) b.style.display = "none";
    return;
  }
  if (_modoUnsub) return; // déjà à l'écoute
  try {
    _modoUnsub = _db.collection("recettesProposees").onSnapshot(snap => {
      // "à valider" (attente admin) vs "précision" (attente de l'auteur)
      let att = 0, prec = 0;
      snap.forEach(d => { if ((d.data().statut || "en_attente") === "precision") prec++; else att++; });
      const nouvelle = (_modoAtt >= 0 && att > _modoAtt); // nouvelle proposition OU l'auteur a répondu
      _modoAtt = att; _modoPrec = prec;
      rafraichirBadgeModo();
      if (nouvelle && typeof afficherToast === "function") {
        afficherToast("🔔 Une recette communautaire attend ta validation !");
      }
    }, err => { console.warn("verifierModeration :", err); });
  } catch (e) { console.warn("verifierModeration :", e); }
};

// Ouvre la contribution et fait défiler jusqu'au panneau de modération
window.ouvrirModeration = function () {
  if (typeof ouvrirContribution === "function") ouvrirContribution();
  setTimeout(() => {
    const el = document.getElementById("c-moderation");
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 250);
};

// Tentative initiale (si déjà connecté en admin au chargement)
window.addEventListener("load", function () {
  setTimeout(() => { try { verifierModeration(); rafraichirBadgeModo(); } catch (e) {} }, 1500);
});
