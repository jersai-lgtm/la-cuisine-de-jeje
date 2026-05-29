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
  // ===== BASES =====
  sel:           { prixKg: 0.85, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0 },
  huile:         { prixKg: 4.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  huileolive:    { prixKg: 8.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  huileOlive:    { prixKg: 8.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  huiledolive:   { prixKg: 8.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  huilefriture:  { prixKg: 2.50, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  huilesesame:   { prixKg: 12.0, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  huilesame:     { prixKg: 12.0, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  huileTruffe:   { prixKg: 35.0, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  huilepiment:   { prixKg: 10.0, calPer100g: 884,  lipSat: 14,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  ail:           { prixUnite: 0.10, cal: 5,         lipSat: 0,    sucre: 1,    sel: 0,    fibres: 2.1, prot: 6.4,  flv: 100 },
  gingembreail:  { prixUnite: 0.15, cal: 6,         lipSat: 0,    sucre: 1,    sel: 0,    fibres: 2.5, prot: 5,    flv: 100 },
  ailechalote:   { prixUnite: 0.15, cal: 6,         lipSat: 0,    sucre: 2,    sel: 0,    fibres: 2,   prot: 4,    flv: 100 },
  sucre:         { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  beurre:        { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0 },
  citron:        { prixUnite: 0.50, cal: 17,        lipSat: 0,    sucre: 2.5,  sel: 0,    fibres: 2.8, prot: 1.1,  flv: 100 },
  citrons:       { prixUnite: 0.50, cal: 17,        lipSat: 0,    sucre: 2.5,  sel: 0,    fibres: 2.8, prot: 1.1,  flv: 100 },
  citronC:       { prixUnite: 0.50, cal: 17,        lipSat: 0,    sucre: 2.5,  sel: 0,    fibres: 2.8, prot: 1.1,  flv: 100 },
  zestecitron:   { prixUnite: 0.10, cal: 2,         lipSat: 0,    sucre: 1,    sel: 0,    fibres: 5,   prot: 1,    flv: 100 },
  citronvert:    { prixUnite: 0.40, cal: 15,        lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 2.8, prot: 0.7,  flv: 100 },
  oignon:        { prixUnite: 0.30, cal: 40,        lipSat: 0,    sucre: 4.2,  sel: 0,    fibres: 1.7, prot: 1.1,  flv: 100 },
  oignons:       { prixUnite: 0.30, cal: 40,        lipSat: 0,    sucre: 4.2,  sel: 0,    fibres: 1.7, prot: 1.1,  flv: 100 },
  oignonRouge:   { prixUnite: 0.40, cal: 45,        lipSat: 0,    sucre: 4.8,  sel: 0,    fibres: 1.7, prot: 1.1,  flv: 100 },
  oignonrouge:   { prixUnite: 0.40, cal: 45,        lipSat: 0,    sucre: 4.8,  sel: 0,    fibres: 1.7, prot: 1.1,  flv: 100 },
  oignonNouveau: { prixUnite: 0.30, cal: 32,        lipSat: 0,    sucre: 2.3,  sel: 0,    fibres: 2.6, prot: 1.8,  flv: 100 },
  oignonsblanc:  { prixUnite: 0.30, cal: 32,        lipSat: 0,    sucre: 2.3,  sel: 0,    fibres: 2.6, prot: 1.8,  flv: 100 },
  echalote:      { prixUnite: 0.20, cal: 7,         lipSat: 0,    sucre: 2.4,  sel: 0,    fibres: 3.2, prot: 2.5,  flv: 100 },
  farine:        { prixKg: 0.85, calPer100g: 364,  lipSat: 0.2,  sucre: 0.3,  sel: 0,    fibres: 2.7, prot: 10,   flv: 0 },
  farinetamisee: { prixKg: 0.85, calPer100g: 364,  lipSat: 0.2,  sucre: 0.3,  sel: 0,    fibres: 2.7, prot: 10,   flv: 0 },
  farineRiz:     { prixKg: 2.50, calPer100g: 366,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 2.4, prot: 5.9,  flv: 0 },
  farineble:     { prixKg: 0.85, calPer100g: 364,  lipSat: 0.2,  sucre: 0.3,  sel: 0,    fibres: 2.7, prot: 10,   flv: 0 },
  farineT80:     { prixKg: 1.30, calPer100g: 348,  lipSat: 0.3,  sucre: 0.4,  sel: 0,    fibres: 7,   prot: 11,   flv: 0 },
  farineseigle:  { prixKg: 2.20, calPer100g: 325,  lipSat: 0.2,  sucre: 1,    sel: 0,    fibres: 13.2,prot: 8.5,  flv: 0 },
  farinesarrasin:{ prixKg: 3.00, calPer100g: 343,  lipSat: 0.7,  sucre: 0.5,  sel: 0,    fibres: 10,  prot: 13,   flv: 0 },
  poivre:        { prixKg: 25.0, calPer100g: 251,  lipSat: 1.4,  sucre: 0.6,  sel: 0,    fibres: 26.5,prot: 10.4, flv: 0 },
  poivresichuan: { prixKg: 50.0, calPer100g: 250,  lipSat: 1.4,  sucre: 0.6,  sel: 0,    fibres: 26,  prot: 10,   flv: 0 },
  bicarbonate:   { prixKg: 3.50, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 27,   fibres: 0,   prot: 0,    flv: 0 },
  grossel:       { prixKg: 1.00, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0 },
  fleurdesel:    { prixKg: 8.00, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0 },
  selFleur:      { prixKg: 8.00, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0 },
  selRebord:     { prixKg: 1.50, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 100,  fibres: 0,   prot: 0,    flv: 0 },
  eau:           { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  eaupiqued:     { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  eauchaude:     { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  eauChouxglace: { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  eauChoux:      { prixKg: 0.005,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  eauFleurOranger:{ prixKg: 8.00,calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  eauRose:       { prixKg: 8.00, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  fleurOranger:  { prixKg: 10.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  rose:          { prixKg: 10.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  eauGaz:        { prixKg: 0.30, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  bouillon:      { prixKg: 0.50, calPer100g: 12,   lipSat: 0.2,  sucre: 0.5,  sel: 0.9,  fibres: 0,   prot: 1,    flv: 0 },
  
  // ===== PRODUITS LAITIERS =====
  lait:          { prixKg: 1.10, calPer100g: 47,   lipSat: 1.0,  sucre: 4.8,  sel: 0.1,  fibres: 0,   prot: 3.3,  flv: 0 },
  laitnon:       { prixKg: 1.10, calPer100g: 47,   lipSat: 1.0,  sucre: 4.8,  sel: 0.1,  fibres: 0,   prot: 3.3,  flv: 0 },
  laitChoux:     { prixKg: 1.10, calPer100g: 47,   lipSat: 1.0,  sucre: 4.8,  sel: 0.1,  fibres: 0,   prot: 3.3,  flv: 0 },
  laitCreme:     { prixKg: 1.10, calPer100g: 47,   lipSat: 1.0,  sucre: 4.8,  sel: 0.1,  fibres: 0,   prot: 3.3,  flv: 0 },
  laitcoco:      { prixKg: 4.00, calPer100g: 188,  lipSat: 17,   sucre: 3,    sel: 0.04, fibres: 2.2, prot: 2.0,  flv: 0 },
  laitCoco:      { prixKg: 4.00, calPer100g: 188,  lipSat: 17,   sucre: 3,    sel: 0.04, fibres: 2.2, prot: 2.0,  flv: 0 },
  lait_coco:     { prixKg: 4.00, calPer100g: 188,  lipSat: 17,   sucre: 3,    sel: 0.04, fibres: 2.2, prot: 2.0,  flv: 0 },
  cremeCoco:     { prixKg: 5.50, calPer100g: 330,  lipSat: 32,   sucre: 3,    sel: 0.04, fibres: 2.2, prot: 3.6,  flv: 0 },
  laitconcentre: { prixKg: 3.20, calPer100g: 321,  lipSat: 5.6,  sucre: 54,   sel: 0.1,  fibres: 0,   prot: 8,    flv: 0 },
  laitevapore:   { prixKg: 3.00, calPer100g: 134,  lipSat: 4.8,  sucre: 10,   sel: 0.2,  fibres: 0,   prot: 6.8,  flv: 0 },
  laitamande:    { prixKg: 2.30, calPer100g: 24,   lipSat: 0.1,  sucre: 0.3,  sel: 0.1,  fibres: 0.4, prot: 0.6,  flv: 5 },
  noixCoco:      { prixKg: 8.00, calPer100g: 354,  lipSat: 30,   sucre: 6,    sel: 0.02, fibres: 9,   prot: 3.3,  flv: 100 },
  coco:          { prixKg: 6.00, calPer100g: 354,  lipSat: 30,   sucre: 6,    sel: 0.02, fibres: 9,   prot: 3.3,  flv: 100 },
  cocoflocons:   { prixKg: 10.0, calPer100g: 660,  lipSat: 57,   sucre: 7,    sel: 0.02, fibres: 16,  prot: 6.9,  flv: 100 },
  creme:         { prixKg: 4.50, calPer100g: 292,  lipSat: 19,   sucre: 2.9,  sel: 0.05, fibres: 0,   prot: 2.4,  flv: 0 },
  crème:         { prixKg: 4.50, calPer100g: 292,  lipSat: 19,   sucre: 2.9,  sel: 0.05, fibres: 0,   prot: 2.4,  flv: 0 },
  cremeFraiche:  { prixKg: 4.50, calPer100g: 292,  lipSat: 19,   sucre: 2.9,  sel: 0.05, fibres: 0,   prot: 2.4,  flv: 0 },
  cremefraiche:  { prixKg: 4.50, calPer100g: 292,  lipSat: 19,   sucre: 2.9,  sel: 0.05, fibres: 0,   prot: 2.4,  flv: 0 },
  cremechantilly:{ prixKg: 6.00, calPer100g: 257,  lipSat: 17,   sucre: 8,    sel: 0.05, fibres: 0,   prot: 2.2,  flv: 0 },
  cremeTruffe:   { prixKg: 25.0, calPer100g: 350,  lipSat: 20,   sucre: 2,    sel: 0.5,  fibres: 1,   prot: 3,    flv: 0 },
  cremepatissiere:{prixKg: 5.00, calPer100g: 180,  lipSat: 4,    sucre: 18,   sel: 0.1,  fibres: 0,   prot: 3.5,  flv: 0 },
  beurredamande: { prixKg: 18.0, calPer100g: 614,  lipSat: 4.0,  sucre: 5,    sel: 0,    fibres: 7,   prot: 21,   flv: 100 },
  beurreCreme:   { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0 },
  beurrCreme:    { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0 },
  beurrChoux:    { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0 },
  beurrePate:    { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0 },
  beurrage:      { prixKg: 8.50, calPer100g: 717,  lipSat: 51,   sucre: 0.8,  sel: 0.05, fibres: 0,   prot: 0.9,  flv: 0 },
  yaourt:        { prixKg: 2.00, calPer100g: 59,   lipSat: 1.0,  sucre: 4.7,  sel: 0.1,  fibres: 0,   prot: 5.7,  flv: 0 },
  fromage:       { prixKg: 12.0, calPer100g: 358,  lipSat: 19,   sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 24,   flv: 0 },
  fromagerape:   { prixKg: 14.0, calPer100g: 380,  lipSat: 20,   sucre: 0.5,  sel: 1.7,  fibres: 0,   prot: 28,   flv: 0 },
  fromagecomte:  { prixKg: 22.0, calPer100g: 410,  lipSat: 22,   sucre: 0.5,  sel: 0.7,  fibres: 0,   prot: 29,   flv: 0 },
  fromagebeaufort:{ prixKg: 28.0,calPer100g: 405,  lipSat: 21,   sucre: 0.5,  sel: 1.6,  fibres: 0,   prot: 26,   flv: 0 },
  fromageemmental:{ prixKg: 14.0,calPer100g: 378,  lipSat: 19,   sucre: 0.5,  sel: 0.7,  fibres: 0,   prot: 29,   flv: 0 },
  fromageraclette:{ prixKg: 17.0,calPer100g: 357,  lipSat: 18,   sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 22.5, flv: 0 },
  fromageFrais:  { prixKg: 6.00, calPer100g: 130,  lipSat: 6.5,  sucre: 3.5,  sel: 0.7,  fibres: 0,   prot: 8,    flv: 0 },
  fromagefrais:  { prixKg: 6.00, calPer100g: 130,  lipSat: 6.5,  sucre: 3.5,  sel: 0.7,  fibres: 0,   prot: 8,    flv: 0 },
  fromageblanc:  { prixKg: 4.50, calPer100g: 85,   lipSat: 2.0,  sucre: 4,    sel: 0.1,  fibres: 0,   prot: 7,    flv: 0 },
  parmesan:      { prixKg: 25.0, calPer100g: 431,  lipSat: 19,   sucre: 0,    sel: 1.4,  fibres: 0,   prot: 38,   flv: 0 },
  mozzarella:    { prixKg: 10.0, calPer100g: 254,  lipSat: 12,   sucre: 1,    sel: 0.8,  fibres: 0,   prot: 19,   flv: 0 },
  mozza:         { prixKg: 10.0, calPer100g: 254,  lipSat: 12,   sucre: 1,    sel: 0.8,  fibres: 0,   prot: 19,   flv: 0 },
  mascarpone:    { prixKg: 9.00, calPer100g: 429,  lipSat: 32,   sucre: 0.6,  sel: 0.1,  fibres: 0,   prot: 4.8,  flv: 0 },
  ricotta:       { prixKg: 6.50, calPer100g: 174,  lipSat: 8,    sucre: 3,    sel: 0.3,  fibres: 0,   prot: 11,   flv: 0 },
  feta:          { prixKg: 11.0, calPer100g: 264,  lipSat: 14,   sucre: 4,    sel: 3.5,  fibres: 0,   prot: 14,   flv: 0 },
  fetaOpt:       { prixKg: 11.0, calPer100g: 264,  lipSat: 14,   sucre: 4,    sel: 3.5,  fibres: 0,   prot: 14,   flv: 0 },
  gruyere:       { prixKg: 18.0, calPer100g: 413,  lipSat: 22,   sucre: 0.4,  sel: 1.7,  fibres: 0,   prot: 30,   flv: 0 },
  emmental:      { prixKg: 14.0, calPer100g: 378,  lipSat: 19,   sucre: 0.5,  sel: 0.7,  fibres: 0,   prot: 29,   flv: 0 },
  cheddar:       { prixKg: 14.0, calPer100g: 410,  lipSat: 21,   sucre: 0.5,  sel: 1.6,  fibres: 0,   prot: 25,   flv: 0 },
  chevre:        { prixKg: 16.0, calPer100g: 364,  lipSat: 21,   sucre: 2.5,  sel: 1.6,  fibres: 0,   prot: 22,   flv: 0 },
  burrata:       { prixKg: 18.0, calPer100g: 290,  lipSat: 13,   sucre: 1,    sel: 0.6,  fibres: 0,   prot: 17,   flv: 0 },
  gorgonzola:    { prixKg: 18.0, calPer100g: 353,  lipSat: 19,   sucre: 0.5,  sel: 1.8,  fibres: 0,   prot: 19,   flv: 0 },
  pecorino:      { prixKg: 22.0, calPer100g: 387,  lipSat: 17,   sucre: 0.2,  sel: 3.7,  fibres: 0,   prot: 26,   flv: 0 },
  philadelphia:  { prixKg: 12.0, calPer100g: 253,  lipSat: 15,   sucre: 4,    sel: 0.7,  fibres: 0,   prot: 5.5,  flv: 0 },
  paneer:        { prixKg: 14.0, calPer100g: 296,  lipSat: 15,   sucre: 2,    sel: 0.04, fibres: 0,   prot: 19,   flv: 0 },
  camembert:     { prixKg: 9.00, calPer100g: 300,  lipSat: 15,   sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 20,   flv: 0 },
  reblochon:     { prixKg: 16.0, calPer100g: 327,  lipSat: 17,   sucre: 0.4,  sel: 1.4,  fibres: 0,   prot: 19,   flv: 0 },
  tomme:         { prixKg: 16.0, calPer100g: 350,  lipSat: 18,   sucre: 0.5,  sel: 1.7,  fibres: 0,   prot: 24,   flv: 0 },
  
  // ===== ŒUFS =====
  oeuf:          { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0 },
  oeufs:         { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0 },
  oeufPate:      { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0 },
  oeufCreme:     { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0 },
  oeufChoux:     { prixUnite: 0.32, cal: 78,        lipSat: 3.2,  sucre: 1.1,  sel: 0.3,  fibres: 0,   prot: 12.6, flv: 0 },
  jauneoeuf:     { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0 },
  jauneoeufs:    { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0 },
  jaunes:        { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0 },
  jaunesoeufs:   { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0 },
  jaunesCreme:   { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0 },
  gJaune:        { prixUnite: 0.10, cal: 55,        lipSat: 4.0,  sucre: 0.6,  sel: 0.2,  fibres: 0,   prot: 16,   flv: 0 },
  blancsoeufs:   { prixUnite: 0.22, cal: 17,        lipSat: 0,    sucre: 0.7,  sel: 0.4,  fibres: 0,   prot: 11,   flv: 0 },
  blancs:        { prixUnite: 0.22, cal: 17,        lipSat: 0,    sucre: 0.7,  sel: 0.4,  fibres: 0,   prot: 11,   flv: 0 },
  blanc:         { prixUnite: 0.22, cal: 17,        lipSat: 0,    sucre: 0.7,  sel: 0.4,  fibres: 0,   prot: 11,   flv: 0 },
  
  // ===== LÉGUMES =====
  tomate:        { prixKg: 3.50, calPer100g: 18,   lipSat: 0,    sucre: 2.6,  sel: 0,    fibres: 1.2, prot: 0.9,  flv: 100 },
  tomates:       { prixKg: 3.50, calPer100g: 18,   lipSat: 0,    sucre: 2.6,  sel: 0,    fibres: 1.2, prot: 0.9,  flv: 100 },
  tomateCerise:  { prixKg: 6.00, calPer100g: 19,   lipSat: 0,    sucre: 3.4,  sel: 0,    fibres: 1.2, prot: 0.9,  flv: 100 },
  concentre:     { prixKg: 4.50, calPer100g: 82,   lipSat: 0.1,  sucre: 12,   sel: 0.3,  fibres: 4.3, prot: 4.3,  flv: 100 },
  carotte:        { prixKg: 1.50, calPer100g: 36,   lipSat: 0,    sucre: 4.8,  sel: 0.07, fibres: 2.8, prot: 0.9,  flv: 100 },
  carottes:       { prixKg: 1.50, calPer100g: 36,   lipSat: 0,    sucre: 4.8,  sel: 0.07, fibres: 2.8, prot: 0.9,  flv: 100 },
  pommedeterre:   { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100 },
  pommesdeterre:  { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100 },
  pdterre:        { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100 },
  pommeterre:     { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100 },
  patate:         { prixKg: 1.20, calPer100g: 77,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 2.1, prot: 2,    flv: 100 },
  patatedouce:    { prixKg: 3.00, calPer100g: 86,   lipSat: 0,    sucre: 4.2,  sel: 0.05, fibres: 3,   prot: 1.6,  flv: 100 },
  poivron:        { prixKg: 4.00, calPer100g: 26,   lipSat: 0,    sucre: 4.2,  sel: 0,    fibres: 2,   prot: 1,    flv: 100 },
  courgette:      { prixKg: 2.50, calPer100g: 16,   lipSat: 0,    sucre: 2.2,  sel: 0,    fibres: 1.1, prot: 1.2,  flv: 100 },
  courge:         { prixKg: 2.00, calPer100g: 26,   lipSat: 0,    sucre: 2.8,  sel: 0,    fibres: 0.5, prot: 1,    flv: 100 },
  aubergine:      { prixKg: 3.50, calPer100g: 25,   lipSat: 0,    sucre: 3.5,  sel: 0,    fibres: 3,   prot: 1,    flv: 100 },
  aubergines:     { prixKg: 3.50, calPer100g: 25,   lipSat: 0,    sucre: 3.5,  sel: 0,    fibres: 3,   prot: 1,    flv: 100 },
  concombre:      { prixKg: 2.00, calPer100g: 16,   lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 0.5, prot: 0.7,  flv: 100 },
  salade:         { prixKg: 4.00, calPer100g: 15,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 1.3, prot: 1.4,  flv: 100 },
  saladeverte:    { prixKg: 4.00, calPer100g: 15,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 1.3, prot: 1.4,  flv: 100 },
  laitue:         { prixKg: 4.00, calPer100g: 15,   lipSat: 0,    sucre: 0.8,  sel: 0,    fibres: 1.3, prot: 1.4,  flv: 100 },
  roquette:       { prixKg: 14.0, calPer100g: 25,   lipSat: 0,    sucre: 2,    sel: 0.07, fibres: 1.6, prot: 2.6,  flv: 100 },
  epinards:       { prixKg: 3.50, calPer100g: 23,   lipSat: 0,    sucre: 0.4,  sel: 0.2,  fibres: 2.2, prot: 2.9,  flv: 100 },
  champignons:    { prixKg: 5.00, calPer100g: 22,   lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 1,   prot: 3.1,  flv: 100 },
  shiitake:       { prixKg: 18.0, calPer100g: 34,   lipSat: 0.1,  sucre: 2.4,  sel: 0,    fibres: 2.5, prot: 2.2,  flv: 100 },
  chou:           { prixKg: 1.50, calPer100g: 25,   lipSat: 0,    sucre: 3.2,  sel: 0,    fibres: 2.5, prot: 1.3,  flv: 100 },
  chouvert:       { prixKg: 1.50, calPer100g: 25,   lipSat: 0,    sucre: 3.2,  sel: 0,    fibres: 2.5, prot: 1.3,  flv: 100 },
  chouC:          { prixKg: 1.50, calPer100g: 25,   lipSat: 0,    sucre: 3.2,  sel: 0,    fibres: 2.5, prot: 1.3,  flv: 100 },
  choufleur:      { prixKg: 3.00, calPer100g: 25,   lipSat: 0,    sucre: 1.9,  sel: 0,    fibres: 2,   prot: 2,    flv: 100 },
  bok_choy:       { prixKg: 6.00, calPer100g: 13,   lipSat: 0,    sucre: 1.2,  sel: 0.07, fibres: 1,   prot: 1.5,  flv: 100 },
  bokchoy:        { prixKg: 6.00, calPer100g: 13,   lipSat: 0,    sucre: 1.2,  sel: 0.07, fibres: 1,   prot: 1.5,  flv: 100 },
  poireaux:       { prixKg: 2.50, calPer100g: 27,   lipSat: 0,    sucre: 2,    sel: 0,    fibres: 2.2, prot: 1.5,  flv: 100 },
  navets:         { prixKg: 2.00, calPer100g: 28,   lipSat: 0,    sucre: 3.8,  sel: 0,    fibres: 1.8, prot: 0.9,  flv: 100 },
  betterave:      { prixKg: 3.00, calPer100g: 43,   lipSat: 0,    sucre: 7,    sel: 0.2,  fibres: 2.8, prot: 1.6,  flv: 100 },
  betteraves:     { prixKg: 3.00, calPer100g: 43,   lipSat: 0,    sucre: 7,    sel: 0.2,  fibres: 2.8, prot: 1.6,  flv: 100 },
  asperges:       { prixKg: 8.00, calPer100g: 20,   lipSat: 0,    sucre: 1.9,  sel: 0,    fibres: 2.1, prot: 2.2,  flv: 100 },
  brocoli:        { prixKg: 3.50, calPer100g: 34,   lipSat: 0,    sucre: 1.7,  sel: 0,    fibres: 2.6, prot: 2.8,  flv: 100 },
  edamame:        { prixKg: 8.00, calPer100g: 122,  lipSat: 0.5,  sucre: 3,    sel: 0.01, fibres: 5,   prot: 11,   flv: 100 },
  edamames:       { prixKg: 8.00, calPer100g: 122,  lipSat: 0.5,  sucre: 3,    sel: 0.01, fibres: 5,   prot: 11,   flv: 100 },
  pousses:        { prixKg: 12.0, calPer100g: 23,   lipSat: 0,    sucre: 1.8,  sel: 0,    fibres: 1.8, prot: 2.9,  flv: 100 },
  fenouil:        { prixKg: 3.50, calPer100g: 31,   lipSat: 0,    sucre: 4,    sel: 0.05, fibres: 3.1, prot: 1.2,  flv: 100 },
  celeri:         { prixKg: 2.50, calPer100g: 16,   lipSat: 0,    sucre: 1.3,  sel: 0.08, fibres: 1.6, prot: 0.7,  flv: 100 },
  cornichons:     { prixKg: 4.00, calPer100g: 12,   lipSat: 0,    sucre: 1.7,  sel: 2,    fibres: 1.2, prot: 0.5,  flv: 100 },
  capres:         { prixKg: 20.0, calPer100g: 23,   lipSat: 0,    sucre: 0.4,  sel: 7,    fibres: 3.2, prot: 2.4,  flv: 100 },
  olives:         { prixKg: 10.0, calPer100g: 115,  lipSat: 1.4,  sucre: 0,    sel: 3.3,  fibres: 3.2, prot: 0.8,  flv: 100 },
  avocat:         { prixUnite: 1.20, cal: 250,      lipSat: 2.1,  sucre: 0.7,  sel: 0,    fibres: 6.7, prot: 2,    flv: 100 },
  avocats:        { prixUnite: 1.20, cal: 250,      lipSat: 2.1,  sucre: 0.7,  sel: 0,    fibres: 6.7, prot: 2,    flv: 100 },
  mais:           { prixKg: 3.00, calPer100g: 86,   lipSat: 0.2,  sucre: 6.3,  sel: 0,    fibres: 2.7, prot: 3.3,  flv: 100 },
  "maïs":         { prixKg: 3.00, calPer100g: 86,   lipSat: 0.2,  sucre: 6.3,  sel: 0,    fibres: 2.7, prot: 3.3,  flv: 100 },
  petitspois:     { prixKg: 3.50, calPer100g: 81,   lipSat: 0.1,  sucre: 5.7,  sel: 0,    fibres: 5.1, prot: 5.4,  flv: 100 },
  pois:           { prixKg: 3.50, calPer100g: 81,   lipSat: 0.1,  sucre: 5.7,  sel: 0,    fibres: 5.1, prot: 5.4,  flv: 100 },
  haricots:       { prixKg: 4.00, calPer100g: 31,   lipSat: 0,    sucre: 3.3,  sel: 0,    fibres: 2.7, prot: 1.8,  flv: 100 },
  haricotsverts:  { prixKg: 4.00, calPer100g: 31,   lipSat: 0,    sucre: 3.3,  sel: 0,    fibres: 2.7, prot: 1.8,  flv: 100 },
  haricotsblancs: { prixKg: 3.50, calPer100g: 92,   lipSat: 0.1,  sucre: 0.3,  sel: 0,    fibres: 7,   prot: 7.5,  flv: 100 },
  haricotsnoirs:  { prixKg: 4.50, calPer100g: 91,   lipSat: 0.1,  sucre: 0.3,  sel: 0,    fibres: 8.7, prot: 8.9,  flv: 100 },
  haricotsrouges: { prixKg: 3.50, calPer100g: 127,  lipSat: 0.1,  sucre: 0.3,  sel: 0,    fibres: 6.4, prot: 8.7,  flv: 100 },
  feve:           { prixKg: 4.00, calPer100g: 88,   lipSat: 0.1,  sucre: 0.4,  sel: 0,    fibres: 5.4, prot: 7.6,  flv: 100 },
  feves:          { prixKg: 4.00, calPer100g: 88,   lipSat: 0.1,  sucre: 0.4,  sel: 0,    fibres: 5.4, prot: 7.6,  flv: 100 },
  truffenoire:    { prixKg: 800.0,calPer100g: 92,   lipSat: 0.2,  sucre: 1.4,  sel: 0.2,  fibres: 7.2, prot: 6.6,  flv: 100 },
  guascas:        { prixKg: 80.0, calPer100g: 22,   lipSat: 0,    sucre: 1,    sel: 0,    fibres: 3.6, prot: 2.8,  flv: 100 },
  crudités:       { prixKg: 3.50, calPer100g: 20,   lipSat: 0,    sucre: 2.5,  sel: 0,    fibres: 1.8, prot: 1,    flv: 100 },
  
  // ===== FRUITS =====
  banane:         { prixUnite: 0.30, cal: 89,        lipSat: 0.1,  sucre: 12.2, sel: 0,    fibres: 2.6, prot: 1.1,  flv: 100 },
  bananes:        { prixUnite: 0.30, cal: 89,        lipSat: 0.1,  sucre: 12.2, sel: 0,    fibres: 2.6, prot: 1.1,  flv: 100 },
  pomme:          { prixUnite: 0.50, cal: 52,        lipSat: 0,    sucre: 10.4, sel: 0,    fibres: 2.4, prot: 0.3,  flv: 100 },
  pommes:         { prixUnite: 0.50, cal: 52,        lipSat: 0,    sucre: 10.4, sel: 0,    fibres: 2.4, prot: 0.3,  flv: 100 },
  poire:          { prixUnite: 0.50, cal: 57,        lipSat: 0,    sucre: 9.8,  sel: 0,    fibres: 3.1, prot: 0.4,  flv: 100 },
  peche:          { prixUnite: 0.60, cal: 39,        lipSat: 0,    sucre: 8.4,  sel: 0,    fibres: 1.5, prot: 0.9,  flv: 100 },
  pasteque:       { prixKg: 1.50, calPer100g: 30,   lipSat: 0,    sucre: 6.2,  sel: 0,    fibres: 0.4, prot: 0.6,  flv: 100 },
  fraise:         { prixKg: 8.00, calPer100g: 32,   lipSat: 0,    sucre: 4.9,  sel: 0,    fibres: 2,   prot: 0.7,  flv: 100 },
  fraises:        { prixKg: 8.00, calPer100g: 32,   lipSat: 0,    sucre: 4.9,  sel: 0,    fibres: 2,   prot: 0.7,  flv: 100 },
  framboise:      { prixKg: 14.0, calPer100g: 52,   lipSat: 0,    sucre: 4.4,  sel: 0,    fibres: 6.5, prot: 1.2,  flv: 100 },
  framboises:     { prixKg: 14.0, calPer100g: 52,   lipSat: 0,    sucre: 4.4,  sel: 0,    fibres: 6.5, prot: 1.2,  flv: 100 },
  fraisesframboises:{prixKg:11.0, calPer100g: 42,   lipSat: 0,    sucre: 4.6,  sel: 0,    fibres: 4,   prot: 1,    flv: 100 },
  myrtille:       { prixKg: 18.0, calPer100g: 57,   lipSat: 0,    sucre: 9.7,  sel: 0,    fibres: 2.4, prot: 0.7,  flv: 100 },
  myrtilles:      { prixKg: 18.0, calPer100g: 57,   lipSat: 0,    sucre: 9.7,  sel: 0,    fibres: 2.4, prot: 0.7,  flv: 100 },
  baies:          { prixKg: 15.0, calPer100g: 50,   lipSat: 0,    sucre: 8,    sel: 0,    fibres: 3,   prot: 0.7,  flv: 100 },
  cerises:        { prixKg: 8.00, calPer100g: 50,   lipSat: 0,    sucre: 8,    sel: 0,    fibres: 1.6, prot: 1,    flv: 100 },
  cerise:         { prixKg: 8.00, calPer100g: 50,   lipSat: 0,    sucre: 8,    sel: 0,    fibres: 1.6, prot: 1,    flv: 100 },
  ananas:         { prixUnite: 2.50, cal: 50,        lipSat: 0,    sucre: 9.9,  sel: 0,    fibres: 1.4, prot: 0.5,  flv: 100 },
  orange:         { prixUnite: 0.70, cal: 47,        lipSat: 0,    sucre: 9.4,  sel: 0,    fibres: 2.4, prot: 0.9,  flv: 100 },
  mangue:         { prixUnite: 2.00, cal: 60,        lipSat: 0.1,  sucre: 14,   sel: 0,    fibres: 1.6, prot: 0.8,  flv: 100 },
  kiwi:           { prixUnite: 0.60, cal: 61,        lipSat: 0,    sucre: 9,    sel: 0,    fibres: 3,   prot: 1.1,  flv: 100 },
  melon:          { prixUnite: 2.50, cal: 34,        lipSat: 0,    sucre: 8,    sel: 0.02, fibres: 0.9, prot: 0.8,  flv: 100 },
  passion:        { prixUnite: 1.50, cal: 97,        lipSat: 0.1,  sucre: 11,   sel: 0,    fibres: 10,  prot: 2.2,  flv: 100 },
  fruitsrouges:   { prixKg: 12.0, calPer100g: 45,   lipSat: 0,    sucre: 6,    sel: 0,    fibres: 4,   prot: 0.9,  flv: 100 },
  fruitsfrais:    { prixKg: 5.00, calPer100g: 50,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 2,   prot: 0.7,  flv: 100 },
  fruits:         { prixKg: 5.00, calPer100g: 50,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 2,   prot: 0.7,  flv: 100 },
  figues:         { prixKg: 8.00, calPer100g: 74,   lipSat: 0,    sucre: 16,   sel: 0,    fibres: 2.9, prot: 0.8,  flv: 100 },
  pruneaux:       { prixKg: 8.00, calPer100g: 240,  lipSat: 0,    sucre: 38,   sel: 0,    fibres: 7,   prot: 2.2,  flv: 100 },
  raisinsSecs:    { prixKg: 8.00, calPer100g: 299,  lipSat: 0.1,  sucre: 59,   sel: 0,    fibres: 4,   prot: 3.1,  flv: 100 },
  raisinssecs:    { prixKg: 8.00, calPer100g: 299,  lipSat: 0.1,  sucre: 59,   sel: 0,    fibres: 4,   prot: 3.1,  flv: 100 },
  dattes:         { prixKg: 10.0, calPer100g: 277,  lipSat: 0,    sucre: 63,   sel: 0,    fibres: 6.7, prot: 1.8,  flv: 100 },
  cranberry:      { prixKg: 15.0, calPer100g: 308,  lipSat: 0.1,  sucre: 65,   sel: 0,    fibres: 5.7, prot: 0.2,  flv: 100 },
  acaipuree:      { prixKg: 18.0, calPer100g: 70,   lipSat: 1.2,  sucre: 4,    sel: 0.01, fibres: 2,   prot: 1,    flv: 100 },
  jusMixte:       { prixKg: 2.50, calPer100g: 48,   lipSat: 0,    sucre: 10,   sel: 0,    fibres: 0.5, prot: 0.5,  flv: 90 },
  orangeJus:      { prixKg: 2.00, calPer100g: 45,   lipSat: 0,    sucre: 8.4,  sel: 0,    fibres: 0.2, prot: 0.7,  flv: 90 },
  jusfruit:       { prixKg: 2.00, calPer100g: 45,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 0.3, prot: 0.5,  flv: 90 },
  
  // ===== VIANDES =====
  poulet:         { prixKg: 9.00, calPer100g: 165,  lipSat: 1.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 31,   flv: 0 },
  poulettranche:  { prixKg: 10.0, calPer100g: 110,  lipSat: 0.8,  sucre: 0,    sel: 1.8,  fibres: 0,   prot: 22,   flv: 0 },
  pouletcuisses:  { prixKg: 7.50, calPer100g: 209,  lipSat: 3.2,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0 },
  pouletHache:    { prixKg: 11.0, calPer100g: 143,  lipSat: 1.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0 },
  pouletoupigeon: { prixKg: 12.0, calPer100g: 175,  lipSat: 1.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 28,   flv: 0 },
  boeuf:          { prixKg: 22.0, calPer100g: 250,  lipSat: 6.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0 },
  boeufpouramijoter:{prixKg:18.0, calPer100g: 207,  lipSat: 5.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0 },
  boeufbourguignon:{ prixKg: 17.0,calPer100g: 207,  lipSat: 5.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0 },
  filetdeboeuf:   { prixKg: 45.0, calPer100g: 217,  lipSat: 4.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 28,   flv: 0 },
  boeufHache:     { prixKg: 14.0, calPer100g: 254,  lipSat: 7.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0 },
  boeufhache:     { prixKg: 14.0, calPer100g: 254,  lipSat: 7.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0 },
  viandeHachee:   { prixKg: 13.0, calPer100g: 254,  lipSat: 7.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0 },
  viande:         { prixKg: 15.0, calPer100g: 220,  lipSat: 5.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 26,   flv: 0 },
  porc:           { prixKg: 11.0, calPer100g: 242,  lipSat: 5.2,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 27,   flv: 0 },
  porchache:      { prixKg: 12.0, calPer100g: 263,  lipSat: 7.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0 },
  agneau:         { prixKg: 25.0, calPer100g: 294,  lipSat: 9.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0 },
  agneauHache:    { prixKg: 22.0, calPer100g: 282,  lipSat: 9.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 23,   flv: 0 },
  veau:           { prixKg: 28.0, calPer100g: 172,  lipSat: 3.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 28,   flv: 0 },
  lapin:           { prixKg: 18.0, calPer100g: 173,  lipSat: 1.9,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 33,   flv: 0 },
  canard:         { prixKg: 22.0, calPer100g: 337,  lipSat: 9.8,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 19,   flv: 0 },
  cuissecanard:   { prixKg: 20.0, calPer100g: 337,  lipSat: 9.8,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 19,   flv: 0 },
  graissecanard:  { prixKg: 12.0, calPer100g: 882,  lipSat: 35,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  foie:           { prixKg: 14.0, calPer100g: 135,  lipSat: 1.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 20,   flv: 0 },
  travers:        { prixKg: 12.0, calPer100g: 360,  lipSat: 11,   sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0 },
  jarret:         { prixKg: 10.0, calPer100g: 200,  lipSat: 5.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 28,   flv: 0 },
  joues:          { prixKg: 18.0, calPer100g: 220,  lipSat: 6.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0 },
  cotelets:       { prixKg: 16.0, calPer100g: 280,  lipSat: 9.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 24,   flv: 0 },
  os:             { prixKg: 2.00, calPer100g: 100,  lipSat: 2.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 10,   flv: 0 },
  queueboeuf:     { prixKg: 14.0, calPer100g: 270,  lipSat: 8.0,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 25,   flv: 0 },
  
  // ===== CHARCUTERIE =====
  jambon:         { prixKg: 18.0, calPer100g: 145,  lipSat: 2.0,  sucre: 1,    sel: 2.3,  fibres: 0,   prot: 21,   flv: 0 },
  bacon:          { prixKg: 17.0, calPer100g: 417,  lipSat: 14,   sucre: 0,    sel: 4.5,  fibres: 0,   prot: 13,   flv: 0 },
  lardons:        { prixKg: 11.0, calPer100g: 286,  lipSat: 9.0,  sucre: 0,    sel: 2.0,  fibres: 0,   prot: 17,   flv: 0 },
  lard:           { prixKg: 11.0, calPer100g: 286,  lipSat: 9.0,  sucre: 0,    sel: 2.0,  fibres: 0,   prot: 17,   flv: 0 },
  saucisses:      { prixKg: 10.0, calPer100g: 304,  lipSat: 9.0,  sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 13,   flv: 0 },
  saucisse:       { prixKg: 10.0, calPer100g: 304,  lipSat: 9.0,  sucre: 0.5,  sel: 1.5,  fibres: 0,   prot: 13,   flv: 0 },
  saucissefumee:  { prixKg: 15.0, calPer100g: 320,  lipSat: 10,   sucre: 0.5,  sel: 2.0,  fibres: 0,   prot: 13,   flv: 0 },
  prosciutto:     { prixKg: 35.0, calPer100g: 195,  lipSat: 2.5,  sucre: 0,    sel: 4.0,  fibres: 0,   prot: 28,   flv: 0 },
  chorizo:        { prixKg: 18.0, calPer100g: 455,  lipSat: 14,   sucre: 1,    sel: 3.0,  fibres: 0,   prot: 24,   flv: 0 },
  salami:         { prixKg: 20.0, calPer100g: 425,  lipSat: 14,   sucre: 0.5,  sel: 4.0,  fibres: 0,   prot: 22,   flv: 0 },
  merguez:        { prixKg: 14.0, calPer100g: 275,  lipSat: 9.0,  sucre: 1,    sel: 1.8,  fibres: 0,   prot: 14,   flv: 0 },
  andouillette:   { prixKg: 14.0, calPer100g: 240,  lipSat: 8.0,  sucre: 0.5,  sel: 1.7,  fibres: 0,   prot: 16,   flv: 0 },
  bratwurst:      { prixKg: 14.0, calPer100g: 297,  lipSat: 9.0,  sucre: 1,    sel: 1.8,  fibres: 0,   prot: 12,   flv: 0 },
  guanciale:      { prixKg: 28.0, calPer100g: 470,  lipSat: 14,   sucre: 0,    sel: 2.5,  fibres: 0,   prot: 16,   flv: 0 },
  nduja:          { prixKg: 22.0, calPer100g: 450,  lipSat: 13,   sucre: 0,    sel: 3.0,  fibres: 0,   prot: 19,   flv: 0 },
  charcuterie:    { prixKg: 22.0, calPer100g: 350,  lipSat: 12,   sucre: 0.5,  sel: 3.0,  fibres: 0,   prot: 22,   flv: 0 },
  saindoux:       { prixKg: 6.00, calPer100g: 902,  lipSat: 39,   sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  serrano:        { prixKg: 40.0, calPer100g: 240,  lipSat: 5.0,  sucre: 0,    sel: 5.0,  fibres: 0,   prot: 33,   flv: 0 },
  
  // ===== POISSONS & FRUITS DE MER =====
  saumon:         { prixKg: 22.0, calPer100g: 208,  lipSat: 3.1,  sucre: 0,    sel: 0.1,  fibres: 0,   prot: 20,   flv: 0 },
  saumonfrais:    { prixKg: 22.0, calPer100g: 208,  lipSat: 3.1,  sucre: 0,    sel: 0.1,  fibres: 0,   prot: 20,   flv: 0 },
  saumonfume:     { prixKg: 35.0, calPer100g: 117,  lipSat: 0.9,  sucre: 0,    sel: 3.0,  fibres: 0,   prot: 18,   flv: 0 },
  thon:           { prixKg: 20.0, calPer100g: 144,  lipSat: 1.3,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 30,   flv: 0 },
  thonHuile:      { prixKg: 14.0, calPer100g: 198,  lipSat: 1.5,  sucre: 0,    sel: 0.5,  fibres: 0,   prot: 28,   flv: 0 },
  crevettes:      { prixKg: 18.0, calPer100g: 99,   lipSat: 0.4,  sucre: 0,    sel: 0.9,  fibres: 0,   prot: 24,   flv: 0 },
  saintjacques:   { prixKg: 35.0, calPer100g: 88,   lipSat: 0.1,  sucre: 0,    sel: 0.4,  fibres: 0,   prot: 17,   flv: 0 },
  poissonroche:   { prixKg: 18.0, calPer100g: 110,  lipSat: 0.5,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 20,   flv: 0 },
  poisson:        { prixKg: 16.0, calPer100g: 105,  lipSat: 0.4,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 20,   flv: 0 },
  dorade:         { prixKg: 22.0, calPer100g: 96,   lipSat: 0.4,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 20,   flv: 0 },
  brochet:        { prixKg: 18.0, calPer100g: 88,   lipSat: 0.2,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 19,   flv: 0 },
  moules:         { prixKg: 7.00, calPer100g: 86,   lipSat: 0.4,  sucre: 0,    sel: 0.7,  fibres: 0,   prot: 12,   flv: 0 },
  moule:          { prixKg: 7.00, calPer100g: 86,   lipSat: 0.4,  sucre: 0,    sel: 0.7,  fibres: 0,   prot: 12,   flv: 0 },
  poulpe:         { prixKg: 22.0, calPer100g: 82,   lipSat: 0.2,  sucre: 0,    sel: 0.5,  fibres: 0,   prot: 15,   flv: 0 },
  calamars:       { prixKg: 15.0, calPer100g: 92,   lipSat: 0.4,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 16,   flv: 0 },
  ecrevisses:     { prixKg: 28.0, calPer100g: 82,   lipSat: 0.2,  sucre: 0,    sel: 0.3,  fibres: 0,   prot: 16,   flv: 0 },
  palourdes:      { prixKg: 16.0, calPer100g: 86,   lipSat: 0.2,  sucre: 0,    sel: 0.6,  fibres: 0,   prot: 15,   flv: 0 },
  anchois:        { prixKg: 25.0, calPer100g: 210,  lipSat: 2.2,  sucre: 0,    sel: 9.5,  fibres: 0,   prot: 29,   flv: 0 },
  anchoix:        { prixKg: 25.0, calPer100g: 210,  lipSat: 2.2,  sucre: 0,    sel: 9.5,  fibres: 0,   prot: 29,   flv: 0 },
  moruedessale:   { prixKg: 30.0, calPer100g: 290,  lipSat: 0.4,  sucre: 0,    sel: 17,   fibres: 0,   prot: 63,   flv: 0 },
  nori:           { prixKg: 80.0, calPer100g: 35,   lipSat: 0.1,  sucre: 0.5,  sel: 0.6,  fibres: 0.3, prot: 5.8,  flv: 100 },
  wakame:         { prixKg: 60.0, calPer100g: 45,   lipSat: 0.1,  sucre: 0.6,  sel: 0.9,  fibres: 0.5, prot: 3,    flv: 100 },
  bonite:         { prixKg: 30.0, calPer100g: 105,  lipSat: 0.4,  sucre: 0,    sel: 0.2,  fibres: 0,   prot: 24,   flv: 0 },
  
  // ===== CÉRÉALES, RIZ, PÂTES =====
  riz:            { prixKg: 2.50, calPer100g: 365,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 1.3, prot: 7.1,  flv: 0 },
  rizbasmati:     { prixKg: 3.50, calPer100g: 360,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 1.3, prot: 7.5,  flv: 0 },
  rizS:           { prixKg: 2.50, calPer100g: 365,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 1.3, prot: 7.1,  flv: 0 },
  rizCuit:        { prixKg: 2.50, calPer100g: 130,  lipSat: 0.1,  sucre: 0,    sel: 0,    fibres: 0.4, prot: 2.7,  flv: 0 },
  "rizGrillé":    { prixKg: 4.00, calPer100g: 365,  lipSat: 0.2,  sucre: 0.1,  sel: 0,    fibres: 1.3, prot: 7.1,  flv: 0 },
  pates:          { prixKg: 2.00, calPer100g: 371,  lipSat: 0.2,  sucre: 3.2,  sel: 0,    fibres: 3.2, prot: 13,   flv: 0 },
  spaghetti:      { prixKg: 2.00, calPer100g: 371,  lipSat: 0.2,  sucre: 3.2,  sel: 0,    fibres: 3.2, prot: 13,   flv: 0 },
  tagliatellesfraiches:{prixKg:6.0,calPer100g: 287, lipSat: 0.5,  sucre: 2,    sel: 0.4,  fibres: 2.3, prot: 11,   flv: 0 },
  lasagne:        { prixKg: 3.50, calPer100g: 371,  lipSat: 0.2,  sucre: 3.2,  sel: 0,    fibres: 3.2, prot: 13,   flv: 0 },
  nouilles:       { prixKg: 3.00, calPer100g: 380,  lipSat: 0.2,  sucre: 0.5,  sel: 0.1,  fibres: 1.5, prot: 11,   flv: 0 },
  ramen:          { prixKg: 5.00, calPer100g: 436,  lipSat: 5.0,  sucre: 1,    sel: 2.5,  fibres: 1.5, prot: 8,    flv: 0 },
  soba:           { prixKg: 6.00, calPer100g: 336,  lipSat: 0.2,  sucre: 0.5,  sel: 0.3,  fibres: 2.5, prot: 14,   flv: 0 },
  nouillesoeuf:   { prixKg: 4.00, calPer100g: 390,  lipSat: 0.6,  sucre: 1,    sel: 0.1,  fibres: 2,   prot: 13,   flv: 0 },
  vermicelles:    { prixKg: 3.00, calPer100g: 360,  lipSat: 0.2,  sucre: 1,    sel: 0,    fibres: 1,   prot: 7,    flv: 0 },
  quinoa:         { prixKg: 8.00, calPer100g: 368,  lipSat: 0.7,  sucre: 4.6,  sel: 0,    fibres: 7,   prot: 14,   flv: 0 },
  semoule:        { prixKg: 2.00, calPer100g: 360,  lipSat: 0.2,  sucre: 0.8,  sel: 0,    fibres: 3.9, prot: 12,   flv: 0 },
  polenta:        { prixKg: 3.50, calPer100g: 370,  lipSat: 0.5,  sucre: 0.8,  sel: 0,    fibres: 7,   prot: 8,    flv: 0 },
  boulghour:      { prixKg: 3.00, calPer100g: 342,  lipSat: 0.2,  sucre: 0.4,  sel: 0,    fibres: 12,  prot: 12,   flv: 0 },
  manioc:         { prixKg: 5.00, calPer100g: 160,  lipSat: 0.1,  sucre: 1.7,  sel: 0,    fibres: 1.8, prot: 1.4,  flv: 100 },
  tteok:          { prixKg: 8.00, calPer100g: 230,  lipSat: 0.2,  sucre: 0.5,  sel: 0.5,  fibres: 0.5, prot: 2,    flv: 0 },
  flocons:        { prixKg: 2.50, calPer100g: 379,  lipSat: 1.4,  sucre: 1,    sel: 0,    fibres: 10,  prot: 13,   flv: 0 },
  lentilles:      { prixKg: 4.00, calPer100g: 116,  lipSat: 0.1,  sucre: 1.8,  sel: 0,    fibres: 7.9, prot: 9,    flv: 100 },
  lentillesCorail:{ prixKg: 5.00, calPer100g: 350,  lipSat: 0.2,  sucre: 1,    sel: 0,    fibres: 11,  prot: 24,   flv: 100 },
  poischiches:    { prixKg: 3.50, calPer100g: 364,  lipSat: 0.7,  sucre: 11,   sel: 0,    fibres: 17,  prot: 19,   flv: 100 },
  
  // ===== PAINS & BOULANGERIE =====
  pain:           { prixKg: 4.50, calPer100g: 265,  lipSat: 0.7,  sucre: 5.7,  sel: 1.4,  fibres: 4,   prot: 9,    flv: 0 },
  painrassis:     { prixKg: 3.00, calPer100g: 265,  lipSat: 0.7,  sucre: 5.7,  sel: 1.4,  fibres: 4,   prot: 9,    flv: 0 },
  briocheoupain:  { prixKg: 7.00, calPer100g: 310,  lipSat: 6,    sucre: 12,   sel: 0.9,  fibres: 2.5, prot: 8,    flv: 0 },
  baguette:       { prixKg: 4.00, calPer100g: 274,  lipSat: 0.4,  sucre: 1.2,  sel: 1.6,  fibres: 3.5, prot: 9,    flv: 0 },
  buns:           { prixKg: 6.00, calPer100g: 290,  lipSat: 1.5,  sucre: 7,    sel: 1.0,  fibres: 2.5, prot: 9,    flv: 0 },
  pita:           { prixKg: 5.00, calPer100g: 275,  lipSat: 0.4,  sucre: 2,    sel: 1.0,  fibres: 2.7, prot: 9,    flv: 0 },
  painpita:       { prixKg: 5.00, calPer100g: 275,  lipSat: 0.4,  sucre: 2,    sel: 1.0,  fibres: 2.7, prot: 9,    flv: 0 },
  tortillas:      { prixKg: 5.00, calPer100g: 290,  lipSat: 1.0,  sucre: 1.5,  sel: 1.5,  fibres: 3,   prot: 8,    flv: 0 },
  tortilla:       { prixKg: 5.00, calPer100g: 290,  lipSat: 1.0,  sucre: 1.5,  sel: 1.5,  fibres: 3,   prot: 8,    flv: 0 },
  croutons:       { prixKg: 6.00, calPer100g: 407,  lipSat: 2.5,  sucre: 3,    sel: 2.5,  fibres: 5,   prot: 12,   flv: 0 },
  chapelure:      { prixKg: 4.00, calPer100g: 397,  lipSat: 0.5,  sucre: 4.0,  sel: 1.5,  fibres: 4.5, prot: 13,   flv: 0 },
  panko:          { prixKg: 6.00, calPer100g: 390,  lipSat: 0.5,  sucre: 2,    sel: 1.0,  fibres: 4,   prot: 12,   flv: 0 },
  levain:         { prixKg: 5.00, calPer100g: 250,  lipSat: 0.5,  sucre: 1,    sel: 1.2,  fibres: 4,   prot: 9,    flv: 0 },
  
  // ===== PÂTES (à dérouler) =====
  pate:           { prixKg: 5.00, calPer100g: 280,  lipSat: 5,    sucre: 5,    sel: 1.0,  fibres: 2,   prot: 7,    flv: 0 },
  paton:          { prixKg: 1.50, calPer100g: 280,  lipSat: 5,    sucre: 5,    sel: 1.0,  fibres: 2,   prot: 7,    flv: 0 },
  feuilletee:     { prixKg: 6.00, calPer100g: 420,  lipSat: 15,   sucre: 1,    sel: 1.1,  fibres: 2,   prot: 6,    flv: 0 },
  patefeuilletee: { prixKg: 6.00, calPer100g: 420,  lipSat: 15,   sucre: 1,    sel: 1.1,  fibres: 2,   prot: 6,    flv: 0 },
  pateFeuilletee: { prixKg: 6.00, calPer100g: 420,  lipSat: 15,   sucre: 1,    sel: 1.1,  fibres: 2,   prot: 6,    flv: 0 },
  patebrisee:     { prixKg: 5.50, calPer100g: 390,  lipSat: 11,   sucre: 1,    sel: 1.0,  fibres: 2,   prot: 6,    flv: 0 },
  pateSablee:     { prixKg: 5.50, calPer100g: 440,  lipSat: 12,   sucre: 20,   sel: 0.5,  fibres: 1.5, prot: 6,    flv: 0 },
  pateC:          { prixKg: 5.00, calPer100g: 400,  lipSat: 11,   sucre: 8,    sel: 0.8,  fibres: 2,   prot: 6,    flv: 0 },
  filo:           { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0 },
  feuillesFilo:   { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0 },
  feuillesBric:   { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0 },
  feuillesBrick:  { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0 },
  feuillesbrick:  { prixKg: 6.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0 },
  feuilleswonton: { prixKg: 7.00, calPer100g: 300,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 1.5, prot: 9,    flv: 0 },
  baos:           { prixKg: 8.00, calPer100g: 240,  lipSat: 1.0,  sucre: 4,    sel: 0.8,  fibres: 1.5, prot: 7,    flv: 0 },
  kataifi:        { prixKg: 10.0, calPer100g: 380,  lipSat: 0.5,  sucre: 3,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0 },
  feuilles:       { prixKg: 5.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0 },
  feuille:        { prixKg: 5.00, calPer100g: 290,  lipSat: 0.5,  sucre: 1,    sel: 1.0,  fibres: 2,   prot: 8,    flv: 0 },
  
  // ===== SUCRES & DOUCEURS =====
  cassonade:      { prixKg: 1.80, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucresemoule:   { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucreglace:     { prixKg: 1.50, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucreGlace:     { prixKg: 1.50, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucreCreme:     { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucrebrun:      { prixKg: 1.80, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucreroux:      { prixKg: 1.80, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucrecasso:     { prixKg: 1.80, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  vergeoise:      { prixKg: 3.00, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucrepalme:     { prixKg: 6.00, calPer100g: 383,  lipSat: 0,    sucre: 95,   sel: 0,    fibres: 0,   prot: 1,    flv: 0 },
  sucreCaramel:   { prixKg: 4.00, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucrecaramel:   { prixKg: 4.00, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucreIles:      { prixKg: 3.00, calPer100g: 380,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sucreMeringue:  { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  gSucre:         { prixKg: 1.20, calPer100g: 387,  lipSat: 0,    sucre: 100,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  miel:           { prixKg: 14.0, calPer100g: 304,  lipSat: 0,    sucre: 82,   sel: 0,    fibres: 0.2, prot: 0.3,  flv: 0 },
  sirop:          { prixKg: 10.0, calPer100g: 310,  lipSat: 0,    sucre: 78,   sel: 0.1,  fibres: 0,   prot: 0.1,  flv: 0 },
  caramel:        { prixKg: 8.00, calPer100g: 380,  lipSat: 5,    sucre: 75,   sel: 0.2,  fibres: 0,   prot: 2,    flv: 0 },
  dulceDeLeche:   { prixKg: 8.00, calPer100g: 315,  lipSat: 4,    sucre: 55,   sel: 0.3,  fibres: 0,   prot: 7,    flv: 0 },
  pralin:         { prixKg: 16.0, calPer100g: 530,  lipSat: 4,    sucre: 50,   sel: 0,    fibres: 5,   prot: 10,   flv: 100 },
  fondant:        { prixKg: 8.00, calPer100g: 400,  lipSat: 0,    sucre: 96,   sel: 0,    fibres: 0,   prot: 0.5,  flv: 0 },
  chocolat:       { prixKg: 14.0, calPer100g: 546,  lipSat: 19,   sucre: 48,   sel: 0.1,  fibres: 7,   prot: 7.7,  flv: 30 },
  chocolatnoir:   { prixKg: 18.0, calPer100g: 590,  lipSat: 23,   sucre: 24,   sel: 0,    fibres: 11,  prot: 7.8,  flv: 50 },
  chocolatNoir:   { prixKg: 18.0, calPer100g: 590,  lipSat: 23,   sucre: 24,   sel: 0,    fibres: 11,  prot: 7.8,  flv: 50 },
  choco:          { prixKg: 14.0, calPer100g: 546,  lipSat: 19,   sucre: 48,   sel: 0.1,  fibres: 7,   prot: 7.7,  flv: 30 },
  pepiteschoco:   { prixKg: 14.0, calPer100g: 480,  lipSat: 17,   sucre: 56,   sel: 0.05, fibres: 4,   prot: 4,    flv: 0 },
  pepites:        { prixKg: 14.0, calPer100g: 480,  lipSat: 17,   sucre: 56,   sel: 0.05, fibres: 4,   prot: 4,    flv: 0 },
  cacao:          { prixKg: 18.0, calPer100g: 228,  lipSat: 8,    sucre: 1,    sel: 0,    fibres: 33,  prot: 19,   flv: 30 },
  ganacheoufruit: { prixKg: 12.0, calPer100g: 400,  lipSat: 15,   sucre: 35,   sel: 0.1,  fibres: 3,   prot: 5,    flv: 30 },
  glace:          { prixKg: 6.00, calPer100g: 207,  lipSat: 7,    sucre: 21,   sel: 0.2,  fibres: 0.5, prot: 3.5,  flv: 0 },
  glacevanille:   { prixKg: 6.00, calPer100g: 207,  lipSat: 7,    sucre: 21,   sel: 0.2,  fibres: 0.5, prot: 3.5,  flv: 0 },
  
  // ===== ÉPICES & AROMATES (utilisés en très petite quantité) =====
  vanille:        { prixKg: 800.0,calPer100g: 288,  lipSat: 0,    sucre: 13,   sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  cannelle:       { prixKg: 50.0, calPer100g: 247,  lipSat: 0.3,  sucre: 2.2,  sel: 0,    fibres: 53,  prot: 4,    flv: 0 },
  gingembre:      { prixKg: 12.0, calPer100g: 80,   lipSat: 0.2,  sucre: 1.7,  sel: 0,    fibres: 2,   prot: 1.8,  flv: 100 },
  curcuma:        { prixKg: 35.0, calPer100g: 312,  lipSat: 1,    sucre: 3,    sel: 0,    fibres: 22,  prot: 9.7,  flv: 0 },
  paprika:        { prixKg: 25.0, calPer100g: 282,  lipSat: 2.1,  sucre: 10,   sel: 0,    fibres: 35,  prot: 14,   flv: 0 },
  paprikaFume:    { prixKg: 30.0, calPer100g: 282,  lipSat: 2.1,  sucre: 10,   sel: 0,    fibres: 35,  prot: 14,   flv: 0 },
  paprikafume:    { prixKg: 30.0, calPer100g: 282,  lipSat: 2.1,  sucre: 10,   sel: 0,    fibres: 35,  prot: 14,   flv: 0 },
  cumin:          { prixKg: 25.0, calPer100g: 375,  lipSat: 1.5,  sucre: 2.3,  sel: 0,    fibres: 11,  prot: 18,   flv: 0 },
  fenugrec:       { prixKg: 30.0, calPer100g: 323,  lipSat: 1.5,  sucre: 0,    sel: 0,    fibres: 25,  prot: 23,   flv: 0 },
  herbesprovence: { prixKg: 40.0, calPer100g: 280,  lipSat: 0.4,  sucre: 0,    sel: 0.1,  fibres: 64,  prot: 9,    flv: 0 },
  persil:         { prixKg: 14.0, calPer100g: 36,   lipSat: 0.1,  sucre: 0.9,  sel: 0.1,  fibres: 3.3, prot: 3,    flv: 100 },
  coriandre:      { prixKg: 14.0, calPer100g: 23,   lipSat: 0,    sucre: 0.9,  sel: 0.1,  fibres: 2.8, prot: 2.1,  flv: 100 },
  basilic:        { prixKg: 18.0, calPer100g: 23,   lipSat: 0,    sucre: 0.3,  sel: 0,    fibres: 1.6, prot: 3.2,  flv: 100 },
  menthe:         { prixKg: 16.0, calPer100g: 70,   lipSat: 0.2,  sucre: 0,    sel: 0,    fibres: 8,   prot: 3.8,  flv: 100 },
  ciboule:        { prixKg: 14.0, calPer100g: 32,   lipSat: 0,    sucre: 1.9,  sel: 0,    fibres: 2.6, prot: 1.8,  flv: 100 },
  ciboulette:     { prixKg: 14.0, calPer100g: 32,   lipSat: 0,    sucre: 1.9,  sel: 0,    fibres: 2.6, prot: 1.8,  flv: 100 },
  romarin:        { prixKg: 18.0, calPer100g: 131,  lipSat: 2.8,  sucre: 0,    sel: 0,    fibres: 14,  prot: 3.3,  flv: 0 },
  thym:           { prixKg: 18.0, calPer100g: 101,  lipSat: 0.5,  sucre: 0,    sel: 0,    fibres: 14,  prot: 5.6,  flv: 0 },
  aneth:          { prixKg: 18.0, calPer100g: 43,   lipSat: 0,    sucre: 0,    sel: 0,    fibres: 2.1, prot: 3.5,  flv: 100 },
  citronnelle:    { prixKg: 14.0, calPer100g: 99,   lipSat: 0.1,  sucre: 0,    sel: 0,    fibres: 0,   prot: 1.8,  flv: 0 },
  laurier:        { prixKg: 30.0, calPer100g: 313,  lipSat: 2.3,  sucre: 0,    sel: 0,    fibres: 26,  prot: 7.6,  flv: 0 },
  sauge:          { prixKg: 20.0, calPer100g: 315,  lipSat: 7,    sucre: 0,    sel: 0.04, fibres: 40,  prot: 11,   flv: 0 },
  origan:         { prixKg: 25.0, calPer100g: 265,  lipSat: 0.4,  sucre: 4,    sel: 0,    fibres: 43,  prot: 9,    flv: 0 },
  herbes:         { prixKg: 18.0, calPer100g: 50,   lipSat: 0.1,  sucre: 0.5,  sel: 0,    fibres: 4,   prot: 3,    flv: 100 },
  bouquetgarni:   { prixKg: 20.0, calPer100g: 200,  lipSat: 0.5,  sucre: 0,    sel: 0,    fibres: 25,  prot: 7,    flv: 50 },
  kaffir:         { prixKg: 50.0, calPer100g: 30,   lipSat: 0,    sucre: 0,    sel: 0,    fibres: 5,   prot: 1,    flv: 0 },
  galanga:        { prixKg: 30.0, calPer100g: 71,   lipSat: 0.1,  sucre: 0,    sel: 0,    fibres: 4.5, prot: 1,    flv: 100 },
  cardamome:      { prixKg: 80.0, calPer100g: 311,  lipSat: 0.7,  sucre: 0,    sel: 0,    fibres: 28,  prot: 11,   flv: 0 },
  sumac:          { prixKg: 60.0, calPer100g: 280,  lipSat: 0.3,  sucre: 2,    sel: 0,    fibres: 8,   prot: 6,    flv: 0 },
  anis:           { prixKg: 30.0, calPer100g: 337,  lipSat: 0.6,  sucre: 0,    sel: 0,    fibres: 15,  prot: 18,   flv: 0 },
  safran:         { prixKg: 5000.0,calPer100g: 310, lipSat: 1.6,  sucre: 0,    sel: 0,    fibres: 4,   prot: 11,   flv: 0 },
  muscade:        { prixKg: 60.0, calPer100g: 525,  lipSat: 25,   sucre: 28,   sel: 0,    fibres: 21,  prot: 6,    flv: 0 },
  curry:          { prixKg: 25.0, calPer100g: 325,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 53,  prot: 13,   flv: 0 },
  currypoudre:    { prixKg: 25.0, calPer100g: 325,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 53,  prot: 13,   flv: 0 },
  curryVert:      { prixKg: 35.0, calPer100g: 90,   lipSat: 0.5,  sucre: 2,    sel: 3,    fibres: 3,   prot: 3,    flv: 50 },
  pateMassaman:   { prixKg: 35.0, calPer100g: 110,  lipSat: 1,    sucre: 5,    sel: 3,    fibres: 3,   prot: 3,    flv: 30 },
  pateCurry:      { prixKg: 30.0, calPer100g: 100,  lipSat: 1,    sucre: 4,    sel: 3,    fibres: 3,   prot: 3,    flv: 30 },
  masala:         { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0 },
  garamMasala:    { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0 },
  epicesbiryani:  { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0 },
  epicesras:      { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0 },
  epicesmasala:   { prixKg: 35.0, calPer100g: 320,  lipSat: 1.5,  sucre: 3,    sel: 0.05, fibres: 30,  prot: 12,   flv: 0 },
  chermoula:      { prixKg: 18.0, calPer100g: 100,  lipSat: 0.5,  sucre: 1,    sel: 1,    fibres: 5,   prot: 2,    flv: 50 },
  rub:            { prixKg: 25.0, calPer100g: 280,  lipSat: 1,    sucre: 30,   sel: 5,    fibres: 5,   prot: 5,    flv: 0 },
  fumee:          { prixKg: 50.0, calPer100g: 30,   lipSat: 0,    sucre: 5,    sel: 1,    fibres: 0,   prot: 0,    flv: 0 },
  piment:         { prixKg: 14.0, calPer100g: 40,   lipSat: 0.1,  sucre: 5,    sel: 0,    fibres: 1.5, prot: 1.9,  flv: 100 },
  scotchBonnet:   { prixKg: 20.0, calPer100g: 40,   lipSat: 0.1,  sucre: 5,    sel: 0,    fibres: 1.5, prot: 1.9,  flv: 100 },
  jalapeno:       { prixKg: 14.0, calPer100g: 29,   lipSat: 0.1,  sucre: 4,    sel: 0,    fibres: 2.8, prot: 0.9,  flv: 100 },
  piment_guajillo:{ prixKg: 25.0, calPer100g: 270,  lipSat: 1.5,  sucre: 10,   sel: 0.1,  fibres: 28,  prot: 11,   flv: 0 },
  piment_ancho:   { prixKg: 25.0, calPer100g: 280,  lipSat: 1.5,  sucre: 12,   sel: 0.1,  fibres: 28,  prot: 12,   flv: 0 },
  ancho:          { prixKg: 25.0, calPer100g: 280,  lipSat: 1.5,  sucre: 12,   sel: 0.1,  fibres: 28,  prot: 12,   flv: 0 },
  arome:          { prixKg: 30.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  colorant:       { prixKg: 30.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  ferment:        { prixKg: 30.0, calPer100g: 100,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 12,   flv: 0 },
  gelatine:       { prixKg: 25.0, calPer100g: 335,  lipSat: 0,    sucre: 0,    sel: 0.2,  fibres: 0,   prot: 84,   flv: 0 },
  
  // ===== SAUCES & CONDIMENTS =====
  vinaigre:       { prixKg: 2.50, calPer100g: 21,   lipSat: 0,    sucre: 0.4,  sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  vinaigreBalsamique:{prixKg:8.0, calPer100g: 88,   lipSat: 0,    sucre: 15,   sel: 0,    fibres: 0,   prot: 0.5,  flv: 0 },
  balsamique:     { prixKg: 8.00, calPer100g: 88,   lipSat: 0,    sucre: 15,   sel: 0,    fibres: 0,   prot: 0.5,  flv: 0 },
  vinaigreRiz:    { prixKg: 5.00, calPer100g: 30,   lipSat: 0,    sucre: 5,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  moutarde:       { prixKg: 6.00, calPer100g: 134,  lipSat: 0.3,  sucre: 5.4,  sel: 5.5,  fibres: 5.3, prot: 8,    flv: 0 },
  saucesoja:      { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0 },
  sojaS:          { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0 },
  sojaSauce:      { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0 },
  sauceaussoja:   { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0 },
  soja:           { prixKg: 4.50, calPer100g: 53,   lipSat: 0,    sucre: 0.4,  sel: 14.5, fibres: 0.8, prot: 8,    flv: 0 },
  mirin:          { prixKg: 8.00, calPer100g: 240,  lipSat: 0,    sucre: 47,   sel: 0.1,  fibres: 0,   prot: 0.2,  flv: 0 },
  "saké":         { prixKg: 10.0, calPer100g: 130,  lipSat: 0,    sucre: 1,    sel: 0,    fibres: 0,   prot: 0.5,  flv: 0 },
  sake:           { prixKg: 10.0, calPer100g: 130,  lipSat: 0,    sucre: 1,    sel: 0,    fibres: 0,   prot: 0.5,  flv: 0 },
  miso:           { prixKg: 12.0, calPer100g: 199,  lipSat: 1.0,  sucre: 6,    sel: 10,   fibres: 5.4, prot: 12,   flv: 30 },
  dashi:          { prixKg: 18.0, calPer100g: 15,   lipSat: 0,    sucre: 0,    sel: 2,    fibres: 0,   prot: 1,    flv: 0 },
  nuocmam:        { prixKg: 6.00, calPer100g: 35,   lipSat: 0,    sucre: 4,    sel: 18,   fibres: 0,   prot: 4,    flv: 0 },
  hoisin:         { prixKg: 7.00, calPer100g: 220,  lipSat: 0.5,  sucre: 35,   sel: 4,    fibres: 2.6, prot: 3.4,  flv: 0 },
  kecapManis:     { prixKg: 8.00, calPer100g: 260,  lipSat: 0,    sucre: 58,   sel: 5,    fibres: 0,   prot: 2,    flv: 0 },
  sambal:         { prixKg: 10.0, calPer100g: 70,   lipSat: 0.2,  sucre: 7,    sel: 2,    fibres: 2,   prot: 1.5,  flv: 50 },
  gochujang:      { prixKg: 10.0, calPer100g: 240,  lipSat: 0.5,  sucre: 35,   sel: 4,    fibres: 4,   prot: 4,    flv: 30 },
  doubanjiang:    { prixKg: 10.0, calPer100g: 150,  lipSat: 0.5,  sucre: 5,    sel: 8,    fibres: 5,   prot: 7,    flv: 30 },
  tahini:         { prixKg: 12.0, calPer100g: 595,  lipSat: 7,    sucre: 0,    sel: 0.1,  fibres: 9,   prot: 17,   flv: 100 },
  pesto:          { prixKg: 14.0, calPer100g: 450,  lipSat: 6.5,  sucre: 3,    sel: 2.2,  fibres: 2.5, prot: 6,    flv: 50 },
  mayonnaise:     { prixKg: 6.00, calPer100g: 680,  lipSat: 6,    sucre: 1.6,  sel: 1.4,  fibres: 0,   prot: 1.1,  flv: 0 },
  mayojaponaise:  { prixKg: 8.00, calPer100g: 700,  lipSat: 7,    sucre: 2,    sel: 1.5,  fibres: 0,   prot: 1.2,  flv: 0 },
  sauceokonomi:   { prixKg: 8.00, calPer100g: 150,  lipSat: 0.5,  sucre: 30,   sel: 3.5,  fibres: 1,   prot: 1,    flv: 0 },
  ketchup:        { prixKg: 4.00, calPer100g: 100,  lipSat: 0,    sucre: 23,   sel: 1.9,  fibres: 0.8, prot: 1.2,  flv: 100 },
  tabasco:        { prixKg: 30.0, calPer100g: 12,   lipSat: 0,    sucre: 0,    sel: 5,    fibres: 0,   prot: 1.3,  flv: 100 },
  bbqSauce:       { prixKg: 6.00, calPer100g: 175,  lipSat: 0,    sucre: 35,   sel: 2.5,  fibres: 1,   prot: 1,    flv: 50 },
  wasabi:         { prixKg: 30.0, calPer100g: 109,  lipSat: 0.1,  sucre: 7,    sel: 0.8,  fibres: 8,   prot: 5,    flv: 50 },
  tamarin:        { prixKg: 12.0, calPer100g: 240,  lipSat: 0.3,  sucre: 38,   sel: 0,    fibres: 5.1, prot: 2.8,  flv: 100 },
  chutney:        { prixKg: 7.00, calPer100g: 250,  lipSat: 0.5,  sucre: 50,   sel: 0.5,  fibres: 2,   prot: 1,    flv: 50 },
  confiture:      { prixKg: 5.00, calPer100g: 280,  lipSat: 0,    sucre: 67,   sel: 0,    fibres: 1,   prot: 0.4,  flv: 50 },
  sambar:         { prixKg: 8.00, calPer100g: 100,  lipSat: 0.5,  sucre: 2,    sel: 1,    fibres: 4,   prot: 5,    flv: 50 },
  sauce:          { prixKg: 6.00, calPer100g: 150,  lipSat: 2,    sucre: 8,    sel: 1.5,  fibres: 1,   prot: 2,    flv: 30 },
  crema:          { prixKg: 4.50, calPer100g: 195,  lipSat: 12,   sucre: 3,    sel: 0.1,  fibres: 0,   prot: 2.5,  flv: 0 },
  bechamel:       { prixKg: 4.00, calPer100g: 130,  lipSat: 3,    sucre: 5,    sel: 0.5,  fibres: 0,   prot: 4,    flv: 0 },
  ragu:           { prixKg: 6.00, calPer100g: 130,  lipSat: 2,    sucre: 4,    sel: 1,    fibres: 1.5, prot: 8,    flv: 30 },
  rouille:        { prixKg: 8.00, calPer100g: 350,  lipSat: 5,    sucre: 1,    sel: 1,    fibres: 1,   prot: 3,    flv: 30 },
  coulis:         { prixKg: 5.00, calPer100g: 60,   lipSat: 0,    sucre: 10,   sel: 0.1,  fibres: 1,   prot: 1,    flv: 100 },
  
  // ===== VINS & ALCOOLS =====
  vin:            { prixKg: 8.00, calPer100g: 85,   lipSat: 0,    sucre: 0.6,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  vinblanc:       { prixKg: 8.00, calPer100g: 82,   lipSat: 0,    sucre: 0.6,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  vinrouge:       { prixKg: 8.00, calPer100g: 85,   lipSat: 0,    sucre: 0.6,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  marsala:        { prixKg: 12.0, calPer100g: 150,  lipSat: 0,    sucre: 9,    sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  champagne:      { prixKg: 30.0, calPer100g: 76,   lipSat: 0,    sucre: 1.4,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  prosecco:       { prixKg: 12.0, calPer100g: 80,   lipSat: 0,    sucre: 1.4,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  cidre:          { prixKg: 4.00, calPer100g: 49,   lipSat: 0,    sucre: 2.6,  sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  bierebrune:     { prixKg: 4.50, calPer100g: 50,   lipSat: 0,    sucre: 1,    sel: 0,    fibres: 0,   prot: 0.6,  flv: 0 },
  rhum:           { prixKg: 25.0, calPer100g: 231,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  vodka:          { prixKg: 22.0, calPer100g: 231,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  tequila:        { prixKg: 28.0, calPer100g: 231,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  cognac:         { prixKg: 50.0, calPer100g: 240,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  bourbon:        { prixKg: 35.0, calPer100g: 240,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  brandy:         { prixKg: 30.0, calPer100g: 240,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  kirsch:         { prixKg: 30.0, calPer100g: 240,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  gin:            { prixKg: 28.0, calPer100g: 263,  lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  cointreau:      { prixKg: 35.0, calPer100g: 330,  lipSat: 0,    sucre: 24,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  tripleSec:      { prixKg: 22.0, calPer100g: 250,  lipSat: 0,    sucre: 20,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  curacao:        { prixKg: 18.0, calPer100g: 240,  lipSat: 0,    sucre: 24,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  aperol:         { prixKg: 15.0, calPer100g: 120,  lipSat: 0,    sucre: 22,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  campari:        { prixKg: 22.0, calPer100g: 240,  lipSat: 0,    sucre: 23,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  vermouth:       { prixKg: 12.0, calPer100g: 158,  lipSat: 0,    sucre: 16,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  passoa:         { prixKg: 22.0, calPer100g: 250,  lipSat: 0,    sucre: 32,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  amaretto:       { prixKg: 25.0, calPer100g: 310,  lipSat: 0,    sucre: 35,   sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  kahluaC:        { prixKg: 25.0, calPer100g: 340,  lipSat: 0,    sucre: 35,   sel: 0,    fibres: 0,   prot: 0.2,  flv: 0 },
  bitters:        { prixKg: 30.0, calPer100g: 240,  lipSat: 0,    sucre: 5,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  grenadine:      { prixKg: 5.00, calPer100g: 250,  lipSat: 0,    sucre: 60,   sel: 0,    fibres: 0,   prot: 0,    flv: 30 },
  limonade:       { prixKg: 1.50, calPer100g: 38,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  tonic:          { prixKg: 2.00, calPer100g: 34,   lipSat: 0,    sucre: 8,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  gingerBeer:     { prixKg: 3.00, calPer100g: 38,   lipSat: 0,    sucre: 9,    sel: 0,    fibres: 0,   prot: 0,    flv: 0 },
  sureau:         { prixKg: 12.0, calPer100g: 90,   lipSat: 0,    sucre: 18,   sel: 0,    fibres: 0,   prot: 0,    flv: 50 },
  cafe:           { prixKg: 25.0, calPer100g: 2,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  espresso:       { prixKg: 25.0, calPer100g: 2,    lipSat: 0,    sucre: 0,    sel: 0,    fibres: 0,   prot: 0.1,  flv: 0 },
  matcha:         { prixKg: 80.0, calPer100g: 280,  lipSat: 1,    sucre: 5,    sel: 0,    fibres: 38,  prot: 30,   flv: 0 },
  
  // ===== OLÉAGINEUX & GRAINES =====
  amande:         { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100 },
  amandes:        { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100 },
  poudreamande:   { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100 },
  poudreAmande:   { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100 },
  poudreamandes:  { prixKg: 18.0, calPer100g: 579,  lipSat: 3.8,  sucre: 4.4,  sel: 0,    fibres: 12.5,prot: 21,   flv: 100 },
  noix:           { prixKg: 18.0, calPer100g: 654,  lipSat: 6.1,  sucre: 2.6,  sel: 0,    fibres: 6.7, prot: 15,   flv: 100 },
  noisettes:      { prixKg: 16.0, calPer100g: 628,  lipSat: 4.5,  sucre: 4.3,  sel: 0,    fibres: 9.7, prot: 15,   flv: 100 },
  pignons:        { prixKg: 40.0, calPer100g: 673,  lipSat: 4.9,  sucre: 3.6,  sel: 0,    fibres: 3.7, prot: 14,   flv: 100 },
  pistaches:      { prixKg: 22.0, calPer100g: 562,  lipSat: 5.4,  sucre: 7.7,  sel: 0,    fibres: 10.6,prot: 20,   flv: 100 },
  cacahuetes:     { prixKg: 8.00, calPer100g: 567,  lipSat: 6.3,  sucre: 4.7,  sel: 0,    fibres: 8.5, prot: 26,   flv: 100 },
  cacahetes:      { prixKg: 8.00, calPer100g: 567,  lipSat: 6.3,  sucre: 4.7,  sel: 0,    fibres: 8.5, prot: 26,   flv: 100 },
  arachide:       { prixKg: 8.00, calPer100g: 567,  lipSat: 6.3,  sucre: 4.7,  sel: 0,    fibres: 8.5, prot: 26,   flv: 100 },
  "cacahuetespurée":{prixKg:10.0, calPer100g: 597,  lipSat: 6.0,  sucre: 5.5,  sel: 0.5,  fibres: 8,   prot: 23,   flv: 100 },
  piniots:        { prixKg: 40.0, calPer100g: 673,  lipSat: 4.9,  sucre: 3.6,  sel: 0,    fibres: 3.7, prot: 14,   flv: 100 },
  granola:        { prixKg: 8.00, calPer100g: 471,  lipSat: 3.5,  sucre: 16,   sel: 0.1,  fibres: 7,   prot: 11,   flv: 50 },
  grainepain:     { prixKg: 12.0, calPer100g: 530,  lipSat: 4,    sucre: 5,    sel: 0,    fibres: 10,  prot: 18,   flv: 100 },
  graines:        { prixKg: 10.0, calPer100g: 530,  lipSat: 4,    sucre: 5,    sel: 0,    fibres: 10,  prot: 18,   flv: 100 },
  chia:           { prixKg: 15.0, calPer100g: 486,  lipSat: 3.3,  sucre: 0,    sel: 0.04, fibres: 34,  prot: 17,   flv: 100 },
  sesame:         { prixKg: 10.0, calPer100g: 573,  lipSat: 7.0,  sucre: 0.3,  sel: 0,    fibres: 12,  prot: 18,   flv: 100 },
  
  // ===== AUTRES =====
  tofu:           { prixKg: 6.00, calPer100g: 76,   lipSat: 0.7,  sucre: 0.7,  sel: 0,    fibres: 0.3, prot: 8.1,  flv: 100 },
  tofusoie:       { prixKg: 7.00, calPer100g: 55,   lipSat: 0.4,  sucre: 0.7,  sel: 0,    fibres: 0.2, prot: 5,    flv: 100 },
  tempeh:         { prixKg: 8.00, calPer100g: 192,  lipSat: 2.2,  sucre: 0,    sel: 0,    fibres: 0,   prot: 19,   flv: 100 },
  proteine:       { prixKg: 25.0, calPer100g: 380,  lipSat: 1,    sucre: 3,    sel: 0.5,  fibres: 2,   prot: 80,   flv: 0 },
  levure:         { prixKg: 10.0, calPer100g: 105,  lipSat: 0.1,  sucre: 0,    sel: 0.05, fibres: 0,   prot: 12,   flv: 0 },
  levurechimique: { prixKg: 12.0, calPer100g: 0,    lipSat: 0,    sucre: 0,    sel: 25,   fibres: 0,   prot: 0,    flv: 0 },
  levureboulanger:{ prixKg: 10.0, calPer100g: 105,  lipSat: 0.1,  sucre: 0,    sel: 0.05, fibres: 0,   prot: 12,   flv: 0 },
  maizena:        { prixKg: 3.00, calPer100g: 343,  lipSat: 0.04, sucre: 0.1,  sel: 0,    fibres: 0,   prot: 0.3,  flv: 0 },
  fecule:         { prixKg: 3.00, calPer100g: 343,  lipSat: 0.04, sucre: 0.1,  sel: 0,    fibres: 0,   prot: 0.3,  flv: 0 },
  biscuits:       { prixKg: 8.00, calPer100g: 480,  lipSat: 8,    sucre: 30,   sel: 0.6,  fibres: 2,   prot: 7,    flv: 0 },
  biscuitscuillere:{prixKg: 10.0, calPer100g: 393,  lipSat: 1.5,  sucre: 35,   sel: 0.3,  fibres: 1,   prot: 8,    flv: 0 },
  muffins:        { prixKg: 8.00, calPer100g: 380,  lipSat: 5,    sucre: 25,   sel: 0.5,  fibres: 2,   prot: 6,    flv: 0 },
  crepesP:        { prixKg: 5.00, calPer100g: 220,  lipSat: 3,    sucre: 5,    sel: 0.3,  fibres: 1.5, prot: 6,    flv: 0 },
  palmier:        { prixKg: 6.00, calPer100g: 450,  lipSat: 12,   sucre: 25,   sel: 0.5,  fibres: 2,   prot: 6,    flv: 0 },
  kaya:           { prixKg: 8.00, calPer100g: 290,  lipSat: 5,    sucre: 50,   sel: 0.2,  fibres: 1,   prot: 3,    flv: 0 },
  painepicesmoutarde:{prixKg:8.0, calPer100g: 320,  lipSat: 1.5,  sucre: 40,   sel: 0.8,  fibres: 2.5, prot: 5,    flv: 0 },
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
const POIDS_UNITAIRE = {
  oeuf: 50, oeufs: 50, oeufPate: 50, oeufCreme: 50, oeufChoux: 50,
  jauneoeuf: 18, jauneoeufs: 18, jaunes: 18, jaunesoeufs: 18, jaunesCreme: 18, gJaune: 18,
  blancsoeufs: 32, blancs: 32, blanc: 32,
  citron: 100, citrons: 100, citronC: 100, citronvert: 70, zestecitron: 10,
  ail: 3, gingembreail: 5, ailechalote: 5,
  oignon: 100, oignons: 100, oignonRouge: 100, oignonrouge: 100, oignonNouveau: 30, oignonsblanc: 30, echalote: 30,
  banane: 120, bananes: 120, pomme: 150, pommes: 150, poire: 150,
  avocat: 200, avocats: 200, orange: 130, kiwi: 75, peche: 150,
  mangue: 300, ananas: 500, melon: 1000, passion: 50,
  serrano: 30,
};

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
    
    const ing = INGREDIENTS_PRIX[nomIng];
    if (!ing) return;
    
    const q = parserQuantite(valeur);
    if (!q) return;
    
    // Convertir en grammes selon l'unité retournée par parserQuantite
    // parserQuantite retourne { valeur, unite: "poids" | "unite" }
    let grammes = 0;
    if (q.unite === "poids") {
      // Déjà en grammes/ml (parseur a converti kg→g, l→ml, cl→ml, sachet→11g)
      grammes = q.valeur;
    } else {
      // Quantité comptée : utiliser le poids unitaire moyen
      const pu = POIDS_UNITAIRE[nomIng] || (ing.prixUnite !== undefined ? 50 : 0);
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
  let ingredientsManquants = [];
  
  for (const [cle, valeur] of Object.entries(ligneTableau)) {
    // Ignorer les colonnes méta
    if (cle === "nb" || cle === "label" || cle === "patons" || cle === "total") continue;
    
    const info = INGREDIENTS_PRIX[cle];
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
      // Ingrédient pondérable normalement
      const kgOuL = qte.valeur / 1000;
      prixTotal += kgOuL * info.prixKg;
      calTotal += (qte.valeur / 100) * info.calPer100g;
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
          ail: 3,                       // 1 gousse ≈ 3g
        };
        const pu = poidsUnitaire[cle] || 100;
        const nbUnites = qte.valeur / pu;
        prixTotal += nbUnites * info.prixUnite;
        calTotal += nbUnites * info.cal;
      } else {
        // Ingrédient compté normalement (œuf, citron, banane...)
        prixTotal += qte.valeur * info.prixUnite;
        calTotal += qte.valeur * info.cal;
      }
    }
  }
  
  return {
    prix: Math.round(prixTotal * 100) / 100,
    cal: Math.round(calTotal),
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
  module.exports = { INGREDIENTS_PRIX, calculerPrixCaloriesRecette, parserQuantite, calculerNutriScore, calculerNutriScoreRecette };
}
