// =============================================================================
// 🌡️ meteo.js — Météo locale (sans permission) pour adapter les suggestions
// -----------------------------------------------------------------------------
// Récupère la température du jour via géoloc par IP (ipapi.co) + Open-Meteo
// (gratuit, sans clé, CORS OK). Met window._meteo = { temp, chaud, froid }.
// Mémorisé 3 h en local. Utilisé par le swipe : chaud → plats frais ; froid →
// plats réconfortants. Best-effort : si ça échoue, on ne biaise rien.
// =============================================================================

(function () {
  const LS = "meteo_cache_v2";  // v2 : passage au GPS prioritaire → on ignore l'ancien cache IP
  const SEUIL_CHAUD = 28;  // ≥ 28°C → on penche vers le frais
  const SEUIL_FROID = 7;   // ≤ 7°C  → on penche vers le réconfortant

  function poser(temp) {
    window._meteo = { temp: temp, chaud: temp >= SEUIL_CHAUD, froid: temp <= SEUIL_FROID };
  }
  function lireCache() {
    try { const c = JSON.parse(localStorage.getItem(LS) || "null"); if (c && (Date.now() - c.t) < 3 * 3600e3) return c; } catch (e) {}
    return null;
  }
  // GPS précis du téléphone (autorisation demandée une fois). Repli silencieux
  // (null) si refusé, indisponible ou trop lent → on bascule alors sur l'IP.
  function gpsLatLon() {
    return new Promise((res) => {
      if (!navigator.geolocation) return res(null);
      navigator.geolocation.getCurrentPosition(
        (p) => res([p.coords.latitude, p.coords.longitude]),
        () => res(null),
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 3 * 3600e3 }
      );
    });
  }
  // Localisation : GPS d'abord (précis), puis plusieurs sources IP en repli
  // (ipapi.co est souvent rate-limité) → on essaie jusqu'à une lat/lon valide.
  async function getLatLon() {
    // 0) GPS précis
    try { const g = await gpsLatLon(); if (g) return g; } catch (e) {}
    // 1) ipapi.co (texte "lat,lon")
    try {
      const t = await fetch("https://ipapi.co/latlong/").then((r) => (r.ok ? r.text() : ""));
      const [a, b] = String(t).trim().split(",");
      if (a && b && !isNaN(parseFloat(a)) && !isNaN(parseFloat(b))) return [a, b];
    } catch (e) {}
    // 2) ipwho.is (JSON {latitude, longitude})
    try {
      const j = await fetch("https://ipwho.is/").then((r) => r.json());
      if (j && typeof j.latitude === "number") return [j.latitude, j.longitude];
    } catch (e) {}
    // 3) geojs.io (JSON {latitude, longitude} en chaînes)
    try {
      const j = await fetch("https://get.geojs.io/v1/ip/geo.json").then((r) => r.json());
      if (j && j.latitude && !isNaN(parseFloat(j.latitude))) return [j.latitude, j.longitude];
    } catch (e) {}
    return null;
  }
  async function charger() {
    const c = lireCache();
    if (c) { poser(c.temp); return; }
    try {
      const ll = await getLatLon();
      if (!ll) return;
      const [lat, lon] = ll;
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
