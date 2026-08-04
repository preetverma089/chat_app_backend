const conversationModel = require("../models/conversationModel");


const findDirectConversation = async (senderId, receiverId) => {
    return conversationModel.findOne({
        type: "direct",
        participants: {
            $all: [senderId, receiverId],
            $size: 2,
        },
    }).lean();
};

const createDirectConversation = async (senderId, receiverId) => {
    const chatConv = await conversationModel.create({
        type: "direct",
        participants: [senderId, receiverId],
        createdBy: senderId,
    })

    return { isNewConversation: true, conversation: chatConv };
}
const findOrCreateConversation = async (senderId, receiverId) => {
    const conversationDetails = await findDirectConversation(senderId, receiverId);
    if (conversationDetails) {
        return { isNewConversation: false, conversation: conversationDetails };
    }
    return await createDirectConversation(senderId, receiverId);
}


module.exports = { findOrCreateConversation }