const asyncHandler = require("../utils/asyncHandler");
const { sendMessageService, getUsersMessages } = require("../services/messageService");
const ApiResponse = require("../utils/ApiResponse")
const sendMessage = asyncHandler(async (req, res) => {
    const { id: senderId } = req.user;
    const { conversationId, message, messageType } = req.body;
    const response = await sendMessageService(conversationId, message, messageType, senderId);
    return res.status(201).json(new ApiResponse(201, "message sent succesfully", response));
});

const getMessages = asyncHandler(async (req, res) => {
    const { id: userId } = req.user;
    const { conversationId } = req.params;
    const response = await getUsersMessages(userId, conversationId);
    return res.status(200).json(new ApiResponse(200, "messages history fetched successfully", response));
})


module.exports = { sendMessage, getMessages };