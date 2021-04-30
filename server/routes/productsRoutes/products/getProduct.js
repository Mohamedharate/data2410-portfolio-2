"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../../../Modules/product");

const StringBuilder = require("string-builder");
const fs = require("fs");


function formatProdcuts(arr) {
    if (arr) {
        let out = new StringBuilder();

        for (let i = 0; i < arr.length; i++) {


            out.append(`
            <div class="card h-100">
                <a href="#">
                   <img class="card-img-top" src=data:${arr[i].imageUrl[0].contentType};base64,${arr[i].imageUrl[0].image} alt="">
                </a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="#">${arr[i].name}</a>
                        </h4>
                        <h5>${arr[i].price}$</h5>
                        <p class="card-text">${arr[i].description}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">★ ★ ★ ★ ☆</small>
                     </div>
            </div>`)
        }
        return out;
    } else return "No product"
}


//Get all products from the productDB
router.get('/allProducts', async (req, res) => {

    try {
        const products = await Product.find();
        res.send(formatProdcuts(products).toString());
    } catch (err) {
        res.send(err + " ")
    }
});

router.get('/:itemId', async (req, res) => {
    try {
        const product = await Product.findOne({itemId: req.params.itemId});
        res.json(product);
    } catch (err) {
        res.status(404).json({message: 'The product with the given item ID was not found'})
    }
})

module.exports = router;