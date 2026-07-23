const CACHE_NAME = "cuisine-jeje-v4.5.4";
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

// =============================================================================
// 🔔 Notifications push
// -----------------------------------------------------------------------------
// Le serveur (Worker) n'envoie qu'un « tickle » sans données. Au réveil, le SW
// demande au Worker le type de notif en attente (/push/pending), puis :
//   • daily → calcule la recette du jour à partir de recettes-index.json
//   • liste → rappel liste de courses
//   • new   → annonce d'une fournée de recettes (titre/texte fournis)
// =============================================================================
const PUSH_WORKER = "https://la-cuisine-de-jeje.jerome-sainthot.workers.dev";
const PUSH_SITE = "https://jersai-lgtm.github.io/la-cuisine-de-jeje";

function pushSaisonDuMois() {
  const m = new Date().getMonth() + 1;
  if (m >= 3 && m <= 5) return "printemps";
  if (m >= 6 && m <= 8) return "ete";
  if (m >= 9 && m <= 11) return "automne";
  return "hiver";
}

// 🎄 Plat de fêtes (Noël) détecté sur le nom — même logique que estPlatFetes côté app.
function pushEstFetes(r) {
  const t = (r.n || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  return /\b(noel|reveillon|buche|chapon|foie ?gras|huitres?|dinde)\b/.test(t);
}
function pushRecetteDuJour(idx) {
  if (!idx || !idx.length) return null;
  const s = pushSaisonDuMois();
  const fetes = new Date().getMonth() === 11; // décembre uniquement
  // Au goût de saison + jamais de plat de fêtes hors décembre (bûche, dinde…).
  let pool = idx.filter((r) => (!r.s || !r.s.length || r.s.indexOf(s) > -1) && (fetes || !pushEstFetes(r)));
  if (!pool.length) pool = idx.filter((r) => fetes || !pushEstFetes(r));
  const liste = pool.length ? pool : idx;
  const d = new Date();
  const j = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  // Tirage INDÉPENDANT du nombre de recettes (stable quand le catalogue grandit) :
  // score hash(date + clé), on garde la plus haute — même algo que recette_du_jour.js.
  const _h = (str) => { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; };
  let best = liste[0], bestH = -1;
  for (const r of liste) { const hh = _h(j + ":" + r.k); if (hh > bestH) { bestH = hh; best = r; } }
  return best;
}

async function gererPush() {
  let msg = { type: "daily" };
  try {
    const sub = await self.registration.pushManager.getSubscription();
    if (sub) {
      const r = await fetch(PUSH_WORKER + "/push/pending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ endpoint: sub.endpoint }),
      });
      if (r.ok) msg = await r.json();
    }
  } catch (e) { /* repli sur daily */ }

  let title = "La Cuisine de Jéjé", body = "Une idée recette t'attend 🍽️";
  let url = PUSH_SITE + "/", image;
  const icon = PUSH_SITE + "/icon-192.png";

  if (!msg || msg.type === "daily") {
    try {
      const idx = await (await fetch(PUSH_SITE + "/recettes-index.json", { cache: "no-store" })).json();
      const r = pushRecetteDuJour(idx);
      if (r) {
        title = "🗓️ La recette du jour";
        body = r.e + " " + r.n;
        url = PUSH_SITE + "/?recette=" + encodeURIComponent(r.k);
        image = PUSH_SITE + "/images/" + (r.k.charAt(0) || "_").toLowerCase() + "/" + r.k + ".webp";
      }
    } catch (e) { /* notif générique */ }
  } else if (msg.type === "liste") {
    title = "🛒 Tes courses du week-end";
    body = "Pense à ta liste de courses 😉";
  } else if (msg.type === "new") {
    title = msg.title || "🆕 Nouvelles recettes";
    body = msg.body || "De nouvelles recettes viennent d'arriver !";
  }

  await self.registration.showNotification(title, {
    body, icon, badge: icon, image,
    data: { url }, tag: (msg && msg.type) || "daily", renotify: true,
  });
}

self.addEventListener("push", (e) => { e.waitUntil(gererPush()); });

// Android/Chrome (FCM) peut RENOUVELER l'abonnement push à tout moment. Sans ce
// handler, l'ancien abonnement meurt et les notifs s'arrêtent — l'utilisateur croit
// devoir « réactiver ». Ici on se réabonne immédiatement, même app fermée, et on
// prévient le Worker. (Complète la réparation côté app dans push.js/rafraichirFlag.)
self.addEventListener("pushsubscriptionchange", (e) => {
  e.waitUntil((async () => {
    try {
      const key = "BOz2O8gI5x3anhHIzNduF6G-sYzmo3JSIRfdtUm37lnuXkL2L_GPoqRqILLCzc7VGKkQr12I7rI7zl1M0e3mbwg";
      const pad = "=".repeat((4 - (key.length % 4)) % 4);
      const raw = atob((key + pad).replace(/-/g, "+").replace(/_/g, "/"));
      const arr = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
      const sub = await self.registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: arr });
      await fetch(PUSH_WORKER + "/push/subscribe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: sub.toJSON ? sub.toJSON() : sub }),
      });
    } catch (err) { /* best effort */ }
  })());
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || (PUSH_SITE + "/");
  e.waitUntil((async () => {
    const cs = await clients.matchAll({ type: "window", includeUncontrolled: true });
    // 1) Un onglet de l'appli est déjà ouvert → on le met au premier plan et on
    //    lui DEMANDE d'ouvrir la recette (SPA : un simple navigate ne recharge pas).
    for (const c of cs) {
      if (c.url && c.url.indexOf(PUSH_SITE) === 0) {
        try { c.postMessage({ type: "ouvrir-recette", url: url }); } catch (e) {}
        if ("focus" in c) return c.focus();
        return;
      }
    }
    // 2) Aucun onglet ouvert → nouvelle fenêtre sur ?recette= (l'appli lira le param au chargement).
    return clients.openWindow(url);
  })());
});
