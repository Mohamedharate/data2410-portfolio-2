"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const Product = require("../../../Models/product");


router.get('/:itemId', async (req,
                              res, next) => {
    let itemId = req.params.itemId;
    const product = await Product.findOne({itemId: itemId});

    if (!product) return res.status(404).json({Error: `No product with item id ${itemId} found`})

    if (product.quantity >= 1) {
        let added = false;
        let user

        if (req.session) {
            if (req.session.passport) {

                if (req.session.passport.user && req.session.passport.user.type === 'User') {
                    user = await User.findOne({_id: req.session.passport.user.id});
                    if (!user) return res.status(404).json({Error: "User not found"})

                    for (let i = 0; i < user.cart.length; i++) {
                        let totalSumProduct = 0;
                        if (itemId === user.cart[i].itemId) {
                            totalSumProduct += parseFloat(product.price)
                            await User.updateOne(
                                {_id: user._id},
                                {
                                    $inc: {
                                        [`cart.${i}.quantity`]: 1
                                    },
                                    [`cart.${i}.total`]: totalSumProduct
                                });
                            await Product.updateOne(
                                {itemId: itemId},
                                {
                                    $inc: {
                                        quantity: -1
                                    }
                                });
                            added = true;
                            return res.status(200).json({Message: "The item has been added to cart successfully"})
                        }
                    }
                } else {
                    return res.status(403).json({Error: "You have to sign in as user to order."})
                }
                if (!added) {

                    const newItem = {
                        name: product.name,
                        img: product.imageUrl[0],
                        price: parseFloat(product.price),
                        date: new Date(),
                        itemId: itemId,
                        quantity: 1,
                        total: parseFloat(product.price)
                    }
                    try {
                        await User.updateOne({_id: user._id}, {$set: {hasCart: true}});
                        await User.updateOne({_id: user._id}, {$push: {cart: newItem}});
                        await Product.updateOne(
                            {itemId: itemId},
                            {
                                $inc: {
                                    quantity: -1
                                }
                            });
                        return res.status(200).json({Message: "The item has been added to cart successfully"})
                    } catch (err) {
                        return res.status(500).json({Error: "Failed to add the item to cart."})
                    }
                }
            } else if (req.session.cart && req.session.cart.length > 0) {
                for (let i = 0; i < req.session.cart.length; i++) {
                    if (itemId === req.session.cart[i].itemId) {
                        req.session.cart[i].quantity += 1;
                        req.session.cart[i].total += parseFloat(product.price);

                        await Product.updateOne(
                            {itemId: itemId},
                            {
                                $inc: {
                                    quantity: -1
                                }
                            });
                        added = true;
                        return res.status(200).json({Message: "The item has been added to cart successfully"})
                    }
                }
            }
            if (!added) {
                const newItem = {
                    name: product.name,
                    price: parseFloat(product.price),
                    itemId: itemId,
                    quantity: 1,
                    total: parseFloat(product.price)
                }
                if (!(req.session.cart)) {
                    req.session.cart = []
                }
                req.session.cart.push(newItem);
                try {

                    await Product.updateOne(
                        {itemId: itemId},
                        {
                            $inc: {
                                quantity: -1
                            }
                        });
                    return res.status(200).json({Message: "The item has been added to cart successfully"})
                } catch (err) {
                    return res.status(500).json({Error: "Failed to add the item to cart."})
                }
            }
        }
    } else {
        return res.status(400).json({Error: "Not enough items"})
    }
});

module.exports = router;