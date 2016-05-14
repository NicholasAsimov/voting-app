const Users = require('../models/users.js');
const Polls = require('../models/polls.js');

function PollHandler() {
  this.getPolls = userId => {
    console.log('Getting polls...');
    Polls.find({ author: req.user.github.id }, (err, result) => {
      if (err) throw err;

      res.json(result);
    });
  };

  this.addPoll = (req, res) => {
    const poll = {
      title: 'What is the best drink?',
      author: req.user.github.id,
      choices: [{ name: 'Coca-Cola', votes: 3 }, { name: 'Sprite', votes: 3 }]
    };

    Polls.create(poll, (err, result) => {
      if (err) throw err;

      res.json(result);
    });
  };

  this.resetClicks = (req, res) => {
    Users.findOneAndUpdate({
      'github.id': req.user.github.id
    }, { 'nbrClicks.clicks': 0 }).exec((err, result) => {
      if (err) {
        throw err;
      }

      res.json(result.nbrClicks);
    });
  };
}

module.exports = PollHandler;
