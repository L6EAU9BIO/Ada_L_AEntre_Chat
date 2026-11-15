import adminModel from "../models/adminModel.js"

export async function verifAdmin() {
    const connexion = await adminModel.getAdmin()

    if(!connexion){
        throw new Error('Aucun Admin dans la BDD..')
    }
    return {connexion: true, ...connexion}
}

