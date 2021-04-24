const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const product_schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        category: {
            type: String,
        },
    });

const Product = mongoose.model("Product", product_schema);
module.exports = Product;