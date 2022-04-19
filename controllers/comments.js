// Comments Controller

const Comment = require('../models/comments');
const User = require('../models/user');
const Post = require('../models/posts');

// Post a comment

const postComment = async (req, res) => {
  // Get the user if from Session
  const userId = req.session.passport.user;
  //  Get post id
  const postId = req.params.id;
  const { comment } = req.body;

  // Find the User by userId
  const user = await User.findById(userId);
  const newComment = new Comment({
    userId,
    postId,
    author: user.name,
    comment,
  });
  // console.log(newComment.comment);
  // const commentDesc = newComment.comment;
  try {
    // Find the post by postId and add the comment to the post
    const post = await Post.findById(postId);
    // Push comment id to the post
    post.comments.push(newComment);
    await post.save();
    await newComment.save();
    res.redirect(`/post/read/${postId}`);
    // res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get all comments

const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// // Get all comments of the particular post
// const getPostComments = async (req, res) => {
//   const postId = req.params.id;
//   try {
//     const comments = await Comment.find({ postId });
//     const commentDesc = comments.map((comment) => comment.comment);
//     res.redirect('posts/read/postId', { comments });
//     // res.status(200).json(commentDesc);
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err.message,
//     });
//   }
// };

module.exports = { postComment };
