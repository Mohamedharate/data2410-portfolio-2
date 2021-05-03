"use strict";
const express = require("express");
let router = express.Router();
const Orders = require("../../../Modules/order");
const User = require("../../../Modules/user");
const send = require('../../../sendMail/sendMail');

const StringBuilder = require("string-builder");



router.get('/', async (req, res) => {

    try {
        const orders = await Orders.find();
        res.status(200).json({Orders:orders});

    } catch (err) {
        res.status(400).json(err.toString())
    }

});

module.exports = router;