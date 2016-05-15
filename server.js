const express = require('express');
const routes = require('./app/routes/index.js');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGODB_URI);

app.use('/controllers', express.static(`${process.cwd()}/app/controllers`));
app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/common', express.static(`${process.cwd()}/app/common`));

app.set('views', './app/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());

app.use(session({
  secret: 'secretClementine',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node.js listening on port ${port}...`);
});
