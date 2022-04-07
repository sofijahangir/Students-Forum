const express = require('express');
const {
  addPost,
  getPosts,
  getPostsOfUser,
  readPost,
} = require('../controllers/post');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('posts/newPost');
});
router.post('/new', ensureAuthenticated, addPost);
router.get('/get', getPosts);
router.get('/dashboard', getPostsOfUser);
router.get('/read/:id', readPost);
// router.get('/read/:id', readPost);

module.exports = router;
