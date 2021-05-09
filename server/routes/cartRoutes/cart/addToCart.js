"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const Product = require("../../../Models/product");


router.post('/', async (req,
                        res, next) => {
    const addItem = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    const product = await Product.findOne({itemId: addItem.product_id});
    if (!product) return res.status(404).json({Error: `No product with item id ${addItem.product_id} found`})
    if (addItem.quantity <= product.quantity) {
        let added = false;
        let user

        if (req.session) {
            if (req.session.passport) {
                if (req.session.passport.user && req.session.passport.user.type === 'User') {
                    user = await User.findOne({_id: req.session.passport.user.id});
                    for (let i = 0; i < user.cart.length; i++) {
                        if (addItem.product_id === user.cart[i].itemId) {
                            let totalSumProduct = user.cart[i].total + parseFloat(product.price * addItem.quantity)
                            await User.updateOne(
                                {_id: user._id},
                                {
                                    $inc: {
                                        [`cart.${i}.quantity`]: addItem.quantity
                                    },
                                    [`cart.${i}.total`]: parseFloat(totalSumProduct)
                                });
                            await Product.updateOne(
                                {itemId: addItem.product_id},
                                {
                                    $inc: {
                                        quantity: -addItem.quantity
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
                        itemId: addItem.product_id,
                        quantity: addItem.quantity,
                        total: parseFloat(product.price * addItem.quantity)
                    }
                    try {
                        await User.updateOne({_id: user._id}, {$set: {hasCart: true}});
                        await User.updateOne({_id: user._id}, {$push: {cart: newItem}});
                        await Product.updateOne(
                            {itemId: addItem.product_id},
                            {
                                $inc: {
                                    quantity: -addItem.quantity
                                }
                            });
                        return res.status(200).json({Message: "The item has been added to cart successfully"})
                    } catch (err) {
                        return res.status(500).json({Error: "Failed to add the item to cart."})
                    }
                }
            } else if (req.session.cart && req.session.cart.length > 0) {
                for (let i = 0; i < req.session.cart.length; i++) {
                    if (addItem.product_id === req.session.cart[i].itemId) {
                        req.session.cart[i].quantity += addItem.quantity;
                        req.session.cart[i].total += parseFloat(product.price * addItem.quantity);

                        await Product.updateOne(
                            {itemId: addItem.product_id},
                            {
                                $inc: {
                                    quantity: -addItem.quantity
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
                    itemId: addItem.product_id,
                    quantity: addItem.quantity,
                    total: parseFloat(product.price * addItem.quantity)
                }
                if (!(req.session.cart)) {
                    req.session.cart = []
                }
                req.session.cart.push(newItem);
                try {

                    await Product.updateOne(
                        {itemId: addItem.product_id},
                        {
                            $inc: {
                                quantity: -addItem.quantity
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