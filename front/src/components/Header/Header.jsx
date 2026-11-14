import "./Header.css";
import { useAuth } from "../../hooks/useAuth.js";
import logo from "../../assets/logo.png";

function Header() {
  const { utilisateur, seDeconnecter } = useAuth();

  return (
    <>
      <header className="header">
        <img
          src={logo}
          alt="Logo de L'Æntre Chats"
          className="logo-l-aentre-chat"
        ></img>
        <h1 className="l-aentre-chats">
          <span>L'Æntre</span>
          <span>Chats</span>
        </h1>
        {utilisateur && (
            <button className="bouton-deconnexion" onClick={seDeconnecter}>
                DECONNEXION
            </button>
        )}
      </header>
    </>
  );
}

export default Header;
