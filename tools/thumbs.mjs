// =============================================================================
// Miniatures d'images — La Cuisine de Jéjé (appelé par tools/build.mjs)
// -----------------------------------------------------------------------------
// La grille de cartes chargeait les images en taille réelle (~400-500 Ko) alors
// qu'elles s'affichent en ~150-200px. On génère donc, au build, une miniature
// 400px (~30-50 Ko, ~90 % plus légère) par image de recette, et on réécrit le
// src des cartes statiques vers thumbs/. Les cartes générées dynamiquement
// (app_recherche.js / miniCarte / plan repas) pointent vers thumbs/ au runtime
// avec repli sur l'image pleine (voir getThumbPath). Les FICHES gardent l'image
// pleine résolution (getImagePath, non touchées ici).
// =============================================================================

import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { chargerCatalogue, chargerImageExceptions, cheminImage } from "./recettes-data.mjs";

// Cible précise : les <img> des cartes statiques (lazy + decoding async).
const RX = /<img loading="lazy" decoding="async" src="(images\/[^"]+\.webp)"/g;

async function miniaturiser(images, root, dist) {
  let i = 0, ok = 0;
  async function worker() {
    while (i < images.length) {
      const p = images[i++];
      const out = join(dist, "thumbs", p.replace(/^images\//, ""));
      if (existsSync(out)) { ok++; continue; } // déjà générée
      mkdirSync(dirname(out), { recursive: true });
      try {
        await sharp(join(root, p))
          .resize(400, 400, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 68 })
          .toFile(out);
        ok++;
      } catch (e) { /* image illisible : on laisse l'originale */ }
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker)); // 8 en parallèle
  return ok;
}

export async function genererMiniatures(html, root, dist) {
  // Normalise les quelques cartes recettes restées en <img src="images/x/…">
  html = html.replace(/<img src="(images\/[a-z0-9]\/[^"]+\.webp)"/g,
    '<img loading="lazy" decoding="async" src="$1"');

  const set = new Set();
  let m;
  RX.lastIndex = 0;
  while ((m = RX.exec(html))) set.add(m[1]); // 1) images des cartes statiques

  // 2) + TOUTES les images de recettes du catalogue (cartes générées au runtime)
  try {
    const cat = chargerCatalogue(root);
    const exc = chargerImageExceptions(root);
    for (const [key, r] of Object.entries(cat)) set.add(cheminImage(key, r, exc));
  } catch (e) { /* catalogue illisible : on garde au moins les cartes statiques */ }

  const images = [...set].filter((p) => existsSync(join(root, p)));
  const ok = await miniaturiser(images, root, dist);

  // Réécrit le src des cartes STATIQUES vers la miniature (uniquement celles générées).
  const htmlOut = html.replace(RX, (full, p) => {
    const thumb = "thumbs/" + p.replace(/^images\//, "");
    return existsSync(join(dist, thumb)) ? full.replace('src="' + p + '"', 'src="' + thumb + '"') : full;
  });
  return { html: htmlOut, count: ok };
}
