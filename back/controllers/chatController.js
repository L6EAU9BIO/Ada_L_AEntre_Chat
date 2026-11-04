import * as chatService from "../services/chatService.js"


// Route GET : permet d'avoir tous les chats 
export async function getChat(req, res, next){
    try{
        const allCat = await chatService.getAllCat()
        return res.status(200).json(allCat)
    } catch (error){
        return next(error)
    }
}

// Route GET : permet d'avoir les chats par leurs ID 
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

// Route POST : permet de créé/ajouter un nouveau chat
export async function creatChat(req, res, next){
    try{
        const allCats = await chatService.creatChat(req.body)
        return res.status(201).json(allCats)
    }catch (error){
        return next(error)
    }
}

// Route PUT : permet de modifier un resident/chat 
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

// Route DELETE : permet de supprimer un chat
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