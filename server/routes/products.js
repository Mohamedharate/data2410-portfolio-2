"use strict";
const express = require("express");
let router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./server/public/uploads');
    },
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
})
/*
const fileFilter = (req,file,cb) => {
    //Reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,false);
    }
    else {
        cb(null,true);
    }
}

 */

const upload =
    multer({
        storage:storage,
        limits: {
            fileSize : 1024 * 1024* 5,
        },

    //fileFilter:fileFilter
    });

const Product = require("../database/productDB");
const StringBuilder = require("string-builder");
const fs = require("fs");

function formatProdcuts(arr) {

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
}


//Add a new product
router.post('/addProduct', upload.array('imageUrl',20),(req, res) => {

    if (!req.files) return res.status(400).json('please upload at least one picture')

    const files = req.files;

    let imageArrAfterConverting = [];
    for (let i = 0;i<files.length;i++){
        const finalImage = {
            filename:files[i].originalname,
            contentType: files[i].mimetype,
            path: files[i].path,
            image: Buffer.from(fs.readFileSync(files[i].path).toString('base64'),'base64')
        };
        imageArrAfterConverting.push(finalImage)
    }

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: imageArrAfterConverting,
        category: req.body.category,
        quantity: req.body.quantity
    });

    product.save()
        .then(data => {
            res.status(200).json({message: `Product with name ${product.name} added successfully!`})
        })
        .catch(error => {
            res.send(500).json({message:`The product is not saved to the the database. Please try again.`})
        })


});
//Get all products from the productDB
router.get('/allProducts', async (req, res) => {

    try {
        const products = await Product.find();
        res.send(formatProdcuts(products).toString());
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
router.put('/update/:itemId', upload.array('imageUrl',20),
    async (req, res) => {
    const itemId = req.params.itemId;
    let imageArrAfterConverting = [];

    if (req.files){
        const files = req.files;

        for (let i = 0;i<files.length;i++){
            const finalImage = {
                filename:files[i].originalname,
                contentType: files[i].mimetype,
                path: files[i].path,
                image: Buffer.from(fs.readFileSync(files[i].path).toString('base64'),'base64')
            };
            imageArrAfterConverting.push(finalImage)
        }
    }
    const findProduct = await Product.findOne({itemId: itemId});

    const updateProduct = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.files,
        category: req.body.category,
        quantity: req.body.quantity
    }

    findProduct.imageUrl.forEach(image =>{
        for (let i=0;i<imageArrAfterConverting.length;i++){
            console.log(image.filename)
            console.log(imageArrAfterConverting[i].filename)
            if (image.filename === imageArrAfterConverting[i].filename){
                imageArrAfterConverting.splice(i,1);
                res.status(400).json({message:`The picture with name ${image.filename} is already uploaded!`})//Må endres slik at brukeren får lastet opp de bildene som ikke er lastet opp fra før
            }
        }
    })
    await Product.updateOne({itemId: itemId}, {$push: {imageUrl: imageArrAfterConverting}});
    try {
        if (updateProduct.name !== findProduct.name) await Product.updateOne({itemId: itemId}, {name: updateProduct.name})
        if (updateProduct.description !== findProduct.description) await Product.updateOne({itemId: itemId}, {description: updateProduct.description})
        if (updateProduct.price !== findProduct.price) await Product.updateOne({itemId: itemId}, {price: updateProduct.price})
        if (updateProduct.category !== findProduct.category) await Product.updateOne({itemId: itemId}, {category: updateProduct.category})
        if (updateProduct.quantity !== findProduct.quantity) await Product.updateOne({itemId: itemId}, {quantity: updateProduct.quantity})

        res.json({message: "The product is updated!"});
    } catch (err) {
        res.status(404).send(err + " Feil i try")
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

// add review.
router.put('/addReview/:itemId', async (req, res) => {
    const itemId = req.params.itemId;

    const reviwe = {
        "user": req.body.user,
        "reviweText": req.body.reviweText,
        Date: new Date().toLocaleDateString(),
        Time: new Date().toLocaleTimeString()
    }
    try {
        const product = await Product.updateOne({itemId: itemId}, {$push: {reviews: reviwe}});
        if (product.nModified === 1) res.status(200).json({message: `New review is added to product with ID ${itemId} `});
        else {
            res.status(400).json({message: 'The product with the given item ID was not found'})
        }
    } catch (err) {
        res.status(500).json({message: 'DB error!'})
    }
});

module.exports = router;