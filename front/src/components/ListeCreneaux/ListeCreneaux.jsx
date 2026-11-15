import "./ListeCreneaux.css";
import LigneReservation from "../LigneReservation/LigneReservation.jsx";

function ListeCreneaux({ creneaux, capacite, onModifier, onSupprimer }) {
  return (
    <ul className="liste-creneaux">
      {creneaux.map((c) => (
        <li
          key={c.heure}
          className={c.bloquees > 0 ? "creneau occupe" : "creneau"}
        >
          <div className="creneau-entete">
            <span className="creneau-heure">{c.heure}</span>
            <span>{c.reservations.length} réservation(s)</span>
            <span>
              {c.bloquees} / {capacite} places
            </span>
          </div>

          {c.reservations.length > 0 && (
            <ul className="creneau-details">
              {c.reservations.map((r) => (
                <LigneReservation
                    key={r.id}
                    reservation={r}
                    capacite={capacite}
                    onModifier={onModifier}
                    onSupprimer={onSupprimer}    
                />
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ListeCreneaux;
