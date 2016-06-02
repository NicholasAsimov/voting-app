const Poll = require('../models/poll.js');

// Each method returns a query (stripped down version of Promise) that allows .then
const pollHandler = {
  // Get user-specific polls
  getUserPolls(authorEmail) {
    return Poll.find({ author: authorEmail }).sort('-dateAdded');
  },

  addPoll({ title, authorEmail, choices }) {
    const choicesFormatted = choices.map(choice => ({ name: choice, votes: 0 }));

    const poll = { title, author: authorEmail, choices: choicesFormatted };

    return Poll.create(poll);
  },

  getAllPolls() {
    return Poll.find({}).sort('-dateAdded');
  },

  // Get a single poll by id
  getPoll(id) {
    return Poll.findById(id);
  },

  vote({ id, choice, userIdentificator }) {
    // Update existing choice
    const query = { _id: id, 'choices.name': choice };
    const update = { $inc: { 'choices.$.votes': 1 }, $addToSet: { votedUsers: userIdentificator } };

    // Add custom choice
    const queryCustom = { _id: id, 'choices.name': { $ne: choice } };
    const updateCustom = { $push: { choices: { name: choice, votes: 0 } } };

    return Poll.findOneAndUpdate(queryCustom, updateCustom).then(() => (
           Poll.findOneAndUpdate(query, update, { new: true })
    ));

    // Poll.findOneAndUpdate(queryCustom, updateCustom, (err, result) => {
    //   if (err) throw err;
    //
    //   Poll.findOneAndUpdate(query, update).exec();
    // });
  },

  remove(id) {
    return Poll.findByIdAndRemove(id);
  },
};

module.exports = pollHandler;
