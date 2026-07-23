const Joi = require("joi");

const signUpValidation = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(8).required(),

    role: Joi.string()
        .valid("personal", "developer", "business")
        .optional()
});

const loginValidation = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().min(8).required()
});

module.exports = {
    signUpValidation,
    loginValidation
};