import { useState } from "react";
import "./LigneReservation.css"

function LigneReservation({ reservation, capacite, onModifier, onSupprimer}) {
    const [edition, setEdition] = useState(false)
    const [personnes, setPersonnes] = useState(reservation.places_reservation)

    async function enregistrer() {
        const reussi = await onModifier(reservation, personnes)
        if(reussi) setEdition(false)
    }

    function annuler() {
        setPersonnes(reservation.places_reservation)
        setEdition(false)
    }

    if(edition) {
        return (
            <li className="ligne-reservation">
                <div className="compteur-mini">
                    <button type="button" onClick={() => setPersonnes((n) => Math.max(1, n - 1))}>-</button>
                    <span>{personnes}</span>
                    <button type="button" onClick={() => setPersonnes((n) => Math.min(capacite, n+ 1))}>+</button>
                </div>
                <div className="actions">
                    <button type="button" className="enregistrer" onClick={enregistrer}>Enregistrer</button>
                    <button type="button" className="annuler" onClick={annuler}>Annuler</button>
                </div>
            </li>
        )
    }

    return (
        <li className="ligne-reservation">
            {reservation.places_reservation} personne(s)
            <div className="actions">
                <button type="button" className="modifier" onClick={() => setEdition(true)}>Modifier</button>
                <button type="button" className="supprimer" onClick={() => onSupprimer(reservation.id)}>Supprimer</button>
            </div>
        </li>
    )
}

export default LigneReservation
