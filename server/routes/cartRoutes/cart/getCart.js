"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");

router.get('/', async (req, res) => {
    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type === 'User') {
                const user = await User.findOne({_id: req.session.passport.user.id});
                if (user) {
                    if (user.cart.length > 0) {
                        return res.json({products: user.cart})
                    } else {
                        return res.json({message: "The cart is still empty"})
                    }
                } else return res.json({message: "The user dosen't exists."})
            } else {
                return res.status(403).json({Error: "You have to sign in as user to order."})
            }
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
    } else {
        res.status(500).json({message: `Something has gone wrong!`})
    }
});

module.exports = router;