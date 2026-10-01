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
  F.guyane     = wrap(`<rect width="30" height="20" fill="#078930"/><polygon points="0,20 30,0 30,20" fill="#FCD116"/>` + star(15, 10, 3, "#CE1126"));
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


  // --- Vague 5 (10/2026) : complétion de la table (81 clés) ---
  // Pavillon britannique : champ uni + canton UK + emblème au battant
  const ensign = (champ, embleme) => wrap(`<rect width="30" height="20" fill="${champ}"/>${ukCanton}${embleme || ""}`);
  // écusson (bouclier) porté par les emblèmes des ensigns
  const ecu = (fond, dedans) => `<path d="M17.4 7.6 h7.2 v4.4 a3.6 3.6 0 0 1 -7.2 0 z" fill="${fond}"/>${dedans || ""}`;
  // anneau de n étoiles (Îles Cook, etc.)
  const anneau = (cx, cy, r, n, rs, fill) => Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n - Math.PI / 2;
    return star(+(cx + r * Math.cos(a)).toFixed(1), +(cy + r * Math.sin(a)).toFixed(1), rs, fill);
  }).join("");
  // croissant : grand disque évidé par un disque un peu plus petit, décalé
  const croissant = (cx, cy, R, fill) => `<path d="M${cx} ${cy - R} A${R} ${R} 0 1 0 ${cx} ${cy + R} A${(R * 0.8).toFixed(1)} ${(R * 0.8).toFixed(1)} 0 1 1 ${cx} ${cy - R}" fill="${fill}"/>`;

  // Europe
  F.roumanie   = wrap(vt("#002B7F", "#FCD116", "#CE1126"));
  F.monaco     = wrap(hb("#CE1126", "#FFFFFF"));
  F.saintmarin = wrap(hb("#FFFFFF", "#5EB6E4") + `<circle cx="15" cy="10" r="2.6" fill="#FFFFFF" stroke="#C8A900" stroke-width="0.5"/><rect x="13" y="8.6" width="1" height="2.4" fill="#4C9F70"/><rect x="14.5" y="8.2" width="1" height="2.8" fill="#4C9F70"/><rect x="16" y="8.6" width="1" height="2.4" fill="#4C9F70"/>`);
  F.liechtenstein = wrap(hb("#002B7F", "#CE1126") + `<rect x="4" y="3.4" width="5.4" height="1.8" fill="#FFD83D"/><polygon points="4,3.4 5.3,1.6 6.7,3.4 8.1,1.6 9.4,3.4" fill="#FFD83D"/>`);
  F.andorre    = wrap(vt("#10069F", "#FEDD00", "#D0103A") + `<path d="M12 6.6 h6 v4 a3 3 0 0 1 -6 0 z" fill="#D0103A" stroke="#FEDD00" stroke-width="0.4"/><rect x="12" y="6.6" width="3" height="4.2" fill="#10069F"/>`);
  F.aland      = wrap(`<rect width="30" height="20" fill="#0053A5"/><rect x="9" width="6" height="20" fill="#FFCE00"/><rect y="7" width="30" height="6" fill="#FFCE00"/><rect x="10.5" width="3" height="20" fill="#CE1126"/><rect y="8.5" width="30" height="3" fill="#CE1126"/>`);
  F.feroe      = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect x="9" width="6" height="20" fill="#0065BD"/><rect y="7" width="30" height="6" fill="#0065BD"/><rect x="10.2" width="3.6" height="20" fill="#ED2939"/><rect y="8.2" width="30" height="3.6" fill="#ED2939"/>`);
  F.jersey     = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><polygon points="0,0 4,0 30,17 30,20 26,20 0,3" fill="#CE1126"/><polygon points="30,0 26,0 0,17 0,20 4,20 30,3" fill="#CE1126"/><polygon points="15,1.4 16.8,4.4 13.2,4.4" fill="#F9DD16"/>`);
  F.guernesey  = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect x="12" width="6" height="20" fill="#CE1126"/><rect y="7" width="30" height="6" fill="#CE1126"/><rect x="14.3" y="3" width="1.4" height="14" fill="#F9DD16"/><rect x="6" y="9.3" width="18" height="1.4" fill="#F9DD16"/>`);
  F.iledeman   = wrap(`<rect width="30" height="20" fill="#CF142B"/><g stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M15 10 L15 4.6 L17.6 3.6"/><path d="M15 10 L19.7 12.7 L19.2 15.6"/><path d="M15 10 L10.3 12.7 L7.8 10.6"/></g>`);
  F.gibraltar  = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect y="13.4" width="30" height="6.6" fill="#DA000C"/><rect x="11" y="5.4" width="8" height="5.6" fill="#DA000C"/><rect x="10.8" y="3.4" width="2.2" height="2" fill="#DA000C"/><rect x="13.9" y="2.4" width="2.2" height="3" fill="#DA000C"/><rect x="17" y="3.4" width="2.2" height="2" fill="#DA000C"/><rect x="14.5" y="11" width="1" height="2.6" fill="#F9DD16"/><circle cx="15" cy="13.8" r="1.1" fill="none" stroke="#F9DD16" stroke-width="0.6"/>`);

  // Caraïbes
  F.dominique  = wrap(`<rect width="30" height="20" fill="#006B3F"/><rect x="12.6" width="1.6" height="20" fill="#FCD116"/><rect x="14.2" width="1.6" height="20" fill="#000000"/><rect x="15.8" width="1.6" height="20" fill="#FFFFFF"/><rect y="7.6" width="30" height="1.6" fill="#FCD116"/><rect y="9.2" width="30" height="1.6" fill="#000000"/><rect y="10.8" width="30" height="1.6" fill="#FFFFFF"/><circle cx="15" cy="10" r="3.4" fill="#D41C30"/>`);
  F.saintvincent = wrap(`<rect width="30" height="20" fill="#0072C6"/><rect x="7.5" width="15" height="20" fill="#FCD116"/><rect x="22.5" width="7.5" height="20" fill="#009E60"/><polygon points="12,6.6 13.3,8.8 12,11 10.7,8.8" fill="#009E60"/><polygon points="18,6.6 19.3,8.8 18,11 16.7,8.8" fill="#009E60"/><polygon points="15,10.4 16.3,12.6 15,14.8 13.7,12.6" fill="#009E60"/>`);
  F.saintelucie = wrap(`<rect width="30" height="20" fill="#66CCFF"/><polygon points="15,13.2 20.6,17.4 9.4,17.4" fill="#FCD116"/><polygon points="15,2.8 22,17 8,17" fill="#FFFFFF"/><polygon points="15,4.6 20.3,16.1 9.7,16.1" fill="#000000"/><polygon points="15,10.4 19.6,17 10.4,17" fill="#FCD116"/>`);
  F.grenade    = wrap(`<rect width="30" height="20" fill="#CE1126"/><polygon points="3,3 27,3 15,10" fill="#FCD116"/><polygon points="3,17 27,17 15,10" fill="#FCD116"/><polygon points="3,3 3,17 15,10" fill="#007A5E"/><polygon points="27,3 27,17 15,10" fill="#007A5E"/><circle cx="15" cy="10" r="3" fill="#CE1126"/>` + star(15, 10, 2, "#FCD116") + star(15, 1.6, 1, "#FCD116") + star(15, 18.4, 1, "#FCD116"));
  F.antigua    = wrap(`<rect width="30" height="20" fill="#CE1126"/><polygon points="2,0 28,0 15,20" fill="#FFFFFF"/><polygon points="2,0 28,0 15,16.6" fill="#0072C6"/><polygon points="2,0 28,0 15,11.6" fill="#000000"/><path d="M11 10.6 A4 4 0 0 1 19 10.6 Z" fill="#FCD116"/>`);
  F.saintkitts = wrap(`<rect width="30" height="20" fill="#009E49"/><polygon points="30,0 30,20 0,20" fill="#CE1126"/><path d="M0 20 L30 0" stroke="#FCD116" stroke-width="7" fill="none"/><path d="M0 20 L30 0" stroke="#000000" stroke-width="4.2" fill="none"/>` + star(9, 13, 1.4, "#FFFFFF") + star(20, 6, 1.4, "#FFFFFF"));
  F.sintmaarten = wrap(`<rect width="30" height="10" fill="#CE1126"/><rect y="10" width="30" height="10" fill="#0038A8"/><polygon points="0,0 13,10 0,20" fill="#FFFFFF"/><circle cx="4.6" cy="10" r="2.2" fill="#FCD116" stroke="#CE1126" stroke-width="0.4"/>`);
  F.aruba      = wrap(`<rect width="30" height="20" fill="#418FDE"/><rect y="13" width="30" height="1.6" fill="#F9DD16"/><rect y="15.6" width="30" height="1.6" fill="#F9DD16"/><polygon points="7,2.2 8.7,6 12.5,7.7 8.7,9.4 7,13.2 5.3,9.4 1.5,7.7 5.3,6" fill="#FFFFFF"/><polygon points="7,3.6 8.4,6.4 11.2,7.7 8.4,9 7,11.8 5.6,9 2.8,7.7 5.6,6.4" fill="#E8112D"/>`);
  F.curacao    = wrap(`<rect width="30" height="20" fill="#002B7F"/><rect y="13" width="30" height="2.6" fill="#F9E814"/>` + star(5.5, 5, 2.2, "#FFFFFF") + star(10, 9, 1.5, "#FFFFFF"));
  F.bonaire    = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><polygon points="0,20 30,0 30,20" fill="#0038A8"/><path d="M0 20 L30 0" stroke="#F9DD16" stroke-width="2.6" fill="none"/><polygon points="7,2.6 9.3,6.6 4.7,6.6" fill="#E8112D" stroke="#000000" stroke-width="0.35"/><polygon points="7,9.4 4.7,5.4 9.3,5.4" fill="#E8112D" stroke="#000000" stroke-width="0.35"/>`);
  F.caiman     = ensign("#00247D", ecu("#0072C6", star(21, 9, 0.8, "#FCD116") + star(19, 9.8, 0.8, "#FCD116") + star(23, 9.8, 0.8, "#FCD116") + `<path d="M17.4 12 h7.2 a3.6 3.6 0 0 1 -7.2 0 z" fill="#FFFFFF"/><path d="M18.6 13.4 q2.4 -1.2 4.8 0" stroke="#0072C6" stroke-width="0.5" fill="none"/>`));
  F.turksetcaicos = ensign("#00247D", ecu("#FCD116", `<circle cx="19.6" cy="9.6" r="1" fill="#E8734A"/><circle cx="22.6" cy="9.6" r="1" fill="#D4553B"/><rect x="20.6" y="11.6" width="0.9" height="2.4" fill="#2E8B57"/>`));
  F.ilesviergesbritanniques = ensign("#00247D", ecu("#FFFFFF", `<rect x="20.4" y="8.8" width="1.2" height="5" fill="#1EB53A"/><circle cx="18.8" cy="10.4" r="0.7" fill="#FCD116"/><circle cx="23.2" cy="10.4" r="0.7" fill="#FCD116"/>`));
  F.anguilla   = ensign("#00247D", `<circle cx="21" cy="11.4" r="4.3" fill="#FFFFFF"/><path d="M16.7 11.4 a4.3 4.3 0 0 0 8.6 0 z" fill="#5BC2E7"/><g fill="none" stroke="#F58220" stroke-width="1"><path d="M18.4 10.4 a2.2 2.2 0 0 1 3.6 0.5"/><path d="M20.6 8.4 a2.2 2.2 0 0 1 3.4 0.6"/><path d="M19.4 12.6 a2 2 0 0 1 3.2 0.3"/></g>`);
  F.montserrat = ensign("#00247D", ecu("#FFFFFF", `<rect x="20.6" y="9" width="1.1" height="4.8" fill="#0C5C2E"/><polygon points="22.6,9.4 23.8,9.4 23.2,13.4" fill="#FCD116"/><rect x="18.4" y="9.4" width="0.9" height="3.8" fill="#000000"/>`));
  F.bermudes   = ensign("#CF142B", ecu("#FFFFFF", `<rect x="20.2" y="8.4" width="1.6" height="3" fill="#CF142B"/><path d="M18.2 12.6 h5.6 l-0.8 1.6 h-4 z" fill="#8B5A2B"/><rect x="20.6" y="10.8" width="0.8" height="2" fill="#8B5A2B"/>`));
  F.saintehelene = ensign("#00247D", ecu("#FFFFFF", `<path d="M17.4 11.4 h7.2 v0.6 a3.6 3.6 0 0 1 -7.2 0 z" fill="#5BC2E7"/><polygon points="20.2,8 21.8,8 21,11.4" fill="#8B5A2B"/><path d="M18.6 11.4 h4.8 l-0.8 1.4 h-3.2 z" fill="#8B5A2B"/>`));

  // Amérique du Sud
  F.suriname   = wrap(`<rect width="30" height="20" fill="#377E3F"/><rect y="4" width="30" height="1.6" fill="#FFFFFF"/><rect y="5.6" width="30" height="8.8" fill="#B40A2D"/><rect y="14.4" width="30" height="1.6" fill="#FFFFFF"/>` + star(15, 10, 3, "#ECC81D"));
  F.guyana     = wrap(`<rect width="30" height="20" fill="#009E49"/><polygon points="0,0 30,10 0,20" fill="#FFFFFF"/><polygon points="0,1.3 27.4,10 0,18.7" fill="#FCD116"/><polygon points="0,0 15,10 0,20" fill="#000000"/><polygon points="0,1.6 12.9,10 0,18.4" fill="#CE1126"/>`);

  // Afrique
  F.togo       = wrap(`<rect width="30" height="20" fill="#006A4E"/><rect y="4" width="30" height="4" fill="#FFCE00"/><rect y="12" width="30" height="4" fill="#FFCE00"/><rect width="12" height="12" fill="#D21034"/>` + star(6, 6, 3, "#FFFFFF"));
  F.soudan     = wrap(ht("#D21034", "#FFFFFF", "#000000") + `<polygon points="0,0 11,10 0,20" fill="#007229"/>`);
  F.soudandusud = wrap(`<rect width="30" height="20" fill="#000000"/><rect y="6" width="30" height="0.8" fill="#FFFFFF"/><rect y="6.8" width="30" height="6.4" fill="#DA121A"/><rect y="13.2" width="30" height="0.8" fill="#FFFFFF"/><rect y="14" width="30" height="6" fill="#078930"/><polygon points="0,0 12,10 0,20" fill="#0F47AF"/>` + star(4.6, 10, 2, "#FCDD09"));
  F.libye      = wrap(`<rect width="30" height="20" fill="#000000"/><rect width="30" height="5" fill="#E70013"/><rect y="15" width="30" height="5" fill="#239E46"/>` + croissant(15.4, 10, 2.8, "#FFFFFF") + star(18.4, 10, 1, "#FFFFFF"));
  F.mauritanie = wrap(`<rect width="30" height="20" fill="#006233"/><rect width="30" height="2.5" fill="#D01C1F"/><rect y="17.5" width="30" height="2.5" fill="#D01C1F"/><path d="M9.6 8.2 A5.4 5.4 0 0 0 20.4 8.2 A6.6 6.6 0 0 1 9.6 8.2" fill="#FFD600"/>` + star(15, 6.4, 1.5, "#FFD600"));
  F.comores    = wrap(`<rect width="30" height="20" fill="#FFD100"/><rect y="5" width="30" height="5" fill="#FFFFFF"/><rect y="10" width="30" height="5" fill="#CE1126"/><rect y="15" width="30" height="5" fill="#3A75C4"/><polygon points="0,0 14,10 0,20" fill="#009A49"/>` + croissant(5.4, 10, 3.4, "#FFFFFF") + star(8.6, 7.4, 0.7, "#FFFFFF") + star(9.4, 9.2, 0.7, "#FFFFFF") + star(9.4, 10.8, 0.7, "#FFFFFF") + star(8.6, 12.6, 0.7, "#FFFFFF"));
  F.maurice    = wrap(`<rect width="30" height="5" fill="#EA2839"/><rect y="5" width="30" height="5" fill="#1A206D"/><rect y="10" width="30" height="5" fill="#FFD500"/><rect y="15" width="30" height="5" fill="#00A551"/>`);
  F.erythree   = wrap(`<rect width="30" height="10" fill="#12AD2B"/><rect y="10" width="30" height="10" fill="#4189DD"/><polygon points="0,0 30,10 0,20" fill="#EA0437"/><circle cx="7" cy="10" r="2.6" fill="none" stroke="#FFC726" stroke-width="0.9"/>`);
  F.eswatini   = wrap(`<rect width="30" height="20" fill="#3E5EB9"/><rect y="4.4" width="30" height="1.2" fill="#FFD900"/><rect y="5.6" width="30" height="8.8" fill="#B10C0C"/><rect y="14.4" width="30" height="1.2" fill="#FFD900"/><ellipse cx="15" cy="10" rx="6" ry="2.3" fill="#FFFFFF"/><path d="M9 10 a6 2.3 0 0 0 12 0 z" fill="#333333"/><rect x="7" y="9.6" width="16" height="0.8" fill="#333333"/>`);
  F.niger      = wrap(ht("#E05206", "#FFFFFF", "#0DB02B") + `<circle cx="15" cy="10" r="2.6" fill="#E05206"/>`);
  F.lesotho    = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect width="30" height="6" fill="#00209F"/><rect y="14" width="30" height="6" fill="#009543"/><polygon points="15,6.6 18.4,12.4 11.6,12.4" fill="#000000"/><rect x="10.6" y="12.4" width="8.8" height="0.9" fill="#000000"/>`);
  F.sierraleone = wrap(ht("#1EB53A", "#FFFFFF", "#0072C6"));
  F.djibouti   = wrap(`<rect width="30" height="10" fill="#6AB2E7"/><rect y="10" width="30" height="10" fill="#12AD2B"/><polygon points="0,0 13,10 0,20" fill="#FFFFFF"/>` + star(4.6, 10, 2.2, "#D7141A"));
  F.gabon      = wrap(ht("#009E60", "#FCD116", "#3A75C4"));
  F.liberia    = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect width="30" height="1.82" fill="#BF0A30"/><rect y="3.64" width="30" height="1.82" fill="#BF0A30"/><rect y="7.27" width="30" height="1.82" fill="#BF0A30"/><rect y="10.91" width="30" height="1.82" fill="#BF0A30"/><rect y="14.55" width="30" height="1.82" fill="#BF0A30"/><rect y="18.18" width="30" height="1.82" fill="#BF0A30"/><rect width="10.9" height="10.9" fill="#002868"/>` + star(5.45, 5.45, 3, "#FFFFFF"));
  F.burundi    = wrap(`<rect width="30" height="20" fill="#CE1126"/><polygon points="0,0 15,10 0,20" fill="#1EB53A"/><polygon points="30,0 15,10 30,20" fill="#1EB53A"/><path d="M0 0 L30 20 M30 0 L0 20" stroke="#FFFFFF" stroke-width="2.2" fill="none"/><circle cx="15" cy="10" r="4" fill="#FFFFFF"/>` + star(15, 7.8, 1, "#CE1126") + star(12.9, 11.4, 1, "#CE1126") + star(17.1, 11.4, 1, "#CE1126"));
  F.centrafrique = wrap(`<rect width="30" height="5" fill="#003082"/><rect y="5" width="30" height="5" fill="#FFFFFF"/><rect y="10" width="30" height="5" fill="#289728"/><rect y="15" width="30" height="5" fill="#FFCE00"/><rect x="13" width="4" height="20" fill="#D21034"/>` + star(3.6, 3, 2, "#FFCE00"));
  F.guinee     = wrap(vt("#CE1126", "#FCD116", "#009460"));
  F.guineebissau = wrap(`<rect width="30" height="20" fill="#FCD116"/><rect y="10" width="30" height="10" fill="#009E49"/><rect width="10" height="20" fill="#CE1126"/>` + star(5, 10, 3, "#000000"));
  F.guineeequatoriale = wrap(ht("#3E9A00", "#FFFFFF", "#E32118") + `<polygon points="0,0 9,10 0,20" fill="#0073CE"/><rect x="13.2" y="8" width="3.6" height="4" fill="none" stroke="#7E5B3A" stroke-width="0.6"/>`);
  F.saotome    = wrap(`<rect width="30" height="20" fill="#12AD2B"/><rect y="5.7" width="30" height="8.6" fill="#FFCE00"/><polygon points="0,0 8,10 0,20" fill="#D21034"/>` + star(13, 10, 1.6, "#000000") + star(19, 10, 1.6, "#000000"));
  F.saharaoccidental = wrap(ht("#000000", "#FFFFFF", "#007A3D") + `<polygon points="0,0 10,10 0,20" fill="#C4111B"/>` + croissant(16.6, 10, 2.3, "#C4111B") + star(19.2, 10, 0.9, "#C4111B"));

  // Moyen-Orient
  F.irak       = wrap(ht("#CE1126", "#FFFFFF", "#000000") + `<g fill="#007A3D"><rect x="9.6" y="9.2" width="1.3" height="1.6"/><rect x="11.8" y="8.8" width="1.3" height="2"/><rect x="14" y="9.2" width="1.3" height="1.6"/><rect x="16.2" y="8.8" width="1.3" height="2"/><rect x="18.4" y="9.2" width="1.3" height="1.6"/></g>`);
  F.syrie      = wrap(ht("#CE1126", "#FFFFFF", "#000000") + star(11, 10, 1.8, "#007A3D") + star(19, 10, 1.8, "#007A3D"));
  F.oman       = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect y="6.67" width="30" height="6.66" fill="#DB161B"/><rect y="13.33" width="30" height="6.67" fill="#008000"/><rect width="8" height="20" fill="#DB161B"/><polygon points="4,3.2 5.6,5.6 4,8 2.4,5.6" fill="#FFFFFF"/>`);
  F.bahrein    = wrap(`<rect width="30" height="20" fill="#CE1126"/><polygon points="0,0 8,0 11.5,2 8,4 11.5,6 8,8 11.5,10 8,12 11.5,14 8,16 11.5,18 8,20 0,20" fill="#FFFFFF"/>`);
  F.qatar      = wrap(`<rect width="30" height="20" fill="#8A1538"/><polygon points="0,0 8,0 10.8,1.1 8,2.2 10.8,3.3 8,4.4 10.8,5.6 8,6.7 10.8,7.8 8,8.9 10.8,10 8,11.1 10.8,12.2 8,13.3 10.8,14.4 8,15.6 10.8,16.7 8,17.8 10.8,18.9 8,20 0,20" fill="#FFFFFF"/>`);
  F.koweit     = wrap(ht("#007A3D", "#FFFFFF", "#CE1126") + `<polygon points="0,0 10,6.67 10,13.33 0,20" fill="#000000"/>`);
  F.maldives   = wrap(`<rect width="30" height="20" fill="#D21034"/><rect x="6" y="4" width="18" height="12" fill="#007E3A"/>` + croissant(16.4, 10, 3.2, "#FFFFFF"));

  // Asie
  F.taiwan     = wrap(`<rect width="30" height="20" fill="#FE0000"/><rect width="15" height="10" fill="#000095"/><g stroke="#FFFFFF" stroke-width="0.7"><path d="M7.5 1.6 V8.4 M4.1 5 H10.9 M5.1 2.6 L9.9 7.4 M9.9 2.6 L5.1 7.4"/></g><circle cx="7.5" cy="5" r="1.7" fill="#FFFFFF"/>`);
  F.hongkong   = wrap(`<rect width="30" height="20" fill="#DE2910"/><circle cx="15" cy="6.2" r="2" fill="#FFFFFF"/><circle cx="18.6" cy="8.8" r="2" fill="#FFFFFF"/><circle cx="17.2" cy="13" r="2" fill="#FFFFFF"/><circle cx="12.8" cy="13" r="2" fill="#FFFFFF"/><circle cx="11.4" cy="8.8" r="2" fill="#FFFFFF"/><circle cx="15" cy="10" r="1.4" fill="#DE2910"/>`);
  F.macao      = wrap(`<rect width="30" height="20" fill="#00785E"/><circle cx="15" cy="8.6" r="2.1" fill="#FFFFFF"/><circle cx="12.7" cy="9.8" r="1.6" fill="#FFFFFF"/><circle cx="17.3" cy="9.8" r="1.6" fill="#FFFFFF"/><path d="M9.5 14 q5.5 -2.8 11 0" stroke="#FFFFFF" stroke-width="0.9" fill="none"/><path d="M9 16.4 h12" stroke="#FFFFFF" stroke-width="0.8"/>` + star(15, 3, 0.9, "#FBD116") + star(11.4, 4, 0.6, "#FBD116") + star(18.6, 4, 0.6, "#FBD116") + star(9.4, 6.4, 0.6, "#FBD116") + star(20.6, 6.4, 0.6, "#FBD116"));

  // Pacifique
  F.palaos     = wrap(`<rect width="30" height="20" fill="#4AADD6"/><circle cx="13" cy="10" r="5" fill="#FFDE00"/>`);
  F.micronesie = wrap(`<rect width="30" height="20" fill="#75B2DD"/>` + star(15, 5, 1.6, "#FFFFFF") + star(20, 10, 1.6, "#FFFFFF") + star(15, 15, 1.6, "#FFFFFF") + star(10, 10, 1.6, "#FFFFFF"));
  F.ilesmarshall = wrap(`<rect width="30" height="20" fill="#003893"/><path d="M0 20 L30 1" stroke="#FFFFFF" stroke-width="2.2" fill="none"/><path d="M0 20 L30 4.4" stroke="#DD7500" stroke-width="2.2" fill="none"/>` + star(7, 4.6, 2.6, "#FFFFFF"));
  F.ilessalomon = wrap(`<rect width="30" height="20" fill="#0051BA"/><polygon points="0,20 30,20 30,3" fill="#215B33"/><path d="M0 20 L30 0" stroke="#FCD116" stroke-width="2" fill="none"/>` + star(4.6, 3, 1, "#FFFFFF") + star(9.4, 3, 1, "#FFFFFF") + star(4.6, 7.4, 1, "#FFFFFF") + star(9.4, 7.4, 1, "#FFFFFF") + star(7, 5.2, 1, "#FFFFFF"));
  F.kiribati   = wrap(`<rect width="30" height="20" fill="#CE1126"/><rect y="10" width="30" height="10" fill="#003F87"/><g stroke="#FFFFFF" stroke-width="0.9" fill="none"><path d="M0 11.4 q3.75 -1.4 7.5 0 q3.75 1.4 7.5 0 q3.75 -1.4 7.5 0 q3.75 1.4 7.5 0"/><path d="M0 14.4 q3.75 -1.4 7.5 0 q3.75 1.4 7.5 0 q3.75 -1.4 7.5 0 q3.75 1.4 7.5 0"/><path d="M0 17.4 q3.75 -1.4 7.5 0 q3.75 1.4 7.5 0 q3.75 -1.4 7.5 0 q3.75 1.4 7.5 0"/></g><path d="M9 10 A6 6 0 0 1 21 10 Z" fill="#FCD116"/><path d="M10 4.6 q5 -2.6 10 0 q-5 1.7 -10 0" fill="#FCD116"/>`);
  F.nauru      = wrap(`<rect width="30" height="20" fill="#002B7F"/><rect y="9.3" width="30" height="1.4" fill="#FFC61E"/>` + star(10, 15, 2.4, "#FFFFFF"));
  F.tuvalu     = ensign("#5B97D1", star(16, 4, 1.1, "#FCD116") + star(20, 2.6, 1.1, "#FCD116") + star(24, 4.6, 1.1, "#FCD116") + star(27, 8, 1.1, "#FCD116") + star(23, 9.2, 1.1, "#FCD116") + star(18, 9.6, 1.1, "#FCD116") + star(21, 13, 1.1, "#FCD116") + star(25, 14, 1.1, "#FCD116") + star(16, 15.4, 1.1, "#FCD116"));
  F.niue       = ensign("#FFCC00", `<circle cx="6" cy="4.2" r="1.2" fill="#FFCC00"/>`);
  F.ilescook   = ensign("#00247D", anneau(21, 11, 4.4, 8, 0.7, "#FFFFFF"));
  F.tokelau    = wrap(`<rect width="30" height="20" fill="#0052B4"/><polygon points="4,14.4 20,8.4 21,11.4 6,16.4" fill="#FFCE00"/><polygon points="11.6,8.6 13.2,3.4 14.8,8.6" fill="#FFCE00"/>` + star(24, 4, 1, "#FFFFFF") + star(27, 8, 1, "#FFFFFF") + star(25, 12, 1, "#FFFFFF") + star(22, 8.6, 0.8, "#FFFFFF"));
  F.samoaamericaines = wrap(`<rect width="30" height="20" fill="#0071BC"/><polygon points="30,0.5 30,19.5 0.5,10" fill="#BD1021"/><polygon points="29,2.6 29,17.4 3.4,10" fill="#FFFFFF"/><polygon points="12,10 18.4,7.2 18.4,12.8" fill="#8B5A2B"/><rect x="18.4" y="8.6" width="5.6" height="2.8" fill="#C8A165"/>`);
  F.guam       = wrap(`<rect width="30" height="20" fill="#CE1126"/><rect x="1.4" y="1.4" width="27.2" height="17.2" fill="#0033A0"/><path d="M15 3.6 Q20.4 10 15 16.4 Q9.6 10 15 3.6 Z" fill="#6AB2E7" stroke="#CE1126" stroke-width="0.5"/><polygon points="15,6.4 16.6,12.2 13.4,12.2" fill="#FFFFFF"/><rect x="12.4" y="12.6" width="5.2" height="1.2" fill="#F5E6C8"/>`);
  F.ilesviergesamericaines = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><polygon points="15,5.6 19.2,9 17,13.4 13,13.4 10.8,9" fill="#FCD116"/><rect x="14.4" y="4.4" width="1.2" height="3" fill="#0038A8"/><polygon points="4.4,6.6 6.5,13.4 8.6,6.6 7.6,6.6 6.5,10.6 5.4,6.6" fill="#0038A8"/><rect x="23.2" y="6.6" width="1.5" height="6.8" fill="#0038A8"/>`);
  F.nouvellecaledonie = wrap(`<rect width="30" height="20" fill="#009543"/><rect width="30" height="6.67" fill="#0035AD"/><rect y="6.67" width="30" height="6.66" fill="#ED4135"/><circle cx="12" cy="10" r="4.4" fill="#FAE600" stroke="#000000" stroke-width="0.6"/><rect x="11.6" y="5.2" width="0.8" height="9.6" fill="#000000"/><polygon points="12,4.4 13.4,6.6 10.6,6.6" fill="#000000"/>`);
  F.wallisetfutuna = wrap(`<rect width="30" height="20" fill="#D21034"/><rect x="1.5" y="1.5" width="11.5" height="8.5" fill="#0038A8"/><rect x="5.8" y="1.5" width="2.4" height="8.5" fill="#FFFFFF"/><rect x="1.5" y="4.6" width="11.5" height="2.4" fill="#FFFFFF"/>`);

  // Outre-mer français / Arctique (pas de drapeau national : rendu territorial, cf. reunion)
  F.guadeloupe = wrap(`<rect width="30" height="20" fill="#1A1A1A"/><rect width="30" height="4.6" fill="#2A4FA2"/><polygon points="4,3.4 5.2,1.2 6.4,3.4" fill="#FFD23F"/><polygon points="12,3.4 13.2,1.2 14.4,3.4" fill="#FFD23F"/><polygon points="20,3.4 21.2,1.2 22.4,3.4" fill="#FFD23F"/><circle cx="15" cy="10.4" r="3.6" fill="#FFD23F"/><polygon points="7.4,19.4 10.6,11 12.6,19.4" fill="#2E8B57"/><polygon points="17.4,19.4 19.4,11 22.6,19.4" fill="#2E8B57"/>`);
  F.martinique = wrap(`<rect width="30" height="20" fill="#1CA9C9"/><rect y="13" width="30" height="7" fill="#2E8B57"/><polygon points="5.4,13 12.6,3 19.8,13" fill="#3E6B4F"/><circle cx="23.4" cy="6" r="2.6" fill="#E8112D"/><circle cx="23.4" cy="6" r="0.9" fill="#FFD23F"/>`);
  F.mayotte    = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><path d="M9.6 2.6 h10.8 v8.4 a5.4 5.4 0 0 1 -10.8 0 z" fill="#CE1126"/><path d="M9.6 2.6 h5.4 v13.8 a5.4 5.4 0 0 1 -5.4 -5.4 z" fill="#0038A8"/>` + croissant(12.4, 8, 2.6, "#FFFFFF") + `<circle cx="17.7" cy="6.6" r="1.4" fill="#FFD23F"/><circle cx="17.7" cy="10.4" r="1.4" fill="#FFD23F"/>`);
  F.groenland  = wrap(`<rect width="30" height="20" fill="#FFFFFF"/><rect y="10" width="30" height="10" fill="#D00C33"/><path d="M10 10 a5 5 0 0 1 10 0 z" fill="#D00C33"/><path d="M10 10 a5 5 0 0 0 10 0 z" fill="#FFFFFF"/>`);

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
