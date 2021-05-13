const mongoose = require("mongoose");

function getRandomInt() {
    return Math.floor(10000 + Math.random() * 89999);
}

const user_schema = new mongoose.Schema(
    {
        customerId:{
            type: String,
            required: true,
            unique: true,
            default: getRandomInt()
        },
        googleId:{
          type: String,
          required: false
        },
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30
        },
        email: {
            unique: true,
            type: String,
            required: false,
        },
        profileImage: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 30
        },
        city: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 30
        },
        zipCode: {
            type: String,
            required: false,
            minlength: 4,
            maxlength: 4
        },
        street: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: String,
            minlength: 8,
            maxlength: 12,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        },
        orders: {
            type: []
        },
        hasCart:{
          type:Boolean,
          default:false,
        },
        cart: {
            type: [],
            sum: {}
        },
        subscriber:{
            type: Boolean,
            required:false,
            default: false
        }
    });

const User = mongoose.model("User", user_schema);
module.exports = User;
