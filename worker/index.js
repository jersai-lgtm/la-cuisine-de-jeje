// =============================================================================
// Proxy IA durci — La Cuisine de Jéjé (Cloudflare Worker)
// -----------------------------------------------------------------------------
// Rôle : relayer les requêtes de l'assistant vers l'API Anthropic SANS exposer
// la clé API, et SANS se faire abuser. Avant ce durcissement, n'importe qui
// pouvait POSTer ici et consommer le quota Anthropic avec des paramètres libres.
//
// Défenses appliquées :
//   1. CORS restreint aux origines de l'app (liste blanche).
//   2. Authentification : jeton d'identité Firebase OBLIGATOIRE et vérifié
//      cryptographiquement (signature RS256 via les clés publiques Google).
//   3. Quota par utilisateur (Cloudflare KV) : N requêtes / heure / uid.
//   4. Paramètres imposés côté serveur : model + max_tokens fixes, system et
//      messages bornés en taille → impossible de détourner le proxy.
//
// Déploiement : voir worker/README.md
//   - Secret  : ANTHROPIC_API_KEY
//   - Var     : FIREBASE_PROJECT_ID = "cuisine-jeje"
//   - KV bind : RATE_LIMIT (optionnel mais recommandé)
// =============================================================================

const ALLOWED_ORIGINS = [
  "https://jersai-lgtm.github.io", // GitHub Pages (origine de prod)
  "http://localhost:5599",         // preview locale
  "http://localhost:5600",         // preview du build (dist/)
  "http://localhost",              // XAMPP local
];

// Paramètres imposés (le client ne peut plus les choisir).
const FORCED_MODEL = "claude-sonnet-4-5";
const FORCED_MAX_TOKENS = 400;
const MAX_SYSTEM_CHARS = 4000;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 2000;

// Quota par utilisateur.
const RATE_LIMIT_PER_HOUR = 40;

// Import d'une recette depuis un lien (route /import).
const IMPORT_PAR_HEURE = 15;
const IMPORT_MAX_PAGE = 600_000;   // caractères de HTML lus au plus
const IMPORT_MAX_TEXTE = 14_000;   // texte envoyé à l'IA quand la page n'est pas balisée
const IMPORT_MAX_TOKENS = 2500;    // une recette complète, pas une phrase
const SYSTEME_IMPORT = [
  "Tu lis le texte d'une page web et tu en extrais LA recette de cuisine.",
  "Réponds UNIQUEMENT par un objet JSON, sans phrase autour et sans bloc de code.",
  'Schéma : {"nom":"","emoji":"🍽️","temps":"","portions":4,"cat":"","pays":"","niveau":"",',
  '"description":"","ingredients":[],"etapes":[]}',
  'cat vaut l\'une de : plats, entrees, soupes, salades, desserts, encas, aperitifs, brunch, healthy, pizzas, sauces, boulangerie.',
  'niveau vaut "⭐ Facile", "⭐⭐ Moyen" ou "⭐⭐⭐ Difficile".',
  'Chaque ingrédient s\'écrit "Nom : quantité" (ex. "Farine : 250 g").',
  "Chaque étape est une consigne, dans l'ordre, sans numéro ni puce.",
  "Garde la langue de la page. N'invente rien : ce qui manque reste vide.",
  'Si la page ne contient pas de recette, réponds {"erreur":"pas de recette"}.',
].join("\n");

const JWK_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    // Préflight CORS
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: { message: "Méthode non autorisée" } }, 405, cors);
    }
    // On n'accepte que les origines connues (et les appels same-origin sans Origin).
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json({ error: { message: "Origine non autorisée" } }, 403, cors);
    }

    // --- Routes PUSH publiques (pas de jeton : un visiteur non connecté peut
    //     s'abonner aux notifs) -------------------------------------------------
    const chemin = new URL(request.url).pathname;
    if (chemin === "/push/subscribe") {
      let b; try { b = await request.json(); } catch (e) { return json({ error: { message: "JSON invalide" } }, 400, cors); }
      const ep = b && b.subscription && b.subscription.endpoint;
      if (!ep) return json({ error: { message: "endpoint manquant" } }, 400, cors);
      if (!env.PUSH_SUBS) return json({ ok: false, raison: "non configuré" }, 200, cors);
      await env.PUSH_SUBS.put("sub:" + (await hashEndpoint(ep)),
        JSON.stringify({ endpoint: ep, listeNonVide: !!b.listeNonVide, ts: Date.now() }));
      return json({ ok: true }, 200, cors);
    }
    if (chemin === "/push/unsubscribe") {
      let b; try { b = await request.json(); } catch (e) { b = {}; }
      if (b && b.endpoint && env.PUSH_SUBS) await env.PUSH_SUBS.delete("sub:" + (await hashEndpoint(b.endpoint)));
      return json({ ok: true }, 200, cors);
    }
    if (chemin === "/push/pending") {
      let b; try { b = await request.json(); } catch (e) { b = {}; }
      let msg = { type: "daily" };
      if (b && b.endpoint && env.PUSH_SUBS) {
        const hk = "pending:" + (await hashEndpoint(b.endpoint));
        const v = await env.PUSH_SUBS.get(hk);
        if (v) { try { msg = JSON.parse(v); } catch (e) {} await env.PUSH_SUBS.delete(hk); }
      }
      return json(msg, 200, cors);
    }

    // --- 1. Authentification : jeton Firebase obligatoire --------------------
    const authz = request.headers.get("Authorization") || "";
    const token = authz.startsWith("Bearer ") ? authz.slice(7) : "";
    if (!token) {
      return json({ error: { message: "Authentification requise" } }, 401, cors);
    }
    let uid, claims;
    try {
      claims = await verifierJetonFirebase(token, env.FIREBASE_PROJECT_ID);
      uid = claims.sub;
    } catch (e) {
      return json({ error: { message: "Jeton invalide" } }, 401, cors);
    }

    // --- Route /notif : alerte Telegram « quelqu'un s'est connecté » ---------
    // Placée AVANT le quota/Anthropic : ne consomme pas le quota IA. Le nom vient
    // du jeton vérifié (non falsifiable). Dédupliqué (1×/12 h/utilisateur via KV).
    if (new URL(request.url).pathname === "/notif") {
      if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
        return json({ ok: false, raison: "non configuré" }, 200, cors);
      }
      // On n'alerte pas pour le·s compte·s propriétaire (inutile de se notifier
      // soi-même). Liste d'e-mails séparés par des virgules dans NOTIF_IGNORER.
      const ignorer = (env.NOTIF_IGNORER || "jerome.sainthot@gmail.com")
        .toLowerCase().split(",").map((s) => s.trim()).filter(Boolean);
      if (claims.email && ignorer.includes(claims.email.toLowerCase())) {
        return json({ ok: true, ignore: true }, 200, cors);
      }
      if (env.RATE_LIMIT) {
        const fen = Math.floor(Date.now() / 43_200_000); // tranche de 12 h
        const k = `notif:${uid}:${fen}`;
        if (await env.RATE_LIMIT.get(k)) return json({ ok: true, deja: true }, 200, cors);
        await env.RATE_LIMIT.put(k, "1", { expirationTtl: 46_800 }); // 13 h
      }
      let nouveau = false;
      try { const b = await request.json(); nouveau = !!(b && b.nouveau); } catch (e) {}
      const qui = claims.name || claims.email || "Quelqu'un";
      const texte = `🍳 La Cuisine de Jéjé\n👤 ${qui} ${nouveau ? "vient de CRÉER un compte 🆕" : "s'est connecté(e)"}`;
      // .trim() : enlève un éventuel retour-ligne dans le secret (selon le shell
      // utilisé pour `wrangler secret put`, ex. PowerShell ajoute un \n).
      const tok = (env.TELEGRAM_BOT_TOKEN || "").trim();
      const chat = (env.TELEGRAM_CHAT_ID || "").trim();
      try {
        await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chat, text: texte }),
        });
      } catch (e) {}
      return json({ ok: true }, 200, cors);
    }

    // --- Route /push/new : diffuse une notif (réservée au propriétaire) -------
    // Sert à annoncer une fournée de recettes, ou à TESTER (ex. {type:"daily"}).
    if (chemin === "/push/new") {
      const email = (claims.email || "").toLowerCase();
      const proprios = (env.NOTIF_IGNORER || "jerome.sainthot@gmail.com")
        .toLowerCase().split(",").map((s) => s.trim());
      if (!proprios.includes(email)) return json({ error: { message: "non autorisé" } }, 403, cors);
      let b; try { b = await request.json(); } catch (e) { b = {}; }
      const msg = { type: b.type || "new", title: b.title, body: b.body };
      const n = await diffuserPush(env, msg, () => true);
      return json({ ok: true, envoyes: n }, 200, cors);
    }

    // --- Route /import : lire une recette depuis un lien ---------------------
    // Le navigateur ne peut pas aller chercher une page d'un autre site (CORS) :
    // c'est le worker qui la récupère. Deux voies, dans cet ordre :
    //   1. le balisage schema.org/Recipe que publient la plupart des sites de
    //      cuisine — exact, gratuit, instantané ;
    //   2. sinon seulement, l'IA sur le texte de la page.
    if (chemin === "/import") {
      // Quota dédié : une importation coûte une page + éventuellement l'IA.
      if (env.RATE_LIMIT) {
        const fen = Math.floor(Date.now() / 3_600_000);
        const k = `imp:${uid}:${fen}`;
        const n = parseInt((await env.RATE_LIMIT.get(k)) || "0", 10);
        if (n >= IMPORT_PAR_HEURE) {
          return json({ route: "import", error: { message: "Quota d'imports atteint pour cette heure" } }, 429, cors);
        }
        await env.RATE_LIMIT.put(k, String(n + 1), { expirationTtl: 7200 });
      }

      let b; try { b = await request.json(); } catch (e) { b = {}; }
      let u;
      try { u = new URL(String((b && b.url) || "").trim()); } catch (e) {
        return json({ route: "import", error: { message: "Lien invalide" } }, 400, cors);
      }
      if (u.protocol !== "https:" && u.protocol !== "http:") {
        return json({ route: "import", error: { message: "Seuls les liens http(s) sont acceptés" } }, 400, cors);
      }
      // Le worker a le droit d'appeler n'importe quelle adresse : on refuse
      // explicitement tout ce qui n'est pas un site public.
      if (hoteNonPublic(u.hostname)) {
        return json({ route: "import", error: { message: "Ce lien ne pointe pas vers un site public" } }, 400, cors);
      }

      let html = "";
      try {
        const rep = await fetch(u.toString(), {
          redirect: "follow",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; CuisineDeJeje/1.0; +https://jersai-lgtm.github.io/la-cuisine-de-jeje/)",
            "Accept": "text/html,application/xhtml+xml",
            "Accept-Language": "fr,en;q=0.8",
          },
        });
        if (!rep.ok) {
          return json({ route: "import", error: { message: "Page injoignable (" + rep.status + ")" } }, 502, cors);
        }
        const type = (rep.headers.get("Content-Type") || "").toLowerCase();
        if (type && !/text\/html|xhtml|text\/plain/.test(type)) {
          return json({ route: "import", error: { message: "Ce lien n'est pas une page web" } }, 415, cors);
        }
        html = (await rep.text()).slice(0, IMPORT_MAX_PAGE);
      } catch (e) {
        return json({ route: "import", error: { message: "Impossible d'ouvrir ce lien" } }, 502, cors);
      }

      const balisee = recetteDepuisJsonLd(html);
      if (balisee) {
        return json({ route: "import", ok: true, source: "balisage", lien: u.toString(), recette: balisee }, 200, cors);
      }

      if (!env.ANTHROPIC_API_KEY) {
        return json({ route: "import", error: { message: "Cette page n'est pas balisée et l'IA n'est pas configurée" } }, 501, cors);
      }
      const texte = texteLisible(html).slice(0, IMPORT_MAX_TEXTE);
      if (texte.length < 200) {
        return json({ route: "import", error: { message: "Page trop pauvre pour y lire une recette" } }, 422, cors);
      }
      let brut = "";
      try {
        const up = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": env.ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: FORCED_MODEL,
            max_tokens: IMPORT_MAX_TOKENS,
            system: SYSTEME_IMPORT,
            messages: [{ role: "user", content: texte }],
          }),
        });
        const d = await up.json();
        brut = (d && d.content && d.content[0] && d.content[0].text) || "";
      } catch (e) {
        return json({ route: "import", error: { message: "Service IA indisponible" } }, 502, cors);
      }
      const lue = recetteDepuisTexteIA(brut);
      if (!lue) {
        return json({ route: "import", error: { message: "Aucune recette trouvée sur cette page" } }, 422, cors);
      }
      return json({ route: "import", ok: true, source: "ia", lien: u.toString(), recette: lue }, 200, cors);
    }

    // --- 2. Quota par utilisateur (KV) --------------------------------------
    if (env.RATE_LIMIT) {
      const fenetre = Math.floor(Date.now() / 3_600_000); // heure courante
      const cle = `rl:${uid}:${fenetre}`;
      const actuel = parseInt((await env.RATE_LIMIT.get(cle)) || "0", 10);
      if (actuel >= RATE_LIMIT_PER_HOUR) {
        return json({ error: { message: "Quota horaire atteint" } }, 429, cors);
      }
      // Incrémente avec expiration auto (2 h) pour ne pas accumuler de clés.
      await env.RATE_LIMIT.put(cle, String(actuel + 1), { expirationTtl: 7200 });
    }

    // --- 3. Validation / bridage de la charge utile -------------------------
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: { message: "Corps JSON invalide" } }, 400, cors);
    }

    const system = typeof body.system === "string" ? body.system.slice(0, MAX_SYSTEM_CHARS) : "";
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (messages.length === 0 || messages.length > MAX_MESSAGES) {
      return json({ error: { message: "Conversation invalide" } }, 400, cors);
    }
    const messagesPropres = [];
    for (const m of messages) {
      if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") {
        return json({ error: { message: "Message invalide" } }, 400, cors);
      }
      messagesPropres.push({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) });
    }

    // --- 4. Appel Anthropic avec paramètres IMPOSÉS -------------------------
    let upstream;
    try {
      upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: FORCED_MODEL,
          max_tokens: FORCED_MAX_TOKENS,
          system,
          messages: messagesPropres,
        }),
      });
    } catch (e) {
      return json({ error: { message: "Service IA indisponible" } }, 502, cors);
    }

    const data = await upstream.json();
    return json(data, upstream.status, cors);
  },

  // --- Cron : notifs planifiées (heure de Paris, gérée toute l'année) --------
  // Crons UTC déclarés dans wrangler.toml ; on ne diffuse qu'au bon créneau
  // Paris pour absorber le décalage été/hiver.
  async scheduled(event, env, ctx) {
    const t = partsParis(new Date(event.scheduledTime));
    // Recette du jour : 11h30 Paris (tous les jours)
    if (t.h === 11 && t.m === 30) {
      ctx.waitUntil(diffuserPush(env, { type: "daily" }, () => true));
    }
    // Rappel liste de courses : samedi 10h00 Paris (uniquement listes non vides)
    if (t.dow === 6 && t.h === 10 && t.m === 0) {
      ctx.waitUntil(diffuserPush(env, { type: "liste" }, (s) => !!s.listeNonVide));
    }
  },
};

// --- Helpers -----------------------------------------------------------------

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors },
  });
}

// Cache mémoire des clés publiques (par isolate). Re-fetch après expiration.
let _jwkCache = { keys: null, exp: 0 };

async function getClesPubliques() {
  if (_jwkCache.keys && Date.now() < _jwkCache.exp) return _jwkCache.keys;
  const res = await fetch(JWK_URL);
  const data = await res.json();
  const map = {};
  for (const k of data.keys || []) map[k.kid] = k;
  // Respecte le max-age renvoyé par Google (par défaut 1 h).
  const cc = res.headers.get("Cache-Control") || "";
  const m = cc.match(/max-age=(\d+)/);
  const ttl = m ? parseInt(m[1], 10) * 1000 : 3_600_000;
  _jwkCache = { keys: map, exp: Date.now() + ttl };
  return map;
}

// Vérifie un jeton d'identité Firebase (JWT RS256) et renvoie ses claims.
async function verifierJetonFirebase(token, projectId) {
  const [h, p, s] = token.split(".");
  if (!h || !p || !s) throw new Error("format");
  const header = JSON.parse(b64urlToString(h));
  if (header.alg !== "RS256" || !header.kid) throw new Error("alg");

  const cles = await getClesPubliques();
  const jwk = cles[header.kid];
  if (!jwk) throw new Error("kid");

  const key = await crypto.subtle.importKey(
    "jwk", jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false, ["verify"]
  );
  const ok = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5", key,
    b64urlToBytes(s),
    new TextEncoder().encode(`${h}.${p}`)
  );
  if (!ok) throw new Error("signature");

  const claims = JSON.parse(b64urlToString(p));
  const now = Math.floor(Date.now() / 1000);
  if (claims.exp <= now) throw new Error("expiré");
  if (claims.iat > now + 300) throw new Error("iat");
  if (claims.aud !== projectId) throw new Error("aud");
  if (claims.iss !== `https://securetoken.google.com/${projectId}`) throw new Error("iss");
  if (!claims.sub) throw new Error("sub");
  return claims;
}

function b64urlToBytes(s) {
  // Blindé : on ne garde QUE l'alphabet base64url (vire \n, espaces, \r où qu'ils soient).
  s = String(s).replace(/[^A-Za-z0-9_-]/g, "").replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function b64urlToString(s) {
  return new TextDecoder().decode(b64urlToBytes(s));
}

// ============================================================================
// 🔔 Helpers PUSH (Web Push « sans payload » : on n'a besoin que de signer le
// VAPID, pas de chiffrer de charge utile). Le SW va chercher quoi afficher via
// /push/pending.
// ============================================================================

function bytesToB64url(bytes) {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hashEndpoint(ep) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ep));
  return bytesToB64url(new Uint8Array(d)).slice(0, 24);
}

async function importerCleVapid(privB64, pubB64) {
  const d = b64urlToBytes(privB64);
  const pub = b64urlToBytes(pubB64); // 65 octets : 0x04 | X(32) | Y(32)
  const jwk = {
    kty: "EC", crv: "P-256",
    d: bytesToB64url(d),
    x: bytesToB64url(pub.slice(1, 33)),
    y: bytesToB64url(pub.slice(33, 65)),
    ext: true,
  };
  return crypto.subtle.importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
}

async function vapidHeaders(endpoint, env) {
  const aud = new URL(endpoint).origin;
  const now = Math.floor(Date.now() / 1000);
  // .trim() : selon le shell utilisé pour `wrangler secret put` (ex. PowerShell),
  // un retour-ligne peut se glisser dans le secret → atob() planterait dessus.
  const pub = (env.VAPID_PUBLIC_KEY || "").trim();
  const priv = (env.VAPID_PRIVATE_KEY || "").trim();
  const sujet = (env.VAPID_SUBJECT || "mailto:jerome.sainthot@gmail.com").trim();
  const enc = (o) => bytesToB64url(new TextEncoder().encode(JSON.stringify(o)));
  const signingInput = enc({ typ: "JWT", alg: "ES256" }) + "." +
    enc({ aud, exp: now + 12 * 3600, sub: sujet });
  const key = await importerCleVapid(priv, pub);
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, new TextEncoder().encode(signingInput));
  const jwt = signingInput + "." + bytesToB64url(new Uint8Array(sig));
  return { "Authorization": "vapid t=" + jwt + ", k=" + pub, "TTL": "43200" };
}

async function envoyerUnPush(endpoint, env) {
  const headers = await vapidHeaders(endpoint, env);
  return fetch(endpoint, { method: "POST", headers });
}

async function listerSubs(env) {
  const out = [];
  let cursor;
  do {
    const r = await env.PUSH_SUBS.list({ prefix: "sub:", cursor });
    for (const k of r.keys) {
      const v = await env.PUSH_SUBS.get(k.name);
      if (v) { try { out.push(JSON.parse(v)); } catch (e) {} }
    }
    cursor = r.cursor;
    if (r.list_complete) break;
  } while (cursor);
  return out;
}

// Dépose le message à afficher pour chaque abonné ciblé puis envoie le tickle.
// Nettoie les abonnements morts (404/410). Renvoie le nombre d'envois.
async function diffuserPush(env, msg, filtre) {
  if (!env.PUSH_SUBS || !env.VAPID_PRIVATE_KEY) {
    console.log("[push] STOP — PUSH_SUBS=" + !!env.PUSH_SUBS + " VAPID_PRIVATE_KEY=" + !!env.VAPID_PRIVATE_KEY);
    return 0;
  }
  const subs = await listerSubs(env);
  let n = 0;
  for (const s of subs) {
    if (filtre && !filtre(s)) continue;
    const h = await hashEndpoint(s.endpoint);
    await env.PUSH_SUBS.put("pending:" + h, JSON.stringify(msg), { expirationTtl: 7200 });
    try {
      const r = await envoyerUnPush(s.endpoint, env);
      if (r.status === 404 || r.status === 410) await env.PUSH_SUBS.delete("sub:" + h); // abonnement mort → purge
      else n++;
    } catch (e) { /* échec ponctuel ignoré */ }
  }
  console.log("[push] type=" + (msg && msg.type) + " abonnés=" + subs.length + " envoyés=" + n);
  return n;
}

// Heure de Paris (gère l'été/hiver via Intl) → { h, m, dow(0=dim) }.
function partsParis(d) {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Paris", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  });
  const p = {};
  for (const part of f.formatToParts(d)) p[part.type] = part.value;
  let h = parseInt(p.hour, 10);
  if (h === 24) h = 0;
  return { h, m: parseInt(p.minute, 10), dow: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday) };
}

// =============================================================================
// Import d'une recette depuis un lien (route /import)
// =============================================================================

// Refuse tout ce qui n'est pas un site public : le worker, lui, a le droit
// d'appeler n'importe quelle adresse, y compris des machines internes.
function hoteNonPublic(h) {
  const n = String(h || "").toLowerCase().replace(/^\[|\]$/g, "");
  if (!n || n.indexOf(".") === -1) return true;            // "localhost", "intranet"
  if (/\.(local|internal|localdomain|home|lan)$/.test(n)) return true;
  if (n === "localhost" || n.endsWith(".localhost")) return true;
  if (/^(0|10|127)\./.test(n)) return true;
  if (/^169\.254\./.test(n)) return true;
  if (/^192\.168\./.test(n)) return true;
  if (/^172\.(1[6-9]|2[0-9]|3[01])\./.test(n)) return true;
  if (n === "::1") return true;
  if (n.indexOf(":") !== -1 && /^f[cd]/.test(n)) return true;
  return false;
}

// Texte lisible d'une page : on jette ce qui n'est pas du contenu.
function texteLisible(html) {
  return String(html || "")
    .replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<\/(p|div|li|h[1-6]|tr|br)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">")
    .replace(/[ \t ]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

// PT1H30M devient « 1 h 30 » ; PT45M devient « 45 min ».
function dureeISO(d) {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?/.exec(String(d || "").trim().toUpperCase());
  if (!m) return "";
  const j = parseInt(m[1] || 0, 10), h = parseInt(m[2] || 0, 10), mn = parseInt(m[3] || 0, 10);
  const heures = j * 24 + h;
  if (!heures && !mn) return "";
  if (!heures) return mn + " min";
  return heures + " h" + (mn ? " " + String(mn).padStart(2, "0") : "");
}

function texteDe(v) {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.map(texteDe).filter(Boolean).join(", ");
  if (v && typeof v === "object") return texteDe(v.name || v.text || v.url || "");
  return "";
}

// Les étapes arrivent sous toutes les formes : chaîne unique, tableau de
// chaînes, HowToStep, ou HowToSection contenant des HowToStep.
function etapesDe(v) {
  const out = [];
  const pousser = (t) => {
    String(t || "").split(/\r?\n+/).forEach((ligne) => {
      // « Étape 2 : », « 3. », « 4) » sautent ; un numéro nu (« 2 minutes plus
      // tard… ») reste, sinon on mangerait le début de la consigne.
      const s = ligne.trim()
        .replace(/^(?:[eé]tape|step)\s*n?[°o]?\s*\d{1,2}\s*[:.)\-]?\s*/i, "")
        .replace(/^\d{1,2}\s*[.):\-]\s+/, "")
        .trim();
      if (s.length > 2) out.push(s);
    });
  };
  const visiter = (x) => {
    if (!x) return;
    if (typeof x === "string") return pousser(x);
    if (Array.isArray(x)) return x.forEach(visiter);
    if (typeof x === "object") {
      if (x.itemListElement) return visiter(x.itemListElement);
      return pousser(x.text || x.name || "");
    }
  };
  visiter(v);
  return out;
}

// Lit les noeuds schema.org/Recipe des blocs <script type="application/ld+json">.
// Une page en annonce souvent PLUSIEURS (la recette lue, plus le carrousel
// « à voir aussi ») : prendre la première tombe à côté. On les ramasse toutes
// et on garde celle qui porte le titre de la page.
function recetteDepuisJsonLd(html) {
  const blocs = String(html || "").match(/<script[^>]+application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || [];
  const candidats = [];
  for (const bloc of blocs) {
    const contenu = bloc.replace(/^[\s\S]*?>/, "").replace(/<\/script>\s*$/i, "").trim();
    let data;
    try { data = JSON.parse(contenu); } catch (e) { continue; }
    collecterRecettes(data, candidats, 0);
  }
  if (!candidats.length) return null;
  const titre = normaliserTitre(titrePage(html));
  candidats.sort((a, b) => noteCandidat(b, titre) - noteCandidat(a, titre));
  for (const c of candidats) {
    const r = formerRecette({
      nom: texteDe(c.name),
      temps: dureeISO(c.totalTime) || dureeISO(c.cookTime) || dureeISO(c.prepTime),
      portions: parseInt(texteDe(c.recipeYield), 10) || 4,
      cat: categorieDepuis(texteDe(c.recipeCategory)),
      pays: texteDe(c.recipeCuisine),
      description: texteDe(c.description),
      image: premiereImage(c.image),
      ingredients: (Array.isArray(c.recipeIngredient) ? c.recipeIngredient : [])
        .map(texteDe).filter(Boolean),
      etapes: etapesDe(c.recipeInstructions),
    });
    if (r) return r;
  }
  return null;
}

function collecterRecettes(n, out, profondeur) {
  const p = profondeur || 0;
  if (!n || p > 6 || out.length > 30) return;
  if (Array.isArray(n)) { n.forEach((x) => collecterRecettes(x, out, p + 1)); return; }
  if (typeof n !== "object") return;
  const type = n["@type"];
  const estRecette = Array.isArray(type) ? type.some((t) => String(t) === "Recipe") : String(type) === "Recipe";
  if (estRecette && (n.recipeIngredient || n.recipeInstructions)) out.push(n);
  if (n["@graph"]) collecterRecettes(n["@graph"], out, p + 1);
  if (Array.isArray(n.itemListElement)) collecterRecettes(n.itemListElement, out, p + 1);
  if (n.item) collecterRecettes(n.item, out, p + 1);
  if (n.mainEntity) collecterRecettes(n.mainEntity, out, p + 1);
}

function titrePage(html) {
  const og = /<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)/i.exec(html || "");
  if (og) return og[1];
  const t = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html || "");
  return t ? t[1] : "";
}

function normaliserTitre(s) {
  return String(s || "").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();
}

// Le titre de la page tranche ; à défaut, la recette la mieux fournie gagne.
function noteCandidat(c, titre) {
  const nom = normaliserTitre(texteDe(c.name));
  let note = Math.min(20, Array.isArray(c.recipeIngredient) ? c.recipeIngredient.length : 0);
  if (nom && titre && (titre.indexOf(nom) !== -1 || nom.indexOf(titre) !== -1)) note += 100;
  if (c.mainEntityOfPage) note += 30;
  return note;
}

function premiereImage(v) {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return premiereImage(v[0]);
  if (typeof v === "object") return premiereImage(v.url || v.contentUrl || "");
  return "";
}

const CATEGORIES_IMPORT = ["plats", "entrees", "soupes", "salades", "desserts", "encas",
  "aperitifs", "brunch", "healthy", "pizzas", "sauces", "boulangerie"];

// Le site dit « Dessert », « Plat principal », « Apéritif »... : on retombe sur
// nos catégories, et sur « plats » quand rien ne correspond.
function categorieDepuis(txt) {
  const t = String(txt || "").toLowerCase();
  if (/dessert|gateau|gâteau|patiss|sucre|glace/.test(t)) return "desserts";
  if (/entr[eé]e|hors.d.oeuvre/.test(t)) return "entrees";
  if (/soupe|potage|velout/.test(t)) return "soupes";
  if (/salade/.test(t)) return "salades";
  if (/ap[eé]ritif|amuse|tapas/.test(t)) return "aperitifs";
  if (/pizza/.test(t)) return "pizzas";
  if (/sauce|condiment/.test(t)) return "sauces";
  if (/pain|brioche|viennois|boulang/.test(t)) return "boulangerie";
  if (/brunch|petit.d[eé]j|breakfast/.test(t)) return "brunch";
  if (/snack|en.cas|goûter|gouter/.test(t)) return "encas";
  return "plats";
}

// Borne et nettoie ce qui sortira du worker, quelle que soit la voie d'entrée.
function formerRecette(o) {
  const chaine = (v, max) => String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, max);
  const nom = chaine(o.nom, 80);
  const ingredients = (o.ingredients || []).map((s) => chaine(s, 160)).filter(Boolean).slice(0, 60);
  const etapes = (o.etapes || []).map((s) => chaine(s, 600)).filter(Boolean).slice(0, 40);
  if (!nom || !ingredients.length || !etapes.length) return null;
  const cat = CATEGORIES_IMPORT.includes(o.cat) ? o.cat : categorieDepuis(o.cat);
  const niveaux = ["⭐ Facile", "⭐⭐ Moyen", "⭐⭐⭐ Difficile"];
  return {
    nom,
    emoji: chaine(o.emoji, 4) || "🍽️",
    temps: chaine(o.temps, 20),
    portions: Math.min(24, Math.max(1, parseInt(o.portions, 10) || 4)),
    cat,
    pays: chaine(o.pays, 30).toLowerCase(),
    niveau: niveaux.includes(o.niveau) ? o.niveau : "",
    description: chaine(o.description, 300),
    image: /^https?:\/\//.test(String(o.image || "")) ? chaine(o.image, 400) : "",
    ingredients,
    etapes,
  };
}

// La réponse de l'IA doit être un objet JSON ; on tolère qu'elle soit entourée
// de texte, mais pas qu'elle raconte autre chose qu'une recette.
function recetteDepuisTexteIA(txt) {
  const s = String(txt || "");
  const d = s.indexOf("{"), f = s.lastIndexOf("}");
  if (d === -1 || f <= d) return null;
  let o;
  try { o = JSON.parse(s.slice(d, f + 1)); } catch (e) { return null; }
  if (!o || o.erreur) return null;
  return formerRecette({
    nom: o.nom, emoji: o.emoji, temps: o.temps, portions: o.portions,
    cat: o.cat, pays: o.pays, niveau: o.niveau, description: o.description,
    ingredients: Array.isArray(o.ingredients) ? o.ingredients : [],
    etapes: Array.isArray(o.etapes) ? o.etapes : [],
  });
}
