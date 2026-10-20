# TaskAPI

API REST de gestion de tâches développée avec NestJS. Elle permet de créer, lister, modifier et supprimer des tâches, avec validation des données envoyées par le client.

Projet réalisé dans le cadre de ma formation en développement backend.

## Stack technique

- [NestJS](https://nestjs.com/)
- TypeScript
- class-validator et class-transformer (validation et transformation des données)

> Les tâches sont pour l'instant stockées en mémoire : elles sont réinitialisées à chaque redémarrage du serveur. La prochaine étape du projet est l'intégration d'une base de données PostgreSQL.

## Lancer le projet

```bash
git clone https://github.com/Goubadesire/task-api.git
cd task-api
npm install
npm run start:dev
```

L'API est ensuite disponible sur `http://localhost:3000`.

## Endpoints

| Méthode | Route | Description | Succès |
| --- | --- | --- | --- |
| GET | `/tasks` | Liste toutes les tâches | 200 |
| GET | `/tasks/:id` | Renvoie une tâche | 200 |
| POST | `/tasks` | Crée une tâche | 201 |
| PATCH | `/tasks/:id` | Modifie une partie d'une tâche | 200 |
| DELETE | `/tasks/:id` | Supprime une tâche | 204 |

### Exemples de body

Créer une tâche :

```json
{ "title": "Acheter du pain" }
```

Modifier une tâche (tous les champs sont facultatifs) :

```json
{ "title": "Nouveau titre", "done": true }
```

### Règles de validation

- `title` : chaîne de caractères obligatoire, non vide. Les espaces au début et à la fin sont retirés automatiquement.
- `done` : booléen, modifiable uniquement avec `PATCH`.
- Tout champ non prévu (par exemple `role` ou `id`) est refusé avec une erreur 400.

### Erreurs

| Code | Cas |
| --- | --- |
| 400 | Données invalides, ou id qui n'est pas un nombre (`/tasks/abc`) |
| 404 | Aucune tâche ne correspond à l'id demandé |

## Ce que j'ai appris

- **Séparer les responsabilités** : le contrôleur reçoit la requête, le service contient la logique. Grâce à ça, passer à une base de données ne modifiera que le service.
- **Valider les données à l'entrée** : avec les DTO, `ValidationPipe` et l'option `whitelist`, les données invalides ou les champs non autorisés sont refusés avant d'atteindre mon code. Cela protège notamment contre l'assignation de masse.
- **Tout ce qui arrive dans une URL est du texte** : `ParseIntPipe` convertit l'id en nombre et renvoie une erreur 400 si ce n'est pas possible.
- **Réutiliser le code plutôt que le recopier** : la méthode `findOne` est réutilisée dans `update` et `remove` pour retrouver une tâche et lever une erreur 404, et `PartialType` permet au DTO de modification d'hériter des règles du DTO de création.
- **Choisir les bons codes de statut** : 201 pour une création, 204 pour une suppression, 400 pour une requête invalide, 404 pour une ressource introuvable.