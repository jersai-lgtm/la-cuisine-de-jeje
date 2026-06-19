// =============================================================================
// 💡 SUBSTITUTIONS D'INGRÉDIENTS — sur la fiche recette
// -----------------------------------------------------------------------------
// Sous le tableau d'ingrédients, un bloc dépliable « Pas d'un ingrédient ? »
// propose des remplacements courants pour les ingrédients réellement présents
// dans la recette. Clés = slugs des colonnes de tableau (= INGREDIENTS_PRIX).
// Intégration NON invasive : on enrobe ouvrirFiche() et on injecte après coup.
// =============================================================================

(function () {
  const esc = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);

  // slug -> remplacement conseillé (français, pratique cuisine maison)
  const SUBS = {
    beurre: "huile neutre (¾ de la quantité) ou margarine",
    oeuf: "½ banane écrasée ou 1 c.à.s de graines de chia + 3 c.à.s d'eau (pâtisserie)",
    oeufs: "½ banane écrasée ou 1 c.à.s de graines de chia + 3 c.à.s d'eau (pâtisserie)",
    lait: "lait végétal (avoine, soja, amande), même quantité",
    creme: "crème végétale, ou yaourt grec, ou lait + un peu de beurre",
    cremefraiche: "crème végétale, ou yaourt grec épais",
    cremeliquide: "lait entier + 1 c.à.s de beurre fondu",
    sucre: "miel ou sirop d'érable (¾ de la quantité), ou cassonade",
    cassonade: "sucre blanc + une pointe de miel",
    farine: "Maïzena pour épaissir, ou mix de farine sans gluten",
    maizena: "farine (le double) ou fécule de pomme de terre",
    yaourt: "fromage blanc, ou crème fraîche épaisse",
    yaourtgrec: "fromage blanc égoutté, ou skyr",
    ail: "ail en poudre (¼ c.à.c par gousse) ou ail semoule",
    echalote: "oignon doux ou petit oignon blanc",
    oignon: "échalote, ou poireau (partie blanche)",
    citron: "vinaigre blanc, ou citron vert",
    citronvert: "citron jaune",
    parmesan: "grana padano, pecorino, ou levure maltée (option vegan)",
    mascarpone: "ricotta + un peu de crème, ou fromage frais type St Môret",
    ricotta: "fromage blanc égoutté, ou brousse",
    mozzarella: "emmental ou scamorza",
    chapelure: "biscottes mixées, ou flocons d'avoine mixés",
    panko: "chapelure classique, ou cornflakes écrasés",
    saucesoja: "sauce tamari, ou un peu de sel + bouillon",
    miel: "sirop d'érable ou sirop d'agave",
    siroperable: "miel ou sirop d'agave",
    huile: "beurre fondu (un peu moins)",
    huileolive: "huile de tournesol ou de colza",
    vinblanc: "bouillon + un filet de vinaigre blanc, ou jus de citron",
    vinrouge: "bouillon de bœuf + 1 c.à.s de vinaigre",
    vinaigrebalsamique: "vinaigre de vin + une pointe de miel",
    gingembre: "gingembre en poudre (⅓ de la quantité)",
    coriandre: "persil plat (goût plus doux)",
    basilic: "origan, ou persil",
    levurechimique: "½ c.à.c de bicarbonate + 1 c.à.c de jus de citron",
    levure: "levure chimique (pâtisserie) selon recette",
    beurrecacahuete: "purée d'amande ou de noisette",
    fromageblanc: "yaourt grec, ou skyr",
  };

  function labelIngr(slug) {
    let l = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[slug]) ? INGREDIENTS_LABELS[slug] : slug;
    return String(l).replace(/[^A-Za-zÀ-ÿœŒæÆ\s'’-]/g, "").trim() || slug; // retire emoji (garde les ligatures œ/æ)
  }

  function substitutionsPour(cle) {
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    if (!r) return [];
    const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tabKey || !r[tabKey][0]) return [];
    const slugs = Object.keys(r[tabKey][0]).filter(k => k !== "nb" && k !== "patons" && k !== "total" && k !== "label");
    const vus = new Set(), out = [];
    slugs.forEach(slug => {
      const rempl = SUBS[slug] || (slug.endsWith("s") ? SUBS[slug.slice(0, -1)] : null);
      if (rempl && !vus.has(rempl)) { vus.add(rempl); out.push({ label: labelIngr(slug), remplacement: rempl }); }
    });
    return out;
  }

  // Lookup générique d'un substitut par slug d'ingrédient (utilisé par l'assistant vocal).
  window.substitutionDe = function (slug) {
    if (!slug) return null;
    const s = String(slug).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z]/g, "");
    return SUBS[s] || (s.endsWith("s") ? SUBS[s.slice(0, -1)] : null) || SUBS[s + "s"] || null;
  };

  function injecterStyle() {
    if (document.getElementById("subs-style")) return;
    const st = document.createElement("style");
    st.id = "subs-style";
    st.textContent =
      "#fiche-substitutions{margin:14px 0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;overflow:hidden}" +
      "#fiche-substitutions>summary{cursor:pointer;list-style:none;padding:12px 14px;font-weight:600;color:#fff;font-size:14px;user-select:none}" +
      "#fiche-substitutions>summary::-webkit-details-marker{display:none}" +
      "#fiche-substitutions>summary::after{content:'▾';float:right;opacity:.6;transition:transform .2s}" +
      "#fiche-substitutions[open]>summary::after{transform:rotate(180deg)}" +
      "#fiche-substitutions .subs-corps{padding:0 14px 12px}" +
      "#fiche-substitutions .subs-item{padding:8px 0;border-top:1px solid rgba(255,255,255,.06);font-size:13px;color:#cfccd4;line-height:1.45}" +
      "#fiche-substitutions .subs-item b{color:#fff}" +
      "#fiche-substitutions .subs-fleche{color:var(--accent-soft,#ff8fb3);margin:0 4px}";
    document.head.appendChild(st);
  }

  function injecter(cle) {
    const cont = document.getElementById("modal-resultat");
    if (!cont) return;
    cont.querySelector("#fiche-substitutions")?.remove();
    const subs = substitutionsPour(cle);
    if (!subs.length) return;
    injecterStyle();
    const lignes = subs.map(s => '<div class="subs-item"><b>' + esc(s.label) + '</b><span class="subs-fleche">→</span>' + esc(s.remplacement) + '</div>').join("");
    const html =
      '<details id="fiche-substitutions">' +
        '<summary>💡 Pas d\'un ingrédient ? ' + subs.length + ' substitution' + (subs.length > 1 ? 's' : '') + '</summary>' +
        '<div class="subs-corps">' + lignes + '</div>' +
      '</details>';
    // Placé juste après la liste d'ingrédients, avant les étapes — quel que soit
    // le format (divs .fiche-ingredient ou <table>). Repli : fin de fiche.
    const ingrs = cont.querySelectorAll(".fiche-ingredient");
    const table = cont.querySelector("table");
    if (ingrs.length) ingrs[ingrs.length - 1].insertAdjacentHTML("afterend", html);
    else if (table) table.insertAdjacentHTML("afterend", html);
    else cont.insertAdjacentHTML("beforeend", html);
  }

  // Enrobe ouvrirFiche(recette, inputId) pour injecter après le rendu
  function installer() {
    const o = window.ouvrirFiche;
    if (typeof o !== "function" || o._wrapSubs) return;
    const w = function (recette, inputId) {
      const r = o.apply(this, arguments);
      try { injecter(recette); } catch (e) {}
      return r;
    };
    w._wrapSubs = true;
    window.ouvrirFiche = w;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installer);
  else installer();
})();
