const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true,
        },

        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        message: {
            type: String,
            trim: true,
        },

        messageType: {
            type: String,
            enum: [
                "text",
                "image",
                "video",
                "audio",
                "document",
            ],
            default: "text",
        },

        attachments: [
            {
                url: {
                    type: String,
                },
                fileName: {
                    type: String,
                },
                fileSize: {
                    type: Number,
                },
                mimeType: {
                    type: String,
                },
            },
        ],

        replyTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },

        isEdited: {
            type: Boolean,
            default: false,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

messageSchema.index({
    conversationId: 1,
    createdAt: -1,
});

messageSchema.index({
    senderId: 1,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;