const express = require("express");

const router = express.Router();

const authController = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/signup", 
        authMiddleware.validateSignup, 
        authController.signup);

router.post("/signin", 
        authMiddleware.validateSignIn, 
        authController.signin);

        
module.exports = router;