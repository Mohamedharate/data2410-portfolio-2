"use strict";
const express = require("express");
let router = express.Router();
const Order = require("../database/orderDB");

router
    .route('/newOrder/:user_id')
    //Add a new product
    .post((req,res) => {

        const order = new Order({
            products:req.body.products
        })
        order.save()
            .then(date => {
                res.json(date)
            })
            .catch(error =>{
                res.json(error);
            })
    });

module.exports = router;