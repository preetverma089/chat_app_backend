const route = require('express').Router();
const { userSignUp, userLogin, sendForgotPasswordLink, forgotUserPassword } = require("../controllers/userController")
const { signUpValidation, loginValidation, sendforgotPasswordLinkValidation, forgotPasswordValidation } = require("../validations/userValidation")
const validate = require("../middlewares/validationMiddleware")

route.post("/registerUser", validate(signUpValidation), userSignUp)
route.post("/loginUser", validate(loginValidation), userLogin)
route.post("/sendforgotPasswordLink", validate(sendforgotPasswordLinkValidation), sendForgotPasswordLink)
route.post("/forgotPassword", validate(forgotPasswordValidation), forgotUserPassword)
module.exports = route;