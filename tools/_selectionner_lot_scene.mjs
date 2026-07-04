// Selectionne le prochain lot de recettes a refaire en style "scene enrichie"
// et genere des props (accessoires) par plat, tires des vrais ingredients de
// la recette + un gabarit par categorie. Sortie -> tools/_lot_scene.json
// Usage : node tools/_selectionner_lot_scene.mjs [taille=100] [--dateAjout=YYYY-MM-DDTHH:MM:SS] [--cles=cle1,cle2,...]
//   --dateAjout filtre sur les recettes ajoutees a cette date exacte (ex: une vague precise),
//   au lieu de piocher dans tout le catalogue par ordre alphabetique.
//   --cles cible des clés precises (ex: pour RE-generer des photos deja faites avec un
//   ancien prompt) -- ignore le manifeste "deja faites" pour ces clés-la.
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);
const TAILLE = parseInt(args.find((a) => /^\d+$/.test(a)) || "100", 10);
const filtreDate = (args.find((a) => a.startsWith("--dateAjout=")) || "").replace("--dateAjout=", "") || null;
const clesForcees = (args.find((a) => a.startsWith("--cles=")) || "").replace("--cles=", "").split(",").filter(Boolean);
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
  cocktails: "un zeste d'agrume ou des fruits frais en garniture, une paille, des glacons visibles",
  mocktails: "une feuille de menthe ou des fruits frais en garniture, une paille, des glacons visibles",
  pizzas: "une pelle a pizza ou un couteau a pizza, un peu de farine sur le plan de travail",
  healthy: "quelques fruits ou graines en garniture, une cuillere adaptee",
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

let restantes;
if (clesForcees.length) {
  restantes = clesForcees.filter((k) => recettes[k]);
  const introuvables = clesForcees.filter((k) => !recettes[k]);
  if (introuvables.length) console.error("Cles introuvables (ignorees) : " + introuvables.join(", "));
} else {
  const cles = Object.keys(recettes).sort();
  restantes = cles.filter((k) => !dejaFaites.has(k) && (!filtreDate || recettes[k].dateAjout === filtreDate));
}
// Retire les mentions de main(s) du texte envoye au generateur d'images (ex: "roule
// a la main", "faites main") : un detail culinaire authentique a garder dans la
// description affichee aux utilisateurs, mais qui fait apparaitre une main --
// souvent mal rendue -- sur la photo generee si on le laisse dans le prompt.
function sansMentionMain(texte) {
  return String(texte || "")
    .replace(/,?\s*fait(e)?s?\s+mains?\b/gi, "")
    .replace(/,?\s*(roul[ée]e?s?|pli[ée]e?s?|pil[ée]e?s?|fa[çc]onn[ée]e?s?|p[ée]tri[ei]?s?|mang[ée]e?s?)?\s*(à|a)\s+la\s+main\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,!])/g, "$1")
    .trim();
}

const lot = restantes.slice(0, TAILLE).map((cle) => {
  const r = recettes[cle];
  return {
    cle,
    nom: r.nom,
    desc: sansMentionMain(r.description || r.nom),
    props: construireProps(r),
  };
});

fs.writeFileSync(join(ROOT, "tools", "_lot_scene.json"), JSON.stringify(lot, null, 1));
console.log(`Lot de ${lot.length} recette(s) -> tools/_lot_scene.json (restantes apres ce lot : ${restantes.length - lot.length})`);
