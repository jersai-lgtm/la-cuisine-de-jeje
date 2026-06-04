// ============================================================
// community.js — Astuces communautaires sur les recettes (v1.2.0)
// Pré-modération : toute astuce est "en_attente" et invisible jusqu'à
// validation par l'admin (toi). Calqué sur le pattern recettesProposees.
//
// Collection Firestore : "astuces"
//   { recetteKey, uid, pseudo, texte, statut:"en_attente"|"publie", date }
// Sécurité réelle = règles Firestore (voir firestore.rules).
// ============================================================

// --- Accès Firestore (même convention que app_avis.js / app_contribution.js) ---
function _dbCom() {
  if (typeof _db !== "undefined" && _db) return _db;
  try { return (window.firebase && firebase.firestore) ? firebase.firestore() : null; } catch (e) { return null; }
}
function _estAdminCom() {
  if (typeof estAdmin === "function") { try { return estAdmin(); } catch (e) {} }
  return false;
}
function _toastCom(msg) {
  if (typeof afficherToast === "function") afficherToast(msg);
  else alert(msg);
}

// --- Filtre de gros mots (1er rempart — l'admin valide quand même tout) ---
const COMMUNITY_MOTS_INTERDITS = [
  "connard","connasse","enculé","encule","enfoiré","enfoire","salope","salaud","pute","putain",
  "pd","tapette","negre","nègre","bougnoule","pédé","pede","batard","bâtard","ntm","fdp",
  "bite","couilles","chatte","cul","baiser","baise","sucer","nique","niquer","pénis","penis",
  "vagin","sexe","porno","porn","zboub","teub","salopard","merde","con","conne"
];
function _normCom(s) {
  return String(s || "").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function contientMotInterdit(texte) {
  const t = " " + _normCom(texte).replace(/[^a-z0-9]+/g, " ") + " ";
  return COMMUNITY_MOTS_INTERDITS.some(m => t.includes(" " + _normCom(m) + " "));
}

function astucePseudo() {
  const u = window.currentUser;
  if (!u) return "Gourmand";
  const dn = (u.displayName || "").trim();
  if (dn) return dn.split(" ")[0];
  if (window.userProfile && window.userProfile.pseudo) return window.userProfile.pseudo;
  return "Gourmand";
}

// =================== AJOUT D'UNE ASTUCE (utilisateur) ===================
function ouvrirModalAstuce(recetteKey) {
  if (!window.currentUser) {
    _toastCom("Connecte-toi pour partager un commentaire 🙂");
    if (typeof ouvrirModalAuth === "function") ouvrirModalAuth();
    return;
  }
  window._astuceRecetteKey = recetteKey;
  let modal = document.getElementById("modal-astuce");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-astuce";
    modal.setAttribute("style", "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:18px");
    modal.onclick = (e) => { if (e.target === modal) fermerModalAstuce(); };
    modal.innerHTML =
      '<div style="background:#211e26;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:18px;max-width:420px;width:100%">' +
        '<h3 style="color:#fff;font-size:17px;margin:0 0 4px">✍️ Partager mon commentaire</h3>' +
        '<p style="color:#b3b0b8;font-size:13px;margin:0 0 12px">Ton commentaire sera visible après validation. Sois sympa et utile 🙂</p>' +
        '<textarea id="astuce-texte" maxlength="500" rows="4" placeholder="Ex : j\'ai mis moins de sucre et un peu de cannelle, top !" oninput="majCompteurAstuce()" style="width:100%;box-sizing:border-box;background:#17151c;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:10px;font-size:14px;resize:vertical"></textarea>' +
        '<div id="astuce-compteur" style="text-align:right;color:#88858f;font-size:11px;margin-top:4px">0 / 500</div>' +
        '<div style="display:flex;gap:10px;margin-top:12px">' +
          '<button onclick="fermerModalAstuce()" style="flex:1;background:rgba(255,255,255,.08);color:#fff;border:none;border-radius:12px;padding:11px;font-size:14px;font-weight:500">Annuler</button>' +
          '<button onclick="envoyerAstuce()" style="flex:1;background:#ff4d88;color:#fff;border:none;border-radius:12px;padding:11px;font-size:14px;font-weight:500">Envoyer</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
  }
  const ta = document.getElementById("astuce-texte");
  if (ta) { ta.value = ""; }
  majCompteurAstuce();
  modal.style.display = "flex";
}
function fermerModalAstuce() {
  const m = document.getElementById("modal-astuce");
  if (m) m.style.display = "none";
}
function majCompteurAstuce() {
  const ta = document.getElementById("astuce-texte");
  const c = document.getElementById("astuce-compteur");
  if (ta && c) c.textContent = (ta.value || "").length + " / 500";
}

async function envoyerAstuce() {
  const db = _dbCom();
  const ta = document.getElementById("astuce-texte");
  const recetteKey = window._astuceRecetteKey;
  if (!db || !ta || !recetteKey) return;
  if (!window.currentUser) { _toastCom("Connecte-toi pour partager un commentaire 🙂"); return; }
  const texte = (ta.value || "").trim();
  if (texte.length < 3) { _toastCom("Ton commentaire est un peu court 🙂"); return; }
  if (texte.length > 500) { _toastCom("Ton commentaire est trop long (500 max)"); return; }
  if (contientMotInterdit(texte)) { _toastCom("Oups, ton message contient des mots non autorisés 🚫"); return; }
  try {
    await db.collection("astuces").add({
      recetteKey: recetteKey,
      uid: window.currentUser.uid,
      pseudo: astucePseudo(),
      texte: texte,
      statut: "en_attente",
      date: new Date().toISOString()
    });
    fermerModalAstuce();
    _toastCom("Merci ! Ton commentaire sera visible après validation 💛");
  } catch (e) {
    console.warn("Erreur envoi astuce :", e);
    _toastCom("Impossible d'envoyer ton commentaire pour le moment");
  }
}

// =================== AFFICHAGE SUR LA FICHE (astuces publiées) ===================
function htmlSectionAstuces(recetteKey) {
  return (
    '<div id="astuces-fiche" style="margin-top:22px;border-top:1px solid rgba(255,255,255,.1);padding-top:16px">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
        '<span style="font-size:16px;font-weight:600;color:#fff">💬 Commentaires de la communauté</span>' +
        '<span id="astuces-compte" style="font-size:12px;color:#ff8fb3;background:rgba(255,77,136,.18);padding:2px 8px;border-radius:20px">0</span>' +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-bottom:12px">' +
        '<button onclick="ouvrirModalAstuce(\'' + recetteKey + '\')" style="flex:1;background:linear-gradient(135deg,#ff4d88,#ff8fb3);color:#fff;border:none;border-radius:12px;padding:11px;font-size:13px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:5px">✍️ Commentaire</button>' +
        '<button onclick="ouvrirSelecteurPhoto(\'' + recetteKey + '\')" style="flex:1;background:linear-gradient(135deg,#5a6ee0,#8a9bf0);color:#fff;border:none;border-radius:12px;padding:11px;font-size:13px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:5px">📷 Photo</button>' +
      '</div>' +
      '<div id="photos-galerie" style="margin-bottom:12px"></div>' +
      '<div id="astuces-liste"><p style="color:#88858f;font-size:13px;text-align:center">Chargement…</p></div>' +
    '</div>'
  );
}

// Greffe la section dans la fiche (#resultat) puis charge les astuces publiées
function renderAstucesFiche(recetteKey) {
  const hote = document.getElementById("modal-resultat");
  if (!hote || !recetteKey) return;
  window._ficheAstucesKey = recetteKey;
  if (document.getElementById("astuces-fiche")) document.getElementById("astuces-fiche").remove();
  hote.insertAdjacentHTML("beforeend", htmlSectionAstuces(recetteKey));
  chargerAstucesPubliees(recetteKey);
  if (typeof chargerPhotosPubliees === "function") chargerPhotosPubliees(recetteKey);
}

function chargerAstucesPubliees(recetteKey) {
  const db = _dbCom();
  if (!db || !document.getElementById("astuces-liste")) return;
  // Désabonnement de l'écouteur précédent (autre recette / réouverture)
  if (window._unsubAstucesFiche) { try { window._unsubAstucesFiche(); } catch (e) {} window._unsubAstucesFiche = null; }
  const rendre = (arr) => {
    const liste = document.getElementById("astuces-liste");
    const compte = document.getElementById("astuces-compte");
    if (!liste) return;
    if (compte) compte.textContent = arr.length;
    if (arr.length === 0) {
      liste.innerHTML = '<p style="color:#88858f;font-size:13px;text-align:center">Aucun commentaire pour l\'instant — sois le premier ! 🙂</p>';
      return;
    }
    liste.innerHTML = arr.map(a => {
      const init = (a.pseudo || "?").substring(0, 2).toUpperCase();
      const texte = _echapCom(a.texte);
      const delBtn = _estAdminCom()
        ? '<button onclick="supprimerAstuce(\'' + a.id + '\')" aria-label="Supprimer" title="Supprimer (admin)" style="margin-left:auto;background:rgba(226,87,76,.15);color:#e8867d;border:1px solid rgba(226,87,76,.4);border-radius:8px;padding:3px 9px;font-size:13px;cursor:pointer">🗑️</button>'
        : '';
      return '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:10px 12px;margin-bottom:8px">' +
        '<div style="display:flex;align-items:center;gap:8px">' +
          '<div style="width:28px;height:28px;border-radius:50%;background:#5a6ee0;color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex:none">' + init + '</div>' +
          '<span style="font-size:13px;font-weight:600;color:#fff">' + _echapCom(a.pseudo || "Gourmand") + '</span>' + delBtn +
        '</div>' +
        '<p style="font-size:13px;color:#cfccd4;margin:8px 0 0;line-height:1.5">' + texte + '</p>' +
      '</div>';
    }).join("");
  };
  try {
    window._unsubAstucesFiche = db.collection("astuces")
      .where("recetteKey", "==", recetteKey)
      .where("statut", "==", "publie")
      .onSnapshot(snap => {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
        rendre(arr);
      }, err => { console.warn("Astuces live :", err); });
  } catch (e) { console.warn(e); }
}

function _echapCom(s) {
  return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// =================== MODÉRATION (admin) ===================
async function chargerAstucesModeration() {
  const zone = document.getElementById("admin-moderation-astuces");
  if (!zone) return;
  if (!_estAdminCom()) {
    zone.innerHTML = "";
    if (window._unsubAstucesModo) { try { window._unsubAstucesModo(); } catch (e) {} window._unsubAstucesModo = null; }
    return;
  }
  const db = _dbCom();
  if (!db) return;
  if (typeof chargerAstucesPubliesAdmin === "function") chargerAstucesPubliesAdmin();
  if (window._unsubAstucesModo) { try { window._unsubAstucesModo(); } catch (e) {} window._unsubAstucesModo = null; }
  zone.innerHTML = '<p style="color:#88858f;font-size:13px">Chargement…</p>';
  const rendre = (arr) => {
    const z = document.getElementById("admin-moderation-astuces");
    if (!z) return;
    if (arr.length === 0) {
      z.innerHTML = '<p style="color:#7fc783;font-size:13px">✅ Aucun commentaire à valider — tout est propre !</p>';
      return;
    }
    z.innerHTML = arr.map(a => {
      const nomRec = (typeof getNomRecette === "function" ? getNomRecette(a.recetteKey) : "") || a.recetteKey;
      return '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:12px;margin-bottom:10px">' +
        '<div style="font-size:12px;color:#88858f;margin-bottom:6px">' + _echapCom(a.pseudo || "Gourmand") + ' · sur <strong style="color:#ff8fb3">' + _echapCom(nomRec) + '</strong></div>' +
        '<p style="font-size:14px;color:#fff;margin:0 0 10px;line-height:1.5">' + _echapCom(a.texte) + '</p>' +
        '<div style="display:flex;gap:8px">' +
          '<button onclick="approuverAstuce(\'' + a.id + '\')" style="flex:1;background:rgba(76,175,80,.18);color:#7fc783;border:1px solid rgba(76,175,80,.5);border-radius:10px;padding:9px;font-size:13px;font-weight:500">✅ Approuver</button>' +
          '<button onclick="refuserAstuce(\'' + a.id + '\')" style="flex:1;background:rgba(226,87,76,.15);color:#e8867d;border:1px solid rgba(226,87,76,.5);border-radius:10px;padding:9px;font-size:13px;font-weight:500">❌ Refuser</button>' +
        '</div>' +
      '</div>';
    }).join("");
  };
  try {
    window._unsubAstucesModo = db.collection("astuces").where("statut", "==", "en_attente")
      .onSnapshot(snap => {
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
        rendre(arr);
      }, err => {
        console.warn("Modération astuces live :", err);
        const z = document.getElementById("admin-moderation-astuces");
        if (z) z.innerHTML = '<p style="color:#e8867d;font-size:13px">Erreur de chargement</p>';
      });
  } catch (e) { console.warn(e); }
}

window.approuverAstuce = async function (id) {
  const db = _dbCom();
  if (!db || !_estAdminCom()) return;
  try {
    await db.collection("astuces").doc(id).update({ statut: "publie", dateValidation: new Date().toISOString() });
    _toastCom("✅ Commentaire publié");
    chargerAstucesModeration();
  } catch (e) { console.warn(e); _toastCom("Erreur lors de la validation"); }
};

window.refuserAstuce = async function (id) {
  const db = _dbCom();
  if (!db || !_estAdminCom()) return;
  const ok = (typeof confirmerAction === "function")
    ? await confirmerAction("Refuser et supprimer ce commentaire ?")
    : confirm("Refuser et supprimer ce commentaire ?");
  if (!ok) return;
  try {
    await db.collection("astuces").doc(id).delete();
    _toastCom("❌ Commentaire refusé");
    chargerAstucesModeration();
  } catch (e) { console.warn(e); _toastCom("Erreur lors du refus"); }
};

// Supprimer une astuce DÉJÀ PUBLIÉE (validée par erreur, contenu limite, etc.) — admin
window.supprimerAstuce = async function (id) {
  const db = _dbCom();
  if (!db || !_estAdminCom()) return;
  const ok = (typeof confirmerAction === "function")
    ? await confirmerAction("Supprimer définitivement ce commentaire publié ?")
    : confirm("Supprimer définitivement ce commentaire publié ?");
  if (!ok) return;
  try {
    await db.collection("astuces").doc(id).delete();
    _toastCom("🗑️ Commentaire supprimé");
    if (typeof chargerAstucesModeration === "function") chargerAstucesModeration();
    if (window._ficheAstucesKey) chargerAstucesPubliees(window._ficheAstucesKey);
  } catch (e) { console.warn(e); _toastCom("Erreur lors de la suppression"); }
};

// Liste de TOUTES les astuces publiées (onglet Admin) avec bouton supprimer
async function chargerAstucesPubliesAdmin() {
  const zone = document.getElementById("admin-astuces-publiees");
  if (!zone) return;
  if (!_estAdminCom()) { zone.innerHTML = ""; return; }
  const db = _dbCom();
  if (!db) return;
  try {
    const snap = await db.collection("astuces").where("statut", "==", "publie").get();
    const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    _setCnt("cnt-astuces-pub", arr.length);
    if (arr.length === 0) {
      zone.innerHTML = '<p style="color:#88858f;font-size:13px">Aucun commentaire publié pour l\'instant.</p>';
      return;
    }
    zone.innerHTML = arr.map(a => {
      const nomRec = (typeof getNomRecette === "function" ? getNomRecette(a.recetteKey) : "") || a.recetteKey;
      return '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:12px;margin-bottom:10px">' +
        '<div style="font-size:12px;color:#88858f;margin-bottom:6px">' + _echapCom(a.pseudo || "Gourmand") + ' · sur <strong style="color:#ff8fb3">' + _echapCom(nomRec) + '</strong></div>' +
        '<p style="font-size:14px;color:#fff;margin:0 0 10px;line-height:1.5">' + _echapCom(a.texte) + '</p>' +
        '<button onclick="supprimerAstuce(\'' + a.id + '\')" style="background:rgba(226,87,76,.15);color:#e8867d;border:1px solid rgba(226,87,76,.5);border-radius:10px;padding:8px 14px;font-size:13px;font-weight:500;cursor:pointer">🗑️ Supprimer</button>' +
      '</div>';
    }).join("");
  } catch (e) {
    console.warn("Erreur astuces publiées :", e);
    zone.innerHTML = '<p style="color:#e8867d;font-size:13px">Erreur de chargement</p>';
  }
}
window.chargerAstucesPubliesAdmin = chargerAstucesPubliesAdmin;

// =================== PHOTOS COMMUNAUTAIRES (Firebase Storage) ===================
var PHOTO_MAX_DIM = 1280;                          // côté max après redimensionnement
var PHOTO_QUALITE = 0.72;                          // qualité JPEG initiale
var PHOTO_CIBLE_OCTETS = 900 * 1024;               // on vise < ~900 Ko
var PHOTO_PLAFOND_OCTETS = 5 * 1024 * 1024 - 50 * 1024; // marge sous la règle Storage (5 Mo)
var PHOTO_SOURCE_MAX = 15 * 1024 * 1024;           // refus des originaux > 15 Mo
var PHOTO_MAX_PAR_RECETTE = 3;                     // par utilisateur et par recette
var PHOTO_MAX_EN_ATTENTE = 5;                      // par utilisateur, toutes recettes
var PHOTO_MAX_PAR_JOUR = 15;                       // garde-fou local par appareil

function _storageCom() {
  try { if (typeof firebase !== "undefined" && firebase.storage) return firebase.storage(); } catch (e) {}
  return null;
}
function _photoQuotaJour(inc) {
  try {
    var cle = "photo_quota_" + new Date().toISOString().slice(0, 10);
    var n = parseInt(localStorage.getItem(cle) || "0", 10) || 0;
    if (inc) localStorage.setItem(cle, String(n + 1));
    return n;
  } catch (e) { return 0; }
}

// Compression côté téléphone : redimensionne + ré-encode JPEG, baisse la qualité si trop lourd
function compressPhoto(file) {
  return new Promise(function (resolve, reject) {
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () {
      URL.revokeObjectURL(url);
      var w = img.naturalWidth, h = img.naturalHeight;
      if (!w || !h) { reject(new Error("image illisible")); return; }
      var ratio = Math.min(1, PHOTO_MAX_DIM / Math.max(w, h));
      var cw = Math.round(w * ratio), ch = Math.round(h * ratio);
      var canvas = document.createElement("canvas");
      canvas.width = cw; canvas.height = ch;
      canvas.getContext("2d").drawImage(img, 0, 0, cw, ch);
      var q = PHOTO_QUALITE;
      (function essai() {
        canvas.toBlob(function (blob) {
          if (!blob) { reject(new Error("compression échouée")); return; }
          if (blob.size > PHOTO_CIBLE_OCTETS && q > 0.45) { q -= 0.12; essai(); return; }
          resolve(blob);
        }, "image/jpeg", q);
      })();
    };
    img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("fichier non-image")); };
    img.src = url;
  });
}

function ouvrirSelecteurPhoto(recetteKey) {
  if (!window.currentUser) {
    _toastCom("Connecte-toi pour ajouter une photo 🙂");
    if (typeof ouvrirModalAuth === "function") ouvrirModalAuth();
    return;
  }
  if (!_storageCom()) { _toastCom("L'envoi de photos n'est pas disponible pour le moment"); return; }
  if (_photoQuotaJour(false) >= PHOTO_MAX_PAR_JOUR) { _toastCom("Limite de photos atteinte pour aujourd'hui 🙂"); return; }
  var input = document.getElementById("photo-input-cache");
  if (!input) {
    input = document.createElement("input");
    input.type = "file"; input.accept = "image/*"; input.id = "photo-input-cache"; input.style.display = "none";
    document.body.appendChild(input);
  }
  input.onchange = function () {
    var f = input.files && input.files[0];
    input.value = "";
    if (f) envoyerPhoto(f, recetteKey);
  };
  input.click();
}

async function envoyerPhoto(file, recetteKey) {
  var db = _dbCom(), storage = _storageCom();
  if (!db || !storage || !recetteKey || !window.currentUser) return;
  var uid = window.currentUser.uid;

  if (!file.type || file.type.indexOf("image/") !== 0) { _toastCom("Choisis une image (pas de vidéo) 🙂"); return; }
  if (file.size > PHOTO_SOURCE_MAX) { _toastCom("Cette photo est trop lourde (15 Mo max)"); return; }
  if (_photoQuotaJour(false) >= PHOTO_MAX_PAR_JOUR) { _toastCom("Limite de photos atteinte pour aujourd'hui 🙂"); return; }

  // Garde-fous anti-spam (vérifs réelles côté base)
  try {
    var mien = await db.collection("photos").where("uid", "==", uid).get();
    var enAttente = 0, surCetteRecette = 0;
    mien.forEach(function (d) {
      var x = d.data();
      if (x.statut === "en_attente") enAttente++;
      if (x.recetteKey === recetteKey) surCetteRecette++;
    });
    if (enAttente >= PHOTO_MAX_EN_ATTENTE) { _toastCom("Tu as déjà " + PHOTO_MAX_EN_ATTENTE + " photos en attente de validation 🙂"); return; }
    if (surCetteRecette >= PHOTO_MAX_PAR_RECETTE) { _toastCom("Max " + PHOTO_MAX_PAR_RECETTE + " photos par recette 🙂"); return; }
  } catch (e) { console.warn("verif quota photo:", e); }

  _toastCom("Compression de la photo…");
  var blob;
  try { blob = await compressPhoto(file); }
  catch (e) { console.warn(e); _toastCom("Impossible de lire cette image"); return; }
  if (blob.size > PHOTO_PLAFOND_OCTETS) { _toastCom("Photo trop lourde même après compression 🙁"); return; }

  try {
    var nom = Date.now() + "_" + Math.random().toString(36).slice(2, 8) + ".jpg";
    var chemin = "astuces-photos/" + recetteKey + "/" + uid + "/" + nom;
    var ref = storage.ref().child(chemin);
    await ref.put(blob, { contentType: "image/jpeg" });
    var url = await ref.getDownloadURL();
    await db.collection("photos").add({
      recetteKey: recetteKey, uid: uid, pseudo: astucePseudo(),
      url: url, path: chemin, statut: "en_attente", date: new Date().toISOString()
    });
    _photoQuotaJour(true);
    _toastCom("Merci ! Ta photo sera visible après validation 💛");
  } catch (e) {
    console.warn("Erreur envoi photo :", e);
    _toastCom("Impossible d'envoyer la photo pour le moment");
  }
}
window.ouvrirSelecteurPhoto = ouvrirSelecteurPhoto;

// Galerie des photos publiées sur la fiche
function chargerPhotosPubliees(recetteKey) {
  var db = _dbCom();
  if (!db || !document.getElementById("photos-galerie")) return;
  if (window._unsubPhotosFiche) { try { window._unsubPhotosFiche(); } catch (e) {} window._unsubPhotosFiche = null; }
  var rendre = function (arr) {
    var zone = document.getElementById("photos-galerie");
    if (!zone) return;
    if (arr.length === 0) { zone.innerHTML = ""; return; }
    window._photosFiche = arr;
    zone.innerHTML =
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px">' +
      arr.map(function (p) {
        var del = _estAdminCom()
          ? '<button onclick="event.stopPropagation();supprimerPhoto(\'' + p.id + '\')" title="Supprimer (admin)" style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,.55);color:#fff;border:none;border-radius:8px;padding:2px 6px;font-size:12px;cursor:pointer">🗑️</button>'
          : '';
        return '<div style="position:relative;aspect-ratio:1;border-radius:12px;overflow:hidden;background:#17151c">' +
          '<img src="' + p.url + '" loading="lazy" alt="Photo de ' + _echapCom(p.pseudo || "Gourmand") + '" onclick="ouvrirPhotoPleinEcran(\'' + p.id + '\')" style="width:100%;height:100%;object-fit:cover;display:block;cursor:zoom-in">' +
          del +
        '</div>';
      }).join("") +
      '</div>';
  };
  try {
    window._unsubPhotosFiche = db.collection("photos")
      .where("recetteKey", "==", recetteKey)
      .where("statut", "==", "publie")
      .onSnapshot(function (snap) {
        var arr = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); })
          .sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
        rendre(arr);
      }, function (err) { console.warn("Photos live :", err); });
  } catch (e) { console.warn(e); }
}
window.ouvrirPhotoPleinEcran = function (id) {
  var arr = window._photosFiche || [];
  var p = arr.filter(function (x) { return x.id === id; })[0];
  if (!p) return;
  var ov = document.createElement("div");
  ov.setAttribute("style", "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;padding:16px");
  ov.onclick = function () { ov.remove(); };
  ov.innerHTML = '<img src="' + p.url + '" alt="" style="max-width:100%;max-height:100%;border-radius:12px">';
  document.body.appendChild(ov);
};

// --------- Modération photos (admin) ---------
async function chargerPhotosModeration() {
  var zone = document.getElementById("admin-moderation-photos");
  if (!zone) return;
  if (!_estAdminCom()) {
    zone.innerHTML = "";
    if (window._unsubPhotosModo) { try { window._unsubPhotosModo(); } catch (e) {} window._unsubPhotosModo = null; }
    return;
  }
  var db = _dbCom();
  if (!db) return;
  if (typeof chargerPhotosPubliesAdmin === "function") chargerPhotosPubliesAdmin();
  if (window._unsubPhotosModo) { try { window._unsubPhotosModo(); } catch (e) {} window._unsubPhotosModo = null; }
  zone.innerHTML = '<p style="color:#88858f;font-size:13px">Chargement…</p>';
  var rendre = function (arr) {
    var z = document.getElementById("admin-moderation-photos");
    if (!z) return;
    if (arr.length === 0) { z.innerHTML = '<p style="color:#7fc783;font-size:13px">✅ Aucune photo à valider.</p>'; return; }
    z.innerHTML = arr.map(function (p) {
      var nomRec = (typeof getNomRecette === "function" ? getNomRecette(p.recetteKey) : "") || p.recetteKey;
      return '<div style="background:rgba(255,255,255,.05);border-radius:12px;padding:12px;margin-bottom:10px">' +
        '<div style="font-size:12px;color:#88858f;margin-bottom:8px">' + _echapCom(p.pseudo || "Gourmand") + ' · sur <strong style="color:#ff8fb3">' + _echapCom(nomRec) + '</strong></div>' +
        '<img src="' + p.url + '" alt="" style="width:100%;max-height:280px;object-fit:contain;border-radius:10px;background:#17151c;margin-bottom:10px">' +
        '<div style="display:flex;gap:8px">' +
          '<button onclick="approuverPhoto(\'' + p.id + '\')" style="flex:1;background:rgba(76,175,80,.18);color:#7fc783;border:1px solid rgba(76,175,80,.5);border-radius:10px;padding:9px;font-size:13px;font-weight:500">✅ Approuver</button>' +
          '<button onclick="refuserPhoto(\'' + p.id + '\')" style="flex:1;background:rgba(226,87,76,.15);color:#e8867d;border:1px solid rgba(226,87,76,.5);border-radius:10px;padding:9px;font-size:13px;font-weight:500">❌ Refuser</button>' +
        '</div>' +
      '</div>';
    }).join("");
  };
  try {
    window._unsubPhotosModo = db.collection("photos").where("statut", "==", "en_attente")
      .onSnapshot(function (snap) {
        var arr = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); })
          .sort(function (a, b) { return (a.date || "").localeCompare(b.date || ""); });
        rendre(arr);
      }, function (err) {
        console.warn("Modération photos live :", err);
        var z = document.getElementById("admin-moderation-photos");
        if (z) z.innerHTML = '<p style="color:#e8867d;font-size:13px">Erreur de chargement</p>';
      });
  } catch (e) { console.warn(e); }
}
window.chargerPhotosModeration = chargerPhotosModeration;

async function _supprimerFichierStorage(path) {
  if (!path) return;
  var storage = _storageCom();
  if (!storage) return;
  try { await storage.ref().child(path).delete(); }
  catch (e) { console.warn("suppression fichier storage:", e && e.code); }
}

window.approuverPhoto = async function (id) {
  var db = _dbCom();
  if (!db || !_estAdminCom()) return;
  try {
    await db.collection("photos").doc(id).update({ statut: "publie", dateValidation: new Date().toISOString() });
    _toastCom("✅ Photo publiée");
    chargerPhotosModeration();
    if (window._ficheAstucesKey) chargerPhotosPubliees(window._ficheAstucesKey);
  } catch (e) { console.warn(e); _toastCom("Erreur lors de la validation"); }
};
window.refuserPhoto = async function (id) {
  var db = _dbCom();
  if (!db || !_estAdminCom()) return;
  var ok = (typeof confirmerAction === "function") ? await confirmerAction("Refuser et supprimer cette photo ?") : confirm("Refuser et supprimer cette photo ?");
  if (!ok) return;
  try {
    var doc = await db.collection("photos").doc(id).get();
    var path = doc.exists ? (doc.data().path || "") : "";
    await db.collection("photos").doc(id).delete();
    await _supprimerFichierStorage(path);
    _toastCom("❌ Photo refusée");
    chargerPhotosModeration();
  } catch (e) { console.warn(e); _toastCom("Erreur lors du refus"); }
};
window.supprimerPhoto = async function (id) {
  var db = _dbCom();
  if (!db || !_estAdminCom()) return;
  var ok = (typeof confirmerAction === "function") ? await confirmerAction("Supprimer définitivement cette photo ?") : confirm("Supprimer définitivement cette photo ?");
  if (!ok) return;
  try {
    var doc = await db.collection("photos").doc(id).get();
    var path = doc.exists ? (doc.data().path || "") : "";
    await db.collection("photos").doc(id).delete();
    await _supprimerFichierStorage(path);
    _toastCom("🗑️ Photo supprimée");
    if (typeof chargerPhotosModeration === "function") chargerPhotosModeration();
    if (window._ficheAstucesKey) chargerPhotosPubliees(window._ficheAstucesKey);
  } catch (e) { console.warn(e); _toastCom("Erreur lors de la suppression"); }
};

async function chargerPhotosPubliesAdmin() {
  var zone = document.getElementById("admin-photos-publiees");
  if (!zone) return;
  if (!_estAdminCom()) { zone.innerHTML = ""; return; }
  var db = _dbCom();
  if (!db) return;
  try {
    var snap = await db.collection("photos").where("statut", "==", "publie").get();
    var arr = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); })
      .sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
    _setCnt("cnt-photos-pub", arr.length);
    if (arr.length === 0) { zone.innerHTML = '<p style="color:#88858f;font-size:13px">Aucune photo publiée pour l\'instant.</p>'; return; }
    zone.innerHTML =
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px">' +
      arr.map(function (p) {
        var nomRec = (typeof getNomRecette === "function" ? getNomRecette(p.recetteKey) : "") || p.recetteKey;
        return '<div style="position:relative;border-radius:12px;overflow:hidden;background:#17151c">' +
          '<img src="' + p.url + '" loading="lazy" alt="" style="width:100%;aspect-ratio:1;object-fit:cover;display:block">' +
          '<div style="font-size:10px;color:#b3b0b8;padding:3px 5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + _echapCom(nomRec) + '</div>' +
          '<button onclick="supprimerPhoto(\'' + p.id + '\')" title="Supprimer" style="position:absolute;top:4px;right:4px;background:rgba(0,0,0,.55);color:#fff;border:none;border-radius:8px;padding:2px 6px;font-size:12px;cursor:pointer">🗑️</button>' +
        '</div>';
      }).join("") +
      '</div>';
  } catch (e) {
    console.warn("Erreur photos publiées :", e);
    zone.innerHTML = '<p style="color:#e8867d;font-size:13px">Erreur de chargement</p>';
  }
}
window.chargerPhotosPubliesAdmin = chargerPhotosPubliesAdmin;

// =================== BADGE LIVE (onglet Admin) : astuces + recettes proposées ===================
let _astucesUnsub = null, _propsUnsub = null, _photosUnsub = null;
let _cntAstuces = 0, _cntProps = 0, _cntPhotos = 0;
function _setCnt(id, n) {
  var el = document.getElementById(id);
  if (!el) return;
  if (n > 0) { el.textContent = n; el.classList.add("on"); }
  else { el.textContent = ""; el.classList.remove("on"); }
}
function _majBadgeAdminTotal() {
  const b = document.getElementById("nav-admin-badge");
  if (!b) return;
  const n = _cntAstuces + _cntProps + _cntPhotos;
  if (_estAdminCom() && n > 0) { b.textContent = n; b.style.display = ""; }
  else b.style.display = "none";
}
window.verifierBadgeAstuces = function () {
  const db = _dbCom();
  if (!_estAdminCom() || !db) {
    if (_astucesUnsub) { try { _astucesUnsub(); } catch (e) {} _astucesUnsub = null; }
    if (_propsUnsub) { try { _propsUnsub(); } catch (e) {} _propsUnsub = null; }
    if (_photosUnsub) { try { _photosUnsub(); } catch (e) {} _photosUnsub = null; }
    _cntAstuces = 0; _cntProps = 0; _cntPhotos = 0; _majBadgeAdminTotal();
    return;
  }
  if (!_astucesUnsub) {
    try {
      _astucesUnsub = db.collection("astuces").where("statut", "==", "en_attente")
        .onSnapshot(snap => { _cntAstuces = snap.size; _setCnt("cnt-astuces-att", _cntAstuces); _majBadgeAdminTotal(); }, err => console.warn("badge astuces:", err));
    } catch (e) { console.warn(e); }
  }
  if (!_propsUnsub) {
    try {
      _propsUnsub = db.collection("recettesProposees")
        .onSnapshot(snap => {
          let n = 0; snap.forEach(d => { if ((d.data().statut || "en_attente") !== "precision") n++; });
          _cntProps = n; _setCnt("cnt-recettes-att", _cntProps); _majBadgeAdminTotal();
        }, err => console.warn("badge recettes:", err));
    } catch (e) { console.warn(e); }
  }
  if (!_photosUnsub) {
    try {
      _photosUnsub = db.collection("photos").where("statut", "==", "en_attente")
        .onSnapshot(snap => { _cntPhotos = snap.size; _setCnt("cnt-photos-att", _cntPhotos); _majBadgeAdminTotal(); }, err => console.warn("badge photos:", err));
    } catch (e) { console.warn(e); }
  }
};

// Affiche/masque l'onglet Admin selon le rôle, et lance le badge
window.majOngletAdmin = function () {
  const nav = document.getElementById("nav-admin");
  if (nav) nav.style.display = _estAdminCom() ? "" : "none";
  window.verifierBadgeAstuces();
};

// --- Intégration fiche : greffe les astuces après le rendu de la recette ---
(function () {
  if (typeof window.choisirRecette === "function" && !window._choisirPatchedAstuces) {
    const _orig = window.choisirRecette;
    window.choisirRecette = function (nom) {
      const r = _orig.apply(this, arguments);
      try { if (nom && document.getElementById("modal-resultat")) renderAstucesFiche(nom); } catch (e) {}
      return r;
    };
    window._choisirPatchedAstuces = true;
  }
})();

// --- Activer l'onglet Admin + badge à la connexion / mise à jour du profil ---
window.addEventListener("profilMisAJour", function () { try { window.majOngletAdmin(); } catch (e) {} });
document.addEventListener("DOMContentLoaded", function () { try { window.majOngletAdmin(); } catch (e) {} });

// Exposer les fonctions appelées en inline
window.ouvrirModalAstuce = ouvrirModalAstuce;
window.fermerModalAstuce = fermerModalAstuce;
window.majCompteurAstuce = majCompteurAstuce;
window.envoyerAstuce = envoyerAstuce;
window.renderAstucesFiche = renderAstucesFiche;
window.chargerAstucesModeration = chargerAstucesModeration;
window.contientMotInterdit = contientMotInterdit;
