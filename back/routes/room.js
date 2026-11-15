import { Router } from "express"
import * as roomController from "../controllers/roomController.js"
import { verifyToken } from "../middlewares/verifyToken.js"

const routerRoom = Router()

routerRoom.get("/", verifyToken, roomController.getRooms)

export default routerRoom