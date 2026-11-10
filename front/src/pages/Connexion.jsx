import { useState } from "react";
import { useNavigate} from "react-router"
import { connexion } from "../services/authApi"

function Connexion() {
    const[email, setEmail] = useState("")
    const[motDePasse, setMotDePasse] = useState("")
    const[erreur, setErreur] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault()
        setErreur("")
        try{
            await connexion(email, motDePasse)
            navigate("/")
        } catch (err) {
            setErreur(err.message)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Connexion</h2>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required /> 
            
            <label htmlFor="motDePasse">Mot de passe</label>
            <input id="motDePasse" type="password" value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)} required /> 

            {erreur && <p role="alert">{erreur}</p>}

            <button type="submit">Se connecter</button>

        </form>
    )
}

export default Connexion