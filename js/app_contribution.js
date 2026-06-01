/* ============================================================
   CONTRIBUTION — Phase 1 : recettes PERSONNELLES (privées)
   - Stockées dans userProfile.recettesPerso = { key: {...recette...} }
   - Fusionnées dans le catalogue `recettes` au chargement (cet utilisateur uniquement)
   - Cartes injectées dynamiquement dans #section-cartes
   La structure utilise fixe:true + ingredientsFixes (format simple, pas d'échelle/coût).
   ============================================================ */

// --- Fusionne les recettes perso dans le catalogue global + injecte les cartes ---
window.fusionnerRecettesPerso = function () {
  if (typeof recettes === "undefined") return;
  const perso = (window.userProfile && window.userProfile.recettesPerso) || {};
  Object.keys(perso).forEach(k => { recettes[k] = perso[k]; });
  injecterCartesPerso();
};

// --- Injecte (ou ré-injecte) les cartes des recettes perso dans le catalogue ---
window.injecterCartesPerso = function () {
  const section = document.getElementById("section-cartes");
  if (!section) return;
  // Retirer les anciennes cartes perso (évite les doublons à chaque maj)
  section.querySelectorAll(".carte[data-perso='1']").forEach(c => c.remove());

  const perso = (window.userProfile && window.userProfile.recettesPerso) || {};
  Object.entries(perso).forEach(([key, r]) => {
    const carte = document.createElement("div");
    carte.className = "carte";
    carte.setAttribute("data-perso", "1");
    carte.setAttribute("data-cat", r.cat || "plats");
    carte.setAttribute("data-pays", r.pays || "france");
    carte.setAttribute("onclick", `ouvrirFiche('${key}', null)`);
    carte.innerHTML =
      `<img src="${r.image || "images/" + key + ".webp"}" alt="${r.nom || key}" onerror="this.style.display='none'">
      <span class="carte-badge-perso" title="Ta recette perso">👤 Perso</span>
      <div class="carte-info">
        <h2>${r.emoji || "🍽️"} ${r.nom || key}</h2>
        <p>⏱ ${r.temps || ""}${r.niveau ? " • " + r.niveau : ""}</p>
      </div>`;
    section.appendChild(carte);
  });

  // Réappliquer les badges visuels (nutri, saison, note communauté…)
  try { if (typeof appliquerPreferencesVisuelles === "function") appliquerPreferencesVisuelles(); } catch (e) {}
  try { if (typeof appliquerBadgeEtoilesCartes === "function") appliquerBadgeEtoilesCartes(); } catch (e) {}
};

// --- Ouvrir / fermer le modal de contribution ---
window.ouvrirContribution = function () {
  if (!window.userProfile) {
    if (typeof afficherToast === "function") afficherToast("⚠️ Connecte-toi pour ajouter une recette");
    return;
  }
  const m = document.getElementById("modal-contribution");
  if (!m) return;
  m.style.display = "flex";
  contribReset();
  contribAfficherMesRecettes();
};
window.fermerContribution = function () {
  const m = document.getElementById("modal-contribution");
  if (m) m.style.display = "none";
};

function contribReset() {
  ["c-nom", "c-emoji", "c-temps", "c-pays", "c-desc", "c-ingredients", "c-etapes"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  const cat = document.getElementById("c-cat"); if (cat) cat.value = "plats";
  const pays = document.getElementById("c-pays"); if (pays) pays.value = "france";
  const niv = document.getElementById("c-niveau"); if (niv) niv.value = "⭐ Facile";
}

// --- Soumettre une recette perso ---
window.soumettreContribution = async function () {
  if (!window.userProfile) { if (typeof afficherToast === "function") afficherToast("⚠️ Connecte-toi d'abord"); return; }

  const val = id => (document.getElementById(id)?.value || "").trim();
  const nom = val("c-nom");
  if (!nom) { afficherToast("⚠️ Donne un nom à ta recette"); return; }

  const ingrTxt = val("c-ingredients");
  const etapesTxt = val("c-etapes");
  if (!ingrTxt) { afficherToast("⚠️ Ajoute au moins un ingrédient"); return; }
  if (!etapesTxt) { afficherToast("⚠️ Ajoute au moins une étape"); return; }

  // Ingrédients : 1 ligne = "Nom : quantité" (ou "Nom - quantité", ou juste "Nom")
  const ingredientsFixes = ingrTxt.split("\n").map(l => l.trim()).filter(Boolean).map(l => {
    let i = l.indexOf(":");
    if (i < 0) { const j = l.indexOf(" - "); if (j >= 0) { return [l.slice(0, j).trim(), l.slice(j + 3).trim()]; } }
    if (i >= 0) return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    return [l, ""];
  });

  // Étapes : 1 ligne = 1 étape
  const etapes = etapesTxt.split("\n").map(l => l.trim()).filter(Boolean).map((l, i) => ({
    icone: (i + 1) + "️⃣", titre: "", detail: l, badge: null
  }));

  const key = "perso_" + Date.now();
  const recette = {
    cat: val("c-cat") || "plats",
    pays: val("c-pays") || "france",
    base: 4,
    temps: val("c-temps") || "—",
    niveau: document.getElementById("c-niveau")?.value || "⭐ Facile",
    emoji: val("c-emoji") || "🍽️",
    description: val("c-desc"),
    nom,
    perso: true,
    fixe: true,
    ingredients: {},
    ingredientsFixes,
    etapes,
    dateAjout: new Date().toISOString().slice(0, 10)
  };

  if (!window.userProfile.recettesPerso) window.userProfile.recettesPerso = {};
  window.userProfile.recettesPerso[key] = recette;

  // Sauvegarde Firebase (on réécrit tout l'objet recettesPerso)
  try {
    if (window.currentUser && typeof _db !== "undefined" && _db) {
      await _db.collection("utilisateurs").doc(window.currentUser.uid)
        .set({ recettesPerso: window.userProfile.recettesPerso }, { merge: true });
    }
  } catch (e) { console.warn("Sauvegarde recette perso échouée :", e); }

  fusionnerRecettesPerso();
  if (typeof afficherToast === "function") afficherToast("✅ Recette ajoutée à tes recettes perso !");
  contribReset();
  contribAfficherMesRecettes();
};

// --- Liste "Mes recettes perso" dans le modal ---
window.contribAfficherMesRecettes = function () {
  const box = document.getElementById("c-mes-recettes");
  if (!box) return;
  const perso = (window.userProfile && window.userProfile.recettesPerso) || {};
  const cles = Object.keys(perso);
  if (cles.length === 0) {
    box.innerHTML = `<p class="contrib-vide">Aucune recette perso pour l'instant. Crée la première ! 👆</p>`;
    return;
  }
  box.innerHTML = cles.map(k => {
    const r = perso[k];
    return `<div class="contrib-item">
      <span class="contrib-item-nom">${r.emoji || "🍽️"} ${r.nom || k}</span>
      <span class="contrib-item-actions">
        <button onclick="fermerContribution();ouvrirFiche('${k}', null)" title="Voir la fiche">👁️</button>
        <button onclick="supprimerRecettePerso('${k}')" title="Supprimer">🗑️</button>
      </span>
    </div>`;
  }).join("");
};

// --- Supprimer une recette perso ---
window.supprimerRecettePerso = async function (key) {
  if (!window.userProfile || !window.userProfile.recettesPerso) return;
  let ok = true;
  if (typeof confirmer === "function") ok = await confirmer("Supprimer définitivement cette recette perso ?", { titre: "🗑️ Supprimer" });
  else ok = window.confirm("Supprimer cette recette perso ?");
  if (!ok) return;

  delete window.userProfile.recettesPerso[key];
  if (typeof recettes !== "undefined") delete recettes[key];

  try {
    if (window.currentUser && typeof _db !== "undefined" && _db) {
      await _db.collection("utilisateurs").doc(window.currentUser.uid)
        .set({ recettesPerso: window.userProfile.recettesPerso }, { merge: true });
    }
  } catch (e) { console.warn("Suppression recette perso échouée :", e); }

  injecterCartesPerso();
  contribAfficherMesRecettes();
  if (typeof afficherToast === "function") afficherToast("🗑️ Recette supprimée");
};

// Fusion automatique au chargement / à chaque mise à jour du profil
window.addEventListener("profilMisAJour", function () {
  try { fusionnerRecettesPerso(); } catch (e) {}
});
