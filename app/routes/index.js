const path = process.cwd();
const pollHandler = require(`${path}/app/controllers/pollHandler.server.js`);

module.exports = (app, passport) => {
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  /* Client Routes */

  app.route('/').get((req, res) => {
    pollHandler.getAllPolls().then(polls => {
      res.render('index', { polls });
    });
  });

  app.get('/poll/:id', (req, res) => {
    pollHandler.getPoll(req.params.id).then(poll => {
      res.render('poll', { poll });
    });
  });

  app.route('/login').get((req, res) => {
    res.render('login');
  });

  app.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/login');
  });

  app.route('/profile').get(isLoggedIn, (req, res) => {
    pollHandler.getPolls(req.user.github.id).then(polls => {
      res.render('profile', {
        user: req.user.github,
        polls
      });
    });
  });

  app.route('/newpoll').get(isLoggedIn, (req, res) => {
    res.render('newpoll');
  });

  app.route('/auth/github').get(passport.authenticate('github'));

  app.route('/auth/github/callback').get(passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  /* API Endpoints */

  // User-specific poll manipulation
  app.route('/api/polls')
    // .get(isLoggedIn, pollHandler.getPolls)
    .post(isLoggedIn, (req, res) => {
      pollHandler.addPoll(
        req.body.title,
        req.user.github.id,
        req.body.choices
      ).then(response => {
        res.json(response);
      });
    });

  // Public all polls
  // app.get('/api/allpolls', (req, res) => {
  //   pollHandler.getAllPolls().then(polls => res.json(polls));
  // });

  // Public specific poll
  // app.get('/api/poll/:id', pollHandler.getPoll);
};
