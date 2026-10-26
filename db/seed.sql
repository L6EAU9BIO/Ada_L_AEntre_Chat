-- =============================================================
-- L'Æntre Chat — seed (données de test)
-- Semaine type : du lundi 16 au dimanche 22 novembre 2026.
-- Toutes les personnes et coordonnées sont fictives.
--
-- Les id sont générés automatiquement dans l'ordre des INSERT
-- (1, 2, 3…) : les numéros utilisés dans les clés étrangères
-- plus bas correspondent à cet ordre (voir les commentaires).
-- À exécuter sur une base vide, juste après migration_up.sql.
-- =============================================================

BEGIN;

-- -------------------------------------------------------------
-- ROOM (room_id 1 à 3)
-- -------------------------------------------------------------
INSERT INTO room (nom, nbr_place, acces_pmr, description) VALUES
('Le Salon', 20, true,
 'La grande salle de plain-pied, ouverte sur la vitrine. Canapés, tables basses et arbres à chats au plafond : c''est ici que la plupart des pensionnaires font la sieste au soleil. Idéale pour les groupes et les anniversaires.'),
('L''Étage', 15, false,
 'Au premier étage, accessible uniquement par un escalier en colimaçon. Ambiance bibliothèque, lumière tamisée, coussins au sol et passerelles murales pour les chats grimpeurs. Parfaite pour lire ou travailler au calme.'),
('Le Cocon', 6, true,
 'Petite pièce feutrée en rez-de-chaussée, pensée pour les chats timides et les visites en petit comité. Éclairage doux, bruit limité, accès de plain-pied. Recommandée pour une première rencontre avant une adoption.');

-- -------------------------------------------------------------
-- STAFF (staff_id 1 = Pomme, 2 = Lucas, 3 = Inès)
-- -------------------------------------------------------------
INSERT INTO staff (nom, prenom, num_tel, role, mail, date_arrivee, date_depart) VALUES
('Martin',  'Pomme', '06 00 00 01 01', 'gerant',  'pomme@laentrechat.fr', '2024-03-01', NULL),
('Garnier', 'Lucas', '06 00 00 01 02', 'employe', 'lucas@laentrechat.fr', '2025-06-15', NULL),
('Moreau',  'Inès',  '06 00 00 01 03', 'employe', 'ines@laentrechat.fr',  '2026-01-05', NULL);

-- -------------------------------------------------------------
-- CUSTOMER (customer_id 1 à 8) — un client par réservation
-- -------------------------------------------------------------
INSERT INTO customer (nom, num_tel) VALUES
('Dupuis',   '06 00 00 02 01'),  -- 1
('Lefebvre', '06 00 00 02 02'),  -- 2
('Nguyen',   '06 00 00 02 03'),  -- 3
('Rousseau', '06 00 00 02 04'),  -- 4
('Benali',   '06 00 00 02 05'),  -- 5
('Fontaine', '06 00 00 02 06'),  -- 6
('Le Goff',  '06 00 00 02 07'),  -- 7
('Perrin',   '06 00 00 02 08');  -- 8

-- -------------------------------------------------------------
-- RESERVER_CUSTOMER — semaine du 16 au 22 novembre 2026
-- room_id : 1 = Salon (20), 2 = L'Étage (15), 3 = Cocon (6)
-- -------------------------------------------------------------
INSERT INTO reserver_customer (customer_id, room_id, date_resa, heure_debut, heure_fin, nb_personnes) VALUES
(1, 1, '2026-11-16', '14:00', '16:00',  4),  -- lundi, Salon
(2, 3, '2026-11-17', '10:30', '12:00',  2),  -- mardi, Cocon
(3, 2, '2026-11-18', '15:00', '17:00',  8),  -- mercredi, Étage (anniversaire)
(4, 1, '2026-11-18', '16:00', '18:00',  6),  -- mercredi, Salon
(5, 3, '2026-11-19', '14:00', '15:30',  3),  -- jeudi, Cocon (accès PMR)
(6, 1, '2026-11-21', '11:00', '13:00', 12),  -- samedi, Salon
(7, 2, '2026-11-21', '14:00', '16:00',  5),  -- samedi, Étage
(8, 3, '2026-11-22', '16:00', '17:30',  2);  -- dimanche, Cocon

-- -------------------------------------------------------------
-- RESERVER_STAFF — créneaux bloqués par l'équipe la même semaine
-- -------------------------------------------------------------
INSERT INTO reserver_staff (staff_id, room_id, date_resa, heure_debut, heure_fin, motif) VALUES
(2, 1, '2026-11-16', '09:00', '11:00', 'Grand ménage du Salon'),
(3, 3, '2026-11-19', '10:00', '12:00', 'Visite du vétérinaire'),
(1, 2, '2026-11-20', '18:00', '21:00', 'Soirée privatisée : atelier dessin');

-- -------------------------------------------------------------
-- CATS (cat_id 1 à 20)
-- customer_id + date_adoption remplis seulement pour les adoptés
-- -------------------------------------------------------------
INSERT INTO cats (nom, date_arrivee, date_depart, date_naissance, race, sexe, customer_id, date_adoption) VALUES
('Mochi',     '2025-02-10', NULL,         '2022-05-14', 'Européen',            'F', NULL, NULL),        -- 1
('Pixel',     '2025-04-03', NULL,         '2023-08-01', 'Bengal',              'M', NULL, NULL),        -- 2
('Tofu',      '2025-05-20', NULL,         '2021-03-22', 'Ragdoll',             'M', NULL, NULL),        -- 3
('Miso',      '2025-07-11', NULL,         '2024-01-09', 'Européen',            'F', NULL, NULL),        -- 4
('Biscotte',  '2025-08-30', NULL,         '2019-11-30', 'Chartreux',           'F', NULL, NULL),        -- 5
('Gribouille','2025-09-14', NULL,         '2023-02-17', 'Européen',            'M', NULL, NULL),        -- 6
('Noisette',  '2025-10-02', NULL,         '2022-09-05', 'Sacré de Birmanie',   'F', NULL, NULL),        -- 7
('Ficelle',   '2025-11-18', NULL,         '2024-04-12', 'Européen',            'F', NULL, NULL),        -- 8
('Caramel',   '2025-12-01', NULL,         '2020-07-25', 'Maine Coon',          'M', NULL, NULL),        -- 9
('Plume',     '2026-01-07', NULL,         '2023-12-03', 'Siamois',             'F', NULL, NULL),        -- 10
('Sushi',     '2026-01-22', NULL,         NULL,         'Inconnu',             'M', NULL, NULL),        -- 11
('Réglisse',  '2026-02-15', NULL,         '2018-10-10', 'Européen',            'M', NULL, NULL),        -- 12
('Praline',   '2026-03-03', NULL,         '2025-01-20', 'British Shorthair',   'F', NULL, NULL),        -- 13
('Chaussette','2026-03-28', NULL,         '2022-02-28', 'Européen',            'M', NULL, NULL),        -- 14
('Olive',     '2026-04-16', NULL,         '2024-09-09', 'Norvégien',           'F', NULL, NULL),        -- 15
('Gaufre',    '2026-05-09', NULL,         '2025-03-02', 'Européen',            'M', NULL, NULL),        -- 16
('Pistache',  '2026-06-21', NULL,         '2023-05-15', 'Persan',              'F', NULL, NULL),        -- 17
('Bao',       '2025-06-01', '2026-09-12', '2021-12-01', 'Européen',            'M', NULL, '2026-09-12'),-- 18 : adopté, client déjà supprimé
('Câline',    '2025-03-17', '2026-11-18', '2020-04-04', 'Sacré de Birmanie',   'F', 3,    '2026-11-18'),-- 19 : adoptée par le client 3
('Filou',     '2025-10-25', '2026-11-19', '2024-02-14', 'Européen',            'M', 5,    '2026-11-19');-- 20 : adopté par le client 5

-- -------------------------------------------------------------
-- GERER — chaque chat a au moins un référent (cardinalité 1N)
-- Lucas : chats 1 à 10, Inès : chats 11 à 20,
-- Pomme suit en plus les cas particuliers (âgés, timides, adoptions)
-- -------------------------------------------------------------
INSERT INTO gerer (staff_id, cat_id) VALUES
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
(3, 11), (3, 12), (3, 13), (3, 14), (3, 15), (3, 16), (3, 17), (3, 18), (3, 19), (3, 20),
(1, 5), (1, 12), (1, 19), (1, 20);

COMMIT;
