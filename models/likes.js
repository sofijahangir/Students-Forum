const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    likedBy: {
      type: String,
    },

    likes: {
      type: Number,
    },
  },
  { timestamps: true }
);
const Likes = mongoose.model('Likes', likesSchema);

module.exports = Likes;
