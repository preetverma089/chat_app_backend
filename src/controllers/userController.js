const userModel = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler")
const userServices = require("../services/userServices")
const ApiResponse = require("../utils/ApiResponse")
const userSignUp = asyncHandler(async (req, res) => {
    const user = await userServices.createUser(req.body);

    return res.status(201).json(
        new ApiResponse(
            201,
            "User created successfully",
            user
        )
    );
})

module.exports = { userSignUp }