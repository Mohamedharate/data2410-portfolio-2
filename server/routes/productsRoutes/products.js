"use strict";
const express = require("express");
let router = express.Router();

const Product = require("../../Modules/product");
const StringBuilder = require("string-builder");
const upload = require('../../multer/multer')
const fs = require("fs");


const updateProduct = require('./products/updateProduct');
const getProduct = require('./products/getProduct');
const deleteProduct = require('./products/deleteProduct');
const newProduct = require('./products/newProduct');
const addReview = require('./products/addReview');

router.use('/update',updateProduct);
router.use('/get',getProduct);
router.use('/delete',deleteProduct);
router.use('/new',newProduct);
router.use('/addReview',addReview);





/*
router.put('/updateprice', async (req, res) => {
    const newPrice = {
        price: req.body.price
    }
    const priceParsed = parseFloat(newPrice.price);
    console.log(priceParsed * 3)
    try {
        const findProducts = await Product.find();
        const products = await Product.aggregate();
        res.json({message: "updated price on all products"});
    } catch (err) {
        res.status(400).json({message: err})
    }
})
 */



// add review.
router.put('/addReview/:itemId', async (req, res) => {
    const itemId = req.params.itemId;

    const review = {
        'user': req.body.user,
        'reviweText': req.body.reviweText,
        Date: new Date().toLocaleDateString(),
        Time: new Date().toLocaleTimeString()
    }
    try {
        const product = await Product.updateOne({itemId: itemId}, {$push: {reviews: review}});
        if (product.nModified === 1) res.status(200).json({message: `New review is added to product with ID ${itemId} `});
        else {
            res.status(400).json({message: 'The product with the given item ID was not found'})
        }
    } catch (err) {
        res.status(500).json({message: 'DB error!'})
    }
});

module.exports = router;