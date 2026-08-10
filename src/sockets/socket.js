const socketAuthMiddleware = require("../middlewares/socket.middleware")
const { findConversationbyId, isParticipant } = require("../services/conversationService");
const { sendMessageService } = require("../services/messageService");
const socketHandler = (io) => {
    io.use(socketAuthMiddleware);
    io.on("connection", (socket) => {
        console.log("✅ Socket connected:", socket.id);
        console.log("👤 User ID:", socket.userId);

        // join conversatioion 
        socket.on("join_conversation", async ({ conversationId }) => {
            try {
                const conversation = await findConversationbyId(
                    conversationId
                );
                const isUserParticipant = isParticipant(
                    conversation,
                    socket.userId
                );
                if (!isUserParticipant) {
                    return socket.emit("socket_error", {
                        message:
                            "You are not a participant of this conversation.",
                    });
                }
                const room = `conversation:${conversationId}`;
                socket.join(room);
                console.log(
                    `👤 User ${socket.userId} joined ${room}`
                );
                socket.emit("conversation_joined", {
                    conversationId,
                });
            } catch (error) {
                console.log(
                    "Join conversation error:",
                    error.message
                );

                socket.emit("socket_error", {
                    message: error.message,
                });
            }
        })

        // send Message
        socket.on("send_message", async ({
            conversationId,
            message,
            messageType
        }) => {
            try {

                const createdMessage = await sendMessageService(
                    conversationId,
                    message,
                    messageType,
                    socket.userId
                );

                const room = `conversation:${conversationId}`;

                io.to(room).emit("new_message", createdMessage);

            } catch (error) {

                socket.emit("socket_error", {
                    message: error.message
                });

            }
        });
        socket.on("disconnect", () => {
            console.log("❌ Socket disconnected:", socket.id);
        });
    });
};

module.exports = socketHandler;