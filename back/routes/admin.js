import { Router } from "express"
import { verifAdmin } from "../controllers/adminController.js"

const routerAdmin = Router();

routerAdmin.get("/api/admin", verifAdmin)

export default routerAdmin