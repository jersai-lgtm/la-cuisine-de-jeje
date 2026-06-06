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
function maEnsureDays(m, lunchbox) {
  const noms = m.semaine.map(j => j.jour);
  MA_JOURS.forEach(j => { if (!noms.includes(j)) m.semaine.push(lunchbox ? { jour: j, midi: null } : { jour: j, midi: null, soir: null }); });
  m.semaine.sort((a, b) => MA_JOURS.indexOf(a.jour) - MA_JOURS.indexOf(b.jour));
}
// Récupère (ou crée) le menu adapté à la destination : semaine (simple/complet) ou lunch box.
function maGetMenu(dest) {
  let m = window._derniersMenus;
  if (dest === "lunchbox") {
    if (!m || m.mode !== "lunchbox" || !Array.isArray(m.semaine)) m = { mode: "lunchbox", semaine: MA_JOURS.map(j => ({ jour: j, midi: null })) };
    else maEnsureDays(m, true);
    return m;
  }
  if (!m || m.mode === "lunchbox" || !Array.isArray(m.semaine)) m = { semaine: MA_JOURS.map(j => ({ jour: j, midi: null, soir: null })) };
  else maEnsureDays(m, false);
  return m;
}
// Rôle par défaut selon la catégorie de la recette
function maRoleParCat(key) {
  const c = (recettes[key] && recettes[key].cat) || "";
  if (c === "desserts") return "dessert";
  if (c === "entrees" || c === "soupes" || c === "salades" || c === "aperitifs") return "entree";
  return "plat";
}
function maConfirmRemp(jour, lbl, actuelKey, newKey) {
  const a = (typeof getNomRecette === "function") ? getNomRecette(actuelKey) : actuelKey;
  const n = (typeof getNomRecette === "function") ? getNomRecette(newKey) : newKey;
  return confirm(jour + " " + lbl + " contient déjà « " + a + " ».\n\nLe remplacer par « " + n + " » ?");
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
  const m = window._derniersMenus;
  let dest = "simple";
  if (m && m.mode === "lunchbox") dest = "lunchbox";
  else if (m && window._formatRepas === "complet") dest = "complet";
  window._maSel = { key: key, jour: today, creneau: "midi", dest: dest, role: maRoleParCat(key) };
  maModalEl();          // crée d'abord le panneau (#ma-sheet) …
  maRenderSheet();      // … puis on le remplit
  maModalEl().style.display = "flex";
}

function fermerAjoutMenu() {
  const el = document.getElementById("ma-modal");
  if (el) el.style.display = "none";
}

function maSelJour(i) { window._maSel.jour = i; maRenderSheet(); }
function maSelCreneau(c) { window._maSel.creneau = c; maRenderSheet(); }
function maSelDest(d) { window._maSel.dest = d; maRenderSheet(); }
function maSelRole(r) { window._maSel.role = r; maRenderSheet(); }

function maRenderSheet() {
  const s = window._maSel;
  const nom = (typeof getNomRecette === "function") ? getNomRecette(s.key) : s.key;
  const segBtn = function (active, onclick, label) {
    return '<span onclick="' + onclick + '" style="flex:1;text-align:center;padding:8px 0;border-radius:10px;cursor:pointer;font-size:13px;'
      + (active ? 'background:var(--accent,#ff4d88);color:#fff;font-weight:600' : 'color:#b3b0b8;border:1px solid rgba(255,255,255,.12)') + '">' + label + '</span>';
  };
  const dests = segBtn(s.dest === "simple", "maSelDest('simple')", "Semaine")
    + segBtn(s.dest === "complet", "maSelDest('complet')", "Repas complet")
    + segBtn(s.dest === "lunchbox", "maSelDest('lunchbox')", "Lunch box");
  const chips = MA_JOURS.map(function (j, i) {
    const on = i === s.jour;
    return '<span onclick="maSelJour(' + i + ')" style="flex:1;text-align:center;padding:8px 0;border-radius:10px;cursor:pointer;font-size:13px;'
      + (on ? 'background:var(--accent,#ff4d88);color:#fff;font-weight:600' : 'color:#b3b0b8;border:1px solid rgba(255,255,255,.12)') + '">' + j.slice(0, 3) + '</span>';
  }).join("");
  let creneauBlock = "";
  if (s.dest !== "lunchbox") {
    creneauBlock = '<p style="margin:0 0 7px;color:#b3b0b8;font-size:12px;font-weight:500">Quel repas ?</p>'
      + '<div style="display:flex;gap:8px;margin-bottom:16px">'
      + segBtn(s.creneau === "midi", "maSelCreneau('midi')", "☀️ Midi")
      + segBtn(s.creneau === "soir", "maSelCreneau('soir')", "🌙 Soir") + '</div>';
  }
  let roleBlock = "";
  if (s.dest === "complet") {
    roleBlock = '<p style="margin:0 0 7px;color:#b3b0b8;font-size:12px;font-weight:500">Quel rôle ?</p>'
      + '<div style="display:flex;gap:8px;margin-bottom:16px">'
      + segBtn(s.role === "entree", "maSelRole('entree')", "🥗 Entrée")
      + segBtn(s.role === "plat", "maSelRole('plat')", "🍽️ Plat")
      + segBtn(s.role === "dessert", "maSelRole('dessert')", "🍰 Dessert") + '</div>';
  }
  let lbl = "Ajouter au " + MA_JOURS[s.jour];
  lbl += s.dest === "lunchbox" ? " (lunch box)" : " " + (s.creneau === "midi" ? "midi" : "soir");
  if (s.dest === "complet") lbl += " — " + (s.role === "entree" ? "entrée" : s.role);
  document.getElementById("ma-sheet").innerHTML =
    '<div style="width:40px;height:4px;border-radius:99px;background:rgba(255,255,255,.2);margin:0 auto 14px"></div>'
    + '<p style="margin:0 0 2px;color:#fff;font-size:16px;font-weight:600">Ajouter à un menu</p>'
    + '<p style="margin:0 0 16px;color:#9a97a0;font-size:13px">« ' + nom + ' »</p>'
    + '<p style="margin:0 0 7px;color:#b3b0b8;font-size:12px;font-weight:500">Où ?</p>'
    + '<div style="display:flex;gap:6px;margin-bottom:16px">' + dests + '</div>'
    + '<p style="margin:0 0 7px;color:#b3b0b8;font-size:12px;font-weight:500">Quel jour ?</p>'
    + '<div style="display:flex;gap:5px;margin-bottom:16px">' + chips + '</div>'
    + creneauBlock + roleBlock
    + '<button onclick="maValider()" style="width:100%;padding:12px;border:none;border-radius:12px;background:var(--accent,#ff4d88);color:#fff;font-size:15px;font-weight:600;cursor:pointer">' + lbl + '</button>'
    + '<button onclick="fermerAjoutMenu()" style="width:100%;margin-top:8px;padding:10px;border:none;border-radius:12px;background:transparent;color:#9a97a0;font-size:13px;cursor:pointer">Annuler</button>';
}

function maValider() {
  const s = window._maSel;
  const personnes = maPersonnes();
  const jourNom = MA_JOURS[s.jour];
  const cur = window._derniersMenus;
  const curType = (cur && cur.mode === "lunchbox") ? "lunchbox" : (cur && cur.semaine ? "semaine" : null);
  const newType = s.dest === "lunchbox" ? "lunchbox" : "semaine";

  // Avertir si on bascule entre semaine <-> lunch box avec du contenu existant
  if (curType && newType !== curType) {
    const rempli = (cur.semaine || []).some(function (j) {
      return (j.midi && (j.midi.recette || j.midi.plat || j.midi.entree || j.midi.dessert)) || (j.soir && (j.soir.recette || j.soir.plat));
    });
    if (rempli && !confirm("Ton menu actuel (" + (curType === "lunchbox" ? "lunch box" : "semaine") + ") sera remplacé par un menu " + (newType === "lunchbox" ? "lunch box" : "semaine") + ".\n\nContinuer ?")) return;
  }

  const m = maGetMenu(s.dest);
  const jour = m.semaine.find(function (x) { return x.jour === jourNom; });

  if (s.dest === "lunchbox") {
    if (jour.midi && jour.midi.recette && !maConfirmRemp(jourNom, "(lunch box)", jour.midi.recette, s.key)) return;
    jour.midi = { recette: s.key, note: "" };
    window._lunchboxActif = true; window._planMode = "lunchbox";
  } else if (s.dest === "simple") {
    if (window._formatRepas === "complet" && curType === "semaine") {
      alert("Ton menu de la semaine est au format Entrée / Plat / Dessert.\nUtilise « Repas complet », ou régénère un menu simple depuis le planificateur.");
      return;
    }
    const actuel = jour[s.creneau] && jour[s.creneau].recette;
    if (actuel && !maConfirmRemp(jourNom, s.creneau === "midi" ? "midi" : "soir", actuel, s.key)) return;
    jour[s.creneau] = { recette: s.key, note: "" };
    window._formatRepas = "simple"; window._lunchboxActif = false; window._planMode = "semaine";
  } else { // complet
    // Convertir tout le menu simple -> complet si nécessaire (le plat simple devient « Plat »)
    if (window._formatRepas !== "complet") {
      m.semaine.forEach(function (j) {
        ["midi", "soir"].forEach(function (cr) {
          if (j[cr] && j[cr].recette && !j[cr].plat) j[cr] = { plat: { recette: j[cr].recette, note: "" } };
        });
      });
    }
    if (!jour[s.creneau] || jour[s.creneau].recette) jour[s.creneau] = {};
    const slot = jour[s.creneau];
    const actuel = slot[s.role] && slot[s.role].recette;
    if (actuel && !maConfirmRemp(jourNom, (s.creneau === "midi" ? "midi" : "soir") + " " + (s.role === "entree" ? "entrée" : s.role), actuel, s.key)) return;
    slot[s.role] = { recette: s.key, note: "" };
    window._formatRepas = "complet"; window._lunchboxActif = false; window._planMode = "semaine";
  }

  window._derniersMenus = m;
  window._dernierMenuGenere = m;
  if (typeof sauvegarderMenus === "function") sauvegarderMenus(m, personnes, m.semaine);
  if (typeof window.reafficherMenuCourant === "function") window.reafficherMenuCourant(m, personnes);

  fermerAjoutMenu();
  let suff = s.dest === "lunchbox" ? " (lunch box)" : " " + (s.creneau === "midi" ? "midi" : "soir");
  if (s.dest === "complet") suff += " — " + (s.role === "entree" ? "entrée" : s.role);
  maToast("Ajouté au " + jourNom + suff + " ✅");
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

// ============================================================
//  Point d'entrée 2 : recherche dans l'onglet Menu
// ============================================================
function maNorm(s) { return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

function maRechercheMenu(q) {
  const res = document.getElementById("ma-srch-res");
  if (!res) return;
  const v = maNorm(q).trim();
  if (v.length < 2) { res.innerHTML = ""; return; }
  const hits = Object.keys(recettes).filter(function (k) {
    return maNorm(typeof getNomRecette === "function" ? getNomRecette(k) : k).indexOf(v) >= 0;
  }).slice(0, 8);
  if (!hits.length) { res.innerHTML = '<p style="margin:8px 0 0;color:#88858f;font-size:12px">Aucune recette trouvée.</p>'; return; }
  res.innerHTML = hits.map(function (k) {
    const nom = typeof getNomRecette === "function" ? getNomRecette(k) : k;
    const emo = typeof getEmoji === "function" ? getEmoji(k) : "🍽️";
    return '<div onclick="ouvrirAjoutMenu(\'' + k + '\')" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:#1a1620;border:1px solid rgba(255,255,255,.07);margin-top:6px;cursor:pointer">'
      + '<span style="font-size:20px">' + emo + '</span>'
      + '<span style="flex:1;color:#fff;font-size:13px">' + nom + '</span>'
      + '<span style="font-size:12px;color:var(--accent,#ff4d88);font-weight:600">+ menu</span></div>';
  }).join("");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("plan-form");
  if (!form || document.getElementById("ma-recherche-menu")) return;
  const box = document.createElement("div");
  box.id = "ma-recherche-menu";
  box.style.cssText = "margin:0 0 18px";
  box.innerHTML =
    '<p style="margin:0 0 8px;color:#fff;font-size:15px;font-weight:600">➕ Ajouter une recette précise</p>'
    + '<input id="ma-srch" type="text" placeholder="Rechercher une recette à mettre au menu…" oninput="maRechercheMenu(this.value)" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:#1a1620;color:#fff;font-size:14px" />'
    + '<div id="ma-srch-res" style="margin-top:6px"></div>';
  form.parentNode.insertBefore(box, form);
});

// ============================================================
//  Bouton 🔍 « choisir une recette » sur un emplacement de menu
// ============================================================
function maFiltreRecettes(role) {
  return Object.keys(recettes).filter(function (k) {
    const c = (recettes[k] && recettes[k].cat) || "";
    if (role === "entree") return c === "entrees" || c === "salades" || c === "soupes";
    if (role === "plat") return c === "plats" || c === "healthy" || c === "pizzas";
    if (role === "dessert") return c === "desserts";
    if (role === "apero") return c === "cocktails" || c === "mocktails";
    if (role === "aperitif") return c === "aperitifs";
    // repas simple (pas de rôle) : vrais repas, on exclut le hors-repas
    return ["plats", "healthy", "soupes", "salades", "entrees", "pizzas"].indexOf(c) >= 0;
  });
}

function maRoleLbl(role, creneau) {
  return role === "entree" ? "entrée" : role === "plat" ? "plat" : role === "dessert" ? "dessert"
    : role === "apero" ? "apéro" : role === "aperitif" ? "apéritif" : (creneau === "midi" ? "midi" : "soir");
}

function maOuvrirRecherche(titre) {
  maModalEl();
  document.getElementById("ma-sheet").innerHTML =
    '<div style="width:40px;height:4px;border-radius:99px;background:rgba(255,255,255,.2);margin:0 auto 14px"></div>'
    + '<p style="margin:0 0 2px;color:#fff;font-size:16px;font-weight:600">Choisir une recette</p>'
    + '<p style="margin:0 0 14px;color:#9a97a0;font-size:13px">' + titre + '</p>'
    + '<input id="ma-cible-srch" type="text" placeholder="Rechercher…" oninput="maRechercheCible(this.value)" style="width:100%;box-sizing:border-box;padding:11px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:#15121a;color:#fff;font-size:14px" />'
    + '<div id="ma-cible-res" style="margin-top:8px;max-height:46vh;overflow:auto"></div>'
    + '<button onclick="fermerAjoutMenu()" style="width:100%;margin-top:10px;padding:10px;border:none;border-radius:12px;background:transparent;color:#9a97a0;font-size:13px;cursor:pointer">Annuler</button>';
  maModalEl().style.display = "flex";
  maRechercheCible("");
}

function maChoisir(jour, creneau, role) {
  window._maCible = { jour: jour, creneau: creneau, role: role || null };
  maOuvrirRecherche(jour + " — " + maRoleLbl(role, creneau));
}

function maChoisirFestif(idx, role) {
  window._maCible = { festif: true, idx: idx, role: role || null };
  maOuvrirRecherche("Menu thématique — " + maRoleLbl(role, null));
}

function maRechercheCible(q) {
  const res = document.getElementById("ma-cible-res");
  if (!res) return;
  const v = maNorm(q).trim();
  let hits = maFiltreRecettes(window._maCible && window._maCible.role);
  if (v.length >= 1) hits = hits.filter(function (k) { return maNorm(getNomRecette(k)).indexOf(v) >= 0; });
  hits.sort(function (a, b) { return getNomRecette(a).localeCompare(getNomRecette(b)); });
  if (!hits.length) { res.innerHTML = '<p style="margin:8px 0;color:#88858f;font-size:12px">Aucune recette.</p>'; return; }
  res.innerHTML = hits.map(function (k) {
    const nom = getNomRecette(k);
    const emo = typeof getEmoji === "function" ? getEmoji(k) : "🍽️";
    return '<div onclick="maPlacer(\'' + k + '\')" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:#1a1620;border:1px solid rgba(255,255,255,.07);margin-top:6px;cursor:pointer">'
      + '<span style="font-size:20px">' + emo + '</span>'
      + '<span style="flex:1;color:#fff;font-size:13px">' + nom + '</span></div>';
  }).join("");
}

function maPlacer(key) {
  const c = window._maCible;
  if (c && c.festif) { maPlacerFestif(key); return; }
  const m = window._derniersMenus;
  if (!c || !m || !Array.isArray(m.semaine)) { fermerAjoutMenu(); return; }
  const jour = m.semaine.find(function (x) { return x.jour === c.jour; });
  if (!jour) { fermerAjoutMenu(); return; }
  if (c.role && ["entree", "plat", "dessert", "apero", "aperitif"].indexOf(c.role) >= 0 && c.creneau) {
    if (!jour[c.creneau] || jour[c.creneau].recette) jour[c.creneau] = jour[c.creneau] && !jour[c.creneau].recette ? jour[c.creneau] : {};
    jour[c.creneau][c.role] = { recette: key, note: "" };
  } else {
    jour[c.creneau] = { recette: key, note: "" };
  }
  const personnes = maPersonnes();
  window._derniersMenus = m; window._dernierMenuGenere = m;
  if (typeof sauvegarderMenus === "function") sauvegarderMenus(m, personnes, m.semaine);
  if (typeof window.reafficherMenuCourant === "function") window.reafficherMenuCourant(m, personnes);
  fermerAjoutMenu();
  maToast("Recette placée ✅");
}

// Placement d'une recette choisie dans un emplacement du MENU THÉMATIQUE (festif)
function maPlacerFestif(key) {
  const c = window._maCible;
  const m = (typeof menuFestifActuel !== "undefined" && menuFestifActuel) ? menuFestifActuel : window._dernierMenuGenere;
  if (!c || !m || !Array.isArray(m.menu) || !m.menu[c.idx]) { fermerAjoutMenu(); return; }
  const notesMap = {
    apero: "Pour bien commencer la soirée ! 🥂",
    aperitif: "À picorer avant de passer à table 🥨",
    entree: "Le parfait début de repas ✨",
    plat: "Le plat star de la soirée ! 🌟",
    dessert: "Une touche sucrée pour finir 🍰"
  };
  m.menu[c.idx].recette = key;
  if (notesMap[c.role]) m.menu[c.idx].note = notesMap[c.role];
  const personnes = m.personnes || maPersonnes();
  if (typeof menuFestifActuel !== "undefined") menuFestifActuel = m;
  window._dernierMenuGenere = m;
  if (typeof afficherMenuFestif === "function") afficherMenuFestif(m, personnes);
  fermerAjoutMenu();
  maToast("Recette placée ✅");
}
