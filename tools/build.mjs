// =============================================================================
// Build de production — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Objectif perf : remplacer les ~50 <script> locaux par quelques bundles
// MINIFIÉS, sans rien changer au code source (qu'on continue d'éditer module
// par module). Sortie dans dist/ → servie telle quelle par GitHub Pages.
//
// Sûreté :
//  • On NE réordonne pas les scripts : chaque "bloc" contigu de scripts locaux
//    devient UN bundle, à sa place. Les scripts Firebase CDN restent entre les
//    deux blocs → auth.js (bundle 2) s'exécute bien APRÈS Firebase.
//  • Minification = whitespace + syntaxe UNIQUEMENT. On NE renomme PAS les
//    identifiants : les fonctions globales appelées par les onclick="..." du
//    HTML (ouvrirFiche, etc.) et les globals partagés entre fichiers (recettes,
//    escapeHTML, _db…) restent intacts.
//  • Le gros gain vient du retrait des commentaires/espaces des fichiers de
//    données (recettes_*.js), qui pèsent ~86 % du JS.
// =============================================================================

import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";
import { genererSEO } from "./seo.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const p = (...x) => join(ROOT, ...x);

const RX_LOCAL_SCRIPT = /^\s*<script\s+defer\s+src="(?!https?:)([^"]+)"\s*><\/script>\s*$/i;

async function minifyJs(code) {
  if (process.env.NOMIN) return code; // debug : concat sans minification
  const r = await transform(code, {
    loader: "js",
    minifyWhitespace: true,
    minifySyntax: true,
    minifyIdentifiers: false, // NE PAS renommer : globals/onclick en dépendent
    legalComments: "none",
  });
  return r.code;
}

const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 10);

async function main() {
  const html = readFileSync(p("index.html"), "utf8").split(/\r?\n/);

  // 1) Repérer les blocs contigus de <script defer src="local">
  const groups = [];
  let cur = null;
  html.forEach((line, i) => {
    const m = line.match(RX_LOCAL_SCRIPT);
    if (m) {
      const file = m[1].split("?")[0]; // retire ?v=...
      if (cur && cur.end === i - 1) { cur.files.push(file); cur.end = i; }
      else { cur = { start: i, end: i, files: [file] }; groups.push(cur); }
    } else if (line.trim() !== "" && cur && cur.end === i - 1) {
      cur = null; // une ligne non vide casse le bloc
    }
  });
  if (groups.length === 0) throw new Error("Aucun script local trouvé dans index.html");
  console.log(`→ ${groups.length} bloc(s) de scripts locaux détecté(s) :`);

  // 2) Préparer dist/
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(join(DIST, "assets"), { recursive: true });

  // 3) Construire un bundle minifié par bloc + mémoriser le tag de remplacement
  const remplacement = {}; // index de ligne de début → tag bundle ; lignes à supprimer
  const lignesASupprimer = new Set();
  let totalBrut = 0, totalMin = 0;
  for (let g = 0; g < groups.length; g++) {
    const grp = groups[g];
    let concat = "";
    if (process.env.DEBUGERR) concat += `window.addEventListener('error',function(e){(window.__berr=window.__berr||[]).push((e.message||'')+' @ ligne '+e.lineno+':'+e.colno);});\n`;
    for (const f of grp.files) {
      if (!existsSync(p(f))) throw new Error(`Fichier référencé introuvable : ${f}`);
      concat += `\n;\n/* ${f} */\n` + readFileSync(p(f), "utf8");
    }
    totalBrut += Buffer.byteLength(concat);
    const min = await minifyJs(concat);
    totalMin += Buffer.byteLength(min);
    const name = `assets/bundle${g + 1}.${hash(min)}.min.js`;
    writeFileSync(join(DIST, name), min);
    console.log(`   bloc ${g + 1} : ${grp.files.length} fichiers → ${name} (${(Buffer.byteLength(min) / 1024).toFixed(0)} Ko)`);
    remplacement[grp.start] = `<script defer src="${name}"></script>`;
    for (let i = grp.start; i <= grp.end; i++) lignesASupprimer.add(i);
  }

  // 4) Réécrire index.html : remplacer chaque bloc par son tag bundle
  const out = [];
  html.forEach((line, i) => {
    if (remplacement[i] !== undefined) out.push(remplacement[i]);
    else if (!lignesASupprimer.has(i)) out.push(line);
  });
  writeFileSync(join(DIST, "index.html"), out.join("\n"));

  // 5) Copier les fichiers statiques nécessaires au runtime
  const statiques = ["style.css", "manifest.json", "favicon.ico", "service-worker.js"];
  for (const f of statiques) if (existsSync(p(f))) cpSync(p(f), join(DIST, f));
  if (existsSync(p("images"))) cpSync(p("images"), join(DIST, "images"), { recursive: true });
  writeFileSync(join(DIST, ".nojekyll"), ""); // Pages : ne pas passer par Jekyll

  // 6) SEO : pages par recette + sitemap + robots
  const seo = genererSEO(ROOT, DIST);
  console.log(`   SEO : ${seo.pages} pages recette générées (${seo.avecIngredients} avec ingrédients) + sitemap.xml + robots.txt`);

  console.log(`✅ Build OK → dist/`);
  console.log(`   JS : ${(totalBrut / 1024 / 1024).toFixed(2)} Mo brut → ${(totalMin / 1024 / 1024).toFixed(2)} Mo minifié (${(100 * (1 - totalMin / totalBrut)).toFixed(0)} % en moins)`);
}

main().catch((e) => { console.error("❌ Build échoué :", e.message); process.exit(1); });
