"use strict";
const express = require("express");
let router = express.Router();
const Admin = require("../../../Models/admin");


router.get('/all', async (req, res) => {
    if (req.session) {

        if (!req.session.passport || req.session.passport.user.type !== 'Admin' || !req.session.passport.user) {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
        let admin
        try {
            admin = await Admin.find();

        } catch (err) {
            return res.status(500).json({Error: err.toString()})
        }
        return res.json({Message: admin});
    } else {
        return res.status(500).json({Error: "Something went wrong!"})
    }
})

module.exports = router;