import "./LoginForm.css"
import { useState } from "react";

function LoginForm({ onConnexion, erreur }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onConnexion(email, motDePasse);
  }
  return (
    <form className="login-carte" onSubmit={handleSubmit}>
      <h2 className="login-titre">Identifiez-vous</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="motDePasse">Mot de passe</label>
      <input
        id="motDePasse"
        type="password"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
        required
      />

      {erreur && (
        <p role="alert" className="bandeau-erreur">
          {erreur}
        </p>
      )}

      <button type="submit" className="login-bouton">
        Se connecter
      </button>
    </form>
  );
}

export default LoginForm;
