const express = require('express');
const { addPost, getPosts } = require('../controllers/post');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('In Posts');
});
router.post('/add', addPost);
router.get('/get', getPosts);

module.exports = router;
