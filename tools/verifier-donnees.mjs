// =============================================================================
// Contrôle d'intégrité des données — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Lancé en CI (et en local : `node tools/verifier-donnees.mjs`). Vérifie que les
// données de recettes sont cohérentes AVANT déploiement :
//   • chaque recette a nom / étapes / temps
//   • l'image de chaque recette existe sur le disque (AVERTISSEMENT seulement —
//     les recettes sont souvent publiées avant la conversion des images)
//   • pas de clé de recette définie en double (un fichier en écraserait un autre)
//   • les clés de recettes_batch.js référencent bien des recettes existantes
//   • les rendus dédiés de tables.js lisent des colonnes qui existent vraiment
//     (sinon la fiche affiche « undefined » sans lever la moindre erreur)
// Sort en erreur (code 1) pour les vraies erreurs de données (nom/étapes manquants,
// clé en double…) ; les images manquantes ne sont qu'un avertissement.
// =============================================================================

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { chargerImageExceptions, cheminImage } from "./recettes-data.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const imgExc = chargerImageExceptions(ROOT);
const fichiersRecettes = readdirSync(join(ROOT, "js")).filter((f) => /^recettes(_|\.)/.test(f) && f !== "recettes_batch.js");

function sandbox() { const c = { recettes: {}, Object, Array, Math, JSON, console: { log() {} } }; c.window = c; vm.createContext(c); return c; }
function exec(ctx, fichier) { vm.runInContext(readFileSync(join(ROOT, "js", fichier), "utf8"), ctx); }

const erreurs = [];
const avert = [];

// 1) Doublons de clés entre fichiers (chaque fichier chargé isolément)
const origine = {};
for (const f of fichiersRecettes) {
  const ctx = sandbox();
  try { exec(ctx, f); } catch (e) { erreurs.push(`${f} : exécution impossible (${e.message})`); continue; }
  for (const k of Object.keys(ctx.recettes)) {
    if (origine[k]) erreurs.push(`Clé en double : "${k}" définie dans ${origine[k]} ET ${f}`);
    else origine[k] = f;
  }
}

// 2) Catalogue complet pour les autres contrôles
const ctx = sandbox();
for (const f of readdirSync(join(ROOT, "js")).filter((f) => /^recettes(_|\.)/.test(f))) {
  try { exec(ctx, f); } catch (e) {}
}
const R = ctx.recettes;
const cles = Object.keys(R);

// 3) Champs requis + image présente
for (const k of cles) {
  const r = R[k];
  if (!r.nom || typeof r.nom !== "string") erreurs.push(`${k} : "nom" manquant`);
  if (!Array.isArray(r.etapes) || r.etapes.length === 0) erreurs.push(`${k} : "etapes" manquantes ou vides`);
  if (!r.temps) avert.push(`${k} : "temps" manquant`);
  const img = cheminImage(k, r, imgExc);
  // Image manquante = AVERTISSEMENT (pas une erreur bloquante) : les recettes sont souvent
  // publiées avant que les images soient converties → on ne casse pas le CI pour ça.
  // (Le site masque proprement une image absente via onerror.)
  if (!existsSync(join(ROOT, img))) avert.push(`${k} : image manquante (${img})`);
}

// 3 bis) Deux recettes différentes portant le MÊME nom (doublon réel).
// Historique : 4 paires étaient passées entre les mailles (Janssons, Æbleskiver,
// Scotch eggs, Raspeballer) parce que seule la CLÉ était contrôlée, pas le nom.
{
  const normNom = (s) => (s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/ı/g, "i").replace(/[^a-z0-9]+/g, " ").trim();
  const parNom = new Map();
  for (const k of cles) {
    const n = normNom(R[k].nom);
    if (!n) continue;
    if (parNom.has(n)) erreurs.push(`Nom en double : "${R[k].nom}" porté par "${parNom.get(n)}" ET "${k}"`);
    else parNom.set(n, k);
  }
}

// 3 ter) Deux clés d'ingrédient pour le même produit, au MÊME mode de dosage.
// Le référentiel a deux familles légitimes : au poids (prixKg/calPer100g) et à la
// pièce (prixUnite/cal) — figue/figues, pommedeterre/pommeDeTerre. Celles-là sont
// normales. En revanche deux entrées du MÊME mode divergent en prix et en calories
// selon la graphie employée, et faussent silencieusement le coût des recettes.
{
  const cp = sandbox();
  try {
    exec(cp, "ingredients_prix.js");
    const P = cp.INGREDIENTS_PRIX || cp.window.INGREDIENTS_PRIX || {};
    const SEPARES = new Set(["pate", "pates"]);   // pâte (à tarte) ≠ pâtes (alimentaires)
    const dosage = (k) => (P[k] && P[k].prixUnite !== undefined ? "unite" : "poids");
    const normIng = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/s$/, "");
    const grp = {};
    for (const k of Object.keys(P)) (grp[normIng(k)] = grp[normIng(k)] || []).push(k);
    for (const ks of Object.values(grp)) {
      if (ks.length < 2 || ks.some((k) => SEPARES.has(k))) continue;
      for (const mode of ["poids", "unite"]) {
        const m = ks.filter((k) => dosage(k) === mode);
        if (m.length > 1) erreurs.push(`Ingrédient en double (dosage ${mode}) : ${m.join(" / ")} — fusionner, sinon le coût dépend de la graphie`);
      }
    }
  } catch (e) { avert.push(`ingredients_prix.js non vérifiable (${e.message})`); }
}

// 4) Cohérence de recettes_batch.js
try {
  const cb = sandbox();
  exec(cb, "recettes_batch.js");
  const batch = cb.window.RECETTES_BATCH || cb.RECETTES_BATCH || {};
  for (const k of Object.keys(batch)) {
    if (!R[k]) avert.push(`recettes_batch : "${k}" ne correspond à aucune recette`);
  }
} catch (e) { avert.push(`recettes_batch.js non vérifiable (${e.message})`); }

// --- Compteur de recettes annoncé à l'utilisateur --------------------------
// Le nombre affiché (accueil, aide, métadonnées SEO, prompt de l'assistant)
// est écrit en dur à sept endroits. Il annonçait encore « 2000 » alors que le
// catalogue en comptait 3325 : c'est la première phrase que lit un nouvel
// utilisateur, et elle a dérivé pendant 1300 recettes sans que rien ne le dise.
{
  const FICHIERS = ["index.html", "js/onboarding.js", "js/app_aide.js",
    "js/i18n_aide.js", "js/i18n_dict.js", "js/assistant_vocal.js"];
  const RE = /(?:Plus de|Over|~)\s?(\d[\d  ]*)\+? (?:recettes|recipes)|\b(\d[\d  ]*)\+ (?:recettes|recipes)/g;
  const perimes = new Set();
  for (const rel of FICHIERS) {
    let src;
    try { src = readFileSync(join(ROOT, rel), "utf8"); } catch { continue; }
    for (const m of src.matchAll(RE)) {
      const annonce = parseInt((m[1] || m[2]).replace(/\D/g, ""), 10);
      // On tolère l'arrondi à la centaine inférieure et un lot d'avance.
      if (annonce < cles.length - 130 || annonce > cles.length) perimes.add(`${rel} annonce ${annonce}`);
    }
  }
  if (perimes.size)
    erreurs.push(`Compteur de recettes périmé (${cles.length} au catalogue) : ${[...perimes].join(", ")} — lancer \`node tools/maj-compteur-recettes.mjs\``);
}

// --- Quantités comptées en pièces sans poids connu -------------------------
// Une cellule sans unité (« tomate: "2" », « canard: "1" ») est un COMPTE.
// Sans poids unitaire déclaré, l'ancien calcul prenait le nombre pour des
// grammes : le Canard Laqué facturait 1 g de canard, 105 kcal par personne.
// 585 recettes étaient dans ce cas avant la v5.0.5.
{
  const cp = sandbox();
  try {
    exec(cp, "ingredients_prix.js");
    const P = cp.INGREDIENTS_PRIX || cp.window.INGREDIENTS_PRIX || {};
    const resoudre = typeof cp.cleCanonique === "function" ? cp.cleCanonique : (x) => (x in P ? x : null);
    const grammes = cp.grammesComptes;
    const META = new Set(["nb", "label", "patons", "total", "unite"]);
    const enPoids = (v) => /\d\s*(g|ml|kg|l|cl|dl)\b/.test(v);
    const orphelines = new Map();
    if (typeof grammes === "function") {
      for (const k of cles) {
        const r = R[k];
        const tk = Object.keys(r).find((x) => x.startsWith("tableau") && Array.isArray(r[x]));
        if (!tk) continue;
        for (const [col, v] of Object.entries(r[tk][0] || {})) {
          if (META.has(col) || typeof v !== "string" || !v.trim() || enPoids(v)) continue;
          const c = resoudre(col);
          if (!c || !P[c] || P[c].prixUnite !== undefined) continue;
          const m = /^[~≈]?\s*([0-9]+(?:[.,][0-9]+)?)\s*(.*)$/.exec(v.replace(/[½¼¾]/g, "0.5"));
          if (!m) continue;
          if (grammes(c, parseFloat(m[1]), m[2]) === null)
            orphelines.set(c, (orphelines.get(c) || 0) + 1);
        }
      }
    }
    for (const [c, n] of orphelines)
      erreurs.push(`Ingrédient "${c}" compté en pièces dans ${n} recette(s) sans poids unitaire — son coût et ses calories seraient ignorés (ajouter POIDS_UNITAIRE ou POIDS_UNITE_NOMMEE)`);
  } catch (e) { avert.push(`poids unitaires non vérifiables (${e.message})`); }
}

// --- Rendus dédiés : colonnes lues vs colonnes existantes ------------------
// Une quarantaine de recettes ont leur propre fonction d'affichage dans
// tables.js. Si elle lit « l.tomates » alors que la table contient « tomate »,
// la fiche affiche « undefined » — sans erreur JS, donc en silence.
// (20 fiches étaient dans ce cas jusqu'à la v5.0.4, dont crêpes et cookies.)
try {
  const tables = readFileSync(join(ROOT, "js", "tables.js"), "utf8");
  const app = readFileSync(join(ROOT, "js", "app.js"), "utf8");
  const rendus = new Map();
  const compte = new Map();
  for (const m of tables.matchAll(/function (htmlTableau\w+Colonnes)\s*\(\s*(\w+)\s*\)\s*\{([\s\S]*?)\n\}/g)) {
    rendus.set(m[1], [...new Set([...m[3].matchAll(new RegExp("\\b" + m[2] + "\\.(\\w+)", "g"))].map((x) => x[1]))]);
    compte.set(m[1], (compte.get(m[1]) || 0) + 1);
  }
  // Un rendu déclaré deux fois : c'est la DERNIÈRE qui s'exécute, la première
  // devient du code mort. Piège vicieux — on corrige la mauvaise copie en
  // croyant avoir réglé le bug, et l'affichage ne bouge pas.
  for (const [nom, n] of compte)
    if (n > 1) erreurs.push(`${nom} est déclarée ${n} fois dans tables.js — seule la dernière s'exécute, les autres sont du code mort`);
  const vus = new Set();
  for (const m of app.matchAll(/recette\s*===\s*"([^"]+)"[\s\S]{0,400}?renduComplet\(\s*(htmlTableau\w+Colonnes)/g)) {
    const [, cle, rendu] = m;
    if (vus.has(cle + rendu)) continue; vus.add(cle + rendu);
    const r = R[cle], props = rendus.get(rendu);
    if (!r || !props) continue;
    const tk = Object.keys(r).find((x) => x.startsWith("tableau") && Array.isArray(r[x]));
    if (!tk) continue;
    const cols = new Set(r[tk].flatMap((l) => Object.keys(l)));
    const absentes = props.filter((p) => !cols.has(p));
    if (absentes.length)
      erreurs.push(`${cle} : ${rendu} lit ${absentes.map((x) => `"${x}"`).join(", ")} — colonne(s) absente(s) du tableau, la fiche affichera « undefined »`);
  }
} catch (e) { avert.push(`rendus dédiés non vérifiables (${e.message})`); }

// --- Rapport --------------------------------------------------------------
console.log(`🔎 ${cles.length} recettes vérifiées.`);
if (avert.length) { console.log(`\n⚠️  ${avert.length} avertissement(s) :`); avert.slice(0, 50).forEach((m) => console.log("   - " + m)); }
if (erreurs.length) {
  console.log(`\n❌ ${erreurs.length} erreur(s) :`);
  erreurs.slice(0, 100).forEach((m) => console.log("   - " + m));
  console.log("\n::error::Intégrité des données : au moins une erreur.");
  process.exit(1);
}
console.log("\n✅ Données cohérentes.");
