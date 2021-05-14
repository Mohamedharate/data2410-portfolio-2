"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");


//Get all products from the productDB
router.get('/:email', async (req, res) => {
    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type === 'User') {
                const user = await User.findOne({_id: req.session.passport.user.id});
                if (user) {
                    if (user.orders.length > 0) {
                        res.json({orders: user.orders})
                    } else {
                        return res.json({message: "No orders yet!"})
                    }
                } else {
                    return res.json({message: "The user dosen't exists."})
                }
            }
        }

    }

});

module.exports = router;