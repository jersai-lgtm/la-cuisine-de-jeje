// ===================================================================
// BASE D'INGRÉDIENTS — Prix + Calories + Valeurs nutritionnelles
//                     Source : CIQUAL ANSES 2020 / USDA / Open Food Facts
//                     Prix : Carrefour, Leclerc, Intermarché (moyenne mai 2026)
// ===================================================================
// Format enrichi (v232+) :
//   prixKg     = €/kg pour ingrédients pondérables
//   prixUnite  = €/unité pour ingrédients comptés
//   calPer100g = kcal pour 100g
//   cal        = kcal par unité
//   --- VALEURS NUTRITIONNELLES (pour Nutri-Score) ---
//   lipSat     = acides gras saturés (g/100g)
//   sucre      = sucres simples (g/100g)
//   sel        = sel (g/100g, = sodium×2.5)
//   fibres     = fibres alimentaires (g/100g)
//   prot       = protéines (g/100g)
//   flv        = % fruits/légumes/légumineuses/noix (0-100)
//
// Pour le calcul Nutri-Score, les valeurs sont multipliées par
// la quantité réelle dans la recette puis ramenées à 100g.
// ===================================================================

const INGREDIENTS_PRIX = {
  potimarron:    { prixKg: 2.20, calPer100g: 32, lipSat: 0.1, sucre: 4, sel: 0, fibres: 2.2, prot: 1.4, flv: 100, glucides: 6.8, lipides: 0.2 },
  epinard:       { prixKg: 3.00, calPer100g: 23, lipSat: 0.1, sucre: 0.4, sel: 0.08, fibres: 2.2, prot: 2.9, flv: 100, glucides: 3.2, lipides: 0.4 },
  // ===== BASES =====
  sel:           { prixKg: 0.85, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  huile:         { prixKg: 4.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huileolive:    { prixKg: 8.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huileOlive:    { prixKg: 8.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huiledolive:   { prixKg: 8.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huilefriture:  { prixKg: 2.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huilesesame:   { prixKg: 12.0, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huilesame:     { prixKg: 12.0, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huileTruffe:   { prixKg: 35.0, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huilepiment:   { prixKg: 10.0, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huilenoix:     { prixKg: 18.0, calPer100g: 884,  lipSat: 9,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  huilePalme:    { prixKg: 3.00, calPer100g: 884,  lipSat: 49,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  ail:           { prixUnite: 0.10, cal: 5,         lipSat: 0,    sucre: 1,    sel: 0,    fibres: 2.1, prot: 6.4,  flv: 100, glucides: 0, lipides: 0.5 },
  gingembreail:  { prixUnite: 0.15, cal: 6,         lipSat: 0,    sucre: 1,    sel: 0,    fibres: 2.5, prot: 5,    flv: 100, glucides: 0, lipides: 0.5 },
  ailechalote:   { prixUnite: 0.15, cal: 6,         lipSat: 0,    sucre: 2,    sel: 0,    fibres: 2,   prot: 4,    flv: 100, glucides: 0, lipides: 0.5 },
  sucre:         { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  beurre:        { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0, glucides: 0.8, lipides: 81 },
  citron:        { prixUnite: 0.50, cal: 17,        lipSat: 0,    sucre: 2.5,  sel: 0,    fibres: 2.8, prot: 1.1,  flv: 100, glucides: 3.2, lipides: 0.3 },
  citrons:       { prixUnite: 0.50, cal: 17,        lipSat: 0,    sucre: 2.5,  sel: 0,    fibres: 2.8, prot: 1.1,  flv: 100, glucides: 3.2, lipides: 0.3 },
  citronC:       { prixUnite: 0.50, cal: 17,        lipSat: 0,    sucre: 2.5,  sel: 0,    fibres: 2.8, prot: 1.1,  flv: 100, glucides: 3.2, lipides: 0.3 },
  zestecitron:   { prixUnite: 0.10, cal: 2,         lipSat: 0,    sucre: 1,    sel: 0,    fibres: 5,   prot: 1,    flv: 100, glucides: 0, lipides: 0.5 },
  citronvert:    { prixUnite: 0.40, cal: 15,        lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 2.8, prot: 0.7,  flv: 100, glucides: 2.1, lipides: 0.3 },
  oignon:        { prixUnite: 0.30, cal: 40,        lipSat: 0,    sucre: 4.2,  sel: 0,    fibres: 1.7, prot: 1.1,  flv: 100, glucides: 8.6, lipides: 0.1 },
  oignons:       { prixUnite: 0.30, cal: 40,        lipSat: 0,    sucre: 4.2,  sel: 0,    fibres: 1.7, prot: 1.1,  flv: 100, glucides: 8.6, lipides: 0.1 },
  oignonRouge:   { prixUnite: 0.40, cal: 45,        lipSat: 0,    sucre: 4.8,  sel: 0,    fibres: 1.7, prot: 1.1,  flv: 100, glucides: 9.8, lipides: 0.1 },
  oignonrouge:   { prixUnite: 0.40, cal: 45,        lipSat: 0,    sucre: 4.8,  sel: 0,    fibres: 1.7, prot: 1.1,  flv: 100, glucides: 9.8, lipides: 0.1 },
  oignonNouveau: { prixUnite: 0.30, cal: 32,        lipSat: 0,    sucre: 2.3,  sel: 0,    fibres: 2.6, prot: 1.8,  flv: 100, glucides: 4.6, lipides: 0.1 },
  oignonsblanc:  { prixUnite: 0.30, cal: 32,        lipSat: 0,    sucre: 2.3,  sel: 0,    fibres: 2.6, prot: 1.8,  flv: 100, glucides: 4.6, lipides: 0.1 },
  echalote:      { prixUnite: 0.20, cal: 7,         lipSat: 0,    sucre: 2.4,  sel: 0,    fibres: 3.2, prot: 2.5,  flv: 100, glucides: 0, lipides: 0.1 },
  farine:        { prixKg: 0.85, calPer100g: 364,  lipSat: 0.2,  sucre: 0.3,  sel: 0,    fibres: 2.7, prot: 10,   flv: 0, glucides: 73.2, lipides: 1.5 },
  farinetamisee: { prixKg: 0.85, calPer100g: 364,  lipSat: 0.2,  sucre: 0.3,  sel: 0,    fibres: 2.7, prot: 10,   flv: 0, glucides: 73.2, lipides: 1.5 },
  farineRiz:     { prixKg: 2.50, calPer100g: 366,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 2.4, prot: 5.9,  flv: 0, glucides: 80.7, lipides: 1.5 },
  farineble:     { prixKg: 0.85, calPer100g: 364,  lipSat: 0.2,  sucre: 0.3,  sel: 0,    fibres: 2.7, prot: 10,   flv: 0, glucides: 73.2, lipides: 1.5 },
  farineT80:     { prixKg: 1.30, calPer100g: 348,  lipSat: 0.3,  sucre: 0.4,  sel: 0,    fibres: 7,   prot: 11,   flv: 0, glucides: 69.2, lipides: 1.2 },
  farineseigle:  { prixKg: 2.20, calPer100g: 325,  lipSat: 0.2,  sucre: 1,    sel: 0,    fibres: 13.2,prot: 8.5,  flv: 0, glucides: 67.3, lipides: 0.8 },
  farinesarrasin:{ prixKg: 3.00, calPer100g: 343,  lipSat: 0.7,  sucre: 0.5,  sel: 0,    fibres: 10,  prot: 13,   flv: 0, glucides: 71.5, lipides: 2.8 },
  poivre:        { prixKg: 25.0, calPer100g: 251,  lipSat: 1.4,  sucre: 0.6,  sel: 0,    fibres: 26.5,prot: 10.4, flv: 0, glucides: 63.9, lipides: 5.6 },
  poivresichuan: { prixKg: 50.0, calPer100g: 250,  lipSat: 1.4,  sucre: 0.6,  sel: 0,    fibres: 26,  prot: 10,   flv: 0, glucides: 64, lipides: 5.6 },
  bicarbonate:   { prixKg: 3.50, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 27,   fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  grossel:       { prixKg: 1.00, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  fleurdesel:    { prixKg: 8.00, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  selFleur:      { prixKg: 8.00, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  selRebord:     { prixKg: 1.50, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  eau:           { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  eaupiqued:     { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  eauchaude:     { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  eauChouxglace: { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  eauChoux:      { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  eauFleurOranger:{ prixKg: 8.00,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  eauRose:       { prixKg: 8.00, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  fleurOranger:  { prixKg: 10.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  rose:          { prixKg: 10.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  eauGaz:        { prixKg: 0.30, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  bouillon:      { prixKg: 0.50, calPer100g: 12,   lipSat: 0.2,  sucre: 0.5,  sel: 0.9,  fibres: 0,   prot: 1,    flv: 0, glucides: 1.4, lipides: 0.8 },
  
  // ===== PRODUITS LAITIERS =====
  lait:          { prixKg: 1.10, calPer100g: 47,   lipSat: 1.0,  sucre: 4.8,  sel: 0.1,  fibres: 0,   prot: 3.3,  flv: 0, glucides: 4.8, lipides: 3.2 },
  laitnon:       { prixKg: 1.10, calPer100g: 47,   lipSat: 1.0,  sucre: 4.8,  sel: 0.1,  fibres: 0,   prot: 3.3,  flv: 0, glucides: 4.8, lipides: 3.2 },
  laitChoux:     { prixKg: 1.10, calPer100g: 47,   lipSat: 1.0,  sucre: 4.8,  sel: 0.1,  fibres: 0,   prot: 3.3,  flv: 0, glucides: 4.8, lipides: 3.2 },
  laitCreme:     { prixKg: 1.10, calPer100g: 47,   lipSat: 1.0,  sucre: 4.8,  sel: 0.1,  fibres: 0,   prot: 3.3,  flv: 0, glucides: 4.8, lipides: 3.2 },
  laitcoco:      { prixKg: 4.00, calPer100g: 188,  lipSat: 17,   sucre: 3,    sel: 0.04, fibres: 2.2, prot: 2.0,  flv: 0, glucides: 5.5, lipides: 21.4 },
  laitCoco:      { prixKg: 4.00, calPer100g: 188,  lipSat: 17,   sucre: 3,    sel: 0.04, fibres: 2.2, prot: 2.0,  flv: 0, glucides: 5.5, lipides: 21.4 },
  lait_coco:     { prixKg: 4.00, calPer100g: 188,  lipSat: 17,   sucre: 3,    sel: 0.04, fibres: 2.2, prot: 2.0,  flv: 0, glucides: 5.5, lipides: 21.4 },
  cremeCoco:     { prixKg: 5.50, calPer100g: 330,  lipSat: 32,   sucre: 3,    sel: 0.04, fibres: 2.2, prot: 3.6,  flv: 0, glucides: 5.5, lipides: 35.6 },
  laitconcentre: { prixKg: 3.20, calPer100g: 321,  lipSat: 5.6,  sucre: 54,   sel: 0.1,  fibres: 0,   prot: 8,    flv: 0, glucides: 54, lipides: 8 },
  laitevapore:   { prixKg: 3.00, calPer100g: 134,  lipSat: 4.8,  sucre: 10,   sel: 0.2,  fibres: 0,   prot: 6.8,  flv: 0, glucides: 10, lipides: 7.2 },
  laitamande:    { prixKg: 2.30, calPer100g: 24,   lipSat: 0.1,  sucre: 0.3,  sel: 0.1,  fibres: 0.4, prot: 0.6,  flv: 5, glucides: 0.5, lipides: 0.3 },
  noixCoco:      { prixKg: 8.00, calPer100g: 354,  lipSat: 30,   sucre: 6,    sel: 0.02, fibres: 9,   prot: 3.3,  flv: 100, glucides: 15.2, lipides: 33.6 },
  coco:          { prixKg: 6.00, calPer100g: 354,  lipSat: 30,   sucre: 6,    sel: 0.02, fibres: 9,   prot: 3.3,  flv: 100, glucides: 15.2, lipides: 33.6 },
  cocoflocons:   { prixKg: 10.0, calPer100g: 660,  lipSat: 57,   sucre: 7,    sel: 0.02, fibres: 16,  prot: 6.9,  flv: 100, glucides: 23.6, lipides: 63 },
  creme:         { prixKg: 4.50, calPer100g: 292,  lipSat: 19,   sucre: 2.9,  sel: 0.05, fibres: 0,   prot: 2.4,  flv: 0, glucides: 2.9, lipides: 30 },
  crème:         { prixKg: 4.50, calPer100g: 292,  lipSat: 19,   sucre: 2.9,  sel: 0.05, fibres: 0,   prot: 2.4,  flv: 0 },
  cremeFraiche:  { prixKg: 4.50, calPer100g: 292,  lipSat: 19,   sucre: 2.9,  sel: 0.05, fibres: 0,   prot: 2.4,  flv: 0, glucides: 2.9, lipides: 30 },
  cremefraiche:  { prixKg: 4.50, calPer100g: 292,  lipSat: 19,   sucre: 2.9,  sel: 0.05, fibres: 0,   prot: 2.4,  flv: 0, glucides: 2.9, lipides: 30 },
  cremechantilly:{ prixKg: 6.00, calPer100g: 257,  lipSat: 17,   sucre: 8,    sel: 0.05, fibres: 0,   prot: 2.2,  flv: 0, glucides: 8, lipides: 26 },
  cremeTruffe:   { prixKg: 25.0, calPer100g: 350,  lipSat: 20,   sucre: 2,    sel: 0.5,  fibres: 1,   prot: 3,    flv: 0, glucides: 2, lipides: 32 },
  cremepatissiere:{ prixKg: 5.00, calPer100g: 180,  lipSat: 4,    sucre: 18,   sel: 0.1,  fibres: 0,   prot: 3.5,  flv: 0, glucides: 18, lipides: 6 },
  beurredamande: { prixKg: 18.0, calPer100g: 614,  lipSat: 4.0,  sucre: 5,    sel: 0,    fibres: 7,   prot: 21,   flv: 100, glucides: 21, lipides: 50 },
  beurreCreme:   { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0, glucides: 0.8, lipides: 80 },
  beurrCreme:    { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0, glucides: 0.8, lipides: 80 },
  beurrChoux:    { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0, glucides: 0.8, lipides: 80 },
  beurrePate:    { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0, glucides: 0.8, lipides: 80 },
  beurrage:      { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0, glucides: 0.8, lipides: 80 },
  yaourt:        { prixKg: 2.00, calPer100g: 59,   lipSat: 1.0,  sucre: 4.7,  sel: 0.1,  fibres: 0,   prot: 5.7,  flv: 0, glucides: 4.7, lipides: 1.5 },
  fromage:       { prixKg: 12.0, calPer100g: 358,  lipSat: 19,   sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 24,   flv: 0, glucides: 0.5, lipides: 30 },
  fromagerape:   { prixKg: 14.0, calPer100g: 380,  lipSat: 20,   sucre: 0.5,  sel: 1.7,  fibres: 0,   prot: 28,   flv: 0, glucides: 0.5, lipides: 32 },
  fromagecomte:  { prixKg: 22.0, calPer100g: 410,  lipSat: 22,   sucre: 0.5,  sel: 0.7,  fibres: 0,   prot: 29,   flv: 0, glucides: 0.5, lipides: 34 },
  fromagebeaufort:{ prixKg: 28.0,calPer100g: 405,  lipSat: 21,   sucre: 0.5,  sel: 1.6,  fibres: 0,   prot: 26,   flv: 0, glucides: 0.5, lipides: 33 },
  fromageemmental:{ prixKg: 14.0,calPer100g: 378,  lipSat: 19,   sucre: 0.5,  sel: 0.7,  fibres: 0,   prot: 29,   flv: 0, glucides: 0.5, lipides: 30 },
  fromageraclette:{ prixKg: 17.0,calPer100g: 357,  lipSat: 18,   sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 22.5, flv: 0, glucides: 0.5, lipides: 28 },
  fromageFrais:  { prixKg: 6.00, calPer100g: 130,  lipSat: 6.5,  sucre: 3.5,  sel: 0.7,  fibres: 0,   prot: 8,    flv: 0, glucides: 3.5, lipides: 10 },
  fromagefrais:  { prixKg: 6.00, calPer100g: 130,  lipSat: 6.5,  sucre: 3.5,  sel: 0.7,  fibres: 0,   prot: 8,    flv: 0, glucides: 3.5, lipides: 10 },
  fromageblanc:  { prixKg: 4.50, calPer100g: 85,   lipSat: 2.0,  sucre: 4,    sel: 0.1,  fibres: 0,   prot: 7,    flv: 0, glucides: 4, lipides: 3.2 },
  skyr:          { prixKg: 6.00, calPer100g: 63,   lipSat: 0.1,  sucre: 4,    sel: 0.1,  fibres: 0,   prot: 10,   flv: 0, glucides: 4, lipides: 0.2 },
  whey:          { prixKg: 25.0, calPer100g: 370,  lipSat: 2.0,  sucre: 5,    sel: 0.3,  fibres: 0,   prot: 80,   flv: 0, glucides: 5, lipides: 5 },
  cottage:       { prixKg: 5.00, calPer100g: 98,   lipSat: 2.8,  sucre: 3.4,  sel: 0.4,  fibres: 0,   prot: 11,   flv: 0, glucides: 3.4, lipides: 4.3 },
  blancoeuf:     { prixKg: 4.00, calPer100g: 52,   lipSat: 0,    sucre: 0.7,  sel: 0.2,  fibres: 0,   prot: 11,   flv: 0, glucides: 0.7, lipides: 0.2 },
  dinde:         { prixKg: 12.0, calPer100g: 110,  lipSat: 0.5,  sucre: 0,    sel: 0.1,  fibres: 0,   prot: 29,   flv: 0, glucides: 0, lipides: 1 },
  colin:         { prixKg: 12.0, calPer100g: 80,   lipSat: 0.2,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 18,   flv: 0, glucides: 0, lipides: 0.5 },
  steakhache5:   { prixKg: 12.0, calPer100g: 130,  lipSat: 2.5,  sucre: 0,    sel: 0.1,  fibres: 0,   prot: 21,   flv: 0, glucides: 0, lipides: 4 },
  beurrecacahuete:{ prixKg: 10.0, calPer100g: 588,  lipSat: 10,   sucre: 9,    sel: 0.5,  fibres: 6,   prot: 25,   flv: 0, glucides: 9, lipides: 50 },
  parmesan:      { prixKg: 25.0, calPer100g: 431,  lipSat: 19,   sucre: 0,    sel: 1.4,  fibres: 0,   prot: 38,   flv: 0, glucides: 0, lipides: 30 },
  mozzarella:    { prixKg: 10.0, calPer100g: 254,  lipSat: 12,   sucre: 1,    sel: 0.8,  fibres: 0,   prot: 19,   flv: 0, glucides: 1, lipides: 19 },
  mozza:         { prixKg: 10.0, calPer100g: 254,  lipSat: 12,   sucre: 1,    sel: 0.8,  fibres: 0,   prot: 19,   flv: 0, glucides: 1, lipides: 19 },
  mascarpone:    { prixKg: 9.00, calPer100g: 429,  lipSat: 32,   sucre: 0.6,  sel: 0.1,  fibres: 0,   prot: 4.8,  flv: 0, glucides: 0.6, lipides: 48 },
  ricotta:       { prixKg: 6.50, calPer100g: 174,  lipSat: 8,    sucre: 3,    sel: 0.3,  fibres: 0,   prot: 11,   flv: 0, glucides: 3.5, lipides: 13 },
  feta:          { prixKg: 11.0, calPer100g: 264,  lipSat: 14,   sucre: 4,    sel: 3.5,  fibres: 0,   prot: 14,   flv: 0, glucides: 4, lipides: 21.5 },
  fetaOpt:       { prixKg: 11.0, calPer100g: 264,  lipSat: 14,   sucre: 4,    sel: 3.5,  fibres: 0,   prot: 14,   flv: 0, glucides: 4, lipides: 21.5 },
  gruyere:       { prixKg: 18.0, calPer100g: 413,  lipSat: 22,   sucre: 0.4,  sel: 1.7,  fibres: 0,   prot: 30,   flv: 0, glucides: 0.4, lipides: 33 },
  emmental:      { prixKg: 14.0, calPer100g: 378,  lipSat: 19,   sucre: 0.5,  sel: 0.7,  fibres: 0,   prot: 29,   flv: 0, glucides: 0.5, lipides: 29 },
  vacherin:      { prixKg: 24.0, calPer100g: 380,  lipSat: 18,   sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 20,   flv: 0, glucides: 0.5, lipides: 27 },
  provolone:     { prixKg: 16.0, calPer100g: 350,  lipSat: 17,   sucre: 1,    sel: 1.4,  fibres: 0,   prot: 26,   flv: 0, glucides: 1, lipides: 26 },
  cheddar:       { prixKg: 14.0, calPer100g: 410,  lipSat: 21,   sucre: 0.5,  sel: 1.6,  fibres: 0,   prot: 25,   flv: 0, glucides: 0.5, lipides: 31 },
  chevre:        { prixKg: 16.0, calPer100g: 364,  lipSat: 21,   sucre: 2.5,  sel: 1.6,  fibres: 0,   prot: 22,   flv: 0, glucides: 2.5, lipides: 31 },
  burrata:       { prixKg: 18.0, calPer100g: 290,  lipSat: 13,   sucre: 1,    sel: 0.6,  fibres: 0,   prot: 17,   flv: 0, glucides: 1, lipides: 20 },
  gorgonzola:    { prixKg: 18.0, calPer100g: 353,  lipSat: 19,   sucre: 0.5,  sel: 1.8,  fibres: 0,   prot: 19,   flv: 0, glucides: 0.5, lipides: 28 },
  pecorino:      { prixKg: 22.0, calPer100g: 387,  lipSat: 17,   sucre: 0.2,  sel: 3.7,  fibres: 0,   prot: 26,   flv: 0, glucides: 0.2, lipides: 26 },
  philadelphia:  { prixKg: 12.0, calPer100g: 253,  lipSat: 15,   sucre: 4,    sel: 0.7,  fibres: 0,   prot: 5.5,  flv: 0, glucides: 4, lipides: 23 },
  paneer:        { prixKg: 14.0, calPer100g: 296,  lipSat: 15,   sucre: 2,    sel: 0.04, fibres: 0,   prot: 19,   flv: 0, glucides: 2, lipides: 22 },
  camembert:     { prixKg: 9.00, calPer100g: 300,  lipSat: 15,   sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 20,   flv: 0, glucides: 0.5, lipides: 22 },
  reblochon:     { prixKg: 16.0, calPer100g: 327,  lipSat: 17,   sucre: 0.4,  sel: 1.4,  fibres: 0,   prot: 19,   flv: 0, glucides: 0, lipides: 26 },
  tomme:         { prixKg: 16.0, calPer100g: 350,  lipSat: 18,   sucre: 0.5,  sel: 1.7,  fibres: 0,   prot: 24,   flv: 0, glucides: 0.5, lipides: 26 },
  
  // ===== ŒUFS =====
  oeuf:          { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0, glucides: 1.1, lipides: 5.3 },
  oeufs:         { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0, glucides: 1.1, lipides: 5.3 },
  oeufPate:      { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0, glucides: 1.1, lipides: 5.3 },
  oeufCreme:     { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0, glucides: 1.1, lipides: 5.3 },
  oeufChoux:     { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0, glucides: 1.1, lipides: 5.3 },
  jauneoeuf:     { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0, glucides: 0.6, lipides: 5.5 },
  jauneoeufs:    { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0, glucides: 0.6, lipides: 5.5 },
  jaunes:        { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0, glucides: 0.6, lipides: 5.5 },
  jaunesoeufs:   { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0, glucides: 0.6, lipides: 5.5 },
  jaunesCreme:   { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0, glucides: 0.6, lipides: 5.5 },
  gJaune:        { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0, glucides: 0.6, lipides: 5.5 },
  blancsoeufs:   { prixUnite: 0.22, cal: 17,        lipSat: 0,    sucre: 0.7,  sel: 0.4,  fibres: 0,   prot: 11,   flv: 0, glucides: 0.7, lipides: 0.1 },
  blancs:        { prixUnite: 0.22, cal: 17,        lipSat: 0,    sucre: 0.7,  sel: 0.4,  fibres: 0,   prot: 11,   flv: 0, glucides: 0.7, lipides: 0.1 },
  blanc:         { prixUnite: 0.22, cal: 17,        lipSat: 0,    sucre: 0.7,  sel: 0.4,  fibres: 0,   prot: 11,   flv: 0, glucides: 0.7, lipides: 0.1 },
  
  // ===== LÉGUMES =====
  tomate:        { prixKg: 3.50, calPer100g: 18,   lipSat: 0,    sucre: 2.6,  sel: 0,    fibres: 1.2, prot: 0.9,  flv: 100, glucides: 3.1, lipides: 0.2 },
  tomates:       { prixKg: 3.50, calPer100g: 18,   lipSat: 0,    sucre: 2.6,  sel: 0,    fibres: 1.2, prot: 0.9,  flv: 100, glucides: 3.1, lipides: 0.2 },
  tomateCerise:  { prixKg: 6.00, calPer100g: 19,   lipSat: 0,    sucre: 3.4,  sel: 0,    fibres: 1.2, prot: 0.9,  flv: 100, glucides: 4.1, lipides: 0.2 },
  concentre:     { prixKg: 4.50, calPer100g: 82,   lipSat: 0.1,  sucre: 12,   sel: 0.3,  fibres: 4.3, prot: 4.3,  flv: 100, glucides: 14.5, lipides: 0.5 },
  carotte:        { prixKg: 1.50, calPer100g: 36,   lipSat: 0,    sucre: 4.8,  sel: 0.07, fibres: 2.8, prot: 0.9,  flv: 100, glucides: 8.2, lipides: 0.2 },
  carottes:       { prixKg: 1.50, calPer100g: 36,   lipSat: 0,    sucre: 4.8,  sel: 0.07, fibres: 2.8, prot: 0.9,  flv: 100, glucides: 8.2, lipides: 0.2 },
  pommedeterre:   { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100, glucides: 17.5, lipides: 0.1 },
  pommesdeterre:  { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100, glucides: 17.5, lipides: 0.1 },
  pdterre:        { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100, glucides: 17.5, lipides: 0.1 },
  pommeterre:     { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100, glucides: 17.5, lipides: 0.1 },
  patate:         { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100, glucides: 17.5, lipides: 0.1 },
  patatedouce:    { prixKg: 3.00, calPer100g: 86,   lipSat: 0,    sucre: 4.2,  sel: 0.05, fibres: 3,   prot: 1.6,  flv: 100, glucides: 19.2, lipides: 0.1 },
  poivron:        { prixKg: 4.00, calPer100g: 26,   lipSat: 0,    sucre: 4.2,  sel: 0,    fibres: 2,   prot: 1,    flv: 100, glucides: 4.7, lipides: 0.3 },
  ackee:          { prixKg: 16.0, calPer100g: 151,  lipSat: 3.0,  sucre: 1,    sel: 0.3,  fibres: 2.7, prot: 2.9,  flv: 60, glucides: 8.8, lipides: 15.2 },
  courgette:      { prixKg: 2.50, calPer100g: 16,   lipSat: 0,    sucre: 2.2,  sel: 0,    fibres: 1.1, prot: 1.2,  flv: 100, glucides: 2.9, lipides: 0.2 },
  courge:         { prixKg: 2.00, calPer100g: 26,   lipSat: 0,    sucre: 2.8,  sel: 0,    fibres: 0.5, prot: 1,    flv: 100, glucides: 4.5, lipides: 0.1 },
  aubergine:      { prixKg: 3.50, calPer100g: 25,   lipSat: 0,    sucre: 3.5,  sel: 0,    fibres: 3,   prot: 1,    flv: 100, glucides: 3.9, lipides: 0.2 },
  aubergines:     { prixKg: 3.50, calPer100g: 25,   lipSat: 0,    sucre: 3.5,  sel: 0,    fibres: 3,   prot: 1,    flv: 100, glucides: 3.9, lipides: 0.2 },
  concombre:      { prixKg: 2.00, calPer100g: 16,   lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 0.5, prot: 0.7,  flv: 100, glucides: 2.4, lipides: 0.1 },
  salade:         { prixKg: 4.00, calPer100g: 15,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 1.3, prot: 1.4,  flv: 100, glucides: 2.4, lipides: 0.2 },
  saladeverte:    { prixKg: 4.00, calPer100g: 15,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 1.3, prot: 1.4,  flv: 100, glucides: 2.4, lipides: 0.2 },
  laitue:         { prixKg: 4.00, calPer100g: 15,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 1.3, prot: 1.4,  flv: 100, glucides: 2.4, lipides: 0.2 },
  roquette:       { prixKg: 14.0, calPer100g: 25,   lipSat: 0,    sucre: 2,    sel: 0.07, fibres: 1.6, prot: 2.6,  flv: 100, glucides: 3.6, lipides: 0.7 },
  epinards:       { prixKg: 3.50, calPer100g: 23,   lipSat: 0,    sucre: 0.4,  sel: 0.2,  fibres: 2.2, prot: 2.9,  flv: 100, glucides: 1.1, lipides: 0.4 },
  champignons:    { prixKg: 5.00, calPer100g: 22,   lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 1,   prot: 3.1,  flv: 100, glucides: 2.5, lipides: 0.3 },
  shiitake:       { prixKg: 18.0, calPer100g: 34,   lipSat: 0.1,  sucre: 2.4,  sel: 0,    fibres: 2.5, prot: 2.2,  flv: 100, glucides: 4.2, lipides: 0.5 },
  chou:           { prixKg: 1.50, calPer100g: 25,   lipSat: 0,    sucre: 3.2,  sel: 0,    fibres: 2.5, prot: 1.3,  flv: 100, glucides: 4.4, lipides: 0.1 },
  chouvert:       { prixKg: 1.50, calPer100g: 25,   lipSat: 0,    sucre: 3.2,  sel: 0,    fibres: 2.5, prot: 1.3,  flv: 100, glucides: 4.4, lipides: 0.1 },
  chouC:          { prixKg: 1.50, calPer100g: 25,   lipSat: 0,    sucre: 3.2,  sel: 0,    fibres: 2.5, prot: 1.3,  flv: 100, glucides: 4.4, lipides: 0.1 },
  choufleur:      { prixKg: 3.00, calPer100g: 25,   lipSat: 0,    sucre: 1.9,  sel: 0,    fibres: 2,   prot: 2,    flv: 100, glucides: 4.2, lipides: 0.3 },
  bok_choy:       { prixKg: 6.00, calPer100g: 13,   lipSat: 0,    sucre: 1.2,  sel: 0.07, fibres: 1,   prot: 1.5,  flv: 100, glucides: 1.9, lipides: 0.2 },
  bokchoy:        { prixKg: 6.00, calPer100g: 13,   lipSat: 0,    sucre: 1.2,  sel: 0.07, fibres: 1,   prot: 1.5,  flv: 100, glucides: 1.9, lipides: 0.2 },
  poireaux:       { prixKg: 2.50, calPer100g: 27,   lipSat: 0,    sucre: 2,    sel: 0,    fibres: 2.2, prot: 1.5,  flv: 100, glucides: 4.5, lipides: 0.2 },
  navets:         { prixKg: 2.00, calPer100g: 28,   lipSat: 0,    sucre: 3.8,  sel: 0,    fibres: 1.8, prot: 0.9,  flv: 100, glucides: 5.2, lipides: 0.1 },
  betterave:      { prixKg: 3.00, calPer100g: 43,   lipSat: 0,    sucre: 7,    sel: 0.2,  fibres: 2.8, prot: 1.6,  flv: 100, glucides: 9.6, lipides: 0.2 },
  betteraves:     { prixKg: 3.00, calPer100g: 43,   lipSat: 0,    sucre: 7,    sel: 0.2,  fibres: 2.8, prot: 1.6,  flv: 100, glucides: 9.6, lipides: 0.2 },
  asperges:       { prixKg: 8.00, calPer100g: 20,   lipSat: 0,    sucre: 1.9,  sel: 0,    fibres: 2.1, prot: 2.2,  flv: 100, glucides: 3.4, lipides: 0.1 },
  brocoli:        { prixKg: 3.50, calPer100g: 34,   lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 2.6, prot: 2.8,  flv: 100, glucides: 4.4, lipides: 0.4 },
  edamame:        { prixKg: 8.00, calPer100g: 122,  lipSat: 0.5,  sucre: 3,    sel: 0.01, fibres: 5,   prot: 11,   flv: 100, glucides: 6, lipides: 6.3 },
  edamames:       { prixKg: 8.00, calPer100g: 122,  lipSat: 0.5,  sucre: 3,    sel: 0.01, fibres: 5,   prot: 11,   flv: 100, glucides: 11, lipides: 6.3 },
  pousses:        { prixKg: 12.0, calPer100g: 23,   lipSat: 0,    sucre: 1.8,  sel: 0,    fibres: 1.8, prot: 2.9,  flv: 100, glucides: 1.8, lipides: 0.4 },
  fenouil:        { prixKg: 3.50, calPer100g: 31,   lipSat: 0,    sucre: 4,    sel: 0.05, fibres: 3.1, prot: 1.2,  flv: 100, glucides: 4, lipides: 0.2 },
  celeri:         { prixKg: 2.50, calPer100g: 16,   lipSat: 0,    sucre: 1.3,  sel: 0.08, fibres: 1.6, prot: 0.7,  flv: 100, glucides: 1.3, lipides: 0.1 },
  cornichons:     { prixKg: 4.00, calPer100g: 12,   lipSat: 0,    sucre: 1.7,  sel: 2,    fibres: 1.2, prot: 0.5,  flv: 100, glucides: 1.7, lipides: 0.1 },
  capres:         { prixKg: 20.0, calPer100g: 23,   lipSat: 0,    sucre: 0.4,  sel: 7,    fibres: 3.2, prot: 2.4,  flv: 100, glucides: 0.4, lipides: 0.3 },
  olives:         { prixKg: 10.0, calPer100g: 115,  lipSat: 1.4,  sucre: 0,    sel: 3.3,  fibres: 3.2, prot: 0.8,  flv: 100, glucides: 0, lipides: 11 },
  avocat:         { prixUnite: 1.20, cal: 250,      lipSat: 2.1,  sucre: 0.7,  sel: 0,    fibres: 6.7, prot: 2,    flv: 100, glucides: 0.7, lipides: 15 },
  avocats:        { prixUnite: 1.20, cal: 250,      lipSat: 2.1,  sucre: 0.7,  sel: 0,    fibres: 6.7, prot: 2,    flv: 100, glucides: 0.7, lipides: 15 },
  mais:           { prixKg: 3.00, calPer100g: 86,   lipSat: 0.2,  sucre: 6.3,  sel: 0,    fibres: 2.7, prot: 3.3,  flv: 100, glucides: 14.5, lipides: 1.3 },
  "maïs":         { prixKg: 3.00, calPer100g: 86,   lipSat: 0.2,  sucre: 6.3,  sel: 0,    fibres: 2.7, prot: 3.3,  flv: 100 },
  petitspois:     { prixKg: 3.50, calPer100g: 81,   lipSat: 0.1,  sucre: 5.7,  sel: 0,    fibres: 5.1, prot: 5.4,  flv: 100, glucides: 14.4, lipides: 0.4 },
  pois:           { prixKg: 3.50, calPer100g: 81,   lipSat: 0.1,  sucre: 5.7,  sel: 0,    fibres: 5.1, prot: 5.4,  flv: 100, glucides: 14.4, lipides: 0.4 },
  haricots:       { prixKg: 4.00, calPer100g: 31,   lipSat: 0,    sucre: 3.3,  sel: 0,    fibres: 2.7, prot: 1.8,  flv: 100, glucides: 3.3, lipides: 0.2 },
  haricotsverts:  { prixKg: 4.00, calPer100g: 31,   lipSat: 0,    sucre: 3.3,  sel: 0,    fibres: 2.7, prot: 1.8,  flv: 100, glucides: 3.3, lipides: 0.2 },
  haricotsblancs: { prixKg: 3.50, calPer100g: 92,   lipSat: 0.1,  sucre: 0.3,  sel: 0,    fibres: 7,   prot: 7.5,  flv: 100, glucides: 14.8, lipides: 0.3 },
  haricotsnoirs:  { prixKg: 4.50, calPer100g: 91,   lipSat: 0.1,  sucre: 0.3,  sel: 0,    fibres: 8.7, prot: 8.9,  flv: 100, glucides: 13.1, lipides: 0.4 },
  haricotsrouges: { prixKg: 3.50, calPer100g: 127,  lipSat: 0.1,  sucre: 0.3,  sel: 0,    fibres: 6.4, prot: 8.7,  flv: 100, glucides: 19.6, lipides: 0.5 },
  feve:           { prixKg: 4.00, calPer100g: 88,   lipSat: 0.1,  sucre: 0.4,  sel: 0,    fibres: 5.4, prot: 7.6,  flv: 100, glucides: 6.7, lipides: 0.4 },
  feves:          { prixKg: 4.00, calPer100g: 88,   lipSat: 0.1,  sucre: 0.4,  sel: 0,    fibres: 5.4, prot: 7.6,  flv: 100, glucides: 6.7, lipides: 0.4 },
  truffenoire:    { prixKg: 800.0,calPer100g: 92,   lipSat: 0.2,  sucre: 1.4,  sel: 0.2,  fibres: 7.2, prot: 6.6,  flv: 100, glucides: 4.1, lipides: 0.8 },
  guascas:        { prixKg: 80.0, calPer100g: 22,   lipSat: 0,    sucre: 1,    sel: 0,    fibres: 3.6, prot: 2.8,  flv: 100, glucides: 1, lipides: 0.2 },
  crudités:       { prixKg: 3.50, calPer100g: 20,   lipSat: 0,    sucre: 2.5,  sel: 0,    fibres: 1.8, prot: 1,    flv: 100 },
  feuillevigne:   { prixKg: 12.0, calPer100g: 69,   lipSat: 0.1,  sucre: 0.4,  sel: 1.5,  fibres: 11,  prot: 5.4,  flv: 100, glucides: 0.4, lipides: 0.9 },

  // ===== FRUITS =====
  banane:         { prixUnite: 0.30, cal: 89,        lipSat: 0.1,  sucre: 12.2, sel: 0,    fibres: 2.6, prot: 1.1,  flv: 100, glucides: 21.6, lipides: 0.3 },
  bananes:        { prixUnite: 0.30, cal: 89,        lipSat: 0.1,  sucre: 12.2, sel: 0,    fibres: 2.6, prot: 1.1,  flv: 100, glucides: 21.6, lipides: 0.3 },
  pomme:          { prixUnite: 0.50, cal: 52,        lipSat: 0,    sucre: 10.4, sel: 0,    fibres: 2.4, prot: 0.3,  flv: 100, glucides: 11.8, lipides: 0.2 },
  pommes:         { prixUnite: 0.50, cal: 52,        lipSat: 0,    sucre: 10.4, sel: 0,    fibres: 2.4, prot: 0.3,  flv: 100, glucides: 11.8, lipides: 0.2 },
  poire:          { prixUnite: 0.50, cal: 57,        lipSat: 0,    sucre: 9.8,  sel: 0,    fibres: 3.1, prot: 0.4,  flv: 100, glucides: 13.9, lipides: 0.1 },
  peche:          { prixUnite: 0.60, cal: 39,        lipSat: 0,    sucre: 8.4,  sel: 0,    fibres: 1.5, prot: 0.9,  flv: 100, glucides: 8.4, lipides: 0.3 },
  abricot:        { prixKg: 4.00,    calPer100g: 48, lipSat: 0,    sucre: 9,    sel: 0,    fibres: 2,   prot: 1.4,  flv: 100, glucides: 9, lipides: 0.4 },
  abricots:       { prixKg: 4.00,    calPer100g: 48, lipSat: 0,    sucre: 9,    sel: 0,    fibres: 2,   prot: 1.4,  flv: 100, glucides: 9, lipides: 0.4 },
  pasteque:       { prixKg: 1.50, calPer100g: 30,   lipSat: 0,    sucre: 6.2,  sel: 0,    fibres: 0.4, prot: 0.6,  flv: 100, glucides: 6.2, lipides: 0.2 },
  fraise:         { prixKg: 8.00, calPer100g: 32,   lipSat: 0,    sucre: 4.9,  sel: 0,    fibres: 2,   prot: 0.7,  flv: 100, glucides: 4.9, lipides: 0.3 },
  fraises:        { prixKg: 8.00, calPer100g: 32,   lipSat: 0,    sucre: 4.9,  sel: 0,    fibres: 2,   prot: 0.7,  flv: 100, glucides: 4.9, lipides: 0.3 },
  framboise:      { prixKg: 14.0, calPer100g: 52,   lipSat: 0,    sucre: 4.4,  sel: 0,    fibres: 6.5, prot: 1.2,  flv: 100, glucides: 12, lipides: 0.7 },
  framboises:     { prixKg: 14.0, calPer100g: 52,   lipSat: 0,    sucre: 4.4,  sel: 0,    fibres: 6.5, prot: 1.2,  flv: 100, glucides: 12, lipides: 0.7 },
  fraisesframboises:{ prixKg:11.0, calPer100g: 42,   lipSat: 0,    sucre: 4.6,  sel: 0,    fibres: 4,   prot: 1,    flv: 100, glucides: 9.4, lipides: 0.4 },
  myrtille:       { prixKg: 18.0, calPer100g: 57,   lipSat: 0,    sucre: 9.7,  sel: 0,    fibres: 2.4, prot: 0.7,  flv: 100, glucides: 14.5, lipides: 0.6 },
  myrtilles:      { prixKg: 18.0, calPer100g: 57,   lipSat: 0,    sucre: 9.7,  sel: 0,    fibres: 2.4, prot: 0.7,  flv: 100, glucides: 14.5, lipides: 0.6 },
  baies:          { prixKg: 15.0, calPer100g: 50,   lipSat: 0,    sucre: 8,    sel: 0,    fibres: 3,   prot: 0.7,  flv: 100, glucides: 12.2, lipides: 0.5 },
  cassis:         { prixKg: 12.0, calPer100g: 63,   lipSat: 0,    sucre: 11,   sel: 0,    fibres: 7,   prot: 1.4,  flv: 100, glucides: 15.1, lipides: 0.4 },
  litchi:         { prixKg: 8.00, calPer100g: 66,   lipSat: 0,    sucre: 15,   sel: 0,    fibres: 1.3, prot: 0.8,  flv: 100, glucides: 16.5, lipides: 0.4 },
  coing:          { prixKg: 4.00, calPer100g: 57,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 1.9, prot: 0.4,  flv: 100, glucides: 12.2, lipides: 0.3 },
  artichaut:      { prixKg: 6.00, calPer100g: 47,   lipSat: 0,    sucre: 1,    sel: 0.1,  fibres: 5.4, prot: 3.3,  flv: 100, glucides: 8.7, lipides: 0.2 },
  noixpecan:      { prixKg: 22.0, calPer100g: 691,  lipSat: 6,    sucre: 4,    sel: 0,    fibres: 9.6, prot: 9,    flv: 100, glucides: 13.7, lipides: 71.9 },
  maquereau:      { prixKg: 9.00, calPer100g: 205,  lipSat: 3.3,  sucre: 0,    sel: 0.3,  fibres: 0,   prot: 19,   flv: 100, glucides: 0, lipides: 13.9 },
  poiscasses:     { prixKg: 3.00, calPer100g: 118,  lipSat: 0.1,  sucre: 2,    sel: 0,    fibres: 8,   prot: 8,    flv: 100, glucides: 21.8, lipides: 0.4 },
  haddock:        { prixKg: 16.0, calPer100g: 101,  lipSat: 0.2,  sucre: 0,    sel: 1.5,  fibres: 0,   prot: 23,   flv: 100, glucides: 0, lipides: 0.6 },
  zaatar:         { prixKg: 25.0, calPer100g: 350,  lipSat: 2,    sucre: 2,    sel: 2,    fibres: 8,   prot: 10,   flv: 100, glucides: 34.5, lipides: 7.8 },
  homard:         { prixKg: 40.0, calPer100g: 89,   lipSat: 0.2,  sucre: 0,    sel: 0.5,  fibres: 0,   prot: 19,   flv: 100, glucides: 0, lipides: 1.3 },
  sardine:        { prixKg: 8.00, calPer100g: 208,  lipSat: 2.5,  sucre: 0,    sel: 0.5,  fibres: 0,   prot: 25,   flv: 100, glucides: 0, lipides: 13.6 },
  halloumi:       { prixKg: 16.0, calPer100g: 321,  lipSat: 16,   sucre: 2,    sel: 2.5,  fibres: 0,   prot: 22,   flv: 100, glucides: 2, lipides: 27 },
  garammasala:    { prixKg: 30.0, calPer100g: 379,  lipSat: 3,    sucre: 5,    sel: 0.5,  fibres: 25,  prot: 14,   flv: 100, glucides: 38.9, lipides: 13.2 },
  blettes:        { prixKg: 3.00, calPer100g: 19,   lipSat: 0,    sucre: 1,    sel: 0.2,  fibres: 1.6, prot: 1.8,  flv: 100, glucides: 3.6, lipides: 0.2 },
  orge:           { prixKg: 3.00, calPer100g: 354,  lipSat: 0.2,  sucre: 0.8,  sel: 0,    fibres: 6,   prot: 10,   flv: 100, glucides: 77.7, lipides: 1 },
  avoine:         { prixKg: 2.80, calPer100g: 389,  lipSat: 1.2,  sucre: 1,    sel: 0,    fibres: 10,  prot: 17,   flv: 100, glucides: 66.3, lipides: 6.9 },
  epeautre:       { prixKg: 4.00, calPer100g: 338,  lipSat: 0.3,  sucre: 1,    sel: 0,    fibres: 8,   prot: 11,   flv: 100, glucides: 70.2, lipides: 2.4 },
  cajou:          { prixKg: 18.0, calPer100g: 553,  lipSat: 8,    sucre: 6,    sel: 0,    fibres: 3,   prot: 18,   flv: 100, glucides: 30.2, lipides: 47 },
  sarrasin:       { prixKg: 5.00, calPer100g: 343,  lipSat: 0.7,  sucre: 0,    sel: 0,    fibres: 10,  prot: 13,   flv: 100, glucides: 71.5, lipides: 3.4 },
  navet:          { prixKg: 2.00, calPer100g: 28,   lipSat: 0,    sucre: 4,    sel: 0.05, fibres: 2,   prot: 0.9,  flv: 100, glucides: 6.5, lipides: 0.1 },
  fourme:         { prixKg: 18.0, calPer100g: 370,  lipSat: 18,   sucre: 0,    sel: 1.8,  fibres: 0,   prot: 21,   flv: 100, glucides: 0, lipides: 30.5 },
  raifort:        { prixKg: 12.0, calPer100g: 48,   lipSat: 0,    sucre: 7,    sel: 0.4,  fibres: 3,   prot: 1,    flv: 100, glucides: 10.5, lipides: 0.1 },
  dukkah:         { prixKg: 20.0, calPer100g: 550,  lipSat: 5,    sucre: 3,    sel: 1,    fibres: 10,  prot: 16,   flv: 100, glucides: 20, lipides: 41.4 },
  cerises:        { prixKg: 8.00, calPer100g: 50,   lipSat: 0,    sucre: 8,    sel: 0,    fibres: 1.6, prot: 1,    flv: 100, glucides: 12, lipides: 0.3 },
  cerise:         { prixKg: 8.00, calPer100g: 50,   lipSat: 0,    sucre: 8,    sel: 0,    fibres: 1.6, prot: 1,    flv: 100, glucides: 12, lipides: 0.3 },
  ananas:         { prixUnite: 2.50, cal: 50,        lipSat: 0,    sucre: 9.9,  sel: 0,    fibres: 1.4, prot: 0.5,  flv: 100, glucides: 12, lipides: 0.1 },
  orange:         { prixUnite: 0.70, cal: 47,        lipSat: 0,    sucre: 9.4,  sel: 0,    fibres: 2.4, prot: 0.9,  flv: 100, glucides: 11.8, lipides: 0.3 },
  mangue:         { prixUnite: 2.00, cal: 60,        lipSat: 0.1,  sucre: 14,   sel: 0,    fibres: 1.6, prot: 0.8,  flv: 100, glucides: 15, lipides: 0.4 },
  kiwi:           { prixUnite: 0.60, cal: 61,        lipSat: 0,    sucre: 9,    sel: 0,    fibres: 3,   prot: 1.1,  flv: 100, glucides: 14.7, lipides: 0.5 },
  melon:          { prixUnite: 2.50, cal: 34,        lipSat: 0,    sucre: 8,    sel: 0.02, fibres: 0.9, prot: 0.8,  flv: 100, glucides: 8.2, lipides: 0.3 },
  passion:        { prixUnite: 1.50, cal: 97,        lipSat: 0.1,  sucre: 11,   sel: 0,    fibres: 10,  prot: 2.2,  flv: 100, glucides: 13.5, lipides: 0.4 },
  fruitsrouges:   { prixKg: 12.0, calPer100g: 45,   lipSat: 0,    sucre: 6,    sel: 0,    fibres: 4,   prot: 0.9,  flv: 100, glucides: 7.5, lipides: 0.5 },
  fruitsfrais:    { prixKg: 5.00, calPer100g: 50,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 2,   prot: 0.7,  flv: 100, glucides: 10.8, lipides: 0.3 },
  fruits:         { prixKg: 5.00, calPer100g: 50,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 2,   prot: 0.7,  flv: 100, glucides: 10.8, lipides: 0.3 },
  figues:         { prixKg: 8.00, calPer100g: 74,   lipSat: 0,    sucre: 16,   sel: 0,    fibres: 2.9, prot: 0.8,  flv: 100, glucides: 17.1, lipides: 0.3 },
  pruneaux:       { prixKg: 8.00, calPer100g: 240,  lipSat: 0,    sucre: 38,   sel: 0,    fibres: 7,   prot: 2.2,  flv: 100, glucides: 58, lipides: 0.4 },
  raisinsSecs:    { prixKg: 8.00, calPer100g: 299,  lipSat: 0.1,  sucre: 59,   sel: 0,    fibres: 4,   prot: 3.1,  flv: 100, glucides: 65, lipides: 0.5 },
  raisinssecs:    { prixKg: 8.00, calPer100g: 299,  lipSat: 0.1,  sucre: 59,   sel: 0,    fibres: 4,   prot: 3.1,  flv: 100, glucides: 65, lipides: 0.5 },
  dattes:         { prixKg: 10.0, calPer100g: 277,  lipSat: 0,    sucre: 63,   sel: 0,    fibres: 6.7, prot: 1.8,  flv: 100, glucides: 66.3, lipides: 0.3 },
  cranberry:      { prixKg: 15.0, calPer100g: 308,  lipSat: 0.1,  sucre: 65,   sel: 0,    fibres: 5.7, prot: 0.2,  flv: 100, glucides: 71.5, lipides: 0.5 },
  acaipuree:      { prixKg: 18.0, calPer100g: 70,   lipSat: 1.2,  sucre: 4,    sel: 0.01, fibres: 2,   prot: 1,    flv: 100, glucides: 5.3, lipides: 5 },
  jusMixte:       { prixKg: 2.50, calPer100g: 48,   lipSat: 0,    sucre: 10,   sel: 0,    fibres: 0.5, prot: 0.5,  flv: 90, glucides: 10.5, lipides: 0.3 },
  orangeJus:      { prixKg: 2.00, calPer100g: 45,   lipSat: 0,    sucre: 8.4,  sel: 0,    fibres: 0.2, prot: 0.7,  flv: 90, glucides: 8.8, lipides: 0.2 },
  jusfruit:       { prixKg: 2.00, calPer100g: 45,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 0.3, prot: 0.5,  flv: 90, glucides: 9.5, lipides: 0.2 },
  
  // ===== VIANDES =====
  poulet:         { prixKg: 9.00, calPer100g: 165,  lipSat: 1.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 31,   flv: 0, glucides: 0, lipides: 3.6 },
  poulettranche:  { prixKg: 10.0, calPer100g: 110,  lipSat: 0.8,  sucre: 0,    sel: 1.8,  fibres: 0,   prot: 22,   flv: 0, glucides: 0, lipides: 2.3 },
  pouletcuisses:  { prixKg: 7.50, calPer100g: 209,  lipSat: 3.2,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0, glucides: 0, lipides: 7.4 },
  pouletHache:    { prixKg: 11.0, calPer100g: 143,  lipSat: 1.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 2.8 },
  pouletoupigeon: { prixKg: 12.0, calPer100g: 175,  lipSat: 1.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 28,   flv: 0, glucides: 0, lipides: 4.2 },
  boeuf:          { prixKg: 22.0, calPer100g: 250,  lipSat: 6.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0, glucides: 0, lipides: 10.8 },
  boeufpouramijoter:{ prixKg:18.0, calPer100g: 207,  lipSat: 5.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0, glucides: 0, lipides: 8.7 },
  boeufbourguignon:{ prixKg: 17.0,calPer100g: 207,  lipSat: 5.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0, glucides: 0, lipides: 8.7 },
  filetdeboeuf:   { prixKg: 45.0, calPer100g: 217,  lipSat: 4.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 28,   flv: 0, glucides: 0, lipides: 8 },
  boeufHache:     { prixKg: 14.0, calPer100g: 254,  lipSat: 7.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0, glucides: 0, lipides: 12 },
  boeufhache:     { prixKg: 14.0, calPer100g: 254,  lipSat: 7.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0, glucides: 0, lipides: 12 },
  viandeHachee:   { prixKg: 13.0, calPer100g: 254,  lipSat: 7.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0, glucides: 0, lipides: 12 },
  viande:         { prixKg: 15.0, calPer100g: 220,  lipSat: 5.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0, glucides: 0, lipides: 8.8 },
  porc:           { prixKg: 11.0, calPer100g: 242,  lipSat: 5.2,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 27,   flv: 0, glucides: 0, lipides: 9.2 },
  porchache:      { prixKg: 12.0, calPer100g: 263,  lipSat: 7.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 11.5 },
  agneau:         { prixKg: 25.0, calPer100g: 294,  lipSat: 9.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 12 },
  agneauHache:    { prixKg: 22.0, calPer100g: 282,  lipSat: 9.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 23,   flv: 0, glucides: 0, lipides: 15 },
  veau:           { prixKg: 28.0, calPer100g: 172,  lipSat: 3.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 28,   flv: 0, glucides: 0, lipides: 5.4 },
  lapin:           { prixKg: 18.0, calPer100g: 173,  lipSat: 1.9,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 33,   flv: 0, glucides: 0, lipides: 3.5 },
  canard:         { prixKg: 22.0, calPer100g: 337,  lipSat: 9.8,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 19,   flv: 0, glucides: 0, lipides: 17 },
  cuissecanard:   { prixKg: 20.0, calPer100g: 337,  lipSat: 9.8,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 19,   flv: 0, glucides: 0, lipides: 27 },
  graissecanard:  { prixKg: 12.0, calPer100g: 882,  lipSat: 35,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  foie:           { prixKg: 14.0, calPer100g: 135,  lipSat: 1.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 20,   flv: 0, glucides: 3.5, lipides: 5 },
  travers:        { prixKg: 12.0, calPer100g: 360,  lipSat: 11,   sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 28 },
  jarret:         { prixKg: 10.0, calPer100g: 200,  lipSat: 5.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 28,   flv: 0, glucides: 0, lipides: 10 },
  joues:          { prixKg: 18.0, calPer100g: 220,  lipSat: 6.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 13 },
  cotelets:       { prixKg: 16.0, calPer100g: 280,  lipSat: 9.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 24,   flv: 0, glucides: 0, lipides: 20 },
  os:             { prixKg: 2.00, calPer100g: 100,  lipSat: 2.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 10,   flv: 0, glucides: 0, lipides: 6 },
  queueboeuf:     { prixKg: 14.0, calPer100g: 270,  lipSat: 8.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 17 },
  
  // ===== CHARCUTERIE =====
  jambon:         { prixKg: 18.0, calPer100g: 145,  lipSat: 2.0,  sucre: 1,    sel: 2.3,  fibres: 0,   prot: 21,   flv: 0, glucides: 1, lipides: 5.5 },
  bacon:          { prixKg: 17.0, calPer100g: 417,  lipSat: 14,   sucre: 0,    sel: 4.5,  fibres: 0,   prot: 13,   flv: 0, glucides: 0, lipides: 37 },
  lardons:        { prixKg: 11.0, calPer100g: 286,  lipSat: 9.0,  sucre: 0,    sel: 2.0,  fibres: 0,   prot: 17,   flv: 0, glucides: 0, lipides: 23 },
  lard:           { prixKg: 11.0, calPer100g: 286,  lipSat: 9.0,  sucre: 0,    sel: 2.0,  fibres: 0,   prot: 17,   flv: 0, glucides: 0, lipides: 23 },
  saucisses:      { prixKg: 10.0, calPer100g: 304,  lipSat: 9.0,  sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 13,   flv: 0, glucides: 1.5, lipides: 23 },
  saucisse:       { prixKg: 10.0, calPer100g: 304,  lipSat: 9.0,  sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 13,   flv: 0, glucides: 1.5, lipides: 23 },
  saucissefumee:  { prixKg: 15.0, calPer100g: 320,  lipSat: 10,   sucre: 0.5,  sel: 2.0,  fibres: 0,   prot: 13,   flv: 0, glucides: 1.5, lipides: 24 },
  prosciutto:     { prixKg: 35.0, calPer100g: 195,  lipSat: 2.5,  sucre: 0,    sel: 4.0,  fibres: 0,   prot: 28,   flv: 0, glucides: 0, lipides: 5 },
  chorizo:        { prixKg: 18.0, calPer100g: 455,  lipSat: 14,   sucre: 1,    sel: 3.0,  fibres: 0,   prot: 24,   flv: 0, glucides: 2, lipides: 37 },
  salami:         { prixKg: 20.0, calPer100g: 425,  lipSat: 14,   sucre: 0.5,  sel: 4.0,  fibres: 0,   prot: 22,   flv: 0, glucides: 1.5, lipides: 34 },
  merguez:        { prixKg: 14.0, calPer100g: 275,  lipSat: 9.0,  sucre: 1,    sel: 1.8,  fibres: 0,   prot: 14,   flv: 0, glucides: 1.5, lipides: 21 },
  andouillette:   { prixKg: 14.0, calPer100g: 240,  lipSat: 8.0,  sucre: 0.5,  sel: 1.7,  fibres: 0,   prot: 16,   flv: 0, glucides: 1, lipides: 16 },
  bratwurst:      { prixKg: 14.0, calPer100g: 297,  lipSat: 9.0,  sucre: 1,    sel: 1.8,  fibres: 0,   prot: 12,   flv: 0, glucides: 2, lipides: 23 },
  guanciale:      { prixKg: 28.0, calPer100g: 470,  lipSat: 14,   sucre: 0,    sel: 2.5,  fibres: 0,   prot: 16,   flv: 0, glucides: 0, lipides: 45 },
  nduja:          { prixKg: 22.0, calPer100g: 450,  lipSat: 13,   sucre: 0,    sel: 3.0,  fibres: 0,   prot: 19,   flv: 0, glucides: 0, lipides: 38 },
  charcuterie:    { prixKg: 22.0, calPer100g: 350,  lipSat: 12,   sucre: 0.5,  sel: 3.0,  fibres: 0,   prot: 22,   flv: 0, glucides: 1.5, lipides: 26 },
  saindoux:       { prixKg: 6.00, calPer100g: 902,  lipSat: 39,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  serrano:        { prixKg: 40.0, calPer100g: 240,  lipSat: 5.0,  sucre: 0,    sel: 5.0,  fibres: 0,   prot: 33,   flv: 0, glucides: 0, lipides: 11 },
  
  // ===== POISSONS & FRUITS DE MER =====
  saumon:         { prixKg: 22.0, calPer100g: 208,  lipSat: 3.1,  sucre: 0,    sel: 0.1,  fibres: 0,   prot: 20,   flv: 0, glucides: 0, lipides: 13 },
  saumonfrais:    { prixKg: 22.0, calPer100g: 208,  lipSat: 3.1,  sucre: 0,    sel: 0.1,  fibres: 0,   prot: 20,   flv: 0, glucides: 0, lipides: 13 },
  saumonfume:     { prixKg: 35.0, calPer100g: 117,  lipSat: 0.9,  sucre: 0,    sel: 3.0,  fibres: 0,   prot: 18,   flv: 0, glucides: 0, lipides: 3 },
  thon:           { prixKg: 20.0, calPer100g: 144,  lipSat: 1.3,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 30,   flv: 0, glucides: 0, lipides: 4.8 },
  thonHuile:      { prixKg: 14.0, calPer100g: 198,  lipSat: 1.5,  sucre: 0,    sel: 0.5,  fibres: 0,   prot: 28,   flv: 0, glucides: 0, lipides: 9 },
  crevettes:      { prixKg: 18.0, calPer100g: 99,   lipSat: 0.4,  sucre: 0,    sel: 0.9,  fibres: 0,   prot: 24,   flv: 0, glucides: 0, lipides: 1.5 },
  crevette:       { prixKg: 18.0, calPer100g: 99,   lipSat: 0.4,  sucre: 0,    sel: 0.9,  fibres: 0,   prot: 24,   flv: 0, glucides: 0, lipides: 1.5 },
  crabe:          { prixKg: 24.0, calPer100g: 83,   lipSat: 0.1,  sucre: 0,    sel: 0.8,  fibres: 0,   prot: 18,   flv: 0, glucides: 0, lipides: 1.5 },
  huitres:        { prixUnite: 1.00, cal: 7,         lipSat: 0,    sucre: 0.4,  sel: 0.1,  fibres: 0,   prot: 0.9,  flv: 0, glucides: 0.4, lipides: 0.5 },
  champignon:     { prixKg: 6.00,  calPer100g: 22,   lipSat: 0,    sucre: 1,    sel: 0,    fibres: 2,   prot: 3.1,  flv: 100, glucides: 3.2, lipides: 0.3 },
  morilleseche:   { prixKg: 180.00, calPer100g: 295, lipSat: 0.5,  sucre: 4,    sel: 0,    fibres: 17,  prot: 22,   flv: 100, glucides: 41, lipides: 2 },
  speculoos:      { prixKg: 7.00,  calPer100g: 486,  lipSat: 8,    sucre: 38,   sel: 0.9,  fibres: 2,   prot: 6,    flv: 0, glucides: 64, lipides: 17 },
  tomatesechees:  { prixKg: 18.00, calPer100g: 200,  lipSat: 1,    sucre: 35,   sel: 0.5,  fibres: 12,  prot: 14,   flv: 100, glucides: 29, lipides: 3 },
  oeufscabillaud: { prixKg: 35.00, calPer100g: 130,  lipSat: 0.5,  sucre: 0,    sel: 5,    fibres: 0,   prot: 24,   flv: 0, glucides: 0, lipides: 2 },
  truite:         { prixKg: 14.00, calPer100g: 119,  lipSat: 1.2,  sucre: 0,    sel: 0.1,  fibres: 0,   prot: 20,   flv: 0, glucides: 0, lipides: 4 },
  barpoisson:     { prixKg: 22.00, calPer100g: 97,   lipSat: 0.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 18.5, flv: 0, glucides: 0, lipides: 2.5 },
  feveseche:      { prixKg: 4.00,  calPer100g: 341,  lipSat: 0.3,  sucre: 5,    sel: 0,    fibres: 25,  prot: 26,   flv: 0, glucides: 49, lipides: 2 },
  brocciu:        { prixKg: 18.00, calPer100g: 160,  lipSat: 8,    sucre: 3,    sel: 0.5,  fibres: 0,   prot: 11,   flv: 0, glucides: 3, lipides: 13 },
  endive:         { prixKg: 3.00,  calPer100g: 17,   lipSat: 0,    sucre: 1,    sel: 0,    fibres: 3,   prot: 1.3,  flv: 100, glucides: 2.7, lipides: 0.1 },
  roquefort:      { prixKg: 22.00, calPer100g: 369,  lipSat: 19,   sucre: 2,    sel: 3.5,  fibres: 0,   prot: 19,   flv: 0, glucides: 2, lipides: 32 },
  harissa:        { prixKg: 12.0,  calPer100g: 70,   lipSat: 0.5,  sucre: 3,    sel: 3,    fibres: 3,   prot: 2,    flv: 80, glucides: 8, lipides: 3 },
  cornichon:      { prixKg: 6.00,  calPer100g: 14,   lipSat: 0,    sucre: 1.5,  sel: 2,    fibres: 1.2, prot: 0.4,  flv: 100, glucides: 2.4, lipides: 0.1 },
  houmous:        { prixKg: 8.00,  calPer100g: 230,  lipSat: 2,    sucre: 0.5,  sel: 1.2,  fibres: 4,   prot: 7,    flv: 60, glucides: 19, lipides: 8 },
  mortadelle:     { prixKg: 14.0,  calPer100g: 290,  lipSat: 9,    sucre: 0.5,  sel: 2.5,  fibres: 0,   prot: 16,   flv: 0, glucides: 0.5, lipides: 23 },
  pignon:         { prixKg: 40.0,  calPer100g: 673,  lipSat: 4.6,  sucre: 3.6,  sel: 0,    fibres: 3.7, prot: 14,   flv: 100, glucides: 13.8, lipides: 68 },
  pistache:       { prixKg: 25.0,  calPer100g: 560,  lipSat: 5.4,  sucre: 8,    sel: 0,    fibres: 10,  prot: 20,   flv: 100, glucides: 28, lipides: 50 },
  raisinsec:      { prixKg: 6.00,  calPer100g: 299,  lipSat: 0.1,  sucre: 60,   sel: 0,    fibres: 4,   prot: 3,    flv: 100, glucides: 79, lipides: 0.5 },
  paincomplet:    { prixKg: 4.50,  calPer100g: 247,  lipSat: 0.6,  sucre: 3,    sel: 1.1,  fibres: 7,   prot: 9,    flv: 0, glucides: 42, lipides: 2 },
  painmie:        { prixKg: 4.00,  calPer100g: 280,  lipSat: 1,    sucre: 4,    sel: 1.1,  fibres: 3,   prot: 8,    flv: 0, glucides: 51, lipides: 3.5 },
  bagel:          { prixUnite: 0.50, cal: 245,      lipSat: 0.5,  sucre: 5,    sel: 1.1,  fibres: 2.3, prot: 9,    flv: 0, glucides: 48, lipides: 1.5 },
  escargot:       { prixUnite: 0.25, cal: 18,       lipSat: 0.4,  sucre: 0,    sel: 0.3,  fibres: 0,   prot: 1.6,  flv: 0, glucides: 0, lipides: 1 },
  figue:          { prixUnite: 0.60, cal: 37,       lipSat: 0,    sucre: 8,    sel: 0,    fibres: 1.5, prot: 0.4,  flv: 100, glucides: 8.5, lipides: 0.3 },
  painpanini:     { prixUnite: 0.60, cal: 240,      lipSat: 1,    sucre: 3,    sel: 1.1,  fibres: 2,   prot: 8,    flv: 0, glucides: 44, lipides: 2 },
  comte:          { prixKg: 16.0, calPer100g: 410,  lipSat: 20,   sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 27,   flv: 0, glucides: 0.5, lipides: 33 },
  morue:          { prixKg: 18.0, calPer100g: 105,  lipSat: 0.2,  sucre: 0,    sel: 1.5,  fibres: 0,   prot: 23,   flv: 0, glucides: 0, lipides: 0.8 },
  olivenoire:     { prixKg: 10.0, calPer100g: 115,  lipSat: 1.4,  sucre: 0,    sel: 3.3,  fibres: 3.2, prot: 0.8,  flv: 100, glucides: 3.8, lipides: 11 },
  olivevert:      { prixKg: 9.0,  calPer100g: 145,  lipSat: 1.9,  sucre: 0,    sel: 3.3,  fibres: 3,   prot: 1,    flv: 100, glucides: 3.8, lipides: 13.5 },
  tortillachips:  { prixKg: 8.0,  calPer100g: 500,  lipSat: 3,    sucre: 1.5,  sel: 1.2,  fibres: 4,   prot: 7,    flv: 0, glucides: 57, lipides: 24 },
  yaourtgrec:     { prixKg: 4.0,  calPer100g: 115,  lipSat: 6,    sucre: 4,    sel: 0.1,  fibres: 0,   prot: 5,    flv: 0, glucides: 4.5, lipides: 10 },
  tomatecerise:   { prixUnite: 0.06, cal: 1.4,      lipSat: 0,    sucre: 0.2,  sel: 0,    fibres: 0.1, prot: 0.07, flv: 100, glucides: 2.3, lipides: 0.2 },
  feuillebrick:   { prixUnite: 0.15, cal: 35,       lipSat: 0.2,  sucre: 0,    sel: 0.4,  fibres: 0.5, prot: 1,    flv: 0, glucides: 1.8, lipides: 15 },
  saintjacques:   { prixKg: 35.0, calPer100g: 88,   lipSat: 0.1,  sucre: 0,    sel: 0.4,  fibres: 0,   prot: 17,   flv: 0, glucides: 0, lipides: 1 },
  poissonroche:   { prixKg: 18.0, calPer100g: 110,  lipSat: 0.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 20,   flv: 0, glucides: 0, lipides: 2.5 },
  poisson:        { prixKg: 16.0, calPer100g: 105,  lipSat: 0.4,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 20,   flv: 0, glucides: 0, lipides: 1.8 },
  dorade:         { prixKg: 22.0, calPer100g: 96,   lipSat: 0.4,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 20,   flv: 0, glucides: 0, lipides: 1.8 },
  brochet:        { prixKg: 18.0, calPer100g: 88,   lipSat: 0.2,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 19,   flv: 0, glucides: 0, lipides: 0.9 },
  moules:         { prixKg: 7.00, calPer100g: 86,   lipSat: 0.4,  sucre: 0,    sel: 0.7,  fibres: 0,   prot: 12,   flv: 0, glucides: 3.7, lipides: 2 },
  moule:          { prixKg: 7.00, calPer100g: 86,   lipSat: 0.4,  sucre: 0,    sel: 0.7,  fibres: 0,   prot: 12,   flv: 0, glucides: 3.7, lipides: 2 },
  poulpe:         { prixKg: 22.0, calPer100g: 82,   lipSat: 0.2,  sucre: 0,    sel: 0.5,  fibres: 0,   prot: 15,   flv: 0, glucides: 0, lipides: 0.9 },
  calamars:       { prixKg: 15.0, calPer100g: 92,   lipSat: 0.4,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 16,   flv: 0, glucides: 0, lipides: 2 },
  ecrevisses:     { prixKg: 28.0, calPer100g: 82,   lipSat: 0.2,  sucre: 0,    sel: 0.3,  fibres: 0,   prot: 16,   flv: 0, glucides: 0, lipides: 0.9 },
  palourdes:      { prixKg: 16.0, calPer100g: 86,   lipSat: 0.2,  sucre: 0,    sel: 0.6,  fibres: 0,   prot: 15,   flv: 0, glucides: 3.1, lipides: 1 },
  anchois:        { prixKg: 25.0, calPer100g: 210,  lipSat: 2.2,  sucre: 0,    sel: 9.5,  fibres: 0,   prot: 29,   flv: 0, glucides: 0, lipides: 11.5 },
  anchoix:        { prixKg: 25.0, calPer100g: 210,  lipSat: 2.2,  sucre: 0,    sel: 9.5,  fibres: 0,   prot: 29,   flv: 0, glucides: 0, lipides: 11.5 },
  moruedessale:   { prixKg: 30.0, calPer100g: 290,  lipSat: 0.4,  sucre: 0,    sel: 17,   fibres: 0,   prot: 63,   flv: 0, glucides: 0, lipides: 2 },
  nori:           { prixKg: 80.0, calPer100g: 35,   lipSat: 0.1,  sucre: 0.5,  sel: 0.6,  fibres: 0.3, prot: 5.8,  flv: 100, glucides: 4, lipides: 0.6 },
  wakame:         { prixKg: 60.0, calPer100g: 45,   lipSat: 0.1,  sucre: 0.6,  sel: 0.9,  fibres: 0.5, prot: 3,    flv: 100, glucides: 7.8, lipides: 0.6 },
  bonite:         { prixKg: 30.0, calPer100g: 105,  lipSat: 0.4,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 24,   flv: 0, glucides: 0, lipides: 2 },
  
  // ===== CÉRÉALES, RIZ, PÂTES =====
  riz:            { prixKg: 2.50, calPer100g: 365,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 1.3, prot: 7.1,  flv: 0, glucides: 77.3, lipides: 1.1 },
  rizbasmati:     { prixKg: 3.50, calPer100g: 360,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 1.3, prot: 7.5,  flv: 0, glucides: 76.8, lipides: 1.1 },
  rizS:           { prixKg: 2.50, calPer100g: 365,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 1.3, prot: 7.1,  flv: 0, glucides: 77.3, lipides: 1.1 },
  rizCuit:        { prixKg: 2.50, calPer100g: 130,  lipSat: 0.1,  sucre: 0,    sel: 0,    fibres: 0.4, prot: 2.7,  flv: 0, glucides: 28.2, lipides: 0.4 },
  "rizGrillé":    { prixKg: 4.00, calPer100g: 365,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 1.3, prot: 7.1,  flv: 0 },
  pates:          { prixKg: 2.00, calPer100g: 371,  lipSat: 0.2,  sucre: 3.2,  sel: 0,    fibres: 3.2, prot: 13,   flv: 0, glucides: 74, lipides: 1.1 },
  spaghetti:      { prixKg: 2.00, calPer100g: 371,  lipSat: 0.2,  sucre: 3.2,  sel: 0,    fibres: 3.2, prot: 13,   flv: 0, glucides: 74, lipides: 1.1 },
  tagliatellesfraiches:{ prixKg:6.0,calPer100g: 287, lipSat: 0.5,  sucre: 2,    sel: 0.4,  fibres: 2.3, prot: 11,   flv: 0, glucides: 59.5, lipides: 2.5 },
  lasagne:        { prixKg: 3.50, calPer100g: 371,  lipSat: 0.2,  sucre: 3.2,  sel: 0,    fibres: 3.2, prot: 13,   flv: 0, glucides: 74, lipides: 1.1 },
  nouilles:       { prixKg: 3.00, calPer100g: 380,  lipSat: 0.2,  sucre: 0.5,  sel: 0.1,  fibres: 1.5, prot: 11,   flv: 0, glucides: 79, lipides: 1.1 },
  ramen:          { prixKg: 5.00, calPer100g: 436,  lipSat: 5.0,  sucre: 1,    sel: 2.5,  fibres: 1.5, prot: 8,    flv: 0, glucides: 80, lipides: 27 },
  soba:           { prixKg: 6.00, calPer100g: 336,  lipSat: 0.2,  sucre: 0.5,  sel: 0.3,  fibres: 2.5, prot: 14,   flv: 0, glucides: 65, lipides: 1.1 },
  nouillesoeuf:   { prixKg: 4.00, calPer100g: 390,  lipSat: 0.6,  sucre: 1,    sel: 0.1,  fibres: 2,   prot: 13,   flv: 0, glucides: 78, lipides: 3.5 },
  vermicelles:    { prixKg: 3.00, calPer100g: 360,  lipSat: 0.2,  sucre: 1,    sel: 0,    fibres: 1,   prot: 7,    flv: 0, glucides: 75, lipides: 1.1 },
  quinoa:         { prixKg: 8.00, calPer100g: 368,  lipSat: 0.7,  sucre: 4.6,  sel: 0,    fibres: 7,   prot: 14,   flv: 0, glucides: 62, lipides: 6 },
  semoule:        { prixKg: 2.00, calPer100g: 360,  lipSat: 0.2,  sucre: 0.8,  sel: 0,    fibres: 3.9, prot: 12,   flv: 0, glucides: 71, lipides: 1 },
  polenta:        { prixKg: 3.50, calPer100g: 370,  lipSat: 0.5,  sucre: 0.8,  sel: 0,    fibres: 7,   prot: 8,    flv: 0, glucides: 72, lipides: 2.5 },
  boulghour:      { prixKg: 3.00, calPer100g: 342,  lipSat: 0.2,  sucre: 0.4,  sel: 0,    fibres: 12,  prot: 12,   flv: 0, glucides: 61, lipides: 1 },
  manioc:         { prixKg: 5.00, calPer100g: 160,  lipSat: 0.1,  sucre: 1.7,  sel: 0,    fibres: 1.8, prot: 1.4,  flv: 100, glucides: 39, lipides: 0.5 },
  tteok:          { prixKg: 8.00, calPer100g: 230,  lipSat: 0.2,  sucre: 0.5,  sel: 0.5,  fibres: 0.5, prot: 2,    flv: 0, glucides: 50, lipides: 1 },
  flocons:        { prixKg: 2.50, calPer100g: 379,  lipSat: 1.4,  sucre: 1,    sel: 0,    fibres: 10,  prot: 13,   flv: 0, glucides: 66, lipides: 6.9 },
  lentilles:      { prixKg: 4.00, calPer100g: 116,  lipSat: 0.1,  sucre: 1.8,  sel: 0,    fibres: 7.9, prot: 9,    flv: 100, glucides: 20, lipides: 0.4 },
  lentillesCorail:{ prixKg: 5.00, calPer100g: 350,  lipSat: 0.2,  sucre: 1,    sel: 0,    fibres: 11,  prot: 24,   flv: 100, glucides: 63, lipides: 1.5 },
  poischiches:    { prixKg: 3.50, calPer100g: 364,  lipSat: 0.7,  sucre: 11,   sel: 0,    fibres: 17,  prot: 19,   flv: 100, glucides: 61, lipides: 5.7 },
  farinepoischiche: { prixKg: 4.50, calPer100g: 387, lipSat: 0.6, sucre: 11,   sel: 0,    fibres: 11,  prot: 22,   flv: 50, glucides: 63, lipides: 6.2 },
  mloukhia:       { prixKg: 30.0, calPer100g: 210,  lipSat: 0.5,  sucre: 2,    sel: 0.1,  fibres: 30,  prot: 25,   flv: 70, glucides: 28, lipides: 3.5 },
  igname:         { prixKg: 3.00, calPer100g: 118,  lipSat: 0,    sucre: 0.5,  sel: 0,    fibres: 4,   prot: 1.5,  flv: 0, glucides: 28, lipides: 0.1 },
  gombo:          { prixKg: 6.00, calPer100g: 33,   lipSat: 0,    sucre: 1.5,  sel: 0,    fibres: 3.2, prot: 1.9,  flv: 80, glucides: 7.3, lipides: 0.2 },
  attieke:        { prixKg: 5.00, calPer100g: 165,  lipSat: 0,    sucre: 1,    sel: 0,    fibres: 2,   prot: 1,    flv: 60, glucides: 36, lipides: 0.4 },
  
  // ===== PAINS & BOULANGERIE =====
  pain:           { prixKg: 4.50, calPer100g: 265,  lipSat: 0.7,  sucre: 5.7,  sel: 1.4,  fibres: 4,   prot: 9,    flv: 0, glucides: 49, lipides: 1.9 },
  painrassis:     { prixKg: 3.00, calPer100g: 265,  lipSat: 0.7,  sucre: 5.7,  sel: 1.4,  fibres: 4,   prot: 9,    flv: 0, glucides: 49, lipides: 1.9 },
  briocheoupain:  { prixKg: 7.00, calPer100g: 310,  lipSat: 6,    sucre: 12,   sel: 0.9,  fibres: 2.5, prot: 8,    flv: 0, glucides: 51, lipides: 9.5 },
  baguette:       { prixKg: 4.00, calPer100g: 274,  lipSat: 0.4,  sucre: 1.2,  sel: 1.6,  fibres: 3.5, prot: 9,    flv: 0, glucides: 53, lipides: 1.1 },
  buns:           { prixKg: 6.00, calPer100g: 290,  lipSat: 1.5,  sucre: 7,    sel: 1.0,  fibres: 2.5, prot: 9,    flv: 0, glucides: 54, lipides: 3.4 },
  pita:           { prixKg: 5.00, calPer100g: 275,  lipSat: 0.4,  sucre: 2,    sel: 1.0,  fibres: 2.7, prot: 9,    flv: 0, glucides: 54, lipides: 1.1 },
  painpita:       { prixKg: 5.00, calPer100g: 275,  lipSat: 0.4,  sucre: 2,    sel: 1.0,  fibres: 2.7, prot: 9,    flv: 0, glucides: 54, lipides: 1.1 },
  tortillas:      { prixKg: 5.00, calPer100g: 290,  lipSat: 1.0,  sucre: 1.5,  sel: 1.5,  fibres: 3,   prot: 8,    flv: 0, glucides: 54, lipides: 3.5 },
  tortilla:       { prixKg: 5.00, calPer100g: 290,  lipSat: 1.0,  sucre: 1.5,  sel: 1.5,  fibres: 3,   prot: 8,    flv: 0, glucides: 54, lipides: 3.5 },
  croutons:       { prixKg: 6.00, calPer100g: 407,  lipSat: 2.5,  sucre: 3,    sel: 2.5,  fibres: 5,   prot: 12,   flv: 0, glucides: 73, lipides: 7.7 },
  chapelure:      { prixKg: 4.00, calPer100g: 397,  lipSat: 0.5,  sucre: 4.0,  sel: 1.5,  fibres: 4.5, prot: 13,   flv: 0, glucides: 74, lipides: 2 },
  panko:          { prixKg: 6.00, calPer100g: 390,  lipSat: 0.5,  sucre: 2,    sel: 1.0,  fibres: 4,   prot: 12,   flv: 0, glucides: 76, lipides: 1.5 },
  levain:         { prixKg: 5.00, calPer100g: 250,  lipSat: 0.5,  sucre: 1,    sel: 1.2,  fibres: 4,   prot: 9,    flv: 0, glucides: 46, lipides: 1.5 },
  
  // ===== PÂTES (à dérouler) =====
  pate:           { prixKg: 5.00, calPer100g: 280,  lipSat: 5,    sucre: 5,    sel: 1.0,  fibres: 2,   prot: 7,    flv: 0, glucides: 46, lipides: 8.5 },
  paton:          { prixKg: 1.50, calPer100g: 280,  lipSat: 5,    sucre: 5,    sel: 1.0,  fibres: 2,   prot: 7,    flv: 0, glucides: 46, lipides: 8.5 },
  feuilletee:     { prixKg: 6.00, calPer100g: 420,  lipSat: 15,   sucre: 1,    sel: 1.1,  fibres: 2,   prot: 6,    flv: 0, glucides: 48, lipides: 26.5 },
  patefeuilletee: { prixKg: 6.00, calPer100g: 420,  lipSat: 15,   sucre: 1,    sel: 1.1,  fibres: 2,   prot: 6,    flv: 0, glucides: 48, lipides: 26.5 },
  pateFeuilletee: { prixKg: 6.00, calPer100g: 420,  lipSat: 15,   sucre: 1,    sel: 1.1,  fibres: 2,   prot: 6,    flv: 0, glucides: 48, lipides: 26.5 },
  patebrisee:     { prixKg: 5.50, calPer100g: 390,  lipSat: 11,   sucre: 1,    sel: 1.0,  fibres: 2,   prot: 6,    flv: 0, glucides: 50, lipides: 19.5 },
  pateSablee:     { prixKg: 5.50, calPer100g: 440,  lipSat: 12,   sucre: 20,   sel: 0.5,  fibres: 1.5, prot: 6,    flv: 0, glucides: 55, lipides: 19.5 },
  pateC:          { prixKg: 5.00, calPer100g: 400,  lipSat: 11,   sucre: 8,    sel: 0.8,  fibres: 2,   prot: 6,    flv: 0, glucides: 55, lipides: 16.5 },
  filo:           { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0, glucides: 58, lipides: 1.5 },
  feuillesFilo:   { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0, glucides: 58, lipides: 1.5 },
  feuillesBric:   { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0, glucides: 58, lipides: 1.5 },
  feuillesBrick:  { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0, glucides: 58, lipides: 1.5 },
  feuillesbrick:  { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0, glucides: 58, lipides: 1.5 },
  feuilleswonton: { prixKg: 7.00, calPer100g: 300,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 1.5, prot: 9,    flv: 0, glucides: 58, lipides: 1.5 },
  baos:           { prixKg: 8.00, calPer100g: 240,  lipSat: 1.0,  sucre: 4,    sel: 0.8,  fibres: 1.5, prot: 7,    flv: 0, glucides: 44, lipides: 2 },
  kataifi:        { prixKg: 10.0, calPer100g: 380,  lipSat: 0.5,  sucre: 3,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0, glucides: 73, lipides: 1.5 },
  feuille:        { prixKg: 5.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0, glucides: 57, lipides: 1.5 },
  
  // ===== SUCRES & DOUCEURS =====
  cassonade:      { prixKg: 1.80, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 96, lipides: 0 },
  sucresemoule:   { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  sucreglace:     { prixKg: 1.50, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  sucreGlace:     { prixKg: 1.50, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  sucreCreme:     { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  sucrebrun:      { prixKg: 1.80, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 96, lipides: 0 },
  sucreroux:      { prixKg: 1.80, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 96, lipides: 0 },
  sucrecasso:     { prixKg: 1.80, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 96, lipides: 0 },
  vergeoise:      { prixKg: 3.00, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 96, lipides: 0 },
  sucrepalme:     { prixKg: 6.00, calPer100g: 383,  lipSat: 0,    sucre: 95,   sel: 0,    fibres: 0,   prot: 1,    flv: 0, glucides: 95, lipides: 0 },
  sucreCaramel:   { prixKg: 4.00, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  sucrecaramel:   { prixKg: 4.00, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  sucreIles:      { prixKg: 3.00, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 96, lipides: 0 },
  sucreMeringue:  { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  gSucre:         { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  miel:           { prixKg: 14.0, calPer100g: 304,  lipSat: 0,    sucre: 82,   sel: 0,    fibres: 0.2, prot: 0.3,  flv: 0, glucides: 82, lipides: 0 },
  siropderable:   { prixKg: 12.0, calPer100g: 260,  lipSat: 0,    sucre: 60,   sel: 0.05, fibres: 0,   prot: 0,    flv: 0, glucides: 60, lipides: 0 },
  sirop:          { prixKg: 10.0, calPer100g: 310,  lipSat: 0,    sucre: 78,   sel: 0.1,  fibres: 0,   prot: 0.1,  flv: 0, glucides: 78, lipides: 0 },
  caramel:        { prixKg: 8.00, calPer100g: 380,  lipSat: 5,    sucre: 75,   sel: 0.2,  fibres: 0,   prot: 2,    flv: 0, glucides: 75, lipides: 12.5 },
  dulceDeLeche:   { prixKg: 8.00, calPer100g: 315,  lipSat: 4,    sucre: 55,   sel: 0.3,  fibres: 0,   prot: 7,    flv: 0, glucides: 55, lipides: 11 },
  pralin:         { prixKg: 16.0, calPer100g: 530,  lipSat: 4,    sucre: 50,   sel: 0,    fibres: 5,   prot: 10,   flv: 100, glucides: 50, lipides: 48 },
  fondant:        { prixKg: 8.00, calPer100g: 400,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0.5,  flv: 0, glucides: 96, lipides: 0 },
  chocolat:       { prixKg: 14.0, calPer100g: 546,  lipSat: 19,   sucre: 48,   sel: 0.1,  fibres: 7,   prot: 7.7,  flv: 30, glucides: 48, lipides: 30 },
  chocolatnoir:   { prixKg: 18.0, calPer100g: 590,  lipSat: 23,   sucre: 24,   sel: 0,    fibres: 11,  prot: 7.8,  flv: 50, glucides: 24, lipides: 33 },
  chocolatNoir:   { prixKg: 18.0, calPer100g: 590,  lipSat: 23,   sucre: 24,   sel: 0,    fibres: 11,  prot: 7.8,  flv: 50, glucides: 24, lipides: 33 },
  choco:          { prixKg: 14.0, calPer100g: 546,  lipSat: 19,   sucre: 48,   sel: 0.1,  fibres: 7,   prot: 7.7,  flv: 30, glucides: 48, lipides: 30 },
  pepiteschoco:   { prixKg: 14.0, calPer100g: 480,  lipSat: 17,   sucre: 56,   sel: 0.05, fibres: 4,   prot: 4,    flv: 0, glucides: 56, lipides: 27 },
  pepites:        { prixKg: 14.0, calPer100g: 480,  lipSat: 17,   sucre: 56,   sel: 0.05, fibres: 4,   prot: 4,    flv: 0, glucides: 56, lipides: 27 },
  cacao:          { prixKg: 18.0, calPer100g: 228,  lipSat: 8,    sucre: 1,    sel: 0,    fibres: 33,  prot: 19,   flv: 30, glucides: 1, lipides: 23 },
  ganacheoufruit: { prixKg: 12.0, calPer100g: 400,  lipSat: 15,   sucre: 35,   sel: 0.1,  fibres: 3,   prot: 5,    flv: 30, glucides: 35, lipides: 24 },
  glace:          { prixKg: 6.00, calPer100g: 207,  lipSat: 7,    sucre: 21,   sel: 0.2,  fibres: 0.5, prot: 3.5,  flv: 0, glucides: 21, lipides: 11 },
  glacevanille:   { prixKg: 6.00, calPer100g: 207,  lipSat: 7,    sucre: 21,   sel: 0.2,  fibres: 0.5, prot: 3.5,  flv: 0, glucides: 21.5, lipides: 11 },
  
  // ===== ÉPICES & AROMATES (utilisés en très petite quantité) =====
  vanille:        { prixKg: 800.0,calPer100g: 288,  lipSat: 0,    sucre: 13,   sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 13, lipides: 0.1 },
  cannelle:       { prixKg: 50.0, calPer100g: 247,  lipSat: 0.3,  sucre: 2.2,  sel: 0,    fibres: 53,  prot: 4,    flv: 0, glucides: 28, lipides: 1.2 },
  gingembre:      { prixKg: 12.0, calPer100g: 80,   lipSat: 0.2,  sucre: 1.7,  sel: 0,    fibres: 2,   prot: 1.8,  flv: 100, glucides: 18, lipides: 0.7 },
  curcuma:        { prixKg: 35.0, calPer100g: 312,  lipSat: 1,    sucre: 3,    sel: 0,    fibres: 22,  prot: 9.7,  flv: 0, glucides: 35, lipides: 3.1 },
  paprika:        { prixKg: 25.0, calPer100g: 282,  lipSat: 2.1,  sucre: 10,   sel: 0,    fibres: 35,  prot: 14,   flv: 0, glucides: 28, lipides: 13 },
  paprikaFume:    { prixKg: 30.0, calPer100g: 282,  lipSat: 2.1,  sucre: 10,   sel: 0,    fibres: 35,  prot: 14,   flv: 0, glucides: 28, lipides: 13 },
  paprikafume:    { prixKg: 30.0, calPer100g: 282,  lipSat: 2.1,  sucre: 10,   sel: 0,    fibres: 35,  prot: 14,   flv: 0, glucides: 28, lipides: 13 },
  cumin:          { prixKg: 25.0, calPer100g: 375,  lipSat: 1.5,  sucre: 2.3,  sel: 0,    fibres: 11,  prot: 18,   flv: 0, glucides: 44, lipides: 8.5 },
  fenugrec:       { prixKg: 30.0, calPer100g: 323,  lipSat: 1.5,  sucre: 0,    sel: 0,    fibres: 25,  prot: 23,   flv: 0, glucides: 43, lipides: 7.5 },
  herbesprovence: { prixKg: 40.0, calPer100g: 280,  lipSat: 0.4,  sucre: 0,    sel: 0.1,  fibres: 64,  prot: 9,    flv: 0, glucides: 8, lipides: 1 },
  persil:         { prixKg: 14.0, calPer100g: 36,   lipSat: 0.1,  sucre: 0.9,  sel: 0.1,  fibres: 3.3, prot: 3,    flv: 100, glucides: 8, lipides: 0.8 },
  coriandre:      { prixKg: 14.0, calPer100g: 23,   lipSat: 0,    sucre: 0.9,  sel: 0.1,  fibres: 2.8, prot: 2.1,  flv: 100, glucides: 3.5, lipides: 0.5 },
  basilic:        { prixKg: 18.0, calPer100g: 23,   lipSat: 0,    sucre: 0.3,  sel: 0,    fibres: 1.6, prot: 3.2,  flv: 100, glucides: 2.6, lipides: 0.6 },
  estragon:       { prixKg: 22.0, calPer100g: 49,   lipSat: 0.1,  sucre: 0,    sel: 0.1,  fibres: 7.4, prot: 3.4,  flv: 100, glucides: 1, lipides: 0.3 },
  menthe:         { prixKg: 16.0, calPer100g: 70,   lipSat: 0.2,  sucre: 0,    sel: 0,    fibres: 8,   prot: 3.8,  flv: 100, glucides: 8.5, lipides: 0.5 },
  ciboule:        { prixKg: 14.0, calPer100g: 32,   lipSat: 0,    sucre: 1.9,  sel: 0,    fibres: 2.6, prot: 1.8,  flv: 100, glucides: 7, lipides: 0.1 },
  ciboulette:     { prixKg: 14.0, calPer100g: 32,   lipSat: 0,    sucre: 1.9,  sel: 0,    fibres: 2.6, prot: 1.8,  flv: 100, glucides: 7, lipides: 0.1 },
  romarin:        { prixKg: 18.0, calPer100g: 131,  lipSat: 2.8,  sucre: 0,    sel: 0,    fibres: 14,  prot: 3.3,  flv: 0, glucides: 1, lipides: 4.7 },
  thym:           { prixKg: 18.0, calPer100g: 101,  lipSat: 0.5,  sucre: 0,    sel: 0,    fibres: 14,  prot: 5.6,  flv: 0, glucides: 24, lipides: 1.7 },
  aneth:          { prixKg: 18.0, calPer100g: 43,   lipSat: 0,    sucre: 0,    sel: 0,    fibres: 2.1, prot: 3.5,  flv: 100, glucides: 7, lipides: 0.3 },
  citronnelle:    { prixKg: 14.0, calPer100g: 99,   lipSat: 0.1,  sucre: 0,    sel: 0,    fibres: 0,   prot: 1.8,  flv: 0, glucides: 18.5, lipides: 0.2 },
  laurier:        { prixKg: 30.0, calPer100g: 313,  lipSat: 2.3,  sucre: 0,    sel: 0,    fibres: 26,  prot: 7.6,  flv: 0, glucides: 49, lipides: 9 },
  sauge:          { prixKg: 20.0, calPer100g: 315,  lipSat: 7,    sucre: 0,    sel: 0.04, fibres: 40,  prot: 11,   flv: 0, glucides: 7, lipides: 12.8 },
  origan:         { prixKg: 25.0, calPer100g: 265,  lipSat: 0.4,  sucre: 4,    sel: 0,    fibres: 43,  prot: 9,    flv: 0, glucides: 54, lipides: 1.3 },
  herbes:         { prixKg: 18.0, calPer100g: 50,   lipSat: 0.1,  sucre: 0.5,  sel: 0,    fibres: 4,   prot: 3,    flv: 100, glucides: 13.5, lipides: 0.3 },
  bouquetgarni:   { prixKg: 20.0, calPer100g: 200,  lipSat: 0.5,  sucre: 0,    sel: 0,    fibres: 25,  prot: 7,    flv: 50, glucides: 31, lipides: 1.8 },
  kaffir:         { prixKg: 50.0, calPer100g: 30,   lipSat: 0,    sucre: 0,    sel: 0,    fibres: 5,   prot: 1,    flv: 0, glucides: 2, lipides: 0.1 },
  galanga:        { prixKg: 30.0, calPer100g: 71,   lipSat: 0.1,  sucre: 0,    sel: 0,    fibres: 4.5, prot: 1,    flv: 100, glucides: 15.5, lipides: 0.3 },
  cardamome:      { prixKg: 80.0, calPer100g: 311,  lipSat: 0.7,  sucre: 0,    sel: 0,    fibres: 28,  prot: 11,   flv: 0, glucides: 41, lipides: 2.3 },
  sumac:          { prixKg: 60.0, calPer100g: 280,  lipSat: 0.3,  sucre: 2,    sel: 0,    fibres: 8,   prot: 6,    flv: 0, glucides: 15, lipides: 1.2 },
  anis:           { prixKg: 30.0, calPer100g: 337,  lipSat: 0.6,  sucre: 0,    sel: 0,    fibres: 15,  prot: 18,   flv: 0, glucides: 50, lipides: 5.8 },
  safran:         { prixKg: 5000.0,calPer100g: 310, lipSat: 1.6,  sucre: 0,    sel: 0,    fibres: 4,   prot: 11,   flv: 0, glucides: 12, lipides: 5.9 },
  muscade:        { prixKg: 60.0, calPer100g: 525,  lipSat: 25,   sucre: 28,   sel: 0,    fibres: 21,  prot: 6,    flv: 0, glucides: 49, lipides: 40 },
  curry:          { prixKg: 25.0, calPer100g: 325,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 53,  prot: 13,   flv: 0, glucides: 28, lipides: 13.2 },
  currypoudre:    { prixKg: 25.0, calPer100g: 325,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 53,  prot: 13,   flv: 0, glucides: 18, lipides: 4 },
  curryVert:      { prixKg: 35.0, calPer100g: 90,   lipSat: 0.5,  sucre: 2,    sel: 3,    fibres: 3,   prot: 3,    flv: 50, glucides: 5, lipides: 2 },
  pateMassaman:   { prixKg: 35.0, calPer100g: 110,  lipSat: 1,    sucre: 5,    sel: 3,    fibres: 3,   prot: 3,    flv: 30, glucides: 10, lipides: 2 },
  pateCurry:      { prixKg: 30.0, calPer100g: 100,  lipSat: 1,    sucre: 4,    sel: 3,    fibres: 3,   prot: 3,    flv: 30, glucides: 8, lipides: 2 },
  masala:         { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0, glucides: 17, lipides: 4 },
  garamMasala:    { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0, glucides: 17, lipides: 4 },
  epicesbiryani:  { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0, glucides: 17, lipides: 4 },
  epicesras:      { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0, glucides: 17, lipides: 4 },
  epicesmasala:   { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0, glucides: 17, lipides: 4 },
  chermoula:      { prixKg: 18.0, calPer100g: 100,  lipSat: 0.5,  sucre: 1,    sel: 1,    fibres: 5,   prot: 2,    flv: 50, glucides: 8, lipides: 2 },
  rub:            { prixKg: 25.0, calPer100g: 280,  lipSat: 1,    sucre: 30,   sel: 5,    fibres: 5,   prot: 5,    flv: 0, glucides: 47, lipides: 3 },
  fumee:          { prixKg: 50.0, calPer100g: 30,   lipSat: 0,    sucre: 5,    sel: 1,    fibres: 0,   prot: 0,    flv: 0, glucides: 5, lipides: 0.5 },
  piment:         { prixKg: 14.0, calPer100g: 40,   lipSat: 0.1,  sucre: 5,    sel: 0,    fibres: 1.5, prot: 1.9,  flv: 100, glucides: 8, lipides: 1 },
  scotchBonnet:   { prixKg: 20.0, calPer100g: 40,   lipSat: 0.1,  sucre: 5,    sel: 0,    fibres: 1.5, prot: 1.9,  flv: 100, glucides: 8, lipides: 1 },
  jalapeno:       { prixKg: 14.0, calPer100g: 29,   lipSat: 0.1,  sucre: 4,    sel: 0,    fibres: 2.8, prot: 0.9,  flv: 100, glucides: 6.5, lipides: 0.5 },
  piment_guajillo:{ prixKg: 25.0, calPer100g: 270,  lipSat: 1.5,  sucre: 10,   sel: 0.1,  fibres: 28,  prot: 11,   flv: 0, glucides: 32, lipides: 3.5 },
  piment_ancho:   { prixKg: 25.0, calPer100g: 280,  lipSat: 1.5,  sucre: 12,   sel: 0.1,  fibres: 28,  prot: 12,   flv: 0, glucides: 34, lipides: 3.5 },
  ancho:          { prixKg: 25.0, calPer100g: 280,  lipSat: 1.5,  sucre: 12,   sel: 0.1,  fibres: 28,  prot: 12,   flv: 0, glucides: 34, lipides: 3.5 },
  arome:          { prixKg: 30.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  colorant:       { prixKg: 30.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  ferment:        { prixKg: 30.0, calPer100g: 100,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 12,   flv: 0, glucides: 0, lipides: 0 },
  gelatine:       { prixKg: 25.0, calPer100g: 335,  lipSat: 0,    sucre: 0,    sel: 0.2,  fibres: 0,   prot: 84,   flv: 0, glucides: 0, lipides: 0 },
  
  // ===== SAUCES & CONDIMENTS =====
  vinaigre:       { prixKg: 2.50, calPer100g: 21,   lipSat: 0,    sucre: 0.4,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0.9, lipides: 0 },
  presure:        { prixUnite: 4.00, cal: 0,         lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  vinaigreBalsamique:{ prixKg:8.0, calPer100g: 88,   lipSat: 0,    sucre: 15,   sel: 0,    fibres: 0,   prot: 0.5,  flv: 0, glucides: 15, lipides: 0 },
  balsamique:     { prixKg: 8.00, calPer100g: 88,   lipSat: 0,    sucre: 15,   sel: 0,    fibres: 0,   prot: 0.5,  flv: 0, glucides: 15, lipides: 0 },
  vinaigreRiz:    { prixKg: 5.00, calPer100g: 30,   lipSat: 0,    sucre: 5,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 5, lipides: 0 },
  vinaigreVin:    { prixKg: 4.00, calPer100g: 19,   lipSat: 0,    sucre: 0.4,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0.8, lipides: 0 },
  vinaigreCidre:  { prixKg: 4.00, calPer100g: 22,   lipSat: 0,    sucre: 0.9,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 1.5, lipides: 0 },
  vinaigreXeres:  { prixKg: 9.00, calPer100g: 25,   lipSat: 0,    sucre: 1.5,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 2.5, lipides: 0 },
  vinaigreBlanc:  { prixKg: 1.50, calPer100g: 18,   lipSat: 0,    sucre: 0.1,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0.5, lipides: 0 },
  vinaigreFramboise:{ prixKg:7.00, calPer100g: 30,   lipSat: 0,    sucre: 4,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 4.5, lipides: 0 },
  vinaigreNoir:   { prixKg: 6.00, calPer100g: 35,   lipSat: 0,    sucre: 6,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 7, lipides: 0 },
  moutarde:       { prixKg: 6.00, calPer100g: 134,  lipSat: 0.3,  sucre: 5.4,  sel: 5.5,  fibres: 5.3, prot: 8,    flv: 0, glucides: 11, lipides: 1.5 },
  saucesoja:      { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0, glucides: 2, lipides: 0.5 },
  sojaS:          { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0, glucides: 3, lipides: 0.2 },
  sojaSauce:      { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0, glucides: 3, lipides: 0.2 },
  sauceaussoja:   { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0, glucides: 3, lipides: 0.2 },
  soja:           { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0, glucides: 3, lipides: 0.2 },
  mirin:          { prixKg: 8.00, calPer100g: 240,  lipSat: 0,    sucre: 47,   sel: 0.1,  fibres: 0,   prot: 0.2,  flv: 0, glucides: 56.8, lipides: 0.1 },
  "saké":         { prixKg: 10.0, calPer100g: 130,  lipSat: 0,    sucre: 1,    sel: 0,    fibres: 0,   prot: 0.5,  flv: 0 },
  sake:           { prixKg: 10.0, calPer100g: 130,  lipSat: 0,    sucre: 1,    sel: 0,    fibres: 0,   prot: 0.5,  flv: 0, glucides: 4.3, lipides: 0 },
  miso:           { prixKg: 12.0, calPer100g: 199,  lipSat: 1.0,  sucre: 6,    sel: 10,   fibres: 5.4, prot: 12,   flv: 30, glucides: 13, lipides: 6 },
  dashi:          { prixKg: 18.0, calPer100g: 15,   lipSat: 0,    sucre: 0,    sel: 2,    fibres: 0,   prot: 1,    flv: 0, glucides: 0.5, lipides: 0.1 },
  nuocmam:        { prixKg: 6.00, calPer100g: 35,   lipSat: 0,    sucre: 4,    sel: 18,   fibres: 0,   prot: 4,    flv: 0, glucides: 4, lipides: 0.5 },
  hoisin:         { prixKg: 7.00, calPer100g: 220,  lipSat: 0.5,  sucre: 35,   sel: 4,    fibres: 2.6, prot: 3.4,  flv: 0, glucides: 38.5, lipides: 2 },
  kecapManis:     { prixKg: 8.00, calPer100g: 260,  lipSat: 0,    sucre: 58,   sel: 5,    fibres: 0,   prot: 2,    flv: 0, glucides: 60, lipides: 0.2 },
  sambal:         { prixKg: 10.0, calPer100g: 70,   lipSat: 0.2,  sucre: 7,    sel: 2,    fibres: 2,   prot: 1.5,  flv: 50, glucides: 10, lipides: 1.5 },
  gochujang:      { prixKg: 10.0, calPer100g: 240,  lipSat: 0.5,  sucre: 35,   sel: 4,    fibres: 4,   prot: 4,    flv: 30, glucides: 38, lipides: 2 },
  doubanjiang:    { prixKg: 10.0, calPer100g: 150,  lipSat: 0.5,  sucre: 5,    sel: 8,    fibres: 5,   prot: 7,    flv: 30, glucides: 10, lipides: 3.5 },
  tahini:         { prixKg: 12.0, calPer100g: 595,  lipSat: 7,    sucre: 0,    sel: 0.1,  fibres: 9,   prot: 17,   flv: 100, glucides: 8, lipides: 54 },
  pesto:          { prixKg: 14.0, calPer100g: 450,  lipSat: 6.5,  sucre: 3,    sel: 2.2,  fibres: 2.5, prot: 6,    flv: 50, glucides: 6, lipides: 42 },
  mayonnaise:     { prixKg: 6.00, calPer100g: 680,  lipSat: 6,    sucre: 1.6,  sel: 1.4,  fibres: 0,   prot: 1.1,  flv: 0, glucides: 1.6, lipides: 75 },
  mayojaponaise:  { prixKg: 8.00, calPer100g: 700,  lipSat: 7,    sucre: 2,    sel: 1.5,  fibres: 0,   prot: 1.2,  flv: 0, glucides: 2, lipides: 78 },
  sauceokonomi:   { prixKg: 8.00, calPer100g: 150,  lipSat: 0.5,  sucre: 30,   sel: 3.5,  fibres: 1,   prot: 1,    flv: 0, glucides: 32, lipides: 3 },
  ketchup:        { prixKg: 4.00, calPer100g: 100,  lipSat: 0,    sucre: 23,   sel: 1.9,  fibres: 0.8, prot: 1.2,  flv: 100, glucides: 23, lipides: 0.5 },
  tabasco:        { prixKg: 30.0, calPer100g: 12,   lipSat: 0,    sucre: 0,    sel: 5,    fibres: 0,   prot: 1.3,  flv: 100, glucides: 0.5, lipides: 0.1 },
  bbqSauce:       { prixKg: 6.00, calPer100g: 175,  lipSat: 0,    sucre: 35,   sel: 2.5,  fibres: 1,   prot: 1,    flv: 50, glucides: 38, lipides: 0.5 },
  wasabi:         { prixKg: 30.0, calPer100g: 109,  lipSat: 0.1,  sucre: 7,    sel: 0.8,  fibres: 8,   prot: 5,    flv: 50, glucides: 8, lipides: 2 },
  tamarin:        { prixKg: 12.0, calPer100g: 240,  lipSat: 0.3,  sucre: 38,   sel: 0,    fibres: 5.1, prot: 2.8,  flv: 100, glucides: 40, lipides: 1.5 },
  chutney:        { prixKg: 7.00, calPer100g: 250,  lipSat: 0.5,  sucre: 50,   sel: 0.5,  fibres: 2,   prot: 1,    flv: 50, glucides: 52, lipides: 1 },
  confiture:      { prixKg: 5.00, calPer100g: 280,  lipSat: 0,    sucre: 67,   sel: 0,    fibres: 1,   prot: 0.4,  flv: 50, glucides: 68, lipides: 0.2 },
  sambar:         { prixKg: 8.00, calPer100g: 100,  lipSat: 0.5,  sucre: 2,    sel: 1,    fibres: 4,   prot: 5,    flv: 50, glucides: 6, lipides: 1.5 },
  sauce:          { prixKg: 6.00, calPer100g: 150,  lipSat: 2,    sucre: 8,    sel: 1.5,  fibres: 1,   prot: 2,    flv: 30, glucides: 10, lipides: 4 },
  crema:          { prixKg: 4.50, calPer100g: 195,  lipSat: 12,   sucre: 3,    sel: 0.1,  fibres: 0,   prot: 2.5,  flv: 0, glucides: 3, lipides: 18 },
  bechamel:       { prixKg: 4.00, calPer100g: 130,  lipSat: 3,    sucre: 5,    sel: 0.5,  fibres: 0,   prot: 4,    flv: 0, glucides: 6, lipides: 5 },
  ragu:           { prixKg: 6.00, calPer100g: 130,  lipSat: 2,    sucre: 4,    sel: 1,    fibres: 1.5, prot: 8,    flv: 30, glucides: 6, lipides: 4 },
  rouille:        { prixKg: 8.00, calPer100g: 350,  lipSat: 5,    sucre: 1,    sel: 1,    fibres: 1,   prot: 3,    flv: 30, glucides: 4, lipides: 30 },
  coulis:         { prixKg: 5.00, calPer100g: 60,   lipSat: 0,    sucre: 10,   sel: 0.1,  fibres: 1,   prot: 1,    flv: 100, glucides: 11, lipides: 0.2 },
  
  // ===== VINS & ALCOOLS =====
  vin:            { prixKg: 8.00, calPer100g: 85,   lipSat: 0,    sucre: 0.6,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 0.6, lipides: 0 },
  vinblanc:       { prixKg: 8.00, calPer100g: 82,   lipSat: 0,    sucre: 0.6,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 0.6, lipides: 0 },
  vinrouge:       { prixKg: 8.00, calPer100g: 85,   lipSat: 0,    sucre: 0.6,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 0.6, lipides: 0 },
  vinRiz:         { prixKg: 4.00, calPer100g: 130,  lipSat: 0,    sucre: 2,    sel: 0,    fibres: 0,   prot: 0.3,  flv: 0, glucides: 2, lipides: 0 },
  marsala:        { prixKg: 12.0, calPer100g: 150,  lipSat: 0,    sucre: 9,    sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 9, lipides: 0 },
  champagne:      { prixKg: 30.0, calPer100g: 76,   lipSat: 0,    sucre: 1.4,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 1.4, lipides: 0 },
  prosecco:       { prixKg: 12.0, calPer100g: 80,   lipSat: 0,    sucre: 1.4,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 1.4, lipides: 0 },
  cidre:          { prixKg: 4.00, calPer100g: 49,   lipSat: 0,    sucre: 2.6,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 2.6, lipides: 0 },
  bierebrune:     { prixKg: 4.50, calPer100g: 50,   lipSat: 0,    sucre: 1,    sel: 0,    fibres: 0,   prot: 0.6,  flv: 0, glucides: 3.2, lipides: 0 },
  rhum:           { prixKg: 25.0, calPer100g: 231,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  vodka:          { prixKg: 22.0, calPer100g: 231,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  tequila:        { prixKg: 28.0, calPer100g: 231,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  cognac:         { prixKg: 50.0, calPer100g: 240,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  bourbon:        { prixKg: 35.0, calPer100g: 240,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  brandy:         { prixKg: 30.0, calPer100g: 240,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  kirsch:         { prixKg: 30.0, calPer100g: 240,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  gin:            { prixKg: 28.0, calPer100g: 263,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  cointreau:      { prixKg: 35.0, calPer100g: 330,  lipSat: 0,    sucre: 24,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 24, lipides: 0 },
  tripleSec:      { prixKg: 22.0, calPer100g: 250,  lipSat: 0,    sucre: 20,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 20, lipides: 0 },
  curacao:        { prixKg: 18.0, calPer100g: 240,  lipSat: 0,    sucre: 24,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 24, lipides: 0 },
  aperol:         { prixKg: 15.0, calPer100g: 120,  lipSat: 0,    sucre: 22,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 22, lipides: 0 },
  campari:        { prixKg: 22.0, calPer100g: 240,  lipSat: 0,    sucre: 23,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 23, lipides: 0 },
  vermouth:       { prixKg: 12.0, calPer100g: 158,  lipSat: 0,    sucre: 16,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 16, lipides: 0 },
  passoa:         { prixKg: 22.0, calPer100g: 250,  lipSat: 0,    sucre: 32,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 32, lipides: 0 },
  amaretto:       { prixKg: 25.0, calPer100g: 310,  lipSat: 0,    sucre: 35,   sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 35, lipides: 0 },
  kahluaC:        { prixKg: 25.0, calPer100g: 340,  lipSat: 0,    sucre: 35,   sel: 0,    fibres: 0,   prot: 0.2,  flv: 0, glucides: 35, lipides: 0 },
  bitters:        { prixKg: 30.0, calPer100g: 240,  lipSat: 0,    sucre: 5,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 5, lipides: 0 },
  grenadine:      { prixKg: 5.00, calPer100g: 250,  lipSat: 0,    sucre: 60,   sel: 0,    fibres: 0,   prot: 0,    flv: 30, glucides: 60, lipides: 0 },
  limonade:       { prixKg: 1.50, calPer100g: 38,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 9, lipides: 0 },
  tonic:          { prixKg: 2.00, calPer100g: 34,   lipSat: 0,    sucre: 8,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 8, lipides: 0 },
  gingerBeer:     { prixKg: 3.00, calPer100g: 38,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 9, lipides: 0 },
  sureau:         { prixKg: 12.0, calPer100g: 90,   lipSat: 0,    sucre: 18,   sel: 0,    fibres: 0,   prot: 0,    flv: 50, glucides: 18, lipides: 0 },
  cafe:           { prixKg: 25.0, calPer100g: 2,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 0, lipides: 0.2 },
  espresso:       { prixKg: 25.0, calPer100g: 2,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 0, lipides: 0.2 },
  matcha:         { prixKg: 80.0, calPer100g: 280,  lipSat: 1,    sucre: 5,    sel: 0,    fibres: 38,  prot: 30,   flv: 0, glucides: 5, lipides: 4.5 },
  
  // ===== OLÉAGINEUX & GRAINES =====
  amande:         { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100, glucides: 21.5, lipides: 50 },
  amandes:        { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100, glucides: 21.2, lipides: 49.9 },
  poudreamande:   { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100, glucides: 20.8, lipides: 49.2 },
  poudreAmande:   { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100, glucides: 20.8, lipides: 49.2 },
  poudreamandes:  { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100, glucides: 20.8, lipides: 49.2 },
  noix:           { prixKg: 18.0, calPer100g: 654,  lipSat: 6.1,  sucre: 2.6,  sel: 0,    fibres: 6.7, prot: 15,   flv: 100, glucides: 7, lipides: 65.2 },
  noisettes:      { prixKg: 16.0, calPer100g: 628,  lipSat: 4.5,  sucre: 4.3,  sel: 0,    fibres: 9.7, prot: 15,   flv: 100, glucides: 16.9, lipides: 60.8 },
  pignons:        { prixKg: 40.0, calPer100g: 673,  lipSat: 4.9,  sucre: 3.6,  sel: 0,    fibres: 3.7, prot: 14,   flv: 100, glucides: 13.1, lipides: 68.4 },
  pistaches:      { prixKg: 22.0, calPer100g: 562,  lipSat: 5.4,  sucre: 7.7,  sel: 0,    fibres: 10.6,prot: 20,   flv: 100, glucides: 27.3, lipides: 45.8 },
  cacahuetes:     { prixKg: 8.00, calPer100g: 567,  lipSat: 6.3,  sucre: 4.7,  sel: 0,    fibres: 8.5, prot: 26,   flv: 100, glucides: 16.1, lipides: 49.2 },
  cacahetes:      { prixKg: 8.00, calPer100g: 567,  lipSat: 6.3,  sucre: 4.7,  sel: 0,    fibres: 8.5, prot: 26,   flv: 100, glucides: 16.1, lipides: 49.2 },
  arachide:       { prixKg: 8.00, calPer100g: 567,  lipSat: 6.3,  sucre: 4.7,  sel: 0,    fibres: 8.5, prot: 26,   flv: 100, glucides: 16.1, lipides: 49.2 },
  "cacahuetespurée":{prixKg:10.0, calPer100g: 597,  lipSat: 6.0,  sucre: 5.5,  sel: 0.5,  fibres: 8,   prot: 23,   flv: 100 },
  piniots:        { prixKg: 40.0, calPer100g: 673,  lipSat: 4.9,  sucre: 3.6,  sel: 0,    fibres: 3.7, prot: 14,   flv: 100, glucides: 13.1, lipides: 68.4 },
  granola:        { prixKg: 8.00, calPer100g: 471,  lipSat: 3.5,  sucre: 16,   sel: 0.1,  fibres: 7,   prot: 11,   flv: 50, glucides: 56, lipides: 17.5 },
  grainepain:     { prixKg: 12.0, calPer100g: 530,  lipSat: 4,    sucre: 5,    sel: 0,    fibres: 10,  prot: 18,   flv: 100, glucides: 47, lipides: 42 },
  graines:        { prixKg: 10.0, calPer100g: 530,  lipSat: 4,    sucre: 5,    sel: 0,    fibres: 10,  prot: 18,   flv: 100, glucides: 47, lipides: 42 },
  chia:           { prixKg: 15.0, calPer100g: 486,  lipSat: 3.3,  sucre: 0,    sel: 0.04, fibres: 34,  prot: 17,   flv: 100, glucides: 28, lipides: 30.7 },
  sesame:         { prixKg: 10.0, calPer100g: 573,  lipSat: 7.0,  sucre: 0.3,  sel: 0,    fibres: 12,  prot: 18,   flv: 100, glucides: 26.7, lipides: 50 },
  grainesCourge:  { prixKg: 12.0, calPer100g: 559,  lipSat: 8.7,  sucre: 1.4,  sel: 0.02, fibres: 6,   prot: 30,   flv: 100, glucides: 11.6, lipides: 45.6 },

  // ===== AUTRES =====
  tofu:           { prixKg: 6.00, calPer100g: 76,   lipSat: 0.7,  sucre: 0.7,  sel: 0,    fibres: 0.3, prot: 8.1,  flv: 100, glucides: 1.6, lipides: 4.8 },
  tofusoie:       { prixKg: 7.00, calPer100g: 55,   lipSat: 0.4,  sucre: 0.7,  sel: 0,    fibres: 0.2, prot: 5,    flv: 100, glucides: 1.1, lipides: 3.2 },
  tempeh:         { prixKg: 8.00, calPer100g: 192,  lipSat: 2.2,  sucre: 0,    sel: 0,    fibres: 0,   prot: 19,   flv: 100, glucides: 7.5, lipides: 11 },
  seitan:         { prixKg: 10.0, calPer100g: 130,  lipSat: 0.4,  sucre: 2,    sel: 0.4,  fibres: 0.6, prot: 24,   flv: 0, glucides: 25, lipides: 2.6 },
  proteine:       { prixKg: 25.0, calPer100g: 380,  lipSat: 1,    sucre: 3,    sel: 0.5,  fibres: 2,   prot: 80,   flv: 0, glucides: 5, lipides: 5 },
  levure:         { prixKg: 10.0, calPer100g: 105,  lipSat: 0.1,  sucre: 0,    sel: 0.05, fibres: 0,   prot: 12,   flv: 0, glucides: 5, lipides: 0.7 },
  levurechimique: { prixKg: 12.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 25,   fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 0 },
  levureboulanger:{ prixKg: 10.0, calPer100g: 105,  lipSat: 0.1,  sucre: 0,    sel: 0.05, fibres: 0,   prot: 12,   flv: 0, glucides: 5, lipides: 0.7 },
  maizena:        { prixKg: 3.00, calPer100g: 343,  lipSat: 0.04, sucre: 0.1,  sel: 0,    fibres: 0,   prot: 0.3,  flv: 0, glucides: 85.2, lipides: 0.1 },
  fecule:         { prixKg: 3.00, calPer100g: 343,  lipSat: 0.04, sucre: 0.1,  sel: 0,    fibres: 0,   prot: 0.3,  flv: 0, glucides: 85.2, lipides: 0.1 },
  biscuits:       { prixKg: 8.00, calPer100g: 480,  lipSat: 8,    sucre: 30,   sel: 0.6,  fibres: 2,   prot: 7,    flv: 0, glucides: 57, lipides: 20 },
  biscuitscuillere:{ prixKg: 10.0, calPer100g: 393,  lipSat: 1.5,  sucre: 35,   sel: 0.3,  fibres: 1,   prot: 8,    flv: 0, glucides: 47, lipides: 6 },
  muffins:        { prixKg: 8.00, calPer100g: 380,  lipSat: 5,    sucre: 25,   sel: 0.5,  fibres: 2,   prot: 6,    flv: 0, glucides: 59, lipides: 11 },
  crepesP:        { prixKg: 5.00, calPer100g: 220,  lipSat: 3,    sucre: 5,    sel: 0.3,  fibres: 1.5, prot: 6,    flv: 0, glucides: 36, lipides: 8 },
  palmier:        { prixKg: 6.00, calPer100g: 450,  lipSat: 12,   sucre: 25,   sel: 0.5,  fibres: 2,   prot: 6,    flv: 0, glucides: 51, lipides: 23 },
  kaya:           { prixKg: 8.00, calPer100g: 290,  lipSat: 5,    sucre: 50,   sel: 0.2,  fibres: 1,   prot: 3,    flv: 0, glucides: 57, lipides: 11 },
  painepicesmoutarde:{ prixKg:8.0, calPer100g: 320,  lipSat: 1.5,  sucre: 40,   sel: 0.8,  fibres: 2.5, prot: 5,    flv: 0, glucides: 65, lipides: 3.5 },
  // === v257 — Pâtisserie / Muffins ===
  chocolatBlanc:  { prixKg: 16.0, calPer100g: 539,  lipSat: 22,   sucre: 59,   sel: 0.16, fibres: 0,   prot: 5.9,  flv: 0, glucides: 59, lipides: 30 },
  chocolatLait:   { prixKg: 14.0, calPer100g: 535,  lipSat: 17,   sucre: 52,   sel: 0.24, fibres: 3.4, prot: 7.7,  flv: 10, glucides: 56, lipides: 26 },
  pepitesChoco:   { prixKg: 18.0, calPer100g: 530,  lipSat: 18,   sucre: 50,   sel: 0.08, fibres: 5,   prot: 5.5,  flv: 15, glucides: 56, lipides: 27 },
  cannelle:       { prixKg: 30.0, calPer100g: 247,  lipSat: 0.1,  sucre: 2.2,  sel: 0.03, fibres: 53,  prot: 4,    flv: 50, glucides: 28, lipides: 1.2 },
  pavot:          { prixKg: 18.0, calPer100g: 525,  lipSat: 4,    sucre: 3,    sel: 0,    fibres: 19,  prot: 18,   flv: 10, glucides: 10, lipides: 50 },
  noix:           { prixKg: 14.0, calPer100g: 654,  lipSat: 6.1,  sucre: 2.6,  sel: 0,    fibres: 6.7, prot: 15.2, flv: 30, glucides: 7, lipides: 65.2 },
  amandes:        { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12,  prot: 21,   flv: 30, glucides: 21.2, lipides: 49.9 },
  huileTournesol: { prixKg: 2.50, calPer100g: 884,  lipSat: 11,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 0, lipides: 100 },
  vanilleExtrait: { prixKg: 80.0, calPer100g: 288,  lipSat: 0,    sucre: 13,   sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 13, lipides: 0.5 },
  streusel:       { prixKg: 6.00, calPer100g: 480,  lipSat: 14,   sucre: 30,   sel: 0.2,  fibres: 1.5, prot: 5,    flv: 0, glucides: 63, lipides: 22 },
  caramelSale:    { prixKg: 12.0, calPer100g: 400,  lipSat: 8,    sucre: 65,   sel: 1.5,  fibres: 0,   prot: 2,    flv: 0, glucides: 65, lipides: 12 },
  // === v257 — Marques de bonbons (muffins extras) ===
  kinderBueno:    { prixUnite: 0.60, cal: 117,       lipSat: 4.6,  sucre: 6.4,  sel: 0.05, fibres: 0.5, prot: 1.4,  flv: 0, glucides: 11, lipides: 7.5 },
  mars:           { prixUnite: 0.80, cal: 230,       lipSat: 4.4,  sucre: 31,   sel: 0.20, fibres: 1.1, prot: 2.0,  flv: 0, glucides: 45, lipides: 8 },
  kitkat:         { prixUnite: 0.50, cal: 105,       lipSat: 3.3,  sucre: 11,   sel: 0.05, fibres: 0.4, prot: 1.2,  flv: 0, glucides: 19, lipides: 5.5 },
  raffaello:      { prixUnite: 0.45, cal: 65,        lipSat: 4.3,  sucre: 3.5,  sel: 0.03, fibres: 0.5, prot: 0.9,  flv: 30, glucides: 6, lipides: 6.5 },
  snickers:       { prixUnite: 1.00, cal: 245,       lipSat: 4.5,  sucre: 25,   sel: 0.20, fibres: 1.4, prot: 4.0,  flv: 0, glucides: 40, lipides: 8 },
  oreo:           { prixUnite: 0.20, cal: 53,        lipSat: 1.0,  sucre: 4.3,  sel: 0.10, fibres: 0.3, prot: 0.5,  flv: 0, glucides: 8, lipides: 2 },
  // === v257 — Asie / Pad Thaï ===
  nouillesRiz:    { prixKg: 4.50, calPer100g: 358,  lipSat: 0.1,  sucre: 0.5,  sel: 0.03, fibres: 1.8, prot: 6,    flv: 0, glucides: 81, lipides: 0.5 },
  saucePoisson:   { prixKg: 6.00, calPer100g: 60,   lipSat: 0,    sucre: 4,    sel: 25,   fibres: 0,   prot: 8,    flv: 0, glucides: 4, lipides: 0.2 },
  pousses_soja:   { prixKg: 4.00, calPer100g: 30,   lipSat: 0,    sucre: 2.2,  sel: 0.01, fibres: 1.8, prot: 3,    flv: 100, glucides: 4, lipides: 0.3 },
  pateCurryVert:  { prixKg: 18.0, calPer100g: 120,  lipSat: 2,    sucre: 5,    sel: 5,    fibres: 4,   prot: 4,    flv: 80, glucides: 11, lipides: 6 },
  basilic_thai:   { prixKg: 30.0, calPer100g: 23,   lipSat: 0,    sucre: 0.3,  sel: 0.01, fibres: 1.6, prot: 3,    flv: 100, glucides: 1, lipides: 0.5 },
  pousseBambou:   { prixKg: 6.00, calPer100g: 27,   lipSat: 0,    sucre: 3,    sel: 0,    fibres: 2.2, prot: 2.6,  flv: 100, glucides: 5, lipides: 0.2 },
  // === v257 — Autres ===
  reblochon:      { prixKg: 18.0, calPer100g: 330,  lipSat: 18,   sucre: 0,    sel: 1.5,  fibres: 0,   prot: 22,   flv: 0, glucides: 0, lipides: 26 },
  biscuits:       { prixKg: 5.00, calPer100g: 480,  lipSat: 9,    sucre: 28,   sel: 0.4,  fibres: 2,   prot: 6,    flv: 0, glucides: 57, lipides: 20 },
  epaulePorc:     { prixKg: 9.00, calPer100g: 240,  lipSat: 6,    sucre: 0,    sel: 0.1,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 15 },
  sauceBBQ:       { prixKg: 5.00, calPer100g: 170,  lipSat: 0.2,  sucre: 34,   sel: 2.6,  fibres: 1,   prot: 1,    flv: 0, glucides: 35, lipides: 0.5 },
  saumonFrais:    { prixKg: 22.0, calPer100g: 208,  lipSat: 3,    sucre: 0,    sel: 0.1,  fibres: 0,   prot: 20,   flv: 0, glucides: 0, lipides: 13 },
  ciboulette:     { prixKg: 25.0, calPer100g: 30,   lipSat: 0,    sucre: 1.9,  sel: 0.01, fibres: 2.5, prot: 3.3,  flv: 100, glucides: 7, lipides: 0.1 },
  cremeChantilly: { prixKg: 6.00, calPer100g: 330,  lipSat: 22,   sucre: 12,   sel: 0.05, fibres: 0,   prot: 2.3,  flv: 0, glucides: 12, lipides: 30 },
  agneau:         { prixKg: 16.0, calPer100g: 250,  lipSat: 7,    sucre: 0,    sel: 0.1,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 12 },
  merguez:        { prixKg: 11.0, calPer100g: 320,  lipSat: 9,    sucre: 0.5,  sel: 1.8,  fibres: 0,   prot: 14,   flv: 0, glucides: 1.5, lipides: 21 },
  butternut:      { prixKg: 1.80, calPer100g: 45,   lipSat: 0,    sucre: 4.0,  sel: 0,    fibres: 2,   prot: 1,    flv: 100, glucides: 7, lipides: 0.2 },
  rizArborio:     { prixKg: 4.50, calPer100g: 370,  lipSat: 0.2,  sucre: 0,    sel: 0,    fibres: 1.4, prot: 7,    flv: 0, glucides: 80, lipides: 0.5 },
  vinBlanc:       { prixKg: 6.00, calPer100g: 82,   lipSat: 0,    sucre: 1.3,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0, glucides: 1.3, lipides: 0 },
  champignons:    { prixKg: 7.00, calPer100g: 22,   lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 1,   prot: 3.1,  flv: 100, glucides: 2.5, lipides: 0.3 },
  boullionLeg:    { prixKg: 12.0, calPer100g: 7,    lipSat: 0,    sucre: 0.5,  sel: 6,    fibres: 0,   prot: 0.5,  flv: 0, glucides: 1, lipides: 0.1 },
  // === v257.2 — Ingrédients pour nouvelles recettes ===
  cabillaud:      { prixKg: 22.0, calPer100g: 82,   lipSat: 0.2,  sucre: 0,    sel: 0.1,  fibres: 0,   prot: 18,   flv: 0, glucides: 0, lipides: 0.7 },
  magret:         { prixKg: 26.0, calPer100g: 200,  lipSat: 4,    sucre: 0,    sel: 0.1,  fibres: 0,   prot: 18,   flv: 0, glucides: 0, lipides: 11 },
  // === v259.32 — Ingrédients des recettes du monde (Pologne, Tibet, Haïti, Nigeria, Caraïbes, Pérou, Colombie, Polynésie, Hawaii, Singapour, Belgique) ===
  boeufOuPoulet:    { prixKg: 15.0, calPer100g: 200,  lipSat: 4,    sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0, glucides: 0, lipides: 8 },
  saucisseFumee:    { prixKg: 10.0, calPer100g: 300,  lipSat: 10,   sucre: 1,    sel: 2,    fibres: 0,   prot: 15,   flv: 0, glucides: 1, lipides: 20 },
  poitrine:         { prixKg: 9.00, calPer100g: 290,  lipSat: 13,   sucre: 0,    sel: 0.4,  fibres: 0,   prot: 14,   flv: 0, glucides: 0, lipides: 20 },
  choucroute:       { prixKg: 3.00, calPer100g: 20,   lipSat: 0,    sucre: 1,    sel: 0.8,  fibres: 3,   prot: 1.5,  flv: 100, glucides: 3, lipides: 0.3 },
  chouFrais:        { prixKg: 1.50, calPer100g: 25,   lipSat: 0,    sucre: 3.8,  sel: 0,    fibres: 2.5, prot: 1.3,  flv: 100, glucides: 3.8, lipides: 0.2 },
  giraumon:         { prixKg: 2.00, calPer100g: 26,   lipSat: 0,    sucre: 3,    sel: 0,    fibres: 2,   prot: 1,    flv: 100, glucides: 5.2, lipides: 0.1 },
  legumes:          { prixKg: 2.50, calPer100g: 45,   lipSat: 0.1,  sucre: 4,    sel: 0.05, fibres: 3,   prot: 2,    flv: 100, glucides: 6.5, lipides: 0.3 },
  pommesDeTerre:    { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100, glucides: 16.3, lipides: 0.1 },
  pommeDeTerre:     { prixUnite: 0.20, cal: 115,       lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100, glucides: 26.1, lipides: 0.1 },
  frites:           { prixKg: 2.50, calPer100g: 150,  lipSat: 1.5,  sucre: 0.5,  sel: 0.4,  fibres: 3.5, prot: 2.5,  flv: 0, glucides: 17.3, lipides: 3.4 },
  farineMais:       { prixKg: 2.50, calPer100g: 361,  lipSat: 0.2,  sucre: 0.6,  sel: 0,    fibres: 7,   prot: 7,    flv: 0, glucides: 72.2, lipides: 1.3 },
  haricotsRouges:   { prixKg: 3.00, calPer100g: 127,  lipSat: 0.1,  sucre: 0.3,  sel: 0.01, fibres: 7.4, prot: 8.7,  flv: 100, glucides: 18.6, lipides: 0.5 },
  crevettesSechees: { prixKg: 30.0, calPer100g: 290,  lipSat: 1,    sucre: 0,    sel: 3,    fibres: 0,   prot: 62,   flv: 0, glucides: 0, lipides: 3.2 },
  djondjon:         { prixKg: 60.0, calPer100g: 280,  lipSat: 0.3,  sucre: 2,    sel: 0.05, fibres: 25,  prot: 20,   flv: 100, glucides: 18.5, lipides: 1.2 },
  grainesEgusi:     { prixKg: 12.0, calPer100g: 590,  lipSat: 8,    sucre: 1,    sel: 0,    fibres: 4,   prot: 28,   flv: 0, glucides: 20.3, lipides: 50.2 },
  germes:           { prixKg: 4.00, calPer100g: 30,   lipSat: 0,    sucre: 2,    sel: 0.01, fibres: 1.8, prot: 3,    flv: 100, glucides: 5.2, lipides: 0.5 },
  gravy:            { prixKg: 3.00, calPer100g: 50,   lipSat: 1,    sucre: 1,    sel: 1,    fibres: 0,   prot: 1,    flv: 0, glucides: 6.5, lipides: 2.4 },
  sucrePerle:       { prixKg: 4.00, calPer100g: 400,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0, glucides: 100, lipides: 0 },
  jauneOeuf:        { prixUnite: 0.15, cal: 55,        lipSat: 4,    sucre: 0.6,  sel: 0.1,  fibres: 0,   prot: 2.7,  flv: 0, glucides: 0.6, lipides: 8.9 },
  painDeMie:        { prixUnite: 0.10, cal: 70,        lipSat: 0.5,  sucre: 3,    sel: 0.5,  fibres: 1.5, prot: 2.5,  flv: 0, glucides: 11.8, lipides: 1.5 },
  plantain:         { prixUnite: 0.50, cal: 220,       lipSat: 0.1,  sucre: 17,   sel: 0,    fibres: 4,   prot: 2,    flv: 100, glucides: 28.2, lipides: 0.5 },
  poireau:          { prixUnite: 0.60, cal: 30,        lipSat: 0,    sucre: 2.3,  sel: 0,    fibres: 2.5, prot: 1.5,  flv: 100, glucides: 5.2, lipides: 0.2 },
  // === v259.37 — Ingrédients tour du monde 2 (Hongrie, Géorgie, Antilles, Vietnam, Sénégal, Brésil, Russie, Cuba, Allemagne, Angleterre, Turquie, Éthiopie, Suède) ===
  escalope:         { prixKg: 14.0, calPer100g: 170,  lipSat: 3,    sucre: 0,    sel: 0.15, fibres: 0,   prot: 22,   flv: 0, glucides: 0, lipides: 6.8 },
  farineTeff:       { prixKg: 8.00, calPer100g: 366,  lipSat: 0.5,  sucre: 1.8,  sel: 0.01, fibres: 8,   prot: 13,   flv: 0, glucides: 67.1, lipides: 2.2 },
  galettederiz:     { prixUnite: 0.08, cal: 30,        lipSat: 0,    sucre: 0.5,  sel: 0.05, fibres: 0.4, prot: 0.5,  flv: 0, glucides: 26.5, lipides: 0.2 },
  haricotsNoirs:    { prixKg: 3.00, calPer100g: 130,  lipSat: 0.1,  sucre: 0.3,  sel: 0.01, fibres: 8.7, prot: 8.9,  flv: 100, glucides: 18.9, lipides: 0.5 },
  laitConcentre:    { prixKg: 5.00, calPer100g: 330,  lipSat: 5,    sucre: 54,   sel: 0.3,  fibres: 0,   prot: 8,    flv: 0, glucides: 54, lipides: 8.5 },
  painEpices:       { prixKg: 8.00, calPer100g: 350,  lipSat: 1,    sucre: 40,   sel: 0.5,  fibres: 3,   prot: 5,    flv: 0, glucides: 68.2, lipides: 2.8 },
  painPita:         { prixUnite: 0.30, cal: 165,       lipSat: 0.4,  sucre: 2,    sel: 1,    fibres: 2.2, prot: 5.5,  flv: 0, glucides: 31.4, lipides: 1.2 },
  pateFilo:         { prixKg: 5.00, calPer100g: 290,  lipSat: 1,    sucre: 1,    sel: 0.6,  fibres: 2.5, prot: 8,    flv: 0, glucides: 55.6, lipides: 3 },
  petitsPois:       { prixKg: 2.50, calPer100g: 81,   lipSat: 0.1,  sucre: 5.7,  sel: 0.01, fibres: 5,   prot: 5.4,  flv: 100, glucides: 10.2, lipides: 0.4 },
  semoulemil:       { prixKg: 4.00, calPer100g: 360,  lipSat: 0.6,  sucre: 1,    sel: 0,    fibres: 3.5, prot: 10,   flv: 0, glucides: 71.5, lipides: 1.8 },
  tapioca:          { prixKg: 4.00, calPer100g: 350,  lipSat: 0,    sucre: 0.4,  sel: 0,    fibres: 0.9, prot: 0.2,  flv: 0, glucides: 85.1, lipides: 0.2 },
  sauceSoja:     { prixKg:4,calPer100g:60,lipSat:0,sucre:4,sel:18,fibres:0,prot:8,flv:20, glucides: 4, lipides: 0.3 },
  cacahuete:     { prixKg:6,calPer100g:567,lipSat:7,sucre:4,sel:0,fibres:8.5,prot:26,flv:10, glucides: 16.8, lipides: 49.2 },
  garam:         { prixKg:25,calPer100g:379,lipSat:2,sucre:2,sel:0,fibres:25,prot:14,flv:60, glucides: 30.8, lipides: 3.2 },
  tortillamais:  { prixKg:4,calPer100g:220,lipSat:0.5,sucre:1,sel:0.5,fibres:6,prot:6,flv:0, glucides: 39, lipides: 2.1 },
  papaye:        { prixUnite:2,cal:43,lipSat:0,sucre:8,sel:0,fibres:1.7,prot:0.5,flv:60, glucides: 9.8, lipides: 0.3 },
  lentillescorail: { prixKg:3.5,calPer100g:120,lipSat:0.1,sucre:2,sel:0,fibres:8,prot:9,flv:30, glucides: 17.2, lipides: 0.4 },
  haricotsBlancs: { prixKg:2.5,calPer100g:139,lipSat:0.1,sucre:0.3,sel:0,fibres:8,prot:9.7,flv:30, glucides: 23.9, lipides: 0.5 },
  // ===== Complétés via audit qualité (prix/nutrition manquants) =====
  clougirofle: { prixKg: 22, calPer100g: 274, lipSat: 13, sucre: 2, sel: 0.27, fibres: 27.3, prot: 6, flv: 0, glucides: 30.7, lipides: 20.8 },
  juscitron: { prixKg: 2.5, calPer100g: 29, lipSat: 0.1, sucre: 2.5, sel: 0.02, fibres: 0.6, prot: 0.4, flv: 100, glucides: 6.6, lipides: 0.3 },
  painbaguette: { prixUnite: 1.2, cal: 270, lipSat: 0.3, sucre: 0.6, sel: 1.5, fibres: 1.6, prot: 8, flv: 0, glucides: 49.6, lipides: 1.4 },
  jamboncru: { prixKg: 28, calPer100g: 254, lipSat: 8.5, sucre: 0, sel: 2.5, fibres: 0, prot: 29, flv: 0, glucides: 0, lipides: 17 },
  olivemixte: { prixKg: 8.5, calPer100g: 145, lipSat: 3.8, sucre: 0.4, sel: 3.3, fibres: 1.6, prot: 1, flv: 100, glucides: 2.2, lipides: 13.8 },
  tomateseche: { prixKg: 18, calPer100g: 258, lipSat: 2.8, sucre: 11, sel: 2.4, fibres: 7.6, prot: 14, flv: 100, glucides: 40, lipides: 8.6 },
  artichautmarine: { prixKg: 6.5, calPer100g: 45, lipSat: 0.1, sucre: 0.7, sel: 1.2, fibres: 2.1, prot: 2.7, flv: 100, glucides: 7.5, lipides: 0.3 },
  eaupetillante: { prixKg: 1.2, calPer100g: 0, lipSat: 0, sucre: 0, sel: 0.1, fibres: 0, prot: 0, flv: 0, glucides: 0, lipides: 0 },
  sauceaigredouce: { prixKg: 5.5, calPer100g: 220, lipSat: 0.2, sucre: 35, sel: 1.5, fibres: 0.5, prot: 0.3, flv: 0, glucides: 39.4, lipides: 0.8 },
  saucetomate: { prixKg: 3, calPer100g: 32, lipSat: 0.2, sucre: 3.5, sel: 1, fibres: 1, prot: 1.3, flv: 100, glucides: 6, lipides: 0.5 },
  galettelumpia: { prixUnite: 0.35, cal: 145, lipSat: 0.3, sucre: 0.1, sel: 0.6, fibres: 0.4, prot: 2.1, flv: 0, glucides: 29.6, lipides: 0.9 },
  patemandu: { prixKg: 12, calPer100g: 298, lipSat: 6.5, sucre: 2.5, sel: 1.8, fibres: 1.2, prot: 12, flv: 0, glucides: 60.2, lipides: 13 },
  fromagegrec: { prixKg: 22, calPer100g: 330, lipSat: 24, sucre: 3.2, sel: 2, fibres: 0, prot: 21, flv: 0, glucides: 3.2, lipides: 31 },
  melassegrenade: { prixKg: 12, calPer100g: 272, lipSat: 0.3, sucre: 55, sel: 0.2, fibres: 1.6, prot: 2.7, flv: 100, glucides: 56.8, lipides: 0.8 },
  chairsaucisse: { prixKg: 9.5, calPer100g: 290, lipSat: 21, sucre: 0, sel: 1.8, fibres: 0, prot: 27, flv: 0, glucides: 0, lipides: 22 },
  levureboulangere: { prixKg: 8, calPer100g: 389, lipSat: 1, sucre: 0, sel: 0, fibres: 0, prot: 42, flv: 0, glucides: 0, lipides: 2 },
  farinemais: { prixKg: 3.5, calPer100g: 361, lipSat: 1.3, sucre: 0.3, sel: 0.01, fibres: 2.7, prot: 8.6, flv: 0, glucides: 76.4, lipides: 3.8 },
  rizrond: { prixKg: 2.2, calPer100g: 365, lipSat: 0.3, sucre: 0.1, sel: 0.01, fibres: 0.4, prot: 6.6, flv: 0, glucides: 80.1, lipides: 0.8 },
  lentillesnoires: { prixKg: 6, calPer100g: 358, lipSat: 0.4, sucre: 2, sel: 0.02, fibres: 8.3, prot: 25, flv: 100, glucides: 52, lipides: 1.1 },
  the: { prixKg: 35, calPer100g: 2, lipSat: 0, sucre: 0, sel: 0.02, fibres: 0, prot: 0.2, flv: 0, glucides: 0, lipides: 0.1 },
  algue: { prixKg: 45, calPer100g: 35, lipSat: 0.6, sucre: 0, sel: 7.8, fibres: 1.3, prot: 5, flv: 100, glucides: 5.2, lipides: 2 },
  petitpois: { prixKg: 3.8, calPer100g: 81, lipSat: 0.4, sucre: 5.7, sel: 0.02, fibres: 2.8, prot: 5.4, flv: 100, glucides: 10, lipides: 0.8 },
  rhumambre: { prixKg: 28, calPer100g: 231, lipSat: 0, sucre: 0, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 0, lipides: 0 },
  jusorange: { prixKg: 3.2, calPer100g: 45, lipSat: 0.1, sucre: 9.3, sel: 0.01, fibres: 0.4, prot: 0.7, flv: 100, glucides: 10.5, lipides: 0.3 },
  jusananas: { prixKg: 3.8, calPer100g: 50, lipSat: 0.1, sucre: 11, sel: 0.01, fibres: 0.4, prot: 0.5, flv: 100, glucides: 11.4, lipides: 0.3 },
  sucrecanne: { prixKg: 2, calPer100g: 387, lipSat: 0, sucre: 99.8, sel: 0.02, fibres: 0, prot: 0, flv: 0, glucides: 99.8, lipides: 0 },
  girofle: { prixKg: 85, calPer100g: 274, lipSat: 13, sucre: 26, sel: 0.66, fibres: 20.7, prot: 6, flv: 100, glucides: 26, lipides: 20.8 },
  badiane: { prixKg: 95, calPer100g: 338, lipSat: 15.9, sucre: 15.9, sel: 0.19, fibres: 14.6, prot: 17.6, flv: 100, glucides: 35.8, lipides: 23 },
  cachaca: { prixKg: 32, calPer100g: 231, lipSat: 0, sucre: 0, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 0, lipides: 0 },
  siropsucre: { prixKg: 4.5, calPer100g: 260, lipSat: 0, sucre: 65, sel: 0.01, fibres: 0, prot: 0, flv: 0, glucides: 65, lipides: 0 },
  cola: { prixKg: 2.2, calPer100g: 42, lipSat: 0, sucre: 10.6, sel: 0.15, fibres: 0, prot: 0, flv: 0, glucides: 10.6, lipides: 0 },
  justomate: { prixKg: 1.8, calPer100g: 18, lipSat: 0.1, sucre: 3.2, sel: 0.5, fibres: 0.4, prot: 0.8, flv: 100, glucides: 3.6, lipides: 0.2 },
  worcestershire: { prixKg: 18, calPer100g: 84, lipSat: 0, sucre: 6.5, sel: 9.5, fibres: 0, prot: 4.3, flv: 0, glucides: 6.5, lipides: 0.1 },
  liqueurcafe: { prixKg: 42, calPer100g: 300, lipSat: 0, sucre: 32, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 32, lipides: 0 },
  juspamplemousse: { prixKg: 3.5, calPer100g: 39, lipSat: 0.1, sucre: 7.6, sel: 0.01, fibres: 0.2, prot: 0.6, flv: 100, glucides: 9.1, lipides: 0.2 },
  juscitronvert: { prixKg: 3.8, calPer100g: 29, lipSat: 0.2, sucre: 1.5, sel: 0.02, fibres: 0.6, prot: 0.4, flv: 100, glucides: 2.3, lipides: 0.3 },
  sodapamplemousse: { prixKg: 2.3, calPer100g: 38, lipSat: 0, sucre: 8.5, sel: 0.18, fibres: 0, prot: 0, flv: 0, glucides: 9.5, lipides: 0 },
  whiskey: { prixKg: 52, calPer100g: 250, lipSat: 0, sucre: 0, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 0, lipides: 0 },
  vermouthrouge: { prixKg: 35, calPer100g: 160, lipSat: 0, sucre: 8, sel: 0.1, fibres: 0, prot: 0.1, flv: 0, glucides: 8.3, lipides: 0 },
  angostura: { prixKg: 65, calPer100g: 215, lipSat: 0, sucre: 38, sel: 0.1, fibres: 0, prot: 0, flv: 0, glucides: 38.5, lipides: 0 },
  soda: { prixKg: 2.5, calPer100g: 39, lipSat: 0, sucre: 9, sel: 0.17, fibres: 0, prot: 0, flv: 0, glucides: 9.8, lipides: 0 },
  rhumblanc: { prixKg: 28, calPer100g: 231, lipSat: 0, sucre: 0.1, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 0.1, lipides: 0 },
  orgeat: { prixKg: 12, calPer100g: 65, lipSat: 0.1, sucre: 15.5, sel: 0.05, fibres: 0, prot: 0.2, flv: 100, glucides: 15.8, lipides: 0.2 },
  cremecassis: { prixKg: 9.5, calPer100g: 45, lipSat: 0, sucre: 10.2, sel: 0.1, fibres: 0.5, prot: 0.3, flv: 100, glucides: 10.5, lipides: 0 },
  biere: { prixKg: 2.8, calPer100g: 43, lipSat: 0, sucre: 0.3, sel: 0.02, fibres: 0, prot: 0.4, flv: 0, glucides: 3.8, lipides: 0 },
  jusdetomate: { prixKg: 1.5, calPer100g: 18, lipSat: 0.1, sucre: 3.2, sel: 0.3, fibres: 0.6, prot: 0.8, flv: 100, glucides: 3.9, lipides: 0.2 },
  saucepiquante: { prixKg: 8, calPer100g: 120, lipSat: 1.2, sucre: 8, sel: 2.5, fibres: 1.5, prot: 2, flv: 100, glucides: 9.2, lipides: 1.5 },
  selepice: { prixKg: 15, calPer100g: 380, lipSat: 15, sucre: 0.3, sel: 5, fibres: 2.5, prot: 6, flv: 0, glucides: 1.8, lipides: 16.5 },
  pisco: { prixKg: 35, calPer100g: 231, lipSat: 0, sucre: 0, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 0, lipides: 0 },
  gCreme: { prixKg: 6.5, calPer100g: 340, lipSat: 34, sucre: 2.8, sel: 0.05, fibres: 0, prot: 2.2, flv: 0, glucides: 2.9, lipides: 35 },
  amidon: { prixKg: 3.2, calPer100g: 381, lipSat: 0.1, sucre: 0, sel: 0, fibres: 0.9, prot: 0.3, flv: 0, glucides: 86.5, lipides: 0.2 },
  amandeeffilee: { prixKg: 18, calPer100g: 579, lipSat: 3.5, sucre: 4.4, sel: 0, fibres: 12.5, prot: 21.6, flv: 100, glucides: 9.8, lipides: 48 },
  cremefouettee: { prixKg: 6.8, calPer100g: 340, lipSat: 34, sucre: 3, sel: 0.06, fibres: 0, prot: 2.1, flv: 0, glucides: 3.2, lipides: 35 },
  cremedemarrons: { prixKg: 14, calPer100g: 290, lipSat: 18, sucre: 18.5, sel: 0.02, fibres: 3.2, prot: 2.8, flv: 100, glucides: 22, lipides: 19 },
  meringue: { prixKg: 16, calPer100g: 297, lipSat: 0.1, sucre: 72, sel: 0.2, fibres: 0, prot: 6, flv: 0, glucides: 74, lipides: 0.2 },
  marronglace: { prixKg: 28, calPer100g: 213, lipSat: 1.2, sucre: 45, sel: 0.02, fibres: 2.2, prot: 2.5, flv: 100, glucides: 48, lipides: 1.5 },
  grandmarnier: { prixKg: 42, calPer100g: 244, lipSat: 0, sucre: 12, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 12.5, lipides: 0 },
  sucreperle: { prixKg: 4.5, calPer100g: 387, lipSat: 0, sucre: 97, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 97, lipides: 0 },
  noisettepoudre: { prixKg: 24, calPer100g: 630, lipSat: 14.2, sucre: 4, sel: 0.02, fibres: 9.5, prot: 20.5, flv: 100, glucides: 10.8, lipides: 60 },
  praline: { prixKg: 32, calPer100g: 520, lipSat: 42, sucre: 42, sel: 0.15, fibres: 6.5, prot: 11, flv: 100, glucides: 48.5, lipides: 43 },
  anko: { prixKg: 6.5, calPer100g: 142, lipSat: 0.3, sucre: 32, sel: 0.1, fibres: 5.8, prot: 3.2, flv: 100, glucides: 35.5, lipides: 0.5 },
  laitpoudre: { prixKg: 8.5, calPer100g: 496, lipSat: 26.7, sucre: 38, sel: 0.72, fibres: 0, prot: 26.3, flv: 0, glucides: 40, lipides: 28 },
  kadayif: { prixKg: 9, calPer100g: 360, lipSat: 8, sucre: 1.2, sel: 0.12, fibres: 2.5, prot: 9.5, flv: 0, glucides: 54, lipides: 8.5 },
  fromagedoux: { prixKg: 12, calPer100g: 340, lipSat: 28, sucre: 2, sel: 1.8, fibres: 0, prot: 20, flv: 0, glucides: 2.5, lipides: 28.5 },
  cremeacide: { prixKg: 5.2, calPer100g: 200, lipSat: 20, sucre: 3, sel: 0.1, fibres: 0, prot: 3.5, flv: 0, glucides: 3.3, lipides: 20.5 },
  fleuroranger: { prixKg: 18, calPer100g: 320, lipSat: 0.2, sucre: 79, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 80, lipides: 0.3 },
  rizgluant: { prixKg: 4.5, calPer100g: 130, lipSat: 0.3, sucre: 0.1, sel: 0, fibres: 0.4, prot: 2.7, flv: 0, glucides: 28, lipides: 0.4 },
  painfeuillete: { prixKg: 8, calPer100g: 398, lipSat: 17, sucre: 0.5, sel: 1.2, fibres: 1.5, prot: 7.5, flv: 0, glucides: 48, lipides: 18 },
  jaunedoeuf: { prixKg: 32, calPer100g: 322, lipSat: 26.5, sucre: 1.1, sel: 1.3, fibres: 0, prot: 16, flv: 0, glucides: 1.1, lipides: 27 },
  noixcoco: { prixKg: 6.8, calPer100g: 354, lipSat: 33.5, sucre: 9, sel: 0.02, fibres: 9, prot: 3.3, flv: 100, glucides: 12, lipides: 35 },
  raisin: { prixKg: 3.5, calPer100g: 67, lipSat: 0.2, sucre: 15.5, sel: 0.03, fibres: 0.9, prot: 0.7, flv: 100, glucides: 16, lipides: 0.3 },
  chancaca: { prixKg: 7, calPer100g: 290, lipSat: 0.1, sucre: 72, sel: 0.5, fibres: 0, prot: 0.2, flv: 0, glucides: 72, lipides: 0.2 },
  macarons: { prixUnite: 2.8, cal: 76, lipSat: 2.1, sucre: 18, sel: 0.08, fibres: 0.5, prot: 1.5, flv: 0, glucides: 18.5, lipides: 2.5 },
  mayo: { prixKg: 5.5, calPer100g: 717, lipSat: 79, sucre: 0.1, sel: 0.95, fibres: 0, prot: 0.3, flv: 0, glucides: 0.5, lipides: 80 },
  foiegras: { prixKg: 45, calPer100g: 462, lipSat: 45, sucre: 1.5, sel: 1.2, fibres: 0, prot: 10, flv: 0, glucides: 2, lipides: 46 },
  painepices: { prixKg: 6.5, calPer100g: 281, lipSat: 3.5, sucre: 35, sel: 1.5, fibres: 2, prot: 5.5, flv: 0, glucides: 56, lipides: 4 },
  vinaigrette: { prixKg: 4.2, calPer100g: 680, lipSat: 72, sucre: 2, sel: 1.2, fibres: 0, prot: 0.5, flv: 0, glucides: 2.5, lipides: 73 },
  chevrefrais: { prixKg: 14, calPer100g: 98, lipSat: 5, sucre: 0.5, sel: 0.8, fibres: 0, prot: 11, flv: 0, glucides: 1.5, lipides: 5.5 },
  galetteriz: { prixKg: 5.8, calPer100g: 375, lipSat: 0.4, sucre: 0.3, sel: 2.5, fibres: 1.2, prot: 6, flv: 0, glucides: 82, lipides: 0.8 },
  saucecacahuete: { prixKg: 9.5, calPer100g: 588, lipSat: 48, sucre: 20, sel: 1, fibres: 6.5, prot: 25, flv: 100, glucides: 21, lipides: 50 },
  volaille: { prixKg: 8.5, calPer100g: 165, lipSat: 3.6, sucre: 0, sel: 0.07, fibres: 0, prot: 31, flv: 0, glucides: 0, lipides: 4.5 },
  lardgras: { prixKg: 12, calPer100g: 717, lipSat: 25, sucre: 0.5, sel: 1.5, fibres: 0, prot: 8, flv: 0, glucides: 1, lipides: 73 },
  porto: { prixKg: 15, calPer100g: 160, lipSat: 0, sucre: 7, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 7, lipides: 0 },
  gelee: { prixKg: 8, calPer100g: 61, lipSat: 0, sucre: 15, sel: 0.1, fibres: 0, prot: 6, flv: 0, glucides: 15, lipides: 0 },
  painseigle: { prixUnite: 4.5, cal: 263, lipSat: 1.2, sucre: 1.5, sel: 1.1, fibres: 7.5, prot: 8.5, flv: 0, glucides: 49, lipides: 1.8 },
  patepizza: { prixKg: 4.5, calPer100g: 280, lipSat: 0.8, sucre: 0.5, sel: 0.7, fibres: 1.8, prot: 8, flv: 0, glucides: 54, lipides: 1.5 },
  grenade: { prixKg: 3.5, calPer100g: 83, lipSat: 0.3, sucre: 16.5, sel: 0.05, fibres: 4, prot: 1.7, flv: 100, glucides: 17, lipides: 0.5 },
  fruitpassion: { prixKg: 6, calPer100g: 97, lipSat: 0.3, sucre: 23, sel: 0.03, fibres: 10.8, prot: 2.2, flv: 100, glucides: 24, lipides: 0.4 },
  fruitsconfits: { prixKg: 14, calPer100g: 341, lipSat: 0.3, sucre: 73, sel: 0.2, fibres: 4, prot: 1, flv: 100, glucides: 73, lipides: 0.5 },
  tomateconcassee: { prixKg: 2.8, calPer100g: 18, lipSat: 0.2, sucre: 2.6, sel: 0.3, fibres: 1.2, prot: 0.9, flv: 100, glucides: 3, lipides: 0.3 },
  saumoncru: { prixKg: 22, calPer100g: 206, lipSat: 13, sucre: 0, sel: 0.08, fibres: 0, prot: 22, flv: 0, glucides: 0, lipides: 13.5 },
  boulgour: { prixKg: 5.5, calPer100g: 342, lipSat: 1, sucre: 1.8, sel: 0.02, fibres: 8.3, prot: 12, flv: 100, glucides: 61, lipides: 1.5 },
  sodaamer: { prixKg: 1.8, calPer100g: 37, lipSat: 0, sucre: 9, sel: 0.1, fibres: 0, prot: 0, flv: 0, glucides: 9, lipides: 0 },
  thenoir: { prixKg: 28, calPer100g: 0, lipSat: 0, sucre: 0, sel: 0, fibres: 0, prot: 0, flv: 100, glucides: 0, lipides: 0 },
  siropagave: { prixKg: 12, calPer100g: 310, lipSat: 0, sucre: 76, sel: 0.01, fibres: 0.5, prot: 0.5, flv: 0, glucides: 76, lipides: 0 },
  hibiscusseche: { prixKg: 18, calPer100g: 49, lipSat: 0.8, sucre: 0.2, sel: 0.15, fibres: 14.7, prot: 3.9, flv: 100, glucides: 0.5, lipides: 1 },
  glacons: { prixUnite: 0.08, cal: 0, lipSat: 0, sucre: 0, sel: 0, fibres: 0, prot: 0, flv: 0, glucides: 0, lipides: 0 },
  pepperoni: { prixKg: 28, calPer100g: 504, lipSat: 20, sucre: 0.6, sel: 2.1, fibres: 0, prot: 41, flv: 0, glucides: 1, lipides: 41 },
  msemen: { prixUnite: 3.2, cal: 580, lipSat: 28, sucre: 1.5, sel: 0.8, fibres: 2.5, prot: 9, flv: 0, glucides: 56, lipides: 30 },
  marrons: { prixKg: 6.5, calPer100g: 196, lipSat: 2.3, sucre: 11, sel: 0.03, fibres: 8.1, prot: 2.4, flv: 100, glucides: 43, lipides: 2.5 },
  chapon: { prixKg: 16, calPer100g: 180, lipSat: 4.2, sucre: 0, sel: 0.08, fibres: 0, prot: 32, flv: 0, glucides: 0, lipides: 5.5 },
  pateArachide: { prixKg: 8, calPer100g: 588, lipSat: 7, sucre: 7, sel: 0.15, fibres: 6.5, prot: 25, flv: 100, glucides: 8, lipides: 50 },
  concentretomate: { prixKg: 5.5, calPer100g: 82, lipSat: 0.3, sucre: 15.8, sel: 0.6, fibres: 2.4, prot: 3.5, flv: 100, glucides: 16, lipides: 0.5 },
  epicesJerk: { prixKg: 45, calPer100g: 250, lipSat: 8, sucre: 35, sel: 15, fibres: 12, prot: 8, flv: 0, glucides: 35, lipides: 10 },
  ajiAmarillo: { prixKg: 12, calPer100g: 40, lipSat: 0.4, sucre: 8.5, sel: 0.4, fibres: 1.8, prot: 1.2, flv: 100, glucides: 8.5, lipides: 0.5 },
  colombo: { prixKg: 28, calPer100g: 340, lipSat: 12, sucre: 28, sel: 8, fibres: 10, prot: 10, flv: 0, glucides: 28, lipides: 13 },
  berbere: { prixKg: 32, calPer100g: 250, lipSat: 8.5, sucre: 20, sel: 12, fibres: 15, prot: 12, flv: 0, glucides: 20, lipides: 9 },
  coulistomate: { prixKg: 3.2, calPer100g: 45, lipSat: 0.5, sucre: 6.5, sel: 0.8, fibres: 1.8, prot: 2, flv: 100, glucides: 6.5, lipides: 0.6 },
  saucissoncuire: { prixKg: 18, calPer100g: 480, lipSat: 28, sucre: 0.5, sel: 2, fibres: 0, prot: 52, flv: 0, glucides: 0.5, lipides: 31 },
  epices: { prixKg: 25, calPer100g: 300, lipSat: 10, sucre: 25, sel: 8, fibres: 12, prot: 10, flv: 0, glucides: 25, lipides: 10.5 },
  cannellonipates: { prixKg: 3.5, calPer100g: 371, lipSat: 1.2, sucre: 0.8, sel: 0.6, fibres: 1.8, prot: 13, flv: 0, glucides: 71, lipides: 1.5 },
  sauceblanche: { prixKg: 6, calPer100g: 92, lipSat: 7.2, sucre: 1.2, sel: 0.5, fibres: 0.1, prot: 3.5, flv: 0, glucides: 3, lipides: 8 },
  epiceskebab: { prixKg: 35, calPer100g: 320, lipSat: 10, sucre: 30, sel: 10, fibres: 14, prot: 11, flv: 0, glucides: 30, lipides: 10.5 },
  tzatziki: { prixKg: 5.8, calPer100g: 81, lipSat: 5.5, sucre: 2.5, sel: 0.8, fibres: 0, prot: 5.8, flv: 0, glucides: 2.5, lipides: 6 },
  riesling: { prixKg: 8, calPer100g: 75, lipSat: 0, sucre: 6, sel: 0.01, fibres: 0, prot: 0.1, flv: 0, glucides: 6, lipides: 0 },
  chouxfleur: { prixKg: 2.2, calPer100g: 25, lipSat: 0.3, sucre: 1.8, sel: 0.06, fibres: 2.4, prot: 1.9, flv: 100, glucides: 1.8, lipides: 0.4 },
  cuisseconfit: { prixKg: 14, calPer100g: 355, lipSat: 22, sucre: 0, sel: 0.15, fibres: 0, prot: 38, flv: 0, glucides: 0, lipides: 24 },
  blancpoulet: { prixKg: 10.5, calPer100g: 165, lipSat: 3.6, sucre: 0, sel: 0.07, fibres: 0, prot: 31, flv: 0, glucides: 0, lipides: 4 },
  epicesfajitas: { prixKg: 30, calPer100g: 310, lipSat: 10, sucre: 28, sel: 9, fibres: 13, prot: 11, flv: 0, glucides: 28, lipides: 10.5 },
  boeufrumsteck: { prixKg: 16, calPer100g: 209, lipSat: 6.5, sucre: 0, sel: 0.06, fibres: 0, prot: 36, flv: 0, glucides: 0, lipides: 7.5 },
  siropliege: { prixKg: 8.5, calPer100g: 260, lipSat: 0, sucre: 65, sel: 0.1, fibres: 0, prot: 0, flv: 0, glucides: 65, lipides: 0 },
  chapelurepanko: { prixKg: 6.2, calPer100g: 350, lipSat: 1.2, sucre: 2, sel: 1.5, fibres: 1.5, prot: 12, flv: 0, glucides: 71, lipides: 1.5 },
  souris: { prixKg: 7.8, calPer100g: 210, lipSat: 8.5, sucre: 0, sel: 0.8, fibres: 0, prot: 26, flv: 0, glucides: 0, lipides: 9 },
  sole: { prixKg: 18.5, calPer100g: 81, lipSat: 1.2, sucre: 0, sel: 0.7, fibres: 0, prot: 17.5, flv: 0, glucides: 0, lipides: 1.5 },
  crozets: { prixKg: 3.8, calPer100g: 350, lipSat: 1.8, sucre: 1.5, sel: 0.5, fibres: 2, prot: 13, flv: 0, glucides: 72, lipides: 2 },
  oseille: { prixKg: 8.5, calPer100g: 22, lipSat: 0.1, sucre: 0.5, sel: 0.2, fibres: 2.2, prot: 2.7, flv: 100, glucides: 0.5, lipides: 0.2 },
  abricotsec: { prixKg: 12.5, calPer100g: 241, lipSat: 0.3, sucre: 53, sel: 0.1, fibres: 7.3, prot: 3.3, flv: 100, glucides: 53, lipides: 0.5 },
  gambas: { prixKg: 16.5, calPer100g: 99, lipSat: 0.3, sucre: 0, sel: 1.4, fibres: 0, prot: 20.3, flv: 0, glucides: 0, lipides: 0.5 },
  fumet: { prixKg: 4.2, calPer100g: 30, lipSat: 0.5, sucre: 0.5, sel: 3.5, fibres: 0, prot: 5, flv: 0, glucides: 0.5, lipides: 0.6 },
  lentillesvertes: { prixKg: 5.5, calPer100g: 353, lipSat: 0.4, sucre: 2, sel: 0.3, fibres: 8.3, prot: 25, flv: 100, glucides: 65, lipides: 0.5 },
  macaroni: { prixKg: 2.8, calPer100g: 371, lipSat: 1.1, sucre: 0.7, sel: 0.5, fibres: 1.8, prot: 13, flv: 0, glucides: 72, lipides: 1.5 },
  plantainvert: { prixKg: 4.5, calPer100g: 122, lipSat: 0.4, sucre: 16, sel: 0.4, fibres: 2.3, prot: 1.3, flv: 100, glucides: 28, lipides: 0.5 },
  chicharron: { prixKg: 14.5, calPer100g: 549, lipSat: 32, sucre: 0, sel: 2.8, fibres: 0, prot: 57, flv: 0, glucides: 0, lipides: 36 },
  cinqepices: { prixKg: 28, calPer100g: 280, lipSat: 8.5, sucre: 28, sel: 0.8, fibres: 6.5, prot: 7.5, flv: 0, glucides: 28, lipides: 9 },
  anisetoile: { prixKg: 32, calPer100g: 337, lipSat: 15.9, sucre: 0, sel: 0.2, fibres: 14.6, prot: 17.6, flv: 100, glucides: 35, lipides: 17 },
  jacque: { prixKg: 6.8, calPer100g: 95, lipSat: 0.9, sucre: 3.3, sel: 0.6, fibres: 1.5, prot: 1.7, flv: 100, glucides: 20, lipides: 1 },
  noixmoulues: { prixKg: 18.5, calPer100g: 659, lipSat: 47.2, sucre: 7.1, sel: 0.2, fibres: 5.8, prot: 24, flv: 100, glucides: 7.1, lipides: 66 },
  viandehachee: { prixKg: 11.5, calPer100g: 250, lipSat: 15, sucre: 0, sel: 0.8, fibres: 0, prot: 28, flv: 0, glucides: 0, lipides: 17 },
  saucetartare: { prixKg: 7.8, calPer100g: 420, lipSat: 38, sucre: 5, sel: 2.5, fibres: 0.5, prot: 4, flv: 0, glucides: 5, lipides: 42 },
  gesiers: { prixKg: 9.5, calPer100g: 166, lipSat: 7.2, sucre: 0, sel: 0.9, fibres: 0, prot: 24, flv: 0, glucides: 0, lipides: 8.5 },
  magretfume: { prixKg: 22.5, calPer100g: 340, lipSat: 26, sucre: 0, sel: 2.8, fibres: 0, prot: 31, flv: 0, glucides: 0, lipides: 29.5 },
  fromagebleu: { prixKg: 18, calPer100g: 353, lipSat: 25.4, sucre: 0.7, sel: 3.2, fibres: 0, prot: 21, flv: 0, glucides: 0.7, lipides: 28.3 },
  radis: { prixKg: 3.2, calPer100g: 16, lipSat: 0.1, sucre: 2.2, sel: 0.4, fibres: 1.6, prot: 0.7, flv: 100, glucides: 2.2, lipides: 0.2 },
  rizgrille: { prixKg: 4.5, calPer100g: 380, lipSat: 0.3, sucre: 0, sel: 0.6, fibres: 0.8, prot: 8, flv: 0, glucides: 86.2, lipides: 0.5 },
  pateLaksa: { prixKg: 8.5, calPer100g: 150, lipSat: 5.5, sucre: 4, sel: 3.2, fibres: 2.5, prot: 5.5, flv: 0, glucides: 22.5, lipides: 6.2 },
  carcassehomard: { prixKg: 14, calPer100g: 60, lipSat: 1.2, sucre: 0, sel: 1.8, fibres: 0, prot: 11, flv: 0, glucides: 0, lipides: 1.5 },
  cresson: { prixKg: 6.5, calPer100g: 23, lipSat: 0.1, sucre: 0.4, sel: 0.3, fibres: 1.1, prot: 2.6, flv: 100, glucides: 0.4, lipides: 0.2 },
  panais: { prixKg: 3.8, calPer100g: 75, lipSat: 0.3, sucre: 5.8, sel: 0.3, fibres: 4.8, prot: 1.2, flv: 100, glucides: 15.6, lipides: 0.5 },
  chataignescuites: { prixKg: 11.5, calPer100g: 196, lipSat: 2.4, sucre: 10.5, sel: 0.2, fibres: 8.1, prot: 2, flv: 100, glucides: 37.2, lipides: 3.2 },
  confitcanard: { prixKg: 18.5, calPer100g: 405, lipSat: 38, sucre: 0, sel: 2.5, fibres: 0, prot: 18, flv: 0, glucides: 0, lipides: 42 },
  kimchi: { prixKg: 7.5, calPer100g: 23, lipSat: 0.2, sucre: 2, sel: 2.1, fibres: 1.7, prot: 1.9, flv: 100, glucides: 2, lipides: 0.3 },
  gochugaru: { prixKg: 24, calPer100g: 353, lipSat: 9.5, sucre: 20, sel: 2.8, fibres: 9.6, prot: 15, flv: 0, glucides: 49.8, lipides: 10.8 },
  maisepi: { prixKg: 2.2, calPer100g: 86, lipSat: 1.2, sucre: 19, sel: 0.3, fibres: 2.4, prot: 3.2, flv: 100, glucides: 19, lipides: 1.4 },
  pralinesroses: { prixKg: 16.5, calPer100g: 385, lipSat: 24, sucre: 48, sel: 0.2, fibres: 3, prot: 6, flv: 0, glucides: 48, lipides: 27.2 },
};

// ===================================================================
// 🥗 NUTRI-SCORE — Calcul officiel Santé Publique France
// ===================================================================
// Algorithme : nutriments négatifs - nutriments positifs → A/B/C/D/E
// ===================================================================

function calculerNutriScore(parPortion) {
  // parPortion = { cal, lipSat, sucre, sel, fibres, prot, flv } ramené à 100g
  
  // ===== POINTS NÉGATIFS =====
  
  // Énergie (kJ pour 100g) : 1 kcal = 4.184 kJ
  const energieKj = parPortion.cal * 4.184;
  let ptEnergie = 0;
  if (energieKj <= 335) ptEnergie = 0;
  else if (energieKj <= 670) ptEnergie = 1;
  else if (energieKj <= 1005) ptEnergie = 2;
  else if (energieKj <= 1340) ptEnergie = 3;
  else if (energieKj <= 1675) ptEnergie = 4;
  else if (energieKj <= 2010) ptEnergie = 5;
  else if (energieKj <= 2345) ptEnergie = 6;
  else if (energieKj <= 2680) ptEnergie = 7;
  else if (energieKj <= 3015) ptEnergie = 8;
  else if (energieKj <= 3350) ptEnergie = 9;
  else ptEnergie = 10;
  
  // Acides gras saturés (g/100g)
  let ptLipSat = 0;
  if (parPortion.lipSat <= 1) ptLipSat = 0;
  else if (parPortion.lipSat <= 2) ptLipSat = 1;
  else if (parPortion.lipSat <= 3) ptLipSat = 2;
  else if (parPortion.lipSat <= 4) ptLipSat = 3;
  else if (parPortion.lipSat <= 5) ptLipSat = 4;
  else if (parPortion.lipSat <= 6) ptLipSat = 5;
  else if (parPortion.lipSat <= 7) ptLipSat = 6;
  else if (parPortion.lipSat <= 8) ptLipSat = 7;
  else if (parPortion.lipSat <= 9) ptLipSat = 8;
  else if (parPortion.lipSat <= 10) ptLipSat = 9;
  else ptLipSat = 10;
  
  // Sucres (g/100g)
  let ptSucre = 0;
  if (parPortion.sucre <= 4.5) ptSucre = 0;
  else if (parPortion.sucre <= 9) ptSucre = 1;
  else if (parPortion.sucre <= 13.5) ptSucre = 2;
  else if (parPortion.sucre <= 18) ptSucre = 3;
  else if (parPortion.sucre <= 22.5) ptSucre = 4;
  else if (parPortion.sucre <= 27) ptSucre = 5;
  else if (parPortion.sucre <= 31) ptSucre = 6;
  else if (parPortion.sucre <= 36) ptSucre = 7;
  else if (parPortion.sucre <= 40) ptSucre = 8;
  else if (parPortion.sucre <= 45) ptSucre = 9;
  else ptSucre = 10;
  
  // Sel (g/100g) - 1g sel = 400mg sodium
  const sodiumMg = parPortion.sel * 400;
  let ptSel = 0;
  if (sodiumMg <= 90) ptSel = 0;
  else if (sodiumMg <= 180) ptSel = 1;
  else if (sodiumMg <= 270) ptSel = 2;
  else if (sodiumMg <= 360) ptSel = 3;
  else if (sodiumMg <= 450) ptSel = 4;
  else if (sodiumMg <= 540) ptSel = 5;
  else if (sodiumMg <= 630) ptSel = 6;
  else if (sodiumMg <= 720) ptSel = 7;
  else if (sodiumMg <= 810) ptSel = 8;
  else if (sodiumMg <= 900) ptSel = 9;
  else ptSel = 10;
  
  const ptNeg = ptEnergie + ptLipSat + ptSucre + ptSel;
  
  // ===== POINTS POSITIFS =====
  
  // Fruits/légumes/légumineuses (%)
  let ptFlv = 0;
  if (parPortion.flv <= 40) ptFlv = 0;
  else if (parPortion.flv <= 60) ptFlv = 1;
  else if (parPortion.flv <= 80) ptFlv = 2;
  else ptFlv = 5;
  
  // Fibres (g/100g)
  let ptFibres = 0;
  if (parPortion.fibres <= 0.9) ptFibres = 0;
  else if (parPortion.fibres <= 1.9) ptFibres = 1;
  else if (parPortion.fibres <= 2.8) ptFibres = 2;
  else if (parPortion.fibres <= 3.7) ptFibres = 3;
  else if (parPortion.fibres <= 4.7) ptFibres = 4;
  else ptFibres = 5;
  
  // Protéines (g/100g)
  let ptProt = 0;
  if (parPortion.prot <= 1.6) ptProt = 0;
  else if (parPortion.prot <= 3.2) ptProt = 1;
  else if (parPortion.prot <= 4.8) ptProt = 2;
  else if (parPortion.prot <= 6.4) ptProt = 3;
  else if (parPortion.prot <= 8) ptProt = 4;
  else ptProt = 5;
  
  // Règle officielle : si ptNeg >= 11, on n'ajoute les protéines QUE si flv >= 5 pts
  let ptPos = ptFlv + ptFibres;
  if (ptNeg < 11 || ptFlv === 5) ptPos += ptProt;
  
  // ===== SCORE FINAL =====
  const score = ptNeg - ptPos;
  
  // Mapping score → lettre (général)
  let lettre = "E";
  if (score <= -1) lettre = "A";
  else if (score <= 2) lettre = "B";
  else if (score <= 10) lettre = "C";
  else if (score <= 18) lettre = "D";
  else lettre = "E";
  
  return {
    lettre,
    score,
    ptNeg,
    ptPos,
    details: { energieKj: Math.round(energieKj), lipSat: parPortion.lipSat, sucre: parPortion.sucre, sel: parPortion.sel, fibres: parPortion.fibres, prot: parPortion.prot, flv: parPortion.flv },
  };
}

// Helper : calcule le Nutri-Score d'une recette complète (ligne du tableau)
// Poids unitaire moyen (en g) d'un ingrédient compté
// Note : pour le citron, on prend 30g (jus + zeste consommables) au lieu du fruit entier (~100g)
// car en pratique on consomme rarement le citron entier dans une recette.
const POIDS_UNITAIRE = {
  pate: 250, paton: 250, patons: 250, patepizza: 250, patapizza: 250,   // 1 pâton de pizza ≈ 250 g
  patefeuilletee: 230, pateFeuilletee: 230, patebrisee: 230, patesablee: 230, patebrisée: 230,   // 1 abaisse ≈ 230 g
  oeuf: 50, oeufs: 50, oeufPate: 50, oeufCreme: 50, oeufChoux: 50,
  jauneoeuf: 18, jauneoeufs: 18, jaunes: 18, jaunesoeufs: 18, jaunesCreme: 18, gJaune: 18,
  blancsoeufs: 32, blancs: 32, blanc: 32,
  citron: 30, citrons: 30, citronC: 30, citronvert: 20, zestecitron: 5,
  ail: 3, gingembreail: 5, ailechalote: 5,
  oignon: 100, oignons: 100, oignonRouge: 100, oignonrouge: 100, oignonNouveau: 30, oignonsblanc: 30, echalote: 30,
  banane: 120, bananes: 120, pomme: 150, pommes: 150, poire: 150,
  avocat: 200, avocats: 200, orange: 130, kiwi: 75, peche: 150,
  mangue: 300, ananas: 500, melon: 1000, passion: 50,
  serrano: 30,
  tomatecerise: 8, tomatescerises: 8, feuillebrick: 10, feuillesbrick: 10,
  bagel: 85, escargot: 10, figue: 50, figues: 50, painpanini: 90, painmie: 30, paincomplet: 35, tortilla: 50, tortillas: 50,
  huitres: 10,
};

// === Résolveur de clé d'ingrédient (tolérance orthographe) ===
// Repli utilisé UNIQUEMENT quand INGREDIENTS_PRIX[cle] est absent : tente
// minuscule (camelCase), alias, sans accents, puis singulier/pluriel.
// Ne renvoie QUE des clés réellement présentes dans INGREDIENTS_PRIX, donc
// ne peut jamais changer le résultat d'une recette dont la clé est déjà bonne.
const ALIAS_INGREDIENTS = {
  // synonymes non déductibles mécaniquement : cle source -> cle tarifée
};
function cleCanonique(cle) {
  if (typeof cle !== "string" || !cle) return null;
  if (INGREDIENTS_PRIX[cle]) return cle;
  const bas = cle.toLowerCase();
  if (INGREDIENTS_PRIX[bas]) return bas;
  if (ALIAS_INGREDIENTS[cle]) return ALIAS_INGREDIENTS[cle];
  if (ALIAS_INGREDIENTS[bas]) return ALIAS_INGREDIENTS[bas];
  const sansAccent = bas.normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (INGREDIENTS_PRIX[sansAccent]) return sansAccent;
  const sansS = sansAccent.replace(/s$/, "");
  if (INGREDIENTS_PRIX[sansS]) return sansS;
  const avecS = sansAccent + "s";
  if (INGREDIENTS_PRIX[avecS]) return avecS;
  return null;
}

// === Parser tolérant pour le Nutri-Score ===
// Comme parserQuantite, mais convertit aussi c.à.s (15g), c.à.c (5g), pincée (0.5g)
// Permet d'inclure les sucres/confitures/sels dosés en cuillères qui sinon seraient ignorés
function parserQuantiteNutri(texte) {
  if (typeof texte === "number") return { valeur: texte, unite: "unite" };
  if (!texte || typeof texte !== "string") return null;
  
  let s = String(texte).trim();
  if (s === "—" || s === "" || s.toLowerCase().includes("facultatif") || s === "0") return null;
  
  s = s.replace(/^[~≈]/, "").trim();
  s = s.replace(/½/g, "0.5").replace(/¼/g, "0.25").replace(/¾/g, "0.75")
       .replace(/⅓/g, "0.333").replace(/⅔/g, "0.667")
       .replace(/⅛/g, "0.125").replace(/⅜/g, "0.375").replace(/⅝/g, "0.625").replace(/⅞/g, "0.875")
       .replace(/⅙/g, "0.167").replace(/⅚/g, "0.833");
  s = s.replace(/,/g, ".");
  
  const m = s.match(/^([0-9]+(?:\.[0-9]+)?)/);
  if (!m) return null;
  
  let nombre = parseFloat(m[1]);
  const unite = s.slice(m[0].length).trim().toLowerCase();
  
  // === Conversions cuillères (la VRAIE différence avec parserQuantite) ===
  if (unite.includes("c.à.s") || unite.includes("c.s") || unite.includes("cuillère à soupe") || unite.includes("cuiller")) {
    return { valeur: nombre * 15, unite: "poids" }; // 1 c.à.s = ~15g
  }
  if (unite.includes("c.à.c") || unite.includes("c.c") || unite.includes("cuillère à café")) {
    return { valeur: nombre * 5, unite: "poids" }; // 1 c.à.c = ~5g
  }
  if (unite.includes("pinc")) return { valeur: nombre * 0.5, unite: "poids" }; // 1 pincée = ~0.5g (sel surtout)
  if (unite.includes("goutte")) return { valeur: nombre * 0.05, unite: "poids" }; // 1 goutte = ~0.05g
  
  // Autres conversions (identiques au parser principal)
  if (unite.includes("sachet")) return { valeur: nombre * 11, unite: "poids" };
  if (unite === "kg") return { valeur: nombre * 1000, unite: "poids" };
  if (unite === "l")  return { valeur: nombre * 1000, unite: "poids" };
  if (unite === "g" || unite === "ml") return { valeur: nombre, unite: "poids" };
  if (unite === "cl") return { valeur: nombre * 10, unite: "poids" };
  
  return { valeur: nombre, unite: "unite" };
}

// Liste des SPIRITUEUX et boissons alcoolisées pures (pour exclusion Nutri-Score)
// Le Nutri-Score officiel exclut les boissons alcoolisées.
// Note : le vin/marsala/mirin/sake ne sont PAS dans cette liste car ils servent
// principalement à cuisiner — l'alcool s'évapore à la cuisson (bourguignon, coq au vin...).
// Pour les recettes type "sangria" qui contiennent du vin, l'exclusion se fait
// au niveau de la catégorie (data-cat="cocktails") dans app.js.
const INGREDIENTS_ALCOOL = new Set([
  "rhum", "vodka", "tequila", "cognac", "bourbon", "brandy", "kirsch", "gin",
  "cointreau", "tripleSec", "curacao", "aperol", "campari", "vermouth", "passoa", "amaretto",
  "champagne", "prosecco", "bierebrune", "kahluaC", "bitters"
]);

function calculerNutriScoreRecette(ligne) {
  if (!ligne || typeof ligne !== "object") return null;
  
  let poidsTotal = 0;
  let poidsFlv = 0;
  let poidsAlcool = 0;
  const totaux = { cal: 0, lipSat: 0, sucre: 0, sel: 0, fibres: 0, prot: 0 };
  
  Object.entries(ligne).forEach(([nomIng, valeur]) => {
    // Ignorer les colonnes méta
    if (nomIng === "nb" || nomIng === "label" || nomIng === "patons" || nomIng === "total") return;
    
    const ingC = cleCanonique(nomIng);
    const ing = ingC ? INGREDIENTS_PRIX[ingC] : undefined;
    if (!ing) return;
    
    const q = parserQuantiteNutri(valeur);
    if (!q) return;
    let grammes = 0;
    if (q.unite === "poids") {
      // Déjà en grammes/ml (parseur a converti kg→g, l→ml, cl→ml, sachet→11g)
      grammes = q.valeur;
    } else {
      // Quantité comptée : utiliser le poids unitaire moyen
      const pu = POIDS_UNITAIRE[ingC] || (ing.prixUnite !== undefined ? 50 : 0);
      grammes = q.valeur * pu;
    }
    
    if (grammes <= 0) return;
    
    poidsTotal += grammes;
    
    // Si c'est un alcool, on cumule pour exclure ensuite si proportion trop élevée
    if (INGREDIENTS_ALCOOL.has(nomIng)) {
      poidsAlcool += grammes;
    }
    
    const facteur = grammes / 100; // pour passer de "/100g" à "absolu"
    
    // Calories : utiliser calPer100g si dispo, sinon cal/unité ramené à 100g
    if (ing.calPer100g !== undefined) {
      totaux.cal += ing.calPer100g * facteur;
    } else if (ing.cal !== undefined) {
      const pu = POIDS_UNITAIRE[nomIng] || 50;
      const calPer100 = (ing.cal / pu) * 100;
      totaux.cal += calPer100 * facteur;
    }
    
    totaux.lipSat += (ing.lipSat || 0) * facteur;
    totaux.sucre  += (ing.sucre  || 0) * facteur;
    totaux.sel    += (ing.sel    || 0) * facteur;
    totaux.fibres += (ing.fibres || 0) * facteur;
    totaux.prot   += (ing.prot   || 0) * facteur;
    
    if (ing.flv && ing.flv > 0) {
      poidsFlv += grammes * (ing.flv / 100);
    }
  });
  
  if (poidsTotal === 0) return null;
  
  // === EXCLUSION DES BOISSONS ALCOOLISÉES ===
  // Le Nutri-Score officiel exclut les boissons contenant > 1.2% d'alcool en volume
  // Notre seuil : si l'alcool représente plus de 15% du poids de la recette,
  // c'est une boisson alcoolisée (vs un plat cuisiné où le vin s'évapore).
  // Boeuf bourguignon : ~10-13% de vin → reste calculé
  // Cocktail mojito : >20% de rhum → exclu
  // Vin chaud : ~70% de vin → exclu
  if (poidsAlcool / poidsTotal > 0.15) return null;
  
  // Ramener à 100g (référence Nutri-Score officielle)
  const parPortion = {
    cal:    totaux.cal    / poidsTotal * 100,
    lipSat: totaux.lipSat / poidsTotal * 100,
    sucre:  totaux.sucre  / poidsTotal * 100,
    sel:    totaux.sel    / poidsTotal * 100,
    fibres: totaux.fibres / poidsTotal * 100,
    prot:   totaux.prot   / poidsTotal * 100,
    flv:    (poidsFlv / poidsTotal) * 100,
  };
  
  return calculerNutriScore(parPortion);
}
function calculerPrixCaloriesRecette(ligneTableau) {
  let prixTotal = 0;
  let calTotal = 0;
  let protTotal = 0;
  let glucTotal = 0;
  let lipTotal = 0;
  let ingredientsManquants = [];
  
  for (const [cle, valeur] of Object.entries(ligneTableau)) {
    // Ignorer les colonnes méta
    if (cle === "nb" || cle === "label" || cle === "patons" || cle === "total") continue;
    
    const cleC = cleCanonique(cle);
    const info = cleC ? INGREDIENTS_PRIX[cleC] : undefined;
    if (!info) {
      ingredientsManquants.push(cle);
      continue;
    }
    
    // Parser la valeur : "200 g", "½", "1,5", "~200 g", etc.
    const qte = parserQuantite(valeur);
    if (qte === null) continue;
    
    // Détecter si la valeur est en grammes/ml (poids) ou en unités
    // Si le texte contient "g", "kg", "ml", "l" → c'est du poids/volume
    const estPoids = qte.unite === "poids";
    
    if (info.prixKg !== undefined) {
      // Pondérable : en g/ml on garde la valeur ; si dosé en unités (ex. « 2 pâtons »)
      // on convertit via un poids unitaire connu, sinon on garde la valeur brute.
      const grammes = (!estPoids && POIDS_UNITAIRE[cleC]) ? qte.valeur * POIDS_UNITAIRE[cleC] : qte.valeur;
      prixTotal += (grammes / 1000) * info.prixKg;
      calTotal += (grammes / 100) * info.calPer100g;
      protTotal += (grammes / 100) * (info.prot || 0);
      glucTotal += (grammes / 100) * (info.glucides || 0);
      lipTotal += (grammes / 100) * (info.lipides || 0);
    } else if (info.prixUnite !== undefined) {
      if (estPoids) {
        // Cas spécial : œufs en grammes (200g = ~4 œufs de 50g)
        // On convertit en utilisant un poids unitaire moyen
        const poidsUnitaire = {
          oeuf: 50, oeufs: 50,        // 1 œuf ≈ 50g
          citron: 100,                  // 1 citron ≈ 100g
          banane: 120,                  // 1 banane ≈ 120g
          pomme: 150,                   // 1 pomme ≈ 150g
          orange: 150,
          poire: 150,
          oignon: 100,
          concombre: 200,
          melon: 1000,                  // 1 melon ≈ 1 kg
          pasteque: 3000,               // 1 pastèque ≈ 3 kg
          ail: 3,                       // 1 gousse ≈ 3g
        };
        const pu = poidsUnitaire[cleC] || POIDS_UNITAIRE[cleC] || 100;
        const nbUnites = qte.valeur / pu;
        prixTotal += nbUnites * info.prixUnite;
        calTotal += nbUnites * info.cal;
        protTotal += nbUnites * (info.prot || 0);
        glucTotal += nbUnites * (info.glucides || 0);
        lipTotal += nbUnites * (info.lipides || 0);
      } else {
        // Ingrédient compté normalement (œuf, citron, banane...)
        prixTotal += qte.valeur * info.prixUnite;
        calTotal += qte.valeur * info.cal;
        protTotal += qte.valeur * (info.prot || 0);
        glucTotal += qte.valeur * (info.glucides || 0);
        lipTotal += qte.valeur * (info.lipides || 0);
      }
    }
  }
  
  return {
    prix: Math.round(prixTotal * 100) / 100,
    cal: Math.round(calTotal),
    prot: Math.round(protTotal * 10) / 10,
    gluc: Math.round(glucTotal * 10) / 10,
    lip: Math.round(lipTotal * 10) / 10,
    manquants: ingredientsManquants
  };
}

// Parse une valeur texte comme "200 g", "½", "1,5", "~200 g"
// Retourne { valeur: nombre, unite: "poids"|"unite" } ou null
function parserQuantite(texte) {
  if (typeof texte === "number") return { valeur: texte, unite: "unite" };
  if (!texte || typeof texte !== "string") return null;
  
  let s = String(texte).trim();
  
  // Cas "—" ou vide
  if (s === "—" || s === "" || s.toLowerCase().includes("facultatif") || s === "0") {
    return null;
  }
  
  // Enlever préfixe ~, =, etc.
  s = s.replace(/^[~≈]/, "").trim();
  
  // Remplacer fractions Unicode
  s = s.replace(/½/g, "0.5")
       .replace(/¼/g, "0.25")
       .replace(/¾/g, "0.75")
       .replace(/⅓/g, "0.333")
       .replace(/⅔/g, "0.667")
       .replace(/⅛/g, "0.125")
       .replace(/⅜/g, "0.375")
       .replace(/⅝/g, "0.625")
       .replace(/⅞/g, "0.875")
       .replace(/⅙/g, "0.167")
       .replace(/⅚/g, "0.833");
  
  // Remplacer virgule décimale par point
  s = s.replace(/,/g, ".");
  
  // Extraire le nombre du début de la chaîne
  const m = s.match(/^([0-9]+(?:\.[0-9]+)?)/);
  if (!m) return null;
  
  let nombre = parseFloat(m[1]);
  
  // Détecter l'unité pour conversion
  const unite = s.slice(m[0].length).trim().toLowerCase();
  
  // c.à.s et c.à.c — non standardisé, on ignore
  if (unite.includes("c.à.s") || unite.includes("c.à.c") || unite.includes("c.s") || unite.includes("c.c")) {
    return null;
  }
  // pincée — quantité trop faible, on ignore
  if (unite.includes("pinc")) return null;
  // sachet → ~11g (sachet de levure standard)
  if (unite.includes("sachet")) {
    return { valeur: nombre * 11, unite: "poids" };
  }
  // kg → g
  if (unite === "kg") return { valeur: nombre * 1000, unite: "poids" };
  // l → ml
  if (unite === "l") return { valeur: nombre * 1000, unite: "poids" };
  // gouttes — trop faible, on ignore
  if (unite.includes("goutte")) return null;
  // g, ml → poids/volume
  if (unite === "g" || unite === "ml") return { valeur: nombre, unite: "poids" };
  // cl → ml ×10
  if (unite === "cl") return { valeur: nombre * 10, unite: "poids" };
  
  // Pas d'unité = quantité comptée (1 œuf, 2 bananes...)
  return { valeur: nombre, unite: "unite" };
}

// Exporter pour utilisation

// Exporter pour utilisation
if (typeof module !== "undefined") {
  module.exports = { INGREDIENTS_PRIX, cleCanonique, calculerPrixCaloriesRecette, parserQuantite, calculerNutriScore, calculerNutriScoreRecette };
}

// ============================================================
// Libellés affichables des ingrédients (déplacé depuis app.js).
// 👉 Rangé ici, à côté des prix : quand tu ajoutes un ingrédient,
//    mets son prix ci-dessus ET son libellé ci-dessous.
// ============================================================
// Mapping des clés de colonnes vers labels affichables
const INGREDIENTS_LABELS = {
  clougirofle: "🟤 Clou de girofle", crevette: "🦐 Crevettes", saucetartare: "🥣 Sauce tartare",
  blancoeuf: "🥚 Blanc d'œuf", macarons: "🌈 Macarons", yaourtgrec: "🥛 Yaourt grec", panko: "🍞 Chapelure panko",
  champignon: "🍄 Champignons", morilleseche: "🍄 Morilles séchées", potimarron: "🎃 Potimarron",
  speculoos: "🍪 Biscuits spéculoos", tomatesechees: "🍅 Tomates séchées", oeufscabillaud: "🐟 Œufs de cabillaud fumés",
  truite: "🐟 Truite", barpoisson: "🐟 Bar (loup de mer)", feveseche: "🫘 Fèves sèches", brocciu: "🧀 Brocciu", endive: "🥬 Endives", roquefort: "🧀 Roquefort",
  epinard: "🥬 Épinards", olivenoire: "🫒 Olives noires",
  painmie: "🍞 Pain de mie", poireau: "🥬 Poireau",
  // == v257 — Muffins & Pâtisserie ==
  chocolatBlanc: "🤍 Chocolat blanc", chocolatLait: "🍫 Chocolat au lait",
  pepitesChoco: "🍫 Pépites de chocolat",
  cannelle: "🪵 Cannelle", pavot: "🌱 Graines de pavot",
  noix: "🌰 Noix", amandes: "🌰 Amandes",
  huileTournesol: "🌻 Huile de tournesol", vanilleExtrait: "🌿 Extrait de vanille",
  streusel: "🍪 Streusel", caramelSale: "🍯 Caramel beurre salé",
  // == v257 — Marques ==
  kinderBueno: "🍫 Kinder Bueno", mars: "🍫 Mars",
  kitkat: "🍫 Kit Kat", raffaello: "🥥 Raffaello",
  snickers: "🥜 Snickers", oreo: "🍪 Oreo",
  // == v257 — Asie & autres ==
  nouillesRiz: "🍜 Nouilles de riz", saucePoisson: "🐟 Sauce poisson (nuoc-mâm)",
  pousses_soja: "🌱 Pousses de soja",
  pateCurryVert: "🌶️ Pâte de curry vert", basilic_thai: "🌿 Basilic thaï",
  reblochon: "🧀 Reblochon", pousseBambou: "🎍 Pousses de bambou",
  biscuits: "🍪 Biscuits sablés", epaulePorc: "🐖 Épaule de porc",
  sauceBBQ: "🥫 Sauce barbecue", saumonFrais: "🐟 Saumon frais",
  ciboulette: "🌿 Ciboulette", cremeChantilly: "🍦 Crème chantilly",
  agneau: "🐑 Agneau", merguez: "🌭 Merguez",
  butternut: "🎃 Butternut", rizArborio: "🍚 Riz arborio",
  vinBlanc: "🍷 Vin blanc sec", champignons: "🍄 Champignons",
  boullionLeg: "🥣 Bouillon de légumes",
  // === v257.2 — Nouveaux ingrédients ===
  cabillaud: "🐟 Cabillaud", magret: "🦆 Magret de canard",
  // == Ignorés ==
  nb: null, label: null, total: null,
  // == Céréales & pâtes ==
  farine: "🌾 Farine", riz: "🍚 Riz", rizS: "🍚 Riz", semoule: "🌾 Semoule",
  nouilles: "🍜 Nouilles", spaghetti: "🍝 Spaghetti", pates: "🍝 Pâtes",
  lasagne: "🍝 Feuilles de lasagne", flocons: "🌾 Flocons d'avoine",
  quinoa: "🌾 Quinoa", maizena: "🌾 Maïzena", cacao: "🍫 Cacao en poudre",
  graines: "🌱 Graines", chia: "🌱 Graines de chia", granola: "🌾 Granola",
  chapelure: "🍞 Chapelure", pain: "🍞 Pain", buns: "🍞 Buns",
  pita: "🫓 Pains pita", crepesP: "🫓 Crêpes pékinoises",
  feuilletee: "🥐 Pâte feuilletée", pate: "🫓 Pâton(s)", patons: "🫓 Pâton(s)",
  // == Produits laitiers ==
  lait: "🥛 Lait", laitChoux: "🥛 Lait (choux)", laitCreme: "🥛 Lait (crème)",
  creme: "🍦 Crème fraîche", gCreme: "🍦 Crème (goumeau)", beurreCreme: "🧈 Beurre (crème)",
  yaourt: "🥛 Yaourt grec",
  beurre: "🧈 Beurre", beurrChoux: "🧈 Beurre (choux)", beurrCreme: "🧈 Beurre (crème)", beurrePate: "🧈 Beurre (pâte)",
  huile: "🫒 Huile", huileOlive: "🫒 Huile d'olive", huileTruffe: "🍄 Huile de truffe",
  huilenoix: "🌰 Huile de noix", huilePalme: "🌴 Huile de palme",
  mascarpone: "🧀 Mascarpone", parmesan: "🧀 Parmesan", gruyere: "🧀 Gruyère",
  feta: "🧀 Feta", fetaOpt: "🧀 Feta (optionnel)", gorgonzola: "🧀 Gorgonzola",
  ricotta: "🧀 Ricotta", pecorino: "🧀 Pecorino", philadelphia: "🧀 Philadelphia",
  cheddar: "🧀 Cheddar", mozza: "🧀 Mozzarella", fromage: "🧀 Fromage",
  laitCoco: "🥥 Lait de coco", cremeCoco: "🥥 Crème de coco", coco: "🥥 Lait de coco",
  confiture: "🍓 Confiture", moutarde: "🟡 Moutarde",
  // == Œufs ==
  oeufs: "🥚 Œufs", oeuf: "🥚 Œuf", oeufChoux: "🥚 Œufs", oeufCreme: "🥚 Œufs (crème)",
  oeufPate: "🥚 Œufs (pâte)", jaunes: "🥚 Jaunes d'œufs", jaunesCreme: "🥚 Jaunes d'œufs",
  blancs: "🥚 Blancs d'œufs", blanc: "🥚 Blancs d'œufs",
  // == Sucre & levure ==
  sucre: "🍬 Sucre", sucreGlace: "🍬 Sucre glace", cassonade: "🍬 Cassonade",
  gSucre: "🍬 Sucre (goumeau)", sucreCreme: "🍬 Sucre (crème)", sucreCaramel: "🍬 Sucre (caramel)",
  sucreMeringue: "🍬 Sucre (meringue)", sucreIles: "🍬 Sucre de coco",
  miel: "🍯 Miel", sirop: "🍬 Sirop de sucre", selRebord: "🧂 Sucre/sel (rebord)",
  siropderable: "🍁 Sirop d'érable", noisettes: "🌰 Noisettes", plantain: "🍌 Banane plantain", crabe: "🦀 Crabe", cornichon: "🥒 Cornichon", estragon: "🌿 Estragon",
  levure: "🟨 Levure fraîche", ferment: "🟨 Ferments lactiques",
  poudreAmande: "🌰 Poudre d'amande", glace: "🍦 Glace vanille",
  // == Viandes ==
  poulet: "🍗 Poulet", porc: "🐷 Porc", boeuf: "🥩 Bœuf", agneau: "🐑 Agneau",
  viande: "🥩 Viande", joues: "🥩 Joues de bœuf", jarret: "🦴 Jarret de veau",
  canard: "🦆 Canard", cotelets: "🐑 Côtelettes d'agneau", os: "🦴 Os",
  lardons: "🥓 Lardons", jambon: "🍖 Jambon", guanciale: "🥓 Guanciale",
  salami: "🌭 Salami", chorizo: "🌭 Chorizo", nduja: "🌶️ Nduja",
  prosciutto: "🍖 Prosciutto di Parma", foie: "🫀 Foies de volaille",
  proteine: "💪 Protéine en poudre",
  // == Poissons & fruits de mer ==
  saumon: "🐟 Saumon fumé", thon: "🐟 Thon", poisson: "🐟 Poisson",
  dorade: "🐟 Dorade", poulpe: "🐙 Poulpe", crevettes: "🦐 Crevettes",
  moules: "🦪 Moules", anchois: "🐟 Anchois", anchoix: "🐟 Anchois", huitres: "🦪 Huîtres",
  // == Légumes ==
  tomates: "🍅 Tomates", tomate: "🍅 Tomates", tomateCerise: "🍅 Tomates cerises",
  oignon: "🧅 Oignon", oignons: "🧅 Oignons", echalote: "🧅 Échalote",
  ail: "🧄 Ail", carotte: "🥕 Carotte", carottes: "🥕 Carottes",
  courgette: "🥒 Courgette", aubergine: "🍆 Aubergine", aubergines: "🍆 Aubergines",
  poivron: "🫑 Poivron", champignons: "🍄 Champignons", shiitake: "🍄 Shiitake", ackee: "🟡 Ackee",
  epinards: "🌿 Épinards", salade: "🥬 Salade", laitue: "🥬 Laitue",
  pdterre: "🥔 Pommes de terre", patate: "🍠 Patate douce", patatedouce: "🍠 Patate douce",
  courge: "🎃 Courge butternut", manioc: "🫚 Manioc", navets: "🪨 Navets",
  chou: "🥬 Chou", poireaux: "🥬 Poireaux", asperges: "🌿 Asperges",
  mais: "🌽 Maïs", maïs: "🌽 Maïs", petitspois: "🫛 Petits pois",
  haricots: "🫛 Haricots verts", concombre: "🥒 Concombre", celeri: "🌿 Céleri",
  edamame: "🫛 Edamame", pois: "🫘 Pois",
  // == Légumineuses ==
  poischiches: "🫘 Pois chiches", lentilles: "🫘 Lentilles",
  farinepoischiche: "🌾 Farine de pois chiche", mloukhia: "🌿 Mloukhia",
  igname: "🍠 Igname", gombo: "🌿 Gombo", attieke: "🍚 Attiéké",
  // == Fruits ==
  citron: "🍋 Citron", citrons: "🍋 Citrons", orange: "🍊 Orange", orangeJus: "🍊 Jus d'orange",
  pommes: "🍎 Pommes", bananes: "🍌 Bananes", fraise: "🍓 Fraise", fraises: "🍓 Fraises",
  framboises: "🫐 Framboises", myrtilles: "🫐 Myrtilles", peche: "🍑 Pêche",
  abricot: "🍑 Abricots", abricots: "🍑 Abricots",
  cassis: "🫐 Cassis", litchi: "🌸 Litchis", coing: "🍐 Coing", artichaut: "🌿 Cœurs d'artichaut", noixpecan: "🌰 Noix de pécan",
  maquereau: "🐟 Maquereau", poiscasses: "🟢 Pois cassés",
  haddock: "🐟 Haddock fumé", fourme: "🧀 Fourme d'Ambert", raifort: "🌶️ Raifort", dukkah: "🥜 Dukkah",
  zaatar: "🌿 Za'atar", orge: "🌾 Orge perlé", epeautre: "🌾 Épeautre", cajou: "🥜 Noix de cajou", sarrasin: "🌾 Sarrasin", navet: "🥬 Navet", avoine: "🌾 Avoine",
  homard: "🦞 Homard", halloumi: "🧀 Halloumi", garammasala: "🌶️ Garam masala", blettes: "🥬 Blettes",
  sardine: "🐟 Sardines",
  pruneaux: "🫐 Pruneaux", fruits: "🍎 Fruits", passion: "🌺 Fruits de la passion",
  mangue: "🥭 Mangue", pasteque: "🍉 Pastèque", cerises: "🍒 Cerises", cerise: "🍒 Cerise",
  fraise: "🍓 Fraise", avocats: "🥑 Avocats", ananas: "🍍 Ananas",
  acai: "🫐 Açaï", coulis: "🍓 Coulis", sambar: "🍲 Sambar",
  // == Aromates & épices ==
  sel: "🧂 Sel", poivre: "🌶️ Poivre noir", piment: "🌶️ Piment",
  masala: "🌶️ Garam masala", curry: "🌶️ Curry", cumin: "🌿 Cumin",
  cannelle: "🪵 Cannelle", muscade: "🌰 Muscade", safran: "🌼 Safran", paprika: "🌶️ Paprika",
  // === Lot 1 — Ingrédients classiques français ===
  brochet: "🐟 Brochet", ecrevisses: "🦞 Écrevisses", lapin: "🐰 Lapin",
  reblochon: "🧀 Reblochon", tomme: "🧀 Tomme fraîche", andouillette: "🌭 Andouillette",
  cuissecanard: "🦆 Cuisse de canard", graissecanard: "🦆 Graisse de canard",
  haricotsblancs: "🫘 Haricots blancs", vinrouge: "🍷 Vin rouge",
  patefeuilletee: "🥧 Pâte feuilletée", poudreamandes: "🥥 Poudre d'amandes",
  cremepatissiere: "🍮 Crème pâtissière", sucrecaramel: "🍯 Sucre (caramel)",
  feve: "🪙 Fève", feuillevigne: "🍃 Feuilles de vigne",
  // === Lot 2 — Ingrédients cuisines du monde ===
  baguette: "🥖 Baguette", painpita: "🫓 Pain pita",
  haricotsverts: "🫛 Haricots verts", saucissefumee: "🌭 Saucisse fumée",
  pouletHache: "🍗 Poulet haché", rizGrillé: "🌾 Riz grillé concassé",
  oignonrouge: "🧅 Oignon rouge", nouillesoeuf: "🍜 Nouilles aux œufs",
  pateCurry: "🌶️ Pâte de curry", cacahuetespurée: "🥜 Purée de cacahuètes",
  lait_coco: "🥥 Lait de coco", tempeh: "🟨 Tempeh", seitan: "🌾 Seitan",
  piniots: "🌰 Pignons de pin", feuillesBrick: "📜 Feuilles de brick",
  feuillesFilo: "📜 Feuilles de filo", sucreglace: "❄️ Sucre glace",
  // === Mega-Lot — Italie / Pâtisserie / Healthy ===
  spaghetti: "🍝 Spaghetti", palourdes: "🦪 Palourdes",
  polenta: "🌽 Polenta", gorgonzola: "🧀 Gorgonzola",
  ragu: "🍝 Ragù (sauce bolognaise)", huilefriture: "🛢️ Huile de friture",
  marsala: "🍷 Marsala", caramel: "🍯 Caramel",
  amaretto: "🥃 Amaretto", glacevanille: "🍦 Glace vanille",
  fondant: "🍬 Fondant pâtissier", chocolatNoir: "🍫 Chocolat noir",
  kirsch: "🍷 Kirsch", cerises: "🍒 Cerises",
  biscuitscuillere: "🍪 Biscuits cuillère", fraisesframboises: "🍓 Fraises ou framboises",
  fromageblanc: "🥛 Fromage blanc", jusfruit: "🧃 Jus de fruits",
  skyr: "🥛 Skyr", whey: "💪 Protéine en poudre", cottage: "🧀 Cottage cheese",
  blancoeuf: "🥚 Blancs d'œufs", dinde: "🦃 Escalope de dinde", colin: "🐟 Filet de colin",
  steakhache5: "🥩 Steak haché 5%", beurrecacahuete: "🥜 Beurre de cacahuète",
  farineT80: "🌾 Farine T80", farineble: "🌾 Farine de blé",
  farineseigle: "🌾 Farine de seigle", farinesarrasin: "🌾 Farine de sarrasin",
  levain: "🥖 Levain", graines: "🌻 Graines (tournesol, lin, sésame)",
  filetdeboeuf: "🥩 Filet de bœuf", saumonfume: "🐟 Saumon fumé",
  saumonfrais: "🐟 Filet de saumon frais", fromagefrais: "🧀 Fromage frais",
  fleurdesel: "🧂 Fleur de sel", crème: "🥛 Crème fraîche",
  patebrisee: "🥧 Pâte brisée", fromagerape: "🧀 Fromage râpé",
  emmental: "🧀 Emmental", vacherin: "🧀 Vacherin", provolone: "🧀 Provolone", huiledolive: "🫒 Huile d'olive",
  // === Sprint final — Allemagne, Espagne, Mexique, Inde, Japon, Chine, Russie, Portugal, Hongrie ===
  bratwurst: "🌭 Saucisses bratwurst", ketchup: "🍅 Ketchup",
  currypoudre: "🌶️ Curry en poudre", paprikaFume: "🌶️ Paprika fumé",
  paprikafume: "🌶️ Paprika fumé", bicarbonate: "🧂 Bicarbonate",
  grossel: "🧂 Gros sel", raisinssecs: "🍇 Raisins secs",
  raisinsec: "🍇 Raisins secs", pommesdeterre: "🥔 Pommes de terre",
  pommeterre: "🥔 Pommes de terre", boeufbourguignon: "🥩 Bœuf à mijoter",
  betteraves: "🟣 Betteraves", chouvert: "🥬 Chou vert",
  cremefraiche: "🥛 Crème fraîche", boeufhache: "🥩 Bœuf haché",
  porchache: "🐷 Porc haché", moruedessale: "🐟 Morue dessalée",
  jalapeno: "🌶️ Jalapeños", crema: "🥛 Crema mexicaine",
  laitconcentre: "🥛 Lait concentré sucré", laitevapore: "🥛 Lait évaporé",
  fruitsrouges: "🫐 Fruits rouges", epicesmasala: "🌶️ Garam masala",
  pouletcuisses: "🍗 Cuisses de poulet", saucesoja: "🥢 Sauce soja",
  sauceaussoja: "🥢 Sauce soja", sake: "🍶 Sake",
  matcha: "🍵 Matcha (poudre)", laitamande: "🥛 Lait d'amande",
  eauchaude: "💧 Eau chaude", tofusoie: "🟩 Tofu soyeux",
  doubanjiang: "🌶️ Doubanjiang (pâte sichuanaise)", ailechalote: "🧅 Ail-échalote",
  poivresichuan: "🌶️ Poivre du Sichuan", huilepiment: "🌶️ Huile pimentée",
  huilesame: "🌰 Huile de sésame", feuilleswonton: "🥟 Feuilles de wonton",
  charcuterie: "🥩 Charcuterie", fromageraclette: "🧀 Fromage à raclette",
  oignonsblanc: "🧅 Petits oignons", saladeverte: "🥗 Salade verte",
  pain: "🥖 Pain", balsamique: "🍶 Vinaigre balsamique",
  acaipuree: "🫐 Purée d'açaí", cocoflocons: "🥥 Flocons de coco",
  grainepain: "🌾 Graines (chia, lin)", amande: "🥜 Amandes", beurredamande: "🥜 Beurre d'amande",
  huileolive: "🫒 Huile d'olive", sucreroux: "🍯 Sucre roux",
  sucrecasso: "🍯 Sucre cassonade", jaunesoeufs: "🥚 Jaunes d'œufs",
  zestecitron: "🍋 Zeste de citron", crudités: "🥕 Crudités",
  // === Incontournables ===
  fromagebeaufort: "🧀 Beaufort", fromagecomte: "🧀 Comté",
  fromageemmental: "🧀 Emmental français", painrassis: "🥖 Pain rassis",
  saintjacques: "🦪 Noix de Saint-Jacques", fleurdesel: "🧂 Fleur de sel",
  briocheoupain: "🍞 Brioche ou pain", sucresemoule: "🍬 Sucre semoule",
  poissonroche: "🐟 Poisson de roche", fenouil: "🌿 Fenouil",
  croutons: "🥖 Croûtons aillés", rouille: "🌶️ Rouille",
  bouquetgarni: "🌿 Bouquet garni",
  laitnon: "🥛 Lait", sauceokonomi: "🥢 Sauce okonomi",
  mayojaponaise: "🥚 Mayonnaise japonaise", bonite: "🐟 Bonite séchée",
  rizbasmati: "🌾 Riz basmati", epicesbiryani: "🌶️ Épices biryani (garam masala)",
  gingembreail: "🧄 Pâte gingembre-ail", pouletoupigeon: "🍗 Poulet ou pigeon",
  feuillesbrick: "📜 Feuilles de brick", epicesras: "🌶️ Ras-el-hanout",
  tagliatellesfraiches: "🍝 Tagliatelles fraîches", truffenoire: "🍄 Truffe noire",
  boeufpouramijoter: "🥩 Bœuf à mijoter", bierebrune: "🍺 Bière brune",
  painepicesmoutarde: "🥖 Pain d'épices moutardé", vergeoise: "🍯 Vergeoise (cassonade)",
  saindoux: "🥓 Saindoux",
  poudreamande: "🥜 Poudre d'amande", blancsoeufs: "🥚 Blancs d'œufs",
  ganacheoufruit: "🍫 Ganache ou confiture", arome: "✨ Arôme (vanille...)",
  levureboulanger: "🍞 Levure boulangère", cremechantilly: "🥛 Crème chantilly",
  jauneoeuf: "🥚 Jaune d'œuf", tabasco: "🌶️ Tabasco",
  farinetamisee: "🌾 Farine tamisée", chocolatnoir: "🍫 Chocolat noir", jusdecitron: "🍋 Jus de citron",
  levurechimique: "🍞 Levure chimique", pepiteschoco: "🍫 Pépites de chocolat",
  gingembre: "🫚 Gingembre", galanga: "🫚 Galanga", anis: "⭐ Anis étoilé",
  citronnelle: "🌿 Citronnelle", vanille: "🍦 Vanille", fumee: "💨 Paprika fumé",
  chermoula: "🌿 Chermoula", pesto: "🌿 Pesto",
  persil: "🌿 Persil", coriandre: "🌿 Coriandre", menthe: "🌿 Menthe fraîche",
  basilic: "🌿 Basilic", thym: "🌿 Thym", romarin: "🌿 Romarin", aneth: "🌿 Aneth",
  // == Condiments & sauces ==
  sojaS: "🍶 Sauce soja", mirin: "🍶 Mirin", saké: "🍶 Saké", hoisin: "🍶 Sauce hoisin",
  bbqSauce: "🍖 Sauce BBQ", rub: "🌶️ Rub BBQ", tahini: "🫒 Tahini",
  miso: "🌿 Miso", gochujang: "🌶️ Gochujang", vinaigre: "🍶 Vinaigre", presure: "🧪 Présure",
  // == Divers cuisine ==
  bouillon: "🍲 Bouillon", dashi: "💧 Dashi", cafe: "☕ Café expresso",
  nori: "🌿 Nori", tofu: "🧀 Tofu", wakame: "🌊 Wakamé",
  tortilla: "🌮 Tortillas", tortillas: "🌮 Tortillas", noix: "🌰 Noix",
  amandes: "🌰 Amandes", pignons: "🌰 Pignons de pin", olives: "🫒 Olives",
  palmier: "🌴 Cœurs de palmier", tahini: "🫒 Tahini",
  // == Alcools ==
  rhum: "🍶 Rhum blanc", tequila: "🥃 Tequila", vodka: "🍶 Vodka",
  gin: "🍶 Gin", bourbon: "🥃 Bourbon", cognac: "🥃 Cognac", brandy: "🥃 Brandy",
  aperol: "🍊 Aperol", campari: "🍊 Campari", vermouth: "🍷 Vermouth",
  prosecco: "🍾 Prosecco", champagne: "🍾 Champagne", tripleSec: "🍊 Triple sec",
  cointreau: "🍊 Cointreau", passoa: "🌺 Passoa", curacao: "🫐 Curaçao bleu",
  kahluaC: "☕ Kahlúa", gingerBeer: "💧 Ginger beer", limonade: "💧 Limonade",
  grenadine: "🍒 Grenadine", rose: "🍷 Rosé pétillant", sureau: "🌸 Sirop de sureau",
  espresso: "☕ Espresso", jusMixte: "🍹 Jus de fruits rouges",
  cranberry: "🍒 Jus de cranberry", bitters: "💧 Angostura bitters",
  fleurOranger: "🌸 Eau de fleur d'oranger", tonic: "💧 Tonic premium",
  eauGaz: "💧 Eau gazeuse", eau: "💧 Eau", eauChoux: "💧 Eau", eauRose: "🌹 Eau de rose",
  // == Chocolat & pâtisserie ==
  chocolat: "🍫 Chocolat noir", pepites: "🍫 Pépites de chocolat",
  cremeTruffe: "🍄 Crème de truffe", roquette: "🥬 Roquette",
  // == Ingrédients spéciaux ==
  pralin: "🌰 Pâte de pralin", proteine: "💪 Protéine", dattes: "🌴 Dattes",
  vermicelles: "🍜 Vermicelles", edamame: "🫛 Edamame",
  // == Ajouts audit complet (50 ingrédients) ==
  // Boissons / alcools
  vin: "🍷 Vin", cidre: "🍎 Cidre", saké: "🍶 Saké",
  // Légumes
  avocat: "🥑 Avocat", melon: "🍈 Melon",
  chouC: "🥬 Chou", choufleur: "🥦 Chou-fleur", betterave: "🟥 Betterave",
  bok_choy: "🥬 Bok choy", herbes: "🌿 Herbes de Provence",
  // Aromates / condiments
  ciboule: "🌿 Ciboule", ciboulette: "🌿 Ciboulette", sauge: "🌿 Sauge",
  capres: "🫒 Câpres", baies: "🫐 Baies de genièvre",
  // Sauces / pâtes
  bechamel: "🥛 Sauce béchamel", soja: "🥢 Sauce soja", chutney: "🫙 Chutney",
  pateC: "🌶️ Pâte de curry", curryVert: "🌶️ Pâte de curry vert",
  fecule: "🌾 Fécule de maïs",
  // Viandes / poissons / fruits de mer
  veau: "🥩 Veau", lard: "🥓 Lard fumé", saucisses: "🌭 Saucisses",
  merguez: "🌶️ Merguez", calamars: "🦑 Calamars", moule: "🦪 Moules",
  // Produits laitiers / œufs
  chevre: "🐐 Fromage de chèvre", camembert: "🧀 Camembert", gJaune: "🥚 Jaune d'œuf",
  // Fruits
  banane: "🍌 Banane", pomme: "🍎 Pomme", kiwi: "🥝 Kiwi", citronC: "🍋 Citron confit",
  // Fruits secs & graines
  pistaches: "🌰 Pistaches", arachide: "🥜 Arachide",
  sesame: "🫘 Graines de sésame", cacahetes: "🥜 Cacahuètes grillées",
  grainesCourge: "🎃 Graines de courge",
  // Sucré / divers
  choco: "🍫 Chocolat", biscuits: "🍪 Biscuits", gelatine: "🟦 Gélatine",
  filo: "🥟 Pâte filo", pateSablee: "🥧 Pâte sablée",
  muffins: "🧁 Muffins anglais", tteok: "🍢 Gâteaux de riz tteok",
  soba: "🍜 Nouilles soba",
  // Spécifique brioche / patisserie
  beurrage: "🧈 Beurre de tourage",
  // == Ingrédients ajoutés (50 nouvelles recettes du monde) ==
  // Viandes
  agneauHache: "🐑 Agneau haché", boeufHache: "🐮 Bœuf haché",
  viandeHachee: "🥩 Viande hachée", queueboeuf: "🐮 Queue de bœuf",
  travers: "🥩 Travers de bœuf", saucisse: "🌭 Saucisse fumée",
  serrano: "🥓 Jambon Serrano",
  // Poissons / fruits de mer
  thonHuile: "🐟 Thon à l'huile",
  // Légumes & herbes
  bokchoy: "🥬 Bok choy", brocoli: "🥦 Brocoli",
  oignonNouveau: "🧅 Oignon nouveau", oignonRouge: "🧅 Oignon rouge",
  feves: "🫛 Fèves", figues: "🟣 Figues",
  pommedeterre: "🥔 Pommes de terre", maïs: "🌽 Maïs",
  haricotsnoirs: "🫘 Haricots noirs", haricotsrouges: "🫘 Haricots rouges",
  cornichons: "🥒 Cornichons", poire: "🍐 Poire asiatique",
  pousses: "🌱 Pousses de soja",
  feuillesBric: "📄 Feuilles de brick",
  // Fromages
  burrata: "🧀 Burrata", mozzarella: "🧀 Mozzarella",
  paneer: "🧀 Paneer", fromageFrais: "🧀 Fromage frais",
  // Épices & condiments
  curcuma: "🌶️ Curcuma", garamMasala: "🌶️ Garam masala",
  cardamome: "🌰 Cardamome", fenugrec: "🌾 Fenugrec",
  origan: "🌿 Origan", laurier: "🌿 Laurier",
  sumac: "🌶️ Sumac", tamarin: "🟤 Tamarin",
  ancho: "🌶️ Piment ancho", piment_ancho: "🌶️ Piment ancho",
  piment_guajillo: "🌶️ Piment guajillo", scotchBonnet: "🌶️ Piment scotch bonnet",
  guascas: "🌿 Guascas",
  // Sauces & pâtes
  sojaSauce: "🍶 Sauce soja", nuocmam: "🐟 Nuoc-mâm",
  pateMassaman: "🌶️ Pâte de curry Massaman", kecapManis: "🍶 Kecap manis",
  sambal: "🌶️ Sambal oelek", hoisin: "🍶 Sauce hoisin",
  mayonnaise: "🥫 Mayonnaise", concentre: "🥫 Concentré de tomate",
  cremeFraiche: "🥛 Crème fraîche",
  vinaigreBalsamique: "🍶 Vinaigre balsamique", vinaigreRiz: "🍶 Vinaigre de riz",
  vinaigreVin: "🍶 Vinaigre de vin", vinaigreCidre: "🍎 Vinaigre de cidre",
  vinaigreXeres: "🍶 Vinaigre de Xérès", vinaigreBlanc: "🍶 Vinaigre blanc",
  vinaigreFramboise: "🍇 Vinaigre de framboise", vinaigreNoir: "🍶 Vinaigre noir",
  // Vins / alcools cuisine
  vinblanc: "🍷 Vin blanc", vinRiz: "🍶 Vin de riz",
  // Pains & pâtes (boulangerie)
  paton: "🍞 Pâton (pizza)", pateFeuilletee: "🥧 Pâte feuilletée",
  baos: "🥟 Petits pains bao", ramen: "🍜 Nouilles ramen",
  rizCuit: "🍚 Riz cuit (froid)",
  // Liquides / matières grasses
  laitcoco: "🥥 Lait de coco", huilesesame: "🫒 Huile de sésame",
  // Fruits secs / noix
  cacahuetes: "🥜 Cacahuètes", noixCoco: "🥥 Noix de coco râpée",
  raisinsSecs: "🟤 Raisins secs", edamames: "🌱 Edamames",
  // Boulghour & céréales
  boulghour: "🌾 Boulghour", farineRiz: "🌾 Farine de riz gluant",
  lentillesCorail: "🌾 Lentilles corail",
  // Levures & ferments
  // Pâtisserie spécifique
  kataifi: "🌾 Cheveux d'ange (kataifi)", kaya: "🍯 Confiture de coco kaya",
  dulceDeLeche: "🍯 Dulce de leche",
  eauFleurOranger: "💧 Eau de fleur d'oranger",
  colorant: "🎨 Colorant alimentaire",
  // Aromates spécifiques
  kaffir: "🍃 Feuilles de combava (kaffir)",
  citronvert: "🍋 Citron vert",
  // Divers
  sucrebrun: "🟤 Sucre brun", sucrepalme: "🟤 Sucre de palme",
  selFleur: "🧂 Fleur de sel", sauce: "🥫 Sauce",
  wasabi: "🌿 Wasabi",
};
