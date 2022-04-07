const express = require('express');
const passport = require('passport');
const {
  getLoginPage,
  getRegisterPage,
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/user');
const {
  ensureAuthenticated,
  ensureNotAuthenticated,
} = require('../config/auth');

const router = express.Router();

// Prevent the user from loging in again if they are already logged in 


// Login Route ....

router.get('/login', getLoginPage);

// Register Route ....

router.get('/register', getRegisterPage);

router.post('/register', registerUser);

// Login Handle
router.post('/login', loginUser);

// Logout Handle

router.get('/logout', logoutUser);

module.exports = router;
