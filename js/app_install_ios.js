// ============================================================
// app_install_ios.js — Aide à l'installation sur iPhone / iPad
// ------------------------------------------------------------
// iOS n'autorise AUCUN bouton "installer" automatique (Apple bloque
// l'API beforeinstallprompt dans Safari). On ne peut donc que GUIDER.
// Ce module :
//   • ne s'affiche que sur iOS et seulement si l'app n'est PAS déjà installée
//   • dans Safari  → montre les étapes Partager → Sur l'écran d'accueil
//                    avec une flèche animée vers le bon endroit
//   • dans un navigateur intégré (Messenger, Facebook, Insta, Gmail, Chrome iOS…)
//                  → explique d'ouvrir dans Safari + bouton "Copier le lien"
//   • mémorise la fermeture (✕) pendant 7 jours pour ne pas harceler
// Déclenchement manuel possible : window.lcAfficherInstallIOS()
// ============================================================
(function () {
  "use strict";

  var COOLDOWN_KEY = "lc_ios_install_dismiss";
  var COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

  var ua = navigator.userAgent || "";
  var isIPadOS = (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isIOS = /iphone|ipad|ipod/i.test(ua) || isIPadOS;
  var isIPad = /ipad/i.test(ua) || isIPadOS;

  function estInstallee() {
    return (("standalone" in navigator) && navigator.standalone === true) ||
           (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches);
  }

  // Navigateurs intégrés (in-app) ou non-Safari : pas d'ajout à l'écran d'accueil possible
  var inApp = /FBAN|FBAV|FB_IAB|Instagram|Messenger|MessengerForiOS|Line\/|Twitter|MicroMessenger|LinkedInApp|Snapchat|Pinterest|WhatsApp|GSA\//i.test(ua);
  var autreNavigateur = /CriOS|FxiOS|EdgiOS|OPiOS|mercury|DuckDuckGo/i.test(ua);
  var besoinSafari = inApp || autreNavigateur;

  function enCooldown() {
    try {
      var until = parseInt(localStorage.getItem(COOLDOWN_KEY) || "0", 10);
      return until && Date.now() < until;
    } catch (e) { return false; }
  }
  function poserCooldown() {
    try { localStorage.setItem(COOLDOWN_KEY, String(Date.now() + COOLDOWN_MS)); } catch (e) {}
  }

  function injecterCSS() {
    if (document.getElementById("lcios-style")) return;
    var css = document.createElement("style");
    css.id = "lcios-style";
    css.textContent = [
      ".lcios-overlay{position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.45);",
      "  display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .25s ease}",
      ".lcios-overlay.show{opacity:1}",
      ".lcios-sheet{width:100%;max-width:460px;background:#fff;color:#23202a;border-radius:20px 20px 0 0;",
      "  padding:20px 18px calc(18px + env(safe-area-inset-bottom));box-shadow:0 -8px 30px rgba(0,0,0,.3);",
      "  transform:translateY(110%);transition:transform .3s cubic-bezier(.2,.8,.2,1);font-family:Arial,sans-serif}",
      ".lcios-overlay.show .lcios-sheet{transform:translateY(0)}",
      ".lcios-close{position:absolute;top:10px;right:14px;width:32px;height:32px;border:none;border-radius:50%;",
      "  background:rgba(0,0,0,.06);color:#555;font-size:18px;line-height:1;cursor:pointer}",
      ".lcios-head{display:flex;align-items:center;gap:12px;margin:2px 28px 14px 2px}",
      ".lcios-ico{width:46px;height:46px;border-radius:12px;flex:none;background:var(--accent,#ff4d88);",
      "  display:flex;align-items:center;justify-content:center;font-size:26px}",
      ".lcios-titre{font-size:17px;font-weight:bold;margin:0 0 2px}",
      ".lcios-sub{font-size:13px;color:#6b6770;margin:0;line-height:1.35}",
      ".lcios-steps{list-style:none;margin:6px 0 4px;padding:0}",
      ".lcios-steps li{display:flex;align-items:center;gap:10px;padding:9px 0;font-size:14.5px;border-top:1px solid #f0eef2}",
      ".lcios-num{width:24px;height:24px;border-radius:50%;flex:none;background:rgba(var(--accent-rgb,255,77,136),.14);",
      "  color:var(--accent,#ff4d88);font-weight:bold;font-size:13px;display:flex;align-items:center;justify-content:center}",
      ".lcios-share{display:inline-flex;vertical-align:-3px;margin:0 1px}",
      ".lcios-pill{display:inline-block;background:#f1eff3;border-radius:6px;padding:1px 7px;font-weight:600;font-size:13.5px}",
      ".lcios-btn{display:block;width:100%;margin-top:14px;padding:13px;border:none;border-radius:12px;",
      "  background:var(--accent,#ff4d88);color:#fff;font-size:15px;font-weight:bold;cursor:pointer}",
      ".lcios-btn.copie{background:#2ecc71}",
      ".lcios-hint{font-size:12.5px;color:#8a868f;text-align:center;margin:10px 2px 0;line-height:1.4}",
      // flèche animée vers le bouton Partager (bas iPhone / haut iPad)
      ".lcios-arrow{position:fixed;left:50%;transform:translateX(-50%);z-index:9001;color:var(--accent,#ff4d88);",
      "  font-size:34px;pointer-events:none;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))}",
      ".lcios-arrow.bas{bottom:calc(4px + env(safe-area-inset-bottom));animation:lciosBounceD 1.1s infinite}",
      ".lcios-arrow.haut{top:8px;right:8px;left:auto;transform:none;animation:lciosBounceU 1.1s infinite}",
      "@keyframes lciosBounceD{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}",
      "@keyframes lciosBounceU{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}"
    ].join("\n");
    document.head.appendChild(css);
  }

  // Icône "Partager" iOS (carré + flèche vers le haut), en SVG inline
  var SHARE_SVG = '<svg class="lcios-share" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="M8 8l4-4 4 4"/><path d="M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/></svg>';

  function fermer(overlay, arrow) {
    overlay.classList.remove("show");
    if (arrow) arrow.remove();
    setTimeout(function () { overlay.remove(); }, 300);
  }

  function construire() {
    injecterCSS();

    var overlay = document.createElement("div");
    overlay.className = "lcios-overlay";
    overlay.setAttribute("role", "dialog");

    var sheet = document.createElement("div");
    sheet.className = "lcios-sheet";

    var fermeture = '<button class="lcios-close" aria-label="Fermer">✕</button>';
    var arrow = null;

    if (besoinSafari) {
      // ----- Navigateur intégré / non-Safari : il faut passer par Safari -----
      var ligneSafari = inApp
        ? 'Touche le menu <span class="lcios-pill">•••</span> en haut, puis <b>« Ouvrir dans Safari »</b>.'
        : 'Ouvre cette page dans <b>Safari</b> (l\'ajout à l\'écran d\'accueil n\'existe que là).';
      sheet.innerHTML =
        fermeture +
        '<div class="lcios-head"><div class="lcios-ico">🧭</div><div>' +
          '<p class="lcios-titre">Ouvre dans Safari pour installer</p>' +
          '<p class="lcios-sub">' + ligneSafari + '</p>' +
        '</div></div>' +
        '<button class="lcios-btn" id="lcios-copy">📋 Copier le lien</button>' +
        '<p class="lcios-hint">Astuce : colle le lien dans la barre d\'adresse de Safari, puis suis les étapes d\'installation.</p>';
    } else {
      // ----- Vrai Safari iOS : étapes d'ajout à l'écran d'accueil -----
      var lieuPartage = isIPad ? 'en haut à droite' : 'en bas de l\'écran';
      sheet.innerHTML =
        fermeture +
        '<div class="lcios-head"><div class="lcios-ico">🍴</div><div>' +
          '<p class="lcios-titre">Installer La Cuisine de Jéjé</p>' +
          '<p class="lcios-sub">Ajoute l\'app à ton écran d\'accueil — elle s\'ouvrira en plein écran, comme une vraie appli.</p>' +
        '</div></div>' +
        '<ul class="lcios-steps">' +
          '<li><span class="lcios-num">1</span><span>Touche ' + SHARE_SVG + ' <b>Partager</b> (' + lieuPartage + ')</span></li>' +
          '<li><span class="lcios-num">2</span><span>Choisis <b>« Sur l\'écran d\'accueil »</b></span></li>' +
          '<li><span class="lcios-num">3</span><span>Appuie sur <b>Ajouter</b> ✅</span></li>' +
        '</ul>' +
        '<button class="lcios-btn" id="lcios-ok">J\'ai compris</button>';

      // flèche animée vers le bouton Partager
      arrow = document.createElement("div");
      arrow.className = "lcios-arrow " + (isIPad ? "haut" : "bas");
      arrow.textContent = isIPad ? "⬆️" : "⬇️";
    }

    overlay.appendChild(sheet);
    document.body.appendChild(overlay);
    if (arrow) document.body.appendChild(arrow);

    // forcer le reflow puis animer l'entrée
    void overlay.offsetWidth;
    overlay.classList.add("show");

    // fermeture
    overlay.querySelector(".lcios-close").onclick = function () { poserCooldown(); fermer(overlay, arrow); };
    overlay.onclick = function (e) { if (e.target === overlay) { poserCooldown(); fermer(overlay, arrow); } };
    var ok = overlay.querySelector("#lcios-ok");
    if (ok) ok.onclick = function () { poserCooldown(); fermer(overlay, arrow); };

    // copier le lien
    var copy = overlay.querySelector("#lcios-copy");
    if (copy) copy.onclick = function () {
      var lien = location.href;
      var done = function () { copy.textContent = "✅ Lien copié !"; copy.classList.add("copie"); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lien).then(done).catch(function () { promptFallback(lien); });
      } else { promptFallback(lien); }
    };
    function promptFallback(lien) {
      try { window.prompt("Copie ce lien puis ouvre-le dans Safari :", lien); } catch (e) {}
    }
  }

  function afficher(force) {
    if (!isIOS) return;            // iOS uniquement
    if (estInstallee()) return;    // déjà installée → rien
    if (!force && enCooldown()) return;
    if (document.querySelector(".lcios-overlay")) return; // déjà ouverte
    construire();
  }

  // déclenchement manuel (ex. depuis un bouton "Installer l'app")
  window.lcAfficherInstallIOS = function () { afficher(true); };

  // affichage auto, après le splash, avec un petit délai
  function planifier() {
    if (!isIOS || estInstallee() || enCooldown()) return;
    setTimeout(function () { afficher(false); }, 2600);
  }
  if (document.readyState === "complete" || document.readyState === "interactive") {
    planifier();
  } else {
    window.addEventListener("DOMContentLoaded", planifier);
  }
})();
