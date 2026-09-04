const bcrypt = require('bcrypt');
const User = require("../model/user.model");


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

        res.status(200).json({
            data : user,
            message: "User successfully registered."
        });


    }   catch(e) {
        console.log(e);

        res.status(500).json({
            err : e.name,
            message: e.message
        });
    }
}


module.exports = {
    signup
}