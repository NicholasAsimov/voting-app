require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./router');
const cors = require('cors');

const app = express();

mongoose.connection.on('error', err => {
  console.log('Could not connect to MongoDB server!');
  console.error(err);
});

mongoose.connect(process.env.MONGODB_URI);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

router(app);

const port = process.env.PORT || 3090;

app.listen(port, () => {
  console.log(`Server listening on port ${port}..`);
});
