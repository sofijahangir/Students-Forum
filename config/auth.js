module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view the resource');
    res.redirect('/login');
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  },

  ensureIsAdmin: function (req, res, next) {
    if (req.user.isAdmin) {
      return next();
    }
    req.flash('error_msg', 'You are not authorized to view the resource');
    res.redirect('/');
  },
  forwardIsAdmin: function (req, res, next) {
    if (!req.user.isAdmin) {
      return next();
    }
    res.redirect('/');
  },
};
