// =============================================================================
// Contrôle d'intégrité des données — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Lancé en CI (et en local : `node tools/verifier-donnees.mjs`). Vérifie que les
// données de recettes sont cohérentes AVANT déploiement :
//   • chaque recette a nom / étapes / temps
//   • l'image de chaque recette existe sur le disque
//   • pas de clé de recette définie en double (un fichier en écraserait un autre)
//   • les clés de recettes_batch.js référencent bien des recettes existantes
// Sort en erreur (code 1) si un problème est trouvé → bloque le déploiement.
// =============================================================================

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { chargerImageExceptions, cheminImage } from "./recettes-data.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const imgExc = chargerImageExceptions(ROOT);
const fichiersRecettes = readdirSync(join(ROOT, "js")).filter((f) => /^recettes(_|\.)/.test(f) && f !== "recettes_batch.js");

function sandbox() { const c = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } }; c.window = c; vm.createContext(c); return c; }
function exec(ctx, fichier) { vm.runInContext(readFileSync(join(ROOT, "js", fichier), "utf8"), ctx); }

const erreurs = [];
const avert = [];

// 1) Doublons de clés entre fichiers (chaque fichier chargé isolément)
const origine = {};
for (const f of fichiersRecettes) {
  const ctx = sandbox();
  try { exec(ctx, f); } catch (e) { erreurs.push(`${f} : exécution impossible (${e.message})`); continue; }
  for (const k of Object.keys(ctx.recettes)) {
    if (origine[k]) erreurs.push(`Clé en double : "${k}" définie dans ${origine[k]} ET ${f}`);
    else origine[k] = f;
  }
}

// 2) Catalogue complet pour les autres contrôles
const ctx = sandbox();
for (const f of readdirSync(join(ROOT, "js")).filter((f) => /^recettes(_|\.)/.test(f))) {
  try { exec(ctx, f); } catch (e) {}
}
const R = ctx.recettes;
const cles = Object.keys(R);

// 3) Champs requis + image présente
for (const k of cles) {
  const r = R[k];
  if (!r.nom || typeof r.nom !== "string") erreurs.push(`${k} : "nom" manquant`);
  if (!Array.isArray(r.etapes) || r.etapes.length === 0) erreurs.push(`${k} : "etapes" manquantes ou vides`);
  if (!r.temps) avert.push(`${k} : "temps" manquant`);
  const img = cheminImage(k, r, imgExc);
  if (!existsSync(join(ROOT, img))) erreurs.push(`${k} : image introuvable (${img})`);
}

// 4) Cohérence de recettes_batch.js
try {
  const cb = sandbox();
  exec(cb, "recettes_batch.js");
  const batch = cb.window.RECETTES_BATCH || cb.RECETTES_BATCH || {};
  for (const k of Object.keys(batch)) {
    if (!R[k]) avert.push(`recettes_batch : "${k}" ne correspond à aucune recette`);
  }
} catch (e) { avert.push(`recettes_batch.js non vérifiable (${e.message})`); }

// --- Rapport --------------------------------------------------------------
console.log(`🔎 ${cles.length} recettes vérifiées.`);
if (avert.length) { console.log(`\n⚠️  ${avert.length} avertissement(s) :`); avert.slice(0, 50).forEach((m) => console.log("   - " + m)); }
if (erreurs.length) {
  console.log(`\n❌ ${erreurs.length} erreur(s) :`);
  erreurs.slice(0, 100).forEach((m) => console.log("   - " + m));
  console.log("\n::error::Intégrité des données : au moins une erreur.");
  process.exit(1);
}
console.log("\n✅ Données cohérentes.");
