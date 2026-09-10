const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

    chatId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Chat",
    },

    content : {
        type : String,
        required : true
    },

    isSeen : {
        type: Boolean,
        default : false
    }

}, {timestamps : true});

const Message = mongoose.model("Message" , messageSchema);
module.exports = Message;