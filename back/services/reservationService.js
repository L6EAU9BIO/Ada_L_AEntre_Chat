import * as reservationModel from "../models/reservationModel.js"
import * as roomModel from "../models/roomModel.js"
import { ErrorHttp } from "../server/erreurs.js"
import { placesBloquees } from "../utils/reservation.js"

function erreur400(message){
    return new ErrorHttp(400, message)
}

async function verifierCapacite(room_id, date_reservation, personnes, idExclu = null) {
    const salle = await roomModel.findById(room_id)
    if(!salle) throw new ErrorHttp(404, "Salle introuvable")

        const reservations = await reservationModel.findByRoomAndCreneau(room_id, date_reservation, idExclu)
        const dejaBloquee = reservations.reduce(
            (total, r) => total + placesBloquees(r.places_reservation), 0
        )

    if(dejaBloquee + placesBloquees(personnes) > salle.nbr_places) {
        throw new ErrorHttp(409, "Plus assez de place dans cette salle sur ce créneau", {
            places_restantes: Math.max(0, salle.nbr_places - dejaBloquee)
        })
    }
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
    
    await verifierCapacite(data.room_id, data.date_reservation, data.places_reservation)
    
    return reservationModel.creat(data)
}

export async function updateReservation(id, data) {
    const actuelle = await reservationModel.findById(id)
    if(!actuelle) return null

    await verifierCapacite(
        actuelle.room_id,
        data.date_reservation ?? actuelle.date_reservation,
        data.places_reservation ?? actuelle.places_reservation,
        id
    )
    return reservationModel.updateReservation(id, data)
}

export async function deleteReservation(id){
    return reservationModel.remove(id)
}