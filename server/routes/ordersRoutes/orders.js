"use strict";
const express = require("express");
let router = express.Router();

const newOrder = require('./orders/newOrder');
const getAllOrders = require('./orders/getAllOrders');
const getOneOrder = require('./orders/getOneOrder');
const getUserOrders = require('./orders/getUserOrders');

router.use('/newOrder', newOrder);
router.use('/getOneOrder/', getOneOrder);
router.use('/getAllOrders/', getAllOrders);
router.use('/getUserOrders/', getUserOrders);


module.exports = router;