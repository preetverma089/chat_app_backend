const dotenv = require("dotenv");
dotenv.config();

const appConstants = {
    PORT: process.env.PORT,
    MONGOURI: process.env.MONGOURI
}

module.exports = appConstants;