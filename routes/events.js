const express = require('express');
const {
  createEvent,
  getAllEvents,
  readEvent,
} = require('../controllers/events');

const router = express.Router();

const { ensureAuthenticated, ensureIsAdmin } = require('../config/auth');

router.get('/new', ensureAuthenticated, ensureIsAdmin, (req, res) => {
  res.render('events/newEvent');
});

router.post('/new', ensureAuthenticated, ensureIsAdmin, createEvent);
router.get('/read/:id', readEvent);

router.get('/get', getAllEvents);

module.exports = router;
