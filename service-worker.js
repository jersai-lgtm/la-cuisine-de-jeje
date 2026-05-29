const CACHE_NAME = "cuisine-jeje-v215";
const FICHIERS = [
  "/la-cuisine-de-jeje/",
  "/la-cuisine-de-jeje/index.html",
  "/la-cuisine-de-jeje/style.css",
  "/la-cuisine-de-jeje/js/allergenes.js",
  "/la-cuisine-de-jeje/js/recettes.js",
  "/la-cuisine-de-jeje/js/tables.js",
  "/la-cuisine-de-jeje/js/app.js",
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
