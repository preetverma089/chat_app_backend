const CACHE_PREFIX = {
    USERS: "users",
    CONVERSATIONS: "conversations",
    MESSAGES: "messages",
    PROFILE: "profile",
    ONLINE: "online",
};

const searchUsersKey = (userId, text) =>
    `${CACHE_PREFIX.USERS}:${userId}:${text}`;

const profileKey = (userId) =>
    `${CACHE_PREFIX.PROFILE}:${userId}`;

module.exports = {
    searchUsersKey,
    profileKey,
};