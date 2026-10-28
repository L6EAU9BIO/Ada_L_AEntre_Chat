import * as adminService from "../services/adminService.js"

export async function verifierAdmin(req, res) {
    try{
        const resultat = await adminService.adminConnexion()
        res.json(resultat)
    }catch(error){
        res.status(500).json({ connection: false, erreur: error.message })
    }
}