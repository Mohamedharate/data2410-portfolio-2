"use strict";
const express = require("express");
let router = express.Router();

const Admin = require("../../../Models/admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const send = require('../../../sendMail/sendActivationLink');
const formatActivationEmail = require('../../../sendMail/formatActivationLink');

const JWT_ACC = "accountactivateOsloMetShop";

router.post('/', async (req, res) => {

    if (req.session) {
        if (req.session.passport) {
            if (req.session.passport.user.type === 'Admin') {
                const adminWithPermission = await Admin.findOne({_id: req.session.passport.user.id})
                if (adminWithPermission) {
                    if (adminWithPermission.position === 'President') {
                        const salt = await bcrypt.genSalt(10);
                        const password = await bcrypt.hash(req.body.password, salt)

                        const {
                            firstName,
                            lastName,
                            email,
                            position,
                            country,
                            city,
                            zipCode,
                            street,
                            phoneNumber
                        } = req.body;

                        const admin = await Admin.findOne({email: req.body.email,});
                        if (admin) {
                            return res.status(400).json({message: "User already exists"});
                        } else {
                            const token = jwt.sign({
                                firstName,
                                lastName,
                                email,
                                password,
                                position,
                                country,
                                city,
                                zipCode,
                                street,
                                phoneNumber
                            }, JWT_ACC, {expiresIn: "20m"})
                            const link = `http://localhost:3001/api/admin/register/emailActivation/${token}`
                            await send(email, formatActivationEmail(firstName, link), "Activation");
                            res.status(200).json({message: "A verification link has been sent to your email account, please confirm!"})
                        }
                    } else {
                        return res.status(403).json({Error: "You don't have permission for this"})
                    }
                } else {
                    return res.status(403).json({Error: "You don't have permission for this"})
                }
            } else {
                return res.status(403).json({Error: "You don't have permission for this"})
            }
        } else {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
    } else {
        res.status(500).json({Error: `Something has gone wrong!`})
    }
})

router.get('/emailActivation/:link', async (req, res) => {

    const token = req.params.link;
    if (token) {
        jwt.verify(token, JWT_ACC, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({error: "Incorrect or expired"})
            }
            const {
                firstName,
                lastName,
                email,
                password,
                position,
                country,
                city,
                zipCode,
                street,
                phoneNumber
            } = decodedToken;
            let newUser = new Admin({
                firstName,
                lastName,
                email,
                password,
                position,
                country,
                city,
                zipCode,
                street,
                phoneNumber
            })
            await newUser.save()
                .then(data => {
                    res.status(200).json({message: `User created successfully!`})
                })
                .catch(error => {
                    res.status(500).json({error: error.toString()})
                })
        })
    } else {
        return res.json({error: "Something went wrong!"})
    }
})

module.exports = router;