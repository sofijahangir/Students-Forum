const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const passport = require('passport');
const postRoutes = require('./routes/posts');
const Posts = require('./models/posts');
const Comments = require('./models/comments');
const User = require('./models/user');
const mongoDb = require('./config/db');
const userRoutes = require('./routes/user');
const indexPageRoutes = require('./routes/index');
const commentRoutes = require('./routes/comments');

// Passport Config
require('./config/passport-config')(passport);

dotenv.config();

const app = express();
const { PORT } = process.env;

// EJS
// app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

mongoDb();
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/forum',
  collection: 'mySessions',
});

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', userRoutes);
app.use('/', indexPageRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

app.get('/', async (req, res) => {
  // fetch all the posts
  const posts = await Posts.find().sort({ createdAt: 'desc' });

  const comments = await Comments.find().sort({ createdAt: 'desc' });

  // console.log(comments);
  res.render('index', { posts, comments });
});
// app.get('/comments/get/:id', async (req, res) => {
//   // fetch all the posts
//   const comments = await Posts.find().sort({ createdAt: 'desc' });

//   res.render('index', { comments });
// });

// Logout routes
app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
