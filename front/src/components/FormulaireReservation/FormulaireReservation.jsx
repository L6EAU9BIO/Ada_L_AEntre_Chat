function FormulaireReservation({salle, onRetour}) {
    return (
        <section>
            <button type="button" onClick={onRetour}>Changer de salle</button>
            <h2>Réserver : {salle.nom}</h2>
        </section>
    )
}

export default FormulaireReservation