// =============================================================================
// 🐞 REMONTÉE D'ERREURS — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Capture les erreurs JS réelles des utilisateurs (erreurs non interceptées +
// promesses rejetées) et les enregistre dans la collection Firestore "erreurs"
// (lisible par l'admin → tu vois ce qui casse en vrai, dans la console Firebase).
//
// Garde-fous : ignore les erreurs cross-origin sans info ("Script error."),
// déduplique, plafonne à 8 remontées/session, borne la taille des champs, et
// échoue en silence (le logging ne doit jamais provoquer d'erreur).
// =============================================================================

(function () {
  const MAX_PAR_SESSION = 8;
  const vus = new Set();
  let envoyees = 0;

  function tronquer(s, n) { return String(s == null ? "" : s).slice(0, n); }

  function remonter(type, message, extra) {
    try {
      if (!message) return;
      const msg = tronquer(message, 500);
      if (/^Script error\.?$/i.test(msg)) return;       // cross-origin sans détail
      const sig = type + "|" + msg + "|" + (extra && extra.url || "");
      if (vus.has(sig)) return;                          // déjà remontée
      vus.add(sig);
      if (envoyees >= MAX_PAR_SESSION) return;           // plafond anti-spam
      envoyees++;

      if (typeof _db === "undefined" || !_db) return;    // Firestore indispo → on abandonne
      const doc = {
        type: type,
        message: msg,
        stack: tronquer(extra && extra.stack, 1500),
        url: tronquer((location && location.pathname) || "", 200),
        ua: tronquer((navigator && navigator.userAgent) || "", 300),
        version: (typeof APP_VERSION !== "undefined") ? String(APP_VERSION) : "",
        uid: (window.currentUser && window.currentUser.uid) || "",
        date: new Date().toISOString(),
      };
      _db.collection("erreurs").add(doc).catch(function () { /* silencieux (ex. règle non déployée) */ });
    } catch (e) { /* le logger ne casse jamais */ }
  }

  window.addEventListener("error", function (e) {
    remonter("error", e && e.message, {
      url: e && e.filename,
      stack: (e && e.error && e.error.stack) || ((e && e.filename) ? e.filename + ":" + e.lineno + ":" + e.colno : ""),
    });
  });

  window.addEventListener("unhandledrejection", function (e) {
    const r = e && e.reason;
    const message = (r && (r.message || r.toString && r.toString())) || "Promesse rejetée";
    remonter("unhandledrejection", message, { stack: r && r.stack });
  });
})();
