// =============================================================================
// 🍷 accords.js — Suggestion d'accord boisson sous chaque plat
// -----------------------------------------------------------------------------
// Pas de tag manuel sur 1070 recettes : on déduit l'accord par règles (catégorie,
// pays, ingrédient principal). Toujours une option SANS ALCOOL en plus (familles,
// non-buveurs). Bilingue, et stylé avec les variables de thème (clair/sombre).
// Injecté dans la fiche via accordBoissonHTML(cle).
// =============================================================================

(function () {
  const EN = () => window.LANG === "en";
  const T = (fr, en) => (EN() ? en : fr);

  // Ingrédients de la recette (clés du tableau) + mots du nom, en minuscules.
  function ingredientsDe(key) {
    const r = recettes[key];
    const set = new Set();
    if (!r) return set;
    const tk = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
    if (tk && r[tk][0]) {
      Object.keys(r[tk][0]).forEach((c) => { if (!["nb", "label", "patons", "total"].includes(c)) set.add(c.toLowerCase()); });
    }
    String(r.nom || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z]+/).forEach((m) => m && set.add(m));
    return set;
  }

  function accord(key) {
    const r = recettes[key];
    if (!r) return null;
    const cat = r.cat, pays = r.pays;
    if (cat === "cocktails" || cat === "mocktails") return null; // c'est déjà une boisson
    if (typeof RECETTES_SPORT !== "undefined" && RECETTES_SPORT.has(key)) return null; // 💪 pas d'accord vin sur le sport
    const ing = ingredientsDe(key);
    const a = (arr) => arr.some((x) => ing.has(x));

    // Desserts & sucré
    if (cat === "desserts" || cat === "glaces" || cat === "boulangerie")
      return { e: "🍰", v: T("Vin doux (Muscat, Sauternes) ou un café", "Sweet wine (Muscat, Sauternes) or a coffee"), s: T("Thé gourmand ou chocolat chaud", "A nice tea or hot chocolate") };

    // Poisson & fruits de mer
    if (a(["poisson", "saumon", "cabillaud", "colin", "dorade", "bar", "thon", "crevette", "crevettes", "moules", "poulpe", "calamar", "calamars", "gambas", "lotte", "truite", "sardine", "sardines"]))
      return { e: "🐟", v: T("Vin blanc sec (Sancerre, Chablis, Muscadet)", "A dry white (Sancerre, Chablis, Muscadet)"), s: T("Eau pétillante au citron vert", "Sparkling water with lime") };

    // Épicé (cuisines relevées)
    if (["inde", "thailande", "mexique", "indonesie", "coree", "chine", "maroc", "tunisie"].includes(pays) || a(["harissa", "curry", "piment", "wasabi"]))
      return { e: "🌶️", v: T("Une bière fraîche ou un blanc fruité (Riesling, Gewurztraminer)", "A cold beer or a fruity white (Riesling, Gewürztraminer)"), s: T("Lassi à la mangue ou thé glacé", "Mango lassi or iced tea") };

    // Bœuf / agneau / gibier → rouge corsé
    if (a(["boeuf", "agneau", "gibier", "canard", "magret"]))
      return { e: "🥩", v: T("Vin rouge corsé (Bordeaux, Côtes-du-Rhône, Malbec)", "A bold red (Bordeaux, Côtes-du-Rhône, Malbec)"), s: T("Jus de raisin rouge", "Red grape juice") };

    // Italien / pâtes / pizza
    if (pays === "italie" || cat === "pizzas" || a(["pates", "spaghetti", "tagliatelle", "lasagne", "risotto", "gnocchi"]))
      return { e: "🍝", v: T("Vin rouge italien (Chianti, Montepulciano)", "An Italian red (Chianti, Montepulciano)"), s: T("San Pellegrino ou limonade", "San Pellegrino or lemonade") };

    // Porc / charcuterie → rouge léger ou rosé
    if (a(["porc", "lardons", "jambon", "saucisse", "chorizo", "merguez", "bacon"]))
      return { e: "🍖", v: T("Vin rouge léger ou un rosé", "A light red or a rosé"), s: T("Limonade artisanale", "Craft lemonade") };

    // Volaille
    if (a(["poulet", "dinde", "pintade", "volaille"]))
      return { e: "🍗", v: T("Vin blanc ou rouge léger (Beaujolais)", "A white or a light red (Beaujolais)"), s: T("Cidre doux ou jus de pomme", "Sweet cider or apple juice") };

    // Fromage
    if (a(["fromage", "raclette", "comte", "reblochon", "mozzarella", "chevre", "parmesan", "feta", "gruyere"]))
      return { e: "🧀", v: T("Vin blanc sec ou rouge léger", "A dry white or a light red"), s: T("Jus de pomme pétillant", "Sparkling apple juice") };

    // Salades / entrées / végé
    if (cat === "salades" || cat === "entrees")
      return { e: "🥗", v: T("Vin blanc ou rosé léger", "A light white or rosé"), s: T("Eau concombre-menthe", "Cucumber-mint water") };

    // Défaut
    return { e: "🍷", v: T("Vin rouge ou blanc, selon ton goût", "A red or white, to your taste"), s: T("Eau pétillante ou jus de saison", "Sparkling water or a seasonal juice") };
  }

  window.accordBoissonHTML = function (key) {
    const acc = accord(key);
    if (!acc) return "";
    return (
      '<div class="fiche-section accord-boisson" style="background:rgba(var(--w),.05);border:1px solid rgba(var(--w),.1);border-radius:14px;padding:14px 16px;margin:0 0 14px">' +
      '<h2 class="fiche-section-titre" style="margin-top:0">' + T("🍷 Accord boisson", "🍷 Drink pairing") + '</h2>' +
      '<div style="display:flex;align-items:flex-start;gap:10px;color:var(--text);font-size:15px;line-height:1.4">' +
      '<span style="font-size:20px;flex:none">' + acc.e + '</span><span>' + acc.v + '</span></div>' +
      '<div style="display:flex;align-items:flex-start;gap:10px;color:var(--text-2);font-size:14px;line-height:1.4;margin-top:7px">' +
      '<span style="font-size:18px;flex:none">🚫</span><span>' + T("Sans alcool : ", "Alcohol-free: ") + acc.s + '</span></div>' +
      '</div>'
    );
  };
})();
