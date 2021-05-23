require('./DB Connection/connectDB')
const express = require('express');
const path = require('path');
const fs = require("fs")
const compression = require('compression');
require('./passport-config')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


const cors = require("cors");
const passport = require('passport');
const flash = require('express-flash')

const cert = fs.readFileSync(path.join(__dirname, 'ssl/', 'localhost.cert'));
const key = fs.readFileSync(path.join(__dirname, 'ssl/', 'localhost.key'));

const options = {
    key: key,
    cert: cert,
};

const app = express();
app.use(compression());




const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


app.use(cors());
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.set("trust proxy", 1);



app.use(express.static(path.resolve(__dirname , '../client/build')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const ONE_WEEK = 604800000

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
    collection: 'sessions'
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


const index = require('./routes/index');
app.use('/api', index);


app.get('/auth/google',
    passport.authenticate('google',
        {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        })
);

app.get('/auth/google/callback',
    passport.authenticate('google',
        {failureRedirect: '/'}),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
})



app.post('/logout', (req, res) => {
    if (req.user) {
        try {
            req.logout();
            req.session.destroy();
            res.clearCookie(SESS_NAME)
        } catch (err) {
            return res.status(500).json({Error: 'Could not perform logout!'});
        }
        return res.status(200).redirect('https://localhost:3001');
    } else {
        return res.status(400).json({Error: 'Not logged in'});
    }
})

app.post('/admin/logout', (req, res) => {
    if (req.user) {
        try {
            req.logout();
            req.session.destroy();
            res.clearCookie(SESS_NAME)
        } catch (err) {
            return res.status(500).json({Error: 'Could not perform logout!'});
        }
        return res.status(200).redirect('https://localhost:3001');
    } else {
        return res.status(400).json({Error: 'Not logged in'});
    }
})


const https = require('https');
https.globalAgent.maxSockets = Infinity;

https.createServer(options, app).listen( PORT, () => {
    console.log(`Connected on port ${PORT}`)
});


// ------- Prometheus ---------- //
const client = require('prom-client')


const register = new client.Registry();
client.collectDefaultMetrics({register})


register.setDefaultLabels({
    app: 'portfolio2'
})

// prometheus endpoint
app.get('/metrics', (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
});

client.register.clear();

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});