const mongoose = require("mongoose");
const {Decimal128} = require("bson");


const order_schema = new mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        total: {
            type: Decimal128,
            required: true
        },
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
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            minlength: 8,
            maxlength: 12,
            required: true
        },
        billingAddress: {
            type: JSON,
            required: true
        },
        shippingAddress: {
            type: JSON,
            required: true
        }

    });

const Order = mongoose.model("Order", order_schema);
module.exports = Order;
