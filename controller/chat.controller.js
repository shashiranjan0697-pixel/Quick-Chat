const Chat = require("../model/chat.model");
const STATUS_CODES = require('../utility/status.utility');
const RESPONSE = require("../utility/response.utility");

const createChat = async (req, res) => {
    try{
        const { member } = req.body;

        const members = [...new Set([
            ...member.map(id => id.toString()),
            req.user
        ])];

        const chat = await Chat.create({
            member: members
        });

        RESPONSE.SUCCESS.data = chat;
        RESPONSE.SUCCESS.message = "Chat successfully Created.";
        res.status(STATUS_CODES.SUCCESS.CREATED).json(RESPONSE.SUCCESS);

    }   catch(e) {

            console.log(e);

            // duplicate chat
            if (e.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "Chat with this member already exist."
                });
            }
        
            res.status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
                err : e.name,
                message: e.message
            });

    }
}

module.exports = {
    createChat
}