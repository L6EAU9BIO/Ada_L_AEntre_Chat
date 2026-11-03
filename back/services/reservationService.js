import * as reservationModel from "../models/reservationModel.js"


function erreur400(message){
    const error = new Error(message)
    error.status = 400
    return error
}

export async function getAllReserv(room_id, date_reservation) {
    if(!room_id) throw erreur400("Le choix de la salle est obligatoire")
    if(!date_reservation) throw erreur400("Le choix de la date est obligatoire")
    return reservationModel.findByRoomAndDate(room_id, date_reservation)
}

export async function getReservationById(id) {
    return reservationModel.findById(id)
}

export async function creatReservation(data) {
    // if (!data.name || !data.email) throw erreur400("Le nom et l'adresse mail sont obligatoire") 
        // on vérifie la présence des champs obligatoires.
    if(!data.date_reservation) throw erreur400("La date est obligatoire")
    if(!data.room_id) throw erreur400("Le choix d'une salle est obligatoire")
    if(!(data.places_reservation > 0)) throw erreur400("Vous devez reserver au moins une place")
    if(!data.customer_id && !data.staff_id) throw erreur400("La réservation doit être liée à un client ou à un membre de l’équipe")
    
    return reservationModel.creat(data)
}

export async function updateReservation(id, data) {
    return reservationModel.remove(id)
}