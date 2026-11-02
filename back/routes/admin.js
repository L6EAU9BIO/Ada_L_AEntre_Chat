import { Router } from "express"
import {} from "../controllers/adminController.js"

const routerAdmin = Router();

routerAdmin.get("/api/admin", verifAdmin)

export default routerAdmin