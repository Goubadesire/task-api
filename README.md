# TaskAPI

API REST de gestion de tâches développée avec NestJS. Elle permet de créer, lister, modifier et supprimer des tâches, avec validation des données envoyées par le client.

Projet réalisé dans le cadre de ma formation en développement backend.

## Stack technique

- [NestJS](https://nestjs.com/)
- TypeScript
- PostgreSQL
- [Prisma](https://www.prisma.io/) (ORM et migrations)
- class-validator et class-transformer (validation et transformation des données)

## Lancer le projet

### Prérequis

- Node.js
- PostgreSQL, avec une base de données vide (par exemple `task_api`)

### Installation

```bash
git clone https://github.com/Goubadesire/task-api.git
cd task-api
npm install
```

### Configuration

Copie le fichier `.env.example` en `.env`, puis renseigne l'adresse de connexion à ta base :

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/task_api"
```

### Base de données

Crée les tables en appliquant les migrations, puis génère le client Prisma :

```bash
npx prisma migrate dev
npx prisma generate
```

### Démarrage

```bash
npm run start:dev
```

L'API est ensuite disponible sur `http://localhost:3000`.

Pour consulter le contenu de la base dans une interface web : `npx prisma studio`.

## Modèle de données

| Champ | Type | Description |
| --- | --- | --- |
| `id` | entier | Identifiant généré automatiquement par la base |
| `title` | texte | Titre de la tâche |
| `done` | booléen | `false` par défaut |
| `createdAt` | date | Date de création, remplie automatiquement |
| `updatedAt` | date | Date de dernière modification, mise à jour automatiquement |

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

- **Séparer les responsabilités** : le contrôleur reçoit la requête, le service contient la logique. Grâce à ça, le passage d'un tableau en mémoire à PostgreSQL n'a modifié que le service : contrôleurs et DTO sont restés identiques.
- **Persister les données avec Prisma** : décrire le modèle dans `schema.prisma`, appliquer les changements avec des migrations versionnées, et lire le SQL généré pour comprendre ce qui se passe réellement dans la base. Ne jamais modifier une migration déjà appliquée : on en crée une nouvelle.
- **Comprendre l'asynchrone** : les requêtes à la base renvoient des promesses. Dès qu'il faut vérifier un résultat (par exemple pour lever une erreur 404), `await` est indispensable.
- **Ne jamais laisser une erreur prévisible devenir un 500** : une tâche introuvable doit renvoyer un 404, pas une erreur serveur.
- **Valider les données à l'entrée** : avec les DTO, `ValidationPipe` et l'option `whitelist`, les données invalides ou les champs non autorisés sont refusés avant d'atteindre mon code. Cela protège notamment contre l'assignation de masse.
- **Tout ce qui arrive dans une URL est du texte** : `ParseIntPipe` convertit l'id en nombre et renvoie une erreur 400 si ce n'est pas possible.
- **Réutiliser le code plutôt que le recopier** : la méthode `findOne` est réutilisée dans `update` et `remove` pour retrouver une tâche et lever une erreur 404, et `PartialType` permet au DTO de modification d'hériter des règles du DTO de création.
- **Choisir les bons codes de statut** : 201 pour une création, 204 pour une suppression, 400 pour une requête invalide, 404 pour une ressource introuvable.