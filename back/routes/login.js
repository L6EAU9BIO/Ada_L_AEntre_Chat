import { Router } from "express"
import * as loginController from "../controllers/loginController.js"


const routerLogin = Router()

routerLogin.post("/", loginController.inscription)
routerLogin.stack.forEach((r) => {
  if (r.route) console.log("login.js route :", Object.keys(r.route.methods), r.route.path);
});

export default routerLogin;