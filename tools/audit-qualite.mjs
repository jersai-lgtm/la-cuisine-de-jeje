// =============================================================================
// 🔍 audit-qualite.mjs — Scanne le catalogue et liste TOUTES les anomalies de
//    données, par catégorie. Lecture seule : ne modifie rien.
//
//   node tools/audit-qualite.mjs            # rapport complet
//   node tools/audit-qualite.mjs --json     # sortie JSON (pour un autre script)
//
// Catégories détectées :
//   1. liees cassés         → un lien pointe vers une recette inexistante
//   2. ingrédients sans prix → clé de tableau absente de INGREDIENTS_PRIX
//                              (⇒ coût ET calories sous-estimés silencieusement)
//   3. clés en doublon       → même ingrédient écrit de plusieurs façons
//   4. étapes < 6            → viole la règle 6-8 étapes détaillées
//   5. farine dans enveloppe → "farine" brute dans un plat samoussa/brick/tortilla
//   6. photo manquante       → images/<x>/<cle>.webp absent
// =============================================================================
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const JS = join(ROOT, "js");
const JSON_OUT = process.argv.includes("--json");

// --- Charger le catalogue FR + la table des prix dans un même sandbox --------
const ctx = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of readdirSync(JS).filter((f) => /^recettes(_|\.)/.test(f))) {
  try { vm.runInContext(readFileSync(join(JS, f), "utf8"), ctx); } catch (e) { /* ignore */ }
}
vm.runInContext(readFileSync(join(JS, "ingredients_prix.js"), "utf8") + ";this.__PRIX=INGREDIENTS_PRIX;this.__CLE=(typeof cleCanonique==='function')?cleCanonique:null;", ctx);
const R = ctx.recettes;
const PRIX = ctx.__PRIX || {};
const resoudre = ctx.__CLE || ((x) => (x in PRIX ? x : null)); // repli si version sans résolveur
const cles = Object.keys(R);

// --- Utilitaires -------------------------------------------------------------
const tableauDe = (r) => {
  const k = Object.keys(r).find((x) => /^tableau/i.test(x));
  return k && Array.isArray(r[k]) ? r[k] : null;
};
const ingredientsDe = (r) => {
  const t = tableauDe(r);
  if (!t || !t[0]) return [];
  return Object.keys(t[0]).filter((x) => !["nb", "label", "patons", "total"].includes(x));
};

// --- 1. liees cassés ---------------------------------------------------------
const lieesCasses = [];
for (const k of cles) {
  const l = R[k].liees;
  if (Array.isArray(l)) for (const cible of l) if (cible == null || !(cible in R)) lieesCasses.push({ recette: k, cible: String(cible) });
}

// --- 2. ingrédients sans prix + 3. regroupement pour doublons ----------------
const manquants = {};           // cle ingr -> [recettes]
const toutesClesIngr = new Set();
for (const k of cles) {
  for (const ing of ingredientsDe(R[k])) {
    toutesClesIngr.add(ing);
    if (!resoudre(ing)) (manquants[ing] ||= []).push(k);
  }
}
// doublons d'orthographe : clés qui se normalisent pareil (minuscule, sans s/accents)
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/s$/, "");
const parNorm = {};
for (const c of toutesClesIngr) (parNorm[norm(c)] ||= new Set()).add(c);
const doublons = Object.entries(parNorm).filter(([, set]) => set.size > 1).map(([n, set]) => [...set]);

// --- 4. étapes < 6 -----------------------------------------------------------
const peuEtapes = cles.filter((k) => Array.isArray(R[k].etapes) && R[k].etapes.length < 6)
  .map((k) => ({ recette: k, n: R[k].etapes.length }));

// --- 5. farine brute dans une enveloppe --------------------------------------
const ENVELOPPE = /samou?ss?a|samosa|brick|bric|tortilla|wrap|chimichanga|burrito|fajita|empanada|briouat|pastilla|nem|roll/i;
const farineEnveloppe = cles.filter((k) => {
  const r = R[k];
  if (!ENVELOPPE.test(k + " " + (r.nom || ""))) return false;
  return ingredientsDe(r).includes("farine");
});

// --- 6. photo manquante ------------------------------------------------------
const photoManquante = [];
for (const k of cles) {
  const dossier = /^[a-z]/i.test(k) ? k[0].toLowerCase() : "_";
  if (!existsSync(join(ROOT, "images", dossier, k + ".webp"))) photoManquante.push(k);
}

// --- Rapport -----------------------------------------------------------------
const nbRecettesImpactees = new Set(Object.values(manquants).flat()).size;
const rapport = {
  total: cles.length,
  lieesCasses,
  ingredientsSansPrix: { nbCles: Object.keys(manquants).length, nbRecettes: nbRecettesImpactees, detail: manquants },
  doublonsOrthographe: doublons,
  etapesInsuffisantes: peuEtapes,
  farineEnveloppe,
  photoManquante,
};

if (JSON_OUT) { console.log(JSON.stringify(rapport, null, 2)); process.exit(0); }

const top = (obj, n = 15) => Object.entries(obj).sort((a, b) => b[1].length - a[1].length).slice(0, n);
console.log(`\n🔍 AUDIT QUALITÉ — ${cles.length} recettes\n${"=".repeat(50)}`);

console.log(`\n[1] liees cassés : ${lieesCasses.length}`);
lieesCasses.forEach((x) => console.log(`    ${x.recette} → "${x.cible}" (inexistant)`));

console.log(`\n[2] ingrédients SANS PRIX : ${rapport.ingredientsSansPrix.nbCles} clés dans ${nbRecettesImpactees} recettes`);
console.log(`    ⚠️  coût ET calories sous-estimés pour ces recettes`);
top(manquants).forEach(([ing, recs]) => console.log(`    ${ing.padEnd(22)} ${recs.length}× ex: ${recs.slice(0, 3).join(", ")}`));
if (Object.keys(manquants).length > 15) console.log(`    … +${Object.keys(manquants).length - 15} autres clés`);

console.log(`\n[3] clés d'ingrédient en doublon d'orthographe : ${doublons.length}`);
doublons.slice(0, 20).forEach((set) => console.log(`    ${set.join("  ↔  ")}`));

console.log(`\n[4] recettes < 6 étapes : ${peuEtapes.length}`);
peuEtapes.slice(0, 20).forEach((x) => console.log(`    ${x.recette} (${x.n} étapes)`));

console.log(`\n[5] "farine" brute dans une recette à enveloppe : ${farineEnveloppe.length}`);
farineEnveloppe.forEach((k) => console.log(`    ${k} — ${R[k].nom}`));

console.log(`\n[6] photos manquantes : ${photoManquante.length}`);
photoManquante.slice(0, 20).forEach((k) => console.log(`    ${k}`));

console.log(`\n${"=".repeat(50)}`);
console.log(`Résumé : ${lieesCasses.length} liees cassés · ${rapport.ingredientsSansPrix.nbCles} ingr. sans prix · ${doublons.length} doublons ortho · ${peuEtapes.length} recettes courtes · ${farineEnveloppe.length} farine/enveloppe · ${photoManquante.length} photos manquantes\n`);
