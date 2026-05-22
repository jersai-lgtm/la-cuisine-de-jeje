const CACHE_NAME = "cuisine-jeje-v10";
const FICHIERS = [
  "/la-cuisine-de-jeje/",
  "/la-cuisine-de-jeje/index.html",
  "/la-cuisine-de-jeje/style.css",
  "/la-cuisine-de-jeje/script.js",
  "/la-cuisine-de-jeje/manifest.json",
  "/la-cuisine-de-jeje/images/fond.jpg",
  "/la-cuisine-de-jeje/images/pizza.jpg",
  "/la-cuisine-de-jeje/images/crepes.jpg",
  "/la-cuisine-de-jeje/images/gaufres.jpg",
  "/la-cuisine-de-jeje/images/brioche.jpg",
  "/la-cuisine-de-jeje/images/lasagne.jpg",
  "/la-cuisine-de-jeje/images/cookies.jpg",
  "/la-cuisine-de-jeje/images/flan.jpg",
  "/la-cuisine-de-jeje/images/clafoutis.jpg",
  "/la-cuisine-de-jeje/images/icon-192.png",
  "/la-cuisine-de-jeje/images/icon-512.png"
];

// Installation : mise en cache de tous les fichiers
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FICHIERS))
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
self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});
