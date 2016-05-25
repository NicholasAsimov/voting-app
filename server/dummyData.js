const Poll = require('./models/poll.js');

const testPoll = new Poll({
  title: 'Election prediction',
  author: 'test@example.com',
  dateAdded: Date.now(),
  votedUsers: [],
  choices: [
    { name: 'Bernie Sanders', votes: 3 },
    { name: 'Donald Trump', votes: 5 },
    { name: 'Hillary Clinton', votes: 3 }
  ]
});

const testPoll2 = new Poll({
  title: 'Your favorite drink',
  author: 'test@example.com',
  dateAdded: Date.now(),
  votedUsers: [],
  choices: [
    { name: 'Coca-Cola', votes: 7 },
    { name: 'Sprite', votes: 2 },
    { name: 'Dr. Pepper', votes: 9 }
  ]
});

const testPoll3 = new Poll({
  title: 'Marvel vs DC',
  author: 'test@example.com',
  dateAdded: Date.now(),
  votedUsers: [],
  choices: [
    { name: 'Marvel', votes: 5 },
    { name: 'DC', votes: 5 }
  ]
});

testPoll.save();
testPoll2.save();
testPoll3.save();
