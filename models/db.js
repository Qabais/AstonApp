//This will hold the instructions for our database
//import mongoose
const mongoose = require('mongoose')
//connect mongoose to host
mongoose.connect('mongodb://localhost:27017/AnimalsDB', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    //error check to validate DB connection.
    (err) => {
    if(!err){
        console.log('DB Connection successfull')
    } else{
        console.log('Error in connection' + err)
    }
}
);

require('./animal.model');