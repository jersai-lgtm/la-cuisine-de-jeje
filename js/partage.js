// =============================================================================
// 📤 PARTAGE DE RECETTE — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Partage natif (Web Share API) du lien de la page SEO de la recette
// (https://…/recette/<clé>.html → joli aperçu grâce aux balises OpenGraph).
// Replis : copie du lien dans le presse-papier, puis prompt.
// =============================================================================

(function () {
  const BASE = "https://jersai-lgtm.github.io/la-cuisine-de-jeje";

  window.partagerRecette = async function (key) {
    if (!key) return;
    const nom = (typeof getNomRecette === "function" ? getNomRecette(key) : "")
      || (typeof recettes !== "undefined" && recettes[key] && recettes[key].nom)
      || "cette recette";
    const url = `${BASE}/recette/${encodeURIComponent(key)}.html`;
    const data = {
      title: `${nom} — La Cuisine de Jéjé`,
      text: `Regarde cette recette : ${nom} 🍽️`,
      url,
    };

    // 1) Partage natif (mobile surtout)
    if (navigator.share) {
      try { await navigator.share(data); return; }
      catch (e) { if (e && e.name === "AbortError") return; /* sinon on tente un repli */ }
    }
    // 2) Repli : copie du lien
    try {
      await navigator.clipboard.writeText(url);
      if (typeof afficherToast === "function") afficherToast("🔗 Lien de la recette copié !");
      return;
    } catch (e) { /* clipboard indisponible */ }
    // 3) Dernier repli
    window.prompt("Copie ce lien pour partager la recette :", url);
  };
})();
