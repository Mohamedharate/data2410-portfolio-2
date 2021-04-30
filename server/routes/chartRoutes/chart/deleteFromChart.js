"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");
const Product = require("../../../Modules/product");


router.delete('/cart/:email', async (req, res, next) => {

    const email = req.params.email;
    const deleteItem = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }

    const user = await User.findOne({email: email});
    const product = await Product.findOne({itemId: deleteItem.product_id});

    let deleted = false;

    for (let i = 0; i < user.chart.length; i++) {
        if (deleteItem.product_id === user.chart[i].itemId) {
            await User.updateOne(
                {email: email},
                {$inc: {[`chart.${i}.quantity`]: -deleteItem.quantity}});
            deleted = true;
        }
    }
    if (deleted) res.send("Deleted")
    else res.send("not Deleted")
})


module.exports = router;