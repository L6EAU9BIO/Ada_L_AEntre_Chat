import { useCallback, useEffect, useState } from "react"
import { listerReservation, supprimeReservation } from "../services/reservationApi.js"


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

    const supprimer = useCallback(async (id) => {
        try{
            await supprimeReservation(id)
            recharger()
        } catch (err) {
            setErreur(err.message)
        }
    }, [recharger])

    return { reservations, erreur, recharger, supprimer }
}