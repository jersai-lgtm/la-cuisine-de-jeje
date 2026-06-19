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
  async fetch(request, env) {
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
      try {
        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: texte }),
        });
      } catch (e) {}
      return json({ ok: true }, 200, cors);
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
