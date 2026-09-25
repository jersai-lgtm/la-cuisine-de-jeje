// =============================================================================
// ⭐ noter_play.js — inviter à noter l'appli sur le Play Store (v5.2.2)
// -----------------------------------------------------------------------------
// Seuls les gens qui ont INSTALLÉ depuis le Play Store peuvent y laisser une note.
// On ne montre donc rien aux autres (web, « ajouter à l'écran d'accueil ») : ils
// n'auraient même pas le bouton pour noter. Dans une TWA, Android renseigne
// document.referrer avec « android-app://<paquet> » : c'est notre signal, mémorisé
// une fois pour toutes (le referrer n'est pas garanti à chaque navigation).
//
// Règles Google respectées : invitation NEUTRE (on ne trie pas selon que la personne
// a l'air contente), aucune contrepartie, et refusable — « plus tard » met deux mois.
// =============================================================================

(function () {
  const PAQUET = "io.github.jersai_lgtm.twa";
  const LIEN = "https://play.google.com/store/apps/details?id=" + PAQUET;
  const CLE_VIA = "lc_via_play";      // "1" si l'appli vient du Play Store
  const CLE_ETAT = "lc_note_play";    // "fait", ou la date ISO du report
  const CLE_VUES = "lc_ouvertures";   // nombre d'ouvertures (on n'embête pas au 1er lancement)
  const VISITES_MINI = 3;
  const REPORT_JOURS = 60;

  const T = (fr, en) => (window.LANG === "en" ? en : fr);
  const lire = (c) => { try { return localStorage.getItem(c); } catch (e) { return null; } };
  const ecrire = (c, v) => { try { localStorage.setItem(c, v); } catch (e) {} };

  function detecter() {
    try {
      if (document.referrer && document.referrer.indexOf("android-app://") === 0) ecrire(CLE_VIA, "1");
    } catch (e) {}
  }
  function viaPlay() { return lire(CLE_VIA) === "1"; }
  window.estInstalleDepuisPlay = viaPlay;

  window.ouvrirFichePlay = function () {
    ecrire(CLE_ETAT, "fait");
    fermer();
    try { window.open(LIEN, "_blank", "noopener"); } catch (e) { location.href = LIEN; }
  };

  // Lien réutilisable ailleurs (fenêtre « Tous les avis »). Vide si la personne
  // n'est pas passée par le Play Store : elle ne pourrait rien y noter.
  window.lienNotePlayHTML = function () {
    if (!viaPlay()) return "";
    return '<p class="note-play-lien"><a href="' + LIEN + '" target="_blank" rel="noopener" ' +
      "onclick=\"try{localStorage.setItem('" + CLE_ETAT + "','fait')}catch(e){}\">⭐ " +
      T("Noter l'appli sur le Play Store", "Rate the app on the Play Store") + "</a></p>";
  };

  function injecterStyle() {
    if (document.getElementById("note-play-style")) return;
    const s = document.createElement("style");
    s.id = "note-play-style";
    s.textContent = `
      /* box-sizing : sans lui, le padding s'ajoute à la largeur et la bannière déborde
         de l'écran (381 px de large sur un téléphone de 375). */
      #note-play-banner{position:fixed;left:50%;transform:translateX(-50%);bottom:88px;z-index:8980;
        box-sizing:border-box;width:calc(100vw - 24px);max-width:520px;display:flex;align-items:center;gap:10px;
        background:var(--panel-solid);color:var(--text);border:1px solid rgba(255,193,7,.45);
        border-radius:14px;padding:10px 12px 10px 16px;box-shadow:0 8px 28px rgba(0,0,0,.45);
        font-family:system-ui,-apple-system,sans-serif;animation:npUp .25s ease}
      @keyframes npUp{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
      /* Le texte prend la place qui reste : c'est ce qui manquait aux trois autres
         bannières, dont le texte tombait à 50 px de large sur un téléphone. */
      #note-play-banner .np-txt{flex:1 1 auto;min-width:0;font-size:14px;line-height:1.35}
      #note-play-banner .np-ok{flex:none;min-height:44px;padding:0 16px;border:none;border-radius:10px;
        background:linear-gradient(90deg,#ffc107,#ffb300);color:#3a2b00;font-size:14px;font-weight:800;cursor:pointer}
      #note-play-banner .np-no{flex:none;width:44px;height:44px;border:none;border-radius:50%;
        background:rgba(var(--w),.12);color:var(--text);font-size:14px;cursor:pointer}
      .note-play-lien{margin:14px 0 2px;text-align:center;font-size:13.5px}
      .note-play-lien a{color:var(--accent-soft,#ff8fb3);font-weight:700;text-decoration:none}
      .note-play-lien a:hover{text-decoration:underline}
      @media (max-width:480px){#note-play-banner{bottom:82px}}
    `;
    document.head.appendChild(s);
  }

  function fermer() {
    const b = document.getElementById("note-play-banner");
    if (b) b.remove();
  }

  function peutProposer() {
    if (!viaPlay()) return false;
    const etat = lire(CLE_ETAT);
    if (etat === "fait") return false;
    if (etat) {
      const d = new Date(etat);
      if (!isNaN(d.getTime()) && (Date.now() - d.getTime()) < REPORT_JOURS * 86400000) return false;
    }
    if (parseInt(lire(CLE_VUES) || "0", 10) < VISITES_MINI) return false;
    // Jamais deux invitations en même temps (installation, notifications, compte).
    if (document.getElementById("pwa-install-banner") ||
        document.getElementById("push-banner") ||
        document.getElementById("incit-banner")) return false;
    return true;
  }

  function afficher() {
    if (!peutProposer() || document.getElementById("note-play-banner")) return;
    injecterStyle();
    const b = document.createElement("div");
    b.id = "note-play-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", T("Noter l'application", "Rate the app"));
    b.innerHTML =
      '<span class="np-txt">' +
        T("⭐ Tu aimes La Cuisine de Jéjé ? Une note sur le Play Store aide d'autres gourmands à la trouver.",
          "⭐ Enjoying La Cuisine de Jéjé? A rating on the Play Store helps others find it.") +
      "</span>" +
      '<button type="button" class="np-ok" id="np-ok">' + T("Noter", "Rate") + "</button>" +
      '<button type="button" class="np-no" id="np-no" aria-label="' + T("Plus tard", "Maybe later") + '" title="' + T("Plus tard", "Maybe later") + '">✕</button>';
    document.body.appendChild(b);
    document.getElementById("np-ok").addEventListener("click", window.ouvrirFichePlay);
    document.getElementById("np-no").addEventListener("click", function () {
      ecrire(CLE_ETAT, new Date().toISOString());
      fermer();
    });
  }
  // Exposé pour un test manuel depuis la console.
  window.afficherInviteNotePlay = afficher;

  function demarrer() {
    detecter();
    if (!viaPlay()) return;
    ecrire(CLE_VUES, String(parseInt(lire(CLE_VUES) || "0", 10) + 1));
    // Après un moment d'usage, jamais dans les premières secondes.
    setTimeout(afficher, 12000);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
