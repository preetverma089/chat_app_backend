const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["direct", "group"],
            required: true,
        },

        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],

        groupName: {
            type: String,
            trim: true,
        },

        groupProfilePicture: {
            type: String,
            default: "",
        },

        groupDescription: {
            type: String,
            trim: true,
        },

        groupAdmin: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },

        lastMessageAt: {
            type: Date,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    });


module.exports = mongoose.model("conversation", conversationSchema)