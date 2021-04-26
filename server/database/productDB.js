const mongoose = require("mongoose");
const {Decimal128} = require("bson");

const Schema = mongoose.Schema;

function getID() {
    return Math.floor(1000 + Math.random() * 8999)
}
const product_schema = new Schema(
    {
        itemId: {
            unique: true,
            type: String,
            default: getID,
        },
        date: {
            type: Date,
            default: Date.now
        },
        name: {
            required: true,
            type: String,
        },
        description: {
            required: true,
            type: String,
        },
        price: {
            required: true,
            type: Decimal128,
        },
        imageUrl: {
            type: [],

        },
        category: {
            required: true,
            type: String,
        },
        quantity: {
            required: true,
            type: Number,
        },
    });

const Product = mongoose.model("Product", product_schema);
module.exports = Product;