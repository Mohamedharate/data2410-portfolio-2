const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv').config();
const connectDB = require('./DB Connection/connectDB')

const https = require('https');
const path = require('path');
const fs = require('fs');


const app = express();



//https.createServer(httpsOptions,app)
const session = require('express-session');
const bodyParser = require('body-parser');


// ------- import routes ---------- //


const register = require('./routes/usersRoutes/NotAuth/register');
const resetPassword = require('./routes/usersRoutes/NotAuth/resetPassword');
const products = require('./routes/productsRoutes/products');
const orders = require('./routes/ordersRoutes/orders');
const admin = require('./routes/adminsRoutes/admins');
const users = require('./routes/usersRoutes/users');
const cart = require('./routes/chartRoutes/cart');

// - - - - - - - - - - - - - //



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

app.set("trust proxy", 1)

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


// --------- Middlewares ------------- //
app.use('/api/register', register);
app.use('/api/reset/', resetPassword);
app.use('/api/users/', users);
app.use('/api/products/', products);
app.use('/api/orders/', orders);
app.use('/api/admin/', admin);
app.use('/api/cart/', cart);
// ------- - - - - - - - -  ---------- //


// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({message: "Hello from server!"});
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.post('/logout', (req, res) => {
    if (req.session.userId) {
        req.session.destroy(err => {
            if (err){
                return res.status(500).json({message: 'Could not perform logout!'});
            }

            res.clearCookie(SESS_NAME)
        })
    }
})
/*
const sslServer = https.createServer({
    key: '',
    cert: ''
},app)

sslServer.listen(PORT, () => console.log(`Server listening on ${PORT}`))

 */

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});



