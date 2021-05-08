"use strict";
const express = require("express");
let router = express.Router();
const Order = require("../../../Models/order");
const User = require("../../../Models/user");

const send = require('../../../sendMail/sendMailReceipt');
const formatReceipt = require('../../../sendMail/formatReceipt');


router.post('/', async (req, res) => {

    let tot;
    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type !== 'User') {
                return res.status(403).json({Error: "You have to sign in as user to order."})
            }
            const user = await User.findOne({_id: req.session.passport.user.id});

            const order = new Order({
                user: user.email,
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

            if (user) {
                if (user.cart.length < 1) return res.status(404).json({Error: "No cart"})
                else {
                    let tot = 0;
                    user.cart.forEach(item => {
                        tot = parseFloat(tot) + parseFloat(item.total);
                    })

                    await User.updateOne({email: email}, {$push: {orders: order}});
                    await User.updateOne(
                        {email: email},
                        {$set: {[`cart`]: []}});
                    await order.save()
                        .then(data => {
                            send(user, formatReceipt(user, order, tot))
                            return res.status(200).json({Message: "The order has been registered and a receipt is sent to the user"})
                        })
                        .catch(error => {
                            return res.status(400).json({Error: error.toString()});
                        })
                }
            } else
                return res.status(404).json({Error: "User not found."})
        } else {
            if (req.session.cart) {
                if (req.session.cart.length < 1) {
                    return res.status(404).json({Error: "No cart"})
                } else {
                    const order = new Order({
                        user: req.body.email,
                        products: req.session.cart,
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
                    tot = 0;
                    req.session.cart.forEach(item => {
                        tot = parseFloat(tot) + parseFloat(item.total);
                    })
                    req.session.cart = [];
                    req.session.orders = [];
                    req.session.orders.push(order)
                    await order.save()
                        .then(data => {
                            send(order, formatReceipt(order, order, tot))
                            return res.status(200).json({Message: "The order has been registered and a receipt is sent to the user"})
                        })
                        .catch(error => {
                            return res.status(400).json({Error: error.toString()});
                        })
                }
            } else {
                return res.status(404).json({Message: "No cart available"})
            }


        }
    }
    else {
        res.status(500).json({message: `Something has gone wrong!`})
    }


});

module.exports = router;