"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");
const Product = require("../../../Modules/product");

router.put('/:email',async (req,res)=>{


})

router.post('/:email', async (req,
                              res, next) => {
    const email = req.params.email;
    const addItem = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }


    const user = await User.findOne({email: email});
    const product = await Product.findOne({itemId: addItem.product_id});
    if(addItem.quantity <= product.quantity){
        if (!product) return res.status(400).json({Error:"Product not found"})

        let added = false;

        for (let i = 0; i < user.cart.length; i++) {
            if (addItem.product_id === user.cart[i].itemId) {
                let totalSumProduct = user.cart[i].total + parseFloat(product.price*addItem.quantity)
                await User.updateOne(
                    {email: email},
                    {$inc: {
                            [`cart.${i}.quantity`]: addItem.quantity},
                        [`cart.${i}.total`]: parseFloat(totalSumProduct)
                    });
                await Product.updateOne(
                    {itemId: addItem.product_id},
                    {$inc: {
                            quantity: -addItem.quantity}
                    });
                added = true;
            }
        }

        if (!added) {
            const newItem = {
                name: product.name,
                price: parseFloat(product.price),
                itemId: addItem.product_id,
                quantity: addItem.quantity,
                total: parseFloat(product.price*addItem.quantity)
            }
            try {
                await User.updateOne({email: email}, {$push: {cart: newItem}});
                await Product.updateOne(
                    {itemId: addItem.product_id},
                    {$inc: {
                            quantity: -addItem.quantity}
                    });
            } catch (err) {
                return res.status(500).json({Error:"Failed to add the item to cart."})
            }
        }
    }
    else {
        return res.status(400).json({Error:"Not enough items"})
    }

    res.status(200).json({Message:"The item has been added to cart successfully"})
})


module.exports = router;