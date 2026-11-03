import { Router } from "express"
import * as reservationController from "../controllers/reservationController.js"

const routerReservation = Router()

routerReservation.get("/", reservationController.getReservation)
routerReservation.get("/:id", reservationController.getReservationById)
routerReservation.post("/", reservationController.creatReservation)
routerReservation.put("/:id", reservationController.updateReservation)
routerReservation.delete("/:id", reservationController.deleteReservation)

export default routerReservation;