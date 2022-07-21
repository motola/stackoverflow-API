const mongoose = require('mongoose');
const Post = require('../model/postModel')

const getPosts = async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts); 
};

const getPostsById = async (req, res) => {
    const { id } = req.params
     try {  
        const posts = await Post.findOne({
            _id: id
         })
         res.json(posts)
     } catch (error) {
        res.status(404);
        res.send({error: 'Post not found'})
     }
     

}

const deletePostsById = async (req, res) => {
    const { id } = req.params
     try {  
        const posts = await Post.deletOne({
            _id: id
         })
         res.json(posts)
     } catch (error) {
        res.status(404);
        res.send({error: 'Post not found'})
     }
     

}


const createPosts = async (req, res) => {
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
    getPostsById,
    deletePostsById,
    createPosts,
}
