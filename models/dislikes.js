const mongoose = require('mongoose');

const dislikesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    dislikedBy: {
      type: String,
    },

    dislikes: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Dislikes = mongoose.model('Dislikes', dislikesSchema);

module.exports = Dislikes;
