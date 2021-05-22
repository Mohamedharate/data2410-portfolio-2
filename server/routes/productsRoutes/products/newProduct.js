"use strict";
const express = require("express");
let router = express.Router();
const upload = require('../../../multer/multer')

const Product = require("../../../Models/product");
const defaultImage = require("./defaultImage")

const fs = require("fs");

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
            if (imageArrAfterConverting.length < 1) {
                imageArrAfterConverting = defaultImage();
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

            product.save()
                .then(data => {
                    return res.status(200)
                        .json({Message: `Product with name ${product.name} added successfully!`})
                })
                .catch(error => {
                    if (error.name === 'MongoError' && error.code === 11000) {
                        return Promise.reject({Error: `Duplicate ${files[index].originalname}. File Already exists! `});

                    } else {
                        console.log(error.message)
                        return res.status(406).json({Error: error.message})
                    }
                })
        } else {
            return res.status(500).json({Error: "Something went wrong!"})
        }

    });

module.exports = router;