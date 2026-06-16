
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
  kibbeh:             { base: 4, baseLabel: "4 personnes", prixTotal: 6.00,  calTotal: 1200, unite: "personne" },
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
  souvlakiagneau:           { base: 4,  baseLabel: "4 personnes",  prixTotal: 7.00,  calTotal: 1200, unite: "personne" },
  quichelorraine:     { base: 6,  baseLabel: "6 personnes",  prixTotal: 4.50,  calTotal: 2400, unite: "personne" },
  soupeaoignon:       { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.50,  calTotal: 800,  unite: "personne" },
  dahllentillescorail:          { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.00,  calTotal: 1200, unite: "personne" },
  rizcantonais:      { base: 4,  baseLabel: "4 personnes",  prixTotal: 3.50,  calTotal: 1200, unite: "personne" },
  soupeharira:    { base: 6,  baseLabel: "6 personnes",  prixTotal: 5.00,  calTotal: 1200, unite: "personne" },
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
  bananabread:      { base: 8,  baseLabel: "8 personnes",  prixTotal: 2.80,  calTotal: 2400, unite: "personne" },
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
  // === v257 — 16 nouvelles recettes ===
  fishandchips:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 12.0,  calTotal: 3200, unite: "personne" },
  shepherdspie:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 10.0,  calTotal: 2400, unite: "personne" },
  croquemadame:        { base: 2,  baseLabel: "2 personnes",   prixTotal: 4.50,  calTotal: 1200, unite: "personne" },
  tomkhagai:           { base: 4,  baseLabel: "4 personnes",   prixTotal: 8.00,  calTotal: 1400, unite: "personne" },
  macandcheese:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 6.50,  calTotal: 2800, unite: "personne" },
  yakitori:            { base: 4,  baseLabel: "4 personnes",   prixTotal: 9.00,  calTotal: 1600, unite: "personne" },
  magretcanard:        { base: 4,  baseLabel: "4 personnes",   prixTotal: 22.0,  calTotal: 1800, unite: "personne" },
  risottochampignons:  { base: 4,  baseLabel: "4 personnes",   prixTotal: 7.50,  calTotal: 2200, unite: "personne" },
  banoffeepie:         { base: 8,  baseLabel: "8 parts",       prixTotal: 6.00,  calTotal: 2800, unite: "part" },
  veloutebutternut:    { base: 4,  baseLabel: "4 personnes",   prixTotal: 4.00,  calTotal: 800,  unite: "personne" },
  muffinkinder:        { base: 12, baseLabel: "12 muffins",    prixTotal: 8.00,  calTotal: 3600, unite: "muffin" },
  muffinmars:          { base: 12, baseLabel: "12 muffins",    prixTotal: 8.50,  calTotal: 3800, unite: "muffin" },
  muffinkitkat:        { base: 12, baseLabel: "12 muffins",    prixTotal: 8.00,  calTotal: 3700, unite: "muffin" },
  muffinraffaello:     { base: 12, baseLabel: "12 muffins",    prixTotal: 9.00,  calTotal: 3500, unite: "muffin" },
  muffinsnickers:      { base: 12, baseLabel: "12 muffins",    prixTotal: 9.50,  calTotal: 4000, unite: "muffin" },
  muffinoreo:          { base: 12, baseLabel: "12 muffins",    prixTotal: 7.50,  calTotal: 3400, unite: "muffin" },
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

// ============================================================
// COMPLÉMENT pour les fonctions html du labo qui n'affichent pas tous les ingrédients
// Ajoute des <tr> pour les ingrédients absents du rendu spécifique
// ============================================================
function htmlIngredientsComplement(ligne, fnHtml) {
  if (!ligne || typeof fnHtml !== "function") return "";
  const ignorés = new Set(["nb", "label", "total", "unite"]);
  // Appeler la fonction et voir quelles colonnes sont déjà affichées
  // On détecte via le code source de la fonction
  const src = fnHtml.toString();
  const colsAffichees = new Set([...src.matchAll(/\bl\.(\w+)/g)].map(m => m[1]));
  // Trouver les colonnes manquantes
  const manquantes = Object.entries(ligne)
    .filter(([k, v]) => !ignorés.has(k) && !colsAffichees.has(k) && v && v !== "0" && v !== 0);
  if (manquantes.length === 0) return "";
  // Produire des <tr> avec le label INGREDIENTS_LABELS si possible
  return manquantes.map(([k, v]) => {
    const label = (typeof INGREDIENTS_LABELS !== "undefined" && INGREDIENTS_LABELS[k])
      ? INGREDIENTS_LABELS[k]
      : k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, " $1");
    return `<tr><th>${label}</th><td>${v}</td></tr>`;
  }).join("");
}

// Wrapper : combine le rendu spécifique avec le complément pour les ingrédients manquants
// Le complément s'insère AVANT la fermeture </table> du rendu spécifique
function renduComplet(fnHtml, ligne) {
  const rendu = fnHtml(ligne);
  const complement = htmlIngredientsComplement(ligne, fnHtml);
  if (!complement) return rendu;
  // Insérer le complément avant </tbody> (ou </table>)
  if (rendu.includes("</tbody>")) {
    return rendu.replace("</tbody>", complement + "</tbody>");
  }
  if (rendu.includes("</table>")) {
    return rendu.replace("</table>", "<tbody>" + complement + "</tbody></table>");
  }
  return rendu + complement;
}

// Fallback intelligent : si une fonction html* est référencée mais n'existe pas,
// on retombe sur htmlTableauGenerique. Mais on NE remplace PAS les vraies fonctions
// qui sont déclarées plus bas dans le fichier (restaurées depuis le labo).
// Le fallback est appliqué APRÈS le chargement complet du fichier via setTimeout 0.
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
// Ne remplacer QUE les fonctions inexistantes par le générique (préserve les vraies versions)
_htmlFns.forEach(fn => { if (typeof window[fn] !== "function") window[fn] = htmlTableauGenerique; });


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
    data.ingredientsFixes.forEach(p => { const k = Array.isArray(p) ? p[0] : p.k, v = Array.isArray(p) ? p[1] : p.v;
      if (k && !String(k).startsWith("---")) ajout(k, v);
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


// === Helpers pour le sélecteur de personnes dans la fiche ===

// Détermine l'unité (singulier/pluriel) selon la recette
function getUniteRecette(nom, n) {
  const unites = {
    "galettetacos":    ["galette", "galettes"],
    "painburger":      ["bun", "buns"],
    "pizza":           ["pâton", "pâtons"],
    "brioche":         ["brioche", "brioches"],
    "gaufres":         ["gaufre", "gaufres"],
    "cookies":         ["cookie", "cookies"],
    "madeleine":       ["madeleine", "madeleines"],
    "muffins":         ["muffin", "muffins"],
    "financiers":      ["financier", "financiers"],
    "macarons":        ["macaron", "macarons"],
    "gyoza":           ["gyoza", "gyozas"],
    "momos":           ["momo", "momos"],
    "falafel":         ["falafel", "falafels"],
    "canelebordelais": ["canelé", "canelés"],
    "sushimaison":     ["sushi", "sushis"],
    "pintxosbasques":  ["pintxo", "pintxos"],
    "croissant":       ["croissant", "croissants"],
    "fondantchocolat": ["fondant", "fondants"],
    "paindemie":       ["tranche", "tranches"],
    "painbaguette":    ["baguette", "baguettes"],
    "patefeuilletee":  ["pâte", "pâtes"],
    "patebrisee":      ["pâte", "pâtes"],
    "patesablee":      ["pâte", "pâtes"],
    "overnightoats":   ["pot", "pots"],
    "buddhaBowl":      ["bol", "bols"],
    "smoothiebowl":    ["bol", "bols"],
    "bowlacai":        ["bol", "bols"],
    "pancakes":        ["pancake", "pancakes"],
  };
  const [sing, plur] = unites[nom] || ["personne", "personnes"];
  return n > 1 ? plur : sing;
}

// Génère le HTML du sélecteur SPÉCIAL pour la brioche (4 versions : 1 ou 2 brioches × avec ou sans lait)
function getSelecteurBriocheHTML(version) {
  // version : 1=1×🥛, 2=2×🥛, 3=1×🚫, 4=2×🚫
  const qte = (version === 1 || version === 3) ? 1 : 2;
  const type = (version === 1 || version === 2) ? "lait" : "sanslait";
  
  return `
    <span class="fiche-brioche-choix">
      <button type="button" class="btn-brioche-pill-fiche ${qte === 1 ? 'active' : ''}" onclick="changerBriocheFiche('qte', 1)">1 brioche</button>
      <button type="button" class="btn-brioche-pill-fiche ${qte === 2 ? 'active' : ''}" onclick="changerBriocheFiche('qte', 2)">2 brioches</button>
      <button type="button" class="btn-brioche-pill-fiche ${type === 'lait' ? 'active' : ''}" onclick="changerBriocheFiche('type', 'lait')">🥛 Avec lait</button>
      <button type="button" class="btn-brioche-pill-fiche ${type === 'sanslait' ? 'active' : ''}" onclick="changerBriocheFiche('type', 'sanslait')">🚫 Sans lait</button>
    </span>
  `;
}

// Génère le HTML du sélecteur +/- pour la fiche recette
function getSelecteurPersonnesHTML(nom, personnes) {
  const r = recettes[nom];
  if (!r) return `<span>${personnes} ${getUniteRecette(nom, personnes)}</span>`;
  
  // Trouver les bornes min/max selon le tableau de la recette
  const tabKey = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
  let min = 1, max = 15;
  if (tabKey && r[tabKey].length > 0) {
    const lignes = r[tabKey];
    const premier = lignes[0];
    const dernier = lignes[lignes.length - 1];
    const cleNb = premier.nb !== undefined ? "nb" : (premier.patons !== undefined ? "patons" : null);
    if (cleNb) {
      min = premier[cleNb] || 1;
      max = dernier[cleNb] || 15;
      // Pour pizza, min=0 dans le tableau mais on force min=1 (pas de pizza à 0 pâtons)
      if (min < 1) min = 1;
    }
  }
  
  // v257.9 : Exceptions pour les recettes "à l'unité" (depuis exceptions.js)
  const exceptionsUnites = (window.EXCEPTIONS && window.EXCEPTIONS.unites) || ["brioche"];
  if (exceptionsUnites.includes(nom)) {
    min = 1;
    max = 5;
  }
  
  const val = Math.max(min, Math.min(max, personnes));
  const unite = getUniteRecette(nom, val);
  
  return `
    <span class="fiche-selecteur-personnes">
      <span class="selecteur-pre">Pour</span>
      <span class="fiche-calc">
        <button type="button" class="calc-btn-minus" onclick="changerPersonnesFiche('${nom}', -1)" ${val <= min ? 'disabled' : ''} aria-label="Moins">−</button>
        <input type="number" value="${val}" min="${min}" max="${max}" class="calc-input" id="fiche-personnes-input" onchange="onChangePersonnesFiche('${nom}')" onclick="this.select()">
        <button type="button" class="calc-btn-plus" onclick="changerPersonnesFiche('${nom}', 1)" ${val >= max ? 'disabled' : ''} aria-label="Plus">+</button>
      </span>
      <span class="selecteur-post" id="selecteur-unite-fiche">${unite}</span>
    </span>
  `;
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

  let html = `<p class="prix-cal-note-courses">* Prix moyens supermarché France 2025</p>
  <div class="courses-recette-liste">`;
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
  const data = recettes[nom];
  
  // === CALCUL AUTOMATIQUE depuis ingredients_prix.js ===
  // Si la fonction est dispo ET qu'on a un tableau, on calcule en live à partir des ingrédients
  if (typeof calculerPrixCaloriesRecette === "function" && data) {
    const tabKey = Object.keys(data).find(k => k.startsWith("tableau") && Array.isArray(data[k]));
    if (tabKey) {
      const lignes = data[tabKey];
      // Trouver la ligne correspondant à la quantité (nb ou patons)
      const ligne = lignes.find(l => l.nb === quantite || l.patons === quantite);
      if (ligne) {
        const res = calculerPrixCaloriesRecette(ligne);
        if (res.prix > 0) {
          // Déterminer l'unité d'affichage
          const unites = {
            pizza: "pâton", brioche: "brioche", gaufres: "gaufre", cookies: "cookie",
            galettetacos: "galette", painburger: "bun", paindemie: "tranche",
            overnightoats: "pot", buddhaBowl: "bol", smoothiebowl: "bol", bowlacai: "bol",
            madeleine: "madeleine", muffins: "muffin", financiers: "financier", macarons: "macaron",
            gyoza: "gyoza", momos: "momo", falafel: "falafel", canelebordelais: "canelé",
            sushimaison: "sushi", pintxosbasques: "pintxo", croissant: "croissant",
            fondantchocolat: "fondant", pancakes: "pancake", crepes: "personne",
          };
          const unite = unites[nom] || "personne";
          const calParUnite = Math.round(res.cal / quantite);
          
          // === NUTRI-SCORE (calcul auto) ===
          // v258.5 : on calcule TOUJOURS sur la ligne de référence (base), jamais sur la
          // ligne du nombre courant. Le Nutri-Score est une propriété de la recette (pour
          // 100 g) → lettre stable quel que soit le nombre de portions, et identique au
          // badge des cartes (qui utilise déjà la ligne base).
          let nutriHtml = "";
          if (typeof calculerNutriScoreRecette === "function") {
            const baseNutri = data.base || 4;
            const ligneNutri = lignes.find(l => l.nb === baseNutri || l.patons === baseNutri) || lignes[0];
            const ns = calculerNutriScoreRecette(ligneNutri);
            if (ns) {
              nutriHtml = `
                <div class="prix-cal-item nutri-score-bloc nutri-${ns.lettre}" title="Nutri-Score ${ns.lettre} — Indicateur officiel de qualité nutritionnelle">
                  <span class="pc-icone">🥗</span>
                  <div class="nutri-badge">${ns.lettre}</div>
                  <div class="pc-label">Nutri-Score</div>
                </div>`;
            }
          }
          
          return `
            <div class="prix-cal-bloc">
              <div class="prix-cal-item">
                <span class="pc-icone">💰</span>
                <div class="pc-valeur">${res.prix.toFixed(2)} €</div>
                <div class="pc-label">Coût estimé</div>
              </div>
              <div class="prix-cal-item">
                <span class="pc-icone">🔥</span>
                <div class="pc-valeur">${res.cal} kcal</div>
                <div class="pc-label">Total recette</div>
              </div>
              <div class="prix-cal-item">
                <span class="pc-icone">👤</span>
                <div class="pc-valeur">${calParUnite} kcal</div>
                <div class="pc-label">Par ${unite}</div>
              </div>
            </div>
            <div class="fiche-photo-bloc">
              <img class="fiche-photo" src="${typeof getImagePath === "function" ? getImagePath(nom) : ""}" alt="${nom}" loading="lazy" onerror="this.closest('.fiche-photo-bloc').classList.add('noimg')">
              <span class="fiche-photo-fallback">${data.emoji || "🍽️"}</span>
            </div>
            <button class="btn-courses-recette" onclick="ajouterRecetteAuxCourses('${nom}')">
              🛒 Ajouter aux courses
            </button>
            <div class="courses-recette-bloc" id="courses-recette-${nom}" style="display:none"></div>
          `;
        }
      }
    }
  }
  
  // === FALLBACK : ancien système prixCalories pour les recettes sans tableau ===
  const pc = prixCalories[nom];
  // Si pas d'entrée prixCalories : on affiche QUAND MÊME le bouton "Liste de courses"
  if (!pc) {
    return `
      <button class="btn-courses-recette" onclick="ajouterRecetteAuxCourses('${nom}')">
        🛒 Ajouter aux courses
      </button>
      <div class="courses-recette-bloc" id="courses-recette-${nom}" style="display:none"></div>
    `;
  }
  let ratio = 1;
  if (data && data.fixe) {
    ratio = 1;
  } else if (nom === "brioche") {
    // Brioche : 1=1×, 2=2×, 3=3×, 4=4×, 5=5× (simple multiplication)
    ratio = quantite;
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
    <button class="btn-courses-recette" onclick="ajouterRecetteAuxCourses('${nom}')">
      🛒 Ajouter aux courses
    </button>
    <div class="courses-recette-bloc" id="courses-recette-${nom}" style="display:none"></div>
  `;
}

// =============================
// FICHE PLEINE PAGE
// =============================

// Lettre Nutri-Score d'une recette (même calcul que la carte : ligne de base), ou null si non applicable.
function nutriLettreRecette(key) {
  if (typeof calculerNutriScoreRecette !== "function") return null;
  const r = recettes[key];
  if (!r) return null;
  if (r.cat === "cocktails" || r.cat === "mocktails") return null; // pas de Nutri-Score sur les boissons
  const tk = Object.keys(r).find(k => k.startsWith("tableau") && Array.isArray(r[k]));
  if (!tk) return null;
  const base = r.base || 4;
  const ligne = r[tk].find(l => l.nb === base || l.patons === base) || r[tk][0];
  if (!ligne) return null;
  const ns = calculerNutriScoreRecette(ligne);
  return ns ? ns.lettre : null;
}

// Section "Recettes liées" : composants de la recette (buns, pâtes, sauces, compote…) cliquables.
// Ouvre une recette liée en empilant la recette parente (pour le bouton retour).
function ouvrirRecetteLiee(child, parent) {
  window._ficheNavStack = window._ficheNavStack || [];
  if (parent) window._ficheNavStack.push(parent);
  if (typeof window._backGuardPush === "function") window._backGuardPush(); // état d'historique → le bouton retour reviendra ici
  choisirRecette(child, null, true);
}

function recettesLieesHTML(key) {
  const r = recettes[key];
  const liste = (r && Array.isArray(r.liees)) ? r.liees.filter(c => recettes[c]) : [];
  if (!liste.length) return "";
  const items = liste.map(c => {
    const rc = recettes[c];
    const nomC = (typeof getNomRecette === "function") ? getNomRecette(c) : (rc.nom || c);
    const emo = rc.emoji || "🍽️";
    return `<div class="liee-item" onclick="ouvrirRecetteLiee('${c}','${key}')"><span class="liee-emoji">${emo}</span><span class="liee-nom">${nomC}</span><span class="liee-fleche">›</span></div>`;
  }).join("");
  return `<div class="fiche-liees"><div class="fiche-liees-titre">🔗 Recettes liées</div><div class="fiche-liees-liste">${items}</div></div>`;
}

function choisirRecette(nom, personnesOverride, fromLiee) {
  if (!fromLiee) window._ficheNavStack = []; // ouverture neuve → on repart de zéro
  const data = recettes[nom];
  if (!data) return;

  // Sauvegarder dans les recettes vues récemment
  try {
    let recents = window._recentsVus || [];
    recents = [nom, ...recents.filter(k => k !== nom)].slice(0, 20);
    window._recentsVus = recents;
    localStorage.setItem("recentsVus", JSON.stringify(recents));
  } catch(e) {}
  // Rafraîchir la rubrique "Dernières recettes vues" de l'accueil
  if (typeof chargerAccueilRecents === "function") chargerAccueilRecents();

  const inputPersonnes = document.getElementById("personnes");

  // v257.5 : Accepte un override (utilisé par rerendreFiche pour conserver la valeur après +/-)
  // v258.1 : Par défaut, on suit le foyer du profil (avec exceptions cocktails /
  //          mocktails / unités) au lieu de retomber sur data.base.
  const defautFoyer = (typeof calculerPersonnesPourRecette === "function")
    ? calculerPersonnesPourRecette(nom)
    : (inputPersonnes ? parseInt(inputPersonnes.value) || data.base : data.base);
  const personnes = (typeof personnesOverride === "number" && personnesOverride > 0)
    ? personnesOverride
    : defautFoyer;
  const ratio = personnes / data.base;

  // Label quantité
  const briocheVersions = { 1: "1 brioche", 2: "2 brioches", 3: "3 brioches", 4: "4 brioches", 5: "5 brioches" };
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
    // Les boutons de sélection (1/2 brioches avec/sans lait) sont déplacés dans le bandeau meta
    // via getSelecteurBriocheHTML(). Ici on ne génère que les ingrédients.
    listeIngredients = htmlTableauBriocheColonnes(ligne);
  } else if (data.fixe && data.ingredientsFixes) {
    let rows = data.ingredientsFixes.map(p => { const k = Array.isArray(p) ? p[0] : p.k, v = Array.isArray(p) ? p[1] : p.v;
      return `<tr><th>${k}</th><td>${v}</td></tr>`; }).join("");
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
    // v258.4 : noms des recettes récentes, alignés EXACTEMENT sur le titre des cartes
    "fishandchips":        "Fish and Chips",
    "shepherdspie":        "Shepherd's Pie",
    "croquemadame":        "Croque-Madame",
    "tomkhagai":           "Tom Kha Gai",
    "macandcheese":        "Mac & Cheese",
    "yakitori":            "Yakitori",
    "magretcanard":        "Magret de canard",
    "risottochampignons":  "Risotto champignons",
    "banoffeepie":         "Banoffee Pie",
    "veloutebutternut":    "Velouté butternut",
    "muffinkinder":        "Muffin Kinder Bueno",
    "muffinmars":          "Muffin Mars caramel",
    "muffinkitkat":        "Muffin Kit Kat",
    "muffinraffaello":     "Muffin Raffaello coco",
    "muffinsnickers":      "Muffin Snickers",
    "muffinoreo":          "Muffin Oreo",
    // Recettes sans nom explicite
    "pizza":             "Pâte à Pizza",
    "crepes":            "Crêpes",
    "gaufres":           "Gaufres",
    "brioche":           "Brioche",
    "cookies":           "Cookies",
    "risotto":           "Risotto",
    "madeleine":         "Madeleines",
    "houmous":           "Houmous",
"mayonnaise":           "Mayonnaise maison",
    "ketchup":           "Ketchup maison",
    "saucebarbecue":           "Sauce barbecue",
    "harissa":           "Harissa maison",
    "saucetomate":           "Sauce tomate maison",
    "vinaigrette":           "Vinaigrette classique",
    "bechamel":           "Sauce béchamel",
    "pestomaison":           "Pesto maison",
    "aioli":           "Aïoli",
    "saucecesar":           "Sauce César",
    "chimichurri":           "Chimichurri",
    "saucecurrycoco":           "Sauce curry-coco",
    "teriyaki":           "Sauce teriyaki",
    "sauceblanche":           "Sauce blanche (kebab)",
    "saucesamourai":           "Sauce samouraï",
    "saucetartare":           "Sauce tartare",
    "saucehollandaise":           "Sauce hollandaise",
    "saucesoja":           "Sauce soja-sésame",
    "saucecocktail":           "Sauce cocktail",
    "sauceaigredouce":           "Sauce aigre-douce",
    "saucemoutardemiel":           "Sauce moutarde-miel",
    "saucepoivre":           "Sauce au poivre",
    "sauceburger":           "Sauce burger",
    "saucechampignon":           "Sauce aux champignons",
"oeufmayo":           "Œufs mayonnaise",
    "melonjambon":           "Melon & jambon cru",
    "feuilletechevremiel":           "Feuilletés chèvre-miel",
    "escargots":           "Escargots de Bourgogne",
    "oeufsmeurette":           "Œufs en meurette",
    "coleslaw":           "Coleslaw",
    "saladewaldorf":           "Salade Waldorf",
    "saladebetteravechevre":           "Salade betterave & chèvre",
    "saladefiguejambon":           "Salade figues & jambon cru",
    "saladeroquetteparmesan":           "Salade roquette-parmesan",
    "pizzamarinara":           "Pizza marinara",
    "pizzanapolitaine":           "Pizza napolitaine",
    "pizzaburrata":           "Pizza burrata",
    "pizzamortadelle":           "Pizza mortadelle-pistache",
    "fougasse":           "Fougasse aux olives",
    "painauxraisins":           "Pain aux raisins",
    "chaussonpommes":           "Chausson aux pommes",
    "ciabatta":           "Ciabatta",
    "bagelsaumon":           "Bagel saumon",
    "clubsandwich":           "Club sandwich",
    "paninimozza":           "Panini tomate-mozza",
    "nuggetspoulet":           "Nuggets de poulet maison",
    "avocadotoast":           "Tartine avocat & œuf poché",
    "chiapudding":           "Chia pudding",
    "wrapveggie":           "Wrap végétarien",
"tapenade":           "Tapenade d'olives noires",
    "tzatziki":           "Tzatziki",
    "gougeres":           "Gougères au comté",
    "blinissaumon":           "Blinis saumon & crème",
    "cakeolivesjambon":           "Cake salé olives & jambon",
    "cakechorizofeta":           "Cake chorizo-feta",
    "feuilletessaucisse":           "Feuilletés à la saucisse",
    "palmierspesto":           "Palmiers feuilletés au pesto",
    "oeufsmimosa":           "Œufs mimosa",
    "brochettecaprese":           "Brochettes tomate-mozza-basilic",
    "nachosgratines":           "Nachos gratinés",
    "accrasmorue":           "Accras de morue",
    "boulettesfetaepinard":           "Boulettes feta-épinards",
    "samoussaslegumes":           "Samoussas aux légumes",
    "grissiniparme":           "Grissini au parmesan",
    "dipfetapoivron":           "Dip feta-poivron grillé",
    "rillettesthon":           "Rillettes de thon",
    "crackersgraines":           "Crackers maison aux graines",
    "verrineavocatcrevette":           "Verrine avocat-crevette",
    "tortillaespagnola":           "Tortilla española",
    "croquetasjamon":           "Croquetas au jambon",
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
    "butterchicken":     "Butter Chicken",    "quichelorraine":    "Quiche Lorraine",
    "soupeaoignon":      "Soupe à l'Oignon",    "rizcantonais":     "Riz cantonais",    "naan":              "Naans",
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
    "shakshukaverte":    "Shakshuka Verte",    "tteokbokki":        "Tteokbokki",
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
    // === Noms restaurés (recettes existantes sans mapping) ===
    "hachisparmentier":      "Hachis Parmentier",
    "daubeProvencale":       "Daube Provençale",
    "pouletNormande":        "Poulet à la Normande",
    "tajinepoulet":          "Tajine de Poulet au Citron",
    "saltimbocca":           "Saltimbocca alla Romana",
    "bouillabaisse":         "Bouillabaisse Marseillaise",
    "gratinPates":           "Gratin de Pâtes",
    "volauVent":             "Vol-au-Vent",
    "jambonneauLentilles":   "Jarret de Porc aux Lentilles",
    "boulettesViande":       "Boulettes de Viande Sauce Tomate",
    "brandadeMorue":         "Brandade de Morue",
    "saladeThai":            "Salade Thaï",
    "saladeHaricotsVerts":   "Salade de Haricots Verts",
    "saladeFruitsMer":       "Salade de Fruits de Mer",
    "saladePoulpe":          "Salade de Poulpe à la Grecque",
    "soupeLentillesCorail":  "Soupe de Lentilles Corail",
    "bowlProteineVege":      "Bowl Protéiné Végétarien",
    "soupeDetox":            "Soupe Détox Verte",
    "saladeKale":            "Salade de Kale",
    "bruschetta":            "Bruschetta",
    "samosas":               "Samosas Légumes",
    "springRolls":           "Spring Rolls Vietnamiens",
    "oeufsCocotte":          "Œufs Cocotte",
    "tarteFragoles":         "Tarte aux Fraises",
    "pannaCotta":            "Panna Cotta",
    "eclair":                "Éclairs au Chocolat",
    "pavlova":               "Pavlova aux Fruits",
    "profiteroles":          "Profiteroles",
    "tarteNormande":         "Tarte Normande aux Pommes",
    "sobejaponais":          "Soba Japonais",
    "tartarethon":           "Tartare de Thon",
    "pouletcitroncitronelle":"Poulet Citron Citronnelle",
    "velouteAsperges":       "Velouté d'Asperges",
    "saladeLegsRoasted":     "Salade de Légumes Rôtis",
    "quinoalegumes":         "Quinoa aux Légumes du Soleil",
    "patatesdoucesCurry":    "Curry de Patates Douces",
    "falafelbaked":          "Falafels au Four",
    "smoothievert":          "Smoothie Vert Détox",
    "assiettepouletpatate":  "Assiette Poulet Grillé",
    "gnocchisgorgonzola":    "Gnocchis au Gorgonzola",
    "risottocourgettechevre":"Risotto Courgette-Chèvre",
    "currypoischiches":      "Curry de Pois Chiches",
    "pastapomodoro":         "Pasta al Pomodoro",
    "omeletteprovencale":    "Omelette Provençale",
    "tarteepinardfeta":      "Tarte Épinards Feta",
    "veggieburger":          "Veggie Burger",
    "soufflecheese":         "Soufflé au Fromage",
    "paellaVege":            "Paella Végétarienne",
    "cassoulet":             "Cassoulet Toulousain",
    // === Cocktails / mocktails ===
    "bellini":                  "Bellini",
    "frenchMartini":            "French Martini",
    "darkStormyCocktail":       "Dark & Stormy",
    "amarettoSour":             "Amaretto Sour",
    "aperolPamplemousse":       "Aperol Pamplemousse Spritz",
    "mocktailframboisementhe":  "Mocktail Framboise-Menthe",
    "mocktailpassionsoleil":    "Mocktail Passion Soleil",
    "mocktailconcombrecitr":    "Mocktail Concombre-Citron",
    "mocktailgingembre":        "Ginger Mocktail",
    "mocktailfraisesvanille":   "Mocktail Fraises-Vanille",
    // === 50 nouvelles recettes du monde ===
    "massamancurry":         "Massaman de Bœuf",
    "dakgalbi":              "Dak Galbi",
    "bobun":                 "Bo Bún Vietnamien",
    "massamanagneau":        "Massaman d'Agneau",
    "jollofrice":            "Jollof Rice Nigérian",
    "ropavieja":             "Ropa Vieja Cubaine",
    "birriatacos":           "Tacos Birria",
    "galbicoreen":           "Galbi Coréen",
    "nasigoreng":            "Nasi Goreng",
    "oxtailcaribeen":        "Queue de Bœuf Caribéenne",
    "paneertikkamasala":     "Paneer Tikka Masala",
    "souskaicrevettes":      "Souskaï de Crevettes",
    "agnellocacciatore":     "Agnello alla Cacciatora",
    "pouletyassa":           "Poulet Yassa",
    "kibbeh":                "Kibbeh Libanais",
    "babaganoush":           "Baba Ganoush",
    "burratapeche":          "Burrata Pêche-Basilic",
    "vitellotonnato":        "Vitello Tonnato",
    "cevicheperou":          "Ceviche Péruvien",
    "dolma":                 "Dolmas",
    "solyanka":              "Solyanka Russe",
    "tomyumkungspicy":       "Tom Yum Kung",
    "ajiaco":                "Ajiaco Colombien",
    "misoramencanard":       "Ramen Miso au Canard",
    "kharcho":               "Kharcho Géorgien",
    "saladechorizofeves":    "Salade Chorizo-Fèves",
    "tabboulehlibanais":     "Taboulé Libanais",
    "poissoncrutahitien":    "Poisson Cru Tahitien",
    "saladewasabi":          "Salade Concombre-Wasabi",
    "poketuna":              "Poké Thon-Avocat",
    "buddhabowlazteque":     "Buddha Bowl Aztèque",
    "dahllentillescorail":   "Dahl de Lentilles Corail",
    "saumonteriyakimiel":    "Saumon Teriyaki au Miel",
    "pizzanduja":            "Pizza Nduja",
    "pizzafiguechevre":      "Pizza Figue-Chèvre",
    "pizzapestopignons":     "Pizza Pesto-Pignons",
    "huevosrancheros":       "Huevos Rancheros",
    "chilaquilesrojos":      "Chilaquiles Rojos",
    "kayatoast":             "Kaya Toast",
    "samossasagneau":        "Samossas à l'Agneau",
    "empanadasargentines":   "Empanadas Argentines",
    "baoporccarmelise":      "Bao au Porc Caramélisé",
    "pasteldenata":          "Pastéis de Nata",
    "basquecheesecake":      "Basque Cheesecake",
    "mochiglace":            "Mochis Glacés",
    "knafehlibanais":        "Knafeh",
    "alfajores":             "Alfajores",
    "focacciaolives":        "Focaccia Olives-Romarin",
    "khachapuri":            "Khachapuri",
    "painpita":              "Pain Pita",
    // === Lot 1 — 11 classiques français ===
    "quenelleslyonnaises":   "Quenelles Lyonnaises sauce Nantua",
    "aligotcantal":          "Aligot du Cantal",
    "coqauvin":              "Coq au Vin",
    "civetlapin":            "Civet de Lapin",
    "soupeaupistou":         "Soupe au Pistou",
    "tartiflettesavoyarde":  "Tartiflette Savoyarde",
    "andouillettemoutarde":  "Andouillette à la Moutarde",
    "confitcanard":          "Confit de Canard",
    "cremecaramel":          "Crème Caramel",
    "farbreton":             "Far Breton aux Pruneaux",
    "galettedesrois":        "Galette des Rois Frangipane",
    // === Lot 2 — 11 cuisines du monde ===
    "bunbonamoo":            "Bún Bò Nam Bộ",
    "banhmiviet":            "Bánh Mì Vietnamien",
    "feijoadabresil":        "Feijoada Brésilienne",
    "gadogado":              "Gado-Gado Indonésien",
    "larbgai":               "Larb Gai (Thaïlande)",
    "khaosoi":               "Khao Soi",
    "sayadieh":              "Sayadieh Libanais",
    "fattehlibanaise":       "Fatteh Libanaise",
    "keftamarocaine":        "Kefta Marocaine aux Œufs",
    "pastillapoulet":        "Pastilla au Poulet",
    "spanakopita":           "Spanakopita Grecque",
    // === Mega-Lot — Italie / Pâtisserie / Healthy ===
    "spaghettivongole":      "Spaghetti alle Vongole",
    "polentagorgonzola":     "Polenta au Gorgonzola",
    "arancinissicilien":     "Arancini Sicilien",
    "caponatasicile":        "Caponata Sicilienne",
    "cannolisicilien":       "Cannoli Siciliens",
    "affogatoglace":         "Affogato al Caffè",
    "painsigle":             "Pain de Seigle",
    "paincampagne":          "Pain de Campagne",
    "religieusechocolat":    "Religieuse au Chocolat",
    "sainthonore":           "Saint-Honoré",
    "foretnoire":            "Forêt Noire",
    "charlottefruits":       "Charlotte aux Fruits Rouges",
    "carpacciodeboeuf":      "Carpaccio de Bœuf",
    "rillettessaumonfume":   "Rillettes de Saumon Fumé",
    "quichepoireaux":        "Quiche aux Poireaux",
    "bowlsaumonquinoa":      "Bowl Saumon-Quinoa",
    "galettesarrasin":       "Galette de Sarrasin Complète",
    // === Sprint final — 23 recettes pour atteindre 400 ===
    "bretzelallemand":       "Bretzel Allemand",
    "currywurst":            "Currywurst",
    "apfelstrudel":          "Apfelstrudel",
    "tortillaespagnole":     "Tortilla Española",
    "patatasbravas":         "Patatas Bravas",
    "cremecatalane":         "Crema Catalana",
    "quesadillas":           "Quesadillas Mexicaines",
    "guacamole":             "Guacamole Authentique",
    "treslecheas":           "Pastel de Tres Leches",
    "samosaslegumes":        "Samosas Légumes",
    "mangolassi":            "Mango Lassi",
    "karaagepoulet":         "Karaage Japonais",
    "matchalattewi":         "Matcha Latte",
    "mapotofu":              "Mapo Tofu",
    "soupewonton":           "Soupe Wonton",
    "bortsch":               "Bortsch Russe",
    "pelmeni":               "Pelmeni Russes",
    "bacalhaubras":          "Bacalhau à Brás",
    "caldoverde":            "Caldo Verde",
    "bowlacai":              "Bowl Açaí",
    "saladeburrata":         "Salade Burrata",
    "goulashhongrois":       "Goulash Hongrois",
    "raclette":              "Raclette Savoyarde",
    // === Incontournables ===
    "fonduesavoyarde":       "Fondue Savoyarde",
    "saintjacquespoelees":   "Saint-Jacques poêlées",
    "painperdubrioche":      "Pain Perdu Brioché",
    "tartareboeuf":          "Tartare de Bœuf",
    "soupepoissonroche":     "Soupe de Poisson de Roche",
    "okonomiyaki":           "Okonomiyaki",
    "biryanipoulet":         "Biryani de Poulet",
    "tagliatellestruffe":    "Tagliatelles à la Truffe",
    "pastillaroyale":        "Pastilla Royale",
    "carbonadeflamande":     "Carbonade Flamande",
    "tourtiere": "Tourtière",
    "poudingchomeur": "Pouding Chômeur",
    "alplermagronen": "Älplermagronen",
    "birchermuesli": "Birchermüesli",
    "semla": "Semla",
    "manti": "Manti",
    "menemen": "Menemen",
    "miegoreng": "Mie Goreng",
    "kurtoskalacs": "Kürtőskalács",
    "choripan": "Choripán",
    "causalimena": "Causa Limeña",
    "patacones": "Patacones",
    "cubano": "Sandwich Cubano",
    "chilicrab": "Chili Crab",
    "zurek": "Żurek",
    "tibs": "Tibs",
    "veloute": "Sauce velouté",
    "sauceespagnole": "Sauce espagnole",
    "bearnaise": "Sauce béarnaise",
    "beurreblanc": "Beurre blanc",
    "saucebordelaise": "Sauce bordelaise",
    "macarons":              "Macarons Parisiens",
    "babaaurhum":            "Baba au Rhum",
    "cakeBananeChoco":       "Cake Banane Chocolat",
  };
  const nomPropre = (typeof getNomRecette === "function")
    ? getNomRecette(nom)
    : (nomsAffichage[nom] || (nom.charAt(0).toUpperCase() + nom.slice(1)));

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

  // En-tête : Nutri-Score en vedette si disponible, sinon emoji (repli)
  const _nutriLettre = (typeof nutriLettreRecette === "function") ? nutriLettreRecette(nom) : null;
  const enteteVisuelHTML = _nutriLettre
    ? `<div class="fiche-nutri-top nutri-${_nutriLettre}" title="Nutri-Score ${_nutriLettre} — qualité nutritionnelle"><div class="fiche-nutri-badge">${_nutriLettre}</div><div class="fiche-nutri-label">NUTRI-SCORE</div></div>`
    : `<div class="fiche-emoji">${data.emoji}</div>`;

  document.getElementById("modal-resultat").innerHTML = `
    ${(window._ficheNavStack && window._ficheNavStack.length) ? `<button class="fiche-retour" onclick="history.back()">‹ Retour</button>` : ""}
    <div class="fiche-modal-header">
      ${enteteVisuelHTML}
      <h2 class="fiche-titre">${typeof drapeau === "function" ? drapeau(data.pays, 22) + " " : ""}${nomPropre}</h2>
      <p class="fiche-desc">${data.description}</p>
    </div>
    ${htmlPrixCalories(nom, personnes)}
    ${typeof recettesLieesHTML === "function" ? recettesLieesHTML(nom) : ""}
    <div class="fiche-meta">
      <span>⏱ ${data.temps}</span>
      <span>${data.niveau}</span>
      ${getSelecteurPersonnesHTML(nom, personnes)}
      ${infoSaison}
      ${infoHistorique}
    </div>
    <div class="fiche-section">
      <h2 class="fiche-section-titre">🛒 Ingrédients</h2>
      <div class="fiche-ingredients-liste">${listeIngredients}</div>
    </div>
    <div class="fiche-section">
      <h2 class="fiche-section-titre">📋 Étapes</h2>
      <button type="button" onclick="ouvrirModeCuisson('${nom}')" aria-label="Lancer le mode cuisson pas à pas" style="display:block;width:100%;box-sizing:border-box;margin:0 0 14px;background:rgba(255,107,161,.14);color:#ff8fb3;border:1.5px solid rgba(255,107,161,.5);border-radius:14px;padding:13px;font-size:16px;font-weight:600;cursor:pointer">👨‍🍳 Lancer le mode cuisson</button>
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
  // v258.3 : on ne remonte en haut qu'à l'ouverture initiale de la fiche.
  // Sur un +/- (recalcul), personnesOverride est un nombre → on garde la position.
  if (typeof personnesOverride !== "number") {
    document.getElementById("modal-resultat").parentElement.scrollTop = 0;
  }

  // Bouton favori
  const btnFav = document.getElementById("btn-favori-modal");
  if (btnFav) {
    btnFav.setAttribute("onclick", `toggleFavori('${nom}')`);
    btnFav.textContent = (typeof estFavori === 'function' && estFavori(nom)) ? '❤️' : '🤍';
  }
  // Bouton "J'ai cuisiné" (v240)
  if (typeof majBoutonCuisine === "function") majBoutonCuisine(nom);
  
  // v259.40 : Note en étoiles de la recette (au-dessus de "Mes notes")
  if (typeof injecterEtoilesRecette === "function") injecterEtoilesRecette(nom);
  // v245 : Section "Mes notes personnelles" en bas de la fiche
  if (typeof injecterNotesRecette === "function") injecterNotesRecette(nom);
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


// === Fonctions html restaurées depuis le labo ===

// Helper col() utilisé par toutes les fonctions html du labo
function col(lignes) {
  return `<table class="tableau-patons tableau-colonnes"><tbody>${lignes}</tbody></table>`;
}

function htmlTableauPizzaColonnes(l) {
  return col(`
    <tr><th>🍕 Pâtons</th><td><b>${l.patons}</b></td></tr>
    <tr><th>⚖️ Poids total pâte</th><td><b style="color:var(--accent-soft,#ff8fb3)">${l.total}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>💧 Eau (65% hydratation)</th><td>${l.eau}</td></tr>
    <tr><th>🧂 Sel (~3%)</th><td>${l.sel}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>`);
}

function htmlTableauCrepesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>💧 Eau</th><td>${l.eau}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>`);
}

function htmlTableauGaufresColonnes(l) {
  return col(`
    <tr><th>🧇 Gaufres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeuf}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>`);
}

function htmlTableauCookiesColonnes(l) {
  return col(`
    <tr><th>🍪 Cookies</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🧈 Beurre tendre</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌿 Vanille</th><td>${l.vanille}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍫 Chocolat noir</th><td>${l.choco}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th>🧪 Levure chimique</th><td>${l.levure}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeuf}</td></tr>`);
}

function htmlTableauSmoothieColonnes(l) {
  return col(`
    <tr><th>🍓 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍓 Fruits rouges surgelés</th><td>${l.fruits}</td></tr>
    <tr><th>🍌 Banane congelée</th><td>${l.banane}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🥥 Lait végétal</th><td>${l.lait}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);padding-top:12px">🎨 Toppings (selon goût)</th></tr>
    <tr><th>🫐 Fruits frais</th><td>1 poignée / bol</td></tr>
    <tr><th>🌾 Granola / flocons avoine</th><td>2 c.à.s / bol</td></tr>
    <tr><th>🌱 Graines de chia</th><td>1 c.à.c / bol</td></tr>
    <tr><th>🥥 Noix de coco râpée</th><td>1 c.à.s / bol</td></tr>`);
}

function htmlTableauYaourtColonnes(l) {
  return col(`
    <tr><th>🥛 Yaourts</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🧫 Ferment (yaourt nature)</th><td>${l.ferment}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);padding-top:12px">🍯 Pour servir (optionnel)</th></tr>
    <tr><th>🍯 Miel / confiture</th><td>selon goût</td></tr>
    <tr><th>🍓 Fruits frais</th><td>selon goût</td></tr>`);
}

function htmlTableauPancakesColonnes(l) {
  return col(`
    <tr><th>🥞 Pancakes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧪 Levure chimique</th><td>${l.levure}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauMuffinsColonnes(l) {
  return col(`
    <tr><th>🧁 Muffins</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍫 Cacao</th><td>${l.cacao}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧪 Levure</th><td>${l.levure}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🫒 Huile</th><td>${l.huile}</td></tr>
    <tr><th>🍫 Pépites chocolat</th><td>${l.pepites}</td></tr>`);
}

function htmlTableauCroquesColonnes(l) {
  return col(`
    <tr><th>🥪 Croques</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍞 Pain de mie</th><td>${l.pain}</td></tr>
    <tr><th>🥩 Jambon blanc</th><td>${l.jambon}</td></tr>
    <tr><th>🧀 Gruyère râpé</th><td>${l.gruyere}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🌾 Farine (béchamel)</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait (béchamel)</th><td>${l.lait}</td></tr>
    <tr><th>🌿 Moutarde Dijon</th><td>${l.moutarde}</td></tr>`);
}

function htmlTableauSaladeNicoiseColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🐟 Thon (boîte)</th><td>${l.thon}</td></tr>
    <tr><th>🥚 Œufs durs</th><td>${l.oeufs}</td></tr>
    <tr><th>🫒 Olives noires</th><td>${l.olives}</td></tr>
    <tr><th>🐟 Anchois</th><td>${l.anchois} filets</td></tr>
    <tr><th>🥬 Salade (batavia)</th><td>${l.salade}</td></tr>
    <tr><th>🧅 Oignon rouge</th><td>${l.oignon}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}

function htmlTableauSaladeCesarColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥬 Laitue romaine</th><td>${l.laitue}</td></tr>
    <tr><th>🍗 Poulet grillé</th><td>${l.poulet}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>
    <tr><th>🍞 Pain (croûtons)</th><td>${l.pain}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🥚 Jaunes d'œufs (sauce)</th><td>1 / 4 pers.</td></tr>`);
}

function htmlTableauSaladeGrequeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🧀 Feta</th><td>${l.feta}</td></tr>
    <tr><th>🫒 Olives Kalamata</th><td>${l.olives}</td></tr>
    <tr><th>🧅 Oignon rouge</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Origan séché</th><td>selon goût</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}

function htmlTableauSaladePatasColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍝 Pâtes courtes</th><td>${l.pates}</td></tr>
    <tr><th>🐟 Thon (boîte)</th><td>${l.thon}</td></tr>
    <tr><th>🍅 Tomates cerises</th><td>${l.tomates}</td></tr>
    <tr><th>🌽 Maïs</th><td>${l.mais}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}

function htmlTableauSaladeRizColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz</th><td>${l.riz}</td></tr>
    <tr><th>🫑 Poivron rouge</th><td>${l.poivron}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🍅 Tomates cerises</th><td>${l.tomates}</td></tr>
    <tr><th>🫒 Olives</th><td>${l.olives}</td></tr>
    <tr><th>🌿 Basilic / persil</th><td>1 bouquet</td></tr>`);
}

function htmlTableauTabuleColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Semoule fine</th><td>${l.semoule}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🌿 Persil plat</th><td>${l.persil}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}

function htmlTableauSaladeLentillesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥜 Lentilles vertes</th><td>${l.lentilles}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🥓 Lardons (optionnel)</th><td>${l.lardons}</td></tr>
    <tr><th>🌿 Bouquet garni</th><td>1</td></tr>
    <tr><th>🥣 Moutarde (vinaigrette)</th><td>1 c.à.s / 4 pers.</td></tr>`);
}

function htmlTableauAvocatCrevettesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥑 Avocats</th><td>${l.avocats}</td></tr>
    <tr><th>🦐 Crevettes roses cuites</th><td>${l.crevettes}</td></tr>
    <tr><th>🥬 Salade verte</th><td>${l.salade}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🍶 Mayonnaise (sauce cocktail)</th><td>3 c.à.s / 4 pers.</td></tr>`);
}

function htmlTableauGoumeauColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🥙 Pâte</th></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🟨 Levure de bière</th><td>${l.levure}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œuf entier</th><td>${l.oeuf}</td></tr>
    <tr><th>🍦 Crème épaisse</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>
    <tr><th>🌸 Eau de fleur d'oranger</th><td>selon quantité</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🍮 Goumeau (nappage)</th></tr>
    <tr><th>🍦 Crème fraîche épaisse</th><td>${l.gCreme}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.gSucre}</td></tr>
    <tr><th>🥚 Jaune d'œuf</th><td>${l.gJaune}</td></tr>`);
}

function htmlTableauGaletteTacosColonnes(l) {
  return col(`
    <tr><th>🌮 Galettes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine T55</th><td>${l.farine}</td></tr>
    <tr><th>💧 Eau tiède</th><td>${l.eau}</td></tr>
    <tr><th>🫒 Huile neutre</th><td>${l.huile}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>`);
}

function htmlTableauPainBurgerColonnes(l) {
  return col(`
    <tr><th>🍔 Buns</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine T55</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre mou</th><td>${l.beurre}</td></tr>
    <tr><th>🫒 Huile neutre</th><td>${l.huile}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeufs}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">✨ Finition</th></tr>
    <tr><th>🥛 Lait (dorure)</th><td>pour badigeonner</td></tr>
    <tr><th>⚪ Graines de sésame</th><td>selon goût</td></tr>`);
}

function htmlTableauPainDeMieColonnes(l) {
  return col(`
    <tr><th>🍞 Tranches</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre mou</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>`);
}

function htmlTableauOvernightOatsColonnes(l) {
  return col(`
    <tr><th>🌾 Pots</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Flocons d'avoine</th><td>${l.flocons}</td></tr>
    <tr><th>🥛 Lait végétal</th><td>${l.lait}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🌱 Graines de chia</th><td>${l.chia}</td></tr>
    <tr><th>🍯 Miel / sirop d'érable</th><td>${l.miel}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🎨 Toppings (selon goût)</th></tr>
    <tr><th>🍓 Fruits frais</th><td>1 poignée / pot</td></tr>
    <tr><th>🌰 Noix / amandes</th><td>selon goût</td></tr>`);
}

function htmlTableauBuddhaBowlColonnes(l) {
  return col(`
    <tr><th>🥙 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Quinoa</th><td>${l.quinoa}</td></tr>
    <tr><th>🍠 Patate douce</th><td>${l.patatedouce}</td></tr>
    <tr><th>🥜 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🥬 Épinards frais</th><td>${l.epinards}</td></tr>
    <tr><th>🥑 Avocat</th><td>${l.avocat}</td></tr>
    <tr><th>🫒 Tahini (sauce)</th><td>${l.tahini}</td></tr>
    <tr><th>🍋 Citron + ail</th><td>selon goût</td></tr>`);
}

function htmlTableauSoupeMisoColonnes(l) {
  return col(`
    <tr><th>🍜 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>💧 Eau (+ dashi)</th><td>${l.eau}</td></tr>
    <tr><th>🌿 Pâte miso</th><td>${l.miso}</td></tr>
    <tr><th>🧀 Tofu soyeux</th><td>${l.tofu}</td></tr>
    <tr><th>🌊 Wakamé séché</th><td>${l.wakame}</td></tr>
    <tr><th>🌿 Ciboule</th><td>${l.ciboule} tige(s)</td></tr>`);
}

function htmlTableauWrapPouletColonnes(l) {
  return col(`
    <tr><th>🌯 Wraps</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🥙 Tortillas</th><td>${l.tortilla}</td></tr>
    <tr><th>🥬 Laitue</th><td>${l.laitue}</td></tr>
    <tr><th>🍅 Tomate</th><td>${l.tomate}</td></tr>
    <tr><th>🥛 Yaourt grec (sauce)</th><td>${l.yaourt}</td></tr>
    <tr><th>🍋 Citron + herbes</th><td>selon goût</td></tr>`);
}

function htmlTableauEnergyBallsColonnes(l) {
  return col(`
    <tr><th>⚡ Balls</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌴 Dattes Medjool</th><td>${l.dattes}</td></tr>
    <tr><th>🌰 Amandes</th><td>${l.amandes}</td></tr>
    <tr><th>🌾 Flocons d'avoine</th><td>${l.flocons}</td></tr>
    <tr><th>🍫 Cacao en poudre</th><td>${l.cacao}</td></tr>
    <tr><th>🥥 Noix de coco râpée</th><td>${l.coco}</td></tr>`);
}

function htmlTableauPancakesProteineColonnes(l) {
  return col(`
    <tr><th>💪 Pancakes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍌 Banane mûre</th><td>${l.banane}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>💪 Poudre de protéines (opt.)</th><td>${l.proteine}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>`);
}

function htmlTableauBowlAcaiColonnes(l) {
  return col(`
    <tr><th>🫐 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🫐 Purée açaï surgelée</th><td>${l.acai}</td></tr>
    <tr><th>🍌 Banane congelée</th><td>${l.banane}</td></tr>
    <tr><th>🥥 Lait végétal</th><td>${l.lait}</td></tr>
    <tr><th>🌾 Granola</th><td>${l.granola}</td></tr>
    <tr><th>🍓 Fruits frais</th><td>${l.fruits}</td></tr>`);
}

function htmlTableauSaladePoisChichesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥜 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🧅 Oignon rouge</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Persil</th><td>${l.persil}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauGaspachoColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🫑 Poivron rouge</th><td>${l.poivron}</td></tr>
    <tr><th>🍞 Pain rassis</th><td>${l.pain}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>selon goût</td></tr>`);
}

function htmlTableauTiramisuColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍪 Biscuits à la cuillère</th><td>${l.biscuits}</td></tr>
    <tr><th>🧀 Mascarpone</th><td>${l.mascarpone}</td></tr>
    <tr><th>🥚 Œufs (extra-frais)</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre en poudre</th><td>${l.sucre}</td></tr>
    <tr><th>☕ Café expresso</th><td>${l.cafe}</td></tr>
    <tr><th>🍫 Cacao amer</th><td>selon goût</td></tr>
    <tr><th>🥃 Marsala (facultatif)</th><td>selon goût</td></tr>`);
}

function htmlTableauFlanColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥧 Pâte feuilletée</th><td>1</td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunes}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Maïzena</th><td>${l.maizena}</td></tr>
    <tr><th>🍦 Crème liquide</th><td>${l.creme}</td></tr>
    <tr><th>🌿 Gousse de vanille</th><td>1</td></tr>`);
}

function htmlTableauClafoutisColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍒 Cerises</th><td>${l.cerises}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre en poudre</th><td>${l.sucre}</td></tr>
    <tr><th>🌿 Sucre vanillé</th><td>1 sachet</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧈 Beurre</th><td>pour le moule</td></tr>`);
}

function htmlTableauTartePommesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥧 Pâte brisée</th><td>1</td></tr>
    <tr><th>🍎 Pommes</th><td>${l.pommes}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau</th><td>${l.eau}</td></tr>
    <tr><th>🍋 Citron (jus)</th><td>½</td></tr>
    <tr><th>🍑 Confiture abricot</th><td>${l.confiture}</td></tr>`);
}

function htmlTableauMojitoRoseColonnes(l) {
  return col(`
    <tr><th>🌹 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr>
    <tr><th>🍓 Fraises fraîches</th><td>${l.fraises}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🍬 Sucre de canne</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>selon besoin</td></tr>`);
}

function htmlTableauNegroniColonnes(l) {
  return col(`
    <tr><th>🍊 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Gin</th><td>${l.gin}</td></tr>
    <tr><th>🍊 Campari</th><td>${l.campari}</td></tr>
    <tr><th>🍷 Vermouth rouge</th><td>${l.vermouth}</td></tr>
    <tr><th>🍊 Zeste d'orange</th><td>${l.orange}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}

function htmlTableauMoscowMuleColonnes(l) {
  return col(`
    <tr><th>🍯 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Vodka</th><td>${l.vodka}</td></tr>
    <tr><th>💧 Ginger beer</th><td>${l.gingerBeer}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>selon besoin</td></tr>`);
}

function htmlTableauPornstarColonnes(l) {
  return col(`
    <tr><th>🍍 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Vodka vanille</th><td>${l.vodka}</td></tr>
    <tr><th>🌺 Passoa</th><td>${l.passoa}</td></tr>
    <tr><th>🌺 Jus de passion</th><td>${l.passion}</td></tr>
    <tr><th>🍾 Prosecco (à part)</th><td>${l.prosecco}</td></tr>
    <tr><th>🍦 Sirop vanille</th><td>${l.vanille}</td></tr>`);
}

function htmlTableauHugoSpritzColonnes(l) {
  return col(`
    <tr><th>🌸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍾 Prosecco</th><td>${l.prosecco}</td></tr>
    <tr><th>🌸 Sirop de sureau</th><td>${l.sureau}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>`);
}

function htmlTableauCherryBlossomColonnes(l) {
  return col(`
    <tr><th>🌸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍒 Jus de cerise</th><td>${l.cerise}</td></tr>
    <tr><th>🌹 Eau de rose</th><td>${l.eauRose}</td></tr>
    <tr><th>🍋 Jus de citron</th><td>${l.citron}</td></tr>
    <tr><th>🍬 Sirop de sucre</th><td>${l.sirop}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>`);
}

function htmlTableauOldFashionedColonnes(l) {
  return col(`
    <tr><th>🥃 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥃 Bourbon / Rye whisky</th><td>${l.bourbon}</td></tr>
    <tr><th>🍬 Sucre (morceau)</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Angostura bitters</th><td>${l.bitters}</td></tr>
    <tr><th>🍊 Zeste d'orange</th><td>${l.orange}</td></tr>
    <tr><th>🧊 Gros glaçon</th><td>1 par verre</td></tr>`);
}

function htmlTableauGinTonicColonnes(l) {
  return col(`
    <tr><th>💧 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Gin</th><td>${l.gin}</td></tr>
    <tr><th>💧 Tonic premium</th><td>${l.tonic}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌶️ Poivre rose</th><td>${l.poivre}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}

function htmlTableauShrubColonnes(l) {
  return col(`
    <tr><th>🫐 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍓 Framboises</th><td>${l.framboises}</td></tr>
    <tr><th>🌿 Basilic frais</th><td>${l.basilic}</td></tr>
    <tr><th>🍶 Vinaigre de cidre</th><td>${l.vinaigre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>`);
}

function htmlTableauCocoAnanasColonnes(l) {
  return col(`
    <tr><th>🥥 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🍍 Jus d'ananas</th><td>${l.ananas}</td></tr>
    <tr><th>🍋 Jus de citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Gingembre frais</th><td>${l.gingembre}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>`);
}

function htmlTableauMojitoColonnes(l) {
  return col(`
    <tr><th>🍹 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍬 Sucre de canne</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>selon besoin</td></tr>`);
}

function htmlTableauMargaritaColonnes(l) {
  return col(`
    <tr><th>🍸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥃 Tequila</th><td>${l.tequila}</td></tr>
    <tr><th>🍊 Triple sec</th><td>${l.tripleSec}</td></tr>
    <tr><th>🍋 Jus de citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🧂 Sel (rebord)</th><td>${l.sel}</td></tr>
    <tr><th>🧊 Glace</th><td>selon besoin</td></tr>`);
}

function htmlTableauCosmopolitanColonnes(l) {
  return col(`
    <tr><th>🍸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Vodka citronnée</th><td>${l.vodka}</td></tr>
    <tr><th>🍊 Cointreau</th><td>${l.cointreau}</td></tr>
    <tr><th>🍒 Jus de cranberry</th><td>${l.cranberry}</td></tr>
    <tr><th>🍋 Jus de citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🧊 Glace</th><td>selon besoin</td></tr>`);
}

function htmlTableauSpritzColonnes(l) {
  return col(`
    <tr><th>🥂 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍊 Aperol</th><td>${l.aperol}</td></tr>
    <tr><th>🍾 Prosecco</th><td>${l.prosecco}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🍊 Orange (déco)</th><td>${l.orange}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}

function htmlTableauSangriaColonnes(l) {
  return col(`
    <tr><th>🍷 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍷 Vin rouge</th><td>${l.vin}</td></tr>
    <tr><th>🥃 Brandy / Cognac</th><td>${l.brandy}</td></tr>
    <tr><th>🍊 Jus d'orange</th><td>${l.orangeJus}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🍊 Orange</th><td>${l.orange}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🍑 Pêche</th><td>${l.peche}</td></tr>`);
}

function htmlTableauPinaColadaColonnes(l) {
  return col(`
    <tr><th>🥥 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr>
    <tr><th>🥥 Crème de coco</th><td>${l.cremeCoco}</td></tr>
    <tr><th>🍍 Jus d'ananas</th><td>${l.ananas}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>${l.glace}</td></tr>`);
}

function htmlTableauDaiquiriColonnes(l) {
  return col(`
    <tr><th>🍸 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr>
    <tr><th>🍋 Jus de citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🍬 Sirop de sucre de canne</th><td>${l.sucre}</td></tr>
    <tr><th>🧊 Glace</th><td>selon besoin</td></tr>`);
}

function htmlTableauWhiskySourColonnes(l) {
  return col(`
    <tr><th>🥃 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥃 Bourbon</th><td>${l.bourbon}</td></tr>
    <tr><th>🍋 Jus de citron</th><td>${l.citron}</td></tr>
    <tr><th>🍬 Sirop de sucre</th><td>${l.sirop}</td></tr>
    <tr><th>🥚 Blanc d'œuf</th><td>${l.blanc}</td></tr>
    <tr><th>🧊 Glace</th><td>selon besoin</td></tr>`);
}

function htmlTableauVirginMojitoColonnes(l) {
  return col(`
    <tr><th>🥤 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍬 Sucre de canne</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🌿 Sirop de menthe</th><td>${l.sirop}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>selon besoin</td></tr>`);
}

function htmlTableauLimonadeColonnes(l) {
  return col(`
    <tr><th>🍋 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍋 Citrons</th><td>${l.citrons}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>
    <tr><th>🌿 Menthe</th><td>${l.menthe}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}

function htmlTableauSmoothieMangoColonnes(l) {
  return col(`
    <tr><th>🥭 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥭 Mangue</th><td>${l.mangue}</td></tr>
    <tr><th>🌺 Fruits de la passion</th><td>${l.passion}</td></tr>
    <tr><th>🍌 Banane</th><td>${l.banane}</td></tr>
    <tr><th>🥥 Lait de coco / végétal</th><td>${l.lait}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>`);
}

function htmlTableauCitronadeColonnes(l) {
  return col(`
    <tr><th>🌿 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍋 Citrons</th><td>${l.citrons}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>💧 Eau fraîche</th><td>${l.eau}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}

function htmlTableauJusPastequeColonnes(l) {
  return col(`
    <tr><th>🍉 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍉 Pastèque</th><td>${l.pasteque}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Gingembre frais</th><td>${l.gingembre}</td></tr>
    <tr><th>🧊 Glaçons</th><td>selon besoin</td></tr>`);
}

function htmlTableauVirginPinaColonnes(l) {
  return col(`
    <tr><th>🥥 Verres</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥥 Crème de coco</th><td>${l.cremeCoco}</td></tr>
    <tr><th>🍍 Jus d'ananas</th><td>${l.ananas}</td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.laitCoco}</td></tr>
    <tr><th>🧊 Glace pilée</th><td>${l.glace}</td></tr>`);
}

function htmlTableauParisBrestColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🥧 Pâte à choux</th></tr>
    <tr><th>💧 Eau</th><td>${l.eauChoux}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.laitChoux}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurrChoux}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufChoux}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🌰 Crème mousseline pralinée</th></tr>
    <tr><th>🥛 Lait entier</th><td>${l.laitCreme}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunesCreme}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreCreme}</td></tr>
    <tr><th>🌾 Maïzena</th><td>${l.maizena}</td></tr>
    <tr><th>🧈 Beurre mou</th><td>${l.beurrCreme}</td></tr>
    <tr><th>🌰 Pâte de pralin</th><td>${l.pralin}</td></tr>`);
}

function htmlTableauLasagneViandeColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr><tr><th>🍝 Feuilles de lasagne</th><td>${l.lasagne}</td></tr><tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr><tr><th>🥛 Béchamel</th><td>${l.bechamel}</td></tr><tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauSouvlakiPouletColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🥙 Pains pita</th><td>${l.pita}</td></tr><tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr><tr><th>🍋 Citron</th><td>${l.citron}</td></tr><tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr><tr><th>🌿 Origan</th><td>${l.origan}</td></tr>`);
}

function htmlTableauButterChickenColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr><tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr><tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr><tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr><tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>`);
}

function htmlTableauRisottoPrimaveraColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍚 Riz arborio</th><td>${l.riz}</td></tr><tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr><tr><th>🟢 Petits pois</th><td>${l.petitspois}</td></tr><tr><th>🌿 Asperges</th><td>${l.asperges}</td></tr><tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr><tr><th>🍷 Vin blanc</th><td>${l.vin}</td></tr>`);
}

function htmlTableauBolognaiseColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥩 Viande hachée mixte</th><td>${l.viande}</td></tr><tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr><tr><th>🍷 Vin rouge</th><td>${l.vin}</td></tr><tr><th>🥛 Lait</th><td>${l.lait}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr><tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>`);
}

function htmlTableauTacosViandeColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr><tr><th>🌮 Tortillas</th><td>${l.tortillas}</td></tr><tr><th>🥑 Avocats</th><td>${l.avocat}</td></tr><tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr><tr><th>🧀 Fromage râpé</th><td>${l.fromage}</td></tr><tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>`);
}

function htmlTableauCouscousRoyalColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🌾 Semoule</th><td>${l.semoule}</td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🌭 Merguez</th><td>${l.merguez}</td></tr><tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr><tr><th>🥕 Carotte</th><td>${l.carotte}</td></tr><tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>`);
}

function htmlTableauMoussakaColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🐑 Agneau haché</th><td>${l.agneau}</td></tr><tr><th>🍆 Aubergines</th><td>${l.aubergines}</td></tr><tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr><tr><th>🥛 Béchamel</th><td>${l.bechamel}</td></tr><tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauPaellaColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍚 Riz à paella</th><td>${l.riz}</td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🌭 Chorizo</th><td>${l.chorizo}</td></tr><tr><th>🦪 Moules</th><td>${l.moules}</td></tr><tr><th>🦐 Crevettes</th><td>${l.crevettes}</td></tr><tr><th>🌼 Safran</th><td>${l.safran}</td></tr>`);
}

function htmlTableauQuicheLorraineColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥐 Pâte brisée</th><td>${l.pate}</td></tr><tr><th>🥓 Lardons fumés</th><td>${l.lardons}</td></tr><tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr><tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr><tr><th>🥛 Lait</th><td>${l.lait}</td></tr><tr><th>🧀 Gruyère</th><td>${l.gruyere}</td></tr>`);
}

function htmlTableauDalIndienColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥜 Lentilles corail</th><td>${l.lentilles}</td></tr><tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr><tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr><tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr><tr><th>🌿 Gingembre</th><td>${l.gingembre}</td></tr>`);
}

function htmlTableauBibimbapColonnes(l) {
  return col(`
    <tr><th>🍚 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz</th><td>${l.riz}</td></tr>
    <tr><th>🥩 Bœuf mariné</th><td>${l.boeuf}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🥕 Carotte</th><td>${l.carotte}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeuf}</td></tr>
    <tr><th>🌶️ Gochujang</th><td>${l.gochujang}</td></tr>`);
}

function htmlTableauMoquecaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Poisson</th><td>${l.poisson}</td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Coriandre</th><td>${l.coriandre}</td></tr>`);
}

function htmlTableauRendangColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Bœuf</th><td>${l.boeuf}</td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🌿 Citronnelle</th><td>${l.citronnelle}</td></tr>
    <tr><th>🌿 Galanga</th><td>${l.galanga}</td></tr>
    <tr><th>🌶️ Piments</th><td>${l.piment}</td></tr>`);
}

function htmlTableauTacoPastorColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐷 Porc (épaule)</th><td>${l.porc}</td></tr>
    <tr><th>🍍 Ananas</th><td>${l.ananas}</td></tr>
    <tr><th>🌮 Tortillas</th><td>${l.tortillas}</td></tr>
    <tr><th>🧅 Oignon blanc</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Coriandre</th><td>${l.coriandre}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>`);
}

function htmlTableauCoteletsColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐑 Côtelettes d'agneau</th><td>${l.cotelets}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr>
    <tr><th>🌿 Romarin</th><td>${l.romarin}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauSushiColonnes(l) {
  return col(`
    <tr><th>🍣 Pièces</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz à sushi</th><td>${l.riz}</td></tr>
    <tr><th>🐟 Saumon sashimi</th><td>${l.saumon}</td></tr>
    <tr><th>🐟 Thon sashimi</th><td>${l.thon}</td></tr>
    <tr><th>🌿 Feuilles de nori</th><td>${l.nori}</td></tr>
    <tr><th>🍶 Vinaigre de riz</th><td>${l.vinaigre}</td></tr>`);
}

function htmlTableauCariGriotColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐷 Porc (épaule)</th><td>${l.porc}</td></tr>
    <tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Thym frais</th><td>${l.thym}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌶️ Piment</th><td>${l.piment}</td></tr>`);
}

function htmlTableauSemouleColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Semoule fine</th><td>${l.semoule}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🍅 Tomates cerises</th><td>${l.tomateCerise}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr>`);
}

function htmlTableauBasquaiseColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐓 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🫑 Poivrons</th><td>${l.poivron}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥓 Jambon de Bayonne</th><td>${l.jambon}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauCrevPilPilColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🦐 Crevettes</th><td>${l.crevettes}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌶️ Piment séché</th><td>${l.piment}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr>
    <tr><th>🌿 Persil</th><td>${l.persil}</td></tr>`);
}

function htmlTableauLasagneVerdureColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Feuilles de lasagne</th><td>${l.lasagne}</td></tr>
    <tr><th>🧀 Ricotta</th><td>${l.ricotta}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🥛 Béchamel</th><td>${l.bechamel}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>`);
}

function htmlTableauCrumbleColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍎 Fruits</th><td>${l.fruits}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🧈 Beurre froid</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌰 Amandes effilées</th><td>${l.amandes}</td></tr>`);
}

function htmlTableauPintxosColonnes(l) {
  return col(`
    <tr><th>🥖 Pintxos</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍞 Tranches de pain</th><td>${l.pain}</td></tr>
    <tr><th>🐟 Anchois</th><td>${l.anchoix}</td></tr>
    <tr><th>🥓 Jambon de Bayonne</th><td>${l.jambon}</td></tr>
    <tr><th>🧀 Fromage</th><td>${l.fromage}</td></tr>
    <tr><th>🫑 Poivron</th><td>${l.poivron}</td></tr>`);
}

function htmlTableauMisoRamenColonnes(l) {
  return col(`
    <tr><th>🍜 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍜 Nouilles ramen</th><td>${l.nouilles}</td></tr>
    <tr><th>💧 Dashi</th><td>${l.dashi}</td></tr>
    <tr><th>🌿 Miso blanc</th><td>${l.miso}</td></tr>
    <tr><th>🧀 Tofu</th><td>${l.tofu}</td></tr>
    <tr><th>🌽 Maïs</th><td>${l.maïs}</td></tr>
    <tr><th>🌿 Nori</th><td>${l.nori}</td></tr>`);
}

function htmlTableauVeloutePPColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🥬 Poireaux</th><td>${l.poireaux}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauTerrineColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Porc haché</th><td>${l.porc}</td></tr>
    <tr><th>🫀 Foies de volaille</th><td>${l.foie}</td></tr>
    <tr><th>🥓 Lardons</th><td>${l.lardons}</td></tr>
    <tr><th>🥃 Cognac</th><td>${l.cognac}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeuf}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>`);
}

function htmlTableauPoulpeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐙 Poulpe frais</th><td>${l.poulpe}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌿 Persil</th><td>${l.persil}</td></tr>`);
}

function htmlTableauPouletRotiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐓 Poulet entier</th><td>${l.poulet}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌿 Thym</th><td>${l.thym}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauMillefeuilleColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥐 Pâte feuilletée</th><td>${l.feuilletee}</td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunes}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Maïzena</th><td>${l.maizena}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauSaumonCrouteColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Pavés de saumon</th><td>${l.saumon}</td></tr>
    <tr><th>🍞 Chapelure</th><td>${l.chapelure}</td></tr>
    <tr><th>🌿 Persil / herbes</th><td>${l.persil}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauTequilaSunriseColonnes(l) {
  return col(`<tr><th>🌅 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🥃 Tequila</th><td>${l.tequila}</td></tr><tr><th>🍊 Jus d'orange</th><td>${l.orange}</td></tr><tr><th>🍒 Grenadine</th><td>${l.grenadine}</td></tr>`);
}

function htmlTableauAperolRosaColonnes(l) {
  return col(`<tr><th>🌸 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🍊 Aperol</th><td>${l.aperol}</td></tr><tr><th>🍷 Rosé pétillant</th><td>${l.rose}</td></tr><tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr><tr><th>🍓 Fraise</th><td>${l.fraise}</td></tr>`);
}

function htmlTableauEspressoMartiniColonnes(l) {
  return col(`<tr><th>☕ Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🍶 Vodka</th><td>${l.vodka}</td></tr><tr><th>☕ Kahlúa / Tia Maria</th><td>${l.kahluaC}</td></tr><tr><th>☕ Espresso serré</th><td>${l.espresso}</td></tr><tr><th>🍬 Sirop de sucre</th><td>${l.sucre}</td></tr>`);
}

function htmlTableauPunchRougeColonnes(l) {
  return col(`<tr><th>🍓 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🍶 Rhum blanc</th><td>${l.rhum}</td></tr><tr><th>🍓 Fraises</th><td>${l.fraises}</td></tr><tr><th>🫐 Framboises</th><td>${l.framboises}</td></tr><tr><th>🍹 Jus fruits rouges</th><td>${l.jusMixte}</td></tr><tr><th>💧 Ginger beer</th><td>${l.gingerBeer}</td></tr>`);
}

function htmlTableauBlueLagoonColonnes(l) {
  return col(`<tr><th>🫐 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🍶 Vodka</th><td>${l.vodka}</td></tr><tr><th>🫐 Curaçao bleu</th><td>${l.curacao}</td></tr><tr><th>💧 Limonade</th><td>${l.limonade}</td></tr><tr><th>🍋 Jus de citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauMimosaColonnes(l) {
  return col(`<tr><th>🍾 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🍾 Champagne / Prosecco</th><td>${l.champagne}</td></tr><tr><th>🍊 Jus d'orange frais</th><td>${l.orangeJus}</td></tr>`);
}

function htmlTableauSidecarColonnes(l) {
  return col(`<tr><th>🥃 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🥃 Cognac</th><td>${l.cognac}</td></tr><tr><th>🍊 Cointreau</th><td>${l.cointreau}</td></tr><tr><th>🍋 Jus de citron</th><td>${l.citron}</td></tr><tr><th>🍬 Sucre (rebord)</th><td>${l.sucre}</td></tr>`);
}

function htmlTableauBerryBlissColonnes(l) {
  return col(`<tr><th>🫐 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🫐 Myrtilles</th><td>${l.myrtilles}</td></tr><tr><th>🍓 Framboises</th><td>${l.framboises}</td></tr><tr><th>🍒 Jus de cranberry</th><td>${l.cranberry}</td></tr><tr><th>🍋 Citron</th><td>${l.citron}</td></tr><tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr>`);
}

function htmlTableauLemonDropColonnes(l) {
  return col(`<tr><th>🍋 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🍶 Vodka citronnée</th><td>${l.vodka}</td></tr><tr><th>🍋 Jus de citron frais</th><td>${l.citron}</td></tr><tr><th>🌿 Sirop de gingembre</th><td>${l.gingembre}</td></tr><tr><th>🍬 Sucre (rebord)</th><td>${l.sucre}</td></tr>`);
}

function htmlTableauCocoOrchideeColonnes(l) {
  return col(`<tr><th>🌺 Verres</th><td><b>${l.nb}</b></td></tr><tr><th>🥥 Lait de coco</th><td>${l.laitCoco}</td></tr><tr><th>🌸 Eau de fleur d'oranger</th><td>${l.fleurOranger}</td></tr><tr><th>🍋 Citron vert</th><td>${l.citron}</td></tr><tr><th>💧 Eau gazeuse</th><td>${l.eauGaz}</td></tr><tr><th>🍯 Miel</th><td>${l.miel}</td></tr>`);
}

function htmlTableauPizzaProsciuttoColonnes(l) {
  return col(`<tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr><tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr><tr><th>🍖 Prosciutto di Parma</th><td>${l.prosciutto}</td></tr><tr><th>🥬 Roquette</th><td>${l.roquette}</td></tr><tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>`);
}

function htmlTableauPizzaTruffeColonnes(l) {
  return col(`<tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr><tr><th>🍄 Crème de truffe</th><td>${l.cremeTruffe}</td></tr><tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr><tr><th>🍄 Champignons</th><td>${l.champignons}</td></tr><tr><th>🍄 Huile de truffe</th><td>${l.huileTruffe}</td></tr>`);
}

function htmlTableauPizzaBiancaColonnes(l) {
  return col(`<tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr><tr><th>🧀 Ricotta</th><td>${l.ricotta}</td></tr><tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr><tr><th>🌿 Asperges</th><td>${l.asperges}</td></tr><tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>`);
}

function htmlTableauCalzoneColonnes(l) {
  return col(`<tr><th>🌙 Calzones</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr><tr><th>🧀 Ricotta</th><td>${l.ricotta}</td></tr><tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr><tr><th>🍖 Jambon</th><td>${l.jambon}</td></tr><tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr>`);
}

function htmlTableauPizzaPoivronsColonnes(l) {
  return col(`<tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr><tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr><tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr><tr><th>🫑 Poivrons</th><td>${l.poivron}</td></tr><tr><th>🐟 Anchois</th><td>${l.anchois}</td></tr><tr><th>🫒 Olives noires</th><td>${l.olives}</td></tr>`);
}

function htmlTableauPizzaPatateColonnes(l) {
  return col(`<tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr><tr><th>🧀 Ricotta</th><td>${l.ricotta}</td></tr><tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr><tr><th>🧀 Pecorino</th><td>${l.pecorino}</td></tr><tr><th>🌿 Romarin</th><td>${l.romarin}</td></tr>`);
}

function htmlTableauPizzaBresilieneColonnes(l) {
  return col(`<tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr><tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr><tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr><tr><th>🌴 Cœurs de palmier</th><td>${l.palmier}</td></tr><tr><th>🌽 Maïs</th><td>${l.mais}</td></tr><tr><th>🫒 Olives</th><td>${l.olives}</td></tr>`);
}

function htmlTableauBlanquetteColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥩 Veau</th><td>${l.veau}</td></tr><tr><th>🍄 Champignons</th><td>${l.champignons}</td></tr><tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr><tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauNavarinColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🐑 Agneau</th><td>${l.agneau}</td></tr><tr><th>🟢 Petits pois</th><td>${l.petitspois}</td></tr><tr><th>🪨 Navets</th><td>${l.navets}</td></tr><tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr><tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>`);
}

function htmlTableauCamembertRotiColonnes(l) {
  return col(`<tr><th>🧀 Camemberts</th><td><b>${l.nb}</b></td></tr><tr><th>🧀 Camembert de Normandie</th><td>${l.camembert}</td></tr><tr><th>🍯 Miel</th><td>${l.miel}</td></tr><tr><th>🌿 Romarin</th><td>${l.romarin}</td></tr><tr><th>🌰 Noix</th><td>${l.noix}</td></tr><tr><th>🥖 Pain</th><td>${l.pain}</td></tr>`);
}

function htmlTableauTarteFlambeeColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🌾 Farine</th><td>${l.farine}</td></tr><tr><th>🍦 Fromage blanc + crème</th><td>${l.creme}</td></tr><tr><th>🥓 Lardons</th><td>${l.lardons}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauPouletMisoColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🌿 Miso blanc</th><td>${l.miso}</td></tr><tr><th>🍶 Mirin</th><td>${l.mirin}</td></tr><tr><th>🌿 Gingembre</th><td>${l.gingembre}</td></tr><tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>`);
}

function htmlTableauNoodlesWokColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍜 Nouilles de riz</th><td>${l.nouilles}</td></tr><tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr><tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr><tr><th>🌾 Graines de sésame</th><td>${l.sesame}</td></tr><tr><th>🥬 Bok choy</th><td>${l.bok_choy}</td></tr>`);
}

function htmlTableauMaffeSenegalColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🥜 Pâte d'arachide</th><td>${l.arachide}</td></tr><tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr><tr><th>🍠 Patate douce</th><td>${l.patate}</td></tr>`);
}

function htmlTableauGazpachoMelonColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍈 Melon</th><td>${l.melon}</td></tr><tr><th>🍖 Jambon de Parme</th><td>${l.jambon}</td></tr><tr><th>🍋 Citron</th><td>${l.citron}</td></tr><tr><th>🌿 Menthe fraîche</th><td>${l.menthe}</td></tr><tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr>`);
}

function htmlTableauWafflesSalesColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🌾 Farine</th><td>${l.farine}</td></tr><tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr><tr><th>🥛 Lait</th><td>${l.lait}</td></tr><tr><th>🧀 Fromage râpé</th><td>${l.fromage}</td></tr><tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauChoucrouteColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥬 Choucroute crue</th><td>${l.chouC}</td></tr><tr><th>🌭 Saucisses</th><td>${l.saucisses}</td></tr><tr><th>🦴 Jarret de porc</th><td>${l.jarret}</td></tr><tr><th>🥓 Lard fumé</th><td>${l.lard}</td></tr><tr><th>🍷 Riesling</th><td>${l.vin}</td></tr><tr><th>🫐 Baies de genièvre</th><td>${l.baies}</td></tr>`);
}

function htmlTableauSconeColonnes(l) {
  return col(`<tr><th>🫖 Scones</th><td><b>${l.nb}</b></td></tr><tr><th>🌾 Farine</th><td>${l.farine}</td></tr><tr><th>🧈 Beurre froid</th><td>${l.beurre}</td></tr><tr><th>🥛 Lait</th><td>${l.lait}</td></tr><tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr><tr><th>🟨 Levure chimique</th><td>${l.levure}</td></tr>`);
}

function htmlTableauCalamarsColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🦑 Calamars / Encornets</th><td>${l.calamars}</td></tr><tr><th>🌾 Farine</th><td>${l.farine}</td></tr><tr><th>🍋 Citron</th><td>${l.citron}</td></tr><tr><th>🧄 Ail</th><td>${l.ail}</td></tr><tr><th>🌿 Persil</th><td>${l.persil}</td></tr>`);
}

function htmlTableauBaklavaColonnes(l) {
  return col(`<tr><th>🍯 Pièces</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Feuilles de filo</th><td>${l.filo}</td></tr><tr><th>🌰 Pistaches</th><td>${l.pistaches}</td></tr><tr><th>🧈 Beurre clarifié</th><td>${l.beurre}</td></tr><tr><th>🍯 Miel</th><td>${l.miel}</td></tr><tr><th>🌹 Eau de rose</th><td>${l.eauRose}</td></tr>`);
}

function htmlTableauEggsBenedictColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍞 Muffins anglais</th><td>${l.muffins}</td></tr><tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr><tr><th>🍖 Jambon de pays</th><td>${l.jambon}</td></tr><tr><th>🧈 Beurre (hollandaise)</th><td>${l.beurre}</td></tr><tr><th>🥚 Jaunes (hollandaise)</th><td>${l.jaunes}</td></tr><tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauPorkBellyColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🐷 Poitrine de porc</th><td>${l.porc}</td></tr><tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr><tr><th>🍯 Miel</th><td>${l.miel}</td></tr><tr><th>🧄 Ail</th><td>${l.ail}</td></tr><tr><th>🌿 Gingembre</th><td>${l.gingembre}</td></tr>`);
}

function htmlTableauVeloutePotironColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🎃 Courge butternut</th><td>${l.courge}</td></tr><tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr><tr><th>🌿 Gingembre frais</th><td>${l.gingembre}</td></tr><tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauChocolatChaudColonnes(l) {
  return col(`<tr><th>☕ Tasses</th><td><b>${l.nb}</b></td></tr><tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr><tr><th>🍫 Chocolat noir 70%</th><td>${l.chocolat}</td></tr><tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr><tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>`);
}

function htmlTableauGranolaMaisonColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🌾 Flocons d'avoine</th><td>${l.flocons}</td></tr><tr><th>🍯 Miel</th><td>${l.miel}</td></tr><tr><th>🌰 Noix mélangées</th><td>${l.noix}</td></tr><tr><th>🌱 Graines</th><td>${l.graines}</td></tr><tr><th>🫒 Huile de coco</th><td>${l.huile}</td></tr>`);
}

function htmlTableauPizzaChorizoColonnes(l) {
  return col(`<tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr><tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr><tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr><tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr><tr><th>🌭 Chorizo</th><td>${l.chorizo}</td></tr><tr><th>🫑 Poivron</th><td>${l.poivron}</td></tr>`);
}

function htmlTableauPouletTeriyakiColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr><tr><th>🍶 Mirin</th><td>${l.mirin}</td></tr><tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr><tr><th>🌾 Graines de sésame</th><td>${l.sesame}</td></tr>`);
}

function htmlTableauCurryVerthaiColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr><tr><th>🍛 Pâte curry vert</th><td>${l.curryVert}</td></tr><tr><th>🍆 Aubergine</th><td>${l.aubergine}</td></tr><tr><th>🌿 Basilic thaï</th><td>${l.basilic}</td></tr>`);
}

function htmlTableauChiliCarneColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr><tr><th>🥜 Haricots rouges</th><td>${l.haricots}</td></tr><tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr><tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr><tr><th>🌶️ Piment de Cayenne</th><td>${l.piment}</td></tr><tr><th>🌿 Cumin</th><td>${l.cumin}</td></tr>`);
}

function htmlTableauKFCColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🌾 Farine de riz</th><td>${l.farine}</td></tr><tr><th>🌾 Fécule de maïs</th><td>${l.fecule}</td></tr><tr><th>🌶️ Gochujang</th><td>${l.gochujang}</td></tr><tr><th>🍯 Miel</th><td>${l.miel}</td></tr>`);
}

function htmlTableauRisottoMilaneseColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍚 Riz arborio</th><td>${l.riz}</td></tr><tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr><tr><th>🌼 Safran</th><td>${l.safran}</td></tr><tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr><tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr><tr><th>🍷 Vin blanc</th><td>${l.vin}</td></tr>`);
}

function htmlTableauSoupeAziatColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr><tr><th>🍜 Nouilles de riz</th><td>${l.nouilles}</td></tr><tr><th>🌿 Gingembre</th><td>${l.gingembre}</td></tr><tr><th>🥬 Bok choy</th><td>${l.bok_choy}</td></tr><tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>`);
}

function htmlTableauTartareSaumonColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🐟 Saumon frais</th><td>${l.saumon}</td></tr><tr><th>🥑 Avocat</th><td>${l.avocat}</td></tr><tr><th>🍋 Citron</th><td>${l.citron}</td></tr><tr><th>🌿 Ciboulette</th><td>${l.ciboulette}</td></tr><tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr>`);
}

function htmlTableauCremeBruleeColonnes(l) {
  return col(`<tr><th>🔥 Verrines</th><td><b>${l.nb}</b></td></tr><tr><th>🍦 Crème fraîche entière</th><td>${l.creme}</td></tr><tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunes}</td></tr><tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr><tr><th>🍦 Vanille</th><td>${l.vanille}</td></tr><tr><th>🍬 Sucre à caraméliser</th><td>${l.sucreD}</td></tr>`);
}

function htmlTableauTiramisuFraiseColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍪 Biscuits à la cuillère</th><td>${l.biscuits}</td></tr><tr><th>🧀 Mascarpone</th><td>${l.mascarpone}</td></tr><tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr><tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr><tr><th>🍓 Fraises</th><td>${l.fraises}</td></tr>`);
}

function htmlTableauPouletCocoLColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr><tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr><tr><th>🍋 Citron confit</th><td>${l.citronC}</td></tr><tr><th>🧄 Ail</th><td>${l.ail}</td></tr><tr><th>🌿 Coriandre</th><td>${l.coriandre}</td></tr>`);
}

function htmlTableauCrepesSucreesColonnes(l) {
  return col(`<tr><th>🍮 Crêpes</th><td><b>${l.nb}</b></td></tr><tr><th>🌾 Farine</th><td>${l.farine}</td></tr><tr><th>🥛 Lait</th><td>${l.lait}</td></tr><tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr><tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr><tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>`);
}

function htmlTableauPoireauVinaigretteColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🥬 Poireaux</th><td>${l.poireaux}</td></tr><tr><th>🥚 Œufs durs</th><td>${l.oeufs}</td></tr><tr><th>🟡 Moutarde</th><td>${l.moutarde}</td></tr><tr><th>🍶 Vinaigre</th><td>${l.vinaigre}</td></tr><tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr>`);
}

function htmlTableauSpaetzleColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🌾 Farine</th><td>${l.farine}</td></tr><tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr><tr><th>🥛 Lait</th><td>${l.lait}</td></tr><tr><th>🧂 Sel</th><td>${l.sel}</td></tr><tr><th>🧈 Beurre noisette</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauWagyuBurgerColonnes(l) {
  return col(`<tr><th>🍔 Burgers</th><td><b>${l.nb}</b></td></tr><tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr><tr><th>🍞 Buns briochés</th><td>${l.buns}</td></tr><tr><th>🧀 Cheddar</th><td>${l.cheddar}</td></tr><tr><th>🥬 Salade</th><td>${l.salade}</td></tr><tr><th>🍅 Tomate</th><td>${l.tomate}</td></tr>`);
}

function htmlTableauLemonPastaColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍝 Spaghetti</th><td>${l.spaghetti}</td></tr><tr><th>🍋 Citron</th><td>${l.citron}</td></tr><tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr><tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr><tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauMinestroneColonnes(l) {
  return col(`<tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr><tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr><tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr><tr><th>🥕 Carotte</th><td>${l.carotte}</td></tr><tr><th>🥜 Haricots blancs</th><td>${l.haricots}</td></tr><tr><th>🍝 Petites pâtes</th><td>${l.pates}</td></tr><tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>`);
}

function htmlTableauPizzaReineColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🍖 Jambon</th><td>${l.jambon}</td></tr>
    <tr><th>🍄 Champignons</th><td>${l.champignons}</td></tr>`);
}

function htmlTableauPizzaFormaggiColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🧀 Gorgonzola</th><td>${l.gorgonzola}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>
    <tr><th>🧀 Ricotta</th><td>${l.ricotta}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>`);
}

function htmlTableauPizzaDiavolaColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🌭 Salami épicé</th><td>${l.salami}</td></tr>
    <tr><th>🌶️ Nduja</th><td>${l.nduja}</td></tr>
    <tr><th>🌶️ Piment frais</th><td>${l.piment}</td></tr>`);
}

function htmlTableauPizzaSaumonColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🐟 Saumon fumé</th><td>${l.saumon}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauPizzaVegeColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥙 Pâtons</th><td>${l.pate}</td></tr>
    <tr><th>🍅 Sauce tomate</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Mozzarella</th><td>${l.mozza}</td></tr>
    <tr><th>🫑 Poivron</th><td>${l.poivron}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🍆 Aubergine</th><td>${l.aubergine}</td></tr>
    <tr><th>🌿 Pesto</th><td>${l.pesto}</td></tr>`);
}

function htmlTableauSouvlakiAgneauColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Agneau</th><td>${l.agneau}</td></tr>
    <tr><th>🥙 Pains pita</th><td>${l.pita}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huileOlive}</td></tr>`);
}

function htmlTableauTomYamColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🦐 Crevettes</th><td>${l.crevettes}</td></tr>
    <tr><th>🍋 Citrons verts</th><td>${l.citron}</td></tr>
    <tr><th>🌿 Citronnelle</th><td>${l.citronnelle}</td></tr>
    <tr><th>🌿 Galanga</th><td>${l.galanga}</td></tr>`);
}

function htmlTableauDoradeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Dorade royale</th><td>${l.dorade}</td></tr>
    <tr><th>🌿 Chermoula</th><td>${l.chermoula}</td></tr>
    <tr><th>🍋 Citrons</th><td>${l.citron}</td></tr>
    <tr><th>🫒 Olives</th><td>${l.olives}</td></tr>`);
}

function htmlTableauPierogiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🧀 Fromage frais</th><td>${l.fromage}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🍦 Crème sure</th><td>${l.creme}</td></tr>`);
}

function htmlTableauMomosColonnes(l) {
  return col(`
    <tr><th>🥟 Momos</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr>
    <tr><th>🥬 Chou</th><td>${l.chou}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Gingembre</th><td>${l.gingembre}</td></tr>`);
}

function htmlTableauShakshukaVerteColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>
    <tr><th>🫑 Poivron vert</th><td>${l.poivron}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🧀 Feta (optionnel)</th><td>${l.fetaOpt}</td></tr>`);
}

function htmlTableauKebbehColonnes(l) {
  return col(`
    <tr><th>🥩 Kebbeh</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Agneau haché</th><td>${l.agneau}</td></tr>
    <tr><th>🌾 Semoule fine</th><td>${l.semoule}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🌰 Pignons de pin</th><td>${l.pignons}</td></tr>
    <tr><th>🪵 Cannelle</th><td>${l.cannelle}</td></tr>`);
}

function htmlTableauTteokbokkiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍱 Tteok (gâteaux de riz)</th><td>${l.tteok}</td></tr>
    <tr><th>🌶️ Gochujang</th><td>${l.gochujang}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>`);
}

function htmlTableauPulledPorkColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐷 Épaule de porc</th><td>${l.porc}</td></tr>
    <tr><th>🌶️ Rub BBQ</th><td>${l.rub}</td></tr>
    <tr><th>🍖 Sauce BBQ</th><td>${l.bbqSauce}</td></tr>
    <tr><th>💨 Paprika fumé</th><td>${l.fumee}</td></tr>`);
}

function htmlTableauDosaColonnes(l) {
  return col(`
    <tr><th>🥞 Dosas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz</th><td>${l.rizS}</td></tr>
    <tr><th>🥜 Lentilles urad dal</th><td>${l.lentilles}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th>🍲 Sambar</th><td>${l.sambar}</td></tr>
    <tr><th>🌿 Chutney</th><td>${l.chutney}</td></tr>`);
}

function htmlTableauBraiseBoeufColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Joues de bœuf</th><td>${l.joues}</td></tr>
    <tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>
    <tr><th>🍶 Mirin</th><td>${l.mirin}</td></tr>
    <tr><th>🍶 Saké</th><td>${l.saké}</td></tr>
    <tr><th>🌿 Gingembre</th><td>${l.gingembre}</td></tr>
    <tr><th>⭐ Anis étoilé</th><td>${l.anis}</td></tr>`);
}

function htmlTableauPaprikashColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🌶️ Paprika hongrois</th><td>${l.paprika}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>`);
}

function htmlTableauRamenColonnes(l) {
  return col(`
    <tr><th>🍜 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍜 Nouilles ramen</th><td>${l.nouilles}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🥩 Porc (chashu)</th><td>${l.porc}</td></tr>
    <tr><th>🥚 Œufs mollets</th><td>${l.oeuf}</td></tr>
    <tr><th>🍄 Shiitake</th><td>${l.shiitake}</td></tr>`);
}

function htmlTableauGyozaColonnes(l) {
  return col(`
    <tr><th>🥟 Gyoza</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥙 Feuilles à gyoza</th><td>${l.pate}</td></tr>
    <tr><th>🥩 Porc haché</th><td>${l.porc}</td></tr>
    <tr><th>🥬 Chou chinois</th><td>${l.chou}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌿 Gingembre</th><td>${l.gingembre}</td></tr>`);
}

function htmlTableauTikaMasalaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Yaourt (marinade)</th><td>${l.yaourt}</td></tr>
    <tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr>`);
}

function htmlTableauPhoColonnes(l) {
  return col(`
    <tr><th>🍲 Bols</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍜 Nouilles de riz</th><td>${l.nouilles}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🥩 Bœuf (tranché fin)</th><td>${l.boeuf}</td></tr>
    <tr><th>⭐ Anis étoilé</th><td>${l.anis}</td></tr>
    <tr><th>🪵 Cannelle</th><td>${l.cannelle}</td></tr>`);
}

function htmlTableauPizzaMargheritaColonnes(l) {
  return col(`
    <tr><th>🍕 Pizzas</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥙 Pâtons (recette pâte à pizza)</th><td>${l.pate}</td></tr>
    <tr><th>🍅 Tomates San Marzano</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Mozzarella di bufala</th><td>${l.mozza}</td></tr>
    <tr><th>🌿 Basilic frais</th><td>${l.basilic}</td></tr>`);
}

function htmlTableauCarbonaraColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍝 Spaghetti</th><td>${l.spaghetti}</td></tr>
    <tr><th>🥓 Guanciale</th><td>${l.guanciale}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🧀 Pecorino romano</th><td>${l.pecorino}</td></tr>
    <tr><th>🌶️ Poivre noir</th><td>généreusement</td></tr>`);
}

function htmlTableauCeebujennColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Poisson</th><td>${l.poisson}</td></tr>
    <tr><th>🍚 Riz</th><td>${l.riz}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🌿 Manioc</th><td>${l.manioc}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>`);
}

function htmlTableauMafeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Viande (agneau/bœuf)</th><td>${l.viande}</td></tr>
    <tr><th>🥜 Pâte d'arachide</th><td>${l.arachide}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🍠 Patate douce</th><td>${l.patate}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauGnocchisColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeuf}</td></tr>
    <tr><th>🧀 Gorgonzola</th><td>${l.gorgonzola}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>`);
}

function htmlTableauFalafelColonnes(l) {
  return col(`
    <tr><th>🧆 Falafels</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥜 Pois chiches crus</th><td>${l.poischiches}</td></tr>
    <tr><th>🌿 Persil / coriandre</th><td>${l.persil}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌿 Cumin</th><td>${l.cumin}</td></tr>
    <tr><th>🥙 Pains pita</th><td>${l.pita}</td></tr>`);
}

function htmlTableauTandooriColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr>
    <tr><th>🌶️ Paprika</th><td>${l.paprika}</td></tr>`);
}

function htmlTableauPekinDuckColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🦆 Canard</th><td>${l.canard}</td></tr>
    <tr><th>🍶 Sauce hoisin</th><td>${l.hoisin}</td></tr>
    <tr><th>🥙 Crêpes pékinoises</th><td>${l.crepesP}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🌿 Ciboule</th><td>${l.ciboule} tiges</td></tr>`);
}

function htmlTableauOssobucoColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🦴 Jarret de veau</th><td>${l.jarret}</td></tr>
    <tr><th>🍷 Vin blanc</th><td>${l.vin}</td></tr>
    <tr><th>🍲 Bouillon</th><td>${l.bouillon}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🌿 Gremolata (citron, ail, persil)</th><td>1 portion</td></tr>`);
}

function htmlTableauTajineColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Agneau</th><td>${l.agneau}</td></tr>
    <tr><th>🫐 Pruneaux</th><td>${l.pruneaux}</td></tr>
    <tr><th>🌰 Amandes effilées</th><td>${l.amandes}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauMoelleuxColonnes(l) {
  return col(`
    <tr><th>🍫 Moelleux</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍫 Chocolat noir</th><td>${l.chocolat}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>`);
}

function htmlTableauCheesecakeColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🧀 Philadelphia</th><td>${l.philadelphia}</td></tr>
    <tr><th>🍪 Biscuits digestifs</th><td>${l.biscuits}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>`);
}

function htmlTableauPainAuChocolatColonnes(l) {
  return col(`
    <tr><th>🍫 Pains</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine T45</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre (détrempe)</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🧈 Beurre de tourage</th><td>${l.beurrage}</td></tr>
    <tr><th>🍫 Chocolat (barres)</th><td>${l.chocolat}</td></tr>`);
}

function htmlTableauGateauBasqueColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍦 Crème (crème pâtissière)</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>`);
}

function htmlTableauCaneleColonnes(l) {
  return col(`
    <tr><th>🏺 Cannelés</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥃 Rhum</th><td>${l.rhum}</td></tr>`);
}

function htmlTableauGravlaxColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Saumon (filet)</th><td>${l.saumon}</td></tr>
    <tr><th>🧂 Gros sel</th><td>${l.sel}</td></tr>
    <tr><th>🍬 Sucre en poudre</th><td>${l.sucre}</td></tr>
    <tr><th>🌿 Aneth frais</th><td>${l.aneth}</td></tr>
    <tr><th>🥃 Vodka (optionnel)</th><td>${l.vodka}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🌿 Sauce moutarde aneth</th></tr>
    <tr><th>🌿 Moutarde douce</th><td>3 c.à.s / 4 pers.</td></tr>
    <tr><th>🫒 Huile neutre</th><td>3 c.à.s / 4 pers.</td></tr>`);
}

function htmlTableauVerrineTiramisuColonnes(l) {
  return col(`
    <tr><th>🥂 Verrines</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍪 Biscuits roses de Reims</th><td>${l.biscuits}</td></tr>
    <tr><th>🧀 Mascarpone</th><td>${l.mascarpone}</td></tr>
    <tr><th>🥚 Œufs extra-frais</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre en poudre</th><td>${l.sucre}</td></tr>
    <tr><th>🍓 Coulis de fraises</th><td>${l.coulis}</td></tr>
    <tr><th>🌸 Sirop de fraise</th><td>${l.sirop}</td></tr>
    <tr><th>🍫 Cacao amer</th><td>pour la finition</td></tr>`);
}

function htmlTableauPotAuFeuColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Viande de bœuf</th><td>${l.viande}</td></tr>
    <tr><th>🦴 Os à moelle</th><td>${l.os}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🧅 Poireaux</th><td>${l.poireaux}</td></tr>
    <tr><th>🌿 Navets</th><td>${l.navets}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌿 Bouquet garni</th><td>1</td></tr>`);
}

function htmlTableauCouscousColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Semoule</th><td>${l.semoule}</td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🥩 Merguez</th><td>${l.merguez}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carotte}</td></tr>
    <tr><th>🥜 Pois chiches</th><td>${l.pois}</td></tr>`);
}

function htmlTableauMoussakaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍆 Aubergines</th><td>${l.aubergines}</td></tr>
    <tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🥛 Béchamel</th><td>${l.bechamel}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>`);
}

function htmlTableauPaellaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz paella</th><td>${l.riz}</td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🦐 Crevettes</th><td>${l.crevettes}</td></tr>
    <tr><th>🦪 Moules</th><td>${l.moules}</td></tr>
    <tr><th>🌭 Chorizo</th><td>${l.chorizo}</td></tr>
    <tr><th>🌼 Safran</th><td>${l.safran}</td></tr>`);
}

function htmlTableauButterChickenColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr>`);
}

function htmlTableauSouvlakiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Porc</th><td>${l.porc}</td></tr>
    <tr><th>🥙 Pains pita</th><td>${l.pita}</td></tr>
    <tr><th>🥒 Concombre (tzatziki)</th><td>${l.concombre}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauQuicheColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥓 Lardons fumés</th><td>${l.lardons}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🥧 Pâte brisée</th><td>1</td></tr>`);
}

function htmlTableauSoupeOignonColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🧅 Oignons</th><td>${l.oignons}</td></tr>
    <tr><th>🍲 Bouillon de bœuf</th><td>${l.bouillon}</td></tr>
    <tr><th>🍞 Pain</th><td>${l.pain}</td></tr>
    <tr><th>🧀 Gruyère râpé</th><td>${l.gruyere}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>`);
}

function htmlTableauDalColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥜 Lentilles corail</th><td>${l.lentilles}</td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🌶️ Garam masala</th><td>${l.masala}</td></tr>`);
}

function htmlTableauRizCantonnaisColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz (cuit froid)</th><td>${l.riz}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥓 Jambon</th><td>${l.jambon}</td></tr>
    <tr><th>🟢 Petits pois</th><td>${l.petitspois}</td></tr>
    <tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>`);
}

function htmlTableauHariraColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥜 Lentilles</th><td>${l.lentilles}</td></tr>
    <tr><th>🥜 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🍅 Tomates</th><td>${l.tomates}</td></tr>
    <tr><th>🥩 Viande</th><td>${l.viande}</td></tr>
    <tr><th>🌾 Vermicelles</th><td>${l.vermicelles}</td></tr>`);
}

function htmlTableauNaanColonnes(l) {
  return col(`
    <tr><th>🥙 Naans</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥛 Yaourt grec</th><td>${l.yaourt}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>
    <tr><th>🥛 Lait tiède</th><td>${l.lait}</td></tr>`);
}

function htmlTableauChurrosColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>💧 Eau</th><td>${l.eau}</td></tr>
    <tr><th>🍬 Sucre cannelle</th><td>${l.sucre}</td></tr>
    <tr><th>🫒 Huile de friture</th><td>${l.huile}</td></tr>
    <tr><th>🍫 Chocolat noir</th><td>${l.chocolat}</td></tr>`);
}

function htmlTableauPouletCitronColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet (filets)</th><td>${l.poulet}</td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🟢 Haricots verts</th><td>${l.haricots}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🌿 Thym frais</th><td>selon goût</td></tr>`);
}

function htmlTableauSalmonTeriyakiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🐟 Pavés de saumon</th><td>${l.saumon}</td></tr>
    <tr><th>🍚 Riz à sushi</th><td>${l.riz}</td></tr>
    <tr><th>🥜 Edamame</th><td>${l.edamame}</td></tr>
    <tr><th>🍶 Sauce soja</th><td>${l.sojaS}</td></tr>
    <tr><th>🍯 Miel</th><td>${l.miel}</td></tr>
    <tr><th>🌿 Gingembre frais</th><td>${l.gingembre}</td></tr>`);
}

function htmlTableauBolognaiseColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr>
    <tr><th>🍝 Pâtes (tagliatelles)</th><td>${l.pates}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🍷 Vin rouge</th><td>${l.vin}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>`);
}

function htmlTableauTacosColonnes(l) {
  return col(`
    <tr><th>🌮 Tacos</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Bœuf haché</th><td>${l.boeuf}</td></tr>
    <tr><th>🥙 Tortillas</th><td>${l.tortillas}</td></tr>
    <tr><th>🥑 Avocat</th><td>${l.avocat}</td></tr>
    <tr><th>🍅 Tomate</th><td>${l.tomate}</td></tr>
    <tr><th>🧀 Fromage râpé</th><td>${l.fromage}</td></tr>`);
}

function htmlTableauPadThaiColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍜 Nouilles de riz</th><td>${l.nouilles}</td></tr>
    <tr><th>🦐 Crevettes</th><td>${l.crevettes}</td></tr>
    <tr><th>🧀 Tofu ferme</th><td>${l.tofu}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🌰 Cacahuètes</th><td>${l.cacahetes}</td></tr>`);
}

function htmlTableauCurryPouletColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍗 Poulet</th><td>${l.poulet}</td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🍚 Riz jasmin</th><td>${l.riz}</td></tr>
    <tr><th>🌶️ Pâte de curry</th><td>${l.pateC}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>`);
}

function htmlTableauBurgerColonnes(l) {
  return col(`
    <tr><th>🍔 Burgers</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Viande hachée</th><td>${l.viande}</td></tr>
    <tr><th>🍞 Buns</th><td>${l.buns}</td></tr>
    <tr><th>🧀 Cheddar</th><td>${l.cheddar}</td></tr>
    <tr><th>🥬 Salade</th><td>${l.salade}</td></tr>
    <tr><th>🍅 Tomate</th><td>${l.tomate}</td></tr>`);
}

function htmlTableauRisottoPrimaveraColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz arborio</th><td>${l.riz}</td></tr>
    <tr><th>🍲 Bouillon légumes</th><td>${l.bouillon}</td></tr>
    <tr><th>🥒 Courgette</th><td>${l.courgette}</td></tr>
    <tr><th>🟢 Petits pois</th><td>${l.petitspois}</td></tr>
    <tr><th>🧀 Parmesan</th><td>${l.parmesan}</td></tr>`);
}

function htmlTableauShakshukaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🫑 Poivron rouge</th><td>${l.poivron}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🌿 Cumin</th><td>${l.cumin}</td></tr>`);
}

function htmlTableauBoeufColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥩 Bœuf</th><td>${l.boeuf}</td></tr>
    <tr><th>🍷 Vin rouge</th><td>${l.vin}</td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>
    <tr><th>🧅 Oignons</th><td>${l.oignons}</td></tr>
    <tr><th>🥓 Lardons</th><td>${l.lardons}</td></tr>
    <tr><th>🍄 Champignons</th><td>${l.champignons}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🧄 Ail</th><td>2 gousses</td></tr>
    <tr><th>🌿 Bouquet garni</th><td>1</td></tr>`);
}

function htmlTableauGratinColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥔 Pommes de terre</th><td>${l.pdterre}</td></tr>
    <tr><th>🍦 Crème liquide</th><td>${l.creme}</td></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🍯 Noix de muscade</th><td>1 pincée</td></tr>`);
}

function htmlTableauCremeBruleeColonnes(l) {
  return col(`
    <tr><th>🍮 Ramequins</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍦 Crème liquide entière</th><td>${l.creme}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunes}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌿 Gousse de vanille</th><td>${l.vanille}</td></tr>
    <tr><th>🍬 Cassonade (caramel)</th><td>${l.cassonade}</td></tr>`);
}

function htmlTableauMousseColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍫 Chocolat noir (70%)</th><td>${l.chocolat}</td></tr>
    <tr><th>🥚 Œufs entiers</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧂 Sel</th><td>1 pincée</td></tr>`);
}

function htmlTableauIleFlottanteColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🥛 Crème anglaise</th></tr>
    <tr><th>🥛 Lait entier</th><td>${l.lait}</td></tr>
    <tr><th>🥚 Jaunes d'œufs</th><td>${l.jaunesCreme}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreCreme}</td></tr>
    <tr><th>🌿 Vanille</th><td>${l.vanille} gousse</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🌨️ Îles (meringue)</th></tr>
    <tr><th>🥚 Blancs d'œufs</th><td>${l.blancs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreIles}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:12px;padding:8px 14px 4px">🍯 Caramel</th></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreCaramel}</td></tr>`);
}

function htmlTableauBananaBreadColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍌 Bananes mûres</th><td>${l.bananes}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍬 Sucre roux</th><td>${l.sucre}</td></tr>
    <tr><th>🧈 Beurre fondu</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🧪 Levure chimique</th><td>${l.levure}</td></tr>
    ${l.lait ? `<tr><th>🥛 Lait</th><td>${l.lait}</td></tr>` : ""}
    ${l.yaourt ? `<tr><th>🥛 Yaourt</th><td>${l.yaourt}</td></tr>` : ""}
    ${l.vanille ? `<tr><th>🌿 Vanille</th><td>${l.vanille}</td></tr>` : ""}
    ${l.sel ? `<tr><th>🧂 Sel</th><td>${l.sel}</td></tr>` : ""}`);
}

function htmlTableauGranolaColonnes(l) {
  return col(`
    <tr><th>🥣 Portions</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Flocons d'avoine</th><td>${l.flocons}</td></tr>
    <tr><th>🍯 Miel / sirop d'érable</th><td>${l.miel}</td></tr>
    <tr><th>🫒 Huile de coco</th><td>${l.huile}</td></tr>
    <tr><th>🌰 Noix mélangées</th><td>${l.noix}</td></tr>
    <tr><th>🌱 Graines</th><td>${l.graines}</td></tr>
    <tr><th>🍇 Fruits secs</th><td>selon goût</td></tr>`);
}

function htmlTableauHoumousColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥜 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🫒 Tahini</th><td>${l.tahini}</td></tr>
    <tr><th>🍋 Citron (jus)</th><td>${l.citron}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huile}</td></tr>
    <tr><th>💧 Eau froide</th><td>3–4 c.à.s</td></tr>`);
}

function htmlTableauRisottoColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍚 Riz arborio</th><td>${l.riz}</td></tr>
    <tr><th>🍲 Bouillon chaud</th><td>${l.bouillon}</td></tr>
    <tr><th>🍷 Vin blanc</th><td>${l.vin}</td></tr>
    <tr><th>🧀 Parmesan râpé</th><td>${l.parmesan}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🧅 Oignon</th><td>1</td></tr>`);
}

function htmlTableauFondantColonnes(l) {
  return col(`
    <tr><th>🍫 Fondants</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🍫 Chocolat noir</th><td>${l.chocolat}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>`);
}

function htmlTableauMadeleineColonnes(l) {
  return col(`
    <tr><th>🫐 Madeleines</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurre}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🧪 Levure chimique</th><td>${l.levure}</td></tr>
    <tr><th>🍯 Miel</th><td>1 c.à.s / 12</td></tr>
    <tr><th>🍋 Zeste citron</th><td>1 / 12</td></tr>`);
}

function htmlTableauCurryLegumesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥥 Lait de coco</th><td>${l.coco}</td></tr>
    <tr><th>🥜 Pois chiches</th><td>${l.poischiches}</td></tr>
    <tr><th>🍅 Tomates concassées</th><td>${l.tomates}</td></tr>
    <tr><th>🌿 Épinards</th><td>${l.epinards}</td></tr>
    <tr><th>🧅 Oignon</th><td>${l.oignon}</td></tr>
    <tr><th>🧄 Ail</th><td>${l.ail}</td></tr>
    <tr><th>🌿 Gingembre frais</th><td>${l.gingembre}</td></tr>
    <tr><th>🌶️ Curry en poudre</th><td>${l.curry}</td></tr>`);
}

function htmlTableauVelouteLegumesColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🥕 Carottes</th><td>${l.carottes}</td></tr>
    <tr><th>🎃 Courge butternut</th><td>${l.courge}</td></tr>
    <tr><th>🍲 Bouillon de légumes</th><td>${l.bouillon}</td></tr>
    <tr><th>🍦 Crème fraîche</th><td>${l.creme}</td></tr>
    <tr><th>🧅 Oignon</th><td>1</td></tr>
    <tr><th>🌿 Gingembre frais</th><td>2 cm</td></tr>`);
}

function htmlTableauTarteCitronColonnes(l) {
  return col(`
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:13px;padding:10px 14px 6px">🥧 Pâte sablée</th></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🧈 Beurre froid</th><td>${l.beurrePate}</td></tr>
    <tr><th>🍬 Sucre glace</th><td>${l.sucreGlace}</td></tr>
    <tr><th>🌰 Poudre d'amande</th><td>${l.poudreAmande}</td></tr>
    <tr><th>🥚 Œuf</th><td>${l.oeufPate}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:13px;padding:10px 14px 6px">🍋 Crème citron</th></tr>
    <tr><th>🍋 Citrons</th><td>${l.citrons}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufCreme}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreCreme}</td></tr>
    <tr><th>🧈 Beurre</th><td>${l.beurreCreme}</td></tr>
    <tr><th>🌾 Maïzena</th><td>${l.maizena}</td></tr>
    <tr><th colspan="2" style="color:var(--accent-pale,#ffb3cc);font-size:13px;padding:10px 14px 6px">🌨️ Meringue</th></tr>
    <tr><th>🥚 Blancs d'œufs</th><td>${l.blancs}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucreMeringue}</td></tr>`);
}

function htmlTableauQuinoaColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Quinoa</th><td>${l.quinoa}</td></tr>
    <tr><th>🍅 Tomates cerises</th><td>${l.tomates}</td></tr>
    <tr><th>🧀 Feta</th><td>${l.feta}</td></tr>
    <tr><th>🥒 Concombre</th><td>${l.concombre}</td></tr>
    <tr><th>🫑 Poivron rouge</th><td>${l.poivron}</td></tr>
    <tr><th>🫒 Huile d'olive</th><td>${l.huile}</td></tr>
    <tr><th>🍋 Citron</th><td>${l.citron}</td></tr>`);
}

function htmlTableauLasagneColonnes(l) {
  return col(`
    <tr><th>👥 Personnes</th><td><b>${l.nb}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>`);
}

function htmlTableauBriocheColonnes(l) {
  return col(`
    <tr><th>🍞 Brioches</th><td><b>${l.nb}</b></td></tr>
    <tr><th>⚖️ Poids total pâte</th><td><b style="color:var(--accent-soft,#ff8fb3)">${l.total}</b></td></tr>
    <tr><th>🌾 Farine</th><td>${l.farine}</td></tr>
    <tr><th>🥚 Œufs</th><td>${l.oeufs}</td></tr>
    <tr><th>🥛 Lait</th><td>${l.lait}</td></tr>
    <tr><th>🧈 Beurre froid</th><td>${l.beurre}</td></tr>
    <tr><th>🍬 Sucre</th><td>${l.sucre}</td></tr>
    <tr><th>🟨 Levure fraîche</th><td>${l.levure}</td></tr>
    <tr><th>🧂 Sel</th><td>${l.sel}</td></tr>
    <tr><th>🌿 Extrait de vanille</th><td>${l.vanille}</td></tr>`);
}

