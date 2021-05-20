"use strict";
const express = require("express");
let router = express.Router();
const Admin = require("../../../Models/admin");
const StringBuilder = require("string-builder");
const bcrypt = require('bcrypt')
const upload = require('../../../multer/multer')


router.put('/:employeeId', async (req, res) => {

    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type !== 'Admin') {
                return res.status(403).json({Error: "You don't have permission for this"})
            }
            const findAdmin = await Admin.findOne({employeeId: req.params.employeeId});
            if (!findAdmin) return res.status(404).json({Error: 'The Admin with the given email address was not found'})
            if (findAdmin._id.toString() === req.session.passport.user.id || findAdmin.position === 'President') {

                const employeeId = req.params.employeeId;
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
                const {firstName, lastName, inEmail, country, city, zipCode, street, phoneNumber, position} = req.body;

                let out = new StringBuilder();
                let updated = false;

                if (findAdmin) {
                    if (firstName && firstName !== findAdmin.firstName) {
                        try {
                            updated = true;
                            await Admin.updateOne({employeeId: employeeId}, {firstName: firstName})
                        } catch (err) {
                            out.append('Something went wrong during updating the first name\n');
                        }
                    }
                    if (lastName && lastName !== findAdmin.lastName) {
                        try {
                            updated = true;
                            await Admin.updateOne({employeeId: employeeId}, {lastName: lastName})
                        } catch (err) {
                            out.append('Something went wrong during updating the last name\n');
                        }
                    }
                    if (password && password !== findAdmin.password) {
                        try {
                            updated = true;
                            await Admin.updateOne({employeeId: employeeId}, {password: password})
                        } catch (err) {
                            out.append('Something went wrong during updating the password\n')
                        }
                    }
                    /*
                    if (country && country !== findAdmin.country) {
                        try {
                            updated = true;
                            await Admin.updateOne({email: email}, {country: country})
                        } catch (err) {
                            out.append('Something went wrong during updating the country\n')
                        }
                    }
                    if (city && city !== findAdmin.city) {
                        try {
                            updated = true;
                            await Admin.updateOne({email: email}, {$set: {city: city}})
                        } catch (err) {
                            out.append('Something went wrong during updating the city\n')
                        }
                    }
                    if (zipCode && zipCode !== findAdmin.zipCode) {
                        try {
                            updated = true;
                            await Admin.updateOne({email: email}, {zipCode: zipCode})
                        } catch {
                            out.append('Something went wrong during updating the zip code\n')
                        }
                    }
                    if (street && street !== findAdmin.street) {
                        try {
                            updated = true;
                            await Admin.updateOne({email: email}, {street: street})
                        } catch (err) {
                            out.append('Something went wrong during updating the street name\n')
                        }
                    }

                     */
                    if (phoneNumber && phoneNumber !== findAdmin.phoneNumber) {
                        try {
                            updated = true;
                            await Admin.updateOne({employeeId: employeeId}, {phoneNumber: phoneNumber})
                        } catch (err) {
                            out.append('Something went wrong during updating the phone number\n')
                        }
                    }
                    if (inEmail && inEmail !== findAdmin.email) {
                        try {
                            updated = true;
                            await Admin.updateOne({employeeId: employeeId}, {email: inEmail})
                        } catch (err) {
                            out.append('Something went wrong during updating the email\n')
                        }
                    }
                    if (position && position !== findAdmin.position) {
                        try {
                            updated = true;
                            await Admin.updateOne({employeeId: employeeId}, {position: position})
                        } catch (err) {
                            out.append('Something went wrong during updating the position\n')
                        }
                    }


                } else {
                    out.append('Admin not found')
                }
                if (out.toString()) {
                    res.status(500).json({Error: out.toString()})
                } else if (updated) {
                    res.json({Message: "Admin information is updated."})
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