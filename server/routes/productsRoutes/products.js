"use strict";
const express = require("express");
let router = express.Router();

const updateProduct = require('./products/updateProduct');
const getProduct = require('./products/getProduct');
const deleteProduct = require('./products/deleteProduct');
const newProduct = require('./products/newProduct');
const addReview = require('./products/addReview');

router.use('/update', updateProduct);
router.use('/get', getProduct);
router.use('/delete', deleteProduct);
router.use('/new', newProduct);
router.use('/addReview', addReview);



module.exports = router;