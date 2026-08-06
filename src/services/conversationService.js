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

const findAllConversationList = async (senderId) => {
    const conversationList = await conversationModel.find({
        participants: senderId
    }).populate(
        "participants",
        "fullName email profilePicture"
    ).populate(
        "lastMessage",
        "message messageType createdAt"
    ).sort({
        lastMessageAt: -1,
    }).lean();

    const response = conversationList.map((user) => {
        const otherParticipants = user.participants.find((item) => {
            return item._id.toString() !== senderId.toString();
        })
        return {
            _id: user._id,
            type: user.type,
            participant: otherParticipants,
            lastMessage: user.lastMessage,
            lastMessageAt: user.lastMessageAt,
        };
    })
    return response;
}

const findConversationbyId = async (conversationId) => {
    const conversationDetail = await conversationModel.findById(conversationId);
    if (!conversationDetail) throw new ApiError(404, "Conversation not found");
    return conversationDetail;
}

const isParticipant = (conversations, senderId) => {
    return conversations.participants.some(
        (participant) => participant.toString() === senderId.toString()
    );
}
const updateLastMessage = async (conversationId, currentMessageDetail) => {
    await conversationModel.findByIdAndUpdate(conversationId, { lastMessage: currentMessageDetail._id, lastMessageAt: currentMessageDetail.createdAt });
}

module.exports = { findOrCreateConversation, findAllConversationList, findConversationbyId, isParticipant, updateLastMessage }