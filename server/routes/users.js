"use strict";
const express = require("express");
let router = express.Router();
const User = require("../database/userDB");
const StringBuilder = require("string-builder");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())


//Get all
function formatUsers(arr) {

    let out = new StringBuilder();

    arr.forEach(user => {
        out.append(`
        \n--------------------------------------
        \nName: ${user.firstName} ${user.lastName}
        \nAddress:${user.zipCode} ${user.street}
        \nPhone number: ${user.phoneNumber}
        \nEmail: ${user.email}`);

    })
    return out.toString();
}

router
    .post('/signup', async (req, res) => {

        const userSignUp = new User({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode,
            street: req.body.street,
            phoneNumber: req.body.phoneNumber
        })


        await userSignUp.save()
            .then(data => {
                res.send(`User created successfully!`)
            })
            .catch(error => {
                res.json(error)
            })
    })
router.post('/signIn', async (req, res) => {

    const logIn = {
        email: req.body.email,
        password: req.body.password
    }

    const checkIfExists = await User.findOne({
        email: logIn.email,
        password: logIn.password
    });
    if (checkIfExists != null) {
        res.status(200).json({message: "signed in"})
    } else
        res.status(401).send("Incorrect password or email")
})

let confirmation;
router.post('/forgot', async (req, res, next) => {

    const forgotPassword = {
        email: req.body.email
    }

    const checkIfExists = await User.findOne({
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
                res.status(200).json({message: `Mail sendt to ${mailOptions.to}!`});
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


router
    .get('/all', async (req, res) => {

        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.json({message: err})
        }
    })
    .delete('/all', async (req, res) => {
        try {
            await User.deleteMany();
            res.status(200).json({message: "Deleted all users"})
        } catch (err) {
            res.status(400).json({message: 'Failed!'})
        }
    });
router
    .get('/:email', async (req, res) => {
        try {
            const user = await User.findOne({email: req.params.email});
            res.json(user);
        } catch (err) {
            res.status(404).json({message: 'The user with the given email address was not found'})
        }
    })
    .put('/:email', (req, res) => {

    })
    .delete('/:email', async (req, res) => {
        try {
            const user = await User.deleteOne({email: req.params.email});
            res.json({message: "Deleted"});
        } catch (err) {
            res.status(404).json({message: 'The user with the given email address was not found'})
        }
    })


module.exports = router;