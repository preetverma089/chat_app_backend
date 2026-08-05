const route = require('express').Router();
const { createConversation, getConversationList } = require("../controllers/converationController")
const authMiddleware = require("../middlewares/authMiddleware")
const validate = require("../middlewares/validationMiddleware")
const { createConversationValidation } = require("../validations/conversationValidation")
route.post("/conversations", validate(createConversationValidation), authMiddleware, createConversation)
route.get("/getconversations", authMiddleware, getConversationList)
module.exports = route;

