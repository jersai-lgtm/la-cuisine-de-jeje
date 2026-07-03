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
  F.algerie    = wrap(`<rect width="15" height="20" fill="#006233"/><rect x="15" width="15" height="20" fill="#FFFFFF"/><circle cx="16" cy="10" r="4" fill="#D21034"/><circle cx="17.5" cy="10" r="3.3" fill="#FFFFFF"/>` + star(20, 10, 2, "#D21034"));
  F.tunisie    = wrap(`<rect width="30" height="20" fill="#E70013"/><circle cx="15" cy="10" r="4.5" fill="#FFFFFF"/><circle cx="16.5" cy="10" r="3.6" fill="#E70013"/>` + star(13.5, 10, 1.8, "#E70013"));
  F.egypte     = wrap(ht("#CE1126", "#FFFFFF", "#000000"));
  F.afriquedusud = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><polygon points="0,0 30,0 30,8 12,8" fill="#DE3831"/><polygon points="0,20 30,20 30,12 12,12" fill="#002395"/><polygon points="0,0 12,8 12,12 0,20" fill="#000000"/><polygon points="0,2 10,8 10,12 0,18" fill="#FFB81C"/><polygon points="0,4 8,9 8,11 0,16" fill="#007749"/>`);
  F.cotedivoire = wrap(vt("#FF8200", "#FFFFFF", "#009E60"));
  F.cameroun   = wrap(vt("#007A5E", "#CE1126", "#FCD116") + star(15, 10, 1.8, "#FCD116"));
  F.ghana      = wrap(ht("#CE1126", "#FCD116", "#006B3F") + star(15, 10, 2, "#000000"));
  F.congo      = wrap(`<rect width="30" height="20" fill="#FCD116"/><polygon points="0,0 0,20 22,0" fill="#009543"/><polygon points="30,0 30,20 8,20" fill="#DC241F"/>`);
  // --- Moyen-Orient ---
  F.iran       = wrap(ht("#239F40", "#FFFFFF", "#DA0000"));
  F.israel     = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect y="2.5" width="30" height="2.5" fill="#0038B8"/><rect y="15" width="30" height="2.5" fill="#0038B8"/><polygon points="15,6 18,11.5 12,11.5" fill="none" stroke="#0038B8" stroke-width="0.8"/><polygon points="15,14 12,8.5 18,8.5" fill="none" stroke="#0038B8" stroke-width="0.8"/>`);
  F.palestine  = wrap(ht("#000000", "#FFFFFF", "#007A3D") + `<polygon points="0,0 11,10 0,20" fill="#CE1126"/>`);
  F.jordanie   = wrap(ht("#000000", "#FFFFFF", "#007A3D") + `<polygon points="0,0 11,10 0,20" fill="#CE1126"/>` + star(4.5, 10, 1.6, "#FFFFFF"));
  F.arabiesaoudite = wrap(`<rect width="30" height="20" fill="#006C35"/><rect y="9" width="30" height="2" fill="#FFFFFF"/>`);
  F.chypre     = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><ellipse cx="15" cy="10" rx="7" ry="3" fill="#D4A017"/>`);
  // --- Asie centrale / Sud-Est ---
  F.malaisie   = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect y="0" width="30" height="2.86" fill="#CC0001"/><rect y="5.71" width="30" height="2.86" fill="#CC0001"/><rect y="11.43" width="30" height="2.86" fill="#CC0001"/><rect y="17.14" width="30" height="2.86" fill="#CC0001"/><rect width="15" height="11.4" fill="#010066"/><circle cx="7" cy="5.5" r="3" fill="#FFCC00"/><circle cx="8.2" cy="5.5" r="2.5" fill="#010066"/>` + star(11, 5.5, 1.2, "#FFCC00"));
  F.philippines = wrap(`<rect width="30" height="10" fill="#0038A8"/><rect y="10" width="30" height="10" fill="#CE1126"/><polygon points="0,0 13,10 0,20" fill="#FFFFFF"/><circle cx="5" cy="10" r="2" fill="#FCD116"/>`);
  F.kazakhstan = wrap(`<rect width="30" height="20" fill="#00AFCA"/><circle cx="15" cy="10" r="4" fill="#FEC50C"/>`);
  F.ouzbekistan = wrap(`<rect width="30" height="20" fill="#0099B5"/><rect y="6" width="30" height="1" fill="#CE1126"/><rect y="7" width="30" height="6" fill="#FFFFFF"/><rect y="13" width="30" height="1" fill="#CE1126"/><rect y="14" width="30" height="6" fill="#1EB53A"/>`);
  // --- Europe (suite) ---
  F.autriche   = wrap(ht("#ED2939", "#FFFFFF", "#ED2939"));
  F.serbie     = wrap(ht("#C6363C", "#0C4076", "#FFFFFF"));
  F.croatie    = wrap(ht("#FF0000", "#FFFFFF", "#171796") + `<rect x="13" y="7" width="2" height="2" fill="#FF0000"/><rect x="15" y="7" width="2" height="2" fill="#FFFFFF"/><rect x="13" y="9" width="2" height="2" fill="#FFFFFF"/><rect x="15" y="9" width="2" height="2" fill="#FF0000"/>`);
  F.slovaquie  = wrap(ht("#FFFFFF", "#0B4EA2", "#EE1C25"));
  F.ukraine    = wrap(hb("#0057B7", "#FFD700"));
  F.bielorussie = wrap(`<rect width="30" height="20" fill="#D22730"/><rect y="13.3" width="30" height="6.7" fill="#007A3D"/>`);
  F.danemark   = wrap(`<rect width="30" height="20" fill="#C8102E"/><rect x="10" width="4" height="20" fill="#FFFFFF"/><rect y="8" width="30" height="4" fill="#FFFFFF"/>`);
  F.irlande    = wrap(vt("#169B62", "#FFFFFF", "#FF883E"));
  F.paysbas    = wrap(ht("#AE1C28", "#FFFFFF", "#21468B"));
  // --- Amériques (suite) ---
  F.venezuela  = wrap(ht("#FCD116", "#003893", "#CF142B") + `<circle cx="11" cy="10" r="0.8" fill="#FFF"/><circle cx="14" cy="9" r="0.8" fill="#FFF"/><circle cx="17" cy="9" r="0.8" fill="#FFF"/><circle cx="20" cy="10" r="0.8" fill="#FFF"/>`);
  F.portorico  = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect y="0" width="30" height="4" fill="#ED1C24"/><rect y="8" width="30" height="4" fill="#ED1C24"/><rect y="16" width="30" height="4" fill="#ED1C24"/><polygon points="0,0 13,10 0,20" fill="#0050F0"/>` + star(5, 10, 2.2, "#FFFFFF"));
  F.salvador   = wrap(ht("#0047AB", "#FFFFFF", "#0047AB"));
  F.honduras   = wrap(ht("#0073CF", "#FFFFFF", "#0073CF") + star(11,10,1,"#0073CF") + star(13.5,8.5,1,"#0073CF") + star(15,10,1,"#0073CF") + star(16.5,8.5,1,"#0073CF") + star(19,10,1,"#0073CF"));
  F.costarica  = wrap(`<rect width="30" height="3" fill="#002B7F"/><rect y="3" width="30" height="2" fill="#FFFFFF"/><rect y="5" width="30" height="10" fill="#CE1126"/><rect y="15" width="30" height="2" fill="#FFFFFF"/><rect y="17" width="30" height="3" fill="#002B7F"/>`);
  F.uruguay    = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect y="2.2" width="30" height="2.2" fill="#0038A8"/><rect y="6.6" width="30" height="2.2" fill="#0038A8"/><rect y="11" width="30" height="2.2" fill="#0038A8"/><rect y="15.4" width="30" height="2.2" fill="#0038A8"/><rect width="12" height="11" fill="#FFFFFF"/><circle cx="6" cy="5.5" r="2.5" fill="#FCD116"/>`);
  F.chili      = wrap(`<rect width="30" height="10" fill="#FFFFFF"/><rect y="10" width="30" height="10" fill="#D52B1E"/><rect width="10" height="10" fill="#0039A6"/>` + star(5, 5, 2.2, "#FFFFFF"));
  // --- Europe centrale / Asie (suite) ---
  F.tchequie   = wrap(`<rect width="30" height="10" fill="#FFFFFF"/><rect y="10" width="30" height="10" fill="#D7141A"/><polygon points="0,0 15,10 0,20" fill="#11457E"/>`);
  F.myanmar    = wrap(ht("#FECB00", "#34B233", "#EA2839") + star(15, 10, 2.5, "#FFFFFF"));
  // --- Asie du Sud / Sud-Est (suite) ---
  F.srilanka   = wrap(`<rect width="30" height="20" fill="#8D153A"/><rect width="7" height="20" fill="#FFB700"/><rect x="3" width="2" height="20" fill="#00534E"/><rect x="5" width="2" height="20" fill="#FF5B00"/><rect x="14" y="5" width="12" height="10" rx="1" fill="#FFB700"/>`);
  F.bangladesh = wrap(`<rect width="30" height="20" fill="#006A4E"/><circle cx="13" cy="10" r="5.5" fill="#F42A41"/>`);
  F.nepal      = wrap(`<rect width="30" height="20" fill="#DC143C"/><polygon points="2,2 2,18 22,10" fill="none" stroke="#003893" stroke-width="1.2"/>` + star(11, 10, 2, "#FFFFFF"));
  F.cambodge   = wrap(ht("#032EA1", "#E00025", "#032EA1") + `<rect x="12" y="5" width="6" height="10" fill="#FFFFFF"/><polygon points="12,5 15,2 18,5" fill="#FFFFFF"/>`);
  F.laos       = wrap(ht("#CE1126", "#002868", "#CE1126") + `<circle cx="15" cy="10" r="3.6" fill="#FFFFFF"/>`);
  F.mongolie   = wrap(vt("#C4272F", "#015197", "#C4272F") + `<rect x="1" y="4" width="4" height="12" fill="#FFC93C"/>`);
  F.armenie    = wrap(ht("#D90012", "#0033A0", "#F2A800"));
  // --- Afrique de l'Est / Australe (suite) ---
  F.kenya      = wrap(ht("#000000", "#BB0000", "#006600") + `<rect y="8.5" width="30" height="3" fill="#FFFFFF"/><polygon points="15,6.5 19,13.5 11,13.5" fill="#BB0000" stroke="#FFFFFF" stroke-width="0.6"/>`);
  F.tanzanie   = wrap(`<rect width="30" height="20" fill="#1EB53A"/><polygon points="0,0 0,7 23,20 30,20 30,13 7,0" fill="#000000"/><polygon points="0,7 0,10 20,20 23,20" fill="#FCD116"/><polygon points="7,0 10,0 30,10 30,13" fill="#FCD116"/><polygon points="0,10 0,13 17,20 20,20" fill="#00A3DD"/><polygon points="10,0 13,0 30,7 30,10" fill="#00A3DD"/>`);
  F.madagascar = wrap(`<rect width="10" height="20" fill="#FFFFFF"/><rect x="10" width="20" height="10" fill="#FC3D32"/><rect x="10" y="10" width="20" height="10" fill="#007E3A"/>`);
  // --- Amérique latine (suite) ---
  F.bolivie    = wrap(ht("#D52B1E", "#F9E300", "#007934"));
  F.paraguay   = wrap(ht("#D52B1E", "#FFFFFF", "#0038A8"));
  F.dominicaine = wrap(`<rect width="30" height="20" fill="#002D62"/><rect x="13" width="4" height="20" fill="#FFFFFF"/><rect y="8" width="30" height="4" fill="#FFFFFF"/><rect width="13" height="8" fill="#CE1126"/><rect x="17" width="13" height="8" fill="#002D62"/><rect width="13" height="8" y="12" fill="#002D62"/><rect x="17" y="12" width="13" height="8" fill="#CE1126"/>`);
  F.bahamas    = wrap(ht("#00778B", "#FFC72C", "#00778B") + `<polygon points="0,0 13,10 0,20" fill="#000000"/>`);
  // --- Europe du Nord (suite) ---
  F.islande    = wrap(`<rect width="30" height="20" fill="#02529C"/><rect x="10" width="4" height="20" fill="#FFFFFF"/><rect y="8" width="30" height="4" fill="#FFFFFF"/><rect x="11" width="2" height="20" fill="#DC1E35"/><rect y="9" width="30" height="2" fill="#DC1E35"/>`);
  F.finlande   = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect x="10" width="4" height="20" fill="#002F6C"/><rect y="8" width="30" height="4" fill="#002F6C"/>`);
  F.norvege    = wrap(`<rect width="30" height="20" fill="#EF2B2D"/><rect x="10" width="4" height="20" fill="#FFFFFF"/><rect y="8" width="30" height="4" fill="#FFFFFF"/><rect x="11" width="2" height="20" fill="#002868"/><rect y="9" width="30" height="2" fill="#002868"/>`);
  F.lettonie   = wrap(ht("#9E3039", "#FFFFFF", "#9E3039"));
  // --- Balkans (suite) ---
  F.montenegro = wrap(`<rect width="30" height="20" fill="#D3111B"/><rect x="1" y="1" width="28" height="18" fill="none" stroke="#D3AC2B" stroke-width="1.4"/><circle cx="15" cy="10" r="3.5" fill="#D3AC2B"/>`);
  F.albanie    = wrap(`<rect width="30" height="20" fill="#E41E20"/><polygon points="15,6 17,10 15,14 13,10" fill="#000000"/><polygon points="11,10 19,10" fill="none" stroke="#000000" stroke-width="1"/>`);
  F.bulgarie   = wrap(ht("#FFFFFF", "#00966E", "#D62612"));
  // --- Îles britanniques (suite) ---
  F.paysdegalles = wrap(`<rect width="30" height="10" fill="#FFFFFF"/><rect y="10" width="30" height="10" fill="#00B140"/><polygon points="8,17 12,9 16,13 14,17" fill="#C8102E"/><polygon points="16,13 20,7 22,10 18,15" fill="#C8102E"/>`);
  F.ecosse     = wrap(`<rect width="30" height="20" fill="#005EB8"/><polygon points="0,0 4,0 30,17 30,20 26,20 0,3" fill="#FFFFFF"/><polygon points="30,0 26,0 0,17 0,20 4,20 30,3" fill="#FFFFFF"/>`);
  F.malte      = wrap(`<rect width="15" height="20" fill="#FFFFFF"/><rect x="15" width="15" height="20" fill="#CF142B"/><rect x="1" y="1" width="7" height="7" fill="#C0C0C0"/><rect x="2.3" y="1" width="4.4" height="7" fill="#8C8C8C"/><rect x="1" y="2.3" width="7" height="4.4" fill="#8C8C8C"/>`);
  // --- Régions / territoires (pas de drapeau national, icône thématique) ---
  F.polynesie  = wrap(ht("#CE1126", "#FFFFFF", "#CE1126") + `<circle cx="15" cy="10" r="2.5" fill="#FFD100"/>`);
  F.tibet      = wrap(`<rect width="30" height="20" fill="#9AC9E3"/><polygon points="2,18 9,6 14,13 19,4 28,18" fill="#FFFFFF"/>`);
  F.hawaii     = wrap(`<rect width="30" height="20" fill="#FF6F91"/><circle cx="15" cy="10" r="3.5" fill="#FFD23F"/><circle cx="11" cy="7" r="2" fill="#FF477E"/><circle cx="19" cy="7" r="2" fill="#FF477E"/><circle cx="11" cy="13" r="2" fill="#FF477E"/><circle cx="19" cy="13" r="2" fill="#FF477E"/>`);
  F.reunion    = wrap(`<rect width="30" height="20" fill="#FF914D"/><polygon points="4,18 12,5 20,18" fill="#2D6A4F"/><circle cx="12" cy="6" r="1.5" fill="#FFD23F"/>`);
  const caraibeIcon = `<rect width="30" height="20" fill="#1CA9C9"/><circle cx="22" cy="6" r="3" fill="#FFD23F"/><rect y="14" width="30" height="6" fill="#2E8B57"/><polygon points="6,14 8,4 10,14" fill="#0E6B3A"/>`;
  F.antilles   = wrap(caraibeIcon);
  F.caraibes   = wrap(caraibeIcon);

  // --- Vague 4 (07/2026) : Caraïbes, Pacifique, Asie centrale, Afrique, petites nations europe ---
  // Caraïbes
  F.jamaique   = wrap(`<rect width="30" height="20" fill="#009B3A"/><polygon points="0,0 30,0 15,10" fill="#000000"/><polygon points="0,20 30,20 15,10" fill="#000000"/><polygon points="0,0 15,10 0,3" fill="#FED100"/><polygon points="30,0 15,10 30,3" fill="#FED100"/><polygon points="0,20 15,10 0,17" fill="#FED100"/><polygon points="30,20 15,10 30,17" fill="#FED100"/>`);
  F.trinite    = wrap(`<rect width="30" height="20" fill="#CE1126"/><polygon points="0,0 5,0 30,17 30,20 25,20 0,3" fill="#FFFFFF"/><polygon points="0,1.2 4,0 30,16.5 30,18.8 26,20 0,3.3" fill="#000000"/>`);
  F.barbade    = wrap(vt("#00267F", "#FFC726", "#00267F") + `<polygon points="15,4 13,9 14,9 14,14 12,16 18,16 16,14 16,9 17,9" fill="#000000"/>`);
  F.belize     = wrap(`<rect width="30" height="20" fill="#003F87"/><rect width="30" height="2" fill="#CE1126"/><rect y="18" width="30" height="2" fill="#CE1126"/><circle cx="15" cy="10" r="6" fill="#FFFFFF"/><circle cx="15" cy="10" r="5" fill="#F0F0F0" stroke="#003F87" stroke-width="0.5"/>`);
  F.guyane     = wrap(`<rect width="30" height="20" fill="#128807"/><polygon points="0,0 12,10 0,20" fill="#FCD116"/>` + star(20, 10, 2.5, "#E8112D"));
  // Pacifique / Océanie
  const ukCanton = `<rect x="1" y="1" width="10" height="6.5" fill="#00247D"/><rect x="1" y="1" width="10" height="0.8" fill="#FFFFFF"/><rect x="5.6" y="1" width="0.8" height="6.5" fill="#FFFFFF"/>`;
  F.fidji      = wrap(`<rect width="30" height="20" fill="#68BFE5"/>${ukCanton}<polygon points="18,6 22,14 14,14" fill="#FFFFFF" stroke="#CE1126" stroke-width="0.5"/>`);
  F.samoa      = wrap(`<rect width="30" height="20" fill="#CE1126"/><rect width="13" height="10" fill="#002B7F"/>${star(4, 3, 1.1, "#FFFFFF")}${star(8, 2.5, 1, "#FFFFFF")}${star(9.5, 6, 1, "#FFFFFF")}${star(5, 7.5, 1, "#FFFFFF")}${star(6.5, 5, 0.7, "#FFFFFF")}`);
  F.nouvellezelande = wrap(`<rect width="30" height="20" fill="#00247D"/>${ukCanton}${star(20, 4, 1.3, "#CE1126")}${star(24, 8, 1.3, "#CE1126")}${star(22, 13, 1.3, "#CE1126")}${star(17, 15, 1, "#CE1126")}`);
  F.australie  = wrap(`<rect width="30" height="20" fill="#00247D"/>${ukCanton}${star(6, 15, 1.3, "#FFFFFF")}${star(20, 4, 1.2, "#FFFFFF")}${star(24, 8, 1.2, "#FFFFFF")}${star(22, 13, 1.2, "#FFFFFF")}${star(17, 15, 0.9, "#FFFFFF")}`);
  F.tonga      = wrap(`<rect width="30" height="20" fill="#C10000"/><rect x="1" y="1" width="10" height="8" fill="#FFFFFF"/><rect x="5" y="2" width="2" height="6" fill="#C10000"/><rect x="2" y="4" width="8" height="2" fill="#C10000"/>`);
  F.vanuatu    = wrap(`<rect width="30" height="20" fill="#009543"/><polygon points="0,0 30,7 30,9 0,10" fill="#D21034"/><rect y="9" width="30" height="1.2" fill="#FDCE12"/><polygon points="0,0 0,20 10,10" fill="#000000"/>`);
  F.papouasie  = wrap(`<polygon points="0,0 30,0 0,20" fill="#000000"/><polygon points="30,0 30,20 0,20" fill="#CE1126"/>${star(22, 5, 1, "#FFFFFF")}${star(25, 9, 0.8, "#FFFFFF")}${star(23, 13, 0.8, "#FFFFFF")}${star(19, 15, 0.7, "#FFFFFF")}${star(26, 14, 0.6, "#FFFFFF")}<polygon points="7,4 9,8 6,7 8,10 4,9 6,12 3,10" fill="#FFC726"/>`);
  // Asie centrale / Caucase
  F.kirghizistan = wrap(`<rect width="30" height="20" fill="#E8112D"/><circle cx="15" cy="10" r="4.5" fill="#FFFF00"/><circle cx="15" cy="10" r="3.2" fill="#E8112D"/><polygon points="15,7.5 15.6,9.4 17.5,9.4 16,10.5 16.6,12.4 15,11.3 13.4,12.4 14,10.5 12.5,9.4 14.4,9.4" fill="#FFFF00"/>`);
  F.tadjikistan = wrap(ht("#CC0000", "#FFFFFF", "#006600") + `<polygon points="15,8.5 13.5,10.5 16.5,10.5" fill="#F8C300"/>` + star(15, 7.5, 0.7, "#F8C300"));
  F.turkmenistan = wrap(`<rect width="30" height="20" fill="#1D8642"/><rect x="0" width="6" height="20" fill="#8B1538"/><rect x="0" width="0.6" height="20" fill="#FFFFFF"/><rect x="5.4" width="0.6" height="20" fill="#FFFFFF"/><path d="M 20 6 A 3.5 3.5 0 1 0 20 14 A 2.8 2.8 0 1 1 20 6" fill="#FFFFFF"/>${star(23, 7, 0.8, "#FFFFFF")}${star(24.5, 9, 0.8, "#FFFFFF")}${star(24, 11.5, 0.8, "#FFFFFF")}`);
  F.azerbaidjan = wrap(ht("#00B9E4", "#EF3340", "#00AF66") + `<path d="M 16 7.3 A 2.8 2.8 0 1 0 16 12.7 A 2.2 2.2 0 1 1 16 7.3" fill="#FFFFFF"/>` + star(19, 10, 0.8, "#FFFFFF"));
  // Afrique
  F.mali       = wrap(vt("#14B53A", "#FCD116", "#CE1126"));
  F.ouganda    = wrap(`<rect width="30" height="20" fill="#000000"/><rect y="3.33" width="30" height="3.33" fill="#FCDC04"/><rect y="6.67" width="30" height="3.33" fill="#D90000"/><rect y="10" width="30" height="3.33" fill="#000000"/><rect y="13.33" width="30" height="3.33" fill="#FCDC04"/><rect y="16.67" width="30" height="3.33" fill="#D90000"/><circle cx="15" cy="10" r="4" fill="#FFFFFF"/><polygon points="15,7 16,10 15,13 14,10" fill="#000000"/>`);
  F.mozambique = wrap(`<rect width="30" height="20" fill="#FCD116"/><rect y="1" width="30" height="6" fill="#009739"/><rect y="13" width="30" height="6" fill="#000000"/><polygon points="0,0 0,20 13,10" fill="#CE1126"/>` + star(5.5, 10, 1.6, "#FCD116"));
  F.zambie     = wrap(`<rect width="30" height="20" fill="#198A00"/><rect x="20" width="3" height="20" fill="#DE2010"/><rect x="23" width="3" height="20" fill="#000000"/><rect x="26" width="3" height="20" fill="#EF7D00"/><polygon points="24,3 26,7 22,7" fill="#DE2010"/>`);
  F.zimbabwe   = wrap(`<rect width="30" height="20" fill="#006400"/><rect y="2.86" width="30" height="2.86" fill="#FFD200"/><rect y="5.71" width="30" height="2.86" fill="#D40000"/><rect y="8.57" width="30" height="2.86" fill="#000000"/><rect y="11.43" width="30" height="2.86" fill="#D40000"/><rect y="14.29" width="30" height="2.86" fill="#FFD200"/><rect y="17.14" width="30" height="2.86" fill="#006400"/><polygon points="0,0 0,20 12,10" fill="#FFFFFF"/><polygon points="0,2 0,18 9,10" fill="#000000"/>${star(4.5, 10, 1.5, "#D40000")}`);
  F.namibie    = wrap(`<polygon points="0,0 30,0 0,20" fill="#003580"/><polygon points="30,0 30,20 0,20" fill="#009543"/><polygon points="-1.44,22.16 1.44,17.84 31.44,-2.16 28.56,2.16" fill="#FFFFFF"/><polygon points="-1,21.5 1,18.5 31,-1.5 29,1.5" fill="#D21034"/><circle cx="8" cy="6" r="2.5" fill="#FFCE00"/>`);
  F.botswana   = wrap(`<rect width="30" height="20" fill="#75AADB"/><rect y="7.5" width="30" height="5" fill="#000000"/><rect y="8.5" width="30" height="3" fill="#FFFFFF"/>`);
  F.somalie    = wrap(`<rect width="30" height="20" fill="#4189DD"/>` + star(15, 10, 4, "#FFFFFF"));
  F.rwanda     = wrap(`<rect width="30" height="20" fill="#20603D"/><rect width="30" height="12" fill="#00A1DE"/><rect y="12" width="30" height="2" fill="#FAD201"/><circle cx="23" cy="6" r="2.5" fill="#FAD201"/>`);
  F.burkinafaso = wrap(hb("#EF2B2D", "#009E49") + star(15, 10, 2.5, "#FCD116"));
  F.benin      = wrap(`<rect width="30" height="20" fill="#008751"/><rect x="10" width="20" height="10" fill="#FCD116"/><rect x="10" y="10" width="20" height="10" fill="#E8112D"/>`);
  F.angola     = wrap(hb("#CC092F", "#000000") + star(15, 10, 1.8, "#FFCB00"));
  F.tchad      = wrap(vt("#002664", "#FECB00", "#C60C30"));
  F.gambie     = wrap(`<rect width="30" height="20" fill="#CE1126"/><rect y="7.5" width="30" height="5" fill="#0C1C8C"/><rect y="6.8" width="30" height="0.7" fill="#FFFFFF"/><rect y="12.5" width="30" height="0.7" fill="#FFFFFF"/><rect y="13.2" width="30" height="6.8" fill="#3A7728"/>`);
  F.malawi     = wrap(ht("#000000", "#CE1126", "#339E35") + `<circle cx="15" cy="3.3" r="2.8" fill="#CE1126"/>`);
  F.caboverde  = wrap(`<rect width="30" height="20" fill="#003893"/><rect y="11" width="30" height="1.5" fill="#FFFFFF"/><rect y="12.5" width="30" height="1" fill="#CF2027"/><rect y="13.5" width="30" height="1.5" fill="#FFFFFF"/>${star(9, 12, 0.6, "#F7D116")}${star(11, 10.5, 0.6, "#F7D116")}${star(13.5, 10, 0.6, "#F7D116")}${star(16.5, 10, 0.6, "#F7D116")}${star(19, 10.5, 0.6, "#F7D116")}${star(21, 12, 0.6, "#F7D116")}${star(11.5, 13.5, 0.6, "#F7D116")}${star(14.5, 14, 0.6, "#F7D116")}${star(17.5, 14, 0.6, "#F7D116")}${star(19.5, 13.5, 0.6, "#F7D116")}`);
  // Petites nations d'Europe
  F.slovenie   = wrap(ht("#FFFFFF", "#005CE6", "#ED1C24") + `<rect x="2" y="2" width="4" height="5" fill="#005CE6"/>` + star(4, 3.5, 0.6, "#FFCB05"));
  F.bosnie     = wrap(`<rect width="30" height="20" fill="#002395"/><polygon points="0,0 14,0 0,20" fill="#FECB00"/>${star(11, 3, 0.9, "#FFFFFF")}${star(15, 6, 0.9, "#FFFFFF")}${star(19, 9, 0.9, "#FFFFFF")}${star(23, 12, 0.9, "#FFFFFF")}${star(27, 15, 0.9, "#FFFFFF")}`);
  F.macedoinedunord = wrap(`<rect width="30" height="20" fill="#D20000"/><circle cx="15" cy="10" r="3" fill="#FFE600"/><polygon points="15,10 0,0 8,0" fill="#FFE600"/><polygon points="15,10 22,0 30,0" fill="#FFE600"/><polygon points="15,10 0,20 8,20" fill="#FFE600"/><polygon points="15,10 22,20 30,20" fill="#FFE600"/><polygon points="15,10 0,0 0,8" fill="#FFE600"/><polygon points="15,10 0,12 0,20" fill="#FFE600"/><polygon points="15,10 30,0 30,8" fill="#FFE600"/><polygon points="15,10 30,12 30,20" fill="#FFE600"/>`);
  F.luxembourg = wrap(ht("#ED2939", "#FFFFFF", "#00A1DE"));
  F.kosovo     = wrap(`<rect width="30" height="20" fill="#244AA5"/><polygon points="12,8 14,7 16,8 18,7 19,9 17,11 19,13 16,13 14,14 13,12 11,11" fill="#FFC800"/>${star(9, 5, 0.7, "#FFFFFF")}${star(13, 3.5, 0.7, "#FFFFFF")}${star(17, 3.5, 0.7, "#FFFFFF")}${star(21, 5, 0.7, "#FFFFFF")}${star(23, 7, 0.7, "#FFFFFF")}${star(7, 7, 0.7, "#FFFFFF")}`);
  F.estonie    = wrap(ht("#0072CE", "#000000", "#FFFFFF"));
  F.lituanie   = wrap(ht("#FDB913", "#006A44", "#C1272D"));
  F.moldavie   = wrap(vt("#0033A0", "#FFD200", "#CC092F") + `<rect x="11" y="6" width="8" height="8" fill="#CC092F"/>` + star(15, 10, 1, "#FFD200"));
  // Moyen-Orient / Asie
  F.yemen      = wrap(ht("#CE1126", "#FFFFFF", "#000000"));
  F.emiratsarabesunis = wrap(ht("#00732F", "#FFFFFF", "#000000") + `<rect width="7" height="20" fill="#FF0000"/>`);
  F.brunei     = wrap(`<rect width="30" height="20" fill="#FCD116"/><polygon points="0,0 30,13.3 30,20 0,6.7" fill="#FFFFFF"/><polygon points="0,0 30,10 30,13.3 0,3.3" fill="#000000"/><circle cx="15" cy="10" r="2.5" fill="#CE1126"/>`);
  F.timororiental = wrap(`<rect width="30" height="20" fill="#DC241F"/><polygon points="0,0 16,10 0,20" fill="#FFC726"/><polygon points="0,0 10,10 0,20" fill="#000000"/>` + star(4, 10, 1.2, "#FFFFFF"));
  F.bhoutan    = wrap(`<polygon points="0,0 30,0 0,20" fill="#FFCE00"/><polygon points="30,0 30,20 0,20" fill="#FF4E12"/><path d="M8,14 Q12,8 18,9 Q15,11 16,14 Q12,12 8,14" fill="#FFFFFF"/>`);
  F.seychelles = wrap(`<rect width="30" height="20" fill="#007A3D"/><polygon points="0,20 0,0 30,20" fill="#FFFFFF"/><polygon points="0,20 0,3 24,20" fill="#D62828"/><polygon points="0,20 0,6 18,20" fill="#FCD116"/><polygon points="0,20 0,9 12,20" fill="#003F87"/>`);
  F.afghanistan = wrap(vt("#000000", "#D32011", "#007A36") + `<rect x="12" y="7" width="6" height="6" fill="#FFFFFF"/>`);
  F.pakistan   = wrap(`<rect width="30" height="20" fill="#01411C"/><rect width="7" height="20" fill="#FFFFFF"/><path d="M 20 6 A 4 4 0 1 0 20 14 A 3.2 3.2 0 1 1 20 6" fill="#FFFFFF"/>` + star(24, 7.5, 1.3, "#FFFFFF"));
  // Amérique latine
  F.equateur   = wrap(`<rect width="30" height="20" fill="#FFDD00"/><rect y="10" width="30" height="5" fill="#0033A0"/><rect y="15" width="30" height="5" fill="#EF3340"/>`);
  F.guatemala  = wrap(vt("#4997D0", "#FFFFFF", "#4997D0") + `<circle cx="15" cy="10" r="2.2" fill="#4997D0"/>`);
  F.nicaragua  = wrap(ht("#0067C6", "#FFFFFF", "#0067C6") + `<polygon points="15,7.5 13,11.5 17,11.5" fill="none" stroke="#0067C6" stroke-width="0.6"/>`);
  F.panama     = wrap(`<rect width="15" height="10" fill="#FFFFFF"/><rect x="15" width="15" height="10" fill="#005293"/><rect y="10" width="15" height="10" fill="#D21034"/><rect x="15" y="10" width="15" height="10" fill="#FFFFFF"/>${star(7.5, 5, 1.5, "#D21034")}${star(22.5, 15, 1.5, "#005293")}`);

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
