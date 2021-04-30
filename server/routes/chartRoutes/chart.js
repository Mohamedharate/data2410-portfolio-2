"use strict";
const express = require("express");
let router = express.Router();

const StringBuilder = require("string-builder");


const addToChart = require("./chart/addToChart")
const deleteFromChart = require("./chart/deleteFromChart")
const deleteChart = require("./chart/deleteChart")


router.use("/addToChart",addToChart)
router.use("/deleteChart",deleteChart)
router.use("/deleteFromChart",deleteFromChart)


module.exports = router;