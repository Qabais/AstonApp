//import express
const express = require('express')

//This will allow us to access different routes
var router = express.Router()

//import mongoose
const mongoose = require('mongoose')
//create animal model to conenct to schema.
const Animal = mongoose.model('Animal')

router.get('/', (req, res) => {
    res.render('animal/addorEdit', {
        viewTitle: 'Insert Animal Details'
    })
});

router.post('/', (req, res) => {
    if(req.body._id == ''){
        insertRecord(req,res)
    } else {
        updateRecord(req,res)
    }
});

//this will insert the record into db
//follows the same model as schema created in animals.model
function insertRecord(req,res){
    var animal = new Animal()
    animal.name = req.body.name;
    animal.age = req.body.age;
    animal.description = req.body.description;
    //save the record
    animal.save((err, doc) => {
        //error check the entry
        if(!err){
            res.redirect('animal/list')
        } else{
            console.log('Error inserting record: '+ err)
        }
    });
};

//this function will update the record. 
function updateRecord(req,res){
    Animal.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err, doc) => {
        if(!err){
            res.redirect('animal/list');
        } else {
            console.log('Error when updating: '+ err);
        }
    });
};

//This funtion will collect the record.
router.get('/list', (req,res) => {
    Animal.find((err, docs) => {
        if(!err){
            res.render('animal/list', {
            list: docs,
            }); 
        } else {
            console.log('Error when retrieving doc: '+ err);
        }
    });
});

//Function to collect record using id
router.get('/:id', (req, res) =>{
    Animal.findById(req.params.id, (err,doc) => {
        if(!err){
            res.render('animal/addorEdit', {
                viewTitle: 'Update Animal',
                animal: doc,
            });
            console.log(doc);
        }
    });
});

//delete record by id
router.get('/delete/:id', (req,res) => {
    Animal.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err){
            res.render('animal/list');
        } else {
            console.log('Error when deleting record: '+ err);
        }
    });
});

module.exports = router