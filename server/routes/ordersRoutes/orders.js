"use strict";
const express = require("express");
let router = express.Router();
const Order = require("../../Modules/order");
const User = require("../../Modules/user");
const Product = require("../../Modules/product");
const StringBuilder = require("string-builder");




router.post('/newOrder/:email', async (req, res) => {

    const email = req.body.email

    const user = await User.findOne({email: req.body.email});

    console.log(user.chart)

    const order = new Order({

        products: user.chart,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        country: req.body.country,
        zipCode: req.body.zipCode,
        city: req.body.city,
        street: req.body.street,
        phoneNumber: req.body.phoneNumber
    })

    await User.updateOne({email: email}, {$push: {orders: order}});
    await User.updateOne(
        {email: email},
        {$set: {[`chart`]: []}});

    await order.save()
        .then(data => {
            res.send("ADDED")

        })
        .catch(error => {
            res.send(error.toString());
        })
});

module.exports = router;