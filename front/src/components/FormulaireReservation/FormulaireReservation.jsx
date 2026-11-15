import "./FormulaireReservation.css";
import { heureDe, formaterDate } from "../../utils/dates.js";
import { useEffect, useState } from "react";
import {
  creerReservation,
  listerReservation,
} from "../../services/reservationApi.js";
import {
  HORAIRES,
  PLACES_PAR_TABLES,
  placesBloquees,
} from "../../data/salles.js";

function FormulaireReservation({ salle, onRetour }) {
  const [personnes, setPersonnes] = useState(1);
  const places = placesBloquees(personnes);
  const aujourdhui = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState("");
  const [horaire, setHoraire] = useState("");
  const [reservationsDuJour, setReservationDuJour] = useState([]);
  const [envoi, setEnvoi] = useState(false);
  const [message, setMessage] = useState("");
  const [erreurEnvoi, setErreurEnvoi] = useState("");

  useEffect(() => {
    if (date === "") return;
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

  function placesOccupees(h) {
    return reservationsDuJour
      .filter((r) => heureDe(r.date_reservation) === h)
      .reduce((total, r) => total + placesBloquees(r.places_reservation), 0);
  }

  function estPasse(h) {
    return (
      date === aujourdhui && Number(h.slice(0, 2)) <= new Date().getHours()
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setErreurEnvoi("");
    setEnvoi(true);

    try {
      await creerReservation({
        date_reservation: `${date}T${horaireValide}`,
        places_reservation: personnes,
        room_id: salle.id,
      });
      setMessage(
        `Réservation enregistrée : ${personnes} personne(s) le ${formaterDate(date)} à ${horaireValide}.`,
      );
      setHoraire("");
      const data = await listerReservation(salle.id, date);
      setReservationDuJour(data);
    } catch (err) {
      setErreurEnvoi(err.message);
    } finally {
      setEnvoi(false);
    }
  }

  const horairesDisponibles =
    date === ""
      ? []
      : HORAIRES.filter(
          (h) => !estPasse(h) && placesOccupees(h) + places <= salle.nbr_places,
        );

  const horaireValide = horairesDisponibles.includes(horaire) ? horaire : "";
  const complet = horaireValide !== "";

  return (
    <div className="reservation-layout">
      <aside className="fiche-salle">
        <button type="button" className="retour" onClick={onRetour}>
          Changer de salle
        </button>
        <h2>{salle.nom}</h2>
        <p className="fiche-salle-description">{salle.description}</p>
        <p>
          Capacité de la salle: <strong>{salle.nbr_places}</strong>
        </p>
        <p>
          Accessibilité PMR : <strong>{salle.acces_pmr ? "oui" : "non"}</strong>
        </p>
      </aside>

      <form className="formulaire-reservation" onSubmit={handleSubmit}>
        <h3 className="titre-pastille">Réserver au bar à chat</h3>
        <p className="intitule">Nombre de personnes</p>
        <div className="compteur">
          <button type="button" onClick={moins}>
            -
          </button>
          <span>{personnes}</span>
          <button type="button" onClick={plus}>
            +
          </button>
        </div>
        <p className="info-places">
          {places / PLACES_PAR_TABLES} tables(s) - {places} places bloquées
        </p>
        <label htmlFor="date" className="intitule">Choisir une date</label>
        <input
          id="date"
          type="date"
          min={aujourdhui}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <p className="intitule">Choisir un horaire</p>

        {date === "" && <p>Choisis d'abord une date.</p>}
        {date !== "" && horairesDisponibles.length === 0 && (
          <p>Plus aucun créneau disponible ce jour.</p>
        )}

        <div className="horaires">
          {horairesDisponibles.map((h) => (
            <button
              type="button"
              key={h}
              className={h === horaireValide ? "horaire actif" : "horaire"}
              onClick={() => setHoraire(h)}
            >
              {h}
            </button>
          ))}
        </div>
        {complet && (
          <p className="resume">
            Votre réservation : {personnes} personne(s) - {salle.nom} - le{" "}
            {formaterDate(date)} à {horaireValide}
          </p>
        )}
        <button type="submit" className="valider" disabled={!complet || envoi}>
          {envoi ? "Envoi..." : "Valider"}
        </button>

        {message && <p className="succes">{message}</p>}
        {erreurEnvoi && <p role="alert">{erreurEnvoi}</p>}
      </form>
    </div>
  );
}

export default FormulaireReservation;
