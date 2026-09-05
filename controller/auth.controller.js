const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../model/user.model");
const STATUS_CODES = require('../utility/status.utility');
const RESPONSE = require("../utility/response.utility");



const signup = async (req, res) => {
    try{
        const {firstName, lastName, email, password, profilePic} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            firstName, 
            lastName, 
            email, 
            password : hashedPassword, 
            profilePic
        };

        const user = await User.create(data);

        res.status(STATUS_CODES.SUCCESS.CREATED).json({
            data : user,
            message: "User successfully registered."
        });


    }   catch(e) {
        console.log(e);

        // duplicate email
        if (e.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "User already registered"
            });
    }

        res.status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
            err : e.name,
            message: e.message
        });
    }
}


const signin = async (req, res) => {
    try{
        
        const user = await User.findOne({
            email: req.body.email
        });

        if(!user) {
            RESPONSE.FAILURE.err = "Invalid email";
            RESPONSE.FAILURE.message = "User not found with given email";
            return res.status(STATUS_CODES.CLIENT_ERROR.NOT_FOUND).json(RESPONSE.FAILURE);
        }

        const hashedPassword = user.password;

        const response = await bcrypt.compare(req.body.password, hashedPassword);

        if(!response) {
            RESPONSE.FAILURE.err = "Invalid Password";
            RESPONSE.FAILURE.message = "Either email or password is incorrect.";
            return res.status(STATUS_CODES.CLIENT_ERROR.NOT_FOUND).json(RESPONSE.FAILURE);
        }

        const token = jwt.sign(
            {
                id:user.id,
                email:user.email
            },
            process.env.AUTH_KEY,
            {expiresIn : "1y"}
        )

        res.status(STATUS_CODES.SUCCESS.ACCEPTED).json({
            data : user,
            message: "User logged in successfully.",
            token : token  
        });

    }   catch(e) {
        console.log(e);

        res.status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
            err : e.name,
            message: e.message
        });
    }
}


module.exports = {
    signup,
    signin
}