// =============================================================================
// 📚 COLLECTIONS DE FAVORIS — ranger ses favoris en listes nommées
// -----------------------------------------------------------------------------
// Dans la vue Favoris (recettes), une barre de collections (❤️ Toutes + une chip
// par collection + ➕) filtre la grille. Assignation via un modal « Gérer »
// (cases à cocher sur tous les favoris). Stockage :
//   window.userProfile.collections = [{ nom, cles:[...] }]
// Filtrage : calque .carte--hors-collection (display:none !important), nettoyé
// quand on quitte la vue Favoris.
// =============================================================================

(function () {
  let selection = null; // null = Toutes
  const esc = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);

  function cols() { return (window.userProfile && Array.isArray(window.userProfile.collections)) ? window.userProfile.collections : []; }
  function favoris() {
    if (window.userProfile && Array.isArray(window.userProfile.favoris)) return window.userProfile.favoris;
    // Hors connexion : on affiche les favoris stockés en local (migrés à la connexion).
    try { return JSON.parse(localStorage.getItem("favoris_locaux") || "[]"); } catch (e) { return []; }
  }
  function trouver(nom) { return cols().find(c => c.nom === nom); }
  function cleDe(c) { return (typeof extraireCleRecetteCarte === "function") ? extraireCleRecetteCarte(c) : null; }
  function nomRecette(cle) { return (typeof getNomRecette === "function") ? getNomRecette(cle) : cle; }
  async function sauver() {
    if (typeof sauvegarderProfil === "function") await sauvegarderProfil({ collections: cols() });
  }

  function clearClasse() {
    document.querySelectorAll(".carte--hors-collection").forEach(c => c.classList.remove("carte--hors-collection"));
  }
  function appliquer() {
    clearClasse();
    if (!selection) return;
    const col = trouver(selection);
    if (!col) { selection = null; return; }
    const set = new Set(col.cles);
    document.querySelectorAll(".carte").forEach(c => {
      const cle = cleDe(c);
      if (c.style.display !== "none" && cle && !set.has(cle)) c.classList.add("carte--hors-collection");
    });
  }

  function injecterStyle() {
    if (document.getElementById("coll-style")) return;
    const st = document.createElement("style");
    st.id = "coll-style";
    st.textContent =
      ".carte.carte--hors-collection{display:none !important}" +
      "#coll-row .chip-coll-suppr{margin-left:4px;opacity:.6}" +
      "#coll-modal .coll-fav-item{display:flex;align-items:center;gap:10px;padding:9px 6px;border-bottom:1px solid rgba(255,255,255,.06);cursor:pointer}" +
      "#coll-modal .coll-fav-item input{width:18px;height:18px;accent-color:var(--accent,#ff4d88)}";
    document.head.appendChild(st);
  }

  function barre() {
    let row = document.getElementById("coll-row");
    if (!row) {
      const conteneur = document.getElementById("filtres-favoris-chips");
      if (!conteneur) return null;
      row = document.createElement("div");
      row.className = "chips-row";
      row.id = "coll-row";
      conteneur.appendChild(row);
    }
    return row;
  }

  function rendre() {
    injecterStyle();
    const row = barre();
    if (!row) return;
    const liste = cols();
    let html = '<span class="chips-label">📚</span>' +
      '<button class="chip' + (!selection ? " active" : "") + '" onclick="collSelectionner(null,this)">❤️ Toutes</button>';
    liste.forEach(col => {
      const actif = selection === col.nom;
      html += '<button class="chip' + (actif ? " active" : "") + '" onclick="collSelectionner(\'' + esc(col.nom).replace(/'/g, "\\'") + '\',this)">📁 ' +
        esc(col.nom) + ' <span style="opacity:.6">' + col.cles.length + '</span>' +
        (actif ? ' <span class="chip-coll-suppr" onclick="event.stopPropagation();collGerer(\'' + esc(col.nom).replace(/'/g, "\\'") + '\')" title="Gérer">⚙️</span>' : '') +
        '</button>';
    });
    html += '<button class="chip" onclick="collCreer()" title="Nouvelle collection">➕</button>';
    row.innerHTML = html;
  }

  // ---- API ----
  window.collSelectionner = function (nom, btn) {
    selection = nom || null;
    if (btn) { btn.parentElement.querySelectorAll(".chip").forEach(c => c.classList.remove("active")); btn.classList.add("active"); }
    rendre();
    appliquer();
  };

  window.collCreer = async function () {
    if (!window.currentUser) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); return; }
    const nom = (prompt("Nom de la nouvelle collection (ex. Noël, Healthy, Rapide) :") || "").trim();
    if (!nom) return;
    if (trouver(nom)) { afficherToastColl("Cette collection existe déjà"); return; }
    if (!window.userProfile.collections) window.userProfile.collections = [];
    window.userProfile.collections.push({ nom, cles: [] });
    await sauver();
    selection = nom;
    rendre(); appliquer();
    collGerer(nom); // ouvre direct la gestion pour y ranger des recettes
  };

  window.collRenommer = async function (nom) {
    const col = trouver(nom); if (!col) return;
    const nv = (prompt("Renommer la collection :", nom) || "").trim();
    if (!nv || nv === nom) return;
    if (trouver(nv)) { afficherToastColl("Ce nom est déjà pris"); return; }
    col.nom = nv;
    if (selection === nom) selection = nv;
    await sauver(); rendre(); appliquer();
    fermerCollModal();
  };

  window.collSupprimer = async function (nom) {
    const ok = (typeof confirmer === "function") ? await confirmer("Supprimer la collection « " + nom + " » ? (les recettes restent dans tes favoris)", { titre: "📚 Collection", boutonOui: "Supprimer" }) : confirm("Supprimer « " + nom + " » ?");
    if (!ok) return;
    window.userProfile.collections = cols().filter(c => c.nom !== nom);
    if (selection === nom) selection = null;
    await sauver(); rendre(); appliquer();
    fermerCollModal();
  };

  window.collGerer = function (nom) {
    const col = trouver(nom); if (!col) return;
    const favs = favoris();
    let m = document.getElementById("coll-modal");
    if (!m) {
      m = document.createElement("div");
      m.id = "coll-modal";
      m.setAttribute("style", "position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:18px");
      m.onclick = (e) => { if (e.target === m) fermerCollModal(); };
      document.body.appendChild(m);
    }
    const set = new Set(col.cles);
    const items = favs.length ? favs.map(cle => {
      const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
      const emo = (r && r.emoji) || "🍽️";
      return '<label class="coll-fav-item"><input type="checkbox" ' + (set.has(cle) ? "checked" : "") +
        ' onchange="collToggleRecette(\'' + esc(nom).replace(/'/g, "\\'") + '\',\'' + esc(cle).replace(/'/g, "\\'") + '\',this)">' +
        '<span style="flex:1">' + emo + " " + esc(nomRecette(cle)) + "</span></label>";
    }).join("") : '<p style="color:#b3b0b8;font-size:13px;text-align:center;padding:14px">Aucun favori pour l\'instant. Ajoute des recettes en favori (🤍) pour les ranger ici.</p>';
    m.innerHTML = '<div style="background:#211e26;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:18px;max-width:460px;width:100%;max-height:82vh;display:flex;flex-direction:column">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">' +
        '<span style="font-size:17px;font-weight:600;color:#fff;flex:1">📁 ' + esc(nom) + '</span>' +
        '<button onclick="collRenommer(\'' + esc(nom).replace(/'/g, "\\'") + '\')" title="Renommer" style="background:none;border:none;color:var(--accent-soft,#ff8fb3);font-size:16px;cursor:pointer">✏️</button>' +
        '<button onclick="collSupprimer(\'' + esc(nom).replace(/'/g, "\\'") + '\')" title="Supprimer" style="background:none;border:none;color:#ff7a7a;font-size:16px;cursor:pointer">🗑️</button>' +
        '<button onclick="fermerCollModal()" aria-label="Fermer" style="background:none;border:none;color:#b3b0b8;font-size:24px;line-height:1;cursor:pointer;padding:0 4px">×</button>' +
      '</div>' +
      '<p style="font-size:12px;color:#88858f;margin:0 0 8px">Coche les recettes à ranger dans cette collection.</p>' +
      '<div style="overflow:auto;flex:1">' + items + '</div>' +
    '</div>';
    m.style.display = "flex";
  };

  window.collToggleRecette = async function (nom, cle, checkbox) {
    const col = trouver(nom); if (!col) return;
    if (checkbox.checked) { if (!col.cles.includes(cle)) col.cles.push(cle); }
    else { col.cles = col.cles.filter(c => c !== cle); }
    await sauver();
    rendre();          // met à jour le compteur de la chip
    if (selection === nom) appliquer();
  };

  window.fermerCollModal = function () { const m = document.getElementById("coll-modal"); if (m) m.style.display = "none"; };

  function afficherToastColl(msg) {
    if (typeof afficherToast === "function") { afficherToast(msg); return; }
    alert(msg);
  }

  // ---- Intégration vue Favoris ----
  function enrober(nom, fab) {
    const o = window[nom];
    if (typeof o !== "function" || o._wrapColl) return;
    const w = fab(o); w._wrapColl = true; window[nom] = w;
  }
  function installer() {
    // Entrer dans la vue Recettes favorites = (ré)afficher la barre + ré-appliquer
    enrober("filtrerFavoris", (o) => function () { const r = o.apply(this, arguments); rendre(); appliquer(); return r; });
    // Sous-onglets Menus / Mes recettes = cacher la barre + retirer le calque
    enrober("chipFavorisMenus", (o) => function () { const r = o.apply(this, arguments); const b = document.getElementById("coll-row"); if (b) b.style.display = "none"; clearClasse(); return r; });
    enrober("chipFavorisMesRecettes", (o) => function () { const r = o.apply(this, arguments); const b = document.getElementById("coll-row"); if (b) b.style.display = "none"; clearClasse(); return r; });
    enrober("chipFavorisRecettes", (o) => function () { const r = o.apply(this, arguments); const b = document.getElementById("coll-row"); if (b) b.style.display = ""; rendre(); appliquer(); return r; });
    // Quitter vers la vue Recettes = retirer le calque collection
    enrober("afficherRecettes", (o) => function () { const r = o.apply(this, arguments); clearClasse(); selection = null; return r; });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installer);
  else installer();
})();
