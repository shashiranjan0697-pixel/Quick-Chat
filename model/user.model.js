const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: [true, "User already registered"],
        lowercase: true,
        trim: true,
        match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email"
        ]
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    profilePic: {
        type: String
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;