"use strict";
const express = require("express");
let router = express.Router();
const passport = require('passport');

router.post('/', (req, res, next) => {
    passport.authenticate('local.signinAdmin',
        (err, user, info) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (!user) {
                return res.status(400).json(info)
            }
            req.logIn(user, function (err) {
                if (err) {
                    res.redirect('http://localhost:3001');
                }
                return res.status(200).json(user);
            });
        })(req, res, next);
});


module.exports = router;