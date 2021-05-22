"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../../../Models/product");


router.delete('/all', async (req, res) => {
    if (req.session) {
        if (req.session.passport.user.type !== 'Admin') {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
        try {
            await Product.deleteMany();
            return res.json({message: "Deleted all products"});
        } catch (err) {
            return res.json({Error: err.toString()})
        }
    } else {
        return res.status(500).json({Error: "Something went wrong!"})
    }

});


router.delete('/one/:itemId', async (req, res) => {

    if (req.session) {
        if (req.session.passport.user.type !== 'Admin') {
            return res.status(403).json({Error: "You don't have permission for this"})
        }
        try {
            await Product.deleteOne({itemId: req.params.itemId});
        } catch (err) {
            res.status(404).json({Error: 'The product with the given item ID was not found'})
        }
        return res.status(200).json({Message: "The product is deleted!"});

    } else {
        res.status(500).json({Error: "Something went wrong!"})
    }

});


module.exports = router;