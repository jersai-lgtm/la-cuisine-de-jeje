// =============================================================================
// 🧺 MES ARTICLES — courses perso dans la liste de courses
// -----------------------------------------------------------------------------
// Ajoute une section "Mes articles" à la liste de courses pour les achats hors
// recettes (sopalin, couches, papier toilette…) : champ d'ajout + cases à cocher
// (mêmes que les ingrédients, via lcToggleItem) + bouton retirer.
// Stockage : window.userProfile.listeCoursesPerso = ["sopalin", "couches", …]
// (l'état coché réutilise listeCoursesCoches, comme les ingrédients).
// =============================================================================

(function () {
  const esc = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);
  const sq = (s) => String(s).replace(/'/g, "\\'");

  function injecterStyle() {
    if (document.getElementById("lc-perso-style")) return;
    const st = document.createElement("style");
    st.id = "lc-perso-style";
    st.textContent = `
      .lc-perso-add{display:flex;gap:8px;margin:6px 0 10px}
      .lc-perso-add input{flex:1;min-width:0;box-sizing:border-box;background:#17151c;color:#fff;
        border:1px solid rgba(255,255,255,.15);border-radius:11px;padding:10px 12px;font-size:14px}
      .lc-perso-add button{flex:0 0 auto;background:var(--accent,#ff4d88);color:#fff;border:none;
        border-radius:11px;padding:0 16px;font-size:18px;font-weight:700;cursor:pointer}
      .lc-perso-suppr{margin-left:auto;background:transparent;border:none;color:#ff7a7a;font-size:15px;
        cursor:pointer;padding:0 4px;line-height:1}
      .lc-perso-add input:focus-visible,.lc-perso-add button:focus-visible,.lc-perso-suppr:focus-visible{outline:2px solid #ff8fb3;outline-offset:2px}
    `;
    (document.head || document.documentElement).appendChild(st);
  }

  function zone() {
    let z = document.getElementById("lc-perso-zone");
    if (!z) {
      // Ancré DANS la liste, juste après les rayons de recettes (#lc-rayons) :
      // « Mes articles » devient la dernière section de « Ta liste de courses »,
      // donc clairement incluse dans le partage. Repli sur #lc-panier.
      const ancre = document.getElementById("lc-rayons") || document.getElementById("lc-panier");
      if (!ancre) return null;
      z = document.createElement("div");
      z.id = "lc-perso-zone";
      z.style.marginTop = "14px";
      ancre.parentNode.insertBefore(z, ancre.nextSibling);
    }
    return z;
  }

  function render() {
    injecterStyle();
    const z = zone();
    if (!z) return;
    const perso = (window.userProfile && window.userProfile.listeCoursesPerso) || [];
    const coches = new Set((window.userProfile && window.userProfile.listeCoursesCoches) || []);
    const items = perso.map((label) => {
      const checked = coches.has(label);
      return `<label class="lc-item ${checked ? "lc-item-coche" : ""}">
        <input type="checkbox" ${checked ? "checked" : ""} onchange="lcToggleItem('${sq(label)}', this)">
        <span class="lc-item-label">${esc(label)}</span>
        <button type="button" class="lc-perso-suppr" aria-label="Retirer ${esc(label)}" onclick="event.preventDefault();lcSupprimerArticlePerso('${sq(label)}')">✕</button>
      </label>`;
    }).join("");
    z.innerHTML = `<div class="lc-rayon">
      <h4 class="lc-rayon-titre">🧺 Mes articles${perso.length ? ` <span class="lc-rayon-count">${perso.length}</span>` : ""}</h4>
      <div class="lc-perso-add">
        <input type="text" id="lc-perso-input" maxlength="60" placeholder="Ajoute tes propres courses…" aria-label="Ajouter un article à ma liste"
               onkeydown="if(event.key==='Enter'){event.preventDefault();lcAjouterArticlePerso();}">
        <button type="button" onclick="lcAjouterArticlePerso()" aria-label="Ajouter l'article">➕</button>
      </div>
      <div class="lc-items">${items}</div>
    </div>`;
  }

  window.lcAjouterArticlePerso = async function () {
    if (!window.currentUser) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); return; }
    const inp = document.getElementById("lc-perso-input");
    if (!inp) return;
    const val = (inp.value || "").trim();
    if (!val) return;
    if (!window.userProfile.listeCoursesPerso) window.userProfile.listeCoursesPerso = [];
    if (!window.userProfile.listeCoursesPerso.some((x) => x.toLowerCase() === val.toLowerCase())) {
      window.userProfile.listeCoursesPerso.push(val);
    }
    inp.value = "";
    if (typeof sauvegarderProfil === "function") await sauvegarderProfil({ listeCoursesPerso: window.userProfile.listeCoursesPerso });
    render();
    const i2 = document.getElementById("lc-perso-input"); if (i2) i2.focus();
  };

  window.lcSupprimerArticlePerso = async function (label) {
    if (!window.userProfile) return;
    window.userProfile.listeCoursesPerso = (window.userProfile.listeCoursesPerso || []).filter((x) => x !== label);
    window.userProfile.listeCoursesCoches = (window.userProfile.listeCoursesCoches || []).filter((x) => x !== label);
    if (typeof sauvegarderProfil === "function") {
      await sauvegarderProfil({ listeCoursesPerso: window.userProfile.listeCoursesPerso, listeCoursesCoches: window.userProfile.listeCoursesCoches });
    }
    render();
  };

  window.addEventListener("profilMisAJour", render);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();
})();
