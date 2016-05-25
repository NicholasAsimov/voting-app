const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  title: String,
  author: String, // author email
  dateAdded: { type: Date, default: Date.now },
  votedUsers: [],
  choices: [{ name: String, votes: Number, _id: false }]
});

module.exports = mongoose.model('Poll', Poll);
