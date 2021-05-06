"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const StringBuilder = require("string-builder");


//Get all
function formatUsers(arr) {

    let out = new StringBuilder();

    arr.forEach(user => {
        out.append(`
        \n--------------------------------------
        \nName: ${user.firstName} ${user.lastName}
        \nAddress:${user.zipCode} ${user.street}
        \nPhone number: ${user.phoneNumber}
        \nEmail: ${user.email}`);

    })
    return out.toString();
}

router.get('/all', async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err})
    }
})


router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email});
        res.json(user);
    } catch (err) {
        res.status(404).json({message: 'The user with the given email address was not found'})
    }
})

module.exports = router;