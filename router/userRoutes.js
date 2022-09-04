const express = require('express');


const router = express.Router();

const { registerUser, loginUser, getPostbyUser, getUser, getUserpostById } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.post('/signup', registerUser); //1
router.post('/login', loginUser);     //2
router.get('/', protect, getUser)     //bonus
router.get('/:UserId/posts', getUserpostById) // 5

module.exports = router