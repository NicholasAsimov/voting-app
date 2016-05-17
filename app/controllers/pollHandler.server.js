const Polls = require('../models/polls.js');

// Each method returns a query (stripped down version of Promise) that allows .then
const pollHandler = {
  // Get user-specific polls
  getPolls(authorId) {
    return Polls.find({ author: authorId }).sort('-dateAdded');
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

  vote(id, choice, userIdentificator) {
    // Update existing choice
    const query = { _id: id, 'choices.name': choice };
    const update = { $inc: { 'choices.$.votes': 1 }, $addToSet: { votedUsers: userIdentificator } };

    // Add custom choice
    const queryCustom = { _id: id, 'choices.name': { $ne: choice } };
    const updateCustom = { $push: { choices: { name: choice, votes: 0 } } };

    return Polls.findOneAndUpdate(queryCustom, updateCustom).then(() => (
           Polls.findOneAndUpdate(query, update)
    ));

    // Polls.findOneAndUpdate(queryCustom, updateCustom, (err, result) => {
    //   if (err) throw err;
    //
    //   Polls.findOneAndUpdate(query, update).exec();
    // });
  },

  remove(id) {
    return Polls.findByIdAndRemove(id);
  },
};

module.exports = pollHandler;
