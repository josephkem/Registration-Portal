const express = require('express');
const router = express.Router();

//Login page
router. get('/login', (req,res) => res.render('login'));

//Registration page
router. get('/register', (req,res) => res.render('register'));

module.exports = router;