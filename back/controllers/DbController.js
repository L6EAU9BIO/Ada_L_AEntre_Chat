//  Controller : `ReservationController`
//    - valide : format des champs (date valide, champs requis, types)
//    - code : 422 si la validation échoue
//    - Rôle : valider l'entrée, appeler le service, renvoyer la réponse
//    - Ne contient pas : de règle métier ni de requête DB

// Role : recevoir la requete , appeler le service puis renvoyer la reponse 

import * as DbService from "../services/DbService.js"

// "req" = requete reçut , "res" = reponse a  renvoyer 
// La fonction est "async" car le service interroge la bdd 
export async function testConnexion(req, res) {
    try {
        const resultat = await DbService.verifierConnexion()

        // 200 : { connecte : true, heure_serveur... }
        res.json(resultat)
    } catch (err) {
        // En cas d'erreur , on renvois le bloc catch
        res.status(500).json({ connecte: false, erreur: err.message })
    }
}
