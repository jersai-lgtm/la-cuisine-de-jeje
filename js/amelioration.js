// =====================================================================
//  Bouton "💡 Amélioration"
//  Permet à n'importe qui de signaler quelque chose à corriger / changer
//  (photo à remplacer, faute, recette à modifier, publication à retirer…).
//  Le message part directement par e-mail sur la boîte dédiée.
// =====================================================================

window.AMELIORATION_EMAIL = "lacuisinedejeje@gmail.com";

window.ouvrirAmelioration = function () {
  let modal = document.getElementById("modal-amelioration");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "modal-amelioration";
    modal.setAttribute("style", "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:18px");
    modal.onclick = (e) => { if (e.target === modal) fermerAmelioration(); };
    modal.innerHTML =
      '<div style="background:#211e26;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:18px;max-width:440px;width:100%;box-sizing:border-box">' +
        '<h3 style="color:#fff;font-size:17px;margin:0 0 4px">💡 Suggérer une amélioration</h3>' +
        '<p style="color:#b3b0b8;font-size:13px;margin:0 0 12px;line-height:1.45">Une idée pour améliorer l\'appli, une modification à apporter, une photo à changer, une faute à corriger ou une publication à retirer ? Dis-moi tout, ça part direct sur ma boîte mail.</p>' +
        '<label style="color:#d7d5db;font-size:12px;display:block;margin:0 0 4px">Sujet concerné <span style="color:#88858f">(appli, recette, photo… — facultatif)</span></label>' +
        '<input id="amelioration-sujet" type="text" maxlength="120" placeholder="Ex : l\'appli en général, la recette Tarte Tatin, une photo…" style="width:100%;box-sizing:border-box;background:#17151c;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:10px;font-size:14px;margin:0 0 12px">' +
        '<label style="color:#d7d5db;font-size:12px;display:block;margin:0 0 4px">Ton message</label>' +
        '<textarea id="amelioration-texte" maxlength="800" rows="4" placeholder="Décris ce qu\'il faudrait modifier, ajouter ou supprimer…" oninput="majCompteurAmelioration()" style="width:100%;box-sizing:border-box;background:#17151c;color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:10px;font-size:14px;resize:vertical"></textarea>' +
        '<div id="amelioration-compteur" style="text-align:right;color:#88858f;font-size:11px;margin-top:4px">0 / 800</div>' +
        '<div style="display:flex;gap:10px;margin-top:12px">' +
          '<button onclick="fermerAmelioration()" style="flex:1;background:rgba(255,255,255,.08);color:#fff;border:none;border-radius:12px;padding:11px;font-size:14px;font-weight:500;cursor:pointer">Annuler</button>' +
          '<button onclick="envoyerAmelioration()" style="flex:1;background:var(--accent,#ff4d88);color:#fff;border:none;border-radius:12px;padding:11px;font-size:14px;font-weight:600;cursor:pointer">✉️ Envoyer</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);
  }

  // Pré-remplissage du sujet avec la recette ouverte (si on vient d'une fiche)
  const sujet = document.getElementById("amelioration-sujet");
  const texte = document.getElementById("amelioration-texte");
  if (texte) texte.value = "";
  if (sujet) {
    let nom = "";
    const cle = window._ficheOuverte;
    if (cle) {
      nom = (typeof getNomRecette === "function") ? getNomRecette(cle)
          : ((window.recettes && window.recettes[cle] && window.recettes[cle].nom) || cle);
    }
    sujet.value = nom || "";
  }
  majCompteurAmelioration();
  modal.style.display = "flex";
  setTimeout(() => { if (texte) texte.focus(); }, 50);
};

window.fermerAmelioration = function () {
  const m = document.getElementById("modal-amelioration");
  if (m) m.style.display = "none";
};

window.majCompteurAmelioration = function () {
  const ta = document.getElementById("amelioration-texte");
  const c = document.getElementById("amelioration-compteur");
  if (ta && c) c.textContent = (ta.value || "").length + " / 800";
};

window.envoyerAmelioration = function () {
  const ta = document.getElementById("amelioration-texte");
  const su = document.getElementById("amelioration-sujet");
  const message = (ta && ta.value || "").trim();
  const sujetRecette = (su && su.value || "").trim();

  if (!message) {
    if (typeof afficherToast === "function") afficherToast("✏️ Écris un petit message avant d'envoyer");
    if (ta) ta.focus();
    return;
  }

  // Qui envoie ? (si connecté)
  let envoyeur = "non connecté";
  const u = window.currentUser;
  if (u) {
    const nom = (u.displayName || "").trim();
    const mail = (u.email || "").trim();
    envoyeur = [nom, mail].filter(Boolean).join(" — ") || "connecté";
  }

  const version = (typeof APP_VERSION !== "undefined") ? APP_VERSION : "?";
  const date = new Date().toLocaleString("fr-FR");

  const sujetMail = "[Amélioration] " + (sujetRecette || "La Cuisine de Jéjé");
  const corps =
    message + "\n\n" +
    "—————————————\n" +
    "Recette / page : " + (sujetRecette || "—") + "\n" +
    "Envoyé par : " + envoyeur + "\n" +
    "Version : " + version + "\n" +
    "Date : " + date;

  const lien = "mailto:" + window.AMELIORATION_EMAIL +
    "?subject=" + encodeURIComponent(sujetMail) +
    "&body=" + encodeURIComponent(corps);

  // Ouvre le client mail de l'appareil
  window.location.href = lien;

  fermerAmelioration();
  if (typeof afficherToast === "function") afficherToast("✉️ Merci ! Ton message est prêt à partir 🙂");
};
