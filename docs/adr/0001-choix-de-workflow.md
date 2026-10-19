# ADR 001 : Choix du workflow Git / GitHub

- **Projet :** Lovelace Factory
- **Statut :** En cours
- **Date :** 13/10/2026
- **Auteurs :** Alison, Marin

## Contexte

Nous développons une application web pour laquelle les mises en production seront peu fréquentes. Pendant la première période de développement, nous sommes les seules personnes à accéder à la version finale (branche `main`).

Nous travaillons à trois sur le même dépôt : nous avons donc besoin d'un workflow qui limite les conflits, protège le code stable et permet de relire le travail de chacun avant de l'intégrer.

## Options envisagées

| Option | Principe | Pourquoi nous ne l'avons pas retenue / retenue |
|---|---|---|
| **GitHub Flow** | Une seule branche `main` + des branches courtes par fonctionnalité, fusionnées directement dans `main` | Adapté aux mises en production fréquentes, ce qui n'est pas notre cas ; `main` est modifiée plus souvent |
| **Gitflow (simplifié)** | Une branche `dev` d'intégration entre les branches de fonctionnalité et `main` | **Retenue** : `main` reste stable et ne reçoit que des versions validées |

## Décision

Nous adoptons une version simplifiée de **Gitflow** :

- `main` contient uniquement la version stable du projet. Elle est **protégée** : aucun push direct, modification uniquement par Pull Request.
- `dev` est créée à partir de `main` et sert de branche d'intégration et de test.
- Chaque tâche fait l'objet d'une **branche dédiée**, créée à partir de `dev` (exemple : `feature/reservation-formulaire`).
- Chaque branche de tâche est fusionnée dans `dev` via une **Pull Request**, relue par au moins un autre membre du groupe.
- Quand `dev` est stable et testée, elle est fusionnée dans `main` via une Pull Request.

```text
main  ──────────────────────────●──────────►   (versions stables)
                               ▲
dev   ────●─────────●──────────●──────────►   (intégration / tests)
          ▲         ▲
feature/  ●──●──●   │
                    │
feature/       ●──●─┘
```

Nous n'utilisons pas pour l'instant les branches `release/` et `hotfix/` du Gitflow complet, jugées inutiles à notre échelle. Cette décision pourra être revue si le besoin apparaît.

## Conséquences

### Positives

- `main` est protégée : elle contient toujours une version fonctionnelle.
- `dev` offre un environnement de test sécurisé avant la mise en production.
- Les Pull Requests imposent une relecture du code et facilitent le partage de connaissances dans l'équipe.
- Une branche par tâche rend l'historique plus lisible et limite les conflits.

### Négatives

- Ce workflow est plus complexe qu'un GitHub Flow et peut entraîner des confusions ou des erreurs (exemple : créer une branche depuis `main` au lieu de `dev`, ou ouvrir une Pull Request vers la mauvaise branche).
- La relecture des Pull Requests demande du temps et peut ralentir l'intégration si un membre est indisponible.

### Mesures pour limiter les risques

- Activer les règles de protection de branche sur GitHub pour `main` (et éventuellement `dev`).
- Définir une convention de nommage des branches et des messages de commit, partagée dans le README.
- Récupérer régulièrement les changements de `dev` dans sa branche (`git pull origin dev`) pour éviter les gros conflits.