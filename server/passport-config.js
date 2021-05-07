const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require("./Models/user");
const passport = require('passport');
const Admin = require("./Models/admin");





passport.serializeUser((obj, done) => {
    if (obj instanceof Admin) {
        done(null, { id: obj.id, type: 'Admin' });
    } else {
        done(null, { id: obj.id, type: 'User' });
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
/*
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {

    await User.findById(id, function (err, user) {
        if (!user) {
            Admin.findById(id, function (err, user) {
                done(err, user)
            })
        } else {
            done(err, user);
        }
    });

});


 */

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
                return done(null, false, {message: "No user found"})
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return done(null, false, {message: "Wrong passoword"})
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


