import { Router } from "express"


const routerChat = Router()

routerChat.get("/", chatController.getChat)
routerChat.get("/:id", chatController.getChatById)
routerChat.post("/", chatController.creatChat)
routerChat.put("/:id", chatController.updateChat)
routerChat.put("/:id", chatController.deleteChat)


export default routerChat