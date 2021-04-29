"use strict";
const express = require("express");
let router = express.Router();
const Order = require("../Modules/order");

router
    //Add a new product
    .post('/newOrder/:user_id', (req, res) => {

        const order = new Order({
            products: req.body.products
        })

        order.products.forEach(product => {

        })
        order.save()
            .then(date => {
                res.json(date)
            })
            .catch(error => {
                res.json(error);
            })
    });

module.exports = router;