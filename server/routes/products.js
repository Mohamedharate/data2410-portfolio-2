"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../database/productDB");
const StringBuilder = require("string-builder");

/*
function formatProdcuts(arr) {

    let out = new StringBuilder();

    for (let i = 0; i < Product.length; i++) {

        out.append(`<div class="card h-100"><a href="#">
                    <img class="card-img-top" src='${arr[i].imageUrl[0]}' alt=""></a>
                    <div class="card-body"><h4 class="card-title"><a href="#">${arr[i].name}</a></h4>
                    <h5>${arr[i].price}$</h5>
                    <p class="card-text">${arr[i].description}</p></div><div class="card-footer">
                     <small class="text-muted">★ ★ ★ ★ ☆</small></div></div>`)
    }

    return out;
}
 */

//Add a new product
router.post('/addProduct', (req, res) => {

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        quantity: req.body.quantity
    });

    product.save()
        .then(data => {
            res.status(200).json({message: `Product with name ${product.name} added successfully!`})
        })
        .catch(error => {
            res.json(error)
        })

});
//Get all products from the productDB
router.get('/allProducts', async (req, res) => {

    try {
        const products = await Product.find();
        res.send(products);
    } catch (err) {
        res.send(err)

    }
});

router.get('/get/:itemId', async (req, res) => {
    try {
        const product = await Product.findOne({itemId: req.params.itemId});
        res.json(product);
    } catch (err) {
        res.status(404).json({message: 'The product with the given item ID was not found'})
    }
})

//Delete all products
router.delete('/allProducts', async (req, res) => {
    try {
        const products = await Product.deleteMany();
        res.json({message: "Deleted all products"});
    } catch (err) {
        res.json({message: "Failed"})
    }
});



//update a product with the given productID.
router.put('/update/:itemId', async (req, res) => {

    const updateProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        quantity: req.body.quantity
    }
    try {
        const findProduct = await Product.findOne({itemId: req.params.itemId});

        if (updateProduct.name !== findProduct.name) await Product.updateOne({itemId: req.params.itemId}, {name: updateProduct.name})
        if (updateProduct.description !== findProduct.description) await Product.updateOne({itemId: req.params.itemId}, {description: updateProduct.description})
        if (updateProduct.price !== findProduct.price) await Product.updateOne({itemId: req.params.itemId}, {price: updateProduct.price})
        if (updateProduct.imageUrl.toString() !== findProduct.imageUrl.toString()) await Product.updateOne({itemId: req.params.itemId}, {imageUrl: updateProduct.imageUrl})//bug
        if (updateProduct.category !== findProduct.category) await Product.updateOne({itemId: req.params.itemId}, {category: updateProduct.category})
        if (updateProduct.quantity.toString() !== findProduct.quantity.toString()) await Product.updateOne({itemId: req.params.itemId}, {quantity: updateProduct.quantity})

        res.json({message: "The product is updated!"});
    } catch (err) {
        res.status(404).json(err)
    }
})
/*
router.put('/updateprice', async (req, res) => {

    const newPrice = {
        price: req.body.price
    }
    const priceParsed = parseFloat(newPrice.price);
    console.log(priceParsed * 3)
    try {

        const findProducts = await Product.find();


        const products = await Product.aggregate();

        res.json({message: "updated price on all products"});
    } catch (err) {
        res.status(400).json({message: err})
    }
})

 */

//delete a product with the given productID.
router.delete('/delete/:itemId', async (req, res) => {
    try {
        const product = await Product.deleteOne({itemId: req.params.itemId});
        res.json({message: "The product is deleted!"});
    } catch (err) {
        res.status(404).json({message: 'The product with the given item ID was not found'})
    }
});


module.exports = router;