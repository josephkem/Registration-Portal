const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//User model
const User = require('../models/User');

//Login page
router. get('/login', (req,res) => res.render('login'));

//Registration page
router. get('/register', (req,res) => res.render('register'));

//Registration handle
router.post('/register', (req,res)=> {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Validate require fields
    if(!name || !email || !password || !password2) {
        errors.push( { msg: 'Please fill in all require fields.'} );
    }

    //Validate password confirmation
    if(password !== password2) {
        errors.push ( { msg: 'Passwords do not match'});
    }

    //Validate password length
    if(password.length <6) {
        errors.push( { msg: 'Password should be at least 6 characters'} );
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });

    } else {
        //Vallidation passed
        User.findOne({ email: email })
            .then ( user => {
                if(user) {
                    //User exists
                    errors.push( {msg: 'Email is already registered'} )
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });

                } else {
                    const newUser = User ({
                        name,
                        email,
                        password
                    });

                   //Hash password
                   bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err,hash) => {
                            if(err) throw err;
                            //Set password to hashed
                            newUser.password = hash;
                            //Save user
                            newUser.save()
                                .then(user => {
                                    res.redirect('/login');
                                })
                                .catch(err => console.log(err));

                   }))
                }
            });
    }

});

module.exports = router;