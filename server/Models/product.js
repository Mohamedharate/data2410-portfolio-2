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
            default: Date.now,
        },
        name: {
            unique: true,

            required: true,
            type: String,
            minlength: 2,
            maxlength: 50
        },
        descriptionShort: {
            required: true,
            type: String,
            minlength: 10,
            maxlength: 150
        },
        descriptionLong: {
            required: true,
            type: String,
            minlength: 20,
            maxlength: 2000
        },
        price: {
            required: true,
            type: Decimal128,
            min: 0,
            max: 100000
        },
        imageUrl: {
            required: true,
            type: [],
            minlength: 1,
        },
        category: {
            required: true,
            type: String,
            minlength: 5,
            maxlength: 20
        },
        quantity: {
            required: true,
            type: Number,
            max: 2000,
            min: 0
        },
        reviews: {
            type: []
        }
    });

const Product = mongoose.model("Product", product_schema);
module.exports = Product;