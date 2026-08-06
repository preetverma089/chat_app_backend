const ApiError = require("../utils/ApiError");

const validate = (schema, property = "body") => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], {
            abortEarly: false,
        });

        if (error) {
            const errors = error.details.map((err) => err.message);

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