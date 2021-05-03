"use strict";
const express = require("express");
let router = express.Router();
const User = require("../../../Modules/user");
const Product = require("../../../Modules/product");


router.delete('/:email', async (req, res, next) => {

    const email = req.params.email;
    const deleteItem = {
        product_id: req.body.product_id,
        quantity: req.body.quantity
    }

    const user = await User.findOne({email: email});
    const product = await Product.findOne({itemId: deleteItem.product_id});

    let deleted = false;

    let msgOut;

    for (let i = 0; i < user.cart.length; i++) {
        if (deleteItem.product_id === user.cart[i].itemId) {
            if (user.cart[i].quantity >= deleteItem.quantity && user.cart[i].quantity === 0 && user.cart[i].quantity !== null){

                let totalSumProduct = parseFloat(product.price*deleteItem.quantity)
                try{
                    await User.updateOne(
                        {email: email},
                        {$inc: {
                                [`cart.${i}.quantity`]: Number(-deleteItem.quantity),
                                [`cart.${i}.total`]: -totalSumProduct
                        }});
                    await Product.updateOne(
                        {itemId: deleteItem.product_id},
                        {$inc: {
                                quantity: deleteItem.quantity}
                        });
                    deleted = true;
                }
                catch (err){
                    return res.json({Error:err.toString()})
                }
            }
        }
    }


    if (deleted) res.json({Error:"Deleted"})
    else res.json({Error:" not Deleted"})
})


module.exports = router;