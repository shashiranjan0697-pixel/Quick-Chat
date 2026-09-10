const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const messagetController = require("../controller/message.controller");
const messageMiddleware = require("../middleware/message.middleware");

router.post("/send",
        authMiddleware.isAuthnticated,
        messageMiddleware.validateMessage,
        messagetController.sendMessage
    );

router.get("/:chatId",
        authMiddleware.isAuthnticated,
        messagetController.getAllMessage
    );


module.exports = router;
