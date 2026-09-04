
const STATUS_CODES = require("../utility/status.utility")
const RESPONSE = require("../utility/response.utility")


const validateSignup =async (req, res, next) =>{
    if (!req.body.firstName) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter First Name";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    if (!req.body.lastName) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter Last Name";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    if (!req.body.email) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter Email";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    if (!req.body.password || req.body.password.length < 6) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message = "Please Enter Valid Password";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

next();
}


module.exports = {
    validateSignup,
}