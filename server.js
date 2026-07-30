const app = require("./src/app")
const { PORT } = require('./src/constants/app.constants')
const connectDB = require("./src/config/db.config")
const errorHandler = require("./src/middlewares/errorMiddleware")
const userRoutes = require("./src/routes/userRoutes")
const { verifyTransporter } = require("./src/helpers/emailHelper")
const { redisConfig } = require("./src/helpers/redisHelper")
app.use("/api/users", userRoutes);
app.use(errorHandler);
connectDB();
redisConfig();
verifyTransporter();
app.listen(PORT, () => {
    console.log(`Server is starting at port ${PORT}`);
})