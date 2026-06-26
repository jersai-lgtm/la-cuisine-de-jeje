// Audit : extrait les recettes "substantielles" ayant < 6 étapes -> tools/_cibles_audit.json
// Charge les fichiers js/recettes_<cat>.js dans un objet recettes isolé.
import fs from "fs";

const SUBSTANTIEL = new Set(["plats","healthy","soupes","entrees","pizzas","encas","brunch","glaces","desserts","salades","aperitifs","boulangerie"]);

const recettes = {};
const files = fs.readdirSync("js").filter(f => /^recettes_/.test(f) && f.endsWith(".js") && f !== "recettes_en.js" && f !== "recettes_batch.js");
for (const f of files) {
  const code = fs.readFileSync("js/" + f, "utf8");
  try {
    // Les fichiers font Object.assign(recettes, {...}); on injecte recettes + stubs.
    const fn = new Function("recettes", "window", "document", "Object_assign", code);
    fn(recettes, {}, { addEventListener(){}, readyState:"complete" });
  } catch (e) {
    console.log("⚠️ " + f + " : " + e.message.slice(0, 80));
  }
}

const cibles = [];
for (const [k, r] of Object.entries(recettes)) {
  if (!r || !Array.isArray(r.etapes)) continue;
  if (r.etapes.length >= 6) continue;
  if (!SUBSTANTIEL.has(r.cat)) continue;
  const tabKey = Object.keys(r).find(x => x.startsWith("tableau") && Array.isArray(r[x]));
  let ingr = [];
  if (tabKey && r[tabKey][0]) ingr = Object.keys(r[tabKey][0]).filter(x => x !== "nb" && x !== "patons");
  else if (r.ingredients && typeof r.ingredients === "object") ingr = Object.keys(r.ingredients);
  cibles.push({
    key: k, nom: r.nom, cat: r.cat, pays: r.pays || "", temps: r.temps || "", niveau: r.niveau || "",
    ingr, nbEt: r.etapes.length,
    etapesActuelles: r.etapes.map(e => (e.titre ? e.titre + " — " : "") + (e.detail || ""))
  });
}
fs.writeFileSync("tools/_cibles_audit.json", JSON.stringify(cibles, null, 0));
console.log("Fichiers chargés : " + Object.keys(recettes).length + " recettes au total.");
console.log("✅ Cibles (<6 étapes, cats substantielles) : " + cibles.length + " -> tools/_cibles_audit.json");
// récap par catégorie
const parCat = {};
cibles.forEach(c => parCat[c.cat] = (parCat[c.cat] || 0) + 1);
console.log(JSON.stringify(parCat));
