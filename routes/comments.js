const express = require('express');
const { postComment } = require('../controllers/comments');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

router.post('/:id/add', ensureAuthenticated, postComment);

module.exports = router;
