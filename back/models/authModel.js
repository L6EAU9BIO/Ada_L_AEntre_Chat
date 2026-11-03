import { pool } from '../server/db.js'


// Les colonnes qu'on peut renvoyer au front : jamais le hash
const COLONNES_PUBLIQUES = 'id, nom, prenom, mail as email, num_tel as tel, role, date_arrivee';

export async function trouverParEmail(email) {
    const { rows } = await pool.query(
        `SELECT ${COLONNES_PUBLIQUES}, mot_de_passe_hash FROM customers WHERE mail = $1`, 
        [email]
    )
    return rows[0] ?? null;
}

export async function creat({ prenom, nom, email, tel, motDePasseHash}) {
    const { rows } = await pool.query(
        `INSERT INTO customers (prenom, nom, mail, num_tel, mot_de_passe_hash)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING ${COLONNES_PUBLIQUES}`, 
        [prenom, nom, email, tel, motDePasseHash]
    )
    return rows[0]
}