// =============================================================================
// 🎨 couleurs_plats.js — de quelle couleur est un plat ?
// -----------------------------------------------------------------------------
// Sert au repas monochrome des Soirées (« tout rouge », « tout vert »…).
//
// POURQUOI PAS LA PHOTO. C'était la première idée, et elle est fausse : mesurée
// sur 12 plats dont la couleur ne fait aucun doute, l'analyse des miniatures
// n'en trouve que 6, et se trompe avec aplomb — le Blue Lagoon ressort
// « orange », le guacamole « jaune ». Le style maison (bois, lumière dorée,
// bokeh) fait peser le décor plus lourd que l'assiette et tire le vert vers le
// jaune. Recentrer sur le plat aide un peu, puis ça plafonne. On lit donc les
// INGRÉDIENTS, que l'appli connaît exactement : 10 sur 12 avec une table
// d'essai de 100 entrées, et surtout, quand elle ne sait pas elle le DIT.
//
// POURQUOI UNE FORCE, ET PAS SEULEMENT DES GRAMMES. Une cuillère de curcuma
// (2 g) colore tout un plat en jaune ; 300 g de pommes de terre ne colorent
// rien. Peser au gramme seul donnerait des currys blancs. Chaque ingrédient
// porte donc sa force de teinture, et le score est grammes × force.
//
// CE QUI N'EST PAS DANS LA TABLE NE VOTE PAS. Sel, farine, eau, huile, levure :
// incolores, ils n'ont pas d'entrée. Un plat dont aucun ingrédient n'est
// colorant ressort « indéterminé », et il est simplement écarté d'un menu
// monochrome — mieux vaut ne pas le proposer que le proposer de travers.
// =============================================================================
(function () {
  // [couleur, force de teinture]. Force 1 = un légume ordinaire. Au-delà de 10,
  // ce sont les colorants qu'on emploie à la pincée.
  var T = {
    // ---- rouge --------------------------------------------------------------
    tomate: ["rouge", 2], tomatecerise: ["rouge", 2], tomateconcassee: ["rouge", 2.5],
    concentretomate: ["rouge", 12], saucetomate: ["rouge", 3], coulistomate: ["rouge", 3],
    ketchup: ["rouge", 6], harissa: ["rouge", 14], piment: ["rouge", 8],
    gochujang: ["rouge", 10], gochugaru: ["rouge", 14], tabasco: ["rouge", 10],
    poivronrouge: ["rouge", 3], haricotsrouges: ["rouge", 2], haricotsnoirs: ["rouge", 1.5],
    fraises: ["rouge", 3], framboise: ["rouge", 3], cerise: ["rouge", 3],
    groseille: ["rouge", 3], cranberry: ["rouge", 3], airelles: ["rouge", 3],
    grenade: ["rouge", 2.5], grenadine: ["rouge", 10], pasteque: ["rouge", 2],
    vinrouge: ["rouge", 3], vinaigreVin: ["rouge", 2], chorizo: ["rouge", 3],
    paprika: ["rouge", 9], paprikafume: ["rouge", 9], berbere: ["rouge", 9],
    campari: ["rouge", 8], aperol: ["rouge", 8], maraschino: ["rouge", 4],
    fruitsrouges: ["rouge", 3], anko: ["rouge", 2], jalapeno: ["vert", 4],

    // ---- orange -------------------------------------------------------------
    carotte: ["orange", 2.5], potimarron: ["orange", 2.5], courge: ["orange", 2.5],
    potiron: ["orange", 2.5], patatedouce: ["orange", 2.5], abricot: ["orange", 2.5],
    abricotsec: ["orange", 2.5], mangue: ["orange", 2.5], orange: ["orange", 2],
    jusorange: ["orange", 2], peche: ["orange", 2], saumon: ["orange", 2.5],
    saumonfrais: ["orange", 2.5], saumonfume: ["rose", 3], cheddar: ["orange", 3],
    mimolette: ["orange", 3], lentillescorail: ["orange", 3], curcuma: ["jaune", 30],
    pateCurry: ["orange", 8], epicesras: ["orange", 6], graissecanard: ["orange", 2],

    // ---- jaune --------------------------------------------------------------
    citron: ["jaune", 2], juscitron: ["jaune", 2], zestecitron: ["jaune", 6],
    mais: ["jaune", 2.5], farinemais: ["jaune", 2], polenta: ["jaune", 2.5],
    banane: ["jaune", 2], plantain: ["jaune", 2], ananas: ["jaune", 2],
    jusananas: ["jaune", 2], safran: ["jaune", 35], curry: ["jaune", 10],
    garammasala: ["jaune", 5], fenugrec: ["jaune", 6], moutarde: ["jaune", 5],
    grainesmoutarde: ["jaune", 5], oeufs: ["jaune", 1.2], jauneoeuf: ["jaune", 4],
    jaunedoeuf: ["jaune", 4], jaunesoeufs: ["jaune", 4], jaunes: ["jaune", 4],
    miel: ["jaune", 3], mielliquide: ["jaune", 3], mangueverte: ["vert", 2],

    // ---- vert ---------------------------------------------------------------
    epinards: ["vert", 3], basilic: ["vert", 6], pesto: ["vert", 8],
    courgette: ["vert", 2], brocoli: ["vert", 3], petitspois: ["vert", 3],
    avocat: ["vert", 3], haricotsverts: ["vert", 3], haricotvert: ["vert", 3],
    concombre: ["vert", 2], salade: ["vert", 2.5], laitue: ["vert", 2.5],
    roquette: ["vert", 3], persil: ["vert", 6], coriandre: ["vert", 6],
    menthe: ["vert", 6], ciboulette: ["vert", 5], ciboule: ["vert", 4],
    aneth: ["vert", 5], estragon: ["vert", 5], blettes: ["vert", 3],
    choufleur: ["blanc", 2], chouvert: ["vert", 2.5], chouxdebruxelles: ["vert", 3],
    kiwi: ["vert", 3], citronvert: ["vert", 3], juscitronvert: ["vert", 3],
    poivronvert: ["vert", 3], asperges: ["vert", 3], feves: ["vert", 2.5],
    edamame: ["vert", 3], olivevert: ["vert", 2.5], germes: ["vert", 2],
    cornichons: ["vert", 2.5], capres: ["vert", 3], pistache: ["vert", 3],
    matcha: ["vert", 25], wasabi: ["vert", 14], nori: ["vert", 6],
    algue: ["vert", 5], chartreuse: ["vert", 10], absinthe: ["vert", 8],
    gombo: ["vert", 2.5], feuillevigne: ["vert", 4], zaatar: ["vert", 6],
    sauge: ["vert", 4], romarin: ["vert", 4], thym: ["vert", 3],
    origan: ["vert", 3], laurier: ["vert", 2], citronnelle: ["vert", 3],
    endive: ["blanc", 2], fenouil: ["blanc", 2], lentillesvertes: ["vert", 2],

    // ---- violet / bleu ------------------------------------------------------
    aubergine: ["violet", 3], chourouge: ["violet", 3], myrtilles: ["violet", 3],
    mure: ["violet", 3], figue: ["violet", 2.5], cassis: ["violet", 3],
    raisinnoir: ["violet", 2.5], olivenoire: ["violet", 2], pruneaux: ["violet", 2.5],
    curacao: ["bleu", 12], curacaobleu: ["bleu", 12], colorant: ["bleu", 8],

    // ---- rose ---------------------------------------------------------------
    crevettes: ["rose", 2.5], crabe: ["rose", 2], jambon: ["rose", 2],
    jamboncru: ["rose", 2.5], prosciutto: ["rose", 2.5], radis: ["rose", 3],
    litchi: ["rose", 2], praline: ["rose", 4], rhubarbe: ["rose", 2.5],
    eauRose: ["rose", 5], eaurose: ["rose", 5], poulpe: ["rose", 2],

    // ---- brun ---------------------------------------------------------------
    chocolat: ["brun", 6], chocolatnoir: ["brun", 7], chocolatLait: ["brun", 5],
    cacao: ["brun", 12], cafe: ["brun", 8], caramel: ["brun", 6],
    cassonade: ["brun", 2], sucreroux: ["brun", 2], sucrebrun: ["brun", 2],
    saucesoja: ["brun", 8], sojaSauce: ["brun", 8], sauceSoja: ["brun", 8],
    miso: ["brun", 8], worcestershire: ["brun", 6], dashi: ["brun", 3],
    champignons: ["brun", 2], champignon: ["brun", 2], truffenoire: ["brun", 10],
    boeuf: ["brun", 1.5], boeufhache: ["brun", 1.5], viandehachee: ["brun", 1.5],
    boeufpouramijoter: ["brun", 1.5], agneau: ["brun", 1.5], veau: ["brun", 1.2],
    canard: ["brun", 1.5], lard: ["brun", 2], lardons: ["brun", 2],
    bacon: ["brun", 2], saucissefumee: ["brun", 2], noix: ["brun", 2],
    noisettes: ["brun", 2], cajou: ["brun", 1.5], amandes: ["brun", 1.2],
    dattes: ["brun", 3], tamarin: ["brun", 5], raisinssecs: ["brun", 2],
    raisinsec: ["brun", 2], the: ["brun", 5], vinaigreBalsamique: ["brun", 6],
    pateArachide: ["brun", 3], beurrecacahuete: ["brun", 3], tahini: ["brun", 2],
    cinqepices: ["brun", 6], anisetoile: ["brun", 4], cannelle: ["brun", 6],
    clougirofle: ["brun", 6], girofle: ["brun", 6], muscade: ["brun", 4],
    cumin: ["brun", 4], sumac: ["rouge", 7], farinesarrasin: ["brun", 2],
    farineseigle: ["brun", 2], bierebrune: ["brun", 4], rhum: ["brun", 3],
    cognac: ["brun", 3], bourbon: ["brun", 3], porto: ["brun", 3],
    manioc: ["blanc", 1.5], foie: ["brun", 2], tripes: ["brun", 1.5],

    // ---- blanc --------------------------------------------------------------
    creme: ["blanc", 1.5], cremefraiche: ["blanc", 1.5], lait: ["blanc", 1.2],
    laitcoco: ["blanc", 2], cremeCoco: ["blanc", 2], noixcoco: ["blanc", 2],
    coco: ["blanc", 2], fromageblanc: ["blanc", 1.5], fromagefrais: ["blanc", 1.5],
    ricotta: ["blanc", 1.5], mascarpone: ["blanc", 1.5], mozzarella: ["blanc", 1.5],
    mozza: ["blanc", 1.5], burrata: ["blanc", 1.5], feta: ["blanc", 1.5],
    chevre: ["blanc", 1.5], brocciu: ["blanc", 1.5], yaourt: ["blanc", 1.2],
    yaourtgrec: ["blanc", 1.2], tofu: ["blanc", 1.5], blancoeuf: ["blanc", 1.5],
    blancsoeufs: ["blanc", 1.5], blancs: ["blanc", 1.5], cremechantilly: ["blanc", 2],
    chocolatBlanc: ["blanc", 3], sucreglace: ["blanc", 2], riz: ["blanc", 1],
    rizgluant: ["blanc", 1.2], haricotsblancs: ["blanc", 1.5], navet: ["blanc", 1.5],
    laitconcentre: ["blanc", 1.5], panko: ["blanc", 1.2], poireau: ["vert", 1.5],
  };

  // Les clés existent en plusieurs casses dans le catalogue (huileOlive /
  // huileolive, jaunedoeuf / jauneoeuf) : on compare sans casse.
  var PAR_CLE = {};
  for (var k in T) if (Object.prototype.hasOwnProperty.call(T, k)) PAR_CLE[k.toLowerCase()] = T[k];

  // Une quantité en grammes. On NE RÉINVENTE PAS le poids d'une pièce :
  // `grammesComptes()` d'ingredients_prix.js le sait déjà (une ciboule fait
  // 15 g, pas 60) et renvoie null quand il l'ignore, ce qui vaut mieux qu'un
  // chiffre inventé — c'est de là que venait le canard laqué à 0,42 €.
  var CUILLERE = { cac: 3, cas: 10, cc: 3, cs: 10, pincee: 0.5, trait: 2, qs: 2 };
  function grammes(cle, v) {
    if (typeof v === "number") v = String(v);
    if (typeof v !== "string") return 20;
    var m = v.replace(",", ".").match(/([\d.]+)\s*(.*)$/);
    if (!m) return /pinc|qs|trait/i.test(v) ? 1 : 10;
    var n = parseFloat(m[1]);
    var mot = (m[2] || "").trim();
    var u = mot.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
             .replace(/[.\s]/g, "").replace(/s$/, "");
    if (u === "kg" || u === "l") return n * 1000;
    if (u === "cl") return n * 10;
    if (u === "ml" || u === "g") return n;
    if (CUILLERE[u] !== undefined) return n * CUILLERE[u];
    if (typeof grammesComptes === "function") {
      try {
        var g = grammesComptes(cle, n, mot || null);
        if (g !== null && g !== undefined) return g;
      } catch (e) {}
    }
    return n * 20;                           // dernier recours, volontairement modeste
  }

  // Couleur d'une recette : { couleur, surete } ou null si on ne sait pas.
  // `surete` = part du score que prend la couleur gagnante. En dessous de
  // MINIMUM, le plat est bigarré et on ne l'annonce d'aucune couleur.
  var MINIMUM = 0.45;
  function couleurDe(r) {
    if (!r) return null;
    var nomTab = null;
    for (var c in r) if (/^tableau/i.test(c) && Array.isArray(r[c])) { nomTab = c; break; }
    if (!nomTab) return null;
    var lignes = r[nomTab];
    var ligne = lignes[lignes.length - 1];
    if (!ligne) return null;

    var score = {}, total = 0;
    for (var ing in ligne) {
      if (ing === "nb" || !Object.prototype.hasOwnProperty.call(ligne, ing)) continue;
      var e = PAR_CLE[ing.toLowerCase()];
      if (!e) continue;
      var pts = grammes(ing, ligne[ing]) * e[1];
      score[e[0]] = (score[e[0]] || 0) + pts;
      total += pts;
    }
    if (!total) return null;

    var meilleure = null, max = 0;
    for (var col in score) if (score[col] > max) { max = score[col]; meilleure = col; }
    var surete = max / total;
    if (surete < MINIMUM) return null;
    return { couleur: meilleure, surete: surete };
  }

  window.COULEURS_PLATS = PAR_CLE;
  window.couleurDuPlat = couleurDe;
})();
