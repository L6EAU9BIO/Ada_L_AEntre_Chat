import { useState } from "react";
import { useNavigate} from "react-router"
import { useAuth } from "../hooks/useAuth.js";
import LoginForm from "../components/LoginForm/LoginForm.jsx";

function Connexion() {
    const {seConnecter} = useAuth()
    const navigate = useNavigate()
    const [erreur, setErreur] = useState("")

    async function handleConnexion(email, motDePasse){
        setErreur("")
        try{
            await seConnecter(email, motDePasse)
            navigate("/reservation")
        } catch (err) {
            setErreur(err.message)
        }
    }
    return (
        <section>
            <h2>Connexion</h2>
            <LoginForm onConnexion = {handleConnexion} erreur={erreur}/>
        </section>

            
    )
}

export default Connexion