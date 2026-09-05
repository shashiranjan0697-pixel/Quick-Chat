const bcrypt = require("bcrypt");

const User = require("../model/user.model");
const STATUS_CODES = require('../utility/status.utility');
const RESPONSE = require("../utility/response.utility");

const getUserById = async (req, res) =>{
    try{

        if (!req.params.id) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter UserId";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
        }

        const user = await User.findById(req.params.id);

        if(!user) {
            RESPONSE.FAILURE.err = "Invalid UserId";
            RESPONSE.FAILURE.message = "User not found with given UserId";
            return res.status(STATUS_CODES.CLIENT_ERROR.NOT_FOUND).json(RESPONSE.FAILURE);
        }

        RESPONSE.SUCCESS.data = user;
        RESPONSE.SUCCESS.message = "User successfully fetched."
        res.status(STATUS_CODES.SUCCESS.OK).json(RESPONSE.SUCCESS);

    }   catch(e) {

        console.log(e);

        res.status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
            err : e.name,
            message: e.message
        });

    }
}




const updateUser = async (req, res) =>{
    try{

        const updatedData = req.body;

        if(req.body.password){
            updatedData.password = await bcrypt.hash(req.body.password, 10);
        }
        

        if (!updatedData) {
        RESPONSE.FAILURE.err = "BAD REQUEST";
        RESPONSE.FAILURE.message =  "Please Enter data";
        return res
            .status(STATUS_CODES.CLIENT_ERROR.BAD_REQUEST)
            .json(RESPONSE.FAILURE);
        }

        const user = await User.findByIdAndUpdate(
            req.user ,
            updatedData,
            { runValidators: true },
            {
            returnDocument: 'after'
            }
        );

        RESPONSE.SUCCESS.data = user;
        RESPONSE.SUCCESS.message = "user successfully updated";
        res.status(STATUS_CODES.SUCCESS.ACCEPTED).json(RESPONSE.SUCCESS);

    }   catch(e) {

        console.log(e);

        res.status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
            err : e.name,
            message: e.message
        });

    }
}

const getAll = async (req, res) => {
    try{

        const users = await User.find({});

        const finalUser = users.filter((user) =>{
            return user.id != req.user;
        });

        if(finalUser.length === 0) {
            RESPONSE.SUCCESS.message = "No User found";
            return res.status(STATUS_CODES.SUCCESS.OK).json(RESPONSE.SUCCESS);
        }

        RESPONSE.SUCCESS.data = finalUser;
        RESPONSE.SUCCESS.message = "All user successfully fetched";
        res.status(STATUS_CODES.SUCCESS.ACCEPTED).json(RESPONSE.SUCCESS);


    }   catch (e) {

        console.log(e);

        res.status(STATUS_CODES.SERVER_ERROR.INTERNAL_SERVER_ERROR).json({
            err : e.name,
            message: e.message
        });

    }
}


module.exports = {
    getUserById,
    updateUser,
    getAll
}
