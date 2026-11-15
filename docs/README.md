# L'Æntre Chat

> Application web de gestion des réservations d'un bar à chats, réservée à l'équipe du bar. Projet de fin de formation (Lovelace Factory) à **Ada Tech School**, campus de Nantes.

---

## Présentation

Pomme, gérante du bar à chats L'Æntre Chat, prend les réservations au téléphone et sur papier. Résultat : des créneaux surbookés et des conflits entre clients.

L'Æntre Chat donne à la gérante et à son équipe un outil unique pour enregistrer les réservations, voir l'occupation de chaque salle et ne jamais dépasser sa capacité.

### Ce que fait la V1

L'application est **réservée au staff** : on arrive sur la page de connexion, et toutes les autres pages sont protégées.

- **Connexion / déconnexion** du staff (JWT dans un cookie httpOnly)
- **Réserver** : choisir une salle, un nombre de personnes, une date et un créneau libre
- **Consulter** les réservations d'une salle à une date, créneau par créneau
- **Modifier** le nombre de personnes d'une réservation, ou la **supprimer**
- **Capacité vérifiée par le serveur** : une réservation qui ferait déborder la salle est refusée (409)

### Règles métier

| Règle | Détail |
|---|---|
| Salles | Salon (20 places), Étage (14), Cocon (10) |
| Horaires | Ouverture 10 h – 18 h, créneaux d'une heure (premier à 10:00, dernier à 17:00) |
| Tables de 2 | Un groupe impair bloque la place paire supérieure : 3 personnes bloquent 4 places. On enregistre le vrai nombre de personnes. |
| Dates | Pas de réservation dans le passé ; les créneaux pleins ne sont pas proposés |

### Fonctionnalités prévues ensuite

Priorisées avec la méthode MoSCoW, du point de vue de la gérante :

- **Should** : fiches des chats, planning de l'équipe
- **Could** : parcours d'adoption, espace client et réservation en ligne

---

## Stack technique

| Partie | Technologies |
|---|---|
| Front | React 19, Vite, React Router |
| Back | Node.js, Express 5 (ES modules), jsonwebtoken, bcryptjs |
| Base de données | PostgreSQL 18 (via Docker), client `pg` |
| Tests | Jest |
| Outils | ESLint, Git / GitHub, GitHub Actions, GitHub Projects |
| Documentation d'API | Swagger (routes annotées, page pas encore servie) |

Le choix de la stack est justifié dans l'[ADR 0005](docs/adr/0005-choix-stack-technique.md).

---

## Structure du projet

```
Ada_L_AEntre_Chat/
├── .env.exemple        # modèle des variables d'environnement
├── back/               # API Express
│   ├── server/         # point d'entrée (server.js) et connexion PostgreSQL (db.js)
│   ├── routes/         # une route par ressource
│   ├── controllers/    # lecture de la requête, réponse HTTP
│   ├── services/       # règles métier
│   ├── models/         # requêtes SQL
│   ├── middlewares/    # vérification du token, gestion des erreurs
│   ├── utils/          # fonctions partagées (calcul des places bloquées)
│   └── test/           # tests Jest
├── front/              # application React (Vite)
│   └── src/
│       ├── pages/       # écrans : Connexion, Reservation, ConsulterReservations
│       ├── components/  # éléments d'interface
│       ├── hooks/       # useAuth, useSalles, useReservations
│       ├── services/    # appels à l'API
│       ├── state/       # contexte d'authentification
│       ├── data/        # constantes métier (horaires, tables de 2)
│       └── utils/       # dates, regroupement par créneau
├── db/                 # docker-compose.yml, migrations, seed
├── docs/adr/           # décisions d'architecture (5 ADR)
└── build/              # dossier de cadrage et wireframes
```

---

## Architecture

Le projet suit une **architecture en couches** : chaque couche a une responsabilité unique et n'appelle que la couche située juste en dessous.

### Back-end

```
Requête HTTP
    │
    ▼
┌──────────────────────────────────────┐
│  Routes        URL → controller      │  + middleware verifyToken
├──────────────────────────────────────┤
│  Controllers   requête / réponse     │  lit la requête, renvoie le code HTTP
├──────────────────────────────────────┤
│  Services      règles métier         │  capacité, validation, erreurs 400/404/409
├──────────────────────────────────────┤
│  Models        requêtes SQL          │  requêtes paramétrées ($1, $2…)
└──────────────────────────────────────┘
    │
    ▼
PostgreSQL
```

**Règle principale** : un controller n'appelle jamais un model directement, il passe toujours par un service. Les erreurs métier sont levées avec la classe `ErrorHttp` et transformées en réponse par le middleware de gestion des erreurs.

### Front-end

```
Page  →  Composants  →  Hook  →  Service API  →  [HTTP]  →  back
```

| Couche | Rôle | Dossier |
|---|---|---|
| **Pages** | Assemblent les composants d'un écran | `src/pages` |
| **Composants** | Affichage et saisie, sans appel HTTP | `src/components` |
| **Hooks / State** | Chargent les données et gardent l'état | `src/hooks`, `src/state` |
| **Services API** | Centralisent tous les appels vers le back | `src/services` |

**Règle principale** : les composants n'effectuent pas d'appels HTTP, ils passent par les hooks et les services.

### Flux d'une action : créer une réservation

1. **Front** : `FormulaireReservation.jsx` n'affiche que les créneaux qui ont encore de la place, puis envoie `POST /api/reservation` avec `{ room_id, date_reservation, places_reservation }`.
2. **Route** : `verifyToken` vérifie que l'utilisateur est connecté (sinon **401**), puis passe la main au controller.
3. **Controller** (`reservationController`) : lit le corps de la requête, appelle le service, renvoie **201** avec la réservation créée.
4. **Service** (`reservationService`) :
   - valide les champs (sinon **400**) ;
   - vérifie que la salle existe (sinon **404**) ;
   - additionne les places déjà bloquées sur le créneau, en tables de 2 ;
   - refuse si la salle déborde : **409**, avec le nombre de `places_restantes`.
5. **Model** (`reservationModel`) : exécute les requêtes SQL, sans aucune règle métier.

En modification, la réservation modifiée est exclue du calcul pour ne pas être comptée deux fois.

Le filtre du front sert au confort ; c'est le serveur qui fait foi, même si une requête est envoyée directement à l'API.

---

## Installation

### Prérequis

- Node.js (version LTS)
- Docker et Docker Compose
- Git

### 1. Cloner le dépôt et installer les dépendances

```bash
git clone https://github.com/L6EAU9BIO/Ada_L_AEntre_Chat.git
cd Ada_L_AEntre_Chat
cd back && npm install && cd ..
cd front && npm install && cd ..
```

### 2. Configurer les variables d'environnement

```bash
cp .env.exemple .env
```

| Variable | Rôle | Exemple |
|---|---|---|
| `DB_HOST` | Adresse de la base | `localhost` |
| `DB_PORT` | Port exposé par Docker | `5432` |
| `DB_USER` / `DB_PASSWORD` / `DB_NAME` | Identifiants de connexion de l'API | — |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Identifiants utilisés par Docker pour créer la base (identiques aux trois précédents) | — |
| `JWT_SECRET` | Clé de signature des tokens de connexion | une longue chaîne aléatoire |
| `PORT` | Port de l'API Express | `3000` |

### 3. Lancer la base de données

```bash
cd db
docker compose up -d
```

Au premier démarrage, `migration_up.sql` puis `seed.sql` sont exécutés automatiquement.

Ces scripts ne tournent que sur une base vide. Pour repartir de zéro (après une modification du seed par exemple) :

```bash
docker compose down -v
docker compose up -d
```

### 4. Lancer le projet

Dans deux terminaux :

```bash
# API — http://localhost:3000
cd back && npm run dev

# Front — http://localhost:5173
cd front && npm run dev
```

Le back doit être relancé après chaque modification de son code.

Un compte de démonstration est créé par le seed : `pomme@laentrechats.fr` / `pomme1234`.

### Scripts disponibles

| Dossier | Commande | Action |
|---|---|---|
| `back/` | `npm run dev` | Lance l'API |
| `back/` | `npm test` | Lance les tests Jest |
| `front/` | `npm run dev` | Lance le front en mode développement |
| `front/` | `npm run build` | Compile le front pour la production |
| `front/` | `npm run preview` | Prévisualise la version compilée |
| `front/` | `npm run lint` | Vérifie le code avec ESLint |

---

## API

Toutes les routes sont préfixées par `/api`. Les routes marquées 🔒 demandent d'être connecté.

| Méthode | Route | Rôle |
|---|---|---|
| POST | `/auth/connexion` | Connexion du staff (pose le cookie) |
| POST | `/auth/deconnexion` | Déconnexion (efface le cookie) |
| GET 🔒 | `/auth/moi` | Utilisateur connecté |
| GET 🔒 | `/rooms` | Liste des salles et de leur capacité |
| GET 🔒 | `/reservation?room_id=…&date=…` | Réservations d'une salle à une date |
| GET 🔒 | `/reservation/:id` | Une réservation |
| POST 🔒 | `/reservation` | Créer une réservation (409 si la salle est pleine) |
| PUT 🔒 | `/reservation/:id` | Modifier une réservation (409 si la salle est pleine) |
| DELETE 🔒 | `/reservation/:id` | Supprimer une réservation |
| GET | `/health/db` | Tester la connexion à la base |

Les routes `/chat`, `/client`, `/staff`, `/task` et `/admin` existent pour les fonctionnalités suivantes ; elles ne sont pas utilisées par la V1.

---

## Limites connues

- **Swagger** : les routes sont annotées, mais la page de documentation n'est pas encore servie.
- **Rôles** : la gérante et les employés ont pour l'instant les mêmes droits.
- **Inscription client** (fonctionnalité Could) : la validation des champs est incomplète ; 6 tests sur 58 sont rouges.
- **Règles du cadrage pas encore appliquées** : dimanche grisé, nom et téléphone du client obligatoires.
- **Livraison** : `main` est en retard sur `dev` ; une livraison sur `main` est prévue à chaque jalon.

---

## Maquettes et cadrage

Les wireframes des parcours de la V1 sont dans `build/wireframe/` :

- `accueil.png` : page d'accueil
- `reservation_accueil.png` : choix de la salle
- `reservation_salon.png` : formulaire de réservation
- `consulter_reservation.png` : consultation des réservations

Le dossier de cadrage (description du projet, persona, tableau des risques) est dans `build/dossier/`.

---

## Organisation

- **Branches** (Gitflow simplifié) : `main` est protégée par une GitHub Action qui n'accepte que les Pull Requests venant de `dev` ; `dev` sert à intégrer ; une branche par tâche.
- **Commits** : Conventional Commits, `type(scope): description`.
- **Revue** : chaque intégration passe par une Pull Request relue par l'autre membre de l'équipe.
- **Suivi** : backlog et kanban dans l'onglet Projects du dépôt GitHub.

Les décisions sont écrites dans des ADR :

1. [Choix du workflow](docs/adr/0001-choix-de-workflow.md)
2. [Nommage des branches](docs/adr/0002-convention-nommage-branche.md)
3. [Nommage des commits](docs/adr/0003-convention-nomage-commit.md)
4. [Commentaires de Pull Request](docs/adr/0004-convention-commentaire-PR-com-GH.md)
5. [Choix de la stack technique](docs/adr/0005-choix-stack-technique.md)

---

## Équipe

- Alison Barros — [@alisonbarros787-hash](https://github.com/alisonbarros787-hash)
- Marin Nicolle Poussier — [@L6EAU9BIO](https://github.com/L6EAU9BIO)

---

*Projet réalisé dans le cadre de la formation Développeur d'applications (RNCP niveau 6) — Ada Tech School.*