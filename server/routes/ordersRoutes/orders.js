"use strict";
const express = require("express");
let router = express.Router();
const Order = require("../../Modules/order");
const User = require("../../Modules/user");
const Product = require("../../Modules/product");
const StringBuilder = require("string-builder");
const date = require('date-and-time')

const send = require('../../sendMail/sendMailReceipt');
const formatReceipt = require('../../sendMail/formatReceipt');

let invoiceNumber = 1111;



router.post('/newOrder/:email', async (req, res) => {
    const email = req.params.email;

    const user = await User.findOne({email: req.body.email});

    if (user) {
        if (user.cart.length < 1) return res.status(404).json({Error: "No cart"})

        else {
            let tot = 0;
            user.cart.forEach(item => {
                tot = parseFloat(tot) + parseFloat(item.total);
            })

            let orderNumber = invoiceNumber++;
            const order = new Order({
                user:user.email,
                orderNumber: orderNumber,
                products: user.cart,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                country: req.body.country,
                zipCode: req.body.zipCode,
                city: req.body.city,
                street: req.body.street,
                phoneNumber: req.body.phoneNumber,
                total: parseFloat(tot)
            })
            await User.updateOne({email: email}, {$push: {orders: order}});
            await User.updateOne(
                {email: email},
                {$set: {[`cart`]: []}});
            await order.save()
                .then(data => {
                    send(user, formatReceipt(user,order,tot))
                    res.send("ADDED")
                })
                .catch(error => {
                    res.send(error.toString());
                })
        }
    }
    else return res.status(404).json({Error: "User not found."})
});

module.exports = router;