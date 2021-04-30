const mongoose = require("mongoose");

const user_schema = new mongoose.Schema(
    {
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
            required: true,
        },
        password: {
            type: String,
            required: true
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
            required: true,
            minlength: 4,
            maxlength: 4
        },
        street: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            minlength: 8,
            maxlength: 12,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        orders: {
            type: []
        },
        chart: {
            type: []
        }
    });

const User = mongoose.model("User", user_schema);
module.exports = User;