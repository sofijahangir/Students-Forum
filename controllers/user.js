// User Controller

const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const validator = require('email-validator');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');

const User = require('../models/user');
// Fetch Login And Register Pages

const getLoginPage = async (req, res) => {
  // Render the login page
  res.render('account/login');
};
const getRegisterPage = async (req, res) => {
  // Render the login page
  res.render('account/register');
};

const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const errors = [];
  if (!name || !email || !password || !phone) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (!validator.validate(email)) {
    errors.push({ msg: 'Please enter a valid email' });
  }
  if (errors.length > 0) {
    res.render('account/register', {
      errors,
      name,
      email,
      phone,
      password,
    });
  }
  // Check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    errors.push({ msg: 'Email already exists' });
    res.render('account/register', {
      errors,
      name,
      email,
      phone,
      password,
    });
  }
  // If the user does not exist, create the user
  const newUser = new User({
    name,
    email,
    phone,
    password,
  });
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  newUser.password = hashedPassword;
  await newUser.save();
  req.flash('success_msg', 'You are now registered and can log in');
  res.redirect('/login');
};

const loginUser = async (req, res, next) => {
  // Login the user using passport-local-mongoose
  if (!req.user) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    })(req, res, next);
  } else {
    // If the user object exists, the user is logged in and if they try to log in we redirect them to the home page
    return res.redirect('/');
  }
};

const logoutUser = async (req, res) => {
  // Logout the user using passport-local-mongoose
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerUser,
  loginUser,
  logoutUser,
};
