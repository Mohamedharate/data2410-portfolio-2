"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../Modules/user");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

const updateUsersInfo = require('./Auth/updateUsersInfo');
const deleteUser = require('./Auth/deleteUser');
const getUser = require('./Auth/getUser');

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.use('/update', updateUsersInfo);
router.use('/delete', deleteUser);
router.use('/get', getUser);


router.get('/isAuthenticated/', async (req, res) => {

    if(req.session.userId){
        const user = await User.findOne({_id: req.session.userId})
        return res.status(200).json(user);
    } else {
        res.status(404).send("No session available.");
    }
})


router.post('/signIn', async (req, res) => {

    const user = await User.findOne({email: req.body.email,});
    if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            req.session.userId = user._id
            console.log(req.session)
            return res.status(200).json({message: "Signed in successfully"})
        } else {
            res.status(400).send("Incorrect password or email")
        }
    } else {
        res.status(400).send("Incorrect password or email")
    }
})


module.exports = router;