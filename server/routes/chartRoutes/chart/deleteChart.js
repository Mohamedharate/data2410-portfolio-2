"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");
const Product = require("../../../Modules/product");


router.delete('/:email', async (req, res, next) => {

    const email = req.params.email;

    const user = await User.findOne({email: email});

    if (user.chart.length > 0){

        await User.updateOne(
            {email: email},
            {$set: {[`chart`]: []}});
        res.status(200).json({message:"Chart is deleted!"})
    }
    else {
        res.status(400).json({message:`The user dont have any items in the chart!`})
    }
})


module.exports = router;