const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Poll = new Schema({
  title: String,
  author: String, // Github id
  dateAdded: { type: Date, default: Date.now },
  choices: [{ name: String, votes: Number }]
});

module.exports = mongoose.model('Poll', Poll);
