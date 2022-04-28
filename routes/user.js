const express = require('express');
const passport = require('passport');
const {
  getLoginPage,
  getRegisterPage,
  registerUser,
  loginUser,
  logoutUser,
  setUserRole,
  deleteUser,
} = require('../controllers/user');
const { ensureAuthenticated } = require('../config/auth');

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

// Set User Roles
router.post('/user/setRole', ensureAuthenticated, setUserRole);
router.get('/user/setRole', ensureAuthenticated, setUserRole);

// delete user
router.get('/user/delete/:id', ensureAuthenticated, deleteUser);

module.exports = router;
