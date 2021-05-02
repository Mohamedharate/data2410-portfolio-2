"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");
const Product = require("../../../Modules/product");


router.delete('/:email', async (req, res, next) => {

    const email = req.params.email;

    const user = await User.findOne({email: email});

    if (user.cart.length > 0){

        await User.updateOne(
            {email: email},
            {$set: {[`cart`]: []}});
        res.status(200).json({message:"Cart is deleted!"})
    }
    else {
        res.status(400).json({message:`The user dont have any items in the cart!`})
    }
})


module.exports = router;