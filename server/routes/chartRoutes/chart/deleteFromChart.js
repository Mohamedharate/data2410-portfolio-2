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

    for (let i = 0; i < user.chart.length; i++) {
        if (deleteItem.product_id === user.chart[i].itemId) {
            if (user.chart[i].quantity >= deleteItem.quantity && user.chart[i].quantity === 0 && user.chart[i].quantity !== null){

                let totalSumProduct = parseFloat(product.price*deleteItem.quantity)
                try{
                    await User.updateOne(
                        {email: email},
                        {$inc: {
                                [`chart.${i}.quantity`]: Number(-deleteItem.quantity),
                                [`chart.${i}.total`]: -totalSumProduct
                        }});
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