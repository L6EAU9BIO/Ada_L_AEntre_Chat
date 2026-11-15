import { pool } from "../server/db.js"

export async function findAll() {
    const { rows } = await pool.query(
        `SELECT id, nom, nbr_places, acces_pmr, description
        FROM rooms
        ORDER BY id`
    )
    return rows
}

export async function findById(id) {
    const { rows } = await pool.query(
        `SELECT id, nom, nbr_places
        FROM rooms
        WHERE id= $1`,
        [id]
    )
    return rows[0] || null
}