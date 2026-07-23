const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const { refreshUserToken } = require("../services/authService");

const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    const data = await refreshUserToken(refreshToken);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Access token refreshed successfully",
            data
        )
    );
});

module.exports = {
    refreshToken,
};