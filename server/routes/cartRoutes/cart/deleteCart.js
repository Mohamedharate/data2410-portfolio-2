"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const Product = require("../../../Models/product");

router.delete('/', async (req, res, next) => {

    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type === 'User') {
                const user = await User.findOne({_id: req.session.passport.user.id});
                if (user.cart.length > 0) {
                    for (let item of user.cart) {
                        await Product.updateOne(
                            {itemId: item.itemId},
                            {
                                $inc: {
                                    quantity: item.quantity
                                }
                            });
                    }
                    await User.updateOne(
                        {_id: req.session.passport.user},
                        {$set: {[`cart`]: []}});

                    return res.status(200).json({message: "Cart is deleted!"})
                } else {
                    return res.status(400).json({message: `The user dont have any items in the cart!`})
                }
            } else {
                return res.status(403).json({Error: "You have to sign in as user to order."})
            }
        } else {
            if (req.session.cart.length > 0) {
                req.session.cart = [];
                return res.status(200).json({message: "Cart is deleted!"})
            } else {
                res.status(400).json({message: `The user dont have any items in the cart!`})
            }
        }
    } else {
        res.status(500).json({message: `Something has gone wrong!`})
    }
});

module.exports = router;