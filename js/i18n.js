// =============================================================================
// 🌍 i18n.js — Bascule FR / EN
// -----------------------------------------------------------------------------
// Approche : quand la langue choisie est EN, on FUSIONNE les traductions de
// window.RECETTES_EN (généré par tools/traduire_batch.mjs) dans les objets
// `recettes` EN MÉMOIRE. Du coup les noms, descriptions et étapes s'affichent
// en anglais PARTOUT (cartes, recherche, menus, fiches, mode cuisson) sans
// modifier chaque écran. Le changement de langue recharge la page.
//
// ⚠️ Doit être chargé APRÈS recettes_*.js + recettes_en.js et AVANT app.js.
//
// Phase 2b (à venir) : libellés d'ingrédients, unités et reste du « chrome » UI.
// =============================================================================

(function () {
  let lang = "fr";
  try { lang = localStorage.getItem("cuisineJeje_lang"); } catch (e) {}
  if (lang !== "en") lang = "fr";
  window.LANG = lang;

  // Fusionne les champs EN dans `recettes` (si LANG === "en").
  function appliquerLangue() {
    if (window.LANG !== "en" || typeof recettes === "undefined" || !window.RECETTES_EN) return;
    for (const k in recettes) {
      const en = window.RECETTES_EN[k];
      if (!en) continue;
      const r = recettes[k];
      if (!r) continue;
      if (en.nom) r.nom = en.nom;
      if (en.description) r.description = en.description;
      if (Array.isArray(en.etapes) && Array.isArray(r.etapes)) {
        for (let i = 0; i < r.etapes.length && i < en.etapes.length; i++) {
          const e = en.etapes[i];
          if (e) {
            if (e.titre) r.etapes[i].titre = e.titre;
            if (e.detail) r.etapes[i].detail = e.detail;
          }
        }
      }
    }
  }
  // Synchrone : recettes + RECETTES_EN sont déjà chargés (scripts placés avant app.js)
  appliquerLangue();

  window.setLang = function (l) {
    l = (l === "en") ? "en" : "fr";
    if (l === window.LANG) return;
    try { localStorage.setItem("cuisineJeje_lang", l); } catch (e) {}
    location.reload();
  };

  // --- Chrome traduit (éléments [data-i18n] + bouton de langue) ---
  const UI = {
    "nav.accueil": { fr: "Accueil",      en: "Home" },
    "nav.garde":   { fr: "Garde-manger", en: "Pantry" },
    "nav.menus":   { fr: "Menus",        en: "Menus" },
    "nav.stats":   { fr: "Mes Stats",    en: "My Stats" },
    "nav.admin":   { fr: "Admin",        en: "Admin" },
  };
  window.t = function (key) {
    const e = UI[key];
    if (!e) return key;
    return (window.LANG === "en" && e.en) ? e.en : e.fr;
  };

  function appliquerChrome() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const e = UI[el.getAttribute("data-i18n")];
      if (e) el.textContent = (window.LANG === "en" && e.en) ? e.en : e.fr;
    });
    const b = document.getElementById("btn-lang");
    if (b) b.textContent = (window.LANG === "en") ? "FR" : "EN";
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", appliquerChrome);
  else appliquerChrome();
})();
