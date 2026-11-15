import './FormulaireReservation.css'
import { useEffect,useState } from "react";
import { listerReservation } from "../../services/reservationApi.js"
import { HORAIRES,PLACES_PAR_TABLES, placesBloquees } from "../../data/salles.js";

function FormulaireReservation({ salle, onRetour }) {
  const [personnes, setPersonnes] = useState(1);
  const places = placesBloquees(personnes);
  const aujourdhui = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState("")
  const [horaire,setHoraire] = useState("")
  const [reservationsDuJour, setReservationDuJour] = useState([])

  useEffect(() => {
    if(date === "") return;
    listerReservation(salle.id, date)
        .then((data) => setReservationDuJour(data))
        .catch(() => setReservationDuJour([]));
  }, [date, salle.id]);

  function moins() {
    setPersonnes((n) => Math.max(1, n - 1));
  }

  function plus() {
    setPersonnes((n) =>
      placesBloquees(n + 1) <= salle.nbr_places ? n + 1 : n,
    );
  }

  function heureDe(dateTexte) {
    const heure = new Date(dateTexte).getHours();
    return `${String(heure).padStart(2, "0")}:00`
  }

  function placesOccupees(h) {
    return reservationsDuJour
        .filter((r) => heureDe(r.date_reservation) === h)
        .reduce((total, r) => total + placesBloquees(r.places_reservation), 0);
  }
  
  function estPasse(h) {
    return date === aujourdhui && Number(h.slice(0,2)) <= new Date().getHours();
  }

  const horairesDisponibles =
    date === ""
        ? []
        : HORAIRES.filter((h) => !estPasse(h) && placesOccupees(h) + places <= salle.nbr_places);

  return (
    <section>
      <button type="button" onClick={onRetour}>
        Changer de salle
      </button>
      <h2>Réserver : {salle.nom}</h2>
      <div className="compteur">
        <button type="button" onClick={moins}>
          -
        </button>
        <span>{personnes}</span>
        <button type="button" onClick={plus}>
          +
        </button>
      </div>
      <p>
        {places / PLACES_PAR_TABLES} tables(s) - {places} places bloqué(es)
      </p>
      <label htmlFor="date">Date</label>
      <input
        id="date"
        type="date"
        min={aujourdhui}
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <p>Date choisie : {date}</p>

      <p>Horaire</p>

        {date === "" && <p>Choisis d'abord une date.</p>}
        {date !== "" && horairesDisponibles.length === 0 && (
            <p>Plus aucun créneau disponible ce jour.</p>
        )}

      <div className="horaires">
        {horairesDisponibles.map((h) => (
            <button
                type="button"
                key={h}
                className={h === horaire ? "horaire actif" : "horaire"}
                onClick={() => setHoraire(h)}
            >
                {h}
            </button>
        ))}
      </div>
      <p>Horaire choisi : {horaire}</p>
    </section>
  );
}

export default FormulaireReservation;
