import * as DbService from "../services/DbService.js"

/**
 * @swagger
 * /test-connexion:
 *   get:
 *     summary: Vérifie la connexion à la base de données
 *     description: Interroge la base de données via DbService et renvoie l'état de la connexion ainsi que l'heure du serveur
 *     tags:
 *       - DBB
 *     responses:
 *       200:
 *         description: Connexion à la base de données réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  connecte:
 *                   type: boolean
 *                   example: true
 *                 heure_serveur:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-11-13T16:51:00.000Z"
 *       500:
 *         description: Erreur de connexion à la base de données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 connecte:
 *                   type: boolean
 *                   example: false
 *                 erreur:
 *                   type: string
 * */
//* "req" = requete reçut , "res" = reponse a  renvoyer 
//* La fonction est "async" car le service interroge la bdd 
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
