// =============================================================================
// 📦 boucle_placard.js — fermer la boucle courses → placard → cuisine
// -----------------------------------------------------------------------------
// Les trois pièces existaient, mais ne se parlaient pas : on faisait ses
// courses, on tenait son placard à la main, et « j'ai cuisiné » n'existait même
// pas — tables.js appelait `majBoutonCuisine(nom)` depuis la v240, mais la
// fonction n'était définie nulle part. Résultat : `userProfile.recettesCuisinees`
// était LU à dix endroits (stats, admin) et jamais ÉCRIT, donc toute la section
// « Tes recettes les plus cuisinées » restait vide, et son message invitait à
// appuyer sur un bouton absent.
//
// Ce module apporte les trois chaînons manquants :
//   1. le bouton « 👨‍🍳 J'ai cuisiné » attendu par la fiche ;
//   2. après cuisson, le placard propose de retirer ce qui vient d'être mangé ;
//   3. la liste de courses range ses articles cochés dans le placard.
//
// Rien n'est jamais retiré ni ajouté sans confirmation : le placard appartient
// à l'utilisateur, on ne fait que proposer.
// =============================================================================
(function () {
  const EN = () => window.LANG === "en";
  const esc = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);

  // Comparaison souple entre un nom tapé à la main (« Tomates cerises ») et un
  // libellé d'ingrédient (« 🍅 Tomate ») : accents, emoji, pluriels écartés.
  function normaliser(s) {
    return String(s || "")
      .replace(/œ/g, "oe").replace(/æ/g, "ae")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/s\b/g, "");
  }
  function seRessemblent(a, b) {
    const x = normaliser(a), y = normaliser(b);
    if (!x || !y || x.length < 3 || y.length < 3) return false;
    return x === y || x.includes(y) || y.includes(x);
  }

  // --- Les ingrédients d'une recette, sous leur libellé affiché --------------
  function ingredientsDe(cle) {
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    if (!r) return [];
    const tab = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tab || !r[tab].length) return [];
    const ligne = r[tab].find((l) => l && l.nb === (r.base || 4)) || r[tab][0];
    return Object.keys(ligne)
      .filter((k) => k !== "nb" && k !== "patons")
      .map((k) => (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[k]) ? INGREDIENTS_LABELS[k] : k);
  }

  const placard = () => (window.userProfile && window.userProfile.gardeManger) || [];

  // =========================================================================
  // 1. Le bouton « J'ai cuisiné », appelé par tables.js après le rendu de la fiche
  // =========================================================================
  function compteur(cle) {
    const e = (window.userProfile?.recettesCuisinees || []).find((c) => c && c.cle === cle);
    return e ? (e.count || 0) : 0;
  }

  window.majBoutonCuisine = function (cle) {
    const resultat = document.getElementById("modal-resultat");
    if (!resultat || !cle) return;
    document.getElementById("cuisine-section")?.remove();

    const n = compteur(cle);
    const faite = n > 0;
    const libelle = faite
      ? (EN() ? `Cooked ${n}×` : `Cuisinée ${n} fois`)
      : (EN() ? "I cooked it" : "J'ai cuisiné");

    const sec = document.createElement("div");
    sec.id = "cuisine-section";
    sec.className = "cuisine-section";
    sec.innerHTML =
      `<button class="cuisine-btn${faite ? " cuisine-btn-faite" : ""}" type="button" ` +
      `onclick="jaiCuisine('${String(cle).replace(/'/g, "\\'")}')">👨‍🍳 ${esc(libelle)}</button>` +
      `<span class="cuisine-aide">` +
      (faite ? (EN() ? "Counted in your stats." : "Comptée dans tes stats.")
             : (EN() ? "Tap once the dish is made — it feeds your stats."
                     : "Appuie une fois le plat fait — ça alimente tes stats.")) +
      `</span>`;

    const etoiles = document.getElementById("etoiles-section");
    const notes = document.getElementById("notes-section");
    if (etoiles) resultat.insertBefore(sec, etoiles);
    else if (notes) resultat.insertBefore(sec, notes);
    else resultat.appendChild(sec);
  };

  // =========================================================================
  // 2. Enregistrer la cuisson, puis proposer de vider le placard d'autant
  // =========================================================================
  window.jaiCuisine = async function (cle) {
    if (!window.userProfile) window.userProfile = {};
    if (!Array.isArray(window.userProfile.recettesCuisinees)) window.userProfile.recettesCuisinees = [];
    const liste = window.userProfile.recettesCuisinees;
    const e = liste.find((c) => c && c.cle === cle);
    const maintenant = new Date().toISOString();
    if (e) { e.count = (e.count || 0) + 1; e.dernierDate = maintenant; }
    else liste.push({ cle: cle, count: 1, dernierDate: maintenant });

    try { if (typeof sauvegarderProfil === "function") await sauvegarderProfil({ recettesCuisinees: liste }); } catch (err) {}
    window.majBoutonCuisine(cle);
    if (typeof afficherToast === "function") {
      afficherToast(EN() ? "👨‍🍳 Noted — it is in your stats" : "👨‍🍳 C'est noté — ça compte dans tes stats");
    }
    proposerRetraitPlacard(cle);
  };

  function proposerRetraitPlacard(cle) {
    const stock = placard();
    if (!stock.length) return;
    const ings = ingredientsDe(cle);
    if (!ings.length) return;
    const touches = stock.filter((it) => ings.some((lab) => seRessemblent(it.nom, lab)));
    if (!touches.length) return;

    ouvrirFeuille({
      titre: EN() ? "📦 Update your cupboard?" : "📦 On met le placard à jour ?",
      sous: EN() ? "These were in your cupboard. Untick what you still have."
                 : "Tu avais ça au placard. Décoche ce qu'il te reste.",
      items: touches.map((it) => ({ id: it.id, nom: it.nom, coche: true })),
      bouton: EN() ? "Remove" : "Retirer du placard",
      action: async (ids) => {
        if (!ids.length) return;
        window.userProfile.gardeManger = placard().filter((it) => !ids.includes(it.id));
        try { if (typeof sauvegarderProfil === "function") await sauvegarderProfil({ gardeManger: window.userProfile.gardeManger }); } catch (e) {}
        if (typeof gmRender === "function") gmRender();
        if (typeof gmMajBadge === "function") gmMajBadge();
        if (typeof afficherToast === "function") {
          afficherToast(ids.length + (EN() ? " removed from the cupboard" : " retiré(s) du placard"));
        }
      },
    });
  }

  // =========================================================================
  // 3. La liste de courses range ses articles cochés au placard
  // =========================================================================
  window.lcRangerAuPlacard = function () {
    const coches = (window.userProfile && window.userProfile.listeCoursesCoches) || [];
    if (!coches.length) {
      if (typeof afficherToast === "function") {
        afficherToast(EN() ? "Nothing ticked yet 🙂" : "Rien de coché pour l'instant 🙂");
      }
      return;
    }
    const deja = placard();
    const nouveaux = coches.filter((lab) => !deja.some((it) => seRessemblent(it.nom, lab)));
    if (!nouveaux.length) {
      if (typeof afficherToast === "function") {
        afficherToast(EN() ? "Everything is already in the cupboard 👍" : "Tout est déjà au placard 👍");
      }
      return;
    }
    ouvrirFeuille({
      titre: EN() ? "📦 Into the cupboard" : "📦 Ranger au placard",
      sous: EN() ? "They go in without a date — you can add one later."
                 : "Ils entrent sans date — tu pourras la préciser plus tard.",
      items: nouveaux.map((lab, i) => ({ id: "n" + i, nom: lab, coche: true })),
      bouton: EN() ? "Put away" : "Ranger",
      action: async (ids) => {
        const choisis = ids.map((id) => nouveaux[parseInt(String(id).slice(1), 10)]).filter(Boolean);
        if (!choisis.length) return;
        if (!Array.isArray(window.userProfile.gardeManger)) window.userProfile.gardeManger = [];
        for (const nom of choisis) {
          window.userProfile.gardeManger.push({
            id: "gm" + Date.now() + Math.random().toString(36).slice(2, 7),
            nom: nom, dlc: "",
          });
        }
        try { if (typeof sauvegarderProfil === "function") await sauvegarderProfil({ gardeManger: window.userProfile.gardeManger }); } catch (e) {}
        if (typeof gmRender === "function") gmRender();
        if (typeof gmMajBadge === "function") gmMajBadge();
        if (typeof afficherToast === "function") {
          afficherToast(choisis.length + (EN() ? " put away 📦" : " rangé(s) au placard 📦"));
        }
      },
    });
  };

  // =========================================================================
  // La petite feuille de confirmation à cocher, commune aux deux usages
  // =========================================================================
  function ouvrirFeuille({ titre, sous, items, bouton, action }) {
    injecterStyle();
    document.getElementById("bp-feuille")?.remove();
    const f = document.createElement("div");
    f.id = "bp-feuille";
    f.setAttribute("role", "dialog");
    f.setAttribute("aria-modal", "true");
    f.innerHTML =
      `<div class="bp-carte">` +
        `<div class="bp-titre">${esc(titre)}</div>` +
        `<div class="bp-sous">${esc(sous)}</div>` +
        `<div class="bp-liste">` +
          items.map((it) =>
            `<label class="bp-item"><input type="checkbox" value="${esc(it.id)}"${it.coche ? " checked" : ""}>` +
            `<span>${esc(it.nom)}</span></label>`).join("") +
        `</div>` +
        `<div class="bp-actions">` +
          `<button type="button" class="bp-non" onclick="_bpFermer()">${EN() ? "Not now" : "Pas maintenant"}</button>` +
          `<button type="button" class="bp-oui" id="bp-ok">${esc(bouton)}</button>` +
        `</div>` +
      `</div>`;
    document.body.appendChild(f);
    f.addEventListener("click", (e) => { if (e.target === f) window._bpFermer(); });
    document.getElementById("bp-ok").addEventListener("click", async () => {
      const ids = [...f.querySelectorAll("input[type=checkbox]:checked")].map((c) => c.value);
      window._bpFermer();
      try { await action(ids); } catch (e) {}
    });
  }
  window._bpFermer = function () { document.getElementById("bp-feuille")?.remove(); };

  function injecterStyle() {
    if (document.getElementById("bp-style")) return;
    const s = document.createElement("style");
    s.id = "bp-style";
    s.textContent = `
      #bp-feuille{position:fixed;inset:0;z-index:100050;background:rgba(10,8,14,.6);
        display:flex;align-items:flex-end;justify-content:center;padding:0}
      #bp-feuille .bp-carte{background:var(--panel-solid,#211e26);color:var(--text,#fff);
        box-sizing:border-box;width:100%;max-width:520px;border-radius:18px 18px 0 0;
        padding:18px 18px calc(18px + env(safe-area-inset-bottom));
        border:1px solid rgba(255,255,255,.12);border-bottom:none;max-height:76vh;overflow:auto}
      #bp-feuille .bp-titre{font-size:17px;font-weight:700;margin-bottom:4px}
      #bp-feuille .bp-sous{font-size:13px;color:var(--text-2,#b3b0b8);margin-bottom:12px;line-height:1.45}
      #bp-feuille .bp-liste{display:flex;flex-direction:column;gap:2px;margin-bottom:14px}
      #bp-feuille .bp-item{display:flex;align-items:center;gap:10px;padding:10px 8px;border-radius:10px;
        font-size:15px;cursor:pointer;min-height:44px;box-sizing:border-box}
      #bp-feuille .bp-item:hover{background:rgba(255,255,255,.05)}
      #bp-feuille .bp-item input{width:20px;height:20px;flex:0 0 auto;accent-color:var(--accent,#ff4d88)}
      #bp-feuille .bp-actions{display:flex;gap:10px}
      #bp-feuille .bp-actions button{flex:1;min-height:44px;border:none;border-radius:12px;
        font-size:15px;font-weight:600;cursor:pointer}
      #bp-feuille .bp-non{background:rgba(255,255,255,.1);color:var(--text,#fff)}
      #bp-feuille .bp-oui{background:var(--accent,#ff4d88);color:#fff}
      .cuisine-section{display:flex;align-items:center;gap:12px;flex-wrap:wrap;
        margin:16px 0 0;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,.04)}
      .cuisine-btn{min-height:44px;padding:0 18px;border:none;border-radius:12px;cursor:pointer;
        background:var(--accent,#ff4d88);color:#fff;font-size:15px;font-weight:600}
      .cuisine-btn-faite{background:rgba(255,255,255,.12);color:var(--text,#fff)}
      .cuisine-aide{font-size:12.5px;color:var(--text-2,#b3b0b8);flex:1;min-width:140px;line-height:1.4}
      .lc-placard-btn{width:100%;box-sizing:border-box;min-height:44px;margin:12px 0 0;border:none;
        border-radius:12px;cursor:pointer;background:rgba(255,255,255,.1);color:var(--text,#fff);
        font-size:15px;font-weight:600}
    `;
    document.head.appendChild(s);
  }

  // --- Le bouton au bas de la liste de courses ------------------------------
  // La liste se redessine souvent : on observe son conteneur plutôt que de
  // deviner le bon moment.
  function poserBoutonCourses() {
    // #lc-liste est le bloc de la vue Courses ; #lc-rayons porte les articles.
    const liste = document.getElementById("lc-liste");
    const rayons = document.getElementById("lc-rayons");
    if (!liste || !rayons || liste.style.display === "none") { document.getElementById("lc-placard-btn")?.remove(); return; }
    if (!liste) return;
    if (!rayons.querySelector(".lc-item")) { document.getElementById("lc-placard-btn")?.remove(); return; }
    if (document.getElementById("lc-placard-btn")) return;
    injecterStyle();
    const b = document.createElement("button");
    b.id = "lc-placard-btn";
    b.className = "lc-placard-btn";
    b.type = "button";
    b.textContent = EN() ? "📦 Put the ticked items in the cupboard" : "📦 Ranger les articles cochés au placard";
    b.addEventListener("click", () => window.lcRangerAuPlacard());
    liste.appendChild(b);
  }

  function demarrer() {
    poserBoutonCourses();
    const cible = document.body;
    if (!cible) return;
    let prevu = false;
    new MutationObserver(() => {
      if (prevu) return;
      prevu = true;
      requestAnimationFrame(() => { prevu = false; poserBoutonCourses(); });
    }).observe(cible, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
