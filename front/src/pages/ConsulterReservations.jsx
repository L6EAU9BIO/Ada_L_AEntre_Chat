import { useState } from "react";
import { useSalles } from "../hooks/useSalles.js";
import { useReservations } from "../hooks/useReservations.js";
import { regrouperParCreneau } from "../utils/creneaux.js";
import { formaterDate, aujourdhui, heureDe } from "../utils/dates.js";
import ChoixSalle from "../components/ChoixSalle/ChoixSalle.jsx";
import ListeCreneaux from "../components/ListeCreneaux/ListeCreneaux.jsx";
import "./ConsulterReservations.css";

function ConsulterReservations() {
  const [salleId, setSalleId] = useState(null);
  const [date, setDate] = useState(aujourdhui());

  const { salles, erreur: erreurSalles } = useSalles();
  const salleActive = salleId ?? salles[0]?.id ?? null;
  const salle = salles.find((s) => s.id === salleActive);

  const { reservations, erreur, supprimer, modifier } = useReservations(
    salleActive,
    date,
  );

  function handleSupprimer(id) {
    if (window.confirm("Supprimer cette reservation ?")) {
      supprimer(id);
    }
  }

  function handleModifier(reservation, personnes) {
    return modifier(reservation.id, {
        date_reservation: `${date}T${heureDe(reservation.date_reservation)}`,
        places_reservation: personnes,
        room_id: reservation.room_id,
    })
  }

  return (
    <section className="consulter">
      <ChoixSalle
        salles={salles}
        salleActive={salleActive}
        onChoisir={setSalleId}
      />

      <label htmlFor="date-consulter">Date</label>
      <input
        id="date-consulter"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {date !== "" && <h3>{formaterDate(date)}</h3>}
      {(erreurSalles || erreur) && (
        <p role="alert" className="bandeau-erreur">{erreurSalles || erreur}</p>
      )}

      <ListeCreneaux
        creneaux={regrouperParCreneau(reservations)}
        capacite={salle?.nbr_places}
        onModifier={handleModifier}
        onSupprimer={handleSupprimer}
      />
    </section>
  );
}

export default ConsulterReservations;
