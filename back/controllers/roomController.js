import * as roomService from "../services/roomService.js"

/**
 * @openapi
 * /api/rooms:
 *    get:
 *      summary: Lister les salles
 *      tags: [Salles]
 *      security: [{ cookieAuth: [] }]
 *      responses: 
 *        200:
 *          description: Liste des salles
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    id: { type: integer, example: 1}
 *                    nom: { type: string, example: Le Salon}
 *                    nbr_places: { type: integer, example: 20 }
 *                    acces_pmr: { type: boolean, example: true }
 *                    description: { type: string}
 *          
 *        401: { description: Non authentifié}
 */

export async function getRooms(req, res, next) {
    try {
        const rooms = await roomService.getAllRooms()
        return res.status(200).json(rooms)
    } catch (error) {
        return next(error)
    }
}