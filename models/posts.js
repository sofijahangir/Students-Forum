const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // Category of the post
    category: {
      type: Array,
      required: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    // Array of comments
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],

    // Array of Likes
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Likes',
      },
    ],
    // Array of DisLikes
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dislikes',
      },
    ],
  },
  { timestamps: true }
);
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
