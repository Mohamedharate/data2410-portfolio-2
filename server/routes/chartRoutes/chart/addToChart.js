"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");
const Product = require("../../../Modules/product");


router.post('/:email', async (req, res, next) => {

    const email = req.params.email;
    const addItem = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }

    const user = await User.findOne({email: email});
    const product = await Product.findOne({itemId: addItem.product_id});

    let added = false;

    for (let i = 0; i < user.chart.length; i++) {
        if (addItem.product_id === user.chart[i].itemId) {
            let totalSumProduct = user.chart[i].total + parseFloat(product.price*addItem.quantity)
            await User.updateOne(
                {email: email},
                {$inc: {
                    [`chart.${i}.quantity`]: addItem.quantity},
                    [`chart.${i}.total`]: parseFloat(totalSumProduct)
                });
            added = true;
        }
    }

    if (!added) {
        const newItem = {
            name: product.name,
            price: parseFloat(product.price),
            itemId: addItem.product_id,
            quantity: addItem.quantity,
            total: parseFloat(product.price*addItem.quantity)
        }
        try {
            await User.updateOne({email: email}, {$push: {chart: newItem}});
        } catch (err) {
            res.status(500).send("feil")
        }
    }
    res.status(200).send("Added")
})


module.exports = router;