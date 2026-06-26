// =============================================================================
// 🍽️ swipe.js — « Qu'est-ce qu'on mange ce soir ? » (mode découverte façon swipe)
// -----------------------------------------------------------------------------
// Un deck de recettes qu'on parcourt : 👈 suivante / 👉 précédente, et tap pour
// ouvrir la fiche (navigation réversible, on peut revenir en arrière). Respecte le
// profil (allergènes, régime) et la saison, comme les suggestions. Le deck est
// au-dessus de tout (z-index 9000) ; au clic « Voir », on MASQUE le deck pendant
// l'affichage de la fiche puis on le ré-affiche à sa fermeture (évite les
// conflits de z-index avec la barre de recherche). Gestes tactiles + boutons. Bilingue.
// =============================================================================

(function () {
  const EN = () => window.LANG === "en";
  // Liste BLANCHE des catégories "repas" : on ne propose que des plats du midi/soir
  // (pas de desserts, sorbets, apéros, entrées… → c'est « qu'est-ce qu'on mange »).
  const INCL_CAT = new Set(["plats", "salades", "soupes", "pizzas", "healthy", "encas"]);
  let pool = [], idx = 0, _actif = false;

  // ---- Construction du deck : profil + saison (réutilise la logique suggestions) ----
  function construirePool() {
    if (typeof recettes === "undefined") return [];
    const prefs = window.userProfile && window.userProfile.preferences;
    const motsExclus = new Set();
    if (prefs && typeof ALLERGENES_MOTS !== "undefined") {
      [].concat(prefs.allergies || [], prefs.regimes || [], prefs.allergiesCustom || []).forEach((a) => {
        (ALLERGENES_MOTS[a] || [a]).forEach((m) => motsExclus.add(String(m).toLowerCase()));
      });
    }
    const saison = (typeof getSaisonActuelle === "function") ? getSaisonActuelle() : null;
    let p = Object.keys(recettes).filter((k) => {
      const r = recettes[k];
      if (!r || !r.nom || !INCL_CAT.has(r.cat)) return false;
      if (typeof RECETTES_NON_REPAS !== "undefined" && RECETTES_NON_REPAS.has && RECETTES_NON_REPAS.has(k)) return false;
      if (saison && Array.isArray(r.saisons) && r.saisons.length && r.saisons.indexOf(saison) === -1) return false;
      if (motsExclus.size) {
        const t = (typeof texteRecette === "function") ? texteRecette(k) : (r.nom || "").toLowerCase();
        if ([...motsExclus].some((m) => m && t.indexOf(m) > -1)) return false;
      }
      return true;
    });
    // Mélange (Fisher-Yates) — Math.random OK côté navigateur.
    for (let i = p.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = p[i]; p[i] = p[j]; p[j] = t; }
    // Biais météo : canicule → on remonte le frais ; grand froid → le réconfortant.
    const M = window._meteo;
    if (M && (M.chaud || M.froid)) p.sort((a, b) => scoreMeteo(b, M) - scoreMeteo(a, M)); // tri stable : garde l'ordre mélangé à score égal
    return p;
  }

  // Emoji gradué selon la température (toujours un emoji, pas seulement aux extrêmes).
  function meteoEmoji(t) {
    if (t >= 30) return "🥵";
    if (t >= 24) return "☀️";
    if (t >= 17) return "🌤️";
    if (t >= 10) return "⛅";
    if (t >= 3) return "🧥";
    return "🥶";
  }
  function meteoHint() {
    const M = window._meteo;
    if (!M || typeof M.temp !== "number") return "";
    const t = Math.round(M.temp);
    const e = meteoEmoji(M.temp);
    if (M.chaud) return (EN() ? e + " It's hot (" + t + "°) → fresh dishes first. " : e + " Il fait chaud (" + t + "°) → on remonte le frais. ");
    if (M.froid) return (EN() ? e + " It's cold (" + t + "°) → comforting first. " : e + " Il fait froid (" + t + "°) → on remonte le réconfortant. ");
    return (EN() ? e + " " + t + "° today. " : e + " " + t + "° aujourd'hui. ");
  }

  // Score d'adéquation à la météo (frais quand il fait chaud, réconfortant quand il fait froid).
  function scoreMeteo(key, M) {
    const r = recettes[key];
    if (!r) return 0;
    const nom = (r.nom || "").toLowerCase();
    const frais = r.cat === "salades" || /salade|gaspacho|gazpacho|ajoblanco|froid|taboul|ceviche|carpaccio|tartare|vitello|poke|melon|concombre|wrap|tzatziki|rouleau|nem|sushi|maki|smoothie/.test(nom);
    const lourd = r.cat === "soupes" || /gratin|mijot|raclette|fondue|tartiflette|pot.?au.?feu|veloute|ragout|blanquette|cassoulet|fondu|roti|braise|pot.?ee|chili|curry|tajine|hachis|lasagne/.test(nom);
    let s = 0;
    if (M.chaud) { if (frais) s += 2; if (lourd) s -= 2; }
    else if (M.froid) { if (lourd) s += 2; if (frais) s -= 1; }
    return s;
  }

  function nutriBadge(key) {
    try {
      const r = recettes[key];
      if (!r || r.cat === "cocktails" || r.cat === "mocktails" || typeof calculerNutriScoreRecette !== "function") return "";
      const tk = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
      if (!tk) return "";
      const base = r.base || 4;
      const ligne = r[tk].find((l) => l.nb === base || l.patons === base) || r[tk][0];
      const ns = ligne && calculerNutriScoreRecette(ligne);
      return ns ? `<span class="swipe-nutri carte-nutri nutri-${ns.lettre}" data-lettre="${ns.lettre}" title="Nutri-Score ${ns.lettre}"></span>` : "";
    } catch (e) { return ""; }
  }

  // 💰🔥 Prix + calories par portion (même exclusions que les filtres/tris :
  // boissons et bases dosées à l'unité n'ont pas de prix/cal fiable par convive).
  function prixCalLigne(key) {
    try {
      const r = recettes[key];
      if (!r || ["cocktails", "mocktails", "sauces", "tartinables"].includes(r.cat)) return "";
      if (typeof calculerPrixCaloriesRecette !== "function") return "";
      const tk = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
      if (!tk) return "";
      const base = r.base || 4;
      const ligne = r[tk].find((l) => l.nb === base || l.patons === base) || r[tk][0];
      const pc = ligne && calculerPrixCaloriesRecette(ligne);
      if (!pc) return "";
      const parts = [];
      if (pc.prix != null) parts.push("💰 " + (pc.prix / base).toFixed(2).replace(".", ",") + " €");
      if (pc.cal != null) parts.push("🔥 " + Math.round(pc.cal / base) + " kcal");
      return parts.join("  ·  ");
    } catch (e) { return ""; }
  }

  function carteHTML(key) {
    const r = recettes[key];
    const nom = (typeof getNomRecette === "function") ? getNomRecette(key) : (r.nom || key);
    const img = (typeof getImagePath === "function") ? getImagePath(key) : ("images/" + (key[0] || "_").toLowerCase() + "/" + key + ".webp");
    const onerr = (typeof imgCarteOnerror === "function") ? imgCarteOnerror(key) : "";
    const dra = (typeof drapeau === "function") ? drapeau(r.pays, 16) : "";
    const meta = ["⏱ " + (r.temps || ""), r.niveau || ""].filter((s) => String(s).trim()).join("  ·  ");
    return `
      <div class="swipe-bg" style="background-image:url('${img}')"></div>
      <img loading="lazy" decoding="async" src="${img}" alt="${nom}" onerror="${onerr}">
      <div class="swipe-grad"></div>
      ${nutriBadge(key)}
      <div class="swipe-yes">➡️</div>
      <div class="swipe-no">⬅️</div>
      <div class="swipe-cap">
        <span class="swipe-nom">${dra}<span class="swipe-emoji">${r.emoji || "🍽️"}</span> ${nom}</span>
        <span class="swipe-meta">${meta}</span>
        ${(() => { const pc = prixCalLigne(key); return pc ? `<span class="swipe-meta swipe-prixcal">${pc}</span>` : ""; })()}
      </div>`;
  }

  function rendre() {
    const stack = document.getElementById("swipe-stack");
    if (!stack) return;
    if (idx >= pool.length) { pool = construirePool(); idx = 0; }
    if (!pool.length) { stack.innerHTML = `<div class="swipe-vide">${EN() ? "No recipe matches your profile." : "Aucune recette ne correspond à ton profil."}</div>`; return; }
    const key = pool[idx];
    const suiv = pool[idx + 1];
    // Carte suivante (dessous, pour la profondeur) + carte active (dessus).
    stack.innerHTML =
      (suiv ? `<div class="swipe-card swipe-dessous">${carteHTML(suiv)}</div>` : "") +
      `<div class="swipe-card swipe-active" data-key="${key}">${carteHTML(key)}</div>`;
    brancherGestes(stack.querySelector(".swipe-active"));
  }

  function animerSortie(sens, cb) {
    const c = document.querySelector("#swipe-stack .swipe-active");
    if (!c) { cb(); return; }
    c.style.transition = "transform .28s ease, opacity .28s ease";
    c.style.transform = "translateX(" + (sens > 0 ? 700 : -700) + "px) rotate(" + (sens > 0 ? 22 : -22) + "deg)";
    c.style.opacity = "0";
    setTimeout(cb, 230);
  }

  // Navigation : 👈 suivante (sort à gauche, idx++) / 👉 précédente (sort à droite, idx--).
  function suivant() { animerSortie(-1, () => { idx++; rendre(); }); }
  function precedent() {
    if (idx <= 0) { // déjà au début → petit rebond à droite, on ne sort pas
      const c = document.querySelector("#swipe-stack .swipe-active");
      if (c) { c.style.transition = "transform .18s ease"; c.style.transform = "translateX(26px)"; setTimeout(() => { c.style.transform = ""; }, 160); }
      return;
    }
    animerSortie(1, () => { idx--; rendre(); });
  }
  // Attend l'ouverture PUIS la fermeture de la fiche, et rappelle cb.
  function observerFicheClose(cb) {
    const m = document.getElementById("modal-calc");
    if (!m) { cb(); return; }
    let vu = false;
    const obs = new MutationObserver(() => {
      if (m.classList.contains("visible")) { vu = true; }
      else if (vu) { obs.disconnect(); cb(); }
    });
    obs.observe(m, { attributes: true, attributeFilter: ["class"] });
  }

  function voir() {
    const key = pool[idx];
    if (!key) return;
    const ov = document.getElementById("swipe-overlay");
    if (ov) ov.style.display = "none"; // on masque le deck pendant la fiche…
    observerFicheClose(() => { if (ov && _actif) { ov.style.display = "flex"; } rendre(); }); // …et on le ré-affiche en fermant (on reste sur la même recette, pas d'avance auto)
    if (typeof ouvrirFiche === "function") ouvrirFiche(key, "");
  }
  function favori() {
    const key = pool[idx];
    if (key && typeof toggleFavori === "function") { toggleFavori(key); }
    const btn = document.querySelector("#swipe-overlay .swipe-fav");
    if (btn) { btn.textContent = "💖"; setTimeout(() => { btn.textContent = "🤍"; }, 600); }
  }

  // ---- Gestes tactiles / souris sur la carte active ----
  function brancherGestes(card) {
    if (!card) return;
    let x0 = 0, y0 = 0, dx = 0, drag = false;
    const down = (e) => {
      drag = true; const p = e.touches ? e.touches[0] : e; x0 = p.clientX; y0 = p.clientY; dx = 0;
      card.style.transition = "none";
    };
    const move = (e) => {
      if (!drag) return;
      const p = e.touches ? e.touches[0] : e;
      dx = p.clientX - x0; const dy = p.clientY - y0;
      if (Math.abs(dx) < Math.abs(dy) && Math.abs(dx) < 8) return; // scroll vertical → on n'intercepte pas
      if (e.cancelable) e.preventDefault();
      card.style.transform = "translateX(" + dx + "px) rotate(" + (dx / 22) + "deg)";
      card.classList.toggle("vers-oui", dx > 60);
      card.classList.toggle("vers-non", dx < -60);
    };
    const up = () => {
      if (!drag) return; drag = false;
      card.classList.remove("vers-oui", "vers-non");
      card.style.transition = "transform .2s ease";
      if (Math.abs(dx) < 10) { card.style.transform = ""; voir(); }   // tap → ouvrir la recette
      else if (dx < -110) { suivant(); }                              // glisse gauche → suivante
      else if (dx > 110) { precedent(); }                             // glisse droite → précédente
      else { card.style.transform = ""; }                             // pas assez loin → on revient
    };
    card.addEventListener("touchstart", down, { passive: true });
    card.addEventListener("touchmove", move, { passive: false });
    card.addEventListener("touchend", up);
    card.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  function injecterStyle() {
    if (document.getElementById("swipe-style")) return;
    const s = document.createElement("style");
    s.id = "swipe-style";
    s.textContent = `
      #swipe-overlay{position:fixed;inset:0;z-index:9000;display:flex;flex-direction:column;
        background:radial-gradient(900px 500px at 50% -5%,rgba(255,95,162,.18),transparent 60%),#100e15;
        animation:swipeIn .2s ease}
      @keyframes swipeIn{from{opacity:0}to{opacity:1}}
      .swipe-head{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 6px;color:#fff;
        font-family:system-ui,-apple-system,sans-serif}
      .swipe-head .swipe-titre{font-size:18px;font-weight:800}
      .swipe-head .swipe-close{background:rgba(255,255,255,.1);color:#fff;border:none;border-radius:50%;
        width:38px;height:38px;font-size:16px;cursor:pointer}
      .swipe-stack{position:relative;flex:1;margin:8px 18px;min-height:0}
      .swipe-card{position:absolute;inset:0;border-radius:22px;overflow:hidden;background:var(--surface-1);
        box-shadow:0 14px 40px rgba(0,0,0,.5);user-select:none;-webkit-user-select:none;touch-action:pan-y;will-change:transform}
      .swipe-card.swipe-dessous{transform:scale(.94) translateY(10px);filter:brightness(.7)}
      /* Fond flou de la même photo : on voit TOUT le plat (contain) sans bandes noires. */
      .swipe-card .swipe-bg{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center;
        filter:blur(20px) brightness(.5);transform:scale(1.15)}
      .swipe-card img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;position:relative;z-index:1}
      .swipe-grad{position:absolute;inset:0;z-index:2;background:linear-gradient(to top,rgba(8,6,12,.92) 4%,rgba(8,6,12,.25) 42%,rgba(8,6,12,0) 70%)}
      .swipe-cap{position:absolute;left:18px;right:18px;bottom:18px;color:#fff;z-index:3}
      .swipe-nom{display:block;font-size:23px;font-weight:800;line-height:1.18;text-shadow:0 2px 8px rgba(0,0,0,.6);font-family:system-ui,sans-serif}
      .swipe-meta{display:block;font-size:14px;opacity:.95;margin-top:6px;text-shadow:0 1px 4px rgba(0,0,0,.6)}
      .swipe-prixcal{margin-top:3px;font-weight:600;opacity:1}
      .swipe-nutri{position:absolute;top:14px;left:14px;right:auto;z-index:11}
      .swipe-yes,.swipe-no{position:absolute;top:20px;z-index:3;font-size:46px;opacity:0;transition:opacity .1s;filter:drop-shadow(0 2px 6px rgba(0,0,0,.5))}
      .swipe-yes{right:20px}.swipe-no{left:20px}
      .swipe-card.vers-oui .swipe-yes{opacity:1}.swipe-card.vers-non .swipe-no{opacity:1}
      .swipe-actions{display:flex;align-items:center;justify-content:center;gap:14px;padding:8px 18px 4px}
      .swipe-btn{border:none;cursor:pointer;border-radius:50%;display:flex;align-items:center;justify-content:center;
        box-shadow:0 6px 18px rgba(0,0,0,.4);transition:transform .12s}
      .swipe-btn:active{transform:scale(.92)}
      .swipe-btn.skip{width:60px;height:60px;font-size:24px;background:var(--surface-2);color:#fff}
      .swipe-btn.prev,.swipe-btn.next{width:58px;height:58px;font-size:22px;background:var(--surface-2);color:#fff}
      .swipe-card.swipe-active{cursor:pointer}
      .swipe-btn.fav{width:50px;height:50px;font-size:20px;background:var(--surface-2)}
      .swipe-btn.like{width:68px;height:68px;font-size:26px;background:linear-gradient(135deg,#ff5fa2,#ff9330)}
      .swipe-hint{text-align:center;color:var(--text-2);font-size:12.5px;padding:6px 0 14px;font-family:system-ui,sans-serif}
      .swipe-vide{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;
        color:var(--text-2);padding:30px;font-family:system-ui,sans-serif}
      @media(min-width:560px){.swipe-stack{max-width:460px;margin:8px auto;width:100%}.swipe-actions,.swipe-head{max-width:460px;margin-left:auto;margin-right:auto;width:100%}}
    `;
    document.head.appendChild(s);
  }

  window.ouvrirSwipe = function () {
    injecterStyle();
    let ov = document.getElementById("swipe-overlay");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "swipe-overlay";
      ov.innerHTML =
        `<div class="swipe-head"><span class="swipe-titre">${EN() ? "🍽️ What shall we eat?" : "🍽️ Qu'est-ce qu'on mange ?"}</span>` +
        `<button class="swipe-close" aria-label="Fermer">✕</button></div>` +
        `<div class="swipe-stack" id="swipe-stack"></div>` +
        `<div class="swipe-actions">` +
          `<button class="swipe-btn prev" title="${EN() ? "Previous" : "Précédente"}">⬅️</button>` +
          `<button class="swipe-btn fav" title="${EN() ? "Favorite" : "Favori"}">🤍</button>` +
          `<button class="swipe-btn like" title="${EN() ? "See recipe" : "Voir la recette"}">😍</button>` +
          `<button class="swipe-btn next" title="${EN() ? "Next" : "Suivante"}">➡️</button>` +
        `</div>` +
        `<div class="swipe-hint">${meteoHint()}${EN() ? "Swipe 👈 next · 👉 previous · tap to open" : "Glisse 👈 suivante · 👉 précédente · tape pour ouvrir"}</div>`;
      document.body.appendChild(ov);
      ov.querySelector(".swipe-close").addEventListener("click", () => window.fermerSwipe());
      ov.querySelector(".prev").addEventListener("click", precedent);
      ov.querySelector(".fav").addEventListener("click", favori);
      ov.querySelector(".like").addEventListener("click", voir);
      ov.querySelector(".next").addEventListener("click", suivant);
    }
    ov.style.display = "flex";
    _actif = true;
    pool = construirePool(); idx = 0;
    rendre();
    if (typeof window._backGuardPush === "function") window._backGuardPush(); // bouton retour ferme le deck
  };

  // Fermeture (bouton ✕ ou retour téléphone).
  window.fermerSwipe = function () {
    _actif = false;
    const ov = document.getElementById("swipe-overlay");
    if (ov) ov.style.display = "none";
  };
})();
