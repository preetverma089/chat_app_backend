const { verifyAccessToken } = require("../helpers/authHelper")
const ApiError = require("../utils/ApiError")
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new ApiError(401, "Authorization header is required");
        }
        if (!authHeader.startsWith("Bearer ")) {
            throw new ApiError(401, "Invalid authorization format");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new ApiError(401, "Access token is required");
        }
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        next(
            error instanceof ApiError
                ? error
                : new ApiError(401, "Invalid or expired access token")
        );
    }
}

module.exports = authMiddleware