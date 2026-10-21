// IMPORTS

import express from "express";
import cors from 'cors';
import { pool } from "./db.js";

console.log("cwd :", process.cwd());
console.log("DB_USER :", process.env.DB_USER);
console.log("type DB_PASSWORD :", typeof process.env.DB_PASSWORD);

// MIDLLEWARE

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES

// TEST DE CONNEXION AU DÉMARRAGE

// Fonction asynchrone :
// pour attendre la réponse de MySQL sans bloquer le reste du programme.
async function testConnexion() {
  // try/catch : on essaie d'exécuter le code, et si une erreur survient
  // (serveur éteint, mauvais mot de passe...), on la récupère dans "catch".
  try {
    // pool.query() envoie la requête SQL à MySQL
    // La réponse est un tableau [rows, fields] : on ne garde que "rows"
    // "AS ok" et "AS heure_serveur" donnent un nom aux colonnes retournées.
    const { rows } = await pool.query('SELECT 1 AS ok, NOW() AS heure_serveur');

    // rows est un tableau de lignes. Comme on n'a qu'une seule ligne,
    // on affiche rows[0], par exemple : { ok: 1, heure_serveur: 2026-10-19T... }
    console.log('Connexion PostgreSQL OK :', rows[0]);
  } catch (err) {
    // Si la connexion échoue, on affiche uniquement le message d'erreur
    // (err.message) pour que ce soit lisible dans la console.
    console.error('Erreur de connexion PostgreSQL :', err.message);
  }
}
// ROUTE DE TEST 

// Une route GET accessible 
// MIDDLEWARE ERREUR (après les routes)
// "req" = la requête reçue , "res" = la réponse  renvoyer.
// La fonction est "async" car elle interroge la base de données.
app.get('/db-test', async (req, res) => {
  try {
    // On demande simplement l'heure au serveur MySQL.
    // Si y'a une réponse, c'est que la connexion fonctionne.
    const {rows} = await pool.query('SELECT NOW() AS heure_serveur');

    // On renvoie une réponse JSON au navigateur.
    // "...rows[0]" copie le contenu de la première ligne dans l'objet,
    // ce qui donne : { connecte: true, heure_serveur: "..." }
    res.json({ connecte: true, ...rows[0] });
  } catch (err) {
    // En cas d'erreur, on renvoie le code HTTP 500 (erreur serveur)
    res.status(500).json({ connecte: false, erreur: err.message });
  }
});

// DÉMARRAGE DU SERVEUR EXPRESS

// Lance le serveur web sur le port 3000.
// La fonction passée en second argument est appelée une fois le serveur prêt.
app.listen(3000, () => {
  console.log('Serveur sur http://localhost:3000');

  // On lance le test de connexion MySQL juste après le démarrage,
  // pour savoir immédiatement dans la console si la base répond.
  testConnexion();
});

// MIDDLEWARE ERREUR

app.use((err, req, res, next) => {  // remise en place du next 
    console.error('[erreur]', err.message);
    return res.status(500).json({erreur : "Une erreur est survenue"});
});

