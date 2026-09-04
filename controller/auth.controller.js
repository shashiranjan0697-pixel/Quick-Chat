const bcrypt = require('bcrypt');
const User = require("../model/user.model");
const STATUS_CODES = require('../utility/status.utility');


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


module.exports = {
    signup
}