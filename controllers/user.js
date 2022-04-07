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
  // Create a new user using passport-local-mongoose
  const { username, password } = req.body;
  const errors = [];

  // Check email is valid
  if (!validator.validate(username)) {
    errors.push({ msg: 'Please enter a valid email address' });
  }

  // Check required fields
  if (!username || !password) {
    errors.push({ msg: 'Please fill  all fields' });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  // Check if there are errors
  if (errors.length > 0) {
    res.render('account/register', {
      errors,
      username,
      password,
    });
  } else {
    // If no errors, create the user
    User.findOne({ username: username }, (err, user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('account/register', {
          errors,
          username,
          password,
        });
      } else {
        User.findOne({ username: username }).then((user) => {
          if (user) {
            errors.push({ msg: 'Email already exists' });
            res.render('account/register', {
              errors,
              username,
              password,
            });
          } else {
            const newUser = new User({
              username,
              password,
            });

            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then((user) => {
                    req.flash(
                      'success_msg',
                      'You are now registered and can log in'
                    );
                    res.redirect('login');
                  })
                  .catch((err) => console.log(err));
              });
            });
          }
        });
      }
    });
  }
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
