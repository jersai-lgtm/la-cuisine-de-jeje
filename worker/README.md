# Proxy IA durci — déploiement

Ce Worker Cloudflare relaie l'assistant vers Anthropic **en protégeant la clé API**
et en empêchant l'abus du quota. Il remplace l'ancien proxy ouvert.

## Ce qu'il fait

- **CORS** restreint aux origines de l'app (`ALLOWED_ORIGINS` dans `index.js`).
- **Auth** : exige un jeton d'identité Firebase, vérifié cryptographiquement
  (signature RS256 via les clés publiques Google + contrôle `aud`/`iss`/`exp`).
- **Quota** : `RATE_LIMIT_PER_HOUR` requêtes / heure / utilisateur (via KV).
- **Paramètres imposés** : `model` et `max_tokens` fixés côté serveur ; `system`
  et `messages` bornés en taille → le proxy ne peut servir qu'à l'assistant recettes.

## Déploiement

Prérequis : compte Cloudflare + `npx wrangler login`.

```bash
cd worker

# 1) (recommandé) Créer le namespace KV pour le quota, puis copier l'id
#    affiché dans wrangler.toml (décommenter le bloc [[kv_namespaces]]).
npx wrangler kv namespace create RATE_LIMIT

# 2) Définir la clé API Anthropic comme SECRET (jamais dans le repo)
npx wrangler secret put ANTHROPIC_API_KEY

# 3) Déployer
npx wrangler deploy
```

Vérifier que `FIREBASE_PROJECT_ID` dans `wrangler.toml` vaut bien `cuisine-jeje`.

## Vérification rapide

```bash
# Sans jeton → doit répondre 401
curl -i -X POST https://la-cuisine-de-jeje.jerome-sainthot.workers.dev \
  -H "Content-Type: application/json" -d '{"messages":[]}'
```

Dans l'app, l'assistant n'apparaît que pour les utilisateurs connectés (le client
envoie automatiquement le jeton via `Authorization: Bearer …`).

## Notes

- Sans binding KV, le Worker fonctionne mais **sans quota** (il l'ignore). Le KV
  est donc fortement recommandé.
- Pour ajuster les limites : `RATE_LIMIT_PER_HOUR`, `FORCED_MAX_TOKENS`,
  `MAX_MESSAGES`… en tête de `index.js`.
- Étape suivante possible : ajouter **Firebase App Check** pour bloquer aussi les
  appels qui n'émanent pas de l'app légitime (en plus de l'auth utilisateur).
