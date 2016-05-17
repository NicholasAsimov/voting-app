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

  app.get('/', (req, res) => {
    pollHandler.getAllPolls().then(polls => {
      res.render('index', { title: 'Home', polls });
    });
  });

  app.get('/poll/:id', (req, res) => {
    pollHandler.getPoll(req.params.id).then(poll => {
      res.render('poll', { title: poll.title, poll });
    }, () => {
      res.redirect('/404');
    });
  });

  app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    pollHandler.getPolls(req.user.github.id).then(polls => {
      res.render('profile', {
        title: 'Profile',
        user: req.user.github,
        polls
      });
    });
  });

  app.get('/newpoll', isLoggedIn, (req, res) => {
    res.render('newpoll', { title: 'New Poll' });
  });

  /* Authentication */

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

  // Specific poll manipulation
  app.route('/api/poll')
    .post((req, res) => {
      pollHandler.getPoll(req.body.pollId).then(poll => {
        const userIdentificator = req.isAuthenticated() ? req.user.github.id : req.ip;

        if (poll.votedUsers.indexOf(userIdentificator) === -1) {
          pollHandler.vote(req.body.pollId, req.body.choice, userIdentificator).then(result => {
            res.json(result);
          });
        } else {
          res.json({ error: 'User already voted' });
        }
      });
    })
    // ::private:: Remove poll by id
    .delete(isLoggedIn, (req, res) => {
      pollHandler.getPoll(req.body.pollId).then(poll => {
        if (req.user.github.id === poll.author) {
          pollHandler.remove(req.body.pollId).then(result => {
            res.json(result);
          });
        }
      });
    });
};
