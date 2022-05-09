const express = require('express');
const {
  addPost,
  getPosts,
  getPostsOfUser,
  readPost,
  deletePost,
} = require('../controllers/post');

const Likes = require('../models/likes');

const router = express.Router();

const {
  ensureAuthenticated,
  ensureBothAdminAndFaculty,
} = require('../config/auth');

router.get('/new', ensureAuthenticated, (req, res) => {
  res.render('posts/newPost');
});
router.post('/new', ensureAuthenticated, addPost);
router.get('/get', getPosts);
router.get('/dashboard', getPostsOfUser);
router.get('/read/:id', readPost, (req, res) => {
  // Get the likes
  const { id } = req.params;
  const likes = Likes.find({ id });
  const dislikes = Likes.find({ id });
  res.render('/read/:id', {
    likes,
  });
});

// delete post
router.get('/delete/:id', ensureAuthenticated, deletePost);

// router.delete('/delete/:id', deletePost);
// router.get('/read/:id', readPost);

module.exports = router;
