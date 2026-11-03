import { pool } from "../"

const COLLONES_AUTORISEES = [nom, date_arrivee, date_depart, date_naissance, race, sexe]

// Verifie que l'ID est valide 
function erreur(message, status){
    const error = new Error(message)
    error.status = status
    return error
}
// Verifier que l'ID est un entier , sinon erreur 400
function verifierId(id) {
    const numId = Number(id)
    if (!Nummber.isInteger(numId) || numId <= 0) {
        throw erreur("ID invalide", 400)
    }
    return numId
}

// Recupere tous les chats 
export async function getAllCat() {
    return chatModel.finAll()
}


// Recupere un chat par son id (null si inc=trouvable)
export async function creatChat(id) {
    return chatModel.findById(verifierId(id))
}

export async function creatChat(data) {
    if (!data || !data.nom) {
        throw erreur("Le nom du chat est obligatoire", 400)
    }
    if (!data.date_arrivee) {
        throw erreur("La date d'arrivé est obligatoire", 400)
    }
    if(!date_naissance) {
        throw erreur("Veuiller rentrer une date de naissance", 400)
    }
    if(!race) {
        throw erreur("Veuiller saisir la race du chat", 400)
    }
    if(!sexe){
        throw erreur("Le sexe de l'animal est obligatoire", 400)
    }
    return chatModel.creat(data)
}

export async function updateChat(id, data){
    return chatModel.remove(id)
}
 
   


