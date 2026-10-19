# ADR 003 : Convention des messages de commit

- **Projet :** Lovelace Factory
- **Statut :** En cours
- **Date :** 13/10/2026
- **Auteurs :** Alison, Marin

## Contexte

Suite aux ADR 001 (Gitflow simplifié) et 002 (nommage des branches), nous avons besoin d'une règle commune pour les messages de commit. Sans convention, l'historique devient illisible (`update`, `modif`, `ça marche enfin`...) et il est difficile de retrouver quand et pourquoi une partie du code a été modifiée.

Nous voulons que chaque message indique la nature du changement et la partie du projet concernée.

## Décision

Nous suivons la convention **Conventional Commits**, avec un scope obligatoire, selon le format :

```text
type(scope): description
```

### Types autorisés

Les types sont les mêmes que pour les branches (voir ADR 002) :

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation (README, ADR, Swagger) |
| `chore` | Configuration, dépendances, outils |
| `refactor` | Réécriture du code sans changer son comportement |
| `test` | Ajout ou modification de tests |
| `style` | Mise en forme du code, sans changement de logique |

### Scopes autorisés

Le scope indique la partie du projet modifiée :

| Scope | Partie concernée |
|---|---|
| `front` | Application React (interface) |
| `api` | Serveur Node / Express (routes, contrôleurs, services) |
| `db` | Base de données PostgreSQL (schéma, migrations, données de test) |
| `docker` | Fichiers Docker et configuration des conteneurs |
| `docs` | Documentation (README, ADR) |
| `config` | Configuration générale du dépôt (ESLint, Prettier, Git, CI) |

Ces deux listes sont fermées. Pour ajouter un type ou un scope, l'équipe doit d'abord mettre à jour cet ADR.

### Règles d'écriture

- La description est rédigée **en anglais**.
- Elle utilise l'**impératif** : `add`, `fix`, `remove` (et non `added` ou `adds`).
- Elle commence par une **minuscule** et ne se termine **pas par un point**.
- La première ligne complète (type, scope et description) fait jusqu'a environ **72 caractères maximum**.
- Si le changement a besoin d'être expliqué, on ajoute un **corps** après une ligne vide, pour expliquer le *pourquoi* plutôt que le *comment*.

### Un commit = un changement

- Chaque commit regroupe **un seul changement logique**.
- Si un changement touche plusieurs parties du projet, on choisit le **scope principal**, celui qui correspond à l'objectif du changement.
- Si les modifications sont indépendantes les unes des autres, on les **découpe en plusieurs commits**.

### Changement cassant

Si un commit casse la compatibilité avec l'existant (exemple : une route d'API renommée), on ajoute un `!` après le scope et on précise le changement dans le pied du message :

```text
feat(api)!: rename booking route to reservations

BREAKING CHANGE: /bookings is now /reservations
```

### Exemples

```text
feat(header): add menu burger for mobile
fix(api): prevent double booking of a table
chore(docker): add postgres service to docker compose
docs(docs): add branch naming adr
refactor(api): extract booking validation into a service
```

## Conséquences

### Positives

- La nature et la zone de chaque changement sont visibles dans l'historique sans ouvrir le commit.
- L'historique est filtrable par type ou par scope (exemple : tous les commits `fix(api)`).
- Les commits, branches et Pull Requests utilisent le même vocabulaire.
- La convention est reconnue dans le milieu professionnel et compatible avec des outils de génération automatique de changelog.

### Négatives

- Écrire un message prend plus de temps qu'un simple `update`.
- Le scope ne reflète pas toujours la totalité d'un commit qui touche plusieurs parties du projet.
- La convention n'est pas vérifiée automatiquement : son respect dépend de la rigueur de chacun et de la relecture des Pull Requests.