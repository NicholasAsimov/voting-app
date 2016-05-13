const path = process.cwd();
const ClickHandler = require(`${path}/app/controllers/clickHandler.server.js`);

const dummyData = {};

module.exports = function(app, passport) {

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  const clickHandler = new ClickHandler();

  app.route('/').get((req, res) => {
    res.render('index');
  });

  app.route('/login').get((req, res) => {
    res.render('login');
  });

  app.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/login');
  });

  app.route('/profile').get(isLoggedIn, (req, res) => {
    res.render('profile');
  });

  app.route('/clicking').get(isLoggedIn, (req, res) => {
    res.render('clicking');
  });

  app.route('/api/:id').get(isLoggedIn, (req, res) => {
    res.json(req.user.github);
  });

  app.route('/auth/github').get(passport.authenticate('github'));

  app.route('/auth/github/callback').get(passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.route('/api/:id/clicks')
    .get(isLoggedIn, clickHandler.getClicks)
    .post(isLoggedIn, clickHandler.addClick)
    .delete(isLoggedIn, clickHandler.resetClicks);
};
