"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");



//Get all products from the productDB
router.get('/:email', async (req, res) => {

    const user = await User.findOne({email: req.params.email});
    if (user){

        if (user.orders.length > 0){
            res.json({orders:user.orders})

        }
        else {
            return res.json({message:"No orders yet!"})
        }
    }
    else {
        return res.json({message:"The user dosen't exists."})
    }

});

module.exports = router;