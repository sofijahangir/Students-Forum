// Views Controller:
const Views = require('../models/views');
const User = require('../models/user');
const Post = require('../models/posts');

// View a Post
const viewPost = async (req, res) => {
  const userId = req.session.passport.user;
  const postId = req.params.id;
  const user = await User.findById(userId);

  // Check if the user has already viewed the post

  // const view = await Views.findOne({ userId, postId });

  const newView = new Views({
    userId,
    postId,
    viewedBy: user.name,
  });
  try {
    // Find the post by postId and add the view to the post
    const post = await Post.findById(postId);
    post.views.push(newView);
    await post.save();
    await newView.save();
    // res.status(200).json(newView);
    res.redirect(`/post/read/${postId}`);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
    res.redirect(`/post/read/${postId}`);
  }
};

module.exports = { viewPost };
