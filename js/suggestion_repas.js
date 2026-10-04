// =============================================================================
// 🗣️ suggestion_repas.js — « ce soir c'est moi le dessert, ils n'aiment pas… »
// -----------------------------------------------------------------------------
// On décrit l'occasion avec ses mots, l'appli propose. Ce que la recherche ne
// savait pas faire : comprendre une EXCLUSION (« ils n'aiment pas le chocolat »)
// et une PRÉFÉRENCE (« ils adorent les fruits rouges») dans la même phrase.
//
// Le moteur est DÉTERMINISTE : il lit la phrase, la confronte aux ingrédients
// réels du catalogue, et classe. Pas d'appel réseau, pas de compte requis, une
// réponse immédiate même hors ligne — c'est le moteur de menus qui a montré la
// voie (contrat IA + repli déterministe) ; ici le repli suffit, parce que les
// ingrédients de chaque recette sont connus au gramme près.
//
// Une exclusion est FERME (la recette sort), une préférence est un bonus.
// =============================================================================
(function () {
  const EN = () => window.LANG === "en";
  const T = (fr, en) => (EN() ? en : fr);
  const esc = (s) => (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s);

  const normer = (s) => String(s || "")
    .replace(/œ/g, "oe").replace(/æ/g, "ae")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  // --- Ce qu'on cherche : le moment du repas -------------------------------
  const MOMENTS = [
    { cat: "desserts", mots: ["dessert", "gateau", "patisserie", "sucre", "douceur"] },
    { cat: "entrees", mots: ["entree", "starter"] },
    { cat: "aperitifs", mots: ["apero", "aperitif", "amuse bouche", "grignoter"] },
    { cat: "plats", mots: ["plat", "plat principal", "main", "repas principal"] },
    { cat: "soupes", mots: ["soupe", "potage", "veloute"] },
    { cat: "salades", mots: ["salade"] },
    { cat: "cocktails", mots: ["cocktail", "apero alcool"] },
    { cat: "mocktails", mots: ["mocktail", "sans alcool", "boisson"] },
    { cat: "brunch", mots: ["brunch", "petit dejeuner", "petit dej"] },
  ];

  // --- Les tournures qui disent « surtout pas » et « oui, ça » --------------
  const AVANT_EXCLUSION = /(?:n['e ]?aiment? (?:vraiment )?pas|aime pas|aiment pas|deteste\w*|horreur d\w*|allergi\w*|intoleran\w*|sans|pas de|pas d|eviter?|evite\w*|exclu\w*|surtout pas)\b/;
  const AVANT_PREFERENCE = /(?:aiment?|adore\w*|raffole\w*|fan d\w*|avec|a base d\w*|envie d\w*|plutot|j'adore)\b/;

  // --- Les contraintes qu'on sait honorer ----------------------------------
  const CONTRAINTES = [
    { id: "rapide", mots: ["rapide", "vite", "express", "peu de temps", "pas le temps"],
      fr: "rapide", en: "quick", ok: (r) => minutes(r) > 0 && minutes(r) <= 30 },
    { id: "facile", mots: ["facile", "simple", "debutant", "sans prise de tete"],
      fr: "facile", en: "easy", ok: (r) => /⭐(?!⭐)/.test(String(r.niveau || "")) },
    { id: "chic", mots: ["impressionner", "chic", "epater", "elegant", "raffine", "fete"],
      fr: "qui en jette", en: "impressive", ok: (r) => /⭐⭐/.test(String(r.niveau || "")) },
    // ferme:true → une recette qui n'y répond pas est ÉCARTÉE, pas déclassée.
    // Qui demande du végétarien ne veut pas voir du foie gras en quatrième place.
    { id: "vege", mots: ["vegetarien", "vege", "sans viande", "vegetalien", "vegan"],
      fr: "végétarien", en: "vegetarian", ferme: true, ok: (r) => !aUnIngredientParmi(r, VIANDES) },
    { id: "leger", mots: ["leger", "light", "pas trop lourd", "digeste"],
      fr: "léger", en: "light", ok: (r) => true },
  ];
  const VIANDES = ["boeuf", "porc", "agneau", "veau", "poulet", "canard", "dinde", "lapin", "jambon",
    "lardon", "saucisse", "chorizo", "bacon", "poisson", "saumon", "thon", "cabillaud", "crevette",
    "gambas", "moule", "huitre", "calamar", "anchois", "morue", "cerf", "chevreuil", "sanglier",
    // les oublis qui faisaient passer un foie gras pour végétarien
    "foiegras", "foie gras", "magret", "confit", "gesier", "rillettes", "pate", "terrine", "boudin",
    "andouille", "merguez", "kilichi", "biltong", "tripes", "jarret", "poitrine", "cailles", "pigeon",
    "escargot", "grenouille", "crabe", "homard", "langoustine", "poulpe", "seiche", "encornet",
    "sardine", "maquereau", "hareng", "truite", "dorade", "lotte", "merlu", "colin", "lieu", "bar",
    "gelatine", "saindoux", "lard", "viande", "charcuterie", "bouillonvolaille", "bouillonboeuf",
    "fumet", "volaille", "agneauhache", "boeufhache", "porchache", "surimi", "caviar", "oeufsdesaumon"];

  // --- Les mots collectifs, dépliés en ingrédients réels --------------------
  // « Pas de fromage » doit écarter la feta, et « sans poisson » le saumon.
  // Sans ça, l'exclusion ne voyait que le mot exact et laissait passer le reste.
  // ⚠️ Ceci sert aux PRÉFÉRENCES de table. Pour une vraie allergie, c'est le
  // réglage « allergènes » du profil qui fait foi, et l'écran le rappelle.
  const FAMILLES_MOTS = {
    fromage: ["fromage", "feta", "mozzarella", "gruyere", "parmesan", "chevre", "comte", "cheddar",
      "ricotta", "mascarpone", "roquefort", "brie", "camembert", "emmental", "pecorino", "burrata",
      "halloumi", "raclette", "reblochon", "maroilles", "stracchino", "kasseri", "cancoillotte", "brocciu"],
    poisson: ["poisson", "saumon", "thon", "cabillaud", "morue", "sardine", "maquereau", "truite",
      "bar", "dorade", "lieu", "colin", "anchois", "hareng", "espadon", "merlu", "sole", "turbot", "carpe"],
    "fruits de mer": ["crevette", "gamba", "moule", "huitre", "calamar", "poulpe", "crabe", "homard",
      "langoustine", "coquille", "saint jacques", "encornet", "seiche", "bulot", "palourde"],
    viande: ["boeuf", "porc", "agneau", "veau", "poulet", "canard", "dinde", "lapin", "jambon",
      "lardon", "saucisse", "chorizo", "bacon", "cerf", "chevreuil", "sanglier", "merguez", "tripes"],
    porc: ["porc", "jambon", "lardon", "bacon", "chorizo", "saucisson", "boudin", "andouille"],
    gluten: ["farine", "pate", "pain", "semoule", "boulgour", "couscous", "biscuit", "chapelure",
      "feuilletee", "brisee", "orge", "seigle", "epeautre", "panko", "brick", "filo", "wonton"],
    lactose: ["lait", "creme", "beurre", "fromage", "yaourt", "mascarpone", "ricotta", "feta",
      "mozzarella", "gruyere", "parmesan", "chevre", "comte", "cheddar"],
    "produits laitiers": ["lait", "creme", "beurre", "fromage", "yaourt", "mascarpone", "ricotta"],
    noix: ["noix", "noisette", "amande", "pistache", "cajou", "pecan", "macadamia", "arachide", "cacahuete"],
    "fruits a coque": ["noix", "noisette", "amande", "pistache", "cajou", "pecan", "macadamia"],
    alcool: ["rhum", "vodka", "gin", "whisk", "cognac", "vin", "biere", "liqueur", "kirsch",
      "calvados", "armagnac", "porto", "champagne", "cointreau", "amaretto", "tequila"],
    piment: ["piment", "pimente", "harissa", "sriracha", "tabasco", "cayenne", "jalapeno", "chili"],
    oeuf: ["oeuf", "jauneoeuf", "blancoeuf"],
    chocolat: ["chocolat", "cacao", "praline", "nutella", "ganache"],
    cafe: ["cafe", "espresso", "expresso", "moka"],
    champignon: ["champignon", "cepe", "girolle", "shiitake", "pleurote", "morille", "truffe"],
    "fruits rouges": ["fraise", "framboise", "myrtille", "mure", "groseille", "cassis", "cerise", "fruitsrouges"],
  };

  // Déplie un terme : « fromage » devient la liste complète, « feta » reste seul.
  function deplier(terme) {
    const t = normer(terme);
    if (FAMILLES_MOTS[t]) return FAMILLES_MOTS[t];
    for (const [fam, membres] of Object.entries(FAMILLES_MOTS)) {
      if (normer(fam).includes(t) && t.length >= 4) return membres;
    }
    return [t];
  }

  function minutes(r) {
    const m = String(r.temps || "").match(/(\d+)\s*h\s*(\d+)?/i);
    if (m) return parseInt(m[1], 10) * 60 + (m[2] ? parseInt(m[2], 10) : 0);
    const m2 = String(r.temps || "").match(/(\d+)\s*min/i);
    return m2 ? parseInt(m2[1], 10) : 0;
  }

  // --- Les ingrédients d'une recette, en clés ET en libellés ----------------
  const _cacheIng = new Map();
  function ingredientsDe(cle) {
    if (_cacheIng.has(cle)) return _cacheIng.get(cle);
    const r = (typeof recettes !== "undefined") ? recettes[cle] : null;
    let out = [];
    if (r) {
      const tab = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]) && r[k].length);
      if (tab) {
        const ligne = r[tab].find((l) => l && l.nb === 1) || r[tab][0];
        const lab = (typeof INGREDIENTS_LABELS !== "undefined") ? INGREDIENTS_LABELS : {};
        out = Object.keys(ligne)
          .filter((k) => k !== "nb" && k !== "patons")
          .map((k) => normer(k) + " " + normer(lab[k] || ""));
      }
    }
    _cacheIng.set(cle, out);
    return out;
  }
  function aUnIngredientParmi(r, mots) {
    const ings = ingredientsDe(r._cle);
    return mots.some((m) => ings.some((i) => i.includes(m)));
  }

  // --- Lecture de la phrase -------------------------------------------------
  // On découpe sur la ponctuation et les « mais / et », puis on regarde quelle
  // tournure ouvre chaque morceau. « ils n'aiment pas le chocolat mais adorent
  // les fruits rouges » donne bien une exclusion ET une préférence.
  function analyser(phrase) {
    const brut = String(phrase || "");
    const n = normer(brut);
    const res = { cat: null, exclus: [], preferes: [], contraintes: [], personnes: 0 };

    for (const m of MOMENTS) if (m.mots.some((x) => n.includes(x))) { res.cat = m.cat; break; }
    for (const c of CONTRAINTES) if (c.mots.some((x) => n.includes(x))) res.contraintes.push(c);
    const p = n.match(/pour (\d{1,2})\b/);
    if (p) res.personnes = parseInt(p[1], 10);

    const morceaux = brut.split(/[,.;:!?]|\bmais\b|\bet puis\b|\bpar contre\b|\ben revanche\b/i);
    for (const morceau of morceaux) {
      const nm = normer(morceau);
      if (!nm) continue;
      const iEx = nm.search(AVANT_EXCLUSION);
      const iPr = nm.search(AVANT_PREFERENCE);
      if (iEx === -1 && iPr === -1) continue;
      // la tournure qui arrive en premier décide du sens du morceau
      const exclusion = iEx !== -1 && (iPr === -1 || iEx <= iPr);
      const depart = exclusion ? iEx : iPr;
      const reste = nm.slice(depart).replace(exclusion ? AVANT_EXCLUSION : AVANT_PREFERENCE, " ");
      for (const t of termesIngredients(reste)) {
        (exclusion ? res.exclus : res.preferes).push(t);
      }
    }
    // dédoublonnage, et une exclusion l'emporte toujours sur une préférence
    res.exclus = [...new Set(res.exclus)];
    res.preferes = [...new Set(res.preferes)].filter((t) => !res.exclus.includes(t));
    return res;
  }

  // Dans un bout de phrase, retrouve les mots qui désignent un ingrédient connu.
  const MOTS_VIDES = new Set(["le", "la", "les", "un", "une", "des", "du", "de", "d", "au", "aux",
    "a", "et", "ou", "ils", "elles", "on", "trop", "vraiment", "surtout", "ca", "c", "est", "sont",
    "ce", "cette", "mon", "ma", "mes", "leur", "leurs", "tout", "tous", "bien", "aussi", "plus"]);
  let _vocab = null;
  function vocabulaire() {
    if (_vocab) return _vocab;
    const lab = (typeof INGREDIENTS_LABELS !== "undefined") ? INGREDIENTS_LABELS : {};
    _vocab = new Set();
    for (const k of Object.keys(lab)) {
      _vocab.add(normer(k));
      for (const mot of normer(lab[k]).split(" ")) if (mot.length >= 4 && !MOTS_VIDES.has(mot)) _vocab.add(mot);
    }
    return _vocab;
  }
  function termesIngredients(bout) {
    const voc = vocabulaire();
    // les mots collectifs ne sont pas des clés d'ingrédient : on les attrape ici
    const collectifs = [];
    for (const fam of Object.keys(FAMILLES_MOTS)) if (bout.includes(normer(fam))) collectifs.push(fam);
    const mots = bout.split(" ").filter((m) => m.length >= 3 && !MOTS_VIDES.has(m));
    const out = [];
    for (let i = 0; i < mots.length; i++) {
      const duo = mots[i] + " " + (mots[i + 1] || "");      // « fruits rouges », « lait coco »
      if (mots[i + 1] && [...voc].some((v) => v.includes(duo.trim()))) { out.push(duo.trim()); i++; continue; }
      const sing = mots[i].replace(/s$/, "");
      if (voc.has(mots[i]) || voc.has(sing) || [...voc].some((v) => v.includes(sing) && sing.length >= 4)) out.push(sing);
    }
    // « fruits rouges » suffit : on jette « fruit » et « rouge » qui en viennent,
    // sinon la raison affichée devient « fruits rouges+fruit+rouge ».
    const morceaux = new Set();
    for (const c of collectifs) for (const mot of normer(c).split(" ")) morceaux.add(mot.replace(/s$/, ""));
    const propres = out.filter((t) => !morceaux.has(t.replace(/s$/, "")));
    return [...new Set(collectifs.concat(propres))];
  }

  // --- Le classement --------------------------------------------------------
  function proposer(phrase) {
    const a = analyser(phrase);
    const toutes = (typeof recettes !== "undefined") ? recettes : {};
    const sortie = [];

    for (const cle of Object.keys(toutes)) {
      const r = toutes[cle];
      if (!r) continue;
      r._cle = cle;
      if (a.cat && r.cat !== a.cat) continue;

      const ings = ingredientsDe(cle);
      const nom = normer(r.nom || "") + " " + normer(r.description || "");

      // exclusion ferme : un seul ingrédient interdit suffit à écarter.
      // On déplie d'abord les mots collectifs (« fromage » → feta, gruyère…).
      if (a.exclus.some((t) => deplier(t).some((m) => ings.some((i) => i.includes(m)) || nom.includes(m)))) continue;

      let score = 0;
      const raisons = [];
      for (const t of a.preferes) {
        if (deplier(t).some((m) => ings.some((i) => i.includes(m)) || nom.includes(m))) { score += 10; raisons.push(t); }
      }
      const okContraintes = [];
      let recale = false;
      for (const c of a.contraintes) {
        if (c.ok(r)) { score += 6; okContraintes.push(EN() ? c.en : c.fr); }
        else if (c.ferme) { recale = true; break; }   // régime : c'est non, pas « moins bien »
        else score -= 4;
      }
      if (recale) continue;
      if (!a.preferes.length && !a.contraintes.length) score += 1;   // rien d'exigé : tout convient
      const note = (typeof getNoteCommunaute === "function") ? (getNoteCommunaute(cle)?.moyenne || 0) : 0;
      score += note;

      if (score <= 0) continue;
      sortie.push({ cle, r, score, raisons, okContraintes });
    }

    sortie.sort((x, y) => y.score - x.score);
    return { analyse: a, resultats: sortie.slice(0, 6) };
  }
  window.suggererRepas = proposer;   // utilisable aussi depuis la console / l'assistant

  // =========================================================================
  // L'écran
  // =========================================================================
  function phraseAnalyse(a) {
    const bouts = [];
    if (a.cat) {
      const noms = { desserts: T("un dessert", "a dessert"), entrees: T("une entrée", "a starter"),
        plats: T("un plat", "a main"), aperitifs: T("un apéro", "nibbles"), soupes: T("une soupe", "a soup"),
        salades: T("une salade", "a salad"), cocktails: T("un cocktail", "a cocktail"),
        mocktails: T("une boisson sans alcool", "a soft drink"), brunch: T("un brunch", "a brunch") };
      bouts.push(noms[a.cat] || a.cat);
    }
    if (a.exclus.length) bouts.push(T("sans ", "without ") + a.exclus.join(", "));
    if (a.preferes.length) bouts.push(T("avec ", "with ") + a.preferes.join(", "));
    for (const c of a.contraintes) bouts.push(EN() ? c.en : c.fr);
    return bouts.length ? bouts.join(" · ") : T("tout le catalogue", "the whole catalogue");
  }

  function rendreResultats(phrase) {
    const zone = document.getElementById("sr-res");
    if (!zone) return;
    const { analyse, resultats } = proposer(phrase);
    const compris = `<div class="sr-compris">${esc(T("Je cherche : ", "Looking for: "))}<b>${esc(phraseAnalyse(analyse))}</b></div>`;

    if (!resultats.length) {
      zone.innerHTML = compris +
        `<div class="sr-vide">${esc(T("Rien ne colle à tout ça. Essaie d'enlever une contrainte.",
                                       "Nothing matches all of that. Try dropping one constraint."))}</div>`;
      return;
    }
    zone.innerHTML = compris + resultats.map((x) => {
      const bouts = [];
      if (x.raisons.length) bouts.push(T("avec ", "with ") + x.raisons.join(", "));
      if (x.okContraintes.length) bouts.push(x.okContraintes.join(", "));
      if (x.r.temps) bouts.push(String(x.r.temps));
      return `<button type="button" class="sr-item" onclick="_srOuvrir('${esc(x.cle)}')">` +
        `<span class="sr-emoji">${esc(x.r.emoji || "🍽️")}</span>` +
        `<span class="sr-txt"><b>${esc(x.r.nom || x.cle)}</b>` +
        `<span class="sr-pourquoi">${esc(bouts.join(" · "))}</span></span></button>`;
    }).join("");
  }

  window._srOuvrir = function (cle) {
    window._srFermer();
    if (typeof choisirRecette === "function") choisirRecette(cle);
    else if (typeof ouvrirFiche === "function") ouvrirFiche(cle);
  };
  window._srFermer = function () { document.getElementById("sr-feuille")?.remove(); };

  window.ouvrirSuggestionRepas = function (phraseDepart) {
    injecterStyle();
    document.getElementById("sr-feuille")?.remove();
    const f = document.createElement("div");
    f.id = "sr-feuille";
    f.setAttribute("role", "dialog");
    f.setAttribute("aria-modal", "true");
    f.innerHTML =
      `<div class="sr-carte">` +
        `<div class="sr-entete">` +
          `<span class="sr-titre">🗣️ ${esc(T("Dis-moi ton repas", "Tell me about your meal"))}</span>` +
          `<button type="button" class="sr-x" onclick="_srFermer()" aria-label="${esc(T("Fermer", "Close"))}">×</button>` +
        `</div>` +
        `<p class="sr-intro">${esc(T("Écris-le comme tu le dirais. Je comprends ce qu'ils n'aiment pas autant que ce qu'ils aiment.",
                                      "Write it as you would say it. I understand what they dislike as well as what they like."))}</p>` +
        `<textarea id="sr-txt" class="sr-saisie" rows="3" ` +
          `placeholder="${esc(T("Ce soir soirée entre amis, je fais le dessert, ils n'aiment pas le chocolat mais adorent les fruits rouges",
                                "Dinner with friends tonight, I'm on dessert, they don't like chocolate but love red berries"))}"></textarea>` +
        `<button type="button" class="sr-go" onclick="_srChercher()">${esc(T("Trouve-moi ça", "Find me something"))}</button>` +
        `<div class="sr-ex">${["Un dessert sans gluten, ils adorent le citron",
                               "Une entrée rapide et végétarienne",
                               "Un plat pour 8, pas trop cher, ils n'aiment pas le poisson"]
          .map((e) => `<button type="button" class="sr-chip" onclick="_srExemple(${JSON.stringify(e).replace(/"/g, "&quot;")})">${esc(e)}</button>`).join("")}</div>` +
        `<div class="sr-res" id="sr-res"></div>` +
        `<p class="sr-garde">${esc(T("Pour une vraie allergie, règle-la dans ton profil : elle filtre tout le catalogue, en permanence. Ici, ce sont des goûts.",
                                      "For a real allergy, set it in your profile: it filters the whole catalogue, permanently. This is about tastes."))}</p>` +
      `</div>`;
    document.body.appendChild(f);
    f.addEventListener("click", (e) => { if (e.target === f) window._srFermer(); });
    const ta = document.getElementById("sr-txt");
    if (phraseDepart) { ta.value = phraseDepart; rendreResultats(phraseDepart); }
    ta.addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) window._srChercher(); });
    ta.focus();
  };
  window._srChercher = function () { rendreResultats(document.getElementById("sr-txt")?.value || ""); };
  window._srExemple = function (txt) {
    const ta = document.getElementById("sr-txt");
    if (ta) { ta.value = txt; rendreResultats(txt); }
  };

  function injecterStyle() {
    if (document.getElementById("sr-style")) return;
    const s = document.createElement("style");
    s.id = "sr-style";
    s.textContent = `
      #sr-feuille{position:fixed;inset:0;z-index:100056;background:rgba(10,8,14,.6);
        display:flex;align-items:flex-end;justify-content:center}
      #sr-feuille .sr-carte{box-sizing:border-box;width:100%;max-width:560px;max-height:90vh;overflow:auto;
        background:var(--panel-solid,#211e26);color:var(--text,#fff);border-radius:18px 18px 0 0;
        border:1px solid rgba(255,255,255,.12);border-bottom:none;
        padding:16px 18px calc(18px + env(safe-area-inset-bottom))}
      #sr-feuille .sr-entete{display:flex;align-items:center;gap:10px;margin-bottom:6px}
      #sr-feuille .sr-titre{font-size:17px;font-weight:700;flex:1;min-width:0}
      #sr-feuille .sr-x{background:none;border:none;color:var(--text-2,#b3b0b8);font-size:26px;
        line-height:1;cursor:pointer;min-width:44px;min-height:44px}
      #sr-feuille .sr-intro{font-size:13px;color:var(--text-2,#b3b0b8);line-height:1.45;margin:0 0 12px}
      #sr-feuille .sr-saisie{width:100%;box-sizing:border-box;background:var(--surface-1,#2b2731);
        color:var(--text,#fff);border:1px solid rgba(255,255,255,.15);border-radius:12px;
        padding:12px 14px;font-size:15px;font-family:inherit;line-height:1.45;resize:vertical}
      #sr-feuille .sr-go{width:100%;box-sizing:border-box;min-height:44px;margin:10px 0 12px;border:none;
        border-radius:12px;background:var(--accent,#ff4d88);color:#fff;font-size:15px;font-weight:600;cursor:pointer}
      #sr-feuille .sr-ex{display:flex;gap:7px;overflow-x:auto;scrollbar-width:none;margin-bottom:14px}
      #sr-feuille .sr-ex::-webkit-scrollbar{display:none}
      #sr-feuille .sr-chip{flex:none;background:rgba(255,255,255,.08);color:var(--text,#fff);
        border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:0 14px;min-height:40px;
        font-size:12.5px;cursor:pointer;white-space:nowrap}
      #sr-feuille .sr-compris{font-size:13px;color:var(--text-2,#b3b0b8);margin-bottom:10px;line-height:1.45}
      #sr-feuille .sr-item{display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;
        text-align:left;background:rgba(255,255,255,.05);border:none;border-radius:12px;
        padding:12px 14px;margin-bottom:8px;cursor:pointer;color:var(--text,#fff);min-height:44px}
      #sr-feuille .sr-item:hover{background:rgba(255,255,255,.09)}
      #sr-feuille .sr-emoji{font-size:24px;flex:0 0 auto}
      #sr-feuille .sr-txt{display:flex;flex-direction:column;gap:2px;min-width:0}
      #sr-feuille .sr-txt b{font-size:15px}
      #sr-feuille .sr-pourquoi{font-size:12.5px;color:var(--text-2,#b3b0b8)}
      #sr-feuille .sr-garde{font-size:12px;color:var(--text-2,#b3b0b8);line-height:1.45;
        margin:14px 0 0;padding-top:12px;border-top:1px solid rgba(255,255,255,.08)}
      #sr-feuille .sr-vide{font-size:14px;color:var(--text-2,#b3b0b8);padding:16px 0;line-height:1.5}
      .envie-dire{width:100%;box-sizing:border-box;min-height:44px;margin-top:8px;border-radius:12px;
        background:rgba(255,255,255,.16);color:#fff;border:1px solid rgba(255,255,255,.3);
        font-size:13.5px;font-weight:600;cursor:pointer}
    `;
    document.head.appendChild(s);
  }

  // --- L'entrée, dans la carte « Qu'est-ce qu'on mange ? » ------------------
  function poserBouton() {
    const bloc = document.getElementById("envie-bloc");
    if (!bloc || document.getElementById("envie-dire")) return;
    injecterStyle();
    const b = document.createElement("button");
    b.type = "button";
    b.id = "envie-dire";
    b.className = "envie-dire";
    b.textContent = T("🗣️ Décris-moi ton repas", "🗣️ Describe your meal");
    b.addEventListener("click", () => window.ouvrirSuggestionRepas());
    bloc.appendChild(b);
  }
  function demarrer() {
    poserBouton();
    let prevu = false;
    new MutationObserver(() => {
      if (prevu) return;
      prevu = true;
      requestAnimationFrame(() => { prevu = false; poserBouton(); });
    }).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", demarrer);
  else demarrer();
})();
