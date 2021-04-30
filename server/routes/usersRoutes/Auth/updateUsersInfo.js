"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");
const StringBuilder = require("string-builder");
const bcrypt = require('bcrypt')
"use strict";

const bodyParser = require('body-parser');


router.put('/:email', async (req, res) => {

    //Hashing password:
    //generating salt to hash password
    const salt = await bcrypt.genSalt(10);
    //creating hashed password
    const password = await bcrypt.hash(req.body.password, salt)

    const updateUserInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        zipCode: req.body.zipCode,
        street: req.body.street,
        phoneNumber: req.body.phoneNumber
    }

    let out = new StringBuilder();

    const findUser = await User.findOne({email: req.params.email});
    if (findUser) {
        if (updateUserInfo.firstName !== findUser.firstName) {
            try {
                await User.updateOne({email: req.params.email}, {firstName: updateUserInfo.firstName})
            } catch {
                out.append('Something went wrong during updating the first name\nError code: ' + err.error_code)
            }
        }
        if (updateUserInfo.lastName !== findUser.lastName) {
            try {
                await User.updateOne({email: req.params.email}, {lastName: updateUserInfo.lastName})
            } catch {
                out.append('Something went wrong during updating the last name\nError code: ' + err.error_code)
            }
        }
        if (updateUserInfo.password !== findUser.password) {
            try {
                await User.updateOne({email: req.params.email}, {password: updateUserInfo.password})
            } catch {
                out.append('Something went wrong during updating the password\nError code: ' + err.error_code)
            }
        }
        if (updateUserInfo.country !== findUser.country) {
            try {
                await User.updateOne({email: req.params.email}, {country: updateUserInfo.country})
            } catch {
                out.append('Something went wrong during updating the country\nError code: ' + err.error_code)
            }
        }
        if (updateUserInfo.city !== findUser.city) {
            try {
                await User.updateOne({email: req.params.email}, {city: updateUserInfo.city})
            } catch {
                out.append('Something went wrong during updating the city\nError code: ' + err.error_code)
            }
        }
        if (updateUserInfo.zipCode !== findUser.zipCode) {
            try {
                await User.updateOne({email: req.params.email}, {zipCode: updateUserInfo.zipCode})
            } catch {
                out.append('Something went wrong during updating the zip code\nError code: ' + err.error_code)
            }
        }
        if (updateUserInfo.street !== findUser.street) {
            try {
                await User.updateOne({email: req.params.email}, {street: updateUserInfo.street})
            } catch {
                out.append('Something went wrong during updating the street name\nError code: ' + err.error_code)
            }
        }
        if (updateUserInfo.phoneNumber !== findUser.phoneNumber) {
            try {
                await User.updateOne({email: req.params.email}, {phoneNumber: updateUserInfo.phoneNumber})
            } catch {
                out.append('Something went wrong during updating the phone number\nError code: ' + err.error_code)
            }
        }
        if (updateUserInfo.email !== findUser.email) {
            try {
                await User.updateOne({email: req.params.email}, {email: updateUserInfo.email})
            } catch (err) {
                out.append('Something went wrong during updating the email\nError code: ' + err.error_code)
            }
        }
    } else {
        out.append('Something went wrong during finding user`s information')
    }
    if (out.toString()) {
        res.send(out.toString())
    } else {
        res.send("User information is updated.")
    }
})

module.exports = router;