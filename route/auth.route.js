const express = require("express");

const router = express.Router();

const user = require("../controller/auth.controller");

router.post("/signup" , user.signup);


module.exports = router;