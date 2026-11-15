import { NavLink, Outlet } from "react-router";
import "./Booking.css";

function Booking() {
  return (
    <>
      <nav className="booking_button_section">
        <NavLink
          to="/reservation"
          end
          className={({ isActive }) => (isActive ? "onglet actif" : "onglet")}
        >
          RESERVER
        </NavLink>
        <NavLink
          to="/reservation/consulter"
          end
          className={({ isActive }) => (isActive ? "onglet actif" : "onglet")}
        >
          CONSULTER LES RESERVATIONS
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Booking;
