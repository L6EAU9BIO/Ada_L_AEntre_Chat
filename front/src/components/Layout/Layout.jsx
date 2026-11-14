import { Outlet } from "react-router";
import Navbar from "../NavBar/Navbar.jsx";

function Layout() {
    return (
        <div className="page">
            <Navbar/>
            <main className="contenu">
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout