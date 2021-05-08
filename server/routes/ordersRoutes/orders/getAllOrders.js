"use strict";
const express = require("express");
let router = express.Router();
const Orders = require("../../../Models/order");
const Admin = require("../../../Models/admin");
const send = require('../../../sendMail/sendMail');

router.get('/', async (req, res) => {

    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type === 'Admin') {
                const admin = await Admin.findOne({_id: req.session.passport.user.id})
                if (admin) {
                    try {
                        const orders = await Orders.find();
                        return res.status(200).json({Orders: orders});

                    } catch (err) {
                        return res.status(400).json(err.toString())
                    }
                } else {
                    return res.status(403).json({Error: "You don't have permission for this"})
                }
            }
            else {
                return res.status(403).json({Error: "You don't have permission for this"})
            }

        } else {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
    } else {
        res.status(500).json({Message: "Something went wrong!"})
    }
});
module.exports = router;