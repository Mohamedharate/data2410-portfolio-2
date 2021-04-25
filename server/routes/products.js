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
                res.status(200).json({message:`Product with name ${product.name} added successfully!`})
            })
            .catch(error => {
                res.json(error)
            })

    });
//Get all products from the productDB
router
    .get('/allProducts', async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.json({message: err})
        }
    })
    //Delete all products
    .delete('/allProducts', async (req, res) => {
        try {
            const products = await Product.deleteMany();
            res.json({message: "Deleted all products"});
        } catch (err) {
            res.json({message: err})
        }
    });

router
    .get('/:itemId', async (req, res) => {
        try {
            const product = await Product.findOne({itemId: req.params.itemId});
            res.json(product);
        } catch (err) {
            res.status(404).json({message: 'The product with the given item ID was not found'})
        }
    })

    //update a product with the given productID.
    .put('/:itemId', async (req, res) => {


    })

    //delete a product with the given productID.
    .delete('/:itemId', async (req, res) => {


    });



module.exports = router;