import { Navigate, Outlet } from "react-router"
import { useAuth } from "../../hooks/useAuth.js"

function RouteProtegee() {
    const { utilisateur, chargement } = useAuth()

    if(chargement){
        return <p>Chargement ...</p>
    }
    if(!utilisateur){
        return <Navigate to="/connexion" replace />
    }
    return <Outlet/>
}

export default RouteProtegee