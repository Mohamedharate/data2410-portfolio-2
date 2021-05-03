"use strict";
const express = require("express");
let router = express.Router();
const Order = require("../../Modules/order");
const User = require("../../Modules/user");
const Product = require("../../Modules/product");
const StringBuilder = require("string-builder");

const send = require('../../sendMail/sendMailReceipt');

function formatReceipt(user,products,total) {

    let out = new StringBuilder();

    out.append(`
        <table class="table" style="float: left">
            <thead class="thead-dark">
                <tr>
                  <th scope="col">Item id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>     
                <tbody>
          
            `)

    products.forEach(one=>{
        out.append(`
        <tr>
          <th scope="row">${one.itemId}</th>
          <td>${one.name}</td>
          <td>${one.quantity}</td>
          <td>${one.price}</td>
        </tr>
        `)
    })

    out.append(`
        <tr>
          <td>${total}</td>
        </tr>
        </tbody>
    </table>
        `)


    return out.toString();
}

router.post('/newOrder/:email', async (req, res) => {
    const email = req.params.email;

    const user = await User.findOne({email: req.body.email});

    if (user) {
        if (!user.cart) return res.status(404).json({Error: "No cart"})

        let tot
        user.cart.forEach(item => {
            tot += item.total;
        })
        const order = new Order({
            products: user.cart,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            country: req.body.country,
            zipCode: req.body.zipCode,
            city: req.body.city,
            street: req.body.street,
            phoneNumber: req.body.phoneNumber,
            total: tot
        })
        await User.updateOne({email: email}, {$push: {orders: order}});
        await User.updateOne(
            {email: email},
            {$set: {[`cart`]: []}});
        await order.save()
            .then(data => {
                send(user, formatReceipt(user,order.products,order.tot))
                res.send("ADDED")

            })
            .catch(error => {
                res.send(error.toString());
            })
    } else return res.status(404).json({Error: "User not found."})


});

module.exports = router;