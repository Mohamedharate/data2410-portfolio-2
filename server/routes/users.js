"use strict";
const express = require("express");
let router = express.Router();
const User = require("../database/userDB");
const StringBuilder = require("string-builder");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')


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

router.post('/signup', async (req, res) => {


    //Hashing password:
    //generating salt to hash password
    const salt = await bcrypt.genSalt(10);
    //creating hashed password
    const hash_password = await bcrypt.hash(req.body.password, salt)



    const userSignUp = new User({

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

    await userSignUp.save()
        .then(data => {
            res.status(200).json({message: `User created successfully!`})
        })
        .catch(error => {
            res.status(500).send("DB error: Input neglected by database!")
        })
})

router.get('/sessUser/', (req, res) => {


    res.send("HEI")
})
router.post('/signIn', async (req, res) => {

    console.log(req.body.password)


    const user = await User.findOne({email: req.body.email,});
    if(user){
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(validPassword){
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


router.get('/all', async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({message: err})
    }
})
router.delete('/all', async (req, res) => {
    try {
        await User.deleteMany();
        res.status(200).json({message: "Deleted all users successfully"})
    } catch (err) {
        res.status(500).json({message: 'Failed to delete all users!'})
    }
});
router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email});
        res.json(user);
    } catch (err) {
        res.status(404).json({message: 'The user with the given email address was not found'})
    }
})
router.put('/:email', async (req, res) => {

    const updateUserInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode,
        street: req.body.street,
        phoneNumber: req.body.phoneNumber
    }
    try {
        const findUser = await User.findOne({email: req.params.email});

        if (updateUserInfo.firstName !== findUser.firstName)
            await User.updateOne({email: req.params.email}, {firstName: updateUserInfo.firstName})
        if (updateUserInfo.lastName !== findUser.lastName)
            await User.updateOne({email: req.params.email}, {lastName: updateUserInfo.lastName})
        if (updateUserInfo.password !== findUser.password)
            await User.updateOne({email: req.params.email}, {password: updateUserInfo.password})
        if (updateUserInfo.zipCode !== findUser.zipCode)
            await User.updateOne({email: req.params.email}, {zipCode: updateUserInfo.zipCode})
        if (updateUserInfo.street !== findUser.street)
            await User.updateOne({email: req.params.email}, {street: updateUserInfo.street})
        if (updateUserInfo.phoneNumber !== findUser.phoneNumber)
            await User.updateOne({email: req.params.email}, {phoneNumber: updateUserInfo.phoneNumber})
        if (updateUserInfo.email !== findUser.email)
            await User.updateOne({email: req.params.email}, {email: updateUserInfo.email})

        res.json(updateUserInfo);
    } catch (err) {
        res.status(404).json(err)
    }
})

router.delete('/:email', async (req, res) => {
    try {
        await User.deleteOne({email: req.params.email});
        res.json({message: `${req.params.email} has been deleted successfully`});
    } catch (err) {
        res.status(404).json({message: 'The user with the given email address was not found'})
    }
})


module.exports = router;