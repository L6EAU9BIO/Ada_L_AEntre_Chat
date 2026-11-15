// Role : acces aux donnée (requete SQL uniquement)
// Ne contient pas : 


import { pool } from '../server/db.js'

async function verifierConnexion() {
    const result = await pool.query('SELECT NOW() AS heure_serveur')
    return result.rows[0]
}

export default { verifierConnexion }