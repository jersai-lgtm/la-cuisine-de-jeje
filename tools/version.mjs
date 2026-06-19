// =============================================================================
// version.mjs — Bump de version en une commande.
//   node tools/version.mjs            → auto-incrément selon le schéma (ci-dessous)
//   node tools/version.mjs 2.3.4      → version explicite
//   node tools/version.mjs --show     → affiche seulement la version actuelle
//
// SCHÉMA DE VERSIONS (depuis la 2.0.0) :
//   le patch monte jusqu'à 10, puis le minor +1 et le patch repart à 1.
//   2.0.0 → 2.0.1 → … → 2.0.10 → 2.1.1 → … → 2.1.10 → 2.2.1 → …
//   (le minor n'est pas plafonné ; pour passer à 3.0.0, donner la version explicite.)
//   Toute version 1.x est basculée vers 2.0.0 au premier auto-incrément.
//
// Met à jour les 3 sources qui doivent rester synchro (voir js/version.js) :
//   • js/version.js        APP_VERSION       -> badge admin + feedback/erreurs
//   • service-worker.js    CACHE_NAME        -> (le build le re-hashe, mais on
//                                               garde la source cohérente)
//   • index.html           ?v=…              -> cache-busting des assets en dev
// =============================================================================
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const p = (f) => join(ROOT, f);
const lire = (f) => readFileSync(p(f), "utf8");
const ecrire = (f, s) => writeFileSync(p(f), s);

const actuelle = (lire("js/version.js").match(/APP_VERSION\s*=\s*"([^"]+)"/) || [])[1] || "?";

// Calcule la version suivante selon le schéma (patch ≤ 10, sinon minor +1 / patch = 1).
function versionSuivante(cur) {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(cur || "");
  if (!m) return "2.0.0";
  let maj = +m[1], min = +m[2], pat = +m[3];
  if (maj < 2) return "2.0.0";          // bascule des 1.x vers la nouvelle ère
  pat += 1;
  if (pat > 10) { min += 1; pat = 1; }  // patch plafonné à 10
  return `${maj}.${min}.${pat}`;
}

let arg = process.argv[2];
if (arg === "--show" || arg === "current") {
  console.log("Version actuelle : " + actuelle);
  process.exit(0);
}
if (!arg) {
  arg = versionSuivante(actuelle);
  console.log("→ Auto-incrément : " + actuelle + " → " + arg);
}
if (!/^\d+\.\d+\.\d+$/.test(arg)) {
  console.error("❌ Version invalide : « " + arg + " ». Format attendu : X.Y.Z (ex. 1.10.0)");
  process.exit(1);
}
if (arg === actuelle) {
  console.error("⚠️  L'appli est déjà en " + arg + ". Rien à faire.");
  process.exit(1);
}

// 1) js/version.js
ecrire("js/version.js", lire("js/version.js").replace(/(APP_VERSION\s*=\s*")[^"]+(")/, `$1${arg}$2`));
// 2) service-worker.js
ecrire("service-worker.js", lire("service-worker.js").replace(/(CACHE_NAME\s*=\s*"cuisine-jeje-v)[^"]+(")/, `$1${arg}$2`));
// 3) index.html (?v=…)
const html = lire("index.html");
const n = (html.match(/\?v=[\d.]+/g) || []).length;
ecrire("index.html", html.replace(/\?v=[\d.]+/g, `?v=${arg}`));

console.log(`✅ Version ${actuelle} → ${arg}`);
console.log(`   • js/version.js (badge admin)`);
console.log(`   • service-worker.js (CACHE_NAME)`);
console.log(`   • index.html (${n} × ?v=)`);
console.log(`\n👉 N'oublie pas, si c'est une vraie nouveauté : ajoute une entrée en haut de QUOI_DE_NEUF dans js/whatsnew.js (sinon, pas de pastille).`);
console.log(`👉 Puis : git commit + merge sur main pour déployer.`);
