const mongoose = require("mongoose");

const order_schema = new mongoose.Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        products: {
            type: [],
            required: true
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
            required: true,
        },
        country: {
            type: Number,
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
        city: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30
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
        }

    });

const Order = mongoose.model("Order", order_schema);
module.exports = Order;
