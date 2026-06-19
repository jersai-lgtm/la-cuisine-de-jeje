// =============================================================================
// 💾 incitation_compte.js — Invite douce à créer un compte (visiteurs passifs)
// -----------------------------------------------------------------------------
// Beaucoup de gens parcourent l'appli sans jamais déclencher une action qui
// demande un compte (favori, liste…). Après quelques recettes consultées, on
// propose UNE FOIS, sans bloquer, de créer un compte — en vendant le bénéfice
// clé : retrouver ses favoris / sa liste / son garde-manger sur tous ses
// appareils. Jamais si déjà connecté ou déjà refusé. Bilingue (window.LANG).
// =============================================================================

(function () {
  const SEUIL = 3;                 // nb de fiches consultées avant de proposer
  const LS_VUES = "incit_vues";
  const LS_OFF = "incit_dismiss";  // refusé OU compte créé → on ne propose plus
  const EN = () => window.LANG === "en";

  const off = () => { try { return localStorage.getItem(LS_OFF) === "1"; } catch (e) { return false; } };
  const couper = () => { try { localStorage.setItem(LS_OFF, "1"); } catch (e) {} };
  const connecte = () => !!window.currentUser;

  function injecterStyle() {
    if (document.getElementById("incit-style")) return;
    const s = document.createElement("style");
    s.id = "incit-style";
    s.textContent = `
      #incit-banner{position:fixed;left:50%;transform:translateX(-50%);bottom:88px;z-index:8990;max-width:92vw;
        display:flex;align-items:center;gap:10px;background:#17151c;color:#fff;border:1px solid rgba(124,200,255,.4);
        border-radius:14px;padding:10px 12px 10px 16px;box-shadow:0 8px 28px rgba(0,0,0,.45);
        font-family:system-ui,-apple-system,sans-serif;animation:incitUp .25s ease}
      @keyframes incitUp{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
      #incit-banner .incit-txt{font-size:14px;line-height:1.35;max-width:62vw}
      #incit-banner .incit-ok{background:linear-gradient(90deg,#6ba1ff,#4d88ff);color:#fff;border:none;border-radius:10px;
        padding:9px 14px;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap}
      #incit-banner .incit-no{background:rgba(255,255,255,.12);color:#fff;border:none;border-radius:50%;width:30px;height:30px;
        font-size:13px;cursor:pointer;flex:0 0 auto}
      #incit-banner .incit-ok:focus-visible,#incit-banner .incit-no:focus-visible{outline:2px solid #8fbfff;outline-offset:2px}
      @media(max-width:480px){#incit-banner{bottom:82px}}
    `;
    document.head.appendChild(s);
  }

  function fermer() { const b = document.getElementById("incit-banner"); if (b) b.remove(); }

  function afficher() {
    if (document.getElementById("incit-banner") || connecte() || off()) return;
    injecterStyle();
    const b = document.createElement("div");
    b.id = "incit-banner";
    b.setAttribute("role", "dialog");
    b.innerHTML =
      `<span class="incit-txt">${EN()
        ? "💾 Create a free account to keep your favorites, list & pantry — on all your devices"
        : "💾 Crée un compte gratuit pour garder tes favoris, ta liste & ton garde-manger — sur tous tes appareils"}</span>` +
      `<button class="incit-ok" id="incit-ok">${EN() ? "Sign up" : "Créer un compte"}</button>` +
      `<button class="incit-no" id="incit-no" aria-label="${EN() ? "Maybe later" : "Plus tard"}" title="${EN() ? "Maybe later" : "Plus tard"}">✕</button>`;
    document.body.appendChild(b);
    document.getElementById("incit-ok").addEventListener("click", () => {
      couper(); fermer();
      if (typeof ouvrirModalAuth === "function") ouvrirModalAuth();
    });
    document.getElementById("incit-no").addEventListener("click", () => { couper(); fermer(); });
  }

  // Compteur de fiches consultées : on enrobe ouvrirFiche.
  function suivreVues() {
    if (typeof window.ouvrirFiche !== "function" || window.ouvrirFiche._incitWrap) return;
    const orig = window.ouvrirFiche;
    const wrap = function () {
      const r = orig.apply(this, arguments);
      try {
        if (!connecte() && !off()) {
          let n = 0; try { n = parseInt(localStorage.getItem(LS_VUES) || "0", 10) || 0; } catch (e) {}
          n++; try { localStorage.setItem(LS_VUES, String(n)); } catch (e) {}
          if (n >= SEUIL) setTimeout(afficher, 1200); // après que la fiche s'affiche
        }
      } catch (e) {}
      return r;
    };
    wrap._incitWrap = true;
    window.ouvrirFiche = wrap;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", suivreVues);
  else suivreVues();
})();
