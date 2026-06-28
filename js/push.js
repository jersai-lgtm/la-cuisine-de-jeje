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

  // --- 🧪 Test immédiat : affiche une notif LOCALE via le service worker -----
  // Diagnostic : si elle s'affiche, navigateur + permission + SW sont OK
  // (le souci éventuel des notifs quotidiennes est alors 100 % côté serveur).
  window.testerNotif = async function () {
    if (!supporte()) { toast("Notifications non supportées sur cet appareil.", "Notifications aren't supported on this device."); return; }
    if (Notification.permission !== "granted") {
      toast("Active d'abord les notifications (bouton juste au-dessus).", "Enable notifications first (button just above).");
      return;
    }
    try {
      const r = await reg();
      if (!r) { toast("Service worker indisponible.", "Service worker unavailable."); return; }
      await r.showNotification(EN() ? "🔔 Test successful!" : "🔔 Test réussi !", {
        body: EN() ? "Your notifications work. You'll get the recipe of the day every day."
                   : "Tes notifications fonctionnent ! Tu recevras la recette du jour chaque jour.",
        icon: "images/icon-192.png", badge: "images/icon-192.png",
        tag: "test-notif", renotify: true,
        data: { url: location.origin + location.pathname },
      });
    } catch (e) {
      toast("Échec du test : " + ((e && e.message) || e), "Test failed: " + ((e && e.message) || e));
    }
  };

  // --- 📡 Test SERVEUR (admin) : déclenche la vraie diffusion via /push/new ---
  // Envoie un push "daily" à TOUS les abonnés immédiatement (sans attendre le
  // cron de 11h30). Le toast indique le nombre d'envois → diagnostic complet de
  // la chaîne serveur (Worker + VAPID + KV). Réservé au propriétaire (le Worker
  // revérifie l'email du jeton).
  window.testerNotifServeur = async function () {
    if (!window.currentUser) { toast("Connecte-toi d'abord.", "Sign in first."); return; }
    try {
      const idToken = await window.currentUser.getIdToken();
      const r = await fetch(WORKER + "/push/new", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + idToken },
        body: JSON.stringify({ type: "daily" }),
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok) {
        toast("📡 Push envoyé à " + (data.envoyes != null ? data.envoyes : "?") + " abonné(s). Regarde si la notif arrive…",
              "📡 Push sent to " + (data.envoyes != null ? data.envoyes : "?") + " subscriber(s). Watch for the notification…");
      } else {
        toast("Échec serveur (" + r.status + ") : " + ((data.error && data.error.message) || ""),
              "Server error (" + r.status + ")");
      }
    } catch (e) {
      toast("Erreur : " + ((e && e.message) || e), "Error: " + ((e && e.message) || e));
    }
  };

  // --- Réglage notifs dans le profil (toujours accessible) -------------------
  // Permet de (ré)activer ou désactiver les notifs à tout moment — utile si on
  // les a refusées/supprimées (la bannière, elle, ne réapparaît plus).
  window.gererNotifsProfil = async function () {
    if (!supporte()) { toast("Notifications non supportées sur cet appareil.", "Notifications aren't supported on this device."); return; }
    if (Notification.permission === "denied") {
      // Bloquées au niveau du navigateur/téléphone → l'appli ne peut PAS réautoriser seule.
      toast("🔕 Notifs bloquées dans les réglages du téléphone — réautorise-les là-bas, puis reviens.",
            "🔕 Notifications are blocked in your phone settings — re-allow them there, then come back.");
      window.majBoutonNotifs();
      return;
    }
    const r = await reg();
    const sub = r && await r.pushManager.getSubscription();
    if (sub && Notification.permission === "granted") {
      await window.desactiverNotifs();
    } else {
      try { localStorage.removeItem(LS_OFF); } catch (e) {}
      await window.activerNotifs();
    }
    setTimeout(function () { try { window.majBoutonNotifs(); } catch (e) {} }, 400);
  };

  // Met à jour le libellé + l'aide du bouton selon l'état réel.
  window.majBoutonNotifs = async function () {
    const btn = document.getElementById("btn-notifs-profil");
    const aide = document.getElementById("notifs-profil-aide");
    if (!btn) return;
    btn.disabled = false;
    if (!supporte()) { btn.textContent = EN() ? "🔔 Notifications unsupported" : "🔔 Notifications non supportées"; btn.disabled = true; if (aide) aide.textContent = ""; return; }
    if (Notification.permission === "denied") {
      btn.textContent = EN() ? "🔔 Notifications blocked — re-enable" : "🔔 Notifs bloquées — réactiver";
      if (aide) aide.innerHTML = EN()
        ? "They're blocked in your phone settings. Open <b>Settings → Notifications → La Cuisine de Jéjé</b> (or the site settings in your browser) to allow them, then come back."
        : "Elles sont bloquées dans les réglages du téléphone. Va dans <b>Réglages → Notifications → La Cuisine de Jéjé</b> (ou les réglages du site dans le navigateur) pour les réautoriser, puis reviens ici.";
      return;
    }
    let sub = null;
    try { const r = await reg(); sub = r && await r.pushManager.getSubscription(); } catch (e) {}
    if (sub && Notification.permission === "granted") {
      btn.textContent = EN() ? "🔕 Turn off notifications" : "🔕 Désactiver les notifications";
      if (aide) aide.textContent = EN() ? "You get the recipe of the day every day. 🔔" : "Tu reçois la recette du jour chaque jour. 🔔";
    } else {
      btn.textContent = EN() ? "🔔 Enable notifications" : "🔔 Activer les notifications";
      if (aide) aide.textContent = EN() ? "Get the recipe of the day, every day on your phone." : "Reçois la recette du jour chaque jour sur ton téléphone.";
    }
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
        display:flex;align-items:center;gap:10px;background:var(--panel-solid);color:var(--text);border:1px solid rgba(255,196,120,.4);
        border-radius:14px;padding:10px 12px 10px 16px;box-shadow:0 8px 28px rgba(0,0,0,.45);
        font-family:system-ui,-apple-system,sans-serif;animation:pushUp .25s ease}
      @keyframes pushUp{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
      #push-banner .push-txt{font-size:14px;line-height:1.35;max-width:60vw}
      #push-banner .push-ok{background:linear-gradient(90deg,#ffb259,#ff9330);color:#1b1206;border:none;border-radius:10px;
        padding:9px 14px;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap}
      #push-banner .push-no{background:rgba(var(--w),.12);color:var(--text);border:none;border-radius:50%;width:30px;height:30px;
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

  // Clic sur une notif quand l'appli est DÉJÀ ouverte : le service worker nous
  // envoie l'URL → on ouvre la fiche directement (la SPA ne se recharge pas).
  function ecouterSW() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.addEventListener("message", (e) => {
      try {
        if (!e.data || e.data.type !== "ouvrir-recette") return;
        const m = String(e.data.url || "").match(/[?&]recette=([^&]+)/);
        if (m && typeof ouvrirFiche === "function") ouvrirFiche(decodeURIComponent(m[1]), "");
      } catch (err) {}
    });
  }

  function demarrer() {
    deepLink();
    ecouterSW();
    rafraichirFlag();
    if (peutProposer()) setTimeout(banniere, 6000); // après 6 s, sans gêner
    // Met à jour l'état du bouton notifs à chaque ouverture du profil.
    if (typeof window.ouvrirModalProfil === "function" && !window.ouvrirModalProfil._notif) {
      const orig = window.ouvrirModalProfil;
      window.ouvrirModalProfil = function () {
        const res = orig.apply(this, arguments);
        setTimeout(function () {
          try { window.majBoutonNotifs(); } catch (e) {}
          // Bouton de test serveur visible seulement pour le propriétaire.
          try {
            const owner = window.currentUser && (window.currentUser.email || "").toLowerCase() === "jerome.sainthot@gmail.com";
            const bs = document.getElementById("btn-test-notif-serveur");
            if (bs) bs.style.display = owner ? "" : "none";
          } catch (e) {}
        }, 120);
        return res;
      };
      window.ouvrirModalProfil._notif = true;
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(demarrer, 0));
  else setTimeout(demarrer, 0);
})();
