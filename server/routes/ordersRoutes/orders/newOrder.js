"use strict";
const express = require("express");
let router = express.Router();
const Order = require("../../../Models/order");
const User = require("../../../Models/user");

const send = require('../../../sendMail/sendMailReceipt');
const formatReceipt = require('../../../sendMail/formatReceipt');

router.post('/', async (req, res) => {


    if (req.session) {

        const {
            firstName,
            lastName,
            email,
            phoneNumber
        } = req.body;

        let shippingAddress;

        let billingAddress = {
            country: req.body.country,
            city: req.body.city,
            street: req.body.street,
            zipCode: req.body.zipCode
        }
        shippingAddress = billingAddress;

        if (req.body.separate_shipping) {
            shippingAddress = {
                country: req.body.shippingCountry,
                city: req.body.shippingCity,
                street: req.body.shippingStreet,
                zipCode: req.body.shippingZipCode
            }
        }

        if (req.session.passport && req.session.passport.user) {

            if (req.session.passport.user.type !== 'User') {
                return res.status(403).json({Error: "You have to sign in as user to order."})
            }
            const user = await User.findOne({_id: req.session.passport.user.id});
            if (!user) {
                return res.status(404).json({Error: "User not found."})
            }
            const products = user.cart;
            if (products.length < 1) {
                return res.status(404).json({Error: "You don't have anything in your cart"})
            }

            let tot = 0;
            products.forEach(item => {
                tot = parseFloat(tot) + parseFloat(item.total);
            })

            let order = await new Order({
                user: user.email,
                products: products,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phoneNumber: phoneNumber,
                shippingAddress: shippingAddress,
                billingAddress: billingAddress,
                total: parseFloat(tot)
            })

            let failed = false;
            await order.save()
                .then(data => {
                    send(user, formatReceipt(user, order, products))
                })
                .catch(error => {
                    failed = true;
                    console.log(error)
                    return res.status(400).json({Error: error.toString()});
                })

            if (!failed) {

                try {

                    await User.updateOne({email: user.email}, {$push: {orders: order}});
                } catch (err) {
                    failed = true;
                    return res.status(500).json({Error: err.toString()});
                }
                try {
                    await User.updateOne(
                        {email: user.email},
                        {$set: {[`cart`]: []}});
                    await User.updateOne(
                        {email: user.email},
                        {$set: { hasCart: false}});

                } catch (err) {
                    failed = true;
                    return res.status(500).json({Error: err.toString()});
                }
                return res.status(200).json({Message: "The order has been registered and a receipt is sent to the user"})
            } else {
                return res.status(500).json({Error: "Something went wrong!"})

            }


        } else if (req.session.cart) {

            if (req.session.cart.length < 1) {
                return res.status(404).json({Error: "You don't have anything in your cart"})
            } else {
                let products = req.session.cart;
                let tot = 0;
                products.forEach(item => {
                    tot = parseFloat(tot) + parseFloat(item.total);
                })

                let order = await new Order({
                    user: "Guest",
                    products: products,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    shippingAddress: shippingAddress,
                    billingAddress: billingAddress,
                    total: parseFloat(tot)
                })

                let failed = false;
                await order.save()
                    .then(data => {
                        send(order, formatReceipt(order, order, products))
                    })
                    .catch(error => {
                        failed = true;
                        return res.status(400).json({Error: error.toString()});
                    })
                req.session.cart = [];
                req.session.orders = [];
                req.session.orders.push(order)

                if (!failed) {
                    return res.status(200).json({Message: "The order has been registered and a receipt is sent to the user"})
                } else {
                    return res.status(500).json({Error: "Something went wrong!"})
                }
            }
        } else {
            return res.status(404).json({Error: "No cart available"})
        }
    } else {
        return res.status(500).json({Error: "Something went wrong!"})
    }

});

module.exports = router;