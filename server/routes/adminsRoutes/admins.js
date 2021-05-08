"use strict";
const express = require("express");
let router = express.Router();

const Admin = require("../../Models/admin");
const Order = require("../../Models/order");
const StringBuilder = require("string-builder");

const fs = require("fs");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

//const updateAdminInfo = require('./admin/updateAdminInfo');
const register = require('./admin/register');
const signIn = require('./admin/signIn');

router.use('/register',register);
//router.use('/signIn', signIn);
//router.use('/get', getUser);

module.exports = router;