import * as chatModel from "../models/chatModel.js"



// Verifie que l'ID est valide 
function erreur(message, status){
    const error = new Error(message)
    error.status = status
    return error
}
// Verifier que l'ID est un entier , sinon erreur 400
function verifierId(id) {
    const numId = Number(id)
    if (!Number.isInteger(numId) || numId <= 0) {
        throw erreur("ID invalide", 400)
    }
    return numId
}

// Recupere tous les chats 
export async function getAllCat() {
    return chatModel.findAll()
}


// Recupere un chat par son id (null si inc=trouvable)
export async function getChatById(id) {
    return chatModel.findById(verifierId(id))
}

export async function creatChat(data) {
    if (!data || !data.nom) {
        throw erreur("Le nom du chat est obligatoire", 400)
    }
    if (!data.date_arrivee) {
        throw erreur("La date d'arrivé est obligatoire", 400)
    }
    if(!data.date_naissance) {
        throw erreur("Veuiller rentrer une date de naissance", 400)
    }
    if(!data.race) {
        throw erreur("Veuiller saisir la race du chat", 400)
    }
    if(!data.sexe){
        throw erreur("Le sexe de l'animal est obligatoire", 400)
    }
    return chatModel.insert(data)
}

// export async function updateChat(id, data){
//     return chatModel.remove(id)
// }
 
   


