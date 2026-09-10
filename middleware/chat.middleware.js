
const Chat = require("../model/chat.model");
const STATUS_CODES = require("../utility/status.utility")
const RESPONSE = require("../utility/response.utility");


const validate = async (req, res, next) => {
    const { member, lastMessage } = req.body;

    // if(!lastMessage) {

    // }

    if (!Array.isArray(member) || member.length !== 1) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message = "Please provide only one member";

        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    next();
};

module.exports = {
    validate
}