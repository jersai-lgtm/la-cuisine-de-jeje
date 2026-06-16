// =============================================================================
// SEO — génération de pages par recette + sitemap (appelé par tools/build.mjs)
// -----------------------------------------------------------------------------
// GitHub Pages sert un site "une seule page" : Google ne peut pas indexer les
// recettes individuellement. On génère donc, au build, une page statique
// crawlable par recette (dist/recette/<clé>.html) avec :
//   • <title>/description/canonical/OpenGraph/Twitter
//   • données structurées schema.org/Recipe (→ rich results Google)
//   • le contenu visible (ingrédients + étapes) qui CORRESPOND au JSON-LD
//   • un lien vers l'application
// Plus un sitemap.xml et un robots.txt.
// =============================================================================

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

const BASE = "https://jersai-lgtm.github.io/la-cuisine-de-jeje";

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const jstr = (o) => JSON.stringify(o).replace(/</g, "\\u003c"); // sûr dans <script>

// Charge le catalogue de recettes en exécutant les fichiers de données.
function chargerRecettes(root) {
  const ctx = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of readdirSync(join(root, "js")).filter((f) => /^recettes(_|\.)/.test(f))) {
    try { vm.runInContext(readFileSync(join(root, "js", f), "utf8"), ctx); } catch (e) { /* fichier non-données */ }
  }
  return ctx.recettes;
}

// "3 h" / "20 min" / "1 h 30" → minutes
function minutes(temps) {
  const t = String(temps || "").toLowerCase();
  let m = 0;
  const h = t.match(/(\d+)\s*h\s*(\d+)?/);
  if (h) m += parseInt(h[1], 10) * 60 + (h[2] ? parseInt(h[2], 10) : 0);
  const mn = t.match(/(\d+)\s*min/);
  if (mn && !h) m += parseInt(mn[1], 10);
  return m;
}
const iso8601 = (min) => min > 0 ? "PT" + (min >= 60 ? Math.floor(min / 60) + "H" : "") + (min % 60 ? (min % 60) + "M" : "") : "";

// Liste d'ingrédients "quantité nom" depuis les 3 formes possibles.
function ingredients(r) {
  if (r.ingredients && Object.keys(r.ingredients).length) {
    return Object.entries(r.ingredients).map(([n, q]) => (q ? q + " " : "") + n);
  }
  if (Array.isArray(r.ingredientsFixes) && r.ingredientsFixes.length) {
    return r.ingredientsFixes.map((p) => {
      const a = Array.isArray(p), n = a ? p[0] : (p && p.k), q = a ? p[1] : (p && p.v);
      return (q ? q + " " : "") + (n || "");
    });
  }
  const tabKey = Object.keys(r).find((k) => k.startsWith("tableau"));
  if (tabKey && Array.isArray(r[tabKey])) {
    const row = r[tabKey].find((x) => x && x.nb === 1) || r[tabKey][0] || {};
    return Object.entries(row).filter(([k]) => k !== "nb").map(([n, q]) => (q ? q + " " : "") + n);
  }
  return [];
}

function imagePath(key, r) {
  if (r.image) return r.image.replace(/^\//, "");
  return "images/" + (key.charAt(0) || "_").toLowerCase() + "/" + key + ".webp";
}

function pageRecette(key, r, imgRel) {
  const nom = r.nom || key;
  const desc = (r.description || `Recette ${nom} : ingrédients, étapes et temps de préparation sur La Cuisine de Jéjé.`).slice(0, 300);
  const descCourte = desc.slice(0, 160);
  const urlPage = `${BASE}/recette/${key}.html`;
  const urlImg = `${BASE}/${imgRel}`;
  const ingr = ingredients(r);
  const etapes = (r.etapes || []).map((e) => ({ titre: e.titre || "", detail: e.detail || "" }));
  const min = minutes(r.temps);

  const jsonld = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    name: nom,
    image: [urlImg],
    description: desc,
    author: { "@type": "Organization", name: "La Cuisine de Jéjé" },
    datePublished: (r.dateAjout || "").slice(0, 10) || undefined,
    recipeCategory: r.cat || undefined,
    recipeCuisine: r.pays || undefined,
    keywords: [nom, r.cat, r.pays].filter(Boolean).join(", "),
    totalTime: iso8601(min) || undefined,
    recipeYield: r.base ? String(r.base) + " portions" : undefined,
    recipeIngredient: ingr.length ? ingr : undefined,
    recipeInstructions: etapes.map((e) => ({ "@type": "HowToStep", name: e.titre || undefined, text: (e.detail || e.titre) })),
  };
  Object.keys(jsonld).forEach((k) => jsonld[k] === undefined && delete jsonld[k]);

  const liIngr = ingr.map((i) => `<li>${esc(i)}</li>`).join("");
  const liEtapes = etapes.map((e, i) => `<li><strong>${esc(e.titre)}</strong><br>${esc(e.detail)}</li>`).join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(nom)} — La Cuisine de Jéjé</title>
<meta name="description" content="${esc(descCourte)}">
<link rel="canonical" href="${esc(urlPage)}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(nom)} — La Cuisine de Jéjé">
<meta property="og:description" content="${esc(descCourte)}">
<meta property="og:image" content="${esc(urlImg)}">
<meta property="og:url" content="${esc(urlPage)}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${jstr(jsonld)}</script>
<style>body{font-family:system-ui,-apple-system,sans-serif;max-width:760px;margin:0 auto;padding:20px;color:#1b1b1f;line-height:1.6}img{max-width:100%;border-radius:14px}a.app{display:inline-block;margin:18px 0;background:#ff5b95;color:#fff;padding:12px 20px;border-radius:12px;text-decoration:none;font-weight:700}h1{font-size:28px}.meta{color:#666;font-size:14px}</style>
</head>
<body>
<h1>${esc(r.emoji || "🍽️")} ${esc(nom)}</h1>
<p class="meta">${esc(r.temps || "")}${r.niveau ? " · " + esc(r.niveau) : ""}${r.cat ? " · " + esc(r.cat) : ""}</p>
<img src="../${esc(imgRel)}" alt="${esc(nom)}" loading="lazy" onerror="this.style.display='none'">
<p>${esc(desc)}</p>
<a class="app" href="${BASE}/?r=${esc(key)}">👨‍🍳 Voir la recette dans l'application</a>
${liIngr ? `<h2>🛒 Ingrédients</h2><ul>${liIngr}</ul>` : ""}
${liEtapes ? `<h2>📋 Étapes</h2><ol>${liEtapes}</ol>` : ""}
<p class="meta">Recette publiée sur <a href="${BASE}/">La Cuisine de Jéjé</a>.</p>
</body>
</html>`;
}

export function genererSEO(root, dist) {
  const recettes = chargerRecettes(root);
  const keys = Object.keys(recettes);
  mkdirSync(join(dist, "recette"), { recursive: true });

  let avecIngr = 0;
  const urls = [`${BASE}/`];
  for (const key of keys) {
    const r = recettes[key];
    if (!r || !Array.isArray(r.etapes) || !r.etapes.length) continue;
    const imgRel = imagePath(key, r);
    if (!existsSync(join(root, imgRel))) continue; // pas d'image → on saute (OG/rich result cassés sinon)
    if (ingredients(r).length) avecIngr++;
    writeFileSync(join(dist, "recette", key + ".html"), pageRecette(key, r, imgRel));
    urls.push(`${BASE}/recette/${key}.html`);
  }

  // sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>`;
  writeFileSync(join(dist, "sitemap.xml"), sitemap);

  // robots.txt
  writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`);

  return { pages: urls.length - 1, avecIngredients: avecIngr };
}
