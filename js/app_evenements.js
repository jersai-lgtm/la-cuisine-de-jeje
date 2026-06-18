/* =============================================================================
 * app_evenements.js — Habillage événementiel de La Cuisine de Jéjé
 * -----------------------------------------------------------------------------
 * Pendant la fenêtre d'un événement (Halloween, Noël, St-Valentin, Nouvel An…) :
 *   1) l'appli s'ouvre sur un "splash" plein écran (l'ardoise/visuel de la fête),
 *      fermable par la croix OU le bouton retour Android,
 *   2) l'accueil affiche un bloc "Menu de fête" avec une sélection de recettes,
 *   3) une déco légère flotte par-dessus (désactivable / reduced-motion).
 *
 * 100 % local, sans clé. Détection auto par date + forçage manuel pour preview :
 *   - URL : ...?event=halloween   (ou ?event=off pour désactiver)
 *   - Console : lcForcerEvenement('halloween')  /  lcForcerEvenement(null)
 *
 * Visuels à committer dans images/ :  event-halloween.webp, event-noel.webp, …
 * (si l'image manque, un fond stylisé de secours s'affiche : ça ne casse jamais.)
 * ========================================================================== */
(function () {
  "use strict";

  var LS = {
    force: "cuisineJeje_event_force",
    seenPrefix: "cuisineJeje_event_splash_"
  };

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  // Accès au catalogue : `recettes` est un const global (pas attaché à window)
  function lcRecettes() { try { if (typeof recettes !== "undefined" && recettes) return recettes; } catch (e) {} return window.recettes || {}; }

  // hex -> "r,g,b"
  function hexRgb(h) {
    h = String(h).replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16);
    return ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255);
  }
  // éclaircit une couleur vers le blanc (amt 0..1)
  function eclaircir(h, amt) {
    h = String(h).replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16), r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.round(r + (255 - r) * amt); g = Math.round(g + (255 - g) * amt); b = Math.round(b + (255 - b) * amt);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // --- Date utils ---------------------------------------------------------
  function ymd(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  // Pâques (algorithme de Gauss/Anonymous Gregorian) -> Date du dimanche de Pâques
  function paques(annee) {
    var a = annee % 19, b = Math.floor(annee / 100), c = annee % 100;
    var d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var mois = Math.floor((h + l - 7 * m + 114) / 31);
    var jour = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(annee, mois - 1, jour);
  }
  function entre(now, start, end) { return now >= start && now <= end; }
  function dateA(y, m, d, hh) { return new Date(y, m - 1, d, hh || 0, 0, 0, 0); }
  // n-ième jour de semaine du mois (wd: 0=dim..6=sam, n>=1) ; m 1-based
  function nthWeekday(y, m, wd, n) {
    var d = new Date(y, m - 1, 1);
    var shift = (wd - d.getDay() + 7) % 7;
    return new Date(y, m - 1, 1 + shift + (n - 1) * 7);
  }
  // dernier jour de semaine du mois
  function lastWeekday(y, m, wd) {
    var last = new Date(y, m, 0);
    var shift = (last.getDay() - wd + 7) % 7;
    return new Date(y, m - 1, last.getDate() - shift);
  }

  // --- Configuration des événements --------------------------------------
  // accent : couleur d'accent de la fête (utilisée pour le bandeau, la déco, le theme-color)
  // estActif(now) : true si "now" est dans la fenêtre de la fête
  // Zone d'écriture par défaut sur l'ardoise (insets en % du visuel).
  // Surchargée par event.menuZone pour chaque visuel.
  var ZONE_DEFAUT = { top: "42%", bottom: "33%", left: "24%", right: "33%" };

  var EVENEMENTS = {
    mardigras: {
      nom: "Mardi Gras", titre: "🎭 Menu Mardi Gras",
      accent: "#9b59b6", accent2: "#f1c40f",
      image: "images/event-mardigras.webp",
      emojis: ["🎭", "🎉", "🍩", "🎊"],
      cta: "Entrer 🎭",
      menuZone: { top: "49%", bottom: "30%", left: "26%", right: "26%" },
      menuColor: "#f4d35e",
      menuNoms: { churros: "Churros", gaufresliege: "Gaufres de Liège", crepessuzette: "Crêpes Suzette", "crepesSucrées": "Crêpes Sucrées", gaufres: "Gaufres", crepesbretonnes: "Galettes Bretonnes" },
      recettes: ["churros", "gaufresliege", "crepessuzette", "crepesSucrées", "gaufres", "crepesbretonnes"],
      estActif: function (now) {
        var p = paques(now.getFullYear());
        var mg = new Date(p.getTime() - 47 * 864e5);
        return entre(now, new Date(mg.getTime() - 1 * 864e5), new Date(mg.getTime() + 864e5));
      }
    },
    chinois: {
      nom: "Nouvel An Chinois", titre: "🥟 Nouvel An Chinois",
      accent: "#e0241a", accent2: "#ffcc00",
      image: "images/event-chinois.webp",
      emojis: ["🥟", "🐉", "🧧", "🏮"],
      cta: "Entrer 🥟",
      menuZone: { top: "49%", bottom: "28%", left: "25%", right: "25%" },
      menuColor: "#b3211a", menuShadow: "none",
      menuNoms: { gyoza: "Gyoza", nemsvietnam: "Nems", baoporccarmelise: "Bao au Porc", pekinduckeasy: "Canard Laqué", rizcantonais: "Riz Cantonais", noodlesWok: "Nouilles Wok" },
      recettes: ["gyoza", "nemsvietnam", "baoporccarmelise", "pekinduckeasy", "rizcantonais", "noodlesWok"],
      estActif: function (now) {
        var y = now.getFullYear();
        var NAC = { 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3], 2031: [1, 23], 2032: [2, 11], 2033: [1, 31] };
        if (!NAC[y]) return false;
        var d = dateA(y, NAC[y][0], NAC[y][1]);
        return entre(now, new Date(d.getTime() - 1 * 864e5), new Date(d.getTime() + 4 * 864e5));
      }
    },
    patrick: {
      nom: "Saint-Patrick", titre: "☘️ Menu Saint-Patrick",
      accent: "#1faf53", accent2: "#f1c40f",
      image: "images/event-patrick.webp",
      emojis: ["☘️", "🍀", "🍺", "💚"],
      cta: "Entrer ☘️",
      menuZone: { top: "44%", bottom: "25%", left: "25%", right: "25%" },
      menuColor: "#1b5e34", menuShadow: "none",
      menuNoms: { guacamole: "Guacamole", patespesto: "Pâtes au Pesto", boulettesfetaepinard: "Boulettes Feta-Épinards", gratinbrocolis: "Gratin de Brocolis", tarteepinardfeta: "Tarte Épinards-Feta", palmierspesto: "Palmiers Pesto" },
      recettes: ["guacamole", "patespesto", "boulettesfetaepinard", "gratinbrocolis", "tarteepinardfeta", "palmierspesto"],
      estActif: function (now) { var y = now.getFullYear(); return entre(now, dateA(y, 3, 16), dateA(y, 3, 17, 23)); }
    },
    fetemeres: {
      nom: "Fête des Mères", titre: "💐 Menu Fête des Mères",
      accent: "#ff6fa5", accent2: "#e84393",
      image: "images/event-fetemeres.webp",
      emojis: ["💐", "🌷", "💕", "🌸"],
      cta: "Entrer 💐",
      menuZone: { top: "46%", bottom: "25%", left: "25%", right: "25%" },
      menuColor: "#c2185b", menuShadow: "none",
      menuNoms: { eggsBenedict: "Œufs Bénédicte", pancakes: "Pancakes", financiers: "Financiers", gaufresliege: "Gaufres de Liège", saintjacquespoelees: "Saint-Jacques", risottoprimavera: "Risotto Primavera" },
      recettes: ["eggsBenedict", "pancakes", "financiers", "gaufresliege", "saintjacquespoelees", "risottoprimavera"],
      estActif: function (now) { var y = now.getFullYear(); var d = lastWeekday(y, 5, 0); return entre(now, new Date(d.getTime() - 1 * 864e5), new Date(d.getTime() + 864e5)); }
    },
    feteperes: {
      nom: "Fête des Pères", titre: "👔 Menu Fête des Pères",
      accent: "#4a82c4", accent2: "#2c3e50",
      image: "images/event-feteperes.webp",
      emojis: ["👔", "🍖", "🎁", "🥃"],
      cta: "Entrer 👔",
      menuZone: { top: "45%", bottom: "28%", left: "24%", right: "24%" },
      menuColor: "#1b3a6b", menuShadow: "none",
      menuNoms: { melonjambon: "Melon & Jambon cru", magretcanard: "Magret de Canard", grilladelamnocciole: "Grillades d'Agneau", salmongrillee: "Saumon Grillé", fraisier: "Fraisier", moelleuxchocolat: "Moelleux Chocolat" },
      recettes: ["melonjambon", "magretcanard", "grilladelamnocciole", "salmongrillee", "fraisier", "moelleuxchocolat"],
      estActif: function (now) { var y = now.getFullYear(); var d = nthWeekday(y, 6, 0, 3); return entre(now, new Date(d.getTime() - 1 * 864e5), new Date(d.getTime() + 864e5)); }
    },
    musique: {
      nom: "Fête de la Musique", titre: "🎵 Apéro Fête de la Musique",
      accent: "#e84393", accent2: "#6c5ce7",
      image: "images/event-musique.webp",
      emojis: ["🎵", "🎸", "🎤", "🎉"],
      cta: "Entrer 🎵",
      menuZone: { top: "43%", bottom: "28%", left: "25%", right: "25%" },
      menuColor: "#f4f1e8",
      menuNoms: { houmous: "Houmous", guacamole: "Guacamole", nachosgratines: "Nachos Gratinés", brochettecaprese: "Brochettes Caprese", accrasmorue: "Accras de Morue", samoussaslegumes: "Samoussas" },
      recettes: ["houmous", "guacamole", "nachosgratines", "brochettecaprese", "accrasmorue", "samoussaslegumes"],
      estActif: function (now) { var y = now.getFullYear(); return entre(now, dateA(y, 6, 20), dateA(y, 6, 21, 23)); }
    },
    fetenationale: {
      nom: "14 Juillet", titre: "🇫🇷 Menu du 14 Juillet",
      accent: "#2667b8", accent2: "#ef4135",
      image: "images/event-fetenationale.webp",
      emojis: ["🇫🇷", "🎆", "🍉", "🥖"],
      cta: "Entrer 🇫🇷",
      menuZone: { top: "45%", bottom: "27%", left: "25%", right: "25%" },
      menuColor: "#f4f1e8",
      menuNoms: { brochettecaprese: "Brochettes Caprese", halloumigrille: "Halloumi Grillé", saladequinoa: "Salade Quinoa", bruschetta: "Bruschetta", crostini: "Crostini", saladefruits: "Salade de Fruits" },
      recettes: ["brochettecaprese", "halloumigrille", "saladequinoa", "bruschetta", "crostini", "saladefruits"],
      estActif: function (now) { var y = now.getFullYear(); return entre(now, dateA(y, 7, 13), dateA(y, 7, 14, 23)); }
    },
    beaujolais: {
      nom: "Beaujolais Nouveau", titre: "🍷 Soirée Beaujolais",
      accent: "#b3294e", accent2: "#7b1f3a",
      image: "images/event-beaujolais.webp",
      emojis: ["🍷", "🍇", "🧀"],
      cta: "Entrer 🍷",
      menuZone: { top: "48%", bottom: "30%", left: "22%", right: "22%" },
      menuColor: "#7a1f3a", menuShadow: "none",
      menuNoms: { gougeres: "Gougères", terrinecampagne: "Terrine de Campagne", quichelorraine: "Quiche Lorraine", rillettesthon: "Rillettes de Thon", terrineforestiere: "Terrine Forestière", gratindauphinois: "Gratin Dauphinois" },
      recettes: ["gougeres", "terrinecampagne", "quichelorraine", "rillettesthon", "terrineforestiere", "gratindauphinois"],
      estActif: function (now) { var y = now.getFullYear(); var thu = nthWeekday(y, 11, 4, 3); return entre(now, thu, new Date(thu.getTime() + 4 * 864e5)); }
    },
    toussaint: {
      nom: "Toussaint", titre: "🍂 Menu de la Toussaint",
      accent: "#c9772e", accent2: "#8a5a2b",
      image: "images/event-toussaint.webp",
      emojis: ["🍂", "🍁", "🌰", "🕯️"],
      cta: "Entrer 🍂",
      menuZone: { top: "40%", bottom: "27%", left: "25%", right: "25%" },
      menuColor: "#4a2c5a", menuShadow: "none",
      menuNoms: { soupepotimarronchataigne: "Soupe Potimarron", potaufeu: "Pot-au-Feu", daubeProvencale: "Daube Provençale", gratindauphinois: "Gratin Dauphinois", tartiflettesavoyarde: "Tartiflette", raclette: "Raclette" },
      recettes: ["soupepotimarronchataigne", "potaufeu", "daubeProvencale", "gratindauphinois", "tartiflettesavoyarde", "raclette"],
      estActif: function (now) { var y = now.getFullYear(); return entre(now, dateA(y, 11, 1), dateA(y, 11, 2, 23)); }
    },
    premiermai: {
      nom: "Fête du Travail", titre: "🛠️ Menu du 1er Mai",
      accent: "#2667b8", accent2: "#ef4135",
      image: "images/event-premiermai.webp",
      emojis: ["🌿", "🛠️", "⚙️", "🌼"],
      cta: "Entrer 🌿",
      menuZone: { top: "49%", bottom: "26%", left: "24%", right: "24%" },
      menuColor: "#f4f1e8",
      menuNoms: { gougeres: "Gougères", quichelorraine: "Quiche Lorraine", brochettecaprese: "Brochettes Caprese", saladequinoa: "Salade Quinoa", crumblefruits: "Crumble aux Fruits", tartepistache: "Tarte Pistache" },
      recettes: ["gougeres", "quichelorraine", "brochettecaprese", "saladequinoa", "crumblefruits", "tartepistache"],
      estActif: function (now) { var y = now.getFullYear(); return entre(now, dateA(y, 5, 1), dateA(y, 5, 1, 23)); }
    },
    huitmai: {
      nom: "Victoire 1945", titre: "🇫🇷 Menu du 8 Mai",
      accent: "#2667b8", accent2: "#ef4135",
      image: "images/event-huitmai.webp",
      emojis: ["🇫🇷", "🕊️", "🎖️", "⭐"],
      cta: "Entrer 🇫🇷",
      menuZone: { top: "51%", bottom: "25%", left: "25%", right: "25%" },
      menuColor: "#f4f1e8",
      menuNoms: { escargots: "Escargots", quichelorraine: "Quiche Lorraine", salmongrillee: "Saumon Grillé", saladechevrechaud: "Salade de Chèvre Chaud", tarteaupommes: "Tarte aux Pommes", ileflottante: "Île Flottante" },
      recettes: ["escargots", "quichelorraine", "salmongrillee", "saladechevrechaud", "tarteaupommes", "ileflottante"],
      estActif: function (now) { var y = now.getFullYear(); return entre(now, dateA(y, 5, 8), dateA(y, 5, 8, 23)); }
    },
    assomption: {
      nom: "Assomption", titre: "🕊️ Menu de l'Assomption",
      accent: "#3f6fb0", accent2: "#d4af37",
      image: "images/event-assomption.webp",
      emojis: ["🕊️", "⛪", "🌸", "✨"],
      cta: "Entrer 🕊️",
      menuZone: { top: "49%", bottom: "28%", left: "30%", right: "30%" },
      menuColor: "#efe8d6",
      menuNoms: { bruschetta: "Bruschetta", saladeniçoise: "Salade Niçoise", brochettecaprese: "Brochettes Caprese", tartecitron: "Tarte au Citron", pavlova: "Pavlova", saladefruits: "Salade de Fruits" },
      recettes: ["bruschetta", "saladeniçoise", "brochettecaprese", "tartecitron", "pavlova", "saladefruits"],
      estActif: function (now) { var y = now.getFullYear(); return entre(now, dateA(y, 8, 15), dateA(y, 8, 15, 23)); }
    },
    halloween: {
      nom: "Halloween",
      titre: "🎃 Menu Fête Halloween",
      accent: "#ff7518",
      accent2: "#7b2ff7",
      accentSoft: "#ff9d4d",
      accentPale: "#ffcf9e",
      image: "images/event-halloween.webp",
      emojis: ["🎃", "🦇", "🕷️", "👻", "🕸️"],
      cta: "Entrer 🎃",
      menuZone: { top: "45%", bottom: "33%", left: "24%", right: "30%" },
      menuNoms: { soupepotimarronchataigne: "Soupe Potimarron", chilisincarne: "Chili sin Carne", veloutetomaterotie: "Velouté Tomate Rôtie", darkStormyCocktail: "Dark & Stormy", blueLagoon: "Blue Lagoon", moelleuxchocolat: "Moelleux Chocolat" },
      recettes: ["soupepotimarronchataigne", "chilisincarne", "veloutetomaterotie", "darkStormyCocktail", "blueLagoon", "moelleuxchocolat"],
      estActif: function (now) {
        var y = now.getFullYear();
        return entre(now, dateA(y, 10, 30), dateA(y, 11, 1, 6)); // 28 oct -> 31 oct (jusqu'au 1er nov 6h)
      }
    },
    noel: {
      nom: "Noël",
      titre: "🎄 Menu de Noël",
      accent: "#1f9d55",
      accent2: "#d4af37",
      image: "images/event-noel.webp",
      emojis: ["🎄", "❄️", "⭐", "🎁", "🦌"],
      cta: "Entrer 🎄",
      menuZone: { top: "50%", bottom: "24%", left: "27%", right: "27%" },
      menuColor: "#3a5a3f",
      menuShadow: "none",
      menuNoms: { huitresgratinees: "Huîtres Gratinées", foiegraspoele: "Foie Gras Poêlé", escargots: "Escargots", dindenoelmarrons: "Dinde aux Marrons", buchenoelchocolat: "Bûche au Chocolat", vinchaud: "Vin Chaud" },
      recettes: ["huitresgratinees", "foiegraspoele", "escargots", "dindenoelmarrons", "buchenoelchocolat", "vinchaud"],
      estActif: function (now) {
        var y = now.getFullYear();
        return entre(now, dateA(y, 12, 15), dateA(y, 12, 25, 23)); // 15 -> 25 déc
      }
    },
    nouvelan: {
      nom: "Nouvel An",
      titre: "🎆 Menu du Réveillon",
      accent: "#d4af37",
      accent2: "#c0c0c0",
      image: "images/event-nouvelan.webp",
      emojis: ["🎆", "🥂", "✨", "🍾", "🎉"],
      cta: "Entrer 🥂",
      menuZone: { top: "46%", bottom: "24%", left: "22%", right: "22%" },
      menuColor: "#e6c25a",
      menuNoms: { blinissaumon: "Blinis Saumon", croquetasjamon: "Croquetas", accrasmorue: "Accras de Morue", mimosa: "Mimosa", pornstarmartini: "Porn Star Martini", verrineavocatcrevette: "Verrine Avocat-Crevette" },
      recettes: ["blinissaumon", "croquetasjamon", "accrasmorue", "mimosa", "pornstarmartini", "verrineavocatcrevette"],
      estActif: function (now) {
        var y = now.getFullYear();
        // 26 déc -> 1er jan (gère le passage d'année)
        return now >= dateA(y, 12, 28) || now <= dateA(y, 1, 1, 23);
      }
    },
    galette: {
      nom: "Épiphanie",
      titre: "👑 Galette des Rois",
      accent: "#c89b3c",
      accent2: "#8b5e3c",
      image: "images/event-galette.webp",
      emojis: ["👑", "🥧", "✨"],
      cta: "Entrer 👑",
      menuZone: { top: "55%", bottom: "24%", left: "22%", right: "22%" },
      menuColor: "#e6c25a",
      menuNoms: { galettedesrois: "Galette des Rois", financiers: "Financiers", millefeuille: "Mille-feuille" },
      recettes: ["galettedesrois", "financiers", "millefeuille"],
      estActif: function (now) {
        var y = now.getFullYear();
        return entre(now, dateA(y, 1, 2), dateA(y, 1, 6, 23)); // 2 -> 6 jan
      }
    },
    chandeleur: {
      nom: "Chandeleur",
      titre: "🥞 La Chandeleur",
      accent: "#e0a96d",
      accent2: "#ff4d88",
      image: "images/event-chandeleur.webp",
      emojis: ["🥞", "🍯", "🍋"],
      cta: "Entrer 🥞",
      menuZone: { top: "61%", bottom: "22%", left: "20%", right: "20%" },
      menuColor: "#b5172a",
      menuShadow: "none",
      menuNoms: { "crepesSucrées": "Crêpes Sucrées", pancakes: "Pancakes", gaufres: "Gaufres" },
      recettes: ["crepesSucrées", "pancakes", "gaufres"],
      estActif: function (now) {
        var y = now.getFullYear();
        return entre(now, dateA(y, 2, 1), dateA(y, 2, 2, 23)); // 1 -> 2 fév
      }
    },
    valentin: {
      nom: "Saint-Valentin",
      titre: "❤️ Menu pour deux",
      accent: "#ff4d88",
      accent2: "#ff1f5a",
      image: "images/event-valentin.webp",
      emojis: ["❤️", "🌹", "🍫", "✨"],
      cta: "Entrer ❤️",
      menuZone: { top: "49%", bottom: "23%", left: "22%", right: "22%" },
      menuColor: "#fff0f5",
      menuShadow: "0 1px 3px rgba(120,0,40,.35)",
      menuNoms: { fondantchocolat: "Fondant Chocolat", moelleuxchocolat: "Moelleux Chocolat", mousseauchocolat: "Mousse au Chocolat", tiramisufraise: "Tiramisu Fraises", frenchMartini: "French Martini", burratapeche: "Burrata Pêche" },
      recettes: ["fondantchocolat", "moelleuxchocolat", "mousseauchocolat", "tiramisufraise", "frenchMartini", "burratapeche"],
      estActif: function (now) {
        var y = now.getFullYear();
        return entre(now, dateA(y, 2, 13), dateA(y, 2, 14, 23)); // 11 -> 14 fév
      }
    },
    paques: {
      nom: "Pâques",
      titre: "🐣 Menu de Pâques",
      accent: "#f6c945",
      accent2: "#7fc1e3",
      image: "images/event-paques.webp",
      emojis: ["🐣", "🥚", "🐰", "🌷"],
      cta: "Entrer 🐣",
      menuZone: { top: "50%", bottom: "22%", left: "26%", right: "26%" },
      menuColor: "#c43e80",
      menuShadow: "none",
      menuNoms: { gateaubasque: "Gâteau Basque", crumblefruits: "Crumble aux Fruits", pavlova: "Pavlova", tartepistache: "Tarte Pistache" },
      recettes: ["gateaubasque", "crumblefruits", "pavlova", "tartepistache"],
      estActif: function (now) {
        var p = paques(now.getFullYear());
        var debut = new Date(p.getTime() - 1 * 86400000); // J-4
        var fin = new Date(p.getFullYear(), p.getMonth(), p.getDate(), 23, 59, 59);
        return entre(now, debut, fin);
      }
    }
  };

  // Ordre d'évaluation (priorité au plus spécifique)
  var ORDRE = ["nouvelan", "galette", "chinois", "mardigras", "chandeleur", "valentin", "patrick", "paques", "premiermai", "huitmai", "fetemeres", "musique", "feteperes", "fetenationale", "assomption", "beaujolais", "halloween", "toussaint", "noel"];

  // --- Détection de l'événement actif ------------------------------------
  function evenementActif() {
    // 1) Forçage via URL ?event=
    try {
      var p = new URLSearchParams(window.location.search).get("event");
      if (p === "off") return null;
      if (p && EVENEMENTS[p]) return p;
    } catch (e) {}
    // 2) Forçage mémorisé (preview)
    var f = lsGet(LS.force);
    if (f === "off") return null;
    if (f && EVENEMENTS[f]) return f;
    // 3) Détection automatique par date
    var now = new Date();
    for (var i = 0; i < ORDRE.length; i++) {
      var id = ORDRE[i];
      try { if (EVENEMENTS[id].estActif(now)) return id; } catch (e) {}
    }
    return null;
  }

  // --- Application du thème (déco + accent + theme-color) -----------------
  function injecterStyle() {
    if (document.getElementById("lc-event-style")) return;
    var st = document.createElement("style");
    st.id = "lc-event-style";
    st.textContent = [
      "#event-splash{position:fixed;inset:0;z-index:100050;background:radial-gradient(circle at 50% 30%,#241a12 0%,#0d0a0f 75%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:18px;opacity:0;transition:opacity .35s ease}",
      "#event-splash.visible{opacity:1}",
      "#event-splash .ev-board{position:relative;width:min(460px,92vw);max-height:88vh;aspect-ratio:1086/1448;border-radius:14px;overflow:hidden;box-shadow:0 18px 60px rgba(0,0,0,.6);container-type:inline-size}",
      "#event-splash .ev-board img{display:block;width:100%;height:100%;object-fit:cover}",
      "#event-splash .ev-menu{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.1cqw;overflow-y:auto;text-align:center;scrollbar-width:none}",
      "#event-splash .ev-menu::-webkit-scrollbar{display:none}",
      "#event-splash .ev-menu-item{font-family:Georgia,'Times New Roman',serif;color:var(--ev-menu-color,var(--ev-accent,#ff7518));font-weight:600;font-size:3.3cqw;line-height:1.25;cursor:pointer;text-shadow:var(--ev-menu-shadow,0 1px 3px rgba(0,0,0,.75))}",
      "#event-splash .ev-menu-item:active{opacity:.55}",
      ".lc-event-fab{position:fixed;right:16px;bottom:90px;width:54px;height:54px;border-radius:50%;border:none;background:var(--ev-accent,#ff7518);color:#fff;font-size:26px;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:9000;box-shadow:0 6px 20px rgba(0,0,0,.45)}",
      ".lc-event-fab:active{transform:scale(.92)}",
      "#event-splash .ev-fallback{display:flex;align-items:center;justify-content:center;min-height:60vh;background:#15121a;color:var(--ev-accent,#ff7518);font-weight:800;font-size:34px;text-align:center;letter-spacing:1px;padding:30px;border:2px solid var(--ev-accent,#ff7518)}",
      "#event-splash .ev-close{position:absolute;top:14px;right:14px;width:40px;height:40px;border-radius:50%;border:1.5px solid rgba(255,255,255,.5);background:rgba(0,0,0,.45);color:#fff;font-size:20px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2}",
      "#event-splash .ev-cta{margin-top:18px;background:var(--ev-accent,#ff7518);color:#fff;border:none;border-radius:50px;padding:14px 26px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.4)}",
      ".lc-event-decor{position:fixed;inset:0;pointer-events:none;z-index:40;overflow:hidden}",
      ".lc-event-decor span{position:absolute;top:-8%;font-size:22px;opacity:.45;animation:lcEvFall linear infinite}",
      "@keyframes lcEvFall{0%{transform:translateY(-10vh) rotate(0)}100%{transform:translateY(110vh) rotate(360deg)}}",
      "@media (prefers-reduced-motion: reduce){.lc-event-decor span{animation:none;opacity:.25}}",
      ".lc-event-bloc .lc-event-titre{color:var(--ev-accent,#ff7518)!important}",
      ".lc-event-card{flex:0 0 auto;width:128px;cursor:pointer;border-radius:14px;overflow:hidden;background:#15121a;border:1px solid rgba(255,255,255,.07)}",
      ".lc-event-card img{width:100%;height:96px;object-fit:cover;display:block;background:#241a22}",
      ".lc-event-card .lc-ec-nom{padding:8px 9px;font-size:12.5px;font-weight:600;color:#fff;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}"
    ].join("\n");
    document.head.appendChild(st);
  }

  function appliquerTheme(ev) {
    injecterStyle();
    document.documentElement.style.setProperty("--ev-accent", ev.accent);
    document.documentElement.style.setProperty("--ev-accent2", ev.accent2 || ev.accent);
    // Recolorage global de l'appli (les couleurs sont passées en var(--accent…))
    var root = document.documentElement;
    root.style.setProperty("--accent", ev.accent);
    root.style.setProperty("--accent-soft", ev.accentSoft || eclaircir(ev.accent, 0.22));
    root.style.setProperty("--accent-pale", ev.accentPale || eclaircir(ev.accent, 0.45));
    root.style.setProperty("--accent-light", ev.accentLight || eclaircir(ev.accent, 0.12));
    root.style.setProperty("--accent-rgb", hexRgb(ev.accent));
    root.style.setProperty("--ev-menu-color", ev.menuColor || ev.accent);
    root.style.setProperty("--ev-menu-shadow", ev.menuShadow || "0 1px 3px rgba(0,0,0,.75)");
    document.body.setAttribute("data-event", ev._id);
    // theme-color (barre système)
    try {
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) { meta.dataset.lcOrig = meta.dataset.lcOrig || meta.content; meta.content = ev.accent; }
    } catch (e) {}
    poserDecor(ev);
    injecterBlocAccueil(ev);
    poserFab(ev);
  }

  // --- Déco flottante -----------------------------------------------------
  var decorOn = true;
  function poserDecor(ev) {
    enleverDecor();
    if (!decorOn || !ev.emojis || !ev.emojis.length) return;
    var layer = document.createElement("div");
    layer.className = "lc-event-decor";
    layer.id = "lc-event-decor";
    var n = 10;
    for (var i = 0; i < n; i++) {
      var s = document.createElement("span");
      s.textContent = ev.emojis[i % ev.emojis.length];
      s.style.left = Math.round((i / n) * 100 + (Math.random() * 6 - 3)) + "%";
      s.style.animationDuration = (9 + Math.random() * 9).toFixed(1) + "s";
      s.style.animationDelay = (-Math.random() * 12).toFixed(1) + "s";
      s.style.fontSize = (16 + Math.random() * 16).toFixed(0) + "px";
      layer.appendChild(s);
    }
    document.body.appendChild(layer);
  }
  function enleverDecor() {
    var d = document.getElementById("lc-event-decor");
    if (d) d.remove();
  }
  window.lcEventDecor = function (on) {
    decorOn = !!on;
    var ev = currentEv;
    if (ev) { if (on) poserDecor(ev); else enleverDecor(); }
  };

  // Bouton flottant permanent pour ré-ouvrir l'ardoise-menu à tout moment
  function poserFab(ev) {
    var old = document.getElementById("lc-event-fab");
    if (old) old.remove();
    var b = document.createElement("button");
    b.id = "lc-event-fab";
    b.className = "lc-event-fab";
    b.setAttribute("aria-label", "Menu " + ev.nom);
    b.textContent = (ev.emojis && ev.emojis[0]) || "🎉";
    b.onclick = function () { window.lcRouvrirMenu(); };
    document.body.appendChild(b);
  }
  window.lcRouvrirMenu = function () {
    if (currentEv) montrerSplash(currentEv, true);
  };

  // --- Bloc "Menu de fête" sur l'accueil ----------------------------------
  function injecterBlocAccueil(ev) {
    var section = document.getElementById("section-accueil");
    if (!section) return;
    if (document.getElementById("lc-event-bloc")) return;
    var R = lcRecettes();
    var cles = (ev.recettes || []).filter(function (k) { return R[k]; });
    if (!cles.length) return;
    var cards = cles.map(function (k) {
      var r = R[k] || {};
      var nom = ((ev.menuNoms&&ev.menuNoms[k])||(typeof getNomRecette==="function"?getNomRecette(k):(r.nom||k))).replace(/"/g, "&quot;");
      var cat = (r.cat || "").replace(/'/g, "\\'");
      return '<div class="lc-event-card" onclick="lcEventOuvrir(\'' + k + "','" + cat + '\')">' +
        '<img loading="lazy" src="images/' + k + '.webp" alt="" onerror="this.style.visibility=\'hidden\'">' +
        '<div class="lc-ec-nom">' + nom + "</div></div>";
    }).join("");
    var html =
      '<div class="accueil-bloc lc-event-bloc" id="lc-event-bloc" style="display:block">' +
        '<h2 class="lc-event-titre" style="font-size:17px;margin:0 0 10px">' + ev.titre + "</h2>" +
        '<div class="accueil-scroll-row" style="display:flex;gap:10px;overflow-x:auto;padding-bottom:4px">' + cards + "</div>" +
      "</div>";
    section.insertAdjacentHTML("afterbegin", html);
  }
  window.lcEventOuvrir = function (cle, cat) {
    if (typeof ouvrirRecetteEtCategorie === "function") ouvrirRecetteEtCategorie(cle, cat);
    else if (typeof ouvrirFiche === "function" && lcRecettes()[cle]) ouvrirFiche(lcRecettes()[cle]);
  };

  // --- Splash plein écran -------------------------------------------------
  function clefVue(ev) {
    return LS.seenPrefix + ev._id + "_" + ymd(new Date());
  }
  function dejaVuAujourdhui(ev) { return lsGet(clefVue(ev)) === "1"; }

  function montrerSplash(ev, forcer) {
    if (document.getElementById("event-splash")) return;
    if (!forcer && dejaVuAujourdhui(ev)) return;
    injecterStyle();
    var ov = document.createElement("div");
    ov.id = "event-splash";
    var imgBlock = ev.image
      ? '<img src="' + ev.image + '" alt="' + ev.nom + '" onerror="this.closest(\'.ev-board\').innerHTML=\'<div class=&quot;ev-fallback&quot;>' + ev.titre.replace(/'/g, "") + '</div>\'">'
      : '<div class="ev-fallback">' + ev.titre + "</div>";
    // Menu "écrit" sur l'ardoise (chaque ligne ouvre la recette)
    var R = lcRecettes();
    var menuKeys = (ev.recettes || []).filter(function (k) { return R[k]; }).slice(0, 6);
    var menuHtml = "";
    if (ev.image && menuKeys.length) {
      var z = ev.menuZone || ZONE_DEFAUT;
      var items = menuKeys.map(function (k) {
        var r = R[k] || {};
        var nom = ((ev.menuNoms&&ev.menuNoms[k])||(typeof getNomRecette==="function"?getNomRecette(k):(r.nom||k))).replace(/"/g, "&quot;");
        var emo = r.emoji ? (r.emoji + " ") : "";
        var cat = (r.cat || "").replace(/'/g, "\\'");
        return '<div class="ev-menu-item" onclick="lcFermerEventSplash();lcEventOuvrir(\'' + k + "','" + cat + '\')">' + emo + nom + "</div>";
      }).join("");
      menuHtml = '<div class="ev-menu" style="top:' + z.top + ";bottom:" + z.bottom + ";left:" + z.left + ";right:" + z.right + '">' + items + "</div>";
    }
    ov.innerHTML =
      '<div class="ev-board">' +
        '<button class="ev-close" aria-label="Fermer" onclick="lcFermerEventSplash()">✕</button>' +
        imgBlock + menuHtml +
      "</div>" +
      '<button class="ev-cta" onclick="lcEventCTA()">' + (ev.cta || "Découvrir") + "</button>";
    document.body.appendChild(ov);
    requestAnimationFrame(function () { ov.classList.add("visible"); });
    lsSet(clefVue(ev), "1");
    // Intercepter le bouton retour Android (ferme le splash au lieu de quitter)
    if (typeof window._backGuardPush === "function") window._backGuardPush();
  }

  window.lcFermerEventSplash = function () {
    var el = document.getElementById("event-splash");
    if (!el) return;
    el.classList.remove("visible");
    setTimeout(function () { if (el && el.parentNode) el.remove(); }, 300);
  };
  window.lcEventCTA = function () {
    window.lcFermerEventSplash();
    try { if (typeof afficherAccueil === "function") afficherAccueil(); } catch (e) {}
  };

  // Enregistrer le splash dans le système de retour Android (comme les autres modals)
  try {
    if (typeof _MODALS_SURVEILLEES !== "undefined" && Array.isArray(_MODALS_SURVEILLEES)) {
      _MODALS_SURVEILLEES.push({
        id: "event-splash",
        close: function () { if (typeof lcFermerEventSplash === "function") lcFermerEventSplash(); }
      });
    }
  } catch (e) {}

  // --- Forçage manuel (preview) ------------------------------------------
  window.lcForcerEvenement = function (id) {
    if (id === null || id === undefined) { lsSet(LS.force, "off"); }
    else if (id === "auto") { lsDel(LS.force); }
    else if (EVENEMENTS[id]) { lsSet(LS.force, id); }
    else { console.warn("Événement inconnu :", id, "—", Object.keys(EVENEMENTS).join(", ")); return; }
    location.reload();
  };
  window.lcEvenementsDispo = function () { return Object.keys(EVENEMENTS); };

  // --- Démarrage ----------------------------------------------------------
  var currentEv = null;
  function demarrer() {
    var id = evenementActif();
    if (!id) return;
    var ev = EVENEMENTS[id];
    ev._id = id;
    currentEv = ev;
    appliquerTheme(ev);
    // Laisser l'écran de chargement disparaître, puis montrer le splash de fête
    var forcer = false;
    try {
      var p = new URLSearchParams(window.location.search).get("event");
      forcer = (p && EVENEMENTS[p]) || lsGet(LS.force) === id;
    } catch (e) {}
    setTimeout(function () {
      // ne pas empiler par-dessus l'onboarding éventuel
      var onb = document.getElementById("modal-onboarding");
      var onbVisible = onb && (onb.style.display === "flex" || onb.style.display === "block" || onb.classList.contains("visible"));
      if (onbVisible) return;
      montrerSplash(ev, forcer);
    }, 700);
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", demarrer);
  } else {
    demarrer();
  }
})();
