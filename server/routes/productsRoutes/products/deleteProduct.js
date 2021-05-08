"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../../../Models/product");


//Delete all products
router.delete('/all', async (req, res) => {
    if (req.session){
        if (req.session.passport.user.type !== 'Admin') {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
        try {
            const products = await Product.deleteMany();
            res.json({message: "Deleted all products"});
        } catch (err) {
            res.json({Error: err.toString()})
        }
    }
    else {
        res.status(500).json({Error: "Something went wrong!"})
    }

});


//delete a product with the given productID.
router.delete('/one/:itemId/', async (req, res) => {

    if(req.session){
        if (req.session.passport.user.type !== 'Admin') {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
        try {
            const product = await Product.deleteOne({itemId: req.params.itemId});
            res.json({Message: "The product is deleted!"});
        } catch (err) {
            res.status(404).json({Error: 'The product with the given item ID was not found'})
        }
    }
    else{
        res.status(500).json({Error: "Something went wrong!"})
    }

});


module.exports = router;