// ============================================================
// whatsnew.js — "Quoi de neuf ?" (note d'informations) v1.2.0
// Bouton ⓘ dans l'en-tête. Pastille rouge tant que la dernière note
// n'a pas été lue (mémorisé en local, marche même sans compte).
//
// 👉 Pour annoncer une nouveauté : ajoute une entrée EN HAUT de QUOI_DE_NEUF
//    (avec un numéro de version plus récent). Pour un petit patch (ajout de
//    recettes…), n'ajoute rien : pas d'entrée = pas de pastille.
// ============================================================

const QUOI_DE_NEUF = [
  {
    v: "1.3.0",
    titre: "📷 Les photos sont arrivées !",
    texte: "Tu peux maintenant ajouter tes photos de plats sur chaque recette et admirer celles de la communauté. Avec les astuces, place à la cuisine collaborative !"
  },
  {
    v: "1.2.0",
    titre: "💬 Astuces sur les recettes",
    texte: "Partage tes astuces sur chaque recette (« j'ai mis moins de sucre, un peu de cannelle… ») et profite de celles des autres."
  },
  {
    v: "1.1.0",
    titre: "Mode Lunch box",
    texte: "Des déjeuners rapides, sains et à emporter, générés en un clic dans l'onglet Menus."
  }
];
const QDN_DERNIERE = (QUOI_DE_NEUF[0] && QUOI_DE_NEUF[0].v) || "";

function _qdnEchap(s) {
  return String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function _qdnVue() { try { return localStorage.getItem("qdn_vue") || ""; } catch (e) { return ""; } }
function _qdnMarquerVue() { try { localStorage.setItem("qdn_vue", QDN_DERNIERE); } catch (e) {} }

function majPastilleQuoiDeNeuf() {
  const dot = document.getElementById("qdn-dot");
  if (!dot) return;
  dot.style.display = (_qdnVue() !== QDN_DERNIERE) ? "" : "none";
}

function ouvrirQuoiDeNeuf() {
  let m = document.getElementById("modal-qdn");
  if (!m) {
    m = document.createElement("div");
    m.id = "modal-qdn";
    m.setAttribute("style", "position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:18px");
    m.onclick = (e) => { if (e.target === m) fermerQuoiDeNeuf(); };
    document.body.appendChild(m);
  }
  const items = QUOI_DE_NEUF.map((n, i) => {
    const recent = (i === 0);
    return '<div style="background:rgba(255,255,255,' + (recent ? '.05' : '.03') + ');border-radius:12px;padding:12px;margin-bottom:10px' + (recent ? '' : ';opacity:.7') + '">' +
      '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
        '<span style="font-size:11px;font-weight:600;color:' + (recent ? '#ff8fb3' : '#b3b0b8') + ';background:' + (recent ? 'rgba(255,77,136,.18)' : 'rgba(255,255,255,.08)') + ';padding:2px 8px;border-radius:20px">v' + _qdnEchap(n.v) + '</span>' +
        (recent ? '<span style="font-size:11px;color:#88858f">nouveau</span>' : '') +
      '</div>' +
      '<div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:3px">' + _qdnEchap(n.titre) + '</div>' +
      '<p style="font-size:13px;color:#cfccd4;margin:0;line-height:1.5">' + _qdnEchap(n.texte) + '</p>' +
    '</div>';
  }).join("");
  m.innerHTML = '<div style="background:#211e26;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:18px;max-width:420px;width:100%;max-height:80vh;overflow:auto">' +
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">' +
      '<span style="font-size:18px">✨</span>' +
      '<span style="font-size:17px;font-weight:600;color:#fff;flex:1">Quoi de neuf ?</span>' +
      '<button onclick="fermerQuoiDeNeuf()" aria-label="Fermer" style="background:none;border:none;color:#b3b0b8;font-size:24px;line-height:1;cursor:pointer;padding:0 4px">×</button>' +
    '</div>' +
    items +
    '<p style="font-size:11px;color:#88858f;margin:10px 2px 0;line-height:1.5">Seules les nouveautés importantes apparaissent ici.</p>' +
  '</div>';
  m.style.display = "flex";
  _qdnMarquerVue();
  majPastilleQuoiDeNeuf();
}
function fermerQuoiDeNeuf() { const m = document.getElementById("modal-qdn"); if (m) m.style.display = "none"; }

document.addEventListener("DOMContentLoaded", majPastilleQuoiDeNeuf);
window.ouvrirQuoiDeNeuf = ouvrirQuoiDeNeuf;
window.fermerQuoiDeNeuf = fermerQuoiDeNeuf;
window.majPastilleQuoiDeNeuf = majPastilleQuoiDeNeuf;
