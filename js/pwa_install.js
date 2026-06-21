// =============================================================================
// 📲 pwa_install.js — Invite discrète à installer l'app (PWA)
// -----------------------------------------------------------------------------
// Capture l'événement `beforeinstallprompt` (Chrome/Edge/Android), puis propose
// une bannière « Ajouter à l'écran d'accueil ». Affichée une fois, après un
// petit délai, jamais si déjà installée ou déjà refusée. Bilingue (window.LANG).
// Dégradé gracieux : navigateurs sans l'événement (iOS/Safari…) → rien.
// =============================================================================

(function () {
  const LS = "pwa_install_dismiss";
  const EN = () => window.LANG === "en";
  let deferred = null;

  function estInstalle() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
  }
  function dejaRefuse() { try { return localStorage.getItem(LS) === "1"; } catch (e) { return false; } }
  function refuser() { try { localStorage.setItem(LS, "1"); } catch (e) {} }

  function injecterStyle() {
    if (document.getElementById("pwa-install-style")) return;
    const s = document.createElement("style");
    s.id = "pwa-install-style";
    s.textContent = `
      #pwa-install-banner{position:fixed;left:50%;transform:translateX(-50%);bottom:88px;z-index:9000;
        max-width:92vw;display:flex;align-items:center;gap:10px;background:var(--panel-solid);color:var(--text);
        border:1px solid rgba(255,107,161,.5);border-radius:14px;padding:10px 12px 10px 16px;
        box-shadow:0 8px 28px rgba(0,0,0,.45);font-family:system-ui,-apple-system,sans-serif;
        animation:pwaUp .25s ease}
      @keyframes pwaUp{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
      #pwa-install-banner .pwa-txt{font-size:14px;line-height:1.3;max-width:60vw}
      #pwa-install-banner .pwa-ok{background:linear-gradient(90deg,#ff6ba1,#ff4d88);color:var(--text);border:none;
        border-radius:10px;padding:9px 14px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}
      #pwa-install-banner .pwa-no{background:rgba(var(--w),.12);color:var(--text);border:none;border-radius:50%;
        width:30px;height:30px;font-size:13px;cursor:pointer;flex:0 0 auto}
      #pwa-install-banner .pwa-ok:focus-visible,#pwa-install-banner .pwa-no:focus-visible{outline:2px solid #ff8fb3;outline-offset:2px}
      @media(max-width:480px){#pwa-install-banner{bottom:82px}}
    `;
    document.head.appendChild(s);
  }

  function fermer() { const b = document.getElementById("pwa-install-banner"); if (b) b.remove(); }

  function afficher() {
    if (document.getElementById("pwa-install-banner") || estInstalle() || dejaRefuse() || !deferred) return;
    injecterStyle();
    const b = document.createElement("div");
    b.id = "pwa-install-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", EN() ? "Install the app" : "Installer l'application");
    b.innerHTML =
      `<span class="pwa-txt">${EN() ? "📲 Add La Cuisine de Jéjé to your home screen" : "📲 Ajoute La Cuisine de Jéjé à ton écran d'accueil"}</span>` +
      `<button class="pwa-ok" id="pwa-ok">${EN() ? "Install" : "Installer"}</button>` +
      `<button class="pwa-no" id="pwa-no" aria-label="${EN() ? "Maybe later" : "Plus tard"}" title="${EN() ? "Maybe later" : "Plus tard"}">✕</button>`;
    document.body.appendChild(b);
    document.getElementById("pwa-ok").addEventListener("click", async () => {
      fermer();
      try { deferred.prompt(); await deferred.userChoice; } catch (e) {}
      deferred = null; refuser(); // ne plus reproposer (installé ou non)
    });
    document.getElementById("pwa-no").addEventListener("click", () => { refuser(); fermer(); });
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e;
    if (estInstalle() || dejaRefuse()) return;
    setTimeout(afficher, 5000); // laisser l'utilisateur arriver avant de proposer
  });
  window.addEventListener("appinstalled", () => { refuser(); fermer(); });
})();
