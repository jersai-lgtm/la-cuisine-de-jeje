// =============================================================================
// ⚖️ convertisseur.js — passer des millilitres aux grammes, ingrédient par ingrédient
// -----------------------------------------------------------------------------
// « 120 ml de crème, ça fait combien en grammes ? » — la réponse dépend de
// l'ingrédient : 120 ml d'eau pèsent 120 g, 120 ml d'huile 110 g, et 120 ml de
// miel 170 g. Il fallait donc une densité par ingrédient.
//
// Plutôt que d'énumérer les 175 ingrédients dosés en volume du catalogue, la
// table va du plus précis au plus général : une valeur nommée si on l'a, sinon
// la FAMILLE reconnue au nom de la clé (tout ce qui commence par « huile »
// pèse 0,92), sinon 1,00 comme l'eau. C'est tenable quand le catalogue grossit.
//
// ⚠️ Une densité reste une approximation de cuisine : une crème à 30 % et une
// crème à 15 % ne pèsent pas pareil. L'écran le dit, plutôt que de laisser
// croire à une précision de laboratoire.
//
// Entrée : menu compte → « ⚖️ Convertir ml ↔ g ».
// =============================================================================
(function () {
  const EN = () => window.LANG === "en";
  const T = (fr, en) => (EN() ? en : fr);
  const esc = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);

  // --- Densités en g/ml -----------------------------------------------------
  // Valeurs nommées : celles qui s'écartent vraiment de leur famille.
  const DENSITE = {
    eau: 1.00, eauchaude: 1.00, eaupetillante: 1.00, eauGaz: 1.00,
    lait: 1.03, laitconcentre: 1.29, laitevapore: 1.07, laitcoco: 0.98, lait_coco: 0.98,
    laitamande: 1.01, laitnon: 1.01, soja: 1.01,
    creme: 0.98, cremefraiche: 0.98, cremechantilly: 0.50, cremeCoco: 0.98,
    miel: 1.42, siropderable: 1.33, siropsucre: 1.26, siropagave: 1.38, sucrecanne: 1.26,
    melassegrenade: 1.37, grenadine: 1.26, orgeat: 1.20, gelee: 1.30,
    yaourt: 1.03, bechamel: 1.05, coulistomate: 1.05, justomate: 1.04, jusdetomate: 1.04,
    saucesoja: 1.20, sojaSauce: 1.20, sauceaussoja: 1.20, nuocmam: 1.20, saucePoisson: 1.20,
    worcestershire: 1.10, tabasco: 1.03, bbqSauce: 1.15, sauceokonomi: 1.15,
    vinaigreBalsamique: 1.13, balsamique: 1.13,
    huileolive: 0.92, huiledolive: 0.92, huileOlive: 0.92,
    cafe: 1.00, espresso: 1.00, thenoir: 1.00, dashi: 1.00, fumet: 1.00, volaille: 1.00,
    aquafaba: 1.01, blancoeuf: 1.03, jauneoeuf: 1.03, oeufs: 1.03,
  };

  // Familles, repérées au début de la clé. Ordre : la première qui colle gagne.
  const FAMILLES = [
    [/^huile/i, 0.92, "huile"],
    [/^sirop/i, 1.30, "sirop"],
    [/^vinaigre/i, 1.01, "vinaigre"],
    [/^(vin|riesling|marsala|madere|porto|sherry|vinjaune|champagne|prosecco|cidre|biere|sake)/i, 0.99, "vin ou bière"],
    [/^(rhum|vodka|gin|whisk|bourbon|tequila|cognac|calvados|brandy|pisco|mezcal|cachaca|eaudevie|absinthe|kirsch)/i, 0.94, "alcool fort"],
    [/^(liqueur|cointreau|curacao|triple|amaretto|kahlua|maraschino|falernum|cherryheering|cremecassis|cremedemure|chartreuse|benedictine|drambuie|fernet|amaro|campari|aperol|vermouth|lillet|passoa|violette|sureau)/i, 1.05, "liqueur"],
    [/^(jus|orangeJus)/i, 1.04, "jus de fruit"],
    [/^(soda|cola|tonic|limonade|gingerBeer|sodaamer|sodapamplemousse)/i, 1.04, "soda"],
    [/^(bouillon|boullion|gravy|sambar)/i, 1.00, "bouillon"],
    [/^(sauce|coulis)/i, 1.08, "sauce"],
    [/^(lait)/i, 1.03, "lait"],
    [/^(creme)/i, 0.98, "crème"],
    [/^(eau)/i, 1.00, "eau"],
    [/^(vin)/i, 0.99, "vin"],
  ];

  function densiteDe(cle) {
    if (DENSITE[cle] != null) return { d: DENSITE[cle], source: "nommee" };
    for (const [re, d, fam] of FAMILLES) if (re.test(cle)) return { d: d, source: fam };
    return { d: 1.00, source: null };   // à défaut, on raisonne comme l'eau
  }

  // --- Catalogue des ingrédients proposés -----------------------------------
  function listeIngredients() {
    const lab = (typeof INGREDIENTS_LABELS !== "undefined") ? INGREDIENTS_LABELS : {};
    return Object.keys(lab)
      .map((k) => ({ cle: k, libelle: String(lab[k] || k) }))
      .sort((a, b) => a.libelle.localeCompare(b.libelle, "fr"));
  }

  const normer = (s) => String(s || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  // --- Cuillères et verres, parce que c'est comme ça qu'on cuisine ----------
  const MESURES = [
    { ml: 5, fr: "1 c. à café", en: "1 tsp" },
    { ml: 15, fr: "1 c. à soupe", en: "1 tbsp" },
    { ml: 100, fr: "1 verre (10 cl)", en: "1 glass (100 ml)" },
    { ml: 250, fr: "1 mug (25 cl)", en: "1 mug (250 ml)" },
  ];

  let _cle = "eau";

  function arrondi(x) {
    if (x >= 100) return String(Math.round(x));
    if (x >= 10) return String(Math.round(x * 10) / 10).replace(".", ",");
    return String(Math.round(x * 100) / 100).replace(".", ",");
  }

  function calculer() {
    const q = parseFloat(String(document.getElementById("cv-qte")?.value || "").replace(",", "."));
    const sens = document.getElementById("cv-sens")?.value || "ml2g";
    const res = document.getElementById("cv-res");
    const note = document.getElementById("cv-note");
    if (!res) return;
    const { d, source } = densiteDe(_cle);

    if (!isFinite(q) || q <= 0) {
      res.textContent = "—";
      if (note) note.textContent = "";
      return;
    }
    if (sens === "ml2g") res.textContent = arrondi(q * d) + " g";
    else res.textContent = arrondi(q / d) + " ml";

    if (note) {
      const base = T("1 ml pèse " + arrondi(d) + " g", "1 ml weighs " + arrondi(d) + " g");
      note.textContent = source === "nommee"
        ? base + T(" — valeur propre à cet ingrédient.", " — value specific to this ingredient.")
        : source
          ? base + T(" — valeur de la famille « " + source + " », approximative.",
                     " — value for the “" + source + "” family, approximate.")
          : base + T(" — densité inconnue, on raisonne comme l'eau.",
                     " — density unknown, treated like water.");
    }
    majMesures(d);
  }

  function majMesures(d) {
    const z = document.getElementById("cv-mesures");
    if (!z) return;
    z.innerHTML = MESURES.map((m) =>
      `<div class="cv-mesure"><span>${esc(EN() ? m.en : m.fr)}</span>` +
      `<strong>${esc(arrondi(m.ml * d))} g</strong></div>`).join("");
  }

  function choisir(cle, libelle) {
    _cle = cle;
    const b = document.getElementById("cv-ing-btn");
    if (b) b.textContent = libelle;
    const liste = document.getElementById("cv-liste");
    if (liste) liste.style.display = "none";
    calculer();
  }
  window._cvChoisir = choisir;

  function filtrer() {
    const q = normer(document.getElementById("cv-rech")?.value || "");
    const liste = document.getElementById("cv-liste");
    if (!liste) return;
    liste.style.display = "block";
    const tous = listeIngredients();
    const vus = (q ? tous.filter((i) => normer(i.libelle).includes(q) || normer(i.cle).includes(q)) : tous).slice(0, 40);
    liste.innerHTML = vus.length
      ? vus.map((i) =>
          `<button type="button" class="cv-opt" onclick="_cvChoisir('${esc(i.cle)}', ${JSON.stringify(i.libelle).replace(/"/g, "&quot;")})">${esc(i.libelle)}</button>`).join("")
      : `<div class="cv-vide">${esc(T("Aucun ingrédient de ce nom.", "No ingredient by that name."))}</div>`;
  }
  window._cvFiltrer = filtrer;

  // =========================================================================
  window.ouvrirConvertisseur = function (cleDepart) {
    injecterStyle();
    document.getElementById("cv-feuille")?.remove();
    if (cleDepart) _cle = cleDepart;
    const lab = (typeof INGREDIENTS_LABELS !== "undefined") ? INGREDIENTS_LABELS : {};
    const libelle = lab[_cle] || _cle;

    const f = document.createElement("div");
    f.id = "cv-feuille";
    f.setAttribute("role", "dialog");
    f.setAttribute("aria-modal", "true");
    f.setAttribute("aria-label", T("Convertisseur millilitres grammes", "Millilitres to grams converter"));
    f.innerHTML =
      `<div class="cv-carte">` +
        `<div class="cv-entete">` +
          `<span class="cv-titre">⚖️ ${esc(T("Millilitres ↔ grammes", "Millilitres ↔ grams"))}</span>` +
          `<button type="button" class="cv-x" onclick="_cvFermer()" aria-label="${esc(T("Fermer", "Close"))}">×</button>` +
        `</div>` +
        `<p class="cv-intro">${esc(T("120 ml d'eau pèsent 120 g, mais 120 ml d'huile n'en pèsent que 110. Choisis l'ingrédient, le poids suit.",
                                      "120 ml of water weighs 120 g, but 120 ml of oil only 110. Pick the ingredient and the weight follows."))}</p>` +

        `<label class="cv-lab">${esc(T("Ingrédient", "Ingredient"))}</label>` +
        `<button type="button" class="cv-ing" id="cv-ing-btn" onclick="document.getElementById('cv-rech').focus();_cvFiltrer()">${esc(libelle)}</button>` +
        `<input type="text" id="cv-rech" class="cv-rech" oninput="_cvFiltrer()" ` +
          `placeholder="${esc(T("Chercher un ingrédient…", "Search an ingredient…"))}">` +
        `<div class="cv-liste" id="cv-liste" style="display:none"></div>` +

        `<label class="cv-lab" for="cv-qte">${esc(T("Quantité", "Quantity"))}</label>` +
        `<div class="cv-ligne">` +
          `<input type="number" id="cv-qte" class="cv-qte" inputmode="decimal" min="0" step="any" value="120" oninput="_cvCalc()">` +
          `<select id="cv-sens" class="cv-sens" onchange="_cvCalc()">` +
            `<option value="ml2g">${esc(T("ml → g", "ml → g"))}</option>` +
            `<option value="g2ml">${esc(T("g → ml", "g → ml"))}</option>` +
          `</select>` +
        `</div>` +

        `<div class="cv-res" id="cv-res">—</div>` +
        `<div class="cv-note" id="cv-note"></div>` +
        `<div class="cv-mesures" id="cv-mesures"></div>` +
      `</div>`;
    document.body.appendChild(f);
    f.addEventListener("click", (e) => { if (e.target === f) window._cvFermer(); });
    calculer();
  };
  window._cvFermer = function () { document.getElementById("cv-feuille")?.remove(); };
  window._cvCalc = calculer;

  function injecterStyle() {
    if (document.getElementById("cv-style")) return;
    const s = document.createElement("style");
    s.id = "cv-style";
    s.textContent = `
      #cv-feuille{position:fixed;inset:0;z-index:100055;background:rgba(10,8,14,.6);
        display:flex;align-items:flex-end;justify-content:center}
      #cv-feuille .cv-carte{box-sizing:border-box;width:100%;max-width:520px;max-height:88vh;overflow:auto;
        background:var(--panel-solid,#211e26);color:var(--text,#fff);border-radius:18px 18px 0 0;
        border:1px solid rgba(255,255,255,.12);border-bottom:none;
        padding:16px 18px calc(18px + env(safe-area-inset-bottom))}
      #cv-feuille .cv-entete{display:flex;align-items:center;gap:10px;margin-bottom:6px}
      #cv-feuille .cv-titre{font-size:17px;font-weight:700;flex:1;min-width:0}
      #cv-feuille .cv-x{background:none;border:none;color:var(--text-2,#b3b0b8);font-size:26px;
        line-height:1;cursor:pointer;min-width:44px;min-height:44px}
      #cv-feuille .cv-intro{font-size:13px;color:var(--text-2,#b3b0b8);line-height:1.45;margin:0 0 14px}
      #cv-feuille .cv-lab{display:block;font-size:12.5px;color:var(--text-2,#b3b0b8);margin:0 0 6px}
      #cv-feuille .cv-ing{width:100%;box-sizing:border-box;min-height:44px;text-align:left;
        background:var(--surface-1,#2b2731);color:var(--text,#fff);border:1px solid rgba(255,255,255,.15);
        border-radius:11px;padding:0 14px;font-size:15px;cursor:pointer;margin-bottom:8px}
      #cv-feuille .cv-rech{width:100%;box-sizing:border-box;min-height:44px;
        background:var(--surface-1,#2b2731);color:var(--text,#fff);border:1px solid rgba(255,255,255,.15);
        border-radius:11px;padding:0 14px;font-size:15px;margin-bottom:8px}
      #cv-feuille .cv-liste{max-height:210px;overflow:auto;border-radius:11px;
        background:rgba(255,255,255,.04);margin-bottom:14px}
      #cv-feuille .cv-opt{display:block;width:100%;box-sizing:border-box;text-align:left;min-height:44px;
        background:none;border:none;color:var(--text,#fff);font-size:15px;padding:0 14px;cursor:pointer}
      #cv-feuille .cv-opt:hover{background:rgba(255,255,255,.07)}
      #cv-feuille .cv-vide{padding:14px;font-size:14px;color:var(--text-2,#b3b0b8)}
      #cv-feuille .cv-ligne{display:flex;gap:10px;margin-bottom:14px}
      #cv-feuille .cv-qte{flex:1;min-width:0;box-sizing:border-box;min-height:44px;
        background:var(--surface-1,#2b2731);color:var(--text,#fff);border:1px solid rgba(255,255,255,.15);
        border-radius:11px;padding:0 14px;font-size:17px}
      #cv-feuille .cv-sens{flex:0 0 auto;min-height:44px;background:var(--surface-1,#2b2731);
        color:var(--text,#fff);border:1px solid rgba(255,255,255,.15);border-radius:11px;
        padding:0 10px;font-size:15px}
      #cv-feuille .cv-res{font-size:30px;font-weight:700;text-align:center;
        color:var(--accent-soft,#ff8fb3);margin:4px 0 6px}
      #cv-feuille .cv-note{font-size:12.5px;color:var(--text-2,#b3b0b8);text-align:center;
        line-height:1.45;margin-bottom:14px}
      #cv-feuille .cv-mesures{display:flex;flex-wrap:wrap;gap:8px}
      #cv-feuille .cv-mesure{flex:1 1 calc(50% - 8px);display:flex;justify-content:space-between;
        gap:8px;background:rgba(255,255,255,.05);border-radius:10px;padding:10px 12px;font-size:13.5px}
    `;
    document.head.appendChild(s);
  }
})();
