import { Router } from "express"
import * as reservationController from "../controllers/reservationController.js"
import { verifyToken } from "../middlewares/verifyToken.js"

const routerReservation = Router()

routerReservation.use(verifyToken)

routerReservation.get("/", reservationController.getReservation)
routerReservation.get("/:id", reservationController.getReservationById)
routerReservation.post("/", reservationController.creatReservation)
routerReservation.put("/:id", reservationController.updateReservation)
routerReservation.delete("/:id", reservationController.deleteReservation)

export default routerReservation;