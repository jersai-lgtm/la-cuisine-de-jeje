// doublons-pays.mjs — cherche le même plat sous DEUX NOMS dans un même pays.
//
// Le cas Al Harees / Harees : clés différentes, noms différents, Levenshtein
// inopérant. Le seul signal fiable est alors la COMPOSITION : deux recettes du
// même pays et de la même catégorie dont les ingrédients se recouvrent presque
// entièrement sont probablement le même plat.
//
// Usage : node tools/doublons-pays.mjs france italie usa
import { readFileSync, readdirSync } from "node:fs";

const RAC = "C:/xampp/htdocs/la-cuisine-de-jeje";
const PAYS = process.argv.slice(2);
if (!PAYS.length) { console.error("usage : node doublons-pays.mjs <pays> [pays...]"); process.exit(1); }

globalThis.window = globalThis;
globalThis.recettes = {};
for (const f of readdirSync(RAC + "/js").filter((n) => /^recettes.*\.js$/.test(n) && n !== "recettes_en.js" && n !== "recettes_batch.js")) {
  try { (0, eval)(readFileSync(RAC + "/js/" + f, "utf8")); } catch (e) { console.error("!! " + f + " : " + e.message); }
}
const CAT = globalThis.recettes;

// --- composition d'une recette : l'ensemble de ses clés d'ingrédient --------
function composition(r) {
  const cle = Object.keys(r).find((k) => k.startsWith("tableau"));
  if (cle && Array.isArray(r[cle]) && r[cle].length) {
    const ligne = r[cle].find((l) => l && l.nb === 1) || r[cle][0];
    return new Set(Object.keys(ligne).filter((k) => k !== "nb"));
  }
  if (r.ingredients && Object.keys(r.ingredients).length) return new Set(Object.keys(r.ingredients));
  return new Set();
}

// --- noms normalisés (même normalisation que la sonde) ----------------------
const MOTS_VIDES = new Set(["de","du","des","la","le","les","a","au","aux","l","d","et","en","the","of","and","with","avec","sans","style","maison","facon","y","al","el","e"]);
const normer = (s) => String(s || "").toLowerCase()
  .replace(/œ/g, "oe").replace(/æ/g, "ae")
  .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .split(" ").filter((m) => m && !MOTS_VIDES.has(m)).join(" ");

function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

// --- un mot RARE partagé : deux plats qui partagent un mot présent dans moins
//     de 4 recettes du pays se ressemblent probablement plus qu'il n'y paraît.
const freqMot = new Map();

for (const pays of PAYS) {
  const liste = Object.entries(CAT)
    .filter(([, r]) => r.pays === pays)
    .map(([cle, r]) => ({ cle, nom: r.nom || cle, cat: r.cat, n: normer(r.nom || cle), ing: composition(r) }));

  freqMot.clear();
  for (const x of liste) for (const m of new Set(x.n.split(" "))) freqMot.set(m, (freqMot.get(m) || 0) + 1);

  const trouves = [];
  for (let i = 0; i < liste.length; i++) {
    for (let j = i + 1; j < liste.length; j++) {
      const a = liste[i], b = liste[j];
      const j_ing = jaccard(a.ing, b.ing);
      const motsA = new Set(a.n.split(" ")), motsB = new Set(b.n.split(" "));
      const communs = [...motsA].filter((m) => motsB.has(m));
      const rares = communs.filter((m) => (freqMot.get(m) || 99) <= 3 && m.length >= 4);
      const memeCat = a.cat === b.cat;

      // sans aucun mot en commun, seule une composition quasi identique alerte
      let motif = null;
      if (memeCat && j_ing >= 0.85) motif = "composition quasi identique";
      else if (memeCat && j_ing >= 0.70 && communs.length === 0) motif = "composition proche, AUCUN mot commun";
      else if (memeCat && j_ing >= 0.70 && rares.length) motif = "composition proche + mot rare « " + rares.join(" ") + " »";
      if (!motif) continue;

      trouves.push({ score: j_ing, motif, a, b });
    }
  }
  trouves.sort((x, y) => y.score - x.score);

  console.log("\n======== " + pays.toUpperCase() + " — " + liste.length + " recettes, " + trouves.length + " paires à regarder ========");
  for (const t of trouves) {
    const partage = [...t.a.ing].filter((x) => t.b.ing.has(x));
    const seulA = [...t.a.ing].filter((x) => !t.b.ing.has(x));
    const seulB = [...t.b.ing].filter((x) => !t.a.ing.has(x));
    console.log("\n  " + Math.round(t.score * 100) + "%  [" + t.a.cat + "]  " + t.motif);
    console.log("      A  " + t.a.nom + "  (" + t.a.cle + ")");
    console.log("      B  " + t.b.nom + "  (" + t.b.cle + ")");
    console.log("      communs : " + partage.join(", "));
    if (seulA.length) console.log("      A seul  : " + seulA.join(", "));
    if (seulB.length) console.log("      B seul  : " + seulB.join(", "));
  }
}
