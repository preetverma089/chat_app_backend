const redisClient = require("../config/redis");


const redisConfig = async () => {
    try {
        await redisClient.connect();
        console.log("Redis Connected")
    } catch (error) {
        console.log("redis disconnected", error)
    }
}
const getCache = async (key) => {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Redis GET Error:", error.message);
        return null;
    }
};

const setCache = async (key, value, ttl) => {
    try {
        await redisClient.set(
            key,
            JSON.stringify(value),
            {
                EX: ttl,
            }
        );
    } catch (error) {
        console.error("Redis SET Error:", error.message);
    }
};

module.exports = { redisConfig, setCache, getCache };