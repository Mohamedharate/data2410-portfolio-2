const mongoose = require("mongoose");


const admin_schema = new mongoose.Schema(
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
        position: {
            type: String,
            required: true
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
            type: Number,
            required: false,
            minlength: 4,
            maxlength: 4
        },
        street: {
            type: String,
            required: false
        },
        phoneNumber: {
            type: Number,
            minlength: 8,
            maxlength: 12,
            required: false
        },
        date: {
            type: Date,
            default: Date.now
        },
    });

const Admin = mongoose.model("Admin", admin_schema);
module.exports = Admin;