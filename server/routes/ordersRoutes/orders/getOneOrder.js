"use strict";
const express = require("express");
let router = express.Router();
const Orders = require("../../../Modules/order");

router.get('/:orderId', async (req, res) => {

    const order = await Orders.findOne({_id: req.params.orderId});
    if (order){
        res.json({Order:order})
    }
    else {
        return res.json({message:"The order dosen't exists."})
    }
});

module.exports = router;