"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const Product = require("../../../Models/product");


router.put('/', async (req, res, next) => {

    //TODO Remains pending when called.
    const deleteItem = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }
    const product = await Product.findOne({itemId: deleteItem.product_id});
    if (!product) return res.status(404).json({Error: `No product with item id ${deleteItem.product_id} found`})
    let deleted = false;
    let totalSumProduct = parseFloat(product.price * deleteItem.quantity)

    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type !== 'User')
            {return res.status(403).json({Error: "You don't have permission for this"}) }
                const user = await User.findOne({_id: req.session.passport.user.id});
            if (!user) return res.status(404).json({Error: "User not found"})
            for (let i = 0; i < user.cart.length; i++) {
                if (deleteItem.product_id === user.cart[i].itemId) {
                    if (user.cart[i].quantity >= deleteItem.quantity && user.cart[i].quantity === 0 && user.cart[i].quantity !== null) {
                        try {
                            await User.updateOne(
                                {email: email},
                                {
                                    $inc: {
                                        [`cart.${i}.quantity`]: Number(-deleteItem.quantity),
                                        [`cart.${i}.total`]: -totalSumProduct
                                    }
                                });
                            await Product.updateOne(
                                {itemId: deleteItem.product_id},
                                {
                                    $inc: {
                                        quantity: deleteItem.quantity
                                    }
                                });
                            deleted = true;
                            if (deleted) return res.status(200).json({message: "The item is deleted successfully"})
                            res.status(404)
                        } catch (err) {
                            return res.status(400).json({Error: err.toString()})
                        }
                    } else {
                        return res.status(400)
                    }
                } else {
                    return res.status(400)
                }
            }
        } else {
            if (req.session.cart) {
                const item = req.session.cart.find(({itemId}) => itemId === deleteItem.product_id);
                const index = req.session.cart.indexOf(item)
                if (item.quantity < deleteItem.quantity) {
                    return res.status(400).json({Error: "Cant delete d"})
                } else if (item.quantity === deleteItem.quantity) {
                    req.session.cart.splice(index, 1);
                    return res.status(200).json({Message: "Item deleted successfully"})

                } else {
                    req.session.cart[index].quantity -= deleteItem.quantity;
                    req.session.cart[index].total -= totalSumProduct;
                    return res.status(200).json({Message: "Item deleted successfully"})
                }
            } else {
                return res.status(400).json({Error: "No cart found!"})
            }
        }
    }
    res.status(404)

})


module.exports = router;