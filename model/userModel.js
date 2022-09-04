const mongoose = require('mongoose');
const Post = require('../model/postModel')

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
},
{ 

    timestamps: true

});


module.exports = mongoose.model('User', userSchema);