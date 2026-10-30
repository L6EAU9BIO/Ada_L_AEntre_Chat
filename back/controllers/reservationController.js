import * as reservationService from "../services/reservationService.js"


// Route GET :  Permet d'avoir toutes les reservations -
export async function getReservation(req, res, next) {
    try {
        const reserv = await reservationService.getAllReserv()
        return res.status(200).json(reserv)
    } catch(err) {
        return next(error)
    }
}

// Route GET : Permet d'avoir les reservations par rapport a leurs ID -
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

// Route POST : Permet de creer une reservation -
export async function creatReservation(req, res, next){
    try{
        const reservs = await reservationService.creatReservation(req.body)
        return res.status(201).json(reservs)
    }catch (err){
        return next(err)
    }
}

// Route PUT : Permet de modifier une reservation -
export async function updateReservation(res, req, next) {
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

// Route DELETE : Permet de supprimer une reservation 
export async function deleteReservation(res, req, next){
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