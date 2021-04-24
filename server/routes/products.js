"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../database/productDB");

router
    .route('/addProduct')
        //Add a new product
        .post((req,res) => {

        const product = new Product({
            name: req.body.name,
            description:req.body.description,
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
    .route('/:productID')

        //Get a product with the given productID.
        .get((req,res) => {


        })

        //update a product with the given productID.
        .put((req,res)=>{


        })

        //delete a product with the given productID.
        .delete((req,res)=>{


        });

router
    .route('/allProducts')
        //Get all products from the productDB
        .get((req,res)=>{


        })
        //Delete all products
        .delete((req,res)=>{

        })



module.exports = router;