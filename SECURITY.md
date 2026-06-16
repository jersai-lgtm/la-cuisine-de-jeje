# Sécurité — La Cuisine de Jéjé

Ce document décrit le modèle de sécurité de l'application et **ce qui doit être
vérifié / déployé**. À lire avant toute mise en prod.

## Modèle de sécurité (en 30 secondes)

L'app est un site statique + **Firebase** (Auth, Firestore, Storage) + un **proxy
Cloudflare Worker** pour l'assistant IA.

- La **config Firebase** (`apiKey`, etc. dans `auth.js`) est **publique par
  conception** — ce n'est *pas* un secret. N'importe qui peut la lire.
- Le **vrai contrôle d'accès** se fait **côté serveur** via les règles
  `firestore.rules` et `storage.rules`. **Tout le reste est cosmétique.**
- La fonction `estAdmin()` du JavaScript client (`js/app_avis.js`) ne fait que
  **masquer/afficher des boutons**. Elle est trivialement contournable et
  **ne protège rien** : seules les règles serveur empêchent réellement un
  utilisateur de se prendre pour l'admin.

## ✅ État : règles vérifiées et saines

Les règles **Firestore et Storage** déployées ont été **relues (juin 2026) :
elles ne sont PAS en mode test** et appliquent correctement le moindre privilège
(upload Storage borné aux images < 5 Mo dans le dossier de l'auteur ; lecture
publique des seules photos validées). Les fichiers `firestore.rules` et
`storage.rules` du repo **reflètent désormais la prod** (mêmes règles, juste
factorisées dans des fonctions + commentées). Rien d'urgent à corriger.

### Re-déployer après modification

```bash
npm i -g firebase-tools     # une fois
firebase login              # une fois
firebase deploy --only firestore:rules,storage
```

> ℹ️ La collection **`erreurs`** (remontée d'erreurs JS des utilisateurs, lisible
> par l'admin dans la console Firebase) nécessite que `firestore.rules` soit
> redéployé. Sans ça, le logging échoue en silence (aucune casse).

`firestore.rules` applique le principe « **tout interdit sauf exception** » :
- `utilisateurs/{uid}` : lecture par soi-même ou l'admin ; écriture par soi-même.
- `avis/{uid}` : écriture de son seul avis ; lecture par les comptes connectés.
- `notesEtoiles` : écriture de sa seule note ; lecture publique (badges).
- `recettesProposees` : on ne peut proposer qu'en tant que soi ; lecture/maj par
  l'auteur ou l'admin ; suppression par l'auteur ou l'admin.
- `recettesCommunaute` : lecture publique ; **écriture admin uniquement**
  (impossible de publier sans passer par la modération).
- `astuces` / `photos` : création **forcée en `statut: "en_attente"`** (pas
  d'auto-publication) ; publication/suppression réservées à l'admin.

L'**UID admin** est codé en dur dans les règles
(`sQWjiKrOIsdzWr0nCspn3WSkY5D3`). S'il change, mettre à jour :
`firestore.rules`, `storage.rules`, `js/app_avis.js` (`ADMIN_UIDS`) et
`js/app_contribution.js` (`CONTRIB_ADMIN_UID`).

## CSP (GitHub Pages)

L'app est servie par **GitHub Pages**, qui ne permet pas de définir d'en-têtes
HTTP. La **CSP est donc posée en `<meta http-equiv>`** tout en haut de
`index.html` (mode bloquant). Elle restreint les origines de scripts, connexions,
images et iframes → réduit fortement l'impact d'une éventuelle injection.

Testée localement (scripts gstatic/gtag, styles inline, lecture Firestore,
images) sans violation. Le seul parcours non testable hors-ligne est la
**connexion Google** (popup `accounts.google.com`/`apis.google.com` + iframe
`cuisine-jeje.firebaseapp.com`) — ces origines sont incluses.

➡️ **Après mise en ligne** : ouvrir l'app, console ouverte, tester connexion
Google + assistant + upload photo. Si une ressource est bloquée (« Refused
to… »), ajouter son origine à la directive concernée dans le `<meta>`.

> Limites du `<meta>` : `frame-ancestors`, `X-Frame-Options`,
> `X-Content-Type-Options`, `Permissions-Policy` ne sont **pas** applicables sur
> GitHub Pages (en-têtes seulement). Si un jour l'app passe derrière Cloudflare
> (Pages/proxy), on pourra ajouter ces en-têtes via un fichier `_headers`.

> Tant que le HTML contient des `onclick="…"` et `style="…"` *inline*, la
> directive `'unsafe-inline'` reste nécessaire. Pour une CSP réellement stricte
> (sans `unsafe-inline`), il faudrait extraire ces handlers/styles — voir la
> piste « refonte » du plan d'améliorations.

## Correctifs XSS déjà appliqués

Tout contenu fourni par des utilisateurs tiers est désormais échappé avant
injection en `innerHTML` :
- `js/app_contribution.js` : cartes communauté + **panneau de modération admin**
  (échappement des champs + assainissement récursif des recettes non fiables
  avant fusion au catalogue, car la fiche est rendue en `innerHTML`).
- `auth.js` : `displayName` / `photoURL` de l'avatar.
- `js/app.js` : réponses du chat IA échappées avant le rendu markdown.
- `js/app_avis.js` & `js/community.js` : déjà échappés (`escapeHTML` / `_echapCom`).

## ✅ Proxy IA — protégé

`worker/index.js` durcit le proxy Cloudflare : CORS restreint, **jeton Firebase
obligatoire et vérifié** (signature RS256 via les clés Google), **quota par
utilisateur** (KV), et **paramètres imposés** côté serveur (model/max_tokens
fixes, system/messages bornés). Le client n'appelle le proxy que connecté et
joint son jeton. ➡️ **À déployer** : voir `worker/README.md`
(`wrangler deploy` + secret `ANTHROPIC_API_KEY` + binding KV `RATE_LIMIT`).

## ⚠️ Risques résiduels à traiter

1. **Données personnelles en lecture** — `avis` et `notesEtoiles` exposent le
   prénom (et `utilisateurs` est lisible par l'admin). L'email n'est plus écrit
   dans `avis` (minimisation). Pour aller plus loin : ne pas stocker le prénom
   dans les notes publiques, ou exposer une **agrégation** (moyenne précalculée)
   plutôt que la collection brute.
2. **Validation de contenu côté serveur** — `astuces`/`photos` bornent déjà
   leurs champs (texte 1..500, `recetteKey`/`url` typés). À répliquer sur `avis`
   (`commentaire`) et `recettesProposees` pour la cohérence
   (`request.resource.data.commentaire is string && ...size() <= 500`).
3. **App Check** — activer Firebase App Check (reCAPTCHA) pour limiter l'usage
   de la base/Storage aux instances légitimes de l'app (en complément du jeton
   utilisateur côté proxy).
4. **Collection `presence`** — écriture ouverte aux visiteurs anonymes (4 champs
   bornés). Vestige non utilisé par le code v1.6.7 (la présence passe par
   `utilisateurs/{uid}.lastSeen`). À supprimer des règles si plus aucune version
   ne s'en sert.
