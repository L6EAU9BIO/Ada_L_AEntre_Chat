# ADR 002 : Convention de nommage des branches

- **Projet :** Lovelace Factory
- **Statut :** En cours
- **Date :** 13/10/2026
- **Auteurs :** Alison, Marin

## Contexte

Suite à l'ADR 001 (Gitflow simplifié), chaque tâche est développée dans une branche dédiée créée à partir de `dev`. Sans règle commune, les noms de branches deviennent vite incohérents (`essai`, `marin-v2`, `correction`...) et il devient difficile de savoir ce que contient une branche ou à quelle tâche elle correspond.

Nous voulons une convention simple, lisible et partagée par toute l'équipe.

## Décision

Nous nommons nos branches en nous basant sur les types de **Conventional Commits**, selon le format :

```text
type/short-description
```

### Types autorisés

| Type | Usage | Exemple |
|---|---|---|
| `feat` | Nouvelle fonctionnalité | `feat/booking-form` |
| `fix` | Correction de bug | `fix/booking-slot-conflict` |
| `docs` | Documentation (README, ADR, Swagger) | `docs/branch-naming-adr` |
| `chore` | Configuration, dépendances, outils (Docker, ESLint...) | `chore/docker-setup` |
| `refactor` | Réécriture du code sans changer son comportement | `refactor/booking-service` |
| `test` | Ajout ou modification de tests | `test/booking-api` |
| `style` | Mise en forme du code (indentation, formatage), sans changement de logique | `style/format-components` |

Cette liste est fermée. Pour ajouter un nouveau type, l'équipe doit d'abord mettre à jour cet ADR.

### Règles d'écriture

- La description est rédigée **en anglais**.
- Elle est **courte** : 2 à 4 mots, décrivant la tâche et non la personne.
- Elle est écrite en **kebab-case** : tout en minuscules, mots séparés par des tirets (`-`), sans espaces, accents ni caractères spéciaux.
- Le nom ne contient pas de numéro d'issue.

### Tâche concernant plusieurs types

Une branche n'a qu'un seul type. Si une tâche en mélange plusieurs (exemple : une fonctionnalité accompagnée de sa documentation) :

- on choisit le **type principal**, celui qui correspond à l'objectif de la tâche (`feat/booking-form`, même si la documentation est mise à jour dans la même branche) ;
- si la partie secondaire est importante, on **découpe la tâche** en plusieurs branches.

### Cycle de vie des branches

- Chaque branche de tâche est créée à partir de `dev` (voir ADR 001).
- Elle est **supprimée après la fusion** de sa Pull Request.
- `main` et `dev` ne suivent pas cette convention : ce sont les seules branches permanentes du dépôt.

## Conséquences

### Positives

- Le type de travail est visible dès le nom de la branche.
- L'anglais est la langue standard du code et des outils : le dépôt reste lisible par n'importe quel développeur.
- La convention est reconnue dans le milieu professionnel.
- Le dépôt reste propre : seules les branches en cours de travail sont visibles.

### Négatives

- Demande un temps d'adaptation : il faut choisir le bon type avant de créer la branche.
- Rédiger en anglais peut demander un effort supplémentaire pour trouver une formulation courte et précise.
- Le type d'une branche ne reflète pas toujours la totalité de son contenu quand une tâche mélange plusieurs types.