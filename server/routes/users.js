"use strict";
const express = require("express");
let router = express.Router();
const User = require("../database/userDB");


router
    .route('/signup')
        .post((req,res) => {

        const userSignUp = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            zipCode:req.body.zipCode,
            street:req.body.street,
            phoneNumber:req.body.phoneNumber
        })


            userSignUp.save()
            .then(data => {
                res.send(`User created successfully!`)
            })
            .catch(error => {
                res.json(error)
            })
    });
router
    .route('/:userID')
    .get((req, res) =>{

    })
    .put((req, res) => {

    })
    .delete((req, res) => {

    });
router
    .route('/allUsers')
    .get((req, res) => {

    })
    .delete((req, res) => {

    });


module.exports = router;