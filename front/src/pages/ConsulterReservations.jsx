import { useEffect, useState } from "react"
import { listerSalles } from "../services/roomApi.js"
import { listerReservation } from "../services/reservationApi.js"
import { heureDe, formaterDate, aujourdhui } from "../utils/dates.js"
import './ConsulterReservations.css'

function ConsulterReservations(){

    const [salles, setSalles] = useState([])
    const [salleId, setSalleId] = useState(null)  
    const [date, setDate] = useState(aujourdhui())
    const [reservations, setReservations] = useState([])
    const [erreur, setErreur] = useState("")
    
    useEffect(() => {
        listerSalles()
            .then((data)=> {
                setSalles(data)
                if (data.length > 0) setSalleId(data[0].id)
            })
            .catch((err) => setErreur(err.message))
    }, [])
    
    useEffect(() => {
        if(salleId === null || date === "") return
        listerReservation(salleId, date)
            .then((data) => setReservations(data))
            .catch((err) => setErreur(err.message))
    }, [salleId, date])

    return (
        <section className="consulter">
            <div className="choix-salles">
                {salles.map((s) => (
                    <button
                        type="button"
                        key={s.id}
                        className={s.id === salleId ? "pastille actif" : "pastille"}
                        onClick={() => setSalleId(s.id)}
                    >
                        {s.nom}
                    </button>
                ))}
            </div>

            <label htmlFor="date-consulter">Date</label>
            <input 
                id="date-consulter"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            {date !== "" && <h3>{formaterDate(date)}</h3>}
            {erreur && <p role="alert">{erreur}</p>}

            {reservations.length === 0 ? (
                <p>Aucune réservation ce jour là.</p>
            ) : (
                <ul className="liste-reservations">
                    {reservations.map((r) => (
                        <li key={r.id}>
                            {heureDe(r.date_reservation)} - {r.places_reservation} personne(s)
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default ConsulterReservations