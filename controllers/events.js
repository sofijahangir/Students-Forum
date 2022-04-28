// Events Controller

const Event = require('../models/events');
const User = require('../models/user');
// Create an event

const createEvent = async (req, res) => {
  // Fetch userId from session
  const userId = req.session.passport.user;

  // Get the name of the user who posted the event

  const author = await User.findById(userId);

  const { title, dateAndTime, description, category, location } = req.body;

  const newEvent = new Event({
    title,
    description,
    dateAndTime,
    category,
    location,
    postedBy: author.name,
  });

  newEvent.save((err, event) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.redirect('/');
    }
  });
};

// Read Event

const readEvent = async (req, res) => {
  // Get the id of the post we want to read that is not in the params

  const eventId = req.params.id;
  const event = await Event.findById(eventId);

  // Get all the comment desc of the post
  // const comments = await Comments.find({ postId });

  res.render('events/readEvent', { event });
};

// Get all events

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  await Event.findByIdAndDelete(eventId);
  res.redirect('/dashboard');
};

module.exports = { createEvent, getAllEvents, readEvent, deleteEvent };
