// =============================================================================
// version.mjs — Bump de version en une commande.
//   node tools/version.mjs 1.10.0
// Met à jour les 3 sources qui doivent rester synchro (voir js/version.js) :
//   • js/version.js        APP_VERSION       -> badge admin + feedback/erreurs
//   • service-worker.js    CACHE_NAME        -> (le build le re-hashe, mais on
//                                               garde la source cohérente)
//   • index.html           ?v=…              -> cache-busting des assets en dev
// Sans argument : affiche la version actuelle.
// =============================================================================
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const p = (f) => join(ROOT, f);
const lire = (f) => readFileSync(p(f), "utf8");
const ecrire = (f, s) => writeFileSync(p(f), s);

const actuelle = (lire("js/version.js").match(/APP_VERSION\s*=\s*"([^"]+)"/) || [])[1] || "?";

const arg = process.argv[2];
if (!arg) {
  console.log("Version actuelle : " + actuelle);
  console.log("Usage : node tools/version.mjs <nouvelle_version>   (ex. 1.10.0)");
  process.exit(0);
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
