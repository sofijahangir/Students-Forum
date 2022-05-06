const express = require('express');
const { dislikePost } = require('../controllers/dislikes');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

router.post('/:id/add', ensureAuthenticated, dislikePost);
// router.get('/:id/like', ensureAuthenticated, likePost);

module.exports = router;
