"use strict";
const express = require("express");
let router = express.Router();
const upload = require('../../../multer/multer')
const Product = require("../../../Modules/product");
const StringBuilder = require("string-builder");
const fs = require("fs");



//update a product with the given productID.
router.put('/:itemId', upload.array('imageUrl', 20),
    async (req, res) => {
        const itemId = req.params.itemId;
        let imageArrAfterConverting = [];

        if (req.files) {
            const files = req.files;
            for (let i = 0; i < files.length; i++) {
                const finalImage = {
                    filename: files[i].originalname,
                    contentType: files[i].mimetype,
                    path: files[i].path,
                    image: Buffer.from(fs.readFileSync(files[i].path).toString('base64'), 'base64')
                };
                imageArrAfterConverting.push(finalImage)
            }
        }

        const findProduct = await Product.findOne({itemId: itemId});

        const updateProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.files,
            category: req.body.category,
            quantity: req.body.quantity
        }

        let out = new StringBuilder();

        findProduct.imageUrl.forEach(image => {
            for (let i = 0; i < imageArrAfterConverting.length; i++) {
                if (image.filename === imageArrAfterConverting[i].filename) {
                    imageArrAfterConverting.splice(i, 1);
                    out.append(`The picture with name ${image.filename} is already uploaded!`)
                }
            }
        })


        try {
            await Product.updateOne({itemId: itemId}, {$push: {imageUrl: imageArrAfterConverting}});
        }
        catch (err){
            out.append("Failed to upload the pictures!\n")
        }
        try{
            if (updateProduct.name !== findProduct.name) await Product.updateOne({itemId: itemId}, {name: updateProduct.name})
        }
        catch (err){
            out.append("Failed to update name!\n")
        }
        try {
            if (updateProduct.description !== findProduct.description) await Product.updateOne({itemId: itemId}, {description: updateProduct.description})
        }
        catch (err){
            out.append("Failed to update the description!\n")
        }
        try {
            if (updateProduct.price !== findProduct.price) await Product.updateOne({itemId: itemId}, {price: updateProduct.price})
        }
        catch (err){
            out.append("Failed to update the price!\n")
        }
        try {
            if (updateProduct.category !== findProduct.category) await Product.updateOne({itemId: itemId}, {category: updateProduct.category})
        }
        catch (err){
            out.append("Failed to upload the category!\n")
        }
        try {
            if (updateProduct.quantity !== findProduct.quantity) await Product.updateOne({itemId: itemId}, {quantity: updateProduct.quantity})
        }
        catch (err) {
            out.append("Failed to upload the quantity!\n")
        }
        if (out.toString()){
            res.status(400).send(out.toString())
        }
        else {
            res.status(200).send("The product is uploaded successfully!")
        }
    })


module.exports = router;