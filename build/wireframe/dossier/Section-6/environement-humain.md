### Environnement humain et technique

#### L'équipe

Le projet est développé par une équipe de deux personnes, Alison et Marin, dans le cadre de la formation Ada Tech School. Une troisième membre, Aurélie, a quitté le projet en cours de route ; l'organisation décrite ici est celle de l'équipe à deux.

La commanditaire est Pomme, gérante du bar à chats L'Æntre Chats. Elle exprime les besoins métier : réservation des salles, puis à terme gestion des chats, des bénévoles, de l'adoption et d'un espace client.

| Personne | Rôle | Responsabilités principales |
|---|---|---|
| Pomme | Commanditaire (gérante) | Expression des besoins, validation des fonctionnalités |
| Alison | Développeuse | [À COMPLÉTER : parties du projet prises en charge] |
| Marin | Développeur | [À COMPLÉTER : parties du projet prises en charge] |

Quelle que soit la répartition des tâches, une règle s'applique à toute l'équipe : aucun code n'est intégré sans avoir été relu par l'autre membre (voir « Objectifs de qualité »). Chacun connaît donc aussi les parties qu'il n'a pas écrites.

#### Les outils

| Domaine | Outil | Usage dans le projet |
|---|---|---|
| Maquette et design | Figma | Maquettes, prototype de navigation, bibliothèque de composants et variables de design (couleurs, typographies, espacements) |
| Interface | React | Application front-end |
| API | Node.js / Express | Serveur, routes, contrôleurs et services |
| Documentation de l'API | Swagger | Description des routes et de leurs paramètres |
| Base de données | PostgreSQL | Stockage des données (salles, réservations, clients…) |
| Environnement | Docker | Conteneurs pour l'API et la base de données, identiques sur chaque poste |
| Versionnement | Git / GitHub | Dépôt partagé, branches, Pull Requests et relecture de code |
| Décisions d'équipe | ADR (Architecture Decision Records) | Trace écrite de chaque décision importante : contexte, options, choix, conséquences |
| Qualité du code | ESLint / Prettier | Vérification et formatage du code |