"use strict";
const express = require("express");
let router = express.Router();
const Orders = require("../../../Models/order");
const Admin = require("../../../Models/admin");


router.get('/:orderId', async (req, res) => {

    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type === 'Admin') {
                const admin = await Admin.findOne({_id: req.session.passport.user.id})
                if (admin) {
                    const order = await Orders.findOne({_id: req.params.orderId});
                    if (order) {
                        res.json({Order: order})
                    } else {
                        return res.json({message: "The order doesn't exists."})
                    }
                } else {
                    return res.status(403).json({Error: "You don't have permission for this"})
                }

            } else {
                return res.status(403).json({Error: "You don't have permission for this"})
            }
        } else {
            return res.status(403).json({Error: "You don't have permission for this"})
        }

    } else {
        res.status(400).json({Message: "Something went wrong!"})
    }

});

module.exports = router;