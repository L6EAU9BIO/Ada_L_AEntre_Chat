import { Router } from "express"
import * as loginController from "../controllers/loginController"


const routerLogin = Router()

routerLogin.get("/inscription", loginController.inscription)