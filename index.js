//CTRL + C to stop the cancel terminal
//restart video. check what he enters..

require('./models/db');

//import express library.
const express = require('express');

//import path library
const path = require('path');
//import handlebars
const handlebars = require('handlebars');
//link handlebars to express library
const expresshb = require('express-handlebars');

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const animalController = require("./controllers/animalController");
//import mongoose for database
const mongoose = require('mongoose');

//executes express package, creates our app.
var app = express();

const PORT = process.env.PORT || 3000;
//app will need body parser
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
//This will be the home page of the site
app.get('/', (req, res) => {
    res.send('<h2> Welcome to Aston Animal Sanctuary</h2> <h3>Click here to see our animals <b> <a href="/animal/list"> Database</a></b> </h3><h3>Click here to <b> <a href="/login"> login </a> </b></h3>')
})
//create views folder for content
app.set('views', path.join(__dirname, '/views/'))
//allows us to seperate content from layout.
app.engine('hbs',
    expresshb({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        extname: 'hbs',  
        defaultLayout: 'MainLayout',
        layoutsDir: __dirname + '/views/layouts/'
    })
);

app.set('view engine', 'hbs');

app.listen(PORT,
    console.log('Server started at port:', {PORT}));

app.use("/animal", animalController);