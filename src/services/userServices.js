const User = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const { hashPassword, comparePassword } = require("../helpers/helper");
const { generateAccessToken, generateRefreshToken } = require("../helpers/authHelper")
const RefreshToken = require("../models/refreshToken");
const appConstants = require("../constants/app.constants");
const jwt = require("jsonwebtoken");
const createUser = async (payload) => {
    const { fullName, email, password, role } = payload;
    const isExistingUser = await User.findOne({ email }).lean();
    if (isExistingUser) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role,
    });
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email }).lean().select("+password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return user;
};

const loginUser = async (email, password) => {
    const user = await getUserByEmail(email);

    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const accessToken = generateAccessToken({
        id: user._id,
        role: user.role,
    });

    const refreshToken = generateRefreshToken({
        id: user._id,
    });

    const { exp } = jwt.decode(refreshToken);
    await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(exp * 1000),
    });

    delete user.password;

    return {
        ...user,
        accessToken,
        refreshToken,
    };
};
module.exports = { createUser, getUserByEmail, loginUser };
