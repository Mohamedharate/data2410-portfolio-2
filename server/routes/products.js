"use strict";
const express = require("express");
let router = express.Router();
const mongoose = require("mongoose");

let Product = require("../database/productDB"); //model til produkt



router.post('/',(req,res) => {

    const product = new Product({
        name: req.body.name,
        description:req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category
    });


    product.save()
        .then(data => {
            res.json(data)
        })
        .catch(error => {
            res.json(error)
        })
})

module.exports = router;