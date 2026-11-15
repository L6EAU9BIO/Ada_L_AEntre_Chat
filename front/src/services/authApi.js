import { request } from "./api.js";

export function connexion(email, motDePasse) {
    return request("/auth/connexion", {
        method: "POST",
        body: JSON.stringify({email, motDePasse}),
    })
}

export function utilisateurConnecte() {
    return request("/auth/moi")
}

export function deconnexion() {
    return request("/auth/deconnexion", { method: "POST"})
}