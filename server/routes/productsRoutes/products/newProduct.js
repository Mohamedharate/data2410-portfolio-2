"use strict";
const express = require("express");
let router = express.Router();
const upload = require('../../../multer/multer')

const Product = require("../../../Modules/product");

const StringBuilder = require("string-builder");
const fs = require("fs");



//Add a new product
router.post('/', upload.array('imageUrl', 20),
    (req, res) => {

        if (!req.files) return res.status(400).json('please upload at least one picture')

        const files = req.files;

        let imageArrAfterConverting = [];
        for (let i = 0; i < files.length; i++) {
            const finalImage = {
                filename: files[i].originalname,
                contentType: files[i].mimetype,
                path: files[i].path,
                image: Buffer.from(fs.readFileSync(files[i].path).toString('base64'), 'base64')
            };
            imageArrAfterConverting.push(finalImage)
        }

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: imageArrAfterConverting,
            category: req.body.category,
            quantity: req.body.quantity
        });

        product.save()
            .then(data => {
                console.log(imageArrAfterConverting[0].image)
                res.contentType(imageArrAfterConverting[0].contentType);
                res.send(imageArrAfterConverting[0].image)
                //res.status(200).json({message: `Product with name ${product.name} added successfully!`})
            })
            .catch(error => {
                if (error.name === 'MongoError' && error.code === 11000) {
                    return Promise.reject({error: `Duplicate ${files[index].originalname}. File Already exists! `});
                } else {
                    res.status(500).json({message: `The product is not saved to the the database. Please try again.`})
                }
            })
    });






module.exports = router;