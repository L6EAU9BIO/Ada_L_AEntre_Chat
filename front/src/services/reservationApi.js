import { request } from "./api.js";

export function listerReservation(roomId, date) {
    const params = new URLSearchParams({room_id: roomId, date})
    return request(`/reservation?${params}`)
}

export function creerReservation(reservation){
    return request("/reservation", {
        method: "POST",
        body: JSON.stringify(reservation)
    })
}

export function supprimeReservation(id){
    return request(`/reservation/${id}`, {method: "DELETE"})
}