const Chat = require("../model/chat.model");
const Message = require("../model/message.model");
const STATUS_CODES = require('../utility/status.utility');
const RESPONSE = require("../utility/response.utility");


const sendMessage = async (req, res) => {
    try{

        req.body.sender = req.user;

        const message = await Message.create(req.body);

        const chat = await Chat.findOneAndUpdate(
            {
                _id:req.body.chatId,
            },
            {
                lastMessage : message._id,
                $inc :{
                        messageCount : 1
                    }
            },
            {
                returnDocument : "after"
            }
        );

        RESPONSE.SUCCESS.data = chat;
        RESPONSE.SUCCESS.message = "Message successfully send.";

        return res
            .status(STATUS_CODES.SUCCESS.CREATED)
            .json(RESPONSE.SUCCESS);


    }   catch (e) {

        console.log(e);

        return res
            .status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
            .json({
                err: e.name,
                message: e.message
            });

    }
}



module.exports = {
    sendMessage
}