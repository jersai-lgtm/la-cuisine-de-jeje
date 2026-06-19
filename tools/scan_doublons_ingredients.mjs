// Scan : détecte dans chaque recette les clés d'ingrédients DISTINCTES qui
// s'affichent avec le MÊME libellé (doublons visuels sur la fiche).
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const JS = join(ROOT, "js");

function sandbox() { const c = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } }; c.window = c; vm.createContext(c); return c; }

// 1) Catalogue complet
const ctx = sandbox();
for (const f of readdirSync(JS).filter((f) => /^recettes(_|\.)/.test(f))) {
  try { vm.runInContext(readFileSync(join(JS, f), "utf8"), ctx); } catch (e) { console.log("skip", f, e.message); }
}
const R = ctx.recettes;

// 2) Libellés (const → on l'expose en fin de script)
const lctx = sandbox();
vm.runInContext(readFileSync(join(JS, "ingredients_prix.js"), "utf8") + "\nthis.__L = (typeof INGREDIENTS_LABELS!=='undefined')?INGREDIENTS_LABELS:{};", lctx);
const LABELS = lctx.__L || {};

const norm = (lbl) => (lbl || "").replace(/^\p{Emoji_Presentation}\s*/u, "").replace(/^[^\p{L}]+/u, "").trim().toLowerCase();

let nbProb = 0;
for (const k of Object.keys(R)) {
  const r = R[k];
  const keys = new Set();
  if (r.ingredients && typeof r.ingredients === "object") Object.keys(r.ingredients).forEach((x) => keys.add(x));
  for (const prop of Object.keys(r)) {
    if (/^tableau/i.test(prop) && Array.isArray(r[prop])) {
      for (const row of r[prop]) for (const col of Object.keys(row)) if (col !== "nb") keys.add(col);
    }
  }
  // regroupe par libellé affiché
  const parLabel = {};
  for (const key of keys) {
    const lbl = LABELS[key];
    if (!lbl) continue; // pas de libellé connu (ingrédient libre) → ignore
    const n = norm(lbl);
    (parLabel[n] = parLabel[n] || []).push(key + " → " + lbl);
  }
  for (const n of Object.keys(parLabel)) {
    if (parLabel[n].length > 1) {
      nbProb++;
      console.log(`\n⚠️  ${k} (${r.nom}) : ${parLabel[n].length} clés affichent « ${n} »`);
      parLabel[n].forEach((s) => console.log("      " + s));
    }
  }
}
console.log(`\n${nbProb ? "⚠️ " + nbProb + " doublon(s) visuel(s) trouvé(s)." : "✅ Aucun doublon visuel d'ingrédient."}`);
