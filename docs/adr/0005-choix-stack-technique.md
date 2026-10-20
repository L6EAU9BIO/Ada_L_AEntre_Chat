# ADR 0005 — Choix de la stack technique

- **Statut** : Accepté
- **Date** : 2026-10-19
- **Décideurs** : Marin, Alison
- **Projet** : Lovelace Factory — application de gestion du bar à chats « L'Æntre Chat »

## Contexte

L'Æntre Chat a besoin d'une application web pour gérer son activité. La V1 porte sur la réservation de tables. Les versions suivantes ajouteront la gestion des chats pensionnaires, le planning des tâches, les bénévoles, l'espace client et l'adoption.

Contraintes du projet :

- Équipe de 2 développeurs en formation, avec un temps limité (projet de fin de formation Ada Tech School).
- Application web accessible depuis un navigateur, utilisable par la gérante et par les clients.
- Données fortement liées entre elles (clients, réservations, tables, chats, adoptions).
- Volonté de l'équipe d'utiliser Docker pour l'environnement de développement et le déploiement.
- API documentée pour faciliter le travail en parallèle front / back.

## Décision

Nous retenons la stack suivante :

| Couche | Technologie | Rôle |
|---|---|---|
| Front-end | **React** | Interface utilisateur en composants réutilisables |
| Back-end | **Node.js + Express** | API REST |
| Base de données | **PostgreSQL** | Stockage relationnel des données |
| Documentation API | **Swagger (OpenAPI)** | Description et test des routes de l'API |
| Environnement | **Docker / Docker Compose** | Conteneurisation du front, de l'API et de la base |
| Versionnement | **Git + GitHub** | Gitflow simplifié (voir ADR 0001) |

## Justification

- **Un seul langage (JavaScript) du front au back** : moins de changements de contexte, partage des compétences entre les deux membres de l'équipe, chacun peut intervenir sur toutes les couches.
- **React** : bibliothèque très répandue, déjà pratiquée en formation, découpage en composants adapté aux écrans répétitifs (cartes de chats, créneaux de réservation).
- **Express** : framework minimaliste, rapide à mettre en place, laisse la main sur la structure de l'API (routes, contrôleurs, middlewares).
- **PostgreSQL** : les données sont relationnelles (une réservation concerne un client et une table, une adoption concerne un chat et un client). Les contraintes d'intégrité (clés étrangères, unicité) évitent par exemple les doubles réservations d'une même table sur un même créneau.
- **Swagger** : contrat d'API lisible par les deux développeurs, permet au front d'avancer sans attendre que le back soit fini, et sert de documentation pour le jury et pour une éventuelle reprise du projet.
- **Docker** : choix voulu par l'équipe. La même configuration tourne sur chaque machine (« ça marche chez moi » évité), la base PostgreSQL se lance en une commande, le déploiement est simplifié, et c'est une compétence recherchée en entreprise que nous souhaitons pratiquer.

## Alternatives envisagées

| Alternative | Raison du rejet |
|---|---|
| **Java / Spring Boot** pour le back | Robuste et vu en spécialité, mais deux langages différents front/back et un temps de mise en place plus long pour une équipe de 2 sur un délai court. |
| **Vue.js** pour le front | Jamais utilisé par l'équipe : temps d'apprentissage incompatible avec le délai du projet. |
| **Angular** pour le front | Framework plus lourd à prendre en main que React, moins pratiqué par l'équipe. |
| **MongoDB** | Base orientée documents peu adaptée à des données aussi liées entre elles ; l'intégrité des réservations serait à gérer à la main. |
| **MySQL** | Alternative relationnelle crédible ; PostgreSQL retenu pour sa richesse fonctionnelle et parce que l'équipe l'utilise déjà. |
| **Installations locales sans Docker** | Risque d'écarts de versions entre les postes, installation de PostgreSQL plus pénible, et ne répond pas à notre volonté de pratiquer la conteneurisation. |

## Conséquences

**Positives**

- Montée en compétence homogène de l'équipe sur une stack JavaScript complète.
- API documentée et testable dès le début grâce à Swagger.
- Environnement reproductible et démarrage du projet simplifié avec Docker Compose.
- Base relationnelle qui garantit la cohérence des réservations et des adoptions.

**Négatives / points de vigilance**

- Express impose peu de structure : il faut définir et respecter nos propres conventions d'organisation du code (routes, contrôleurs, services).
- JavaScript non typé : risque d'erreurs à l'exécution. Une migration vers TypeScript pourra faire l'objet d'un ADR ultérieur.
- Docker ajoute une courbe d'apprentissage (Dockerfile, volumes, réseau entre conteneurs).
- Swagger doit être tenu à jour à chaque modification de route, sinon la documentation devient trompeuse.

## Liens

- ADR 0001 — Workflow Git
- ADR 0002 — Nommage des branches
- ADR 0003 — Convention de commit
- ADR 0004 — Convention de commentaire PR
- Repo : github.com/L6EAU9BIO/Ada_L_AEntre_Chat