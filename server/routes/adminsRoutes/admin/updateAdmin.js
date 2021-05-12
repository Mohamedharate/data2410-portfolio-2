"use strict";
const express = require("express");
let router = express.Router();
const Admin = require("../../../Models/admin");
const StringBuilder = require("string-builder");
const bcrypt = require('bcrypt')
const upload = require('../../../multer/multer')


router.put('/:employeeId',  async (req, res) => {

    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type !== 'Admin') {
                return res.status(403).json({Error: "You don't have permission for this"})
            }
            const findAdmin = await Admin.findOne({employeeId: req.params.employeeId});
            if (!findAdmin) return res.status(404).json({Error: 'The user with the given email address was not found'})
            if (findAdmin._id.toString() === req.session.passport.user.id || findAdmin.position === 'President') {

                let password;
                if (req.body.password) {
                    //Hashing password:
                    //generating salt to hash password
                    const salt = await bcrypt.genSalt(10);
                    //creating hashed password
                    password = await bcrypt.hash(req.body.password, salt)
                } else {
                    password = findAdmin.password;
                }

                const updateAdminInfo = {
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

                if (findAdmin) {
                    if (updateAdminInfo.firstName && updateAdminInfo.firstName !== findAdmin.firstName) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {firstName: updateAdminInfo.firstName})
                        } catch {
                            out.append('Something went wrong during updating the first name\nError code: ' + err.error_code)
                        }
                    }
                    if (updateAdminInfo.lastName && updateAdminInfo.lastName !== findAdmin.lastName) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {lastName: updateAdminInfo.lastName})
                        } catch {
                            out.append('Something went wrong during updating the last name\nError code: ' + err.error_code)
                        }
                    }
                    if (updateAdminInfo.password && updateAdminInfo.password !== findAdmin.password) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {password: updateAdminInfo.password})
                        } catch {
                            out.append('Something went wrong during updating the password\nError code: ' + err.error_code)
                        }
                    }
                    if (updateAdminInfo.country && updateAdminInfo.country !== findAdmin.country) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {country: updateAdminInfo.country})
                        } catch {
                            out.append('Something went wrong during updating the country\nError code: ' + err.error_code)
                        }
                    }
                    if (updateAdminInfo.city && updateAdminInfo.city !== findAdmin.city) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {city: updateAdminInfo.city})
                        } catch {
                            out.append('Something went wrong during updating the city\nError code: ' + err.error_code)
                        }
                    }
                    if (updateAdminInfo.zipCode && updateAdminInfo.zipCode !== findAdmin.zipCode) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {zipCode: updateAdminInfo.zipCode})
                        } catch {
                            out.append('Something went wrong during updating the zip code\nError code: ' + err.error_code)
                        }
                    }
                    if (updateAdminInfo.street && updateAdminInfo.street !== findAdmin.street) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {street: updateAdminInfo.street})
                        } catch {
                            out.append('Something went wrong during updating the street name\nError code: ' + err.error_code)
                        }
                    }
                    if (updateAdminInfo.phoneNumber && updateAdminInfo.phoneNumber !== findAdmin.phoneNumber) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {phoneNumber: updateAdminInfo.phoneNumber})
                        } catch {
                            out.append('Something went wrong during updating the phone number\nError code: ' + err.error_code)
                        }
                    }
                    if (updateAdminInfo.email && updateAdminInfo.email !== findAdmin.email) {
                        try {
                            await Admin.updateOne({email: req.params.email}, {email: updateAdminInfo.email})
                        } catch (err) {
                            out.append('Something went wrong during updating the email\nError code: ' + err.error_code)
                        }
                    }
                } else {
                    out.append('Something went wrong during finding admin`s information')
                }
                if (out.toString()) {
                    res.send(out.toString())
                } else {
                    res.json({Message: "Admin information is updated."})
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