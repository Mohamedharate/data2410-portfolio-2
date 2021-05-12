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
            const findUser = await User.findOne({email: email});
            if (!findUser) return res.status(404).json({Error: 'The user with the given email address was not found'})

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
                let updated = false;

                if (findUser) {
                    if (updateUserInfo.firstName && updateUserInfo.firstName !== findUser.firstName) {
                        try {
                            updated = true;
                            await User.updateOne({email: req.params.email}, {firstName: updateUserInfo.firstName})
                        } catch (err) {
                            out.append('Something went wrong during updating the first name\n' + err.toString());
                        }
                    }
                    if (updateUserInfo.lastName && updateUserInfo.lastName !== findUser.lastName) {
                        try {
                            updated = true;

                            await User.updateOne({email: email}, {lastName: updateUserInfo.lastName})
                        } catch (err) {
                            out.append('Something went wrong during updating the last name\n' + err.toString());
                        }
                    }
                    if (updateUserInfo.password && updateUserInfo.password !== findUser.password) {
                        try {
                            updated = true;

                            await User.updateOne({email: email}, {password: updateUserInfo.password})
                        } catch (err) {
                            out.append('Something went wrong during updating the password\n' + err.toString())
                        }
                    }
                    if (updateUserInfo.country && updateUserInfo.country !== findUser.country) {
                        try {
                            updated = true;

                            await User.updateOne({email: email}, {country: updateUserInfo.country})
                        } catch (err) {
                            out.append('Something went wrong during updating the country\n' + err.toString())
                        }
                    }
                    if (updateUserInfo.city && updateUserInfo.city !== findUser.city) {
                        try {
                            updated = true;

                            await User.updateOne({email: email}, {$set: {city: updateUserInfo.city}})
                        } catch (err) {
                            out.append('Something went wrong during updating the city\n' + err.toString())
                        }
                    }
                    if (updateUserInfo.zipCode && updateUserInfo.zipCode !== findUser.zipCode) {
                        try {
                            updated = true;

                            await User.updateOne({email: email}, {zipCode: updateUserInfo.zipCode})
                        } catch {
                            out.append('Something went wrong during updating the zip code\n' + err.toString())
                        }
                    }
                    if (updateUserInfo.street && updateUserInfo.street !== findUser.street) {
                        try {
                            updated = true;

                            await User.updateOne({email: email}, {street: updateUserInfo.street})
                        } catch (err) {
                            out.append('Something went wrong during updating the street name\n' + err.toString())
                        }
                    }
                    if (updateUserInfo.phoneNumber && updateUserInfo.phoneNumber !== findUser.phoneNumber) {
                        try {
                            updated = true;

                            await User.updateOne({email: email}, {phoneNumber: updateUserInfo.phoneNumber})
                        } catch (err) {
                            out.append('Something went wrong during updating the phone number\n' + err.toString())
                        }
                    }
                    if (updateUserInfo.email && updateUserInfo.email !== findUser.email) {
                        try {
                            updated = true;

                            await User.updateOne({email: email}, {email: updateUserInfo.email})
                        } catch (err) {
                            out.append('Something went wrong during updating the email\nError code: ' + err.toString())
                        }
                    }
                } else {
                    out.append('Something went wrong during finding user`s information')
                }
                console.log(out.toString())
                if (out.toString()) {
                    res.status(500).json({Error: out.toString()})
                } else if (updated) {
                    res.json({Message: "User information is updated."})
                } else {
                    res.json({Message: "Nothing to update"})
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