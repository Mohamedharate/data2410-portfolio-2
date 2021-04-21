const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
    },
    password:{
        type: String,
    },
});

const User = mongoose.model("User", user_schema);

// noe galt med node?

module.exports = User;
