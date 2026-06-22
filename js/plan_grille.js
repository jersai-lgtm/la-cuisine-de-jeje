// =============================================================================
// ⚙️ GRILLE « PERSONNALISER PAR REPAS » — config pré-génération du menu semaine
// -----------------------------------------------------------------------------
// Dans le formulaire du planificateur : un bouton qui déplie une grille où,
// pour chaque jour sélectionné, on règle Midi et Soir indépendamment :
//   ✕ Aucun → 🍽️ Simple → 🥗 Complet (clic = cycle).
// Produit window._planConfig = { "Lundi": {midi, soir}, ... } + _planPersoActif,
// lus par genererMenusAleatoires (génération locale). Désactivé = format/créneaux
// globaux comme avant.
// =============================================================================

(function () {
  const CYCLE = { off: "simple", simple: "complet", complet: "off" };
  const ICONE = { off: "✕", simple: "🍽️", complet: "🥗" };
  const LIB = { off: "Aucun", simple: "Simple", complet: "Complet" };

  window._planConfig = window._planConfig || null;
  window._planPersoActif = window._planPersoActif || false;

  function joursSel() {
    return [...document.querySelectorAll("#plan-jours-choix .plan-tag-active")].map(b => b.dataset.val);
  }
  function formatGlobal() {
    return document.getElementById("format-complet")?.classList.contains("plan-tag-active") ? "complet" : "simple";
  }
  function creneauMidiSeul() {
    return document.getElementById("creneau-midi")?.classList.contains("plan-tag-active");
  }
  function defautSlot() { const f = formatGlobal(); return { midi: f, soir: creneauMidiSeul() ? "off" : f }; }

  function render() {
    const panel = document.getElementById("plan-grille-perso");
    if (!panel) return;
    const jours = joursSel();
    if (!jours.length) { panel.innerHTML = '<p style="color:#b3b0b8;font-size:13px;padding:6px 2px">Sélectionne d\'abord des jours ci-dessus.</p>'; return; }
    window._planConfig = window._planConfig || {};
    panel.innerHTML = jours.map(j => {
      if (!window._planConfig[j]) window._planConfig[j] = defautSlot(); // nouveau jour → valeurs par défaut
      const c = window._planConfig[j];
      const slot = (m) => {
        const v = c[m] || "off";
        return '<button type="button" class="grille-slot grille-' + v + '" onclick="cyclerSlotPlan(\'' + j + '\',\'' + m + '\')">' +
          (m === "midi" ? "☀️" : "🌙") + " " + ICONE[v] + " " + LIB[v] + "</button>";
      };
      return '<div class="grille-jour"><span class="grille-jour-nom">' + j + "</span>" + slot("midi") + slot("soir") + "</div>";
    }).join("") + '<p style="color:#88858f;font-size:11px;margin:8px 2px 0">Le nombre de personnes se règle ensuite sur chaque repas du planning.</p>';
  }

  window.cyclerSlotPlan = function (j, m) {
    window._planConfig = window._planConfig || {};
    if (!window._planConfig[j]) window._planConfig[j] = defautSlot();
    window._planConfig[j][m] = CYCLE[window._planConfig[j][m] || "off"];
    render();
  };

  window.togglePersoPlan = function (btn) {
    window._planPersoActif = !window._planPersoActif;
    const panel = document.getElementById("plan-grille-perso");
    if (window._planPersoActif) {
      window._planConfig = {};            // (re)part des réglages globaux comme base
      joursSel().forEach(j => window._planConfig[j] = defautSlot());
      render();
      if (panel) panel.style.display = "block";
      btn.classList.add("plan-tag-active");
      btn.textContent = "⚙️ Personnalisé par repas — activé";
      ["plan-field-format", "plan-field-creneaux"].forEach(id => { const e = document.getElementById(id); if (e) e.style.opacity = ".4"; });
    } else {
      if (panel) panel.style.display = "none";
      btn.classList.remove("plan-tag-active");
      btn.textContent = "⚙️ Personnaliser par repas";
      ["plan-field-format", "plan-field-creneaux"].forEach(id => { const e = document.getElementById(id); if (e) e.style.opacity = ""; });
    }
  };

  function injecterStyle() {
    if (document.getElementById("plan-grille-style")) return;
    const st = document.createElement("style");
    st.id = "plan-grille-style";
    st.textContent =
      "#plan-grille-perso .grille-jour{display:flex;align-items:center;gap:6px;margin-bottom:7px;flex-wrap:wrap}" +
      "#plan-grille-perso .grille-jour-nom{min-width:74px;font-size:13px;color:var(--text-2);font-weight:600}" +
      "#plan-grille-perso .grille-slot{flex:1;min-width:108px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#e7e4ec;border-radius:10px;padding:9px 6px;font-size:12px;cursor:pointer;transition:.12s}" +
      "#plan-grille-perso .grille-off{opacity:.5}" +
      "#plan-grille-perso .grille-simple{border-color:#5a9bd4;background:rgba(90,155,212,.16);color:#fff}" +
      "#plan-grille-perso .grille-complet{border-color:#7ac547;background:rgba(122,197,71,.16);color:#fff}";
    document.head.appendChild(st);
  }

  function injecter() {
    if (document.getElementById("plan-perso-toggle")) return;
    const ancre = document.getElementById("plan-field-creneaux");
    if (!ancre) return;
    injecterStyle();
    const wrap = document.createElement("div");
    wrap.className = "plan-field";
    wrap.innerHTML =
      '<button type="button" id="plan-perso-toggle" class="plan-tag" onclick="togglePersoPlan(this)" style="width:100%;text-align:center">⚙️ Personnaliser par repas</button>' +
      '<div id="plan-grille-perso" style="display:none;margin-top:10px"></div>';
    ancre.parentNode.insertBefore(wrap, ancre.nextSibling);
    // Re-render la grille si on change les jours pendant qu'elle est ouverte
    document.getElementById("plan-jours-choix")?.addEventListener("click", () => { if (window._planPersoActif) setTimeout(render, 0); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injecter);
  else injecter();
})();
