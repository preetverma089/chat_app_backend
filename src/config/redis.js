const { createClient } = require("redis");
const { REDIS_URL } = require("../constants/app.constants")
const redisClient = createClient({
    url: REDIS_URL,
});

redisClient.on("connect", () => {
    console.log("Redis Connected");
});
redisClient.on("error", (err) => {
    console.error(err);
});

module.exports = redisClient;