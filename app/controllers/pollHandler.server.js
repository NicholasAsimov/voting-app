const Users = require('../models/users.js');
const Polls = require('../models/polls.js');

const pollHandler = {
  // Get user-specific polls
  getPolls(authorId) {
    return Polls.find({ author: authorId });
  },
  //
  addPoll(title, authorId, choices) {
    const poll = { title, author: authorId, choices };

    return Polls.create(poll);
  },

  getAllPolls() {
    return Polls.find({});
  },

  // Get a single poll by id
  getPoll(id) {
    return Polls.findById(id);
  },
};

module.exports = pollHandler;
