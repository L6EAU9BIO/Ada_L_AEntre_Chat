import { useState } from "react";
import { PLACES_PAR_TABLES, placesBloquees } from "../../data/salles.js";

function FormulaireReservation({ salle, onRetour }) {
  const [personnes, setPersonnes] = useState(1);
  const places = placesBloquees(personnes);
  const aujourdhui = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState("")

  function moins() {
    setPersonnes((n) => Math.max(1, n - 1));
  }

  function plus() {
    setPersonnes((n) =>
      placesBloquees(n + 1) <= salle.nbr_places ? n + 1 : n,
    );
  }

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
    </section>
  );
}

export default FormulaireReservation;
