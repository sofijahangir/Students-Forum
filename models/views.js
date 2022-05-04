const mongoose = require('mongoose');

const viewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    viewedBy: {
      type: String,
    },
    views: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Views = mongoose.model('Views', viewsSchema);

module.exports = Views;
