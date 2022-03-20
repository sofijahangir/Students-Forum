// Post Controller

const Post = require('../models/posts');

// Create Post

const addPost = async (req, res) => {
  const { userId, title, description, category, image } = req.body;
  const newPost = new Post({
    userId,
    title,
    description,
    category,
    image,
  });
  await newPost.save();
  res.send(newPost);
};

const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
};

module.exports = { addPost, getPosts };
