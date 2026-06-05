// ============================================================
//  Ajouter une recette précise à un menu — TRANCHE 1
//  (menu de la semaine, format Midi/Soir simple)
//  Bouton sur la fiche recette + panneau jour/créneau.
// ============================================================

const MA_JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

// Sélection courante du panneau
window._maSel = window._maSel || { key: null, jour: 0, creneau: "midi" };

function maPersonnes() {
  return parseInt(document.getElementById("plan-personnes")?.value)
      || (window._derniersMenus && window._derniersMenus.personnes) || 4;
}

// Récupère le menu semaine courant (format simple) ou en crée un vide.
// Renvoie null si un menu "complet" (Entrée/Plat/Dessert) est actif (géré en tranche 2).
function maMenuCourant() {
  let m = window._derniersMenus;
  if (m && m.mode === "lunchbox") m = null;              // lunch box : tranche 2
  if (m && window._formatRepas === "complet") return "complet"; // tranche 2
  if (!m || !Array.isArray(m.semaine)) {
    m = { semaine: MA_JOURS.map(j => ({ jour: j, midi: null, soir: null })) };
  } else {
    const noms = m.semaine.map(j => j.jour);
    MA_JOURS.forEach(j => { if (!noms.includes(j)) m.semaine.push({ jour: j, midi: null, soir: null }); });
    m.semaine.sort((a, b) => MA_JOURS.indexOf(a.jour) - MA_JOURS.indexOf(b.jour));
  }
  return m;
}

// Bouton injecté en haut de la fiche recette
function injecterBoutonMenu(key) {
  setTimeout(function () {
    const zone = document.getElementById("modal-resultat");
    if (!zone || document.getElementById("ma-btn-fiche")) return;
    // Bouton repris du MÊME style que "Ajouter aux courses" (couleurs de l'appli)
    const btn = document.createElement("button");
    btn.id = "ma-btn-fiche";
    btn.className = "btn-courses-recette";
    btn.innerHTML = "📅 Ajouter à un menu";
    btn.onclick = function () { ouvrirAjoutMenu(key); };
    const coursesBtn = zone.querySelector(".btn-courses-recette");
    if (coursesBtn && coursesBtn.parentNode) {
      // Les deux boutons côte à côte (50/50), à l'emplacement du bouton courses
      const row = document.createElement("div");
      row.style.cssText = "display:flex;gap:10px;align-items:stretch;margin:14px 0";
      coursesBtn.parentNode.insertBefore(row, coursesBtn);
      row.appendChild(coursesBtn);
      row.appendChild(btn);
      coursesBtn.style.flex = "1"; coursesBtn.style.margin = "0";
      btn.style.flex = "1"; btn.style.margin = "0";
    } else {
      btn.style.width = "100%";
      zone.appendChild(btn);
    }
  }, 0);
}

// ---- Panneau (bottom sheet) ----
function maModalEl() {
  let el = document.getElementById("ma-modal");
  if (el) return el;
  el = document.createElement("div");
  el.id = "ma-modal";
  el.style.cssText = "position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.6);display:none;align-items:flex-end;justify-content:center";
  el.innerHTML = '<div id="ma-sheet" style="background:#1a1620;width:100%;max-width:480px;max-height:88vh;overflow:auto;border-radius:18px 18px 0 0;padding:18px 16px 26px;box-shadow:0 -8px 30px rgba(0,0,0,.5)"></div>';
  el.addEventListener("click", function (e) { if (e.target === el) fermerAjoutMenu(); });
  document.body.appendChild(el);
  return el;
}

function ouvrirAjoutMenu(key) {
  const today = (new Date().getDay() + 6) % 7; // Lundi = 0
  window._maSel = { key: key, jour: today, creneau: "midi" };
  maRenderSheet();
  maModalEl().style.display = "flex";
}

function fermerAjoutMenu() {
  const el = document.getElementById("ma-modal");
  if (el) el.style.display = "none";
}

function maSelJour(i) { window._maSel.jour = i; maRenderSheet(); }
function maSelCreneau(c) { window._maSel.creneau = c; maRenderSheet(); }

function maRenderSheet() {
  const s = window._maSel;
  const nom = (typeof getNomRecette === "function") ? getNomRecette(s.key) : s.key;
  const chips = MA_JOURS.map(function (j, i) {
    const on = i === s.jour;
    return '<span onclick="maSelJour(' + i + ')" style="flex:1;text-align:center;padding:8px 0;border-radius:10px;cursor:pointer;font-size:13px;'
      + (on ? 'background:#ff4d88;color:#fff;font-weight:600' : 'color:#b3b0b8;border:1px solid rgba(255,255,255,.12)') + '">' + j.slice(0, 3) + '</span>';
  }).join("");
  const seg = function (c, lbl) {
    const on = s.creneau === c;
    return '<span onclick="maSelCreneau(\'' + c + '\')" style="flex:1;text-align:center;padding:9px 0;border-radius:10px;cursor:pointer;font-size:14px;'
      + (on ? 'background:#ff4d88;color:#fff;font-weight:600' : 'color:#b3b0b8;border:1px solid rgba(255,255,255,.12)') + '">' + lbl + '</span>';
  };
  document.getElementById("ma-sheet").innerHTML =
    '<div style="width:40px;height:4px;border-radius:99px;background:rgba(255,255,255,.2);margin:0 auto 14px"></div>'
    + '<p style="margin:0 0 2px;color:#fff;font-size:16px;font-weight:600">Ajouter à un menu</p>'
    + '<p style="margin:0 0 16px;color:#9a97a0;font-size:13px">« ' + nom +' » — menu de la semaine</p>'
    + '<p style="margin:0 0 7px;color:#b3b0b8;font-size:12px;font-weight:500">Quel jour ?</p>'
    + '<div style="display:flex;gap:5px;margin-bottom:16px">' + chips + '</div>'
    + '<p style="margin:0 0 7px;color:#b3b0b8;font-size:12px;font-weight:500">Quel repas ?</p>'
    + '<div style="display:flex;gap:8px;margin-bottom:20px">' + seg("midi", "☀️ Midi") + seg("soir", "🌙 Soir") + '</div>'
    + '<button onclick="maValider()" style="width:100%;padding:12px;border:none;border-radius:12px;background:#ff4d88;color:#fff;font-size:15px;font-weight:600;cursor:pointer">Ajouter au ' + MA_JOURS[s.jour] + ' ' + (s.creneau === "midi" ? "midi" : "soir") + '</button>'
    + '<button onclick="fermerAjoutMenu()" style="width:100%;margin-top:8px;padding:10px;border:none;border-radius:12px;background:transparent;color:#9a97a0;font-size:13px;cursor:pointer">Annuler</button>'
    + '<p style="margin:14px 0 0;color:#6e6b75;font-size:11px;text-align:center">Repas complet (entrée/plat/dessert) &amp; lunch box : bientôt.</p>';
}

function maValider() {
  const s = window._maSel;
  const m = maMenuCourant();
  if (m === "complet") {
    alert("Ton menu actuel est au format Entrée / Plat / Dessert.\nL'ajout direct dans ce format arrive très bientôt (prochaine tranche).");
    return;
  }
  const jour = m.semaine.find(function (x) { return x.jour === MA_JOURS[s.jour]; });
  const actuel = jour[s.creneau] && (jour[s.creneau].recette || (typeof jour[s.creneau] === "string" ? jour[s.creneau] : null));
  if (actuel) {
    const nomA = (typeof getNomRecette === "function") ? getNomRecette(actuel) : actuel;
    const nomN = (typeof getNomRecette === "function") ? getNomRecette(s.key) : s.key;
    if (!confirm(MA_JOURS[s.jour] + " " + (s.creneau === "midi" ? "midi" : "soir") + " contient déjà « " + nomA + " ».\n\nLe remplacer par « " + nomN + " » ?")) return;
  }
  jour[s.creneau] = { recette: s.key, note: "" };

  const personnes = maPersonnes();
  window._derniersMenus = m;
  window._dernierMenuGenere = m;
  if (window._formatRepas === "complet") window._formatRepas = "simple";
  if (typeof sauvegarderMenus === "function") sauvegarderMenus(m, personnes, m.semaine);
  if (typeof window.reafficherMenuCourant === "function") window.reafficherMenuCourant(m, personnes);

  fermerAjoutMenu();
  maToast("Ajouté au " + MA_JOURS[s.jour] + " " + (s.creneau === "midi" ? "midi" : "soir") + " ✅");
}

function maToast(msg) {
  let t = document.getElementById("ma-toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "ma-toast";
    t.style.cssText = "position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:100001;background:#2a2630;color:#fff;padding:11px 18px;border-radius:12px;font-size:14px;box-shadow:0 6px 20px rgba(0,0,0,.4);opacity:0;transition:opacity .25s";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(function () { t.style.opacity = "1"; });
  clearTimeout(window._maToastTO);
  window._maToastTO = setTimeout(function () { t.style.opacity = "0"; }, 2600);
}
