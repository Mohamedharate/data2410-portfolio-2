"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../../../Models/product");


router.post('/:itemId', async (req, res) => {
    const itemId = req.params.itemId;

    const review = {
        user: req.body.user,
        reviewText: req.body.reviewText,
        rating: req.body.rating,
        Date: new Date().toLocaleDateString(),
        Time: new Date().toLocaleTimeString(),
    }
    try {
        if (review.user && review.reviewText && review.rating) {
            const product0 = await Product.findOne({itemId: itemId})
            if (!product0) res.status(404).json({Error: "Product not found"})
            const product = await Product.updateOne({itemId: itemId}, {$push: {reviews: review}});
            if (product.nModified === 1)
                return res.status(200).json({Message: `New review is added to product with ID ${itemId} `});
            else {
                return res.status(500).json({Error: 'Something went wrong'})
            }
        } else {
            return res.status(400).json({Error: "Please fill in the required"})
        }
    } catch (err) {
        return res.status(500).json({Error: 'DB error!'})
    }
});


module.exports = router;