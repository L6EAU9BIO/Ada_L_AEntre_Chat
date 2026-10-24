// Role : recevoir la requete , appeler le service puis renvoyer la reponse 

const DbService = require('../services/DbService')

// "req" = requete reçut , "res" = reponse a  renvoyer 
// La fonction est "async" car le service interroge la bdd 
async function testConnexion(req, res) {
    try {
        const resultat = await DbService.verifierConnexion()

        // 200 : { connecte : true, heure_serveur... }
        res.json(resultat)
    } catch (err) {
        // En cas d'erreur , on renvois le bloc catch
        res.status(500).json({ connecte: false, erreur: err.message })
    }
}

module.export = {testConnexion}