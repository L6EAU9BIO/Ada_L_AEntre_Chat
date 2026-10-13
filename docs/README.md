# Lovelace Factory

> Application web de gestion d'un bar à chats (Coffee Cat) — projet de fin de formation à **Ada Tech School**, campus de Nantes.

*Projet en cours de développement — ce README est une ébauche et évoluera avec le projet.*

---

## Présentation

Lovelace Factory est une application qui aide un bar à chats à gérer son quotidien : réservations des clients, pensionnaires félins, planning de l'équipe et, à terme, adoption des chats.

### Objectif de la V1

La première version est centrée sur la **réservation** :

- réserver une table ou un salon depuis la page d'accueil ;
- consulter sa réservation.

### Fonctionnalités prévues ensuite

- Gestion des chats pensionnaires (fiches, présentation « Nos chats »)
- Planning des tâches de l'équipe et des bénévoles
- Espace client
- Parcours d'adoption
- Espace administrateur

---

## Stack technique

| Partie | Technologies |
|---|---|
| Front | React 19, Vite |
| Back | Node.js, Express 5 |
| Base de données | PostgreSQL 16 (via Docker), client `pg` |
| Outils | ESLint, Git / GitHub |
| À venir | Documentation d'API avec Swagger |

---

## Structure du projet

```
lovelace_factory/
├── back/
│   ├── server/
│   │   ├── server.js        # point d'entrée de l'API Express
│   │   └── db.js            # connexion à PostgreSQL (pool pg)
│   └── routes/              # une route par ressource
│       ├── admin.js
│       ├── chat.js
│       ├── client.js
│       ├── reservation.js
│       ├── staff.js
│       └── task.js
├── db/
│   ├── docker-compose.yml   # conteneur PostgreSQL (non versionné)
│   ├── migration_up.sql     # création des tables
│   ├── migration_down.sql   # suppression des tables
│   └── seed.sql             # données de test
├── front/
│   ├── assets/              # logo et visuels du site
│   └── src/                 # composants React
├── build/
│   └── wireframe/           # maquettes des parcours de la V1
├── .env.exemple             # modèle des variables d'environnement
└── package.json
```

---

## Installation

### Prérequis

- Node.js (version LTS)
- Docker et Docker Compose
- Git

### 1. Cloner le dépôt

```bash
git clone https://github.com/L6EAU9BIO/Ada_Lovelace_factory.git
cd Ada_Lovelace_factory
npm install
```

### 2. Configurer les variables d'environnement

Copier le modèle puis le compléter :

```bash
cp .env.exemple .env
```

| Variable | Rôle | Exemple |
|---|---|---|
| `DB_HOST` | Adresse de la base | `localhost` |
| `DB_PORT` | Port exposé par Docker | `5439` |
| `DB_USER` | Utilisateur PostgreSQL | — |
| `DB_PASSWORD` | Mot de passe PostgreSQL | — |
| `DB_NAME` | Nom de la base | `lovelacefactory` |
| `PORT` | Port de l'API Express | `3000` |

### 3. Lancer la base de données

Le fichier `db/docker-compose.yml` n'est pas versionné : chaque membre doit le créer localement (demander le modèle à l'équipe). Les identifiants doivent correspondre à ceux du `.env`.

```bash
cd db
docker compose up -d
```

Au premier démarrage, `migration_up.sql` puis `seed.sql` sont exécutés automatiquement.

### 4. Lancer le projet

```bash
# API (back) — http://localhost:3000
node back/server/server.js

# Front — http://localhost:5173
npm run dev
```

### Scripts disponibles

| Commande | Action |
|---|---|
| `npm run dev` | Lance le front en mode développement |
| `npm run build` | Compile le front pour la production |
| `npm run preview` | Prévisualise la version compilée |
| `npm run lint` | Vérifie le code avec ESLint |

---

## API

*À compléter au fil du développement (puis documenter avec Swagger).*

| Ressource | Route | Description |
|---|---|---|
| Réservations | `/reservations` | à définir |
| Clients | `/clients` | à définir |
| Chats | `/chats` | à définir |
| Staff | `/staff` | à définir |
| Tâches | `/tasks` | à définir |
| Admin | `/admin` | à définir |

---

## Maquettes

Les wireframes des parcours de la V1 sont dans `build/wireframe/` :

- `accueil.png` — page d'accueil
- `reservation_accueil.png` — réservation depuis l'accueil
- `reservation_salon.png` — réservation d'un salon
- `consulter_reservation.png` — consultation d'une réservation

---

## Organisation Git

- `main` : version stable
- `dev` : branche d'intégration
- Convention de commits : `Init:`, `FIX:`, … *(à préciser)*

---

## Équipe

- Aurélie — *GitHub à ajouter*
- Alison — *GitHub à ajouter*
- Marin Nicolle Poussier — [@L6EAU9BIO](https://github.com/L6EAU9BIO)

---

*Projet réalisé dans le cadre de la formation Développeur d'applications (RNCP niveau 6) — Ada Tech School.*
