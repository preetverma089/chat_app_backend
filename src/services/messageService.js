const messageModel = require("../models/messageModel");
const { findConversationbyId, isParticipant, updateLastMessage } = require("../services/conversationService");
const ApiError = require("../utils/ApiError");


const sendMessageService = async (conversationId, message, messageType, senderId) => {
    const conversations = await findConversationbyId(conversationId);
    const isSenderExists = isParticipant(conversations, senderId);
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

const findAllMessages = async (conversationId) => {
    const messages = await messageModel.find({ conversationId }).populate(
        "senderId",
        "fullName").sort({ createdAt: 1 }).lean();
    return messages;
}
const getUsersMessages = async (userId, conversationId) => {
    const conversation = await findConversationbyId(conversationId);
    const isSenderExists = isParticipant(conversation, userId);
    if (!isSenderExists) throw new ApiError(403, "You are not a participant of this conversation.");
    return await findAllMessages(conversationId);
}



module.exports = { sendMessageService, getUsersMessages }