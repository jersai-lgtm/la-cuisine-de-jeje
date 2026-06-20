// =============================================================================
// 📤 PARTAGE DE RECETTE — La Cuisine de Jéjé
// -----------------------------------------------------------------------------
// Partage natif (Web Share API) du lien de la page SEO de la recette
// (https://…/recette/<clé>.html → joli aperçu grâce aux balises OpenGraph).
// Replis : copie du lien dans le presse-papier, puis prompt.
// =============================================================================

(function () {
  const BASE = "https://jersai-lgtm.github.io/la-cuisine-de-jeje";

  window.partagerRecette = async function (key) {
    if (!key) return;
    const nom = (typeof getNomRecette === "function" ? getNomRecette(key) : "")
      || (typeof recettes !== "undefined" && recettes[key] && recettes[key].nom)
      || "cette recette";
    const url = `${BASE}/recette/${encodeURIComponent(key)}.html`;
    const data = {
      title: `${nom} — La Cuisine de Jéjé`,
      text: `Regarde cette recette : ${nom} 🍽️`,
      url,
    };

    // 1) Partage natif (mobile surtout)
    if (navigator.share) {
      try { await navigator.share(data); return; }
      catch (e) { if (e && e.name === "AbortError") return; /* sinon on tente un repli */ }
    }
    // 2) Repli : copie du lien
    try {
      await navigator.clipboard.writeText(url);
      if (typeof afficherToast === "function") afficherToast("🔗 Lien de la recette copié !");
      return;
    } catch (e) { /* clipboard indisponible */ }
    // 3) Dernier repli
    window.prompt("Copie ce lien pour partager la recette :", url);
  };

  // ===========================================================================
  // 📸 Partage IMAGE : génère une belle carte (photo + titre + infos + marque)
  // prête à poster en story/feed Instagram. Partage natif du fichier si possible
  // (mobile), sinon téléchargement du PNG. Format portrait 1080×1350.
  // ===========================================================================
  const EN = () => window.LANG === "en";
  const toast = (fr, en) => { if (typeof afficherToast === "function") afficherToast(EN() ? en : fr); };

  function loadImg(src) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });
  }
  // Dessine une image en « cover » (remplit la zone, recadre le surplus).
  function drawCover(ctx, img, x, y, w, h) {
    const ir = img.width / img.height, zr = w / h;
    let sw, sh, sx, sy;
    if (ir > zr) { sh = img.height; sw = sh * zr; sx = (img.width - sw) / 2; sy = 0; }
    else { sw = img.width; sh = sw / zr; sx = 0; sy = (img.height - sh) / 2; }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }
  function wrap(ctx, texte, maxW) {
    const mots = texte.split(" "), lignes = [];
    let cur = "";
    for (const m of mots) {
      const test = cur ? cur + " " + m : m;
      if (ctx.measureText(test).width > maxW && cur) { lignes.push(cur); cur = m; }
      else cur = test;
    }
    if (cur) lignes.push(cur);
    return lignes.slice(0, 3); // 3 lignes max
  }
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function pill(ctx, x, y, texte) {
    ctx.font = "600 36px 'Segoe UI',system-ui,sans-serif";
    const w = ctx.measureText(texte).width + 56, h = 64;
    ctx.fillStyle = "rgba(255,255,255,.92)";
    roundRect(ctx, x, y, w, h, h / 2); ctx.fill();
    ctx.fillStyle = "#1b1922"; ctx.textBaseline = "middle";
    ctx.fillText(texte, x + 28, y + h / 2 + 2);
    ctx.textBaseline = "alphabetic";
  }

  window.partagerImageRecette = async function (key) {
    if (!key) return;
    const r = (typeof recettes !== "undefined") ? recettes[key] : null;
    const nom = (typeof getNomRecette === "function" ? getNomRecette(key) : "") || (r && r.nom) || "Recette";
    toast("🎨 Création de l'image…", "🎨 Creating the image…");

    const W = 1080, H = 1350;
    const cv = document.createElement("canvas");
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#14121a"; ctx.fillRect(0, 0, W, H);

    const src = (typeof getImagePath === "function") ? getImagePath(key)
      : ("images/" + (key[0] || "_").toLowerCase() + "/" + key + ".webp");
    try { drawCover(ctx, await loadImg(src), 0, 0, W, H); } catch (e) { /* fond uni si pas d'image */ }

    // Dégradé bas pour lisibilité du texte
    const g = ctx.createLinearGradient(0, H * 0.42, 0, H);
    g.addColorStop(0, "rgba(10,8,14,0)");
    g.addColorStop(0.55, "rgba(10,8,14,.72)");
    g.addColorStop(1, "rgba(10,8,14,.96)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    pill(ctx, 40, 40, "🍳 La Cuisine de Jéjé");

    // Titre (drapeau pays + emoji + nom), 1 à 3 lignes
    const dra = (typeof drapeauTexte === "function") ? "" : ""; // drapeau emoji difficile en canvas, on garde l'emoji plat
    const titre = ((r && r.emoji) || "🍽️") + " " + nom;
    ctx.fillStyle = "#fff";
    ctx.font = "bold 72px 'Segoe UI',system-ui,sans-serif";
    const lignes = wrap(ctx, titre, W - 120);
    let y = H - 300 - (lignes.length - 1) * 84;
    lignes.forEach((l) => { ctx.fillText(l, 60, y); y += 84; });

    // Méta : temps + niveau
    ctx.font = "42px 'Segoe UI',system-ui,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.92)";
    const meta = ["⏱ " + ((r && r.temps) || ""), (r && r.niveau) || ""].filter((s) => s.trim()).join("    ");
    if (meta) ctx.fillText(meta, 60, y + 16);

    // Pied : URL
    ctx.font = "34px 'Segoe UI',system-ui,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.82)";
    ctx.fillText("jersai-lgtm.github.io/la-cuisine-de-jeje", 60, H - 54);

    const blob = await new Promise((res) => cv.toBlob(res, "image/jpeg", 0.92));
    if (!blob) { toast("❌ Image impossible", "❌ Could not create image"); return; }
    const file = new File([blob], key + "-cuisine-jeje.jpg", { type: "image/jpeg" });

    // Partage natif du fichier (mobile)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: nom,
          text: (EN() ? "Recipe: " : "Recette : ") + nom + " 🍽️ — La Cuisine de Jéjé",
        });
        return;
      } catch (e) { if (e && e.name === "AbortError") return; }
    }
    // Repli : téléchargement du PNG
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = file.name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    toast("📸 Image enregistrée !", "📸 Image saved!");
  };
})();
