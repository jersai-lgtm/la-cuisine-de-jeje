# 📸 Photos des plats — réglages Firebase

La fonctionnalité « Vos photos » (js/photos.js) stocke les photos dans **Firebase
Storage** et leurs métadonnées dans **Firestore** (collection `photos_recettes`).
3 réglages à faire une fois dans la console Firebase (projet **cuisine-jeje**).

## 1) Activer Storage
Console Firebase → **Storage** → *Commencer* (si ce n'est pas déjà fait).

## 2) Règles Storage
Console → Storage → onglet **Rules** → colle, puis **Publier** :

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{cle}/{fichier} {
      allow read: if true;                                   // photos publiques
      allow write: if request.auth != null
                   && request.resource.size < 5 * 1024 * 1024 // ≤ 5 Mo
                   && request.resource.contentType.matches('image/.*');
      allow delete: if request.auth != null
                    && (fichier.matches(request.auth.uid + '_.*')        // l'auteur
                        || request.auth.token.email == 'jerome.sainthot@gmail.com'); // admin
    }
  }
}
```

## 3) Règles Firestore
Console → **Firestore Database** → onglet **Rules**. **AJOUTE** ce bloc à
l'intérieur de `match /databases/{database}/documents { … }`, SANS supprimer tes
règles existantes (ex. `utilisateurs`) :

```
    match /photos_recettes/{id} {
      allow read: if true;                                   // galerie publique
      allow create: if request.auth != null
                    && request.resource.data.uid == request.auth.uid;
      allow update: if request.auth != null;                 // signalement (signale:true)
      allow delete: if request.auth != null
                    && (resource.data.uid == request.auth.uid
                        || request.auth.token.email == 'jerome.sainthot@gmail.com');
    }
```

Puis **Publier**.

> Index : la galerie trie par date. Si Firestore réclame un index composite
> (`cle` + `ts`), le code a un repli (tri côté client) donc ce n'est pas bloquant ;
> tu peux créer l'index via le lien que Firestore propose pour un tri plus rapide.

## Modération
- Chaque photo a 🗑️ pour **son auteur** et pour **l'admin** (toi).
- 🚩 **Signaler** sur les photos des autres → la photo est masquée pour tout le
  monde (l'admin la voit encore, marquée 🚩, et peut la supprimer).
