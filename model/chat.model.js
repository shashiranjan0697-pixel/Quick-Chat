const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema({
    member : {
        type : [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref : "User",
                unique : true
            }
        ]
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    unreadMessageCount : {
        type : Number,
        default : 0
    }
}, {timestamps : true});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;