// ===================================================================
// BASE D'INGRÉDIENTS — Prix moyens supermarchés France début 2026
//                     Calories : valeurs nutritionnelles constantes
// ===================================================================
// Format :
//   prixKg     = €/kg pour ingrédients pondérables (liquide ou solide)
//   prixUnite  = €/unité pour ingrédients comptés (œuf, citron, banane)
//   calPer100g = kcal pour 100g (référence USDA / CIQUAL)
//   cal        = kcal par unité (pour les ingrédients comptés)
//
// Sources : Carrefour, Leclerc, Intermarché (moyenne mai 2026)
//           CIQUAL ANSES pour les calories
// ===================================================================

const INGREDIENTS_PRIX = {
  // === BASES (les + utilisés) ===
  sel:         { prixKg: 0.85,  calPer100g: 0 },      // 131 recettes
  huile:       { prixKg: 4.50,  calPer100g: 884 },    // huile d'olive moyenne
  huileolive:  { prixKg: 8.50,  calPer100g: 884 },
  ail:         { prixUnite: 0.10, cal: 5 },           // 1 gousse ~3g
  sucre:       { prixKg: 1.20,  calPer100g: 387 },
  beurre:      { prixKg: 8.50,  calPer100g: 717 },    // moyenne 2026 (baisse récente)
  citron:      { prixUnite: 0.50, cal: 17 },          // 1 citron moyen
  oignon:      { prixUnite: 0.30, cal: 40 },          // 1 oignon moyen ~100g
  farine:      { prixKg: 0.85,  calPer100g: 364 },    // T55 base
  farinetamisee: { prixKg: 0.85, calPer100g: 364 },
  poivre:      { prixKg: 25.0,  calPer100g: 251 },    // très peu utilisé/recette
  
  // === PRODUITS LAITIERS ===
  lait:        { prixKg: 1.10,  calPer100g: 47 },     // demi-écrémé (€/L = €/kg)
  laitnon:     { prixKg: 1.10,  calPer100g: 47 },
  oeuf:        { prixUnite: 0.32, cal: 70 },          // 1 œuf moyen (douzaine ~3.80€)
  oeufs:       { prixUnite: 0.32, cal: 70 },
  jauneoeuf:   { prixUnite: 0.10, cal: 55 },
  blancsoeufs: { prixUnite: 0.22, cal: 17 },
  creme:       { prixKg: 4.50,  calPer100g: 290 },
  cremechantilly: { prixKg: 5.00, calPer100g: 257 },
  yaourt:      { prixKg: 2.20,  calPer100g: 60 },
  fromage:     { prixKg: 14.0,  calPer100g: 350 },    // moyenne fromages
  fromagecomte: { prixKg: 24.0, calPer100g: 410 },
  fromagebeaufort: { prixKg: 30.0, calPer100g: 401 },
  fromageemmental: { prixKg: 12.0, calPer100g: 380 },
  parmesan:    { prixKg: 28.0,  calPer100g: 431 },
  mozzarella:  { prixKg: 10.0,  calPer100g: 254 },
  mascarpone:  { prixKg: 8.50,  calPer100g: 429 },
  ricotta:     { prixKg: 8.00,  calPer100g: 174 },
  
  // === LÉGUMES (frais courants) ===
  tomate:      { prixKg: 3.50,  calPer100g: 18 },
  tomates:     { prixKg: 3.50,  calPer100g: 18 },
  carotte:     { prixKg: 1.50,  calPer100g: 41 },
  carottes:    { prixKg: 1.50,  calPer100g: 41 },
  pommedeterre: { prixKg: 1.50, calPer100g: 77 },
  pommesdeterre: { prixKg: 1.50, calPer100g: 77 },
  poivron:     { prixKg: 4.50,  calPer100g: 31 },
  courgette:   { prixKg: 2.80,  calPer100g: 17 },
  aubergine:   { prixKg: 3.50,  calPer100g: 25 },
  concombre:   { prixUnite: 1.20, cal: 50 },
  salade:      { prixUnite: 1.50, cal: 30 },
  epinards:    { prixKg: 5.00,  calPer100g: 23 },
  champignons: { prixKg: 6.00,  calPer100g: 22 },
  oignons:     { prixKg: 1.80,  calPer100g: 40 },
  echalote:    { prixKg: 6.00,  calPer100g: 72 },
  
  // === FRUITS ===
  banane:      { prixUnite: 0.30, cal: 90 },          // 1 banane ~120g
  pomme:       { prixUnite: 0.40, cal: 80 },
  pommes:      { prixKg: 2.50,  calPer100g: 52 },
  poire:       { prixUnite: 0.50, cal: 100 },
  fraise:      { prixKg: 8.00,  calPer100g: 33 },
  fraises:     { prixKg: 8.00,  calPer100g: 33 },
  framboise:   { prixKg: 18.0,  calPer100g: 52 },
  framboises:  { prixKg: 18.0,  calPer100g: 52 },
  myrtille:    { prixKg: 20.0,  calPer100g: 57 },
  ananas:      { prixUnite: 3.00, cal: 250 },
  orange:      { prixUnite: 0.40, cal: 60 },
  fruitsrouges:{ prixKg: 12.0,  calPer100g: 50 },
  fruitsfrais: { prixKg: 5.00,  calPer100g: 50 },     // moyenne
  
  // === ÉPICERIE SÈCHE ===
  riz:         { prixKg: 2.20,  calPer100g: 365 },
  rizbasmati:  { prixKg: 3.50,  calPer100g: 350 },
  pates:       { prixKg: 1.40,  calPer100g: 358 },
  spaghetti:   { prixKg: 1.40,  calPer100g: 358 },
  tagliatellesfraiches: { prixKg: 8.00, calPer100g: 280 },
  lentilles:   { prixKg: 3.00,  calPer100g: 336 },
  poischiches: { prixKg: 3.50,  calPer100g: 364 },
  quinoa:      { prixKg: 7.00,  calPer100g: 368 },
  semoule:     { prixKg: 2.00,  calPer100g: 360 },
  flocons:     { prixKg: 2.50,  calPer100g: 379 },    // avoine
  
  // === PAINS & BOULANGERIE ===
  painrassis:  { prixKg: 3.00,  calPer100g: 265 },
  briocheoupain: { prixKg: 5.00, calPer100g: 320 },
  
  // === SUCRÉS ===
  cassonade:   { prixKg: 1.80,  calPer100g: 387 },
  sucresemoule:{ prixKg: 1.20,  calPer100g: 387 },
  sucreglace:  { prixKg: 2.50,  calPer100g: 387 },
  vergeoise:   { prixKg: 3.50,  calPer100g: 380 },
  miel:        { prixKg: 12.0,  calPer100g: 304 },
  sirop:       { prixKg: 10.0,  calPer100g: 260 },    // sirop d'érable / agave
  chocolat:    { prixKg: 12.0,  calPer100g: 546 },    // chocolat noir 70%
  chocolatnoir:{ prixKg: 12.0,  calPer100g: 546 },
  choco:       { prixKg: 14.0,  calPer100g: 530 },    // pépites de chocolat
  pepiteschoco:{ prixKg: 14.0,  calPer100g: 530 },
  cacao:       { prixKg: 18.0,  calPer100g: 228 },
  vanille:     { prixKg: 25.0,  calPer100g: 280 },    // extrait/arôme vanille (pas la gousse)
  
  // === ÉPICES & AROMATES (utilisés en petite quantité) ===
  cannelle:    { prixKg: 28.0,  calPer100g: 247 },
  gingembre:   { prixKg: 8.00,  calPer100g: 80 },
  curcuma:     { prixKg: 25.0,  calPer100g: 312 },
  paprika:     { prixKg: 30.0,  calPer100g: 282 },
  cumin:       { prixKg: 30.0,  calPer100g: 375 },
  herbesprovence: { prixKg: 40.0, calPer100g: 290 },
  persil:      { prixKg: 15.0,  calPer100g: 36 },    // botte ~1€
  coriandre:   { prixKg: 15.0,  calPer100g: 23 },
  basilic:     { prixKg: 20.0,  calPer100g: 23 },
  menthe:      { prixKg: 18.0,  calPer100g: 70 },
  
  // === VIANDES & POISSONS ===
  poulet:      { prixKg: 12.0,  calPer100g: 165 },
  poulettranche: { prixKg: 14.0, calPer100g: 165 },
  pouletcuisses: { prixKg: 8.00, calPer100g: 215 },
  boeuf:       { prixKg: 22.0,  calPer100g: 250 },    // moyenne (les Français mangent moins de bœuf)
  boeufpouramijoter: { prixKg: 14.0, calPer100g: 250 },
  porc:        { prixKg: 12.0,  calPer100g: 240 },
  agneau:      { prixKg: 22.0,  calPer100g: 290 },
  jambon:      { prixKg: 16.0,  calPer100g: 145 },
  bacon:       { prixKg: 20.0,  calPer100g: 540 },
  lardons:     { prixKg: 14.0,  calPer100g: 350 },
  saucisses:   { prixKg: 10.0,  calPer100g: 300 },
  saumon:      { prixKg: 28.0,  calPer100g: 208 },
  thon:        { prixKg: 22.0,  calPer100g: 144 },
  crevettes:   { prixKg: 22.0,  calPer100g: 99 },
  saintjacques:{ prixUnite: 2.50, cal: 30 },          // 1 noix
  poissonroche:{ prixKg: 14.0,  calPer100g: 100 },
  
  // === LIQUIDES & DIVERS ===
  eau:         { prixKg: 0.20,  calPer100g: 0 },
  bouillon:    { prixKg: 1.00,  calPer100g: 15 },
  vinaigre:    { prixKg: 2.00,  calPer100g: 20 },
  moutarde:    { prixKg: 4.00,  calPer100g: 60 },
  saucesoja:   { prixKg: 6.00,  calPer100g: 60 },
  vin:         { prixKg: 5.00,  calPer100g: 80 },     // vin de cuisine
  vinblanc:    { prixKg: 5.00,  calPer100g: 80 },
  vinrouge:    { prixKg: 5.00,  calPer100g: 80 },
  
  // === LEVURES & FÉCULES ===
  levure:      { prixKg: 20.0,  calPer100g: 325 },    // levure de boulanger
  levurechimique: { prixKg: 15.0, calPer100g: 75 },
  levureboulanger: { prixKg: 20.0, calPer100g: 325 },
  maizena:     { prixKg: 4.00,  calPer100g: 343 },
  
  // === OLÉAGINEUX & GRAINES ===
  amande:      { prixKg: 14.0,  calPer100g: 579 },
  amandes:     { prixKg: 14.0,  calPer100g: 579 },
  poudreamande:{ prixKg: 18.0,  calPer100g: 600 },
  noix:        { prixKg: 16.0,  calPer100g: 654 },
  noisettes:   { prixKg: 18.0,  calPer100g: 628 },
  pignons:     { prixKg: 40.0,  calPer100g: 673 },
  cocoflocons: { prixKg: 10.0,  calPer100g: 660 },
  granola:     { prixKg: 8.00,  calPer100g: 471 },
  grainepain:  { prixKg: 12.0,  calPer100g: 530 },    // graines diverses

  // === AJOUTS AUTOMATIQUES (408 ingrédients) ===
  pate                : { prixKg: 5.00  , calPer100g: 280 },
  paton               : { prixKg: 1.50  , calPer100g: 280 },
  citrons             : { prixUnite: 0.50 , cal: 17 },
  jaunes              : { prixUnite: 0.10 , cal: 55 },
  blancs              : { prixUnite: 0.22 , cal: 17 },
  jaunesoeufs         : { prixUnite: 0.10 , cal: 55 },
  oignonRouge         : { prixUnite: 0.40 , cal: 45 },
  oignonrouge         : { prixUnite: 0.40 , cal: 45 },
  oignonNouveau       : { prixUnite: 0.30 , cal: 32 },
  oignonsblanc        : { prixUnite: 0.30 , cal: 32 },
  huileOlive          : { prixKg: 8.50  , calPer100g: 884 },
  huiledolive         : { prixKg: 8.50  , calPer100g: 884 },
  huilefriture        : { prixKg: 2.50  , calPer100g: 884 },
  huilesesame         : { prixKg: 15.00 , calPer100g: 884 },
  huilesame           : { prixKg: 15.00 , calPer100g: 884 },
  huileTruffe         : { prixKg: 80.00 , calPer100g: 884 },
  huilepiment         : { prixKg: 12.00 , calPer100g: 884 },
  fromagerape         : { prixKg: 12.00 , calPer100g: 380 },
  fromageraclette     : { prixKg: 14.00 , calPer100g: 363 },
  fromageFrais        : { prixKg: 6.00  , calPer100g: 170 },
  fromagefrais        : { prixKg: 6.00  , calPer100g: 170 },
  fromageblanc        : { prixKg: 3.50  , calPer100g: 73 },
  laitcoco            : { prixKg: 4.50  , calPer100g: 197 },
  laitCoco            : { prixKg: 4.50  , calPer100g: 197 },
  lait_coco           : { prixKg: 4.50  , calPer100g: 197 },
  cremeCoco           : { prixKg: 6.00  , calPer100g: 330 },
  laitconcentre       : { prixKg: 6.00  , calPer100g: 321 },
  laitevapore         : { prixKg: 5.00  , calPer100g: 134 },
  laitamande          : { prixKg: 3.00  , calPer100g: 24 },
  noixCoco            : { prixKg: 10.00 , calPer100g: 354 },
  piment              : { prixUnite: 0.20 , cal: 30 },
  scotchBonnet        : { prixUnite: 0.30 , cal: 30 },
  jalapeno            : { prixUnite: 0.25 , cal: 30 },
  piment_guajillo     : { prixKg: 60.00 , calPer100g: 32 },
  piment_ancho        : { prixKg: 60.00 , calPer100g: 32 },
  ancho               : { prixKg: 60.00 , calPer100g: 32 },
  olives              : { prixKg: 9.00  , calPer100g: 145 },
  mozza               : { prixKg: 10.00 , calPer100g: 254 },
  avocat              : { prixUnite: 1.20 , cal: 240 },
  avocats             : { prixUnite: 1.20 , cal: 240 },
  pain                : { prixKg: 5.00  , calPer100g: 265 },
  pdterre             : { prixKg: 1.50  , calPer100g: 77 },
  pommeterre          : { prixKg: 1.50  , calPer100g: 77 },
  patate              : { prixKg: 1.50  , calPer100g: 77 },
  patatedouce         : { prixKg: 3.00  , calPer100g: 86 },
  petitspois          : { prixKg: 3.50  , calPer100g: 81 },
  pois                : { prixKg: 3.50  , calPer100g: 81 },
  citronvert          : { prixUnite: 0.40 , cal: 17 },
  ciboule             : { prixKg: 12.00 , calPer100g: 32 },
  ciboulette          : { prixKg: 15.00 , calPer100g: 30 },
  romarin             : { prixKg: 25.00 , calPer100g: 131 },
  thym                : { prixKg: 25.00 , calPer100g: 101 },
  aneth               : { prixKg: 20.00 , calPer100g: 43 },
  citronnelle         : { prixKg: 10.00 , calPer100g: 99 },
  laurier             : { prixKg: 30.00 , calPer100g: 313 },
  sauge               : { prixKg: 30.00 , calPer100g: 315 },
  origan              : { prixKg: 30.00 , calPer100g: 265 },
  herbes              : { prixKg: 20.00 , calPer100g: 50 },
  bouquetgarni        : { prixKg: 15.00 , calPer100g: 50 },
  feuilles            : { prixKg: 10.00 , calPer100g: 50 },
  feuille             : { prixKg: 10.00 , calPer100g: 50 },
  kaffir              : { prixKg: 60.00 , calPer100g: 50 },
  galanga             : { prixKg: 12.00 , calPer100g: 71 },
  cardamome           : { prixKg: 60.00 , calPer100g: 311 },
  fenugrec            : { prixKg: 25.00 , calPer100g: 323 },
  sumac               : { prixKg: 40.00 , calPer100g: 282 },
  anis                : { prixKg: 25.00 , calPer100g: 337 },
  safran              : { prixKg: 5000.00, calPer100g: 310 },
  muscade             : { prixKg: 60.00 , calPer100g: 525 },
  curry               : { prixKg: 20.00 , calPer100g: 325 },
  currypoudre         : { prixKg: 20.00 , calPer100g: 325 },
  curryVert           : { prixKg: 25.00 , calPer100g: 325 },
  pateMassaman        : { prixKg: 25.00 , calPer100g: 200 },
  pateCurry           : { prixKg: 20.00 , calPer100g: 200 },
  masala              : { prixKg: 25.00 , calPer100g: 325 },
  garamMasala         : { prixKg: 25.00 , calPer100g: 325 },
  epicesbiryani       : { prixKg: 25.00 , calPer100g: 325 },
  epicesras           : { prixKg: 30.00 , calPer100g: 325 },
  epicesmasala        : { prixKg: 25.00 , calPer100g: 325 },
  chermoula           : { prixKg: 20.00 , calPer100g: 200 },
  paprikaFume         : { prixKg: 30.00 , calPer100g: 282 },
  paprikafume         : { prixKg: 30.00 , calPer100g: 282 },
  rub                 : { prixKg: 25.00 , calPer100g: 280 },
  fumee               : { prixKg: 20.00 , calPer100g: 100 },
  bicarbonate         : { prixKg: 5.00  , calPer100g: 0 },
  grossel             : { prixKg: 1.00  , calPer100g: 0 },
  fleurdesel          : { prixKg: 8.00  , calPer100g: 0 },
  selFleur            : { prixKg: 8.00  , calPer100g: 0 },
  selRebord           : { prixKg: 1.00  , calPer100g: 0 },
  sojaS               : { prixKg: 6.00  , calPer100g: 60 },
  sojaSauce           : { prixKg: 6.00  , calPer100g: 60 },
  sauceaussoja        : { prixKg: 6.00  , calPer100g: 60 },
  soja                : { prixKg: 6.00  , calPer100g: 60 },
  mirin               : { prixKg: 12.00 , calPer100g: 226 },
  saké                : { prixKg: 15.00 , calPer100g: 134 },
  sake                : { prixKg: 15.00 , calPer100g: 134 },
  miso                : { prixKg: 15.00 , calPer100g: 199 },
  dashi               : { prixKg: 8.00  , calPer100g: 7 },
  nuocmam             : { prixKg: 8.00  , calPer100g: 35 },
  hoisin              : { prixKg: 10.00 , calPer100g: 220 },
  kecapManis          : { prixKg: 10.00 , calPer100g: 250 },
  sambal              : { prixKg: 15.00 , calPer100g: 80 },
  gochujang           : { prixKg: 18.00 , calPer100g: 210 },
  doubanjiang         : { prixKg: 15.00 , calPer100g: 150 },
  tahini              : { prixKg: 12.00 , calPer100g: 595 },
  pesto               : { prixKg: 18.00 , calPer100g: 450 },
  mayonnaise          : { prixKg: 5.00  , calPer100g: 680 },
  mayojaponaise       : { prixKg: 8.00  , calPer100g: 720 },
  sauceokonomi        : { prixKg: 12.00 , calPer100g: 200 },
  ketchup             : { prixKg: 4.50  , calPer100g: 105 },
  tabasco             : { prixKg: 35.00 , calPer100g: 12 },
  bbqSauce            : { prixKg: 8.00  , calPer100g: 170 },
  vinaigreBalsamique  : { prixKg: 8.00  , calPer100g: 90 },
  balsamique          : { prixKg: 8.00  , calPer100g: 90 },
  vinaigreRiz         : { prixKg: 6.00  , calPer100g: 18 },
  wasabi              : { prixKg: 40.00 , calPer100g: 109 },
  tamarin             : { prixKg: 10.00 , calPer100g: 239 },
  chutney             : { prixKg: 10.00 , calPer100g: 200 },
  confiture           : { prixKg: 5.00  , calPer100g: 260 },
  sambar              : { prixKg: 10.00 , calPer100g: 80 },
  arome               : { prixKg: 30.00 , calPer100g: 0 },
  colorant            : { prixKg: 30.00 , calPer100g: 0 },
  ferment             : { prixKg: 20.00 , calPer100g: 50 },
  concentre           : { prixKg: 4.00  , calPer100g: 80 },
  coulis              : { prixKg: 6.00  , calPer100g: 100 },
  nouilles            : { prixKg: 3.50  , calPer100g: 360 },
  ramen               : { prixKg: 5.00  , calPer100g: 380 },
  soba                : { prixKg: 8.00  , calPer100g: 358 },
  nouillesoeuf        : { prixKg: 5.00  , calPer100g: 380 },
  vermicelles         : { prixKg: 5.00  , calPer100g: 350 },
  lasagne             : { prixKg: 2.50  , calPer100g: 360 },
  feuilletee          : { prixKg: 5.00  , calPer100g: 380 },
  patefeuilletee      : { prixKg: 5.00  , calPer100g: 380 },
  pateFeuilletee      : { prixKg: 5.00  , calPer100g: 380 },
  patebrisee          : { prixKg: 4.00  , calPer100g: 350 },
  pateSablee          : { prixKg: 5.00  , calPer100g: 420 },
  pateC               : { prixKg: 5.00  , calPer100g: 380 },
  tortillas           : { prixUnite: 0.30 , cal: 90 },
  tortilla            : { prixUnite: 0.30 , cal: 90 },
  pita                : { prixUnite: 0.50 , cal: 165 },
  painpita            : { prixUnite: 0.50 , cal: 165 },
  buns                : { prixUnite: 0.40 , cal: 220 },
  baguette            : { prixUnite: 1.20 , cal: 680 },
  fecule              : { prixKg: 4.00  , calPer100g: 343 },
  farineRiz           : { prixKg: 4.00  , calPer100g: 366 },
  farineble           : { prixKg: 0.85  , calPer100g: 364 },
  farineT80           : { prixKg: 1.00  , calPer100g: 360 },
  farineseigle        : { prixKg: 2.50  , calPer100g: 349 },
  farinesarrasin      : { prixKg: 4.00  , calPer100g: 343 },
  rizS                : { prixKg: 2.20  , calPer100g: 365 },
  rizCuit             : { prixKg: 2.20  , calPer100g: 130 },
  rizGrillé           : { prixKg: 5.00  , calPer100g: 365 },
  polenta             : { prixKg: 3.00  , calPer100g: 362 },
  boulghour           : { prixKg: 3.50  , calPer100g: 342 },
  manioc              : { prixKg: 5.00  , calPer100g: 159 },
  tteok               : { prixKg: 8.00  , calPer100g: 215 },
  levain              : { prixKg: 6.00  , calPer100g: 240 },
  chapelure           : { prixKg: 3.00  , calPer100g: 395 },
  croutons            : { prixKg: 8.00  , calPer100g: 415 },
  filo                : { prixKg: 6.00  , calPer100g: 290 },
  feuillesBric        : { prixKg: 6.00  , calPer100g: 290 },
  feuillesBrick       : { prixKg: 6.00  , calPer100g: 290 },
  feuillesbrick       : { prixKg: 6.00  , calPer100g: 290 },
  feuillesFilo        : { prixKg: 6.00  , calPer100g: 290 },
  feuilleswonton      : { prixKg: 6.00  , calPer100g: 290 },
  baos                : { prixUnite: 0.80 , cal: 130 },
  kataifi             : { prixKg: 8.00  , calPer100g: 320 },
  biscuits            : { prixKg: 8.00  , calPer100g: 470 },
  biscuitscuillere    : { prixKg: 10.00 , calPer100g: 380 },
  muffins             : { prixUnite: 0.50 , cal: 210 },
  crepesP             : { prixUnite: 0.30 , cal: 150 },
  palmier             : { prixUnite: 0.50 , cal: 200 },
  viande              : { prixKg: 16.00 , calPer100g: 250 },
  viandeHachee        : { prixKg: 12.00 , calPer100g: 250 },
  boeufHache          : { prixKg: 12.00 , calPer100g: 250 },
  boeufhache          : { prixKg: 12.00 , calPer100g: 250 },
  agneauHache         : { prixKg: 18.00 , calPer100g: 290 },
  pouletHache         : { prixKg: 10.00 , calPer100g: 165 },
  boeufbourguignon    : { prixKg: 14.00 , calPer100g: 250 },
  filetdeboeuf        : { prixKg: 35.00 , calPer100g: 250 },
  travers             : { prixKg: 9.00  , calPer100g: 290 },
  jarret              : { prixKg: 10.00 , calPer100g: 230 },
  joues               : { prixKg: 12.00 , calPer100g: 250 },
  cotelets            : { prixKg: 14.00 , calPer100g: 260 },
  lard                : { prixKg: 12.00 , calPer100g: 540 },
  saindoux            : { prixKg: 6.00  , calPer100g: 900 },
  jambon              : { prixKg: 16.00 , calPer100g: 145 },
  prosciutto          : { prixKg: 35.00 , calPer100g: 280 },
  saucisse            : { prixKg: 12.00 , calPer100g: 300 },
  saucissefumee       : { prixKg: 14.00 , calPer100g: 320 },
  chorizo             : { prixKg: 18.00 , calPer100g: 455 },
  salami              : { prixKg: 22.00 , calPer100g: 425 },
  merguez             : { prixKg: 14.00 , calPer100g: 300 },
  andouillette        : { prixKg: 14.00 , calPer100g: 250 },
  bratwurst           : { prixKg: 12.00 , calPer100g: 300 },
  guanciale           : { prixKg: 35.00 , calPer100g: 540 },
  nduja               : { prixKg: 35.00 , calPer100g: 450 },
  charcuterie         : { prixKg: 20.00 , calPer100g: 350 },
  canard              : { prixKg: 18.00 , calPer100g: 337 },
  cuissecanard        : { prixKg: 12.00 , calPer100g: 215 },
  graissecanard       : { prixKg: 14.00 , calPer100g: 900 },
  pouletoupigeon      : { prixKg: 15.00 , calPer100g: 200 },
  veau                : { prixKg: 28.00 , calPer100g: 230 },
  lapin               : { prixKg: 14.00 , calPer100g: 173 },
  foie                : { prixKg: 18.00 , calPer100g: 135 },
  os                  : { prixKg: 3.00  , calPer100g: 0 },
  queueboeuf          : { prixKg: 12.00 , calPer100g: 250 },
  porchache           : { prixKg: 10.00 , calPer100g: 240 },
  poisson             : { prixKg: 18.00 , calPer100g: 130 },
  dorade              : { prixKg: 18.00 , calPer100g: 130 },
  brochet             : { prixKg: 18.00 , calPer100g: 100 },
  moules              : { prixKg: 8.00  , calPer100g: 86 },
  moule               : { prixKg: 8.00  , calPer100g: 86 },
  poulpe              : { prixKg: 18.00 , calPer100g: 82 },
  calamars            : { prixKg: 14.00 , calPer100g: 92 },
  ecrevisses          : { prixKg: 30.00 , calPer100g: 90 },
  palourdes           : { prixKg: 18.00 , calPer100g: 86 },
  anchois             : { prixKg: 28.00 , calPer100g: 210 },
  anchoix             : { prixKg: 28.00 , calPer100g: 210 },
  thonHuile           : { prixKg: 14.00 , calPer100g: 200 },
  saumonfume          : { prixKg: 35.00 , calPer100g: 208 },
  saumonfrais         : { prixKg: 28.00 , calPer100g: 208 },
  moruedessale        : { prixKg: 22.00 , calPer100g: 290 },
  nori                : { prixKg: 80.00 , calPer100g: 35 },
  wakame              : { prixKg: 80.00 , calPer100g: 35 },
  bonite              : { prixKg: 40.00 , calPer100g: 100 },
  feta                : { prixKg: 12.00 , calPer100g: 264 },
  fetaOpt             : { prixKg: 12.00 , calPer100g: 264 },
  gruyere             : { prixKg: 16.00 , calPer100g: 413 },
  emmental            : { prixKg: 12.00 , calPer100g: 380 },
  cheddar             : { prixKg: 14.00 , calPer100g: 404 },
  chevre              : { prixKg: 18.00 , calPer100g: 364 },
  burrata             : { prixKg: 16.00 , calPer100g: 280 },
  gorgonzola          : { prixKg: 18.00 , calPer100g: 353 },
  pecorino            : { prixKg: 28.00 , calPer100g: 387 },
  philadelphia        : { prixKg: 14.00 , calPer100g: 250 },
  paneer              : { prixKg: 12.00 , calPer100g: 321 },
  camembert           : { prixKg: 12.00 , calPer100g: 299 },
  reblochon           : { prixKg: 20.00 , calPer100g: 327 },
  tomme               : { prixKg: 18.00 , calPer100g: 380 },
  peche               : { prixUnite: 0.60 , cal: 50 },
  pasteque            : { prixKg: 2.50  , calPer100g: 30 },
  mangue              : { prixUnite: 1.80 , cal: 200 },
  kiwi                : { prixUnite: 0.50 , cal: 45 },
  melon               : { prixUnite: 3.00 , cal: 250 },
  passion             : { prixUnite: 1.20 , cal: 100 },
  bananes             : { prixUnite: 0.30 , cal: 90 },
  cerises             : { prixKg: 8.00  , calPer100g: 63 },
  cerise              : { prixKg: 8.00  , calPer100g: 63 },
  myrtilles           : { prixKg: 20.00 , calPer100g: 57 },
  baies               : { prixKg: 15.00 , calPer100g: 55 },
  figues              : { prixKg: 8.00  , calPer100g: 74 },
  feve                : { prixKg: 5.00  , calPer100g: 88 },
  feves               : { prixKg: 5.00  , calPer100g: 88 },
  fruits              : { prixKg: 5.00  , calPer100g: 60 },
  fraisesframboises   : { prixKg: 12.00 , calPer100g: 45 },
  pruneaux            : { prixKg: 8.00  , calPer100g: 240 },
  raisinsSecs         : { prixKg: 6.00  , calPer100g: 299 },
  raisinssecs         : { prixKg: 6.00  , calPer100g: 299 },
  dattes              : { prixKg: 8.00  , calPer100g: 282 },
  cranberry           : { prixKg: 10.00 , calPer100g: 308 },
  acaipuree           : { prixKg: 18.00 , calPer100g: 70 },
  jusMixte            : { prixKg: 2.50  , calPer100g: 45 },
  orangeJus           : { prixKg: 2.50  , calPer100g: 45 },
  jusfruit            : { prixKg: 2.50  , calPer100g: 45 },
  zestecitron         : { prixUnite: 0.20 , cal: 5 },
  citronC             : { prixUnite: 0.50 , cal: 17 },
  chou                : { prixKg: 2.00  , calPer100g: 25 },
  chouvert            : { prixKg: 2.00  , calPer100g: 25 },
  chouC               : { prixKg: 2.00  , calPer100g: 25 },
  choufleur           : { prixKg: 3.00  , calPer100g: 25 },
  bok_choy            : { prixKg: 4.00  , calPer100g: 13 },
  bokchoy             : { prixKg: 4.00  , calPer100g: 13 },
  poireaux            : { prixKg: 3.00  , calPer100g: 61 },
  roquette            : { prixKg: 12.00 , calPer100g: 25 },
  laitue              : { prixUnite: 1.50 , cal: 30 },
  saladeverte         : { prixUnite: 1.50 , cal: 30 },
  aubergines          : { prixKg: 3.50  , calPer100g: 25 },
  navets              : { prixKg: 2.50  , calPer100g: 28 },
  betterave           : { prixKg: 3.00  , calPer100g: 43 },
  betteraves          : { prixKg: 3.00  , calPer100g: 43 },
  asperges            : { prixKg: 10.00 , calPer100g: 20 },
  brocoli             : { prixKg: 4.00  , calPer100g: 34 },
  edamame             : { prixKg: 8.00  , calPer100g: 122 },
  edamames            : { prixKg: 8.00  , calPer100g: 122 },
  pousses             : { prixKg: 12.00 , calPer100g: 30 },
  fenouil             : { prixKg: 3.50  , calPer100g: 31 },
  celeri              : { prixKg: 3.00  , calPer100g: 16 },
  courge              : { prixKg: 2.50  , calPer100g: 26 },
  cornichons          : { prixKg: 6.00  , calPer100g: 15 },
  capres              : { prixKg: 15.00 , calPer100g: 23 },
  shiitake            : { prixKg: 15.00 , calPer100g: 34 },
  tomateCerise        : { prixKg: 6.00  , calPer100g: 18 },
  mais                : { prixKg: 3.00  , calPer100g: 88 },
  maïs                : { prixKg: 3.00  , calPer100g: 88 },
  haricots            : { prixKg: 4.00  , calPer100g: 90 },
  haricotsverts       : { prixKg: 4.00  , calPer100g: 31 },
  haricotsblancs      : { prixKg: 4.00  , calPer100g: 139 },
  haricotsnoirs       : { prixKg: 4.00  , calPer100g: 339 },
  haricotsrouges      : { prixKg: 4.00  , calPer100g: 127 },
  lentillesCorail     : { prixKg: 4.00  , calPer100g: 358 },
  truffenoire         : { prixKg: 2000.00, calPer100g: 90 },
  cremeTruffe         : { prixKg: 60.00 , calPer100g: 280 },
  guascas             : { prixKg: 30.00 , calPer100g: 50 },
  crudités            : { prixKg: 4.00  , calPer100g: 30 },
  rhum                : { prixKg: 25.00 , calPer100g: 231 },
  vodka               : { prixKg: 18.00 , calPer100g: 231 },
  tequila             : { prixKg: 30.00 , calPer100g: 231 },
  cognac              : { prixKg: 40.00 , calPer100g: 244 },
  bourbon             : { prixKg: 30.00 , calPer100g: 250 },
  brandy              : { prixKg: 25.00 , calPer100g: 244 },
  kirsch              : { prixKg: 35.00 , calPer100g: 240 },
  gin                 : { prixKg: 22.00 , calPer100g: 264 },
  cointreau           : { prixKg: 30.00 , calPer100g: 282 },
  tripleSec           : { prixKg: 22.00 , calPer100g: 282 },
  curacao             : { prixKg: 25.00 , calPer100g: 327 },
  aperol              : { prixKg: 20.00 , calPer100g: 168 },
  campari             : { prixKg: 25.00 , calPer100g: 200 },
  vermouth            : { prixKg: 18.00 , calPer100g: 138 },
  passoa              : { prixKg: 22.00 , calPer100g: 240 },
  amaretto            : { prixKg: 25.00 , calPer100g: 280 },
  marsala             : { prixKg: 12.00 , calPer100g: 130 },
  champagne           : { prixKg: 35.00 , calPer100g: 82 },
  prosecco            : { prixKg: 15.00 , calPer100g: 82 },
  cidre               : { prixKg: 4.00  , calPer100g: 50 },
  bierebrune          : { prixKg: 4.00  , calPer100g: 50 },
  kahluaC             : { prixKg: 25.00 , calPer100g: 336 },
  bitters             : { prixKg: 60.00 , calPer100g: 290 },
  grenadine           : { prixKg: 6.00  , calPer100g: 270 },
  limonade            : { prixKg: 2.00  , calPer100g: 40 },
  tonic               : { prixKg: 3.00  , calPer100g: 34 },
  gingerBeer          : { prixKg: 4.00  , calPer100g: 42 },
  sureau              : { prixKg: 20.00 , calPer100g: 280 },
  cafe                : { prixKg: 15.00 , calPer100g: 280 },
  espresso            : { prixKg: 15.00 , calPer100g: 280 },
  eauChouxglace       : { prixKg: 0.50  , calPer100g: 0 },
  eauChoux            : { prixKg: 0.50  , calPer100g: 0 },
  eauchaude           : { prixKg: 0.20  , calPer100g: 0 },
  eauFleurOranger     : { prixKg: 30.00 , calPer100g: 0 },
  eauRose             : { prixKg: 30.00 , calPer100g: 0 },
  fleurOranger        : { prixKg: 30.00 , calPer100g: 0 },
  rose                : { prixKg: 30.00 , calPer100g: 0 },
  eauGaz              : { prixKg: 0.40  , calPer100g: 0 },
  sucreCreme          : { prixKg: 1.20  , calPer100g: 387 },
  sucrebrun           : { prixKg: 1.80  , calPer100g: 380 },
  sucreroux           : { prixKg: 1.80  , calPer100g: 380 },
  sucrecasso          : { prixKg: 1.80  , calPer100g: 380 },
  sucreGlace          : { prixKg: 2.50  , calPer100g: 387 },
  sucreCaramel        : { prixKg: 1.20  , calPer100g: 387 },
  sucrecaramel        : { prixKg: 1.20  , calPer100g: 387 },
  sucreIles           : { prixKg: 1.80  , calPer100g: 380 },
  sucrepalme          : { prixKg: 4.00  , calPer100g: 380 },
  sucreMeringue       : { prixKg: 1.20  , calPer100g: 387 },
  gSucre              : { prixKg: 1.20  , calPer100g: 387 },
  caramel             : { prixKg: 6.00  , calPer100g: 400 },
  dulceDeLeche        : { prixKg: 8.00  , calPer100g: 315 },
  pralin              : { prixKg: 15.00 , calPer100g: 530 },
  beurredamande       : { prixKg: 15.00 , calPer100g: 580 },
  chocolatNoir        : { prixKg: 12.00 , calPer100g: 546 },
  pepites             : { prixKg: 14.00 , calPer100g: 530 },
  ganacheoufruit      : { prixKg: 10.00 , calPer100g: 400 },
  fondant             : { prixKg: 10.00 , calPer100g: 400 },
  glace               : { prixKg: 5.00  , calPer100g: 200 },
  glacevanille        : { prixKg: 5.00  , calPer100g: 200 },
  cremepatissiere     : { prixKg: 4.00  , calPer100g: 145 },
  pistaches           : { prixKg: 30.00 , calPer100g: 562 },
  cacahuetes          : { prixKg: 6.00  , calPer100g: 567 },
  cacahetes           : { prixKg: 6.00  , calPer100g: 567 },
  arachide            : { prixKg: 6.00  , calPer100g: 567 },
  cacahuetespurée     : { prixKg: 10.00 , calPer100g: 588 },
  poudreAmande        : { prixKg: 18.00 , calPer100g: 600 },
  poudreamandes       : { prixKg: 18.00 , calPer100g: 600 },
  coco                : { prixKg: 10.00 , calPer100g: 354 },
  graines             : { prixKg: 10.00 , calPer100g: 550 },
  grainepain          : { prixKg: 12.00 , calPer100g: 530 },
  chia                : { prixKg: 14.00 , calPer100g: 486 },
  sesame              : { prixKg: 12.00 , calPer100g: 573 },
  piniots             : { prixKg: 40.00 , calPer100g: 673 },
  tofu                : { prixKg: 7.00  , calPer100g: 76 },
  tofusoie            : { prixKg: 7.00  , calPer100g: 55 },
  tempeh              : { prixKg: 10.00 , calPer100g: 192 },
  proteine            : { prixKg: 30.00 , calPer100g: 380 },
  gelatine            : { prixKg: 25.00 , calPer100g: 335 },
  bechamel            : { prixKg: 4.00  , calPer100g: 110 },
  ragu                : { prixKg: 8.00  , calPer100g: 130 },
  rouille             : { prixKg: 12.00 , calPer100g: 450 },
  sauce               : { prixKg: 5.00  , calPer100g: 100 },
  crema               : { prixKg: 5.00  , calPer100g: 280 },
  matcha              : { prixKg: 80.00 , calPer100g: 270 },
  kaya                : { prixKg: 8.00  , calPer100g: 300 },
  beurrage            : { prixKg: 8.50  , calPer100g: 717 },
  beurrePate          : { prixKg: 8.50  , calPer100g: 717 },
  beurreCreme         : { prixKg: 8.50  , calPer100g: 717 },
  beurrCreme          : { prixKg: 8.50  , calPer100g: 717 },
  beurrChoux          : { prixKg: 8.50  , calPer100g: 717 },
  oeufPate            : { prixUnite: 0.32 , cal: 70 },
  oeufCreme           : { prixUnite: 0.32 , cal: 70 },
  oeufChoux           : { prixUnite: 0.32 , cal: 70 },
  laitChoux           : { prixKg: 1.10  , calPer100g: 47 },
  laitCreme           : { prixKg: 1.10  , calPer100g: 47 },
  cremeFraiche        : { prixKg: 4.50  , calPer100g: 290 },
  cremefraiche        : { prixKg: 4.50  , calPer100g: 290 },
  gCreme              : { prixKg: 4.50  , calPer100g: 290 },
  jaunesCreme         : { prixUnite: 0.10 , cal: 55 },
  gJaune              : { prixUnite: 0.10 , cal: 55 },
  poivresichuan       : { prixKg: 60.00 , calPer100g: 250 },
  gingembreail        : { prixKg: 10.00 , calPer100g: 75 },
  ailechalote         : { prixKg: 8.00  , calPer100g: 60 },
  painepicesmoutarde  : { prixKg: 8.00  , calPer100g: 300 },
  crème               : { prixKg: 4.50  , calPer100g: 290 },
  blanc               : { prixUnite: 0.22 , cal: 17 },
  serrano             : { prixUnite: 0.80 , cal: 50 },
};

// ===================================================================
// CALCUL AUTOMATIQUE DU PRIX ET DES CALORIES D'UNE RECETTE
// ===================================================================
// À partir d'une ligne de tableau, on extrait les quantités et on
// calcule le total. Format de quantité : "200 g", "100 ml", "2", "½", "1,5"
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
if (typeof module !== "undefined") {
  module.exports = { INGREDIENTS_PRIX, calculerPrixCaloriesRecette, parserQuantite };
}
