import { useCallback, useEffect, useState } from "react"
import { listerReservation, modifierReservation, supprimeReservation } from "../services/reservationApi.js"


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

    const modifier = useCallback(async (id, data) =>{
        setErreur("")
        try{
            await modifierReservation(id, data)
            recharger()
            return true
        } catch (err) {
            setErreur(err.message)
            return false
        }
    }, [recharger])

    return { reservations, erreur, recharger, supprimer, modifier }
}