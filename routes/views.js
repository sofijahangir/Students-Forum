const express = require('express');
const { viewPost } = require('../controllers/views');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

router.post('/:id/add', ensureAuthenticated, viewPost);
// router.get('/:id/like', ensureAuthenticated, likePost);

module.exports = router;
