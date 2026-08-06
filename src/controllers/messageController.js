const asyncHandler = require("../utils/asyncHandler");
const { sendMessageService } = require("../services/messageService");
const ApiResponse = require("../utils/ApiResponse")
const sendMessage = asyncHandler(async (req, res) => {
    const { id: senderId } = req.user;
    const { conversationId, message, messageType } = req.body;
    const response = await sendMessageService(conversationId, message, messageType, senderId);
    return res.status(201).json(new ApiResponse(201, "message sent succesfully", response));
});


module.exports = { sendMessage };