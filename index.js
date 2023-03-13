var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

//Router//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Port//
const PORT = 8000;

app.use('/', indexRouter);
app.use('/users', usersRouter);

//MongoDB Connection//
mongoose.connect(process.env.dbUrl).then(()=> {
    app.listen(PORT, ()=> {
        console.log("Connected to MongoDB, server listening on port "+ PORT);
    });
}).catch((error)=> {
    console.log("Failed to connect to MongoDB, error: "+ error.message);
});