import express from "express"
import { Pool } from "../server/db.js"
import {} from "../controllers/"

const routerAdmin = Router();

routerAdmin.get("/api/admin", verifAdmin)

export default routerAdmin