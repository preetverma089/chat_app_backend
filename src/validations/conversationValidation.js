const Joi = require("joi");
const mongoose = require("mongoose")
const createConversationValidation = Joi.object({
    receiverId: Joi.string()
        .required()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) { // basically ye check krta h recieverId ko mongoDb object id me convert kr skte h ya nhi
                return helpers.message("Invalid receiverId");
            }
            return value;
        })
});

module.exports = { createConversationValidation }