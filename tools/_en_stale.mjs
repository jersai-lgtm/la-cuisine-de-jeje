// Détecte (et avec --clean, retire) les entrées EN périmées de js/recettes_en.js,
// pour que `node tools/traduire_batch.mjs` les re-traduise (mode incrémental).
// Périmé = pas d'entrée EN, ou pas d'étapes EN, ou nb d'étapes EN ≠ nb d'étapes FR.
// Report : node tools/_en_stale.mjs      |  Nettoyage : node tools/_en_stale.mjs --clean
import fs from "node:fs";
import vm from "node:vm";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "js", "recettes_en.js");
const CLEAN = process.argv.includes("--clean");

function charger(filtreNom, prop) {
  const ctx = { recettes: {}, JSON, Object, Array, Math, console: { log() {} } };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of fs.readdirSync(join(ROOT, "js")).filter(filtreNom)) {
    try { vm.runInContext(fs.readFileSync(join(ROOT, "js", f), "utf8"), ctx); } catch (e) {}
  }
  return prop === "recettes" ? ctx.recettes : (ctx.RECETTES_EN || {});
}

const FR = charger((f) => /^recettes(_|\.)/.test(f) && f !== "recettes_en.js" && f !== "recettes_batch.js", "recettes");
const EN = charger((f) => f === "recettes_en.js", "RECETTES_EN");

const stale = [];
for (const [k, r] of Object.entries(FR)) {
  if (!r || !Array.isArray(r.etapes)) continue;
  const e = EN[k];
  if (!e || !Array.isArray(e.etapes) || e.etapes.length !== r.etapes.length) stale.push(k);
}

console.log("FR : " + Object.keys(FR).length + " | EN : " + Object.keys(EN).length + " | périmées : " + stale.length);
if (CLEAN) {
  for (const k of stale) delete EN[k];
  const corps =
    "// Généré par tools/traduire_batch.mjs — NE PAS éditer à la main.\n" +
    "// Traductions EN des recettes : { cle: { nom, description, etapes:[{titre,detail}] } }\n" +
    "window.RECETTES_EN = " + JSON.stringify(EN, null, 1) + ";\n";
  fs.writeFileSync(OUT, corps);
  console.log("🧹 " + stale.length + " entrées EN périmées retirées → relance `node tools/traduire_batch.mjs` pour les (re)traduire.");
} else {
  console.log("Échantillon : " + stale.slice(0, 25).join(", "));
  console.log("(lance avec --clean pour les retirer et préparer la re-traduction)");
}
