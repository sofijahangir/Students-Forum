const express = require('express');

const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');

const Posts = require('../models/posts');
const Events = require('../models/events');
const Users = require('../models/user');

// Dashboard
// router.get('/', (req, res) => {
//   res.render('index');
// });

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    // find all posts of the user by userId

    const userId = req.session.passport.user;
    const result = await Users.findById(userId).populate('posts');
    const allPosts = await Posts.find();
    const events = await Events.find();
    const { posts } = result;

    // Check if user is admin
    const { isAdmin } = req.user;

    const { isFaculty } = req.user;
    if (isAdmin || isFaculty) {
      res.render('Dashboard/adminDashboard', {
        posts,
        events,
        allPosts,
        name: req.user.name,
      });
    } else {
      res.render('Dashboard/dashboard', {
        posts,
        name: req.user.name,
      });
    }

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

// User Dashboard
router.get('/dashboard/users', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.session.passport.user;

    // Check if user is admin
    const { isAdmin } = req.user;

    if (isAdmin) {
      // Get the list of all users without admin
      const users = await Users.find({ isAdmin: false });

      res.render('Dashboard/userListDashboard', {
        users,
      });
    }

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
