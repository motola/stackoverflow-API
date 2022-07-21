const mongoose = require('mongoose');
const Post = require('../model/postModel')

const getPosts = async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts); 
};


const setPosts = async (req, res) => {
   const  {title, body, tags} = req.body
   const post = new Post({
    title: title,
    body: body,
    tags: tags
   }); 

   if (!(title && body)) {
    res.status(400).json('Please add title and body')
    throw new Error('Please add a text field');
   }

   await post.save();
   res.status(200).json(post);
}







module.exports = {
    getPosts,
    setPosts
}