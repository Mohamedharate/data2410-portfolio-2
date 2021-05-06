const express = require('express');
const path = require('path');
//const User = require("./Models/user");

const cors = require("cors");
const passport = require('passport');
const flash = require('express-flash')

require('./passport-config')
require('./DB Connection/connectDB')

/*
const favicon = require('serve-favicon');
const dotenv = require('dotenv').config();

 */

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//const https = require('https');
const fs = require('fs');
const app = express();

app.use(cors());

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

app.use('/', express.static('./public'));

app.use(express.static(path.resolve(__dirname, '../client/build')));


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

ONE_WEEK = 604800000

const{
    PORT = 3001,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = 'shhh!this,a7\'secret',
    SESS_LIFETIME = ONE_WEEK,
} = process.env

const IN_PROD = NODE_ENV === 'production'

const store = new MongoDBStore({
    uri: 'mongodb+srv://haratemo:12345oslomet@webshop.uemit.mongodb.net/webshop?retryWrites=true&w=majority',
    collection: 'mySessions'
});
app.use(cookieParser('shhh!this,a7\'secret'))

app.use(
    session({
        secret: SESS_SECRET,
        resave: false,
        name: SESS_NAME,
        saveUninitialized: false,
        unset: 'destroy',
        httpOnly:false,
        cookie: {
            maxAge: parseInt(SESS_LIFETIME),
            sameSite: true,
            secure: false,
        },
        store:store
    })
)
app.set("trust proxy", 1)

store.on('error', function(error) {
    console.log(error.toString() + " feil i lagring av session");
});

app.use(flash())
app.use(passport.initialize());
app.use(passport.session());


// ------- import routes ---------- //

const register = require('./routes/usersRoutes/NotAuth/register');
const resetPassword = require('./routes/usersRoutes/NotAuth/resetPassword');
const products = require('./routes/productsRoutes/products');
const orders = require('./routes/ordersRoutes/orders');
const admin = require('./routes/adminsRoutes/admins');
const users = require('./routes/usersRoutes/users');
const cart = require('./routes/cartRoutes/cart');

// --------- Middlewares ------------- //

app.use('/api/register/', register);
app.use('/api/reset/', resetPassword);
app.use('/api/users/', users);
app.use('/api/products/', products);
app.use('/api/orders/', orders);
app.use('/api/admin/', admin);
app.use('/api/cart/', cart);

// ------- - - - - - - - -  ---------- //

app.post('/api/signInAdmin', passport.authenticate('local.signinAdmin', {
    successRedirect: '/',
    failureRedirect: '/api/signInAdmin',
    failureFlash: true
}))

app.post('/api/signIn', passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/api/signIn',
    failureFlash: true
}))


app.use(function (req,res,next){
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.post('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.session.destroy(err => {
            if (err){
                return res.status(500).json({message: 'Could not perform logout!'});
            }
            res.clearCookie(SESS_NAME)
        })
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});



