import './CarteSalle.css'

function CarteSalle({salle, onChoisir}) {
    return(
        <article className='carte-salle'>
            <h3>{salle.nom}</h3>
            <p className='carte-salle-description'>{salle.description}</p>
            <p>Capacité : {salle.nbr_places}</p>
            <p>Accès PMR : {salle.acces_pmr ? "OUI" : "NON"}</p>
            <button onClick={() => onChoisir(salle)}>Choisir cette salle</button>
        </article>
    )
}

export default CarteSalle