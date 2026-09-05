const express = require("express");
const router = express.Router();

const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/:id", 
        userController.getUserById
    );

router.get("/",
        authMiddleware.isAuthnticated,
        userController.getAll
    );

router.patch("/update",
        authMiddleware.isAuthnticated,
        userController.updateUser
    );


module.exports = router;