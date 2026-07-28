const transporter = require("../utils/mailTransporter")
const { SMTP_USER } = require("../constants/app.constants")
const verifyTransporter = async () => {
    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");
    } catch (err) {
        console.error("Verification failed:", err);
    }
}
const sendForgotPasswordMail = async ({ to, subject, html, text }) => {
    return transporter.sendMail({
        from: `"My App" <${SMTP_USER}>`,
        to,
        subject,
        text,
        html,
    });
};

module.exports = { sendForgotPasswordMail, verifyTransporter }