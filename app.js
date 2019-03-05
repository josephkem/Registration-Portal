const express = require('express');
const app = express();

//Routes
app.use ('/', require ('./routes/index'));

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server started on port ${port}`));