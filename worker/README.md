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

## 📥 Import d'une recette depuis un lien (route `/import`)

Ajoutée en v5.2.7. Le navigateur ne peut pas lire la page d'un autre site (CORS) :
c'est le Worker qui va la chercher, puis renvoie une recette prête à relire dans
le formulaire « Ajouter une recette ».

- Jeton Firebase exigé, comme le reste ; quota séparé (`IMPORT_PAR_HEURE`, 15/h).
- Refuse tout ce qui n'est pas un site public (localhost, IP privées…).
- **Voie 1, gratuite** : le balisage `schema.org/Recipe` que publient la plupart
  des sites de cuisine. Exact, instantané, aucun appel à l'IA. Quand la page
  annonce plusieurs recettes (« à voir aussi »), celle qui porte le titre de la
  page gagne.
- **Voie 2** : à défaut seulement, l'IA lit le texte de la page (14 000
  caractères, réponse JSON bornée).

Tant que ce Worker n'est pas redéployé, l'app affiche « L'import n'est pas encore
activé sur le serveur » — elle reconnaît la route au champ `route: "import"` de
la réponse. Pour l'activer :

```bash
cd worker
npx wrangler deploy
```

## ⚠️ Ordre de déploiement (important)

**Déployer ce Worker AVANT (ou en même temps que) le merge du front en prod.**
Le client envoie maintenant l'en-tête `Authorization: Bearer …`, ce qui déclenche
un preflight CORS que seul ce Worker durci autorise
(`Access-Control-Allow-Headers: Authorization`). Si l'ancien proxy est encore en
place au moment du merge, l'assistant pourrait cesser de répondre. Séquence sûre :
**1.** déployer le Worker → **2.** merger la branche (déploiement Vercel) →
**3.** tester connexion + assistant.

## Déploiement

Prérequis : compte Cloudflare + `npx wrangler login`.

```bash
cd worker

# 1) FAIT le 25/09/2026 : le namespace KV du quota existe et son id est déjà
#    dans wrangler.toml. À ne refaire que sur un nouveau compte Cloudflare.
#    Tant qu'il manquait, le code des quotas ne s'exécutait pas du tout.
# npx wrangler kv namespace create RATE_LIMIT

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

## 🔔 Notification Telegram à la connexion (route `/notif`)

Le Worker expose une route `POST /notif` : quand quelqu'un se connecte, l'app
l'appelle (avec le jeton Firebase) et le Worker t'envoie un message **Telegram**.
Le nom vient du jeton vérifié (non falsifiable) ; c'est **dédupliqué** à 1×/12 h
par utilisateur (via KV) ; et ça **ne consomme pas** le quota IA.

### Mise en place (≈ 5 min)

1. **Créer un bot** : dans Telegram, parle à **@BotFather** → `/newbot` → choisis un
   nom → il te donne un **token** (genre `123456:ABC-...`).
2. **Récupérer ton chat id** : envoie un message à ton bot, puis ouvre
   `https://api.telegram.org/bot<TOKEN>/getUpdates` dans un navigateur et repère
   `"chat":{"id":<TON_ID>}`. (Ou parle à **@userinfobot** qui te donne ton id.)
3. **Configurer le Worker** :
   ```bash
   cd worker
   npx wrangler secret put TELEGRAM_BOT_TOKEN   # colle le token du bot
   npx wrangler secret put TELEGRAM_CHAT_ID     # colle ton chat id
   npx wrangler deploy
   ```
   (Le KV `RATE_LIMIT` doit être branché pour la déduplication — déjà recommandé
   pour le quota.)
4. **Tester** : déconnecte-toi puis reconnecte-toi dans l'app → tu dois recevoir
   un message Telegram. Tant que les deux secrets ne sont pas définis, la route
   répond simplement `{"ok":false,"raison":"non configuré"}` (rien ne casse).

> Sans cette configuration, l'app appelle quand même `/notif` mais il ne se passe
> rien (réponse « non configuré », avalée côté client). À déployer quand tu veux.

## Notes

- Sans binding KV, le Worker fonctionne mais **sans quota** (il l'ignore). Le KV
  est donc fortement recommandé.
- Pour ajuster les limites : `RATE_LIMIT_PER_HOUR`, `FORCED_MAX_TOKENS`,
  `MAX_MESSAGES`… en tête de `index.js`.
- Étape suivante possible : ajouter **Firebase App Check** pour bloquer aussi les
  appels qui n'émanent pas de l'app légitime (en plus de l'auth utilisateur).
