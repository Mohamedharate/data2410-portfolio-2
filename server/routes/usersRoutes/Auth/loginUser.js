"use strict";
const express = require("express");
let router = express.Router();
const passport = require('passport');

router.post('/',
    (req, res, next) => {
    passport.authenticate('local.signin',
        (err, user, info) => {
            if (err) {
                return res.status(500).json(err.toString())
            }

            if (!user) {
                return res.status(400).json(info)
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(user);
            });
        })(req, res, next);
});

module.exports = router;