// =============================================================================
// 📅 MODULE : AGENDA (v263)
// -----------------------------------------------------------------------------
// « Planifier » une recette (ou un rappel courses) dans l'agenda du téléphone :
//   • bouton 📅 sur la fiche recette  → événement pré-rempli (date + repas)
//   • bouton 📅 sur la liste de courses → rappel « faire les courses »
// Deux sorties, AUCUN compte ni autorisation nécessaires :
//   1. Google Agenda : lien « template » officiel (ouvre l'appli Agenda sur
//      Android avec titre/date/description déjà remplis — il n'y a qu'à valider)
//   2. Fichier .ics : format universel (Apple Calendar, Outlook, etc.)
// =============================================================================

(function () {
  const APP_URL = "https://jersai-lgtm.github.io/la-cuisine-de-jeje/";
  const MOMENTS = [
    { id: "matin",     label: "Matin",       h: 9,  m: 0 },
    { id: "midi",      label: "Midi",        h: 12, m: 0 },
    { id: "apresmidi", label: "Après-midi",  h: 17, m: 0 },
    { id: "soir",      label: "Soir",        h: 19, m: 30 },
  ];
  let ctx = null; // { type: "recette"|"courses", cle, nom, desc, dureeMin }

  const pad = (n) => String(n).padStart(2, "0");
  // Format « flottant » local YYYYMMDDTHHMMSS (sans Z : l'agenda garde l'heure locale)
  const fmtLocal = (d) => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00";

  // "1h30", "45 min", "2h30 + marinade" → minutes actives (défaut 90, borné 30-240)
  function dureeDepuisTemps(temps) {
    const t = String(temps || "");
    let mins = 0;
    const mh = t.match(/(\d+)\s*h\s*(\d+)?/i);
    const mm = t.match(/(\d+)\s*min/i);
    if (mh) mins = (parseInt(mh[1]) || 0) * 60 + (parseInt(mh[2] || "0") || 0);
    else if (mm) mins = parseInt(mm[1]) || 0;
    if (!mins) mins = 90;
    return Math.max(30, Math.min(240, mins));
  }

  function nomRecette(cle) {
    if (typeof getNomRecette === "function") { try { return getNomRecette(cle); } catch (e) {} }
    return (typeof recettes !== "undefined" && recettes[cle] && recettes[cle].nom) || cle;
  }

  // === Construire le contexte selon le type ==================================
  function construireContexte(type) {
    if (type === "recette") {
      // _ficheOuverte est posé par ouvrirFiche() ; _recetteActuelleModal en repli
      const cle = window._ficheOuverte
        || (typeof _recetteActuelleModal !== "undefined" && _recetteActuelleModal)
        || null;
      if (!cle || typeof recettes === "undefined" || !recettes[cle]) return null;
      const r = recettes[cle];
      const nom = nomRecette(cle);
      return {
        type, cle,
        titre: "🍽️ " + nom,
        contexte: "« " + nom + " »",
        desc: "Recette « " + nom + " » — La Cuisine de Jéjé"
            + "\n⏱ " + (r.temps || "—") + (r.niveau ? " · " + r.niveau : "")
            + "\n\n👉 Ouvrir la recette : " + APP_URL + "?recette=" + encodeURIComponent(cle),
        dureeMin: dureeDepuisTemps(r.temps),
        momentDefaut: "soir",
      };
    }
    // Rappel courses : liste les recettes du panier (8 max)
    const liste = (window.userProfile && Array.isArray(window.userProfile.listeCourses)) ? window.userProfile.listeCourses : [];
    if (!liste.length) {
      if (typeof afficherToast === "function") afficherToast("🛒 Ta liste de courses est vide — ajoute d'abord des recettes !");
      return null;
    }
    const noms = liste.slice(0, 8).map(x => "• " + nomRecette(x.cle));
    if (liste.length > 8) noms.push("… et " + (liste.length - 8) + " autre(s)");
    return {
      type, cle: null,
      titre: "🛒 Faire les courses — La Cuisine de Jéjé",
      contexte: liste.length + " recette(s) au panier",
      desc: "Courses pour :\n" + noms.join("\n") + "\n\n👉 Ouvrir la liste : " + APP_URL,
      dureeMin: 60,
      momentDefaut: "apresmidi",
    };
  }

  // === Modal =================================================================
  function creerModal() {
    let m = document.getElementById("modal-agenda");
    if (m) return m;
    m = document.createElement("div");
    m.id = "modal-agenda";
    m.className = "modal-auth-overlay";
    m.onclick = (e) => { if (e.target === m) fermerModalAgenda(); };
    m.innerHTML = `<div class="modal-auth-contenu modal-avis-contenu">
      <button class="modal-fermer" onclick="fermerModalAgenda()">✕</button>
      <h2>📅 Planifier</h2>
      <p class="avis-modal-subtitle" id="agenda-contexte"></p>
      <label class="agenda-label">Quel jour ?</label>
      <input type="date" id="agenda-date" class="agenda-input">
      <label class="agenda-label">Quel moment ?</label>
      <div class="agenda-moments" id="agenda-moments">
        ${MOMENTS.map(mo => `<button type="button" class="agenda-moment" data-id="${mo.id}" onclick="agendaChoisirMoment('${mo.id}')">${mo.label}</button>`).join("")}
      </div>
      <button class="avis-btn-envoyer" style="margin-top:16px" onclick="agendaOuvrirGoogle()">📅 Ouvrir dans Google Agenda</button>
      <button class="agenda-btn-ics" onclick="agendaTelechargerICS()">💾 Fichier .ics (autres agendas)</button>
    </div>`;
    document.body.appendChild(m);
    if (typeof _MODALS_SURVEILLEES !== "undefined" && Array.isArray(_MODALS_SURVEILLEES)) {
      _MODALS_SURVEILLEES.push({ id: "modal-agenda", close: function () { fermerModalAgenda(); } });
    }
    return m;
  }

  window.ouvrirModalAgenda = function (type) {
    const c = construireContexte(type);
    if (!c) return;
    ctx = c;
    const m = creerModal();
    document.getElementById("agenda-contexte").textContent = c.contexte;
    // Date par défaut : demain
    const demain = new Date();
    demain.setDate(demain.getDate() + 1);
    document.getElementById("agenda-date").value = demain.getFullYear() + "-" + pad(demain.getMonth() + 1) + "-" + pad(demain.getDate());
    window.agendaChoisirMoment(c.momentDefaut);
    m.classList.add("visible");
  };

  window.fermerModalAgenda = function () {
    const m = document.getElementById("modal-agenda");
    if (m) m.classList.remove("visible");
  };

  window.agendaChoisirMoment = function (id) {
    if (ctx) ctx.moment = id;
    document.querySelectorAll("#agenda-moments .agenda-moment").forEach(b => {
      b.classList.toggle("actif", b.dataset.id === id);
    });
  };

  // === Dates de l'événement ==================================================
  function datesEvenement() {
    const val = document.getElementById("agenda-date").value;
    const mo = MOMENTS.find(x => x.id === (ctx && ctx.moment)) || MOMENTS[3];
    const [y, m, d] = (val || "").split("-").map(Number);
    const debut = (y && m && d) ? new Date(y, m - 1, d, mo.h, mo.m) : new Date();
    const fin = new Date(debut.getTime() + (ctx ? ctx.dureeMin : 90) * 60000);
    return { debut, fin };
  }

  // === Sortie 1 : Google Agenda (lien template officiel) =====================
  window.agendaOuvrirGoogle = function () {
    if (!ctx) return;
    const { debut, fin } = datesEvenement();
    const url = "https://calendar.google.com/calendar/render?action=TEMPLATE"
      + "&text=" + encodeURIComponent(ctx.titre)
      + "&dates=" + fmtLocal(debut) + "/" + fmtLocal(fin)
      + "&details=" + encodeURIComponent(ctx.desc);
    window.open(url, "_blank", "noopener");
    fermerModalAgenda();
    if (typeof afficherToast === "function") afficherToast("📅 Événement prêt — valide-le dans Google Agenda !");
  };

  // === Sortie 2 : fichier .ics universel =====================================
  const icsEsc = (s) => String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  window.agendaTelechargerICS = function () {
    if (!ctx) return;
    const { debut, fin } = datesEvenement();
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//La Cuisine de Jeje//FR",
      "BEGIN:VEVENT",
      "UID:" + (ctx.cle || "courses") + "-" + Date.now() + "@cuisine-jeje",
      "DTSTAMP:" + fmtLocal(new Date()),
      "DTSTART:" + fmtLocal(debut),
      "DTEND:" + fmtLocal(fin),
      "SUMMARY:" + icsEsc(ctx.titre),
      "DESCRIPTION:" + icsEsc(ctx.desc),
      "BEGIN:VALARM", "TRIGGER:-PT1H", "ACTION:DISPLAY", "DESCRIPTION:" + icsEsc(ctx.titre), "END:VALARM",
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (ctx.cle || "courses") + ".ics";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    fermerModalAgenda();
    if (typeof afficherToast === "function") afficherToast("💾 Fichier .ics téléchargé — ouvre-le pour l'ajouter à ton agenda");
  };
})();
