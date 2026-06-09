// ============================================================
// version.js — Affiche la version déployée UNIQUEMENT pour l'admin (Jérôme),
// pour repérer toute régression d'un coup d'œil. Les autres utilisateurs
// ne voient rien (le badge est réservé à l'admin via estAdmin()).
//  • La version est toujours loggée dans la console (F12).
//
// 👉 À CHAQUE déploiement : mets ce numéro À JOUR (le même que le ?v= dans
//    index.html et que CACHE_NAME dans service-worker.js).
// ============================================================
const APP_VERSION = "1.4.8";

console.log("%c🍳 La Cuisine de Jéjé — version " + APP_VERSION,
            "color:#ff6ba1;font-weight:bold;font-size:14px");

(function () {
  function montrerBadge() {
    if (window._badgeVersionMontre) return;
    // Réservé à l'admin : inutile (et parasite) pour les utilisateurs normaux
    if (typeof estAdmin !== "function" || !estAdmin()) return;
    window._badgeVersionMontre = true;
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
  // Le statut admin n'est connu qu'après la connexion (auth asynchrone) :
  // on (re)tente à chaque mise à jour de profil, et une fois au chargement.
  window.addEventListener("profilMisAJour", montrerBadge);
  if (document.readyState !== "loading") montrerBadge();
  else document.addEventListener("DOMContentLoaded", montrerBadge);
})();
