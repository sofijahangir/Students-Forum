// Events Model
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: Array,
      required: true,
    },
    dateAndTime: { type: Date, required: true },

    location: { type: String, required: true },

    postedBy: { type: String, required: true },
  },

  { timestamps: true, toJSON: { virtuals: true } }
);

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
