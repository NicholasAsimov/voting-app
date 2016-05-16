const Polls = require('../models/polls.js');

const pollHandler = {
  // Get user-specific polls
  getPolls(authorId) {
    return Polls.find({ author: authorId });
  },

  addPoll(title, authorId, choices) {
    const poll = { title, author: authorId, choices };

    return Polls.create(poll);
  },

  getAllPolls() {
    return Polls.find({}).sort('-dateAdded');
  },

  // Get a single poll by id
  getPoll(id) {
    return Polls.findById(id);
  },

  vote(id, choice) {
    const query = { _id: id, 'choices.name': choice };
    const update = { $inc: { 'choices.$.votes': 1 } };

    return Polls.findOneAndUpdate(query, update);
  }
};

module.exports = pollHandler;
