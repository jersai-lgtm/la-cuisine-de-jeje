// =============================================================================
// 🌍 i18n.js — Bascule FR / EN (recettes + interface)
// -----------------------------------------------------------------------------
// 1) RECETTES : quand LANG = en, on fusionne window.RECETTES_EN dans `recettes`
//    en mémoire → noms / descriptions / étapes en anglais PARTOUT.
// 2) INTERFACE (« chrome ») : un dictionnaire FR→EN + un observateur de
//    mutations traduisent les textes / placeholders / titres au fur et à mesure
//    qu'ils apparaissent (statique ET généré par JS). Pour ajouter une chaîne,
//    il suffit de l'ajouter au dictionnaire DICT ci-dessous.
// Le changement de langue recharge la page.
//
// ⚠️ Doit être chargé APRÈS recettes_*.js + recettes_en.js et AVANT app.js.
// =============================================================================

(function () {
  let lang = "fr";
  try { lang = localStorage.getItem("cuisineJeje_lang"); } catch (e) {}
  if (lang !== "en") lang = "fr";
  window.LANG = lang;

  // --- 1) Fusion des recettes EN -------------------------------------------
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
          if (e) { if (e.titre) r.etapes[i].titre = e.titre; if (e.detail) r.etapes[i].detail = e.detail; }
        }
      }
    }
  }
  appliquerLangue(); // synchrone (recettes + RECETTES_EN déjà chargés)

  window.setLang = function (l) {
    l = (l === "en") ? "en" : "fr";
    if (l === window.LANG) return;
    try { localStorage.setItem("cuisineJeje_lang", l); } catch (e) {}
    location.reload();
  };

  // --- 2) Dictionnaire d'interface FR → EN ---------------------------------
  // Le gros du dico vit dans js/i18n_dict.js (window.I18N_DICT). Ici, juste
  // quelques génériques de secours ; I18N_DICT a priorité.
  const SEED = {
    "Annuler": "Cancel", "Valider": "Confirm", "Enregistrer": "Save", "Modifier": "Edit",
    "Retour": "Back", "Copier": "Copy", "Oui": "Yes", "Non": "No", "Continuer": "Continue",
    "Réinitialiser": "Reset", "Déconnexion": "Log out", "Amélioration": "Feedback",
    "💡 Amélioration": "💡 Feedback", "Générer un menu": "Generate a menu",
    "Ajouter des recettes": "Add recipes", "Plan de prep": "Prep plan",
    "Ajouter aux favoris": "Add to favorites", "personnes": "servings", "personne": "serving",
    "Effacer": "Clear", "Tout vider": "Clear all", "Partager": "Share",
  };
  const DICT = Object.assign({}, SEED, window.I18N_DICT || {}, window.I18N_ING || {});

  // Unités (sing+plur FR → EN) pour traduire les en-têtes "Pour N unité".
  const UNIT_EN = {
    "personne": "serving", "personnes": "servings", "part": "serving", "parts": "servings",
    "pâton": "dough ball", "pâtons": "dough balls", "pâte": "dough", "pâtes": "doughs",
    "boule": "ball", "boules": "balls", "pièce": "piece", "pièces": "pieces",
    "pot": "jar", "pots": "jars", "bol": "bowl", "bols": "bowls", "bac": "tub", "bacs": "tubs",
    "tranche": "slice", "tranches": "slices", "gaufre": "waffle", "gaufres": "waffles",
    "galette": "flatbread", "galettes": "flatbreads", "tartelette": "tartlet", "tartelettes": "tartlets",
    "fondant": "fondant", "fondants": "fondants", "croque-monsieur": "croque-monsieur",
  };

  function trad(s) {
    if (s == null) return null;
    const k = s.trim();
    if (!k) return null;
    const en = DICT[k];
    if (en != null) return s.replace(k, en);
    if (window.LANG === "en") {
      // "Pour N unité(s)" → "For N unit(s)"
      let m = /^Pour (\d+) (.+)$/.exec(k);
      if (m) return s.replace(k, "For " + m[1] + " " + (UNIT_EN[m[2]] || m[2]));
      // "N unité(s)" → "N unit(s)" (uniquement si l'unité est connue, pour ne pas toucher "200 g", "15 min"...)
      m = /^(\d+) (.+)$/.exec(k);
      if (m && UNIT_EN[m[2]]) return s.replace(k, m[1] + " " + UNIT_EN[m[2]]);
    }
    return null;
  }

  // Traduit récursivement les textes + attributs d'un sous-arbre (LANG=en)
  function traduireArbre(root) {
    if (window.LANG !== "en" || !root) return;
    // Textes
    if (root.nodeType === 3) { const r = trad(root.nodeValue); if (r !== null) root.nodeValue = r; return; }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const lots = []; let n;
    while ((n = w.nextNode())) lots.push(n);
    for (const node of lots) { const r = trad(node.nodeValue); if (r !== null) node.nodeValue = r; }
    // Attributs visibles
    const sel = "[placeholder],[title],[aria-label],[value]";
    const els = root.querySelectorAll ? root.querySelectorAll(sel) : [];
    els.forEach((el) => {
      ["placeholder", "title", "aria-label"].forEach((a) => {
        if (!el.hasAttribute(a)) return;
        const v = el.getAttribute(a), t = DICT[(v || "").trim()];
        if (t) el.setAttribute(a, t);
      });
      // value uniquement pour les boutons (pas les inputs texte de l'utilisateur)
      if ((el.tagName === "BUTTON" || el.type === "button" || el.type === "submit") && el.hasAttribute("value")) {
        const t = DICT[(el.getAttribute("value") || "").trim()];
        if (t) el.setAttribute("value", t);
      }
    });
  }
  window.tradArbre = traduireArbre; // exposé pour re-traduire après un rendu si besoin

  function demarrer() {
    if (window.LANG !== "en") {
      const b = document.getElementById("btn-lang"); if (b) b.textContent = "EN";
      return;
    }
    document.documentElement.lang = "en";
    traduireArbre(document.body);
    const b = document.getElementById("btn-lang"); if (b) b.textContent = "FR";
    // Observateur : traduit les nœuds ajoutés dynamiquement
    try {
      const obs = new MutationObserver((muts) => {
        for (const m of muts) {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === 1) traduireArbre(node);
            else if (node.nodeType === 3) { const r = trad(node.nodeValue); if (r !== null) node.nodeValue = r; }
          });
        }
      });
      obs.observe(document.body, { childList: true, subtree: true });
    } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
