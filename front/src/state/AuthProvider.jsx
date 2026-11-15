import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext.js";
import {connexion, deconnexion, utilisateurConnecte} from "../services/authApi.js"

function AuthProvider({children}) {
    const [utilisateur, setUtilisateur] = useState(null)
    const[chargement, setChargement] = useState(true)

    useEffect(() => {
        utilisateurConnecte()
            .then((data) => setUtilisateur(data.utilisateur))
            .catch(() => setUtilisateur(null))
            .finally(() => setChargement(false))
    }, [])

    async function seConnecter(email, motDePasse){
        await connexion(email, motDePasse)
        const data = await utilisateurConnecte()
        setUtilisateur(data.utilisateur)
    }

    async function seDeconnecter(){
        await deconnexion()
        setUtilisateur(null)
    }

    return (
        <AuthContext.Provider value={{utilisateur, chargement,seConnecter, seDeconnecter}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider