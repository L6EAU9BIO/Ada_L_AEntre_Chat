import { useState, useEffect} from "react"
import { listerSalles } from "../services/roomApi.js"


function Reservation() {
    const [salles, setSalles] = useState([])
    const [chargement, setChargement] = useState(true)
    const[erreur, setErreur] = useState("")

    useEffect(()=> {
        listerSalles()
            .then((data) => setSalles(data))
            .catch((err) => setErreur(err.message))
            .finally(() => setChargement(false))
    }, [])

    if(chargement) return <p>Chargement des salles...</p>
    if(erreur) return <p role="alert">{erreur}</p>

    return (
        <section>
            <h2>Réserver</h2>
            <ul>
                {salles.map((salle) =>(
                    <li key={salle.id}>
                        {salle.nom} - {salle.nbr_places} places
                    </li>
                ))}
            </ul>
        </section>
    )
} 

export default Reservation