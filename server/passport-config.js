const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

const bcrypt = require('bcrypt')
const User = require("./Models/user");
const passport = require('passport');
const Admin = require("./Models/admin");


passport.serializeUser((obj, done) => {
    if (obj instanceof Admin) {
        done(null, {id: obj.id, type: 'Admin'});
    } else {
        done(null, {id: obj.id, type: 'User'});
    }
});

passport.deserializeUser((obj, done) => {
    if (obj.type === 'Admin') {
        Admin.findById(obj.id, function (err, user) {
            done(err, user)
        })
    } else {
        User.findById(obj.id, function (err, user) {
            done(err, user)
        })
    }
});
passport.use('local.signinAdmin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async function (req, email, password, done) {
        await Admin.findOne({email: email}, async function (err, admin) {
            if (err) {
                return done(err)
            }
            if (!admin) {
                return done(null, false, {message: "No user found"})
            }
            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return done(null, false, {message: "Wrong passoword"})
            }
            return done(null, admin)
        });
    }
));
passport.use('local.signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async function (req, email, password, done) {
        await User.findOne({email: email}, async function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false, {Error: "No user with that email found"})
            }
            else if (!user.password) {
                return done(null, false, {Error: "Log in with Google"})
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return done(null, false, {Error: "Incorrect password"})
            }

            if (req.session.cart) {
                if (req.session.cart.length > 0) {
                    if (user.cart.length > 0) {
                        for (let i = 0; i < user.cart.length; i++) {
                            for (let j = 0; j < req.session.cart.length; j++) {
                                if (user.cart[i].itemId === req.session.cart[j].itemId) {
                                    await User.updateOne(
                                        {email: email},
                                        {
                                            $inc: {
                                                [`cart.${i}.quantity`]: req.session.cart[j].quantity
                                            },
                                            [`cart.${i}.total`]: parseFloat(req.session.cart[j].total)
                                        });
                                }
                            }
                        }
                    }
                } else {
                    await User.updateOne({email: email}, {$push: {cart: req.session.cart}});
                }
            }
            req.session.cart = []
            return done(null, user)
        });
    }
));

passport.use( 'google',new GoogleStrategy(
        {
            clientID: "651055263121-919p95n24dr0cnlvc4pi5pkj61kv4s5a.apps.googleusercontent.com",
            clientSecret: "bLGBEzIke-i8IzrqMtHa1kc9",
            callbackURL: 'http://localhost:3001/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {

            const newUser = {
                googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email:profile.emails[0].value,
            }
            try {
                let user = await User.findOne({ googleId: profile.id })

                if (user) {
                    done(null, user)
                } else {
                    user = await User.create(newUser)
                    done(null, user)
                }
            } catch (err) {
                console.error(err.toString())
            }
        }
    )
)