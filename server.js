const app = require("./src/app")
const { PORT } = require('./src/constants/app.constants')
const connectDB = require("./src/config/db.config")
const errorHandler = require("./src/middlewares/errorMiddleware")
const userRoutes = require("./src/routes/userRoutes")

app.use("/api/users", userRoutes);
app.use(errorHandler);
connectDB();

app.listen(PORT, () => {
    console.log(`Server is starting at port ${PORT}`);
})