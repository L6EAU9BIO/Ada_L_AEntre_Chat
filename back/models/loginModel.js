import { db } from '../server/db.js'


// Les colonnes qu'on peut renvoyer au front : jamais le hash
const COLONNES_PUBLIQUES = 'id, prenom, email, role, date_inscription';

export async function trouverParMail(email) {
    const { rows } = await db.query(
        `SELECT ${COLONNES_PUBLIQUES}, mot_de_passe_hash FROM customers WHERE mail = $1`, 
        [email]
    )
    return rows[0] ?? null;
}

export async function creat({ prenom, nom, email, num_tel, motDePasseHash}) {
    const { rows } = await db.query(
        `INSERT INTO customers (prenom, nom, email, telephone, mot_de_passe_hash)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING ${COLONNES_PUBLIQUES}`, 
        [prenom, nom, email, num_tel, motDePasseHash]
    )
    return rows[0]
}