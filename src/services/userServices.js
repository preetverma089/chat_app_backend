const User = require("../models/userModel");
const userResetPassword = require("../models/userResetPassword");
const ApiError = require("../utils/ApiError");
const { searchUsersKey } = require("../helpers/cacheKey")
const {
    hashPassword,
    comparePassword,
    generateRandomtoken,
    hashedToken,
} = require("../helpers/helper");
const {
    generateAccessToken,
    generateRefreshToken,
} = require("../helpers/authHelper");
const RefreshToken = require("../models/refreshToken");
const { FRONTEND_URL } = require("../constants/app.constants");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { sendForgotPasswordMail } = require("../helpers/emailHelper");
const redisClient = require("../config/redis");
const { getCache, setCache } = require("../helpers/redisHelper")
const CACHE_TTL = {
    SEARCH_USERS: 300,
};
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

    const isPasswordValid = await comparePassword(password, user.password);

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

const forgotPassword = async (email) => {
    const user = await getUserByEmail(email);
    let forgotPasswordTemplate = fs.readFileSync(
        path.join(__dirname, "../mailTemplates/forgotPassword.html"),
        "utf8",
    );
    const resetToken = generateRandomtoken();
    const hashToken = hashedToken(resetToken);
    await saveResetToken(user._id, hashToken);
    const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
    forgotPasswordTemplate = forgotPasswordTemplate
        .replace("{{USER_NAME}}", user.fullName)
        .replaceAll("{{RESET_LINK}}", resetLink);
    await sendForgotPasswordMail({
        to: user.email,
        subject: "Reset Password",
        html: forgotPasswordTemplate,
        text: "Reset your password",
    });
    return {
        message: "Password reset email sent successfully.",
    };
};

const saveResetToken = async (userId, token) => {
    await userResetPassword.deleteMany({ userId });
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    return userResetPassword.create({ userId, token, expiresAt });
};

const resetPassword = async (token, password) => {
    const hashedResetToken = hashedToken(token);
    const tokenDetails = await userResetPassword.findOne({
        token: hashedResetToken,
        expiresAt: { $gt: new Date() },
    });
    if (!tokenDetails) {
        throw new ApiError(401, "Invalid or expired reset token");
    }
    const hashedPassword = await hashPassword(password);
    await User.findByIdAndUpdate(tokenDetails.userId, {
        password: hashedPassword,
    });
    await userResetPassword.deleteOne({
        _id: tokenDetails._id,
    });
    await RefreshToken.deleteMany({
        userId: tokenDetails.userId,
    });
    return {
        message: "Password updated successfully.",
    };
};

const getUserById = async (id) => {
    const userDetail = await User.findById(id).lean();
    if (!userDetail) {
        throw new ApiError(404, "user not found");
    }
    return userDetail;
};
const searchUsers = async (text, loggedInUserId) => {
    const cacheKey = searchUsersKey(loggedInUserId, text)
    const cacheUsers = await getCache(cacheKey)
    if (cacheUsers) {
        console.log("✅ Redis Cache HIT");
        return cacheUsers;
    }
    console.log("❌ Redis Cache MISS");
    const users = await User.find({
        _id: { $ne: loggedInUserId },
        $or: [
            {
                fullName: {
                    $regex: text,
                    $options: "i",
                },
            },
            {
                email: {
                    $regex: text,
                    $options: "i",
                },
            },
        ],
    }).select("fullName email").lean();
    await setCache(cacheKey, users, CACHE_TTL.SEARCH_USERS);
    return users;
};
module.exports = {
    createUser,
    getUserByEmail,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserById,
    searchUsers,
};
