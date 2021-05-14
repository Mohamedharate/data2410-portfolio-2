"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../Models/user");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

const resetPassword = require('./NotAuth/resetPassword');
const updateUsersInfo = require('./Auth/updateUsersInfo');
const deleteUser = require('./Auth/deleteUser');
const getUser = require('./Auth/getUser');
const subscribe = require('./Auth/subscribe');
const unsubscribe = require('./Auth/unsubscribe');

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.use('/resetPassword/', resetPassword);
router.use('/update', updateUsersInfo);
router.use('/delete', deleteUser);
router.use('/get', getUser);
router.use('/subscribe', subscribe);
router.use('/unsubscribe', unsubscribe);

router.get('/isAuthenticated/', async (req, res) => {
    if (req.user) {
        const user = await User.findOne({_id: req.session.passport.user.id})
        return res.status(200).json(user);
    } else {
        res.status(204).send("No session available.");
    }
})

module.exports = router;