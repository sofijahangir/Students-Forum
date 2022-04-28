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
  ensureIsFaculty: function (req, res, next) {
    if (req.user.isFaculty) {
      return next();
    }
    req.flash('error_msg', 'You are not authorized to view the resource');
    res.redirect('/');
  },
  forwardIsFaculty: function (req, res, next) {
    if (!req.user.isFaculty) {
      return next();
    }
    res.redirect('/');
  },
  ensureBothAdminAndFaculty: function (req, res, next) {
    if (req.user.isFaculty || req.user.isAdmin) {
      return next();
    }
    req.flash('error_msg', 'You are not authorized to view the resource');
    res.redirect('/');
  },
  forwardBothAdminAndFaculty: function (req, res, next) {
    if (!req.user.isFaculty || !req.user.isAdmin) {
      return next();
    }
    res.redirect('/');
  },
};
