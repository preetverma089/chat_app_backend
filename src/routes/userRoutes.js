const route = require('express').Router();
const { userSignUp, userLogin } = require("../controllers/userController")
const { signUpValidation, loginValidation } = require("../validations/userValidation")
const validate = require("../middlewares/validationMiddleware")

route.post("/registerUser", validate(signUpValidation), userSignUp)
route.post("/loginUser", validate(loginValidation), userLogin)
module.exports = route;