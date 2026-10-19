# ADR 0004 — Conventions de Pull Request et de commentaires GitHub

- **Statut** : Accepté
- **Date** : 2026-10-19
- **Décideurs** : Marin, Alison
- **Projet** : Lovelace Factory — application de gestion du bar à chats « L'Æntre Chat »

## Contexte

Le workflow Git du projet repose sur des Pull Requests vers la branche `dev` (voir ADR 0001). Les PR et les échanges écrits sur GitHub (issues, PR en brouillon, revues de code) sont notre principal canal de discussion technique.

Problèmes rencontrés ou anticipés sans convention :

- Des PR aux titres peu explicites (« fix », « wip », « modifs diverses ») et aux descriptions vides ou sans contexte.
- Des PR volumineuses, difficiles à relire.
- Un historique Git peu lisible, qui complique les recherches, les reverts et la génération de changelog.
- Un commentaire écrit peut paraître sec ou agressif alors que ce n'était pas l'intention.
- On ne sait pas si une remarque est bloquante ou simplement une suggestion.
- On ne sait pas à quel moment il est pertinent de commenter un travail encore en cours.

Une PR et ses commentaires forment un tout : la PR doit être bien rédigée pour être bien relue, et la relecture doit être claire pour que la PR avance vite. Cet ADR regroupe donc les deux sujets.

## Décision

Nous adoptons des conventions pour **rédiger** la PR, puis pour la **commenter**, avec des règles différentes **avant** et **après** son ouverture officielle. Pour les commentaires, nous utilisons **Conventional Comments** (conventionalcomments.org).

### 1. Rédaction de la PR

#### Titre

Le titre suit le format de l'ADR 0003 (Conventional Commits) :

```
<type>(<scope optionnel>): <description à l'impératif, en minuscules>
```

- Types : `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `build`, `ci`, `chore`, `revert`.
- 72 caractères maximum.
- Référence de l'issue en fin de titre si elle existe : `(#123)`.
- Exemple : `feat(reservations): ajouter la réservation d'une table avec chat (#42)`

#### Description

Chaque PR utilise le template versionné dans `.github/pull_request_template.md` :

```markdown
## Contexte
Pourquoi ce changement est nécessaire (problème, besoin, issue liée).

## Changements
Ce qui est fait, en quelques points synthétiques.

## Comment tester
Étapes pour valider manuellement, ou tests automatisés ajoutés.

## Captures / Preuves (si applicable)
Avant / après pour l'UI, résultats de requêtes, logs.

## Points d'attention
Migrations, breaking changes, impacts perf, plan de rollback.

## Checklist
- [ ] Tests ajoutés ou mis à jour
- [ ] Documentation mise à jour (Swagger, README)
- [ ] Aucun secret ni donnée sensible
- [ ] Changements de schéma ou de config documentés
```

Les sections non applicables sont marquées « N/A ».

#### Taille et périmètre

- Une PR = un objectif unique et cohérent.
- Cible : **moins de 400 lignes modifiées** (hors fichiers générés). Au-delà, on découpe ou on justifie dans la description.
- Les refactorings sans changement fonctionnel sont isolés dans leurs propres PR.

#### Labels

Chaque PR porte au moins un label de type (`feature`, `bugfix`, `refactor`, `docs`, `chore`) et, si pertinent, `breaking-change` ou `needs-migration`.

### 2. Avant la revue : phase de travail en cours

Le travail est partagé tôt via une **Draft Pull Request** (PR en brouillon).

- Le titre est préfixé par `WIP:` tant que la PR est en brouillon. Ce préfixe est retiré au passage en « Ready for review », le titre respecte alors la convention du §1.
- Les commentaires portent sur la **direction** (approche, structure, choix techniques), pas sur les détails.
- Ton exploratoire : on privilégie les labels `question:`, `thought:` et `suggestion:`.
- Aucun commentaire n'est bloquant à ce stade.
- L'auteur peut demander un avis ciblé en mentionnant l'autre membre (`@pseudo`) avec une question précise.

### 3. Après l'ouverture : revue de code

La PR passe en **Ready for review** quand l'auteur estime le travail terminé, que la CI est verte et que la checklist est complétée.

Chaque commentaire de revue suit le format :

```
<label> [décoration] : <sujet>

[explication facultative]
```

**Labels**

| Label | Usage | Exemple |
|---|---|---|
| `praise:` | Souligner un point positif | `praise: très lisible, ce découpage en services` |
| `issue:` | Problème à corriger | `issue (blocking): la route accepte une date passée` |
| `suggestion:` | Proposition d'amélioration | `suggestion: extraire cette validation dans un middleware` |
| `question:` | Demande de clarification | `question: pourquoi un PATCH plutôt qu'un PUT ici ?` |
| `nitpick:` | Détail mineur (nommage, formatage) | `nitpick: typo dans le nom de variable` |
| `todo:` | Petite tâche nécessaire avant merge | `todo: mettre à jour la doc Swagger` |
| `thought:` | Réflexion, idée pour plus tard | `thought: on pourra paginer cette liste en V2` |

**Décorations** (niveaux importance)

- `(blocking)`: doit être résolu avant le merge. 🔴
- `(non-blocking)` : à la discrétion de l'auteur. 🟢 
- Sans décoration : `issue` et `todo` sont bloquants par défaut, les autres non bloquants.

### 4. Règles de ton

- Les commentaires sont rédigés **en français**. Seuls les labels (`issue:`, `suggestion:`…) et décorations (`(blocking)`…) restent en anglais, tels que définis par Conventional Comments.
- On commente **le code, jamais la personne** (« cette fonction… » plutôt que « tu as oublié… »).
- On explique **pourquoi** une modification est proposée.
- Au moins un `praise:` par revue quand c'est mérité.
- Une discussion qui dépasse 3 échanges se poursuit à l'oral, puis la conclusion est notée dans le fil.
- Délai indicatif : première revue et réponses aux commentaires sous 2 jours ouvrés.

### 5. Résolution et merge

- C'est **la personne qui a ouvert le commentaire** qui marque le fil comme résolu.
- La PR est mergée uniquement quand tous les commentaires `(blocking)` sont résolus et qu'au moins **une approbation** a été donnée (par l'autre membre).
- Stratégie : **Squash and merge** vers `dev`. Le message du commit de squash reprend le titre de la PR, qui doit donc respecter l'ADR 0003.
- La branche source est supprimée après le merge.
- Un contrôle automatique du titre (GitHub Action) bloque le merge si le format n'est pas respecté.

## Alternatives envisagées

| Alternative | Raison du rejet |
|---|---|
| Aucune convention | Ambiguïté sur ce qui est bloquant, PR illisibles, risque de malentendus sur le ton. |
| Titre libre avec simple template de description | Ne permet pas d'automatiser le changelog ni de garder un historique cohérent avec l'ADR 0003. |
| Emojis comme codes (🔴 bloquant, 🟡 suggestion…) | Moins explicite, interprétation variable, peu lisible dans les notifications. |
| Préfixes maison pour les commentaires | Réinvente une convention existante, documentée et reconnue en entreprise. |
| Merge commit ou rebase au lieu de squash | Historique bruité par les commits intermédiaires (« fix typo », « wip »). |

## Conséquences

**Positives**

- Des PR claires, avec un contexte systématique, donc des revues plus rapides.
- Historique Git lisible, changelog automatisable.
- Le niveau d'importance de chaque remarque est clair dès la première lecture.
- Ton bienveillant et constructif, même à l'écrit.
- Les retours arrivent tôt grâce aux Draft PR, ce qui évite de reprendre un travail terminé.
- Conventions réutilisables en entreprise.

**Négatives / points de vigilance**

- Effort de rédaction supplémentaire et discipline nécessaire au début (template, labels).
- Risque de sur-utiliser `nitpick:` et d'alourdir les revues : à limiter.
- Risque de formalisme excessif sur les très petits changements : on marque « N/A » les sections inutiles.

## Liens

- ADR 0001 — Workflow Git
- ADR 0003 — Convention de commit
- Conventional Comments : https://conventionalcomments.org
- Conventional Commits : https://www.conventionalcommits.org/fr/