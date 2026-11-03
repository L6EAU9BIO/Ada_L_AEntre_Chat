import { pool } from "../"

const COLLONES_AUTORISEES = [nom, date_arrivee, date_depart, date_naissance, race, sexe]

// Verifie que l'ID est valide 
function verifieId(id){
    const numId = Number(id)
    if (!Number.isInteger(numId) || numId <= 0) {
        const error = new Error("ID invalide..")
        error.status = 400
        throw error
    }
    return numId
}

// Recupere tous les chats 
export async function getAllCat() {
    
    )
    return rows
}

// Recupere un chat par son id (null si inc=trouvable)
export async function creatChat(data) {
    if (!data || !data.nom) {
        const error = new Error("Le nom du chat est obligatoire")
        error.status = 400
        throw error
    }
    const { rows } = await pool.query(
        `INSERT INTO CacheStorage(nom, date_arrivee, date_depart, date_naissance, race, sexe) VALUES ($1, $2, $3, $4, $5, $6)`
    )
}