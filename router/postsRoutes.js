const express = require('express');
const router = express.Router();
const { getPosts, createPosts, getPostsById, deletePostsById } = require('../controllers/postsController');




router.get('/', getPosts);
router.get('/:id', getPostsById)
router.delete('/:id', deletePostsById)
router.post('/', createPosts)



module.exports = router
