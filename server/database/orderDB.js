const mongoose = require("mongoose");

const order_schema = new mongoose.Schema(
    {
        products: {
            type: [],
            required: true

        }
    });

const Order = mongoose.model("Order", order_schema);
module.exports = Order;
