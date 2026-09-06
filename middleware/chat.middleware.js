
const Chat = require("../model/chat.model");
const STATUS_CODES = require("../utility/status.utility")
const RESPONSE = require("../utility/response.utility");


const validate = async (req, res, next) => {
    if(!req.body){
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter MemberId";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    const {member} = req.body;

    if (!member || !Array.isArray(member) || member.length === 0) {
            RESPONSE.FAILURE.err = "BAD REQUEST";
            RESPONSE.FAILURE.message = "Please provide chat member";
            return res
                .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
                .json(RESPONSE.FAILURE);
        }

    if (member.includes(req.user.toString())) {
            RESPONSE.FAILURE.err = "BAD REQUEST";
            RESPONSE.FAILURE.message = "You cannot create a chat with yourself";
            return res
                .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
                .json(RESPONSE.FAILURE);
        }

next();
}

module.exports = {
    validate
}