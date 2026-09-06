const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const chatController = require("../controller/chat.controller");
const chatMiddleware = require("../middleware/chat.middleware");

router.post("/create",
        authMiddleware.isAuthnticated,
        chatMiddleware.validate,
        chatController.createChat
    );


module.exports = router;