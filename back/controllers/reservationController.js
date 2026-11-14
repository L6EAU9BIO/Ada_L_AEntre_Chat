import * as reservationService from "../services/reservationService.js"

/**
 * @openapi
 * /api/reservations/{id}:
 *   get:
 *     summary: Lister les réservations
 *     tags: [Réservations]
 *     parameters:
 *       - { in: query, name: room_id, schema: { type: integer }, description: Filtrer par salle }
 *       - { in: query, name: date, schema: { type: string, format: date }, description: Filtrer par date }
 *     responses:
 *       200:
 *         description: Liste des réservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Reservation' }
 *  Route GET :  Permet d'avoir toutes les reservations -
 */
export async function getReservation(req, res, next) {
    try {
        const reserv = await reservationService.getAllReserv(req.query.room_id , req.query.date)
        return res.status(200).json(reserv)
    } catch(error) {
        return next(error)
    }
}

/**
 * @openapi
 * /api/reservations/{id}:
 *   get:
 *     summary: Récupérer une réservation par son id
 *     tags: [Réservations]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer }, example: 2 }
 *     responses:
 *       200:
 *         description: La réservation
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Reservation' }
 *       400: { description: Identifiant invalide }
 *       404:
 *         description: Réservation introuvable
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Erreur' }
 */
export async function getReservationById( req, res , next) {
    try{
        const reservs = await reservationService.getReservationById(req.params.id)

        if(!reservs) {
            return res.status(404).json({message: "Resservation introuvable"})
        }
        return res.status(200).json(reservs)
    }catch (error){
        return next(error)
    }
}

/**
 * @openapi
 * /api/reservations:
 *   post:
 *     summary: Créer une réservation
 *     description: Le staff_id est pris sur l'utilisateur connecté, pas dans le corps.
 *     tags: [Réservations]
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReservationInput' }
 *     responses:
 *       201:
 *         description: Réservation créée
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Reservation' }
 *       401: { description: Non authentifié }
 *       422: { description: Données invalides }
 */
export async function creatReservation(req, res, next){
    try{
        const reservs = await reservationService.creatReservation({...req.body,
            staff_id: req.utilisateur.id
        })
        return res.status(201).json(reservs)
    }catch (error){
        return next(error)
    }
}

/**
 * @openapi
 * /api/reservations/{id}:
 *   put:
 *     summary: Modifier une réservation
 *     tags: [Réservations]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer }, example: 2 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReservationInput' }
 *     responses:
 *       200:
 *         description: Réservation modifiée
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Reservation' }
 *       400: { description: Identifiant invalide }
 *       401: { description: Non authentifié }
 *       404:
 *         description: Réservation introuvable
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Erreur' }
 *       422: { description: Données invalides }
 */
export async function updateReservation(req, res, next) {
    try{
        const reservs = await reservationService.updateReservation(req.params.id, req.body)

        if(!reservs) {
            return res.status(404).json({message: "Reservation introuvable"})
        }
        return res.status(200).json(reservs)
    } catch(error){
        return next(error)
    }
}

/**
 * @openapi
 * /api/reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Réservations]
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - { in: path, name: id, required: true, schema: { type: integer }, example: 2 }
 *     responses:
 *       204: { description: Réservation supprimée (pas de contenu) }
 *       400: { description: Identifiant invalide }
 *       401: { description: Non authentifié }
 *       404:
 *         description: Réservation introuvable
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Erreur' }
 */
export async function deleteReservation(req, res, next){
    try{
        const supp = await reservationService.deleteReservation(req.params.id)
        
        if(!supp){
            return res.status(404).json({message: "Reservation introuvable"})
        }
        return res.status(204).send() // status() prepare la res et send() la declenche
    } catch (error) {
        return next(error)
    }
}