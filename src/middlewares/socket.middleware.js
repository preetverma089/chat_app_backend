const { verifyAccessToken } = require("../helpers/authHelper");
const socketAuthMiddleware = async (socket, next) => {
    try {
        const token = socket.handshake.auth?.token;

        if (!token) {
            return next(new Error("Authentication token required"));
        }

        const decoded = verifyAccessToken(token);
        socket.userId = decoded.id;
        next();
    } catch (error) {
        next(new Error("Invalid authentication token"));
    }
};

module.exports = socketAuthMiddleware;