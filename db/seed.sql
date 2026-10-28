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
-- STAFFS (id 1 = Pomme, 2 = Lucas, 3 = Inès)
-- -------------------------------------------------------------
INSERT INTO staffs (nom, prenom, num_tel, role, mail, date_arrivee, date_depart) VALUES
('Martin',  'Pomme', '06 00 00 01 01', 'gerant',  'pomme@laentrechat.fr', '2024-03-01', NULL),
('Garnier', 'Lucas', '06 00 00 01 02', 'employe', 'lucas@laentrechat.fr', '2025-06-15', NULL),
('Moreau',  'Inès',  '06 00 00 01 03', 'employe', 'ines@laentrechat.fr',  '2026-01-05', NULL);

-- -------------------------------------------------------------
-- ROOMS (id 1 = Salon, 2 = L'Étage, 3 = Cocon)
-- -------------------------------------------------------------
INSERT INTO rooms (nom, nbr_places, acces_pmr, description) VALUES
('Le Salon', 20, true,
 'La grande salle de plain-pied, ouverte sur la vitrine. Canapés, tables basses et arbres à chats au plafond : c''est ici que la plupart des pensionnaires font la sieste au soleil. Idéale pour les groupes et les anniversaires.'),
('L''Étage', 15, false,
 'Au premier étage, accessible uniquement par un escalier en colimaçon. Ambiance bibliothèque, lumière tamisée, coussins au sol et passerelles murales pour les chats grimpeurs. Parfaite pour lire ou travailler au calme.'),
('Le Cocon', 6, true,
 'Petite pièce feutrée en rez-de-chaussée, pensée pour les chats timides et les visites en petit comité. Éclairage doux, bruit limité, accès de plain-pied. Recommandée pour une première rencontre avant une adoption.');

-- -------------------------------------------------------------
-- CUSTOMERS (id 1 à 8)
-- -------------------------------------------------------------
INSERT INTO customers (nom, prenom, num_tel, role, mail, date_arrivee) VALUES
('Dupuis',   'Claire',  '06 00 00 02 01', 'client',   'claire.dupuis@exemple.fr',   '2026-11-16'), -- 1
('Lefebvre', 'Hugo',    '06 00 00 02 02', 'client',   'hugo.lefebvre@exemple.fr',   '2026-11-17'), -- 2
('Nguyen',   'Linh',    '06 00 00 02 03', 'adoptant', 'linh.nguyen@exemple.fr',     '2026-10-04'), -- 3
('Rousseau', 'Paul',    '06 00 00 02 04', 'adoptant', 'paul.rousseau@exemple.fr',   '2026-05-20'), -- 4 : a rendu Bao
('Benali',   'Yasmine', '06 00 00 02 05', 'adoptant', 'yasmine.benali@exemple.fr',  '2026-10-21'), -- 5
('Fontaine', 'Jeanne',  '06 00 00 02 06', 'client',   'jeanne.fontaine@exemple.fr', '2026-11-21'), -- 6
('Le Goff',  'Erwan',   '06 00 00 02 07', 'client',   NULL,                          '2026-11-21'), -- 7
('Perrin',   'Sacha',   '06 00 00 02 08', 'adoptant', 'sacha.perrin@exemple.fr',    '2026-11-22'); -- 8 : rencontre, adoption pas encore faite

-- -------------------------------------------------------------
-- CATS (id 1 à 20)
-- -------------------------------------------------------------
INSERT INTO cats (nom, date_arrivee, date_depart, date_naissance, race, sexe) VALUES
('Mochi',      '2025-02-10', NULL,         '2022-05-14', 'Européen',          'F'), -- 1
('Pixel',      '2025-04-03', NULL,         '2023-08-01', 'Bengal',            'M'), -- 2
('Tofu',       '2025-05-20', NULL,         '2021-03-22', 'Ragdoll',           'M'), -- 3
('Miso',       '2025-07-11', NULL,         '2024-01-09', 'Européen',          'F'), -- 4
('Biscotte',   '2025-08-30', NULL,         '2019-11-30', 'Chartreux',         'F'), -- 5
('Gribouille', '2025-09-14', NULL,         '2023-02-17', 'Européen',          'M'), -- 6
('Noisette',   '2025-10-02', NULL,         '2022-09-05', 'Sacré de Birmanie', 'F'), -- 7
('Ficelle',    '2025-11-18', NULL,         '2024-04-12', 'Européen',          'F'), -- 8
('Caramel',    '2025-12-01', NULL,         '2020-07-25', 'Maine Coon',        'M'), -- 9
('Plume',      '2026-01-07', NULL,         '2023-12-03', 'Siamois',           'F'), -- 10
('Sushi',      '2026-01-22', NULL,         NULL,         'Inconnu',           'M'), -- 11
('Réglisse',   '2026-02-15', NULL,         '2018-10-10', 'Européen',          'M'), -- 12
('Praline',    '2026-03-03', NULL,         '2025-01-20', 'British Shorthair', 'F'), -- 13
('Chaussette', '2026-03-28', NULL,         '2022-02-28', 'Européen',          'M'), -- 14
('Olive',      '2026-04-16', NULL,         '2024-09-09', 'Norvégien',         'F'), -- 15
('Gaufre',     '2026-05-09', NULL,         '2025-03-02', 'Européen',          'M'), -- 16
('Pistache',   '2026-06-21', NULL,         '2023-05-15', 'Persan',            'F'), -- 17
('Bao',        '2025-06-01', NULL,         '2021-12-01', 'Européen',          'M'), -- 18
('Câline',     '2025-03-17', '2026-11-18', '2020-04-04', 'Sacré de Birmanie', 'F'), -- 19 : adoptée par le client 3
('Filou',      '2025-10-25', '2026-11-19', '2024-02-14', 'Européen',          'M'); -- 20 : adopté par le client 5

-- -------------------------------------------------------------
-- RESERVATIONS — semaine du 16 au 22 novembre 2026
-- room_id : 1 = Salon (20), 2 = L'Étage (15), 3 = Cocon (6)
-- Soit customer_id (réservation client), soit staff_id (créneau bloqué par l'équipe)
-- -------------------------------------------------------------
INSERT INTO reservations (date_reservation, places_reservation, customer_id, staff_id, room_id) VALUES
('2026-11-16 09:00', 20, NULL, 2, 1),  -- lundi, Lucas bloque le Salon (grand ménage)
('2026-11-16 14:00',  4, 1,    NULL, 1),  -- lundi, Salon
('2026-11-17 10:30',  2, 2,    NULL, 3),  -- mardi, Cocon
('2026-11-18 15:00',  8, 3,    NULL, 2),  -- mercredi, Étage (anniversaire)
('2026-11-18 16:00',  6, 4,    NULL, 1),  -- mercredi, Salon
('2026-11-19 10:00',  6, NULL, 3, 3),  -- jeudi, Inès bloque le Cocon (vétérinaire)
('2026-11-19 14:00',  3, 5,    NULL, 3),  -- jeudi, Cocon (accès PMR)
('2026-11-20 18:00', 15, NULL, 1, 2),  -- vendredi, Pomme privatise l'Étage (atelier dessin)
('2026-11-21 11:00', 12, 6,    NULL, 1),  -- samedi, Salon
('2026-11-21 14:00',  5, 7,    NULL, 2),  -- samedi, Étage
('2026-11-22 16:00',  2, 8,    NULL, 3);  -- dimanche, Cocon (rencontre avec Bao)

-- -------------------------------------------------------------
-- INTERVENTIONS — soins et suivi des chats
-- staff_id : 1 = Pomme, 2 = Lucas, 3 = Inès
-- -------------------------------------------------------------
INSERT INTO interventions (date_intervention, motif, resultat, cat_id, staff_id) VALUES
('2026-11-16', 'Brossage et contrôle des griffes', 'RAS',                                   9,  2),
('2026-11-17', 'Pesée mensuelle',                  '4,2 kg, poids stable',                 1,  2),
('2026-11-17', 'Vermifuge',                        'Donné, prochain dans 3 mois',          16, 3),
('2026-11-19', 'Visite du vétérinaire : rappel vaccin', 'Vaccin fait',                     12, 3),
('2026-11-19', 'Visite du vétérinaire : dents',    'Détartrage conseillé',                 5,  3),
('2026-11-19', 'Bilan avant adoption',             'Apte à l''adoption',                   20, 1),
('2026-11-20', 'Chat stressé, se cache',           'Isolé au Cocon, à surveiller',         11, 2),
('2026-11-21', 'Suivi après isolement',            'Ressort, mange normalement',           11, 3),
('2026-11-22', 'Préparation rencontre adoption',   'Rencontre positive avec le client 8', 18, 1);

-- -------------------------------------------------------------
-- CATS_CUSTOMERS
-- date_adoption NULL = rencontre faite, adoption pas encore conclue
-- date_retour rempli = adoption qui n'a pas abouti, le chat est revenu
-- Bao (18) apparaît deux fois, avec deux personnes différentes.
-- -------------------------------------------------------------
INSERT INTO cats_customers (cat_id, customer_id, date_rencontre, date_adoption, date_retour) VALUES
(18, 4, '2026-05-20', '2026-06-10', '2026-07-02'),  -- Bao adopté par Paul Rousseau, puis rendu
(19, 3, '2026-10-04', '2026-11-18', NULL),          -- Câline adoptée par Linh Nguyen
(20, 5, '2026-10-21', '2026-11-19', NULL),          -- Filou adopté par Yasmine Benali
(18, 8, '2026-11-22', NULL,         NULL);          -- Bao rencontré par Sacha Perrin

COMMIT;
