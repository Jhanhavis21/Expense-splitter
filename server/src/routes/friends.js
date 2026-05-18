const express = require('express');
const router = express.Router();
const { addFriend, getFriends, removeFriend } = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addFriend);
router.get('/my-friends', authMiddleware, getFriends);
router.post('/remove', authMiddleware, removeFriend);

module.exports = router;
