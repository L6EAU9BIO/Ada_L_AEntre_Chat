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
Ada_Lovelace_factory/
├── .env.exemple           # modèle des variables d'environnement
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
│
├── back/
│   ├── routes/            # une route par ressource
│   │   ├── admin.js
│   │   ├── chat.js
│   │   ├── client.js
│   │   ├── reservation.js
│   │   ├── staff.js
│   │   └── task.js
│   └── server/
│       ├── db.js         # connexion à PostgreSQL (pool pg)
│       └── server.js     # point d'entrée de l'API Express
│
├── build/
│   ├── dossier/
│   │   ├── Capture/
│   │   │   ├── 28 septembre - 04 octobre/   # brouillons, personas, maquettes
│   │   │   ├── 5 octobre - 11 octobre/      # MoSCoW, user stories, logos
│   │   │   └── 12 octobre - 18 octobre/     # 3ème maquette accueil + login
│   │   ├── Section-1/
│   │   │   └── description_projet.md
│   │   ├── Section-3.1/
│   │   │   └── Persona.md
│   │   ├── Section-3.2/
│   │   │   ├── Contexte.txt
│   │   │   └── tableau_risques.md
│   │   ├── Section-4.1/
│   │   │   └── test.md
│   │   ├── Section-4.3/
│   │   │   └── test.md
│   │   ├── Section-5.3/
│   │   │   └── justif_adr.md
│   │   └── Section-6/
│   │       └── test.md
│   └── wireframe/n                   # maquettes des parcours de la V1
│       ├── accueil.png
│       ├── consulter_reservation.png
│       ├── reservation_accueil.png
│       ├── reservation_salon.png
│       └── dossier/
│           └── Section-6/
│               ├── environement-humain.md
│               └── objectif-qualité.md
│
├── db/
│   ├── docker-compose.yml     # conteneur PostgreSQL (non versionné)
│   ├── migration_up.sql       # création des tables
│   ├── migration_down.sql     # suppression des tables
│   └── seed.sql               # données de test
│
├── docs/
│   ├── README.md
│   └── adr/
│       ├── 0001-choix-de-workflow.md
│       ├── 0002-convention-nommage-branche.md
│       └── 0003-convention-nomage-commit.md
│
├── front/
│   ├── assets/             # logo et visuels du site
│   │   ├── adoption.png
│   │   ├── logo.png
│   │   ├── menu.png
│   │   ├── nos_chats.png
│   │   ├── planning.png
│   │   └── reservation.png
│   └── src/                 # composants React
│       ├── App.css
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── lovelace-factory/
│   ├── conception/
│   └── requetes/
│
└── test/
    └── tets.md
```

---

##  Architecture

Le projet suit une **architecture en couches** : chaque couche a une responsabilité unique et ne dépend que de la couche située juste en dessous. Cela facilite la maintenance, les tests et l'évolution du code.

### Back-end

```
┌──────────────────────────────────────┐
│  Présentation (Controllers / Routes) │  ← reçoit les requêtes HTTP, valide les entrées
├──────────────────────────────────────┤
│  Service (logique métier)            │  ← règles métier, orchestration
├──────────────────────────────────────┤
│  Repository (accès aux données)      │  ← requêtes en base, abstraction du stockage
├──────────────────────────────────────┤
│  Base de données                     │
└──────────────────────────────────────┘
```

| Couche | Rôle | Dossier |
|---|---|---|
| **Controllers / Routes** | Point d'entrée de l'API : reçoit les requêtes, appelle les services, renvoie la réponse | `src/controllers` |
| **Services** | Contient la logique métier. Ne connaît ni HTTP ni la base de données | `src/services` |
| **Repositories** | Seule couche qui dialogue avec la base de données | `src/repositories` |
| **Models / Entities** | Définition des objets métier et du schéma de données | `src/models` |
| **DTO / Validators** | Validation et mapping des données entrantes et sortantes | `src/dto` |
| **Middlewares** | Authentification, gestion des erreurs, logs | `src/middlewares` |

**Règle principale** : un controller n'appelle jamais directement un repository, il passe toujours par un service.

### Front-end

```
┌──────────────────────────────────────┐
│  Pages / Vues                        │  ← écrans de l'application
├──────────────────────────────────────┤
│  Composants (UI)                     │  ← éléments réutilisables
├──────────────────────────────────────┤
│  Hooks / State (store)               │  ← gestion de l'état et de la logique de vue
├──────────────────────────────────────┤
│  Services API                        │  ← appels HTTP vers le back-end
└──────────────────────────────────────┘
```

| Couche | Rôle | Dossier |
|---|---|---|
| **Pages** | Assemblent les composants et définissent les routes | `src/pages` |
| **Composants** | Éléments d'interface réutilisables, sans logique d'appel API | `src/components` |
| **Hooks / Store** | Gestion de l'état global et de la logique partagée | `src/hooks`, `src/store` |
| **Services API** | Centralisent tous les appels vers le back-end | `src/services` |
| **Types / Utils** | Types partagés et fonctions utilitaires | `src/types`, `src/utils` |

**Règle principale** : les composants n'effectuent pas d'appels HTTP directement, ils passent par les hooks ou les services API.

### Flux d'une requête

```
Utilisateur → Page → Hook/Store → Service API → [HTTP] → Controller → Service → Repository → BDD
```

La réponse remonte ensuite par le même chemin en sens inverse.

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

- Alison — [@alisonbarros787-hash](https://github.com/alisonbarros787-hash)
- Marin Nicolle Poussier — [@L6EAU9BIO](https://github.com/L6EAU9BIO)

---

*Projet réalisé dans le cadre de la formation Développeur d'applications (RNCP niveau 6) — Ada Tech School.*
