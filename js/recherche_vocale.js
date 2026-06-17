// =============================================================================
// 🎤 RECHERCHE VOCALE — dicter sa recherche (Web Speech API)
// -----------------------------------------------------------------------------
// Ajoute un micro dans la barre de recherche : on parle, le texte se remplit et
// la recherche se déclenche. Pratique quand on a les mains occupées. Dégradé
// gracieux : si le navigateur ne supporte pas la reconnaissance vocale, le micro
// n'apparaît pas. Nécessite HTTPS (OK en prod) ou localhost.
// =============================================================================

(function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let reco = null, ecoute = false;

  function injecterStyle() {
    if (document.getElementById("search-mic-style")) return;
    const st = document.createElement("style");
    st.id = "search-mic-style";
    st.textContent =
      "#search-mic{background:rgba(255,255,255,.1);border:none;color:#aaa;border-radius:50%;width:28px;height:28px;" +
      "font-size:14px;flex-shrink:0;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;transition:background .15s,color .15s}" +
      "#search-mic:hover{background:var(--accent,#ff4d88);color:#fff}" +
      "#search-mic.ecoute{background:var(--accent,#ff4d88);color:#fff;animation:micPulse 1s ease-in-out infinite}" +
      "@keyframes micPulse{0%,100%{box-shadow:0 0 0 0 rgba(var(--accent-rgb,255,77,136),.5)}50%{box-shadow:0 0 0 7px rgba(var(--accent-rgb,255,77,136),0)}}" +
      "#search-mic:focus-visible{outline:2px solid var(--accent-soft,#ff8fb3);outline-offset:2px}";
    document.head.appendChild(st);
  }

  function arreter() { try { if (reco) reco.stop(); } catch (e) {} }

  function demarrer() {
    if (!SR) return;
    if (ecoute) { arreter(); return; }
    const input = document.getElementById("search-input");
    const btn = document.getElementById("search-mic");
    reco = new SR();
    reco.lang = "fr-FR";
    reco.interimResults = true;
    reco.maxAlternatives = 1;
    reco.continuous = false;
    reco.onstart = () => { ecoute = true; if (btn) btn.classList.add("ecoute"); if (input) { input.removeAttribute("readonly"); input.placeholder = "🎤 Parle…"; } };
    const fin = () => { ecoute = false; if (btn) btn.classList.remove("ecoute"); if (input) input.placeholder = "Rechercher une recette, ingrédient, cocktail..."; };
    reco.onerror = fin;
    reco.onend = fin;
    reco.onresult = (e) => {
      let txt = "";
      for (const r of e.results) txt += r[0].transcript;
      txt = txt.trim();
      if (!input) return;
      input.value = txt;
      const clr = document.getElementById("search-clear");
      if (clr) clr.style.display = txt ? "" : "none";
      if (typeof rechercherRecette === "function") rechercherRecette(txt);
      // À la fin (résultat définitif), on laisse les suggestions ouvertes ; l'utilisateur valide/clique.
    };
    try { reco.start(); } catch (e) { fin(); }
  }
  window.demarrerRechercheVocale = demarrer;

  function injecter() {
    if (!SR) return;                         // navigateur sans reconnaissance vocale → pas de micro
    if (document.getElementById("search-mic")) return;
    const bar = document.querySelector(".search-bar");
    if (!bar) return;
    injecterStyle();
    const btn = document.createElement("button");
    btn.id = "search-mic";
    btn.type = "button";
    btn.title = "Recherche vocale";
    btn.setAttribute("aria-label", "Recherche vocale — dicter ta recherche");
    btn.textContent = "🎤";
    btn.addEventListener("click", demarrer);
    const clr = document.getElementById("search-clear");
    bar.insertBefore(btn, clr || document.getElementById("search-suggestions") || null);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", injecter);
  else injecter();
})();
