const bcrypt = require("bcrypt");
const crypto = require("crypto");



const hashPassword = async (payload) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload, salt);
    return hashedPassword;
}
const comparePassword = async (payload, hashedPassword) => {
    const isMatch = await bcrypt.compare(payload, hashedPassword);
    return isMatch;
}

const generateRandomtoken = () => {
    return crypto.randomBytes(32).toString("hex");
}
const hashedToken = (token) => {
    return crypto.createHash("sha256")
        .update(token)
        .digest("hex");
}
module.exports = { hashPassword, comparePassword, generateRandomtoken, hashedToken };