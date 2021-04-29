const mongoose = require("mongoose");


function getID() {
    return Math.floor(1000 + Math.random() * 8999)
}

const admin_schema = new mongoose.Schema(
    {
        adminId: {
            unique: true,
            type: String,
            default: getID,
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
        position:{
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
            required: true,
            minlength: 2,
            maxlength: 30
        },
        city: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30
        },
        zipCode: {
            type: Number,
            required: true,
            minlength: 4,
            maxlength: 4
        },
        street: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            minlength: 8,
            maxlength: 12,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
    });

const Admin = mongoose.model("Admin", admin_schema);
module.exports = Admin;