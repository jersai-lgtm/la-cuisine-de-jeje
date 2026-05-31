// ============================================================
// version.js — Affiche la version déployée pour repérer toute
// régression d'un coup d'œil.
//  • Un petit badge "✅ Version XXX chargée" apparaît 2,5 s à chaque ouverture.
//  • La version est aussi loggée dans la console (F12).
//
// 👉 À CHAQUE déploiement : mets ce numéro À JOUR (le même que le ?v= dans
//    index.html et que CACHE_NAME dans service-worker.js).
// ============================================================
const APP_VERSION = "259-7";

console.log("%c🍳 La Cuisine de Jéjé — version " + APP_VERSION,
            "color:#ff6ba1;font-weight:bold;font-size:14px");

(function () {
  function afficherBadge() {
    if (document.getElementById("app-version-badge")) return;
    const b = document.createElement("div");
    b.id = "app-version-badge";
    b.textContent = "✅ Version " + APP_VERSION + " chargée";
    b.style.cssText =
      "position:fixed;bottom:80px;left:50%;transform:translateX(-50%);" +
      "z-index:99999;background:rgba(0,0,0,.82);color:#7CFC9A;" +
      "font-size:12px;font-weight:600;padding:6px 14px;border-radius:20px;" +
      "pointer-events:none;transition:opacity .6s;" +
      "font-family:system-ui,-apple-system,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.4)";
    document.body.appendChild(b);
    setTimeout(function () {
      b.style.opacity = "0";
      setTimeout(function () { b.remove(); }, 700);
    }, 2500);
  }
  if (document.readyState !== "loading") afficherBadge();
  else document.addEventListener("DOMContentLoaded", afficherBadge);
})();
