"use strict";
const express = require("express");
let router = express.Router();
const upload = require('../../../multer/multer')

const Product = require("../../../Models/product");

const fs = require("fs");

//Add a new product
router.post('/', upload.array('imageUrl', 20),
    (req, res) => {
        if (req.session) {
            if (req.session.passport.user.type !== 'Admin') {
                return res.status(403).json({Error: "You don't have permission for this"})
            }

            if (!req.files) return res.status(400).json({Error: 'please upload at least one picture'})

            const files = req.files;

            let imageArrAfterConverting = [];
            for (let i = 0; i < files.length; i++) {
                const finalImage = {
                    filename: files[i].originalname,
                    contentType: files[i].mimetype,
                    path: files[i].path,
                    image: (fs.readFileSync(files[i].path)).toString('base64')
                };
                imageArrAfterConverting.push(finalImage)
            }

            const product = new Product({
                name: req.body.name,
                descriptionShort: req.body.descriptionShort,
                descriptionLong: req.body.descriptionLong,
                price: req.body.price,
                imageUrl: imageArrAfterConverting,
                category: req.body.category,
                quantity: req.body.quantity
            });
            if (imageArrAfterConverting.length < 1) {
                return res.status(400).json({Error: "You to upload at least one picture."})
            }
            product.save()
                .then(data => {
                    res.status(200).json({message: `Product with name ${product.name} added successfully!`})
                })
                .catch(error => {
                    if (error.name === 'MongoError' && error.code === 11000) {
                        return Promise.reject({error: `Duplicate ${files[index].originalname}. File Already exists! `});
                    } else {
                        res.status(500).json({Error: error.toString()})
                    }
                })
        } else {
            res.status(500).json({Error: "Something went wrong!"})
        }

    });

module.exports = router;