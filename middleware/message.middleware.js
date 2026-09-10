const STATUS_CODES = require("../utility/status.utility");
const RESPONSE = require("../utility/response.utility");


const validateMessage = (req, res, next) =>{

    if(!req.body.chatId) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message = "please enter ChatId.";

        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);

    }

    if (!req.body.content) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message = "Please enter body of the message.";

        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

next();
}

module.exports = {
    validateMessage
}