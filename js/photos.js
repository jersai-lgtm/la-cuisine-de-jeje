// =============================================================================
// 📸 photos.js — Photos des plats par les utilisateurs (MODÉRÉES avant publication)
// -----------------------------------------------------------------------------
// Schéma (aligné sur les règles Firebase de Jérôme) :
//   • Storage : astuces-photos/{recetteKey}/{uid}/{fichier}.jpg (image compressée)
//   • Firestore collection "photos" : { recetteKey, uid, url, path, nom,
//       statut: "en_attente" | "publie", date }
//   • Lecture publique uniquement si statut == "publie". L'auteur voit sa photo
//     en attente ; l'admin voit tout et peut ✅ publier / 🗑️ supprimer.
// Réglages Firebase requis : voir firebase-photos-setup.md. Bilingue + thème.
// =============================================================================

(function () {
  const ADMIN_UID = "sQWjiKrOIsdzWr0nCspn3WSkY5D3";
  const EN = () => window.LANG === "en";
  const T = (fr, en) => (EN() ? en : fr);
  const admin = () => {
    if (typeof estAdmin === "function") { try { if (estAdmin()) return true; } catch (e) {} }
    return !!(window.currentUser && window.currentUser.uid === ADMIN_UID);
  };
  const db = () => firebase.firestore();
  const storage = () => firebase.storage();
  const WORKER = "https://la-cuisine-de-jeje.jerome-sainthot.workers.dev";

  function compresser(file, maxDim, q) {
    maxDim = maxDim || 1280; q = q || 0.82;
    return new Promise((res, rej) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        let w = img.width, h = img.height;
        if (w > h) { if (w > maxDim) { h = Math.round(h * maxDim / w); w = maxDim; } }
        else { if (h > maxDim) { w = Math.round(w * maxDim / h); h = maxDim; } }
        const c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        c.toBlob((b) => b ? res(b) : rej(new Error("blob")), "image/jpeg", q);
      };
      img.onerror = rej; img.src = url;
    });
  }

  function injecterStyle() {
    if (document.getElementById("photos-style")) return;
    const s = document.createElement("style");
    s.id = "photos-style";
    s.textContent = `
      .photos-recette .photo-add{display:inline-flex;align-items:center;gap:6px;cursor:pointer;
        background:rgba(var(--accent-rgb),.15);color:var(--accent);border:1px solid rgba(var(--accent-rgb),.5);
        border-radius:10px;padding:7px 13px;font-size:13px;font-weight:700}
      .photos-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}
      .photo-item{position:relative;aspect-ratio:1;border-radius:12px;overflow:hidden;background:rgba(var(--w),.06)}
      .photo-item img{width:100%;height:100%;object-fit:cover;display:block}
      .photo-item.attente img{filter:brightness(.6)}
      .photo-item .photo-auteur{position:absolute;left:0;right:0;bottom:0;font-size:11px;color:#fff;
        background:linear-gradient(transparent,rgba(0,0,0,.7));padding:10px 6px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .photo-item .photo-attente{position:absolute;top:6px;left:6px;right:6px;text-align:center;font-size:10.5px;color:#fff;
        background:rgba(0,0,0,.55);border-radius:8px;padding:3px 4px}
      .photo-item .photo-btns{position:absolute;top:5px;right:5px;display:flex;gap:5px}
      .photo-item .photo-btn{border:none;border-radius:50%;width:26px;height:26px;font-size:12px;cursor:pointer;
        background:rgba(0,0,0,.6);color:#fff;line-height:1}
      .photo-item .photo-btn.ok{background:rgba(76,175,80,.9)}
      .photos-vide{color:var(--text-3);font-size:13px;padding:6px 0}
    `;
    document.head.appendChild(s);
  }

  async function charger(cle, conteneur) {
    const grid = conteneur.querySelector(".photos-grid");
    if (!grid) return;
    grid.innerHTML = '<div class="photos-vide">' + T("Chargement…", "Loading…") + "</div>";
    const col = db().collection("photos");
    const map = {};
    const ajoute = (snap) => snap.forEach((d) => { map[d.id] = Object.assign({ id: d.id }, d.data()); });
    try {
      if (admin()) {
        ajoute(await col.where("recetteKey", "==", cle).get());           // admin voit tout
      } else {
        ajoute(await col.where("recetteKey", "==", cle).where("statut", "==", "publie").get()); // publiées
        if (window.currentUser) {
          ajoute(await col.where("recetteKey", "==", cle).where("uid", "==", window.currentUser.uid).get()); // + mes photos
        }
      }
    } catch (e) {
      grid.innerHTML = '<div class="photos-vide">' + T("Galerie indisponible (config Firebase ?).", "Gallery unavailable (Firebase config?).") + "</div>";
      return;
    }
    const docs = Object.values(map).sort((a, b) => (b.date || 0) - (a.date || 0));
    if (!docs.length) { grid.innerHTML = '<div class="photos-vide">' + T("Sois le premier à partager ta photo ! 📸", "Be the first to share your photo! 📸") + "</div>"; return; }
    const adm = admin();
    grid.innerHTML = docs.map((d) => {
      const moi = window.currentUser && d.uid === window.currentUser.uid;
      const enAttente = d.statut !== "publie";
      let btns = "";
      if (adm && enAttente) btns += '<button class="photo-btn ok" data-act="ok" data-id="' + d.id + '" title="' + T("Publier", "Approve") + '">✓</button>';
      if (moi || adm) btns += '<button class="photo-btn" data-act="del" data-id="' + d.id + '" data-path="' + (d.path || "") + '" title="' + T("Supprimer", "Delete") + '">🗑️</button>';
      const badge = enAttente ? '<div class="photo-attente">' + (moi && !adm ? T("⏳ en validation", "⏳ pending") : T("⏳ à valider", "⏳ to review")) + "</div>" : "";
      return '<div class="photo-item' + (enAttente ? " attente" : "") + '"><img loading="lazy" src="' + d.url + '" alt="photo">' +
        badge + (btns ? '<div class="photo-btns">' + btns + "</div>" : "") +
        (d.nom ? '<span class="photo-auteur">' + d.nom + "</span>" : "") + "</div>";
    }).join("");
    grid.querySelectorAll(".photo-btn").forEach((b) => b.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (b.dataset.act === "ok") {
        try { await db().collection("photos").doc(b.dataset.id).update({ statut: "publie" }); } catch (e2) {}
        if (typeof afficherToast === "function") afficherToast(T("✅ Photo publiée", "✅ Photo published"));
      } else {
        if (!confirm(T("Supprimer cette photo ?", "Delete this photo?"))) return;
        try { if (b.dataset.path) await storage().ref(b.dataset.path).delete(); } catch (e2) {}
        try { await db().collection("photos").doc(b.dataset.id).delete(); } catch (e2) {}
      }
      charger(cle, conteneur);
    }));
  }

  async function pingAdmin(cle) {
    // Alerte Telegram best-effort (si le worker a la route /photo). Non bloquant.
    try {
      if (!window.currentUser || !firebase.auth().currentUser) return;
      const tok = await firebase.auth().currentUser.getIdToken();
      await fetch(WORKER + "/photo", {
        method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + tok },
        body: JSON.stringify({ recetteKey: cle, nom: (typeof getNomRecette === "function" ? getNomRecette(cle) : cle) }),
      });
    } catch (e) {}
  }

  async function envoyer(cle, file, conteneur) {
    if (!window.currentUser) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); else if (typeof afficherToast === "function") afficherToast(T("Connecte-toi pour ajouter une photo", "Sign in to add a photo")); return; }
    if (!file || !/^image\//.test(file.type)) return;
    if (typeof afficherToast === "function") afficherToast(T("Envoi de ta photo… 📤", "Uploading your photo… 📤"));
    try {
      const blob = await compresser(file);
      const uid = window.currentUser.uid;
      const path = "astuces-photos/" + cle + "/" + uid + "/" + Date.now() + ".jpg";
      const ref = storage().ref(path);
      await ref.put(blob, { contentType: "image/jpeg" });
      const url = await ref.getDownloadURL();
      const prof = window.userProfile || {};
      const nom = prof.prenom || prof.pseudo || window.currentUser.displayName || (window.currentUser.email || "").split("@")[0] || "Chef";
      await db().collection("photos").add({ recetteKey: cle, uid: uid, url: url, path: path, nom: nom, statut: "en_attente", date: Date.now() });
      if (typeof afficherToast === "function") afficherToast(T("📸 Merci ! Ta photo sera visible après validation.", "📸 Thanks! Your photo will appear once approved."));
      pingAdmin(cle);
      charger(cle, conteneur);
    } catch (e) {
      if (typeof afficherToast === "function") afficherToast(T("Échec de l'envoi 😕 (réessaie)", "Upload failed 😕 (try again)"));
    }
  }

  window.photosRecetteHTML = function (cle) {
    return '<div class="fiche-section photos-recette" data-cle="' + cle + '">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">' +
      '<h2 class="fiche-section-titre" style="margin:0">' + T("📸 Vos photos", "📸 Your photos") + "</h2>" +
      '<label class="photo-add">📷 ' + T("Ajouter ma photo", "Add my photo") + '<input type="file" accept="image/*" style="display:none"></label>' +
      "</div><div class=\"photos-grid\"></div></div>";
  };

  function activer() {
    const c = document.querySelector("#modal-resultat .photos-recette[data-cle]");
    if (!c || c._pret) return;
    c._pret = true;
    injecterStyle();
    const cle = c.getAttribute("data-cle");
    const input = c.querySelector('input[type="file"]');
    if (input) input.addEventListener("change", () => { const f = input.files && input.files[0]; if (f) envoyer(cle, f, c); input.value = ""; });
    charger(cle, c);
  }

  function brancher() {
    if (typeof window.choisirRecette !== "function") { setTimeout(brancher, 300); return; }
    if (!window.choisirRecette._photos) {
      const orig = window.choisirRecette;
      window.choisirRecette = function () { const r = orig.apply(this, arguments); try { activer(); } catch (e) {} return r; };
      window.choisirRecette._photos = true;
    }
    try { activer(); } catch (e) {}
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(brancher, 0));
  else setTimeout(brancher, 0);
})();
