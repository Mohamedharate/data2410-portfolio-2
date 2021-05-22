"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");


router.get('/all', async (req, res) => {
    if (req.session) {
        if (req.session.passport.user.type !== 'Admin') {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
        try {
            const users = await User.find();
            return res.json({Message: users});
        } catch (err) {
            return res.status(500).json({Error: err})
        }
    } else {
        return res.status(500).json({Error: "Something went wrong!"})
    }
})


router.get('/:email', async (req, res) => {
    if (req.session) {
        if (req.session.passport) {
            const user = await User.findOne({email: req.params.email});
            if (!user) return res.status(404).json({Error: 'The user with the given email address was not found'})
            if (user._id === req.session.passport.user.id || req.session.passport.user.type === 'Admin') {
                try {
                    const user = await User.findOne({email: req.params.email});
                    return res.json({Message: user});
                } catch (err) {
                    return res.status(404).json({Error: 'The user with the given email address was not found'})
                }
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