const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const product_schema = new Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        name: {
            required: true,
            type: String,
            trim: true,
        },
        description: {
            required: true,
            type: String,
            trim: true,
        },
        price: {
            required: true,
            type: String,
        },
        imageUrl: {
            type: [],

        },
        category: {
            required: true,
            type: String,
        },
    });

const Product = mongoose.model("Product", product_schema);
module.exports = Product;