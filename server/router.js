const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const pollHandler = require('./controllers/polls.js');

module.exports = app => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ msg: 'You\'re authenticated' });
  });

  app.route('/api/polls')
    .get((req, res) => {
      pollHandler.getAllPolls()
        .then(response => res.json(response))
        // .catch(res.json({ error: 'Couldn\'t get polls' }))
    })
    .post(requireAuth, (req, res) => {
      pollHandler.addPoll({
        title: req.body.title,
        authorEmail: req.user.email,
        choices: req.body.choices
      }).then(response => res.json(response));
    });

  app.route('/api/poll')
    .post((req, res) => {
      pollHandler.getPoll(req.body.id).then(poll => {
        // if (poll.votedUsers.indexOf(req.ip) !== -1) {
        if (false) {
          res.status(409).json({ error: 'User already voted' });
        }

        pollHandler.vote({
          id: req.body.id,
          choice: req.body.choice,
          userIdentificator: req.ip
        }).then(response => {
          res.json(response);
        });
      })
    })

  // I had to do this instead of a DELETE request because it seems that sending
  // body with DELETE request is not specified by the standart. And without a body
  // I can't prevent users from deleting poll they don't own.
  app.post('/api/poll/delete', requireAuth, (req, res) => {
    pollHandler.getPoll(req.body.id).then(poll => {
      if (req.body.authorEmail === poll.author) {
        pollHandler.remove(req.body.id).then(result => res.json(result));
      } else {
        res.status(403).json({ error: 'You\'re not the author of this poll' });
      }
    });
  });

  app.get('/api/user', requireAuth, (req, res) => {
    res.json({ email: req.user.email });
  })

  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup);
};
