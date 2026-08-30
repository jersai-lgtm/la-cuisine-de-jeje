// =============================================================================
// 🔢 maj-compteur-recettes.mjs — remet à jour le nombre de recettes AFFICHÉ
// -----------------------------------------------------------------------------
// Le catalogue grossit à chaque lot, mais le chiffre annoncé à l'utilisateur est
// écrit en dur à sept endroits : écran d'accueil, aide FR et EN, métadonnées SEO,
// JSON-LD et prompt de l'assistant vocal. Il annonçait encore « 2000 recettes »
// alors que le catalogue en comptait 3325 — c'est la première phrase que lit un
// nouvel utilisateur.
//
// On arrondit à la CENTAINE INFÉRIEURE : le chiffre reste vrai jusqu'au lot
// suivant, et « plus de 3300 » se lit mieux que « plus de 3325 ».
//
//   node tools/maj-compteur-recettes.mjs        applique
//   DRY=1 node tools/maj-compteur-recettes.mjs  simule
// =============================================================================
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DRY = process.env.DRY === "1";

const ctx = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of readdirSync(join(ROOT, "js")).filter((f) => /^recettes(_|\.)/.test(f))) {
  try { vm.runInContext(readFileSync(join(ROOT, "js", f), "utf8"), ctx); } catch { /* pas un fichier de données */ }
}
const total = Object.keys(ctx.recettes).length;
const arrondi = Math.floor(total / 100) * 100;

// Chaque motif capture le nombre déjà écrit pour pouvoir le remplacer sur place.
const MOTIFS = [
  [/Plus de \d[\d  ]*\+? recettes/g, `Plus de ${arrondi} recettes`],
  [/Over \d[\d  ]*\+? recipes/g,     `Over ${arrondi} recipes`],
  [/\b\d[\d  ]*\+ recettes/g,        `${arrondi}+ recettes`],
  [/\b\d[\d  ]*\+ recipes/g,         `${arrondi}+ recipes`],
  [/~\d[\d  ]* recettes/g,           `~${arrondi} recettes`],
];

const FICHIERS = [
  "index.html",
  "js/onboarding.js",
  "js/app_aide.js",
  "js/i18n_aide.js",
  "js/i18n_dict.js",
  "js/assistant_vocal.js",
];

console.log(`Catalogue : ${total} recettes → on annonce « ${arrondi} »\n`);
let totalRemplacements = 0;

for (const rel of FICHIERS) {
  const chemin = join(ROOT, rel);
  let src;
  try { src = readFileSync(chemin, "utf8"); } catch { console.log(`  ⚠️  ${rel} introuvable`); continue; }
  let n = 0;
  for (const [re, remplacement] of MOTIFS) {
    src = src.replace(re, (trouve) => {
      if (trouve === remplacement) return trouve;   // déjà à jour
      n++;
      return remplacement;
    });
  }
  if (!n) continue;
  totalRemplacements += n;
  if (!DRY) writeFileSync(chemin, src, "utf8");
  console.log(`  ${DRY ? "[simulation]" : "✅"} ${rel.padEnd(24)} ${n} occurrence(s)`);
}

console.log(`\n${totalRemplacements} compteur(s) mis à jour${DRY ? "  (simulation)" : ""}.`);
