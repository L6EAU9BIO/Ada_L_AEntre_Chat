import { useCallback, useEffect, useState } from "react"
import { listerReservation } from "../services/reservationApi.js"

export function useReservations(salleId, date) {
    const [reservations, setReservations] = useState([])
    const [erreur, setErreur] = useState("")

    const recharger = useCallback(() => {
        if (salleId === null || date === "") return
        listerReservation(salleId, date)
            .then((data) => setReservations(data))
            .catch((err) => setErreur(err.message))
    }, [salleId, date])

    useEffect(() => {
        recharger()
    }, [recharger])

    return { reservations, erreur, recharger }
}