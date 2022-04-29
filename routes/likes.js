const express = require('express');
const { likePost } = require('../controllers/likes');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

router.post('/:id/add', ensureAuthenticated, likePost);
// router.get('/:id/like', ensureAuthenticated, likePost);

module.exports = router;
