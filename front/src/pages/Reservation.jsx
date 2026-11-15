import { useState, useEffect} from "react"
import { listerSalles } from "../services/roomApi.js"
import CarteSalle from "../components/CarteSalle/CarteSalle.jsx"


function Reservation() {
    const [salles, setSalles] = useState([])
    const [chargement, setChargement] = useState(true)
    const[erreur, setErreur] = useState("")
    const [salleChoisie, setSalleChoisie] = useState(null)

    useEffect(()=> {
        listerSalles()
            .then((data) => setSalles(data))
            .catch((err) => setErreur(err.message))
            .finally(() => setChargement(false))
    }, [])

    if(chargement) return <p>Chargement des salles...</p>
    if(erreur) return <p role="alert">{erreur}</p>
    if(salleChoisie) {
        return (
            <section>
                <h2>Reserver : {salleChoisie.nom}</h2>
                <button onClick={() => setSalleChoisie(null)}>Changer de salle</button>
                <p>Le formulaire arrive à l'étape suivante.</p>
            </section>
        )
    }

    return (
        <section>
            <h2>Réserver</h2>
            <div className="liste-salles">
                {salles.map((salle) =>(
                    <CarteSalle key={salle.id} salle={salle} onChoisir={setSalleChoisie}/>
                ))}
            </div>
        </section>
    )
} 

export default Reservation