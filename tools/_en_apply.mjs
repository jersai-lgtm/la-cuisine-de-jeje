// Fusionne les traductions EN (tools/_ent_*.json) dans js/recettes_en.js.
// Réécrit le fichier au format standard (comme traduire_batch.mjs). Lancer APRÈS le workflow.
import fs from "node:fs";
import vm from "node:vm";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(ROOT, "js", "recettes_en.js");

function charger(filtre, prop) {
  const ctx = { recettes: {}, JSON, Object, Array, Math, console: { log() {} } };
  ctx.window = ctx; vm.createContext(ctx);
  for (const f of fs.readdirSync(join(ROOT, "js")).filter(filtre)) {
    try { vm.runInContext(fs.readFileSync(join(ROOT, "js", f), "utf8"), ctx); } catch (e) {}
  }
  return prop === "recettes" ? ctx.recettes : (ctx.RECETTES_EN || {});
}

const FR = charger((f) => /^recettes(_|\.)/.test(f) && f !== "recettes_en.js" && f !== "recettes_batch.js", "recettes");
const EN = charger((f) => f === "recettes_en.js", "RECETTES_EN");

// 1) Charger les traductions produites
const files = fs.readdirSync(join(ROOT, "tools")).filter((f) => /^_ent_\d+\.json$/.test(f));
let appliquees = 0, ignores = 0, parseErr = [];
for (const f of files) {
  let arr;
  try { arr = JSON.parse(fs.readFileSync(join(ROOT, "tools", f), "utf8")); }
  catch (e) { parseErr.push(f); continue; }
  for (const e of arr) {
    if (!e || !e.key || !FR[e.key]) { ignores++; continue; }
    if (typeof e.nom !== "string" || !Array.isArray(e.etapes)) { ignores++; continue; }
    // sécurité : nb d'étapes EN doit matcher le FR (sinon on ne touche pas)
    if (e.etapes.length !== FR[e.key].etapes.length) { ignores++; continue; }
    EN[e.key] = {
      nom: e.nom,
      description: typeof e.description === "string" ? e.description : "",
      etapes: e.etapes.map((s) => ({ titre: s.titre || "", detail: s.detail || "" })),
    };
    appliquees++;
  }
}

// 2) Réécrire recettes_en.js (format standard)
const corps =
  "// Généré par tools/traduire_batch.mjs — NE PAS éditer à la main.\n" +
  "// Traductions EN des recettes : { cle: { nom, description, etapes:[{titre,detail}] } }\n" +
  "window.RECETTES_EN = " + JSON.stringify(EN, null, 1) + ";\n";
fs.writeFileSync(OUT, corps);

console.log("Fichiers _ent : " + files.length + " | traductions appliquées : " + appliquees + " | ignorées : " + ignores + " | erreurs parse : " + parseErr.length);
if (parseErr.length) console.log("  parse KO : " + parseErr.join(", "));
