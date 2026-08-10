const app = require("./src/app")
const http = require("http");
const { Server } = require("socket.io");
const { PORT } = require('./src/constants/app.constants')
const connectDB = require("./src/config/db.config")
const { verifyTransporter } = require("./src/helpers/emailHelper")
const { redisConfig } = require("./src/helpers/redisHelper")
const socketHandler = require("./src/sockets/socket");
connectDB();
redisConfig();
verifyTransporter();
const server = http.createServer(app);
// app.listen(PORT, () => {
//     console.log(`Server is starting at port ${PORT}`);
// })
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
socketHandler(io);
server.listen(PORT, () => {
    console.log(`Server is starting at port ${PORT}`);
});