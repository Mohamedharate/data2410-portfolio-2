const mongoose = require("mongoose");


const user_schema = new mongoose.Schema(
    {
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
    },
    password:{
        type: String,
        required: true
    },
    zipCode:{
        type: String,
        required: true
    },
    street:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true
    },
});

const User = mongoose.model("User", user_schema);

module.exports = User;
