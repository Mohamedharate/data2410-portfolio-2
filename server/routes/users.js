"use strict";
const express = require("express");
let router = express.Router();
const User = require("../database/userDB");
const StringBuilder = require("string-builder");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
/*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("webshop");
    dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.send(formatUsers(result));
        db.close();
    });
});



 */

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
        email:req.body.email,
        password:req.body.password
    }

    try {
        const checkIf = await User.findOne({email: logIn.email});
        res.status(200).json(checkIf);
    }
    catch (err){
        res.status(404).json({message:"not found"})
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
        } catch (err) {
            res.status(404).json({message: 'The user with the given id was not found'})

        }
    });
router
    .get('/:userID', async (req, res) => {
        try {
            const user = await User.findOne(req.params.user);
            res.json(user);


        } catch (err) {
            res.status(404).json({message: 'The user with the given id was not found'})

        }

    })
    .put('/:userID', (req, res) => {

    })
    .delete('/:userID', (req, res) => {

    })


module.exports = router;