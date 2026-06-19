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
  let _timers = [];         // plusieurs minuteurs en parallèle
  let _timerSeq = 0;
  let _etapes = [];
  let _idx = 0;
  let _nomRecette = "";
  let _lectureVocale = false; // 🔊 lecture vocale des étapes (TTS)
  const _ttsOK = ("speechSynthesis" in window) && ("SpeechSynthesisUtterance" in window);

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
  const _escT = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);

  // Plusieurs minuteurs en parallèle — ils persistent quand on change d'étape.
  function ajouterMinuteur(minutes, label) {
    const key = "t" + (++_timerSeq);
    const t = { key, restant: minutes * 60, total: minutes * 60, paused: false, label: label || "", id: null, fini: false };
    t.id = setInterval(() => {
      if (t.paused) return;
      t.restant--;
      if (t.restant <= 0) {
        clearInterval(t.id); t.id = null; t.fini = true; t.restant = 0;
        const live = document.getElementById("cookmode-live");
        if (live) live.textContent = (t.label ? t.label + " : " : "") + "minuteur terminé !";
        bip();
      }
      majBarreTimers();
    }, 1000);
    _timers.push(t);
    majBarreTimers();
  }
  function arreterTousTimers() { _timers.forEach(t => { if (t.id) clearInterval(t.id); }); _timers = []; }
  window._cmTimerPause = (key) => { const t = _timers.find(x => x.key === key); if (t && !t.fini) { t.paused = !t.paused; majBarreTimers(); } };
  window._cmTimerStop = (key) => { const t = _timers.find(x => x.key === key); if (t) { if (t.id) clearInterval(t.id); _timers = _timers.filter(x => x.key !== key); majBarreTimers(); } };

  function majBarreTimers() {
    const bar = document.getElementById("cookmode-timers-bar");
    if (!bar) return;
    if (!_timers.length) { bar.innerHTML = ""; bar.style.display = "none"; return; }
    bar.style.display = "flex";
    bar.innerHTML = _timers.map(t => {
      const label = t.label ? `<span class="cm-tchip-label">${_escT(t.label)}</span>` : "";
      if (t.fini) {
        return `<div class="cm-tchip fini" role="status">⏰ ${label}<span class="cm-tchip-time">terminé</span>` +
          `<button class="cm-tchip-btn" onclick="_cmTimerStop('${t.key}')" aria-label="Fermer le minuteur terminé">✓</button></div>`;
      }
      return `<div class="cm-tchip">${label}<span class="cm-tchip-time">${fmt(t.restant)}</span>` +
        `<button class="cm-tchip-btn" onclick="_cmTimerPause('${t.key}')" aria-label="${t.paused ? "Reprendre" : "Pause"}">${t.paused ? "▶︎" : "⏸"}</button>` +
        `<button class="cm-tchip-btn" onclick="_cmTimerStop('${t.key}')" aria-label="Arrêter">✕</button></div>`;
    }).join("");
  }

  function boutonTimerHTML() {
    const d = dureeEtape(_etapes[_idx]);
    const btnStep = d ? `<button class="cm-timer-lancer" onclick="_cmAddStepTimer()">⏱ Lancer le minuteur (${d} min)</button>` : "";
    const btnCustom = `<button class="cm-timer-plus" onclick="_cmAddCustomTimer()">➕ Autre minuteur</button>`;
    return btnStep + btnCustom;
  }
  window._cmAddStepTimer = () => { const d = dureeEtape(_etapes[_idx]); if (d) ajouterMinuteur(d, (_etapes[_idx] && _etapes[_idx].titre) || ""); };
  window._cmAddCustomTimer = () => {
    let v; try { v = prompt("Minuteur — combien de minutes ?", "10"); } catch (e) { return; }
    const min = parseInt(v, 10);
    if (min > 0 && min <= 600) ajouterMinuteur(min, "");
  };
  // Hooks programmables (utilisés par l'assistant vocal)
  window._cmAddTimerMinutes = (min, label) => {
    min = parseInt(min, 10);
    if (min > 0 && min <= 600) { ajouterMinuteur(min, label || ""); return min; }
    return 0;
  };
  // Met en pause / relance TOUS les minuteurs actifs. Renvoie true si désormais en pause.
  window._cmPauseToggleAll = () => {
    const actifs = _timers.filter(t => !t.fini);
    if (!actifs.length) return null;
    const enPause = actifs.some(t => !t.paused); // s'il en reste un qui tourne → on met tout en pause
    actifs.forEach(t => { t.paused = enPause; });
    majBarreTimers();
    return enPause;
  };
  window._cmNbTimers = () => _timers.filter(t => !t.fini).length;
  // Aller directement à l'étape n (1-based). Renvoie n si OK, sinon null.
  window._cmAllerEtape = (n) => {
    if (!document.getElementById("cookmode-overlay")) return null;
    n = parseInt(n, 10);
    if (!(n >= 1 && n <= _etapes.length)) return null;
    _idx = n - 1; rendreEtape(); return n;
  };
  window._cmTotalEtapes = () => _etapes.length;
  // Temps restant des minuteurs actifs : [{label, restant(sec)}]
  window._cmTempsRestant = () => _timers.filter(t => !t.fini).map(t => ({ label: t.label, restant: t.restant }));
  // Ajoute min minutes au dernier minuteur actif. Renvoie min si OK, sinon null.
  window._cmAjouterMinutes = (min) => {
    min = parseInt(min, 10);
    if (!(min > 0)) return null;
    const actifs = _timers.filter(t => !t.fini);
    const t = actifs[actifs.length - 1];
    if (!t) return null;
    t.restant += min * 60; t.total += min * 60; t.paused = false;
    majBarreTimers();
    return min;
  };

  // --- Lecture vocale (TTS, sans fichier ni réseau) -------------------------
  function lireEtape() {
    if (!_ttsOK) return;
    try { speechSynthesis.cancel(); } catch (e) {}
    const e = _etapes[_idx]; if (!e) return;
    const txt = ((e.titre || "") + ". " + (e.detail || "")).trim();
    if (!txt) return;
    try {
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = "fr-FR"; u.rate = 1; u.pitch = 1;
      speechSynthesis.speak(u);
    } catch (e2) {}
  }
  function arreterLecture() { try { if (_ttsOK) speechSynthesis.cancel(); } catch (e) {} }
  function majBoutonVoix() {
    const b = document.getElementById("cookmode-voix");
    if (!b) return;
    b.textContent = _lectureVocale ? "🔊" : "🔇";
    b.setAttribute("aria-label", _lectureVocale ? "Lecture vocale activée — toucher pour couper" : "Lecture vocale coupée — toucher pour activer");
    b.classList.toggle("cm-voix-on", _lectureVocale);
  }
  window._cmToggleVoix = function () {
    _lectureVocale = !_lectureVocale;
    try { localStorage.setItem("cm_voix", _lectureVocale ? "1" : "0"); } catch (e) {}
    majBoutonVoix();
    if (_lectureVocale) lireEtape(); else arreterLecture();
  };

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
    if (_lectureVocale) lireEtape();
  }
  function aller(delta) {
    if (!document.getElementById("cookmode-overlay")) return; // sécurité : overlay fermé
    // Les minuteurs continuent quand on change d'étape (cuissons en parallèle).
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
      .cm-voix{background:rgba(255,255,255,.12);color:#fff;border:none;border-radius:50%;width:40px;height:40px;font-size:18px;cursor:pointer;flex:0 0 auto}
      .cm-voix.cm-voix-on{background:rgba(255,107,161,.35);box-shadow:0 0 0 1.5px rgba(255,107,161,.6) inset}
      .cm-close:focus-visible,.cm-voix:focus-visible,.cm-nav-btn:focus-visible,.cm-timer-lancer:focus-visible{outline:3px solid #ff8fb3;outline-offset:2px}
      .cm-progress{height:6px;background:rgba(255,255,255,.12)}
      #cookmode-progress-bar{height:100%;background:linear-gradient(90deg,#ff6ba1,#ff8fb3);transition:width .3s;border-radius:0 3px 3px 0}
      #cookmode-progress-txt{font-size:13px;color:#b9b5c2;font-weight:600}
      #cookmode-corps{flex:1;overflow-y:auto;padding:28px 22px;display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center;gap:18px}
      .cm-etape-icone{font-size:64px;line-height:1}
      .cm-etape-titre{font-size:26px;font-weight:700;margin:0;color:#fff;max-width:680px}
      .cm-etape-detail{font-size:20px;line-height:1.6;color:#e7e4ee;margin:0;max-width:680px}
      .cm-timer{margin-top:6px;min-height:54px;display:flex;justify-content:center;align-items:center}
      .cm-timer-lancer{background:rgba(255,107,161,.16);color:#ff9ec2;border:1.5px solid rgba(255,107,161,.55);border-radius:14px;padding:13px 20px;font-size:17px;font-weight:600;cursor:pointer}
      .cm-timer-plus{background:rgba(255,255,255,.08);color:#cfccd4;border:1.5px solid rgba(255,255,255,.18);border-radius:14px;padding:13px 18px;font-size:15px;font-weight:600;cursor:pointer;margin-left:8px}
      .cm-timers-bar{display:flex;flex-wrap:wrap;gap:8px;padding:10px 14px;justify-content:center;border-top:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.18)}
      .cm-tchip{display:flex;align-items:center;gap:8px;background:rgba(255,107,161,.14);border:1px solid rgba(255,107,161,.4);border-radius:999px;padding:6px 8px 6px 14px}
      .cm-tchip.fini{background:rgba(124,252,154,.16);border-color:rgba(124,252,154,.5);animation:cmpulse 1s ease-in-out infinite}
      .cm-tchip-label{font-size:12px;color:#e7e4ee;max-width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .cm-tchip-time{font-size:18px;font-weight:800;font-variant-numeric:tabular-nums;color:#fff}
      .cm-tchip.fini .cm-tchip-time{color:#7CFC9A}
      .cm-tchip-btn{background:rgba(255,255,255,.14);color:#fff;border:none;border-radius:50%;width:30px;height:30px;font-size:13px;cursor:pointer;flex:0 0 auto}
      .cm-tchip-btn:focus-visible,.cm-timer-plus:focus-visible{outline:3px solid #ff8fb3;outline-offset:2px}
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
    _etapes = r.etapes; _idx = 0; _timers = [];
    _nomRecette = (typeof getNomRecette === "function" ? getNomRecette(key) : "") || r.nom || "";
    try { _lectureVocale = _ttsOK && localStorage.getItem("cm_voix") === "1"; } catch (e) { _lectureVocale = false; }
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
        ${(window.SpeechRecognition || window.webkitSpeechRecognition) ? '<button class="cm-voix" id="cookmode-mic" data-av-mic onclick="window.demarrerAssistantVocal&&window.demarrerAssistantVocal()" aria-label="Commande vocale — appuie et parle">🎙️</button>' : ""}
        ${(window.SpeechRecognition || window.webkitSpeechRecognition) ? '<button class="cm-voix" id="cookmode-continu" onclick="window.assistantContinu&&window.assistantContinu()" aria-label="Écoute mains-libres — activer">👂</button>' : ""}
        ${_ttsOK ? '<button class="cm-voix" id="cookmode-voix" onclick="_cmToggleVoix()">🔇</button>' : ""}
        <span id="cookmode-progress-txt"></span>
      </div>
      <div class="cm-progress"><div id="cookmode-progress-bar"></div></div>
      <div id="cookmode-corps"></div>
      <div id="cookmode-timers-bar" class="cm-timers-bar" style="display:none"></div>
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
    majBoutonVoix();
    if (typeof window._backGuardPush === "function") window._backGuardPush();
  };

  window.fermerModeCuisson = function () {
    arreterTousTimers();
    arreterLecture();
    libererWakeLock();
    document.removeEventListener("keydown", onClavier);
    document.removeEventListener("visibilitychange", onVisibilite);
    const ov = document.getElementById("cookmode-overlay");
    if (ov) ov.remove();
    document.body.style.overflow = "";
  };
})();
