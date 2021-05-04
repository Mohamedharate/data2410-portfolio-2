"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");


router.get('/', async (req, res) => {

    if(req.session.userId){
        const userId = req.session.userId;

        const user = await User.findOne({_id: userId});
        if (user){
            if (user.cart.length > 0){
                res.json({products:user.cart})
            }
            else {
                return res.json({message:"The cart is still empty"})
            }
        }
        else return res.status(404).json({message:"The user dosen't exists."})
    }
    else return res.json({message:"No session"})
});


router.get('/:email', async (req, res) => {

    const email = req.params.email;

    const user = await User.findOne({email: email});
    if (user){
        if (user.cart.length > 0){
            res.json({products:user.cart})
        }
        else {
            return res.json({message:"The cart is still empty"})
        }
    }
    else return res.json({message:"The user dosen't exists."})
});

module.exports = router;