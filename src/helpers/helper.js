const bcrypt = require("bcrypt");



const hashPassword = async (payload) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(payload, salt);
    return hashedPassword;
}

module.exports = hashPassword;