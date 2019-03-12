const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Load user model
const User = require('../models/User');

module.exports = (passport) {
    passport.use (
        new LocalStrategy ({ usernameField: 'email' }, (email, password, done) => {
            //Match user
            User.findOne({ email: email})
            .then(user => {
                if(!user) {
                    return done(null, false, {message: 'That email is not registered'});
                }
            })
            .catch(err => console.log(err) )
        })
    );
}