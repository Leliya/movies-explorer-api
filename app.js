const express = require('express');

const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use('/users', userRouter);

app.listen(PORT);
