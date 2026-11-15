import "./ListeCreneaux.css"

function ListeCreneaux({ creneaux, capacite }) {
    return (
        <ul className="liste-creneaux">
            {creneaux.map((c) => (
                <li key={c.heure} className={c.bloquees > 0 ? "creneau occupe" : "creneau"}>
                    <span className="creneau-heure">{c.heure}</span>
                    <span>{c.reservations.length} réservation(s)</span>
                    <span>{c.bloquees} / {capacite} places</span>
                </li>
            ))}
        </ul>
    )
}

export default ListeCreneaux