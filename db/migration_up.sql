-- =============================================================
-- L'Æntre Chat — migration UP
-- Crée toutes les tables de la base lovelacefactory.
-- Ordre : d'abord les tables "fortes" (sans clé étrangère),
-- puis celles qui pointent vers elles.
-- =============================================================

BEGIN;

-- -------------------------------------------------------------
-- CUSTOMER : clients, conservés le temps de leur réservation
-- -------------------------------------------------------------
CREATE TABLE customer (
    customer_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom         TEXT NOT NULL,
    num_tel     TEXT NOT NULL
);

-- -------------------------------------------------------------
-- ROOM : les salles du bar (Salon, L'Étage, Cocon)
-- -------------------------------------------------------------
CREATE TABLE room (
    room_id     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom         TEXT NOT NULL UNIQUE,
    nbr_place   INTEGER NOT NULL CHECK (nbr_place > 0),
    acces_pmr   BOOLEAN NOT NULL DEFAULT false,
    description TEXT
);

-- -------------------------------------------------------------
-- STAFF : la gérante et les employés
-- -------------------------------------------------------------
CREATE TABLE staff (
    staff_id     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
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
-- CATS : les pensionnaires
-- Adopter (0N CUSTOMER, 01 CATS) → la clé étrangère va dans cats :
-- un chat a 0 ou 1 adoptant, un client peut adopter plusieurs chats.
-- -------------------------------------------------------------
CREATE TABLE cats (
    cat_id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nom            TEXT NOT NULL,
    date_arrivee   DATE NOT NULL DEFAULT CURRENT_DATE,
    date_depart    DATE,
    date_naissance DATE,
    race           TEXT NOT NULL DEFAULT 'Inconnu',
    sexe           CHAR(1) NOT NULL CHECK (sexe IN ('M', 'F')),
    customer_id    INTEGER REFERENCES customer (customer_id) ON DELETE SET NULL,
    date_adoption  DATE,
    CHECK (date_depart IS NULL OR date_depart >= date_arrivee),
    CHECK (date_naissance IS NULL OR date_naissance <= date_arrivee)
);

-- -------------------------------------------------------------
-- RESERVER_CUSTOMER : réservation d'une salle par un client
-- customer_id UNIQUE → un client = une seule réservation
-- room_id non unique → une salle peut avoir plusieurs réservations
-- -------------------------------------------------------------
CREATE TABLE reserver_customer (
    reservation_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id    INTEGER NOT NULL UNIQUE
                   REFERENCES customer (customer_id) ON DELETE CASCADE,
    room_id        INTEGER NOT NULL
                   REFERENCES room (room_id) ON DELETE RESTRICT,
    date_resa      DATE NOT NULL,
    heure_debut    TIME NOT NULL,
    heure_fin      TIME NOT NULL,
    nb_personnes   INTEGER NOT NULL CHECK (nb_personnes > 0),
    CHECK (heure_fin > heure_debut)
);

-- -------------------------------------------------------------
-- RESERVER_STAFF : un membre du staff bloque une salle
-- (privatisation, ménage, atelier…) — 0N STAFF, 0N ROOM
-- -------------------------------------------------------------
CREATE TABLE reserver_staff (
    reservation_staff_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    staff_id             INTEGER NOT NULL
                         REFERENCES staff (staff_id) ON DELETE CASCADE,
    room_id              INTEGER NOT NULL
                         REFERENCES room (room_id) ON DELETE CASCADE,
    date_resa            DATE NOT NULL,
    heure_debut          TIME NOT NULL,
    heure_fin            TIME NOT NULL,
    motif                TEXT,
    CHECK (heure_fin > heure_debut)
);

-- -------------------------------------------------------------
-- GERER : quel membre du staff s'occupe de quel chat
-- 1N CATS, 0N STAFF → table de liaison, clé primaire composée
-- -------------------------------------------------------------
CREATE TABLE gerer (
    staff_id INTEGER NOT NULL REFERENCES staff (staff_id) ON DELETE CASCADE,
    cat_id   INTEGER NOT NULL REFERENCES cats (cat_id) ON DELETE CASCADE,
    PRIMARY KEY (staff_id, cat_id)
);

-- Index sur les clés étrangères (PostgreSQL ne les crée pas tout seul)
CREATE INDEX idx_cats_customer           ON cats (customer_id);
CREATE INDEX idx_reserver_customer_room  ON reserver_customer (room_id, date_resa);
CREATE INDEX idx_reserver_staff_room     ON reserver_staff (room_id, date_resa);
CREATE INDEX idx_reserver_staff_staff    ON reserver_staff (staff_id);
CREATE INDEX idx_gerer_cat               ON gerer (cat_id);

COMMIT;
