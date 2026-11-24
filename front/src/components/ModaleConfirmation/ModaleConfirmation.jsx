import "./ModaleConfirmation.css";

function ModaleConfirmation({ titre, children, onFermer }) {
  return (
    <div className="modale-fond" onClick={onFermer}>
      <div
        className="modale"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modale-titre"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="modale-titre">{titre}</h3>
        <div className="modale-contenu">{children}</div>
        <button
          type="button"
          className="modale-bouton"
          onClick={onFermer}
          autoFocus
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default ModaleConfirmation;
