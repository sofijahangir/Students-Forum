// DisLikes Controller

const Dislikes = require('../models/dislikes');
const User = require('../models/user');
const Post = require('../models/posts');

// Dislike a Post

const dislikePost = async (req, res) => {
  // Get the user if from Session
  const userId = req.session.passport.user;
  //  Get post id
  const postId = req.params.id;
  // Find the User by userId
  const user = await User.findById(userId);

  // Check if the user has already disliked the post

  const dislike = await Dislikes.findOne({ userId, postId });
  if (dislike) {
    res.redirect(`/post/read/${postId}`);
  } else {
    const newDislike = new Dislikes({
      userId,
      postId,
      dislikedBy: user.name,
    });

    try {
      // Find the post by postId and add the comment to the post
      const post = await Post.findById(postId);
      // Push comment id to the post
      post.dislikes.push(newDislike);
      await post.save();
      await newDislike.save();
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

module.exports = { dislikePost };
