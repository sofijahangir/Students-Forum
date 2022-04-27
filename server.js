const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const path = require('path');

const passport = require('passport');
const partials = require('express-partials');
const fs = require('fs');
const postRoutes = require('./routes/posts');
const Posts = require('./models/posts');
const Comments = require('./models/comments');
const Events = require('./models/events');
const User = require('./models/user');
const mongoDb = require('./config/db');
const userRoutes = require('./routes/user');
const indexPageRoutes = require('./routes/index');
const commentRoutes = require('./routes/comments');
const eventRoutes = require('./routes/events');

// Passport Config
require('./config/passport-config')(passport);

const { ensureAuthenticated, ensureIsAdmin } = require('./config/auth');

const server = express();

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const myCss = fs.readFileSync('./views/partials/css/style.css', 'utf8');

// EJS

// app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(partials());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/event', eventRoutes);

app.get('/', async (req, res) => {
  // fetch all the posts
  const posts = await Posts.find().sort({ createdAt: 'desc' });

  const comments = await Comments.find().sort({ createdAt: 'desc' });

  const events = await Events.find().sort({ createdAt: 'desc' });

  // console.log(comments);
  res.render('index', {
    posts,
    comments,
    events,
    myCss: myCss,
  });
});

// Logout routes
app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
