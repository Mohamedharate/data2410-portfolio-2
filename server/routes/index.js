"use strict";
const express = require("express");
let router = express.Router();


// ------- import routes ---------- //

const register = require('./usersRoutes/NotAuth/register');
const resetPassword = require('./usersRoutes/NotAuth/resetPassword');
const products = require('./productsRoutes/products');
const orders = require('./ordersRoutes/orders');
const admin = require('./adminsRoutes/admins');
const users = require('./usersRoutes/users');
const cart = require('./cartRoutes/cart');

const loginUser = require("./usersRoutes/Auth/loginUser");
const signInAdmin = require("./adminsRoutes/admin/signin");
// --------- Middlewares ------------- //
router.use('/signin', loginUser);
router.use('/signin-admin', signInAdmin);
router.use('/register', register);
router.use('/users', users);
router.use('/products', products);
router.use('/orders', orders);
router.use('/admin', admin);
router.use('/cart', cart);

// ------- - - - - - - - -  ---------- //

module.exports = router;

