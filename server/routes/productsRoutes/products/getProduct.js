"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../../../Models/product");
const StringBuilder = require("string-builder");

function reviewRating(item) {

    let reviewRating = 0;
    let count = 0;
    let stars = ""
    if (item.reviews.length === 0) {
        reviewRating = 5;
        stars = "★ ★ ★ ★ ★"
    } else {
        item.reviews.forEach(review => {
            reviewRating = reviewRating + review.rating;
            count++;
        })
        reviewRating = parseFloat(reviewRating / count);

        if (reviewRating > 4.5) {
            stars = "★ ★ ★ ★ ★"
        } else if (reviewRating > 3.5) {
            stars = "★ ★ ★ ★ ☆"
        } else if (reviewRating > 2.5) {
            stars = "★ ★ ★ ☆ ☆"
        } else if (reviewRating > 1.5) {
            stars = "★ ★ ☆ ☆ ☆"
        } else if (reviewRating > 0.5) {
            stars = "★ ☆ ☆ ☆ ☆"
        } else {
            stars = "☆ ☆ ☆ ☆ ☆"
        }
    }

    return stars;
}

function formatProdcuts(arr) {

    if (arr) {
        let out = new StringBuilder();

        for (let i = 0; i < arr.length; i++) {

            let stars = reviewRating(arr[i]);


            out.append(`
        <div class="col-lg-3 col-md-4 mb-3">
            <div class="card h-100">
           
                <a href="http://localhost:3001/products/${arr[i].itemId}">
                   <img class="card-img-top" src="data:${arr[i].imageUrl[0].contentType};base64, ${arr[i].imageUrl[0].image}" "alt="" />
                </a>
                <div class="card-body">
                    <h4 class="card-title">
                        <a href="/products/${arr[i].itemId}">${arr[i].name}</a>
                    </h4>
                    <h5>$${parseFloat(arr[i].price)}</h5>
                     <p class="card-text">${arr[i].descriptionShort}
                     <a href="http://localhost:3001/products/${arr[i].itemId}">Read more</a>
                     </p>
                </div>
                <div class="card-footer">
                     <small class="text-muted" style="text-align: left">${stars}</small>
                </div>
            </div>
        </div>`)
        }
        return out.toString();
    } else return "No product"
}


//Get all products from the productDB formatted
router.get('/allProducts', async (req, res) => {
    let products;
    try {
        products = await Product.find();
    } catch (err) {
        res.json({Error: err.toString()})
    }
    if (products) {
        return res.send(formatProdcuts(products).toString());
    } else {
        return res.json({Error: "No products found"})
    }

});

router.get('/categories/:category', async (req, res) => {

    const category = req.params.category.toLowerCase(); //TODO finne en løsning på store- og småbokstaver.
    let products;
    try {
        products = await Product.find({category: req.params.category});
    } catch (err) {
        res.json({Error: err.toString()})
    }
    if (products) {
        return res.status(200).send(formatProdcuts(products));
    } else {
        return res.json({Error: `No products found in category ${req.params.category}`})
    }
})

router.get('/allProductsPure', async (req, res) => {

    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        res.json(err.toString())
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