// =============================================================================
// 🎯 objectifs.js — Objectif nutritionnel personnel
// -----------------------------------------------------------------------------
// L'utilisateur fixe un objectif (calories/jour + un focus : léger, protéiné…).
// Chaque fiche montre alors comment la recette s'y situe (part de l'objectif du
// jour, et si elle colle au focus). Réutilise le moteur nutrition existant.
// Stocké en local. Bilingue + thème clair/sombre.
// =============================================================================

(function () {
  const LS = "objectif_nutri";
  const EN = () => window.LANG === "en";
  const T = (fr, en) => (EN() ? en : fr);

  const lire = () => { try { return JSON.parse(localStorage.getItem(LS) || "{}") || {}; } catch (e) { return {}; } };
  const ecrire = (o) => { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} };

  const FOCUS = {
    equilibre: { fr: "Équilibré", en: "Balanced", e: "⚖️" },
    leger: { fr: "Léger", en: "Light", e: "🪶" },
    proteine: { fr: "Protéiné", en: "High-protein", e: "💪" },
    gourmand: { fr: "Gourmand", en: "Indulgent", e: "😋" },
  };

  // Nutrition par portion (réutilise calculerPrixCaloriesRecette).
  function nutriPortion(key) {
    const r = recettes[key];
    if (!r) return null;
    const tk = Object.keys(r).find((k) => k.startsWith("tableau") && Array.isArray(r[k]));
    if (!tk) return null;
    const base = r.base || 4;
    const ligne = r[tk].find((l) => l.nb === base || l.patons === base) || r[tk][0];
    if (!ligne || typeof calculerPrixCaloriesRecette !== "function") return null;
    const pc = calculerPrixCaloriesRecette(ligne);
    if (!pc) return null;
    return { cal: pc.cal != null ? Math.round(pc.cal / base) : null, prot: pc.prot != null ? Math.round(pc.prot / base) : null };
  }

  function rerenderFiche() {
    // Re-rendre la fiche ouverte pour rafraîchir le badge objectif.
    try {
      const inp = document.getElementById("fiche-personnes-input");
      const titre = document.querySelector("#modal-resultat .fiche-titre");
      if (inp && typeof onChangePersonnesFiche === "function") {
        // on déduit la clé via le bouton partager présent dans la fiche
        const b = document.querySelector('#modal-resultat [onclick^="partagerRecette("]');
        const m = b && b.getAttribute("onclick").match(/partagerRecette\('([^']+)'/);
        if (m && typeof choisirRecette === "function") { choisirRecette(m[1], parseInt(inp.value) || undefined); }
      }
    } catch (e) {}
  }

  // ---- Badge dans la fiche ----
  window.objectifFicheHTML = function (key) {
    const o = lire();
    const n = nutriPortion(key);
    const wrap = (inner) =>
      '<div class="fiche-section objectif-nutri" style="background:rgba(var(--w),.05);border:1px solid rgba(var(--w),.1);border-radius:14px;padding:13px 16px;margin:0 0 14px">' + inner + "</div>";

    if (!o.kcal && !o.focus) {
      // Pas d'objectif → invitation discrète à en définir un.
      return wrap(
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">' +
        '<span style="color:var(--text-2);font-size:14px">' + T("🎯 Fixe ton objectif nutritionnel", "🎯 Set your nutrition goal") + "</span>" +
        '<button type="button" onclick="ouvrirObjectifs()" style="background:rgba(var(--accent-rgb),.15);color:var(--accent);border:1px solid rgba(var(--accent-rgb),.5);border-radius:10px;padding:7px 13px;font-size:13px;font-weight:700;cursor:pointer">' + T("Définir", "Set") + "</button></div>"
      );
    }

    let parts = '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px">' +
      '<h2 class="fiche-section-titre" style="margin:0">' + T("🎯 Ton objectif", "🎯 Your goal") + "</h2>" +
      '<button type="button" onclick="ouvrirObjectifs()" style="background:none;border:none;color:var(--text-3);font-size:13px;cursor:pointer;text-decoration:underline">' + T("modifier", "edit") + "</button></div>";

    // Part de l'objectif calorique du jour
    if (o.kcal && n && n.cal != null) {
      const pct = Math.round((n.cal / o.kcal) * 100);
      const col = pct <= 35 ? "#4caf50" : pct <= 55 ? "#ffb300" : "#ff6b6b";
      parts += '<div style="margin-top:8px;color:var(--text);font-size:14px">' +
        T("Cette portion = ", "This serving = ") + "<b>" + n.cal + " kcal</b> " +
        T("soit ~", "≈ ") + "<b style=\"color:" + col + "\">" + pct + "%</b> " + T("de ton objectif du jour", "of your daily goal") + " (" + o.kcal + " kcal/j).</div>" +
        '<div style="height:7px;border-radius:99px;background:rgba(var(--w),.12);margin-top:7px;overflow:hidden">' +
        '<div style="height:100%;width:' + Math.min(100, pct) + '%;background:' + col + '"></div></div>';
    }

    // Adéquation au focus
    if (o.focus && n) {
      let msg = "";
      if (o.focus === "leger") msg = (n.cal != null && n.cal <= 500) ? T("✅ Colle à ton objectif léger", "✅ Fits your light goal") : T("⚠️ Plutôt copieux pour un objectif léger", "⚠️ A bit rich for a light goal");
      else if (o.focus === "proteine") msg = (n.prot != null && n.prot >= 20) ? T("💪 Riche en protéines, parfait", "💪 High in protein, perfect") : T("ℹ️ Peu protéiné", "ℹ️ Low in protein");
      else if (o.focus === "gourmand") msg = T("😋 Profite, c'est permis !", "😋 Enjoy, you've earned it!");
      else msg = T("⚖️ À intégrer dans une journée équilibrée", "⚖️ Fits a balanced day");
      if (msg) parts += '<div style="margin-top:8px;color:var(--text-2);font-size:13.5px">' + msg + "</div>";
    }
    return wrap(parts);
  };

  // ---- Modale de réglage ----
  window.ouvrirObjectifs = function () {
    const o = lire();
    let modal = document.getElementById("modal-objectifs");
    if (modal) modal.remove();
    modal = document.createElement("div");
    modal.id = "modal-objectifs";
    modal.style.cssText = "position:fixed;inset:0;z-index:9100;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:18px";
    const kcals = [1500, 1800, 2000, 2200, 2500];
    const btnK = kcals.map((k) => '<button type="button" data-kcal="' + k + '" class="obj-k" style="' + chip(o.kcal === k) + '">' + k + "</button>").join("") +
      '<button type="button" data-kcal="0" class="obj-k" style="' + chip(!o.kcal) + '">' + T("Aucun", "None") + "</button>";
    const btnF = Object.keys(FOCUS).map((f) => '<button type="button" data-focus="' + f + '" class="obj-f" style="' + chip(o.focus === f) + '">' + FOCUS[f].e + " " + T(FOCUS[f].fr, FOCUS[f].en) + "</button>").join("") +
      '<button type="button" data-focus="" class="obj-f" style="' + chip(!o.focus) + '">' + T("Aucun", "None") + "</button>";
    modal.innerHTML =
      '<div style="background:var(--panel-solid,#1a1a2e);color:var(--text);border:1px solid rgba(var(--w),.12);border-radius:18px;max-width:420px;width:100%;padding:20px;font-family:system-ui,sans-serif;max-height:90vh;overflow:auto">' +
      '<div style="display:flex;align-items:center;justify-content:space-between"><h2 style="margin:0;font-size:19px">' + T("🎯 Mon objectif nutritionnel", "🎯 My nutrition goal") + "</h2>" +
      '<button type="button" id="obj-close" style="background:rgba(var(--w),.1);color:var(--text);border:none;border-radius:50%;width:34px;height:34px;font-size:15px;cursor:pointer">✕</button></div>' +
      '<p style="color:var(--text-2);font-size:14px;margin:12px 0 6px">' + T("Calories par jour", "Calories per day") + "</p>" +
      '<div style="display:flex;flex-wrap:wrap;gap:8px">' + btnK + "</div>" +
      '<p style="color:var(--text-2);font-size:14px;margin:16px 0 6px">' + T("Mon focus", "My focus") + "</p>" +
      '<div style="display:flex;flex-wrap:wrap;gap:8px">' + btnF + "</div>" +
      '<button type="button" id="obj-save" style="width:100%;margin-top:18px;background:linear-gradient(90deg,var(--accent),#ff9330);color:#1a0e14;border:none;border-radius:12px;padding:12px;font-size:15px;font-weight:800;cursor:pointer">' + T("Enregistrer", "Save") + "</button></div>";
    document.body.appendChild(modal);

    let selK = o.kcal || 0, selF = o.focus || "";
    modal.querySelectorAll(".obj-k").forEach((b) => b.addEventListener("click", () => { selK = parseInt(b.dataset.kcal) || 0; modal.querySelectorAll(".obj-k").forEach((x) => x.style.cssText = chip(false)); b.style.cssText = chip(true); }));
    modal.querySelectorAll(".obj-f").forEach((b) => b.addEventListener("click", () => { selF = b.dataset.focus; modal.querySelectorAll(".obj-f").forEach((x) => x.style.cssText = chip(false)); b.style.cssText = chip(true); }));
    const fermer = () => modal.remove();
    modal.querySelector("#obj-close").addEventListener("click", fermer);
    modal.addEventListener("click", (e) => { if (e.target === modal) fermer(); });
    modal.querySelector("#obj-save").addEventListener("click", () => {
      ecrire({ kcal: selK || null, focus: selF || null });
      fermer();
      if (typeof afficherToast === "function") afficherToast(T("🎯 Objectif enregistré !", "🎯 Goal saved!"));
      // Propose directement des recettes qui collent à l'objectif (zone « De quoi t'as envie »).
      if (typeof window.proposerSelonObjectif === "function") window.proposerSelonObjectif();
    });
  };

  function chip(actif) {
    return "border-radius:999px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid " +
      (actif ? "var(--accent)" : "rgba(var(--w),.2)") + ";background:" + (actif ? "rgba(var(--accent-rgb),.18)" : "transparent") +
      ";color:" + (actif ? "var(--accent)" : "var(--text)") + ";font-family:system-ui,sans-serif";
  }
})();
