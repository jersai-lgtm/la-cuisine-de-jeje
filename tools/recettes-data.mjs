// =============================================================================
// Helpers partagés (build SEO + contrôle d'intégrité) : chargement du catalogue
// de recettes en Node et résolution du chemin d'image, alignée sur l'app.
// =============================================================================

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import vm from "node:vm";

// Exécute les fichiers de données dans un bac à sable et renvoie le catalogue.
export function chargerCatalogue(root) {
  const ctx = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of readdirSync(join(root, "js")).filter((f) => /^recettes(_|\.)/.test(f))) {
    try { vm.runInContext(readFileSync(join(root, "js", f), "utf8"), ctx); } catch (e) { /* fichier non-données */ }
  }
  return ctx.recettes;
}

// Récupère le mapping IMAGE_EXCEPTIONS défini dans app.js (clé → nom de fichier).
export function chargerImageExceptions(root) {
  try {
    const src = readFileSync(join(root, "js", "app.js"), "utf8");
    const m = src.match(/const\s+IMAGE_EXCEPTIONS\s*=\s*\{([^}]*)\}/);
    if (!m) return {};
    const ctx = { v: null }; vm.createContext(ctx);
    vm.runInContext("v = {" + m[1] + "}", ctx);
    return ctx.v || {};
  } catch (e) { return {}; }
}

// Réplique getImagePath() de l'app : r.image si présent, sinon
// IMAGE_EXCEPTIONS[clé] || clé → images/<1re lettre>/<nom>.webp
export function cheminImage(key, r, imgExc) {
  if (r && r.image) return r.image.replace(/^\//, "");
  const nom = (imgExc && imgExc[key]) || key;
  return "images/" + (nom.charAt(0) || "_").toLowerCase() + "/" + nom + ".webp";
}

// Mapping slug d'ingrédient → joli nom, fusionné depuis INGREDIENTS_LABELS
// (ingredients_prix.js) et NOMS_PROPRES_INGR (emojis.js), emoji retiré.
export function chargerLabelsIngredients(root) {
  const ctx = { Object, console: { log() {} }, document: { addEventListener() {}, readyState: "complete" }, setTimeout() {} };
  ctx.window = ctx;
  vm.createContext(ctx);
  const lire = (fichier, nomVar) => {
    try {
      vm.runInContext(readFileSync(join(root, "js", fichier), "utf8")
        + `\n;globalThis.__cap=(typeof ${nomVar}!=='undefined')?${nomVar}:{};`, ctx);
      return ctx.__cap || {};
    } catch (e) { return ctx.__cap || {}; }
  };
  const a = lire("ingredients_prix.js", "INGREDIENTS_LABELS");
  const b = lire("emojis.js", "NOMS_PROPRES_INGR");
  const fusion = Object.assign({}, a, b);
  const strip = (s) => String(s || "").replace(/^[^\p{L}]+/u, "").trim(); // retire emoji/symbole en tête
  const out = {};
  for (const k in fusion) out[k] = strip(fusion[k]) || k;
  return out;
}
