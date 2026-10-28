-- =============================================================
-- L'Æntre Chat — migration UP
-- Crée toutes les tables à partir du MLD.
-- Ordre : d'abord les tables sans clé étrangère (staffs, rooms,
-- customers, cats), puis celles qui pointent vers elles.
-- =============================================================

BEGIN;

-- -------------------------------------------------------------
-- STAFFS : la gérante et les employés
-- -------------------------------------------------------------
CREATE TABLE staffs (
    id           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom          TEXT NOT NULL,
    prenom       TEXT NOT NULL,
    num_tel      TEXT NOT NULL,
    role         TEXT NOT NULL CHECK (role IN ('gerant', 'employe')),
    mail         TEXT NOT NULL UNIQUE,
    date_arrivee DATE NOT NULL DEFAULT CURRENT_DATE,
    date_depart  DATE,
    CHECK (date_depart IS NULL OR date_depart >= date_arrivee)
);

-- -------------------------------------------------------------
-- ROOMS : les salles du bar (Salon, L'Étage, Cocon)
-- -------------------------------------------------------------
CREATE TABLE rooms (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom         TEXT NOT NULL UNIQUE,
    nbr_places  INTEGER NOT NULL CHECK (nbr_places > 0),
    acces_pmr   BOOLEAN NOT NULL DEFAULT false,
    description TEXT
);

-- -------------------------------------------------------------
-- CUSTOMERS : clients, visiteurs et adoptants
-- (les dates d'adoption sont dans cats_customers)
-- -------------------------------------------------------------
CREATE TABLE customers (
    id           INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom          TEXT NOT NULL,
    prenom       TEXT NOT NULL,
    num_tel      TEXT NOT NULL,
    role         TEXT NOT NULL DEFAULT 'client',
    mail         TEXT UNIQUE,
    date_arrivee DATE NOT NULL DEFAULT CURRENT_DATE
);

-- -------------------------------------------------------------
-- CATS : les pensionnaires
-- -------------------------------------------------------------
CREATE TABLE cats (
    id             INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom            TEXT NOT NULL,
    date_arrivee   DATE NOT NULL DEFAULT CURRENT_DATE,
    date_depart    DATE,
    date_naissance DATE,
    race           TEXT NOT NULL DEFAULT 'Inconnu',
    sexe           CHAR(1) NOT NULL CHECK (sexe IN ('M', 'F')),
    CHECK (date_depart IS NULL OR date_depart >= date_arrivee),
    CHECK (date_naissance IS NULL OR date_naissance <= date_arrivee)
);

-- -------------------------------------------------------------
-- RESERVATIONS
-- LOCALISER (1,1)  → room_id obligatoire (NOT NULL)
-- RESERVER  (0,1)  → staff_id et customer_id facultatifs,
--                     mais il en faut au moins un : une réservation
--                     est faite soit par un client, soit par l'équipe.
-- -------------------------------------------------------------
CREATE TABLE reservations (
    id                 INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_reservation   TIMESTAMP NOT NULL,
    places_reservation INTEGER NOT NULL CHECK (places_reservation > 0),
    customer_id        INTEGER REFERENCES customers (id) ON DELETE CASCADE,
    staff_id           INTEGER REFERENCES staffs (id) ON DELETE CASCADE,
    room_id            INTEGER NOT NULL REFERENCES rooms (id) ON DELETE RESTRICT,
    CHECK (customer_id IS NOT NULL OR staff_id IS NOT NULL)
);

-- -------------------------------------------------------------
-- INTERVENTIONS : soins, visites véto, suivi d'un chat
-- GERER   (1,1) → staff_id obligatoire
-- ASSISTER(1,1) → cat_id obligatoire
-- On garde l'historique : un staff parti n'est pas supprimé
-- (il a une date_depart), d'où RESTRICT.
-- -------------------------------------------------------------
CREATE TABLE interventions (
    id                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    date_intervention DATE NOT NULL DEFAULT CURRENT_DATE,
    motif             TEXT NOT NULL,
    resultat          TEXT,
    cat_id            INTEGER NOT NULL REFERENCES cats (id) ON DELETE CASCADE,
    staff_id          INTEGER NOT NULL REFERENCES staffs (id) ON DELETE RESTRICT
);

-- -------------------------------------------------------------
-- CATS_CUSTOMERS : rencontre, adoption, éventuel retour
-- Un chat peut apparaître plusieurs fois (adoption qui n'a pas
-- abouti → date_retour), mais jamais deux fois avec la même
-- personne : c'est la clé primaire (cat_id, customer_id).
-- Un client peut adopter plusieurs chats.
-- -------------------------------------------------------------
CREATE TABLE cats_customers (
    cat_id         INTEGER NOT NULL REFERENCES cats (id) ON DELETE CASCADE,
    customer_id    INTEGER NOT NULL REFERENCES customers (id) ON DELETE CASCADE,
    date_rencontre DATE NOT NULL DEFAULT CURRENT_DATE,
    date_adoption  DATE,
    date_retour    DATE,
    PRIMARY KEY (cat_id, customer_id),
    CHECK (date_adoption IS NULL OR date_adoption >= date_rencontre),
    -- pas de retour sans adoption, et pas de retour avant l'adoption
    CHECK (date_retour IS NULL
           OR (date_adoption IS NOT NULL AND date_retour >= date_adoption))
);

-- Un chat ne peut avoir qu'une seule adoption EN COURS à la fois
-- (adopté et pas encore revenu). Les adoptions terminées par un
-- retour ne comptent pas.
CREATE UNIQUE INDEX uniq_cats_customers_adoption_en_cours
    ON cats_customers (cat_id)
    WHERE date_adoption IS NOT NULL AND date_retour IS NULL;

-- Index sur les clés étrangères (PostgreSQL ne les crée pas tout seul)
CREATE INDEX idx_reservations_room_date ON reservations (room_id, date_reservation);
CREATE INDEX idx_reservations_customer  ON reservations (customer_id);
CREATE INDEX idx_reservations_staff     ON reservations (staff_id);
CREATE INDEX idx_interventions_cat      ON interventions (cat_id);
CREATE INDEX idx_interventions_staff    ON interventions (staff_id);
CREATE INDEX idx_cats_customers_cust    ON cats_customers (customer_id);

COMMIT;
