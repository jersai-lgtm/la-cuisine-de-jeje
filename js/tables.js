
const prixCalories = {
  pizza:    { base: 4,  baseLabel: "4 pâtons",    prixTotal: 0.64,  calTotal: 2346, unite: "pâton" },
  crepes:   { base: 4,  baseLabel: "4 personnes",  prixTotal: 2.17,  calTotal: 1898, unite: "personne" },
  gaufres:  { base: 4,  baseLabel: "4 gaufres",    prixTotal: 0.37,  calTotal: 386,  unite: "gaufre" },
  brioche:       { base: 1,  baseLabel: "1 brioche",    prixTotal: 2.83,  calTotal: 3642, unite: "brioche" },
  goumeau:       { base: 4,  baseLabel: "4 personnes",  prixTotal: 2.50, calTotal: 1200, unite: "personne" },
  galettetacos:  { base: 8,  baseLabel: "8 galettes",      prixTotal: 0.50,  calTotal: 800,  unite: "galette" },
  painburger:    { base: 6,  baseLabel: "6 buns",           prixTotal: 1.50,  calTotal: 1800, unite: "bun" },
  painbaguette:  { base: 1,  baseLabel: "1 baguette (~250g)", prixTotal: 0.40, calTotal: 680, unite: "baguette" },
  paindemie:     { base: 20, baseLabel: "20 tranches",  prixTotal: 1.20,  calTotal: 1400, unite: "tranche" },
  patefeuilletee:{ base: 1,  baseLabel: "1 pâte (~28cm)",prixTotal: 1.80,  calTotal: 1200, unite: "pâte" },
  patebrisee:    { base: 1,  baseLabel: "1 pâte (~28cm)",prixTotal: 0.80,  calTotal: 900,  unite: "pâte" },
  patesablee:    { base: 1,  baseLabel: "1 pâte (~28cm)",prixTotal: 1.00,  calTotal: 1100, unite: "pâte" },
  lasagne:  { base: 4,  baseLabel: "4 personnes",  prixTotal: 1.36,  calTotal: 2020, unite: "personne" },
  cookies:  { base: 4,  baseLabel: "4 cookies",    prixTotal: 2.20,  calTotal: 2220, unite: "cookie" },
  flan:     { base: 6,  baseLabel: "6 personnes",  prixTotal: 4.00,  calTotal: 2363, unite: "personne" },
  clafoutis:{ base: 6,  baseLabel: "6 personnes",  prixTotal: 4.68,  calTotal: 2234, unite: "personne" },
  tiramisu:      { base: 6, baseLabel: "6 personnes", prixTotal: 5.20, calTotal: 3200, unite: "personne" },
  tarteaupommes:  { base: 6,  baseLabel: "6 personnes",  prixTotal: 3.50, calTotal: 1800, unite: "personne" },
  pancakes:       { base: 4,  baseLabel: "4 personnes",  prixTotal: 1.20, calTotal: 1200, unite: "personne" },
  muffins:        { base: 12, baseLabel: "12 muffins",   prixTotal: 2.80, calTotal: 2520, unite: "muffin" },
  croquemonsieur: { base: 4,  baseLabel: "4 croques",    prixTotal: 4.50, calTotal: 2000, unite: "croque" },
  smoothiebowl:   { base: 2,  baseLabel: "2 bols",       prixTotal: 3.00, calTotal: 500,  unite: "bol" },
  saladequinoa:   { base: 4,  baseLabel: "4 personnes",  prixTotal: 5.00, calTotal: 1200, unite: "personne" },
  yaourt:         { base: 8,  baseLabel: "8 yaourts",    prixTotal: 1.80, calTotal: 640,  unite: "yaourt" },
  tartecitron:      { base: 6,  baseLabel: "6 tartelettes", prixTotal: 4.20,  calTotal: 2400, unite: "tartelette" },
  mojitorose:         { base: 1,  baseLabel: "1 verre", prixTotal: 1.80, calTotal: 140, unite: "verre" },
  negroni:            { base: 1,  baseLabel: "1 verre", prixTotal: 2.00, calTotal: 200, unite: "verre" },
  moscowmule:         { base: 1,  baseLabel: "1 verre", prixTotal: 1.80, calTotal: 140, unite: "verre" },
  pornstarmartini:    { base: 1,  baseLabel: "1 verre", prixTotal: 2.50, calTotal: 180, unite: "verre" },
  hugospritz:         { base: 1,  baseLabel: "1 verre", prixTotal: 1.50, calTotal: 120, unite: "verre" },
  cherryblossommocktail:{ base: 1,baseLabel: "1 verre", prixTotal: 0.80, calTotal: 80,  unite: "verre" },
  oldFashioned:       { base: 1,  baseLabel: "1 verre", prixTotal: 2.00, calTotal: 180, unite: "verre" },
  gintoniqmaison:     { base: 1,  baseLabel: "1 verre", prixTotal: 1.80, calTotal: 140, unite: "verre" },
  shrubframboisebasilic:{ base: 4,baseLabel: "4 verres",prixTotal: 2.00, calTotal: 240, unite: "verre" },
  mocktailcoconananas:{ base: 2,  baseLabel: "2 verres",prixTotal: 1.20, calTotal: 160, unite: "verre" },
  mojito:             { base: 1,  baseLabel: "1 verre",       prixTotal: 1.50, calTotal: 150,  unite: "verre" },
  margarita:          { base: 1,  baseLabel: "1 verre",       prixTotal: 1.80, calTotal: 180,  unite: "verre" },
  cosmopolitan:       { base: 1,  baseLabel: "1 verre",       prixTotal: 1.80, calTotal: 160,  unite: "verre" },
  spritz:             { base: 1,  baseLabel: "1 verre",       prixTotal: 1.50, calTotal: 120,  unite: "verre" },
  sangria:            { base: 6,  baseLabel: "6 verres",      prixTotal: 4.00, calTotal: 900,  unite: "verre" },
  pinacolada:         { base: 1,  baseLabel: "1 verre",       prixTotal: 2.00, calTotal: 220,  unite: "verre" },
  daiquiri:           { base: 1,  baseLabel: "1 verre",       prixTotal: 1.50, calTotal: 160,  unite: "verre" },
  whiskysour:         { base: 1,  baseLabel: "1 verre",       prixTotal: 2.00, calTotal: 180,  unite: "verre" },
  virginmojito:       { base: 1,  baseLabel: "1 verre",       prixTotal: 0.50, calTotal: 60,   unite: "verre" },
  limonademaison:     { base: 4,  baseLabel: "4 verres",      prixTotal: 1.00, calTotal: 280,  unite: "verre" },
  smoothiemangopassion:{ base: 2, baseLabel: "2 verres",      prixTotal: 2.00, calTotal: 300,  unite: "verre" },
  citronadementhe:    { base: 4,  baseLabel: "4 verres",      prixTotal: 0.80, calTotal: 200,  unite: "verre" },
  jusPastequeMenuthe: { base: 4,  baseLabel: "4 verres",      prixTotal: 1.50, calTotal: 160,  unite: "verre" },
  virginpinacolada:   { base: 1,  baseLabel: "1 verre",       prixTotal: 1.00, calTotal: 150,  unite: "verre" },
  pizzareine:         { base: 2, baseLabel: "2 pizzas",    prixTotal: 4.50,  calTotal: 1400, unite: "pizza"    },
  pizza4fromages:{ base: 2,baseLabel: "2 pizzas",    prixTotal: 5.00,  calTotal: 1600, unite: "pizza"    },
  pizzadiavola:       { base: 2, baseLabel: "2 pizzas",    prixTotal: 4.50,  calTotal: 1400, unite: "pizza"    },
  pizzasaumonepinards:{ base: 2, baseLabel: "2 pizzas",    prixTotal: 6.00,  calTotal: 1200, unite: "pizza"    },
  pizzavegetarienne:  { base: 2, baseLabel: "2 pizzas",    prixTotal: 4.00,  calTotal: 1200, unite: "pizza"    },
  souvlakiagneau:     { base: 4, baseLabel: "4 personnes", prixTotal: 8.00,  calTotal: 1200, unite: "personne" },
  tom_yam:            { base: 4, baseLabel: "4 personnes", prixTotal: 6.00,  calTotal: 600,  unite: "personne" },
  dorade_chermoula:   { base: 4, baseLabel: "4 personnes", prixTotal: 10.00, calTotal: 800,  unite: "personne" },
  pouletchicken65:    { base: 4, baseLabel: "4 personnes", prixTotal: 6.00,  calTotal: 1000, unite: "personne" },
  pierogi:            { base: 4, baseLabel: "4 personnes", prixTotal: 4.00,  calTotal: 1600, unite: "personne" },
  momos:              { base: 4, baseLabel: "4 personnes", prixTotal: 4.00,  calTotal: 800,  unite: "personne" },
  shakshukaverte:     { base: 2, baseLabel: "2 personnes", prixTotal: 3.00,  calTotal: 400,  unite: "personne" },
  kebbeh:             { base: 4, baseLabel: "4 personnes", prixTotal: 6.00,  calTotal: 1200, unite: "personne" },
  tteokbokki:         { base: 2, baseLabel: "2 personnes", prixTotal: 4.00,  calTotal: 800,  unite: "personne" },
  porc_pulled:        { base: 6, baseLabel: "6 personnes", prixTotal: 12.00, calTotal: 2400, unite: "personne" },
  dosakerdosai:       { base: 4, baseLabel: "4 dosas",     prixTotal: 2.00,  calTotal: 800,  unite: "dosa"     },
  braiseboeuf_asiatique:{ base: 4,baseLabel: "4 personnes",prixTotal: 12.00, calTotal: 1600, unite: "personne" },
  paprikashpoulet:    { base: 4, baseLabel: "4 personnes", prixTotal: 7.00,  calTotal: 1600, unite: "personne" },
  tequilasunrise:     { base: 1,  baseLabel: "1 verre",  prixTotal: 1.80, calTotal: 160,  unite: "verre"  },
  aperolspritzrosa:   { base: 1,  baseLabel: "1 verre",  prixTotal: 1.50, calTotal: 110,  unite: "verre"  },
  espressoMartini:    { base: 1,  baseLabel: "1 verre",  prixTotal: 2.00, calTotal: 160,  unite: "verre"  },
  punchfruitsrouges:  { base: 8,  baseLabel: "8 verres", prixTotal: 6.00, calTotal: 1200, unite: "verre"  },
  blueLagoon:         { base: 1,  baseLabel: "1 verre",  prixTotal: 1.50, calTotal: 140,  unite: "verre"  },
  mimosa:             { base: 1,  baseLabel: "1 verre",  prixTotal: 2.00, calTotal: 100,  unite: "verre"  },
  sidecarvintage:     { base: 1,  baseLabel: "1 verre",  prixTotal: 2.50, calTotal: 180,  unite: "verre"  },
  mocktailberrybliss: { base: 1,  baseLabel: "1 verre",  prixTotal: 1.20, calTotal: 80,   unite: "verre"  },
  gingerlemondrop:    { base: 1,  baseLabel: "1 verre",  prixTotal: 1.80, calTotal: 140,  unite: "verre"  },
  mocktailcoconorchidee:{ base: 2,baseLabel: "2 verres", prixTotal: 1.00, calTotal: 140,  unite: "verre"  },
  pizzaprosciuttoroquette:{ base: 2,baseLabel: "2 pizzas",prixTotal: 6.00,calTotal: 1200, unite: "pizza"  },
  pizzatruffe:        { base: 2,  baseLabel: "2 pizzas", prixTotal: 8.00, calTotal: 1200, unite: "pizza"  },
  pizzabiancoverdure: { base: 2,  baseLabel: "2 pizzas", prixTotal: 4.50, calTotal: 900,  unite: "pizza"  },
  pizzacalzone:       { base: 2,  baseLabel: "2 calzones",prixTotal: 4.50,calTotal: 1400, unite: "calzone"},
  pizzapoivrons:      { base: 2,  baseLabel: "2 pizzas", prixTotal: 4.00, calTotal: 1100, unite: "pizza"  },
  pizzapatate:        { base: 2,  baseLabel: "2 pizzas", prixTotal: 3.50, calTotal: 1000, unite: "pizza"  },
  pizzabresilienne:   { base: 2,  baseLabel: "2 pizzas", prixTotal: 4.50, calTotal: 1100, unite: "pizza"  },
  lasagneviande:      { base: 6,  baseLabel: "6 personnes",   prixTotal: 7.00,  calTotal: 2400, unite: "personne" },
  risottoprimavera:   { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 1400, unite: "personne" },
  pizzachorizo:                     { base: 2,  baseLabel: "2 personnes",   prixTotal: 4.5,  calTotal: 1200, unite: "personne" },
  pouletteriyaki:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.0,  calTotal: 1200, unite: "personne" },
  curryverthai:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.0,  calTotal: 1400, unite: "personne" },
  chiliconcarneV:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.0,  calTotal: 1600, unite: "personne" },
  koreanfriedchicken:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.0,  calTotal: 1200, unite: "personne" },
  risottoMilanese:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.0,  calTotal: 1400, unite: "personne" },
  soupeAziatique:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.0,  calTotal: 600, unite: "personne" },
  tartareSaumon:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 8.0,  calTotal: 600, unite: "personne" },
  tiramisufraise:                     { base: 6,  baseLabel: "6 personnes",   prixTotal: 5.0,  calTotal: 1800, unite: "personne" },
  pouletCocoLemon:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.0,  calTotal: 1200, unite: "personne" },
  crepesSucrées:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.0,  calTotal: 1200, unite: "personne" },
  poireauVinaigrette:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.5,  calTotal: 400, unite: "personne" },
  spaetzle:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.0,  calTotal: 1200, unite: "personne" },
  wagyuBurger:                     { base: 2,  baseLabel: "2 personnes",   prixTotal: 8.0,  calTotal: 1200, unite: "personne" },
  lemonPasta:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.0,  calTotal: 1400, unite: "personne" },
  soupeMinestrone:                     { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.0,  calTotal: 800, unite: "personne" },
  blanquetteveau: { base: 4, baseLabel: "4 personnes", prixTotal: 8.0, calTotal: 1200, unite: "personne" },
  navarin: { base: 4, baseLabel: "4 personnes", prixTotal: 9.0, calTotal: 1200, unite: "personne" },
  camembertRoti: { base: 2, baseLabel: "2 personnes", prixTotal: 4.0, calTotal: 800, unite: "personne" },
  tarteFlambee: { base: 4, baseLabel: "4 personnes", prixTotal: 3.5, calTotal: 1200, unite: "personne" },
  pouletMisoGingembre: { base: 4, baseLabel: "4 personnes", prixTotal: 6.0, calTotal: 1200, unite: "personne" },
  noodlesWok: { base: 4, baseLabel: "4 personnes", prixTotal: 4.0, calTotal: 1000, unite: "personne" },
  maffeSenegal: { base: 4, baseLabel: "4 personnes", prixTotal: 7.0, calTotal: 1400, unite: "personne" },
  gazpachoMelon: { base: 4, baseLabel: "4 personnes", prixTotal: 5.0, calTotal: 400, unite: "personne" },
  wafflesSales: { base: 4, baseLabel: "4 personnes", prixTotal: 3.0, calTotal: 800, unite: "personne" },
  choucroute: { base: 6, baseLabel: "6 personnes", prixTotal: 9.0, calTotal: 2000, unite: "personne" },
  sconeBritish: { base: 8, baseLabel: "8 personnes", prixTotal: 2.5, calTotal: 1200, unite: "personne" },
  calamarsRomaine: { base: 4, baseLabel: "4 personnes", prixTotal: 8.0, calTotal: 800, unite: "personne" },
  baklava: { base: 12, baseLabel: "12 personnes", prixTotal: 5.0, calTotal: 2400, unite: "personne" },
  eggsBenedict: { base: 2, baseLabel: "2 personnes", prixTotal: 6.0, calTotal: 800, unite: "personne" },
  porkBelly: { base: 4, baseLabel: "4 personnes", prixTotal: 10.0, calTotal: 1600, unite: "personne" },
  veloutePoiron: { base: 4, baseLabel: "4 personnes", prixTotal: 2.5, calTotal: 600, unite: "personne" },
  chocolatChaud: { base: 2, baseLabel: "2 personnes", prixTotal: 2.0, calTotal: 400, unite: "personne" },
  granolaMaison: { base: 6, baseLabel: "6 personnes", prixTotal: 3.0, calTotal: 1800, unite: "personne" },
  tartetatinpommes: { base: 6, baseLabel: "6 personnes", prixTotal: 4.0, calTotal: 1800, unite: "personne" },
  croissant: { base: 8, baseLabel: "8 personnes", prixTotal: 3.0, calTotal: 2400, unite: "personne" },
  verrineframboisechocolat: { base: 4, baseLabel: "4 personnes", prixTotal: 4.0, calTotal: 1200, unite: "personne" },
  sauteporc: { base: 4, baseLabel: "4 personnes", prixTotal: 6.0, calTotal: 1200, unite: "personne" },
  veloutecourgette: { base: 4, baseLabel: "4 personnes", prixTotal: 2.5, calTotal: 600, unite: "personne" },
  ratatouille: { base: 4, baseLabel: "4 personnes", prixTotal: 3.5, calTotal: 800, unite: "personne" },

  financiers: { base: 12, baseLabel: "12 personnes", prixTotal: 2.5, calTotal: 2400, unite: "personne" },
  choufleurgratin: { base: 4, baseLabel: "4 personnes", prixTotal: 3.5, calTotal: 800, unite: "personne" },
  salmongrillee: { base: 4, baseLabel: "4 personnes", prixTotal: 8.0, calTotal: 800, unite: "personne" },
  sobejaponais: { base: 2, baseLabel: "2 personnes", prixTotal: 3.0, calTotal: 600, unite: "personne" },
  tartepistache: { base: 8, baseLabel: "8 personnes", prixTotal: 6.0, calTotal: 2400, unite: "personne" },
  agneluroti: { base: 6, baseLabel: "6 personnes", prixTotal: 12.0, calTotal: 1800, unite: "personne" },
  crepesbretonnes: { base: 4, baseLabel: "4 personnes", prixTotal: 4.0, calTotal: 1200, unite: "personne" },
  stroganov: { base: 4, baseLabel: "4 personnes", prixTotal: 8.0, calTotal: 1400, unite: "personne" },
  pizzahawaienne: { base: 2, baseLabel: "2 personnes", prixTotal: 4.0, calTotal: 1200, unite: "personne" },
  pouletescalopes: { base: 4, baseLabel: "4 personnes", prixTotal: 5.0, calTotal: 1200, unite: "personne" },
  tofusaute: { base: 4, baseLabel: "4 personnes", prixTotal: 4.0, calTotal: 800, unite: "personne" },
  saladecaprese: { base: 4, baseLabel: "4 personnes", prixTotal: 4.0, calTotal: 600, unite: "personne" },
  moulesmarinieres: { base: 4, baseLabel: "4 personnes", prixTotal: 8.0, calTotal: 800, unite: "personne" },
  coktailcosmopolitan: { base: 1, baseLabel: "1 personnes", prixTotal: 1.5, calTotal: 140, unite: "personne" },
  mocktailmentheagume: { base: 1, baseLabel: "1 personnes", prixTotal: 0.8, calTotal: 60, unite: "personne" },
  tartechocolatcaramel: { base: 8, baseLabel: "8 personnes", prixTotal: 5.0, calTotal: 3200, unite: "personne" },
  soupeharira: { base: 6, baseLabel: "6 personnes", prixTotal: 3.0, calTotal: 1200, unite: "personne" },
  bibimbap:           { base: 2,  baseLabel: "2 bols",        prixTotal: 7.00,  calTotal: 1000, unite: "bol"      },
  moquecabresil:      { base: 4,  baseLabel: "4 personnes",   prixTotal: 9.00,  calTotal: 1200, unite: "personne" },
  rendangboeuf:       { base: 4,  baseLabel: "4 personnes",   prixTotal: 12.00, calTotal: 2000, unite: "personne" },
  tacoshijosepastor:  { base: 2,  baseLabel: "2 personnes",   prixTotal: 5.00,  calTotal: 800,  unite: "personne" },
  grilladelamnocciole:{ base: 4,  baseLabel: "4 personnes",   prixTotal: 10.00, calTotal: 1200, unite: "personne" },
  sushimaison:        { base: 2,  baseLabel: "8 pièces",      prixTotal: 6.00,  calTotal: 600,  unite: "pièce"    },
  carigrioantillais:  { base: 4,  baseLabel: "4 personnes",   prixTotal: 8.00,  calTotal: 1600, unite: "personne" },
  semoulecourgette:   { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.00,  calTotal: 800,  unite: "personne" },
  pouletbasquaise:    { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  crevettespilpil:    { base: 4,  baseLabel: "4 personnes",   prixTotal: 9.00,  calTotal: 600,  unite: "personne" },
  lasagneverdure:     { base: 6,  baseLabel: "6 personnes",   prixTotal: 6.00,  calTotal: 2400, unite: "personne" },
  crumblefruits:      { base: 6,  baseLabel: "6 personnes",   prixTotal: 4.00,  calTotal: 1800, unite: "personne" },
  pintxosbasques:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 800,  unite: "personne" },
  misoramenleger:     { base: 2,  baseLabel: "2 bols",        prixTotal: 4.00,  calTotal: 600,  unite: "bol"      },
  veloutepatatepoireaux:{ base: 4,baseLabel: "4 personnes",   prixTotal: 2.50,  calTotal: 800,  unite: "personne" },
  terrinecampagne:    { base: 8,  baseLabel: "8 personnes",   prixTotal: 8.00,  calTotal: 2400, unite: "personne" },
  poulpegrillebresil: { base: 4,  baseLabel: "4 personnes",   prixTotal: 12.00, calTotal: 600,  unite: "personne" },
  pouletrotiperfect:  { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  millefeuille:       { base: 8,  baseLabel: "8 personnes",   prixTotal: 6.00,  calTotal: 2400, unite: "personne" },
  saumoncrouteherbes: { base: 4,  baseLabel: "4 personnes",   prixTotal: 8.00,  calTotal: 1000, unite: "personne" },
  ramenjaponais:      { base: 2,  baseLabel: "2 bols",        prixTotal: 8.00,  calTotal: 900,  unite: "bol" },
  gyoza:              { base: 20, baseLabel: "20 gyoza",      prixTotal: 5.00,  calTotal: 1000, unite: "gyoza" },
  tikamasala:         { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.00,  calTotal: 1600, unite: "personne" },
  phovietnambien:     { base: 2,  baseLabel: "2 bols",        prixTotal: 6.00,  calTotal: 700,  unite: "bol" },
  pizzamargherita:    { base: 2,  baseLabel: "2 pizzas",      prixTotal: 4.00,  calTotal: 1400, unite: "pizza" },
  carbonara:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 2000, unite: "personne" },
  ceebujen:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 10.00, calTotal: 2000, unite: "personne" },
  mafewestafricain:   { base: 4,  baseLabel: "4 personnes",   prixTotal: 8.00,  calTotal: 1800, unite: "personne" },
  gnocchismaison:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 1800, unite: "personne" },
  falafel:            { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.00,  calTotal: 800,  unite: "personne" },
  poulettandoori:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.00,  calTotal: 1200, unite: "personne" },
  pekinduckeasy:      { base: 4,  baseLabel: "4 personnes",   prixTotal: 15.00, calTotal: 1600, unite: "personne" },
  ossobuco:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 14.00, calTotal: 1600, unite: "personne" },
  tajinemouton:       { base: 4,  baseLabel: "4 personnes",   prixTotal: 12.00, calTotal: 1600, unite: "personne" },
  moelleuxchocolat:   { base: 6,  baseLabel: "6 moelleux",    prixTotal: 4.00,  calTotal: 2400, unite: "moelleux" },
  cheesecake:         { base: 8,  baseLabel: "8 personnes",   prixTotal: 7.00,  calTotal: 2400, unite: "personne" },
  painauchocolat:     { base: 8,  baseLabel: "8 pains",       prixTotal: 4.00,  calTotal: 2000, unite: "pain" },
  gateaubasque:       { base: 8,  baseLabel: "8 personnes",   prixTotal: 5.00,  calTotal: 2400, unite: "personne" },
  canelebordelais:    { base: 12, baseLabel: "12 cannelés",   prixTotal: 3.00,  calTotal: 1200, unite: "cannelé" },
  boeufbourguignon:   { base: 6, baseLabel: "6 personnes",  prixTotal: 18.00, calTotal: 3600, unite: "personne" },
  couscous:           { base: 6,  baseLabel: "6 personnes",  prixTotal: 12.00, calTotal: 2400, unite: "personne" },
  moussaka:           { base: 6,  baseLabel: "6 personnes",  prixTotal: 8.00,  calTotal: 2400, unite: "personne" },
  paella:             { base: 4,  baseLabel: "4 personnes",  prixTotal: 14.00, calTotal: 2000, unite: "personne" },
  butterchicken:      { base: 4,  baseLabel: "4 personnes",  prixTotal: 8.00,  calTotal: 1600, unite: "personne" },
  souvlaki:           { base: 4,  baseLabel: "4 personnes",  prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  quichelorraine:     { base: 6,  baseLabel: "6 personnes",  prixTotal: 4.50,  calTotal: 2400, unite: "personne" },
  soupeaoignon:       { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.50,  calTotal: 800,  unite: "personne" },
  dalindien:          { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.00,  calTotal: 1200, unite: "personne" },
  rizcantonnais:      { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.50,  calTotal: 1200, unite: "personne" },
  hariramarocaine:    { base: 6,  baseLabel: "6 personnes",  prixTotal: 5.00,  calTotal: 1200, unite: "personne" },
  naan:               { base: 4,  baseLabel: "4 naans",      prixTotal: 1.50,  calTotal: 800,  unite: "naan" },
  verrinetiramisu:    { base: 6,  baseLabel: "6 verrines",   prixTotal: 6.00,  calTotal: 1800, unite: "verrine" },
  churros:            { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.00,  calTotal: 1600, unite: "personne" },
  potaufeu:           { base: 6,  baseLabel: "6 personnes",  prixTotal: 15.00, calTotal: 2400, unite: "personne" },
  parisbrestreinterpretation: { base: 8, baseLabel: "8 personnes", prixTotal: 8.00, calTotal: 3200, unite: "personne" },
  pouletcitronthym:   { base: 2, baseLabel: "2 personnes",  prixTotal: 5.50,  calTotal: 900,  unite: "personne" },
  salmonteriyaki:     { base: 2, baseLabel: "2 personnes",  prixTotal: 8.00,  calTotal: 1000, unite: "personne" },
  bolognaisemaison:   { base: 4, baseLabel: "4 personnes",  prixTotal: 6.00,  calTotal: 2400, unite: "personne" },
  tacosmaison:        { base: 2, baseLabel: "2 personnes",  prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  padthai:            { base: 2, baseLabel: "2 personnes",  prixTotal: 6.50,  calTotal: 1000, unite: "personne" },
  currypouletcoco:    { base: 4, baseLabel: "4 personnes",  prixTotal: 7.00,  calTotal: 1600, unite: "personne" },
  burgermaison:       { base: 2, baseLabel: "2 burgers",    prixTotal: 6.00,  calTotal: 1400, unite: "burger" },
  risottoprimavera:   { base: 4, baseLabel: "4 personnes",  prixTotal: 5.00,  calTotal: 1600, unite: "personne" },
  saumongravlax:      { base: 4, baseLabel: "4 personnes",  prixTotal: 12.00, calTotal: 800,  unite: "personne" },
  shakshuka:          { base: 2, baseLabel: "2 personnes",  prixTotal: 3.50,  calTotal: 600,  unite: "personne" },
  saladeniçoise:      { base: 4, baseLabel: "4 personnes",  prixTotal: 6.00,  calTotal: 800,  unite: "personne" },
  saladecesar:        { base: 4, baseLabel: "4 personnes",  prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  saladegreque:       { base: 4, baseLabel: "4 personnes",  prixTotal: 5.00,  calTotal: 600,  unite: "personne" },
  saladepatasthon:    { base: 4, baseLabel: "4 personnes",  prixTotal: 4.50,  calTotal: 1400, unite: "personne" },
  saladerizmediterranee: { base: 4, baseLabel: "4 personnes", prixTotal: 4.00, calTotal: 1200, unite: "personne" },
  tabulemaison:       { base: 4, baseLabel: "4 personnes",  prixTotal: 3.00,  calTotal: 800,  unite: "personne" },
  saladelentilles:    { base: 4, baseLabel: "4 personnes",  prixTotal: 4.00,  calTotal: 1000, unite: "personne" },
  saladeavocatcrevettes: { base: 4, baseLabel: "4 personnes", prixTotal: 8.00, calTotal: 800,  unite: "personne" },
  risotto:          { base: 4,  baseLabel: "4 personnes",  prixTotal: 5.00,  calTotal: 2000, unite: "personne" },
  gratindauphinois: { base: 6,  baseLabel: "6 personnes",  prixTotal: 4.50,  calTotal: 2400, unite: "personne" },
  cremebrulee:      { base: 6,  baseLabel: "6 ramequins",  prixTotal: 4.00,  calTotal: 2100, unite: "ramequin" },
  mousseauchocolat: { base: 6,  baseLabel: "6 personnes",  prixTotal: 3.50,  calTotal: 2400, unite: "personne" },
  ileflottante:     { base: 6,  baseLabel: "6 personnes",  prixTotal: 3.00,  calTotal: 1800, unite: "personne" },
  fondantchocolat:  { base: 6,  baseLabel: "6 fondants",   prixTotal: 3.80,  calTotal: 3000, unite: "fondant" },
  madeleine:        { base: 12, baseLabel: "12 madeleines",prixTotal: 2.50,  calTotal: 1800, unite: "madeleine" },
  bananabread:      { base: 8,  baseLabel: "8 tranches",   prixTotal: 2.80,  calTotal: 2400, unite: "tranche" },
  veloutelegumes:   { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.50,  calTotal: 600,  unite: "personne" },
  houmous:          { base: 6,  baseLabel: "6 personnes",  prixTotal: 2.50,  calTotal: 900,   unite: "personne" },
  overnightoats:    { base: 1,  baseLabel: "1 pot",         prixTotal: 1.20,  calTotal: 350,   unite: "pot" },
  buddhaBowl:       { base: 2,  baseLabel: "2 bols",        prixTotal: 5.00,  calTotal: 900,   unite: "bol" },
  soupemiso:        { base: 2,  baseLabel: "2 personnes",   prixTotal: 2.50,  calTotal: 200,   unite: "personne" },
  wrappoulet:       { base: 2,  baseLabel: "2 wraps",       prixTotal: 4.00,  calTotal: 700,   unite: "wrap" },
  energyballs:      { base: 12, baseLabel: "12 balls",      prixTotal: 3.00,  calTotal: 1200,  unite: "ball" },
  pancakesproteine: { base: 2,  baseLabel: "2 pancakes",    prixTotal: 1.50,  calTotal: 300,   unite: "pancake" },
  bowlacai:         { base: 1,  baseLabel: "1 bol",         prixTotal: 4.00,  calTotal: 400,   unite: "bol" },
  saladepoischiches:{ base: 4,  baseLabel: "4 personnes",   prixTotal: 3.00,  calTotal: 800,   unite: "personne" },
  gaspacho:         { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.50,  calTotal: 400,   unite: "personne" },
  curryledumes:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.00,  calTotal: 1200,  unite: "personne" },
  // Nouvelles recettes batch 3
  cassoulet:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 9.50,  calTotal: 2800, unite: "personne" },
  hachisparmentier:    { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.20,  calTotal: 2200, unite: "personne" },
  daubeProvencale:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 12.00, calTotal: 2400, unite: "personne" },
  pouletNormande:      { base: 4,  baseLabel: "4 personnes",   prixTotal: 8.50,  calTotal: 1800, unite: "personne" },
  tajinepoulet:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.80,  calTotal: 1600, unite: "personne" },
  saltimbocca:         { base: 4,  baseLabel: "4 personnes",   prixTotal: 11.00, calTotal: 1400, unite: "personne" },
  bouillabaisse:       { base: 4,  baseLabel: "4 personnes",   prixTotal: 18.00, calTotal: 1600, unite: "personne" },
  gratinPates:         { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.80,  calTotal: 2000, unite: "personne" },
  volauVent:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 9.00,  calTotal: 1600, unite: "personne" },
  jambonneauLentilles: { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.50,  calTotal: 1800, unite: "personne" },
  boulettesViande:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.50,  calTotal: 1600, unite: "personne" },
  saladeThai:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.50,  calTotal: 600,  unite: "personne" },
  saladeHaricotsVerts: { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.20,  calTotal: 400,  unite: "personne" },
  saladeFruitsMer:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 12.00, calTotal: 600,  unite: "personne" },
  saladePoulpe:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 10.00, calTotal: 500,  unite: "personne" },
  soupeLentillesCorail:{ base: 4,  baseLabel: "4 personnes",   prixTotal: 2.80,  calTotal: 600,  unite: "personne" },
  bowlProteineVege:    { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.50,  calTotal: 800,  unite: "personne" },
  soupeDetox:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.50,  calTotal: 200,  unite: "personne" },
  saladeKale:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.00,  calTotal: 400,  unite: "personne" },
  bruschetta:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.50,  calTotal: 400,  unite: "personne" },
  samosas:             { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.50,  calTotal: 600,  unite: "personne" },
  springRolls:         { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 400,  unite: "personne" },
  oeufsCocotte:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.80,  calTotal: 400,  unite: "personne" },
  tarteFragoles:       { base: 6,  baseLabel: "6 parts",       prixTotal: 6.50,  calTotal: 1800, unite: "part" },
  pannaCotta:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.50,  calTotal: 1000, unite: "personne" },
  eclair:              { base: 4,  baseLabel: "4 éclairs",     prixTotal: 4.50,  calTotal: 1600, unite: "éclair" },
  pavlova:             { base: 6,  baseLabel: "6 parts",       prixTotal: 5.00,  calTotal: 1800, unite: "part" },
  profiteroles:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.50,  calTotal: 1600, unite: "personne" },
  brandadeMorue:       { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.50,  calTotal: 1400, unite: "personne" },
  // Batch 4
  sobejaponais:           { base: 2,  baseLabel: "2 personnes",   prixTotal: 2.50,  calTotal: 400,  unite: "personne" },
  tartarethon:            { base: 4,  baseLabel: "4 personnes",   prixTotal: 9.00,  calTotal: 600,  unite: "personne" },
  pouletcitroncitronelle: { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.50,  calTotal: 800,  unite: "personne" },
  velouteAsperges:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.50,  calTotal: 300,  unite: "personne" },
  saladeLegsRoasted:      { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.00,  calTotal: 400,  unite: "personne" },
  quinoalegumes:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.50,  calTotal: 500,  unite: "personne" },
  patatesdoucesCurry:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.80,  calTotal: 600,  unite: "personne" },
  falafelbaked:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.80,  calTotal: 500,  unite: "personne" },
  smoothievert:           { base: 2,  baseLabel: "2 personnes",   prixTotal: 2.00,  calTotal: 120,  unite: "personne" },
  assiettepouletpatate:   { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.00,  calTotal: 700,  unite: "personne" },
  gnocchisgorgonzola:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.50,  calTotal: 900,  unite: "personne" },
  risottocourgettechevre: { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 700,  unite: "personne" },
  currypoischiches:       { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.50,  calTotal: 600,  unite: "personne" },
  pastapomodoro:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 2.80,  calTotal: 700,  unite: "personne" },
  omeletteprovencale:     { base: 4,  baseLabel: "4 personnes",   prixTotal: 3.20,  calTotal: 400,  unite: "personne" },
  tarteepinardfeta:       { base: 6,  baseLabel: "6 parts",       prixTotal: 5.50,  calTotal: 1400, unite: "part" },
  veggieburger:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.00,  calTotal: 600,  unite: "personne" },
  soufflecheese:          { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.50,  calTotal: 500,  unite: "personne" },
  paellaVege:             { base: 4,  baseLabel: "4 personnes",   prixTotal: 5.50,  calTotal: 800,  unite: "personne" },
  bellini:                { base: 1,  baseLabel: "1 verre",       prixTotal: 2.50,  calTotal: 120,  unite: "verre" },
  frenchMartini:          { base: 1,  baseLabel: "1 verre",       prixTotal: 2.00,  calTotal: 180,  unite: "verre" },
  darkStormyCocktail:     { base: 1,  baseLabel: "1 verre",       prixTotal: 2.50,  calTotal: 150,  unite: "verre" },
  amarettoSour:           { base: 1,  baseLabel: "1 verre",       prixTotal: 2.80,  calTotal: 180,  unite: "verre" },
  aperolPamplemousse:     { base: 1,  baseLabel: "1 verre",       prixTotal: 2.50,  calTotal: 140,  unite: "verre" },
  mocktailframboisementhe:{ base: 1,  baseLabel: "1 verre",       prixTotal: 1.50,  calTotal: 80,   unite: "verre" },
  mocktailpassionsoleil:  { base: 1,  baseLabel: "1 verre",       prixTotal: 1.80,  calTotal: 100,  unite: "verre" },
  mocktailconcombrecitr:  { base: 1,  baseLabel: "1 verre",       prixTotal: 1.20,  calTotal: 60,   unite: "verre" },
  mocktailgingembre:      { base: 1,  baseLabel: "1 verre",       prixTotal: 1.50,  calTotal: 80,   unite: "verre" },
  mocktailfraisesvanille: { base: 1,  baseLabel: "1 verre",       prixTotal: 1.80,  calTotal: 110,  unite: "verre" },
  tarteNormande:       { base: 6,  baseLabel: "6 parts",       prixTotal: 5.00,  calTotal: 2100, unite: "part" },
};

// ==============================
// INGRÉDIENTS POUR LES COURSES
// Extrait les ingrédients depuis n'importe quel type de recette
// ==============================

// ============================================================
// FONCTION GÉNÉRIQUE — remplace toutes les htmlTableau*Colonnes
// ============================================================
function htmlTableauGenerique(ligne) {
  if (!ligne) return "";
  const ignorés = new Set(["nb", "label", "total", "unite"]);
  return Object.entries(ligne)
    .filter(([k]) => !ignorés.has(k))
    .map(([k, v]) => {
      const label = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[k])
        ? INGREDIENTS_LABELS[k]
        : k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, " $1");
      if (!label || !v || v === "0" || v === 0) return "";
      return `<div class="fiche-ingredient"><span>${label}</span><b>${v}</b></div>`;
    })
    .filter(Boolean)
    .join("");
}

// Alias pour toutes les fonctions manquantes
const _htmlFns = [
  "htmlTableauAvocatCrevettesColonnes","htmlTableauBananaBreadColonnes",
  "htmlTableauBoeufColonnes","htmlTableauBowlAcaiColonnes","htmlTableauBriocheColonnes",
  "htmlTableauBuddhaBowlColonnes","htmlTableauClafoutisColonnes","htmlTableauCookiesColonnes",
  "htmlTableauCremeBruleeColonnes","htmlTableauCrepesColonnes","htmlTableauCroquesColonnes",
  "htmlTableauCurryLegumesColonnes","htmlTableauEnergyBallsColonnes","htmlTableauFlanColonnes",
  "htmlTableauFondantColonnes","htmlTableauGaletteTacosColonnes","htmlTableauGaspachoColonnes",
  "htmlTableauGaufresColonnes","htmlTableauGoumeauColonnes","htmlTableauGranolaColonnes",
  "htmlTableauGratinColonnes","htmlTableauGravlaxColonnes","htmlTableauHoumousColonnes",
  "htmlTableauIleFlottanteColonnes","htmlTableauLasagneColonnes","htmlTableauMadeleineColonnes",
  "htmlTableauMousseColonnes","htmlTableauMuffinsColonnes","htmlTableauOvernightOatsColonnes",
  "htmlTableauPainBurgerColonnes","htmlTableauPainDeMieColonnes","htmlTableauPancakesColonnes",
  "htmlTableauPancakesProteineColonnes","htmlTableauParisBrestColonnes","htmlTableauPizzaColonnes",
  "htmlTableauPotAuFeuColonnes","htmlTableauQuinoaColonnes","htmlTableauRisottoColonnes",
  "htmlTableauSaladeCesarColonnes","htmlTableauSaladeGrequeColonnes","htmlTableauSaladeLentillesColonnes",
  "htmlTableauSaladeNicoiseColonnes","htmlTableauSaladePatasColonnes","htmlTableauSaladePoisChichesColonnes",
  "htmlTableauSaladeRizColonnes","htmlTableauSmoothieColonnes","htmlTableauSoupeMisoColonnes",
  "htmlTableauTabuleColonnes","htmlTableauTarteCitronColonnes","htmlTableauTartePommesColonnes",
  "htmlTableauTiramisuColonnes","htmlTableauVelouteLegumesColonnes","htmlTableauVerrineTiramisuColonnes",
  "htmlTableauWrapPouletColonnes","htmlTableauYaourtColonnes"
];
_htmlFns.forEach(fn => { window[fn] = htmlTableauGenerique; });


function getIngredientsCourses(nom, personnes) {
  const data = recettes[nom];
  if (!data) return {};
  const result = {};

  const ajout = (label, qte) => {
    if (!label || label.startsWith("---")) return;
    if (!result[label]) result[label] = { qte: 0, raw: null };
    if (typeof qte === "number" && !isNaN(qte) && qte > 0) {
      result[label].qte += qte;
    } else if (qte && typeof qte === "string" && qte.trim() !== "") {
      result[label].raw = qte;
    }
  };

  // Extraire le label propre depuis le mapping
  const getLabel = (key) => {
    if (!key || key === "nb") return null;
    if (INGREDIENTS_LABELS[key] !== undefined) return INGREDIENTS_LABELS[key];
    // Fallback : camelCase → lisible
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
  };

  // Recettes avec ingredientsFixes
  if (data.fixe && data.ingredientsFixes) {
    data.ingredientsFixes.forEach(([k, v]) => {
      if (!k.startsWith("---")) ajout(k, v);
    });
    return result;
  }

  // Chercher le tableau de la recette (dans toutes les tables globales ET dynamiquement)
  const toutesLesTables = [
    window._nouvellesRecettesTables,
    window.mondeClassiquesTablesGlobal,
    window.hellofreshTablesGlobal,
    window.cocktailsTablesGlobal,
  ].filter(Boolean);

  for (const tables of toutesLesTables) {
    if (tables[nom] && data[tables[nom].table]) {
      const tbl = data[tables[nom].table];
      const ligne = tbl.find(l => l.nb === personnes) || tbl[Math.floor(tbl.length / 2)];
      if (ligne) {
        Object.entries(ligne).forEach(([k, v]) => {
          const label = getLabel(k);
          if (!label) return;
          const num = parseFloat(String(v).replace(/[^\d.]/g, ""));
          ajout(label, !isNaN(num) && num > 0 ? num : v);
        });
      }
      return result;
    }
  }

  // Chercher dynamiquement le premier tableau disponible
  const cleTbl = Object.keys(data).find(k => k.startsWith("tableau") && Array.isArray(data[k]));
  if (cleTbl) {
    const tbl = data[cleTbl];
    const ligne = tbl.find(l => l.nb === personnes) || tbl[Math.floor(tbl.length / 2)];
    if (ligne) {
      Object.entries(ligne).forEach(([k, v]) => {
        const label = getLabel(k);
        if (!label) return;
        const num = parseFloat(String(v).replace(/[^\d.]/g, ""));
        ajout(label, !isNaN(num) && num > 0 ? num : v);
      });
      return result;
    }
  }

  // Fallback : ingredients standard
  if (data.ingredients && Object.keys(data.ingredients).length > 0) {
    const ratio = personnes / (data.base || 4);
    Object.entries(data.ingredients).forEach(([k, v]) => {
      ajout(k, typeof v === "number" ? Math.round(v * ratio * 10) / 10 : v);
    });
  }

  return result;
}


function afficherCoursesRecette(nom, personnes) {
  const id = "courses-recette-" + nom;
  const bloc = document.getElementById(id);
  if (!bloc) return;

  // Toggle
  if (bloc.style.display !== "none") {
    bloc.style.display = "none";
    return;
  }

  const ingrs = getIngredientsCourses(nom, personnes);
  const entries = Object.entries(ingrs).filter(([k]) => !k.startsWith("---"));

  if (entries.length === 0) {
    bloc.innerHTML = '<p style="color:#aaa;font-size:13px;text-align:center;padding:10px">Liste non disponible pour cette recette.</p>';
    bloc.style.display = "block";
    return;
  }

  let html = `<div class="courses-recette-liste">`;
  entries.sort((a,b) => a[0].localeCompare(b[0])).forEach(([nom, data]) => {
    let qteStr = "";
    if (typeof data.qte === "number" && data.qte > 0) {
      qteStr = data.qte % 1 === 0 ? `${data.qte}` : `${data.qte.toFixed(1)}`;
    } else if (data.raw) {
      qteStr = data.raw;
    }
    html += `<div class="courses-recette-item">
      <span class="courses-recette-nom">${nom}</span>
      <span class="courses-recette-qte">${qteStr}</span>
    </div>`;
  });
  html += "</div>";

  bloc.innerHTML = html;
  bloc.style.display = "block";
}

function htmlPrixCalories(nom, quantite) {
  const pc = prixCalories[nom];
  if (!pc) return "";
  const data = recettes[nom];
  let ratio = 1;
  if (data && data.fixe) {
    ratio = 1;
  } else if (nom === "brioche") {
    // 1=1 avec lait, 2=2 avec lait, 3=1 sans lait, 4=2 sans lait
    ratio = (quantite === 2 || quantite === 4) ? 2 : 1;
  } else {
    ratio = quantite / pc.base;
  }
  const prix  = (pc.prixTotal * ratio).toFixed(2);
  const cal   = Math.round(pc.calTotal * ratio);
  const calPar = Math.round(pc.calTotal / pc.base);
  return `
    <div class="prix-cal-bloc">
      <div class="prix-cal-item">
        <span class="pc-icone">💰</span>
        <div class="pc-valeur">${prix} €</div>
        <div class="pc-label">Coût estimé</div>
      </div>
      <div class="prix-cal-item">
        <span class="pc-icone">🔥</span>
        <div class="pc-valeur">${cal} kcal</div>
        <div class="pc-label">Total recette</div>
      </div>
      <div class="prix-cal-item">
        <span class="pc-icone">👤</span>
        <div class="pc-valeur">${calPar} kcal</div>
        <div class="pc-label">Par ${pc.unite}</div>
      </div>
    </div>
    <p class="prix-cal-note">* Prix moyens supermarché France 2025</p>
    <button class="btn-courses-recette" onclick="afficherCoursesRecette('${nom}', ${quantite})">
      🛒 Liste de courses
    </button>
    <div class="courses-recette-bloc" id="courses-recette-${nom}" style="display:none"></div>
  `;
}

// =============================
// FICHE PLEINE PAGE
// =============================

function choisirRecette(nom) {
  const data = recettes[nom];
  if (!data) return;

  // Sauvegarder dans les recettes vues récemment
  try {
    let recents = window._recentsVus || [];
    recents = [nom, ...recents.filter(k => k !== nom)].slice(0, 20);
    window._recentsVus = recents;
    localStorage.setItem("recentsVus", JSON.stringify(recents));
  } catch(e) {}

  const inputPersonnes = document.getElementById("personnes");

  const personnes = inputPersonnes ? parseInt(inputPersonnes.value) || data.base : data.base;
  const ratio = personnes / data.base;

  // Label quantité
  const briocheVersions = { 1: "1 brioche 🥛", 2: "2 brioches 🥛", 3: "1 brioche 🥛🚫", 4: "2 brioches 🥛🚫" };
  const labelQte = (nom === "patefeuilletee" || nom === "patebrisee")
    ? "🥧 1 pâte (~28 cm)"
    : nom === "patesablee"
    ? "🍪 1 pâte (~28 cm)"
    : nom === "painbaguette"
    ? "🥖 1 baguette (~250g)"
    : nom === "pizza"
    ? `🍕 ${personnes} pâton${personnes > 1 ? "s" : ""}`
    : nom === "brioche"
    ? `🍞 ${briocheVersions[personnes] || personnes}`
    : `👥 ${personnes} personne${personnes > 1 ? "s" : ""}`;

  // Ingrédients
  let listeIngredients = "";
  if (nom === "pizza" && data.tableauPatons) {
    const ligne = data.tableauPatons.find(l => l.patons === personnes);
    if (ligne) listeIngredients = htmlTableauPizzaColonnes(ligne);
  } else if (nom === "crepes" && data.tableauPersonnes) {
    const ligne = data.tableauPersonnes.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauCrepesColonnes(ligne);
  } else if (nom === "gaufres" && data.tableauGaufres) {
    const ligne = data.tableauGaufres.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauGaufresColonnes(ligne);
  } else if (nom === "overnightoats" && data.tableauOvernightOats) {
    const ligne = data.tableauOvernightOats.find(l => l.nb === personnes) || data.tableauOvernightOats[0];
    listeIngredients = htmlTableauOvernightOatsColonnes(ligne);
  } else if (nom === "buddhaBowl" && data.tableauBuddhaBowl) {
    const ligne = data.tableauBuddhaBowl.find(l => l.nb === personnes) || data.tableauBuddhaBowl[1];
    listeIngredients = htmlTableauBuddhaBowlColonnes(ligne);
  } else if (nom === "soupemiso" && data.tableauSoupeMiso) {
    const ligne = data.tableauSoupeMiso.find(l => l.nb === personnes) || data.tableauSoupeMiso[1];
    listeIngredients = htmlTableauSoupeMisoColonnes(ligne);
  } else if (nom === "wrappoulet" && data.tableauWrapPoulet) {
    const ligne = data.tableauWrapPoulet.find(l => l.nb === personnes) || data.tableauWrapPoulet[1];
    listeIngredients = htmlTableauWrapPouletColonnes(ligne);
  } else if (nom === "energyballs" && data.tableauEnergyBalls) {
    const ligne = data.tableauEnergyBalls.find(l => l.nb === personnes) || data.tableauEnergyBalls[2];
    listeIngredients = htmlTableauEnergyBallsColonnes(ligne);
  } else if (nom === "pancakesproteine" && data.tableauPancakesProteine) {
    const ligne = data.tableauPancakesProteine.find(l => l.nb === personnes) || data.tableauPancakesProteine[1];
    listeIngredients = htmlTableauPancakesProteineColonnes(ligne);
  } else if (nom === "bowlacai" && data.tableauBowlAcai) {
    const ligne = data.tableauBowlAcai.find(l => l.nb === personnes) || data.tableauBowlAcai[0];
    listeIngredients = htmlTableauBowlAcaiColonnes(ligne);
  } else if (nom === "saladepoischiches" && data.tableauSaladePoisChiches) {
    const ligne = data.tableauSaladePoisChiches.find(l => l.nb === personnes) || data.tableauSaladePoisChiches[3];
    listeIngredients = htmlTableauSaladePoisChichesColonnes(ligne);
  } else if (nom === "gaspacho" && data.tableauGaspacho) {
    const ligne = data.tableauGaspacho.find(l => l.nb === personnes) || data.tableauGaspacho[3];
    listeIngredients = htmlTableauGaspachoColonnes(ligne);
  } else if (nom === "curryledumes" && data.tableauCurryLegumes) {
    const ligne = data.tableauCurryLegumes.find(l => l.nb === personnes) || data.tableauCurryLegumes[3];
    listeIngredients = htmlTableauCurryLegumesColonnes(ligne);
  } else if (nom === "smoothiebowl" && data.tableauSmoothie) {
    const ligne = data.tableauSmoothie.find(l => l.nb === personnes) || data.tableauSmoothie[1];
    listeIngredients = htmlTableauSmoothieColonnes(ligne);
  } else if (nom === "yaourt" && data.tableauYaourt) {
    const ligne = data.tableauYaourt.find(l => l.nb === personnes) || data.tableauYaourt[3];
    listeIngredients = htmlTableauYaourtColonnes(ligne);
  } else if (nom === "pancakes" && data.tableauPancakes) {
    const ligne = data.tableauPancakes.find(l => l.nb === personnes) || data.tableauPancakes[3];
    listeIngredients = htmlTableauPancakesColonnes(ligne);
  } else if (nom === "muffins" && data.tableauMuffins) {
    const ligne = data.tableauMuffins.find(l => l.nb === personnes) || data.tableauMuffins[11];
    listeIngredients = htmlTableauMuffinsColonnes(ligne);
  } else if (nom === "croquemonsieur" && data.tableauCroques) {
    const ligne = data.tableauCroques.find(l => l.nb === personnes) || data.tableauCroques[3];
    listeIngredients = htmlTableauCroquesColonnes(ligne);
  } else if (nom === "saladeniçoise" && data.tableauSaladeNicoise) {
    const ligne = data.tableauSaladeNicoise.find(l => l.nb === personnes) || data.tableauSaladeNicoise[3];
    listeIngredients = htmlTableauSaladeNicoiseColonnes(ligne);
  } else if (nom === "saladecesar" && data.tableauSaladeCesar) {
    const ligne = data.tableauSaladeCesar.find(l => l.nb === personnes) || data.tableauSaladeCesar[3];
    listeIngredients = htmlTableauSaladeCesarColonnes(ligne);
  } else if (nom === "saladegreque" && data.tableauSaladeGreque) {
    const ligne = data.tableauSaladeGreque.find(l => l.nb === personnes) || data.tableauSaladeGreque[3];
    listeIngredients = htmlTableauSaladeGrequeColonnes(ligne);
  } else if (nom === "saladepatasthon" && data.tableauSaladePatas) {
    const ligne = data.tableauSaladePatas.find(l => l.nb === personnes) || data.tableauSaladePatas[3];
    listeIngredients = htmlTableauSaladePatasColonnes(ligne);
  } else if (nom === "saladerizmediterranee" && data.tableauSaladeRiz) {
    const ligne = data.tableauSaladeRiz.find(l => l.nb === personnes) || data.tableauSaladeRiz[3];
    listeIngredients = htmlTableauSaladeRizColonnes(ligne);
  } else if (nom === "tabulemaison" && data.tableauTabule) {
    const ligne = data.tableauTabule.find(l => l.nb === personnes) || data.tableauTabule[3];
    listeIngredients = htmlTableauTabuleColonnes(ligne);
  } else if (nom === "saladelentilles" && data.tableauSaladeLentilles) {
    const ligne = data.tableauSaladeLentilles.find(l => l.nb === personnes) || data.tableauSaladeLentilles[3];
    listeIngredients = htmlTableauSaladeLentillesColonnes(ligne);
  } else if (nom === "saladeavocatcrevettes" && data.tableauAvocatCrevettes) {
    const ligne = data.tableauAvocatCrevettes.find(l => l.nb === personnes) || data.tableauAvocatCrevettes[3];
    listeIngredients = htmlTableauAvocatCrevettesColonnes(ligne);
  } else if (nom === "goumeau" && data.tableauGoumeau) {
    const ligne = data.tableauGoumeau.find(l => l.nb === personnes) || data.tableauGoumeau[3];
    listeIngredients = htmlTableauGoumeauColonnes(ligne);
  } else if (nom === "galettetacos" && data.tableauGaletteTacos) {
    const ligne = data.tableauGaletteTacos.find(l => l.nb === personnes) || data.tableauGaletteTacos[3];
    listeIngredients = htmlTableauGaletteTacosColonnes(ligne);
  } else if (nom === "painburger" && data.tableauPainBurger) {
    const ligne = data.tableauPainBurger.find(l => l.nb === personnes) || data.tableauPainBurger[2];
    listeIngredients = htmlTableauPainBurgerColonnes(ligne);
  } else if (nom === "paindemie" && data.tableauPainDeMie) {
    const ligne = data.tableauPainDeMie.find(l => l.nb === personnes) || data.tableauPainDeMie[19];
    listeIngredients = htmlTableauPainDeMieColonnes(ligne);
  } else if (nom === "tiramisu" && data.tableauTiramisu) {
    const ligne = data.tableauTiramisu.find(l => l.nb === personnes) || data.tableauTiramisu[5];
    listeIngredients = htmlTableauTiramisuColonnes(ligne);
  } else if (nom === "flan" && data.tableauFlan) {
    const ligne = data.tableauFlan.find(l => l.nb === personnes) || data.tableauFlan[5];
    listeIngredients = htmlTableauFlanColonnes(ligne);
  } else if (nom === "clafoutis" && data.tableauClafoutis) {
    const ligne = data.tableauClafoutis.find(l => l.nb === personnes) || data.tableauClafoutis[5];
    listeIngredients = htmlTableauClafoutisColonnes(ligne);
  } else if (nom === "tarteaupommes" && data.tableauTartePommes) {
    const ligne = data.tableauTartePommes.find(l => l.nb === personnes) || data.tableauTartePommes[5];
    listeIngredients = htmlTableauTartePommesColonnes(ligne);
  } else if (window._nouvellesRecettesTables && window._nouvellesRecettesTables[nom] && data[window._nouvellesRecettesTables[nom].table]) {
    const cfgN = window._nouvellesRecettesTables[nom];
    const ligneN = data[cfgN.table].find(l => l.nb === personnes) || data[cfgN.table][Math.floor(data[cfgN.table].length/2)];
    listeIngredients = cfgN.fn(ligneN);
  } else if (cocktailsTablesGlobal && cocktailsTablesGlobal[nom] && data[cocktailsTablesGlobal[nom].table]) {
    const cfgC = cocktailsTablesGlobal[nom];
    const ligneC = data[cfgC.table].find(l => l.nb === personnes) || data[cfgC.table][0];
    listeIngredients = cfgC.fn(ligneC);
  } else if (nom === "parisbrestreinterpretation" && data.tableauParisBrest) {
    const ligne = data.tableauParisBrest.find(l => l.nb === personnes) || data.tableauParisBrest[7];
    listeIngredients = htmlTableauParisBrestColonnes(ligne);
  } else if (nom === "saumongravlax" && data.tableauGravlax) {
    const ligne = data.tableauGravlax.find(l => l.nb === personnes) || data.tableauGravlax[3];
    listeIngredients = htmlTableauGravlaxColonnes(ligne);
  } else if (nom === "verrinetiramisu" && data.tableauVerrineTiramisu) {
    const ligne = data.tableauVerrineTiramisu.find(l => l.nb === personnes) || data.tableauVerrineTiramisu[5];
    listeIngredients = htmlTableauVerrineTiramisuColonnes(ligne);
  } else if (nom === "potaufeu" && data.tableauPotAuFeu) {
    const ligne = data.tableauPotAuFeu.find(l => l.nb === personnes) || data.tableauPotAuFeu[5];
    listeIngredients = htmlTableauPotAuFeuColonnes(ligne);
  } else if (mondeClassiquesTablesGlobal && mondeClassiquesTablesGlobal[nom] && data[mondeClassiquesTablesGlobal[nom].table]) {
    const cfg2 = mondeClassiquesTablesGlobal[nom];
    const ligne2 = data[cfg2.table].find(l => l.nb === personnes) || data[cfg2.table][1];
    listeIngredients = cfg2.fn(ligne2);
  } else if (hellofreshTablesGlobal && hellofreshTablesGlobal[nom] && data[hellofreshTablesGlobal[nom].table]) {
    const cfg = hellofreshTablesGlobal[nom];
    const ligne = data[cfg.table].find(l => l.nb === personnes) || data[cfg.table][1];
    listeIngredients = cfg.fn(ligne);
  } else if (nom === "boeufbourguignon" && data.tableauBoeuf) {
    const ligne = data.tableauBoeuf.find(l => l.nb === personnes) || data.tableauBoeuf[2];
    listeIngredients = htmlTableauBoeufColonnes(ligne);
  } else if (nom === "gratindauphinois" && data.tableauGratin) {
    const ligne = data.tableauGratin.find(l => l.nb === personnes) || data.tableauGratin[2];
    listeIngredients = htmlTableauGratinColonnes(ligne);
  } else if (nom === "cremebrulee" && data.tableauCremebrulee) {
    const ligne = data.tableauCremebrulee.find(l => l.nb === personnes) || data.tableauCremebrulee[2];
    listeIngredients = htmlTableauCremeBruleeColonnes(ligne);
  } else if (nom === "mousseauchocolat" && data.tableauMousse) {
    const ligne = data.tableauMousse.find(l => l.nb === personnes) || data.tableauMousse[2];
    listeIngredients = htmlTableauMousseColonnes(ligne);
  } else if (nom === "ileflottante" && data.tableauIleFlottante) {
    const ligne = data.tableauIleFlottante.find(l => l.nb === personnes) || data.tableauIleFlottante[2];
    listeIngredients = htmlTableauIleFlottanteColonnes(ligne);
  } else if (nom === "bananabread" && data.tableauBananaBread) {
    const ligne = data.tableauBananaBread.find(l => l.nb === personnes) || data.tableauBananaBread[4];
    listeIngredients = htmlTableauBananaBreadColonnes(ligne);
  } else if (nom === "granola" && data.tableauGranola) {
    const ligne = data.tableauGranola.find(l => l.nb === personnes) || data.tableauGranola[4];
    listeIngredients = htmlTableauGranolaColonnes(ligne);
  } else if (nom === "houmous" && data.tableauHoumous) {
    const ligne = data.tableauHoumous.find(l => l.nb === personnes) || data.tableauHoumous[2];
    listeIngredients = htmlTableauHoumousColonnes(ligne);
  } else if (nom === "risotto" && data.tableauRisotto) {
    const ligne = data.tableauRisotto.find(l => l.nb === personnes) || data.tableauRisotto[3];
    listeIngredients = htmlTableauRisottoColonnes(ligne);
  } else if (nom === "fondantchocolat" && data.tableauFondant) {
    const ligne = data.tableauFondant.find(l => l.nb === personnes) || data.tableauFondant[5];
    listeIngredients = htmlTableauFondantColonnes(ligne);
  } else if (nom === "madeleine" && data.tableauMadeleine) {
    const ligne = data.tableauMadeleine.find(l => l.nb === personnes) || data.tableauMadeleine[11];
    listeIngredients = htmlTableauMadeleineColonnes(ligne);
  } else if (nom === "veloutelegumes" && data.tableauVeloute) {
    const ligne = data.tableauVeloute.find(l => l.nb === personnes) || data.tableauVeloute[3];
    listeIngredients = htmlTableauVelouteLegumesColonnes(ligne);
  } else if (nom === "tartecitron" && data.tableauTarteCitron) {
    const ligne = data.tableauTarteCitron.find(l => l.nb === personnes) || data.tableauTarteCitron[5];
    listeIngredients = htmlTableauTarteCitronColonnes(ligne);
  } else if (nom === "saladequinoa" && data.tableauQuinoa) {
    const ligne = data.tableauQuinoa.find(l => l.nb === personnes) || data.tableauQuinoa[3];
    listeIngredients = htmlTableauQuinoaColonnes(ligne);
  } else if (nom === "lasagne" && data.tableauLasagne) {
    const ligne = data.tableauLasagne.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauLasagneColonnes(ligne);
  } else if (nom === "cookies" && data.tableauCookies) {
    const ligne = data.tableauCookies.find(l => l.nb === personnes);
    if (ligne) listeIngredients = htmlTableauCookiesColonnes(ligne);
  } else if (nom === "brioche" && data.tableauBrioche) {
    const ligne = data.tableauBrioche.find(l => l.nb === personnes) || data.tableauBrioche[0];
    const boutons = data.tableauBrioche.map(l => `
      <button class="btn-brioche${l.nb === ligne.nb ? " btn-brioche-actif" : ""}"
        onclick="document.getElementById('personnes').value=${l.nb};calculer()">
        ${l.label}
      </button>`).join("");
    listeIngredients = `<div class="brioche-choix">${boutons}</div>` + htmlTableauBriocheColonnes(ligne);
  } else if (nom === "patefeuilletee" || nom === "patebrisee" || nom === "patesablee" || nom === "painbaguette") {
    // Recettes fixes sans calcul — afficher ingredientsFixes directement
    if (data.ingredientsFixes) {
      let rows = data.ingredientsFixes.map(([k,v]) =>
        `<tr><th>${k}</th><td>${v}</td></tr>`).join("");
      listeIngredients = `<table class="tableau-patons tableau-colonnes"><tbody>${rows}</tbody></table>`;
    }
  } else if (data.fixe && data.ingredientsFixes) {
    let rows = data.ingredientsFixes.map(([k,v]) =>
      `<tr><th>${k}</th><td>${v}</td></tr>`).join("");
    listeIngredients = `<table class="tableau-patons tableau-colonnes"><tbody>${rows}</tbody></table>`;
  } else {
    // Chercher d'abord dans les tableaux dynamiques
    const tableauKeys = Object.keys(data).filter(k => k.startsWith("tableau"));
    if (tableauKeys.length > 0) {
      const tableauKey = tableauKeys[0];
      const tableau = data[tableauKey];
      if (Array.isArray(tableau) && tableau.length > 0) {
        const ligne = tableau.find(l => l.nb === personnes) || tableau[Math.min(personnes-1, tableau.length-1)];
        if (ligne) {
          listeIngredients = htmlTableauGenerique(ligne);
        }
      }
    }
    // Fallback sur data.ingredients si tableau vide
    if (!listeIngredients) {
      for (const [nom_i, qte] of Object.entries(data.ingredients || {})) {
        const qteCalculee = (parseFloat(qte) * ratio).toFixed(1);
        listeIngredients += `<div class="fiche-ingredient"><span>${nom_i}</span><b>${qteCalculee}</b></div>`;
      }
    }
    // Si toujours vide, utiliser getIngredientsCourses
    if (!listeIngredients) {
      const ingrs = typeof getIngredientsCourses === "function" ? getIngredientsCourses(nom, personnes) : {};
      listeIngredients = Object.entries(ingrs)
        .filter(([k]) => !k.startsWith("---"))
        .map(([k, v]) => `<div class="fiche-ingredient"><span>${k}</span><b>${v.raw || ""}</b></div>`)
        .join("");
    }
  }

  // Étapes
  let listeEtapes = "";
  data.etapes.forEach((etape, i) => {
    listeEtapes += `
      <div class="fiche-etape">
        <div class="fiche-etape-num">${etape.icone || (i + 1)}</div>
        <div class="fiche-etape-contenu">
          <h3>${etape.titre}</h3>
          <p>${etape.detail}</p>
          ${etape.badge ? `<span class="etape-badge">${etape.badge}</span>` : ""}
        </div>
      </div>`;
  });

  // Afficher dans la modal
  const nomsAffichage = {
    // Recettes sans nom explicite
    "pizza":             "Pâte à Pizza",
    "crepes":            "Crêpes",
    "gaufres":           "Gaufres",
    "brioche":           "Brioche",
    "cookies":           "Cookies",
    "risotto":           "Risotto",
    "madeleine":         "Madeleines",
    "houmous":           "Houmous",
    "clafoutis":         "Clafoutis",
    "pancakes":          "Pancakes",
    "muffins":           "Muffins",
    "yaourt":            "Yaourt Maison",
    "tiramisu":          "Tiramisu",
    "flan":              "Flan",
    "lasagne":           "Pâte à Lasagne",
    "croquemonsieur":    "Croque-monsieur",
    "cremebrulee":       "Crème brûlée",
    "tarteaupommes":     "Tarte aux pommes",
    "tartecitron":       "Tarte au citron",
    "boeufbourguignon":  "Bœuf bourguignon",
    "gratindauphinois":  "Gratin dauphinois",
    "mousseauchocolat":  "Mousse au chocolat",
    "fondantchocolat":   "Fondant au chocolat",
    "ileflottante":      "Île flottante",
    "bananabread":       "Banana bread",
    "veloutelegumes":    "Velouté de légumes",
    "saladeniçoise":     "Salade niçoise",
    "saladecesar":       "Salade César",
    "saladegreque":      "Salade grecque",
    "saladepatasthon":   "Salade pâtes thon",
    "saladerizmediterranee": "Salade de riz méditerranéenne",
    "tabulemaison":      "Taboulé maison",
    "saladelentilles":   "Salade de lentilles",
    "saladeavocatcrevettes": "Salade avocat crevettes",
    "smoothiebowl":      "Smoothie Bowl",
    "goumeau":           "Galette de Goumeau",
    "painbaguette":      "Pain — Baguette",
    "painburger":        "Pain Burger (Buns)",
    "galettetacos":      "Galette à Tacos",
    "overnightoats":     "Overnight Oats",
    "buddhaBowl":        "Buddha Bowl",
    "soupemiso":         "Soupe Miso",
    "wrappoulet":        "Wrap au Poulet",
    "energyballs":       "Energy Balls",
    "pancakesproteine":  "Pancakes Protéinés",
    "bowlacai":          "Bowl Açaï",
    "saladepoischiches": "Salade de Pois Chiches",
    "gaspacho":          "Gaspacho",
    "curryledumes":      "Curry de Légumes",
    "pouletcitronthym":  "Poulet Citron & Thym",
    "salmonteriyaki":    "Saumon Teriyaki",
    "bolognaisemaison":  "Bolognaise Maison",
    "tacosmaison":       "Tacos Maison",
    "padthai":           "Pad Thaï",
    "currypouletcoco":   "Curry Poulet Coco",
    "burgermaison":      "Burger Maison",
    "risottoprimavera":  "Risotto Primavera",
    "saumongravlax":     "Saumon Gravlax",
    "shakshuka":         "Shakshuka",
    "couscous":          "Couscous Royal",
    "mojito":            "Mojito",
    "mojitorose":        "Mojito Rosé",
    "negroni":           "Negroni",
    "moscowmule":        "Moscow Mule",
    "pornstarmartini":   "Porn Star Martini",
    "hugospritz":        "Hugo Spritz",
    "cherryblossommocktail": "Cherry Blossom",
    "oldFashioned":      "Old Fashioned",
    "gintoniqmaison":    "Gin Tonic Maison",
    "shrubframboisebasilic": "Shrub Framboise Basilic",
    "mocktailcoconananas":   "Mocktail Coco Ananas",
    "margarita":         "Margarita",
    "cosmopolitan":      "Cosmopolitan",
    "spritz":            "Spritz Aperol",
    "sangria":           "Sangria",
    "pinacolada":        "Piña Colada",
    "daiquiri":          "Daiquiri",
    "whiskysour":        "Whisky Sour",
    "virginmojito":      "Virgin Mojito",
    "limonademaison":    "Limonade Maison",
    "smoothiemangopassion": "Smoothie Mangue Passion",
    "citronadementhe":   "Citronnade à la Menthe",
    "jusPastequeMenuthe":"Jus Pastèque Menthe",
    "virginpinacolada":  "Virgin Piña Colada",
    "moussaka":          "Moussaka",
    "paella":            "Paella",
    "butterchicken":     "Butter Chicken",
    "souvlaki":          "Souvlaki",
    "quichelorraine":    "Quiche Lorraine",
    "soupeaoignon":      "Soupe à l'Oignon",
    "dalindien":         "Dal Indien",
    "rizcantonnais":     "Riz Cantonnais",
    "hariramarocaine":   "Harira Marocaine",
    "naan":              "Naans",
    "verrinetiramisu":   "Verrines Tiramisu",
    "churros":           "Churros",
    "potaufeu":          "Pot-au-Feu",
    "parisbrestreinterpretation": "Paris-Brest",
    "ramenjaponais":     "Ramen Japonais",
    "bibimbap":          "Bibimbap",
    "tartetatinpommes": "Tarte Tatin aux Pommes",
    "croissant": "Croissants au Beurre",
    "verrineframboisechocolat": "Verrines Framboise Chocolat",
    "sauteporc": "Sauté de Porc aux Légumes",
    "veloutecourgette": "Velouté de Courgettes",
    "ratatouille": "Ratatouille Provençale",
    "financiers": "Financiers aux Amandes",
    "choufleurgratin": "Gratin de Chou-fleur",
    "salmongrillee": "Saumon Grillé au Citron",
    "sobejaponais": "Soba Japonais Froids",
    "tartepistache": "Tarte à la Pistache",
    "agneluroti": "Gigot d'Agneau Rôti",
    "crepesbretonnes": "Galettes Bretonnes",
    "stroganov": "Bœuf Stroganoff",
    "pizzahawaienne": "Pizza Hawaïenne",
    "pouletescalopes": "Escalopes de Poulet Panées",
    "tofusaute": "Tofu Sauté Teriyaki",
    "saladecaprese": "Salade Caprese",
    "moulesmarinieres": "Moules Marinières",
    "coktailcosmopolitan": "Sex on the Beach",
    "mocktailmentheagume": "Mocktail Menthe Concombre",
    "tartechocolatcaramel": "Tarte Chocolat Caramel",
    "soupeharira": "Harira Marocaine",

    "blanquetteveau": "Blanquette de Veau",
    "navarin": "Navarin d'Agneau",
    "camembertRoti": "Camembert Rôti au Four",
    "tarteFlambee": "Tarte Flambée Alsacienne",
    "pouletMisoGingembre": "Poulet Laqué Miso-Gingembre",
    "noodlesWok": "Nouilles Sautées au Wok",
    "maffeSenegal": "Maafé au Poulet",
    "gazpachoMelon": "Gaspacho de Melon au Jambon",
    "wafflesSales": "Gaufres Salées au Fromage",
    "choucroute": "Choucroute Garnie Alsacienne",
    "sconeBritish": "Scones Britanniques",
    "calamarsRomaine": "Calamars Frits à la Romaine",
    "baklava": "Baklava aux Pistaches",
    "eggsBenedict": "Œufs Bénédicte",
    "porkBelly": "Poitrine de Porc Caramélisée",
    "veloutePoiron": "Velouté de Potiron au Gingembre",
    "chocolatChaud": "Chocolat Chaud Parisien",
    "granolaMaison": "Granola Maison Croustillant",

    "pizzachorizo": "Pizza Chorizo",
    "pouletteriyaki": "Poulet Teriyaki",
    "curryverthai": "Curry Vert Thaï",
    "chiliconcarneV": "Chili Con Carne",
    "koreanfriedchicken": "Poulet Frit Coréen",
    "risottoMilanese": "Risotto Milanais au Safran",
    "soupeAziatique": "Soupe Asiatique aux Nouilles",
    "tartareSaumon": "Tartare de Saumon",
    "tiramisufraise": "Tiramisu aux Fraises",
    "pouletCocoLemon": "Poulet Coco Citron Confit",
    "crepesSucrées": "Crêpes Sucrées Garnies",
    "poireauVinaigrette": "Poireaux Vinaigrette",
    "spaetzle": "Spätzle",
    "wagyuBurger": "Burger Wagyu Maison",
    "lemonPasta": "Pâtes au Citron",
    "soupeMinestrone": "Minestrone",

    "lasagneviande":     "Lasagnes Bolognaise",
    "risottoprimavera":  "Risotto Primavera",
    "tequilasunrise":    "Tequila Sunrise",
    "aperolspritzrosa":  "Spritz Rosé",
    "espressoMartini":   "Espresso Martini",
    "punchfruitsrouges": "Punch Fruits Rouges",
    "blueLagoon":        "Blue Lagoon",
    "mimosa":            "Mimosa",
    "sidecarvintage":    "Sidecar",
    "mocktailberrybliss":"Berry Bliss Mocktail",
    "gingerlemondrop":   "Lemon Drop Gingembre",
    "mocktailcoconorchidee":"Mocktail Coco Orchidée",
    "pizzaprosciuttoroquette":"Pizza Prosciutto Roquette",
    "pizzatruffe":       "Pizza à la Truffe",
    "pizzabiancoverdure":"Pizza Bianca Verdure",
    "pizzacalzone":      "Calzone",
    "pizzapoivrons":     "Pizza Poivrons Anchois",
    "pizzapatate":       "Pizza Patate Romarin",
    "pizzabresilienne":  "Pizza Brésilienne",
    "moquecabresil":     "Moqueca Brésilienne",
    "rendangboeuf":      "Rendang de Bœuf",
    "tacoshijosepastor": "Tacos Al Pastor",
    "grilladelamnocciole":"Côtelettes d'Agneau Grillées",
    "sushimaison":       "Sushis Maison",
    "carigrioantillais": "Cari Griot Antillais",
    "semoulecourgette":  "Semoule aux Légumes Grillés",
    "pouletbasquaise":   "Poulet Basquaise",
    "crevettespilpil":   "Crevettes Pil Pil",
    "lasagneverdure":    "Lasagne Verdure",
    "crumblefruits":     "Crumble aux Fruits",
    "pintxosbasques":    "Pintxos Basques",
    "misoramenleger":    "Ramen Miso Léger",
    "veloutepatatepoireaux":"Velouté Patate & Poireaux",
    "terrinecampagne":   "Terrine de Campagne",
    "poulpegrillebresil":"Poulpe Grillé",
    "pouletrotiperfect": "Poulet Rôti Parfait",
    "millefeuille":      "Mille-feuille",
    "saumoncrouteherbes":"Saumon en Croûte d'Herbes",
    "pizzareine":        "Pizza Reine",
    "pizza4fromages": "Pizza Quattro Formaggi",
    "pizzadiavola":      "Pizza Diavola",
    "pizzasaumonepinards":"Pizza Saumon Épinards",
    "pizzavegetarienne": "Pizza Végétarienne",
    "souvlakiagneau":    "Souvlaki d'Agneau",
    "tom_yam":           "Soupe Tom Yam",
    "dorade_chermoula":  "Dorade à la Chermoula",
    "pouletchicken65":   "Chicken 65",
    "pierogi":           "Pierogi",
    "momos":             "Momos Tibétains",
    "shakshukaverte":    "Shakshuka Verte",
    "kebbeh":            "Kebbeh Libanais",
    "tteokbokki":        "Tteokbokki",
    "porc_pulled":       "Pulled Pork",
    "dosakerdosai":      "Dosa",
    "braiseboeuf_asiatique": "Joues de Bœuf Braisées",
    "paprikashpoulet":   "Paprikash de Poulet",
    "gyoza":             "Gyoza",
    "tikamasala":        "Poulet Tikka Masala",
    "phovietnambien":    "Pho Vietnamien",
    "pizzamargherita":   "Pizza Margherita",
    "carbonara":         "Carbonara",
    "ceebujen":          "Thiéboudienne (Ceebu Jen)",
    "mafewestafricain":  "Maafé",
    "gnocchismaison":    "Gnocchis Maison",
    "falafel":           "Falafel",
    "poulettandoori":    "Poulet Tandoori",
    "pekinduckeasy":     "Canard Laqué Pékinois",
    "ossobuco":          "Osso Buco",
    "tajinemouton":      "Tajine d'Agneau",
    "moelleuxchocolat":  "Moelleux au Chocolat",
    "cheesecake":        "Cheesecake New-Yorkais",
    "painauchocolat":    "Pain au Chocolat",
    "gateaubasque":      "Gâteau Basque",
    "canelebordelais":   "Cannelés Bordelais",
    "paindemie":         "Pain de mie",
    "patefeuilletee":    "Pâte feuilletée",
    "patebrisee":        "Pâte brisée",
    "patesablee":        "Pâte sablée",
    "saladequinoa":      "Salade de quinoa",
  };
  const nomPropre = nomsAffichage[nom] || (nom.charAt(0).toUpperCase() + nom.slice(1));

  // Info historique : "Refait il y a X jours" (uniquement si déjà fait)
  let infoHistorique = "";
  if (typeof dernierUsageRecette === "function") {
    const dern = dernierUsageRecette(nom);
    if (dern) {
      infoHistorique = `<span class="fiche-historique" title="Dernière fois dans un de tes menus générés">🕐 Réalisée ${formatJoursDepuis(dern.jours)}</span>`;
    }
  }
  // Info saisonnière (uniquement si la recette est de saison MAINTENANT)
  let infoSaison = "";
  if (typeof estDeSaison === "function" && estDeSaison(nom)) {
    const inf = getEmojiSaison(getSaisonActuelle());
    infoSaison = `<span class="fiche-saison" title="De saison : ${inf.label}">${inf.emoji} De saison</span>`;
  }

  document.getElementById("modal-resultat").innerHTML = `
    <div class="fiche-modal-header">
      <div class="fiche-emoji">${data.emoji}</div>
      <h2 class="fiche-titre">${nomPropre}</h2>
      <p class="fiche-desc">${data.description}</p>
      <div class="fiche-meta">
        <span>⏱ ${data.temps}</span>
        <span>${data.niveau}</span>
        <span>${labelQte}</span>
        ${infoSaison}
        ${infoHistorique}
      </div>
    </div>
    ${htmlPrixCalories(nom, personnes)}
    <div class="fiche-section">
      <h2 class="fiche-section-titre">🛒 Ingrédients</h2>
      <div class="fiche-ingredients-liste">${listeIngredients}</div>
    </div>
    <div class="fiche-section">
      <h2 class="fiche-section-titre">📋 Étapes</h2>
      <div class="fiche-etapes-liste">${listeEtapes}</div>
    </div>
    <div class="fiche-claude-section" id="fiche-claude-${nom}">
      <button class="fiche-claude-btn" onclick="ouvrirChatClaude('${nom}')">
        🤖 Demander à Claude
        <span class="claude-quota" id="claude-quota-${nom}"></span>
      </button>
      <div class="fiche-claude-chat" id="claude-chat-${nom}" style="display:none">
        <div class="claude-messages" id="claude-messages-${nom}"></div>
        <div class="claude-input-row">
          <input type="text" id="claude-input-${nom}" placeholder="Pose ta question sur cette recette..." maxlength="200"
            onkeydown="if(event.key==='Enter')envoyerQuestionClaude('${nom}')">
          <button onclick="envoyerQuestionClaude('${nom}')">➤</button>
        </div>
      </div>
    </div>`;

  document.getElementById("modal-calc").classList.add("visible");
  document.getElementById("modal-resultat").parentElement.scrollTop = 0;

  // Bouton favori
  const btnFav = document.getElementById("btn-favori-modal");
  if (btnFav) {
    btnFav.id = "btn-favori-" + nom;
    btnFav.setAttribute("onclick", `toggleFavori('${nom}')`);
    btnFav.textContent = (typeof estFavori === 'function' && estFavori(nom)) ? '❤️' : '🤍';
  }
}

// Initialiser les tables globales
function initTablesGlobales() {
  // Initialiser les variables globales si non définies
  if (typeof window._nouvellesRecettesTables === "undefined") window._nouvellesRecettesTables = null;
  if (typeof window.mondeClassiquesTablesGlobal === "undefined") window.mondeClassiquesTablesGlobal = null;
  if (typeof window.hellofreshTablesGlobal === "undefined") window.hellofreshTablesGlobal = null;
  if (typeof window.cocktailsTablesGlobal === "undefined") window.cocktailsTablesGlobal = null;
}
initTablesGlobales();
