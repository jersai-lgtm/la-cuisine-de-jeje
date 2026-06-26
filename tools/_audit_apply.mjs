// Réintègre les étapes enrichies (tools/_enr_*.json) dans js/recettes_<cat>.js.
// Remplace, pour chaque clé, le tableau `etapes: [...]` de SA recette (bracket-matching
// conscient des chaînes). Lancer APRÈS le workflow : node tools/_audit_apply.mjs
import fs from "fs";

// 1) Charger tous les enrichissements valides
const enrFiles = fs.readdirSync("tools").filter(f => /^_enr_\d+\.json$/.test(f));
const map = new Map();
const parseErr = [];
for (const f of enrFiles) {
  try {
    const arr = JSON.parse(fs.readFileSync("tools/" + f, "utf8"));
    for (const e of arr) {
      if (e && e.key && Array.isArray(e.etapes) && e.etapes.length >= 6 && e.etapes.length <= 9) {
        map.set(e.key, e.etapes);
      }
    }
  } catch (err) { parseErr.push(f + ": " + err.message.slice(0, 60)); }
}
console.log("Fichiers _enr_*.json : " + enrFiles.length + " | enrichissements valides : " + map.size + " | erreurs parse : " + parseErr.length);
if (parseErr.length) console.log("  " + parseErr.join(" / "));

// 2) Formatage du nouveau tableau etapes (style fichier)
const esc = (s) => JSON.stringify(String(s == null ? "" : s));
const fmt = (etapes) => "[\n" + etapes.map(e =>
  `      { icone: ${esc(e.icone || "•")}, titre: ${esc(e.titre || "")}, detail: ${esc(e.detail || "")}, badge: null }`
).join(",\n") + "\n    ]";

// 3) Remplacement par clé dans chaque fichier recettes
const recFiles = fs.readdirSync("js").filter(f => /^recettes_/.test(f) && f.endsWith(".js") && f !== "recettes_en.js" && f !== "recettes_batch.js");
const appliedKeys = new Set();

for (const f of recFiles) {
  let src = fs.readFileSync("js/" + f, "utf8");
  let changed = false;
  for (const [key, etapes] of map) {
    if (appliedKeys.has(key)) continue;
    const re = new RegExp('\\n  "?' + key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '"?:\\s*\\{');
    const m = re.exec(src);
    if (!m) continue;
    const eIdx = src.indexOf("etapes:", m.index);
    if (eIdx < 0) continue;
    const bracket = src.indexOf("[", eIdx);
    if (bracket < 0) continue;
    // bracket-matching conscient des chaînes "..."
    let depth = 0, end = -1, inStr = false, escp = false;
    for (let i = bracket; i < src.length; i++) {
      const c = src[i];
      if (inStr) { if (escp) escp = false; else if (c === "\\") escp = true; else if (c === '"') inStr = false; continue; }
      if (c === '"') { inStr = true; continue; }
      if (c === "[") depth++;
      else if (c === "]") { depth--; if (depth === 0) { end = i; break; } }
    }
    if (end < 0) continue;
    src = src.slice(0, bracket) + fmt(etapes) + src.slice(end + 1);
    appliedKeys.add(key);
    changed = true;
  }
  if (changed) fs.writeFileSync("js/" + f, src);
}

const manquantes = [...map.keys()].filter(k => !appliedKeys.has(k));
console.log("✅ Étapes appliquées : " + appliedKeys.size + " / " + map.size);
if (manquantes.length) console.log("⚠️ Clés non trouvées dans les fichiers (" + manquantes.length + ") : " + manquantes.slice(0, 30).join(", "));
