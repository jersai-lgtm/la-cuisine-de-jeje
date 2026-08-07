// =============================================================================
// 🖨️ MODULE : RECETTE_IMPRESSION (v263)
// =============================================================================
// Sort une fiche recette propre sur une page A4 : ingrédients pour le nombre de
// convives affiché, étapes numérotées avec de la place pour cocher, et rien
// d'autre. Pensé pour être posé sur le plan de travail — donc gros caractères,
// fond blanc, aucune image de fond qui vide une cartouche d'encre.
// Même principe que imprimerCourses() : une fenêtre dédiée, puis window.print().
// L'utilisateur peut aussi « Enregistrer en PDF » depuis le dialogue du navigateur.
// =============================================================================

function imprimerRecette(nom, personnes) {
  const data = (typeof recettes !== "undefined") ? recettes[nom] : null;
  if (!data) return;

  const echap = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  const nb = Math.max(1, Math.min(15, parseInt(personnes, 10) || data.base || 4));

  // --- Ingrédients : on relit la ligne du tableau correspondant au nombre de convives
  const tabKey = Object.keys(data).find((k) => k.startsWith("tableau") && Array.isArray(data[k]));
  const lignes = tabKey ? data[tabKey] : null;
  const ligne = lignes ? (lignes.find((l) => l.nb === nb) || lignes[0]) : null;
  const META = new Set(["nb", "label", "patons", "total"]);

  let ingHtml = "";
  if (ligne) {
    const items = Object.entries(ligne)
      .filter(([k, v]) => !META.has(k) && v != null && v !== "" && v !== "—")
      .map(([k, v]) => {
        const brut = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[k]) ? INGREDIENTS_LABELS[k] : k;
        // On garde l'emoji du libellé : imprimé, il aide à repérer la ligne d'un coup d'œil.
        return `<li><span class="ing-n">${echap(brut)}</span><span class="ing-q">${echap(v)}</span></li>`;
      });
    if (items.length) ingHtml = `<ul class="ings">${items.join("")}</ul>`;
  } else if (Array.isArray(data.ingredientsFixes)) {
    // Cocktails & assimilés : quantités fixes, pas de tableau par convive.
    ingHtml = `<ul class="ings">${data.ingredientsFixes
      .map((i) => `<li><span class="ing-n">${echap(i.nom || i)}</span><span class="ing-q">${echap(i.qte || "")}</span></li>`)
      .join("")}</ul>`;
  }

  // --- Étapes : trois formats coexistent dans le catalogue (tableau [icone,titre,detail],
  //     tableau [icone,texte], ou objet {titre,detail}) — on les normalise ici.
  const etapes = (Array.isArray(data.etapes) ? data.etapes : []).map((e) => {
    if (Array.isArray(e)) {
      const parts = e.slice(1).filter(Boolean);
      return parts.length > 1 ? { titre: parts[0], detail: parts.slice(1).join(" ") } : { titre: "", detail: parts[0] || "" };
    }
    if (e && typeof e === "object") return { titre: e.titre || "", detail: e.detail || e.texte || "" };
    return { titre: "", detail: String(e || "") };
  }).filter((e) => e.titre || e.detail);

  const etapesHtml = etapes.map((e, i) => `
      <li>
        <span class="num">${i + 1}</span>
        <div class="etape-txt">
          ${e.titre ? `<strong>${echap(e.titre)}</strong>` : ""}
          ${e.detail ? `<span>${echap(e.detail)}</span>` : ""}
        </div>
      </li>`).join("");

  const titre = echap(data.nom || nom);
  const meta = [data.temps, data.niveau, `${nb} ${nb > 1 ? "personnes" : "personne"}`]
    .filter(Boolean).map((m) => `<span>${echap(m)}</span>`).join("");

  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>${titre}</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body { font-family: Georgia, "Times New Roman", serif; color: #111; background: #fff;
         margin: 0; font-size: 12pt; line-height: 1.45; }
  h1 { font-size: 24pt; margin: 0 0 4px; line-height: 1.15; }
  .desc { font-style: italic; color: #444; margin: 0 0 10px; }
  .meta { display: flex; gap: 14px; flex-wrap: wrap; font-size: 10.5pt; color: #555;
          border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 6px 0; margin-bottom: 14px; }
  h2 { font-size: 13pt; text-transform: uppercase; letter-spacing: .06em;
       margin: 0 0 8px; padding-bottom: 3px; border-bottom: 2px solid #111; }
  .ings { list-style: none; padding: 0; margin: 0 0 18px;
          column-count: 2; column-gap: 22px; }
  .ings li { display: flex; justify-content: space-between; gap: 8px;
             break-inside: avoid; padding: 3px 0; border-bottom: 1px dotted #ccc; }
  .ing-q { font-variant-numeric: tabular-nums; white-space: nowrap; color: #333; }
  ol.etapes { list-style: none; padding: 0; margin: 0; counter-reset: e; }
  ol.etapes li { display: flex; gap: 10px; break-inside: avoid; margin-bottom: 11px; }
  .num { flex: 0 0 22px; height: 22px; border: 1.5px solid #111; border-radius: 50%;
         text-align: center; line-height: 19px; font-size: 11pt; font-weight: bold; }
  .etape-txt strong { display: block; }
  .pied { margin-top: 18px; padding-top: 6px; border-top: 1px solid #ccc;
          font-size: 9pt; color: #777; display: flex; justify-content: space-between; }
  @media print { .noprint { display: none !important; } }
  /* Dans le flux et non en position fixe : sur un écran étroit, un bouton
     flottant vient se poser sur le titre. */
  .noprint { text-align: right; margin-bottom: 10px; }
  .noprint button { font: inherit; padding: 8px 14px; cursor: pointer;
                    border: 1px solid #111; border-radius: 6px; background: #fff; }
</style></head>
<body>
  <div class="noprint"><button onclick="window.print()">Imprimer</button></div>
  <h1>${titre}</h1>
  ${data.description ? `<p class="desc">${echap(data.description)}</p>` : ""}
  <div class="meta">${meta}</div>
  ${ingHtml ? `<h2>Ingrédients</h2>${ingHtml}` : ""}
  ${etapesHtml ? `<h2>Préparation</h2><ol class="etapes">${etapesHtml}</ol>` : ""}
  <div class="pied"><span>La Cuisine de Jéjé</span><span>${new Date().toLocaleDateString("fr-FR")}</span></div>
</body></html>`;

  const win = window.open("", "_blank");
  if (!win) { alert("Autorise les fenêtres pop-up pour imprimer la recette."); return; }
  win.document.write(html);
  win.document.close();
  // Laisser le temps au rendu (polices, mise en colonnes) avant d'ouvrir le dialogue.
  win.onload = () => setTimeout(() => win.print(), 250);
}
