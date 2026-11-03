import { pool } from "../server/db"

const COLLONES_AUTORISEES = [nom, date_arrivee, date_depart, date_naissance, race, sexe]

// SELECT de tous les chats
export async function findAll() {
    const { rows } = await pool.query(
        `SELECT * FROM cats ORDER BY id`)
        return rows
}

// SELECT d'un chat par id (undefined si introuvable)
export async function findById(id) {
    const { rows } = await pool.query(
        `SELECT * FROM cats WHERE id = $1, [id]`
    )
        return rows[0] || null
}

// INSERT d'un chat , puis retourn ela ligne crée
export async function insert({nom, date_arrivee, date_depart, date_naissance, race, sexe}){
    const { rows } = await pool.query(
        `INSERT INTO cats (nom, date_arrivee, date_depart, date_naissance, race, sexe) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * `,
        [nom, date_arrivee ?? null, date_depart, date_naissance ?? null, race, sexe ?? null]
    )
    return rows[0]
}

// UPDATE d'un chat , retourne la ligne modifiee ou null 
export async function update(id, data) {
    const champs = COLLONES_AUTORISEES.filter(coll => data[coll] !== undefined)
     const setClause = champs.map((coll, i) => `${coll} = $${i + 1}`).join(", ")
    const valeurs = champs.map(coll => data[coll])

    const { rows } = await pool.query(
        `UPDATE cats SET ${setClause} WHERE id = $${champs.length + 1} RETURNING *`,
        [...valeurs, id]
    )
    return rows[0] || null

}

// DELETE d'un chat, retourne true si une ligne a été supprimée
export async function remove(id) {
    const { rowCount } = await pool.query("DELETE FROM cats WHERE id = $1", [id])
    return rowCount > 0
}