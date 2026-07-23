const bcrypt = require("bcrypt");



const hashPassword = async (payload) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload, salt);
    return hashedPassword;
}
const comparePassword = async (payload, hashedPassword) => {
    const isMatch = await bcrypt.compare(payload, hashedPassword);
    return isMatch;
}

module.exports = { hashPassword, comparePassword };