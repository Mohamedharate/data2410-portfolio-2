"use strict";
const express = require("express");
let router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../../../Models/user");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')

const JWT_ACC = "accountactivateOsloMetShop";

router.post('/', async (req, res) => {

    const email = req.body.email;

    const checkIfExists = await User.findOne({
        email: email
    });

    if (checkIfExists) {

        const token = jwt.sign({
            email,
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
            subject: 'Reset your password',
            html: `
            <h2>Please click on the link to reset your password</h2>
            <a href=https://localhost:3001/api/reset/newPassword/${token} class="btn-secondary bg-light">Reset password</a>`
        };

        await transporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({message: `Mail sendt to ${mailOptions.to} successfully!`});
            }
        });
    } else {
        res.status(404).json({message: "Email not found"});
    }
})

router.post("/newPassword/:link", async (req, res, next) => {

    const token = req.params.link;
    const newPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt)

    if (token) {
        jwt.verify(token, JWT_ACC, async function (err, decodedToken) {
            if (err) {
                return res.status(400).json({error: "Incorrect or expired"})
            }
            const {email} = decodedToken;
            try {
                await User.updateOne({email: email}, {password: password})
            } catch {
                out.append('Something went wrong during updating the password\nError code: ' + err.error_code)
            }
            return res.json({message: "Your password is updated!"})
        })

    } else {
        return res.json({error: "Something went wrong!"})
    }
})

module.exports = router;