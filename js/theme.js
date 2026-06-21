// =============================================================================
// 🌗 theme.js — Bascule thème clair / sombre
// -----------------------------------------------------------------------------
// Le sombre est le défaut (variables CSS d'origine). Le mode clair surcharge ces
// variables via html[data-theme="light"]. Préférence mémorisée. Le thème est déjà
// appliqué AVANT le rendu par un petit script inline en <head> (anti-flash) ; ici
// on gère le bouton, l'icône et la persistance.
// =============================================================================

(function () {
  const LS = "theme";
  const get = () => { try { return localStorage.getItem(LS) === "light" ? "light" : "dark"; } catch (e) { return "dark"; } };
  const set = (v) => { try { localStorage.setItem(LS, v); } catch (e) {} };

  function appliquer(theme) {
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    const btn = document.getElementById("btn-theme");
    if (btn) {
      btn.textContent = theme === "light" ? "☀️" : "🌙";
      btn.setAttribute("title", theme === "light" ? "Passer en sombre" : "Passer en clair");
    }
    // Met à jour la couleur de la barre système (PWA)
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f1ea" : "#ff4d88");
  }

  window.basculerTheme = function () {
    const nouveau = get() === "light" ? "dark" : "light";
    set(nouveau);
    appliquer(nouveau);
  };

  // Synchronise l'icône au chargement (le thème lui-même est déjà posé en <head>).
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => appliquer(get()));
  } else {
    appliquer(get());
  }
})();
