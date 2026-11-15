import { Router } from "express"
import * as chatController from "../controllers/chatController.js"


const routerChat = Router()

routerChat.get("/", chatController.getChat)
routerChat.get("/:id", chatController.getChatById)
routerChat.post("/", chatController.creatChat)
routerChat.put("/:id", chatController.updateChat)
routerChat.delete("/:id", chatController.deleteChat)


export default routerChat