// Likes Controller

const Likes = require('../models/likes');
const User = require('../models/user');
const Post = require('../models/posts');

// Like a Post

const likePost = async (req, res) => {
  // Get the user if from Session
  const userId = req.session.passport.user;
  //  Get post id
  const postId = req.params.id;
  // Find the User by userId
  const user = await User.findById(userId);

  // Check if the user has already liked the post

  const like = await Likes.findOne({ userId, postId });
  if (like) {
    res.redirect(`/post/read/${postId}`);
  } else {
    const newLike = new Likes({
      userId,
      postId,
      likedBy: user.name,
    });
    try {
      // Find the post by postId and add the comment to the post
      const post = await Post.findById(postId);
      // Push comment id to the post
      post.likes.push(newLike);
      await post.save();
      await newLike.save();
      // res.status(200).json(newLike);
      res.redirect(`/post/read/${postId}`);
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
      res.redirect(`/post/read/${postId}`);
    }
  }
};

// Get all likes

const getLikes = async (req, res) => {
  const { postId } = req.params;
  try {
    const likes = await Likes.find({ postId });
    res.status(200).json(likes);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get all likes of the particular post
const getPostLikes = async (req, res) => {
  const postId = req.params.id;
  try {
    const likes = await Likes.find({ postId });
    res.status(200).json(likes);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get all likes of the

module.exports = { likePost, getLikes, getPostLikes };
