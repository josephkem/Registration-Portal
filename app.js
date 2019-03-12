require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');


const app = express();

//Database connection
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection
  .on('connected', () => {
    console.log(`Mongoose connection open on ${process.env.DATABASE}`);
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded ( { extended: false }));

//Express Session
app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Connect flash
app.use(flash());

//Routes
app.use ('/', require ('./routes/index'));
app.use ('/users', require ('./routes/users'));

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port}`));