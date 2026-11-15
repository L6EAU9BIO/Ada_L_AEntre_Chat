import "./ListeCreneaux.css";

function ListeCreneaux({ creneaux, capacite, onSupprimer }) {
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
                <li key={r.id}>
                  {r.places_reservation} personne(s)
                  <button
                    type="button"
                    className="supprimer"
                    onClick={() => onSupprimer(r.id)}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ListeCreneaux;
