"use strict";
const express = require("express");
let router = express.Router();
const Admin = require("../../../Models/user");


router.get('/:email', async (req, res) => {
    if (req.session) {
        if (req.session.passport) {
            const admin = await Admin.findOne({email: req.params.email});
            if (!admin) return res.status(404).json({Error: 'The admin with the given email address was not found'})
            if (req.session.passport.user.type === 'Admin') {
                try {
                    const user = await Admin.findOne({email: req.params.email});
                } catch (err) {
                    return res.status(404).json({Error: 'The admin with the given email address was not found'})
                }
                return res.status(200).json({Message: user});

            } else {
                return res.status(403).json({Error: "You don't have permission for this"})
            }
        } else {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
    } else {
        return res.status(500).json({Error: "Something went wrong!"})
    }
})

module.exports = router;