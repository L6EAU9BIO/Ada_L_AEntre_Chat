import { Router } from "express"
import * as authController from "../controllers/authController.js"


const routerAuth = Router()

routerAuth.post("/inscription", authController.inscription)
// routerAuth.stack.forEach((r) => {
//   if (r.route) console.log("login.js route :", Object.keys(r.route.methods), r.route.path);
// });

routerAuth.post("/connexion", authController.connexion)

export default routerAuth;