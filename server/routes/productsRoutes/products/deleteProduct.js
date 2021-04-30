"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../../../Modules/product");

//delete a product with the given productID.
router.delete('/:itemId', async (req, res) => {
    try {
        const product = await Product.deleteOne({itemId: req.params.itemId});
        res.json({message: "The product is deleted!"});
    } catch (err) {
        res.status(404).json({message: 'The product with the given item ID was not found'})
    }
});



//Delete all products
router.delete('/allProducts', async (req, res) => {
    try {
        const products = await Product.deleteMany();
        res.json({message: "Deleted all products"});
    } catch (err) {
        res.json({message: "Failed"})
    }
});


module.exports = router;