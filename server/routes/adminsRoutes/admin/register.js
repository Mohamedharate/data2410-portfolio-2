"use strict";
const express = require("express");
let router = express.Router();

const Admin = require("../../../Models/admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const send = require('../../../sendMail/sendEmailGen');
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

                        const email = req.body.email.toLowerCase();
                        const {
                            firstName,
                            lastName,
                            position,
                            country,
                            city,
                            zipCode,
                            street,
                            phoneNumber
                        } = req.body;

                        const admin = await Admin.findOne({email: email});
                        if (admin) {
                            return res.status(400).json({Error: "User already exists"});
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
                            const link = `https://localhost:3001/api/admin/register/emailActivation/${token}`
                            await send(email, formatActivationEmail(firstName, link), "Activation");
                            res.status(200)
                                .json(
                                    {Message: `A verification link has been sent to ${email}, please confirm!`})
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

router.get('/emailActivation/:link',
    async (req, res) => {

    const token = req.params.link;
    if (token) {
        jwt.verify(token, JWT_ACC, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({Error: "Incorrect or expired"})
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


            function getRandomInt() {
                return Math.floor(1000 + Math.random() * 8999);
            }

            let employeeId = getRandomInt();
            const checkId = await Admin.findOne({employeeId: employeeId});
            while (checkId) {
                employeeId = getRandomInt();
            }
            if (!checkId) {
                let newUser = new Admin({
                    employeeId,
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
                        res.status(200).redirect('/')
                    })
                    .catch(error => {
                        res.status(500).json({Error: error.toString()})
                    })
            }
        })
    } else {
        return res.json({Error: "Something went wrong!"})
    }
})

module.exports = router;