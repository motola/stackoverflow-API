const express = require('express');
const router = express.Router();
const { getPosts, createPosts, getPostsById, updateById, deleteById } = require('../controllers/postsController');
const { passport } = require('../');
const { protect } = require('../middleware/authMiddleware')




router.get('/', getPosts); // 3
router.get('/:id', getPostsById); //4
router.post('/', protect, createPosts); //7
router.put('/:postId/edit',protect, updateById); //8
router.delete('/:postId/cancel',protect, deleteById); // 6



module.exports = router
