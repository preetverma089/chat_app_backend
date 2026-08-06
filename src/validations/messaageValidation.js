const Joi = require("joi");
const mongoose = require("mongoose");

const sendMessagageValidation = Joi.object({
    conversationId: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) { // basically ye check krta h recieverId ko mongoDb object id me convert kr skte h ya nhi
                return helpers.message("Invalid conversationId");
            }
            return value;
        }),
    message: Joi.string().trim().max(5000).required(),
    messageType: Joi.string()
        .valid(
            "text",
            "image",
            "video",
            "audio",
            "document"
        )
        .required(),
});

module.exports = { sendMessagageValidation }