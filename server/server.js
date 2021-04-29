const express = require('express');
const app = express();

const path = require('path');

const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require("cors");


// ------- routes ---------- //
const products = require('./routes/products');
const orders = require('./routes/orders');
const admin = require('./routes/admins');
const users = require('./routes/users');
// - - - - - - - - - - - - - //


const mongoose = require("mongoose");


TWO_HOURS = 1000 * 60 * 60 * 2

const{
    PORT = 3001,
    NODE_ENV = 'development',

    SESS_NAME = 'sid',
    SESS_SECRET = 'shhh!this,a7\'secret',
    SESS_LIFETIME = TWO_HOURS,
} = process.env

const IN_PROD = NODE_ENV === 'production'

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(
    session({
        name: SESS_NAME,
        resave: false,
        saveUninitialized: false,
        secret: SESS_SECRET,
        cookie: {
            maxAge: parseInt(SESS_LIFETIME),
            sameSite: false,
            secure: IN_PROD,
        }
    })
)

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

const dotenv = require('dotenv');
dotenv.config()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// ------- connect to mongodb ---------- //
try {
    mongoose.connect("mongodb+srv://haratemo:12345oslomet@webshop.uemit.mongodb.net/webshop?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, () =>
        console.log("connected to webshopDB"));
} catch (error) {
    console.log("could not connect to webshopDB");
}
// ------- - - - - - - - -  ---------- //

// --------- use routes ------------- //
app.use('/api/users/', users);
app.use('/api/products/', products);
app.use('/api/orders/', orders);
app.use('/api/admin/', admin);
// ------- - - - - - - - -  ---------- //


// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({message: "Hello from server!"});
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

