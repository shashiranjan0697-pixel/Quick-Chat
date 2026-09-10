const Chat = require("../model/chat.model");
const STATUS_CODES = require('../utility/status.utility');
const RESPONSE = require("../utility/response.utility");

const createChat = async (req, res) => {
    try {

        const oldChat = await Chat.find({});

        const isChatExist = oldChat.some((chat) =>
            chat.member.includes(req.body.member[0]) &&
            chat.member.includes(req.user.toString()) &&
            chat.member.length === 2
        );

        if(isChatExist) {
            RESPONSE.FAILURE.err = "BAD REQUEST";
            RESPONSE.FAILURE.message =
                "Old chat with this member already exists.";

            return res
                .status(STATUS_CODES.CLIENT_ERROR.CONFLICT)
                .json(RESPONSE.FAILURE);
        }
        
        console.log("OldChat : ", oldChat);


        req.body.member = [...req.body.member, req.user];

        const newChat = await Chat.create(req.body);

        RESPONSE.SUCCESS.data = newChat;
        RESPONSE.SUCCESS.message = "Chat successfully created.";

        return res
            .status(STATUS_CODES.SUCCESS.CREATED)
            .json(RESPONSE.SUCCESS);

    } catch (e) {

        console.log(e);

        return res
            .status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
            .json({
                err: e.name,
                message: e.message
            });
    }
};



const getAllChat = async (req, res) => {
    try {
        const chats = await Chat.find({
            member: req.user
        })
        .populate("member")
        .populate("lastMessage");

        if(!chats) {
            RESPONSE.FAILURE.err = "BAD REQUEST";
            RESPONSE.FAILURE.message =
                "No chat found with given id.";

            return res
                .status(STATUS_CODES.CLIENT_ERROR.NOT_FOUND)
                .json(RESPONSE.FAILURE);
        }

        return res.status(STATUS_CODES.SUCCESS.OK).json({
            data: chats,
            message: "All chats successfully fetched"
        });

    } catch (e) {
        console.log(e);

        return res
            .status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR)
            .json({
                err: e.name,
                message: e.message
            });
    }
};


const getById = async (req, res) =>{
    try{

        const chat = await Chat.findById(req.params.id)
            .populate("member")
            .populate("lastMessage");

        if(!chat) {
            RESPONSE.FAILURE.err = "BAD REQUEST";
            RESPONSE.FAILURE.message =
                "No chat found with given id.";

            return res
                .status(STATUS_CODES.CLIENT_ERROR.NOT_FOUND)
                .json(RESPONSE.FAILURE);
        }

        return res.status(STATUS_CODES.SUCCESS.OK).json({
            data: chat,
            message: "All chats successfully fetched"
        });

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
    createChat, 
    getAllChat,
    getById
}