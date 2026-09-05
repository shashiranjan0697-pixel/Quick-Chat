const jwt = require('jsonwebtoken');
require("dotenv").config();

const User = require("../model/user.model");
const STATUS_CODES = require("../utility/status.utility")
const RESPONSE = require("../utility/response.utility")


const validateSignup =async (req, res, next) =>{
    if (!req.body.firstName) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter First Name";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    if (!req.body.lastName) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter Last Name";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    if (!req.body.email) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter Email";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    if (!req.body.password || req.body.password.length < 6) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message = "Please Enter Valid Password";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

next();
}


const validateSignIn =async (req, res, next) =>{
    

    if (!req.body.email) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter Email";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

    if (!req.body.password) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message = "Please Enter Password";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
    }

next();
}


const isAuthnticated = async (req, res, next) =>{
    try{
        
        const token = req.headers["token"];

        if(!token){
            RESPONSE.FAILURE.err= "Token not provided";
            return res.status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST).json(RESPONSE.FAILURE);
        }

        const response = jwt.verify(token, process.env.AUTH_KEY);

        const user = await User.findById(response.id);

        if (!user) {
            RESPONSE.FAILURE.err = "User not found";
            return res.status(STATUS_CODES.CLIENT_ERROR.NOT_FOUND).json(RESPONSE.FAILURE);
        }

        req.user = response.id; 

        next();

    }   catch (e) {

        errorRes.err = e.message;
        errorRes.message= "Invalid Token";
        return res.status(401).send(errorRes);

    }

}

module.exports = {
    validateSignup,
    validateSignIn,
    isAuthnticated
}