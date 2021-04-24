"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../database/productDB");

router
    //Add a new product
    .post('/addProduct', (req, res) => {

        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            category: req.body.category
        });

        product.save()
            .then(data => {
                res.send(`Product added successfully!`)
            })
            .catch(error => {
                res.json(error)
            })

    });
router
    .get('/:productID', (req, res) => {


    })

    //update a product with the given productID.
    .put('/:productID', (req, res) => {


    })

    //delete a product with the given productID.
    .delete('/:productID', (req, res) => {


    });

//Get all products from the productDB
router
    .get('/allProducts', (req, res) => {


    })
    //Delete all products
    .delete('/allProducts', (req, res) => {

    })

module.exports = router;