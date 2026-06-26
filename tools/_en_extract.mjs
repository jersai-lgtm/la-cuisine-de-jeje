// Extrait le contenu FR des recettes dont l'EN est périmé -> tools/_en_cibles.json
// (pour la re-traduction par workflow). Périmé = EN absent / sans étapes / nb étapes ≠ FR.
import fs from "node:fs";
import vm from "node:vm";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
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

const cibles = [];
for (const [k, r] of Object.entries(FR)) {
  if (!r || !Array.isArray(r.etapes)) continue;
  const e = EN[k];
  if (e && Array.isArray(e.etapes) && e.etapes.length === r.etapes.length) continue; // EN à jour
  cibles.push({
    key: k,
    nom: r.nom || "",
    description: r.description || "",
    etapes: r.etapes.map((s) => ({ titre: s.titre || "", detail: s.detail || "" })),
  });
}
fs.writeFileSync(join(ROOT, "tools", "_en_cibles.json"), JSON.stringify(cibles));
console.log("✅ Cibles EN à traduire : " + cibles.length + " -> tools/_en_cibles.json");
