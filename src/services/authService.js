const RefreshToken = require("../models/refreshToken");
const User = require("../models/userModel");


const {
    verifyRefreshToken,
    generateAccessToken,
} = require("../helpers/authHelper");

const ApiError = require("../utils/ApiError");

const refreshUserToken = async (refreshToken) => {

    if (!refreshToken) {
        throw new ApiError(400, "Refresh token is required");
    }

    const tokenDoc = await RefreshToken.findOne({
        token: refreshToken,
    });

    if (!tokenDoc) {
        throw new ApiError(401, "Invalid refresh token");
    }

    // Verify JWT
    const decoded = verifyRefreshToken(refreshToken);

    // Check user
    const user = await User.findById(decoded.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Generate new access token
    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role,
    });

    return {
        accessToken,
    };
};

module.exports = {
    refreshUserToken,
};