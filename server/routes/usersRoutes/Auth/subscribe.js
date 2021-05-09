"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");

router.put('/', async (req, res) => {
    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type === 'User') {
                const user = await User.findOne({_id: req.session.passport.user.id});
                if (!user) return res.status(404).json({Error: 'The user with the given email address was not found'})
                try {
                    await User.updateOne({_id: req.session.passport.user.id}, {$set: {subscriber: true}});
                } catch (err) {
                    return res.status(500).json({Error: 'Something went wrong'})
                }
                return res.status(200).json({Message: "Subscribed successfully"});
            } else {
                return res.status(403).json({Error: "You don't have permission for this"})
            }

        }

    } else {
        return res.status(400).json({Error: "You have to sign to subscribe"})
    }

})

module.exports = router;