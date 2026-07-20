const app = require("./src/app")
const { PORT } = require('./src/constants/app.constants')
const connectDB = require("./src/config/db.config")

connectDB();

app.listen(PORT, () => {
    console.log(`Server is starting at port ${PORT}`);
})