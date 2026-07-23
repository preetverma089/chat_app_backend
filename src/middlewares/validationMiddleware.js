const ApiError = require("../utils/ApiError");

const validate = (schema) => {

    return (req, res, next) => {

        const { error } = schema.validate(req.body, {
            abortEarly: false
        });

        if (error) {

            const errors = error.details.map(err => err.message);

            return next(
                new ApiError(
                    400,
                    "Validation Failed",
                    errors
                )
            );
        }

        next();
    };
};

module.exports = validate;