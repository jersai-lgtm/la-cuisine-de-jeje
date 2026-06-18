// =============================================================================
// 📅 PARTAGE DU MENU DE LA SEMAINE — lien + repli texte
// -----------------------------------------------------------------------------
// « Voici notre menu de la semaine » → un bouton génère un lien (WhatsApp/SMS
// via le partage natif). Le destinataire ouvre le lien : le planning s'affiche
// en plein écran (Midi/Soir par jour), sans compte ni appli. Le menu est ENCODÉ
// dans l'URL (?menu=…) — on n'envoie que les NOMS des plats (auto-suffisant).
// =============================================================================

(function () {
  function enc(obj) {
    return btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function dec(s) {
    try {
      s = s.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(escape(atob(s))));
    } catch (e) { return null; }
  }
  const escHTML = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  let _menuCourant = null; // mémorisé via injecterBoutonPartageMenu

  function nomDe(v) {
    if (!v) return "";
    const key = (typeof v === "string") ? v : v.recette;
    if (!key) return "";
    return (typeof getNomRecette === "function") ? getNomRecette(key) : key;
  }
  // Un créneau → soit une string (plat simple), soit {e,p,d} (complet), soit null
  function slotData(slot) {
    if (!slot) return null;
    if (typeof slot === "string") return nomDe(slot);
    if (slot.recette) return nomDe(slot);
    if (slot.entree || slot.plat || slot.dessert) {
      const o = {};
      const e = nomDe(slot.entree), p = nomDe(slot.plat), d = nomDe(slot.dessert);
      if (e) o.e = e; if (p) o.p = p; if (d) o.d = d;
      return Object.keys(o).length ? o : null;
    }
    return null;
  }

  // Construit l'objet partageable depuis le menu courant
  function collecterMenu(menus) {
    const m = menus || _menuCourant || window._derniersMenus;
    if (!m || !Array.isArray(m.semaine)) return null;
    const jours = m.semaine.map(j => {
      const o = { j: j.jour };
      const mi = slotData(j.midi), so = slotData(j.soir);
      if (mi) o.m = mi; if (so) o.s = so;
      return o;
    }).filter(j => j.m || j.s);
    if (!jours.length) return null;
    return { t: "Menu de la semaine", d: jours };
  }

  // Texte d'un créneau pour le repli SMS/WhatsApp
  function slotTexte(v) {
    if (!v) return "—";
    if (typeof v === "string") return v;
    const parts = [];
    if (v.e) parts.push("Entrée : " + v.e);
    if (v.p) parts.push("Plat : " + v.p);
    if (v.d) parts.push("Dessert : " + v.d);
    return parts.join(" / ");
  }

  window.partagerMenuSemaine = async function () {
    const data = collecterMenu();
    if (!data) { if (typeof afficherToast === "function") afficherToast("Génère d'abord un menu de la semaine."); return; }
    const lien = location.origin + location.pathname + "?menu=" + enc(data);
    const texte = "📅 Menu de la semaine\n\n" + data.d.map(j => {
      const lignes = [];
      if (j.m) lignes.push("  ☀️ Midi : " + slotTexte(j.m));
      if (j.s) lignes.push("  🌙 Soir : " + slotTexte(j.s));
      return j.j + "\n" + lignes.join("\n");
    }).join("\n\n");
    const payload = { title: "📅 Menu de la semaine", text: texte + "\n\n👉 Version détaillée : " + lien };
    if (navigator.share) {
      try { await navigator.share(payload); return; }
      catch (e) { if (e && e.name === "AbortError") return; }
    }
    try {
      await navigator.clipboard.writeText(payload.text);
      if (typeof afficherToast === "function") afficherToast("📋 Menu copié — colle-le dans WhatsApp/SMS");
    } catch (e) {
      try { prompt("Copie ton menu :", payload.text); } catch (e2) {}
    }
  };

  // --- Vue DESTINATAIRE : overlay plein écran ---
  function afficherMenuPartage(data) {
    if (!document.getElementById("menu-partage-style")) {
      const st = document.createElement("style");
      st.id = "menu-partage-style";
      st.textContent =
        "#menu-partage-overlay{position:fixed;inset:0;z-index:100000;background:#14121a;overflow-y:auto;-webkit-overflow-scrolling:touch}" +
        "#menu-partage-overlay .mp-wrap{max-width:560px;margin:0 auto;padding:16px 14px 60px}" +
        "#menu-partage-overlay .mp-head{display:flex;align-items:center;gap:10px;position:sticky;top:0;background:#14121a;padding:8px 2px 12px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:14px}" +
        "#menu-partage-overlay .mp-titre{font-size:1.15rem;font-weight:800;color:#fff;flex:1}" +
        "#menu-partage-overlay .mp-fermer{background:rgba(255,255,255,.1);border:none;color:#ddd;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer}" +
        "#menu-partage-overlay .mp-jour{background:rgba(255,255,255,.04);border-radius:14px;padding:12px 14px;margin-bottom:12px}" +
        "#menu-partage-overlay .mp-jour-nom{font-weight:800;color:var(--accent-soft,#ff8fb3);font-size:1rem;margin-bottom:8px}" +
        "#menu-partage-overlay .mp-repas{display:flex;gap:8px;padding:6px 0;border-top:1px solid rgba(255,255,255,.05)}" +
        "#menu-partage-overlay .mp-repas:first-of-type{border-top:none}" +
        "#menu-partage-overlay .mp-moment{flex:0 0 auto;font-size:14px}" +
        "#menu-partage-overlay .mp-plats{flex:1;color:#ece9f1;font-size:14px;line-height:1.5}" +
        "#menu-partage-overlay .mp-sous{color:#b3b0b8;font-size:13px}" +
        "#menu-partage-overlay .mp-pied{text-align:center;margin-top:18px}" +
        "#menu-partage-overlay .mp-pied a{color:var(--accent-soft,#ff8fb3);font-size:13px}";
      document.head.appendChild(st);
    }

    const platHTML = (v) => {
      if (!v) return '<span class="mp-sous">—</span>';
      if (typeof v === "string") return escHTML(v);
      const parts = [];
      if (v.e) parts.push('<span class="mp-sous">Entrée :</span> ' + escHTML(v.e));
      if (v.p) parts.push('<span class="mp-sous">Plat :</span> ' + escHTML(v.p));
      if (v.d) parts.push('<span class="mp-sous">Dessert :</span> ' + escHTML(v.d));
      return parts.join("<br>");
    };

    const joursHTML = data.d.map(j => {
      const repas = [];
      if (j.m) repas.push('<div class="mp-repas"><span class="mp-moment">☀️ Midi</span><span class="mp-plats">' + platHTML(j.m) + '</span></div>');
      if (j.s) repas.push('<div class="mp-repas"><span class="mp-moment">🌙 Soir</span><span class="mp-plats">' + platHTML(j.s) + '</span></div>');
      return '<div class="mp-jour"><div class="mp-jour-nom">' + escHTML(j.j) + '</div>' + repas.join("") + '</div>';
    }).join("");

    const base = location.origin + location.pathname;
    const ov = document.createElement("div");
    ov.id = "menu-partage-overlay";
    ov.innerHTML =
      '<div class="mp-wrap">' +
      '<div class="mp-head"><span class="mp-titre">📅 ' + escHTML(data.t || "Menu de la semaine") + '</span>' +
      '<button class="mp-fermer" onclick="document.getElementById(\'menu-partage-overlay\').remove()" aria-label="Fermer">×</button></div>' +
      joursHTML +
      '<div class="mp-pied"><a href="' + base + '">↗ Ouvrir La Cuisine de Jéjé</a></div>' +
      '</div>';
    document.body.appendChild(ov);
  }

  function init() {
    const m = location.search.match(/[?&]menu=([^&]+)/);
    if (!m) return;
    const data = dec(decodeURIComponent(m[1]));
    if (data && Array.isArray(data.d) && data.d.length) {
      const go = () => afficherMenuPartage(data);
      if (document.body) go(); else document.addEventListener("DOMContentLoaded", go);
    }
  }
  init();

  // --- Injecte le bouton « Partager le menu » dans l'écran résultat ---
  window.injecterBoutonPartageMenu = function (containerId, menus) {
    if (menus) _menuCourant = menus;
    const cont = document.getElementById(containerId);
    if (!cont) return;
    if (document.getElementById("menu-btn-partager")) return;
    const btn = document.createElement("button");
    btn.id = "menu-btn-partager";
    btn.type = "button";
    btn.textContent = "📤 Partager le menu";
    btn.setAttribute("onclick", "partagerMenuSemaine()");
    btn.setAttribute("style", "display:block;width:100%;margin:10px 0 4px;background:transparent;color:var(--accent-soft,#ff8fb3);border:1.5px solid var(--accent,#ff4d88);border-radius:12px;padding:10px;font-weight:600;font-size:14px;cursor:pointer");
    cont.appendChild(btn);
  };
})();
