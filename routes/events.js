const express = require('express');
const {
  createEvent,
  getAllEvents,
  readEvent,
  deleteEvent,
} = require('../controllers/events');

const router = express.Router();

const {
  ensureAuthenticated,
  ensureIsAdmin,
  ensureIsFaculty,
  ensureBothAdminAndFaculty,
} = require('../config/auth');

router.get(
  '/new',
  ensureAuthenticated,
  ensureBothAdminAndFaculty,
  (req, res) => {
    res.render('events/newEvent');
  }
);

router.post(
  '/new',
  ensureAuthenticated,
  ensureBothAdminAndFaculty,
  createEvent
);
router.get('/read/:id', readEvent);

router.get('/get', getAllEvents);

// delete event
router.get('/delete/:id', ensureAuthenticated, deleteEvent);

module.exports = router;
