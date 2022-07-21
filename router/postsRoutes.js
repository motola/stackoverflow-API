const express = require('express');
const router = express.Router();
const { getPosts, createPosts } = require('../controllers/postsController');




router.get('/', getPosts);
router.post('/', createPosts)



module.exports = router
