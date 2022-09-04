const mongoose = require('mongoose');
const User = require('./userModel')


const postSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true
   },
   body:{
    type: String,
    required: true
   },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
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
