// =============================================================================
// 📦 MON GARDE-MANGER DATÉ — aliments avec date de péremption
// -----------------------------------------------------------------------------
// L'utilisateur ajoute ses aliments + une date limite (DLC). La liste est triée
// par urgence (périmé → bientôt → ok), avec une pastille de rappel sur l'onglet
// (et la nav) tant qu'il reste des aliments à consommer vite (≤ 3 jours).
// Stockage : window.userProfile.gardeManger = [{ id, nom, dlc:"YYYY-MM-DD" }]
// =============================================================================

(function () {
  const esc = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);

  function injecterStyle() {
    if (document.getElementById("gm-style")) return;
    const st = document.createElement("style");
    st.id = "gm-style";
    st.textContent = `
      .gm-add{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 16px}
      .gm-add input[type=text]{flex:1;min-width:140px;background:var(--surface-1);color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:11px;padding:10px 12px;font-size:14px}
      .gm-add input[type=date]{background:var(--surface-1);color:#fff;border:1px solid rgba(255,255,255,.15);border-radius:11px;padding:10px 12px;font-size:14px}
      .gm-add button{background:var(--accent,#ff4d88);color:#fff;border:none;border-radius:11px;padding:0 16px;font-size:18px;font-weight:700;cursor:pointer}
      .gm-item{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:12px;margin-bottom:8px;background:rgba(255,255,255,.04);border-left:4px solid #555}
      .gm-item.gm-perime{border-left-color:#ff4444;background:rgba(255,68,68,.10)}
      .gm-item.gm-urgent{border-left-color:#ffa000;background:rgba(255,160,0,.08)}
      .gm-item.gm-ok{border-left-color:#7CFC9A}
      .gm-item-main{flex:1;min-width:0}
      .gm-item-nom{display:block;color:#fff;font-size:15px;font-weight:600}
      .gm-item-dlc{display:block;font-size:12.5px;margin-top:2px}
      .gm-perime .gm-item-dlc{color:#ff8a8a}
      .gm-urgent .gm-item-dlc{color:var(--or)}
      .gm-ok .gm-item-dlc{color:#9fdcb0}
      .gm-cook{background:rgba(255,107,161,.16);border:1px solid rgba(255,107,161,.45);color:var(--accent-soft);font-size:15px;cursor:pointer;padding:5px 9px;border-radius:9px;flex:0 0 auto}
      .gm-suppr{background:transparent;border:none;color:#ff7a7a;font-size:16px;cursor:pointer;padding:4px 6px;flex:0 0 auto}
      .gm-vide{text-align:center;color:#88858f;font-size:14px;padding:24px 10px;line-height:1.6}
      #gm-badge{display:none;background:#ff4444;color:#fff;font-size:11px;font-weight:700;border-radius:20px;padding:1px 6px;margin-left:4px;vertical-align:middle}
      #gm-nav-badge{display:none;position:absolute;top:-3px;right:-7px;background:#ff4444;color:#fff;font-size:10px;font-weight:700;border-radius:20px;min-width:16px;height:16px;line-height:16px;text-align:center;padding:0 4px;box-shadow:0 0 0 2px #14121a}
      .nav-icone-wrap{position:relative}
      .gm-recettes-lien{display:inline-block;margin-top:14px;color:var(--accent-soft,#ff8fb3);font-size:13px;cursor:pointer;background:none;border:none}
    `;
    (document.head || document.documentElement).appendChild(st);
  }

  function liste() { return (window.userProfile && window.userProfile.gardeManger) || []; }

  // Jours restants avant la DLC (0 = aujourd'hui, négatif = périmé)
  function joursRestants(dlc) {
    if (!dlc) return null;
    const d = new Date(dlc + "T00:00:00");
    if (isNaN(d)) return null;
    const now = new Date();
    const t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((d - t0) / 86400000);
  }
  function fmtDate(dlc) {
    const d = new Date(dlc + "T00:00:00");
    if (isNaN(d)) return dlc;
    return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0");
  }
  function niveau(j) {
    if (j == null) return "ok";
    if (j < 0) return "perime";
    if (j <= 3) return "urgent";
    return "ok";
  }
  function texteDlc(j, dlc) {
    if (j == null) return "Sans date";
    if (j < 0) return `⚠️ Périmé depuis ${-j} j (le ${fmtDate(dlc)})`;
    if (j === 0) return `⏰ À consommer aujourd'hui`;
    if (j === 1) return `🟠 Demain (${fmtDate(dlc)})`;
    if (j <= 3) return `🟠 Dans ${j} jours (${fmtDate(dlc)})`;
    return `🟢 Le ${fmtDate(dlc)} (dans ${j} j)`;
  }

  // Nombre d'aliments urgents (≤ 3 j ou périmés) — pour la pastille
  function nbUrgents() {
    return liste().filter(it => { const j = joursRestants(it.dlc); return j != null && j <= 3; }).length;
  }

  function majBadge() {
    injecterStyle();
    const n = nbUrgents();
    ["gm-badge", "gm-nav-badge"].forEach(id => {
      const b = document.getElementById(id);
      if (b) { b.textContent = n; b.style.display = n > 0 ? "inline-block" : "none"; }
    });
  }

  function render() {
    injecterStyle();
    majBadge();
    const cont = document.getElementById("gm-liste");
    if (!cont) return;
    const items = liste().slice().sort((a, b) => {
      const ja = joursRestants(a.dlc), jb = joursRestants(b.dlc);
      if (ja == null) return 1; if (jb == null) return -1;
      return ja - jb;
    });
    if (!items.length) {
      cont.innerHTML = `<div class="gm-vide">Ton garde-manger est vide.<br>Ajoute tes aliments avec leur date de péremption — on te préviendra quand ça approche 🔔</div>`;
      return;
    }
    cont.innerHTML = items.map(it => {
      const j = joursRestants(it.dlc);
      const niv = niveau(j);
      return `<div class="gm-item gm-${niv}">
        <div class="gm-item-main">
          <span class="gm-item-nom">${esc(it.nom)}</span>
          <span class="gm-item-dlc">${texteDlc(j, it.dlc)}</span>
        </div>
        <button class="gm-cook" title="Voir les recettes possibles" aria-label="Voir les recettes avec ${esc(it.nom)}" onclick="gmVoirRecettes('${it.id}')">🍳</button>
        <button class="gm-suppr" aria-label="Retirer ${esc(it.nom)}" onclick="gmSupprimer('${it.id}')">✕</button>
      </div>`;
    }).join("");
  }

  window.gmAjouter = async function () {
    if (!window.currentUser) { if (typeof ouvrirModalAuth === "function") ouvrirModalAuth(); return; }
    const inom = document.getElementById("gm-nom");
    const idate = document.getElementById("gm-date");
    if (!inom) return;
    const nom = (inom.value || "").trim();
    const dlc = (idate && idate.value) || "";
    if (!nom) { if (typeof afficherToast === "function") afficherToast("Donne un nom à l'aliment 🙂"); return; }
    if (!window.userProfile.gardeManger) window.userProfile.gardeManger = [];
    const id = "g" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
    window.userProfile.gardeManger.push({ id, nom, dlc });
    inom.value = ""; if (idate) idate.value = "";
    if (typeof sauvegarderProfil === "function") await sauvegarderProfil({ gardeManger: window.userProfile.gardeManger });
    render();
    inom.focus();
  };

  window.gmSupprimer = async function (id) {
    if (!window.userProfile) return;
    window.userProfile.gardeManger = (window.userProfile.gardeManger || []).filter(x => x.id !== id);
    if (typeof sauvegarderProfil === "function") await sauvegarderProfil({ gardeManger: window.userProfile.gardeManger });
    render();
  };

  // 🍳 Ouvre le vide-frigo en pré-sélectionnant l'aliment → recettes possibles
  window.gmVoirRecettes = function (id) {
    const it = liste().find(x => x.id === id);
    if (!it) return;
    if (typeof switchCuisineTab === "function") switchCuisineTab("videfrigo");
    if (!window._vfIngredients && typeof vfChargerIngredients === "function") { try { vfChargerIngredients(); } catch (e) {} }
    const clean = (s) => (typeof vfNormalize === "function" ? vfNormalize(s) : String(s).toLowerCase()).replace(/[^a-z0-9]/g, "");
    const nomN = clean(it.nom);
    // Meilleur libellé : exact d'abord, sinon la correspondance la plus courte
    let label = null, bestLen = Infinity;
    if (nomN && window._vfIngredients) {
      window._vfIngredients.forEach(en => {
        const l = clean(en.label);
        if (!l) return;
        if (l === nomN) { label = en.label; bestLen = -1; }
        else if (bestLen >= 0 && (l.includes(nomN) || nomN.includes(l)) && l.length < bestLen) { label = en.label; bestLen = l.length; }
      });
    }
    if (!label) { if (typeof afficherToast === "function") afficherToast(`« ${it.nom} » n'est pas dans la liste du vide-frigo 🙂`); return; }
    if (window._vfSelection && !window._vfSelection.has(label)) {
      window._vfSelection.add(label);
      try { const chip = document.querySelector('.vf-chip[data-label="' + (window.CSS && CSS.escape ? CSS.escape(label) : label) + '"]'); if (chip) chip.classList.add("vf-chip-active"); } catch (e) {}
      if (typeof vfPersistSelection === "function") vfPersistSelection();   // mémoriser le frigo
    }
    if (typeof vfSyncPlacardBanner === "function") vfSyncPlacardBanner();
    if (typeof vfMettreAJourSelection === "function") vfMettreAJourSelection();
    setTimeout(() => {
      const r = document.getElementById("vf-resultats");
      if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
      const n = document.querySelectorAll(".vf-result-card").length;
      if (n === 0 && typeof afficherToast === "function") afficherToast(`« ${it.nom} » coché — ajoute d'autres ingrédients pour voir tes recettes 🥕`);
    }, 150);
  };

  window.gmRender = render;
  window.gmMajBadge = majBadge;
  window.gmJoursRestants = joursRestants;   // utilisé par le vide-frigo (priorité anti-gaspi)

  window.addEventListener("profilMisAJour", majBadge);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", majBadge);
  else majBadge();
})();
