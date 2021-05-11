"use strict";
const express = require("express");
let router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../../../Models/user");
const bcrypt = require('bcrypt')
const send = require('../../../sendMail/sendActivationLink');
const formatActivationEmail = require('../../../sendMail/formatActivationLink')
const JWT_ACC = "accountactivateOsloMetShop";

router.post('/', async (req, res) => {


    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)

    const email = req.body.email.toLowerCase();
    const {firstName, lastName, country, city, zipCode, street, phoneNumber} = req.body;

    const user = await User.findOne({email: req.body.email.toLowerCase()});
    if (user) {
        return res.status(400).json({Error: "User already exists"});
    } else {
        const token = jwt.sign({
            firstName,
            lastName,
            email,
            password,
            country,
            city,
            zipCode,
            street,
            phoneNumber
        }, JWT_ACC, {expiresIn: "20m"})

        const link = `http://localhost:3001/api/register/emailActivation/${token}`
        try {
            send(email, formatActivationEmail(firstName, link), "Activation")
        } catch (e) {
            return res.status(400).json({Error: e.toString()})
        }

        return res.status(200).json({Message: "A verification link has been sent to your email account, please confirm!"})
    }
})

router.get('/emailActivation/:link', async (req, res) => {

    const token = req.params.link;
    if (token) {
        jwt.verify(token, JWT_ACC, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({error: "Incorrect or expired"})
            }

            const {firstName, lastName, email, password, country, city, zipCode, street, phoneNumber} = decodedToken;

            let newUser = new User({firstName, lastName, email, password, country, city, zipCode, street, phoneNumber})
            await newUser.save()
                .then(data => {
                    res.status(200).json({Message: `User created successfully!`})
                })
                .catch(error => {
                    res.status(500).json({Error: error.toString()})
                })

        })
    } else {
        return res.json({Error: "Something went wrong!"})
    }
})


module.exports = router;