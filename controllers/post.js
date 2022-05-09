// Post Controller

const Post = require('../models/posts');
const User = require('../models/user');
const Comments = require('../models/comments');

// Create Post

const addPost = async (req, res) => {
  // Fetch userId from session
  const userId = req.session.passport.user;
  const author = await User.findById(userId);
  // console.log(author.name);
  const { title, description, category, image } = req.body;
  const newPost = new Post({
    userId,
    author: author.name,
    title,
    description,
    category,
    image,
  });
  await newPost.save();
  // console.log(username);
  res.redirect('/');
};
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

const readPost = async (req, res) => {
  // Get the id of the post we want to read that is not in the params

  const postId = req.params.id;
  const post = await Post.findById(postId);

  // Get all the comment desc of the post
  const comments = await Comments.find({ postId });

  res.render('posts/readPost', { post, comments });
};

const getPostsOfUser = async (req, res) => {
  const userId = req.session.passport.user;
  const posts = await Post.find({ userId });
  // console.log(posts);
  res.render('/dashboard', { posts });
};

// Delete Post
const deletePost = async (req, res) => {
  const postId = req.params.id;
  await Post.findByIdAndDelete(postId);
  res.redirect('/dashboard');
};

module.exports = { addPost, getPosts, getPostsOfUser, readPost, deletePost };
