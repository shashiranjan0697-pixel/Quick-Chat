const express = require("express");

const router = express.Router();

const user = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware")

router.post("/signup", 
        authMiddleware.validateSignup, 
        user.signup);


module.exports = router;