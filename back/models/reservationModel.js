import { pool } from '../server/db.js'

export async function findByRoomAndDate(room_id , date_reservation){
    const { rows } = await pool.query(
        `SELECT *, 
                CASE WHEN customer_id IS NOT NULL THEN 'client'
                ELSE 'staff'
                END AS reserve_par
        FROM reservations
        WHERE room_id = $1
            AND date_reservation::date = $2
            ORDER BY date_reservation`, [room_id, date_reservation]
    ) 
    return rows
    // requete pour recuperer toute les reservation
}

export async function findById(id){
    // requete pour recuperer une reservation
    const { rows } = await pool.query(
        `SELECT date_reservation, places_reservation, room_id, customer_id, staff_id
        FROM reservations
        WHERE id = $1` , [id]
        
    )
    return rows [0]
}

export async function creat(data) {
    // requete pour créer un utilisateur
    const { rows } = await pool.query(
        `INSERT INTO reservations 
            (date_reservation, places_reservation, room_id, customer_id, staff_id) 
        VALUES ($1, $2, $3, $4,$5) 
        RETURNING *`, 
        [data.date_reservation, data.places_reservation, data.room_id, data.customer_id ?? null, data.staff_id ?? null]
    )
    return rows[0]
}

export async function updateReservation(id, data){
    // requete pour modifier une reservation
} 

export async function remove(id){
    // requete pour supprimer une reservation
}