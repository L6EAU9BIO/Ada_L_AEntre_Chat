import * as reservationModel from "../models/reservationModel.js"

export async function getAllReserv() {
    return reservationModel.findAll()
}

export async function getReservationById(id) {
    return reservationModel.findById(id)
}

export async function creatReservation(data) {
    if (!data.name || !data.email) { // on vérifie la présence des champs obligatoires.
        const error = new Error("Le nom et l'adresse mail sont obligatoire")
        error.status = 400
        throw error
    }
    return reservationModel.creat(data)
}

export async function updateReservation(id, data) {
    return reservationModel.remove(id)
}