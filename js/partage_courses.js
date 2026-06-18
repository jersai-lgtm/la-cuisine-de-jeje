// =============================================================================
// 📤 PARTAGE DE LA LISTE DE COURSES — lien cochable + repli texte
// -----------------------------------------------------------------------------
// « Je suis à la maison, mon épouse est en course » → un bouton génère un lien
// (WhatsApp/SMS via le partage natif). Le destinataire ouvre le lien : une liste
// par rayon avec cases à cocher, qu'il coche au fur et à mesure. Aucun compte,
// aucune appli à installer — la liste est ENCODÉE dans l'URL (?courses=…). Ses
// cases cochées sont mémorisées en local (sur son téléphone). Repli texte si le
// partage natif n'est pas dispo.
// =============================================================================

(function () {
  // --- encodage URL-safe (gère l'unicode) ---
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
  function hashCourt(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; } return Math.abs(h).toString(36); }
  const escHTML = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // --- Lit la liste rendue dans le DOM (rayons recettes + Mes articles) ---
  function collecterListe() {
    const rayons = [];
    ["lc-rayons", "lc-perso-zone"].forEach(id => {
      const cont = document.getElementById(id);
      if (!cont) return;
      cont.querySelectorAll(".lc-rayon").forEach(r => {
        const nom = (r.querySelector(".lc-rayon-titre")?.textContent || "").replace(/\s*\d+\s*$/, "").trim();
        const items = [...r.querySelectorAll(".lc-item")].map(it => ({
          l: (it.querySelector(".lc-item-label")?.textContent || "").trim(),
          q: (it.querySelector(".lc-item-qte")?.textContent || "").trim(),
          c: it.querySelector('input[type="checkbox"]')?.checked ? 1 : 0
        })).filter(x => x.l);
        if (items.length) rayons.push({ n: nom, i: items });
      });
    });
    return rayons;
  }

  // --- Bouton : partager ---
  window.partagerListeCourses = async function () {
    const rayons = collecterListe();
    if (!rayons.length) { if (typeof afficherToast === "function") afficherToast("Ta liste de courses est vide."); return; }
    const data = { t: "Liste de courses", r: rayons };
    const lien = location.origin + location.pathname + "?courses=" + enc(data);
    const texte = "🛒 Ma liste de courses\n\n" + rayons.map(ry =>
      ry.n + "\n" + ry.i.map(x => "• " + x.l + (x.q ? " — " + x.q : "")).join("\n")).join("\n\n");
    const payload = { title: "🛒 Ma liste de courses", text: texte + "\n\n👉 Version cochable : " + lien };
    if (navigator.share) {
      try { await navigator.share(payload); return; }
      catch (e) { if (e && e.name === "AbortError") return; }
    }
    try {
      await navigator.clipboard.writeText(payload.text);
      if (typeof afficherToast === "function") afficherToast("📋 Liste copiée — colle-la dans WhatsApp/SMS");
    } catch (e) {
      try { prompt("Copie ta liste de courses :", payload.text); } catch (e2) {}
    }
  };

  // --- Vue DESTINATAIRE : overlay plein écran, cochable, sans compte ---
  function afficherListePartagee(data) {
    const cle = "lc_partage_" + hashCourt(JSON.stringify(data));
    const coches = {};
    // 1) pré-cocher ce que l'expéditeur avait déjà coché (déjà à la maison)
    data.r.forEach((ry, ri) => ry.i.forEach((x, ii) => { if (x.c) coches[ri + "_" + ii] = 1; }));
    // 2) puis appliquer les coches propres du destinataire (priorité)
    try { Object.assign(coches, JSON.parse(localStorage.getItem(cle) || "{}")); } catch (e) {}

    if (!document.getElementById("lc-partage-style")) {
      const st = document.createElement("style");
      st.id = "lc-partage-style";
      st.textContent =
        "#lc-partage-overlay{position:fixed;inset:0;z-index:100000;background:#14121a;overflow-y:auto;-webkit-overflow-scrolling:touch}" +
        "#lc-partage-overlay .lcp-wrap{max-width:560px;margin:0 auto;padding:16px 14px 60px}" +
        "#lc-partage-overlay .lcp-head{display:flex;align-items:center;gap:10px;position:sticky;top:0;background:#14121a;padding:8px 2px 12px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:14px}" +
        "#lc-partage-overlay .lcp-titre{font-size:1.15rem;font-weight:800;color:#fff;flex:1}" +
        "#lc-partage-overlay .lcp-prog{font-size:12px;color:#b3b0b8;white-space:nowrap}" +
        "#lc-partage-overlay .lcp-fermer{background:rgba(255,255,255,.1);border:none;color:#ddd;width:32px;height:32px;border-radius:50%;font-size:18px;cursor:pointer}" +
        "#lc-partage-overlay .lcp-rayon{margin-bottom:16px}" +
        "#lc-partage-overlay .lcp-rayon-nom{font-weight:700;color:#fff;font-size:.98rem;margin-bottom:6px}" +
        "#lc-partage-overlay .lcp-item{display:flex;align-items:center;gap:12px;padding:12px 12px;border-radius:12px;background:rgba(255,255,255,.04);margin-bottom:6px;cursor:pointer}" +
        "#lc-partage-overlay .lcp-item input{width:22px;height:22px;flex-shrink:0;accent-color:var(--accent,#ff4d88)}" +
        "#lc-partage-overlay .lcp-item .lcp-l{flex:1;color:#ece9f1;font-size:15px}" +
        "#lc-partage-overlay .lcp-item .lcp-q{color:#b3b0b8;font-size:13px;white-space:nowrap}" +
        "#lc-partage-overlay .lcp-item.coche .lcp-l{text-decoration:line-through;opacity:.5}" +
        "#lc-partage-overlay .lcp-pied{text-align:center;margin-top:18px}" +
        "#lc-partage-overlay .lcp-pied a{color:var(--accent-soft,#ff8fb3);font-size:13px}";
      document.head.appendChild(st);
    }

    const ov = document.createElement("div");
    ov.id = "lc-partage-overlay";
    let total = 0;
    data.r.forEach(ry => ry.i.forEach(() => total++));
    const rayonsHTML = data.r.map((ry, ri) => {
      const items = ry.i.map((x, ii) => {
        const id = ri + "_" + ii;
        const ch = coches[id] ? "checked" : "";
        return '<label class="lcp-item ' + (coches[id] ? "coche" : "") + '" data-id="' + id + '">' +
          '<input type="checkbox" ' + ch + '>' +
          '<span class="lcp-l">' + escHTML(x.l) + '</span>' +
          (x.q ? '<span class="lcp-q">' + escHTML(x.q) + '</span>' : "") +
          '</label>';
      }).join("");
      return '<div class="lcp-rayon"><div class="lcp-rayon-nom">' + escHTML(ry.n) + '</div>' + items + '</div>';
    }).join("");

    const base = location.origin + location.pathname;
    const headHTML = '<div class="lcp-head"><span class="lcp-titre">🛒 ' + escHTML(data.t || "Liste de courses") + '</span>' +
      '<span class="lcp-prog" id="lcp-prog"></span>' +
      '<button class="lcp-fermer" onclick="document.getElementById(\'lc-partage-overlay\').remove()" aria-label="Fermer">×</button></div>';
    ov.innerHTML =
      '<div class="lcp-wrap">' +
      headHTML +
      rayonsHTML +
      '<div class="lcp-pied"><a href="' + base + '">↗ Ouvrir La Cuisine de Jéjé</a></div>' +
      '</div>';
    document.body.appendChild(ov);

    function majProg() {
      let n = 0; Object.values(coches).forEach(v => { if (v) n++; });
      const p = document.getElementById("lcp-prog"); if (p) p.textContent = n + " / " + total;
    }
    majProg();
    ov.querySelectorAll(".lcp-item").forEach(lab => {
      lab.querySelector("input").addEventListener("change", function () {
        const id = lab.dataset.id;
        coches[id] = this.checked ? 1 : 0;
        lab.classList.toggle("coche", this.checked);
        try { localStorage.setItem(cle, JSON.stringify(coches)); } catch (e) {}
        majProg();
      });
    });
  }

  // --- Au chargement : si ?courses=… on affiche la liste partagée ---
  function init() {
    const m = location.search.match(/[?&]courses=([^&]+)/);
    if (!m) return;
    const data = dec(decodeURIComponent(m[1]));
    if (data && Array.isArray(data.r) && data.r.length) {
      // attendre que le body soit prêt
      const go = () => afficherListePartagee(data);
      if (document.body) go(); else document.addEventListener("DOMContentLoaded", go);
    }
  }
  init();

  // --- Injecte le bouton « Partager » dans la vue Liste de courses ---
  function injecterBouton() {
    if (document.getElementById("lc-btn-partager")) return;
    const ancre = document.getElementById("lc-progress");
    if (!ancre) return;
    const btn = document.createElement("button");
    btn.id = "lc-btn-partager";
    btn.type = "button";
    btn.textContent = "📤 Partager la liste";
    btn.setAttribute("onclick", "partagerListeCourses()");
    btn.setAttribute("style", "display:block;width:100%;margin:4px 0 12px;background:var(--accent,#ff4d88);color:#fff;border:none;border-radius:12px;padding:11px;font-weight:600;font-size:14px;cursor:pointer");
    ancre.parentNode.insertBefore(btn, ancre.nextSibling);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injecterBouton);
  else injecterBouton();
})();
