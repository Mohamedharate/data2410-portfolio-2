"use strict";
const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");

let User = require("../database/userDB");





router.post('/',(req,res) => {

    const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        zipCode:req.body.zipCode,
        street:req.body.street,
        phoneNumber:req.body.phoneNumber
    })

    user.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

/*
router
    .route('/users')
    .post((req , res )=> {
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            zipCode: req.body.zipCode,
            street: req.body.street,
            phoneNumber: req.body.phoneNumber
        })
            user.save().then(res => {
            console.log(res);
            })
            .catch(err => console.log(err))
    })

 */

module.exports = router;