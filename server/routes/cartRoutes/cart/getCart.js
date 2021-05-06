"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");

router.get('/', async (req, res) => {
    if (req.session) {
        if (req.session.passport) {
            const user = await User.findOne({_id: req.session.passport.user});
            if (user) {
                if (user.cart.length > 0) {
                    return res.json({products: user.cart})
                } else {
                    return res.json({message: "The cart is still empty"})
                }
            } else return res.json({message: "The user dosen't exists."})
        } else {
            if (req.session.cart) {
                if (req.session.cart.length > 0) {
                    return res.json({products: req.session.cart})
                } else {
                    return res.json({message: "The cart is still empty"})
                }
            } else {
                return res.json({message: "The cart is still empty"})
            }

        }
    }

    res.status(400).json({Error: "Something went wrong!"})
});

module.exports = router;