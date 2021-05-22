"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const StringBuilder = require("string-builder");
const bcrypt = require('bcrypt')
require('../../../multer/multer');


router.put('/:email', async (req, res) => {

    const email = req.params.email.toLowerCase();
    if (req.session) {
        if (req.session.passport) {
            const findUser = await User.findOne({email: email});
            if (!findUser) return res.status(404)
                .json({Error: 'The user with the given email address was not found'})

            if (findUser._id.toString() === req.session.passport.user.id
                || req.session.passport.user.type === 'Admin') {

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
                const {firstName, lastName, inEmail, country, city, zipCode, street, phoneNumber} = req.body;

                let out = new StringBuilder();
                let updated = false;

                if (findUser) {
                    if (firstName && firstName !== findUser.firstName) {
                        try {
                            updated = true;
                            await User.updateOne({email: req.params.email}, {firstName: firstName})
                        } catch (err) {
                            out.append('Something went wrong during updating the first name\n');
                        }
                    }
                    if (lastName && lastName !== findUser.lastName) {
                        try {
                            updated = true;
                            await User.updateOne({email: email}, {lastName: lastName})
                        } catch (err) {
                            out.append('Something went wrong during updating the last name\n');
                        }
                    }
                    if (password && password !== findUser.password) {
                        try {
                            updated = true;
                            await User.updateOne({email: email}, {password: password})
                        } catch (err) {
                            out.append('Something went wrong during updating the password\n')
                        }
                    }
                    if (country && country !== findUser.country) {
                        try {
                            updated = true;
                            await User.updateOne({email: email}, {country: country})
                        } catch (err) {
                            out.append('Something went wrong during updating the country\n')
                        }
                    }
                    if (city && city !== findUser.city) {
                        try {
                            updated = true;
                            await User.updateOne({email: email}, {$set: {city: city}})
                        } catch (err) {
                            out.append('Something went wrong during updating the city\n')
                        }
                    }
                    if (zipCode && zipCode !== findUser.zipCode) {
                        try {
                            updated = true;
                            await User.updateOne({email: email}, {zipCode: zipCode})
                        } catch {
                            out.append('Something went wrong during updating the zip code\n')
                        }
                    }
                    if (street && street !== findUser.street) {
                        try {
                            updated = true;
                            await User.updateOne({email: email}, {street: street})
                        } catch (err) {
                            out.append('Something went wrong during updating the street name\n')
                        }
                    }
                    if (phoneNumber && phoneNumber !== findUser.phoneNumber) {
                        try {
                            updated = true;
                            await User.updateOne({email: email}, {phoneNumber: phoneNumber})
                        } catch (err) {
                            out.append('Something went wrong during updating the phone number\n')
                        }
                    }
                    if (inEmail && inEmail !== findUser.email) {
                        try {
                            updated = true;
                            await User.updateOne({email: email}, {email: inEmail})
                        } catch (err) {
                            out.append('Something went wrong during updating the email\n')
                        }
                    }
                } else {
                    out.append('Something went wrong during finding user`s information')
                }
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
});

module.exports = router;