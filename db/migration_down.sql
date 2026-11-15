-- =============================================================
-- L'Æntre Chat — migration DOWN
-- Supprime toutes les tables, dans l'ordre inverse de la création :
-- d'abord celles qui ont des clés étrangères, puis les autres.
-- ⚠️ Efface toutes les données de la base.
-- =============================================================

BEGIN;

DROP TABLE IF EXISTS cats_customers;
DROP TABLE IF EXISTS interventions;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS cats;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS staffs;

COMMIT;
