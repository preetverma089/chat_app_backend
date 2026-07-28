const route = require('express').Router();
const { userSignUp, userLogin, sendForgotPasswordLink, forgotUserPassword, getUserProfile } = require("../controllers/userController")
const { signUpValidation, loginValidation, sendforgotPasswordLinkValidation, forgotPasswordValidation } = require("../validations/userValidation")
const validate = require("../middlewares/validationMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
route.post("/registerUser", validate(signUpValidation), userSignUp)
route.post("/loginUser", validate(loginValidation), userLogin)
route.post("/sendforgotPasswordLink", validate(sendforgotPasswordLinkValidation), sendForgotPasswordLink)
route.post("/forgotPassword", validate(forgotPasswordValidation), forgotUserPassword)

// protected Routes
route.get("/profile", authMiddleware, getUserProfile)

module.exports = route;