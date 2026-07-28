const userModel = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const userServices = require("../services/userServices");
const ApiResponse = require("../utils/ApiResponse");

const userSignUp = asyncHandler(async (req, res) => {
    const user = await userServices.createUser(req.body);
    return res
        .status(201)
        .json(new ApiResponse(201, "User created successfully", user));
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userServices.loginUser(email, password);
    return res
        .status(200)
        .json(new ApiResponse(200, "User logged in successfully", user));

})

const sendForgotPasswordLink = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await userServices.forgotPassword(email);
    return res
        .status(200)
        .json(new ApiResponse(200, "Password reset link sent successfully", user));
})

const forgotUserPassword = asyncHandler(async (req, res) => {
    const { token, password } = req.body;
    const user = userServices.forgotPassword(token, password);
    return res.status(200).json(new ApiResponse(200, user.message))
})

const getUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const user = await userServices.getUserById(id);
    return res.status(200).json(new ApiResponse(200, "User Details fetched Succesfully", user))
})

module.exports = { userSignUp, userLogin, sendForgotPasswordLink, forgotUserPassword, getUserProfile };