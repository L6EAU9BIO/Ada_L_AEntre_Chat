-- =============================================================
-- L'Æntre Chat — migration DOWN
-- Supprime toutes les tables, dans l'ordre inverse de la création :
-- d'abord celles qui ont des clés étrangères, puis les tables fortes.
-- ⚠️ Efface toutes les données de la base.
-- =============================================================

BEGIN;

DROP TABLE IF EXISTS gerer;
DROP TABLE IF EXISTS reserver_staff;
DROP TABLE IF EXISTS reserver_customer;
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS staff;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS customer;

COMMIT;
