const User = require("../models/userModel");
const ApiError = require("../utils/ApiError")
const hashPassword = require("../helpers/helper")
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
        role
    });
    return user;
}

module.exports = { createUser }