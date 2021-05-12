"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const StringBuilder = require("string-builder");
const bcrypt = require('bcrypt')
const upload = require('../../../multer/multer')


router.put('/:email', async (req, res) => {

    const email = req.params.email.toLowerCase();
    if (req.session) {
        if (req.session.passport) {
            const findUser = await User.findOne({email:email});
            if (!findUser) return res.status(404).json({Error: 'The user with the given email address was not found'})

            console.log("ID from passport " + req.session.passport.user.id)
            console.log("ID from user: " + findUser._id)
            console.log(req.session.passport.user.id === findUser._id)

            if (findUser._id.toString() === req.session.passport.user.id || req.session.passport.user.type === 'Admin') {

                let password;
                if (req.body.password) {
                    //Hashing password:
                    //generating salt to hash password
                    const salt = await bcrypt.genSalt(10);
                    //creating hashed password
                    password = await bcrypt.hash(req.body.password, salt)
                } else {
                    password = findUser.password;
                }


                const updateUserInfo = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: password,
                    country: req.body.country,
                    city: req.body.city,
                    zipCode: req.body.zipCode,
                    street: req.body.street,
                    phoneNumber: req.body.phoneNumber
                }


                let out = new StringBuilder();

                if (findUser) {
                    if (updateUserInfo.firstName && updateUserInfo.firstName !== findUser.firstName) {
                        try {
                            await User.updateOne({email: req.params.email}, {firstName: updateUserInfo.firstName})
                        } catch {
                            out.append('Something went wrong during updating the first name\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.lastName && updateUserInfo.lastName !== findUser.lastName) {
                        try {
                            await User.updateOne({email: email}, {lastName: updateUserInfo.lastName})
                        } catch {
                            out.append('Something went wrong during updating the last name\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.password && updateUserInfo.password !== findUser.password) {
                        try {
                            await User.updateOne({email: email}, {password: updateUserInfo.password})
                        } catch {
                            out.append('Something went wrong during updating the password\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.country && updateUserInfo.country !== findUser.country) {
                        try {
                            await User.updateOne({email: email}, {country: updateUserInfo.country})
                        } catch {
                            out.append('Something went wrong during updating the country\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.city && updateUserInfo.city !== findUser.city) {
                        try {
                            await User.updateOne({email:email}, {$set:{ city: updateUserInfo.city}})
                        } catch {
                            out.append('Something went wrong during updating the city\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.zipCode && updateUserInfo.zipCode !== findUser.zipCode) {
                        try {
                            await User.updateOne({email: email}, {zipCode: updateUserInfo.zipCode})
                        } catch {
                            out.append('Something went wrong during updating the zip code\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.street && updateUserInfo.street !== findUser.street) {
                        try {
                            await User.updateOne({email: email}, {street: updateUserInfo.street})
                        } catch {
                            out.append('Something went wrong during updating the street name\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.phoneNumber && updateUserInfo.phoneNumber !== findUser.phoneNumber) {
                        try {
                            await User.updateOne({email: email}, {phoneNumber: updateUserInfo.phoneNumber})
                        } catch {
                            out.append('Something went wrong during updating the phone number\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.email && updateUserInfo.email !== findUser.email) {
                        try {
                            await User.updateOne({email: email}, {email: updateUserInfo.email})
                        } catch (err) {
                            out.append('Something went wrong during updating the email\nError code: ' + err.error_code)
                        }
                    }
                } else {
                    out.append('Something went wrong during finding user`s information')
                }
                if (out.toString()) {
                    res.status(500).json({Error:out.toString()})
                } else {
                    res.json({Message: "User information is updated."})
                }

            } else {
                console.log("ERROR1")
                return res.status(403).json({Error: "You don't have permission for this 1"})
            }
        } else {
            console.log("ERROR2")

            return res.status(403).json({Error: "You don't have permission for this 2"})
        }
    } else {
        return res.status(500).json({Error: "Something went wrong!"})
    }

})

module.exports = router;