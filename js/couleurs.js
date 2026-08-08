// =============================================================================
// 🎨 couleurs.js — Couleur d'accent personnalisée (v5.1)
// -----------------------------------------------------------------------------
// L'appli est rose depuis toujours, mais tout le CSS passe déjà par cinq
// variables : --accent, --accent-light, --accent-soft, --accent-pale et
// --accent-rgb. Changer la couleur revient donc à surcharger ces cinq valeurs
// sur <html> — aucun sélecteur, aucune feuille de style supplémentaire.
//
// Le choix est MÉMORISÉ EN LOCAL (donc il marche sans compte) et, si la
// personne est connectée, recopié dans son profil Firestore : Cédric retrouve
// son noir sur le téléphone du salon, Amélie garde son bleu sur le sien.
//
// Deux nuances par palette :
//   • soft / pale servent sur fond SOMBRE  → versions claircies ;
//   • softClair / paleClair sur fond CLAIR → versions foncées, sinon le texte
//     d'accent devient illisible sur le thème clair.
// C'est exactement ce que fait déjà style.css pour le rose.
// =============================================================================

(function () {
  "use strict";

  var LS = "couleurAccent";

  // Chaque palette : accent principal, variante claire, et les deux nuances
  // déclinées pour fond sombre puis pour fond clair.
  var PALETTES = {
    rose:     { nom: "Rose",     accent: "#ff4d88", light: "#ff6ba1", soft: "#ff8fb3", pale: "#ffb3cc", softClair: "#d12d74", paleClair: "#c2185b" },
    bleu:     { nom: "Bleu",     accent: "#3d8bfd", light: "#5b9dfd", soft: "#8fbcff", pale: "#b3d1ff", softClair: "#1565c0", paleClair: "#0d47a1" },
    turquoise:{ nom: "Turquoise",accent: "#17becf", light: "#3fcdda", soft: "#7fdfe8", pale: "#a9ecf2", softClair: "#00838f", paleClair: "#006064" },
    vert:     { nom: "Vert",     accent: "#3fb96b", light: "#5bc983", soft: "#8fdca8", pale: "#b6e9c6", softClair: "#2e7d32", paleClair: "#1b5e20" },
    or:       { nom: "Or",       accent: "#e8a33d", light: "#f0b45c", soft: "#f5cb90", pale: "#f9dfb8", softClair: "#a06a00", paleClair: "#7d5200" },
    orange:   { nom: "Orange",   accent: "#ff7043", light: "#ff8a65", soft: "#ffab91", pale: "#ffccbc", softClair: "#d84315", paleClair: "#bf360c" },
    rouge:    { nom: "Rouge",    accent: "#e64a4a", light: "#ef6b6b", soft: "#f79a9a", pale: "#fbc0c0", softClair: "#c62828", paleClair: "#8e0000" },
    violet:   { nom: "Violet",   accent: "#a56cf0", light: "#b785f3", soft: "#cfaef8", pale: "#e2cdfb", softClair: "#7b1fa2", paleClair: "#4a148c" },
    ardoise:  { nom: "Ardoise",  accent: "#9aa4b2", light: "#b0b8c4", soft: "#c9cfd8", pale: "#dfe3e9", softClair: "#455a64", paleClair: "#263238" }
  };
  var DEFAUT = "rose";

  function hexVersRgb(hex) {
    var h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)].join(",");
  }

  function lire() {
    try {
      var v = localStorage.getItem(LS);
      return PALETTES[v] ? v : DEFAUT;
    } catch (e) { return DEFAUT; }
  }

  // Pose (ou retire) les surcharges sur <html>. Le rose étant la couleur
  // native de style.css, on nettoie les variables au lieu de les réécrire :
  // la feuille de style reprend la main, y compris ses nuances de thème clair.
  function appliquer(cle) {
    var p = PALETTES[cle] || PALETTES[DEFAUT];
    var s = document.documentElement.style;
    if (cle === DEFAUT) {
      ["--accent", "--accent-light", "--accent-soft", "--accent-pale", "--accent-rgb"].forEach(function (v) { s.removeProperty(v); });
    } else {
      var clair = document.documentElement.getAttribute("data-theme") === "light";
      s.setProperty("--accent", p.accent);
      s.setProperty("--accent-light", p.light);
      s.setProperty("--accent-soft", clair ? p.softClair : p.soft);
      s.setProperty("--accent-pale", clair ? p.paleClair : p.pale);
      s.setProperty("--accent-rgb", hexVersRgb(p.accent));
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta && document.documentElement.getAttribute("data-theme") !== "light") meta.setAttribute("content", p.accent);
  }

  // Exposé : le thème clair/sombre doit rejouer l'application, les nuances
  // soft/pale n'étant pas les mêmes selon le fond.
  window.reappliquerCouleur = function () { appliquer(lire()); };

  window.choisirCouleur = function (cle) {
    if (!PALETTES[cle]) return;
    try { localStorage.setItem(LS, cle); } catch (e) {}
    appliquer(cle);
    majSelection();
    // Synchronisation du profil : la couleur suit la personne, pas l'appareil.
    try {
      if (window.currentUser && typeof _db !== "undefined" && _db) {
        _db.collection("utilisateurs").doc(window.currentUser.uid)
          .set({ couleurAccent: cle }, { merge: true })
          .catch(function (e) { console.warn("Couleur non synchronisée :", e); });
      }
      if (window.userProfile) window.userProfile.couleurAccent = cle;
    } catch (e) {}
    if (typeof afficherToast === "function") afficherToast("🎨 Couleur « " + PALETTES[cle].nom + " »");
  };

  // Appelé après le chargement du profil : la couleur enregistrée sur le compte
  // l'emporte sur celle de l'appareil (c'est le but — retrouver SA couleur).
  window.appliquerCouleurDuProfil = function () {
    try {
      var c = window.userProfile && window.userProfile.couleurAccent;
      if (c && PALETTES[c] && c !== lire()) {
        localStorage.setItem(LS, c);
        appliquer(c);
        majSelection();
      }
    } catch (e) {}
  };

  function majSelection() {
    var actif = lire();
    document.querySelectorAll(".pastille-couleur").forEach(function (b) {
      var on = b.dataset.couleur === actif;
      b.setAttribute("aria-checked", on ? "true" : "false");
      b.style.outline = on ? "2px solid var(--text)" : "none";
      b.style.outlineOffset = "2px";
    });
  }

  window.ouvrirPaletteCouleurs = function () {
    var existant = document.getElementById("palette-couleurs");
    if (existant) { existant.remove(); return; }

    var actif = lire();
    var pastilles = Object.keys(PALETTES).map(function (cle) {
      var p = PALETTES[cle];
      return '<button type="button" class="pastille-couleur" role="radio" data-couleur="' + cle + '"' +
        ' aria-checked="' + (cle === actif ? "true" : "false") + '"' +
        ' aria-label="Couleur ' + p.nom + '" title="' + p.nom + '"' +
        ' onclick="choisirCouleur(\'' + cle + '\')"' +
        ' style="width:34px;height:34px;border-radius:50%;cursor:pointer;border:2px solid rgba(var(--w),.25);' +
        'background:linear-gradient(135deg,' + p.accent + ' 0%,' + p.light + ' 100%);' +
        (cle === actif ? "outline:2px solid var(--text);outline-offset:2px;" : "") + '"></button>';
    }).join("");

    var d = document.createElement("div");
    d.id = "palette-couleurs";
    d.setAttribute("role", "radiogroup");
    d.setAttribute("aria-label", "Couleur de l'application");
    d.style.cssText = "position:fixed;z-index:9999;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.45);" +
      "display:flex;align-items:center;justify-content:center;padding:20px";
    d.innerHTML =
      '<div style="background:var(--surface-1);border:1px solid rgba(var(--w),.15);border-radius:18px;' +
      'padding:22px;max-width:340px;width:100%;box-shadow:0 12px 40px rgba(0,0,0,.4)" onclick="event.stopPropagation()">' +
      '<h3 style="margin:0 0 6px;font-size:17px;color:var(--text)">🎨 Couleur de l\'appli</h3>' +
      '<p style="margin:0 0 16px;font-size:13px;color:var(--text-3);line-height:1.4">Chacun la sienne : si tu as un compte, ta couleur te suit d\'un appareil à l\'autre.</p>' +
      '<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">' + pastilles + '</div>' +
      '<button type="button" onclick="document.getElementById(\'palette-couleurs\').remove()" ' +
      'style="margin-top:18px;width:100%;padding:10px;border-radius:11px;border:1px solid rgba(var(--w),.2);' +
      'background:transparent;color:var(--text-2);font-size:14px;cursor:pointer">Fermer</button></div>';
    d.addEventListener("click", function () { d.remove(); });
    document.body.appendChild(d);
  };

  // auth.js émet cet événement dès que le profil est chargé ou rafraîchi :
  // c'est le bon moment pour reprendre la couleur enregistrée sur le compte.
  window.addEventListener("profilMisAJour", function () { window.appliquerCouleurDuProfil(); });

  appliquer(lire());
})();
