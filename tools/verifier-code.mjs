// =============================================================================
// verifier-code.mjs — le garde-fou des pièges de CODE
// -----------------------------------------------------------------------------
// `verifier-donnees.mjs` protège les recettes. Celui-ci protège le code, et il
// n'encode QUE des pièges dans lesquels on est réellement tombé : chaque règle
// cite l'incident qui l'a motivée, pour qu'on sache pourquoi elle existe et
// qu'on ne la retire pas à la légère.
//
//   node tools/verifier-code.mjs           → rapport + code de sortie
//   node tools/verifier-code.mjs --tout    → montre aussi ce qui passe
//
// Sortie 1 s'il reste un BLOQUANT. Les avertissements n'arrêtent pas la CI.
//
// LEVER UNE RÈGLE, quand le cas est légitime : poser le marqueur dans les 8
// lignes au-dessus, AVEC sa raison (au moins 12 caractères, sinon refusé) :
//   // verifier-code: ignore boite-demi-ecran — flèche de 20 px, la largeur ne sert à rien
// L'exemption est ainsi prise consciemment, et justifiée là où elle s'applique.
// =============================================================================
import { readFileSync, readdirSync } from "node:fs";

const RAC = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const TOUT = process.argv.includes("--tout");
const bloquants = [];
const avertissements = [];
const ok = [];

function exempte(src, ligne, regle) {
  const lignes = src.split("\n");
  for (let i = Math.max(0, ligne - 9); i < Math.min(lignes.length, ligne + 1); i++) {
    const m = lignes[i].match(/verifier-code:\s*ignore\s+([a-z-]+)\s*[-–—]\s*(.+)/);
    if (m && m[1] === regle && m[2].trim().length >= 12) return true;
  }
  return false;
}

function signaler(liste, regle, fichier, ligne, quoi, pourquoi, src) {
  if (src && exempte(src, ligne, regle)) { ok.push(fichier + ":" + ligne + " — exempté de « " + regle + " »"); return; }
  liste.push({ regle, fichier, ligne, quoi, pourquoi });
}

const lire = (p) => { try { return readFileSync(RAC + "/" + p, "utf8"); } catch (e) { return null; } };
const ligneDe = (src, index) => src.slice(0, index).split("\n").length;
const FICHIERS_JS = readdirSync(RAC + "/js").filter((n) => n.endsWith(".js"));

// =============================================================================
// 1. RÈGLE CSS MORTE  (bloquant)
// -----------------------------------------------------------------------------
// Incident 02/10/2026 : style.css posait
//   @media (max-width:480px) { .carte { contain-intrinsic-size: auto 220px } }
// ligne 250, et reposait la MÊME propriété sur le MÊME sélecteur ligne 327,
// hors media query. À spécificité égale c'est l'ordre qui tranche : la règle
// mobile n'a jamais servi. On l'a crue active pendant des mois, et le
// navigateur estimait les cartes à 232 px au lieu de 248.
// =============================================================================
function decouperCSS(src) {
  const regles = [];
  let i = 0, media = null;
  while (i < src.length) {
    const ouvre = src.indexOf("{", i);
    if (ouvre === -1) break;
    const entete = src.slice(i, ouvre).split(/[;}]/).pop().trim().replace(/\s+/g, " ");
    if (entete.startsWith("@media")) { media = entete; i = ouvre + 1; continue; }
    if (entete.startsWith("@")) {           // keyframes, supports… : on saute le bloc
      let p = 1, j = ouvre + 1;
      while (j < src.length && p > 0) { if (src[j] === "{") p++; else if (src[j] === "}") p--; j++; }
      i = j; continue;
    }
    const ferme = src.indexOf("}", ouvre);
    if (ferme === -1) break;
    const corps = src.slice(ouvre + 1, ferme);
    for (const sel of entete.split(",").map((s) => s.trim()).filter(Boolean)) {
      for (const d of corps.split(";")) {
        const [prop, ...reste] = d.split(":");
        if (!reste.length) continue;
        const p2 = prop.trim();
        if (!p2 || p2.startsWith("/*") || p2.startsWith("--")) continue;
        regles.push({ sel, prop: p2, media, ligne: ligneDe(src, ouvre), ordre: regles.length });
      }
    }
    i = ferme + 1;
    if (media !== null) {
      const suite = src.slice(i).match(/^\s*\}/);
      if (suite) { media = null; i += suite[0].length; }
    }
  }
  return regles;
}

function regleCSSMorte() {
  const src = lire("style.css");
  if (src === null) return;
  const regles = decouperCSS(src);
  const base = new Map();
  for (const r of regles) if (!r.media) base.set(r.sel + "|" + r.prop, r);
  for (const r of regles) {
    if (!r.media) continue;
    const b = base.get(r.sel + "|" + r.prop);
    if (b && b.ordre > r.ordre) {
      signaler(bloquants, "css-morte", "style.css", r.ligne,
        `${r.sel} { ${r.prop} } sous « ${r.media} » est écrasée par la même règle ligne ${b.ligne}`,
        "même sélecteur, même spécificité : c'est l'ORDRE qui tranche, et la règle de base est plus bas. " +
        "Déplacer l'override APRÈS la règle de base.", src);
    }
  }
}

// =============================================================================
// 2. BOÎTE FLOTTANTE LARGE D'UNE DEMI-PAGE  (bloquant)
// -----------------------------------------------------------------------------
// Incident 02/10/2026 : #pwa-install-banner se rendait sur 215 px au lieu de
// 366, texte sur 8 lignes, 168 px de haut pour une phrase. Avec position:fixed
// + left:50% et PAS de `right`, la largeur « shrink-to-fit » se calcule sur
// l'espace restant à DROITE du point d'ancrage, soit la moitié de l'écran.
// max-width ne fait que plafonner, et translateX(-50%) ne recentre qu'après :
// il ne corrige rien. Motif correct, celui de #note-play-banner :
//   box-sizing:border-box; width:calc(100vw - 24px); max-width:520px
// =============================================================================
function regleBoitesFlottantes() {
  const sources = [["style.css", lire("style.css")]];
  for (const f of FICHIERS_JS) sources.push(["js/" + f, lire("js/" + f)]);

  for (const [nom, src] of sources) {
    if (src === null) continue;
    for (const m of src.matchAll(/\{([^{}]*position\s*:\s*fixed[^{}]*)\}/g)) {
      const corps = m[1];
      if (!/left\s*:\s*50%/.test(corps)) continue;
      if (/right\s*:/.test(corps)) continue;            // ancré des deux côtés
      if (/(^|[;\s])width\s*:/.test(corps)) continue;   // largeur explicite
      const entete = (src.slice(Math.max(0, m.index - 200), m.index).split(/[;}]/).pop() || "")
        .replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim().slice(-60);
      signaler(bloquants, "boite-demi-ecran", nom, ligneDe(src, m.index),
        `${entete || "(règle)"} : position:fixed + left:50%, sans right ni width`,
        "la largeur se calcule alors sur la MOITIÉ de l'écran. Motif qui marche : " +
        "box-sizing:border-box; width:calc(100vw - 24px); max-width:520px.", src);
    }
    for (const m of src.matchAll(/\{([^{}]*max-width\s*:\s*\d+vw[^{}]*)\}/g)) {
      const corps = m[1];
      if (!/padding\s*:/.test(corps) || /box-sizing\s*:\s*border-box/.test(corps)) continue;
      const entete = (src.slice(Math.max(0, m.index - 200), m.index).split(/[;}]/).pop() || "")
        .replace(/\s+/g, " ").trim().slice(-60);
      signaler(avertissements, "vw-sans-border-box", nom, ligneDe(src, m.index),
        `${entete || "(règle)"} : max-width en vw + padding, sans box-sizing:border-box`,
        "le padding s'ajoute au plafond : la boîte déborde de ce qu'on croyait avoir limité.", src);
    }
  }
}

// =============================================================================
// 3. UNE SOLLICITATION QUI NE DEMANDE PAS SON TOUR  (bloquant)
// -----------------------------------------------------------------------------
// Incident 02/10/2026 : quatre bannières se posaient par-dessus l'accueil
// guidé. Chacune vérifiait les AUTRES bannières, aucune ne vérifiait le tour.
// La politique vit maintenant dans js/onboarding.js :
//   window.delaiAvantSollicitation()  → ms à attendre, 0 = voie libre
// Ne concerne que les bannières qui S'INVITENT (minuterie, événement du
// navigateur) ; celles ouvertes par un clic de l'utilisateur s'exemptent.
// =============================================================================
function regleSollicitations() {
  for (const f of FICHIERS_JS) {
    if (f === "onboarding.js") continue;
    const src = lire("js/" + f);
    if (src === null) continue;
    const ids = [...src.matchAll(/\.id\s*=\s*["'`]([a-z0-9-]*banner[a-z0-9-]*)["'`]/gi)].map((m) => m[1]);
    if (!ids.length) continue;
    if (src.includes("delaiAvantSollicitation")) { ok.push(`js/${f} consulte delaiAvantSollicitation()`); continue; }
    const i = src.search(/\.id\s*=\s*["'`][a-z0-9-]*banner/i);
    signaler(bloquants, "banniere-sans-politesse", "js/" + f, ligneDe(src, i),
      `crée « ${[...new Set(ids)].join(", ")} » sans consulter delaiAvantSollicitation()`,
      "risque de se poser par-dessus l'accueil guidé. En tête de la fonction d'affichage : " +
      "const _att = window.delaiAvantSollicitation ? window.delaiAvantSollicitation() : 0; " +
      "if (_att) { setTimeout(afficher, _att); return; }", src);
  }
}

// =============================================================================
// 4. GARDE ANTI-RÉÉCRITURE QUI OUBLIE LA LANGUE  (bloquant)
// -----------------------------------------------------------------------------
// Incident 02/10/2026 : l'état vide de la grille ne se réécrit que si sa clé de
// contexte change. La clé ignorait la langue : après FR → EN → FR, le texte
// restait dans l'ancienne langue, alors même que `langChanged` était écouté.
// On ne signale QUE les gardes qui entourent une réécriture de texte visible —
// une comparaison de dataset pour retrouver un élément n'a rien à voir.
// =============================================================================
function regleCleLangue() {
  for (const f of FICHIERS_JS) {
    const src = lire("js/" + f);
    if (src === null) continue;
    for (const m of src.matchAll(/dataset\.(\w+)\s*(!==|===)\s*([\w.]+)/g)) {
      const bloc = src.slice(m.index, m.index + 320);
      const reecrit = /\.(innerHTML|textContent)\s*=/.test(bloc);
      if (!reecrit) continue;
      const cle = src.slice(Math.max(0, m.index - 320), m.index + 320);
      if (/LANG/.test(cle)) { ok.push(`js/${f}:${ligneDe(src, m.index)} garde avec la langue`); continue; }
      signaler(bloquants, "cle-sans-langue", "js/" + f, ligneDe(src, m.index),
        `la garde « dataset.${m[1]} ${m[2]} ${m[3]} » protège une réécriture de texte, sans la langue dans la clé`,
        "l'appli est bilingue : si la clé ne change pas avec la langue, le texte reste figé " +
        "dans l'ancienne langue. Suffixer la clé par window.LANG.", src);
    }
  }
}

// =============================================================================
// 5. CHAÎNE AFFICHÉE SANS TRADUCTION  (bloquant)
// -----------------------------------------------------------------------------
// Incident 02/10/2026 : plusieurs vues (avis, communauté, collections, ajout au
// menu, partage) affichaient du français en mode anglais. La première version
// de cette règle cherchait `window.LANG` dans le fichier — à côté de la plaque :
// l'appli traduit par un DICTIONNAIRE central + un observateur de mutations
// (js/i18n.js), donc un fichier sans window.LANG peut être parfaitement traduit.
// Ce qui compte vraiment : toute chaîne affichée doit avoir son entrée exacte
// dans le dictionnaire. C'est ça qu'on mesure ici.
//
// ⚠️ Les boîtes natives (alert / confirm / prompt) ne passent PAS par
// l'observateur : celles-là demandent une branche de langue dans le code.
// =============================================================================
function dictionnaire() {
  const g = {};
  const sauve = globalThis.window;
  globalThis.window = globalThis;
  for (const f of ["i18n_dict.js", "i18n_ingredients.js", "i18n_noms.js", "i18n_aide.js"]) {
    const src = lire("js/" + f);
    if (src === null) continue;
    try { (0, eval)(src); } catch (e) {}
  }
  Object.assign(g, globalThis.I18N_DICT || {}, globalThis.I18N_ING || {},
                   globalThis.I18N_NOMS || {}, globalThis.I18N_AIDE || {});
  // le petit lot de secours vit en dur dans i18n.js
  const moteur = lire("js/i18n.js") || "";
  const seed = moteur.slice(moteur.indexOf("const SEED = {"), moteur.indexOf("};", moteur.indexOf("const SEED = {")));
  for (const m of seed.matchAll(/"((?:[^"\\]|\\.)+)"\s*:\s*"/g)) g[m[1].replace(/\\"/g, '"')] = 1;
  globalThis.window = sauve;
  return g;
}

// Le CLIQUET : ces fichiers ont été passés en revue et sont à zéro. Toute
// nouvelle chaîne française non traduite y est BLOQUANTE — c'est ce qui empêche
// la régression. Pour le reste de l'appli, on se contente de compter : 364
// chaînes attendent encore leur traduction, les bloquer arrêterait tout.
// Quand un fichier est mis à jour, l'ajouter ici.
const FICHIERS_A_JOUR = [
  "agenda.js", "amelioration.js", "app_avis.js", "community.js",
  "favoris_collections.js", "menu_ajout.js", "onboarding.js",
  "partage_courses.js", "partage_menu.js", "whatsnew.js",
];
const resteATraduire = [];

const ACCENT_FR = /[àâäçéèêëîïôöùûüœæ]/i;
const MOTS_FR = /\b(le|la|les|un|une|des|du|de|et|ou|tu|ton|ta|tes|ne|pas|pour|avec|sans|dans|sur|est|sont|plus|tout|tous|que|qui|aux|cette|mes|mon|ma|par|en|son|sa|aucun|aucune|quel|quelle)\b/i;

function regleTraductions() {
  const DICT = dictionnaire();
  if (!Object.keys(DICT).length) return;             // dictionnaire illisible : on se tait
  const CH = "(?:[^'\\\\]|\\\\.)";
  const CH2 = '(?:[^"\\\\]|\\\\.)';
  for (const f of FICHIERS_JS) {
    if (/^recettes|^i18n/.test(f)) continue;
    const src = lire("js/" + f);
    if (src === null) continue;
    const vus = new Set();
    const surveille = FICHIERS_A_JOUR.includes(f);
    const pousser = (brut, index) => {
      const t = String(brut).replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\s+/g, " ").trim();
      if (t.length < 3 || t.length > 120) return;
      if (/[<>{}]|\$\{|=>|escHTML|_echap|\|\|/.test(t)) return;
      if (/\\$/.test(t)) return;
      if (!(ACCENT_FR.test(t) || MOTS_FR.test(t)) || !/[a-zà-ÿ]{3}/i.test(t)) return;
      if (DICT[t] || vus.has(t)) return;
      vus.add(t);
      if (!surveille) { resteATraduire.push("js/" + f + ":" + ligneDe(src, index) + "  « " + t + " »"); return; }
      signaler(bloquants, "chaine-sans-traduction", "js/" + f, ligneDe(src, index),
        "« " + t + " » n'est pas dans le dictionnaire",
        "l'appli est bilingue et traduit par correspondance EXACTE : cette chaîne restera en " +
        "français. Ajouter l'entrée dans js/i18n_dict.js.", src);
    };
    for (const m of src.matchAll(/>([^<>{}`$]{3,120})</g)) pousser(m[1], m.index);
    // attribut en guillemets doubles : l'apostrophe fait partie du texte
    for (const m of src.matchAll(/(?:placeholder|title|aria-label)\s*=\s*"([^"<>{}]{3,120})"/g)) pousser(m[1], m.index);
    // attribut en guillemets simples
    for (const m of src.matchAll(/(?:placeholder|title|aria-label)\s*=\s*'([^'<>{}]{3,120})'/g)) pousser(m[1], m.index);
    for (const m of src.matchAll(new RegExp("\\.(?:textContent|innerText)\\s*=\\s*'(" + CH + "{3,120})'", "g"))) pousser(m[1], m.index);
    for (const m of src.matchAll(new RegExp('\\.(?:textContent|innerText)\\s*=\\s*"(' + CH2 + '{3,120})"', "g"))) pousser(m[1], m.index);
  }
}

// =============================================================================
// 6. BACKTICK DANS UN COMMENTAIRE CSS-EN-JS  (avertissement)
// -----------------------------------------------------------------------------
// Incident ×2, le dernier le 02/10/2026 : en écrivant un commentaire qui
// documentait un correctif, j'ai entouré « max-width:92vw » de backticks par
// réflexe Markdown. Le backtick a refermé le template literal et cassé trois
// fichiers d'un coup. Le cas fatal est déjà attrapé par `node --check` en CI ;
// ceci n'est qu'un rappel, limité aux fichiers qui embarquent du CSS.
// =============================================================================
function regleBackticks() {
  for (const f of FICHIERS_JS) {
    const src = lire("js/" + f);
    if (src === null) continue;
    if (!/textContent\s*=\s*`|innerHTML\s*=\s*`/.test(src)) continue;
    for (const m of src.matchAll(/\/\*[\s\S]*?\*\//g)) {
      if (!m[0].includes("`")) continue;
      signaler(avertissements, "backtick-dans-commentaire", "js/" + f, ligneDe(src, m.index),
        "commentaire /* */ contenant un backtick, dans un fichier qui embarque du CSS",
        "s'il tombe un jour à l'intérieur d'un template literal, il referme la chaîne et casse le fichier. " +
        "Guillemets français « » ou rien.", src);
    }
  }
}

// =============================================================================
regleCSSMorte();
regleBoitesFlottantes();
regleSollicitations();
regleCleLangue();
regleTraductions();
regleBackticks();

const afficher = (titre, liste, marque) => {
  if (!liste.length) return;
  console.log("\n" + marque + "  " + titre + " (" + liste.length + ")");
  for (const d of liste) {
    console.log("   " + d.fichier + ":" + d.ligne + "   [" + d.regle + "]");
    console.log("      " + d.quoi);
    console.log("      → " + d.pourquoi);
  }
};

console.log("🔎 Pièges de code — " + FICHIERS_JS.length + " fichiers js + style.css");
afficher("BLOQUANT", bloquants, "❌");
afficher("À REGARDER", avertissements, "⚠️");
if (resteATraduire.length) {
  console.log("\nℹ️  " + resteATraduire.length + " chaîne(s) sans traduction hors périmètre surveillé " +
    "(chantier de fond, non bloquant). « --tout » pour la liste.");
  if (TOUT) for (const r of resteATraduire) console.log("   " + r);
}
if (TOUT && ok.length) { console.log("\n✅ Conformes (" + ok.length + ")"); for (const o of ok) console.log("   " + o); }
if (!bloquants.length && !avertissements.length) console.log("\n✅ Aucun piège connu détecté.");
else console.log("\n" + bloquants.length + " bloquant(s), " + avertissements.length + " avertissement(s).");
process.exit(bloquants.length ? 1 : 0);
