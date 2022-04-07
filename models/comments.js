const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    author: {
      type: String,
    },

    comment: {
      type: String,
    },
  },
  { timestamps: true }
);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
