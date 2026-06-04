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
    _toastCom("Connecte-toi pour partager une astuce 🙂");
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
        '<h3 style="color:#fff;font-size:17px;margin:0 0 4px">✍️ Partager mon astuce</h3>' +
        '<p style="color:#b3b0b8;font-size:13px;margin:0 0 12px">Ton astuce sera visible après validation. Sois sympa et utile 🙂</p>' +
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
  if (!window.currentUser) { _toastCom("Connecte-toi pour partager une astuce 🙂"); return; }
  const texte = (ta.value || "").trim();
  if (texte.length < 3) { _toastCom("Ton astuce est un peu courte 🙂"); return; }
  if (texte.length > 500) { _toastCom("Ton astuce est trop longue (500 max)"); return; }
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
    _toastCom("Merci ! Ton astuce sera visible après validation 💛");
  } catch (e) {
    console.warn("Erreur envoi astuce :", e);
    _toastCom("Impossible d'envoyer ton astuce pour le moment");
  }
}

// =================== AFFICHAGE SUR LA FICHE (astuces publiées) ===================
function htmlSectionAstuces(recetteKey) {
  return (
    '<div id="astuces-fiche" style="margin-top:22px;border-top:1px solid rgba(255,255,255,.1);padding-top:16px">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">' +
        '<span style="font-size:16px;font-weight:600;color:#fff">💬 Astuces de la communauté</span>' +
        '<span id="astuces-compte" style="font-size:12px;color:#ff8fb3;background:rgba(255,77,136,.18);padding:2px 8px;border-radius:20px">0</span>' +
      '</div>' +
      '<button onclick="ouvrirModalAstuce(\'' + recetteKey + '\')" style="width:100%;background:linear-gradient(135deg,#ff4d88,#ff8fb3);color:#fff;border:none;border-radius:12px;padding:11px;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:12px">✍️ Partager mon astuce</button>' +
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
}

async function chargerAstucesPubliees(recetteKey) {
  const db = _dbCom();
  const liste = document.getElementById("astuces-liste");
  const compte = document.getElementById("astuces-compte");
  if (!db || !liste) return;
  try {
    const snap = await db.collection("astuces")
      .where("recetteKey", "==", recetteKey)
      .where("statut", "==", "publie")
      .get();
    const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    if (compte) compte.textContent = arr.length;
    if (arr.length === 0) {
      liste.innerHTML = '<p style="color:#88858f;font-size:13px;text-align:center">Aucune astuce pour l\'instant — sois le premier ! 🙂</p>';
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
  } catch (e) {
    console.warn("Erreur chargement astuces :", e);
    liste.innerHTML = '<p style="color:#88858f;font-size:13px;text-align:center">Astuces indisponibles pour le moment</p>';
  }
}

function _echapCom(s) {
  return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// =================== MODÉRATION (admin) ===================
async function chargerAstucesModeration() {
  const zone = document.getElementById("admin-moderation-astuces");
  if (!zone) return;
  if (!_estAdminCom()) { zone.innerHTML = ""; return; }
  const db = _dbCom();
  if (!db) return;
  if (typeof chargerAstucesPubliesAdmin === "function") chargerAstucesPubliesAdmin();
  zone.innerHTML = '<p style="color:#88858f;font-size:13px">Chargement…</p>';
  try {
    const snap = await db.collection("astuces").where("statut", "==", "en_attente").get();
    const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    if (arr.length === 0) {
      zone.innerHTML = '<p style="color:#7fc783;font-size:13px">✅ Aucune astuce à valider — tout est propre !</p>';
      return;
    }
    zone.innerHTML = arr.map(a => {
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
  } catch (e) {
    console.warn("Erreur modération astuces :", e);
    zone.innerHTML = '<p style="color:#e8867d;font-size:13px">Erreur de chargement</p>';
  }
}

window.approuverAstuce = async function (id) {
  const db = _dbCom();
  if (!db || !_estAdminCom()) return;
  try {
    await db.collection("astuces").doc(id).update({ statut: "publie", dateValidation: new Date().toISOString() });
    _toastCom("✅ Astuce publiée");
    chargerAstucesModeration();
  } catch (e) { console.warn(e); _toastCom("Erreur lors de la validation"); }
};

window.refuserAstuce = async function (id) {
  const db = _dbCom();
  if (!db || !_estAdminCom()) return;
  const ok = (typeof confirmerAction === "function")
    ? await confirmerAction("Refuser et supprimer cette astuce ?")
    : confirm("Refuser et supprimer cette astuce ?");
  if (!ok) return;
  try {
    await db.collection("astuces").doc(id).delete();
    _toastCom("❌ Astuce refusée");
    chargerAstucesModeration();
  } catch (e) { console.warn(e); _toastCom("Erreur lors du refus"); }
};

// Supprimer une astuce DÉJÀ PUBLIÉE (validée par erreur, contenu limite, etc.) — admin
window.supprimerAstuce = async function (id) {
  const db = _dbCom();
  if (!db || !_estAdminCom()) return;
  const ok = (typeof confirmerAction === "function")
    ? await confirmerAction("Supprimer définitivement cette astuce publiée ?")
    : confirm("Supprimer définitivement cette astuce publiée ?");
  if (!ok) return;
  try {
    await db.collection("astuces").doc(id).delete();
    _toastCom("🗑️ Astuce supprimée");
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
    if (arr.length === 0) {
      zone.innerHTML = '<p style="color:#88858f;font-size:13px">Aucune astuce publiée pour l\'instant.</p>';
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

// =================== BADGE LIVE (onglet Admin) ===================
let _astucesUnsub = null;
let _astucesAtt = 0;
function majBadgeAstuces(n) {
  const b = document.getElementById("nav-admin-badge");
  if (!b) return;
  _astucesAtt = n;
  if (_estAdminCom() && n > 0) { b.textContent = n; b.style.display = ""; }
  else b.style.display = "none";
}
window.verifierBadgeAstuces = function () {
  const db = _dbCom();
  if (!_estAdminCom() || !db) {
    if (_astucesUnsub) { try { _astucesUnsub(); } catch (e) {} _astucesUnsub = null; }
    majBadgeAstuces(0);
    return;
  }
  if (_astucesUnsub) return; // déjà à l'écoute
  try {
    _astucesUnsub = db.collection("astuces").where("statut", "==", "en_attente")
      .onSnapshot(snap => { majBadgeAstuces(snap.size); }, err => console.warn("badge astuces:", err));
  } catch (e) { console.warn(e); }
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
