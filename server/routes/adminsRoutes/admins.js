"use strict";
const express = require("express");
let router = express.Router();


const register = require('./admin/register');
const update = require('./admin/updateAdmin');
const deleteOne = require('./admin/deleteOneAdmin');
const getAll = require('./admin/getAllAdmins');

router.use('/register', register);
router.use('/get', getAll);
router.use('/update', update);
router.use('/delete/one', deleteOne);

module.exports = router;