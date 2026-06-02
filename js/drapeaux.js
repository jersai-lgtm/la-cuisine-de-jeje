// drapeaux.js — drapeaux SVG des pays + helper drapeau() (extrait d'app.js)
// === Drapeaux pays (SVG inline, fiables sur tous navigateurs, fonctionne hors-ligne) ===
const DRAPEAUX = (function () {
  const wrap = inner => `<svg viewBox="0 0 30 20" width="100%" height="100%" preserveAspectRatio="none">${inner}</svg>`;
  // tricolore vertical (gauche, milieu, droite)
  const vt = (a, b, c) => `<rect width="30" height="20" fill="${a}"/><rect x="10" width="10" height="20" fill="${b}"/><rect x="20" width="10" height="20" fill="${c}"/>`;
  // tricolore horizontal (haut, milieu, bas)
  const ht = (a, b, c) => `<rect width="30" height="20" fill="${a}"/><rect y="6.67" width="30" height="6.66" fill="${b}"/><rect y="13.33" width="30" height="6.67" fill="${c}"/>`;
  // bicolore horizontal (haut, bas)
  const hb = (a, b) => `<rect width="30" height="10" fill="${a}"/><rect y="10" width="30" height="10" fill="${b}"/>`;
  // étoile 5 branches
  const star = (cx, cy, R, fill) => {
    let p = "";
    for (let i = 0; i < 5; i++) {
      const ao = (-90 + i * 72) * Math.PI / 180;
      const ai = (-90 + i * 72 + 36) * Math.PI / 180;
      p += `${(cx + R * Math.cos(ao)).toFixed(1)},${(cy + R * Math.sin(ao)).toFixed(1)} `;
      p += `${(cx + R * 0.4 * Math.cos(ai)).toFixed(1)},${(cy + R * 0.4 * Math.sin(ai)).toFixed(1)} `;
    }
    return `<polygon points="${p.trim()}" fill="${fill}"/>`;
  };
  const F = {};
  // --- Europe ---
  F.france     = wrap(vt("#002654", "#FFFFFF", "#ED2939"));
  F.italie     = wrap(vt("#008C45", "#F4F9FF", "#CD212A"));
  F.belgique   = wrap(vt("#000000", "#FDDA24", "#EF3340"));
  F.allemagne  = wrap(ht("#000000", "#DD0000", "#FFCE00"));
  F.russie     = wrap(ht("#FFFFFF", "#0039A6", "#D52B1E"));
  F.hongrie    = wrap(ht("#CD2A3E", "#FFFFFF", "#477050"));
  F.pologne    = wrap(hb("#FFFFFF", "#DC143C"));
  F.suede      = wrap(`<rect width="30" height="20" fill="#006AA7"/><rect x="10" width="4" height="20" fill="#FECC00"/><rect y="8" width="30" height="4" fill="#FECC00"/>`);
  F.suisse     = wrap(`<rect width="30" height="20" fill="#D52B1E"/><rect x="13" y="5" width="4" height="10" fill="#FFFFFF"/><rect x="10" y="8" width="10" height="4" fill="#FFFFFF"/>`);
  F.angleterre = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect x="12" width="6" height="20" fill="#CE1124"/><rect y="7" width="30" height="6" fill="#CE1124"/>`);
  F.georgie    = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect x="12" width="6" height="20" fill="#FF0000"/><rect y="7" width="30" height="6" fill="#FF0000"/><rect x="5" y="3" width="2" height="2" fill="#FF0000"/><rect x="23" y="3" width="2" height="2" fill="#FF0000"/><rect x="5" y="15" width="2" height="2" fill="#FF0000"/><rect x="23" y="15" width="2" height="2" fill="#FF0000"/>`);
  F.grece      = wrap(`<rect width="30" height="20" fill="#0D5EAF"/><rect y="4" width="30" height="4" fill="#FFFFFF"/><rect y="12" width="30" height="4" fill="#FFFFFF"/><rect width="12" height="12" fill="#0D5EAF"/><rect x="5" width="2" height="12" fill="#FFFFFF"/><rect y="5" width="12" height="2" fill="#FFFFFF"/>`);
  F.portugal   = wrap(`<rect width="30" height="20" fill="#FF0000"/><rect width="12" height="20" fill="#006600"/><circle cx="12" cy="10" r="2.6" fill="#FFE900" stroke="#C8102E" stroke-width="0.6"/>`);
  F.espagne    = wrap(`<rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/><rect x="7" y="8" width="3" height="4" fill="#AD1519"/>`);
  // --- Amériques ---
  F.usa        = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect width="30" height="3.08" fill="#B22234"/><rect y="6.15" width="30" height="3.08" fill="#B22234"/><rect y="12.3" width="30" height="3.08" fill="#B22234"/><rect y="18.46" width="30" height="1.54" fill="#B22234"/><rect width="13" height="10.77" fill="#3C3B6E"/><circle cx="3" cy="2.5" r="0.7" fill="#fff"/><circle cx="7" cy="2.5" r="0.7" fill="#fff"/><circle cx="11" cy="2.5" r="0.7" fill="#fff"/><circle cx="5" cy="5.5" r="0.7" fill="#fff"/><circle cx="9" cy="5.5" r="0.7" fill="#fff"/><circle cx="3" cy="8.5" r="0.7" fill="#fff"/><circle cx="7" cy="8.5" r="0.7" fill="#fff"/><circle cx="11" cy="8.5" r="0.7" fill="#fff"/>`);
  F.canada     = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect width="7.5" height="20" fill="#FF0000"/><rect x="22.5" width="7.5" height="20" fill="#FF0000"/><polygon points="15,4 16,9 19,8 17,11 18,16 15,13.5 12,16 13,11 11,8 14,9" fill="#FF0000"/>`);
  F.mexique    = wrap(vt("#006847", "#FFFFFF", "#CE1126") + `<circle cx="15" cy="10" r="2" fill="#8C6239"/>`);
  F.bresil     = wrap(`<rect width="30" height="20" fill="#009C3B"/><polygon points="15,2 28,10 15,18 2,10" fill="#FEDF00"/><circle cx="15" cy="10" r="4" fill="#012169"/>`);
  F.argentine  = wrap(ht("#74ACDF", "#FFFFFF", "#74ACDF") + `<circle cx="15" cy="10" r="2" fill="#F6B40E"/>`);
  F.perou      = wrap(vt("#D91023", "#FFFFFF", "#D91023"));
  F.colombie   = wrap(`<rect width="30" height="20" fill="#FCD116"/><rect y="10" width="30" height="5" fill="#003893"/><rect y="15" width="30" height="5" fill="#CE1126"/>`);
  F.cuba       = wrap(`<rect width="30" height="20" fill="#002A8F"/><rect y="4" width="30" height="4" fill="#FFFFFF"/><rect y="12" width="30" height="4" fill="#FFFFFF"/><polygon points="0,0 11,10 0,20" fill="#CB1515"/>` + star(4.5, 10, 2, "#FFFFFF"));
  F.haiti      = wrap(hb("#00209F", "#D21034"));
  // --- Asie ---
  F.japon      = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><circle cx="15" cy="10" r="5.5" fill="#BC002D"/>`);
  F.chine      = wrap(`<rect width="30" height="20" fill="#DE2910"/>` + star(8, 7, 3.5, "#FFDE00"));
  F.coree      = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><circle cx="15" cy="10" r="5" fill="#CD2E3A"/><path d="M10 10 a5 5 0 0 0 10 0 z" fill="#0047A0"/>`);
  F.vietnam    = wrap(`<rect width="30" height="20" fill="#DA251D"/>` + star(15, 10, 5, "#FFFF00"));
  F.inde       = wrap(ht("#FF9933", "#FFFFFF", "#138808") + `<circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" stroke-width="0.6"/>`);
  F.thailande  = wrap(`<rect width="30" height="20" fill="#A51931"/><rect y="3.33" width="30" height="3.34" fill="#F4F5F8"/><rect y="6.67" width="30" height="6.66" fill="#2D2A4A"/><rect y="13.33" width="30" height="3.34" fill="#F4F5F8"/>`);
  F.indonesie  = wrap(hb("#CE1126", "#FFFFFF"));
  F.singapour  = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect width="30" height="10" fill="#ED2939"/><circle cx="7" cy="5" r="3" fill="#FFFFFF"/><circle cx="8.5" cy="5" r="2.5" fill="#ED2939"/>` + star(11, 3.5, 1, "#FFFFFF") + star(11, 6.5, 1, "#FFFFFF"));
  F.liban      = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect width="30" height="5" fill="#ED1C24"/><rect y="15" width="30" height="5" fill="#ED1C24"/><polygon points="15,7 17.5,13 12.5,13" fill="#007A3D"/>`);
  F.turquie    = wrap(`<rect width="30" height="20" fill="#E30A17"/><circle cx="12" cy="10" r="4.5" fill="#FFFFFF"/><circle cx="13.5" cy="10" r="3.6" fill="#E30A17"/>` + star(18, 10, 2, "#FFFFFF"));
  // --- Afrique ---
  F.maroc      = wrap(`<rect width="30" height="20" fill="#C1272D"/>` + star(15, 10, 4, "#006233"));
  F.senegal    = wrap(vt("#00853F", "#FDEF42", "#E31B23") + star(15, 10, 3, "#00853F"));
  F.nigeria    = wrap(vt("#008751", "#FFFFFF", "#008751"));
  F.ethiopie   = wrap(ht("#078930", "#FCDD09", "#DA121A") + `<circle cx="15" cy="10" r="3" fill="#0F47AF"/>` + star(15, 10, 2.2, "#FCDD09"));
  return F;
})();

function drapeau(pays, h) {
  if (!pays) return "";
  h = h || 14;
  const w = Math.round(h * 1.5);
  const key = ("" + pays).toLowerCase().trim();
  const GLOBE = `<svg viewBox="0 0 20 20" width="100%" height="100%"><circle cx="10" cy="10" r="9" fill="#4F91D9"/><path d="M1 10h18M10 1v18M3 5c4 3 10 3 14 0M3 15c4-3 10-3 14 0" stroke="#fff" stroke-width="0.8" fill="none" opacity="0.85"/></svg>`;
  const svg = DRAPEAUX[key] || GLOBE;
  return `<span class="drapeau-pays" title="${pays}" style="display:inline-block;width:${w}px;height:${h}px;border-radius:2px;overflow:hidden;border:0.5px solid rgba(0,0,0,.2);vertical-align:middle;line-height:0;flex:none">${svg}</span>`;
}

// Injecte le drapeau dans les cartes statiques (une seule passe au chargement)
function injecterDrapeauxCartes() {
  document.querySelectorAll(".carte[data-pays]").forEach(c => {
    if (c.querySelector(".drapeau-pays")) return;
    const h2 = c.querySelector(".carte-info h2");
    if (!h2) return;
    h2.insertAdjacentHTML("afterbegin", drapeau(c.dataset.pays, 15) + " ");
  });
}
if (typeof document !== "undefined") {
  if (document.readyState !== "loading") injecterDrapeauxCartes();
  else document.addEventListener("DOMContentLoaded", injecterDrapeauxCartes);
}
