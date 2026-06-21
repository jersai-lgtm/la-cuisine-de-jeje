// =============================================================================
// 🌗 theme.js — Thème sombre / clair / AUTO (suit le réglage du téléphone)
// -----------------------------------------------------------------------------
// 3 modes mémorisés : "sombre" (défaut), "clair", "auto". En "auto", on suit
// prefers-color-scheme du système et on réagit aux changements en direct.
// Le thème est posé AVANT le rendu par un petit script inline en <head> (anti-flash).
// =============================================================================

(function () {
  const LS = "theme";
  const mq = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: light)");

  // Lit le MODE (avec migration des anciennes valeurs light/dark).
  function getMode() {
    try {
      const v = localStorage.getItem(LS);
      if (v === "clair" || v === "light") return "clair";
      if (v === "auto") return "auto";
      return "sombre"; // défaut + ancien "dark"
    } catch (e) { return "sombre"; }
  }
  function setMode(m) { try { localStorage.setItem(LS, m); } catch (e) {} }

  // Mode → thème effectif ("light" | "dark").
  function resolu(mode) {
    if (mode === "clair") return "light";
    if (mode === "auto") { const m = mq(); return (m && m.matches) ? "light" : "dark"; }
    return "dark";
  }

  function appliquer() {
    const mode = getMode();
    const theme = resolu(mode);
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    const btn = document.getElementById("btn-theme");
    if (btn) {
      btn.textContent = mode === "auto" ? "🌗" : mode === "clair" ? "☀️" : "🌙";
      btn.setAttribute("title", mode === "auto" ? "Thème : auto (suit ton téléphone)" : mode === "clair" ? "Thème : clair" : "Thème : sombre");
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f1ea" : "#ff4d88");
  }

  // Cycle : sombre → clair → auto → sombre
  window.basculerTheme = function () {
    const suite = { sombre: "clair", clair: "auto", auto: "sombre" };
    setMode(suite[getMode()] || "clair");
    appliquer();
    if (typeof afficherToast === "function") {
      const m = getMode();
      afficherToast(m === "auto" ? "🌗 Thème automatique" : m === "clair" ? "☀️ Thème clair" : "🌙 Thème sombre");
    }
  };

  // Réagit au changement système quand on est en "auto".
  const m = mq();
  if (m) {
    const onChange = () => { if (getMode() === "auto") appliquer(); };
    if (m.addEventListener) m.addEventListener("change", onChange);
    else if (m.addListener) m.addListener(onChange);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", appliquer);
  else appliquer();
})();
