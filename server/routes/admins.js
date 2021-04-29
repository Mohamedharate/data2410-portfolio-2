"use strict";
const express = require("express");
let router = express.Router();

const Admin = require("../Modules/admin");
const Order = require("../Modules/order");
const StringBuilder = require("string-builder");

const fs = require("fs");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {


    //Hashing password:
    //generating salt to hash password
    const salt = await bcrypt.genSalt(10);
    //creating hashed password
    const hash_password = await bcrypt.hash(req.body.password, salt)

    const adminSignUp = new Admin({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash_password,
        country: req.body.country,
        city: req.body.city,
        zipCode: req.body.zipCode,
        street: req.body.street,
        phoneNumber: req.body.phoneNumber
    })

    await adminSignUp.save()
        .then(data => {
            res.status(200).json({message: `Admin created successfully!`})
        })
        .catch(error => {
            res.status(500).send("DB error: Input neglected by database!")
        })
})

router.post('/signIn', async (req, res) => {

    const user = await Admin.findOne({email: req.body.email,});
    if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
            req.session.userId = user._id
            console.log(req.session)
            return res.status(200).json({message: "Signed in successfully"})
        } else {
            res.status(400).send("Incorrect password or email")
        }
    }
})

let confirmation;
router.post('/forgot', async (req, res) => {

    const forgotPassword = {
        email: req.body.email
    }

    const checkIfExists = await Admin.findOne({
        email: forgotPassword.email
    });

    if (checkIfExists) {
        confirmation = Math.floor(1000 + Math.random() * 3000);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shopmetnorway@gmail.com',
                pass: '12345oslomet'
            }
        });

        const mailOptions = {
            from: 'ShopMet',
            to: `${forgotPassword.email}`,
            subject: 'Reset your password',
            text: `Your confirmation code is ${confirmation}`
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

router.post("/resetPassword/recvCode", (req, res, next) => {
    const code = {
        code: req.body.code
    }
    if (code.code === confirmation.toString()) {

        res.json({message: "confirmed"})
    } else {
        res.json({message: "Incorrect code"});
    }
})

router.get('/allAdmins', async (req, res) => {

    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (err) {
        res.status(500).json({message: err})
    }
})

router.delete('/allAdmins', async (req, res) => {
    try {
        await Admin.deleteMany();
        res.status(200).json({message: "Deleted all admins successfully"})
    } catch (err) {
        res.status(500).json({message: 'Failed to delete all admins!'})
    }
});

router.get('/:email', async (req, res) => {
    try {
        const admin = await Admin.findOne({email: req.params.email});
        res.json(admin);
    } catch (err) {
        res.status(404).json({message: 'The admin with the given email address was not found'})
    }
})

router.put('/:email', async (req, res) => {

    const updateAdminInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        country: req.body.country,
        city: req.body.city,
        password: req.body.password,
        zipCode: req.body.zipCode,
        street: req.body.street,
        phoneNumber: req.body.phoneNumber
    }

    let out = new StringBuilder();

    const findAdmin = await Admin.findOne({email: req.params.email});

    if (findAdmin) {
        if (updateAdminInfo.firstName !== findAdmin.firstName) {
            try {
                await Admin.updateOne({email: req.params.email}, {firstName: updateAdminInfo.firstName})
            } catch {
                out.append('Something went wrong during updating the first name\nError code: ' + err.error_code)
            }
        }
        if (updateAdminInfo.lastName !== findAdmin.lastName) {
            try {
                await Admin.updateOne({email: req.params.email}, {lastName: updateAdminInfo.lastName})
            } catch {
                out.append('Something went wrong during updating the last name\nError code: ' + err.error_code)
            }
        }
        if (updateAdminInfo.password !== findAdmin.password) {
            try {
                await Admin.updateOne({email: req.params.email}, {password: updateAdminInfo.password})
            } catch {
                out.append('Something went wrong during updating the password\nError code: ' + err.error_code)
            }
        }
        if (updateAdminInfo.country !== findAdmin.country) {
            try {
                await Admin.updateOne({email: req.params.email}, {country: updateAdminInfo.country})
            } catch {
                out.append('Something went wrong during updating the country\nError code: ' + err.error_code)
            }
        }
        if (updateAdminInfo.city !== findAdmin.city) {
            try {
                await Admin.updateOne({email: req.params.email}, {city: updateAdminInfo.city})
            } catch {
                out.append('Something went wrong during updating the city\nError code: ' + err.error_code)
            }
        }
        if (updateAdminInfo.zipCode !== findAdmin.zipCode) {
            try {
                await Admin.updateOne({email: req.params.email}, {zipCode: updateAdminInfo.zipCode})
            } catch {
                out.append('Something went wrong during updating the zip code\nError code: ' + err.error_code)
            }
        }
        if (updateAdminInfo.street !== findAdmin.street) {
            try {
                await Admin.updateOne({email: req.params.email}, {street: updateAdminInfo.street})
            } catch {
                out.append('Something went wrong during updating the street name\nError code: ' + err.error_code)
            }
        }
        if (updateAdminInfo.phoneNumber !== findAdmin.phoneNumber) {
            try {
                await Admin.updateOne({email: req.params.email}, {phoneNumber: updateAdminInfo.phoneNumber})
            } catch {
                out.append('Something went wrong during updating the phone number\nError code: ' + err.error_code)
            }
        }
        if (updateAdminInfo.email !== findAdmin.email) {
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
        res.send("Admin information is updated.")
    }
})

router.delete('/:email', async (req, res) => {
    try {
        await Admin.deleteOne({email: req.params.email});
        res.json({message: `${req.params.email} has been deleted successfully`});
    } catch (err) {
        res.status(404).json({message: 'The admin with the given email address was not found'})
    }
})


module.exports = router;