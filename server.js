const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

// Enable user IP detection
app.enable('trust proxy');

mongoose.connect(process.env.MONGODB_URI);

app.use('/controllers', express.static(`${process.cwd()}/app/controllers`));
app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/common', express.static(`${process.cwd()}/app/common`));

app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Adds local variables for jade templates
app.use((req, res, next) => {
  res.locals = {
    loggedIn: req.isAuthenticated(),
    path: req.path
  };

  next();
});

routes(app, passport);

app.use((req, res) => {
  res.render('404', { title: 'Page not found' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node.js listening on port ${port}...`);
});
