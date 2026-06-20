// =============================================================================
// 🔔 push.js — Abonnement aux notifications push (recette du jour, rappels…)
// -----------------------------------------------------------------------------
// • Demande la permission de façon NON intrusive (petite bannière après quelques
//   visites, jamais au premier lancement, jamais si déjà refusé/abonné).
// • S'abonne via le service worker (clé VAPID publique) et envoie l'abonnement
//   au Worker (/push/subscribe), avec un drapeau « liste de courses non vide ».
// • Gère le clic sur notif via le deep-link ?recette=<clé> (ouvre la fiche).
// Aucune donnée sensible ici : la clé VAPID PUBLIQUE n'est pas un secret.
// =============================================================================

(function () {
  const VAPID_PUBLIC = "BOz2O8gI5x3anhHIzNduF6G-sYzmo3JSIRfdtUm37lnuXkL2L_GPoqRqILLCzc7VGKkQr12I7rI7zl1M0e3mbwg";
  const WORKER = "https://la-cuisine-de-jeje.jerome-sainthot.workers.dev";
  const LS_OFF = "push_off";    // refusé OU déjà géré → ne plus proposer
  const LS_VISITES = "push_visites";
  const SEUIL = 2;              // proposer à partir de la 2e visite
  const EN = () => window.LANG === "en";
  const toast = (fr, en) => { if (typeof afficherToast === "function") afficherToast(EN() ? en : fr); };
  const supporte = () => ("Notification" in window) && ("serviceWorker" in navigator) && ("PushManager" in window);

  function b64ToU8(b64) {
    const pad = "=".repeat((4 - (b64.length % 4)) % 4);
    const s = (b64 + pad).replace(/-/g, "+").replace(/_/g, "/");
    const raw = atob(s);
    const a = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) a[i] = raw.charCodeAt(i);
    return a;
  }
  function listeNonVide() {
    try { return !!(window.userProfile && Array.isArray(window.userProfile.listeCourses) && window.userProfile.listeCourses.length); }
    catch (e) { return false; }
  }
  async function reg() { return ("serviceWorker" in navigator) ? navigator.serviceWorker.ready : null; }
  async function envoyerSub(sub) {
    try {
      await fetch(WORKER + "/push/subscribe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON ? sub.toJSON() : sub, listeNonVide: listeNonVide() }),
      });
    } catch (e) { /* best effort */ }
  }

  window.activerNotifs = async function () {
    if (!supporte()) { toast("Notifications non supportées sur cet appareil.", "Notifications aren't supported on this device."); return false; }
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") { try { localStorage.setItem(LS_OFF, "1"); } catch (e) {} return false; }
      const r = await reg(); if (!r) return false;
      let sub = await r.pushManager.getSubscription();
      if (!sub) sub = await r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToU8(VAPID_PUBLIC) });
      await envoyerSub(sub);
      try { localStorage.setItem(LS_OFF, "1"); } catch (e) {}
      toast("🔔 Notifications activées ! Tu recevras la recette du jour.", "🔔 Notifications on! You'll get the recipe of the day.");
      return true;
    } catch (e) { return false; }
  };

  window.desactiverNotifs = async function () {
    try {
      const r = await reg(); if (!r) return;
      const sub = await r.pushManager.getSubscription();
      if (sub) {
        try { await fetch(WORKER + "/push/unsubscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: sub.endpoint }) }); } catch (e) {}
        await sub.unsubscribe();
      }
      toast("🔕 Notifications désactivées.", "🔕 Notifications turned off.");
    } catch (e) {}
  };

  // Si déjà abonné, on rafraîchit le drapeau « liste non vide » à chaque visite.
  async function rafraichirFlag() {
    try {
      if (!supporte() || Notification.permission !== "granted") return;
      const r = await reg(); if (!r) return;
      const sub = await r.pushManager.getSubscription();
      if (sub) await envoyerSub(sub);
    } catch (e) {}
  }

  // --- Deep-link : notif cliquée → ?recette=<clé> ouvre la fiche -------------
  function deepLink() {
    try {
      const m = location.search.match(/[?&]recette=([^&]+)/);
      if (!m) return;
      const key = decodeURIComponent(m[1]);
      let n = 0;
      const t = setInterval(() => {
        n++;
        if (typeof ouvrirFiche === "function" && typeof recettes !== "undefined" && recettes[key]) {
          clearInterval(t); ouvrirFiche(key, "");
          try { history.replaceState(null, "", location.pathname); } catch (e) {}
        } else if (n > 60) clearInterval(t);
      }, 200);
    } catch (e) {}
  }

  // --- Bannière douce d'invitation -------------------------------------------
  function dejaGere() { try { return localStorage.getItem(LS_OFF) === "1"; } catch (e) { return false; } }
  function style() {
    if (document.getElementById("push-style")) return;
    const s = document.createElement("style");
    s.id = "push-style";
    s.textContent = `
      #push-banner{position:fixed;left:50%;transform:translateX(-50%);bottom:88px;z-index:8985;max-width:92vw;
        display:flex;align-items:center;gap:10px;background:#17151c;color:#fff;border:1px solid rgba(255,196,120,.4);
        border-radius:14px;padding:10px 12px 10px 16px;box-shadow:0 8px 28px rgba(0,0,0,.45);
        font-family:system-ui,-apple-system,sans-serif;animation:pushUp .25s ease}
      @keyframes pushUp{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
      #push-banner .push-txt{font-size:14px;line-height:1.35;max-width:60vw}
      #push-banner .push-ok{background:linear-gradient(90deg,#ffb259,#ff9330);color:#1b1206;border:none;border-radius:10px;
        padding:9px 14px;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap}
      #push-banner .push-no{background:rgba(255,255,255,.12);color:#fff;border:none;border-radius:50%;width:30px;height:30px;
        font-size:13px;cursor:pointer;flex:0 0 auto}
      @media(max-width:480px){#push-banner{bottom:82px}}
    `;
    document.head.appendChild(s);
  }
  function banniere() {
    if (document.getElementById("push-banner")) return;
    style();
    const b = document.createElement("div");
    b.id = "push-banner";
    b.innerHTML =
      '<span class="push-txt">' +
      (EN() ? "🔔 Want the <b>recipe of the day</b> every day?" : "🔔 Tu veux <b>la recette du jour</b>, chaque jour ?") +
      '</span>' +
      '<button class="push-ok">' + (EN() ? "Enable" : "Activer") + '</button>' +
      '<button class="push-no" aria-label="Fermer">✕</button>';
    document.body.appendChild(b);
    const fermer = () => { try { b.remove(); } catch (e) {} };
    b.querySelector(".push-no").addEventListener("click", () => { try { localStorage.setItem(LS_OFF, "1"); } catch (e) {} fermer(); });
    b.querySelector(".push-ok").addEventListener("click", async () => { fermer(); await window.activerNotifs(); });
  }

  function peutProposer() {
    if (!supporte()) return false;
    if (Notification.permission !== "default") return false; // déjà accordé ou bloqué
    if (dejaGere()) return false;
    let v = 0;
    try { v = (parseInt(localStorage.getItem(LS_VISITES) || "0", 10) || 0) + 1; localStorage.setItem(LS_VISITES, String(v)); } catch (e) {}
    return v >= SEUIL;
  }

  function demarrer() {
    deepLink();
    rafraichirFlag();
    if (peutProposer()) setTimeout(banniere, 6000); // après 6 s, sans gêner
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(demarrer, 0));
  else setTimeout(demarrer, 0);
})();
