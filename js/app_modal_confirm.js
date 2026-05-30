// =============================================================================
// 📦 MODULE : MODAL_CONFIRM
// =============================================================================
// Extrait de app.js pour modulariser l'architecture (v258).
// Ce fichier est chargé APRÈS app.js dans index.html.
// Les fonctions ici sont globales (var/function hoistées) et peuvent
// utiliser les constantes/utilitaires définis dans app.js.
// =============================================================================

// =============================================================================
// ✋ MODAL DE CONFIRMATION CUSTOM v250
// =============================================================================
// Remplace le confirm() natif qui affichait obligatoirement "domaine.com indique"
// Usage : const ok = await confirmer("Tu es sûr ?");
// =============================================================================
window.confirmer = function(message, options = {}) {
  const {
    titre = "Confirmation",
    boutonOui = "Confirmer",
    boutonNon = "Annuler",
    dangereux = true, // si true, le bouton OUI est rouge
  } = options;
  
  return new Promise((resolve) => {
    // Créer la modal
    const overlay = document.createElement("div");
    overlay.className = "modal-confirm-overlay visible";
    overlay.innerHTML = `
      <div class="modal-confirm-box">
        <div class="modal-confirm-titre">${titre}</div>
        <div class="modal-confirm-message">${message}</div>
        <div class="modal-confirm-actions">
          <button class="modal-confirm-non">${boutonNon}</button>
          <button class="modal-confirm-oui ${dangereux ? "danger" : ""}">${boutonOui}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    
    // Animation d'entrée (force le reflow)
    void overlay.offsetWidth;
    overlay.classList.add("animate-in");
    
    const cleanup = (resultat) => {
      overlay.classList.remove("animate-in");
      setTimeout(() => overlay.remove(), 200);
      resolve(resultat);
    };
    
    overlay.querySelector(".modal-confirm-non").onclick = () => cleanup(false);
    overlay.querySelector(".modal-confirm-oui").onclick = () => cleanup(true);
    // Clic en dehors = annuler
    overlay.onclick = (e) => { if (e.target === overlay) cleanup(false); };
    // Touche Échap = annuler
    const escHandler = (e) => {
      if (e.key === "Escape") {
        cleanup(false);
        document.removeEventListener("keydown", escHandler);
      }
    };
    document.addEventListener("keydown", escHandler);
  });
};

