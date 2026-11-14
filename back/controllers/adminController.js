import * as adminService from "../services/adminService.js"

/**
 * 
 * @openapi 
 * /api/admin:
 *   get:
 *     summary: Récupérer une réservation par son id
 *     tags:
 *       - Réservations
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     responses:
 *       200:
 *         description: La réservation
 */
router.get("/:id", getReservationById)
 
export async function verifAdmin(req, res) {
    try{
        const resultat = await adminService.adminConnexion()
        res.json(resultat)
    }catch(error){
        res.status(500).json({ connection: false, erreur: error.message })
    }
}