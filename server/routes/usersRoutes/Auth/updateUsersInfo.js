"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Models/user");
const StringBuilder = require("string-builder");
const bcrypt = require('bcrypt')
const upload = require('../../../multer/multer')


router.put('/:email', upload.single('profileImage'), async (req, res) => {

    if (req.session) {
        if (req.session.passport) {
            const findUser = await User.findOne({email: req.params.email});
            if (!findUser) return res.status(404).json({Error: 'The user with the given email address was not found'})
            if (findUser._id === req.session.passport.user.id || req.session.passport.user.type === 'Admin') {

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
                    profileImage: req.file,
                    zipCode: req.body.zipCode,
                    street: req.body.street,
                    phoneNumber: req.body.phoneNumber
                }

                if (req.file) {
                    const file = req.file;
                    const finalImage = {
                        filename: file.originalname,
                        contentType: file.mimetype,
                        path: file.path,
                        //image: fs.readFileSync(file.path).toString('base64')
                    };
                    try {
                        await User.updateOne({email: req.params.email}, {profileImage: finalImage});
                    } catch (err) {
                        console.log(err.toString())
                    }

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
                            await User.updateOne({email: req.params.email}, {lastName: updateUserInfo.lastName})
                        } catch {
                            out.append('Something went wrong during updating the last name\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.password && updateUserInfo.password !== findUser.password) {
                        try {
                            await User.updateOne({email: req.params.email}, {password: updateUserInfo.password})
                        } catch {
                            out.append('Something went wrong during updating the password\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.country && updateUserInfo.country !== findUser.country) {
                        try {
                            await User.updateOne({email: req.params.email}, {country: updateUserInfo.country})
                        } catch {
                            out.append('Something went wrong during updating the country\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.city && updateUserInfo.city !== findUser.city) {
                        try {
                            await User.updateOne({email: req.params.email}, {city: updateUserInfo.city})
                        } catch {
                            out.append('Something went wrong during updating the city\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.zipCode && updateUserInfo.zipCode !== findUser.zipCode) {
                        try {
                            await User.updateOne({email: req.params.email}, {zipCode: updateUserInfo.zipCode})
                        } catch {
                            out.append('Something went wrong during updating the zip code\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.street && updateUserInfo.street !== findUser.street) {
                        try {
                            await User.updateOne({email: req.params.email}, {street: updateUserInfo.street})
                        } catch {
                            out.append('Something went wrong during updating the street name\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.phoneNumber && updateUserInfo.phoneNumber !== findUser.phoneNumber) {
                        try {
                            await User.updateOne({email: req.params.email}, {phoneNumber: updateUserInfo.phoneNumber})
                        } catch {
                            out.append('Something went wrong during updating the phone number\nError code: ' + err.error_code)
                        }
                    }
                    if (updateUserInfo.email && updateUserInfo.email !== findUser.email) {
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
                    res.json({Message: "User information is updated."})
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