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

// set the user as admin or faculty
const setUserRole = async (req, res) => {
  // get the value from query string
  const { id } = req.query;
  const { role } = req.query;

  // Find the user
  const user = await User.findById(id);

  // Set the role
  user.isAdmin = role === 'admin';
  user.isFaculty = role === 'faculty';

  if (role == null) {
    user.isAdmin = false;
    user.isFaculty = false;
  }
  // Save the user
  await user.save();
  // Redirect to the users page
  res.redirect('/dashboard/users');
  // console.log(id);
};

// Delete the user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.redirect('/dashboard/users');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerUser,
  loginUser,
  logoutUser,
  setUserRole,
  deleteUser,
};
