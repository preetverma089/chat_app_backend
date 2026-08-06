const messageModel = require("../models/messageModel");
const { findConversationbyId, isParticipants, updateLastMessage } = require("../services/conversationService")


const sendMessageService = async (conversationId, message, messageType, senderId) => {
    const conversations = await findConversationbyId(conversationId);
    const isSenderExists = isParticipants(conversations, senderId);
    if (!isSenderExists) throw new ApiError(403, "You are not a participant of this conversation.");
    const createdMessage = await messageModel.create({
        conversationId,
        message,
        messageType,
        senderId
    })
    await updateLastMessage(conversationId, createdMessage)
    return createdMessage;
};



module.exports = { sendMessageService }