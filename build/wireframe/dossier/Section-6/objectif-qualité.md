### Objectifs de qualité

Notre premier objectif de qualité est que le code reste **lisible, traçable et stable**, alors que plusieurs personnes travaillent en parallèle sur le même dépôt. Nous avons formalisé les règles correspondantes dans trois ADR, rédigées et validées ensemble avant de commencer le développement.

#### Une branche stable protégée (ADR 001)

Nous suivons un Gitflow simplifié :

```text
main  ──────────────────────────●──────────►   (versions stables)
                               ▲
dev   ────●─────────●──────────●──────────►   (intégration / tests)
          ▲         ▲
feature/  ●──●──●   │
                    │
feature/       ●──●─┘
```

- `main` ne contient que des versions validées. Elle est protégée sur GitHub : aucun push direct, modification uniquement par Pull Request.
- `dev` sert de branche d'intégration et de test.
- Chaque tâche est développée dans sa propre branche, créée à partir de `dev`.

L'objectif qualité : disposer à tout moment d'une version fonctionnelle et démontrable.

#### Une relecture de code systématique

Chaque branche de tâche est fusionnée dans `dev` par une Pull Request, relue par l'autre membre de l'équipe avant intégration. La relecture vérifie :

- que le code fonctionne et répond à la tâche ;
- que les conventions de nommage des branches et des commits sont respectées ;
- que le code reste compréhensible par quelqu'un qui ne l'a pas écrit.

La relecture sert aussi au partage de connaissances : aucune partie de l'application n'est connue d'une seule personne.

#### Des branches au nom explicite (ADR 002)

Les branches suivent le format `type/short-description`, basé sur les types de Conventional Commits :

| Type | Usage | Exemple |
|---|---|---|
| `feat` | Nouvelle fonctionnalité | `feat/booking-form` |
| `fix` | Correction de bug | `fix/booking-slot-conflict` |
| `docs` | Documentation | `docs/branch-naming-adr` |
| `chore` | Configuration, dépendances, outils | `chore/docker-setup` |
| `refactor` | Réécriture sans changement de comportement | `refactor/booking-service` |
| `test` | Ajout ou modification de tests | `test/booking-api` |
| `style` | Mise en forme du code | `style/format-components` |

La description est en anglais, courte (2 à 4 mots) et en kebab-case. Chaque branche est supprimée après la fusion de sa Pull Request, pour que seules les branches en cours restent visibles.

L'objectif qualité : savoir ce que contient une branche dès la lecture de son nom.

#### Des messages de commit normalisés (ADR 003)

Les commits suivent le format `type(scope): description`. Les types sont les mêmes que pour les branches. Le scope, obligatoire, indique la partie du projet modifiée :

| Scope | Partie concernée |
|---|---|
| `front` | Application React |
| `api` | Serveur Node / Express |
| `db` | Base de données PostgreSQL |
| `docker` | Configuration des conteneurs |
| `docs` | Documentation (README, ADR) |
| `config` | Configuration du dépôt (ESLint, Prettier, Git, CI) |

Les règles d'écriture sont les suivantes :

- la description est en anglais, à l'impératif, sans majuscule initiale ni point final ;
- la première ligne fait environ 72 caractères maximum ;
- un commit correspond à un seul changement logique ;
- un changement qui casse la compatibilité est signalé par un `!` et un pied `BREAKING CHANGE`.

```text
fix(api): prevent double booking of a table
chore(docker): add postgres service to docker compose
feat(api)!: rename booking route to reservations

BREAKING CHANGE: /bookings is now /reservations
```

L'objectif qualité : un historique où l'on retrouve, sans ouvrir les commits, quand et dans quelle partie du projet un changement a été fait. L'historique peut être filtré par type ou par scope (par exemple, toutes les corrections de l'API : `fix(api)`).

#### Des listes fermées et des règles évolutives

Les listes de types et de scopes sont fermées : pour en ajouter un, l'équipe doit d'abord mettre à jour l'ADR concernée. Les conventions restent ainsi cohérentes dans le temps, et toute évolution est discutée et tracée.

#### Limites et pistes d'amélioration

Aujourd'hui, le respect des conventions repose sur la rigueur de chacun et sur la relecture des Pull Requests : rien ne les vérifie automatiquement. Pour renforcer la qualité, nous envisageons :

- [À CONFIRMER] un outil de vérification automatique des messages de commit (par exemple commitlint, déclenché avant chaque commit) ;
- [À CONFIRMER] une intégration continue (CI) qui lance le linter et les tests à chaque Pull Request, avant toute fusion dans `dev`.