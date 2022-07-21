const express = require('express');
const router = express.Router();
const { getPosts, setPosts } = require('../controllers/postsController');




router.get('/', getPosts);
router.post('/', setPosts)



module.exports = router