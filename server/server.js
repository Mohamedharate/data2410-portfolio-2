//require('./DB Connection/connectDB')
const mongoose = require("mongoose");
const express = require('express');
const path = require('path');

const cors = require("cors");
const passport = require('passport');
const flash = require('express-flash')

require('./passport-config')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();


app.use(cors());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});


const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

app.use('/', express.static('./public'));

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

ONE_WEEK = 604800000

const {
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
        httpOnly: false,
        cookie: {
            maxAge: parseInt(SESS_LIFETIME),
            sameSite: true,
            secure: false,
        },
        store: store
    })
)
app.set("trust proxy", 1)

store.on('error', function (error) {
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
app.use('/api/users/', users);
app.use('/api/products/', products);
app.use('/api/orders/', orders);
app.use('/api/admin/', admin);
app.use('/api/cart/', cart);

// ------- - - - - - - - -  ---------- //


app.post('/api/signin', (req, res, next) => {
    passport.authenticate('local.signin',
        (err, user, info) => {
            if (err) {
                return res.status(500).json(err.toString())
            }

            if (!user) {
                return res.status(400).json(info)
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(user);
            });
        })(req, res, next);
});


app.post('/api/signin-admin', (req, res, next) => {
    passport.authenticate('local.signinAdmin',
        (err, user, info) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (!user) {
                return res.status(400).json(info)
            }
            req.logIn(user, function (err) {
                if (err) {
                    res.redirect('http://localhost:3001');
                }
                return res.status(200).json(user);
            });
        })(req, res, next);
});


app.get('/auth/google',
    passport.authenticate('google',
        { scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        })
);

app.get('/auth/google/callback',
    passport.authenticate('google',
        { failureRedirect: '/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.post('/logout', (req, res) => {
    if (req.user) {
        try {
            req.logout();
            req.session.destroy();
            res.clearCookie(SESS_NAME)
        }
        catch (err){
            return res.status(500).json({Error: 'Could not perform logout!'});
        }
        return res.status(200).redirect('http://localhost:3001');
        /*
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({message: 'Could not perform logout!'});
            }
            res.clearCookie(SESS_NAME)
        })

         */
    }
    else{
        return res.status(400).json({Error: 'Not logged in'});
    }
})
app.on('ready', function () {
    app.listen(3001, function () {
        console.log("app is ready");
    });
});

// ------- connect to mongodb ---------- //
try {
    mongoose.connect("mongodb+srv://haratemo:12345oslomet@webshop.uemit.mongodb.net/webshop?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, () =>
        console.log("connected to webshopDB"));
        app.emit('ready');
} catch (error) {
    console.log("could not connect to webshopDB");
}
/*
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

 */





