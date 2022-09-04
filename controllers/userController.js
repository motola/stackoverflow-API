const mongoose = require('mongoose');
const User = require('../model/userModel');
const Post = require('../model/postModel');  
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware')
const saltRounds = 10;

     // User Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *         type: object
 *         required:
 *            - displayName
 *            - email
 *            - password
 *         properties:
 *           displayName:
 *             type: string
 *             description: The display name of the user
 *           email:
 *             type: string
 *             description: The email of the user
 *           password:
 *             type: string
 *             description: The password of the user
 *         example:
 *             displayName: Emeka Lotus
 *             email: emekalotus@outlook.com 
 *             password: ijm0g9j54j95h550k0jg5s.09jg9jg9jg,
 * 
 */

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: All authentication route belonging to Stackoverflow API
 */


       // Login Swagger Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *         type: object
 *         required:
 *            - email
 *            - password
 *         properties:
 *           email:
 *             type: string
 *             description: The email of the user
 *           password:
 *             type: string
 *             description: The password of the user
 *         example:
 *             email: emekalotus@outlook.com 
 *             password: ijm0g9j54j95h550k0jg5s.09jg9jg9jg,
 *     register:
 *         type: object
 *         required:
 *            - displayName
 *            - email
 *            - password
 *         properties:
 *           displayName:
 *             type: string
 *             description: The displayName of the user
 *           email:
 *             type: string
 *             description: The email of the user
 *           password:
 *             type: string
 *             description: The password of the user
 *         example:
 *             displayName: Emeka Lotus
 *             email: emekalotus@outlook.com 
 *             password: ijm0g9j54j95h550k0jg5s.09jg9jg9jg,
 *
 * 
 */



/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registers a user
 *     tags: [auth]
 *     requestBody:
 *          required: true
 *          content: 
 *             application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/register'
 *     responses:
 *         200:
 *           description: The list of all post
 *           content: 
 *               application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/register'
 */ 




// 4 user can sign up
const registerUser = async (req, res) => {
    let { displayName, email, password } = req.body
    
    if (!displayName || !email || !password) {
    res.status(400).json('Please add all fields');   
    }
    else {

   bcrypt.genSalt(saltRounds, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            const userData = await User({
                displayName: displayName,
                email: email,
                password: hash  
             })
            userData.save();
            res.status(200).json(userData)
        });
    });
}
}


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [auth]
 *     requestBody:
 *          required: true
 *          content: 
 *             application/json:
 *                 schema:
 *                  $ref: '#/components/schemas/Login'
 *     responses:
 *         200:
 *           description: The list of all post
 *           content: 
 *               application/json:
 *                   schema:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/register'
 */ 



// 1
const loginUser = async (req, res) => {
     const { email, password } = req.body 
      const loggedUser = await User.findOne({
               email: email
      });

      if(loggedUser && bcrypt.compare(password, loggedUser.password)) {
           res.status(200).json({
            id: loggedUser.id,
            email: loggedUser.email,
            displayName: loggedUser.displayName,
            token: generateToken(loggedUser.id)
        });
      }
      else {
        res.status(400).json('Wrong Credentials')
      }

    //   res.status(200).json(isLoggedIn);
}

const getUser = (req, res) => {
              res.status(200).json('Login Sucessful');
}



// const getPostbyUser = async (req, res) => {
//                 const { id } = req.params.id
//              const postByUser = await User({
//                     _id: id
//              })
//              re.status(200).json(postByUser);
// }

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User route for the Stackoverflow Post API
 */

/**
 * @swagger
 * /user/{userId}/posts:
 *      get:
 *         summary: Fetch all post belonging to a specific User
 *         tags: [User]
 *         parameters: 
 *            - in: path
 *              name: UserId
 *              schema:
 *                 type: string
 *              required: true
 *              description: The User Id
 *         responses:
 *           200:
 *              description: The posts by a User
 *              contents:
 *                 applications/json:
 *                     schema:
 *                        $ref: '#/components/schemas/Post'
 *           404: 
 *              description: The post belonging to User not found
 */

// Get a User Post by its User Id (one to many relationship)
const getUserpostById = async (req, res) => {
    //  const { id } = req.params.id

     const userId = await Post.find({id: req.params.id})
  console.log(userId);
    //  if (!userId) {
    //     res.status(200).json('User not found')
    //  }

    // if(userId === req.user) {
    //     const postByUser = await Post.find(req.user)
       
    // }
    res.status(200).json(userId);


    
}



// Generate Token

const generateToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUserpostById
}