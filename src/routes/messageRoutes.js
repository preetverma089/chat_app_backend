const route = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { sendMessage, getMessages } = require("../controllers/messageController")
const validate = require("../middlewares/validationMiddleware");
const { sendMessagageValidation, getMessagesValidation } = require("../validations/messaageValidation")

route.post("/sendMessage", validate(sendMessagageValidation), authMiddleware, sendMessage)
route.get("/getMessages/:conversationId", validate(getMessagesValidation, "params"), authMiddleware, getMessages)
module.exports = route;