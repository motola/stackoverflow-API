const mongoose = require('mongoose');
const Post = require('../model/postModel');
const User = require('../model/userModel');
const {protect} = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *         type: object
 *         required:
 *            - title
 *            - body
 *            - tags
 *         properties:
 *           title:
 *             type: string
 *             description: The title of the post
 *           body:
 *             type: string
 *             description: The content of the post
 *           tags:
 *              type: string
 *              description: A collective classification of related post and what the post subject could be about
 *         example:
 *             title:  How to undo a git stash
 *             body: I just did a stash in a project that I haven't commit. Is there a way to go back to the state before I stashed? 
 *             tags: [ github, git, bitbucket, version control]
 *   securitySchemes: 
 *         bearerAuth: 
 *             type: http
 *             scheme: bearer
 *             bearerFormat: JWT
 *   responses:
 *     authorizedPost:
 *       description: Post created successfully
 *
 *
 * 
 */



/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Stackoverflow Post API
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Returns a list of all post
 *     tags: [Post]
 *     responses:
 *         200:
 *           description: The list of all post
 *           content: 
 *               application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Post'
 */ 
//  Get all posts 
const getPosts = async (req, res) => {
    const posts = await Post.find();

    res.status(200).json(posts); 
};

/**
 * @swagger
 * /posts/{id}:
 *      get:
 *         summary: Fetch a specific post
 *         tags: [Post]
 *         parameters: 
 *            - in: path
 *              name: id
 *              schema:
 *                 type: string
 *              required: true
 *              description: The post Id
 *         responses:
 *           200:
 *              description: The posts by id
 *              contents:
 *                 applications/json:
 *                     schema:
 *                        $ref: '#/components/schemas/Post'
 *           404: 
 *              description: The post not found
 */




// Get a specific Post Id
const getPostsById = async (req, res) => {
    const { id } = req.params
      
        const posts = await Post.findOne({
            _id: id
        });
        console.log(posts)
         res.json(posts)
    
     

}

/**
 * @swagger
 * /posts:
 *    post:
*        security:
*          - bearerAuth: []     
*        summary: create a new post
*        tags: [Post]
*        requestBody:
*           required: true
*           content:
*              application/json:
*                schema:
*                  $ref: '#/components/schemas/Post'
*        responses:
*            200:
*               description: Post succesfully created
*               content:
*                 application/json:
*                     schema:
*                        $ref: '#/components/schemas/responses/authorizedPost'
*            500: 
*              description: server error
*            
*/


//3 create a post 
const createPosts = async (req, res) => {
   const  {title, body, tags} = req.body
   const post = new Post({
    title: title,
    body: body,
    tags: tags,
    user: req.user.id
   }); 

   if (!(title && body)) {
    res.status(400).json('Please add title and body')
    throw new Error('Please add a text field');
   }
    
   console.log(req.user)
                                            
   await post.save();
   res.status(200).json(post);
}

/**
 * @swagger
 * /posts/{postId}/edit:
 *    put:
 *     security:
 *        - bearerAuth: []  
 *     summary: change a post
 *     tags: [Post]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *          type: string
 *     required: true   
 *     description: The post id
 *     requestBody:
 *         required: true
 *         content: 
 *            application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Post'
 *     responses:
 *          200:
 *            description: Parcel was deleted
 *            content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Parcel'
 *          404:
 *            description: Parcel not found
 *          500:
 *            description: server error
 *          
 *    
 * 
 */

// Update Post by Id

const updateById = async (req, res) => {

    // Get the current Post
    const {id} = req.params
    const currentPost = await Post.findOne(req.params.id);
     console.log(currentPost);
     console.log(currentPost.user)
    if (!currentPost) {
        res.status(400).json('Post not found');
    }
    // Get current user
    const user = await User.findById(req.user.id)
        
    // Check for user
    if(!user) {
        res.json('User not found')
    }
   // Make sure loggedin User matches the goal user
   if (currentPost.user.toString() !== user.id) {
    res.status(401).json('User not authorized');
   }
    
   const updatePost = await Post.findOneAndUpdate(req.params.id, req.body, {
    new: true,
   })
   console.log(updatePost)
     res.status(200).json(updatePost);
}


/**
 * @swagger
 * /posts/{postId}/cancel:
 *    delete:
 *     security:
 *        - bearerAuth: []  
 *     summary: Cancel a specific post
 *     tags: [Post]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The Post Id  
 *     responses:
 *          200:
 *            description: Post was cancelled
 *            content:
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/Post'
 *          404:
 *            description: Post not found
 *   
 */


const deleteById = async (req, res) => {

    // Get the current Post
    const {id} = req.params
    const currentPost = await Post.findOne(req.params.id);
     console.log(currentPost);
     console.log(currentPost.user)
    if (!currentPost) {
        res.status(400).json('Post not found');
    }
    // Get current user
    const user = await User.findById(req.user.id)
        
    // Check for user
    if(!user) {
        res.json('User not found')
    }
   // Make sure loggedin User matches the goal user
   if (currentPost.user.toString() !== user.id) {
    res.status(401).json('User not authorized');
   }
    
    await Post.findOneAndRemove()
   
     res.status(200).json({post: 'Post Deleted'}); 
}






module.exports = {
    getPosts,
    getPostsById,
    createPosts,
    updateById,
    deleteById
}
