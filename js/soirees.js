// =============================================================================
// 🎉 soirees.js — composer une soirée à thème
// -----------------------------------------------------------------------------
// « Ce soir on fait un repas tout rouge », « tout au fromage », « on mange avec
// les doigts ». L'appli compose le menu complet depuis le catalogue réel.
//
// POURQUOI PAS UN SIXIÈME ONGLET. La barre du bas en a déjà cinq, c'est la
// limite tenable sur un téléphone, et elle sort d'une refonte d'ergonomie.
// L'entrée vit donc sur l'accueil, à côté de « Qu'est-ce qu'on mange ? ».
//
// POURQUOI PAS DE CATALOGUE DE JEUX. Il faudrait l'entretenir, il serait périmé
// en six mois, et ce n'est pas le métier de l'appli. Pour la soirée jeux, ce
// qu'on apporte c'est la CONTRAINTE : rien de gras, de collant, de poudreux ni
// de juteux, et qui se mange d'une main — les cartes y survivent. Ça, personne
// ne le fait, et nous on a les ingrédients pour le calculer.
//
// CE QUI EST MESURÉ, PAS SUPPOSÉ. Chaque format n'est proposé que s'il a de
// quoi composer : un format qui ne sort que deux plats ne s'affiche pas. Les
// couleurs offertes sont elles aussi calculées au chargement, pour qu'elles
// suivent le catalogue au lieu de se périmer dans une liste écrite en dur.
// =============================================================================
(function () {
  var EN = function () { return window.LANG === "en"; };
  var T = function (fr, en) { return EN() ? en : fr; };
  var esc = function (s) { return (typeof escapeHTML === "function") ? escapeHTML(s) : String(s == null ? "" : s); };

  // --- Les moments du repas, déduits de la catégorie -----------------------
  var MOMENT = {
    entrees: "entree", aperitifs: "entree", salades: "entree", soupes: "entree",
    tartinables: "entree",
    plats: "plat", pizzas: "plat", healthy: "plat", brunch: "plat", encas: "plat",
    boulangerie: "plat",
    desserts: "dessert", glaces: "dessert",
    cocktails: "boisson", mocktails: "boisson",
  };
  var ORDRE = ["entree", "plat", "dessert", "boisson"];
  var TITRE_MOMENT = {
    entree: ["Pour commencer", "To start"], plat: ["Le plat", "Main"],
    dessert: ["Le dessert", "Dessert"], boisson: ["À boire", "To drink"],
  };

  // --- Le profil : on n'invite personne à un plat qu'il ne peut pas manger --
  function motsExclus() {
    var set = [];
    var prefs = window.userProfile && window.userProfile.preferences;
    if (prefs && typeof ALLERGENES_MOTS !== "undefined") {
      [].concat(prefs.allergies || [], prefs.regimes || [], prefs.allergiesCustom || [])
        .forEach(function (a) {
          (ALLERGENES_MOTS[a] || [a]).forEach(function (m) { set.push(String(m).toLowerCase()); });
        });
    }
    return set;
  }
  function compatible(cle, exclus) {
    if (!exclus.length) return true;
    var t = (typeof texteRecette === "function")
      ? texteRecette(cle)
      : String((recettes[cle] && recettes[cle].nom) || "").toLowerCase();
    for (var i = 0; i < exclus.length; i++) if (exclus[i] && t.indexOf(exclus[i]) > -1) return false;
    return true;
  }

  function texteDe(r) {
    return ((r.nom || "") + " " + (r.description || "")).toLowerCase();
  }
  function ingredientsDe(r) {
    for (var k in r) {
      if (/^tableau/i.test(k) && Array.isArray(r[k]) && r[k].length) {
        var l = r[k][r[k].length - 1], out = [];
        for (var i in l) if (i !== "nb") out.push(i.toLowerCase());
        return out;
      }
    }
    return [];
  }

  // =========================================================================
  // Les cinq formats. Chacun dit comment reconnaître une recette qui lui va.
  // =========================================================================

  // ---- ✋ ce qui se mange avec les doigts ----------------------------------
  var NOM_DOIGTS = /pizza|burger|wrap|brochette|samoussa|samosa|nem|beignet|croquette|quiche|bruschetta|tapas|nugget|falafel|gyoza|empanada|arancini|sandwich|panini|bao|taco|burrito|churros|cookie|muffin|madeleine|financier|macaron|brownie|gaufre|donut|pop.?corn|chips|crackers|grissini|feuillet|friand|acras|accras|boulette|tempura|onigiri|maki|california|tartelette|biscuit|sabl[ée]|palmier|roul[ée]|club|hot.?dog|k[eé]fta|pakora|bhaji|canap[ée]|verrine|mini/i;
  function auxDoigts(r) {
    if (r.cat === "aperitifs" || r.cat === "tartinables") return true;
    return NOM_DOIGTS.test(texteDe(r));
  }

  // ---- 🎲 ce qui ne ruine pas les cartes ----------------------------------
  // Le gras laisse des auréoles, la poudre migre sur les doigts, le collant
  // et le jus tachent le carton. On écarte aussi ce qui demande un couteau.
  var ING_SALISSANT = ["huilefriture", "chocolat", "chocolatnoir", "chocolatlait",
    "miel", "mielliquide", "sirop", "confiture", "caramel", "coulistomate",
    "ketchup", "mayonnaise", "saucetomate", "cremechantilly", "glucose",
    "sucreglace", "cacao", "harissa", "gochujang", "tahini", "pateArachide",
    "beurrecacahuete", "saucePoisson", "nuocmam", "vinaigreBalsamique"];
  var NOM_SALISSANT = /sauce|fondue|raclette|trempette|dip|ailes|ribs|soupe|velout|curry|chili|mijot|ragout|ragoût|tajine|glac[ée]|cr[èe]me|coulis|nappage|fondant|coulant|juteu|sirop|caramel|chocolat/i;
  function propreAuxCartes(r) {
    if (!auxDoigts(r)) return false;
    if (NOM_SALISSANT.test(texteDe(r))) return false;
    var ing = ingredientsDe(r);
    for (var i = 0; i < ING_SALISSANT.length; i++)
      if (ing.indexOf(ING_SALISSANT[i].toLowerCase()) > -1) return false;
    return true;
  }

  // ---- 🧀 un seul ingrédient, décliné ------------------------------------
  // On ne propose que des ingrédients qui traversent réellement le repas.
  var VEDETTES = [
    { cle: "fromage", fr: "Fromage", en: "Cheese", e: "🧀",
      ing: ["fromage", "parmesan", "mozzarella", "mozza", "feta", "chevre", "cheddar",
            "gruyere", "comte", "emmental", "ricotta", "mascarpone", "burrata",
            "fromageblanc", "fromagefrais", "fromagerape", "pecorino", "brocciu"] },
    { cle: "pommedeterre", fr: "Pomme de terre", en: "Potato", e: "🥔",
      ing: ["pommedeterre", "pdterre", "patate", "frites"] },
    { cle: "oeuf", fr: "Œuf", en: "Egg", e: "🥚",
      ing: ["oeufs", "jauneoeuf", "jaunedoeuf", "blancoeuf", "blancsoeufs", "jaunesoeufs"] },
    { cle: "chocolat", fr: "Chocolat", en: "Chocolate", e: "🍫",
      ing: ["chocolat", "chocolatnoir", "chocolatLait", "chocolatBlanc", "cacao"] },
    { cle: "tomate", fr: "Tomate", en: "Tomato", e: "🍅",
      ing: ["tomate", "tomatecerise", "tomateconcassee", "concentretomate", "coulistomate", "saucetomate"] },
    { cle: "citron", fr: "Citron", en: "Lemon", e: "🍋",
      ing: ["citron", "juscitron", "zestecitron", "citronvert", "juscitronvert"] },
    { cle: "champignon", fr: "Champignon", en: "Mushroom", e: "🍄",
      ing: ["champignons", "champignon", "truffenoire"] },
    { cle: "coco", fr: "Noix de coco", en: "Coconut", e: "🥥",
      ing: ["laitcoco", "noixcoco", "coco", "cremeCoco"] },
  ];
  function aVedette(r, v) {
    var ing = ingredientsDe(r);
    for (var i = 0; i < v.ing.length; i++) if (ing.indexOf(v.ing[i].toLowerCase()) > -1) return true;
    return false;
  }
  // La promesse du format, c'est « de l'entrée au dessert ». On ne garde donc
  // que les vedettes qui la tiennent vraiment : mesuré sur le catalogue, la
  // tomate et le champignon n'ont aucun dessert, ils ne sont pas proposés. Le
  // tri se refait au chargement, donc il suit le catalogue au lieu de se
  // périmer dans une liste écrite en dur.
  var _vedettes = null;
  function vedettesOffertes() {
    if (_vedettes) return _vedettes;
    _vedettes = VEDETTES.filter(function (v) {
      var n = { entree: 0, plat: 0, dessert: 0, boisson: 0 };
      for (var k in recettes) {
        var r = recettes[k];
        if (!r || !r.nom) continue;
        var m = MOMENT[r.cat];
        if (m && aVedette(r, v)) n[m]++;
      }
      var pleins = 0;
      for (var i = 0; i < ORDRE.length; i++) if (n[ORDRE[i]] >= 3) pleins++;
      return pleins >= 3 && n.dessert >= 3;
    });
    return _vedettes;
  }

  // ---- 🌍 voyage ----------------------------------------------------------
  // La liste des pays jouables est calculée, pas écrite : elle suit le
  // catalogue. Un pays n'apparaît que s'il peut tenir un vrai repas.
  function paysJouables() {
    var par = {};
    for (var k in recettes) {
      var r = recettes[k];
      if (!r || !r.pays || !r.nom) continue;
      var m = MOMENT[r.cat];
      if (!m) continue;
      par[r.pays] = par[r.pays] || {};
      par[r.pays][m] = (par[r.pays][m] || 0) + 1;
    }
    var out = [];
    for (var p in par) {
      var n = 0;
      for (var i = 0; i < ORDRE.length; i++) if ((par[p][ORDRE[i]] || 0) >= 2) n++;
      if (n >= 3 && p !== "monde") out.push({ cle: p, moments: n });
    }
    return out.sort(function (a, b) { return b.moments - a.moments; });
  }

  // ---- 🎨 monochrome ------------------------------------------------------
  var TON = {
    rouge: ["Rouge", "Red", "🔴", "#d93025"], orange: ["Orange", "Orange", "🟠", "#e8710a"],
    jaune: ["Jaune", "Yellow", "🟡", "#f0b429"], vert: ["Vert", "Green", "🟢", "#2e9e5b"],
    violet: ["Violet", "Purple", "🟣", "#8041a8"], blanc: ["Blanc", "White", "⚪", "#c9ccd1"],
    rose: ["Rose", "Pink", "🩷", "#e0557f"], brun: ["Brun", "Brown", "🟤", "#8a5a33"],
    bleu: ["Bleu", "Blue", "🔵", "#2a6fd6"],
  };
  var _couleursOffertes = null;
  function couleursOffertes() {
    if (_couleursOffertes) return _couleursOffertes;
    if (typeof couleurDuPlat !== "function") return (_couleursOffertes = []);
    var par = {};
    for (var k in recettes) {
      var r = recettes[k];
      if (!r || !r.nom) continue;
      var m = MOMENT[r.cat];
      if (!m) continue;
      var c = couleurDuPlat(r);
      if (!c) continue;
      par[c.couleur] = par[c.couleur] || {};
      par[c.couleur][m] = (par[c.couleur][m] || 0) + 1;
    }
    var out = [];
    for (var col in par) {
      if (!TON[col]) continue;
      var n = 0;
      for (var i = 0; i < ORDRE.length; i++) if ((par[col][ORDRE[i]] || 0) >= 3) n++;
      // Trois moments sur quatre suffisent : un menu sans boisson reste un menu.
      if (n >= 3) out.push(col);
    }
    var rang = ["rouge", "orange", "jaune", "vert", "violet", "rose", "blanc", "brun", "bleu"];
    out.sort(function (a, b) { return rang.indexOf(a) - rang.indexOf(b); });
    return (_couleursOffertes = out);
  }

  // =========================================================================
  // Composer un menu : une recette par moment, tirée au sort parmi celles qui
  // passent le filtre du format ET le profil de la personne.
  // =========================================================================
  function composer(test) {
    var exclus = motsExclus();
    var paniers = { entree: [], plat: [], dessert: [], boisson: [] };
    for (var k in recettes) {
      var r = recettes[k];
      if (!r || !r.nom) continue;
      var m = MOMENT[r.cat];
      if (!m) continue;
      if (!compatible(k, exclus)) continue;
      try { if (!test(r, k)) continue; } catch (e) { continue; }
      paniers[m].push(k);
    }
    var menu = [];
    for (var i = 0; i < ORDRE.length; i++) {
      var p = paniers[ORDRE[i]];
      if (!p.length) continue;
      menu.push({ moment: ORDRE[i], cle: p[Math.floor(Math.random() * p.length)], total: p.length });
    }
    return menu;
  }

  // =========================================================================
  // L'écran
  // =========================================================================
  function fermer() {
    var m = document.getElementById("soir-modal");
    if (m) m.remove();
  }
  window.fermerSoirees = fermer;
  document.addEventListener("click", function (e) {
    if (e.target.closest && e.target.closest(".nav-bottom .nav-btn")) fermer();
  }, true);

  function feuille(titreHTML, contenuHTML) {
    injecterStyle();
    var deja = !!document.getElementById("soir-modal");
    fermer();
    var m = document.createElement("div");
    m.id = "soir-modal";
    m.innerHTML = '<div class="soir-sheet"><div class="soir-head"><h2>' + titreHTML + "</h2>" +
      '<button class="soir-x" aria-label="' + esc(T("Fermer", "Close")) + '">✕</button></div>' +
      '<div class="soir-corps">' + contenuHTML + "</div></div>";
    document.body.appendChild(m);
    m.addEventListener("click", function (e) { if (e.target === m) fermer(); });
    m.querySelector(".soir-x").addEventListener("click", fermer);
    if (!deja && typeof window._backGuardPush === "function") window._backGuardPush();
    return m;
  }

  function boutons(liste) {
    return '<div class="soir-chips">' + liste.map(function (b) {
      return '<button type="button" class="soir-chip" data-a="' + esc(b.action) + '"' +
        (b.teinte ? ' style="--soir-pastille:' + b.teinte + '"' : "") +
        (b.teinte ? ' data-pastille="1"' : "") + ">" +
        '<span class="soir-e">' + b.e + "</span>" + esc(b.nom) + "</button>";
    }).join("") + "</div>";
  }

  // --- l'accueil des formats ----------------------------------------------
  function formatsDisponibles() {
    var f = [];
    if (couleursOffertes().length >= 3)
      f.push({ id: "mono", e: "🎨", fr: "Tout d'une couleur", en: "All one colour",
               sfr: "un menu entier en rouge, en vert…", sen: "a whole menu in red, green…" });
    f.push({ id: "vedette", e: "🧀", fr: "Un seul ingrédient", en: "One ingredient",
             sfr: "décliné de l'entrée au dessert", sen: "from starter to dessert" });
    f.push({ id: "doigts", e: "✋", fr: "Sans couverts", en: "No cutlery",
             sfr: "tout se mange avec les doigts", sen: "everything eaten by hand" });
    f.push({ id: "voyage", e: "🌍", fr: "Voyage", en: "Journey",
             sfr: "un pays, du début à la fin", sen: "one country, start to finish" });
    f.push({ id: "jeux", e: "🎲", fr: "Soirée jeux", en: "Game night",
             sfr: "rien qui tache les cartes", sen: "nothing that ruins the cards" });
    return f;
  }

  // Exposes pour les controles : on doit pouvoir verifier ce qui est offert.
  window.soireesCouleurs = couleursOffertes;
  window.soireesVedettes = vedettesOffertes;

  window.ouvrirSoirees = function () {
    var f = formatsDisponibles();
    var html = '<p class="soir-intro">' +
      T("Choisis une contrainte, l'appli compose le menu dans le catalogue.",
        "Pick a constraint, the app builds the menu from the catalogue.") + "</p>" +
      '<div class="soir-formats">' + f.map(function (x) {
        return '<button type="button" class="soir-format" data-f="' + esc(x.id) + '">' +
          '<span class="soir-fe">' + x.e + "</span>" +
          "<b>" + esc(T(x.fr, x.en)) + "</b>" +
          "<i>" + esc(T(x.sfr, x.sen)) + "</i></button>";
      }).join("") + "</div>";
    var m = feuille("🎉 " + T("Soirée à thème", "Themed night"), html);
    m.querySelectorAll(".soir-format").forEach(function (b) {
      b.addEventListener("click", function () { choisir(b.dataset.f); });
    });
  };

  // --- le deuxième pas : préciser, quand le format le demande -------------
  function choisir(id) {
    if (id === "doigts") return montrer(
      "✋ " + T("Sans couverts", "No cutlery"),
      composer(auxDoigts),
      T("Tout se mange avec les doigts.", "Everything is eaten by hand."), "doigts");

    if (id === "jeux") return montrer(
      "🎲 " + T("Soirée jeux", "Game night"),
      composer(propreAuxCartes),
      T("Ni gras, ni collant, ni poudreux, ni juteux — et ça se tient d'une main.",
        "No grease, nothing sticky, powdery or juicy — and it holds in one hand."), "jeux");

    if (id === "mono") {
      var cols = couleursOffertes();
      var m = feuille("🎨 " + T("Tout d'une couleur", "All one colour"),
        '<p class="soir-intro">' + T("Quelle couleur ?", "Which colour?") + "</p>" +
        boutons(cols.map(function (c) {
          return { action: "mono:" + c, e: TON[c][2], nom: T(TON[c][0], TON[c][1]), teinte: TON[c][3] };
        })));
      return brancher(m);
    }

    if (id === "vedette") {
      var m2 = feuille("🧀 " + T("Un seul ingrédient", "One ingredient"),
        '<p class="soir-intro">' + T("Lequel ?", "Which one?") + "</p>" +
        boutons(vedettesOffertes().map(function (v) {
          return { action: "vedette:" + v.cle, e: v.e, nom: T(v.fr, v.en) };
        })));
      return brancher(m2);
    }

    if (id === "voyage") {
      var pays = paysJouables().slice(0, 18);
      var m3 = feuille("🌍 " + T("Voyage", "Journey"),
        '<p class="soir-intro">' + T("On va où ?", "Where to?") + "</p>" +
        boutons(pays.map(function (p) {
          return { action: "voyage:" + p.cle, e: "", nom: etiquettePays(p.cle) };
        })));
      return brancher(m3);
    }
  }

  function brancher(m) {
    m.querySelectorAll(".soir-chip").forEach(function (b) {
      b.addEventListener("click", function () {
        var a = b.dataset.a.split(":"), quoi = a[1];
        if (a[0] === "mono") {
          montrer(TON[quoi][2] + " " + T("Menu " + TON[quoi][0].toLowerCase(), TON[quoi][1] + " menu"),
            composer(function (r) {
              var c = (typeof couleurDuPlat === "function") && couleurDuPlat(r);
              return c && c.couleur === quoi;
            }),
            T("Chaque plat tire vers cette couleur — calculé sur ses ingrédients.",
              "Every dish leans that colour — worked out from its ingredients."), "mono:" + quoi);
        } else if (a[0] === "vedette") {
          var v = vedettesOffertes().filter(function (x) { return x.cle === quoi; })[0];
          montrer(v.e + " " + T(v.fr, v.en),
            composer(function (r) { return aVedette(r, v); }),
            T("Le même ingrédient d'un bout à l'autre du repas.",
              "The same ingredient from one end of the meal to the other."), "vedette:" + quoi);
        } else if (a[0] === "voyage") {
          montrer(etiquettePays(quoi),
            composer(function (r) { return r.pays === quoi; }),
            T("Un seul pays, du début à la fin.", "One country, start to finish."), "voyage:" + quoi);
        }
      });
    });
  }

  // Le nom affichable d'un pays existe DÉJÀ dans l'appli : les chips du filtre
  // portent « 🇰🇷 Corée », avec l'emoji et les accents, et passent par le
  // dictionnaire de traduction. On lit cette source plutôt que d'en créer une
  // deuxième qui divergerait. `DRAPEAUX` ne convient pas ici : il rend un SVG
  // en largeur 100 %, qui s'écrase à zéro dans un titre.
  var _libPays = null;
  function libellesPays() {
    if (_libPays && Object.keys(_libPays).length) return _libPays;
    _libPays = {};
    try {
      var chips = document.querySelectorAll('[onclick*="filtrerChipPays"]');
      for (var i = 0; i < chips.length; i++) {
        var m = String(chips[i].getAttribute("onclick") || "")
          .match(/filtrerChipPays\(\s*['"]([^'"]+)['"]/);
        if (m) _libPays[m[1]] = chips[i].textContent.trim();
      }
    } catch (e) {}
    return _libPays;
  }
  function etiquettePays(p) {
    var l = libellesPays()[p];
    if (l) return l;
    return "🌍 " + p.charAt(0).toUpperCase() + p.slice(1);
  }

  // --- le menu composé -----------------------------------------------------
  function montrer(titre, menu, sousTitre, graine) {
    if (!menu.length) {
      feuille(titre, '<p class="soir-vide">' +
        T("Rien dans le catalogue pour cette contrainte. Essaie autre chose.",
          "Nothing in the catalogue fits that. Try another one.") + "</p>");
      return;
    }
    var html = '<p class="soir-intro">' + esc(sousTitre) + "</p>" +
      menu.map(function (p) {
        return '<div class="soir-moment"><span class="soir-mtitre">' +
          esc(T(TITRE_MOMENT[p.moment][0], TITRE_MOMENT[p.moment][1])) + "</span>" +
          '<span class="soir-mcompte">' +
          esc(p.total + " " + T(p.total > 1 ? "possibles" : "possible",
                                p.total > 1 ? "options" : "option")) + "</span></div>" +
          ((typeof miniCarte === "function") ? miniCarte(p.cle) : "");
      }).join("") +
      '<button type="button" class="soir-relancer">🎲 ' +
      T("Un autre menu", "Another menu") + "</button>" +
      '<button type="button" class="soir-retour">← ' +
      T("Changer de thème", "Change theme") + "</button>";

    var m = feuille(titre, html);
    // Relancer rejoue le MÊME thème avec un autre tirage — on ne repasse pas
    // par l'écran de choix, sinon il faudrait re-sélectionner sa couleur.
    m.querySelector(".soir-relancer").addEventListener("click", function () {
      var a = String(graine).split(":");
      if (a[0] === "doigts" || a[0] === "jeux") choisir(a[0]);
      else rejouer(graine, titre);
    });
    m.querySelector(".soir-retour").addEventListener("click", function () { window.ouvrirSoirees(); });
  }

  function rejouer(graine, titre) {
    var a = String(graine).split(":"), quoi = a[1];
    if (a[0] === "mono") {
      montrer(titre, composer(function (r) {
        var c = (typeof couleurDuPlat === "function") && couleurDuPlat(r);
        return c && c.couleur === quoi;
      }), T("Chaque plat tire vers cette couleur — calculé sur ses ingrédients.",
            "Every dish leans that colour — worked out from its ingredients."), graine);
    } else if (a[0] === "vedette") {
      var v = vedettesOffertes().filter(function (x) { return x.cle === quoi; })[0];
      montrer(titre, composer(function (r) { return aVedette(r, v); }),
        T("Le même ingrédient d'un bout à l'autre du repas.",
          "The same ingredient from one end of the meal to the other."), graine);
    } else if (a[0] === "voyage") {
      montrer(titre, composer(function (r) { return r.pays === quoi; }),
        T("Un seul pays, du début à la fin.", "One country, start to finish."), graine);
    }
  }

  // --- l'entrée sur l'accueil ---------------------------------------------
  function injecterBloc() {
    var sec = document.getElementById("section-accueil");
    if (!sec || document.getElementById("soir-bloc")) return;
    injecterStyle();
    var bloc = document.createElement("div");
    bloc.className = "soir-bloc";
    bloc.id = "soir-bloc";
    bloc.innerHTML =
      '<div class="soir-bhead"><b>🎉 ' + T("Soirée à thème", "Themed night") + "</b></div>" +
      '<div class="soir-bsous">' +
      T("Un repas tout rouge, tout au fromage, ou qui se mange avec les doigts.",
        "An all-red meal, an all-cheese one, or one you eat with your hands.") + "</div>" +
      '<button type="button" class="soir-bouton" onclick="ouvrirSoirees()">' +
      T("Composer une soirée", "Build a night") + "</button>";
    var ancre = document.getElementById("envie-bloc");
    if (ancre && ancre.parentNode) ancre.parentNode.insertBefore(bloc, ancre.nextSibling);
    else sec.appendChild(bloc);
  }

  // =========================================================================
  function injecterStyle() {
    if (document.getElementById("soir-style")) return;
    var s = document.createElement("style");
    s.id = "soir-style";
    s.textContent = [
      // --- la carte sur l'accueil
      ".soir-bloc { background: var(--panel); border: 1px solid var(--border);",
      "  border-radius: 16px; padding: 14px; margin: 12px 0; }",
      ".soir-bloc .soir-bhead b { font-size: 16px; color: var(--text); }",
      ".soir-bloc .soir-bsous { font-size: 13px; color: var(--text-2); margin: 6px 0 10px; line-height: 1.35; }",
      ".soir-bouton { width: 100%; border: 0; border-radius: 12px; padding: 11px;",
      "  font-size: 14px; font-weight: 700; cursor: pointer;",
      "  background: var(--accent); color: var(--accent-contraste, #fff); }",
      ".soir-bouton:active { transform: translateY(1px); }",
      // --- la feuille
      "#soir-modal { position: fixed; inset: 0; z-index: 9150; background: rgba(0,0,0,.55);",
      "  display: flex; align-items: flex-end; justify-content: center; }",
      "#soir-modal .soir-sheet { background: var(--panel-solid, var(--panel));",
      "  color: var(--text); width: 100%; max-width: 560px; max-height: 92vh;",
      "  border-radius: 18px 18px 0 0; display: flex; flex-direction: column; overflow: hidden; }",
      "#soir-modal .soir-head { display: flex; align-items: center; justify-content: space-between;",
      "  gap: 10px; padding: 14px 16px; border-bottom: 1px solid var(--border); }",
      "#soir-modal .soir-head h2 { margin: 0; font-size: 17px; }",
      "#soir-modal .soir-x { border: 0; background: none; color: var(--text-2);",
      "  font-size: 20px; cursor: pointer; padding: 4px 8px; }",
      "#soir-modal .soir-corps { padding: 14px 16px 24px; overflow-y: auto; }",
      "#soir-modal .soir-intro { margin: 0 0 12px; font-size: 13.5px; color: var(--text-2); line-height: 1.4; }",
      "#soir-modal .soir-vide { font-size: 14px; color: var(--text-2); }",
      // --- les formats
      "#soir-modal .soir-formats { display: flex; flex-direction: column; gap: 9px; }",
      "#soir-modal .soir-format { display: grid; grid-template-columns: 34px 1fr;",
      "  grid-template-rows: auto auto; gap: 1px 10px; align-items: center; text-align: left;",
      "  background: var(--surface-1, var(--panel)); border: 1px solid var(--border);",
      "  border-radius: 13px; padding: 11px 12px; cursor: pointer; color: var(--text); }",
      "#soir-modal .soir-format:active { transform: translateY(1px); }",
      "#soir-modal .soir-fe { grid-row: 1 / 3; font-size: 25px; text-align: center; }",
      "#soir-modal .soir-format b { font-size: 14.5px; }",
      "#soir-modal .soir-format i { font-style: normal; font-size: 12.5px; color: var(--text-2); }",
      // --- les pastilles de choix
      "#soir-modal .soir-chips { display: flex; flex-wrap: wrap; gap: 8px; }",
      "#soir-modal .soir-chip { display: inline-flex; align-items: center; gap: 6px;",
      "  background: var(--surface-1, var(--panel)); border: 1px solid var(--border);",
      "  border-radius: 999px; padding: 9px 13px; font-size: 13.5px; cursor: pointer;",
      "  color: var(--text); }",
      "#soir-modal .soir-chip[data-pastille] { border-color: var(--soir-pastille); }",
      "#soir-modal .soir-chip:active { transform: translateY(1px); }",
      "#soir-modal .soir-e { font-size: 15px; }",
      // --- le menu composé
      "#soir-modal .soir-moment { display: flex; align-items: baseline; justify-content: space-between;",
      "  gap: 8px; margin: 16px 0 7px; }",
      "#soir-modal .soir-mtitre { font-size: 12px; font-weight: 700; letter-spacing: .05em;",
      "  text-transform: uppercase; color: var(--text-2); }",
      "#soir-modal .soir-mcompte { font-size: 11.5px; color: var(--text-3, var(--text-2)); }",
      "#soir-modal .soir-relancer, #soir-modal .soir-retour { width: 100%; margin-top: 12px;",
      "  border-radius: 12px; padding: 11px; font-size: 14px; font-weight: 600; cursor: pointer; }",
      "#soir-modal .soir-relancer { border: 0; background: var(--accent); color: var(--accent-contraste, #fff); }",
      "#soir-modal .soir-retour { border: 1px solid var(--border); background: none; color: var(--text-2); }",
    ].join("\n");
    document.head.appendChild(s);
  }

  // On s'accroche au rendu de l'accueil, comme le fait le bloc « envie ».
  function brancherAccueil() {
    try { injecterBloc(); } catch (e) {}
    if (typeof window.afficherAccueil === "function" && !window.afficherAccueil._soir) {
      var orig = window.afficherAccueil;
      window.afficherAccueil = function () {
        var r = orig.apply(this, arguments);
        try { injecterBloc(); } catch (e) {}
        return r;
      };
      window.afficherAccueil._soir = true;
    }
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", function () { setTimeout(brancherAccueil, 900); });
  else setTimeout(brancherAccueil, 900);
})();
