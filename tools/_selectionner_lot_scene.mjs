// Selectionne le prochain lot de recettes a refaire en style "scene enrichie"
// et genere des props (accessoires) par plat, tires des vrais ingredients de
// la recette + un gabarit par categorie. Sortie -> tools/_lot_scene.json
// Usage : node tools/_selectionner_lot_scene.mjs [taille=100]
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const TAILLE = parseInt(process.argv[2] || "100", 10);
const MANIFEST = join(ROOT, "tools", "_photos_scene_faites.json");

function charger(fichier, marqueur, seed) {
  const ctx = { ...seed };
  vm.createContext(ctx);
  const src = fs.readFileSync(join(ROOT, fichier), "utf8") + `\n;globalThis.__OUT = ${marqueur};`;
  vm.runInContext(src, ctx);
  return ctx.__OUT;
}

function chargerToutesRecettes() {
  const ctx = { recettes: {} };
  vm.createContext(ctx);
  const fichiers = fs.readdirSync(join(ROOT, "js")).filter(
    (f) => /^recettes(_|\.)/.test(f) && f !== "recettes_en.js" && f !== "recettes_batch.js"
  );
  for (const f of fichiers) {
    try {
      vm.runInContext(fs.readFileSync(join(ROOT, "js", f), "utf8"), ctx);
    } catch (e) {
      console.error("Erreur dans " + f + " : " + e.message);
    }
  }
  return ctx.recettes;
}

const recettes = chargerToutesRecettes();
const labels = charger("js/ingredients_prix.js", "INGREDIENTS_LABELS");

const GENERIQUES = new Set([
  "sel", "poivre", "eau", "huile", "huileOlive", "sucre", "beurre", "farine",
  "levure", "bicarbonate", "vinaigre", "moutarde", "selFleur",
]);

const PROPS_PAR_CATEGORIE = {
  plats: "un accompagnement typique du plat, un ustensile de service adapte",
  desserts: "quelques fruits frais ou un coulis assorti, une fourchette a dessert",
  aperitifs: "une sauce ou dip assortie dans une petite coupelle, une serviette en tissu",
  boulangerie: "un pot de confiture ou de miel, une motte de beurre, un couteau a pain",
  soupes: "un accompagnement (pain ou croutons), une cuillere adaptee",
  encas: "une sauce d'accompagnement, une serviette en tissu",
  sauces: "du pain ou des legumes pour tremper, une petite cuillere",
  tartinables: "du pain ou des legumes pour tremper, une petite cuillere",
  brunch: "une boisson chaude (cafe ou the), un peu de confiture ou de miel",
  entrees: "un ustensile de service, une garniture fraiche",
  salades: "une petite bouteille d'huile ou de vinaigrette, une fourchette",
  glaces: "un coulis ou des fruits frais, une cuillere a glace",
};

function ingredientsPertinents(r) {
  const tableauKey = Object.keys(r).find((k) => k.startsWith("tableau"));
  if (!tableauKey || !Array.isArray(r[tableauKey]) || !r[tableauKey][0]) return [];
  const ligne = r[tableauKey][0]; // nb: 1
  const cles = Object.keys(ligne).filter((k) => k !== "nb" && !GENERIQUES.has(k));
  return cles.slice(0, 2).map((k) => {
    const lbl = labels[k] || k;
    return lbl.replace(/^[^\p{L}]+/u, ""); // retire l'emoji + variation selectors du libelle
  });
}

function construireProps(r) {
  const base = PROPS_PAR_CATEGORIE[r.cat] || PROPS_PAR_CATEGORIE.plats;
  const ing = ingredientsPertinents(r);
  if (ing.length) {
    return `${base}, avec ${ing.join(" et ")} visibles a cote`;
  }
  return base;
}

let dejaFaites = new Set();
if (fs.existsSync(MANIFEST)) {
  dejaFaites = new Set(JSON.parse(fs.readFileSync(MANIFEST, "utf8")));
}

const cles = Object.keys(recettes).sort();
const restantes = cles.filter((k) => !dejaFaites.has(k));
const lot = restantes.slice(0, TAILLE).map((cle) => {
  const r = recettes[cle];
  return {
    cle,
    nom: r.nom,
    desc: r.description || r.nom,
    props: construireProps(r),
  };
});

fs.writeFileSync(join(ROOT, "tools", "_lot_scene.json"), JSON.stringify(lot, null, 1));
console.log(`Lot de ${lot.length} recette(s) -> tools/_lot_scene.json (restantes apres ce lot : ${restantes.length - lot.length})`);
