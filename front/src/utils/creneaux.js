import { HORAIRES, placesBloquees } from "../data/salles.js"
import { heureDe } from "./dates.js"

export function regrouperParCreneau(reservations) {
    return HORAIRES.map((heure) => {
        const duCreneau = reservations.filter((r) => heureDe(r.date_reservation) === heure)
        const bloquees = duCreneau.reduce((total, r) => total + placesBloquees(r.places_reservation), 0)
        return { heure, reservations: duCreneau, bloquees }
    })
}