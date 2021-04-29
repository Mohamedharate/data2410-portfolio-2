"use strict";
const express = require("express");
let router = express.Router();
const Order = require("../Modules/order");
const User = require("../Modules/user");
const Product = require("../Modules/product");
const StringBuilder = require("string-builder");


router.post('/cart/:email', async (req, res, next) => {

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
            await User.updateOne(
                {email: email},
                {$inc: {[`chart.${i}.quantity`]: addItem.quantity}});

            added = true;
        }
    }

    let total = 0
    if (!added) {
        const newItem = {
            name: product.name,
            price: product.price,
            itemId: addItem.product_id,
            quantity: addItem.quantity,
            total: total
        }
        try {
            await User.updateOne({email: email}, {$push: {chart: newItem}});
        } catch (err) {
            res.status(500).send("feil")
        }
    }
    res.status(200).send("Added")
})
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

router.post('/newOrder/:email', async (req, res) => {

    const email = req.body.email

    const user = await User.findOne({email: email});

    const order = new Order({

        products: req.body.products,
        firstName: req.body.firstName,
        lastName: req.body.firstName,
        email: req.body.email,
        country: req.body.country,
        zipCode: req.body.zipCode,
        city: req.body.city,
        street: req.body.street,
        phoneNumber: req.body.phoneNumber
    })

    await User.updateOne({email: email}, {$push: {orders: order}});

    order.products.forEach(product => {


    })
    order.save()
        .then(date => {
            res.json(date)
        })
        .catch(error => {
            res.json(error);
        })
});

module.exports = router;