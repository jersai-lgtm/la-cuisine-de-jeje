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

## En-têtes HTTP (Vercel)

`vercel.json` ajoute des en-têtes de sécurité (anti-clickjacking, nosniff,
referrer, permissions). La **CSP est volontairement en `Report-Only`** : elle
ne bloque rien mais journalise les violations.

➡️ **Pour activer le blocage** : déployer, ouvrir la console sur les parcours
clés (connexion Google, envoi d'avis, upload photo, chat IA), vérifier qu'aucune
violation légitime n'apparaît, puis renommer dans `vercel.json` la clé
`Content-Security-Policy-Report-Only` en `Content-Security-Policy`.

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

## ⚠️ Risques résiduels à traiter

1. **Proxy IA ouvert** — `https://la-cuisine-de-jeje.jerome-sainthot.workers.dev`
   est appelé sans authentification. N'importe qui peut le marteler et **brûler
   ton quota Anthropic**. À protéger : vérifier le jeton Firebase de l'appelant
   côté Worker (App Check ou ID token), + rate-limiting / quota par utilisateur.
2. **Données personnelles en lecture** — `avis` et `notesEtoiles` exposent le
   prénom (et `utilisateurs` est lisible par l'admin). L'email n'est plus écrit
   dans `avis` (minimisation). Pour aller plus loin : ne pas stocker le prénom
   dans les notes publiques, ou exposer une **agrégation** (moyenne précalculée)
   plutôt que la collection brute.
3. **Validation de contenu côté serveur** — `astuces`/`photos` bornent déjà
   leurs champs (texte 1..500, `recetteKey`/`url` typés). À répliquer sur `avis`
   (`commentaire`) et `recettesProposees` pour la cohérence
   (`request.resource.data.commentaire is string && ...size() <= 500`).
4. **App Check** — activer Firebase App Check (reCAPTCHA) pour limiter l'usage
   de la base/Storage aux instances légitimes de l'app.
5. **Collection `presence`** — écriture ouverte aux visiteurs anonymes (4 champs
   bornés). Vestige non utilisé par le code v1.6.7 (la présence passe par
   `utilisateurs/{uid}.lastSeen`). À supprimer des règles si plus aucune version
   ne s'en sert.
