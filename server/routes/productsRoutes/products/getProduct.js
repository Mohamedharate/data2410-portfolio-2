"use strict";
const express = require("express");
let router = express.Router();
const Product = require("../../../Modules/product");
const User = require("../../../Modules/user");
const send = require('../../../sendMail/sendMail');

const StringBuilder = require("string-builder");

function random_item(items) {
    return items[Math.floor(Math.random()*items.length)];
}

async function sendMSG(){
    const products = await Product.find();
    const prod = random_item(products);
    if (prod){
        const newMSG = `<div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
           
                   <img class="card-img-top" src="data:${prod.imageUrl[0].contentType};base64, ${prod.imageUrl[0].image}" alt="" />
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="http://localhost:3000/products/${prod.itemId}">${prod.name}</a>
                        </h4>
                        <h5>$${parseFloat(prod.price)}</h5>
                        <p class="card-text">${prod.descriptionShort}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">★ ★ ★ ★ ☆</small>
                     </div>
            </div>
        </div>`

        const users = await User.find();
        //send(users,newMSG,prod.name)
    }
    //setTimeout(sendMSG, 86400000);
    }
sendMSG()



function formatProdcuts(arr) {
    if (arr) {
        let out = new StringBuilder();

        for (let i = 0; i < arr.length; i++) {

            out.append(`


        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
           
                <a href="http://localhost:3000/products/${arr[i].itemId}">
                   <img class="card-img-top" src="data:${arr[i].imageUrl[0].contentType};base64, ${arr[i].imageUrl[0].image}" alt="" />
                   </a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="http://localhost:3000/products/${arr[i].itemId}">${arr[i].name}</a>
                        </h4>
                        <h5>$${parseFloat(arr[i].price)}</h5>
                        <p class="card-text">${arr[i].descriptionShort}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">★ ★ ★ ★ ☆</small>
                     </div>
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