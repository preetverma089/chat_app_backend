const route = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware")
const { sendMessage } = require("../controllers/messageController")
const validate = require("../middlewares/validationMiddleware");
const { sendMessagageValidation } = require("../validations/messaageValidation")
route.post("/sendMessage", validate(sendMessagageValidation), authMiddleware, sendMessage)

module.exports = route;