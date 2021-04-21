const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express;

app.set('port', process.env.PORT || 2828);

app.use(express.json());

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));

