import express from "express"
import { Router } from "express"
import * as reservationController from "../controllers/reservationController.js"

const routerReservation = Router()

routerReservation.get("/api", reservationController.getReservation)
routerReservation.get("/api/:id", reservationController.getReservationById)
routerReservation.post("/api", reservationController.creatReservation)
routerReservation.put("/api/:id", reservationController.updateReservation)
routerReservation.delete("/api/:id", reservationController.deleteReservation)

export default routerReservation;