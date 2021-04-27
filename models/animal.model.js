//import mongoose
const mongoose = require('mongoose')

//this schema is how we will represent the animal in database
var animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Animal must be named.'
    },
    age: {
        type: String,
        required: 'This field is required.' 
    },
    description: {
        type: String,
        required: 'Description must be provided'
    },
});
//we will connect the schema to animals. 
mongoose.model('Animal', animalSchema);