const nodemailer = require("nodemailer");
const { SMTP_PASS, SMTP_PORT, SMTP_HOST, SMTP_USER } = require("../constants/app.constants")
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    },
})

module.exports = transporter;