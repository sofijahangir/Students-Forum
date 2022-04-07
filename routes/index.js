const express = require('express');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

const Posts = require('../models/posts');
const User = require('../models/user');

// Dashboard
// router.get('/', (req, res) => {
//   res.render('index');
// });

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // find all posts of the user by userId

    const userId = req.session.passport.user;
    const result = await User.findById(userId).populate('posts');
    const { posts } = result;

    res.render('dashboard', {
      posts,
      name: req.user.username,
    });
    // res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong, check logs');
  }

  // const posts = Posts.find({ userId });
  // console.log(posts);

  // res.status(200).send(posts);
  // res.render('dashboard', {
  //   name: req.user.username,
  // });
});

module.exports = router;
