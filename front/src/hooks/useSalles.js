import { useEffect, useState } from "react"
import { listerSalles } from "../services/roomApi.js"

export function useSalles() {
    const [salles, setSalles] = useState([])
    const [chargement, setChargement] = useState(true)
    const [erreur, setErreur] = useState("")

    useEffect(() => {
        listerSalles()
            .then((data) => setSalles(data))
            .catch((err) => setErreur(err.message))
            .finally(() => setChargement(false))
    }, [])

    return { salles, chargement, erreur }
}