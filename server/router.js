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

  app.route('/api/poll')
    .post((req, res) => {
      pollHandler.vote(req.body.id, req.body.choice, req.ip).then(response => {
        res.json(response);
      })
    })

  app.post('/signin', requireSignin, Authentication.signin)
  app.post('/signup', Authentication.signup);
};
