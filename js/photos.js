// =============================================================================
// 📸 photos.js — Photos des plats par les utilisateurs (preuve sociale)
// -----------------------------------------------------------------------------
// Sur chaque fiche : galerie des photos « j'ai testé » + bouton pour ajouter la
// sienne. Stockage : Firebase Storage (photos compressées) + métadonnées dans
// Firestore (collection photos_recettes). Modération : suppression par l'auteur
// ou l'admin, et signalement (masqué après signalement, l'admin garde la main).
// Nécessite : Storage activé + règles Storage/Firestore (voir worker?/README).
// Bilingue + thème clair/sombre.
// =============================================================================

(function () {
  const EN = () => window.LANG === "en";
  const T = (fr, en) => (EN() ? en : fr);
  const admin = () => { try { return typeof estAdmin === "function" && estAdmin(); } catch (e) { return false; } };
  const db = () => firebase.firestore();
  const storage = () => firebase.storage();

  // Compresse une image (File) → Blob JPEG (≤ maxDim px).
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
      .photo-item .photo-auteur{position:absolute;left:0;right:0;bottom:0;font-size:11px;color:#fff;
        background:linear-gradient(transparent,rgba(0,0,0,.7));padding:10px 6px 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .photo-item .photo-del,.photo-item .photo-sig{position:absolute;top:5px;border:none;border-radius:50%;
        width:26px;height:26px;font-size:12px;cursor:pointer;background:rgba(0,0,0,.55);color:#fff;line-height:1}
      .photo-item .photo-del{right:5px}.photo-item .photo-sig{left:5px;opacity:.85}
      .photo-item .photo-flagged{position:absolute;top:5px;left:5px;font-size:13px}
      .photos-vide{color:var(--text-3);font-size:13px;padding:6px 0}
    `;
    document.head.appendChild(s);
  }

  async function charger(cle, conteneur) {
    const grid = conteneur.querySelector(".photos-grid");
    if (!grid) return;
    grid.innerHTML = '<div class="photos-vide">' + T("Chargement…", "Loading…") + "</div>";
    let docs = [];
    try {
      const q = await db().collection("photos_recettes").where("cle", "==", cle).orderBy("ts", "desc").limit(30).get();
      q.forEach((d) => docs.push(Object.assign({ id: d.id }, d.data())));
    } catch (e) {
      // Repli si l'index composite n'existe pas encore : tri côté client.
      try {
        const q = await db().collection("photos_recettes").where("cle", "==", cle).limit(30).get();
        q.forEach((d) => docs.push(Object.assign({ id: d.id }, d.data())));
        docs.sort((a, b) => (b.ts || 0) - (a.ts || 0));
      } catch (e2) { grid.innerHTML = '<div class="photos-vide">' + T("Photos indisponibles pour le moment.", "Photos unavailable right now.") + "</div>"; return; }
    }
    const adm = admin();
    const visibles = docs.filter((d) => adm || !d.signale);
    if (!visibles.length) { grid.innerHTML = '<div class="photos-vide">' + T("Sois le premier à partager ta photo ! 📸", "Be the first to share your photo! 📸") + "</div>"; return; }
    grid.innerHTML = visibles.map((d) => {
      const moi = window.currentUser && d.uid === window.currentUser.uid;
      const del = (moi || adm) ? '<button class="photo-del" data-id="' + d.id + '" data-path="' + (d.path || "") + '" title="' + T("Supprimer", "Delete") + '">🗑️</button>' : "";
      const sig = (!moi && !d.signale) ? '<button class="photo-sig" data-id="' + d.id + '" title="' + T("Signaler", "Report") + '">🚩</button>' : "";
      const flag = (adm && d.signale) ? '<span class="photo-flagged" title="' + T("Signalée", "Reported") + '">🚩</span>' : "";
      return '<div class="photo-item"><img loading="lazy" src="' + d.url + '" alt="photo">' + flag + del + sig +
        (d.nom ? '<span class="photo-auteur">' + d.nom + "</span>" : "") + "</div>";
    }).join("");
    grid.querySelectorAll(".photo-del").forEach((b) => b.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!confirm(T("Supprimer cette photo ?", "Delete this photo?"))) return;
      await supprimer(b.dataset.id, b.dataset.path);
      charger(cle, conteneur);
    }));
    grid.querySelectorAll(".photo-sig").forEach((b) => b.addEventListener("click", async (e) => {
      e.stopPropagation();
      try { await db().collection("photos_recettes").doc(b.dataset.id).update({ signale: true }); } catch (e2) {}
      if (typeof afficherToast === "function") afficherToast(T("Merci, la photo a été signalée 🚩", "Thanks, the photo was reported 🚩"));
      charger(cle, conteneur);
    }));
  }

  async function supprimer(id, path) {
    try { if (path) await storage().ref(path).delete(); } catch (e) {}
    try { await db().collection("photos_recettes").doc(id).delete(); } catch (e) {}
  }

  async function envoyer(cle, file, conteneur) {
    if (!window.currentUser) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); else if (typeof afficherToast === "function") afficherToast(T("Connecte-toi pour ajouter une photo", "Sign in to add a photo")); return; }
    if (!file || !/^image\//.test(file.type)) return;
    if (typeof afficherToast === "function") afficherToast(T("Envoi de ta photo… 📤", "Uploading your photo… 📤"));
    try {
      const blob = await compresser(file);
      const path = "photos/" + cle + "/" + window.currentUser.uid + "_" + Date.now() + ".jpg";
      const ref = storage().ref(path);
      await ref.put(blob, { contentType: "image/jpeg" });
      const url = await ref.getDownloadURL();
      const prof = window.userProfile || {};
      const nom = prof.prenom || prof.pseudo || window.currentUser.displayName || (window.currentUser.email || "").split("@")[0] || "Chef";
      await db().collection("photos_recettes").add({ cle: cle, uid: window.currentUser.uid, nom: nom, url: url, path: path, signale: false, ts: Date.now() });
      if (typeof afficherToast === "function") afficherToast(T("📸 Merci pour ta photo !", "📸 Thanks for your photo!"));
      charger(cle, conteneur);
    } catch (e) {
      if (typeof afficherToast === "function") afficherToast(T("Échec de l'envoi 😕 (réessaie)", "Upload failed 😕 (try again)"));
    }
  }

  // Coquille injectée dans la fiche (peuplée après le rendu).
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
