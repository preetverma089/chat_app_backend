const route = require('express').Router();
const { createConversation } = require("../controllers/converationController")
const authMiddleware = require("../middlewares/authMiddleware")
const validate = require("../middlewares/validationMiddleware")
const { createConversationValidation } = require("../validations/conversationValidation")
route.post("/conversations", validate(createConversationValidation), authMiddleware, createConversation)
module.exports = route;