import { pool } from '../server/db.js'

export async function findAll(){
    // requete pour recuperer toute les reservation
}

export async function findById(){
    // requete pour recuperer une reservation
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