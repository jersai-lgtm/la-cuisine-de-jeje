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
      const cleSub = "sub:" + (await hashEndpoint(ep));
      await env.PUSH_SUBS.put(cleSub, JSON.stringify({ endpoint: ep, listeNonVide: !!b.listeNonVide, ts: Date.now() }));
      console.log("[push] abonnement stocké clé=" + cleSub + " endpoint=" + ep.slice(0, 50));
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
  s = s.replace(/-/g, "+").replace(/_/g, "/");
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
  console.log("[push] diffuser type=" + (msg && msg.type) + " — abonnés trouvés=" + subs.length);
  let n = 0;
  for (const s of subs) {
    if (filtre && !filtre(s)) continue;
    const h = await hashEndpoint(s.endpoint);
    await env.PUSH_SUBS.put("pending:" + h, JSON.stringify(msg), { expirationTtl: 7200 });
    try {
      const r = await envoyerUnPush(s.endpoint, env);
      console.log("[push] envoi -> " + (s.endpoint || "").slice(0, 50) + " status=" + r.status);
      if (r.status === 404 || r.status === 410) await env.PUSH_SUBS.delete("sub:" + h);
      else n++;
    } catch (e) { console.log("[push] ERREUR envoi: " + (e && e.message)); }
  }
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
