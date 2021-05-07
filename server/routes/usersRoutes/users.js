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

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.use('/resetPassword/', resetPassword);
router.use('/update', updateUsersInfo);
router.use('/delete', deleteUser);
router.use('/get', getUser);


router.get('/isAuthenticated/', async (req, res) => {
    if(req.isAuthenticated()){
        const user = await User.findOne({_id: req.session.passport.user})
        return res.status(200).json(user);
    } else {
        res.status(404).send("No session available.");
    }
})

module.exports = router;