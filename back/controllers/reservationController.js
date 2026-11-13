import * as reservationService from "../services/reservationService.js"
import { ErrorHttp } from "../server/erreurs.js"


function validerReservation({ date_reservation, places_reservation, room_id }) {
  const error = {}
  if (
    typeof date_reservation !== "string" ||
    date_reservation.trim() === "" ||
    Number.isNaN(Date.parse(date_reservation))
  ) {
    error.date_reservation = "La date est invalide"
  }
  if (!Number.isInteger(places_reservation) || places_reservation < 1) {
    error.places_reservation = "Il faut choisir un nombre de personnes"
  }
  if (!Number.isInteger(room_id)) {
    error.room_id = "Il faut choisir la room"
  }
  return error
}

// Route GET :  Permet d'avoir toutes les reservations -
export async function getReservation(req, res, next) {
    try {
        const reserv = await reservationService.getAllReserv(req.query.room_id , req.query.date)
        return res.status(200).json(reserv)
    } catch(error) {
        return next(error)
    }
}

// Route GET : Permet d'avoir les reservations par rapport a leurs ID -
export async function getReservationById(req, res, next) {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id < 1) {
      throw new ErrorHttp(400, "L'identifiant n'est pas valide")
    }

    const reservs = await reservationService.getReservationById(id)

    if (!reservs) {
      return res.status(404).json({ message: "Reservation introuvable" })
    }
    return res.status(200).json(reservs)
  } catch (error) {
    return next(error)
  }
}

// Route POST : Permet de creer une reservation -
export async function creatReservation(req, res, next) {
  try {
    const body = req.body ?? {}
    const error = validerReservation(body)
    if (Object.keys(error).length > 0) {
      throw new ErrorHttp(422, "Données invalides", error)
    }

    const reservs = await reservationService.creatReservation({
      ...body,
      staff_id: req.utilisateur.id,
    })
    return res.status(201).json(reservs)
  } catch (error) {
    return next(error)
  }
}

// Route PUT : Permet de modifier une reservation -
export async function updateReservation(req, res, next) {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id < 1) {
      throw new ErrorHttp(400, "L'identifiant n'est pas valide")
    }

    const body = req.body ?? {}
    const error = validerReservation(body)
    if (Object.keys(error).length > 0) {
      throw new ErrorHttp(422, "Données invalides", error)
    }

    const reservs = await reservationService.updateReservation(id, body)

    if (!reservs) {
      return res.status(404).json({ message: "Reservation introuvable" })
    }
    return res.status(200).json(reservs)
  } catch (error) {
    return next(error)
  }
}

// Route DELETE : Permet de supprimer une reservation 
export async function deleteReservation(req, res, next) {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id < 1) {
      throw new ErrorHttp(400, "L'identifiant n'est pas valide")
    }

    const supp = await reservationService.deleteReservation(id)

    if (!supp) {
      return res.status(404).json({ message: "Reservation introuvable" })
    }
    return res.status(204).send()
  } catch (error) {
    return next(error)
  }
}