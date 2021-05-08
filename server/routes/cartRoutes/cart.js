"use strict";
const express = require("express");
let router = express.Router();

const addToCart = require("./cart/addToCart")
const deleteFromCart = require("./cart/deleteFromCart")
const deleteCart = require("./cart/deleteCart")
const getCart = require("./cart/getCart")

router.use("/addToCart/", addToCart)
router.use("/getCart/", getCart)
router.use("/deleteCart/", deleteCart)
router.use("/deleteFromCart", deleteFromCart)

module.exports = router;