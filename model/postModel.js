const mongoose = require('mongoose');
const nodemon = require('nodemon');


const postSchema = new mongoose.Schema({
   id: Number,
   title: {
    type: String,
    required: true
   },
   body:{
    type: String,
    required: true
   },
   tags: [
    {
        type: String
    }
   ],
   comment:[
    {
        type: String
    }
   ],
   
   
    }, 
    {
        timestamps: true
    }) 


module.exports = mongoose.model('Post', postSchema);
