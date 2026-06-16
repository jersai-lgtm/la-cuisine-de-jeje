// =============================================================================
// Miniatures d'images — La Cuisine de Jéjé (appelé par tools/build.mjs)
// -----------------------------------------------------------------------------
// La grille de cartes chargeait les images en taille réelle (~400-500 Ko) alors
// qu'elles s'affichent en ~150-200px. On génère donc, au build, une miniature
// 400px (~30-50 Ko, ~90 % plus légère) par image de carte, et on réécrit le src
// des cartes vers thumbs/. Les FICHES, elles, gardent l'image pleine résolution
// (rendues en JS via getImagePath, non touchées ici).
// =============================================================================

import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

// Cible précise : les <img> des cartes statiques (lazy + decoding async).
const RX = /<img loading="lazy" decoding="async" src="(images\/[^"]+\.webp)"/g;

export async function genererMiniatures(html, root, dist) {
  // Normalise les quelques cartes recettes restées en <img src="images/x/…">
  // (sans lazy) → on leur ajoute loading/decoding pour qu'elles soient elles
  // aussi miniaturisées ET chargées en lazy.
  html = html.replace(/<img src="(images\/[a-z0-9]\/[^"]+\.webp)"/g,
    '<img loading="lazy" decoding="async" src="$1"');

  const set = new Set();
  let m;
  RX.lastIndex = 0;
  while ((m = RX.exec(html))) set.add(m[1]);
  const images = [...set].filter((p) => existsSync(join(root, p)));

  let i = 0, ok = 0;
  async function worker() {
    while (i < images.length) {
      const p = images[i++];
      const out = join(dist, "thumbs", p.replace(/^images\//, ""));
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

  // Réécrit le src des cartes vers la miniature (uniquement celles générées).
  const htmlOut = html.replace(RX, (full, p) => {
    const thumb = "thumbs/" + p.replace(/^images\//, "");
    return existsSync(join(dist, thumb)) ? full.replace('src="' + p + '"', 'src="' + thumb + '"') : full;
  });
  return { html: htmlOut, count: ok };
}
