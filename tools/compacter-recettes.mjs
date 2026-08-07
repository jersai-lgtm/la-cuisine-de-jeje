// =============================================================================
// 📦 COMPACTER-RECETTES — utilisé par tools/build.mjs
// =============================================================================
// Réécrit un fichier js/recettes_<cat>.js sous forme compacte pour la version
// livrée : le tableau de 15 lignes devient soit sa ligne d'une personne (quand
// les 14 autres s'en déduisent exactement), soit un couple clés/valeurs où les
// clés ne sont plus répétées quinze fois.
// js/tableaux_expand.js redonne au chargement la forme d'origine, à l'identique.
//
// Le fichier SOURCE n'est jamais modifié : il reste lisible et diffable.
// En cas de doute sur une recette, on retombe sur la forme littérale — et si
// même celle-ci échoue, on garde le tableau tel quel. Aucune perte possible.
// =============================================================================
import { readFileSync } from "node:fs";
import vm from "node:vm";

const FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾" };
const q4 = (v) => {
  const ent = Math.floor(v), frac = Math.round((v - ent) * 100) / 100;
  return (ent > 0 ? String(ent) : "") + (FRACTIONS[frac] || "");
};
const rendre = (base, nb) => base.u
  ? (Math.round(base.v * nb * 100) / 100) + " " + base.u
  : q4(base.v * nb);

// "12.5 g" → {v:12.5,u:"g"} ; "1½" → {v:1.5} ; le reste → null (non dérivable)
function lireCellule(cell) {
  if (typeof cell !== "string") return null;
  const poids = /^(-?\d+(?:\.\d+)?)\s+(\S+)$/.exec(cell.trim());
  if (poids) return { v: parseFloat(poids[1]), u: poids[2] };
  const compte = /^(\d*)([¼½¾]?)$/.exec(cell.trim());
  if (compte && (compte[1] || compte[2])) {
    const f = { "¼": 0.25, "½": 0.5, "¾": 0.75 }[compte[2]] || 0;
    return { v: parseInt(compte[1] || "0", 10) + f };
  }
  return null;
}

/** Le tableau se déduit-il EXACTEMENT de sa ligne nb:1 ? */
function baseDerivable(rows) {
  const r1 = rows.find((l) => l.nb === 1);
  if (!r1 || rows.length !== 15) return null;
  const bases = {};
  for (const [k, v] of Object.entries(r1)) {
    if (k === "nb") continue;
    const b = lireCellule(v);
    if (!b) return null;
    bases[k] = b;
  }
  const clesR1 = Object.keys(r1).length;
  for (const row of rows) {
    if (Object.keys(row).length !== clesR1) return null;
    for (const [k, v] of Object.entries(row)) {
      if (k === "nb") continue;
      if (!bases[k] || rendre(bases[k], row.nb) !== v) return null;
    }
  }
  return bases;
}

/** Forme littérale : clés déclarées une fois, valeurs en lignes.
 *  Volontairement générique — toutes les colonnes sont traitées pareil, y
 *  compris l'index de ligne. Certaines recettes n'utilisent pas `nb` : la
 *  pizza indexe ses lignes par `patons` et en compte 21, pas 15. */
function formeLitterale(rows) {
  const cles = [];
  for (const row of rows) for (const k of Object.keys(row)) if (!cles.includes(k)) cles.push(k);
  const v = rows.map((row) => cles.map((k) => (k in row ? row[k] : null)));
  return { c: cles, v };
}

/** Compacte l'objet `recettes` d'un fichier et renvoie le JS à écrire. */
export function compacterFichierRecettes(chemin) {
  const src = readFileSync(chemin, "utf8");
  const ctx = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } };
  ctx.window = ctx;
  vm.createContext(ctx);
  try { vm.runInContext(src, ctx); } catch { return null; }  // au moindre doute : fichier inchangé
  const R = ctx.recettes;
  if (!R || !Object.keys(R).length) return null;

  let derivables = 0, litterales = 0, intouchees = 0;
  for (const r of Object.values(R)) {
    const nomTab = Object.keys(r).find((k) => /^tableau/.test(k) && Array.isArray(r[k]));
    if (!nomTab) { intouchees++; continue; }
    const rows = r[nomTab];
    const bases = baseDerivable(rows);
    if (bases) { r._t = { n: nomTab, b: bases }; derivables++; }
    else { r._t = { n: nomTab, ...formeLitterale(rows) }; litterales++; }
    delete r[nomTab];
  }

  const js = `/* compacté au build — voir js/tableaux_expand.js */\n`
    + `Object.assign(recettes, ${JSON.stringify(R)});\n`;
  return { js, stats: { derivables, litterales, intouchees, total: Object.keys(R).length } };
}

/** Vérifie que la forme compacte redonne EXACTEMENT le tableau d'origine. */
export function verifierCompaction(chemin) {
  const ctxA = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } };
  ctxA.window = ctxA; vm.createContext(ctxA);
  vm.runInContext(readFileSync(chemin, "utf8"), ctxA);

  const compact = compacterFichierRecettes(chemin);
  if (!compact) return { ok: false, motif: "compaction impossible" };

  const ctxB = { recettes: {}, Object, Array, Math, JSON, console: { log() {} }, window: null };
  ctxB.window = ctxB; vm.createContext(ctxB);
  vm.runInContext("var recettes = {};" + compact.js, ctxB);
  vm.runInContext(readFileSync(new URL("../js/tableaux_expand.js", import.meta.url), "utf8"), ctxB);

  const ecarts = [];
  for (const [cle, avant] of Object.entries(ctxA.recettes)) {
    const nomTab = Object.keys(avant).find((k) => /^tableau/.test(k) && Array.isArray(avant[k]));
    if (!nomTab) continue;
    const apres = ctxB.recettes[cle];
    if (!apres) { ecarts.push(`${cle} : recette perdue`); continue; }
    const a = JSON.stringify(avant[nomTab]);
    const b = JSON.stringify(apres[nomTab]);
    if (a !== b) ecarts.push(`${cle}/${nomTab}`);
  }
  return { ok: ecarts.length === 0, ecarts, stats: compact.stats };
}
