// =============================================================================
// 🌡️ meteo.js — Météo locale (sans permission) pour adapter les suggestions
// -----------------------------------------------------------------------------
// Récupère la température du jour via géoloc par IP (ipapi.co) + Open-Meteo
// (gratuit, sans clé, CORS OK). Met window._meteo = { temp, chaud, froid }.
// Mémorisé 3 h en local. Utilisé par le swipe : chaud → plats frais ; froid →
// plats réconfortants. Best-effort : si ça échoue, on ne biaise rien.
// =============================================================================

(function () {
  const LS = "meteo_cache";
  const SEUIL_CHAUD = 28;  // ≥ 28°C → on penche vers le frais
  const SEUIL_FROID = 7;   // ≤ 7°C  → on penche vers le réconfortant

  function poser(temp) {
    window._meteo = { temp: temp, chaud: temp >= SEUIL_CHAUD, froid: temp <= SEUIL_FROID };
  }
  function lireCache() {
    try { const c = JSON.parse(localStorage.getItem(LS) || "null"); if (c && (Date.now() - c.t) < 3 * 3600e3) return c; } catch (e) {}
    return null;
  }
  async function charger() {
    const c = lireCache();
    if (c) { poser(c.temp); return; }
    try {
      const ll = await fetch("https://ipapi.co/latlong/").then((r) => (r.ok ? r.text() : ""));
      const [lat, lon] = String(ll).trim().split(",");
      if (!lat || !lon || isNaN(parseFloat(lat))) return;
      const w = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + encodeURIComponent(lat) + "&longitude=" + encodeURIComponent(lon) + "&current=temperature_2m").then((r) => r.json());
      const temp = w && w.current && w.current.temperature_2m;
      if (typeof temp === "number") {
        try { localStorage.setItem(LS, JSON.stringify({ temp: temp, t: Date.now() })); } catch (e) {}
        poser(temp);
      }
    } catch (e) { /* hors-ligne / bloqué → pas de biais météo */ }
  }
  charger();
})();
