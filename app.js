const express = require('express');
const app = express();

//Routes
app.use ('/', require ('./routes/index'));
app.use ('/users', require ('./routes/users'));

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port}`));