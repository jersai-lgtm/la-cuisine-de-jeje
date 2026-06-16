// =============================================================================
// 👨‍🍳 MODE CUISSON — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Affiche les étapes d'une recette une par une, en plein écran, pensé pour
// cuisiner "mains occupées" :
//   • écran qui ne s'éteint pas (Wake Lock API, avec repli silencieux)
//   • gros texte, fort contraste
//   • minuteur auto-détecté à partir de la durée de l'étape (badge/détail)
//   • navigation clavier (← → Échap) + accessible (role=dialog, aria-live)
// Point d'entrée : window.ouvrirModeCuisson(recetteKey)
// =============================================================================

(function () {
  let _wakeLock = null;
  let _timer = null;        // { id, restant, total, paused }
  let _etapes = [];
  let _idx = 0;
  let _nomRecette = "";

  // --- Wake Lock ------------------------------------------------------------
  async function acquerirWakeLock() {
    try {
      if ("wakeLock" in navigator) {
        _wakeLock = await navigator.wakeLock.request("screen");
        _wakeLock.addEventListener("release", () => {});
      }
    } catch (e) { /* refusé / non supporté : on continue sans */ }
  }
  function libererWakeLock() {
    try { if (_wakeLock) { _wakeLock.release(); _wakeLock = null; } } catch (e) {}
  }
  // Le Wake Lock se libère quand l'onglet passe en arrière-plan : on le ré-acquiert.
  function onVisibilite() {
    if (document.visibilityState === "visible" && document.getElementById("cookmode-overlay")) {
      acquerirWakeLock();
    }
  }

  // --- Détection d'une durée (minutes) dans un texte ------------------------
  // Gère "20 min", "1 h", "1h30", "45 minutes", "1 h 30".
  function minutesDepuis(texte) {
    if (!texte) return 0;
    const t = String(texte).toLowerCase();
    let total = 0;
    const h = t.match(/(\d+)\s*h(?:eures?)?\s*(\d+)?/);
    if (h) { total += parseInt(h[1], 10) * 60 + (h[2] ? parseInt(h[2], 10) : 0); }
    const m = t.match(/(\d+)\s*min/);
    if (m && !h) { total += parseInt(m[1], 10); }
    else if (m && h && !h[2]) { /* "1 h 20 min" déjà couvert par h sinon */ total += 0; }
    return total;
  }
  function dureeEtape(etape) {
    return minutesDepuis(etape.badge) || minutesDepuis(etape.detail);
  }

  // --- Bip de fin de minuteur (WebAudio, sans fichier) ----------------------
  function bip() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine"; o.frequency.value = 880;
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
      o.start();
      let n = 0;
      const tic = setInterval(() => {
        n++; o.frequency.value = n % 2 ? 660 : 880;
        if (n >= 6) { clearInterval(tic); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1); o.stop(ctx.currentTime + 0.15); ctx.close(); }
      }, 250);
    } catch (e) {}
    try { if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]); } catch (e) {}
  }

  // --- Minuteur -------------------------------------------------------------
  function fmt(sec) {
    const m = Math.floor(sec / 60), s = sec % 60;
    return m + ":" + String(s).padStart(2, "0");
  }
  function lancerMinuteur(minutes) {
    arreterMinuteur();
    _timer = { restant: minutes * 60, total: minutes * 60, paused: false };
    majMinuteurUI();
    _timer.id = setInterval(() => {
      if (_timer.paused) return;
      _timer.restant--;
      if (_timer.restant <= 0) {
        arreterMinuteur();
        majMinuteurUI(true);
        const live = document.getElementById("cookmode-live");
        if (live) live.textContent = "Minuteur terminé !";
        bip();
        return;
      }
      majMinuteurUI();
    }, 1000);
  }
  function arreterMinuteur() { if (_timer && _timer.id) clearInterval(_timer.id); _timer = null; }
  function majMinuteurUI(fini) {
    const zone = document.getElementById("cookmode-timer");
    if (!zone) return;
    if (!_timer && !fini) { zone.innerHTML = boutonTimerHTML(); return; }
    if (fini) {
      zone.innerHTML = `<div class="cm-timer-fini" role="status">⏰ Minuteur terminé !</div>` + boutonTimerHTML();
      return;
    }
    zone.innerHTML = `
      <div class="cm-timer-actif">
        <span class="cm-timer-chiffre" aria-live="off">${fmt(_timer.restant)}</span>
        <button class="cm-timer-btn" onclick="_cmTogglePause()" aria-label="${_timer.paused ? "Reprendre" : "Pause"} le minuteur">${_timer.paused ? "▶︎" : "⏸"}</button>
        <button class="cm-timer-btn" onclick="_cmStopTimer()" aria-label="Arrêter le minuteur">✕</button>
      </div>`;
  }
  function boutonTimerHTML() {
    const d = dureeEtape(_etapes[_idx]);
    if (!d) return "";
    return `<button class="cm-timer-lancer" onclick="_cmStartTimer(${d})">⏱ Lancer le minuteur (${d} min)</button>`;
  }
  window._cmStartTimer = (min) => lancerMinuteur(min);
  window._cmStopTimer = () => { arreterMinuteur(); majMinuteurUI(); };
  window._cmTogglePause = () => { if (_timer) { _timer.paused = !_timer.paused; majMinuteurUI(); } };

  // --- Rendu d'une étape ----------------------------------------------------
  function rendreEtape() {
    const e = _etapes[_idx];
    const n = _etapes.length;
    const esc = (typeof escapeHTML === "function") ? escapeHTML : (s) => String(s == null ? "" : s);
    document.getElementById("cookmode-progress-bar").style.width = ((_idx + 1) / n * 100) + "%";
    document.getElementById("cookmode-progress-txt").textContent = `Étape ${_idx + 1} / ${n}`;
    document.getElementById("cookmode-corps").innerHTML = `
      <div class="cm-etape-icone" aria-hidden="true">${esc(e.icone || (_idx + 1))}</div>
      <h2 class="cm-etape-titre">${esc(e.titre || "")}</h2>
      <p class="cm-etape-detail">${esc(e.detail || "")}</p>
      <div id="cookmode-timer" class="cm-timer">${boutonTimerHTML()}</div>`;
    const live = document.getElementById("cookmode-live");
    if (live) live.textContent = `Étape ${_idx + 1} sur ${n}. ${e.titre || ""}. ${e.detail || ""}`;
    const prec = document.getElementById("cookmode-prec");
    const suiv = document.getElementById("cookmode-suiv");
    prec.disabled = _idx === 0;
    suiv.textContent = _idx === n - 1 ? "Terminé ✓" : "Suivant →";
    suiv.focus();
  }
  function aller(delta) {
    if (!document.getElementById("cookmode-overlay")) return; // sécurité : overlay fermé
    arreterMinuteur();
    const n = _etapes.length;
    if (_idx === n - 1 && delta > 0) { fermerModeCuisson(); return; }
    _idx = Math.max(0, Math.min(n - 1, _idx + delta));
    rendreEtape();
  }
  window._cmPrec = () => aller(-1);
  window._cmSuiv = () => aller(1);

  // --- Clavier --------------------------------------------------------------
  function onClavier(ev) {
    if (!document.getElementById("cookmode-overlay")) return;
    if (ev.key === "ArrowRight") { ev.preventDefault(); aller(1); }
    else if (ev.key === "ArrowLeft") { ev.preventDefault(); aller(-1); }
    else if (ev.key === "Escape") { ev.preventDefault(); fermerModeCuisson(); }
  }

  // --- Style (injecté une fois) ---------------------------------------------
  function injecterStyle() {
    if (document.getElementById("cookmode-style")) return;
    const s = document.createElement("style");
    s.id = "cookmode-style";
    s.textContent = `
      #cookmode-overlay{position:fixed;inset:0;z-index:100001;background:#14121a;color:#fff;display:flex;flex-direction:column;font-family:system-ui,-apple-system,sans-serif}
      .cm-top{display:flex;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.1)}
      .cm-top h1{font-size:15px;font-weight:600;margin:0;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#fff}
      .cm-close{background:rgba(255,255,255,.12);color:#fff;border:none;border-radius:50%;width:40px;height:40px;font-size:18px;cursor:pointer;flex:0 0 auto}
      .cm-close:focus-visible,.cm-nav-btn:focus-visible,.cm-timer-lancer:focus-visible{outline:3px solid #ff8fb3;outline-offset:2px}
      .cm-progress{height:6px;background:rgba(255,255,255,.12)}
      #cookmode-progress-bar{height:100%;background:linear-gradient(90deg,#ff6ba1,#ff8fb3);transition:width .3s;border-radius:0 3px 3px 0}
      #cookmode-progress-txt{font-size:13px;color:#b9b5c2;font-weight:600}
      #cookmode-corps{flex:1;overflow-y:auto;padding:28px 22px;display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center;gap:18px}
      .cm-etape-icone{font-size:64px;line-height:1}
      .cm-etape-titre{font-size:26px;font-weight:700;margin:0;color:#fff;max-width:680px}
      .cm-etape-detail{font-size:20px;line-height:1.6;color:#e7e4ee;margin:0;max-width:680px}
      .cm-timer{margin-top:6px;min-height:54px;display:flex;justify-content:center;align-items:center}
      .cm-timer-lancer{background:rgba(255,107,161,.16);color:#ff9ec2;border:1.5px solid rgba(255,107,161,.55);border-radius:14px;padding:13px 20px;font-size:17px;font-weight:600;cursor:pointer}
      .cm-timer-actif{display:flex;align-items:center;gap:14px}
      .cm-timer-chiffre{font-size:40px;font-weight:800;font-variant-numeric:tabular-nums;color:#fff}
      .cm-timer-btn{background:rgba(255,255,255,.12);color:#fff;border:none;border-radius:12px;width:48px;height:48px;font-size:18px;cursor:pointer}
      .cm-timer-fini,.cm-timer-actif .cm-timer-chiffre.fini{color:#7CFC9A}
      .cm-timer-fini{font-size:22px;font-weight:800;color:#7CFC9A;margin-bottom:10px;animation:cmpulse 1s ease-in-out infinite}
      @keyframes cmpulse{50%{opacity:.4}}
      .cm-bottom{display:flex;gap:12px;padding:16px;border-top:1px solid rgba(255,255,255,.1)}
      .cm-nav-btn{flex:1;border:none;border-radius:16px;padding:18px;font-size:18px;font-weight:700;cursor:pointer}
      .cm-prec{background:rgba(255,255,255,.1);color:#fff}
      .cm-prec:disabled{opacity:.35;cursor:default}
      .cm-suiv{background:linear-gradient(90deg,#ff6ba1,#ff5b95);color:#fff}
      .cm-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
      @media(max-width:480px){.cm-etape-titre{font-size:22px}.cm-etape-detail{font-size:18px}.cm-etape-icone{font-size:52px}}
    `;
    document.head.appendChild(s);
  }

  // --- Ouverture / fermeture ------------------------------------------------
  window.ouvrirModeCuisson = function (key) {
    const r = (typeof recettes !== "undefined") ? recettes[key] : null;
    if (!r || !Array.isArray(r.etapes) || r.etapes.length === 0) {
      if (typeof afficherToast === "function") afficherToast("Pas d'étapes pour le mode cuisson 🙂");
      return;
    }
    if (document.getElementById("cookmode-overlay")) return;
    _etapes = r.etapes; _idx = 0;
    _nomRecette = (typeof getNomRecette === "function" ? getNomRecette(key) : "") || r.nom || "";
    injecterStyle();

    const esc = (typeof escapeHTML === "function") ? escapeHTML : (s) => String(s == null ? "" : s);
    const ov = document.createElement("div");
    ov.id = "cookmode-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Mode cuisson : " + _nomRecette);
    ov.innerHTML = `
      <div class="cm-top">
        <button class="cm-close" onclick="fermerModeCuisson()" aria-label="Quitter le mode cuisson">✕</button>
        <h1>👨‍🍳 ${esc(_nomRecette)}</h1>
        <span id="cookmode-progress-txt"></span>
      </div>
      <div class="cm-progress"><div id="cookmode-progress-bar"></div></div>
      <div id="cookmode-corps"></div>
      <div class="cm-bottom">
        <button class="cm-nav-btn cm-prec" id="cookmode-prec" onclick="_cmPrec()">← Précédent</button>
        <button class="cm-nav-btn cm-suiv" id="cookmode-suiv" onclick="_cmSuiv()">Suivant →</button>
      </div>
      <div id="cookmode-live" class="cm-sr" aria-live="assertive"></div>`;
    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onClavier);
    document.addEventListener("visibilitychange", onVisibilite);
    acquerirWakeLock();
    rendreEtape();
    if (typeof window._backGuardPush === "function") window._backGuardPush();
  };

  window.fermerModeCuisson = function () {
    arreterMinuteur();
    libererWakeLock();
    document.removeEventListener("keydown", onClavier);
    document.removeEventListener("visibilitychange", onVisibilite);
    const ov = document.getElementById("cookmode-overlay");
    if (ov) ov.remove();
    document.body.style.overflow = "";
  };
})();
