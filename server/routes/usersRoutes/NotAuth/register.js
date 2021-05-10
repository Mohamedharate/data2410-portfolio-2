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

    const {firstName, lastName, email, country, city, zipCode, street, phoneNumber} = req.body;

    const user = await User.findOne({email: req.body.email,});
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
            const user = await User.findOne({email: email,});

            let newUser = new User({firstName, lastName, email, password, country, city, zipCode, street, phoneNumber})
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