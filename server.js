const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const dotenv = require('dotenv');
const axios = require('axios');
const Posts = require('./models/posts');
const postRouter = require('./routes/posts');
const mongoDb = require('./config/db');

dotenv.config();

const app = express();
const { PORT } = process.env;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoDb();

app.get('/', async (req, res) => {
  // fetch all the posts
  const posts = await Posts.find().sort({ createdAt: 'desc' });

  res.render('index', { posts });
});

app.use('/', postRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
