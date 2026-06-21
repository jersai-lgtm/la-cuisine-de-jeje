# 📸 Photos des plats — réglages Firebase (modération avant publication)

js/photos.js stocke les photos dans **Firebase Storage** et leurs métadonnées
dans **Firestore**. Modèle **modéré** : une photo envoyée est `en_attente` et
n'est publique qu'une fois passée à `publie` par l'admin.

## Schéma (déjà en place côté Jérôme)
- **Storage** : `astuces-photos/{recetteKey}/{uid}/{fichier}.jpg`
- **Firestore** collection `photos` : `{ recetteKey, uid, url, path, nom,
  statut: "en_attente" | "publie", date }`
- **Admin** : UID `sQWjiKrOIsdzWr0nCspn3WSkY5D3`

## Règles (déjà publiées)
- Storage : lecture publique ; envoi = connecté + sur son dossier `{uid}` + image
  `< 5 Mo` ; suppression = auteur ou admin.
- Firestore `photos` : lecture si `statut == "publie"` (ou auteur, ou admin) ;
  création = connecté + `uid` propre + `statut == "en_attente"` ; mise à jour =
  admin (pour publier) ; suppression = auteur ou admin.

## Modération
- L'auteur voit sa photo avec « ⏳ en validation ».
- L'**admin** voit toutes les photos en attente sur la fiche, avec **✓ Publier**
  et **🗑️ Supprimer**.

## (Optionnel) Alerte Telegram « photo à valider »
Le client appelle `POST /photo` sur le Worker après chaque upload. Pour activer
l'alerte, **redéploie le Worker** (la route /photo est déjà dans worker/index.js,
réutilise tes secrets Telegram existants) :
```
cd worker && npx wrangler deploy
```
Sans ça, pas d'alerte — tu modères en ouvrant la recette concernée.

## Index Firestore
Les requêtes n'utilisent que des filtres d'égalité (tri par date côté client),
donc **aucun index composite** n'est normalement nécessaire. Si Firestore en
réclame un, clique simplement le lien proposé dans l'erreur (console F12).
