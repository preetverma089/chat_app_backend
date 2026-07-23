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

module.exports = { userSignUp, userLogin };