const jwt = require("jsonwebtoken");
const appConstants = require("../constants/app.constants");

const generateAccessToken = (payload) =>
    jwt.sign(payload, appConstants.JWT_ACCESS_SECRET, {
        expiresIn: appConstants.JWT_ACCESS_EXPIRES_IN,
    });
const generateRefreshToken = (payload) =>
    jwt.sign(payload, appConstants.JWT_REFRESH_SECRET, {
        expiresIn: appConstants.JWT_REFRESH_EXPIRES_IN,
    });
const verifyAccessToken = (token) =>
    jwt.verify(token, appConstants.JWT_ACCESS_SECRET);

const verifyRefreshToken = (token) =>
    jwt.verify(token, appConstants.JWT_REFRESH_SECRET);

module.exports = { generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken };