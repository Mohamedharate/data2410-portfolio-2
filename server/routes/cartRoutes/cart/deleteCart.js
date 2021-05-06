"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const Product = require("../../../Models/product");


router.delete('/', async (req, res, next) => {


    if (req.session){

        if (req.session.passport){
            const user = await User.findOne({_id: req.session.passport.user});
            if (user.cart.length > 0){
                for (let item of user.cart) {

                    await Product.updateOne(
                        {itemId: item.itemId},
                        {$inc: {
                                quantity: item.quantity}
                        });
                }

                await User.updateOne(
                    {_id: req.session.passport.user},
                    {$set: {[`cart`]: []}});

                return res.status(200).json({message:"Cart is deleted!"})
            }
            else {
                return res.status(400).json({message:`The user dont have any items in the cart!`})
            }
        }
        else {
            if (req.session.cart.length > 0){
                req.session.cart = [];
                return res.status(200).json({message:"Cart is deleted!"})
            }
            else {
                 res.status(400).json({message:`The user dont have any items in the cart!`})
            }
        }
    }

})


module.exports = router;