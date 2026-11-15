import "./ChoixSalle.css"

function ChoixSalle({ salles, salleActive, onChoisir }) {
    return (
        <div className="choix-salles">
            {salles.map((s) => (
                <button
                    type="button"
                    key={s.id}
                    className={s.id === salleActive ? "pastille actif" : "pastille"}
                    onClick={() => onChoisir(s.id)}
                >
                    {s.nom}
                </button>
            ))}
        </div>
    )
}

export default ChoixSalle