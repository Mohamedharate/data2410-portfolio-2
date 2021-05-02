"use strict";
const express = require("express");
let router = express.Router();

const StringBuilder = require("string-builder");


const addToCart = require("./cart/addToCart")
const deleteFromCart = require("./cart/deleteFromCart")
const deleteCart = require("./cart/deleteCart")


router.use("/addToCart",addToCart)
router.use("/deleteCart",deleteCart)
router.use("/deleteFromCart",deleteFromCart)


module.exports = router;