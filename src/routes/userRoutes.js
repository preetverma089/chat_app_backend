const route = require('express').Router();
const userController = require("../controllers/userController")
const { signUpValidation } = require("../validations/userValidation")
const validate = require("../middlewares/validationMiddleware")

route.post("/registerUser", validate(signUpValidation), userController.userSignUp)

module.exports = route;