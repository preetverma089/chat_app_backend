const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { findOrCreateConversation, findAllConversationList } = require("../services/conversationService");
const { getUserById } = require("../services/userServices")


const createConversation = asyncHandler(async (req, res) => {
    const { receiverId } = req.body;
    const { id: senderId } = req.user;
    if (receiverId.toString() === senderId.toString()) {
        return res.status(400).json(new ApiResponse(400, "senderId and receiverId should not be same"))
    }
    await getUserById(receiverId);
    const conversation = await findOrCreateConversation(senderId, receiverId);
    return res.status(200).json(new ApiResponse(200, conversation.isNewConversation ? "Conversation created successfully." : "Conversation fetched successfully.", conversation))
});

const getConversationList = asyncHandler(async (req, res) => {
    const { id: senderId } = req.user;
    const ConversationList = await findAllConversationList(senderId);
    return res.status(200).json(new ApiResponse(200, ConversationList.length === 0 ? "No conversation fetched" : "conversationn fetched succesfully", ConversationList))
})

module.exports = { createConversation, getConversationList };
