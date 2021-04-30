"use strict";
const express = require("express");
let router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../../../Modules/user");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')

const JWT_ACC = "accountactivateOsloMetShop";

router.post('/signup', async (req, res) => {

    //Hashing password:
    //generating salt to hash password
    const salt = await bcrypt.genSalt(10);
    //creating hashed password
    const password = await bcrypt.hash(req.body.password, salt)

    const {firstName, lastName, email, country, city, zipCode, street, phoneNumber} = req.body;

    const user = await User.findOne({email: req.body.email,});
    if (user) {
        return res.status(400).json({error: "User already exists"});
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


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shopmetnorway@gmail.com',
                pass: '12345oslomet'
            }
        });

        const mailOptions = {
            from: 'ShopMet',
            to: `${email}`,
            subject: 'Account Activation',
            html:
                `
        <h2>Please click on the link to activate your account.</h2>
        <a href=http://localhost:3001/api/register/emailActivation/${token}>Verify your account</a>
       
        `
        };

        await transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({message: `Email has been sendt to ${mailOptions.to}, please activate your account!`});
            }
        });
    }
})

router.get('/emailActivation/:link', async (req, res) => {

    const token = req.params.link;
    if (token) {
        jwt.verify(token, JWT_ACC, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({error: "Incorrect or expired"})
            }
            const {firstName, lastName, email, password, country, zipCode, street, phoneNumber} = decodedToken;
            const user = await User.findOne({email: email,});

            let newUser = new User({firstName, lastName, email, password, country, zipCode, street, phoneNumber})
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