import * as chatService from "../services/chatService.js"

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Récupère tous les chats
 *     description: Retourne la liste complète des chats présents en base de données
 *     tags:
 *       - Chats
 *     responses:
 *       200:
 *         description: Liste des chats récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *             example:
 *               - id: 1
 *                 nom: "Garfield"
 *                 race: "Exotic Shorthair"
 *                 age: 5
 *               - id: 2
 *                 nom: "Tom"
 *                 race: "Bleu russe"
 *                 age: 3
 *       500:
 *         description: Erreur serveur
 */
export async function getChat(req, res, next){
    try{
        const allCat = await chatService.getAllCat()
        return res.status(200).json(allCat)
    } catch (error){
        return next(error)
    }
}

/**
 * @swagger
 * /chats/{id}:
 *   get:
 *     summary: Récupère un chat par son ID
 *     description: Retourne les détails d'un chat spécifique identifié par son ID
 *     tags:
 *       - Chats
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du chat à récupérer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Chat trouvé et retourné avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *             example:
 *               id: 1
 *               nom: "Garfield"
 *               race: "Exotic Shorthair"
 *               age: 5
 *       404:
 *         description: Aucun chat trouvé avec cet ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chat introuvable"
 *       500:
 *         description: Erreur serveur
 */
export async function getChatById(req, res, next){
    try {
        const allCats = await chatService.getChatById(req.params.id)

        if(!allCats) {
          return res.status(404).json({ message: "Chat introuvable"})
        }
        return res.status(200).json(allCats)   
    } catch(error){
        return next(error)
    }
}

/**
 * @swagger
 * /chats:
 *   post:
 *     summary: Crée un nouveau chat
 *     description: Ajoute un nouveau chat en base de données à partir du corps de la requête
 *     tags:
 *       - Chats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *           example:
 *             nom: "Garfield"
 *             race: "Exotic Shorthair"
 *             age: 5
 *     responses:
 *       201:
 *         description: Chat créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *             example:
 *               id: 3
 *               nom: "Garfield"
 *               race: "Exotic Shorthair"
 *               age: 5
 *       500:
 *         description: Erreur serveur
 */
export async function creatChat(req, res, next){
    try{
        const allCats = await chatService.creatChat(req.body)
        return res.status(201).json(allCats)
    }catch (error){
        return next(error)
    }
}

/**
 * @swagger
 * /chats/{id}:
 *   put:
 *     summary: Modifie un chat existant
 *     description: Met à jour les informations d'un chat identifié par son ID
 *     tags:
 *       - Chats
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du chat à modifier
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chat'
 *           example:
 *             nom: "Garfield"
 *             race: "Exotic Shorthair"
 *             age: 6
 *     responses:
 *       200:
 *         description: Chat mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *             example:
 *               id: 1
 *               nom: "Garfield"
 *               race: "Exotic Shorthair"
 *               age: 6
 *       404:
 *         description: Aucun chat trouvé avec cet ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Félin introuvable"
 *       500:
 *         description: Erreur serveur
 */
export async function updateChat(req, res, next){
    try{
        const allCats = await chatService.updateChat(req.params.id, req.body)

        if(!allCats){
            return res.status(404).json({ message: "Félin introuvable"})
        }
        return res.status(200).json(allCats)
    } catch (error) {
        return next(error)
    }
}

/**
 * @swagger
 * /chats/{id}:
 *   delete:
 *     summary: Supprime un chat
 *     description: Supprime un chat identifié par son ID de la base de données
 *     tags:
 *       - Chats
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du chat à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Chat supprimé avec succès (aucune donnée retournée)
 *       404:
 *         description: Aucun chat trouvé avec cet ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "félin introuvable"
 *       500:
 *         description: Erreur serveur
 */
export async function deleteChat(req, res, next){
    try{
        const delCat = await chatService.deleteChat(req.params.id)
        if(!delCat){
            return res.status(404).json({ message: "félin introuvable"})
        } 
        return res.status(204).send()
    }catch (error) {
        return next(error)
    }
}