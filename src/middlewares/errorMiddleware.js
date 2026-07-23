const STATUS = require("../constants/status.codes");

const errorHandler = (err, req, res, next) => {

    return res.status(err.statusCode || STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || []
    });

}

module.exports = errorHandler;