const CACHE_NAME = "cuisine-jeje-v1.3.70";
const FICHIERS = [
  "/la-cuisine-de-jeje/",
  "/la-cuisine-de-jeje/index.html",
  "/la-cuisine-de-jeje/style.css",
  "/la-cuisine-de-jeje/js/allergenes.js",
  "/la-cuisine-de-jeje/js/recettes.js",
  "/la-cuisine-de-jeje/js/recettes_plats.js",
  "/la-cuisine-de-jeje/js/recettes_desserts.js",
  "/la-cuisine-de-jeje/js/recettes_soupes.js",
  "/la-cuisine-de-jeje/js/recettes_brunch.js",
  "/la-cuisine-de-jeje/js/recettes_encas.js",
  "/la-cuisine-de-jeje/js/recettes_aperitifs.js",
  "/la-cuisine-de-jeje/js/recettes_healthy.js",
  "/la-cuisine-de-jeje/js/recettes_entrees.js",
  "/la-cuisine-de-jeje/js/recettes_sauces.js",
  "/la-cuisine-de-jeje/js/recettes_boulangerie.js",
  "/la-cuisine-de-jeje/js/recettes_salades.js",
  "/la-cuisine-de-jeje/js/recettes_pizzas.js",
  "/la-cuisine-de-jeje/js/ingredients_prix.js",
  "/la-cuisine-de-jeje/js/tables.js",
  "/la-cuisine-de-jeje/js/drapeaux.js",
  "/la-cuisine-de-jeje/js/lunchbox.js",
  "/la-cuisine-de-jeje/js/community.js",
  "/la-cuisine-de-jeje/js/whatsnew.js",
  "/la-cuisine-de-jeje/js/amelioration.js",
  "/la-cuisine-de-jeje/js/app.js",
  "/la-cuisine-de-jeje/js/emojis.js",
  "/la-cuisine-de-jeje/auth.js",
  "/la-cuisine-de-jeje/manifest.json",
  "/la-cuisine-de-jeje/images/icon-192.webp",
  "/la-cuisine-de-jeje/images/icon-512.webp",
  "/la-cuisine-de-jeje/images/fond.webp",
  "/la-cuisine-de-jeje/images/pizza.webp",
  "/la-cuisine-de-jeje/images/crepes.webp",
  "/la-cuisine-de-jeje/images/gaufres.webp",
  "/la-cuisine-de-jeje/images/brioche.webp",
  "/la-cuisine-de-jeje/images/patelasagne.webp",
  "/la-cuisine-de-jeje/images/cookies.webp",
  "/la-cuisine-de-jeje/images/flan.webp",
  "/la-cuisine-de-jeje/images/clafoutis.webp",
  "/la-cuisine-de-jeje/images/tiramisu.webp",
  "/la-cuisine-de-jeje/images/tarteaupommes.webp",
  "/la-cuisine-de-jeje/images/tartecitron.webp",
  "/la-cuisine-de-jeje/images/goumeau.webp",
  "/la-cuisine-de-jeje/images/pancakes.webp",
  "/la-cuisine-de-jeje/images/muffins.webp",
  "/la-cuisine-de-jeje/images/croquemonsieur.webp",
  "/la-cuisine-de-jeje/images/madeleine.webp",
  "/la-cuisine-de-jeje/images/bananabread.webp",
  "/la-cuisine-de-jeje/images/granola.webp",
  "/la-cuisine-de-jeje/images/smoothiebowl.webp",
  "/la-cuisine-de-jeje/images/saladequinoa.webp",
  "/la-cuisine-de-jeje/images/yaourt.webp",
  "/la-cuisine-de-jeje/images/veloutelegumes.webp",
  "/la-cuisine-de-jeje/images/houmous.webp",
  "/la-cuisine-de-jeje/images/boeufbourguignon.webp",
  "/la-cuisine-de-jeje/images/risotto.webp",
  "/la-cuisine-de-jeje/images/gratindauphinois.webp",
  "/la-cuisine-de-jeje/images/cremebrulee.webp",
  "/la-cuisine-de-jeje/images/mousseauchocolat.webp",
  "/la-cuisine-de-jeje/images/ileflottante.webp",
  "/la-cuisine-de-jeje/images/fondantchocolat.webp",
  "/la-cuisine-de-jeje/images/painbaguette.webp",
  "/la-cuisine-de-jeje/images/paindemie.webp",
  "/la-cuisine-de-jeje/images/patefeuilletee.webp",
  "/la-cuisine-de-jeje/images/patebrisee.webp",
  "/la-cuisine-de-jeje/images/patesablee.webp",
  "/la-cuisine-de-jeje/images/saladeniçoise.webp",
  "/la-cuisine-de-jeje/images/saladecesar.webp",
  "/la-cuisine-de-jeje/images/saladegreque.webp",
  "/la-cuisine-de-jeje/images/saladepatasthon.webp",
  "/la-cuisine-de-jeje/images/saladerizmediterranee.webp",
  "/la-cuisine-de-jeje/images/tabulemaison.webp",
  "/la-cuisine-de-jeje/images/saladelentilles.webp",
  "/la-cuisine-de-jeje/images/saladeavocatcrevettes.webp",
"/la-cuisine-de-jeje/images/tapenade.webp",
  "/la-cuisine-de-jeje/images/tzatziki.webp",
  "/la-cuisine-de-jeje/images/gougeres.webp",
  "/la-cuisine-de-jeje/images/blinissaumon.webp",
  "/la-cuisine-de-jeje/images/cakeolivesjambon.webp",
  "/la-cuisine-de-jeje/images/cakechorizofeta.webp",
  "/la-cuisine-de-jeje/images/feuilletessaucisse.webp",
  "/la-cuisine-de-jeje/images/palmierspesto.webp",
  "/la-cuisine-de-jeje/images/oeufsmimosa.webp",
  "/la-cuisine-de-jeje/images/brochettecaprese.webp",
  "/la-cuisine-de-jeje/images/nachosgratines.webp",
  "/la-cuisine-de-jeje/images/accrasmorue.webp",
  "/la-cuisine-de-jeje/images/boulettesfetaepinard.webp",
  "/la-cuisine-de-jeje/images/samoussaslegumes.webp",
  "/la-cuisine-de-jeje/images/grissiniparme.webp",
  "/la-cuisine-de-jeje/images/dipfetapoivron.webp",
  "/la-cuisine-de-jeje/images/rillettesthon.webp",
  "/la-cuisine-de-jeje/images/crackersgraines.webp",
  "/la-cuisine-de-jeje/images/verrineavocatcrevette.webp",
  "/la-cuisine-de-jeje/images/tortillaespagnola.webp",
  "/la-cuisine-de-jeje/images/croquetasjamon.webp",
  "/la-cuisine-de-jeje/images/patatasbravas.webp",
"/la-cuisine-de-jeje/images/mayonnaise.webp",
  "/la-cuisine-de-jeje/images/ketchup.webp",
  "/la-cuisine-de-jeje/images/saucebarbecue.webp",
  "/la-cuisine-de-jeje/images/harissa.webp",
  "/la-cuisine-de-jeje/images/saucetomate.webp",
  "/la-cuisine-de-jeje/images/vinaigrette.webp",
  "/la-cuisine-de-jeje/images/bechamel.webp",
  "/la-cuisine-de-jeje/images/pestomaison.webp",
  "/la-cuisine-de-jeje/images/aioli.webp",
  "/la-cuisine-de-jeje/images/saucecesar.webp",
  "/la-cuisine-de-jeje/images/chimichurri.webp",
  "/la-cuisine-de-jeje/images/saucecurrycoco.webp",
  "/la-cuisine-de-jeje/images/teriyaki.webp",
  "/la-cuisine-de-jeje/images/sauceblanche.webp",
  "/la-cuisine-de-jeje/images/saucesamourai.webp",
  "/la-cuisine-de-jeje/images/saucetartare.webp",
  "/la-cuisine-de-jeje/images/saucehollandaise.webp",
  "/la-cuisine-de-jeje/images/saucesoja.webp",
  "/la-cuisine-de-jeje/images/saucecocktail.webp",
  "/la-cuisine-de-jeje/images/sauceaigredouce.webp",
  "/la-cuisine-de-jeje/images/saucemoutardemiel.webp",
  "/la-cuisine-de-jeje/images/saucepoivre.webp",
  "/la-cuisine-de-jeje/images/sauceburger.webp",
  "/la-cuisine-de-jeje/images/saucechampignon.webp",
"/la-cuisine-de-jeje/images/oeufmayo.webp",
  "/la-cuisine-de-jeje/images/melonjambon.webp",
  "/la-cuisine-de-jeje/images/feuilletechevremiel.webp",
  "/la-cuisine-de-jeje/images/escargots.webp",
  "/la-cuisine-de-jeje/images/oeufsmeurette.webp",
  "/la-cuisine-de-jeje/images/coleslaw.webp",
  "/la-cuisine-de-jeje/images/saladewaldorf.webp",
  "/la-cuisine-de-jeje/images/saladebetteravechevre.webp",
  "/la-cuisine-de-jeje/images/saladefiguejambon.webp",
  "/la-cuisine-de-jeje/images/saladeroquetteparmesan.webp",
  "/la-cuisine-de-jeje/images/pizzamarinara.webp",
  "/la-cuisine-de-jeje/images/pizzanapolitaine.webp",
  "/la-cuisine-de-jeje/images/pizzaburrata.webp",
  "/la-cuisine-de-jeje/images/pizzamortadelle.webp",
  "/la-cuisine-de-jeje/images/fougasse.webp",
  "/la-cuisine-de-jeje/images/painauxraisins.webp",
  "/la-cuisine-de-jeje/images/chaussonpommes.webp",
  "/la-cuisine-de-jeje/images/ciabatta.webp",
  "/la-cuisine-de-jeje/images/bagelsaumon.webp",
  "/la-cuisine-de-jeje/images/clubsandwich.webp",
  "/la-cuisine-de-jeje/images/paninimozza.webp",
  "/la-cuisine-de-jeje/images/nuggetspoulet.webp",
  "/la-cuisine-de-jeje/images/avocadotoast.webp",
  "/la-cuisine-de-jeje/images/chiapudding.webp",
  "/la-cuisine-de-jeje/images/wrapveggie.webp",
];

// Installation : mise en cache de tous les fichiers
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // On cache les fichiers un par un pour ne pas bloquer si une image manque
      return Promise.allSettled(
        FICHIERS.map(f => cache.add(f).catch(() => console.log("Cache skip:", f)))
      );
    })
  );
  self.skipWaiting();
});

// Activation : suppression des anciens caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Permet à la page de demander au SW d'activer immédiatement la nouvelle version
self.addEventListener("message", e => {
  if (e.data && e.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

// Fetch : réseau en priorité, cache en fallback
// On ne met en cache QUE les GET (l'API Cache rejette les POST/PUT/DELETE).
// On laisse passer sans toucher : requêtes externes (Firestore, Anthropic, etc.)
self.addEventListener("fetch", e => {
  // Ignorer tout ce qui n'est pas GET (POST/PUT/DELETE vers Firestore, API Claude, etc.)
  if (e.request.method !== "GET") return;

  // Ignorer les requêtes vers des origines externes (Firestore, Google, Anthropic, etc.)
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Ne pas cacher les réponses d'erreur ou opaques
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
