const express = require('express');
const router = express.Router();

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
        res.send('pass');
    }

});

module.exports = router;