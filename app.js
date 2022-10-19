const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const router = require('./routes/router');
const { handlerErrors } = require('./middlewares/handlerErrors');

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use('', router);

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.use(errors());

app.use(handlerErrors);

app.listen(PORT);
